// lib/agenda/repositorio-mysql.ts — mysql2, por lib/banco.ts (aprovado pelo usuário em 08.10.2026). O Repositorio da Agenda no MySQL do plano, com SQL direto
// (producao/esteira/14-funcionalidades/05-agenda.md, seções 3 a 5 e 7 a 9). As tabelas: esquema/agenda.sql. Tudo em UTC no banco; o app conecta em
// 127.0.0.1 (lib/banco.ts, com timezone "Z": o mysql2 lê e grava as datas em UTC).
// Conferido em 08.10.2026 no MariaDB 10.11.19 e MySQL 8.0.46: 200 reservas simultâneas sem sobreposição, o impasse (1213) e o tempo de
// trava esgotado (1205) devolvidos como "ocupado", o cancelamento e a queda do banco (producao/modulos/README.md, seção 8).
import "server-only";
import { banco } from "@/lib/banco";
import { blocosDaReserva, BLOCO_MIN, ehDisputaPerdida } from "./blocos";
import type { Dono, Faixa, Folga, Intervalo, NovaFolga, NovaReserva, Profissional, Repositorio, Reserva, ResultadoDaReserva, Servico } from "./tipos";

type Linha = Record<string, unknown>;
type Conexao = Awaited<ReturnType<typeof banco.getConnection>>;

const linhas = async (sql: string, parametros: unknown[] = []) => (await banco.query(sql, parametros))[0] as unknown as Linha[];
const alteradas = async (sql: string, parametros: unknown[] = []) => ((await banco.query(sql, parametros))[0] as unknown as { affectedRows: number }).affectedRows;

/** Uma transação numa conexão só: confirma se a função termina, desfaz e repassa o erro se ela lança. */
async function transacao<T>(corpo: (c: Conexao) => Promise<T>) {
  const conexao = await banco.getConnection();
  try {
    await conexao.beginTransaction();
    const resultado = await corpo(conexao);
    await conexao.commit();
    return resultado;
  } catch (erro) {
    await conexao.rollback();
    throw erro;
  } finally {
    conexao.release();
  }
}

/** A reserva com o serviço e o profissional, como a lógica a lê. */
const RESERVA = `
  SELECT r.id, r.profissional_id AS profissionalId, p.nome AS profissionalNome, r.servico_id AS servicoId, s.nome AS servicoNome,
         s.duracao_min AS duracaoMin, s.intervalo_min AS intervaloMin, r.inicio, r.fim, r.nome, r.email, r.telefone, r.situacao,
         r.criada_em AS criadaEm, r.cancelada_em AS canceladaEm, r.lembrete_enviado_em AS lembreteEnviadoEm, r.evento_google AS eventoGoogle
    FROM reserva r
    JOIN profissional p ON p.id = r.profissional_id
    JOIN servico s ON s.id = r.servico_id`;

const paraReserva = (l: Linha): Reserva => ({
  id: Number(l.id),
  profissionalId: Number(l.profissionalId),
  profissionalNome: String(l.profissionalNome),
  servicoId: Number(l.servicoId),
  servicoNome: String(l.servicoNome),
  duracaoMin: Number(l.duracaoMin),
  intervaloMin: Number(l.intervaloMin),
  inicio: l.inicio as Date,
  fim: l.fim as Date,
  nome: String(l.nome),
  email: String(l.email),
  telefone: l.telefone === null ? null : String(l.telefone),
  situacao: l.situacao === "cancelada" ? "cancelada" : "confirmada",
  criadaEm: l.criadaEm as Date,
  canceladaEm: (l.canceladaEm as Date | null) ?? null,
  lembreteEnviadoEm: (l.lembreteEnviadoEm as Date | null) ?? null,
  eventoGoogle: l.eventoGoogle === null ? null : String(l.eventoGoogle),
});

const paraFolga = (l: Linha): Folga => ({
  id: Number(l.id),
  profissionalId: l.profissionalId === null ? null : Number(l.profissionalId),
  inicio: l.inicio as Date,
  fim: l.fim as Date,
  motivo: String(l.motivo),
});

export const repositorioMysql: Repositorio = {
  // ---------- o catálogo ----------
  async servicos(): Promise<Servico[]> {
    const l = await linhas("SELECT id, nome, duracao_min AS duracaoMin, intervalo_min AS intervaloMin FROM servico WHERE ativo = TRUE ORDER BY id");
    return l.map((x) => ({ id: Number(x.id), nome: String(x.nome), duracaoMin: Number(x.duracaoMin), intervaloMin: Number(x.intervaloMin) }));
  },

  async profissionais(): Promise<Profissional[]> {
    const quem = await linhas("SELECT id, nome FROM profissional WHERE ativo = TRUE ORDER BY id");
    const faz = await linhas("SELECT profissional_id AS profissionalId, servico_id AS servicoId FROM profissional_servico");
    return quem.map((p) => ({
      id: Number(p.id),
      nome: String(p.nome),
      servicosIds: faz.filter((f) => Number(f.profissionalId) === Number(p.id)).map((f) => Number(f.servicoId)),
    }));
  },

  async faixasDoDia(profissionalId, diaSemana): Promise<Faixa[]> {
    const l = await linhas("SELECT abre, fecha FROM expediente WHERE profissional_id = ? AND dia_semana = ? ORDER BY abre", [profissionalId, diaSemana]);
    return l.map((x) => ({ abre: String(x.abre).slice(0, 5), fecha: String(x.fecha).slice(0, 5) })); // TIME "09:00:00" → "09:00"
  },

  async ocupados(profissionalId, de, ate): Promise<Intervalo[]> {
    // Um bloco toca [de, ate) se começa antes de `ate` e termina depois de `de`. Cancelar apaga os blocos: o que está aqui está ocupado.
    const blocos = await linhas("SELECT inicio_bloco AS inicio FROM ocupacao WHERE profissional_id = ? AND inicio_bloco < ? AND inicio_bloco > ?", [
      profissionalId,
      ate,
      new Date(de.getTime() - BLOCO_MIN * 60_000),
    ]);
    const folgas = await linhas("SELECT inicio, fim FROM folga WHERE (profissional_id = ? OR profissional_id IS NULL) AND inicio < ? AND fim > ?", [profissionalId, ate, de]);
    return [
      ...blocos.map((b) => ({ inicio: b.inicio as Date, fim: new Date((b.inicio as Date).getTime() + BLOCO_MIN * 60_000) })),
      ...folgas.map((f) => ({ inicio: f.inicio as Date, fim: f.fim as Date })),
    ];
  },

  // ---------- a reserva ----------
  async reservar(r: NovaReserva): Promise<ResultadoDaReserva> {
    try {
      return await transacao(async (c) => {
        const [inserida] = await c.query(
          "INSERT INTO reserva (profissional_id, servico_id, inicio, fim, nome, email, telefone, token_hash, criada_em) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [r.profissionalId, r.servicoId, r.inicio, new Date(r.inicio.getTime() + r.ocupaMin * 60_000), r.nome, r.email, r.telefone, r.tokenHash, r.criadaEm],
        );
        const reservaId = (inserida as unknown as { insertId: number }).insertId;
        const blocos = blocosDaReserva(r.inicio, r.ocupaMin).map((b) => [r.profissionalId, b, reservaId]);
        // A chave única (profissional, bloco) recusa o bloco que outro pedido levou antes: 1062, e a transação volta.
        await c.query("INSERT INTO ocupacao (profissional_id, inicio_bloco, reserva_id) VALUES ?", [blocos]);
        return { ok: true as const, reservaId };
      });
    } catch (erro) {
      if (ehDisputaPerdida(erro)) return { ok: false, motivo: "ocupado" };
      throw erro;
    }
  },

  async reservaPorCodigo(tokenHash) {
    const l = await linhas(`${RESERVA} WHERE r.token_hash = ?`, [tokenHash]);
    return l[0] ? paraReserva(l[0]) : null;
  },

  async reservaPorId(id) {
    const l = await linhas(`${RESERVA} WHERE r.id = ?`, [id]);
    return l[0] ? paraReserva(l[0]) : null;
  },

  async cancelar(reservaId, agora) {
    return transacao(async (c) => {
      // Só a que ainda está confirmada: o segundo pedido de cancelamento da mesma reserva não encontra linha.
      const [marcou] = await c.query("UPDATE reserva SET situacao = 'cancelada', cancelada_em = ? WHERE id = ? AND situacao = 'confirmada'", [agora, reservaId]);
      if ((marcou as unknown as { affectedRows: number }).affectedRows !== 1) return false;
      await c.query("DELETE FROM ocupacao WHERE reserva_id = ?", [reservaId]); // o horário volta à lista
      return true;
    });
  },

  async guardarEventoGoogle(reservaId, eventoId) {
    await banco.query("UPDATE reserva SET evento_google = ? WHERE id = ?", [eventoId, reservaId]);
  },

  // ---------- o lembrete ----------
  async paraLembrar(agora) {
    // A última condição: marcada na véspera, a confirmação acabou de sair; sem lembrete (lembrete.ts diz o mesmo).
    const l = await linhas(
      `${RESERVA}
        WHERE r.situacao = 'confirmada' AND r.lembrete_enviado_em IS NULL
          AND r.inicio BETWEEN ? AND ?
          AND r.criada_em <= DATE_SUB(r.inicio, INTERVAL 24 HOUR)`,
      [new Date(agora.getTime() + 2 * 3_600_000), new Date(agora.getTime() + 24 * 3_600_000)],
    );
    return l.map(paraReserva);
  },

  async marcarLembrete(reservaId, agora) {
    return (await alteradas("UPDATE reserva SET lembrete_enviado_em = ? WHERE id = ? AND lembrete_enviado_em IS NULL", [agora, reservaId])) === 1;
  },

  async desmarcarLembrete(reservaId) {
    await banco.query("UPDATE reserva SET lembrete_enviado_em = NULL WHERE id = ?", [reservaId]);
  },

  // ---------- a manutenção ----------
  async apagarReservasVencidas(antesDe) {
    return transacao(async (c) => {
      await c.query("DELETE o FROM ocupacao o JOIN reserva r ON r.id = o.reserva_id WHERE r.fim < ?", [antesDe]);
      const [apagou] = await c.query("DELETE FROM reserva WHERE fim < ?", [antesDe]);
      return (apagou as unknown as { affectedRows: number }).affectedRows;
    });
  },

  async apagarSessoesVencidas(agora) {
    return alteradas("DELETE FROM sessao WHERE expira_em <= ?", [agora]);
  },

  // ---------- o painel ----------
  async donoPorEmail(email): Promise<Dono | null> {
    const l = await linhas("SELECT id, email, senha FROM dono WHERE email = ?", [email]);
    return l[0] ? { id: Number(l[0].id), email: String(l[0].email), senha: String(l[0].senha) } : null;
  },

  async criarSessao(tokenHash, donoId, expiraEm) {
    await banco.query("INSERT INTO sessao (hash, dono_id, expira_em) VALUES (?, ?, ?)", [tokenHash, donoId, expiraEm]);
  },

  async donoDaSessao(tokenHash, agora) {
    const l = await linhas("SELECT dono_id AS donoId FROM sessao WHERE hash = ? AND expira_em > ?", [tokenHash, agora]);
    return l[0] ? Number(l[0].donoId) : null;
  },

  async apagarSessao(tokenHash) {
    await banco.query("DELETE FROM sessao WHERE hash = ?", [tokenHash]);
  },

  async reservasEntre(de, ate) {
    const l = await linhas(`${RESERVA} WHERE r.situacao = 'confirmada' AND r.inicio >= ? AND r.inicio < ? ORDER BY r.inicio, p.nome`, [de, ate]);
    return l.map(paraReserva);
  },

  async folgasAPartirDe(de) {
    const l = await linhas("SELECT id, profissional_id AS profissionalId, inicio, fim, motivo FROM folga WHERE fim > ? ORDER BY inicio", [de]);
    return l.map(paraFolga);
  },

  async criarFolga(f: NovaFolga) {
    const [inserida] = await banco.query("INSERT INTO folga (profissional_id, inicio, fim, motivo) VALUES (?, ?, ?, ?)", [f.profissionalId, f.inicio, f.fim, f.motivo]);
    return (inserida as unknown as { insertId: number }).insertId;
  },

  async removerFolga(id) {
    return (await alteradas("DELETE FROM folga WHERE id = ?", [id])) === 1;
  },

  async buscarPessoa(busca) {
    const condicoes: string[] = [];
    const parametros: unknown[] = [];
    if (busca.email !== undefined) {
      condicoes.push("r.email = ?");
      parametros.push(busca.email);
    }
    if (busca.telefone !== undefined) {
      condicoes.push("r.telefone = ?");
      parametros.push(busca.telefone);
    }
    if (condicoes.length === 0) return [];
    const l = await linhas(`${RESERVA} WHERE ${condicoes.join(" OR ")} ORDER BY r.inicio DESC`, parametros);
    return l.map(paraReserva);
  },

  async apagarReservas(ids) {
    if (ids.length === 0) return [];
    return transacao(async (c) => {
      const [achadas] = await c.query(`${RESERVA} WHERE r.id IN (?)`, [ids]);
      await c.query("DELETE FROM ocupacao WHERE reserva_id IN (?)", [ids]);
      await c.query("DELETE FROM reserva WHERE id IN (?)", [ids]);
      return (achadas as unknown as Linha[]).map(paraReserva);
    });
  },
};

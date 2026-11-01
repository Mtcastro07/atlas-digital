// lib/agenda/memoria.ts — o Repositorio na memória do processo, sem banco (producao/esteira/14-funcionalidades/05-agenda.md, seções 3 a 5 e 7 a 9).
// Faz o que o MySQL faz, no que a lógica depende: a chave única (profissional, bloco) recusa o horário levado, a reserva
// e os blocos entram juntos, o cancelamento libera os blocos, o lembrete é marcado uma vez só. Serve aos testes de unidade
// e ao desenvolvimento local (lib/agenda/destino.ts); nunca à publicação, porque o web app dorme e acorda zerado.
// Sem dependência. Devolve cópias: quem lê uma reserva e depois a cancela continua com a leitura antiga, como no banco.
import { blocosDaReserva } from "./blocos.ts";
import { elegivelParaLembrete } from "./lembrete.ts";
import type { Dono, Faixa, Folga, Intervalo, NovaFolga, NovaReserva, Profissional, Repositorio, Reserva, ResultadoDaReserva, Servico } from "./tipos.ts";

export type Semente = {
  servicos: Servico[];
  profissionais: Profissional[];
  /** O expediente: id do profissional → dia da semana (0 = domingo) → faixas em hora de parede de Niterói. */
  expediente: Record<number, Record<number, Faixa[]>>;
  donos?: Dono[];
};

const SEMANA: Faixa[] = [
  { abre: "09:00", fecha: "12:00" },
  { abre: "13:00", fecha: "19:00" },
];
const SABADO: Faixa[] = [{ abre: "09:00", fecha: "14:00" }];

/** Os dados de uma barbearia fictícia: dois profissionais, dois serviços, de segunda a sábado, com almoço. */
export const SEMENTE_DE_EXEMPLO: Semente = {
  servicos: [
    { id: 1, nome: "Corte", duracaoMin: 30, intervaloMin: 0 },
    { id: 2, nome: "Corte e barba", duracaoMin: 60, intervaloMin: 15 },
  ],
  profissionais: [
    { id: 1, nome: "Rafael", servicosIds: [1, 2] },
    { id: 2, nome: "Bruno", servicosIds: [1] },
  ],
  expediente: {
    1: { 1: SEMANA, 2: SEMANA, 3: SEMANA, 4: SEMANA, 5: SEMANA, 6: SABADO },
    2: { 1: SEMANA, 2: SEMANA, 3: SEMANA, 4: SEMANA, 5: SEMANA, 6: SABADO },
  },
};

const BLOCO_MS = 15 * 60_000;
type Guardada = Reserva & { token: string };
const copia = (r: Guardada): Reserva => {
  const { token: _token, ...reserva } = r;
  return { ...reserva };
};

export function repositorioEmMemoria(semente: Semente = SEMENTE_DE_EXEMPLO) {
  const reservas = new Map<number, Guardada>();
  const blocos = new Map<string, number>(); // "profissional@início do bloco em ms" → id da reserva
  const folgas = new Map<number, Folga>();
  const sessoes = new Map<string, { donoId: number; expiraEm: Date }>();
  const donos = [...(semente.donos ?? [])];
  let proximaReserva = 1;
  let proximaFolga = 1;

  const chaveDoBloco = (profissionalId: number, inicio: Date) => `${profissionalId}@${inicio.getTime()}`;
  const liberar = (reservaId: number) => {
    for (const [chave, id] of blocos) if (id === reservaId) blocos.delete(chave);
  };

  const repo: Repositorio = {
    async servicos() {
      return semente.servicos.map((s) => ({ ...s }));
    },
    async profissionais() {
      return semente.profissionais.map((p) => ({ ...p }));
    },
    async faixasDoDia(profissionalId, diaSemana) {
      return (semente.expediente[profissionalId]?.[diaSemana] ?? []).map((f) => ({ ...f })).sort((a, b) => a.abre.localeCompare(b.abre));
    },
    async ocupados(profissionalId, de, ate) {
      const intervalos: Intervalo[] = [];
      for (const chave of blocos.keys()) {
        const [p, ms] = chave.split("@").map(Number);
        if (p === profissionalId && ms < ate.getTime() && ms + BLOCO_MS > de.getTime()) intervalos.push({ inicio: new Date(ms), fim: new Date(ms + BLOCO_MS) });
      }
      for (const f of folgas.values()) {
        if ((f.profissionalId === null || f.profissionalId === profissionalId) && f.inicio < ate && f.fim > de) intervalos.push({ inicio: f.inicio, fim: f.fim });
      }
      return intervalos;
    },

    async reservar(r: NovaReserva): Promise<ResultadoDaReserva> {
      const servico = semente.servicos.find((s) => s.id === r.servicoId);
      const profissional = semente.profissionais.find((p) => p.id === r.profissionalId);
      if (!servico || !profissional) throw new Error("serviço ou profissional inexistente");
      const novos = blocosDaReserva(r.inicio, r.ocupaMin);
      // O que o banco faz com a chave única e a transação: se um bloco já é de outra reserva, nada entra.
      if (novos.some((b) => blocos.has(chaveDoBloco(r.profissionalId, b)))) return { ok: false, motivo: "ocupado" };
      const id = proximaReserva++;
      reservas.set(id, {
        id,
        profissionalId: profissional.id,
        profissionalNome: profissional.nome,
        servicoId: servico.id,
        servicoNome: servico.nome,
        duracaoMin: servico.duracaoMin,
        intervaloMin: servico.intervaloMin,
        inicio: r.inicio,
        fim: new Date(r.inicio.getTime() + r.ocupaMin * 60_000),
        nome: r.nome,
        email: r.email,
        telefone: r.telefone,
        situacao: "confirmada",
        criadaEm: r.criadaEm,
        canceladaEm: null,
        lembreteEnviadoEm: null,
        eventoGoogle: null,
        token: r.tokenHash.toString("hex"),
      });
      for (const b of novos) blocos.set(chaveDoBloco(r.profissionalId, b), id);
      return { ok: true, reservaId: id };
    },
    async reservaPorCodigo(tokenHash) {
      const achada = [...reservas.values()].find((r) => r.token === tokenHash.toString("hex"));
      return achada ? copia(achada) : null;
    },
    async reservaPorId(id) {
      const achada = reservas.get(id);
      return achada ? copia(achada) : null;
    },
    async cancelar(reservaId, agora) {
      const r = reservas.get(reservaId);
      if (!r || r.situacao !== "confirmada") return false;
      r.situacao = "cancelada";
      r.canceladaEm = agora;
      liberar(reservaId);
      return true;
    },
    async guardarEventoGoogle(reservaId, eventoId) {
      const r = reservas.get(reservaId);
      if (r) r.eventoGoogle = eventoId;
    },

    async paraLembrar(agora) {
      return [...reservas.values()].filter((r) => elegivelParaLembrete(r, agora)).map(copia);
    },
    async marcarLembrete(reservaId, agora) {
      const r = reservas.get(reservaId);
      if (!r || r.lembreteEnviadoEm !== null) return false;
      r.lembreteEnviadoEm = agora;
      return true;
    },
    async desmarcarLembrete(reservaId) {
      const r = reservas.get(reservaId);
      if (r) r.lembreteEnviadoEm = null;
    },

    async apagarReservasVencidas(antesDe) {
      let n = 0;
      for (const [id, r] of reservas) {
        if (r.fim < antesDe) {
          reservas.delete(id);
          liberar(id);
          n++;
        }
      }
      return n;
    },
    async apagarSessoesVencidas(agora) {
      let n = 0;
      for (const [hash, s] of sessoes) {
        if (s.expiraEm <= agora) {
          sessoes.delete(hash);
          n++;
        }
      }
      return n;
    },

    async donoPorEmail(email) {
      const d = donos.find((x) => x.email.toLowerCase() === email.toLowerCase());
      return d ? { ...d } : null;
    },
    async criarSessao(tokenHash, donoId, expiraEm) {
      sessoes.set(tokenHash.toString("hex"), { donoId, expiraEm });
    },
    async donoDaSessao(tokenHash, agora) {
      const s = sessoes.get(tokenHash.toString("hex"));
      return s && s.expiraEm > agora ? s.donoId : null;
    },
    async apagarSessao(tokenHash) {
      sessoes.delete(tokenHash.toString("hex"));
    },
    async reservasEntre(de, ate) {
      return [...reservas.values()]
        .filter((r) => r.situacao === "confirmada" && r.inicio >= de && r.inicio < ate)
        .sort((a, b) => a.inicio.getTime() - b.inicio.getTime())
        .map(copia);
    },
    async folgasAPartirDe(de) {
      return [...folgas.values()].filter((f) => f.fim > de).sort((a, b) => a.inicio.getTime() - b.inicio.getTime()).map((f) => ({ ...f }));
    },
    async criarFolga(folga: NovaFolga) {
      const id = proximaFolga++;
      folgas.set(id, { id, ...folga });
      return id;
    },
    async removerFolga(id) {
      return folgas.delete(id);
    },
    async buscarPessoa(busca) {
      return [...reservas.values()]
        .filter((r) => (busca.email !== undefined && r.email.toLowerCase() === busca.email.toLowerCase()) || (busca.telefone !== undefined && r.telefone === busca.telefone))
        .sort((a, b) => b.inicio.getTime() - a.inicio.getTime())
        .map(copia);
    },
    async apagarReservas(ids) {
      const apagadas: Reserva[] = [];
      for (const id of ids) {
        const r = reservas.get(id);
        if (!r) continue;
        apagadas.push(copia(r));
        reservas.delete(id);
        liberar(id);
      }
      return apagadas;
    },
  };

  // O que o teste olha por dentro: os blocos ocupados (a chave única) e as sessões.
  return Object.assign(repo, { blocosOcupados: () => blocos.size, sessoesAbertas: () => sessoes.size });
}

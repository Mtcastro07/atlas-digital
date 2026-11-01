// lib/painel/operacoes.ts — o que o painel do dono faz, fora das ações "use server" para o teste de unidade a exercitar
// (producao/esteira/14-funcionalidades/05-agenda.md, seção 9): as reservas dos próximos 14 dias por dia e profissional, o cancelamento com motivo (que
// vai por e-mail à pessoa), o bloqueio de um horário ou de um dia (a folga) e a busca e a eliminação dos dados de uma
// pessoa (o pedido do titular, LGPD art. 18). O expediente muda pela manutenção mensal, não pelo painel.
// Sem dependência. Cada ação do painel confere a sessão antes de chamar estas funções (a barreira não é a tela).
import { emailValido, lerTelefone } from "../formulario/validar.ts";
import { apagarEventoDoGoogle } from "../agenda/cancelamento.ts";
import { dataEmNiteroi, dataValida, instanteEmNiteroi, somarDias } from "../agenda/fuso.ts";
import { avisoDeCancelamentoAPessoa } from "../agenda/mensagens.ts";
import type { CalendarioDoDono, ContextoDoNegocio, Correio, NovaFolga, Repositorio, Reserva } from "../agenda/tipos.ts";

const textoDoErro = (erro: unknown) => (erro instanceof Error ? erro.message : String(erro));

export type DependenciasDoPainel = {
  repo: Repositorio;
  correio: Correio;
  ctx: ContextoDoNegocio;
  google?: CalendarioDoDono;
  avisar?: (texto: string) => void;
  agora?: Date;
};

// ---------- as reservas dos próximos dias ----------

export type DiaDoPainel = { data: string; reservas: Reserva[] };

/** As reservas agrupadas pelo dia de Niterói, por horário e, dentro dele, por profissional. */
export function agruparPorDia(reservas: readonly Reserva[]): DiaDoPainel[] {
  const dias = new Map<string, Reserva[]>();
  for (const r of [...reservas].sort((a, b) => a.inicio.getTime() - b.inicio.getTime() || a.profissionalNome.localeCompare(b.profissionalNome, "pt-BR"))) {
    const data = dataEmNiteroi(r.inicio);
    dias.set(data, [...(dias.get(data) ?? []), r]);
  }
  return [...dias].map(([data, lista]) => ({ data, reservas: lista }));
}

/** As reservas confirmadas de hoje (desde a meia-noite de Niterói) até `dias` dias adiante. */
export async function reservasDosProximosDias(repo: Repositorio, agora: Date, dias = 14) {
  const hoje = dataEmNiteroi(agora);
  const reservas = await repo.reservasEntre(instanteEmNiteroi(hoje, "00:00"), instanteEmNiteroi(somarDias(hoje, dias), "00:00"));
  return agruparPorDia(reservas);
}

// ---------- cancelar uma reserva, com o motivo ----------

export function motivoValido(motivo: string) {
  return motivo.length >= 2 && motivo.length <= 200;
}

export type DesfechoDoCancelamentoPeloDono =
  | { tipo: "cancelada"; reserva: Reserva; emailEnviado: boolean }
  | { tipo: "nao-encontrada" }
  | { tipo: "ja-cancelada" }
  | { tipo: "motivo-invalido" };

export async function cancelarPeloDono(d: DependenciasDoPainel, reservaId: number, motivo: string): Promise<DesfechoDoCancelamentoPeloDono> {
  const agora = d.agora ?? new Date();
  const avisar = d.avisar ?? ((texto: string) => console.warn(texto));
  const texto = motivo.trim().replace(/[\r\n]+/g, " ");
  if (!motivoValido(texto)) return { tipo: "motivo-invalido" };
  const reserva = await d.repo.reservaPorId(reservaId);
  if (!reserva) return { tipo: "nao-encontrada" };
  if (reserva.situacao === "cancelada" || !(await d.repo.cancelar(reserva.id, agora))) return { tipo: "ja-cancelada" };
  let emailEnviado = true;
  try {
    await d.correio(avisoDeCancelamentoAPessoa(reserva, texto, d.ctx));
  } catch (erro) {
    emailEnviado = false;
    avisar(`agenda: o aviso de cancelamento da reserva ${reserva.id} à pessoa não saiu: ${textoDoErro(erro)}`);
  }
  await apagarEventoDoGoogle(d.google, reserva, avisar);
  return { tipo: "cancelada", reserva, emailEnviado };
}

// ---------- bloquear um horário ou um dia (a folga) ----------

export type CamposDoBloqueio = {
  /** "casa" (a casa inteira) ou o id do profissional. */
  profissional: string;
  dia: string;
  /** O último dia do bloqueio, se passar de um dia; vazio: só o `dia`. */
  diaFim: string;
  /** Vazios, o dia inteiro; preenchidos, o horário ("14:00" às "16:00"). */
  de: string;
  ate: string;
  motivo: string;
};
export type ErrosDoBloqueio = Partial<Record<keyof CamposDoBloqueio, string>>;

/** A mensagem de cada campo do bloqueio; a página as lê pela chave que a ação devolve no endereço. */
export const ERROS_DO_BLOQUEIO: Record<keyof CamposDoBloqueio, string> = {
  profissional: "Escolha o profissional ou a casa inteira.",
  dia: "Informe o dia.",
  diaFim: "O último dia não existe ou vem antes do primeiro.",
  de: "Informe o horário de início e o de fim, ou deixe os dois vazios para bloquear o dia inteiro.",
  ate: "O fim tem de vir depois do início.",
  motivo: "Escreva o motivo, até 80 caracteres.",
};

const HORA = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Confere os campos do bloqueio e, estando certos, devolve a folga com os instantes em UTC. */
export function lerBloqueio(c: CamposDoBloqueio): { folga: NovaFolga } | { erros: ErrosDoBloqueio } {
  const erros: ErrosDoBloqueio = {};
  const marcar = (campo: keyof CamposDoBloqueio) => void (erros[campo] = ERROS_DO_BLOQUEIO[campo]);
  if (c.profissional !== "casa" && !/^\d{1,9}$/.test(c.profissional)) marcar("profissional");
  if (!dataValida(c.dia)) marcar("dia");
  const diaFim = c.diaFim || c.dia;
  if (c.diaFim && !dataValida(c.diaFim)) marcar("diaFim");
  else if (dataValida(c.dia) && dataValida(diaFim) && diaFim < c.dia) marcar("diaFim");
  const diaInteiro = !c.de && !c.ate;
  if (!diaInteiro && (!HORA.test(c.de) || !HORA.test(c.ate))) marcar("de");
  const motivo = c.motivo.trim().replace(/[\r\n]+/g, " ");
  if (motivo.length < 2 || motivo.length > 80) marcar("motivo");
  if (Object.keys(erros).length > 0) return { erros };

  const inicio = instanteEmNiteroi(c.dia, diaInteiro ? "00:00" : c.de);
  const fim = diaInteiro ? instanteEmNiteroi(somarDias(diaFim, 1), "00:00") : instanteEmNiteroi(diaFim, c.ate);
  if (fim.getTime() <= inicio.getTime()) return { erros: { ate: ERROS_DO_BLOQUEIO.ate } };
  return { folga: { profissionalId: c.profissional === "casa" ? null : Number(c.profissional), inicio, fim, motivo } };
}

// ---------- os dados de uma pessoa (o pedido do titular) ----------

/** O que o dono digitou na busca: um e-mail, ou um telefone com DDD. Nulo se não for nenhum dos dois. */
export function lerBusca(texto: string): { email: string } | { telefone: string } | null {
  const t = texto.trim();
  if (t.includes("@")) return emailValido(t) ? { email: t.toLowerCase() } : null;
  const telefone = lerTelefone(t);
  return telefone ? { telefone } : null;
}

/** Apaga as reservas da pessoa, de qualquer situação, com os blocos; o evento no Google sai junto, se houver. */
export async function apagarDadosDaPessoa(d: Pick<DependenciasDoPainel, "repo" | "google" | "avisar">, busca: { email: string } | { telefone: string }) {
  const avisar = d.avisar ?? ((texto: string) => console.warn(texto));
  const achadas = await d.repo.buscarPessoa(busca);
  const apagadas = await d.repo.apagarReservas(achadas.map((r) => r.id));
  for (const r of apagadas) await apagarEventoDoGoogle(d.google, r, avisar);
  return { apagadas: apagadas.length };
}

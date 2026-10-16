// lib/demos/barbearia/pedido.ts — o pedido padrão do agendador da Barbearia Santa Rosa (correção de 14.10.2026, depois
// do crítico de fora): o primeiro horário livre pelo relógio da casa, e não sempre "terça de manhã". Numa quarta às
// 20h56, com a casa avisando "abre amanhã, às 9h", o pedido já sai para quinta de manhã. Desde o fechamento com o
// Impeccable (16.10.2026), também as regras que impedem o pedido impossível (o dia em que a pessoa não atende, a noite
// de sábado), a data de cada dia e o estado da agenda de retorno. Funções puras, só com import de tipo (rodam direto
// no node:test: registros/demos/barbearia/testes/barbearia.test.ts).

import type { Agora, Dia, Expediente, Fechamento } from "../relogio";

type Periodo = { nome: string; inicio: string; fim: string };

const DIA = 86_400_000;
const minutosDe = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));
const somarDias = (data: string, n: number) => {
  const d = new Date(`${data}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const diasEntre = (de: string, ate: string) => Math.round((Date.parse(`${ate}T00:00:00Z`) - Date.parse(`${de}T00:00:00Z`)) / DIA);

/**
 * O dia em que a casa abre de novo, com ela fechada: hoje, se ainda abre mais tarde; senão, o primeiro dia aberto
 * seguinte (pulando os fechamentos). Os espelhos da Equipe (desde 16/10) ficam a meia-luz para quem atende nesse dia.
 * Sem nenhum em oito dias, null.
 */
export function diaDaAbertura(agora: Agora, expediente: Expediente, fechamentos: readonly Fechamento[]): Dia | null {
  for (let k = 0; k < 8; k++) {
    const dia = ((agora.dia + k) % 7) as Dia;
    if (fechamentos.some((f) => f.data === somarDias(agora.data, k))) continue;
    if (expediente[dia].some((f) => k > 0 || minutosDe(f.abre) > agora.minutos)) return dia;
  }
  return null;
}

/** Os períodos que cabem num dia da semana: os que cruzam o expediente (o sábado fecha às 17h: a noite não entra). */
export function periodosDoDia(dia: Dia, expediente: Expediente, periodos: readonly Periodo[]): readonly Periodo[] {
  const faixas = expediente[dia];
  if (!faixas.length) return [];
  const abre = Math.min(...faixas.map((f) => minutosDe(f.abre)));
  const fecha = Math.max(...faixas.map((f) => minutosDe(f.fecha)));
  return periodos.filter((p) => minutosDe(p.inicio) < fecha && minutosDe(p.fim) > abre);
}

/** O primeiro período livre k dias depois de hoje: hoje, só o que termina depois de agora; num fechamento, nenhum. */
const periodoLivre = (agora: Agora, k: number, expediente: Expediente, fechamentos: readonly Fechamento[], periodos: readonly Periodo[]) => {
  if (fechamentos.some((f) => f.data === somarDias(agora.data, k))) return undefined;
  const depoisDe = k === 0 ? agora.minutos : -1;
  return periodosDoDia(((agora.dia + k) % 7) as Dia, expediente, periodos).find((p) => minutosDe(p.fim) > depoisDe);
};

/**
 * O dia da semana e o período do primeiro horário livre: hoje, se ainda há um período que termina depois de agora
 * dentro do expediente; senão, o primeiro dia aberto seguinte (pulando os fechamentos), no primeiro período dele. Sem
 * nenhum em oito dias, null (o agendador fica no padrão escrito).
 */
export function proximoPedido(agora: Agora, expediente: Expediente, fechamentos: readonly Fechamento[], periodos: readonly Periodo[]): { dia: Dia; periodo: string } | null {
  for (let k = 0; k < 8; k++) {
    const periodo = periodoLivre(agora, k, expediente, fechamentos, periodos);
    if (periodo) return { dia: ((agora.dia + k) % 7) as Dia, periodo: periodo.nome };
  }
  return null;
}

/**
 * A data (AAAA-MM-DD) que cada dia da semana quer dizer no agendador ("SEX 16"): a próxima em que ele tem horário
 * livre, pela regra do pedido padrão (hoje, só se ainda há período; o feriado passa à semana seguinte). Em duas
 * semanas sem nenhuma, o dia fica sem data.
 */
export function proximasDatas(agora: Agora, expediente: Expediente, fechamentos: readonly Fechamento[], periodos: readonly Periodo[]): Partial<Record<Dia, string>> {
  const datas: Partial<Record<Dia, string>> = {};
  for (let k = 0; k < 14; k++) {
    const dia = ((agora.dia + k) % 7) as Dia;
    if (!datas[dia] && periodoLivre(agora, k, expediente, fechamentos, periodos)) datas[dia] = somarDias(agora.data, k);
  }
  return datas;
}

/**
 * O pedido possível mais perto do escolhido. O dia em que a pessoa escolhida não atende passa ao seguinte em que ela
 * atende (Rui, numa terça, vai para quinta); o período que não cabe no dia passa ao primeiro que cabe (a noite de
 * sábado vai para a manhã). O agendador anuncia cada troca.
 */
export function corrigirPedido(
  pedido: { dia: Dia; periodo: string },
  expediente: Expediente,
  periodos: readonly Periodo[],
  diasDaPessoa?: readonly number[],
): { dia: Dia; periodo: string } {
  const atende = (d: Dia) => expediente[d].length > 0 && (!diasDaPessoa || diasDaPessoa.includes(d));
  const dia = ([0, 1, 2, 3, 4, 5, 6].map((k) => ((pedido.dia + k) % 7) as Dia).find(atende) ?? pedido.dia) as Dia;
  const cabem = periodosDoDia(dia, expediente, periodos);
  const periodo = cabem.some((p) => p.nome === pedido.periodo) ? pedido.periodo : (cabem[0]?.nome ?? pedido.periodo);
  return { dia, periodo };
}

export type EstadoDoRetorno =
  | { tipo: "vazio" | "futuro" }
  | { tipo: "antes" | "aberta" | "passou"; dias: number; passados: number; inicio: string; fim: string };

/**
 * O estado da agenda de retorno, com a data do último corte (AAAA-MM-DD, a do campo) e a de hoje: sem data, "vazio";
 * depois de hoje, "futuro" (o campo tem max, mas a data digitada passa); senão, a janela (do mínimo ao máximo de dias
 * depois do corte) e quantos dias faltam para ela abrir ("antes") ou se passaram desde que fechou ("passou").
 */
export function estadoDoRetorno(ultimo: string, hoje: string, minimo: number, maximo: number): EstadoDoRetorno {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ultimo) || Number.isNaN(Date.parse(ultimo))) return { tipo: "vazio" };
  const passados = diasEntre(ultimo, hoje);
  if (passados < 0) return { tipo: "futuro" };
  const janela = { passados, inicio: somarDias(ultimo, minimo), fim: somarDias(ultimo, maximo) };
  if (passados < minimo) return { tipo: "antes", dias: minimo - passados, ...janela };
  if (passados <= maximo) return { tipo: "aberta", dias: 0, ...janela };
  return { tipo: "passou", dias: passados - maximo, ...janela };
}

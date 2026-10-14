// lib/demos/odontologia/tempo.ts — o tempo da Odontologia Boa Viagem sobre o relógio comum dos sites de demonstração
// (lib/demos/relogio.ts: o horário em texto, o relógio de Niterói e o estado do expediente). Aqui fica só o que é da
// clínica: a urgência do dia, o encaixe no mesmo dia para quem avisar até a hora. Função pura, sem import de valor
// (roda direto no node:test).
import type { Agora, Dia, Expediente, Fechamento } from "../relogio";

export type Urgencia = { dias: readonly Dia[]; ate: string };

const minutosDe = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));
const emHoras = (hhmm: string) => (hhmm.endsWith(":00") ? `${Number(hhmm.slice(0, 2))}h` : `${Number(hhmm.slice(0, 2))}h${hhmm.slice(3, 5)}`);

/** A linha da urgência: a do dia (com expediente hoje e antes da hora) ou a regra geral. */
export function urgenciaDoDia(agora: Agora, expediente: Expediente, fechamentos: readonly Fechamento[], urgencia: Urgencia): string {
  const abreHoje = !fechamentos.some((f) => f.data === agora.data) && expediente[agora.dia].length > 0;
  return urgencia.dias.includes(agora.dia) && abreHoje && agora.minutos < minutosDe(urgencia.ate)
    ? `Com dor hoje: avise até as ${emHoras(urgencia.ate)} e o encaixe é no mesmo dia.`
    : `Com dor: de segunda a sexta, quem avisa até as ${emHoras(urgencia.ate)} é atendido no mesmo dia.`;
}

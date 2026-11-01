// lib/agenda/lembrete.ts — a regra do lembrete e a do prazo de cancelamento, como cálculo puro (producao/esteira/14-funcionalidades/05-agenda.md,
// seções 7 e 8). O MySQL aplica a regra do lembrete em SQL; a memória, por esta função; os testes provam que dizem o mesmo.
import type { Reserva } from "./tipos.ts";

const HORA = 60 * 60_000;

/**
 * Quem recebe o lembrete: reserva confirmada, ainda não lembrada, que começa daqui a mais de 2 horas e até 24 horas, e
 * que foi feita 24 horas ou mais antes do horário (quem marca na véspera acabou de receber a confirmação: um lembrete
 * minutos depois dela não é "na véspera").
 */
export function elegivelParaLembrete(r: Pick<Reserva, "situacao" | "lembreteEnviadoEm" | "inicio" | "criadaEm">, agora: Date) {
  const inicio = r.inicio.getTime();
  return (
    r.situacao === "confirmada" &&
    r.lembreteEnviadoEm === null &&
    inicio >= agora.getTime() + 2 * HORA &&
    inicio <= agora.getTime() + 24 * HORA &&
    r.criadaEm.getTime() <= inicio - 24 * HORA
  );
}

/** A pessoa cancela até `cancelamentoAteMin` minutos antes do horário (inclusive); depois, só pelo WhatsApp da casa. */
export function dentroDoPrazoDeCancelamento(inicio: Date, agora: Date, cancelamentoAteMin: number) {
  return agora.getTime() <= inicio.getTime() - cancelamentoAteMin * 60_000;
}

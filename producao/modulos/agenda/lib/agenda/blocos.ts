// lib/agenda/blocos.ts — o cálculo por trás da reserva sem conflito (producao/esteira/14-funcionalidades/05-agenda.md, seção 5):
// os blocos de 15 minutos que uma reserva ocupa, e que erro do banco quer dizer "outro pedido levou o horário".
// Puro. A defesa final contra a marcação dupla é a chave única (profissional, bloco) do banco, e não este arquivo.

export const BLOCO_MIN = 15;

/**
 * Os inícios dos blocos que a reserva ocupa: os do serviço e os do intervalo depois dele.
 * 14h00 por 40 min (30 de serviço e 10 de intervalo) ocupa 14h00, 14h15 e 14h30.
 */
export function blocosDaReserva(inicio: Date, ocupaMin: number) {
  if (!(ocupaMin > 0)) throw new RangeError(`ocupação fora do possível: ${ocupaMin} min`);
  return Array.from({ length: Math.ceil(ocupaMin / BLOCO_MIN) }, (_, i) => new Date(inicio.getTime() + i * BLOCO_MIN * 60_000));
}

/**
 * 1062 (ER_DUP_ENTRY): outro pedido levou o bloco. 1213 (ER_LOCK_DEADLOCK) e 1205 (ER_LOCK_WAIT_TIMEOUT): a disputa
 * pelos mesmos blocos não terminou a favor deste pedido. Nos três casos, a pessoa escolhe de novo, na lista recalculada.
 */
export function ehDisputaPerdida(erro: unknown) {
  const errno = (erro as { errno?: unknown } | null | undefined)?.errno;
  return errno === 1062 || errno === 1213 || errno === 1205;
}

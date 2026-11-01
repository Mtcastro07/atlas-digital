// lib/agenda/fuso.ts — hora de parede de Niterói ↔ instante UTC, pelo nome do fuso (producao/esteira/14-funcionalidades/05-agenda.md,
// seção 4). O expediente é hora de parede ("09:00"); a reserva é um instante UTC. O fuso vai pelo nome
// (America/Sao_Paulo), nunca como −03:00 fixo: o horário de verão está suspenso desde 2019, e a base de fusos do Node
// cuida dele se voltar (e já o conhece nas datas de antes de 2019). Sem biblioteca de datas: o Intl faz a conta.
// Só o Intl do Node. O "agora" nunca é lido aqui dentro: as funções recebem o instante.
const relogio = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const partes = (instante: number) => Object.fromEntries(relogio.formatToParts(new Date(instante)).map((x) => [x.type, x.value]));

/** Quantos minutos Niterói está à frente do UTC num instante (hoje, −180). */
function deslocamento(instante: number) {
  const p = partes(instante);
  const comoUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute);
  return Math.round((comoUtc - Math.floor(instante / 60_000) * 60_000) / 60_000);
}

/**
 * O instante UTC de uma data e hora de parede em Niterói ("2026-10-09", "14:30" → 17:30Z).
 * Uma hora que não existe (o salto do horário de verão) cai uma hora antes; nenhum expediente começa à meia-noite.
 */
export function instanteEmNiteroi(data: string, hora: string) {
  const [a, m, d] = data.split("-").map(Number);
  const [h, min] = hora.split(":").map(Number);
  const comoUtc = Date.UTC(a, m - 1, d, h, min);
  // Duas passadas: a segunda corrige a data que cai do outro lado de uma mudança de horário.
  let instante = comoUtc - deslocamento(comoUtc) * 60_000;
  instante = comoUtc - deslocamento(instante) * 60_000;
  return new Date(instante);
}

/** A data de Niterói de um instante: "2026-10-09". É o dia do expediente, e pode diferir da data em UTC. */
export function dataEmNiteroi(instante: Date) {
  const p = partes(instante.getTime());
  return `${p.year}-${p.month}-${p.day}`;
}

/** A hora de parede de Niterói de um instante: "14:30". */
export function horaEmNiteroi(instante: Date) {
  const p = partes(instante.getTime());
  return `${p.hour}:${p.minute}`;
}

/** A data vem do endereço: só "aaaa-mm-dd" de um dia que existe ("2026-13-45" viraria 14.02.2027 no Date.UTC). */
export function dataValida(data: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) return false;
  const [a, m, d] = data.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, d)).toISOString().slice(0, 10) === data;
}

/** O dia da semana de uma data válida "aaaa-mm-dd" (0 = domingo). Não depende do fuso. */
export function diaDaSemana(data: string) {
  const [a, m, d] = data.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, d)).getUTCDay();
}

/** "2026-12-31" + 1 → "2027-01-01". */
export function somarDias(data: string, dias: number) {
  const [a, m, d] = data.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, d + dias)).toISOString().slice(0, 10);
}

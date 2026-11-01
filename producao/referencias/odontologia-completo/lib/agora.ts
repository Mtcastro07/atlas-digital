// lib/agora.ts — a data, o dia da semana e os minutos de parede de Niterói, num instante qualquer
// (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 5). O fuso vai pelo nome
// (America/Sao_Paulo), nunca como "−03:00" fixo, e nunca é o do aparelho de quem lê.
const DIAS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 } as const;
const relogio = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export type Agora = { data: string; dia: 0 | 1 | 2 | 3 | 4 | 5 | 6; minutos: number };

export function agoraEmNiteroi(instante: Date = new Date()): Agora {
  const partes = Object.fromEntries(relogio.formatToParts(instante).map((p) => [p.type, p.value]));
  return {
    data: `${partes.year}-${partes.month}-${partes.day}`, // "2026-10-12": para conferir os fechamentos
    dia: DIAS[partes.weekday as keyof typeof DIAS],
    minutos: Number(partes.hour) * 60 + Number(partes.minute),
  };
}

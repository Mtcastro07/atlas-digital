/**
 * O prazo a partir de agora, em datas reais (17/10, "o Atlas Digital": a régua de O trabalho e o relógio do prazo; e,
 * desde a direção final de 17/10, o mostrador da capa e a carta do prazo, que viram figura grande). Os dias se contam
 * no calendário de Niterói (o fuso de Brasília) e se representam como datas UTC ao meio-dia: a conta de dias não cruza
 * fuso nem horário de verão. O agora vem de relogio() (lib/sol.ts), que lê ?agora= fora da produção; aqui, todo agora
 * entra por parâmetro.
 * Desde 17/10, os dias úteis pulam os feriados nacionais (abaixo), e não só o sábado e o domingo: com Finados, o 15º
 * dia útil a partir de 17/10/2026 é 9/11, e não 6/11.
 * shortcut: os feriados de Niterói (24/06, São João Batista, pela imprensa local) e os do estado do RJ (23/04, São
 * Jorge) ficam fora, porque a lei de cada um não foi conferida; somá-los a FIXOS quando conferidos na fonte.
 */
const ZONA = "America/Sao_Paulo";
const dataLocal = new Intl.DateTimeFormat("en-CA", { timeZone: ZONA, year: "numeric", month: "2-digit", day: "2-digit" });
const iso = (dia: Date) => dia.toISOString().slice(0, 10);

/** O dia de hoje em Niterói. */
export function hojeEmNiteroi(agora = new Date()) {
  const [ano, mes, dia] = dataLocal.format(agora).split("-").map(Number);
  return new Date(Date.UTC(ano, mes - 1, dia, 12));
}

/**
 * 00:00 do dia de Niterói de `agora` (mais `dias`), como instante. shortcut: o fuso fixo em UTC−3, porque o Brasil não
 * tem horário de verão desde 2019 (Decreto 9.772/2019); se ele voltar, tirar o deslocamento do Intl.
 */
export function meiaNoiteEmNiteroi(agora: Date, dias = 0) {
  const [ano, mes, dia] = dataLocal.format(agora).split("-").map(Number);
  return new Date(Date.UTC(ano, mes - 1, dia + dias, 3));
}

/** O domingo de Páscoa de um ano, ao meio-dia UTC (o cômputo gregoriano anônimo, de Meeus, Jones e Butcher). */
export function pascoa(ano: number) {
  const a = ano % 19;
  const b = Math.floor(ano / 100);
  const c = ano % 100;
  const d = (19 * a + b - Math.floor(b / 4) - Math.floor((b - Math.floor((8 * b + 13) / 25)) / 3) + 15) % 30;
  const e = (32 + 2 * (b % 4) + 2 * Math.floor(c / 4) - d - (c % 4)) % 7;
  const f = d + e - 7 * Math.floor((a + 11 * d + 22 * e) / 451) + 114;
  return new Date(Date.UTC(ano, Math.floor(f / 31) - 1, (f % 31) + 1, 12));
}

/**
 * Os feriados nacionais de data fixa, por "MM-DD": a Lei 662/1949 (com a redação da Lei 10.607/2002), a Lei 6.802/1980
 * (12/10) e a Lei 14.759/2023 (20/11, desde 2024). Valem para todo ano, e não só para 2026 e 2027.
 */
const FIXOS: Record<string, string> = {
  "01-01": "Confraternização Universal",
  "04-21": "Tiradentes",
  "05-01": "Dia do Trabalho",
  "09-07": "Independência",
  "10-12": "Nossa Senhora Aparecida",
  "11-02": "Finados",
  "11-15": "Proclamação da República",
  "11-20": "Dia Nacional de Zumbi e da Consciência Negra",
  "12-25": "Natal",
};

/**
 * O nome do feriado nacional do dia, ou undefined: os fixos e a Sexta-feira da Paixão (a Páscoa − 2; em 2026, 3/4; em
 * 2027, 26/3). A Paixão é feriado religioso por lei municipal (Lei 9.093/1995), mas vale no país inteiro, e entra aqui.
 */
export function feriado(dia: Date): string | undefined {
  const paixao = pascoa(dia.getUTCFullYear());
  paixao.setUTCDate(paixao.getUTCDate() - 2);
  return iso(dia) === iso(paixao) ? "Sexta-feira da Paixão" : FIXOS[iso(dia).slice(5)];
}

/** Dia de trabalho: de segunda a sexta, fora dos feriados nacionais. */
export const diaDeTrabalho = (dia: Date) => dia.getUTCDay() % 6 !== 0 && !feriado(dia);

/** O n-ésimo dia útil depois de `dia` (n = 0: o próprio dia), pulando o fim de semana e os feriados nacionais. */
export function diaUtil(dia: Date, n: number) {
  const d = new Date(dia);
  for (let contados = 0; contados < n; ) {
    d.setUTCDate(d.getUTCDate() + 1);
    if (diaDeTrabalho(d)) contados++;
  }
  return d;
}

/**
 * O rascunho, se o briefing completo fechar em `agora`: 24 horas corridas, como o site diz hoje (decidido por omissão
 * em 17/10 e levado a Matheus Castro Oliveira de Luna Garcia: o rascunho de um sábado chega no domingo; a outra opção,
 * o próximo dia útil, muda só esta função e o carimbo). REGRA_DO_RASCUNHO é o carimbo que diz isso.
 */
export const rascunho = (agora: Date) => new Date(agora.getTime() + 86_400_000);
export const REGRA_DO_RASCUNHO = "24 horas corridas, pelo relógio deste aparelho.";

/** "28 de out." */
export const diaEMes = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", day: "numeric", month: "short" });
/** "sáb., 18/10, 15:44:14": um instante, na hora de Niterói. */
export const instante = new Intl.DateTimeFormat("pt-BR", { timeZone: ZONA, weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });

const partesDoInstante = new Intl.DateTimeFormat("pt-BR", { timeZone: ZONA, weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
/** "dom. 18/10, 18:28:43" (ou "dom. 18/10, 18:28", sem os segundos): o instante do mostrador, na hora de Niterói. */
export function escritaDoInstante(data: Date, segundos = true) {
  const p = Object.fromEntries(partesDoInstante.formatToParts(data).map((x) => [x.type, x.value]));
  return `${p.weekday.replace(".", "")}. ${p.day}/${p.month}, ${p.hour}:${p.minute}${segundos ? `:${p.second}` : ""}`;
}

const horaEMinuto = new Intl.DateTimeFormat("pt-BR", { timeZone: ZONA, hour: "numeric", minute: "2-digit", hourCycle: "h23" });
/** "5h18": a hora de um instante em Niterói, como se diz o nascer e o pôr do Sol. */
export const horaCurta = (data: Date) => horaEMinuto.format(data).replace(":", "h");

/**
 * "hoje, às 5h18", "amanhã, às 5h18" ou "dom. 18/10, às 5h18": um instante futuro dito a partir de `agora`, no
 * calendário de Niterói (a legenda da Terra e o amanhecer do Fim).
 */
export function quando(data: Date, agora: Date) {
  const dias = Math.round((hojeEmNiteroi(data).getTime() - hojeEmNiteroi(agora).getTime()) / 86_400_000);
  const dia = dias === 0 ? "hoje" : dias === 1 ? "amanhã" : escritaDoInstante(data).split(",")[0];
  return `${dia}, às ${horaCurta(data)}`;
}

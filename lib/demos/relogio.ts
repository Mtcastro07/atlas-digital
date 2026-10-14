// lib/demos/relogio.ts — o relógio comum dos sites de demonstração: o horário em texto, a hora de parede de Niterói e
// o estado do expediente ("aberto agora, fecha às 15h30"). É função, como os componentes de horário da base do kit:
// não carrega a identidade de nenhum site (producao/esteira/19-o-padrao-atlas.md, seção 8.1). Funções puras, sem
// import de valor (rodam direto no node:test). O fuso vai pelo nome (America/Sao_Paulo), nunca o do aparelho.

/** Uma faixa de atendimento, em hora de parede: "11:00" a "15:30". */
export type Faixa = { abre: string; fecha: string };
/** 0 = domingo. */
export type Dia = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Expediente = Record<Dia, readonly Faixa[]>;
export type Fechamento = { data: string; motivo: string };
export type Agora = { data: string; dia: Dia; minutos: number };

const DIAS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"] as const;
const DIAS_NA_FRASE = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"] as const;
const DE_SEGUNDA_A_DOMINGO: readonly Dia[] = [1, 2, 3, 4, 5, 6, 0];

/** "11:00" → "11h"; "15:30" → "15h30". */
export const emHoras = (hhmm: string) => {
  const [h, m] = hhmm.split(":");
  return `${Number(h)}h${m === "00" ? "" : m}`;
};

/** As faixas de um dia: "11h às 15h30"; "Fechado". */
export const faixasDoDia = (faixas: readonly Faixa[]) => (faixas.length ? faixas.map((f) => `${emHoras(f.abre)} às ${emHoras(f.fecha)}`).join(" e ") : "Fechado");

/** O expediente dia a dia, de segunda a domingo. */
export const diaADia = (expediente: Expediente) => DE_SEGUNDA_A_DOMINGO.map((d) => ({ dia: DIAS[d], texto: faixasDoDia(expediente[d]) }));

/** Os dias seguidos de mesmo horário juntos: "Segunda a sexta", "11h às 15h30". */
export function diasJuntos(expediente: Expediente) {
  const grupos: { de: Dia; ate: Dia; texto: string }[] = [];
  for (const d of DE_SEGUNDA_A_DOMINGO) {
    const texto = faixasDoDia(expediente[d]);
    const ultimo = grupos.at(-1);
    if (ultimo?.texto === texto) ultimo.ate = d;
    else grupos.push({ de: d, ate: d, texto });
  }
  return grupos.map((g) => ({ dias: g.de === g.ate ? DIAS[g.de] : `${DIAS[g.de]} a ${DIAS_NA_FRASE[g.ate]}`, texto: g.texto }));
}

const formato = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});
const SEMANA_EM_INGLES = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 } as const;

/** A data, o dia da semana e os minutos de parede de Niterói, num instante qualquer. */
export function horaDeNiteroi(instante: Date = new Date()): Agora {
  const p = Object.fromEntries(formato.formatToParts(instante).map((x) => [x.type, x.value]));
  return { data: `${p.year}-${p.month}-${p.day}`, dia: SEMANA_EM_INGLES[p.weekday as keyof typeof SEMANA_EM_INGLES], minutos: Number(p.hour) * 60 + Number(p.minute) };
}

const minutosDe = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));
const somarDias = (data: string, n: number) => {
  const d = new Date(`${data}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

/**
 * O estado do expediente: aberto ou não, e a linha que o diz ("Aberto agora, fecha às 15h30"). Com uma faixa depois
 * da de agora, no mesmo dia (o almoço da clínica), a linha diz quando reabre.
 */
export function estadoDoExpediente(agora: Agora, expediente: Expediente, fechamentos: readonly Fechamento[]): { aberto: boolean; linha: string } {
  const fechado = (data: string) => fechamentos.some((f) => f.data === data);
  const hoje = fechado(agora.data) ? [] : expediente[agora.dia];
  const atual = hoje.find((f) => agora.minutos >= minutosDe(f.abre) && agora.minutos < minutosDe(f.fecha));
  if (atual) {
    const depois = hoje.find((f) => minutosDe(f.abre) >= minutosDe(atual.fecha));
    return { aberto: true, linha: `Aberto agora, fecha às ${emHoras(atual.fecha)}${depois ? ` e reabre às ${emHoras(depois.abre)}` : ""}` };
  }
  const ainda = hoje.find((f) => minutosDe(f.abre) > agora.minutos);
  if (ainda) return { aberto: false, linha: `Fechado agora, abre às ${emHoras(ainda.abre)}` };
  for (let n = 1; n <= 8; n++) {
    const dia = ((agora.dia + n) % 7) as Dia;
    const faixas = fechado(somarDias(agora.data, n)) ? [] : expediente[dia];
    if (faixas.length) return { aberto: false, linha: `Fechado agora, abre ${n === 1 ? "amanhã" : DIAS_NA_FRASE[dia]}, às ${emHoras(faixas[0].abre)}` };
  }
  return { aberto: false, linha: "Fechado agora" };
}

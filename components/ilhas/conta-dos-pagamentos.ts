/**
 * As contas de tempo da carta dos pagamentos de /orcamento (desde 17/10, a direção final do Atlas Digital, seção 3, item
 * 16; o desenho é ilhas/desenho-da-conta.ts): a partir de `agora`, hoje (a parcela do briefing), a janela da publicação
 * (os dias úteis 7 a 15, com os feriados nacionais) e o começo da mensalidade, no mês seguinte à publicação. Quando a
 * janela cruza a virada do mês, o primeiro mês da mensalidade é incerto: `chance` é a parte dos dias úteis da janela
 * que cai no primeiro mês (a mensalidade começa no mês seguinte a ele só se a publicação sair nele).
 * Sem import: o Node dos testes (registros/atlas/testes/conta-dos-pagamentos.test.ts) não resolve o caminho com "@/", e
 * o calendário de lib/prazo.ts entra por parâmetro.
 */

/** O calendário de lib/prazo.ts que a conta usa (as datas são UTC ao meio-dia, no calendário de Niterói). */
export type Calendario = {
  hojeEmNiteroi(agora: Date): Date;
  diaUtil(dia: Date, n: number): Date;
  diaDeTrabalho(dia: Date): boolean;
};

/** O ano e o mês (0 a 11) de uma data ao meio-dia UTC, num número só (ano × 12 + mês), para comparar meses. */
export const mesDe = (d: Date) => d.getUTCFullYear() * 12 + d.getUTCMonth();
export const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const nomeLongo = (m: number) => new Intl.DateTimeFormat("pt-BR", { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(Math.floor(m / 12), m % 12, 15)));

export function contaDosPagamentos(agora: Date, calendario: Calendario) {
  const hoje = calendario.hojeEmNiteroi(agora);
  const ini = calendario.diaUtil(hoje, 7);
  const fim = calendario.diaUtil(hoje, 15);
  const uteis: Date[] = [];
  for (const d = new Date(ini); d <= fim; d.setUTCDate(d.getUTCDate() + 1)) if (calendario.diaDeTrabalho(d)) uteis.push(new Date(d));
  const primeiro = mesDe(ini);
  const incerto = mesDe(fim) !== primeiro;
  return {
    hoje,
    ini,
    fim,
    uteis,
    /** O mês (ano × 12 + mês) em que a mensalidade começa com certeza; o anterior a ele, se `chance` > 0, é incerto. */
    mensalidade: mesDe(fim) + 1,
    chance: incerto ? uteis.filter((d) => mesDe(d) === primeiro).length / uteis.length : 0,
    /** "nov. ou dez." ou "dez.": o mês em que a mensalidade começa, dito por extenso curto. */
    comeco: incerto ? `${MESES[(primeiro + 1) % 12]}. ou ${MESES[(primeiro + 2) % 12]}.` : `${MESES[(primeiro + 1) % 12]}.`,
    /** O mês incerto e o da publicação que o faria certo, por extenso, para a legenda ("novembro", "outubro"). */
    incerto: incerto ? ([nomeLongo(primeiro + 1), nomeLongo(primeiro)] as const) : null,
  };
}
export type ContaDosPagamentos = ReturnType<typeof contaDosPagamentos>;

/**
 * As casas acesas da coluna do mês (cinco por mês) na chance `parte`, de 0 a 1: Math.round(parte × 5), entre 1 e 4
 * quando a chance não é nem 0 nem 1, espalhadas na ordem 0, 2, 4, 1, 3 (o pontilhado ordenado numa fileira só). Desde
 * 18/10 (a revisão da peça): até então, o limiar de Bayer 4 × 4 numa fileira de 5 casas acendia o que a fileira dava, e
 * não a chance (2/9 não acendia nenhuma, e 4/9 acendia uma).
 */
export function casasDoMes(parte: number): number[] {
  if (parte <= 0) return [];
  if (parte >= 1) return [0, 1, 2, 3, 4];
  return [0, 2, 4, 1, 3].slice(0, Math.min(4, Math.max(1, Math.round(parte * 5))));
}

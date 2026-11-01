const formato = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

/** 1500 → "R$ 1.500". */
export function reais(valor: number) {
  return `R$ ${formato.format(valor)}`;
}

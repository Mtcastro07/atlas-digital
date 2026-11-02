const formato = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

/** 1500 → "R$ 1.500", com espaço fixo (U+00A0) entre o símbolo e o número: a linha nunca os separa (R10, 28/10). */
export function reais(valor: number) {
  return `R$ ${formato.format(valor)}`;
}

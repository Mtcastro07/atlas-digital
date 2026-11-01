// lib/moeda.ts — o valor em reais, sem centavos quando inteiro ("R$ 50"), com algarismos tabulares no CSS.
export function reais(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: Number.isInteger(valor) ? 0 : 2 });
}

/** 90 → "1h30"; 60 → "1h"; 45 → "45 min". */
export function duracao(minutos: number) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, "0")}`;
}

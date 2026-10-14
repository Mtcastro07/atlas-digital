// lib/demos/petshop/valores.ts — o valor e a duração da tabela do Banho e Tosa São Francisco, escritos como a casa
// escreve: "R$ 60,00" na tabela, "R$ 60" no preço grande da capa, "1 h 30" e "45 min" no tempo. Valores em centavos,
// durações em minutos (nada de vírgula flutuante no dinheiro). Funções puras, sem import de valor (rodam direto no
// node:test). O espaço entre o número e a unidade não quebra ( ).

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** 6000 → "R$ 60,00" (com o espaço sem quebra entre o símbolo e o número). */
export const real = (centavos: number) => moeda.format(centavos / 100);

/** 6000 → "60"; 9550 → "95,50": o número do preço grande, sem o símbolo (o "R$" vai menor, ao lado). */
export const reais = (centavos: number) => (centavos % 100 ? (centavos / 100).toFixed(2).replace(".", ",") : String(centavos / 100));

/** 60 → "1 h"; 90 → "1 h 30"; 135 → "2 h 15"; 45 → "45 min". */
export function duracao(minutos: number) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${String(m).padStart(2, "0")}` : `${h} h`;
}

/** 70 → "1:10": o relógio da linha do atendimento (o minuto em que cada etapa começa). */
export const noRelogio = (minutos: number) => `${Math.floor(minutos / 60)}:${String(minutos % 60).padStart(2, "0")}`;

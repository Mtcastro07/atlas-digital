// O número por extenso, de 1 a 12, para a frase que começa por ele ("Doze perguntas: …"; R10, fase 0). O gênero vale
// para "um/uma" e "dois/duas"; os outros não flexionam. Conferido por ferramentas/conferir-sistema.mjs.

const NOMES = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze"];

export type Genero = "m" | "f";

/** porExtenso(12, "f", true) → "Doze". Fora de 1 a 12 (ou não inteiro), o build para: a frase diria o número errado. */
export function porExtenso(n: number, genero: Genero = "m", abreAFrase = false) {
  if (!Number.isInteger(n) || n < 1 || n > 12) throw new Error(`porExtenso: ${n} fora de 1 a 12`);
  const nome = genero === "f" && n <= 2 ? ["", "uma", "duas"][n] : NOMES[n];
  return abreAFrase ? nome[0].toUpperCase() + nome.slice(1) : nome;
}

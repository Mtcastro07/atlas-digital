import { readFileSync } from "node:fs";
import path from "node:path";

// O código mostrado nas páginas é sempre o verdadeiro (R10, fase 0, S3): o trecho se lê do arquivo no build, pela
// âncora literal, e o número da linha vem dele, nunca digitado. Só o servidor o chama (a página e o componente
// <Trecho>, que não é ilha). Conferido por ferramentas/conferir-sistema.mjs.

export type Trecho = {
  /** O caminho a partir da raiz do projeto, como a legenda o mostra ("lib/whatsapp.ts"). */
  arquivo: string;
  /** O número da primeira e da última linha, contados de 1. */
  inicio: number;
  fim: number;
  /** As linhas, sem o recuo comum (a âncora parcial vem só ela, literal). */
  linhas: string[];
};

/**
 * trechoDe("lib/whatsapp.ts", "/** Endereço wa.me", 2) → as linhas 4 e 5. A âncora tem de aparecer numa linha só do
 * arquivo: ausente ou repetida, o build para (o número mostrado seria o errado). Quando ela é só um pedaço da linha
 * (`{"nome":"Icaraí",…}` em costa-de-niteroi.ts:12), o trecho é a âncora, literal, com o número da linha.
 */
export function trechoDe(arquivo: string, ancora: string, linhas = 1): Trecho {
  const texto = readFileSync(path.join(process.cwd(), arquivo), "utf8").split("\n");
  const onde = texto.flatMap((linha, i) => (linha.includes(ancora) ? [i] : []));
  if (onde.length !== 1) {
    throw new Error(`trechoDe: a âncora ${JSON.stringify(ancora)} aparece em ${onde.length} linhas de ${arquivo} (precisa de 1)`);
  }
  const i = onde[0];
  if (i + linhas > texto.length) throw new Error(`trechoDe: ${arquivo} não tem ${linhas} linhas a partir da ${i + 1}`);
  const parcial = linhas === 1 && texto[i].trim() !== ancora.trim();
  const corpo = parcial ? [ancora] : texto.slice(i, i + linhas);
  const recuo = Math.min(...corpo.filter((l) => l.trim()).map((l) => l.length - l.trimStart().length));
  return { arquivo, inicio: i + 1, fim: i + linhas, linhas: corpo.map((l) => l.slice(recuo).trimEnd()) };
}

/** A fonte por extenso, para a legenda: "linha 67", "linhas 4 e 5", "linhas 60 a 63". */
export function linhasDo({ inicio, fim }: Pick<Trecho, "inicio" | "fim">) {
  if (inicio === fim) return `linha ${inicio}`;
  return fim === inicio + 1 ? `linhas ${inicio} e ${fim}` : `linhas ${inicio} a ${fim}`;
}

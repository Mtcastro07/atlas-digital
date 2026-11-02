import { Fragment } from "react";

import type { Trecho as DadosDoTrecho } from "@/lib/trecho";

/**
 * O código verdadeiro, à vista (R10, fase 0, S3): as linhas vêm de trechoDe() (lib/trecho.ts), lidas do arquivo no
 * build, e nunca de texto colado. O recipiente é um só (a síntese do R10, 5.2, item 1): a linha solta no papel vai na
 * ficha lisa (o --ficha, o fio de 1 px a 12% do navy, raio de 18 px, do tamanho do código, sem sombra, sem barra de
 * janela, sem número de linha, sem cursor; no tom escuro, a mesma ficha sobre o --deep); o código que mora numa figura
 * vai sem ficha (`semFicha`). A letra é a mono do aparelho (--font-mono, D2), a 15/24 px na mesa e 14/22 px no
 * celular, sem ligaduras. A legenda alinha com o texto do código, e não com a borda (C-codigo.md, 3.2).
 *
 * As tintas (C-codigo.md, 3.3: "o quente é do negócio, o resto é da máquina"):
 * - "valor": o valor do negócio (o nome, a cidade, a medida), no bronze-sombra no papel e no bronze-brilho no escuro;
 * - "nome": o nome do elemento ou do campo, na tinta do texto (o navy no papel, o creme no escuro);
 * - "chave": a palavra da linguagem, na água rasa no papel e no apagado no escuro;
 * - "apagado": a pontuação e o comentário.
 * Quem chama marca os pedaços pelo texto literal (`tintas`); o que não for marcado: o comentário (/* … *\/ e //) e a
 * pontuação no apagado, o resto no "nome". Um pedaço marcado que não está no trecho para o build.
 */
type Papel = "valor" | "nome" | "chave" | "apagado";

type Props = {
  trecho: Pick<DadosDoTrecho, "linhas">;
  /** Os pedaços do trecho com a sua tinta, pelo texto literal; o primeiro que casa vence. */
  tintas?: ReadonlyArray<readonly [texto: string, papel: Papel]>;
  /** O código que mora numa figura: sem a ficha. */
  semFicha?: boolean;
  /** A legenda, a 16 px, alinhada com o texto do código. */
  legenda?: React.ReactNode;
  className?: string;
};

const PONTUACAO = /[{}()[\]<>=:;,.'"`/*+\-!?|&]/;

/** Cada caractere da linha com o seu papel; depois, os vizinhos de mesmo papel juntos. */
function pedacos(linha: string, tintas: Props["tintas"] = []) {
  const papel: (Papel | null)[] = Array.from(linha, () => null);
  for (const [texto, p] of tintas) {
    for (let i = linha.indexOf(texto); i >= 0 && texto; i = linha.indexOf(texto, i + texto.length)) {
      for (let k = i; k < i + texto.length; k++) papel[k] ??= p;
    }
  }
  const comentario = linha.search(/\/\*|\/\//);
  const saida: { texto: string; papel: Papel | null }[] = [];
  for (let k = 0; k < linha.length; k++) {
    const c = linha[k];
    const noComentario = comentario >= 0 && k >= comentario;
    const p = papel[k] ?? (noComentario ? "apagado" : /\s/.test(c) ? null : PONTUACAO.test(c) ? "apagado" : "nome");
    const ultimo = saida.at(-1);
    if (ultimo && ultimo.papel === p) ultimo.texto += c;
    else saida.push({ texto: c, papel: p });
  }
  return saida;
}

export function Trecho({ trecho, tintas, semFicha, legenda, className }: Props) {
  const todas = trecho.linhas.join("\n");
  for (const [texto] of tintas ?? []) {
    if (!todas.includes(texto)) throw new Error(`<Trecho>: a tinta ${JSON.stringify(texto)} não está no trecho`);
  }
  return (
    <figure className={["vd-trecho", !semFicha && "vd-trecho-ficha", className].filter(Boolean).join(" ")}>
      <pre>
        <code>
          {trecho.linhas.map((linha, i) => (
            <Fragment key={i}>
              {i > 0 && "\n"}
              {pedacos(linha, tintas).map((p, k) => (p.papel ? <span key={k} className={`vd-tinta-${p.papel}`}>{p.texto}</span> : p.texto))}
            </Fragment>
          ))}
        </code>
      </pre>
      {legenda && <figcaption>{legenda}</figcaption>}
    </figure>
  );
}

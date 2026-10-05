import localFont from "next/font/local";

// As fontes da Nutrição Icaraí, carregadas só pelo layout deste site
// (app/demos/nutricao/layout.tsx), com pré-carga: o título da capa é o
// maior elemento da primeira tela. As duas têm serifa — as únicas dos três
// sites —, e é isso que faz a folha impressa. Licença SIL Open Font
// License 1.1 (../fontes/OFL-*.txt).

/** Títulos: Fraunces no eixo óptico de cartaz (144), redonda e itálica. */
export const exibicaoDaNutricao = localFont({
  src: [
    { path: "../fontes/fraunces-144-400.woff2", weight: "400", style: "normal" },
    { path: "../fontes/fraunces-144-400-italico.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-exibicao",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/** Texto: Newsreader no eixo óptico de leitura (14), de 400 a 600, e o itálico. */
export const corpoDaNutricao = localFont({
  src: [
    { path: "../fontes/newsreader-texto.woff2", weight: "400 600", style: "normal" },
    { path: "../fontes/newsreader-texto-italico.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-corpo",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

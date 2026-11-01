import localFont from "next/font/local";

// As fontes da Barbearia Santa Rosa, carregadas só pelo layout deste site
// (app/demos/barbearia/layout.tsx). Instrument Serif nos títulos: alta,
// condensada e de alto contraste, com itálico — a serifa de cartaz de
// cinema. Jost no texto e nos rótulos: a geométrica dos letreiros de
// barbearia, variável de 300 a 600. A moeda do palco 3D é desenhada com a
// Instrument Serif (components/ilhas/demos/palco-3d/motor.ts). Licença SIL
// Open Font License 1.1 (../fontes/OFL-*.txt).

/** Títulos, números e a face da moeda. */
export const exibicaoDaBarbearia = localFont({
  src: [
    { path: "../fontes/instrument-serif.woff2", weight: "400", style: "normal" },
    { path: "../fontes/instrument-serif-italico.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-exibicao",
  display: "swap",
  // Sem "Bodoni 72": o next/font escreve as reservas sem aspas, e um nome
  // que termina em número invalida a declaração inteira (o título caía na Jost).
  fallback: ["Didot", "Georgia", "serif"],
});

/** Texto e rótulos. */
export const corpoDaBarbearia = localFont({
  src: "../fontes/jost-variavel.woff2",
  weight: "300 600",
  variable: "--font-corpo",
  display: "swap",
  fallback: ["Futura", "Century Gothic", "Arial", "sans-serif"],
});

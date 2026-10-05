import localFont from "next/font/local";

// As fontes do Depósito Engenhoca, carregadas só pelo layout deste site
// (app/demos/deposito/layout.tsx). Oswald, a letra de saco de cimento e de
// placa de obra (a mesma das telas da vitrine, aqui variável, de 300 a
// 700); Barlow, a grotesca das placas de estrada, no texto; IBM Plex Mono
// nos códigos e nas medidas. Licença SIL Open Font License 1.1
// (../fontes/OFL-*.txt).

/** Títulos e números de placa. */
export const exibicaoDoDeposito = localFont({
  src: "../fontes/oswald-variavel.woff2",
  weight: "300 700",
  variable: "--font-exibicao",
  display: "swap",
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

/** Texto corrido. */
export const corpoDoDeposito = localFont({
  src: [
    { path: "../fontes/barlow-400.woff2", weight: "400", style: "normal" },
    { path: "../fontes/barlow-500.woff2", weight: "500", style: "normal" },
    { path: "../fontes/barlow-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-corpo",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

/** Códigos, medidas e o cupom. Sem pré-carga: não aparece na primeira linha da capa. */
export const monoDoDeposito = localFont({
  src: "../fontes/plex-mono-500.woff2",
  weight: "500",
  variable: "--font-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "Menlo", "monospace"],
});

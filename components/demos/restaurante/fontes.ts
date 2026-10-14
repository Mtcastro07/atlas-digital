import localFont from "next/font/local";

// As fontes da Cozinha do Ingá, carregadas só pelo layout deste site (app/demos/restaurante/layout.tsx): a Libre Caslon,
// a serifa do cardápio impresso (producao/esteira/nichos/restaurante.md, seção 6.3). A Display nos títulos e na lousa;
// a Text no texto, nos pratos e nos preços, com algarismos tabulares (conferido em 09/10: a Display não os tem, e por
// isso nunca leva preço em coluna). Só o recorte latino, baixadas por producao/base/ferramentas/baixar-fonte.mjs em
// 09/10. Licença SIL Open Font License 1.1 (../fontes/OFL-libre-caslon-*.txt).

/** Títulos e lousa: a fonte que carrega a identidade, em "swap". */
export const tituloDaCasa = localFont({
  src: "../fontes/libre-caslon-display.woff2",
  weight: "400",
  variable: "--font-rs-titulo",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

/** Texto, pratos e preços: "optional", sem troca tardia que refaça o leiaute. */
export const textoDaCasa = localFont({
  src: [
    { path: "../fontes/libre-caslon-texto-400.woff2", weight: "400", style: "normal" },
    { path: "../fontes/libre-caslon-texto-700.woff2", weight: "700", style: "normal" },
    { path: "../fontes/libre-caslon-texto-italico.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-rs-texto",
  display: "optional",
  adjustFontFallback: false,
  fallback: ["Georgia", "serif"],
});

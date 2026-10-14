import localFont from "next/font/local";

// As fontes do Banho e Tosa São Francisco, carregadas só pelo layout deste site (app/demos/petshop/layout.tsx;
// identidade, seção 4.5). A Anybody, a letra larga da gráfica rápida (largura 125 no nome e nos títulos, 100 nos rótulos
// do carimbo e do horário), nos títulos e nos números; a Overpass, a gótica da sinalização, no texto, nas tabelas e na
// interface. As duas com algarismos tabulares (tnum), conferidos no arquivo. Só o recorte latino e os eixos usados:
// Anybody de largura 100 a 125 e peso 700 a 800 (56 KB), Overpass de peso 400 a 700 (39 KB). Licença SIL Open Font
// License 1.1, sem Nome de Fonte Reservado (../fontes/OFL-anybody.txt, ../fontes/OFL-overpass.txt).

/** Títulos e números: a fonte que carrega a identidade, em "swap". O eixo da largura vai declarado (font-stretch). */
export const tituloDoCartao = localFont({
  src: "../fontes/anybody-variavel.woff2",
  weight: "700 800",
  declarations: [{ prop: "font-stretch", value: "100% 125%" }],
  variable: "--font-bt-titulo",
  display: "swap",
  fallback: ["Arial Black", "system-ui", "sans-serif"],
});

/** Texto, tabelas e interface: "optional", sem troca tardia que refaça o leiaute. */
export const textoDoCartao = localFont({
  src: "../fontes/overpass-variavel.woff2",
  weight: "400 700",
  variable: "--font-bt-texto",
  display: "optional",
  adjustFontFallback: false,
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

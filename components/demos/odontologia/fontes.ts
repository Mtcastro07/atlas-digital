import localFont from "next/font/local";

// As fontes da Odontologia Boa Viagem, carregadas só pelo layout deste site (app/demos/odontologia/layout.tsx). Red Hat
// Display nos títulos e números, Red Hat Text no texto e na interface: a mesma desenhista, sem serifa, neutras como a
// ficha impressa, e com algarismos tabulares (as sessões, os minutos e o horário se alinham). A Albert Sans, a família
// única que o arquivo do nicho sugere, não tem o recurso tnum no Google Fonts (medido em 08/10). Variáveis de 400 a
// 700, só o recorte latino, baixadas por producao/base/ferramentas/baixar-fonte.mjs: 30,7 e 30,2 KB. Licença SIL Open
// Font License 1.1, sem Nome de Fonte Reservado (../fontes/OFL-red-hat-*.txt).

/** Títulos e números grandes: a fonte que carrega a identidade, em "swap". */
export const tituloDaClinica = localFont({
  src: "../fontes/red-hat-display-variavel.woff2",
  // De 300 a 700: a exibição serena da capa é em peso leve (nichos/odontologia.md, seção 6.3). Baixada de novo em 08/10
  // com a faixa 300..700, veio o mesmo arquivo, byte a byte: a Google entrega o eixo inteiro.
  weight: "300 700",
  variable: "--font-od-titulo",
  display: "swap",
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
});

/** Texto e interface: "optional", sem troca tardia que refaça o leiaute. */
export const textoDaClinica = localFont({
  src: "../fontes/red-hat-text-variavel.woff2",
  weight: "400 700",
  variable: "--font-od-texto",
  display: "optional",
  adjustFontFallback: false,
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
});

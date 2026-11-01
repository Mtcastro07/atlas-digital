// app/fontes.ts — as fontes deste site, importadas pelo layout e pela global-error
// (producao/esteira/05-tipografia.md, seção 4). Hospedadas aqui, com a licença ao lado (OFL-*.txt);
// baixadas por ferramentas/baixar-fonte.mjs. Nomes únicos no kit: --font-texto e --font-titulo.
// A reserva (fallback) só com nomes que não terminam em número (seção 4.3); as duas aparecem na
// primeira tela, e por isso as duas se pré-carregam (seção 4.4).
import localFont from "next/font/local";

/** Títulos e números grandes: a fonte que carrega a identidade aparece (swap; seção 4.2). */
export const titulo = localFont({
  src: [{ path: "./fontes/titulo.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-titulo",
  display: "swap",
  fallback: ["ui-rounded", "system-ui", "sans-serif"],
});

/**
 * Corpo e interface: "optional" (seção 4.2). Se a fonte não chega a tempo da primeira pintura, o texto
 * fica na reserva até a próxima visita, sem troca tardia que refaça o leiaute (no Atlas, o Inter em swap
 * custava ~50 ms a mais de TBT com CPU 20×).
 */
export const texto = localFont({
  src: [{ path: "./fontes/texto.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-texto",
  display: "optional",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

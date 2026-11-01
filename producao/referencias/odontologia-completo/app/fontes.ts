// app/fontes.ts — as fontes deste site, importadas pelo layout e pela global-error (producao/esteira/05-tipografia.md, seção 4).
// Duas famílias, cada uma com um papel: a Red Hat Display nos títulos e nos números grandes, e a Red Hat Text no texto e na
// interface (SIL OFL 1.1, sem Nome de Fonte Reservado; as licenças estão ao lado, em fontes/OFL-*.txt). Baixadas por
// ferramentas/baixar-fonte.mjs em 08.10.2026: faixa variável 400–700, recorte latino. As duas trazem o recurso `tnum`, que a
// Albert Sans, a primeira escolha, não tem (ver decisoes.md): os números das sessões, dos minutos e do horário são tabulares.
// Nomes únicos no kit: --font-titulo e --font-texto. A reserva só tem nomes que não terminam em número.
import localFont from "next/font/local";

/** Títulos e números grandes: a fonte que carrega a identidade aparece (swap; seção 4.2). */
export const titulo = localFont({
  src: [{ path: "./fontes/titulo.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-titulo",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

/**
 * Corpo e interface: "optional" (seção 4.2). Se a fonte não chega a tempo da primeira pintura, o texto fica na reserva até
 * a próxima visita, sem troca tardia que refaça o leiaute.
 */
export const texto = localFont({
  src: [{ path: "./fontes/texto.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-texto",
  display: "optional",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

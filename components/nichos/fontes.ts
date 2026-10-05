import localFont from "next/font/local";

// Fontes de título dos dois demonstrativos, as mesmas dos demos de cada
// nicho (demos/producao/nicho_*.py), só no peso 600 (o único que as telas
// usam). Servem às telas fotografadas (components/telas/) e ao palco de
// cada nicho na vitrine. Sem pré-carga: o navegador só baixa a fonte
// quando o nicho dela aparece. Licença SIL Open Font License 1.1
// (fontes/OFL-*.txt).

/** Oswald: condensada e industrial, como a letra de saco de cimento e de placa de obra. */
const fonteDoDeposito = localFont({
  src: "./fontes/oswald-600.woff2",
  weight: "600",
  variable: "--font-nicho",
  display: "swap",
  preload: false,
});

/** Fraunces: serifada editorial, longe do registro clínico frio e do fitness eufórico. */
const fonteDaNutricao = localFont({
  src: "./fontes/fraunces-600.woff2",
  weight: "600",
  variable: "--font-nicho",
  display: "swap",
  preload: false,
});

/**
 * Fraunces no eixo de cartaz (144), só para o título da tela da nutrição
 * (components/telas/tela-nutricao.tsx), sem pré-carga. Declarada aqui, e
 * não importada do site da nutrição (components/demos/nutricao/fontes.ts):
 * importada de lá, o empacotador juntava as fontes dos dois num pacote só,
 * e a página "Para quem" passava a pré-carregar as fontes do site inteiro
 * (medido em 01/10).
 */
export const fonteDeCartazDaNutricao = localFont({
  src: "../demos/fontes/fraunces-144-400.woff2",
  weight: "400",
  variable: "--font-exibicao",
  display: "swap",
  preload: false,
});

export const fontesDosNichos = {
  deposito: fonteDoDeposito.variable,
  nutricao: fonteDaNutricao.variable,
};

/** Classe da fonte do nicho (a variável é posta pela classe de fontesDosNichos num ancestral). */
export const fonteDoNicho = "font-[family-name:var(--font-nicho)] font-semibold";

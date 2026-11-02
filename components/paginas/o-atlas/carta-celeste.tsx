/**
 * A carta celeste dos capítulos (R10, 28/10; CONTRATO.md, 3.6 e a passiva P12): o objeto do primeiro tempo da origem,
 * desenhado pelo código, ao lado do título "Da sala de aula ao balcão." (no celular, acima dos capítulos). Quatro
 * estrelas, uma por capítulo, na ordem de leitura e na posição deles na grade de 2 × 2, ligadas por um traço fino na
 * ordem 1, 2, 3, 4: o caminho da sala de aula ao balcão. O desenho é o da gravura do site, sem foto e sem constelação
 * verdadeira: um arco do equador celeste e dois meridianos, parados, no bronze a 40%. Sem rótulo, aria-hidden: os
 * capítulos estão ao lado, em texto. O laço com o mito vem logo abaixo, no segundo tempo: Atlas sustenta o céu.
 * - O traçado (o arco, os meridianos e o caminho) é um SVG parado; cada estrela é HTML por cima dele, para a passiva
 *   animar uma camada própria, e nunca um filho do SVG (CONTRATO.md, 4.1).
 * - A passiva P12, a cintilação: o aro de cada estrela vai de 0,35 a 1 de opacidade, ida e volta, em períodos primos
 *   entre si (5,3 s, 6,1 s, 7,3 s e 8,9 s), que nunca se alinham. Com o movimento reduzido, os quatro a 0,7.
 * - A segunda parte de P12, o viajante [provisório: acréscimo à cintilação, para a passiva se ver]: um ponto de bronze
 *   anda pelo caminho, de estrela em estrela, por translate, numa camada de 10 px; com o movimento reduzido, não aparece.
 * - Sob o ponteiro (ou em foco) num capítulo, a estrela dele acende (app/paginas/o-atlas.css).
 */

/** As estrelas, em fração da carta (a caixa de 440 × 260): a grade de 2 × 2, com o desvio de um céu. */
const ESTRELAS = [
  { x: 92, y: 74, periodo: "5.3s" },
  { x: 318, y: 46, periodo: "6.1s" },
  { x: 140, y: 196, periodo: "7.3s" },
  { x: 372, y: 176, periodo: "8.9s" },
];
const L = 440;
const A = 260;

/** O equador, uma curva de segundo grau (os três pontos), e as marcas da escala: um traço de 8 a cada doze avos do
 *  traçado, na normal da curva. */
const EQUADOR = [
  [-8, 214],
  [220, 96],
  [L + 8, 150],
] as const;
const MARCAS = Array.from({ length: 11 }, (_, i) => {
  const t = (i + 1) / 12;
  const [[x0, y0], [x1, y1], [x2, y2]] = EQUADOR;
  const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * x1 + t ** 2 * x2;
  const y = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * y1 + t ** 2 * y2;
  const tx = 2 * (1 - t) * (x1 - x0) + 2 * t * (x2 - x1);
  const ty = 2 * (1 - t) * (y1 - y0) + 2 * t * (y2 - y1);
  const k = 4 / Math.hypot(tx, ty);
  const f = (v: number) => v.toFixed(1);
  return `M${f(x + ty * k)} ${f(y - tx * k)}L${f(x - ty * k)} ${f(y + tx * k)}`;
});

/** As paradas do viajante, em cqi da carta: o 1 % da largura, nos dois eixos (a proporção da carta vem da caixa). */
const VIAGEM = Object.fromEntries(
  ESTRELAS.map((e, i) => [`--e${i + 1}`, `${((e.x / L) * 100).toFixed(2)}cqi ${((e.y / L) * 100).toFixed(2)}cqi`]),
) as React.CSSProperties;

export function CartaCeleste({ className }: { className?: string }) {
  const caminho = "M" + ESTRELAS.map((e) => `${e.x} ${e.y}`).join("L");
  return (
    <div data-ambiente aria-hidden="true" className={["vd-carta-celeste", className].filter(Boolean).join(" ")}>
      <svg viewBox={`0 0 ${L} ${A}`} className="vd-carta-celeste-gravura">
        {/* O equador celeste: um arco largo, de oeste a leste, com as marcas da escala. */}
        <path d={`M${EQUADOR[0].join(" ")}Q${EQUADOR[1].join(" ")} ${EQUADOR[2].join(" ")}`} className="equador" />
        {MARCAS.map((d) => (
          <path key={d} d={d} className="marca" />
        ))}
        {/* Dois meridianos, que convergem para o polo, acima da carta. */}
        <path d="M58 -8C96 80 108 170 96 268" className="meridiano" />
        <path d="M268 -8C254 86 262 176 292 268" className="meridiano" />
        {/* O caminho dos capítulos, na ordem de leitura. */}
        <path d={caminho} className="caminho" />
      </svg>
      <div data-passiva="o-atlas-carta" className="absolute inset-0">
        {ESTRELAS.map((e, i) => (
          <span
            key={i}
            className="vd-estrela"
            style={{ left: `${(e.x / L) * 100}%`, top: `${(e.y / A) * 100}%`, "--periodo": e.periodo } as React.CSSProperties}
          >
            <span className="vd-estrela-aro mov-passiva" />
            <span className="vd-estrela-nucleo" />
          </span>
        ))}
        <span className="vd-carta-viajante mov-passiva" style={VIAGEM} />
      </div>
    </div>
  );
}

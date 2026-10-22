import { Envelope, Secao } from "@/components/estrutura";
import { Titulo } from "@/components/tipografia";
import { quemFaz } from "@/conteudo/site";

/**
 * A carta da história (desde 17/10, a direção final do Atlas Digital, seção 3, item 20): a grade de uma projeção cônica
 * conforme, tangente a 22°53′ S (a latitude de Niterói), com o polo sul abaixo da página, e um rumo em traço que a
 * cruza; os quatro capítulos são as estações dele. Na cônica conforme, o rumo (a loxodromia: o mesmo ângulo com todos os
 * meridianos) é uma espiral logarítmica em volta do ápice: r = r₀ · e^(−bθ), que corta os meridianos a atan(1/b) do
 * norte, um rumo de 110° (dito na linha, em 13 px, como na carta náutica). Os meridianos vão de 5 em 5° (os raios do ápice, a n = sen 22,88° do ângulo da longitude), e os
 * paralelos também (os círculos de raio ρ(φ) = ρ₀ · (tg(45° + φ₀/2) / tg(45° + φ/2))ⁿ). Geometria da projeção, e não
 * grade de fundo (C9).
 * Num viewBox de 1.000 de largura, a largura da coluna: cada capítulo ocupa 22%, com 4% entre eles, e a estação fica no
 * canto de cima, à direita, do capítulo (x = 220, 480, 740 e 1.000), no ponto do rumo; o capítulo desce à altura da
 * estação pela margem de cima em porcentagem (no flex, a porcentagem vale a largura da coluna toda, a mesma régua do
 * desenho). O rumo chega a cada estação por cima e pela esquerda do capítulo, e nunca cruza o texto.
 * Até 17/10, uma linha do tempo de círculos numerados em bronze (01 a 04), com o fio em degradê: a linha do tempo de
 * modelo, e números que não informavam nada (método, problema, aplicação e começo não são passos; o fechamento com o
 * Impeccable, A). Até 16/10, a grade cônica ficava sob o globo da abertura, que pousava nela. Abaixo de 1.024 px (e com a
 * letra a 200%), os capítulos em coluna; desde 18/10 (o passe do celular), com a carta acima deles: a mesma grade e o
 * mesmo rumo, numa faixa recortada em volta das quatro estações, com os marcos e o nome curto de cada capítulo junto
 * do seu (o que vem antes da vírgula), e os capítulos embaixo, como a legenda dela. Até então, o celular não tinha a
 * carta, só um rumo vertical à esquerda, reto, com as estações nele, que lia linha do tempo; e, até a revisão de 18/10,
 * os dois juntos: os marcos da carta sem nome e outros quatro na linha reta, oito marcos sem relação entre si.
 */

/** O ápice (o polo sul da projeção), abaixo da coluna, e a razão da espiral. */
const APICE = { x: 610, y: 4200 } as const;
const B = 0.36;
const N = Math.sin((22.8833 * Math.PI) / 180);
const ESTACOES_X = [220, 480, 740, 1000];

const CARTA = (() => {
  // O rumo passa pela primeira estação na altura 0.
  const r1 = Math.hypot(ESTACOES_X[0] - APICE.x, APICE.y);
  const t1 = Math.atan2(ESTACOES_X[0] - APICE.x, APICE.y);
  const r0 = r1 * Math.exp(B * t1);
  const ponto = (t: number) => {
    const r = r0 * Math.exp(-B * t);
    return [APICE.x + r * Math.sin(t), APICE.y - r * Math.cos(t)] as const;
  };
  const angulo = (x: number) => {
    let a = -1;
    let z = 1;
    for (let i = 0; i < 50; i++) {
      const m = (a + z) / 2;
      if (ponto(m)[0] < x) a = m;
      else z = m;
    }
    return (a + z) / 2;
  };
  const f = (v: number) => v.toFixed(1);
  const rumo = Array.from({ length: 41 }, (_, i) => ponto(angulo(-320 + i * 40))).map(([x, y], i) => `${i ? "L" : "M"}${f(x)} ${f(y)}`).join("");
  const estacoes = ESTACOES_X.map((x) => ponto(angulo(x))[1]);
  // Os paralelos de 5 em 5°, de 5° S a 55° S; ρ₀ é o raio do paralelo de tangência, o da primeira estação.
  const fi0 = (22.8833 * Math.PI) / 180;
  const rho = (graus: number) => r1 * (Math.tan(Math.PI / 4 + fi0 / 2) / Math.tan(Math.PI / 4 + (graus * Math.PI) / 360)) ** N;
  const paralelos = Array.from({ length: 11 }, (_, i) => f(rho(5 + 5 * i)));
  // Os meridianos de 5 em 5°: os raios do ápice, do paralelo de 60° S ao equador.
  const de = rho(60);
  const ate = rho(0);
  const meridianos = Array.from({ length: 21 }, (_, i) => {
    const a = (N * (i - 10) * 5 * Math.PI) / 180;
    return `M${f(APICE.x + de * Math.sin(a))} ${f(APICE.y - de * Math.cos(a))}L${f(APICE.x + ate * Math.sin(a))} ${f(APICE.y - ate * Math.cos(a))}`;
  });
  return { rumo, estacoes, paralelos, meridianos };
})();

/** A estação: o triângulo do marco geodésico, com o ponto no meio (o sinal de carta do ponto medido). */
function Marco() {
  return (
    <svg aria-hidden="true" viewBox="-11 -11 22 22" className="vd-rumo-marco">
      <path d="M0 -8.5L8 5.5H-8Z" />
      <circle r="1.6" />
    </svg>
  );
}

export function Historia() {
  const { historia } = quemFaz;
  return (
    <Secao aria-labelledby="historia" tom="claro" className="overflow-x-clip">
      <Envelope>
        {/* O rótulo, só para o leitor de tela (17/10): à vista, era o sobretítulo (a marca T2). */}
        <p className="sr-only">{historia.rotulo}</p>
        <Titulo id="historia" linhas={historia.titulo} />
        <div className="vd-rumo">
          {/* A carta: na mesa, as duas camadas por trás dos capítulos (display: contents); no celular e no tablet (desde
              18/10), uma faixa acima deles, recortada em volta do rumo, com os quatro marcos nele, o nome de cada
              estação e o rumo dito em HTML (o texto do SVG ficaria a 3 px). */}
          <div aria-hidden="true" className="vd-rumo-carta">
            <svg aria-hidden="true" viewBox="-300 -200 1600 1000" className="vd-rumo-grade">
              {CARTA.paralelos.map((r) => (
                <circle key={r} cx={APICE.x} cy={APICE.y} r={r} />
              ))}
              {CARTA.meridianos.map((d) => (
                <path key={d} d={d} />
              ))}
            </svg>
            <svg aria-hidden="true" viewBox="-300 -200 1600 1000" className="vd-rumo-curso">
              <defs>
                <linearGradient id="rumo-tinta" gradientUnits="userSpaceOnUse" x1="-300" x2="1300" y1="0" y2="0">
                  <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
                  <stop offset="0.22" stopColor="var(--accent)" />
                  <stop offset="0.8" stopColor="var(--accent)" />
                  <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path id="rumo-curso" d={CARTA.rumo} stroke="url(#rumo-tinta)" />
              {/* O rumo dito na própria linha, como na carta náutica: o ângulo com o norte, o mesmo em todo meridiano. */}
              <text dy="-10">
                <textPath href="#rumo-curso" startOffset="25.5%">
                  rumo 110°
                </textPath>
              </text>
            </svg>
            {/* Os nomes das estações e o rumo no atributo, e não no texto: o robô não lê os títulos duas vezes. */}
            {ESTACOES_X.map((x, k) => (
              <span
                key={x}
                data-rotulo={historia.capitulos[k].titulo.split(",")[0]}
                data-lado={k === ESTACOES_X.length - 1 ? "esquerda" : undefined}
                className="vd-rumo-carta-estacao"
                style={{ "--x": x, "--y": CARTA.estacoes[k] } as React.CSSProperties}
              >
                <Marco />
              </span>
            ))}
            <span data-rotulo="rumo 110°" className="vd-rumo-carta-rumo" />
          </div>
          <ol className="vd-rumo-estacoes">
            {historia.capitulos.map((capitulo, k) => (
              <li key={capitulo.numero} style={{ "--estacao": `${CARTA.estacoes[k] / 10}%` } as React.CSSProperties}>
                <Marco />
                <h3 className="text-numero">{capitulo.titulo}</h3>
                <p className="mt-4 text-corpo text-muted-foreground">{capitulo.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </Envelope>
    </Secao>
  );
}

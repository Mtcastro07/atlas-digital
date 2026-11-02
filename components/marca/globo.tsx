import { cn } from "@/lib/utils";

// O globo da marca, grande, na abertura de O Atlas (components/paginas/o-atlas/figura.tsx, GloboDeNiteroi). Mesma
// construção do globo medido do cartão (components/marca/logotipo.tsx): círculo, um meridiano com 0,45 do raio e
// dois paralelos a ±0,345 do raio; a retícula secundária, apagada, só dá escala. Coordenadas num quadrado de -100 a
// 100, raio 90.
//
// Desde 16/10 ("Identidade mais profunda"), o globo é gravado, sob a luz do fim da tarde de O Atlas, rasante, do oeste:
// - o volume: o lado do dia à esquerda, em --agua-rasa, caindo para a água funda à direita;
// - o lado da noite, à direita do terminador (fixo: a luz não anda), em hachura de buril a 45°, cruzada no
//   crescente mais fundo; é a sombra do objeto, nunca fundo (a única hachura do site);
// - o metal: o contorno e os paralelos da marca no degradê do bronze, aceso do oeste;
// - a frente e o verso: os paralelos, vistos um pouco de cima, partem-se em dois arcos (o de trás fino e a 35%); em
//   cada meridiano, a metade da frente inteira e a de trás a 35%;
// - o ponto de Niterói (22°53′ S), no meridiano da marca, anda com ele e passa para trás.
//
// Desde 28/10 (R10, a passiva P11; CONTRATO.md, 4.2), o giro anda no compositor: cada meridiano é um círculo numa
// camada HTML do tamanho do globo, que gira em rotateY, sem perspectiva (o círculo girado é a elipse exata do
// meridiano, como o resto do globo, em projeção ortográfica; o traço afina no meio como um arame visto de lado). Até 28/10, cada meridiano era uma elipse dentro do SVG,
// estreitada por scaleX, e o desenho repintava a cada quadro na linha principal (12,6% dela, parado: R8/E2).
// - Meia volta basta ao círculo: girado de 180°, ele volta à mesma elipse, e a metade acesa (a da esquerda, na camada)
//   anda sempre do oeste para o leste, pela frente. É a troca de face de antes (a metade da frente passa a ser a
//   outra quando o meridiano está todo aberto), sem trocar nada: a volta de 36 s vira meia volta de 18 s.
// - O ponto de Niterói não é simétrico: ele dá a volta inteira, em 36 s, numa camada de 6 px, desvirada por dentro
//   (fica redondo), e passa a 35% quando vai para trás (mov-face-a, de app/movimento.css).
// - Tudo o que não gira (o volume, a hachura, os paralelos, o contorno) fica num SVG só, embaixo das camadas: as
//   linhas da frente e as do meridiano são do mesmo bronze, e a ordem de pintura não se vê.

const R = 90;
/** Achatamento dos paralelos (ry = 0,22 · rx): o globo visto um pouco de cima, menos que a esfera da capa (0,3). */
const ACHATAMENTO = 0.22;
const INCLINACAO = Math.sqrt(1 - ACHATAMENTO ** 2);
const n = (v: number) => +v.toFixed(2);

/** Os dois arcos de um paralelo a `y` (a altura da marca, em fração do raio): o de trás (por cima) e o da frente. */
function arcos(fracao: number) {
  const latitude = Math.asin(fracao);
  const rx = R * Math.cos(latitude);
  const ry = n(rx * ACHATAMENTO);
  const cy = n(R * fracao * INCLINACAO);
  return { tras: `M${n(-rx)} ${cy}A${n(rx)} ${ry} 0 0 1 ${n(rx)} ${cy}`, frente: `M${n(rx)} ${cy}A${n(rx)} ${ry} 0 0 1 ${n(-rx)} ${cy}` };
}
const PARALELOS = [-0.345, 0.345].map(arcos);
const RETICULA = [-0.66, 0.66].map(arcos);

/** Fase do meridiano da marca na volta: o cosseno de 2π·fase é 0,448 (0,45 do raio). */
const FASE_DA_MARCA = Math.acos(0.448) / (2 * Math.PI);
/** Uma volta do globo, em segundos: o ponto de Niterói dá a volta inteira; cada meridiano, meia volta na metade. */
const VOLTA = 36;

/** As metades de cada meridiano, de polo a polo: a da esquerda (a da frente na meia volta) e a da direita. */
const METADE_ESQUERDA = `M0 ${R}A${R} ${R} 0 0 1 0 ${-R}`;
const METADE_DIREITA = `M0 ${-R}A${R} ${R} 0 0 1 0 ${R}`;

/** Niterói, a 22°53′ S: o lugar no círculo do meridiano, em fração da largura do globo (o raio é 0,45 dela). */
const SUL = (22 + 53 / 60) * (Math.PI / 180);
const NITEROI = {
  "--niteroi-x": `${n(-45 * Math.cos(SUL))}cqi`,
  "--niteroi-y": `${n(45 * Math.sin(SUL))}cqi`,
  "--giro": `${n(360 * FASE_DA_MARCA)}deg`,
  "--atraso": `-${(FASE_DA_MARCA * VOLTA).toFixed(2)}s`,
} as React.CSSProperties;

/**
 * Quatro meridianos, a cada 45° de longitude; o primeiro é o da marca. `--giro` é o ângulo da meia volta na pose
 * parada (a largura aparente é o cosseno dele, a mesma do desenho de antes), e o atraso negativo começa a animação
 * nesse ponto.
 */
const MERIDIANOS = [0, 1, 2, 3].map((k) => {
  const meia = (2 * (FASE_DA_MARCA + k / 8)) % 1;
  return {
    k,
    marca: k === 0,
    estilo: { "--giro": `${n(180 * meia)}deg`, "--atraso": `-${(meia * (VOLTA / 2)).toFixed(2)}s` } as React.CSSProperties,
  };
});

/** O terminador: a borda da noite, uma meia elipse à direita do eixo (a luz vem do oeste e um pouco da frente). */
const noite = (rx: number) => `M0 ${-R}A${rx} ${R} 0 0 1 0 ${R}A${R} ${R} 0 0 0 0 ${-R}Z`;

/** `girando`: os meridianos e o ponto de Niterói andam (a passiva P11, sob o [data-ambiente] de quem chama). */
export function Globo({ className, girando = false }: { className?: string; girando?: boolean }) {
  return (
    <div aria-hidden="true" data-passiva={girando ? "o-atlas-globo" : undefined} className={cn("vd-globo-3d", className)}>
      <svg viewBox="-100 -100 200 200" className="vd-globo absolute inset-0 size-full">
        <defs>
          {/* O volume: aceso a oeste, do alto, caindo para a água funda a leste. */}
          <radialGradient id="globo-volume" gradientUnits="userSpaceOnUse" cx="-38" cy="-26" r="150">
            <stop offset="0" style={{ stopColor: "var(--agua-rasa)" }} />
            <stop offset="0.5" style={{ stopColor: "var(--background)" }} />
            <stop offset="1" style={{ stopColor: "var(--deep)" }} />
          </radialGradient>
          {/* O metal, aceso do oeste: --bronze-brilho, o vínculo do escuro, a ação e o vínculo do claro. */}
          <linearGradient id="globo-metal" gradientUnits="userSpaceOnUse" x1="-90" y1="-40" x2="90" y2="40">
            <stop offset="0" stopColor="#f1d3a1" />
            <stop offset="0.35" stopColor="#d9a76b" />
            <stop offset="0.65" stopColor="#c08a4a" />
            <stop offset="1" stopColor="#8a5a24" />
          </linearGradient>
          {/* A hachura de buril: traços a 3 px (1,36 unidade a 440 px), finos, na água mais funda. */}
          <pattern id="globo-buril" patternUnits="userSpaceOnUse" width="1.4" height="1.4" patternTransform="rotate(45)">
            <path d="M0 .7H1.4" className="buril" />
          </pattern>
          <pattern id="globo-buril-cruzado" patternUnits="userSpaceOnUse" width="1.4" height="1.4" patternTransform="rotate(-45)">
            <path d="M0 .7H1.4" className="buril" />
          </pattern>
          <clipPath id="globo-noite">
            <path d={noite(R * 0.34)} />
          </clipPath>
          <clipPath id="globo-noite-funda">
            <path d={noite(R * 0.7)} />
          </clipPath>
        </defs>
        <circle r={R} fill="url(#globo-volume)" stroke="none" />
        <rect x={-R} y={-R} width={2 * R} height={2 * R} fill="url(#globo-buril)" clipPath="url(#globo-noite)" stroke="none" />
        <rect x={-R} y={-R} width={2 * R} height={2 * R} fill="url(#globo-buril-cruzado)" clipPath="url(#globo-noite-funda)" stroke="none" />
        {/* O verso primeiro, a frente por cima. */}
        <g className="reticula tras">
          {RETICULA.map((p) => (
            <path key={p.tras} d={p.tras} />
          ))}
        </g>
        <g className="marca metal tras">
          {PARALELOS.map((p) => (
            <path key={p.tras} d={p.tras} />
          ))}
        </g>
        <g className="reticula">
          {RETICULA.map((p) => (
            <path key={p.frente} d={p.frente} />
          ))}
        </g>
        <g className="marca metal">
          <circle r={R} />
          {PARALELOS.map((p) => (
            <path key={p.frente} d={p.frente} />
          ))}
        </g>
      </svg>
      {/* Os meridianos, cada um numa camada que gira. */}
      {MERIDIANOS.map((m) => (
        <div key={m.k} className={cn("vd-globo-meridiano", m.marca ? "marca" : "reticula", girando && "mov-passiva")} style={m.estilo}>
          <svg viewBox="-100 -100 200 200">
            <path d={METADE_DIREITA} className="verso" />
            <path d={METADE_ESQUERDA} />
          </svg>
        </div>
      ))}
      <span className={cn("vd-globo-niteroi", girando && "mov-passiva")} style={NITEROI}>
        <span className={cn("vd-globo-niteroi-ponto", girando && "mov-passiva")} />
      </span>
    </div>
  );
}

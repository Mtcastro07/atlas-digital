import { cn } from "@/lib/utils";

// O globo da marca, grande, na abertura de O Atlas (components/paginas/figuras.tsx, GloboDeNiteroi). Mesma
// construção do globo medido do cartão (components/marca/logotipo.tsx): círculo, um meridiano com 0,45 do raio e
// dois paralelos a ±0,345 do raio; a retícula secundária, apagada, só dá escala. Coordenadas num quadrado de -100 a
// 100, raio 90. Com `girando`, os meridianos andam devagar: cada um percorre a sua longitude, uma volta a cada 36 s
// (.mov-longitude, app/movimento.css). Cada meridiano é uma elipse do tamanho do globo estreitada por scaleX até a
// largura aparente da sua longitude (o cosseno; .vd-meridiano, app/vidro.css).
//
// Desde 16/10 ("Identidade mais profunda"; até então, também ao fundo do cartão de vidro de "Atlas sustentava o
// mundo", que passou ao A do logotipo), o globo é gravado, sob a luz do fim da tarde de O Atlas, rasante, do oeste:
// - o volume: o lado do dia à esquerda, em --agua-rasa, caindo para a água funda à direita;
// - o lado da noite, à direita do terminador (fixo: a luz não anda), em hachura de buril a 45°, cruzada no
//   crescente mais fundo; é a sombra do objeto, nunca fundo (a única hachura do site);
// - o metal: o contorno e os paralelos da marca no degradê do bronze, aceso do oeste. O meridiano da marca fica no
//   bronze chapado: o degradê viraria com o scaleX (como os meridianos da esfera da capa);
// - a frente e o verso: os paralelos, vistos um pouco de cima, partem-se em dois arcos (o de trás fino e a 35%); cada
//   meridiano vira duas metades, que trocam de face quando ele está todo aberto (mov-face-a e mov-face-b);
// - o ponto de Niterói (22°53′ S), na metade da frente do meridiano da marca, anda com ele e passa para trás.

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

/** Fase do meridiano da marca: o cosseno de 2π·fase é 0,448 (0,45 do raio). */
const FASE_DA_MARCA = Math.acos(0.448) / (2 * Math.PI);
/** Duração de uma volta do globo que gira, em segundos (igual a `animation-duration` de .mov-longitude). */
const VOLTA = 36;

/** As metades de cada meridiano, de polo a polo: a da esquerda e a da direita. */
const METADE_ESQUERDA = `M0 ${R}A${R} ${R} 0 0 1 0 ${-R}`;
const METADE_DIREITA = `M0 ${-R}A${R} ${R} 0 0 1 0 ${R}`;

/** Niterói, a 22°53′ S, na metade da esquerda do meridiano da marca (a da frente, na pose parada). */
const SUL = (22 + 53 / 60) * (Math.PI / 180);
const NITEROI = `M${n(-R * Math.cos(SUL))} ${n(R * Math.sin(SUL))}h.01`;

/**
 * Quatro meridianos, a cada 45° de longitude; o primeiro é o da marca. Girando, a escala segue o cosseno de 2π·t
 * (t, a fase da volta): a metade da esquerda está na frente na primeira metade da volta, e a da direita na segunda
 * (a face da frente anda do oeste para o leste, como a da Terra). `--face` é a opacidade de cada metade na pose
 * parada.
 */
const MERIDIANOS = [0, 1, 2, 3].map((k) => {
  const fase = FASE_DA_MARCA + k / 8;
  const esquerdaNaFrente = Math.sin(2 * Math.PI * fase) > 0;
  return {
    fase,
    marca: k === 0,
    // Atraso negativo: a animação começa no ponto da volta em que a largura é o cosseno da fase (a mesma do desenho parado).
    estilo: { "--escala": Math.cos(2 * Math.PI * fase).toFixed(4), "--atraso-longitude": `-${(fase * VOLTA).toFixed(2)}s` } as React.CSSProperties,
    esquerda: { "--face": esquerdaNaFrente ? 1 : 0.35 } as React.CSSProperties,
    direita: { "--face": esquerdaNaFrente ? 0.35 : 1 } as React.CSSProperties,
  };
});

/** O terminador: a borda da noite, uma meia elipse à direita do eixo (a luz vem do oeste e um pouco da frente). */
const noite = (rx: number) => `M0 ${-R}A${rx} ${R} 0 0 1 0 ${R}A${R} ${R} 0 0 0 0 ${-R}Z`;

export function Globo({ className, girando = false }: { className?: string; girando?: boolean }) {
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true" className={cn("vd-globo", className)}>
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
      {MERIDIANOS.map((m) => (
        <g key={m.fase} className={cn("vd-meridiano", m.marca ? "marca" : "reticula", girando && "mov-longitude")} style={m.estilo}>
          <g className="mov-face-a" style={m.esquerda}>
            <path d={METADE_ESQUERDA} />
            {m.marca && <path d={NITEROI} className="niteroi" />}
          </g>
          <path d={METADE_DIREITA} className="mov-face-b" style={m.direita} />
        </g>
      ))}
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
  );
}

import { cn } from "@/lib/utils";

// O globo do logotipo em traço, ampliado, ao fundo do cartão de vidro
// líquido de "O Atlas" (secoes/quem-faz.tsx). Mesma construção do globo
// medido do cartão (components/marca/logotipo.tsx): círculo, um meridiano
// com 0,45 do raio e dois paralelos a ±0,345 do raio; a retícula
// secundária, apagada, só dá escala. Coordenadas num quadrado de -100 a
// 100, raio 90. Parado, ao fundo do cartão; com `girando` (a figura de
// O Atlas, desde 03/10), os meridianos andam devagar: cada um percorre a
// sua longitude, uma volta a cada 36 s (.mov-longitude, app/movimento.css).
//
// Cada meridiano é uma elipse do tamanho do globo estreitada por scaleX
// até a largura aparente da sua longitude (o cosseno; .vd-meridiano,
// app/vidro.css).

const R = 90;
const PARALELO = R * 0.345;
const corda = (y: number) => Math.sqrt(R * R - y * y);

/** Fase do meridiano da marca: o cosseno de 2π·fase é 0,448 (0,45 do raio). */
const FASE_DA_MARCA = Math.acos(0.448) / (2 * Math.PI);
/** Duração de uma volta do globo que gira, em segundos (igual a `animation-duration` de .mov-longitude). */
const VOLTA = 36;

/** Quatro meridianos, a cada 45° de longitude; o primeiro é o da marca. */
const MERIDIANOS = [0, 1, 2, 3].map((k) => {
  const fase = FASE_DA_MARCA + k / 8;
  // Atraso negativo: a animação começa no ponto da volta em que a largura é o cosseno da fase (a mesma do desenho parado).
  return { fase, escala: Math.cos(2 * Math.PI * fase), atraso: `-${(fase * VOLTA).toFixed(2)}s`, marca: k === 0 };
});

export function Globo({ className, girando = false }: { className?: string; girando?: boolean }) {
  const reticula = R * 0.66;

  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true" className={cn("vd-globo", className)}>
      <g className="reticula">
        {[-reticula, reticula].map((y) => (
          <path key={y} d={`M${-corda(y)} ${y}H${corda(y)}`} />
        ))}
      </g>
      {MERIDIANOS.map((m) => (
        <g
          key={m.fase}
          className={cn("vd-meridiano", m.marca ? "marca" : "reticula", girando && "mov-longitude")}
          style={{ "--escala": m.escala.toFixed(4), "--atraso-longitude": m.atraso } as React.CSSProperties}
        >
          <ellipse rx={R} ry={R} />
        </g>
      ))}
      <g className="marca">
        <circle r={R} />
        {[-PARALELO, PARALELO].map((y) => (
          <path key={y} d={`M${-corda(y)} ${y}H${corda(y)}`} />
        ))}
      </g>
    </svg>
  );
}

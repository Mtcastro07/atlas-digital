import { EsferaViva } from "@/components/ilhas/esfera-viva";

// Esfera de arame da capa, a mesma do site de 28/08: o globo do logotipo
// em escala de fundo, atrás do título. Cinco paralelos fixos e oito
// meridianos que giram (cada um é um círculo que se estreita até virar
// linha e se abre do outro lado: scaleX de 1 a -1, app/movimento.css).
// Cores, traço e animação nas classes mov-esfera-* de movimento.css.

const RAIO = 196;
const CENTRO = 200;
/** Achatamento dos paralelos (ry = 0,3 · rx): a esfera vista um pouco de cima. */
const ACHATAMENTO = 0.3;
const INCLINACAO = Math.sqrt(1 - ACHATAMENTO ** 2);

/** Paralelos a 0°, ±30° e ±60°. */
const PARALELOS = [0, 30, -30, 60, -60].map((graus) => {
  const latitude = (graus * Math.PI) / 180;
  const rx = RAIO * Math.cos(latitude);
  return {
    cy: +(CENTRO - RAIO * Math.sin(latitude) * INCLINACAO).toFixed(1),
    rx: +rx.toFixed(1),
    ry: +(rx * ACHATAMENTO).toFixed(1),
  };
});

/** Duração de uma volta, em segundos (igual a `animation-duration` de .mov-meridiano). */
const VOLTA = 16;
const MERIDIANOS = 8;

/**
 * Cada meridiano começa num ponto diferente da volta (atraso negativo).
 * `--estatico` é a largura em que ele fica parado quando o movimento é
 * reduzido: a esfera continua a ler-se como globo, com meridianos abertos
 * em leque, em vez de oito círculos sobrepostos.
 */
const FASES = Array.from({ length: MERIDIANOS }, (_, i) => {
  const t = i / MERIDIANOS;
  return {
    estilo: {
      "--fase": `-${(t * VOLTA).toFixed(2)}s`,
      "--estatico": Math.abs(Math.cos(t * 2 * Math.PI)).toFixed(3),
    } as React.CSSProperties,
    acento: i % 4 === 0,
    // No celular, metade dos meridianos (os ímpares): menos traço para redesenhar.
    soNoComputador: i % 2 === 1,
  };
});

export function Esfera() {
  return (
    <EsferaViva>
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="size-full">
        <circle cx={CENTRO} cy={CENTRO} r={RAIO} />
        {PARALELOS.map((p) => (
          <ellipse key={p.cy} cx={CENTRO} cy={p.cy} rx={p.rx} ry={p.ry} className="mov-paralelo" />
        ))}
        {FASES.map((f, i) => (
          <ellipse
            key={i}
            cx={CENTRO}
            cy={CENTRO}
            rx={RAIO}
            ry={RAIO}
            className={`mov-meridiano${f.acento ? " mov-acento" : ""}${f.soNoComputador ? " max-md:hidden" : ""}`}
            style={f.estilo}
          />
        ))}
      </svg>
    </EsferaViva>
  );
}

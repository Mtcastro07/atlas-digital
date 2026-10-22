import { EsferaViva } from "@/components/ilhas/esfera-viva";

// Esfera de arame da capa, a mesma do site de 28/08: o globo do logotipo
// em escala de fundo, atrás do título. Cinco paralelos fixos e oito
// meridianos que giram (cada um é um círculo que se estreita até virar
// linha e se abre do outro lado: scaleX de 1 a -1, app/movimento.css).
// Cores, traço e animação nas classes mov-esfera-* de movimento.css.
// Desde 16/10 ("Identidade mais profunda"), uma esfera armilar de metal:
// - os traços fixos (o contorno, os paralelos e o anel) em bronze, num
//   degradê aceso do noroeste, o lado da luz da madrugada da capa;
// - a frente e o verso: cada traço fixo se parte em dois arcos, o de trás
//   (a metade de cima da elipse, na vista um pouco de cima) fino e a 35%, o
//   da frente inteiro; cada meridiano vira duas metades que trocam de face
//   quando ele está todo aberto, o instante em que as duas coincidem com o
//   contorno (a troca não se vê);
// - o anel do equador vira o anel do instrumento: duas elipses fora da
//   esfera e 72 traços de 5 em 5° (os de 10 em 10°, mais longos; no
//   celular, só estes), fixo enquanto os meridianos giram. É o único anel
//   graduado do site.

const RAIO = 196;
const CENTRO = 200;
/** Achatamento dos paralelos (ry = 0,3 · rx): a esfera vista um pouco de cima. */
const ACHATAMENTO = 0.3;
const INCLINACAO = Math.sqrt(1 - ACHATAMENTO ** 2);

const n = (v: number) => +v.toFixed(1);

/** Os dois arcos de uma elipse horizontal: o de trás (por cima) e o da frente (por baixo). */
function arcos(cy: number, rx: number) {
  const ry = n(rx * ACHATAMENTO);
  const [e, d] = [n(CENTRO - rx), n(CENTRO + rx)];
  return { tras: `M${e} ${cy}A${n(rx)} ${ry} 0 0 1 ${d} ${cy}`, frente: `M${d} ${cy}A${n(rx)} ${ry} 0 0 1 ${e} ${cy}` };
}

/** Paralelos a 0°, ±30° e ±60°. */
const PARALELOS = [0, 30, -30, 60, -60].map((graus) => {
  const latitude = (graus * Math.PI) / 180;
  return arcos(n(CENTRO - RAIO * Math.sin(latitude) * INCLINACAO), RAIO * Math.cos(latitude));
});

/** O anel do instrumento: duas elipses a R + 6 e R + 12, no plano do equador. */
const ANEL = [RAIO + 6, RAIO + 12].map((rx) => arcos(CENTRO, rx));

/** Os traços da graduação, de 10 em 10° a partir de `primeiro`, da elipse de dentro até `alcance`: os de 10 em 10°
 *  cruzam o anel; os de 5 em 5° (primeiro = 5), a metade. Separados em verso e frente. */
function graduacao(primeiro: number, alcance: number) {
  const g = { tras: "", frente: "" };
  for (let graus = primeiro; graus < 360; graus += 10) {
    const a = (graus * Math.PI) / 180;
    const ponto = (r: number) => `${n(CENTRO + r * Math.cos(a))} ${n(CENTRO + r * ACHATAMENTO * Math.sin(a))}`;
    g[Math.sin(a) < -1e-9 ? "tras" : "frente"] += `M${ponto(RAIO + 6)}L${ponto(alcance)}`;
  }
  return g;
}
const DEZ = graduacao(0, RAIO + 12);
const CINCO = graduacao(5, RAIO + 9);

/** Duração de uma volta, em segundos (igual a `animation-duration` de .mov-meridiano). */
const VOLTA = 16;
const MERIDIANOS = 8;

/** As duas metades de cada meridiano (o círculo do contorno): a da esquerda e a da direita, de polo a polo. */
const METADE_ESQUERDA = `M${CENTRO} ${CENTRO + RAIO}A${RAIO} ${RAIO} 0 0 1 ${CENTRO} ${CENTRO - RAIO}`;
const METADE_DIREITA = `M${CENTRO} ${CENTRO - RAIO}A${RAIO} ${RAIO} 0 0 1 ${CENTRO} ${CENTRO + RAIO}`;

/**
 * Cada meridiano começa num ponto diferente da volta (atraso negativo).
 * `--estatico` é a largura em que ele fica parado quando o movimento é
 * reduzido (ou sem script): desde 16/10, oito longitudes distintas de 0 a
 * 180° (até então, |cos| da fase, que sobrepunha os meridianos dois a dois),
 * e `--face` a opacidade de cada metade nessa pose: na longitude λ, a metade
 * da direita está na frente se cos λ > 0. Girando, as metades trocam de face
 * pelas animações mov-face-a e mov-face-b (app/movimento.css): na primeira
 * metade da volta, a da esquerda está na frente; na segunda, a da direita.
 */
const FASES = Array.from({ length: MERIDIANOS }, (_, i) => {
  const t = i / MERIDIANOS;
  const longitude = ((i + 0.5) * Math.PI) / MERIDIANOS;
  const direitaNaFrente = Math.cos(longitude) > 0;
  const base = {
    "--fase": `-${(t * VOLTA).toFixed(2)}s`,
    "--estatico": Math.abs(Math.sin(longitude)).toFixed(3),
  };
  return {
    esquerda: { ...base, "--face": direitaNaFrente ? 0.35 : 1 } as React.CSSProperties,
    direita: { ...base, "--face": direitaNaFrente ? 1 : 0.35 } as React.CSSProperties,
    acento: i % 4 === 0,
    // No celular, metade dos meridianos (os ímpares): menos traço para redesenhar.
    soNoComputador: i % 2 === 1,
  };
});

export function Esfera() {
  return (
    <EsferaViva>
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="size-full">
        <defs>
          {/* O metal, aceso do noroeste: --bronze-brilho, o vínculo do escuro, a ação e o vínculo do claro. */}
          <linearGradient id="esfera-metal" gradientUnits="userSpaceOnUse" x1="40" y1="40" x2="360" y2="360">
            <stop offset="0" stopColor="#f1d3a1" />
            <stop offset="0.35" stopColor="#d9a76b" />
            <stop offset="0.65" stopColor="#c08a4a" />
            <stop offset="1" stopColor="#8a5a24" />
          </linearGradient>
        </defs>
        {/* O verso primeiro, a frente por cima. */}
        {PARALELOS.map((p) => (
          <path key={p.tras} d={p.tras} className="mov-metal mov-tras" />
        ))}
        {ANEL.map((a) => (
          <path key={a.tras} d={a.tras} className="mov-metal mov-tras mov-anel" />
        ))}
        <path d={DEZ.tras} className="mov-metal mov-tras mov-graduacao" />
        <path d={CINCO.tras} className="mov-metal mov-tras mov-graduacao max-md:hidden" />
        {FASES.map((f, i) => {
          const classe = `mov-meridiano${f.acento ? " mov-acento" : ""}${f.soNoComputador ? " max-md:hidden" : ""}`;
          return [
            <path key={`e${i}`} d={METADE_ESQUERDA} className={`${classe} mov-meia-a`} style={f.esquerda} />,
            <path key={`d${i}`} d={METADE_DIREITA} className={`${classe} mov-meia-b`} style={f.direita} />,
          ];
        })}
        <circle cx={CENTRO} cy={CENTRO} r={RAIO} className="mov-metal mov-contorno" />
        {PARALELOS.map((p) => (
          <path key={p.frente} d={p.frente} className="mov-metal mov-frente" />
        ))}
        {ANEL.map((a) => (
          <path key={a.frente} d={a.frente} className="mov-metal mov-frente mov-anel" />
        ))}
        <path d={DEZ.frente} className="mov-metal mov-frente mov-graduacao" />
        <path d={CINCO.frente} className="mov-metal mov-frente mov-graduacao max-md:hidden" />
      </svg>
    </EsferaViva>
  );
}

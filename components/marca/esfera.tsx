import { EsferaViva } from "@/components/ilhas/esfera-viva";

// Esfera de arame da capa, a mesma do site de 28/08: o globo do logotipo
// em escala de fundo, atrás do título. Cinco paralelos fixos e os
// meridianos que giram (cada um é um círculo que se estreita até virar
// linha e se abre do outro lado). Cores, traço e animação em
// app/paginas/inicio.css.
// Desde 16/10 ("Identidade mais profunda"), uma esfera armilar de metal:
// - os traços fixos (o contorno, os paralelos e o anel) em bronze, num
//   degradê aceso do noroeste, o lado da luz da madrugada da capa;
// - a frente e o verso: cada traço fixo se parte em dois arcos, o de trás
//   (a metade de cima da elipse, na vista um pouco de cima) fino e a 35%, o
//   da frente inteiro; cada meridiano tem duas metades que trocam de face
//   quando ele está todo aberto, o instante em que as duas coincidem com o
//   contorno (a troca não se vê);
// - o anel do equador vira o anel do instrumento: duas elipses fora da
//   esfera e 72 traços de 5 em 5° (os de 10 em 10°, mais longos; no
//   celular, só estes), fixo enquanto os meridianos giram. É o único anel
//   graduado do site.
// Desde 28/10 (R10), os traços fixos em dois SVG parados (o verso embaixo, a
// frente em cima) e cada meridiano numa camada HTML entre eles (abaixo).

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

/**
 * Os meridianos que giram (R10, 28/10, a passiva P1): cada um é uma camada HTML (.inicio-meridiano), com o desenho
 * parado dentro (as duas metades: a da esquerda na frente, inteira; a da direita no verso, a 35%) e o giro no
 * compositor, por scaleX de 1 a −1 numa curva senoidal (cubic-bezier(0.37, 0, 0.63, 1): a largura é o cosseno do
 * ângulo, como a projeção de um aro que gira). Ao fim de cada meia volta, o meridiano coincide com o contorno, e a
 * camada recomeça do outro lado, com as faces trocadas: o desenho é o mesmo (um aro girado de 180° é ele mesmo). Até
 * 28/10, o scaleX animava os <path> dentro do SVG, e o navegador repintava a esfera a cada quadro, na linha principal
 * (de 8,4% a 11,7% dela, parada: paginas/inicio.md, 2.1).
 * Quatro meridianos a 45° um do outro (na mesa) e dois a 90° (no celular): os mesmos ângulos que se viam até 28/10,
 * quando os oito da volta de 16 s coincidiam dois a dois.
 */
const MEIA_VOLTA = 8;
const MERIDIANOS = 4;

/** As duas metades de cada meridiano (o círculo do contorno): a da esquerda e a da direita, de polo a polo. */
const METADE_ESQUERDA = `M${CENTRO} ${CENTRO + RAIO}A${RAIO} ${RAIO} 0 0 1 ${CENTRO} ${CENTRO - RAIO}`;
const METADE_DIREITA = `M${CENTRO} ${CENTRO - RAIO}A${RAIO} ${RAIO} 0 0 1 ${CENTRO} ${CENTRO + RAIO}`;

/**
 * Cada meridiano começa num ponto da meia volta (atraso negativo, --fase), no ângulo (j + 0,25) · 45°: 11, 56, 101 e
 * 146°. Com (j + 0,5) · 45°, os ângulos ficariam simétricos (22,5 e 157,5°; 67,5 e 112,5°), e as elipses coincidiriam
 * duas a duas na pose parada. `--estatico` é a largura em que ele fica parado com o movimento reduzido (ou sem
 * script): o cosseno desse ângulo, a mesma pose em que o giro começa, sem salto.
 */
const FASES = Array.from({ length: MERIDIANOS }, (_, j) => {
  const t = (j + 0.25) / MERIDIANOS;
  return {
    estilo: { "--fase": `-${(t * MEIA_VOLTA).toFixed(2)}s`, "--estatico": Math.cos(t * Math.PI).toFixed(3) } as React.CSSProperties,
    acento: j === 0,
    // No celular, dois (a 90°): menos camadas na memória do aparelho.
    soNoComputador: j % 2 === 1,
  };
});

/** Os traços fixos, na ordem da pintura: o verso, ou o contorno e a frente. */
function Fixos({ lado }: { lado: "tras" | "frente" }) {
  if (lado === "tras")
    return (
      <>
        {PARALELOS.map((p) => (
          <path key={p.tras} d={p.tras} className="mov-metal mov-tras" />
        ))}
        {ANEL.map((a) => (
          <path key={a.tras} d={a.tras} className="mov-metal mov-tras mov-anel" />
        ))}
        <path d={DEZ.tras} className="mov-metal mov-tras mov-graduacao" />
        <path d={CINCO.tras} className="mov-metal mov-tras mov-graduacao max-md:hidden" />
      </>
    );
  return (
    <>
      <circle cx={CENTRO} cy={CENTRO} r={RAIO} className="mov-metal mov-contorno" />
      {PARALELOS.map((p) => (
        <path key={p.frente} d={p.frente} className="mov-metal mov-frente" />
      ))}
      {ANEL.map((a) => (
        <path key={a.frente} d={a.frente} className="mov-metal mov-frente mov-anel" />
      ))}
      <path d={DEZ.frente} className="mov-metal mov-frente mov-graduacao" />
      <path d={CINCO.frente} className="mov-metal mov-frente mov-graduacao max-md:hidden" />
    </>
  );
}

export function Esfera() {
  return (
    <EsferaViva>
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="inicio-esfera-camada">
        <defs>
          {/* O metal, aceso do noroeste: --bronze-brilho, o vínculo do escuro, a ação e o vínculo do claro. */}
          <linearGradient id="esfera-metal" gradientUnits="userSpaceOnUse" x1="40" y1="40" x2="360" y2="360">
            <stop offset="0" stopColor="#f1d3a1" />
            <stop offset="0.35" stopColor="#d9a76b" />
            <stop offset="0.65" stopColor="#c08a4a" />
            <stop offset="1" stopColor="#8a5a24" />
          </linearGradient>
        </defs>
        <Fixos lado="tras" />
      </svg>
      {FASES.map((f, j) => (
        <span
          key={j}
          className={`inicio-meridiano mov-passiva${f.acento ? " inicio-acento" : ""}${f.soNoComputador ? " max-md:hidden" : ""}`}
          style={f.estilo}
        >
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <path d={METADE_DIREITA} className="inicio-verso" />
            <path d={METADE_ESQUERDA} />
          </svg>
        </span>
      ))}
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="inicio-esfera-camada">
        <Fixos lado="frente" />
      </svg>
    </EsferaViva>
  );
}

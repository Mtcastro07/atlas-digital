/**
 * O metal da esfera armilar da capa, parado e servido no HTML (desde 17/10, "o Atlas Digital", seções 2.6, 2.7 e 3,
 * item 1 da direção). Só o que não se move, em três camadas, porque a Terra em canvas (ilhas/terra-em-dois-estados.tsx)
 * passa entre elas e chega depois da carga: este desenho é o primeiro quadro, e nada pula quando ela chega.
 * - "atras": o halo, o verso do anel das horas e o corpo da Terra (o navy aceso do oeste, o lado do Sol que se põe);
 * - "frente": a frente do anel das horas, com as 24 marcas e os rótulos do meio-dia e das 18 h, o contorno e o anel
 *   graduado de 5 em 5° (de 15 em 15°, mais longos);
 * - "papel": só o anel graduado, em #8a5a24 (5,31:1 na névoa), onde ele atravessa a borda da tela e continua no papel
 *   (a travessia, seção 2.6).
 * O anel das horas fica parado na tela porque a vista fica parada em relação ao Sol (a do pôr do sol de agora: o meio-dia
 * na borda esquerda, as 18 h na frente, a meia-noite na direita); a Terra gira por baixo dele. Vista abaixo do equador,
 * como em toda a figura: a frente do anel é o arco de cima. Desde 18/10 (o passe do celular), a vista do celular é
 * outra (23,44° abaixo do equador, no CSS: --vista, que o canvas lê, e --achata, o seno dela): o anel das horas vem em
 * dois desenhos, o da mesa e o do celular, e o CSS mostra um.
 * Em unidades do raio da Terra (viewBox de −1,25 a 1,25), com o traço em px de tela (non-scaling-stroke): o tamanho e o
 * lugar vêm do CSS da capa (app/digital.css, "a capa"), e o canvas lê a caixa daqui para desenhar no mesmo lugar. Os
 * rótulos das horas são HTML, em % da caixa, para ficarem em 12 px em qualquer tamanho.
 * O halo (decisão do aprovador, por omissão, 17/10: fica, porque foi pedido do usuário em 03/10) é a atmosfera, em navy
 * mais claro, parado: sem o bronze e sem o pulso de antes (a luz no navy é navy mais claro, C14; e o que se move mede algo).
 * De 28/08 a 17/10, a esfera de arame com oito meridianos que giravam a cada 16 s (mov-meridiano), o halo quente que
 * pulsava e, no dia 17, a Terra em pontos e o ponteiro dos segundos: saíram os meridianos e o ponteiro (não mediam nada,
 * a marca M4) e o calor do halo.
 */

/** O anel graduado e o anel das horas, em raios da Terra: 1,09 (no esboço, 30 px num raio de 347). */
const ANEL = 1.09;
const DENTRO = 1 + (ANEL - 1) * 0.55;
/** O anel das horas visto 16° abaixo do equador, na mesa: a elipse achata pelo seno da inclinação. */
const ACHATA = Math.sin((16 * Math.PI) / 180);

const n = (v: number) => +v.toFixed(4);

/** As 72 marcas do anel graduado, de 5 em 5°; as de 15 em 15° cruzam o anel inteiro. */
const GRADUACAO = Array.from({ length: 72 }, (_, k) => {
  const a = (k * 5 * Math.PI) / 180;
  const fim = DENTRO + (ANEL - DENTRO) * (k % 3 === 0 ? 1 : 0.55);
  return `M${n(Math.cos(a) * DENTRO)} ${n(Math.sin(a) * DENTRO)}L${n(Math.cos(a) * fim)} ${n(Math.sin(a) * fim)}`;
}).join("");

/** O ponto da hora solar h no anel das horas achatado por `achata`: as 18 h na frente (o alto), o meio-dia na borda
 *  esquerda. */
const naHora = (h: number, achata: number) => {
  const t = ((h - 18) * 15 * Math.PI) / 180;
  return { x: ANEL * Math.sin(t), y: -ANEL * achata * Math.cos(t), frente: Math.cos(t) > -1e-9 };
};
/** O anel das horas achatado por `achata`: os dois arcos e as 24 marcas, em verso e frente (as de 6 em 6 h, mais longas). */
function anelDasHoras(achata: number) {
  const ry = n(ANEL * achata);
  const anel = { frente: `M${-ANEL} 0A${ANEL} ${ry} 0 0 1 ${ANEL} 0`, atras: `M${ANEL} 0A${ANEL} ${ry} 0 0 1 ${-ANEL} 0`, marcasFrente: "", marcasAtras: "" };
  for (let h = 0; h < 24; h++) {
    const p = naHora(h, achata);
    const s = h % 6 ? 1.018 : 1.035;
    anel[p.frente ? "marcasFrente" : "marcasAtras"] += `M${n(p.x)} ${n(p.y)}L${n(p.x * s)} ${n(p.y * s)}`;
  }
  return anel;
}
/** Na mesa, o anel achatado no desenho; no celular, redondo, e o CSS o achata (app/digital.css, --achata). Dois
 *  desenhos, e não um transform na mesa: com ele, o anel no papel (a travessia) se redesenhava meio pixel ao lado. */
const ANEIS = { mesa: anelDasHoras(ACHATA), celular: anelDasHoras(1) };
/** Os rótulos: 12 h, 18 h e 24 h, um pouco fora do anel, em % da caixa (2,5 raios de lado); o das 18 h, sobre a frente
 *  (no celular, o CSS o leva para a frente achatada por --achata: --hora-18). O de 24 h, na borda direita, cairia sobre
 *  a borda da tela em quase toda mesa, cortado ao meio: só aparece no celular, onde o anel cabe inteiro. */
const ROTULOS = [12, 18, 24].map((h) => {
  const p = naHora(h, ACHATA);
  const x = h === 18 ? 0 : p.x * 1.075;
  const y = h === 18 ? p.y * 1.13 : 0;
  const topo = `${n(((y + 1.25) / 2.5) * 100)}%`;
  return { texto: `${h} h`, esquerda: `${n(((x + 1.25) / 2.5) * 100)}%`, topo: h === 18 ? `var(--hora-18, ${topo})` : topo };
});

const CAIXA = "-1.25 -1.25 2.5 2.5";

export function Esfera({ camada }: { camada: "atras" | "frente" | "papel" }) {
  if (camada === "papel")
    return (
      <svg viewBox={CAIXA} aria-hidden="true" className="vd-esfera vd-esfera-papel">
        <circle r={ANEL} className="aro" />
        <circle r={DENTRO} className="aro-dentro" />
        <path d={GRADUACAO} className="graduacao" />
      </svg>
    );
  if (camada === "atras")
    return (
      <svg viewBox={CAIXA} aria-hidden="true" className="vd-esfera">
        <defs>
          {/* O corpo: navy mais claro do lado do Sol (o oeste, a esquerda), a água funda do lado da noite. */}
          <radialGradient id="vd-esfera-corpo" cx="0.08" cy="0.46" r="1.02">
            <stop offset="0" stopColor="#173c62" />
            <stop offset="0.55" stopColor="#0e2844" />
            <stop offset="1" stopColor="#071a30" />
          </radialGradient>
          {/* A atmosfera: do limbo (1/1,24 do raio do halo) para fora, o --agua-rasa (a luz do navy) até sumir. */}
          <radialGradient id="vd-esfera-halo" r="0.5">
            <stop offset="0.78" stopColor="#1d4670" stopOpacity="0" />
            <stop offset="0.81" stopColor="#1d4670" stopOpacity="0.55" />
            <stop offset="0.9" stopColor="#1d4670" stopOpacity="0.18" />
            <stop offset="1" stopColor="#1d4670" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r="1.24" fill="url(#vd-esfera-halo)" />
        {(["mesa", "celular"] as const).map((onde) => (
          <g key={onde} className={`anel-${onde}`}>
            <path d={ANEIS[onde].atras} className="horas-atras" />
            <path d={ANEIS[onde].marcasAtras} className="horas-atras" />
          </g>
        ))}
        <circle r="1" fill="url(#vd-esfera-corpo)" />
      </svg>
    );
  return (
    <>
      <svg viewBox={CAIXA} aria-hidden="true" className="vd-esfera">
        <defs>
          {/* O metal, aceso do oeste (a esquerda, o lado do dia): a família do bronze, sem tom novo (seção 2.1). */}
          <linearGradient id="vd-esfera-metal" gradientUnits="userSpaceOnUse" x1="-1.1" y1="-1" x2="1.1" y2="1">
            <stop offset="0" stopColor="#f1d3a1" />
            <stop offset="0.38" stopColor="#d9a76b" />
            <stop offset="0.7" stopColor="#c08a4a" />
            <stop offset="1" stopColor="#8a5a24" />
          </linearGradient>
        </defs>
        {(["mesa", "celular"] as const).map((onde) => (
          <g key={onde} className={`anel-${onde}`}>
            <path d={ANEIS[onde].frente} className="horas" />
            <path d={ANEIS[onde].marcasFrente} className="horas-marcas" />
          </g>
        ))}
        <circle r="1" className="contorno" />
        <circle r={ANEL} className="aro" />
        <circle r={DENTRO} className="aro-dentro" />
        <path d={GRADUACAO} className="graduacao" />
      </svg>
      {/* O texto vem do CSS (o ::before lê o data-hora): fora do HTML, o robô que não monta a página não o lê. */}
      {ROTULOS.map((r) => (
        <span key={r.texto} aria-hidden="true" className="vd-esfera-hora" data-hora={r.texto} style={{ left: r.esquerda, top: r.topo }} />
      ))}
    </>
  );
}

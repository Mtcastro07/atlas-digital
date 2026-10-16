import { PausaDaJanela } from "@/components/demos/nutricao/pausa-da-janela";
import { LuzDaFolha } from "@/components/ilhas/demos/nutricao/luz-da-folha";
import { nutricaoSite as site } from "@/conteudo/demos/nutricao";

/** A régua do dia na folha: de 6h a 22h. */
const PRIMEIRA = 6;
const ULTIMA = 22;
const horas = Array.from({ length: ULTIMA - PRIMEIRA + 1 }, (_, i) => PRIMEIRA + i);

/**
 * A folha do plano, a assinatura da capa: o alto da primeira página do plano alimentar que a paciente leva para casa,
 * pousada na mesa, junto da janela do consultório. Desde o crítico de fora (14.10.2026):
 * - a rotina do dia numa régua de horas, de 6h a 22h, com as quatro refeições marcadas e os nomes em escada (até
 *   então, uma lista com pontilhado até o horário: o sumário em miniatura);
 * - na mesa, no alto, à direita do título, inteira na primeira tela de 1024 a 1920 px e longe do botão flutuante
 *   (até então, no canto de baixo, na dobra e sob o botão); no celular, inteira, logo abaixo do título (até então, um
 *   pedaço atrás do fim das linhas dele);
 * - a sombra da folhagem da janela, que balança devagar sobre a folha e a palha (o ambiente da capa, pausável e parado
 *   fora da tela), com a pausa logo abaixo.
 * O papel com o grão e a luz parada da janela, a sombra longa tingida numa camada própria e a faixa de luz (ilha
 * LuzDaFolha), que passa na entrada e responde ao ponteiro e ao toque. Decorativa (aria-hidden): o que ela diz já está
 * no lide. O desenho e o movimento em nutricao.css.
 */
export function FolhaDoPlano() {
  const folha = site.folhaDoPlano;
  return (
    <div className="nt-folha-lugar">
      {/* A janela recorta a sangria na borda da tela: a folha e a sombra não alargam o documento. */}
      <div aria-hidden="true" className="nt-folha-janela">
        <div className="nt-folha-do-plano">
          <span className="nt-fp-sombra" />
          <div className="nt-fp-papel">
            <div className="nt-fp-cabeca">
              <p className="nt-exibicao nt-fp-titulo">{folha.titulo}</p>
              <p className="nt-versal nt-fp-assinatura">{folha.assinatura}</p>
            </div>
            <div className="nt-fp-dia">
              <ol className="nt-fp-refeicoes">
                {folha.refeicoes.map((r, i) => (
                  <li
                    key={r.nome}
                    className={i === folha.refeicoes.length - 1 ? "nt-fp-ultima" : undefined}
                    style={{ "--x": (r.hora - PRIMEIRA) / (ULTIMA - PRIMEIRA), "--n": i } as React.CSSProperties}
                  >
                    <span className="nt-fp-nome">{r.nome}</span> <span className="nt-numeros nt-fp-hora">{r.rotulo}</span>
                  </li>
                ))}
              </ol>
              <div className="nt-fp-regua">
                {horas.map((h) => (
                  <span key={h} className={h % 2 === 0 ? "nt-fp-marca nt-fp-par" : "nt-fp-marca"} style={{ "--x": (h - PRIMEIRA) / (ULTIMA - PRIMEIRA) } as React.CSSProperties}>
                    {h % 4 === 2 && <span className="nt-numeros">{h}h</span>}
                  </span>
                ))}
              </div>
            </div>
            <p className="nt-versal nt-fp-pe">{folha.pe}</p>
            <LuzDaFolha />
          </div>
        </div>
        <SombraDaJanela />
      </div>
      <PausaDaJanela />
    </div>
  );
}

/** Uma folha de manjericão, de pé, com a base na origem: ovalada, de ponta fina. */
const FOLHA = "M0 0C9-6 15-20 13-34C11-46 4-54 0-60C-4-54-11-46-13-34C-15-20-9-6 0 0Z";

/** Os dois ramos da horta da janela: cada folha com o lugar, o giro e o tamanho. */
const RAMOS = [
  {
    caule: "M250 520C238 430 222 330 196 250C176 190 150 130 118 70",
    folhas: [
      [238, 440, -38, 1.25],
      [240, 418, 34, 1.15],
      [214, 330, -48, 1.2],
      [222, 312, 40, 1.3],
      [190, 236, -30, 1.1],
      [196, 220, 52, 1.05],
      [160, 160, -42, 1],
      [168, 146, 38, 0.95],
      [128, 92, -18, 0.85],
      [132, 84, 30, 0.8],
    ],
  },
  {
    caule: "M330 540C350 460 372 400 410 330C436 282 462 240 500 196",
    folhas: [
      [348, 470, 40, 1.1],
      [344, 452, -36, 1.05],
      [384, 380, 48, 1.15],
      [374, 360, -30, 1],
      [428, 300, 36, 1],
      [420, 290, -44, 0.95],
      [470, 236, 30, 0.85],
      [482, 214, 62, 0.75],
    ],
  },
] as const;

/**
 * A sombra da horta da janela (o manjericão no parapeito, de onde vem a tinta verde de horta do site): dois ramos de
 * folhas desfocadas, na tinta, a ~12%, que balançam devagar (9 s e 13 s, ida e volta), cada um no seu ritmo. O
 * ambiente da capa do Essencial (09-movimento.md, seção 4): só transform; com a pausa (PausaDaJanela) e parado fora
 * da tela (data-fora); com movimento reduzido e sem script, parado no repouso. O desfoque é do desenho (filtro do
 * SVG), pintado uma vez: o que anda é a camada inteira.
 */
function SombraDaJanela() {
  return (
    <div className="nt-horta" data-ambiente>
      {RAMOS.map((ramo, k) => (
        <svg key={ramo.caule} viewBox="0 0 560 560" className={`nt-ramo nt-ramo-${k}`}>
          <defs>
            <filter id={`nt-desfoque-${k}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={k === 0 ? 5 : 7} />
            </filter>
          </defs>
          <g filter={`url(#nt-desfoque-${k})`} fill="var(--foreground)">
            <path d={ramo.caule} fill="none" stroke="var(--foreground)" strokeWidth="5" strokeLinecap="round" />
            {ramo.folhas.map(([x, y, giro, tamanho]) => (
              <path key={`${x}-${y}`} d={FOLHA} transform={`translate(${x} ${y}) rotate(${giro}) scale(${tamanho})`} />
            ))}
          </g>
        </svg>
      ))}
    </div>
  );
}

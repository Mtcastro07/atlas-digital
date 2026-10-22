import { Fragment } from "react";

import { RosaDoSol } from "@/components/ilhas/rosa-do-sol";
import { ARO, CAMADAS, PASSO, PASSO_NO_CELULAR, caminhosDaRosa } from "@/components/paginas/geometria-da-rosa";
import { duvidas } from "@/conteudo/duvidas";
import { figuras } from "@/conteudo/site";
import { bayer } from "@/lib/traco-e-ponto";

/** Os quadrantes, na ordem dos momentos (a de leitura): a agulha da rosa aponta o da palavra sob a mão. */
const QUADRANTES = ["no", "ne", "so", "se"] as const;
/** O rumo do meio de cada quadrante, em graus, do norte para o leste (o --rumo da agulha, app/digital.css). */
const RUMO = { no: 315, ne: 45, so: 225, se: 135 } as const;

/**
 * A graduação do aro, de 10 em 10 graus (a cada 90, mais longa), para dentro: a escala em que a marca do Sol corre. `k`:
 * a escala do traço (1 na mesa; na rosa do celular, a razão das pautas, para o risco ter na tela o comprimento da mesa).
 */
const graduacao = (k: number) =>
  Array.from({ length: 36 }, (_, i) => {
    const a = (i * 10 * Math.PI) / 180;
    const dentro = ARO - (i % 9 === 0 ? 22 : 10) * k;
    const ponto = (r: number) => `${Math.round(r * Math.sin(a) * 10) / 10} ${Math.round(-r * Math.cos(a) * 10) / 10}`;
    return `M${ponto(ARO)}L${ponto(dentro)}`;
  }).join("");

/**
 * As letras do aro, em HTML (o tamanho da letra não encolhe com o desenho), na posição do desenho, em % da caixa. Sem o
 * O: a rosa sangra pela esquerda, e ele ficaria sempre além da borda.
 */
const LETRAS = [
  ["N", 50, 1.2],
  ["L", 98.8, 50],
  ["S", 50, 98.8],
] as const;

/**
 * A rosa do Sol, o fundo da abertura de /duvidas (desde 17/10, a direção final do Atlas Digital, seção 3, item 22): a
 * rosa de oito pontas de 16/10, grande, sangrando pela borda esquerda da tela (.vd-tela-sangra-esquerda), desenhada no
 * primitivo do site (components/paginas/geometria-da-rosa.ts). A metade voltada para o Sol de agora em Niterói é
 * gravada em bronze, e a outra é ponto de tela; à noite, a rosa inteira em ponto, com a marca no aro onde o Sol vai
 * nascer. O HTML do servidor traz a rosa toda em ponto (o Sol se calcula no aparelho); a ilha (ilhas/rosa-do-sol.tsx, na
 * legenda) a acende a cada minuto. A agulha das perguntas, de 16/10, fica: aponta o quadrante do momento da palavra sob
 * a mão, no foco ou no toque, em 200 ms (app/digital.css, "duvidas"); desde a revisão de 17/10, só aparece aí, vazada
 * em luz de tela (parada, em bronze, apontava o noroeste a qualquer hora e lia como o Sol). Desenho, sem texto para o
 * leitor de tela: o que ela diz está na legenda, em HTML.
 * Até 17/10, a rosa pequena (96 px), no cruzamento dos quatro momentos, com as metades acesas pela luz fixa da hora azul.
 * Desde 18/10 (o passe do celular; a direção, seção 4), duas rosas no HTML, e o CSS mostra uma (app/digital.css,
 * "duvidas"): a da mesa, a partir de 1.024 px, a PASSO; e a do celular e do tablet, a PASSO_NO_CELULAR, com o traço, a
 * marca e a agulha na mesma razão, para ficarem na tela com a medida da mesa numa rosa de 400 a 500 px. Até então, a
 * mesma rosa encolhida: a casa a ~3 px e o traço a 1 px liam como uma trama cinza.
 * Desde a revisão de 18/10, a do celular mora no mapa (MapaDasDuvidas, abaixo), entre a legenda e os momentos: abaixo de
 * 768 px, ela entra no fluxo, logo abaixo do lide, na primeira tela; daqui, o fundo, só a da mesa.
 */
export function RosaDasDuvidas() {
  return <Rosa passo={PASSO} className="vd-rosa-mesa" />;
}

function Rosa({ passo, className }: { passo: number; className: string }) {
  const caminhos = caminhosDaRosa(null, bayer, passo);
  const k = passo / PASSO;
  return (
    <div aria-hidden="true" className={`vd-rosa-do-sol ${className}`} data-passo={passo}>
      <svg viewBox="-500 -500 1000 1000">
        <circle r={ARO} className="vd-rosa-aro" />
        <path d={graduacao(k)} className="vd-rosa-aro" />
        {CAMADAS.map((camada) => (
          <path key={camada} data-camada={camada} d={caminhos[camada]} strokeDasharray={camada.startsWith("ponto") ? `0 ${passo}` : undefined} />
        ))}
        <g data-marca="" className="vd-rosa-marca">
          <circle cy={-ARO} r={12 * k} />
        </g>
        {/* A agulha: o losango da bússola, mais comprido que as colaterais (0,6 do raio), para a ponta sair delas. */}
        <path d={`M0 -300L${10 * k} 0L0 ${56 * k}L${-10 * k} 0Z`} className="vd-rosa-agulha" />
        <circle r={9 * k} className="vd-rosa-pino" />
      </svg>
      {/* O espaço entre as letras: no HTML, sem ele, o robô lia "NLS" (texto-do-robo.mjs). */}
      {LETRAS.map(([letra, x, y]) => (
        <Fragment key={letra}>
          <span className="vd-rosa-letra" style={{ left: `${x}%`, top: `${y}%` }}>
            {letra}
          </span>{" "}
        </Fragment>
      ))}
    </div>
  );
}

/** Um ponto a `r` do centro do glifo, no rumo `graus`. */
const noRumo = (graus: number, r: number) => {
  const a = (graus * Math.PI) / 180;
  return `${Math.round(r * Math.sin(a) * 100) / 100} ${Math.round(-r * Math.cos(a) * 100) / 100}`;
};

/**
 * O glifo do quadrante, ao lado do nome do momento, abaixo de 1.024 px (desde a revisão de 18/10): a rosa em miniatura,
 * na gramática dela, o quadrante do momento em traço e o resto do aro em ponto (16 pontos, um a cada 22,5°: os cantos
 * do quadrante caem num ponto), e o fio da agulha no rumo dele. Na mesa, a grade 2 × 2 já é a dos quadrantes.
 */
function GlifoDoQuadrante({ quadrante }: { quadrante: keyof typeof RUMO }) {
  const rumo = RUMO[quadrante];
  return (
    <svg viewBox="-12 -12 24 24" aria-hidden="true" className="vd-glifo-do-quadrante lg:hidden">
      <circle r="9" strokeDasharray={`0 ${((2 * Math.PI * 9) / 16).toFixed(3)}`} />
      <path d={`M${noRumo(rumo - 45, 9)}A9 9 0 0 1 ${noRumo(rumo + 45, 9)}M0 0L${noRumo(rumo, 5.5)}`} />
    </svg>
  );
}

/**
 * Dúvidas: as perguntas pelo momento em que costumam aparecer — antes de contratar, na contratação, durante o trabalho,
 * com o site no ar —, em palavras-chave que levam à resposta (e a abrem: ilha Ancoras). Não repete a lista, que vem
 * logo abaixo: é outra entrada para ela. Sem números desde 16/10 (a numeração em série, a marca L5). Os quatro
 * momentos em 2 × 2, na ordem de leitura, que é a do tempo; cada um é um quadrante da rosa (antes de contratar a
 * noroeste, na contratação a nordeste, durante o trabalho a sudoeste, com o site no ar a sudeste), e a palavra sob a
 * mão leva a agulha da rosa ao seu. Em cima, a legenda da rosa, com o Sol de agora.
 * Desde 17/10 (a direção final do Atlas Digital, seção 3, item 22), à direita do título, com a rosa à esquerda, no
 * fundo da tela; até então, em volta da rosa pequena, voltados para o cruzamento.
 * Desde 18/10 (o passe do celular; a direção, seção 4: "os textos jogados viram instrumento"), abaixo de 1.024 px, as
 * palavras são teclas de 44 px, em pílula na água funda (app/digital.css, "duvidas"). Até então, os quadrantes em 2 × 2
 * também no celular, com as palavras soltas, e a legenda no alto, longe da rosa que ela explica.
 * Desde a revisão de 18/10, abaixo de 768 px, na ordem do HTML, que é a do desenho: a legenda, a rosa do celular (logo
 * abaixo do lide, na primeira tela, com o Sol de agora) e os momentos, cada um com o glifo do seu quadrante e as teclas
 * na largura da palavra, em linhas. De 768 a 1.024 px, a rosa sai do fluxo e vai à esquerda (o CSS). Até então, o
 * momento na margem e as teclas na largura da coluna, uma por linha (548 px de lista, como o menu de um aplicativo), e a
 * rosa no pé da tela, a 1,3 tela do topo: a primeira tela do celular não tinha nada do digital.
 */
export function MapaDasDuvidas() {
  return (
    <div className="vd-mapa-das-duvidas">
      {/* A legenda da rosa, logo abaixo do lide (desde a revisão de 17/10; até então, no pé dos momentos, a y = 950 a
          1.440 × 900): na primeira tela, a rosa viva diz de quando é (seção 2.8). */}
      <p className="vd-legenda-de-carta">
        <RosaDoSol
          legenda={{ dia: figuras.rosa.legenda, noite: figuras.rosa.legendaDaNoite }}
          reserva={figuras.rosa.solAntes}
          lugar={figuras.coordenadas.decimal}
        />
      </p>
      <Rosa passo={PASSO_NO_CELULAR} className="vd-rosa-celular" />
      <nav aria-label="As perguntas, pelo momento em que aparecem" className="lg:mt-12">
        <ol className="[overflow-wrap:anywhere] lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-9">
          {figuras.momentos.map((m, i) => (
            <li key={m.momento} data-quadrante={QUADRANTES[i]}>
              <p className="vd-momento">
                <GlifoDoQuadrante quadrante={QUADRANTES[i]} />
                {m.momento}
              </p>
              <ul className="lg:mt-2">
                {m.itens.map((item) => (
                  <li key={item.duvida}>
                    <a
                      href={`#duvida-${item.duvida}`}
                      aria-label={`${item.rotulo}: ${duvidas[item.duvida - 1].pergunta}`}
                      className="vd-tecla-da-duvida flex min-h-11 items-center py-1 font-semibold no-underline transition-colors duration-300 hover:text-accent active:text-accent active:duration-120 lg:inline-flex lg:text-destaque"
                    >
                      {item.rotulo}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

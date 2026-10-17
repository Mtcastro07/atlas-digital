import { Orbe } from "@/components/estrutura";
import { Globo } from "@/components/marca/globo";
import { duvidas } from "@/conteudo/duvidas";
import { planos } from "@/conteudo/planos";
import { figuras } from "@/conteudo/site";
import { CARTA, LUGARES_NA_CARTA, TERRA } from "@/components/paginas/costa-de-niteroi";
import { reais } from "@/lib/moeda";

// As figuras das aberturas das páginas internas: cada página tem a sua, e
// é ela que dá a identidade da página (pedido do usuário, 01/10: "design
// único e identitário de cada uma das páginas"). Tipografia, número e
// traço, como no resto do site; nenhuma figura desenhada (ESTEIRA, VI).

/**
 * Para quem: os bairros dos três sites de exemplo, no degrau dos números,
 * em Archivo Black (de 03 a 05/10, na família do texto), cada um com o nicho e o
 * vínculo para o site. Desde 14/10, numa coluna ao lado do título, um
 * bairro por linha, com o nicho em cima, como numa placa (até 14/10, em
 * linha corrida embaixo do título, o nicho em sobrescrito: a metade direita
 * da abertura ficava vazia na mesa). Até 02/10, eram 25 bairros de Niterói, com os três
 * acesos; desde 03/10, só os três, menores (pedido do usuário).
 * Os bairros chegam parados: de 14 a 16/10, acendiam de 40% a 100% um a
 * um, um esmaecimento, a entrada mais genérica que há (da família da
 * marca M1; o crítico de fora). A resposta é à mão: o bairro passa a
 * bronze no hover e, no toque, no :active, em 120 ms.
 * Desde 16/10 ("Identidade mais profunda"), a carta da costa de Niterói ao
 * lado da lista, sem os filetes entre os bairros: a linha de costa do
 * OpenStreetMap (components/paginas/costa-de-niteroi.ts, gerado por
 * ferramentas/gerar-costa.mjs), a terra e três linhas d'água (a 60, 140 e
 * 260 m da costa, na água rasa), sem ruas: é carta náutica, e
 * não a folha de ruas do pet shop. Os três bairros são pontos de bronze nos
 * nós do OpenStreetMap, com o nome em SVG (desenho, e não texto da página;
 * o texto é a lista). A carta sangra pela direita (no celular, pelos dois
 * lados) e se dissolve na água da cena nas outras bordas. Sob a mão, o
 * bairro da lista acende o ponto dele na carta, só na cor e no anel, em
 * 120 ms (app/vidro.css, .vd-carta).
 */
/** A posição do bairro na carta, de cima para baixo (em % da altura). */
const latitude = (bairro: string) => LUGARES_NA_CARTA.find((lugar) => lugar.nome === bairro)?.y ?? 100;

export function CartaDeNiteroi() {
  const { exemplos, rotulo, nota } = figuras.bairros;
  // Desde 17/10 (passe 4, fechamento com o Impeccable), a terra em navy mais claro que a água, com o fio da costa
  // (até então, na água funda, mais escura que a água: a carta lia como uma mancha escura), e a caixa 900 m mais ao
  // sul, com a praia de Icaraí, a Boa Viagem e o Gragoatá acima da borda que se dissolve. O ponto tem um aro creme.
  // As linhas d'água: um anel de 14 m (2 · 7) a cada distância da costa, recortado por máscara (a água fica à mostra).
  const aguas = [260, 140, 60];
  return (
    <figure className="vd-carta grid gap-y-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-6">
      <div className="max-lg:mb-4 max-lg:-mx-6 md:max-lg:-mx-10 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:mr-[calc((min(100vw,var(--container-pagina))-100vw)/2-2.5rem)]">
        {/* A máscara que dissolve as bordas fica só no desenho (17/10): na caixa toda, apagava também o ponto e o nome do
            bairro que caem perto da borda de cima (Engenhoca). */}
        <div className="relative" style={{ aspectRatio: `${CARTA.largura} / ${CARTA.altura}` }}>
          <svg viewBox={`0 0 ${CARTA.largura} ${CARTA.altura}`} aria-hidden="true" className="vd-carta-folha absolute inset-0 size-full">
            <defs>
              <path id="carta-terra" d={TERRA} />
              <mask id="carta-aguas" maskUnits="userSpaceOnUse" x="-1000" y="-1000" width={CARTA.largura + 2000} height={CARTA.altura + 2000}>
                <g fill="none" strokeLinejoin="round">
                  {aguas.flatMap((d) => [
                    <use key={`${d}+`} href="#carta-terra" stroke="#fff" strokeWidth={2 * (d + 7)} />,
                    <use key={`${d}-`} href="#carta-terra" stroke="#000" strokeWidth={2 * (d - 7)} />,
                  ])}
                </g>
              </mask>
            </defs>
            <rect width={CARTA.largura} height={CARTA.altura} mask="url(#carta-aguas)" className="vd-carta-aguas" />
            <use href="#carta-terra" className="vd-carta-terra" />
          </svg>
          {/* Os pontos e os nomes, em px, sobre a carta (as posições em % da caixa). */}
          <svg aria-hidden="true" className="vd-carta-pontos absolute inset-0 size-full overflow-visible">
            {LUGARES_NA_CARTA.map((lugar, i) => (
              <g key={lugar.nome} data-ponto={i}>
                <circle cx={`${lugar.x}%`} cy={`${lugar.y}%`} r="8.5" className="anel" />
                <circle cx={`${lugar.x}%`} cy={`${lugar.y}%`} r="4" className="ponto" />
                <text x={`${lugar.x}%`} y={`${lugar.y}%`} dx="-12" dy="4">
                  {lugar.nome}
                </text>
              </g>
            ))}
          </svg>
        </div>
        {/* O crédito que a licença dos dados (ODbL) exige, junto da carta. */}
        <svg aria-hidden="true" className="vd-carta-pontos block h-4 w-full">
          <text x="24" y="12" className="credito">
            © colaboradores do OpenStreetMap
          </text>
        </svg>
      </div>
      {/* Na ordem da carta, do norte ao sul (17/10, segundo fechamento com o Impeccable): a lista seguia a dos planos, e
          o primeiro nome da lista era o último ponto da carta. */}
      <ul aria-label={rotulo} className="font-display tracking-titulo text-numero lg:col-start-1 lg:row-start-2">
        {[...exemplos].sort((a, b) => latitude(a.bairro) - latitude(b.bairro)).map((exemplo) => (
          <li key={exemplo.bairro}>
            {/* Vínculo comum, não <Link>: o site de exemplo é outro site, e a pré-busca do Next traria as fontes dele para esta página. */}
            <a
              href={exemplo.caminho}
              // O ponto do bairro na carta, pelo nome (a carta tem a ordem do gerador, e a lista, a dos planos).
              data-bairro={LUGARES_NA_CARTA.findIndex((lugar) => lugar.nome === exemplo.bairro)}
              className="flex min-h-11 flex-col py-3 text-foreground no-underline transition-colors duration-300 hover:text-accent active:text-accent active:duration-120"
            >
              {/* O bairro, e o nicho embaixo, como legenda, em letra comum (17/10): até então, o nicho em caixa-alta acima do
                  nome, o rótulo sobre o título (as marcas T2 e T3). */}
              <span className="whitespace-nowrap">{exemplo.bairro}</span>{" "}
              <span className="mt-1 font-sans text-nota font-semibold tracking-normal text-accent first-letter:uppercase">{exemplo.nicho}</span>
            </a>
          </li>
        ))}
      </ul>
      <figcaption className="max-w-[16rem] text-nota text-muted-foreground lg:col-start-1 lg:row-start-3 lg:max-w-[13rem]">{nota}</figcaption>
    </figure>
  );
}

/**
 * Planos: a escada de preços — três degraus que sobem com o plano, o preço
 * de criação em cada um. Em toda largura, o "R$" fica em cima do número,
 * como num letreiro de preço: lado a lado, o degrau (~116 px por dentro)
 * partia "R$ 1.500" em duas linhas desiguais. Sob o cursor (03/10, a
 * pedido), o degrau clareia de leve e o orbe de bronze o acompanha — a
 * luz do cursor dos blocos (.vd-luz, ilha LuzDoCursor), sem o aro aceso,
 * que contornaria também a base esmaecida do degrau. O degradê que se
 * apaga embaixo, o filete de bronze de 2 px e o orbe saíram em 03/10 pela
 * regra 3 das Diretrizes de Design Premium e voltaram no mesmo dia, a
 * pedido do usuário: são parte da identidade do site.
 * Cada degrau é um vínculo para o plano dele, logo abaixo, com o que o
 * plano inclui (desde 16/10): até então, o degrau acendia como controle,
 * no hover e no toque, e não levava a lugar algum (o crítico de fora).
 * O momento da página (desde 14/10, refeito em 15/10): a escada sobe até
 * o corrimão. O corrimão fica parado, desenhado desde o primeiro quadro, e
 * os três degraus, visíveis e com o nome do plano à vista, sobem até ele
 * um depois do outro (.mov-degrau, app/movimento.css): o traçado primeiro,
 * a obra depois, num gesto só. Até 15/10, os degraus partiam escondidos
 * sob o chão e, assentados, o corrimão se riscava da esquerda para a
 * direita por uma janela: o mesmo traço que se riscava na soma do
 * Orçamento e na trena de O trabalho, em três páginas seguidas (a mesma
 * entrada com outro nome; pedido do usuário, 14/10: "parecendo que você
 * está spamando os mesmos componentes").
 * Desde 16/10 ("Identidade mais profunda"), a escada de pedra ao sol da
 * manhã, que vem do leste: os degraus são pedra (o tom pedra, com o grão
 * dela), com a face de cima acesa (no lugar do filete de bronze de 2 px), o
 * lado do leste claro e o do oeste em sombra; o texto em navy (11,33:1). A
 * partir de 1024 px, a escada pousa na emenda (a abertura de Planos alinha
 * a figura ao chão), e cada degrau projeta no papel de baixo a sua sombra,
 * inclinada para o oeste, longe da luz: o chão, a única sombra projetada do
 * site. A sombra fica parada enquanto o degrau sobe (o chão da figura
 * recorta os degraus, e a sombra, no papel, fica fora dele). O orbe do
 * cursor fica, na cor do tom claro.
 * Com a letra a 200% no celular (a figura com menos de 14 rem; com a letra
 * normal, ela tem 17 rem ou mais), a escada empilha os três degraus, sem o
 * corrimão (17/10, passe 4): em três colunas, o nome e o preço passavam do
 * degrau, e o chão os cortava.
 */
export function EscadaDePrecos() {
  const alturas = ["h-[46%]", "h-[70%]", "h-full"];
  return (
    // A altura é mínima (e não fixa): com os degraus empilhados, a figura cresce com eles.
    <figure aria-label="Os três planos, do Essencial ao Completo" className="@container relative min-h-[clamp(300px,34vw,440px)]">
      {/* O chão da escada: os degraus sobem de baixo dele. */}
      <div className="absolute inset-0 grid grid-cols-3 items-end gap-3 overflow-hidden md:gap-4 @max-[14rem]:static @max-[14rem]:grid-cols-1">
        {planos.map((plano, i) => (
          // Um vínculo para o plano, logo abaixo, com o que ele inclui: o degrau acende como peça e leva a ela.
          // O contorno do foco vai para dentro: o chão da figura recortaria o que passa da borda.
          // O piso de bronze é sombra interna (16/10, Impeccable, C11): a borda de 2 px no canto arredondado afinava em crescente.
          <a
            key={plano.id}
            href={`#plano-${plano.id}`}
            data-tom="pedra"
            style={{ "--i": i } as React.CSSProperties}
            className={`mov-degrau group vd-luz vd-materia vd-degrau flex focus-visible:-outline-offset-4 flex-col justify-between rounded-t-[4px] bg-background p-3 text-foreground no-underline after:hidden sm:p-4 md:p-5 ${alturas[i]} @max-[14rem]:h-auto @max-[14rem]:gap-3`}
          >
            <Orbe />
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-white/35 to-transparent opacity-0 transition-opacity duration-500 ease-atlas group-hover:opacity-100" />
            <p className="text-rotulo font-semibold text-accent">{plano.nome}</p>
            <p>
              <span className="block text-rotulo font-semibold text-muted-foreground">R$</span>{" "}
              <span className="mt-1 block font-display tracking-titulo text-numero tabular-nums">
                {plano.criacao.toLocaleString("pt-BR")}
              </span>{" "}
              <span className="mt-2 block text-rotulo text-muted-foreground tabular-nums">
                + {reais(plano.mensal)} <span className="block sm:inline">por mês</span>
              </span>
            </p>
          </a>
        ))}
      </div>
      {/* O chão (16/10): a sombra de cada degrau no papel de baixo, a partir de 1024 px, onde a escada pousa na emenda. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full hidden h-full grid-cols-3 gap-3 md:gap-4 lg:grid">
        {["46%", "70%", "100%"].map((altura) => (
          <span key={altura} className="vd-sombra-do-degrau" style={{ "--altura": altura } as React.CSSProperties} />
        ))}
      </div>
      {/* O corrimão: o traço de bronze que sobe de degrau em degrau, parado (desde 15/10). A caixa passa 2 px da figura,
          como a janela que o revelava até então; o traço, 2 px para dentro dela, fica onde sempre esteve. */}
      <span aria-hidden="true" className="pointer-events-none absolute -inset-0.5 overflow-hidden @max-[14rem]:hidden">
        <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="absolute top-0.5 left-0.5 h-[calc(100%-4px)] w-[calc(100%-4px)] overflow-visible">
          <path d="M0 54H100V30H200V0H300" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
        </svg>
      </span>
    </figure>
  );
}

/** O traço de cada trecho da régua, também usado na legenda do celular. */
const TRACO = {
  cheio: "h-2 bg-accent",
  tracejado: "h-px [background:repeating-linear-gradient(90deg,var(--foreground)_0_6px,transparent_6px_11px)]",
  janela: "h-2 border-x border-foreground/60 [background:repeating-linear-gradient(-45deg,color-mix(in_srgb,var(--foreground)_55%,transparent)_0_1px,transparent_1px_7px)]",
} as const;

/** Os números sob a trena: o primeiro começa no traço, o último termina nele, os do meio centram nele. */
function alinhamentoDaEscala(i: number, ultimo: number) {
  if (i === 0) return "";
  if (i === ultimo) return "-translate-x-full";
  return "-translate-x-1/2";
}

/**
 * O trabalho: a régua do prazo, em escala — um traço por dia útil,
 * contado do briefing completo, e os três trechos do caminho sobre ela. O
 * rascunho é um traço de bronze no começo; a maior parte da trena é
 * revisão e aprovação, e a publicação cai numa janela, em geral. Os
 * números de cada etapa ficam na seção abaixo, não aqui. No celular, o
 * rascunho mede ~22 px e o nome dele colidia com o do trecho seguinte: os
 * nomes saem de cima da régua e vão para a legenda, embaixo.
 * O momento da página (desde 14/10): os traços de dia descem da linha da
 * trena um a um, da esquerda para a direita (.mov-risca, app/movimento.css),
 * e, no mesmo passo, uma janela corre sobre os trechos e os escreve, do
 * rascunho à publicação (.mov-trena): o prazo se mede na chegada. Os números
 * ficam parados. Na primeira versão de 14/10, só os traços de 10 px desciam,
 * e o momento quase não se via na mesa (o crítico de fora). Desde 15/10, é
 * a única figura do site com o traço que anda da esquerda para a direita
 * (o corrimão de Planos e a soma do Orçamento ficaram parados): aqui a
 * direção é o próprio conteúdo, o eixo do tempo. Em 450 ms, no token.
 * Desde 16/10 ("Identidade mais profunda"), a régua da tarde: a partir de
 * 768 px, atrás dos trechos, a quadrícula dos dias úteis (uma coluna por
 * dia, com os fios nos traços da trena, cinco células de altura, em navy a
 * 7%): a grade é a escala da própria trena (a exceção de C9 para a medida),
 * e a única quadrícula do site. A trena, de metal, projeta a sombra curta
 * para o leste: a luz da tarde vem do oeste.
 */
export function ReguaDoTrabalho() {
  const { descricao, dias, trechos, escala, unidade } = figuras.regua;
  const pos = (dia: number) => `${(dia / dias) * 100}%`;
  const ultimo = escala.length - 1;
  return (
    <figure aria-label={descricao} className="relative pb-2">
      {/* A quadrícula dos dias, na faixa dos trechos, até a linha da trena. */}
      <div aria-hidden="true" className="vd-quadricula absolute inset-x-0 top-0 hidden h-18 md:block" />
      {/* A janela que corre sobre os trechos, no passo dos traços de dia (a técnica da onda e da tarja). */}
      <div className="mov-trena vd-trena-sombra overflow-hidden">
        <ol className="mov-trena-conteudo relative h-6 md:h-18">
          {trechos.map((t, i) => (
            <li key={t.rotulo} className="absolute inset-y-0" style={{ left: pos(t.de), width: pos(t.ate - t.de) }}>
              {/* O primeiro rótulo começa na borda; os outros centram no próprio trecho. */}
              <span
                className={`absolute top-0 hidden text-nota whitespace-nowrap md:block ${i === 0 ? "left-0 font-semibold text-accent" : "-translate-x-1/2 text-foreground"}`}
                style={i === 0 ? undefined : { left: "50%" }}
              >
                {t.rotulo}
              </span>
              <span aria-hidden="true" className={`absolute inset-x-0 bottom-2 ${TRACO[t.tipo]}`} />
            </li>
          ))}
        </ol>
      </div>
      {/* A trena: um traço por dia útil, maior a cada cinco. */}
      <div aria-hidden="true" className="vd-trena-sombra relative h-5 border-t border-foreground">
        {Array.from({ length: dias + 1 }, (_, d) => (
          <span
            key={d}
            className={`mov-risca absolute top-0 w-px -translate-x-1/2 bg-foreground ${d % 5 === 0 ? "h-5" : "h-2.5 opacity-55"}`}
            style={{ left: pos(d), "--d": d } as React.CSSProperties}
          />
        ))}
      </div>
      <p className="relative mt-2 h-5 text-rotulo text-muted-foreground tabular-nums">
        {escala.map((d, i) => (
          <span
            key={d}
            className={`absolute top-0 whitespace-nowrap ${alinhamentoDaEscala(i, ultimo)}`}
            style={{ left: pos(d) }}
          >
            {i === ultimo ? `${d} ${unidade}` : d}{" "}
          </span>
        ))}
      </p>
      {/* No celular, a legenda: o traço de cada trecho e o nome dele. */}
      <ul aria-hidden="true" className="mt-6 grid gap-3 md:hidden">
        {trechos.map((t, i) => (
          <li key={t.rotulo} className="flex items-center gap-3 text-nota">
            <span className="relative block w-8 flex-none">
              <span className={`block ${TRACO[t.tipo]}`} />
            </span>
            <span className={i === 0 ? "font-semibold text-accent" : "text-foreground"}>{t.rotulo}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/**
 * O Atlas: o globo da marca, grande, que gira devagar (desde 03/10, a
 * pedido: ambiente contínuo, pausa fora da tela e pelo botão do cabeçalho,
 * parado com movimento reduzido), e as coordenadas de Niterói, onde tudo
 * acontece. Desde 16/10 ("Identidade mais profunda"), a folha da marca:
 * o globo gravado (components/marca/globo.tsx), sob a luz do fim da tarde,
 * e a legenda acima dele (no HTML, depois, como antes). A partir de 768 px,
 * o globo desce e atravessa a emenda: 22% dele (97 px, o globo tem 440)
 * pousam no papel da história, com a sombra de contato deslocada para o
 * leste, longe da luz, e, sob ele, a grade de uma projeção cônica (os
 * paralelos em arcos concêntricos e os meridianos que convergem para um
 * ápice acima do globo, fora da tela): o globo vira mapa. A grade é
 * geometria de projeção, dado, e não célula fixa (C9); é a única do papel
 * de O Atlas, e se apaga antes do primeiro capítulo. Abaixo de 768 px, o
 * globo fica dentro da abertura (de 16 a 17/10, o fólio, no pé dela, à
 * direita, ficaria sob ele; desde 17/10, ele fica abaixo do lide).
 */
export function GloboDeNiteroi() {
  const { lugar, latitude, longitude } = figuras.coordenadas;
  return (
    <figure className="mx-auto flex w-full max-w-[440px] flex-col-reverse">
      <div data-ambiente className="relative aspect-square md:-mb-[22%]">
        {/* O papel sob o globo: a grade da projeção e a sombra, a partir da emenda (78% da altura do globo). */}
        <svg
          aria-hidden="true"
          viewBox="0 0 880 300"
          className="vd-projecao pointer-events-none absolute top-[78%] left-1/2 w-[200%] -translate-x-1/2 max-md:hidden"
        >
          {PROJECAO.paralelos.map((r) => (
            <circle key={r} cx="440" cy={PROJECAO.apice} r={r} />
          ))}
          {PROJECAO.meridianos.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
        <span aria-hidden="true" className="vd-pouso-do-globo pointer-events-none absolute max-md:hidden" />
        <Globo girando className="absolute inset-0 h-full w-full" />
      </div>
      <figcaption className="mb-8 text-center">
        <span className="block font-display tracking-titulo text-numero">{lugar}</span>{" "}
        <span className="mt-2 block text-nota text-muted-foreground tabular-nums">
          {latitude} · {longitude}
        </span>
      </figcaption>
    </figure>
  );
}

/** A grade da projeção cônica sob o globo, numa faixa de 880 × 300 (o globo tem 440 de largura, no meio): o ápice
 *  1.100 acima da faixa; os paralelos a cada 48; os meridianos a cada 2,5°. */
const PROJECAO = (() => {
  const apice = -1100;
  const paralelos = [1124, 1172, 1220, 1268, 1316, 1364];
  const meridianos = Array.from({ length: 21 }, (_, i) => {
    const a = ((i - 10) * 2.5 * Math.PI) / 180;
    const ponto = (r: number) => `${(440 + r * Math.sin(a)).toFixed(1)} ${(apice + r * Math.cos(a)).toFixed(1)}`;
    return `M${ponto(1100)}L${ponto(1420)}`;
  });
  return { apice, paralelos, meridianos };
})();

/**
 * A moldura da folha de O Atlas (16/10): a borda graduada de uma prancha de
 * atlas, recuada 24 px da cena (em cima, abaixo do cabeçalho), com a barra
 * de baixo na própria emenda. Faixas de 6 px, em segmentos alternados de um
 * minuto de arco: 40 px o de latitude; o de longitude, 40 · cos 22,88° =
 * 36,85 px, a escala em volta de Niterói. A folha é centrada em Niterói (a
 * fronteira de dois segmentos no meio de cada barra). Os rótulos, em Inter
 * 12 px, ficam em SVG: são desenho, e não texto da página. No celular, só a
 * barra da esquerda e a de baixo, dentro dos 24 px da margem. Desde 17/10, a
 * moldura vai a 32 px da borda onde a margem da página deixa, e o rótulo da
 * latitude só aparece aí (a partir de 1.136 px; app/vidro.css): com 24 px,
 * ele ficava a 4,5 px da borda e da barra. A única moldura graduada do site.
 */
export function MolduraGraduada() {
  return (
    <div aria-hidden="true" className="vd-moldura pointer-events-none absolute inset-0">
      <span className="vd-moldura-barra vd-moldura-esquerda" />
      <span className="vd-moldura-barra vd-moldura-direita max-md:hidden" />
      <span className="vd-moldura-barra vd-moldura-topo max-md:hidden" />
      <span className="vd-moldura-barra vd-moldura-base" />
      <svg className="vd-moldura-rotulo vd-moldura-latitude">
        <text x="50%" y="50%">
          {figuras.coordenadas.latitude}
        </text>
      </svg>
      {/* 4 minutos a oeste do meio no celular; 8 na mesa, longe do globo que pousa. */}
      <svg className="vd-moldura-rotulo vd-moldura-longitude md:hidden" style={{ "--minutos": 4 } as React.CSSProperties}>
        <text x="50%" y="10">
          43°10′ O
        </text>
        <path d="M40 18v12" />
      </svg>
      <svg className="vd-moldura-rotulo vd-moldura-longitude max-md:hidden" style={{ "--minutos": 8 } as React.CSSProperties}>
        <text x="50%" y="10">
          43°14′ O
        </text>
        <path d="M40 18v12" />
      </svg>
    </div>
  );
}

/**
 * Dúvidas: as perguntas pelo momento em que costumam aparecer — antes de
 * contratar, na contratação, durante o trabalho, com o site no ar —, em
 * palavras-chave que levam à resposta (e a abrem: ilha Ancoras). Não
 * repete a lista, que vem logo abaixo: é outra entrada para ela. Sem
 * números desde 16/10: os momentos levavam 01 a 04 e as palavras, o
 * número da pergunta em sobrescrito, que a lista repetia logo abaixo (a
 * numeração em série, a marca L5; o crítico de fora). A ordem dos momentos
 * é a do tempo, e os nomes a dizem. No toque, a palavra acende em 120 ms.
 * Desde 16/10 ("Identidade mais profunda"), a rosa das perguntas: os quatro
 * momentos em quatro quadrantes (2 × 2, na mesa e no celular), na ordem de
 * leitura, e não na do relógio (antes de contratar a noroeste, na
 * contratação a nordeste, durante o trabalho a sudoeste, com o site no ar a
 * sudeste), voltados para o cruzamento, onde fica a rosa: geométrica, de
 * oito pontas (as cardeais com o raio inteiro, as colaterais com 0,6), cada
 * ponta meio acesa (o lado da luz, a oeste) e meio escura, sem letras, sem
 * flor-de-lis, sem graduação. A agulha aponta o quadrante: parte do
 * primeiro, e a palavra sob a mão, no foco ou no toque a leva ao seu em
 * 200 ms, só girando (app/vidro.css, .vd-rosa; instantânea com movimento
 * reduzido). Até 16/10, um momento por coluna, em quatro colunas sob um
 * filete. As linhas ficam iguais (auto-rows-fr): a rosa, no meio da lista,
 * cai no cruzamento. Abaixo de 360 px, o vão do meio, a rosa e as
 * palavras ficam menores (a 320 px, "Fim do contrato" quebrava em duas linhas).
 */
export function MapaDasDuvidas() {
  return (
    // @container (17/10, fechamento com o Impeccable): com a letra a 200% no celular (a coluna com menos de 14 rem), os
    // quadrantes viram uma lista só, na ordem de leitura, sem a rosa. Em duas colunas, com os vãos em rem, sobravam
    // ~90 px por coluna, e "Mensalidade" e "Privacidade" passavam da tela. Com a letra normal, a coluna tem 17 rem ou mais.
    <nav aria-label="As perguntas, pelo momento em que aparecem" className="vd-rosa @container">
      <ol className="relative mx-auto grid max-w-3xl auto-rows-fr grid-cols-2 gap-x-20 gap-y-20 [overflow-wrap:anywhere] max-[359px]:gap-x-12 md:gap-x-36 md:gap-y-28 @max-[14rem]:grid-cols-1 @max-[14rem]:gap-y-10">
        {figuras.momentos.map((m, i) => (
          <li key={m.momento} data-quadrante={QUADRANTES[i]} className={i % 2 === 0 ? "text-right @max-[14rem]:text-left" : "text-left"}>
            <p className="text-rotulo font-semibold text-accent">{m.momento}</p>
            <ul className="mt-3">
              {m.itens.map((item) => (
                <li key={item.duvida}>
                  <a
                    href={`#duvida-${item.duvida}`}
                    aria-label={`${item.rotulo}: ${duvidas[item.duvida - 1].pergunta}`}
                    className="inline-flex min-h-11 items-baseline py-1.5 text-corpo font-semibold no-underline max-[359px]:text-nota sm:text-destaque transition-colors duration-300 hover:text-accent active:text-accent active:duration-120"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
        {/* A rosa, no cruzamento, com os eixos que se apagam para fora. Desenho, sem texto. */}
        <li aria-hidden="true" className="vd-rosa-cruz pointer-events-none absolute inset-0 @max-[14rem]:hidden">
          <svg viewBox="-50 -50 100 100" className="vd-rosa-desenho absolute top-1/2 left-1/2 size-16 -translate-1/2 max-[359px]:size-10 md:size-24">
            {ROSA.map((p) => (
              <path key={p.d} d={p.d} className={p.acesa ? "acesa" : "escura"} />
            ))}
            <path d="M0 7V-44" className="vd-rosa-agulha" />
            <circle r="2.5" className="vd-rosa-pino" />
          </svg>
        </li>
      </ol>
    </nav>
  );
}

/** Os quadrantes, na ordem dos momentos (a de leitura). */
const QUADRANTES = ["no", "ne", "so", "se"] as const;

/**
 * As oito pontas da rosa, num quadrado de -50 a 50: as colaterais (0,6 do raio) atrás, as cardeais por cima. Cada
 * ponta são duas metades; acesa a que olha para a luz (do oeste, um pouco do norte: a hora azul de Dúvidas).
 */
const ROSA = (() => {
  const luz = [-1, -0.5];
  const pontas = [45, 135, 225, 315, 0, 90, 180, 270].map((graus) => {
    const cardeal = graus % 90 === 0;
    const [raio, base] = cardeal ? [48, 8] : [29, 6];
    const a = (graus * Math.PI) / 180;
    const d = [Math.sin(a), -Math.cos(a)];
    const lado = [d[1], -d[0]];
    const ponto = (x: number, y: number) => `${x.toFixed(2)} ${y.toFixed(2)}`;
    return [1, -1].map((s) => ({
      d: `M0 0L${ponto(raio * d[0], raio * d[1])}L${ponto(s * base * lado[0], s * base * lado[1])}Z`,
      acesa: s * (lado[0] * luz[0] + lado[1] * luz[1]) > 0,
    }));
  });
  return pontas.flat();
})();

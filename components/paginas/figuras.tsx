import { Orbe } from "@/components/estrutura";
import { Globo } from "@/components/marca/globo";
import { duvidas } from "@/conteudo/duvidas";
import { planos } from "@/conteudo/planos";
import { figuras } from "@/conteudo/site";
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
 */
export function ParedeDeBairros() {
  const { exemplos, rotulo, nota } = figuras.bairros;
  return (
    <figure>
      <ul aria-label={rotulo} className="font-display tracking-titulo text-numero">
        {exemplos.map((exemplo) => (
          <li key={exemplo.bairro} className="border-t border-border first:border-t-0">
            {/* Vínculo comum, não <Link>: o site de exemplo é outro site, e a pré-busca do Next traria as fontes dele para esta página. */}
            <a
              href={exemplo.caminho}
              className="flex min-h-11 flex-col py-4 text-foreground no-underline transition-colors duration-300 hover:text-accent active:text-accent active:duration-120"
            >
              <span className="text-rotulo font-semibold tracking-wider text-accent uppercase">{exemplo.nicho}</span>
              <span className="mt-1.5">{exemplo.bairro}</span>
            </a>
          </li>
        ))}
      </ul>
      <figcaption className="mt-6 text-nota text-muted-foreground">{nota}</figcaption>
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
 */
export function EscadaDePrecos() {
  const alturas = ["h-[46%]", "h-[70%]", "h-full"];
  return (
    <figure aria-label="Os três planos, do Essencial ao Completo" className="relative h-[clamp(300px,34vw,440px)]">
      {/* O chão da escada: os degraus sobem de baixo dele. */}
      <div className="absolute inset-0 grid grid-cols-3 items-end gap-3 overflow-hidden md:gap-4">
        {planos.map((plano, i) => (
          // Um vínculo para o plano, logo abaixo, com o que ele inclui: o degrau acende como peça e leva a ela.
          // O contorno do foco vai para dentro: o chão da figura recortaria o que passa da borda.
          // O piso de bronze é sombra interna (16/10, Impeccable, C11): a borda de 2 px no canto arredondado afinava em crescente.
          <a
            key={plano.id}
            href={`#plano-${plano.id}`}
            style={{ "--i": i } as React.CSSProperties}
            className={`mov-degrau group vd-luz flex focus-visible:-outline-offset-4 flex-col justify-between rounded-t-xl shadow-[inset_0_2px_0_var(--accent)] bg-gradient-to-b from-foreground/[0.09] to-transparent p-3 text-foreground no-underline after:hidden sm:p-4 md:p-5 ${alturas[i]}`}
          >
            <Orbe />
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-foreground/[0.07] to-transparent opacity-0 transition-opacity duration-500 ease-atlas group-hover:opacity-100" />
            <p className="text-rotulo font-semibold text-accent">{plano.nome}</p>
            <p>
              <span className="block text-rotulo font-semibold text-muted-foreground">R$</span>
              <span className="mt-1 block font-display tracking-titulo text-numero tabular-nums">
                {plano.criacao.toLocaleString("pt-BR")}
              </span>
              <span className="mt-2 block text-rotulo text-muted-foreground tabular-nums">
                + {reais(plano.mensal)} <span className="block sm:inline">por mês</span>
              </span>
            </p>
          </a>
        ))}
      </div>
      {/* O corrimão: o traço de bronze que sobe de degrau em degrau, parado (desde 15/10). A caixa passa 2 px da figura,
          como a janela que o revelava até então; o traço, 2 px para dentro dela, fica onde sempre esteve. */}
      <span aria-hidden="true" className="pointer-events-none absolute -inset-0.5 overflow-hidden">
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
 */
export function ReguaDoTrabalho() {
  const { descricao, dias, trechos, escala, unidade } = figuras.regua;
  const pos = (dia: number) => `${(dia / dias) * 100}%`;
  const ultimo = escala.length - 1;
  return (
    <figure aria-label={descricao} className="pb-2">
      {/* A janela que corre sobre os trechos, no passo dos traços de dia (a técnica da onda e da tarja). */}
      <div className="mov-trena overflow-hidden">
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
      <div aria-hidden="true" className="relative h-5 border-t border-foreground">
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
            {i === ultimo ? `${d} ${unidade}` : d}
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
 * acontece.
 */
export function GloboDeNiteroi() {
  const { lugar, latitude, longitude } = figuras.coordenadas;
  return (
    <figure className="mx-auto w-full max-w-[440px]">
      <div data-ambiente className="relative aspect-square">
        <Globo girando className="absolute inset-0 h-full w-full" />
      </div>
      <figcaption className="mt-6 text-center">
        <span className="block font-display tracking-titulo text-numero">{lugar}</span>
        <span className="mt-2 block text-nota text-muted-foreground tabular-nums">
          {latitude} · {longitude}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Dúvidas: as perguntas pelo momento em que costumam aparecer — antes de
 * contratar, na contratação, durante o trabalho, com o site no ar —, em
 * palavras-chave que levam à resposta (e a abrem: ilha Ancoras). Não
 * repete a lista, que vem logo abaixo: é outra entrada para ela. Desde
 * 02/10, um momento por coluna (quatro a partir de 1024 px, duas abaixo),
 * com as palavras uma embaixo da outra: antes, duas ou três por linha,
 * quebravam sem padrão. Abaixo de 640 px, as palavras no degrau do corpo e
 * as colunas mais juntas: a 320 px, "Mensalidade 02" passava da coluna.
 * Sem números desde 16/10: os momentos levavam 01 a 04 e as palavras, o
 * número da pergunta em sobrescrito, que a lista repetia logo abaixo (a
 * numeração em série, a marca L5; o crítico de fora). A ordem dos momentos
 * é a do tempo, e os nomes a dizem. No toque, a palavra acende em 120 ms.
 */
export function MapaDasDuvidas() {
  return (
    <nav aria-label="As perguntas, pelo momento em que aparecem">
      <ol className="grid grid-cols-2 gap-x-4 gap-y-10 border-t border-border pt-8 sm:gap-x-10 lg:grid-cols-4">
        {figuras.momentos.map((m) => (
          <li key={m.momento}>
            <p className="text-rotulo font-semibold text-accent">{m.momento}</p>
            <ul className="mt-3">
              {m.itens.map((item) => (
                <li key={item.duvida}>
                  <a
                    href={`#duvida-${item.duvida}`}
                    aria-label={`${item.rotulo}: ${duvidas[item.duvida - 1].pergunta}`}
                    className="inline-flex min-h-11 items-baseline py-1.5 text-corpo font-semibold no-underline sm:text-destaque transition-colors duration-300 hover:text-accent active:text-accent active:duration-120"
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
  );
}

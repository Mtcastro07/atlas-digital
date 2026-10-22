import Link from "next/link";

import { Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { PeDaPorta } from "@/components/ilhas/pe-da-porta";
import { Lide, Titulo } from "@/components/tipografia";
import { paginasInternas, portas } from "@/conteudo/site";

/**
 * O índice do início: as seis páginas como portas. Cada porta mostra o
 * essencial do outro lado em número grande (3 públicos, 3 planos,
 * 2 toques, 4 etapas, UFF, 10 perguntas — a palavra em negrito desde
 * 03/10, a pedido), o nome da página e o resumo. O dado em Archivo Black,
 * no degrau dos números (24 a 36 px), e a palavra no do lide, em negrito
 * (até 03/10, o dado de 40 a 60 px e a palavra a 0,4 dele).
 * A resposta é a do item de índice (09-movimento.md, seção 13.1): no
 * hover e no foco, o dado acende em bronze, a seta corre e o fundo se tinge
 * (.vd-bloco:hover, desde a crítica de 14/10: com o ponteiro no meio do
 * cartão, só o algarismo mudava); no toque, o dado acende em 120 ms e o
 * fundo se tinge (.vd-bloco:active). O cabeçalho vai na margem (14/10): a
 * cena de cima, a fundação, é centrada. Até 14/10, cada
 * porta tinha também a aresta que acendia, o orbe de bronze sob o cursor e
 * a subida de 3 px com sombra, a mesma resposta dos blocos de Para quem e
 * dos planos (a marca M1; pedido do usuário, 14/10: "parecendo que você
 * está spamando os mesmos componentes"); o orbe ficou na fundação e na
 * escada de preços. No celular, as portas viram uma galeria de deslizar
 * (vidro.css, .vd-galeria), com o trilho do avanço. Até 16/10, cada porta
 * levava também o número da página (01 a 06), como o menu do celular e o
 * pé de cada página: a numeração em série, em páginas que não são
 * sequência (as marcas L5 e T2; o crítico de fora).
 * Desde 16/10 ("Identidade mais profunda"), na mesa, a folha de
 * articulação de um atlas: uma folha só (a ficha, raio de 4 px, uma sombra
 * só, do lado da hora), dividida em seis casas por fios de 1 px, sem cartão,
 * raio ou sombra por casa (até então, seis cartões iguais: a marca C12). Os
 * fios são o fundo da folha que aparece no vão de 1 px entre as casas. No
 * celular, cada porta é uma ficha da galeria (raio de 4 px, sombra curta).
 * Desde 17/10 (passe 4b, pelo pedido de 16/10), a folha dobrada: as seis
 * casas são os painéis de uma folha só, dobrada em sanfona (as dobras
 * verticais, ora crista, ora vale) e ao meio (a dobra de través, um vale),
 * como a carta que se guarda no bolso da capa do atlas. Cada painel recebia a
 * luz da madrugada (até a direção final, abaixo, que a troca pela do
 * crepúsculo) pelo lado em que se inclina: os que olham para o oeste,
 * acesos; os que olham para o leste, na sombra; a crista com o fio de luz, o
 * vale com o fio escuro (app/vidro.css, .vd-painel). Saem os fios de 1 px
 * entre as casas (o fundo da folha no vão). No celular, a mesma folha, aberta
 * em tira: os painéis encostados, sem vão, e a galeria folheia a sanfona.
 * Desde 17/10 (fechamento com o Impeccable), o dado no degrau da palavra
 * (text-destaque, em negrito), e não mais em Archivo Black no dos números:
 * as seis portas somavam cinco dos 13 numerais de 28 px ou mais do início
 * (o número com legenda em série, a marca L2). O número em escala ficou só
 * onde ele é o conteúdo (as durações das etapas, os totais do montador). A
 * resposta é a mesma: o dado acende em bronze.
 * Desde 17/10 (a direção final do Atlas Digital, seção 3, item 7):
 * - o dado fica no degrau da palavra, em negrito (o fechamento acima). Na
 *   construção, ele voltou por algumas horas ao Archivo Black, no degrau dos
 *   números, e a revisão o tirou: seis números grandes em fileira, um deles
 *   "UFF", traziam de volta a marca L2 (um número por figura, seção 6);
 * - o cabeçalho numa faixa só, na mesa: o título à esquerda e o lide à
 *   direita, na linha de base da última linha do título (até então, o lide
 *   na metade da direita, uma linha abaixo, solto e longe do título: o
 *   fechamento com o Impeccable, A, P3);
 * - a folha com o raio da ficha (--r-ficha, 12 px), e não 32 px: é papel
 *   sobre papel, não tela;
 * - a luz das dobras é a do crepúsculo da página (o Sol se pondo a oeste), e
 *   a folha está quase aberta: os painéis que olham para o leste com uma
 *   sombra leve, e as dobras ditas pelos vincos (o fio de luz na crista, o
 *   fio escuro no vale). Até então, a coluna do meio inteira num cinza de 6 a
 *   13%, com o vale a 26%, que se lia como mancha, e não como dobra (o
 *   fechamento com o Impeccable, A, P3);
 * - no pé de cada casa, o caminho desta visita (ilhas/pe-da-porta.tsx):
 *   traço se a página já foi aberta, ponto se não, na gramática das cartas do
 *   site (o traço é o que já passou; o ponto, o que falta), com a legenda
 *   embaixo da folha. Só na memória da navegação: nada se grava no aparelho,
 *   e o caminho some ao recarregar. É a única leitura da visita no site (a
 *   régua do percurso da próxima página saiu).
 * Desde 18/10 (o passe do celular, seção 4 da direção), abaixo de 768 px, o
 * trilho do avanço da galeria sai daqui: o polegar de bronze sobre o fio
 * cinza se lia como o "Traço" da legenda (as páginas abertas), e um sinal
 * não pode ter dois sentidos. No lugar, a rota da visita: os seis pés em
 * fileira, na ordem das portas, com a janela que corre sobre ela junto com a
 * galeria (onde está quem lê). A galeria mostra uma porta por vez; a rota, o
 * caminho inteiro. A legenda passa a chave de carta, uma linha por sinal.
 * Na revisão de 18/10, a rota virou uma linha só, com os marcos das portas, e a
 * janela, uma caixa contornada sobre o grupo atual, virou o índice "Aqui", um
 * triângulo que a legenda explica: a caixa sobre seis grupos se lia como a
 * paginação de carrossel de fábrica (a marca L8) e parecia tocável.
 */
export function Portas() {
  return (
    <Secao aria-labelledby="portas" tom="claro">
      <Envelope>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-baseline-last lg:justify-between lg:gap-14">
          <Titulo linhas={portas.titulo} />
          <Lide className="lg:max-w-[24ch]">{portas.lide}</Lide>
          <span id="portas" className="sr-only">
            {portas.rotulo}
          </span>
        </div>
        <div className="vd-galeria-quadro vd-dobrada mt-16 md:mt-20" style={{ "--galeria-polegar": 1 / paginasInternas.length } as React.CSSProperties}>
          <ul className="vd-galeria md:grid md:grid-cols-2 md:overflow-hidden md:rounded-[var(--r-ficha)] md:shadow-[var(--sombra-media)] lg:grid-cols-3">
            {paginasInternas.map((pagina) => (
              <li key={pagina.id}>
                {/* Três camadas em todas as portas, na mesma posição: o nome da página, com a seta;
                    o dado em número e palavra; o resumo. O nome aparece uma vez (antes, no alto e no pé), e o dado
                    fica à mesma distância do topo em todas: os números de uma fileira se alinham. */}
                {/* @max-[16rem]: só com a letra a 200% a coluna da galeria fica tão estreita em rem (com a letra normal, 17 rem ou
                    mais): o recuo cai à metade, e as palavras quebram em vez de passar do painel (17/10, segundo fechamento).
                    Desde 18/10, 16 px, e não 1 rem, que dobrava com a letra: a 320 px, "Para quem" descia uma letra por linha. */}
                <Link
                  href={pagina.caminho}
                  className="group vd-bloco vd-painel relative flex h-full flex-col overflow-hidden p-8 no-underline shadow-[var(--sombra-curta)] [overflow-wrap:anywhere] focus-visible:outline-offset-[-6px] @max-[16rem]:p-[16px] md:p-10 md:shadow-none"
                >
                  <span className="relative flex items-center justify-between gap-4 text-nota font-semibold">
                    {pagina.menu}
                    <IconeSeta className="size-3.5 flex-none text-accent transition-transform duration-500 ease-atlas group-hover:translate-x-1.5" />
                  </span>{" "}
                  <span className="relative mt-12 block">
                    <span className="flex flex-wrap items-baseline gap-x-[0.3em] tabular-nums">
                      <span className="text-destaque font-bold whitespace-nowrap transition-colors @max-[16rem]:whitespace-normal duration-300 ease-atlas group-hover:text-accent group-focus-visible:text-accent group-active:text-accent group-active:duration-120">
                        {pagina.porta.dado}
                      </span>{" "}
                      {pagina.porta.unidade && <span className="text-destaque font-bold whitespace-nowrap text-muted-foreground @max-[16rem]:whitespace-normal">{pagina.porta.unidade}</span>}
                    </span>{" "}
                    <span className="mt-5 block max-w-[32ch] text-corpo text-muted-foreground">{pagina.porta.resumo}</span>
                  </span>
                  <PeDaPorta caminho={pagina.caminho} vista={portas.visita.vista} />
                </Link>
              </li>
            ))}
          </ul>
          {/* No celular (18/10, o passe do celular), no lugar do trilho de bronze da galeria, que se lia como o "Traço" da
              legenda logo abaixo (um sinal com dois sentidos): a rota da visita, os seis pés numa linha, na ordem das
              portas, com os marcos entre eles e o índice "Aqui", que corre sobre ela com a galeria (app/digital.css,
              .vd-rota-da-visita). O caminho inteiro se lê de uma vez, e não uma porta por vez. */}
          <div aria-hidden="true" className="vd-rota-da-visita">
            {paginasInternas.map((pagina) => (
              <PeDaPorta key={pagina.id} caminho={pagina.caminho} />
            ))}
          </div>
        </div>
        {/* Os trechos (18/10): na mesa, seguidos numa linha; abaixo de 1024 px, a chave da legenda de carta, uma linha por sinal. */}
        <p className="vd-legenda-de-carta vd-legenda-da-visita mt-6 md:mt-8 lg:max-w-none">
          <span>
            {/* A chave e o termo juntos, sem quebra entre eles: a 390 px, os pontos ficavam no fim de uma linha e "Ponto:" na outra. */}
            <span className="whitespace-nowrap">
              <span aria-hidden="true" className="vd-pe-da-porta vd-pe-chave" data-vista="" /> <strong>Traço:</strong>
            </span>{" "}
            {portas.visita.traco}
          </span>{" "}
          <span>
            <span className="whitespace-nowrap">
              <span aria-hidden="true" className="vd-pe-da-porta vd-pe-chave" /> <strong>Ponto:</strong>
            </span>{" "}
            {portas.visita.ponto}
          </span>{" "}
          {/* A chave do índice da rota (18/10, a revisão do celular): só abaixo de 768 px, onde a rota existe, e só com a
              linha do tempo de rolagem, que move o índice. Fora do leitor de tela, como a rota que ela explica. */}
          <span aria-hidden="true" className="vd-legenda-aqui">
            <span className="whitespace-nowrap">
              <span className="vd-pe-aqui" /> <strong>Aqui:</strong>
            </span>{" "}
            {portas.visita.aqui}
          </span>{" "}
          <span>{portas.visita.memoria}</span>
        </p>
      </Envelope>
    </Secao>
  );
}

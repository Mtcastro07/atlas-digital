import { Abertura, Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { EscadaDemo } from "@/components/ilhas/escada-demo";
import { Simulador } from "@/components/ilhas/simulador";
import { buttonVariants } from "@/components/ui/button";
import { BarsSpinner } from "@/components/ui/spell/bars-spinner";
import { Apoio } from "@/components/tipografia";
import { TiltCard } from "@/components/ui/spell/tilt-card";
import { criacaoNaFundacao, planos } from "@/conteudo/planos";
import { escada, planosSecao, simulador } from "@/conteudo/site";
import { reais } from "@/lib/moeda";

/**
 * "A distância não está na lista. Está na tela.": um site completo em cada
 * nicho, agrupados por plano, no palco da escada (desde 08/10, até quatro
 * por plano; antes, um). O seletor dos três níveis escolhe o plano, e o de
 * nichos, o site dele em cena; a troca é encenada com a camada de
 * movimento de cada nível (ilha EscadaDemo: no Essencial, tudo surge de
 * uma vez; no Profissional, em camadas; no Completo, o nome se compõe
 * palavra a palavra e os blocos assentam). Cada site traz o plano, o nome,
 * o nicho, o resumo e a prévia no computador e no celular
 * (public/simulador/<nicho>-*.webp); "Abrir no simulador" e a própria
 * prévia abrem o site vivo num diálogo (ilha Simulador, à maneira do
 * Webild). Todos ficam desenhados aqui, no servidor: sem script, aparecem
 * um embaixo do outro, e os vínculos levam ao site em nova aba.
 */
export function Escada() {
  // `abrir` é só do palco; o resto dos rótulos vai ao diálogo.
  const { sites, abrir, abrirSite, abreEmNovaAba, ...textos } = simulador;

  return (
    // pb-12 md:pb-18 (17/10, passe 4): a seção termina em duas legendas (a nota do nível e o aviso), e depois delas vai
    // meio respiro, e não o inteiro (sobravam 214 px de água abaixo do palco, na mesa).
    <Secao id="escada" tom="escuro" className="pb-12 md:pb-18">
      <Envelope>
        {/* No celular e no tablet, o título e o lide à esquerda, como o texto do palco (18/10, o passe do celular: o lide
            de quatro linhas centrado era o parágrafo centrado do primeiro fechamento). Na mesa, centrados. */}
        <Abertura titulo={escada.titulo} lide={escada.lide} className="max-lg:text-left max-lg:[&>p]:mx-0" />
        <Simulador dados={{ textos, sites }}>
          <EscadaDemo niveis={escada.niveis} sites={sites.map(({ id, plano, rotulo }) => ({ id, plano, rotulo }))} rotuloDosNichos={escada.nichos}>
            {sites.map((site, i) => {
              const plano = planos.find((p) => p.id === site.plano)!;
              const palavras = site.nome.split(" ");
              return (
                <div key={site.id} className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
                  {/* min-w-0 e overflow-wrap (17/10, segundo fechamento): com a letra a 200% a 390 px, "WhatsApp à mão" e o
                      "Abrir no site" passavam da largura do palco, que os cortava. Com a letra normal, nada quebra a palavra. */}
                  <div className="min-w-0 [overflow-wrap:anywhere]">
                    <p data-parte="texto" className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-rotulo font-semibold">{plano.nome}</span>{" "}
                      {/* O "Recomendado" ao lado do nome, como na tabela (17/10; até então, um selo no canto da prévia). */}
                      {plano.destaque && (
                        <>
                          <span className="vd-cartela">{planosSecao.seloDestaque}</span>{" "}
                        </>
                      )}
                      {/* O preço na condição de fundação (17/10): o valor cheio riscado (o fio de .vd-riscado, o mesmo da
                          escada e da tabela) e a metade, cada um com o rótulo para o leitor de tela. O me-1.5 (19/10, a
                          revisão): o fio passa 2 px de cada lado do valor, e só com o espaço ele quase encostava na metade
                          ("R$ 900—R$ 450"). */}
                      <span className="text-nota text-muted-foreground tabular-nums">
                        <s className="vd-riscado me-1.5">
                          <span className="sr-only">{planosSecao.fundacao.cheio}: </span>
                          {reais(plano.criacao)}
                        </s>{" "}
                        <span className="font-semibold text-foreground">
                          <span className="sr-only">{planosSecao.fundacao.metade}: </span>
                          {reais(criacaoNaFundacao(plano))}
                        </span>{" "}
                        {textos.criacao} {planosSecao.fundacao.condicao}
                      </span>
                    </p>
                    {/* Título de bloco: o nome do site em cena, em Archivo Black (de 03 a 05/10, na família do texto), no
                        degrau dos números. De 03 a 17/10, no dos títulos, o mesmo do h2 da seção (68 px na mesa): a
                        hierarquia achatada (a marca T6; fechamento com o Impeccable, 17/10). */}
                    <h3 data-parte="titulo" className="mt-3 font-display tracking-titulo text-numero font-normal">
                      {/* Cada palavra numa janela própria: no nível Completo, sobe de dentro dela. A folga de 0,08 em
                          embaixo guarda as descendentes. */}
                      {palavras.map((palavra, j) => (
                        <span key={j}>
                          <span className="inline-block overflow-hidden pb-[0.08em] align-top">
                            <span data-palavra className="inline-block">
                              {palavra}
                            </span>
                          </span>
                          {j < palavras.length - 1 && " "}
                        </span>
                      ))}
                    </h3>
                    <p data-parte="texto" className="mt-2 text-corpo text-muted-foreground">
                      {site.nicho}
                    </p>
                    <p data-parte="texto" className="mt-5 max-w-[46ch] text-corpo text-muted-foreground">
                      {site.resumo}
                    </p>
                    <div data-parte="texto" className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <a href={site.caminho} target="_blank" rel="noopener" data-simulador={i} className={buttonVariants({ size: "lg" })}>
                        {/* Na mesa, o simulador; fora dela, o próprio site, numa aba nova (17/10, ilhas/simulador.tsx). */}
                        <span className="vd-espera-rotulo">
                          <span className="so-na-mesa">{abrir}</span>{" "}
                          <span className="fora-da-mesa">
                            {abrirSite}
                            <span className="sr-only"> {abreEmNovaAba}</span>
                          </span>
                        </span>
                        {/* Enquanto o simulador baixa (aria-busy, ilhas/simulador.tsx): as barras no lugar do rótulo. */}
                        <span aria-hidden="true" className="vd-espera">
                          <BarsSpinner tamanho={18} />
                        </span>
                      </a>{" "}
                      {/* Fora da mesa, a ação principal já abre o site numa aba nova: o segundo vínculo sai. */}
                      <a href={site.caminho} target="_blank" rel="noopener" className={buttonVariants({ variant: "link", size: "link", className: "so-na-mesa" })}>
                        {textos.novaAba}
                        <IconeSeta className="size-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* A prévia: o site no computador e no celular. Também abre o simulador, com o ponteiro; para o teclado e o
                      leitor de tela, ela repete o "Abrir no simulador" e fica fora da ordem (17/10, o segundo fechamento: o
                      Tab subia 333 px, do texto de volta à prévia, que fica ao lado dele e começa mais acima). */}
                  {/* Fora da mesa, a prévia vem antes do texto (order-first; no HTML, continua depois dele): logo abaixo dos
                      seletores, a troca de nível muda o site à vista (18/10, o passe do celular; até então, a prévia ficava
                      embaixo do resumo e do botão, fora da tela de quem trocava o nível). */}
                  <a
                    href={site.caminho}
                    target="_blank"
                    rel="noopener"
                    data-simulador={i}
                    data-parte="bloco"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="group block max-lg:order-first"
                  >
                    {/* A prévia inclina em 3D sob o ponteiro, com um brilho (Spell UI, Tilt Card; desde 03/10). */}
                    {/* Desde 17/10 (a direção final do Atlas Digital, seção 3, item 14), o site no instrumento (.vd-instrumento:
                        a tela pequena, com o raio --r-instrumento, sem fio): a tela do computador cheia, sem a moldura de
                        navegador com as três bolinhas (L8), e o celular por cima, no canto, inteiro dentro do instrumento e sobre o
                        botão de WhatsApp da tela do computador, que ficava ao lado dele (até a revisão de 17/10, o celular
                        descia 12% além da borda, que o decepava: a figura cortada pela caixa, I8), com o raio da ficha (--r-ficha, a tabela 2.6). As sombras na tinta do tom (--tinta-sombra), e não em preto. */}
                    <TiltCard limite={6} raio="var(--r-instrumento)">
                      <span data-tom={site.tom} className="vd-previa vd-instrumento block aspect-[16/10]">
                        {/* Enquanto o simulador baixa, as barras num disco, no centro da prévia. */}
                        <span aria-hidden="true" className="vd-espera z-20">
                          <span className="grid size-14 place-items-center rounded-full bg-background/85 text-foreground">
                            <BarsSpinner tamanho={22} />
                          </span>
                        </span>
                        {/* A tela do computador, cheia; enquanto a imagem não chega, o lugar dela pulsa devagar (vd-esqueleto),
                            em vez de ficar vazio. O celular flutua por cima com a sombra (saiu em 03/10 pela regra 3 das
                            Diretrizes de Design Premium e voltou no mesmo dia, a pedido do usuário: é parte da identidade do
                            site). */}
                        <img
                          src={`/simulador/${site.id}-computador.webp`}
                          alt=""
                          width={720}
                          height={450}
                          loading="lazy"
                          decoding="async"
                          className="vd-esqueleto absolute inset-0 size-full object-cover object-top transition-transform duration-500 ease-atlas group-hover:scale-[1.015]"
                        />
                        <span className="vd-moldura-de-celular absolute right-[1.5%] bottom-[3%] w-[23%] overflow-hidden rounded-[var(--r-ficha)] border-[3px] shadow-[0_18px_36px_-16px_rgb(var(--tinta-sombra)/0.8)] transition-transform duration-500 ease-atlas group-hover:-translate-y-2">
                          <img
                            src={`/simulador/${site.id}-celular.webp`}
                            alt=""
                            width={293}
                            height={633}
                            loading="lazy"
                            decoding="async"
                            className="vd-esqueleto block w-full rounded-[calc(var(--r-ficha)-3px)]"
                          />
                        </span>
                      </span>
                    </TiltCard>
                  </a>
                </div>
              );
            })}
          </EscadaDemo>
        </Simulador>
        {/* Os sites do palco são de estabelecimentos fictícios: o aviso em texto, fora do diálogo que só abre com script,
            logo abaixo da nota do nível, como uma legenda só do palco: na mesa, centrado (o da vitrine também é); fora
            dela, à esquerda, com o texto do palco (18/10). */}
        <Apoio className="mt-2 text-nota lg:mx-auto lg:text-center">{textos.aviso}</Apoio>
      </Envelope>
    </Secao>
  );
}

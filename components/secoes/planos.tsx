import Link from "next/link";

import { Abertura, Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { Apoio } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { criacaoNaFundacao, modulos, planos, precoDoModulo } from "@/conteudo/planos";
import { acaoOrcamento, planosSecao, simulador } from "@/conteudo/site";
import { reais } from "@/lib/moeda";
import { cn } from "@/lib/utils";

/**
 * Os planos lado a lado. "Escolher" leva ao montador com o plano já marcado
 * (/orcamento#orcamento-<id>; ver Montador). Os módulos seguem num bloco
 * único, em linhas. No alto de cada plano, o site feito nele — a prévia de
 * um dos sites de demonstração —, que abre o site em nova aba: o preço ao
 * lado do que ele compra. Até 14/10, os três cartões subiam com a aresta
 * acesa e o orbe sob o cursor, e as letras dos três "Escolher" rolavam
 * (pedido do usuário, 14/10: "parecendo que você está spamando os mesmos
 * componentes").
 * Desde 17/10 (a direção final do Atlas Digital, seção 3, item 13), a tabela impressa, e não três cartões (L3): a
 * chapa de canto vivo e filete duplo (como a da carga, no início), três colunas separadas por fio, no papel. Em cada
 * coluna, a prévia no instrumento (.vd-instrumento: a tela pequena no papel, com o raio --r-instrumento, sem a moldura
 * de navegador), o nome, o valor cheio riscado e a metade chapada, "na criação, nos três primeiros contratos", a
 * mensalidade, a lista com o traço gravado e "Escolher". O "Recomendado" é a cartela de metal ao lado do nome do
 * recomendado (plano.destaque, hoje o Profissional) e vai também dentro do "Escolher" dele (o pedido do usuário, sobretudo
 * para o celular), na mesma linha do rótulo: o botão fica com a altura dos outros (até 17/10, a cartela em cima do
 * rótulo dava 72 px, e os três botões desalinhavam; o primeiro fechamento com o Impeccable). O "Escolher" diz o plano ao
 * leitor de tela; à vista, a coluna já diz. Até 17/10: os cartões na névoa, o recomendado em navy com a sombra longa, e
 * o preço cortado num formato diferente do da escada (agora .vd-riscado nos dois, app/digital.css).
 * Abaixo de 1024 px, a galeria de deslizar de 16/10 (vidro.css, .vd-galeria-lg), cada plano numa chapa, centrada, e a
 * galeria abre no recomendado. Desde 18/10 (o passe do celular), a ficha mede a coluna menos a fresta dos vizinhos em
 * px (app/digital.css), e o "Recomendado" fica dentro do "Escolher" em toda largura, também com a letra a 200%.
 */
export function Planos() {
  return (
    <Secao id="planos" tom="claro">
      <Envelope>
        {/* O título na margem e o lide na metade da direita (17/10): centrado, o lide de três linhas era o parágrafo
            centrado que o primeiro fechamento com o Impeccable apontou. */}
        <Abertura margem titulo={planosSecao.titulo} lide={planosSecao.lide} />

        <div className="vd-galeria-quadro vd-galeria-lg mt-16 md:mt-20" style={{ "--galeria-polegar": 1 / planos.length } as React.CSSProperties}>
          {/* O trilho em cima da fila (16/10, passe 3): o plano mede mais que a tela do celular, e embaixo o trilho quase
              nunca ficava à vista junto do plano que ele indica (B5). */}
          <div aria-hidden="true" className="vd-galeria-trilho mt-0 mb-4" />
          <div className="vd-galeria vd-tabela-dos-planos lg:grid lg:grid-cols-3 lg:grid-rows-[repeat(7,auto)]">
            {planos.map((plano) => {
              const site = simulador.sites.find((s) => s.plano === plano.id);
              return (
                <article
                  key={plano.id}
                  // O destino de cada degrau da escada de preços, na abertura.
                  id={`plano-${plano.id}`}
                  // No celular, a galeria abre no recomendado, centrado, com os dois vizinhos pela borda (app/vidro.css).
                  data-inicial={plano.destaque || undefined}
                  // @max-[16rem]: a coluna da galeria em rem só fica tão estreita com a letra a 200% (com a letra normal, 17 rem
                  // ou mais): o recuo cai à metade, e o texto cabe (17/10, segundo fechamento). Na mesa, as sete partes da
                  // coluna são linhas da tabela (subgrid): o preço, a mensalidade e o "Escolher" ficam na mesma altura nas
                  // três, mesmo com o nome do recomendado em duas linhas, com a cartela. O relative prende o texto escondido
                  // (sr-only) dentro da galeria: sem ele, o texto dos planos fora da tela alargava a página no celular.
                  className="vd-chapa relative flex flex-col p-6 @max-[16rem]:p-3 md:p-7 lg:row-span-7 lg:grid lg:grid-rows-subgrid lg:px-7 lg:pt-8 lg:pb-9"
                >
                  {site && (
                    <a href={site.caminho} target="_blank" rel="noopener" className="group/previa block no-underline">
                      {/* 360 px na tela comum (a imagem mede até 290 px na coluna), 720 px na densa. */}
                      <span data-tom="escuro" className="vd-instrumento block aspect-[16/10]">
                        <img
                          src={`/simulador/${site.id}-computador-360.webp`}
                          srcSet={`/simulador/${site.id}-computador-360.webp 360w, /simulador/${site.id}-computador.webp 720w`}
                          sizes="(min-width: 1024px) 290px, 86vw"
                          alt=""
                          width={720}
                          height={450}
                          loading="lazy"
                          decoding="async"
                          className="vd-esqueleto absolute inset-0 size-full object-cover object-top transition-transform duration-500 ease-atlas group-hover/previa:scale-[1.02]"
                        />
                      </span>
                      <span className="mt-3 flex min-h-11 items-center justify-between gap-3">
                        <span className="text-nota text-muted-foreground">
                          {planosSecao.siteDoPlano}:{" "}
                          <span className="font-semibold text-foreground transition-colors duration-300 group-hover/previa:text-accent group-active/previa:text-accent group-active/previa:duration-120">
                            {site.nome}
                          </span>
                          <span className="sr-only"> {simulador.abreEmNovaAba}</span>
                        </span>
                        <IconeSeta className="size-3.5 flex-none text-accent transition-transform duration-300 group-hover/previa:translate-x-0.5" />
                      </span>{" "}
                    </a>
                  )}
                  {/* A cartela ao lado do nome: na mesa, do nome a 27,5 px (1.440) e do recuo de 28 px, "Profissional" e a
                      cartela cabem na linha da coluna (até a revisão de 17/10, o nome a 30,6 px e o recuo de 32 px: a cartela
                      caía embaixo, e o nome subia 16 px, centrado na linha da tabela). Onde não cabe (a mesa estreita, a
                      galeria), a cartela vai à linha de baixo, e as linhas ficam no alto (content-start): os três nomes na
                      mesma linha de base. Na galeria, o nome encolhe com a coluna (100cqi, a do quadro, menos o recuo, sobre
                      os 8,7 em de "Profissional"; no tablet, a metade dela): com a letra a 200%, ele partia a palavra ("Profissio/nal"; 18/10, o passe do
                      celular). Com a letra normal e na mesa (sem contêiner, 100cqi é a janela), o corpo não muda. */}
                  <h3 className="mt-6 flex flex-wrap content-start items-center gap-x-2.5 gap-y-2 font-display text-[length:min(clamp(1.5rem,1rem+0.8vw,2rem),calc((100cqi_-_1.5rem)/8.7))] min-[768px]:text-[length:min(clamp(1.5rem,1rem+0.8vw,2rem),calc(((100cqi_-_16px)/2_-_3.5rem)/8.7))] leading-none tracking-titulo [overflow-wrap:anywhere]">
                    {plano.nome}
                    {plano.destaque && (
                      <>
                        {" "}
                        <span className="vd-cartela">{planosSecao.seloDestaque}</span>
                      </>
                    )}
                  </h3>
                  {/* O preço na condição de fundação: o valor cheio riscado e, ao lado, a metade; cada um com o rótulo para o
                      leitor de tela (até 17/10, ele ouvia "Valor cheio: R$ 1.500 R$ 750", sem dizer qual era o segundo). */}
                  <p className="mt-5 flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
                    <s className="vd-riscado font-sub text-corpo font-medium">
                      <span className="sr-only">{planosSecao.fundacao.cheio}: </span>
                      {reais(plano.criacao)}
                    </s>{" "}
                    {/* A metade chapada na anatomia da escada (.vd-preco: "R$" em Inter, à metade do corpo; app/digital.css). */}
                    <span className="vd-preco font-display text-[clamp(1.75rem,1rem+1.6vw,2.5rem)] leading-none tracking-titulo">
                      <span className="sr-only">{planosSecao.fundacao.metade}: </span>
                      <span className="unidade">R$</span> {criacaoNaFundacao(plano).toLocaleString("pt-BR")}
                    </span>
                  </p>
                  <p className="mt-2.5 text-nota text-muted-foreground">na criação, {planosSecao.fundacao.condicao}</p>
                  <p className="mt-3 text-corpo font-semibold tabular-nums">
                    + {reais(plano.mensal)} {simulador.mensal}
                  </p>
                  <ul className="vd-lista-gravada mt-6 flex-1 space-y-2.5 text-nota text-muted-foreground">
                    {plano.itens.map((item) => (
                      <li key={item} className="[overflow-wrap:anywhere]">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`${acaoOrcamento.destino}#orcamento-${plano.id}`}
                    className={buttonVariants({
                      variant: plano.destaque ? "default" : "secondary",
                      // Na mesma linha, a cartela e o rótulo, com a altura dos outros dois (48 px), também a 320 px (o recuo de
                      // 16 px fora da mesa; 18/10, o passe do celular: até então, 24, e a 320 px a cartela caía sobre o rótulo,
                      // numa pílula de 74 px). Com a letra a 200% numa coluna estreita, a pílula cresce e quebra a linha entre
                      // os dois, e a cartela encolhe para caber nela (app/digital.css; até 17/10, ela saía cortada dos dois
                      // lados: o segundo fechamento). O brilho que atravessa a pílula fica só no recomendado.
                      className: cn("mt-8 w-full flex-wrap gap-x-2.5 gap-y-1.5 text-balance max-lg:px-4 lg:w-auto lg:justify-self-start @max-[16rem]:px-2", plano.destaque && "vd-brilho"),
                    })}
                  >
                    {/* O "Recomendado" dentro do "Escolher" (o pedido do usuário, sobretudo no celular), em todas as larguras. De
                        17 a 18/10, a 200% no celular, ficava só a cartela do nome. */}
                    {plano.destaque && (
                      <>
                        <span className="vd-cartela vd-cartela-na-acao">{planosSecao.seloDestaque}</span>{" "}
                      </>
                    )}
                    <span>
                      {planosSecao.acaoPlano}
                      <span className="sr-only"> o plano {plano.nome}</span>
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
        {/* Os nomes dos sites acima são de estabelecimentos fictícios: o aviso em texto, para nenhum leitor (nem uma IA) os tomar por clientes. */}
        <Apoio className="mt-10 text-nota">{simulador.aviso}</Apoio>

        {/* Os módulos em linhas, direto na névoa, sem filetes (16/10): o espaço agrupa. Até 16/10, entre filetes, no
            branco; antes, num bloco creme, mais um cartão na cena (o crítico de fora).
            No celular (19/10, a revisão do passe do celular), uma lista de preços: o nome e a descrição à esquerda, e à
            direita o valor na anatomia da leitura ("R$" e "por página" como unidade, o número chapado) com a recorrência
            embaixo, nas linhas de base do nome e da descrição (app/digital.css, .vd-modulo). Até então, o nome, a
            descrição e "R$ 400, R$ 80 por mês" empilhados em texto corrido. O texto é o mesmo (o do llms.txt, em
            precoDoModulo), e na mesa nada muda. */}
        <div className="mt-16 md:mt-20">
          <h3 className="text-destaque">{planosSecao.tituloModulos}</h3>
          <ul className="vd-modulos mt-6 grid gap-y-6 md:gap-y-5">
            {modulos.map((m) => {
              const preco = precoDoModulo(m);
              return (
                <li key={m.id} className="vd-modulo grid gap-x-8 gap-y-1 md:grid-cols-[13rem_1fr_auto] md:items-baseline">
                  <span className="font-sub font-medium">{m.nome}</span>{" "}
                  {/* No máximo ~60 caracteres por linha (16/10, Impeccable; a 1440 px, a descrição corria a linha inteira). */}
                  <span className="max-w-[60ch] text-nota text-muted-foreground">{m.descricao}</span>{" "}
                  <span className="vd-modulo-preco text-nota tabular-nums md:text-right">
                    {/* max-md:font-normal: o Archivo Black só tem o peso 400 (o 600 da mesa seria o negrito fingido). */}
                    <span className="vd-modulo-valor font-semibold max-md:font-normal">
                      <span className="unidade">R$</span> {m.criacao.toLocaleString("pt-BR")}
                      {m.porPagina && <span className="unidade"> por página</span>}
                    </span>
                    <span className="vd-modulo-mes text-muted-foreground">
                      <span className="vd-modulo-virgula">,</span> {preco.mensal}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Envelope>
    </Secao>
  );
}

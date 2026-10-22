import { Celular } from "@/components/aparelho/celular";
import { Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { CargaDaVisita } from "@/components/ilhas/carga-da-visita";
import { ChapaDaCarga, type Carga } from "@/components/paginas/chapa-da-carga";
import { planos } from "@/conteudo/planos";
import { capa, simulador } from "@/conteudo/site";

/**
 * Só os dois primeiros destaques (os 10 blocos e os 0 cookies): os outros
 * dois, a visita (1) e as rodadas de revisão (2), são as marcas das
 * etapas, na derrota logo abaixo (cada fato uma vez).
 */
const fatos = capa.destaques.slice(0, 2);
const { demonstrativo } = capa;
const site = simulador.sites.find((s) => s.id === demonstrativo.site)!;
const plano = planos.find((p) => p.id === site.plano)!;
const inicioDoNome = site.nome.slice(0, site.nome.lastIndexOf(" "));
const ultimaDoNome = site.nome.slice(site.nome.lastIndexOf(" ") + 1);

/**
 * A reprise da chapa da carga (regravada em 18/10): a carga do início na produção local (localhost:3300, o build de
 * 18/10), gravada em 18.10.2026, às 17h21, sem estrangulamento, a 1.440 × 900. É a mediana de cinco cargas frias (o load
 * em 353, 870, 234, 206 e 301 ms), lidas como medir() as lê: depois de 2,5 s no topo, a rolagem até a chapa, e a leitura
 * quando a chapa viva chega (por isso os dois últimos arquivos, aos 3 s: o desenho e os textos dele, por import()). O
 * servidor a desenha antes da medida, e o carimbo a declara ("Reprise:", capa.carga em conteudo/site.ts); depois do
 * load, a chapa mede esta visita. Fica aqui, no servidor, e não no desenho: o desenho entra por import() no navegador, e
 * a lista iria junto.
 */
const REPRISE: Carga = {
  reprise: true,
  documento: 53,
  carga: 301,
  outros: 0,
  cookies: 0,
  quando: "17h21",
  pagina: "/",
  arquivos: [
    ["documento", 0, 53, 27.2],
    ["fontes", 78, 98, 20.1], ["fontes", 79, 113, 22.4], ["fontes", 79, 113, 8.7],
    ["folhas de estilo", 80, 122, 0.4], ["folhas de estilo", 80, 135, 42.3],
    ["scripts", 80, 136, 2.1], ["scripts", 80, 224, 61.8], ["scripts", 80, 231, 64.3], ["scripts", 80, 173, 0.5],
    ["scripts", 80, 190, 0.7], ["scripts", 80, 190, 0.7], ["scripts", 80, 216, 1], ["scripts", 80, 221, 3.5],
    ["scripts", 80, 227, 9.8], ["scripts", 80, 225, 4.2], ["scripts", 80, 231, 12.3], ["scripts", 80, 233, 6],
    ["scripts", 80, 277, 4.8],
    ["imagens", 141, 277, 2.4], ["imagens", 181, 244, 26.7],
    ["depois da carga", 330, 342, 3.9], ["depois da carga", 331, 341, 31.6], ["depois da carga", 354, 378, 0.3],
    ["depois da carga", 354, 379, 0.3], ["depois da carga", 355, 379, 0.3], ["depois da carga", 355, 379, 0.3],
    ["depois da carga", 443, 447, 0.6], ["depois da carga", 452, 480, 0.4], ["depois da carga", 453, 474, 0.3],
    ["depois da carga", 453, 475, 0.3], ["depois da carga", 454, 477, 2.2], ["depois da carga", 454, 480, 3],
    ["depois da carga", 476, 493, 11.1], ["depois da carga", 476, 504, 10.5], ["depois da carga", 478, 507, 3.3],
    ["depois da carga", 480, 508, 2], ["depois da carga", 481, 507, 3.9], ["depois da carga", 494, 542, 7.7],
    ["depois da carga", 504, 547, 4.3], ["depois da carga", 504, 525, 4.4], ["depois da carga", 505, 525, 8],
    ["depois da carga", 507, 555, 2.6], ["depois da carga", 508, 524, 0.2], ["depois da carga", 526, 557, 0.3],
    ["depois da carga", 543, 556, 0.3], ["depois da carga", 3090, 3145, 2.5], ["depois da carga", 3091, 3145, 3.7],
  ],
};
/** A largura do traço da chapa de 1.120 a 1.440 px, medida (o [data-traco]): a reprise sai do servidor no tamanho real. */
const LARGURA_DA_REPRISE = 508;

/**
 * Logo abaixo da capa, os destaques — o padrão de execução em fatos
 * verificáveis, primeiro na ordem do argumento da ata (IV.1). Até 02/10 ficavam no pé da capa; desde 03/10 têm seção
 * própria, na névoa, para a capa ficar só com o título e as ações (pedido
 * do usuário). Desde 16/10 (o crítico de fora), em frases, no degrau dos
 * títulos, com o algarismo em bronze: até então, a fileira de quatro
 * números grandes com a legenda embaixo (10 · 0 · 1 · 2), o modelo do
 * número com legenda (a marca L2) que o início repetia em cinco cenas, e
 * duas das quatro repetiam as etapas da cena seguinte.
 * Desde 17/10 (fechamento com o Impeccable), o algarismo na letra da frase:
 * o "10" e o "0" em Archivo Black e bronze ainda contavam como número de
 * destaque, e o início tinha 13 numerais de 28 px ou mais em quatro cenas
 * (a marca L2 em série). O número em escala ficou só onde ele é o conteúdo:
 * as durações das etapas e os totais do montador. Saiu também a faixa
 * corrida de nichos, sob as frases (a marca K4: decorativa, sem função na
 * cena, fora da matéria da marca).
 * Desde 16/10 (decisão do aprovador, "Pôr o demonstrativo"), ao lado das
 * frases, a prova: um site de nicho no celular (a odontologia, do
 * Completo), parado. Não é a vitrine de /para-quem (o depósito e a
 * nutrição, cada um num palco, com as notas de 1 a 4): outro nicho, um
 * aparelho só, sem palco nem notas, com a legenda ao lado, como etiqueta.
 * A partir de 1024 px, na metade da direita, com a legenda embaixo; no
 * celular, abaixo das frases, com a legenda ao lado (desce para baixo do
 * aparelho quando não cabe: 320 px, ou a letra a 200%). O aparelho e a
 * legenda são um vínculo só, para o site, em nova aba.
 * Desde 17/10 (passe 4b, pelo pedido de 16/10), a prancha de espécime: a
 * prova à esquerda e os dois fatos à direita, o primeiro à altura do alto do
 * aparelho e o segundo à do pé (até então, as duas frases numa coluna e o
 * aparelho à direita: o molde de cena das aberturas, "o título à esquerda e o
 * objeto à direita", 20-repeticao-dentro-do-site.md, seção 2.2). O tríptico,
 * com a prova ao meio, foi tentado e saiu: a 1.440 px, cada lado ficava com
 * 352 px, e "rastreadores", a 68 px, não cabia. O aparelho
 * pousa no papel, com a sombra de contato do lado oposto à luz, como a
 * esfera. Os dois fatos, em parágrafos (até então, uma lista): o aparelho
 * fica entre eles na ordem do texto.
 * Desde 17/10 (a direção final do Atlas Digital, seção 3, item 3), a chapa da carga desta visita, logo abaixo do "0
 * cookies", como no esboço: a prova medida (um traço por arquivo, os dois instantes e o "0" de pedidos a outros
 * domínios, chapado em Archivo Black, maior que as frases), e não mais a medição em cartão branco de quatro números, de
 * valores a 20 px sob frases de 68 (o fechamento: "a afirmação pesa mais que a prova"). As duas frases descem ao degrau
 * de apoio, de 32 a 56 px (68 até então), e a chapa fica com o maior número e a maior figura da cena. Com ela, o segundo
 * fato deixa o pé do aparelho e sobe para logo abaixo do primeiro: a prancha passa a ser o aparelho à esquerda e, à
 * direita, a afirmação e a prova (a chapa em largura inteira, sob a prancha, foi tentada no mesmo dia e saiu: deixava
 * um vão de 300 px entre os dois fatos, e a prova longe da frase que ela prova). Na chapa, canto vivo e filete duplo (a
 * chapa gravada, seção 2.6): é papel, não tela.
 */
export function Destaques() {
  // Em Archivo Black desde 17/10, a letra dos títulos e dos números (combinação de 05/10, app/layout.tsx): até então, em
  // Archivo 500 no corpo de título, a única frase desse tamanho fora da família dos títulos.
  // O degrau de apoio (17/10, a direção final): de 32 px no celular a 56 na mesa, abaixo dos 68 dos títulos de cena.
  const frase = "max-w-[24ch] font-display text-[length:min(clamp(2rem,1rem+2.6vw,3.5rem),10vw)] leading-[1.1] tracking-titulo text-balance";
  const [primeiro, segundo] = fatos;
  return (
    <Secao aria-label="Destaques" tom="claro">
      {/* A prancha de espécime (17/10): na mesa, o aparelho à esquerda e, à direita, os dois fatos, o segundo com a chapa
          da carga embaixo. No celular, na ordem do texto: o fato, o aparelho, o fato e a chapa. */}
      <Envelope className="grid gap-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-x-16 lg:gap-y-18">
        <p className={`${frase} lg:col-start-2 lg:row-start-1`}>
          {primeiro.valor} {primeiro.rotulo}.{" "}
          {/* O que se verifica, em nota (16/10, Impeccable: "10 blocos" sozinho é jargão da casa). */}
          {/* No celular, os dez blocos ao lado do aparelho, numerados, dizem a mesma coisa com a ordem real (18/10). */}
          {"detalhe" in primeiro && (
            <span className="mt-3 block max-w-[44ch] font-sans text-corpo font-normal tracking-normal text-balance text-muted-foreground max-lg:hidden">{primeiro.detalhe}</span>
          )}
        </p>

        {/* No celular (17/10, segundo fechamento), o aparelho a 40% da tela (até então, 44%) e o vão de 16 px.
            Desde 18/10 (o passe do celular; DIRECAO-DIGITAL.md, seção 4, item 5), ao lado dele, os dez blocos em legenda
            numerada, e a legenda do site embaixo, em largura inteira: ao lado, ela se espremia em seis linhas de 15
            caracteres (o fechamento), e o aparelho não dizia o que tinha com os "10 blocos". Sem 10 rem ao lado do
            aparelho (abaixo de 375 px, a letra a 200%), a lista desce para baixo dele, e o aparelho, sozinho na linha,
            cresce a 56% da tela. Desde a revisão de 18/10, a lista fica fora da figura (é do primeiro fato, e não do site
            de exemplo: o leitor de tela a ouvia entre a imagem da clínica e a legenda dela) e vem logo depois do fato; a
            figura entra na mesma grade (subgrid), e a lista começa à altura do alto do aparelho (até então, centrada,
            passava 20 px acima e abaixo dele). Na mesa, o invólucro some (contents), e a figura fica na grade da prancha. */}
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-6 max-[23.375em]:grid-cols-1 lg:contents">
          {/* Acima do vínculo da figura (o ::after cobre o aparelho, a lista e a legenda): a lista é texto, e não alvo. */}
          {primeiro.blocos && (
            <ol role="list" aria-label={`Os ${primeiro.valor} ${primeiro.rotulo}`} className="relative z-[1] col-start-2 row-start-1 min-w-0 max-[23.375em]:col-start-1 max-[23.375em]:row-start-2 lg:hidden">
              {primeiro.blocos.map((bloco, i) => (
                <li key={bloco} className="flex gap-2.5 border-foreground/15 py-1 text-[0.8125rem] leading-[1.35] text-muted-foreground not-first:border-t md:py-2.5 md:text-corpo">
                  <span aria-hidden="true" className="w-[2ch] flex-none text-right font-semibold text-foreground tabular-nums">
                    {i + 1}
                  </span>{" "}
                  <span className="text-balance">{bloco}</span>
                </li>
              ))}
            </ol>
          )}
          <figure className="relative col-span-full row-[1/span_2] grid grid-cols-subgrid grid-rows-subgrid items-start gap-x-4 gap-y-6 max-[23.375em]:row-[1/span_3] lg:col-[1] lg:row-[1/span_2] lg:flex lg:flex-col lg:flex-wrap lg:items-start lg:gap-y-5 lg:self-start">
            {/* A tela: 390 e 780 px de largura; a do aparelho é 93,2% dele (a moldura, app/vidro.css). O aparelho pousa no
                papel, como a esfera acima dele (.vd-pousado). */}
            <Celular
              src={`/simulador/${site.id}-inicio-390.webp`}
              srcSet={`/simulador/${site.id}-inicio-390.webp 390w, /simulador/${site.id}-inicio-780.webp 780w`}
              sizes="(min-width: 546px) 224px, 160px"
              alt={demonstrativo.descricao}
              className="vd-pousado col-start-1 row-start-1 w-[clamp(150px,40vw,240px)] flex-none max-[23.375em]:w-[min(56vw,240px)] lg:w-full"
            />
            <figcaption className="col-span-full row-start-2 min-w-0 grow basis-full text-nota text-muted-foreground max-[23.375em]:row-start-3 lg:basis-auto">
              {/* O vínculo cobre a figura inteira (o ::after: o alvo é o aparelho e a legenda); a resposta é a do
                  vínculo com seta. Em linha, para a seta seguir a última palavra quando o nome quebra. */}
              <a href={site.caminho} target="_blank" rel="noopener" className="group/demo font-semibold text-foreground no-underline after:absolute after:inset-0">
                {/* A seta presa à última palavra (17/10): com a legenda mais larga, o nome cabia numa linha e a seta descia
                    sozinha para a de baixo. */}
                <span className="transition-colors duration-300 group-hover/demo:text-accent group-active/demo:text-accent group-active/demo:duration-120">
                  {inicioDoNome}{" "}
                  <span className="whitespace-nowrap">
                    {ultimaDoNome}
                    <IconeSeta className="ml-1.5 inline-block size-3.5 align-[-0.125em] text-accent transition-transform duration-300 group-hover/demo:translate-x-0.5" />
                  </span>
                </span>
                <span className="sr-only"> ({simulador.novaAba})</span>
              </a>{" "}
              <span className="mt-1 block">
                {site.nicho}, plano {plano.nome}. {demonstrativo.aviso}
              </span>
            </figcaption>
          </figure>
        </div>

        {/* O segundo fato e, logo abaixo, a chapa da carga, que o prova no próprio aparelho (17/10). No HTML do servidor,
            a reprise desenhada na largura do traço de 1.120 a 1.440 px (o Envelope parado em 1.120), sem esticar;
            depois do load, esta visita, na largura de verdade. */}
        <div className="lg:col-start-2 lg:row-start-2">
          <p className={frase}>
            {segundo.valor} {segundo.rotulo}.
          </p>
          <div className="mt-8 lg:mt-10">
            <CargaDaVisita>
              <ChapaDaCarga carga={REPRISE} largura={LARGURA_DA_REPRISE} />
            </CargaDaVisita>
          </div>
        </div>
      </Envelope>
    </Secao>
  );
}

import { Celular } from "@/components/aparelho/celular";
import { Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
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
 */
export function Destaques() {
  const frase = "max-w-[24ch] font-sub text-titulo leading-[1.1] font-medium tracking-[-0.03em] text-balance";
  const [primeiro, segundo] = fatos;
  return (
    <Secao aria-label="Destaques" tom="claro">
      {/* A prancha de espécime (17/10): na mesa, a prova à esquerda e os dois fatos à direita, um à altura do alto dela e
          o outro à do pé. No celular, na ordem do texto: o fato, a prova, o fato. */}
      <Envelope className="grid gap-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:grid-rows-[auto_auto] lg:gap-x-24 lg:gap-y-16">
        <p className={`${frase} lg:col-start-2 lg:row-start-1`}>
          {primeiro.valor} {primeiro.rotulo}.{" "}
          {/* O que se verifica, em nota (16/10, Impeccable: "10 blocos" sozinho é jargão da casa). */}
          {"detalhe" in primeiro && (
            <span className="mt-3 block max-w-[44ch] font-sans text-corpo font-normal tracking-normal text-balance text-muted-foreground">{primeiro.detalhe}</span>
          )}
        </p>

        {/* No celular (17/10, segundo fechamento), o aparelho a 40% da tela (até então, 44%) e o vão de 16 px: a legenda ao
            lado ganha 22 px (de 150 a 172 a 390 px), e não se espreme em cinco linhas. */}
        <figure className="relative flex flex-wrap items-end gap-x-4 gap-y-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:flex-col lg:items-start">
          {/* A tela: 390 e 780 px de largura; a do aparelho é 93,2% dele (a moldura, app/vidro.css). O aparelho pousa no
              papel, como a esfera acima dele (.vd-pousado). */}
          <Celular
            src={`/simulador/${site.id}-inicio-390.webp`}
            srcSet={`/simulador/${site.id}-inicio-390.webp 390w, /simulador/${site.id}-inicio-780.webp 780w`}
            sizes="(min-width: 546px) 224px, 160px"
            alt={demonstrativo.descricao}
            className="vd-pousado w-[clamp(150px,40vw,240px)] flex-none lg:w-full"
          />
          <figcaption className="min-w-0 grow basis-36 text-nota text-muted-foreground lg:basis-auto">
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

        <p className={`${frase} lg:col-start-2 lg:row-start-2 lg:self-end`}>
          {segundo.valor} {segundo.rotulo}.
        </p>
      </Envelope>
    </Secao>
  );
}

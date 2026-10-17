import { Celular } from "@/components/aparelho/celular";
import { Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { Faixa } from "@/components/secoes/faixa";
import { planos } from "@/conteudo/planos";
import { capa, simulador } from "@/conteudo/site";

/**
 * Só os dois primeiros destaques (os 10 blocos e os 0 cookies): os outros
 * dois, a visita (1) e as rodadas de revisão (2), são as marcas das
 * etapas, na pilha logo abaixo (cada fato uma vez).
 */
const fatos = capa.destaques.slice(0, 2);
const { demonstrativo } = capa;
const site = simulador.sites.find((s) => s.id === demonstrativo.site)!;
const plano = planos.find((p) => p.id === site.plano)!;

/**
 * Logo abaixo da capa, os destaques — o padrão de execução em fatos
 * verificáveis, primeiro na ordem do argumento da ata (IV.1) — e a faixa
 * de nichos. Até 02/10 ficavam no pé da capa; desde 03/10 têm seção
 * própria, na névoa, para a capa ficar só com o título e as ações (pedido
 * do usuário). Desde 16/10 (o crítico de fora), em frases, no degrau dos
 * títulos, com o algarismo em bronze: até então, a fileira de quatro
 * números grandes com a legenda embaixo (10 · 0 · 1 · 2), o modelo do
 * número com legenda (a marca L2) que o início repetia em cinco cenas, e
 * duas das quatro repetiam as etapas da cena seguinte.
 * Desde 16/10 (decisão do aprovador, "Pôr o demonstrativo"), ao lado das
 * frases, a prova: um site de nicho no celular (a odontologia, do
 * Completo), parado. Não é a vitrine de /para-quem (o depósito e a
 * nutrição, cada um num palco, com as notas de 1 a 4): outro nicho, um
 * aparelho só, sem palco nem notas, com a legenda ao lado, como etiqueta.
 * A partir de 1024 px, na metade da direita, com a legenda embaixo; no
 * celular, abaixo das frases, com a legenda ao lado (desce para baixo do
 * aparelho quando não cabe: 320 px, ou a letra a 200%). O aparelho e a
 * legenda são um vínculo só, para o site, em nova aba.
 */
export function Destaques() {
  return (
    <Secao aria-label="Destaques" tom="claro">
      <Envelope className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <ul className="max-w-[24ch] space-y-5 font-sub text-titulo leading-[1.1] font-medium tracking-[-0.03em] text-balance md:space-y-6">
          {fatos.map((d) => (
            <li key={d.rotulo}>
              <span className="font-display text-accent tabular-nums">{d.valor}</span> {d.rotulo}.
              {/* O que se verifica, em nota (16/10, Impeccable: "10 blocos" sozinho é jargão da casa). */}
              {"detalhe" in d && " "}
              {"detalhe" in d && (
                <span className="mt-3 block max-w-[44ch] font-sans text-corpo font-normal tracking-normal text-balance text-muted-foreground">{d.detalhe}</span>
              )}
            </li>
          ))}
        </ul>

        <figure className="relative flex flex-wrap items-end gap-x-5 gap-y-5 lg:w-64 lg:flex-col lg:items-start">
          {/* A tela: 390 e 780 px de largura; a do aparelho é 93,2% dele (a moldura, app/vidro.css). */}
          <Celular
            src={`/simulador/${site.id}-inicio-390.webp`}
            srcSet={`/simulador/${site.id}-inicio-390.webp 390w, /simulador/${site.id}-inicio-780.webp 780w`}
            sizes="(min-width: 1024px) 239px, 160px"
            alt={demonstrativo.descricao}
            className="w-[172px] flex-none lg:w-full"
          />
          <figcaption className="min-w-0 grow basis-36 text-nota text-muted-foreground lg:basis-auto">
            {/* O vínculo cobre a figura inteira (o ::after: o alvo é o aparelho e a legenda); a resposta é a do
                vínculo com seta. Em linha, para a seta seguir a última palavra quando o nome quebra. */}
            <a href={site.caminho} target="_blank" rel="noopener" className="group/demo font-semibold text-foreground no-underline after:absolute after:inset-0">
              <span className="transition-colors duration-300 group-hover/demo:text-accent group-active/demo:text-accent group-active/demo:duration-120">
                {site.nome}
              </span>
              <IconeSeta className="ml-1.5 inline-block size-3.5 align-[-0.125em] text-accent transition-transform duration-300 group-hover/demo:translate-x-0.5" />
              <span className="sr-only"> ({simulador.novaAba})</span>
            </a>{" "}
            <span className="mt-1 block">
              {site.nicho}, plano {plano.nome}. {demonstrativo.aviso}
            </span>
          </figcaption>
        </figure>
      </Envelope>
      <Faixa className="mt-16 md:mt-20" />
    </Secao>
  );
}

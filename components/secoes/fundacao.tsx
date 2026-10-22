import Link from "next/link";
import { Fragment } from "react";

import { Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { Lide, Titulo } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { acaoOrcamento, falarNoWhatsApp, fundacao, mensagens } from "@/conteudo/site";
import { cn } from "@/lib/utils";
import { linkWhatsApp } from "@/lib/whatsapp";

/**
 * A condição de fundação. No início, o carimbo do canto da prancha
 * (desde 17/10, passe 4b): o título na margem, na largura da coluna, e,
 * embaixo, à direita, o bloco de campos de um desenho técnico, com o filete
 * de bronze e os fios entre os campos: o lide; os três termos numa frase; as
 * duas ações. Desde 17/10 (a direção final do Atlas Digital, seção 3, item
 * 6), quieto, na água em sangria, com o grão: o carimbo com o raio da ficha
 * (--r-ficha, 12 px; até então, 32 px), "50%" e "3" chapados na mesma letra
 * (o Archivo Black do número publicado, nas duas composições: até então,
 * Inter no início e Archivo Black em Planos, o fechamento com o Impeccable,
 * A), sem o orbe de bronze sob o ponteiro e sem a aresta que acendia (a
 * marca C14; o orbe tinha voltado em 03/10 a pedido do usuário, e a direção
 * o tira das cenas navy do Atlas) e sem pontos: a metade em pontos é da
 * escada de Planos. Até 17/10, um cartão centrado com o filete, o título dentro
 * (o crítico de fora: "um cartão centrado com borda", como a capa, os
 * passos e o Fim, todos ao centro). Da branchCto: no hover, a aresta acende e um orbe de bronze
 * segue o ponteiro. A ação fica com o hover do sistema, como toda
 * "Montar orçamento" (desde 16/10). Por dentro, o padrão dos cartões,
 * 32/40 px. O orbe e o filete a 45% do bronze saíram em 03/10 pela regra 3
 * das Diretrizes de Design Premium e voltaram no mesmo dia, a pedido do
 * usuário: são parte da identidade do site.
 * `extrato`: em Planos, a outra composição (desde 14/10, o crítico de
 * fora): sem o bloco e sem o orbe, alinhada à esquerda, com o lide e as
 * ações de um lado e os três termos numa coluna de linhas do outro, como
 * num extrato (desde 17/10, o valor na letra da linha, numa coluna
 * tabular; até então, no degrau dos números); no hover, o número da
 * linha acende em bronze (a lista que acende: 09-movimento.md, seção
 * 13.2). Desde 16/10, na névoa, entre o navy da escada e o da próxima
 * página (até então, no navy, colada à escada: duas cenas seguidas no mesmo
 * tom).
 * Até 16/10, os termos também eram números grandes no início, com três
 * globos da marca ao lado do "3", um por contrato: o mesmo "50% · 12 meses
 * · 3" nas duas páginas, o número com legenda em série (L2) e a assinatura
 * usada como ícone de contagem (o crítico de fora). No início, ficaram numa
 * frase; os números grandes, só no extrato, que é o detalhe (até 17/10: o
 * segundo fechamento com o Impeccable os trouxe para a letra da linha).
 * `destino`: para onde vai "Montar orçamento" (no início, o montador da
 * própria página). Desde 03/10 também no início, logo depois do montador
 * (pedido do usuário): a escassez, que é verdadeira, junto da decisão de
 * preço.
 */
/** No carimbo com menos de 16 rem (só com a letra a 200%: com a letra normal, 17 rem ou mais), a pílula com metade do
 *  recuo dos lados: com o recuo inteiro, "orçamento" e os 112 px de lado alargavam a coluna, e o carimbo cortava o texto
 *  dos termos (17/10, segundo fechamento). Fora do carimbo (o extrato), não há contêiner, e nada muda. */
const ESTREITA = "@max-[16rem]:px-4";

export function Fundacao({ extrato = false, destino = acaoOrcamento.destino }: { extrato?: boolean; destino?: string }) {
  const acoes = (
    // data-sem-atalho (desde 18/10, o passe do celular), só nas ações, e não mais na seção inteira: a barra do polegar
    // sumia assim que o título entrava na tela, com as ações ainda uma tela abaixo, e nenhuma ação ficava à vista.
    // No extrato, abaixo de 1024 px, as ações vêm depois dos termos (max-lg:order-1, com a coluna da esquerda em
    // display: contents): empilhado, quem lê achava a ação antes da condição que ela carrega (18/10, a revisão do celular).
    <div data-sem-atalho className={cn("flex flex-wrap items-center gap-x-8 gap-y-4", extrato ? "max-lg:order-1 lg:mt-12" : "md:flex-col md:items-start md:gap-y-5")}>
      {destino.startsWith("#") ? (
        <a href={destino} className={buttonVariants({ size: "lg", className: ESTREITA })}>
          {acaoOrcamento.rotulo}
        </a>
      ) : (
        <Link href={destino} className={buttonVariants({ size: "lg", className: ESTREITA })}>
          {acaoOrcamento.rotulo}
        </Link>
      )}{" "}
      <a href={linkWhatsApp(mensagens.contato)} target="_blank" rel="noopener" className={buttonVariants({ variant: "link", size: "link" })}>
        {/* Abaixo de 1024 px, o rótulo e a seta numa linha de texto, à esquerda (18/10, a revisão do celular): com a letra
            a 200%, "Falar no WhatsApp" quebrava em duas linhas centradas, com a seta solta na borda. Na mesa, display:
            contents devolve os dois itens ao flex do botão, como antes. */}
        <span className="max-lg:text-left lg:contents">
          {falarNoWhatsApp}
          <IconeSeta className="size-3.5 max-lg:ml-2 max-lg:inline" />
        </span>
      </a>
    </div>
  );

  if (extrato)
    return (
      <Secao id="fundacao" tom="claro">
        <Envelope>
          {/* O rótulo, só para o leitor de tela (17/10): à vista, era o sobretítulo (a marca T2). */}
          <p className="sr-only">{fundacao.rotulo}</p>
          {/* Em sequência e equilibrado (16/10): a 68 px, "Os três primeiros contratos" não cabe nos 1.120 px da coluna,
              e, presas em blocos, as linhas quebravam em três. */}
          <Titulo linhas={fundacao.titulo} className="text-balance [&>span]:inline" />
          <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="max-lg:contents lg:col-span-7">
              <Lide className="max-w-[52ch]">{fundacao.lide}</Lide>
              {acoes}
            </div>
            {/* @container: com a letra a 200%, a linha empilha o número e a legenda (17/10); antes, "de mensalidade
                congelada" passava da tela a 390 px. Com a letra normal, a coluna tem 17 rem ou mais, e nada muda. */}
            {/* Desde o segundo fechamento com o Impeccable (17/10), o lançamento de um extrato: o valor na letra da linha, numa
                coluna de algarismos tabulares, e a descrição ao lado. Até então, o número em Archivo Black, no degrau dos
                números, com a legenda miúda à direita: o modelo do número grande com legenda (a marca L2; a avaliação A). */}
            <dl className="@container divide-y divide-border self-start border-y border-border lg:col-span-5">
              {fundacao.termos.map((t) => (
                <div key={t.rotulo} className="group grid grid-cols-[6.5rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 py-5 @max-[16rem]:grid-cols-1">
                  <dt className="font-display text-destaque tracking-titulo whitespace-nowrap">
                    {t.valor}
                  </dt>
                  <dd className="text-corpo text-muted-foreground">{t.rotulo}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Envelope>
      </Secao>
    );

  const ultimo = fundacao.termos.length - 1;
  return (
    <Secao id="fundacao" tom="escuro">
      <Envelope className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-16">
        <p className="sr-only">{fundacao.rotulo}</p>
        {/* As linhas em sequência, equilibradas juntas (16/10): presas em blocos, quebravam em "Os três primeiros /
            contratos / têm condição própria.". Desde 17/10, na margem, fora do carimbo, na largura da coluna. */}
        <Titulo linhas={fundacao.titulo} className="text-balance [&>span]:inline lg:col-span-12" />
        {/* O carimbo da prancha (17/10): os campos, separados pelos fios do desenho técnico; o filete de bronze a 45% fica
            (03/10, a pedido do usuário), e o orbe sai (17/10, o Atlas Digital). Na mesa, desde o segundo fechamento com o Impeccable (17/10),
            a faixa de campos na largura toda, como o carimbo em tira do pé de uma folha: no canto, à direita, sobravam
            uns 45% da coluna vazios sob o título (a avaliação A). */}
        <div className="vd-carimbo lg:col-span-12">
          <div className="vd-carimbo-campo">
            <Lide className="max-w-[52ch]">{fundacao.lide}</Lide>
          </div>
          <div className="vd-carimbo-linha grid grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_auto]">
            {/* Os termos numa frase: "50% de desconto na criação e 3 contratos com esta condição.", "50%" e "3" chapados.
                overflow-wrap: com a letra a 200% a 390 px, "mensalidade" passava do campo e o carimbo a cortava.
                Também no celular: por algumas horas de 18/10, abaixo de 768 px, a frase virou dois campos lado a lado, o
                valor no degrau dos números e o termo embaixo, e a revisão a devolveu: era o número grande com legenda em
                fileira (a marca L2, que já tinha saído daqui em 16/10 e em 17/10). */}
            <p className="vd-carimbo-campo font-sub text-destaque tracking-sub [overflow-wrap:anywhere]">
              {fundacao.termos.map((t, i) => (
                <Fragment key={t.rotulo}>
                  {i > 0 && (i === ultimo ? " e " : ", ")}
                  <strong className="font-display font-normal tracking-titulo text-foreground">{t.valor}</strong> {t.rotulo}
                </Fragment>
              ))}
              .
            </p>
            <div className="vd-carimbo-campo">{acoes}</div>
          </div>
        </div>
      </Envelope>
    </Secao>
  );
}

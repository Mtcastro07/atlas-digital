import Link from "next/link";
import { Fragment } from "react";

import { Envelope, Orbe, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { Lide, Titulo } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { acaoOrcamento, falarNoWhatsApp, fundacao, mensagens } from "@/conteudo/site";
import { cn } from "@/lib/utils";
import { linkWhatsApp } from "@/lib/whatsapp";

/**
 * A condição de fundação. No início, num bloco com filete de bronze,
 * centrado: o rótulo, o título, o lide, os três termos numa frase e as
 * duas ações. Da branchCto: no hover, a aresta acende e um orbe de bronze
 * segue o ponteiro. A ação fica com o hover do sistema, como toda
 * "Montar orçamento" (desde 16/10). Por dentro, o padrão dos cartões,
 * 32/40 px. O orbe e o filete a 45% do bronze saíram em 03/10 pela regra 3
 * das Diretrizes de Design Premium e voltaram no mesmo dia, a pedido do
 * usuário: são parte da identidade do site.
 * `extrato`: em Planos, a outra composição (desde 14/10, o crítico de
 * fora): sem o bloco e sem o orbe, alinhada à esquerda, com o lide e as
 * ações de um lado e os três termos numa coluna de linhas do outro, como
 * num extrato, com os números no degrau dos números; no hover, o número da
 * linha acende em bronze (a lista que acende: 09-movimento.md, seção
 * 13.2). Desde 16/10, na névoa, entre o navy da escada e o da próxima
 * página (até então, no navy, colada à escada: duas cenas seguidas no mesmo
 * tom).
 * Até 16/10, os termos também eram números grandes no início, com três
 * globos da marca ao lado do "3", um por contrato: o mesmo "50% · 12 meses
 * · 3" nas duas páginas, o número com legenda em série (L2) e a assinatura
 * usada como ícone de contagem (o crítico de fora). No início, ficaram numa
 * frase; os números grandes, só no extrato, que é o detalhe.
 * `destino`: para onde vai "Montar orçamento" (no início, o montador da
 * própria página). Desde 03/10 também no início, logo depois do montador
 * (pedido do usuário): a escassez, que é verdadeira, junto da decisão de
 * preço.
 */
export function Fundacao({ extrato = false, destino = acaoOrcamento.destino }: { extrato?: boolean; destino?: string }) {
  const acoes = (
    <div className={cn("mt-12 flex flex-wrap items-center gap-x-8 gap-y-4", !extrato && "justify-center")}>
      {destino.startsWith("#") ? (
        <a href={destino} className={buttonVariants({ size: "lg" })}>
          {acaoOrcamento.rotulo}
        </a>
      ) : (
        <Link href={destino} className={buttonVariants({ size: "lg" })}>
          {acaoOrcamento.rotulo}
        </Link>
      )}
      <a href={linkWhatsApp(mensagens.contato)} target="_blank" rel="noopener" className={buttonVariants({ variant: "link", size: "link" })}>
        {falarNoWhatsApp}
        <IconeSeta className="size-3.5" />
      </a>
    </div>
  );

  if (extrato)
    return (
      <Secao id="fundacao" tom="claro">
        <Envelope>
          <p className="text-rotulo font-semibold text-accent">{fundacao.rotulo}</p>
          <Titulo linhas={fundacao.titulo} className="mt-3.5" />
          <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Lide className="max-w-[52ch]">{fundacao.lide}</Lide>
              {acoes}
            </div>
            <dl className="divide-y divide-border self-start border-y border-border lg:col-span-5">
              {fundacao.termos.map((t) => (
                <div key={t.rotulo} className="group flex items-baseline justify-between gap-6 py-6">
                  <dt className="font-display tracking-titulo text-numero whitespace-nowrap transition-colors duration-300 ease-atlas group-hover:text-accent">
                    {t.valor}
                  </dt>
                  <dd className="text-right text-nota text-muted-foreground">{t.rotulo}</dd>
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
      <Envelope>
        <div className="vd-luz rounded-xl border border-primary/45 bg-card p-8 text-center md:p-10">
          <Orbe />
          <p className="text-rotulo font-semibold text-accent">{fundacao.rotulo}</p>
          <Titulo linhas={fundacao.titulo} className="mx-auto mt-3.5" />
          <Lide className="mx-auto mt-8 max-w-[52ch]">{fundacao.lide}</Lide>
          {/* Os três termos numa frase, no corpo do lide: "50% de desconto na criação, 12 meses (...) e 3 contratos (...)". */}
          <p className="mx-auto mt-10 max-w-3xl border-t border-border pt-10 font-sub text-destaque tracking-sub">
            {fundacao.termos.map((t, i) => (
              <Fragment key={t.rotulo}>
                {i > 0 && (i === ultimo ? " e " : ", ")}
                <strong className="font-semibold text-accent tabular-nums">{t.valor}</strong> {t.rotulo}
              </Fragment>
            ))}
            .
          </p>
          {acoes}
        </div>
      </Envelope>
    </Secao>
  );
}

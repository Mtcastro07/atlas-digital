import Link from "next/link";

import { Envelope, Orbe, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { TextoRolante } from "@/components/texto-rolante";
import { Lide, Titulo } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { acaoOrcamento, falarNoWhatsApp, fundacao, mensagens } from "@/conteudo/site";
import { linkWhatsApp } from "@/lib/whatsapp";

/**
 * A condição de fundação num bloco com filete de bronze: os três termos
 * em números grandes — o "3" acompanhado de três globos da marca, um por
 * contrato — e as duas ações. Centrada, como as outras aberturas
 * da página: o bloco é simétrico no eixo da coluna. Da branchCto: no
 * hover, a aresta acende e um orbe de bronze segue o ponteiro; a ação
 * principal é magnética e rola as letras. Por dentro, o padrão dos
 * cartões, 32/40 px (até 03/10, 56/80 px na vertical e 64 px dos lados).
 * O orbe e o filete a 45% do bronze saíram em 03/10 pela regra 3 das
 * Diretrizes de Design Premium e voltaram no mesmo dia, a pedido do
 * usuário: são parte da identidade do site. `colada`: logo depois de outra
 * seção escura (a escada, na página Planos), sem o respiro de cima — as
 * duas não somam dois respiros num só tom. `destino`: para onde vai
 * "Montar orçamento" (no início, o montador da própria página).
 * Desde 03/10 também no início, logo depois do montador (pedido do
 * usuário): a escassez, que é verdadeira, junto da decisão de preço.
 */
export function Fundacao({ colada = false, destino = acaoOrcamento.destino }: { colada?: boolean; destino?: string }) {
  return (
    <Secao id="fundacao" tom="escuro" className={colada ? "pt-0 md:pt-0" : undefined}>
      <Envelope>
        <div className="vd-luz rounded-xl border border-primary/45 bg-card p-8 text-center md:p-10">
          <Orbe />
          <p className="text-rotulo font-semibold text-accent">{fundacao.rotulo}</p>
          <Titulo linhas={fundacao.titulo} className="mx-auto mt-3.5" />
          <Lide className="mx-auto mt-8 max-w-[52ch]">{fundacao.lide}</Lide>
          <dl className="mx-auto mt-12 grid max-w-3xl gap-10 border-t border-border pt-12 sm:grid-cols-3 sm:gap-6">
            {fundacao.termos.map((t) => (
              <div key={t.rotulo}>
                <dt className="flex items-center justify-center gap-3 font-display tracking-titulo text-numero">
                  {t.valor}
                  {t.selos ? (
                    // Um globo da marca por contrato de fundação: o número desenhado (decorativo).
                    <span aria-hidden="true" className="flex gap-1.5 text-accent">
                      {Array.from({ length: t.selos }, (_, i) => (
                        <svg key={i} viewBox="-24 -24 48 48" className="size-[0.62em]">
                          <g fill="none" stroke="currentColor" strokeWidth="3.5">
                            <circle r="21.75" />
                            <ellipse rx="9.75" ry="21.75" />
                            <path d="M-20.42 -7.5H20.42M-20.42 7.5H20.42" />
                          </g>
                        </svg>
                      ))}
                    </span>
                  ) : null}
                </dt>
                <dd className="mt-2.5 text-nota text-muted-foreground">{t.rotulo}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {destino.startsWith("#") ? (
              <a href={destino} data-magnetico className={buttonVariants({ size: "lg" })}>
                <TextoRolante texto={acaoOrcamento.rotulo} />
              </a>
            ) : (
              <Link href={destino} data-magnetico className={buttonVariants({ size: "lg" })}>
                <TextoRolante texto={acaoOrcamento.rotulo} />
              </Link>
            )}
            <a href={linkWhatsApp(mensagens.contato)} target="_blank" rel="noopener" className={buttonVariants({ variant: "link", size: "link" })}>
              {falarNoWhatsApp}
              <IconeSeta className="size-3.5" />
            </a>
          </div>
        </div>
      </Envelope>
    </Secao>
  );
}

import { Envelope, Secao } from "@/components/estrutura";
import { Faixa } from "@/components/secoes/faixa";
import { capa } from "@/conteudo/site";

/**
 * Só os dois primeiros destaques (os 10 blocos e os 0 cookies): os outros
 * dois, a visita (1) e as rodadas de revisão (2), são as marcas das
 * etapas, na pilha logo abaixo (cada fato uma vez).
 */
const fatos = capa.destaques.slice(0, 2);

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
 */
export function Destaques() {
  return (
    <Secao aria-label="Destaques" tom="claro">
      <Envelope>
        <ul className="max-w-[24ch] space-y-5 font-sub text-titulo leading-[1.1] font-medium tracking-[-0.03em] text-balance md:space-y-6">
          {fatos.map((d) => (
            <li key={d.rotulo}>
              <span className="font-display text-accent tabular-nums">{d.valor}</span> {d.rotulo}.
              {/* O que se verifica, em nota (16/10, Impeccable: "10 blocos" sozinho é jargão da casa). */}
              {"detalhe" in d && (
                <span className="mt-3 block max-w-[44ch] font-sans text-corpo font-normal tracking-normal text-balance text-muted-foreground">{d.detalhe}</span>
              )}
            </li>
          ))}
        </ul>
      </Envelope>
      <Faixa className="mt-16 md:mt-20" />
    </Secao>
  );
}

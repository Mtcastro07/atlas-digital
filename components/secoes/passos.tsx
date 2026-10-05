import Link from "next/link";

import { Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { PilhaDePassos } from "@/components/ilhas/pilha-de-passos";
import { Titulo } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { passosDoInicio, trabalho } from "@/conteudo/site";

/**
 * Cada caixa para 16 px abaixo da anterior (o mesmo mb-4 que as separa na
 * lista); a primeira, 40 px abaixo do cabeçalho (72 px). Na escala de 4 px
 * desde 03/10 (antes, 18 e 38 px).
 */
const topoDa = (i: number) => `${112 + i * 16}px`;

/**
 * O trabalho, no início: as quatro etapas em caixas que se empilham ao
 * rolar, como no site de 28/08 (pedido do usuário, 03/10: "gosto das
 * caixas que se empilham ao rolar"). Cada caixa é sticky, um degrau abaixo
 * da anterior; a ilha PilhaDePassos faz a de baixo recuar em profundidade
 * enquanto a seguinte a cobre. Em cada caixa, o número, o título, o texto e
 * a marca da etapa (1 visita, 24 h, 2 rodadas, 7 a 15 dias úteis), com o
 * padrão dos cartões por dentro (32/40 px) e uma sombra de 70 px a 42% de
 * preto por baixo (saiu em 03/10 pela regra 3 das Diretrizes de Design
 * Premium e voltou no mesmo dia, a pedido do usuário: é parte da
 * identidade do site). O detalhe — a régua do prazo — fica na página O
 * trabalho. Depois da capa e dos destaques, antes do preço: o valor vem
 * antes do preço (Karmarkar, Shiv e Knutson, 2015).
 */
export function Passos() {
  return (
    <Secao id="trabalho" tom="escuro">
      <Envelope>
        <div className="text-center">
          <p className="text-rotulo font-semibold text-accent">{passosDoInicio.rotulo}</p>
          <Titulo linhas={trabalho.titulo} className="mx-auto mt-3.5" />
        </div>
        <PilhaDePassos className="mx-auto mt-16 max-w-4xl md:mt-20">
          {trabalho.passos.map((passo, i) => (
            <li
              key={passo.titulo}
              style={{ top: topoDa(i) }}
              className="sticky mb-4 origin-top rounded-[2rem] border border-border bg-card p-8 shadow-[0_26px_70px_rgb(4_14_28/0.42)] md:grid md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:p-10"
            >
              <div>
                {/* Bronze claro (accent), o do texto pequeno no tom escuro: o da ação (primary), sobre o cartão, dava 4,49:1, abaixo dos 4,5:1 (até 03/10). */}
                <p className="font-display text-nota tracking-wide text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 mb-2 text-destaque">{passo.titulo}</h3>
                <p className="max-w-[52ch] text-corpo text-muted-foreground">{passo.texto}</p>
              </div>
              <p className="mt-6 md:mt-0 md:text-right">
                <span className="block font-display tracking-titulo text-numero whitespace-nowrap text-accent tabular-nums">
                  {passo.marca.valor}
                </span>
                <span className="mt-2 block text-nota text-muted-foreground">{passo.marca.rotulo}</span>
              </p>
            </li>
          ))}
        </PilhaDePassos>
        <p className="mt-10 text-center md:mt-12">
          <Link href={passosDoInicio.vinculo.destino} className={buttonVariants({ variant: "link", size: "link" })}>
            {passosDoInicio.vinculo.rotulo}
            <IconeSeta className="size-3.5" />
          </Link>
        </p>
      </Envelope>
    </Secao>
  );
}

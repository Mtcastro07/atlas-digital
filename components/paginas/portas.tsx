import Link from "next/link";

import { Abertura, Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { paginasInternas, portas } from "@/conteudo/site";

/**
 * O índice do início: as seis páginas como portas. Cada porta mostra o
 * essencial do outro lado em número grande (3 públicos, 3 planos,
 * 2 toques, 4 etapas, UFF, 10 perguntas — a palavra em negrito desde
 * 03/10, a pedido), o nome da página e o resumo. O dado em Archivo Black,
 * no degrau dos números (24 a 36 px), e a palavra no do lide, em negrito
 * (até 03/10, o dado de 40 a 60 px e a palavra a 0,4 dele).
 * A resposta é a do item de índice (09-movimento.md, seção 13.1): no
 * hover e no foco, o dado acende em bronze, a seta corre e o fundo se tinge
 * (.vd-bloco:hover, desde a crítica de 14/10: com o ponteiro no meio do
 * cartão, só o algarismo mudava); no toque, o dado acende em 120 ms e o
 * fundo se tinge (.vd-bloco:active). O cabeçalho vai na margem (14/10): a
 * cena de cima, a fundação, é centrada. Até 14/10, cada
 * porta tinha também a aresta que acendia, o orbe de bronze sob o cursor e
 * a subida de 3 px com sombra, a mesma resposta dos blocos de Para quem e
 * dos planos (a marca M1; pedido do usuário, 14/10: "parecendo que você
 * está spamando os mesmos componentes"); o orbe ficou na fundação e na
 * escada de preços. No celular, as portas viram uma galeria de deslizar
 * (vidro.css, .vd-galeria), com o trilho do avanço. Até 16/10, cada porta
 * levava também o número da página (01 a 06), como o menu do celular e o
 * pé de cada página: a numeração em série, em páginas que não são
 * sequência (as marcas L5 e T2; o crítico de fora).
 */
export function Portas() {
  return (
    <Secao aria-labelledby="portas" tom="claro">
      <Envelope>
        <Abertura margem titulo={portas.titulo} lide={portas.lide}>
          <span id="portas" className="sr-only">
            {portas.rotulo}
          </span>
        </Abertura>
        <div className="vd-galeria-quadro mt-16 md:mt-20" style={{ "--galeria-polegar": 1 / paginasInternas.length } as React.CSSProperties}>
          <ul className="vd-galeria gap-5 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {paginasInternas.map((pagina) => (
              <li key={pagina.id}>
                {/* Três camadas em todas as portas, na mesma posição: o nome da página, com a seta;
                    o dado em número e palavra; o resumo. O nome aparece uma vez (antes, no alto e no pé), e o dado
                    fica à mesma distância do topo em todas: os números de uma fileira se alinham. */}
                <Link href={pagina.caminho} className="group vd-bloco vd-aresta relative flex h-full flex-col overflow-hidden rounded-xl p-8 no-underline md:p-10">
                  <span className="relative flex items-center justify-between gap-4 text-nota font-semibold">
                    {pagina.menu}
                    <IconeSeta className="size-3.5 flex-none text-accent transition-transform duration-500 ease-atlas group-hover:translate-x-1.5" />
                  </span>
                  <span className="relative mt-12 block">
                    <span className="flex flex-wrap items-baseline gap-x-2.5 tabular-nums">
                      <span className="font-display tracking-titulo text-numero whitespace-nowrap transition-colors duration-300 ease-atlas group-hover:text-accent group-focus-visible:text-accent group-active:text-accent group-active:duration-120">
                        {pagina.porta.dado}
                      </span>
                      {pagina.porta.unidade && <span className="text-destaque font-bold whitespace-nowrap text-muted-foreground">{pagina.porta.unidade}</span>}
                    </span>
                    <span className="mt-5 block max-w-[32ch] text-corpo text-muted-foreground">{pagina.porta.resumo}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div aria-hidden="true" className="vd-galeria-trilho" />
        </div>
      </Envelope>
    </Secao>
  );
}

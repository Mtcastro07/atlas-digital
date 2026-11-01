import Link from "next/link";

import { Abertura, Envelope, Orbe, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { paginasInternas, portas } from "@/conteudo/site";

/**
 * O índice do início: as seis páginas como portas. Cada porta mostra o
 * essencial do outro lado em número grande (3 públicos, 3 planos,
 * 2 toques, 4 etapas, UFF, 10 perguntas — a palavra em negrito desde
 * 03/10, a pedido), o nome da página e o resumo. O dado em Archivo Black,
 * no degrau dos números (24 a 36 px), e a palavra no do lide, em negrito
 * (até 03/10, o dado de 40 a 60 px e a palavra a 0,4 dele).
 * Blocos com a aresta de luz, que acende no hover, e o orbe que segue o
 * cursor (ilha LuzDoCursor; saiu em 03/10 pela regra 3 das Diretrizes de
 * Design Premium e voltou no mesmo dia, a pedido do usuário: é parte da
 * identidade do site); a seta corre no hover. No celular, as portas viram
 * uma galeria de deslizar (vidro.css, .vd-galeria), com o trilho do
 * avanço.
 */
export function Portas() {
  return (
    <Secao aria-labelledby="portas" tom="claro">
      <Envelope>
        <Abertura titulo={portas.titulo} lide={portas.lide}>
          <span id="portas" className="sr-only">
            {portas.rotulo}
          </span>
        </Abertura>
        <div className="vd-galeria-quadro mt-16 md:mt-20" style={{ "--galeria-polegar": 1 / paginasInternas.length } as React.CSSProperties}>
          <ul className="vd-galeria gap-5 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {paginasInternas.map((pagina, i) => (
              <li key={pagina.id}>
                {/* Três camadas em todas as portas, na mesma posição: o número e o nome da página, com a seta;
                    o dado em número e palavra; o resumo. O nome aparece uma vez (antes, no alto e no pé), e o dado
                    fica à mesma distância do topo em todas: os números de uma fileira se alinham. */}
                <Link href={pagina.caminho} className="group vd-bloco vd-luz vd-aresta relative flex h-full flex-col overflow-hidden rounded-xl bg-card p-8 no-underline md:p-10">
                  <Orbe />
                  <span className="relative flex items-center justify-between gap-4 text-nota font-semibold">
                    <span className="flex items-baseline gap-3">
                      <span className="text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      {pagina.menu}
                    </span>
                    <IconeSeta className="size-3.5 flex-none text-accent transition-transform duration-500 ease-atlas group-hover:translate-x-1.5" />
                  </span>
                  <span className="relative mt-12 block">
                    <span className="flex flex-wrap items-baseline gap-x-2.5 tabular-nums">
                      <span className="font-display tracking-titulo text-numero whitespace-nowrap">{pagina.porta.dado}</span>
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

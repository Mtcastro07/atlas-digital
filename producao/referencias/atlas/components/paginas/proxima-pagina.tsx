import Link from "next/link";

import { Envelope } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { buttonVariants } from "@/components/ui/button";
import { paginaDe, paginasInternas, proximaPagina, type IdDaPagina } from "@/conteudo/site";

const dois = (n: number) => String(n).padStart(2, "0");

/** O traço de cada página na régua do percurso: até a atual, em bronze; a seguinte acende no hover; as outras, apagadas. */
function corDoTraco(k: number, atual: number) {
  if (k <= atual) return "bg-accent";
  if (k === atual + 1) return "bg-foreground/35 group-hover:bg-accent/70";
  return "bg-foreground/12";
}

/**
 * O pé de cada página interna: a página seguinte (da última, a volta ao
 * início). Em cima, a régua do percurso — as seis páginas em seis traços,
 * as já percorridas em bronze. Embaixo, o nome da página seguinte e o
 * resumo, de um lado; do outro, o número da porta dela no início (o mesmo
 * "3 planos", "4 etapas"…), e a ação em pílula, como as outras do
 * site. A área inteira é um só vínculo. No hover, nada anda nem muda de
 * tamanho (pedido do usuário, 01/10): muda a cor, e a pílula ganha o
 * brilho bronze das ações (saiu em 03/10 pela regra 3 das Diretrizes de
 * Design Premium e voltou no mesmo dia, a pedido do usuário: é parte da
 * identidade do site). O nome e o número em text-display (40 a 80 px);
 * respiro de 64/96 px (até 03/10, 80/112). O tom alterna com o da seção
 * de cima (escuro por padrão; branco depois de seção escura).
 */
export function ProximaPagina({ atual, tom = "escuro" }: { atual: IdDaPagina; tom?: "escuro" | "branco" }) {
  const i = paginasInternas.findIndex((p) => p.id === atual);
  const proxima = paginasInternas[i + 1] ?? null;
  const total = paginasInternas.length;
  const porta = proxima ? proxima.porta : proximaPagina.portaDoInicio;
  const nome = proxima ? proxima.menu : paginaDe("inicio").menu;
  return (
    <nav aria-label={proximaPagina.rotulo} data-tom={tom} className="border-t border-border">
      <Envelope>
        <Link
          href={proxima ? proxima.caminho : "/"}
          // O início não é pré-buscado: a pré-busca traria as imagens da capa a esta página.
          prefetch={proxima ? undefined : false}
          className="group block py-16 no-underline md:py-24"
        >
          {/* A régua do percurso: uma página por traço. */}
          <span aria-hidden="true" className="flex gap-1.5">
            {paginasInternas.map((p, k) => (
              <span key={p.id} className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ease-atlas ${corDoTraco(k, i)}`} />
            ))}
          </span>

          <span className="mt-10 grid items-end gap-x-10 gap-y-8 md:mt-14 lg:grid-cols-12">
            <span className="lg:col-span-7">
              <span className="flex items-center gap-3 text-rotulo font-semibold text-accent">
                {proxima ? proximaPagina.aSeguir : proximaPagina.fim}
                {proxima && (
                  <>
                    <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
                    <span className="tabular-nums">
                      {dois(i + 2)} / {dois(total)}
                    </span>
                  </>
                )}
              </span>
              <span className="mt-4 block font-display tracking-titulo text-display transition-colors duration-300 ease-atlas group-hover:text-accent">
                {nome}
              </span>
              <span className="mt-5 block max-w-[44ch] text-corpo text-muted-foreground">{porta.resumo}</span>
            </span>

            <span className="flex flex-col gap-8 lg:col-span-5 lg:items-end lg:text-right">
              <span className="block font-semibold text-accent">
                <span className="font-display text-display font-normal tracking-titulo">{porta.dado}</span>
                {porta.unidade && <span className="ml-2 text-destaque font-bold">{porta.unidade}</span>}
              </span>
              {/* A pílula é desenho: o vínculo é a área inteira. Sem compressão e sem deslocamento. */}
              <span
                className={buttonVariants({
                  className: "pointer-events-none w-fit group-hover:bg-primary-hover group-hover:shadow-[0_10px_30px_-10px_var(--primary)]",
                })}
              >
                {proxima ? proximaPagina.acao : proximaPagina.inicio}
                <IconeSeta className="size-4" />
              </span>
            </span>
          </span>
        </Link>
      </Envelope>
    </nav>
  );
}

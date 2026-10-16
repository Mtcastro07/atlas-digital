import Link from "next/link";

import { Envelope } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { buttonVariants } from "@/components/ui/button";
import { paginaDe, paginasInternas, proximaPagina, type IdDaPagina } from "@/conteudo/site";

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
 * resumo, de um lado; do outro, a ação em pílula, como as outras do site.
 * Até 14/10, ao lado da pílula, o número da porta dela no início, em
 * display (o mesmo "3 planos", "4 etapas"…): o número grande com unidade
 * em série, a marca L2, em seis fins de página e repetindo as portas (o
 * crítico de fora, 14/10). Até 16/10, o rótulo levava também a posição da
 * página seguinte ("A seguir — 05 / 06"), que a régua já mostra e que a
 * abertura da página repete logo depois (o crítico de fora). A área inteira é um só vínculo. No hover, nada anda nem muda de
 * tamanho (pedido do usuário, 01/10): muda a cor, e a pílula ganha o
 * brilho bronze das ações (saiu em 03/10 pela regra 3 das Diretrizes de
 * Design Premium e voltou no mesmo dia, a pedido do usuário: é parte da
 * identidade do site). O nome em text-display (40 a 80 px);
 * respiro de 64/96 px (até 03/10, 80/112). O tom alterna com o da seção
 * de cima (escuro por padrão; branco depois de seção escura).
 */
export function ProximaPagina({ atual, tom = "escuro" }: { atual: IdDaPagina; tom?: "escuro" | "branco" }) {
  const i = paginasInternas.findIndex((p) => p.id === atual);
  const proxima = paginasInternas[i + 1] ?? null;
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

          {/* minmax(0, 1fr) e a pílula que quebra: com a letra a 200% a 390 px, o nome e a ação saíam da tela (16/10). */}
          <span className="mt-10 grid grid-cols-[minmax(0,1fr)] items-end gap-x-10 gap-y-8 md:mt-14 lg:grid-cols-12">
            <span className="lg:col-span-7">
              <span className="block text-rotulo font-semibold text-accent">{proxima ? proximaPagina.aSeguir : proximaPagina.fim}</span>
              <span className="mt-4 block font-display tracking-titulo text-display transition-colors duration-300 ease-atlas group-hover:text-accent">
                {nome}
              </span>
              <span className="mt-5 block max-w-[44ch] text-corpo text-muted-foreground">{porta.resumo}</span>
            </span>

            <span className="flex flex-col gap-8 lg:col-span-5 lg:items-end lg:text-right">
              {/* A pílula é desenho: o vínculo é a área inteira. Sem compressão e sem deslocamento. */}
              <span
                className={buttonVariants({
                  className: "pointer-events-none w-fit max-w-full whitespace-normal group-hover:bg-primary-hover group-hover:shadow-[0_10px_30px_-10px_var(--primary)]",
                })}
              >
                {proxima ? proximaPagina.acoes[proxima.id] : proximaPagina.inicio}
                <IconeSeta className="size-4" />
              </span>
            </span>
          </span>
        </Link>
      </Envelope>
    </nav>
  );
}

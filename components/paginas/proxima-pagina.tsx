import Link from "next/link";

import { Envelope } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { buttonVariants } from "@/components/ui/button";
import { paginaDe, paginasInternas, proximaPagina, type IdDaPagina } from "@/conteudo/site";

/** O traço de cada página na régua do percurso: até a atual, em bronze; a seguinte, mais clara, acende com a luz; as outras, apagadas. */
function corDoTraco(k: number, atual: number) {
  if (k <= atual) return "bg-accent";
  if (k === atual + 1) return "cm-seguinte bg-foreground/35";
  return "bg-foreground/12";
}

/**
 * O pé de cada página interna: a página seguinte (da última, a volta ao
 * início). Em cima, a régua do percurso — as seis páginas em seis traços,
 * as já percorridas em bronze. Embaixo, o nome da página seguinte e a
 * frase da porta dela, de um lado; do outro, a ação em pílula. Até 14/10,
 * ao lado da pílula, o número da porta em display (a marca L2); até
 * 16/10, "A seguir — 05 / 06" (a régua já o mostra). A área inteira é um
 * só vínculo, de borda a borda. Desde 28/10 (R10, esboco/comuns/ESBOCO.md,
 * 1.2): o nome a 68 px (text-titulo; até então, 96, o corpo do h1: a
 * página terminava numa palavra do tamanho do próprio título); a frase é
 * a da porta nova do índice do início (porta.frase, D9 e D18); a pílula a
 * 17 px, sem o halo de bronze (C6); a resposta é a do sistema a "vínculo
 * para outra página" (.vd-acende): a luz acende por opacidade, o nome
 * passa ao bronze, a seta anda 6 px e o traço seguinte acende (o foco do
 * teclado faz o mesmo). Respiro de 64/96 px. O tom alterna com o da seção
 * de cima (escuro por padrão; claro depois de seção escura).
 */
export function ProximaPagina({ atual, tom = "escuro" }: { atual: IdDaPagina; tom?: "escuro" | "claro" }) {
  const i = paginasInternas.findIndex((p) => p.id === atual);
  const proxima = paginasInternas[i + 1] ?? null;
  const porta = proxima ? proxima.porta : proximaPagina.portaDoInicio;
  const nome = proxima ? proxima.menu : paginaDe("inicio").menu;
  return (
    <nav aria-label={proximaPagina.rotulo} data-tom={tom} className="vd-materia border-t border-border">
      <Link
        href={proxima ? proxima.caminho : "/"}
        // O início não é pré-buscado: a pré-busca traria as imagens da capa a esta página.
        prefetch={proxima ? undefined : false}
        className="cm-proxima vd-acende group relative block no-underline"
      >
        <Envelope className="py-16 md:py-24">
          {/* A régua do percurso: uma página por traço. */}
          <span aria-hidden="true" className="flex gap-1.5">
            {paginasInternas.map((p, k) => (
              <span key={p.id} className={`h-[3px] flex-1 rounded-full ${corDoTraco(k, i)}`} />
            ))}
          </span>

          {/* minmax(0, 1fr) e a pílula que quebra: com a letra a 200% a 390 px, o nome e a ação saíam da tela (16/10). */}
          <span className="mt-10 grid grid-cols-[minmax(0,1fr)] items-end gap-x-10 gap-y-8 md:mt-14 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
            <span>
              {/* "A seguir" e "Fim do percurso", só para o leitor de tela (17/10): à vista, eram o sobretítulo (a marca T2), e
                  a régua do percurso, logo acima, já diz qual é a próxima página. */}
              <span className="sr-only">{proxima ? proximaPagina.aSeguir : proximaPagina.fim}</span>{" "}
              <span className="vd-acende-nome block font-display tracking-titulo text-titulo [overflow-wrap:anywhere]">{nome}</span>{" "}
              <span className="mt-4 block max-w-[44ch] text-corpo text-pretty text-muted-foreground lg:mt-5">{porta.frase}</span>
            </span>{" "}

            {/* A pílula é desenho: o vínculo é a área inteira. A camada acesa do metal acende com a luz da área. */}
            <span
              className={buttonVariants({
                className:
                  "pointer-events-none w-fit max-w-full justify-self-start whitespace-normal group-hover:before:opacity-100 group-focus-visible:before:opacity-100 lg:justify-self-end",
              })}
            >
              {proxima ? proximaPagina.acoes[proxima.id] : proximaPagina.inicio}
              <IconeSeta className="vd-acende-seta size-4" />
            </span>
          </span>
        </Envelope>
      </Link>
    </nav>
  );
}

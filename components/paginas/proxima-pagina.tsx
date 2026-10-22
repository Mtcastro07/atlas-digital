import Link from "next/link";

import { Envelope } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { buttonVariants } from "@/components/ui/button";
import { paginaDe, paginasInternas, proximaPagina, type IdDaPagina } from "@/conteudo/site";

/**
 * O pé de cada página interna: a página seguinte (da última, a volta ao
 * início), na água em sangria, com o grão (a cena de água que toda página
 * guarda: a regra da janela, seção 2.6 da direção final do Atlas Digital).
 * O nome da página seguinte e o resumo, de um lado; do outro, a ação em
 * pílula, como as outras do site. Até 17/10, em cima, a régua do percurso:
 * as seis páginas em seis traços, as já percorridas em bronze, em fundo de
 * 12 a 35% de opacidade (a direção a cortou, J1 e J2: a leitura da visita
 * fica só nas portas do início, components/paginas/portas.tsx, em traço e
 * ponto).
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
 * de cima (escuro por padrão; claro depois de seção escura; até 16/10, o branco).
 */
export function ProximaPagina({ atual, tom = "escuro" }: { atual: IdDaPagina; tom?: "escuro" | "claro" }) {
  const i = paginasInternas.findIndex((p) => p.id === atual);
  const proxima = paginasInternas[i + 1] ?? null;
  const porta = proxima ? proxima.porta : proximaPagina.portaDoInicio;
  const nome = proxima ? proxima.menu : paginaDe("inicio").menu;
  return (
    <nav aria-label={proximaPagina.rotulo} data-tom={tom} className="vd-materia border-t border-border">
      <Envelope>
        <Link
          href={proxima ? proxima.caminho : "/"}
          // O início não é pré-buscado: a pré-busca traria as imagens da capa a esta página.
          prefetch={proxima ? undefined : false}
          className="group @container block py-16 no-underline md:py-24"
        >
          {/* minmax(0, 1fr) e a pílula que quebra: com a letra a 200% a 390 px, o nome e a ação saíam da tela (16/10). */}
          <span className="grid grid-cols-[minmax(0,1fr)] items-end gap-x-10 gap-y-8 lg:grid-cols-12">
            <span className="lg:col-span-7">
              {/* "A seguir" e "Fim do percurso", só para o leitor de tela (17/10): à vista, eram o sobretítulo (a marca T2), e
                  a ação em pílula já nomeia o destino ("Ver os planos"). */}
              <span className="sr-only">{proxima ? proximaPagina.aSeguir : proximaPagina.fim}</span>{" "}
              {/* O teto de 17% da coluna (18/10, o passe do celular): "Orçamento", a palavra mais longa (5,75 em), sempre cabe
                  inteira. Só pesa a 320 px com a letra a 200% (a margem em rem estreita a coluna a 224 px, e ela partia em
                  "Orçament/o"); com a letra normal, e na mesa, o teto fica acima do degrau. */}
              <span className="block font-display tracking-titulo text-display transition-colors duration-300 ease-atlas group-hover:text-accent [font-size:min(var(--text-display),17cqi)]">
                {nome}
              </span>{" "}
              <span className="mt-5 block max-w-[44ch] text-corpo text-muted-foreground">{porta.resumo}</span>
            </span>{" "}

            <span className="flex flex-col gap-8 lg:col-span-5 lg:items-end lg:text-right">
              {/* A pílula é desenho: o vínculo é a área inteira. Sem compressão e sem deslocamento. */}
              <span
                className={buttonVariants({
                  className: "pointer-events-none w-fit max-w-full whitespace-normal group-hover:shadow-[0_10px_30px_-10px_var(--primary)] group-hover:before:opacity-100",
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

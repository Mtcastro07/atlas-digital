import { Abertura, Envelope, Orbe, Secao } from "@/components/estrutura";
import { IconeAgenda, IconeLoja, IconeSelo, IconeSeta } from "@/components/icones";
import { Subtitulo } from "@/components/tipografia";
import { paraQuem, simulador } from "@/conteudo/site";

/** Um ícone por público, na ordem de paraQuem.publicos. */
const ICONES = [IconeLoja, IconeAgenda, IconeSelo];

/**
 * Os três públicos em blocos brancos sobre a névoa, cada um aberto por
 * um ícone de traço solto, em bronze. No hover, o bloco sobe, a aresta
 * acende e um orbe de bronze segue o ponteiro (da branchCto; o orbe saiu
 * em 03/10 pela regra 3 das Diretrizes de Design Premium e voltou no mesmo
 * dia, a pedido do usuário: é parte da identidade do site). No pé de cada
 * bloco, o exemplo pronto daquele público: um dos três sites de
 * demonstração, com a cor da marca dele, aberto em nova aba.
 */
export function ParaQuem() {
  return (
    <Secao id="quem" tom="claro">
      <Envelope>
        <Abertura titulo={paraQuem.titulo} />
        {/* No celular, galeria de deslizar (vidro.css, .vd-galeria); a partir de 768 px, as três colunas. */}
        <div className="vd-galeria-quadro mt-16 md:mt-20" style={{ "--galeria-polegar": 1 / paraQuem.publicos.length } as React.CSSProperties}>
          <div className="vd-galeria gap-5 md:grid md:grid-cols-3 md:gap-6">
            {paraQuem.publicos.map((publico, i) => {
              const Icone = ICONES[i];
              const site = simulador.sites.find((s) => s.plano === publico.plano);
              return (
                <article key={publico.titulo} className="vd-bloco vd-luz vd-aresta flex flex-col rounded-xl bg-card p-8 md:p-10">
                  <Orbe />
                  <Icone className="size-10 text-accent" />
                  <Subtitulo className="mt-7">{publico.titulo}</Subtitulo>
                  <p className="mt-3 text-corpo text-muted-foreground">{publico.texto}</p>
                  {site && (
                    // mt-auto leva o exemplo ao pé do bloco; pt-7 garante a folga mínima.
                    <div className="mt-auto pt-7">
                      <a
                        href={site.caminho}
                        target="_blank"
                        rel="noopener"
                        className="group/exemplo flex min-h-11 items-center gap-2.5 border-t border-border pt-5 text-nota no-underline"
                      >
                        {/* A cor da marca do site: o ponto no tom do nicho (app/nichos.css). */}
                        <span data-tom={site.tom} aria-hidden="true" className="size-2.5 flex-none rounded-full bg-primary" />
                        <span className="flex flex-col">
                          <span className="text-rotulo text-muted-foreground">{paraQuem.exemplo}</span>
                          <span className="font-semibold text-foreground transition-colors duration-300 group-hover/exemplo:text-accent">
                            {site.nome}
                          </span>
                        </span>
                        <IconeSeta className="ml-auto size-3.5 flex-none text-accent transition-transform duration-300 group-hover/exemplo:translate-x-0.5" />
                      </a>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
          <div aria-hidden="true" className="vd-galeria-trilho" />
        </div>
      </Envelope>
    </Secao>
  );
}

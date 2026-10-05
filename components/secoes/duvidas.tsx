import { Envelope, Secao } from "@/components/estrutura";
import { duvidas } from "@/conteudo/duvidas";

/**
 * <details> nativo: abre e fecha sem script, e a busca do navegador
 * encontra as respostas. A altura anima onde o navegador sabe animar para
 * "auto" (vd-duvida, app/vidro.css); o "+" gira até virar "×".
 */
export function Duvidas() {
  return (
    <Secao id="duvidas" tom="claro">
      <Envelope>
        <div className="mx-auto max-w-3xl rounded-xl bg-card px-8 md:px-10">
          {duvidas.map((d, i) => (
            <details key={d.pergunta} id={`duvida-${i + 1}`} open={i === 0} className="vd-duvida group scroll-mt-28 border-b border-border last:border-b-0">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-sub text-corpo font-medium tracking-sub transition-colors duration-300 ease-atlas hover:text-accent [&::-webkit-details-marker]:hidden">
                <span className="flex items-baseline gap-5">
                  {/* O índice da pergunta, em bronze, como num documento. */}
                  <span aria-hidden="true" className="w-7 flex-none font-display text-nota tracking-wide text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {d.pergunta}
                </span>
                <span
                  aria-hidden="true"
                  className="relative size-7 flex-none rounded-full bg-muted transition-[transform,background-color] duration-500 ease-atlas group-open:rotate-[135deg] group-hover:bg-foreground/10"
                >
                  <span className="absolute top-1/2 left-1/2 h-px w-3 -translate-1/2 bg-current" />
                  <span className="absolute top-1/2 left-1/2 h-3 w-px -translate-1/2 bg-current" />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 text-corpo text-muted-foreground">{d.resposta}</p>
            </details>
          ))}
        </div>
      </Envelope>
    </Secao>
  );
}

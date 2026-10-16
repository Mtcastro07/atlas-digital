import { Envelope, Secao } from "@/components/estrutura";
import { duvidas } from "@/conteudo/duvidas";

/**
 * <details> nativo: abre e fecha sem script, e a busca do navegador
 * encontra as respostas. A altura anima onde o navegador sabe animar para
 * "auto" (vd-duvida, app/vidro.css); o "+" gira até virar "×". Desde
 * 16/10, direto na névoa, entre dois filetes, e sem o índice de 01 a 10:
 * até então, num painel branco (mais um cartão numa cena clara) e com o
 * número que o mapa da abertura já mostrava (o crítico de fora).
 */
export function Duvidas() {
  return (
    <Secao id="duvidas" tom="claro">
      <Envelope>
        <div className="mx-auto max-w-3xl border-y border-border">
          {duvidas.map((d, i) => (
            <details key={d.pergunta} id={`duvida-${i + 1}`} open={i === 0} className="vd-duvida group scroll-mt-28 border-b border-border last:border-b-0">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-sub text-corpo font-medium tracking-sub transition-colors duration-300 ease-atlas hover:text-accent [&::-webkit-details-marker]:hidden">
                <span>{d.pergunta}</span>
                <span
                  aria-hidden="true"
                  className="relative size-7 flex-none rounded-full bg-muted transition-[transform,background-color] duration-500 ease-atlas group-open:rotate-[135deg] group-hover:bg-foreground/10"
                >
                  <span className="absolute top-1/2 left-1/2 h-px w-3 -translate-1/2 bg-current" />
                  <span className="absolute top-1/2 left-1/2 h-3 w-px -translate-1/2 bg-current" />
                </span>
              </summary>
              <p className="max-w-[56ch] pb-6 text-corpo text-muted-foreground">{d.resposta}</p>
            </details>
          ))}
        </div>
      </Envelope>
    </Secao>
  );
}

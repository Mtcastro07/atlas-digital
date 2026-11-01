import { faixa } from "@/conteudo/site";
import { cn } from "@/lib/utils";

/**
 * Faixa corrida com os nichos, sob os destaques do início (a do site de
 * 28/08, com o globo da marca como separador, desenhado em CSS:
 * .vd-separador; volta na fusão de 01/10, da branchCto).
 * Em Inter, como no site de 28/08, em peso médio, no degrau do lide (text-destaque, 18
 * a 21 px; até 03/10, de 17 a 24 px), e 20 px de cada lado do globo (até
 * 03/10, 1,1 em, fora da escala). Contínua:
 * corre devagar, para sob o ponteiro, pausa fora da tela e pelo botão do
 * cabeçalho; com movimento reduzido, fica parada (app/movimento.css). A lista vai duas vezes para
 * o laço não ter emenda. Decorativa: os nichos não são conteúdo de que a
 * página dependa, e a segunda cópia repetiria a primeira na leitura.
 */
export function Faixa({ className }: { className?: string }) {
  const trilha = (
    <ul className="flex flex-none items-center">
      {faixa.nichos.map((nicho) => (
        <li key={nicho} className="vd-separador flex items-center gap-5 pr-5 whitespace-nowrap">
          {nicho}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      aria-hidden="true"
      data-ambiente
      className={cn(
        "mov-faixa-pai overflow-hidden border-y border-border py-6 text-destaque font-medium text-foreground/75 md:py-7",
        className
      )}
    >
      <div className="mov-faixa flex w-max">
        {trilha}
        {trilha}
      </div>
    </div>
  );
}

import { atraso, cena, envelope, metadadosDe, paginaDe, recuoDoVidro, textoEmbaixo, TituloQueSeCompoe } from "@/components/demos/barbearia/pecas";
import { AgendaDeRetorno } from "@/components/ilhas/demos/agenda-da-barbearia";
import { barbeariaSite as site } from "@/conteudo/demos/barbearia";

export const metadata = metadadosDe("retorno");

/**
 * 05 · Retorno. A funcionalidade 2 do plano Completo, com a ficha oitavada
 * das janelas de cada corte em cena:
 * o corte e a data do último atendimento devolvem a janela sugerida e a
 * régua dos dias; "Agendar o retorno" leva ao agendador com o serviço
 * marcado.
 */
export default function PaginaDoRetorno() {
  const { retorno } = site;
  return (
    <div className="bb-pagina">
      <section aria-labelledby="titulo" {...cena("retorno", "direita")} className={`flex min-h-[78vh] items-end pt-32 pb-16 ${textoEmbaixo}`}>
        <div className={`${envelope} w-full`}>
          <div className="lg:max-w-[60%]">
            <p className="mov-entra bb-rotulo text-accent">05 · Retorno</p>
            <TituloQueSeCompoe id="titulo" linhas={retorno.titulo} className="mt-8 text-[clamp(64px,9vw,150px)] leading-[0.86]" />
            <p className="mov-entra mt-8 max-w-[46ch] text-[18px] leading-relaxed text-muted-foreground" style={atraso(700)}>
              {retorno.lide}
            </p>
          </div>
        </div>
      </section>
      <section aria-label="Agenda de retorno" className="pb-32">
        <div className={envelope}>
          <div className={`bb-vidro rounded-[36px] ${recuoDoVidro}`} data-revelar>
            <AgendaDeRetorno dados={retorno} agendar={paginaDe("agendar").caminho} />
          </div>
        </div>
      </section>
    </div>
  );
}

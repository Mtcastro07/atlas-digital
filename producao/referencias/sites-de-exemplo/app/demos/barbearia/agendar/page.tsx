import { atraso, cena, envelope, metadadosDe, recuoDoVidro, textoEmbaixo, TituloQueSeCompoe } from "@/components/demos/barbearia/pecas";
import { Agendador } from "@/components/ilhas/demos/agenda-da-barbearia";
import { whatsappFicticio } from "@/conteudo/demos/comum";
import { barbeariaSite as site } from "@/conteudo/demos/barbearia";

export const metadata = metadadosDe("agendar");

/**
 * 04 · Agendar. A funcionalidade 1 do plano Completo, num painel de vidro
 * escuro sobre a moeda da casa, que segue balançando atrás. Chega com o serviço
 * marcado quando o endereço traz #servico-<id>.
 */
export default function PaginaDoAgendamento() {
  const { agendador, servicos, equipe } = site;
  return (
    <div className="bb-pagina">
      <section aria-labelledby="titulo" {...cena("selo", "direita")} className={`flex min-h-[78vh] items-end pt-32 pb-16 ${textoEmbaixo}`}>
        <div className={`${envelope} w-full`}>
          <div className="lg:max-w-[60%]">
            <p className="mov-entra bb-rotulo text-accent">04 · Agendar</p>
            <TituloQueSeCompoe id="titulo" linhas={agendador.titulo} className="mt-8 text-[clamp(56px,7.4vw,124px)] leading-[0.9]" />
            <p className="mov-entra mt-8 max-w-[46ch] text-[18px] leading-relaxed text-muted-foreground" style={atraso(800)}>
              {agendador.lide}
            </p>
          </div>
        </div>
      </section>
      <section aria-label="Agendador" className="pb-32">
        <div className={envelope}>
          <div className={`bb-vidro rounded-[36px] ${recuoDoVidro}`} data-revelar>
            <Agendador agendador={agendador} servicos={servicos} equipe={equipe} whatsapp={whatsappFicticio} />
          </div>
        </div>
      </section>
    </div>
  );
}

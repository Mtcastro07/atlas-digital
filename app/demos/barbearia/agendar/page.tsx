import { cena, envelope, metadadosDe, palcoVazio, recuoDoVidro, TituloQueSeCompoe } from "@/components/demos/barbearia/pecas";
import { Agendador } from "@/components/ilhas/demos/agenda-da-barbearia";
import { whatsappFicticio } from "@/conteudo/demos/comum";
import { barbeariaSite as site } from "@/conteudo/demos/barbearia";

export const metadata = metadadosDe("agendar");

/**
 * 04 · Agendar. A funcionalidade 1 do plano Completo, num painel de vidro
 * escuro, quieto desde o HTML (ferramenta não entra em cena). Na mesa, a
 * ficha do serviço escolhido fica ao lado do título: o agendador escreve o
 * data-objeto da abertura (data-abertura-agendar), e a ficha vira em 300 ms
 * a cada troca de serviço (data-virada). Chega com o serviço marcado quando
 * o endereço traz #servico-<id>.
 * Correção de 14/10, depois do crítico de fora: no celular, a ficha ficava
 * no alto da abertura e virava fora da vista enquanto se escolhia; na mesa,
 * ficava presa atrás do vidro, cortada pela borda do painel. Agora, no
 * celular, a abertura não tem ficha (o agendador sobe para a primeira
 * tela), e a resposta à escolha fica na própria opção: a miniatura da ficha
 * vira de frente (MiniFicha). Na mesa, o palco se apaga quando o painel
 * chega ao meio da tela (palcoVazio). O pedido parte do primeiro horário
 * livre pelo relógio da casa (lib/demos/barbearia/pedido.ts).
 * Desde 16/10 (o Impeccable: o painel começava em y = 775 a 1440 × 900), a
 * abertura tem 80vh na mesa, e não 86: o painel sobe à borda de baixo da
 * ficha (~80% da altura), e as opções de serviço entram na primeira tela.
 * Mais alto, ele passaria do quarto de baixo da tela já na carga, e o palco
 * apagaria a ficha do serviço, que é o momento da página (palcoVazio).
 */
export default function PaginaDoAgendamento() {
  const { agendador, servicos, equipe } = site;
  return (
    <div>
      <section
        aria-labelledby="titulo"
        {...cena("classico", "direita", { soComputador: true })}
        data-abertura-agendar
        data-virada="300"
        className="flex items-end pt-32 pb-12 lg:min-h-[80vh] lg:pb-16"
      >
        <div className={`${envelope} w-full`}>
          <div className="lg:max-w-[60%]">
            <TituloQueSeCompoe id="titulo" italico={false} linhas={agendador.titulo} className="text-[clamp(52px,7.4vw,124px)] leading-[0.9]" />
            <p className="mt-8 max-w-[46ch] text-[18px] leading-relaxed text-muted-foreground">{agendador.lide}</p>
          </div>
        </div>
      </section>
      <section aria-label="Agendador" {...palcoVazio} className="pb-32">
        <div className={envelope}>
          <div className={`bb-vidro rounded-[36px] ${recuoDoVidro}`}>
            <Agendador agendador={agendador} servicos={servicos} equipe={equipe} expediente={site.expediente} whatsapp={whatsappFicticio} />
          </div>
        </div>
      </section>
    </div>
  );
}

import { envelope, metadadosDe, paginaDe, recuoDoVidro, TituloQueSeCompoe } from "@/components/demos/barbearia/pecas";
import { AgendaDeRetorno } from "@/components/ilhas/demos/agenda-da-barbearia";
import { barbeariaSite as site } from "@/conteudo/demos/barbearia";

export const metadata = metadadosDe("retorno");

/**
 * 05 · Retorno. A funcionalidade 2 do plano Completo: o corte e a data do
 * último atendimento devolvem a janela sugerida e a régua dos dias, que
 * abre a janela a cada escolha; "Agendar o retorno" leva ao agendador com o
 * serviço marcado. O momento da página é a régua (barbearia.css, .bb-regua).
 * Correção de 14/10, depois do crítico de fora: a abertura era a mesma tela
 * do Agendar (a ficha oitavada grande à direita, o título à esquerda e o
 * painel embaixo) e, no celular, a ficha de bronze ficava escura e quase
 * ilegível a 390 px. Agora a página não tem ficha e abre com a ferramenta:
 * na mesa, o título fica parado numa coluna à esquerda (sticky) enquanto o
 * painel, à direita, sobe com a rolagem, e a régua já aparece na primeira
 * tela; no celular, o título e, logo abaixo, a ferramenta.
 * Desde 16/10 (o crítico de fora: no celular, a primeira tela era a do
 * Agendar, com o mesmo painel de vidro e a mesma grade 2 × 2 de opções), no
 * celular a ferramenta fica sem o vidro, e os cortes são uma lista em linhas.
 */
export default function PaginaDoRetorno() {
  const { retorno } = site;
  return (
    <section aria-labelledby="titulo" className="pt-32 pb-32 lg:pt-36">
      <div className={`${envelope} grid gap-12 lg:grid-cols-12 lg:gap-10`}>
        <div className="lg:sticky lg:top-36 lg:col-span-4 lg:self-start">
          <TituloQueSeCompoe id="titulo" italico={false} linhas={retorno.titulo} className="text-[clamp(64px,9vw,150px)] leading-[0.86]" />
          <p className="mt-8 max-w-[46ch] text-[18px] leading-relaxed text-muted-foreground">{retorno.lide}</p>
        </div>
        {/* O vidro só na mesa (desde 16/10): no celular, a ferramenta fica sobre a noite, como um formulário impresso, e não no mesmo painel do Agendar (barbearia.css, .bb-vidro-mesa). */}
        <div className={`bb-vidro bb-vidro-mesa rounded-[36px] lg:col-span-8 ${recuoDoVidro}`}>
          <AgendaDeRetorno dados={retorno} agendar={paginaDe("agendar").caminho} />
        </div>
      </div>
    </section>
  );
}

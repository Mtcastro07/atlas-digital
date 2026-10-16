import { Moldura } from "@/components/demos/deposito/moldura";
import { BotaoWhatsApp, CodigoDeBarras, envelope, Linhas, metadadosDe, Numerador } from "@/components/demos/deposito/pecas";
import { PedidoPorMensagem } from "@/components/ilhas/demos/pedido-por-mensagem";
import { whatsappFicticio } from "@/conteudo/demos/comum";
import { depositoSite as site } from "@/conteudo/demos/deposito";

export const metadata = metadadosDe("orcamento");

/**
 * 04 · Orçamento. O formulário do plano Profissional como um talão de
 * pedido, com o número, o código de barras e o picote (ilha
 * PedidoPorMensagem); ao lado, o horário do balcão numa placa de grafite.
 * O formulário fica sóbrio (14.10.2026): o talão já não sobe ao abrir a
 * página (era a mesma entrada do título, em todas as páginas), e a placa
 * do horário perde a faixa zebrada, que se repetia a 500 px da do
 * cabeçalho na mesma tela e copiava a máquina da calculadora: o horário
 * não tem perigo a sinalizar. Sem script, o envio vira o botão do
 * WhatsApp do balcão (<noscript>), porque o formulário sem script só
 * recarregaria a página. O momento da página (15.10.2026): o número do
 * talão carimbado na carga.
 *
 * 16.10.2026 (crítico de fora: a mesma abertura das outras páginas, e um
 * momento que quase não se via, um número de 20 px que batia em 180 ms):
 * a página abre no próprio talão, com o título e o lide impressos no alto
 * dele, no papel quadriculado; a placa do horário fica ao lado, na mesa, e
 * embaixo, no celular. O número do talão sobe de tamanho e vira o momento
 * da página de outro jeito: as rodas do numerador giram até ele, na carga
 * (Numerador, pecas.tsx). Os campos perdem o número (01 a 04), que não é
 * sequência (pedido-por-mensagem.tsx).
 */
export default function PaginaDoOrcamento() {
  const { orcamento, horario } = site;
  return (
    <Moldura pagina="orcamento">
      {/* O talão e a placa do horário com o mesmo recuo dos painéis do site, 28/40 px (até 03/10, a placa ficava em 28 px ao lado do talão em 40). O talão, com a sombra de 70 px a 50% (saiu em 03/10 pela regra 3 das Diretrizes de Design Premium e voltou no mesmo dia, a pedido do usuário: é parte da identidade do site). */}
      {/* Uma coluna até o computador (grid-cols-1, minmax(0, 1fr)): sem ela, a coluna crescia até a largura mínima do conteúdo e empurrava o talão e a placa 3 px para fora da tela em 320 px (até 07/10). */}
      <section aria-labelledby="titulo" className="dp-quadriculado border-b border-border">
        <div className={`${envelope} grid grid-cols-1 gap-12 pt-8 pb-24 lg:grid-cols-12 lg:pt-14`}>
          <div className="lg:col-span-8">
            <div className="border border-foreground/25 bg-card shadow-[0_30px_70px_-40px_rgb(21_25_30/0.5)]">
              {/* O alto do talão (16.10.2026): o nome do talão, o código da casa e o numerador à direita; o título e o lide da página impressos nele; o código de barras no pé, junto do picote. */}
              <div className="border-b-2 border-dashed border-foreground/40 px-7 pt-7 pb-8 md:px-10 md:pt-9">
                <div className="flex items-start justify-between gap-6">
                  <p>
                    <span className="dp-exibicao block text-[18px] leading-none sm:text-[20px]">{orcamento.talao}</span>
                    <span className="dp-codigo mt-2 block text-muted-foreground">{site.codigo}</span>
                  </p>
                  {/* O número no carimbo do numerador, na tinta laranja, inclinado (parado); as rodas giram até ele na carga (.dp-roda-fita). */}
                  <Numerador
                    numero={orcamento.numero}
                    className="dp-carimbo dp-exibicao inline-block flex-none border-2 border-current px-2.5 py-1.5 text-[26px] tracking-[0.04em] text-accent sm:text-[32px]"
                  />
                </div>
                <h1 id="titulo" className="dp-exibicao mt-8 dp-titulo text-[clamp(44px,5.2vw,84px)] md:mt-10">
                  <Linhas linhas={orcamento.titulo} />
                </h1>
                <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
                  <p className="max-w-[44ch] text-[18px] leading-relaxed text-muted-foreground">{orcamento.lide}</p>
                  {/* O código de barras, 112 px no celular e 144 px do tablet em diante: em 320 px, o de 144 px empurrava o talão 6 px para fora da tela (até 07/10). */}
                  <CodigoDeBarras texto={`${site.codigo}-${orcamento.numero.replace(/\D/g, "")}`} className="w-28 flex-none sm:w-36" />
                </div>
              </div>
              <div className="p-7 md:p-10">
                <PedidoPorMensagem dados={orcamento} whatsapp={whatsappFicticio} />
                <noscript>
                  <div className="border-t border-dashed border-foreground/40 pt-7">
                    <BotaoWhatsApp grande />
                  </div>
                </noscript>
              </div>
            </div>
          </div>

          <aside aria-labelledby="horario" className="lg:col-span-4">
            <div className="dp-grafite">
              <div className="p-7 md:p-10">
                <h2 id="horario" className="dp-exibicao text-[30px] leading-none">
                  {horario.titulo}
                </h2>
                <dl className="mt-6">
                  {horario.dias.map((h) => (
                    <div key={h.dia} className="flex items-baseline justify-between gap-6 border-t border-border py-3.5">
                      <dt className="text-[15px] text-muted-foreground">{h.dia}</dt>
                      <dd className="dp-exibicao text-[22px] tracking-[0.03em]">{h.hora}</dd>
                    </div>
                  ))}
                </dl>
                {/* Sem o endereço logo antes do rodapé, que o repete (16.10.2026, Impeccable; kit 20, a mesma falha corrigida em A casa); a nota do pátio, que o rodapé não tem, fica na placa. */}
                <p className="mt-5 border-t border-border pt-4 text-[15px] leading-relaxed text-muted-foreground">{horario.nota}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Moldura>
  );
}

import { Moldura } from "@/components/demos/deposito/moldura";
import { Abertura, CodigoDeBarras, envelope, metadadosDe } from "@/components/demos/deposito/pecas";
import { PedidoPorMensagem } from "@/components/ilhas/demos/pedido-por-mensagem";
import { whatsappFicticio } from "@/conteudo/demos/comum";
import { depositoSite as site } from "@/conteudo/demos/deposito";

export const metadata = metadadosDe("orcamento");

/**
 * 04 · Orçamento. O formulário do plano Profissional como um talão de
 * pedido, com o número, o código de barras e o picote (ilha
 * PedidoPorMensagem); ao lado, o horário do balcão numa placa de grafite.
 */
export default function PaginaDoOrcamento() {
  const { orcamento, horario } = site;
  return (
    <Moldura pagina="orcamento">
      <Abertura pagina="orcamento" titulo={orcamento.titulo} lide={orcamento.lide} />

      {/* O talão e a placa do horário com o mesmo recuo dos painéis do site, 28/40 px (até 03/10, a placa ficava em 28 px ao lado do talão em 40). O talão, com a sombra de 70 px a 50% (saiu em 03/10 pela regra 3 das Diretrizes de Design Premium e voltou no mesmo dia, a pedido do usuário: é parte da identidade do site). */}
      <section aria-label={orcamento.talao} className={`${envelope} grid gap-12 py-16 pb-24 lg:grid-cols-12 lg:py-20`}>
        <div className="lg:col-span-8">
          <div className="dp-entra-pagina border border-foreground/25 bg-card shadow-[0_30px_70px_-40px_rgb(21_25_30/0.5)]">
            <div className="flex items-center justify-between gap-6 border-b-2 border-dashed border-foreground/40 px-7 py-5 md:px-10">
              <p>
                <span className="dp-exibicao block text-[22px] leading-none">{orcamento.talao}</span>
                <span className="dp-codigo mt-2 block text-muted-foreground">
                  {site.codigo} · {orcamento.numero}
                </span>
              </p>
              <CodigoDeBarras texto={`${site.codigo}-${orcamento.numero.replace(/\D/g, "")}`} className="w-36 flex-none" />
            </div>
            <div className="p-7 md:p-10">
              <PedidoPorMensagem dados={orcamento} whatsapp={whatsappFicticio} />
            </div>
          </div>
        </div>

        <aside aria-labelledby="horario" className="lg:col-span-4">
          <div className="dp-grafite">
            <span aria-hidden="true" className="vd-zebrada block h-1.5" />
            <div className="p-7 md:p-10">
              <h2 id="horario" className="dp-exibicao text-[30px] leading-none">
                {horario.titulo}
              </h2>
              <dl className="mt-6">
                {horario.dias.map((h) => (
                  <div key={h.dia} className="flex items-baseline justify-between gap-6 border-t border-border py-3.5">
                    <dt className="text-[15px] text-muted-foreground">{h.dia}</dt>
                    <dd className="dp-exibicao text-[22px] tracking-[0.03em] tabular-nums">{h.hora}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <address className="mt-6 text-[16px] leading-relaxed not-italic">
            <span className="dp-codigo block text-accent">Endereço</span>
            {site.endereco}, {site.bairro}
            <br />
            <span className="text-muted-foreground">{horario.nota}</span>
          </address>
        </aside>
      </section>
    </Moldura>
  );
}

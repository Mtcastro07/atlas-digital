import { Moldura } from "@/components/demos/deposito/moldura";
import { Abertura, atraso, envelope, metadadosDe } from "@/components/demos/deposito/pecas";
import { CalculadoraDeMateriais } from "@/components/ilhas/demos/calculadora";
import { whatsappFicticio } from "@/conteudo/demos/comum";
import { depositoSite as site } from "@/conteudo/demos/deposito";

export const metadata = metadadosDe("calculadora");

const indice = (valor: number) => valor.toLocaleString("pt-BR", { maximumFractionDigits: 2 });

/**
 * 02 · Calculadora. A funcionalidade sob medida do plano Profissional: a
 * máquina de grafite que imprime o cupom (ilha CalculadoraDeMateriais).
 * Embaixo, os índices de consumo que ela usa, por serviço — a conta à
 * vista, como o balcão a faria.
 */
export default function PaginaDaCalculadora() {
  const { calculadora } = site;
  return (
    <Moldura pagina="calculadora">
      <Abertura pagina="calculadora" titulo={calculadora.titulo} lide={calculadora.lide} />

      <section aria-label={calculadora.rotulos.painel} className={`${envelope} py-16 lg:py-20`}>
        <CalculadoraDeMateriais dados={calculadora} whatsapp={whatsappFicticio} />
      </section>

      <section aria-labelledby="indices" className={`${envelope} pb-24`}>
        <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-foreground pb-5">
          <h2 id="indices" className="dp-exibicao text-[clamp(32px,3.6vw,54px)] leading-none">
            {calculadora.indices.titulo}
          </h2>
          <p className="max-w-[48ch] text-[16px] text-muted-foreground">{calculadora.indices.lide}</p>
        </div>
        <div className="grid border-l border-foreground/25 md:grid-cols-2 lg:grid-cols-4">
          {calculadora.servicos.map((servico, i) => (
            <div key={servico.id} data-revelar style={atraso(i * 80)} className="border-r border-b border-foreground/25 p-6">
              <p className="dp-codigo text-accent">S-{String(i + 1).padStart(2, "0")}</p>
              <h3 className="dp-exibicao mt-3 text-[26px] leading-none">{servico.nome}</h3>
              <dl className="mt-5">
                {servico.itens.map((item) => (
                  <div key={item.nome} className="flex items-baseline justify-between gap-4 border-t border-dashed border-foreground/30 py-2.5 text-[14.5px]">
                    <dt className="leading-snug">{item.nome}</dt>
                    <dd className="dp-mono flex-none text-[12.5px] whitespace-nowrap">
                      {indice(item.porM2)} {item.unidade}/m²
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>
    </Moldura>
  );
}

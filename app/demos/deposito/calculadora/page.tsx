import { Moldura } from "@/components/demos/deposito/moldura";
import { Abertura, envelope, metadadosDe, paginaDe } from "@/components/demos/deposito/pecas";
import { CalculadoraDeMateriais } from "@/components/ilhas/demos/calculadora";
import { whatsappFicticio } from "@/conteudo/demos/comum";
import { depositoSite as site } from "@/conteudo/demos/deposito";

export const metadata = metadadosDe("calculadora");

const indice = (valor: number) => valor.toLocaleString("pt-BR", { maximumFractionDigits: 2 });

/**
 * 02 · Calculadora. A funcionalidade sob medida do plano Profissional: a
 * máquina de grafite que imprime o cupom (ilha CalculadoraDeMateriais).
 * Embaixo, os índices de consumo que ela usa, por serviço — a conta à
 * vista, como o balcão a faria. O momento da página (15.10.2026): o cupom
 * sai da boca da máquina na carga (na mesa) ou quando a boca entra na tela
 * (abaixo de 1024 px), e depois reimprime quando o serviço ou a perda
 * mudam à mão (na ilha). Até 15.10, a página abria parada (crítico de fora),
 * e o cupom impresso estava na página inicial, numa cena que copiava esta.
 * Os índices ficam quietos: são dado de consulta.
 */
export default function PaginaDaCalculadora() {
  const { calculadora } = site;
  return (
    <Moldura pagina="calculadora">
      <Abertura pagina="calculadora" titulo={calculadora.titulo} lide={calculadora.lide} />

      <section aria-label={calculadora.rotulos.painel} className={`${envelope} py-16 lg:py-20`}>
        <CalculadoraDeMateriais dados={calculadora} whatsapp={whatsappFicticio} orcamento={paginaDe("orcamento").caminho} />
      </section>

      <section aria-labelledby="indices" className={`${envelope} pb-24`}>
        <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-foreground pb-5">
          <h2 id="indices" className="dp-exibicao dp-titulo text-[clamp(32px,3.6vw,54px)]">
            {calculadora.indices.titulo}
          </h2>
          <p className="max-w-[48ch] text-[16px] text-muted-foreground">{calculadora.indices.lide}</p>
        </div>
        {/* A folha de índices (15.10.2026, crítico de fora): até ali, quatro casas iguais (S-01 a S-04, com o código laranja no topo), a mesma grade do painel, do método e dos fatos de A casa. Agora uma tabela só, o serviço na margem, como a tabela de consumo do balcão. No celular, o serviço vira a linha de cima do grupo (deposito.css, .dp-indices). */}
        <table className="dp-indices w-full text-left">
          <caption className="sr-only">{calculadora.indices.titulo}</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">{calculadora.rotulos.servico}</th>
              <th scope="col">{calculadora.rotulos.material}</th>
              <th scope="col">Consumo por m²</th>
            </tr>
          </thead>
          {calculadora.servicos.map((servico) => (
            <tbody key={servico.id} className="border-b border-foreground/25">
              {servico.itens.map((item, k) => (
                <tr key={item.nome}>
                  {k === 0 && (
                    <th scope="rowgroup" rowSpan={servico.itens.length} className="dp-exibicao w-[34%] pt-6 pr-8 pb-5 align-top text-[clamp(28px,2.8vw,40px)] leading-none">
                      {servico.nome}
                    </th>
                  )}
                  <td className={`py-3.5 pr-6 text-[16px] leading-snug ${k ? "border-t border-dashed border-foreground/30" : "pt-6"}`}>{item.nome}</td>
                  <td className={`dp-mono py-3.5 text-right text-[13.5px] whitespace-nowrap ${k ? "border-t border-dashed border-foreground/30" : "pt-6"}`}>
                    {indice(item.porM2)} {item.unidade}/m²
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </section>
    </Moldura>
  );
}

import { Moldura } from "@/components/demos/deposito/moldura";
import { Abertura, atraso, BotaoWhatsApp, CodigoDeBarras, envelope, metadadosDe } from "@/components/demos/deposito/pecas";
import { SetasDaGaleria } from "@/components/ilhas/demos/setas-da-galeria";
import { depositoSite as site } from "@/conteudo/demos/deposito";

export const metadata = metadadosDe("materiais");

/**
 * 01 · Materiais. A galeria do balcão (item do plano Profissional): as
 * seis famílias como etiquetas de produto — textura gerada no lugar da
 * foto, o furo do arame, o código, a unidade de venda e o código de
 * barras —, numa faixa com rolagem lateral e setas. Depois, a tabela de
 * referência, como numa ficha técnica.
 */
export default function PaginaDosMateriais() {
  const { materiais } = site;
  return (
    <Moldura pagina="materiais">
      <Abertura pagina="materiais" titulo={materiais.titulo} lide={materiais.lide}>
        <p className="dp-codigo text-muted-foreground">
          {materiais.itens.length} famílias · {materiais.itens[0].codigo} a {materiais.itens.at(-1)!.codigo}
        </p>
      </Abertura>

      <section aria-labelledby="galeria" className="overflow-hidden py-20">
        <div className={`${envelope} flex flex-wrap items-end justify-between gap-8`}>
          <h2 id="galeria" className="dp-exibicao text-[clamp(30px,3vw,44px)] leading-none">
            Galeria do balcão
          </h2>
          <SetasDaGaleria alvo="materiais" rotulos={["Materiais anteriores", "Próximos materiais"]} />
        </div>
        <ul
          data-galeria="materiais"
          className="dp-galeria mt-10 flex scroll-pl-5 gap-5 overflow-x-auto px-5 pb-6 md:scroll-pl-10 md:px-10 lg:scroll-pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))] lg:px-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))]"
        >
          {materiais.itens.map((m, i) => (
            <li
              key={m.codigo}
              data-revelar
              style={atraso(i * 70)}
              className="dp-etiqueta dp-chanfro relative w-[80vw] max-w-[360px] flex-none border border-foreground/25 bg-card sm:w-[340px]"
            >
              <div className="relative h-[230px] overflow-hidden">
                <div aria-hidden="true" className={`dp-textura dp-textura-${m.textura} absolute inset-0`} />
                <span aria-hidden="true" className="dp-furo absolute top-5 left-5" />
              </div>
              <div className="p-6">
                <p className="dp-codigo text-accent">{m.codigo}</p>
                <h3 className="dp-exibicao mt-3 text-[28px] leading-none">{m.nome}</h3>
                <p className="mt-3 min-h-[3.2em] text-[15.5px] leading-snug text-muted-foreground">{m.texto}</p>
                <div className="mt-5 flex items-end justify-between gap-5 border-t border-dashed border-foreground/40 pt-4">
                  <p className="dp-mono text-[12.5px] leading-snug">
                    <span className="block text-muted-foreground">UNIDADE</span>
                    {m.unidade}
                  </p>
                  <CodigoDeBarras texto={m.codigo} className="w-28 flex-none" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tabela" className={`${envelope} pb-24`}>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <h2 id="tabela" className="dp-exibicao text-[clamp(36px,4.2vw,64px)] leading-[0.95] lg:col-span-6">
            {materiais.tabela.titulo}
          </h2>
          <p className="text-[17px] leading-relaxed text-muted-foreground lg:col-span-5 lg:col-start-8">{materiais.tabela.lide}</p>
        </div>
        <div className="mt-10 overflow-x-auto border-2 border-foreground" data-revelar>
          {/* No celular, cada linha vira uma ficha (deposito.css, .dp-tabela); os papéis ARIA guardam a semântica de tabela quando o display muda. */}
          <table role="table" className="dp-tabela w-full min-w-[680px] text-left text-[16px]">
            <thead role="rowgroup" className="bg-foreground text-background">
              <tr role="row">
                {materiais.tabela.colunas.map((coluna) => (
                  <th key={coluna} role="columnheader" scope="col" className="dp-codigo px-5 py-3.5 font-medium">
                    {coluna}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody role="rowgroup">
              {materiais.tabela.linhas.map(([codigo, material, unidade, uso]) => (
                <tr key={codigo} role="row" className="border-t border-foreground/15">
                  <td role="cell" className="dp-mono px-5 py-3.5 text-[14px] text-accent">{codigo}</td>
                  <th role="rowheader" scope="row" className="px-5 py-3.5 font-semibold">
                    {material}
                  </th>
                  <td role="cell" className="px-5 py-3.5">{unidade}</td>
                  <td role="cell" className="px-5 py-3.5 text-muted-foreground">{uso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t-2 border-foreground pt-8">
          <p className="dp-exibicao text-[clamp(24px,2.4vw,34px)] leading-tight">{materiais.fecho}</p>
          <BotaoWhatsApp />
        </div>
      </section>
    </Moldura>
  );
}

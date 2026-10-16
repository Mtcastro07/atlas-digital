import { Moldura } from "@/components/demos/deposito/moldura";
import { BotaoWhatsApp, CodigoDeBarras, envelope, Linhas, metadadosDe, ondeABarraSoTemOIcone, RotuloDaPagina } from "@/components/demos/deposito/pecas";
import { SetasDaGaleria } from "@/components/ilhas/demos/setas-da-galeria";
import { depositoSite as site } from "@/conteudo/demos/deposito";

export const metadata = metadadosDe("materiais");

/**
 * 01 · Materiais. A galeria do balcão (item do plano Profissional): as
 * seis famílias como etiquetas de produto — textura gerada no lugar da
 * foto, o furo do arame, o código, a unidade de venda e o código de
 * barras —, numa faixa com rolagem lateral e setas. Depois, a tabela de
 * referência, como numa ficha técnica.
 *
 * O movimento (14.10.2026, pedido do usuário de não repetir o mesmo
 * componente em série): até ali, cada etiqueta e a tabela subiam ao
 * entrar, e a textura aproximava sob o ponteiro em toda etiqueta. Agora o
 * momento é do trilho inteiro, "o trilho anuncia que corre": a lista chega
 * da direita até o lugar, uma vez (.dp-trilho, deposito.css); e cada
 * etiqueta, como a ficha da capa, gira no arame sob o ponteiro e no toque
 * (a peça pendurada pelo furo, um papel, uma resposta). A tabela fica
 * quieta, porque é dado de consulta, e a linha acende à mão. Em 15.10
 * (crítico de fora), a galeria subiu para a primeira tela, o trilho chega
 * de mais longe (96 px na mesa), e os códigos inertes saíram do laranja.
 *
 * 16.10.2026 (crítico de fora: a 390 px, a galeria inteira ficava abaixo
 * da dobra, a primeira tela era só texto, e as quatro páginas internas
 * abriam com a mesma abertura): Materiais abre correndo para o trilho. O
 * título e o lide, e logo embaixo, na mesma cena, sem o filete, as
 * etiquetas; as setas e o nome da galeria vão para a coluna do lide, e a
 * linha "6 famílias · EGH-01 a EGH-06" sai (repetia o que as seis
 * etiquetas, logo abaixo, mostram). As texturas entram na primeira tela
 * também no celular, e o trilho chega na carga em toda largura.
 */
export default function PaginaDosMateriais() {
  const { materiais } = site;
  return (
    <Moldura pagina="materiais">
      <section aria-labelledby="titulo" className="dp-quadriculado overflow-hidden border-b border-border pb-16 lg:pb-20">
        <div className={`${envelope} grid gap-x-10 gap-y-6 pt-10 lg:grid-cols-12 lg:items-end lg:pt-16`}>
          <div className="lg:col-span-7">
            <RotuloDaPagina pagina="materiais" />
            {/* "Ao acabamento." numa linha em toda largura (16.10.2026, Impeccable: o "AO" ficava sozinho na linha a 1440 e a 390, e a 320 "ACABAMENTO." passava 16 px da coluna). A linha mede ~7,06 vezes o corpo: abaixo de 1024 px, o corpo acompanha a tela até 52 px; na mesa, até 98 (a coluna de 707 px a 1440). */}
            <h1 id="titulo" className="dp-exibicao dp-titulo mt-6 text-[clamp(38px,calc(13.5vw-5px),52px)] lg:mt-8 lg:text-[clamp(52px,6.8vw,98px)]">
              <Linhas linhas={materiais.titulo} />
            </h1>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-5 lg:pb-2">
            <p className="max-w-[42ch] text-[18px] leading-relaxed text-muted-foreground">{materiais.lide}</p>
            <div className="flex items-center justify-between gap-6 border-t border-foreground/25 pt-4">
              <h2 id="galeria" className="dp-codigo text-muted-foreground">
                Galeria do balcão
              </h2>
              <SetasDaGaleria alvo="materiais" rotulos={["Materiais anteriores", "Próximos materiais"]} />
            </div>
          </div>
        </div>
        <ul
          data-galeria="materiais"
          data-revelar
          aria-labelledby="galeria"
          className="dp-galeria dp-trilho mt-8 flex scroll-pl-5 gap-5 overflow-x-auto px-5 pb-6 md:scroll-pl-10 md:px-10 lg:scroll-pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))] lg:px-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))]"
        >
          {materiais.itens.map((m) => (
            // O <li> fica parado e recebe o ponteiro; quem gira é a peça de dentro (sem o tremor na borda que recua).
            <li key={m.codigo} className="dp-etiqueta w-[80vw] max-w-[360px] flex-none sm:w-[340px]">
              <div className="dp-etiqueta-peca dp-chanfro relative h-full border border-foreground/25 bg-card">
                <div className="relative h-[230px] overflow-hidden">
                  <div aria-hidden="true" className={`dp-textura dp-textura-${m.textura} absolute inset-0`} />
                  <span aria-hidden="true" className="dp-furo absolute top-5 left-5" />
                </div>
                {/* O código uma vez só, sob o código de barras (16.10.2026, Impeccable: o EGH-01 aparecia acima do nome e de novo sob as barras). */}
                <div className="p-6">
                  <h3 className="dp-exibicao text-[28px] leading-none">{m.nome}</h3>
                  <p className="mt-3 min-h-[3.2em] text-[15.5px] leading-snug text-muted-foreground">{m.texto}</p>
                  <div className="mt-5 flex items-end justify-between gap-5 border-t border-dashed border-foreground/40 pt-4">
                    <p className="dp-mono text-[12.5px] leading-snug">
                      <span className="block text-muted-foreground">UNIDADE</span>
                      {m.unidade}
                    </p>
                    <CodigoDeBarras texto={m.codigo} className="w-28 flex-none" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tabela" className={`${envelope} pt-16 pb-24 lg:pt-20`}>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <h2 id="tabela" className="dp-exibicao dp-titulo text-[clamp(36px,4.2vw,64px)] lg:col-span-6">
            {materiais.tabela.titulo}
          </h2>
          <p className="text-[17px] leading-relaxed text-muted-foreground lg:col-span-5 lg:col-start-8">{materiais.tabela.lide}</p>
        </div>
        <div className="mt-10 overflow-x-auto border-2 border-foreground">
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
                  <td role="cell" className="dp-mono px-5 py-3.5 text-[14px] text-muted-foreground">{codigo}</td>
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
          <div className={ondeABarraSoTemOIcone}>
            <BotaoWhatsApp />
          </div>
        </div>
      </section>
    </Moldura>
  );
}

import { Moldura } from "@/components/demos/nutricao/moldura";
import { Recibo } from "@/components/demos/nutricao/recibo";
import { AcaoWhatsApp, ComMarcaTexto, Continua, entreSecoes, envelope, metadadosDe, Titulo } from "@/components/demos/nutricao/pecas";
import { nutricaoSite as site } from "@/conteudo/demos/nutricao";

export const metadata = metadadosDe("valores");

/**
 * II · Valores. O momento é o recibo (crítico de fora, 14.10.2026): a folha do talão que a consulta deixa para o
 * reembolso, em que o valor por extenso e a assinatura se escrevem (o momento da página). Desde o fechamento com o
 * Impeccable (16.10.2026), o título e, logo abaixo, a carta de valores, com o pontilhado impresso do nome ao preço; na
 * mesa, ao lado dela, a coluna das observações, com o talão em pé (o canhoto em cima), o recibo para reembolso, o
 * pagamento e a ação; no celular, tudo isso depois da carta. Até então, o talão deitado vinha entre o título e a carta,
 * e os preços ficavam abaixo da primeira tela. Embaixo, as perguntas frequentes em entrevista (P. e R.), em duas
 * colunas, no encarte de sálvia — nada fechado em sanfona: na folha, tudo está à vista. O marca-texto passa em
 * "reembolso", nas observações. As perguntas ficam quietas.
 */
export default function PaginaDosValores() {
  const { consultas, duvidas } = site;
  return (
    <Moldura pagina="valores" rotulo="Consultas e valores">
      {/* A carta logo abaixo do título e, ao lado dela na mesa, na coluna das observações, o talão, o momento da página (fechamento com o Impeccable, 16.10.2026: até então, o talão vinha antes, e a primeira linha da carta começava a 851 px numa tela de 900 na mesa, e a ~1.290 px a 390). No celular, a carta, depois o talão e as observações. */}
      <section aria-labelledby="titulo" className={envelope}>
        <div className="relative mt-8 lg:mt-12">
          {/* Na mesa, menor (até 14.10.2026, 8,6vw até 140 px). No celular, o corpo que deixa "estão publicados." numa linha só (até então, três linhas a 360 px). */}
          <Titulo id="titulo" como="h1" linhas={consultas.titulo} className="relative z-[1] text-[min(140px,max(8.6vw,min(60px,calc((100vw-48px)/5.8))))] leading-[0.88] tracking-[-0.036em] lg:text-[clamp(76px,7.4vw,118px)]" />
        </div>
        <div className="mt-8 grid gap-16 lg:grid-cols-12 lg:gap-x-10">
          <section aria-label="Carta de valores" className="lg:col-span-7">
            <ul className="border-t-2 border-foreground">
              {consultas.itens.map((item) => (
                <li key={item.nome} className="border-b border-border py-10 lg:py-7">
                  {/* Abaixo de 640 px, o nome ocupa a linha, e o pontilhado com o preço vem embaixo dele, como no sumário (14.10.2026): o pontilhado tem corpo (até então, 44 px na primeira linha, a 390 px) e nada empurra a página para o lado (até 07/10, 50 px a 320 px). */}
                  <div className="flex flex-wrap items-baseline">
                    <h2 className="nt-exibicao text-[clamp(30px,3.1vw,46px)] leading-tight tracking-[-0.02em] max-sm:basis-full">{item.nome}</h2>
                    {/* Impresso, nas três linhas (o momento da página passou ao recibo, 14.10.2026). */}
                    <span aria-hidden="true" className="nt-pontilhado max-sm:ml-0!" />
                    <p className="nt-exibicao nt-numeros ml-auto flex-none text-[clamp(44px,4.6vw,68px)] leading-none tracking-[-0.03em]">
                      <span className="mr-1.5 align-[0.6em] text-[0.36em] tracking-normal">R$</span>
                      {item.preco}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
                    <p className="max-w-[46ch] text-[18.5px] text-muted-foreground italic">{item.detalhe}</p>
                    <p className="nt-versal text-[17px] whitespace-nowrap text-muted-foreground">{item.duracao}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <aside aria-label="Observações" className="lg:col-span-5">
            <Recibo />
            <p className="mt-10 text-[17.5px] leading-[1.6]">
              <ComMarcaTexto texto={consultas.nota} palavra={consultas.destaque} atraso={1300} />
            </p>
            <p className="mt-4 text-[17.5px] leading-[1.6]">{consultas.pagamento}</p>
            <div className="mt-8">
              <AcaoWhatsApp />
            </div>
          </aside>
        </div>
      </section>

      {/* As perguntas, em entrevista, no encarte de sálvia, de ponta a ponta (crítico de fora, 16.10.2026: Valores era palha do começo ao fim). */}
      <section aria-labelledby="perguntas" className={`nt-campo-salvia ${entreSecoes}`}>
        <div className={`${envelope} py-20 md:py-24 lg:py-28`}>
          <div className="flex flex-wrap items-baseline justify-between gap-6 border-b-2 border-foreground pb-5">
            <h2 id="perguntas" className="nt-exibicao text-[clamp(44px,5vw,80px)] leading-none tracking-[-0.03em]">
              {duvidas.titulo}
            </h2>
            <p className="nt-versal text-[16px] text-muted-foreground">{duvidas.itens.length} perguntas</p>
          </div>
          <div className="mt-14 gap-20 lg:columns-2 lg:[column-rule:1px_solid_var(--border)]">
            {duvidas.itens.map((d) => (
              <div key={d.pergunta} className="mb-14 break-inside-avoid last:mb-0">
                <h3 className="nt-exibicao text-[clamp(26px,2.3vw,32px)] leading-snug tracking-[-0.015em]">
                  <span className="mr-3 text-muted-foreground italic">{duvidas.pergunta}</span>
                  {d.pergunta}
                </h3>
                <p className="mt-4 max-w-[52ch] text-[19px] leading-[1.6]">
                  <span className="nt-exibicao mr-2.5 text-muted-foreground italic">{duvidas.resposta}</span>
                  {d.resposta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Continua pagina="valores" />
    </Moldura>
  );
}

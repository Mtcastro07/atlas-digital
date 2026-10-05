import { Moldura } from "@/components/demos/nutricao/moldura";
import { AcaoWhatsApp, atraso, Continua, entreSecoes, envelope, Folio, metadadosDe, Titulo } from "@/components/demos/nutricao/pecas";
import { nutricaoSite as site } from "@/conteudo/demos/nutricao";

export const metadata = metadadosDe("valores");

/**
 * II · Valores. A carta de valores, com o pontilhado do nome ao preço, as
 * observações na margem e as perguntas frequentes em entrevista (P. e R.),
 * em duas colunas — nada fechado em sanfona: na folha, tudo está à vista.
 */
export default function PaginaDosValores() {
  const { consultas, duvidas } = site;
  // O título das perguntas: a primeira palavra em pé, o resto em itálico.
  const [primeiraPalavra, ...resto] = duvidas.titulo.split(" ");
  return (
    <Moldura pagina="valores">
      <section aria-labelledby="titulo" className={envelope}>
        <Folio pagina="valores" rotulo="Consultas e valores" />
        <Titulo
          id="titulo"
          como="h1"
          linhas={consultas.titulo}
          destaque={consultas.destaque}
          atrasoDoDestaque={700}
          className="dm-entra mt-12 text-[clamp(60px,8.6vw,140px)] leading-[0.88] tracking-[-0.036em]"
        />
      </section>

      <section aria-label="Carta de valores" className={`${envelope} mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12`}>
        <ul className="border-t-2 border-foreground lg:col-span-8">
          {consultas.itens.map((item, i) => (
            <li key={item.nome} data-revelar style={atraso(i * 110)} className="border-b border-border py-10">
              <div className="flex items-baseline">
                <h2 className="nt-exibicao text-[clamp(30px,3.1vw,46px)] leading-tight tracking-[-0.02em]">{item.nome}</h2>
                <span aria-hidden="true" className="nt-pontilhado" />
                <p className="nt-exibicao nt-numeros flex-none text-[clamp(44px,4.6vw,68px)] leading-none tracking-[-0.03em]">
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
        <aside aria-label="Observações" className="lg:col-span-3 lg:col-start-10">
          <p className="nt-versal border-b border-foreground pb-3 text-[16px]">Observações</p>
          <p className="mt-5 text-[17.5px] leading-[1.6]">{consultas.nota}</p>
          <p className="mt-4 text-[17.5px] leading-[1.6]">{consultas.pagamento}</p>
          <div className="mt-8">
            <AcaoWhatsApp />
          </div>
        </aside>
      </section>

      {/* As perguntas, em entrevista. */}
      <section aria-labelledby="perguntas" className={`${envelope} ${entreSecoes}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-6 border-b-2 border-foreground pb-5">
          <h2 id="perguntas" className="nt-exibicao text-[clamp(44px,5vw,80px)] leading-none tracking-[-0.03em]">
            {primeiraPalavra} <span className="italic">{resto.join(" ")}</span>
          </h2>
          <p className="nt-versal text-[16px] text-muted-foreground">{duvidas.itens.length} perguntas</p>
        </div>
        <div className="mt-14 gap-20 lg:columns-2 lg:[column-rule:1px_solid_var(--border)]">
          {duvidas.itens.map((d, i) => (
            <div key={d.pergunta} data-revelar style={atraso(i * 90)} className="mb-14 break-inside-avoid">
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
      </section>

      <Continua pagina="valores" />
    </Moldura>
  );
}

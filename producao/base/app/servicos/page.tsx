// app/servicos/page.tsx — Serviços e valores: o que entra, quanto tempo e quanto custa, antes do contato
// (producao/esteira/03-planos.md, seção 3.3; producao/esteira/nichos/pet-shop.md, seção 4.1). Na mesa, uma tabela: o serviço na
// linha, o porte na coluna. No celular, cada serviço vira uma ficha com uma linha por porte (producao/esteira/07-composicao.md,
// seção 8): nada encolhido, nada rolando de lado. Os rótulos de porte de cada valor são os que o leitor de tela
// lê; a linha de cabeçalho da mesa só os repete para os olhos.
import { AcaoWhatsApp } from "@/components/acao-whatsapp";
import { acrescimos, condicoes, paginaDe, portes, servicos, servicosPagina } from "@/conteudo/site";
import { metadadosDaPagina } from "@/lib/metadados";
import { duracao, reais } from "@/lib/moeda";

export const metadata = metadadosDaPagina(paginaDe("servicos"));

/** As colunas da tabela na mesa: o serviço e os três portes. */
const COLUNAS = "md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8";

export default function Servicos() {
  const pagina = paginaDe("servicos");
  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      <section className="envelope mx-auto max-w-pagina pt-14 pb-10 md:pt-20">
        <h1 className="max-w-[18ch] text-display font-semibold">{pagina.titulo}</h1>
        <p className="mt-6 max-w-[52ch] text-destaque text-muted-foreground">{servicosPagina.lide}</p>
        <div className="mt-8">
          <AcaoWhatsApp />
        </div>
      </section>

      <section aria-label={servicosPagina.tabela} className="mx-auto max-w-pagina envelope">
        <div className="rounded-cartao border border-border bg-card">
          <div aria-hidden="true" className={`hidden border-b border-border px-8 py-4 ${COLUNAS}`}>
            <span />
            <span className="grid grid-cols-3 gap-8">
              {portes.map((p) => (
                <span key={p.id}>
                  <span className="block font-semibold">{p.nome}</span>{" "}
                  <span className="block text-nota text-muted-foreground">{p.peso}</span>
                </span>
              ))}
            </span>
          </div>
          {servicos.map((s) => (
            <article key={s.nome} className={`border-b border-border p-6 last:border-b-0 md:px-8 ${COLUNAS}`}>
              <div>
                <h2 className="font-display text-titulo font-semibold md:text-destaque">{s.nome}</h2>
                <p className="mt-2 max-w-[44ch] text-nota text-muted-foreground">{s.compreende}</p>
              </div>
              <dl className="mt-4 divide-y divide-border md:mt-0 md:grid md:grid-cols-3 md:gap-8 md:divide-y-0">
                {portes.map((p) => (
                  <div key={p.id} className="flex items-baseline justify-between gap-4 py-3 md:block md:py-0">
                    <dt className="md:sr-only">
                      <span className="font-semibold">{p.nome}</span> <span className="text-nota text-muted-foreground">{p.peso}</span>
                    </dt>
                    <dd className="text-right md:text-left">
                      <span className="text-numero font-semibold tabular">{reais(s.valores[p.id].valor)}</span>{" "}
                      <span className="block text-nota text-muted-foreground tabular">{duracao(s.valores[p.id].minutos)}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section data-revela className="envelope mx-auto grid max-w-pagina gap-10 py-14 md:grid-cols-2">
        <div>
          <h2 className="text-titulo font-semibold">{servicosPagina.acrescimos}</h2>
          <dl className="mt-6 grid gap-4">
            {acrescimos.map((a) => (
              <div key={a.nome}>
                <dt className="font-semibold">{a.nome}</dt>
                <dd className="text-muted-foreground tabular">
                  + {reais(a.valor)} e + {duracao(a.minutos)}
                  {a.onde ? ` ${a.onde}` : ""}.
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="text-titulo font-semibold">{servicosPagina.condicoes}</h2>
          <ul className="mt-6 grid list-disc gap-3 pl-5 marker:text-muted-foreground">
            {condicoes.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-pagina envelope">
        <AcaoWhatsApp />
      </section>
    </main>
  );
}

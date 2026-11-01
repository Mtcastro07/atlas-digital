// app/tratamentos/page.tsx — o plano de sessões, aberto pelo mapa dos dentes: a funcionalidade 2 do plano Completo
// (producao/esteira/nichos/odontologia.md, seção 5.2). Os seis tratamentos, com as sessões e os intervalos, e nenhum valor.
// A lista inteira vem do servidor e basta sem script; a ilha só filtra por região.
import Link from "next/link";
import { AcaoWhatsApp } from "@/components/acao-whatsapp";
import { PlanoDeSessoes } from "@/components/ilhas/plano-de-sessoes";
import { avisoDeValores, paginaDe, tratamentosPagina } from "@/conteudo/site";
import { regioes, tratamentos } from "@/conteudo/tratamentos";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina(paginaDe("tratamentos"));

const nomeDaRegiao = (id: string) => regioes.find((r) => r.id === id)!.frase;

export default function Tratamentos() {
  const pagina = paginaDe("tratamentos");
  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      <section className="envelope mx-auto max-w-pagina pt-10 pb-8 md:pt-16">
        <h1 className="max-w-[24ch] text-display font-semibold">{pagina.titulo}</h1>
        <p className="mt-5 max-w-[46ch] text-destaque text-muted-foreground">{tratamentosPagina.lide}</p>
        <div className="mt-6">
          <AcaoWhatsApp />
        </div>
      </section>

      <section className="envelope mx-auto max-w-pagina pb-12">
        <PlanoDeSessoes
          regioes={regioes.map(({ id, nome }) => ({ id, nome }))}
          tratamentos={tratamentos.map(({ id, regioes: r }) => ({ id, regioes: r }))}
          legenda={tratamentosPagina.mapa.legenda}
          todas={tratamentosPagina.mapa.todas}
          ajuda={tratamentosPagina.mapa.ajuda}
          pedir={tratamentosPagina.acaoDoCaso}
        >
          <ul aria-label={tratamentosPagina.tabela} className="divide-y divide-border border-y border-border">
            {tratamentos.map((t) => (
              <li key={t.id} data-regioes={t.regioes.join(" ")} className="py-5">
                <h2 className="text-destaque font-semibold">
                  <Link href={`/tratamentos/${t.id}`} className="vinculo">
                    {t.nome}
                  </Link>
                </h2>
                <p className="tabular mt-1 font-semibold">
                  {t.sessoes}, {t.intervalo === "—" ? "sem intervalo" : `intervalo de ${t.intervalo}`}
                </p>
                <p className="mt-1 text-muted-foreground">{t.umaFrase}</p>
                <p className="mt-1 text-nota text-muted-foreground">
                  Regiões: {t.regioes.length === regioes.length ? "todas" : t.regioes.map(nomeDaRegiao).join("; ")}.
                </p>
              </li>
            ))}
          </ul>
        </PlanoDeSessoes>
      </section>

      <section className="envelope mx-auto max-w-pagina pb-12">
        <p className="max-w-[50ch]">{avisoDeValores}</p>
        <p className="mt-2 max-w-[50ch] text-muted-foreground">{tratamentosPagina.encaminha}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <AcaoWhatsApp />
          <Link href={paginaDe("avaliacao").caminho} className="vinculo font-semibold">
            Escolher o atendimento e a região
          </Link>
        </div>
      </section>
    </main>
  );
}

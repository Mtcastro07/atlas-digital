// app/guias/page.tsx — o conteúdo editorial do Completo (producao/esteira/nichos/odontologia.md, seção 4.1, "Guias"): o que acontece
// na avaliação, o que levar e as perguntas comuns, sem consulta nem diagnóstico (Código de Ética Odontológica, art. 44, V).
// Cada resposta sai só de fato do briefing. As perguntas são <details> nativos: funcionam sem script.
import { AcaoWhatsApp } from "@/components/acao-whatsapp";
import { avaliacaoDuracao, levar, passosDaAvaliacao, perguntas } from "@/conteudo/clinica";
import { guiasPagina, paginaDe } from "@/conteudo/site";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina(paginaDe("guias"));

export default function Guias() {
  const pagina = paginaDe("guias");
  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      <section className="envelope mx-auto max-w-pagina pt-10 pb-8 md:pt-16">
        <h1 className="max-w-[26ch] text-display font-semibold">{pagina.titulo}</h1>
        <p className="mt-5 max-w-[46ch] text-destaque text-muted-foreground">{guiasPagina.lide}</p>
        <div className="mt-6">
          <AcaoWhatsApp />
        </div>
      </section>

      <section className="envelope mx-auto grid max-w-pagina gap-12 pb-12 md:grid-cols-2">
        <div>
          <h2 className="text-titulo font-semibold">{guiasPagina.avaliacao}</h2>
          <p className="tabular mt-3 text-muted-foreground">{avaliacaoDuracao}</p>
          <ol className="mt-6 grid gap-3">
            {passosDaAvaliacao.map((p, i) => (
              <li key={p} className="grid grid-cols-[2rem_minmax(0,1fr)]">
                <span className="tabular font-semibold">{i + 1}</span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="text-titulo font-semibold">{guiasPagina.levar}</h2>
          <p className="mt-6 max-w-[44ch]">{levar}</p>
        </div>
      </section>

      <section className="envelope mx-auto max-w-pagina py-12">
        <h2 className="text-titulo font-semibold">{guiasPagina.perguntas}</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {perguntas.map((p) => (
            <details key={p.pergunta} className="group py-1">
              <summary className="flex min-h-11 cursor-pointer items-center py-2 font-semibold">{p.pergunta}</summary>
              <p className="max-w-[50ch] pb-4 text-muted-foreground">{p.resposta}</p>
            </details>
          ))}
        </div>
        <div className="mt-10">
          <AcaoWhatsApp />
        </div>
      </section>
    </main>
  );
}

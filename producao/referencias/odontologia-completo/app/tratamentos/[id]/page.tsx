// app/tratamentos/[id]/page.tsx — uma página por tratamento: ocupa a busca ("canal na Boa Viagem") e explica o tempo no lugar do
// preço (producao/esteira/nichos/odontologia.md, seção 4.1). Cada tratamento vem de conteudo/tratamentos.ts. Sem preço, sem
// antes e depois, sem promessa, sem diagnóstico: "o número de sessões de cada caso sai do exame clínico".
import Link from "next/link";
import { notFound } from "next/navigation";
import { AcaoWhatsApp } from "@/components/acao-whatsapp";
import { MapaDosDentes } from "@/components/mapa-dos-dentes";
import { dentistaDe } from "@/conteudo/clinica";
import { avisoDeValores, paginaDe, tratamentoPagina } from "@/conteudo/site";
import { regioes, tratamentoDe, tratamentos, type IdDoTratamento } from "@/conteudo/tratamentos";
import { metadadosDaPagina } from "@/lib/metadados";
import { mensagemDoTratamento } from "@/lib/oficio/pedido-de-avaliacao";

export const dynamicParams = false;
export const generateStaticParams = () => tratamentos.map((t) => ({ id: t.id }));

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return metadadosDaPagina(paginaDe(tratamentoDe(id as IdDoTratamento).id));
}

export default async function Tratamento({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!tratamentos.some((t) => t.id === id)) notFound();
  const t = tratamentoDe(id as IdDoTratamento);
  const quem = dentistaDe(t.quem);
  const onde = t.regioes.map((r) => regioes.find((x) => x.id === r)!.frase);
  const emTodas = t.regioes.length === regioes.length; // todas as regiões circuladas seriam um anel: o mapa fica sem faixa
  const artigo = quem.nome.startsWith("Dra.") ? "a" : "o";
  const titulo = quem.titulo.startsWith("Especialista") ? quem.titulo : quem.titulo.toLowerCase();
  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      <section className="envelope mx-auto grid max-w-pagina gap-10 pt-10 pb-12 md:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
        <div>
          <p className="text-nota">
            <Link href={paginaDe("tratamentos").caminho} className="vinculo">
              {tratamentoPagina.todos}
            </Link>
          </p>
          <h1 className="mt-4 max-w-[26ch] text-display font-semibold">{t.titulo}</h1>
          <p className="mt-5 max-w-[44ch] text-destaque text-muted-foreground">
            {t.umaFrase} Atende {artigo} {quem.nome}, {titulo}.
          </p>

          <h2 className="mt-12 text-titulo font-semibold">{tratamentoPagina.sequencia}</h2>
          <ol className="mt-6 grid gap-0">
            {t.etapas.map((e, i) => (
              <li key={e.nome} className="border-l border-border pl-6 pb-8 last:pb-0">
                {i > 0 && t.etapas[i - 1].depois && <p className="tabular mb-1 text-nota text-muted-foreground">{t.etapas[i - 1].depois}</p>}
                <p className="tabular font-semibold">
                  {e.nome}
                  <span className="font-normal text-muted-foreground">, {e.minutos} min</span>
                </p>
                <p className="mt-1 max-w-[50ch]">{e.faz}</p>
              </li>
            ))}
          </ol>

          <h2 className="mt-12 text-titulo font-semibold">{tratamentoPagina.cuidados}</h2>
          <p className="mt-4 max-w-[50ch]">{t.cuidados}</p>
        </div>

        <aside className="grid content-start gap-8">
          <div className="rounded-cartao border border-border bg-card p-5">
            <h2 className="mb-3 font-semibold">{tratamentoPagina.regiao}</h2>
            <MapaDosDentes
              ativas={emTodas ? [] : t.regioes}
              descricao={emTodas ? "Mapa dos dentes: o tratamento se aplica a todas as regiões." : `Mapa dos dentes, com as regiões do tratamento circuladas: ${onde.join("; ")}.`}
            />
            <p className="mt-3 text-nota text-muted-foreground">{emTodas ? "Todas as regiões." : `${onde.join("; ")}.`}</p>
          </div>
          <div>
            <h2 className="font-semibold">{tratamentoPagina.quemAtende}</h2>
            <p className="mt-2">{quem.nome}</p>
            <p className="text-nota">
              {quem.profissao}, <span className="tabular whitespace-nowrap">{quem.cro}</span>
            </p>
            <p className="text-nota text-muted-foreground">{quem.titulo}</p>
          </div>
        </aside>
      </section>

      <section className="envelope mx-auto max-w-pagina pb-12">
        <p className="max-w-[50ch]">{tratamentoPagina.ressalva}</p>
        <p className="mt-2 max-w-[50ch] text-muted-foreground">{avisoDeValores}</p>
        <div className="mt-8">
          <AcaoWhatsApp rotulo="Pedir avaliação para este caso" mensagem={mensagemDoTratamento(t.atendimento)} />
        </div>
      </section>
    </main>
  );
}

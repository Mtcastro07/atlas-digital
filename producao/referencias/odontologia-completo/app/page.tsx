// app/page.tsx — o Início: ser entendido em cinco segundos e pedir uma avaliação (producao/esteira/03-planos.md, seção 5;
// producao/esteira/nichos/odontologia.md, seção 4.1). O título e o lide entram já legíveis (o elemento do LCP). Ordem da
// página: o quê, quando e quanto tempo (no lugar do preço, que a norma veda), quem, o que não se faz, onde.
import Link from "next/link";
import { AcaoWhatsApp } from "@/components/acao-whatsapp";
import { Endereco } from "@/components/endereco";
import { Horario } from "@/components/horario";
import { EstadoDaClinica } from "@/components/ilhas/estado-da-clinica";
import { MapaDosDentes } from "@/components/mapa-dos-dentes";
import { VinculoDoMapa } from "@/components/vinculo-do-mapa";
import { equipe } from "@/conteudo/clinica";
import { expediente, fechamentos, negocio, responsavelTecnico, urgencia } from "@/conteudo/negocio";
import { inicio, paginaDe } from "@/conteudo/site";
import { tratamentos } from "@/conteudo/tratamentos";
import { horarioResumido } from "@/lib/horario";
import { metadadosDaPagina } from "@/lib/metadados";
import { telefoneVisivel } from "@/lib/whatsapp";

export const metadata = metadadosDaPagina(paginaDe("inicio"));

export default function Inicio() {
  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      {/* A primeira tela: o que é, onde, a regra da casa e como pedir. O título e o lide entram já legíveis. */}
      <section className="envelope mx-auto grid max-w-pagina gap-10 pt-10 pb-12 md:pt-16 md:pb-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
        <div>
          <h1 className="max-w-[24ch] text-display font-semibold">{inicio.titulo}</h1>
          <p className="mt-5 max-w-[46ch] text-destaque text-muted-foreground">{inicio.lide}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <AcaoWhatsApp />
            <p className="text-nota text-muted-foreground">{negocio.prazoDeResposta}</p>
          </div>
          <p className="mt-2">
            <a href={`tel:+${negocio.telefone}`} className="vinculo tabular whitespace-nowrap">
              Ou ligue: {telefoneVisivel(negocio.telefone)}
            </a>
          </p>
          <p className="mt-6">
            {inicio.responsavel}: {responsavelTecnico.nome}, {responsavelTecnico.profissao}, <span className="tabular whitespace-nowrap">{responsavelTecnico.registro}</span>.
          </p>
          <div className="mt-6">
            <EstadoDaClinica
              expediente={expediente}
              fechamentos={fechamentos}
              urgencia={urgencia}
              semScript={horarioResumido(expediente)}
              urgenciaSemScript={`${inicio.urgencia.titulo} ${inicio.urgencia.texto}`}
            />
          </div>
        </div>

        <div className="rounded-cartao border border-border bg-card p-5 md:p-6">
          <MapaDosDentes descricao="O mapa dos dentes: as duas arcadas, vistas de cima, com a numeração de cada dente." />
          <Link href={paginaDe("tratamentos").caminho} className="vinculo mt-3 font-semibold">
            {inicio.tratamentos.abrir}
          </Link>
        </div>
      </section>

      <section className="envelope mx-auto max-w-pagina py-12 md:py-16">
        <h2 className="max-w-[28ch] text-titulo font-semibold">{inicio.tratamentos.titulo}</h2>
        <p className="mt-3 max-w-[44ch] text-muted-foreground">{inicio.tratamentos.lide}</p>
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {tratamentos.map((t) => (
            <li key={t.id} className="grid gap-1 py-2 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.4fr)] md:items-center md:gap-8">
              <h3 className="text-corpo font-semibold">
                <Link href={`/tratamentos/${t.id}`} className="vinculo">
                  {t.nome}
                </Link>
              </h3>
              <p className="tabular text-nota md:text-corpo">{t.sessoes}</p>
              <p className="tabular text-nota text-muted-foreground md:text-corpo">{t.intervalo === "—" ? "Sem intervalo" : `Intervalo de ${t.intervalo}`}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="envelope mx-auto max-w-pagina py-12 md:py-16">
        <h2 className="text-titulo font-semibold">{inicio.equipe.titulo}</h2>
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {equipe.map((d) => (
            <li key={d.id}>
              <p className="font-semibold">{d.nome}</p>
              <p className="text-nota">
                {d.profissao}, <span className="tabular whitespace-nowrap">{d.cro}</span>
              </p>
              <p className="text-nota text-muted-foreground">{d.funcao ? `${d.titulo}, ${d.funcao.toLowerCase()}` : d.titulo}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href={paginaDe("equipe").caminho} className="vinculo font-semibold">
            {inicio.equipe.ver}
          </Link>
        </p>
      </section>

      <section data-revela className="envelope mx-auto max-w-pagina py-12 md:py-16">
        <h2 className="text-titulo font-semibold">{inicio.ausencias.titulo}</h2>
        <dl className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-2">
          {inicio.ausencias.itens.map((a) => (
            <div key={a.fato}>
              <dt className="font-semibold">{a.fato}</dt>
              <dd className="mt-1 text-muted-foreground">{a.motivo}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="envelope mx-auto grid max-w-pagina gap-12 py-12 md:grid-cols-2 md:py-16">
        <div>
          <h2 className="text-titulo font-semibold">{inicio.horario.titulo}</h2>
          <Horario className="mt-6 max-w-md" comFechamentos={false} />
        </div>
        <div>
          <h2 className="text-titulo font-semibold">{inicio.onde.titulo}</h2>
          <Endereco className="mt-6" />
          <p className="mt-4 flex flex-wrap gap-x-6">
            <VinculoDoMapa className="font-semibold" />
            <Link href={paginaDe("onde").caminho} className="vinculo font-semibold">
              Como chegar
            </Link>
          </p>
          <div className="mt-8">
            <AcaoWhatsApp />
          </div>
        </div>
      </section>
    </main>
  );
}

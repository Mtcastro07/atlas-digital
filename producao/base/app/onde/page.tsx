// app/onde/page.tsx — Onde: levar até a porta (producao/esteira/03-planos.md, seção 3.3; producao/esteira/14/01, seções 2 a 8).
// O mapa do bairro é desenhado (components/mapa-do-bairro.tsx, de ferramentas/gerar-mapa.mjs), nunca um <iframe> de terceiros.
import { AcaoWhatsApp } from "@/components/acao-whatsapp";
import { Endereco } from "@/components/endereco";
import { Horario } from "@/components/horario";
import { MapaDoBairro } from "@/components/mapa-do-bairro";
import { VinculoDoMapa } from "@/components/vinculo-do-mapa";
import { negocio } from "@/conteudo/negocio";
import { ondePagina, paginaDe } from "@/conteudo/site";
import { metadadosDaPagina } from "@/lib/metadados";
import { telefoneVisivel } from "@/lib/whatsapp";

export const metadata = metadadosDaPagina(paginaDe("onde"));

export default function Onde() {
  const pagina = paginaDe("onde");
  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      <section className="envelope mx-auto max-w-pagina pt-14 pb-10 md:pt-20">
        <h1 className="max-w-[16ch] text-display font-semibold">{pagina.titulo}</h1>
        <Endereco className="mt-6 text-destaque" />
        <p className="mt-4">
          <VinculoDoMapa />
        </p>
      </section>

      {/* O mapa do bairro em vetor, gerado do OpenStreetMap por ferramentas/gerar-mapa.mjs (o de fábrica não desenha nada). */}
      <MapaDoBairro className="envelope mx-auto max-w-pagina" />

      <section data-revela className="envelope mx-auto grid max-w-pagina gap-12 py-14 md:grid-cols-2">
        <div>
          <h2 className="text-titulo font-semibold">{ondePagina.horario}</h2>
          <Horario className="mt-6" />
        </div>
        <div>
          <h2 className="text-titulo font-semibold">{ondePagina.contato}</h2>
          <div className="mt-6 flex flex-col items-start gap-4">
            <AcaoWhatsApp />
            <a href={`tel:+${negocio.telefone}`} className="inline-flex min-h-11 items-center text-accent">
              <span className="tabular">Ligar: {telefoneVisivel(negocio.telefone)}</span>
            </a>
            <p className="text-muted-foreground">{negocio.prazoDeResposta}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

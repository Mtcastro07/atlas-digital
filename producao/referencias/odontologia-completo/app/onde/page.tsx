// app/onde/page.tsx — Onde: levar até a porta (producao/esteira/03-planos.md, seção 5; producao/esteira/nichos/odontologia.md,
// seção 4.1; producao/esteira/14/01, seções 2 a 8). O mapa do bairro é desenhado do OpenStreetMap
// (components/mapa-do-bairro.tsx, de ferramentas/gerar-mapa.mjs), nunca um <iframe> de terceiros. Convênios não aparecem:
// ficam fora até o parecer do advogado (decisoes.md).
import { AcaoWhatsApp } from "@/components/acao-whatsapp";
import { Endereco } from "@/components/endereco";
import { Horario } from "@/components/horario";
import { MapaDoBairro } from "@/components/mapa-do-bairro";
import { VinculoDoMapa } from "@/components/vinculo-do-mapa";
import { clinica } from "@/conteudo/clinica";
import { negocio } from "@/conteudo/negocio";
import { ondePagina, paginaDe } from "@/conteudo/site";
import { metadadosDaPagina } from "@/lib/metadados";
import { telefoneVisivel } from "@/lib/whatsapp";

export const metadata = metadadosDaPagina(paginaDe("onde"));

export default function Onde() {
  const pagina = paginaDe("onde");
  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      <section className="envelope mx-auto max-w-pagina pt-10 pb-8 md:pt-16">
        <h1 className="max-w-[24ch] text-display font-semibold">{pagina.titulo}</h1>
        <Endereco className="mt-5 text-destaque" />
        <p className="mt-2">
          <VinculoDoMapa className="font-semibold" />
        </p>
      </section>

      <section className="envelope mx-auto grid max-w-pagina gap-12 pb-12 lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] lg:gap-16">
        <MapaDoBairro />
        <div className="grid content-start gap-12">
          <div>
            <h2 className="text-titulo font-semibold">{ondePagina.horario}</h2>
            <Horario className="mt-6" />
          </div>
          <div>
            <h2 className="text-titulo font-semibold">{ondePagina.contato}</h2>
            <div className="mt-6 flex flex-col items-start gap-1">
              <AcaoWhatsApp />
              <a href={`tel:+${negocio.telefone}`} className="vinculo">
                <span className="tabular whitespace-nowrap">Ligar: {telefoneVisivel(negocio.telefone)}</span>
              </a>
              <p className="text-muted-foreground">{negocio.prazoDeResposta}</p>
            </div>
          </div>
          <div>
            <h2 className="text-titulo font-semibold">{ondePagina.chegar}</h2>
            <p className="mt-4 max-w-[44ch]">{clinica.estrutura.split(". ")[1]}</p>
            <p className="mt-2 max-w-[44ch]">{clinica.estacionamento}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

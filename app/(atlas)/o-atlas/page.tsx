import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { GloboDeNiteroi } from "@/components/paginas/figuras";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { Historia } from "@/components/secoes/historia";
import { QuemFaz } from "@/components/secoes/quem-faz";
import { jsonLd, sociosDoAtlas } from "@/lib/dados-estruturados";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("atlas");

/**
 * O Atlas: a abertura é o globo da marca sobre as coordenadas de Niterói;
 * depois, a história em quatro capítulos — da sala de aula da UFF ao
 * balcão do comércio da cidade —, os três sócios e a origem do nome.
 * A figura fica quieta na entrada, e o globo gira quando entra na tela. De
 * 14 a 16/10, a tarja de bronze subia no "UFF": o segundo gesto de texto
 * do site, com a onda do "24h" (09-movimento.md, seção 6.1; o crítico de
 * fora). Na história, a linha sob o ponteiro acende o círculo.
 */
export default function PaginaDoAtlas() {
  return (
    <>
      <AberturaDePagina pagina="atlas" figura={<GloboDeNiteroi />} />
      <Historia />
      <QuemFaz />
      <ProximaPagina atual="atlas" />
      {/* Os sócios nos dados estruturados só aqui, a página que mostra o nome e a função de cada um. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(sociosDoAtlas)} />
    </>
  );
}

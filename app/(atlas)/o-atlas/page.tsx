import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { GloboDeNiteroi } from "@/components/paginas/figuras";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { Historia } from "@/components/secoes/historia";
import { QuemFaz } from "@/components/secoes/quem-faz";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("atlas");

/**
 * O Atlas: a abertura é o globo da marca sobre as coordenadas de Niterói;
 * depois, a história em quatro capítulos — da sala de aula da UFF ao
 * balcão do comércio da cidade —, os três sócios e a origem do nome.
 */
export default function PaginaDoAtlas() {
  return (
    <>
      <AberturaDePagina pagina="atlas" figura={<GloboDeNiteroi />} />
      <Historia />
      <QuemFaz />
      <ProximaPagina atual="atlas" />
    </>
  );
}

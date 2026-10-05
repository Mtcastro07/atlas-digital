import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { ParedeDeBairros } from "@/components/paginas/figuras";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { ParaQuem } from "@/components/secoes/para-quem";
import { Vitrine } from "@/components/secoes/vitrine";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("para-quem");

/**
 * Para quem: a cidade antes do serviço. A abertura é a parede de bairros
 * de Niterói, com os três dos sites de exemplo acesos; depois, os três
 * públicos (com o exemplo pronto de cada um) e a vitrine dos nichos.
 */
export default function PaginaParaQuem() {
  return (
    <>
      <AberturaDePagina pagina="para-quem" disposicao="embaixo" figura={<ParedeDeBairros />} />
      <ParaQuem />
      <Vitrine />
      <ProximaPagina atual="para-quem" />
    </>
  );
}

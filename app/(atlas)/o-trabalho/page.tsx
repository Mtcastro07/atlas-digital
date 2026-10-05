import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { ReguaDoTrabalho } from "@/components/paginas/figuras";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { Trabalho } from "@/components/secoes/trabalho";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("trabalho");

/**
 * O trabalho: a abertura é a régua do prazo, como uma trena — da visita
 * ao rascunho em 24 horas, às revisões e à publicação —; depois, as
 * quatro etapas, com a marca em número de cada uma.
 */
export default function PaginaDoTrabalho() {
  return (
    <>
      <AberturaDePagina pagina="trabalho" tom="branco" disposicao="embaixo" figura={<ReguaDoTrabalho />} />
      <Trabalho />
      <ProximaPagina atual="trabalho" />
    </>
  );
}

import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { EscadaDePrecos } from "@/components/paginas/figuras";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { Escada } from "@/components/secoes/escada";
import { Fundacao } from "@/components/secoes/fundacao";
import { Planos } from "@/components/secoes/planos";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("planos");

/**
 * Planos: a abertura é a escada de preços (três degraus, o preço de
 * criação em cada um); depois, os planos com o que cada um inclui, a
 * escada dos três sites de demonstração (o simulador abre o site vivo,
 * com as páginas dele) e a condição dos três primeiros contratos.
 */
export default function PaginaDosPlanos() {
  return (
    <>
      <AberturaDePagina pagina="planos" figura={<EscadaDePrecos />} />
      <Planos />
      <Escada />
      <Fundacao colada />
      <ProximaPagina atual="planos" tom="branco" />
    </>
  );
}

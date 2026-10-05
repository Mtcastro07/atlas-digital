import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { EquacaoDoOrcamento } from "@/components/paginas/figuras";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { Orcamento } from "@/components/secoes/orcamento";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("orcamento");

/**
 * Orçamento: a abertura é a conta, em quatro termos (plano mais módulos é
 * igual a criação mais mensalidade); logo abaixo, o montador. O plano
 * chega marcado de /orcamento#orcamento-<plano> (o "Escolher" dos planos
 * e do simulador).
 */
export default function PaginaDoOrcamento() {
  return (
    <>
      <AberturaDePagina pagina="orcamento" tom="claro" figura={<EquacaoDoOrcamento />} />
      <Orcamento completo />
      <ProximaPagina atual="orcamento" />
    </>
  );
}

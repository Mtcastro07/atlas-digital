import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { MontadorDaPagina } from "@/components/secoes/orcamento";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("orcamento");

/**
 * Orçamento: a abertura é o próprio montador, com a tabela completa, logo
 * abaixo do título (desde 16/10): o momento da página é a ferramenta, que
 * responde à mão. Até 16/10, a figura era a equação dos quatro termos, um
 * cartão parado que repetia o lide, e o montador vinha numa seção à parte,
 * na mesma névoa (o crítico de fora). O plano chega marcado de
 * /orcamento#orcamento-<plano> (o "Escolher" dos planos e do simulador).
 */
export default function PaginaDoOrcamento() {
  return (
    <>
      <AberturaDePagina pagina="orcamento" tom="claro" disposicao="embaixo" figura={<MontadorDaPagina />} />
      <ProximaPagina atual="orcamento" />
    </>
  );
}

import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { MapaDasDuvidas } from "@/components/paginas/figuras";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { Duvidas } from "@/components/secoes/duvidas";
import { jsonLd, perguntasFrequentes } from "@/lib/dados-estruturados";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("duvidas");

/**
 * Dúvidas: a abertura é o mapa das perguntas pelo momento em que aparecem
 * — cada palavra leva à sua resposta, que se abre (ilha Ancoras) —;
 * depois, as respostas e o fim do percurso. Até 16/10, a chamada final do
 * início vinha antes do fim do percurso: duas chamadas seguidas, cada uma
 * com a sua pílula, e o mesmo bloco em duas páginas (o crítico de fora).
 * Os dados estruturados das perguntas ficam nesta página.
 */
export default function PaginaDasDuvidas() {
  return (
    <>
      <AberturaDePagina pagina="duvidas" disposicao="embaixo" figura={<MapaDasDuvidas />} />
      <Duvidas />
      <ProximaPagina atual="duvidas" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(perguntasFrequentes)} />
    </>
  );
}

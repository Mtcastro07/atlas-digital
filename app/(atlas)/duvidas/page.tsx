import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { MapaDasDuvidas } from "@/components/paginas/figuras";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { Duvidas } from "@/components/secoes/duvidas";
import { Fim } from "@/components/secoes/fim";
import { jsonLd, perguntasFrequentes } from "@/lib/dados-estruturados";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("duvidas");

/**
 * Dúvidas: a abertura é o mapa das perguntas pelo momento em que aparecem
 * — cada palavra leva à sua resposta, que se abre (ilha Ancoras) —;
 * depois, as respostas e a chamada final. Os dados estruturados das perguntas ficam nesta página.
 */
export default function PaginaDasDuvidas() {
  return (
    <>
      <AberturaDePagina pagina="duvidas" disposicao="embaixo" figura={<MapaDasDuvidas />} />
      <Duvidas />
      <Fim />
      <ProximaPagina atual="duvidas" tom="branco" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(perguntasFrequentes)} />
    </>
  );
}

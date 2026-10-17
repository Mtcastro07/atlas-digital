import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { MapaDasDuvidas } from "@/components/paginas/figuras";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { Duvidas } from "@/components/secoes/duvidas";
import { jsonLd, perguntasFrequentes } from "@/lib/dados-estruturados";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("duvidas");

// O pico de luz da página (16/10, "Identidade mais profunda"): a hora azul, depois do sol. A água funda em cima e a
// superfície embaixo (--meio), com o resto de luz baixo, a oeste, frio. Embaixo, a maré: os últimos 120 px da
// abertura se dissolvem no papel da sanfona (app/vidro.css, .vd-mare), só na mesa: abaixo de 1024 px, desde 17/10, o
// corte reto (a passagem se lia como névoa cinza), e o fólio e o respiro de baixo voltam aos de toda abertura.
const horaAzul = {
  "--cena-angulo": "180deg",
  "--cena-topo": "var(--deep)",
  "--cena-base": "var(--meio)",
  "--aurora-x": "0%",
  "--aurora-y": "100%",
  "--luz-fria": "color-mix(in oklch, var(--agua-rasa) 60%, transparent)",
  "--luz-quente": "transparent",
} as React.CSSProperties;

/**
 * Dúvidas: a abertura é o mapa das perguntas pelo momento em que aparecem
 * — cada palavra leva à sua resposta, que se abre (ilha Ancoras) —;
 * depois, as respostas e o fim do percurso. Até 16/10, a chamada final do
 * início vinha antes do fim do percurso: duas chamadas seguidas, cada uma
 * com a sua pílula, e o mesmo bloco em duas páginas (o crítico de fora).
 * Os dados estruturados das perguntas ficam nesta página.
 * Desde 16/10, a rosa das perguntas na hora azul, e a abertura que se
 * dissolve no papel das respostas (a maré, a única emenda desse tipo).
 */
export default function PaginaDasDuvidas() {
  return (
    // A hora da página (16/10): dá o lado das sombras a toda a página (app/vidro.css). Um atributo, sem texto.
    <div data-hora="hora-azul" className="contents">
      <AberturaDePagina
        pagina="duvidas"
        disposicao="embaixo"
        figura={<MapaDasDuvidas />}
        className="vd-cena vd-mare"
        style={horaAzul}
      />
      <Duvidas />
      <ProximaPagina atual="duvidas" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(perguntasFrequentes)} />
    </div>
  );
}

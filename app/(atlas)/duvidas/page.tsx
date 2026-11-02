import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { MapaDasDuvidas } from "@/components/paginas/duvidas/figura";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { Duvidas } from "@/components/secoes/duvidas";
import { jsonLd, perguntasFrequentes } from "@/lib/dados-estruturados";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("duvidas");

// O pico de luz da página (16/10, "Identidade mais profunda"): a hora azul, depois do sol. A água funda em cima e a
// superfície embaixo (--meio), com o resto de luz baixo, a oeste, frio. Desde o R10, sem a maré: a emenda com o papel é
// reta, como a das outras aberturas.
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
 * Dúvidas: a abertura é a rosa, com os quatro momentos em que as perguntas aparecem; cada um leva à sua primeira
 * resposta, que se abre (ilha Ancoras). Depois, a mesa de leitura e o fim do percurso. Os dados estruturados das
 * perguntas ficam nesta página.
 */
export default function PaginaDasDuvidas() {
  return (
    // A hora da página (16/10): dá o lado das sombras a toda a página (app/vidro.css). Um atributo, sem texto.
    <div data-hora="hora-azul" className="contents">
      <AberturaDePagina
        pagina="duvidas"
        disposicao="embaixo"
        figura={<MapaDasDuvidas />}
        className="vd-cena"
        style={horaAzul}
      />
      <Duvidas />
      <ProximaPagina atual="duvidas" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(perguntasFrequentes)} />
    </div>
  );
}

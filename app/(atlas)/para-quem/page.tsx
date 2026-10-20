import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { CartaDeNiteroi } from "@/components/paginas/figuras";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { ParaQuem } from "@/components/secoes/para-quem";
import { Vitrine } from "@/components/secoes/vitrine";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("para-quem");

// O pico de luz da página (16/10, "Identidade mais profunda"): a manhã cedo, o sol baixo do leste, do lado do oceano.
// A água clareia a leste (--meio) e cai para a água funda a oeste, sob o texto; a luz fria, navy mais claro no mesmo
// matiz, vem baixa, da direita.
const manhaCedo = {
  "--cena-angulo": "255deg",
  "--cena-topo": "var(--meio)",
  "--cena-base": "var(--deep)",
  "--aurora-x": "100%",
  "--aurora-y": "70%",
  "--luz-fria": "color-mix(in oklch, var(--agua-rasa) 80%, transparent)",
  "--luz-quente": "transparent",
} as React.CSSProperties;

/**
 * Para quem: a cidade antes do serviço. A abertura é a parede de bairros
 * de Niterói, com os três dos sites de exemplo acesos — desde 14/10, ao
 * lado do título, numa coluna (embaixo dele, a metade direita da abertura
 * ficava vazia na mesa; o crítico de fora) —; depois, os três
 * públicos (com o exemplo pronto de cada um) e a vitrine dos nichos.
 * Desde 16/10, a abertura é a carta da costa de Niterói, sob a luz da
 * manhã cedo, ao lado da lista dos bairros, e projeta a sua sombra sobre o
 * papel dos públicos (o plano sobre o plano, a única emenda desse tipo na
 * página: a abertura fica por cima, z-[1]); a vitrine, na pedra.
 */
export default function PaginaParaQuem() {
  return (
    // A hora da página (16/10): dá o lado das sombras a toda a página (app/vidro.css). Um atributo, sem texto.
    <div data-hora="manha-cedo" className="contents">
      <AberturaDePagina
        pagina="para-quem"
        colunasDaFigura={7}
        figura={<CartaDeNiteroi />}
        className="vd-cena z-[1] shadow-[-12px_28px_40px_-28px_rgb(2_8_18/0.35)]"
        style={manhaCedo}
      />
      <ParaQuem />
      <Vitrine />
      <ProximaPagina atual="para-quem" />
    </div>
  );
}

import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { EscadaDePrecos } from "@/components/paginas/figuras";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { Escada } from "@/components/secoes/escada";
import { Fundacao } from "@/components/secoes/fundacao";
import { Planos } from "@/components/secoes/planos";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("planos");

// O pico de luz da página (16/10, "Identidade mais profunda"): a manhã alta, do leste. A água clareia no alto, à
// direita (--meio), e cai para a água funda embaixo, à esquerda, sob o texto; a luz fria, navy mais claro no mesmo
// matiz, vem do canto de cima, a leste. É a luz que acende as faces de cima dos degraus de pedra.
const manha = {
  "--cena-angulo": "210deg",
  "--cena-topo": "var(--meio)",
  "--cena-base": "var(--deep)",
  "--aurora-x": "96%",
  "--aurora-y": "8%",
  "--luz-fria": "color-mix(in oklch, var(--agua-rasa) 80%, transparent)",
  "--luz-quente": "transparent",
} as React.CSSProperties;

/**
 * Planos: a abertura é a escada de preços (três degraus, o preço de
 * criação em cada um); depois, os planos com o que cada um inclui, a
 * escada dos sites de demonstração, até quatro por plano (o simulador abre o site vivo,
 * com as páginas dele) e a condição dos três primeiros contratos, em
 * extrato, na névoa (desde 16/10: até então, no navy da escada). Os tons:
 * navy, névoa, navy, névoa e o navy da próxima página (até 16/10, os
 * planos no branco). Desde 16/10, a escada é de pedra e, a partir de 1024
 * px, pousa na emenda (a figura alinhada ao chão; a abertura por cima dos
 * planos, z-[1]), com a sombra de cada degrau no papel de baixo.
 */
export default function PaginaDosPlanos() {
  return (
    // A hora da página (16/10): dá o lado das sombras a toda a página (app/vidro.css). Um atributo, sem texto.
    <div data-hora="manha" className="contents">
      <AberturaDePagina
        pagina="planos"
        figura={<EscadaDePrecos />}
        className="vd-cena z-[1]"
        style={manha}
        classeDaFigura="lg:self-end lg:-mb-36"
      />
      <Planos />
      <Escada />
      <Fundacao extrato />
      <ProximaPagina atual="planos" />
    </div>
  );
}

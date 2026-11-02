import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { EscadaDePrecos } from "@/components/paginas/planos/figura";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { Escada } from "@/components/secoes/escada";
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
 * Planos: a abertura é a escada de preços, na proporção deles; depois, o que cada plano inclui (na mesa, a tabela,
 * com a placa navy atrás do Profissional; no celular, um quadro por plano na galeria), a nota 1 com a condição de
 * fundação e os extras; por fim, os sites de exemplo, até quatro por plano (o simulador, só na mesa, abre o site vivo).
 * Os tons: navy, névoa, navy e o navy da próxima página. A escada pousa na emenda em toda largura (a abertura por cima
 * dos planos, z-[1]), com a sombra de cada degrau no papel de baixo; a partir de 1024 px, ela ocupa a grade inteira da
 * página, e cada degrau fica sobre a coluna do seu plano. Desde 28/10 (R10, D3), a condição de fundação é a nota 1 da
 * linha "Criação": a seção própria (o extrato, components/secoes/fundacao.tsx) saiu daqui.
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
        classeDaFigura="-mb-24 md:-mb-36 lg:col-span-12"
      />
      <Planos />
      <Escada />
      <ProximaPagina atual="planos" />
    </div>
  );
}

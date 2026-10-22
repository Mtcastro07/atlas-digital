import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { MontadorDaPagina } from "@/components/secoes/orcamento";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("orcamento");

// O pico de luz da página (16/10, "Identidade mais profunda"): o sol de cima, ao meio-dia, sobre a mesa. O papel
// clareia no alto (--papel-folha) e cai para --papel-sombra nos cantos de baixo (app/vidro.css, .vd-papel).
const meioDia = { "--luz-x": "56%", "--luz-y": "-12%" } as React.CSSProperties;

/**
 * Orçamento: a abertura é o próprio montador, com a tabela completa, logo
 * abaixo do título (desde 16/10): o momento da página é a ferramenta, que
 * responde à mão. Até 16/10, a figura era a equação dos quatro termos, um
 * cartão parado que repetia o lide, e o montador vinha numa seção à parte,
 * na mesma névoa (o crítico de fora). O plano chega marcado de
 * /orcamento#orcamento-<plano> (o "Escolher" dos planos e do simulador).
 * Desde 16/10, a mesa ao meio-dia: a luz de cima no papel. Desde 17/10 (a
 * direção final do Atlas Digital), a conta num instrumento, a tela pequena
 * no papel, com o total em meio-tom, a composição e a carta dos pagamentos
 * (ilhas/montador.tsx); até então, a sombra curta do painel e a marca da
 * chapa em volta dos totais.
 */
export default function PaginaDoOrcamento() {
  return (
    // A hora da página (16/10): dá o lado das sombras a toda a página (app/vidro.css). Um atributo, sem texto.
    <div data-hora="meio-dia" className="contents">
      <AberturaDePagina
        pagina="orcamento"
        tom="claro"
        disposicao="embaixo"
        figura={<MontadorDaPagina />}
        className="vd-papel"
        style={meioDia}
      />
      <ProximaPagina atual="orcamento" />
    </div>
  );
}

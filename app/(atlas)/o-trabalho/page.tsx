import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { FolhaDoTrabalho, Trabalho } from "@/components/secoes/trabalho";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("trabalho");

// O pico de luz da página (16/10, "Identidade mais profunda"): a tarde, do oeste, rasante. O papel clareia à
// esquerda e cai para --papel-sombra a leste; embaixo, volta ao tom, porque as etapas continuam a cena no mesmo papel
// (app/vidro.css, .vd-papel-continua). O instrumento da folha herda a mesma luz na rampa dele (app/vidro.css).
const tarde = { "--luz-x": "-8%", "--luz-y": "30%" } as React.CSSProperties;

/**
 * O trabalho: a abertura é a folha das primeiras 72 horas, num instrumento largo (desde 17/10, a direção final do
 * Atlas Digital; de 16 a 17/10, a régua do prazo como uma trena, com o relógio em cartão); depois, as quatro etapas
 * numa faixa só, num segundo instrumento (desde a revisão de 17/10: no papel, a página ficava com 15,8% de tela, contra
 * os 40 a 60% do critério da metade, DIRECAO-DIGITAL.md, seção 5). Entre os dois, um respiro só (md:pb-24, e não o
 * de 144 px da abertura). Desde 16/10, na névoa (até então, no branco, que saiu como campo de cena), com a luz da tarde
 * na abertura.
 */
export default function PaginaDoTrabalho() {
  return (
    // A hora da página (16/10): dá o lado das sombras a toda a página (app/vidro.css). Um atributo, sem texto.
    <div data-hora="tarde" className="contents">
      <AberturaDePagina
        pagina="trabalho"
        tom="claro"
        disposicao="embaixo"
        figura={<FolhaDoTrabalho />}
        className="vd-papel vd-papel-continua md:pb-24"
        style={tarde}
      />
      <Trabalho />
      <ProximaPagina atual="trabalho" />
    </div>
  );
}

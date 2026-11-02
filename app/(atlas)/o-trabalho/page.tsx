import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { ReguaDoTrabalho } from "@/components/paginas/o-trabalho/figura";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { Trabalho } from "@/components/secoes/trabalho";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("trabalho");

// O pico de luz da página (16/10, "Identidade mais profunda"): a tarde, do oeste, rasante. O papel clareia à
// esquerda e cai para --papel-sombra a leste; embaixo, volta ao tom, porque as etapas continuam a cena no mesmo papel
// (app/vidro.css, .vd-papel-continua).
const tarde = { "--luz-x": "-8%", "--luz-y": "30%" } as React.CSSProperties;

/**
 * O trabalho: a abertura é a régua do prazo, como uma trena — da visita
 * ao rascunho em 24 horas, às revisões e à publicação —; depois, as
 * quatro etapas, cada uma com a sua composição e o seu objeto (desde 02/11,
 * no acabamento do R10: o rascunho é a cena escura, com o mostrador das 24 h;
 * de 28/10 a 02/11, um livro-razão; de 16 a 28/10, um cronograma em linhas).
 * Com a luz da tarde na abertura. As passivas: a janela da publicação, na
 * trena, a folha da visita, o mostrador, as duas rodadas e o mapa do site.
 */
export default function PaginaDoTrabalho() {
  return (
    // A hora da página (16/10): dá o lado das sombras a toda a página (app/vidro.css). Um atributo, sem texto.
    <div data-hora="tarde" className="contents">
      <AberturaDePagina
        pagina="trabalho"
        tom="claro"
        disposicao="embaixo"
        figura={<ReguaDoTrabalho />}
        className="vd-papel vd-papel-continua"
        style={tarde}
      />
      <Trabalho />
      <ProximaPagina atual="trabalho" />
    </div>
  );
}

import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { EscadaDePrecos } from "@/components/paginas/figuras";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { Escada } from "@/components/secoes/escada";
import { Fundacao } from "@/components/secoes/fundacao";
import { Planos } from "@/components/secoes/planos";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("planos");

// O pico de luz da página (16/10, "Identidade mais profunda"): a manhã alta, do leste. Desde 17/10, na tela (a rampa
// lisa de app/vidro.css): a luz no alto, à direita (--meio, o mais claro que fica sob texto), e a rampa cai para a
// água funda embaixo, à esquerda, sob o texto. Até 17/10, a mesma luz na água (as variáveis da .vd-cena).
const manha = { "--luz-x": "96%", "--luz-y": "4%", "--angulo": "210deg" } as React.CSSProperties;

/**
 * Planos: a abertura é a escada de preços (três degraus, o preço de
 * criação em cada um); depois, os planos com o que cada um inclui, a
 * escada dos sites de demonstração, até quatro por plano (o simulador abre o site vivo,
 * com as páginas dele) e a condição dos três primeiros contratos, em
 * extrato, na névoa (desde 16/10: até então, no navy da escada). Os tons:
 * navy, névoa, navy, névoa e o navy da próxima página (até 16/10, os
 * planos no branco).
 * Desde 17/10 (a direção final do Atlas Digital, seções 2.5 e 3), a abertura é a tela recortada no papel: "Três
 * degraus." e o lide no alto, em largura inteira, e a escada em dois estados embaixo, pousada no pé da tela, com a régua
 * de reais na margem direita (components/paginas/escada-de-precos.tsx). Na mesa, a escada sobe por trás do lide (a
 * margem negativa de 7,75 rem, a altura do lide e do respiro dele; 6,75 na mesa estreita, onde o título é menor e a
 * legenda da janela baixa precisa de 1 rem a mais acima do degrau mais alto: o --escada-desce de app/digital.css): o
 * degrau mais alto, à direita, fica ao lado do texto, e o mais baixo, à esquerda, debaixo dele. As margens de baixo
 * devolvem o respiro da tela: a escada pousa no pé. De 16 a 17/10, a escada de pedra pousava na emenda com o papel, com
 * a sombra de cada degrau no papel de baixo.
 * Fora da mesa (18/10, o passe do celular), a escada desce 3 rem abaixo do lide (max-lg:mt-12; até então, 5 rem, e o
 * fólio e a legenda numa faixa cada um entre o lide e a escada): o fólio sobe ao canto da primeira linha do título, e a
 * legenda entra no triângulo vazio da escada (app/digital.css). Desde 19/10 (a revisão), no celular, 2 rem (max-md:mt-8,
 * o passo do título ao lide), a legenda ao pé da figura e o respiro de cima menor (app/digital.css): a 390 × 844, a
 * escada começa a ~374 px, e os três preços cabem na primeira tela (até então, 473 px depois da ilha, e só o do Completo).
 */
export default function PaginaDosPlanos() {
  return (
    // A hora da página (16/10): dá o lado das sombras a toda a página (app/vidro.css). Um atributo, sem texto.
    <div data-hora="manha" className="contents">
      <AberturaDePagina
        pagina="planos"
        forma="tela"
        disposicao="embaixo"
        figura={<EscadaDePrecos />}
        className="vd-escada-tela"
        style={manha}
        classeDaFigura="-mb-24 max-lg:mt-12 max-md:mt-8 md:-mb-36 lg:-mt-[6.75rem] xl:-mt-[7.75rem]"
      />
      <Planos />
      <Escada />
      <Fundacao extrato />
      <ProximaPagina atual="planos" />
    </div>
  );
}

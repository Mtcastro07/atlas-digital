import type { Viewport } from "next";

import { Barrado } from "@/components/demos/restaurante/barrado";
import { textoDaCasa, tituloDaCasa } from "@/components/demos/restaurante/fontes";
import { PortaDoSalao } from "@/components/ilhas/demos/restaurante/porta";
import { SalaoVivo } from "@/components/ilhas/demos/restaurante/salao-vivo";
import { CabecalhoFixo } from "@/components/transicao-de-pagina";
import { barra, expediente, fechamentos, paginas, porta, pratosDoDia, restauranteSite as casa } from "@/conteudo/demos/restaurante";
import { estadoDoExpediente, horaDeNiteroi } from "@/lib/demos/relogio";
import { real } from "@/lib/demos/restaurante/pedido";

import "./restaurante.css";

// A Cozinha do Ingá, site de restaurante do plano Profissional no simulador, refeito pelo padrão Atlas em 09.10.2026
// (registros/demos/restaurante/identidade.md, seção 8): a parede do salão. O layout guarda o que atravessa as páginas:
// a porta de vidro, o barrado do pé da parede, a ilha do salão (as cenas, as peças, o balanço da lousa) e os filtros:
// o giz, que o texto escrito na lousa recebe, e a caneta, a do guardanapo e do que se escreve à mão no papel.

export const viewport: Viewport = { themeColor: "#f3efe6" };

// O prato de hoje e a plaquinha da porta: o site inteiro se refaz a cada 10 minutos.
export const revalidate = 600;

export default function LayoutDoSalao({ children }: { children: React.ReactNode }) {
  const naPorta = paginas.filter((p) => p.naBarra).map(({ id, caminho, rotulo }) => ({ id, caminho, rotulo }));
  const agora = horaDeNiteroi();
  const prato = pratosDoDia[agora.dia];
  return (
    <div data-demo="restaurante" className={`rs-salao ${tituloDaCasa.variable} ${textoDaCasa.variable}`}>
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        {/* O giz: a mão que ondula (o ruído largo), o traço que treme (o fino), as falhas do giz no quadro e o pó em volta. */}
        <filter id="giz-do-salao" x="-4%" y="-12%" width="108%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="grao" />
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="1" seed="8" result="onda" />
          <feDisplacementMap in="SourceGraphic" in2="onda" scale="3" xChannelSelector="R" yChannelSelector="G" result="torto" />
          <feDisplacementMap in="torto" in2="grao" scale="1.5" result="tremido" />
          <feComponentTransfer in="grao" result="falhas">
            <feFuncA type="discrete" tableValues="1 1 0.45 1 0.85 1 0.6 1 1" />
          </feComponentTransfer>
          <feComposite in="tremido" in2="falhas" operator="in" result="giz" />
          <feGaussianBlur in="giz" stdDeviation="0.9" result="po" />
          <feComponentTransfer in="po" result="poeira">
            <feFuncA type="linear" slope="0.45" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="poeira" />
            <feMergeNode in="giz" />
          </feMerge>
        </filter>
        <filter id="caneta-do-salao" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="5" result="tremor" />
          <feDisplacementMap in="SourceGraphic" in2="tremor" scale="5" />
        </filter>
      </svg>
      <CabecalhoFixo>
        <PortaDoSalao
          nome={casa.nome}
          descricao={porta.descricao}
          inicio={casa.caminho}
          paginas={naPorta}
          rotuloDasPaginas={barra.navegacao}
          pedido={paginas.find((p) => p.id === "pedido")!.caminho}
          acao={casa.acao.curto}
          textos={porta}
          expediente={expediente}
          fechamentos={fechamentos}
          inicial={estadoDoExpediente(agora, expediente, fechamentos)}
          doDia={prato ? `${prato.curto}, ${real(prato.preco)}` : null}
        />
      </CabecalhoFixo>
      <main id="conteudo" tabIndex={-1} className="rs-conteudo">
        {children}
      </main>
      <Barrado />
      <SalaoVivo />
    </div>
  );
}

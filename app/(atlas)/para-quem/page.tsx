import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { CartaDeNiteroi } from "@/components/paginas/carta-de-niteroi";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { ParaQuem } from "@/components/secoes/para-quem";
import { Vitrine } from "@/components/secoes/vitrine";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("para-quem");

// O pico de luz da página (16/10, "Identidade mais profunda"): a manhã cedo, o sol baixo do leste, do lado do oceano.
// Desde 17/10, na tela (a rampa lisa de app/vidro.css): o pico em --meio, baixo, à direita, atrás do painel da leitura,
// e a rampa cai para a água funda a oeste, sob a baía da carta.
const manhaCedo = { "--luz-x": "100%", "--luz-y": "70%", "--angulo": "255deg" } as React.CSSProperties;

/**
 * Para quem: a cidade antes do serviço. A abertura é a carta de Niterói;
 * depois, os três públicos (com o exemplo pronto de cada um) e os nichos, e
 * a vitrine dos dois demonstrativos, na pedra.
 * De 14 a 16/10, a parede dos bairros dos sites de exemplo ao lado do
 * título; de 16 a 17/10, a carta da costa de Niterói, na água da manhã
 * cedo, ao lado da lista dos bairros, com a sombra sobre os públicos.
 * Desde 17/10 (a direção final do Atlas Digital, seção 3, item 9), a carta
 * eletrônica numa tela recortada no papel, à esquerda (as colunas 1 a 7,
 * sangrando pela borda da janela), com o título e o lide à direita, no
 * alto, e a legenda embaixo deles; a leitura e as camadas sobre a carta
 * (components/paginas/carta-de-niteroi.tsx). Na mesa, a tela cabe na
 * janela. Sem sombra: a tela é recorte, não cartão (C12).
 */
export default function PaginaParaQuem() {
  return (
    // A hora da página (16/10): dá o lado das sombras a toda a página (app/vidro.css). Um atributo, sem texto.
    <div data-hora="manha-cedo" className="contents">
      <AberturaDePagina
        pagina="para-quem"
        forma="tela"
        disposicao="figura-a-esquerda"
        colunasDaFigura={7}
        figura={<CartaDeNiteroi />}
        // A figura entra na grade da abertura (a carta à esquerda, o painel sob o texto): a caixa dela some na mesa.
        classeDaFigura="lg:contents"
        // Embaixo, 7 rem; na mesa, 2,5 rem, sob a legenda (a carta desconta, app/digital.css), e 16 px no mínimo entre o
        // lide e a legenda: a tela cabe na janela, a 1.366 × 768 também.
        className="md:pb-28 lg:pb-10 lg:[&>div]:gap-y-4"
        style={manhaCedo}
      />
      <ParaQuem />
      <Vitrine />
      <ProximaPagina atual="para-quem" />
    </div>
  );
}

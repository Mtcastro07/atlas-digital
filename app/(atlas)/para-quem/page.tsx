import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { ChapaDaCarta } from "@/components/paginas/para-quem/figura";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { NichosAtendidos, ParaQuem } from "@/components/secoes/para-quem";
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
 * Para quem: a cidade antes do serviço. Desde 28/10 (R10, D5, a decisão do aprovador), a carta de Niterói é uma chapa
 * de água funda, e os públicos são a legenda dela: na mesa, parada ao lado do título da abertura, com os três bairros
 * acendendo um de cada vez (de 28/10 a 03/11, presa à direita até o último público); no celular, no fluxo, sob o lide,
 * com Icaraí aceso. Depois, o índice dos nichos, a vitrine e a próxima página.
 * O palco (.vd-pq-palco) guarda a abertura, a chapa e os públicos: a chapa fica numa coluna posta por cima das duas
 * seções, e não dentro de uma delas (a abertura vem sem figura). A água (.vd-pq-agua) junta a abertura e a chapa numa
 * cena só no celular; na mesa, não tem caixa (display: contents), e a abertura pinta a sua. O CSS: app/paginas/para-quem.css.
 * De 16 a 28/10, a carta ao lado da lista dos três bairros, dentro da abertura, com a sombra sobre o papel dos públicos.
 */
export default function PaginaParaQuem() {
  return (
    // A hora da página (16/10): dá o lado das sombras a toda a página (app/vidro.css). Um atributo, sem texto.
    <div data-hora="manha-cedo" className="contents">
      <div className="vd-pq-palco">
        <div data-tom="escuro" className="vd-pq-agua vd-materia vd-cena" style={manhaCedo}>
          <AberturaDePagina
            pagina="para-quem"
            colunasDaFigura={7}
            figura={null}
            className="vd-cena vd-pq-abertura pb-12 md:pb-12 lg:pt-40 lg:pb-36"
            style={manhaCedo}
          />
          <ChapaDaCarta />
        </div>
        <ParaQuem />
      </div>
      <NichosAtendidos />
      <Vitrine />
      <ProximaPagina atual="para-quem" />
    </div>
  );
}

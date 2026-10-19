import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { MapaDasDuvidas, RosaDasDuvidas } from "@/components/paginas/figuras";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { Duvidas } from "@/components/secoes/duvidas";
import { jsonLd, perguntasFrequentes } from "@/lib/dados-estruturados";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("duvidas");

// O pico de luz da página (16/10, "Identidade mais profunda"): a hora azul, depois do sol. Desde 17/10, na rampa lisa da
// tela (app/vidro.css, "a tela lisa"): a água funda em cima e a superfície embaixo (--angulo de 0°, de baixo para cima),
// com o resto de luz baixo, a oeste, atrás da rosa (--luz-x e --luz-y), longe do texto, à direita. Até 17/10, a cena em
// sangria, com a maré: os últimos 120 px da abertura se dissolviam no papel da sanfona, a única emenda desse tipo no site.
const horaAzul = { "--luz-x": "0%", "--luz-y": "100%", "--angulo": "0deg" } as React.CSSProperties;

/**
 * Dúvidas: a abertura é a rosa do Sol e o mapa das perguntas pelo momento em que aparecem — cada palavra leva à sua
 * resposta, que se abre (ilha Ancoras) —; depois, as respostas e o fim do percurso. Até 16/10, a chamada final do
 * início vinha antes do fim do percurso: duas chamadas seguidas, cada uma com a sua pílula, e o mesmo bloco em duas
 * páginas (o crítico de fora). Os dados estruturados das perguntas ficam nesta página.
 * Desde 17/10 (a direção final do Atlas Digital, seções 2.5, 2.6 e 3, itens 22 e 23), a abertura é a tela que sangra
 * pela esquerda: a rosa no fundo, sangrando pela borda, e o título, o lide, a legenda e os quatro momentos à direita,
 * da sexta coluna em diante (app/digital.css, "duvidas"). A tela é a única desta página, e a próxima página fica na
 * água em sangria.
 */
export default function PaginaDasDuvidas() {
  return (
    // A hora da página (16/10): dá o lado das sombras a toda a página (app/vidro.css). Um atributo, sem texto.
    <div data-hora="hora-azul" className="contents">
      <AberturaDePagina
        pagina="duvidas"
        forma="tela-sangra-esquerda"
        disposicao="embaixo"
        fundo={<RosaDasDuvidas />}
        figura={<MapaDasDuvidas />}
        classeDaFigura="mt-8"
        className="vd-abertura-duvidas"
        style={horaAzul}
      />
      <Duvidas />
      <ProximaPagina atual="duvidas" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(perguntasFrequentes)} />
    </div>
  );
}

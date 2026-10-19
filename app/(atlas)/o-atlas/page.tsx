import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { GloboDeNiteroi, MolduraGraduada } from "@/components/paginas/figuras";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { Historia } from "@/components/secoes/historia";
import { QuemFaz } from "@/components/secoes/quem-faz";
import { jsonLd, sociosDoAtlas } from "@/lib/dados-estruturados";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("atlas");

// O pico de luz da página (16/10, "Identidade mais profunda"): o fim da tarde, rasante e baixo, do oeste, sobre a
// baía. Desde 17/10, na tela (a rampa lisa de app/vidro.css): o pico em --meio, o mais claro que fica sob texto, no pé
// do oeste, e a rampa cai para a água funda a leste. O quente fica só no metal aceso do globo, nunca no ar.
const fimDaTarde = { "--luz-x": "0%", "--luz-y": "100%", "--angulo": "90deg" } as React.CSSProperties;

/**
 * O Atlas: a abertura é a projeção que se desenrola, o globo gravado com a origem em Niterói que vira a grade de um
 * grau (components/paginas/folha-do-atlas.tsx); depois, a história em quatro capítulos, da sala de aula da UFF ao
 * balcão do comércio da cidade, como estações de um rumo sobre a grade cônica; os três sócios, cada um sobre a etapa de
 * que responde, e a origem do nome.
 * Desde 17/10 (a direção final do Atlas Digital, seções 2.5 e 2.6 e seção 3, itens 19 a 21), a abertura é uma tela
 * inteira, centrada: o título na margem, o lide à direita, a projeção no meio, e a moldura graduada como o bisel da
 * janela. De 16 a 17/10, a folha da marca na água do fim da tarde, com o globo que girava e descia pela emenda até o
 * papel da história (z-[1]); antes, até 16/10, a tarja de bronze no "UFF", que saiu (um gesto de texto por site).
 */
export default function PaginaDoAtlas() {
  return (
    // A hora da página (16/10): dá o lado das sombras a toda a página (app/vidro.css). Um atributo, sem texto.
    <div data-hora="fim-da-tarde" className="contents">
      <AberturaDePagina
        pagina="atlas"
        forma="tela"
        disposicao="centrada"
        figura={<GloboDeNiteroi />}
        fundo={<MolduraGraduada />}
        style={fimDaTarde}
        className="vd-atlas-tela"
        classeDaFigura="mt-12"
      />
      <Historia />
      <QuemFaz />
      <ProximaPagina atual="atlas" />
      {/* Os sócios nos dados estruturados só aqui, a página que mostra o nome e a função de cada um. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(sociosDoAtlas)} />
    </div>
  );
}

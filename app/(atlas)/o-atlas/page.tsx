import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { GloboDeNiteroi, MolduraGraduada } from "@/components/paginas/figuras";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { Historia } from "@/components/secoes/historia";
import { QuemFaz } from "@/components/secoes/quem-faz";
import { jsonLd, sociosDoAtlas } from "@/lib/dados-estruturados";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("atlas");

// O pico de luz da página (16/10, "Identidade mais profunda"): o fim da tarde, rasante e baixo, do oeste, sobre a
// baía. A água clareia à esquerda (--meio, o mais claro que fica sob texto) e cai para a água funda à direita; a luz
// fria, navy mais claro no mesmo matiz, vem do pé do oeste. O quente fica só no metal aceso do globo, nunca no ar.
const fimDaTarde = {
  "--cena-angulo": "90deg",
  "--cena-topo": "var(--meio)",
  "--cena-base": "var(--deep)",
  "--aurora-x": "0%",
  // No pé do oeste (a direção pedia 82%: o lide caía a 4,3:1 no ponto mais claro, com a luz sob ele).
  "--aurora-y": "100%",
  "--luz-fria": "color-mix(in oklch, var(--agua-rasa) 85%, transparent)",
  "--luz-quente": "transparent",
} as React.CSSProperties;

/**
 * O Atlas: a abertura é o globo da marca sobre as coordenadas de Niterói;
 * depois, a história em quatro capítulos — da sala de aula da UFF ao
 * balcão do comércio da cidade —, os três sócios e a origem do nome.
 * A figura fica quieta na entrada, e o globo gira quando entra na tela. De
 * 14 a 16/10, a tarja de bronze subia no "UFF": o segundo gesto de texto
 * do site, com a onda do "24h" (09-movimento.md, seção 6.1; o crítico de
 * fora). Na história, a linha sob o ponteiro acende o círculo.
 * Desde 16/10, a abertura é a folha da marca: a luz do fim da tarde, a
 * moldura graduada em minutos de arco e o globo gravado, que, a partir de
 * 768 px, desce e atravessa a emenda (a abertura fica por cima da
 * história, z-[1]; a figura pousa na emenda, e o globo passa 22% dela).
 */
export default function PaginaDoAtlas() {
  return (
    // A hora da página (16/10): dá o lado das sombras a toda a página (app/vidro.css). Um atributo, sem texto.
    <div data-hora="fim-da-tarde" className="contents">
      <AberturaDePagina
        pagina="atlas"
        figura={<GloboDeNiteroi />}
        fundo={<MolduraGraduada />}
        className="vd-cena z-[1]"
        style={fimDaTarde}
        classeDaFigura="md:self-end md:-mb-36"
      />
      <Historia />
      <QuemFaz />
      <ProximaPagina atual="atlas" />
      {/* Os sócios nos dados estruturados só aqui, a página que mostra o nome e a função de cada um. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(sociosDoAtlas)} />
    </div>
  );
}

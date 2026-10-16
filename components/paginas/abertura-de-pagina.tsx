import { Envelope, type Tom } from "@/components/estrutura";
import { Lide } from "@/components/tipografia";
import { paginasInternas, type PaginaInterna } from "@/conteudo/site";

type Props = {
  /** O id da página em `paginas` (conteudo/site.ts): de lá vêm o número, o rótulo, o título e o lide. */
  pagina: PaginaInterna["id"];
  tom?: Tom;
  /** A figura da página (components/paginas/figuras.tsx): o que dá a identidade dela. */
  figura: React.ReactNode;
  /** "lado": texto à esquerda, figura à direita; "embaixo": a figura ocupa a coluna inteira, abaixo do texto. */
  disposicao?: "lado" | "embaixo";
  /** "lado": quantas das 12 colunas a figura ocupa a partir de 1024 px; o texto fica com o resto. */
  colunasDaFigura?: keyof typeof COLUNAS;
};

/** As colunas do texto e da figura, lado a lado (classes inteiras, para o Tailwind as achar). */
const COLUNAS = {
  4: ["lg:col-span-8", "lg:col-span-4"],
  6: ["lg:col-span-6", "lg:col-span-6"],
} as const;

/**
 * A abertura de cada página interna (desde 01/10 cada assunto tem a sua
 * página): o número da página entre as seis (02 / 06) e o rótulo, em
 * bronze; o título em linhas — o h1 da página —; o lide; e a figura própria
 * da página. O texto chega parado, com a transição de página, que é do
 * sistema; o momento de cada página é o da sua figura, um por página e
 * diferente de uma para outra (components/paginas/figuras.tsx). Até 14/10,
 * as seis aberturas entravam iguais — o rótulo e o lide que se acendiam, as
 * linhas do título que subiam de dentro da janela, a tarja e a figura que
 * se acendia —, a marca M1 da mesma entrada em todas as páginas (pedido do
 * usuário, 14/10: "parecendo que você está spamando os mesmos
 * componentes"). De 14 a 16/10, O Atlas guardou a tarja de bronze no
 * "UFF": com a onda no "24h" da capa, eram dois gestos de texto num título,
 * e o gesto de texto é um só por site (09-movimento.md, seção 6.1, regra
 * 1; o crítico de fora); fica a onda, devolvida a pedido do usuário em
 * 03/10. A abertura sobe por baixo do cabeçalho de vidro
 * (-mt-18: os 72 px dele): o vidro passa sobre o tom da própria página. Em
 * cima, a altura do cabeçalho mais o respiro, na escala: pt-38 = 72 + 80 px;
 * md:pt-46 = 72 + 112 px. Título em Archivo Black, text-display, 40 a 80
 * px, com entrelinha 1,15 (os outros títulos têm 1; vem da tarja, que
 * passava da caixa da linha, e ficou: muda a medida das seis aberturas).
 * `colunasDaFigura` (14/10, o crítico de fora): Para quem dá 4 colunas à
 * figura. O Orçamento dava 5 (na metade da coluna, "Dois toques," não
 * cabia numa linha); desde 16/10, a figura dele, o montador, vai embaixo.
 */
export function AberturaDePagina({ pagina, tom = "escuro", figura, disposicao = "lado", colunasDaFigura = 6 }: Props) {
  const indice = paginasInternas.findIndex((p) => p.id === pagina);
  const { abertura } = paginasInternas[indice];
  const total = paginasInternas.length;
  const lado = disposicao === "lado";
  const [colunasDoTexto, colunasDaFiguraLg] = COLUNAS[colunasDaFigura];
  return (
    <section data-tom={tom} aria-labelledby="titulo-da-pagina" className="relative -mt-18 overflow-hidden pt-38 pb-24 md:pt-46 md:pb-36">
      <Envelope className={lado ? "grid items-center gap-16 lg:grid-cols-12 lg:gap-14" : undefined}>
        <div className={lado ? colunasDoTexto : "max-w-[58rem]"}>
          <p className="flex items-center gap-4 text-rotulo font-semibold text-accent">
            <span className="tabular-nums">
              {String(indice + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span aria-hidden="true" className="h-px w-10 bg-accent/60" />
            {abertura.rotulo}
          </p>
          <h1 id="titulo-da-pagina" className="mt-8 text-display leading-[1.15]">
            {abertura.titulo.map((linha) => (
              <span key={linha} className="block">
                {linha}
              </span>
            ))}
          </h1>
          <Lide className="mt-8">{abertura.lide}</Lide>
        </div>
        <div className={lado ? colunasDaFiguraLg : "mt-20"}>{figura}</div>
      </Envelope>
    </section>
  );
}

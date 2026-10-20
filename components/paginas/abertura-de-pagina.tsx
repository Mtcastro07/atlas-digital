import { Envelope, type Tom } from "@/components/estrutura";
import { Lide } from "@/components/tipografia";
import { paginasInternas, type PaginaInterna } from "@/conteudo/site";
import { cn } from "@/lib/utils";

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
  /** A luz da página (16/10): a classe do pico (vd-cena na água, vd-papel no papel), a emenda (z-[1], quando algo
   *  atravessa para a cena de baixo) e o estilo com as variáveis da hora. */
  className?: string;
  style?: React.CSSProperties;
  /** O lugar da figura na abertura, quando ela pousa na emenda (Planos, O Atlas; 16/10). */
  classeDaFigura?: string;
  /** Uma camada da cena inteira, atrás do texto e da figura (a moldura graduada de O Atlas; 16/10). */
  fundo?: React.ReactNode;
};

/** As colunas do texto e da figura, lado a lado (classes inteiras, para o Tailwind as achar). */
const COLUNAS = {
  6: ["lg:col-span-6", "lg:col-span-6"],
  7: ["lg:col-span-5", "lg:col-span-7"],
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
 * `colunasDaFigura` (14/10, o crítico de fora): Para quem dava 4 colunas à
 * figura; desde 16/10, 7, para a carta da costa ao lado da lista dos
 * bairros. O Orçamento dava 5 (na metade da coluna, "Dois toques," não
 * cabia numa linha); desde 16/10, a figura dele, o montador, vai embaixo.
 * Título em text-display, 40 a 96 px desde 16/10.
 * Desde 16/10 ("Identidade mais profunda"), a abertura leva a matéria do
 * tom (.vd-materia), e o número da página com o rótulo saem de cima do
 * título (o rótulo sobre o título, a marca T2) para o canto, como o número
 * da prancha de um atlas: na mesa, no canto de cima, à direita, na margem
 * da coluna, no respiro acima dela, em duas linhas alinhadas à direita; no
 * celular e no tablet, desde 17/10 (passe 4, fechamento com o Impeccable),
 * logo abaixo do lide, à esquerda, numa linha, no passo do texto (32 px,
 * o do título ao lide). De 16 a 17/10, no pé da abertura, à direita, como
 * o fólio de um livro: solto, longe do texto, lia como texto perdido. O
 * mesmo texto, na mesma ordem e no mesmo lugar do HTML (antes do h1), sem
 * o fio de 40 px.
 */
export function AberturaDePagina({ pagina, tom = "escuro", figura, disposicao = "lado", colunasDaFigura = 6, className, style, classeDaFigura, fundo }: Props) {
  const indice = paginasInternas.findIndex((p) => p.id === pagina);
  const { abertura } = paginasInternas[indice];
  const total = paginasInternas.length;
  const lado = disposicao === "lado";
  const [colunasDoTexto, colunasDaFiguraLg] = COLUNAS[colunasDaFigura];
  return (
    // Recorta só na horizontal (até 16/10, overflow-hidden): a figura que pousa na emenda passa para a cena de baixo.
    <section
      data-tom={tom}
      aria-labelledby="titulo-da-pagina"
      className={cn("vd-materia relative -mt-18 overflow-x-clip pt-38 pb-24 md:pt-46 md:pb-36", className)}
      style={style}
    >
      {fundo}
      <Envelope className={`lg:relative ${lado ? "grid items-center gap-16 lg:grid-cols-12 lg:gap-14" : ""}`}>
        {/* Embaixo, a coluna do texto vai à largura da página (até 16/10, 58rem): a 96 px, "endereço próprio." não cabia
            em 928 px e o título de O trabalho quebrava em três linhas. */}
        <div className={cn(lado ? colunasDoTexto : "max-w-[66rem]", "max-lg:flex max-lg:flex-col")}>
          {/* O fólio: até 1023 px, abaixo do lide (order-last), à esquerda; a partir de 1024, no canto de cima, preso ao
              Envelope, 24 px acima dele, no respiro. Na altura da primeira linha do título, ele cobria o canto da
              figura em Planos e em O Atlas, onde a figura começa no alto da coluna (medido a 1.440 px, 16/10). Na tinta
              apagada, como o fólio de um livro, e não no bronze, que é do que se toca (17/10: em Planos, o bronze sobre
              o pico da luz da manhã dava 4,17:1 na régua). */}
          <p className="order-last mt-8 flex gap-x-3 text-rotulo font-medium tracking-[0.02em] text-muted-foreground tabular-nums lg:absolute lg:right-[max(2.5rem,env(safe-area-inset-left),env(safe-area-inset-right))] lg:bottom-[calc(100%+1.5rem)] lg:mt-0 lg:block lg:text-right">
            <span className="block">
              {String(indice + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>{" "}
            <span className="block">{abertura.rotulo}</span>
          </p>
          <h1 id="titulo-da-pagina" className="text-display leading-[1.15]">
            {/* O espaço no fim da linha some no desenho, mas separa as palavras para quem lê o HTML sem montar a página. */}
            {abertura.titulo.map((linha) => (
              <span key={linha} className="block">
                {linha}{" "}
              </span>
            ))}
          </h1>
          <Lide className="mt-8">{abertura.lide}</Lide>
        </div>
        <div className={cn(lado ? colunasDaFiguraLg : "mt-20", classeDaFigura)}>{figura}</div>
      </Envelope>
    </section>
  );
}

import { Envelope, type Tom } from "@/components/estrutura";
import { Lide } from "@/components/tipografia";
import { paginasInternas, type PaginaInterna } from "@/conteudo/site";
import { cn } from "@/lib/utils";

type Props = {
  /** O id da página em `paginas` (conteudo/site.ts): de lá vêm o número, o rótulo, o título e o lide. */
  pagina: PaginaInterna["id"];
  /** O tom da cena na forma "agua" (o padrão): "escuro", a água; "claro", o papel; "pedra". Na tela, não vale: ela é navy. */
  tom?: Tom;
  /**
   * A matéria da cena (17/10, "o Atlas Digital", seções 2.2 e 2.6 da direção):
   * - "agua" (o padrão, a de até 17/10): a cena em sangria, de borda a borda, com a matéria do `tom` (a água com grão,
   *   ou o papel, com `tom="claro"`);
   * - "tela": a seção fica no papel, e a cena navy é a janela recortada nele (.vd-tela, app/digital.css): lisa, sem grão,
   *   com o raio --r-tela e a margem de papel nos quatro lados. Só onde há dado ou produto vivo (a regra da janela);
   * - "tela-sangra-esquerda": a mesma janela, recortada só à direita; pela esquerda, a figura continua além da borda
   *   (/duvidas, a rosa).
   * Na tela, `className` e `style` vão à janela, e a luz da hora é a rampa dela (--luz-x, --luz-y e --angulo, em
   * app/vidro.css; a .vd-cena não entra); a janela recorta tudo no raio, e a figura não atravessa a borda.
   */
  forma?: "agua" | "tela" | "tela-sangra-esquerda";
  /** A figura da página (components/paginas/figuras.tsx): o que dá a identidade dela. */
  figura: React.ReactNode;
  /**
   * - "lado": o texto à esquerda, a figura à direita;
   * - "figura-a-esquerda" (17/10, para /para-quem): a figura à esquerda, e o título e o lide à direita, no alto; no
   *   HTML, o texto continua antes da figura;
   * - "embaixo": a figura ocupa a coluna inteira, abaixo do texto;
   * - "centrada" (17/10, para /o-atlas): o título na margem, à esquerda, o lide na metade da direita, na mesma faixa e
   *   rente ao pé do título (a partir de 1024 px), e a figura centrada embaixo. Até a revisão de 17/10, o lide numa
   *   faixa só dele, abaixo do título: a figura descia 150 px, e a 1.440 × 900 a primeira tela era só o título.
   */
  disposicao?: "lado" | "figura-a-esquerda" | "embaixo" | "centrada";
  /** "lado" e "figura-a-esquerda": quantas das 12 colunas a figura ocupa a partir de 1024 px; o texto fica com o resto. */
  colunasDaFigura?: keyof typeof COLUNAS;
  /** A luz da página (16/10): a classe do pico (vd-cena na água, vd-papel no papel), a emenda (z-[1], quando algo
   *  atravessa para a cena de baixo) e o estilo com as variáveis da hora. Na tela, vão à janela (acima, `forma`). */
  className?: string;
  style?: React.CSSProperties;
  /** O lugar da figura na abertura, quando ela pousa na emenda (Planos, O Atlas; 16/10). */
  classeDaFigura?: string;
  /** Uma camada da cena inteira, atrás do texto e da figura (a moldura graduada de O Atlas; 16/10). */
  fundo?: React.ReactNode;
};

/** As colunas do texto e da figura, lado a lado, e onde o texto começa quando a figura vai à esquerda (classes
 *  inteiras, para o Tailwind as achar). */
const COLUNAS = {
  6: { texto: "lg:col-span-6", figura: "lg:col-span-6", textoADireita: "lg:col-start-7" },
  7: { texto: "lg:col-span-5", figura: "lg:col-span-7", textoADireita: "lg:col-start-8" },
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
 * cima, a altura do cabeçalho mais o respiro, na escala: lg:pt-46 = 72 +
 * 112 px na mesa; abaixo de 1024 px, desde 18/10, pt-26 = 104 px, onde a
 * capa põe o título (até então, 152 no celular e 184 no tablet: a primeira
 * pílula de /orcamento ficava a 61% da tela a 390 px). Título em Archivo Black, text-display, 40 a 80
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
 * celular e no tablet, desde 18/10, no mesmo canto, numa linha, entre o
 * cabeçalho e o título. De 17 a 18/10 (passe 4, fechamento com o
 * Impeccable), logo abaixo do lide, à esquerda: solto entre o texto e a
 * figura, a sobra de três revisões. De 16 a 17/10, no pé da abertura, à direita, como
 * o fólio de um livro: solto, longe do texto, lia como texto perdido. O
 * mesmo texto, na mesma ordem e no mesmo lugar do HTML (antes do h1), sem
 * o fio de 40 px.
 * Desde 17/10 ("o Atlas Digital", seções 2.5 e 2.6 da direção), a forma
 * (`forma`: a água em sangria, como até então, ou a tela recortada no
 * papel, inteira ou sangrando pela esquerda) e mais duas composições
 * (`disposicao`: a figura à esquerda e a centrada), para nenhuma abertura
 * repetir o molde da vizinha. Na tela, o cabeçalho de vidro e o fólio
 * passam por cima da janela: ela começa a 12 px do topo (8 no celular), e
 * o respiro de dentro desconta essa margem, para o título ficar onde fica
 * na água. A seção de fora pinta o papel sem data-tom: o primeiro
 * [data-tom] da página é a janela, que o cabeçalho lê na troca de página
 * (ilhas/cabecalho-retratil.tsx).
 */
export function AberturaDePagina({ pagina, tom = "escuro", forma = "agua", figura, disposicao = "lado", colunasDaFigura = 6, className, style, classeDaFigura, fundo }: Props) {
  const indice = paginasInternas.findIndex((p) => p.id === pagina);
  const { abertura } = paginasInternas[indice];
  const total = paginasInternas.length;
  const esquerda = disposicao === "figura-a-esquerda";
  const lado = disposicao === "lado" || esquerda;
  const centrada = disposicao === "centrada";
  const colunas = COLUNAS[colunasDaFigura];
  const cena = (
    <>
      {fundo}
      <Envelope className={`lg:relative ${lado ? "grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14" : ""}`}>
        {/* Embaixo, a coluna do texto vai à largura da página (até 16/10, 58rem): a 96 px, "endereço próprio." não cabia
            em 928 px e o título de O trabalho quebrava em três linhas. Com a figura à esquerda, o texto vai à direita e
            ao alto, pela grade (no HTML, continua antes da figura). */}
        <div
          className={cn(
            lado ? colunas.texto : !centrada && "max-w-[66rem]",
            centrada && "lg:grid lg:grid-cols-2 lg:items-end lg:gap-x-14",
            esquerda && [colunas.textoADireita, "lg:row-start-1 lg:self-start"],
            // A quebra da palavra, com a trilha presa à largura (grid-cols-1, no Envelope): com a letra a 200% a 320 px,
            // "estabelecimento" (o lide de /para-quem) alargava a trilha além da tela, e a carta, que sangra dela, saía
            // recortada à direita (WCAG 1.4.4; 18/10).
            "wrap-break-word max-lg:relative",
          )}
        >
          {/* O fólio, o número da prancha: no canto de cima, à direita, no respiro acima do título, preso à coluna do texto
              (12 px acima dela) até 1023 px e ao Envelope (24 px acima dele, em duas linhas) a partir de 1024. Na altura
              da primeira linha do título, ele cobria o canto da figura em Planos e em O Atlas (medido a 1.440 px,
              16/10); de 17 a 18/10, no celular, abaixo do lide, solto entre o texto e a figura (a sobra de três
              revisões). Abaixo de 12 rem (com a letra do leitor a 200%, até 384 px), ele não cabe numa linha, e em duas
              subiria sob o cabeçalho: fica só para o leitor de tela; a posição continua no menu, que marca a página aberta. Na tinta
              apagada, como o fólio de um livro, e não no bronze, que é do que se toca (17/10: em Planos, o bronze sobre
              o pico da luz da manhã dava 4,17:1 na régua). */}
          <p className="absolute right-0 bottom-[calc(100%+0.75rem)] flex flex-wrap justify-end gap-x-3 text-rotulo font-medium tracking-[0.02em] text-muted-foreground tabular-nums max-[12rem]:sr-only lg:right-[max(2.5rem,env(safe-area-inset-left),env(safe-area-inset-right))] lg:bottom-[calc(100%+1.5rem)] lg:block lg:text-right">
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
          {/* Centrada, o lide vai à metade da direita, ao lado do título na margem, rente ao pé dele. */}
          <Lide className={cn("mt-8", centrada && "lg:mt-0")}>{abertura.lide}</Lide>
        </div>
        <div
          className={cn(
            // O vão do texto à figura: 48 px fora da mesa, 80 na mesa. Pela variável, para o mt- de classeDaFigura (O Atlas,
            // Dúvidas, Planos) substituir o padrão em todas as larguras, e não só abaixo de 1024 px.
            lado ? colunas.figura : "mt-(--vao-da-figura) [--vao-da-figura:3rem] lg:[--vao-da-figura:5rem]",
            esquerda && "lg:col-start-1 lg:row-start-1",
            centrada && "flex justify-center",
            classeDaFigura,
          )}
        >
          {figura}
        </div>
      </Envelope>
    </>
  );

  if (forma === "agua")
    return (
      // Recorta só na horizontal (até 16/10, overflow-hidden): a figura que pousa na emenda passa para a cena de baixo.
      <section
        data-tom={tom}
        aria-labelledby="titulo-da-pagina"
        className={cn("vd-materia relative -mt-18 overflow-x-clip pt-26 pb-24 md:pb-36 lg:pt-46", className)}
        style={style}
      >
        {cena}
      </section>
    );
  // A tela: o papel em volta (flow-root, para a margem de cima da janela não escapar pela seção) e a janela navy dentro.
  return (
    <section aria-labelledby="titulo-da-pagina" className="relative -mt-18 flow-root [background:var(--fibra),var(--nevoa)]">
      <div
        data-tom="escuro"
        className={cn(
          forma === "tela" ? "vd-tela" : "vd-tela-sangra-esquerda",
          "pt-[calc(6.5rem-var(--margem-tela))] pb-24 md:pb-36 lg:pt-[calc(11.5rem-var(--margem-tela))]",
          className,
        )}
        style={style}
      >
        {cena}
      </div>
    </section>
  );
}

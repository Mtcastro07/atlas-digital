import { Envelope, type Tom } from "@/components/estrutura";
import { Lide } from "@/components/tipografia";
import { HighlightedText } from "@/components/ui/spell/highlighted-text";
import { paginasInternas, type PaginaInterna } from "@/conteudo/site";

const atraso = (ms: number) => ({ "--atraso": `${ms}ms` }) as React.CSSProperties;

/**
 * A linha do título com a palavra de destaque da página (`destaque`, em
 * conteudo/site.ts) dentro da tarja de bronze (Spell UI, Highlighted Text,
 * desde 03/10): ela sobe depois que a linha termina de entrar. Se a palavra
 * abre a linha, a tarja avança sobre a margem e a letra se alinha com as
 * outras linhas.
 */
function ComDestaque({ linha, destaque, atraso }: { linha: string; destaque: string; atraso: number }) {
  const i = linha.indexOf(destaque);
  if (i < 0) return linha;
  return (
    <>
      {linha.slice(0, i)}
      <HighlightedText atraso={atraso} className={i === 0 ? "mov-tarja-na-margem" : undefined}>
        {destaque}
      </HighlightedText>
      {linha.slice(i + destaque.length)}
    </>
  );
}

type Props = {
  /** O id da página em `paginas` (conteudo/site.ts): de lá vêm o número, o rótulo, o título e o lide. */
  pagina: PaginaInterna["id"];
  tom?: Tom;
  /** A figura da página (components/paginas/figuras.tsx): o que dá a identidade dela. */
  figura: React.ReactNode;
  /** "lado": texto à esquerda, figura à direita; "embaixo": a figura ocupa a coluna inteira, abaixo do texto. */
  disposicao?: "lado" | "embaixo";
};

/**
 * A abertura de cada página interna (desde 01/10 cada assunto tem a sua
 * página): o número da página entre as seis (02 / 06) e o rótulo, em
 * bronze; o título em linhas — o h1 da página —, que sobe linha a linha
 * de dentro da sua janela (.mov-janela, app/movimento.css); o lide; e a
 * figura própria da página. A abertura sobe por baixo do cabeçalho de vidro
 * (-mt-18: os 72 px dele): o vidro passa sobre o tom da própria página. Em
 * cima, a altura do cabeçalho mais o respiro, na escala: pt-38 = 72 + 80 px;
 * md:pt-46 = 72 + 112 px. Título em Archivo Black, text-display, 40 a 80
 * px, com entrelinha 1,15 (os outros títulos têm 1): a tarja da palavra de
 * destaque passa da caixa da linha, e com 1 cobria as descendentes da linha
 * de cima (a perna do "g" de "Origem", sob "UFF"; corrigido em 05/10).
 */
export function AberturaDePagina({ pagina, tom = "escuro", figura, disposicao = "lado" }: Props) {
  const indice = paginasInternas.findIndex((p) => p.id === pagina);
  const { abertura } = paginasInternas[indice];
  const total = paginasInternas.length;
  const lado = disposicao === "lado";
  return (
    <section data-tom={tom} aria-labelledby="titulo-da-pagina" className="relative -mt-18 overflow-hidden pt-38 pb-24 md:pt-46 md:pb-36">
      <Envelope className={lado ? "grid items-center gap-16 lg:grid-cols-12 lg:gap-14" : undefined}>
        <div className={lado ? "lg:col-span-6" : "max-w-[58rem]"}>
          <p className="mov-surge flex items-center gap-4 text-rotulo font-semibold text-accent">
            <span className="tabular-nums">
              {String(indice + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span aria-hidden="true" className="h-px w-10 bg-accent/60" />
            {abertura.rotulo}
          </p>
          <h1 id="titulo-da-pagina" className="mt-8 text-display leading-[1.15]">
            {abertura.titulo.map((linha, i) => (
              <span key={linha} className="mov-janela mov-janela-folgada block">
                <span className="mov-palavra block" style={atraso(80 + i * 120)}>
                  <ComDestaque linha={linha} destaque={abertura.destaque} atraso={760 + i * 120} />
                </span>
              </span>
            ))}
          </h1>
          <Lide className="mov-surge mt-8" style={atraso(320)}>
            {abertura.lide}
          </Lide>
        </div>
        <div className={`mov-surge ${lado ? "lg:col-span-6" : "mt-20"}`} style={atraso(420)}>
          {figura}
        </div>
      </Envelope>
    </section>
  );
}

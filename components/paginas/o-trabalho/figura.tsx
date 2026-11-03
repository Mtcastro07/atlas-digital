import { regua } from "@/conteudo/paginas/o-trabalho";
import { figuras } from "@/conteudo/site";

// A figura da abertura de O trabalho: cada página interna tem a sua, e é ela que dá a identidade da página (pedido do
// usuário, 01/10: "design único e identitário de cada uma das páginas"). Até 28/10, as cinco moravam em
// components/paginas/figuras.tsx; desde a fase 0 do R10, cada uma no arquivo da sua página.

/** Os números sob a fita: o primeiro começa no traço, o último termina nele, os do meio centram nele. */
function alinhamentoDaEscala(i: number, ultimo: number) {
  if (i === 0) return "";
  if (i === ultimo) return "-translate-x-full";
  return "-translate-x-1/2";
}

/**
 * O trabalho: a régua do prazo, em escala, como uma trena: um traço por dia útil, contado do briefing completo, e os
 * três trechos do caminho sobre ela (D10, 27 e 28/10: o prazo como hoje, "7 a 15 dias úteis, em geral").
 * Desde 28/10 (R10), a trena é uma fita de metal (o bronze fundido de .vd-metal, com o fio de luz em cima e a sombra
 * curta da tarde), com os 15 traços de dia gravados em navy; os trechos ficam em três linhas, como um cronograma, cada
 * nome sobre o seu traço e com o valor junto (Q18: "Rascunho, 24 h"; "Publicação, de 7 a 15 dias úteis, em geral"), a
 * 17 px, no degrau do corpo (até 28/10, 14 px nos nomes e 12 px na escala). A unidade fica na escala (na coluna estreita, onde ela não cabe,
 * na legenda); a origem da conta, no lide logo acima (até 03/11, também na legenda, que a repetia). A partir de 768 px, atrás dos trechos, a quadrícula dos dias úteis (uma
 * coluna por dia, uma linha por trecho, em navy a 7%): a escala da própria trena, a única quadrícula do site.
 * O momento da chegada (desde 14/10): os traços de dia descem um a um, da esquerda para a direita (.mov-risca), e, no
 * mesmo passo, uma janela corre sobre os trechos e os escreve (.mov-trena): o prazo se mede na chegada.
 * A passiva (R10, P9; data-passiva="o-trabalho-janela"): o bronze da janela da publicação corre do traço 7 ao 15, com a
 * ponta dissolvida, pela escala horizontal com a origem no 7, e se apaga: o prazo varia dentro da janela, "em geral". Em
 * repouso (o movimento reduzido, sem script), a janela tracejada de hoje, sem o bronze.
 */
export function ReguaDoTrabalho() {
  const { descricao, dias, trechos, escala, unidade } = figuras.regua;
  const pos = (dia: number) => `${(dia / dias) * 100}%`;
  const ultimo = escala.length - 1;
  return (
    <figure aria-label={descricao} data-ambiente="" className="ot-trena">
      <div className="relative">
        {/* A quadrícula dos dias, atrás dos trechos (a partir de 768 px). */}
        <div aria-hidden="true" className="vd-quadricula absolute inset-0 hidden md:block" />
        {/* A janela que corre sobre os trechos, no passo dos traços de dia (a técnica da onda e da tarja). */}
        <div className="mov-trena overflow-hidden">
          <ol className="mov-trena-conteudo">
            {trechos.map((t, i) => (
              <li key={t.rotulo} className="ot-trecho" style={{ "--de": pos(t.de), "--largura": pos(t.ate - t.de) } as React.CSSProperties}>
                <span className={i === 0 ? "ot-trecho-nome font-semibold text-accent" : "ot-trecho-nome"}>{regua.rotulos[i]}</span>
                <span aria-hidden="true" className={`ot-traco ot-traco-${t.tipo}`}>
                  {t.tipo === "janela" && <span data-passiva="o-trabalho-janela" className="ot-varredura mov-passiva" />}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      {/* A fita: um traço por dia útil, gravado no metal; os de 0, 5, 10 e 15 descem abaixo dela. */}
      <div aria-hidden="true" className="ot-fita">
        {Array.from({ length: dias + 1 }, (_, d) => (
          <span key={d} className={`mov-risca ot-fita-traco ${d % 5 === 0 ? "ot-fita-traco-maior" : ""}`} style={{ left: pos(d), "--d": d } as React.CSSProperties} />
        ))}
      </div>
      <p aria-hidden="true" className="ot-escala">
        {escala.map((d, i) => (
          <span key={d} className={`absolute top-0 whitespace-nowrap ${alinhamentoDaEscala(i, ultimo)}`} style={{ left: pos(d) }}>
            {d}
            {i === ultimo && <span className="ot-escala-unidade"> {unidade}</span>}
          </span>
        ))}
      </p>
      <figcaption className="ot-escala-legenda mt-5 text-corpo text-muted-foreground">{regua.legenda}</figcaption>
    </figure>
  );
}

import { Envelope, Secao } from "@/components/estrutura";
import { duvidas } from "@/conteudo/duvidas";
import { figuras } from "@/conteudo/site";

/** A grade da mesa tem quatro linhas de perguntas por momento (app/paginas/duvidas.css). */
if (figuras.momentos.some((m) => m.itens.length > 4)) throw new Error("Dúvidas: um momento passou de quatro perguntas");

/**
 * O objeto de cada momento (R10, acabamento, 02/11; a passiva P35), à direita do título, cada um com o seu movimento,
 * ligado ao momento: antes de contratar, a agulha que busca o rumo; na contratação, a assinatura que se traça; durante o
 * trabalho, as 24 horas que passam; com o site no ar, o sinal que se abre. Desenho: o título diz o momento.
 */
function ObjetoDoMomento({ i }: { i: number }) {
  return (
    <span aria-hidden="true" className={`vd-momento-objeto vd-momento-${i + 1}`}>
      <span className="vd-momento-peca mov-passiva">
        {i === 1 && (
          <span className="vd-momento-traco mov-passiva">
            <svg viewBox="0 0 66 40" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 27c5-11 10-22 13-21s-2 22 1 24 7-13 10-12-1 10 2 10 5-8 8-7 0 7 3 7 6-5 9-5 3 3 6 3 6-2 10-3" />
            </svg>
          </span>
        )}
      </span>
    </span>
  );
}

/**
 * A mesa de leitura (R10): os quatro momentos em h2 e, na mesa, a pergunta à esquerda e a resposta aberta ao lado. O
 * <details name> dá uma resposta aberta por momento, sem script: quatro à vista na chegada. O id (#duvida-N, a mesma
 * numeração de conteudo/duvidas.ts) fica na resposta, e não no <details>, que na mesa não tem caixa (display: contents):
 * a ilha Ancoras abre e mede a resposta, e sem script o navegador abre o <details> do destino.
 */
export function Duvidas() {
  return (
    <Secao id="duvidas" tom="claro">
      <Envelope className="vd-mesa">
        <div className="vd-mesa-momentos">
          {figuras.momentos.map((m, i) => (
            <div key={m.momento} role="group" aria-labelledby={`momento-${i + 1}`} className="vd-mesa-momento" data-ambiente data-passiva={`duvidas-momento-${i + 1}`}>
              <div className="vd-momento-cabeca">
                <h2 id={`momento-${i + 1}`}>{m.momento}</h2>
                <ObjetoDoMomento i={i} />
              </div>
              <div className="vd-mesa-itens">
                {m.itens.map((item, j) => (
                  <details key={item.duvida} name={`momento-${i + 1}`} open={j === 0} className="vd-duvida">
                    <summary>
                      <span className="vd-duvida-pergunta">{duvidas[item.duvida - 1].pergunta}</span>
                      <span aria-hidden="true" className="vd-duvida-sinal" />
                    </summary>
                    <div id={`duvida-${item.duvida}`} className="vd-duvida-resposta">
                      <p>{duvidas[item.duvida - 1].resposta}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Envelope>
    </Secao>
  );
}

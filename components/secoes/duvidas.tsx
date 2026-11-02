import { Trecho } from "@/components/codigo/trecho";
import { Envelope, Secao } from "@/components/estrutura";
import { duvidas } from "@/conteudo/duvidas";
import { legendaDoCodigo } from "@/conteudo/paginas/duvidas";
import { figuras } from "@/conteudo/site";
import { perguntasFrequentes } from "@/lib/dados-estruturados";

/** A grade da mesa tem quatro linhas de perguntas por momento (app/paginas/duvidas.css). */
if (figuras.momentos.some((m) => m.itens.length > 4)) throw new Error("Dúvidas: um momento passou de quatro perguntas");

/** O começo do primeiro objeto Question, como o servidor o manda, com uma quebra depois de "Question",. */
function comecoDoJsonLd() {
  const comeco = /^(\{"@type":"Question",)("name":"[^"]*",)/.exec(JSON.stringify(perguntasFrequentes.mainEntity[0]));
  if (!comeco) throw new Error("Dúvidas: o JSON-LD da primeira pergunta mudou de forma");
  return comeco;
}

/**
 * O objeto de cada momento (R10, acabamento, 02/11; a passiva P35), à direita do título, cada um com o seu movimento,
 * ligado ao momento: antes de contratar, a agulha que busca o rumo; na contratação, a assinatura que se traça; durante o
 * trabalho, as 24 horas que passam; com o site no ar, o sinal que se abre. Desenho: o título diz o momento.
 */
function ObjetoDoMomento({ i }: { i: number }) {
  return (
    <span aria-hidden="true" className={`vd-momento-objeto vd-momento-${i + 1}`}>
      <span className="vd-momento-peca mov-passiva" />
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
  const comeco = comecoDoJsonLd();
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
        <Trecho
          className="vd-mesa-codigo"
          trecho={{ linhas: [comeco[1], ` ${comeco[2]}`] }}
          tintas={[
            ['"@type"', "chave"],
            ['"name"', "chave"],
            ['"Question"', "nome"],
            [comeco[2].slice(7, -1), "valor"],
          ]}
          legenda={legendaDoCodigo}
        />
      </Envelope>
    </Secao>
  );
}

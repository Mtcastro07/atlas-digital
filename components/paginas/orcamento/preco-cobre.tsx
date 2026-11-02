import { Envelope, Secao } from "@/components/estrutura";
import { precoCobre as t } from "@/conteudo/paginas/orcamento";
import { contato } from "@/conteudo/contato";

/** O endereço deste site, partido no protocolo e no domínio (conteudo/contato.ts), e não escrito à mão. */
const [protocolo, dominio] = contato.url.split("://");

/**
 * A folha do calendário (a passiva P7, "o mês passa"), em tamanho de objeto desde 02/11 (de 92 px a 272 px na mesa): os
 * anéis e uma grade de pontos, sem número nem data. A folha de cima vira por cima dos anéis (rotateX, presa no alto, com
 * perspectiva) e some de costas; a de baixo, igual, fica, com a sombra que a folha erguida deixa nela.
 */
function Calendario() {
  return (
    <div className="orc-calendario" data-ambiente data-passiva="orcamento-calendario" aria-hidden="true">
      <div className="orc-calendario-folha orc-calendario-fica">
        <div className="orc-calendario-sombra mov-passiva" />
      </div>
      <div className="orc-calendario-vira mov-passiva">
        <div className="orc-calendario-folha" />
      </div>
      <div className="orc-calendario-aneis" />
    </div>
  );
}

/**
 * A cena "O que o preço cobre." (R10, D14; a cena de largura total desde 02/11, no acabamento). No navy, a mensalidade:
 * o endereço como objeto, em toda a largura, e as cinco partes que o mantêm no ar ligadas a ele por fios, com o pulso que
 * desce por cada um (a passiva P18). No toque, o endereço flutua (P8); na mesa, fica parado, e os pulsos se movem. Na pedra, a criação, com as duas parcelas, e o que é à parte.
 * Até 02/11, rótulo à esquerda, parágrafo à direita e uma tabela de cinco definições.
 */
export function PrecoCobre() {
  const { umaVez, todoMes, aParte } = t.grupos;
  return (
    <>
      <Secao tom="escuro" aria-labelledby="cobre-titulo" className="orc-cena">
        <Envelope>
          <h2 id="cobre-titulo" className="text-display">
            {t.titulo}
          </h2>
          <div className="orc-cena-mes">
            <div>
              <h3 className="orc-cena-tempo">
                {todoMes.titulo} <small>{todoMes.sobre}</small>
              </h3>
              <p className="orc-cena-frase">{todoMes.frase}</p>
            </div>
            <Calendario />
          </div>
          <div className="orc-endereco" data-ambiente data-passiva="orcamento-endereco">
            <div className="orc-endereco-sombra mov-passiva" aria-hidden="true" />
            <p className="orc-url-legenda">{t.endereco.legenda}</p>
            <p className="orc-url mov-passiva">
              <span className="orc-url-protocolo">{protocolo}://</span>
              <span className="orc-url-dominio">{dominio}</span>
            </p>
            <dl className="orc-partes">
              {t.mensalidade.map(({ termo, definicao }, i) => (
                <div key={termo} className="mov-passiva" style={{ "--vez": i } as React.CSSProperties}>
                  <dt>{termo}</dt>
                  <dd>{definicao}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Envelope>
      </Secao>
      <Secao tom="pedra" aria-label={umaVez.titulo} className="orc-tempos">
        <Envelope className="orc-tempos-grade">
          <div>
            <h3 className="orc-cena-tempo">
              {umaVez.titulo} <small>{umaVez.sobre}</small>
            </h3>
            <p className="orc-cena-frase">{umaVez.frase}</p>
            <div className="orc-metades" data-ambiente data-passiva="orcamento-metades" aria-hidden="true">
              <span className="orc-metade">{t.metades[0]}</span>
              <span className="orc-metade orc-metade-vem">
                <span className="orc-metade-enche mov-passiva" />
                <span className="relative">{t.metades[1]}</span>
              </span>
            </div>
          </div>
          <div>
            <h3 className="orc-cena-tempo">
              {aParte.titulo} <small>{aParte.sobre}</small>
            </h3>
            <p className="orc-cena-frase">{aParte.frase}</p>
          </div>
        </Envelope>
      </Secao>
    </>
  );
}

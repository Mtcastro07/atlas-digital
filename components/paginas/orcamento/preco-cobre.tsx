import { Envelope, Secao } from "@/components/estrutura";
import { precoCobre as t } from "@/conteudo/paginas/orcamento";
import { contato } from "@/conteudo/contato";

/** O endereço deste site, partido no protocolo e no domínio (conteudo/contato.ts), e não escrito à mão. */
const [protocolo, dominio] = contato.url.split("://");

/** As duas folhas da agenda: só mudam o dia da semana em que o mês começa e a conta dos dias. Nada de número nem data. */
const MESES = [
  { comeca: 2, dias: 30 },
  { comeca: 4, dias: 31 },
];

/** Os dias de um mês, em pastilhas. O último, em bronze: o que se confere e se renova a cada mês. */
function Dias({ comeca, dias, tom }: { comeca: number; dias: number; tom: "parado" | "aceso" }) {
  return (
    <svg viewBox="0 0 280 200" className={`orc-agenda-dias orc-agenda-dias-${tom}`}>
      {Array.from({ length: dias }, (_, d) => {
        const casa = comeca + d;
        return <rect key={d} x={(casa % 7) * 40 + 5} y={Math.floor(casa / 7) * 40 + 5} width="30" height="30" rx="10" className={d === dias - 1 ? "orc-agenda-fim" : undefined} />;
      })}
    </svg>
  );
}

/**
 * A agenda (a passiva P7, "todo mês"): um cartão de vidro sobre o navy, com os dias em pastilhas, sem anel nem cartolina.
 * Em cada mês, a luz desliza de dia em dia, na diagonal e sem aresta; depois, a folha sobe e se dissolve enquanto a
 * seguinte chega por baixo, em camadas. Cada folha é pintada uma vez: só o transform e a opacidade mudam. Em repouso, o
 * primeiro mês, parado.
 */
function Agenda() {
  return (
    <div className="orc-agenda" data-ambiente data-passiva="orcamento-calendario" aria-hidden="true">
      <div className="orc-agenda-topo" />
      <div className="orc-agenda-folhas">
        {MESES.map((mes, i) => (
          <div key={mes.comeca} className="orc-agenda-folha mov-passiva" style={{ "--vez": i } as React.CSSProperties}>
            <Dias {...mes} tom="parado" />
            <span className="orc-agenda-janela mov-passiva">
              <span className="orc-agenda-luz mov-passiva">
                <Dias {...mes} tom="aceso" />
              </span>
            </span>
          </div>
        ))}
      </div>
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
            <Agenda />
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

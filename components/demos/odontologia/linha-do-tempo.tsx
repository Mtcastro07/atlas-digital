import type { Etapa } from "@/conteudo/demos/odontologia";

type Textos = {
  dia: (n: number) => string;
  dias: (n: number) => string;
  ciclo: (n: number) => string;
  resumo: (marcos: readonly { nome: string; dia: number }[], ciclo?: number) => string;
};

/**
 * A linha do tempo de um tratamento da Odontologia Boa Viagem: as sessões numa régua proporcional aos dias, cada uma
 * uma peça de cerâmica, com o dia embaixo e o intervalo a lápis entre elas; a sessão que se repete (as manutenções do
 * aparelho) continua num traço tracejado. É o tempo no lugar do preço, desenhado (producao/esteira/nichos/
 * odontologia.md, seção 4.1). O desenho é decorativo: a legenda dá o resumo ao leitor de tela, e a lista de sessões, logo
 * abaixo, tem o detalhe. O traço se desenha uma vez, na revelação. Com uma sessão só, nada a desenhar. Ordem do HTML: a
 * da leitura (a sessão, o intervalo, a sessão), para a régua virar coluna no celular sem trocar de ordem. No celular,
 * a régua é a coluna (odontologia.css, o passe do celular), e o traço espera a figura entrar na tela ([data-cena]: a
 * ilha do consultório a acende), em vez de correr na carga, fora da vista.
 */
export function LinhaDoTempo({ etapas, textos, minutos }: { etapas: readonly Etapa[]; textos: Textos; minutos: (m: number) => string }) {
  if (etapas.length < 2) return null;
  let dia = 1;
  const marcos = etapas.map((e) => {
    const marco = { ...e, dia };
    dia += e.dias ?? 0;
    return marco;
  });
  const ultimo = marcos[marcos.length - 1];
  const ciclo = ultimo.ciclo;
  // A régua vai até o último marco, mais um ciclo, quando a última sessão se repete.
  const fim = Math.max(1, ultimo.dia - 1 + (ciclo ?? 0));
  const em = (d: number) => ((d - 1) / fim) * 100;
  return (
    <figure className="od-linha" data-revelar data-cena>
      <figcaption className="sr-only">{textos.resumo(marcos, ciclo)}</figcaption>
      <div aria-hidden="true" className="od-linha-regua">
        <span className="od-linha-traco" style={{ width: `${em(ultimo.dia)}%` }} />
        {ciclo && <span className="od-linha-ciclo" style={{ left: `${em(ultimo.dia)}%` }} />}
        {marcos.map((m, i) => {
          const proximo = marcos[i + 1];
          return [
            <div key={m.nome} className="od-linha-marco" style={{ left: `${em(m.dia)}%`, "--i": i } as React.CSSProperties}>
              <span className="od-linha-peca">
                <strong>{m.nome}</strong>
                <span>{minutos(m.minutos)}</span>
              </span>
              <span className="od-linha-dia">{textos.dia(m.dia)}</span>
            </div>,
            proximo && m.dias ? (
              <span key={`${m.nome}-intervalo`} className="od-linha-intervalo" style={{ left: `${(em(m.dia) + em(proximo.dia)) / 2}%` }}>
                {textos.dias(m.dias)}
              </span>
            ) : null,
            !proximo && ciclo ? (
              <span key="ciclo" className="od-linha-intervalo" style={{ left: `${(em(m.dia) + 100) / 2}%` }}>
                {textos.ciclo(ciclo)}
              </span>
            ) : null,
          ];
        })}
      </div>
    </figure>
  );
}

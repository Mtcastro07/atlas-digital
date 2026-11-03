import { Envelope } from "@/components/estrutura";
import { CARTA, LUGARES_NA_CARTA, TERRA } from "@/components/paginas/costa-de-niteroi";
import { textosDaPagina } from "@/conteudo/paginas/para-quem";
import { paraQuem, simulador } from "@/conteudo/site";

// A figura de Para quem. Até 28/10, a carta da costa de Niterói ao lado da lista dos três bairros, dentro da abertura
// (a CartaDeNiteroi, de 16/10). Desde 28/10 (R10, D5: a decisão do aprovador), a chapa da carta: a carta numa placa de
// água funda; de 28/10 a 03/11, presa à direita na mesa até o fim dos públicos, cada um acendendo o seu bairro ao passar
// pelo meio da tela. Desde 03/11 (nenhuma parte presa), na mesa, parada ao lado do título da abertura, e os três bairros
// acendem um de cada vez, por tempo. No celular, a chapa fica no fluxo, sob o lide, com Icaraí aceso. O CSS mora em
// app/paginas/para-quem.css.

/** O bairro aceso em repouso. */
const BAIRRO_EM_REPOUSO: string = "Icaraí";

/** O público de cada lugar da carta: o do site de exemplo daquele bairro (o nome do site termina pelo bairro). */
const exemplos = paraQuem.publicos.map((publico) => simulador.sites.find((site) => site.plano === publico.plano));
const publicoDo = (bairro: string) => {
  const i = exemplos.findIndex((site) => site?.nome.endsWith(bairro));
  if (i < 0) throw new Error(`para-quem: nenhum público tem o site de exemplo em ${bairro}`);
  return i;
};

/** As linhas d'água: um anel de 14 m (2 · 7) a cada distância da costa, recortado por máscara (a água fica à mostra). */
const AGUAS = [260, 140, 60];

export function ChapaDaCarta() {
  return (
    // O ambiente das passivas (o observador de components/ilhas/controle-do-movimento.tsx lhe dá data-visivel e
    // data-fora): na mesa, o trilho vai do alto do palco ao pé da chapa, posto sobre a abertura; no celular, é só a
    // chapa, no fluxo.
    <div data-ambiente className="vd-pq-trilho">
      <Envelope className="vd-pq-grade h-full">
        <div className="vd-pq-coluna">
          <figure className="vd-chapa">
            <div className="vd-chapa-mapa" style={{ aspectRatio: `${CARTA.largura} / ${CARTA.altura}` }}>
              {/* A folha: a máscara dissolve a costa na água da chapa (a figura não termina na caixa: a marca I8). */}
              <div className="vd-chapa-folha">
                {/* P3, a deriva: as três linhas d'água numa camada só, um <svg> inteiro que anda (o movimento nunca
                    dentro do SVG); a terra, por cima, fica. */}
                <svg
                  data-passiva="para-quem-aguas"
                  viewBox={`0 0 ${CARTA.largura} ${CARTA.altura}`}
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                  className="vd-chapa-aguas mov-passiva"
                >
                  <defs>
                    <path id="pq-terra" d={TERRA} />
                    <mask id="pq-aguas" maskUnits="userSpaceOnUse" x="-1000" y="-1000" width={CARTA.largura + 2000} height={CARTA.altura + 2000}>
                      <g fill="none" strokeLinejoin="round">
                        {AGUAS.flatMap((d) => [
                          <use key={`${d}+`} href="#pq-terra" stroke="#fff" strokeWidth={2 * (d + 7)} />,
                          <use key={`${d}-`} href="#pq-terra" stroke="#000" strokeWidth={2 * (d - 7)} />,
                        ])}
                      </g>
                    </mask>
                  </defs>
                  <rect x="-200" y="-200" width={CARTA.largura + 400} height={CARTA.altura + 400} mask="url(#pq-aguas)" />
                </svg>
                <svg viewBox={`0 0 ${CARTA.largura} ${CARTA.altura}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="vd-chapa-terra">
                  <use href="#pq-terra" className="sombra" />
                  <use href="#pq-terra" className="terra" />
                </svg>
              </div>
              {/* Os marcos: HTML sobre a carta, nos nós do OpenStreetMap, em % da caixa, para se erguerem por transform
                  sem repintar o desenho. P4, o sinal: a onda que sai do marco aceso. O nome do bairro em px, como parte
                  do desenho (a página o diz em texto na legenda e no índice). */}
              <div data-passiva="para-quem-sinal" aria-hidden="true" className="vd-chapa-marcos">
                {LUGARES_NA_CARTA.map((lugar) => {
                  const luzes = lugar.nome === BAIRRO_EM_REPOUSO ? (["vd-leitura", "vd-repouso"] as const) : (["vd-leitura"] as const);
                  return (
                    <span
                      key={lugar.nome}
                      data-i={publicoDo(lugar.nome)}
                      className="vd-pino"
                      style={{ "--x": `${lugar.x}%`, "--y": `${lugar.y}%` } as React.CSSProperties}
                    >
                      <span className="vd-pino-chao mov-constante" />
                      {luzes.map((luz) => (
                        <span key={luz} className={`vd-pino-sinal mov-passiva ${luz}`}>
                          <span className="vd-pino-onda mov-passiva" />
                        </span>
                      ))}
                      <span className="vd-pino-disco mov-constante">
                        {luzes.map((luz) => (
                          <span key={luz} className={`vd-pino-aceso mov-passiva ${luz}`} />
                        ))}
                      </span>
                      <span className="vd-pino-nome">{lugar.nome}</span>
                    </span>
                  );
                })}
              </div>
            </div>
            <figcaption className="vd-chapa-margem">
              <p className="vd-chapa-frase">{textosDaPagina.carta.frase(LUGARES_NA_CARTA.length)}</p>
              <p className="vd-chapa-credito">{textosDaPagina.carta.credito}</p>
            </figcaption>
          </figure>
        </div>
      </Envelope>
    </div>
  );
}

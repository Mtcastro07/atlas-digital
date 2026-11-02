import { Trecho } from "@/components/codigo/trecho";
import { Envelope } from "@/components/estrutura";
import { CARTA, LUGARES_NA_CARTA, TERRA } from "@/components/paginas/costa-de-niteroi";
import { textosDaPagina } from "@/conteudo/paginas/para-quem";
import { paraQuem, simulador } from "@/conteudo/site";
import { trechoDe } from "@/lib/trecho";

// A figura de Para quem. Até 28/10, a carta da costa de Niterói ao lado da lista dos três bairros, dentro da abertura
// (a CartaDeNiteroi, de 16/10). Desde 28/10 (R10, D5: a decisão do aprovador), a chapa da carta: a carta numa placa de
// água funda, presa à direita na mesa, da abertura ao fim dos públicos, que são a legenda dela; cada público, ao passar
// pelo meio da tela, acende o seu bairro (a prova do estudo: registros/atlas/design-v2/R10/paginas/para-quem.md, 3.2).
// No celular, a chapa fica no fluxo, sob o lide, com Icaraí aceso. O CSS mora em app/paginas/para-quem.css.

/** O código mostrado: o lugar de Icaraí em LUGARES_NA_CARTA, lido no build (costa-de-niteroi.ts, linha 12). */
const ICARAI = trechoDe("components/paginas/costa-de-niteroi.ts", '{"nome":"Icaraí","x":66.85,"y":73.86}');
/** O bairro da linha do código: o aceso do repouso (a frase da margem fala dele). */
const BAIRRO_DO_CODIGO: string = JSON.parse(ICARAI.linhas[0]).nome;
/** As tintas (C-codigo.md, 3.3): o nome e os números no bronze-brilho; as chaves e a pontuação no apagado. */
const TINTAS = [
  [`"${BAIRRO_DO_CODIGO}"`, "valor"],
  ["66.85", "valor"],
  ["73.86", "valor"],
  ['"nome"', "apagado"],
  ['"x"', "apagado"],
  ['"y"', "apagado"],
] as const;

/** O público de cada lugar da carta: o do site de exemplo daquele bairro (o nome do site termina pelo bairro). */
const exemplos = paraQuem.publicos.map((publico) => simulador.sites.find((site) => site.plano === publico.plano));
const publicoDo = (bairro: string) => {
  const i = exemplos.findIndex((site) => site?.nome.endsWith(bairro));
  if (i < 0) throw new Error(`para-quem: nenhum público tem o site de exemplo em ${bairro}`);
  return i;
};

/** As linhas d'água: um anel de 14 m (2 · 7) a cada distância da costa, recortado por máscara (a água fica à mostra). */
const AGUAS = [260, 140, 60];

/**
 * A linha do código, acesa nas tintas (a que o leitor de tela lê), e, por cima, o véu: a mesma linha toda no apagado,
 * que a apaga. O véu aparece só quando o bairro dela não está aceso nem pela leitura nem pelo repouso: as duas luzes se
 * somam, e o véu é o produto dos dois "apagados" (duas camadas aninhadas, cada uma com a sua opacidade). No celular e
 * sem a leitura, o véu não aparece: a linha fica acesa, com Icaraí.
 */
function LinhaDoCodigo({ linhas, veu, className }: { linhas: string[]; veu?: number; className: string }) {
  return (
    <div className={`vd-chapa-codigo ${className}`}>
      <Trecho semFicha trecho={{ linhas }} tintas={TINTAS} />
      {veu !== undefined && (
        <div aria-hidden="true" className="vd-chapa-codigo-veu vd-repouso">
          <div data-i={veu} className="vd-leitura">
            <Trecho semFicha trecho={{ linhas }} tintas={linhas.map((l) => [l, "apagado"] as const)} />
          </div>
        </div>
      )}
    </div>
  );
}

export function ChapaDaCarta() {
  const [linha] = ICARAI.linhas;
  // No celular, em duas linhas de até 34 caracteres, quebradas antes do "x" (o recuo de um espaço alinha com o "{").
  const corte = linha.indexOf(',"x"') + 1;
  const duasLinhas = [linha.slice(0, corte), ` ${linha.slice(corte)}`];
  return (
    // O ambiente das passivas (o observador de components/ilhas/controle-do-movimento.tsx lhe dá data-visivel e
    // data-fora): na mesa, o trilho é do tamanho do palco, a abertura e os públicos, por onde a chapa anda presa; no
    // celular, é só a chapa, no fluxo.
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
                  const luzes = lugar.nome === BAIRRO_DO_CODIGO ? (["vd-leitura", "vd-repouso"] as const) : (["vd-leitura"] as const);
                  return (
                    <span
                      key={lugar.nome}
                      data-i={publicoDo(lugar.nome)}
                      className="vd-pino"
                      style={{ "--x": `${lugar.x}%`, "--y": `${lugar.y}%` } as React.CSSProperties}
                    >
                      <span className="vd-pino-chao mov-constante" />
                      {luzes.map((luz) => (
                        <span key={luz} className={`vd-pino-sinal ${luz}`}>
                          <span className="vd-pino-onda mov-passiva" />
                        </span>
                      ))}
                      <span className="vd-pino-disco mov-constante">
                        {luzes.map((luz) => (
                          <span key={luz} className={`vd-pino-aceso ${luz}`} />
                        ))}
                      </span>
                      <span className="vd-pino-nome">{lugar.nome}</span>
                    </span>
                  );
                })}
              </div>
            </div>
            <figcaption className="vd-chapa-margem">
              <LinhaDoCodigo linhas={[linha]} veu={publicoDo(BAIRRO_DO_CODIGO)} className="vd-so-mesa" />
              <LinhaDoCodigo linhas={duasLinhas} className="vd-so-celular" />
              <p className="vd-chapa-frase">{textosDaPagina.carta.frase(LUGARES_NA_CARTA.length)}</p>
              <p className="vd-chapa-credito">{textosDaPagina.carta.credito}</p>
            </figcaption>
          </figure>
        </div>
      </Envelope>
    </div>
  );
}

import { GloboDoLogotipo } from "@/components/marca/logotipo";
import { CARTA, LUGARES_NA_CARTA, TERRA } from "@/components/paginas/costa-de-niteroi";
import { ROSA } from "@/components/paginas/rosa";
import { planos } from "@/conteudo/planos";
import { figuras, type IdDaPagina } from "@/conteudo/site";

/**
 * Os desenhos do índice do início (R10, 28/10, D9): a miniatura do objeto de cada página, e nunca um ícone de banco,
 * desenhada a partir dos mesmos dados do objeto, a 48 px (40 no celular), em traço de navy e de bronze, na espessura
 * de tela (app/paginas/inicio.css, .inicio-desenho). Parados: são seis, e o movimento em todos seria série. São
 * aria-hidden: a frase da linha diz o que cada um mostra.
 */

const n = (v: number) => +v.toFixed(1);

/** A costa de Niterói, simplificada para 48 px: de cada contorno da terra, só os vértices a mais de ~2 px (220
 *  unidades da carta) do último que ficou. A carta inteira tem ~5 KB de traçado; a miniatura, uma fração. */
const COSTA = TERRA.split("M")
  .filter(Boolean)
  .map((contorno) => {
    const pontos = contorno
      .replace(/Z$/, "")
      .split("L")
      .map((p) => p.trim().split(/\s+/).map(Number));
    const ficam = [pontos[0]];
    for (const p of pontos.slice(1)) {
      const [x, y] = ficam.at(-1)!;
      if (Math.hypot(p[0] - x, p[1] - y) > 220) ficam.push(p);
    }
    return `M${ficam.map(([x, y]) => `${x} ${y}`).join("L")}Z`;
  })
  .join("");

function Carta() {
  return (
    <svg viewBox={`0 0 ${CARTA.largura} ${CARTA.altura}`} aria-hidden="true" className="inicio-desenho" style={{ overflow: "hidden" }}>
      <rect width={CARTA.largura} height={CARTA.altura} className="fino" />
      <path d={COSTA} className="tinta costa" />
      {LUGARES_NA_CARTA.map((lugar) => (
        <circle key={lugar.nome} cx={n((lugar.x / 100) * CARTA.largura)} cy={n((lugar.y / 100) * CARTA.altura)} r="330" className="cheio-bronze" />
      ))}
    </svg>
  );
}

/** Os três degraus, encostados, na altura do preço de criação de cada plano contra o maior (37,5%, 62,5% e 100%): a
 *  escada de pedra de /planos. O piso de cada um em bronze; o do recomendado, com a pedra tingida. */
function Escada() {
  const maior = Math.max(...planos.map((p) => p.criacao));
  const largura = 40 / planos.length;
  const degraus = planos.map((p, i) => ({ ...p, x: n(4 + i * largura), y: n(44 - 38 * (p.criacao / maior)) }));
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="inicio-desenho">
      {degraus.map((d) => d.destaque && <rect key={d.id} x={d.x} y={d.y} width={n(largura)} height={n(44 - d.y)} className="tinta" style={{ stroke: "none" }} />)}
      <path d={`M4 44${degraus.map((d) => `V${d.y}H${n(d.x + largura)}`).join("")}V44Z`} />
      <path d={degraus.map((d) => `M${d.x} ${d.y}h${n(largura)}`).join("")} className="bronze" />
    </svg>
  );
}

/** A ficha da conta: os dois totais (a criação e o mês) e, embaixo, a linha das metades (as duas parcelas). */
function Conta() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="inicio-desenho">
      <rect x="9" y="4" width="30" height="40" rx="3" />
      <path d="M15 11h8M15 23h8" className="fino" />
      <path d="M15 16h18M15 28h12" className="bronze" />
      <path d="M15 37h7.5M25.5 37h7.5M24 34v6" />
    </svg>
  );
}

/** A trena de O trabalho, em dias úteis (figuras.regua): o rascunho cheio, as revisões tracejadas, a janela da
 *  publicação em bronze, de 7 a 15, e a escala embaixo, com o traço maior a cada 5 dias. */
function Trena() {
  const { dias, trechos, escala } = figuras.regua;
  const x = (dia: number) => n(4 + (dia / dias) * 40);
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="inicio-desenho">
      {trechos.map((t) =>
        t.tipo === "janela" ? (
          <rect key={t.rotulo} x={x(t.de)} y="15" width={n(x(t.ate) - x(t.de))} height="5" className="cheio-bronze" />
        ) : (
          <path key={t.rotulo} d={`M${x(t.de)} 17.5H${x(t.ate)}`} strokeDasharray={t.tipo === "tracejado" ? "2 2" : undefined} />
        ),
      )}
      <rect x="2" y="25" width="44" height="12" rx="1.5" />
      {Array.from({ length: dias + 1 }, (_, d) => (
        <path key={d} d={`M${x(d)} 25v${escala.includes(d) ? 6 : 3}`} className={escala.includes(d) ? undefined : "fino"} />
      ))}
    </svg>
  );
}

/** As quatro linhas do globo do logotipo (components/marca/logotipo.tsx), o contorno em bronze. */
function Globo() {
  return (
    <svg viewBox="139 0 48 48" aria-hidden="true" className="inicio-desenho inicio-desenho-globo">
      <GloboDoLogotipo recorte="indice-globo" />
    </svg>
  );
}

/** A rosa de oito pontas de Dúvidas (components/paginas/rosa.ts): a metade acesa de cada ponta em bronze. */
function Rosa() {
  return (
    <svg viewBox="-50 -50 100 100" aria-hidden="true" className="inicio-desenho">
      {ROSA.map((meia) => (
        <path key={meia.d} d={meia.d} className={meia.acesa ? "cheio-bronze" : undefined} />
      ))}
    </svg>
  );
}

export const DESENHOS: Partial<Record<IdDaPagina, () => React.ReactElement>> = {
  "para-quem": Carta,
  planos: Escada,
  orcamento: Conta,
  trabalho: Trena,
  atlas: Globo,
  duvidas: Rosa,
};

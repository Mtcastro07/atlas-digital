"use client";

import { useEffect, useRef, useState } from "react";

import { aCadaMinuto } from "@/lib/ambiente";
import { quando } from "@/lib/prazo";
import { proximoNascer, relogio, solNoCeu, type Lugar } from "@/lib/sol";

/** O campo de vista do horizonte do Fim, em graus de azimute de uma borda à outra, com o leste (90°) no meio. */
const CAMPO = 90;

/** O lado do nascer, dito por extenso ("a 11° ao sul do leste"): é o dado que põe o Sol onde ele está no horizonte. */
function ladoDoNascer(azimute: number): string {
  const graus = Math.round(azimute - 90);
  return graus === 0 ? "no leste" : `a ${Math.abs(graus)}° ao ${graus > 0 ? "sul" : "norte"} do leste`;
}

/**
 * O Sol que vai nascer, em meio-tom: a metade de cima de um disco de 60 px de raio, sobre o horizonte, em pontos de
 * --tela-luz numa trama de 6 px (em quincôncio). A área de cada ponto é o brilho do disco naquela casa: a parte do
 * disco que cai nela (a borda em pontos menores, como no meio-tom de jornal) vezes o escurecimento do limbo do Sol
 * (I = 1 − 0,6 (1 − μ), o centro mais claro que a borda). Um caminho só, calculado uma vez.
 */
const RAIO = 60;
const PASSO = 6;
const SOL = (() => {
  let d = "";
  for (let k = 0; (k + 0.5) * PASSO * 0.866 < RAIO + PASSO; k++) {
    const y = -(k + 0.5) * PASSO * 0.866;
    for (let i = -11; i <= 11; i++) {
      const x = (i + (k % 2) * 0.5) * PASSO;
      const distancia = Math.hypot(x, y);
      const cobre = Math.min(1, Math.max(0, (RAIO - distancia) / PASSO + 0.5));
      const limbo = 1 - 0.6 * (1 - Math.sqrt(Math.max(0, 1 - (Math.min(distancia, RAIO) / RAIO) ** 2)));
      if (cobre * limbo < 0.06) continue;
      const r = +(2.3 * Math.sqrt(cobre * limbo)).toFixed(2);
      d += `M${(x - r).toFixed(2)} ${y.toFixed(2)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
    }
  }
  return d;
})();

/**
 * O próximo amanhecer em Niterói, no Fim do início (desde 17/10, a direção final do Atlas Digital, seção 3, item 8): a
 * hora real no amanhecer pintado. A frase sai de lib/sol.ts, neste aparelho, a cada minuto (aCadaMinuto: para com a
 * pausa; com movimento reduzido, continua, porque trocar o texto não é movimento). O servidor não sabe a hora: o HTML
 * traz a frase estável, e a ilha a troca depois de montar, num bloco aria-hidden com o mesmo texto escondido para o
 * leitor de tela.
 * O horizonte de hoje: a ilha põe na cena (o <section> do Fim) o lugar do nascer no horizonte, pelo azimute real, em
 * --nascer (o leste no meio, 45° para cada lado), que leva para lá o fio quente e a luz que sobe do horizonte
 * (app/vidro.css, .vd-amanhecer), e desenha ali o Sol em pontos: é cálculo, e o cálculo é ponto (a gramática da
 * seção 1.1). Em outubro, o Sol nasce uns 10° ao sul do leste, à direita do meio; em junho, a nordeste, à esquerda.
 * Sem script, o amanhecer pintado de sempre, com o fio ao meio e sem o Sol. Nada se move: o lugar muda de um dia
 * para o outro.
 * Desde a revisão de 17/10, a leitura diz também o lado ("amanhã, às 5h17, a 11° ao sul do leste"): sem ele, o lugar
 * do Sol no horizonte era um dado que ninguém lia, e o Sol, um enfeite (a marca I3). O tamanho é de símbolo de carta,
 * não de escala: o disco verdadeiro, neste campo de 90°, teria uns 8 px.
 */
export function ProximoAmanhecer({ lugar, antes, rotulo, carimbo }: { lugar: Lugar; antes: string; rotulo: string; carimbo: string }) {
  const caixa = useRef<HTMLParagraphElement>(null);
  const [nascer, setNascer] = useState<{ quando: string; lado: string } | null>(null);

  useEffect(() => {
    const cena = caixa.current!.closest("section");
    // O mar do celular tem a altura da leitura (--mar; app/digital.css): ela muda com a largura, com a letra e com a frase.
    const mar = new ResizeObserver(() => cena?.style.setProperty("--mar", `${caixa.current!.offsetHeight}px`));
    mar.observe(caixa.current!);
    const parar = aCadaMinuto(caixa.current!, () => {
      const agora = relogio();
      const instante = proximoNascer(lugar, agora);
      if (!instante) return;
      const { azimute } = solNoCeu(lugar, instante);
      setNascer({ quando: quando(instante, agora), lado: ladoDoNascer(azimute) });
      const desvio = (azimute - 90) / CAMPO;
      cena?.style.setProperty("--nascer", `${(50 + desvio * 100).toFixed(2)}%`);
    });
    return () => {
      parar();
      mar.disconnect();
    };
  }, [lugar.latitude, lugar.longitude]);

  return (
    <>
      <p ref={caixa} className="vd-fim-amanhecer">
        {nascer === null ? (
          antes
        ) : (
          <>
            <span className="sr-only">
              {rotulo} {nascer.quando}, {nascer.lado}
              {carimbo}
            </span>
            {/* Três trechos (18/10): na mesa, uma frase; no celular, a leitura em linhas (o rótulo, o instante, o lado e o
                carimbo), com a vírgula no fim do instante, e não no começo da linha de baixo. */}
            <span aria-hidden="true">
              <span>{rotulo}</span>{" "}
              <span>
                <b>{nascer.quando}</b>,
              </span>{" "}
              <span>
                {nascer.lado}
                {carimbo}
              </span>
            </span>
          </>
        )}
      </p>
      {nascer !== null && (
        <svg aria-hidden="true" className="vd-fim-sol" width={2 * RAIO + 4} height={RAIO + 2} viewBox={`${-RAIO - 2} ${-RAIO - 2} ${2 * RAIO + 4} ${RAIO + 2}`}>
          <path d={SOL} />
        </svg>
      )}
    </>
  );
}

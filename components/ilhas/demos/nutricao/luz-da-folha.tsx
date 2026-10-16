"use client";

import { useEffect, useRef } from "react";

/** O repouso da faixa: o centro a 22% da largura da folha, do lado da janela (a faixa mede 40% da folha: +2% da folha = +5% dela). */
const REPOUSO = 5;
/** O curso em volta do repouso: ±35% da folha, ou ±87,5% da faixa. */
const CURSO = 87.5;

/**
 * A luz da janela sobre a folha do plano (components/demos/nutricao/folha-do-plano.tsx; 14.10.2026). Desenha a faixa
 * de reflexo, no repouso também sem script; a entrada é CSS (nutricao.css). Na mesa, só com o ponteiro fino, a faixa
 * acompanha o x do ponteiro sobre a capa e a sombra da folha vai para o lado oposto (um transform por quadro,
 * agrupado em requestAnimationFrame, só quando o ponteiro se move; a transição do CSS amortece); ao sair, as duas
 * voltam ao repouso. No toque, fora dos vínculos, a faixa vai ao ponto tocado no quadro seguinte, seca, fica ali
 * enquanto o dedo está na tela e volta em 400 ms ao soltar (ou quando o toque vira rolagem).
 * Nada segue o dedo nem a rolagem, nada é contínuo; com movimento reduzido, a luz fica parada no repouso.
 */
export function LuzDaFolha() {
  const luz = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const faixa = luz.current;
    const folha = faixa?.closest<HTMLElement>(".nt-folha-do-plano");
    const sombra = folha?.querySelector<HTMLElement>(".nt-fp-sombra");
    const capa = folha?.closest("section");
    if (!faixa || !sombra || !capa || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fino = matchMedia("(hover: hover) and (pointer: fine)");
    let quadro = 0;
    let k = 0;
    const pousar = (transicao: string) => {
      faixa.style.transition = sombra.style.transition = transicao;
      faixa.style.transform = `translateX(${REPOUSO + k * CURSO}%)`;
      sombra.style.transform = `translate(${-8 * k}px, ${-2 * k}px)`;
    };
    // De −1 (a borda esquerda da capa) a 1 (a direita).
    const ler = (x: number) => {
      const r = capa.getBoundingClientRect();
      k = Math.max(-1, Math.min(1, ((x - r.left) / r.width) * 2 - 1));
    };
    const mover = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !fino.matches) return;
      ler(e.clientX);
      if (!quadro)
        quadro = requestAnimationFrame(() => {
          quadro = 0;
          pousar("transform 500ms cubic-bezier(0.2, 0, 0, 1)");
        });
    };
    const sair = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(quadro);
      quadro = 0;
      k = 0;
      pousar("transform 600ms cubic-bezier(0.2, 0, 0, 1)");
    };
    let solto = true;
    const voltar = () => {
      quadro = 0;
      k = 0;
      pousar("transform 400ms cubic-bezier(0.05, 0.7, 0.1, 1)");
    };
    const tocar = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || (e.target as Element).closest("a, button")) return;
      solto = false;
      ler(e.clientX);
      cancelAnimationFrame(quadro);
      // No quadro seguinte, a luz no ponto tocado, seca; se o dedo já saiu, a volta no outro.
      quadro = requestAnimationFrame(() => {
        quadro = 0;
        pousar("none");
        if (solto) quadro = requestAnimationFrame(voltar);
      });
    };
    const soltar = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || solto) return;
      solto = true;
      if (!quadro) quadro = requestAnimationFrame(voltar);
    };
    capa.addEventListener("pointermove", mover, { passive: true });
    capa.addEventListener("pointerleave", sair);
    capa.addEventListener("pointerdown", tocar, { passive: true });
    capa.addEventListener("pointerup", soltar);
    capa.addEventListener("pointercancel", soltar);
    return () => {
      capa.removeEventListener("pointermove", mover);
      capa.removeEventListener("pointerleave", sair);
      capa.removeEventListener("pointerdown", tocar);
      capa.removeEventListener("pointerup", soltar);
      capa.removeEventListener("pointercancel", soltar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return <span ref={luz} className="nt-fp-luz" />;
}

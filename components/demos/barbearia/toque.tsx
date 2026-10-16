"use client";

import { useEffect } from "react";

/**
 * O toque nas peças da Barbearia Santa Rosa (desde 16/10). O crítico de fora filmou, a 390 px com a CPU 4×, o toque
 * nos números de A casa e no mapa do Onde, e nada mudava: no celular, o :active às vezes dura só o quadro do soltar
 * do dedo, e a resposta não chegava a aparecer. Aqui, a peça sob o dedo ([data-toque]) fica marcada (data-tocado)
 * desde o toque até 500 ms depois de soltar; o toque que vira rolagem (pointercancel) desmarca na hora. O desenho de
 * cada resposta fica em barbearia.css, junto do :active, que continua valendo sem script. Só o dedo: o ponteiro fino
 * tem o hover.
 */
export function ToqueDaCasa() {
  useEffect(() => {
    let alvo: HTMLElement | null = null;
    let relogio = 0;
    const desmarcar = (ms: number) => {
      const el = alvo;
      window.clearTimeout(relogio);
      relogio = window.setTimeout(() => el?.removeAttribute("data-tocado"), ms);
    };
    const aoTocar = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      window.clearTimeout(relogio);
      alvo?.removeAttribute("data-tocado");
      alvo = e.target instanceof Element ? e.target.closest<HTMLElement>("[data-toque]") : null;
      alvo?.setAttribute("data-tocado", "");
    };
    const aoSoltar = (e: PointerEvent) => {
      if (e.pointerType === "touch") desmarcar(500);
    };
    const aoCancelar = (e: PointerEvent) => {
      if (e.pointerType === "touch") desmarcar(0);
    };
    window.addEventListener("pointerdown", aoTocar, { passive: true });
    window.addEventListener("pointerup", aoSoltar, { passive: true });
    window.addEventListener("pointercancel", aoCancelar, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", aoTocar);
      window.removeEventListener("pointerup", aoSoltar);
      window.removeEventListener("pointercancel", aoCancelar);
      window.clearTimeout(relogio);
    };
  }, []);
  return null;
}

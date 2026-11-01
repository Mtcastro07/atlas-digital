"use client";

import { useEffect } from "react";

/** Rolagem mínima, em pixels, para contar como mudança de direção. */
const LIMIAR = 8;

/**
 * No celular, o que tem [data-recolhe] (o botão de WhatsApp da nutrição)
 * se recolhe enquanto se rola para baixo — o texto fica livre — e volta
 * ao rolar para cima: escreve data-recolhido, e a folha do site faz o
 * resto. Responde à direção, não acompanha a posição. A partir de 768 px,
 * onde o botão não cobre o texto, nada muda. Sem script, fica sempre à vista.
 */
export function RecolherAoRolar() {
  useEffect(() => {
    const estreita = window.matchMedia("(max-width: 767.98px)");
    let ultimo = window.scrollY;
    let quadro = 0;
    const marcar = (recolher: boolean) => {
      for (const el of document.querySelectorAll<HTMLElement>("[data-recolhe]")) el.toggleAttribute("data-recolhido", recolher);
    };
    const ler = () => {
      quadro = 0;
      const y = window.scrollY;
      if (!estreita.matches) return marcar(false);
      if (Math.abs(y - ultimo) < LIMIAR) return;
      marcar(y > ultimo && y > window.innerHeight * 0.3);
      ultimo = y;
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(ler);
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    estreita.addEventListener("change", aoRolar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      estreita.removeEventListener("change", aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";

// A mesma volta completa do hover (mov-giro-completo, app/movimento.css):
// o meridiano se fecha, vira do avesso e volta.
const GIRO: Keyframe[] = [
  { transform: "scaleX(1)" },
  { transform: "scaleX(0.05)" },
  { transform: "scaleX(-1)" },
  { transform: "scaleX(0.05)" },
  { transform: "scaleX(1)" },
];

/** Fração do globo que precisa estar na tela para contar como "apareceu". */
const VISIVEL = 0.6;

/**
 * No celular não há ponteiro para passar sobre o logotipo: ali, o globo dá
 * uma volta a cada vez que aparece — na carga, quando o cabeçalho volta à
 * tela (ilhas/cabecalho-retratil.tsx) e quando o rodapé ou o símbolo de
 * "O Atlas" entram na tela. Para girar de novo, o globo precisa antes sair
 * de vista por inteiro. Observa todo elemento com data-globo; não desenha nada.
 * Com ponteiro, quem dispara é o hover, em CSS. Com movimento reduzido, nada gira.
 */
export function GiroDoGlobo() {
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const naTela = new WeakSet<Element>();
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const { target, intersectionRatio } of entradas) {
          if (intersectionRatio === 0) naTela.delete(target);
          if (intersectionRatio < VISIVEL || naTela.has(target)) continue;
          naTela.add(target);
          target.querySelector("ellipse")?.animate(GIRO, { duration: 1150, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
        }
      },
      { threshold: [0, VISIVEL] }
    );
    document.querySelectorAll("[data-globo]").forEach((globo) => observador.observe(globo));
    return () => observador.disconnect();
  }, []);

  return null;
}

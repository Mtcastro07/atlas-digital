"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Folga, em fração da janela, para começar a calcular uma cena antes de ela entrar. */
const MARGEM = "25%";

/**
 * Progresso de uma cena, de 0 a 1, conforme a posição dela na janela: corre
 * da entrada do bloco pelo pé da janela até o centro dele chegar ao centro
 * da janela.
 */
function progresso(elemento: HTMLElement, janela: number) {
  const caixa = elemento.getBoundingClientRect();
  const p = (janela - caixa.top) / Math.max(1, janela / 2 + caixa.height / 2);
  return Math.min(1, Math.max(0, p));
}

/**
 * Liga a rolagem às cenas do site da barbearia (o "Completo" que se desenha
 * ao rolar): cada elemento [data-cena] recebe --p, de 0 a 1, e o desenho em
 * CSS 3D e SVG lê essa variável (app/demos/barbearia/barbearia.css). A
 * rolagem é a nativa, sem inércia (ESTEIRA, VII). Uma escrita por quadro,
 * só nas cenas perto da tela. Sem script, ou com movimento reduzido, cada
 * cena fica no estado parado escrito no HTML (style="--p: …"), completo e
 * legível. Refaz a lista de cenas a cada troca de página. Não desenha nada.
 */
export function CenaDeRolagem() {
  const caminho = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cenas = [...document.querySelectorAll<HTMLElement>("[data-cena]")];
    const ativas = new Set<HTMLElement>();
    let quadro = 0;

    const desenhar = () => {
      quadro = 0;
      const janela = window.innerHeight;
      for (const cena of ativas) cena.style.setProperty("--p", progresso(cena, janela).toFixed(4));
    };
    const pedirQuadro = () => {
      if (!quadro) quadro = requestAnimationFrame(desenhar);
    };

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) ativas.add(entrada.target as HTMLElement);
          else ativas.delete(entrada.target as HTMLElement);
        }
        pedirQuadro();
      },
      { rootMargin: `${MARGEM} 0px ${MARGEM} 0px` },
    );
    cenas.forEach((cena) => observador.observe(cena));
    // A primeira escrita já com a posição real (a página pode abrir no meio).
    for (const cena of cenas) cena.style.setProperty("--p", progresso(cena, window.innerHeight).toFixed(4));

    window.addEventListener("scroll", pedirQuadro, { passive: true });
    window.addEventListener("resize", pedirQuadro, { passive: true });
    return () => {
      observador.disconnect();
      window.removeEventListener("scroll", pedirQuadro);
      window.removeEventListener("resize", pedirQuadro);
      cancelAnimationFrame(quadro);
    };
  }, [caminho]);

  return null;
}

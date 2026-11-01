"use client";

import { useEffect, useState } from "react";

/**
 * Setas da galeria de materiais: rolam a faixa ([data-galeria="<id>"])
 * uma peça para cada lado. A faixa também rola com o dedo, o trackpad e
 * o teclado (é uma lista com rolagem nativa e encaixe). No começo da faixa,
 * a seta de voltar fica desabilitada; no fim, a de avançar — as duas, se a
 * faixa cabe inteira (até 03/10, ficavam ativas e não faziam nada). Com
 * aria-disabled, não disabled: a seta que se desabilita sob o foco (no fim
 * da faixa, pelo teclado) não o perde. Com movimento reduzido, a faixa
 * salta em vez de deslizar.
 */
export function SetasDaGaleria({ alvo, rotulos }: { alvo: string; rotulos: [string, string] }) {
  // Antes do script, a faixa está no começo: voltar desabilitada, avançar ativa.
  const [noComeco, setNoComeco] = useState(true);
  const [noFim, setNoFim] = useState(false);

  useEffect(() => {
    const faixa = document.querySelector<HTMLElement>(`[data-galeria="${alvo}"]`);
    if (!faixa) return;
    let quadro = 0;
    const ler = () => {
      quadro = 0;
      // Um pixel de folga: a rolagem fracionária (zoom, tela de alta densidade) não chega ao inteiro.
      setNoComeco(faixa.scrollLeft <= 1);
      setNoFim(faixa.scrollLeft + faixa.clientWidth >= faixa.scrollWidth - 1);
    };
    const pedir = () => {
      if (!quadro) quadro = requestAnimationFrame(ler);
    };
    ler();
    faixa.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir, { passive: true });
    return () => {
      faixa.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      cancelAnimationFrame(quadro);
    };
  }, [alvo]);

  const rolar = (sentido: 1 | -1) => {
    const faixa = document.querySelector<HTMLElement>(`[data-galeria="${alvo}"]`);
    const peca = faixa?.firstElementChild as HTMLElement | null;
    if (!faixa || !peca) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    faixa.scrollBy({ left: sentido * (peca.offsetWidth + 16), behavior: reduzir ? "auto" : "smooth" });
  };

  return (
    <div className="flex">
      {([-1, 1] as const).map((sentido, i) => {
        const desabilitada = sentido < 0 ? noComeco : noFim;
        return (
          <button
            key={sentido}
            type="button"
            aria-disabled={desabilitada || undefined}
            onClick={() => !desabilitada && rolar(sentido)}
            className="grid size-14 cursor-pointer place-items-center border border-foreground/40 text-foreground transition-colors duration-300 not-first:-ml-px aria-disabled:cursor-not-allowed not-aria-disabled:hover:z-10 not-aria-disabled:hover:border-foreground not-aria-disabled:hover:bg-primary not-aria-disabled:hover:text-primary-foreground not-aria-disabled:active:bg-primary not-aria-disabled:active:text-primary-foreground"
          >
            <span className="sr-only">{rotulos[i]}</span>
            <svg viewBox="0 0 16 16" aria-hidden="true" className={`size-4 ${sentido < 0 ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square">
              <path d="M2 8h11M9 4l4 4-4 4" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

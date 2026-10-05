"use client";

import { useEffect } from "react";

/**
 * Efeitos que seguem o ponteiro, num único ouvinte delegado e um quadro
 * por movimento:
 * - luz do cursor: nos blocos com .vd-luz, o orbe de bronze (.vd-orbe)
 *   vai até o ponteiro, só por transform. Adaptado do Magic Card do Magic
 *   UI (modo orb), sem dependência. Saiu em 03/10 pela regra 3 das
 *   Diretrizes de Design Premium e voltou no mesmo dia, a pedido do
 *   usuário: é parte da identidade do site;
 * - botão magnético: o que tem [data-magnetico] puxa até 7 px em direção
 *   ao ponteiro, pela propriedade translate, e volta com mola ao sair.
 * Só com ponteiro fino e sem movimento reduzido; senão, não faz nada: o
 * bloco acende só a aresta e o botão fica parado. Não desenha nada.
 */
export function LuzDoCursor() {
  useEffect(() => {
    const ponteiroFino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ponteiroFino || reduzir) return;

    const raiz = document.documentElement;
    raiz.classList.add("luz-pronta");
    let quadro = 0;
    let ultimo: PointerEvent | null = null;
    let magnetico: HTMLElement | null = null;

    const soltar = () => {
      if (magnetico) magnetico.style.translate = "";
      magnetico = null;
    };

    const mover = () => {
      quadro = 0;
      if (!ultimo) return;
      const alvo = ultimo.target as Element | null;

      const bloco = alvo?.closest?.(".vd-luz");
      const orbe = bloco?.querySelector<HTMLElement>(":scope > .vd-orbe");
      if (bloco && orbe) {
        const caixa = bloco.getBoundingClientRect();
        orbe.style.transform = `translate3d(${ultimo.clientX - caixa.left}px, ${ultimo.clientY - caixa.top}px, 0)`;
      }

      const botao = alvo?.closest?.<HTMLElement>("[data-magnetico]") ?? null;
      if (botao !== magnetico) soltar();
      if (botao) {
        // A caixa medida já vem deslocada pelo próprio ímã (e pela mola, no
        // meio do caminho): sem descontar esse deslocamento, cada movimento do
        // ponteiro mudava o alvo conforme o botão já tinha andado, e o botão
        // tremia (corrigido em 01/10). Desconta-se o translate real do momento.
        const [dx = 0, dy = 0] = getComputedStyle(botao).translate.split(" ").map((v) => parseFloat(v) || 0);
        const caixa = botao.getBoundingClientRect();
        const x = ((ultimo.clientX - (caixa.left - dx)) / caixa.width - 0.5) * 14;
        const y = ((ultimo.clientY - (caixa.top - dy)) / caixa.height - 0.5) * 10;
        botao.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
        magnetico = botao;
      }
    };
    const aoMover = (evento: PointerEvent) => {
      ultimo = evento;
      if (!quadro) quadro = requestAnimationFrame(mover);
    };

    document.addEventListener("pointermove", aoMover, { passive: true });
    raiz.addEventListener("pointerleave", soltar);
    return () => {
      document.removeEventListener("pointermove", aoMover);
      raiz.removeEventListener("pointerleave", soltar);
      cancelAnimationFrame(quadro);
      soltar();
      raiz.classList.remove("luz-pronta");
    };
  }, []);

  return null;
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Rolagem mínima, em pixels, para contar como mudança de direção. */
const LIMIAR = 8;

/**
 * No celular, o que tem [data-recolhe] (o botão de WhatsApp da nutrição)
 * se recolhe enquanto se rola para baixo — o texto fica livre — e volta
 * ao rolar para cima: escreve data-recolhido, e a folha do site faz o
 * resto. Responde à direção, não acompanha a posição. Desde 14.10.2026
 * (crítico de fora), também fica recolhido enquanto o agendamento do
 * cabeçalho ([data-acao-do-topo]) está na tela: a mesma ação já está à mão,
 * e o botão não cobre a abertura da página. Começa recolhido pelo CSS (sem
 * data-solto) e se solta quando o agendamento sai da tela. Desde
 * 16.10.2026, em toda largura: com o cabeçalho mais baixo, a pílula da capa
 * subiu para a primeira tela da mesa, e a 1280 × 720 o botão a cobria. O
 * agendamento do cabeçalho tem duas cópias (a linha do topo, no celular, e
 * a orelha, na mesa): vale a que está à vista. Sem script, fica sempre à
 * vista. Refaz a vigia a cada página (o cabeçalho e o botão são de cada
 * página).
 */
export function RecolherAoRolar() {
  const caminho = usePathname();

  useEffect(() => {
    const estreita = window.matchMedia("(max-width: 767.98px)");
    let ultimo = window.scrollY;
    let quadro = 0;
    let descendo = false;
    const botoes = () => document.querySelectorAll<HTMLElement>("[data-recolhe]");
    const marcar = () => {
      for (const el of botoes()) el.toggleAttribute("data-recolhido", estreita.matches && descendo);
    };
    const ler = () => {
      quadro = 0;
      const y = window.scrollY;
      if (!estreita.matches) {
        descendo = false;
        return marcar();
      }
      if (Math.abs(y - ultimo) < LIMIAR) return;
      // Perto do topo, a linha do topo já faz as vezes do botão (até 14.10.2026, ele só se recolhia depois de 30% da tela).
      descendo = y > ultimo;
      ultimo = y;
      marcar();
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(ler);
    };
    // O agendamento do cabeçalho na tela (a cópia à vista): o botão fica preso (sem data-solto); fora dela, solto.
    const topos = document.querySelectorAll("[data-acao-do-topo]");
    const naTela = new Map<Element, boolean>();
    const vigia = new IntersectionObserver((entradas) => {
      for (const e of entradas) naTela.set(e.target, e.isIntersecting);
      const algum = [...naTela.values()].some(Boolean);
      for (const el of botoes()) el.toggleAttribute("data-solto", !algum);
    });
    for (const t of topos) vigia.observe(t);
    if (!topos.length) for (const el of botoes()) el.setAttribute("data-solto", "");
    window.addEventListener("scroll", aoRolar, { passive: true });
    estreita.addEventListener("change", aoRolar);
    return () => {
      vigia.disconnect();
      window.removeEventListener("scroll", aoRolar);
      estreita.removeEventListener("change", aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, [caminho]);

  return null;
}

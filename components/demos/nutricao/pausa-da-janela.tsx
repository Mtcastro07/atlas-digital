"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A pausa da sombra da janela (WCAG 2.2.2: a horta da capa balança por mais de 5 s; crítico de fora, 14.10.2026). Um
 * botão cujo rótulo diz o que ele fará, "Pausar" ou "Retomar" (fechamento com o Impeccable, 16.10.2026: o rótulo fixo
 * não mostrava o estado; com o rótulo que muda, sai o aria-pressed, como pede a WAI-ARIA), que escreve data-pausado no
 * lugar da folha. Vigia também a sombra: fora da tela, ela para sozinha (data-fora). A escolha não é gravada. Sem script ou com
 * movimento reduzido, a sombra fica parada e o botão não aparece (nutricao.css).
 */
export function PausaDaJanela() {
  const botao = useRef<HTMLButtonElement>(null);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    const lugar = botao.current?.closest(".nt-folha-lugar");
    const horta = lugar?.querySelector<HTMLElement>("[data-ambiente]");
    if (!lugar || !horta) return;
    lugar.toggleAttribute("data-pausado", pausado);
    const vigia = new IntersectionObserver(([e]) => horta.toggleAttribute("data-fora", !e.isIntersecting));
    vigia.observe(horta);
    return () => vigia.disconnect();
  }, [pausado]);

  return (
    <button ref={botao} type="button" onClick={() => setPausado((p) => !p)} className="nt-pausa">
      <svg viewBox="0 0 12 12" aria-hidden="true">
        {pausado ? <path d="M3 1.5v9l7-4.5z" /> : <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" />}
      </svg>
      {pausado ? "Retomar" : "Pausar"} a sombra da janela
    </button>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Controle do movimento contínuo da página ([data-ambiente]: a esfera da
 * capa, a faixa de nichos, o globo de O Atlas, o reflexo da chamada final,
 * o brilho do selo "Recomendado"; no site da barbearia, as faixas e o selo
 * que gira).
 * - Fora da tela, cada elemento de ambiente pausa (data-fora). O que nasce
 *   abaixo da dobra (a faixa de nichos, o reflexo da chamada final) só
 *   começa a correr quando entra na tela (data-visivel): antes, animava
 *   desde a carga, e no aparelho modesto o estilo recalculado a cada
 *   quadro atrasava a página (medido em 01/10).
 * - O botão pausa e retoma tudo (<html class="ambiente-pausado">). É o
 *   mecanismo de pausa que a WCAG 2.2.2 pede para movimento contínuo.
 *   A escolha não é gravada: a página não guarda nada no aparelho.
 * Com movimento reduzido não há ambiente, e o botão não aparece. A lista
 * do ambiente é refeita a cada troca de página (navegação no cliente).
 */
export function ControleDoMovimento() {
  const [disponivel, setDisponivel] = useState(false);
  const [pausado, setPausado] = useState(false);
  const caminho = usePathname();

  useEffect(() => {
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
    const atualizar = () => setDisponivel(!reduzir.matches);
    atualizar();
    reduzir.addEventListener("change", atualizar);
    return () => reduzir.removeEventListener("change", atualizar);
  }, []);

  useEffect(() => {
    const observador = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        entrada.target.toggleAttribute("data-fora", !entrada.isIntersecting);
        entrada.target.toggleAttribute("data-visivel", entrada.isIntersecting);
      }
    });
    document.querySelectorAll("[data-ambiente]").forEach((elemento) => observador.observe(elemento));
    return () => observador.disconnect();
  }, [caminho]);

  useEffect(() => {
    document.documentElement.classList.toggle("ambiente-pausado", pausado);
  }, [pausado]);

  // Antes da hidratação, e com movimento reduzido, o lugar fica reservado e vazio.
  return (
    <button
      type="button"
      aria-pressed={pausado}
      aria-hidden={!disponivel || undefined}
      onClick={() => setPausado((p) => !p)}
      disabled={!disponivel}
      className="grid size-11 flex-none cursor-pointer place-items-center rounded-full text-foreground/85 transition-[color,background-color,opacity] duration-300 ease-atlas hover:bg-foreground/10 hover:text-foreground disabled:pointer-events-none disabled:opacity-0"
    >
      <span className="sr-only">Pausar animações</span>
      {pausado ? (
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5 fill-current">
          <path d="M4.5 2.8v10.4a.6.6 0 0 0 .92.5l8.1-5.2a.6.6 0 0 0 0-1L5.42 2.3a.6.6 0 0 0-.92.5Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5 fill-current">
          <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
          <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
        </svg>
      )}
    </button>
  );
}

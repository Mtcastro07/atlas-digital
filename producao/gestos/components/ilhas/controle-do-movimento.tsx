"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Controle do movimento contínuo da página ([data-ambiente]; no kit, o brilho do texto, ShimmerText), do
 * site do Atlas para o kit de produção (producao/gestos/, 08.10.2026). Em todo plano que tenha passivas ou
 * ambiente contínuo (producao/esteira/09-movimento.md, seções 4, 5 e 14). Vai no cabeçalho, ao lado do menu.
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
    // Ligar em pleno arremesso derruba a rolagem (seção 14): o que entra espera a página parar 200 ms; o que sai para na hora.
    const entrando = new Set<Element>();
    let espera: ReturnType<typeof setTimeout> | undefined;
    // Só começa o que está à vista de fato (seção 14, "O mecanismo"; no site do Atlas, `aVista`, 03.11.2026):
    // metade do elemento na tela, ou um quarto da altura da tela se ele for maior. O que só encosta na borda espera.
    const aVista = (elemento: Element) => {
      const r = elemento.getBoundingClientRect();
      return Math.min(r.bottom, innerHeight) - Math.max(r.top, 0) >= Math.min(r.height / 2, innerHeight / 4) - 1;
    };
    const ligar = () => {
      for (const elemento of entrando) {
        if (!aVista(elemento)) continue;
        elemento.removeAttribute("data-fora");
        elemento.setAttribute("data-visivel", "");
        entrando.delete(elemento);
      }
    };
    const adiar = () => {
      clearTimeout(espera);
      if (entrando.size) espera = setTimeout(ligar, 200);
    };
    const observador = new IntersectionObserver((entradas) => {
      for (const { target, isIntersecting } of entradas) {
        if (isIntersecting) {
          entrando.add(target);
        } else {
          entrando.delete(target);
          target.setAttribute("data-fora", "");
          target.removeAttribute("data-visivel");
        }
      }
      adiar();
    }, { threshold: [0, 0.5] });
    document.querySelectorAll("[data-ambiente]").forEach((elemento) => observador.observe(elemento));
    window.addEventListener("scroll", adiar, { passive: true });
    return () => {
      observador.disconnect();
      window.removeEventListener("scroll", adiar);
      clearTimeout(espera);
    };
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
      className="grid size-11 flex-none cursor-pointer place-items-center rounded-full text-foreground/85 transition-[color,background-color,opacity] duration-300 hover:bg-foreground/10 hover:text-foreground disabled:pointer-events-none disabled:opacity-0"
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

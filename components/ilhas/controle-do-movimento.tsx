"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

import { pausa } from "@/conteudo/paginas/comuns";

const semInscricao = () => () => {};
const REDUZIR = "(prefers-reduced-motion: reduce)";
const inscreverReduzir = (avisar: () => void) => {
  const consulta = window.matchMedia(REDUZIR);
  consulta.addEventListener("change", avisar);
  return () => consulta.removeEventListener("change", avisar);
};

/**
 * Controle do movimento contínuo da página ([data-ambiente]: as passivas
 * de cada página, .mov-passiva, e as constantes sob o ponteiro,
 * .mov-constante; no site da barbearia, as faixas e o selo que gira).
 * - Fora da tela, cada elemento de ambiente pausa (data-fora). O que nasce
 *   abaixo da dobra só começa a correr quando entra na tela (data-visivel):
 *   antes, animava desde a carga, e no aparelho modesto o estilo
 *   recalculado a cada quadro atrasava a página (medido em 01/10). As
 *   passivas das sete páginas dependem deste observador (R10, CONTRATO.md,
 *   4.1): o [data-ambiente] vem do servidor, e a lista é refeita a cada
 *   troca de página (navegação no cliente).
 * - O botão pausa e retoma tudo (<html class="ambiente-pausado">). É o
 *   mecanismo de pausa que a WCAG 2.2.2 pede para movimento contínuo.
 *   A escolha não é gravada: a página não guarda nada no aparelho.
 * Desde 28/10 (R10), no cabeçalho do Atlas (escrito), o rótulo escrito, sem cápsula e sem ícone, mais
 * discreto que o "Menu": Inter 400, 16 px, a 75% da cor do texto da barra
 * (o claro no vidro escuro, o navy no claro). À vista, "Pausar" e
 * "Retomar"; o nome acessível leva o complemento ("Pausar animações"), e o
 * rótulo é o começo dele. Sem aria-pressed: o nome que troca já diz o
 * estado. O menu do celular acha o botão por data-pausa-do-ambiente
 * (ilhas/painel-menu.tsx). Com movimento reduzido não há ambiente, e o
 * botão não aparece (pelo CSS, sem esperar o script: nem o lugar fica).
 * Antes da hidratação, o lugar fica reservado e vazio.
 * Sem "escrito", nos sites de demonstração (que não mudam): o botão de ícone de 44 px, com aria-pressed e desativado
 * com movimento reduzido, e a troca de data-visivel na hora, sem esperar a página parar.
 */
/** Quanto tempo sem rolagem, em ms, conta como a página parada. */
const PARADA = 200;

export function ControleDoMovimento({ escrito = false }: { escrito?: boolean }) {
  const [pausado, setPausado] = useState(false);
  const hidratado = useSyncExternalStore(semInscricao, () => true, () => false);
  const reduzido = useSyncExternalStore(inscreverReduzir, () => window.matchMedia(REDUZIR).matches, () => false);
  const disponivel = hidratado && !reduzido;
  const caminho = usePathname();

  useEffect(() => {
    // Com a página rolando, o que entra na tela espera ela parar para começar: cada troca recalcula o estilo e põe
    // animações no compositor, e no celular isso perdia quadros em pleno arremesso (R10, integração, 01/11: /o-trabalho
    // de 94,7% a 96,5% em dia). O que sai para na hora: a animação que corre sem nada mudar na tela dá quadros perdidos.
    const pendentes = new Set<Element>();
    let rolou = -PARADA;
    let espera = 0;
    const marcar = (elemento: Element, naTela: boolean) => {
      elemento.toggleAttribute("data-fora", !naTela);
      elemento.toggleAttribute("data-visivel", naTela);
      // O que passa uma vez só (a luz dos retratos, no celular) não recomeça quando volta à tela.
      if (escrito && naTela) elemento.setAttribute("data-visto", "");
    };
    // No Atlas, só começa o que está à vista de fato: metade do objeto, ou um quarto da tela se ele for maior. A passiva
    // que nascia numa fresta do pé da tela (as chapas de /, no fim de um arremesso) corria na faixa de ~84 px que o
    // Chrome sem janela da régua não apresenta, e cada quadro dela contava como parcial (03/11). O resto espera,
    // pendente, a próxima parada ou a metade do objeto (o limiar de 0,5 do observador).
    const aVista = (elemento: Element) => {
      if (!escrito) return true;
      const r = elemento.getBoundingClientRect();
      return Math.min(r.bottom, innerHeight) - Math.max(r.top, 0) >= Math.min(r.height / 2, innerHeight / 4) - 1;
    };
    const aplicar = () => {
      pendentes.forEach((elemento) => {
        if (!aVista(elemento)) return;
        marcar(elemento, true);
        pendentes.delete(elemento);
      });
    };
    const adiar = () => {
      window.clearTimeout(espera);
      espera = window.setTimeout(aplicar, PARADA);
    };
    const aoRolar = () => {
      rolou = performance.now();
      if (pendentes.size) adiar();
    };
    const observador = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) pendentes.add(entrada.target);
        else {
          pendentes.delete(entrada.target);
          marcar(entrada.target, false);
        }
      }
      if (escrito && performance.now() - rolou < PARADA) adiar();
      else aplicar();
    }, escrito ? { threshold: [0, 0.5] } : undefined);
    document.querySelectorAll("[data-ambiente]").forEach((elemento) => observador.observe(elemento));
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      observador.disconnect();
      window.removeEventListener("scroll", aoRolar);
      window.clearTimeout(espera);
    };
  }, [caminho, escrito]);

  useEffect(() => {
    document.documentElement.classList.toggle("ambiente-pausado", pausado);
  }, [pausado]);

  if (!escrito) {
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

  return (
    <button
      type="button"
      data-pausa-do-ambiente
      aria-hidden={!hidratado || undefined}
      onClick={() => setPausado((p) => !p)}
      disabled={!hidratado}
      className="inline-flex min-h-11 flex-none cursor-pointer items-center px-2 text-base font-normal whitespace-nowrap text-foreground/75 transition-[color,opacity] duration-300 ease-atlas hover:text-foreground disabled:pointer-events-none disabled:opacity-0 motion-reduce:hidden"
    >
      {pausado ? pausa.retomar : pausa.pausar}
      <span className="sr-only"> {pausa.complemento}</span>
    </button>
  );
}

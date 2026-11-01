"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Revelação dos sites de demonstração (movimento do plano Essencial, que
 * os outros dois herdam). Nada nasce oculto: a cada página, cada
 * [data-revelar] que está abaixo da dobra recebe .dm-oculto (fora da
 * vista, sem piscar) e o perde ao entrar na tela, uma vez
 * (app/demos/demos.css). O que já está na tela nunca some. Fica no layout
 * de cada site e refaz a varredura a cada troca de página (os sites têm
 * várias, com navegação no cliente). Com movimento reduzido, nada é ocultado.
 * O marca-texto ([data-marcador], Spell UI, Highlighted Text; desde 03/10)
 * abaixo da dobra não some: só a faixa é recolhida (.dm-a-marcar) e passa
 * quando a palavra entra na tela.
 */
export function Revelacao() {
  const caminho = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          entrada.target.classList.remove("dm-oculto", "dm-a-marcar");
          observador.unobserve(entrada.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const dobra = window.innerHeight * 0.92;
    document.querySelectorAll("[data-revelar], [data-marcador]").forEach((alvo) => {
      if (alvo.getBoundingClientRect().top < dobra) return;
      alvo.classList.add(alvo.hasAttribute("data-marcador") ? "dm-a-marcar" : "dm-oculto");
      observador.observe(alvo);
    });
    return () => observador.disconnect();
  }, [caminho]);

  return null;
}

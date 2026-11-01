"use client";
// components/ilhas/revelacao.tsx — a revelação ao entrar na tela, uma vez (producao/esteira/09-movimento.md,
// seção 4: a camada do Essencial). Marca data-visivel nos [data-revela] que entram na tela; o CSS
// (app/globals.css) só esconde antes disso quando há script e o movimento não é reduzido.
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function Revelacao() {
  const caminho = usePathname();
  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-visivel", "");
            observador.unobserve(e.target); // uma vez só
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll("[data-revela]:not([data-visivel])").forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, [caminho]); // a lista é refeita a cada troca de página
  return null;
}

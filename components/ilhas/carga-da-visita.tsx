"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

import type { Carga } from "@/components/paginas/chapa-da-carga";

type Desenho = typeof import("@/components/paginas/chapa-da-carga");

/**
 * A chapa da carga desta visita, nos destaques do início (desde 17/10, a direção final do Atlas Digital; substitui
 * ilhas/medicao-da-visita.tsx). No HTML do servidor vem a reprise (`children`: a carga gravada, declarada no carimbo),
 * para quem lê sem script e para o primeiro quadro; depois do load, quando a chapa chega perto da vista (300 px), o
 * desenho entra por import() (fora do script inicial), mede esta visita no navegador e toma o lugar da reprise. Não há
 * laço nem animação: a chapa é medida uma vez, e só se redesenha quando a largura ou o corpo da letra mudam (o
 * ResizeObserver), para nunca encolher o desenho. Nada sai do aparelho.
 */
export function CargaDaVisita({ children }: { children: ReactNode }) {
  const figura = useRef<HTMLElement>(null);
  const [vista, setVista] = useState<{ desenho: Desenho; carga: Carga; largura: number; f: number } | null>(null);

  useEffect(() => {
    const el = figura.current!;
    let ligada = true;
    let largura: ResizeObserver | undefined;
    const perto = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        perto.disconnect();
        import("@/components/paginas/chapa-da-carga").then((desenho) => {
          if (!ligada) return;
          const carga = desenho.medir();
          largura = new ResizeObserver(() => {
            const l = Math.floor(el.querySelector("[data-traco]")?.clientWidth ?? 0);
            const f = parseFloat(getComputedStyle(document.documentElement).fontSize) / 16 || 1;
            if (l) setVista((v) => (v && v.largura === l && v.f === f ? v : { desenho, carga, largura: l, f }));
          });
          largura.observe(el);
        }).catch(() => {}); // o pedaço não veio (uma publicação nova trocou o hash): fica a reprise, sem erro no console
      },
      { rootMargin: "300px" },
    );
    // O fim do evento load só existe depois dele: a espera de uma volta deixa o navegador gravá-lo.
    const comecar = () => setTimeout(() => ligada && perto.observe(el));
    if (document.readyState === "complete") comecar();
    else window.addEventListener("load", comecar, { once: true });
    return () => {
      ligada = false;
      perto.disconnect();
      largura?.disconnect();
      window.removeEventListener("load", comecar);
    };
  }, []);

  // A primeira medida sai da grade da reprise, em que o traço ocupa a linha inteira (296 px a 390, contra 198 na
  // coluna de verdade): sem esta volta, antes da pintura, o primeiro quadro mostrava a chapa encolhida a 67%, com os
  // rótulos de 13 px a 8,7 (a revisão de 18/10). A medida certa entra antes de o quadro ser pintado.
  useLayoutEffect(() => {
    const l = Math.floor(figura.current?.querySelector("[data-traco]")?.clientWidth ?? 0);
    if (vista && l && l !== vista.largura) setVista({ ...vista, largura: l });
  }, [vista]);

  return (
    <figure ref={figura} className="vd-carga">
      {vista ? <vista.desenho.ChapaDaCarga carga={vista.carga} largura={vista.largura} f={vista.f} /> : children}
    </figure>
  );
}

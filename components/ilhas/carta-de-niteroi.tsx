"use client";

import { useEffect, useRef } from "react";

/**
 * A ilha da carta de Niterói, em /para-quem (desde 17/10, a direção final do Atlas Digital; a figura, do servidor, em
 * components/paginas/carta-de-niteroi.tsx). Só o canvas da lente e a espera: depois do `load` da página (a carta está
 * na primeira tela, e as ruas, ~39 KB, não disputam com o título), o desenho chega por import()
 * (ilhas/desenho-da-carta-de-niteroi.ts) e liga as ruas, a lente e a mão à figura que o servidor já pintou. No lugar da
 * retícula que varria a carta num Lissajous (reticula-da-carta.tsx, até 17/10).
 */
export function CartaViva() {
  const tela = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = tela.current!;
    let ativo = true;
    let desligar: (() => void) | undefined;
    const comecar = () =>
      import("@/components/ilhas/desenho-da-carta-de-niteroi").then(({ ligarCarta }) => {
        if (ativo) desligar = ligarCarta(canvas);
      });
    if (document.readyState === "complete") comecar();
    else window.addEventListener("load", comecar, { once: true });
    return () => {
      ativo = false;
      window.removeEventListener("load", comecar);
      desligar?.();
    };
  }, []);

  return <canvas ref={tela} aria-hidden="true" className="vd-carta-lente" />;
}

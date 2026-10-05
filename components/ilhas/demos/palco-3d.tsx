"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import type { Ficha, Palco } from "@/components/ilhas/demos/palco-3d/motor";

/**
 * O palco 3D da Barbearia Santa Rosa (plano Completo): um canvas fixo atrás
 * de todas as páginas do site, no layout — a ficha em cena atravessa as
 * trocas de página, virando como uma moeda. O motor (./palco-3d/motor.ts,
 * com o desenho em ./palco-3d/cena.ts) só é baixado depois da primeira
 * pintura, quando o navegador fica ocioso: o título e o texto não esperam
 * o 3D. Sem WebGL, ou se o desenho falha, a raiz recebe data-sem-3d e as
 * peças de reserva (o selo em traço, app/demos/barbearia/barbearia.css)
 * aparecem; sem script, também. Com movimento reduzido, a ficha fica
 * parada e só muda com a rolagem. Decorativo: nada aqui é conteúdo.
 */
export function Palco3D({ fichas }: { fichas: readonly Ficha[] }) {
  const tela = useRef<HTMLCanvasElement>(null);
  const palco = useRef<Palco | null>(null);
  const caminho = usePathname();

  useEffect(() => {
    let vivo = true;
    const canvas = tela.current;
    if (!canvas) return;
    const iniciar = async () => {
      const { iniciarPalco } = await import("@/components/ilhas/demos/palco-3d/motor");
      if (!vivo) return;
      const familia = getComputedStyle(canvas).fontFamily;
      palco.current = iniciarPalco(canvas, {
        reduzir: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        fichas,
        familia,
      });
      if (!palco.current) document.documentElement.setAttribute("data-sem-3d", "");
    };
    const ocioso = window.requestIdleCallback?.(() => void iniciar(), { timeout: 1500 });
    const reserva = ocioso === undefined ? window.setTimeout(() => void iniciar(), 400) : 0;
    return () => {
      vivo = false;
      if (ocioso !== undefined) window.cancelIdleCallback(ocioso);
      window.clearTimeout(reserva);
      palco.current?.destruir();
      palco.current = null;
    };
    // As fichas são texto fixo do site; o palco nasce uma vez por visita.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    palco.current?.trocarPagina();
  }, [caminho]);

  return <canvas ref={tela} aria-hidden="true" className="bb-palco bb-exibicao" />;
}

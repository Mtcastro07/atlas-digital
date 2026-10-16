"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import type { Palco } from "@/components/ilhas/demos/odontologia/arcada-3d/motor";

/**
 * O palco da arcada (o Completo; identidade, seção 9): um só canvas, preso à tela, atrás das cenas, no layout da
 * clínica. A arcada em cerâmica vai à caixa das âncoras de cada cena ([data-arcada]: grande na capa, presa no
 * percurso, pequena na margem da ficha, de volta antes da chamada) e atravessa a troca de página até as âncoras da
 * página nova (o motor, ./arcada-3d/motor.ts, no modo ancorado). O motor só é baixado com o navegador ocioso; sem
 * WebGL, as âncoras mostram a reserva em traço (o mapa dos dentes). Decorativo.
 */
export function PalcoDaArcada({
  legendas,
  cabeca,
}: {
  legendas: { superior: string; inferior: string };
  cabeca: readonly [string, string];
}) {
  const tela = useRef<HTMLCanvasElement>(null);
  const palco = useRef<Palco | null>(null);
  const caminho = usePathname();

  useEffect(() => {
    let vivo = true;
    const canvas = tela.current;
    if (!canvas) return;
    const iniciar = async () => {
      const { iniciarPalco } = await import("@/components/ilhas/demos/odontologia/arcada-3d/motor");
      // A criação do contexto do WebGL e a compilação numa tarefa própria, e não junto com a avaliação do módulo (a
      // iniciação em etapas, cedendo a vez; a auditoria do Impeccable, 16.10.2026).
      await new Promise<void>((pronto) => (window.requestIdleCallback ? window.requestIdleCallback(() => pronto(), { timeout: 300 }) : window.setTimeout(pronto, 16)));
      if (!vivo) return;
      palco.current = iniciarPalco(canvas, {
        cena: "capa",
        reduzir: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        familia: getComputedStyle(canvas).fontFamily,
        textos: { legendas, cabeca },
        ancoras: "[data-arcada]",
        teto: ".od-pasta",
      });
      // Com o palco de pé, as reservas (o mapa em traço dentro de cada âncora) saem de cena.
      if (palco.current) document.documentElement.setAttribute("data-palco", "");
      else document.documentElement.setAttribute("data-sem-ceramica", "");
    };
    const ocioso = window.requestIdleCallback?.(() => void iniciar(), { timeout: 1200 });
    const reserva = ocioso === undefined ? window.setTimeout(() => void iniciar(), 300) : 0;
    return () => {
      vivo = false;
      if (ocioso !== undefined) window.cancelIdleCallback(ocioso);
      window.clearTimeout(reserva);
      palco.current?.destruir();
      palco.current = null;
      document.documentElement.removeAttribute("data-palco");
    };
    // Os textos são fixos do site; o palco nasce uma vez, no layout.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A cada página, as âncoras novas (depois da pintura, para a página nova já estar no lugar).
  useEffect(() => {
    const quadro = requestAnimationFrame(() => palco.current?.reancorar());
    return () => cancelAnimationFrame(quadro);
  }, [caminho]);

  return <canvas ref={tela} aria-hidden="true" data-ambiente className="od-palco" />;
}

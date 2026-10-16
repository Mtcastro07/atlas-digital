"use client";

import { useEffect, useRef } from "react";

/** O tempo que o ponteiro fica numa linha antes de a ficha virar: descer pela lista não desfia seis viradas. */
const ESPERA = 100;

/**
 * A lista de capítulos do início, com a ficha que vira para o capítulo (desde 14/10, a interação de conteúdo da
 * cena-índice, plano Completo). Sob o ponteiro fino, depois de 100 ms numa linha, a seção troca o data-objeto (a
 * placa das cadeiras) pelo da linha (data-previa), e o palco 3D, que relê as seções a cada quadro, vira a ficha em
 * 300 ms (o data-virada da seção; palco-3d/motor.ts). Ao sair da lista, volta às cadeiras. Teclado: sem prévia (o
 * teclado não se anima), a linha acende. Toque, movimento reduzido e sem script: nada; a lista funciona, e abaixo de
 * 1024 px cada linha mostra a miniatura da ficha (MiniFicha).
 */
export function PreviaDosCapitulos({ className, children }: { className?: string; children: React.ReactNode }) {
  const lista = useRef<HTMLOListElement>(null);
  const ligada = useRef(false);
  const espera = useRef(0);

  useEffect(() => {
    ligada.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => window.clearTimeout(espera.current);
  }, []);

  const secao = () => lista.current?.closest<HTMLElement>("[data-objeto]") ?? null;
  const pedir = (objeto: string | null) => {
    window.clearTimeout(espera.current);
    espera.current = window.setTimeout(() => {
      const s = secao();
      if (!s || !objeto) return;
      s.dataset.repouso ??= s.dataset.objeto;
      s.dataset.objeto = objeto;
    }, ESPERA);
  };

  return (
    <ol
      ref={lista}
      className={className}
      onPointerOver={(e) => {
        if (!ligada.current || e.pointerType !== "mouse") return;
        pedir((e.target as Element).closest("[data-previa]")?.getAttribute("data-previa") ?? null);
      }}
      onPointerLeave={(e) => {
        if (!ligada.current || e.pointerType !== "mouse") return;
        window.clearTimeout(espera.current);
        const s = secao();
        if (s?.dataset.repouso) s.dataset.objeto = s.dataset.repouso;
      }}
    >
      {children}
    </ol>
  );
}

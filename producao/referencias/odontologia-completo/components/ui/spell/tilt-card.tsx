"use client";

import { useEffect, useRef } from "react";

// Spell UI, Tilt Card (https://spell.sh/r/tilt-card), na adaptação do Atlas (producao/gestos/components/ui/spell/tilt-card.tsx),
// adaptada de novo para este site (decisoes.md, 08.10.2026): SEM o brilho que acompanha o ponteiro. O arquivo do nicho
// pede "a inclinação leve do mapa sob o ponteiro... nada de brilho em 'sorriso'" (producao/esteira/nichos/odontologia.md,
// seção 6.6). O resto fica como no kit: o corpo inclina em 3D sob o ponteiro, o lado do ponteiro cede; só com ponteiro fino
// e sem movimento reduzido; a posição é medida no invólucro, que não gira; uma escrita por quadro; sem `cn`.
// Desenho em app/gestos.css (.mov-inclina). Camada [C], contida (producao/esteira/09-movimento.md, seção 6).

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Inclinação máxima, em graus. */
  limite?: number;
};

export function TiltCard({ children, className = "", limite = 3 }: Props) {
  const involucro = useRef<HTMLDivElement>(null);
  const corpo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fora = involucro.current;
    const dentro = corpo.current;
    if (!fora || !dentro) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let quadro = 0;
    let ponteiro: PointerEvent | null = null;
    const aplicar = () => {
      quadro = 0;
      if (!ponteiro) return;
      const caixa = fora.getBoundingClientRect();
      const x = (ponteiro.clientX - caixa.left) / caixa.width;
      const y = (ponteiro.clientY - caixa.top) / caixa.height;
      // rotateX positivo afasta a borda de cima; rotateY positivo, a da direita.
      dentro.style.transform = `rotateX(${((0.5 - y) * 2 * limite).toFixed(2)}deg) rotateY(${((x - 0.5) * 2 * limite).toFixed(2)}deg)`;
    };
    const mover = (evento: PointerEvent) => {
      ponteiro = evento;
      if (!quadro) quadro = requestAnimationFrame(aplicar);
    };
    const sair = () => {
      ponteiro = null;
      cancelAnimationFrame(quadro);
      quadro = 0;
      dentro.style.transform = "";
    };
    fora.addEventListener("pointermove", mover, { passive: true });
    fora.addEventListener("pointerleave", sair);
    return () => {
      fora.removeEventListener("pointermove", mover);
      fora.removeEventListener("pointerleave", sair);
      cancelAnimationFrame(quadro);
    };
  }, [limite]);

  return (
    <div ref={involucro} className={`mov-inclina ${className}`}>
      <div ref={corpo} className="mov-inclina-corpo">
        {children}
      </div>
    </div>
  );
}

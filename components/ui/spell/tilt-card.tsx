"use client";

import { useEffect, useRef } from "react";

// Spell UI, Tilt Card (https://spell.sh/r/tilt-card, instalado pelo CLI do
// shadcn em 03/10), adaptado ao Atlas:
// - o corpo inclina em 3D sob o ponteiro — o lado do ponteiro cede, como
//   sob o dedo — e um brilho o acompanha; ao sair, volta reto;
// - só com ponteiro fino e sem movimento reduzido; no toque, fica parado;
// - a posição é medida no involucro, que não gira (medir a caixa girada
//   fazia o alvo andar com ela); a escrita é uma por quadro (rAF), direto
//   no estilo — o original refazia o componente a cada movimento do ponteiro;
// - sem aumentar no hover (o original crescia 5%) e sem `cn` (código de
//   navegador). Desenho em app/vidro.css (.vd-inclina).

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Inclinação máxima, em graus. */
  limite?: number;
  /** O raio dos cantos do que inclina, para o brilho não passar da borda (ex.: "15cqw", "var(--radius-xl)"). */
  raio?: string;
};

export function TiltCard({ children, className = "", limite = 8, raio }: Props) {
  const involucro = useRef<HTMLDivElement>(null);
  const corpo = useRef<HTMLDivElement>(null);
  const luz = useRef<HTMLSpanElement>(null);

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
      if (luz.current) {
        // O disco do brilho tem o dobro do tamanho do corpo: metade do deslocamento, em % dele.
        luz.current.style.opacity = "1";
        luz.current.style.transform = `translate(${((x - 0.5) * 50).toFixed(1)}%, ${((y - 0.5) * 50).toFixed(1)}%)`;
      }
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
      if (luz.current) luz.current.style.opacity = "0";
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
    <div ref={involucro} className={`vd-inclina ${className}`} style={raio ? ({ "--inclina-raio": raio } as React.CSSProperties) : undefined}>
      <div ref={corpo} className="vd-inclina-corpo">
        {children}
        <span aria-hidden="true" className="vd-inclina-brilho">
          <span ref={luz} />
        </span>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

/**
 * As caixas dos passos que se empilham ao rolar (as do site de 28/08,
 * pedido do usuário em 03/10). O empilhamento em si é CSS: cada caixa é
 * `sticky`, um pouco mais abaixo que a anterior (secoes/passos.tsx). Esta
 * ilha faz o recuo em profundidade: enquanto a caixa seguinte cobre a
 * atual, a atual recua, inclina-se um pouco e se apaga — só transform e
 * opacity (o desfoque de 28/08 ficou de fora: filter custa um repinte por
 * quadro). É a exceção pedida à regra de nada acompanhar a rolagem nas
 * páginas do Atlas: o ouvinte de rolagem só existe enquanto a lista está
 * na tela, um quadro por movimento. Com movimento reduzido, nada recua, e
 * as caixas só se empilham. O desenho vem pronto do servidor, como children.
 */
export function PilhaDePassos({ children, className }: { children: React.ReactNode; className?: string }) {
  const lista = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = lista.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const caixas = Array.from(el.children) as HTMLElement[];
    if (caixas.length < 2) return;

    let quadro = 0;
    let ouvindo = false;

    const pintar = () => {
      quadro = 0;
      for (let i = 0; i < caixas.length - 1; i++) {
        const atual = caixas[i].getBoundingClientRect();
        const seguinte = caixas[i + 1].getBoundingClientRect();
        // Quanto da caixa atual a seguinte já cobre, de 0 a 1.
        const p = Math.min(1, Math.max(0, (atual.bottom - seguinte.top) / Math.max(atual.height, 1)));
        const estilo = caixas[i].style;
        if (p === 0) {
          estilo.transform = "";
          estilo.opacity = "";
          continue;
        }
        estilo.transform = `perspective(1400px) translate3d(0, ${(-16 * p).toFixed(1)}px, ${(-130 * p).toFixed(0)}px) rotateX(${(5 * p).toFixed(2)}deg)`;
        estilo.opacity = (1 - 0.45 * p).toFixed(3);
      }
    };
    const pedir = () => {
      if (!quadro) quadro = requestAnimationFrame(pintar);
    };
    const ligar = (ligado: boolean) => {
      if (ligado === ouvindo) return;
      ouvindo = ligado;
      if (ligado) {
        window.addEventListener("scroll", pedir, { passive: true });
        window.addEventListener("resize", pedir);
        pedir();
      } else {
        window.removeEventListener("scroll", pedir);
        window.removeEventListener("resize", pedir);
      }
    };

    const observador = new IntersectionObserver(([entrada]) => ligar(entrada.isIntersecting));
    observador.observe(el);
    return () => {
      observador.disconnect();
      ligar(false);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return (
    <ol ref={lista} className={className}>
      {children}
    </ol>
  );
}

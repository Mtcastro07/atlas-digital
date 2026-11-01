"use client";

import { useEffect, useRef, useState } from "react";

/**
 * O palco da esfera da capa (marca/esfera.tsx). Duas tarefas, ambas
 * opcionais — a rotação em si é CSS, liberada pela classe .js (é o script
 * que oferece o botão de pausa do cabeçalho, que a para junto com o resto
 * do movimento contínuo, [data-ambiente]; sem script, a esfera fica
 * parada, em leque):
 * - pausa os meridianos e o brilho quando a capa sai de vista, para não
 *   gastar processador com o que ninguém vê;
 * - com ponteiro fino (computador), inclina o eixo conforme o ponteiro
 *   cruza a tela, como no site de 28/08. Nada disso com movimento reduzido.
 * O desenho vem pronto do servidor, como children. O halo quente que pulsa
 * atrás da esfera (.mov-esfera-brilho) saiu em 03/10 pela regra 3 das
 * Diretrizes de Design Premium e voltou no mesmo dia, a pedido do usuário:
 * é parte da identidade do site.
 */
export function EsferaViva({ children }: { children: React.ReactNode }) {
  const palco = useRef<HTMLDivElement>(null);
  const eixo = useRef<HTMLDivElement>(null);
  const [pausada, setPausada] = useState(false);

  useEffect(() => {
    if (!palco.current || !eixo.current) return;
    const alvo = eixo.current;
    let foraDeVista = false;

    const observador = new IntersectionObserver(([entrada]) => {
      foraDeVista = !entrada.isIntersecting;
      setPausada(foraDeVista);
    });
    observador.observe(palco.current);

    const comPonteiro = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let quadro = 0;
    let x = 0;
    let y = 0;

    const inclinar = () => {
      quadro = 0;
      alvo.style.transform = `rotateX(${(-14 - y * 10).toFixed(2)}deg) rotateZ(${(x * 6).toFixed(2)}deg)`;
    };
    const aoMover = (evento: PointerEvent) => {
      x = evento.clientX / window.innerWidth - 0.5;
      y = evento.clientY / window.innerHeight - 0.5;
      if (!quadro && !foraDeVista) quadro = requestAnimationFrame(inclinar);
    };

    if (comPonteiro && !semMovimento) window.addEventListener("pointermove", aoMover, { passive: true });
    return () => {
      observador.disconnect();
      window.removeEventListener("pointermove", aoMover);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return (
    <div
      ref={palco}
      aria-hidden="true"
      data-ambiente
      data-pausa={pausada || undefined}
      className="pointer-events-none absolute inset-x-0 top-12 bottom-0 flex items-center justify-center"
    >
      <span className="mov-esfera-brilho absolute" />
      {/* Os traços num invólucro próprio, proporcional ao bloco de texto (a esfera inteira cabe
          nele): a máscara que os dissolve atrás do texto fica nas coordenadas do bloco, em qualquer
          largura (app/movimento.css, .mov-esfera-tracos). O mt-12 devolve a esfera ao centro do
          palco, 24 px abaixo do centro do bloco, onde ela sempre esteve. */}
      <div className="mov-esfera-tracos">
        <div ref={eixo} className="mov-esfera-eixo relative mt-12 flex-none">
          {children}
        </div>
      </div>
      <span className="mov-esfera-veu absolute inset-0" />
    </div>
  );
}

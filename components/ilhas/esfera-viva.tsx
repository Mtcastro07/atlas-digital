"use client";

import { useEffect, useRef } from "react";

/**
 * O palco da esfera da capa (marca/esfera.tsx). O giro é CSS, liberado pela classe .js e pelo data-visivel do
 * [data-ambiente] (o observador de ilhas/controle-do-movimento.tsx): é a passiva P1 do início (R10, 28/10), e a pausa,
 * a parada fora da tela e o movimento reduzido são as regras do sistema (app/movimento.css). Até 28/10, esta ilha tinha
 * o seu próprio observador (data-pausa); saiu, porque o [data-fora] do sistema faz o mesmo.
 * Fica uma tarefa, opcional: com ponteiro fino (computador), inclinar o eixo conforme o ponteiro cruza a tela, como no
 * site de 28/08. Nada disso com movimento reduzido, nem com a esfera fora da tela.
 * O desenho vem pronto do servidor, como children. O halo quente atrás da esfera (.inicio-halo) saiu em 03/10 pela
 * regra 3 das Diretrizes de Design Premium e voltou no mesmo dia, a pedido do usuário: é parte da identidade do site.
 */
export function EsferaViva({ children }: { children: React.ReactNode }) {
  const palco = useRef<HTMLDivElement>(null);
  const eixo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!palco.current || !eixo.current) return;
    const lugar = palco.current;
    const alvo = eixo.current;
    const comPonteiro = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!comPonteiro || semMovimento) return;
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
      if (!quadro && !lugar.hasAttribute("data-fora")) quadro = requestAnimationFrame(inclinar);
    };

    window.addEventListener("pointermove", aoMover, { passive: true });
    return () => {
      window.removeEventListener("pointermove", aoMover);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return (
    <div
      ref={palco}
      aria-hidden="true"
      data-ambiente
      data-passiva="inicio-esfera"
      className="mov-esfera-palco pointer-events-none absolute inset-x-0 top-12 bottom-0 flex items-center justify-center"
    >
      <span className="inicio-halo mov-passiva absolute" />
      {/* Onde a esfera pousa, no papel da seção de baixo (desde 16/10): a sombra de contato, longe da luz. */}
      <span className="mov-esfera-pouso absolute" />
      {/* Os traços num invólucro próprio, proporcional ao bloco de texto (a esfera inteira cabe
          nele): a máscara que os dissolve atrás do texto fica nas coordenadas do bloco, em qualquer
          largura (app/paginas/inicio.css, .mov-esfera-tracos). A esfera desce do centro do bloco
          (--desce): desde 16/10, o bastante para atravessar a emenda e pousar na seção de baixo. */}
      <div className="mov-esfera-tracos">
        <div ref={eixo} className="mov-esfera-eixo relative flex-none">
          {children}
        </div>
      </div>
      <span className="mov-esfera-veu absolute inset-0" />
    </div>
  );
}

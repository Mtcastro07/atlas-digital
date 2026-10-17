"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { fundoSob } from "@/lib/fundo-sob";

/** Abaixo desta rolagem, o cabeçalho nunca se recolhe. */
const TOPO = 280;
/** Deslocamento mínimo, em px, para contar como mudança de direção. */
const FOLGA = 6;
/** Intervalo mínimo entre duas leituras, em ms (a leitura vai a getComputedStyle). */
const INTERVALO = 80;

/** A transição de página em curso, onde o navegador a expõe (o Chrome; os outros, ainda não). */
const transicaoAtiva = () => (document as Document & { activeViewTransition?: ViewTransition | null }).activeViewTransition;

/**
 * O cabeçalho, como no site de 28/08: no celular e no tablet (até 1023 px),
 * recolhe ao rolar para baixo e volta ao rolar para cima — e, ao voltar,
 * o globo do logotipo dá uma volta (ilhas/giro-do-globo.tsx). Da largura
 * de computador em diante, fica sempre à vista. Volta também quando algo
 * dentro dele recebe foco pelo teclado (:focus-visible). O conteúdo vem
 * desenhado do servidor (secoes/cabecalho.tsx). Sem script, fica fixo e
 * visível, em vidro escuro.
 * A barra de vidro líquido se adapta ao que passa por trás dela, como o
 * vidro da Apple (data-fundo, app/vidro.css): sobre o escuro, vidro escuro
 * e quase transparente, com texto creme; sobre o claro, vidro claro, com
 * texto navy; sobre os dois ao mesmo tempo, vidro navy denso, que mantém o
 * contraste em qualquer ponto. Lido durante a rolagem (no máximo a cada
 * 80 ms, pela cor de fundo real do que está sob a barra); não grava nada.
 * Fica no layout: a cada troca de página, a leitura recomeça.
 */
export function CabecalhoRetratil({ children }: { children: React.ReactNode }) {
  const [recolhido, setRecolhido] = useState(false);
  const cabecalho = useRef<HTMLElement>(null);
  const caminho = usePathname();

  useEffect(() => {
    const elemento = cabecalho.current;
    const barra = elemento?.querySelector<HTMLElement>(".vd-barra");
    let anterior = window.scrollY;
    let quadro = 0;
    let lida = 0;
    let pendente = 0;

    const lerFundo = () => {
      if (!elemento || !barra) return;
      lida = performance.now();
      // Lê-se o que fica sob a barra na posição de repouso (desde 16/10, passe 3): recolhida ou voltando, ela está
      // acima dela, e até então a linha média acima do topo da tela valia "escuro" — num gesto curto para cima sobre o
      // claro, a pílula voltava em vidro escuro e ficava assim (C1). O recolhimento é o translate do <header>.
      const caixa = barra.getBoundingClientRect();
      const recuo = Math.min(0, elemento.getBoundingClientRect().top);
      const fundo = fundoSob(elemento, { left: caixa.left, width: caixa.width, top: caixa.top - recuo, height: caixa.height });
      if (elemento.dataset.fundo !== fundo) elemento.dataset.fundo = fundo;
    };
    // No máximo uma leitura a cada INTERVALO ms; a última posição é sempre lida. Durante a transição de página, nenhuma
    // (a rolagem ao topo da página nova cai nela): o fim da transição lê (abaixo).
    const agendarLeitura = () => {
      if (transicaoAtiva()) return;
      const espera = INTERVALO - (performance.now() - lida);
      window.clearTimeout(pendente);
      if (espera <= 0) lerFundo();
      else pendente = window.setTimeout(lerFundo, espera);
    };

    const aoRolar = () => {
      if (quadro) return;
      quadro = requestAnimationFrame(() => {
        quadro = 0;
        agendarLeitura();
        const y = window.scrollY;
        const delta = y - anterior;
        if (Math.abs(delta) < FOLGA) return;
        anterior = y;
        setRecolhido(delta > 0 && y > TOPO);
      });
    };

    // Na troca de página, o que está sob a barra é a camada da transição, não a página (lia-se "escuro" sobre a página
    // clara, até a primeira rolagem; o crítico de fora, 14/10). Enquanto ela dura, vale o tom da abertura da página nova,
    // que fica sob o cabeçalho no topo; quando acaba, a leitura de verdade. Sem activeViewTransition, relê aos 900 ms.
    const transicao = transicaoAtiva();
    let viva = true;
    if (transicao && elemento) {
      const tom = document.querySelector("main [data-tom]")?.getAttribute("data-tom");
      elemento.dataset.fundo = tom && tom !== "escuro" ? "claro" : "escuro";
      transicao.finished.finally(() => viva && lerFundo());
    } else {
      lerFundo();
      if (!("activeViewTransition" in document)) pendente = window.setTimeout(lerFundo, 900);
    }
    // E de novo quando a barra assenta (o fim do recolhimento ou da volta): o dedo pode parar antes dela.
    const aoAssentar = (evento: TransitionEvent) => {
      if (evento.target === elemento && !transicaoAtiva()) lerFundo();
    };
    elemento?.addEventListener("transitionend", aoAssentar);
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar, { passive: true });
    return () => {
      viva = false;
      elemento?.removeEventListener("transitionend", aoAssentar);
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
      cancelAnimationFrame(quadro);
      window.clearTimeout(pendente);
    };
  }, [caminho]);

  return (
    // A faixa do <header> é transparente e não recebe o ponteiro: o que se
    // vê é a pílula de vidro dentro dela (secoes/cabecalho.tsx). Recolhido,
    // sobe a própria altura e mais 2 rem: a sombra da pílula desce até 30 px
    // abaixo da faixa e ficava no topo da tela (14/10). Com movimento reduzido, recolhe sem deslizar (14/10).
    <header
      ref={cabecalho}
      data-fundo="escuro"
      data-recolhido={recolhido || undefined}
      className="pointer-events-none sticky top-0 z-40 transition-transform duration-300 ease-atlas motion-reduce:transition-none max-lg:data-recolhido:[&:not(:has(:focus-visible))]:-translate-y-[calc(100%+2rem+env(safe-area-inset-top))]"
    >
      {children}
    </header>
  );
}

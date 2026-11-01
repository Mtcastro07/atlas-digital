"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Abaixo desta rolagem, o cabeçalho nunca se recolhe. */
const TOPO = 280;
/** Deslocamento mínimo, em px, para contar como mudança de direção. */
const FOLGA = 6;
/** Pontos da linha média da barra onde se lê o que passa por trás: um a cada ~8% da largura. */
const PONTOS = Array.from({ length: 13 }, (_, i) => 0.04 + (i * 0.92) / 12);
/** Intervalo mínimo entre duas leituras, em ms (a leitura vai a getComputedStyle). */
const INTERVALO = 80;

type Fundo = "claro" | "escuro" | "misto";

/**
 * Se o fundo de um elemento é claro: sobe pelos ancestrais até achar uma
 * cor de fundo opaca e mede a luminância dela. Sem nada até a raiz, é o
 * navy da página.
 */
function eClaro(elemento: Element | undefined): boolean {
  for (let atual = elemento ?? null; atual && atual !== document.documentElement; atual = atual.parentElement) {
    const cor = getComputedStyle(atual).backgroundColor;
    const n = cor.match(/-?[\d.]+/g)?.map(Number);
    if (!n || n.length < 3) continue;
    if (cor.startsWith("rgb")) {
      if (n.length > 3 && n[3] < 0.5) continue;
      const [r, g, b] = n.map((c) => c / 255);
      return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.45;
    }
    // oklab()/oklch() (as cores com opacidade do Tailwind): o primeiro número é a luminosidade.
    if (cor.startsWith("ok")) {
      if (/\/\s*0?\.[0-4]/.test(cor)) continue;
      return (n[0] > 1 ? n[0] / 100 : n[0]) > 0.7;
    }
  }
  return false;
}

/**
 * O que passa por trás da barra, lido nos elementos sob 13 pontos da sua
 * linha média. Todos claros: "claro"; todos escuros: "escuro"; mistura:
 * "misto".
 */
function fundoSob(cabecalho: HTMLElement, barra: HTMLElement): Fundo {
  const caixa = barra.getBoundingClientRect();
  const y = caixa.top + caixa.height / 2;
  if (y < 0) return "escuro";
  let claros = 0;
  for (const fracao of PONTOS) {
    const sob = document.elementsFromPoint(caixa.left + caixa.width * fracao, y).find((el) => !cabecalho.contains(el));
    if (eClaro(sob)) claros++;
  }
  if (claros === PONTOS.length) return "claro";
  if (claros === 0) return "escuro";
  return "misto";
}

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
      const fundo = fundoSob(elemento, barra);
      if (elemento.dataset.fundo !== fundo) elemento.dataset.fundo = fundo;
    };
    // No máximo uma leitura a cada INTERVALO ms; a última posição é sempre lida.
    const agendarLeitura = () => {
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

    lerFundo();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
      cancelAnimationFrame(quadro);
      window.clearTimeout(pendente);
    };
  }, [caminho]);

  return (
    // A faixa do <header> é transparente e não recebe o ponteiro: o que se
    // vê é a pílula de vidro dentro dela (secoes/cabecalho.tsx).
    <header
      ref={cabecalho}
      data-fundo="escuro"
      data-recolhido={recolhido || undefined}
      className="pointer-events-none sticky top-0 z-40 transition-transform duration-300 ease-atlas max-lg:data-recolhido:[&:not(:has(:focus-visible))]:-translate-y-full"
    >
      {children}
    </header>
  );
}

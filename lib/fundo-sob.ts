export type Fundo = "claro" | "escuro" | "misto";

/** Pontos da linha média de uma caixa onde se lê o que passa por trás: um a cada ~8% da largura. */
const PONTOS = Array.from({ length: 13 }, (_, i) => 0.04 + (i * 0.92) / 12);

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
 * O que passa por trás de uma peça flutuante (a pílula do cabeçalho, o
 * atalho do WhatsApp), lido nos elementos sob 13 pontos da linha média da
 * `caixa`, ignorando a própria peça (`dono`). Todos claros: "claro"; todos
 * escuros: "escuro"; mistura: "misto". Desde 16/10 (passe 3), em
 * lib/: até então, só o cabeçalho lia o fundo (ilhas/cabecalho-retratil.tsx).
 */
export function fundoSob(dono: Element, caixa: { left: number; width: number; top: number; height: number }): Fundo {
  const y = Math.min(Math.max(caixa.top + caixa.height / 2, 1), window.innerHeight - 1);
  let claros = 0;
  for (const fracao of PONTOS) {
    const sob = document.elementsFromPoint(caixa.left + caixa.width * fracao, y).find((el) => !dono.contains(el));
    if (eClaro(sob)) claros++;
  }
  if (claros === PONTOS.length) return "claro";
  if (claros === 0) return "escuro";
  return "misto";
}

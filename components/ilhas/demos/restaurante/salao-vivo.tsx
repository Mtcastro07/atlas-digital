"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** A inclinação máxima das peças, em graus: pouca, para o giz continuar legível. */
const INCLINACAO = 3;
/** O balanço da lousa no prego: a amplitude em graus e o período em segundos. */
const BALANCO = { graus: 0.55, segundos: 7.5 };

/**
 * O salão que responde (identidade, seção 8; 09-movimento.md, seções 12 e 13). Uma ilha só, no layout, refeita a
 * cada página:
 * - **as cenas** ([data-cena]): as que nascem abaixo da dobra esperam ([data-espera]) e, ao entrar na tela, ganham
 *   [data-vista], uma vez; o momento de cada cena é dela (restaurante.css). O que já está na tela nunca some;
 * - **as peças** ([data-peca]: a lousa, o cavalete, os azulejos, a comanda): sob o ponteiro fino, inclinam até 3° e a
 *   luz da matéria vai aonde o ponteiro está (--rx, --ry, --lx, --ly); no toque, a luz acende no ponto tocado;
 * - **o balanço** ([data-balanca]): a lousa balança devagar no prego, só na tela, sem a pausa (html.ambiente-pausado,
 *   o botão da porta) e com a aba visível; na tela, ela ganha [data-na-tela], que também solta o vapor da panela;
 * - **a galeria de hoje** ([data-ate-hoje]): a fila das lousas abre no dia de hoje ([data-hoje]);
 * - **os itens de lista** ([data-toque]): no toque, ganham [data-tocado] por um instante (o tique, no celular).
 * Com movimento reduzido, nada espera, nada inclina, nada balança; o tique do toque fica (é cor, não deslocamento).
 */
export function SalaoVivo() {
  const caminho = usePathname();

  useEffect(() => {
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const desfazer: (() => void)[] = [];

    for (const fila of document.querySelectorAll<HTMLElement>("[data-ate-hoje]")) {
      const hoje = fila.querySelector<HTMLElement>("[data-hoje]");
      if (!hoje) continue;
      const recuo = parseFloat(getComputedStyle(fila).paddingLeft || "0");
      const ate = fila.scrollLeft + hoje.getBoundingClientRect().left - fila.getBoundingClientRect().left - recuo;
      fila.scrollTo({ left: ate, behavior: "instant" });
    }

    // Os itens de lista ([data-toque]: os pratos, os dias), no toque: o tique da comanda se escreve no tocado, por
    // 900 ms (o equivalente do ponteiro, que só a mesa tem). Só no toque que não rolou: a rolagem cancela o ponteiro.
    for (const item of document.querySelectorAll<HTMLElement>("[data-toque]")) {
      let fim = 0;
      const tocou = (e: PointerEvent) => {
        if (e.pointerType === "mouse") return;
        item.setAttribute("data-tocado", "");
        window.clearTimeout(fim);
        fim = window.setTimeout(() => item.removeAttribute("data-tocado"), 900);
      };
      item.addEventListener("pointerup", tocou);
      desfazer.push(() => {
        item.removeEventListener("pointerup", tocou);
        window.clearTimeout(fim);
        item.removeAttribute("data-tocado");
      });
    }
    if (reduzir) return () => desfazer.forEach((f) => f());

    // As cenas.
    const dobra = window.innerHeight * 0.9;
    const vigia = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          e.target.removeAttribute("data-espera");
          e.target.setAttribute("data-vista", "");
          vigia.unobserve(e.target);
        }
      },
      { threshold: 0.18 },
    );
    for (const cena of document.querySelectorAll<HTMLElement>("[data-cena]")) {
      if (cena.getBoundingClientRect().top > dobra) {
        cena.setAttribute("data-espera", "");
        vigia.observe(cena);
      } else cena.setAttribute("data-vista", "");
    }
    desfazer.push(() => vigia.disconnect());

    // As peças.
    for (const peca of document.querySelectorAll<HTMLElement>("[data-peca]")) {
      let quadro = 0;
      let ultimo: PointerEvent | null = null;
      const aplicar = () => {
        quadro = 0;
        if (!ultimo) return;
        const r = peca.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (ultimo.clientX - r.left) / r.width));
        const y = Math.min(1, Math.max(0, (ultimo.clientY - r.top) / r.height));
        peca.style.setProperty("--lx", `${(x * 100).toFixed(1)}%`);
        peca.style.setProperty("--ly", `${(y * 100).toFixed(1)}%`);
        if (fino) {
          peca.style.setProperty("--rx", `${((0.5 - y) * 2 * INCLINACAO).toFixed(2)}deg`);
          peca.style.setProperty("--ry", `${((x - 0.5) * 2 * INCLINACAO).toFixed(2)}deg`);
        }
        peca.setAttribute("data-sob", "");
      };
      const mover = (e: PointerEvent) => {
        ultimo = e;
        if (!quadro) quadro = requestAnimationFrame(aplicar);
      };
      const sair = () => {
        ultimo = null;
        cancelAnimationFrame(quadro);
        quadro = 0;
        peca.removeAttribute("data-sob");
        for (const v of ["--rx", "--ry"]) peca.style.removeProperty(v);
      };
      let toque = 0;
      const tocar = (e: PointerEvent) => {
        if (e.pointerType === "mouse") return;
        ultimo = e;
        aplicar();
        window.clearTimeout(toque);
        toque = window.setTimeout(sair, 400);
      };
      if (fino) {
        peca.addEventListener("pointermove", mover, { passive: true });
        peca.addEventListener("pointerleave", sair);
      }
      peca.addEventListener("pointerdown", tocar, { passive: true });
      desfazer.push(() => {
        peca.removeEventListener("pointermove", mover);
        peca.removeEventListener("pointerleave", sair);
        peca.removeEventListener("pointerdown", tocar);
        window.clearTimeout(toque);
        sair();
      });
    }

    // O balanço.
    const balancas = [...document.querySelectorAll<HTMLElement>("[data-balanca]")];
    const naTela = new Set<HTMLElement>();
    const olho = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        (e.isIntersecting ? naTela.add(e.target as HTMLElement) : naTela.delete(e.target as HTMLElement));
        e.target.toggleAttribute("data-na-tela", e.isIntersecting);
      }
      if (naTela.size) pedir();
    });
    balancas.forEach((b) => olho.observe(b));
    let laco = 0;
    let tempo = 0;
    let antes = 0;
    const raiz = document.documentElement;
    const passo = (agora: number) => {
      laco = 0;
      const dt = antes ? Math.min(0.05, (agora - antes) / 1000) : 0;
      antes = agora;
      if (!raiz.classList.contains("ambiente-pausado") && !document.hidden) tempo += dt;
      const graus = Math.sin((tempo / BALANCO.segundos) * Math.PI * 2) * BALANCO.graus;
      for (const b of naTela) b.style.setProperty("--balanco", `${graus.toFixed(3)}deg`);
      // Com a pausa, o laço para; a pausa desfeita o retoma (o vigia da classe, abaixo).
      if (naTela.size && !raiz.classList.contains("ambiente-pausado")) pedir();
      else antes = 0;
    };
    function pedir() {
      if (!laco) laco = requestAnimationFrame(passo);
    }
    const vigiaDaPausa = new MutationObserver(() => {
      if (!raiz.classList.contains("ambiente-pausado") && naTela.size) pedir();
    });
    vigiaDaPausa.observe(raiz, { attributes: true, attributeFilter: ["class"] });
    desfazer.push(() => {
      vigiaDaPausa.disconnect();
      olho.disconnect();
      cancelAnimationFrame(laco);
      balancas.forEach((b) => {
        b.style.removeProperty("--balanco");
        b.removeAttribute("data-na-tela");
      });
    });

    return () => desfazer.forEach((f) => f());
  }, [caminho]);

  return null;
}

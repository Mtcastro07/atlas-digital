"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** A inclinação máxima das peças, em graus: pouca, para o giz continuar legível. */
const INCLINACAO = 3;
/** A cena chega quando entra nos três quartos de cima da tela: na beira de baixo, o momento passaria sem ninguém ver. */
const CHEGADA = 0.75;

/**
 * O salão que responde (identidade, seção 8; 09-movimento.md, seções 12 e 13). Uma ilha só, no layout, refeita a
 * cada página:
 * - **as cenas** ([data-cena]): as que nascem abaixo dos três quartos de cima da tela esperam ([data-espera]) e, ao
 *   entrar neles, ganham [data-vista], uma vez; o momento de cada cena é dela (restaurante.css). A cena que nasce na
 *   beira de baixo da tela já chega à primeira pintura na pose de espera (a regra html.js, no CSS): nada some. A fila
 *   da cozinha, que espera sem as lousinhas, chega ao entrar na tela (a régua nunca fica vazia à vista);
 * - **as peças** ([data-peca]: a lousa da capa, a lousa grande da cozinha, o cavalete): sob o ponteiro fino, inclinam
 *   até 3° e a luz da matéria vai aonde o ponteiro está (--rx, --ry, --lx, --ly); no toque, a luz acende no ponto
 *   tocado. Os azulejos ([data-peca="luz"]) estão assentados no rejunte: só o brilho do vidrado segue a mão;
 * - **o balanço** ([data-balanca]): a lousa balança devagar no prego (um @keyframes do CSS), só na tela: ela ganha
 *   [data-na-tela], que solta o balanço e o vapor da panela; a pausa (html.ambiente-pausado) os para no CSS;
 * - **a galeria de hoje** ([data-ate-hoje]): a fila das lousas abre no dia de hoje ([data-hoje]);
 * - **o que responde ao toque** ([data-toque]: os itens de lista e o guardanapo): no toque, ganha [data-tocado] por um
 *   instante (o tique no papel, a seta de giz na lousa, o mapa que aproxima no guardanapo).
 * Com movimento reduzido, nada espera, nada inclina, nada balança; o tique do toque fica (é cor, não deslocamento), e o
 * guardanapo não aproxima (o CSS).
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

    // O que responde ao toque ([data-toque]: os pratos, os dias, as lousinhas, o guardanapo): [data-tocado] por 900 ms,
    // o equivalente do ponteiro, que só a mesa tem. Só no toque que não rolou: a rolagem cancela o ponteiro.
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

    // As cenas. A fila da cozinha é a exceção: na espera, as lousinhas não estão à vista, e a régua com os ganchos
    // vazios lia como página quebrada (o crítico de fora, 16.10.2026). Ela chega quando a régua entra na tela, e não
    // nos três quartos de cima: na carga, se a régua já está à vista, as lousinhas são penduradas na hora.
    const dobra = window.innerHeight * CHEGADA;
    const chegar = (entradas: IntersectionObserverEntry[], olheiro: IntersectionObserver) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        e.target.removeAttribute("data-espera");
        e.target.setAttribute("data-vista", "");
        olheiro.unobserve(e.target);
      }
    };
    const vigia = new IntersectionObserver(chegar, { threshold: 0.18, rootMargin: `0px 0px -${(1 - CHEGADA) * 100}% 0px` });
    const vigiaDaBeira = new IntersectionObserver(chegar);
    for (const cena of document.querySelectorAll<HTMLElement>("[data-cena]")) {
      const naBeira = cena.dataset.cena === "fila";
      if (cena.getBoundingClientRect().top > (naBeira ? window.innerHeight : dobra)) {
        cena.setAttribute("data-espera", "");
        (naBeira ? vigiaDaBeira : vigia).observe(cena);
      } else cena.setAttribute("data-vista", "");
    }
    desfazer.push(() => {
      vigia.disconnect();
      vigiaDaBeira.disconnect();
    });

    // As peças.
    for (const peca of document.querySelectorAll<HTMLElement>("[data-peca]")) {
      let quadro = 0;
      let ultimo: PointerEvent | null = null;
      const inclina = fino && peca.dataset.peca !== "luz";
      const aplicar = () => {
        quadro = 0;
        if (!ultimo) return;
        const r = peca.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (ultimo.clientX - r.left) / r.width));
        const y = Math.min(1, Math.max(0, (ultimo.clientY - r.top) / r.height));
        peca.style.setProperty("--lx", `${(x * 100).toFixed(1)}%`);
        peca.style.setProperty("--ly", `${(y * 100).toFixed(1)}%`);
        if (inclina) {
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

    // O balanço: só a marca de "na tela"; o movimento é do CSS (nenhum script escreve estilo a cada quadro).
    const balancas = [...document.querySelectorAll<HTMLElement>("[data-balanca]")];
    const olho = new IntersectionObserver((entradas) => {
      for (const e of entradas) e.target.toggleAttribute("data-na-tela", e.isIntersecting);
    });
    balancas.forEach((b) => olho.observe(b));
    desfazer.push(() => {
      olho.disconnect();
      balancas.forEach((b) => b.removeAttribute("data-na-tela"));
    });

    return () => desfazer.forEach((f) => f());
  }, [caminho]);

  return null;
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** A inclinação máxima da cerâmica sob a mão, em graus. */
const GIRO = 4;
/** O tempo da contagem dos números, em ms. */
const CONTAGEM = 900;

/**
 * O consultório que responde à mão (identidade, seção 9: o vocabulário de interação do Completo; 09-movimento.md,
 * seção 13). Uma ilha, no layout, refeita a cada página; delega no documento, sem um ouvinte por peça:
 * - as cenas ([data-cena]) que nascem abaixo da dobra aguardam ([data-aguarda]) e acendem ([data-acesa]) ao entrar,
 *   uma vez: o momento de cada uma é dela (odontologia.css); o que já está na tela nunca some;
 * - a cerâmica ([data-ceramica]: os cartões de retorno, as placas): sob o ponteiro fino, inclina até 4° e a aresta
 *   de luz vai aonde ele está (--giro-x, --giro-y, --luz-x, --luz-y); no toque, a luz no ponto tocado, por 400 ms;
 * - os números ([data-conta]) contam uma vez, ao entrar na tela;
 * - a ficha de tratamentos: a linha sob o ponteiro, ou com o foco, acende a região dela na arcada da margem
 *   (.od-ancora-da-ficha, data-regiao) e leva a miniatura do mapa ([data-miniatura]) para junto do ponteiro, na
 *   margem da ficha;
 * - o percurso: o passo no meio da tela ganha [data-agora] (o nome da região em foco);
 * - a tinta da pasta: a cena que está embaixo do cabeçalho ([data-tinta]: "escura", "vermelha") vai à raiz, e a pasta
 *   troca de tinta com ela (o cabeçalho que lê a cena; 19-o-padrao-atlas.md, seção 6.1).
 * Com movimento reduzido: nada aguarda, nada inclina, nada conta; a região acende sem a miniatura.
 */
export function ConsultorioVivo() {
  const caminho = usePathname();

  useEffect(() => {
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const ao: [EventTarget, string, EventListener][] = [];
    const ouvir = (alvo: EventTarget, tipo: string, f: EventListener) => {
      alvo.addEventListener(tipo, f, { passive: true });
      ao.push([alvo, tipo, f]);
    };
    const observadores: IntersectionObserver[] = [];
    const tempos: number[] = [];
    let peca: HTMLElement | null = null;
    let quadro = 0;
    let toque = 0;
    let ultimo: PointerEvent | null = null;
    const soltar = () => {
      if (!peca) return;
      peca.removeAttribute("data-sob-a-luz");
      for (const v of ["--giro-x", "--giro-y"]) peca.style.removeProperty(v);
      peca = null;
    };

    // A tinta da pasta: a cena logo abaixo da borda de baixo do cabeçalho (a pasta fica no fluxo, não sobre a cena).
    const raiz = document.documentElement;
    const pasta = document.querySelector<HTMLElement>(".od-pasta");
    const tintas = [...document.querySelectorAll<HTMLElement>("[data-tinta]")];
    let quadroDaTinta = 0;
    const verTinta = () => {
      quadroDaTinta = 0;
      const y = (pasta?.getBoundingClientRect().bottom ?? 80) + 1;
      const sob = tintas.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= y && r.bottom > y;
      });
      if (sob?.dataset.tinta) raiz.dataset.tinta = sob.dataset.tinta;
      else delete raiz.dataset.tinta;
    };
    verTinta();
    ouvir(window, "scroll", () => {
      if (!quadroDaTinta) quadroDaTinta = requestAnimationFrame(verTinta);
    });
    ouvir(window, "resize", verTinta);

    // O percurso: o passo do meio da tela.
    const meio = new IntersectionObserver(
      (es) => es.forEach((e) => e.target.toggleAttribute("data-agora", e.isIntersecting)),
      { rootMargin: "-46% 0px -46% 0px" },
    );
    document.querySelectorAll("[data-passo]").forEach((p) => meio.observe(p));
    observadores.push(meio);

    // A ficha: a linha acende a região na arcada da margem; a miniatura acompanha o ponteiro.
    const ancoraDaFicha = document.querySelector<HTMLElement>(".od-ancora-da-ficha");
    const miniatura = document.querySelector<HTMLElement>("[data-miniatura]");
    const linhaDe = (e: Event) => (e.target as Element | null)?.closest?.<HTMLElement>("[data-linha-da-ficha]") ?? null;
    let linhaAtual: HTMLElement | null = null;
    const acender = (linha: HTMLElement | null) => {
      if (linha === linhaAtual) return;
      linhaAtual?.removeAttribute("data-marcada");
      linhaAtual = linha;
      linha?.setAttribute("data-marcada", "");
      if (ancoraDaFicha) {
        if (linha?.dataset.regioes) ancoraDaFicha.dataset.regiao = linha.dataset.regioes;
        else delete ancoraDaFicha.dataset.regiao;
      }
      if (miniatura) {
        if (linha && fino && !reduzir) {
          miniatura.dataset.ativas = linha.dataset.regioes ?? "";
          miniatura.setAttribute("data-mostra", "");
        } else miniatura.removeAttribute("data-mostra");
      }
    };
    ouvir(document, "pointerover", (e) => acender(linhaDe(e)));
    ouvir(document, "focusin", (e) => acender(linhaDe(e)));
    // No toque, a linha acende no ponto tocado e apaga logo depois (o dedo que rola não deixa a linha acesa para trás).
    let apagar = 0;
    const soltarLinha = (e: Event) => {
      if ((e as PointerEvent).pointerType === "mouse") return;
      window.clearTimeout(apagar);
      apagar = window.setTimeout(() => acender(null), 400);
    };
    ouvir(document, "pointerup", soltarLinha);
    ouvir(document, "pointercancel", soltarLinha);
    if (miniatura && fino && !reduzir) {
      ouvir(document, "pointermove", (e) => {
        if (!linhaAtual) return;
        const p = e as PointerEvent;
        // Junto do ponteiro, mas na margem da ficha: a miniatura não cobre a coluna "Onde".
        const borda = linhaAtual.closest("table")?.getBoundingClientRect().right ?? 0;
        miniatura.style.translate = `${Math.max(p.clientX + 22, borda + 16)}px ${p.clientY - 70}px`;
      });
    }

    if (reduzir) return () => desfazer();

    // As cenas abaixo da dobra.
    const dobra = window.innerHeight * 0.88;
    const cenas = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.removeAttribute("data-aguarda");
          e.target.setAttribute("data-acesa", "");
          cenas.unobserve(e.target);
        }),
      { threshold: 0.16 },
    );
    document.querySelectorAll<HTMLElement>("[data-cena]").forEach((c) => {
      if (c.getBoundingClientRect().top > dobra) {
        c.setAttribute("data-aguarda", "");
        cenas.observe(c);
      } else c.setAttribute("data-acesa", "");
    });
    observadores.push(cenas);

    // Os números que contam, uma vez.
    const numeros = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          numeros.unobserve(e.target);
          const el = e.target as HTMLElement;
          const fim = Number(el.dataset.conta);
          if (!Number.isFinite(fim) || fim < 2) return;
          const desde = performance.now();
          const passo = (agora: number) => {
            const k = Math.min(1, (agora - desde) / CONTAGEM);
            el.textContent = String(Math.round(fim * (1 - (1 - k) ** 3)));
            if (k < 1) tempos.push(requestAnimationFrame(passo));
          };
          el.textContent = "0";
          tempos.push(requestAnimationFrame(passo));
        }),
      { threshold: 0.6 },
    );
    document.querySelectorAll("[data-conta]").forEach((n) => numeros.observe(n));
    observadores.push(numeros);

    // A cerâmica sob a mão.
    const iluminar = () => {
      quadro = 0;
      if (!ultimo) return;
      const alvo = (ultimo.target as Element | null)?.closest?.<HTMLElement>("[data-ceramica]") ?? null;
      if (alvo !== peca) soltar();
      if (!alvo) return;
      peca = alvo;
      const r = alvo.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (ultimo.clientX - r.left) / r.width));
      const y = Math.min(1, Math.max(0, (ultimo.clientY - r.top) / r.height));
      alvo.style.setProperty("--luz-x", `${(x * 100).toFixed(1)}%`);
      alvo.style.setProperty("--luz-y", `${(y * 100).toFixed(1)}%`);
      if (fino) {
        alvo.style.setProperty("--giro-x", `${((0.5 - y) * 2 * GIRO).toFixed(2)}deg`);
        alvo.style.setProperty("--giro-y", `${((x - 0.5) * 2 * GIRO).toFixed(2)}deg`);
      }
      alvo.setAttribute("data-sob-a-luz", "");
    };
    ouvir(document, "pointermove", (e) => {
      ultimo = e as PointerEvent;
      if (!quadro) quadro = requestAnimationFrame(iluminar);
    });
    ouvir(document, "pointerdown", (e) => {
      const p = e as PointerEvent;
      if (p.pointerType === "mouse") return;
      ultimo = p;
      iluminar();
      window.clearTimeout(toque);
      toque = window.setTimeout(soltar, 400);
    });
    ouvir(document.documentElement, "pointerleave", soltar);

    function desfazer() {
      ao.forEach(([alvo, tipo, f]) => alvo.removeEventListener(tipo, f));
      cancelAnimationFrame(quadroDaTinta);
      delete raiz.dataset.tinta;
      observadores.forEach((o) => o.disconnect());
      tempos.forEach((t) => cancelAnimationFrame(t));
      cancelAnimationFrame(quadro);
      window.clearTimeout(toque);
      window.clearTimeout(apagar);
      soltar();
      acender(null);
    }
    return () => desfazer();
  }, [caminho]);

  return null;
}

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
 * - as figuras com um momento de entrada ([data-cena]: o termo da inicial e a linha do tempo de cada tratamento) que
 *   nascem abaixo da dobra aguardam ([data-aguarda]) e acendem ([data-acesa]) ao entrar, uma vez (odontologia.css);
 *   as outras cenas não entram em série (lapidacao.md, "Repetição dentro do site", 14.10.2026);
 * - as placas de nome ([data-ceramica]: a da porta, com os três nomes; as da Equipe; a de quem atende): sob o ponteiro
 *   fino, inclinam até 4° e a aresta de luz vai aonde ele está (--giro-x, --giro-y, --luz-x, --luz-y); no toque, sem
 *   inclinação (a identidade, a tabela do celular), a peça cede sob o dedo (data-premida: a compressão de 0,97, que volta
 *   ao soltar; 09-movimento.md, seção 11) e a luz fica no ponto tocado até 400 ms depois de o dedo sair (a luz sozinha,
 *   na cerâmica clara, mal se via: o crítico de fora, 15.10.2026);
 * - os números ([data-conta]) de dois algarismos para cima contam uma vez, ao entrar na tela (hoje, o 30);
 * - a ficha de tratamentos: a linha sob o ponteiro, ou com o foco, acende a região dela na arcada da margem
 *   (.od-ancora-da-ficha, data-regiao); na página de Tratamentos, a linha da lista acende a dela na placa do mapa ao
 *   lado e, ao apagar, a placa volta à região escolhida (antes, o item respondia como vínculo, com o traço do lápis, e
 *   a placa não acendia nada: o crítico de fora, 15.10.2026);
 * - a tinta da pasta: a cena que está embaixo do cabeçalho ([data-tinta]: "escura", "vermelha") vai à raiz, e a pasta
 *   troca de tinta com ela (o cabeçalho que lê a cena; 19-o-padrao-atlas.md, seção 6.1); data-tinta-lida diz ao CSS
 *   que a tinta já foi lida (antes, a pasta nasce com a da primeira cena).
 * Com movimento reduzido: nada aguarda, nada inclina, nada conta; a região acende igual.
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
      peca.removeAttribute("data-premida");
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
    // Daqui em diante, a tinta é a lida; antes da hidratação, o CSS dá à pasta a da primeira cena (odontologia.css).
    raiz.setAttribute("data-tinta-lida", "");
    ouvir(window, "scroll", () => {
      if (!quadroDaTinta) quadroDaTinta = requestAnimationFrame(verTinta);
    });
    ouvir(window, "resize", verTinta);

    // A ficha: a linha acende a região na arcada da margem.
    const ancoraDaFicha = document.querySelector<HTMLElement>(".od-ancora-da-ficha, .od-plano .od-ancora-fixa");
    const linhaDe = (e: Event) => (e.target as Element | null)?.closest?.<HTMLElement>("[data-linha-da-ficha]") ?? null;
    let linhaAtual: HTMLElement | null = null;
    // A região da placa antes da primeira linha acesa (a escolhida no mapa, em Tratamentos), para onde ela volta.
    let regiaoDaPlaca: string | undefined;
    const acender = (linha: HTMLElement | null) => {
      if (linha === linhaAtual) return;
      if (!linhaAtual) regiaoDaPlaca = ancoraDaFicha?.dataset.regiao;
      linhaAtual?.removeAttribute("data-marcada");
      linhaAtual = linha;
      linha?.setAttribute("data-marcada", "");
      if (ancoraDaFicha) {
        const regiao = linha ? linha.dataset.regioes : regiaoDaPlaca;
        if (regiao) ancoraDaFicha.dataset.regiao = regiao;
        else delete ancoraDaFicha.dataset.regiao;
      }
    };
    ouvir(document, "pointerover", (e) => acender(linhaDe(e)));
    // Só o foco do teclado (tabIndex 0 ou mais): o toque numa linha põe o foco no <main> (tabIndex -1), e isso apagava a
    // linha logo ao soltar o dedo, antes dos 400 ms (o crítico de fora, 14.10.2026).
    ouvir(document, "focusin", (e) => (e.target as HTMLElement).tabIndex >= 0 && acender(linhaDe(e)));
    // No toque, a linha acende no ponto tocado e apaga logo depois (o dedo que rola não deixa a linha acesa para trás).
    let apagar = 0;
    const soltarLinha = (e: Event) => {
      if ((e as PointerEvent).pointerType === "mouse") return;
      window.clearTimeout(apagar);
      apagar = window.setTimeout(() => acender(null), 400);
    };
    ouvir(document, "pointerup", soltarLinha);
    ouvir(document, "pointercancel", soltarLinha);

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
          // Contar até um algarismo (o 2, os 3) não mostra o tempo passando; o 30 das manutenções, sim.
          if (!Number.isFinite(fim) || fim < 10) return;
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
      if (ultimo.pointerType !== "mouse") alvo.setAttribute("data-premida", "");
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
    });
    // A luz do toque conta os 400 ms de quando o dedo sai (sob o dedo, ela não se vê), como a linha da ficha.
    const soltarDepois = (e: Event) => {
      if ((e as PointerEvent).pointerType === "mouse" || !peca) return;
      // A peça volta logo (a compressão do toque); a luz fica. O quadro pendente do último movimento do dedo a premeria
      // de novo.
      cancelAnimationFrame(quadro);
      quadro = 0;
      peca.removeAttribute("data-premida");
      window.clearTimeout(toque);
      toque = window.setTimeout(soltar, 400);
    };
    ouvir(document, "pointerup", soltarDepois);
    ouvir(document, "pointercancel", soltarDepois);
    // Só o mouse que sai da página: o dedo que deixa a tela também dispara o pointerleave da raiz, e a luz do toque
    // apagava ao soltar, em vez de durar os 400 ms.
    ouvir(document.documentElement, "pointerleave", (e) => (e as PointerEvent).pointerType === "mouse" && soltar());

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

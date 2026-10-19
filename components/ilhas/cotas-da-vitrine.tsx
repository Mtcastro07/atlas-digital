"use client";

import { useEffect, useRef } from "react";

/**
 * As cotas da vitrine de /para-quem (desde 17/10, a direção final do Atlas Digital, seção 3, item 11): na mesa, cada
 * nota fica ao lado do aparelho, à altura do seu marcador, e o fio de chamada vai do elemento da tela até o número da
 * nota (horizontal, um cotovelo, horizontal). A altura de cada nota depende da letra (e da largura), então a posição se
 * resolve aqui, depois de montar: a nota desce até o marcador dela e, se encostar na de cima, desce mais (12 px de
 * folga); o fio dobra para alcançá-la. Sem laço: refaz quando a largura do demonstrativo muda (a janela, a letra, a
 * troca do celular). Sem as cotas ao lado (abaixo de 30 rem de demonstrativo: o celular, a letra a 200%), a lista fica
 * embaixo do aparelho, numerada como os marcadores; desde 18/10 (o passe do celular), o número de cada nota vai também
 * ao palco, na faixa entre o aparelho e a borda direita dele, à altura do marcador, e o fio liga um ao outro: o
 * marcador da tela vira ponto (data-cotas-no-palco, app/digital.css), e nenhum algarismo fica sobre a tela do site.
 * Desenho, aria-hidden; a ordem das notas no HTML é a dos números.
 */
export function CotasDaVitrine() {
  const ancora = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const secao = ancora.current!.closest("section")!;
    const artigos = [...secao.querySelectorAll<HTMLElement>("[data-cotas]")];
    const svgNS = "http://www.w3.org/2000/svg";

    const resolver = (artigo: HTMLElement) => {
      const lista = artigo.querySelector<HTMLOListElement>("ol")!;
      const fios = artigo.querySelector<SVGSVGElement>("svg[data-fios]")!;
      const notas = [...lista.children] as HTMLElement[];
      notas.forEach((n) => (n.style.transform = ""));
      lista.style.paddingBottom = "";
      fios.replaceChildren();
      const modo = getComputedStyle(lista).getPropertyValue("--cotas").trim();
      artigo.toggleAttribute("data-cotas-no-palco", modo === "2");
      if ((modo !== "1" && modo !== "2") || !artigo.offsetWidth) return;

      const base = artigo.getBoundingClientRect();
      fios.setAttribute("viewBox", `0 0 ${base.width} ${base.height}`);
      const fio = (d: string, i: number) => {
        const caminho = document.createElementNS(svgNS, "path");
        caminho.setAttribute("d", d);
        caminho.dataset.fio = String(i + 1);
        fios.append(caminho);
      };
      const centro = (el: Element) => {
        const r = el.getBoundingClientRect();
        return [r.left + r.width / 2 - base.left, r.top + r.height / 2 - base.top];
      };

      if (modo === "2") {
        // No palco: o número no meio da faixa à direita do aparelho, à altura do marcador, sem encostar no de cima (6 px)
        // e dentro do palco (8 px); o fio sai do ponto, cruza a borda do aparelho e, se o número desceu, dobra fora dela.
        const palco = artigo.querySelector("[data-palco]")!.getBoundingClientRect();
        const aparelho = artigo.querySelector("[data-palco] .vd-celular")!.getBoundingClientRect();
        const x = (aparelho.right + palco.right) / 2 - base.left;
        const joelho = aparelho.right - base.left + 4;
        let fundo = -Infinity;
        artigo.querySelectorAll<HTMLElement>("[data-cota]").forEach((numero, i) => {
          const marcador = artigo.querySelector(`[data-marcador="${i + 1}"]`);
          if (!marcador) return;
          const [mx, my] = centro(marcador);
          const meio = numero.offsetHeight / 2;
          const y = Math.min(Math.max(my, fundo + 6 + meio, palco.top - base.top + 8 + meio), palco.bottom - base.top - 8 - meio);
          fundo = y + meio;
          numero.style.left = `${x.toFixed(1)}px`;
          numero.style.top = `${y.toFixed(1)}px`;
          const borda = (x - meio - 4).toFixed(1);
          fio(Math.abs(y - my) < 0.5 ? `M${mx.toFixed(1)} ${my.toFixed(1)}H${borda}` : `M${mx.toFixed(1)} ${my.toFixed(1)}H${joelho.toFixed(1)}V${y.toFixed(1)}H${borda}`, i);
        });
        return;
      }

      let fundo = -Infinity;
      notas.forEach((nota, i) => {
        const marcador = artigo.querySelector(`[data-marcador="${i + 1}"]`);
        const numero = nota.querySelector("[data-numero]");
        if (!marcador || !numero) return;
        const [mx, my] = centro(marcador);
        const r = numero.getBoundingClientRect();
        const caixa = nota.getBoundingClientRect();
        // O centro do número na altura do marcador, sem encostar na nota de cima.
        const desejado = my - (r.top + r.height / 2 - caixa.top);
        const topo = Math.max(desejado, fundo + 12);
        const desce = topo - (caixa.top - base.top);
        nota.style.transform = `translateY(${desce}px)`;
        fundo = topo + caixa.height;
        const [nx, ny] = [r.left - base.left - 6, r.top + r.height / 2 - base.top + desce];
        const joelho = nx - 14;
        fio(`M${mx.toFixed(1)} ${my.toFixed(1)}H${joelho.toFixed(1)}V${ny.toFixed(1)}H${nx.toFixed(1)}`, i);
      });
      // A nota descida não sai da caixa do artigo: a lista reserva o que ela desceu além do próprio fim (a legenda da
      // vitrine, embaixo, nunca encosta na última nota).
      const alem = fundo - (lista.getBoundingClientRect().bottom - base.top);
      if (alem > 0) lista.style.paddingBottom = `${Math.ceil(alem)}px`;
    };

    let pedido = 0;
    const tudo = () => {
      cancelAnimationFrame(pedido);
      pedido = requestAnimationFrame(() => artigos.forEach(resolver));
    };
    const observador = new ResizeObserver(tudo);
    artigos.forEach((a) => observador.observe(a));
    // A imagem do aparelho e as fontes mudam a altura depois de montar.
    document.fonts.ready.then(tudo);
    secao.addEventListener("load", tudo, true);
    secao.addEventListener("change", tudo);
    return () => {
      cancelAnimationFrame(pedido);
      observador.disconnect();
      secao.removeEventListener("load", tudo, true);
      secao.removeEventListener("change", tudo);
    };
  }, []);

  return <span ref={ancora} hidden />;
}

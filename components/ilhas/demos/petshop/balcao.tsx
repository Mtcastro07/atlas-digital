"use client";

import type { KinesisScope } from "@amineyarman/kinesis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * O balcão vivo do Banho e Tosa São Francisco: o que responde à mão e à chegada, em toda página, refeito a cada troca
 * de página (o layout fica; a página muda). Não desenha nada: lê atributos e escreve atributos e variáveis, e o CSS
 * (petshop.css e a folha de cada página) faz o resto.
 * - A entrada da capa, uma vez por visita: na primeira troca de página, .ja-aberto no <html> (o mesmo sinal que o
 *   <head> de app/layout.tsx põe ao recarregar ou voltar), e a capa não entra de novo.
 * - A revelação de cada cena ([data-bt-revela]): o que está abaixo da dobra ganha data-bt-espera (a pose de antes, que
 *   cada página desenha) e o perde ao entrar na tela, uma vez. O que já está na tela nunca some; sem script e com
 *   movimento reduzido, nada espera. O marca-texto ([data-marcador], Spell UI) abaixo da dobra segue o mesmo caminho
 *   (.dm-a-marcar, de app/demos/demos.css).
 * - A régua de leitura ([data-bt-regua], com as linhas em [data-bt-linha]; só as tabelas de preço de Serviços): a faixa
 *   de acetato vai até a linha sob o ponteiro (desliza) ou tocada (pousa, sem deslizar; uma por vez na página).
 * - O verniz, o relevo e a inclinação ([data-bt-peca]): o Kinesis 2.0.0 (@amineyarman/kinesis, MIT), carregado depois
 *   da primeira pintura, só com ponteiro fino e com @property (sem ele, um navegador antigo faria o giro em cascata).
 *   Um escopo por peça; tudo o que ele faz está declarado no CSS (--k-when, --k-track, --k-tilt).
 */
export function BalcaoVivo() {
  const caminho = usePathname();
  const primeira = useRef(caminho);

  useEffect(() => {
    if (caminho !== primeira.current) document.documentElement.classList.add("ja-aberto");
  }, [caminho]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // A revelação parte quando o alvo passa de 88% da tela.
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          entrada.target.removeAttribute("data-bt-espera");
          entrada.target.classList.remove("dm-a-marcar");
          observador.unobserve(entrada.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    const dobra = window.innerHeight * 0.92;
    document.querySelectorAll("[data-bt-revela], [data-marcador]").forEach((alvo) => {
      if (alvo.getBoundingClientRect().top < dobra) return;
      if (alvo.hasAttribute("data-marcador")) alvo.classList.add("dm-a-marcar");
      else alvo.setAttribute("data-bt-espera", "");
      observador.observe(alvo);
    });
    return () => observador.disconnect();
  }, [caminho]);

  useEffect(() => {
    const fins: (() => void)[] = [];
    for (const regua of document.querySelectorAll<HTMLElement>("[data-bt-regua]")) {
      const sobre = (evento: PointerEvent) => {
        // No toque, só o toque de verdade (o dedo que levanta sem ter rolado): o dedo que começa a rolar a página por cima
        // da tabela não arrasta a régua (o pointerup não chega quando o navegador assume a rolagem).
        if (evento.pointerType === "touch" && evento.type !== "pointerup") return;
        const linha = (evento.target as Element).closest<HTMLElement>("[data-bt-linha]");
        if (!linha || !regua.contains(linha)) return;
        // No toque, a régua não sai quando o dedo levanta: a da tabela anterior sai agora (uma régua por vez na página).
        if (evento.pointerType === "touch") for (const outra of document.querySelectorAll("[data-bt-acetato]")) if (outra !== regua) outra.removeAttribute("data-bt-acetato");
        const caixa = regua.getBoundingClientRect();
        const r = linha.getBoundingClientRect();
        // A primeira linha e o toque: a faixa pousa (aparece no lugar); daí em diante, desliza de linha em linha.
        const modo = evento.pointerType === "touch" || !regua.hasAttribute("data-bt-acetato") ? "pousa" : "desliza";
        // A régua de pé (data-bt-regua="x", a linha do tempo) corre no x; a deitada, no y.
        if (regua.dataset.btRegua === "x") {
          regua.style.setProperty("--bt-acetato-x", `${r.left - caixa.left}px`);
          regua.style.setProperty("--bt-acetato-largura", `${r.width}px`);
        } else {
          regua.style.setProperty("--bt-acetato-y", `${r.top - caixa.top}px`);
          regua.style.setProperty("--bt-acetato-altura", `${r.height}px`);
        }
        regua.setAttribute("data-bt-acetato", modo);
      };
      const sai = (evento: PointerEvent) => {
        if (evento.pointerType !== "touch") regua.removeAttribute("data-bt-acetato");
      };
      regua.addEventListener("pointerover", sobre);
      regua.addEventListener("pointerdown", sobre);
      regua.addEventListener("pointerup", sobre);
      regua.addEventListener("pointerleave", sai);
      fins.push(() => {
        regua.removeEventListener("pointerover", sobre);
        regua.removeEventListener("pointerdown", sobre);
        regua.removeEventListener("pointerup", sobre);
        regua.removeEventListener("pointerleave", sai);
      });
    }
    return () => fins.forEach((fim) => fim());
  }, [caminho]);

  // A peça no toque (o passe do celular; 09-movimento.md, seção 11): sem ponteiro que paire, o dedo que toca a peça (o
  // cartão da capa, o verso, a linha de preço) a faz ceder sob ele, a compressão em volta do ponto tocado (só a que
  // inclina na mesa, e só com o movimento livre: petshop.css), e a luz pega o verniz no ponto tocado (o nome, ou o número
  // da linha tocada), por 400 ms. Só o toque de verdade (pointerup): quem rola não acende nada. Tocar numa ação ou num
  // vínculo de dentro da peça (o carimbo, "A tabela inteira", o telefone, o do mapa, "o valor e a janela") não a faz ceder:
  // a resposta é a do controle (15.10.2026). Sem giroscópio. Escreve variáveis e um atributo; o desenho é do CSS.
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const relogios = new Map<Element, number>();
    const toca = (evento: PointerEvent) => {
      if (evento.pointerType !== "touch" && evento.pointerType !== "pen") return;
      // O toque numa ação ou num vínculo é desse controle (o :active dele), e a peça não cede junto: o botão não anda.
      if ((evento.target as Element).closest("a, button")) return;
      const peca = (evento.target as Element).closest<HTMLElement>("[data-bt-peca]");
      if (!peca) return;
      const caixa = peca.getBoundingClientRect();
      peca.style.setProperty("--bt-toque-x", ((evento.clientX - caixa.left) / caixa.width).toFixed(3));
      peca.style.setProperty("--bt-toque-y", ((evento.clientY - caixa.top) / caixa.height).toFixed(3));
      const acesos: HTMLElement[] = [];
      for (const impresso of peca.querySelectorAll<HTMLElement>(".bt-impresso")) {
        const r = impresso.getBoundingClientRect();
        // O verniz da linha tocada: a do nome (o dedo dentro dele) ou a do preço (o dedo na altura da linha dele).
        const linha = impresso.closest("[data-bt-linha]")?.getBoundingClientRect() ?? r;
        if (evento.clientY < linha.top || evento.clientY > linha.bottom) continue;
        // O dedo fora do número (no porte, à esquerda dele): a luz no meio do número, e não na borda (crítico de fora, 14.10.2026).
        const x = (evento.clientX - r.left) / r.width;
        impresso.style.setProperty("--k-pointer-x", (x < 0 || x > 1 ? 0.5 : x).toFixed(3));
        impresso.style.setProperty("--k-progress", "1");
        acesos.push(impresso);
      }
      peca.setAttribute("data-bt-tocada", "");
      clearTimeout(relogios.get(peca));
      relogios.set(
        peca,
        window.setTimeout(() => {
          peca.removeAttribute("data-bt-tocada");
          for (const impresso of acesos) impresso.style.setProperty("--k-progress", "0");
        }, 400),
      );
    };
    document.addEventListener("pointerup", toca);
    return () => {
      document.removeEventListener("pointerup", toca);
      relogios.forEach((relogio) => clearTimeout(relogio));
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || !("registerProperty" in CSS)) return;
    let vivo = true;
    const escopos: KinesisScope[] = [];
    import("@amineyarman/kinesis").then(({ createKinesis }) => {
      if (!vivo) return;
      for (const peca of document.querySelectorAll("[data-bt-peca]")) escopos.push(createKinesis(peca));
    });
    return () => {
      vivo = false;
      for (const escopo of escopos) escopo.destroy();
    };
  }, [caminho]);

  return null;
}

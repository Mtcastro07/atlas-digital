"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { IconeWhatsApp } from "@/components/icones";
import { mensagens } from "@/conteudo/contato";
import { fundoSob } from "@/lib/fundo-sob";
import { linkWhatsApp } from "@/lib/whatsapp";

/** Intervalo mínimo entre duas leituras do fundo, em ms (como no cabeçalho: a leitura vai a getComputedStyle). */
const INTERVALO = 80;

/**
 * Atalho para o WhatsApp no celular e no tablet (some a partir de 1024 px).
 * Só aparece depois de 60% da primeira tela — a abertura de cada página
 * fica limpa — e, desde 17/10 (passe 4, fechamento com o Impeccable), fica
 * à vista ao rolar para baixo e para cima. Até então, acompanhava o
 * cabeçalho e sumia a cada gesto para baixo: quem lê rolando para baixo, com
 * uma mão, ficava sem nenhuma ação de contato à vista (a persona do
 * celular). No pé da página, ele fica na folga que o rodapé reserva (pb-28),
 * 41 px abaixo do último texto: não cobre texto parado (medido de 320 a 768
 * px, nas sete páginas), e por isso o rodapé não leva a marca.
 * Fica oculto enquanto estiver na tela algo marcado com [data-sem-atalho]:
 * a capa (a mesma ação já está à vista), os dois montadores, o do início
 * e o de /orcamento, com a faixa fixa dele (cobriria as opções e disputaria
 * o "Enviar pelo WhatsApp"), e, desde o segundo fechamento com o Impeccable
 * (17/10), as cenas que já têm o "Falar no WhatsApp" à vista: a condição de
 * fundação (no início e em /planos) e o Fim do início, onde o atalho cobria
 * o vínculo da própria cena (dois WhatsApp na mesma tela, um sobre o outro). Até 16/10, só os ids #inicio e #orcamento: o
 * montador de /orcamento, que desde 16/10 é a figura da abertura, ficou
 * sem nenhum deles, e o atalho aparecia sobre as opções (o diagnóstico do
 * celular, A5). Fica no layout: a cada troca de página, observa as marcas
 * da página nova. Sem script, permanece oculto.
 * Desde 16/10 (passe 3, "Identidade mais profunda"), o bronze fundido
 * (.vd-metal) e a sombra pelo tom do que passa por trás (data-fundo, lido
 * como no cabeçalho: lib/fundo-sob.ts): no papel e na pedra, uma sombra
 * curta e tingida de navy, que cabe na margem; na água, dois aros (um
 * escuro e um creme) e o fio de luz, sem sombra. Na margem do texto (24
 * px), ou 12 px acima da área insegura, e fora dela com o aparelho deitado.
 * Revoga a sombra de 34 px a 55% de preto de 03/10 ("parte da identidade
 * do site"): ela saía cortada pela borda da tela em todas as amostras e
 * sumia no navy, e o próprio aprovador a acusou em 16/10. A entrada e a
 * saída nos tokens do movimento (app/vidro.css, .vd-atalho).
 */
export function AcaoFlutuante() {
  const caminho = usePathname();
  const atalho = useRef<HTMLAnchorElement>(null);
  const [livre, setLivre] = useState(false);
  const [longe, setLonge] = useState(false);

  useEffect(() => {
    const naTela = new Set<Element>();
    const alvos = [...document.querySelectorAll("[data-sem-atalho]")];
    setLivre(alvos.length === 0);
    // A primeira leitura do IntersectionObserver informa também o que está
    // fora da tela, o que cobre a página aberta no meio por âncora.
    const observador = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) naTela.add(e.target);
        else naTela.delete(e.target);
      }
      setLivre(naTela.size === 0);
    });
    alvos.forEach((alvo) => observador.observe(alvo));
    return () => observador.disconnect();
  }, [caminho]);

  useEffect(() => {
    let quadro = 0;
    let lida = 0;
    let pendente = 0;
    // O fundo só se lê com o atalho à vista; no máximo uma leitura a cada INTERVALO ms, e a última posição é sempre lida.
    const lerFundo = () => {
      const a = atalho.current;
      if (!a?.hasAttribute("data-visivel")) return;
      lida = performance.now();
      const fundo = fundoSob(a, a.getBoundingClientRect());
      if (a.dataset.fundo !== fundo) a.dataset.fundo = fundo;
    };
    const agendarLeitura = () => {
      const espera = INTERVALO - (performance.now() - lida);
      window.clearTimeout(pendente);
      if (espera <= 0) lerFundo();
      else pendente = window.setTimeout(lerFundo, espera);
    };
    const ler = () => {
      quadro = 0;
      agendarLeitura();
      setLonge(window.scrollY > window.innerHeight * 0.6);
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(ler);
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    // A página aberta já rolada (a volta pelo histórico, a âncora): a posição se lê sem esperar um gesto.
    aoRolar();
    return () => {
      window.removeEventListener("scroll", aoRolar);
      cancelAnimationFrame(quadro);
      window.clearTimeout(pendente);
    };
  }, []);

  const visivel = livre && longe;
  // Ao ficar visível, o tom de trás antes do primeiro quadro da entrada.
  useLayoutEffect(() => {
    const a = atalho.current;
    if (visivel && a) a.dataset.fundo = fundoSob(a, a.getBoundingClientRect());
  }, [visivel]);

  return (
    <a
      ref={atalho}
      href={linkWhatsApp(mensagens.flutuante)}
      target="_blank"
      rel="noopener"
      aria-hidden={!visivel}
      tabIndex={visivel ? undefined : -1}
      data-visivel={visivel || undefined}
      data-fundo="escuro"
      className="vd-metal vd-atalho fixed right-[max(1.5rem,calc(env(safe-area-inset-right)+0.75rem))] bottom-[max(1.5rem,calc(env(safe-area-inset-bottom)+0.75rem))] z-30 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-5 py-3 text-nota font-semibold text-primary-foreground no-underline lg:hidden"
    >
      <IconeWhatsApp className="size-4.5" />
      WhatsApp
    </a>
  );
}

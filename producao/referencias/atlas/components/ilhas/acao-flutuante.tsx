"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { IconeWhatsApp } from "@/components/icones";
import { mensagens } from "@/conteudo/contato";
import { linkWhatsApp } from "@/lib/whatsapp";

/** Rolagem mínima, em pixels, para contar como mudança de direção. */
const LIMIAR = 8;

/**
 * Atalho para o WhatsApp no celular e no tablet (some a partir de 1024 px).
 * Só aparece depois da primeira tela — a abertura de cada página fica
 * limpa — e acompanha o cabeçalho: some enquanto se rola para baixo (quem
 * lê fica com a tela inteira, sem o atalho sobre o texto) e volta ao rolar
 * para cima, junto com a barra (responde à direção, não à posição).
 * Fica oculto enquanto a capa ou o montador estão na tela: na capa, a
 * mesma ação já está à vista; no montador, cobriria as opções. Fica no
 * layout: a cada troca de página, observa a capa e o montador da página
 * nova. Sem script, permanece oculto. Flutua sobre uma sombra de 34 px a
 * 55% de preto (saiu em 03/10 pela regra 3 das Diretrizes de Design
 * Premium e voltou no mesmo dia, a pedido do usuário: é parte da
 * identidade do site).
 */
export function AcaoFlutuante() {
  const caminho = usePathname();
  const [livre, setLivre] = useState(false);
  const [subindo, setSubindo] = useState(false);
  const [longe, setLonge] = useState(false);

  useEffect(() => {
    const naTela = new Set<Element>();
    const alvos = ["inicio", "orcamento"].map((id) => document.getElementById(id)).filter(Boolean) as Element[];
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
    let ultimo = window.scrollY;
    let quadro = 0;
    const ler = () => {
      quadro = 0;
      const y = window.scrollY;
      setLonge(y > window.innerHeight * 0.6);
      if (Math.abs(y - ultimo) < LIMIAR) return;
      setSubindo(y < ultimo);
      ultimo = y;
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(ler);
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  const visivel = livre && subindo && longe;
  return (
    <a
      href={linkWhatsApp(mensagens.flutuante)}
      target="_blank"
      rel="noopener"
      aria-hidden={!visivel}
      tabIndex={visivel ? undefined : -1}
      data-visivel={visivel || undefined}
      className="invisible fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-30 inline-flex min-h-12 translate-y-3 items-center gap-2 rounded-full bg-primary px-5 py-3 text-nota font-semibold text-primary-foreground no-underline opacity-0 shadow-[0_14px_34px_-10px_rgb(4_14_28/0.55)] transition-[opacity,translate,visibility,background-color] duration-400 ease-atlas hover:bg-primary-hover data-visivel:visible data-visivel:translate-y-0 data-visivel:opacity-100 lg:hidden"
    >
      <IconeWhatsApp className="size-4.5" />
      WhatsApp
    </a>
  );
}

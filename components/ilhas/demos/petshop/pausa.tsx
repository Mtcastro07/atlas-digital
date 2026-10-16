"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

/** O estado mora num lugar só, a classe ambiente-pausado no <html>: as duas pausas (a da tira, na mesa; a do balcão da
 *  capa, no celular) leem e escrevem a mesma classe e nunca se desencontram. */
const assinar = (aviso: () => void) => {
  const observador = new MutationObserver(aviso);
  observador.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observador.disconnect();
};
const lerPausado = () => document.documentElement.classList.contains("ambiente-pausado");

/**
 * A pausa do movimento (WCAG 2.2.2: a luz da porta se move por mais de 5 s). O rótulo acompanha o estado, "Pausar o
 * movimento" / "Retomar o movimento" (identidade, seção 4.3; o Impeccable, fechamento de 16.10.2026: com o rótulo fixo,
 * pausado, lia "Pausar" ao lado do triângulo), e por isso sem aria-pressed (o padrão da WAI-ARIA: o botão que troca o
 * nome não declara o estado, ou seria lido "Retomar o movimento, pressionado"); o desenho troca junto, os dois traços e
 * o triângulo, de canto vivo, desenhados aqui. Pausa tudo o que é ambiente (<html class="ambiente-pausado">). `vigia`: a
 * pausa que observa cada [data-ambiente] (a da tira, que fica em toda página): fora da tela, ele para sozinho
 * (data-fora) e só começa a correr quando entra (data-visivel). A escolha não é gravada: a página não guarda nada no
 * aparelho. Sem script, com movimento reduzido ou numa página sem ambiente, o lugar fica reservado e vazio (petshop.css).
 * `className`: o lugar, quando não é a tira.
 */
export function Pausa({
  rotulo,
  vigia = false,
  className = "",
}: {
  rotulo: { pausar: string; retomar: string };
  vigia?: boolean;
  className?: string;
}) {
  const pausado = useSyncExternalStore(assinar, lerPausado, () => false);
  const caminho = usePathname();

  useEffect(() => {
    if (!vigia) return;
    const observador = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        entrada.target.toggleAttribute("data-fora", !entrada.isIntersecting);
        entrada.target.toggleAttribute("data-visivel", entrada.isIntersecting);
      }
    });
    document.querySelectorAll("[data-ambiente]").forEach((elemento) => observador.observe(elemento));
    return () => observador.disconnect();
  }, [caminho, vigia]);

  return (
    <button type="button" onClick={() => document.documentElement.classList.toggle("ambiente-pausado")} className={`bt-pausa ${className}`}>
      <svg viewBox="0 0 12 12" aria-hidden="true">
        {pausado ? <path d="M2.5 1v10l8-5z" /> : <path d="M2 1h3v10H2zM7 1h3v10H7z" />}
      </svg>
      <span className="bt-pausa-rotulo">{pausado ? rotulo.retomar : rotulo.pausar}</span>
    </button>
  );
}

"use client";
// components/ilhas/ao-topo.tsx — toda página abre no topo (producao/esteira/13-tecnologia-e-estrutura.md, seção 3.7, regra 9):
// na navegação interna, no voltar e avançar do histórico e ao recarregar (a restauração do navegador fica manual). A exceção
// é o endereço com âncora: ali, o destino é a âncora. Antes da pintura, e sem a rolagem suave da folha (o behavior "instant"
// vence o scroll-behavior do html). Não desenha nada.
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export function AoTopo() {
  const caminho = usePathname();
  useLayoutEffect(() => {
    history.scrollRestoration = "manual";
    if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [caminho]);
  return null;
}

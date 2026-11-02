"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * Toda página do Atlas abre no topo (pedido do sócio em 17/10, "sempre que o usuário entre em uma página, ele é levado
 * para o topo dela, tanto no celular quanto no computador", e de novo em 27/10, "sempre que for mudar de uma página, ela
 * começa no topo"): na navegação interna, no voltar e avançar do histórico e ao recarregar (a restauração do navegador
 * fica manual). A exceção é o endereço com âncora (/planos#fundacao, /orcamento#orcamento-profissional): ali, o destino
 * é a âncora (ilhas/ancoras.tsx). Antes da pintura, e sem a rolagem suave da folha (o `behavior: "instant"` vence o
 * scroll-behavior do html). Não desenha nada. Veio do 8cb50ad (descontinuado em 22/10).
 */
export function AoTopo() {
  const caminho = usePathname();
  useLayoutEffect(() => {
    history.scrollRestoration = "manual";
    if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [caminho]);
  return null;
}

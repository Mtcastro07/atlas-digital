"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * Toda página do Atlas abre no topo (17/10, pedido do usuário: "sempre que o usuário entre em uma página, ele é levado
 * para o topo dela, tanto no celular quanto no computador"): na navegação interna, no voltar e avançar do histórico e
 * ao recarregar (a restauração do navegador fica manual). A exceção é o endereço com âncora (/planos#fundacao,
 * /orcamento#orcamento-profissional): ali, o destino é a âncora (ilhas/ancoras.tsx). Antes da pintura, e sem a rolagem
 * suave da folha (o `behavior: "instant"` vence o scroll-behavior do html). Não desenha nada.
 */
export function AoTopo() {
  const caminho = usePathname();
  useLayoutEffect(() => {
    history.scrollRestoration = "manual";
    if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [caminho]);
  return null;
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * O vidro da navegação viva do plano Profissional: o cabeçalho
 * ([data-cabecalho]) vira vidro quando a página sai do topo (data-rolou;
 * app/demos/deposito/deposito.css). A aba da página aberta vem marcada do
 * servidor (aria-current="page"), e o estado da loja, da ilha
 * EstadoDaLoja. No celular, traz a aba aberta para a vista na faixa de
 * abas que desliza de lado ([data-abas-celular]), sem animar. Refaz a
 * leitura a cada troca de página.
 */
export function NavegacaoViva() {
  const caminho = usePathname();

  useEffect(() => {
    const cabecalho = document.querySelector<HTMLElement>("[data-cabecalho]");
    const aoRolar = () => cabecalho?.toggleAttribute("data-rolou", window.scrollY > 24);
    aoRolar();
    const faixa = document.querySelector<HTMLElement>("[data-abas-celular] > div");
    const aberta = faixa?.querySelector<HTMLElement>('[aria-current="page"]');
    if (faixa && aberta && faixa.scrollWidth > faixa.clientWidth) {
      const x = aberta.getBoundingClientRect().left - faixa.getBoundingClientRect().left + faixa.scrollLeft;
      faixa.scrollLeft = x - (faixa.clientWidth - aberta.offsetWidth) / 2;
    }
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, [caminho]);

  return null;
}

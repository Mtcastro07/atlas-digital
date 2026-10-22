"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * O caminho desta visita (desde 17/10, a direção final do Atlas Digital, seção 3, item 7): as páginas que quem visita já
 * abriu, para o pé das portas do início (components/paginas/portas.tsx). Só na memória da navegação do próprio site: o
 * Next troca de página sem recarregar, e este módulo fica vivo entre uma página e outra. Nada vai ao sessionStorage nem
 * ao localStorage (o rodapé diz que nada se grava no aparelho), e tudo some ao recarregar. É a única leitura da visita
 * no site: a régua do percurso da próxima página saiu.
 * `CaminhoDaVisita` anota o endereço de cada página aberta; montado uma vez, em app/(atlas)/layout.tsx. Não desenha nada.
 * O pé de cada porta lê `vistas` e `assinar` em ilhas/pe-da-porta.tsx, um módulo à parte (18/10, o fechamento): no mesmo
 * módulo, a referência do leiaute apontava para o pedaço do início, e as seis internas o baixavam (o Next junta o
 * manifesto do início ao de todas as páginas, porque o grupo (atlas) some do nome; flight-manifest-plugin.js).
 */
export const vistas = new Set<string>();
const ouvintes = new Set<() => void>();

export const assinar = (ouvinte: () => void) => {
  ouvintes.add(ouvinte);
  return () => void ouvintes.delete(ouvinte);
};

export function CaminhoDaVisita() {
  const caminho = usePathname();
  useEffect(() => {
    if (vistas.has(caminho)) return;
    vistas.add(caminho);
    ouvintes.forEach((ouvir) => ouvir());
  }, [caminho]);
  return null;
}


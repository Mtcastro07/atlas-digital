"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { id: string; rotulo: string; caminho: string };

/**
 * O menu do cabeçalho, entre as páginas do site (desde 01/10 cada assunto
 * tem a sua): o item da página aberta fica marcado (aria-current e o traço
 * de bronze, que nos outros só se acende no hover). Desde 03/10, o hover é
 * mínimo (pedido do usuário): o texto clareia e o traço aparece por
 * opacidade, sem letras que rolam nem traço que corre. Fica no cabeçalho, no
 * layout: não remonta na troca de página. A marcação sai certa já do
 * servidor — o caminho de cada página é conhecido na compilação. Entre os
 * itens, 24 px (até 03/10, 26 px, fora da grade de 4 px); o texto, no
 * degrau de interface da escala (text-nota, 14 px).
 */
export function NavegacaoDoAtlas({ itens }: { itens: Item[] }) {
  const caminho = usePathname();
  return (
    <nav aria-label="Páginas do site" className="hidden items-center gap-6 lg:flex">
      {itens.map((item) => (
        <Link
          key={item.id}
          href={item.caminho}
          aria-current={caminho === item.caminho ? "page" : undefined}
          className="relative flex min-h-11 min-w-11 items-center justify-center text-nota font-medium whitespace-nowrap text-foreground/75 no-underline transition-colors duration-300 ease-atlas after:absolute after:inset-x-0 after:bottom-1.5 after:h-px after:bg-accent after:opacity-0 after:transition-opacity after:duration-300 after:ease-atlas hover:text-foreground hover:after:opacity-100 aria-[current=page]:text-foreground aria-[current=page]:after:opacity-100"
        >
          {item.rotulo}
        </Link>
      ))}
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * O vínculo do índice do rodapé, com aria-current na página aberta (desde 16/10, o Impeccable: no celular, abaixo de
 * 1024 px, o índice é a navegação, e nada dizia onde se estava). O rodapé fica no layout e não sabe a página; esta ilha
 * lê o caminho, como a barra. A marca de latão da página aberta fica em barbearia.css (.bb-capitulo-rodape).
 */
export function VinculoDoIndice({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return (
    <Link href={href} aria-current={usePathname() === href ? "page" : undefined} className={className}>
      {children}
    </Link>
  );
}

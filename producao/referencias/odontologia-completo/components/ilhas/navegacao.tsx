"use client";
// components/ilhas/navegacao.tsx — as páginas no cabeçalho, com a aberta marcada (aria-current),
// e o menu do celular. Ilha porque só o navegador sabe o caminho aberto (usePathname).
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuCelular } from "./menu-celular";

type Item = { caminho: string; rotulo: string };

/** "/tratamentos/" → "/tratamentos": o modo estático usa a barra final, os itens não. */
const normalizar = (c: string) => (c.length > 1 ? c.replace(/\/$/, "") : c);

/** "page" na própria página; "true" na mãe de uma página filha (/tratamentos/canal marca Tratamentos). */
const marca = (item: string, atual: string) => (item === atual ? "page" : item !== "/" && atual.startsWith(`${item}/`) ? "true" : undefined);

export function Navegacao({ itens, acao }: { itens: readonly Item[]; acao: React.ReactNode }) {
  const atual = normalizar(usePathname() ?? "/");
  return (
    <>
      <nav aria-label="Páginas do site" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {itens.map((i) => (
            <li key={i.caminho}>
              <Link
                href={i.caminho}
                aria-current={marca(i.caminho, atual)}
                className="inline-flex min-h-11 items-center rounded-full px-4 font-semibold no-underline hover:bg-muted aria-[current]:bg-muted"
              >
                {i.rotulo}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <MenuCelular itens={itens} atual={atual} acao={acao} />
    </>
  );
}

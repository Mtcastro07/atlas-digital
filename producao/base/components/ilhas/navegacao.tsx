"use client";
// components/ilhas/navegacao.tsx — as páginas no cabeçalho, com a aberta marcada (aria-current),
// e o menu do celular. Ilha porque só o navegador sabe o caminho aberto (usePathname).
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuCelular, marca } from "./menu-celular";

type Item = { caminho: string; rotulo: string };

/** "/servicos/" → "/servicos": o modo estático usa a barra final, os itens não. */
const normalizar = (c: string) => (c.length > 1 ? c.replace(/\/$/, "") : c);

export function Navegacao({ itens, acao }: { itens: readonly Item[]; acao: React.ReactNode }) {
  const atual = normalizar(usePathname() ?? "/");
  return (
    <>
      {/* A partir de lg: com seis páginas ou mais (o Profissional, o Completo), a lista não cabe entre 768 e 1023 px. */}
      <nav aria-label="Páginas do site" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {itens.map((i) => (
            <li key={i.caminho}>
              <Link
                href={i.caminho}
                aria-current={marca(i.caminho, atual)}
                className="inline-flex min-h-11 items-center rounded-full px-4 font-semibold whitespace-nowrap no-underline hover:bg-muted aria-[current]:text-accent"
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

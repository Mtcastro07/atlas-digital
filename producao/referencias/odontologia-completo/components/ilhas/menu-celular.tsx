"use client";
// components/ilhas/menu-celular.tsx — o menu do celular (producao/esteira/14-funcionalidades/01-base-de-todo-site.md,
// seção 17). O gatilho é um vínculo para o índice do rodapé: sem script, leva até lá. Com script, abre
// um <dialog> de tela cheia — o nativo prende o foco, fecha com Esc, devolve o foco ao gatilho e deixa
// o resto da página inerte.
import Link from "next/link";
import { useRef } from "react";
import { IconeFechar, IconeMenu } from "../simbolos";

type Item = { caminho: string; rotulo: string };

export function MenuCelular({ itens, atual, acao }: { itens: readonly Item[]; atual: string; acao: React.ReactNode }) {
  const dialogo = useRef<HTMLDialogElement>(null);
  return (
    <>
      <a
        href="#indice"
        onClick={(e) => {
          e.preventDefault();
          dialogo.current?.showModal();
        }}
        className="inline-flex size-11 items-center justify-center rounded-full border border-border hover:bg-muted lg:hidden"
      >
        <IconeMenu className="size-5" />
        <span className="sr-only">Menu</span>
      </a>
      <dialog ref={dialogo} className="menu-celular" aria-label="Menu">
        <div className="envelope mx-auto flex min-h-full max-w-pagina flex-col py-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => dialogo.current?.close()}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-border hover:bg-muted"
            >
              <IconeFechar className="size-5" />
              <span className="sr-only">Fechar o menu</span>
            </button>
          </div>
          <nav aria-label="Páginas do site" className="mt-8">
            <ul className="grid gap-2">
              {itens.map((i) => (
                <li key={i.caminho}>
                  <Link
                    href={i.caminho}
                    aria-current={i.caminho === atual || (i.caminho !== "/" && atual.startsWith(`${i.caminho}/`)) ? "page" : undefined}
                    onClick={() => dialogo.current?.close()}
                    className="flex min-h-12 items-center rounded-marcacao px-3 font-display text-titulo no-underline hover:bg-muted aria-[current]:bg-muted"
                  >
                    {i.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-10 pb-6">{acao}</div>
        </div>
      </dialog>
    </>
  );
}

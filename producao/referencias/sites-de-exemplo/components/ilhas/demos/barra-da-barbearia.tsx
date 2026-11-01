"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ControleDoMovimento } from "@/components/ilhas/controle-do-movimento";
import { TextoRolante } from "@/components/texto-rolante";

type Pagina = { id: string; caminho: string; numero: string; rotulo: string };

/**
 * A barra de navegação da Barbearia Santa Rosa, constante (pedido do
 * usuário, 01/10): fica no layout, presa no topo de todas as páginas, sem
 * recolher ao rolar nem sumir na troca de página — o palco 3D passa por
 * baixo do vidro escuro. A marca leva ao início; os seis capítulos, com o
 * número e as letras que rolam, marcam a página aberta (aria-current e o
 * ponto de latão); à direita, a pausa do movimento e o agendamento — que,
 * na página Agendar, fica em fio (barbearia.css, .bb-botao[aria-current]).
 * Abaixo de 1024 px, os capítulos dão lugar ao índice do rodapé; de 1024
 * a 1279 px, a marca fica só no monograma.
 */
export function BarraDaBarbearia({
  marca,
  nome,
  inicio,
  paginas,
  acao,
  agendar,
}: {
  marca: React.ReactNode;
  nome: string;
  inicio: string;
  paginas: Pagina[];
  acao: string;
  agendar: string;
}) {
  const caminho = usePathname();

  return (
    <header className="bb-barra fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-[78px] w-full max-w-[1380px] items-center justify-between gap-6 px-5 md:px-10 lg:px-14">
        {/* Sob o ponteiro, o nome e as letras do monograma em latão claro (até 03/10, sem hover; de 1024 a 1279 px, só o monograma aparece). */}
        <Link
          href={inicio}
          className="flex min-h-11 flex-none items-center gap-3.5 transition-colors duration-300 hover:text-accent [&_text]:transition-[fill] [&_text]:duration-300 hover:[&_text]:fill-accent"
          aria-current={caminho === inicio ? "page" : undefined}
        >
          {marca}
          {/* Onde o nome não cabe (celular; de 1024 a 1279 px), ele fica só para leitor de tela: o vínculo nunca fica sem nome. */}
          <span className="bb-exibicao sr-only text-[23px] leading-none sm:not-sr-only lg:sr-only xl:not-sr-only">{nome}</span>
        </Link>
        <nav aria-label="Capítulos" className="hidden items-center lg:flex">
          {paginas.map((p) => (
            <Link
              key={p.id}
              href={p.caminho}
              aria-current={caminho === p.caminho ? "page" : undefined}
              className="bb-nav-item inline-flex min-h-12 items-center px-3 text-[12px] font-medium tracking-[0.16em] uppercase transition-colors duration-300 hover:text-accent active:text-accent"
            >
              <span className="flex items-baseline gap-1.5">
                <span className="text-[10px] tracking-[0.1em] text-primary">{p.numero}</span>
                <TextoRolante texto={p.rotulo} />
              </span>
            </Link>
          ))}
        </nav>
        <div className="flex flex-none items-center gap-2">
          <ControleDoMovimento />
          {/* Sob o ponteiro e no toque, em latão claro (até 03/10, sem hover). */}
          <a
            href="#capitulos"
            className="inline-flex min-h-11 items-center px-3 text-[12px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 hover:text-accent active:text-accent lg:hidden"
          >
            Índice
          </a>
          <Link
            href={agendar}
            data-magnetico
            aria-current={caminho === agendar ? "page" : undefined}
            className="bb-botao hidden min-h-11 items-center rounded-full px-5 text-[13.5px] font-medium tracking-[0.04em] whitespace-nowrap transition-[translate,filter] duration-300 hover:brightness-110 sm:inline-flex"
          >
            <TextoRolante texto={acao} />
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

import { ControleDoMovimento } from "@/components/ilhas/controle-do-movimento";
import { TextoRolante } from "@/components/texto-rolante";

type Pagina = { id: string; caminho: string; numero: string; rotulo: string };

/**
 * A barra de navegação da Barbearia Santa Rosa, constante (pedido do
 * usuário, 01/10): fica no layout, presa no topo de todas as páginas, sem
 * recolher ao rolar nem sumir na troca de página — o palco 3D passa por
 * baixo do vidro escuro. A marca leva ao início; os seis capítulos, com o
 * número, marcam a página aberta (aria-current e o ponto de latão); à
 * direita, a pausa do movimento e o agendamento — que, na página Agendar,
 * fica em fio (barbearia.css, .bb-botao[aria-current]).
 * Desde 14/10 (pedido do usuário: o mesmo efeito em série lê como
 * componente repetido), cada papel tem a sua resposta: os capítulos, a da
 * navegação (o ponto de latão nasce sob o item e o número clareia;
 * barbearia.css, .bb-nav-item); o botão, a da ação (as letras que rolam e
 * o latão que clareia, sem o reflexo nem o ímã, que ficam na ação da capa).
 * Abaixo de 1024 px, os capítulos dão lugar ao índice do rodapé; de 1024
 * a 1279 px, a marca fica só no monograma; abaixo de 640 px, o botão diz
 * só "Agendar" (o nome acessível continua "Agendar horário"): a primeira
 * tela do celular não tinha ação.
 * Na primeira troca de página, põe .ja-aberto no <html> (o mesmo sinal que
 * o <head> de app/layout.tsx põe ao recarregar ou voltar): a capa do início
 * entra uma vez por visita.
 * Desde 15/10, o botão cede ao botão de latão do conteúdo (a capa, o Onde):
 * enquanto um deles está na tela, abaixo da barra, o header ganha
 * data-acao-na-tela="sim", e o da barra fica em fio (barbearia.css). O
 * observador é refeito a cada caminho; até a primeira leitura, vale o
 * estado inicial do CSS.
 */
export function BarraDaBarbearia({
  marca,
  nome,
  inicio,
  paginas,
  acao,
  acaoCurta,
  agendar,
}: {
  marca: React.ReactNode;
  nome: string;
  inicio: string;
  paginas: Pagina[];
  acao: string;
  acaoCurta: string;
  agendar: string;
}) {
  const caminho = usePathname();
  const primeira = useRef(caminho);
  const barra = useRef<HTMLElement>(null);
  const atual = paginas.find((p) => p.caminho === caminho);

  useEffect(() => {
    if (caminho !== primeira.current) document.documentElement.classList.add("ja-aberto");
  }, [caminho]);

  // Na página nova, volta ao estado inicial do CSS antes da pintura; depois, o observador decide.
  useLayoutEffect(() => {
    const header = barra.current;
    if (!header) return;
    delete header.dataset.acaoNaTela;
    const botoes = document.querySelectorAll("main .bb-botao:not(.bb-botao-barra)");
    if (!botoes.length) return;
    const naTela = new Set<Element>();
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) e.isIntersecting ? naTela.add(e.target) : naTela.delete(e.target);
        header.dataset.acaoNaTela = naTela.size ? "sim" : "nao";
      },
      { rootMargin: "-78px 0px 0px 0px" },
    );
    botoes.forEach((b) => observador.observe(b));
    return () => observador.disconnect();
  }, [caminho]);

  return (
    <header ref={barra} className="bb-barra fixed inset-x-0 top-0 z-50">
      {/* Abaixo de 640 px, 12 px entre os grupos, e não 24 (desde 16/10: a 320 px, o monograma e os controles já passavam
          de 280 px, e o nome do capítulo não cabia). */}
      <div className="mx-auto flex h-[78px] w-full max-w-[1380px] items-center justify-between gap-3 px-5 sm:gap-6 md:px-10 lg:px-14">
        {/* Sob o ponteiro, o nome e as letras do monograma em latão claro (até 03/10, sem hover; de 1024 a 1279 px, só o monograma aparece). */}
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
          <Link
            href={inicio}
            className="flex min-h-11 flex-none items-center gap-3.5 transition-colors duration-300 hover:text-accent [&_text]:transition-[fill] [&_text]:duration-300 hover:[&_text]:fill-accent"
            aria-current={caminho === inicio ? "page" : undefined}
          >
            {marca}
            {/* Onde o nome não cabe (celular; de 1024 a 1279 px; desde 16/10, abaixo de 1280 px nos capítulos, onde o
                nome do capítulo toma o lugar), ele fica só para leitor de tela: o vínculo nunca fica sem nome. */}
            <span className={`bb-exibicao sr-only text-[23px] leading-none xl:not-sr-only ${atual ? "" : "sm:not-sr-only lg:sr-only"}`}>{nome}</span>
          </Link>
          {/* O capítulo aberto, ao lado do monograma, abaixo de 1024 px (desde 16/10, o Impeccable: no celular, a barra não
              dizia onde se estava; a navegação dos capítulos fica no índice do rodapé). Abaixo de 375 px não cabe ao lado
              da pausa, do índice e do botão, e sai; lá, o título da página, logo abaixo, diz o capítulo. */}
          {atual && <span className="bb-exibicao min-w-0 truncate text-[18px] leading-none text-accent max-[375px]:hidden sm:text-[21px] lg:hidden">{atual.rotulo}</span>}
        </div>
        {/* Cada item numa linha só (correção de 14/10: a 1024 px, "02 A casa" quebrava em duas); de 1024 a 1279 px, 10 px de recuo. */}
        <nav aria-label="Capítulos" className="hidden items-center lg:flex">
          {paginas.map((p) => (
            <Link
              key={p.id}
              href={p.caminho}
              aria-current={caminho === p.caminho ? "page" : undefined}
              className="bb-nav-item inline-flex min-h-12 items-center px-2.5 text-[12px] font-medium tracking-[0.16em] whitespace-nowrap uppercase xl:px-3"
            >
              <span className="flex items-baseline gap-1.5">
                {/* 11 px desde 16/10 (o Impeccable acusava o texto funcional de 10 px, abaixo do piso de 11). */}
                <span className="bb-nav-numero text-[11px] tracking-[0.1em] text-primary">{p.numero}</span>
                {p.rotulo}
              </span>
            </Link>
          ))}
        </nav>
        <div className="flex flex-none items-center gap-2">
          <ControleDoMovimento />
          {/* Sob o ponteiro e no toque, em latão claro (até 03/10, sem hover). No início, leva à cena dos capítulos: lá, o
              índice do rodapé não aparece, porque seria a mesma lista logo depois dela (correção de 14/10). */}
          <a
            href={caminho === inicio ? "#capitulos-da-casa" : "#capitulos"}
            className="inline-flex min-h-11 items-center px-2 text-[12px] sm:px-3 font-medium tracking-[0.2em] uppercase transition-colors duration-300 hover:text-accent active:text-accent lg:hidden"
          >
            Índice
          </a>
          <Link
            href={agendar}
            aria-label={acao}
            aria-current={caminho === agendar ? "page" : undefined}
            className="bb-botao bb-botao-barra inline-flex min-h-11 items-center rounded-full px-4 text-[13.5px] font-medium tracking-[0.04em] whitespace-nowrap transition-[filter] duration-300 hover:brightness-110 sm:px-5"
          >
            <span className="sm:hidden">{acaoCurta}</span>
            <span className="max-sm:hidden">
              <TextoRolante texto={acao} />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

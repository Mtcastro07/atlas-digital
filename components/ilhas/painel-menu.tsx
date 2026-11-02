"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { IconeWhatsApp } from "@/components/icones";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { menu, pausa } from "@/conteudo/paginas/comuns";
import { acaoOrcamento, falarNoWhatsApp } from "@/conteudo/site";
import { linkWhatsApp } from "@/lib/whatsapp";

type Props = {
  aberto: boolean;
  aoMudar: (aberto: boolean) => void;
  itens: { id: string; rotulo: string; caminho: string }[];
  /** O logotipo, desenhado no servidor (components/secoes/cabecalho.tsx). */
  marca?: React.ReactNode;
};

/** A ordem de entrada de cada peça (app/comuns.css, .cm-entra: 40 ms + i × 30 ms). */
const ordem = (i: number) => ({ "--i": i }) as React.CSSProperties;

/** O botão de pausa do cabeçalho (ilhas/controle-do-movimento.tsx): a pausa de verdade, que a linha do painel aciona. */
const botaoDaPausa = () => document.querySelector<HTMLButtonElement>("[data-pausa-do-ambiente]");

/**
 * Marca a lista que continua abaixo do pé (data-rola: o esmaecimento embaixo), ao abrir, ao rolar e ao redimensionar.
 * Com a barra de rolagem escondida abaixo de 1024 px, nada dizia que "Dúvidas" estava cortada (16/10, passe 3; C2).
 */
function vigiarRolagem(lista: HTMLElement | null) {
  if (!lista) return;
  const medir = () => lista.toggleAttribute("data-rola", lista.scrollTop + lista.clientHeight < lista.scrollHeight - 1);
  medir();
  lista.addEventListener("scroll", medir, { passive: true });
  window.addEventListener("resize", medir);
  return () => {
    lista.removeEventListener("scroll", medir);
    window.removeEventListener("resize", medir);
  };
}

/**
 * Menu do celular: a água desce do topo e cobre a tela inteira, com a
 * marca no alto e as sete páginas, cada uma numa linha; a da página
 * aberta, em bronze e com "página atual" escrito (a cor não diz o estado
 * sozinha). Carregado sob demanda por MenuCelular. Desde 28/10 (R10,
 * esboco/comuns/ESBOCO.md, 1.4):
 * - "Fechar" escrito, no lugar exato do "Menu" da pílula (até então, o
 *   "×" sem palavra);
 * - os nomes a 28 px (24 em tela baixa; até então, 24 sempre), com a luz
 *   do sistema no ponteiro e no toque (.vd-acende, app/vidro.css);
 * - no pé, em todas as larguras, a pausa escrita ("Pausar animações",
 *   16 px, sem ícone, como a do cabeçalho), "Montar orçamento" e "Falar no
 *   WhatsApp", a 17 px (o número fica no rodapé: a 17 px, não cabia a
 *   320 px);
 * - o painel opaco, sem o vidro desfocado de uma camada da tela inteira:
 *   a água com o grão (.vd-materia), que já cobria tudo;
 * - abre e fecha só por opacidade e translate (desce 16 px, 300 ms); as
 *   linhas sobem 12 px e acendem, de 30 em 30 ms, em 560 ms (app/comuns.css).
 * O foco preso, o <main> inerte e o Esc, como antes.
 */
export default function PainelMenu({ aberto, aoMudar, itens, marca }: Props) {
  const fechar = () => aoMudar(false);
  const caminho = usePathname();
  const paginas = [{ id: "inicio", rotulo: "Início", caminho: "/" }, ...itens];
  // O painel só monta no navegador, depois do primeiro toque no gatilho: o botão do cabeçalho já existe.
  const [botao] = useState(botaoDaPausa);
  const [pausado, setPausado] = useState(() => document.documentElement.classList.contains("ambiente-pausado"));

  // O painel não desmonta ao fechar, e a pausa do cabeçalho pode ter mudado nesse meio-tempo.
  useEffect(() => {
    if (aberto) setPausado(document.documentElement.classList.contains("ambiente-pausado"));
  }, [aberto]);

  // Com o menu aberto, o <main> sai da árvore de acessibilidade e do foco (16/10, Impeccable). O Base UI esconde os
  // irmãos do painel com aria-hidden, mas poupa o <main> por causa das regiões aria-live dele (a nota da escada, o
  // montador), que ficavam lidas por trás do menu.
  useEffect(() => {
    const main = document.querySelector("main");
    if (!aberto || !main) return;
    main.inert = true;
    return () => {
      main.inert = false;
    };
  }, [aberto]);

  return (
    <Sheet open={aberto} onOpenChange={aoMudar}>
      <SheetContent
        side="top"
        showCloseButton={false}
        data-tom="escuro"
        className="cm-painel vd-materia gap-0 border-0 px-0 data-[side=top]:border-b-0 pt-[env(safe-area-inset-top)] pb-[max(1.5rem,env(safe-area-inset-bottom))] duration-300 ease-atlas data-[side=top]:h-dvh"
      >
        {/* A marca e o "Fechar" nas caixas da marca e do "Menu" da pílula: 72 px de altura; a marca a 29 px da borda (41 a
            partir de 768 px) e o "Fechar" com a borda direita a 16 px (28), com a área segura dos lados. */}
        <div className="flex h-18 flex-none items-center justify-between pr-[calc(max(1.5rem,env(safe-area-inset-left),env(safe-area-inset-right))-0.5rem)] pl-[calc(max(1.5rem,env(safe-area-inset-left),env(safe-area-inset-right))+5px)] md:pr-[calc(max(2.5rem,env(safe-area-inset-left),env(safe-area-inset-right))-0.75rem)] md:pl-[calc(max(2.5rem,env(safe-area-inset-left),env(safe-area-inset-right))+1px)]">
          <span aria-hidden="true" className="inline-flex">
            {marca}
          </span>
          <SheetClose className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-3 text-base font-semibold text-foreground transition-colors duration-300 hover:bg-foreground/10">
            {/* Com a letra a 200% (a tela de 390 px vira 195 px), a palavra fica para o leitor de tela, como a do "Menu". */}
            <span className="max-[299.98px]:sr-only">{menu.fechar}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" className="size-5">
              <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
            </svg>
          </SheetClose>
        </div>
        <SheetTitle className="sr-only">{menu.abrir}</SheetTitle>
        <nav ref={vigiarRolagem} aria-label={menu.abrir} className="cm-painel-lista data-rola:[mask-image:linear-gradient(180deg,#000_calc(100%-32px),transparent)]">
          <ul className="border-t border-border">
            {paginas.map((item, i) => {
              const atual = caminho === item.caminho;
              return (
                <li key={item.id} className="cm-entra border-b border-border" style={ordem(i)}>
                  <Link
                    href={item.caminho}
                    // O início não é pré-buscado: a pré-busca traria as imagens da capa.
                    prefetch={item.caminho === "/" ? false : undefined}
                    onClick={fechar}
                    aria-current={atual ? "page" : undefined}
                    className="cm-linha vd-acende"
                  >
                    <span className="cm-linha-nome vd-acende-nome">{item.rotulo}</span>
                    {atual && <span className="cm-linha-aqui">{menu.paginaAtual}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="cm-entra cm-painel-pe" style={ordem(paginas.length)}>
          {/* A pausa aciona o botão do cabeçalho (escondido abaixo de 360 px): o estado continua num lugar só. Com
              movimento reduzido não há ambiente, e ela não aparece. */}
          {botao && (
            <button
              type="button"
              onClick={() => {
                setPausado((p) => !p);
                botao.click();
              }}
              className="-ml-2 inline-flex min-h-11 cursor-pointer items-center self-start px-2 text-left text-base font-normal text-foreground/75 transition-colors duration-300 hover:text-foreground motion-reduce:hidden"
            >
              {pausado ? pausa.retomar : pausa.pausar} {pausa.complemento}
            </button>
          )}
          <Link href={acaoOrcamento.destino} onClick={fechar} className={buttonVariants({ className: "w-full" })}>
            {acaoOrcamento.rotulo}
          </Link>
          <a href={linkWhatsApp()} target="_blank" rel="noopener" className={buttonVariants({ variant: "outline", className: "w-full" })}>
            <IconeWhatsApp className="size-4.5" />
            {falarNoWhatsApp}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}

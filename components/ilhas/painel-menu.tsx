"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { IconeWhatsApp } from "@/components/icones";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { contato } from "@/conteudo/contato";
import { acaoOrcamento } from "@/conteudo/site";
import { linkWhatsApp } from "@/lib/whatsapp";

type Props = {
  aberto: boolean;
  aoMudar: (aberto: boolean) => void;
  itens: { id: string; rotulo: string; caminho: string }[];
  /** O logotipo, desenhado no servidor (components/secoes/cabecalho.tsx). */
  marca?: React.ReactNode;
};

// A entrada das linhas é resposta a um toque, não abertura de página: 560 ms, e não os 1.100 ms do mov-entra, num
// escalonamento de 30 ms; a última ação assenta em ~0,8 s (até 14/10, em ~1,5 s; 09-movimento.md, seção 11, item 2).
const atraso = (ms: number) => ({ "--atraso": `${ms}ms`, animationDuration: "560ms" }) as React.CSSProperties;

/** O botão de pausa do cabeçalho (ilhas/controle-do-movimento.tsx): a pausa de verdade, que a linha do painel aciona. */
const botaoDaPausa = () => document.querySelector<HTMLButtonElement>("header button[aria-pressed]");

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
 * Menu do celular: o vidro escuro desce do topo e cobre a tela inteira,
 * com a marca no alto e as sete páginas, cada uma numa linha; a da página
 * aberta, em bronze. Até 16/10, numeradas de 00 a 06, como as portas e o
 * pé das páginas: a numeração em série, em páginas que não são sequência
 * (as marcas L5 e T2; o crítico de fora). As linhas entram em sequência ao abrir. No pé, a ação
 * do orçamento e o WhatsApp. Carregado sob demanda por MenuCelular.
 * Na escala (regra 1): o nome no degrau dos números (24 px no celular; até
 * 03/10, 25,6 px). Onde há ponteiro, o nome
 * se acende em bronze no hover, como o da página aberta (até 03/10, não
 * respondia). A rolagem da lista tem 8 px de folga em cima e embaixo: o
 * anel de foco da primeira e da última linha não é cortado por ela.
 */
export default function PainelMenu({ aberto, aoMudar, itens, marca }: Props) {
  const fechar = () => aoMudar(false);
  const caminho = usePathname();
  const paginas = [{ id: "inicio", rotulo: "Início", caminho: "/" }, ...itens];
  // A pausa no painel, abaixo de 360 px. O painel só monta no navegador, depois do primeiro toque no gatilho.
  const [pausa] = useState(() => {
    const botao = botaoDaPausa();
    return botao && !botao.disabled ? botao : null;
  });
  const [pausado, setPausado] = useState(() => pausa?.getAttribute("aria-pressed") === "true");

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
        data-tom="escuro"
        className="vd-vidro vd-materia gap-0 border-x-0 border-t-0 px-0 pt-[env(safe-area-inset-top)] pb-[max(1.5rem,env(safe-area-inset-bottom))] duration-300 ease-atlas data-[side=top]:h-dvh"
      >
        {/* A marca na mesma caixa da marca da pílula (16/10, passe 3): 72 px de altura, a 29 px da borda (41 a partir de
            768 px), com a área segura. Até então, a 24 px e 2 px mais baixa: o logotipo saltava ao abrir (C3). */}
        <div
          className="flex h-18 flex-none items-center pl-[calc(max(1.5rem,env(safe-area-inset-left),env(safe-area-inset-right))+5px)] md:pl-[calc(max(2.5rem,env(safe-area-inset-left),env(safe-area-inset-right))+1px)]"
          aria-hidden="true"
        >
          {marca}
        </div>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        {/* Em telas baixas (700 px ou menos), linhas de 48 px e os vãos menores: a 320 × 640, as sete cabem sem rolar, com a linha da pausa (C2; a direção pedia 52 px, mas a pausa, abaixo de 360 px, ocupa outros 52). */}
        <nav
          ref={vigiarRolagem}
          aria-label="Menu"
          className="mt-4 flex-1 overflow-y-auto px-6 py-2 [@media(max-height:700px)]:mt-0 data-rola:[mask-image:linear-gradient(180deg,#000_calc(100%-32px),transparent)]"
        >
          <ul className="border-t border-border">
            {paginas.map((item, i) => (
              <li key={item.id} className="mov-entra border-b border-border" style={atraso(40 + i * 30)}>
                <Link
                  href={item.caminho}
                  // O início não é pré-buscado: a pré-busca traria as imagens da capa.
                  prefetch={item.caminho === "/" ? false : undefined}
                  onClick={fechar}
                  aria-current={caminho === item.caminho ? "page" : undefined}
                  className="group flex min-h-15 items-baseline gap-4 py-3 no-underline [@media(max-height:700px)]:min-h-12 [@media(max-height:700px)]:py-1.5"
                >
                  <span className="text-numero font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent group-aria-[current=page]:text-accent">
                    {item.rotulo}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Abaixo de 360 px, a pausa mora aqui, com o rótulo que ela já tem (16/10, passe 3; C5). Aciona o botão do
            cabeçalho, escondido nessa largura: o estado continua num lugar só. Com movimento reduzido, não aparece. */}
        {pausa && (
          <button
            type="button"
            aria-pressed={pausado}
            onClick={() => {
              pausa.click();
              setPausado(pausa.getAttribute("aria-pressed") !== "true");
            }}
            className="mov-entra mx-6 mt-2 inline-flex [@media(max-height:700px)]:mt-0 min-h-11 cursor-pointer items-center gap-3 self-start rounded-full text-nota font-semibold text-muted-foreground transition-colors duration-300 hover:text-foreground min-[360px]:hidden"
            style={atraso(40 + paginas.length * 30)}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5 fill-current">
              {pausado ? (
                <path d="M4.5 2.8v10.4a.6.6 0 0 0 .92.5l8.1-5.2a.6.6 0 0 0 0-1L5.42 2.3a.6.6 0 0 0-.92.5Z" />
              ) : (
                <>
                  <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
                  <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
                </>
              )}
            </svg>
            Pausar animações
          </button>
        )}
        {/* As duas ações no tamanho comum (text-nota): no grande (text-corpo,
            03/10), "WhatsApp (21) 96801-4926" passava da largura a 320 px. */}
        <div className="mov-entra grid gap-2 px-6 pt-6 [@media(max-height:700px)]:pt-4" style={atraso(40 + paginas.length * 30)}>
          <Link href={acaoOrcamento.destino} onClick={fechar} className={buttonVariants({ className: "w-full" })}>
            {acaoOrcamento.rotulo}
          </Link>
          <a href={linkWhatsApp()} target="_blank" rel="noopener" className={buttonVariants({ variant: "outline", className: "w-full" })}>
            <IconeWhatsApp className="size-4.5" />
            WhatsApp {contato.telefone}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}

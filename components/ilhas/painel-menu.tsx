"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

const atraso = (ms: number) => ({ "--atraso": `${ms}ms` }) as React.CSSProperties;

/**
 * Menu do celular: o vidro escuro desce do topo e cobre a tela inteira,
 * com a marca no alto e as sete páginas numeradas como no resto do site
 * (00, o início; 01 a 06, as portas), cada uma numa linha; a da página
 * aberta, em bronze. As linhas entram em sequência ao abrir. No pé, a ação
 * do orçamento e o WhatsApp. Carregado sob demanda por MenuCelular.
 * Na escala (regra 1): o número no rótulo (12 px) e o nome no degrau dos
 * números (24 px no celular; até 03/10, 25,6 px). Onde há ponteiro, o nome
 * se acende em bronze no hover, como o da página aberta (até 03/10, não
 * respondia). A rolagem da lista tem 8 px de folga em cima e embaixo: o
 * anel de foco da primeira e da última linha não é cortado por ela.
 */
export default function PainelMenu({ aberto, aoMudar, itens, marca }: Props) {
  const fechar = () => aoMudar(false);
  const caminho = usePathname();
  const paginas = [{ id: "inicio", rotulo: "Início", caminho: "/" }, ...itens];

  return (
    <Sheet open={aberto} onOpenChange={aoMudar}>
      <SheetContent
        side="top"
        data-tom="escuro"
        className="vd-vidro gap-0 border-x-0 border-t-0 px-0 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] duration-[450ms] ease-atlas data-[side=top]:h-dvh"
      >
        <div className="flex min-h-15 items-center px-6" aria-hidden="true">
          {marca}
        </div>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <nav aria-label="Menu" className="mt-4 flex-1 overflow-y-auto px-6 py-2">
          <ul className="border-t border-border">
            {paginas.map((item, i) => (
              <li key={item.id} className="mov-entra border-b border-border" style={atraso(70 + i * 45)}>
                <Link
                  href={item.caminho}
                  // O início não é pré-buscado: a pré-busca traria as imagens da capa.
                  prefetch={item.caminho === "/" ? false : undefined}
                  onClick={fechar}
                  aria-current={caminho === item.caminho ? "page" : undefined}
                  className="group flex min-h-15 items-baseline gap-4 py-3 no-underline"
                >
                  <span className="w-6 flex-none text-rotulo font-semibold text-accent tabular-nums">{String(i).padStart(2, "0")}</span>
                  <span className="text-numero font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent group-aria-[current=page]:text-accent">
                    {item.rotulo}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* As duas ações no tamanho comum (text-nota): no grande (text-corpo,
            03/10), "WhatsApp (21) 96801-4926" passava da largura a 320 px. */}
        <div className="mov-entra grid gap-2 px-6 pt-6" style={atraso(70 + paginas.length * 45)}>
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

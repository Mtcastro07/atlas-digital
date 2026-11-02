// components/cabecalho.tsx — a marca, as páginas e a ação (producao/esteira/14-funcionalidades/01-base-de-todo-site.md,
// seção 17). O registro do conselho aparece também no celular (seção 7).
import Link from "next/link";
import { negocio } from "@/conteudo/negocio";
import { paginasDoMenu } from "@/conteudo/site";
import { AcaoWhatsApp } from "./acao-whatsapp";
import { Navegacao } from "./ilhas/navegacao";

export function Cabecalho() {
  const itens = paginasDoMenu.map((p) => ({ caminho: p.caminho, rotulo: p.rotulo }));
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95">
      <div className="mx-auto flex min-h-16 max-w-pagina items-center justify-between gap-4 envelope">
        <Link href="/" className="flex min-h-11 flex-col justify-center no-underline">
          <span className="font-display text-destaque font-semibold leading-none">{negocio.nome}</span>{" "}
          {negocio.registro && <span className="mt-1 text-rotulo text-muted-foreground">{negocio.registro}</span>}
        </Link>
        <div className="flex items-center gap-2">
          <Navegacao itens={itens} acao={<AcaoWhatsApp className="w-full justify-center" />} />
          {/* O display fica no invólucro: "hidden" e o "inline-flex" da ação, na mesma classe, disputariam a mesma propriedade. */}
          <div className="hidden xl:block">
            <AcaoWhatsApp />
          </div>
        </div>
      </div>
    </header>
  );
}

// components/acao-whatsapp.tsx — a ação principal: a conversa no WhatsApp com a mensagem pronta
// (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 1). Componente de servidor.
import { negocio } from "@/conteudo/negocio";
import { acao } from "@/conteudo/site";
import { vinculoDoWhatsapp } from "@/lib/whatsapp";
import { IconeWhatsApp } from "./simbolos";

export function AcaoWhatsApp({ rotulo = acao.rotulo, mensagem = acao.mensagem, discreta = false, className = "" }: { rotulo?: string; mensagem?: string; discreta?: boolean; className?: string }) {
  const visual = discreta
    ? "border border-border bg-card text-foreground hover:bg-muted"
    : "bg-primary text-primary-foreground hover:brightness-110";
  return (
    <a
      href={vinculoDoWhatsapp(negocio.whatsapp, mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center gap-2.5 rounded-full px-6 font-semibold whitespace-nowrap no-underline transition-[filter,background-color] duration-200 ${visual} ${className}`}
    >
      <IconeWhatsApp className="size-5 shrink-0" />
      {rotulo}
      <span className="sr-only">, abre em nova aba</span>
    </a>
  );
}

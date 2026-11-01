// app/not-found.tsx — a 404 da marca (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 14).
// Componente de servidor; sem robots (o Next já põe noindex na 404). Vínculos absolutos do próprio site.
import Link from "next/link";
import { AcaoWhatsApp } from "@/components/acao-whatsapp";
import { negocio } from "@/conteudo/negocio";
import { naoEncontrada } from "@/conteudo/site";

export const metadata = { title: `Página não encontrada · ${negocio.nome}` };

export default function NaoEncontrada() {
  return (
    <main id="conteudo" tabIndex={-1} className="envelope mx-auto max-w-pagina pt-20 pb-10 outline-none">
      <h1 className="max-w-[16ch] text-display font-semibold">{naoEncontrada.titulo}</h1>
      <p className="mt-6 max-w-[48ch] text-destaque text-muted-foreground">{naoEncontrada.lide}</p>
      <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <AcaoWhatsApp discreta />
        <Link href="/" className="inline-flex min-h-11 items-center text-accent">
          Voltar ao início
        </Link>
      </p>
    </main>
  );
}

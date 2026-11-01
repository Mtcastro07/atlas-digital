// app/global-error.tsx — erro no próprio layout raiz: o documento inteiro é trocado por este.
// Define o próprio <html>, o CSS e as fontes (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 14).
"use client";
import "./globals.css";
import { texto, titulo } from "./fontes";

export default function ErroGlobal({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="pt-BR" className={`${texto.variable} ${titulo.variable}`}>
      <body className="grid min-h-svh items-center bg-background text-center text-foreground">
        <title>O site não abriu</title>
        <main className="envelope mx-auto w-full max-w-pagina py-16">
          <h1 className="mx-auto max-w-[14ch] text-display font-semibold">O site não abriu.</h1>
          <p className="mx-auto mt-6 max-w-[44ch] text-destaque text-muted-foreground">Um erro interrompeu o carregamento.</p>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            <button type="button" onClick={() => retry()} className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-[filter] duration-200 hover:brightness-110">
              Tentar de novo
            </button>
            <a href="/" className="inline-flex min-h-11 items-center text-accent hover:underline">
              Voltar ao início
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}

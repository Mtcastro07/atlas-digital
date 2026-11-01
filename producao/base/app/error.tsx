// app/error.tsx — erro numa página, em português (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 14).
// Parte do script de toda página: só classes, sem nada de conteudo/.
"use client";

// retry (Next 16.3): pede de novo ao servidor e redesenha; o reset só redesenharia o que já deu erro.
export default function ErroNaPagina({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main id="conteudo" tabIndex={-1} className="grid min-h-svh items-center text-center outline-none">
      <div className="envelope mx-auto w-full max-w-pagina py-16">
        <h1 className="mx-auto max-w-[14ch] text-display font-semibold">Esta página não abriu.</h1>
        <p className="mx-auto mt-6 max-w-[44ch] text-destaque text-muted-foreground">Um erro interrompeu a página. O restante do site continua no lugar.</p>
        <p className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <button type="button" onClick={() => retry()} className="inline-flex min-h-12 cursor-pointer items-center rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-[filter] duration-200 hover:brightness-110">
            Tentar de novo
          </button>
          <a href="/" className="inline-flex min-h-11 items-center text-accent hover:underline">
            Voltar ao início
          </a>
        </p>
      </div>
    </main>
  );
}

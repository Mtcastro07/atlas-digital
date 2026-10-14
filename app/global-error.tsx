"use client";

import "./globals.css";

/**
 * Erro no próprio layout raiz: o Next troca o documento inteiro por esta
 * página. Ela traz o CSS do site (os tokens do tom escuro) e declara o
 * português — a página padrão do Next saía sem `lang` e em inglês (achado da
 * pesquisa de testes, 07/10). Sem a fonte hospedada, que vem do layout: fica
 * a do sistema (a reserva de --font-texto em app/globals.css; sem ela, a
 * família inteira era inválida e o texto saía na serifa padrão do navegador).
 * "Tentar de novo" chama o `retry` do Next 16.3, como em app/error.tsx.
 */
export default function ErroGlobal({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="pt-BR">
      <body data-tom="escuro" className="grid min-h-svh items-center bg-background text-center text-foreground">
        <main className="mx-auto w-full max-w-pagina px-6 py-16 md:px-10">
          <h1 className="mx-auto max-w-[14ch] text-display">O site não abriu.</h1>
          <p className="mx-auto mt-6 max-w-[44ch] text-destaque text-muted-foreground">Um erro interrompeu o carregamento.</p>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            <button
              type="button"
              onClick={() => retry()}
              className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-[filter] duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Tentar de novo
            </button>
            <a href="/" className="inline-flex min-h-11 items-center text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              Voltar ao início
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}

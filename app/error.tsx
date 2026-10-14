"use client";

/**
 * Erro numa página: em vez da tela padrão do Next, em inglês ("Application
 * error"), a mesma composição da 404, em português, com a saída de tentar de
 * novo. Até 07/10 não havia esta página: em 03/10, uma âncora malformada
 * trocava a página inteira pela tela padrão. Componente de cliente (o Next
 * exige) e parte do script de toda página: por isso só classes — sem `cn`,
 * sem `buttonVariants` (o `cva` custava ~1 KB a mais) e sem nada de `conteudo/`.
 * "Tentar de novo" chama o `retry` do Next 16.3 (estável desde a 16.3.0), que
 * pede de novo ao servidor e redesenha; o `reset` só redesenharia o que já deu
 * erro (node_modules/next/dist/docs, file-conventions/error.md).
 */
export default function ErroNaPagina({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main id="conteudo" tabIndex={-1} data-tom="escuro" className="grid min-h-svh items-center text-center">
      <div className="mx-auto w-full max-w-pagina px-6 py-16 md:px-10">
        <p className="text-rotulo font-semibold text-accent">Erro</p>
        <h1 className="mx-auto mt-3 max-w-[14ch] text-display">Esta página não abriu.</h1>
        <p className="mx-auto mt-6 max-w-[44ch] text-destaque text-muted-foreground">
          Um erro interrompeu a página. O restante do site continua no lugar.
        </p>
        <p className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex min-h-12 cursor-pointer items-center rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-[filter] duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Tentar de novo
          </button>
          <a href="/" className="inline-flex min-h-11 items-center text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            Voltar ao início
          </a>
        </p>
      </div>
    </main>
  );
}

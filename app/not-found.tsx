import type { Metadata } from "next";

import { Envelope } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { Logotipo } from "@/components/marca/logotipo";
import { Lide } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { acaoOrcamento, contato } from "@/conteudo/site";

export const metadata: Metadata = { title: "Página não encontrada · Atlas Digital" };

/**
 * Página inexistente: o caminho de volta, na mesma linguagem do site — o
 * título no degrau das aberturas (text-display) e o lide do site (até
 * 03/10, uma cópia das classes dele, em Archivo Light). Desde 17/10, na
 * água com a matéria, sem o rótulo à vista acima do título.
 */
export default function NaoEncontrada() {
  return (
    // id="conteudo": o destino do vínculo "Ir para o conteúdo", do layout raiz.
    // vd-materia (17/10, segundo fechamento com o Impeccable): a água do site, com o grão e a rampa, como toda cena no
    // navy; até então, o navy chapado, a única tela do site sem a matéria (a marca P2; a avaliação A).
    <main id="conteudo" tabIndex={-1} data-tom="escuro" className="vd-materia grid min-h-svh items-center text-center">
      <Envelope className="py-16">
        <a
          href="/"
          aria-label="Atlas Digital — início"
          className="inline-flex min-h-11 items-center text-foreground transition-colors duration-300 ease-atlas motion-reduce:hover:text-accent"
        >
          <Logotipo recorte="globo-404" className="h-[34px] w-auto" decorativo />
        </a>
        {/* "Erro 404", só para o leitor de tela (17/10): à vista, era o rótulo acima do título (a marca T2). */}
        <p className="sr-only">Erro 404</p>
        <h1 className="mx-auto mt-14 max-w-[14ch] text-display">Esta página não existe.</h1>
        <Lide className="mx-auto mt-6 max-w-[44ch]">
          O endereço pode ter mudado, ou foi digitado com algum caractere a mais. O restante do site continua no lugar.
        </Lide>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <a href="/" className={buttonVariants({ size: "lg" })}>
            Voltar ao início
          </a>
          {/* O destino já é um caminho (/orcamento). Até 03/10, levava "/" na frente e virava //orcamento, outro domínio. */}
          <a href={acaoOrcamento.destino} className={buttonVariants({ variant: "link", size: "link" })}>
            {acaoOrcamento.rotulo}
            <IconeSeta className="size-3.5" />
          </a>
        </div>
        {/* Os dois endereços separados pelo espaço (17/10): até então, ligados por ponto médio (a marca K1). */}
        <p className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-1 text-rotulo text-muted-foreground">
          <span>{contato.dominio}</span> <span>{contato.email}</span>
        </p>
      </Envelope>
    </main>
  );
}

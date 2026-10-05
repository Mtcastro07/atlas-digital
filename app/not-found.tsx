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
 * 03/10, uma cópia das classes dele, em Archivo Light).
 */
export default function NaoEncontrada() {
  return (
    // id="conteudo": o destino do vínculo "Ir para o conteúdo", do layout raiz.
    <main id="conteudo" tabIndex={-1} data-tom="escuro" className="grid min-h-svh items-center text-center">
      <Envelope className="py-16">
        <a
          href="/"
          aria-label="Atlas Digital — início"
          className="inline-flex min-h-11 items-center text-foreground transition-colors duration-300 ease-atlas motion-reduce:hover:text-accent"
        >
          <Logotipo recorte="globo-404" className="h-[34px] w-auto" decorativo />
        </a>
        <p className="mt-14 text-rotulo font-semibold text-accent">Erro 404</p>
        <h1 className="mx-auto mt-3 max-w-[14ch] text-display">Esta página não existe.</h1>
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
        <p className="mt-16 text-rotulo text-muted-foreground">
          {contato.dominio} · {contato.email}
        </p>
      </Envelope>
    </main>
  );
}

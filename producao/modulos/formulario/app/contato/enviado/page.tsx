// app/contato/enviado/page.tsx — a confirmação do envio: diz que a mensagem chegou e em quanto tempo vem a resposta,
// e oferece o WhatsApp e o caminho de volta (producao/esteira/14-funcionalidades/02-formulario.md, seção 3.4). Não repete dado
// pessoal: nada no endereço nem na tela. Fora da busca.
import Link from "next/link";
import { AcaoWhatsApp } from "@/components/acao-whatsapp";
import { confirmacao } from "@/conteudo/formulario";
import { negocio } from "@/conteudo/negocio";
import { paginaDe } from "@/conteudo/site";
import { metadadosDaPagina } from "@/lib/metadados";

// Fora da busca, mas com título, descrição e cartão próprios, como toda página (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 10).
export const metadata = {
  ...metadadosDaPagina({ ...paginaDe("contato"), caminho: "/contato/enviado", ...confirmacao.metadados }),
  alternates: undefined,
  robots: { index: false, follow: false },
};

export default function Enviado() {
  return (
    <main id="conteudo" tabIndex={-1} className="envelope mx-auto max-w-pagina pt-14 pb-10 outline-none md:pt-20">
      <h1 className="max-w-[16ch] text-display font-semibold">{confirmacao.titulo}</h1>
      <p className="mt-6 max-w-[52ch] text-destaque text-muted-foreground">
        {negocio.prazoDeResposta} {confirmacao.complemento}
      </p>
      <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <AcaoWhatsApp discreta />
        <Link href="/" className="inline-flex min-h-11 items-center text-accent">
          {confirmacao.voltar}
        </Link>
      </p>
    </main>
  );
}

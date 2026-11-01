// app/agendar/confirmado/page.tsx — a confirmação da reserva (producao/esteira/14-funcionalidades/05-agenda.md, seções 5 e 6): "Reserva feita. O convite e o
// vínculo de cancelamento foram para o seu e-mail." Se o e-mail não saiu, a reserva continua feita, e a página diz isso e
// mostra o dia e a hora na tela, com o WhatsApp da casa (nunca uma reserva que a pessoa não sabe que fez). O horário vem
// no endereço porque não é dado pessoal; o nome e o contato não aparecem. Fora da busca.
import Link from "next/link";
import { AcaoWhatsApp } from "@/components/acao-whatsapp";
import { confirmacao } from "@/conteudo/agenda";
import { paginaDe } from "@/conteudo/site";
import { lerInstante } from "@/lib/agenda/validar";
import { quandoPorExtenso } from "@/lib/agenda/texto";
import { metadadosDaPagina } from "@/lib/metadados";

// Fora da busca, mas com título, descrição e cartão próprios, como toda página (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 10).
export const metadata = {
  ...metadadosDaPagina({ ...paginaDe("agendar"), caminho: "/agendar/confirmado", ...confirmacao.metadados }),
  alternates: undefined,
  robots: { index: false, follow: false },
};

export default async function Confirmado({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const busca = await searchParams;
  const um = (valor: string | string[] | undefined) => (Array.isArray(valor) ? valor[0] : valor) ?? "";
  const inicio = lerInstante(um(busca.inicio));
  const semEmail = um(busca.email) === "falhou" && inicio !== null;
  return (
    <main id="conteudo" tabIndex={-1} className="envelope mx-auto max-w-pagina pt-14 pb-10 outline-none md:pt-20">
      <h1 className="max-w-[16ch] text-display font-semibold">{confirmacao.titulo}</h1>
      {semEmail ? (
        <div className="mt-6 max-w-[52ch] text-destaque">
          <p className="text-muted-foreground">{confirmacao.semEmail}</p>
          <p className="mt-2 font-semibold">{quandoPorExtenso(inicio)}</p>
          <p className="mt-4 text-muted-foreground">{confirmacao.semEmailComplemento}</p>
        </div>
      ) : (
        <p className="mt-6 max-w-[52ch] text-destaque text-muted-foreground">{confirmacao.comEmail}</p>
      )}
      <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <AcaoWhatsApp discreta />
        <Link href="/" className="inline-flex min-h-11 items-center text-accent">
          {confirmacao.voltar}
        </Link>
      </p>
    </main>
  );
}

// app/cancelar/[codigo]/page.tsx — o vínculo de cancelamento do e-mail (producao/esteira/14-funcionalidades/05-agenda.md, seção 8). Abrir o vínculo NÃO
// cancela: a página mostra a reserva e o botão "Cancelar a reserva"; o cancelamento é o envio do formulário (acoes.ts).
// O código tem 128 bits e vale até a antecedência de cancelamento da casa; depois dela, a página explica e mostra o
// WhatsApp. Um código inventado mostra "Reserva não encontrada", sem dizer se o código existiu. A página leva noindex e
// referrer "no-referrer": o código no endereço não vaza para lugar nenhum.
import Link from "next/link";
import { connection } from "next/server";
import { AcaoWhatsApp } from "@/components/acao-whatsapp";
import { cancelamento as t, config } from "@/conteudo/agenda";
import { paginaDe } from "@/conteudo/site";
import { situacaoDoCancelamento } from "@/lib/agenda/cancelamento";
import { repositorio } from "@/lib/agenda/destino";
import { quandoPorExtenso } from "@/lib/agenda/texto";
import { metadadosDaPagina } from "@/lib/metadados";
import { duracao } from "@/lib/moeda";
import { cancelarReserva } from "./acoes";

// Título, descrição e cartão próprios, como toda página; sem o código no endereço canônico e fora da busca.
export const metadata = {
  ...metadadosDaPagina({ ...paginaDe("agendar"), caminho: "/cancelar", ...t.metadados }),
  alternates: undefined,
  robots: { index: false, follow: false },
  referrer: "no-referrer",
} as const;

const um = (valor: string | string[] | undefined) => (Array.isArray(valor) ? valor[0] : valor) ?? "";

export default async function Cancelar({ params, searchParams }: { params: Promise<{ codigo: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await connection(); // a situação da reserva e o prazo são do momento do pedido
  const { codigo } = await params;
  const feito = um((await searchParams).feito) === "1";
  const situacao = await situacaoDoCancelamento(repositorio(), codigo, new Date(), config);

  const titulo =
    situacao.tipo === "nao-encontrada"
      ? t.naoEncontrada.titulo
      : situacao.tipo === "ja-cancelada"
        ? feito
          ? t.cancelada.titulo
          : t.jaCancelada.titulo
        : situacao.tipo === "fora-do-prazo"
          ? t.foraDoPrazo.titulo
          : t.pode.titulo;
  const texto =
    situacao.tipo === "nao-encontrada"
      ? t.naoEncontrada.texto
      : situacao.tipo === "ja-cancelada"
        ? feito
          ? t.cancelada.texto
          : t.jaCancelada.texto
        : situacao.tipo === "fora-do-prazo"
          ? t.foraDoPrazo.texto(duracao(config.cancelamentoAteMin))
          : t.pode.texto;

  return (
    <main id="conteudo" tabIndex={-1} className="envelope mx-auto max-w-pagina pt-14 pb-10 outline-none md:pt-20">
      <h1 className="max-w-[18ch] text-display font-semibold">{titulo}</h1>
      <p className="mt-6 max-w-[52ch] text-destaque text-muted-foreground">{texto}</p>

      {/* Os dados da reserva, sem o nome nem o contato da pessoa. */}
      {(situacao.tipo === "pode-cancelar" || situacao.tipo === "fora-do-prazo") && (
        <dl className="mt-8 grid max-w-md grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-cartao border border-border bg-card p-6">
          <dt className="font-semibold">{t.rotulos.servico}</dt>
          <dd>{situacao.reserva.servicoNome}</dd>
          <dt className="font-semibold">{t.rotulos.profissional}</dt>
          <dd>{situacao.reserva.profissionalNome}</dd>
          <dt className="font-semibold">{t.rotulos.quando}</dt>
          <dd className="tabular">{quandoPorExtenso(situacao.reserva.inicio)}</dd>
        </dl>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {situacao.tipo === "pode-cancelar" && (
          <form action={cancelarReserva}>
            <input type="hidden" name="codigo" value={codigo} />
            <button
              type="submit"
              className="inline-flex min-h-12 min-w-52 cursor-pointer items-center justify-center rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-[filter] duration-200 hover:brightness-110"
            >
              {t.pode.botao}
            </button>
          </form>
        )}
        {situacao.tipo !== "pode-cancelar" && <AcaoWhatsApp discreta />}
        <Link href="/agendar" className="inline-flex min-h-11 items-center text-accent">
          {t.agendarDeNovo}
        </Link>
      </div>
    </main>
  );
}

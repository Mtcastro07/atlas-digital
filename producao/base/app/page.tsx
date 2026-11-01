// app/page.tsx — o Início: ser entendido em cinco segundos e chamar (producao/esteira/03-planos.md, seção 3.3;
// producao/esteira/nichos/pet-shop.md, seção 4.1). O título e o lide entram já legíveis (o elemento do LCP).
//
// ANDAIME (09.10.2026): desta página ficam as funções (o WhatsApp, o horário, o endereço, o mapa, os dados
// estruturados), nunca a composição: a ordem das seções, a capa em duas colunas com o cartão à direita, o fundo claro
// único, a grade "o que não se faz aqui". A composição sai do roteiro de cenas e do mundo da marca do identidade.md
// (producao/esteira/19-o-padrao-atlas.md, seções 3, 4 e 8.1). Repintar este esqueleto foi o que tirou da faixa premium
// os sites de exemplo de odontologia e de restaurante.
import Link from "next/link";
import { AcaoWhatsApp } from "@/components/acao-whatsapp";
import { Endereco } from "@/components/endereco";
import { Horario } from "@/components/horario";
import { VinculoDoMapa } from "@/components/vinculo-do-mapa";
import { negocio } from "@/conteudo/negocio";
import { inicio, paginaDe, portes, servicos } from "@/conteudo/site";
import { dadosDaCapa, jsonLd } from "@/lib/dados-estruturados";
import { metadadosDaPagina } from "@/lib/metadados";
import { duracao, reais } from "@/lib/moeda";

export const metadata = metadadosDaPagina(paginaDe("inicio"));

export default function Inicio() {
  const banho = servicos[0];
  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      {/* Os dados estruturados só no site de cliente: no exemplo, seriam um negócio que não existe. */}
      {!negocio.exemplo && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(dadosDaCapa)} />}

      {/* A primeira tela: o que é, onde, quanto custa e como chamar (producao/esteira/nichos/pet-shop.md, seção 4.1).
          O título e o lide entram já legíveis: são o elemento do LCP. */}
      <section className="envelope mx-auto grid max-w-pagina gap-12 pt-14 pb-16 md:pt-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
        <div>
          <h1 className="max-w-[16ch] text-display font-semibold">{inicio.titulo}</h1>
          <p className="mt-6 max-w-[46ch] text-destaque text-muted-foreground">
            {inicio.lide.antes} <span className="marca-texto text-foreground">{inicio.lide.marcado}</span> {inicio.lide.depois}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <AcaoWhatsApp />
            <p className="text-nota text-muted-foreground">{negocio.prazoDeResposta}</p>
          </div>
        </div>

        <div className="rounded-cartao border border-border bg-card p-6 md:p-8">
          <h2 className="font-display text-destaque font-semibold">{inicio.resumo.titulo}</h2>
          <dl className="mt-4 divide-y divide-border">
            {portes.map((p) => (
              <div key={p.id} className="flex items-baseline justify-between gap-4 py-3">
                <dt>
                  <span className="font-semibold">{p.nome}</span> <span className="text-nota text-muted-foreground">{p.peso}</span>
                </dt>
                <dd className="text-right">
                  <span className="text-numero font-semibold tabular">{reais(banho.valores[p.id].valor)}</span>{" "}
                  <span className="block text-nota text-muted-foreground tabular">{duracao(banho.valores[p.id].minutos)}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-nota text-muted-foreground">{inicio.resumo.nota}</p>
          <Link href={paginaDe("servicos").caminho} className="inline-flex min-h-11 items-center font-semibold text-accent">
            Ver a tabela inteira
          </Link>
        </div>
      </section>

      <section data-revela className="envelope mx-auto grid max-w-pagina gap-12 py-12 md:grid-cols-2">
        <div>
          <h2 className="text-titulo font-semibold">{inicio.cuidado.titulo}</h2>
          <ul className="mt-6 grid list-disc gap-3 pl-5 marker:text-primary">
            {inicio.cuidado.itens.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-titulo font-semibold">{inicio.ausencias.titulo}</h2>
          <ul className="mt-6 grid list-disc gap-3 pl-5 marker:text-muted-foreground">
            {inicio.ausencias.itens.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="envelope mx-auto grid max-w-pagina gap-12 py-12 md:grid-cols-2">
        <div>
          <h2 className="text-titulo font-semibold">{inicio.horario.titulo}</h2>
          <Horario className="mt-6 max-w-md" />
        </div>
        <div>
          <h2 className="text-titulo font-semibold">{inicio.onde.titulo}</h2>
          <Endereco className="mt-6" />
          <p className="mt-4 flex flex-wrap gap-x-6">
            <VinculoDoMapa className="font-semibold" />
            <Link href={paginaDe("onde").caminho} className="inline-flex min-h-11 items-center font-semibold text-accent">
              Como chegar
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

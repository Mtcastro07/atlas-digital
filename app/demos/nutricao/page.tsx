import Link from "next/link";

import { FolhaDoPlano } from "@/components/demos/nutricao/folha-do-plano";
import { Moldura } from "@/components/demos/nutricao/moldura";
import { PaginaDoPlano } from "@/components/demos/nutricao/pagina-do-plano";
import { AcaoWhatsApp, ComMarcaTexto, Continua, entreSecoes, envelope, metadadosDe, paginaDe, romanos, Titulo } from "@/components/demos/nutricao/pecas";
import { nutricaoSite as site } from "@/conteudo/demos/nutricao";

export const metadata = metadadosDe("inicio");

/**
 * I · A consulta. A capa em corpo de cartaz, com a folha do plano pousada junto do título, sob a sombra da horta da
 * janela (a assinatura: o momento da página, e o ambiente, pausável), o lide com capitular e o marca-texto em
 * "rotina"; o sumário da consulta com pontilhado até cada número; o método em quatro tempos, lado a lado, impresso na
 * página do plano; a nota sobre o site no campo da tinta verde, com a norma em rodapé; o fecho, com a ação e a página
 * seguinte. Nada entra em série: o título, o lide e as seções ficam parados desde o primeiro quadro.
 * Do crítico de fora (14.10.2026): saiu o "Nesta página" (o terceiro sistema de algarismos romanos da primeira tela,
 * numerando seções que não são sequência, e mais um rótulo em versalete sobre lista pautada); a folha subiu para o
 * lado do título; o método passou de linhas a colunas; a nota passou da sálvia ao campo verde.
 */
export default function PaginaDaConsulta() {
  return (
    <Moldura pagina="inicio" rotulo={site.capa.rotulo}>
      <section aria-labelledby="titulo" className={envelope}>
        <div className="nt-capa relative mt-8 lg:mt-12">
          {/* No celular, o corpo que deixa "Sem se tornar" numa linha só (três linhas de 340 px para cima; até 14.10.2026, 64 px fixos, quatro linhas a 360 px e seis a 320 px). */}
          <h1 id="titulo" className="nt-exibicao relative z-[1] text-[min(168px,max(10.6vw,min(64px,calc((100vw-48px)/5.05))))] leading-[0.86] tracking-[-0.038em]">
            {site.capa.titulo.map((linha, i) => (
              // A caixa de cada linha termina na letra (w-fit): a folha, ao lado, não fica sob a caixa delas.
              <span key={linha} className={`block w-fit ${i === site.capa.titulo.length - 1 ? "italic" : ""}`}>
                {linha}
              </span>
            ))}
          </h1>
          <FolhaDoPlano />
        </div>
        {/* Acima da janela da folha (z-[1]): a sombra longa da folha não passa por cima da ação. No celular, logo abaixo da pausa (fechamento com o Impeccable, 16.10.2026: o lide entra na primeira tela de 390 × 844). */}
        <div className="relative z-[1] mt-5 grid gap-12 sm:mt-12 lg:mt-14 lg:grid-cols-12">
          <p className="nt-capitular text-[clamp(21px,1.75vw,25px)] leading-[1.48] lg:col-span-6">
            <ComMarcaTexto texto={site.capa.lide} palavra={site.capa.destaque} atraso={600} />
          </p>
          <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9 lg:border-l lg:border-border lg:pl-10">
            <AcaoWhatsApp grande />
            <Link href={paginaDe("valores").caminho} className="nt-vinculo inline-flex min-h-11 items-center text-[18px]">
              {site.capa.secundaria} →
            </Link>
            <p className="text-[16px] text-muted-foreground italic">{site.capa.nota}</p>
          </div>
        </div>
      </section>

      {/* O sumário: cada número da oferta no fim de uma linha pontilhada, impressa. O evento é o número de cartaz; a linha começa no rótulo, alinhada ao filete (até 14.10.2026, com a coluna de algarismos romanos, repetida em três listas seguidas: a marca L5). Desde o crítico de fora (16.10.2026), no encarte de sálvia, de ponta a ponta (nutricao.css, .nt-campo-salvia): até então, a capa, o sumário e o método seguiam na mesma palha. */}
      <section aria-labelledby="sumario" className={`nt-campo-salvia ${entreSecoes}`}>
        <div className={`${envelope} py-20 md:py-24 lg:py-28`}>
          <div className="nt-filete-duplo" />
          <h2 id="sumario" className="nt-versal py-4 text-center text-[17px] text-muted-foreground">
            {site.sumario.titulo}
          </h2>
          <ol className="border-t border-foreground">
            {site.sumario.itens.map((item) => (
              <li key={item.rotulo} className="flex flex-wrap items-baseline border-b border-border py-7 sm:flex-nowrap">
                {/* No celular, o rótulo ocupa a linha, e o pontilhado com o número vem embaixo dele. */}
                <span className="max-w-[30ch] basis-full text-[clamp(19px,1.6vw,22px)] leading-snug sm:basis-auto">{item.rotulo}</span>
                <span aria-hidden="true" className="nt-pontilhado max-sm:ml-0!" />
                <span className="nt-exibicao nt-numeros flex-none text-[clamp(56px,6.4vw,104px)] leading-[0.8] tracking-[-0.04em]">
                  {item.valor}
                  {item.unidade && <span className="nt-versal ml-2 text-[0.24em] tracking-[0.06em]">{item.unidade}</span>}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* O método: quatro tempos, impressos na página do plano, sobre a palha. Na mesa, lado a lado, como as colunas de uma página (crítico de fora, 14.10.2026: em linhas, repetia a forma do sumário logo acima); a nota de cada tempo no pé da coluna. As quatro colunas partilham as linhas (subgrid; 15.10.2026): o nome que quebra em duas linhas não desce o texto só da coluna dele, e os textos e as notas começam na mesma altura. No celular, um embaixo do outro. */}
      <section aria-labelledby="metodo" className={`${envelope} ${entreSecoes}`}>
        <Titulo id="metodo" linhas={site.metodo.titulo} className="text-[clamp(48px,5.8vw,92px)] leading-[0.94] tracking-[-0.03em]" />
        <PaginaDoPlano className="mt-14 lg:mt-16">
          <ol className="nt-tempos border-t-2 border-foreground lg:grid lg:grid-cols-4">
            {site.metodo.etapas.map((etapa, i) => (
              <li key={etapa.nome} className="flex flex-col gap-3 border-b border-border py-9 lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:border-b-0 lg:px-7 lg:pt-8 lg:pb-2 lg:first:pl-0 lg:last:pr-0 lg:not-first:border-l">
                <span aria-hidden="true" className="nt-exibicao nt-tempo-numero text-[64px] leading-[0.8] text-muted-foreground italic lg:text-[clamp(72px,6.4vw,104px)]">
                  {romanos[i]}
                </span>
                <h3 className="nt-exibicao mt-2 text-[clamp(28px,2.4vw,34px)] leading-[1.1] text-balance">{etapa.nome}</h3>
                <p className="max-w-[46ch] text-[18.5px] leading-[1.6]">{etapa.texto}</p>
                <p className="text-[16.5px] text-muted-foreground italic lg:border-t lg:border-border lg:pt-4">{etapa.nota}</p>
              </li>
            ))}
          </ol>
        </PaginaDoPlano>
      </section>

      {/* A nota sobre o site: a ausência declarada, com a norma em rodapé, no campo da tinta verde, de ponta a ponta (crítico de fora, 14.10.2026: até então, um bloco de sálvia na palha; a capa não virava de valor nenhuma vez antes da contracapa). Os tokens se redefinem na cena (nutricao.css, .nt-campo-tinta). */}
      <aside aria-labelledby="nota" className={`nt-campo-tinta ${entreSecoes}`}>
        <div className={`${envelope} py-20 md:py-24 lg:py-32`}>
          <h2 id="nota" className="nt-versal text-[17px] text-muted-foreground">
            {site.ausencia.titulo}
          </h2>
          <p className="nt-exibicao mt-6 max-w-[24ch] text-[clamp(34px,4.4vw,68px)] leading-[1.08] tracking-[-0.02em] italic">
            {site.ausencia.texto}
            <sup className="ml-1 text-[0.45em] not-italic">
              {/* O algarismo é pequeno; o alvo de toque, não: 44 × 44 px em volta dele, sem mexer na linha (até 03/10, ~14 a 25 px). */}
              <a
                href="#nota-1"
                id="chamada-1"
                className="nt-vinculo relative after:absolute after:top-1/2 after:left-1/2 after:size-11 after:-translate-1/2"
              >
                1
              </a>
            </sup>
          </p>
          {/* Seguido o ¹, a nota responde, seca, por :target (nutricao.css); o ↩ volta ao texto, com alvo de 44 × 44 px, e passa da sálvia à palha sob o ponteiro e no toque (crítico de fora, 16.10.2026: era o único vínculo sem resposta). Medida de 58ch, ~75 caracteres por linha (até 15.10.2026, 86ch: 111 caracteres a 1440 px, acima do teto de 80). */}
          <p id="nota-1" className="mt-12 max-w-[58ch] border-t border-border pt-5 text-[15.5px] leading-relaxed lg:mt-16">
            <sup className="mr-1.5">1</sup>
            {site.ausencia.norma}{" "}
            <a
              href="#chamada-1"
              aria-label="Voltar ao texto"
              className="relative ml-1 text-accent transition-colors duration-200 after:absolute after:top-1/2 after:left-1/2 after:size-11 after:-translate-1/2 hover:text-foreground active:text-foreground active:duration-[120ms]"
            >
              {"\u21A9\uFE0E"}
            </a>
          </p>
        </div>
      </aside>

      {/* O fecho: a marcação por mensagem, como a manchete do pé da folha, à esquerda, em corpo de cartaz, e embaixo, sobre o filete fino, o texto e a ação nas pontas (crítico de fora, 16.10.2026: até então, o título centrado, o texto e a pílula, a chamada final da base). */}
      <section aria-labelledby="fecho" className={`${envelope} ${entreSecoes}`}>
        <h2 id="fecho" className="nt-exibicao max-w-[15ch] text-[clamp(48px,7.4vw,118px)] leading-[0.92] tracking-[-0.035em] text-balance">
          {site.fecho.titulo}
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-12 gap-y-8 border-t border-border pt-8 lg:mt-14">
          <p className="max-w-[44ch] text-[19px] leading-[1.55] text-muted-foreground">{site.fecho.texto}</p>
          <AcaoWhatsApp grande />
        </div>
      </section>

      <Continua pagina="inicio" />
    </Moldura>
  );
}

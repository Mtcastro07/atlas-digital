import Link from "next/link";

import { Moldura } from "@/components/demos/nutricao/moldura";
import { AcaoWhatsApp, atraso, Continua, entreSecoes, envelope, Folio, metadadosDe, paginaDe, romanos, Titulo } from "@/components/demos/nutricao/pecas";
import { nutricaoSite as site } from "@/conteudo/demos/nutricao";

export const metadata = metadadosDe("inicio");

/**
 * I · A consulta. A capa em corpo de cartaz, o lide com capitular, o
 * sumário da consulta com pontilhado até cada número, o método em quatro
 * tempos com a nota na margem, a nota sobre o site com a norma em rodapé
 * e o fecho, com a ação e a página seguinte.
 */
export default function PaginaDaConsulta() {
  return (
    <Moldura pagina="inicio">
      <section aria-labelledby="titulo" className={envelope}>
        <Folio pagina="inicio" rotulo={site.capa.rotulo} />
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <h1 id="titulo" className="nt-exibicao text-[clamp(64px,10.6vw,168px)] leading-[0.86] tracking-[-0.038em] lg:col-span-9">
            {site.capa.titulo.map((linha, i) => (
              <span key={linha} className={`dm-entra block ${i === site.capa.titulo.length - 1 ? "italic" : ""}`} style={atraso(80 + i * 120)}>
                {linha}
              </span>
            ))}
          </h1>
          {/* Nesta página: o índice das seções, na margem, como numa revista. */}
          <nav aria-label="Nesta página" className="dm-entra self-start lg:col-span-3 lg:pt-4" style={atraso(560)}>
            <p className="nt-versal border-b border-foreground pb-2 text-[15px] text-muted-foreground">Nesta página</p>
            <ol>
              {site.nestaPagina.map((item, i) => (
                <li key={item.id} className="border-b border-border">
                  <a href={`#${item.id}`} className="flex min-h-12 items-baseline gap-3 py-2.5 text-[17px] transition-colors duration-300 hover:text-accent">
                    <span className="nt-exibicao w-6 flex-none text-muted-foreground italic">{romanos[i]}.</span>
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <div className="dm-entra mt-16 grid gap-12 lg:grid-cols-12" style={atraso(460)}>
          <p className="nt-capitular text-[clamp(21px,1.75vw,25px)] leading-[1.48] lg:col-span-6">{site.capa.lide}</p>
          <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9 lg:border-l lg:border-border lg:pl-10">
            <AcaoWhatsApp grande />
            <Link href={paginaDe("valores").caminho} className="nt-vinculo inline-flex min-h-11 items-center text-[18px]">
              {site.capa.secundaria} →
            </Link>
            <p className="text-[16px] text-muted-foreground italic">{site.capa.nota}</p>
          </div>
        </div>
      </section>

      {/* O sumário: cada número da oferta no fim de uma linha pontilhada. */}
      <section aria-labelledby="sumario" className={`${envelope} ${entreSecoes}`}>
        <div className="nt-filete-duplo" />
        <h2 id="sumario" className="nt-versal py-4 text-center text-[17px] text-muted-foreground">
          {site.sumario.titulo}
        </h2>
        <ol className="border-t border-foreground">
          {site.sumario.itens.map((item, i) => (
            <li key={item.rotulo} data-revelar style={atraso(i * 110)} className="flex flex-wrap items-baseline border-b border-border py-7 sm:flex-nowrap">
              <span className="nt-exibicao w-14 flex-none text-[22px] text-muted-foreground italic">{romanos[i]}.</span>
              {/* No celular, o rótulo ocupa a linha, e o pontilhado com o número vem embaixo dele. */}
              <span className="max-w-[30ch] basis-[calc(100%-3.5rem)] text-[clamp(19px,1.6vw,22px)] leading-snug sm:basis-auto">{item.rotulo}</span>
              <span aria-hidden="true" className="nt-pontilhado max-sm:ml-14!" />
              <span className="nt-exibicao nt-numeros flex-none text-[clamp(56px,6.4vw,104px)] leading-[0.8] tracking-[-0.04em]">
                {item.valor}
                {item.unidade && <span className="nt-versal ml-2 text-[0.24em] tracking-[0.06em]">{item.unidade}</span>}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* O método: quatro tempos, cada um com a sua nota na margem. */}
      <section aria-labelledby="metodo" className={`${envelope} ${entreSecoes}`}>
        <Titulo id="metodo" linhas={site.metodo.titulo} destaque={site.metodo.destaque} className="text-[clamp(48px,5.8vw,92px)] leading-[0.94] tracking-[-0.03em]" />
        <ol className="mt-16 border-t-2 border-foreground">
          {site.metodo.etapas.map((etapa, i) => (
            <li key={etapa.nome} data-revelar style={atraso(i * 90)} className="grid items-baseline gap-x-10 gap-y-3 border-b border-border py-10 lg:grid-cols-12">
              <span aria-hidden="true" className="nt-exibicao text-[64px] leading-[0.7] text-muted-foreground italic lg:col-span-2">
                {romanos[i]}
              </span>
              <h3 className="nt-exibicao text-[clamp(28px,2.6vw,36px)] leading-tight lg:col-span-3">{etapa.nome}</h3>
              <p className="max-w-[46ch] text-[19px] leading-[1.6] lg:col-span-4">{etapa.texto}</p>
              <p className="text-[16.5px] text-muted-foreground italic lg:col-span-3 lg:border-l lg:border-border lg:pl-6">{etapa.nota}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* A nota sobre o site: a ausência declarada, com a norma em rodapé. */}
      {/* O recuo da nota, igual nos quatro lados e crescendo com a tela (até 03/10, 32 × 56 px no celular e 96 × 80 px no computador). */}
      <aside aria-labelledby="nota" className={`${envelope} ${entreSecoes}`}>
        <div data-revelar className="border-y-2 border-foreground bg-secondary p-8 md:p-12 lg:p-16">
          <h2 id="nota" className="nt-versal text-[17px]">
            {site.ausencia.titulo}
          </h2>
          <p className="nt-exibicao mt-6 max-w-[26ch] text-[clamp(32px,3.7vw,56px)] leading-[1.1] tracking-[-0.02em] italic">
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
          <p id="nota-1" className="mt-10 max-w-[86ch] border-t border-foreground/30 pt-5 text-[15.5px] leading-relaxed lg:mt-14">
            <sup className="mr-1.5">1</sup>
            {site.ausencia.norma}
          </p>
        </div>
      </aside>

      {/* O fecho: a marcação por mensagem. */}
      <section aria-labelledby="fecho" className={`${envelope} ${entreSecoes} text-center`}>
        <h2 id="fecho" className="nt-exibicao mx-auto max-w-[17ch] text-[clamp(44px,5.2vw,84px)] leading-[0.98] tracking-[-0.03em]" data-revelar>
          {site.fecho.titulo}
        </h2>
        <p className="mx-auto mt-6 max-w-[48ch] text-[19px] text-muted-foreground" data-revelar>
          {site.fecho.texto}
        </p>
        <div className="mt-10 flex justify-center" data-revelar>
          <AcaoWhatsApp grande />
        </div>
      </section>

      <Continua pagina="inicio" />
    </Moldura>
  );
}

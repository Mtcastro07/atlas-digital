import Link from "next/link";

import { CabecalhoFixo } from "@/components/transicao-de-pagina";

import { envelope, vinculoWhatsApp, type IdDaPagina } from "@/components/demos/nutricao/pecas";
import { IconeWhatsApp } from "@/components/icones";
import { MarcaDaNutricao } from "@/components/nichos/marcas";
import { creditoDoPlano, seloDeFiccao, whatsappVisivel } from "@/conteudo/demos/comum";
import { nutricaoSite as site } from "@/conteudo/demos/nutricao";

/**
 * A folha de cada página da Nutrição Icaraí: o cabeçalho de jornal (a
 * linha do topo com o agendamento, o nome centrado como um título de
 * publicação e o índice das três páginas em algarismos romanos, entre o
 * filete duplo e o fino), o conteúdo da página, que entra como uma folha
 * que assenta (.nt-folha), o colofão no lugar do rodapé e o botão de
 * WhatsApp sempre à mão (item do plano Essencial). Sem script, tudo
 * funciona: o índice são vínculos comuns.
 */
export function Moldura({ pagina, children }: { pagina: IdDaPagina; children: React.ReactNode }) {
  return (
    <>
      <CabecalhoFixo>
        <header>
          <div className={`${envelope} flex min-h-12 flex-wrap items-center justify-between gap-x-6 border-b border-border text-[16px]`}>
            <p className="nt-versal py-2 text-muted-foreground">{site.linhaDoTopo}</p>
            <a
              href={vinculoWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="nt-vinculo inline-flex min-h-11 items-center gap-2 text-accent"
            >
              <IconeWhatsApp className="size-4" />
              {site.acao}
            </a>
          </div>
          {/* Recuo simétrico em volta do nome (até 03/10, 32 px em cima e 28 embaixo); sob o ponteiro, o nome na cor da tinta, como o índice. */}
          <div className={`${envelope} py-8 text-center`}>
            <Link href={site.caminho} className="inline-flex min-h-11 items-center gap-4 transition-colors duration-300 hover:text-accent">
              <MarcaDaNutricao className="size-12 flex-none" />
              <span className="nt-exibicao text-[clamp(34px,3.6vw,48px)] leading-none">{site.nome}</span>
            </Link>
            <p className="nt-versal mt-3 text-[16px] text-muted-foreground">
              {site.profissional} · {site.credencial}
            </p>
          </div>
          <nav aria-label="Índice" className={`${envelope} nt-indice`}>
            <div className="nt-filete-duplo" />
            <ul className="flex flex-wrap justify-center gap-x-14 gap-y-1 py-2.5">
              {site.paginas.map((p) => (
                <li key={p.id}>
                  <Link
                    href={p.caminho}
                    aria-current={p.id === pagina ? "page" : undefined}
                    className="inline-flex min-h-11 items-baseline gap-3 transition-colors duration-300 hover:text-accent"
                  >
                    <span className="nt-exibicao text-[21px] text-muted-foreground italic">{p.numero}</span>
                    <span className="nt-indice-rotulo text-[18px]">{p.rotulo}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="h-px bg-foreground" />
          </nav>
        </header>
      </CabecalhoFixo>

      <main id="conteudo" className="nt-folha">
        {children}
      </main>

      {/* O colofão: quem atende, onde, como falar e como a folha foi composta. Do "Continua em" até ele, 144/176 px (até 03/10, 224 px). */}
      <footer className="mt-20 border-t-2 border-foreground lg:mt-24">
        <div className={`${envelope} py-16 text-center lg:py-20`}>
          <MarcaDaNutricao className="mx-auto size-12" />
          <p className="nt-exibicao mt-6 text-[clamp(40px,4vw,56px)] leading-none">{site.nome}</p>
          <p className="nt-versal mt-3 text-[16px] text-muted-foreground">
            {site.profissional} · {site.credencial}
          </p>
          <p className="mx-auto mt-8 max-w-[60ch] text-[17px] leading-relaxed">
            {site.endereco} · {site.bairro}
            <br />
            WhatsApp {whatsappVisivel} · presencial ou por vídeo
          </p>
          <ul aria-label="Páginas" className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-1">
            {site.paginas.map((p) => (
              <li key={p.id}>
                {/* O vínculo inteiro reage, o algarismo também (até 03/10, só o rótulo, e só sob o ponteiro em cima dele). */}
                <Link href={p.caminho} className="group inline-flex min-h-11 items-center gap-2 text-[16px] transition-colors duration-300 hover:text-accent">
                  <span className="nt-exibicao text-muted-foreground italic transition-colors duration-300 group-hover:text-accent">{p.numero}</span>
                  <span className="nt-vinculo">{p.rotulo}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-12 max-w-[64ch] border-t border-border pt-8 text-[15px] leading-relaxed text-muted-foreground">
            <p className="italic">
              <span className="nt-versal not-italic">Colofão.</span> {site.colofao}
            </p>
            <p className="mt-3">{seloDeFiccao}</p>
            <p className="mt-1">{creditoDoPlano("Essencial")}</p>
          </div>
        </div>
      </footer>

      {/* O botão de WhatsApp do plano Essencial, sempre à mão; o rótulo aparece sob o ponteiro e no foco. No celular, recolhe ao rolar para baixo (ilha RecolherAoRolar). */}
      <a
        href={vinculoWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        data-recolhe
        className="nt-flutuante fixed right-6 bottom-6 z-30 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground transition-[filter] duration-300 hover:brightness-110 active:brightness-90 md:right-8 md:bottom-8"
      >
        <span className="nt-flutuante-rotulo pointer-events-none absolute right-full mr-3 rounded-full bg-foreground px-4 py-2 text-[15px] whitespace-nowrap text-background max-sm:sr-only">
          {site.acao}
        </span>
        <IconeWhatsApp className="size-6" />
      </a>
    </>
  );
}

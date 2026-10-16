import Link from "next/link";
import { ViewTransition } from "react";

import { CabecalhoFixo } from "@/components/transicao-de-pagina";

import { envelope, romanos, vinculoWhatsApp, type IdDaPagina } from "@/components/demos/nutricao/pecas";
import { IconeWhatsApp } from "@/components/icones";
import { MarcaDaNutricao } from "@/components/nichos/marcas";
import { creditoDoPlano, seloDeFiccao, whatsappVisivel } from "@/conteudo/demos/comum";
import { nutricaoSite as site } from "@/conteudo/demos/nutricao";

/**
 * A folha de cada página da Nutrição Icaraí: o cabeçalho de jornal (o nome
 * centrado como um título de publicação, com as orelhas na mesa, e a faixa
 * do índice entre o filete duplo e o fino, que leva também o fólio da
 * página), o conteúdo da página, parado desde o primeiro quadro (a troca de
 * página é a do template, curta), o colofão na contracapa verde e o botão
 * de WhatsApp sempre à mão (item do plano Essencial), ancorado na troca de
 * página. Sem script, tudo funciona: o índice são vínculos comuns.
 * Do crítico de fora (16.10.2026): a moldura tomava 415 px da mesa antes do
 * h1 (a linha do topo, o nome, o índice e, embaixo, o fólio com outro
 * filete duplo), e a 1280 × 720 a última linha do título caía abaixo da
 * dobra. A linha do topo virou as orelhas do nome, como no alto de um
 * jornal, e o fólio entrou na faixa do índice, como a linha de data sob o
 * nome do jornal: ~193 px na mesa e ~200 px no celular.
 */
export function Moldura({ pagina, rotulo, children }: { pagina?: IdDaPagina; rotulo: string; children: React.ReactNode }) {
  const atual = site.paginas.findIndex((p) => p.id === pagina);
  const total = romanos[site.paginas.length - 1].toUpperCase();
  return (
    <>
      <CabecalhoFixo>
        <header>
          {/* No celular e no tablet, a linha do topo, só com o agendamento, numa linha (crítico de fora, 14.10.2026). Na mesa, ela vira a orelha da direita do nome. */}
          <div className={`${envelope} flex min-h-11 items-center justify-center border-b border-border text-[16px] lg:hidden`}>
            <a href={vinculoWhatsApp} target="_blank" rel="noopener noreferrer" data-acao-do-topo className="nt-vinculo inline-flex min-h-11 items-center gap-2 text-accent">
              <IconeWhatsApp className="size-4" />
              {site.acao}
            </a>
          </div>
          {/* O nome, centrado. Na mesa, entre as orelhas: à esquerda, o lugar e o modo de atender; à direita, o agendamento. O nome não troca de cor como a navegação: sob o ponteiro e no toque, o pingo de damasco da marca cresce (nutricao.css, "o logotipo"; 14.10.2026). */}
          <div className={`${envelope} grid items-center pt-4 pb-3 text-center sm:py-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:py-5`}>
            <p className="nt-versal hidden text-left text-[15px] leading-snug text-muted-foreground lg:block">
              {site.linhaDoTopo.split(" · ").map((parte) => (
                <span key={parte} className="block">
                  {parte}
                </span>
              ))}
            </p>
            <div>
              <Link href={site.caminho} className="inline-flex min-h-11 items-center gap-4">
                <MarcaDaNutricao className="size-10 flex-none sm:size-12" />
                <span className="nt-exibicao text-[clamp(34px,3.6vw,48px)] leading-none">{site.nome}</span>
              </Link>
              <p className="nt-versal mt-2 text-[14px] text-muted-foreground min-[400px]:text-[15px] sm:text-[16px]">
                {site.profissional} · {site.credencial}
              </p>
            </div>
            <div className="hidden justify-end lg:flex">
              <a href={vinculoWhatsApp} target="_blank" rel="noopener noreferrer" data-acao-do-topo className="nt-vinculo inline-flex min-h-11 items-center gap-2 text-[16px] text-accent">
                <IconeWhatsApp className="size-4" />
                {site.acao}
              </a>
            </div>
          </div>
          {/* A faixa do índice: no celular, as três páginas numa linha só, de 340 px para cima; na mesa, entre o assunto da página e o número dela, o fólio que até 16.10.2026 vinha embaixo, com outro filete duplo. O filete corre sob o item (nutricao.css, "o índice"). */}
          <nav aria-label="Índice" className={`${envelope} nt-indice`}>
            <div className="nt-filete-duplo" />
            <div className="items-center gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
              <p className="nt-versal hidden text-[15px] leading-snug text-muted-foreground lg:block">{rotulo}</p>
              <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 py-0.5 min-[400px]:gap-x-5 sm:gap-x-12 sm:py-2">
                {site.paginas.map((p) => (
                  <li key={p.id}>
                    <Link href={p.caminho} aria-current={p.id === pagina ? "page" : undefined} className="inline-flex min-h-11 items-baseline gap-2 transition-colors duration-300 hover:text-accent sm:gap-3">
                      {/* O algarismo é do impresso; o leitor de tela lê só o nome da página (fechamento com o Impeccable, 16.10.2026). */}
                      <span aria-hidden="true" className="nt-exibicao text-[18px] text-muted-foreground italic min-[400px]:text-[19px] sm:text-[21px]">
                        {p.numero}
                      </span>
                      <span className="nt-indice-rotulo text-[16px] min-[400px]:text-[17px] sm:text-[18px]">{p.rotulo}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Na página que não existe (not-found.tsx, sem `pagina`), o fólio fica sem número. */}
              <p className="nt-versal hidden text-right text-[15px] text-muted-foreground lg:block">
                {atual >= 0 && `Página ${site.paginas[atual].numero} de ${total}`}
              </p>
            </div>
            <div className="h-px bg-foreground" />
          </nav>
        </header>
      </CabecalhoFixo>

      <main id="conteudo">
        {children}
      </main>

      {/* O colofão: quem atende, onde, como falar e como a folha foi composta. Do "Continua em" até ele, 144/176 px (até 03/10, 224 px). Na contracapa, o chapado da tinta verde, de ponta a ponta (nutricao.css, .nt-contracapa; 14.10.2026; até então, a palha com o filete de 2 px). */}
      <footer className="nt-contracapa mt-20 lg:mt-24">
        <div className={`${envelope} py-16 text-center lg:py-20`}>
          <MarcaDaNutricao className="mx-auto size-12" />
          <p className="nt-exibicao mt-6 text-[clamp(40px,4vw,56px)] leading-none">{site.nome}</p>
          <p className="nt-versal mt-3 text-[16px] text-muted-foreground">
            {site.profissional} · {site.credencial}
          </p>
          <p className="mx-auto mt-8 max-w-[60ch] text-[17px] leading-relaxed">
            {site.endereco} · {site.bairro}
            <br />
            {/* O número é vínculo (fechamento com o Impeccable, 16.10.2026); no corpo do texto, o alvo de 44 px vem do ::after, sem mexer na linha. */}
            <a href={vinculoWhatsApp} target="_blank" rel="noopener noreferrer" className="nt-vinculo relative after:absolute after:inset-x-0 after:top-1/2 after:h-11 after:-translate-y-1/2">
              WhatsApp {whatsappVisivel}
            </a>{" "}
            · presencial ou por vídeo
          </p>
          <ul aria-label="Páginas" className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-1">
            {site.paginas.map((p) => (
              <li key={p.id}>
                {/* Só o rótulo, sem o algarismo romano (crítico de fora, 14.10.2026: o romano fica no índice, no fólio, no "Continua em" e no método). */}
                <Link href={p.caminho} className="nt-vinculo inline-flex min-h-11 items-center text-[16px] transition-colors duration-300 hover:text-accent">
                  {p.rotulo}
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

      {/* O botão de WhatsApp do plano Essencial, sempre à mão; o rótulo aparece sob o ponteiro e no foco; pressionado, cede a 0,97 em 120 ms. No celular, recolhe ao rolar para baixo e enquanto o agendamento da linha do topo está na tela (ilha RecolherAoRolar). Na troca de página, fica parado (o grupo nt-flutuante, nutricao.css): até 14.10.2026, saía e entrava com a página, em duas cópias. */}
      <ViewTransition name="nt-flutuante" share="nt-flutuante-parado" default="nt-flutuante-parado">
        <a
          href={vinculoWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          data-recolhe
          className="nt-flutuante fixed right-6 bottom-6 z-30 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground transition-[filter,scale] duration-300 hover:brightness-110 active:brightness-90 active:duration-[120ms] motion-safe:active:scale-[.97] md:right-8 md:bottom-8"
        >
          <span className="nt-flutuante-rotulo pointer-events-none absolute right-full mr-3 rounded-full bg-foreground px-4 py-2 text-[15px] whitespace-nowrap text-background max-sm:sr-only">
            {site.acao}
          </span>
          <IconeWhatsApp className="size-6" />
        </a>
      </ViewTransition>
    </>
  );
}

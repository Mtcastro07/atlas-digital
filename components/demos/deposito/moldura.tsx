import Link from "next/link";

import { CabecalhoFixo } from "@/components/transicao-de-pagina";

import { abas, BotaoWhatsApp, envelope, vinculoWhatsApp, type IdDaPagina } from "@/components/demos/deposito/pecas";
import { IconeWhatsApp } from "@/components/icones";
import { EstadoDaLoja } from "@/components/ilhas/demos/estado-da-loja";
import { MarcaDoDeposito } from "@/components/nichos/marcas";
import { creditoDoPlano, seloDeFiccao, whatsappVisivel } from "@/conteudo/demos/comum";
import { depositoSite as site } from "@/conteudo/demos/deposito";

/**
 * A moldura de cada página do Depósito Engenhoca. O cabeçalho fica preso
 * no topo e tem duas faixas: a de grafite, com o estado da loja e o corte
 * da entrega ao vivo (ilha EstadoDaLoja), e a barra de cal, que vira
 * vidro ao rolar (ilha NavegacaoViva, no layout), com a marca, as cinco
 * abas numeradas — a da página aberta com o traço laranja — e o pedido
 * pelo WhatsApp. Embaixo, a faixa zebrada. O rodapé é a ficha da casa.
 * No celular, a barra encolhe (a marca numa linha, o WhatsApp numa
 * etiqueta só com o ícone) e as abas descem para uma faixa de grafite
 * logo abaixo do cabeçalho, que desliza de lado e rola com a página — o
 * cabeçalho preso fica com ~94 px, não ~150.
 */
export function Moldura({ pagina, children }: { pagina: IdDaPagina; children: React.ReactNode }) {
  return (
    <>
      <CabecalhoFixo>
        <header data-cabecalho className="sticky top-0 z-40">
          <div className="dp-grafite">
            <div className={`${envelope} dp-codigo flex min-h-9 items-center justify-between gap-6 py-1.5 text-[11.5px]`}>
              <p className="flex items-center gap-6" aria-live="off">
                <EstadoDaLoja status={site.status} expediente={site.expediente} horaDoCorte={site.horaDoCorte} />
              </p>
              <a href={vinculoWhatsApp} target="_blank" rel="noopener noreferrer" className="-my-2 hidden min-h-11 items-center gap-2 transition-colors duration-300 hover:text-accent sm:inline-flex">
                <IconeWhatsApp className="size-3.5" />
                WhatsApp {whatsappVisivel}
              </a>
            </div>
          </div>
          <div className="dp-barra bg-background">
            <div className={`${envelope} flex h-[60px] items-center justify-between gap-4 sm:gap-6 lg:h-[76px]`}>
              {/* A marca leva ao início; sob o ponteiro, o nome na cor de ação (até 03/10, sem hover). */}
              <Link href={site.caminho} className="flex min-h-11 min-w-0 items-center gap-3 transition-colors duration-300 hover:text-accent">
                <MarcaDoDeposito className="size-9 flex-none sm:size-11" />
                <span className="min-w-0 leading-none">
                  <span className="dp-exibicao block text-[18px] tracking-[0.03em] whitespace-nowrap sm:text-[21px]">{site.nome}</span>
                  <span className="dp-codigo mt-1.5 hidden text-[10.5px] text-muted-foreground sm:block">{site.descritor}</span>
                </span>
              </Link>
              <nav aria-label="Páginas" className="hidden h-full items-stretch lg:flex">
                {abas.map((aba) => (
                  <Link
                    key={aba.id}
                    href={aba.caminho}
                    aria-current={aba.id === pagina ? "page" : undefined}
                    className="dp-aba group flex items-center gap-2 px-3.5 text-muted-foreground transition-colors duration-300 hover:text-foreground aria-[current=page]:text-foreground xl:px-4"
                  >
                    <span className="dp-codigo text-[10.5px] text-accent">{aba.codigo}</span>
                    <span className="dp-exibicao text-[16px] tracking-[0.06em]">{aba.rotulo}</span>
                  </Link>
                ))}
              </nav>
              {/* O botão inteiro só a partir de 640 px: o invólucro some no celular e se dissolve (contents) depois. */}
              <span className="hidden sm:contents">
                <BotaoWhatsApp />
              </span>
              {/* No celular, a etiqueta só com o ícone. */}
              <a
                href={vinculoWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={site.acao}
                className="dp-chanfro dp-botao inline-flex size-11 flex-none items-center justify-center bg-primary text-primary-foreground sm:hidden"
              >
                <IconeWhatsApp className="size-5" />
              </a>
            </div>
          </div>
          <span aria-hidden="true" className="vd-zebrada block h-1.5" />
        </header>
      </CabecalhoFixo>

      {/* No celular e no tablet, as abas numeradas numa faixa de grafite que desliza de lado; a aberta, com o traço laranja (a ilha NavegacaoViva a traz para a vista). O texto da primeira aba começa na linha do envelope: 8 + 12 = 20 px, 28 + 12 = 40 px (até 03/10, 30 e 48 px), também depois do encaixe (scroll-px). A faixa rola de lado e por isso recorta o que passa da sua altura: o contorno do foco fica por dentro da aba (até 03/10, recortado). Sob o ponteiro e no toque, o texto acende, não só o traço. */}
      <nav aria-label="Páginas" data-abas-celular className="dp-grafite lg:hidden">
        <div className="flex snap-x scroll-px-2 gap-1 overflow-x-auto px-2 [scrollbar-width:none] md:scroll-px-7 md:px-7 [&::-webkit-scrollbar]:hidden">
          {site.paginas.map((aba) => (
            <Link
              key={aba.id}
              href={aba.caminho}
              aria-current={aba.id === pagina ? "page" : undefined}
              className="dp-aba flex min-h-12 flex-none snap-start items-center gap-2 px-3 text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:-outline-offset-4 active:text-foreground aria-[current=page]:text-foreground"
            >
              <span className="dp-codigo text-[10.5px] text-accent">{aba.codigo}</span>
              <span className="dp-exibicao text-[15px] tracking-[0.06em] whitespace-nowrap">{aba.rotulo}</span>
            </Link>
          ))}
        </div>
      </nav>

      <main id="conteudo">{children}</main>

      {/* O rodapé: a ficha da casa. */}
      <footer className="dp-grafite">
        <span aria-hidden="true" className="vd-zebrada block h-2" />
        <div className={`${envelope} pt-16 pb-10`}>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <p aria-hidden="true" className="dp-exibicao text-[clamp(52px,8.4vw,128px)] leading-[0.84] font-bold">
              {site.nome}
            </p>
            <p className="dp-codigo mb-2 text-muted-foreground">
              {site.codigo} · {site.descritor}
            </p>
          </div>
          <dl className="dp-mono mt-12 grid border-y border-border text-[13px] md:grid-cols-4">
            {[
              ["Endereço", `${site.endereco}, ${site.bairro}`],
              ["WhatsApp", whatsappVisivel],
              ["Horário", site.status.semScript],
              ["Entrega", "Caminhão próprio · corte às 15h"],
            ].map(([termo, valor]) => (
              <div key={termo} className="border-border px-0 py-5 max-md:border-b md:not-last:border-r md:px-5 md:first:pl-0 md:last:pr-0">
                <dt className="dp-codigo text-[10.5px] text-accent">{termo}</dt>
                <dd className="mt-2 leading-relaxed text-foreground">{valor}</dd>
              </div>
            ))}
          </dl>
          <nav aria-label="Páginas do site" className="mt-8">
            <ul className="flex flex-wrap gap-x-8 gap-y-1">
              {site.paginas.map((p) => (
                <li key={p.id}>
                  <Link href={p.caminho} className="inline-flex min-h-11 items-center gap-2 transition-colors duration-300 hover:text-accent">
                    <span className="dp-codigo text-[10.5px] text-muted-foreground">{p.codigo}</span>
                    <span className="dp-exibicao text-[15px] tracking-[0.06em]">{p.rotulo}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="dp-mono mt-8 flex flex-col gap-2 border-t border-border pt-6 text-[11.5px] leading-relaxed text-muted-foreground md:flex-row md:justify-between">
            <p className="max-w-[80ch]">{seloDeFiccao}</p>
            <p>{creditoDoPlano("Profissional")}</p>
          </div>
        </div>
      </footer>
    </>
  );
}

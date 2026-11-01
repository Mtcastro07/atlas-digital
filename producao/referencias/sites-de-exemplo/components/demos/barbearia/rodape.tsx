import Link from "next/link";

import { envelope, Selo } from "@/components/demos/barbearia/pecas";
import { IconeWhatsApp } from "@/components/icones";
import { creditoDoPlano, seloDeFiccao, whatsappVisivel } from "@/conteudo/demos/comum";
import { barbeariaSite as site } from "@/conteudo/demos/barbearia";

/**
 * O rodapé da Barbearia Santa Rosa, no layout, igual em todas as páginas:
 * o nome em cartaz com o selo que gira, o índice dos capítulos (#capitulos,
 * o destino do "Índice" da barra abaixo de 1024 px), o endereço, o WhatsApp
 * e o horário, e o selo de ficção. Fundo sólido: o palco 3D acaba aqui.
 */
export function Rodape() {
  return (
    <footer className="bg-deep">
      <div className="bb-faixas h-2" data-ambiente aria-hidden="true" />
      <div className={`${envelope} pt-20 pb-10`}>
        <div className="flex items-end justify-between gap-10">
          <p aria-hidden="true" className="bb-exibicao text-[clamp(56px,10vw,170px)] leading-[0.84] tracking-[-0.02em]">
            <span className="block">Barbearia</span>
            <span className="block italic">Santa Rosa</span>
          </p>
          <Selo id="selo-do-rodape" girar className="hidden w-[220px] flex-none md:block" />
        </div>
        <nav id="capitulos" aria-label="Capítulos do site" className="mt-16 border-t border-border">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
            {site.paginas.map((p) => (
              <li key={p.id} className="border-b border-border">
                {/* O mesmo recuo da lista de capítulos do início (até 03/10, 16 × 16 px aqui e 24 × 12 px lá). */}
                <Link href={p.caminho} className="bb-capitulo flex min-h-14 items-baseline gap-4 py-5 pr-4">
                  <span className="text-[11px] tracking-[0.2em] text-primary">{p.numero}</span>
                  <span className="bb-exibicao text-[26px] leading-none">{p.rotulo}</span>
                  <span aria-hidden="true" className="bb-capitulo-seta ml-auto text-muted-foreground">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-12 grid gap-8 text-[14.5px] md:grid-cols-3">
          <p>
            {site.endereco}
            <br />
            <span className="text-muted-foreground">{site.bairro}</span>
          </p>
          <p className="flex items-start gap-2.5">
            <IconeWhatsApp className="mt-0.5 size-4 text-accent" />
            <span>
              WhatsApp {whatsappVisivel}
              <br />
              <span className="text-muted-foreground">Confirmação por resposta</span>
            </span>
          </p>
          <p>
            {site.horarioCurto[0]}
            <br />
            <span className="text-muted-foreground">{site.horarioCurto[1]}</span>
          </p>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-[12.5px] text-muted-foreground md:flex-row md:justify-between">
          <p className="max-w-[80ch]">{seloDeFiccao}</p>
          <p>{creditoDoPlano("Completo")}</p>
        </div>
      </div>
    </footer>
  );
}

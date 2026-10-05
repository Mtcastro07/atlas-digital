import Link from "next/link";

import { atraso, BotaoDeLatao, capitulos, cena, envelope, Faixa, metadadosDe, paginaDe, Selo, textoEmbaixo, TituloQueSeCompoe, VinculoDeFio } from "@/components/demos/barbearia/pecas";
import { barbeariaSite as site } from "@/conteudo/demos/barbearia";
import { ShimmerText } from "@/components/ui/spell/shimmer-text";

export const metadata = metadadosDe("inicio");

/**
 * Início. A capa com a moeda da casa em 3D à direita (o selo em relevo de
 * latão, a borda serrilhada) e o título que se compõe; depois, três cenas,
 * cada uma com a sua ficha, que vira da anterior como uma moeda: a de
 * alpaca d'A Navalha, a oitavada d'O Clássico e a placa de bronze de 1996.
 * No fim, os capítulos (as outras seis páginas), com a placa das cadeiras.
 */
export default function InicioDaBarbearia() {
  const { capa, cenas } = site;
  return (
    <div className="bb-pagina">
      <section aria-labelledby="titulo" {...cena(capa.objeto, "direita")} data-com-reserva className={`relative flex min-h-[112vh] items-center pt-32 pb-24 ${textoEmbaixo}`}>
        <div className={`${envelope} relative w-full`}>
          <div className="lg:max-w-[60%]">
            <p className="mov-entra bb-rotulo flex flex-wrap gap-x-8 gap-y-1 text-muted-foreground" style={atraso(150)}>
              <span>{capa.rotulo}</span>
              {/* Um brilho de latão atravessa o ano (Spell UI, Shimmer Text; ambiente, pausável pela barra). */}
              <ShimmerText className="text-accent">{capa.desde}</ShimmerText>
            </p>
            <TituloQueSeCompoe
              id="titulo"
              linhas={capa.titulo}
              destaque={capa.destaque}
              inicio={250}
              className="mt-8 text-[clamp(72px,10.6vw,180px)] leading-[0.86] tracking-[-0.02em]"
            />
            <p className="mov-entra mt-10 max-w-[44ch] text-[18px] leading-relaxed text-muted-foreground" style={atraso(950)}>
              {capa.lide}
            </p>
            <div className="mov-entra mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={atraso(1100)}>
              <BotaoDeLatao href={paginaDe("agendar").caminho}>
                {site.acao}
              </BotaoDeLatao>
              <VinculoDeFio href={paginaDe("servicos").caminho}>{capa.secundaria}</VinculoDeFio>
            </div>
          </div>
        </div>
        {/* A reserva do 3D: o selo em traço, que se desenha (sem script ou sem WebGL). */}
        <div className="bb-reserva pointer-events-none absolute top-1/2 right-[4vw] w-[min(36vw,540px)] -translate-y-1/2">
          <Selo id="selo-da-capa" desenhar className="w-full" />
        </div>
        <p aria-hidden="true" className="bb-rotulo absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-muted-foreground max-lg:hidden">
          Role
          <span className="h-10 w-px bg-gradient-to-b from-primary to-transparent" />
        </p>
      </section>

      {cenas.map((c) => (
        <section key={c.id} aria-labelledby={`cena-${c.id}`} {...cena(c.objeto, c.lado)} className={`flex min-h-[125vh] items-center py-24 ${textoEmbaixo}`}>
          <div className={`${envelope} grid w-full lg:grid-cols-12`}>
            <div className={c.lado === "esquerda" ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-5"} data-revelar>
              <p className="bb-rotulo text-accent">{c.rotulo}</p>
              <h2 id={`cena-${c.id}`} className="bb-exibicao mt-6 text-[clamp(56px,6.4vw,112px)] leading-[0.9]">
                <span className="block">{c.titulo[0]}</span>
                <span className="block italic">{c.titulo[1]}</span>
              </h2>
              <p className="mt-8 max-w-[40ch] text-[18px] leading-relaxed text-muted-foreground">{c.texto}</p>
              <div className="mt-8">
                <VinculoDeFio href={paginaDe(c.vinculo.pagina).caminho}>{c.vinculo.rotulo}</VinculoDeFio>
              </div>
            </div>
          </div>
        </section>
      ))}

      <Faixa />

      {/* Os capítulos: as outras seis páginas, com a placa das cadeiras em cena. */}
      <section aria-labelledby="capitulos-da-casa" {...cena("cadeiras", "direita", { soComputador: true })} className="py-32">
        <div className={envelope}>
          <div className="lg:max-w-[60%]">
            <p className="bb-rotulo text-accent">Capítulos</p>
            <h2 id="capitulos-da-casa" className="bb-exibicao mt-6 text-[clamp(52px,6vw,100px)] leading-[0.9]">
              <span className="block">{site.capitulos.titulo[0]}</span>
              <span className="block italic">{site.capitulos.titulo[1]}</span>
            </h2>
            <p className="mt-6 max-w-[46ch] text-[17px] text-muted-foreground">{site.capitulos.lide}</p>
            <ol className="mt-12 border-t border-border">
              {capitulos.map((p, i) => (
                <li key={p.id} data-revelar style={atraso(i * 70)} className="border-b border-border">
                  {/* O mesmo recuo do índice do rodapé (até 03/10, 24 × 12 px aqui e 16 × 16 px lá). */}
                  <Link href={p.caminho} className="bb-capitulo flex items-center gap-6 py-5 pr-4">
                    <span className="bb-rotulo w-8 flex-none text-primary">{p.numero}</span>
                    <span className="bb-exibicao flex-none text-[clamp(36px,3.4vw,54px)] leading-none">{p.rotulo}</span>
                    <span className="ml-auto hidden max-w-[28ch] text-right text-[14.5px] leading-snug text-muted-foreground md:block">{p.resumo}</span>
                    <span aria-hidden="true" className="bb-capitulo-seta flex-none text-[20px] text-accent">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}

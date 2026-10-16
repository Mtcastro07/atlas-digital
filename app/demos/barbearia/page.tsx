import Link from "next/link";

import { PreviaDosCapitulos } from "@/components/demos/barbearia/previa-dos-capitulos";
import { atraso, BotaoDeLatao, capitulos, cena, CenaDoCouro, envelope, metadadosDe, MiniFicha, paginaDe, Selo, Tesoura, textoEmbaixo, TituloQueSeCompoe, VinculoDeFio } from "@/components/demos/barbearia/pecas";
import { barbeariaSite as site } from "@/conteudo/demos/barbearia";
import { ShimmerText } from "@/components/ui/spell/shimmer-text";

export const metadata = metadadosDe("inicio");

/**
 * Início, em cinco cenas, cada uma com a sua peça e o seu momento:
 * 1. a capa: a moeda da casa em 3D à direita e o título que se compõe (uma
 *    vez por visita: o único título do site que se compõe);
 * 2. a navalha: a ficha de alpaca, que vira da moeda (no celular, desde
 *    16/10, embaixo do texto, grande e cortada pela borda: a capa e a
 *    navalha eram a mesma moldura, a ficha no alto e o texto embaixo);
 * 3. a tesoura: a bancada (outro fundo), o título em cartaz centrado e a
 *    tesoura em traço de latão, que se fecha ao chegar e corta sob o ponteiro;
 * 4. o couro: o estado ao vivo, o poste que gira só com a casa aberta e a
 *    luz da luminária sob o ponteiro;
 * 5. os capítulos (as outras seis páginas), com a placa das cadeiras, que
 *    vira para a ficha do capítulo sob o ponteiro.
 * Correção de 14/10, depois do crítico de fora: eram três cenas seguidas no
 * mesmo molde (a ficha de um lado; o rótulo, o título, o texto e o vínculo
 * do outro), a terceira com o título de A casa; e o letreiro sem fim entre
 * as listras do poste. Saíram a cena de 1996 e o letreiro; o índice do
 * rodapé some nesta página (barbearia.css), porque os capítulos, logo
 * acima, já são a mesma lista.
 */
export default function InicioDaBarbearia() {
  const { capa } = site;
  const { navalha, tesoura } = site.cenas;
  return (
    <div>
      <section aria-labelledby="titulo" {...cena(capa.objeto, "direita")} data-com-reserva className={`relative flex min-h-[112vh] items-center pt-32 pb-24 ${textoEmbaixo}`}>
        <div className={`${envelope} relative w-full`}>
          <div className="lg:max-w-[60%]">
            <p className="mov-entra bb-rotulo flex flex-wrap gap-x-8 gap-y-1 text-muted-foreground" style={atraso(150)}>
              <span>{capa.rotulo}</span>
              {/* O brilho de latão atravessa o ano três vezes depois que a capa entra na tela, e para (Spell UI, Shimmer Text; barbearia.css). */}
              <ShimmerText className="text-accent">{capa.desde}</ShimmerText>
            </p>
            <TituloQueSeCompoe id="titulo" compor linhas={capa.titulo} inicio={250} className="mt-8 text-[clamp(72px,10.6vw,180px)] leading-[0.86] tracking-[-0.02em]" />
            <p className="mov-entra mt-10 max-w-[44ch] text-[18px] leading-relaxed text-muted-foreground" style={atraso(950)}>
              {capa.lide}
            </p>
            <div className="mov-entra mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={atraso(1100)}>
              <BotaoDeLatao href={paginaDe("agendar").caminho} ima>
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
        {/* Saiu o "Role" (16/10, o Impeccable): ao pé de uma capa de 112vh, só entrava na tela depois de rolar, entre
            250 e 750 px, e passava por baixo da moeda que atravessa o meio da tela para a navalha. */}
      </section>

      {/* No celular (desde 16/10; o crítico de fora: a capa e a navalha, seguidas, na mesma moldura, a ficha centrada no
          alto e o texto embaixo, só com outro metal), a navalha inverte: o texto em cima e a moeda embaixo, grande, no
          lugar que a caixa [data-lugar] dá a ela, cortada pela borda esquerda e pela bancada da cena seguinte. */}
      <section
        aria-labelledby="cena-navalha"
        {...cena(navalha.objeto, "esquerda")}
        className="bb-cena-sangria relative flex min-h-[125vh] items-center py-24 max-lg:min-h-[100svh] max-lg:items-start max-lg:overflow-x-clip max-lg:pt-28"
      >
        <span aria-hidden="true" data-lugar className="bb-lugar-sangria lg:hidden" />
        <div className={`${envelope} grid w-full lg:grid-cols-12`}>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 id="cena-navalha" className="bb-exibicao text-[clamp(56px,6.4vw,112px)] leading-[0.9]">
              <span className="block">{navalha.titulo[0]}</span>
              <span className="block">{navalha.titulo[1]}</span>
            </h2>
            {/* Termina no texto (desde 15/10): "Ver os serviços" já está na capa, uma tela acima; o momento da cena é a ficha. */}
            <p className="mt-8 max-w-[40ch] text-[18px] leading-relaxed text-muted-foreground">{navalha.texto}</p>
          </div>
        </div>
      </section>

      {/* A tesoura, sobre a bancada: fundo sólido (cobre a ficha, que vira escondida para a dos capítulos), o título em cartaz, centrado, e a peça. */}
      <section aria-labelledby="cena-tesoura" className="bb-bancada overflow-hidden py-28 text-center lg:py-36">
        <div className={envelope}>
          <h2 id="cena-tesoura" className="bb-exibicao mx-auto text-[clamp(60px,10.4vw,176px)] leading-[0.86] tracking-[-0.02em]">
            <span className="block">{tesoura.titulo[0]}</span>
            <span className="block">{tesoura.titulo[1]}</span>
          </h2>
          <div data-cena data-toque style={{ "--p": 1 } as React.CSSProperties} className="bb-tesoura mx-auto mt-10 w-[min(84vw,600px)] lg:mt-14">
            <Tesoura className="w-full" />
          </div>
          <p className="mx-auto mt-10 max-w-[44ch] text-[18px] leading-relaxed text-muted-foreground">{tesoura.texto}</p>
          <div className="mt-8">
            <VinculoDeFio href={paginaDe(tesoura.vinculo.pagina).caminho}>{tesoura.vinculo.rotulo}</VinculoDeFio>
          </div>
        </div>
      </section>

      <CenaDoCouro />

      {/* Os capítulos: as outras seis páginas, com a placa das cadeiras em cena, que vira para a ficha do capítulo sob o ponteiro (300 ms, data-virada). */}
      <section aria-labelledby="capitulos-da-casa" {...cena("cadeiras", "direita", { soComputador: true })} data-virada="300" className="py-32">
        <div className={envelope}>
          <div className="lg:max-w-[60%]">
            <h2 id="capitulos-da-casa" className="bb-exibicao text-[clamp(52px,6vw,100px)] leading-[0.9]">
              <span className="block">{site.capitulos.titulo[0]}</span>
              <span className="block">{site.capitulos.titulo[1]}</span>
            </h2>
            <p className="mt-6 max-w-[46ch] text-[17px] text-muted-foreground">{site.capitulos.lide}</p>
            {/* O único bloco do site que entra em sequência ao rolar (600 ms, 60 ms por linha; barbearia.css, .bb-capitulos).
                A partir de 1024 px, a lista para antes da faixa da ficha (54% do envelope; até 14/10, 60%, e as setas
                ficavam sob a borda da placa, de 1024 a 1440 px). */}
            <PreviaDosCapitulos className="bb-capitulos mt-12 border-t border-border lg:max-w-[90%]">
              {capitulos.map((p, i) => (
                <li key={p.id} data-revelar data-previa={site.capitulos.previas[p.id]} style={atraso(i * 60)} className="border-b border-border">
                  {/* O mesmo recuo do índice do rodapé (até 03/10, 24 × 12 px aqui e 16 × 16 px lá). */}
                  <Link href={p.caminho} className="bb-capitulo flex items-center gap-6 py-5 pr-4">
                    <span className="bb-rotulo w-8 flex-none text-primary">{p.numero}</span>
                    <span className="bb-exibicao flex-none text-[clamp(36px,3.4vw,54px)] leading-none">{p.rotulo}</span>
                    <span className="ml-auto hidden max-w-[28ch] text-right text-[14.5px] leading-snug text-muted-foreground md:block">{p.resumo}</span>
                    <span aria-hidden="true" className="bb-capitulo-seta flex-none text-[20px] text-accent max-lg:hidden">
                      →
                    </span>
                    {/* Abaixo de 1024 px, a ficha não vira sob o ponteiro: a miniatura dela, parada, no lugar da seta. */}
                    <MiniFicha objeto={site.capitulos.previas[p.id]} className="size-10 flex-none max-md:ml-auto lg:hidden" />
                  </Link>
                </li>
              ))}
            </PreviaDosCapitulos>
          </div>
        </div>
      </section>
    </div>
  );
}

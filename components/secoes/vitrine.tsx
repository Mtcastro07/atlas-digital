import { Fragment } from "react";

import { Celular } from "@/components/aparelho/celular";
import { Abertura, Envelope, Secao } from "@/components/estrutura";
import { CotasDaVitrine } from "@/components/ilhas/cotas-da-vitrine";
import { fonteDoNicho, fontesDosNichos } from "@/components/nichos/fontes";
import { formaDosNichos } from "@/components/nichos/forma";
import { marcasDosNichos } from "@/components/nichos/marcas";
import { Apoio } from "@/components/tipografia";
import { demonstrativos } from "@/conteudo/nichos";
import { vitrine } from "@/conteudo/site";

/**
 * Os dois demonstrativos, cada um com notas numeradas ligadas aos
 * marcadores da tela (hover em um destaca o outro, app/vidro.css).
 * No celular, um por vez: o seletor são rádios nativos e a troca é CSS
 * (.vd-alternador) — funciona sem script e pelo teclado; o que entra só
 * se acende. A opção não escolhida clareia sob o ponteiro (desde 03/10,
 * regra 4: antes, só a escolhida mudava de cor). A partir de 1024 px, os
 * dois lado a lado.
 * Da branchCto, a identidade de cada nicho (components/nichos/): a marca
 * e o nome da casa na fonte e na postura dela, e o aparelho sobre um palco
 * no tom do nicho, com o padrão gerado da marca (parede de blocos e fita
 * zebrada; manchas de horta).
 * Desde 16/10 ("Identidade mais profunda"), na pedra: os públicos, logo
 * acima, são a névoa, e a pedra separa as duas cenas claras sem ir ao navy
 * (ΔL de 0,050). Os dois aparelhos são objetos sob a mesma luz da manhã,
 * com a sombra média para o oeste (a do aparelho, app/vidro.css).
 * Desde 17/10 (a direção final do Atlas Digital, seção 3, item 11), os
 * marcadores de 1 a 4 viram cotas: com 30 rem de demonstrativo ou mais (a
 * mesa), cada nota fica ao lado do aparelho, à altura do seu marcador, e o
 * fio de chamada vai do elemento da tela até o número dela
 * (ilhas/cotas-da-vitrine.tsx); abaixo disso, a lista numerada embaixo, como
 * antes, e, desde 18/10 (o passe do celular), o número de cada nota também no palco, ao lado do aparelho, à altura do
 * seu marcador, com o fio de chamada até ele: o marcador da tela vira ponto, e nenhum algarismo fica sobre a tela. O aparelho deixou de inclinar sob o ponteiro (o Tilt Card de 03/10):
 * a cota sai de um ponto da tela, e a tela tem de ficar onde o fio a encontra.
 * O palco, no raio do instrumento (--r-instrumento).
 */
export function Vitrine() {
  return (
    // pb-12 md:pb-18 (17/10, passe 4): depois da legenda, meio respiro, e não o inteiro (sobravam 229 px de pedra entre
    // as notas e o fim da seção, na mesa; 181 no celular); a legenda sobe para 40 px das notas que ela explica.
    <Secao id="vitrine" tom="pedra" className="pb-12 md:pb-18">
      <Envelope className="vd-alternador">
        {/* Centrada na mesa: a cena de cima, os públicos, é na margem e no mesmo tom (de 14 a 16/10, o contrário,
            quando os públicos eram três blocos centrados). Fora da mesa, desde 18/10 (o passe do celular), à esquerda,
            como o resto da página: centrado, o lide corria em seis linhas de margem irregular dos dois lados. */}
        <Abertura titulo={vitrine.titulo} lide={vitrine.texto} className="max-lg:text-left max-lg:[&>*]:mx-0" />

        {/* min-w-0: o fieldset tem largura mínima no conteúdo; com a letra a 200%, alargava a página (16/10). */}
        {/* @container: com a letra a 200%, as opções perdem o recuo dos lados (17/10); antes, "Nutrição" passava da tela. A
            320, nem assim cabiam: desde 18/10, a opção quebra com hífen (min-w-0, hyphens-auto). */}
        <fieldset className="@container mt-10 w-full max-w-sm min-w-0 lg:hidden">
          <legend className="sr-only">{vitrine.seletor}</legend>
          <div className="vd-vidro vd-segmento" style={{ "--n": demonstrativos.length, "--i": 0 } as React.CSSProperties}>
            <span aria-hidden="true" className="vd-segmento-cursor" />
            {demonstrativos.map((d, i) => (
              <label key={d.id} className="group/opcao relative z-[1] flex min-h-11 cursor-pointer items-center justify-center">
                <input type="radio" name="demonstrativo" value={d.id} defaultChecked={i === 0} className="peer sr-only" />
                <span className="min-w-0 rounded-full px-3 py-1 text-center text-nota font-semibold hyphens-auto @max-[14rem]:px-0 text-muted-foreground transition-colors duration-300 group-hover/opcao:text-foreground peer-checked:text-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-ring">
                  {d.rotuloCurto}
                </span>{" "}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-12 grid gap-20 lg:mt-20 lg:grid-cols-2 lg:gap-12">
          {demonstrativos.map((d) => {
            const Marca = marcasDosNichos[d.id];
            const forma = formaDosNichos[d.id];
            return (
              // @container: as cotas só com 30 rem de demonstrativo ou mais (a mesa; com a letra a 200%, não).
              <article key={d.id} data-demonstrativo={d.id} data-anotacoes data-cotas className={`@container/demo relative vd-troca ${fontesDosNichos[d.id]}`}>
                <header data-nicho={d.id} className="flex flex-col items-start">
                  <Marca className="size-11" />
                  {/* O nicho sob o nome, como legenda (17/10): acima dele, era o sobretítulo (a marca T2). */}
                  <h3 className={`mt-3 text-destaque ${fonteDoNicho} ${forma.nome}`}>{d.casa}</h3>
                  <p className="mt-1 text-nota text-muted-foreground">{d.nicho}</p>
                </header>
                <div className="mt-8 @min-[30rem]/demo:grid @min-[30rem]/demo:grid-cols-[auto_minmax(0,1fr)] @min-[30rem]/demo:items-start @min-[30rem]/demo:gap-x-7">
                  {/* O palco: o tom e o padrão do nicho atrás do aparelho. O aparelho não inclina sob o ponteiro desde
                      17/10: as cotas saem de pontos da tela, e a tela tem de ficar onde o fio a encontra. */}
                  <div data-tom={d.id} data-palco className={`relative overflow-hidden rounded-[var(--r-instrumento)] bg-deep px-6 py-10 md:py-12 @min-[30rem]/demo:px-5 @min-[30rem]/demo:py-8 ${forma.fundo}`}>
                    {d.id === "deposito" && <span aria-hidden="true" className="vd-zebrada absolute inset-x-0 top-0 h-2" />}
                    <Celular src={d.imagem} alt={d.descricao} marcadores={d.marcadores} className="relative mx-auto w-[min(76%,300px)] @min-[30rem]/demo:w-[13.5rem]" />
                  </div>
                  {/* Fora da mesa (18/10), -mx-3: o número de cada nota no alinhamento do texto da página, e não 12 px para
                      dentro (o p-3 é o fundo da nota sob a mão). */}
                  <ol className="-mx-3 mt-10 max-w-md space-y-1 [--cotas:2] @min-[30rem]/demo:mx-0 @min-[30rem]/demo:mt-0 @min-[30rem]/demo:space-y-0 @min-[30rem]/demo:[--cotas:1]">
                    {d.notas.map((nota, i) => (
                      <li key={nota} data-nota={i + 1} className="vd-nota flex gap-3.5 rounded-lg p-3 text-nota text-muted-foreground @min-[30rem]/demo:px-2 @min-[30rem]/demo:py-1.5">
                        <span
                          data-numero
                          aria-hidden="true"
                          className="grid size-6 flex-none place-items-center rounded-full border border-foreground/30 text-rotulo font-bold text-foreground tabular-nums"
                        >
                          {i + 1}
                        </span>{" "}
                        {/* Hífen só na lista embaixo (18/10): com a letra a 200% a 320, "funcionamento" passava da nota e
                            alargava a página. Nas cotas da mesa, não: a quebra das notas fica a de antes. */}
                        <span className="min-w-0 pt-0.5 @max-[30rem]/demo:hyphens-auto">{nota}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                {/* Os fios de chamada, do marcador na tela ao número da nota (ilhas/cotas-da-vitrine.tsx). */}
                <svg data-fios aria-hidden="true" className="vd-fios-de-chamada pointer-events-none absolute inset-0 size-full overflow-visible" />
                {/* Fora da mesa, os números ao lado do aparelho, no palco, à altura do marcador (a ilha os põe e liga o fio),
                    e o marcador da tela vira ponto: nenhum algarismo sobre a tela do site. Sem script, não aparecem. */}
                {/* O espaço entre os números: no HTML, sem ele, o robô lia "1234" (texto-do-robo.mjs). */}
                {d.notas.map((nota, i) => (
                  <Fragment key={nota}>
                    <span data-cota={i + 1} aria-hidden="true" className="vd-cota-numero">
                      {i + 1}
                    </span>{" "}
                  </Fragment>
                ))}
              </article>
            );
          })}
        </div>
        <CotasDaVitrine />

        <Apoio className="mt-10 text-nota lg:mx-auto lg:text-center">{vitrine.nota}</Apoio>
      </Envelope>
    </Secao>
  );
}

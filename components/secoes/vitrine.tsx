import { Celular } from "@/components/aparelho/celular";
import { Abertura, Envelope, Secao } from "@/components/estrutura";
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
 */
export function Vitrine() {
  return (
    // pb-12 md:pb-18 (17/10, passe 4): depois da legenda, meio respiro, e não o inteiro (sobravam 229 px de pedra entre
    // as notas e o fim da seção, na mesa; 181 no celular); a legenda sobe para 40 px das notas que ela explica.
    <Secao id="vitrine" tom="pedra" className="pb-12 md:pb-18">
      <Envelope className="vd-alternador">
        {/* Centrada: a cena de cima, os públicos, é na margem e no mesmo tom (de 14 a 16/10, o contrário,
            quando os públicos eram três blocos centrados). */}
        <Abertura titulo={vitrine.titulo} lide={vitrine.texto} />

        {/* min-w-0: o fieldset tem largura mínima no conteúdo; com a letra a 200%, alargava a página (16/10). */}
        {/* @container: com a letra a 200%, as opções perdem o recuo dos lados (17/10); antes, "Nutrição" passava da tela. */}
        <fieldset className="@container mx-auto mt-10 w-full max-w-sm min-w-0 lg:hidden">
          <legend className="sr-only">{vitrine.seletor}</legend>
          <div className="vd-vidro vd-segmento" style={{ "--n": demonstrativos.length, "--i": 0 } as React.CSSProperties}>
            <span aria-hidden="true" className="vd-segmento-cursor" />
            {demonstrativos.map((d, i) => (
              <label key={d.id} className="group/opcao relative z-[1] flex min-h-11 cursor-pointer items-center justify-center">
                <input type="radio" name="demonstrativo" value={d.id} defaultChecked={i === 0} className="peer sr-only" />
                <span className="rounded-full px-3 py-1 text-nota font-semibold @max-[14rem]:px-0 text-muted-foreground transition-colors duration-300 group-hover/opcao:text-foreground peer-checked:text-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-ring">
                  {d.rotuloCurto}
                </span>{" "}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-12 grid gap-20 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          {demonstrativos.map((d) => {
            const Marca = marcasDosNichos[d.id];
            const forma = formaDosNichos[d.id];
            return (
              <article key={d.id} data-demonstrativo={d.id} data-anotacoes className={`vd-troca ${fontesDosNichos[d.id]}`}>
                <header data-nicho={d.id} className="flex flex-col items-center text-center">
                  <Marca className="size-11" />
                  {/* O nicho sob o nome, como legenda (17/10): acima dele, era o sobretítulo (a marca T2). */}
                  <h3 className={`mt-3 text-destaque ${fonteDoNicho} ${forma.nome}`}>{d.casa}</h3>
                  <p className="mt-1 text-nota text-muted-foreground">{d.nicho}</p>
                </header>
                {/* O palco: o tom e o padrão do nicho atrás do aparelho. */}
                <div data-tom={d.id} className={`relative mt-8 overflow-hidden rounded-xl bg-deep px-6 py-10 md:py-12 ${forma.fundo}`}>
                  {d.id === "deposito" && <span aria-hidden="true" className="vd-zebrada absolute inset-x-0 top-0 h-2" />}
                  <Celular src={d.imagem} alt={d.descricao} marcadores={d.marcadores} inclina className="relative mx-auto w-[min(76%,300px)]" />
                </div>
                <ol className="mx-auto mt-10 max-w-md space-y-1">
                  {d.notas.map((nota, i) => (
                    <li key={nota} data-nota={i + 1} className="vd-nota flex gap-3.5 rounded-lg p-3 text-nota text-muted-foreground">
                      <span
                        data-numero
                        aria-hidden="true"
                        className="grid size-6 flex-none place-items-center rounded-full border border-accent text-rotulo font-bold text-accent tabular-nums"
                      >
                        {i + 1}
                      </span>{" "}
                      <span className="pt-0.5">{nota}</span>
                    </li>
                  ))}
                </ol>
              </article>
            );
          })}
        </div>

        <Apoio className="mx-auto mt-10 text-center text-nota">{vitrine.nota}</Apoio>
      </Envelope>
    </Secao>
  );
}

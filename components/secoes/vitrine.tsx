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
 */
export function Vitrine() {
  return (
    <Secao id="vitrine" tom="claro">
      <Envelope className="vd-alternador">
        <Abertura titulo={vitrine.titulo} lide={vitrine.texto} />

        <fieldset className="mx-auto mt-10 w-full max-w-sm lg:hidden">
          <legend className="sr-only">{vitrine.seletor}</legend>
          <div className="vd-vidro vd-segmento" style={{ "--n": demonstrativos.length, "--i": 0 } as React.CSSProperties}>
            <span aria-hidden="true" className="vd-segmento-cursor" />
            {demonstrativos.map((d, i) => (
              <label key={d.id} className="group/opcao relative z-[1] flex min-h-11 cursor-pointer items-center justify-center">
                <input type="radio" name="demonstrativo" value={d.id} defaultChecked={i === 0} className="peer sr-only" />
                <span className="rounded-full px-3 py-1 text-nota font-semibold text-muted-foreground transition-colors duration-300 group-hover/opcao:text-foreground peer-checked:text-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-ring">
                  {d.rotuloCurto}
                </span>
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
                  <p className="mt-3 text-rotulo font-semibold text-accent">{d.nicho}</p>
                  <h3 className={`mt-1 text-destaque ${fonteDoNicho} ${forma.nome}`}>{d.casa}</h3>
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
                      </span>
                      <span className="pt-0.5">{nota}</span>
                    </li>
                  ))}
                </ol>
              </article>
            );
          })}
        </div>

        <Apoio className="mx-auto mt-16 text-center text-nota">{vitrine.nota}</Apoio>
      </Envelope>
    </Secao>
  );
}

import { Abertura, Envelope, Secao } from "@/components/estrutura";
import { Subtitulo } from "@/components/tipografia";
import { trabalho } from "@/conteudo/site";

/**
 * As quatro etapas numa linha do tempo: um traço liga cada número ao
 * seguinte — na vertical no celular, na horizontal a partir de 1024 px.
 * É uma sequência, por isso os números. No hover, o número acende em
 * bronze.
 * A partir de 1024 px, número, título e texto ocupam três linhas comuns
 * às quatro colunas (subgrid): um título que quebra em duas linhas não
 * desalinha os textos das outras etapas. No pé de cada coluna, a marca da
 * etapa em número de bronze — uma visita, 24 h, duas rodadas, 7 a 15 dias
 * úteis —, com o rótulo embaixo, as quatro na mesma linha: o prazo como
 * peça gráfica. Desde 02/10, o prazo total não se repete numa linha à
 * parte: está na marca da última etapa.
 */
export function Trabalho() {
  const ultimo = trabalho.passos.length - 1;

  return (
    <Secao id="trabalho" tom="claro">
      <Envelope>
        <Abertura titulo={trabalho.titulo} />
        <ol className="mx-auto mt-16 grid max-w-xl gap-12 md:mt-20 lg:max-w-none lg:grid-cols-4 lg:grid-rows-[auto_auto_1fr] lg:gap-x-10 lg:gap-y-0">
          {trabalho.passos.map((passo, i) => (
            <li key={passo.titulo} className="group relative grid grid-cols-[2.5rem_1fr] gap-x-5 lg:row-span-3 lg:grid-cols-1 lg:grid-rows-subgrid lg:gap-y-0">
              {i < ultimo && (
                // Do número desta etapa ao da próxima, com 0,5 rem de folga em cada ponta.
                <span
                  aria-hidden="true"
                  className="absolute top-12 -bottom-10 left-5 w-px bg-foreground/20 lg:top-5 lg:-right-8 lg:bottom-auto lg:left-12 lg:h-px lg:w-auto"
                />
              )}
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-full bg-secondary font-display text-nota text-secondary-foreground transition-colors duration-400 ease-atlas group-hover:bg-primary group-hover:text-primary-foreground"
              >
                {i + 1}
              </span>
              <div className="pt-2 lg:contents">
                <Subtitulo className="lg:mt-6 lg:pr-2">{passo.titulo}</Subtitulo>
                {/* O texto e, no pé da coluna, a marca da etapa em número (as quatro alinhadas na mesma linha). */}
                <div className="mt-3 flex flex-col lg:mt-4 lg:pr-2">
                  <p className="text-corpo text-muted-foreground">{passo.texto}</p>
                  <p className="mt-6 lg:mt-auto lg:pt-10">
                    <span className="block font-display tracking-titulo text-numero whitespace-nowrap text-accent tabular-nums">
                      {passo.marca.valor}
                    </span>
                    <span className="mt-2 block text-nota text-muted-foreground">{passo.marca.rotulo}</span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Envelope>
    </Secao>
  );
}

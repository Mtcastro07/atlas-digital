import { Envelope, Secao } from "@/components/estrutura";
import { trabalho } from "@/conteudo/site";

/**
 * As quatro etapas como um cronograma, em linhas: a marca da etapa (uma
 * visita, 24 h, duas rodadas, 7 a 15 dias úteis), o nome e o texto. A
 * partir de 1024 px, a marca abre a linha, como a hora numa agenda; no
 * leitor de tela e no celular, o nome vem primeiro. A ordem das linhas é a
 * da sequência. A régua do prazo, na abertura, é a linha do tempo; aqui, o
 * que acontece em cada trecho. Com o ponteiro, o nome da linha acende em
 * bronze (a lista que acende: 09-movimento.md, seção 13.2).
 * Até 16/10, uma linha do tempo de círculos numerados (1 a 4) ligados por
 * um traço, com a marca de cada etapa em número grande no pé da coluna: a
 * mesma peça da história de O Atlas, a página seguinte do percurso, e o
 * número com legenda que o início já mostra na pilha (o crítico de fora).
 * Desde 14/10, no branco da abertura, que continua até as etapas: o creme
 * logo depois do branco ficava a 0,035 de L (OKLab), abaixo dos 0,04 de
 * uma virada de cena, e se lia como emenda. E o título "Quatro etapas.
 * Nenhuma delas opcional." fica só no nome da região, para leitor de tela:
 * é o mesmo das caixas do início, e aqui o h1 e a régua do prazo já abrem o
 * assunto; as etapas são h2.
 * Desde 16/10 ("Identidade mais profunda"), na névoa, como a abertura (o
 * branco saiu como campo de cena), e sem os filetes: o espaço agrupa. A
 * marca de cada etapa vai para a margem da direita, como nota à margem; na
 * mesa, um fio de chamada de 1 px, no bronze a 40%, liga o fim do nome da
 * etapa à nota (o único fio de chamada do site). No celular, a nota fica
 * sob o nome, sem fio. O texto é o mesmo.
 */
export function Trabalho() {
  return (
    <Secao id="trabalho" tom="claro" aria-label={trabalho.titulo.join(" ")}>
      <Envelope>
        <ol>
          {trabalho.passos.map((passo) => (
            <li key={passo.titulo} className="group grid gap-x-14 gap-y-2 py-8 md:py-10 lg:grid-cols-12 lg:items-center lg:gap-y-4">
              {/* h2 com o desenho do h3 (app/globals.css): sem o título da seção, as etapas descem direto do h1. O fio de
                  chamada é o ::after, do fim do nome até a nota, na mesa. */}
              <h2 className="font-sub text-destaque leading-[1.25] font-medium tracking-[-0.018em] transition-colors duration-300 ease-atlas group-hover:text-accent lg:col-span-9 lg:row-start-1 lg:flex lg:items-center lg:after:ml-6 lg:after:h-px lg:after:flex-1 lg:after:bg-accent/40">
                {passo.titulo}
              </h2>
              <p className="text-nota lg:col-span-3 lg:col-start-10 lg:row-start-1">
                <span className="font-semibold text-accent tabular-nums">{passo.marca.valor}</span>{" "}
                <span className="text-muted-foreground">{passo.marca.rotulo}</span>
              </p>
              <p className="mt-2 max-w-[60ch] text-corpo text-muted-foreground lg:col-span-8 lg:row-start-2 lg:mt-0">{passo.texto}</p>
            </li>
          ))}
        </ol>
      </Envelope>
    </Secao>
  );
}

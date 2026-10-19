import Link from "next/link";

import { Envelope } from "@/components/estrutura";
import { CartaDoPrazo } from "@/components/ilhas/carta-do-prazo";
import { IconeSeta } from "@/components/icones";
import { Lide, Titulo } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { figuras, passosDoInicio, trabalho } from "@/conteudo/site";

// A luz da tela da carta (o esboço final): do alto, à esquerda, caindo para o fundo, à direita.
const luz = { "--luz-x": "0%", "--luz-y": "0%", "--angulo": "160deg" } as React.CSSProperties;

/**
 * O trabalho, no início: a carta do prazo, na tela que sangra pela direita (desde 17/10, a direção final do Atlas
 * Digital, seção 3, item 4). 24 dias reais de Niterói em colunas, de 0 a 24 h, com o Sol de 20 em 20 minutos, os fins
 * de semana e os feriados em hachura, o agora e as 24 horas do rascunho atravessando a meia-noite; embaixo, o rumo
 * das etapas, com as estações e as datas (ilhas/carta-do-prazo.tsx, escala="dias"). A carta continua além da borda
 * da tela, porque os dias continuam. O tempo a grava: a cada 20 minutos, o Sol de hoje que passou fecha em traço.
 * De 17/10 até a direção final, a derrota: o percurso num arco de círculo, com as cotas e a posição que o percorria
 * num laço de 13 s (a rota lia "gráfico de crescimento", e o laço não media nada); até então, quatro caixas que se
 * empilhavam ao rolar. As quatro etapas ficam no HTML, numa lista para o leitor de tela; a carta é desenho
 * (aria-hidden), com a frase das datas em texto. O texto de cada etapa continua só em O trabalho.
 * A seção é o papel em volta (sem data-tom: duas seções claras seguidas perdem o respiro de cima, app/globals.css),
 * e a janela navy é a tela, recortada nele.
 */
export function Passos() {
  return (
    // Na mesa, o papel embaixo da tela (lg:pb-32): o painel do montador (secoes/orcamento.tsx) sobe 96 px sobre esta
    // seção, e pousa no papel, a 44 px da tela. Só o metal atravessa a borda da tela (seção 2.6); até a revisão de 17/10,
    // a ficha branca entrava 85 px no navy, sob a legenda.
    <section id="trabalho" aria-labelledby="titulo-das-etapas" className="relative flow-root [background:var(--fibra),var(--nevoa)] lg:pb-32">
      <div data-tom="escuro" className="vd-tela-sangra-direita pt-20 pb-14 md:pt-28 md:pb-16" style={luz}>
        <Envelope>
          {/* O rótulo, só para o leitor de tela (17/10): à vista, era o sobretítulo (a marca T2). */}
          <p className="sr-only">{passosDoInicio.rotulo}</p>
          {/* O título na margem, na largura toda (a 68 px, "Nenhuma delas opcional." não cabe em sete colunas de
              1.120 px), e o lide na metade da direita, embaixo dele (a Abertura com `margem`, estrutura.tsx). */}
          <Titulo id="titulo-das-etapas" linhas={trabalho.titulo} />
          <Lide className="mt-6 lg:ml-[calc(50%+1.75rem)]">{passosDoInicio.lide}</Lide>
          <ol className="sr-only">
            {trabalho.passos.map((passo) => (
              <li key={passo.titulo}>
                {passo.titulo}: {passo.marca.valor} {passo.marca.rotulo}.
              </li>
            ))}
          </ol>
          <div className="mt-14">
            <CartaDoPrazo escala="dias" lugar={figuras.coordenadas.decimal} />
          </div>
          <div className="mt-8 flex flex-col gap-x-12 gap-y-6 lg:flex-row lg:items-baseline lg:justify-between">
            <p className="vd-legenda-de-carta">
              {passosDoInicio.legenda.map(([termo, texto]) => (
                <span key={termo}>
                  <strong>{termo}</strong> {texto}{" "}
                </span>
              ))}
            </p>
            <Link href={passosDoInicio.vinculo.destino} className={buttonVariants({ variant: "link", size: "link", className: "max-w-full flex-none whitespace-normal max-lg:self-start" })}>
              {passosDoInicio.vinculo.rotulo}
              <IconeSeta className="size-3.5" />
            </Link>
          </div>
        </Envelope>
      </div>
    </section>
  );
}

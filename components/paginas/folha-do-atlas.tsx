import { Projecao } from "@/components/ilhas/projecao";
import { Globo } from "@/components/marca/globo";
import { figuras } from "@/conteudo/site";

/**
 * O Atlas: a projeção que se desenrola (desde 17/10, a direção final do Atlas Digital, seções 2.7 e 3, item 19). A
 * abertura é uma tela inteira, centrada: o globo gravado, com a origem em Niterói, vira, ao entrar na tela ou pela
 * tecla, a grade em que uma casa é um grau (ilhas/projecao.tsx); embaixo, a leitura da casa e a legenda de carta, em
 * HTML. Até o desenho chegar (e sem script), o globo da marca, parado, no lugar da esfera.
 * De 16 a 17/10, a folha da marca: o globo gravado que girava, sem a Terra, sob a luz do fim da tarde, com a grade de
 * uma projeção cônica no papel de baixo, onde ele pousava; a grade passou à história (secoes/historia.tsx), e o globo
 * não atravessa mais a emenda: a tela recorta tudo no raio.
 */
export function GloboDeNiteroi() {
  const { lugar, decimal } = figuras.coordenadas;
  const { legenda, ...textos } = figuras.projecao;
  return (
    <figure className="vd-projecao">
      <Projecao lugar={decimal} nome={lugar.split(",")[0]} textos={textos} reserva={<Globo className="size-full" />} />
      {/* Na mesa, um parágrafo; no celular (desde 18/10), a legenda de carta em linhas, com a marca de cada estado, e a
          frase da janela da grade logo abaixo da grade (app/digital.css), dentro dela: na ordem do HTML, a do leitor
          de tela (até a revisão de 18/10, no fim, e subia à vista pelo order). */}
      <figcaption className="vd-legenda-de-carta vd-projecao-legenda">
        <strong>{legenda.termo}</strong> <span data-marca="traco">{legenda.esfera}</span>{" "}
        <span data-marca="pontos">
          {legenda.grade}
          <span className="vd-projecao-so-janela"> {legenda.janela}</span>
        </span>{" "}
        {legenda.fonte}
      </figcaption>
    </figure>
  );
}

/**
 * A moldura graduada de O Atlas, o bisel da tela (desde 17/10, a direção final do Atlas Digital, seção 2.5: "a moldura
 * graduada é o bisel da tela"): as quatro barras recuadas da borda da janela, em segmentos alternados de um minuto de
 * arco, 40 px o de latitude e 40 · cos 22,88° = 36,85 px o de longitude, a escala em volta de Niterói. O meio de cada
 * barra é Niterói, e os dois rótulos dizem a coordenada dele, a uma só do site (figuras.coordenadas): 22°53′ S, que é
 * fronteira de minuto, no meio da barra da esquerda; 43°06′ O na barra de baixo, no traço da fronteira de minuto, 13″ a
 * leste do meio (43°06′13″ O). Desenho (aria-hidden): os rótulos em Inter 12 px, no apagado.
 * Até 17/10, a moldura da cena de água, recuada 24 a 32 px, com a longitude 8 minutos a oeste do meio na mesa e 4 no
 * celular ("43°14′ O" e "43°10′ O"): a coordenada mudava com a largura da janela (o fechamento com o Impeccable, A).
 */
export function MolduraGraduada() {
  const { latitude, longitude } = figuras.coordenadas;
  return (
    <div aria-hidden="true" className="vd-moldura pointer-events-none absolute inset-0">
      <span className="vd-moldura-barra vd-moldura-esquerda" />
      <span className="vd-moldura-barra vd-moldura-direita" />
      <span className="vd-moldura-barra vd-moldura-topo" />
      <span className="vd-moldura-barra vd-moldura-base" />
      {/* O espaço separa as duas para quem lê o HTML sem montar a página (o robô). */}
      <span className="vd-moldura-rotulo vd-moldura-latitude">{latitude}</span>{" "}
      <span className="vd-moldura-rotulo vd-moldura-longitude">{longitude}</span>
    </div>
  );
}

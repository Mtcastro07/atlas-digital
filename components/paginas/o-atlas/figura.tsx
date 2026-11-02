import { Globo } from "@/components/marca/globo";
import { figuras } from "@/conteudo/site";

// A figura da abertura de O Atlas: cada página interna tem a sua, e é ela que dá a identidade da página (pedido do
// usuário, 01/10: "design único e identitário de cada uma das páginas"). Até 28/10, as cinco moravam em
// components/paginas/figuras.tsx; desde a fase 0 do R10, cada uma no arquivo da sua página, sem mudança.

/**
 * O Atlas: o globo da marca, grande, que gira devagar (desde 03/10, a
 * pedido: ambiente contínuo, pausa fora da tela e pelo botão do cabeçalho,
 * parado com movimento reduzido), e as coordenadas de Niterói, onde tudo
 * acontece. Desde 16/10 ("Identidade mais profunda"), a folha da marca:
 * o globo gravado (components/marca/globo.tsx), sob a luz do fim da tarde,
 * e a legenda acima dele (no HTML, depois, como antes). A partir de 768 px,
 * o globo desce e atravessa a emenda: 22% dele (97 px, o globo tem 440)
 * pousam no papel da história, com a sombra de contato deslocada para o
 * leste, longe da luz, e, sob ele, a grade de uma projeção cônica (os
 * paralelos em arcos concêntricos e os meridianos que convergem para um
 * ápice acima do globo, fora da tela): o globo vira mapa. A grade é
 * geometria de projeção, dado, e não célula fixa (C9); é a única do papel
 * de O Atlas, e se apaga antes do primeiro capítulo. Abaixo de 768 px, o
 * globo fica dentro da abertura (de 16 a 17/10, o fólio, no pé dela, à
 * direita, ficaria sob ele; desde 17/10, ele fica abaixo do lide).
 */
export function GloboDeNiteroi() {
  const { lugar, latitude, longitude } = figuras.coordenadas;
  return (
    <figure className="mx-auto flex w-full max-w-[440px] flex-col-reverse">
      <div data-ambiente className="relative aspect-square md:-mb-[22%]">
        {/* O papel sob o globo: a grade da projeção e a sombra, a partir da emenda (78% da altura do globo). */}
        <svg
          aria-hidden="true"
          viewBox="0 0 880 300"
          className="vd-projecao pointer-events-none absolute top-[78%] left-1/2 w-[200%] -translate-x-1/2 max-md:hidden"
        >
          {PROJECAO.paralelos.map((r) => (
            <circle key={r} cx="440" cy={PROJECAO.apice} r={r} />
          ))}
          {PROJECAO.meridianos.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
        <span aria-hidden="true" className="vd-pouso-do-globo pointer-events-none absolute max-md:hidden" />
        {/* A passiva P11 (R10): os meridianos giram no compositor, sob o [data-ambiente] desta figura. */}
        <Globo girando className="absolute inset-0 h-full w-full" />
      </div>
      <figcaption className="mb-8 text-center">
        <span className="block font-display tracking-titulo text-numero">{lugar}</span>{" "}
        <span className="mt-2 block text-base text-muted-foreground tabular-nums">
          {latitude} · {longitude}
        </span>
      </figcaption>
    </figure>
  );
}

/** A grade da projeção cônica sob o globo, numa faixa de 880 × 300 (o globo tem 440 de largura, no meio): o ápice
 *  1.100 acima da faixa; os paralelos a cada 48; os meridianos a cada 2,5°. */
const PROJECAO = (() => {
  const apice = -1100;
  const paralelos = [1124, 1172, 1220, 1268, 1316, 1364];
  const meridianos = Array.from({ length: 21 }, (_, i) => {
    const a = ((i - 10) * 2.5 * Math.PI) / 180;
    const ponto = (r: number) => `${(440 + r * Math.sin(a)).toFixed(1)} ${(apice + r * Math.cos(a)).toFixed(1)}`;
    return `M${ponto(1100)}L${ponto(1420)}`;
  });
  return { apice, paralelos, meridianos };
})();

/**
 * A moldura da folha de O Atlas (16/10): a borda graduada de uma prancha de
 * atlas, recuada 24 px da cena (em cima, abaixo do cabeçalho), com a barra
 * de baixo na própria emenda. Faixas de 6 px, em segmentos alternados de um
 * minuto de arco: 40 px o de latitude; o de longitude, 40 · cos 22,88° =
 * 36,85 px, a escala em volta de Niterói. A folha é centrada em Niterói (a
 * fronteira de dois segmentos no meio de cada barra). No celular, só a barra
 * da esquerda e a de baixo, dentro dos 24 px da margem. Desde 17/10, a
 * moldura vai a 32 px da borda onde a margem da página deixa. A única
 * moldura graduada do site.
 * Desde 28/10 (R10, CONTRATO.md, 3.6), sem rótulos: a cidade fica com uma
 * coordenada só, sob "Niterói, RJ". Até então, a latitude deitada na barra
 * da esquerda e uma longitude na de baixo (43°14′ O na mesa, 43°10′ O no
 * celular), que não eram as da cidade e davam duas longitudes na mesma tela
 * (R8/E2, item 30; R8/E4, 11.2; R8/E6, problema 24).
 */
export function MolduraGraduada() {
  return (
    <div aria-hidden="true" className="vd-moldura pointer-events-none absolute inset-0 max-md:hidden">
      <span className="vd-moldura-barra vd-moldura-esquerda" />
      <span className="vd-moldura-barra vd-moldura-direita" />
      <span className="vd-moldura-barra vd-moldura-topo" />
      <span className="vd-moldura-barra vd-moldura-base" />
    </div>
  );
}

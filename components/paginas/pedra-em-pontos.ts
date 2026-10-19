import { limiar } from "@/lib/traco-e-ponto";

/**
 * A pedra aberta em pontos (desde 17/10, a direção final do Atlas Digital, seção 3, item 12): a máscara da metade de
 * cima de cada degrau de /planos, a condição de fundação. A metade de cima é a mesma pedra do degrau (o HTML, com o grão
 * do tom pedra), aberta pela máscara: onde a casa é traço, a pedra fica inteira; onde é ponto, sobra um ponto de pedra
 * no centro da casa. A fronteira com a metade de baixo (o que se paga) é gradual: quatro fileiras em pontilhado
 * ordenado, pela matriz de Bayer de lib/traco-e-ponto.ts, que repete a cada 4 × 4 casas; por isso a máscara inteira
 * cabe em dois ladrilhos de 24 px, um para a faixa da fronteira e um para o campo acima dela.
 * A passagem da página (16 degraus de 70 ms) é a mesma conta com a `abertura` de 0 a 1: com 0, nenhuma casa abre (o
 * degrau inteiro, o valor cheio); com 1, a metade aberta. Fica fora das ilhas porque o servidor também a usa: o HTML
 * já traz a metade aberta (a reserva sem script e o movimento reduzido), e a ilha só anima os degraus de 0 a 16.
 */

/** O passo da pauta, em px: uma casa. */
export const CASA = 6;
/** O ladrilho: as 4 × 4 casas da matriz. */
export const LADRILHO = 4 * CASA;
/** O raio do ponto de pedra: 2,6 px de diâmetro numa casa de 6 (a cobertura de ~15%, a da tela da P2). */
const RAIO = 1.3;

/**
 * Um ladrilho da máscara, como valor de mask-image. As linhas contam de baixo para cima a partir da fronteira (a de
 * baixo encosta na pedra inteira), e `valor` dá, para cada uma, o quanto ela é ponto (de 0 a 1).
 */
function ladrilho(valor: (linha: number) => number, aberta: number) {
  let corpo = "";
  for (let y = 0; y < 4; y++) {
    const linha = 3 - y;
    for (let coluna = 0; coluna < 4; coluna++) {
      const [x0, y0] = [coluna * CASA, y * CASA];
      corpo += limiar(valor(linha), coluna, linha, aberta)
        ? `<circle cx='${x0 + CASA / 2}' cy='${y0 + CASA / 2}' r='${RAIO}'/>`
        : `<rect x='${x0}' y='${y0}' width='${CASA}' height='${CASA}'/>`;
    }
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${LADRILHO}' height='${LADRILHO}'>${corpo}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * As duas máscaras da metade de cima num degrau da passagem (`aberta`, de 0 a 1): a faixa da fronteira, em que a
 * fileira n (de 0, junto da pedra, a 3) é ponto em (n + 0,5) / 4 das casas, e o campo acima dela, todo em ponto.
 */
export function mascaraDaPedra(aberta = 1) {
  return { faixa: ladrilho((linha) => (linha + 0.5) / 4, aberta), campo: ladrilho(() => 1, aberta) };
}

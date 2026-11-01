import { reais } from "@/lib/moeda";

type Opcoes = {
  de?: number;
  duracao?: number;
  /** Arredonda os valores intermediários (ex.: de 10 em 10). */
  passo?: number;
};

/**
 * Conta de `de` até `para` no texto do elemento, em reais, com saída
 * desacelerada. Devolve uma função que interrompe a contagem.
 * Fica fora do Motion de propósito: o `animate` híbrido, que anima
 * números, custaria 23 KB a mais só para isto.
 */
export function contarReais(el: HTMLElement, para: number, { de = 0, duracao = 900, passo = 1 }: Opcoes = {}) {
  let inicio = 0;
  let quadro = requestAnimationFrame(function tique(agora) {
    inicio ||= agora;
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const suavizado = 1 - Math.pow(1 - progresso, 3);
    const valor = de + (para - de) * suavizado;
    el.textContent = reais(progresso < 1 ? Math.round(valor / passo) * passo : para);
    if (progresso < 1) quadro = requestAnimationFrame(tique);
  });
  return () => cancelAnimationFrame(quadro);
}

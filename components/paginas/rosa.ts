// A rosa de oito pontas de Dúvidas, como dado (um cálculo, sem desenho). Num arquivo do sistema desde 28/10 (R10,
// fase 0): a figura de Dúvidas a desenha, e o índice do início também (CONTRATO.md, 3.1 e 6.4).

/**
 * As oito pontas da rosa, num quadrado de -50 a 50: as colaterais (0,6 do raio) atrás, as cardeais por cima. Cada
 * ponta são duas metades; acesa a que olha para a luz (do oeste, um pouco do norte: a hora azul de Dúvidas).
 */
export const ROSA = (() => {
  const luz = [-1, -0.5];
  const pontas = [45, 135, 225, 315, 0, 90, 180, 270].map((graus) => {
    const cardeal = graus % 90 === 0;
    const [raio, base] = cardeal ? [48, 8] : [29, 6];
    const a = (graus * Math.PI) / 180;
    const d = [Math.sin(a), -Math.cos(a)];
    const lado = [d[1], -d[0]];
    const ponto = (x: number, y: number) => `${x.toFixed(2)} ${y.toFixed(2)}`;
    return [1, -1].map((s) => ({
      d: `M0 0L${ponto(raio * d[0], raio * d[1])}L${ponto(s * base * lado[0], s * base * lado[1])}Z`,
      acesa: s * (lado[0] * luz[0] + lado[1] * luz[1]) > 0,
    }));
  });
  return pontas.flat();
})();

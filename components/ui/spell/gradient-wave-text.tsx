// Spell UI, Gradient Wave Text (https://spell.sh/r/gradient-wave-text,
// instalado pelo CLI do shadcn em 03/10), adaptado ao Atlas:
// - uma faixa de cor — bronze, bronze claro e o azul apagado; na barbearia,
//   latão — atravessa a palavra uma vez, da esquerda para a direita, ao fim
//   da entrada, e a deixa na cor do tom (nada se move ao rolar; recarregar
//   não repete, .ja-aberto);
// - só CSS e só transform (app/movimento.css, .mov-onda): uma cópia da
//   palavra, pintada uma vez com o degradê da marca, fica numa janela de
//   bordas apagadas que corre por cima; a cópia corre ao contrário e fica
//   parada sobre o texto. O original movia o degradê por script a cada
//   quadro, o que recalculava o estilo e repintava a palavra: medido em 03/10
//   com CPU 20×, 716 ms de linha principal e o LCP da capa ~0,25 s mais tarde.
//   Foi trocado no mesmo dia;
// - componente de servidor, sem script; a cópia é só desenho (fora da árvore
//   de acessibilidade e dos trechos da busca). Com movimento reduzido, nada
//   passa.

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Espera, em ms, contada da primeira pintura (a palavra termina de subir antes). */
  atraso?: number;
};

export function GradientWaveText({ children, className = "", atraso = 0 }: Props) {
  return (
    <span className={`mov-onda ${className}`} style={{ "--atraso-onda": `${atraso}ms` } as React.CSSProperties}>
      {children}
      <span aria-hidden="true" data-nosnippet="" className="mov-onda-janela">
        <span className="mov-onda-tinta">{children}</span>
      </span>
    </span>
  );
}

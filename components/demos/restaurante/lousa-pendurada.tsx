/**
 * A lousa pendurada: a assinatura do salão (identidade, seção 8), em CSS 3D. O quadro tem a espessura do caixilho (as
 * quatro bordas são faces), fica preso por um barbante num prego e balança devagar (`data-balanca`, o ambiente: a
 * ilha components/ilhas/demos/restaurante/salao-vivo.tsx, pausável e parada fora da tela) e inclina sob o ponteiro
 * (`data-peca`). A luz da janela corre na lousa onde o ponteiro está. O que vai escrito nela é texto de verdade, a giz
 * (o filtro #giz-do-salao, no layout). Embaixo, a calha, com o giz e o apagador deitados, e o que a página puser nela.
 */
export function LousaPendurada({
  children,
  naCalha,
  balanca = true,
  className = "",
}: {
  children: React.ReactNode;
  /** O que fica deitado na calha, além do giz e do apagador (a ação da capa). */
  naCalha?: React.ReactNode;
  balanca?: boolean;
  className?: string;
}) {
  return (
    <div className={`rs-pendurada ${className}`} data-peca data-balanca={balanca || undefined}>
      <span aria-hidden="true" className="rs-prego" />
      <svg aria-hidden="true" className="rs-barbante" viewBox="0 0 100 24" preserveAspectRatio="none">
        <path d="M50 1 L6 24 M50 1 L94 24" />
      </svg>
      <div className="rs-quadro">
        <span aria-hidden="true" className="rs-quadro-borda" data-lado="cima" />
        <span aria-hidden="true" className="rs-quadro-borda" data-lado="baixo" />
        <span aria-hidden="true" className="rs-quadro-borda" data-lado="esquerda" />
        <span aria-hidden="true" className="rs-quadro-borda" data-lado="direita" />
        <div className="rs-quadro-frente">
          <div className="rs-lousa">
            {children}
            <span aria-hidden="true" className="rs-lousa-janela" />
          </div>
        </div>
        <div className="rs-calha">
          <span aria-hidden="true" className="rs-calha-giz" />
          <span aria-hidden="true" className="rs-calha-giz" data-cor="amarelo" />
          <span aria-hidden="true" className="rs-calha-apagador" />
          {naCalha}
        </div>
      </div>
    </div>
  );
}

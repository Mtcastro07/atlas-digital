/**
 * O cavalete de lousa na calçada: a chamada do salão. A lousa dobrável em A, de pé sobre a pedra portuguesa, vista
 * de três quartos: a face da frente deitada para trás (CSS 3D), com a espessura da tábua à vista; as costas abertas,
 * mais escuras, aparecendo do lado; a dobradiça no alto e as quatro pernas. Inclina sob o ponteiro (`data-peca`). O
 * que se escreve nela é texto, a giz; as ações ficam fora, na soleira (a página).
 */
export function Cavalete({ children }: { children: React.ReactNode }) {
  return (
    <div className="rs-cavalete" data-peca>
      <span aria-hidden="true" className="rs-cavalete-perna" data-lado="atras-esquerda" />
      <span aria-hidden="true" className="rs-cavalete-perna" data-lado="atras-direita" />
      <span aria-hidden="true" className="rs-cavalete-costas" />
      <div className="rs-cavalete-tampo">
        <span aria-hidden="true" className="rs-cavalete-dobradica" />
        <div className="rs-lousa rs-cavalete-lousa">
          {children}
          <span aria-hidden="true" className="rs-lousa-janela" />
        </div>
      </div>
      <span aria-hidden="true" className="rs-cavalete-perna" data-lado="esquerda" />
      <span aria-hidden="true" className="rs-cavalete-perna" data-lado="direita" />
    </div>
  );
}

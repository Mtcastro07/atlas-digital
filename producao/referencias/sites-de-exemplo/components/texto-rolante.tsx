/**
 * Rótulo de vínculo ou botão que rola no hover: cada letra é um elemento,
 * e a cópia que entra por baixo é uma sombra do próprio texto
 * (text-shadow), não uma segunda camada de letras — metade dos elementos,
 * o que pesa na hidratação do aparelho modesto (.vd-rolo, app/vidro.css).
 * No hover (ou foco), as letras sobem uma a uma e a cópia toma o lugar.
 * O texto acessível é um só, oculto na tela; as letras desenhadas ficam
 * fora da árvore de acessibilidade. Com movimento reduzido, a troca é
 * instantânea e não se vê.
 */
export function TextoRolante({ texto }: { texto: string }) {
  return (
    <>
      <span className="sr-only">{texto}</span>
      <span aria-hidden="true" className="vd-rolo">
        {Array.from(texto).map((letra, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties}>
            {letra}
          </span>
        ))}
      </span>
    </>
  );
}

// Spell UI, Bars Spinner (https://spell.sh/r/bars-spinner, instalado pelo CLI
// do shadcn em 03/10), adaptado ao Atlas: doze barras em volta do centro,
// cada uma se apagando a seu tempo — o estado de espera (regra 4 das
// diretrizes). O original trazia a folha em styled-jsx; aqui ela fica em
// app/movimento.css (.mov-barras, só opacidade; parada, em leque, com
// movimento reduzido), e o componente é de servidor. Na cor do texto em volta.
// Decorativo: o gatilho que espera já diz o que é (o rótulo ao lado ou o do
// próprio botão).

type Props = {
  /** Lado, em pixels. */
  tamanho?: number;
  className?: string;
};

export function BarsSpinner({ tamanho = 16, className = "" }: Props) {
  return (
    <span aria-hidden="true" className={`mov-barras ${className}`} style={{ "--barras": `${tamanho}px` } as React.CSSProperties}>
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} style={{ "--i": i } as React.CSSProperties} />
      ))}
    </span>
  );
}

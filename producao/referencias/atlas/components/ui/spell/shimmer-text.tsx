// Spell UI, Shimmer Text (https://spell.sh/r/shimmer-text, instalado pelo CLI
// do shadcn em 03/10), adaptado ao Atlas: um brilho atravessa o texto a cada
// 3 s. Só CSS e só transform (app/movimento.css, .mov-cintila): uma cópia
// do texto, mais clara, numa janela de bordas apagadas que corre por cima,
// e a cópia ao contrário, parada sobre o texto — o original movia o fundo
// (background-position) com o motion, o que repinta a cada quadro. Componente
// de servidor, sem script. É ambiente contínuo ([data-ambiente]): só corre
// com script, depois de entrar na tela, pausa pelo botão do cabeçalho e fora
// da tela, e para com movimento reduzido. A cópia é só desenho.

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function ShimmerText({ children, className = "" }: Props) {
  return (
    <span data-ambiente="" className={`mov-cintila ${className}`}>
      {children}
      <span aria-hidden="true" data-nosnippet="" className="mov-cintila-janela">
        <span className="mov-cintila-luz">{children}</span>
      </span>
    </span>
  );
}

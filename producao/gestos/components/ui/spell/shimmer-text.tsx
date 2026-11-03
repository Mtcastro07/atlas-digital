// Spell UI, Shimmer Text (https://spell.sh/r/shimmer-text, instalado pelo CLI
// do shadcn em 03/10), adaptado ao Atlas e trazido para o kit de produção (producao/gestos/, 08.10.2026): um brilho atravessa o texto a cada
// 3 s. Só CSS e só transform (app/gestos.css, .mov-cintila): uma cópia
// do texto, mais clara, numa janela de bordas apagadas que corre por cima,
// e a cópia ao contrário, parada sobre o texto — o original movia o fundo
// (background-position) com o motion, o que repinta a cada quadro. Componente
// de servidor, sem script. É ambiente contínuo ([data-ambiente]): só corre
// com script, depois de entrar na tela, pausa pelo botão (components/ilhas/controle-do-movimento.tsx) e fora
// da tela, e para com movimento reduzido. A cópia é só desenho e vem só do CSS
// desde 03.11.2026 (o ::before lê o data-texto): o HTML leva o texto uma vez.

type Props = {
  children: string;
  className?: string;
};

export function ShimmerText({ children, className = "" }: Props) {
  return (
    <span data-ambiente="" className={`mov-cintila mov-constante ${className}`}>
      {children}
      <span aria-hidden="true" className="mov-cintila-janela">
        <span className="mov-cintila-luz before:content-[attr(data-texto)]" data-texto={children} />
      </span>
    </span>
  );
}

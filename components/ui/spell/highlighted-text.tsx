// Spell UI, Highlighted Text (https://spell.sh/r/highlighted-text, instalado
// pelo CLI do shadcn em 03/10), adaptado ao Atlas: uma tarja de bronze sobe
// por trás da palavra e a pinta de navy — a entrada da página, uma vez (nada
// se move ao rolar; recarregar não repete, .ja-aberto). O original deslizava
// uma tarja preta com o motion e invertia o texto por mix-blend-mode; aqui,
// dentro de uma janela parada, a faixa sobe e uma cópia do texto em navy
// desce o mesmo tanto — fica no lugar e aparece onde a faixa já passou —, só
// por transform, em CSS (app/movimento.css, .mov-tarja): componente de
// servidor, sem script. Com movimento reduzido, a tarja já está no lugar.
// A cópia é só desenho: fora da árvore de acessibilidade e dos trechos da
// busca (data-nosnippet). Uma palavra só: duas quebrariam dentro da tarja
// numa tela estreita.
// Variante marca-texto (`marcador`, desde 03/10; na folha impressa da
// nutrição): a faixa passa por trás do texto, na metade de baixo, da
// esquerda para a direita, na cor de --marcador, e o texto fica na cor
// dele (sem a cópia). Passa na entrada da página; nos sites de exemplo,
// abaixo da dobra, quando a palavra entra na tela (ilhas/demos/revelacao.tsx).

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Espera antes da tarja, em milissegundos (a linha termina de subir antes). */
  atraso?: number;
  /** Marca-texto: a faixa por trás do texto, na metade de baixo, sem inverter a cor. */
  marcador?: boolean;
};

export function HighlightedText({ children, className = "", atraso = 0, marcador = false }: Props) {
  return (
    <span
      data-marcador={marcador ? "" : undefined}
      className={`mov-tarja ${className}`}
      style={{ "--atraso-tarja": `${atraso}ms` } as React.CSSProperties}
    >
      {children}
      <span aria-hidden="true" data-nosnippet="" className="mov-tarja-janela">
        <span className="mov-tarja-faixa">{!marcador && <span className="mov-tarja-tinta">{children}</span>}</span>
      </span>
    </span>
  );
}

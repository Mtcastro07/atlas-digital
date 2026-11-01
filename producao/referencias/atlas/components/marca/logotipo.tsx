import { cn } from "@/lib/utils";

// Logotipo do Atlas Digital: a letra A, com a mão que ergue o globo,
// seguida de "ATLAS DIGITAL" — o traço original, o do site de 28/08 e dos
// arquivos-mestre da marca (de 01 a 05/10, sem o bloco da mão).
// O letreiro estático vem de public/marca.svg (em cache, fora do HTML);
// o globo fica aqui, inline, porque gira: uma volta completa sob o ponteiro
// ou no foco do vínculo (app/movimento.css) e, nos aparelhos sem ponteiro,
// a cada vez que o logotipo aparece na tela (ilhas/giro-do-globo.tsx).
//
// A caixa de visualização é justa ao desenho (0 0 426 166): a borda
// esquerda da letra A coincide com a margem da coluna, e a altura do
// componente é a altura visível da marca.

/**
 * O letreiro, com a versão do arquivo no endereço: o /marca.svg fica uma
 * semana em cache (next.config.ts), e quem já o tinha continuaria a ver o
 * desenho anterior. Mudou o marca.svg, mude a versão.
 */
const LETREIRO = "/marca.svg?v=2026-10-05#letreiro";

type LogotipoProps = {
  /** Id único do recorte do globo; dois logotipos na mesma página exigem ids distintos. */
  recorte: string;
  className?: string;
  decorativo?: boolean;
};

export function Logotipo({ recorte, className, decorativo }: LogotipoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 426 166"
      data-globo
      className={cn("mov-globo overflow-visible", className)}
      role={decorativo ? undefined : "img"}
      aria-hidden={decorativo || undefined}
      aria-label={decorativo ? undefined : "Atlas Digital"}
    >
      <use href={LETREIRO} />
      <GloboDoLogotipo recorte={recorte} />
    </svg>
  );
}

/**
 * O globo do logotipo, recortado no próprio círculo e na cor do texto.
 * Também no símbolo da nota sobre o nome (secoes/quem-faz.tsx), dentro de
 * um svg com a mesma caixa de coordenadas.
 */
export function GloboDoLogotipo({ recorte }: { recorte: string }) {
  return (
    <>
      <defs>
        <clipPath id={recorte}>
          <circle cx="163" cy="24" r="24" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${recorte})`} fill="none" stroke="currentColor" strokeWidth="4.5">
        <circle cx="163" cy="24" r="21.75" />
        <ellipse cx="163" cy="24" rx="9.75" ry="21.75" />
        <line x1="142.58" y1="16.5" x2="183.42" y2="16.5" />
        <line x1="142.58" y1="31.5" x2="183.42" y2="31.5" />
      </g>
    </>
  );
}

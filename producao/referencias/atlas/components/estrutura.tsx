import { Lide, Titulo } from "@/components/tipografia";
import type { IdDaSecao } from "@/conteudo/site";
import { cn } from "@/lib/utils";

export type Tom = "escuro" | "claro" | "branco";

type SecaoProps = React.ComponentProps<"section"> & {
  id?: IdDaSecao;
  /** escuro: navy · claro: névoa neutra · branco: superfície limpa. */
  tom?: Tom;
};

/**
 * Faixa vertical da página, com o tom definido por data-tom. Respiro de 96
 * px no celular e 144 px no computador, em cima e embaixo; duas seções
 * seguidas no mesmo tom não somam os dois respiros — a segunda começa sem
 * o de cima (app/globals.css). Assim, todo intervalo entre dois conteúdos
 * no mesmo tom mede o mesmo em todo o site (padronizado em 03/10).
 */
export function Secao({ tom = "escuro", className, ...props }: SecaoProps) {
  return <section data-tom={tom} className={cn("relative py-24 md:py-36", className)} {...props} />;
}

/**
 * Coluna central com largura máxima e margem lateral: 24 px no celular, 40
 * px a partir de 768 px. Até 03/10, 22 px no celular, fora da escala de 4
 * px (regra 2); a margem das galerias de deslizar acompanha
 * (--galeria-margem, app/vidro.css).
 */
export function Envelope({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-pagina px-6 md:px-10", className)} {...props} />;
}

type AberturaProps = {
  titulo: readonly string[];
  lide?: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Abertura de seção: título e lide centrados, com respiro abaixo. Sem
 * largura máxima no bloco: as linhas do título são as de `conteudo/` e
 * só quebram se não couberem na coluna; o lide limita a própria medida.
 */
export function Abertura({ titulo, lide, className, children }: AberturaProps) {
  return (
    <div className={cn("text-center", className)}>
      <Titulo linhas={titulo} className="mx-auto" />
      {lide && <Lide className="mx-auto mt-8">{lide}</Lide>}
      {children}
    </div>
  );
}

/**
 * Orbe de luz do bloco com .vd-luz: segue o ponteiro, movido pela ilha
 * LuzDoCursor (components/ilhas/luz-do-cursor.tsx). Decorativo.
 */
export function Orbe() {
  return <span aria-hidden="true" className="vd-orbe" />;
}

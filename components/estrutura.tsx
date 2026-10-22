import { Lide, Titulo } from "@/components/tipografia";
import type { IdDaSecao } from "@/conteudo/site";
import { cn } from "@/lib/utils";

export type Tom = "escuro" | "claro" | "pedra";

type SecaoProps = React.ComponentProps<"section"> & {
  id?: IdDaSecao;
  /** escuro: navy, a água · claro: névoa neutra, o papel · pedra: o segundo tom claro (16/10). O branco (superfície limpa) saiu em 16/10 como campo de cena: fica só como --ficha, o cartão dos tons claros. */
  tom?: Tom;
};

/**
 * Faixa vertical da página, com o tom definido por data-tom. Respiro de 96
 * px no celular e 144 px no computador, em cima e embaixo; duas seções
 * seguidas no mesmo tom não somam os dois respiros — a segunda começa sem
 * o de cima (app/globals.css). Assim, todo intervalo entre dois conteúdos
 * no mesmo tom mede o mesmo em todo o site (padronizado em 03/10).
 * Desde 16/10, toda seção leva a matéria do tom (.vd-materia, app/vidro.css):
 * o grão e a rampa da água, a fibra do papel, o grão da pedra.
 */
export function Secao({ tom = "escuro", className, ...props }: SecaoProps) {
  return <section data-tom={tom} className={cn("vd-materia relative py-24 md:py-36", className)} {...props} />;
}

/**
 * Coluna central com largura máxima e margem lateral: 24 px no celular, 40
 * px a partir de 768 px. Até 03/10, 22 px no celular, fora da escala de 4
 * px (regra 2); a margem das galerias de deslizar acompanha
 * (--galeria-margem, app/vidro.css). Desde 16/10 (passe 3), com a área
 * segura dos lados: com o aparelho deitado, o viewport-fit=cover
 * (app/layout.tsx) levava o texto e a pílula para baixo do recorte da tela.
 */
export function Envelope({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-pagina px-[max(1.5rem,env(safe-area-inset-left),env(safe-area-inset-right))] md:px-[max(2.5rem,env(safe-area-inset-left),env(safe-area-inset-right))]",
        className,
      )}
      {...props}
    />
  );
}

type AberturaProps = {
  titulo: readonly string[];
  lide?: string;
  className?: string;
  children?: React.ReactNode;
  /** Na margem: o título à esquerda, na largura toda, e o lide embaixo dele, a partir de 1024 px na metade da direita. */
  margem?: boolean;
};

/**
 * Abertura de seção: título e lide centrados, com respiro abaixo. Sem
 * largura máxima no bloco: as linhas do título são as de `conteudo/` e
 * só quebram se não couberem na coluna; o lide limita a própria medida.
 * `margem` (desde 14/10): a mesma abertura alinhada à esquerda, com o lide
 * embaixo, deslocado para a metade da direita (lado a lado, a linha "uma
 * exigência própria.", de 662 px, não cabia na coluna do título). O
 * cabeçalho centrado estava em 11 das 14 seções, e
 * duas cenas seguidas mudavam só a peça (o crítico de fora, 14/10; a regra
 * de 19-o-padrao-atlas.md, seção 4.3: duas de quatro coisas mudam). Vai
 * nas portas (entre a fundação e a chamada final, as duas centradas). De
 * 14 a 16/10, também na vitrine, quando os públicos de cima eram blocos
 * centrados; desde 16/10, os públicos são linhas na margem, e a vitrine
 * volta ao centro.
 */
export function Abertura({ titulo, lide, className, children, margem = false }: AberturaProps) {
  if (margem)
    return (
      <div className={cn("grid gap-8 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-10", className)}>
        <Titulo linhas={titulo} className="lg:col-span-12" />
        {lide && <Lide className="lg:col-span-6 lg:col-start-7">{lide}</Lide>}
        {children}
      </div>
    );
  return (
    <div className={cn("text-center", className)}>
      <Titulo linhas={titulo} className="mx-auto" />
      {lide && <Lide className="mx-auto mt-8">{lide}</Lide>}
      {children}
    </div>
  );
}

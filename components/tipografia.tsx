import { cn } from "@/lib/utils";

// Papéis de texto, nas fontes do site de 28/08 (desde 05/10, pedido do
// usuário; app/globals.css) e nos degraus da escala tipográfica: títulos
// em Archivo Black, lide em Archivo Light, subtítulos em Archivo Medium,
// texto em Inter. As cores vêm do tom da seção, então o mesmo componente
// serve no escuro, na névoa e no branco.

type TituloProps = React.ComponentProps<"h2"> & {
  /** Uma entrada por linha: a quebra fica onde o texto pede, não onde a largura cai. */
  linhas: readonly string[];
};

/** Título de seção: text-titulo, 32 a 56 px, Archivo Black (a regra do h2). Aceita os atributos do h2 (o id, em História; data-ambiente, no reflexo da chamada final). */
export function Titulo({ linhas, className, ...props }: TituloProps) {
  return (
    <h2 className={cn("text-titulo", className)} {...props}>
      {linhas.map((linha) => (
        <span key={linha} className="block">
          {linha}
        </span>
      ))}
    </h2>
  );
}

/** Parágrafo de abertura: Archivo Light, text-destaque, 18 a 21 px, cor secundária (o .lide do site de 28/08). */
export function Lide({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("max-w-[48ch] font-sub text-destaque font-light tracking-sub text-muted-foreground", className)}
      {...props}
    />
  );
}

/** Texto de apoio: text-corpo, 17 px, cor secundária. */
export function Apoio({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("max-w-[62ch] text-corpo text-muted-foreground", className)} {...props} />;
}

/** Título de bloco ou cartão: text-destaque, 18 a 21 px, Archivo Medium (a regra do h3, app/globals.css). */
export function Subtitulo({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("text-destaque", className)} {...props} />;
}

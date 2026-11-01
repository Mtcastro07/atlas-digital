import { cva, type VariantProps } from "class-variance-authority"

// Botões em pílula. Transições suaves de cor no hover e leve compressão
// no toque (97%). Alvo de toque mínimo de 44 px (contexto de produto,
// seção 7). <Button> é um <button> nativo: o do Base UI custava 17 KB de
// script inicial sem ganho. Para vínculos, use `buttonVariants` num <a>.
// Sem `cn` aqui, de propósito: este arquivo vai ao navegador, e o motor de
// fusão de classes custava ~9 ms de CPU na carga (180 ms com CPU 20×).
// `className` acrescenta layout (largura, margem); não sobrepõe variante.
// Da branchCto (fusão de 01/10): na ação principal, uma faixa de luz
// atravessa a pílula no hover (.vd-brilho, app/vidro.css), e um brilho
// bronze a envolve (sombra de 30 px). Os dois saíram em 03/10 pela regra 3
// das Diretrizes de Design Premium e voltaram no mesmo dia, a pedido do
// usuário: são parte da identidade do site. `translate` na transição serve
// ao botão magnético ([data-magnetico]). `scale` também entra na
// transição: no Tailwind 4, `active:scale-*` escreve a propriedade
// `scale`, não `transform`, e sem ela na lista o botão estalava para 97% e
// voltava, sem passagem (corrigido em 01/10).
// Desabilitado: o apagado vem da base (app/globals.css); o cursor de "não
// permitido" é repetido aqui porque o `cursor-pointer` do utilitário vence
// a base; e o hover não responde (`not-disabled:`; a faixa de luz, que é
// do CSS de app/vidro.css, some com `disabled:after:hidden`). Até 03/10,
// opacidade 50% e pointer-events: none, que escondia o cursor.
const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap no-underline transition-[background-color,color,border-color,box-shadow,transform,translate,scale] duration-300 ease-atlas select-none active:scale-[0.97] disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "vd-brilho bg-primary text-primary-foreground not-disabled:hover:bg-primary-hover not-disabled:hover:shadow-[0_10px_30px_-10px_var(--primary)] disabled:after:hidden",
        secondary: "bg-secondary text-secondary-foreground not-disabled:hover:bg-secondary/88",
        outline: "border border-input bg-transparent text-foreground not-disabled:hover:border-foreground not-disabled:hover:bg-foreground/[0.05]",
        vidro: "vd-vidro text-foreground not-disabled:hover:bg-foreground/[0.08]",
        ghost: "text-muted-foreground not-disabled:hover:text-foreground",
        link: "vd-vinculo rounded-none px-0 active:scale-100",
      },
      // Texto na escala (regra 1): a ação comum e a do cabeçalho em
      // text-nota (14 px); a ação grande e o vínculo com seta, que andam
      // juntos (capa, fundação, chamada final, 404), em text-corpo (17 px).
      // Até 03/10, as medidas do site de 28/08: 15; 14,5; 16 e 16,5 px.
      // Alturas e recuos mantidos: 48 px (44 no cabeçalho, onde os 20 px
      // de lado fazem a ação concêntrica à pílula).
      size: {
        default: "min-h-12 px-6 py-3 text-nota",
        sm: "min-h-11 px-5 py-2 text-nota",
        lg: "min-h-12 px-7 py-3 text-corpo",
        link: "min-h-11 text-corpo",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      data-slot="button"
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
}

export { Button, buttonVariants }

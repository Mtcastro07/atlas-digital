"use client"

import { cva, type VariantProps } from "class-variance-authority"

// Controles de escolha sobre <button aria-pressed> nativo.
//   segmento — opção de controle segmentado (o cursor que desliza fica
//              no componente que monta o grupo);
//   opcao    — cartão selecionável do montador: borda escurece no hover e
//              fica cheia quando escolhido;
//   outline  — escolha avulsa, em pílula.
// O filho pode reagir à seleção com group-data-pressed/toggle:.
// Sem `cn` (vai ao navegador): `className` só acrescenta layout.
// Texto na escala (regra 1): text-nota (até 03/10, 14,08 px no segmento e
// o text-sm do Tailwind no outline). Desabilitado: o apagado vem da base
// (app/globals.css), o cursor de "não permitido" é repetido aqui (o
// `cursor-pointer` do utilitário vence a base), e o hover não responde
// (`not-disabled:`). Esse seletor composto pesa mais que o `data-pressed:`:
// onde os dois dão valores diferentes (a borda do opcao), o hover exclui
// também o escolhido (`not-data-pressed:`), senão o hover apagaria a escolha.
const toggleVariants = cva(
  "group/toggle relative inline-flex cursor-pointer items-center text-foreground transition-[background-color,color,border-color,box-shadow] duration-300 ease-atlas select-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        segmento:
          "z-[1] min-h-11 justify-center rounded-full px-3 text-nota font-semibold text-muted-foreground not-disabled:hover:text-foreground data-pressed:text-foreground",
        opcao:
          "min-h-18 w-full justify-between gap-4 rounded-controle border border-border bg-card px-5 py-4 text-left not-disabled:not-data-pressed:hover:border-input data-pressed:border-foreground data-pressed:shadow-[inset_0_0_0_1px_var(--foreground)]",
        outline:
          "min-h-11 justify-center rounded-full border border-input px-4 text-nota font-medium not-disabled:hover:border-foreground data-pressed:border-foreground data-pressed:bg-foreground data-pressed:text-background",
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
)

// Botão de alternância avulso, sobre <button aria-pressed> nativo.
function Toggle({
  className,
  variant = "outline",
  size = "default",
  pressed = false,
  onPressedChange,
  ...props
}: Omit<React.ComponentProps<"button">, "onChange"> &
  VariantProps<typeof toggleVariants> & {
    pressed?: boolean
    onPressedChange?: (pressionado: boolean) => void
  }) {
  return (
    <button
      type="button"
      data-slot="toggle"
      aria-pressed={pressed}
      data-pressed={pressed || undefined}
      onClick={() => onPressedChange?.(!pressed)}
      className={toggleVariants({ variant, size, className })}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }

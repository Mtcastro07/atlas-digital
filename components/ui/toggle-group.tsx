"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { toggleVariants } from "@/components/ui/toggle"

// Grupo de escolhas do shadcn, reescrito sobre <button aria-pressed>
// nativo em vez do ToggleGroup do Base UI. Mesma API e mesmas variantes
// visuais; medido com processador 20× mais lento, o do Base UI custava
// ~19 KB de script e a maior parte da hidratação das três ilhas que o usam.
// Teclado: Tab percorre as opções; Espaço e Enter alternam (nativos).
// Sem `cn` (vai ao navegador): o grupo não impõe exibição nem largura —
// quem usa passa o layout completo em `className` (ex.: "grid gap-3").

type Variantes = VariantProps<typeof toggleVariants>

type Contexto = Variantes & {
  valor: readonly string[]
  alternar: (item: string) => void
}

const ContextoDoGrupo = React.createContext<Contexto | null>(null)

type ToggleGroupProps = Omit<React.ComponentProps<"div">, "defaultValue"> &
  Variantes & {
    value: readonly string[]
    onValueChange: (valor: string[]) => void
    /** Várias opções ao mesmo tempo. Sem isto, escolher uma desmarca as outras. */
    multiple?: boolean
  }

function ToggleGroup({
  value,
  onValueChange,
  multiple = false,
  variant,
  size,
  className,
  children,
  ...props
}: ToggleGroupProps) {
  const alternar = (item: string) => {
    const marcado = value.includes(item)
    if (multiple) onValueChange(marcado ? value.filter((v) => v !== item) : [...value, item])
    else onValueChange(marcado ? [] : [item])
  }

  return (
    <div
      role="group"
      data-slot="toggle-group"
      className={className ?? "flex items-center"}
      {...props}
    >
      <ContextoDoGrupo.Provider value={{ valor: value, alternar, variant, size }}>
        {children}
      </ContextoDoGrupo.Provider>
    </div>
  )
}

type ToggleGroupItemProps = Omit<React.ComponentProps<"button">, "value"> &
  Variantes & {
    value: string
  }

function ToggleGroupItem({ value, variant, size, className, ...props }: ToggleGroupItemProps) {
  const grupo = React.useContext(ContextoDoGrupo)
  if (!grupo) throw new Error("ToggleGroupItem precisa estar dentro de um ToggleGroup")
  const pressionado = grupo.valor.includes(value)

  return (
    <button
      type="button"
      data-slot="toggle-group-item"
      aria-pressed={pressionado}
      data-pressed={pressionado || undefined}
      onClick={() => grupo.alternar(value)}
      className={[toggleVariants({ variant: grupo.variant || variant, size: grupo.size || size }), className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }

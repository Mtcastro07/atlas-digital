import { cva, type VariantProps } from "class-variance-authority"

// Botões em pílula. Transições suaves de cor no hover e leve compressão
// no toque (97%). Alvo de toque mínimo de 44 px (contexto de produto,
// seção 7). <Button> é um <button> nativo: o do Base UI custava 17 KB de
// script inicial sem ganho. Para vínculos, use `buttonVariants` num <a>.
// Sem `cn` aqui, de propósito: este arquivo vai ao navegador, e o motor de
// fusão de classes custava ~9 ms de CPU na carga (180 ms com CPU 20×).
// `className` acrescenta layout (largura, margem); não sobrepõe variante.
// Da branchCto (fusão de 01/10): na ação principal, um brilho bronze a
// envolve no hover (sombra de 30 px), e o bronze clareia (desde 16/10, no
// .vd-metal: a camada acesa do metal, por opacidade). A faixa de luz
// que atravessa a pílula (.vd-brilho, app/vidro.css) saiu da variante em
// 14/10 e vai por `className` só às ações que fecham a decisão: o
// "Escolher" do plano recomendado (`plano.destaque`, components/secoes/planos.tsx)
// e o envio pelo WhatsApp do montador (a mesma faixa em toda ação
// em bronze era a marca M7; pedido do usuário, 14/10: "parecendo que você
// está spamando os mesmos componentes"). Desde 16/10, toda "Montar
// orçamento" responde igual, com o hover do sistema: a da capa tinha a
// faixa e o ímã, e a do fim, as letras que rolam (o crítico de fora: a
// mesma ação de três jeitos na mesma página). O brilho e a faixa saíram em 03/10
// pela regra 3 das Diretrizes de Design Premium e voltaram no mesmo dia, a
// pedido do usuário: são parte da identidade do site. `translate` na transição serve
// ao botão magnético ([data-magnetico]: no Atlas, nenhum desde 16/10; a regra e a curva ficam no barbearia.css desde 16/10; o da barbearia
// tem classes próprias). `scale` também entra na
// transição: no Tailwind 4, `active:scale-*` escreve a propriedade
// `scale`, não `transform`, e sem ela na lista o botão estalava para 97% e
// voltava, sem passagem (corrigido em 01/10).
// A pílula quebra a linha só quando não cabe (17/10, fechamento com o
// Impeccable): até então, `whitespace-nowrap`, e com a letra a 200% a
// 390 px "Montar orçamento" passava da tela (410 px), cortada pelo
// `overflow-x: clip` do body (a marca Q16). Com a letra normal, nada muda:
// `max-w-full` só age onde a pílula antes transbordava.
// Desabilitado: o apagado vem da base (app/globals.css); o cursor de "não
// permitido" é repetido aqui porque o `cursor-pointer` do utilitário vence
// a base; e o hover não responde (`not-disabled:`; a faixa de luz não vai
// a <button>: as ações que a levam são vínculos). Até 03/10,
// opacidade 50% e pointer-events: none, que escondia o cursor.
const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer max-w-full items-center justify-center gap-2 rounded-full text-center font-semibold no-underline transition-[background-color,color,border-color,box-shadow,transform,translate,scale] duration-300 ease-atlas select-none active:scale-[0.97] disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Desde 16/10, o bronze fundido (.vd-metal, app/vidro.css): o degradê, os fios de luz e de sombra, a sombra do
        // lado da hora e, no hover, a camada acesa e o brilho bronze. O bg-primary fica por baixo (cores forçadas).
        default: "vd-metal bg-primary text-primary-foreground",
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

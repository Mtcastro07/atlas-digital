import { createCn } from "cn/config"

// O cn (clsx + tailwind-merge) com a escala tipográfica do Atlas, desde
// 03/10 (app/globals.css: de text-rotulo a text-display). Sem ela, o cn
// tomaria `text-destaque` por cor de texto e o descartaria ao lado de
// `text-muted-foreground`: o lide ficaria sem tamanho. Só no servidor: o
// que vai ao navegador (ilhas/, ui/) não usa o cn.
export const cn = createCn({
  extend: { theme: { text: ["rotulo", "nota", "corpo", "destaque", "numero", "titulo", "display"] } },
})

// Roda sozinho depois do `next build` (o "postbuild" do package.json). Se a compilação saiu em modo
// standalone — o web app Node.js da Hostinger o força (SAIDA=servidor) —, copia para dentro dele o que o
// servidor standalone não leva sozinho: a pasta public/ e os arquivos de .next/static. Sem isso, as
// fotos, o ícone e o cartão de compartilhamento dão 404 (medido no site do Atlas em 03.10.2026).
// No export estático, não faz nada (producao/esteira/13-tecnologia-e-estrutura.md, seção 5.1).
import { cpSync, existsSync } from "node:fs";

if (existsSync(".next/standalone")) {
  cpSync("public", ".next/standalone/public", { recursive: true });
  cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
  console.log("standalone: public/ e .next/static copiados para .next/standalone");
}

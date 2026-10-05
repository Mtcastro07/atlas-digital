// Roda sozinho depois do `next build` (o "postbuild" do package.json).
// Se a compilação saiu em modo standalone — o web app de Next.js da
// Hostinger o força —, copia para dentro dele o que o servidor standalone não
// leva sozinho: a pasta public/ (dela, só vai junto o que o código lê na
// compilação, como as fotos dos sócios) e os arquivos de .next/static. Sem
// isso, o logotipo, as prévias, as telas e a imagem de compartilhamento
// davam 404 (medido em 03/10). Sem standalone (o `npm run build` daqui), não
// faz nada.
import { cpSync, existsSync } from "node:fs";

if (existsSync(".next/standalone")) {
  cpSync("public", ".next/standalone/public", { recursive: true });
  cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
  console.log("standalone: public/ e .next/static copiados para .next/standalone");
}

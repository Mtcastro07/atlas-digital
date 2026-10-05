// Prepara a foto de um sócio para o painel "Quem faz" (página O Atlas):
// corta em quadrado — centrado na largura e puxado para o alto da foto,
// onde costuma estar o rosto —, reduz para 480 × 480 px e grava em WebP
// (qualidade 82) em public/socios/<nome>.webp. Aceita JPG, PNG, WebP e
// AVIF de qualquer tamanho (a foto do celular, como saiu), respeitando a
// rotação gravada nela. O Chrome sem janela faz o desenho. Nenhuma
// dependência.
//
// Uso (dentro de web/):
//   node ferramentas/preparar-fotos.mjs <foto> <nome do arquivo> [topo]
//   node ferramentas/preparar-fotos.mjs ~/Downloads/gabriel.jpg gabriel-ribeiro-ota-yida
// <nome do arquivo>: o `foto` do sócio em conteudo/site.ts (quemFaz.socios).
// [topo]: de 0 a 1, onde o quadrado começa na altura da foto em pé (0, no
// alto; 0,5, no meio; padrão 0,3). Variável opcional: CHROME (caminho do
// executável).

import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const raiz = path.resolve(import.meta.dirname, "..");
const LADO = 480;

const [, , origem, nome, topoTexto = "0.3"] = process.argv;
if (!origem || !nome) {
  console.error("Uso: node ferramentas/preparar-fotos.mjs <foto> <nome do arquivo> [topo]");
  process.exit(1);
}
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(nome)) throw new Error("O nome do arquivo vai em minúsculas, sem acento, com hífens (o `foto` de conteudo/site.ts).");
const topo = Math.min(1, Math.max(0, Number(topoTexto.replace(",", "."))));
const tipos = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif" };
const tipo = tipos[path.extname(origem).toLowerCase()];
if (!tipo) throw new Error("Formato não aceito: use JPG, PNG, WebP ou AVIF.");

const dados = (await readFile(origem)).toString("base64");
const html = `<!doctype html><html><head><meta charset="utf-8"></head><body>
<img id="foto" src="data:${tipo};base64,${dados}">
<script>
addEventListener("load", () => {
  const foto = document.getElementById("foto");
  const lado = Math.min(foto.naturalWidth, foto.naturalHeight);
  const x = (foto.naturalWidth - lado) / 2;
  const y = (foto.naturalHeight - lado) * ${topo};
  const tela = document.createElement("canvas");
  tela.width = tela.height = ${LADO};
  const g = tela.getContext("2d");
  g.imageSmoothingQuality = "high";
  g.drawImage(foto, x, y, lado, lado, 0, 0, ${LADO}, ${LADO});
  document.body.textContent = tela.toDataURL("image/webp", 0.82);
});
</script></body></html>`;

const pasta = await mkdtemp(path.join(tmpdir(), "atlas-foto-"));
const pagina = path.join(pasta, "foto.html");
await writeFile(pagina, html);
const resultado = spawnSync(CHROME, ["--headless=new", "--disable-gpu", "--dump-dom", "--virtual-time-budget=10000", `file://${pagina}`], {
  encoding: "utf8",
  maxBuffer: 64 * 1024 * 1024,
});
const webp = resultado.stdout?.match(/data:image\/webp;base64,([A-Za-z0-9+/=]+)/)?.[1];
if (resultado.status !== 0 || !webp) throw new Error("O Chrome não preparou a foto (o arquivo abre num navegador?).");

const destino = path.join(raiz, "public", "socios", `${nome}.webp`);
await mkdir(path.dirname(destino), { recursive: true });
const bytes = Buffer.from(webp, "base64");
await writeFile(destino, bytes);
console.log(`Foto gravada em ${path.relative(raiz, destino)} (${LADO} × ${LADO}, ${Math.round(bytes.length / 1024)} KB).`);

// Gera a imagem de compartilhamento do site (public/compartilhar.png,
// 1200 × 630): o cartão que aparece quando um endereço do Atlas é colado
// no WhatsApp, no LinkedIn ou numa conversa. Desenhado em HTML, com as
// fontes do site (app/fontes/) e o letreiro da marca (public/marca.svg),
// e fotografado pelo Chrome sem janela. Nenhuma dependência.
//
// Uso (dentro de web/):
//   node ferramentas/capturar-compartilhamento.mjs
// Variável opcional: CHROME (caminho do executável).

import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const raiz = path.resolve(import.meta.dirname, "..");
const fonte = (arquivo) => `url("file://${path.join(raiz, "app", "fontes", arquivo)}") format("woff2")`;

const marca = await readFile(path.join(raiz, "public", "marca.svg"), "utf8");
const letreiro = marca.slice(marca.indexOf('<g id="letreiro"'), marca.lastIndexOf("</svg>"));
const globo = `<defs><clipPath id="r"><circle cx="163" cy="24" r="24"/></clipPath></defs><g clip-path="url(#r)" fill="none" stroke="#c99a5b" stroke-width="4.5"><circle cx="163" cy="24" r="21.75"/><ellipse cx="163" cy="24" rx="9.75" ry="21.75"/><line x1="142.58" y1="16.5" x2="183.42" y2="16.5"/><line x1="142.58" y1="31.5" x2="183.42" y2="31.5"/></g>`;

// O globo grande, em traço de bronze, à direita (a mesma construção de components/marca/globo.tsx).
const R = 90;
const corda = (y) => Math.sqrt(R * R - y * y);
const meridianos = [0, 1, 2, 3]
  .map((k) => Math.cos(2 * Math.PI * (Math.acos(0.448) / (2 * Math.PI) + k / 8)))
  .map((e, k) => `<ellipse rx="${(R * Math.abs(e)).toFixed(2)}" ry="${R}" stroke-opacity="${k === 0 ? 1 : 0.4}"/>`)
  .join("");
const paralelos = [-R * 0.345, R * 0.345].map((y) => `<path d="M${-corda(y)} ${y}H${corda(y)}"/>`).join("");
const reticula = [-R * 0.66, R * 0.66].map((y) => `<path d="M${-corda(y)} ${y}H${corda(y)}" stroke-opacity=".4"/>`).join("");

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>
@font-face { font-family: "Titulo"; src: ${fonte("archivo-black.woff2")}; font-weight: 400; }
@font-face { font-family: "Sub"; src: ${fonte("archivo-variavel.woff2")}; font-weight: 300 500; }
@font-face { font-family: "Texto"; src: ${fonte("inter-variavel.woff2")}; font-weight: 400 700; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; color: #f5f3f0;
  background: radial-gradient(60% 80% at 92% 105%, rgb(201 154 91 / .28), transparent 60%),
              radial-gradient(70% 70% at -10% -20%, rgb(255 255 255 / .07), transparent 60%), #0f2a47; }
.quadro { position: absolute; inset: 0; padding: 64px 72px; display: flex; flex-direction: column; justify-content: space-between; }
.marca { height: 66px; width: 170px; align-self: flex-start; color: #f5f3f0; overflow: visible; }
h1 { font-family: "Titulo"; font-weight: 400; font-size: 92px; line-height: .96; letter-spacing: -.035em; }
p { font-family: "Sub"; font-weight: 300; font-size: 33px; letter-spacing: -.015em; color: #c9d3de; margin-top: 22px; }
.pe { font-family: "Texto"; font-weight: 600; font-size: 22px; color: #c99a5b; display: flex; gap: 28px; }
.globo { position: absolute; right: -150px; top: 40px; width: 640px; height: 640px; fill: none; stroke: #c99a5b; stroke-width: .5; }
</style></head><body>
<svg class="globo" viewBox="-100 -100 200 200">${reticula}${meridianos}<circle r="${R}"/>${paralelos}</svg>
<div class="quadro">
  <svg class="marca" viewBox="0 0 426 166">${letreiro}${globo}</svg>
  <div><h1>Sua empresa<br>online em 24h</h1><p>Sites para o comércio local de Niterói.</p></div>
  <div class="pe"><span>agenciaatlasdigital.com</span><span style="color:#c9d3de;font-weight:400">Preço publicado · rascunho em 24 h</span></div>
</div>
</body></html>`;

const pasta = await mkdtemp(path.join(tmpdir(), "atlas-compartilhar-"));
const pagina = path.join(pasta, "cartao.html");
await writeFile(pagina, html);
const saida = path.join(raiz, "public", "compartilhar.png");
const resultado = spawnSync(
  CHROME,
  ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-color-profile=srgb", "--window-size=1200,630", `--screenshot=${saida}`, `file://${pagina}`],
  { stdio: "inherit" },
);
if (resultado.status !== 0) throw new Error("O Chrome não gerou a imagem.");
console.log(`Imagem gravada em ${path.relative(raiz, saida)}`);

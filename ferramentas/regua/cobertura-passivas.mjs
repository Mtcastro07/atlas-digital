// A cobertura das passivas (R10, acabamento, 02/11): em quantas telas de cada página algo se move sem ação de quem
// visita, depois de assentar. conferir-passivas.mjs prova o contrato de cada passiva; este roteiro prova que elas se
// veem na página inteira. O método é o da conferência de 01/11 (R10/construcao/conferencia-decisoes/roteiros/passivas.mjs):
// uma parada a cada 0,85 tela, 2 s para assentar e seis quadros em 9,6 s, contando os pixels que mudam contra o
// primeiro. A tela "se move" quando o pior quadro muda 0,2% dos pixels ou mais, a 16 níveis de 255 ou mais.
//
// A porta (decisão do orquestrador, 02/11): em cada página, a 1440 e a 390, ao menos 60% das telas com movimento e
// nunca mais de duas telas seguidas paradas. O pé comum (a próxima página e o rodapé) não entra na conta: as peças comuns
// ficam quietas (CONTRATO.md, 4.1). Sai com 1 se alguma reprovar. Não mede quadros (ferramentas/regua/quadros.mjs).
//
//   node ferramentas/regua/cobertura-passivas.mjs --base=http://127.0.0.1:3320 [--pagina=/planos ...] [--largura=1440]
//   node ferramentas/regua/cobertura-passivas.mjs --autoteste
// Saída: o resumo no terminal e .regua/cobertura.json.

import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const argumentos = process.argv.slice(2);
const opcao = (nome) => argumentos.find((a) => a.startsWith(`--${nome}=`))?.slice(nome.length + 3);
const lista = (nome) => argumentos.filter((a) => a.startsWith(`--${nome}=`)).map((a) => a.slice(nome.length + 3));
const BASE = (opcao("base") ?? "http://127.0.0.1:3320").replace(/\/$/, "");
const SETE = ["/", "/para-quem", "/planos", "/orcamento", "/o-trabalho", "/o-atlas", "/duvidas"];
const PAGINAS = lista("pagina").length ? lista("pagina") : SETE;
const LARGURAS = {
  1440: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  390: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
};
const ESCOLHIDAS = lista("largura").length ? lista("largura") : Object.keys(LARGURAS);
const PISO_PIXELS = 0.2; // % da tela
const PISO_NIVEL = 16;
const META = { telas: 0.6, seguidas: 2 };
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

/** A maior sequência de telas paradas. */
export function maiorSequenciaParada(telas) {
  let maior = 0;
  let agora = 0;
  for (const t of telas) {
    agora = t ? 0 : agora + 1;
    maior = Math.max(maior, agora);
  }
  return maior;
}

if (argumentos.includes("--autoteste")) {
  assert.equal(maiorSequenciaParada([]), 0);
  assert.equal(maiorSequenciaParada([true, false, false, true, false]), 2);
  assert.equal(maiorSequenciaParada([false, false, false]), 3);
  console.log("autoteste: conforme");
  process.exit(0);
}

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const { chromium } = await import(new URL("../../node_modules/playwright/index.mjs", import.meta.url));

async function bruto(png) {
  const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}

function mudou(a, b) {
  let n = 0;
  for (let i = 0; i < a.data.length; i += 3) {
    if (Math.max(Math.abs(a.data[i] - b.data[i]), Math.abs(a.data[i + 1] - b.data[i + 1]), Math.abs(a.data[i + 2] - b.data[i + 2])) >= PISO_NIVEL) n++;
  }
  return (100 * n) / (a.w * a.h);
}

async function varrer(browser, caminho, largura) {
  const ctx = await browser.newContext({ ...LARGURAS[largura], reducedMotion: "no-preference" });
  const page = await ctx.newPage();
  await page.goto(BASE + caminho, { waitUntil: "load" });
  await espera(2500);
  const passo = Math.round(LARGURAS[largura].viewport.height * 0.85);
  const telas = [];
  for (let y = 0; ; y += passo) {
    // O fim da conta: a tela em que o pé comum já ocupa a metade de cima.
    const alto = await page.evaluate(() => (document.querySelector("nav:has(.cm-proxima), footer")?.getBoundingClientRect().top ?? 0) + scrollY);
    if (y + LARGURAS[largura].viewport.height / 2 >= alto) break;
    await page.evaluate((top) => scrollTo({ top, behavior: "instant" }), y);
    await espera(2000);
    const primeiro = await bruto(await page.screenshot());
    let pior = 0;
    for (let k = 0; k < 6; k++) {
      await espera(1600);
      pior = Math.max(pior, mudou(primeiro, await bruto(await page.screenshot())));
    }
    const passivas = await page.evaluate(() =>
      [...document.querySelectorAll("[data-passiva]")]
        .filter((e) => {
          const r = e.getBoundingClientRect();
          return r.bottom > 0 && r.top < innerHeight && r.width > 0 && r.height > 0;
        })
        .map((e) => e.dataset.passiva),
    );
    telas.push({ y, pct: +pior.toFixed(3), viva: pior >= PISO_PIXELS, passivas });
  }
  await ctx.close();
  const vivas = telas.filter((t) => t.viva).length;
  const seguidas = maiorSequenciaParada(telas.map((t) => t.viva));
  return { caminho, largura, vivas, total: telas.length, parte: vivas / telas.length, seguidas, aprova: vivas / telas.length >= META.telas && seguidas <= META.seguidas, telas };
}

const browser = await chromium.launch({ channel: "chrome" });
const relatorio = [];
for (const largura of ESCOLHIDAS) {
  // As páginas em paralelo: aqui se contam pixels, e não quadros, e a pausa entre as capturas folga para a concorrência.
  relatorio.push(...(await Promise.all(PAGINAS.map((p) => varrer(browser, p, largura)))));
}
await browser.close();

await mkdir(".regua", { recursive: true });
await writeFile(".regua/cobertura.json", JSON.stringify({ quando: new Date().toISOString(), base: BASE, piso: { pixels: PISO_PIXELS, nivel: PISO_NIVEL }, meta: META, relatorio }, null, 1));
let reprovou = false;
for (const r of relatorio) {
  reprovou ||= !r.aprova;
  const mapa = r.telas.map((t) => (t.viva ? "#" : ".")).join("");
  console.log(`${r.aprova ? "ok " : "NÃO"} ${String(r.largura).padEnd(5)}${r.caminho.padEnd(12)} ${r.vivas}/${r.total} (${Math.round(r.parte * 100)}%) seguidas ${r.seguidas}  ${mapa}`);
}
const soma = (f) => relatorio.reduce((n, r) => n + f(r), 0);
console.log(`total: ${soma((r) => r.vivas)} de ${soma((r) => r.total)} telas`);
process.exit(reprovou ? 1 : 0);

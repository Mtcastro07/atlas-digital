// Captura as telas dos demonstrativos em imagem e mede os marcadores.
//
// Uso (dentro de web/):
//   npm run dev                          # em outro terminal
//   node ferramentas/capturar-telas.mjs
//
// Para cada tela em /ferramentas/telas/<id> (só existe em desenvolvimento):
//   - fotografa 390 × 844 com densidade 1,6 (624 px de largura: basta para
//     o maior uso na página) → public/telas/<id>.webp;
//   - mede cada elemento com data-alvo="n" → conteudo/telas-posicoes.json,
//     em % da tela, para os marcadores numerados da página.
// Abre um Chrome sem janela e fala com ele pelo DevTools Protocol, via
// WebSocket nativo do Node (22 ou mais recente): nenhuma dependência.
// Variáveis opcionais: CHROME (caminho do executável), BASE (endereço do
// servidor de desenvolvimento).

import { spawn } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.BASE ?? "http://localhost:3000";
const PORTA = 9337;
const TELAS = ["deposito", "nutricao"];
const LARGURA = 390;
const ALTURA = 844;
const DENSIDADE = 1.6;
const QUALIDADE = 78;

const raiz = path.resolve(import.meta.dirname, "..");
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

async function abrirChrome() {
  const perfil = await mkdtemp(path.join(tmpdir(), "atlas-captura-"));
  const processo = spawn(CHROME, [
    "--headless=new",
    `--remote-debugging-port=${PORTA}`,
    `--user-data-dir=${perfil}`,
    "--hide-scrollbars",
    "--force-color-profile=srgb",
    "about:blank",
  ]);
  for (let i = 0; i < 50; i++) {
    try {
      await fetch(`http://127.0.0.1:${PORTA}/json/version`);
      return processo;
    } catch {
      await espera(100);
    }
  }
  processo.kill();
  throw new Error("O Chrome não respondeu na porta de depuração.");
}

/** Conexão com uma aba: envia comandos e espera eventos. */
async function conectar() {
  const abas = await (await fetch(`http://127.0.0.1:${PORTA}/json`)).json();
  const aba = abas.find((a) => a.type === "page");
  const ws = new WebSocket(aba.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));
  let proximo = 0;
  const pendentes = new Map();
  const ouvintes = new Map();
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pendentes.has(msg.id)) {
      const { resolver, rejeitar } = pendentes.get(msg.id);
      pendentes.delete(msg.id);
      msg.error ? rejeitar(new Error(msg.error.message)) : resolver(msg.result);
    } else if (msg.method && ouvintes.has(msg.method)) {
      ouvintes.get(msg.method)(msg.params);
      ouvintes.delete(msg.method);
    }
  });
  return {
    comando: (method, params = {}) =>
      new Promise((resolver, rejeitar) => {
        const id = ++proximo;
        pendentes.set(id, { resolver, rejeitar });
        ws.send(JSON.stringify({ id, method, params }));
      }),
    evento: (method) => new Promise((r) => ouvintes.set(method, r)),
    fechar: () => ws.close(),
  };
}

/** Mede os elementos data-alvo: canto direito, perto do topo, em % da tela. */
const MEDIR = `(() => {
  const tela = document.querySelector("[data-tela]").getBoundingClientRect();
  const posicoes = {};
  for (const el of document.querySelectorAll("[data-alvo]")) {
    const r = el.getBoundingClientRect();
    const x = r.right - 14 - tela.left;
    const y = r.top + Math.min(r.height / 2, 22) - tela.top;
    posicoes[el.dataset.alvo] = {
      x: Math.round((x / tela.width) * 1000) / 10,
      y: Math.round((y / tela.height) * 1000) / 10,
    };
  }
  return JSON.stringify(posicoes);
})()`;

const chrome = await abrirChrome();
const aba = await conectar();
const posicoes = {};

try {
  await aba.comando("Page.enable");
  await aba.comando("Emulation.setDeviceMetricsOverride", {
    width: LARGURA,
    height: ALTURA,
    deviceScaleFactor: DENSIDADE,
    mobile: true,
  });
  for (const id of TELAS) {
    const carregou = aba.evento("Page.loadEventFired");
    await aba.comando("Page.navigate", { url: `${BASE}/ferramentas/telas/${id}` });
    await carregou;
    await aba.comando("Runtime.evaluate", { expression: "document.fonts.ready", awaitPromise: true });
    // O indicador do modo de desenvolvimento do Next não pode sair na foto.
    await aba.comando("Runtime.evaluate", { expression: "document.querySelectorAll('nextjs-portal').forEach((n) => n.remove())" });
    await espera(300);

    const medida = await aba.comando("Runtime.evaluate", { expression: MEDIR, returnByValue: true });
    posicoes[id] = JSON.parse(medida.result.value);

    const foto = await aba.comando("Page.captureScreenshot", {
      format: "webp",
      quality: QUALIDADE,
      clip: { x: 0, y: 0, width: LARGURA, height: ALTURA, scale: 1 },
    });
    const destino = path.join(raiz, "public", "telas", `${id}.webp`);
    await writeFile(destino, Buffer.from(foto.data, "base64"));
    console.log(`${id}: ${(Buffer.from(foto.data, "base64").length / 1024).toFixed(1)} KB → public/telas/${id}.webp`);
  }
  await writeFile(path.join(raiz, "conteudo", "telas-posicoes.json"), JSON.stringify(posicoes, null, 2) + "\n");
  console.log("posições → conteudo/telas-posicoes.json");
} finally {
  aba.fechar();
  chrome.kill();
}

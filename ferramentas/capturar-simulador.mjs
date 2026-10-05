// Fotografa os três sites do simulador (app/demos/) para as prévias da
// escada e dos planos (components/secoes/escada.tsx, planos.tsx).
//
// Uso (dentro de web/):
//   npm run dev                              # em outro terminal
//   node ferramentas/capturar-simulador.mjs
//
// Para cada site, a primeira tela depois da entrada da capa (e do palco
// 3D da barbearia, que o Chrome sem janela desenha em software):
//   - computador: janela de 1440 × 900, gravada com densidade 0,5 (720 px
//     de largura: o dobro do maior uso na escada) → public/simulador/<plano>-computador.webp,
//     e com densidade 0,25 (360 px, para o cartão dos planos, de 232 px) →
//     public/simulador/<plano>-computador-360.webp;
//   - celular: janela de 390 × 844, densidade 0,75 → public/simulador/<plano>-celular.webp.
// Abre um Chrome sem janela e fala com ele pelo DevTools Protocol, via
// WebSocket nativo do Node: nenhuma dependência. Variáveis opcionais:
// CHROME (caminho do executável), BASE (endereço do servidor).

import { spawn } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.BASE ?? "http://localhost:3000";
const PORTA = 9338;
const SITES = [
  { plano: "essencial", caminho: "/demos/nutricao" },
  { plano: "profissional", caminho: "/demos/deposito" },
  { plano: "completo", caminho: "/demos/barbearia" },
];
const APARELHOS = [
  { nome: "computador", largura: 1440, altura: 900, densidade: 0.5, celular: false },
  { nome: "computador-360", largura: 1440, altura: 900, densidade: 0.25, celular: false },
  { nome: "celular", largura: 390, altura: 844, densidade: 0.75, celular: true },
];
const QUALIDADE = 80;
/** A entrada da capa mais longa (a barbearia) termina em ~2,2 s; o palco 3D dela chega depois, com o navegador ocioso. */
const ENTRADA = 6500;

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
    // O palco 3D da barbearia (WebGL) no Chrome sem janela: desenho em software.
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--ignore-gpu-blocklist",
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

const chrome = await abrirChrome();
const aba = await conectar();

try {
  await aba.comando("Page.enable");
  for (const aparelho of APARELHOS) {
    await aba.comando("Emulation.setDeviceMetricsOverride", {
      width: aparelho.largura,
      height: aparelho.altura,
      deviceScaleFactor: aparelho.densidade,
      mobile: aparelho.celular,
    });
    for (const site of SITES) {
      const carregou = aba.evento("Page.loadEventFired");
      await aba.comando("Page.navigate", { url: `${BASE}${site.caminho}` });
      await carregou;
      await aba.comando("Runtime.evaluate", { expression: "document.fonts.ready", awaitPromise: true });
      // O indicador do modo de desenvolvimento do Next não pode sair na foto.
      await aba.comando("Runtime.evaluate", { expression: "document.querySelectorAll('nextjs-portal').forEach((n) => n.remove())" });
      await espera(ENTRADA);
      const foto = await aba.comando("Page.captureScreenshot", {
        format: "webp",
        quality: QUALIDADE,
        clip: { x: 0, y: 0, width: aparelho.largura, height: aparelho.altura, scale: 1 },
      });
      const nome = `${site.plano}-${aparelho.nome}.webp`;
      await writeFile(path.join(raiz, "public", "simulador", nome), Buffer.from(foto.data, "base64"));
      console.log(`${nome}: ${(Buffer.from(foto.data, "base64").length / 1024).toFixed(1)} KB`);
    }
  }
} finally {
  aba.fechar();
  chrome.kill();
}

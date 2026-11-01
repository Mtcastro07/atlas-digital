#!/usr/bin/env node
// producao/ferramentas/conferir-ambiente.mjs — confere a máquina antes do primeiro site: o que bloqueia a produção, o
// que a melhora e o que o Claude Code do projeto ainda não tem. Não instala nada: o que falta, o usuário instala, pelo
// comando que esta ferramenta imprime (claude/novo-site.md, passo 0). Só o Node, sem dependência: roda num projeto
// virgem, antes do npm ci. Se nem o `node` existir, este arquivo não roda: peça o Node 22 ao usuário primeiro.
//
// Uso (na raiz do projeto, onde está a pasta producao/): node producao/ferramentas/conferir-ambiente.mjs
// Sai com código 1 se algo bloqueia.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const MAC = process.platform === "darwin";
const naPath = (cmd) => {
  try {
    execFileSync(MAC || process.platform === "linux" ? "which" : "where", [cmd], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};
const ler = (arquivo) => (existsSync(arquivo) ? readFileSync(arquivo, "utf8") : "");

// O Chrome instalado: a régua, as capturas e as fotos usam `channel: "chrome"` (o Playwright não baixa navegador).
const CHROME = {
  darwin: ["/Applications/Google Chrome.app", path.join(os.homedir(), "Applications/Google Chrome.app")],
  win32: [process.env.PROGRAMFILES, process.env["PROGRAMFILES(X86)"], process.env.LOCALAPPDATA].filter(Boolean).map((p) => path.join(p, "Google/Chrome/Application/chrome.exe")),
};
const temChrome = (CHROME[process.platform] ?? []).some(existsSync) || naPath("google-chrome") || naPath("google-chrome-stable");

const [maior, menor] = process.versions.node.split(".").map(Number);
const node = maior > 22 || (maior === 22 && menor >= 6);
const nodeParaLighthouse = maior > 22 || (maior === 22 && menor >= 19);

let rede = false;
try {
  rede = (await fetch("https://registry.npmjs.org/-/ping", { signal: AbortSignal.timeout(5000) })).ok;
} catch {}

const mcp = ler(".mcp.json");
const config = ler(".claude/settings.json");
const PLUGINS = ["context7", "frontend-design", "security-guidance", "typescript-lsp"];
const pluginsFaltando = PLUGINS.filter((p) => !config.includes(`"${p}@claude-plugins-official": true`));

// [o quê, está pronto, bloqueia, o que fazer]
const itens = [
  ["Node 22.6 ou mais novo", node, true, `Node ${process.versions.node} aqui. Instale o 22: \`brew install node@22\` (macOS) ou https://nodejs.org/`],
  ["npm", naPath("npm"), true, "vem com o Node: reinstale o Node 22"],
  ["Google Chrome", temChrome, true, "instale o Chrome (https://www.google.com/chrome/): a régua, as capturas e as fotos usam o Chrome da máquina"],
  ["Rede até o registro do npm", rede, false, "sem rede daqui. Com o sandbox do Claude Code ligado, é o esperado: o `npm ci`, as fontes e o mapa rodam com o sandbox desligado, e o Claude Code pede essa permissão a cada vez"],
  ["Node 22.19 ou mais novo, para o Lighthouse 13", nodeParaLighthouse, false, "só a medição do Lighthouse pede (producao/qualidade/08-desempenho.md); o resto do kit roda no 22.6"],
  ["git", naPath("git"), false, `para versionar o site: \`${MAC ? "xcode-select --install" : "sudo apt-get install git"}\` (commit e push, só com pedido do usuário)`],
  ["typescript-language-server (o plugin typescript-lsp)", naPath("typescript-language-server"), false, "`npm install -g typescript-language-server@6.0.1 typescript@5.9.3`"],
  ["poppler (o Read abre PDF de mais de dez páginas: as normas)", naPath("pdftoppm"), false, MAC ? "`brew install poppler`" : "`sudo apt-get install poppler-utils`"],
  ["Playwright MCP no projeto (.mcp.json)", mcp.includes("@playwright/mcp@"), false, "`claude mcp add --scope project playwright -- npx -y @playwright/mcp@0.0.83 --headless --isolated --output-dir .playwright-mcp`"],
  ["Plugins do projeto (.claude/settings.json)", pluginsFaltando.length === 0, false, pluginsFaltando.map((p) => `\`claude plugin install ${p}@claude-plugins-official --scope project\``).join("; ")],
  ["Docker (só para testar o formulário e a Agenda contra um banco)", naPath("docker"), false, "https://www.docker.com/products/docker-desktop/ (producao/modulos/README.md, seção 8)"],
];

console.log("O ambiente da produção (producao/claude/ferramental.md):\n");
for (const [oque, pronto, bloqueia, fazer] of itens) {
  console.log(`${pronto ? "✓" : bloqueia ? "✗" : "·"} ${oque}${pronto ? "" : `\n    ${bloqueia ? "BLOQUEIA" : "recomendado"}: ${fazer}`}`);
}
const bloqueios = itens.filter(([, pronto, bloqueia]) => bloqueia && !pronto).length;
console.log(
  `\n${bloqueios ? `${bloqueios} item(ns) bloqueiam a produção.` : "Nada bloqueia a produção."} ` +
    "O que é da máquina, o usuário instala: no Claude Code, com `!` na frente do comando, a saída fica na conversa. " +
    "Os comandos `claude` (plugins e MCP) também se rodam assim e valem a partir da próxima sessão.",
);
process.exitCode = bloqueios ? 1 : 0;

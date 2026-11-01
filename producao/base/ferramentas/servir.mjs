// ferramentas/servir.mjs — serve a pasta out/ (o export estático) como a hospedagem comum a serviria, para
// a régua e as capturas medirem o site de verdade (producao/esteira/13-tecnologia-e-estrutura.md, seção 4):
// - comprime (brotli ou gzip), como a hospedagem: a régua mede o que é transferido, e sem compressão o
//   script do Next pesa ~3 vezes mais;
// - aplica os cabeçalhos do out/.htaccess gerado (as linhas "Header always set"), e a régua confere a
//   política de conteúdo também no modo estático;
// - /servicos → /servicos/ (301), /servicos/ → servicos/index.html, e o que não existe → 404.html com 404.
// Sem dependência. O python3 -m http.server não serve para medir: não comprime e recusa conexões com
// várias páginas em paralelo (fila de 5), o que a régua lê como falha do site (medido em 08.10.2026).
//
// Uso (na raiz do site, depois do npm run build): npm run estatico [-- --porta=3100]
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { brotliCompressSync, gzipSync } from "node:zlib";

const PORTA = Number(process.argv.find((a) => a.startsWith("--porta="))?.slice(8) ?? 3100);
const RAIZ = path.resolve("out");
if (!existsSync(RAIZ)) {
  console.error("Sem out/: rode npm run build (no modo estático) antes.");
  process.exit(1);
}

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".txt": "text/plain; charset=utf-8", // os dados da navegação interna do Next
  ".json": "application/json",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};
const COMPRIMIVEL = /\.(html|js|css|txt|json|xml|svg|webmanifest)$/;

// Os cabeçalhos de toda resposta, lidos do .htaccess que o postbuild gerou.
const htaccess = existsSync(path.join(RAIZ, ".htaccess")) ? readFileSync(path.join(RAIZ, ".htaccess"), "utf8") : "";
const CABECALHOS = Object.fromEntries([...htaccess.matchAll(/^\s*Header always set ([\w-]+) "([^"]*)"/gm)].map(([, nome, valor]) => [nome, valor]));
if (!htaccess) console.warn("aviso: out/.htaccess não existe; servindo sem os cabeçalhos de segurança.");

// arquivo + codificação + data de modificação → corpo comprimido. A data entra na chave: depois de um
// npm run build com o servidor no ar, o arquivo novo é servido, e não o guardado.
const memoria = new Map();
function corpo(arquivo, codificacao) {
  const chave = `${arquivo}|${codificacao}|${statSync(arquivo).mtimeMs}`;
  if (!memoria.has(chave)) {
    const bruto = readFileSync(arquivo);
    memoria.set(chave, codificacao === "br" ? brotliCompressSync(bruto) : codificacao === "gzip" ? gzipSync(bruto) : bruto);
  }
  return memoria.get(chave);
}

function responder(pedido, resposta, arquivo, status = 200) {
  const ext = path.extname(arquivo).toLowerCase();
  const aceita = String(pedido.headers["accept-encoding"] ?? "");
  const codificacao = COMPRIMIVEL.test(ext) ? (/\bbr\b/.test(aceita) ? "br" : /\bgzip\b/.test(aceita) ? "gzip" : "") : "";
  const dados = corpo(arquivo, codificacao);
  resposta.writeHead(status, {
    ...CABECALHOS,
    "Content-Type": TIPOS[ext] ?? "application/octet-stream",
    "Content-Length": dados.length,
    "Cache-Control": "no-cache",
    ...(codificacao ? { "Content-Encoding": codificacao, Vary: "Accept-Encoding" } : {}),
  });
  resposta.end(pedido.method === "HEAD" ? undefined : dados);
}

createServer((pedido, resposta) => {
  let caminho;
  try {
    caminho = decodeURIComponent(new URL(pedido.url, "http://local").pathname);
  } catch {
    caminho = "/__invalido__";
  }
  const alvo = path.join(RAIZ, caminho);
  if (!alvo.startsWith(RAIZ)) return responder(pedido, resposta, path.join(RAIZ, "404.html"), 404);
  if (existsSync(alvo) && statSync(alvo).isDirectory()) {
    if (!caminho.endsWith("/")) {
      resposta.writeHead(301, { ...CABECALHOS, Location: `${caminho}/` });
      return resposta.end();
    }
    const indice = path.join(alvo, "index.html");
    if (existsSync(indice)) return responder(pedido, resposta, indice);
  } else if (existsSync(alvo)) {
    return responder(pedido, resposta, alvo);
  }
  responder(pedido, resposta, path.join(RAIZ, "404.html"), 404);
}).listen(PORTA, () => console.log(`servindo out/ em http://localhost:${PORTA} (comprimido, com os cabeçalhos do .htaccess)`));

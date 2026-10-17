// Avisa o IndexNow das páginas do site do Atlas que MUDARAM numa publicação. O aviso chega a Bing, Yandex, Naver,
// Seznam, Yep e Amazon (indexnow.org/documentation); o Bing alimenta o Copilot. O Google não participa: basta o sitemap.
// Quando: depois de publicar e de passar a conferência no ar (producao/esteira/18-publicacao-e-manutencao.md, seção 5),
// só com as páginas cujo conteúdo mudou ("Submit only when content has changed", indexnow.org/faq).
// A chave é public/<chave>.txt (32 hexadecimais, com a própria chave dentro): é pública por desenho, só prova a posse
// do domínio. Nenhum dado de visitante sai daqui: o pedido leva só os endereços das páginas.
// Uso, na pasta do site:
//   node ferramentas/avisar-indexnow.mjs / /planos            envia
//   node ferramentas/avisar-indexnow.mjs --ensaio / /planos   confere tudo e mostra o pedido, sem enviar
//   BASE=http://localhost:3000 node ferramentas/avisar-indexnow.mjs --ensaio /   contra o build local
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const SITE = "https://agenciaatlasdigital.com"; // o mesmo de conteudo/contato.ts (contato.url)
const BASE = (process.env.BASE ?? SITE).replace(/\/$/, "");
const argumentos = process.argv.slice(2);
const ENSAIO = argumentos.includes("--ensaio");
const caminhos = argumentos.filter((a) => a.startsWith("/"));
const parar = (motivo) => {
  console.error(motivo);
  process.exit(1);
};

if (!caminhos.length) parar("Diga as páginas que mudaram: node ferramentas/avisar-indexnow.mjs / /planos");
if (BASE !== SITE && !ENSAIO) parar(`Envio só a partir de ${SITE}; contra ${BASE}, use --ensaio.`);

const pasta = path.resolve(import.meta.dirname, "..", "public");
const chaves = (await readdir(pasta)).filter((n) => /^[a-f0-9]{32}\.txt$/.test(n));
if (chaves.length !== 1) parar(`Esperava uma chave em public/<chave>.txt; achei ${chaves.length}.`);
const chave = chaves[0].slice(0, -4);
if ((await readFile(path.join(pasta, chaves[0]), "utf8")).trim() !== chave) parar("O arquivo da chave não contém a própria chave.");

// A CDN da Hostinger pode responder com a página de verificação de navegador (18, seção 5): sem a chave no ar, nada sai.
const noAr = await fetch(`${BASE}/${chave}.txt`).then((r) => r.text()).catch(() => "");
if (noAr.trim() !== chave) parar(`${BASE}/${chave}.txt não devolve a chave. Publicou? Confira com curl, sem --compressed.`);

// Só páginas do mapa do site: os sites fictícios (/demos/) e o que não é indexável ficam de fora.
const mapa = await fetch(`${BASE}/sitemap.xml`).then((r) => r.text()).catch(() => "");
if (!mapa.includes("<urlset")) parar(`${BASE}/sitemap.xml não respondeu com o mapa.`);
const urlList = caminhos.map((c) => new URL(c, SITE).href);
const fora = urlList.filter((u) => !mapa.includes(`<loc>${u}</loc>`));
if (fora.length) parar(`Fora do mapa do site (não vão ao IndexNow): ${fora.join(", ")}`);

const pedido = { host: new URL(SITE).host, key: chave, keyLocation: `${SITE}/${chave}.txt`, urlList };
if (ENSAIO) {
  console.log(JSON.stringify(pedido, null, 2));
  process.exit(0);
}

const resposta = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(pedido),
});
// 200 recebido; 202 recebido, chave em validação; 400 pedido inválido; 403 chave; 422 URL de outro host; 429 envio demais.
console.log(`${resposta.status} ${resposta.statusText} · ${urlList.length} endereço(s)`);
if (resposta.status !== 200 && resposta.status !== 202) process.exit(1);

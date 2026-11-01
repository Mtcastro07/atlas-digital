// ferramentas/avisar-indexnow.mjs — avisa o IndexNow das páginas que MUDARAM numa publicação
// (producao/esteira/21-busca-e-ias.md, seção 8). O aviso chega a Bing, Yandex, Naver, Seznam, Yep e Amazon
// (indexnow.org/documentation); o Bing alimenta o Copilot. O Google não participa: para ele, basta o mapa do site.
// Quando: depois de publicar e de passar a conferência no ar (producao/esteira/18-publicacao-e-manutencao.md, seção 5),
// só com as páginas cujo conteúdo mudou ("Submit only when content has changed", indexnow.org/faq). Site de exemplo, nunca.
// Sem dependência; nada de dado de visitante: é um aviso do produtor, uma vez por publicação.
//
// Uso (na raiz do site):
//   node ferramentas/avisar-indexnow.mjs --chave-nova                grava public/<chave>.txt, uma vez por site; publique antes de avisar
//   node ferramentas/avisar-indexnow.mjs --ensaio / /servicos/       confere a chave e o mapa no ar e mostra o pedido, sem enviar
//   node ferramentas/avisar-indexnow.mjs / /servicos/                envia
//   BASE=http://localhost:3100 node ferramentas/avisar-indexnow.mjs --ensaio /   contra o build local (só ensaio)
import { randomBytes } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const parar = (motivo) => {
  console.error(motivo);
  process.exit(1);
};
const argumentos = process.argv.slice(2);
const ENSAIO = argumentos.includes("--ensaio");
const caminhos = argumentos.filter((a) => a.startsWith("/"));

const campo = (arquivo, nome) => readFileSync(arquivo, "utf8").match(new RegExp(`^\\s*${nome}:\\s*"([^"]*)"`, "m"))?.[1] ?? "";
if (/^\s*exemplo:\s*true\b/m.test(readFileSync("conteudo/negocio.ts", "utf8"))) parar("Site de exemplo: fica fora da busca, e o IndexNow não é avisado.");
const dominio = campo("conteudo/contato.ts", "dominio");
if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(dominio) || dominio === "exemplo.com.br") parar(`Domínio de exemplo ou inválido em conteudo/contato.ts ("${dominio}").`);
const SITE = `https://${dominio}`;
const BASE = (process.env.BASE ?? SITE).replace(/\/$/, "");

// A chave: de 8 a 128 caracteres; aqui, 32 algarismos hexadecimais, num arquivo public/<chave>.txt com a própria chave.
const chaves = readdirSync("public").filter((n) => /^[a-f0-9]{32}\.txt$/.test(n));
if (argumentos.includes("--chave-nova")) {
  if (chaves.length) parar(`Já existe a chave public/${chaves[0]}: uma por site.`);
  const nova = randomBytes(16).toString("hex");
  writeFileSync(`public/${nova}.txt`, nova); // sem quebra de linha
  console.log(`public/${nova}.txt gravado. Publique o site com ele antes do primeiro aviso.`);
  process.exit(0);
}
if (!caminhos.length) parar("Diga as páginas que mudaram: node ferramentas/avisar-indexnow.mjs / /servicos/");
if (BASE !== SITE && !ENSAIO) parar(`Envio só a partir de ${SITE}; contra ${BASE}, use --ensaio.`);
if (chaves.length !== 1) parar(`Esperava uma chave em public/<chave>.txt; achei ${chaves.length}. Crie com --chave-nova.`);
const chave = chaves[0].slice(0, -4);
if (readFileSync(`public/${chaves[0]}`, "utf8").trim() !== chave) parar("O arquivo da chave não contém a própria chave.");

// A CDN da Hostinger pode responder com a página de verificação de navegador (18, seção 5): sem a chave no ar, nada sai.
const noAr = await fetch(`${BASE}/${chave}.txt`).then((r) => r.text()).catch(() => "");
if (noAr.trim() !== chave) parar(`${BASE}/${chave}.txt não devolve a chave. Publicou? Confira com curl, sem --compressed.`);

// Só páginas do mapa do site: o que é noindex fica de fora. A comparação normaliza a barra da raiz.
const mapa = await fetch(`${BASE}/sitemap.xml`).then((r) => r.text()).catch(() => "");
if (!mapa.includes("<urlset")) parar(`${BASE}/sitemap.xml não respondeu com o mapa.`);
const noMapa = new Set([...mapa.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => new URL(loc).href));
const urlList = caminhos.map((c) => new URL(c, SITE).href);
const fora = urlList.filter((u) => !noMapa.has(u));
if (fora.length) parar(`Fora do mapa do site (não vão ao IndexNow): ${fora.join(", ")}\nNo mapa: ${[...noMapa].join(", ")}`);

const pedido = { host: dominio, key: chave, keyLocation: `${SITE}/${chave}.txt`, urlList };
if (ENSAIO) {
  console.log(JSON.stringify(pedido, null, 2));
  process.exit(0);
}

const resposta = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(pedido),
});
// 200 recebido; 202 recebido, chave em validação; 400 pedido inválido; 403 chave; 422 endereço de outro host; 429 envio demais.
console.log(`${resposta.status} ${resposta.statusText} · ${urlList.length} endereço(s)`);
if (resposta.status !== 200 && resposta.status !== 202) process.exit(1);

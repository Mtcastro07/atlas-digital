#!/usr/bin/env node
// Baixa uma família do Google Fonts para hospedar junto ao site (producao/esteira/05-tipografia.md,
// seções 3 e 4): só o recorte "latin" — que já cobre o português (ã, ç, é, õ estão em
// U+0000-00FF) —, em .woff2, com a licença ao lado. Sem dependência: só o fetch do Node.
//
// O pedido sai da máquina de quem produz, uma vez; o site publicado nunca pede nada ao
// Google (a fonte fica em app/fontes/, servida pelo próprio domínio).
//
// Uso (na raiz do site; a rede precisa estar liberada):
//   node ferramentas/baixar-fonte.mjs "<especificação CSS2>" <titulo|texto> [pasta]
// Exemplos:
//   node ferramentas/baixar-fonte.mjs "Fredoka:wght@400..700" titulo
//   node ferramentas/baixar-fonte.mjs "Nunito:ital,wght@0,400..700;1,400..700" texto
// O nome do arquivo é o papel da família: titulo (exibição) ou texto (corpo), como em app/fontes.ts.
// A especificação é a da API CSS2 (https://developers.google.com/fonts/docs/css2):
// família, eixos e faixas. Fonte variável: peça a faixa (300..700), e vem um arquivo só.
//
// Saída: <pasta>/<nome>.woff2 (e <nome>-italico.woff2, se houver itálico), <pasta>/OFL-<família>.txt
// e, no terminal, o trecho de app/fontes.ts para colar.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [especificacao, nome, pasta = "app/fontes"] = process.argv.slice(2);
if (!especificacao || !nome) {
  console.error('Uso: node ferramentas/baixar-fonte.mjs "<Família:eixos@faixas>" <titulo|texto> [pasta]');
  process.exit(2);
}

// Com o agente de um Chrome atual, a API devolve woff2 e o CSS por recorte (unicode-range).
const AGENTE = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";
const familia = especificacao.split(":")[0];
const endereco = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(especificacao).replace(/%20/g, "+")}&display=swap`;

const css = await fetch(endereco, { headers: { "User-Agent": AGENTE } }).then((r) => {
  if (!r.ok) throw new Error(`A API respondeu ${r.status} para "${especificacao}": confira o nome da família e as faixas dos eixos.`);
  return r.text();
});

// Cada bloco vem precedido de um comentário com o recorte: /* latin */ @font-face { ... }
const blocos = [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([^}]*)\}/g)]
  .filter(([, recorte]) => recorte === "latin")
  .map(([, , corpo]) => ({
    estilo: /font-style:\s*italic/.test(corpo) ? "italic" : "normal",
    peso: corpo.match(/font-weight:\s*([\d ]+);/)?.[1].trim() ?? "400",
    largura: corpo.match(/font-stretch:\s*([^;]+);/)?.[1].trim(),
    url: corpo.match(/url\((https:[^)]+\.woff2)\)/)?.[1],
  }))
  .filter((b) => b.url);

if (blocos.length === 0) throw new Error("Nenhum arquivo do recorte latin no CSS devolvido.");

mkdirSync(pasta, { recursive: true });
const arquivos = [];
// Fonte variável: um bloco por estilo, e o arquivo se chama pelo papel. Pesos avulsos (wght@400;700): um bloco
// por peso, e o peso entra no nome, para um arquivo não sobrescrever o outro.
const porEstilo = (estilo) => blocos.filter((b) => b.estilo === estilo).length;
for (const b of blocos) {
  const peso = porEstilo(b.estilo) > 1 ? `-${b.peso.replace(/\s+/g, "-")}` : "";
  const arquivo = `${nome}${peso}${b.estilo === "italic" ? "-italico" : ""}.woff2`;
  const dados = Buffer.from(await fetch(b.url).then((r) => r.arrayBuffer()));
  writeFileSync(join(pasta, arquivo), dados);
  arquivos.push({ ...b, arquivo, kb: (dados.length / 1024).toFixed(1) });
  console.log(`baixado: ${join(pasta, arquivo)} (${(dados.length / 1024).toFixed(1)} KB; peso ${b.peso}${b.largura ? `; largura ${b.largura}` : ""}; ${b.estilo})`);
}

// A licença, do repositório oficial do Google Fonts: OFL, Apache ou UFL, conforme a pasta.
const slug = familia.toLowerCase().replace(/[^a-z0-9]/g, "");
let licenca = "";
for (const [dir, arquivo] of [["ofl", "OFL.txt"], ["apache", "LICENSE.txt"], ["ufl", "UFL.txt"]]) {
  const r = await fetch(`https://raw.githubusercontent.com/google/fonts/main/${dir}/${slug}/${arquivo}`);
  if (r.ok) {
    licenca = await r.text();
    writeFileSync(join(pasta, `${dir.toUpperCase()}-${slug}.txt`), licenca);
    console.log(`licença: ${join(pasta, `${dir.toUpperCase()}-${slug}.txt`)} (${dir.toUpperCase()})`);
    break;
  }
}
if (!licenca) console.warn(`ATENÇÃO: licença de "${familia}" não encontrada em google/fonts; confira à mão antes de usar (producao/esteira/05-tipografia.md, seção 3).`);

// O trecho para app/fontes.ts (producao/esteira/05-tipografia.md, seção 4.1).
const src = arquivos.map((a) => `    { path: "./fontes/${a.arquivo}", weight: "${a.peso}", style: "${a.estilo}" },`).join("\n");
console.log(`\nPara app/fontes.ts (variável --font-${nome}; ajuste o display e a reserva pela seção 4.2 e 4.3):\n`);
console.log(`export const ${nome} = localFont({\n  src: [\n${src}\n  ],\n  variable: "--font-${nome}",\n  display: "swap",\n});`);
const total = arquivos.reduce((s, a) => s + Number(a.kb), 0);
console.log(`\nPeso desta família: ${total.toFixed(1)} KB (sem teto nos sites de marca; a régua relata o peso na carga: producao/esteira/15-desempenho.md, seção 2.1).`);

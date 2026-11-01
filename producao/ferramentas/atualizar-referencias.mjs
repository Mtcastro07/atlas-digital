#!/usr/bin/env node
// producao/ferramentas/atualizar-referencias.mjs — copia os três sites de exemplo do Atlas (web/app/demos/ e o que eles
// usam) para producao/referencias/sites-de-exemplo/, e o site do próprio Atlas (web/app/(atlas)/ e o que ele usa) para
// producao/referencias/atlas/, para um projeto que só tem o kit poder estudá-los: a identidade de cada um, as páginas,
// as funcionalidades do ofício, a camada de movimento e o acabamento (a esfera, o vidro líquido, as caixas empilhadas,
// a chamada final com o grão, o palco 3D). Desde 09.10.2026, as duas cópias levam também o app/globals.css e o que ele
// importa (vidro.css, movimento.css): antes, o TSX das técnicas vinha sem o CSS delas.
// Só roda no repositório do Atlas, onde existe o web/. A pasta de destino é gerada: apagada e refeita a cada execução,
// com o ORIGEM.md (a data e o commit do web/). Nunca se edita à mão; muda-se o web/ e roda-se de novo.
//
// Uso: node producao/ferramentas/atualizar-referencias.mjs
//
// O que entra: as pastas dos exemplos (app/demos, components/demos, components/ilhas/demos, conteudo/demos) e, pelas
// importações "@/...", cada arquivo do web/ de que eles dependem. As fontes binárias (.woff2) ficam de fora: a
// referência é para estudo, e o kit baixa a fonte de cada marca (base/ferramentas/baixar-fonte.mjs).
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const ATLAS = path.resolve(import.meta.dirname, "../..");
const WEB = path.join(ATLAS, "web");
const REFERENCIAS = path.join(ATLAS, "producao/referencias");
if (!existsSync(path.join(WEB, "app/demos"))) {
  console.error("atualizar-referencias: só roda no repositório do Atlas (não achei web/app/demos/).");
  process.exit(2);
}

const COPIAS = [
  { destino: "sites-de-exemplo", nome: "os três sites de exemplo", pastas: ["app/demos", "components/demos", "components/ilhas/demos", "conteudo/demos"] },
  { destino: "atlas", nome: "o site do próprio Atlas", pastas: ["app/(atlas)", "components/secoes", "components/paginas", "components/marca"] },
];
const COMUNS = ["app/layout.tsx", "app/globals.css"]; // o CSS das técnicas (vidro.css, movimento.css) entra pelos @import
const FORA = (f) => f.endsWith(".woff2") || f.endsWith(".DS_Store") || f.endsWith(".png") || f.endsWith(".webp");
const EXTENSOES = ["", ".tsx", ".ts", ".css", "/index.tsx", "/index.ts"];

/** Todos os arquivos de uma pasta, relativos ao web/. */
const listar = (rel) =>
  readdirSync(path.join(WEB, rel), { recursive: true })
    .map((f) => path.join(rel, String(f)))
    .filter((f) => statSync(path.join(WEB, f)).isFile() && !FORA(f));

/** O arquivo do web/ que uma importação "@/x" ou relativa aponta, ou null. */
function resolver(origem, especificador) {
  const base = especificador.startsWith("@/") ? especificador.slice(2) : path.join(path.dirname(origem), especificador);
  for (const ext of EXTENSOES) {
    const candidato = path.normalize(base + ext);
    if (existsSync(path.join(WEB, candidato)) && statSync(path.join(WEB, candidato)).isFile()) return candidato;
  }
  return null;
}

for (const { destino, nome, pastas } of COPIAS) {
  const DESTINO = path.join(REFERENCIAS, destino);
  const arquivos = new Set([...pastas.flatMap(listar), ...COMUNS]);
  const fila = [...arquivos];
  while (fila.length) {
    const atual = fila.pop();
    if (!/\.(tsx?|css)$/.test(atual)) continue;
    const texto = readFileSync(path.join(WEB, atual), "utf8");
    for (const [, esp, css] of texto.matchAll(/(?:from|import)\s+["']((?:@\/|\.\.?\/)[^"']+)["']|@import\s+["'](\.\.?\/[^"']+)["']/g)) {
      const alvo = resolver(atual, esp ?? css);
      if (alvo && !arquivos.has(alvo) && !FORA(alvo)) {
        arquivos.add(alvo);
        fila.push(alvo);
      }
    }
  }

  rmSync(DESTINO, { recursive: true, force: true });
  for (const rel of [...arquivos].sort()) {
    mkdirSync(path.dirname(path.join(DESTINO, rel)), { recursive: true });
    cpSync(path.join(WEB, rel), path.join(DESTINO, rel));
  }
  let commit = "(sem git)";
  try {
    commit = execFileSync("git", ["log", "-1", "--format=%h, %cs", "--", "web"], { cwd: ATLAS, encoding: "utf8" }).trim();
  } catch {}
  const hoje = new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }).replace(/\//g, ".");
  const listaDeFora = [...arquivos].filter((f) => !pastas.some((p) => f.startsWith(p + "/")));
  writeFileSync(
    path.join(DESTINO, "ORIGEM.md"),
    `# Origem desta cópia

Gerada em ${hoje} por \`producao/ferramentas/atualizar-referencias.mjs\`, a partir do \`web/\` do repositório do Atlas (último commit que tocou o \`web/\`: ${commit}; mudanças ainda sem commit entram também): ${nome}. **Não se edita à mão:** muda-se o \`web/\` e roda-se o script de novo.

- **${arquivos.size} arquivos**, com os caminhos do \`web/\`: as pastas ${pastas.map((p) => `\`${p}/\``).join(", ")}, o \`app/layout.tsx\` e o \`app/globals.css\` e, pelas importações, ${listaDeFora.length} arquivos de fora das pastas, de que eles dependem (o CSS das técnicas, \`app/vidro.css\` e \`app/movimento.css\`, entre eles).
- **Fora:** as fontes binárias (\`.woff2\`) e as imagens. A referência é para estudo, nunca para cópia; o projeto baixa a fonte da marca dele (\`producao/base/ferramentas/baixar-fonte.mjs\`).

Os arquivos de fora das pastas:
${listaDeFora.map((f) => `- \`${f}\``).join("\n")}
`,
  );
  console.log(`referências atualizadas: ${arquivos.size} arquivos em ${path.relative(ATLAS, DESTINO)} (${listaDeFora.length} de fora das pastas)`);
}

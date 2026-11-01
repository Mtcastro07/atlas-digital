// ferramentas/unicidade.mjs — a impressão digital do código de identidade: quanto do CSS e dos componentes deste site é
// igual ao de outro site do Atlas, depois de tirar o que é de fábrica (a base do kit) e de normalizar o prefixo das
// classes ("od-capa" e "rs-capa" contam como iguais). Nasceu em 09.10.2026: o restaurante de exemplo saiu com 31% do
// CSS igual ao da odontologia, com os mesmos componentes renomeados (producao/qualidade/11-design-e-anti-ia.md, seção 9).
//
// Uso (na raiz do site, depois de montado; só o Node, sem dependência):
//   node ferramentas/unicidade.mjs                                  este site contra producao/referencias/
//   node ferramentas/unicidade.mjs --contra=../outro-cliente        e contra outros projetos (repetível)
//   node ferramentas/unicidade.mjs --vitrine=<pasta com app/demos>  cada site de app/demos/ contra os outros
// Sai com código 1 se algum par passa do limite de falha.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

// Calibração de 09.10.2026, por tipo (CSS ou componentes): entre os três exemplos sem parentesco (barbearia, depósito,
// nutrição) e deles contra os dois novos, no máximo 11%; o restaurante contra a odontologia, de que foi clonado, 31% do
// CSS e 19% dos componentes.
const AVISO = 0.15;
const FALHA = 0.3;
const args = process.argv.slice(2);
const opcao = (nome) => args.filter((a) => a.startsWith(`--${nome}=`)).map((a) => a.slice(nome.length + 3));

const PULAR = new Set(["node_modules", ".next", "out", "producao", ".git", "registros", "material", "public", "testes", ".regua"]);
function listar(dir) {
  if (!existsSync(dir)) return [];
  if (statSync(dir).isFile()) return /\.(css|tsx?)$/.test(dir) ? [dir] : [];
  return readdirSync(dir).flatMap((n) => (PULAR.has(n) ? [] : listar(path.join(dir, n))));
}

// O prefixo mais comum das classes do site ("od", "rs", "bb"), trocado por "X" para comparar sites diferentes.
function prefixo(textos) {
  const conta = new Map();
  for (const t of textos) for (const [, p] of t.matchAll(/[.\s"'`]([a-z]{2,3})-[a-z]/g)) conta.set(p, (conta.get(p) ?? 0) + 1);
  return [...conta].sort((a, b) => b[1] - a[1])[0]?.[0];
}

// As linhas que contam, separadas em CSS e componentes: sem comentário, com corpo (25 caracteres ou mais), sem
// importação nem moldura. Cada linha leva o tipo na frente ("css " ou "tsx "), para a conta sair por tipo.
function linhas(arquivos) {
  const lidos = arquivos.map((f) => [f.endsWith(".css") ? "css" : "tsx", readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "")]);
  const p = prefixo(lidos.map(([, t]) => t));
  const troca = p ? new RegExp(`(^|[^a-z0-9])${p}-`, "g") : null;
  const conjunto = new Set();
  for (const [tipo, t] of lidos)
    for (let l of t.split("\n")) {
      l = l.trim().replace(/\s+/g, " ");
      if (troca) l = l.replace(troca, "$1X-");
      if (l.length < 25 || /^(import|export \{|"use client"|\}|<\/)/.test(l)) continue;
      conjunto.add(`${tipo} ${l}`);
    }
  return conjunto;
}

// Um site é um conjunto de pastas. Numa pasta com app/demos/, cada exemplo é um site; noutra, a pasta inteira.
function sitesDe(raiz) {
  if (!existsSync(path.join(raiz, "app/demos"))) return [{ nome: path.basename(path.resolve(raiz)), arquivos: listar(raiz) }];
  return readdirSync(path.join(raiz, "app/demos"))
    .filter((n) => statSync(path.join(raiz, "app/demos", n)).isDirectory())
    .map((n) => ({
      nome: n,
      arquivos: ["app/demos", "components/demos", "components/ilhas/demos", "lib/demos"]
        .flatMap((d) => listar(path.join(raiz, d, n)))
        .concat(listar(path.join(raiz, "conteudo/demos", `${n}.ts`))),
    }));
}

const fabrica = linhas(listar("producao/base").length ? listar("producao/base") : listar(path.join(import.meta.dirname, "..")));
const identidade = (site) => {
  const l = linhas(site.arquivos);
  for (const f of fabrica) l.delete(f);
  return l;
};

let sites;
let contra;
const vitrine = opcao("vitrine")[0];
if (vitrine) {
  sites = sitesDe(vitrine);
  contra = sites;
} else {
  sites = [{ nome: "este site", arquivos: ["app", "components", "lib", "conteudo"].flatMap((d) => listar(d)) }];
  const refs = path.join("producao", "referencias");
  contra = [
    ...(existsSync(refs) ? readdirSync(refs).filter((n) => statSync(path.join(refs, n)).isDirectory()).flatMap((n) => sitesDe(path.join(refs, n))) : []),
    ...opcao("contra").flatMap(sitesDe),
  ];
}

let falhas = 0;
const marcas = contra.map((s) => ({ ...s, linhas: identidade(s) }));
for (const site of sites) {
  const minhas = identidade(site);
  if (!minhas.size) continue;
  console.log(`\n${site.nome}: ${minhas.size} linhas de identidade`);
  for (const outro of marcas) {
    if (outro.nome === site.nome || !outro.linhas.size) continue;
    const parte = (tipo) => {
      const delas = [...minhas].filter((l) => l.startsWith(tipo));
      const iguais = delas.filter((l) => outro.linhas.has(l));
      return { fracao: delas.length >= 20 ? iguais.length / delas.length : 0, iguais };
    };
    const css = parte("css ");
    const tsx = parte("tsx ");
    const fracao = Math.max(css.fracao, tsx.fracao);
    if (fracao < 0.02) continue;
    const classe = fracao >= FALHA ? "FALHA" : fracao >= AVISO ? "aviso" : "     ";
    if (fracao >= FALHA) falhas++;
    const exemplos = (css.fracao >= tsx.fracao ? css : tsx).iguais.slice(0, 2).map((l) => `"${l.slice(4, 74)}"`).join("; ");
    console.log(`  ${classe} igual a ${outro.nome}: CSS ${(css.fracao * 100).toFixed(0)}% · componentes ${(tsx.fracao * 100).toFixed(0)}%${fracao >= AVISO ? ` — por exemplo: ${exemplos}` : ""}`);
  }
}
console.log(`\nLimites: aviso a partir de ${AVISO * 100}%, falha a partir de ${FALHA * 100}% das linhas de identidade iguais às de outro site.`);
process.exitCode = falhas ? 1 : 0;

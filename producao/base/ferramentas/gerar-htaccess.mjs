// ferramentas/gerar-htaccess.mjs — no site estático, grava out/.htaccess a partir do modelo
// (ferramentas/htaccess.modelo), com o domínio de conteudo/contato.ts. Sem out/ (modo servidor),
// não faz nada (producao/esteira/18-publicacao-e-manutencao.md, seção 3.2).
//
// RASCUNHO=1 (o site no endereço temporário, para o cliente aprovar) e o site de exemplo (`exemplo: true` em
// conteudo/negocio.ts): acrescentam o X-Robots-Tag "noindex, nofollow" a toda resposta, imagens inclusive, e o
// site fica fora da busca (producao/esteira/21-busca-e-ias.md, seção 2).
import { existsSync, readFileSync, writeFileSync } from "node:fs";

if (existsSync("out")) {
  const contato = readFileSync("conteudo/contato.ts", "utf8");
  const DOMINIO = contato.match(/^\s*dominio:\s*"([^"]+)"/m)?.[1];
  if (!DOMINIO || !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(DOMINIO)) {
    throw new Error(`gerar-htaccess: domínio ausente ou inválido em conteudo/contato.ts ("${DOMINIO ?? ""}"); sem "www" nem "https://".`);
  }
  const rascunho = process.env.RASCUNHO === "1";
  const exemplo = /^\s*exemplo:\s*true\b/m.test(readFileSync("conteudo/negocio.ts", "utf8"));
  const motivo = exemplo ? "Site de exemplo: fora da busca, sempre." : "Rascunho: fora da busca até a aprovação.";
  const htaccess = readFileSync("ferramentas/htaccess.modelo", "utf8")
    .replace("__FORA_DA_BUSCA__\n", rascunho || exemplo ? `  # ${motivo}\n  Header always set X-Robots-Tag "noindex, nofollow"\n` : "")
    .replaceAll("__DOMINIO_RE__", DOMINIO.replaceAll(".", "\\.")) // nas expressões regulares, o ponto escapado
    .replaceAll("__DOMINIO__", DOMINIO);
  writeFileSync("out/.htaccess", htaccess);
  console.log(`export: out/.htaccess gravado para ${DOMINIO}${rascunho || exemplo ? ` (${exemplo ? "exemplo" : "rascunho"}: noindex)` : ""}`);
}

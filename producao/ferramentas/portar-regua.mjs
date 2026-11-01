#!/usr/bin/env node
// producao/ferramentas/portar-regua.mjs — copia a régua de producao/qualidade/regua/ para ferramentas/regua/ de um
// site e aplica os ajustes de porte de producao/qualidade/02-regua.md, seção 9, passo 4. O novo-site a chama; rode
// de novo quando a régua do Atlas mudar (a cópia de producao/qualidade/regua/ é atualizada primeiro).
//
// Uso: node producao/ferramentas/portar-regua.mjs <pasta do site>
//
// Cada ajuste troca um trecho exato da régua. Se a régua mudou e um trecho não existe mais, a ferramenta
// para e diz qual: aplique o ajuste à mão, pela seção 9, e atualize o trecho aqui. Nunca porta pela metade.
//
// Os ajustes:
// 1. O tipo de site: tudo é "marca" (no Atlas, só /demos/).
// 2. A conformidade: o selo de ficção e o noindex só no site de exemplo; no de cliente, o contrário — o
//    noindex é falha, e o rodapé de toda página precisa da razão social e do CNPJ (ou, no profissional
//    pessoa física, do nome e do registro do conselho), lidos de conteudo/negocio.ts.
// 3. O aviso de menção a CNPJ e nota fiscal (ata do Atlas, III.2) só vale no site de exemplo.
// 4. Os rótulos dos controles do site, em sondas.mjs: os da base (menu, fechar o menu) já são os do Atlas;
//    nada a trocar enquanto o site usar os componentes da base.
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const destino = process.argv[2];
if (!destino || !existsSync(path.join(destino, "package.json"))) {
  console.error("Uso: node producao/ferramentas/portar-regua.mjs <pasta do site> (a pasta com o package.json)");
  process.exit(2);
}
const ORIGEM = path.resolve(import.meta.dirname, "../qualidade/regua");
const PASTA = path.join(destino, "ferramentas", "regua");
mkdirSync(PASTA, { recursive: true });
for (const arquivo of ["regua.mjs", "sondas.mjs", "contraste.mjs", "teclado.mjs", "png.mjs", "quadros.mjs", "README.md"]) {
  copyFileSync(path.join(ORIGEM, arquivo), path.join(PASTA, arquivo));
}

function trocar(arquivo, trocas) {
  const caminho = path.join(PASTA, arquivo);
  let texto = readFileSync(caminho, "utf8");
  for (const [nome, de, para] of trocas) {
    if (!texto.includes(de)) {
      throw new Error(`portar-regua: o trecho "${nome}" não existe mais em ${arquivo}. A régua mudou: aplique o ajuste à mão (producao/qualidade/02-regua.md, seção 9, passo 4) e atualize este script.`);
    }
    texto = texto.replace(de, () => para); // a função: nenhum $ do trecho novo vira padrão de troca
  }
  writeFileSync(caminho, texto);
}

trocar("regua.mjs", [
  [
    "leitura do site",
    `import { percorrerTeclado } from "./teclado.mjs";\n`,
    `import { percorrerTeclado } from "./teclado.mjs";

// PORTE PARA O SITE DE CLIENTE (producao/qualidade/02-regua.md, seção 9, passo 4; aplicado por
// producao/ferramentas/portar-regua.mjs). Os dados vêm de conteudo/negocio.ts, a fonte única do rodapé.
import { readFileSync } from "node:fs";
const NEGOCIO = readFileSync(new URL("../../conteudo/negocio.ts", import.meta.url), "utf8");
// Só a linha que começa pelo campo: um comentário que cita "exemplo: true" não conta.
const campoDoNegocio = (nome) => NEGOCIO.match(new RegExp(\`^\\\\s*\${nome}:\\\\s*"([^"]*)"\`, "m"))?.[1] ?? "";
const SITE_DE_EXEMPLO = /^\\s*exemplo:\\s*true\\b/m.test(NEGOCIO);
// O rodapé obrigatório (Decreto 7.962/2013, art. 2º): a razão social e o CNPJ; no profissional pessoa
// física, o nome e o registro do conselho.
const RODAPE_OBRIGATORIO = SITE_DE_EXEMPLO
  ? []
  : campoDoNegocio("cnpj")
    ? [campoDoNegocio("razaoSocial"), campoDoNegocio("cnpj")]
    : [campoDoNegocio("nomeCompleto"), campoDoNegocio("registro")];
`,
  ],
  ["tipo de site", `const site = caminho.startsWith("/demos/") ? "marca" : "atlas";`, `const site = "marca"; // porte: o site do cliente é todo de marca`],
  [
    "conformidade",
    `    if (site === "marca") {
      if (!/noindex/.test(s.robots)) falha("conformidade", "site de exemplo sem noindex");
      if (!c.ficcao) falha("conformidade", "site de exemplo sem o selo de ficção");
    }
    for (const t of c.mencoes) aviso("conformidade", \`confira (ata, III.2): "\${t}"\`);`,
    `    if (SITE_DE_EXEMPLO) {
      if (!/noindex/.test(s.robots)) falha("conformidade", "site de exemplo sem noindex");
      if (!c.ficcao) falha("conformidade", "site de exemplo sem o selo de ficção");
      for (const t of c.mencoes) aviso("conformidade", \`confira (ata, III.2): "\${t}"\`);
    } else {
      // Porte: no site de cliente, o noindex tiraria o site da busca, e o rodapé identifica o fornecedor.
      if (/noindex/.test(s.robots)) falha("conformidade", "site de cliente com noindex: fica fora da busca");
      const rodape = await pagina.evaluate(() => document.querySelector("footer")?.innerText ?? "");
      for (const texto of RODAPE_OBRIGATORIO) {
        if (!texto) falha("conformidade", "conteudo/negocio.ts sem a razão social e o CNPJ (ou o nome e o registro do conselho)");
        else if (!rodape.includes(texto)) falha("conformidade", \`rodapé sem "\${texto}" (Decreto 7.962/2013, art. 2º)\`);
      }
    }`,
  ],
]);

// O README da cópia diz que ela já está portada.
const readme = path.join(PASTA, "README.md");
writeFileSync(
  readme,
  readFileSync(readme, "utf8").replace(
    "# A régua (cópia de referência)",
    "# A régua (cópia de referência, já portada)\n\n> Portada para site de cliente ou de exemplo por `producao/ferramentas/portar-regua.mjs` (o tipo de site, a conformidade lida de `conteudo/negocio.ts` e o aviso de CNPJ). Não edite estes arquivos à mão: atualize `producao/qualidade/regua/` no repositório do Atlas e porte de novo.",
  ),
);
console.log(`régua portada em ${PASTA}`);

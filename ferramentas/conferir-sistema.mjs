// A autoconferência das peças do sistema do R10 (fase 0): o número por extenso, o trecho de código lido do arquivo, a
// fonte por extenso, o colofão e a data de cada página. Só assert, sem navegador.
// Uso, da raiz: node --experimental-strip-types ferramentas/conferir-sistema.mjs (o Node 22.18 em diante dispensa a opção)
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { colofaoDe, LETRAS } from "../lib/colofao.ts";
import { dataGravada, paginasComData, ultimaAlteracao } from "../lib/datas-das-paginas.ts";
import { porExtenso } from "../lib/por-extenso.ts";
import { linhasDo, trechoDe } from "../lib/trecho.ts";

// porExtenso: a tabela dos doze, nos dois gêneros.
const M = ["um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze"];
const F = ["uma", "duas", ...M.slice(2)];
M.forEach((nome, i) => assert.equal(porExtenso(i + 1), nome));
F.forEach((nome, i) => assert.equal(porExtenso(i + 1, "f"), nome));
assert.equal(porExtenso(12, "f", true), "Doze");
assert.equal(porExtenso(2, "m", true), "Dois");
assert.equal(porExtenso(1, "f", true), "Uma");
for (const ruim of [0, 13, 1.5, NaN]) assert.throws(() => porExtenso(ruim));

// trechoDe: os cinco trechos do contrato, com o número da linha que o arquivo tem hoje.
const t = (arquivo, ancora, n) => trechoDe(arquivo, ancora, n);
assert.deepEqual(t("next.config.ts", `"default-src 'self'",`), { arquivo: "next.config.ts", inicio: 28, fim: 28, linhas: [`"default-src 'self'",`] });
assert.deepEqual(t("next.config.ts", `{ key: "X-Robots-Tag", value: "noindex, nofollow" }`).inicio, 67);
const zap = t("lib/whatsapp.ts", "/** Endereço wa.me com a mensagem já escrita. Nada passa por servidor. */", 2);
assert.deepEqual([zap.inicio, zap.fim, zap.linhas[1]], [4, 5, "export function linkWhatsApp(mensagem?: string) {"]);
const globo = t("components/marca/logotipo.tsx", `<circle cx="163" cy="24" r="21.75" />`, 4);
assert.deepEqual([globo.inicio, globo.fim, globo.linhas.at(-1)], [60, 63, `<line x1="142.58" y1="31.5" x2="183.42" y2="31.5" />`]);
assert.deepEqual(t("components/paginas/costa-de-niteroi.ts", `{"nome":"Icaraí","x":66.85,"y":73.86}`).linhas, [`{"nome":"Icaraí","x":66.85,"y":73.86}`]);
assert.throws(() => t("lib/whatsapp.ts", "nada disto existe no arquivo"));
assert.throws(() => t("lib/whatsapp.ts", "reais")); // repetida: em mais de uma linha
// O invólucro da Hostinger: next.config.ts sem a âncora, e o original em <hash>.next.config.ts.
const raiz = process.cwd();
process.chdir(mkdtempSync(path.join(tmpdir(), "involucro-")));
writeFileSync("next.config.ts", "export default {};\n");
writeFileSync("6ae8.next.config.ts", "// topo\nconst a = 1;\n");
assert.equal(t("next.config.ts", "const a = 1;").inicio, 2);
assert.throws(() => t("next.config.ts", "nada disto"));
process.chdir(raiz);
assert.equal(linhasDo({ inicio: 67, fim: 67 }), "linha 67");
assert.equal(linhasDo({ inicio: 4, fim: 5 }), "linhas 4 e 5");
assert.equal(linhasDo({ inicio: 60, fim: 63 }), "linhas 60 a 63");

// colofaoDe: com o relatório, sem a página e sem o arquivo; o dia no fuso de Brasília.
const pasta = mkdtempSync(path.join(tmpdir(), "colofao-"));
const relatorio = path.join(pasta, "quadros.json");
writeFileSync(relatorio, JSON.stringify({ quando: "2026-10-30T02:30:00.000Z", medidas: [
  { pagina: "/planos", perfil: "celular4", gesto: "rolagem", mediana: { emDia: 0.99374 } },
  { pagina: "/planos", perfil: "mesa", gesto: "rolagem", mediana: { emDia: 0.5 } },
] }));
assert.equal(
  colofaoDe("/planos", relatorio),
  `${LETRAS} Esta página foi medida em 29.10.2026, num celular simulado com o processador quatro vezes mais lento. Ao rolar, 99,4 de cada 100 quadros chegaram a tempo à tela.`,
);
assert.equal(colofaoDe("/duvidas", relatorio), LETRAS);
assert.equal(colofaoDe("/planos", path.join(pasta, "nao-existe.json")), LETRAS);
rmSync(pasta, { recursive: true });

// ultimaAlteracao: uma data AAAA-MM-DD, a mesma a cada chamada; a página fora da tabela para o build.
const data = ultimaAlteracao("/o-trabalho");
assert.match(data ?? "", /^\d{4}-\d{2}-\d{2}$/);
assert.equal(ultimaAlteracao("/o-trabalho"), data);
assert.throws(() => ultimaAlteracao("/nao-existe"));
// O arquivo que a Hostinger usa acompanha o git: atrasado, rode ferramentas/gravar-datas.mjs.
for (const p of paginasComData) assert.equal(dataGravada(p), ultimaAlteracao(p), `conteudo/medidas/datas.json atrasado em ${p}`);

console.log(`conferir-sistema: tudo confere (a data de /o-trabalho no git: ${data})`);

// A autoconferência das peças do sistema do R10 (fase 0): o número por extenso e a data de cada página. Só assert, sem navegador.
// Uso, da raiz: node --experimental-strip-types ferramentas/conferir-sistema.mjs (o Node 22.18 em diante dispensa a opção)
import assert from "node:assert/strict";

import { dataGravada, paginasComData, ultimaAlteracao } from "../lib/datas-das-paginas.ts";
import { porExtenso } from "../lib/por-extenso.ts";

// porExtenso: a tabela dos doze, nos dois gêneros.
const M = ["um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze"];
const F = ["uma", "duas", ...M.slice(2)];
M.forEach((nome, i) => assert.equal(porExtenso(i + 1), nome));
F.forEach((nome, i) => assert.equal(porExtenso(i + 1, "f"), nome));
assert.equal(porExtenso(12, "f", true), "Doze");
assert.equal(porExtenso(2, "m", true), "Dois");
assert.equal(porExtenso(1, "f", true), "Uma");
for (const ruim of [0, 13, 1.5, NaN]) assert.throws(() => porExtenso(ruim));

// ultimaAlteracao: uma data AAAA-MM-DD, a mesma a cada chamada; a página fora da tabela para o build.
const data = ultimaAlteracao("/o-trabalho");
assert.match(data ?? "", /^\d{4}-\d{2}-\d{2}$/);
assert.equal(ultimaAlteracao("/o-trabalho"), data);
assert.throws(() => ultimaAlteracao("/nao-existe"));
// O arquivo que a Hostinger usa acompanha o git: atrasado, rode ferramentas/gravar-datas.mjs.
for (const p of paginasComData) assert.equal(dataGravada(p), ultimaAlteracao(p), `conteudo/medidas/datas.json atrasado em ${p}`);

console.log(`conferir-sistema: tudo confere (a data de /o-trabalho no git: ${data})`);

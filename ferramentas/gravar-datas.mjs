// Grava em conteudo/medidas/datas.json a data de cada página, tirada do git: a Hostinger compila sem o histórico.
// Rodar depois de commitar mudança de página, e commitar o arquivo antes de publicar; conferir-sistema acusa o atraso.
// Uso, da raiz: node --experimental-strip-types ferramentas/gravar-datas.mjs
import { writeFileSync } from "node:fs";
import { paginasComData, ultimaAlteracao } from "../lib/datas-das-paginas.ts";

const datas = Object.fromEntries(paginasComData.map((p) => [p, ultimaAlteracao(p)]));
writeFileSync("conteudo/medidas/datas.json", JSON.stringify(datas, null, 2) + "\n");
console.log(datas);

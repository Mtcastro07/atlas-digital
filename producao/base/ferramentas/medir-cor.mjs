// ferramentas/medir-cor.mjs — a cor e o valor de uma página inteira, linha a linha, em OKLab: quanto dela é escuro e
// quanto é claro, quantas viradas de valor há entre as cenas e quanto da área tem cor. Confere a estratégia de cor
// declarada no identidade.md (producao/esteira/19-o-padrao-atlas.md, seção 5).
//
// Uso (na raiz do site, sobre as capturas de ferramentas/fotografar.mjs):
//   node ferramentas/medir-cor.mjs material/capturas/inicio-movimento-1440.png [outra.png ...]
//
// A medição de 09.10.2026, nas páginas iniciais a 1440 px:
// - o Atlas: 54% escuro, 42% claro, 7 viradas, 55% com cor (o campo de cor);
// - a barbearia: 100% escuro, 3% com cor (a cena imersiva);
// - o depósito: 47% escuro, 20% claro, 2 viradas, 7,4% com cor;
// - a nutrição: 93% claro, nenhuma virada, 0,5% com cor (a folha clara extrema, com a tipografia de cartaz);
// - a odontologia e o restaurante de 09.10.2026: 97% e 89% claros, nenhuma virada, 0,1% e 0,5% com cor (a página sem cor).
import { readFileSync } from "node:fs";
import path from "node:path";
import { lerPng } from "./regua/png.mjs";

const ESCURO = 0.4; // L do OKLab
const CLARO = 0.85;
const COR = 0.04; // croma do OKLab a partir do qual o pixel conta como cor
const VIRADA = 120; // px: a faixa de valor precisa durar isso para contar como cena

const linear = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
function oklab(r, g, b) {
  const [R, G, B] = [linear(r), linear(g), linear(b)];
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(a, bb)];
}

const arquivos = process.argv.slice(2);
if (!arquivos.length) {
  console.error("Uso: node ferramentas/medir-cor.mjs <captura.png> [...] (as capturas de ferramentas/fotografar.mjs)");
  process.exit(2);
}
for (const arquivo of arquivos) {
  const { largura, altura, canais, px } = lerPng(readFileSync(arquivo));
  let escuras = 0;
  let claras = 0;
  let comCor = 0;
  let amostras = 0;
  const faixas = [];
  for (let y = 0; y < altura; y += 4) {
    let soma = 0;
    let n = 0;
    for (let x = 0; x < largura; x += 8) {
      const i = (y * largura + x) * canais;
      const [L, croma] = oklab(px[i], px[i + 1], px[i + 2]);
      soma += L;
      n++;
      amostras++;
      if (croma > COR) comCor++;
    }
    const L = soma / n;
    faixas.push(L < ESCURO ? "escuro" : L > CLARO ? "claro" : "médio");
    if (L < ESCURO) escuras++;
    else if (L > CLARO) claras++;
  }
  // As viradas: trocas entre o escuro e o claro (o médio não conta), cada faixa com pelo menos VIRADA px.
  let viradas = 0;
  let anterior = null;
  for (let i = 0; i < faixas.length; ) {
    let j = i;
    while (j < faixas.length && faixas[j] === faixas[i]) j++;
    if (faixas[i] !== "médio" && (j - i) * 4 >= VIRADA) {
      if (anterior && anterior !== faixas[i]) viradas++;
      anterior = faixas[i];
    }
    i = j;
  }
  const pct = (x, total) => `${Math.round((100 * x) / total)}%`;
  console.log(
    `${path.basename(arquivo)} (${altura} px de altura): escuro ${pct(escuras, faixas.length)} · claro ${pct(claras, faixas.length)} · ` +
      `${viradas} virada(s) de valor · área com cor ${((100 * comCor) / amostras).toFixed(1).replace(".", ",")}%`,
  );
}
console.log("\nA estratégia (producao/esteira/19-o-padrao-atlas.md, seção 5): campo de cor (muita área com cor e viradas), cena imersiva (80% ou mais de um valor, com a luz da matéria) ou folha clara extrema (claro, com a tipografia de cartaz e a textura). Claro, sem cor e sem viradas, e sem a escala e a textura da folha: a página sem cor (P2).");

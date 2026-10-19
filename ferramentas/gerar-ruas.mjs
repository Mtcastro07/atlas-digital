// ferramentas/gerar-ruas.mjs — as ruas de Niterói da carta de /para-quem, em vetor, a partir do OpenStreetMap (17.10.2026,
// "o Atlas Digital": a terra hachurada pelas ruas em bronze, a gravura; sob a lente, as mesmas ruas em ponto de tela).
// O modelo é ferramentas/gerar-costa.mjs: a Overpass uma vez, aqui, na produção, e o resultado gravado; o site publicado
// não faz pedido externo. Nenhuma dependência: o fetch do Node.
// Os dados são ODbL: o crédito "© colaboradores do OpenStreetMap (ODbL)", com o vínculo para
// https://www.openstreetmap.org/copyright, vai junto da carta (components/paginas/carta-de-niteroi.tsx).
//
// Uso (na raiz do site; a rede precisa estar liberada):
//   node ferramentas/gerar-ruas.mjs [--saida=public/dados/ruas-niteroi.svg]
// A caixa é a da costa (CARTA, components/paginas/costa-de-niteroi.ts), com os 700 m de margem do polígono da terra, e
// a projeção é a mesma, linear na caixa (o minuto de longitude já vem com o cosseno da latitude, como na costa). Só as
// ruas do município de Niterói (a área administrativa do OpenStreetMap; nada do Rio nem de São Gonçalo, nem a Urca) e
// só as classes que se veem com a carta a 480 px (~14 m por px): da via expressa à rua residencial; sem serviço,
// calçada, trilha nem escada. Douglas–Peucker a 8 m; coordenadas em metros, inteiras, com o y para baixo, como no SVG.
// Dois caminhos, sem cor (a cor e a espessura vêm do <use> da página, que herda stroke e stroke-dasharray): as maiores
// (#ruas-maiores) e as menores (#ruas-menores). O <g> de fora só serve a quem abre o arquivo sozinho.
import { readFileSync, writeFileSync } from "node:fs";

const argumentos = process.argv.slice(2);
const opcao = (nome) => argumentos.find((a) => a.startsWith(`--${nome}=`))?.slice(nome.length + 3);
const SAIDA = opcao("saida") ?? "public/dados/ruas-niteroi.svg";
const MARGEM = 700;
const TOLERANCIA = 8;
const TETO = 45 * 1024;
const MAIORES = /^(motorway|trunk|primary|secondary|tertiary)(_link)?$/;
const AGENTE = "atlas-digital-producao/1.0 (gerar-ruas; uso unico na producao de um site)";
const INSTANCIAS = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter", "https://overpass.private.coffee/api/interpreter"];

// A caixa, lida do módulo da costa (gerado): a mesma carta, a mesma projeção.
const costa = readFileSync("components/paginas/costa-de-niteroi.ts", "utf8");
const CARTA = JSON.parse(
  costa
    .match(/export const CARTA = (\{[^}]+\})/)[1]
    .replace(/(\w+):/g, '"$1":'),
);
const kx = CARTA.largura / (CARTA.leste - CARTA.oeste);
const ky = CARTA.altura / (CARTA.norte - CARTA.sul);
const projetar = (lat, lon) => [(lon - CARTA.oeste) * kx, (CARTA.norte - lat) * ky];
const [S, N] = [CARTA.sul - MARGEM / ky, CARTA.norte + MARGEM / ky];
const [W, E] = [CARTA.oeste - MARGEM / kx, CARTA.leste + MARGEM / kx];

async function overpass(consulta) {
  for (const instancia of INSTANCIAS) {
    try {
      const r = await fetch(instancia, {
        method: "POST",
        headers: { "User-Agent": AGENTE, "Content-Type": "application/x-www-form-urlencoded" },
        body: `data=${encodeURIComponent(consulta)}`,
      });
      if (r.ok) return await r.json();
      console.warn(`${instancia} respondeu ${r.status}; tentando a próxima.`);
    } catch (erro) {
      console.warn(`${instancia} falhou (${erro.message}); tentando a próxima.`);
    }
  }
  throw new Error("Nenhuma instância da Overpass respondeu: tente de novo em alguns minutos.");
}

const vias = "motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street|pedestrian";
const resposta = await overpass(
  `[out:json][timeout:90];area["boundary"="administrative"]["admin_level"="8"]["name"="Niterói"]->.niteroi;` +
    `way["highway"~"^(${vias})(_link)?$"](area.niteroi)(${S},${W},${N},${E});out tags geom;`,
);

// Douglas–Peucker (aberto: as ruas são linhas).
function simplificar(p, tol) {
  if (p.length < 3) return p;
  const [a, b] = [p[0], p.at(-1)];
  let [maior, indice] = [0, 0];
  for (let i = 1; i < p.length - 1; i++) {
    const d = Math.abs((b[1] - a[1]) * p[i][0] - (b[0] - a[0]) * p[i][1] + b[0] * a[1] - b[1] * a[0]) / (Math.hypot(b[1] - a[1], b[0] - a[0]) || 1e-9);
    if (d > maior) [maior, indice] = [d, i];
  }
  if (maior <= tol) return [a, b];
  return [...simplificar(p.slice(0, indice + 1), tol).slice(0, -1), ...simplificar(p.slice(indice), tol)];
}

// O caminho compacto: o primeiro ponto absoluto, os outros relativos ("M12 34l5-6 7 8"); o sinal de menos já separa.
const numeros = (ns) => ns.map((n, i) => (i && n >= 0 ? ` ${n}` : `${n}`)).join("");
const caminho = (linhas) =>
  linhas.map((l) => `M${numeros(l[0])}l${numeros(l.slice(1).flatMap((p, i) => [p[0] - l[i][0], p[1] - l[i][1]]))}`).join("");

const grupos = { maiores: [], menores: [] };
let contadas = 0;
for (const via of resposta.elements) {
  if (via.type !== "way" || !via.geometry?.length) continue;
  const pontos = simplificar(
    via.geometry.map((g) => projetar(g.lat, g.lon)),
    TOLERANCIA,
  ).map(([x, y]) => [Math.round(x), Math.round(y)]);
  // Os pontos repetidos depois do arredondamento saem; a rua que vira um ponto só, também.
  const limpos = pontos.filter((p, i) => i === 0 || p[0] !== pontos[i - 1][0] || p[1] !== pontos[i - 1][1]);
  if (limpos.length < 2) continue;
  grupos[MAIORES.test(via.tags.highway) ? "maiores" : "menores"].push(limpos);
  contadas++;
}
if (!contadas) throw new Error("Nenhuma rua na caixa: confira a área de Niterói na Overpass.");

// As ruas que se continuam (o fim de uma é o começo ou o fim de outra) viram uma linha só: um "M" a menos por emenda.
function emendar(linhas) {
  const chave = (p) => `${p[0]},${p[1]}`;
  const pontas = new Map();
  const guardar = (l) => {
    for (const p of [l[0], l.at(-1)]) pontas.set(chave(p), [...(pontas.get(chave(p)) ?? []), l]);
  };
  const tirar = (l) => {
    for (const p of [l[0], l.at(-1)]) pontas.set(chave(p), (pontas.get(chave(p)) ?? []).filter((x) => x !== l));
  };
  linhas.forEach(guardar);
  const feitas = [];
  const restantes = new Set(linhas);
  for (const inicial of linhas) {
    if (!restantes.has(inicial)) continue;
    restantes.delete(inicial);
    tirar(inicial);
    let linha = inicial;
    for (let cresceu = true; cresceu; ) {
      cresceu = false;
      const outra = (pontas.get(chave(linha.at(-1))) ?? [])[0];
      if (outra) {
        restantes.delete(outra);
        tirar(outra);
        linha = [...linha, ...(chave(outra[0]) === chave(linha.at(-1)) ? outra : outra.toReversed()).slice(1)];
        cresceu = true;
      }
    }
    feitas.push(linha);
  }
  return feitas;
}
grupos.maiores = emendar(grupos.maiores);
grupos.menores = emendar(grupos.menores);

const caixa = `${-MARGEM} ${-MARGEM} ${CARTA.largura + 2 * MARGEM} ${CARTA.altura + 2 * MARGEM}`;
const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${caixa}">` +
  `<!-- Ruas de Niterói, © colaboradores do OpenStreetMap (ODbL), https://www.openstreetmap.org/copyright. Gerado por ferramentas/gerar-ruas.mjs em ${new Date().toISOString().slice(0, 10)}; metros, simplificado a ${TOLERANCIA} m. -->` +
  `<g fill="none" stroke="#c08a4a" stroke-linecap="round" stroke-linejoin="round">` +
  `<path id="ruas-maiores" vector-effect="non-scaling-stroke" d="${caminho(grupos.maiores)}"/>` +
  `<path id="ruas-menores" vector-effect="non-scaling-stroke" d="${caminho(grupos.menores)}"/>` +
  `</g></svg>\n`;
const tamanho = Buffer.byteLength(svg);
if (tamanho > TETO) throw new Error(`${SAIDA}: ${(tamanho / 1024).toFixed(1)} KB, acima do teto de 45 KB. Suba a tolerância ou tire uma classe.`);
writeFileSync(SAIDA, svg);
console.log(`${SAIDA}: ${contadas} ruas (${grupos.maiores.length} maiores, ${grupos.menores.length} menores), ${(tamanho / 1024).toFixed(1)} KB.`);

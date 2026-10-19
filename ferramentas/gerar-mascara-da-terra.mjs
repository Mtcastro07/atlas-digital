// ferramentas/gerar-mascara-da-terra.mjs — a máscara de terra da Terra em dois estados (17.10.2026, "o Atlas Digital":
// a capa, e a mesma máscara na projeção de /o-atlas). Desde 17/10, substitui gerar-pontos-da-terra.mjs: em vez de uma
// lista de pontos numa grade fixa, embutida no script, uma grade de 0,5° (720 × 360 casas) em bits, em
// public/dados/terra-05.bin (32.400 bytes; ~4,4 KB com gzip), que a figura baixa depois da carga e amostra no passo
// que quiser (lib/mascara-da-terra.ts). O centro de cada casa é testado contra os polígonos do Natural Earth 1:110m
// (ne_110m_land), de domínio público: nenhum crédito é exigido. Os bits: a casa k = linha × 720 + coluna, a linha 0 no
// norte (de 90° a 89,5° N), a coluna 0 em 180° O; o bit (k & 7) do byte (k >> 3), 1 = terra. O site não faz pedido
// externo: os dados vêm uma vez, aqui. Nenhuma dependência: o fetch do Node.
//
// Uso (na raiz do site; a rede precisa estar liberada, ou --geojson=<arquivo local>):
//   node ferramentas/gerar-mascara-da-terra.mjs [--saida=public/dados/terra-05.bin] [--geojson=ne_110m_land.geojson]
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const argumentos = process.argv.slice(2);
const opcao = (nome) => argumentos.find((a) => a.startsWith(`--${nome}=`))?.slice(nome.length + 3);
const SAIDA = opcao("saida") ?? "public/dados/terra-05.bin";
const FONTE = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson";
const LARGURA = 720;
const ALTURA = 360;
const PASSO = 0.5;

const geojson = opcao("geojson") ? JSON.parse(readFileSync(opcao("geojson"), "utf8")) : await (await fetch(FONTE)).json();

// Os anéis de cada polígono, com a caixa de cada um para descartar depressa (como em gerar-pontos-da-terra.mjs).
const poligonos = geojson.features.flatMap((f) => (f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates));
const aneis = poligonos.map((aneisDoPoligono) => {
  const xs = aneisDoPoligono[0].map((p) => p[0]);
  const ys = aneisDoPoligono[0].map((p) => p[1]);
  return { aneis: aneisDoPoligono, caixa: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)] };
});

/** Par ou ímpar de cruzamentos do raio para leste (o primeiro anel é a borda; os outros, buracos). */
function dentroDoAnel(anel, x, y) {
  let dentro = false;
  for (let i = 0, j = anel.length - 1; i < anel.length; j = i++) {
    const [xi, yi] = anel[i];
    const [xj, yj] = anel[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) dentro = !dentro;
  }
  return dentro;
}
const emTerra = (lon, lat) =>
  aneis.some(({ aneis: a, caixa: [x0, y0, x1, y1] }) => lon >= x0 && lon <= x1 && lat >= y0 && lat <= y1 && dentroDoAnel(a[0], lon, lat) && !a.slice(1).some((b) => dentroDoAnel(b, lon, lat)));

const bits = new Uint8Array((LARGURA * ALTURA) / 8);
let casasDeTerra = 0;
for (let linha = 0; linha < ALTURA; linha++) {
  for (let coluna = 0; coluna < LARGURA; coluna++) {
    if (!emTerra(-180 + (coluna + 0.5) * PASSO, 90 - (linha + 0.5) * PASSO)) continue;
    const k = linha * LARGURA + coluna;
    bits[k >> 3] |= 1 << (k & 7);
    casasDeTerra++;
  }
}

// Conferência, pela mesma leitura do site: Niterói (−22,8833; −43,1036) cai em terra, o meio do Atlântico Sul não.
const casa = (lat, lon) => {
  const k = Math.floor((90 - lat) / PASSO) * LARGURA + Math.floor((lon + 180) / PASSO);
  return (bits[k >> 3] >> (k & 7)) & 1;
};
if (casa(-22.8833, -43.1036) !== 1 || casa(-20, -30) !== 0) throw new Error("O teste de terra falhou: confira o arquivo do Natural Earth.");

mkdirSync(dirname(SAIDA), { recursive: true });
writeFileSync(SAIDA, bits);
console.log(`${casasDeTerra} casas de terra em ${LARGURA} × ${ALTURA}, ${bits.length} bytes em ${SAIDA}`);

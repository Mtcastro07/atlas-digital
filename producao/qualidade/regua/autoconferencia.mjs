// Autoconferência do contraste da régua no texto misturado (mix-blend-mode), contra autoconferencia.html (fundos
// conhecidos). Uso, da raiz do projeto: node ferramentas/regua/autoconferencia.mjs [pasta da régua] (padrão: esta).
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const pasta = path.resolve(process.argv[2] ?? import.meta.dirname);
const { medirContraste } = await import(pathToFileURL(path.join(pasta, "contraste.mjs")).href);

const navegador = await chromium.launch({ channel: "chrome" });
const pagina = await navegador.newPage({ viewport: { width: 800, height: 800 }, reducedMotion: "reduce" });
await pagina.goto(pathToFileURL(path.join(import.meta.dirname, "autoconferencia.html")).href);
const k = await medirContraste(pagina);
await navegador.close();
console.log(JSON.stringify(k, null, 2));

const achar = (lista, id) => lista.find((t) => t.includes(`#${id}`));
const desenhado = (id) => Number(achar(k.desenhados, id)?.match(/: ([\d.]+):1/)?.[1]);
const naoAprova = (id) => assert.ok(achar(k.falhas, id) || achar(k.aConferir, id), `${id} não pode aprovar`);

assert.ok(desenhado("claro") > 15, "claro: preto desenhado sobre branco, pela mistura no pai");
assert.ok(!achar(k.falhas, "claro"), "claro aprova");
naoAprova("cinza");
assert.ok(desenhado("medio") >= 2.95 && desenhado("medio") < 3.6, "medio: ≈3,2:1");
assert.ok(!achar(k.falhas, "medio"), "medio aprova (texto grande, mínimo 3)");
assert.ok(achar(k.falhas, "miudo"), "miudo reprova (mínimo 4,5)");
naoAprova("partido");
assert.ok(achar(k.falhas, "normal") && !achar(k.desenhados, "normal"), "sem mistura, o caminho da cor declarada");
assert.ok(achar(k.aConferir, "fora") && !achar(k.falhas, "fora"), "fora da tela vira aviso");
// O limite conhecido do 10º percentil (aguarda o aprovador): 10% da largura apagada aprova; 12% não.
assert.ok(desenhado("folga10") > 15 && !achar(k.falhas, "folga10"), "folga10: o limite conhecido do 10º percentil (com o 5º, reprova)");
naoAprova("folga12");
assert.ok(achar(k.aConferir, "minimo") && !achar(k.desenhados, "minimo"), "caixa de 1 px misturada, à vista: aviso");
assert.ok(!achar(k.aConferir, "leitor") && !achar(k.falhas, "leitor"), "só para leitor de tela, recortado: fora");
assert.ok(!achar(k.aConferir, "girado") && !achar(k.falhas, "girado"), "só para leitor de tela num ancestral girado e misturado: fora");
naoAprova("tarde");
// O texto das figuras (desde 17/10): volta em k.figuras, nunca em k.falhas (é aviso até a calibração).
const figura = (id) => Number(achar(k.figuras.medidas, id)?.match(/: ([\d.]+):1/)?.[1]);
const abaixo = (id) => !!achar(k.figuras.abaixo, id) && !achar(k.falhas, id);
assert.ok(figura("fig-preto") > 15 && !abaixo("fig-preto"), "fig-preto: preto em SVG sobre o branco aprova");
assert.ok(abaixo("fig-cinza"), "fig-cinza: ≈3:1 em SVG fica abaixo, e só em figuras");
assert.ok(figura("fig-halo") > 15 && !abaixo("fig-halo"), "fig-halo: o halo de carta é o fundo da letra");
assert.ok(abaixo("fig-html"), "fig-html: o bloco aria-hidden em HTML se mede");
assert.ok(figura("fig-escala") > 3.3 && figura("fig-escala") < 3.6 && !abaixo("fig-escala"), "fig-escala: 30 px pela viewBox, texto grande");
assert.ok(abaixo("fig-invisivel"), "fig-invisivel: a letra na cor do fundo não aprova");
assert.ok(figura("mt-tela") > 6 && figura("mt-tela") < 7.5 && !abaixo("mt-tela"), "mt-tela: o meio-tom na tela, pela média, ≈6,8:1");
assert.ok(figura("mt-papel") > 1.5 && figura("mt-papel") < 2.2 && abaixo("mt-papel"), "mt-papel: o meio-tom no papel, ≈1,8:1, fica abaixo");
console.log("\nautoconferência: 23 verificações passaram");

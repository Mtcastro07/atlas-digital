// A conferência das passivas (R10, fase 0, S2; registros/atlas/design-v2/R10/construcao/CONTRATO.md, 4.1): o
// movimento sem ação de quem visita, duas ou mais por página, só transform e opacity, parado na pausa, fora da tela e
// com o movimento reduzido, e visível. Não mede os quadros (isso é ferramentas/regua/quadros.mjs): mede o contrato.
//
// Uma passiva é o elemento com data-passiva, com as animações dele, dos filhos e dos pseudoelementos
// (getAnimations({ subtree: true })), fora as ligadas à rolagem (animation-timeline que não é a do documento). Para
// cada uma: o nome, o alvo, as propriedades das keyframes, a duração e a amplitude, medida com a animação parada em 24
// pontos do ciclo (currentTime): o maior deslocamento de um canto da caixa e a maior variação de opacidade.
//
// Sai com 1 em seis casos:
//   (a) uma keyframe toca outra propriedade que não transform, opacity, translate, rotate ou scale;
//   (b) uma passiva segue rodando com html.ambiente-pausado, com o [data-ambiente] fora da tela ou com
//       prefers-reduced-motion: reduce (ou está fora de todo [data-ambiente], e nada a para fora da tela);
//   (c) a página tem menos de duas passivas, ou duas com o mesmo data-passiva;
//   (d) uma passiva fica abaixo da amplitude mínima: menos de 6 px de deslocamento e menos de 0,3 de opacidade;
//   (e) o alvo de uma animação é um elemento de dentro de um <svg> (o <svg> inteiro pode), salvo a exceção declarada
//       no elemento da passiva com data-passiva-svg (P1 e P11, se a medida de GPU mandar ficar o SVG de hoje);
//   (f) uma animação infinita roda fora de toda [data-passiva] e de toda .mov-constante.
// Relata, sem reprovar, quantas passivas estão na primeira tela a 1440 × 900.
//
// Uso, da raiz, com o build servido (npm run build && npm start):
//   node ferramentas/regua/conferir-passivas.mjs --base=http://127.0.0.1:3300 --pagina=/ [--pagina=/planos ...]
//   node ferramentas/regua/conferir-passivas.mjs --autoteste
// Saída: o resumo no terminal e o relatório em .regua/passivas.json.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const argumentos = process.argv.slice(2);
const opcao = (nome) => argumentos.find((a) => a.startsWith(`--${nome}=`))?.slice(nome.length + 3);
const BASE = (opcao("base") ?? process.env.BASE ?? "http://localhost:3000").replace(/\/$/, "");
const PAGINAS = argumentos.filter((a) => a.startsWith("--pagina=")).map((a) => a.slice(9));
const PISO = { deslocamento: 6, opacidade: 0.3 };
const LARGURAS = {
  mesa: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  celular: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
};
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- dentro da página ----------

/** As passivas da página, marcadas por índice, e se cada uma aparece na primeira tela (com a página no topo). */
function inventario() {
  scrollTo({ top: 0, behavior: "instant" });
  // A passiva que não existe nesta largura (display: none: a tabela de /planos no celular, o quadro dela na mesa) não conta
  // aqui: nem para o mínimo de duas, nem como reprovação; a outra largura a confere.
  return [...document.querySelectorAll("[data-passiva]")].filter((el) => el.getClientRects().length > 0).map((el, i) => {
    el.dataset.passivaIndice = String(i);
    const r = el.getBoundingClientRect();
    return {
      nome: el.dataset.passiva,
      ambiente: !!el.closest("[data-ambiente]"),
      excecaoSvg: el.hasAttribute("data-passiva-svg"),
      naPrimeiraTela: r.width > 0 && r.height > 0 && r.top < innerHeight && r.bottom > 0 && r.left < innerWidth && r.right > 0,
    };
  });
}

/** Leva a passiva ao meio da tela e espera o [data-visivel] do ambiente dela (o observador do site). */
async function trazer(indice) {
  const el = document.querySelector(`[data-passiva-indice="${indice}"]`);
  const r = el.getBoundingClientRect();
  scrollTo({ top: Math.max(0, scrollY + r.top + r.height / 2 - innerHeight / 2), behavior: "instant" });
  const ambiente = el.closest("[data-ambiente]");
  for (let t = 0; t < 30 && ambiente && !ambiente.hasAttribute("data-visivel"); t++) await new Promise((ok) => setTimeout(ok, 50));
  await new Promise((ok) => setTimeout(ok, 300));
}

/** As animações do documento (sem as ligadas à rolagem) de um elemento e do que vai dentro dele. */
function animacoesDe(el) {
  return el.getAnimations({ subtree: true }).filter((a) => a.timeline === document.timeline);
}

function descrever(alvo, pseudo) {
  const classes = typeof alvo.className === "string" ? alvo.className : alvo.className?.baseVal ?? "";
  return `${alvo.localName}${classes ? "." + classes.trim().split(/\s+/).slice(0, 3).join(".") : ""}${pseudo ?? ""}`;
}

/** As animações da passiva, as propriedades e a amplitude, com a animação parada em 24 pontos do ciclo. */
function medir(indice) {
  const el = document.querySelector(`[data-passiva-indice="${indice}"]`);
  const animacoes = animacoesDe(el);
  const NAO_PROPRIEDADE = new Set(["offset", "computedOffset", "easing", "composite"]);
  const lista = animacoes.map((a) => {
    const efeito = a.effect;
    const tempo = efeito.getComputedTiming();
    const propriedades = [...new Set(efeito.getKeyframes().flatMap((k) => Object.keys(k).filter((p) => !NAO_PROPRIEDADE.has(p))))];
    const alvo = efeito.target;
    return {
      a,
      efeito,
      alvo,
      pseudo: efeito.pseudoElement ?? null,
      nome: a.animationName ?? a.id ?? "",
      propriedades,
      duracao: typeof tempo.duration === "number" ? tempo.duration : 0,
      atraso: tempo.delay ?? 0,
      iteracoes: tempo.iterations,
      dentroDoSvg: alvo instanceof SVGElement && !(alvo instanceof SVGSVGElement),
      descricao: descrever(alvo, efeito.pseudoElement),
    };
  });
  // Os cantos da caixa do alvo: do elemento, pelo getBoundingClientRect; do pseudoelemento, pela matriz do estilo.
  const cantos = (alvo, pseudo) => {
    if (!pseudo) {
      const r = alvo.getBoundingClientRect();
      return [[r.left, r.top], [r.right, r.top], [r.left, r.bottom], [r.right, r.bottom]];
    }
    const cs = getComputedStyle(alvo, pseudo);
    const [ox, oy] = cs.transformOrigin.split(" ").map(parseFloat);
    const [tx = 0, ty = 0] = cs.translate === "none" ? [] : cs.translate.split(" ").map(parseFloat);
    const giro = cs.rotate === "none" ? 0 : parseFloat(cs.rotate.split(" ").at(-1));
    const [sx = 1, sy = sx] = cs.scale === "none" ? [] : cs.scale.split(" ").map(parseFloat);
    const m = new DOMMatrix()
      .translate(ox, oy)
      .translate(tx, ty)
      .rotate(giro)
      .scale(sx, sy)
      .multiply(new DOMMatrix(cs.transform === "none" ? undefined : cs.transform))
      .translate(-ox, -oy);
    const w = parseFloat(cs.width) || 0;
    const h = parseFloat(cs.height) || 0;
    return [[0, 0], [w, 0], [0, h], [w, h]].map(([x, y]) => {
      const p = m.transformPoint({ x, y });
      return [p.x, p.y];
    });
  };
  const amostras = new Map();
  const tocavam = lista.map(({ a }) => a.playState);
  for (const { a } of lista) a.pause();
  for (let k = 0; k < 24; k++) {
    for (const { a, duracao, atraso } of lista) if (duracao > 0) a.currentTime = Math.max(0, atraso) + (k / 24) * duracao;
    for (const { alvo, pseudo, descricao } of lista) {
      const chave = descricao + "|" + lista.findIndex((x) => x.alvo === alvo && x.pseudo === pseudo);
      if (!amostras.has(chave)) amostras.set(chave, { cantos: [], opacidade: [] });
      const amostra = amostras.get(chave);
      amostra.cantos.push(cantos(alvo, pseudo));
      amostra.opacidade.push(parseFloat(getComputedStyle(alvo, pseudo).opacity));
    }
  }
  lista.forEach(({ a }, i) => (tocavam[i] === "running" ? a.play() : null));
  let deslocamento = 0;
  let opacidade = 0;
  for (const { cantos: c, opacidade: o } of amostras.values()) {
    for (let canto = 0; canto < 4; canto++) {
      const xs = c.map((s) => s[canto][0]);
      const ys = c.map((s) => s[canto][1]);
      deslocamento = Math.max(deslocamento, Math.hypot(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)));
    }
    opacidade = Math.max(opacidade, Math.max(...o) - Math.min(...o));
  }
  return {
    animacoes: lista.map(({ nome, propriedades, duracao, iteracoes, dentroDoSvg, descricao }) => ({
      nome,
      alvo: descricao,
      propriedades,
      duracao: Math.round(duracao),
      iteracoes: iteracoes === Infinity ? "infinita" : iteracoes,
      dentroDoSvg,
    })),
    deslocamento: Math.round(deslocamento * 10) / 10,
    opacidade: Math.round(opacidade * 100) / 100,
  };
}

/** As animações que rodam agora na passiva (ou nas constantes, sem índice). */
function rodando(indice) {
  const alvos = indice == null ? [...document.querySelectorAll(".mov-constante")] : [document.querySelector(`[data-passiva-indice="${indice}"]`)];
  return alvos.flatMap((el) => animacoesDe(el).filter((a) => a.playState === "running").map((a) => a.animationName ?? "?"));
}

/** Tira o [data-ambiente] da passiva da tela: rola para antes ou depois dele. Devolve false se não houver como. */
async function tirarDaTela(indice) {
  const ambiente = document.querySelector(`[data-passiva-indice="${indice}"]`).closest("[data-ambiente]");
  if (!ambiente) return false;
  const r = ambiente.getBoundingClientRect();
  const topo = scrollY + r.top;
  const pe = scrollY + r.bottom;
  const maximo = document.documentElement.scrollHeight - innerHeight;
  const destino = pe + 10 <= maximo ? pe + 10 : topo - innerHeight - 10 >= 0 ? topo - innerHeight - 10 : null;
  if (destino == null) return false;
  scrollTo({ top: destino, behavior: "instant" });
  for (let t = 0; t < 30 && !ambiente.hasAttribute("data-fora"); t++) await new Promise((ok) => setTimeout(ok, 50));
  await new Promise((ok) => setTimeout(ok, 200));
  return true;
}

/** As animações infinitas que rodam agora fora de toda passiva e de toda constante. */
function infinitasSemDono() {
  return document
    .getAnimations()
    .filter((a) => a.timeline === document.timeline && a.playState === "running" && a.effect?.getComputedTiming().iterations === Infinity)
    .filter((a) => !a.effect.target?.closest?.("[data-passiva], .mov-constante"))
    .map((a) => `${a.animationName ?? "?"} em ${a.effect.target?.localName ?? "?"}${a.effect.pseudoElement ?? ""}${a.effect.target?.className && typeof a.effect.target.className === "string" ? "." + a.effect.target.className.trim().split(/\s+/).slice(0, 2).join(".") : ""}`);
}

// ---------- fora da página ----------

async function abrir(navegador, url, contexto, preparar) {
  const ctx = await navegador.newContext(contexto);
  // As funções de que as outras precisam dentro da página (o evaluate só leva a função que recebe).
  await ctx.addInitScript({ content: `window.animacoesDe = ${animacoesDe};\nwindow.descrever = ${descrever};` });
  if (preparar) await preparar(ctx);
  const pagina = await ctx.newPage();
  await pagina.goto(url, { waitUntil: "load" });
  await espera(1200);
  return { ctx, pagina };
}

/** Confere uma página numa largura. Devolve as passivas medidas e as falhas ({ caso, passiva, motivo }). */
async function conferir(navegador, url, largura, preparar) {
  const falhas = [];
  const { ctx, pagina } = await abrir(navegador, url, LARGURAS[largura], preparar);
  const passivas = await pagina.evaluate(inventario);

  const nomes = passivas.map((p) => p.nome);
  if (passivas.length < 2) falhas.push({ caso: "c", motivo: `${passivas.length} passiva(s); o mínimo é 2` });
  for (const nome of new Set(nomes)) if (nomes.filter((n) => n === nome).length > 1) falhas.push({ caso: "c", passiva: nome, motivo: "data-passiva repetido" });

  // A pausa: nenhuma passiva nem constante rodando com html.ambiente-pausado.
  await pagina.evaluate(() => document.documentElement.classList.add("ambiente-pausado"));
  for (const [i, p] of passivas.entries()) {
    await pagina.evaluate(trazer, i);
    const r = await pagina.evaluate(rodando, i);
    if (r.length) falhas.push({ caso: "b", passiva: p.nome, motivo: `roda na pausa: ${r.join(", ")}` });
  }
  const constantes = await pagina.evaluate(rodando, null);
  if (constantes.length) falhas.push({ caso: "b", motivo: `constante rodando na pausa: ${constantes.join(", ")}` });
  await pagina.evaluate(() => document.documentElement.classList.remove("ambiente-pausado"));

  // Fora da tela.
  for (const [i, p] of passivas.entries()) {
    if (!p.ambiente) continue;
    if (!(await pagina.evaluate(tirarDaTela, i))) {
      p.foraDaTela = "sem como tirar da tela";
      continue;
    }
    const r = await pagina.evaluate(rodando, i);
    if (r.length) falhas.push({ caso: "b", passiva: p.nome, motivo: `roda fora da tela: ${r.join(", ")}` });
  }

  // As infinitas sem dono, a página inteira, tela a tela.
  const semDono = new Set();
  const alto = await pagina.evaluate(() => document.documentElement.scrollHeight);
  const tela = LARGURAS[largura].viewport.height;
  for (let y = 0; y < alto; y += tela) {
    await pagina.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), y);
    await espera(350);
    for (const d of await pagina.evaluate(infinitasSemDono)) semDono.add(d);
  }
  for (const d of semDono) falhas.push({ caso: "f", motivo: `animação infinita fora de passiva e de constante: ${d}` });

  // A medida de cada uma, à vista, por último: parar e retomar pela API (pause, play) desliga, dali em diante, o
  // animation-play-state do CSS naquela animação, e a pausa e a saída da tela já não seriam as do site.
  for (const [i, p] of passivas.entries()) {
    await pagina.evaluate(trazer, i);
    Object.assign(p, await pagina.evaluate(medir, i));
    if (!p.animacoes.length) falhas.push({ caso: "d", passiva: p.nome, motivo: "nenhuma animação à vista" });
    for (const a of p.animacoes) {
      const fora = a.propriedades.filter((x) => !["transform", "opacity", "translate", "rotate", "scale"].includes(x));
      if (fora.length) falhas.push({ caso: "a", passiva: p.nome, motivo: `${a.nome} anima ${fora.join(", ")}` });
      if (a.dentroDoSvg && !p.excecaoSvg) falhas.push({ caso: "e", passiva: p.nome, motivo: `${a.nome} anima ${a.alvo}, dentro de um <svg>` });
    }
    if (p.animacoes.length && p.deslocamento < PISO.deslocamento && p.opacidade < PISO.opacidade) {
      falhas.push({ caso: "d", passiva: p.nome, motivo: `${p.deslocamento} px e ${p.opacidade} de opacidade (piso: ${PISO.deslocamento} px ou ${PISO.opacidade})` });
    }
    if (!p.ambiente) falhas.push({ caso: "b", passiva: p.nome, motivo: "fora de todo [data-ambiente]: nada a para fora da tela" });
  }
  await ctx.close();

  // O movimento reduzido: nada roda.
  const reduzido = await abrir(navegador, url, { ...LARGURAS[largura], reducedMotion: "reduce" }, preparar);
  await reduzido.pagina.evaluate(inventario);
  for (const [i, p] of passivas.entries()) {
    await reduzido.pagina.evaluate(trazer, i);
    const r = await reduzido.pagina.evaluate(rodando, i);
    if (r.length) falhas.push({ caso: "b", passiva: p.nome, motivo: `roda com o movimento reduzido: ${r.join(", ")}` });
  }
  await reduzido.ctx.close();
  return { passivas, falhas };
}

// ---------- o autoteste: uma página mínima com uma passiva certa e uma de cada erro ----------

const FOLHA = `
  .ambiente-pausado :is(.mov-passiva, .mov-constante), [data-fora] :is(.mov-passiva, .mov-constante),
  :is(.mov-passiva, .mov-constante)[data-fora] { animation-play-state: paused !important; }
  @media (prefers-reduced-motion: reduce) { .mov-passiva, .mov-passiva::before, .mov-passiva::after { animation: none !important; } }
  @keyframes anda { to { transform: translateX(12px); } }
  @keyframes respira { to { opacity: 0.4; } }
  @keyframes pouco { to { transform: translateX(2px); } }
  @keyframes largura { to { width: 60px; } }
  .js [data-visivel] .anda, .js [data-visivel] .anda-sempre { animation: anda 2s ease-in-out infinite alternate; }
  .js [data-visivel] .respira { animation: respira 3s ease-in-out infinite alternate; }
  .js [data-visivel] .pouco { animation: pouco 2s ease-in-out infinite alternate; }
  .js [data-visivel] .largura { animation: largura 2s ease-in-out infinite alternate; }
  .livre { animation: anda 2s linear infinite; }
  .caixa { display: block; width: 40px; height: 40px; background: #0f2a47; }
  .vao { height: 1400px; }`;
const OBSERVADOR = `document.documentElement.classList.add("js");
  addEventListener("DOMContentLoaded", () => {
    const o = new IntersectionObserver((es) => es.forEach((e) => { e.target.toggleAttribute("data-fora", !e.isIntersecting); e.target.toggleAttribute("data-visivel", e.isIntersecting); }));
    document.querySelectorAll("[data-ambiente]").forEach((el) => o.observe(el));
  });`;
const CERTAS = `
  <div data-ambiente><div data-passiva="t-uma" class="caixa mov-passiva anda"></div></div>
  <div class="vao"></div>
  <div data-ambiente><div data-passiva="t-duas"><span class="caixa mov-passiva respira"></span></div></div>
  <div class="vao"></div>`;
const CASOS = {
  certa: { corpo: CERTAS, espera: [] },
  a: { corpo: CERTAS + `<div data-ambiente><div data-passiva="t-a" class="caixa mov-passiva largura"></div></div><div class="vao"></div>`, espera: ["a"] },
  b: { corpo: CERTAS + `<div data-ambiente><div data-passiva="t-b" class="caixa anda-sempre"></div></div><div class="vao"></div>`, espera: ["b"] },
  "c-repetida": { corpo: CERTAS + `<div data-ambiente><div data-passiva="t-uma" class="caixa mov-passiva anda"></div></div><div class="vao"></div>`, espera: ["c"] },
  "c-sozinha": { corpo: `<div data-ambiente><div data-passiva="t-uma" class="caixa mov-passiva anda"></div></div><div class="vao"></div>`, espera: ["c"] },
  d: { corpo: CERTAS + `<div data-ambiente><div data-passiva="t-d" class="caixa mov-passiva pouco"></div></div><div class="vao"></div>`, espera: ["d"] },
  e: { corpo: CERTAS + `<div data-ambiente><svg data-passiva="t-e" width="40" height="40"><circle class="mov-passiva anda" cx="20" cy="20" r="10"/></svg></div><div class="vao"></div>`, espera: ["e"] },
  f: { corpo: CERTAS + `<span class="caixa livre"></span>`, espera: ["f"] },
};

async function autoteste(navegador) {
  const ORIGEM = "http://autoteste.passivas";
  const preparar = (ctx) =>
    ctx.route(`${ORIGEM}/**`, (rota) => {
      const caso = CASOS[new URL(rota.request().url()).pathname.slice(1)];
      return rota.fulfill({ contentType: "text/html", body: `<!doctype html><html><head><style>${FOLHA}</style><script>${OBSERVADOR}</script></head><body>${caso.corpo}</body></html>` });
    });
  let erros = 0;
  for (const [nome, caso] of Object.entries(CASOS)) {
    const { falhas } = await conferir(navegador, `${ORIGEM}/${nome}`, "mesa", preparar);
    const achados = [...new Set(falhas.map((f) => f.caso))].sort();
    const certo = JSON.stringify(achados) === JSON.stringify(caso.espera);
    if (!certo) erros++;
    console.log(`${certo ? "ok" : "ERRO"} · ${nome}: esperava [${caso.espera.join(", ")}], deu [${achados.join(", ")}]${certo ? "" : " — " + falhas.map((f) => f.motivo).join("; ")}`);
  }
  console.log(erros ? `autoteste: ${erros} caso(s) errado(s)` : "autoteste: os oito casos conferem");
  process.exitCode = erros ? 1 : 0;
}

// ---------- a régua ----------

const { chromium } = await import("playwright");
const navegador = await chromium.launch({ channel: "chrome" });
try {
  if (argumentos.includes("--autoteste")) {
    await autoteste(navegador);
  } else {
    const relatorio = { quando: new Date().toISOString(), base: BASE, piso: PISO, paginas: [] };
    let reprovadas = 0;
    for (const caminho of PAGINAS.length ? PAGINAS : ["/", "/para-quem", "/planos", "/orcamento", "/o-trabalho", "/o-atlas", "/duvidas"]) {
      for (const largura of Object.keys(LARGURAS)) {
        const { passivas, falhas } = await conferir(navegador, BASE + caminho, largura);
        if (falhas.length) reprovadas++;
        relatorio.paginas.push({ pagina: caminho, largura, passivas, falhas });
        const naPrimeira = passivas.filter((p) => p.naPrimeiraTela).length;
        console.log(`${caminho} · ${largura}: ${passivas.length} passiva(s)${largura === "mesa" ? `, ${naPrimeira} na primeira tela` : ""} — ${falhas.length ? `REPROVA (${falhas.length})` : "aprova"}`);
        for (const p of passivas) console.log(`  ${p.nome}: ${p.animacoes.map((a) => `${a.nome} em ${a.alvo} [${a.propriedades.join(", ")}] ${a.duracao} ms`).join("; ") || "sem animação"} · amplitude ${p.deslocamento} px, ${p.opacidade} de opacidade`);
        for (const f of falhas) console.log(`  (${f.caso})${f.passiva ? " " + f.passiva + ":" : ""} ${f.motivo}`);
      }
    }
    await mkdir(".regua", { recursive: true });
    await writeFile(path.join(".regua", "passivas.json"), JSON.stringify(relatorio, null, 2));
    console.log("\nRelatório em .regua/passivas.json.");
    process.exitCode = reprovadas ? 1 : 0;
  }
} finally {
  await navegador.close();
}

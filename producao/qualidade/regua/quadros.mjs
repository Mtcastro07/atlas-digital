// O ritmo dos quadros: o site roda a 60 quadros por segundo na rolagem e em toda navegação, "sem matar muito a
// capacidade dos celulares" (pedido do sócio, 22.10.2026). A barreira do travamento (ferramentas/custo.mjs; 02-regua.md,
// seção 6) só barra o extremo, quadros acima de 100 ms; esta régua mede o quadro a quadro.
//
// Como mede. O rastro do Chrome (Tracing), nas categorias do painel Performance do DevTools: a cada batida do vsync
// (BeginFrame, frameSeqId), o compositor da página registra se desenhou o quadro inteiro (DrawFrame), só em parte
// (DroppedFrame com hasPartialUpdate: a rolagem andou, mas o que depende da linha principal — o canvas, o efeito por
// script — ficou para trás) ou se o perdeu (DroppedFrame); sem nada a mudar, a batida é ociosa e não conta. É o modelo
// da faixa "Frames" do DevTools e da métrica de fluidez do Chrome (https://web.dev/articles/smoothness). Foi preferido
// a um laço de requestAnimationFrame, que pede um quadro da linha principal a cada batida (muda o que mede) e não vê a
// rolagem feita no compositor, e ao long-animation-frame, que só registra quadros acima de 50 ms.
//
// Os gestos, cada um com a página recém-carregada e o processador estrangulado depois da carga:
//   rolagem    celular: arremessos do dedo (Input.synthesizeScrollGesture, toque, com fling) do topo ao rodapé e de
//              volta; mesa: a roda (o mesmo gesto com gestureSourceType "mouse", rodadas a cada quadro), em tiras
//   menu       abrir e fechar o menu (o botão aria-haspopup="dialog" do cabeçalho), onde houver
//   navegacao  cada vínculo interno do cabeçalho ou do menu (a troca do app router) e o voltar
//   figura     o arraste do globo (/), da lente (/para-quem), o simulador (/planos, só na mesa) e, nos exemplos, o
//              ponteiro e o arraste sobre o canvas da capa
// Os perfis: o celular (390 × 844, toque, densidade 3) com a CPU 4× (o aparelho médio do kit) e 6× (o de entrada), e a
// mesa (1440 × 900) sem estrangulamento. O estrangulamento do DevTools só freia a linha principal do renderizador: a
// rasterização, a GPU e o compositor rodam na velocidade do Mac. O que pesa na GPU do celular (desfoque, máscara,
// camadas grandes) aparece aqui menor do que é.
//
// O critério, a 60 Hz (vsync de 16,7 ms; o intervalo se conta em batidas, sem tolerância de relógio):
//   emDia  a parcela das batidas com algo a mudar em que o quadro saiu inteiro: ≥ 95%
//   p95    o 95º percentil do intervalo entre quadros inteiros: 1 batida (16,7 ms)
//   pior   o maior intervalo: até 3 batidas (50 ms, o limiar da tarefa longa e do long-animation-frame)
// Porta no celular 4× e na mesa; no celular 6×, aviso, com a régua de 90%, 2 batidas e 6 batidas (100 ms, a barreira
// de hoje). A ocupação da linha principal durante o gesto se relata (a folga do aparelho), sem reprovar.
//
// Uso, da raiz, com o build servido (npm run build && npm start):
//   node ferramentas/regua/quadros.mjs --base=http://localhost:3300
// Opções: --pagina=/planos (repita), --perfil=celular4|celular6|mesa (repita), --gesto=rolagem|menu|navegacao|figura
// (repita), --vezes=3 (a mediana de cada medida), --autoteste (só confere a conta dos quadros).
// Saída: o resumo no terminal e o relatório em .regua/quadros.json, com o que pesou em cada medida (o tempo próprio por
// evento da linha principal, as funções, a rasterização, as tarefas mais longas). Sai com 1 se alguma porta reprovar.

import { mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const argumentos = process.argv.slice(2);
const opcao = (nome) => argumentos.find((a) => a.startsWith(`--${nome}=`))?.slice(nome.length + 3);
const varias = (nome) => argumentos.filter((a) => a.startsWith(`--${nome}=`)).map((a) => a.slice(nome.length + 3));
const BASE = (opcao("base") ?? process.env.BASE ?? "http://localhost:3000").replace(/\/$/, "");
const VEZES = Number(opcao("vezes") ?? 3);

const PAGINAS_PADRAO = [
  "/", "/o-trabalho", "/planos", "/orcamento", "/para-quem", "/o-atlas", "/duvidas",
  "/demos/barbearia", "/demos/deposito", "/demos/nutricao", "/demos/odontologia", "/demos/petshop", "/demos/restaurante",
];
const CELULAR = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true };
export const PERFIS = {
  celular4: { contexto: CELULAR, cpu: 4, porta: true },
  celular6: { contexto: CELULAR, cpu: 6, porta: false },
  mesa: { contexto: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }, cpu: 1, porta: true },
};
const CRITERIO = { porta: { emDia: 0.95, p95: 1, pior: 3 }, aviso: { emDia: 0.9, p95: 2, pior: 6 } };
const GESTOS = ["rolagem", "menu", "navegacao", "figura"];
// O painel aberto: o <dialog> nativo (o simulador) ou o div com role="dialog" (o menu do Atlas).
const RAIZES_DO_DIALOGO = ["dialog[open]", '[role="dialog"]'];
const DIALOGO = RAIZES_DO_DIALOGO.join(", ");
export const CATEGORIAS = "devtools.timeline,disabled-by-default-devtools.timeline,disabled-by-default-devtools.timeline.frame";

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const mediana = (v) => {
  const s = v.filter((x) => x != null).sort((a, b) => a - b);
  return s.length ? (s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2) : null;
};
const percentil = (v, q) => {
  const s = [...v].sort((a, b) => a - b);
  return s.length ? s[Math.min(s.length - 1, Math.ceil(q * s.length) - 1)] : null;
};

// ——— A conta dos quadros, a partir dos eventos do rastro ———

export function analisar(eventos) {
  const inicio = eventos.find((e) => e.name === "TracingStartedInBrowser");
  const quadro = (n) => eventos.filter((e) => e.name === n);
  let pid = inicio?.args?.data?.frames?.find((f) => f.isOutermostMainFrame)?.processId;
  const batidas = quadro("BeginFrame");
  if (!batidas.some((e) => e.pid === pid)) pid = batidas[0]?.pid;
  // A árvore de camadas da página: a de mais batidas no processo dela (os iframes do mesmo site vão junto).
  const porArvore = {};
  for (const e of batidas) if (e.pid === pid) porArvore[e.args.layerTreeId] = (porArvore[e.args.layerTreeId] ?? 0) + 1;
  const arvore = Number(Object.entries(porArvore).sort((a, b) => b[1] - a[1])[0]?.[0]);
  const daPagina = (e) => e.pid === pid && e.args?.layerTreeId === arvore;

  const estado = new Map(); // frameSeqId → "ocioso" | "inteiro" | "parcial" | "perdido"
  const tempo = new Map();
  for (const e of batidas.filter(daPagina)) estado.set(e.args.frameSeqId, "ocioso"), tempo.set(e.args.frameSeqId, e.ts);
  for (const e of quadro("DrawFrame").filter(daPagina)) if (estado.has(e.args.frameSeqId)) estado.set(e.args.frameSeqId, "inteiro");
  for (const e of quadro("DroppedFrame").filter(daPagina)) {
    if (!estado.has(e.args.frameSeqId)) continue;
    estado.set(e.args.frameSeqId, e.args.hasPartialUpdate || estado.get(e.args.frameSeqId) === "inteiro" ? "parcial" : "perdido");
  }
  const seqs = [...estado.keys()].sort((a, b) => a - b);
  const passos = seqs.slice(1).map((s, i) => (tempo.get(s) - tempo.get(seqs[i])) / 1000 / (s - seqs[i]));
  const vsync = mediana(passos) ?? 1000 / 60;

  // O intervalo entre quadros inteiros, em batidas: as batidas perdidas ou parciais desde o último quadro inteiro, mais
  // a dele. Uma batida ociosa fecha a conta (nada esperava ser desenhado). "Tela": o mesmo, contando o parcial como
  // desenhado (o que o dedo sente na rolagem, mesmo com o canvas atrasado).
  const contar = (desenhou) => {
    const intervalos = [];
    let atraso = 0;
    for (let i = 0; i < seqs.length; i++) {
      const s = estado.get(seqs[i]);
      const salto = i ? seqs[i] - seqs[i - 1] - 1 : 0; // batidas sem evento nenhum: ociosas
      if (salto > 0 && atraso) intervalos.push(atraso + 1), (atraso = 0);
      if (s === "ocioso") {
        if (atraso) intervalos.push(atraso + 1), (atraso = 0);
      } else if (desenhou(s)) intervalos.push(atraso + 1), (atraso = 0);
      else atraso++;
    }
    if (atraso) intervalos.push(atraso + 1);
    return intervalos;
  };
  const n = { inteiro: 0, parcial: 0, perdido: 0, ocioso: 0 };
  for (const s of estado.values()) n[s]++;
  const ativos = n.inteiro + n.parcial + n.perdido;
  const intervalos = contar((s) => s === "inteiro");
  const daTela = contar((s) => s !== "perdido");
  return {
    vsync,
    quadros: n,
    emDia: ativos ? n.inteiro / ativos : null,
    p95: percentil(intervalos, 0.95),
    pior: intervalos.length ? Math.max(...intervalos) : null,
    piorDaTela: daTela.length ? Math.max(...daTela) : null,
    pesos: pesar(eventos, pid, seqs.length ? [tempo.get(seqs[0]), tempo.get(seqs.at(-1))] : null),
  };
}

// O que pesou: o tempo próprio de cada evento na linha principal, as funções (o arquivo, a linha e a coluna do
// script compilado), as tarefas mais longas, e o trabalho fora dela (rasterização, decodificação, GPU).
function pesar(eventos, pid, janela) {
  if (!janela) return null;
  const nomeDe = (nome) => eventos.find((e) => e.ph === "M" && e.name === "thread_name" && e.pid === pid && e.args.name === nome)?.tid;
  const principal = nomeDe("CrRendererMain");
  const ms = (us) => Math.round(us / 100) / 10;
  const completos = eventos
    .filter((e) => e.pid === pid && e.tid === principal && e.ph === "X" && e.dur != null)
    .sort((a, b) => a.ts - b.ts || b.dur - a.dur);
  // Uma passagem com a pilha dos eventos abertos: o tempo próprio (a duração menos a dos filhos diretos), a tarefa de
  // cada evento e as funções de topo (a FunctionCall que não está dentro de outra).
  const nos = [];
  const tarefas = [];
  const funcoes = {};
  const pilha = [];
  for (const e of completos) {
    while (pilha.length && pilha.at(-1).fim <= e.ts) pilha.pop();
    const pai = pilha.at(-1);
    if (pai) pai.filhos += e.dur;
    const no = { e, fim: e.ts + e.dur, filhos: 0, tarefa: pai ? pai.tarefa : e.name === "RunTask" ? { dur: e.dur, por: {} } : null };
    if (!pai && no.tarefa) tarefas.push(no.tarefa);
    if (e.name === "FunctionCall" && !pilha.some((n) => n.e.name === "FunctionCall")) {
      const d = e.args?.data ?? {};
      const chave = `${d.functionName || "(anônima)"} ${path.basename(d.url || "?")}:${d.lineNumber}:${d.columnNumber}`;
      funcoes[chave] = (funcoes[chave] ?? 0) + e.dur;
    }
    pilha.push(no);
    nos.push(no);
  }
  const proprio = {};
  for (const no of nos) {
    const nome = no.e.name === "Paint" ? `Paint ${no.e.args?.data?.nodeName ?? ""}`.trim() : no.e.name;
    const t = Math.max(0, no.e.dur - no.filhos);
    proprio[nome] = (proprio[nome] ?? 0) + t;
    if (no.tarefa) no.tarefa.por[nome] = (no.tarefa.por[nome] ?? 0) + t;
  }
  const ocupado = tarefas.reduce((s, t) => s + t.dur, 0);
  const fora = {};
  for (const e of eventos) {
    if (e.ph !== "X" || !/^(RasterTask|ImageDecodeTask|Decode Image|GPUTask)$/.test(e.name)) continue;
    fora[e.name] = (fora[e.name] ?? 0) + e.dur;
  }
  const imagens = {};
  for (const e of completos) if (e.name === "PaintImage") {
    const d = e.args.data;
    const chave = `${d.nodeName?.slice(0, 90)} ${d.srcWidth}×${d.srcHeight}`;
    imagens[chave] = (imagens[chave] ?? 0) + e.dur;
  }
  const topo = (o, k) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, k).map(([nome, us]) => [nome, ms(us)]);
  const duracao = Math.max(1, janela[1] - janela[0]);
  return {
    duracaoMs: ms(duracao),
    ocupacao: Math.round((ocupado / duracao) * 1000) / 1000,
    proprio: topo(proprio, 14),
    funcoes: topo(funcoes, 10),
    imagens: topo(imagens, 5),
    fora: topo(fora, 4),
    tarefasLongas: tarefas.sort((a, b) => b.dur - a.dur).slice(0, 5).map((t) => ({ ms: ms(t.dur), por: topo(t.por, 4) })),
  };
}

// ——— Os gestos ———

const centro = async (alvo) => {
  const r = await alvo.boundingBox();
  return r && { x: r.x + r.width / 2, y: r.y + r.height / 2, largura: r.width, altura: r.height };
};

// Um arraste quadro a quadro: pelo dedo (touch) no celular, pelo botão do mouse na mesa. Sem botão: só o ponteiro.
async function arrastar(cdp, perfil, { x, y }, dx, dy, { apertar = true, passos = 60 } = {}) {
  const ponto = (i) => {
    const f = Math.sin((i / passos) * Math.PI * 2); // vai e volta
    return { x: Math.round(x + dx * f), y: Math.round(y + dy * f) };
  };
  if (perfil.contexto.hasTouch) {
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [ponto(0)] });
    for (let i = 1; i <= passos; i++) {
      await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [ponto(i)] });
      await esperar(16);
    }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    return;
  }
  const mouse = (type, p, extra = {}) => cdp.send("Input.dispatchMouseEvent", { type, ...p, button: apertar ? "left" : "none", ...extra });
  await mouse("mouseMoved", ponto(0), { button: "none" });
  if (apertar) await mouse("mousePressed", ponto(0), { clickCount: 1 });
  for (let i = 1; i <= passos; i++) {
    await mouse("mouseMoved", ponto(i), apertar ? { buttons: 1 } : {});
    await esperar(16);
  }
  if (apertar) await mouse("mouseReleased", ponto(passos), { clickCount: 1 });
}

const rolar = (cdp, opcoes) => cdp.send("Input.synthesizeScrollGesture", opcoes);
const alturaRolavel = (p) => p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
const posicao = (p) => p.evaluate(() => scrollY);

async function rolagem(p, cdp, perfil) {
  const { width, height } = perfil.contexto.viewport;
  for (const sentido of [-1, 1]) {
    for (let i = 0; i < 40; i++) {
      const y = await posicao(p);
      const alto = await alturaRolavel(p);
      if (sentido < 0 ? y >= alto - 2 : y <= 2) break;
      if (perfil.contexto.hasTouch) {
        // O arremesso: 600 px de dedo a 2.400 px/s, solto com fling; o dedo à direita do meio, fora das figuras.
        await rolar(cdp, { x: Math.round(width * 0.78), y: sentido < 0 ? Math.round(height * 0.75) : Math.round(height * 0.2), yDistance: 600 * sentido, speed: 2400, gestureSourceType: "touch", preventFling: false });
        await esperar(700);
      } else {
        // A roda, em tiras de 1.200 px a 2.000 px/s, com o respiro de quem gira a roda de novo.
        await rolar(cdp, { x: Math.round(width / 2), y: Math.round(height / 2), yDistance: 1200 * sentido, speed: 2000, gestureSourceType: "mouse" });
        await esperar(250);
      }
    }
  }
  return "rolagem";
}

// Durante o rastro, nada de localizador do Playwright: ele injeta o próprio script e sonda a página a cada quadro (a
// primeira injeção custou 115 ms de linha principal com a CPU 4×, e virou o "pior quadro" da rolagem; 22.10.2026). O
// ponto de um elemento se lê na página; o toque e o clique vão pelo Input do CDP.
const pontoDe = (p, seletor) =>
  p.evaluate((seletor) => {
    for (const el of document.querySelectorAll(seletor)) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && getComputedStyle(el).visibility !== "hidden") return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }
    return null;
  }, seletor);
const tocar = (p, perfil, { x, y }) => (perfil.contexto.hasTouch ? p.touchscreen.tap(x, y) : p.mouse.click(x, y));
const botaoDoMenu = async (p) => {
  const ponto = await pontoDe(p, '[aria-haspopup="dialog"][aria-expanded], a[href="#indice"]'); // o segundo é o gatilho da base
  return ponto && ponto.y < 140 ? ponto : null; // o do cabeçalho, no topo
};
const dialogoAberto = (p, aberto = true) =>
  p.waitForFunction(
    ({ seletor, aberto }) => [...document.querySelectorAll(seletor)].some((d) => d.getBoundingClientRect().width > 0) === aberto,
    { seletor: DIALOGO, aberto },
    { polling: 100, timeout: 15_000 },
  );

async function menu(p, cdp, perfil) {
  const botao = await botaoDoMenu(p);
  if (!botao) return null;
  await tocar(p, perfil, botao);
  await dialogoAberto(p);
  await esperar(900);
  await p.keyboard.press("Escape");
  await esperar(900);
  return "menu";
}

// Os vínculos internos: os do menu (celular) ou os do cabeçalho; sem eles, os da primeira <nav>.
async function vinculos(p, perfil) {
  const botao = await botaoDoMenu(p);
  if (botao) await tocar(p, perfil, botao), await dialogoAberto(p);
  const lista = await p.evaluate((raizes) => {
    const visivel = (a) => { const r = a.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    let as = [...document.querySelectorAll(raizes.map((r) => `${r} a[href^="/"]`).join(", "))].filter(visivel);
    if (!as.length) as = [...document.querySelectorAll('nav a[href^="/"]')].filter(visivel);
    return [...new Set(as.filter((a) => a.target !== "_blank").map((a) => a.getAttribute("href").split("#")[0]))].filter((h) => h && h !== location.pathname);
  }, botao ? RAIZES_DO_DIALOGO : ["header"]);
  if (botao) await p.keyboard.press("Escape"), await esperar(700);
  return { lista: lista.slice(0, 7), comMenu: !!botao };
}

async function navegacao(p, cdp, perfil, { lista, comMenu }) {
  if (!lista.length) return null;
  const origem = new URL(p.url()).pathname;
  for (const href of lista) {
    if (comMenu) {
      await tocar(p, perfil, await botaoDoMenu(p));
      await dialogoAberto(p);
      await esperar(500);
    }
    const raizes = comMenu ? RAIZES_DO_DIALOGO : ["header", "nav"];
    const ponto = await pontoDe(p, raizes.map((r) => `${r} a[href="${href}"]`).join(", "));
    if (!ponto) throw new Error(`vínculo ${href} fora da tela`);
    await tocar(p, perfil, ponto);
    await p.waitForURL((u) => u.pathname === href, { timeout: 15_000 });
    await esperar(1300);
    await p.evaluate(() => history.back());
    await p.waitForURL((u) => u.pathname === origem, { timeout: 15_000 });
    await esperar(1300);
  }
  return "navegacao";
}

// A figura principal: o que a página tem, na ordem; o simulador só na mesa (no celular, o cartão abre o site).
async function prepararFigura(p, perfil) {
  for (const [nome, seletor] of [["globo", ".vd-terra-controle"], ["lente", ".vd-carta-regiao"], ["simulador", "a[data-simulador]"], ["canvas", "canvas.bb-palco, canvas.od-palco"]]) {
    const alvo = p.locator(seletor).first();
    if (!(await alvo.count())) continue;
    if (nome === "simulador" && perfil.contexto.hasTouch) return null;
    if (nome !== "canvas") await alvo.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
    await esperar(1200);
    return { nome, alvo };
  }
  return null;
}

async function figura(p, cdp, perfil, { nome, alvo }) {
  if (nome === "simulador") {
    await tocar(p, perfil, await centro(alvo));
    await dialogoAberto(p);
    await esperar(2500);
    const c = await pontoDe(p, "dialog[open]");
    await rolar(cdp, { x: Math.round(c.x), y: Math.round(c.y), yDistance: -1500, speed: 1500, gestureSourceType: "mouse" });
    await esperar(600);
    await p.keyboard.press("Escape");
    await esperar(1200);
    return "simulador";
  }
  const c = await centro(alvo);
  const meio = { x: c.x, y: nome === "canvas" ? Math.min(c.y, perfil.contexto.viewport.height * 0.45) : c.y };
  const dx = Math.min(c.largura * 0.35, perfil.contexto.hasTouch ? 130 : 260);
  if (nome === "canvas" && !perfil.contexto.hasTouch) await arrastar(cdp, perfil, meio, dx, 60, { apertar: false });
  await arrastar(cdp, perfil, meio, dx, nome === "lente" && !perfil.contexto.hasTouch ? 80 : 0);
  await esperar(800);
  return nome;
}

// ——— Uma medida: a página recém-carregada, o processador estrangulado, o rastro só durante o gesto ———

// `extras`, para o diagnóstico: mais categorias no rastro, um passo depois da carga (ex.: tirar um efeito) e os eventos crus.
export async function medir(navegador, url, perfil, gesto, extras = {}) {
  const ctx = await navegador.newContext(perfil.contexto);
  const p = await ctx.newPage();
  try {
    const cdp = await ctx.newCDPSession(p);
    await p.goto(url, { waitUntil: "load", timeout: 60_000 });
    await esperar(2500); // os pedaços do import() depois do load
    await extras.aoCarregar?.(p);
    await p.evaluate(() => 0); // o script do Playwright entra na página antes do rastro
    let preparo = null;
    if (gesto === "navegacao") preparo = await vinculos(p, perfil);
    if (gesto === "figura") preparo = await prepararFigura(p, perfil);
    if ((gesto === "navegacao" && !preparo.lista.length) || (gesto === "figura" && !preparo)) return null;
    if (gesto === "menu" && !(await botaoDoMenu(p))) return null;
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: perfil.cpu });
    await esperar(800);
    const eventos = [];
    cdp.on("Tracing.dataCollected", (e) => eventos.push(...e.value));
    const fim = new Promise((r) => cdp.once("Tracing.tracingComplete", r));
    await cdp.send("Tracing.start", { categories: extras.categorias ?? CATEGORIAS, transferMode: "ReportEvents" });
    const feito = await { rolagem, menu, navegacao, figura }[gesto](p, cdp, perfil, preparo);
    await esperar(500);
    await cdp.send("Tracing.end");
    await fim;
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
    if (extras.eventos) for (const e of eventos) extras.eventos.push(e);
    return feito && { gesto: feito, ...analisar(eventos) };
  } finally {
    await ctx.close();
  }
}

function veredito(m, perfil) {
  const regua = perfil.porta ? CRITERIO.porta : CRITERIO.aviso;
  const acima = [
    m.emDia != null && m.emDia < regua.emDia && `em dia ${(m.emDia * 100).toFixed(1)}% (< ${regua.emDia * 100}%)`,
    m.p95 != null && m.p95 > regua.p95 && `p95 de ${m.p95} batidas (> ${regua.p95})`,
    m.pior != null && m.pior > regua.pior && `pior de ${m.pior} batidas (> ${regua.pior})`,
  ].filter(Boolean);
  return { acima, resultado: acima.length ? (perfil.porta ? "reprova" : "aviso") : "aprova" };
}

// ——— O autoteste da conta: uma sequência de batidas conhecida ———

function autoteste() {
  const ev = [{ name: "TracingStartedInBrowser", args: { data: { frames: [{ isOutermostMainFrame: true, processId: 1 }] } } }];
  const estados = ["inteiro", "inteiro", "perdido", "perdido", "inteiro", "parcial", "inteiro", "ocioso", "perdido", "ocioso", "inteiro"];
  estados.forEach((s, i) => {
    const base = { pid: 1, ts: i * 16_667, args: { frameSeqId: 100 + i, layerTreeId: 7 } };
    ev.push({ ...base, name: "BeginFrame" });
    if (s === "inteiro" || s === "parcial") ev.push({ ...base, name: "DrawFrame" });
    if (s === "perdido" || s === "parcial") ev.push({ ...base, name: "DroppedFrame", args: { ...base.args, hasPartialUpdate: s === "parcial" } });
  });
  const r = analisar(ev);
  const certo = (a, b, o) => { if (a !== b) throw new Error(`autoteste: ${o}: ${a} ≠ ${b}`); };
  certo(r.quadros.inteiro, 5, "inteiros");
  certo(r.quadros.perdido, 3, "perdidos");
  certo(r.quadros.parcial, 1, "parciais");
  certo(r.pior, 3, "pior (dois perdidos e o inteiro)");
  certo(r.piorDaTela, 3, "pior da tela");
  certo(Math.round(r.vsync * 10) / 10, 16.7, "vsync");
  certo(Math.round(r.emDia * 1000), 556, "em dia (5 de 9)");
  console.log("autoteste: a conta dos quadros confere");
}

// ——— A rodada ———

const direto = import.meta.url === pathToFileURL(process.argv[1] ?? "").href; // importado, só empresta analisar e os gestos
if (!direto) {
  // nada a rodar
} else if (argumentos.includes("--autoteste")) {
  autoteste();
} else {
  const { chromium } = await import("playwright");
  const paginas = varias("pagina").length ? varias("pagina") : PAGINAS_PADRAO;
  const perfis = varias("perfil").length ? varias("perfil") : Object.keys(PERFIS);
  const gestos = varias("gesto").length ? varias("gesto") : GESTOS;
  const carga = () => os.loadavg().map((c) => Math.round(c * 100) / 100);
  const relatorio = {
    quando: new Date().toISOString(),
    base: BASE,
    maquina: { cpu: os.cpus()[0]?.model, nucleos: os.cpus().length, cargaNoInicio: carga() },
    criterio: CRITERIO,
    vezes: VEZES,
    medidas: [],
  };
  const navegador = await chromium.launch({ channel: "chrome" });
  relatorio.maquina.chrome = navegador.version();
  let reprovadas = 0;
  for (const pagina of paginas) {
    for (const nomePerfil of perfis) {
      const perfil = PERFIS[nomePerfil];
      for (const gesto of gestos) {
        const vezes = [];
        for (let v = 0; v < VEZES; v++) {
          const cargaAntes = carga()[0];
          try {
            const m = await medir(navegador, BASE + pagina, perfil, gesto);
            if (!m) break; // o gesto não existe nesta página, neste perfil
            vezes.push({ ...m, cargaAntes });
          } catch (erro) {
            vezes.push({ erro: String(erro.message ?? erro).split("\n")[0], cargaAntes });
          }
        }
        if (!vezes.length) continue;
        const validas = vezes.filter((m) => !m.erro && m.emDia != null);
        const med = {
          emDia: mediana(validas.map((m) => m.emDia)),
          p95: mediana(validas.map((m) => m.p95)),
          pior: mediana(validas.map((m) => m.pior)),
          piorDaTela: mediana(validas.map((m) => m.piorDaTela)),
          ocupacao: mediana(validas.map((m) => m.pesos?.ocupacao)),
          vsync: mediana(validas.map((m) => m.vsync)),
        };
        const v = validas.length ? veredito(med, perfil) : { acima: ["sem medida válida"], resultado: perfil.porta ? "reprova" : "aviso" };
        if (v.resultado === "reprova") reprovadas++;
        // O que pesou: o da vez mediana pelo "em dia".
        const tipica = [...validas].sort((a, b) => a.emDia - b.emDia)[Math.floor((validas.length - 1) / 2)];
        relatorio.medidas.push({ pagina, perfil: nomePerfil, gesto, mediana: med, ...v, vezes: vezes.map(({ pesos, ...m }) => m), pesos: tipica?.pesos ?? null });
        const ms = (b) => (b == null ? "—" : `${(b * (med.vsync ?? 16.7)).toFixed(0)} ms`);
        console.log(
          `${pagina} · ${nomePerfil} · ${gesto}: em dia ${med.emDia == null ? "—" : (med.emDia * 100).toFixed(1) + "%"}; p95 ${ms(med.p95)}; pior ${ms(med.pior)} ` +
            `(tela ${ms(med.piorDaTela)}); linha principal ${med.ocupacao == null ? "—" : Math.round(med.ocupacao * 100) + "%"} — ${v.resultado}` +
            (v.acima.length ? `: ${v.acima.join(", ")}` : "") + (vezes.some((m) => m.erro) ? ` [erro: ${vezes.find((m) => m.erro).erro}]` : ""),
        );
      }
    }
  }
  await navegador.close();
  relatorio.maquina.cargaNoFim = carga();
  await mkdir(".regua", { recursive: true });
  await writeFile(path.join(".regua", "quadros.json"), JSON.stringify(relatorio, null, 2));
  console.log(`\nCarga da máquina (1, 5, 15 min): no início ${relatorio.maquina.cargaNoInicio.join(", ")}; no fim ${relatorio.maquina.cargaNoFim.join(", ")}. Relatório em .regua/quadros.json.`);
  process.exitCode = reprovadas ? 1 : 0;
}

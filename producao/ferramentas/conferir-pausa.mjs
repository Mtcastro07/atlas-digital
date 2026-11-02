#!/usr/bin/env node
// producao/ferramentas/conferir-pausa.mjs — a pausa pausa? (16.10.2026, fechamento com o Impeccable; 11-anti-ia.md, Q15)
// Em cada página, a 1440 e a 390 px: aperta o botão de pausa (o que se chama "Pausar…"; nunca um aria-pressed qualquer), rola a página e lista
// toda animação infinita que continua rodando (document.getAnimations()). O atributo não prova nada: no pet shop e no
// depósito, aria-pressed="true" convivia com a luz e a ficha andando (o atalho `animation` vencia a regra da pausa).
//
// Desde 17/10 ("o Atlas Digital"), também os pixels: o getAnimations() não vê o canvas, o relógio nem o setInterval, e é
// neles que mora o movimento passivo (a Terra que gira, o prazo que conta). Em cada parada da rolagem, duas capturas da
// tela; entre elas, 1 s de relógio de verdade e mais 60 s de relógio adiantado (o clock do Playwright dispara uma vez o
// que estava marcado para o próximo minuto: a sombra pelo Sol, a linha do agora). Com a pausa, 0 pixel muda. O mesmo com
// prefers-reduced-motion, sem botão: cada figura desenha uma vez o estado final. Antes da pausa, a primeira tela em 1 s,
// para provar que a captura vê o movimento; sem botão e com ela mudando, falha (WCAG 2.2.2). Antes de cada captura, o
// que é finito termina: as animações do CSS, as imagens e, pelo relógio adiantado, os gestos de uma vez só.
// No next dev, a recompilação (o Fast Refresh) e a recarga que ela pode pedir mudam a página no meio da medida: a linha
// diz "recompilou" e não conta. O "[HMR] connected" de toda carga do dev não é recompilação.
// O relógio adiantado também adianta o performance.now(). Na primeira rodada (17/10), a medição da visita de 16/10, que
// faz a conta uma vez ao entrar na tela, saía com 242,6 s e mudava com a pausa: o avanço vinha antes do
// IntersectionObserver, e a conta caía entre as duas capturas. Por isso a espera de 300 ms depois de cada rolagem.
//
// Até 02.11.2026, ela clicava no primeiro aria-pressed visível: um seletor de plano ou uma tecla de vista, no lugar da pausa,
// e relatava telas que "mudavam com a pausa".
//
// Uso: node producao/ferramentas/conferir-pausa.mjs <base> <caminho>... [--fotos=<pasta>]
//      node producao/ferramentas/conferir-pausa.mjs --autoteste
//   (ex.: http://localhost:3000 / /servicos). Com --fotos, guarda a tela de antes e a de depois de cada mudança, para
//   julgar com os olhos.
// Sai com 1 se alguma página tiver animação infinita rodando, ou pixel mudando, depois da pausa ou com movimento reduzido.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { lerPng } from "../qualidade/regua/png.mjs";

const argumentos = process.argv.slice(2);
const fotos = argumentos.find((a) => a.startsWith("--fotos="))?.slice(8);
const [base, ...caminhos] = argumentos.filter((a) => !a.startsWith("--"));
const nav = await chromium.launch({ channel: "chrome" });
if (argumentos.includes("--autoteste")) await autoteste();
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
let falhas = 0;

// Os pixels que mudam entre duas capturas (a soma dos três canais acima de 24, a régua do esboço) e a caixa deles.
function diferenca(antes, depois) {
  const a = lerPng(antes);
  const b = lerPng(depois);
  let n = 0;
  let [x0, y0, x1, y1] = [Infinity, Infinity, -1, -1];
  for (let i = 0, p = 0; i < a.px.length; i += a.canais, p++) {
    if (Math.abs(a.px[i] - b.px[i]) + Math.abs(a.px[i + 1] - b.px[i + 1]) + Math.abs(a.px[i + 2] - b.px[i + 2]) <= 24) continue;
    n++;
    const x = p % a.largura;
    const y = (p - x) / a.largura;
    [x0, y0, x1, y1] = [Math.min(x0, x), Math.min(y0, y), Math.max(x1, x), Math.max(y1, y)];
  }
  return { n, caixa: n ? [x0, y0, x1 - x0 + 1, y1 - y0 + 1] : null };
}

// O botão de pausa, pelo nome: o que se chama "Pausar…" (à vista, depois o fora da vista: no celular, a pausa pode morar
// no índice fechado; clicado pelo próprio elemento); depois, o de aria-pressed que fala de movimento ("Movimento",
// "Parar animações"). Um aria-pressed de outro assunto (um seletor, uma tecla de vista) não é a pausa.
function apertarPausa() {
  const nome = (b) => (b.getAttribute("aria-label") || b.textContent || "").trim();
  const visivel = (b) => b.getClientRects().length > 0;
  const botoes = [...document.querySelectorAll("button")];
  const chamaPausar = botoes.filter((b) => /^paus/i.test(nome(b)));
  const alvo =
    chamaPausar.find(visivel) ??
    chamaPausar[0] ??
    botoes.find((b) => b.hasAttribute("aria-pressed") && visivel(b) && /\b(pausa|parar|anima|movimento)/i.test(nome(b)));
  if (!alvo) return null;
  alvo.click();
  return nome(alvo).slice(0, 40);
}

async function autoteste() {
  const p = await nav.newPage();
  const casos = [
    ['<button aria-pressed="false">Essencial</button><button>Pausar animações</button>', "Pausar animações"],
    ['<button aria-pressed="true">Vista em peças</button><button aria-pressed="false" style="display:none">Pausar</button>', "Pausar"],
    ['<button aria-pressed="false">Essencial</button><button aria-pressed="false">Parar animações</button>', "Parar animações"],
    ['<button aria-pressed="false"><span>Pausar animações</span></button>', "Pausar animações"],
    ['<button aria-pressed="false">Essencial</button>', null],
  ];
  let erros = 0;
  for (const [corpo, espera] of casos) {
    await p.setContent(corpo);
    const deu = await p.evaluate(apertarPausa);
    if (deu !== espera) erros++, console.log(`ERRO: em ${corpo}, esperava ${espera}, deu ${deu}`);
  }
  console.log(erros ? `autoteste: ${erros} erro(s)` : `autoteste: os ${casos.length} casos conferem`);
  await nav.close();
  process.exit(erros ? 1 : 0);
}

const foto = (p) => p.screenshot({ scale: "css" });

// O que é finito termina antes da captura: as animações e transições do CSS e as imagens à vista, carregadas e
// decodificadas (a decodificação assíncrona pinta um quadro depois do complete). Até 3 s.
async function assentar(p) {
  for (let t = 0; t < 3000; t += 150) {
    const ocupado = await p.evaluate(
      () =>
        document.getAnimations().some((a) => a.playState === "running" && a.effect?.getTiming?.().iterations !== Infinity) ||
        [...document.images].some((i) => !i.complete && i.getBoundingClientRect().bottom > 0 && i.getBoundingClientRect().top < innerHeight),
    );
    if (!ocupado) break;
    await esperar(150);
  }
  await p.evaluate(() =>
    Promise.all([...document.images].filter((i) => i.complete && i.getBoundingClientRect().bottom > 0 && i.getBoundingClientRect().top < innerHeight).map((i) => i.decode().catch(() => {}))),
  );
}

const infinitasRodando = () =>
  document
    .getAnimations()
    .filter((a) => a.effect?.getTiming?.().iterations === Infinity && a.playState === "running")
    .map((a) => {
      const el = a.effect.target;
      return `${a.animationName || a.constructor.name} em ${el?.tagName?.toLowerCase()}.${String(el?.className?.baseVal ?? el?.className ?? "").split(" ").slice(0, 2).join(".")}`;
    });

// O elemento no centro da caixa que mudou, para achar a peça.
const quem = (p, [x, y, l, a]) =>
  p.evaluate(([cx, cy]) => {
    const el = document.elementFromPoint(cx, cy);
    return el ? `${el.tagName.toLowerCase()}.${String(el.className?.baseVal ?? el.className ?? "").split(" ").filter(Boolean).slice(0, 2).join(".")}` : "?";
  }, [x + l / 2, y + a / 2]);

async function medir(caminho, largura, reduzido) {
  const altura = largura < 1024 ? 844 : 900;
  const ctx = await nav.newContext({ viewport: { width: largura, height: altura }, isMobile: largura < 1024, hasTouch: largura < 1024, reducedMotion: reduzido ? "reduce" : "no-preference" });
  const p = await ctx.newPage();
  await p.clock.install();
  const r = { recompilou: false, mudancas: [], infinitas: new Set(), telas: 0 };
  p.on("console", (m) => {
    if (/\[Fast Refresh\]/.test(m.text())) r.recompilou = true;
  });
  await p.goto(base + caminho, { waitUntil: "networkidle" });
  // O indicador do next dev muda sozinho; na produção, não existe.
  await p.evaluate(() => {
    const estilo = document.createElement("style");
    estilo.textContent = "nextjs-portal { display: none !important; }";
    document.head.append(estilo);
    return document.fonts.ready.then(() => true);
  });
  await esperar(1200);
  await assentar(p);
  if (!reduzido) {
    const a = await foto(p);
    await esperar(1000);
    r.semPausa = diferenca(a, await foto(p)).n;
    r.botao = await p.evaluate(apertarPausa);
    if (!r.botao) return ctx.close().then(() => r);
    await esperar(600);
  }
  // Rola a página inteira (a cada 80% da altura): o que só anda à vista também entra.
  for (let y = 0, fim = false; !fim; y += Math.round(altura * 0.8)) {
    const maximo = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    if (y >= maximo) [y, fim] = [Math.max(0, maximo), true];
    await p.evaluate((topo) => scrollTo({ top: topo, behavior: "instant" }), y);
    // O que a entrada na tela agenda (o IntersectionObserver chama no quadro seguinte) entra antes do avanço do relógio.
    await esperar(300);
    await assentar(p);
    await p.clock.fastForward(60_000);
    await esperar(400);
    await assentar(p);
    for (const a of await p.evaluate(infinitasRodando)) r.infinitas.add(a);
    const antes = await foto(p);
    await p.clock.fastForward(60_000);
    await esperar(1000);
    const depois = await foto(p);
    const d = diferenca(antes, depois);
    r.telas++;
    if (d.n && fotos) {
      const nome = `${fotos}/${caminho.replace(/\W+/g, "_").replace(/^_|_$/g, "") || "inicio"}-${largura}-${reduzido ? "reduzido" : "pausa"}-y${y}`;
      writeFileSync(`${nome}-antes.png`, antes);
      writeFileSync(`${nome}-depois.png`, depois);
    }
    if (d.n) r.mudancas.push(`em y = ${y}, ${d.n} px na caixa ${d.caixa[2]}×${d.caixa[3]} em ${d.caixa[0]},${d.caixa[1]} (${await quem(p, d.caixa)})`);
  }
  await ctx.close();
  return r;
}

for (const caminho of caminhos) {
  for (const largura of [1440, 390]) {
    // A recarga do dev destrói a página no meio da medida: a linha diz o erro e "recompilou", e não conta.
    const falhou = (e) => ({ recompilou: true, erro: e.message.split("\n")[0], mudancas: [], infinitas: new Set(), telas: 0, botao: "?" });
    const [pausa, reduzido] = await Promise.all([medir(caminho, largura, false).catch(falhou), medir(caminho, largura, true).catch(falhou)]);
    const relato = (r) =>
      `${r.mudancas.length ? `${r.mudancas.length} de ${r.telas} telas mudam: ${r.mudancas.join("; ")}` : `0 px em ${r.telas} telas`}` +
      `; infinitas rodando: ${r.infinitas.size ? [...r.infinitas].join(" | ") : "nenhuma"}${r.recompilou ? ` (recompilou durante a medida${r.erro ? `: ${r.erro}` : ""}; repita)` : ""}`;
    const reprova = (r) => !r.recompilou && (r.infinitas.size > 0 || r.mudancas.length > 0);
    if (!pausa.botao) {
      const falha = pausa.semPausa > 0 && !pausa.recompilou;
      if (falha) falhas++;
      console.log(`${caminho} @${largura}: sem botão de pausa; a primeira tela muda ${pausa.semPausa} px em 1 s${falha ? " (FALHA: movimento sem pausa)" : ""}`);
    } else {
      if (reprova(pausa)) falhas++;
      console.log(`${caminho} @${largura}: pausa ("${pausa.botao}"); sem ela, a primeira tela muda ${pausa.semPausa} px em 1 s; com ela, ${relato(pausa)}${reprova(pausa) ? " (FALHA)" : ""}`);
    }
    if (reprova(reduzido)) falhas++;
    console.log(`${caminho} @${largura}: movimento reduzido, ${relato(reduzido)}${reprova(reduzido) ? " (FALHA)" : ""}`);
  }
}
await nav.close();
process.exitCode = falhas ? 1 : 0;

// O custo de uma página com a CPU 4× mais lenta (desde 17/10, "o Atlas Digital"; DIRECAO-DIGITAL.md, seção 5): o
// ferr/custo.mjs do esboço final, que foi a porta de cada figura, levado a uma URL do site. No celular (390 × 844,
// toque, densidade 2) e na mesa (1440 × 900): a maior tarefa e o bloqueio somado na carga (as tarefas acima de 50 ms,
// até 3 s depois do load, quando entram os pedaços do import()), a linha principal ocupada parada no topo por 5 s (o
// laço da Terra, o relógio do prazo: o TaskDuration do Chrome sobre o tempo) e os quadros acima de 100 ms numa rolagem
// de 120 px a cada 50 ms. A barreira do travamento é a da régua (1 s de tarefa, 3 s de bloqueio, 10% de quadros
// lentos; 02-regua.md, seção 6) e reprova; a meta do passe 1 da direção, 6% de linha ocupada parada na mesa, só se
// aponta. A medida é indicativa: no next dev o React vem sem minificar, e a máquina é dividida com outros processos.
//
// Uso, da raiz: node ferramentas/custo.mjs [url]...   (padrão: http://localhost:3000/)
//   ex.: node ferramentas/custo.mjs "http://localhost:3300/?agora=2026-10-17T17:50-03:00" http://localhost:3300/planos
// Sai com 1 se alguma medida passar da barreira.
import { chromium } from "playwright";

const urls = process.argv.slice(2).length ? process.argv.slice(2) : ["http://localhost:3000/"];
const BARREIRA = { tarefa: 1000, bloqueio: 3000, quadrosLentos: 0.1 };
const META_PARADA_NA_MESA = 0.06;
const APARELHOS = [
  ["celular", { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
  ["mesa", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
];

const navegador = await chromium.launch({ channel: "chrome" });
let reprovadas = 0;
for (const url of urls) {
  for (const [nome, opcoes] of APARELHOS) {
    const ctx = await navegador.newContext(opcoes);
    const p = await ctx.newPage();
    const cdp = await ctx.newCDPSession(p);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await p.addInitScript(() => {
      window.__tarefas = [];
      new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__tarefas.push(e.duration))).observe({ type: "longtask", buffered: true });
    });
    await p.goto(url, { waitUntil: "load", timeout: 120_000 });
    await p.waitForTimeout(3000);
    const carga = await p.evaluate(() => ({ maior: Math.max(0, ...window.__tarefas), bloqueio: window.__tarefas.reduce((s, d) => s + Math.max(0, d - 50), 0) }));
    // Parada no topo: a fração do tempo em tarefas, por 5 s.
    await cdp.send("Performance.enable");
    const metricas = async () => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((m) => [m.name, m.value]));
    const m0 = await metricas();
    await p.waitForTimeout(5000);
    const m1 = await metricas();
    const parada = (m1.TaskDuration - m0.TaskDuration) / (m1.Timestamp - m0.Timestamp);
    // A rolagem: os quadros acima de 100 ms.
    const rolagem = await p.evaluate(async () => {
      const quadros = [];
      let anterior = performance.now();
      let fim = false;
      const laco = (t) => {
        quadros.push(t - anterior);
        anterior = t;
        if (!fim) requestAnimationFrame(laco);
      };
      requestAnimationFrame(laco);
      const alto = document.documentElement.scrollHeight - innerHeight;
      for (let y = 0; y <= alto; y += 120) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 50));
      }
      fim = true;
      return { n: quadros.length, lentos: quadros.filter((q) => q > 100).length };
    });
    const acima = [
      carga.maior > BARREIRA.tarefa && "a maior tarefa (barreira: 1 s)",
      carga.bloqueio > BARREIRA.bloqueio && "o bloqueio somado (barreira: 3 s)",
      rolagem.lentos / Math.max(1, rolagem.n) > BARREIRA.quadrosLentos && "os quadros lentos (barreira: 10%)",
    ].filter(Boolean);
    if (acima.length) reprovadas++;
    const meta = nome === "mesa" && parada > META_PARADA_NA_MESA ? " (acima da meta de 6% na mesa)" : "";
    console.log(
      `${url} · ${nome}: maior tarefa ${carga.maior.toFixed(0)} ms; bloqueio ${carga.bloqueio.toFixed(0)} ms; ` +
        `linha principal ocupada parada ${(parada * 100).toFixed(1)}%${meta}; quadros > 100 ms ao rolar ${rolagem.lentos} de ${rolagem.n}` +
        (acima.length ? `; PASSA DA BARREIRA: ${acima.join(", ")}` : ""),
    );
    await ctx.close();
  }
}
await navegador.close();
process.exitCode = reprovadas ? 1 : 0;

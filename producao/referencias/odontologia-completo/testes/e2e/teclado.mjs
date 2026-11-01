// testes/e2e/teclado.mjs — o roteiro de teclado (producao/qualidade/06-acessibilidade.md, seção 4), na mesa e no celular, contra o
// build servido: a primeira parada é "Ir para o conteúdo" (visível, e Enter leva o foco ao main); a ordem segue a leitura;
// nada invisível recebe foco; o foco não fica encoberto pelo cabeçalho fixo (WCAG 2.4.11), indo e voltando; nenhuma armadilha.
// Uso: node testes/e2e/teclado.mjs [--base=http://localhost:3100]
import { chromium } from "playwright";

const BASE = (process.argv.find((a) => a.startsWith("--base="))?.slice(7) ?? "http://localhost:3100").replace(/\/$/, "");
const navegador = await chromium.launch({ channel: "chrome" });
let falhas = 0;
const PAGINAS = ["/", "/tratamentos/", "/tratamentos/canal/", "/avaliacao/", "/guias/"];

/** A rolagem das âncoras e do foco é suave: mede-se só depois de ela parar (a posição igual em quatro quadros seguidos). */
const assentar = (p) =>
  p.evaluate(
    () =>
      new Promise((resolver) => {
        let anterior = -1;
        let iguais = 0;
        const quadro = () => {
          iguais = scrollY === anterior ? iguais + 1 : 0;
          anterior = scrollY;
          if (iguais >= 4) resolver(true);
          else requestAnimationFrame(quadro);
        };
        requestAnimationFrame(quadro);
      }),
  );

async function parada(p) {
  await assentar(p);
  await p.waitForTimeout(60);
  return p.evaluate(() => {
    const e = document.activeElement;
    if (!e || e === document.body) return null;
    const r = e.getBoundingClientRect();
    const s = getComputedStyle(e);
    const cx = Math.min(Math.max(r.left + r.width / 2, 0), innerWidth - 1);
    const cy = Math.min(Math.max(r.top + Math.min(r.height / 2, 12), 0), innerHeight - 1);
    const topo = document.elementFromPoint(cx, cy);
    const nome = (e.getAttribute("aria-label") || e.textContent || e.getAttribute("value") || e.id || e.tagName).trim().replace(/\s+/g, " ").slice(0, 48);
    return {
      etiqueta: e.tagName.toLowerCase(),
      nome,
      visivel: r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none",
      noRodape: !!e.closest("footer"),
      noRadioSrOnly: e.matches("input[type=radio].sr-only"), // o rádio só para leitor: o rótulo ao lado leva o foco visível
      coberto: !(topo === e || e.contains(topo) || topo?.closest("label")?.contains(e) || e.closest("label")?.contains(topo)),
      sobOCabecalho: r.top < 64 && r.bottom > 0 && !!document.querySelector("header") && r.top < document.querySelector("header").getBoundingClientRect().bottom - 1,
    };
  });
}

for (const [rotulo, opcoes] of [
  ["mesa", { viewport: { width: 1440, height: 900 } }],
  ["celular", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }],
]) {
  for (const caminho of PAGINAS) {
    const c = await navegador.newContext({ locale: "pt-BR", ...opcoes });
    const p = await c.newPage();
    await p.goto(BASE + caminho);
    await p.waitForTimeout(300);
    const problemas = [];
    // 1. A primeira parada: "Ir para o conteúdo", visível; Enter leva o foco ao main.
    await p.keyboard.press("Tab");
    await p.waitForTimeout(450); // a passagem do vínculo dura 300 ms
    const primeira = await parada(p);
    if (!primeira || !/Ir para o conteúdo/.test(primeira.nome) || !primeira.visivel || primeira.coberto) problemas.push(`primeira parada: ${JSON.stringify(primeira)}`);
    const visivelAoFocar = await p.evaluate(() => {
      const r = document.activeElement.getBoundingClientRect();
      return r.top >= 0 && r.bottom <= innerHeight && r.left >= 0;
    });
    if (!visivelAoFocar) problemas.push("o vínculo 'Ir para o conteúdo' não aparece quando focado");
    await p.keyboard.press("Enter");
    if (!(await p.evaluate(() => document.activeElement?.id === "conteudo"))) problemas.push("Enter em 'Ir para o conteúdo' não levou o foco ao main");
    // 2. Tab até o fim: nada invisível, nada coberto pelo cabeçalho; sem armadilha (o foco sai do main e chega ao rodapé).
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.keyboard.press("Tab"); // volta a contar do começo: o foco segue do main
    const ida = [];
    for (let i = 0; i < 90; i++) {
      await p.keyboard.press("Tab");
      const e = await parada(p);
      if (!e) break;
      ida.push(e);
      if (!e.visivel && !e.noRadioSrOnly) problemas.push(`foco em elemento invisível: ${e.etiqueta} "${e.nome}"`);
      if (e.coberto && !e.noRadioSrOnly) problemas.push(`foco encoberto: ${e.etiqueta} "${e.nome}"`);
    }
    if (!ida.at(-1)?.noRodape) problemas.push(`a última parada não está no rodapé (${ida.length} paradas): armadilha, ou parada demais`);
    // 3. Shift+Tab: o caminho de volta, sem o cabeçalho cobrir o elemento focado.
    for (let i = 0; i < Math.min(ida.length, 60); i++) {
      await p.keyboard.press("Shift+Tab");
      const e = await parada(p);
      if (!e) break;
      if ((e.coberto || e.sobOCabecalho) && !e.noRadioSrOnly) problemas.push(`na volta, o foco fica sob o cabeçalho: ${e.etiqueta} "${e.nome}"`);
    }
    console.log(`${problemas.length ? "  FALHA" : "  ok   "}  ${rotulo.padEnd(7)} ${caminho.padEnd(22)} ${ida.length} paradas${problemas.length ? "\n           " + [...new Set(problemas)].slice(0, 5).join("\n           ") : ""}`);
    if (problemas.length) falhas++;
    await c.close();
  }
}
await navegador.close();
console.log(`\n${falhas ? "REPROVA" : "APROVA"} · ${falhas} página(s) com problema`);
process.exit(falhas ? 1 : 0);

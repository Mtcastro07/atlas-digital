// A metade, medida (desde 17/10, "o Atlas Digital"; DIRECAO-DIGITAL.md, seção 5): a área de tela e de instrumento
// (.vd-tela, .vd-tela-sangra-direita, .vd-tela-sangra-esquerda, .vd-instrumento) sobre a área da página, por página, a
// 1440 e a 390. É o critério objetivo de aceite do pedido ("metade da identificação, não apenas detalhes"): de 40 a 60%
// na mesa e de 35 a 60% a 390. Conta só a peça de fora (a tela não vai dentro de outra, e a que fosse não somaria duas
// vezes) e deixa de fora a tela do aparelho (.vd-celular > .vd-tela, que tem o mesmo nome e não é a janela do
// sistema). A tela que sangra conta até a borda da página. Diz também a fração da primeira tela, a da primeira
// impressão. Com movimento reduzido, para cada peça estar na posição final; rola a página antes, para as ilhas que
// carregam ao entrar na tela ocuparem o lugar delas.
//
// Uso, da raiz: node ferramentas/regua/medir-metade.mjs [base] [caminho]...
//   (padrão: http://localhost:3000 e as sete páginas do Atlas). Sai com 1 se alguma página ficar fora da faixa.
import { chromium } from "playwright";

const [base = "http://localhost:3000", ...pedidos] = process.argv.slice(2);
const caminhos = pedidos.length ? pedidos : ["/", "/para-quem", "/planos", "/orcamento", "/o-trabalho", "/o-atlas", "/duvidas"];
const FAIXA = { 1440: [40, 60], 390: [35, 60] };
const SELETOR = ":is(.vd-tela, .vd-tela-sangra-direita, .vd-tela-sangra-esquerda):not(.vd-celular > *), .vd-instrumento";

function medir(seletor) {
  const raiz = document.documentElement;
  const [largura, altura] = [raiz.scrollWidth, raiz.scrollHeight];
  const pecas = [...document.querySelectorAll(seletor)].filter((el) => !el.parentElement.closest(seletor));
  let [area, primeira] = [0, 0];
  const lista = pecas.map((el) => {
    const r = el.getBoundingClientRect();
    const [x0, x1] = [Math.max(0, r.left + scrollX), Math.min(largura, r.right + scrollX)];
    const [y0, y1] = [Math.max(0, r.top + scrollY), Math.min(altura, r.bottom + scrollY)];
    const a = Math.max(0, x1 - x0) * Math.max(0, y1 - y0);
    area += a;
    primeira += Math.max(0, x1 - x0) * Math.max(0, Math.min(innerHeight, y1) - y0);
    return `${el.tagName.toLowerCase()}.${[...el.classList].filter((c) => c.startsWith("vd-")).join(".")} ${Math.round(x1 - x0)}×${Math.round(y1 - y0)}`;
  });
  return { pagina: (area / (largura * altura)) * 100, primeira: (primeira / (raiz.clientWidth * innerHeight)) * 100, lista };
}

const navegador = await chromium.launch({ channel: "chrome" });
let fora = 0;
for (const caminho of caminhos) {
  for (const largura of [1440, 390]) {
    const altura = largura < 1024 ? 844 : 900;
    const ctx = await navegador.newContext({ viewport: { width: largura, height: altura }, isMobile: largura < 1024, hasTouch: largura < 1024, reducedMotion: "reduce" });
    const p = await ctx.newPage();
    await p.goto(base + caminho, { waitUntil: "load" });
    for (let y = 0; y < (await p.evaluate(() => document.documentElement.scrollHeight)); y += altura) {
      await p.evaluate((topo) => scrollTo({ top: topo, behavior: "instant" }), y);
      await p.waitForTimeout(150);
    }
    await p.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await p.waitForTimeout(400);
    const m = await p.evaluate(medir, SELETOR);
    const [min, max] = FAIXA[largura];
    const dentro = m.pagina >= min && m.pagina <= max;
    if (!dentro) fora++;
    console.log(
      `${caminho} @${largura}: ${m.pagina.toFixed(1)}% da página em tela e instrumento (faixa ${min} a ${max}%${dentro ? "" : ", FORA"}); ` +
        `primeira tela ${m.primeira.toFixed(0)}%; ${m.lista.length ? m.lista.join(", ") : "nenhuma peça"}`,
    );
    await ctx.close();
  }
}
await navegador.close();
process.exitCode = fora ? 1 : 0;

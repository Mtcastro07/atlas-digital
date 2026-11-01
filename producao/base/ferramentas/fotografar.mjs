// ferramentas/fotografar.mjs — fotografa as páginas do site servido, inteiras, a 390 e a 1440 px, com
// movimento reduzido (ou o normal, com --movimento): as capturas da aprovação da identidade e da avaliação anti-IA (producao/esteira/11-anti-ia.md;
// producao/qualidade/11-design-e-anti-ia.md). Descobre as páginas pelos vínculos internos, a partir do início, e
// acrescenta uma 404. Usa o Chrome instalado, pelo Playwright da régua.
//
// Uso (na raiz do site, com o site servido: npm run estatico, ou PORT=3100 npm run servidor):
//   node ferramentas/fotografar.mjs [--base=http://localhost:3100] [--pasta=material/capturas] [--movimento] [--sem-pele] [--pagina=/servicos]
// --movimento: com o movimento normal, como pede o passo 1 da avaliação anti-IA. Antes da foto, a página é rolada até
//   o fim e de volta, para as revelações entrarem; sem isso, a foto da página inteira as pegaria escondidas.
// --sem-pele: o teste da troca de pele (producao/esteira/19-o-padrao-atlas.md, seção 3). As fontes viram a do sistema,
//   as cores viram tinta escura sobre branco, e saem os fundos de cor e de textura; ficam a composição, as imagens e os
//   objetos. Se o que sobra é a página da base, o site tinha pele, e não mundo.
// --pagina: só estas páginas (repita a opção). Aceita caminho do site ou endereço inteiro, inclusive file://, para os
//   painéis de estilo da direção de arte (material/paineis/<letra>.html; producao/esteira/04-direcao-de-arte.md).
// Saída: <pasta>/<página>-390.png e <página>-1440.png. A pasta material/ fica fora do git.
import { mkdirSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const argumentos = process.argv.slice(2);
const opcao = (nome) => argumentos.find((a) => a.startsWith(`--${nome}=`))?.slice(nome.length + 3);
const BASE = (opcao("base") ?? "http://localhost:3100").replace(/\/$/, "");
const PASTA = opcao("pasta") ?? "material/capturas";
const MOVIMENTO = argumentos.includes("--movimento");
const SEM_PELE = argumentos.includes("--sem-pele");
const PELE_NEUTRA = `*, *::before, *::after { font-family: system-ui, sans-serif !important; color: #222 !important;
  -webkit-text-fill-color: currentColor !important; background-color: transparent !important; background-image: none !important;
  border-color: #bbb !important; text-shadow: none !important; box-shadow: none !important; filter: none !important; }
  html, body { background: #fff !important; }`;
const SO_ESTAS = argumentos.filter((a) => a.startsWith("--pagina=")).map((a) => a.slice(9));
mkdirSync(PASTA, { recursive: true });

// As páginas: os vínculos internos a partir do início (como a régua), e uma 404 de propósito.
const achadas = new Set(SO_ESTAS.length ? SO_ESTAS : ["/"]);
const fila = SO_ESTAS.length ? [] : ["/"];
while (fila.length) {
  const html = await fetch(BASE + fila.shift()).then((r) => r.text()).catch(() => "");
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const caminho = href.replace(/\/$/, "") || "/";
    if (/\.[a-z0-9]+$/i.test(caminho) || caminho.startsWith("/_next")) continue;
    if (!achadas.has(caminho)) {
      achadas.add(caminho);
      fila.push(caminho);
    }
  }
}
const paginas = SO_ESTAS.length ? [...achadas] : [...achadas, "/pagina-que-nao-existe"];
const endereco = (caminho) => (/^[a-z]+:/i.test(caminho) ? caminho : BASE + caminho);
const nomeDe = (caminho) => (/^[a-z]+:/i.test(caminho) ? path.basename(new URL(caminho).pathname).replace(/\.html?$/, "") : caminho.replace(/^\/|\/$/g, "").replace(/\//g, "--") || "inicio");

const navegador = await chromium.launch({ channel: "chrome" });
try {
  for (const [largura, altura, celular] of [
    [390, 844, true],
    [1440, 900, false],
  ]) {
    const contexto = await navegador.newContext({ viewport: { width: largura, height: altura }, isMobile: celular, hasTouch: celular, reducedMotion: MOVIMENTO ? "no-preference" : "reduce" });
    const pagina = await contexto.newPage();
    for (const caminho of paginas) {
      await pagina.goto(endereco(caminho), { waitUntil: "load" });
      await pagina.evaluate(() => document.fonts.ready);
      if (SEM_PELE) await pagina.addStyleTag({ content: PELE_NEUTRA });
      if (MOVIMENTO) {
        // As revelações entram ao aparecer na tela: rola até o fim, aos poucos, e volta ao topo.
        await pagina.evaluate(async () => {
          for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.6) {
            scrollTo({ top: y, behavior: "instant" });
            await new Promise((r) => setTimeout(r, 120));
          }
          scrollTo({ top: 0, behavior: "instant" });
        });
        await pagina.waitForTimeout(700);
      }
      await pagina.waitForTimeout(300);
      const nome = `${nomeDe(caminho)}${MOVIMENTO ? "-movimento" : ""}${SEM_PELE ? "-sem-pele" : ""}-${largura}.png`;
      await pagina.screenshot({ path: path.join(PASTA, nome), fullPage: true });
    }
    await contexto.close();
  }
} finally {
  await navegador.close();
}
console.log(`${paginas.length} página(s) × 2 larguras em ${PASTA}/`);

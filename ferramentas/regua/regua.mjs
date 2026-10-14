// A régua do web/: a verificação que toda página passa antes de publicar —
// o site do Atlas, os sites de exemplo e, depois, os sites de cliente.
// Mede o que o navegador desenha, no Chrome instalado na máquina, contra o
// site compilado (`npm run build && npm start`), nunca contra o `next dev`.
//
// Falha é defeito: reprova a página e a régua sai com código 1. Aviso é
// medida para olhar — pode ter motivo, e quem decide é quem revisa. Uma
// porta que acusa o que não é defeito ensina a ignorar portas: o que é
// heurística fica em aviso.
//
// Uso (dentro de web/):
//   npm run build && npm start          # num terminal (porta 3000)
//   npm run regua                       # noutro
// Opções:
//   --base=http://localhost:3100        outro endereço
//   --pagina=/planos                    só esta página (repita para mais de uma)
//   --rapida                            sem contraste e sem teclado (os blocos lentos)
//   --paralelo=3                        quantas páginas ao mesmo tempo
// Saída: o resumo no terminal e o relatório inteiro em .regua/relatorio.json.
// Os blocos, os limites e o porquê de cada um: README.md desta pasta.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

import { medirContraste } from "./contraste.mjs";
import { algarismos, avaliar, caracteresPorLinha, composicao, conformidade, geometria, inventario, ocultos, presos, registro, semantica } from "./sondas.mjs";
import { percorrerTeclado } from "./teclado.mjs";

const argumentos = process.argv.slice(2);
const opcao = (nome) => argumentos.find((a) => a.startsWith(`--${nome}=`))?.slice(nome.length + 3);
const BASE = (opcao("base") ?? process.env.BASE ?? "http://localhost:3000").replace(/\/$/, "");
const SO_ESTAS = argumentos.filter((a) => a.startsWith("--pagina=")).map((a) => a.slice(9));
const RAPIDA = argumentos.includes("--rapida");
const PARALELO = Number(opcao("paralelo") ?? 3);

// Larguras do bloco 1. Nas de toque (celular e tablet), também os alvos de 44 px.
const LARGURAS_TOQUE = [320, 360, 375, 390, 414, 430, 480, 600, 768, 820, 1024];
const LARGURAS_MESA = [1280, 1440, 1920];

// Bloco 5 · orçamento da carga inicial, em KB transferidos (comprimidos).
// Script: o dos <script> do HTML, sem o polyfill nomodule (o Chrome não o baixa);
// o piso do Next 16 com React 19 é ~131 KB. Fontes: 90 KB no Atlas — as três
// famílias do site de 28/08 (~52 KB: Archivo Black, Archivo e Inter; decisão de
// 05/10, mantida pelo usuário em 08/10) e, em Para quem, as fontes de título dos
// dois nichos da vitrine (~31 KB); com San Francisco e Inter (~23 KB), de 07 a
// 08/10, o teto era 60 KB. Total: tudo o que chega até 2 s depois do load, sem rolar.
// Nos sites de marca (cliente e exemplo), sem teto de peso desde 08.10.2026, à noite (pedido do usuário: "retire
// limites de tamanho, e preze por um site muito bem trabalhado"; de antes, 600 KB de script, 300 de fontes e 5 MB):
// o peso se mede e se relata em r.medidas.carga. O que reprova é a experiência: o CLS, o erro, o pedido externo; a
// carga no celular avisa (producao/esteira/15-desempenho.md, seção 2).
const ORCAMENTOS = {
  atlas: { script: 180, fontes: 90, total: 1500 },
  marca: {},
};
const CLS_MAXIMO = 0.05;
// A barreira do travamento (08.10.2026, à noite; Gabriel Ribeiro Ota Yida: "o tamanho do site não importa, e sim
// só seu design", e só se age quando ele trava até num aparelho médio). O aparelho médio é o do DevTools ("Mid-tier
// mobile", CPU 4×) na rede do perfil de celular do Lighthouse (o "4G lento": 562,5 ms, 1,47 Mbps, 675 kbps). Falha só
// além dela; o resto só se mede. Os limites de Nielsen (1 s interrompe o pensamento, 10 s perde a atenção) e, no
// bloqueio somado, cinco vezes o "ruim" do Lighthouse (600 ms). Na calibração da mesma noite, o pior site do Atlas
// ficou em 190 ms de tarefa, 140 ms de bloqueio, nenhum quadro lento e 2,6 s de LCP (producao/esteira/15-desempenho.md, seção 2).
const REDE_DO_CELULAR = { offline: false, latency: 562.5, downloadThroughput: (1474.56 * 1024) / 8, uploadThroughput: (675 * 1024) / 8 };
const BARREIRA = { tarefa: 1000, bloqueio: 3000, quadrosLentos: 0.1, lcp: 10_000 };
// O celular deitado: a fração da tela que o que fica preso (cabeçalho, atalho) pode cobrir.
const PRESOS_DEITADO = 0.35;
// A capa dos sites de marca tem um momento de exibição: o título com 4 vezes o corpo ou mais, na mesa (a exibição
// serena; a plena pede 5). Aviso desde 08.10.2026, à noite: o exemplo de odontologia saiu com 2,06
// (producao/esteira/05-tipografia.md, seção 6.3; 11-anti-ia.md, P1).
const RAZAO_DA_CAPA = 4;
// Tipografia: o teto de caracteres por linha no texto corrido (producao/esteira/05-tipografia.md, seção 8).
const CARACTERES_POR_LINHA = 80;
// A fonte é a mesma em todas as páginas: os algarismos tabulares se conferem uma vez por rodada.
let algarismosConferidos = false;

const kb = (bytes) => bytes / 1024;
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

// O maior elemento da primeira tela (LCP), para a carga no celular.
function vigiaLcp() {
  window.__reguaLcp = 0;
  window.__reguaTarefas = [];
  new PerformanceObserver((lista) => {
    for (const e of lista.getEntries()) window.__reguaLcp = e.startTime;
  }).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((lista) => {
    for (const e of lista.getEntries()) window.__reguaTarefas.push([e.startTime, e.duration]);
  }).observe({ type: "longtask", buffered: true });
}

// A rolagem da página inteira em 4 s, como um polegar, quadro a quadro: os intervalos entre os quadros.
async function rolarContandoQuadros() {
  const altura = document.documentElement.scrollHeight - innerHeight;
  const tempos = [];
  const inicio = performance.now();
  await new Promise((fim) => {
    const passo = (t) => {
      tempos.push(t);
      const f = Math.min(1, (t - inicio) / 4000);
      scrollTo(0, altura * f);
      if (f < 1) requestAnimationFrame(passo);
      else fim();
    };
    requestAnimationFrame(passo);
  });
  return { inicio, intervalos: tempos.slice(1).map((t, i) => t - tempos[i]) };
}

// Antes de qualquer script da página: as violações da política de conteúdo e os deslocamentos de leiaute.
function vigias() {
  window.__reguaCsp = [];
  document.addEventListener("securitypolicyviolation", (e) => window.__reguaCsp.push(`${e.violatedDirective} ← ${e.blockedURI || "inline"}`));
  window.__reguaCls = 0;
  try {
    new PerformanceObserver((lista) => {
      for (const e of lista.getEntries()) if (!e.hadRecentInput) window.__reguaCls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
  } catch {}
}

// Espera as entradas terminarem (as finitas), até 5 s: o que ainda está invisível depois disso ficou invisível.
async function esperarEntradas(pagina) {
  const terminadas = pagina.evaluate(() =>
    Promise.all(document.getAnimations().filter((a) => a.effect?.getTiming().iterations !== Infinity).map((a) => a.finished.catch(() => null))),
  );
  await Promise.race([terminadas.catch(() => null), esperar(5000)]);
}

async function rolarAteOFim(pagina) {
  await pagina.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += Math.round(innerHeight * 0.7)) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await pagina.waitForTimeout(400);
}

async function descobrirPaginas() {
  if (SO_ESTAS.length) return SO_ESTAS;
  const achadas = new Set(["/"]);
  const mapa = await fetch(`${BASE}/sitemap.xml`).then((r) => r.text()).catch(() => "");
  for (const [, url] of mapa.matchAll(/<loc>([^<]+)<\/loc>/g)) achadas.add(new URL(url).pathname.replace(/\/$/, "") || "/");
  // Os sites de exemplo ficam fora do mapa (noindex): segue os vínculos internos do HTML.
  const fila = [...achadas];
  while (fila.length) {
    const html = await fetch(BASE + fila.shift()).then((r) => r.text()).catch(() => "");
    for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
      const caminho = href.replace(/\/$/, "") || "/";
      if (/\.[a-z0-9]+$/i.test(caminho) || caminho.startsWith("/_next") || caminho.startsWith("/ferramentas")) continue;
      if (!achadas.has(caminho)) {
        achadas.add(caminho);
        fila.push(caminho);
      }
    }
  }
  return [...achadas].sort((a, b) => a.split("/").length - b.split("/").length || a.localeCompare(b));
}

async function verificar(navegador, caminho) {
  const r = { caminho, falhas: [], avisos: [], medidas: {} };
  const falha = (bloco, texto) => r.falhas.push(`${bloco} · ${texto}`);
  const aviso = (bloco, texto) => r.avisos.push(`${bloco} · ${texto}`);
  const site = caminho.startsWith("/demos/") ? "marca" : "atlas";
  const host = new URL(BASE).host;
  const quebrados = new Map(); // o rótulo partido → a primeira largura em que partiu

  // 1. A carga, na mesa, com o movimento normal: orçamento, erros, privacidade, semântica, texto.
  {
    const contexto = await navegador.newContext({ viewport: { width: 1440, height: 900 } });
    await contexto.addInitScript(vigias);
    const pagina = await contexto.newPage();
    const rede = [];
    const erros = [];
    let fimDaCarga = Infinity;
    pagina.on("pageerror", (e) => erros.push(String(e.message ?? e).slice(0, 160)));
    pagina.on("console", (m) => m.type() === "error" && erros.push(`console: ${m.text().slice(0, 160)}`));
    pagina.on("requestfinished", async (pedido) => {
      const resposta = await pedido.response();
      const tamanhos = await pedido.sizes().catch(() => null);
      rede.push({ url: pedido.url(), tipo: pedido.resourceType(), bytes: tamanhos?.responseBodySize ?? 0, status: resposta?.status() ?? 0, inicial: Date.now() <= fimDaCarga });
    });
    // O HEAD que o Next 16 manda a cada vínculo no export estático (a conferência de redirecionamento antes
    // da pré-busca: next/dist/client/components/segment-cache/cache.js) chega ao Playwright como
    // ERR_ABORTED, embora responda 200 na página: não é pedido falho (producao/qualidade/02-regua.md, seção 6, n.º 12).
    pagina.on("requestfailed", (pedido) => {
      const erro = pedido.failure()?.errorText ?? "falhou";
      if (pedido.method() === "HEAD" && erro === "net::ERR_ABORTED") return;
      rede.push({ url: pedido.url(), tipo: pedido.resourceType(), erro });
    });

    const resposta = await pagina.goto(BASE + caminho, { waitUntil: "load" });
    if (resposta?.status() !== 200) falha("semântica", `a página respondeu ${resposta?.status()}`);
    const html = (await resposta?.text()) ?? "";
    await pagina.waitForTimeout(2000);
    fimDaCarga = Date.now();
    const clsDaCarga = await pagina.evaluate(() => window.__reguaCls);
    await rolarAteOFim(pagina);
    await pagina.waitForTimeout(500);

    // Bloco 5 · orçamento.
    const scriptsDoHtml = new Set(
      [...html.matchAll(/<script(?![^>]*\bnomodule\b)[^>]*\bsrc="([^"]+)"/g)].map(([, src]) => new URL(src.replaceAll("&amp;", "&"), BASE + caminho).href),
    );
    const iniciais = rede.filter((p) => p.inicial && p.bytes);
    const soma = (lista) => kb(lista.reduce((t, p) => t + p.bytes, 0));
    const medida = {
      script: soma(rede.filter((p) => scriptsDoHtml.has(p.url))),
      fontes: soma(iniciais.filter((p) => p.tipo === "font")),
      total: soma(iniciais),
    };
    r.medidas.carga = { ...Object.fromEntries(Object.entries(medida).map(([k, v]) => [k, +v.toFixed(1)])), cls: +clsDaCarga.toFixed(3) };
    for (const [item, limite] of Object.entries(ORCAMENTOS[site])) {
      if (medida[item] > limite) falha("orçamento", `${item} ${medida[item].toFixed(1)} KB (teto ${limite} KB)`);
    }
    if (clsDaCarga > CLS_MAXIMO) falha("orçamento", `CLS ${clsDaCarga.toFixed(3)} na carga (teto ${CLS_MAXIMO})`);
    const clsTotal = await pagina.evaluate(() => window.__reguaCls);
    if (clsTotal - clsDaCarga > CLS_MAXIMO) aviso("orçamento", `CLS ${(clsTotal - clsDaCarga).toFixed(3)} ao rolar`);
    const externos = [...new Set(rede.filter((p) => /^https?:/.test(p.url) && new URL(p.url).host !== host).map((p) => new URL(p.url).host))];
    if (externos.length) falha("orçamento", `pedido externo: ${externos.join(", ")}`);
    for (const p of rede.filter((p) => p.erro || p.status >= 400)) {
      const texto = `${p.erro ?? p.status} em ${p.url.replace(BASE, "")}`;
      if (p.erro === "net::ERR_ABORTED") aviso("orçamento", texto);
      else falha("orçamento", texto);
    }
    for (const e of erros) falha("orçamento", `erro: ${e}`);
    for (const v of await pagina.evaluate(() => window.__reguaCsp)) falha("orçamento", `política de conteúdo: ${v}`);
    // Nada gravado no aparelho (producao/esteira/17-conformidade-e-normas.md, seção 6).
    const gravado = await pagina.evaluate(() => localStorage.length + sessionStorage.length);
    const biscoitos = (await contexto.cookies()).length;
    if (gravado || biscoitos) falha("orçamento", `gravado no aparelho: ${biscoitos} cookie(s), ${gravado} item(ns) de armazenamento`);

    // Bloco 3 · semântica.
    const s = await avaliar(pagina, semantica);
    r.medidas.semantica = { titulo: s.titulo, descricao: s.descricao, h1: s.h1Texto };
    if (s.h1 !== 1) falha("semântica", `${s.h1} h1 (precisa de exatamente um)`);
    else if (!s.h1Igual) falha("semântica", `o h1 lido ("${s.h1Texto}") não é o h1 desenhado`);
    if (!s.idioma.startsWith("pt")) falha("semântica", `lang="${s.idioma}"`);
    for (const [campo, nome] of [["titulo", "<title>"], ["descricao", "meta description"], ["ogTitulo", "og:title"], ["ogDescricao", "og:description"], ["ogImagem", "og:image"]]) {
      if (!s[campo]) falha("semântica", `sem ${nome}`);
    }
    if (s.ogImagem) {
      const imagem = await fetch(BASE + new URL(s.ogImagem, BASE).pathname).catch(() => null);
      if (!imagem?.ok) falha("semântica", `og:image não abre (${imagem?.status ?? "sem resposta"})`);
    }
    if (s.saltos) aviso("semântica", `${s.saltos} salto(s) de nível nos títulos`);
    for (const img of s.imagensSemAlt) falha("semântica", `imagem sem alt: ${img}`);
    for (const id of s.idsRepetidos) falha("semântica", `id repetido: #${id}`);
    for (const id of s.ancorasQuebradas) falha("semântica", `âncora sem destino: #${id}`);
    for (const el of s.semNome) falha("semântica", `controle sem nome acessível: ${el}`);
    for (const el of s.camposSemRotulo) falha("semântica", `campo sem rótulo: ${el}`);

    // Bloco 9 · conformidade.
    const c = await avaliar(pagina, conformidade);
    if (site === "marca") {
      if (!/noindex/.test(s.robots)) falha("conformidade", "site de exemplo sem noindex");
      if (!c.ficcao) falha("conformidade", "site de exemplo sem o selo de ficção");
    }
    for (const t of c.mencoes) aviso("conformidade", `confira (ata, III.2): "${t}"`);
    if (c.coletaSemAviso) falha("conformidade", "formulário que envia dados sem vínculo para o aviso de privacidade");

    // Bloco 10 · registro verbal.
    const v = await avaliar(pagina, registro);
    r.medidas.registro = { periodos: v.periodos, mediana: v.mediana };
    if (v.mediana > 14) aviso("registro", `mediana de ${v.mediana} palavras por período (teto 14)`);
    for (const t of v.longos) aviso("registro", `período com mais de 28 palavras: ${t}`);
    for (const t of v.vedados) aviso("registro", `vocabulário vedado: "${t}"`);

    r.medidas.mesa = await avaliar(pagina, inventario);

    // Tipografia · os algarismos tabulares, uma vez por rodada. Recarrega antes: a fonte "optional" pode ter ficado na
    // reserva na primeira carga, e a medida seria a da fonte do sistema; na segunda, ela vem do cache.
    if (!algarismosConferidos) {
      algarismosConferidos = true;
      await pagina.reload({ waitUntil: "load" });
      await pagina.evaluate(() => document.fonts.ready);
      for (const onde of await avaliar(pagina, algarismos)) aviso("tipografia", `fonte sem algarismos tabulares, usada com tabular-nums (o número não se alinha; producao/esteira/05-tipografia.md): ${onde}`);
    }
    await contexto.close();
  }

  // 2. O celular e o tablet, com movimento reduzido: geometria, alvos, composição, degradação, contraste.
  {
    const contexto = await navegador.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
    const pagina = await contexto.newPage();
    await pagina.goto(BASE + caminho, { waitUntil: "load" });
    await pagina.waitForTimeout(1200);
    const comp = await avaliar(pagina, composicao);
    r.medidas.celular = {
      primeiraAcao: comp.primeiraAcao && +comp.primeiraAcao.toFixed(2),
      acao: comp.nomeDaAcao,
      telas: +comp.telas.toFixed(1),
      razaoDoTitulo: comp.razaoDoTitulo && +comp.razaoDoTitulo.toFixed(2),
    };
    if (comp.primeiraAcao === null || comp.primeiraAcao > 0.6) aviso("composição", `no celular, nenhuma ação até 60% da primeira tela${comp.primeiraAcao ? ` (a primeira termina em ${Math.round(comp.primeiraAcao * 100)}%)` : ""}`);
    if (comp.telas > 16) aviso("composição", `${comp.telas.toFixed(1)} telas de altura no celular (teto 16)`);
    await rolarAteOFim(pagina);
    await esperarEntradas(pagina);
    const reduzido = await avaliar(pagina, ocultos);
    for (const el of reduzido.sumidos) falha("degradação", `invisível com movimento reduzido: ${el}`);
    for (const a of reduzido.infinitas) falha("degradação", `move-se com movimento reduzido: ${a}`);
    const celular = await avaliar(pagina, inventario);
    const faltam = [...new Set(r.medidas.mesa)].filter((t) => !celular.includes(t));
    if (faltam.length) aviso("paridade", `na mesa e não no celular: ${faltam.slice(0, 5).map((t) => `"${t.slice(0, 30)}"`).join(", ")}`);
    delete r.medidas.mesa;
    if (!RAPIDA) {
      const k = await medirContraste(pagina);
      r.medidas.contrasteCelular = { medidos: k.medidos, semMedida: k.semMedida, manuais: k.manuais.length };
      for (const t of k.falhas) falha("contraste", `390 px · ${t}`);
      if (k.manuais.length) aviso("contraste", `conferir à mão (cópia decorativa, degradê ou desenho no fundo do texto): ${k.manuais.slice(0, 4).join("; ")}`);
    }
    for (const largura of LARGURAS_TOQUE) {
      await pagina.setViewportSize({ width: largura, height: largura <= 480 ? 844 : 1024 });
      await pagina.waitForTimeout(250);
      const g = await avaliar(pagina, geometria, true);
      if (g.lateral) falha("geometria", `${largura} px · rolagem lateral de ${g.lateral} px`);
      for (const el of g.escapam) falha("geometria", `${largura} px · sai da tela: ${el}`);
      for (const el of g.pequenos) falha("geometria", `${largura} px · alvo de toque menor que 44 px: ${el}`);
      for (const el of g.quebrados) if (!quebrados.has(el)) quebrados.set(el, largura);
    }
    // O celular deitado (844 × 390; aviso, 08.10.2026): nada a mais que nas larguras de pé, e o que fica preso à tela
    // (cabeçalho, atalho) sem cobrir mais de um terço dela, medido no meio da página.
    await pagina.setViewportSize({ width: 844, height: 390 });
    await pagina.waitForTimeout(250);
    const deitado = await avaliar(pagina, geometria, true);
    if (deitado.lateral) aviso("geometria", `celular deitado (844 × 390) · rolagem lateral de ${deitado.lateral} px`);
    for (const el of deitado.escapam) aviso("geometria", `celular deitado (844 × 390) · sai da tela: ${el}`);
    for (const el of deitado.pequenos) aviso("geometria", `celular deitado (844 × 390) · alvo de toque menor que 44 px: ${el}`);
    await pagina.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight / 2, behavior: "instant" }));
    await pagina.waitForTimeout(400);
    const p = await avaliar(pagina, presos);
    r.medidas.celularDeitado = { cobertoPeloQueFicaPreso: +p.fracao.toFixed(2) };
    if (p.fracao > PRESOS_DEITADO) aviso("composição", `celular deitado (844 × 390) · o que fica preso à tela cobre ${Math.round(p.fracao * 100)}% dela (${p.topo} px no alto, ${p.base} px embaixo; teto ${Math.round(PRESOS_DEITADO * 100)}%)`);
    await contexto.close();
  }

  // 2b. O aparelho médio (CPU 4×, 4G lento): o peso e o LCP, só medidos; a barreira do travamento, na carga e ao rolar.
  {
    const contexto = await navegador.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    await contexto.addInitScript(vigiaLcp);
    const pagina = await contexto.newPage();
    const cdp = await contexto.newCDPSession(pagina);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", REDE_DO_CELULAR);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    let bytes = 0;
    let fim = Infinity;
    pagina.on("requestfinished", async (pedido) => {
      const tamanhos = await pedido.sizes().catch(() => null);
      if (Date.now() <= fim) bytes += tamanhos?.responseBodySize ?? 0;
    });
    await pagina.goto(BASE + caminho, { waitUntil: "load", timeout: 120_000 });
    await pagina.waitForTimeout(3000); // o que se carrega com o navegador ocioso (o 3D) entra na conta
    fim = Date.now();
    const lcp = await pagina.evaluate(() => window.__reguaLcp ?? 0);
    const tarefasDaCarga = await pagina.evaluate(() => window.__reguaTarefas.slice());
    const rolagem = await pagina.evaluate(rolarContandoQuadros);
    const tarefasDaRolagem = (await pagina.evaluate(() => window.__reguaTarefas.slice())).filter(([inicio]) => inicio >= rolagem.inicio);
    const maior = (ts) => Math.round(Math.max(0, ...ts.map(([, d]) => d)));
    const bloqueio = (ts) => Math.round(ts.reduce((soma, [, d]) => soma + Math.max(0, d - 50), 0));
    const lentos = rolagem.intervalos.filter((d) => d > 100).length / Math.max(1, rolagem.intervalos.length);
    const t = { maiorNaCarga: maior(tarefasDaCarga), bloqueioNaCarga: bloqueio(tarefasDaCarga), maiorAoRolar: maior(tarefasDaRolagem), quadrosLentos: +lentos.toFixed(3) };
    r.medidas.cargaCelular = { total: +kb(bytes).toFixed(1), lcp: Math.round(lcp), ...t };
    const s = (ms) => `${(ms / 1000).toFixed(1).replace(".", ",")} s`;
    if (Math.max(t.maiorNaCarga, t.maiorAoRolar) > BARREIRA.tarefa) falha("travamento", `num aparelho médio (CPU 4×), a página trava ${s(Math.max(t.maiorNaCarga, t.maiorAoRolar))} seguidos ${t.maiorAoRolar > t.maiorNaCarga ? "ao rolar" : "na carga"} (barreira: 1 s)`);
    if (t.bloqueioNaCarga > BARREIRA.bloqueio) falha("travamento", `num aparelho médio (CPU 4×), a página fica bloqueada ${s(t.bloqueioNaCarga)} somados na carga (barreira: 3 s)`);
    if (lentos > BARREIRA.quadrosLentos) falha("travamento", `num aparelho médio (CPU 4×), ${Math.round(lentos * 100)}% dos quadros da rolagem passam de 100 ms (barreira: 10%)`);
    if (lcp > BARREIRA.lcp) falha("travamento", `num aparelho médio, no 4G lento, a primeira tela leva ${s(lcp)} para aparecer (barreira: 10 s)`);
    await contexto.close();
  }

  // 3. A mesa, com movimento reduzido: geometria, contraste e teclado.
  {
    const contexto = await navegador.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const pagina = await contexto.newPage();
    await pagina.goto(BASE + caminho, { waitUntil: "load" });
    await pagina.waitForTimeout(1200);
    const comp = await avaliar(pagina, composicao);
    r.medidas.mesa = { primeiraAcao: comp.primeiraAcao && +comp.primeiraAcao.toFixed(2), acao: comp.nomeDaAcao, razaoDoTitulo: comp.razaoDoTitulo && +comp.razaoDoTitulo.toFixed(2) };
    if (comp.primeiraAcao === null) aviso("composição", "na mesa, nenhuma ação na primeira tela");
    const capa = site === "marca" && (caminho === "/" || /^\/demos\/[^/]+\/?$/.test(caminho));
    if (capa && comp.razaoDoTitulo && comp.razaoDoTitulo < RAZAO_DA_CAPA) aviso("composição", `a capa sem momento de exibição: o título tem ${comp.razaoDoTitulo.toFixed(1).replace(".", ",")} vezes o corpo, na mesa (mínimo ${RAZAO_DA_CAPA}; P1, a página chapada)`);
    await rolarAteOFim(pagina);
    for (const largura of LARGURAS_MESA) {
      await pagina.setViewportSize({ width: largura, height: 900 });
      await pagina.waitForTimeout(250);
      const g = await avaliar(pagina, geometria, false);
      if (g.lateral) falha("geometria", `${largura} px · rolagem lateral de ${g.lateral} px`);
      for (const el of g.escapam) falha("geometria", `${largura} px · sai da tela: ${el}`);
      for (const el of g.quebrados) if (!quebrados.has(el)) quebrados.set(el, largura);
    }
    for (const [el, largura] of quebrados) aviso("composição", `${largura} px · rótulo de controle em mais de uma linha: ${el}`);
    await pagina.setViewportSize({ width: 1440, height: 900 });
    await pagina.waitForTimeout(300);
    const linha = await avaliar(pagina, caracteresPorLinha);
    r.medidas.caracteresPorLinha = linha.caracteres;
    if (linha.caracteres > CARACTERES_POR_LINHA) aviso("tipografia", `1440 px · linha de ${linha.caracteres} caracteres (teto ${CARACTERES_POR_LINHA}): ${linha.onde}`);
    if (!RAPIDA) {
      const k = await medirContraste(pagina);
      r.medidas.contrasteMesa = { medidos: k.medidos, semMedida: k.semMedida };
      for (const t of k.falhas) falha("contraste", `1440 px · ${t}`);
      const t = await percorrerTeclado(pagina);
      r.medidas.teclado = { paradas: t.paradas };
      for (const f of t.falhas) falha("teclado", f);
      for (const e of t.encobertos) aviso("teclado", `foco encoberto ao subir com Shift+Tab (falta scroll-padding-top no html): ${e}`);
    }
    await contexto.close();
  }

  // 4. Sem script: todo o conteúdo legível e a navegação alcançável.
  {
    const contexto = await navegador.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
    const pagina = await contexto.newPage();
    await pagina.goto(BASE + caminho, { waitUntil: "load" });
    await esperarEntradas(pagina);
    const semScript = await avaliar(pagina, ocultos);
    if (!semScript.h1Visivel) falha("degradação", "sem script, o h1 não aparece");
    for (const el of semScript.sumidos) falha("degradação", `invisível sem script: ${el}`);
    if (!semScript.vinculosInternos) falha("degradação", "sem script, nenhum vínculo para as outras páginas");
    await contexto.close();
  }

  return r;
}

// Títulos e descrições distintos por página, dentro de cada site (bloco 3).
function repetidosEntrePaginas(resultados) {
  for (const campo of ["titulo", "descricao"]) {
    const vistos = new Map();
    for (const r of resultados) {
      const valor = r.medidas.semantica?.[campo];
      if (!valor) continue;
      const chave = `${r.caminho.split("/").slice(0, 3).join("/")}|${valor}`;
      if (vistos.has(chave)) r.falhas.push(`semântica · ${campo === "titulo" ? "<title>" : "meta description"} igual ao de ${vistos.get(chave)}`);
      else vistos.set(chave, r.caminho);
    }
  }
}

const inicio = Date.now();
const paginas = await descobrirPaginas();
const navegador = await chromium.launch({ channel: "chrome", headless: true });
console.log(`Régua · ${BASE} · ${paginas.length} página(s)${RAPIDA ? " · rápida (sem contraste e sem teclado)" : ""}\n`);

const resultados = [];
const fila = [...paginas];
await Promise.all(
  Array.from({ length: Math.min(PARALELO, fila.length) }, async () => {
    while (fila.length) {
      const caminho = fila.shift();
      try {
        resultados.push(await verificar(navegador, caminho));
      } catch (erro) {
        resultados.push({ caminho, falhas: [`régua · não terminou: ${String(erro.message ?? erro).split("\n")[0]}`], avisos: [], medidas: {} });
      }
      const r = resultados.at(-1);
      console.log(`${r.falhas.length ? "✗" : "✓"} ${r.caminho.padEnd(32)} ${r.falhas.length} falha(s) · ${r.avisos.length} aviso(s)`);
    }
  }),
);
await navegador.close();

resultados.sort((a, b) => paginas.indexOf(a.caminho) - paginas.indexOf(b.caminho));
repetidosEntrePaginas(resultados);
for (const titulo of ["Falhas", "Avisos"]) {
  const campo = titulo === "Falhas" ? "falhas" : "avisos";
  const com = resultados.filter((r) => r[campo].length);
  if (!com.length) continue;
  console.log(`\n${titulo}`);
  for (const r of com) {
    console.log(`  ${r.caminho}`);
    for (const t of r[campo]) console.log(`    · ${t}`);
  }
}
const pasta = path.resolve(import.meta.dirname, "..", "..", ".regua");
await mkdir(pasta, { recursive: true });
await writeFile(path.join(pasta, "relatorio.json"), JSON.stringify({ base: BASE, em: new Date().toISOString(), resultados }, null, 2));
const reprovadas = resultados.filter((r) => r.falhas.length);
const totalAvisos = resultados.reduce((t, r) => t + r.avisos.length, 0);
console.log(
  `\n${reprovadas.length ? "REPROVA" : "APROVA"} · ${resultados.reduce((t, r) => t + r.falhas.length, 0)} falha(s) em ${reprovadas.length} de ${resultados.length} página(s) · ${totalAvisos} aviso(s) · ${Math.round((Date.now() - inicio) / 1000)} s`,
);
console.log(`Relatório: ${path.relative(process.cwd(), path.join(pasta, "relatorio.json"))}`);
process.exitCode = reprovadas.length ? 1 : 0;

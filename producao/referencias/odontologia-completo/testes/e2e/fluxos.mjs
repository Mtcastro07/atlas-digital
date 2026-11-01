// testes/e2e/fluxos.mjs — os fluxos de ponta a ponta do que só existe com interação (producao/qualidade/05-ponta-a-ponta.md):
// o pedido de avaliação e a mensagem do WhatsApp, o copiar com a área de transferência recusada, o mapa dos dentes (toque,
// teclado, âncora), o plano de sessões, o estado ao vivo com o relógio fixo, o site sem script, o menu do celular e a 404.
// Contra o build de produção servido (npm run estatico, na 3100). Usa a biblioteca `playwright` da régua e o `node:assert`:
// o @playwright/test, que o documento 05 descreve, não é dependência aprovada do kit (decisoes.md).
// Uso: node testes/e2e/fluxos.mjs [--base=http://localhost:3100]
import assert from "node:assert/strict";
import { chromium } from "playwright";

const BASE = (process.argv.find((a) => a.startsWith("--base="))?.slice(7) ?? "http://localhost:3100").replace(/\/$/, "");
const navegador = await chromium.launch({ channel: "chrome" });
let falhas = 0;
async function fluxo(nome, corpo) {
  try {
    await corpo();
    console.log(`  ok     ${nome}`);
  } catch (erro) {
    falhas++;
    console.log(`  FALHA  ${nome}\n         ${String(erro.message).split("\n").slice(0, 4).join("\n         ")}`);
  }
}
const contexto = (opcoes = {}) => navegador.newContext({ locale: "pt-BR", timezoneId: "America/Sao_Paulo", viewport: { width: 1440, height: 900 }, ...opcoes });
const mensagemDoLink = (href) => decodeURIComponent(new URL(href).searchParams.get("text") ?? "");
/** Toca num ponto do traço da área (a região é um contorno de duas pontas: o centro da caixa pode ficar fora dela). */
async function tocarNaArea(pagina, indice) {
  const ponto = await pagina.locator("path.mapa-area").nth(indice).evaluate((el) => {
    const p = el.getPointAtLength(el.getTotalLength() * 0.3);
    const m = new DOMPoint(p.x, p.y).matrixTransform(el.getScreenCTM());
    return { x: m.x, y: m.y };
  });
  await pagina.mouse.click(ponto.x, ponto.y);
}

console.log(`Fluxos de ponta a ponta · ${BASE}\n`);

await fluxo("pedido de avaliação: as escolhas viram a mensagem, e o vínculo do WhatsApp a leva codificada", async () => {
  const c = await contexto();
  const p = await c.newPage();
  await p.goto(`${BASE}/avaliacao/`);
  const link = p.getByRole("heading", { name: "A mensagem" }).locator("xpath=..").getByRole("link", { name: /Abrir o WhatsApp com esta mensagem/ });
  assert.equal(mensagemDoLink(await link.getAttribute("href")), "Olá. Gostaria de marcar uma avaliação.");
  await p.getByLabel("Limpeza", { exact: true }).check({ force: true });
  await p.getByLabel("Dentes da frente, arcada superior").check({ force: true });
  await p.getByLabel("Última visita ao dentista (opcional)").selectOption({ label: "De 6 meses a 1 ano" });
  await p.getByLabel("Período de preferência (opcional)").selectOption({ label: "Manhã" });
  const esperada = "Olá. Gostaria de marcar uma avaliação. Atendimento: limpeza. Região: dentes da frente, arcada superior. Última visita ao dentista: de 6 meses a 1 ano. Período: manhã.";
  assert.equal(mensagemDoLink(await link.getAttribute("href")), esperada);
  assert.match(await link.getAttribute("href"), /^https:\/\/wa\.me\/5521900000000\?text=/);
  assert.equal(await link.getAttribute("target"), "_blank");
  assert.match((await p.locator("[aria-live=polite]").filter({ hasText: "Olá." }).first().textContent()) ?? "", /Atendimento: limpeza/);
  await c.close();
});

await fluxo("copiar: com a área de transferência recusada diz 'Cópia indisponível'; autorizada, confirma 'Copiado'", async () => {
  const recusada = await contexto();
  const p1 = await recusada.newPage();
  await p1.addInitScript(() => Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new Error("recusado")) } }));
  await p1.goto(`${BASE}/avaliacao/`);
  await p1.getByRole("button", { name: /Copiar a mensagem/ }).click();
  await p1.getByText("Cópia indisponível").waitFor({ timeout: 3000 });
  await recusada.close();
  const autorizada = await contexto({ permissions: ["clipboard-read", "clipboard-write"] });
  const p2 = await autorizada.newPage();
  await p2.goto(`${BASE}/avaliacao/`);
  await p2.getByRole("button", { name: /Copiar a mensagem/ }).click();
  await p2.getByText("Copiado", { exact: true }).waitFor({ timeout: 3000 });
  assert.equal(await p2.evaluate(() => navigator.clipboard.readText()), "Olá. Gostaria de marcar uma avaliação.");
  await autorizada.close();
});

await fluxo("mapa dos dentes: tocar numa região marca o rádio; tocar de novo desmarca; a âncora #regiao-<id> escolhe só id da lista", async () => {
  const c = await contexto();
  const p = await c.newPage();
  await p.goto(`${BASE}/avaliacao/`);
  const areas = p.locator("path.mapa-area");
  assert.equal(await areas.count(), 4);
  await p.locator("path.mapa-area").nth(3).scrollIntoViewIfNeeded();
  await tocarNaArea(p, 3); // fundo-inferior
  assert.equal(await p.getByLabel("Dentes do fundo, arcada inferior").isChecked(), true);
  assert.ok((await p.locator("path.mapa-faixa").count()) === 1, "a faixa de lápis aparece só na região escolhida");
  await tocarNaArea(p, 3);
  assert.equal(await p.getByLabel("Nenhuma região").isChecked(), true);
  // Cada âncora numa página nova: dentro da mesma página, uma âncora inválida não desfaz a escolha já feita.
  const aberta = async (ancora) => {
    const q = await c.newPage();
    await q.goto(`${BASE}/avaliacao/${ancora}`);
    return q;
  };
  assert.equal(await (await aberta("#regiao-fundo-superior")).getByLabel("Dentes do fundo, arcada superior").isChecked(), true);
  assert.equal(await (await aberta("#%E0")).getByLabel("Nenhuma região").isChecked(), true); // malformada: a página abre e não escolhe nada
  assert.equal(await (await aberta("#regiao-inventada")).getByLabel("Nenhuma região").isChecked(), true); // fora da lista: ignorada
  await c.close();
});

await fluxo("teclado: Tab chega aos rádios, as setas escolhem, e o foco é visível (contorno de 2 px)", async () => {
  const c = await contexto();
  const p = await c.newPage();
  await p.goto(`${BASE}/avaliacao/`);
  const primeiro = p.getByLabel("Avaliação de rotina");
  await primeiro.focus();
  await p.keyboard.press("ArrowDown");
  assert.equal(await p.getByLabel("Urgência (encaixe no mesmo dia)").isChecked(), true);
  assert.ok(await p.getByText("Com dor, o encaixe é no mesmo dia, de segunda a sexta, para quem avisar até as 16h.").first().isVisible());
  const contorno = await p.evaluate(() => {
    const e = document.activeElement?.nextElementSibling ?? document.activeElement;
    const s = getComputedStyle(e);
    return { largura: s.outlineWidth, estilo: s.outlineStyle };
  });
  assert.equal(contorno.estilo, "solid");
  assert.equal(contorno.largura, "2px");
  await c.close();
});

await fluxo("plano de sessões: a região esconde o que não alcança, e 'Todas as regiões' devolve a lista", async () => {
  const c = await contexto();
  const p = await c.newPage();
  await p.goto(`${BASE}/tratamentos/`);
  const itens = p.locator("ul[aria-label] > li");
  assert.equal(await itens.count(), 6);
  await p.getByLabel("Dentes do fundo, arcada superior").check({ force: true });
  assert.equal(await itens.locator("visible=true").count(), 5);
  assert.equal(await p.getByRole("link", { name: "Clareamento supervisionado" }).isVisible(), false);
  await p.getByText("5 de 6 tratamentos alcançam: dentes do fundo, arcada superior.").waitFor();
  await p.getByLabel("Dentes da frente, arcada inferior").check({ force: true });
  assert.equal(await itens.locator("visible=true").count(), 6);
  await p.getByLabel("Todas as regiões").check({ force: true });
  assert.equal(await itens.locator("visible=true").count(), 6);
  await p.goto(`${BASE}/tratamentos/#regiao-fundo-inferior`);
  assert.equal(await p.getByLabel("Dentes do fundo, arcada inferior").isChecked(), true);
  // A região escolhida segue para o pedido de avaliação, já marcada.
  await p.getByRole("link", { name: "Pedir avaliação para esta região" }).click();
  await p.waitForURL(/\/avaliacao\/#regiao-fundo-inferior$/);
  await p.waitForFunction(() => document.querySelector('input[type="radio"][value="fundo-inferior"]')?.checked === true, null, { timeout: 3000 });
  await c.close();
});

await fluxo("sem script: o plano inteiro está no HTML, o pedido de avaliação diz o que fazer e o vínculo leva a mensagem curta", async () => {
  const c = await contexto({ javaScriptEnabled: false });
  const p = await c.newPage();
  await p.goto(`${BASE}/tratamentos/`);
  assert.equal(await p.locator("ul[aria-label] > li").locator("visible=true").count(), 6);
  await p.goto(`${BASE}/avaliacao/`);
  assert.ok(await p.getByText("Sem script, o botão abre a conversa com a mensagem curta.").isVisible());
  const links = p.getByRole("link", { name: /Pedir avaliação pelo WhatsApp/ });
  assert.equal(mensagemDoLink(await links.first().getAttribute("href")), "Olá. Gostaria de marcar uma avaliação.");
  await p.goto(`${BASE}/`);
  assert.match((await p.locator("main").textContent()) ?? "", /Segunda a quinta, 8h às 12h e 13h30 às 18h/); // o horário escrito, no lugar do estado ao vivo
  await c.close();
});

for (const [instante, esperado, rotulo] of [
  ["2026-10-13T10:00:00-03:00", "Aberto agora, fecha às 12h e reabre às 13h30", "terça às 10h"],
  ["2026-10-13T12:30:00-03:00", "Fechado agora, abre às 13h30", "terça às 12h30, no almoço"],
  ["2026-10-13T15:00:00-03:00", "Aberto agora, fecha às 18h", "terça às 15h"],
  ["2026-10-17T12:00:00-03:00", "Fechado agora, abre segunda, 8h", "sábado ao meio-dia"],
  ["2026-10-12T10:00:00-03:00", "Fechado agora, abre amanhã, 8h", "segunda, 12.10, feriado"],
  ["2026-10-10T02:30:00Z", "Fechado agora, abre amanhã, 8h", "sexta 23h30 em Niterói (já é sábado em UTC)"],
]) {
  await fluxo(`estado ao vivo, relógio fixo: ${rotulo}`, async () => {
    const c = await contexto({ timezoneId: "Asia/Tokyo" }); // o fuso do aparelho não conta: vale o de Niterói
    const p = await c.newPage();
    await p.clock.install({ time: new Date(instante) });
    await p.goto(`${BASE}/`);
    await p.clock.fastForward(1000);
    await p.getByText(esperado, { exact: true }).waitFor({ timeout: 3000 });
    await c.close();
  });
}

await fluxo("a urgência do dia: antes das 16h numa terça é 'de hoje'; depois, o texto fixo", async () => {
  const c = await contexto();
  const p = await c.newPage();
  await p.clock.install({ time: new Date("2026-10-13T15:30:00-03:00") });
  await p.goto(`${BASE}/`);
  await p.clock.fastForward(1000);
  await p.getByText("Urgência de hoje: avise até as 16h.", { exact: true }).waitFor({ timeout: 3000 });
  await p.clock.fastForward(40 * 60 * 1000);
  await p.getByText(/^Urgência: encaixe de segunda a sexta/).waitFor({ timeout: 3000 });
  await c.close();
});

await fluxo("menu do celular: abre, prende o foco, fecha com Esc e devolve o foco ao botão", async () => {
  const c = await contexto({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const p = await c.newPage();
  await p.goto(`${BASE}/`);
  const gatilho = p.getByRole("link", { name: "Menu" });
  await gatilho.click();
  const dialogo = p.getByRole("dialog", { name: "Menu" });
  await dialogo.waitFor();
  assert.ok(await dialogo.getByRole("link", { name: "Tratamentos" }).isVisible());
  for (let i = 0; i < 12; i++) await p.keyboard.press("Tab");
  assert.equal(await p.evaluate(() => !!document.activeElement?.closest("dialog")), true, "o foco escapou do diálogo");
  await p.keyboard.press("Escape");
  await dialogo.waitFor({ state: "hidden" });
  assert.equal(await p.evaluate(() => document.activeElement?.textContent?.includes("Menu") ?? false), true);
  await c.close();
});

await fluxo("inclinação do mapa: só com ponteiro fino e sem movimento reduzido", async () => {
  const lerTransformacao = async (opcoes) => {
    const c = await contexto(opcoes);
    const p = await c.newPage();
    await p.goto(`${BASE}/tratamentos/`);
    const mapa = p.locator(".mov-inclina-corpo").first();
    const caixa = await mapa.boundingBox();
    await p.mouse.move(caixa.x + caixa.width * 0.9, caixa.y + caixa.height * 0.15);
    await p.waitForTimeout(450);
    const valor = await mapa.evaluate((e) => e.style.transform);
    await c.close();
    return valor;
  };
  const normal = await lerTransformacao({});
  assert.match(normal, /rotateX\(.*deg\) rotateY\(.*deg\)/);
  const graus = [...normal.matchAll(/(-?[\d.]+)deg/g)].map((m) => Math.abs(Number(m[1])));
  assert.ok(graus.every((g) => g <= 3), `inclinação além de 3°: ${normal}`);
  assert.equal(await lerTransformacao({ reducedMotion: "reduce" }), "", "movimento reduzido: nada se inclina");
});

await fluxo("o telefone: na primeira tela da capa a 320 px, ao lado do WhatsApp, como vínculo tel:, sem partir a linha", async () => {
  const c = await contexto({ viewport: { width: 320, height: 700 } });
  const p = await c.newPage();
  await p.goto(`${BASE}/`);
  const tel = p.getByRole("link", { name: /Ou ligue/ });
  assert.equal(await tel.getAttribute("href"), "tel:+5521900000000");
  const caixa = await tel.boundingBox();
  assert.ok(caixa && caixa.y + caixa.height <= 700, "o telefone cabe na primeira tela do celular");
  assert.equal(await tel.evaluate((e) => e.getClientRects().length), 1, "o número não parte a linha");
  assert.equal(await tel.evaluate((e) => e.getBoundingClientRect().height >= 44), true, "alvo de toque de 44 px");
  await c.close();
});

await fluxo("nada gravado no aparelho depois dos fluxos: nenhum cookie, localStorage nem sessionStorage", async () => {
  const c = await contexto();
  const p = await c.newPage();
  await p.goto(`${BASE}/avaliacao/`);
  await p.getByLabel("Limpeza", { exact: true }).check({ force: true });
  await p.getByRole("button", { name: /Copiar a mensagem/ }).click();
  await p.goto(`${BASE}/tratamentos/`);
  await p.getByLabel("Dentes do fundo, arcada superior").check({ force: true });
  const guardado = await p.evaluate(() => ({ cookies: document.cookie, local: localStorage.length, sessao: sessionStorage.length }));
  assert.deepEqual(guardado, { cookies: "", local: 0, sessao: 0 });
  assert.deepEqual(await c.cookies(), []);
  await c.close();
});

await fluxo("a 404 é da marca, em português, com o status 404 e o caminho de volta", async () => {
  const c = await contexto();
  const p = await c.newPage();
  const resposta = await p.goto(`${BASE}/pagina-que-nao-existe/`);
  assert.equal(resposta.status(), 404);
  assert.equal(await p.locator("h1").textContent(), "Esta página não existe.");
  assert.ok(await p.getByRole("link", { name: "Voltar ao início" }).isVisible());
  await c.close();
});

await fluxo("o tratamento certo na página certa: cada página traz as sessões do briefing e a mensagem do próprio tratamento", async () => {
  const c = await contexto();
  const p = await c.newPage();
  const esperados = {
    limpeza: ["1 sessão de 45 minutos", "Atendimento: limpeza e orientação de higiene."],
    canal: ["2 sessões, com 7 dias de intervalo", "Atendimento: tratamento de canal."],
    clareamento: ["3 consultas de 30 minutos", "Atendimento: clareamento supervisionado."],
    coroa: ["3 sessões, com 14 e 7 dias de intervalo", "Atendimento: coroa."],
    aparelho: ["instalação e manutenção a cada 30 dias", "Atendimento: aparelho ortodôntico fixo."],
    restauracao: ["1 sessão de 50 minutos por dente", "Atendimento: restauração."],
  };
  for (const [id, [titulo, mensagem]] of Object.entries(esperados)) {
    await p.goto(`${BASE}/tratamentos/${id}/`);
    assert.match((await p.locator("h1").textContent()) ?? "", new RegExp(titulo.replace(/[()]/g, "\\$&"), "i"));
    const link = p.getByRole("link", { name: /Pedir avaliação para este caso/ });
    assert.ok(mensagemDoLink(await link.getAttribute("href")).endsWith(mensagem), `${id}: ${mensagemDoLink(await link.getAttribute("href"))}`);
  }
  await c.close();
});

await navegador.close();
console.log(`\n${falhas ? "REPROVA" : "APROVA"} · ${falhas} falha(s)`);
process.exit(falhas ? 1 : 0);

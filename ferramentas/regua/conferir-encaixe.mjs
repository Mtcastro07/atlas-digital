// O teste de encaixe de /duvidas (paginas/duvidas.md, 10.4): cada pergunta aberta sozinha, na mesa, sem cobrir o momento
// seguinte nem o código, com a folga medida; e o que o contrato pede do texto (3.7): quatro h2, doze perguntas, doze
// objetos Question no JSON-LD, com o texto igual ao da página. Resposta longa escrita depois em conteudo/duvidas.ts, ou
// mudança na grade da mesa, reprova aqui.
// Uso, com a página servida: node ferramentas/regua/conferir-encaixe.mjs --base=http://127.0.0.1:3000
// Sai com 1 se algo reprova.
import { chromium } from "playwright";

const base = (process.argv.find((a) => a.startsWith("--base="))?.slice(7) ?? "http://localhost:3000").replace(/\/$/, "");
const FOLGA_MINIMA = 16;
const falhas = [];

const navegador = await chromium.launch({ channel: "chrome" });
for (const largura of [1440, 1024]) {
  const pagina = await navegador.newPage({ viewport: { width: largura, height: 900 }, reducedMotion: "reduce" });
  await pagina.goto(`${base}/duvidas`, { waitUntil: "load" });

  const texto = await pagina.evaluate(() => {
    const normal = (s) => s.replace(/\s+/g, " ").trim();
    const ld = JSON.parse([...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent).find((t) => t.includes('"FAQPage"')));
    const naPagina = [...document.querySelectorAll("details.vd-duvida")].map((d) => [normal(d.querySelector(".vd-duvida-pergunta").textContent), normal(d.querySelector(".vd-duvida-resposta").textContent)]);
    return {
      h2: document.querySelectorAll("#duvidas h2").length,
      abertas: document.querySelectorAll("details.vd-duvida[open]").length,
      noLd: Object.fromEntries(ld.mainEntity.map((q) => [normal(q.name), normal(q.acceptedAnswer.text)])),
      naPagina,
    };
  });
  if (texto.h2 !== 4) falhas.push(`${largura}: ${texto.h2} h2`);
  if (texto.abertas !== 4) falhas.push(`${largura}: ${texto.abertas} respostas abertas na chegada`);
  if (texto.naPagina.length !== 12 || Object.keys(texto.noLd).length !== 12) falhas.push(`${largura}: ${texto.naPagina.length} perguntas na página, ${Object.keys(texto.noLd).length} no JSON-LD`);
  for (const [pergunta, resposta] of texto.naPagina) if (texto.noLd[pergunta] !== resposta) falhas.push(`${largura}: o texto difere do JSON-LD em "${pergunta}"`);

  // Abre uma por vez: o <details name> fecha a do mesmo momento; as dos outros momentos voltam às da chegada.
  const medidas = await pagina.evaluate(() => {
    const todas = [...document.querySelectorAll("details.vd-duvida")];
    const chegada = todas.filter((d) => d.open);
    return todas.map((d) => {
      chegada.forEach((c) => (c.open = true));
      const momento = d.closest(".vd-mesa-momento");
      const seguinte = momento.nextElementSibling?.querySelector("h2") ?? document.querySelector("nav:has(.cm-proxima), footer");
      d.open = true;
      const resposta = d.querySelector(".vd-duvida-resposta p").getBoundingClientRect();
      const pergunta = d.querySelector("summary").getBoundingClientRect();
      const fim = seguinte.getBoundingClientRect();
      return {
        id: d.querySelector(".vd-duvida-resposta").id,
        altura: Math.round(resposta.height),
        folga: Math.round(fim.top - resposta.bottom),
        aoLado: resposta.left > pergunta.right,
        direita: Math.round(innerWidth - resposta.right),
      };
    });
  });
  for (const m of medidas) {
    if (m.folga < FOLGA_MINIMA) falhas.push(`${largura}: ${m.id} a ${m.folga} px do que vem depois (mínimo: ${FOLGA_MINIMA})`);
    if (!m.aoLado) falhas.push(`${largura}: ${m.id} não está ao lado da pergunta`);
    if (m.direita < 0) falhas.push(`${largura}: ${m.id} passa da tela`);
  }
  const justa = medidas.reduce((a, b) => (b.folga < a.folga ? b : a));
  const alta = medidas.reduce((a, b) => (b.altura > a.altura ? b : a));
  console.log(`${largura} px: ${medidas.length} abertas uma a uma; menor folga ${justa.folga} px (${justa.id}); a mais alta ${alta.altura} px (${alta.id})`);
  await pagina.close();
}
await navegador.close();

if (falhas.length) {
  console.error(falhas.join("\n"));
  process.exit(1);
}
console.log("Encaixe de /duvidas: aprovado.");

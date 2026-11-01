// ferramentas/conferir-paleta.mjs — o contraste dos pares de cor da identidade, antes de construir
// (producao/esteira/06-cor-forma-e-superficie.md, seção 4; producao/03-da-identidade-ao-codigo.md). Lê os tokens de
// app/identidade.css, converte cada cor (OKLCH, hexadecimal, rgb) para sRGB no canvas do Chrome — como a
// régua faz — e mede os pares que o site usa. É a conferência do plano; a da página desenhada é a régua.
//
// Uso (na raiz do site): node ferramentas/conferir-paleta.mjs
// Sai com código 1 se um par ficar abaixo do mínimo.
import { readFileSync } from "node:fs";
import { chromium } from "playwright";

const css = readFileSync("app/identidade.css", "utf8");
const raiz = css.match(/:root\s*\{([\s\S]*?)\}/)?.[1] ?? "";
const tokens = Object.fromEntries([...raiz.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, nome, valor]) => [nome, valor.trim()]));

// [texto, fundo, mínimo, para quê]. 4,5:1 para texto comum; 3:1 para o anel de foco e borda de controle.
const PARES = [
  ["foreground", "background", 4.5, "o texto sobre o fundo"],
  ["foreground", "card", 4.5, "o texto sobre o cartão"],
  ["foreground", "muted", 4.5, "o texto sobre o fundo suave (rodapé, células)"],
  ["muted-foreground", "background", 4.5, "o texto secundário sobre o fundo"],
  ["muted-foreground", "card", 4.5, "o texto secundário sobre o cartão"],
  ["muted-foreground", "muted", 4.5, "o texto secundário sobre o fundo suave"],
  ["primary-foreground", "primary", 4.5, "o texto da ação sobre a cor da ação"],
  ["accent", "background", 4.5, "o vínculo e o destaque sobre o fundo"],
  ["accent", "card", 4.5, "o vínculo sobre o cartão"],
  ["accent", "muted", 4.5, "o vínculo sobre o fundo suave"],
  ["foreground", "marcador", 4.5, "o texto sobre o marca-texto"],
  ["ring", "background", 3, "o anel de foco sobre o fundo"],
];

const navegador = await chromium.launch({ channel: "chrome" });
let falhas = 0;
try {
  const pagina = await navegador.newPage();
  const rgba = await pagina.evaluate((cores) => {
    const g = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    const saida = {};
    for (const [nome, valor] of Object.entries(cores)) {
      g.clearRect(0, 0, 1, 1);
      g.fillStyle = "#000";
      g.fillStyle = valor; // inválida, fica a anterior: o preto denuncia
      g.fillRect(0, 0, 1, 1);
      saida[nome] = [...g.getImageData(0, 0, 1, 1).data];
    }
    return saida;
  }, tokens);
  const lum = ([r, g, b]) => {
    const c = [r, g, b].map((v) => v / 255).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  // Cor com transparência (a borda, por exemplo) se mistura ao fundo antes de medir.
  const sobre = (cor, fundo) => cor.slice(0, 3).map((v, i) => Math.round((v * cor[3] + fundo[i] * (255 - cor[3])) / 255));
  console.log("Contraste dos pares da identidade (app/identidade.css)\n");
  for (const [texto, fundo, minimo, uso] of PARES) {
    if (!rgba[texto] || !rgba[fundo]) {
      console.log(`  —      ${texto} sobre ${fundo}: token ausente (${uso})`);
      continue;
    }
    const f = sobre(rgba[fundo], [255, 255, 255]);
    const t = sobre(rgba[texto], f);
    const [a, b] = [lum(t), lum(f)].sort((x, y) => y - x);
    const razao = (a + 0.05) / (b + 0.05);
    const ok = razao >= minimo;
    if (!ok) falhas++;
    console.log(`  ${ok ? "ok    " : "FALHA "} ${razao.toFixed(2).padStart(5)}:1  ${texto} sobre ${fundo} (mínimo ${minimo}:1; ${uso})`);
  }
} finally {
  await navegador.close();
}
console.log(`\n${falhas ? `REPROVA · ${falhas} par(es) abaixo do mínimo` : "APROVA"}. A régua confere de novo na página desenhada (bloco 4).`);
process.exit(falhas ? 1 : 0);

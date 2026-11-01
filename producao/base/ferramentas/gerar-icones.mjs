// ferramentas/gerar-icones.mjs — os ícones derivados do app/icon.svg (producao/esteira/13-tecnologia-e-estrutura.md,
// seção 6, regra 6; producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 15):
// - app/apple-icon.png, 180 × 180, quadrado cheio: o iPhone aplica a máscara dele, e o canto transparente
//   viraria preto na tela inicial;
// - app/favicon.ico, 32 × 32: os navegadores e leitores que não pedem o SVG.
// O SVG é desenhado no Chrome, pelo Playwright da régua, no tom claro, sobre a cor de fundo pedida.
// Nenhuma dependência: o .ico é montado à mão (um PNG dentro do contêiner ICO).
//
// Uso (na raiz do site): node ferramentas/gerar-icones.mjs [--fundo=<cor CSS>]
// --fundo: a cor que preenche o quadrado por trás do ícone. Padrão: o --primary de app/identidade.css.
// Quando: sempre que o app/icon.svg mudar.
import { readFileSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";

const svg = readFileSync("app/icon.svg", "utf8");
const identidade = readFileSync("app/identidade.css", "utf8");
const fundo = process.argv.find((a) => a.startsWith("--fundo="))?.slice(8) ?? identidade.match(/--primary:\s*([^;]+);/)?.[1].trim() ?? "#ffffff";

// Desenha no canvas e exporta em PNG: o PNG do canvas sai em RGBA. O Turbopack recusa o .ico com PNG em
// RGB ("The PNG is not in RGBA format", medido em 08.10.2026), e a captura de tela do Chrome sai em RGB
// quando todo pixel é opaco, mesmo com omitBackground.
async function desenhar(pagina, lado) {
  const dados = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  const png = await pagina.evaluate(
    async ({ dados, lado, fundo }) => {
      const img = new Image(lado, lado);
      img.src = dados;
      await img.decode();
      const tela = document.createElement("canvas");
      tela.width = tela.height = lado;
      const g = tela.getContext("2d");
      g.fillStyle = fundo;
      g.fillRect(0, 0, lado, lado);
      g.drawImage(img, 0, 0, lado, lado);
      return tela.toDataURL("image/png").split(",")[1];
    },
    { dados, lado, fundo },
  );
  return Buffer.from(png, "base64");
}

const navegador = await chromium.launch({ channel: "chrome" });
try {
  const pagina = await (await navegador.newContext({ colorScheme: "light", deviceScaleFactor: 1 })).newPage();
  const apple = await desenhar(pagina, 180);
  writeFileSync("app/apple-icon.png", apple);
  const png32 = await desenhar(pagina, 32);
  // O contêiner ICO: cabeçalho (6 bytes), uma entrada (16 bytes) e o PNG.
  const cabecalho = Buffer.alloc(22);
  cabecalho.writeUInt16LE(0, 0); // reservado
  cabecalho.writeUInt16LE(1, 2); // tipo: ícone
  cabecalho.writeUInt16LE(1, 4); // uma imagem
  cabecalho.writeUInt8(32, 6); // largura
  cabecalho.writeUInt8(32, 7); // altura
  cabecalho.writeUInt8(0, 8); // paleta: nenhuma
  cabecalho.writeUInt8(0, 9); // reservado
  cabecalho.writeUInt16LE(1, 10); // planos
  cabecalho.writeUInt16LE(32, 12); // bits por pixel
  cabecalho.writeUInt32LE(png32.length, 14); // tamanho do PNG
  cabecalho.writeUInt32LE(22, 18); // onde o PNG começa
  writeFileSync("app/favicon.ico", Buffer.concat([cabecalho, png32]));
  console.log(`app/apple-icon.png (180 × 180, ${(apple.length / 1024).toFixed(1)} KB) e app/favicon.ico (32 × 32) gravados, sobre ${fundo}.`);
} finally {
  await navegador.close();
}

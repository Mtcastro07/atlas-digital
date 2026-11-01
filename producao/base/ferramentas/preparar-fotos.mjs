// ferramentas/preparar-fotos.mjs — prepara uma foto para o site (producao/esteira/08-imagem-e-fotografia.md, seção 5):
// recorta na proporção pedida, gera as larguras que o leiaute usa em WebP de qualidade 82 e, ao redesenhar
// a foto num canvas, descarta os metadados (localização, aparelho, data). Respeita a rotação gravada na foto.
// Desenha no Chrome instalado, pelo Playwright da régua: nenhuma dependência nova.
//
// Uso (na raiz do site):
//   node ferramentas/preparar-fotos.mjs <foto> <nome> [--proporcao=3:2] [--larguras=480,960,1440,1920] [--topo=0.5]
// Exemplos:
//   node ferramentas/preparar-fotos.mjs ~/Downloads/fachada.jpg fachada --proporcao=4:3
//   node ferramentas/preparar-fotos.mjs ~/Downloads/dona.jpg dona --proporcao=1:1 --larguras=480,960 --topo=0.3
// <nome>: minúsculas, sem acento, com hífens (o mesmo que conteudo/ usa).
// --proporcao: largura:altura do recorte, ou "original" (padrão 3:2).
// --topo: de 0 a 1, onde o recorte começa na altura (0, no alto; 0,5, no meio; 0,3 para rosto).
// Saída: public/fotos/<nome>-<largura>.webp — só as larguras que a foto recortada alcança, sem ampliar —
// e, no terminal, o <img> com srcset, sizes, width e height para colar no componente.
// A foto do iPhone em HEIC não abre no Chrome: exporte como JPEG antes (Fotos > Arquivo > Exportar).
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const argumentos = process.argv.slice(2);
const opcao = (nome) => argumentos.find((a) => a.startsWith(`--${nome}=`))?.slice(nome.length + 3);
const [origem, nome] = argumentos.filter((a) => !a.startsWith("--"));
if (!origem || !nome) {
  console.error("Uso: node ferramentas/preparar-fotos.mjs <foto> <nome> [--proporcao=3:2] [--larguras=480,960,1440,1920] [--topo=0.5]");
  process.exit(2);
}
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(nome)) throw new Error("O nome vai em minúsculas, sem acento, com hífens.");
const tipos = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif" };
const tipo = tipos[path.extname(origem).toLowerCase()];
if (!tipo) throw new Error("Formato não aceito: use JPG, PNG, WebP ou AVIF (o HEIC do iPhone, exporte como JPEG).");

const textoProporcao = opcao("proporcao") ?? "3:2";
const [pw, ph] = textoProporcao.split(":").map(Number);
const razao = textoProporcao === "original" ? null : pw / ph;
if (razao !== null && !(razao > 0)) throw new Error(`Proporção inválida: "${textoProporcao}" (use 3:2, 4:3, 1:1, 16:9 ou original).`);
const larguras = (opcao("larguras") ?? "480,960,1440,1920").split(",").map(Number).filter((n) => n > 0).sort((a, b) => a - b);
const topo = Math.min(1, Math.max(0, Number((opcao("topo") ?? "0.5").replace(",", "."))));

const navegador = await chromium.launch({ channel: "chrome" });
try {
  const pagina = await navegador.newPage();
  const fonte = `data:${tipo};base64,${(await readFile(origem)).toString("base64")}`;
  const r = await pagina.evaluate(
    async ({ fonte, razao, topo, larguras }) => {
      const img = new Image();
      img.src = fonte;
      await img.decode();
      // No Chrome, as medidas e o drawImage já seguem a rotação gravada na foto (image-orientation: from-image).
      const W = img.naturalWidth;
      const H = img.naturalHeight;
      let w = W;
      let h = H;
      if (razao) {
        if (W / H > razao) w = Math.round(H * razao);
        else h = Math.round(W / razao);
      }
      const x = Math.round((W - w) / 2);
      const y = Math.round((H - h) * topo);
      const alvo = larguras.filter((l) => l <= w);
      if (alvo.length === 0) alvo.push(w); // foto menor que a menor largura: sai no tamanho dela, sem ampliar
      const saidas = [];
      for (const largura of alvo) {
        const altura = Math.round((largura * h) / w);
        const tela = document.createElement("canvas");
        tela.width = largura;
        tela.height = altura;
        const g = tela.getContext("2d");
        g.imageSmoothingQuality = "high";
        g.drawImage(img, x, y, w, h, 0, 0, largura, altura);
        saidas.push({ largura, altura, dados: tela.toDataURL("image/webp", 0.82).split(",")[1] });
      }
      return { original: [W, H], recorte: [w, h], saidas };
    },
    { fonte, razao, topo, larguras },
  );

  const pasta = path.join("public", "fotos");
  await mkdir(pasta, { recursive: true });
  for (const s of r.saidas) {
    const bytes = Buffer.from(s.dados, "base64");
    await writeFile(path.join(pasta, `${nome}-${s.largura}.webp`), bytes);
    const kb = bytes.length / 1024;
    console.log(`public/fotos/${nome}-${s.largura}.webp  ${s.largura} × ${s.altura}  ${kb.toFixed(0)} KB${kb > 300 ? "  ← acima de 300 KB: confira a necessidade desta largura" : ""}`);
  }
  if (r.recorte[0] < larguras[0]) console.warn(`ATENÇÃO: a foto recortada tem ${r.recorte[0]} px de largura, menos que ${larguras[0]}: peça uma foto maior.`);

  const maior = r.saidas.at(-1);
  const meio = r.saidas[Math.min(1, r.saidas.length - 1)];
  const srcset = r.saidas.map((s) => `/fotos/${nome}-${s.largura}.webp ${s.largura}w`).join(", ");
  console.log(`\nOriginal ${r.original.join(" × ")}; recorte ${r.recorte.join(" × ")} (${textoProporcao}). Metadados descartados no redesenho.\n`);
  console.log("Para o componente (o alt vem de conteudo/; ajuste o sizes à largura real no leiaute):\n");
  console.log(`<img
  src="/fotos/${nome}-${meio.largura}.webp"
  srcSet="${srcset}"
  sizes="(min-width: 72rem) 72rem, 100vw"
  width={${maior.largura}}
  height={${maior.altura}}
  alt={…}
  loading="lazy"   // a foto da primeira tela: sem lazy e com fetchPriority="high"
  decoding="async"
/>`);
} finally {
  await navegador.close();
}

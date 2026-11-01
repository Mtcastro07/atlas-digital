// ferramentas/capturar-compartilhamento.mjs — fotografa a primeira tela do site compilado em 1200 × 630,
// em JPEG, para o cartão que aparece quando o endereço é colado no WhatsApp (public/compartilhar.jpg, o
// og:image de todas as páginas: lib/metadados.ts; producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 10).
// Rode com o site compilado e servido; depois, compile de novo, para o cartão novo ir para out/.
//
// Uso (na raiz do site):
//   npm run build && npm run estatico          # num terminal (no modo servidor: PORT=3100 npm run servidor)
//   node ferramentas/capturar-compartilhamento.mjs [--base=http://localhost:3100] [--pagina=/] [--sem-script]
// --sem-script: fotografa a página sem executar script. Use quando a primeira tela tem um estado ao vivo ("Aberto
// agora"): a imagem é fixa, e o estado do minuto da foto ficaria escrito nela. Sem script, a ilha mostra o texto
// que vale sempre (achado do teste de 08.10.2026).
// Quando: sempre que a primeira tela mudar. O cartão fica entre ~50 e ~100 KB.
import { writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const argumentos = process.argv.slice(2);
const opcao = (nome) => argumentos.find((a) => a.startsWith(`--${nome}=`))?.slice(nome.length + 3);
const BASE = (opcao("base") ?? process.env.BASE ?? "http://localhost:3100").replace(/\/$/, "");
const PAGINA = opcao("pagina") ?? "/";
const SEM_SCRIPT = argumentos.includes("--sem-script");

const navegador = await chromium.launch({ channel: "chrome" });
try {
  // Com movimento reduzido, a primeira tela já chega composta: nada a meio caminho na foto.
  const contexto = await navegador.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, reducedMotion: "reduce", javaScriptEnabled: !SEM_SCRIPT });
  const pagina = await contexto.newPage();
  // Duas vezes: a fonte de texto é "optional" (app/fontes.ts) e, na primeira carga, pode ficar na
  // reserva; na segunda, vem do cache e entra já na primeira pintura, como na visita de volta.
  await pagina.goto(BASE + PAGINA, { waitUntil: "load" });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.reload({ waitUntil: "load" });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.waitForTimeout(800);
  const foto = await pagina.screenshot({ type: "jpeg", quality: 80, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await writeFile("public/compartilhar.jpg", foto);
  console.log(`public/compartilhar.jpg: 1200 × 630, ${(foto.length / 1024).toFixed(1)} KB. Compile de novo para publicar.`);
} finally {
  await navegador.close();
}

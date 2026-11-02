# 07 · Regressão visual

> **Para que serve.** Provar que uma mudança mudou na tela **só** o que devia. Capturas da versão aprovada e da versão nova, comparadas pixel a pixel, com o ruído medido antes.
>
> **Estado.** O método foi usado na revisão de código de 03.10.2026: 52 capturas comparadas, nenhuma mudança de tela, com 73,5 KB a menos no HTML. Os scripts daquela revisão ficaram fora do git, na pasta `.playwright-mcp/` da máquina de quem a fez, por isso o essencial deles está copiado abaixo. A automação com o executor do Playwright é RATIFICADO.

---

## 1. Quando usar

**Regra.** Passa pela comparação visual:
1. **Toda mudança que não deveria mudar a tela.** Exemplos: revisão de código, atualização do Next, do React ou do Tailwind, troca de dependência, reorganização de componentes.
2. **Toda mudança que deveria mudar só uma parte.** A comparação prova que o resto ficou igual.
3. **Toda mudança numa peça comum** (um componente, uma regra de CSS, uma ilha) num repositório com mais de um site ou com demos. A busca é pela classe no CSS, além do `import`, e a comparação é de todas as rotas que a usam, a 1440 e a 390 px, inclusive o estilo calculado.
   - **Por quê:** num redesenho (01.11.2026), nenhum arquivo das demos mudou, e 48 de 74 combinações de rota e largura mudaram. A regra base `.vd-orbe` saiu do CSS comum com o orbe do site, e a cena de uma demo, que só acrescentava o tamanho e o tom, quebrou; a pausa "só com a palavra", decidida para um site, chegou às outras por um componente comum, com o estado dela preso a `aria-pressed`. A integração procurou leitores só do lado do site que mudava.
   - **O conserto:** a variação fica numa propriedade que só o site que a pediu passa, e a regra base volta.

**Objetivo.**
- O olho não vê 3 px de diferença num espaçamento, nem uma sombra que sumiu numa página que ninguém abriu.
- A revisão de 03.10 tirou código morto e repetido das quatro frentes e mudou o modo como duas ilhas recebem dados. Só a comparação permitiu afirmar "sem mudança de tela" com prova.
- Atualização de biblioteca é o caso clássico: o Lightning CSS, minificador do Tailwind 4, reduziu a abreviação `animation` sem nome a `animation: none`, e o brilho do Spell UI parou sem que nada acusasse erro (`12-ataque-a-falhas.md`).

**Varia por.** No site com 3D ou vídeo, essas áreas ficam mascaradas e são conferidas à parte (seção 6).

---

## 2. O método das cinco passadas

**Regra.** Toda comparação visual segue cinco passadas, nesta ordem:

| Passada | O que é | Para quê |
|---|---|---|
| 1 · **Controle** | A versão aprovada, capturada **duas vezes** | Medir o ruído: quanto duas capturas da mesma versão diferem. Em 03.10, de 15 a 34 pixels por captura, com tolerância de 8 por canal |
| 2 · **Referência** | A versão aprovada, capturada | O "antes" |
| 3 · **Mudança** | O código novo, compilado | — |
| 4 · **Depois** | A versão nova, capturada nas mesmas condições | O "depois" |
| 5 · **Comparação** | Antes × depois, pixel a pixel | O que difere **acima do ruído** é mudança. Cada mudança é explicada (pedida) ou desfeita (defeito) |

**Objetivo.** Sem o controle, não se sabe se 30 pixels diferentes são mudança ou acaso. Com ele, a regra é objetiva: acima do ruído medido, alguém explica.

**Como conferir.** O relatório da comparação traz, por captura, os pixels diferentes e a caixa onde estão. Toda captura acima do ruído tem uma explicação escrita.

---

## 3. As condições que tornam a captura repetível

**Regra.** Toda captura, nas cinco passadas, é feita nas mesmas condições:

| Condição | Valor | Por quê |
|---|---|---|
| Build | Produção, na mesma máquina, na mesma sessão | O `next dev` desenha outra coisa; outra máquina desenha a fonte de outro jeito |
| Larguras | 390 (celular, com toque) e 1440 (mesa) | As duas da régua; a de 320 entra quando a mudança mexe em leiaute estreito |
| Movimento | Reduzido, e `animations: "disabled"` na captura | Tira o quadro da animação do resultado |
| Relógio | Fixo (em 03.10: `2026-10-03T15:00:00-03:00`) | O "aberto agora" do depósito e qualquer data mudam a tela |
| Fontes | `await document.fonts.ready` | A troca da fonte de reserva pela hospedada muda tudo |
| Imagens preguiçosas | Rolar a página em passos de 500 px antes, e esperar as imagens, até 3 s | A imagem que nunca entrou na tela nunca carrega |
| O que se move sozinho | Mascarado: o `canvas` (o palco 3D), o `iframe` (o site dentro do simulador) | O WebGL desenhado em software varia de execução para execução |
| Estados abertos | Capturados depois do clique: o menu (390), a mensagem preparada, a dúvida aberta, o simulador (1440) | A tela que só existe depois de uma ação também muda |

Na revisão de 03.10: **24 endereços** (as 23 páginas e a 404) × **2 larguras** + **4 estados abertos** = **52 capturas**, cerca de 23 MB em PNG por passada.

**Uma armadilha conhecida.** A captura de página inteira redimensiona a janela, e a animação de entrada do título recomeça: o h1 de Planos "sumiu" numa captura de 07.10. Não é defeito do site (`01-metodologia.md`, seção 5). Movimento reduzido e `animations: "disabled"` evitam o falso alarme.

---

## 4. O código, como foi usado em 03.10

A captura, simplificada da revisão de 03.10 (um script do Playwright, contra o servidor de produção na porta 3100):

```js
// capturar.mjs — node capturar.mjs <pasta>   (antes | depois | controle)
import { chromium } from "playwright";

const PASTA = process.argv[2];
const BASE = process.env.BASE ?? "http://localhost:3100";
const PAGINAS = ["/", "/planos", "/orcamento", "/pagina-que-nao-existe" /* …todas as do mapa do projeto */];
const nomeDe = (caminho, largura, sufixo = "") => `${caminho === "/" ? "inicio" : caminho.slice(1).replaceAll("/", "_")}${sufixo}-${largura}.png`;

// Fontes prontas; a página rolada em passos de 500 px (as imagens preguiçosas carregam) e de volta ao topo.
const assentar = (p) =>
  p.evaluate(async () => {
    await document.fonts.ready;
    for (let y = 0; y < document.scrollingElement.scrollHeight; y += 500) {
      scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 40));
    }
    scrollTo({ top: 0, behavior: "instant" });
    const imagens = [...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r))));
    await Promise.race([Promise.all(imagens), new Promise((r) => setTimeout(r, 3000))]);
  });

const navegador = await chromium.launch({ channel: "chrome" });
for (const largura of [390, 1440]) {
  const celular = largura < 800;
  const contexto = await navegador.newContext({
    viewport: { width: largura, height: celular ? 844 : 900 },
    reducedMotion: "reduce",
    ...(celular ? { isMobile: true, hasTouch: true } : {}),
  });
  await contexto.clock.setFixedTime(new Date("2026-10-03T15:00:00-03:00"));
  const p = await contexto.newPage();
  for (const caminho of PAGINAS) {
    await p.goto(BASE + caminho, { waitUntil: "load" });
    await assentar(p);
    await p.screenshot({ path: `${PASTA}/${nomeDe(caminho, largura)}`, fullPage: true, mask: [p.locator("canvas")], animations: "disabled" });
  }
  // Os estados abertos vêm aqui: clicar e capturar (o menu em 390; a mensagem, a dúvida e o simulador em 1440).
  await contexto.close();
}
await navegador.close();
```

A comparação, com tolerância de 8 por canal (a suavização das bordas). Em 03.10 rodou dentro do navegador, sobre as pastas servidas por `python3 -m http.server 8890`. Abaixo, a mesma conta em Node, com o leitor de PNG da régua (`ferramentas/regua/png.mjs`: `lerPng(buffer)` devolve `{ largura, altura, canais, px }`, com 3 ou 4 canais por pixel, sem dependência):

```js
// comparar.mjs — node comparar.mjs antes depois
import { readdirSync, readFileSync } from "node:fs";
import { lerPng } from "./ferramentas/regua/png.mjs";

const [pastaA, pastaB] = process.argv.slice(2);
const TOLERANCIA = 8; // por canal
for (const nome of readdirSync(pastaA).filter((n) => n.endsWith(".png"))) {
  const a = lerPng(readFileSync(`${pastaA}/${nome}`));
  const b = lerPng(readFileSync(`${pastaB}/${nome}`));
  if (a.largura !== b.largura || a.altura !== b.altura) {
    console.log(`${nome}: tamanho ${a.largura}×${a.altura} → ${b.largura}×${b.altura}`);
    continue;
  }
  if (a.canais !== b.canais) {
    console.log(`${nome}: ${a.canais} → ${b.canais} canais`);
    continue;
  }
  let diferentes = 0, x0 = Infinity, y0 = Infinity, x1 = -1, y1 = -1;
  for (let i = 0; i < a.px.length; i += a.canais) {
    if ([0, 1, 2].some((c) => Math.abs(a.px[i + c] - b.px[i + c]) > TOLERANCIA)) {
      diferentes++;
      const x = (i / a.canais) % a.largura, y = Math.floor(i / a.canais / a.largura);
      x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
    }
  }
  console.log(diferentes ? `${nome}: ${diferentes} px em [${x0}, ${y0}, ${x1}, ${y1}]` : `${nome}: igual`);
}
```

*O `png.mjs` lê só o PNG que o Chrome grava (8 bits por canal, RGB ou RGBA, sem entrelaçamento); outro PNG lança erro. No repositório do Atlas, ele serve ao contraste da régua.*

---

## 5. A automação proposta: `toHaveScreenshot`

**Regra.** Quando os testes de ponta a ponta existirem (`05-ponta-a-ponta.md`), a comparação passa ao `toHaveScreenshot` do Playwright, com as referências no repositório e geradas **só no contêiner oficial**.

**Objetivo.**
- **O relatório pronto:** esperado, obtido e diferença lado a lado.
- **A espera embutida:** o Playwright espera duas capturas seguidas iguais antes de comparar (https://playwright.dev/docs/api/class-pageassertions) [V].
- **As animações desligadas por padrão** (`animations: "disabled"`) [V].
- **O contêiner:** a mesma fonte desenhada do mesmo jeito em toda máquina. Uma referência capturada no Mac nunca bate com a do Linux da integração contínua.

**Como fazer.**

```ts
// playwright.config.ts — o trecho da comparação visual (o resto, em 05-ponta-a-ponta.md).
export default defineConfig({
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      scale: "css",
      maxDiffPixels: 70, // ~2× o ruído do controle de 03/10 (15 a 34 px); recalibre com 10 rodadas sem mudança
      pathTemplate: "{testDir}/__telas__{/projectName}/{testFilePath}/{arg}{ext}",
    },
  },
});
```

```ts
// tests/e2e/telas.spec.ts
import { expect, test } from "./vigia";

test.use({ reducedMotion: "reduce" });
const PAGINAS = ["/", "/planos", "/orcamento", "/demos/barbearia" /* …o mapa do projeto */];

for (const caminho of PAGINAS) {
  test(`tela: ${caminho}`, async ({ page, problemas }) => {
    await page.clock.setFixedTime(new Date("2026-10-03T15:00:00-03:00"));
    await page.goto(caminho);
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`${caminho === "/" ? "inicio" : caminho.slice(1).replaceAll("/", "_")}.png`, {
      fullPage: true,
      mask: [page.locator("canvas"), page.locator("iframe")],
      stylePath: "tests/e2e/telas.css", // esconde as camadas de ambiente
    });
  });
}
```

```css
/* tests/e2e/telas.css — as camadas de ambiente, que dependem do ponteiro ou do tempo, ficam fora da
   captura (no repositório do Atlas: o orbe de bronze que segue o cursor). Cada site lista as suas. */
.vd-orbe { visibility: hidden !important; }
```

```bash
# As referências: só no contêiner oficial, da mesma versão do Playwright.
docker run --rm --ipc=host -v "$PWD":/trabalho -w /trabalho mcr.microsoft.com/playwright:v1.64.0-noble \
  sh -c "npm ci && npm run build && npx playwright test tests/e2e/telas.spec.ts --update-snapshots"
```

**Onde ficam.**
- **No repositório:** em `tests/e2e/__telas__/<projeto>/`.
- **O tamanho:** ~23 MB por conjunto completo de páginas inteiras. Cada atualização acrescenta ao histórico só as telas que mudaram.
- **Se o histórico pesar,** troque as páginas inteiras pela primeira tela mais as seções capturadas uma a uma (`locator.screenshot`), que são menores e mudam menos.

**Como conferir.**
- Dez rodadas sem mudança, no contêiner, sem nenhuma diferença acima do limite.
- Só então a comparação vira porta (`01-metodologia.md`, seção 3).

---

## 6. Ler a diferença

| A diferença é… | Então |
|---|---|
| **Pedida** (a mudança era essa) | A referência é atualizada **no mesmo commit** da mudança, com o motivo na mensagem |
| **Não pedida** | É defeito: relatório de defeito, severidade pela régua de `01-metodologia.md`, seção 8 |
| **Ruído** (fonte, suavização, um quadro) | Estabilize a causa: mascare, espere, fixe. **Nunca** suba a tolerância sem medir de novo o controle |
| **Numa área mascarada** (3D, vídeo, simulador) | Conferência à parte: uma gravação curta ou três quadros fixos, olhados por quem fez a direção de arte |

**Objetivo.** A referência é a versão **aprovada**. Atualizá-la sem motivo transforma o defeito de hoje no padrão de amanhã.

---

## 7. Os serviços pagos, e por que não agora

| Serviço | Custo (outubro de 2026) [FU] | Para quê |
|---|---|---|
| Argos | Pro a US$ 100 por mês (o plano Hobby, grátis, é pessoal) | Revisão das diferenças numa interface própria, por pedido de mudança |
| Chromatic | Grátis até 5.000 capturas por mês, depois US$ 179 | Idem, ligado ao Storybook (que o Atlas não usa) |
| Percy | Grátis até 5.000 capturas por mês | Idem |

**Decisão** (ratificada em 08.10.2026). Não agora. O `toHaveScreenshot` no repositório custa zero e não manda as telas dos clientes para fora. Um serviço só se justifica quando a revisão das diferenças virar o gargalo, o que não acontece com um desenvolvedor e dezenas de telas. **Nunca** se captura a área restrita (o painel da Agenda) com dados reais, em serviço nenhum.

---

## 8. O que a comparação não faz

- **Não diz se a tela está boa.** Diz só que mudou. A referência precisa ter sido aprovada (`11-design-e-anti-ia.md`).
- **Não vê o movimento.** O gesto, o 3D e a transição se conferem em movimento, à mão (`../esteira/09-movimento.md`).
- **Não substitui a régua.** Uma página pode ficar igual à referência e continuar com um defeito que já estava lá.

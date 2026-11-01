# 05 · Testes de ponta a ponta

> **Para que serve.** Provar, num navegador de verdade e contra o build de produção, que cada funcionalidade faz o que promete: a mensagem do WhatsApp sai certa, o menu abre e devolve o foco, o formulário recusa o robô, a Agenda não marca duas pessoas no mesmo horário, a página de erro aparece em português. Inclui o comportamento sem script de cada funcionalidade e os estados abertos (menu, diálogo, mensagem), que a régua não vê.
>
> **Estado.** RATIFICADO. A régua já usa o `playwright` 1.64 (a biblioteca). Os testes de fluxo usam o `@playwright/test` **da mesma versão**, que traz o executor, os projetos, o relógio, as capturas e o relatório. **Aprovado em 08.10.2026** como dependência de desenvolvimento, pela autorização do usuário ("está permitido aplicar as dependências necessárias na esteira de produção"): o teste de produção do zero daquele dia achou este documento pedindo uma dependência que a lista do kit não tinha, e escreveu os fluxos em Node puro. Entra quando a suíte for escrita.
>
> **Depende de.** `01-metodologia.md` (camadas e determinismo), `02-regua.md` (o que a régua já cobre), `../esteira/14-funcionalidades/` (o que cada funcionalidade promete).

---

## 1. O que entra aqui, e o que não entra

**Regra.** Entra em ponta a ponta o que só existe com **interação**: clicar, digitar, abrir, navegar, esperar o relógio. O que se mede com a página parada é da régua; a conta pura é da unidade.

| Pergunta | Camada |
|---|---|
| A página tem rolagem lateral em 320 px? O contraste passa? | Régua (`02`) |
| A soma do montador está certa? | Unidade (`04`) |
| Ao escolher o plano e o módulo, a mensagem pronta traz os valores da soma, e o vínculo do WhatsApp a leva codificada? | **Ponta a ponta** |
| O menu aberto prende o Tab, fecha com Esc e devolve o foco ao botão? | **Ponta a ponta** |
| Os botões da barra do simulador, aberto, têm 44 px? | **Ponta a ponta**, com a medida de alvo (`06`, seção 3); o axe cobra só 24 px |

**Objetivo.** A régua mede as páginas **fechadas**: não abre o menu nem o simulador e não prepara a mensagem. Por isso não viu os três botões de 36 px (`size-9`: voltar, avançar e início) da barra de navegação do simulador, no repositório do Atlas (`components/ilhas/painel-do-simulador.tsx`). Todo estado aberto precisa de um teste que o abra.

---

## 2. A configuração

**Regra.** Um `playwright.config.ts` com o ambiente fixo: idioma, fuso, servidor de produção, dois projetos (celular e mesa), nada de repetição silenciosa.

**Como fazer.**

```bash
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install -D --save-exact @playwright/test@1.64.0   # a mesma versão do playwright da régua
```

```ts
// playwright.config.ts — os testes de fluxo, contra o build de produção.
import { defineConfig, devices } from "@playwright/test";

const BASE = process.env.BASE ?? "http://localhost:3000";
// Na máquina do desenvolvedor, o Chrome instalado (como a régua); no contêiner
// da integração contínua, o Chromium que vem nele.
const channel = process.env.CI ? undefined : "chrome";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI), // um test.only esquecido não passa
  retries: process.env.CI ? 1 : 0,
  failOnFlakyTests: Boolean(process.env.CI), // passou só na segunda tentativa: reprova (01-metodologia, seção 3)
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE,
    locale: "pt-BR",
    timezoneId: "America/Sao_Paulo", // a lógica de horário é a de Niterói
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "celular", use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 }, channel } }, // 390 × 844 com toque, como a régua
    { name: "mesa", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 }, channel } },
    // Um teste curto no motor do Safari: só os testes marcados @webkit (o menu, o montador, a fumaça).
    { name: "webkit", use: { ...devices["iPhone 13"] }, grep: /@webkit/ },
  ],
  webServer: {
    // O build de produção; o next dev mede outra coisa. Com o build em modo standalone (o que a
    // Hostinger roda), o próprio server.js: teria pego o public/ que dava 404 em 03/10.
    command: process.env.STANDALONE ? "node .next/standalone/server.js" : "npm run start",
    url: BASE,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

**Por que cada escolha.**
- **`failOnFlakyTests`** (desde o Playwright 1.52, https://playwright.dev/docs/api/class-testconfig) [V]: um teste que só passa na segunda tentativa é marcado "flaky" e, sem essa opção, a rodada sai verde. Com ela, a repetição serve para **identificar** o teste instável, não para escondê-lo.
- **Dois projetos, e um terceiro curto:** o celular e a mesa, cada um com a sua porta (`../esteira/00-principios.md`, seção 5); a mesa também para o teclado e o hover. O WebKit roda só os testes marcados `@webkit`, para pegar o que só o motor do Safari faz. Ele não é o Safari do iPhone: a conferência em aparelho real fica no roteiro manual (`14-ciclo-de-qa.md`, seção 4). O WebKit e o Chromium do Playwright se instalam com `npx playwright install` (download de navegador, não dependência do npm); no contêiner da integração contínua, já vêm.
- **O servidor standalone.** Na Hostinger, o web app de Next.js força o modo standalone, e o servidor é o `server.js` gerado, com o `public/` e o `.next/static` copiados pelo `postbuild` (no repositório do Atlas, `ferramentas/preparar-standalone.mjs`). O `npm run build` local não sai em standalone, porque o `output` não está no `next.config.ts`. RATIFICADO: ligá-lo por variável de ambiente na integração contínua (`output: process.env.STANDALONE ? "standalone" : undefined`) e testar o `server.js`, o mesmo que vai ao ar. Como a Hostinger força o modo, a confirmar no painel [NV].
- **`timezoneId`:** sem ele, o teste roda no fuso da máquina e a lógica de "aberto agora" muda de resultado conforme quem roda.

**Como conferir.** `npm run build && npx playwright test` sai com 0, e o relatório HTML lista os dois projetos.

---

## 3. A página vigiada

**Regra.** Todo teste usa uma página "vigiada" que reprova o teste, ao final, se houve erro de página, erro de console, resposta ≥ 400 do próprio site ou pedido a outro domínio. E nenhum pedido sai de verdade para fora: o WhatsApp e qualquer domínio externo são interceptados.

**Objetivo.** Um fluxo que "funciona" com um erro no console é um defeito escondido. A âncora malformada de 03.10 derrubava a página inteira por uma exceção que ninguém viu no console. E um teste que abre o `wa.me` de verdade depende da rede e polui o teste.

**Como fazer.**

```ts
// tests/e2e/vigia.ts — a página vigiada: estende o test do Playwright.
import { test as base, expect } from "@playwright/test";

export const test = base.extend<{ problemas: string[] }>({
  problemas: async ({ page, context, baseURL }, usar) => {
    const problemas: string[] = [];
    const origem = new URL(baseURL!).origin;

    page.on("pageerror", (erro) => problemas.push(`erro de página: ${erro.message}`));
    // A violação da política de conteúdo é um evento do navegador: vira erro de console e entra na contagem.
    await context.addInitScript(() => {
      document.addEventListener("securitypolicyviolation", (e) =>
        console.error(`política de conteúdo: ${e.violatedDirective} ← ${e.blockedURI || "inline"}`));
    });
    page.on("console", (msg) => {
      if (msg.type() === "error") problemas.push(`console: ${msg.text()}`);
    });
    page.on("response", (resposta) => {
      const status = resposta.status();
      // Só a 404 aberta de propósito (navegação) fica de fora; um 500 na navegação conta.
      const esperada = status === 404 && resposta.request().isNavigationRequest();
      if (resposta.url().startsWith(origem) && status >= 400 && !esperada) problemas.push(`${status} ${resposta.url()}`);
    });
    // No contexto, e não na página: o vínculo com target="_blank" (o WhatsApp) abre outra página, que page.route
    // não alcança. Só o que é de fora passa pela rota: rotear tudo desligaria o cache HTTP do navegador no teste.
    await context.route((url) => url.origin !== origem, (rota) => {
      problemas.push(`pedido externo: ${rota.request().url()}`);
      return rota.abort();
    });

    await usar(problemas);

    // No fim do fluxo, nada gravado no aparelho (09-seguranca-e-privacidade.md, seção 2). O cookie do painel da
    // Agenda (Path=/painel) é o único permitido: o teste do painel o descarta antes de terminar.
    const cookies = await context.cookies();
    if (cookies.length) problemas.push(`cookie: ${cookies.map((c) => c.name).join(", ")}`);
    const guardado = await page.evaluate(() => localStorage.length + sessionStorage.length).catch(() => 0);
    if (guardado) problemas.push(`armazenamento do navegador: ${guardado} chave(s)`);

    expect(problemas, "a página teve erro, violação da política de conteúdo, pedido externo, cookie ou armazenamento").toEqual([]);
  },
});

export { expect };
```

*Uso:* `test("…", async ({ page, problemas }) => { … })`. Pedir a fixture `problemas` liga a vigia, mesmo sem usá-la no corpo; por isso os testes têm uma exceção ao `no-unused-vars` (`03-estatica.md`, seção 2), sem a qual cada teste vigiado reprovaria no lint. Só a 404 de navegação fica de fora da contagem (o teste da página inexistente); um 500 na abertura da página conta. A interceptação fica no **contexto**: a página aberta por `target="_blank"` (o WhatsApp) não passa pelo `page.route`, e o clique sairia de verdade para `wa.me`. E só o que é de fora passa pela rota: rotear também o próprio site desligaria o cache HTTP do navegador ("Enabling routing disables http cache", tipos do Playwright 1.64).

---

## 4. Os fluxos obrigatórios

**Regra.** Cada funcionalidade do site tem os seus fluxos, **com script e sem script**. O mínimo, por funcionalidade:

| Funcionalidade | Plano | Fluxo com script | O que se afirma | Sem script |
|---|---|---|---|---|
| **Menu do celular** | [todos] | Tocar em "Menu"; Tab até o fim; Esc | O painel abre; o foco entra nele; o Tab não sai dele; Esc fecha; o foco volta ao botão | "Menu" é um vínculo para o índice no fim da página (`#indice`) |
| **Navegação entre páginas** | [todos] | Ir de uma página a outra pelo menu | O h1 da nova página aparece; a rolagem começa no topo, também no voltar, no avançar e na recarga, e com âncora vai à âncora (`../esteira/13-tecnologia-e-estrutura.md`, seção 3.7, regra 9); o item do menu fica com `aria-current="page"`; os efeitos que aparecem na entrada (o giro do globo, no Atlas) acontecem também na página aberta pela navegação interna | Vínculos comuns |
| **Âncoras** | [todos] | Abrir `/#%E0`, `/#`, `/#inexistente`, `/duvidas#<id real>` | A página abre inteira, sem erro de página; a âncora real leva ao destino | O navegador pula sozinho |
| **Página inexistente** | [todos] | Abrir `/nao-existe` | Status 404; título próprio; `noindex`; **sem** endereço canônico de outra página; vínculo de volta ao início | Igual |
| **Página de erro** | [todos] | Provocar um erro de renderização (seção 5.4) | O título em português, "Tentar de novo" e o vínculo para o início; `lang` em português também na página de erro global | — |
| **WhatsApp com mensagem pronta** | [todos] | Ler o `href` de cada vínculo do WhatsApp | `https://wa.me/<só algarismos>?text=<mensagem codificada>`; abre em nova aba com `rel="noopener"`; a mensagem decodificada é a esperada | Igual (é um vínculo) |
| **Copiar** | [todos], onde houver | Clicar em "Copiar", com permissão e sem permissão | Com permissão: "Copiado", e a área de transferência tem o texto. Sem: "Cópia indisponível", e o texto continua à vista | O texto está à vista para copiar à mão |
| **Formulário** | [P] [C] | Enviar válido; enviar inválido; preencher a armadilha; enviar rápido demais; o sexto envio na hora; o SMTP fora do ar; o clique duplo | Válido: a confirmação e uma linha em `.teste/emails.jsonl` (com `SMTP_TESTE=1`). Inválido: o erro em texto, ligado ao campo (`aria-describedby`), e o foco no primeiro erro. Armadilha (`nao_preencher`): a mesma confirmação, e nenhum e-mail. Rápido (menos de 3 s): pede para conferir, e a segunda tentativa passa. Sexto envio (com um `x-forwarded-for` próprio do teste: sem o cabeçalho, o servidor não limita): o aviso do limite, com o WhatsApp. SMTP fora (`SMTP_TESTE=falha`): o aviso, com o WhatsApp e a mensagem escrita. Clique duplo: um envio só | Envia (a ação de servidor funciona sem script): 303 e a página de confirmação; o erro volta com os valores e o resumo no topo |
| **Galeria** | [P] [C] | Deslizar; setas; Tab | Cada item ao alcance do teclado; as setas desabilitadas nas pontas | Lista rolável ou grade |
| **Agenda** (módulo) | Módulo | Marcar; dois visitantes no mesmo horário; cancelar; o lembrete; o painel; outro fuso | A confirmação e o e-mail com o `.ics`; dois ao mesmo tempo: **uma reserva, e o outro lê "acabou de ser ocupado"**; abrir o vínculo de cancelamento não cancela, o envio cancela (seção 5.6) | A marcação inteira funciona sem script |
| **Funcionalidades do ofício** | [P] [C] | O fluxo de cada uma (exemplos abaixo) | O resultado exibido é o da função pura testada em unidade; a mensagem pronta traz o resultado | Diz o que fazer no lugar (`../esteira/14-funcionalidades/README.md`, regra 2) |

**As funcionalidades dos sites de exemplo** (no repositório do Atlas), como modelo:

| Site | Funcionalidade | Fluxo |
|---|---|---|
| Atlas | Montador de orçamento | Escolher plano e módulos; os totais mudam; "Preparar mensagem"; o vínculo do WhatsApp e o "Copiar" levam a mensagem com os totais |
| Atlas | Simulador de planos | Abrir pelo cartão; trocar plano e aparelho; navegar no site dentro do quadro; Esc fecha e devolve o foco ao cartão; sem script, o cartão abre o site numa aba nova |
| Depósito | Calculadora de materiais | Digitar "2,5" e "4"; a lista e as quantidades mudam; medida inválida desabilita o envio; o cupom mostra "—" |
| Depósito | Talão de orçamento | Lista vazia: o envio fica desabilitado; com lista: a mensagem traz nome, bairro e lista |
| Depósito | Estado da loja | Com relógio fixo: quarta às 10h (aberta, corte das 15h); sábado às 14h (fechada, abre segunda; o "Agora" não aparece na linha dos dias úteis) |
| Barbearia | Janela de retorno | A data do último corte e o intervalo dão a janela certa, inclusive na virada do mês |

**Objetivo.** Cada linha é uma promessa feita ao visitante ou ao cliente. As colunas "sem script" existem porque o site é HTML do servidor, e o script só acrescenta (`../esteira/00-principios.md`).

**De onde partir (repositório do Atlas).** Os 12 scripts de `.playwright-mcp/` (fora do git, ~1.000 linhas, presos à porta 3100, três deles de captura repetidos; `02-regua.md`, seção 11) são a base: portá-los cobre cerca de 80% dos fluxos desta tabela [FU: estimativa da pesquisa de QA de 07.10.2026]. É o primeiro conjunto de testes, antes de escrever fluxo novo (`13-integracao-continua.md`, seção 9, etapa 2).

---

## 5. Exemplos

[NV: os exemplos com nomes do Atlas (o montador, o simulador, o depósito) foram compilados na revisão de código de 08.10.2026 contra módulos mínimos; os rótulos e os valores não foram conferidos no repositório do Atlas.]

### 5.1 · O montador e a mensagem do WhatsApp

```ts
// tests/e2e/montador.spec.ts
import { expect, test } from "./vigia";

test("o plano e o módulo escolhidos chegam à mensagem e ao vínculo", { tag: "@webkit" }, async ({ page, problemas }) => {
  await page.goto("/orcamento");
  const plano = page.getByRole("group", { name: "Plano" });
  await plano.getByRole("button", { name: "Profissional" }).click();
  await expect(plano.getByRole("button", { name: "Profissional" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("group", { name: /Módulos/ }).getByRole("button", { name: "Agenda" }).click();

  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  const whatsapp = page.getByRole("link", { name: "Enviar no WhatsApp" });
  const href = await whatsapp.getAttribute("href");
  expect(href).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
  const mensagem = new URL(href!).searchParams.get("text");
  expect(mensagem).toContain("Plano Profissional.");
  expect(mensagem).toContain("Módulo: Agenda.");
  expect(mensagem).toContain("Criação: R$ 1.900. Mensalidade: R$ 330."); // a ata v3.0, IV.2
  await expect(whatsapp).toHaveAttribute("target", "_blank");
  await expect(whatsapp).toHaveAttribute("rel", /noopener/);
});

test("copiar: confirma só se a cópia deu certo", async ({ page, context, problemas }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/orcamento");
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  await page.getByRole("button", { name: "Copiar" }).click();
  await expect(page.getByText("Copiado")).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("Orçamento composto no site.");
});

test("copiar: sem área de transferência, diz que está indisponível", async ({ page, problemas }) => {
  // Recusa determinística: a permissão real varia de navegador para navegador.
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new Error("negado")) } });
  });
  await page.goto("/orcamento");
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  await page.getByRole("button", { name: "Copiar" }).click();
  await expect(page.getByText("Cópia indisponível")).toBeVisible();
});
```

*Os nomes ("Preparar mensagem", "Enviar no WhatsApp", "Copiar") e os grupos ("Plano", "Módulos") são os do repositório do Atlas. Localizar por papel e nome acessível é proposital: se o leitor de tela não acha o controle, o teste também não acha.*

### 5.2 · O menu: foco preso, Esc e o foco de volta

```ts
// tests/e2e/menu.spec.ts — no celular e no WebKit (o menu existe abaixo de 1024 px).
import { expect, test } from "./vigia";

test("o menu prende o foco, fecha com Esc e devolve o foco ao botão", { tag: "@webkit" }, async ({ page, problemas }, info) => {
  test.skip(info.project.name === "mesa", "menu do celular");
  await page.goto("/");
  const botao = page.getByRole("link", { name: "Menu" });
  await botao.click();
  const painel = page.getByRole("dialog");
  await expect(painel).toBeVisible();
  await expect(painel.getByRole("navigation", { name: "Menu" })).toBeVisible();

  // O Tab não sai do painel: 30 paradas, todas dentro dele.
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Tab");
    expect(await painel.evaluate((p) => p.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(painel).toBeHidden();
  await expect(botao).toBeFocused();
});

test.describe("sem script", () => {
  test.use({ javaScriptEnabled: false });
  test("Menu leva ao índice da página", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Menu" })).toHaveAttribute("href", "#indice");
    await expect(page.locator("#indice")).toBeAttached();
  });
});
```

### 5.3 · Âncora malformada, página inexistente e o globo depois da navegação

```ts
// tests/e2e/navegacao.spec.ts
import { expect, test } from "./vigia";

for (const endereco of ["/#%E0", "/#%", "/#", "/#nao-existe"]) {
  test(`âncora ${endereco} não derruba a página (defeito de 03/10)`, async ({ page, problemas }) => {
    await page.goto(endereco);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Esta página não abriu.")).toHaveCount(0);
  });
}

test("página inexistente: 404, noindex e sem o canônico da capa (corrigido em 07/10)", async ({ page }) => {
  const resposta = await page.goto("/nao-existe");
  expect(resposta?.status()).toBe(404);
  await expect(page).toHaveTitle(/Página não encontrada/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.getByRole("link", { name: /início/i }).first()).toBeVisible();
});

test.describe("com movimento", () => {
  test.use({ reducedMotion: "no-preference" });
  test("o globo de O Atlas gira também quando a página é aberta pela navegação interna (corrigido em 07/10)", async ({ page, problemas }, info) => {
    test.skip(info.project.name !== "celular", "no toque, o giro vem ao aparecer; com ponteiro, do hover");
    await page.goto("/");
    await page.getByRole("link", { name: "Menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "O Atlas" }).click();
    await expect(page).toHaveURL(/\/o-atlas$/);
    const globo = page.locator("main [data-globo]").first();
    await globo.scrollIntoViewIfNeeded();
    await expect.poll(() => globo.evaluate((g) => g.getAnimations({ subtree: true }).length), { timeout: 2000 }).toBeGreaterThan(0);
  });
});
```

*O teste do globo depende de o Chromium emulado responder `(hover: none)` no projeto do celular. Confirme na primeira rodada [NV]. Se não responder, o teste vira um teste de unidade da regra (`naTela` e a procura a cada troca de caminho).*

### 5.4 · As páginas de erro

As telas de erro em português entraram em 07.10.2026 e **não foram exercitadas**: nenhuma página quebra hoje (registro do repositório do Atlas). Duas verificações:

```ts
// tests/e2e/erro.spec.ts
import { readFileSync } from "node:fs";
import { expect, test } from "./vigia";

test("a página de erro global sai do build em português", () => {
  // O Next pré-renderiza a página de erro global; até 07/10, ela saía sem lang e em inglês.
  const html = readFileSync(".next/server/app/_global-error.html", "utf8");
  expect(html).toMatch(/<html[^>]*lang="pt-BR"/);
  expect(html).toContain("Tentar de novo");
});

test("um erro de renderização mostra a tela de erro do site", async ({ page }) => {
  test.skip(process.env.ATLAS_ROTAS_DE_TESTE !== "1", "precisa da rota de teste (abaixo)");
  await page.goto("/ferramentas/erro");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Esta página não abriu.");
  await expect(page.getByRole("button", { name: "Tentar de novo" })).toBeVisible();
});
```

```tsx
// app/ferramentas/erro/page.tsx — RATIFICADO: a rota só lança com a variável de teste,
// lida no servidor a cada pedido; sem ela, é uma 404 (como a rota das telas da vitrine).
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default function ErroDeTeste() {
  if (process.env.ATLAS_ROTAS_DE_TESTE !== "1") notFound();
  throw new Error("Erro provocado pelo teste de ponta a ponta.");
}
```

*O servidor de teste sobe com `ATLAS_ROTAS_DE_TESTE=1 npm run start`; o de produção, nunca. A régua já ignora `/ferramentas`.*

**Atenção (achado ao aplicar a revisão de código, 08.10.2026):** no Next 16.3.8, o `_global-error.html` do build não sai da `global-error.tsx` do site. É a página estática de 500 do próprio Next (`next/dist/client/components/builtin/app-error.js`: "500: This page couldn’t load", `<html id="__next_error__">`, sem `lang`), conferida no build do Atlas de 08.10. O primeiro teste acima, como está, reprova em todo build. A `global-error.tsx` (que chama o `retry` e traz as fontes do site) só aparece quando o próprio layout raiz lança [NV: como provocá-la num teste, e se o arquivo estático deve ser conferido de outro modo].

### 5.5 · Tempo: o estado da loja com relógio fixo

```ts
// tests/e2e/deposito.spec.ts
import { expect, test } from "./vigia";

test("sábado às 14h: fechada, abre segunda, e o 'Agora' some da linha dos dias úteis", async ({ page, problemas }) => {
  await page.clock.setFixedTime(new Date("2026-10-10T14:00:00-03:00")); // um sábado
  await page.goto("/demos/deposito");
  await expect(page.getByText("Fechado agora · abre seg., 7h")).toBeVisible();
  await page.goto("/demos/deposito/entrega");
  await expect(page.getByText(/^Agora · /)).toHaveCount(0); // até 07/10, aparecia sobre a linha dos dias úteis
});

test("quarta às 10h: o 'Agora' marca a hora na linha do dia", async ({ page, problemas }) => {
  await page.clock.setFixedTime(new Date("2026-10-07T10:00:00-03:00")); // uma quarta
  await page.goto("/demos/deposito/entrega");
  await expect(page.getByText("Agora · 10h00")).toBeVisible();
});

test("quarta às 10h: aberta, e o corte das 15h conta o que falta", async ({ page, problemas }, info) => {
  test.skip(info.project.name !== "mesa", "a contagem do corte aparece a partir de 768 px");
  await page.clock.setFixedTime(new Date("2026-10-07T10:00:00-03:00")); // uma quarta
  await page.goto("/demos/deposito");
  await expect(page.getByText("Aberto agora · fecha às 18h")).toBeVisible();
  await expect(page.getByText(/Pedido até 15h sai hoje · faltam 5h00/)).toBeVisible(); // a partir de 768 px
});
```

**Regra do tempo.** Toda data de teste é **explícita, com o fuso** (`-03:00`), e escolhida pelo caso: sábado, domingo, um minuto antes de fechar, a virada do mês. Nunca a data de hoje. *Os textos ("Fechado agora", "abre", "Agora") vêm do conteúdo do site de exemplo (`status` e `entrega.dia` em `conteudo/demos/deposito.ts`, no repositório do Atlas). A contagem do corte só aparece a partir de 768 px (`md:inline`): esse teste roda só no projeto da mesa.*

### 5.6 · A Agenda: a corrida pelo mesmo horário

A defesa contra a marcação dupla está no banco: o dia dividido em blocos de 15 minutos, numa tabela com **chave única** no profissional e no bloco; a reserva e os blocos gravados na mesma transação (`../esteira/14-funcionalidades/05-agenda.md`, seções 3 e 5). O teste prova que a defesa funciona **pelo caminho do visitante**:

```ts
// tests/e2e/agenda.spec.ts — exige o banco de teste (abaixo) e o SEGREDO_DO_FORMULARIO de teste no ambiente
// do servidor e do teste. Os nomes dos grupos e dos botões são ilustrativos: use os da página do módulo.
import { createHmac } from "node:crypto";

import { expect, test, type Page } from "@playwright/test";

// As tabelas da Agenda são limpas antes de cada teste (beforeEach): em paralelo, um teste apagaria a reserva
// do vizinho. Por isso, em série, e num projeto só (abaixo).
test.describe.configure({ mode: "serial" });

/** Um carimbo emitido há 10 s, com o segredo de teste: sem ele, o envio feito logo depois de abrir a página cai no
 *  "rápido demais" (menos de 3 s, 02-formulario.md, seção 5.2), e nenhum dos dois desfechos aparece. */
function carimboAntigo() {
  const emitido = String(Date.now() - 10_000);
  return `${emitido}.${createHmac("sha256", process.env.SEGREDO_DO_FORMULARIO!).update(emitido).digest("base64url")}`;
}

/** Espera o desfecho de um pedido: a página de confirmação, ou o aviso de horário ocupado. */
async function desfecho(p: Page) {
  await expect
    .poll(async () => /\/agendar\/confirmado$/.test(p.url()) || (await p.getByText(/acabou de ser ocupado/).count()) > 0, { timeout: 10_000 })
    .toBe(true);
  return /\/agendar\/confirmado$/.test(p.url()) ? "reservada" : "ocupado";
}

test("dois visitantes, o mesmo horário: uma reserva, e o outro é avisado", async ({ browser }, info) => {
  test.skip(info.project.name !== "mesa", "o banco de teste é um só: a Agenda roda num projeto");
  // Um "IP" por visitante e por rodada (o servidor lê o último x-forwarded-for): o limite de 5 por hora
  // não se acumula entre os testes, os projetos e as repetições.
  const contextos = await Promise.all(
    [1, 2].map((n) =>
      browser.newContext({ extraHTTPHeaders: { "x-forwarded-for": `teste-${info.testId}-${info.repeatEachIndex}-${info.retry}-${n}` } }),
    ),
  );
  const paginas = await Promise.all(contextos.map((c) => c.newPage()));
  // O mesmo endereço de escolha para os dois: serviço, profissional e dia no endereço, como o
  // <Form action="/agendar"> do módulo monta (o formato exato está no módulo).
  const endereco = process.env.AGENDA_ENDERECO_DE_TESTE ?? "/agendar";
  await Promise.all(paginas.map((p) => p.goto(endereco)));

  // O primeiro horário oferecido na primeira página, e o mesmo na segunda, pelo valor (o instante).
  // O nome acessível vem do <label>, não do aria-label nem do texto do rádio, e o getByRole compara por trecho.
  const valor = await paginas[0].getByRole("group", { name: /Horário/ }).getByRole("radio").first().getAttribute("value");
  expect(valor, "o rádio do horário leva o instante no value").toBeTruthy();
  for (const [i, p] of paginas.entries()) {
    await p.locator(`input[type="radio"][value="${valor}"]`).check();
    await p.getByLabel("Nome").fill(`Visitante ${i + 1}`);
    await p.getByLabel("E-mail").fill(`visitante${i + 1}@exemplo.invalid`);
    await p.locator('input[name="carimbo"]').evaluate((campo, v) => void ((campo as HTMLInputElement).value = v), carimboAntigo());
  }
  // Os dois reservam ao mesmo tempo.
  await Promise.all(paginas.map((p) => p.getByRole("button", { name: /Reservar|Confirmar/ }).click()));

  expect((await Promise.all(paginas.map(desfecho))).sort()).toEqual(["ocupado", "reservada"]);
  await Promise.all(contextos.map((c) => c.close()));
});
```

**O relógio do navegador não é o do servidor.** Os horários livres são calculados no servidor, com o agora do servidor. O `page.clock` não os muda; ele serve à lógica que roda no aparelho, como o estado da loja do depósito. Por isso a corrida usa o primeiro horário oferecido, qualquer que seja o dia. A lógica de tempo da Agenda se prova em unidade, com o agora como argumento (`04-unidade.md`, seção 4.6).

**O banco de teste.**
- **Nunca o de produção.** O teste recusa rodar se o nome do banco não terminar em `_teste`.
- **Limpo antes de cada teste:** as tabelas de reserva e de blocos esvaziadas por um script, no `beforeEach`, com o arquivo da Agenda em série e num projeto só. O limite por IP se isola com um `x-forwarded-for` próprio por teste (o servidor lê o último valor), e o carimbo, com o segredo de teste.
- **O e-mail de teste:** com `SMTP_TESTE=1`, o envio vira uma linha em `.teste/emails.jsonl` (`../esteira/14-funcionalidades/02-formulario.md`, seção 9). O teste lê o arquivo. **Com `STANDALONE=1`**, o arquivo fica em `.next/standalone/.teste/emails.jsonl`: o `server.js` muda a pasta de trabalho para a dele (`process.chdir(__dirname)`).
- **O texto na resposta crua:** o Next leva os textos das ilhas dentro de `<script>`. Num teste por `request.post`, procurar "acabou de ser ocupado" no HTML acha a frase em qualquer resposta 200. Confira o texto fora de `<script>`, ou pela página (`getByText`), que só vê o que se desenha.
- **Na integração contínua:** um contêiner MySQL da mesma versão principal da Hostinger. A versão se confere com `SELECT VERSION()` (A CONFIRMAR no módulo, seção 3).

**O que mais se testa na Agenda** (`../esteira/14-funcionalidades/05-agenda.md`, seções 8, 9 e 16):

| Caso | Afirmação |
|---|---|
| Abrir o vínculo `/cancelar/<código>` | **Não** cancela: a página mostra a reserva e o botão "Cancelar a reserva". Filtros de e-mail e prévias de mensagem abrem os vínculos sozinhos |
| Enviar o formulário de cancelamento | Cancela, e o horário volta à lista |
| Código inventado; código usado duas vezes; depois do prazo (3 horas antes) | "Reserva não encontrada", sem dizer se o código existiu; "Esta reserva já foi cancelada"; a explicação e o WhatsApp da casa |
| O lembrete: uma reserva para daqui a 20 horas, gravada com `criada_em` de mais de 24 horas antes | A chamada com o segredo envia um lembrete; a segunda não envia de novo; a reserva feita há 10 minutos para amanhã não recebe lembrete (a confirmação acabou de sair); sem o segredo, 401 |
| Outro fuso no navegador (`timezoneId: "Asia/Tokyo"`) | Os horários continuam os de Niterói |
| O painel | Senha errada; o limite de tentativas; o cookie com `HttpOnly`, `Secure`, `SameSite=Lax` e `Path=/painel`, a única gravação no aparelho permitida; a ação do painel chamada sem sessão é recusada; a saída apaga o cookie de `/painel` no navegador |
| A régua em `/agendar` e `/cancelar` | Nenhum cookie nem gravação no aparelho nas páginas públicas |
| Envio forçado (`request.post`): horário fora da lista, profissional que não faz o serviço, reserva no passado, data além de 30 dias (a antecedência máxima), data inexistente ("2026-13-45"), 50 reservas seguidas do mesmo IP | Recusados pelo servidor (`09-seguranca-e-privacidade.md`, seção 5) |

---

## 6. Determinismo

| Regra | Como |
|---|---|
| Esperar sinais, nunca tempo fixo | Nunca `waitForTimeout`. Use as asserções que esperam (`await expect(...).toBeVisible()`), `expect.poll` e os sinais da página: `await document.fonts.ready` antes de medir texto, e `canvas[data-pronto]` no 3D (a ilha marca o atributo quando desenha o primeiro quadro) |
| Relógio fixo em todo teste que depende de hora | `page.clock.setFixedTime(...)` antes do `goto` (https://playwright.dev/docs/clock) [V] |
| Fuso e idioma fixos | `timezoneId` e `locale` na configuração |
| Movimento reduzido por padrão nas asserções visuais | `reducedMotion: "reduce"` no teste que mede posição; `"no-preference"` só no teste do próprio movimento |
| Rede isolada | A página vigiada intercepta todo domínio externo |
| Dados isolados | Banco de teste limpo antes de cada teste; nenhum teste depende da ordem dos outros (`fullyParallel`) |
| Localizar como o visitante | Por papel e nome acessível (`getByRole`), depois por rótulo e texto. `data-testid` só quando não houver nome |
| Teste instável vai para a quarentena | Marcado com `test.fixme` e um relatório de defeito (`modelos/relatorio-de-defeito.md`), por **no máximo uma semana**: consertado ou apagado. Não se aumenta a espera para "resolver" |
| A instabilidade se procura de noite | Cada teste rodado três vezes (`npx playwright test --repeat-each=3`), fora do caminho da publicação (`13-integracao-continua.md`) |

**Objetivo.** "Um teste que falha às vezes ensina a ignorar todos" (`01-metodologia.md`, seção 3).

---

## 7. O teste de fumaça, no endereço publicado

**Regra.** Depois de cada publicação, uma bateria curta roda contra o **endereço publicado**, não contra a máquina local.

**Objetivo.** O build local não prova a publicação. O `public/` dava 404 no modo standalone (03.10), defeito que só existe no servidor. A Hostinger compila de novo, e o cabeçalho de segurança pode não chegar. Uma variável de ambiente pode faltar.

**Como fazer.**

```ts
// tests/fumaca/fumaca.spec.ts — BASE=https://<domínio> npx playwright test tests/fumaca
import { expect, test } from "@playwright/test";

test("o endereço publicado responde como o build local", async ({ page, request }) => {
  const resposta = await page.goto("/");
  expect(resposta?.status()).toBe(200);
  const cabecalhos = resposta!.headers();
  expect(cabecalhos["strict-transport-security"]).toContain("max-age=");
  expect(cabecalhos["content-security-policy"]).toContain("default-src 'self'");

  // A CDN da Hostinger pode responder a pedido fora do navegador com uma página de verificação
  // (../esteira/15-desempenho.md, seção 4.7). Se os status vierem estranhos, abra os arquivos com page.goto.
  for (const arquivo of ["/robots.txt", "/sitemap.xml", "/llms.txt", "/icon.svg"]) { // o llms.txt desde 16.10.2026 (../esteira/21-busca-e-ias.md)
    expect((await request.get(arquivo)).status(), arquivo).toBe(200);
  }
  const imagem = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect((await request.get(imagem!)).status()).toBe(200); // a imagem de compartilhamento abre
  const http = await request.get(new URL("/", page.url()).href.replace("https:", "http:"), { maxRedirects: 0 });
  expect([301, 308]).toContain(http.status()); // HTTP leva ao HTTPS
});
```

*A régua também roda contra o endereço publicado (`npm run regua -- --base=https://…`), mas é longa. A fumaça é o mínimo que diz "a publicação deu certo"; a régua inteira entra na lista de publicação (`14-ciclo-de-qa.md`, seção 5).*

**Como conferir.** A fumaça passa até 15 minutos depois de cada publicação, e o resultado entra no registro da publicação.

---

## 8. Quando escrever o teste

| Momento | Teste |
|---|---|
| Funcionalidade nova | O fluxo com script e sem script, **antes** de dizer "pronto" |
| Defeito corrigido | Um teste que reproduzia o defeito e agora passa (`01-metodologia.md`, seção 9). O de `/#%E0` e o do sábado do depósito são desse tipo |
| Mudança de conteúdo | Nenhum teste novo; os existentes não podem quebrar por texto (localize por papel, e não por frase inteira, salvo quando a frase é o que se testa) |
| Atualização do Next ou do React | A bateria inteira, nos dois projetos (`../esteira/18-publicacao-e-manutencao.md`, seção 8) |

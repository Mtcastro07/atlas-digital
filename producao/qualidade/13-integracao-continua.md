# 13 · Integração contínua

> **Para que serve.** Como as verificações das outras camadas viram **portas** entre um envio e o ar:
> - os trabalhos no GitHub Actions e o custo deles;
> - a publicação por um ramo que só avança quando tudo passa;
> - a homologação;
> - os ganchos locais e os ganchos do Claude Code;
> - as rodadas noturnas;
> - a ordem de adoção.
>
> **Estado.** RATIFICADO como plano em 08.10.2026, com a ordem de adoção da seção 9. **Nada foi configurado:** o usuário pediu, em 07.10.2026, "reconheça como podemos criar uma esteira de quality assurance [...] utilizando testes e integrações contínuas. Apenas busque entender, sem colocar nada na prática, ainda", e a ratificação aprovou o plano, sem pedir a implantação. Cada etapa entra quando for implantada, com as dependências dela, cobertas pela aprovação das dependências necessárias de 08.10.2026. Os arquivos abaixo são os modelos dessa implantação. Versões e preços de outubro de 2026.

---

## 1. O buraco de hoje

**O fato.** A Hostinger publica **cada envio para a `main`** pela integração com o GitHub (https://docs.hostinger.com/node.js/github.md) [FU]. Nada fica entre um envio e o ar. A régua só vale se alguém lembrar de rodá-la, e o teste que ninguém rodou não protege ninguém.

**A regra que se propõe.** Nada chega ao ar sem passar pelas portas automáticas. A Hostinger deixa de publicar a `main` e passa a publicar o ramo `producao`, e só a integração contínua avança esse ramo (seção 4).

---

## 2. Os trabalhos

| Trabalho | O que roda | Tempo | Quando |
|---|---|---|---|
| **`estatico`** | Instalação com cache, `next typegen` e `tsc`, ESLint, Prettier, testes de unidade, `npm audit --omit=dev` | ~3 min | Todo envio |
| **`build`** | `next build` com o cache do `.next`; a verificação do CSS compilado (`03`, seção 5); o `html-validate` (`03`, seção 7); os protótipos de conteúdo e de peso por rota sobre o HTML pré-renderizado (`10`, seção 7; `08`, seção 10); o script de termos do nicho (`10`, seção 3) | ~4 min | Todo envio |
| **`e2e`** | Dentro do contêiner do Playwright (que já traz os navegadores; não se cacheiam navegadores): o servidor de produção, a régua, os testes de ponta a ponta, o axe, a regressão visual, os cabeçalhos. Relatórios e rastros guardados por 14 dias | ~8–10 min | Todo envio |
| **`desempenho`** | O Lighthouse, pelo método de `08-desempenho.md`, contra a `main` anterior | ~10 min | Só nas mudanças marcadas `perf`, de noite e na `main` |
| **`porta`** | Junta todos e só passa se **todos** passaram | Segundos | Todo envio |
| **`promover`** | Avança o ramo `producao` até o commit que passou | Segundos | Só na `main` |

**Por que o trabalho `porta`.** No GitHub, um trabalho **pulado** conta como "sucesso". Sem a porta que confere o resultado de cada um, um trabalho que não rodou deixaria passar tudo. Pelo mesmo motivo, o gatilho do fluxo não leva filtros de `paths`: um filtro que impede o fluxo de rodar deixa as verificações obrigatórias pendentes, sem resultado. Quando um trabalho só deve rodar em certas mudanças, a condição vai em `if` no próprio trabalho, e a `porta` a trata de forma explícita [FU: pesquisa de QA de 07.10.2026].

**O arquivo, como exemplo** (no repositório do Atlas, a aplicação fica em `web/`; num repositório de cliente, na raiz):

```yaml
# .github/workflows/qualidade.yml — RATIFICADO, não configurado.
name: qualidade
on:
  push: { branches: [main] }
  pull_request:
  schedule: [{ cron: "0 6 * * *" }] # 03h em Brasília: a rodada noturna (seção 8)

permissions: { contents: read }
concurrency: { group: "qualidade-${{ github.ref }}", cancel-in-progress: true } # um envio novo cancela a rodada velha do mesmo ramo
defaults: { run: { working-directory: web } }

jobs:
  estatico:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<sha de 40 caracteres> # v4 — ações sempre fixadas pelo hash (09, seção 7)
      - uses: actions/setup-node@<sha> # v4
        with: { node-version: 22, cache: npm, cache-dependency-path: web/package-lock.json }
      - run: npm ci
      - run: npx next typegen && npx tsc --noEmit
      - run: npx eslint . --max-warnings=0
      - run: npx prettier --check .
      - run: npx vitest run
      - run: npm audit --omit=dev --audit-level=high

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<sha> # v4
      - uses: actions/setup-node@<sha> # v4
        with: { node-version: 22, cache: npm, cache-dependency-path: web/package-lock.json }
      - uses: actions/cache@<sha> # v4 — o cache de build do Next (nextjs.org/docs/app/guides/ci-build-caching)
        with:
          path: web/.next/cache
          key: next-${{ hashFiles('web/package-lock.json') }}-${{ hashFiles('web/**/*.ts', 'web/**/*.tsx', 'web/**/*.css') }}
          restore-keys: next-${{ hashFiles('web/package-lock.json') }}-
      - run: npm ci && npm run build
      - run: node ferramentas/verificar-css.mjs
      - run: npx html-validate ".next/server/app/**/*.html"

  e2e:
    runs-on: ubuntu-latest
    container: { image: mcr.microsoft.com/playwright:v1.64.0-noble, options: --ipc=host }
    steps:
      - uses: actions/checkout@<sha> # v4
      - run: npm ci && npm run build
        env: { STANDALONE: "1" } # o mesmo modo que a Hostinger roda (05, seção 2)
      # De noite, cada teste três vezes: revela o instável sem travar a publicação.
      # HOSTNAME: o Docker põe nesta variável o nome do contêiner, e o server.js standalone escuta nela
      # (process.env.HOSTNAME || '0.0.0.0'): ficaria só no IP do contêiner, e o localhost do teste e do curl
      # daria conexão recusada.
      - run: npx playwright test ${{ github.event_name == 'schedule' && '--repeat-each=3' || '' }}
        env: { CI: "1", STANDALONE: "1", HOSTNAME: "0.0.0.0" }
      - run: |
          node .next/standalone/server.js &
          for i in $(seq 60); do curl -sf http://localhost:3000/ > /dev/null && break; sleep 1; done
          npm run regua
        env: { PORT: "3000", HOSTNAME: "0.0.0.0" }
      - uses: actions/upload-artifact@<sha> # v4
        if: ${{ !cancelled() }}
        with:
          name: relatorios
          retention-days: 14
          path: |
            web/playwright-report
            web/.regua

  porta:
    if: ${{ always() }}
    needs: [estatico, build, e2e]
    runs-on: ubuntu-latest
    steps:
      # Pulado conta como sucesso no GitHub; aqui, só "success" passa.
      - run: echo '${{ toJSON(needs) }}' | jq -e 'all(.[]; .result == "success")'
        working-directory: .

  promover:
    if: ${{ github.event_name == 'push' && github.ref == 'refs/heads/main' }}
    needs: porta
    runs-on: ubuntu-latest
    permissions: { contents: write }
    steps:
      - uses: actions/checkout@<sha> # v4
        with: { fetch-depth: 0 }
      # Sem --force: o envio só acontece se for avanço rápido; a Hostinger publica o ramo producao.
      - run: git push origin HEAD:refs/heads/producao
        working-directory: .
```

*Na integração contínua, a régua precisa usar o Chromium do contêiner: tire o `channel: "chrome"` da linha do `chromium.launch` ou condicione-o (`02-regua.md`, seção 9). O `STANDALONE` depende de o `next.config.ts` ligar o `output` por variável (`05-ponta-a-ponta.md`, seção 2). O `server.js` standalone escuta em `process.env.HOSTNAME || '0.0.0.0'` (a documentação do Next dá o exemplo `PORT=8080 HOSTNAME=0.0.0.0 node server.js`, `05-config/01-next-config-js/output.md`), e no contêiner o Docker já põe ali o nome dele: sem o `HOSTNAME: "0.0.0.0"` dos dois passos, o servidor não responde em `localhost`, e o trabalho `e2e` reprova em todo envio. Num site com formulário ou Agenda, o trabalho `e2e` precisa ainda do `SEGREDO_DO_FORMULARIO` de teste, do `SMTP_TESTE: "1"` e de um serviço MySQL (`services:`), como pede `05-ponta-a-ponta.md`, seção 5.6; o exemplo, do repositório do Atlas, não os declara. Os hashes das ações ficam como `<sha>`: copie-os da página de versões de cada ação, conferidos, no dia da configuração.*

---

## 3. O custo

| Item | Valor (outubro de 2026) [FU] |
|---|---|
| Uma rodada inteira | 15 a 20 minutos de máquina |
| Minutos grátis por mês, repositório privado, plano gratuito | 2.000 |
| Acima disso, Linux | US$ 0,006 por minuto |
| macOS | Cerca de dez vezes mais caro (US$ 0,062 por minuto). **Não usar** |
| Máquina padrão do repositório privado | 2 núcleos, 8 GB |

**A conta.** Quatro envios por dia útil × 20 dias × 18 minutos dão ~1.440 minutos por mês, dentro do grátis. Com a rodada noturna (~20 min × 30 noites = 600), fica perto do limite. **Regra:** a rodada noturna completa só no repositório do Atlas; nos sites de cliente, uma vez por semana e na manutenção mensal.

---

## 4. A porta antes do ar, sem plano pago

**Regra.** A Hostinger publica o ramo `producao` (`../esteira/18-publicacao-e-manutencao.md`, seção 6.1). A integração contínua avança `producao` até cada commit da `main` que passou em tudo, só por avanço rápido. Depois que ela existir, ninguém envia para `producao` à mão, salvo a volta de emergência, a pedido explícito (`../esteira/18-publicacao-e-manutencao.md`, seção 6.3). **Até ela existir:** quem publica roda a régua contra o build local e só então avança `producao` (`git push origin main:producao`), a pedido explícito do sócio responsável.

**Objetivo.** A proteção de ramo com verificações obrigatórias, em repositório privado, exige o GitHub Pro ou o Team, e o repositório do Atlas está numa conta pessoal gratuita [FU]. O ramo promovido dá a mesma garantia sem custo: o que não passou não chega ao ar.

**Como fazer.**
1. Criar o ramo `producao` a partir da `main` atual.
2. No painel do web app da Hostinger, trocar o ramo publicado de `main` para `producao`.
3. Ativar o trabalho `promover` (seção 2).
4. **Quando o trabalho passar a ser por pedido de mescla:** com o GitHub Pro (cerca de US$ 4 por mês) [FU], a `main` ganha a proteção de ramo e as verificações obrigatórias.

**Como conferir.** Um envio com um teste quebrado de propósito, num ramo de teste mesclado à `main`, não chega ao ar: a `porta` falha, e `producao` fica onde estava.

**Varia por.** Publicação de emergência (falha de segurança, `09`, seção 7): a correção passa pelas mesmas portas. Se uma porta estiver quebrada por motivo alheio, quem decide pular é o sócio de desenvolvimento, por escrito, e a porta é consertada no mesmo dia.

---

## 5. A homologação

**Regra.** O rascunho e as rodadas ficam no endereço temporário do próprio site, fora das buscas (`../esteira/18-publicacao-e-manutencao.md`, seção 6.2). Esta seção trata da **homologação permanente**, opcional e só para web app Node: um segundo web app, se a cota permitir (A CONFIRMAR). No site estático, não se aplica.

**Objetivo.** A Hostinger não tem pré-visualização por mudança. Conferir na máquina de quem constrói não prova o servidor; conferir na produção expõe o visitante ao erro.

**Como fazer.**
1. Um segundo web app na Hostinger, num subdomínio gratuito, publica o ramo `homologacao`.
2. Ele leva `X-Robots-Tag: noindex`, ligado por variável de ambiente no `next.config.ts`:

   ```ts
   // Trecho do next.config.ts: na homologação, nenhuma página entra em busca.
   const homologacao = process.env.SITE_HOMOLOGACAO === "1";
   const seguranca = [
     // ...os cabeçalhos de 09-seguranca-e-privacidade.md, seção 3
     ...(homologacao ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
   ];
   ```

3. **Antes de criar:** confirmar quantos web apps de Node o plano Business comporta [NV]. Cada cliente com servidor próprio (Agenda) também ocupa uma vaga.

**Como conferir.** `curl -sI https://<homologação>/ | grep -i x-robots-tag` responde `noindex`.

---

## 6. Os ganchos locais (lefthook)

**Regra.** Ganchos do git rápidos, que não atrapalham:

| Gancho | O que roda | Teto |
|---|---|---|
| Antes do commit | Prettier e ESLint **nos arquivos alterados**; a busca de segredos (`09`, seção 6) | ~5 s |
| Antes do envio | Tipos e testes de unidade | ~1 min |
| **Nunca** nos ganchos | Testes de ponta a ponta, a régua, o Lighthouse | — |

**Objetivo.** Gancho lento é gancho desligado (`--no-verify`). O que demora fica na integração contínua.

**Por que o lefthook, e não o husky com o lint-staged.** O lefthook aceita `root` (a aplicação em `web/`), roda os comandos em paralelo e devolve ao commit os arquivos que o Prettier reformatou (`stage_fixed`), sem outra dependência [FU: pesquisa de QA de 07.10.2026].

**Como fazer** (`lefthook`, dependência de desenvolvimento a pedir):

```yaml
# lefthook.yml — na raiz do repositório. RATIFICADO.
pre-commit:
  parallel: true
  commands:
    formatar:
      root: "web/"
      glob: "*.{ts,tsx,css,json,md}"
      run: npx prettier --write {staged_files}
      stage_fixed: true # os arquivos formatados voltam ao commit
    lint:
      root: "web/"
      glob: "*.{ts,tsx}"
      run: npx eslint --max-warnings=0 {staged_files}
    segredos:
      run: node web/ferramentas/procurar-segredos.mjs {staged_files}
pre-push:
  commands:
    tipos:
      root: "web/"
      run: npx next typegen && npx tsc --noEmit
    unidade:
      root: "web/"
      run: npx vitest run
```

*Com `root`, o lefthook entrega os caminhos relativos à pasta indicada; segundo a documentação, o `glob` se calcula a partir da raiz do repositório, e o `root` não o afeta. Confira o comportamento na versão instalada [NV: não executado; se `*.{ts,tsx}` casa arquivos em subpastas com o casador padrão, e como `{staged_files}` sai relativo ao `root`].*

```js
// ferramentas/procurar-segredos.mjs — recebe os arquivos do commit; reprova o que parece segredo.
import { readFileSync } from "node:fs";

const PADROES = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  // Atribuição de segredo em início de linha (.env, export do shell): os nomes da esteira (02-formulario, seção 4;
  // 05-agenda) e os genéricos. "process.env.X = …" de teste não casa: o nome não está no começo da linha.
  // [ \t] e não \s em volta do "=": o \s passaria a quebra de linha, e o .env.exemplo vazio pareceria segredo.
  /^[ \t]*(?:export[ \t]+)?(SMTP_SENHA|SMTP_PASS\w*|BANCO_SENHA|DATABASE_URL|SEGREDO_\w+|GOOGLE_CONTA_CHAVE)[ \t]*=[ \t]*\S+/m,
  /mysql:\/\/[^\s:]+:[^\s@]+@/, // conexão com senha
  /\bAKIA[0-9A-Z]{16}\b/, // chave da AWS
  /\bgh[pousr]_[A-Za-z0-9]{36,}\b/, // token do GitHub
];
let achados = 0;
for (const arquivo of process.argv.slice(2)) {
  if (/(^|\/)\.env(\.[\w-]+)?$/.test(arquivo) && !/\.env\.(exemplo|example)$/.test(arquivo)) {
    console.error(`${arquivo}: arquivo de ambiente não vai ao repositório (só o .env.exemplo, sem valores)`);
    achados++;
    continue;
  }
  if (/\.(png|jpe?g|webp|avif|woff2?|ico)$/i.test(arquivo)) continue;
  const texto = readFileSync(arquivo, "utf8");
  for (const padrao of PADROES) {
    if (padrao.test(texto)) {
      console.error(`${arquivo}: parece segredo (${padrao})`);
      achados++;
    }
  }
}
process.exitCode = achados ? 1 : 0;
```

---

## 7. Os ganchos do Claude Code

**Regra.** No repositório, um `.claude/settings.json` compartilhado faz duas coisas:
- **depois de cada edição**, formata e confere o arquivo editado, e o erro volta para o Claude corrigir;
- **ao terminar**, segura o fim enquanto os tipos, o lint e os testes de unidade não passarem.

**Objetivo.** "Instrução em arquivo é pedido; gancho é garantia." As regras da casa estão escritas no `CLAUDE.md` e já foram desobedecidas sem que nada acusasse. Com o gancho, o Claude Code não consegue dizer "pronto" com o lint vermelho.

**Como funciona** (https://code.claude.com/docs/en/hooks) [V na pesquisa de 07.10.2026]:
- **`PostToolUse`** com o filtro `Edit|MultiEdit|Write`: roda depois de cada edição. Código de saída **2** devolve o texto da saída de erro ao Claude, que corrige.
- **`Stop`:** roda quando o Claude vai terminar. A resposta `{"decision": "block", "reason": "…"}` o faz continuar, com o motivo.
  - **O laço:** a entrada traz `stop_hook_active` quando ele já está continuando por causa do gancho. O gancho precisa evitar prender o Claude em laço, e o próprio Claude Code limita as continuações seguidas a 8 [FU: pesquisa de QA de 07.10.2026; conferir na documentação dos ganchos antes de ativar].
  - **O tempo:** o limite padrão de cada gancho é de 600 s.

**Como fazer.** O `.claude/settings.json` (RATIFICADO, não configurado; no repositório de cliente, os dois comandos perdem o `/web`, porque a aplicação fica na raiz):

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|MultiEdit|Write",
        "hooks": [{ "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR\"/web/ferramentas/ganchos/depois-de-editar.mjs" }]
      }
    ],
    "Stop": [
      {
        "hooks": [{ "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR\"/web/ferramentas/ganchos/ao-terminar.mjs", "timeout": 600 }]
      }
    ]
  },
  "permissions": {
    "deny": ["Edit(historico/**)", "Write(historico/**)"],
    "ask": ["Edit(juridico/**)", "Write(juridico/**)", "Edit(comercial/**)", "Write(comercial/**)", "Bash(git push:*)", "Bash(git commit:*)"]
  }
}
```

**Por que as permissões são assim:**
- **`historico/` fica negado:** é registro e nunca se edita.
- **`juridico/`, `comercial/`, o commit e o envio pedem confirmação:** são só leitura **salvo pedido**, e o commit e o envio exigem pedido explícito (`CLAUDE.md`).
- **A sintaxe dos caminhos e dos comandos** confere-se na documentação de permissões antes de ativar [NV].

```js
// ferramentas/ganchos/depois-de-editar.mjs — formata e confere o arquivo editado.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const entrada = JSON.parse(readFileSync(0, "utf8"));
const arquivo = entrada.tool_input?.file_path ?? "";
const raiz = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
// No repositório do Atlas, a aplicação fica em web/; no do cliente, na raiz.
const app = existsSync(path.join(raiz, "web", "package.json")) ? path.join(raiz, "web") : raiz;
if (!arquivo.startsWith(app + path.sep) || !/\.(ts|tsx|css|mjs)$/.test(arquivo)) process.exit(0);

try {
  execFileSync("npx", ["prettier", "--write", arquivo], { cwd: app, stdio: "pipe" });
  if (/\.(ts|tsx)$/.test(arquivo)) execFileSync("npx", ["eslint", "--max-warnings=0", arquivo], { cwd: app, stdio: "pipe" });
} catch (erro) {
  process.stderr.write(`Lint em ${path.relative(app, arquivo)}:\n${erro.stdout ?? ""}${erro.stderr ?? ""}`);
  process.exit(2); // o texto volta ao Claude, que corrige
}
```

```js
// ferramentas/ganchos/ao-terminar.mjs — segura o fim enquanto tipos, lint e unidade não passam.
import { createHash } from "node:crypto";
import { execFileSync, execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const entrada = JSON.parse(readFileSync(0, "utf8"));
const raiz = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
// No repositório do Atlas, a aplicação fica em web/; no do cliente, na raiz.
const pasta = existsSync(path.join(raiz, "web", "package.json")) ? "web" : ".";
const app = path.join(raiz, pasta);
const estado = path.join(tmpdir(), `atlas-gancho-${entrada.session_id}.json`);
const lido = (() => { try { return JSON.parse(readFileSync(estado, "utf8")); } catch { return { impressao: "", tentativas: 0 }; } })();

// Só confere se o código mudou desde a última conferência que passou. A impressão inclui o conteúdo dos
// arquivos novos: o git diff não os mostra, e um erro num componente novo passaria sem conferência.
const git = (...args) => execFileSync("git", args, { cwd: raiz }).toString();
const soma = createHash("sha256").update(git("diff", "HEAD", "--", pasta));
for (const novo of git("ls-files", "--others", "--exclude-standard", "-z", "--", pasta).split("\0").filter(Boolean)) {
  soma.update(novo).update(readFileSync(path.join(raiz, novo)));
}
const impressao = soma.digest("hex");
if (impressao === lido.impressao) process.exit(0);

const falhas = [];
for (const [nome, comando] of [
  ["tipos", "npx next typegen && npx tsc --noEmit"],
  ["lint", "npx eslint . --max-warnings=0"],
  ["unidade", "npx vitest run"],
]) {
  try { execSync(comando, { cwd: app, stdio: "pipe" }); }
  catch (erro) { falhas.push(`${nome}:\n${String(erro.stdout ?? "").slice(-2000)}`); }
}

if (!falhas.length) {
  writeFileSync(estado, JSON.stringify({ impressao, tentativas: 0 }));
  process.exit(0);
}
// Até três vezes seguidas; depois, deixa terminar, e o relatório final tem de dizer o que ficou vermelho.
if (entrada.stop_hook_active && lido.tentativas >= 3) process.exit(0);
writeFileSync(estado, JSON.stringify({ impressao: lido.impressao, tentativas: lido.tentativas + 1 }));
process.stdout.write(JSON.stringify({ decision: "block", reason: `As verificações falharam. Corrija antes de terminar.\n${falhas.join("\n\n")}` }));
```

**Os dois scripts acham a aplicação sozinhos:** em `web/` no repositório do Atlas, na raiz no de cliente. Presos a `web/`, o primeiro nunca conferiria nada num site de cliente, e o segundo rodaria os comandos numa pasta inexistente e seguraria o Claude com um motivo vazio. **A impressão do fim inclui o conteúdo dos arquivos novos,** não rastreados: o `git status` e o `git diff` não o mostram, e um erro de tipo num componente novo passaria sem conferência depois de uma rodada verde. [NV: a entrada (`tool_input.file_path`, `stop_hook_active`, `session_id`) e a saída (`decision: "block"`, código 2) foram conferidas só pela documentação; nenhuma sessão de teste rodou os dois scripts.]

**O que fica fora dos ganchos:**
- **O navegador.** O Chrome não abre no sandbox do Claude Code (memória do projeto do Atlas), por isso a régua e os testes de ponta a ponta não entram nos ganchos.
- **O que entra no fluxo:** o Claude Code roda a régua com o sandbox desligado, nas páginas tocadas, antes de dizer "pronto" (`14-ciclo-de-qa.md`, seção 2).

**Como conferir.** Numa sessão de teste, uma edição com erro de lint recebe a mensagem do gancho, e o Claude corrige. Um erro de tipo deixado de propósito impede o fim, com o motivo.

---

## 8. As rodadas noturnas e semanais

| Rodada | O que roda | Por quê |
|---|---|---|
| Toda noite (repositório do Atlas) | A bateria inteira com `--repeat-each=3`; a régua nas catorze larguras; o `npm audit` com as dependências de desenvolvimento | Revela o teste instável sem travar a publicação; o que muda fora do código (navegador, dependência) |
| Toda semana | Os vínculos externos (`linkinator`, como aviso); o Mozilla Observatory no domínio publicado; a régua contra o endereço publicado | O que depende de terceiros e do servidor |
| Todo mês (manutenção) | A rodada inteira em cada site de cliente; a revisão dos avisos acumulados | `14-ciclo-de-qa.md`, seção 7 |

**As atualizações de dependência:**
- **O Dependabot**, semanal, agrupado, com espera de 7 dias para versão nova (`09`, seção 7).
- **Next e React em versão maior**, à mão.
- **Os pedidos de atualização da própria Hostinger desligados**, se ela os oferecer.

---

## 9. A ordem de adoção

| # | O quê | Esforço | Começa a bloquear |
|---|---|---|---|
| 0 | O esqueleto: tipos, build, bytes (a régua), conteúdo e HTML, auditoria; a promoção para `producao` | 1 dia | Já |
| 1 | ESLint 10 com as regras da casa, Prettier, lefthook, os ganchos do Claude Code | 2 dias | Depois de triar o que já existe (impressão digital dos achados antigos) |
| 2 | A régua como teste do Playwright Test, mais o axe, os cabeçalhos e os fluxos | 3–4 dias | Depois de 10 rodadas verdes na `main` sem mudança |
| 3 | Regressão visual | 1–1,5 dia | Depois de calibrar contra o ruído |
| 4 | Testes de unidade; o registro verbal | 2 dias | A lista legal já; o registro, como aviso |
| 5 | Lighthouse por regressão relativa (no site do Atlas); as rodadas semanais | 2 dias | Só a regressão relativa; nos sites de marca, a barreira do travamento já está na régua |
| 6 | A homologação; o robô de dependências; o teste da opção `sri` do Next (`09`, seção 3) | 1 dia | — |

**Antes de começar:**
- **Node 22.19 ou mais novo:** o Lighthouse 13 o declara (com a 22.17.1 da máquina do desenvolvimento, em 08.10.2026, o npm só avisa), e medir fora da versão suportada não entra em decisão.
- **ESLint 10:** o 9 saiu de suporte em 06.08.2026. O `jsx-a11y` ainda declara só o 9 e pede um `overrides` no `package.json` (`03`, seção 2).
- **Medir à mão o que o Next deixou de mostrar:** o Next 16 tirou o `next lint` e a coluna de tamanho do `next build`. O tamanho do script, a régua já mede.
- **As dependências:** as desta lista (`@playwright/test`, `@axe-core/playwright`, `eslint` e plugins, `prettier` e plugin, `html-validate`, `lefthook`; o `vitest`, só no caso de `04-unidade.md`, seção 1) entram com a etapa que as usa, pela aprovação das dependências necessárias (08.10.2026), na versão mais nova com mais de 7 dias, e com a linha no `decisoes.md`.

---

## 10. A régua dentro da integração contínua

A régua de hoje cobre nove dos dez blocos; o 8 (interação) fica com os testes de ponta a ponta (`05`). Na integração contínua, ela vira testes do Playwright Test (o mesmo motor), roda contra o `server.js` standalone e passa a bloquear:

| Bloco | Na régua de hoje | Na integração contínua |
|---|---|---|
| 1 · Geometria | 14 larguras, alvos de 44 px | Igual; 5 larguras por envio e as 14 de noite (uma opção a acrescentar à régua) |
| 2 · Degradação | Sem script e com movimento reduzido | E o WebGL caindo na reserva |
| 3 · Semântica | h1, idioma, `og:`, ids, âncoras, nomes | E o `html-validate` e os retratos de acessibilidade dos marcos da página (`toMatchAriaSnapshot`) |
| 4 · Contraste e teclado | Pixels do texto; foco e armadilha | E o axe; e o diálogo que devolve o foco |
| 5 · Orçamento | A barreira do travamento, CLS, pedidos, erros; os bytes no Atlas | E o Lighthouse por regressão relativa, no Atlas |
| 6 · Composição | Avisos | Avisos; o julgamento continua humano |
| 7 · Paridade | Aviso | E o hover e o `@supports` no CSS compilado |
| 8 · Interação | — | Os fluxos nomeados, de ponta a ponta (`05`) |
| 9 · Conformidade | Selo, `noindex`, formulário | E a lista da porta de publicação, que só bloqueia depois da virada do domínio (com `SITE_NO_DOMINIO=1`) |
| 10 · Registro verbal | Avisos | A lista legal bloqueia; o resto avisa; ao portar para o Playwright Test, os períodos se segmentam com `Intl.Segmenter('pt-BR')` [FU] |

---

## 11. Fontes

- Next.js, testes com Playwright e Vitest, cache de build em CI, política de conteúdo: https://nextjs.org/docs/app/guides/testing/playwright · https://nextjs.org/docs/app/guides/testing/vitest · https://nextjs.org/docs/app/guides/ci-build-caching · https://nextjs.org/docs/app/guides/content-security-policy
- Playwright, CI, capturas e acessibilidade: https://playwright.dev/docs/ci · https://playwright.dev/docs/test-snapshots · https://playwright.dev/docs/accessibility-testing
- Lighthouse, variabilidade e estrangulamento: https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md · https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md
- GitHub, planos, verificações obrigatórias e preço das máquinas: https://docs.github.com/en/get-started/learning-about-github/githubs-plans · https://docs.github.com/en/pull-requests/reference/status-checks · https://docs.github.com/en/billing/concepts/product-billing/github-actions
- Hostinger, publicação pelo GitHub: https://docs.hostinger.com/node.js/github.md
- Claude Code, ganchos: https://code.claude.com/docs/en/hooks
- ESLint, suporte das versões: https://eslint.org/version-support/

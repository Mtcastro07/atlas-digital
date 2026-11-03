---
description: Do pedido ao site — transforma o pedido do usuário numa ordem de produção, monta o site e segue o roteiro
argument-hint: "<o pedido, como o usuário disse: o negócio, o nicho, o plano, o que souber>"
---

<!-- Fonte: producao/claude/novo-site.md. Cópia em .claude/commands/novo-site.md do repositório do Atlas: mude as duas.
     Num projeto vazio, os comandos ainda não estão instalados: leia este arquivo e siga, com o pedido do usuário no lugar
     de $ARGUMENTS. -->

O pedido do usuário: $ARGUMENTS

Você vai produzir um site do Atlas Digital pelo kit de produção (`producao/`). **Siga os documentos; não improvise processo.**

**Antes de tudo: o ambiente e as permissões.** Num projeto virgem, é a primeira coisa da sessão.
- **Confira a máquina:** `node producao/ferramentas/conferir-ambiente.mjs`. Ela diz o que bloqueia (o Node 22, o npm, o Chrome e, desde 03.11.2026, o MCP do Figma no `.mcp.json`), o que é recomendado (o `typescript-language-server`, o `poppler`, o ferramental do projeto) e o comando de cada um. Se nem o `node` existir, peça ao usuário o Node 22 (`brew install node@22`, no macOS, ou https://nodejs.org/) e pare.
- **O que é da máquina, o usuário instala.** O Claude Code nunca instala programa na máquina. Dê o comando pronto para o usuário rodar no próprio Claude Code, com `!` na frente (por exemplo, `! brew install poppler`): a saída fica na conversa. Depois, rode a conferência de novo.
  - **O item que bloqueia** para a produção antes do passo 7 (instalar e compilar);
  - **o recomendado** não para nada. Diga o que se perde sem ele: sem o `poppler`, as normas em PDF longo não abrem; sem o ferramental, o navegador do agente e a documentação viva.
- **Avise, de saída, as permissões que a sessão vai pedir,** para o usuário não estranhar:
  - **rodar fora do sandbox:** o que usa a rede (o `npm ci`, as fontes, o mapa) e o que abre o Chrome (a régua, as capturas, as fotos);
  - **no repositório do Atlas,** escrever na pasta nova, fora do repositório;
  - **na sessão seguinte,** aprovar o `.claude/settings.json` e o `.mcp.json` do projeto, se o ferramental foi instalado, e autenticar o Figma (`/mcp` → figma → Authenticate).
- **Ofereça, sem impor, a lista de permissões da produção** (`producao/claude/ferramental.md`, seção 3): os comandos de rotina do site, para o Claude Code não perguntar a cada build. Ela só se grava com o sim do usuário, acrescentada ao que já existe.
- **Uma mensagem só:** o ambiente, as permissões e as perguntas do pedido (passo 3) vão juntos, cada item com a sua recomendação.

0. **Veja onde você está:**
   - **Projeto vazio:** a raiz só tem `producao/`, e talvez `ordem.json`, `briefing.md` e `material/`. O site nasce aqui mesmo, ao lado de `producao/`. A ordem vai para `ordem.json`, e o briefing, para `briefing.md`, na raiz.
   - **Repositório do Atlas:** há `web/`, `ordens/` e `producao/`. O site nasce numa pasta nova ao lado dele, com uma cópia do kit dentro. A ordem vai para `ordens/<pasta>.json`, o registro de todo site criado.
   - **O site já existe aqui:** há `package.json` e o `CLAUDE.md` do site na raiz. Não é pedido novo: siga o roteiro pelo "Estado" do `CLAUDE.md` (`/proxima-etapa`).
1. **Leia antes de qualquer pergunta:**
   - `producao/README.md`;
   - `producao/00-do-pedido-ao-site.md`, inteiro;
   - `producao/02-ordem-de-producao.md`.

   **E antes de escrever o briefing** (passo 4): o arquivo do nicho inteiro, `producao/esteira/03-planos.md` e, no Completo, `producao/esteira/14-funcionalidades/07` e `08` (`00-do-pedido-ao-site.md`, seção 7, passo 2).
2. **Classifique o pedido** pelo `producao/00-do-pedido-ao-site.md`, seções 1 a 4:
   - **cliente ou exemplo:** o exemplo é fictício, para a vitrine do Atlas;
   - **o nicho:** um dos doze de `producao/esteira/nichos/`, ou nicho novo, pela seção 3;
   - **o plano:** se o usuário não disse, recomende pela seção 4 e pergunte;
   - **os módulos.**
3. **Pergunte só o que bloqueia:**
   - a lista da seção 5, numa mensagem só, com a sua recomendação em cada item, junto com o ambiente e as permissões ("Antes de tudo"). No cliente: o briefing, o contrato, as fotos e o logotipo, o domínio, o WhatsApp e a hora do briefing. No exemplo: se o nicho já tem exemplo, e a decisão de 12.09.2026;
   - o que o pedido já respondeu, não se pergunta de novo;
   - site de cliente sem `briefing.md` completo: a produção não começa (etapa 1 da esteira). Diga o que falta e pare;
   - com formulário ou Agenda: o aviso da coleta (seção 4).
4. **O briefing num arquivo** (seção 7, passo 4):
   - **cliente:** o recebido; se veio como texto, grave-o (no projeto vazio, em `briefing.md`; no Atlas, no scratchpad);
   - **exemplo:** o briefing **fictício**, escrito agora, com todos os campos ● (gabarito: `producao/exemplo/briefing.md`);
   - **o material do cliente** (fotos, logotipo), em `material/`, fora do git e do ar.
5. **Escreva a ordem** pelo modelo de `producao/02-ordem-de-producao.md` (no projeto vazio, `ordem.json`; no Atlas, `ordens/<pasta>.json`) e mostre-a ao usuário.
6. **Monte o site:**

   ```bash
   node producao/ferramentas/novo-site.mjs ordem.json --briefing=briefing.md                      # projeto vazio
   node producao/ferramentas/novo-site.mjs ordens/<pasta>.json --briefing=<arquivo> [--destino=<pasta>]   # repositório do Atlas
   ```

   - **No Atlas, com o sandbox desligado:** a pasta nova fica fora do diretório desta sessão, e com o sandbox ligado a escrita ali é negada.
   - **Antes de criar:** ele confere a ordem e os campos ● do briefing; com erro, nada é criado.
   - **O que ele não faz:** não instala nada, não faz commit e não publica.
7. **Instale e compile** na raiz do site, com o sandbox desligado (rede):
   - `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci`;
   - `npm test`;
   - `npm run build`.
   - **O ferramental do Claude Code**, uma vez por projeto: se a conferência do ambiente ainda acusa os plugins ou o `.mcp.json` (`producao/claude/ferramental.md`, seção 2), lembre o usuário. Os comandos `claude` mexem só no projeto: rode-os com o sim dele, ou ele mesmo, com `!`. Valem a partir da próxima sessão.
8. **Siga o roteiro** (`producao/01-roteiro-da-sessao.md`), que começa pela porta da etapa 2:
   - **projeto vazio:** continue nesta sessão. O `/proxima-etapa` aparece como comando na próxima sessão do Claude Code; até lá, leia `.claude/commands/proxima-etapa.md` e siga;
   - **repositório do Atlas:** pare e informe ao usuário o caminho do site e o passo seguinte: abrir uma sessão nova do Claude Code **na pasta do site** e rodar `/proxima-etapa`.

**Nunca, sem pedido explícito nesta conversa:**
- instalar programa na máquina: o usuário instala, pelo comando que você dá;
- commit, push ou publicação;
- mensagem ou e-mail para fora;
- dependência fora das do kit. As do kit são a pilha da base, o Playwright da régua, o `@playwright/test` 1.64.0 e o `@axe-core/playwright` 4.13.0, das suítes de ponta a ponta e de acessibilidade (aprovados em 08.10.2026), e, com o formulário ou a Agenda, o `nodemailer` e o `mysql2` (aprovados em 08.10.2026).

**Nunca:**
- foto de banco nem gerada por IA;
- dado inventado.

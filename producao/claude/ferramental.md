# O ferramental do Claude Code

> **Para que serve.** Diz quais plugins, servidores MCP, conectores e habilidades a produção usa, em que etapa e com que custo. Diz também o que fica fora de um projeto de cliente, e por quê, e o que avaliar depois. Traz os comandos de instalação.
>
> **Quando ler.** Uma vez por máquina e uma vez por projeto, antes da etapa 2. E antes de instalar qualquer ferramenta nova: esta lista se refaz pelo mesmo método.
>
> **Estado.** Levantamento de 08.10.2026, a pedido do usuário ("adicione e busque quais plugins são essenciais e coloque dentro da parte de produção, tanto para design e derivados, como mcps e etc, os que estou usando atualmente, como novos que você acha válido adicionar futuramente"). Seguiu o método da habilidade triagem-ferramental:
> - a existência de cada item foi conferida por busca nesta data;
> - o código das habilidades de terceiros foi lido antes de qualquer recomendação;
> - cada item passou pelo custo, pelo ajuste e pelo risco;
> - os custos de contexto vêm de `claude plugin details`, e as versões, do npm, em 08.10.2026.
>
> Nada foi instalado nem removido: a instalação e a poda são decisões do usuário.

---

## 1. A regra

- **Ferramenta nova** segue a regra de tecnologia (`../esteira/13-tecnologia-e-estrutura.md`, seção 9): o problema declarado, a medição, a privacidade, a licença e o registro.
- **Plugin e servidor MCP local rodam no computador**, com as permissões do usuário. Só entram de fonte verificável: a Anthropic, o fornecedor do serviço ou um repositório mantido. O nome de quem mantém o código vai junto.
- **Conector age com as credenciais do usuário:** o que a conta vê, a ferramenta vê.
- **Versão fixa**, publicada há mais de 7 dias (`13`, seção 10). Nunca `@latest`, que roda na máquina cada publicação nova sem conferência.
- **Nunca entram:**
  - imagem gerada por IA ou foto de banco;
  - ferramenta que intercepte o tráfego do agente;
  - assinatura recorrente sem pedido do usuário;
  - serviço que mande dado do visitante a terceiro.
- **O contexto custa.** Cada plugin soma texto fixo a toda sessão; um gancho de início soma ainda o texto que injeta. O que não serve a uma etapa da produção fica fora do projeto.

---

## 2. O conjunto da produção: instalar em todo projeto

| Item | O que faz na produção | Etapas | Custo fixo por sessão | Código de |
|---|---|---|---|---|
| **Playwright MCP** (`@playwright/mcp` 0.0.83, configurado direto) | O navegador do agente: abre o site, clica, preenche, captura, lê o console e a rede. Serve à exploração e ao ataque a falhas (`../qualidade/12-ataque-a-falhas.md`); a régua e as capturas para aprovar usam a biblioteca do Playwright, pelas ferramentas do site | 4, 6, 7, 11 | ~0 (as ferramentas carregam sob demanda) | Microsoft |
| **context7** (plugin) | A documentação atual das bibliotecas: Tailwind 4, Motion, shadcn, React 19, Playwright. No Next, vale antes a documentação que vem no pacote, da versão instalada (`node_modules/next/dist/docs/`) | 6 | ~0 | Upstash. Servidor remoto: as perguntas vão ao serviço da Upstash, o código não |
| **frontend-design** (plugin) | A direção visual contra o padrão de IA: o tema do ramo, a tipografia com propósito, a contenção. Complementa `../esteira/04-direcao-de-arte.md` e `../esteira/11-anti-ia.md`; não os substitui, e o briefing vence | 4, 6 | ~80 tokens | Anthropic |
| **security-guidance** (plugin) | Três camadas:<br>- o aviso imediato, ao editar, de cerca de 25 padrões perigosos, como o segredo no código e o `innerHTML` cru;<br>- a revisão do diff por um modelo ao fim de cada turno;<br>- a revisão do commit.<br><br>Serve sobretudo aos módulos (o formulário, a Agenda e o painel) | 6, 7 | 0 (ganchos) | Anthropic. As revisões por modelo gastam uso da conta a cada turno; `ENABLE_STOP_REVIEW=0` desliga a do fim de turno |
| **typescript-lsp** (plugin) | O erro de tipo e a navegação pelo código enquanto se edita | 6 | 0 | Anthropic. **Exige o `typescript-language-server`** na máquina: sem ele, o plugin não faz nada, e a conferência do ambiente o acusa |

**O Playwright MCP vai configurado direto, e não pelo plugin.** O plugin `playwright` inicia `npx @playwright/mcp@latest`, sem versão fixa. Configurado direto, a versão fica fixa, e entram duas opções:
- **`--headless`:** a janela visível deixava o mouse físico de quem está na máquina entrar nos testes de hover (achado de 03.10.2026);
- **`--isolated`:** cada sessão abre sem o perfil da anterior.

**Antes, a conferência:** `node producao/ferramentas/conferir-ambiente.mjs`, na raiz do projeto, diz o que falta nesta máquina e neste projeto, com o comando de cada item. O que é da máquina (o `typescript-language-server`, o `poppler`), o usuário instala; no próprio Claude Code, com `!` na frente do comando, a saída fica na conversa.

**Comandos.** Use uma linha por comando: funcionam no zsh, no bash e no fish.

```bash
# Uma vez por máquina: o servidor de linguagem do typescript-lsp e a leitura de PDF de mais de dez páginas (as normas)
npm install -g typescript-language-server@6.0.1 typescript@5.9.3
brew install poppler

# Uma vez por projeto, na raiz do site. Gravam em .claude/settings.json e em .mcp.json, que vão para o git
claude plugin install context7@claude-plugins-official --scope project
claude plugin install frontend-design@claude-plugins-official --scope project
claude plugin install security-guidance@claude-plugins-official --scope project
claude plugin install typescript-lsp@claude-plugins-official --scope project
claude mcp add --scope project playwright -- npx -y @playwright/mcp@0.0.83 --headless --isolated --output-dir .playwright-mcp
```

O TypeScript global acompanha a versão da base (`../base/package.json`). O `poppler` é o que o Read do Claude Code usa para abrir um PDF por páginas: sem ele, o Código de Ética Odontológica, de mais de dez páginas, não abriu no teste de 08.10.2026; a conferência do ambiente o acusa (`commands/normas.md`). Depois, abra a sessão de novo, ou use `/reload-plugins`, e aprove o servidor do `.mcp.json` quando o Claude Code perguntar. O mercado `claude-plugins-official` é o oficial da Anthropic e não precisa de registro. As capturas automáticas do MCP ficam em `.playwright-mcp/`, fora do git (`../base/.gitignore`).

**Na atualização:** a versão do Playwright MCP sobe como dependência, pela regra de `13`, seção 10, e a desta tabela muda junto. Os plugins se atualizam pelo próprio Claude Code.

---

## 3. As permissões

**O que a sessão pede, e por quê.** Diga ao usuário logo no começo (`novo-site.md`, "Antes de tudo"):
- **rodar fora do sandbox** o que usa a rede (o `npm ci`, as fontes, o mapa do bairro) e o que abre o Chrome (a régua, as capturas, as fotos): com o sandbox ligado, o Chrome não abre e a rede falha;
- **no repositório do Atlas,** escrever na pasta nova do site, fora do repositório;
- **na primeira sessão depois do ferramental,** aprovar o `.claude/settings.json` (os plugins) e o `.mcp.json` (o Playwright MCP), que o Claude Code mostra ao abrir o projeto.

**A lista de rotina, opcional.** Para o Claude Code não perguntar a cada build, o usuário pode autorizar de uma vez os comandos de rotina do site. Ofereça-a; grave-a só com o sim dele, acrescentada ao que o arquivo já tiver: em `.claude/settings.json`, para valer para os sócios, ou em `.claude/settings.local.json`, só nesta máquina, fora do git.

```json
{
  "permissions": {
    "allow": [
      "Bash(npm test *)",
      "Bash(npm run build *)",
      "Bash(npm run regua *)",
      "Bash(npm run pronto *)",
      "Bash(npm run termos *)",
      "Bash(npm run paleta *)",
      "Bash(node producao/ferramentas/conferir-ambiente.mjs *)"
    ]
  }
}
```

- **A sintaxe:** `Bash(npm run build *)` vale para `npm run build` e para as variações dele; o `*` no fim, depois de um espaço, também cobre o comando sozinho. É a regra da documentação do Claude Code (https://code.claude.com/docs/en/permissions, "Wildcard patterns").
- **Fica de fora, de propósito:**
  - o `npm ci` e o `npm install`, que instalam;
  - o `git commit` e o `git push`;
  - a publicação;
  - o `rm`.

  Cada um continua perguntando.
- **A lista não desliga o sandbox:** ela tira a pergunta do comando, e o que precisa de rede ou do Chrome ainda roda fora dele.

---

## 4. Opcional, por etapa

| Item | Quando | Por que não está na seção 2 |
|---|---|---|
| **chrome-devtools-mcp** (plugin; Google, 1.9.0, versão fixa) | Quando a régua acusa o travamento (ou, no site do Atlas, uma regressão de desempenho) e é preciso achar a causa: o rastro de carregamento com o diagnóstico do LCP, do CLS e da interação | Custa ~806 tokens em toda sessão. O Lighthouse do método segue pela linha de comando (`../qualidade/08-desempenho.md`, seção 3): o deste plugin roda noutra versão e noutra configuração, e o número dele não se compara aos do método |
| **Conector do Figma** (claude.ai) | O cliente trouxe um desenho no Figma | É raro no comércio local. Age com a conta do usuário: lê todo arquivo que ela vê |
| **Conector do Google Drive** (claude.ai) | O cliente compartilhou fotos ou logotipo por uma pasta do Drive; o material vai para `material/`, fora do git | Lê todo o Drive da conta |
| **Conector do GitHits** (claude.ai) | Antes de uma dependência entrar ou subir de versão: as vulnerabilidades, as mudanças entre versões e a revisão da atualização (`13`, seção 10; a atualização em ondas, `../esteira/18-publicacao-e-manutencao.md`) | Só nessas horas |
| **Habilidade verificacao-fontes** (da conta) | Etapa 3 e a conformidade: a norma na fonte primária (`../esteira/17-conformidade-e-normas.md`) | Já está na conta; não se instala no projeto |
| **Habilidade deep-research** (da conta) | O nicho novo (`../00-do-pedido-ao-site.md`, seção 3) e a inspiração (`../esteira/12-inspiracao-e-referencias.md`) | Idem |
| **Habilidade triagem-ferramental** (da conta) | Antes de qualquer ferramenta nova, e para refazer esta lista | Idem |

---

## 5. Fora do projeto de cliente

| Item | Por que fica fora |
|---|---|
| **superpowers** (plugin; código de `obra/superpowers`; ~840 tokens, mais o texto que o gancho de início injeta) | O processo dele (uma habilidade antes de qualquer resposta, o brainstorm, o plano) concorre com o roteiro do kit, que manda seguir os documentos e não improvisar processo (`novo-site.md`) |
| **code-review** (plugin; Anthropic; ~22 tokens) | Revisa um *pull request* do GitHub, pelo `gh pr`; a produção não usa *pull request*. A revisão de segurança fica com o security-guidance, e a de qualidade, com o `/verificar` |
| **feature-dev** (~240 tokens) e **code-simplifier** (~66) | Repetem o roteiro e as receitas de `../04-construcao.md` |
| **skill-creator** (~114) e **claude-md-management** (~177) | Servem à manutenção do kit e dos `CLAUDE.md` do Atlas, não a um site |
| **ponytail** (~641 tokens, mais ganchos) | O modo de estilo instalado pelo usuário em 08.10.2026; é escolha pessoal, não regra da produção |
| **Servidor MCP `magicui`** (`.mcp.json` do Atlas: `npx -y @magicuidesign/mcp@latest`) | Não tem versão fixa: cada publicação nova roda na máquina. E é um catálogo de componentes animados, o "enfeite de catálogo" que `../esteira/09-movimento.md`, seção 6, veda. |
| **liquid-glass** (`stormaref-skills`, MIT, de Aref Azizian; lida em 08.10.2026) | É a receita do vidro, com diretiva em Angular, e pede ao fundo "brilhos radiais em violeta, rosa e ciano": a marca C6 de `../esteira/11-anti-ia.md`. Serve ao vidro do site do Atlas (decisão de 01.10.2026), não a cliente |
| **apple-design-skill** (`apple-design-skill-marketplace`) | Está habilitada no `.claude/settings.json` do Atlas, mas sem instalação nem mercado registrado, e a busca de 08.10.2026 não achou pacote com esse nome. Sem leitura, não entra |
| **Conectores Gmail e Google Calendar** | Agem para fora, em nome do usuário. Nenhuma etapa manda mensagem nem marca compromisso pelo agente |
| **Conectores Canva, Notion, Claude Docs, PubMed, Spotify e Strava** | Nenhuma etapa os usa: o site leva foto real e desenho em código, e os documentos moram no repositório |

**No repositório do Atlas**, a poda é decisão dos sócios, porque o `.claude/settings.json` e o `.mcp.json` são compartilhados. Em 08.10.2026, havia:
- **quatro plugins habilitados em dobro**, pelos dois mercados: `frontend-design`, `skill-creator`, `playwright` e `code-simplifier`, cada um em `@claude-plugins-official` e em `@anthropic-plugin-directory`. Só uma das cópias está instalada; a outra gera o aviso de "habilitado e não instalado";
- **o `typescript-lsp` sem o `typescript-language-server`;**
- **o `chrome-devtools-mcp` instalado com um aviso:** os pacotes que ele lista não foram instalados, porque o `package.json` dele usa `overrides`;
- **o `.claude/launch.json` apontando para o site legado** de 23.08 (`python3 -m http.server 8899 site`).

---

## 6. Para avaliar depois

No máximo três. Nenhum bloqueia a produção hoje.

```
FERRAMENTA: next-devtools-mcp 0.4.0
O QUE É: o servidor MCP da Vercel que liga o agente ao `next dev` em execução (Next 16 em diante),
         pelo endereço /_next/mcp que o próprio Next abre: os erros de compilação e de execução,
         as rotas, os registros e as Server Actions.
POR QUE AQUI: na construção (etapa 6), o agente leria o erro direto do servidor, sem depender da
         saída do terminal nem da tela de erro.
CUSTO: gratuito (MIT).
RISCO: código de terceiro (Vercel; publicado pelo vercel-release-bot). Manda telemetria anônima por
         padrão: os nomes das ferramentas, as mensagens de erro, o sistema e a versão do Node.
         Desliga-se com NEXT_TELEMETRY_DISABLED=1.
ONDE OBTER: https://github.com/vercel/next-devtools-mcp
         claude mcp add --scope project next-devtools -e NEXT_TELEMETRY_DISABLED=1 -- npx -y next-devtools-mcp@0.4.0
         (o nome antes do -e: a opção -e aceita vários valores e engolia o nome; conferido na instalação de 08.10.2026)
```
Veredito: **guardar para depois.**

```
FERRAMENTA: o detector do Impeccable (pacote impeccable 4.1.0, só a linha de comando)
O QUE É: regras determinísticas de padrão de IA em interface (59 na versão do repositório lida em
         08.10.2026: 31 de "slop" e 28 de qualidade), sem modelo e sem chave: npx impeccable@4.1.0 detect <pasta | arquivo | endereço> --json
POR QUE AQUI: é a "segunda opinião automática" da avaliação anti-IA, já prevista e não adotada
         (../esteira/11-anti-ia.md, seção 4, passo 2). As regras dele já estão no texto da esteira;
         o detector as conferiria sem depender da leitura do agente.
CUSTO: gratuito (Apache-2.0).
RISCO: código de terceiro (Paul Bakaus; npm: paulbakaus). Na primeira execução, baixa um binário
         dos lançamentos do GitHub, conferido por SHA-256: sem a conferência, recusa rodar.
         Só o detector entra. A habilidade completa (24 comandos, PRODUCT.md e DESIGN.md, um
         gancho a cada edição, o princípio de "ir com tudo") concorre com o roteiro e com o
         identidade.md do kit.
ONDE OBTER: https://github.com/pbakaus/impeccable
```
Veredito de 08.10.2026: **guardar para depois.** **Atualizado em 14.10.2026: ADOTADO**, a pedido do usuário ("verifique se o impeccable está instalado… caso não esteja, instale e comece a utilizar imediatamente"):
- o detector `impeccable@4.1.0`, travado em devDependencies, com o binário `@impeccable/cli-darwin-arm64@0.1.5`;
- a habilidade em `.claude/skills/impeccable/`, instalada com `--no-hooks` (o gancho a cada edição fica de fora).

**Em 16.10.2026,** o Impeccable virou a última porta de cada site, a 100%, com o mapa de convergência contra o kit anti-IA e o relatório no chat (`../qualidade/15-revisao-do-impeccable.md`). Continuam fora o `init`, o `document` e o `extract`: escrevem o PRODUCT.md e o DESIGN.md, que concorrem com o `identidade.md`. Entram só com o pedido expresso do aprovador.

```
FERRAMENTA: Hostinger API MCP (pacote hostinger-api-mcp 2.4.0)
O QUE É: o servidor MCP oficial da Hostinger: domínios e DNS, hospedagem, VPS e cobrança, com um
         executável por área (hostinger-dns-mcp, hostinger-hosting-mcp e outros).
POR QUE AQUI: a publicação (etapas 8 e 11): o subdomínio do rascunho e a virada do domínio sem o hPanel.
CUSTO: gratuito; usa o plano já contratado.
RISCO: age com as credenciais da conta. O token da API se cria no hPanel, e a documentação não
         mostra escopo: ele vale para a conta inteira (domínios, DNS, sites e cobrança). O pacote
         sai quase todo dia (da 2.4.0 à 2.9.1, de 29.09 a 08.10.2026). A ação no ar continua
         só com pedido explícito do usuário.
ONDE OBTER: https://github.com/hostinger/api-mcp-server (MIT; npm: devs_hostinger);
         guia: https://www.hostinger.com/support/11079316-hostinger-api-mcp-server/
```
Veredito: **guardar para depois.** Se entrar, só o executável do DNS ou o da hospedagem, com o token numa variável de ambiente fora do projeto.

---

## 7. Conclusões negativas (08.10.2026)

Registradas para não se pesquisar de novo. A cópia local da triagem-ferramental não tem o `references/fontes.md` que ela cita, e por isso o registro fica aqui.

- **MCP do shadcn** (`shadcn mcp`): repete a CLI, que já tem `search`, `view`, `docs` e `add`. Na produção, a CLI, e nunca `shadcn apply` nem `init --preset`.
- **axe MCP Server**, da Deque: repete o que o kit já faz, o axe-core nos testes (`@axe-core/playwright`, `../qualidade/06-acessibilidade.md`) e o Lighthouse pela linha de comando. E pede conta na Deque (chave ou token de acesso), roda em Docker e, por padrão, manda a análise à instância da Deque nos EUA. Faz parte do axe DevTools for Web; o preço, a busca não mostrou.
- **Plugin `figma`** do mercado oficial: repete o conector do Figma, já ligado na conta.
- **Plugin `github`:** repete o `gh`.
- **Plugins `vercel` e `sentry`:** a hospedagem é a Hostinger, e o site não manda dado a serviço de terceiro.
- **`apple-design-skill`:** não achada com esse nome.
- **A habilidade completa do Impeccable e a `liquid-glass`:** lidas e fora do kit (seções 5 e 6).

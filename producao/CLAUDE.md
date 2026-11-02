# producao/ · o kit de produção do Atlas Digital

Esta pasta é o kit inteiro: a esteira (`esteira/`), a qualidade (`qualidade/`), o protocolo e o roteiro (`00` a `04`), a base (`base/`), os módulos (`modulos/`), os gestos (`gestos/`), o catálogo de componentes de terceiros, com a licença conferida para site vendido (`componentes/`), as ferramentas (`ferramentas/`), os comandos do Claude Code (`claude/`), um exemplo resolvido (`exemplo/`) e, para estudo, os três sites de exemplo do Atlas em código e um Completo de saúde feito pelo próprio kit (`referencias/`). **Comece por `README.md`, seção "Comece aqui".** Esteira, qualidade e kit: ratificados em 08.10.2026, a pedido do usuário.

- **Projeto vazio** (a raiz só tem esta pasta, e talvez `ordem.json`, `briefing.md` e `material/`): o pedido do usuário segue `claude/novo-site.md`, lido e seguido como procedimento. O site nasce na raiz, ao lado desta pasta. **A primeira coisa da sessão:** `node producao/ferramentas/conferir-ambiente.mjs`. O que faltar na máquina, o usuário instala, pelo comando que você der (com `!` na frente, no próprio Claude Code); avise também as permissões que a sessão vai pedir (`claude/novo-site.md`, "Antes de tudo").
- **Projeto com o site** (há `CLAUDE.md` e `package.json` na raiz): vale o `CLAUDE.md` da raiz e o "Estado" dele; esta pasta é a biblioteca.
- **Não edite esta pasta por cliente.** O que é do cliente fica na raiz, e os relatórios de QA, em `registros/`. Um defeito no kit se corrige no repositório do Atlas, onde ele é mantido, e volta aos projetos trocando a pasta inteira.
- **No repositório do Atlas,** esta pasta é a fonte do kit: mudança nela vale para todo site novo e se registra em `documentacao/atlas--decisoes.md`, no repositório principal (nesta cópia, a pasta não existe, e o registro fica em `esteira/99-rastreabilidade.md`). As ordens dos clientes ficam fora dela, em `ordens/`, na raiz.
- **Ferramental do Claude Code:** `claude/ferramental.md` (os plugins e o servidor MCP de todo projeto, com os comandos; o que fica de fora). Ferramenta nova passa pelo mesmo método.
- **Peças de terceiros:** só pelo catálogo (`componentes/README.md`), depois do mundo da marca, com:
  - a licença relida no dia;
  - o `LICENCA-<origem>.txt` ao lado do código;
  - o registro no `decisoes.md` do site.

  Peça CONDICIONAL só no repositório do cliente, nunca nesta pasta.
- **Dependências:** as do kit entram sem novo pedido (a pilha da base, o Playwright da régua, o `@playwright/test` 1.64.0 e o `@axe-core/playwright` 4.13.0 das suítes de teste e, com o formulário ou a Agenda, o `nodemailer` 10.0.13 e o `mysql2` 3.24.5, aprovados em 08.10.2026). Qualquer outra segue `esteira/13-tecnologia-e-estrutura.md`, seção 9. Commit, push e publicação, só com pedido explícito.
- **Há dois sócios chamados Matheus:** use sempre o nome completo (Matheus Azevedo Abreu; Matheus Castro Oliveira de Luna Garcia).

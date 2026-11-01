# claude/

Os comandos do Claude Code da produção (`/nome`, com o argumento depois).

| Arquivo | Onde vale | O que faz |
|---|---|---|
| `novo-site.md` | No projeto vazio, onde se lê e segue (os comandos só se instalam com o site), e no repositório do Atlas (cópia em `.claude/commands/novo-site.md`: mude as duas) | Do pedido ao site: o protocolo de entrada (`../00-do-pedido-ao-site.md`), a ordem, o `novo-site.mjs` e a passagem para o roteiro |
| `commands/proxima-etapa.md` | Em cada site (o `novo-site` copia `commands/` para `.claude/commands/`) | O condutor: lê o "Estado" do `CLAUDE.md`, confere a porta da etapa anterior e executa a seguinte |
| `commands/normas.md` | Idem | Etapa 3: a verificação normativa na fonte primária |
| `commands/direcao-de-arte.md` | Idem | Etapa 4: o `identidade.md`, o teste do prompt parecido, os tokens, as fontes, o ícone e as capturas para aprovar |
| `commands/conteudo.md` | Idem | Etapa 5: o roteiro e os textos em `conteudo/`, cada fato com origem |
| `commands/construir.md` | Idem | Etapa 6: as páginas, as funcionalidades, os módulos (com o `nodemailer` e o `mysql2`, aprovados), as fotos e o movimento |
| `commands/verificar.md` | Idem | Etapa 7: os testes, o `pronto`, a régua, a anti-IA, a revisão de sentido e o relatório de QA |
| `commands/rodada.md` | Idem | Etapa 9: o pedido do cliente, classificado, registrado, orçado ou feito |
| `commands/conformidade.md` | Idem | Etapa 10: a porta de publicação, item por item, com a prova |
| `commands/publicar.md` | Idem | Etapas 8 e 11: o rascunho ou o site, **só com pedido explícito**, e a conferência no ar |
| `commands/manutencao.md` | Idem | Etapa 13: a mudança de texto, preço, horário ou foto, com a régua antes de ir ao ar |
| `ferramental.md` | Em cada máquina e em cada projeto | Os plugins, o servidor MCP, os conectores e as habilidades da produção, com os comandos de instalação; o que fica de fora, e por quê; o que avaliar depois (08.10.2026) |

**Regra dos comandos.** Cada comando aponta para o roteiro (`../01-roteiro-da-sessao.md`) e para a esteira; não repete regra que mora lá. Se uma regra mudar, ela muda no documento, e o comando continua certo.

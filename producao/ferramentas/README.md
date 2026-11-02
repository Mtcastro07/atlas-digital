# ferramentas/ (da produção)

As ferramentas que trabalham **sobre** um site, fora dele. As de dentro de cada site estão em `../base/ferramentas/`, e cada site as recebe com a base.

| Arquivo | O que faz | Uso |
|---|---|---|
| `conferir-ambiente.mjs` | Confere a máquina e o projeto antes do primeiro site: o que bloqueia (o Node 22, o npm, o Chrome), o que é recomendado (a rede, o `typescript-language-server`, o `poppler`, o ferramental do Claude Code, o Docker), com o comando de cada item. Não instala nada; sai com código 1 se algo bloqueia | A primeira coisa num projeto virgem: `node producao/ferramentas/conferir-ambiente.mjs` |
| `conferir-pausa.mjs` | A pausa pausa? Em cada página, a 1440 e a 390 px, aperta o botão de pausa e lista toda animação infinita que segue rodando (`document.getAnimations()`), porque o `aria-pressed` não prova nada (16.10.2026: o pet shop e o depósito diziam "pausado" com a luz e a ficha andando). Procura o botão pelo nome ("Pausar…"), desde 02.11.2026: um `aria-pressed` de outro assunto, como um seletor de plano, não é a pausa (`--autoteste`). Desde 17.10.2026, também os pixels, que veem o canvas, o relógio e o `setInterval`: em cada parada da rolagem, duas fotos com 1 s e 60 s de relógio adiantado entre elas; com a pausa e com `prefers-reduced-motion`, 0 pixel muda. Sai com código 1 se achar | No fechamento de cada site (`../qualidade/15-revisao-do-impeccable.md`) e depois de mexer em animação contínua: `node producao/ferramentas/conferir-pausa.mjs http://localhost:3000 / /servicos` (com `--fotos=<pasta>`, guarda o antes e o depois de cada mudança) |
| `novo-site.mjs` | Lê e confere a ordem de produção e monta o repositório. Nele entram:<br>- a base;<br>- a régua portada;<br>- `producao/esteira/`, `producao/qualidade/` e `producao/` (sem a base, sem as ordens, sem o relatório interno);<br>- os documentos do cliente, a partir dos modelos;<br>- os comandos em `.claude/commands/`;<br>- o README do projeto.<br><br>Preenche o domínio, o contato, o nome, o plano, o modo de saída e se é exemplo, e marca com `[EXEMPLO]` o conteúdo de fábrica. Nada se cria se a ordem tiver erro. Não instala, não faz commit, não publica | `node producao/ferramentas/novo-site.mjs <ordem.json> [--destino=<pasta>]` |
| `portar-regua.mjs` | Copia a régua de `producao/qualidade/regua/` para `ferramentas/regua/` do site e aplica o porte de `producao/qualidade/02-regua.md`, seção 9:<br>- o tipo de site;<br>- a conformidade lida de `conteudo/negocio.ts`: o selo e o `noindex` no exemplo; no cliente, nada de `noindex` e o rodapé com a razão social e o CNPJ, ou o nome completo e o registro;<br>- o aviso de CNPJ só no exemplo.<br><br>Copia também `quadros.mjs` e `conferir-passivas.mjs`, sem porte. Se a régua mudar e um trecho do porte deixar de existir, para e diz qual | `node producao/ferramentas/portar-regua.mjs <pasta do site>` (o `novo-site` a chama) |
| `atualizar-referencias.mjs` | Copia os três sites de exemplo do `web/` (e o que eles importam, sem as fontes binárias) para `../referencias/sites-de-exemplo/`, com o `ORIGEM.md` (a data e o commit) | **Só no repositório do Atlas**, quando um site de exemplo mudar: `node producao/ferramentas/atualizar-referencias.mjs`. Num projeto de cliente, não roda (não há `web/`) |

**Verificado em 08.10.2026, de ponta a ponta:**

**1. A ordem com erro.** Os sete erros aparecem listados, e nada é criado.

**2. O exemplo** (`../exemplo/ordem.json`):
- `npm ci`, `npm test` (9 de 9) e `npm run build`;
- a régua APROVA, com 0 falha e 2 avisos esperados;
- com os documentos do exemplo, o `pronto -- --exemplo` APROVA.

**3. Um cliente no Profissional** (dados de teste, no scratchpad):
- o build em `standalone`, servido pelo `server.js`, com os cabeçalhos do `next.config.ts`;
- a régua reprova a conformidade enquanto falta o CNPJ e aprova com a razão social e um CNPJ válido;
- o `pronto` lista os campos ● do briefing, a identidade, os campos do `CLAUDE.md`, o cartão e o ícone de fábrica.

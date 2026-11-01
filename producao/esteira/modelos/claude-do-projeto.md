<!--
  MODELO. Copie para a raiz do projeto do cliente (ao lado de producao/) como
  CLAUDE.md e preencha o que está entre colchetes (o novo-site já o faz). Apague este comentário. Mantenha as regras: elas
  valem para todo site do Atlas (producao/esteira/00-principios.md).
-->

@AGENTS.md

# [Nome de fachada do cliente] · site

## O projeto

| Campo | Valor |
|---|---|
| Cliente | [Nome de fachada] · [Razão social] · CNPJ [número] (ou: profissional pessoa física, [conselho e registro]) |
| Nicho | [um dos doze: `producao/esteira/nichos/<nicho>.md`] |
| Plano | [Essencial · Profissional · Completo] (`producao/esteira/03-planos.md`, seção do plano) |
| Módulos | [Agenda · Presença · Página adicional ×n · nenhum] |
| Condição de Fundação | [sim, contrato n.º 1/2/3 · não] |
| Domínio | [endereço] · registrado em nome de [titular] |
| Onde roda | [site estático · web app Node.js na Hostinger] (`producao/esteira/18-publicacao-e-manutencao.md`) |
| Briefing completo no grupo | [dia.mês.ano, hora] — o relógio das 24 horas começa aqui |
| Rascunho prometido | [dia.mês.ano, hora], por [canal] |
| Publicação prometida até | [dia.mês.ano] |
| Responsáveis | Vendas e contato com o cliente: Gabriel Ribeiro Ota Yida · Desenvolvimento: Matheus Castro Oliveira de Luna Garcia · Parte legal e suporte: Matheus Azevedo Abreu |

## Fontes da verdade, nesta ordem

1. `briefing.md` — o que o cliente disse. **Nenhum fato do site existe fora dele.** Campo bloqueante vazio interrompe o trabalho; não se supõe.
2. `decisoes.md` — o que se decidiu depois, com data e razão; inclui as vedações e obrigações do conselho.
3. `identidade.md` — a direção de arte aprovada. Nenhum componente antes dela.
4. `producao/esteira/` — como se faz (comece por `producao/esteira/README.md`).
5. `producao/qualidade/` — como se prova (comece por `producao/qualidade/README.md`).
6. O resto do kit em `producao/` — como se faz e com o quê: o protocolo, o roteiro, a base, os módulos, os gestos, o catálogo de componentes de terceiros e o exemplo resolvido (`producao/README.md`).

Quando duas fontes divergirem, vale a de número menor — salvo entre `producao/esteira/` e `producao/qualidade/` num método de medir, em que vale `producao/qualidade/` (`producao/qualidade/README.md`, seção 1) —, e a divergência vai para `decisoes.md`.

## Regras de trabalho

- **Não faça commit, push nem publicação sem pedido explícito.** As dependências do kit entram sem novo pedido, nas versões fixadas:
  - a pilha de `producao/esteira/13-tecnologia-e-estrutura.md`, seção 1, e o Playwright da régua, na etapa 2;
  - o `@playwright/test` 1.64.0 e o `@axe-core/playwright` 4.13.0, quando as suítes de ponta a ponta e de acessibilidade forem escritas (`producao/qualidade/05-ponta-a-ponta.md` e `06-acessibilidade.md`);
  - o `nodemailer` e o `mysql2`, com o formulário e a Agenda (aprovados pelo usuário em 08.10.2026; `producao/modulos/README.md`).

  Qualquer outra dependência pede autorização, pela regra de `producao/esteira/13-tecnologia-e-estrutura.md`, seção 9.
- **Documentos da sociedade e contratos só se leem,** salvo pedido (atas, contrato do cliente; `producao/esteira/00-principios.md`, princípio 13).
- **Há dois sócios chamados Matheus:** em qualquer documento, mensagem ou registro, use o nome completo (Matheus Azevedo Abreu; Matheus Castro Oliveira de Luna Garcia).
- **Nada inventado:**
  - nenhum depoimento, número, selo, prêmio ou "anos de experiência" sem fonte no briefing;
  - nenhuma foto de banco nem imagem gerada por IA;
  - nenhuma ilustração improvisada.

  Falta foto: use os substitutos de `producao/esteira/08-imagem-e-fotografia.md` e peça a foto.
- **A norma do conselho manda:** leia `producao/esteira/nichos/<nicho>.md` antes de escrever qualquer texto. Pedido do cliente que fere a norma é recusado com o artigo citado e registrado.
- **Privacidade:**
  - nenhum pedido a outro domínio;
  - nenhum cookie, `localStorage` ou `sessionStorage` — a única exceção é o cookie de sessão do painel do dono, na Agenda;
  - fontes em `.woff2` no próprio domínio.
- **Funciona sem script e com movimento reduzido;** o que se move sozinho tem pausa.
- **Peças de terceiros, só pelo catálogo** (`producao/componentes/`), com:
  - a licença relida no dia;
  - o `LICENCA-<origem>.txt` ao lado do código;
  - a linha de origem no alto de cada arquivo;
  - o registro no `decisoes.md`.

  Peça CONDICIONAL fica só neste repositório, nunca em `producao/`. Peça usada como veio, com a cor da marca por cima, não entra (`producao/esteira/09-movimento.md`, seção 6.4).
- **Só o escopo do plano:** o que excede é orçado antes, nunca feito e cobrado depois (`producao/esteira/03-planos.md`, seção 7). Gesto ou funcionalidade de um plano acima não entra.
- **O nível do Atlas, em todo plano** (`producao/esteira/19-o-padrao-atlas.md`): o mundo da marca em cada componente, a página em cenas, uma estratégia de cor levada até o fim, a interface desenhada para a marca e o momento próprio de cada página. A base é andaime, as referências ensinam a técnica e nunca a forma, e nada se copia de outro site do Atlas (`npm run unicidade`). O plano restringe só o que está na seção 9 daquele documento.
- **Toda decisão que não é óbvia vai para `decisoes.md`,** com data, razão e o que revoga.
- **Medido, não estimado:** toda afirmação de qualidade cita a medição. Mede-se no build de produção, nunca no `npm run dev`. Antes de acusar defeito, confira o instrumento.
- **Relatório final detalhado:** ao terminar uma tarefa, entregue ao usuário o relatório do que foi feito, com os arquivos e as seções mudados, a medida de antes e de depois, o que ficou pendente e o que depende de decisão (ratificado em 08.10.2026; preferência do usuário em 08.10.2026, ao pedir "um relatório detalhado, como você fez anteriormente").
- Registro verbal: impessoal, específico, sem superlativo sem prova (`producao/esteira/10-texto-e-conteudo.md`).
- Commits com o correio de não-resposta do GitHub, configurado só neste repositório; nenhuma ferramenta que intercepte o tráfego do agente (OmniRoute, Headroom e afins) (`producao/esteira/13-tecnologia-e-estrutura.md`, seção 3.10).

## Diretrizes de Design Premium (Anti-UI-Slop)

Texto do usuário, copiado do `CLAUDE.md` do repositório do Atlas (03.10.2026; ata v3.0, V.1, ratificado em 08.10.2026; princípio 14 de `producao/esteira/00-principios.md`). Sempre que criar ou editar interfaces neste projeto, siga estas regras:
1. **Apenas uma fonte Sans-Serif Limpa:** Use escalas tipográficas rigorosas (Inter, SF Pro ou Geist). Nunca misture fontes sem propósito.
2. **Espaçamento Controlado:** Utilize estritamente a escala do Tailwind (p-4, p-6, p-8). Evite paddings exagerados ou desalinhados.
3. **Contraste Moderno:** Utilize fundos limpos (slate-900 para dark mode, slate-50 para light mode) com bordas sutis (border-slate-200/10). Evite gradientes "bregas" ou sombras pesadas dos anos 2010.
4. **Estados de UI:** Todo componente interativo deve ter estados claros de `:hover`, `:focus-visible`, `:disabled` e estados de esqueleto (loading).

**Como se aplicam num site de cliente** (decisões do usuário em 03.10.2026, ratificadas em 08.10.2026):
- **Regras 2 e 4, integralmente:** espaço em múltiplos de 4 px, sem colchetes (`producao/esteira/07-composicao.md`, seção 3); hover, foco, desabilitado e esqueleto em todo controle (`producao/esteira/16-acessibilidade.md`).
- **Regras 1 e 3, pela identidade da marca:** a fonte, a paleta, os degradês, as texturas e as sombras são os do `identidade.md` (`producao/esteira/05-tipografia.md`, seção 2.2; `producao/esteira/06-cor-forma-e-superficie.md`, seção 9). Nunca o slate, nunca uma fonte por omissão.
- **Cantos arredondados** por preferência do usuário, salvo exceção de identidade escrita no `identidade.md` (`producao/esteira/06-cor-forma-e-superficie.md`, seção 6).

## Pilha e comandos

A base de produção do Atlas (`producao/base/`, de onde este repositório nasceu pelo `novo-site`): Next.js 16.3.8 (App Router) + React 19.2.8 + TypeScript estrito + Tailwind CSS 4.3, com o Playwright da régua. shadcn/ui, Base UI e Motion entram **quando o plano pede** e pela receita de `producao/03-da-identidade-ao-codigo.md`, seção 7. Versões e razões: `producao/esteira/13-tecnologia-e-estrutura.md`, seção 1.

```bash
npm run dev                         # desenvolvimento, http://localhost:3000 (nunca se mede aqui)
npm run build                       # compila (roda o TypeScript); o postbuild grava o .htaccess (estático) ou prepara o standalone (servidor)
npm run estatico                    # serve out/ na 3100, comprimido e com os cabeçalhos do .htaccess (site estático)
PORT=3100 npm run servidor         # o modo servidor (formulário, Agenda): o server.js do standalone
npm run regua -- --base=http://localhost:3100   # a régua portada (producao/qualidade/02-regua.md)
npm test                            # os testes de unidade (node:test)
npm run paleta                      # o contraste dos pares de cor da identidade
npm run pronto                      # a conferência de conteúdo antes do rascunho e da publicação
```

As ferramentas (`ferramentas/README.md`):
- `baixar-fonte.mjs`;
- `preparar-fotos.mjs`;
- `gerar-icones.mjs`;
- `capturar-compartilhamento.mjs`;
- `fotografar.mjs`.

O Chrome e a rede pedem o sandbox desligado. O ambiente se confere com `node producao/ferramentas/conferir-ambiente.mjs`. O que faltar na máquina, o usuário instala, pelo comando que você der (com `!` na frente, no próprio Claude Code): o Claude Code nunca instala programa na máquina por conta própria.

## Estrutura

Conforme `producao/esteira/13-tecnologia-e-estrutura.md`, seção 2:
- **O kit fica em `producao/`, como veio.** Não se edita por cliente; uma versão nova entra trocando a pasta inteira. O que é do cliente fica na raiz, e os relatórios de QA, em `registros/`.
- **Componentes de servidor** por padrão; `"use client"` só em `components/ilhas/` e `components/ui/`.
- **Todo texto visível** em `conteudo/`.
- **Um `README.md` por pasta,** menos `public/`: tudo nela é publicado.
- **Classes globais da marca** (fora dos utilitários do Tailwind e das classes da base, como `envelope` e `marca-texto`) com um prefixo curto da marca, escolhido na etapa 4 e escrito no `identidade.md`.

## A produção

- **O kit e o caminho de entrada:** `producao/README.md`.
- **O processo, etapa por etapa:** `producao/01-roteiro-da-sessao.md`.
- **O condutor:** o comando `/proxima-etapa` lê o "Estado" abaixo e executa a etapa seguinte. Há um comando por etapa: `/normas`, `/direcao-de-arte`, `/conteudo`, `/construir`, `/verificar`, `/rodada`, `/conformidade`, `/publicar` e `/manutencao` (`.claude/commands/`).
- **O conteúdo de fábrica** (o banho e tosa de exemplo da base) está marcado com `[EXEMPLO]` em cada arquivo. O `npm run pronto` não aprova enquanto sobrar uma marca. Reescreva pelo briefing; nunca apague a marca sem reescrever.

## Não alterar sem pedido

- `ferramentas/regua/` — os limites são os do Atlas; mudar um limite é decisão registrada. Os ajustes do porte (`producao/qualidade/02-regua.md`, seção 9: tipo de site, orçamento, conformidade, rotas e rótulos) fazem parte da etapa 2 e não pedem nova autorização.
- `components/ui/` adaptados (botões sobre `<button>` nativo) — **nunca** reinstalar pelo CLI do shadcn por cima, nem rodar `shadcn apply` ou `shadcn init --preset`: eles reescrevem componentes e cores.
- `<Suspense>` por seção: proibido (o erro 418 do React, a hidratação que refaz a página no navegador). `content-visibility` nas seções: proibido, salvo a exceção medida, quando a régua dos quadros a pede (as âncoras fora do lugar: `producao/esteira/13-tecnologia-e-estrutura.md`, seção 3.1; `producao/esteira/15-desempenho.md`, seção 5.17).
- `producao/` — o kit. Um defeito achado nele se corrige no repositório do Atlas, onde o kit é mantido, e volta aqui trocando a pasta; registre-o no `decisoes.md`.
- `AGENTS.md` — gerado e regravado pelo `next dev` (o bloco `nextjs-agent-rules`); não editar, e versionar junto (`producao/esteira/13-tecnologia-e-estrutura.md`, seção 2).

## Portas

- **Antes do rascunho:** a lista inteira de `producao/qualidade/14-ciclo-de-qa.md`, seção 3 (nove itens), e a revisão de sentido de `producao/esteira/01-processo.md`, etapa 7. Os principais:
  - régua sem falha;
  - avaliação anti-IA sem marca de peso alto (`producao/esteira/11-anti-ia.md`);
  - lista de revisão de 22 itens (`producao/qualidade/11-design-e-anti-ia.md`);
  - normas do nicho conferidas no texto final.
- **Antes da publicação:** a porta de conformidade (`producao/esteira/17-conformidade-e-normas.md`, seção 9) e a conferência no endereço publicado (`producao/esteira/18-publicacao-e-manutencao.md`).
- **O relatório de cada porta** fica em `registros/relatorio-de-qa--<porta>--<aaaa-mm-dd>.md` (modelo em `producao/qualidade/modelos/relatorio-de-qa.md`).

## Estado

[Uma linha por etapa de `producao/esteira/01-processo.md`, com a data: briefing, verificação normativa, direção de arte aprovada, construção · passe da mesa aprovado, construção · passe do celular aprovado, rascunho enviado, rodada 1, rodada 2, conformidade, publicação.]

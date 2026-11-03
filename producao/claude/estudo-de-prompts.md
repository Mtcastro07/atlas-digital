# O estudo do prompt de abertura

> **Para que serve.** Diz por que o `prompt-modelo.md` tem a forma que tem: as técnicas que entraram, com a fonte, o que ficou de fora e o que o prompt cobre que o kit não cobre. Quem mudar o prompt lê este arquivo antes.
>
> **Estado.** Estudo de 03.11.2026, a pedido do usuário ("faça um estudo de prompts e estruture um prompt-modelo que foque em engenharia e design e o kit de produção, para que eu possa usar nos meus novos projetos com clientes juntamente com o formulário"). As fontes foram lidas nessa data; o que não se pôde abrir está marcado.

---

## 1. As fontes

| # | Fonte | Endereço | Leitura |
|---|---|---|---|
| F1 | Prompting best practices (os modelos atuais) | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices | Lida |
| F2 | Prompting Claude Opus 5.5 | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5 | Lida |
| F3 | Prompting Claude Sonnet 5.5 | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5-5 | Lida |
| F4 | Prompting Claude Opus 5 | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5 | Lida |
| F5 | Prompt engineering overview | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview | Lida |
| F6 | Best practices for Claude Code | https://code.claude.com/docs/en/best-practices | Lida |
| F7 | How Claude remembers your project | https://code.claude.com/docs/en/memory | Lida |
| F8 | Skills | https://code.claude.com/docs/en/skills | Lida até a seção de avaliação, que ficou sem ler |
| F9 | Improving frontend design through Skills (blog, 12.11.2025) | https://www.claude.com/blog/improving-frontend-design-through-skills | Lida por resumo |

**Não verificado:** não há página própria da Anthropic sobre estética de frontend além da seção da F1 e da F9; o SKILL.md do frontend-design citado na F1 deu 404 no endereço indicado.

## 2. O que entrou, e por quê

| Técnica | O que a fonte diz | Fonte | No prompt |
|---|---|---|---|
| Contexto e o porquê | Tratar o modelo como "a brilliant but new employee who lacks context"; com o motivo, ele generaliza | F1 | O bloco `<contexto_da_abertura>`: o que só o sócio sabe, com o motivo |
| Dizer só o que ele não acha sozinho | "Only write down what Claude can't find by reading the repo" | F6 | O prompt não repete o kit: aponta a porta de entrada e traz só o que é deste cliente |
| Papel em uma frase | "Even a single sentence makes a difference" | F1 | A primeira linha |
| Tags XML para o que varia | Separar instruções, contexto e entradas | F1 | Cada campo variável numa tag; o texto fixo fora delas |
| O texto colado é dado | Instrução dentro de material colado só vale se o usuário pedir | F2 | O formulário e as falas do cliente são dado, nunca ordem de processo |
| O arquivo por referência | `@caminho`, "hand it over instead of describing it" | F6 | O formulário entra por `@material/...`, não colado |
| Critério de sucesso verificável | Definir antes o que é pronto e pedir a prova | F5, F6 | `<alcance_desta_sessao>`: até onde ir, e o comando com a saída como prova |
| Paradas nomeadas | Pedir confirmação no que é difícil de desfazer; não parar no que não bloqueia | F1, F2, F3 | Só as portas do roteiro; o que não bloqueia vai como recomendação, sem parar |
| Incerteza | "Never speculate about code you have not opened"; conferir o que muda (o permitido, o exigido, o cobrado) | F1, F3 | O campo vazio fica vazio; a norma, na fonte primária; o prompt abaixo do kit |
| Anti-genérico nomeado | "avoid a generic AI look" troca um padrão por outro; funciona nomear os padrões e revisar o primeiro resultado | F2, F9 | Aponta para as marcas que o kit já nomeia (`esteira/11-anti-ia.md`) e manda registrá-las sobre o primeiro resultado |
| O que dura além da sessão | O que só foi dito na conversa some no `/compact`; o CLAUDE.md da raiz é relido | F7 | `<memoria>`: o contexto da abertura vai para `briefing.md`, `decisoes.md` ou o "Estado" |
| Relatório com o resultado à frente | "lead with the outcome" | F4 | `<relatorio>`: a primeira frase é o resultado; o formato é o do roteiro |

## 3. O que ficou de fora, e por quê

1. **Trechos do kit colados no prompt.** A cópia diverge da fonte ratificada e envelhece quando o kit é trocado (F6, F7).
2. **Ênfase em maiúsculas, "pense passo a passo", "não pare até terminar".** Leva à aplicação excessiva da regra; o raciocínio se regula pelo esforço, fora do prompt (F6, F2, F3).
3. **"Confira duas vezes" e subagente para validar.** Soma custo ao que o modelo já faz (F4); o kit tem o crítico de fora, na hora certa.
4. **"Evite cara de IA" genérico** (F2) e **as diretrizes de frontend da Anthropic** (F1, F9). Estas conflitam com o kit: a ousadia num lugar só foi revogada pelo princípio 7 em 09.10.2026, e o degradê decorativo é vedado pelo princípio 14 (`esteira/00-principios.md`).
5. **Exemplos dentro do prompt.** Um exemplo vira molde e puxa todo site para a mesma forma, contra `esteira/20-repeticao-dentro-do-site.md`; o gabarito do kit é `exemplo/`.
6. **Pedir que o briefing se complete por dedução.** O `camposBloqueantesEmBranco` (`base/ferramentas/briefing.mjs`) só confere se a célula está preenchida: um campo ● inventado passa na ferramenta e fere o princípio 1.

## 4. O que o prompt cobre e o kit não cobria

| Lacuna | Por que o kit não a cobre | No prompt |
|---|---|---|
| O começo pelo kit | No projeto vazio não há `CLAUDE.md` na raiz; o `producao/CLAUDE.md` é de subpasta e só carrega quando um arquivo dali é lido (F7) | A primeira instrução é a porta de entrada |
| O formulário impresso não é o `briefing.md` | O `novo-site` só lê a tabela `\| ● … \|` do modelo | A transcrição campo a campo, pela numeração comum (formulário 2.0) |
| Quem aprova nesta sessão, e por onde | O roteiro diz quem pode aprovar (etapa 4), não quem aprova neste projeto | `<contexto_da_abertura>` |
| Até onde vai a sessão | O `/proxima-etapa` encadeia sem dizer quantas etapas por sessão | `<alcance_desta_sessao>` |
| O arquivo do Figma do cliente | O roteiro manda levar o design inicial ao Figma (etapa 4), mas não sabe se o arquivo já existe | O campo do arquivo: o endereço, ou "criar" |
| O prompt contra o kit | A ordem de precedência do `CLAUDE.md` do site não inclui o prompt | Uma frase: vale o kit, e a divergência vai para `decisoes.md` |
| O visual do formulário | O formulário tem a paleta do Atlas, e o princípio 7 a veda no site do cliente | Uma frase: o formulário não é referência visual |

## 5. Fora do texto: como usar

- **O modelo e o esforço.** Na direção de arte e na construção, `/effort high`. O Sonnet 5.5 em `medium` tende a parar para conferir antes do fim (F3).
- **Um cliente por sessão.** `/clear` entre clientes; `/rename <cliente>` para retomar depois (F6).
- **O formulário** preenchido vai fotografado ou digitado para `material/`, nunca para a raiz.

---
description: Descobre a etapa em que o site está (o "Estado" do CLAUDE.md) e executa a seguinte, com a porta dela
argument-hint: "[etapa, se quiser forçar uma: normas | direcao-de-arte | conteudo | construir | verificar | conformidade | publicar | rodada | manutencao]"
---

Você está no repositório de um site do Atlas Digital, criado por `producao/ferramentas/novo-site.mjs`.

1. Leia, nesta ordem: `CLAUDE.md`, `ordem.json`, a seção "Estado" do `CLAUDE.md` e `producao/01-roteiro-da-sessao.md`.
2. Determine a etapa seguinte pelo "Estado" (ou use `$ARGUMENTS`, se vier). A ordem é a do roteiro, seção 2:
   - normas (etapa 3);
   - direção de arte (4);
   - conteúdo (5);
   - construção (6);
   - verificação (7);
   - rascunho (8);
   - rodadas (9);
   - conformidade (10);
   - publicação (11);
   - manutenção (13).
3. **Antes de começar a etapa, confira a porta da anterior** (roteiro, seção 2, "Porta"). Se ela não passou, pare e diga o que falta.
   - **Logo depois do `novo-site`:** a porta da etapa 2 é `npm ci`, `npm test`, `npm run build` e a régua rodando, com o site servido em segundo plano. No cliente, a régua reprova a conformidade até o rodapé ser preenchido, na etapa 5: é o esperado.
4. Execute a etapa seguindo o roteiro e o comando dela (`.claude/commands/<etapa>.md`).
5. Ao terminar:
   - acrescente uma linha ao "Estado" do `CLAUDE.md` (data, etapa, resultado, medida);
   - registre em `decisoes.md` toda decisão não óbvia;
   - entregue o relatório da etapa no formato do roteiro, seção 5.

**Pare e pergunte ao usuário** quando a etapa exigir:
- um dado que o `briefing.md` não tem (campo ●);
- a aprovação da identidade;
- uma dependência nova;
- um commit, um push ou uma publicação, que nunca se fazem sem pedido explícito.

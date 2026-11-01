---
description: Etapa 9 — registra e aplica um pedido do cliente numa rodada, orçando antes o que excede o plano
argument-hint: "<o pedido do cliente, como chegou>"
---

Etapa 9 (`producao/esteira/01-processo.md`, etapa 9; `producao/esteira/03-planos.md`, seção 7). O pedido: $ARGUMENTS

1. **Classifique o pedido:**
   - dentro do plano;
   - fora do plano: Página adicional, funcionalidade ou módulo, que se orça antes e nunca se faz para cobrar depois;
   - contra a norma do conselho: recuse com o artigo.
2. **Registre em `decisoes.md`:** data, pedido, classificação, o que se fez ou se recusou, e quem pediu.
3. **Fora do plano:** pare e devolva ao usuário o orçamento (valores de `producao/esteira/03-planos.md`). Não faça.
4. **Dentro do plano:** aplique; rode `npm run build`, `npm run pronto` e a régua; mostre a captura antes e depois.
5. **Conte as rodadas:** duas estão incluídas (`producao/esteira/01-processo.md`, etapa 9). A terceira excede o escopo e se orça antes, como todo pedido fora do plano. O valor não está decidido: pergunte aos sócios e registre.

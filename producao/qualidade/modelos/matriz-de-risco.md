# Modelo · Matriz de risco

> **Quando usar.** No começo de todo projeto, antes do primeiro teste, e a cada mudança de escopo (`../00-entender-o-projeto.md`, seção 8). A matriz decide a ordem e a profundidade dos testes: primeiro as notas 9, depois as 6 (`../01-metodologia.md`, seção 1).
>
> **Onde salvar.** Dentro de `registros/mapa-do-projeto.md`, na raiz do repositório do cliente, na seção "Matriz de risco".

---

## A escala

**Probabilidade de falhar:**
- **3:** a funcionalidade é nova, tem estado ou lógica de tempo, ou a mesma classe já falhou neste ou noutro projeto (`../12-ataque-a-falhas.md`, seção 4).
- **2:** já existe noutro site e mudou.
- **1:** é estática e já foi verificada noutro site.

**Impacto se falhar.** Vale a pior das seis dimensões:
- **legal e normativa;**
- **conversão;**
- **acessibilidade;**
- **desempenho;**
- **privacidade;**
- **verdade do conteúdo.**

Cada uma vai de 1 a 3, com as definições de `../00-entender-o-projeto.md`, seção 8.

**Nota** = probabilidade × impacto:
- **9 e 6:** teste nomeado obrigatório, e uma sessão de exploração na categoria;
- **4 e 3:** a régua e a exploração geral;
- **2 e 1:** a régua.

---

## A forma, para copiar

```markdown
## Matriz de risco · <cliente> · <dd.mm.aaaa>

| # | Item | Plano | Prob. | Impacto (dimensão) | Nota | Teste nomeado | Resultado | Data |
|---|---|---|---|---|---|---|---|---|
| 1 | <funcionalidade ou exigência> | <E/P/C/módulo> | <1–3> | <1–3> (<dimensão>) | <p×i> | <camada e nome do teste> | <passou | defeito <link> | a conferir> | <data> |
```

---

## Exemplo preenchido: o site de exemplo do depósito (Profissional, construção)

Caso real, no repositório do Atlas: o site de exemplo de material de construção, em `web/app/demos/deposito/`. Os resultados são os registrados de 03 a 08.10.2026 (`web/CLAUDE.md`, a régua e os comentários do código). Onde não há registro, a linha diz "a conferir".

## Matriz de risco · Depósito (site de exemplo) · 08.10.2026

| # | Item | Plano | Prob. | Impacto (dimensão) | Nota | Teste nomeado | Resultado | Data |
|---|---|---|---|---|---|---|---|---|
| 1 | Calculadora de materiais: a leitura das medidas ("2,5"), as quantidades, a perda | [P] | 3 | 3 (verdade, conversão: a lista vai ao balcão) | **9** | Unidade da leitura e da conta (`04`, seção 2); ponta a ponta do fluxo (`05`, seção 4) | Defeitos corrigidos em 03.10: o texto que não era número virava 0, e a lista zerada era enviada. **Aberto:** a medida inválida sinalizada só pela cor (S3) | 08.10 |
| 2 | Estado da loja e corte da entrega, pelo relógio de Niterói | [P] | 3 | 2 (verdade) | **6** | Unidade com datas fixas (`04`, seção 4.3); ponta a ponta com relógio fixo (`05`, seção 5.5) | Defeito: o "Agora" no sábado (achado em 03.10, corrigido em 07.10). Os testes propostos não existem ainda | 07.10 |
| 3 | Talão de orçamento: a mensagem pronta pelo WhatsApp | [P] | 3 | 3 (conversão) | **9** | Ponta a ponta: lista vazia desabilita; a mensagem traz nome, bairro e lista | Defeitos corrigidos: o talão vazio enviado só com a saudação (até 03.10); a rolagem lateral de 35 px, depois 3 px, em 320 px (07.10) | 07.10 |
| 4 | O vínculo do WhatsApp (número fictício) | [todos] | 2 | 3 (conversão) | **6** | Unidade da codificação (`04`, seção 4.1); ponta a ponta do `href` | O número fictício de todos os sites de exemplo (`conteudo/demos/comum.ts`); teste a criar | 08.10 |
| 5 | Contraste do laranja de texto sobre o quadriculado | [todos] | 2 | 3 (acessibilidade) | **6** | Régua, bloco 4 | Defeito: 4,41:1 nos códigos 01 a 05; o laranja passou de `#a8431a` para `#9a3c16` (07.10). Régua sem falha em 08.10 | 08.10 |
| 6 | Rolagem lateral e alvos em 320 px | [todos] | 3 | 2 (conversão, acessibilidade) | **6** | Régua, bloco 1 | Defeitos corrigidos em 07.10: o talão (código de barras de 112 px, grade de uma coluna) e a página de orçamento, que crescia além da tela | 08.10 |
| 7 | Marcações de compartilhamento | [todos] | 2 | 2 (conversão: o vendedor manda o endereço pelo WhatsApp) | 4 | Régua, bloco 3 | Defeito: sem `og:` em todas as páginas; o cartão de 1200 × 630 entrou em 07.10 | 08.10 |
| 8 | Selo de ficção e `noindex` | [ex] | 1 | 3 (legal: um estabelecimento que não existe) | 3 | Régua, bloco 9 | Passou | 08.10 |
| 9 | Preço com o mês de referência e o frete antes do aceite (CDC) | [P] | 2 | 3 (legal) | **6** | Leitura humana (`10`, seção 4) | A conferir | — |
| 10 | Fontes da identidade | [P] | 1 | 2 (desempenho) | 2 | Régua, bloco 5 | 130,2 KB, abaixo do teto de 300 KB | 08.10 |
| 11 | Cantos retos e botão chanfrado (a identidade do depósito) | [ex] | 1 | 1 (identidade) | 1 | Avaliação anti-IA | Decisão pendente dos sócios: a preferência do usuário é por cantos arredondados, e o depósito fica como está até decidir | 03.10 |

**A leitura da matriz.**
- **As duas notas 9 (calculadora e talão) eram as funcionalidades novas, com estado e conta,** e foi nelas que os defeitos mais graves apareceram. A matriz feita antes teria mandado testá-las primeiro.
- **As notas 6 de geometria e contraste foram pegas pela régua,** como a matriz previa.
- **A nota 6 do preço (linha 9) segue sem teste:** é a próxima leitura a fazer.

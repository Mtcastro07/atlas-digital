# testes/

Os testes de unidade das funções puras de `lib/` (`producao/qualidade/04-unidade.md`), no `node:test`, com a remoção de tipos do Node e sem dependência: `npm test`. É a ferramenta da norma (`producao/qualidade/04-unidade.md`, seção 1); o Vitest só entra no site que precisar do que o `node:test` não alcança, e aí estes testes migram trocando só a importação.

| Arquivo | O que testa |
|---|---|
| `lib.test.ts` | O vínculo do WhatsApp (máscara, número curto, mensagem com acento, quebra e `&`), o telefone visível, a âncora malformada, o horário ("7h", almoço, fechado, o resumo que junta dias), a moeda e a duração, e o CNPJ numérico e alfanumérico |

| `oficio.test.ts` | A mensagem do pedido de avaliação, o relógio de Niterói (inclusive o instante que é sábado em UTC e sexta em São Paulo), o estado da clínica com datas fixas (almoço, sexta, sábado, domingo, feriado, véspera de feriado), a geometria do mapa dos dentes (32 dentes, regiões, simetria, tudo no desenho) e a coerência dos dados (tratamentos, equipe, nenhum valor) |
| `e2e/fluxos.mjs` | Os fluxos de ponta a ponta (`npm run e2e`, com o site servido na 3100): a mensagem e o vínculo do WhatsApp, o copiar recusado e autorizado, o mapa por toque, teclado e âncora, o plano de sessões, o site sem script, o estado ao vivo com o relógio fixo, o menu, a inclinação, nada gravado, a 404 |
| `e2e/teclado.mjs` | O roteiro de teclado (`producao/qualidade/06-acessibilidade.md`, seção 4), na mesa e no celular: a primeira parada, a ordem, o foco visível e não encoberto pelo cabeçalho, nenhuma armadilha |

Os testes de ponta a ponta usam a biblioteca `playwright` da régua e o `node:assert`: o `@playwright/test` do documento `producao/qualidade/05-ponta-a-ponta.md` não é dependência aprovada do kit.

Os testes dos módulos (formulário e Agenda) vêm com eles, de `producao/modulos/`.

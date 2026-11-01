# testes/

Os testes de unidade das funções puras de `lib/` (`producao/qualidade/04-unidade.md`), no `node:test`, com a remoção de tipos do Node e sem dependência: `npm test`. É a ferramenta da norma (`producao/qualidade/04-unidade.md`, seção 1); o Vitest só entra no site que precisar do que o `node:test` não alcança, e aí estes testes migram trocando só a importação.

| Arquivo | O que testa |
|---|---|
| `lib.test.ts` | O vínculo do WhatsApp (máscara, número curto, mensagem com acento, quebra e `&`), o telefone visível, a âncora malformada, o horário ("7h", almoço, fechado, o resumo que junta dias), a moeda e a duração, o CNPJ numérico e alfanumérico, o `llms.txt` (no exemplo, só o H1 e o selo; no cliente, os endereços canônicos e as legais em "Optional") e o grafo do JSON-LD (o `WebSite` ligado ao negócio pelo `@id`) |

Os testes dos módulos (formulário e Agenda) vêm com eles, de `producao/modulos/`.

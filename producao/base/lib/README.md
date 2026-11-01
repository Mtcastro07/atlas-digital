# lib/

Funções puras, testadas em `testes/lib.test.ts` (`npm test`). Imports de valor só por caminho relativo: os testes rodam no `node:test`, com a remoção de tipos do Node, que não conhece o apelido `@/`.

| Arquivo | O que faz |
|---|---|
| `whatsapp.ts` | `vinculoDoWhatsapp` (para o build se o número não for `55DDDNNNNNNNN`) e `telefoneVisivel` |
| `mapa.ts` | `vinculoDoMapa`: a busca pelo endereço, como navegação |
| `horario.ts` | `hora` ("7h", "18h30"), `faixasEmTexto`, `horarioDiaADia`, `horarioResumido`, `enderecoEmLinhas`, `enderecoEmLinha` |
| `moeda.ts` | `reais` (sem centavos quando inteiro) e `duracao` ("1h30") |
| `metadados.ts` | `metadadosDaPagina`: título, descrição, canônico, Open Graph e cartão; no exemplo, "· demonstração" e "Estabelecimento fictício." |
| `dados-estruturados.ts` | `dadosDaCapa`: o site (`WebSite`) e o negócio local (schema.org), num grafo ligado pelo `@id`, do conteúdo; e o `jsonLd` seguro dentro de `<script>` |
| `llms.ts` | `textoDoLlms`: o `/llms.txt` em Markdown, do conteúdo: o nome, o que faz, o contato e as páginas; no exemplo, só o nome e o selo de ficção |
| `ancoras.ts` | `decodificarAncora`: a âncora malformada vale como nenhuma |
| `cnpj.ts` | `cnpjValido`: o numérico e o alfanumérico, emitido desde 31.07.2026 (Receita Federal, IN RFB 2.229/2024; caractere = ASCII − 48, módulo 11; caso real `00.000.000/E08G-12`) |

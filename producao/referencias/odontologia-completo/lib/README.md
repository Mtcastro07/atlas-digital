# lib/

Funções puras, testadas em `testes/lib.test.ts` (`npm test`). Imports de valor só por caminho relativo: os testes rodam no `node:test`, com a remoção de tipos do Node, que não conhece o apelido `@/`.

| Arquivo | O que faz |
|---|---|
| `whatsapp.ts` | `vinculoDoWhatsapp` (para o build se o número não for `55DDDNNNNNNNN`) e `telefoneVisivel` |
| `mapa.ts` | `vinculoDoMapa`: a busca pelo endereço, como navegação |
| `horario.ts` | `hora` ("7h", "18h30"), `faixasEmTexto`, `horarioDiaADia`, `horarioResumido`, `enderecoEmLinhas`, `enderecoEmLinha` |
| `moeda.ts` | `reais` (sem centavos quando inteiro) e `duracao` ("1h30") |
| `metadados.ts` | `metadadosDaPagina`: título, descrição, canônico, Open Graph e cartão; no exemplo, "· demonstração" e "Estabelecimento fictício." |
| `dados-estruturados.ts` | O negócio local (schema.org) do conteúdo, e o `jsonLd` seguro dentro de `<script>` |
| `ancoras.ts` | `decodificarAncora`: a âncora malformada vale como nenhuma |
| `cnpj.ts` | `cnpjValido`: o numérico e o alfanumérico, emitido desde 31.07.2026 (Receita Federal, IN RFB 2.229/2024; caractere = ASCII − 48, módulo 11; caso real `00.000.000/E08G-12`) |
| `agora.ts` | `agoraEmNiteroi`: a data, o dia da semana e os minutos de parede de Niterói, num instante qualquer (o fuso pelo nome, nunca o do aparelho) |
| `oficio/dentes.ts` | A geometria do mapa dos dentes: 32 dentes na notação FDI, as faixas e as áreas de toque das quatro regiões, o contorno e os sulcos de cada dente. Larguras médias de livro-texto (Wheeler), a conferir com um dentista |
| `oficio/pedido-de-avaliacao.ts` | `mensagemDaAvaliacao` e `mensagemDoTratamento`: a mensagem do WhatsApp do pedido, só com atendimento, região, última visita e período |
| `oficio/estado-da-clinica.ts` | `estadoDaClinica`: "aberto agora", a próxima abertura, os feriados e a urgência do dia, função pura |

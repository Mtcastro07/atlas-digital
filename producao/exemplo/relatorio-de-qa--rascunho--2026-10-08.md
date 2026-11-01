# Relatório de QA · Banho e Tosa Fonseca (site de exemplo da base) · rascunho · 08.10.2026

| Campo | Valor |
|---|---|
| Site, plano e módulos | O site de exemplo da base de produção (`producao/base/`): pet shop, Essencial, sem módulo; 3 páginas, as 2 legais e a 404 |
| Porta | Rascunho (etapa 7), sobre a base de fábrica |
| Ambiente e commit | Build de produção, export estático, servido por `npm run estatico` (`ferramentas/servir.mjs`), com os cabeçalhos do `.htaccess` gerado · sem commit |
| Quem verificou | O Claude Code; a conferência do sócio de desenvolvimento está pendente |
| **Veredito** | **Aprova:** régua sem falha, `pronto` sem falha no modo de exemplo, testes passando, anti-IA sem marca de peso alto depois das correções da seção 8 |

## 1 · Régua

- **Rodada final:** 0 falha nas 5 páginas, 2 avisos, 45 s.
- **Os 2 avisos esperados:** composição nas páginas legais ("nenhuma ação até 60% da primeira tela"). São texto corrido, sem ação no alto. Decisão: ficam.

| Medida, carga inicial | Valor nas 5 páginas | Teto |
|---|---|---|
| Script | 116,1 KB | 600 KB (180 KB até 08.10.2026, à noite) |
| Fontes | 67,2 KB (Fredoka 29,0 + Nunito 38,2) | 300 KB (200 KB até 08.10.2026, à noite) |
| Total | 206,7 a 207,7 KB | 1.500 KB |
| CLS | 0 | 0,05 |

- **Primeira tela do celular:** a primeira ação termina a 51% da altura no início e a 46% em Serviços. Na mesa, a 6%.
- **Razão título/corpo:** 6,1 na mesa e 2,9 no celular (postura de exibição).

**A primeira rodada e as correções** (todas antes do veredito):

| Achado | Causa | Correção |
|---|---|---|
| Rolagem lateral de 2 px a 320 px; a ação do cabeçalho saindo da tela | `hidden` e `inline-flex` na mesma classe disputavam o `display` | O display num invólucro (`components/README.md`) |
| Script de 457 KB e `ERR_CONNECTION_RESET` | O `python3 -m http.server`: sem compressão e com fila de 5 conexões | `ferramentas/servir.mjs` (comprime e aplica os cabeçalhos do `.htaccess`) |
| Cinco `ERR_ABORTED` por página | O `HEAD` de conferência do Next no export, relatado pelo Playwright como abortado (resolve 200 na página) | Calibração n.º 12 da régua (`producao/qualidade/02-regua.md`, seção 6) |
| O marca-texto quebrado em traço vertical na mesa | A marcação quebrava de linha | `.marca-texto` em `inline-block` e `nowrap` |
| Períodos longos nas páginas legais (mediana 15 e 16) | O texto do modelo | Os períodos divididos, sem mudar o sentido |

## 2 · Riscos de nota 6 e 9

Nenhum item da matriz de risco (`producao/qualidade/modelos/matriz-de-risco.md`) se aplica com nota 6 ou 9 a um site estático sem coleta: não há formulário, Agenda, preço vedado nem dado sensível.

## 3 · Testes

- **Unidade:** 9 de 9, no `node:test` (`npm test`). Cobrem:
  - o WhatsApp;
  - o telefone;
  - a âncora malformada;
  - o horário;
  - a moeda;
  - o CNPJ, numérico e alfanumérico (o caso real `00.000.000/E08G-12`).
- **Paleta:** 12 de 12 pares acima do mínimo (`npm run paleta`). A tinta dá 14,6:1 sobre o fundo; o texto da ação, 7,6:1.
- **`npm run pronto -- --exemplo`:** APROVA (0 falha, 0 aviso), com os documentos de `producao/exemplo/`.

## 4 · Conferência manual

O menu do celular foi conferido nas capturas a 390 px:
- abre em `<dialog>`;
- fecha com Esc;
- devolve o foco ao gatilho.

A régua percorreu o teclado (bloco 5): o foco sempre visível e nenhuma armadilha. Não houve leitor de tela nem aparelho físico (seção 10).

## 5 · Desempenho

Só os bytes da régua (seção 1). O Lighthouse no protocolo não rodou (seção 10).

## 6 · Segurança e privacidade

- **Cabeçalhos:** os do `.htaccess` gerado, conferidos no servidor local (`curl -sI`):
  - a política de conteúdo, com tudo do próprio site;
  - `nosniff`, `Referrer-Policy`, `Permissions-Policy`, HSTS e COOP.
- **Régua, bloco 5:** nenhuma violação da política, nenhum pedido externo, nada gravado no aparelho.
- **Coleta:** nenhuma. O aviso de privacidade diz isso.

## 7 · Conteúdo e normas

- **A origem de cada fato:** no briefing fictício (`ROTEIRO.md`).
- **A norma:**
  - sem veterinário, só o CDC;
  - o preço com o mês de referência;
  - nenhum superlativo;
  - o selo de ficção e o `noindex`;
  - nenhum dado estruturado (site de exemplo).

## 8 · Design e anti-IA

| Achado | Peso | Decisão |
|---|---|---|
| Serviços em três cartões iguais, com três cartões menores dentro (o "kit de cartões") | Alto | Corrigido: tabela na mesa (porte na coluna), fichas no celular |
| A metade direita da capa vazia na mesa | Médio | Corrigido: o resumo do banho por porte ao lado do título |
| O ícone provisório com a letra errada ("R") | Alto (erro de domínio) | Corrigido: "B" em traço redondo, na cor das toalhas |
| O endereço quebrando com "· CEP" no começo da linha | Baixo | Corrigido: o endereço em linhas |
| A ação do WhatsApp esticada na coluna de Onde | Baixo | Corrigido: a coluna alinha ao começo |

## 9 · Defeitos

Os achados da primeira rodada (seção 1) e da avaliação anti-IA (seção 8) foram corrigidos antes do veredito; nenhum ficou aberto.

## 10 · O que ficou de fora

- **A leitura com VoiceOver e NVDA:** a declaração de acessibilidade não a afirma.
- **O Lighthouse no protocolo de `producao/qualidade/08-desempenho.md`:** a régua mede os bytes; o LCP e o TBT, não.
- **Os aparelhos reais:** a medição foi no Chrome emulado.
- **A publicação:** a conferência no endereço publicado (`producao/esteira/18-publicacao-e-manutencao.md`, seção 5) não se aplica a este exemplo.

## 11 · Decisões pedidas

| Decisão | A quem | Prazo |
|---|---|---|
| A forma do símbolo de acessibilidade do rodapé (Lei 13.146/2015, art. 63, § 1º) | Matheus Azevedo Abreu, com o advogado | Antes do primeiro cliente |
| O texto do aviso de privacidade (leitura de leigo) | Idem | Idem |

**Assinatura:** Claude Code · 08.10.2026 (conferência do sócio de desenvolvimento pendente)

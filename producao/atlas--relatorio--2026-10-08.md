# Relatório · a esteira verificada e a pasta de produção · 08.10.2026

> **O que é.** O relatório do que foi feito em 08.10.2026, a pedido do usuário. É o texto entregue no terminal ao fim do trabalho, gravado aqui para quem chegar depois. Cobre três pedidos, nesta ordem:
> 1. a verificação completa da esteira v3 e da pasta de qualidade;
> 2. a pasta de produção;
> 3. o commit e o push, com a fusão do ramo remoto (seção 6);
> 4. a segunda rodada (seção 7): as fontes de Gabriel Ribeiro Ota Yida mantidas, a ratificação da esteira, as dependências, o kit portátil, o teste com banco real e o ferramental do Claude Code. Está sem commit.
>
> **Quem fez:** o Claude Code (Opus 5.5), com dois agentes de apoio, sem subagentes.

---

## 1. A verificação completa da esteira e da qualidade

**O pedido:** "faça uma verificação completa, para entender se todo seu estudo e aplicação feitos anteriormente foram de fato implementados dentro da esteira e da quality assurance".

- **O inventário:** 673 itens de estudo, medição, lição e decisão, de 30.08 a 08.10, lidos contra o kit em duas rodadas.
  - 428 já estavam;
  - 228 foram completados ou corrigidos (202 parciais, 17 divergentes, 9 ausentes);
  - 17 ficam fora do kit, com o lugar do registro.

  A matriz item a item: `documentacao/atlas--rastreabilidade-esteira--2026-10-08.md`.
- **As correções:**
  - 80 de consistência entre documentos;
  - 29 de código nos exemplos (dos 172 blocos);
  - 55 contradições entre as fontes tratadas: 48 resolvidas, 3 registradas e 4 fora do escopo (`producao/esteira/99-rastreabilidade.md`, seção 3).
- **As leis, lidas no texto primário:**
  - Decreto 7.962/2013, art. 2º;
  - Marco Civil, art. 15;
  - LBI, art. 63, com o § 1º do "símbolo de acessibilidade em destaque", que nenhum site do Atlas tem: PROPOSTA a ratificar;
  - LGPD;
  - CDC, arts. 26, 30, 31, 37, 39, 40 e 50;
  - Código Civil, art. 20;
  - ANPD 2/2022 e 15/2024;
  - COFECI 1.065/2007, que corrigiu a regra do CRECI em onze documentos: junto do nome, com no mínimo 25% do tamanho dele.
- **No site do Atlas (`web/`):**
  - as telas de erro com o `retry` do Next 16.3 e o foco visível;
  - a reserva da fonte na `global-error`;
  - o marcador "agora" do depósito, que saía da tela de manhã: a régua das 7h31 o reprovou, e agora o rótulo desliza em proporção.

  O build sem erro e a régua sem falha nas 23 páginas.
- **Os documentos:** o `CLAUDE.md` e o `AGENTS.md`, os contextos, o registro de decisões, as atas (v3.0, IV.2.1, V e VI; a v2.1 paralela marcada como superada), os avisos de registro nos documentos de 07 e 08.10 e a memória.

## 2. A pasta de produção

**O pedido:** "analise se apenas o QA e a esteira de produção são suficientes para você, futuramente, ter contexto o suficiente para criar um novo site completo... Caso não seja suficiente, veja o que se pode adicionar, reutilizar ou criar... crie uma pasta Produção, que tenha todos os elementos necessários para a produção dos sites".

### 2.1 A análise

**Não bastavam.** A esteira e a qualidade definem a regra e a prova, mas faltavam seis peças:
1. **A entrada:** do pedido no terminal ao nicho, ao plano, às perguntas e às paradas. A esteira começa no briefing pronto.
2. **O código executável:** 172 trechos espalhados nos documentos, 29 deles corrigidos na verificação; partes só no `web/` do Atlas.
3. **As ferramentas:** o servidor estático que mede certo, o `.htaccess`, as fontes, as fotos, os ícones, o cartão, a conferência do conteúdo, o porte da régua.
4. **O processo em comandos:** o que rodar, o que tocar, quando parar e o que relatar, em cada etapa.
5. **A ponte da identidade ao código.**
6. **Um exemplo resolvido.**

A tabela completa, com o que entrou no lugar de cada peça: `producao/README.md`, seção 1.

### 2.2 O que foi criado

| Peça | Onde | O que faz |
|---|---|---|
| O protocolo de entrada | `producao/00-do-pedido-ao-site.md` | Classifica o pedido:<br>- cliente ou exemplo;<br>- os doze nichos, com os sinônimos, e o nicho novo;<br>- o plano pela tarefa do degrau, com os preços;<br>- os módulos.<br><br>Diz o que perguntar numa mensagem só, o que bloqueia, o que não se aceita (com a alternativa) e traz três pedidos resolvidos |
| O roteiro da sessão | `producao/01-roteiro-da-sessao.md` | As etapas 2 a 13 com os comandos, os arquivos, a porta e as paradas; o relógio das 24 horas; o relatório de cada etapa; a tabela "quando algo dá errado" |
| A ordem de produção | `producao/02-ordem-de-producao.md` | O formato do `ordem.json`, campo por campo, com o efeito de cada um e os erros que param a criação |
| A identidade no código | `producao/03-da-identidade-ao-codigo.md` | Tokens, escala, fontes, forma, ícone, gesto e camada de movimento por plano, com a conferência antes de construir e o caso resolvido |
| A construção | `producao/04-construcao.md` | O que a base já resolve; as receitas de página, seção, ilha, foto e modo servidor; o que cada plano acrescenta e o estado no kit |
| A base | `producao/base/` | O projeto Next.js 16.3.8 + React 19.2.8 + Tailwind 4.3, sem Base UI, Motion nem `cn`. Vem preenchido com um site de exemplo: o banho e tosa do Fonseca, no Essencial. Detalhe na seção 2.3 |
| As ferramentas | `producao/ferramentas/` | O `novo-site.mjs` monta o repositório do cliente. O `portar-regua.mjs` porta a régua |
| Os módulos | `producao/modulos/` | O formulário e a Agenda (seção 2.5) |
| Os comandos | `.claude/commands/novo-site.md` (no Atlas) e `producao/claude/commands/` (dez por etapa, em cada site) | Do pedido ao site, e cada etapa com a sua porta |
| O exemplo resolvido | `producao/exemplo/` | A ordem, o briefing (fictício), a identidade, as decisões, o roteiro de conteúdo e o relatório de QA, com as medidas reais |

### 2.3 A base, verificada

**O build:** export estático, sem erro, e em `standalone` no modo servidor.

**Os testes:** 9 de unidade no `node:test`. Cobrem:
- o WhatsApp e o telefone;
- a âncora malformada;
- o horário e a moeda;
- o CNPJ numérico e o alfanumérico, emitido desde 31.07.2026 (caractere = ASCII − 48; caso real `00.000.000/E08G-12`).

**A régua APROVA nas 5 páginas,** com 0 falha e 2 avisos esperados (as páginas legais sem ação no alto):

| Medida | Valor | Teto |
|---|---|---|
| Script | 116,1 KB | 180 |
| Fontes (Fredoka e Nunito, OFL) | 67,2 KB | 200 |
| Total | ~207 KB | — |
| CLS | 0 | — |

- **A primeira ação no celular:** a 51% da tela no início e a 46% em Serviços.
- **A paleta:** 12 de 12 pares acima do mínimo. A tinta dá 14,6:1 sobre o fundo; o texto da ação, 7,6:1.
- **O que a base traz da esteira** (`base/README.md`):
  - o WhatsApp com a mensagem pronta e "abre em nova aba";
  - o número que para o build se estiver errado;
  - o endereço em linhas, "Ver no mapa" e o horário gerado do expediente;
  - o mapa do bairro em vetor, do OpenStreetMap (no exemplo, o do Fonseca);
  - o rodapé de conformidade com o símbolo e a declaração de acessibilidade;
  - os metadados e o canônico com a barra final;
  - o JSON-LD só no cliente;
  - a 404 e os erros em português, com `retry`;
  - o menu em `<dialog>`, com reserva sem script;
  - a área segura do celular com recorte (`envelope`);
  - a troca de página;
  - o marca-texto do Essencial;
  - os cabeçalhos de segurança no `next.config.ts` e no `.htaccess` gerado;
  - os ícones (`icon.svg`, `apple-icon.png`, `favicon.ico`);
  - o aviso de privacidade e a declaração de acessibilidade dos modelos.
- **As 13 ferramentas da base:**
  - `servir.mjs`;
  - `gerar-htaccess.mjs` e `preparar-standalone.mjs`;
  - `baixar-fonte.mjs`, `preparar-fotos.mjs`, `gerar-icones.mjs` e `gerar-mapa.mjs`;
  - `capturar-compartilhamento.mjs` e `fotografar.mjs`;
  - `conferir-paleta.mjs`, `conferir-pronto.mjs` e `briefing.mjs`;
  - a régua portada.

### 2.4 O que a construção da base achou e corrigiu

Problemas que a leitura dos documentos não acharia, porque só aparecem executando:

| Achado | Correção |
|---|---|
| O `python3 -m http.server`, que a esteira mandava usar, faz a régua ler 457 KB de script (sem compressão) e conexões recusadas | `npm run estatico` (`servir.mjs`), que comprime e aplica os cabeçalhos do `.htaccess`; esteira e qualidade atualizadas |
| Cinco `ERR_ABORTED` por página no export estático: o `HEAD` de conferência do Next 16, que resolve 200 na página e que o Playwright relata como abortado (conferido com um `HEAD` à mão) | A calibração n.º 12 da régua, nas duas cópias (`producao/qualidade/regua/` e `web/ferramentas/regua/`, idênticas), registrada em `producao/qualidade/02-regua.md`, seção 6 |
| `hidden` e `inline-flex` na mesma classe: a ação aparecia no celular e rolava de lado a 320 px | O display num invólucro; a regra no README dos componentes |
| O marca-texto que quebra de linha vira um traço vertical | `inline-block` e `nowrap`, como no Atlas |
| A fonte de texto em `swap`, contra `producao/esteira/05-tipografia.md`, seção 4.2 | `optional` |
| A área segura do celular com recorte, que faltava com `viewportFit: "cover"` | O utilitário `envelope` em todo contêiner |
| O `apple-icon.png` (regra da esteira) | `gerar-icones.mjs`, em RGBA: o Turbopack recusa ICO com PNG em RGB |
| A página de serviços em três cartões iguais com cartões dentro: o "kit de cartões" da avaliação anti-IA | Tabela na mesa, fichas no celular |
| A expressão que lê `exemplo: true` casava com o comentário do arquivo | Só a linha que começa pelo campo, em toda ferramenta |
| `TODO` casava com "todo" do português | Só em maiúsculas |
| O profissional pessoa física sem CNPJ: o rodapé saía " · CNPJ " | O campo `nomeCompleto`, com o registro |
| A hora do briefing lida no fuso da máquina | A hora de Niterói, quando a ordem não diz |
| O `novo-site` copiava `ordens/` (dados de outros clientes) para cada repositório | Excluído |
| Um `README.md` em `public/` seria publicado | Retirado; o `pronto` acusa documento em `public/` |
| Os relatórios de QA em `producao/qualidade/relatorios/` (esteira) contra `producao/qualidade/registros/` (qualidade) | Unificados em `registros/` |
| O modo servidor sem o `standalone` que a Hostinger força | `output: "standalone"` e `npm run servidor` |

### 2.5 Os módulos, os gestos e o mapa

**Os módulos** (`producao/modulos/`, 66 arquivos, feitos por um agente de apoio e conferidos por mim):
- **O formulário [P][C]:**
  - a página de contato, a ação de servidor e a ilha, que funciona sem script;
  - a proteção sem serviço de terceiros: o campo-armadilha, o carimbo de tempo assinado e o limite por IP em hash;
  - a mensagem ao dono e os blocos do aviso de privacidade.
- **A Agenda:**
  - os horários livres no fuso de Niterói e a reserva sem conflito, com a chave única no banco;
  - o convite `.ics`, o lembrete e o cancelamento pelo vínculo (só no POST);
  - o painel do dono, com senha em `scrypt` e o único cookie do projeto, restrito a `/painel`;
  - as tarefas do cron protegidas por segredo.
- **A divisão do código:** o que não tem dependência está separado do que pede `nodemailer` e `mysql2`, cada arquivo marcado "DEPENDÊNCIA NÃO APROVADA".
- **O README dos módulos:** a receita de instalação em 12 passos, o modelo do pedido de autorização das dependências, as 23 decisões, o verificado e o não verificado, e os 10 erros da especificação corrigidos no código.

**A caixa de consentimento da psicologia** (feita por mim, depois da revisão): uma opção em `conteudo/agenda.ts`. Com ela:
- a marcação exige a caixa, desmarcada e destacada (LGPD, art. 11, I);
- a ação recusa o pedido sem ela;
- o aviso de privacidade troca a base legal.

Conferida nos testes de unidade e no navegador: sem a caixa, o erro; com ela, a reserva e os dois e-mails.

**A minha conferência dos módulos,** numa cópia limpa, com os passos de instalação:
- **134 testes** de unidade, todos passando: 38 do formulário, 87 da Agenda e 9 da base;
- a verificação de tipos limpa;
- o build em servidor.

**Corrigido por mim:** o recuo lateral das páginas dos módulos passou ao `envelope` (o item 17 da revisão).

**Medido pelo agente:**
- a fumaça por HTTP e no navegador;
- a régua sem falha nas 7 páginas;
- 34 de 35 mutações derrubadas.

**Nunca exercitados:**
- o SQL num MySQL;
- o SMTP real;
- o Google real;
- o cron da Hostinger.

**Os gestos** (`producao/gestos/`): os seis gestos do Spell UI do Atlas, adaptados ao kit (sem `lucide-react`), com:
- a ilha de pausa do ambiente;
- o `gestos.css`;
- o `components.json`.

Compilam com a base, e a régua não acusou falha nos gestos.

**O mapa** (`base/ferramentas/gerar-mapa.mjs`): o bairro do OpenStreetMap num componente com os tokens e o crédito do ODbL. A Overpass tem instâncias de reserva, porque a principal respondeu 504 no teste. No exemplo, o Fonseca: 107 traçados, 7,3 KB.

### 2.6 O teste de ponta a ponta

**O exemplo** (`producao/exemplo/ordem.json`):
1. O `novo-site` monta o repositório.
2. `npm ci`, `npm test` (9 de 9) e `npm run build`.
3. A régua APROVA, com 0 falha e 2 avisos esperados.
4. Com os documentos do exemplo, o `npm run pronto -- --exemplo` APROVA.

**Um cliente no Profissional** (oficina, dados de teste no scratchpad):
- **A criação:** o `CLAUDE.md` preenchido (as datas do relógio das 24 horas), o modo servidor, o contato normalizado.
- **O build:** em `standalone`, servido pelo `server.js`, com os cabeçalhos.
- **A régua:**
  - reprova a conformidade sem CNPJ;
  - **aprova** com a razão social e um CNPJ válido.
- **O `pronto`:** lista os campos ● do briefing, a identidade, os campos do `CLAUDE.md`, o cartão e o ícone de fábrica.

**Uma ordem com sete erros:** os sete listados, e nada criado.

### 2.7 A revisão do kit

**O pedido:** "reveja para entender se tudo que você colocou é suficiente; caso não seja, se corrija".

**O teste do pedido.** Um agente novo, sem histórico e só com os documentos, simulou três pedidos do começo ao fim:
1. "um exemplo de nutrição para a vitrine";
2. "a psicóloga em Icaraí, Essencial com Agenda";
3. "o depósito na Engenhoca, Profissional".

A busca foi sistemática: 933 referências conferidas, e as expressões do `novo-site`, da régua e do `pronto` testadas contra os arquivos reais.

**O veredito dele:** nenhum dos três chegava ao site publicado sem improviso. Foram 34 pontos, e **todos foram tratados**:

| # | Achado | Correção |
|---|---|---|
| 1 | `modulos/README.md` não existia, e doze pontos mandavam lê-lo | Escrito pelo agente dos módulos, com a receita por módulo (seção 4) |
| 2 | Os gestos do Spell UI e o `components.json` só no repositório do Atlas | `producao/gestos/`: os seis gestos e a ilha de pausa, sem `lucide-react`, com o CSS e o `components.json`; compilam e passam pela régua |
| 3 | O mapa do bairro sem método executável | `ferramentas/gerar-mapa.mjs`: OpenStreetMap pela Overpass (com instâncias de reserva), o ponto pelo Nominatim, o componente com os tokens e o crédito ODbL; o do Fonseca na base |
| 4 | O exemplo esbarrava nos demos do Atlas e não tinha caminho até a vitrine | As perguntas "já existe exemplo?" e a decisão de 12.09; o subdomínio `<nicho>.agenciaatlasdigital.com` como domínio padrão |
| 5 | O exemplo sem passo para o briefing fictício | O passo no `00` e no `/novo-site`; o `pronto --exemplo` exige o briefing |
| 6 | A rota da sessão depois do `novo-site`, ambígua, e o sandbox | Rota única: sessão nova na pasta do site e `/proxima-etapa`; o `novo-site` com o sandbox desligado |
| 7 | A porta da etapa 7 mais fraca que a da qualidade | Os nove itens de `producao/qualidade/14-ciclo-de-qa.md`, seção 3, no roteiro e no `/verificar`, mais `npm audit`, o mapa do projeto e a matriz de risco |
| 8 | O `pronto` perdia 4 dos 29 campos ● | `ferramentas/briefing.mjs`: 29 de 29 no modelo em branco, 0 no exemplo |
| 9 | O carimbo de fábrica só no modo cliente, sem os ícones derivados; licença por família | Os dois modos, os quatro arquivos, uma licença por família |
| 10 | A psicologia e a Agenda se contradiziam no consentimento e nos dados | A leitura cautelosa: consentimento destacado na psicologia, os dados mínimos; registrada nos dois arquivos e no item 10 da lista do advogado |
| 11 | As páginas da Agenda contavam no limite? | Não contam (`producao/esteira/03-planos.md`, seção 8, PROPOSTA) |
| 12 | A coleta sem o CNPJ do Atlas | O aviso já na entrada e a regra: até o contrato de operador, a coleta fica desligada |
| 13 | Os painéis de estilo e o teste de unicidade [P][C] | Na etapa 4 e no `/direcao-de-arte` |
| 14 | O domínio do exemplo | O subdomínio da vitrine; o `pronto --exemplo` recusa o de fábrica |
| 15 | O `noindex` do rascunho no modo servidor | `SITE_HOMOLOGACAO` no `next.config.ts` |
| 16 | "O relatório de acessos pede o `mysql2`" | Corrigido: o método decidido lê o painel da Hostinger, sem código |
| 17 | As páginas dos módulos sem `envelope` | Corrigidas (seção 4) |
| 18 | A régua do cliente reprova a conformidade na etapa 2 | Dito no roteiro e no `/proxima-etapa`: é o esperado até a etapa 5 |
| 19 | Os servidores que não retornam e o `server.js` que não relê o build | O procedimento no roteiro, no `/verificar` e no README do site |
| 20 | "Pare e pergunte" contra a leitura cautelosa já escrita | Com a leitura escrita no nicho, aplica-se e registra-se |
| 21 | As perguntas da entrada incompletas; o briefing conferido tarde | Fotos e logotipo, contrato, autorização; o `--briefing` no `novo-site`, conferido antes de criar |
| 22 | Quem aprova a identidade | Matheus Castro Oliveira de Luna Garcia ou outro sócio de desenvolvimento; nunca Gabriel Ribeiro Ota Yida sozinho |
| 23 | O `priceRange` na nutrição e na psicologia | O `novo-site` o esvazia nos cinco nichos; o `pronto` acusa |
| 24 | A Presença sem titular | O aviso na entrada e no `novo-site`, com a decisão "a confirmar" |
| 25 | A terceira rodada e a foto na mensalidade, sem fonte | Alinhadas à esteira: a terceira rodada se orça; a foto nova também |
| 26 | O número de seção dos módulos | Seção 8 |
| 27 | Quatro referências quebradas | Corrigidas |
| 28 | O exemplo [P][C] em servidor | O exemplo sai sempre estático |
| 29 | Os casos de borda do `novo-site` | Validados antes de criar: nome com aspas, `novo:` vazio, páginas adicionais, domínio com acento (Punycode); a pasta apagada se a criação falhar |
| 30 | O comentário de modelo nos documentos gerados; o rascunho prometido | Tirado; o `CLAUDE.md` começa por `@AGENTS.md`; a hora do briefing prevalece |
| 31 | O `baixar-fonte` sobrescrevia pesos avulsos | O peso no nome do arquivo |
| 32 | O repositório do cliente sem git | O passo, só com pedido, na etapa 2 |
| 33 | A receita do logotipo | `04-construcao.md`, seção 5 |
| 34 | Pequenas divergências | Corrigidas:<br>- as ordens no "Não alterar";<br>- o `.nvmrc`;<br>- o `themeColor` como exceção do `layout.tsx`;<br>- as seções em `components/secoes/` |

**O teste refeito achou um defeito novo, grave.** O site gerado não compilava: o `tsconfig` da base incluía todo `**/*.ts`, e o TypeScript lia os módulos guardados em `producao/modulos/`. O teste anterior passara porque os módulos ainda não existiam. Correção: o `tsconfig` exclui `producao/`, `producao/esteira/` e `producao/qualidade/`.

**Refeitos depois das correções:**
- **a base:** régua APROVA nas 5 páginas, com o mapa;
- **o exemplo gerado:** régua APROVA, `pronto --exemplo` APROVA;
- **o caminho de cliente:** o cliente sem briefing, os casos de borda e a psicologia com a Agenda e domínio com acento se comportam como devem.

## 3. O que mudou fora da pasta de produção

- **`producao/qualidade/`:**
  - a calibração n.º 12;
  - o porte automático (`02-regua.md`, seção 9);
  - o README da régua.
- **`web/ferramentas/regua/`:** a calibração n.º 12 e o README (idêntica à cópia da qualidade).
- **`producao/esteira/`:**
  - o `README` (a produção e o caminho do `novo-site`);
  - `01-processo` e `18` (`producao/qualidade/registros/`);
  - `13` (o servidor estático e as ferramentas da base);
  - `18` (o gerador do `.htaccess` implementado);
  - `08` (o `preparar-fotos` existe);
  - `99-rastreabilidade` (o que a produção achou);
  - o modelo de `CLAUDE.md` (a pilha e os comandos da base, a seção "A produção", a estrutura);
  - na revisão: o `README` (um repositório novo não precisa mais do acesso ao do Atlas), `03-planos` (as páginas do módulo fora do limite), `13` (a captura e as seções), `14-funcionalidades/02` e `05` (a nota da implementação executável e o consentimento da psicologia), `nichos/psicologia` e `17`, seção 10, item 10 (a marcação na saúde, para o advogado).
- **`producao/qualidade/README.md`:** a produção aplica a régua portada, o `npm run estatico` e o `npm run pronto`.
- **Raiz:**
  - o `CLAUDE.md` e o `AGENTS.md`, idênticos: a produção, o comando, o que não alterar e a decisão de 08.10;
  - o `README.md`;
  - o `.claude/commands/novo-site.md`.
- **`documentacao/atlas--decisoes.md`:** a decisão da pasta de produção, como proposta.
- **A memória:** `producao.md` e o vínculo na `esteira-v3.md`.

## 4. As medidas finais

| O quê | Resultado |
|---|---|
| A base, compilada no estático e servida pelo `servir.mjs` | Régua APROVA nas 5 páginas: 0 falha, 2 avisos esperados (as legais sem ação no alto); script 116,1 KB; fontes 67,2 KB; carga ~210 KB; CLS 0 |
| Os testes de unidade | Base 9 de 9; base e módulos, 134 de 134 |
| A paleta da base | 12 de 12 pares acima do mínimo |
| O exemplo gerado pelo `novo-site` | Régua APROVA (0 falha); `pronto --exemplo` APROVA; o `.htaccess` gravado para `pet-shop.agenciaatlasdigital.com` |
| O caminho de cliente | O cliente sem briefing é recusado. A régua reprova a conformidade sem CNPJ e aprova com ele. O `pronto` lista o que falta |
| Os módulos | 134 testes; tipos limpos; build em servidor; a caixa de consentimento conferida no navegador |
| Os gestos | Compilam; régua sem falha nos gestos |
| A régua (calibração n.º 12) | As duas cópias idênticas (`producao/qualidade/regua/` e `web/ferramentas/regua/`) |

## 5. O que depende do usuário

| Decisão | Por quê |
|---|---|
| ~~Autorizar `nodemailer` e `mysql2`~~ | **Resolvido em 08.10.2026:** aprovadas (seção 7.3) |
| ~~Autorizar o Vitest (ou manter o `node:test`)~~ | **Resolvido em 08.10.2026:** o `node:test` fica; o Vitest não foi necessário (seção 7.3) |
| A forma do símbolo de acessibilidade e o texto do aviso de privacidade | Leitura de leigo, A CONFIRMAR com advogado |
| A caixa de consentimento na Agenda da psicologia e a prova dele (LGPD, art. 8º, § 2º); se a marcação nos outros nichos de saúde também é dado sensível | A leitura cautelosa está aplicada; o advogado confirma (`producao/esteira/17-conformidade-e-normas.md`, seção 10, item 10) |
| As páginas do módulo fora do limite de páginas do plano | PROPOSTA (`producao/esteira/03-planos.md`, seção 8) |
| A Presença, sem titular desde 30.09 | Quem a faz, antes de vendê-la |
| ~~As fontes do site do Atlas~~ | **Resolvido em 08.10.2026:** ficam as de Gabriel Ribeiro Ota Yida (seção 7.1) |
| ~~Ratificar a esteira v3, a qualidade e a produção~~ | **Resolvido em 08.10.2026:** ratificadas, fora o que é da sociedade (seção 7.2) |
| O primeiro site estático publicado | O `.htaccess` gerado nunca foi ao ar; o que é [NV] se confere no primeiro |

## 6. O commit e o push

**O pedido:** "ao finalizar tudo, quero que você faça o commit e o push e, caso tenha algum problema, resolva... dando sempre preferência para as incoming changes, as que virão de suas alterações".

**O commit** (`132e8b0`): as alterações desta conversa e as anteriores ainda sem commit no ramo `branchCEO`:
- a esteira v3;
- a qualidade;
- a produção;
- as correções do `web/`;
- os documentos.

### 6.1 A fusão com o ramo remoto

O `origin/branchCEO` tinha um commit que esta cópia não tinha: o `8b45a48`, de 05/10, feito por Gabriel Ribeiro Ota Yida. Ele trazia:
- as fontes do site de 28/08 de volta, em todo aparelho (Archivo Black, Archivo e Inter);
- o logotipo original, com a mão que ergue o globo;
- a tarja das aberturas sem cobrir a linha vizinha;
- o mapa das dúvidas que cabe a 320 px;
- os totais do montador empilhados abaixo de 400 px.

**O que houve.** Oito arquivos conflitaram. A primeira tentativa, `git merge -X ours`, deixou o site incoerente: o layout carregava as fontes de 05/10, e o CSS do meu lado não as definia. Títulos e números sairiam no peso normal. Refiz a resolução à mão, olhando as três versões de cada trecho.

**As fontes.** Havia conflito de intenção, não só de texto. Do meu lado estava a decisão do usuário de 07/10: "a tipografia se mantém San Francisco e Inter para o site do Atlas". Pela instrução do pedido, prevaleceu ela, que também é a da ata v3.0, V. Os trechos de fonte do `8b45a48` saíram:
- do código: cerca de 20 arquivos, entre eles `layout.tsx`, `globals.css`, `tipografia.tsx` e os componentes com `font-display`;
- dos documentos: a regra 1 nas 14 cópias em que aparece, a especificação e os READMEs do `web/`.

O registro de 05/10 ficou nas decisões (`CLAUDE.md`, `web/CLAUDE.md`, `documentacao/atlas--decisoes.md`), anotado como desfeito na fusão. É uma divergência entre sócios, listada na seção 5.

**O que ficou de 05/10:**
- o logotipo, nos ícones, no `marca.svg` e na imagem de compartilhamento;
- a tarja das aberturas;
- o mapa das dúvidas;
- o empilhamento dos totais do montador. Ele ficou depois de medido: na San Francisco e no Inter, "R$ 3.100" lado a lado passava da caixa a 320 px e invadia o recuo até 375 px. O motivo do comentário foi corrigido, porque não é só o Archivo Black.

**O que ficou do meu lado:** a reserva da fonte (`system-ui` e `sans-serif` no `--font-sans`). Ela serve à tela de erro global, que não herda as variáveis do layout.

**Os documentos:** entraram os dois lados, os registros de 07 e 08/10 e os de 05/10. O `CLAUDE.md` da raiz diz, na Tipografia, o que houve. A rastreabilidade da esteira tirou a divergência do logotipo, que acabou.

### 6.2 Verificado depois da fusão

| O quê | Resultado |
|---|---|
| Build de produção do `web/` | Compila; tipos conferidos |
| Régua no site inteiro | APROVA: 0 falha nas 23 páginas, 31 avisos heurísticos (contraste a conferir à mão nas cópias decorativas, ação no alto da tela do celular, paridade, registro), nenhum ligado às fontes; 268 s |
| Totais do montador, de 320 a 414 px, na San Francisco e no Inter forçado | Nada passa da caixa; sem rolagem lateral |
| Mapa das dúvidas, nas mesmas larguras e fontes | Cabe na coluna (0,0 px de folga a 320 px) |
| Aberturas com a tarja, a 390 e 1440 px, nas duas fontes | A tarja não encosta na linha de cima ("UFF" sobre "Origem") e avança sobre a margem sem corte ("Niterói,") |

O merge sai com a linha de coautoria do Claude e vai para `origin/branchCEO`. O hash final e o desfecho do push estão na mensagem do terminal e no `git log`: um arquivo não pode citar o próprio commit.

---

## 7. A segunda rodada

**Os pedidos**, em três mensagens:
1. "Mantenha as fontes decididas pelo gabriel. Faça a ratificação completa da esteira de produção e está permitido aplicar as dependências necessárias na esteira de produção, e o site já está publicado no ar." Na mesma mensagem: que a pasta de produção dê contexto completo para, num projeto novo de cliente, reproduzir o site com qualidade, de acordo com o nicho e os estudos feitos.
2. "Quero que você coloque tudo que preciso, incluindo a esteira, qualidade e derivados, onde seja uma pasta que eu coloque em um projeto sem nada e eu já comece a produzir."
3. "Adicione e busque quais plugins são essenciais e coloque dentro da parte de produção, tanto para design e derivados, como mcps e etc, os que estou usando atualmente, como novos que você acha válido adicionar futuramente."

Tudo desta rodada está no disco, **sem commit**.

### 7.1 As fontes de Gabriel Ribeiro Ota Yida

- **O código do `web/`** voltou às fontes do `8b45a48`: Archivo Black, Archivo e Inter, hospedadas. Ficaram, do meu lado:
  - as correções de 07 e 08/10 (as telas de erro, os metadados, as peças dos exemplos, o giro do globo, o estado da loja, o alvo de 44 px);
  - a reserva `system-ui` no `--font-sans`.
- **Os documentos** voltaram ao texto de 05/10, com a nota de 08/10: `CLAUDE.md`, `AGENTS.md`, `web/CLAUDE.md`, os READMEs do `web/` e das fontes, o registro de decisões, a regra 1 nas 14 cópias (a ata v3.0, V.1, inclusive) e `producao/esteira/05-tipografia.md`.
- **A régua** reprovou `/para-quem` por fontes: 81,8 KB, com teto de 60. Na calibração n.º 13, o teto do Atlas passou a 90 KB, nas duas cópias da régua, com o registro na qualidade e na esteira. Depois dela, a régua APROVA as 23 páginas.

### 7.2 A ratificação

- **O alcance:** 308 linhas, em 62 arquivos, passaram a RATIFICADO, com as duas datas: "decidido em 07.10.2026; ratificado em 08.10.2026". O vocabulário está em `producao/esteira/README.md`, seção 3:
  - RATIFICADO;
  - DECIDIDO;
  - DECIDIDO · A RATIFICAR, só fora da produção;
  - PROPOSTA, só nas correções do site do Atlas;
  - A CONFIRMAR.
- **Ficaram fora:**
  - a sociedade: os títulos, a cláusula I.3 e a ata no todo;
  - o site do Atlas e os exemplos: as marcas anti-IA, os cantos do depósito, o botão da barbearia e o talão;
  - o limite mensal de alterações;
  - o que depende de advogado ou contador;
  - os preços dos extras;
  - a ordem decrescente dos planos no site.
- **Decididas na ratificação:**
  - a ordem dos nichos fica como está;
  - o `noindex` vai sem `Disallow`;
  - o relatório de acessos fica sem contagem própria;
  - a integração contínua entra como plano;
  - o 3D no Completo, só nas cinco condições;
  - a base em monorepo, como direção.
- **Na ata v3.0:**
  - ratificados o IV.2.1 (com o item 6), o V (a pilha, os exemplos, a esteira) e o V.1;
  - em VI, o bloco "Ratificação de 08.10.2026": os itens 14 a 17 e a pilha do item 11;
  - a versão assinável segue pendente.

### 7.3 As dependências

- **O `nodemailer` 10.0.13** (MIT-0, com os próprios tipos) **e o `mysql2` 3.24.5** (MIT): as versões mais novas com mais de 7 dias de publicadas. Nos módulos, os cabeçalhos "DEPENDÊNCIA NÃO APROVADA" saíram, e a instalação ficou no passo 1 (`producao/modulos/README.md`, seção 3).
- **O Vitest** não foi necessário: `producao/qualidade/04-unidade.md` passou ao `node:test`, e o Vitest fica para quando um site precisar dele.

### 7.4 O site no ar

- **Conferido pelos cabeçalhos:** é o Next.js em modo servidor, na Hostinger, com a versão do `main` (`8b45a48`, de 05/10).
- **As correções de 07 e 08/10 não estão publicadas.** Por exemplo, os sites de exemplo seguem sem `og:image`, e a 404 leva o canônico da capa.
- **O subdomínio** `pet-shop.agenciaatlasdigital.com` não existe.

### 7.5 O kit portátil

- **A pasta `producao/` é o kit inteiro.** A esteira e a qualidade entraram nela, por `git mv`, e as ordens saíram para `ordens/`. As 1.513 referências entre documentos foram convertidas.
- **O `novo-site`:**
  - monta o site no próprio projeto quando a raiz só tem o kit, e talvez a ordem, o briefing e o material;
  - no Atlas, cria uma pasta nova, com uma cópia do kit;
  - recusa se já houver `package.json` ou `app/`;
  - na falha, desfaz só o que criou.
- **O site do cliente ignora o kit.** O `tsconfig` exclui a pasta, e o CSS também (`@source not`). O CSS do cliente caiu de 39 para 24 KB.
- **Os documentos de entrada:**
  - o modelo `CLAUDE.md` virou `claude-do-projeto.md`, porque o Claude Code o lia como instrução;
  - entraram o `producao/CLAUDE.md` e o "Comece aqui" do `producao/README.md`.
- **As referências:** os três sites de exemplo do Atlas em código, para estudo (`producao/referencias/`, 78 arquivos, 568 KB). São gerados pelo `atualizar-referencias.mjs` e trazem o mapa de "preciso de… olhe aqui" e o que não repetir.
- **Testado três vezes num projeto vazio:**
  - a régua APROVA 5 de 5;
  - o modelo renomeado funciona;
  - o exemplo, reproduzido de ponta a ponta, aprova os 9 testes, o build, a régua (5 de 5) e o `pronto --exemplo`.

### 7.6 O teste com banco real

Um agente montou um site do Completo com os dois módulos e a ligação de produção, e o testou contra o MariaDB 10.11.19 e o MySQL 8.0.46, no Docker.

- **O resultado:** 116 verificações por banco, todas aprovadas com o código final. Cobriram os esquemas, o formulário, a Agenda (a corrida de 2, 12 e 24 pedidos, uma reserva só), o cancelamento, o painel, as tarefas, o impasse (1213), o tempo de trava esgotado (1205), o banco parado e religado e três fusos.
- **Os três defeitos achados**, corrigidos no kit:
  - o limite por IP contava o loopback, que o próprio Next põe no `x-forwarded-for`, e punha todo visitante num balde só;
  - a soma do limite e a leitura dela, em duas instruções, barravam uma rajada legítima (de 0 a 4 mensagens, em vez de 5);
  - a tabela `ocupacao` não tinha chave primária, e o MySQL com `sql_require_primary_key` a recusava.
- **Uma melhoria:** a `/agendar` caía na tela de erro, sem saída, com o banco parado. Agora abre com o aviso e o WhatsApp; conferido com o banco desligado.
- **Depois das correções:** 135 testes de unidade, os tipos limpos e o build em servidor.
- **Fica a confirmar:** a correção do loopback cobre o app sem proxy. A memória do `scrypt` (602 MiB com seis entradas simultâneas) ficou registrada para a conferência da Hostinger (`producao/esteira/14-funcionalidades/05-agenda.md`, seção 15).

### 7.7 O teste de produção do zero

Um segundo agente, sem acesso ao repositório do Atlas e só com a pasta `producao/`, produziu um site de exemplo de odontologia no Completo, da entrada à etapa 7, em cerca de 1 h 47 min.

- **O resultado:**
  - a régua APROVA as 14 páginas, com 0 falha;
  - o `pronto -- --exemplo` aprova;
  - passam os 42 testes de unidade, os 19 fluxos de ponta a ponta e os 10 casos de teclado;
  - a auditoria de dependências não acha vulnerabilidade.
- **O veredito do relatório dele:** aprova com decisões pendentes. Ficam a I6 (nenhuma foto, porque o consultório não existe), os números do mapa dos dentes pequenos a 320 px e a falta de revisão por um dentista.
- **O limite do teste:** o contexto do agente trazia, anexado automaticamente, o `CLAUDE.md` do repositório do Atlas. Uma sessão nova de verdade não o teria.
- **As 44 lacunas que ele registrou foram corrigidas no kit nesta noite.** Por grupo:
  - **Contradições:**
    - **o mapa dos dentes:** a figura desenhada é vedada, e o nicho pedia o desenho. Virou regra: o diagrama do ofício é dado desenhado, não figura (`esteira/08-imagem-e-fotografia.md`, seção 2.3; a peça-assinatura; a marca I3; as funcionalidades do ofício);
    - **as regiões:** ficam as quatro do nicho;
    - **o "costuma"** sai do plano de sessões;
    - **o exemplo de saúde sem foto possível:** a I6 se registra e não fecha a porta do exemplo. Num cliente, fecha (`esteira/11-anti-ia.md`, passo 6).
  - **A norma da odontologia,** lida no PDF do CFO e alinhada em sete documentos:
    - os convênios entram como informação (Código de Ética, art. 43, § 1º, IV);
    - "popular" fica vedado (art. 44, VII);
    - o equipamento, só com registro;
    - o responsável técnico é obrigatório na clínica (art. 43);
    - o antes e depois fica fora: vedado na clínica pela nota do CFO de 16.01.2026, e no consultório pela política do Atlas.
  - **A régua:** quatro avisos novos, calibrados nas 23 páginas do Atlas e nas 5 da base (calibrações 14 a 16):
    - a fonte usada com `tabular-nums` sem algarismos tabulares;
    - a linha acima de 80 caracteres;
    - o rótulo de controle partido em duas linhas;
    - o foco encoberto pelo cabeçalho no Shift+Tab.
  - **A base:**
    - o `scroll-padding-top`;
    - o rótulo da ação sem quebra;
    - a navegação a partir de `lg`, e a ação do cabeçalho a partir de `xl`;
    - a página-mãe marcada na navegação;
    - o telefone e o registro sem quebra;
    - a impressão sem seção escondida;
    - o import com extensão;
    - três marcas de IA da própria base: o desfoque do cabeçalho, a borda de um lado só e o ponto médio.
  - **As ferramentas:**
    - o verificador de termos entrou na base (`npm run termos`), com a lista geral e as dos cinco nichos regulados;
    - o `pronto` aceita as marcas da esteira ([V], [FU], [NV], [P]…);
    - o `fotografar` ganhou `--movimento` e `--pagina` (inclusive para os painéis de estilo);
    - o `capturar-compartilhamento` ganhou `--sem-script`.
  - **O protocolo e os modelos:**
    - o nicho, o plano e o ofício se leem antes do briefing;
    - não se pergunta de novo o que o pedido respondeu;
    - o que não se aplica a um exemplo se escreve "não se aplica: exemplo";
    - o endereço do exemplo é real, com o número fictício;
    - o briefing ganhou o prédio e o registro da pessoa jurídica, e o `decisoes.md`, a fonte e a data da leitura;
    - o mapa do projeto fica em `registros/`.
  - **A qualidade:**
    - a lista de 22 itens (itens 1, 3, 6, 13, 17, 18 e 21);
    - as dependências das suítes, o `@playwright/test` 1.64.0 e o `@axe-core/playwright` 4.13.0, aprovadas pela autorização desta rodada;
    - o roteiro das normas: o PDF de mais de dez páginas pede o `poppler`, e a seção cobre o certificado do CFO e a demora do Planalto;
    - o relatório de QA do Completo.
- **A referência:** o site do teste entrou em `producao/referencias/odontologia-completo/`, com o código e os documentos, para estudo.
- **Verificado depois das correções:**
  - **um projeto vazio novo, com o ferramental instalado antes:** o exemplo monta no lugar; passam os 9 testes e o build; a régua APROVA 5 de 5 sem aviso novo; o `npm run termos` não acusa falha;
  - **o porte da régua** funciona com as sondas novas;
  - **a régua nas 23 páginas do Atlas** APROVA, com os avisos novos lidos um a um.

### 7.8 O ferramental do Claude Code

Está em `producao/claude/ferramental.md`, pelo método da habilidade triagem-ferramental. Cada item teve a existência conferida por busca, e as habilidades de terceiros tiveram o código lido.

- **Em todo projeto de cliente:**
  - o Playwright MCP, configurado direto, com versão fixa, sem janela e sem perfil guardado (o plugin roda `@latest`);
  - os plugins context7, frontend-design, security-guidance e typescript-lsp. Este pede o `typescript-language-server`, que falta nesta máquina.
- **Fora do projeto de cliente**, com o motivo de cada um:
  - superpowers;
  - code-review, que revisa *pull request*, e a produção não usa *pull request*;
  - feature-dev, code-simplifier, skill-creator, claude-md-management e ponytail;
  - o MCP `magicui`, sem versão fixa e com cara de catálogo;
  - a liquid-glass, que pede o brilho radial vetado pela anti-IA.
- **Para depois,** no formato da triagem: o next-devtools-mcp, o detector do Impeccable (só a linha de comando) e o MCP da Hostinger.
- **As conclusões negativas** ficaram registradas, com o MCP do shadcn, o da Deque, os plugins do Figma, do GitHub, da Vercel e do Sentry, e a apple-design-skill.
- **Nada foi instalado nem removido.** O comando do MCP foi conferido numa pasta de teste, e o `.gitignore` da base passou a ignorar `.playwright-mcp/`.
- **Um ajuste no `novo-site`:** quem instala o ferramental antes do pedido deixa um `.mcp.json` na raiz, e o projeto deixava de contar como vazio: o site iria para uma pasta nova, fora dele. O `.mcp.json` e o `.playwright-mcp/` passaram a valer como raiz vazia. Conferido: com eles e com o `.claude/settings.json` na raiz, o exemplo nasce no lugar, e os três ficam como estavam.

### 7.8.1 O começo num projeto virgem

Pedido depois do fechamento: "deixe mais polido o contexto para projetos virgens, pedindo para o usuário instalar coisas, pedir permissões, e derivados".
- **A conferência do ambiente** (`producao/ferramentas/conferir-ambiente.mjs`). Usa só o Node e roda antes de qualquer instalação. Divide o que encontra em dois grupos, com o comando de cada item:
  - **o que bloqueia:** o Node 22, o npm e o Chrome;
  - **o que é recomendado:** a rede, o Node 22.19 para o Lighthouse, o git, o `typescript-language-server`, o `poppler`, o MCP e os plugins do projeto e o Docker.

  Sai com código 1 se algo bloqueia. Conferida nesta máquina, sem bloqueio, e numa máquina simulada sem o npm, com bloqueio.
- **O protocolo** (`producao/claude/novo-site.md`, "Antes de tudo"):
  - o que é da máquina, o usuário instala, com `!` na frente no próprio Claude Code;
  - as permissões da sessão se avisam de saída: fora do sandbox, a pasta nova no Atlas, a aprovação dos plugins e do MCP;
  - a lista de permissões de rotina é opcional e só se grava com o sim do usuário (`producao/claude/ferramental.md`, seção 3);
  - tudo vai numa mensagem só, com as perguntas do pedido.
- **Onde mais entrou:** o "Comece aqui" do `producao/README.md`, o `producao/CLAUDE.md`, o protocolo de entrada (passo 0), o roteiro da sessão e o modelo do `CLAUDE.md` do projeto.

### 7.8.2 Design premium em todo plano, com a hierarquia

Pedidos depois do fechamento: "os sites devem haver o design premium, independente do plano, onde você pode aumentar o peso de cada aplicação, tanto no pc quanto no mobile, para que ele consiga manter e não se limitar à criação de designs como o Awwwards"; e "ainda se deve haver diferenças entre hierarquias".
- **A regra:** o acabamento do design é o dos premiados em todo plano, no computador e no celular (`producao/esteira/00-principios.md`, seção 9). A hierarquia continua e se vê:
  - na profundidade da identidade;
  - na camada de movimento;
  - no que o site faz;
  - no tamanho e na fotografia.

  O Essencial é premium e contido; o Completo é premium e tem a assinatura (`03-planos.md`, seção 1).
- **Os tetos dos sites de marca, nas duas cópias da régua:**
  - script de 180 para 600 KB (os premiados Halo e Haven carregam ~550 KB);
  - fontes de 200 para 300 KB;
  - carga de 1,5 para 5 MB.

  O site do Atlas mantém os dele. O que reprova continua sendo a experiência: o CLS, o erro, o funcionamento sem script e com movimento reduzido. O tempo avisa, e a regressão bloqueia (`producao/esteira/15-desempenho.md`, seção 1).
- **Onde mais entrou:** a tipografia, a imagem, a galeria, a peça-assinatura, a tecnologia, a construção, a lista de 22 itens, o `conferir-pronto` e o `baixar-fonte` (o teto de 300 KB de fontes) e o README da régua do `web/`.

### 7.8.3 A mesa primeiro, depois o celular, e o premium nos dois

Pedido: "em todo projeto, a experiência premium do computador seja transmitida tão bem quanto nos celulares, mesmo de forma mais leve... desktop first focado 100%, e só depois focar 100% no celular, nunca os 2 juntos".
- **O processo:** a construção tem dois passes, nesta ordem, cada um com foco total e a sua porta: a mesa (1440 px) e depois o celular (390 px). No CSS, nada muda: o que é da mesa vai com o prefixo `lg:` (`producao/esteira/00-principios.md`, seção 5; a etapa 6 no processo, no roteiro e no `/construir`).
- **O premium no toque:** a versão de celular de cada momento da mesa, mais leve e nunca mais pobre (`09-movimento.md`, seção 11), numa tabela nova do `identidade.md`, aprovada com as capturas a 390 px.
- **A régua:**
  - a carga no celular: no 4G lento com a CPU 4×, o LCP até 2,5 s e nunca mais bytes que na mesa;
  - o celular deitado (844 × 390): a geometria e o que fica preso à tela.

  Todos como aviso, calibrados na base (sem aviso) e no Atlas (nove páginas acima de 2,5 s no 4G lento, um dado real).
- **O aparelho real** (um Android intermediário e um iPhone, em pé e deitado) passa a ser porta da publicação em todo plano (`qualidade/08-desempenho.md`, seção 8).
- **O vídeo no celular:** a versão leve, o pôster primeiro e a economia de dados (`08-imagem-e-fotografia.md`, seção 9).
- **Os formulários:** o teclado do celular, com o `enterKeyHint` nos dois módulos, que compilam.

### 7.8.4 O piso do acabamento e o fim dos tetos de peso

Pedido, depois de ver o site de exemplo de odontologia: "não está nem um pouco perto de um site premium, como o Atlas ou o da barbearia... retire limites de tamanho, e preze por um site muito bem trabalhado e referência, mantendo a identidade. Isso até mesmo para outras categorias, mas respeitando a hierarquia. Senti falta de efeitos e derivados".

**O diagnóstico** (capturas a 1440 px da odontologia, da barbearia e do Atlas; a régua nas quatro capas):
- **O título:** o degrau de exibição da odontologia ia de 30 a 35 px, com razão de 2,33 contra o corpo. Na barbearia, a razão é 8,48; na nutrição, 8,03; no depósito, 7,02. É a regra de então, "contenção (razão ≤ 2)", seguida ao pé da letra (`esteira/nichos/odontologia.md`, seção 6.3).
- **O movimento:** "um gesto, contido" e "movimento contido mesmo no Completo" (`esteira/03-planos.md`, seção 5.6). A referência do teste do zero registrou "nada se move sozinho" e tirou o brilho que acompanhava o ponteiro.
- **A peça-assinatura:** o mapa dos dentes em traço fino, como a única imagem da capa, contra as fichas de latão em 3D da barbearia.
- **O kit só freava:** o catálogo anti-IA, o freio do movimento e o "premium não é efeito de catálogo" diziam o que não fazer, e nenhuma porta media a riqueza. O site passou nas portas.
- **O peso não era o freio:** a capa da odontologia carrega 411 KB, mais que a da barbearia (341 KB), dentro de qualquer teto.

**O que mudou no kit:**
- **Os tetos:** sem teto de peso nos sites de marca (régua, `conferir-pronto` e `baixar-fonte`).
- **O piso:** as sete camadas e o teste da vitrine (`esteira/00-principios.md`, seção 9).
- **Os efeitos:** os efeitos da identidade (`09-movimento.md`, seção 12), cada camada inteira e a cena ligada à rolagem no Completo.
- **A tipografia:** a exibição plena ou serena em toda capa, com o aviso novo da régua (`05-tipografia.md`, seção 6.3).
- **A anti-IA:** a página chapada, P1 a P7 (`11-anti-ia.md`, seção 5.10).
- **Os nichos:** os de saúde e de escuta, no tom sereno, e a nova direção de arte da odontologia.
- **O modelo:** a tabela "O acabamento" do `identidade.md`.

### 7.8.5 A barreira do travamento

Decisão de Gabriel Ribeiro Ota Yida (CEO), transmitida pelo usuário: "o tamanho do site não importa, e sim só seu design. Apenas em casos extremos, onde ele ultrapassa uma barreira muito grande e fica travado até mesmo para dispositivos médios".
- **A regra:** nos sites de marca, nem o peso nem o tempo reprovam. A régua reprova só no extremo, num aparelho médio (CPU 4×, o "Mid-tier mobile" do DevTools, no 4G lento), quando:
  - uma tarefa passa de 1 s;
  - o bloqueio somado na carga passa de 3 s;
  - mais de 10% dos quadros da rolagem passam de 100 ms;
  - a primeira tela passa de 10 s.
- **A calibração:**
  - o pior dos sites do Atlas e dos exemplos ficou em 190 ms de tarefa, 140 ms de bloqueio, nenhum quadro lento e 2,6 s;
  - uma página de teste com ~1 s de CPU na carga e ~160 ms por quadro ao rolar reprovou;
  - a mesma página, leve, passou.
- **O que saiu:**
  - os avisos de LCP (2,5 s) e de celular mais pesado que a mesa;
  - a meta de tempo e a porta de regressão relativa, nos sites de marca;
  - o "sem 3D" da oficina e o vídeo de 720p no celular.
  O "mais leve" do celular passou a ser o gesto, e não os bytes.
- **O que fica:** o CLS, os erros, o funcionamento sem script e com movimento reduzido, que não são tamanho, e os tetos e a regressão relativa do site do Atlas.

### 7.8.6 O padrão Atlas (09.10.2026)

Pedidos, depois dos sites de exemplo de odontologia e de restaurante:
- "ainda sinto falta de um premium de verdade... nossos clientes querem sites tão trabalhados como o Atlas, independente do plano, apenas restringindo algumas coisas para manter a hierarquia";
- "faça um estudo profundo sobre design também, uso de cores, interfaces e derivados";
- "estou sentindo uma repetição de efeitos entre páginas, e partes da UI".

O estudo inteiro está em `esteira/19-o-padrao-atlas.md`.

- **O diagnóstico, em seis sites:**
  - **As medidas:** a cor medida em OKLab nas capturas, a régua e dois agentes sem o histórico, um sobre o acabamento do Atlas e da barbearia e outro sobre a construção dos dois sites novos.
  - **Os dois sites novos:** claros e quase sem cor, com o esqueleto da base, a escala que cai depois da capa, a assinatura presa à capa e a interface da base repintada.
  - **O clone:** o restaurante foi clonado da odontologia.
  - **O efeito não bastou:** a odontologia já tinha WebGL, o halo e a cena de rolagem, e mesmo assim ficou abaixo da barbearia.
- **O estudo:** o mundo da marca; a página em cenas; as três estratégias de cor; a interface; a unicidade; o método; a hierarquia nova, em que o toque Atlas é de todo plano.
- **As ferramentas:**
  - `unicidade.mjs`, calibrada;
  - `medir-cor.mjs`;
  - `fotografar.mjs --sem-pele`, conferido na nutrição, que continua folha impressa sem a pele;
  - o gerador de referências, que agora leva o site do Atlas e o CSS das técnicas.
- **A pesquisa de cor, interface e composição:** um agente leu o CSS publicado de nove premiados de negócio físico de 2026 e cerca de 60 fontes, entre elas o Linear, o Stripe, o Radix, o Geist, a Apple, a NN/g, a Vercel e o Emil Kowalski. As regras estão nas seções 4.1, 5.1 e 6.1 do documento, e os premiados do ramo entraram nas referências da odontologia, do restaurante e da barbearia.
- **O vocabulário de interação** ("sinto que você pode adicionar mais animações ou coisas parecidas dentro dos sites completos, mais partes que possuem hovers animados, como o que acontece dentro do site da barbearia e outros dentro do Awwwards"): `esteira/09-movimento.md`, seção 13. Uma resposta por papel, em todo plano; no Completo, as interações de conteúdo e algo que responde à mão em toda cena; M1 e M7 esclarecidos.
- **Revistos:** "uma só ousadia"; a estrutura convencional; a reconciliação anti-IA; o "sem 3D" de quatro nichos; o azulejo do restaurante; a cena de rolagem do Completo, que pode atravessar várias cenas.

### 7.9 O que depende do usuário, depois desta rodada

| Decisão | Por quê |
|---|---|
| O commit e o push desta rodada | O `origin/branchCEO` está com San Francisco e Inter (o push de `3495f71`); as fontes de Gabriel Ribeiro Ota Yida estão só no disco |
| A publicação das correções de 07 e 08/10 | O site no ar é o de 05/10 (seção 7.4) |
| ~~O ferramental desta máquina~~ | **Em parte resolvido em 08.10.2026:** o usuário instalou o `typescript-language-server`. A poda do `.claude/settings.json` e do `.mcp.json` do Atlas (quatro plugins em dobro, o `magicui` com `@latest`) segue com os sócios, porque os arquivos são compartilhados |
| A conferência na Hostinger | O `x-forwarded-for` do proxy, a memória do app (para o `scrypt`), as tarefas agendadas e a versão do banco (`producao/esteira/14-funcionalidades/05-agenda.md`, seção 15) |
| O que segue da seção 5 | O símbolo de acessibilidade e o aviso de privacidade (advogado), a caixa de consentimento, as páginas do módulo fora do limite, a Presença e o primeiro site estático publicado |
| A sociedade | Os itens 1 a 10, 12 e 13, e o resto do 11, da ata v3.0, VI; a versão assinável |
| As decisões que tomei nesta rodada e que o usuário pode desfazer | O diagrama do ofício não é figura; o exemplo de saúde sem foto possível (a I6 não fecha a porta do exemplo); o `@playwright/test` e o `@axe-core/playwright` aprovados pela autorização da rodada; a leitura do antes e depois odontológico pela nota do CFO de 16.01.2026 |
| Os defeitos que as sondas novas acharam no site do Atlas e nos exemplos | O cabeçalho preso à tela sobre o foco (falta `scroll-padding-top`), o e-mail do rodapé partido a 768 px, rótulos de botão partidos nos exemplos e duas linhas acima de 80 caracteres (seção 7.7; `producao/qualidade/02-regua.md`, seção 6). Não corrigi: o pedido desta rodada era o kit, e no `web/` só mudaram as fontes de Gabriel Ribeiro Ota Yida e a cópia da régua |
| ~~O `poppler` nesta máquina~~ | **Resolvido em 08.10.2026:** o usuário o instalou |

### 7.10 O que não se verificou

- **Os serviços de verdade:** o SMTP, o Google e a Hostinger (o proxy, as tarefas, a versão do banco, a memória).
- **Os navegadores:** só o Chrome.
- **O ferramental:** os plugins recomendados não foram instalados. Os comandos foram conferidos pela ajuda da CLI, e o do MCP, numa pasta de teste.
- **As sondas novas da régua:** uma rodada no Atlas e duas na base, e não as dez que a régua pede antes de uma falha; por isso, seguem como aviso.
- **A referência de odontologia:** nenhuma pessoa a reviu, nem um dentista; ela registra o que um agente fez com o kit.

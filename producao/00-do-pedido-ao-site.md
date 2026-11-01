# 00 · Do pedido ao site

> **Para que serve.** O protocolo de entrada. O usuário diz, no terminal, algo como "faz um site pra barbearia do Fulano, plano Completo". Daqui saem:
> - **cliente ou exemplo;**
> - **o nicho:** um dos doze, ou um novo;
> - **o plano e os módulos;**
> - **o que perguntar;**
> - **o que bloqueia;**
> - **a ordem de produção** (`02-ordem-de-producao.md`).
>
> É o que a esteira não cobria: ela começa no briefing pronto (`producao/esteira/01-processo.md`, etapa 2).
>
> **Quando ler.** Antes da primeira pergunta ao usuário, a cada site novo. O comando `/novo-site` (`claude/novo-site.md`) segue este documento.
>
> **Atualizado em:** 08.10.2026.

---

## 1. O que entra e o que sai

| Entra | Sai |
|---|---|
| O pedido, em linguagem livre, e o que vier junto: o briefing, as fotos, o logotipo, o domínio | A ordem (`ordem.json` na raiz do projeto; no repositório do Atlas, `ordens/<pasta>.json`) e o site montado por `ferramentas/novo-site.mjs` |
| | Ou a parada: a lista do que falta, quando um item bloqueante não veio (seção 5) |

**A regra que manda em tudo:** nenhum fato do site existe fora do briefing (`producao/esteira/00-principios.md`, princípio 1). O protocolo nunca preenche com suposição o que o cliente não disse; pergunta, ou para.

## 2. Cliente ou exemplo

| Sinal no pedido | É | O que muda |
|---|---|---|
| Um negócio real, com dono, contrato ou briefing ("o pet shop da Dona Fulana fechou o Essencial") | **Cliente** | O briefing completo é obrigatório (seção 5). Na saída:<br>- os dados reais;<br>- os dados estruturados;<br>- a razão social e o CNPJ no rodapé;<br>- indexável |
| "Site de exemplo", "demonstração", "para a vitrine", "para mostrar o plano X", um negócio sem dono | **Exemplo** [ex] | Estabelecimento fictício:<br>- selo de ficção e `noindex`;<br>- o número `5521900000000`;<br>- nenhum dado estruturado.<br><br>O nome segue `producao/esteira/nichos/README.md`, seção 3.8. O conteúdo é plausível e coerente com o nicho, e nunca imita um negócio real de Niterói |
| Ambíguo | Pergunte | "É um cliente com contrato, ou um site de exemplo para a vitrine?" |

## 3. O nicho

**Os doze** (`producao/esteira/nichos/README.md`, seção 1). O plano de referência é o que se recomenda primeiro; o cliente pode contratar outro.

| Nicho (`pasta`) | O pedido costuma dizer | Plano de referência | O que o conselho limita |
|---|---|---|---|
| `construcao` | material de construção, depósito, loja de tintas, madeireira | Profissional | CDC (preço permitido) |
| `nutricao` | nutricionista, consultório de nutrição | Essencial | CFN 599/2018: o valor só na página de valores, sem moldura promocional |
| `barbearia` | barbearia, barbeiro, salão masculino | Completo (a de bairro costuma comprar o Profissional com a Agenda) | — |
| `odontologia` | dentista, consultório ou clínica odontológica | Completo | CFO: **preço vedado**; **sem antes e depois** (vedado na clínica; política do Atlas no consultório: `esteira/nichos/odontologia.md`, seção 3) |
| `restaurante` | restaurante, lanchonete, pizzaria, bar, marmitaria | Profissional | RDC 216/2004; alérgenos |
| `pet-shop` | pet shop, banho e tosa | Essencial | CFMV 1.649/2025 **só se houver veterinário**: nomear o responsável; sem preço em procedimento que pede avaliação |
| `oficina` | oficina mecânica, auto center, funilaria | Profissional | CDC, arts. 26, 39 e 40 |
| `academia` | academia, pilates, estúdio de treino, crossfit | Profissional | CONFEF 307/2015 (ou CREFITO, se fisioterapeuta) |
| `psicologia` | psicólogo, consultório de psicologia | Essencial | CFP 010/2005 e 003/2007: sem moldura promocional; **sem a Presença** (sigilo) |
| `medicina` | médico, consultório, clínica médica | Completo | CFM 2.336/2023: consulta com preço, procedimento sem; "sem paciente" é política do Atlas |
| `imobiliaria` | imobiliária, corretor de imóveis | Completo | COFECI 1.065/2007: o CRECI junto do nome, com no mínimo 25% do tamanho dele |
| `advocacia` | advogado, escritório de advocacia | Essencial | Provimento 205/2021 da OAB: **honorário vedado**; **nenhum módulo** |

**Nicho fora dos doze.** Exemplos: salão de beleza, clínica veterinária, fisioterapia, contabilidade, escola, loja de roupa, estúdio de tatuagem.
- **A ordem:** `"nicho": "novo:<nome>"`.
- **Na etapa 3, antes de qualquer texto:**
  1. Escreva `producao/esteira/nichos/<nome>.md` no repositório do cliente, com a estrutura de `producao/esteira/nichos/README.md`, seção 2.
  2. Preencha a norma **na fonte primária**: resolução, provimento ou lei; nunca imprensa setorial.
  3. Marque como [NV] toda leitura própria, até o advogado.
- **O vizinho mais próximo** serve de ponto de partida para a estrutura e a direção de arte, nunca para a norma:
  - salão de beleza → barbearia;
  - clínica veterinária → pet shop com veterinário e medicina;
  - fisioterapia → academia (CREFITO) e medicina;
  - contabilidade → advocacia.
- **Ao terminar o site,** proponha ao usuário levar o nicho novo para a esteira do Atlas (registro de decisões).

**Regulado e com norma que muda o site** (preço, imagem, depoimento): leia o arquivo do nicho **antes** de recomendar o plano. Um plano cujo atrativo é algo vedado no nicho (por exemplo, a tabela de preço na odontologia) se recomenda pelo resto, e isso se diz.

## 4. O plano e os módulos

**Se o usuário disse o plano, vale o que ele disse.** Confira só se o nicho admite o que o plano promete. Exemplo: o Essencial na advocacia não leva módulo.

**Se não disse, recomende** pela tarefa do degrau (`producao/esteira/03-planos.md`, seção 1). Diga o porquê em uma frase e pergunte:

| A necessidade do negócio | Plano | Criação · mensalidade |
|---|---|---|
| Ser encontrado e chamado: um serviço principal, um decisor, ticket baixo; hoje só boca a boca e Instagram | **Essencial** (até 3 páginas) | R$ 900 · R$ 190 |
| Ser escolhido: é comparado antes da compra, tem catálogo ou obra para mostrar, perde cliente por não responder a dúvida | **Profissional** (até 6 páginas; formulário, galeria, uma funcionalidade do ofício) | R$ 1.500 · R$ 250 |
| Trabalhar pelo negócio: marcar, orçar, preparar, filtrar; ou muitas páginas (um tratamento, um imóvel por página) | **Completo** (sem limite de páginas; duas funcionalidades, peça-assinatura, 3D nas cinco condições) | R$ 2.400 · R$ 400 |

**Os módulos** (`producao/esteira/03-planos.md`, seção 8):

| Módulo | Quando | Preço |
|---|---|---|
| **Agenda** | Quem atende por horário. Põe o site em servidor (web app Node.js) | +R$ 400 · +R$ 80/mês |
| **Presença** | Perfil no Google e avaliações. Nunca na psicologia nem na advocacia. **A função não tem titular desde 30.09.2026** (`producao/esteira/14-funcionalidades/06-presenca.md`): confirme com os sócios quem a faz antes de prometê-la | +R$ 300 · +R$ 100/mês |
| **Página adicional** | Essencial e Profissional, além do limite de páginas | R$ 250, sem recorrência |

As páginas legais (privacidade, acessibilidade) e as páginas do módulo (a marcação e o painel da Agenda) não contam no limite (`producao/esteira/03-planos.md`, seção 8).

**A coleta de dados e o CNPJ do Atlas.** O formulário [P][C] e a Agenda coletam dados pessoais, e o site com coleta **não vai ao ar** sem o contrato de operador. Esse contrato depende do CNPJ do Atlas, que ainda não existe (`producao/esteira/17-conformidade-e-normas.md`, seção 10, itens 2 e 8).
- **Diga isso já na entrada:** o rascunho sai no prazo; a publicação com coleta espera o contrato.
- **Até o contrato:** o rascunho e a publicação saem com a coleta desligada, e o formulário cede lugar à mensagem composta no aparelho e enviada pelo WhatsApp (`producao/esteira/14-funcionalidades/02-formulario.md`, seção 10). Os testes de envio usam dado fictício.

**Condição de Fundação** (ata v3.0, IV.3): só os três primeiros contratos, com metade da criação e a mensalidade congelada por doze meses. Pergunte o número do contrato se o usuário mencionar.

**Desconto só na criação, nunca na mensalidade.** Pacotes de agosto (Profissional + Agenda, Consultório) estão **fora de vigência**: não ofereça (`producao/esteira/03-planos.md`, seção 8).

## 5. O que perguntar, e o que bloqueia

Pergunte **numa mensagem só**, com a sua recomendação em cada item. O que o pedido já respondeu não se pergunta de novo.

**Site de cliente.** O briefing é feito no estabelecimento por Gabriel Ribeiro Ota Yida (etapa 1), nunca pelo terminal: se não veio, a produção não começa.

| # | Pergunta | Bloqueia? |
|---|---|---|
| 1 | "O briefing completo está onde?" (arquivo ou texto, com os campos ● do modelo `producao/esteira/modelos/briefing.md` e os campos do nicho: a seção 12 do modelo, copiada de "No briefing, bloqueante neste nicho", na seção 4 do arquivo do nicho) | **Sim.** Sem ele, pare e liste os campos ● que faltam |
| 2 | "Plano e módulos: confirmo <recomendação>?" | Sim |
| 3 | "Domínio?" (está no briefing: "Domínio verificado, com duas alternativas") | Sim |
| 4 | "O WhatsApp que atende de verdade?" (do briefing) | Sim |
| 5 | "A que horas o material completo chegou ao grupo?" (o relógio das 24 horas) | Sim |
| 6 | "É um dos três contratos da Condição de Fundação?" | Não (padrão: não) |
| 7 | "As fotos e o logotipo estão onde?" (o protocolo de fotos; o arquivo do logotipo, ou "não há") | Sim, para a construção; não, para criar o repositório |
| 8 | "O contrato está assinado, com a primeira parcela paga ou com data?" (producao/esteira/01-processo.md, etapa 0) | **Sim** |
| 9 | Com formulário [P][C] ou Agenda: o aviso da coleta (seção 4). As dependências (`nodemailer`, `mysql2`) já estão aprovadas (`modulos/README.md`, seção 3) | Não para criar; **sim** para publicar com envio real |
| 10 | "Onde criar o site?" | Não. Padrão: neste projeto, ao lado de `producao/`; no repositório do Atlas, numa pasta nova ao lado dele |

**Site de exemplo:**

| # | Pergunta | Bloqueia? |
|---|---|---|
| 1 | "Nicho e plano: confirmo <o plano de referência do nicho>?" | Sim |
| 2 | "Bairro de Niterói?" (padrão: um bairro coerente com o nicho, diferente dos exemplos que já existem: Icaraí, Engenhoca, Santa Rosa e Fonseca) | Não |
| 3 | Se o nicho já tem exemplo — nutrição, construção (o depósito) e barbearia estão no site do Atlas (`web/app/demos/`) —: "Refaço este, substituo o de lá ou faço um segundo?" | **Sim**, salvo se o pedido já disse qual. Recomendação: um segundo, para não mexer no que está no ar |
| 4 | Fora dos três: "A decisão de 12.09.2026 é refazer os outros exemplos só depois do primeiro cliente (`producao/esteira/nichos/README.md`, seção 4). Sigo assim mesmo?" | **Sim**, salvo se o pedido já disse que quer o exemplo. Pedido explícito vence a decisão de 12.09: siga e registre no `decisoes.md` |

**Como o exemplo vai ao ar.** Num subdomínio do Atlas, `<nicho>.agenciaatlasdigital.com`: é o vínculo que o vendedor manda (`producao/esteira/nichos/README.md`, seção 3.8). O `novo-site` já grava esse domínio.
- O exemplo é estático: não coleta nada.
- A publicação segue `producao/esteira/18-publicacao-e-manutencao.md`, seção 3, no subdomínio. Criar o subdomínio no hPanel é passo A CONFIRMAR no painel.
- Publicar é ação externa: só com pedido explícito (`claude/commands/publicar.md`).

**Nunca se pergunta o que a esteira decide:**
- a pilha;
- a régua;
- a privacidade;
- as normas;
- o limite de páginas.

**Nunca se pergunta o que é da direção de arte** (cores, fontes): sai do briefing e das referências, na etapa 4.

## 6. O que não se aceita como está

O pedido abaixo não se recusa em silêncio. Diga a regra, ofereça a alternativa e registre.

| Pedido | Por que não | A alternativa |
|---|---|---|
| Loja virtual com pagamento, carrinho, estoque | Fora dos planos; exige servidor, PCI e contrato próprio | O montador de pedido que fecha no WhatsApp (`producao/esteira/14-funcionalidades/07-funcionalidades-do-oficio.md`); orçamento à parte, decisão dos sócios |
| Blog com painel para o cliente escrever (CMS) | Nenhum CMS por padrão (`producao/esteira/13-tecnologia-e-estrutura.md`, seção 8.3) | A manutenção mensal muda o texto; página nova pela Página adicional |
| Google Analytics, pixel, chat de terceiros, mapa embutido do Google | Nenhum pedido externo, cookie ou rastreador (`producao/esteira/17-conformidade-e-normas.md`) | O relatório de acessos com os dados da Hostinger [P][C]; "Ver no mapa" como vínculo; o WhatsApp |
| Rolagem com inércia (Lenis e afins) | Vedada pela ata v3.0 (V) | — |
| Foto de banco ou gerada por IA, depoimento ou número inventado | Princípio 1 (`producao/esteira/00-principios.md`) | Os substitutos sem foto de `producao/esteira/08-imagem-e-fotografia.md`; o protocolo de fotos |
| "O melhor da cidade", superlativo sem prova, preço baixo como argumento | Registro e ata (IV.1) | O fato específico do briefing |
| Preço onde o conselho veda (odontologia, honorário na advocacia, procedimento na medicina) | A norma do nicho | A avaliação, o convênio, a forma de pagamento |
| Site pronto em 24 horas | O que sai em 24 horas é o **rascunho navegável** (ata v3.0, IV.4) | O prazo de publicação do plano, depois da aprovação |
| Página além do limite do plano | Escopo | A Página adicional, orçada antes |

## 7. Do pedido à ordem, passo a passo

0. **O ambiente:** `node producao/ferramentas/conferir-ambiente.mjs`. O que bloqueia (o Node 22, o npm, o Chrome), o usuário instala antes do passo 7, pelo comando que a ferramenta imprime. O recomendado e as permissões vão na mensagem do passo 3 (`claude/novo-site.md`, "Antes de tudo").
1. Leia o pedido e o que veio junto. Classifique: cliente ou exemplo (seção 2), nicho (seção 3), plano e módulos (seção 4).
2. Leia, antes de escrever o briefing:
   - `producao/esteira/nichos/<nicho>.md`, **inteiro**: a norma, as páginas, as funcionalidades e "No briefing, bloqueante neste nicho";
   - `producao/esteira/03-planos.md`, o plano do pedido;
   - no Completo, também `producao/esteira/14-funcionalidades/07-funcionalidades-do-oficio.md` e `08-peca-assinatura.md`.

   O briefing fictício do teste de 08.10.2026 saiu sem o registro da clínica, sem a acessibilidade do prédio e sem o "o que é" de cada tratamento, porque foi escrito antes dessas leituras.
3. Pergunte o que falta (seção 5), numa mensagem. Se um item bloqueante não vier, **pare** e diga o que pedir ao sócio do briefing.
4. **O briefing num arquivo, `briefing.md`, na raiz do projeto.**
   - **Cliente:** o briefing recebido; se veio como texto na conversa, grave-o ali.
   - **Exemplo:** o briefing **fictício**, escrito agora pelo modelo `producao/esteira/modelos/briefing.md`, com todos os campos ● e os "bloqueantes neste nicho" (seção 4 do nicho). Ele é a origem de cada fato do conteúdo; o gabarito está em `exemplo/briefing.md`. No exemplo:
     - **o endereço** é uma rua e um CEP reais do bairro, conferidos no OpenStreetMap, com o número fictício (000);
     - **nada se afirma sobre a rua real** que não se possa conferir: estacionamento, acesso, vizinhança;
     - **o registro do conselho** é fictício e evidente (00000);
     - **o que não se aplica a um exemplo** (os três concorrentes, a hora do material, o contrato) se escreve "não se aplica: exemplo", e o `novo-site` aceita.
   - **O material do cliente** (fotos, logotipo, documentos) vai para `material/`, na raiz, que fica fora do git e do ar.
5. **A ordem** (`02-ordem-de-producao.md`) em `ordem.json`, na raiz do projeto, mostrada ao usuário. No repositório do Atlas, em `ordens/<pasta>.json`, o registro de todo site criado.
6. **Monte o site:**

   ```bash
   node producao/ferramentas/novo-site.mjs ordem.json --briefing=briefing.md
   ```

   - **No projeto vazio** (a raiz só com `producao/`, a ordem, o briefing e `material/`), o site nasce ali mesmo, ao lado de `producao/`, que fica intacta.
   - **No repositório do Atlas** (`node producao/ferramentas/novo-site.mjs ordens/<pasta>.json --briefing=<arquivo>`), o site nasce numa pasta nova ao lado dele, com uma cópia do kit dentro. Rode com o sandbox desligado: fora do diretório da sessão, a escrita é negada.
   - **O que o `novo-site` confere:** os campos ● do briefing, **antes** de criar qualquer arquivo.
   - **Com erro:** corrija e rode de novo; nada terá sido criado.
7. **Instale e compile**, com o sandbox desligado (rede):
   - `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci`;
   - `npm test`;
   - `npm run build`.
8. **Uma rota só daqui em diante: `/proxima-etapa`.** Ele confere a porta da etapa 2 (servir e rodar a régua) e segue o roteiro (`01-roteiro-da-sessao.md`).
   - **No projeto vazio,** siga na mesma sessão. Os comandos de `.claude/commands/` aparecem com `/` na próxima sessão do Claude Code; até lá, leia `.claude/commands/proxima-etapa.md` e siga.
   - **No repositório do Atlas,** informe ao usuário o caminho do site e esse passo: abrir uma sessão nova do Claude Code **na pasta do site**.

## 8. Três pedidos, três saídas

**"Faz um site pro pet shop da Dona Fulana, no Fonseca."**
- É cliente, nicho `pet-shop`, sem plano dito.
- Com a Agenda, avise a coleta (seção 4): a publicação com marcação real espera o contrato de operador.
- Recomende o Essencial; se ela atende por horário, a Agenda (que põe o site em servidor).
- Pergunte se há veterinário: muda a norma e o rodapé.
- Sem o briefing: **pare** e liste os campos ● e os do pet shop, a tabela por porte e pelagem.

**"Cria um site de exemplo de academia para a vitrine."**
- É exemplo, nicho `academia`, plano de referência Profissional.
- Confirme o plano e o bairro (por exemplo, o Barreto).
- Nome fictício pela regra de `producao/esteira/nichos/README.md`, seção 3.8; número fictício.
- O briefing fictício antes da ordem (seção 7, passo 4); o domínio é o subdomínio da vitrine.
- A ordem sai com `tipo: "exemplo"`, sem `briefingCompletoEm`.

**"O Dr. Fulano, dentista em Icaraí, fechou o Completo com Agenda; o briefing está em ~/Downloads/briefing.md."**
- É cliente, nicho `odontologia`, plano `completo`, módulos `["agenda"]`, em servidor.
- Leia o briefing e confira os campos ●: o CRO e o responsável técnico, se for clínica.
- Avise já na entrada: **preço vedado** e antes e depois fora, até o advogado.
- A Agenda instala o `nodemailer` e o `mysql2`, aprovados em 08.10.2026, no passo 1 da instalação do módulo (`modulos/README.md`, seções 3 e 6).
- A coleta (seção 4): o site com a Agenda real só vai ao ar com o contrato de operador, que depende do CNPJ do Atlas.

# Funcionalidades · o catálogo

> **Para que serve.** Diz o que cada site do Atlas faz, em que plano e em que nicho, e onde está a especificação de cada coisa. É a porta de entrada da pasta `14-funcionalidades/`: cada funcionalidade tem objetivo de negócio, regras, implementação de referência e o teste que prova que funciona.
>
> **Quando ler.** Depois de `../03-planos.md` (o que o plano contratado inclui) e de `../nichos/<nicho>.md` (o que o ramo pede e o que a norma veda), antes de escrever a primeira ilha.
>
> **Depende de.** `../00-principios.md`, `../13-tecnologia-e-estrutura.md` (estrutura, convenções e a regra de tecnologia nova), `../15-desempenho.md`, `../16-acessibilidade.md`, `../17-conformidade-e-normas.md`.
>
> **Atualizado em:** 16.10.2026: a busca e as respostas de IA na base de todo site, em todo plano (`../21-busca-e-ias.md`). Antes, 08.10.2026. Estado: RATIFICADO em 08.10.2026, salvo onde o item diz outro estado.

---

## 1. A regra geral de toda funcionalidade

Toda funcionalidade, da mais simples (o vínculo do WhatsApp) à mais pesada (a Agenda), cumpre as dez regras abaixo. Elas existem porque cada uma nasceu de um defeito real: uma funcionalidade que funciona na tela do desenvolvedor e falha no aparelho do cliente custa a confiança que o site deveria construir.

| # | Regra | Objetivo | Como conferir |
|---|---|---|---|
| 1 | **Tem um objetivo de negócio escrito**, numa frase, antes do código ("o cliente chega ao balcão com a lista certa") | Funcionalidade sem objetivo vira enfeite; enfeite é a marca mais comum de site genérico (`../11-anti-ia.md`) | A frase está no `decisoes.md` do cliente e no comentário do componente |
| 2 | **Funciona sem script** — ou diz, sem script, o que fazer no lugar | O site é HTML do servidor; o script só acrescenta. Aparelho lento, rede ruim e bloqueador de script existem (`../00-principios.md`) | Régua, bloco 2 (`../../qualidade/02-regua.md`); teste de ponta a ponta com `javaScriptEnabled: false` |
| 3 | **Respeita o movimento reduzido**: nada desloca, nada some, a troca é seca ou uma dissolução de até 150 ms | WCAG 2.3.3; enjoo vestibular (`../09-movimento.md`) | Régua, bloco 2 (o que se move com movimento reduzido reprova) |
| 4 | **Funciona por teclado e por leitor de tela**: nome acessível, foco visível, alvo de 44 px, estado anunciado (`aria-live="polite"` no resultado que muda) | Lei 13.146/2015, art. 63; WCAG 2.2 AA (`../16-acessibilidade.md`) | Régua, blocos 1, 3 e 4; o roteiro do leitor de tela (`../../qualidade/06-acessibilidade.md`) |
| 5 | **Não grava nada no aparelho e não faz pedido a terceiros** no site público: nenhum cookie, nenhum `localStorage` ou `sessionStorage`, nenhum script, fonte ou imagem de fora | Privacidade por construção; política de conteúdo `default-src 'self'`; nenhum banner de cookie (`../17-conformidade-e-normas.md`) | Régua, bloco 5 (pedido externo e gravação no aparelho reprovam) |
| 6 | **Coleta dado só pelo formulário declarado** (`02-formulario.md`) ou pela Agenda (`05-agenda.md`); as outras funcionalidades só **compõem uma mensagem** que sai do próprio aparelho, pelo WhatsApp | Ata v3.0, IV.2.1, item 2: a coleta é pelo formulário; coletando, vale o pacote de conformidade inteiro | Leitura do código: nenhum `fetch` de envio fora do formulário e da Agenda |
| 7 | **Cumpre a norma do conselho** do nicho: preço onde é permitido, nada de promessa de resultado, nada de depoimento onde é vedado | Os conselhos punem o profissional, e o site é a peça de publicidade dele (`../nichos/<nicho>.md`) | Lista de termos vedados do nicho (`../../qualidade/10-conteudo-normas-e-texto.md`) |
| 8 | **Diz a verdade sobre o próprio estado**: o "copiar" só confirma se copiou; o envio não sai com a lista vazia; o resultado sem medida mostra traço, nunca zero | Estado falso é o defeito mais caro: o cliente age sobre ele (lições de 03.10: o "Copiado" que mentia; a calculadora que enviava lista zerada) | Teste de ponta a ponta do caminho de falha (área de transferência recusada, campo vazio) |
| 9 | **É uma ilha só se tiver estado**, carrega o mínimo e mede o que custa: componente de servidor por padrão; `"use client"` só no que muda com a pessoa; painel pesado só sob demanda (no primeiro sinal de intenção) | Desempenho em aparelho modesto; o teto de script inicial, de 600 KB nos sites de marca: a folga é do design premium, não da ilha sem estado (`../15-desempenho.md`) | Régua, bloco 5 (script do HTML); medição antes e depois na nota da funcionalidade |
| 10 | **Tem o seu teste**: a lógica pura em teste de unidade (a conta, a data, a mensagem) e o fluxo em teste de ponta a ponta | Funcionalidade sem teste quebra na primeira atualização do Next ou do conteúdo | `../../qualidade/04-unidade.md` e `../../qualidade/05-ponta-a-ponta.md` |

**O texto de toda funcionalidade** segue `../10-texto-e-conteudo.md`: rótulo impessoal; o botão diz o que acontece ("Enviar pelo WhatsApp", "Copiar a lista", nunca "Enviar" ou "Saiba mais"); o erro diz o problema e a saída, sem pedir desculpa.

---

## 2. O catálogo

**Legenda.** [todos] = todo site; [E]/[P]/[C] = plano; [ex] = só site de exemplo; [cli] = só site de cliente. "Módulo" = vendido à parte (ata v3.0, IV.2: Agenda +R$ 400 e +R$ 80/mês; Presença +R$ 300 e +R$ 100/mês; Página adicional R$ 250 por página, sem recorrência, no Essencial e no Profissional).

### 2.1 · Base de todo site — `01-base-de-todo-site.md`

**Aparecer nas buscas e nas respostas de IA é da base, em todo plano** (DECIDIDO em 16.10.2026, a pedido do usuário; `../21-busca-e-ias.md`; `../03-planos.md`, seção 1, regra 5): as linhas marcadas [todos] abaixo valem para o Essencial, o Profissional e o Completo, sem diferença de plano.

| Funcionalidade | Plano | Observação |
|---|---|---|
| Vínculo do WhatsApp com mensagem pronta | [todos] | A ação principal de todo site; na primeira tela do celular |
| Telefone que liga (`tel:`) | [todos] | Ao lado do WhatsApp, nunca no lugar dele |
| Endereço com vínculo para o mapa; mapa do bairro em vetor | [todos] | Nunca `iframe` do Google Maps (pedido externo e cookies) |
| Horário de funcionamento | [todos] | Com feriados e exceções |
| Estado ao vivo ("aberto agora", o corte da entrega) | [P][C] | Navegação viva; no fuso de São Paulo, nunca no do aparelho |
| Nome, endereço e telefone iguais em todo lugar | [todos] | No início, no contato, no rodapé, nos dados estruturados e no perfil do Google |
| Registro do conselho visível também no celular | [todos], nichos regulados | CRM, CRO, CRP, CRN, OAB, CRECI (junto do nome, com no mínimo 25% do tamanho dele), responsável técnico do CFMV, CREF |
| Prazo de resposta publicado | [todos] | Campo obrigatório do briefing; o cliente se compromete |
| Crédito do Atlas | [cli] [ex] | [cli] "Site por Atlas Digital", em texto, no rodapé, sem o logotipo; [ex] "Site do plano X, feito pela Atlas Digital." |
| Metadados e cartão de compartilhamento | [todos] | Título, descrição e `og:` distintos por página; imagem 1200 × 630 em JPEG abaixo de 600 KB |
| Dados estruturados: `WebSite` e o negócio local, num grafo com `@id` | [cli], em todo plano | Nunca no site de exemplo (seria dado falso de negócio fictício) |
| Mapa do site e `robots` | [todos] | [cli]: o `robots` libera tudo, inclusive os robôs de IA; o mapa com o endereço canônico e a data verdadeira. [ex]: `noindex` na página e no cabeçalho, e o mapa vazio (`01-base-de-todo-site.md`, seção 12) |
| Robôs de IA fora do site de exemplo | [ex] | Os 11 de treino ou sem `noindex` documentado com `Disallow: /`; os buscadores livres para ler o `noindex` (`01-base-de-todo-site.md`, seção 12) |
| Texto legível sem montar a página (o texto que o robô lê) | [todos] | O `{" "}` entre linhas e rótulos; a cópia decorativa só pelo CSS; a conferência por `ferramentas/texto-do-robo.mjs` (`01-base-de-todo-site.md`, seção 19) |
| `llms.txt` | [todos] | Gerado do conteúdo; no exemplo, só o nome e o selo de ficção, sem contato nem páginas (`../21-busca-e-ias.md`, seção 7) |
| Aviso ao IndexNow a cada publicação, e a lista do que depende do dono (Search Console, Bing, Perfil da Empresa) | [cli], em todo plano | `ferramentas/avisar-indexnow.mjs`, só das páginas que mudaram (`../21-busca-e-ias.md`, seções 8 e 9) |
| Página 404 e telas de erro em português | [todos] | |
| Selo de ficção e `noindex` | [ex] | Obrigatórios |
| Pausa do movimento | [C] (o ambiente contínuo é do Completo) | WCAG 2.2.2: o que se move sozinho por mais de 5 s tem pausa |
| Âncora com decodificação segura | [todos] | O `/#%E0` que derrubou a página em 03.10 |
| Cabeçalho, navegação e menu do celular | [todos] | Sem script, o menu leva ao índice do rodapé |
| Vínculo "Ir para o conteúdo" | [todos] | O primeiro foco da página |

### 2.2 · Itens dos planos

| Funcionalidade | Plano | Documento |
|---|---|---|
| Formulário (coleta de dados) | [P][C] | `02-formulario.md` |
| Galeria | [P][C] | `03-galeria.md` |
| Relatório mensal de acessos | [P][C] | `04-relatorio-de-acessos.md` |
| Funcionalidade sob medida do ofício | [P] uma · [C] duas | `07-funcionalidades-do-oficio.md` |
| Peça-assinatura | [C] | `08-peca-assinatura.md` |
| Páginas sem limite; revisão trimestral de conteúdo; atendimento prioritário | [C] | `../03-planos.md` e `../18-publicacao-e-manutencao.md` |

### 2.3 · Módulos

| Módulo | Pode entrar em | Documento |
|---|---|---|
| Agenda (marcação e confirmação no próprio site, com servidor próprio) | [E][P][C] | `05-agenda.md` |
| Presença (perfil no Google e avaliações) | [E][P][C] | `06-presenca.md` |
| Página adicional | [E][P] (o Completo não tem limite de páginas) | `../03-planos.md` |

### 2.4 · Funcionalidades do ofício, por nicho — `07-funcionalidades-do-oficio.md`

O plano de referência de cada nicho está em `../nichos/README.md` (ordem comercial e plano, decididos em 07.10.2026 e ratificados em 08.10.2026). A coluna "Funcionalidade 1" é a do Profissional; o Completo leva as duas.

| Nicho | Plano de referência | Funcionalidade 1 | Funcionalidade 2 (Completo) | Módulo que costuma pedir |
|---|---|---|---|---|
| Construção | Profissional | Calculadora de materiais, com a lista pelo WhatsApp | Estado da loja e o corte da entrega | Presença |
| Nutrição | Essencial | — (no Profissional: a primeira consulta em três passos, com o preparo) | — (no Completo: a biblioteca filtrável; `../nichos/nutricao.md`, seção 4.2) | Agenda; Presença só com o perfil |
| Barbearia | Completo | Pedido de horário (o quadro de serviços → serviço, barbeiro, dia e período → a mensagem) | Janela de retorno (o corte e a data do último → a próxima janela) | Agenda e Presença |
| Odontologia | Completo | Pedido de avaliação (o atendimento, nunca o sintoma, e a região no mapa dos dentes → a mensagem; sem preço) | Plano de sessões, aberto pelo mesmo mapa (o tratamento → sessões, intervalos e cuidados; sem preço) | Agenda; Presença com cautela |
| Restaurante | Profissional | Montador de pedido com o total | Prato do dia por dia da semana | Presença; Agenda só se houver reserva |
| Pet shop | Essencial | — (no Profissional: porte × pelagem → tempo e preço da rotina) | — (no Completo: o leva e traz por bairro; `../nichos/pet-shop.md`, seção 5.3) | Agenda e Presença |
| Oficina | Profissional | "Descreva o problema": o compositor de sintoma, com o diagrama das zonas do carro | Ordem de serviço (orçamento válido por 10 dias; garantia de 90 dias) | Presença; Agenda opcional |
| Academia | Profissional | Grade semanal com vagas por turma e "próxima aula em" | Montador de plano (modalidade e vezes por semana → o plano e a mensalidade) | Agenda (aula experimental) e Presença |
| Psicologia | Essencial | — (no Profissional: como é a primeira sessão, presencial ou a distância) | — (no Completo: "o que perguntar"; `../nichos/psicologia.md`, seção 5.3) | Agenda com o mínimo de dados; Presença não |
| Medicina | Completo | Agendamento com duração e valor (o tipo de consulta → duração, valor da consulta, convênios → o pedido) | Preparo por tipo de consulta | Agenda; Presença só com o perfil |
| Imobiliária | Completo | Filtro da carteira | Custo de entrada na escritura | Presença; Agenda para visitas |
| Advocacia | Essencial | — (o Provimento 205/2021 coincide com os limites do Essencial: sem formulário, sem galeria, sem honorário; num Profissional, a funcionalidade seriam as áreas como índice de código, com notas laterais) | — (no Completo: a consulta por área; `../nichos/advocacia.md`, seção 5.3) | Nenhum |

A coluna "Funcionalidade 1" segue o quadro de `../nichos/README.md`, seção 1; o arquivo do nicho prevalece sobre este catálogo quando os dois divergirem. Os parênteses dos nichos Essencial são RATIFICADO: dizem o que entraria se o cliente contratasse o Profissional.


---

## 3. Como escolher a funcionalidade sob medida

A funcionalidade sob medida é **o que o site faz e um site genérico não faria**. Escolhe-se em cinco perguntas, nesta ordem; a que falhar em qualquer uma volta para a lista.

1. **Resolve a dor que o briefing registrou?** A dor vem do dono, não da equipe. *Objetivo:* a funcionalidade existe para o negócio, não para o portfólio.
2. **É do ofício?** O teste: *caberia em qualquer site?* Se sim, não é do ofício. A calculadora de materiais só existe num depósito; um "simulador de orçamento" genérico existe em qualquer lugar. *Objetivo:* a funcionalidade é também identidade (`../11-anti-ia.md`).
3. **Termina na ação principal?** A funcionalidade leva a uma conversa: compõe a mensagem do WhatsApp, preenche o formulário, marca o horário. Uma que termina em si mesma é brinquedo. *Objetivo:* conversão.
4. **Cabe na norma?** Preço onde é vedado, promessa de resultado, dado de saúde coletado no site: fora (`../nichos/<nicho>.md`). *Objetivo:* não expor o cliente a processo ético.
5. **Quem mantém os dados?** Índices de consumo, preços, horários, vagas: cada número que a funcionalidade usa precisa de um dono que o atualize, e a mudança entra pela manutenção mensal (`../18-publicacao-e-manutencao.md`). Dado que ninguém atualiza mente com o tempo. *Objetivo:* a funcionalidade continuar verdadeira depois da entrega.

**Desempate.** Entre duas candidatas, fica a que funciona sem servidor (compõe a mensagem no aparelho). Ela cabe num site estático e não ocupa vaga de web app Node (`../18-publicacao-e-manutencao.md`).

---

## 4. O que conta, e o que não conta, como funcionalidade sob medida

**Conta** (uma ferramenta que faz o trabalho de alguém do balcão):
- uma **conta** com regra do negócio (a calculadora, o total do pedido, o custo de entrada na escritura);
- um **filtro ou uma escolha guiada** sobre dados do cliente (a carteira de imóveis, o porte e a pelagem, a região do dente);
- uma **conta de data** (a janela de retorno, a próxima aula, o corte da entrega);
- um **roteiro** que prepara o cliente (a primeira consulta em três passos, como é a primeira sessão, o preparo por tipo de consulta);
- uma **composição de pedido** que chega pronta ao balcão (o talão, o pedido de horário, a ordem de serviço).

**Não conta** (já está no plano, ou não é ferramenta):
- o vínculo do WhatsApp, o mapa, o horário, o formulário, a galeria, o relatório de acessos — itens de plano;
- movimento, gesto do Spell UI, transição entre páginas — camada de movimento;
- páginas, perguntas frequentes, textos — conteúdo;
- depoimentos e avaliações próprias — vedados em vários conselhos (CFN e CFP, por exemplo; `../nichos/<nicho>.md`) e, sem fonte verificável, indistinguíveis de inventados;
- widget de terceiro (chat, avaliações do Google embutidas, mapa embutido, agenda de terceiro) — pedido externo, cookie e dado fora do controle do cliente;
- *chatbot* — promete o que não sabe; nenhum nicho do Atlas precisa dele.

---

## 5. Quantas, por plano, e o que acontece quando o pedido passa disso

| Plano | Funcionalidades sob medida | Fonte |
|---|---|---|
| Essencial | Nenhuma | Ata v3.0, IV.2.1 |
| Profissional | Uma | Ata v3.0, IV.2.1 |
| Completo | Duas | Ata v3.0, IV.2.1 |

Pedido além do plano: "o que excede o escopo do plano é orçado antes de ser feito, nunca cobrado depois" (`../01-processo.md`, etapa 9), ou o cliente muda de plano (`../03-planos.md`, seção 7). Um módulo (Agenda, Presença) não conta como funcionalidade sob medida: é vendido à parte e pode entrar em qualquer plano.

---

## 6. O que entra no rascunho de 24 horas

O rascunho é o site navegável por endereço em até 24 horas após o briefing completo (ata v3.0, IV.4), num endereço de homologação com `noindex` (`../01-processo.md`). Nele:

| Plano | Funcionalidades no rascunho |
|---|---|
| [E] | Toda a base (seção 2.1), com o texto real |
| [P] | A base, a galeria com as fotos tratadas e a funcionalidade sob medida em versão inicial, já funcionando (`../03-planos.md`, seção 4.7). O formulário aparece com os campos, a validação e os estados; o envio de verdade (SMTP, limite por IP, aviso de privacidade publicado) entra até a publicação (RATIFICADO) |
| [C] | O do Profissional, mais a segunda funcionalidade em versão inicial (meta do usuário em 07.10.2026: "criar um site em sua versão inicial, com a maioria das funcionalidades trabalhadas por ti"); a peça-assinatura na versão de reserva, estática |
| Agenda | Nunca no rascunho de 24 horas: exige banco, e-mail e o teste da corrida; entra até a publicação |

---

## 7. Mapa da pasta

| Arquivo | Conteúdo |
|---|---|
| `01-base-de-todo-site.md` | O que todo site tem, com implementação |
| `02-formulario.md` | O formulário: campos, envio sem script, proteção sem terceiros, e-mail, privacidade |
| `03-galeria.md` | A galeria de deslizar e a grade, imagens, teclado |
| `04-relatorio-de-acessos.md` | O relatório mensal com os dados da Hostinger, e a alternativa no servidor |
| `05-agenda.md` | O módulo Agenda: banco, horários livres, corrida, confirmação, lembrete, painel, cancelamento |
| `06-presenca.md` | O módulo Presença: o perfil no Google e as avaliações |
| `07-funcionalidades-do-oficio.md` | As funcionalidades sob medida de cada nicho |
| `08-peca-assinatura.md` | A peça-assinatura do Completo: 3D, mapa do bairro, ilustração, som |

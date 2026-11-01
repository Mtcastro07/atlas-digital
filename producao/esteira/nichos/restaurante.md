# Restaurante · Profissional

> **Para que serve.** Tudo o que o site de um restaurante de bairro precisa, do briefing à entrega: as regras de consumo e de alimento, o cardápio, o montador de pedido, o vídeo de capa, a direção de arte de partida, o texto e a conferência. Vale para o restaurante de prato do dia, a cozinha caseira e o delivery próprio.
>
> **Estado.** Ordem comercial (5º) e plano de referência (Profissional): RATIFICADO (decidido em 07.10.2026; ratificado em 08.10.2026). Norma: o Código de Defesa do Consumidor e o decreto do comércio eletrônico conferidos no texto oficial [V]; a lei estadual de informação nutricional e as normas da Anvisa lidas em fonte secundária [FU]. Direção de arte: RATIFICADO.
>
> **Leia com.** `README.md` (o quadro comum); `../03-planos.md`, seção 4; `../14-funcionalidades/07-funcionalidades-do-oficio.md` e `../14-funcionalidades/03-galeria.md`; `../08-imagem-e-fotografia.md` (vídeo).
>
> **Implementação de referência.** Nenhuma em Next.js. A versão estática de setembro ("Cozinha do Ingá") existe só em pacote, no repositório do Atlas (`nichos/atlas--demo-restaurante--2026-09-07.zip`; ler em memória, nunca extrair).
>
> **Atualizado em:** 08.10.2026.

---

## 1. Ficha

| Campo | Valor |
|---|---|
| **Ordem comercial** | **5º de 12.** Razão de 29.08.2026: "argumento mais mensurável de todos: a taxa do aplicativo". Conferida em 07.10.2026: volume 5, facilidade 3, ticket 2, atrito 5 — 2º com os pesos escritos (3,80), 4º com os pesos "agora" (3,75) |
| **Plano de referência** | **Profissional** [P]: contra a taxa do aplicativo, o pedido próprio; comida vende por foto; a margem não comporta o Completo |
| **Módulos** | **Presença**; **Agenda só se houver reserva de mesa** |
| **Norma** | Nenhum conselho. CDC, arts. 30, 31, 35 e 37 [V]; Decreto 7.962/2013, art. 2º [V]; Lei estadual do RJ 6.590/2013 (informação nutricional no cardápio) [FU]; Anvisa: RDC 216/2004 (boas práticas) e rotulagem de alérgenos em embalados (RDC 26/2015, consolidada na RDC 727/2022) [FU] |
| **Preço no site** | **Permitido**, e vincula (CDC, art. 30) [V] |
| **Volume em Niterói** | CNAE 56.11-2 (restaurantes e similares): 1.649 unidades em 2022, 1.793 em 2023, **1.798 em 2024**; 11.564 pessoas ocupadas — o maior emprego dos doze; em unidades, só a classe que soma medicina e odontologia passa à frente (IBGE/CEMPRE, sem MEI) [V]. 21 aberturas no 3º trimestre de 2024, 15º lugar (Boletim do ISS de Niterói, nº 15) [V] |
| **A taxa do aplicativo** | iFood: 12% (plano Básico) a 23% (plano Entrega), mais 3,2% de pagamento on-line (DGABC, maio de 2025; Saipos) [FU] |
| **Público** | Quem decide é o dono, muitas vezes a família. Quem visita: o vizinho que almoça perto, o escritório que pede, quem procura o prato do dia |
| **Site de exemplo** | **Cozinha do Ingá** [ex]: só a versão estática de setembro (vermelho sobre branco quente, Bodoni Moda; montador de pedido, planejador da semana, alérgenos por prato) |

---

## 2. O cliente e a dor

**Quem decide e quanto paga.** O dono. Profissional: R$ 1.500 de criação e R$ 250 por mês (ata v3.0, IV.2). A conta que vende: um pedido de R$ 100 pelo aplicativo deixa de R$ 15,20 a R$ 26,20 em taxa (12% ou 23%, mais 3,2%) [FU]; o site cobra a mensalidade com poucos pedidos por mês desviados do aplicativo. **A conta é do vendedor, com os números do cliente**, nunca promessa no site.

**O que o visitante procura:**
1. **O prato do dia**, hoje, e o preço.
2. O cardápio fixo, com o preço e a porção.
3. Se entrega no bairro, o frete, o tempo; se dá para buscar.
4. O horário, e se está aberto agora.
5. Alérgenos e restrições.

**A dor registrada:** a taxa do aplicativo, "o argumento mais mensurável de todos" (29.08.2026).

**A tarefa do site no Profissional — ser escolhido.** Fazer o prato parecer o que é (foto e vídeo reais), responder o cardápio e o frete antes do telefonema e receber o pedido organizado, com o total, pelo WhatsApp.

---

## 3. Normas

| Tema | Regra | Fonte | Evidência |
|---|---|---|---|
| **Preço publicado** | Vincula; o prato e o preço do site são oferta | CDC, arts. 30 e 35 | [V] |
| **Informação** | Clara e em português: preço, quantidade (a porção), composição | CDC, art. 31 | [V] |
| **Publicidade enganosa** | Foto que não corresponde ao prato servido engana "por qualquer outro modo"; imagem gerada por IA de prato é vedada pelo Atlas também por isso | CDC, art. 37, § 1º | [V] |
| **Site que oferta com preço** | Em destaque: nome empresarial e CNPJ, endereço, **frete discriminado**, condições (pagamento, tempo de entrega), restrições | Decreto 7.962/2013, art. 2º | [V] texto; alcance sobre o pedido fechado no WhatsApp [NV] |
| **Informação nutricional no cardápio (RJ)** | Bares e restaurantes divulgam, nas tabelas nutricionais do cardápio, calorias, **presença de glúten**, carboidratos (com a lactose), gorduras, fibras, sódio e outros; aviso de "alta concentração de sódio" a partir de 400 mg por 100 g | Lei estadual 6.590/2013, alterada pela Lei 7.394/2016 (transcrição da Legisweb) | [FU]. Se o cardápio do site é "cardápio" para a lei, e o que vale na prática: **pergunta ao advogado** [NV] |
| **Glúten no cardápio (cidade do Rio)** | Aviso de glúten ao lado de cada prato | Lei municipal do Rio de Janeiro 6.159/2017 | [FU]. **Não vale em Niterói**; lei de Niterói não pesquisada [NV] |
| **Alérgenos** | A rotulagem obrigatória de alérgenos é de **alimento embalado** (RDC 26/2015, consolidada na RDC 727/2022) | Anvisa | [FU]. No prato servido, o site declara alérgenos **por decisão da casa** |
| **Higiene** | Boas práticas para serviços de alimentação | RDC 216/2004 | [FU]. Não pede nada do site |
| **Normas inexistentes** | "RDC 724/2026" não existe; a RDC 724 é de 2022 e trata de padrões microbiológicos | LEIA-ME de setembro | [FU] |
| **Imagem de pessoa** | Equipe e cliente no salão só com autorização escrita | Código Civil, art. 20 | [V] |
| **Vídeo** | O que se move sozinho por mais de 5 s tem pausa | WCAG 2.2, critério 2.2.2 | [V] (`../16-acessibilidade.md`) |
| **Dado pessoal** | O montador não grava nada; o formulário (encomenda, evento) coleta o mínimo, com aviso | `../14-funcionalidades/02-formulario.md` | DECIDIDO |

---

## 4. Estrutura de páginas

### 4.1 · No Profissional [P] (até seis páginas)

| Página | Objetivo | Seções, na ordem | Obrigatório |
|---|---|---|---|
| **Início** | Dar fome e chamar | Capa com vídeo curto ou foto (o prato, a panela), o prato do dia **de hoje**, a ação na primeira tela do celular, o estado ao vivo; o cardápio em resumo; o pedido; o horário | A primeira ação perto do topo (no demo de setembro estava a 620 px; nas referências, de 16 a 46 px) |
| **Cardápio** | O que há, quanto custa, que porção | Por grupo (pratos, guarnições, sobremesas, bebidas); prato, descrição curta, porção, preço com pontilhado; alérgenos por prato | Preço e porção; alérgenos declarados |
| **Pedido** (a funcionalidade) | Receber o pedido com o total | O montador (seção 5.1); o frete por bairro; retirada no balcão; formas de pagamento; o tempo de entrega | Frete discriminado |
| **A cozinha** | Provar | A galeria (pratos de cima e a 45°, a cozinha, o salão, a feira); a história; quem cozinha (com autorização) | — |
| **Encomendas e eventos** | O pedido grande, organizado | O formulário (data, número de pessoas, contato); marmitas da semana; o prazo de resposta | Aviso de privacidade |
| **Onde** | Levar até a mesa | Endereço, mapa do bairro em vetor, horário dia a dia, reserva (se houver Agenda), acessibilidade | Nome empresarial e CNPJ no rodapé |

### 4.2 · Se o cliente contratar outro plano

| Plano | O que muda |
|---|---|
| **Essencial** [E] | Três páginas: Início (o prato do dia, o horário), Cardápio, Onde. O pedido sai pelo WhatsApp com mensagem genérica; sem montador, sem galeria, sem vídeo na capa (foto) |
| **Completo** [C] | As seis, mais: a segunda funcionalidade (o prato do dia por dia da semana, com o planejador e o total da semana); uma página por grupo do cardápio e uma por bairro de entrega para a busca; a peça-assinatura (seção 6.7); a sessão de fotos ampliada, com vídeo |

**No briefing, bloqueante neste nicho:** em todo plano, o cardápio por grupo (pratos, guarnições, sobremesas, bebidas), com a descrição curta, a porção, o preço e os alérgenos que a casa declara de cada prato, e se a cozinha manipula trigo; o prato do dia de cada dia da semana, com o preço; e a entrega, se houver (os bairros, o frete de cada um e o tempo), a retirada no balcão e as formas de pagamento, como pede o Decreto 7.962/2013, art. 2º. No Profissional e no Completo [P][C], o que a casa aceita em encomenda e evento, com as marmitas da semana, se houver (a página de encomendas). Só no Completo [C], nenhum a mais: o prato do dia por dia da semana usa a lista acima. Sem isso, o cardápio, o prato do dia e o pedido não se escrevem.

---

## 5. Funcionalidades

### 5.1 · Funcionalidade 1 [P]: o montador de pedido com o total

| Item | Especificação |
|---|---|
| **Objetivo de negócio** | O pedido que iria para o aplicativo chega pelo WhatsApp, completo, com o total |
| **Entradas** | Pratos e quantidades; entrega (bairro) ou retirada |
| **Regras** | Preços do cardápio publicado (a mesma fonte de dados); o frete por bairro somado e discriminado; o total antes do envio |
| **Saída** | A mensagem com itens, quantidades, frete e total → "Enviar pedido pelo WhatsApp"; "Copiar o pedido" |
| **Estados** | Sem item: "Nenhum item escolhido" e o envio desabilitado; o "copiar" só confirma se copiou |
| **Sem script** | Os pratos e os preços publicados, e o WhatsApp com a instrução de pedir por mensagem |
| **Sem conta** | "Sem cadastro e sem conta a criar"; nada é registrado na página |
| **Quem mantém os dados** | O dono informa preços e frete; a mudança entra pela manutenção mensal |
| **Especificação** | `../14-funcionalidades/07-funcionalidades-do-oficio.md` |

### 5.2 · Funcionalidade 2 [C]: o prato do dia por dia da semana

O prato de cada dia, com o preço, **renderizado no servidor** pelo dia da semana no fuso de São Paulo (nunca pelo relógio do aparelho); o dia corrente em destaque; no planejador do demo de setembro, os dias marcados somam o total da semana e a reserva sai por mensagem. Ressalva: "o prato do dia acompanha a feira e pode mudar". Sem script: os sete dias na íntegra.

### 5.3 · Módulos

- **Presença:** o perfil no Google com fotos dos pratos, cardápio e horário iguais aos do site; pedir avaliação é permitido neste nicho.
- **Agenda:** só se houver reserva de mesa; senão, o pedido de reserva por mensagem basta.

---

## 6. Direção de arte (ponto de partida · RATIFICADO)

### 6.1 · Materiais e vocabulário

Azulejo, ágata e louça esmaltada, o quadro-negro do prato do dia, a panela, o balcão. O vocabulário: prato do dia, porção, marmita, guarnição, feira, panela, retirada.

### 6.2 · Fotografia e vídeo

- **Pratos** de cima e a 45°, com luz do dia; a panela; a cozinha em atividade; o salão; a feira.
- **Vídeo de capa:** até 15 s, sem som, na horizontal; imagem estática de reserva; botão de pausa; com movimento reduzido, a imagem parada (cinco de seis referências tinham vídeo na capa).
- **Nunca** foto de banco nem gerada: o prato do site é o prato servido (CDC, art. 37).

### 6.3 · Tipografia

- **Postura:** **exibição**. Em setembro, o `h1` do demo tinha 84 px contra 432 px do Craving Burgers: "elevar o teto".
- **Famílias candidatas** (OFL 1.1 [V]; `README.md`, seção 2):

| Papel | Família | Por quê |
|---|---|---|
| Exibição | **Libre Caslon Display** | O cardápio impresso: serifa clássica para o nome da casa e os grupos |
| Texto | **Libre Caslon Text** | A mesma família, para pratos, porções e preços com pontilhado |
| Alternativa, exibição | **Besley** | Clarendon: a letra dos letreiros e cardápios antigos de restaurante |
| Alternativa, texto | **Work Sans** | Grotesca de texto ao lado da Clarendon |

- **Algarismos tabulares** nos preços; o pontilhado entre prato e preço é CSS, não caractere repetido.

### 6.4 · Cor

- **Partida:** as cores do próprio lugar, tiradas das fotos (o azulejo, a louça, a parede).
- **Cuidado:** o restaurante "quente" cai fácil no agrupamento "creme, serifa de alto contraste e terracota" (`../04-direcao-de-arte.md`, seção 5); o demo de setembro (vermelho e Bodoni sobre branco quente) estava perto dele.

### 6.5 · Forma

Cantos arredondados (preferência do usuário): a borda da louça esmaltada, a pílula no botão.

### 6.6 · O gesto

- **Do ofício:** o **prato do dia** que muda com o dia da semana, no servidor.
- **Do Spell UI no Profissional:** o **copiar** do pedido e a **espera** visível; um gesto por marca, no ponto de decisão (o total do pedido).
- **Movimento do Profissional:** o do Essencial, mais a resposta à ação, a galeria de deslizar, a navegação viva (o estado "aberto agora") e o vidro no cabeçalho.

### 6.7 · A peça-assinatura (só no Completo)

**O material é de todo plano** (desde 09.10.2026): o azulejo da casa redesenhado em vetor, a louça, o quadro-negro são a matéria da identidade e entram também no Essencial e no Profissional. O site de exemplo do Profissional de 09.10.2026 ficou só com o quadro-negro, porque o azulejo era "só do Completo", e perdeu a matéria mais característica da casa. **A peça-assinatura do Completo** é o objeto que se usa: o prato do dia no quadro-negro que gira em 3D com o dia da semana, ou o azulejo que se monta com a rolagem. Passa no teste do desconhecido.

### 6.8 · O que não fazer

| Não | Por quê |
|---|---|
| Vídeo pesado ou com som; vídeo sem pausa | Le Saint Georges pesava 108,3 MB e Ballena Cabo, 60,1 MB; WCAG 2.2.2 |
| Primeira ação longe do topo | Le Saint Georges: 7.365 px; o demo de setembro: 620 px |
| Rolagem com inércia | 3 de 6 referências, todas de hospitalidade de alto padrão |
| Interface que imita o aplicativo de entrega | O site é a casa, não um catálogo de plataforma |
| Foto de banco ou gerada | Engana sobre o prato (CDC, art. 37) |
| "O melhor da cidade" | Não se prova |

---

## 7. Texto

**Registro.** Impessoal, concreto, com o nome dos pratos.

**O que dizer:** o prato do dia; a porção; o preço; o frete por bairro; o tempo de entrega; a retirada; os alérgenos declarados; o horário; o que a casa não faz (não congela o prato do dia, por exemplo, se for verdade).

**O que evitar:** "o melhor", "o mais saboroso"; "caseiro" ou "artesanal" sem que seja; "sem glúten" quando a cozinha manipula trigo (o risco ao celíaco é a contaminação cruzada; diga "a cozinha manipula trigo"); "entrega grátis" sem raio e pedido mínimo.

**Exemplos no registro certo** (demo de setembro):
- "Feito na panela, no mesmo dia." (título)
- "O total aparece antes de enviar."
- "O prato do dia acompanha a feira e pode mudar; a reserva é confirmada por resposta."
- "Sem cadastro e sem conta a criar."

---

## 8. Referências para estudar

| Referência | Endereço | Sob que norma opera | O que aprender | O que não copiar |
|---|---|---|---|---|
| Son Daven (SOTM, junho de 2026) | https://www.awwwards.com/sites/son-daven | Estrangeira | A cultura local como identidade inteira | Webflow, GSAP e WebGL de alto padrão |
| Burrito Madre (menção honrosa, 09.07.2026) | https://www.awwwards.com/sites/burrito-madre | Estrangeira | O pêssego e o vermelho em campo, com o texto em marrom e não em preto (`../19-o-padrao-atlas.md`, seção 5.1); ilustração própria, texto forte, página 404, programa de fidelidade — rede de comida rápida em WordPress | — |
| Ballena Fine Dining (menção honrosa, 17.06.2026) | https://www.awwwards.com/sites/ballena-fine-dining | Estrangeira | A comida como expressão cultural | O peso: se for o mesmo Ballena Cabo medido em setembro, 60,1 MB |
| Studenterkilden (menção honrosa, 11.08.2026) | https://www.awwwards.com/sites/studenterkilden | Estrangeira | Seções claras e cinza-escuras que se invertem; o grão de papel no rodapé; o título de até 100 px com entrelinha 0,9; os ingredientes da estação como abertura (`../19-o-padrao-atlas.md`, seção 4.1) | — |
| Crav Burgers (SOTD, 13.06.2026) | https://www.awwwards.com/sites/crav-burgers | Estrangeira | Um conceito de pedido, com transições e 404 | O carregador na entrada |
| Craving Burgers (setembro) | Endereço não registrado na análise | Estrangeira | O `h1` de 432 px e a carga mais rápida da rodada | — |

---

## 9. O que a pesquisa de setembro mediu

Análise de setembro de 2026 (`nichos/analises/atlas--analise-restaurante.md`, no repositório do Atlas):

| Site | Pedidos | Peso | Telas | Imagens | Vídeo | 1ª ação | `h1` |
|---|---|---|---|---|---|---|---|
| Le Saint Georges | 89 | 108,3 MB | 8,6 | 40 | sim | 7.365 px | 36 px |
| Ballena Cabo | 109 | 60,1 MB | 8,0 | 15 | 4 | 16 px | 68 px |
| Palazzo Sogni | 21 | 6,7 MB | 17,1 | 75 | sim | 0 px | — |
| Craving Burgers | 63 | 5,5 MB | 11,6 | 42 | não | 20 px | 432 px |
| Qissa | 40 | 5,0 MB | 13,1 | 56 | sim | 46 px | 122 px |
| KFC · fidelidade | 164 | 4,7 MB | — | 1 | não | — | — |
| **Demo do Atlas** | **4** | **0,056 MB** | 10,7 | **0** | não | 620 px | 84 px |

- **Fotografia:** 0 contra 15 a 75 → o briefing exige material visual do cliente.
- **Vídeo na capa:** cinco de seis → vídeo curto com imagem estática de reserva.
- **Peso:** de 83 a 1.924 vezes mais leve → instituir **teto**, não piso (proposta de setembro: 1,5 MB).
- **Ambição tipográfica:** 84 px contra 432 px → elevar.
- **Primeira ação:** 620 px contra 16 a 46 px → subir.

---

## 10. Riscos e pendências

- **Lei estadual 6.590/2013** [FU]: se valer para o cardápio do site, cada prato precisa de tabela nutricional — custo de produção que muda o orçamento. **Advogado antes do primeiro cliente.**
- **Lei de Niterói** sobre glúten ou alérgenos não pesquisada [NV].
- **A conta do aplicativo** usa taxas de 2025 [FU]: conferir o plano do cliente no briefing.
- **Vídeo:** sem orçamento de peso, a capa estoura o teto; medir no aparelho modesto (`../15-desempenho.md`).
- **Margem:** o Completo raramente cabe; o Profissional é o teto natural.

---

## 11. Lista de conferência do nicho

- [ ] O prato do dia é o de hoje, calculado no servidor no fuso de São Paulo.
- [ ] Cada prato tem porção, preço e alérgenos declarados.
- [ ] O montador soma o frete por bairro e mostra o total antes do envio; o envio fica desabilitado sem item.
- [ ] Sem script, o cardápio e os preços aparecem, com o WhatsApp.
- [ ] O vídeo tem até 15 s, sem som, com pausa, reserva estática e parada com movimento reduzido.
- [ ] A primeira ação está na primeira tela do celular.
- [ ] Nome empresarial, CNPJ e endereço no rodapé (Decreto 7.962/2013).
- [ ] Nenhuma foto de banco ou gerada; as fotos são dos pratos servidos.
- [ ] Nenhum "sem glúten" com contaminação cruzada; nenhum superlativo.
- [ ] A decisão do advogado sobre a Lei 6.590/2013 está registrada no `decisoes.md` do cliente.

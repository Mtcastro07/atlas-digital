# Advocacia · Essencial

> **Para que serve.** Tudo o que o site de um advogado ou de uma sociedade de advogados precisa, do briefing à entrega: o provimento da OAB (o nicho mais restritivo dos doze), o nome da sociedade, as três páginas, a direção de arte de partida — em que a tipografia é a única alavanca —, o texto e a conferência.
>
> **Estado.** Ordem comercial (12º) e plano de referência (Essencial): RATIFICADO (decidido em 07.10.2026; ratificado em 08.10.2026). **Venda travada até dois clientes pagantes** (29.08 e 07.10.2026). Norma: o Provimento 205/2021 conferido no texto publicado pela OAB [V] e o Estatuto da Advocacia no texto oficial [V]; o Código de Ética e Disciplina não foi lido [NV]; a foto do escritório diverge [DIV]. Direção de arte: RATIFICADO.
>
> **Leia com.** `README.md` (o quadro comum); `../03-planos.md`, seção 3; `../05-tipografia.md`; `../17-conformidade-e-normas.md`.
>
> **Implementação de referência.** Nenhuma em Next.js. A versão estática de setembro ("Silva Advogados") existe só em pacote, no repositório do Atlas (`nichos/atlas--demo-advocacia--2026-09-05.zip`; ler em memória, nunca extrair).
>
> **Atualizado em:** 08.10.2026.

---

## 1. Ficha

| Campo | Valor |
|---|---|
| **Ordem comercial** | **12º de 12.** Razão de 29.08.2026: "honorários vedados; entra após dois clientes pagantes". Conferida em 07.10.2026: volume 5, facilidade 1, ticket 4, atrito 1 — 10º com os pesos escritos (3,00), 12º com os pesos "agora" (2,05) |
| **Plano de referência** | **Essencial** [E]: o Provimento 205/2021 coincide com os limites do plano — sem formulário, sem galeria (a estrutura física não se mostra) e sem honorário |
| **Módulos** | **Nenhum** |
| **Norma** | Provimento 205/2021 do Conselho Federal da OAB, arts. 1º a 8º e Anexo Único [V]; Estatuto da Advocacia (Lei 8.906/1994), art. 16 [V]; Código de Ética e Disciplina da OAB, arts. 39 a 47 [NV] |
| **Preço no site** | **Vedado**: nenhuma "referência, direta ou indireta, a valores de honorários, forma de pagamento, gratuidade ou descontos" (Provimento 205/2021, art. 3º, I) [V] |
| **Volume em Niterói** | CNAE 69.11-7 (atividades jurídicas): 783 unidades em 2022, 897 em 2023, **993 em 2024**; 1.573 ocupados (IBGE/CEMPRE, sem MEI) [V]. "Serviços advocatícios": **43 aberturas** no 3º trimestre de 2024, 5º lugar (Boletim do ISS de Niterói, nº 15) [V]. "Mais de 12 mil advogados inscritos" na OAB Niterói (Folha do Leste, 30.08.2024) [FU] |
| **Público** | Quem decide é o advogado titular ou os sócios. Quem visita: alguém com um problema jurídico, às vezes com prazo correndo, que quer saber se o escritório atende a área e como é a consulta |
| **Site de exemplo** | **Silva Advogados** [ex], Centro: só a versão estática de setembro (cobre sobre quase-preto, EB Garamond; marcar consulta e etapas por área). O nome foge da convenção do bairro porque o Estatuto exige o nome de um advogado (`README.md`, seção 3.8) |

---

## 2. O cliente e a dor

**Quem decide e quanto paga.** O titular. Essencial: R$ 900 de criação e R$ 190 por mês (ata v3.0, IV.2); nenhum módulo.

**O que o visitante procura:**
1. Se o escritório atende a área do problema dele.
2. Como é a consulta, o que levar, e o que ele recebe ao fim.
3. O que acontece depois, e em que ordem.
4. Como falar com o escritório — e como dizer que há prazo correndo.
5. Quem são os advogados, com a inscrição na OAB.

**A dor do ramo:** o advogado não pode anunciar preço, resultado, depoimento, caso, estrutura física nem se comparar. Os sites que restam são iguais. **A tipografia é o caminho de distinção que sobra** (análise de setembro: o Zachmann, com zero imagens e `h1` de 150 px, é o modelo).

**A tarefa do site no Essencial — ser encontrado e chamado, com sobriedade.** Quem é, que áreas, como é a consulta, como chamar.

---

## 3. Normas

Todas as linhas do Provimento 205/2021 vêm do texto publicado pela OAB [V].

| Tema | Regra | Fonte |
|---|---|---|
| **Caráter** | "Meramente informativo", com "discrição e sobriedade", sem captação de clientela nem mercantilização | Art. 3º, caput |
| **Honorário** | Vedada a referência a valores de honorários, forma de pagamento, gratuidade ou descontos | Art. 3º, I |
| **Informação enganosa** | Vedada | Art. 3º, II |
| **Especialidade** | Só com título certificado ou notória especialização (Estatuto, art. 3º-A, parágrafo único) | Art. 3º, III |
| **Persuasão e comparação** | Vedadas "orações ou expressões persuasivas, de autoengrandecimento ou de comparação" | Art. 3º, IV |
| **Sobriedade** | Sem ostentação; sem "incitar diretamente ao litígio judicial, administrativo ou à contratação de serviços"; sem promoção pessoal | Art. 3º, § 1º |
| **Resultados e casos** | Vedada a menção a decisões e resultados; vedados casos concretos para oferecer atuação; vedada a promessa de resultado | Art. 4º, § 2º; art. 6º e parágrafo único |
| **Contato** | Site, redes, aplicativos de mensagem e logotipo são dados de contato permitidos, com sobriedade | Art. 4º, § 3º |
| **Ranking e prêmio pago** | Vedados | Art. 5º, § 1º; Anexo |
| **Imagem** | Permitidos o logotipo e as imagens, "inclusive fotos dos(as) advogados(as) e do escritório"; vedados os símbolos oficiais da OAB | Art. 5º, § 2º |
| **Estrutura física** | Na publicidade **ativa**, vedada "qualquer informação relativa às dimensões, qualidades ou estrutura física do escritório" | Art. 6º |
| **Ostentação** | Vedada em qualquer publicidade (veículos, viagens, bens) | Art. 6º, parágrafo único |
| **Outras atividades** | Vedado vincular a advocacia a outra atividade, salvo o magistério; coworking não se anuncia junto | Art. 8º |
| **Robô de resposta** | Chatbot permitido para facilitar a comunicação e até coletar dados; vedado aplicativo que responde automaticamente consultas jurídicas de não clientes | Anexo Único |
| **Mala direta** | Vedada; comunicação só a clientes e a quem pediu | Anexo Único |
| **Nome da sociedade** | Vedada a denominação de fantasia; a razão social tem o nome de pelo menos um advogado responsável | Estatuto da Advocacia, art. 16, caput e § 1º [V] |

**A foto do escritório [DIV].** O art. 5º, § 2º, permite foto do escritório; o art. 6º veda informação sobre a estrutura física **na publicidade ativa** — a que atinge quem não procurou. O site é procurado (publicidade passiva, art. 2º, VII), mas a leitura é do advogado. **Até o parecer: nenhuma foto do escritório** (`../02-briefing.md`, bloco 7). **Retrato dos advogados é permitido** (art. 5º, § 2º), com autorização.

**Formulário: zero**, decisão do Atlas (o Essencial não tem formulário; e o caso do cliente não passa por servidor). O Anexo permitiria coletar dados por robô.

**Para o advogado:** a foto do escritório no site; o Código de Ética e Disciplina (arts. 39 a 47), em especial o art. 40 (meios vedados); a especialidade sem título.

---

## 4. Estrutura de páginas

### 4.1 · No Essencial [E] (até três páginas)

| Página | Objetivo | Seções, na ordem | Obrigatório |
|---|---|---|---|
| **Início** | Ser entendido e chamado, com sobriedade | Capa (a razão social com o nome do advogado, a inscrição na OAB, a frase do método, a ação); as áreas de atuação como índice; como é a consulta; o que não se faz aqui, por norma; o contato | Nome e OAB também no cabeçalho do celular |
| **Áreas e etapas** | Responder "atende o meu caso, e como anda" | Cada área: o que o escritório faz, os documentos a levar, as etapas de um caso (reunião de documentos, tentativa extrajudicial, distribuição, instrução, sentença), os intervalos que se observam no foro — sem promessa de prazo | Nenhuma promessa; nenhum caso |
| **Contato** | Levar até a conversa | Endereço (sem foto da fachada), horário, telefone, WhatsApp, e-mail, prazo de resposta; "havendo prazo em curso, convém dizê-lo na primeira mensagem" | Prazo de resposta |

### 4.2 · Se o cliente contratar outro plano

| Plano | O que muda |
|---|---|
| **Profissional** [P] | Até seis páginas; a funcionalidade do ofício: **as áreas como índice de código, com notas laterais** que abrem no lugar (catálogo de `../14-funcionalidades/README.md`); retratos dos advogados no lugar da galeria; **sem formulário** (a mensagem sai do aparelho, registrado no `decisoes.md` do cliente) |
| **Completo** [C] | A segunda funcionalidade (a consulta por área, situação e documentos, do demo de setembro); uma página por área; **conteúdo jurídico informativo** — o marketing de conteúdo que o provimento permite (art. 4º), sem resultado, cliente, valor nem gratuidade; a peça-assinatura tipográfica |

**No briefing, bloqueante neste nicho:** em todo plano, o nome e a inscrição na OAB de cada advogado; as áreas de atuação e, de cada uma, o que o escritório faz, os documentos a levar e as etapas de um caso, com os intervalos que se observam no foro (descrição, nunca promessa de prazo); e como é a consulta e o que se entrega ao fim (o parecer escrito, se for a prática). No Profissional e no Completo [P][C], nenhum a mais: o índice de código usa as áreas, os documentos e as etapas. Só no Completo [C], a prioridade da agenda por situação, confirmada pelo escritório (quem foi citado vem antes). Sem isso, o início e a página de áreas e etapas não se escrevem.

---

## 5. Funcionalidades

### 5.1 · No Essencial: a mensagem pronta

O vínculo do WhatsApp com mensagem fixa ("Olá. Gostaria de marcar uma consulta."); a página diz o que informar: a área, a situação (ainda não há processo; fui citado ou notificado; já tenho processo; quero só orientação) e se há prazo correndo. Nada é gravado. É dado de contato permitido (art. 4º, § 3º).

### 5.2 · No Profissional [P]: as áreas como índice de código

Cada área como um artigo ("Art. 1º — Família e sucessões"), com notas laterais (§) que abrem no lugar: o que se faz, os documentos, as etapas. Sem script, todas as notas aparecem abertas. É informação, não captação: nenhum verbo de convite ao litígio.

### 5.3 · No Completo [C]: a consulta por área

Área, situação e período → a mensagem pronta, com a lista de documentos daquela área e a prioridade de agenda (quem foi citado vem antes). No demo de setembro: "Esta página não informa honorários, porque a norma da Ordem o veda. O valor consta do contrato, firmado antes de qualquer providência."

### 5.4 · Módulos

**Nenhum.** A Agenda gravaria a consulta jurídica de alguém num servidor; a Presença pede avaliação, que aqui seria depoimento.

---

## 6. Direção de arte (ponto de partida · RATIFICADO)

### 6.1 · Materiais e vocabulário

Papel, tinta, a diagramação de um código (Art., §, alínea), a nota de margem, o parecer encadernado. O vocabulário: consulta, parecer, área, etapa, documento, prazo, foro, contrato.

### 6.2 · Fotografia

- **Nenhuma foto do escritório** até o parecer [DIV]; nada de estante, de fachada, de sala de reunião.
- **Retrato dos advogados**, se quiserem, com autorização (art. 5º, § 2º).
- O Zachmann, modelo do nicho, tem **zero imagens**: a ausência é conformidade, não carência.

### 6.3 · Tipografia

- **Postura:** **exibição** — a tipografia é a única alavanca. O demo de setembro tinha `h1` de 78 px; o Zachmann, 150 px com 0,67 MB.
- **Famílias candidatas** (OFL 1.1 [V]; `README.md`, seção 2):

| Papel | Família | Por quê |
|---|---|---|
| Texto e títulos | **Spectral** | Serifa de leitura feita para tela, sóbria, com muitos pesos |
| Versaletes | **Spectral SC** | As versaletes de verdade da mesma família: "Art.", "§", os nomes das áreas — nunca maiúsculas encolhidas |

- **O demo de setembro usava** EB Garamond: não repetir.

### 6.4 · Cor

- **Partida:** tinta sobre papel — um preto-azulado de tinta sobre branco de papel; **um** acento discreto (o vermelho de uma rubrica, um verde de livro de registro).
- **Evitar** o cobre sobre quase-preto do demo de setembro (agrupamento "quase-preto com um acento").

### 6.5 · Forma

- **Cantos arredondados** (preferência do usuário), também nas notas laterais.
- **Cuidado com o "jornal":** o índice de código atrai o agrupamento "jornal de filetes finos e raio zero" (`../04-direcao-de-arte.md`, seção 5). A diagramação é de código, não de jornal: hierarquia por versalete, recuo e número, não por filete.

### 6.6 · O gesto

- **Do ofício:** o índice de código com as notas laterais que abrem no lugar.
- **Do Spell UI no Essencial:** o **marca-texto** — o grifo do advogado no texto —, uma vez, numa expressão fora do título (por exemplo, "parecer escrito" no parágrafo da consulta).

### 6.7 · O que não fazer

| Não | Por quê |
|---|---|
| Balança, martelo, colunas, estante de livros | Clichê do ramo (o martelo nem se usa no foro brasileiro) |
| Símbolo da OAB | Vedado (art. 5º, § 2º) |
| Foto do escritório | [DIV] até o parecer |
| "Casos de sucesso", "95% de êxito", depoimento | Arts. 4º, § 2º, e 6º |
| "Consulta gratuita", "parcelamos", "honorários acessíveis" | Art. 3º, I |
| "O melhor escritório", "referência em", "líder" | Art. 3º, IV |
| "Especialista em" sem título | Art. 3º, III |
| "Você tem direito a indenização! Fale agora" | Incita ao litígio (art. 3º, § 1º) |
| Robô que responde dúvida jurídica | Anexo Único |

---

## 7. Texto

**Registro.** O mais sóbrio dos doze: impessoal, informativo, sem verbo de convite.

**O que dizer:** as áreas; como é a consulta e o que se entrega ao fim (o parecer escrito, se for a prática); os documentos de cada área; as etapas e os intervalos observados no foro, como descrição; os dados de contato; a inscrição de cada advogado na OAB; por que o site não fala de honorários.

**O que é vedado dizer:** honorário, forma de pagamento, gratuidade, desconto; resultado, caso, decisão obtida; promessa de prazo; depoimento; comparação; "especialista" sem título; convite ao litígio; outra atividade junto da advocacia (salvo o magistério).

**Exemplos no registro certo** (demo de setembro):
- "A consulta termina em parecer escrito." (título)
- "Área, situação e o que levar."
- "Havendo prazo em curso, convém dizê-lo na primeira mensagem."
- "Estes intervalos descrevem o que se observa no foro. Não são promessa de prazo, que a norma da Ordem veda e que nenhum escritório controla."
- "Não parte daqui mensagem a quem não procurou, nem oferta em grupo, nem abordagem por rede social."

---

## 8. Referências para estudar

| Referência | Endereço | Sob que norma opera | O que aprender | O que não copiar |
|---|---|---|---|---|
| Zachmann, Alemanha (setembro) | Endereço não registrado na análise | Alemanha | **O modelo:** zero vedações, zero imagens, 0,67 MB, `h1` de 150 px | — |
| Kümmerlein (menção honrosa, 18.06.2025) | https://www.awwwards.com/sites/kummerlein-lawyers-notaries | Alemanha | "Um site de escritório sem os clichês de sempre": ícones próprios, um amarelo quente | — |
| IMK Avocats (menção honrosa, 05.03.2026) | https://www.awwwards.com/sites/imk-avocats | Estrangeira | Mínimo, guiado pela tipografia | — |
| Ario (menção honrosa, 25.05.2026) | https://www.awwwards.com/sites/ario-law-firm · https://ario.law/en/ (medido) | Estrangeira | Fonte própria (ario-sans), o nome em tipo enorme, retrato da equipe, sem inércia | O banner de cookies; o 3D; o `h1` persuasivo ("We enjoy the law, adore the drive…") |
| Quincy Réquin (o último SOTD de escritório, 2014) | https://www.awwwards.com/sites/quincy-requin-associates-lawyers | Estrangeira | Referência histórica: o júri premia pouco o ramo | — |
| Facchetti (setembro) | Endereço não registrado na análise | Página em português | — | 14 menções a honorário: em português, e fora da norma brasileira (`README.md`, seção 3.1) |

---

## 9. O que a pesquisa de setembro mediu

Análise de setembro de 2026 (`nichos/analises/atlas--analise-advocacia.md`, no repositório do Atlas). "Vedações presentes" conta cinco vedações do provimento, entre elas honorário (com a gratuidade: "free consultation", "no win no fee"), depoimento de cliente e comparação superlativa.

| Site | País | Pedidos | Peso | Telas | Imagens | `h1` | Vedações presentes |
|---|---|---|---|---|---|---|---|
| Briskman & Briskman | EUA | 104 | 1,59 MB | 21,9 | 111 | 22 px | 4 de 5 |
| Paul & Steve | EUA | 126 | 5,00 MB | 16,9 | 109 | 72 px | 4 de 5 |
| Facchetti | página em português | 81 | 2,02 MB | 10,9 | 42 | 30 px | 2 de 5 |
| Kuemmerlein | Alemanha | 85 | 1,87 MB | 15,2 | 157 | 74 px | 1 de 5 |
| Iryce | França | 32 | 1,52 MB | 5,0 | 8 | 113 px | 1 de 5 |
| **Zachmann** | **Alemanha** | 33 | **0,67 MB** | 6,1 | **0** | **150 px** | **0 de 5** |
| **Demo do Atlas** | Brasil | **4** | **~0,06 MB** | 11,4 | **0** | 78 px | **0 de 5** |

- **Escala tipográfica:** 78 px contra 150 px → **elevar**: é o caminho que sobra.
- **Fotografia:** 0, como o Zachmann → **manter**; a ausência é conformidade.
- **Vedações:** 0 de 5 → manter; empate com o Zachmann.
- **Formulário:** 0 contra 2 nos americanos → **manter em zero**.

---

## 10. Riscos e pendências

- **Venda travada** até dois clientes pagantes de outros nichos (29.08 e 07.10.2026): o site de exemplo pode existir, a venda espera.
- **Foto do escritório [DIV]:** fora até o parecer.
- **Código de Ética e Disciplina** não lido [NV]; o Comitê Regulador do Marketing Jurídico (art. 9º do provimento) pode atualizar os critérios — conferir antes do primeiro cliente.
- **Especialidade:** confirmar o título de cada advogado antes de escrever "especialista".
- **Nome:** a razão social com o nome de um advogado; marca abreviada só se for a da sociedade registrada.

---

## 11. Lista de conferência do nicho

- [ ] A razão social tem o nome de um advogado; nenhum nome de fantasia.
- [ ] Nome e inscrição na OAB de cada advogado, também no cabeçalho do celular.
- [ ] Nenhuma menção a honorário, pagamento, gratuidade ou desconto, em lugar nenhum.
- [ ] Nenhum resultado, caso, decisão, depoimento ou promessa de prazo.
- [ ] Nenhuma expressão persuasiva, de autoengrandecimento ou de comparação.
- [ ] "Especialista" só com título comprovado.
- [ ] Nenhuma foto do escritório; nenhum símbolo da OAB; nenhuma balança ou martelo.
- [ ] Nenhum formulário; nenhum módulo; nenhum robô que responda dúvida jurídica.
- [ ] Nenhuma outra atividade anunciada junto (salvo o magistério).
- [ ] Postura de exibição (razão ≥ 5) com versaletes reais.
- [ ] O marca-texto fora do título, uma vez.

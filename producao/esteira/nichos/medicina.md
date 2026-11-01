# Medicina · Completo

> **Para que serve.** Tudo o que o site de um consultório médico precisa, do briefing à entrega: a resolução de publicidade do CFM, os dados obrigatórios, a primeira consulta em três passos, o preparo, a direção de arte de partida (contida), o texto e a conferência.
>
> **Estado.** Ordem comercial (10º) e plano de referência (Completo): RATIFICADO (decidido em 07.10.2026; ratificado em 08.10.2026). Norma: a CFM 2.336/2023 conferida no texto do CFM [V]; o manual da Codame não foi lido [FU]. **O nicho não foi analisado em setembro** (a referência enviada era um consultório de psicologia). Direção de arte: RATIFICADO.
>
> **Leia com.** `README.md` (o quadro comum); `../03-planos.md`, seção 5 (movimento sereno, com a camada inteira); `../14-funcionalidades/07-funcionalidades-do-oficio.md` e `../14-funcionalidades/05-agenda.md`; `../17-conformidade-e-normas.md`.
>
> **Implementação de referência.** Nenhuma em Next.js. A versão estática de setembro ("Consultório do Vital Brazil") existe só em pacote, no repositório do Atlas (`nichos/atlas--demo-medicina--2026-09-05.zip`; ler em memória, nunca extrair).
>
> **Atualizado em:** 08.10.2026.

---

## 1. Ficha

| Campo | Valor |
|---|---|
| **Ordem comercial** | **10º de 12.** Razão de 29.08.2026: "ticket máximo, mas exige dados obrigatórios e é a de maior risco reputacional". Conferida em 07.10.2026: volume 5, facilidade 2, ticket 5, atrito 2 — 4º com os pesos escritos (3,65), 10º com os pesos "agora" (2,90) |
| **Plano de referência** | **Completo** [C]: maior renda per capita do estado; dados obrigatórios, tipos de consulta e convênios; o risco pede a revisão trimestral e o atendimento prioritário; movimento sereno |
| **Módulos** | **Agenda**; **Presença só com o perfil** |
| **Norma** | CFM 2.336/2023, publicada no DOU de 13.09.2023, em vigor 180 dias depois (11.03.2024), que revogou as CFM 1.974/2011, 2.126/2015 e 2.133/2015 [V]; LGPD, arts. 5º, II, e 11 [V] |
| **Preço no site** | **Consulta, sim** (art. 9º, VI); **procedimento, não** — informa-se que o valor "poderá ser acordado entre as partes previamente" (art. 9º, VII) [V] |
| **Volume em Niterói** | CNAE 86.30-5 (atividade ambulatorial de médicos e odontólogos): **3.039 unidades em 2024** (2.280 em 2022), 9.990 ocupados (IBGE/CEMPRE, sem MEI) [V]. "Atividade médica ambulatorial restrita a consultas": **60 aberturas** no 3º trimestre de 2024, 3º lugar; 33% das aberturas do topo da lista têm relação com saúde (Boletim do ISS de Niterói, nº 15) [V]. Niterói tem a maior renda domiciliar per capita do estado, R$ 3.577 (Censo 2022) [FU]. O volume formal é inflado pela pejotização |
| **Público** | Quem decide é o médico, ou a clínica com o diretor técnico. Quem visita: o paciente novo, muitas vezes mais velho, que confere especialidade, convênio, valor e preparo |
| **Site de exemplo** | **Consultório do Vital Brazil** [ex]: só a versão estática de setembro (azul-petróleo sobre branco, Newsreader; agendamento com duração e valor, preparo por tipo de consulta) |

---

## 2. O cliente e a dor

**Quem decide e quanto paga.** O médico ou os sócios da clínica. Completo: R$ 2.400 de criação e R$ 400 por mês; Agenda, +R$ 400 e +R$ 80 (ata v3.0, IV.2). A revisão trimestral e o atendimento prioritário do Completo existem para o risco deste nicho.

**O que o visitante procura:**
1. Quem é o médico: nome, CRM, especialidade com RQE.
2. Se atende o convênio dele, ou quanto custa a consulta particular.
3. Quanto tempo dura cada tipo de consulta.
4. O que levar.
5. Onde fica, como chegar, se há acessibilidade e estacionamento.

**A dor do ramo, como o demo de setembro a leu:** a consulta se gasta "reconstituindo informação que já existe"; e o paciente marca sem saber duração nem valor. O site responde com o preparo e com "duração e valor antes de escolher o horário".

**A tarefa do site no Completo — trabalhar pelo negócio.** A primeira consulta em três passos (o tipo com duração e valor, o convênio, o período), o preparo por tipo de consulta, uma página por tipo de consulta, e os dados obrigatórios sempre à vista.

---

## 3. Normas

Todas as linhas abaixo vêm do texto da CFM 2.336/2023 [V], salvo onde marcado.

| Tema | Regra | Artigo |
|---|---|---|
| **Dados obrigatórios** | Nome, número de registro no CRM onde exerce, **acompanhado da palavra MÉDICO**; especialidade ou área de atuação registrada, seguida do **RQE** | Art. 4º |
| **Na página principal** | Em sites e redes, os dados do art. 4º ficam na página principal | Art. 6º |
| **Estabelecimento** | Nome com o registro no CRM; nome do **diretor técnico-médico** com o CRM (e a especialidade com RQE, onde exigível) | Art. 5º |
| **Especialidades** | Até duas, com as áreas de atuação relacionadas; especialista é quem tem RQE | Art. 13, § 1º, "f", e § 2º |
| **Quem não é especialista** | Não pode anunciar que trata sistemas, órgãos ou doenças específicas | Art. 11, I |
| **Permitido** | Foto do ambiente de trabalho, da própria imagem e da equipe; marcação, horários e funcionamento; localização, estacionamento, convênios; **valor da consulta e formas de pagamento** | Art. 9º, I, IV, V e VI |
| **Procedimento particular** | Informar que o valor "poderá ser acordado entre as partes previamente" — não publicar o valor (nota da Codame, segundo o LEIA-ME de setembro [FU]) | Art. 9º, VII |
| **Desconto** | Permitido em campanha, sem venda casada nem prêmio; o Atlas não usa moldura promocional | Art. 9º, VIII; política do Atlas |
| **Promessa** | Vedado "garantir, prometer ou insinuar bons resultados do tratamento" | Art. 11, XII |
| **Ranking** | Vedado figurar em premiações e listas do tipo "melhor médico" | Art. 11, XIII |
| **Equipamento** | Vedado atribuir capacidade privilegiada | Art. 11, II |
| **Consórcio** | Vedado | Art. 11, X |
| **Sensacionalismo e autopromoção** | Vedados; inclui informação que cause medo e representação visual "sedutora" que induza garantia de resultado | Art. 11, XVI, e §§ 2º e 3º |
| **Antes e depois** | Permitido só em conjunto (indicações, evoluções satisfatórias e insatisfatórias, complicações), sem identificar o paciente e sem edição | Art. 14, II |
| **Depoimento** | Sóbrio, sem adjetivo de superioridade nem promessa | Art. 14, II, "g" |
| **Paciente no site** | **Política do Atlas: nenhum** — nem antes e depois, nem depoimento, nem foto | DECIDIDO (`../02-briefing.md`, bloco 7) |
| **Dado de saúde** | O tipo de consulta e o motivo são dado sensível; o site não os grava | LGPD, arts. 5º, II, e 11 [V] |
| **Telemedicina** | Se houver atendimento a distância, a resolução própria do CFM se aplica; não lida nesta pesquisa | [NV] |

**Para o advogado:** o manual da Codame (procedimento, campanha de desconto); a telemedicina; a lista de convênios em clínica com mais de um médico.

---

## 4. Estrutura de páginas

### 4.1 · No Completo [C] (sem limite de páginas)

| Página | Objetivo | Seções, na ordem | Obrigatório |
|---|---|---|---|
| **Início** | Confiança e ação, com os dados obrigatórios | Capa (nome, "médico" ou "médica", CRM/UF, especialidade e RQE — **na página principal**; a frase do consultório; a ação); a primeira consulta em três passos; os tipos de consulta com duração e valor; convênios; o que não se faz aqui (por exemplo, urgência) | Art. 4º e 6º, também no celular |
| **A consulta** | Os tipos, a duração e o valor | No demo de setembro: primeira consulta, 50 min; retorno em até 60 dias, 30 min; com avaliação de risco, 60 min; leitura de resultado, 20 min; acompanhamento trimestral, 40 min — cada um com o valor | Valor da consulta; procedimento sem valor |
| **Agendar** | A primeira consulta em três passos (seção 5.1) | Tipo, convênio ou particular, período → a mensagem, ou a Agenda | Prazo de resposta |
| **Preparo** | O que levar, por tipo de consulta (seção 5.2) | A lista que muda com o tipo e com o acompanhamento em curso | "Lista de preparo, não de exigência" |
| **O médico** | Quem atende | Formação na forma do art. 13 (diploma, residência, título); até duas especialidades com RQE; retrato autorizado | RQE |
| **Convênios e valores** | Responder antes do contato | Convênios aceitos; valor da consulta particular; formas de pagamento; a frase do art. 9º, VII, para procedimentos | — |
| **Onde** | Levar até a porta | Endereço, mapa do bairro em vetor, acessibilidade, estacionamento, horário | — |
| **Uma por tipo de consulta** [C] | A busca local | O tipo, a duração, o valor, o preparo, o pedido de horário já preenchido | — |

### 4.2 · Se o cliente contratar outro plano

| Plano | O que muda |
|---|---|
| **Profissional** [P] | Seis páginas: Início, A consulta (tipos e valores), Agendar (a funcionalidade: os três passos), O médico e o consultório (galeria), Convênios e preparo, Onde. O formulário pede nome, contato, convênio e período — nunca motivo clínico |
| **Essencial** [E] | Três páginas: Início (com os dados obrigatórios e os tipos de consulta), Valores e convênios, Onde. O pedido sai pelo WhatsApp com mensagem pronta |

**No briefing, bloqueante neste nicho:** em todo plano, os tipos de consulta, com a duração e o valor de cada um (procedimento sem valor: CFM 2.336/2023, art. 9º, VII); os convênios aceitos; e o acesso ao consultório (a acessibilidade e o estacionamento). No Profissional e no Completo [P][C], a formação do médico na forma do art. 13 (diploma, residência, título); e o que levar à consulta (a página de preparo). Só no Completo [C], o que levar a cada tipo de consulta e conforme o acompanhamento em curso (o preparo por tipo de consulta). Sem isso, o início, a página da consulta e a de convênios e valores não se escrevem.

---

## 5. Funcionalidades

### 5.1 · Funcionalidade 1 [P][C]: o agendamento com duração e valor (a primeira consulta em três passos)

| Item | Especificação |
|---|---|
| **Objetivo de negócio** | O paciente marca sabendo o que vai acontecer, quanto tempo leva e quanto custa |
| **Passo 1** | O tipo de consulta, com a duração e o valor à vista |
| **Passo 2** | Convênio (a lista aceita) ou particular |
| **Passo 3** | O período (manhã, início da tarde, fim da tarde) e se já é paciente |
| **Saída** | A mensagem pronta → "Pedir horário"; ou a Agenda |
| **Avisos** | "O consultório não faz atendimento de urgência; quadro agudo exige pronto-socorro." "Nada é registrado nesta página." |
| **Sem script** | Os tipos, as durações, os valores e os convênios publicados, e o WhatsApp |

*O contexto de nichos do Atlas (07.10) chama esta funcionalidade de "agendamento com duração e valor da consulta"; o catálogo (`../14-funcionalidades/README.md`, seção 2.4) e a especificação (`../14-funcionalidades/07-funcionalidades-do-oficio.md`, seção 9.1) usam o mesmo nome; "a primeira consulta em três passos" é a forma dela. Não confundir com a funcionalidade da nutrição no Profissional, de nome parecido.*

### 5.2 · Funcionalidade 2 [C]: o preparo por tipo de consulta

A lista do que levar muda com o tipo (primeira consulta, retorno, leitura de resultado) e com o acompanhamento em curso (nenhum; quadro crônico em tratamento; acompanhado por outro profissional). Sem script, quatro itens valem para toda consulta: documento com foto, exames dos últimos doze meses, caixas da medicação em uso e lista de alergias. "Lista de preparo, não de exigência: a consulta ocorre ainda que falte algum item." Nada é gravado: a escolha não sai do aparelho.

### 5.3 · Módulos

- **Agenda:** nome, telefone, tipo de consulta, convênio, horário; consentimento destacado; nada de sintoma ou motivo.
- **Presença só com o perfil:** nome, endereço, horário, fotos do consultório; não se pede avaliação.

---

## 6. Direção de arte (ponto de partida · RATIFICADO)

### 6.1 · Materiais e vocabulário

Papel, linho, a madeira da mesa, a luz do consultório. O vocabulário: consulta, retorno, preparo, exame, convênio, encaminhamento.

### 6.2 · Fotografia

O médico (autorizado), o consultório, a recepção, a fachada e o acesso. **Sem paciente** (política do Atlas). Nada de estetoscópio em close de banco.

### 6.3 · Tipografia

- **Postura:** **exibição serena** (razão ≥ 4 na capa: peso leve, entrelinha aberta, poucas palavras, muito ar; `../05-tipografia.md`, seção 6.3). Até 08.10.2026, à noite, contenção (≤ 2), que deixou o título do exemplo de odontologia em 35 px.
- **Famílias candidatas** (OFL 1.1 [V]; `README.md`, seção 2):

| Papel | Família | Por quê |
|---|---|---|
| Uma só | **Atkinson Hyperlegible Next** | Desenhada pelo Braille Institute para a baixa visão: o paciente mais velho lê melhor; o motivo é do público, não do gosto |
| Alternativa | **Source Sans 3** | Sem serifa humanista, de muitos pesos. Nome Reservado ("Source"): o recorte precisa de outro nome |

- **Corpo de texto** maior que o mínimo (`../05-tipografia.md`), pelo público.

### 6.4 · Cor

- **Partida:** neutros quentes (papel, linho), tinta escura, **um** acento discreto.
- **Evitar** o azul-hospital, o verde-cirúrgico e o vermelho de emergência.

### 6.5 · Forma

Cantos arredondados (preferência do usuário), sem nenhum elemento que pareça alerta.

### 6.6 · O gesto e o movimento

- **Movimento sereno, com a camada do plano inteira** (`../03-planos.md`, seção 5.6; desde 08.10.2026, à noite, no lugar do "contido mesmo no Completo"): as curvas lentas, nada de quique nem de brilho em promessa. O ambiente, a cena e o 3D do Completo entram com o objeto do ofício e sem sensacionalismo, que é o que a CFM 2.336/2023 veda no conteúdo.
- **Os efeitos da identidade** (`../09-movimento.md`, seção 12): a matéria do consultório (o branco quente, o aço escovado, o vidro fosco) e a luz difusa da janela, que responde à mão.
- **Do Spell UI:** **um** gesto, o mais quieto — por exemplo, o brilho do texto uma vez no passo em que o paciente está.

### 6.7 · A peça-assinatura (Completo)

O mapa do bairro desenhado a partir de dados abertos, com o acesso ao consultório (rampa, estacionamento, ponto de ônibus), ou uma peça tipográfica. Nunca o corpo nem o órgão em 3D, que dramatiza (CFM 2.336/2023). Desde 09.10.2026, o "sem 3D" saiu: no Completo, a peça pode ganhar o objeto em WebGL quando o objeto é do ofício e passa no teste do desconhecido (`../09-movimento.md`, seção 7), e o desenho em traço fica como reserva sem script.

### 6.8 · O que não fazer

| Não | Por quê |
|---|---|
| Cruz, estetoscópio, coração em ícone | Clichê |
| "Melhor médico", selo de prêmio, ranking | Art. 11, XIII |
| Antes e depois, depoimento | Política do Atlas |
| "Trata ansiedade, coluna e coração" sem RQE | Art. 11, I |
| Valor de procedimento | Art. 9º, VII |
| Rolagem com inércia; brilho em promessa; movimento que dramatiza sintoma ou cura | Vedada pela ata (inércia); sensacionalismo (CFM 2.336/2023) |

---

## 7. Texto

**Registro.** Sóbrio, impessoal e verídico — o tom que a própria resolução pede aos boletins médicos (art. 12, II).

**O que dizer:** os dados obrigatórios; os tipos de consulta, a duração e o valor; os convênios; o preparo; a política de urgência; a acessibilidade.

**O que é vedado ou arriscado dizer:** promessa ou insinuação de resultado; "o melhor"; "especialista" sem RQE; doença ou órgão tratado por quem não é especialista; valor de procedimento; qualquer frase que cause medo.

**Exemplos no registro certo** (demo de setembro):
- "Cinquenta minutos na primeira consulta." (título)
- "Duração e valor antes de escolher o horário."
- "O consultório não faz atendimento de urgência; quadro agudo exige pronto-socorro."
- "Serve para que a consulta não se gaste reconstituindo informação que já existe."

---

## 8. Referências para estudar

**O nicho não tem análise:** a referência enviada em setembro era um consultório de psicologia em Barcelona. Antes do primeiro cliente, escolher duas ou três clínicas brasileiras de consultório e medi-las pelo instrumento de `README.md`, seção 5.

| Referência | Endereço | Sob que norma opera | O que aprender | O que não copiar |
|---|---|---|---|---|
| Klearmind Clinics (menção honrosa, 30.08.2025; estúdio Pixeto) | Listagem: https://www.awwwards.com/inspiration_search/clinic/ | Estrangeira | Clínica premiada | — |
| Institute of Health (menção honrosa, 05.02.2026) | https://www.awwwards.com/sites/institute-of-health | Estrangeira; educação em saúde | Branco e quase-preto, sobriedade | WebGL, rolagem como motor |

---

## 9. O que a pesquisa de setembro mediu

O demo de medicina foi medido junto com o de psicologia (`nichos/analises/atlas--analise-psicologia.md`, no repositório do Atlas): 4 pedidos, 0,051 MB, 2,4 s, 10,8 telas, nenhuma imagem, `h1` de 58 px, `lang="pt-BR"`, nenhum formulário, **CRM e RQE em 5 ocorrências**, 11 preços publicados. Nenhuma referência de medicina foi medida.

---

## 10. Riscos e pendências

- **O nicho de maior risco reputacional:** o Completo traz a revisão trimestral e o atendimento prioritário por isso.
- **Conferir o CRM e o RQE** do cliente no cadastro público do CFM antes de publicar (o site afirma o que o conselho registra).
- **Manual da Codame** não lido [FU]; **telemedicina** não lida [NV].
- **Nenhuma análise** do nicho; nenhuma referência brasileira.
- **Convênios:** a lista muda; entra na manutenção mensal.

---

## 11. Lista de conferência do nicho

- [ ] Nome, "médico" ou "médica", CRM com a UF, especialidade e RQE na página principal e também no celular.
- [ ] Na clínica: o diretor técnico-médico com CRM.
- [ ] No máximo duas especialidades, cada uma com RQE.
- [ ] Valor da consulta publicado; valor de procedimento, não (a frase do art. 9º, VII).
- [ ] Nenhuma promessa, ranking, superlativo ou frase que cause medo.
- [ ] Nenhum paciente: nem foto, nem antes e depois, nem depoimento.
- [ ] O pedido e o preparo não gravam nada; a Agenda não pede sintoma.
- [ ] O aviso de urgência ao lado do pedido de horário.
- [ ] Movimento sereno, com a camada do plano inteira; os efeitos da identidade; o teste da vitrine.
- [ ] Corpo de texto legível para baixa visão; contraste medido.

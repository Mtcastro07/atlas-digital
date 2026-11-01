# Psicologia · Essencial

> **Para que serve.** Tudo o que o site de uma psicóloga ou psicólogo de consultório precisa, do briefing à entrega: o Código de Ética, o sigilo, as três páginas, o aviso de crise, a direção de arte de partida, o texto e a conferência. Vale para o atendimento presencial e a distância.
>
> **Estado.** Ordem comercial (9º) e plano de referência (Essencial): RATIFICADO (decidido em 07.10.2026; ratificado em 08.10.2026). Norma: o Código de Ética do Psicólogo (CFP 010/2005, art. 20) conferido no texto do CFP [V]; a consolidação de 2007 e a resolução do atendimento on-line lidas em fonte secundária [FU]; o preço publicado diverge [DIV]. Direção de arte: RATIFICADO.
>
> **Leia com.** `README.md` (o quadro comum); `../03-planos.md`, seção 3; `../14-funcionalidades/05-agenda.md`; `../17-conformidade-e-normas.md`.
>
> **Implementação de referência.** Nenhuma em Next.js. A versão estática de setembro ("Psicologia São Domingos") existe só em pacote, no repositório do Atlas (`nichos/atlas--demo-psicologia--2026-09-07.zip`; ler em memória, nunca extrair).
>
> **Atualizado em:** 08.10.2026.

---

## 1. Ficha

| Campo | Valor |
|---|---|
| **Ordem comercial** | **9º de 12.** Razão de 29.08.2026: "volume alto, mas preço vedado na página — argumento amputado" — corrigida em 07.10: o preço só é vedado **como propaganda**. Conferida em 07.10.2026: volume 4, facilidade 3, ticket 3, atrito 3 — 7º com os pesos escritos (3,35), 8º com os pesos "agora" (3,15) |
| **Plano de referência** | **Essencial** [E]: o CFP exige sobriedade e veda depoimento; o WhatsApp evita coletar dado sensível no site |
| **Módulos** | **Agenda com o mínimo de dados**; **Presença não**, pelo sigilo |
| **Norma** | CFP 010/2005, art. 20 [V]; CFP 003/2007, arts. 53 e 54 [FU]; CFP 09/2024 (atendimento mediado por tecnologia) [FU]; LGPD, arts. 5º, II, e 11 [V] |
| **Preço no site** | Só sem moldura promocional: "não utilizará o preço do serviço como forma de propaganda" (art. 20, "d") [V]; o valor sóbrio publicado é decisão de setembro, a confirmar [DIV] |
| **Volume em Niterói** | CNAE 86.50-0 (com nutrição, fisioterapia e outros): **1.428 unidades em 2024** (775 em 2022) [V]. "Psicologia e psicanálise": **41 aberturas** no 3º trimestre de 2024, 6º lugar entre as atividades (Boletim do ISS de Niterói, nº 15) [V] |
| **Público** | Quem decide é a profissional. Quem visita: alguém em sofrimento, muitas vezes pela primeira vez, que precisa entender como começa e quanto custa sem se expor |
| **Site de exemplo** | **Psicologia São Domingos** [ex]: só a versão estática de setembro (oliva sobre papel, Epilogue; primeira entrevista, "o que perguntar", aviso de crise) |

---

## 2. O cliente e a dor

**Quem decide e quanto paga.** A profissional. Essencial: R$ 900 de criação e R$ 190 por mês; Agenda, +R$ 400 e +R$ 80 (ata v3.0, IV.2).

**O que o visitante procura:**
1. Quem atende: nome completo, "psicóloga", CRP.
2. Como funciona a primeira sessão, e se ela obriga a continuar.
3. A abordagem, para quem (individual, casal, adolescente), presencial ou on-line.
4. A duração e o valor; a frequência; o sigilo; a falta.
5. O que fazer se for uma crise.

**A dor do ramo, como o demo de setembro a leu:** "O encaixe entre paciente e profissional pesa mais que a abordagem escolhida." A pessoa precisa de permissão para experimentar e para desistir: "As primeiras sessões servem para decidir."

**A tarefa do site no Essencial — ser encontrada e chamada, sem coletar nada.** Quem é, como começa, quanto custa, onde, e o vínculo que abre a conversa no aparelho da pessoa.

---

## 3. Normas

| Tema | Regra | Fonte | Evidência |
|---|---|---|---|
| **Identificação** | "Informará o seu nome completo, o CRP e seu número de registro" | CFP 010/2005, art. 20, "a" | [V] |
| **Forma da identificação** | Nome completo sem abreviação, a palavra "psicóloga" ou "psicólogo", a sigla CRP e o número | CFP 003/2007, art. 53 | [FU] |
| **Títulos** | Só os que possui | Art. 20, "b" | [V] |
| **Técnicas** | Só as reconhecidas ou regulamentadas pela profissão | Art. 20, "c" | [V] |
| **Preço** | "Não utilizará o preço do serviço como forma de propaganda" — nada de cupom, sorteio, pacote, "preço acessível", "valor social", "desconto", "gratuito" | Art. 20, "d" [V]; exemplos da CFP 003/2007, art. 54 [FU] | **[DIV]** sobre o valor sóbrio publicado (seção 10) |
| **Resultado** | "Não fará previsão taxativa de resultados" | Art. 20, "e" | [V] |
| **Autopromoção** | Vedada em detrimento de outros profissionais | Art. 20, "f" | [V] |
| **Sensacionalismo** | Vedado | Art. 20, "h" | [V] |
| **Diagnóstico ou orientação na página** | Vedados na publicidade | CFP 003/2007, art. 54 | [FU] |
| **Depoimento** | Vedado | Contexto de nichos do Atlas (07.10), CFP 003/2007 | [FU] |
| **Atendimento on-line** | A CFP 09/2024 (18.07.2024) substituiu a 11/2018 e a 04/2020; segundo fontes secundárias, o **cadastro no e-Psi deixou de ser exigido** e vale a inscrição ativa no CRP | CFP 09/2024, via base da ABMES e comentários | [FU]. O LEIA-ME de setembro ainda exigia o e-Psi: desatualizado |
| **Dado de saúde** | Saúde mental é dado sensível; procurar uma psicóloga já revela saúde. Tratar exige consentimento específico e destacado | LGPD, arts. 5º, II, e 11, I | [V] |
| **Formulário** | **Zero**, também no Profissional: "é decisão de conformidade, não de comodidade" (análise de setembro) | Política do Atlas | DECIDIDO |
| **Imagem** | A profissional, autorizada; o consultório vazio; **nunca** paciente | Código Civil, art. 20 [V]; política do Atlas | DECIDIDO |
| **Idioma** | `lang="pt-BR"` e o texto em português (a referência de setembro declarava `en` com texto em espanhol) | `README.md`, seção 3.6 | DECIDIDO |

**Para o advogado:** o valor sóbrio publicado (art. 20, "d"); o texto primário da CFP 003/2007, arts. 53 e 54; o texto da CFP 09/2024.

---

## 4. Estrutura de páginas

### 4.1 · No Essencial [E] (até três páginas)

| Página | Objetivo | Seções, na ordem | Obrigatório |
|---|---|---|---|
| **Início** | Ser entendida e chamada, com calma | Capa (nome completo, "psicóloga", CRP; a frase da primeira entrevista; a ação); como funciona a primeira entrevista; a abordagem, em linguagem comum; para quem e em que modalidade; o que não se faz aqui; o aviso de crise | Identificação completa também no cabeçalho do celular |
| **Valores e funcionamento** | Responder antes do contato | A duração e o valor, iguais para todos, sem destaque; a frequência; o sigilo; a falta e o cancelamento; o atendimento on-line; as perguntas para fazer na primeira entrevista | Valor sem moldura (art. 20, "d") |
| **Consultório** | Levar até a porta, ou até a chamada | Endereço, mapa do bairro em vetor, horário, como é a sala (privacidade, acessibilidade); o WhatsApp; o prazo de resposta; o aviso de crise | Prazo de resposta; aviso de crise |

**O aviso de crise** (do demo de setembro), junto de toda ação: "Em situação de crise, não use este canal. O Centro de Valorização da Vida atende pelo 188, por telefone e sem custo, ininterruptamente. A rede de emergência do município recebe sem agendamento." Ele **não** é enfeite: a ação de marcar consulta não serve a quem está em risco.

### 4.2 · Se a cliente contratar outro plano

| Plano | O que muda |
|---|---|
| **Profissional** [P] | Até seis páginas; a funcionalidade do ofício: **"como é a primeira sessão"**, com a escolha entre presencial e on-line (catálogo de `../14-funcionalidades/README.md`); a galeria do consultório vazio. **Sem formulário de servidor:** o "formulário" do plano vira mensagem composta no aparelho (como o talão do depósito de exemplo), registrado no `decisoes.md` do cliente |
| **Completo** [C] | As duas funcionalidades (a primeira sessão e "o que perguntar", que muda com a situação de quem chega); uma página por modalidade (individual, casal, adolescente, on-line); conteúdo institucional sobre como a terapia funciona — **nunca** orientação (CFP 003/2007, art. 54). Movimento contido |

**No briefing, bloqueante neste nicho:** em todo plano, o nome completo, sem abreviação, e a forma "psicóloga" ou "psicólogo" (CFP 003/2007, art. 53); como funciona a primeira entrevista; a abordagem, em linguagem comum; para quem (individual, casal, adolescente) e em que modalidade (presencial, on-line ou as duas); a duração e o valor da sessão, iguais para todos, e a frequência; e a regra de falta e de cancelamento. No Profissional e no Completo [P][C], o que muda na primeira sessão entre o presencial e o on-line (a sala ou a chamada). Só no Completo [C], nenhum a mais: as perguntas de "o que perguntar" se fazem à profissional, na entrevista. Sem isso, o início e a página de valores e funcionamento não se escrevem.

---

## 5. Funcionalidades

### 5.1 · No Essencial: a mensagem pronta

O vínculo do WhatsApp com mensagem fixa ("Olá. Gostaria de marcar uma primeira entrevista."), que sai do aparelho da pessoa; a página diz o que informar (modalidade, para quem, período). Nada é gravado. Especificação em `../14-funcionalidades/01-base-de-todo-site.md`.

### 5.2 · No Profissional [P]: "como é a primeira sessão"

| Item | Especificação |
|---|---|
| **Objetivo de negócio** | A pessoa entende o primeiro encontro e pede a entrevista sem ansiedade |
| **Entradas** | Presencial ou on-line; para quem (individual, casal, adolescente); período; já fez terapia (primeira vez, já fiz e parei, faço atualmente) |
| **Saída** | O que acontece naquela modalidade (a duração, a sala ou a chamada, o sigilo, o valor) → a mensagem pronta |
| **Sem rastreio** | Nada é gravado nem medido; o relatório de acessos não registra a escolha |
| **Aviso** | O aviso de crise ao lado da ação |
| **Sem script** | O texto das duas modalidades na íntegra e o WhatsApp |

### 5.3 · No Completo [C]: "o que perguntar"

Perguntas para avaliar a profissional na primeira entrevista, que mudam com a situação ("é a minha primeira terapia", "estou trocando de profissional", "quero avaliar a profissional"). Sem script, cinco perguntas valem para todos: qual é a abordagem; com que frequência; como funciona o sigilo; o que acontece em caso de falta; por que critério se avalia o andamento. "Estas perguntas servem para avaliar quem atende — inclusive para concluir que não é esta a profissional. Trocar não é fracasso."

### 5.4 · Módulos

- **Agenda com o mínimo** (a mesma lista em `../14-funcionalidades/05-agenda.md`, seção 1, "Varia por", e seção 12):
  - nome, e-mail (o canal da confirmação), telefone opcional, a modalidade de atendimento (presencial ou on-line) e o horário;
  - consentimento específico e destacado, com a caixa desmarcada;
  - prazo de guarda curto;
  - nada sobre o motivo nem a abordagem.

  Até 08.10.2026, a Agenda dizia "sem caixa de consentimento"; vale este arquivo, na norma (A CONFIRMAR com advogado).
- **Presença: não.** Avaliação pública é depoimento, e expõe quem avalia como paciente.

---

## 6. Direção de arte (ponto de partida · RATIFICADO)

### 6.1 · Materiais e vocabulário

Tecido, madeira, plantas, a luz quieta de uma sala com janela, a poltrona. O vocabulário: entrevista, sessão, abordagem, sigilo, frequência, encaixe, modalidade.

### 6.2 · Fotografia

O consultório **vazio**, a poltrona, a janela, a porta; a profissional, se quiser aparecer (autorização). Nunca paciente, nunca "pessoa triste" de banco de imagens.

### 6.3 · Tipografia

- **Postura:** **exibição serena** (razão ≥ 4 na capa: peso leve, entrelinha aberta, poucas palavras, muito ar; `../05-tipografia.md`, seção 6.3). Até 08.10.2026, à noite, contenção (≤ 2), que deixou o título do exemplo de odontologia em 35 px.
- **Famílias candidatas** (OFL 1.1 [V]; `README.md`, seção 2):

| Papel | Família | Por quê |
|---|---|---|
| Uma só | **Crimson Pro** | Serifa literária, de livro, com pesos para o título contido |
| Alternativa | **Alegreya** | Serifa caligráfica e calorosa, de leitura longa |

- **O demo de setembro usava** Epilogue: não repetir.

### 6.4 · Cor

- **Partida:** saturação baixa, tons de tecido e de planta; contraste de texto alto (o corpo é lido devagar).
- **Evitar** o creme com terracota (agrupamento de IA) e o "azul calmante" de aplicativo de meditação.

### 6.5 · Forma

Cantos arredondados, raio generoso; nada que pareça urgência (sem selo, sem faixa, sem contador).

### 6.6 · O gesto

- **Do Spell UI no Essencial:** o **marca-texto**, uma vez, numa palavra-chave fora do título — e só se ajudar a ler (por exemplo, "decidir"). Pode ser nenhum.
- **Movimento:** o mínimo do Essencial; transições curtas; nada contínuo.

### 6.7 · O que não fazer

| Não | Por quê |
|---|---|
| Cérebro, quebra-cabeça, silhueta com nuvem | Clichê do ramo e sensacionalismo |
| "Valor social", "pacote de 4 sessões", "primeira sessão grátis" | Preço como propaganda (art. 20, "d") |
| Teste on-line ("descubra se você tem ansiedade") | Diagnóstico na página (art. 54) |
| Formulário de triagem | Dado sensível gravado; decisão de setembro: zero |
| Depoimento, avaliação, "mais de 500 pacientes" | Vedado; quebra o sigilo |
| Rastreador ou pixel de anúncio | O site não coleta nada, e aqui menos ainda |

---

## 7. Texto

**Registro.** Impessoal, sereno, sem jargão clínico e sem tom de aconselhamento.

**O que dizer:** como é a primeira entrevista; que ela não compromete a continuidade; a abordagem em linguagem comum; a duração e o valor, iguais para todos; o sigilo; a falta; o on-line; o aviso de crise; o que a casa não faz.

**O que é vedado ou arriscado dizer:** "cura", "resultado em X sessões"; "preço acessível", "valor social", "desconto", "gratuito"; qualquer orientação ou diagnóstico ("se você sente X, você tem Y"); depoimento; autopromoção comparativa.

**Exemplos no registro certo** (demo de setembro):
- "As primeiras sessões servem para decidir." (título)
- "A entrevista não compromete a continuidade."
- "O valor da sessão está informado acima, e é a mesma quantia para todos."
- "Nada aqui constitui diagnóstico, análise de caso ou aconselhamento. Um texto de site não conhece a história de quem o lê."
- "Trocar não é fracasso, e a entrevista existe também para isso."

---

## 8. Referências para estudar

| Referência | Endereço | Sob que norma opera | O que aprender | O que não copiar |
|---|---|---|---|---|
| Twofold Therapy (menção honrosa, 02.08.2026) | https://www.awwwards.com/sites/twofold-therapy | Estrangeira | Fotografia do lugar como identidade | A paralaxe e o GSAP |
| Q Psychology (menção honrosa, 23.01.2025) | https://www.awwwards.com/sites/q-psychology | Estrangeira | Perfis da equipe; um público declarado (LGBTQIAP+); a página 404 própria | — |
| DR ROMEU, Barcelona (setembro) | Endereço não registrado na análise | Espanha | O único par (estrangeiro) | Formulário de coleta na entrada, registro profissional ausente, `lang="en"` com texto em espanhol, o leitor tratado por "tu" |

**Lacuna:** nenhum par brasileiro. Antes do primeiro cliente, achar uma referência de psicóloga brasileira de consultório e registrá-la aqui.

---

## 9. O que a pesquisa de setembro mediu

Análise de setembro de 2026 (`nichos/analises/atlas--analise-psicologia.md`, no repositório do Atlas), com o demo de medicina medido junto:

| | DR ROMEU (Barcelona) | Demo · Psicologia | Demo · Medicina |
|---|---|---|---|
| Pedidos | 53 | 4 | 4 |
| Peso | 1,56 MB | 0,052 MB | 0,051 MB |
| Carga | 5,8 s | 2,5 s | 2,4 s |
| Telas | 10,8 | 11,4 | 10,8 |
| Imagens | 41 | 0 | 0 |
| `h1` | 68 px | 66 px | 58 px |
| `lang` | `en` com texto em espanhol | `pt-BR` | `pt-BR` |
| Formulário de coleta | sim, na entrada | nenhum | nenhum |
| Registro profissional | não detectado | CRP, 3 vezes | CRM e RQE, 5 vezes |
| Preço publicado | 0 | 10 | 11 |

- **Formulário:** **manter em zero**.
- **`lang`:** o idioma declarado corresponde ao do texto — virou item da régua.
- **Registro:** manter; a referência não tem, e no Brasil seria infração.
- **Fotografia:** consultório e profissional, nunca paciente.

---

## 10. Riscos e pendências

- **Valor publicado** [DIV]: a decisão de setembro foi informar com sobriedade; o advogado confirma se o valor sóbrio, sem moldura, cumpre o art. 20, "d".
- **CFP 09/2024 e o e-Psi** [FU]: conferir o texto e a situação da profissional antes de anunciar o on-line.
- **Aviso de crise:** conferir o número e a forma de atendimento do CVV na entrega e em cada revisão.
- **Nenhum par brasileiro** estudado.

---

## 11. Lista de conferência do nicho

- [ ] Nome completo, "psicóloga" ou "psicólogo", CRP e número em toda página, também no celular.
- [ ] O valor, se publicado, está só na página de valores, igual para todos, sem nenhum termo promocional.
- [ ] Nenhuma previsão de resultado, diagnóstico, orientação ou teste.
- [ ] Nenhum depoimento; nenhum perfil de avaliação; nenhum rastreador.
- [ ] Nenhum formulário de servidor; a mensagem sai do aparelho.
- [ ] O aviso de crise (CVV 188) está ao lado de toda ação.
- [ ] A Agenda, se contratada, pede só nome, e-mail, telefone opcional, modalidade de atendimento e horário, com consentimento destacado (caixa desmarcada).
- [ ] `lang="pt-BR"`; o texto todo em português.
- [ ] Fotos sem paciente; o consultório vazio.
- [ ] Exibição serena na capa; movimento sereno, com a camada do plano inteira; os efeitos da identidade; o teste da vitrine.

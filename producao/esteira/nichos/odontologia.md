# Odontologia · Completo

> **Para que serve.** Tudo o que o site de um consultório ou clínica odontológica precisa, do briefing à entrega: a norma do conselho (a mais delicada depois da advocacia), as páginas por tratamento, o pedido de avaliação, o plano de sessões, a direção de arte de partida, o texto e a conferência.
>
> **Estado.** Ordem comercial (4º) e plano de referência (Completo): RATIFICADO (decidido em 07.10.2026; ratificado em 08.10.2026). Norma: a CFO-196/2019 conferida no texto do CFO [V]; o Código de Ética Odontológico lido no PDF do CFO em 08.10.2026 [V]; o antes e depois, resolvido como fora pela nota do CFO de 16.01.2026 (seção 3). A análise de setembro ficou **incompleta** e o demo nunca foi medido. Direção de arte: RATIFICADO.
>
> **Leia com.** `README.md` (o quadro comum); `../03-planos.md`, seção 5; `../14-funcionalidades/07-funcionalidades-do-oficio.md` e `../14-funcionalidades/08-peca-assinatura.md`; `../17-conformidade-e-normas.md`.
>
> **Implementação de referência.** Nenhuma em Next.js. A versão estática de setembro ("Odontologia Boa Viagem") existe só em pacote, no repositório do Atlas (`nichos/atlas--demo-odontologia--2026-09-05.zip`; ler em memória, nunca extrair).
>
> **Atualizado em:** 08.10.2026.

---

## 1. Ficha

| Campo | Valor |
|---|---|
| **Ordem comercial** | **4º de 12.** Razão de 29.08.2026: "ticket alto, setor que já investe em divulgação, antes e depois liberado" — a última parte foi corrigida: o antes e depois fica fora (seção 3). Conferida em 07.10.2026: volume 4, facilidade 3, ticket 5, atrito 2 — 6º com os dois pesos (3,60 e 3,15) |
| **Plano de referência** | **Completo** [C]: ticket alto; sem poder mostrar preço, o site converte pela confiança — uma página por tratamento, a equipe e o consultório |
| **Módulos** | **Agenda**; **Presença com cautela** (perfil sem pedido de avaliação) |
| **Norma** | Código de Ética Odontológico (CFO-118/2012), arts. 43 e 44 [V]; CFO-196/2019, arts. 1º a 4º [V]; nota do CFO de 16.01.2026 [V]; CFO-271/2025 [FU]; LGPD, arts. 5º, II, e 11 [V] |
| **Preço no site** | **Vedado** — e também serviço gratuito e modalidade de pagamento (Código de Ética, art. 44, I) [FU] |
| **Volume em Niterói** | CNAE 86.30-5 (atividade ambulatorial de médicos e odontólogos, junto com a medicina): 2.280 unidades em 2022, 2.653 em 2023, **3.039 em 2024**; 9.990 pessoas ocupadas (IBGE/CEMPRE, sem MEI) [V]. Dentistas no estado do RJ: 35.411 (CFO via Sebrae, agosto de 2022) [FU]; em Niterói, ~1.000 é estimativa sem fonte municipal [NV]. A odontologia ficou fora das quinze atividades com mais aberturas no 3º trimestre de 2024 (Boletim do ISS da Prefeitura de Niterói, nº 15) [V] |
| **Público** | Quem decide é o dentista-dono, ou os sócios da clínica com o responsável técnico. Quem visita: quem está com dor, quem quer uma revisão, quem pensa em estética ou ortodontia |
| **Site de exemplo** | **Odontologia Boa Viagem** [ex]: só a versão estática de setembro (vinho sobre branco quente, Instrument Serif); a refazer no Completo |

---

## 2. O cliente e a dor

**Quem decide e quanto paga.** O dono ou os sócios. Completo: R$ 2.400 de criação e R$ 400 por mês; Agenda, +R$ 400 e +R$ 80 (ata v3.0, IV.2).

**O que o visitante procura:**
1. Se é atendido **hoje**, se estiver com dor.
2. Quem atende: o dentista, o CRO, a especialidade registrada.
3. O que acontece na primeira consulta, e se ela já executa algum procedimento.
4. Quantas sessões um tratamento leva, e com que intervalo.
5. Onde fica, o horário, se aceita o convênio dele.

**A dor do ramo, como o demo de setembro a leu:** o paciente não pode ver preço (a norma veda) e teme ser "vendido" na primeira consulta. O site responde com **tempo** (sessões, intervalos, duração) e com a promessa da casa de que a avaliação não executa procedimento.

**A tarefa do site no Completo — trabalhar pelo negócio.** Receber o pedido de avaliação já com o motivo, explicar cada tratamento numa página própria (que também ocupa a busca), mostrar a sequência de sessões e preparar o paciente para a consulta.

---

## 3. Normas

**O antes e depois: fora.** Era a divergência central [DIV]; a nota do CFO de 16.01.2026 a resolve para a clínica.
- A **CFO-196/2019**, art. 2º, autoriza "a divulgação de imagens relativas ao diagnóstico e à conclusão dos tratamentos odontológicos quando realizada por cirurgião-dentista responsável pela execução do procedimento, desde que com autorização prévia do paciente" (termo de consentimento livre e esclarecido) [V].
- O **Código de Ética** de 2012, art. 44, I e XII, trata como infração a publicidade "com expressões ou imagens de antes e depois" e os "artifícios de propaganda [...] especialmente a utilização de imagens e/ou expressões antes, durante e depois, relativas a procedimentos odontológicos" [V].
- **A nota do CFO de 16.01.2026** ("CFO Esclarece: Ética para cirurgiões-dentistas recém-formados", cfo.org.br) lê a 196 assim: ela permite o antes e depois com o termo, "no entanto, a Resolução 196 proíbe a divulgação de resultados por terceiros, inclusive pessoas jurídicas" [V].
- **Na clínica (pessoa jurídica): vedado.** **No consultório de pessoa física:** a 196 permite o caso do próprio dentista, com o termo; o Atlas não publica paciente (política), e o antes e depois fica fora também ali.
- A razão de 29.08 ("antes e depois liberado") estava certa sobre a 196, com condições; o quadro de 30.09 ("a CFO-196 veda preço e antes e depois") errava nos dois pontos — o preço é vedado pelo Código de Ética, não pela 196.

| Tema | Regra | Fonte | Evidência |
|---|---|---|---|
| **Identificação** | Nome e número de inscrição no CRO (da pessoa física ou da jurídica), e o nome da profissão ("cirurgião-dentista"); na clínica, também o nome e o CRO do **responsável técnico** | Código de Ética, art. 43, *caput*; CFO-196/2019, art. 4º (nome e CRO em toda publicação) | [V] |
| **Especialidade** | Só a registrada no CRO; a clínica que anuncia especialidade tem profissional inscrito nela e publica a relação | Código de Ética, arts. 43, § 2º, e 44, II | [FU] |
| **Preço, serviço gratuito, modalidade de pagamento** | Infração ética na publicidade; segue vedado depois da CFO-271/2025, que só mexeu em cartão de desconto e em captação | Código de Ética, art. 44, I [V]; Legismap sobre a 271 [FU] | [V]; [FU] |
| **"Popular"** | A expressão é vedada ("clínica popular", "preço popular") | Código de Ética, art. 44, VII | [V] |
| **Convênios e credenciamentos** | Podem constar, como informação, ao lado do endereço, do telefone e do horário; nunca com preço, desconto ou condição de pagamento | Código de Ética, art. 43, § 1º, IV | [V] |
| **Antes e depois** | Fora: vedado na clínica; política do Atlas no consultório (acima) | CFO-196/2019, arts. 2º e 4º; nota do CFO de 16.01.2026; Código de Ética, art. 44, I e XII | [V] |
| **Imagem do transcurso** (durante o tratamento) | Vedada | CFO-196/2019, art. 3º | [V] |
| **Sensacionalismo, autopromoção, mercantilização, promessa** | Vedados, mesmo nas imagens autorizadas | CFO-196/2019, art. 2º, § 1º | [V] |
| **Consulta, diagnóstico ou prescrição** pela página | Infração | Código de Ética, art. 44, V | [FU] |
| **Trabalho gratuito para autopromoção** ("avaliação grátis") | Infração | Código de Ética, art. 44, I e IX | [FU] |
| **Equipamento** | Só o que tem registro validado (a Anvisa); sem atribuir capacidade superior. Na selfie com paciente, nenhum equipamento, instrumental ou material identificável | Código de Ética, art. 44, III; CFO-196/2019, art. 1º, § 1º | [V] |
| **Captação** | Telemarketing ativo, carro de som, sites de compra coletiva, cartão de desconto | Código de Ética, art. 44, XIV (redação da CFO-271/2025) | [FU] |
| **Depoimento de paciente** | Fora: o LEIA-ME de setembro o lê como vedado; o código não tem inciso próprio (cai no art. 44, I e XII) | LEIA-ME; transcrição do código | [FU] |
| **Selfie com paciente** | Autorizada com termo de consentimento (CFO-196/2019, art. 1º) [V]; **o Atlas não publica paciente** | Política do Atlas | DECIDIDO |
| **Dado de saúde** | O motivo da consulta ("estou com dor") é dado sensível; o site não o grava | LGPD, arts. 5º, II, e 11 | [V] |

**Para o advogado** (confirmação; não bloqueia): o texto oficial e integral do art. 44 depois da 271/2025, e o código novo — a nota do CFO de 16.01.2026 confirma a atualização em curso [V]. Os convênios saíram desta lista em 08.10.2026: o art. 43, § 1º, IV, os põe entre o que "poderão ainda constar" [V].

**Onde ler** (conferido em 08.10.2026): o Código de Ética e as resoluções estão no site do CFO (cfo.org.br, "Legislação") e no sistema de atos (sistemas.cfo.org.br). O certificado do sistema de atos falhou na cadeia (o `curl` deu o erro 60); a leitura de um ato público pode seguir com o arquivo baixado pelo navegador. O roteiro geral está em `../../claude/commands/normas.md`.

---

## 4. Estrutura de páginas

### 4.1 · No Completo [C] (sem limite de páginas)

| Página | Objetivo | Seções, na ordem | Obrigatório |
|---|---|---|---|
| **Início** | Confiança em cinco segundos, e a ação | Capa (o fato da casa, o CRO e o responsável técnico, "com dor, encaixe no mesmo dia", a ação); os tratamentos em resumo, com sessões e sem preço; a equipe; o consultório; o que não se faz aqui; a chamada | Nome, CRO, responsável técnico também no celular |
| **Tratamentos** (índice) | Mostrar o que se faz, por região e por motivo | O mapa dos dentes (seção 5.2) e a lista dos tratamentos | Sem preço |
| **Uma página por tratamento** | Explicar e ocupar a busca ("canal em Icaraí") | O que é; quando se indica, em termos gerais (nunca diagnóstico): de fonte pública citada, como o CFO ou o Ministério da Saúde, e revisto pelo dentista do cliente; nenhum sintoma vira conclusão; quantas sessões, o que se faz em cada uma e o intervalo; os cuidados depois; o pedido de avaliação já com o motivo | Sem preço, sem antes e depois, sem promessa |
| **Avaliação** | O pedido de avaliação (seção 5.1) | Motivo, última visita, período → a mensagem; o que acontece na avaliação; a urgência | "A avaliação não executa procedimento" (se for a política da casa) |
| **Equipe** | Quem atende | Retrato autorizado, nome, CRO, especialidade registrada (título), formação | A relação dos especialistas, se a clínica anuncia especialidade |
| **O consultório** | O lugar e o cuidado | Fotos do consultório e dos equipamentos (registrados, sem superlativo); a biossegurança, descrita sem promessa | — |
| **Onde** | Levar até a porta | Endereço, mapa do bairro em vetor, horário, acessibilidade do prédio, estacionamento; os convênios aceitos, se houver, como informação (art. 43, § 1º, IV) | Prazo de resposta |
| **Guias** [C] | Conteúdo informativo | Cuidados depois de cada tratamento; como se preparar; perguntas comuns — sem consulta nem diagnóstico (art. 44, V) | — |

### 4.2 · Se o cliente contratar outro plano

| Plano | O que muda |
|---|---|
| **Profissional** [P] | Seis páginas: Início, Tratamentos (uma página só, com todos), Avaliação (a funcionalidade do ofício), Equipe e consultório (com a galeria), Guias ou Perguntas, Onde. O formulário pede nome, contato e período — o motivo clínico vai pelo WhatsApp, que sai do aparelho do paciente |
| **Essencial** [E] | Três páginas: Início (tratamentos em resumo, a equipe), O consultório e a equipe, Onde. O pedido sai pelo WhatsApp |

**No briefing, bloqueante neste nicho:** em todo plano, os tratamentos que a casa faz, com o número de sessões e o intervalo de cada um; o que acontece na avaliação e se ela executa procedimento (a política da casa); a urgência (se há encaixe no mesmo dia para quem está com dor); e, de cada dentista da equipe, o nome, o CRO, a especialidade registrada (com o título) e a formação, com a relação dos especialistas se a clínica anuncia especialidade. No Profissional e no Completo [P][C], nenhum a mais: o pedido de avaliação usa os tratamentos e a política de urgência. Só no Completo [C], de cada tratamento, a região no mapa dos dentes, o que se faz em cada sessão e os cuidados depois (as sessões da casa). Sem isso, o início, as páginas de tratamento e a de avaliação não se escrevem.

---

## 5. Funcionalidades

### 5.1 · Funcionalidade 1 [P][C]: o pedido de avaliação

| Item | Especificação |
|---|---|
| **Objetivo de negócio** | A avaliação chega marcada com o motivo e o período; a urgência entra no mesmo dia |
| **Entradas** | O **atendimento** procurado — avaliação de rotina; **urgência (encaixe no mesmo dia)**; limpeza; estética dos dentes; ortodontia; implante; continuar tratamento iniciado; outro —, nunca um sintoma como opção pronta ("dor", "sangramento"): quem quiser descreve na conversa; a região, se quiser, pelo mapa dos dentes (5.2); a última visita ao dentista; o período de preferência |
| **Saída** | A mensagem pronta → "Pedir horário"; com "urgência", a página diz que o encaixe é no mesmo dia (se for a política da clínica, conferida no briefing) |
| **Dado sensível** | O que a pessoa conta na conversa pode ser dado de saúde: por isso a página oferece atendimentos, não sintomas, e **nada é gravado** — a mensagem sai do aparelho. Na Agenda (servidor), o motivo não é campo (`../17-conformidade-e-normas.md`, seção 5.1) |
| **Sem script** | O WhatsApp com a instrução de informar o motivo e o período; "estando com dor, o encaixe é no mesmo dia" |
| **Texto da norma** | "Esta página não divulga valores, porque a norma do conselho o veda." |

### 5.2 · Funcionalidade 2 [C]: o plano de sessões, aberto pelo mapa dos dentes

| Item | Especificação |
|---|---|
| **Objetivo de negócio** | O paciente entende **o tempo** do tratamento antes da consulta — o que se pode publicar no lugar do preço |
| **Entrada** | A região no mapa dos dentes (superior e inferior; da frente e do fundo) ou o tratamento na lista |
| **Saída** | Os tratamentos da região; para cada um, o número de sessões, o que se faz em cada uma, o intervalo entre elas e os cuidados depois → "Marcar avaliação para este caso" |
| **Regras** | Sequência de referência, não orçamento; nenhum preço; nenhuma frase que diagnostique ("você tem", "você precisa"); as sessões são da casa |
| **Acessibilidade** | O mapa é uma lista de botões com nome ("Dentes do fundo, arcada inferior"), operável por teclado; o desenho é decoração do mesmo controle |
| **Sem script** | A tabela de tratamentos, com sessões e intervalos |
| **Ressalva** | "O número de sessões de cada caso sai do exame clínico, e consta do plano entregue por escrito." |

**O mapa dos dentes serve às duas:** no pedido de avaliação, escolhe a região (opcional); no plano de sessões, abre os tratamentos da região. É um componente só, com a mesma acessibilidade (`../14-funcionalidades/07-funcionalidades-do-oficio.md`, seção 4). O contexto de nichos do Atlas (07.10) registra as duas do Completo como "pedido de avaliação e plano de sessões".

### 5.3 · Módulos

- **Agenda:** nome, telefone, tipo (avaliação ou retorno) e horário; o motivo clínico fica fora do servidor.
- **Presença com cautela:** perfil no Google com fotos do consultório e horário; **não se pede avaliação** a paciente; nenhuma avaliação é republicada no site.

---

## 6. Direção de arte (ponto de partida · RATIFICADO)

### 6.1 · Materiais e vocabulário

Cerâmica, esmalte, aço cirúrgico, a luz do refletor, o branco quente do consultório. O vocabulário: avaliação, sessão, intervalo, arcada, gengiva, restauração, canal, prótese, cuidado.

### 6.2 · Fotografia

- **O que fotografar:** o consultório, o dentista e a equipe (autorização escrita), os equipamentos com registro na Anvisa (Código de Ética, art. 44, III), sem paciente no quadro, a sala de espera, a fachada.
- **Nunca:** paciente, boca em close, antes e depois, sorriso de banco de imagens.

### 6.3 · Tipografia

- **Postura:** **exibição serena** (razão ≥ 4 na capa; `../05-tipografia.md`, seção 6.3): o título em peso leve, de 64 a 96 px na mesa, poucas palavras e muito ar. Até 08.10.2026, à noite, contenção (≤ 2): o exemplo daquele dia saiu com o título de 30 a 35 px e ficou fora da faixa premium.
- **Famílias candidatas** (OFL 1.1 [V]; `README.md`, seção 2):

| Papel | Família | Por quê |
|---|---|---|
| Uma só | **Albert Sans** | Sem serifa geométrica, limpa, com pesos para separar título e texto. **A do Google Fonts não tem algarismos tabulares** (medido no navegador em 08.10.2026), e o plano de sessões e o horário pedem `tnum`: confira antes, ou use o par Red Hat (a régua avisa) |
| Alternativa, títulos | **Red Hat Display** | Sem serifa de desenho limpo, com a família de texto irmã |
| Alternativa, texto | **Red Hat Text** | A versão de texto da mesma família |

- **Evitar** a Instrument Serif (está no premiado Aventura, no demo de setembro e no site de exemplo da barbearia).

### 6.4 · Cor

- **Partida:** o branco quente do esmalte como fundo; um tom de cerâmica ou de pedra como acento; a tinta escura e neutra.
- **Evitar** o clichê do ramo: turquesa e azul-hospital, o dente em ícone, o brilho de "sorriso".
- **A profundidade:** o branco quente em camadas (o esmalte sobre a cerâmica), a sombra longa e macia da luz do refletor, a cerâmica em relevo nos cartões. Nunca o fundo chapado com borda fina em todas as seções (`../11-anti-ia.md`, seção 5.10).

### 6.5 · Forma

Cantos arredondados (preferência do usuário), raio generoso nos cartões: a forma macia combina com o cuidado.

### 6.6 · O gesto

- **Do ofício:** o **mapa dos dentes** que se toca (região → tratamento, sessões, cuidados).
- **Do Spell UI no Completo:** **um** gesto — a inclinação leve do mapa sob o ponteiro, na mesa; nada de brilho em "sorriso".
- **Os efeitos da identidade** (`../09-movimento.md`, seção 12; desde 08.10.2026, à noite, no lugar do "movimento contido"):
  - **a matéria:** a cerâmica e o esmalte, com o brilho úmido;
  - **a luz:** o halo do refletor, que acompanha o cursor na mesa e acende no ponto tocado no celular;
  - **a resposta:** o reflexo do esmalte que corre nas peças sob a luz; o relevo da cerâmica que inclina nos cartões (Profissional e Completo);
  - **a entrada:** a capa como o refletor que acende sobre o mapa;
  - **o tom:** sereno, com as curvas lentas, sem quique nem brilho em promessa. A camada do plano vem inteira.

### 6.7 · A peça-assinatura (Completo)

**O mapa dos dentes como objeto de vitrine** (revisto em 08.10.2026, à noite): as duas arcadas em escala de capa, em cerâmica e esmalte, em relevo, em CSS 3D ou em WebGL, a partir de referência anatômica. O objeto gira até a região escolhida e, na capa, acompanha a rolagem (a cena do Completo: `../09-movimento.md`, seção 5, item 7). O desenho vetorial de traço fica como a função, que é a escolha da região, e como a reserva sem script e sem WebGL. No exemplo de 08.10.2026, o mapa só em traço fino, como a única imagem da capa, foi o que mais o afastou da barbearia.

A alternativa é um estudo de material (cerâmica, esmalte) fotografado no próprio consultório. **O dente 3D brilhante, isolado, é clichê**: o objeto é a arcada do odontograma, com a numeração FDI, nas cinco condições de `../09-movimento.md`, seção 7.

### 6.8 · O que não fazer

| Não | Por quê |
|---|---|
| Antes e depois, sorriso de paciente | Vedado na clínica (nota do CFO de 16.01.2026); política do Atlas no consultório |
| "Premium", "o mais moderno", "sem dor" | Superlativo e promessa; o premiado Aventura usa "Premium" e sorriso de paciente — restrito pelo CFO |
| "Avaliação grátis", "parcelamos em 12×", "aceitamos Pix" | Serviço gratuito e modalidade de pagamento (art. 44, I) [FU] |
| Ícone de dente com brilho, turquesa hospitalar | Clichê do ramo |
| Formulário que pede o motivo clínico | Dado sensível gravado sem necessidade |

---

## 7. Texto

**Registro.** Impessoal, calmo e preciso. O tempo no lugar do preço.

**O que dizer:**
- o que acontece na avaliação, e que ela não executa procedimento (se for a política da casa);
- a urgência: o encaixe no mesmo dia e a finalidade dele;
- o número de sessões e o intervalo de cada tratamento;
- os cuidados depois;
- quem atende, com CRO e especialidade registrada;
- por que o site não tem preço: "a norma do conselho o veda".

**O que é vedado ou arriscado dizer:** preço, "a partir de", "parcelamos", formas de pagamento, "avaliação grátis" [V]; "popular" (art. 44, VII) [V]; "o melhor", "o mais moderno", "sem dor", "garantia", "sorriso perfeito"; "especialista" sem título registrado; qualquer frase que diagnostique.

**Exemplos no registro certo** (demo de setembro):
- "Nenhum procedimento na primeira consulta." (título)
- "Uma avaliação, não um procedimento."
- "Quantas sessões, e com que intervalo."
- "Sequência de referência, não orçamento."
- "Estando com dor, o encaixe é no mesmo dia e tem outra finalidade: controlar a dor."

---

## 8. Referências para estudar

| Referência | Endereço | Sob que norma opera | O que aprender | O que não copiar |
|---|---|---|---|---|
| Aventura Dental Arts (SOTD, 19.03.2026, nota 7,41; Developer 8,11) | https://www.awwwards.com/sites/aventura-dental-arts · https://aventuradentalarts.com/ (medido) | Estrangeira | A tela dividida com vídeo do dentista; 40 imagens reais; duas cores (#EAE8E8 e #14151D) | "Premium", o sorriso de paciente, o `h1` "Your smile, effortlessly enhanced" (promessa) |
| Halo Dental (SOTD e Developer, 2024, nota 7,41) | https://halodental.com/ (medido) | Estrangeira | Uma fonte própria (Nuckle) em tudo; 23 imagens | O `h1` "We All Shine" e a inércia |
| LAVA Dental (CSSDA, 13.01.2026, nota 7,96) | https://www.cssdesignawards.com/sites/lava-dental/48695/ | Estrangeira | A odontologia como "experiência de estúdio", numa página | — |
| South Cliff Dental Group (menção honrosa, 16.06.2026) | https://www.awwwards.com/sites/south-cliff-dental-group · https://southcliffdentalgroup.com/ (CSS lido em 09.10.2026) | Estrangeira | O premiado de odontologia de 2026: ouro e ardósia, **uma cena 3D que se arrasta** e o único dos nove premiados com o movimento reduzido no CSS; prova que a clínica cabe no padrão premium com objeto em 3D (`../19-o-padrao-atlas.md`, seção 4.1) | Os selos e os números de depoimento como prova |
| L'Avenir Dental Clinic (SOTD, 2015) | https://www.awwwards.com/sites/l-avenir-dental-clinic | Estrangeira | Referência antiga do ramo | — |
| Klaas, modelo do Webflow (setembro) | Endereço não registrado na análise | Estrangeira | 144 imagens num site de 0,73 MB | Três das seis vedações do CFO: superlativo no `h1` ("Excellent dental services"), garantia, "especialista"; `lang="en"`; formulário de um campo |

*"Estrangeira": nenhuma opera sob o código do CFO; aproveita-se a forma, nunca a promessa (`README.md`, seção 3.1).*

---

## 9. O que a pesquisa de setembro mediu

Análise **incompleta** de setembro de 2026 (`nichos/analises/atlas--analise-odontologia.md`, no repositório do Atlas): uma referência só, e o demo do Atlas **não foi medido**.

| Klaas · modelo de dentista do Webflow | |
|---|---|
| Pedidos | 52 |
| Peso | 0,73 MB |
| Carga | 6,6 s |
| Telas | 16,8 |
| Imagens | 144 |
| `h1` | 78 px — "Excellent dental services" |
| `lang` | `en` |
| Formulário | 1, com 1 campo |

| Vedação | Ocorrências no Klaas |
|---|---|
| Preços e valores | 0 |
| Antes e depois | 0 |
| Depoimento de paciente | 0 |
| **Superlativo comparativo** | **1** |
| **Garantia de resultado** | **1** |
| **"Especialista"** | **2** |

---

## 10. Riscos e pendências

- **Antes e depois:** fora (seção 3): vedado na clínica pela leitura do CFO de 16.01.2026; política do Atlas no consultório.
- **Código novo do CFO** anunciado em junho de 2025 [FU]: conferir antes do primeiro cliente.
- **A análise está incompleta** e o demo nunca foi medido: medir o primeiro site do nicho com o mesmo instrumento e completar a análise com um par brasileiro.
- **O "Premium" dos premiados:** a referência estética do ramo opera sob outra norma (`README.md`, seção 3.1).
- **O mapa dos dentes** precisa de revisão do dentista: anatomia, nomes, sessões.

---

## 11. Lista de conferência do nicho

- [ ] Nome, CRO e "cirurgião-dentista" em toda página; na clínica, o responsável técnico com CRO; também no celular.
- [ ] Nenhum preço, valor, "a partir de", gratuidade ou forma de pagamento em lugar nenhum do site.
- [ ] Nenhum antes e depois, imagem de transcurso ou paciente.
- [ ] Especialidade só com título registrado; a relação de especialistas publicada, se a clínica anuncia especialidade.
- [ ] Nenhuma frase de diagnóstico ou promessa ("sem dor", "garantia", "o mais moderno").
- [ ] O pedido de avaliação não grava nada; a Agenda não tem campo de motivo clínico.
- [ ] O mapa dos dentes funciona por teclado e tem reserva em tabela sem script.
- [ ] Nenhuma avaliação de paciente republicada; o perfil no Google não pede avaliação.
- [ ] Os convênios, se houver, só como informação: sem preço, desconto ou condição; nunca "popular".
- [ ] Exibição serena na capa (razão ≥ 4); o mapa dos dentes como objeto de vitrine; os efeitos da identidade; o movimento sereno, com a camada do Completo inteira; o teste da vitrine ao lado da barbearia.

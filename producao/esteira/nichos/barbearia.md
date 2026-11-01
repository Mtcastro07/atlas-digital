# Barbearia · Completo

> **Para que serve.** Tudo o que o site de uma barbearia de bairro precisa, do briefing à entrega: as páginas, o pedido de horário, a janela de retorno, a peça-assinatura, a direção de arte de partida, o texto e a conferência.
>
> **Estado.** Ordem comercial (3º) e plano de referência (Completo): RATIFICADO (decidido em 07.10.2026; ratificado em 08.10.2026), com a ressalva registrada de que a barbearia típica compraria o Profissional com a Agenda. Norma: nenhum conselho; o Código de Defesa do Consumidor e o Código Civil, conferidos no texto oficial [V]. O 3D em WebGL diverge da norma de produção antiga e entra pelas cinco condições, ratificadas em 08.10.2026. Direção de arte: RATIFICADO.
>
> **Leia com.** `README.md` (o quadro comum); `../03-planos.md`, seção 5; `../14-funcionalidades/07-funcionalidades-do-oficio.md`, `../14-funcionalidades/05-agenda.md` e `../14-funcionalidades/08-peca-assinatura.md`; `../09-movimento.md`, seção 7 (3D).
>
> **Implementação de referência.** A Barbearia Santa Rosa, no repositório do Atlas: `web/app/demos/barbearia/` (sete páginas), o conteúdo em `web/conteudo/demos/barbearia.ts`, o pedido em `web/components/ilhas/demos/agenda-da-barbearia.tsx`, o palco 3D em `web/components/ilhas/demos/palco-3d/`.
>
> **Atualizado em:** 08.10.2026.

---

## 1. Ficha

| Campo | Valor |
|---|---|
| **Ordem comercial** | **3º de 12.** Razão de 29.08.2026: "volume máximo, atrito zero, agendamento é dor real". Conferida em 07.10.2026: volume 4, facilidade 4, ticket 2, atrito 5 — 3º com os pesos escritos (3,75), 2º com os pesos "agora" (4,00) |
| **Plano de referência** | **Completo** [C]: equipe, janela de retorno e a peça 3D já feita; o site de exemplo mostra a camada inteira. **Ressalva:** a barbearia típica de bairro compraria o **Profissional com a Agenda** (`../03-planos.md`, seção 5.1) |
| **Módulos** | **Agenda** (a marcação de verdade, com servidor) e **Presença** (perfil no Google e avaliações) |
| **Norma** | Nenhum conselho. CDC, arts. 30 e 31 (preço publicado) [V]; Código Civil, art. 20 (retrato da equipe) [V]; LGPD (a Agenda) |
| **Preço no site** | **Permitido**, e o Atlas publica: quatro de cinco referências não publicam, mas o único par que publica vence em todas as medidas (`README.md`, seção 3.2) |
| **Volume em Niterói** | CNAE 96.02-5 (cabeleireiros e outras atividades de tratamento de beleza — inclui salão e estética): 655 unidades em 2022, 671 em 2023, **707 em 2024**; 1.679 pessoas ocupadas (IBGE/CEMPRE, sem MEI) [V]. O MEI, numeroso no ramo, fica fora da conta |
| **Público** | Quem decide é o barbeiro-dono. Quem visita: o cliente novo, que não consegue julgar um corte antes de sentar na cadeira; e o cliente fiel, que volta a cada duas a seis semanas |
| **Site de exemplo** | **Barbearia Santa Rosa**, Santa Rosa, "desde 1996" [ex]: sete páginas em Next.js (Início, Serviços, A casa, Equipe, Agendar, Quando voltar, Onde), noite e latão, fichas de latão em WebGL |

---

## 2. O cliente e a dor

**Quem decide e quanto paga.** O dono. Completo: R$ 2.400 de criação e R$ 400 por mês; Agenda, +R$ 400 e +R$ 80; Presença, +R$ 300 e +R$ 100 (ata v3.0, IV.2). No Profissional com a Agenda: R$ 1.900 de criação e R$ 330 por mês.

**O que o visitante procura:**
1. **Quem corta:** o rosto e a especialidade de cada barbeiro.
2. **O serviço, o preço e a duração**, antes de sair de casa.
3. Se precisa marcar, ou se há fila, e quanto se espera.
4. Onde fica, e o horário.
5. (O cliente fiel) Quando voltar.

**A dor registrada** (pesquisa de credibilidade de setembro de 2026, resumida no estudo dos nichos):
- o cliente não consegue julgar um corte antes de sentar → retrato de cada barbeiro, serviço nomeado, preço e duração;
- o fiel perde a janela de retorno → a janela calculada.

**A tarefa do site no Completo — trabalhar pelo negócio.** Marcar (o pedido sai pronto, ou a Agenda marca de verdade), lembrar o retorno, ocupar a busca com uma página por barbeiro e por serviço, ser lembrado pela peça-assinatura.

---

## 3. Normas

Nenhum conselho regula o ramo.

| Tema | Regra | Fonte | Evidência |
|---|---|---|---|
| **Preço publicado** | Vincula: o preço e a duração da tabela são oferta | CDC, arts. 30 e 31 | [V] |
| **Publicidade enganosa** | "O melhor degradê de Niterói" não se prova; "30 mil clientes" só se contado | CDC, art. 37 | [V] |
| **Retrato da equipe** | Autorização escrita de cada barbeiro, uma por pessoa; sem ela, a pessoa não aparece | Código Civil, art. 20 | [V] |
| **Cliente na foto** | Corte em andamento só com autorização escrita do cliente fotografado | Código Civil, art. 20 | [V] |
| **Avaliações** | Permitidas: não há conselho. O site não incorpora o painel de avaliações de terceiros (pedido externo e cookie); o perfil no Google é o módulo Presença | `../17-conformidade-e-normas.md` | DECIDIDO |
| **Agenda** | Coleta nome, telefone, serviço, barbeiro e horário; aviso de privacidade; nada de dado sensível | LGPD; `../14-funcionalidades/05-agenda.md` | DECIDIDO |
| **Advogado** | Nada específico do nicho | — | — |

---

## 4. Estrutura de páginas

### 4.1 · No Completo [C] (sem limite de páginas)

| Página | Objetivo | Seções, na ordem | Obrigatório |
|---|---|---|---|
| **Início** | Ser entendido e chamar | Capa (o título com o fato da casa, a ação na primeira tela do celular, o estado ao vivo); os capítulos do site; os serviços em resumo, com preço e duração; o que não se faz aqui; a chamada | A ação até 60% da primeira tela do **celular** (o exemplo esconde o botão abaixo de 640 px: defeito, seção 10) |
| **Serviços** | Responder "o que entra, quanto tempo, quanto custa" | Cada serviço nomeado, com o que compreende, a duração e o preço; a tabela completa; a política de fila e de hora marcada | Preço e duração de cada serviço |
| **Equipe** | Mostrar quem corta | Uma ficha por barbeiro (retrato autorizado, a especialidade, desde quando, os dias na casa); vínculo para a página de cada um | Autorização de imagem |
| **A casa** | A história em datas | A linha do tempo (no exemplo: 1996, a primeira cadeira; 2019, o degradê chega; hoje, três cadeiras); o lugar em fotos; o que não se faz aqui | — |
| **Agendar** | O pedido de horário (seção 5.1), ou a Agenda | Serviço, barbeiro, período e dia → a mensagem; a política de fila; o prazo de resposta | Prazo de resposta |
| **Quando voltar** | A janela de retorno (seção 5.2) | Tipo de corte e a data do último → a janela → reservar dentro dela; as faixas de referência | Ressalva de estimativa |
| **Onde** | Levar até a porta | Endereço, o mapa do bairro em vetor, horário dia a dia, como chegar, o estado ao vivo | Mapa sem pedido externo |
| **Uma por barbeiro e uma por serviço** [C] | Ocupar a busca local ("barba em Santa Rosa") | O retrato, a especialidade, os serviços e o preço; o pedido de horário já com o barbeiro escolhido | — |

### 4.2 · Se o cliente contratar outro plano

| Plano | O que muda |
|---|---|
| **Profissional** [P] (+ Agenda, o caso típico) | Seis páginas: Início, Serviços, Equipe, Agendar (a funcionalidade do ofício: o pedido de horário; ou a Agenda), A casa (com a galeria), Onde. Sem a janela de retorno, sem a peça-assinatura, sem ambiente contínuo nem 3D; o gesto é o "Copiar pedido" |
| **Essencial** [E] | Três páginas: Início (serviços com preço e duração, a equipe em resumo), A casa e a equipe, Onde. O pedido sai pelo WhatsApp com mensagem pronta; o gesto é o marca-texto |

**No briefing, bloqueante neste nicho:** em todo plano, o preço e a duração de cada serviço; de cada barbeiro, o nome, a especialidade e o retrato, com a autorização escrita; e a política de fila e de hora marcada (se a hora marcada tem prioridade, se há atendimento por ordem de chegada). No Profissional e no Completo [P][C], de cada barbeiro, desde quando está na casa e os dias em que atende (a ficha da equipe e o pedido de horário). Só no Completo [C], os tipos de corte e a faixa de retorno de cada um, em dias (as faixas da casa); e os serviços que cada barbeiro faz (a página de cada um). Sem isso, as páginas de serviços, de equipe e de retorno não se escrevem.

---

## 5. Funcionalidades

### 5.1 · Funcionalidade 1 [P][C]: o pedido de horário

| Item | Especificação |
|---|---|
| **Objetivo de negócio** | O pedido chega pronto ao WhatsApp, com serviço, barbeiro e período, sem ida e volta de mensagens |
| **Entradas** | Serviço (com duração e preço à vista); barbeiro ou "sem preferência"; período (manhã, tarde, fim do dia); dia de preferência |
| **Saída** | A mensagem pronta → "Enviar pedido no WhatsApp"; no exemplo, também o "Copiar pedido" num bilhete |
| **Regras** | O horário marcado tem prioridade sobre a fila; a fila continua (no exemplo: "sem marcar, a espera é informada na entrada"); nada é registrado na página |
| **Sem script** | O vínculo do WhatsApp com a instrução de informar serviço, barbeiro e período; os serviços e preços publicados acima |
| **Ilha** | Recebe só os campos que usa (lição de 03.10: a ilha da barbearia levava ~6 KB do site inteiro no HTML de cada página) |
| **Especificação** | `../14-funcionalidades/07-funcionalidades-do-oficio.md`; referência em `web/components/ilhas/demos/agenda-da-barbearia.tsx`, no repositório do Atlas |

### 5.2 · Funcionalidade 2 [C]: a janela de retorno

| Item | Especificação |
|---|---|
| **Objetivo de negócio** | O cliente fiel volta no tempo certo, e a cadeira não fica vazia |
| **Entradas** | Tipo de corte; data do último atendimento |
| **Regras** | Faixas de referência **da casa** (no demo de setembro: degradê 12 a 18 dias; social 21 a 30; tesoura 35 a 45; barba 10 a 15); datas no fuso de São Paulo |
| **Saída** | A janela (de tal a tal data) → "Reservar dentro da janela" (o pedido de horário já preenchido) |
| **Sem script** | As faixas de referência em texto, contadas do último atendimento |
| **Ressalva** | "Estimativa de referência. A velocidade de crescimento varia conforme a pessoa." |

### 5.3 · Módulos

- **Agenda** (`../14-funcionalidades/05-agenda.md`): a marcação com confirmação, no próprio site, com servidor. A primeira Agenda custa de 40 a 80 h, uma vez só. A pesquisa de setembro registrou que a Fresha cobra mensalidade; a Agenda própria evita a dependência.
- **Presença** (`../14-funcionalidades/06-presenca.md`): perfil no Google com as fotos e o horário; pedir avaliação é permitido neste nicho.

---

## 6. Direção de arte (ponto de partida · RATIFICADO)

### 6.1 · Materiais e vocabulário

Latão, couro da cadeira, terrazzo e azulejo, o letreiro pintado à mão na vitrine, a navalha, o pente, a toalha quente. O vocabulário: degradê, navalha, contorno, acerto, pé de cabelo, toalha.

### 6.2 · Fotografia

- **O que fotografar:** **o retrato de cada barbeiro** (cinco de cinco referências têm retratos, de 15 a 54), as ferramentas sobre a bancada, a cadeira, o letreiro, a esquina, o trabalho em andamento com o cliente autorizado.
- **No Completo:** sessão guiada ampliada; fotógrafo profissional como item a orçar (`../03-planos.md`).
- **O letreiro real** da fachada, se houver, é a melhor fonte de identidade: fotografado de frente, ele orienta a letra e a cor.

### 6.3 · Tipografia

- **Postura:** **exibição**.
- **Famílias candidatas** (OFL 1.1 [V]; `README.md`, seção 2):

| Papel | Família | Por quê |
|---|---|---|
| Exibição | **Abril Fatface** | Letra gorda de alto contraste, do cartaz e da vitrine pintada. Nome Reservado: o recorte precisa de outro nome |
| Exibição, alternativa | **Bungee** | Desenhada para a sinalização urbana: letreiro de fachada, também na vertical |
| Exibição, alternativa | **Rye** | Toscana de tipo de madeira; perigosa (lê como "faroeste"), só se o letreiro da casa for desse gênero. Nome Reservado |
| Texto | **Hanken Grotesk** | Grotesca de interface, neutra ao lado de uma exibição forte |

- **No Completo,** uma letra encomendada (o letreiro da casa redesenhado por letrista) pode ser a peça-assinatura; fonte comercial também cabe, com a licença lida (`../05-tipografia.md`, seção 3).
- **O exemplo usa** Instrument Serif e Jost: não repetir num cliente.

### 6.4 · Cor

- **Partida:** um **verde de barbearia** (a cadeira, o azulejo), o **latão** como acento, o **osso** como fundo claro.
- **Evitar** o quase-preto com um acento só: a avaliação de 07.10 achou no exemplo "escuro com um único acento de latão", um dos agrupamentos de IA (`../04-direcao-de-arte.md`, seção 5).

### 6.5 · Forma

Cantos arredondados (preferência do usuário); a ficha redonda, a moeda, o espelho oval. Pílula no botão.

### 6.6 · O gesto

- **Do ofício:** o **quadro de serviços** que preenche a mensagem com o serviço e o barbeiro (padrão de design de 08.10).
- **Do Spell UI no Completo:** onda, brilho ou inclinação — **um** como assinatura, no ponto de decisão (`../09-movimento.md`). O exemplo usa três: a faixa de latão em "esquina.", o brilho em "Desde 1996" e o "Copiar pedido" no bilhete. A faixa e o itálico em "esquina." estão no título, marca de IA da linha de base (`../11-anti-ia.md`, seção 7). Num cliente: um gesto de marca, fora do título.
- **Movimento do Completo:** a camada completa, com o ambiente pausável e parado fora da tela.

### 6.7 · A peça-assinatura (Completo)

- **No exemplo:** fichas de latão em WebGL, com o relevo tipográfico da casa, que viram como moeda entre as seções e as páginas.
- **As cinco condições do 3D** (`../09-movimento.md`, seção 7), todas cumpridas no exemplo:
  1. motor próprio e leve, medido (~16 KB, contra ~178 KB do three.js);
  2. carga ociosa, sem travar a página;
  3. a página inteira sem WebGL ou sem script (reserva em traço);
  4. movimento reduzido mantém a peça parada;
  5. objeto do ofício, que passa no teste do desconhecido.
- **Alternativas** para outro cliente: o letreiro da casa redesenhado; o poste em latão de setembro ("Gira na mesma esquina desde 1996") como objeto, não como ícone.
- **Lições do exemplo** (03.10): a ficha girava sozinha ao rolar (a virada era guardada por par de seções); ficava borrada (desenho a 64% da resolução no computador e 31% no celular). As correções estão em `palco-3d/motor.ts` e `cena.ts`, no repositório do Atlas.

### 6.8 · O que não fazer

| Não | Por quê |
|---|---|
| Rolagem com inércia | Zero de cinco barbearias usam; é assinatura de alto padrão, não de serviço de bairro (`README.md`, seção 3.5) |
| O kit "old school": poste listrado em todo canto, bigode, caveira, navalhas cruzadas como ícone | Clichê do ramo; cabe em qualquer barbearia |
| Quase-preto com um acento só; serifa itálica no título | Marcas de IA da avaliação de 07.10, presentes no exemplo |
| Navegação numerada e sobretítulo espaçado em caixa-alta | Idem |
| Foto de banco de barba | Banco de imagens é vedado; o retrato real é o que decide |
| Painel externo de avaliações | Pedido externo e cookie |

---

## 7. Texto

**Registro.** Impessoal, com os nomes da casa. O calor vem da especificidade.

**O que dizer:**
- cada serviço com nome próprio, o que compreende, a duração e o preço (no demo de setembro: O Clássico, corte, 40 min, R$ 45; A Navalha, barba, 30 min, R$ 35; O Conjunto, corte e barba, 1 h 10, R$ 70; O Acerto, pescoço e contorno, 15 min, R$ 20);
- quem corta, com a especialidade;
- a política de fila e de hora marcada;
- o fato da casa (os anos na esquina) em número.

**O que evitar:** superlativo sem prova ("o melhor degradê"); número de clientes sem contagem; a informalidade ("corte de gente grande"); fato geográfico falso (o demo de setembro dizia "a duas quadras da praia" de Santa Rosa, que não fica na orla).

**Exemplos no registro certo:**
- "Trinta anos na mesma esquina." (título do exemplo)
- "Três cadeiras, três especialidades."
- "Com o preço e a duração de cada serviço."
- "O horário marcado tem prioridade sobre a fila, mas atende-se também por ordem de chegada."
- "Escolha, e o pedido sai pronto."

---

## 8. Referências para estudar

| Referência | Endereço | Sob que norma opera | O que aprender | O que não copiar |
|---|---|---|---|---|
| Porem, Amsterdã (setembro) | Endereço não registrado na análise | Estrangeira | **O modelo:** 52 pedidos, 1,9 MB, 54 retratos, 23 preços, nenhuma biblioteca | A agenda pela Fresha |
| Blind Barber 10 anos (SOTD e Developer, 15.10.2020, nota 7,56) | https://www.awwwards.com/sites/blind-barber-10-year · https://anniversary.blindbarber.com/ (medido) | Estrangeira | Um arquivo de fotografias reais da comunidade (251 imagens, 26 vídeos), sem inércia | A página de 145 mil px de altura |
| CRISP Barbershop (menção honrosa, 11.08.2026) | https://www.awwwards.com/sites/crisp-barbershop | Estrangeira | Preto e branco quente; a capa que responde ao ponteiro; os preços em três listas tipográficas, sem cartão; o menu em `mix-blend-mode: exclusion`, que se inverte sobre cada cena; o título partido por uma foto (`../19-o-padrao-atlas.md`, seções 4.1 e 6.1) | O número de clientes como prova, sem a contagem |
| Rendezvous Barbers (menção honrosa, 31.07.2024) | https://www.awwwards.com/sites/rendezvous-barbers | Estrangeira | Laranja e preto, vídeo, endereços e perguntas | — |
| Fort Worth Barber Shop (CSSDA, 2016) | https://www.cssdesignawards.com/sites/fort-worth-barber-shop/28909 | Estados Unidos | O ofício como tema visual | — |
| Falcones, Brasil (setembro) | Endereço não registrado na análise | Brasil | O par brasileiro | 205 pedidos e o `h1` que é título de seção |

---

## 9. O que a pesquisa de setembro mediu

Análise de setembro de 2026 (`nichos/analises/atlas--analise-barbearia.md`, no repositório do Atlas):

| Site | Pedidos | Peso | Carga | Telas | Imagens | Retratos | Preços | Agenda externa |
|---|---|---|---|---|---|---|---|---|
| Balls (Ucrânia) | 122 | 9,3 MB | 6,0 s | 7,3 | 42 | 20 | 0 | — |
| Crisp MTL | 105 | 9,2 MB | 5,6 s | 1 | 34 | 33 | 0 | — |
| Falcones (Brasil) | 205 | 2,8 MB | 5,7 s | 5,5 | 15 | 15 | 0 | — |
| Freshcut | 116 | 2,7 MB | 8,0 s | 7,7 | 31 | 30 | 1 | Fresha |
| Porem (Amsterdã) | 52 | 1,9 MB | 5,1 s | 11,6 | 59 | 54 | 23 | Fresha |
| **Demo do Atlas** | **4** | **0,055 MB** | **2,8 s** | 11,6 | **0** | **0** | **15** | — |

- **Retratos:** 0 contra 15 a 54, em cinco de cinco → o briefing exige retrato de cada profissional.
- **Preço:** 15 contra 0 em quatro de cinco → **manter**.
- **Agenda:** própria, por mensagem → **manter** (a Fresha cobra mensalidade).
- **Inércia:** zero de cinco.
- **Altura:** 11,6 telas, idêntica à do Porem.

---

## 10. Riscos e pendências

- **Defeito do exemplo:** abaixo de 640 px, o botão "Agendar horário" some e a primeira tela do celular fica sem ação. Num cliente, a ação fica sempre até 60% da primeira tela do celular.
- **Profissional ou Completo:** o vendedor oferece o Completo pelo exemplo, mas a barbearia típica compra o Profissional com a Agenda (ressalva registrada).
- **3D em WebGL e ligado à rolagem:** exceção pedida pelo usuário em 01.10.2026, que diverge da norma de produção de setembro; ratificada em 08.10.2026. O custo na placa de vídeo cresceu com a nitidez (até ~2,4 vezes de pixels no computador); o ajuste por quadros cuida dos aparelhos lentos.
- **Marcas de IA do exemplo** (escuro com um acento, serifa itálica em "esquina.", navegação numerada, sobretítulo espaçado, nenhuma foto): registradas para a decisão dos sócios.
- **Autorização de imagem** de cada barbeiro antes da sessão de fotos.

---

## 11. Lista de conferência do nicho

- [ ] A ação está na primeira tela do celular em toda largura, inclusive abaixo de 640 px.
- [ ] Cada serviço tem nome, o que compreende, duração e preço.
- [ ] Cada barbeiro tem retrato real, com autorização escrita guardada.
- [ ] O pedido de horário funciona sem script (vínculo com a instrução) e não grava nada.
- [ ] A janela de retorno usa as faixas da casa e o fuso de São Paulo, com a ressalva de estimativa.
- [ ] A peça 3D cumpre as cinco condições e tem reserva sem WebGL e sem script.
- [ ] Com movimento reduzido, a peça fica parada e nada acompanha a rolagem.
- [ ] O ambiente contínuo pausa pelo botão e fora da tela.
- [ ] Nenhuma rolagem com inércia.
- [ ] Nenhum superlativo sem prova; nenhum número de clientes sem contagem.
- [ ] Nenhum fato geográfico falso sobre o bairro.
- [ ] Um gesto do Spell UI como assinatura, no ponto de decisão.

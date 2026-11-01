# Nutrição · Essencial

> **Para que serve.** Tudo o que o site de uma nutricionista de consultório precisa, do briefing à entrega: a norma do conselho, as três páginas, o módulo de Agenda, a direção de arte de partida, o texto e a conferência. Vale para a profissional que atende sozinha, presencialmente ou por vídeo.
>
> **Estado.** Ordem comercial (2º) e plano de referência (Essencial): RATIFICADO (decidido em 07.10.2026; ratificado em 08.10.2026). Norma: o Código de Ética do Nutricionista (CFN 599/2018) conferido no texto do CFN [V]; o código novo (CFN 856/2026) lido em fonte secundária [FU]; a leitura do preço diverge [DIV] e espera advogado. Direção de arte: RATIFICADO.
>
> **Leia com.** `README.md` (o quadro comum); `../03-planos.md`, seção 3; `../14-funcionalidades/05-agenda.md`; `../17-conformidade-e-normas.md`.
>
> **Implementação de referência.** A Nutrição Icaraí, no repositório do Atlas: `web/app/demos/nutricao/` (três páginas: A consulta, Valores, Consultório), o conteúdo em `web/conteudo/demos/nutricao.ts`.
>
> **Atualizado em:** 08.10.2026.

---

## 1. Ficha

| Campo | Valor |
|---|---|
| **Ordem comercial** | **2º de 12.** Razão de 29.08.2026: "regulação verificada; muitas profissionais em Icaraí". Conferida em 07.10.2026: volume 3, facilidade 5, ticket 3, atrito 3 — 5º com os pesos escritos (3,60), 3º com os pesos "agora" (3,80). A facilidade 5 vem do **piloto**: a primeira cliente prevista é nutricionista da rede pessoal de um sócio (contexto de nichos do Atlas, seção 5) |
| **Plano de referência** | **Essencial** [E]: consultório individual, um serviço principal, uma decisora; o conselho limita o conteúdo (nada de resultado nem depoimento) |
| **Módulos** | **Agenda** (a dor registrada em 15.08); **Presença só com o perfil**, sem pedir avaliação (seção 3) |
| **Norma** | CFN 599/2018, arts. 21 e 54 a 63 [V]; CFN 856/2026, a partir de 23.01.2027 [FU]; LGPD, arts. 5º, II, e 11 [V] |
| **Preço no site** | Informado com sobriedade, numa página própria, nunca como chamariz (art. 57) [DIV] |
| **Volume em Niterói** | CNAE 86.50-0 (profissionais de saúde exceto médicos e dentistas — inclui nutrição, psicologia, fisioterapia, fonoaudiologia): 775 unidades em 2022, 1.055 em 2023, **1.428 em 2024** (+84% em dois anos); 2.794 pessoas ocupadas (IBGE/CEMPRE, sem MEI) [V]. O CRN-4 tem "mais de 32 mil nutricionistas do Rio de Janeiro e Espírito Santo" (CFN, 25.08.2025) [FU] |
| **Público** | Quem decide é a própria nutricionista. Quem visita: adulto que quer mudar a alimentação sem dieta restritiva, muitas vezes indicado por alguém; compara credencial, método, formato e preço |
| **Site de exemplo** | **Nutrição Icaraí** · Maria da Silva, CRN4 00000 [ex]: três páginas em Next.js, "folha impressa" (Fraunces e Newsreader, grão de papel, nota de rodapé para a norma, colofão) |

---

## 2. O cliente e a dor

**Quem decide e quanto paga.** A profissional. Essencial: R$ 900 de criação e R$ 190 por mês; Agenda, +R$ 400 e +R$ 80 por mês (ata v3.0, IV.2). A cliente-piloto segue as **cinco travas** de cliente de rede pessoal: preço de tabela ou Condição de Fundação, nunca zero; contrato de uma página; cláusula de estudo de caso assinada no início; uma conta receptora; teto de três clientes vindos de rede pessoal (contexto de nichos, seção 5).

**O que o visitante procura:**
1. Quem é a profissional, e o número do CRN.
2. Como é a primeira consulta: duração, o que se avalia, o que se recebe depois.
3. O método: plano com trocas, não lista de proibições.
4. Presencial ou por vídeo; onde fica o consultório.
5. Quanto custa, e com que frequência se volta.

**A dor registrada** (documento comercial de 15.08.2026, no repositório do Atlas): "paciente marca por WhatsApp, sem confirmação nem histórico". O site do Essencial organiza o pedido (mensagem pronta); a confirmação e o histórico são o **módulo Agenda**.

**A tarefa do site no Essencial — ser encontrada e chamada.** Numa tela de celular: quem é, o que faz, como é a consulta, onde e quando, e a ação de pedir horário.

---

## 3. Normas

**Construir pela norma mais rígida já publicada.** O CFN 856/2026 (DOU de 28.04.2026, com a vacância prorrogada por 180 dias, até 23.01.2027, por uma "Resolução CFN 156, de 20.07.2026", segundo o LEIA-ME do demo de setembro — numeração a conferir [NV]) [FU] endurece o código de 2018. Um site dura anos: ele nasce dentro do código novo.

| Tema | Regra | Fonte | Evidência |
|---|---|---|---|
| **Identificação** | Profissão, nome e número de inscrição no CRN | CFN 599/2018, art. 21 | [V] |
| **No site** | CRN no cabeçalho (também no celular), na capa e no rodapé | Política do Atlas; demo de setembro | DECIDIDO |
| **Promessa de resultado** | Vedado "alegar exclusividade ou garantia dos resultados"; vedada mensagem "enganosa ou sensacionalista" | CFN 599/2018, art. 56 | [V] |
| **Orientação divulgada** | Ao divulgar orientação para um grupo, informar que "os resultados podem não ocorrer da mesma forma para todos" | CFN 599/2018, art. 55, parágrafo único | [V] |
| **Imagem corporal** | Vedada "mesmo com autorização concedida por escrito", de si ou de terceiros, atribuindo resultado | CFN 599/2018, art. 58 | [V] |
| **Antes e depois, exames, composição corporal, gráficos, imagem de IA** | Vedados mesmo com consentimento | CFN 856/2026 | [FU] |
| **Depoimento de paciente** | Vedado | CFN 856/2026 | [FU]. No código de 2018 não há artigo próprio; o art. 56 já alcança o depoimento que promete resultado |
| **Preço** | Vedado "utilizar o valor de seus honorários, promoções e sorteios [...] como forma de publicidade e propaganda" | CFN 599/2018, art. 57 | [V] texto. **[DIV]** sobre o site: o LEIA-ME de setembro leu "preço permitido, sem lógica promocional"; o artigo veda usar o valor **como propaganda**. Até o advogado: o valor fica na página Valores, igual para todos, sem destaque, sem "a partir de", sem pacote, sem desconto |
| **Marcas** | Vedado indicar ou associar a imagem a marcas de alimento, suplemento, utensílio, laboratório | CFN 599/2018, arts. 60 e 63 | [V] |
| **Venda casada** | Vedado condicionar a consulta à venda de produto | CFN 599/2018, art. 62 | [V] |
| **Calculadora de IMC ou de calorias** | Fora: é avaliação individual sem consulta | LEIA-ME de setembro | [FU] |
| **Dado de saúde** | "Dado referente à saúde" é dado pessoal sensível; tratá-lo exige consentimento específico e destacado | LGPD, arts. 5º, II, e 11 | [V] |
| **Imagem de pessoa** | A da profissional, com autorização escrita; **nunca de paciente** | Código Civil, art. 20 [V]; `../02-briefing.md` | DECIDIDO |
| **Atendimento por vídeo** | Permitido pela prática do ramo; a resolução vigente do CFN sobre teleconsulta não foi lida | — | [NV] |

**Para o advogado:** a leitura do art. 57 sobre o preço publicado; o texto integral da CFN 856/2026 e da resolução que adiou a vigência; a teleconsulta.

---

## 4. Estrutura de páginas

### 4.1 · No Essencial [E] (até três páginas)

| Página | Objetivo | Seções, na ordem | Obrigatório |
|---|---|---|---|
| **A consulta** (início) | Ser entendida em cinco segundos e chamar | Capa (o nome, a frase do método, "Nutrição clínica · bairro, Niterói", o CRN, a ação de pedir horário); o sumário da consulta em números (duração, prazo do plano por escrito, retorno sugerido, "listas de proibições: 0"); o método, da consulta ao hábito; a nota sobre o site (o que ele não tem e por quê); a chamada | CRN visível no celular; a ação até 60% da primeira tela |
| **Valores** | Responder "quanto custa e como funciona" antes do contato | Os valores (primeira consulta, retorno), iguais para todos, com a duração; o que cada um compreende; as perguntas frequentes (o plano, o retorno, o formato por vídeo, o cancelamento) | Valor sem moldura promocional (art. 57) |
| **Consultório** | Levar até a porta, ou até a chamada de vídeo | Endereço com o mapa do bairro em vetor e o vínculo para o mapa externo; horário dia a dia; formato presencial e por vídeo; WhatsApp; prazo de resposta; CRN | Prazo de resposta publicado |

**Implementação de referência:** as três páginas da Nutrição Icaraí. O sumário em números do exemplo: "60 min" (primeira consulta), "2 dias úteis" (plano por escrito, em PDF, com as substituições), "30 dias" (retorno sugerido, sem prazo mínimo nem pacote), "0" (listas de proibições: o plano prevê trocas).

### 4.2 · Se a cliente contratar outro plano

| Plano | O que muda |
|---|---|
| **Profissional** [P] | Até seis páginas: Início, A consulta (com o preparo), Valores, O consultório e a profissional (galeria: o consultório, a profissional, alimentos reais), a funcionalidade do ofício e o Contato. Formulário só com nome, contato, formato e período — **nunca o motivo clínico**. A funcionalidade do ofício, a escolher com a cliente: "a primeira consulta em três passos, com o preparo" (catálogo de `../14-funcionalidades/README.md`) ou a **biblioteca filtrável** do demo de setembro (rotina, substituição, leitura de rótulo, dúvida comum; conteúdo informativo, sem prescrição) |
| **Completo** [C] | As duas funcionalidades acima; uma página por tipo de atendimento (primeira consulta, retorno, acompanhamento); conteúdo editorial informativo (art. 55: com a ressalva de que o resultado varia); a revisão trimestral. Sem peça 3D: o assunto não pede |

**No briefing, bloqueante neste nicho:** em todo plano, a primeira consulta e o retorno (o valor, a duração e o que acontece em cada um) e o intervalo sugerido para o retorno; o que a paciente recebe depois (o plano por escrito, em quanto tempo e com as substituições); o método, da consulta ao hábito; o formato (presencial, por vídeo ou os dois); e a regra de cancelamento. No Profissional e no Completo [P][C], o preparo da primeira consulta (o que levar). Só no Completo [C] — ou já no Profissional, se for a funcionalidade escolhida —, o conteúdo da biblioteca filtrável, informativo e sem prescrição: os temas (rotina, substituição, leitura de rótulo, dúvida comum) e as notas de cada um. Sem isso, a página da consulta e a de valores não se escrevem.

---

## 5. Funcionalidades

### 5.1 · No Essencial: o pedido de horário por mensagem

Não é funcionalidade sob medida (o Essencial não tem): é o vínculo do WhatsApp com mensagem pronta e fixa — no exemplo, "Agendar pelo WhatsApp", com "Olá. Gostaria de agendar uma consulta." A página diz o que informar na conversa (primeira consulta ou retorno, presencial ou vídeo, o período). A mensagem sai do aparelho; nada é gravado; funciona sem script. O montador com escolhas (tipo, formato, dia, faixa de horário), do demo de setembro, é funcionalidade do Profissional. Especificação em `../14-funcionalidades/01-base-de-todo-site.md`.

### 5.2 · O módulo Agenda (a dor de 15.08)

- **O que resolve:** a confirmação e o histórico que o WhatsApp não dá.
- **Dados mínimos:** nome, telefone, tipo de consulta, formato, horário. **Nunca** motivo clínico, peso, medida, exame (LGPD, art. 11).
- **Aviso de privacidade** com a finalidade e o prazo de guarda; servidor próprio.
- Especificação em `../14-funcionalidades/05-agenda.md`.

### 5.3 · O módulo Presença

Só o perfil no Google (nome, endereço, horário, fotos do consultório). **Não se pede avaliação**: avaliação pública de paciente é depoimento (CFN 856/2026 [FU]). Especificação em `../14-funcionalidades/06-presenca.md`.

---

## 6. Direção de arte (ponto de partida · RATIFICADO)

### 6.1 · Materiais e vocabulário

O plano impresso que a paciente leva para casa, a feira, a cozinha de verdade, o caderno de substituições. O vocabulário é o da consulta: história alimentar, rotina, horário, troca, rótulo, retorno.

### 6.2 · Fotografia

- **O que fotografar:** o consultório; a profissional (autorização escrita); alimentos reais, da feira e da despensa; a mesa de atendimento; a fachada do prédio.
- **Nunca:** paciente, corpo, prato de "resultado", fita métrica, balança em close, embalagem de marca.
- **No Essencial:** as fotos da cliente pelo protocolo do celular, no mínimo três por categoria (`../08-imagem-e-fotografia.md`). Em setembro, o demo tinha zero imagens, contra 29 a 175 das referências.

### 6.3 · Tipografia

- **Postura:** **exibição serena** (razão ≥ 4 na capa: peso leve, entrelinha aberta, poucas palavras, muito ar; `../05-tipografia.md`, seção 6.3). Até 08.10.2026, à noite, contenção (≤ 2), que deixou o título do exemplo de odontologia em 35 px. O exemplo em Next.js, com o título de cartaz em Fraunces, já estava acima disso (`../05-tipografia.md`, seção 2.5).
- **Famílias candidatas** (OFL 1.1 [V]; `README.md`, seção 2):

| Papel | Família | Por quê |
|---|---|---|
| Uma só, nos dois papéis | **Literata** | Serifa de leitura longa, com eixo de tamanho óptico (7 a 72): a mesma família faz o título contido e o texto |
| Alternativa: títulos | **Young Serif** | Serifa macia e encorpada, um peso só: o calor sem o itálico de cartaz |
| Alternativa: texto | **Source Serif 4** | Serifa de texto com tamanho óptico, sóbria |

- **Evitar:** Fraunces (lista de escolhas por omissão) e serifa itálica de grande corpo no título (`../05-tipografia.md`, seção 2.3) — as duas marcas do exemplo.

### 6.4 · Cor

- **Partida:** fundo branco de papel (não creme); a tinta num verde de folha escuro; **um** acento tirado das fotos da cliente (a cor de um alimento real: beterraba, abóbora, folha), com o contraste medido.
- **Evitar o agrupamento** "fundo creme, serifa de alto contraste e acento terracota": um dos três visuais em que o design gerado se agrupa em 2026, e o do exemplo (palha, tinta verde, damasco queimado) está nele (`../04-direcao-de-arte.md`, seção 5).

### 6.5 · Forma

Cantos arredondados (preferência do usuário, RATIFICADO): pílula no botão, raio no cartão. Nada de filetes de jornal: o "jornal de filetes finos e raio zero" é agrupamento de IA, e a avaliação de 07.10 o achou no exemplo ("broadsheet hairlines").

### 6.6 · O gesto

- **Do Spell UI no Essencial:** o **marca-texto**, uma vez, numa palavra-chave do método que **não** esteja no título (no exemplo: "publicados", na entrada; "hábito", quando entra na tela). Destacar palavra do título é a marca de IA mais comum (`../11-anti-ia.md`).
- **Movimento do Essencial:** a entrada da capa uma vez, a revelação uma vez, a transição entre páginas (`../09-movimento.md`). Nada contínuo.

### 6.7 · O que não fazer

| Não | Por quê |
|---|---|
| Creme, serifa de alto contraste e terracota | Agrupamento de IA de 2026 |
| Serifa itálica no título | Marca `italic-serif-display`; está no exemplo |
| Ícone de maçã, balança, fita métrica, prato dividido | Clichê do ramo; e o prato "ideal" sugere prescrição |
| Calculadora de IMC | Vedada pela leitura de setembro [FU]; avaliação sem consulta |
| Foto de banco de "alimentação saudável" | Banco de imagens é vedado; e a foto de banco promete um corpo |
| Selo "resultado garantido", contador de quilos | CFN 599/2018, art. 56 |

---

## 7. Texto

**Registro.** Impessoal e acolhedor pela precisão: o calor vem da especificidade, nunca da informalidade (`README.md`, seção 3.10).

**O que dizer:**
- a duração de cada consulta e o que acontece nela;
- o que a paciente recebe (o plano por escrito, em quanto tempo, com as substituições);
- o retorno sugerido, sem prazo mínimo nem pacote;
- o formato (presencial, vídeo) e o endereço;
- o CRN, por extenso na primeira menção ("Conselho Regional de Nutricionistas da 4ª Região");
- que o resultado varia de pessoa para pessoa, onde houver orientação (art. 55).

**O que é vedado ou arriscado dizer:**

| Evite | Por quê |
|---|---|
| "Emagreça", "perca X kg", "em 30 dias", "resultado garantido" | Garantia de resultado (art. 56); a pesquisa de setembro achou 4 frases de emagrecimento na More Nutrition — copiar seria infração |
| "Detox", "dieta milagrosa", "segredo" | Sensacionalismo (art. 56) |
| "A partir de R$", "promoção", "pacote com desconto", "primeira consulta grátis" | O valor como propaganda (art. 57) |
| Depoimento ("mudou a minha vida") | CFN 856/2026 [FU] |
| Nome de suplemento ou de marca | Arts. 60 e 63 |
| "CFN 680/2021" como norma de publicidade | O demo de setembro a citou sem conferir. Não se cita antes de lida na fonte primária (contexto de nichos do Atlas, quadro de correções de 30.09); o que ela trata é A CONFIRMAR [NV] |

**Exemplos no registro certo:**
- "Comer bem. Sem se tornar outra pessoa." (título do exemplo)
- "Três combinações equivalentes, conforme o que houver em casa."
- "Plano por escrito, em PDF, com as substituições — 2 dias úteis."
- "Retorno sugerido, sem prazo mínimo nem pacote — 30 dias."
- "O horário é confirmado por mensagem. Esta página não coleta nem armazena dado algum."

---

## 8. Referências para estudar

| Referência | Endereço | Sob que norma opera | O que aprender | O que não copiar |
|---|---|---|---|---|
| MORE Nutrition (SOTD, 03.11.2025, nota 7,39) | https://more-nutrition.webflow.io/ (medido) | Estrangeira; loja de suplemento | Fotografia de produto em série (175 imagens), tipografia condensada própria | Linguagem de emagrecimento, venda de suplemento, as palavras que a animação cola no `h1` ("MatchameetsProtein") |
| Institute of Health (menção honrosa, 05.02.2026) | https://www.awwwards.com/sites/institute-of-health | Estrangeira; educação em medicina funcional e nutrição, em Webflow, GSAP e WebGL | Branco e quase-preto | O WebGL, o GSAP e as páginas guiadas pela rolagem (*scroll-driven*) como motor da página |
| Vibrant Wellness (SOTD, 20.02.2026; estúdio Noomo) | https://www.awwwards.com/sites/vibrant-wellness | Estrangeira; diagnóstico de saúde, com navegação 3D pelo corpo | Uma interação do ofício (o "gut zoomer", em Three.js) | O corpo em 3D: imagem corporal é vedada aqui |
| Institut Nutrition (setembro) | Endereço não registrado na análise | Estrangeira; instituição de pesquisa | Sobriedade | — |
| Nutritics (setembro) | Endereço não registrado na análise | Estrangeira; programa B2B | — | O `h1` "Home" |

**Lacuna:** nenhum par verdadeiro em setembro (nenhuma nutricionista individual). Antes do primeiro cliente, achar uma referência de nutricionista brasileira de consultório e registrá-la aqui (`../12-inspiracao-e-referencias.md`).

---

## 9. O que a pesquisa de setembro mediu

Análise de setembro de 2026 (`nichos/analises/atlas--analise-nutricao.md`, no repositório do Atlas):

| Site | Pedidos | Peso | Telas | Imagens | `h1` | Modelo de negócio |
|---|---|---|---|---|---|---|
| More Nutrition | 97 | 25,2 MB | 15,9 | 175 | 112 px | loja de suplemento |
| Institut Nutrition | 76 | 2,0 MB | 2,6 | 29 | 40 px | instituição de pesquisa |
| Nutritics | 120 | 1,6 MB | 10,0 | 38 | 32 px ("Home") | programa B2B |
| **Demo do Atlas** | **4** | **0,052 MB** | 10,8 | **0** | 84 px | consultório individual |

- **Zero pares:** nenhuma referência era consultório.
- **Linguagem de emagrecimento:** 0 no demo, 4 na More — **manter em zero**.
- **CRN visível:** 5 ocorrências — manter.
- **Escala:** 84 px, dentro da faixa de 32 a 112 px — a primeira rodada em que o demo não ficou abaixo.
- **Fotografia:** 0 contra 29 a 175 — o briefing passou a exigir foto do consultório e da profissional, sem paciente.

---

## 10. Riscos e pendências

- **Preço e art. 57** [DIV]: até o advogado, valor sóbrio só na página Valores.
- **CFN 856/2026** lido em fonte secundária [FU]; ler o texto integral antes do primeiro cliente.
- **Teleconsulta:** resolução do CFN não lida [NV].
- **Cliente-piloto da rede pessoal:** as cinco travas valem; o estudo de caso exige autorização assinada no início.
- **Marcas de IA do exemplo** (creme com serifa e terracota, Fraunces em itálico no título, filetes de jornal): registradas para a decisão dos sócios; não repetir num cliente.
- **Nenhuma referência brasileira** de consultório individual.

---

## 11. Lista de conferência do nicho

- [ ] O CRN aparece no cabeçalho do celular, na capa e no rodapé, com o nome completo e a palavra "nutricionista".
- [ ] Nenhuma promessa de resultado, nenhum prazo de "resultado", nenhum número de quilos.
- [ ] Nenhuma imagem corporal, de paciente, de exame ou de gráfico de evolução.
- [ ] Nenhum depoimento; o perfil no Google não pede avaliação.
- [ ] O valor está só na página Valores, igual para todos, sem "a partir de", desconto ou pacote.
- [ ] Nenhuma marca de alimento, suplemento ou laboratório.
- [ ] Nenhuma calculadora de IMC ou de calorias.
- [ ] A Agenda, se contratada, não pede motivo clínico, peso nem medida.
- [ ] Onde há orientação, a ressalva de que o resultado varia de pessoa para pessoa.
- [ ] O marca-texto está fora do título e acontece uma vez.
- [ ] Nada de creme com serifa itálica e terracota (avaliação anti-IA).
- [ ] Exibição serena na capa (razão ≥ 4); os efeitos da identidade; o teste da vitrine.

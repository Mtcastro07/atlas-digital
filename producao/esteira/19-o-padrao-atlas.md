# 19 · O padrão Atlas: o acabamento de todo site

> **Para que serve.** O que faz um site do Atlas parecer premiado, e como se constrói isso em todo plano: o mundo da marca, as cenas, a cor, a interface, a assinatura, a unicidade entre os sites, o que o plano restringe e o método de construção. Traz o diagnóstico medido de seis sites e os vícios que tiraram da faixa premium os dois sites de exemplo de 09.10.2026.
>
> **Decisão.** DECIDIDO em 09.10.2026, a partir dos pedidos do usuário:
> - "nossos clientes querem sites tão trabalhados como o Atlas, independente do plano, apenas restringindo algumas coisas para manter a hierarquia, mas ainda assim, ter nosso toque de qualidade";
> - "faça um estudo profundo sobre design também, uso de cores, interfaces e derivados";
> - "estou sentindo uma repetição de efeitos entre páginas, e partes da UI... precisamos tornar cada site mais único, como aconteceu com os 3 sites".
>
> Vale também a decisão de Gabriel Ribeiro Ota Yida (CEO): "o tamanho do site não importa, e sim só seu design" (`15-desempenho.md`, seção 2).
>
> **Leia com.**
> - `00-principios.md`, seção 9: o piso do acabamento;
> - `04-direcao-de-arte.md`, `05-tipografia.md`, `06-cor-forma-e-superficie.md`, `07-composicao.md`;
> - `09-movimento.md`, seções 4, 11 e 12;
> - `11-anti-ia.md`, seções 5.10 e 6;
> - `../qualidade/11-design-e-anti-ia.md`, seção 9: a unicidade medida;
> - `20-repeticao-dentro-do-site.md`: nenhum efeito nem molde em série dentro do site, com a contagem que o prova e o estudo de 14 a 16.10.2026.
>
> **O código para estudar:**
> - `../referencias/atlas/`: o site do próprio Atlas, com o CSS das técnicas;
> - `../referencias/sites-de-exemplo/`: a barbearia, o depósito e a nutrição.

---

## 1. O que o cliente compra

**Regra.** Todo site de marca, de qualquer plano e de qualquer nicho, sai no nível de acabamento das referências do Atlas:
- o próprio site do Atlas;
- a nutrição, no Essencial;
- o depósito, no Profissional;
- a barbearia, no Completo.

O plano restringe poucas coisas (seção 9), e o "toque Atlas" é de todos.

**A referência ensina o nível, nunca a forma.** Cada site tem o seu mundo, a sua cor e a sua interface. O que se repete entre os sites é o método, não o resultado (seção 7).

**Objetivo.** O Atlas vende "um produto entregue muito acima do padrão" (contexto comercial, §1). O cliente compara o site dele com o que o Atlas mostra na vitrine; se o site dele sai abaixo da vitrine, o Atlas vendeu um modelo.

**Como conferir.** O teste da vitrine, na porta de cada passe da construção (seção 8.6).

---

## 2. O diagnóstico de 09.10.2026

**O que se mediu.** Seis sites, nas capturas da página inicial inteira a 1440 px, com o movimento normal:
- **a cor, linha a linha, em OKLab:** a parte escura (L < 0,4) e a clara (L > 0,85); as viradas de valor, isto é, as trocas entre escuro e claro que duram 120 px ou mais; e a área com cor (croma acima de 0,04);
- **a razão do título**, pela régua;
- **o código**, lido por dois agentes sem o histórico da construção.

| Site | Plano | Razão do título da capa | Escuro · claro | Viradas de valor | Área com cor | A assinatura | A página inicial |
|---|---|---|---|---|---|---|---|
| **Atlas** | — | 4,7 no teto (80 px sobre 17) | 54% · 42% | **7** | **55%** (o azul-marinho como campo) | A esfera e o globo: na capa, no logotipo, em O Atlas, na faixa e no rodapé | Sete cenas que alternam o tom e o tipo de peça: o título sozinho, os dados que se movem, a pilha, a ferramenta, o cartão único, a grade, a atmosfera |
| **Barbearia** | [C] | 8,5 | **100%** · 0% | 0 | 3% (o latão) | As fichas de latão em WebGL, atrás de todas as seções e páginas, que trocam de metal, de forma e de lado | A capa (112 vh) e três cenas de 125 vh, uma ideia por tela; a informação densa fica nas páginas internas |
| **Nutrição** | [E] | 8,0 | 0% · 93% | 0 | 0,5% | A folha impressa em todo componente: o cabeçalho de jornal, o sumário com numerais romanos e números de cartaz, a capitular, a nota de rodapé, o colofão | Cada seção é um dispositivo editorial diferente |
| **Depósito** | [P] | 7,0 | 47% · 20% | 2 | 7,4% | A ficha técnica: o papel de projeto, o talão, o estado da loja ao vivo | O escuro e o papel se alternam |
| **Odontologia** (09.10) | [C] | ~4,9 (86 px em peso 300) | 0% · **97%** | **0** | **0,1%** | A placa de cerâmica em WebGL, só na capa e nas páginas de tratamento | Seis seções densas, empilhadas: nenhuma tem uma tela para si |
| **Restaurante** (09.10) | [P] | ~6,5 (113 px) | 0% · 89% | 0 | 0,5% | A lousa, só na capa | O mesmo esqueleto da odontologia, com 31% do CSS igual ao dela |

**O que os números dizem:**
1. **O efeito, sozinho, não faz o premium.** A odontologia tem WebGL próprio, o halo do refletor que segue o cursor, a cena ligada à rolagem e a inclinação dos cartões. Mesmo assim, fica abaixo da barbearia, porque o resto da página é um documento claro e empilhado.
2. **Há três caminhos para o premium, e os sites novos ficaram entre eles.**
   - **O Atlas** é o campo de cor.
   - **A barbearia** é a cena imersiva.
   - **A nutrição** é a folha clara extrema: tipografia de cartaz, textura e o mundo da folha em todo componente.

   A odontologia e o restaurante são claros e quase sem cor (0,1% e 0,5% de área com cor), mas sem a escala nem o mundo da nutrição (seção 5).
3. **A escala cai depois da capa.** Os títulos das seções medem de 47 a 53 px, contra 56 a 112 px na barbearia.
4. **A assinatura fica presa à capa.** A ficha da barbearia e a esfera do Atlas atravessam a página; a lousa e a cerâmica, não. No celular, a cerâmica sai da primeira tela.
5. **A interface é a da base, repintada:**
   - a pílula escura;
   - o vínculo sublinhado;
   - três placas iguais;
   - a fila de cartões;
   - os passos 1, 2 e 3;
   - a grade 2 × 2 de "o que não se faz aqui";
   - o mapa com o horário;
   - a chamada em cartão;
   - o rodapé em três colunas.
6. **Houve clone e repetição.**
   - **Entre os sites:** o restaurante foi clonado da odontologia: componentes renomeados, a biblioteca de horário da clínica importada e a mesma escala. Os dois repetiram o rodapé com o nome em escala de cartaz, que a barbearia e o depósito já tinham, o que o transforma em cromo de modelo.
   - **Dentro de cada site:** a mesma entrada de título e a mesma revelação em todas as páginas e seções (M1).

**As causas de construção:**
1. **A ordem da página estava prescrita, e a construção mandava "adaptar as de fábrica".** A ordem vinha das seções "na ordem" de cada nicho e de `07-composicao.md`. O acabamento entrou como camada de superfície sobre o esqueleto da base.
2. **A página chapada se propagou por cópia.** Ela foi da referência do teste do zero para a odontologia, e da odontologia para o restaurante.
3. **O kit pedia para frear e para enriquecer ao mesmo tempo.**
   - **Os freios:**
     - "uma só ousadia";
     - um gesto de marca;
     - uma cena de rolagem por página;
     - um catálogo anti-IA que marca a luz, o vidro e a faixa que o próprio Atlas usa.
   - **O contrapeso:** o piso das sete camadas.

   Na dúvida, os agentes cortaram o gesto ousado.
4. **A hierarquia tirava do Profissional o que o Atlas tem:** o ambiente, a inclinação e o vidro, até 09.10.2026.
5. **A porta que pegaria isso ficou aberta.** O teste da vitrine ficou "pendente" nos dois sites, e o restaurante foi comparado com o depósito, não com o Atlas.
6. **Quem construiu também avaliou.** O mesmo agente fez o site e julgou as marcas de IA; um olhar de fora teria visto o creme, o kit de cartões e o esqueleto da base.

**Fontes.** As capturas e a medição de cor desta sessão (a ferramenta `ferramentas/medir-cor.mjs`); o inventário do acabamento do Atlas e da barbearia e o diagnóstico da construção dos dois sites, feitos por agentes sem o histórico, em 09.10.2026 [FU].

---

## 3. O mundo da marca, não a pele

**Regra.** Todo site declara o seu **conceito numa frase**, o mundo de onde tudo sai (a folha impressa, a ficha técnica, o latão e o couro, o bronze e o navy), e **traduz cada componente da página para esse mundo**. A fonte e a cor da marca aplicadas sobre os componentes genéricos são a pele, não o mundo. A tradução fica na tabela "O mundo da marca" do `identidade.md`.

**As referências:**

| Componente | O genérico | A nutrição (a folha impressa) | A barbearia (o latão e o couro) | O depósito (a ficha técnica) | O Atlas (o bronze e o navy) |
|---|---|---|---|---|---|
| Cabeçalho | Nome, vínculos, pílula | O cabeçalho de jornal, centrado, com filetes duplos | A barra de vidro escuro, os capítulos com o ponto de latão | A barra do balcão, com o estado ao vivo ("aberto agora · pedido até 15h sai hoje · faltam 3h16") e a faixa de sinalização | O vidro líquido que troca de tinta conforme o fundo |
| A ação | Pílula escura | Pílula de tinta laranja, discreta | O botão de latão com as letras que rolam e o ímã | O botão chanfrado, no laranja de sinalização | A pílula de bronze, com o brilho e a faixa de luz |
| Os passos | 1 · 2 · 3 | O sumário com numerais romanos e notas na margem | Os capítulos | A linha do metro quadrado ao caminhão, com os marcos em quadrado | As caixas empilhadas que recuam |
| Os números | Número com legenda | "60 MIN", "30 DIAS" em escala de cartaz, com a unidade em versalete | O preço e o ano em latão | A ficha da casa, pendurada, com o código de barras (F-01 a F-04) | Os números de bronze que contam |
| O aviso da norma | Grade de texto | A nota de rodapé com o número sobrescrito | — | — | — |
| A passagem de página | "Ver mais" | "Continua em // Valores →" | A ficha que vira como moeda | O balcão, página por página (o índice de 01 a 05) | A transição de página com o cabeçalho ancorado |
| O rodapé | Três colunas | O colofão ("composto em Fraunces e Newsreader, sobre papel de cor palha") | O nome em escala de cartaz e o selo que gira | O nome em escala de cartaz e a ficha de contato em monoespaçada, depois da faixa laranja | O globo |

**Como fazer.**
1. **Liste os componentes** da página inicial e das páginas internas (a tabela do `identidade.md`).
2. **Para cada um, pergunte:** "como isto existe no mundo da marca?". A resposta é específica e passa no teste do desconhecido (`04-direcao-de-arte.md`, passo 8). "Um cartão com sombra" não é resposta; "a ficha de anamnese com o campo pautado" é.
3. **Não force:** o que não tem tradução fica sóbrio e bem feito (o formulário, o texto legal). O mundo está nos componentes que o visitante vê e lembra.

**Objetivo.** A diferença entre a nutrição e o restaurante não está na cor (os dois são claros e quase sem cor), mas no mundo: na nutrição, cada peça é da folha impressa; no restaurante, só a lousa da capa é do restaurante.

**Como conferir: o teste da troca de pele.** As capturas com a pele neutra: a fonte do sistema, o texto escuro e o fundo branco, por `node ferramentas/fotografar.mjs --sem-pele`. Se o que sobra é a página da base, o site tinha pele, e não mundo.

---

## 4. A página em cenas (o roteiro de cenas)

**Regra.** A página inicial é uma **sequência de cenas**, e não um documento empilhado:
1. **Uma ideia por cena,** com a tela para si: na mesa, a cena ocupa de 80 a 125% da altura da tela (a barbearia: a capa com 112 vh, as cenas com 125 vh).
2. **A informação densa sai da página inicial.** A tabela inteira, a lista de tratamentos, o cardápio e o horário completo vão para as páginas internas, ou para uma cena-índice só, como os capítulos da barbearia. A ordem do que se informa continua a de `07-composicao.md`, seção 7 (o quê, onde, quando, quanto, contato): o que muda é que cada informação vira cena.
3. **Duas cenas seguidas mudam pelo menos duas de quatro coisas:**
   - o valor do fundo;
   - a composição: o alinhamento, as colunas, a sangria;
   - a escala do evento tipográfico;
   - a peça: o tipo de imagem ou objeto.

   O Atlas alterna o tom a cada seção e muda a peça (o título sozinho, os dados, a pilha, a ferramenta, o cartão, a grade, a atmosfera). A barbearia mantém o tom e troca o metal, a forma e o lado da ficha.
4. **Toda cena tem um evento tipográfico.** O título da seção fica em escala de exibição: na mesa, pelo menos três vezes o corpo (o Atlas, de 32 a 56 px; a barbearia, de 56 a 112 px). A escala não cai depois da capa.
5. **Pelo menos uma cena de sangria total** além da capa: a imagem, o campo de cor ou o objeto de ponta a ponta.
6. **De cinco a nove cenas** na página inicial; no celular, no máximo 16 telas (a régua avisa).
7. **A capa mostra o objeto mais característico do negócio** (o lugar, o produto, o gesto, ou a imagem construída quando não há foto), em sangria total, e o título fica sobre ele ou o atravessa, em vez de ocupar uma coluna ao lado. A capa em duas colunas, com o texto à esquerda e o cartão à direita, é o esqueleto da base.
8. **O preço e o serviço em lista tipográfica,** com os algarismos tabulares, como os preços da barbearia CRISP em três listas; o cartão só quando cada item tem foto própria. A grade de cartões iguais é a marca L3.

**Como fazer.** O roteiro de cenas do `identidade.md`: para cada cena, a tarefa, o esboço em ASCII (na mesa e no celular), o fundo, o evento tipográfico, a imagem, o efeito da identidade e o movimento. Leia o roteiro como uma tira de quadrinhos: se dois quadros seguidos são iguais, um deles muda.

**Objetivo.** Os dois sites de 09.10.2026 tinham seis seções densas, com a mesma composição (o título à esquerda e o cartão à direita), o mesmo fundo e a mesma escala. A barbearia, com metade do texto na página inicial, parece maior e mais cara: uma ideia por tela, cada uma com a sua peça.

**Como conferir.** O roteiro aprovado com a direção de arte, antes do código, e a tira das capturas de cada cena no teste da vitrine.

### 4.1 · O que os premiados de negócio físico fazem (2026)

Nove sites premiados no Awwwards entre junho e outubro de 2026, lidos pelo CSS e pelo HTML publicados, em 09.10.2026 [FU]:

| Site | Ramo, prêmio | A cor | A interface | A composição |
|---|---|---|---|---|
| Tengile Malamala | Hospedagem; Site do Dia, 03.10 | Creme e oliva; o oliva é o fundo do rodapé, a cortina entre páginas e o estado ativo | 76 regras de `:focus-visible` | Vídeo, manifesto, hospedagens, história desde 1927, conservação, comunidade, a viagem |
| White Desert | Expedições; Site do Dia, 11.09 | Navy e cogumelo; o laranja só no que é interativo | Vidro de 15 px; 27 regras de hover sob `(hover: hover) and (pointer: fine)` | Capa com névoa, cinco roteiros com preço, acampamentos, dados de voo, seis passos |
| Vander | Hotel; Menção Honrosa, 29.08 | Três fundos: o claro, o escuro e o marrom | Uma família; título em 6vw, entrelinha 1; raio 0 | Imagens alternadas, o hotel, o restaurante, os eventos, o terraço, a galeria |
| Tandjung Sari | Hotel; Menção Honrosa, 05.08 | Vermelho, creme e areia | Caslon e Optima; raio 0 | A página na horizontal; a história dos anos 1960; a reserva |
| Studenterkilden | Restaurante; Menção Honrosa, 11.08 | Seções claras e cinza-escuras; o grão do papel a 9% no rodapé | Uma família; h1 de 40 a 100 px, entrelinha 0,9 | Os ingredientes da estação, a casa de 1854, três ofertas com foto, a história |
| Ballena | Alta cozinha; Menção Honrosa, 17.06 | O mar e a terra: creme, terracota, sálvia e azul | Cabeçalho de vidro de 25 px | "Shaped by sea", o encontro, os sabores, o restaurante na natureza, os eventos |
| Burrito Madre | Comida rápida; Menção Honrosa, 09.07 | Pêssego e vermelho em campo; o texto em marrom, não em preto | Duas famílias | O produto, oito categorias com foto, blocos só de imagem, a história |
| CRISP | Barbearia; Menção Honrosa, 11.08 | Preto e bege | Título de 92 px, entrelinha 1; menu em `mix-blend-mode: exclusion` | Foto de sangria, a história, as fotos, as unidades, os preços em lista, o título partido por uma foto |
| South Cliff Dental | Odontologia; Menção Honrosa, 16.06 | Ouro e ardósia | Cena 3D que se arrasta; o único com `prefers-reduced-motion` no CSS | Título com selos, tratamentos, emergência, números, equipe, unidades |

**O que se repete neles:**
- **A abertura:** seis dos nove abrem com a foto ou o vídeo do lugar ou do ofício, na largura toda.
- **O título como imagem:** de 80 a 100 px na mesa, com entrelinha de 0,9 a 1 e espaçamento de −0,02 a −0,05 em; no celular, com piso de 40 a 56 px, por `clamp`.
- **As famílias:** uma ou duas.
- **O ritmo:** a inversão do tema entre as seções.
- **A assinatura que atravessa a página:** a cortina oliva entre as páginas, o cabeçalho que se inverte, o grão e a faixa sazonal.
- **A disposição:** nenhuma capa em duas colunas com um cartão ao lado.

**O que não se copia deles:** as omissões. Premiado não é gabarito de acessibilidade. Nas notas de desenvolvimento conferidas, a acessibilidade é a menor nota; só um dos oito CSS declara o movimento reduzido; dois pintam a seleção de texto com contraste de 2,55 e 3,69:1. Leve deles a direção; o foco visível, o movimento reduzido e o contraste vêm desta esteira.

### 4.2 · O nível Apple: poucas coisas muito grandes

> **DECIDIDO** para o site do Atlas em 27.10.2026, pelo aprovador, Matheus Castro Oliveira de Luna Garcia ("nivel apple"), e levado a todo site novo em 02.11.2026 ("mudancas que valem para novos projetos"). É composição, e não recurso: **vale em todo plano**. As faixas abaixo foram medidas em 27.10.2026 nas páginas da Apple, da Stripe, da Linear, da Raycast e da GitHub, a 1440 e a 390 px (origem em `99-rastreabilidade.md`, seção 10). São referência de ofício, e não teto; quem as lê é a avaliação e o crítico de fora.

**A regra em uma frase.** Poucas coisas muito grandes, e o tempo de uma coisa ocupa a tela. Muitas peças pequenas e bem-feitas, em caixas estreitas e com o corpo comum, não somam o nível: na crítica do primeiro site feito para isso, as peças aprovaram e o conjunto não.

| # | Regra | A faixa de referência |
|---|---|---|
| 1 | **Uma coisa por tela,** nas páginas que vendem | Por tela, na mediana: até 4 blocos de texto, até 60 palavras e 1 título com 2× o corpo ou mais |
| 2 | **A cena toma a tela.** Além da capa, pelo menos uma cena por página que ocupa a tela inteira, fora da caixa de conteúdo. E um objeto em 70% das telas que vendem | O objeto tem 5% da tela ou mais; é foto, desenho, CSS 3D, canvas ou o que o plano der (seção 9). Uma peça grande no lugar de três pequenas |
| 3 | **A escala da letra** não cai depois da capa | Título de cena: de 4 a 5,6× o corpo na mesa e de 2,5 a 3,4× no celular. Título de seção: de 2,3 a 2,8× |
| 4 | **O lide é uma peça** | De 19 a 21 px na mesa e de 17 a 19 px no celular; entrelinha de 1,35 a 1,45; até 48 caracteres por linha (`05-tipografia.md`, seção 8) |
| 5 | **A medida curta** | O piso da faixa de `05-tipografia.md`, seção 8: perto de 45 caracteres por linha nas colunas |
| 6 | **O ar não cresce:** o que falta é objeto, e não espaço (marca L10) | *Padding* de seção de 160 a 288 px na mesa e de 96 a 176 px no celular; os vazios de 48 px ou mais com mediana de 80 a 130 px; o vazio em até 25% da altura da página |
| 7 | **O campo quieto:** um campo liso por cena, sem degradê entre cenas; a cor saturada mora no objeto e na ação, dentro da estratégia de cor do `identidade.md` (seção 5) | Nas referências, de 0% a 13% dos pixels com cor saturada |
| 8 | **O número como objeto:** só medida com fonte, com o rótulo acima e a nota; uma ocorrência por página | De 2,3 a 4,7× o corpo; no máximo dois lado a lado, ou três numa comparação (a fileira de 3 ou 4 é a marca L2) |
| 9 | **Nenhum trecho parece documento** (marca P4). A página seca vira tabela de ofício, ou uma cena. O esqueleto "rótulo e parágrafo" sobre fundo claro, em página após página, volta a ser molde (`20-repeticao-dentro-do-site.md`) | O rótulo em até ¼ da largura; o valor de 35 a 60 caracteres por linha; um filete entre grupos; "—" para a ausência; um desenho por grupo. Numa tabela de comparação, o cabeçalho preso na mesa; no celular, duas colunas com seletor e o cabeçalho em até 20% da tela |
| 10 | **O detalhe em todo controle** | Transição de 0,1 a 0,32 s em cor e opacidade; foco visível; a pausa para o que se move |
| 11 | **Zero terceiros e zero cookies** | Nada a acrescentar: é o que o kit já exige, e nenhuma referência cumpre |

**O que muda nas regras do estudo ao entrar no kit:**
- **A família:** as referências usam uma família com dois cortes. No site, valem as famílias de `05-tipografia.md`.
- **A medida:** as referências medem de 35 a 45 caracteres nas colunas e até 85 no lide centrado. Vale a faixa de `05-tipografia.md`, seção 8, que é a da porta: de 45 a 75, nunca acima de 80, e o lide até 48.
- **A cor:** as faixas da regra 7 vêm de referências sem campo de cor. No campo de cor (seção 5), a cor da marca é o campo, com a sangria total e o degradê com direção dentro da cena; da regra 7, ficam um campo por cena e nenhum degradê entre cenas.
- **A troca de página:** o estudo pedia View Transitions, que reprovam os 60 quadros. Vale a entrada por CSS (`13-tecnologia-e-estrutura.md`, seção 3.7, regra 4).
- **A revelação ligada à rolagem:** só por CSS (`animation-timeline` dentro de `@supports`), só `transform` e `opacity`, uma por página, parada com movimento reduzido, e só no plano que a tem (`09-movimento.md`, seção 5, item 7).

**O que não se copia da Apple:** o vídeo de produto, onde não há produto para filmar; a família própria de 1 MB; o movimento por script em centenas de elementos, que reprova no celular 4×; o texto em degradê (marca C5); o aforismo em dois tempos em série (marca X1); e a seção que prende a rolagem (marca M8).

**Objetivo.** O premium se lê pela escala e pela contenção. O que tira do nível é a página cheia de coisas médias: de 9 a 15 blocos por tela, onde a mediana das referências é de 2 a 3,5.

**Como conferir.**
- **A crítica:** o crítico de fora (seção 8.5) responde por página "qual é a coisa grande de cada tela" e aponta o trecho que parece documento e a capa que continua o molde (marca L1).
- **A contagem:** nas capturas a 1440 e a 390 px, os blocos e as palavras por tela, as mídias de 5% da tela ou mais, e a razão do título (a régua, bloco 6, já avisa a capa abaixo de 4×). O roteiro de medida do estudo não está no kit: PENDENTE (`99-rastreabilidade.md`, seção 10).

**Rosto de pessoa real não recebe filtro.** Duotônico, normalização e correção de luz mudam o tom da pele, e quase sempre mudam mais no rosto mais escuro (no site do Atlas, +33% em nível de cinza; medido e desfeito em 02.11.2026). Para unificar retratos, só o recorte, e o cinza do rosto medido antes e depois. O que une de verdade é uma foto nova, com a mesma luz e o mesmo fundo.

### 4.3 · O código como tema de luxo, quando o nicho admitir

> **DECIDIDO** para o site do Atlas em 27.10.2026, pelo aprovador ("algumas tematicas de programacao codigo"), com o melhor acerto de direção da crítica de 01.11.2026. Para sites novos, **é opção da direção de arte, decidida no `identidade.md`, e nunca obrigação:** entra quando o nicho admite (um ofício técnico, de precisão ou de medida) e sai onde o tom do ofício ou o conselho não o querem. Vale em todo plano: é HTML e 0 byte.

**Regra.**
1. **Um trecho verdadeiro por página,** do próprio site, com o arquivo e a linha na origem. Código inventado, de prova ou decorativo não entra. Se o valor pode mudar, o trecho se lê do arquivo no build e, se o arquivo faltar, o build para.
2. **A frase para o leigo ao lado,** e conferida: ela não promete o que o trecho não faz.
3. **Um recipiente único** no site, o mesmo componente: sem barra de janela, sem número de linha e sem cursor. O código é conteúdo de um objeto, nunca textura (marca T10).
4. **A mono do sistema, 0 byte:** `ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Menlo, monospace`, em `--font-mono`, sem `@font-face`. Não é família nova (`05-tipografia.md`, seção 2, item 4).
5. **A medida:** 15/24 px na mesa e 14/22 px no celular, sem espaçamento e sem ligaduras, quebrando (`white-space: pre-wrap`), para não sair da tela com a letra a 200%. As tintas vêm da paleta: a da máquina no nome e na pontuação, o acento no valor do negócio. O contraste se mede como o de qualquer texto.
6. **A dose:** uma linha nas páginas de compra (de 1,1% a 2,5% do texto visível) e até duas nas que explicam (de 3,7% a 8,1%). A régua da fita: coberto o código, a página continua inteira. Nada de código na primeira tela, salvo dentro da figura.
7. **O número sobre o próprio site (o colofão) é medido ou não entra.** Vem de um relatório real, copiado sem edição para o repositório (`conteudo/medidas/`) e lido no build, com a data da medida. Sem o arquivo ou sem a medida da página, a frase sai sem o número, e o build segue. Com o arquivo corrompido, o build para: é melhor não publicar que publicar número errado. A frase é para leigo e fica curta: o colofão longo vira jargão no rodapé.

**Objetivo.** Nas marcas premium medidas, a mono só aparece onde o conteúdo é código; as que a gastam em rótulos em caixa-alta caem nas marcas T3 e T10. O que nenhuma referência estrangeira mostra a um brasileiro é o código do próprio site, em português, que se confere ali.

**Como conferir.** A captura; a contagem dos caracteres em mono contra o texto visível; cada frase contra o trecho; e, no colofão, o número da página contra o relatório.

---

## 5. A cor: três estratégias de valor

**Regra.** O site escolhe **uma** estratégia de cor e de valor, declarada no `identidade.md`, e a leva até o fim:

| Estratégia | Como é | A referência, medida | O que ela exige |
|---|---|---|---|
| **O campo de cor** | A cor da marca ocupa grandes áreas, como campo, e as cenas viram de valor | O Atlas: 55% da área com cor, 54% escura, 7 viradas | A cor da marca com profundidade (a luz, o degradê com direção, o grão); o acento só na ação e na luz |
| **A cena imersiva** | Um valor dominante, escuro ou saturado, em 80% ou mais da página, iluminado pela matéria | A barbearia: 100% escura; a cor (3%) é a do latão, que brilha | A luz da matéria (o metal, o reflexo, o halo, a vinheta, o grão); o claro só no texto e na ação |
| **A folha clara extrema** | O claro dominante, com a tipografia em escala de cartaz e a textura do material | A nutrição: 93% clara, razão de 8 no título | O título com razão de 7 ou mais; a textura (o grão do papel); o mundo da marca em todo componente; um bloco de cor forte em pelo menos uma cena |

**O meio-termo é a página sem cor:** claro, com a tipografia moderada, sem textura e sem campo de cor. A odontologia de 09.10.2026 mediu 0,1% de área com cor; o restaurante, 0,5%; nenhum dos dois tem uma virada de valor. A nutrição mede quase o mesmo (0,5%, sem virada) e é premium: o que a separa deles é a tipografia de cartaz, a textura e o mundo da folha em todo componente. É a marca P2 de `11-anti-ia.md`, seção 5.10.

**As regras da cor, em todo site:**
- **A paleta sai da matéria e do lugar,** não do ramo: o latão, a cerâmica, o azulejo, a lousa, a fachada. A clínica não é azul por ser clínica (C13).
- **Os tons em OKLCH, por função** (`06-cor-forma-e-superficie.md`): o fundo, a tinta, a ação, a luz, a superfície funda. As rampas variam a luminosidade (L) com o mesmo matiz, para a profundidade sair da mesma família.
- **Os fundos de cenas vizinhas se distinguem:** a diferença de L entre duas cenas seguidas é de pelo menos 0,04 em OKLab. A odontologia usava três fundos a cerca de 3 pontos de L* um do outro, que se leem como um só.
- **O acento é escasso e tem função:** a ação, a luz da marca, o estado ao vivo. O acento em toda parte apaga a hierarquia.
- **A cor como luz:** o degradê com direção (de onde vem a luz da cena), o halo com queda, o reflexo no material, o grão que tira a cara de vetor. Degradê sem direção é a lavagem decorativa (C9).
- **O contraste medido:** 4,5:1 no texto e 3:1 no texto grande e nos controles (`16-acessibilidade.md`); a régua mede.

### 5.1 · A cor, pelo que os premiados e os sistemas de design fazem

O estudo de 09.10.2026: nove premiados, lidos pelo CSS publicado, mais os sistemas de cor do Linear, do Stripe, do Material, do Radix, do Geist e da Apple. As fontes estão no fim deste documento.

1. **Duas ou três cores-mestras e um acento.**
   - **As cores-mestras:** um neutro claro, a cor da marca e uma tinta escura com o matiz da marca, e não `#111`, que é a marca C7. O Burrito Madre escreve o texto em marrom, não em preto.
   - **No total,** de quatro a seis cores nomeadas, cada uma com a origem registrada no material ou na foto do negócio [V].
   - **Nos premiados,** a paleta declarada ao Awwwards tem duas cores, um neutro e a da marca, e o CSS confirma [V].
2. **A cor da marca em campo,** com pelo menos uma área de sangria total por página: uma cena, o rodapé ou a cortina de transição. O oliva do Tengile é o fundo do rodapé, a cortina entre as páginas e o estado ativo [FU].
3. **Os tokens por cena.** Cada cena redefine `--fundo`, `--tinta`, `--borda` e `--acento`, e o texto se inverte sozinho sobre o fundo escuro, como fazem o Studenterkilden e a Relume [V]. No campo de cor, o valor se inverte a cada duas ou três cenas.
4. **O acento só no que é interativo:** a ação principal, o estado ativo, o foco e a seleção; nunca no texto corrido nem em peça inerte. No White Desert, o laranja marca só o que se toca; a Apple pede não usar a mesma cor para coisas diferentes [V].
5. **As rampas em OKLCH,** de 10 a 12 degraus, cada degrau com um papel fixo: o fundo, o componente, a borda, o sólido e o texto, como no Radix e no Geist [V].
   - **O hover** é o mesmo tom, com o L de 0,05 a 0,10 abaixo, pela cor relativa (`oklch(from var(--acao) calc(l - 0.08) c h)`).
   - **O modo escuro** troca o valor das variáveis, e não o componente.
   - **Numa rampa perceptual, o contraste se lê pelo número do degrau.** No Stripe, cinco degraus de distância garantem texto pequeno; no Material, uma diferença de tom de 50 garante 4,5:1 [V].
6. **O contraste.**
   - **A porta é o WCAG 2:** 4,5:1 no texto; 3:1 no texto de 24 px ou mais e nos controles. A régua mede.
   - **O APCA é a conferência, não a porta:** Lc 75 ou mais no corpo, 60 nos rótulos, 45 nos títulos. O algoritmo do WCAG 3 ainda não foi decidido (rascunho de 10.09.2026) [V].
   - **O meio-tom quente** (a terracota sobre creme, cerca de 3,5:1) só em texto de 24 px ou mais, ou como campo com texto claro e grande. Medido nos premiados: a terracota do Ballena sobre creme dá 3,60:1, e o marrom do Vander, 3,69:1.
7. **A luz só com motivo.**
   - **O degradê:** tem direção (de onde vem a luz) e é interpolado `in oklch`, o que evita a zona cinza do RGB [FU].
   - **O grão:** `feTurbulence` a 5 a 10%, em `multiply` ou `soft-light` [FU].
   - **A sombra é luz:** de duas a cinco camadas, tingidas com o matiz do fundo, e nunca preto translúcido, que dessatura [V].
   - **O vidro:** de 10 a 25 px de desfoque, só sobre camada real (o cabeçalho, o menu, o diálogo) [V].
   - **O que é marca de IA:** o halo radial sem fonte de luz e o vidro sem camada por trás (C6, C10). A versão da marca passa nas cinco perguntas de `11-anti-ia.md`, seção 6.
8. **O trio "de IA"** (o creme, a serifa de alto contraste e a terracota) só quando a origem material está declarada. O Tandjung Sari e o Ballena foram premiados com essa família de cores, e nos dois a cor vem do lugar [V]. Na dúvida, o teste do pedido parecido (`11-anti-ia.md`, passo 3).


**Como conferir.** `node ferramentas/medir-cor.mjs material/capturas/<página>-1440.png`: a parte escura, a clara, as viradas e a área com cor. O resultado se compara com a estratégia declarada.

---

## 6. A interface no mundo da marca

**Regra.** Os componentes da interface (o botão, o vínculo, o cabeçalho, o menu, o cartão, o formulário, os números, os ícones) são desenhados para a marca, no mundo dela (seção 3), com todos os estados. A interface da base é andaime, como a composição (seção 8.1).

**O que o Atlas e a barbearia fazem** (inventário de 09.10.2026; o código em `../referencias/`):
- **O botão:**
  - **no Atlas,** a pílula de 48 px em bronze, com o texto em navy. No hover, o bronze clareia, com o brilho e a faixa de luz que cruza em 900 ms, só na entrada. Ao pressionar, `scale(.97)`; desabilitado, opacidade de 0,45 e o cursor `not-allowed`;
  - **na barbearia,** o latão de 56 px, com as letras que rolam e o ímã que anda até 7 px, e o reflexo em `skewX(−18°)` que cruza no hover.
- **O vínculo:** o sublinhado que acende no hover, com a seta que avança 3 px (no Atlas); o sublinhado de latão sempre visível (na barbearia).
- **O cabeçalho:** o vidro líquido do Atlas, que lê a cor de 13 pontos sob ele e troca a tinta, e recolhe ao rolar para baixo; a barra de vidro escuro da barbearia, com o ponto de latão sob o capítulo atual.
- **Os detalhes:**
  - a seleção de texto na cor da marca;
  - o foco de 2 px, afastado 3 px;
  - os algarismos tabulares;
  - o `text-wrap: balance`;
  - o toque sem o realce azul do sistema;
  - o esqueleto que pulsa no que carrega tarde.
- **A profundidade:** as sombras longas (no Atlas, `0 26px 70px` a 42%; na barbearia, `0 40px 80px` a 90%), o vidro e a refração, as caixas que recuam, o 3D por trás do vidro.

### 6.1 · A interface, pelo que os premiados e os guias fazem

1. **O alvo:** 44 × 44 px no toque e 24 × 24 px em qualquer ponteiro (WCAG 2.5.8; Apple; Vercel) [V].
2. **Os seis estados de todo botão:**
   - **o repouso;**
   - **o hover:** só sob `(hover: hover) and (pointer: fine)` [V];
   - **o foco:** por contorno, e não só pela cor, por `:focus-visible`, nunca encoberto pelo cabeçalho preso [V];
   - **o pressionado:** em até 100 ms, com `scale(0.97)`;
   - **o desabilitado:** esmaecido, mas legível e focável, com `aria-disabled`;
   - **o carregando:** o rótulo fica, e o indicador aparece depois de 150 a 300 ms e dura pelo menos 300 a 500 ms, para não piscar [V].
3. **O vínculo:** o sublinhado com `text-underline-offset` de cerca de 0,3 em e a espessura em `em`, para acompanhar o zoom [FU].
4. **O cabeçalho.**
   - **O que recolhe:** volta quando o visitante sobe alguns pixels e entra em 300 a 400 ms (NN/g) [FU].
   - **O vidro:** só sobre o fundo de contraste garantido, como o do Atlas, que lê a cor sob ele; senão, opaco.
   - **A troca de cor conforme a cena:** pela variante de cena dos tokens ou pelo modo de mistura (a CRISP usa `mix-blend-mode: exclusion`) [V].
5. **A navegação.**
   - **Na mesa, os vínculos à vista:** a navegação escondida foi usada em 27% dos casos, contra 48% da visível, e deixou as tarefas pelo menos 39% mais lentas (NN/g, 179 pessoas) [FU].
   - **No celular,** até quatro vínculos à vista; acima disso, o menu de tela cheia com `overscroll-behavior: contain`.
6. **O formulário:**
   - o rótulo fora do campo;
   - a fonte de 16 px ou mais;
   - `autocomplete`, `inputmode` e `enterkeyhint`;
   - o mínimo de campos (`14-funcionalidades/02-formulario.md`) [V].
7. **O raio por hierarquia, e concêntrico.**
   - **O raio interno** é igual ao externo menos o recuo [V].
   - **A pílula** fica no botão, e o raio é menor no conteúdo; nunca o mesmo raio para tudo.
   - **Nos premiados de hotelaria,** o raio vai de 0 a 12 px. A preferência da casa por cantos arredondados continua (`06-cor-forma-e-superficie.md`), dentro dessa hierarquia.
8. **A sombra e a borda:** de duas a cinco camadas tingidas, com o deslocamento vertical maior que o horizontal; a sombra em camadas não se anima, e a borda é semitransparente. Nunca o filete fino com a sombra larga (C12) [V].
9. **Os detalhes.**
   - **Os números:** algarismos tabulares nos preços e nos horários.
   - **A rolagem:** `scrollbar-gutter: stable`, que evita o salto quando a barra aparece.
   - **A seleção de texto:** na cor da marca, só com contraste de 4,5:1 ou mais; nos premiados, a seleção na cor do acento reprovou (2,55 e 3,69:1).
   - **Os ícones:** com o peso do texto ao lado; na Apple, cada peso dos símbolos corresponde a um peso da fonte [V].
10. **As microinterações:**
    - de 100 a 300 ms;
    - a saída mais curta que a entrada;
    - o ease-out exponencial, como `cubic-bezier(.16, 1, .3, 1)` no White Desert e no Ballena e `(.19, 1, .22, 1)` no Tengile;
    - a origem no gatilho;
    - a escala inicial de 0,9 ou mais, nunca 0;
    - a mola com `bounce` de 0 a 0,15;
    - nada animado na ação frequente nem na do teclado;
    - só `transform` e `opacity`, interrompível, e o movimento reduzido sempre [V].

    Os tokens de `09-movimento.md`, seções 2 e 3, já cumprem isso.


**Tudo o que se toca responde, e cada papel do seu jeito** (`09-movimento.md`, seção 13): a ação, o vínculo, o item de lista, a peça, a imagem e a navegação, com a resposta que sai da matéria da marca. No Completo, toda cena tem pelo menos uma coisa que responde à mão além das ações.

**O sistema se repete; o momento, não.**
- **O que se repete dentro do site,** porque é coerência: o botão, o vínculo, o cabeçalho, a transição.
- **O que não se repete de uma página para outra:** o momento de cada página. Cada abertura de página interna tem o dispositivo que sai do conteúdo dela: o cardápio que se desdobra, o mapa que se desenha, a ficha que vira. Uma entrada de título comum, discreta, pode ser do sistema, como a transição. Mas quando ela e a mesma revelação são o único movimento de todas as páginas e seções, é a marca M1, e o site parece uma página só, repetida.
- **O que não se repete dentro de uma página** (DECIDIDO em 14.10.2026, pedido do usuário: "parecendo que você está spamando os mesmos componentes"): o efeito e o molde. Nenhum efeito vai a toda seção, todo cartão, todo título ou toda ação, e nenhum molde abre e arruma todas as cenas; cada cena tem o seu momento. A regra e a contagem que a prova estão em `20-repeticao-dentro-do-site.md`.

**Objetivo.** A interface é o que o visitante toca. Quando ela é a da base repintada, o site inteiro parece modelo, por mais rica que seja a capa.

**Como conferir.**
- A tabela "O mundo da marca" do `identidade.md`, com cada componente traduzido.
- As capturas dos estados: o hover da ação, o foco, o menu aberto.
- A unicidade entre os sites (seção 7).

---

## 7. A unicidade: cada site com o seu mundo

**Regra.** Nenhum site copia de outro site do Atlas os componentes de identidade, o CSS de superfície, a escala, o vocabulário de classes ou as assinaturas:
- os sites de exemplo;
- o próprio Atlas;
- os clientes.

As referências se estudam pela técnica (como a luz anda, como a ficha vira) e se refazem para o mundo do site novo.

**O efeito pode repetir-se entre os sites** (DECIDIDO em 14.10.2026, `20-repeticao-dentro-do-site.md`, seção 1): a mesma mecânica, traduzida para a matéria de cada um. Esta seção veda a forma copiada; dentro de um site, o que se veda é a série.

**O que já se repetiu e não se repete mais:**
- **O rodapé com o nome em escala de cartaz.** A barbearia e o depósito já o têm, cada um no seu mundo (o selo que gira; a ficha em monoespaçada depois da faixa de sinalização). Repetido nos dois sites de 09.10.2026, virou cromo de modelo: nenhum site novo o usa.
- **A barra, o filete sob a aba, a chamada em placa e o trio "copiar, ver no mapa, como chegar"**, iguais na odontologia e no restaurante.
- **A escala tipográfica com os mesmos valores.**
- **A biblioteca de um site importada por outro** (o restaurante importava o horário da clínica).

**A impressão digital do código** (`npm run unicidade`; `../qualidade/11-design-e-anti-ia.md`, seção 9). A ferramenta mede quanto do CSS e dos componentes do site é igual ao de cada outro site, sem o que é de fábrica e com o prefixo das classes normalizado. Ela avisa a partir de 15% e reprova a partir de 30%. Calibração de 09.10.2026:
- **entre os três exemplos sem parentesco:** no máximo 11%;
- **o restaurante clonado da odontologia:** 31% do CSS e 19% dos componentes.

**Objetivo.** Na vitrine do Atlas, dois sites com a mesma interface provam que o Atlas vende modelo. Os três sites de exemplo de 01.10.2026 nasceram sem parentesco, a pedido do usuário ("deixe-os mais diferentes entre si"); os dois de 09.10.2026 nasceram um do outro.

**Como conferir.** `npm run unicidade` sem falha, na etapa 7 e antes de publicar, e o teste de unicidade das capas (`04-direcao-de-arte.md`, passo 9).

---

## 8. Como se constrói

### 8.1 · A base é andaime

**Regra.** Da base (`../base/`) ficam as **funções**:
- os componentes do horário, do endereço, do mapa e do WhatsApp;
- as páginas legais;
- os metadados, a régua e as ferramentas.

Nunca fica a **composição** nem a **interface**:
- a ordem das seções;
- a capa em duas colunas com o cartão à direita;
- o fundo claro único;
- a grade "o que não se faz aqui";
- o rodapé em três colunas;
- a pílula escura.

O conteúdo obrigatório (as ausências, o horário, o endereço) continua obrigatório; a forma dele sai do roteiro de cenas e do mundo da marca.

### 8.2 · O roteiro antes do código

**Regra.** Antes do primeiro componente, o `identidade.md` traz, aprovados com a direção de arte:
- **o mundo da marca:** o conceito numa frase e a tabela dos componentes;
- **a estratégia de cor;**
- **o roteiro de cenas** da página inicial;
- **o acabamento:** as sete camadas e os efeitos da identidade (`09-movimento.md`, seção 12).

O passe da mesa constrói cena por cena, pelo roteiro.

### 8.3 · As referências de código

**Regra.** Antes de construir um efeito, leia como as referências o fizeram (a mecânica, o desempenho, a acessibilidade) e refaça-o para o mundo do site novo. As técnicas e onde estão:

| Técnica | Onde estudar |
|---|---|
| A esfera da capa e os globos que giram | `../referencias/atlas/components/marca/esfera.tsx`, `components/ilhas/esfera-viva.tsx`, `components/ilhas/giro-do-globo.tsx` |
| O vidro líquido que troca de tinta e o cabeçalho que recolhe | `../referencias/atlas/components/ilhas/vidro-liquido.tsx`, `components/ilhas/cabecalho-retratil.tsx`, `app/vidro.css` |
| As caixas empilhadas que recuam | `../referencias/atlas/components/secoes/passos.tsx`, `components/ilhas/pilha-de-passos.tsx` |
| A chamada final: a cena, o grão e o reflexo | `../referencias/atlas/components/secoes/fim.tsx` |
| A faixa de luz e o brilho do botão | `../referencias/atlas/components/ui/button.tsx`, `app/vidro.css` |
| O orbe sob o cursor, a aresta de luz e o botão magnético | `../referencias/atlas/components/ilhas/luz-do-cursor.tsx`, `app/vidro.css` |
| O título que se compõe e as letras que rolam | `../referencias/atlas/components/secoes/capa.tsx`, `components/texto-rolante.tsx`, `app/movimento.css` |
| A faixa que corre, com as pontas apagadas | `../referencias/atlas/components/secoes/faixa.tsx` |
| O titânio do celular e a inclinação | `../referencias/atlas/components/aparelho/celular.tsx`, `components/ui/spell/tilt-card.tsx` |
| O palco 3D em WebGL (as fichas de latão) | `../referencias/sites-de-exemplo/components/ilhas/demos/palco-3d*` |
| As cenas ligadas à rolagem | `../referencias/sites-de-exemplo/components/ilhas/demos/cena-de-rolagem.tsx` |
| O selo que se desenha e gira; a faixa do poste; o latão | `../referencias/sites-de-exemplo/components/demos/barbearia/pecas.tsx`, `app/demos/barbearia/barbearia.css` |
| O grão do papel e a folha impressa | `../referencias/sites-de-exemplo/app/demos/nutricao/nutricao.css` |

**A mecânica se estuda; a forma não se copia** (seção 7). A ferramenta de unicidade compara também com `../referencias/`.

**As peças de terceiros** (desde 13.10.2026) estão no catálogo do kit (`../componentes/catalogo.md`), com a licença conferida para site vendido: dezenas de peças prontas por função, para trazer adaptadas ao mundo do site (`09-movimento.md`, seção 6.4). Valem as mesmas regras das referências:
- **a mecânica vem pronta, a forma sai da marca;**
- **a mesma peça,** adaptada do mesmo jeito em dois sites, conta na impressão digital do código.

### 8.4 · As rodadas de lapidação

**Regra.** Cada passe (a mesa, depois o celular) tem **no mínimo três rodadas de lapidação** depois de construído. Em cada rodada:
1. **As capturas** com o movimento normal (`node ferramentas/fotografar.mjs --movimento`), a página inteira e a primeira tela, mais o hover da ação.
2. **A vitrine ao lado:** a página inicial do Atlas e o exemplo do mesmo plano.
3. **O crítico de fora** (seção 8.5).
4. **As dez maiores distâncias,** ordenadas pelo peso, cada uma com a camada do piso e a seção deste documento.
5. **A correção,** e o registro da rodada em `registros/lapidacao.md`: o que mudou, com as capturas de antes e de depois.

**Objetivo.** O Atlas chegou ao nível dele em mais de dez rodadas de pedido do usuário, de 01 a 05.10.2026, entre elas a dos efeitos de identidade que tinham saído e voltaram ("coloque de volta"; as decisões do `CLAUDE.md` do repositório do Atlas). Um passe só entrega o rascunho do premium, não o premium.

### 8.5 · O crítico de fora

**Regra.** A avaliação do acabamento é de **um agente novo, sem o histórico da construção**: um subagente do Claude Code, com contexto limpo. Quem construiu não julga o próprio site sozinho. O crítico recebe:
- as capturas do site;
- as capturas da vitrine;
- este documento, `11-anti-ia.md` (seções 5 e 6) e o `identidade.md`;
- a contagem de cada efeito e de cada molde por página (`20-repeticao-dentro-do-site.md`, seção 3).

E responde, em ordem de peso:
1. Onde este site está abaixo da referência do plano dele? Em cada uma das sete camadas, o que falta?
2. O que é genérico: a pele em vez do mundo, a interface da base, as marcas de IA, a página chapada?
3. O que se repete dentro deste site: o mesmo efeito em série, o mesmo molde de seção ou de cena, o mesmo objeto, o mesmo bloco em duas páginas? E o que foi copiado, na forma, de outro site do Atlas?
4. O que um diretor de arte cortaria, e o que ele acrescentaria?

**O pedido, para copiar:**

```
Você é diretor de arte de um estúdio premiado e não participou desta construção. Compare as capturas do site em
<pasta> com as da vitrine em <pasta da vitrine> (o site do Atlas e o exemplo do plano <plano>). Leia
producao/esteira/19-o-padrao-atlas.md, producao/esteira/11-anti-ia.md (seções 5 e 6),
producao/esteira/20-repeticao-dentro-do-site.md (seções 2 e 3) e o identidade.md. Liste, em ordem de peso, as
distâncias entre este site e a vitrine: o que falta em cada uma das sete camadas do acabamento, o que é genérico ou
da base, o que se repete em série dentro do site (o mesmo efeito em toda seção, todo cartão, todo título ou toda
ação; o mesmo molde de seção ou de cena; o mesmo objeto; o mesmo bloco em duas páginas), com a contagem por página,
e o que foi copiado de outro site. Seja específico (a cena, o componente, o valor) e duro: o cliente paga pelo nível
da vitrine. Não elogie.
```

**Objetivo.** Os dois sites de 09.10.2026 passaram nas avaliações feitas por quem os construiu. O creme, o kit de cartões e o esqueleto da base estavam nas capturas, mas quem construiu não os via.

### 8.6 · O teste da vitrine (o protocolo)

**Regra.**
1. **As capturas:** a capa e duas páginas internas, a 1440 px e depois a 390 px, com o movimento normal.
2. **A vitrine:** lado a lado com a página inicial do Atlas e com o exemplo do mesmo plano (a nutrição, o depósito ou a barbearia).
3. **O veredito,** com o nome e a data: "na mesma faixa" ou "abaixo", e, se abaixo, as distâncias.
4. **Quem julga:** um sócio de desenvolvimento, e o crítico de fora antes dele.
5. **"Pendente" não abre a porta.** Sem o veredito, o passe não termina.

### 8.7 · O celular

A assinatura aparece na primeira tela do celular, na versão de toque (`09-movimento.md`, seção 11). A cerâmica da odontologia de 09.10.2026 saía da primeira tela abaixo de 1024 px, e o celular ficava só com o texto.

### 8.8 · A construção em partes, por contrato

**Regra.** Quando uma construção se divide entre agentes (um redesenho, várias páginas de uma vez), as etapas são separadas, e quem faz uma não faz a outra:
1. **O contrato antes do código.** Um documento só, com cada decisão ligada ao arquivo que a cumpre, o dono de cada parte, o que cada um pode tocar, os limites medidos e os testes. Ele passa por crítica antes de valer. Onde o contrato e a decisão divergem, vale a decisão, e a divergência se registra.
2. **Os patches por parte sobre uma árvore fixa.** Uma parte comum primeiro (o sistema); depois, cada parte numa cópia própria, a partir da mesma árvore, entregando um patch. Nenhum arquivo aparece em dois patches.
3. **A integração.** Um só junta tudo (`git apply --3way`, na ordem do contrato), apaga os órfãos, compila e roda a régua dos quadros no site montado, com a máquina sem outro Chrome. Cada corte de desempenho nasce de uma hipótese medida em A/B intercalado.
4. **A crítica,** sem consertar nada: as portas do `../qualidade/15-revisao-do-impeccable.md`.
5. **A conferência das decisões,** sem consertar nada: cada decisão do aprovador, contra o site servido.
6. **A revisão do código,** sem consertar nada: segue o código ligado ao patch, e confere o que usa o componente comum (as demos, onde houver), o deploy sem `.git` e os segredos.
7. **Os consertos,** reproduzidos antes de agir e medidos de novo. O que muda decisão ou mundo aprovado vai ao aprovador.

**Objetivo.** No primeiro redesenho feito assim (01.11.2026), a integração não teve conflito nenhum; e as três etapas separadas acharam o que ela não via: a contagem que passava sem as passivas se verem, o texto contra a fonte e o componente comum que quebrou as demos.

**Varia por.** Um site novo de um agente só segue o roteiro (`../01-roteiro-da-sessao.md`); este método entra quando há partes em paralelo.

**Como conferir.** O patch se aplica numa cópia limpa e dá a árvore que foi medida.

---

## 9. O que o plano restringe

**Regra.** O toque Atlas é de todo plano:
- **o mundo da marca;**
- **as cenas;**
- **a estratégia de cor;**
- **a tipografia de exibição;**
- **a matéria, a luz e a profundidade;**
- **a imagem construída;**
- **os efeitos da identidade;**
- **a assinatura da capa em movimento;**
- **a inclinação e o vidro;**
- **a entrada orquestrada;**
- **as transições;**
- **as passivas** (`09-movimento.md`, seção 14);
- **o nível Apple** (seção 4.2);
- **a interface no mundo da marca;**
- **o detalhe.**

O plano restringe só:

| O que o plano restringe | [E] | [P] | [C] |
|---|---|---|---|
| A assinatura da capa | Em SVG, CSS ou canvas 2D, em movimento | E o objeto em CSS 3D | E o objeto em WebGL |
| A cena ligada à rolagem | — | — | ✓ |
| A galeria de deslizar | — | ✓ | ✓ |
| O estado ao vivo e a resposta à ação | — | ✓ | ✓ |
| As funcionalidades do ofício | — | Uma | Duas |
| As interações de conteúdo (`09-movimento.md`, seção 13.2) | — | — | ✓ |
| As páginas | Até três | Até seis | Sem limite |
| A fotografia | A do cliente | A sessão guiada | A sessão ampliada e o vídeo |

O material de cada nicho (o azulejo, a louça, o latão, a cerâmica) é de todo plano (`nichos/README.md`). A tabela do movimento está em `09-movimento.md`, seção 4.

**Objetivo.** O cliente do Essencial compra um site pequeno com o acabamento do Atlas; o do Completo compra o site grande, que trabalha pelo negócio e se move com o visitante. A diferença se vê na vitrine, sem que o Essencial pareça inacabado.

---

## 10. Os vícios de 09 e de 14.10.2026 (não repetir)

| Vício | Onde apareceu | A regra |
|---|---|---|
| O esqueleto da base, repintado | Os dois sites | Seção 8.1 |
| A página inicial como documento empilhado | Os dois | Seção 4 |
| O claro sem cor, sem escala de cartaz e sem textura | Os dois | Seção 5 |
| A escala que cai depois da capa (h2 de 47 a 53 px) | Os dois | Seção 4, item 4 |
| A assinatura só na capa; fora da primeira tela no celular | Os dois | Seções 7 e 8.7 |
| A interface da base: a pílula, o sublinhado, as placas iguais, a fila de cartões | Os dois | Seção 6 |
| O clone de um site para o outro | O restaurante | Seção 7 |
| O rodapé com o nome em escala de cartaz, tirado da barbearia e do depósito | Os dois | Seção 7 |
| A mesma entrada e a mesma revelação em todas as páginas e seções | Os dois | Seção 6 |
| A curva que ultrapassa o destino (a lousa que "pendura", 1,3) | O restaurante | `09-movimento.md`, seção 3 |
| O material mais característico guardado para o Completo (o azulejo) | O restaurante | Seção 9 |
| A vitrine "pendente", ou feita contra o exemplo errado | Os dois | Seção 8.6 |
| Quem construiu também julgou | Os dois | Seção 8.5 |
| O mesmo efeito em série dentro do site (toda seção, todo cartão, todo título, toda ação); depois de corrigido, o mesmo molde de seção ou de cena | Os sete sites do Atlas, em 14.10.2026 | `20-repeticao-dentro-do-site.md` |
| Muitas peças boas e pequenas, e nenhuma cena que tome a tela | O site do Atlas, em 01.11.2026 | Seção 4.2 |
| As passivas contadas, mas fora da vista | O site do Atlas, em 01.11.2026 | `09-movimento.md`, seção 14 |

---

## 11. Lista de conferência

- [ ] O conceito numa frase e a tabela "O mundo da marca", com cada componente traduzido; o teste da troca de pele.
- [ ] A estratégia de cor declarada e medida (`medir-cor`); os fundos de cenas vizinhas com ΔL de 0,04 ou mais.
- [ ] O roteiro de cenas aprovado antes do código: uma ideia por cena; duas cenas seguidas mudam duas de quatro coisas; o evento tipográfico em toda cena; uma cena de sangria além da capa.
- [ ] A assinatura em três cenas ou mais e na primeira tela do celular.
- [ ] O nível Apple (seção 4.2): a coisa grande de cada tela; uma cena que toma a tela além da capa; nenhum trecho que pareça documento. Se o nicho admitir, o código da seção 4.3.
- [ ] As passivas, com a cobertura medida (`09-movimento.md`, seção 14).
- [ ] A interface no mundo da marca, com todos os estados; o vocabulário de interação, uma resposta por papel; no Completo, algo que responde à mão em toda cena; o momento de cada página, sem a mesma entrada em todas; nenhum efeito nem molde em série, com a contagem por página (`20-repeticao-dentro-do-site.md`).
- [ ] Três rodadas de lapidação em cada passe, com o crítico de fora e o registro.
- [ ] O teste da vitrine com o veredito, nunca "pendente".
- [ ] `npm run unicidade` sem falha.
- [ ] O plano: só as restrições da seção 9.

---

## Fontes citadas

- O inventário do acabamento do site do Atlas e da barbearia, e o diagnóstico da construção da odontologia e do restaurante de 09.10.2026, feitos por agentes sem o histórico, sobre o código do `web/` e da cópia de implantação [FU].
- A medição de cor e de valor das páginas iniciais (OKLab, a partir das capturas a 1440 px), 09.10.2026 [FU].
- A régua (`../qualidade/02-regua.md`): a razão do título, 08 e 09.10.2026.
- A ferramenta de unicidade (`../base/ferramentas/unicidade.mjs`), calibrada em 09.10.2026.
- O estudo de cor, interface e composição de 09.10.2026, feito por um agente sobre as fontes primárias e o CSS e o HTML publicados de nove premiados, sem a página renderizada:
  - **cor:**
    - Evil Martians, "OKLCH in CSS": https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl;
    - Linear, "How we redesigned the Linear UI": https://linear.app/now/how-we-redesigned-the-linear-ui;
    - Stripe, "Designing accessible color systems": https://stripe.com/blog/accessible-color-systems;
    - Radix Colors: https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale;
    - Vercel Geist: https://vercel.com/geist/colors;
    - APCA: https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell;
    - W3C, WCAG 3.0 (rascunho de 10.09.2026): https://www.w3.org/TR/wcag-3.0/;
    - Apple HIG, Color e Materials: https://developer.apple.com/design/human-interface-guidelines/color;
    - Josh W. Comeau, sombras e degradês: https://www.joshwcomeau.com/css/designing-shadows/ e https://www.joshwcomeau.com/css/make-beautiful-gradients/;
    - CSS-Tricks, "Grainy Gradients": https://css-tricks.com/grainy-gradients/;
    - Relume, esquemas de cor: https://resources.relume.io/resources/docs/understanding-color-schemes-with-relume;
    - Anthropic, skill `frontend-design`: https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md;
    - Impeccable: https://impeccable.style/slop;
  - **interface:**
    - Rauno Freiberg, "Invisible Details of Interaction Design": https://rauno.me/craft/interaction-design;
    - Emil Kowalski: https://emilkowal.ski/ui/7-practical-animation-tips;
    - Vercel, Web Interface Guidelines: https://vercel.com/design/guidelines;
    - NN/g:
      - duração da animação: https://www.nngroup.com/articles/animation-duration/;
      - estados do botão: https://www.nngroup.com/articles/button-states-communicate-interaction/;
      - cabeçalho preso: https://www.nngroup.com/articles/sticky-headers/;
      - menu escondido: https://www.nngroup.com/articles/hamburger-menus/;
    - W3C, alvo mínimo (2.5.8) e aparência do foco (2.4.13);
    - Cloud Four, raios concêntricos: https://cloudfour.com/thinks/the-math-behind-nesting-rounded-corners/;
    - Motion, mola: https://motion.dev/docs/spring;
  - **composição:**
    - NN/g, "Scrolling and Attention": https://www.nngroup.com/articles/scrolling-and-attention/;
    - Utopia, tipo fluido: https://utopia.fyi/blog/designing-with-fluid-type-scales/;
    - os nove premiados: https://www.awwwards.com/websites/restaurant-hotel/, com as páginas de cada um (Tengile Malamala, White Desert, Vander, Tandjung Sari, Studenterkilden, Ballena, Burrito Madre, CRISP e South Cliff Dental Group).

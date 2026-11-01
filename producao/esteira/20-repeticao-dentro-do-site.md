# 20 · A repetição dentro do site: nenhum efeito em série

> **Para que serve.** A regra de que, dentro de um site, nenhum componente ou efeito se aplica em série; a conferência que a prova, a contagem por página; e o estudo que a fundou, o passe de 14 a 16.10.2026 nos sete sites do Atlas (o próprio site e os seis de exemplo), com as contagens de antes e de depois, os vereditos dos críticos de fora e as lições. A segunda camada da regra, a repetição de composição, saiu do próprio estudo.
>
> **Decisão.** DECIDIDO em 14.10.2026, a pedido do usuário, Matheus Castro Oliveira de Luna Garcia (o sócio que aprova os sites), em três falas do mesmo dia:
> 1. "Você está repetindo efeitos entre os sites de forma muito explícita, tente diversificar ou não utilizar sempre os mesmos em todos os sites. Registre isso dentro do arquivo de produção."
> 2. Logo depois, retificando: "No caso, não tem problema em você usar os efeitos dentro dos sites, mas busque enriquecer também o site de nutrição, barbearia e material de construção. O que vejo seria que você está usando eles de forma repetitiva dentro dos sites, parecendo que você está spamando os mesmos componentes."
> 3. Depois do estudo: "registre esse estudo dentro do arquivo de produção."
>
> **Leia com.**
> - `09-movimento.md`, seções 1, 5, 6.1, 12 e 13;
> - `11-anti-ia.md`, as marcas M1, M2 e M7 e a seção 6;
> - `19-o-padrao-atlas.md`, seções 4, 6, 7 e 8.5;
> - `../qualidade/11-design-e-anti-ia.md`, seção 3, e `../qualidade/14-ciclo-de-qa.md`, seção 3: a contagem na porta.

---

## 1. A leitura adotada

- **Entre sites, repetir um efeito é permitido.** A inclinação, a faixa de luz, o marca-texto, o carimbo ou a revelação por máscara podem aparecer em dois sites do Atlas, cada um traduzido para a matéria do seu (`09-movimento.md`, seções 6.4 e 12). Continua vedada entre sites a cópia da forma: o componente de identidade, o CSS de superfície, a escala e a assinatura (`19-o-padrao-atlas.md`, seção 7).
- **Dentro de um site, o defeito é a série:** o mesmo componente ou efeito aplicado a toda seção, todo cartão, todo título ou toda ação. Toda seção entra igual, todo cartão inclina igual, todo bloco acende a mesma luz, todo título leva a mesma tarja, todo botão o mesmo brilho, cada elemento a mesma revelação. A página lê como componente "spamado": é a marca M1 (`11-anti-ia.md`, seção 5.5).
- **O kit já dizia isto, e não foi seguido:**
  - "Um momento orquestrado vale mais que efeitos espalhados. Esmaecer e subir em toda seção, e transição de hover em todo cartão, são o padrão genérico, que se lê como gerado" (`09-movimento.md`, seção 1);
  - "um gesto de marca, uma ou duas vezes por página" (`09-movimento.md`, seção 6.1; `19-o-padrao-atlas.md`);
  - a marca M1, "a mesma entrada em todas as seções" (`11-anti-ia.md`).

  O usuário já tinha pedido o mesmo em 09.10.2026: "estou sentindo uma repetição de efeitos entre páginas, e partes da UI" (`19-o-padrao-atlas.md`, cabeçalho). Por isso a regra ganha, agora, uma conferência com número (seção 3).

---

## 2. A regra

### 2.1 · A primeira camada: o efeito

**Regra.** Dentro de um site, nenhum componente ou efeito se aplica em série: em toda seção, todo cartão, todo título ou toda ação. Cada efeito vale onde é o momento certo:
1. **O gesto de marca:** uma ou duas vezes por página, no ponto de decisão (`09-movimento.md`, seção 6.1).
2. **Cada efeito da identidade, num lugar:** a cena ou a peça em que ele diz algo do conteúdo, como o rolo de tinta sobre a lista de preços, o pontilhado na carta de valores, a faixa de luz na ação de decisão. Fora desse lugar, a peça fica quieta e pronta no HTML.
3. **Cada página tem o seu momento, e cada cena, o seu.** O momento de uma cena é o que a faz ser lembrada: a entrada, a resposta à mão, a peça, a cor ou a composição. Ele não é o da cena vizinha, e todos saem da mesma matéria e da mesma luz (`09-movimento.md`, seção 12), o que os separa dos efeitos espalhados (M2). Momento por cena não é série; série é o mesmo efeito em todas.
4. **O efeito segue o papel e o momento, nunca a instância.** A mesma ação responde do mesmo jeito onde aparece: é o sistema. O efeito expressivo fica na instância que é o momento, como a ação de decisão, e as outras respondem com o sistema. Três botões iguais com três respostas diferentes não corrigem a série: viram a amostra de efeitos (M2).

**O que não é série** (o sistema, que se repete por coerência: `19-o-padrao-atlas.md`, seção 6):
- o botão, o vínculo, o cabeçalho, a navegação e a transição de página, cada um com a sua resposta sóbria;
- a resposta de cada papel (`09-movimento.md`, seção 13.1);
- a numeração de uma sequência real;
- a assinatura que atravessa as cenas, quando decidida, como a ficha da barbearia, que troca de metal, de forma e de lado de uma cena para outra.

**Objetivo.** O efeito igual em tudo é o que o gerador faz quando ninguém escolhe, e o visitante o reconhece em segundos ("parecendo que você está spamando os mesmos componentes"). Um efeito num lugar só mostra que alguém escolheu aquele lugar.

### 2.2 · A segunda camada: a composição

**Regra.** O mesmo vale para a composição. Dentro de um site, nada disto se repete em série:
- **o molde de seção:** o mesmo cabeçalho abrindo todo bloco, como o rótulo em versalete sobre o filete grosso ou o título centrado;
- **o molde de cena:** o título à esquerda e o objeto à direita na capa e nas aberturas, ou a mesma moldura do objeto em várias telas do celular;
- **o recipiente padrão:** a mesma grade de casas com código, o mesmo cartão arredondado em quase toda cena clara, o número de exibição com legenda em cena após cena;
- **o mesmo objeto várias vezes,** na mesma tela ou em quase toda cena;
- **o mesmo bloco em duas páginas,** ou colado a outro que repete os mesmos dados: a chamada final, a condição comercial, o endereço com o horário antes do rodapé que traz os dois.

Duas cenas seguidas já mudam duas de quatro coisas (`19-o-padrao-atlas.md`, seção 4, item 3). Esta camada estende a regra à página inteira e às páginas entre si.

**Objetivo.** Os sete críticos de fora do estudo, depois de tirada a série de movimento, acusaram a série de composição (seção 4.3). Sem os efeitos por cima, o molde de baixo fica à vista.

---

## 3. A conferência: contar

**Regra.** No passe da mesa e no passe do celular, conta-se, por página, a 1440 e a 390 px. A primeira contagem é o inventário, antes de corrigir; a segunda vai à porta de cada passe.
1. **Cada efeito:** quantos elementos o correm na carga, ao rolar, sob o ponteiro e no toque. O que aparece em mais de um bloco da mesma página, ou em todas as páginas, é série até prova em contrário: fica no lugar dele, ou o registro diz por que é sistema.
2. **Cada molde:** o cabeçalho de seção, o molde de cena e o recipiente, isto é, quantas cenas abrem e se arrumam do mesmo jeito; e os objetos repetidos na mesma tela.
3. **Os blocos repetidos entre páginas:** o mesmo bloco, o mesmo fato em número grande, a mesma chamada.

A contagem vai ao relatório de QA (`../qualidade/modelos/relatorio-de-qa.md`, seção 8) e ao `registros/lapidacao.md`, com o antes e o depois de cada correção.

**Como fazer.**
- **O inventário, antes de mudar:** uma tabela por site, efeito por efeito, com o que é, as ocorrências por página, onde ele fica (o lugar em que é o momento) e o que entra no lugar das outras ocorrências. É a forma que o estudo usou (seção 4.1).
- **Pelo código:** a classe ou o atributo de cada efeito, buscado página a página (por exemplo, `grep -rn "data-revela" app components`).
- **Pela página:** o que se anima na carga e numa rolagem lenta, pelos eventos `animationstart` e `transitionrun`. O hover e o toque se contam à mão, passando o ponteiro e tocando em cada papel. O script abaixo, com o site servido (`npm run estatico`), conta por página:

  ```js
  // ferramentas/contar-efeitos.mjs — node ferramentas/contar-efeitos.mjs <base> <largura> <caminho...>
  // Conta, por página, o que se anima na carga e numa rolagem lenta até o fim: cada animação pelo nome
  // e cada transição pela propriedade, com quantos elementos a correm. O hover e o toque se contam à parte.
  import { chromium } from "playwright";

  const [base, largura, ...caminhos] = process.argv.slice(2);
  const navegador = await chromium.launch({ channel: "chrome" });
  const pagina = await navegador.newPage({ viewport: { width: Number(largura), height: Number(largura) < 1024 ? 844 : 900 } });
  await pagina.addInitScript(() => {
    window.__efeitos = new Map();
    const anota = (chave, alvo) => {
      if (!window.__efeitos.has(chave)) window.__efeitos.set(chave, new Set());
      window.__efeitos.get(chave).add(alvo);
    };
    addEventListener("animationstart", (e) => anota(`animação ${e.animationName}`, e.target), true);
    addEventListener("transitionrun", (e) => anota(`transição ${e.propertyName}`, e.target), true);
  });
  for (const caminho of caminhos) {
    await pagina.goto(base + caminho, { waitUntil: "networkidle" });
    for (let y = 0; y < (await pagina.evaluate(() => document.documentElement.scrollHeight)); y += 300) {
      await pagina.evaluate((y) => scrollTo(0, y), y);
      await pagina.waitForTimeout(250);
    }
    const contagem = await pagina.evaluate(() => [...window.__efeitos].map(([chave, alvos]) => [chave, alvos.size]));
    console.log(`\n${caminho} · ${largura} px`);
    for (const [chave, n] of contagem.sort((a, b) => b[1] - a[1])) console.log(`${String(n).padStart(4)}  ${chave}`);
  }
  await navegador.close();
  ```

  Rodado em 16.10.2026 na nutrição de exemplo, a 1440 px, no servidor de desenvolvimento: no início, cada animação de carga aparece uma vez (a folha que pousa, os dois ramos, a luz, o marca-texto); em Valores, a escrita do recibo. Uma linha com a mesma animação em 20 elementos é a série que se procura.
- **Os moldes, a olho e com número:** a tira das capturas de cada cena (`19-o-padrao-atlas.md`, seção 4, "Como fazer"), lida em sequência e página por página. Conte quantas cenas abrem com o mesmo cabeçalho, quantas põem o conteúdo no mesmo recipiente, quantas aberturas repetem o mesmo esqueleto e quantos blocos aparecem iguais em duas páginas.

**Como conferir.**
- O relatório de QA traz a tabela da contagem, por página e nas duas larguras.
- O crítico de fora recebe a contagem e responde ao que se repete dentro do site (`19-o-padrao-atlas.md`, seção 8.5, pergunta 3).

**Varia por.** Nada. A regra vale em todo plano: o plano muda quantos efeitos o site tem, não quantas vezes cada um se repete.

---

## 4. O estudo de 14 a 16.10.2026

### 4.1 · O método

Um agente por site, nos sete sites: o site do Atlas (sete páginas) e os exemplos da barbearia [C], do depósito [P], da nutrição [E], da odontologia [C], do restaurante [P] e do pet shop [E].
1. **O inventário por página,** pelo código e pela página renderizada, a 1440 e a 390 px, com fotos tela a tela.
2. **A contagem de cada efeito,** por página, com scripts de censo na página e busca no código.
3. **O plano** (14.10): para cada efeito em série, onde ele fica, o que entra no lugar das outras ocorrências e o enriquecimento, isto é, o momento de cada cena.
4. **O cético do plano:** um agente novo revisou cada plano contra o kit, antes da aplicação.
5. **A aplicação,** com a contagem de antes e de depois e a conferência: a régua, os filmes quadro a quadro com a CPU 4×, o movimento reduzido e a página sem script.
6. **O crítico de fora novo:** um agente sem o histórico da construção, com as capturas, os filmes e os scripts de contagem dele, a 1440 e a 390 px (`19-o-padrao-atlas.md`, seção 8.5).
7. **A correção** de cada defeito do crítico, ou a discordância escrita, com a contagem de antes e de depois.

O ciclo do crítico e da correção correu duas vezes em cada site; a segunda crítica é de 15 e 16.10.2026.

### 4.2 · A contagem, site por site

"Antes" é o inventário de 14.10.2026 ou a contagem do crítico; "depois" é o estado final de 16.10.2026. As larguras e as páginas estão em cada registro (seção 7).

**O site do Atlas** (sete páginas):

| O que se repetia | Antes | Depois |
|---|---|---|
| A entrada igual das aberturas internas (elementos animados na mesa) | 30 (5 × 6 páginas) | 0; cada abertura com o seu momento, ou parada |
| A tarja numa palavra do título | 6 | 0 (saiu de /o-atlas na segunda correção; fica a onda no "24h") |
| O orbe e a aresta acesa | 17 | 4 |
| O cartão que sobe 3 px com sombra | 12 | 0 |
| O botão magnético | 5 | 0 |
| As letras que rolam | 8 | 0 |
| O brilho do selo "Recomendado" | 2 | 0 |
| A faixa de luz na carga (início, /planos, /duvidas, demais) | 4, 5, 3, 2 | 0, 1, 0, 0; a faixa de luz ficou em "Escolher Profissional" e "Enviar no WhatsApp" |
| As respostas das três "Montar orçamento" do início | 3 respostas diferentes | 1 (o hover do sistema) |
| Os números de exibição no início | 17, em 5 cenas | 13, em 4 cenas |
| Os numerais visíveis no site | 77 | 38 |
| As caixas com raio de 28 px | 23, em 6 páginas | 16, em 4 páginas |
| As cenas claras com o conteúdo num cartão | 9 de 13 | 4 de 13 |
| A linha do tempo de círculos | 2 páginas seguidas | 1 |
| O globo da marca como marcador | 22 na faixa e 6 de contagem | 0 |
| A chamada final | 2 páginas | 1 |

**A barbearia [C]** (as sete páginas, iguais a 1440 e a 390 px):

| O que se repetia | Antes | Depois |
|---|---|---|
| A revelação ao entrar na tela | 30 | 6 (só as linhas da lista de capítulos do início) |
| A entrada que sobe nas aberturas | 18 | 3 |
| As palavras que se compõem | 36 | 5 |
| A página que sobe inteira | 7 | 0 |
| O botão com o reflexo | 10 | 3 |
| O ímã | 10 | 1 |
| As letras que rolam | 51 | 9 |
| A faixa de latão que acende | 55 | 6 |
| A moeda que gira no cartão da equipe | 3 | 0 |
| O selo em 3D | 4 | 2 |
| As telas do celular com a ficha centrada no alto e o texto embaixo | 4 | 1 (a capa) |
| As aberturas da mesa com o título de duas linhas à esquerda e a ficha à direita | 3 | 2 |
| Os painéis de vidro com desfoque no celular | 2 | 1 |
| As cenas escuras com o grão cortado em linha reta | 3 | 0 |

**O depósito [P]:**

| O que se repetia | Antes | Depois |
|---|---|---|
| A revelação ao entrar na tela | 26 elementos, em 8 seções | 4, cada uma com pose própria |
| A entrada da capa | 7 | 0 |
| A subida do título das páginas internas | 6 | 0 |
| O véu do botão | 20 | 2 ou 3 por página |
| A textura que aproxima nas etiquetas | 6 | 0 |
| O laranja em código inerte | 48 | Só no sinal e no que se toca |
| O código monoespaçado visível (início · A casa · Orçamento) | 19 · 10 · 8 | 14 · 2 · 7 |
| As setas "→" no início | 7 | 2 |
| O índice de 01 a 05 na página inicial | 3 vezes | 1 (as abas) |
| "Pedir pelo WhatsApp" repetido na mesma tela, a 1440 px | 1 em Materiais, Entrega e A casa | 0 |
| As páginas internas com a mesma abertura | 4 | 1 (a Calculadora) |
| As cenas do início sem imagem feita | 2 de 5 | 0 |

**A nutrição [E]** (início / Valores / Consultório):

| O que se repetia | Antes | Depois |
|---|---|---|
| A revelação ao entrar na tela (esmaecer e subir) | 28 (12 / 7 / 9) | 0; ficam 2 gatilhos de momento |
| A página que sobe | 3 | 0 |
| Os títulos, o lide e o "Nesta página" que entram | 7 | 0 |
| O pontilhado que corre | 7 | 1 (a carta de Valores) |
| O marca-texto | 2, nos títulos | 2, no corpo; nenhum em título |
| Os filetes de 2 px ou mais | 6 / 5 / 5 | 5 / 4 / 4 |
| Os rótulos em versalete | 14 / 13 / 15 | 14 / 14 / 15 |
| As viradas de cor | 2 / 1 / 1 | 3 / 2 / 1 |

**A odontologia [C]:**

| O que se repetia | Antes | Depois |
|---|---|---|
| As seções da página inicial com entrada em cena | 6 | 1 |
| Os números que contam | 4 | 1 (o 30) |
| As placas na porta | 4 | 2 |
| As placas acesas na Equipe | 3, em cascata | 1 |
| Os títulos com o traço ondulado do lápis, na lista de Tratamentos | 6 | 0 |

**O restaurante [P]:**

| O que se repetia | Antes | Depois |
|---|---|---|
| O brilho do esmalte | 18 ações | 7 de 17 ágatas na mesa e 7 de 12 no celular |
| A peça que inclina | 13 | 3 |
| O giz palavra por palavra (animações na carga) | 13 | 6, terminando em 600 ms |
| A cascata | 5, com 25 elementos | 1 (as seis lousinhas) |
| A peça que desce e assenta | 10 | 2 |
| A calha com utensílios | 9 | 3 |
| O tique no início | 12, mais 3 impressos | 6, mais 3 impressos |
| O desdobrar do cardápio, a 390 px | 3 | 1 |
| As placas esmaltadas no Onde | 2 | 1 |
| As lousas na primeira tela, de 1536 px para cima | 2 | 1 |
| As ágatas cheias na folha de Encomendas | 2 | 1 |

**O pet shop [E]:**

| O que se repetia | Antes | Depois |
|---|---|---|
| A régua de leitura | 8 listas e 30 linhas, nas três páginas | 3 tabelas, só em Serviços |
| A inclinação sob o ponteiro | 3 peças | 2 |
| O verniz dos preços | Os três números acendendo juntos | Uma linha por vez |
| A sombra de peça solta | 3 | 2 |
| As chegadas no início | 5 das 6 cenas, com a cascata de 5 trechos e o horário que desce | A entrada da capa e 3 gestos, cada um de uma cena: o rolo, o cartão que vira e a batida |
| As peças sobre a borda de uma virada, em Serviços | 0 | 1 (o verso sobre os acréscimos) |

### 4.3 · Os vereditos dos críticos de fora

Os vereditos da segunda crítica (15 e 16.10.2026), dados antes da última correção. Em todos, os efeitos deixaram de ler como série; em todos, a repetição que sobrou é de composição ou de objeto.

| Site | O veredito, resumido | O que ainda se repetia |
|---|---|---|
| **Atlas** | Os efeitos já não leem como "spam": o orbe aparece 4 vezes, a faixa de luz 2, e o ímã, as letras que rolam, o reflexo e a tarja, 1 vez cada. Ao tirar a série, os efeitos ficaram sorteados, e algumas cenas, sem momento (a abertura de /orcamento). A capa e as aberturas estão na faixa dos premiados; as cenas claras de conteúdo leem como kit de cartões | O número de exibição com legenda (17 no início, em 5 das 7 cenas, com os mesmos fatos em três páginas); o cartão de 28 px em 9 das 13 cenas claras; a linha do tempo de círculos idêntica a 390 px em duas páginas seguidas; a numeração em quase tudo; a chamada final e a condição de fundação em mais de uma página |
| **Barbearia** | Nos detalhes, a série acabou: cada papel responde de um jeito. O início está no nível dos premiados e é a melhor das demos; as páginas internas, todas no mesmo preto, variam menos; o celular fica abaixo da mesa na Equipe, nas ferramentas e no toque | A composição da ficha 3D: a mesma moldura em quatro telas do celular e o mesmo esquema em três aberturas da mesa; o Agendar e o Retorno com o mesmo painel no celular |
| **Depósito** | No movimento, já não parece componente repetido: cada página tem um momento, e cada um é de um tipo. Nem toda cena tem o seu momento; a página inicial fica um degrau abaixo do restaurante e do pet shop | O índice de 01 a 05 três vezes na página inicial; o código monoespaçado numerado à frente de toda lista; quatro páginas internas com o mesmo cabeçalho; o endereço e o horário repetidos logo antes do rodapé |
| **Nutrição** | Não lê mais como componente "spamado": um momento por página, os três diferentes, e o marca-texto uma vez por página. "O passe foi de limpeza, não de enriquecimento"; o veredito da vitrine foi "abaixo" | O rótulo em versalete sobre o filete grosso abrindo todo bloco; a capa e Valores com a mesma composição (o título à esquerda e o papel à direita); o pontilhado em duas páginas; o "Continua em" e o colofão iguais nas três páginas; no celular, as três aberturas com o mesmo esqueleto; na capa, as cenas 2 a 5 inertes |
| **Odontologia** | Os efeitos já não leem como "spam": só o termo entra ao rolar, uma peça inclina por página e só o 30 conta. A capa e o percurso estão no nível dos premiados; o resto está abaixo, e o celular abaixo da mesa | O objeto: a placa da arcada em 4 cenas da página inicial e na abertura de 8 internas, idêntica em 5 dos 6 tratamentos; a capa e o percurso com o mesmo quadro; o traço do lápis como resposta do vínculo e do item de lista |
| **Restaurante** | O movimento não lê mais como "spamado": no início, cinco das sete cenas têm cada uma o seu gesto, e cada página interna tem um momento. No mundo e na matéria, está no nível dos premiados, a 1440 e a 390 px | O objeto: a lousa em três cenas do início e no alto da cozinha, quase igual à capa; a placa esmaltada duas vezes no Onde; o par guardanapo e plaquinha no início e no Onde |
| **Pet shop** | Não lê mais como "spamado": cada efeito aparece uma vez por página, ou numa superfície só. Nem toda cena tem o seu momento (o meio do início e o Onde quietos); ainda não está no nível dos premiados | O corte reto em série nas viradas de Serviços, que lê como faixas alternadas de fundo; as faixas de cartolina vazia |

---

## 5. As lições

**(a) A repetição de movimento sai fácil, e as contagens provam.** Nos sete sites, a série de efeitos caiu num passe: a revelação de 30 para 6 na barbearia, de 26 para 4 no depósito e de 28 para 0 (como esmaecer e subir) na nutrição; a entrada das aberturas de 30 para 0 no Atlas; a peça que inclina de 13 para 3 no restaurante; as letras que rolam de 51 para 9 na barbearia. Os sete críticos de fora confirmaram que os efeitos deixaram de ler como série. A regra já estava no kit, e quem construiu não a via: só a contagem a tornou visível. Tirar a série, porém, teve dois desvios, que os críticos acusaram:
- **O sorteio:** no início do Atlas, as três "Montar orçamento" passaram a responder de três jeitos, e um efeito de cada (a onda, o ímã, a faixa de luz, o orbe, as letras e o reflexo) concentrou o catálogo numa página só (M2). A correção pôs as três no hover do sistema e deixou a faixa de luz só nas ações de decisão. Daí a seção 2.1, item 4.
- **A cena sem momento:** tirar não é corrigir. A abertura de /orcamento do Atlas ficou parada, repetindo o lide; a nutrição saiu "de limpeza, não de enriquecimento"; no pet shop, o meio do início e o Onde ficaram quietos; na barbearia, a Equipe perde o momento com a casa fechada. O usuário pediu, junto com a regra, que a nutrição, a barbearia e o depósito fossem enriquecidos. Daí a seção 2.1, item 3: no lugar da série entra o momento de cada cena.

**(b) Depois do movimento, aparece a repetição de composição.** Os sete críticos a acusaram (seção 4.3):
- **o mesmo cabeçalho de seção:** o rótulo em versalete sobre o filete grosso em todo bloco (nutrição);
- **o mesmo molde de cena:** o título à esquerda e o objeto à direita (a barbearia, a nutrição, a odontologia), e a mesma moldura em quatro telas do celular (barbearia);
- **a mesma grade de casas com código:** o índice de 01 a 05 três vezes e o código numerado à frente de toda lista (depósito); a numeração em quase tudo e o número com legenda em cinco cenas (Atlas);
- **o mesmo objeto várias vezes:** a arcada (odontologia), a lousa e a placa esmaltada (restaurante);
- **o mesmo bloco em duas páginas:** a chamada final e a condição de fundação (Atlas), o endereço com o horário antes do rodapé (depósito), o "Continua em" e o colofão (nutrição);
- **o mesmo separador em série:** o corte reto entre as faixas de fundo de Serviços (pet shop).

Ela se registra como a segunda camada da regra (seção 2.2), com a conferência correspondente: contar os moldes de seção e os blocos repetidos entre páginas, e não só os efeitos (seção 3, itens 2 e 3). Parte dela não se corrigiu por ser decisão de quem aprova: a arcada, a lousa e, no Atlas, as portas e as caixas que se empilham, ligadas a pedidos do usuário de 03.10.2026.

**(c) O que ficou pendente em cada site.** Em todos: nada foi visto em aparelho real nem no build de produção, só no modo de desenvolvimento; e as mudanças no mundo aprovado esperam a aprovação de Matheus Castro Oliveira de Luna Garcia.

| Site | O que ficou pendente |
|---|---|
| **Atlas** | A linha entre filetes virou o recipiente mais comum das cenas claras e pode ser lida como a nova série. As portas (seis cartões com o dado em número grande) e as caixas que se empilham ficaram, ligadas a pedidos do usuário de 03.10.2026. A tarja do "UFF" saiu pela regra do kit, mas a decisão estava com os sócios (`11-anti-ia.md`, seção 7.3); a saída é reversível. O hover das listas sem vínculo não tem equivalente no toque. /para-quem ficou sem momento na carga |
| **Barbearia** | A capa e o Agendar mantêm o título à esquerda e a ficha à direita, e a capa do celular mantém a moldura. A linha do serviço muda pouco sob a mão (0,1% da linha). Às sextas e aos sábados, os três espelhos da Equipe ficam iguais com a casa fechada. A numeração de 01 a 06, o rótulo da capa e "Desde 1996" duas vezes na primeira tela estão com os sócios. A célula de 1.024 px no celular (12,6 MB de textura) não foi medida em aparelho real |
| **Depósito** | 1998 aparece quatro vezes e 15h cinco vezes na página inicial, e a proposta de corte está com o aprovador. O código das etiquetas e da tabela de Materiais (18) ficou, porque ali é o produto do catálogo. A Calculadora mantém a abertura comum. A saída do código numerado das listas foi executada sem o sim do aprovador |
| **Nutrição** | O teste da vitrine com um crítico de fora novo, depois da correção, não foi feito: o veredito "abaixo" é de antes dela. Os versaletes seguem de 14 a 15 por página. No celular, as três aberturas mantêm o h1 e o objeto embaixo. A moldura nova, a sálvia (#b7c9b3), o talão, o fecho e a folha maior esperam o aprovador |
| **Odontologia** | Com quem aprova: a arcada repetida, a capa e o percurso com o mesmo quadro, a lista dupla, o título por diferença no celular e a linha do tempo de ~1,6 s; e o bairro na porta. A regra "inteira ou sai" da placa deixa vazios curtos. Nenhum crítico de fora olhou a correção, e o `identidade.md` espera as frases anotadas no `decisoes.md` |
| **Restaurante** | Com quem aprova: a lousa como série (a capa e a cozinha quase iguais) e o par guardanapo e plaquinha. O tríptico do cardápio ficou, por discordância registrada. O `identidade.md` está desatualizado em 9 pontos. Os momentos das páginas internas passam de 600 ms. Nenhum crítico de fora olhou a correção |
| **Pet shop** | Com o usuário: as faixas de cartolina vazia (as metas de cor), o meio do início (a recomendação é manter) e as duas viradas retas que sobram em Serviços. No meio da passada do rolo, a folha ainda mostra uma área amarela larga. A prova repete o texto da lista no HTML, fora da árvore de acessibilidade (`aria-hidden` e `inert`) |

---

## 6. Lista de conferência

- [ ] O inventário por página, a 1440 e a 390 px: cada efeito, as ocorrências e o lugar em que ele é o momento.
- [ ] Nenhum efeito em série: o gesto de marca uma ou duas vezes por página; cada efeito da identidade num lugar; cada cena com o seu momento, diferente do da vizinha.
- [ ] A mesma ação com a mesma resposta; o efeito expressivo só na instância que é o momento.
- [ ] Os moldes contados: o cabeçalho de seção, o molde de cena, o recipiente, o objeto repetido e os blocos repetidos entre páginas.
- [ ] A contagem no relatório de QA, com o antes e o depois, na porta da mesa e na do celular.
- [ ] O crítico de fora respondeu ao que se repete dentro do site, com a contagem na mão.

---

## 7. Fontes

- Os pedidos do usuário de 14.10.2026, citados no cabeçalho, e o de 09.10.2026 (`19-o-padrao-atlas.md`, cabeçalho).
- Os registros de cada site, no repositório do Atlas: o `registros/demos/<site>/decisoes.md` dos seis exemplos (`barbearia`, `deposito`, `nutricao`, `odontologia`, `pet-shop`, `restaurante`) e o `lapidacao.md` da odontologia, do restaurante e do pet shop.
- Os planos, os planos revisados pelo cético, os registros de cada agente, os scripts de contagem, as capturas e os filmes: na pasta temporária da sessão de 14 a 16.10.2026, sem versão, como as capturas da linha de base de `11-anti-ia.md`, seção 7. O registro do site do Atlas ficou só nessa pasta.

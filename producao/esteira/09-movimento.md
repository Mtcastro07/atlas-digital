# 09 · Movimento

> **Para que serve.** Quando algo se move num site do Atlas, por quanto tempo, com que curva, em que plano, com que freio; os gestos do Spell UI e como adaptá-los; o 3D; as transições entre páginas; e as lições que custaram caro. Cada regra traz o objetivo.
>
> **Estado.**
> - **DECIDIDO** (decisões de 30.09 a 03.10.2026): só `transform` e `opacity`, movimento reduzido respeitado, nada ligado à rolagem salvo as exceções decididas, a camada por plano.
> - **RATIFICADO** em 08.10.2026: os tokens de duração e curva, a partir da pesquisa.
> - **DECIDIDO** em 14.10.2026: nenhum efeito em série dentro do site (seção 5, item 13; `20-repeticao-dentro-do-site.md`).
> - **DECIDIDO** em 02.11.2026: as passivas em todo site novo, com a cobertura medida (seção 14).
> - **DECIDIDO** em 03.11.2026, pedido do usuário no site do Atlas, levado a todo site novo: nada preso com animação ligada à rolagem (seção 5, item 7). Na mesma rodada, o acabamento das passivas e o começo só à vista (seção 14).

---

## 1. Para que o movimento serve

| Propósito | O que faz | Exemplo |
|---|---|---|
| **Resposta** | Confirma que a ação aconteceu | O ícone de copiar que vira "confirmado" só se copiou; o botão que cede ao toque |
| **Orientação** | Mostra de onde a coisa veio e para onde foi | O painel que surge do botão que o abriu (Freiberg) |
| **Continuidade** | Liga o antes ao depois | A troca de página com o cabeçalho parado |
| **Encanto** | Raro: o momento-assinatura | A ficha de latão que vira entre as seções da barbearia |

**Regras gerais:**
- **"Não acrescente movimento só por acrescentar"** (Apple HIG) [V]. Deixe o usuário interromper e nunca o faça esperar pela animação.
- **Um momento orquestrado vale mais que efeitos espalhados.** Esmaecer e subir em toda seção, e transição de hover em todo cartão, são o padrão genérico, que se lê como gerado (skill de design da Anthropic) [V].
- **Um movimento que se repete e o usuário passa a notar** deve diminuir ou sumir (IBM Carbon) [V].
- **Nenhum efeito em série dentro do site** (DECIDIDO em 14.10.2026, pedido do usuário: "o que vejo seria que você está usando eles de forma repetitiva dentro dos sites, parecendo que você está spamando os mesmos componentes"). Cada efeito vale onde é o momento certo; entre sites, repetir um efeito é permitido. A regra, a contagem que a prova e o estudo estão em `20-repeticao-dentro-do-site.md` (seção 5, item 13).

---

## 2. Os tokens de duração (RATIFICADO)

| Ação | Duração | Fonte |
|---|---|---|
| Disparada pelo teclado | **0** (nenhuma animação) | Kowalski: "nunca animar ações iniciadas pelo teclado" [V] |
| Toque e pressão | **120 ms** | Carbon: microinterações de 90 a 120 ms [V] |
| Balão, dica, menu suspenso | **200 ms** | NN/g: 100 a 500 ms; ~100 ms para resposta simples [V] |
| Painel, menu de tela cheia, diálogo | **300 ms** | NN/g: 200 a 300 ms para modal [V]; Kowalski: interface abaixo de 300 ms |
| Troca de página | **400 ms** | Next.js: deslocamento de 400 ms na receita de transição [V] |
| Entrada da capa e das aberturas | **até 600 ms, uma vez por visita** | NN/g, diretriz 61: "Never animate critical elements of the page, such as the logo, tag line, or main headline" [V]. Se o título se compõe, é legível no primeiro quadro, uma vez só, em até 600 ms e com o texto intacto no documento; no Atlas, só a partir de 1024 px (no celular fica parado, porque o título é o elemento do LCP) |
| Saída | **~25% mais curta que a entrada** | NN/g: saída mais curta (300 de entrada, 200–250 de saída) [V] |
| Escalonamento entre itens | **40 a 60 ms por item, até 500 ms no total** | [NV]: nenhum sistema de design publica número. Objetivo: a lista entra como sequência, não como bloco, sem que o último item espere mais que os 500 ms em que o movimento vira "arrasto" (NN/g, abaixo) |
| Com movimento reduzido | **Dissolução de até 150 ms**, nada se desloca | WCAG 2.3.3 [V] |

**Objetivo.** Duração é a diferença entre parecer responsivo e parecer lento: um menu de 180 ms parece mais rápido que um de 400 ms (Kowalski). A 500 ms, o movimento já é "um arrasto" (NN/g).

**As faixas das referências** [V]: IBM Carbon, de 70 a 700 ms (microinterações de 90 a 120 ms; movimento "produtivo" para tarefas e "expressivo" para os grandes momentos; a duração cresce com a distância percorrida); Material 3, de 50 a 1.000 ms; NN/g, de 100 a 500 ms (~100 ms para resposta; saída mais curta que a entrada); Kowalski, movimento de interface abaixo de 300 ms. A Apple não publica números.

**No site do Atlas, as entradas e a troca de página passam disso:**
- o título que se compõe linha a linha mais a tarja chega a ~1,1 s;
- a capa da barbearia termina em ~2,2 s;
- a troca de página leva 300 ms de saída (a página que sai se apaga subindo 14 px) e 700 ms de entrada (a que entra chega de 22 px, depois de 160 ms de atraso), e a abertura dela se compõe linha a linha (`web/app/movimento.css`, no repositório do Atlas). A transição entre documentos do navegador (`@view-transition`) funciona no Chrome 126+ e no Safari 18.2+, não no Firefox [V] (`13-tecnologia-e-estrutura.md`, seção 9.3).

São divergências registradas para decisão, não modelo a seguir. Entre 14 e 16.10.2026, as aberturas internas do Atlas deixaram de se compor linha a linha, a tarja saiu e o brilho do selo "Recomendado" também: cada página ganhou o seu momento (`20-repeticao-dentro-do-site.md`, seção 4.2).

**Outras durações do Atlas**, para confrontar com os tokens (especificação do site, seção 5, no repositório do Atlas):
- o cursor do seletor (a escolha do demonstrativo) desliza em 450 ms;
- o total do montador conta do valor anterior ao novo em 420 ms;
- na troca de aparelho do simulador, o conteúdo some em 140 ms e uma casca vai da forma antiga à nova em até 72% de 580 ms, desacelerando (~0,7 s no total); com movimento reduzido, a troca é seca;
- no ambiente contínuo: os meridianos da esfera dão uma volta em 16 s; a faixa de nichos corre em 60 s; o globo de O Atlas dá uma volta em 36 s; o halo da esfera pulsa em 8 s; o reflexo da chamada final passa a cada 8 s; o brilho do selo "Recomendado" passa a cada 3 s.

---

## 3. As curvas

| Uso | Curva | Fonte |
|---|---|---|
| Movimento no lugar (mudar de estado) | `cubic-bezier(0.2, 0, 0, 1)` | Material 3, "emphasized" [V] |
| Entrada (algo aparece) | `cubic-bezier(0.05, 0.7, 0.1, 1)` | Material 3, "emphasized decelerate" [V] |
| Saída (algo some) | `cubic-bezier(0.3, 0, 0.8, 0.15)` | Material 3, "emphasized accelerate" [V] |
| Tarefa, produtivo | `cubic-bezier(0.2, 0, 0.38, 0.9)` | IBM Carbon, "standard productive" [V] |
| Momento expressivo | `cubic-bezier(0.4, 0.14, 0.3, 1)` | IBM Carbon, "standard expressive" [V] |

**Regras:**
- **Nunca `ease-in` sozinho numa entrada,** porque começa devagar e parece atrasado.
- **Nunca quique** ("bounce", "elastic"): lê-se como datado e é marca de IA. Objetos reais desaceleram.
- **Escala:** a entrada parte de 0,9 ou mais, nunca de 0 — o objeto "cresce do nada". Ao pressionar, 0,97 (Kowalski) [V].
- **A origem da transformação** fica no gatilho: o menu cresce do botão que o abriu.

**Molas.** Para arrastar e para painéis, porque carregam a velocidade do gesto (Motion) [V]. O Material 3 Expressive usa amortecimento 0,8 e rigidez 380 para o espaço, e amortecimento 1,0 (sem quique) para opacidade e cor [V].

**No código:** um token por curva, num lugar só (`app/movimento.css` ou `@theme`), nunca a curva escrita à mão em cada componente. No Atlas, `ease-atlas` — `cubic-bezier(0.22, 1, 0.36, 1)` — é a curva da casa.

**Exceção registrada no Atlas:** a curva `--ease-mola`, `cubic-bezier(0.34, 1.4, 0.5, 1)`, ultrapassa o destino (1,4) e volta. É um quique leve, usado até 16.10.2026 no botão magnético e nos marcadores numerados sobre as telas da vitrine (`web/app/vidro.css`); desde então, o Atlas não a usa, e o token fica no CSS global pelo botão magnético da barbearia. Num site novo, ultrapassagem só em mola de arrasto, que carrega a velocidade do gesto.

---

## 4. As camadas por plano

**O toque Atlas é de todo plano** (DECIDIDO em 09.10.2026, pedido do usuário em 09.10.2026: "nossos clientes querem sites tão trabalhados como o Atlas, independente do plano, apenas restringindo algumas coisas para manter a hierarquia, mas ainda assim, ter nosso toque de qualidade"). Em todo site de marca, de qualquer plano: a página em cenas, o campo de cor da marca, a tipografia de exibição, a matéria, a luz e a profundidade, a imagem construída, os efeitos da identidade (seção 12), a assinatura da capa em movimento (o ambiente pausável, como a esfera e o globo do Atlas), a inclinação e o relevo sob o ponteiro, o vidro onde ele serve à leitura, a entrada orquestrada, as transições entre páginas e o detalhe (`19-o-padrao-atlas.md`). A lista diz o que o site tem, não onde se aplica: cada item entra onde é o momento certo, e nenhum em toda seção, todo cartão ou toda ação (seção 5, item 13). **O plano restringe só o que está nesta tabela:**

| O que o plano restringe | [E] | [P] | [C] |
|---|---|---|---|
| **A assinatura da capa** | Construída em SVG, CSS ou canvas 2D, em movimento | Idem, e o objeto em CSS 3D (faces, relevo, giro) | Idem, e o objeto em WebGL (seção 7) |
| **A cena ligada à rolagem** (seção 5, item 7) | — | — | ✓ (os capítulos, como o palco da barbearia) |
| **A galeria de deslizar** | — | ✓ | ✓ |
| **O estado ao vivo e a resposta à ação** ("aberto agora", o corte da entrega; copiar, espera) | — | ✓ | ✓ |
| **As funcionalidades do ofício** (`03-planos.md`) | — | Uma | Duas |
| **As interações de conteúdo** (seção 13.2: a imagem junto do ponteiro, o rótulo do ponteiro, a assinatura que segue, os números que contam, a transição com a assinatura, o menu como cena) | — | — | ✓ |

**Cada plano vem inteiro** (DECIDIDO em 08.10.2026, à noite, pedido do usuário: "senti falta de efeitos e derivados... respeitando a hierarquia"). O toque Atlas e a coluna do plano são o que ele **entrega**, não um teto a evitar: um Completo sem cena nem objeto em 3D, ou um Essencial sem a assinatura em movimento e a luz da marca, não cumpre o plano. Até 09.10.2026, a tabela tirava do Essencial e do Profissional o ambiente, a inclinação e o vidro; a ata v3.0, IV.2.1, ainda descreve as camadas antigas, e os sócios a atualizam na ratificação. Nos nichos de saúde e de escuta, a camada é a mesma, no tom sereno (`03-planos.md`, seção 5.6).

**Objetivo.** O gesto de um plano acima, num plano abaixo, apaga a diferença que o cliente compra ao subir (`03-planos.md`, seção 1). E o plano sem a sua camada inteira entrega menos do que vende.

---

## 5. O freio: o que todo movimento respeita

1. **Só `transform` e `opacity`.**
   - **Objetivo:** são as duas propriedades que o navegador anima sem refazer o leiaute nem repintar, no compositor (web.dev; tabela de Perry) [V]. `filter` e `clip-path` também ficam no compositor quando suaves; desfoque grande (mais de ~10 px) é caro.
   - **Exceção registrada:** o desfoque de 2 px do ícone de copiar, num elemento de 16 px.
2. **Nada de script que escreve estilo a cada quadro.**
   - **Objetivo:** a primeira versão da onda do Spell UI movia o degradê por script a cada quadro. Com CPU 20×, custou 716 ms de linha principal e atrasou o LCP da capa em 0,26 s (de 2,07 para 2,33 s de mediana, em 7 execuções); refeita só com `transform`, a diferença sumiu.
   - **Se uma variável CSS precisa animar,** registra-se com `@property` e `inherits: false` (variável animada sem registro força repintura) [V].
3. **Movimento reduzido** (`prefers-reduced-motion: reduce`): nada se desloca, nada some, nada roda sem fim. A régua acusa animação infinita rodando com movimento reduzido.
4. **Pausa para o que se move sozinho** por mais de 5 segundos (WCAG 2.2.2) [V].
   - **Como o Atlas faz:** um botão no cabeçalho (`ControleDoMovimento`) põe a classe `ambiente-pausado` na `<html>`, e os elementos de ambiente marcados com `data-ambiente` param.
   - **Disponibilidade:** o botão só aparece com script e sem movimento reduzido; sem eles, não há o que pausar.
5. **Parado fora da tela.** Um `IntersectionObserver` marca `data-visivel` e `data-fora` em cada `[data-ambiente]`. O ambiente só roda visível, e o que nasce abaixo da dobra só começa ao entrar na tela.
6. **A entrada uma vez por visita.** Um script mínimo no `<head>` marca `.js` (há script) e `.ja-aberto` quando a navegação é recarga ou volta pelo histórico (`performance.getEntriesByType("navigation")[0].type`). Com `.ja-aberto`, a entrada não se repete.
   - **Objetivo:** recarregar e ver a coreografia de novo é irritante.
   - **Sem gravar nada:** a classe resolve sem cookie nem armazenamento.
   - **A classe vale só para a página da carga.** Posta uma vez no `<html>`, ela dura o documento inteiro: depois de uma recarga, as páginas seguintes da navegação interna também perdem a entrada (achado de 03.10.2026, corrigido no Atlas entre 14 e 16.10.2026). A ilha que acompanha o caminho (`usePathname`) a retira na primeira troca de página.
7. **No Essencial e no Profissional, nada ligado à posição da rolagem**, salvo o indicador de progresso. **No Completo, a cena da assinatura acompanha a rolagem** (desde 08.10.2026, à noite, pedido do usuário), como o palco da barbearia: decidida no `identidade.md`, com a mesma assinatura atravessando as cenas da página (a ficha da barbearia troca de metal, de forma e de lado de uma cena para outra), só `transform` e `opacity`, pelo `animation-timeline` dentro de `@supports` ou por um ouvinte ligado só com a cena na tela, nunca prendendo a rolagem (M8), e parada na pose final com movimento reduzido.
   - **Assinaturas decididas antes da regra do Completo:**
     - **no Atlas,** as caixas empilhadas do início (03.10.2026): a caixa coberta recua em profundidade com a rolagem, só por `transform` e `opacity`, com o ouvinte ligado só enquanto a lista está na tela e sem recuo com movimento reduzido;
     - **na barbearia de exemplo,** o palco 3D (WebGL) e as peças em CSS 3D acompanham a rolagem (01.10.2026).
   - **Não são exceção,** porque respondem à direção ou ao tom, e não à posição: o cabeçalho, que recolhe ao rolar para baixo (abaixo de 1024 px, depois de 280 px) e troca de vidro conforme o que passa por trás; o atalho do WhatsApp do Atlas e o botão flutuante da nutrição, que acompanham a direção.
   - **A esfera da capa e o giro do globo** também não leem a posição da rolagem: são a assinatura da marca, exceção a "movimento só por ação", e seguem as regras do ambiente (itens 4 e 5).
   - **Nada preso com animação ligada à rolagem** (desde 03.11.2026, pedido do usuário no site do Atlas; em todo plano, o Completo incluído). A peça presa (`position: sticky`) cujo estado anda com a rolagem sai: o movimento vira passiva, com ciclo próprio, que só corre à vista (seção 14). É parente da seção que prende a rolagem (M8). A cena da assinatura do Completo continua a acompanhar a rolagem, mas sem peça presa.
     - **No Atlas:** na mesa, a carta de `/para-quem` ficava presa à direita, e cada público acendia o seu bairro ao passar pelo meio da tela; agora ela fica parada ao lado do título, e os bairros acendem um de cada vez, num ciclo de 12 s (`app/paginas/para-quem.css`, "a leitura"). O nome do plano preso sobre a galeria de `/planos`, que trocava com a rolagem no celular, saiu.
     - **O que fica preso sem animação, quando ajuda a ler, fica:** o resumo da conta ao lado do formulário (`app/paginas/orcamento.css`, `.orc-conta`) e o cabeçalho de uma tabela longa (`app/paginas/planos.css`, `.vd-tabela-chave`).
     - As demos feitas antes da regra não mudaram (o percurso preso da odontologia).
   - **Objetivo:** o WCAG 2.3.3 trata o parallax como não essencial e gatilho de enjoo [V]; o "scrolljacking" desorienta, mais ainda no celular (NN/g) [V].
   - **O motivo não é desempenho:** a animação ligada à rolagem por CSS (`animation-timeline`) roda fora da linha principal, com suporte no Chrome 115+ e no Safari 26+; no Firefox, só em teste (padrão de design do Atlas, 08.10.2026) [V].
   - **Os premiados usam rolagem ligada** (Aventura Dental Arts, "scroll interaction"; Phive, "homepage scroll animation"; estudo do Awwwards de 07.10.2026) [FU]. Até 08.10.2026 a regra abria mão dessa alavanca em todo plano; desde então, ela é do Completo, e a hierarquia a guarda.
   - **`animation-timeline`** (trilho de galeria, progresso) só dentro de `@supports (animation-timeline: scroll())`. Sem a guarda, o navegador sem suporte descarta a linha do tempo e dispara a animação inteira na carga, numa piscada de conteúdo.
8. **Rolagem com inércia:** vedada (ata v3.0, V, "descartada em definitivo"). Na pesquisa de setembro, 0 de 5 barbearias e 0 de 6 advocacias a usavam, contra 8 de 11 imobiliárias de luxo: é assinatura de alto padrão e hospitalidade, não de comércio de bairro.
   - **Os limites técnicos do Lenis,** mesmo onde a ata não o vedasse: respeita o movimento reduzido (a suavização se desliga), mas não tem suporte ao `scroll-snap` do CSS (pede o pacote `lenis/snap`) e fica limitado a 60 quadros por segundo no Safari (30 no modo de baixo consumo) (https://github.com/darkroomengineering/lenis) [V]. Entre os seis premiados medidos em 07.10.2026, quatro o usam (`12-inspiracao-e-referencias.md`, seção 4).
9. **Botão não anda nem muda de tamanho no hover** (pedido do usuário, 01.10.2026): hover em cor, sombra e brilho. A compressão ao toque (0,97) é resposta, não hover.
   - **Detalhe do Tailwind 4:** `translate-*`, `scale-*` e `rotate-*` escrevem as propriedades `translate`, `scale` e `rotate`, não `transform`. Numa transição de lista própria (`transition-[...]`), elas precisam estar na lista, senão a mudança estala sem passagem (`transition-transform` já as inclui).
   - **Exceção registrada:** o botão magnético anda até 7 px (o da capa da barbearia; o do Atlas saiu em 16.10.2026).
10. **Hover só com ponteiro fino:** `@media (hover: hover)` (o `hover:` do Tailwind 4 já faz isso). No toque, a resposta é em cor (`:active`), sem o realce azul do sistema.
11. **A entrada não esconde o elemento do LCP:** o título e o lide da primeira tela não partem de opacidade 0 com atraso (`15-desempenho.md`, seção 5.1).
12. **Interromper e repetir.**
    - **Transição de CSS no hover e no toque,** porque ela muda de rumo no meio do movimento. Nunca `transition: all` (`../qualidade/11-design-e-anti-ia.md`, seção 5, item 13).
    - **Ação leve pode disparar no meio do gesto; ação destrutiva, só ao soltar** (Freiberg, https://rauno.me/craft/interaction-design) [FU].
    - **Nada animado em ação de teclado** (token de 0 ms, seção 2).
    - **Movimento que se repete e que o usuário passa a notar diminui** (IBM Carbon) [V].
13. **Nada em série** (DECIDIDO em 14.10.2026). Dentro do site, nenhum efeito se aplica a toda seção, todo cartão, todo título ou toda ação: cada um fica onde é o momento, e o gesto de marca, uma ou duas vezes por página (seção 6.1). Entre sites, repetir um efeito é permitido.
    - **Objetivo:** o mesmo efeito em tudo lê como componente repetido, a marca M1 (`11-anti-ia.md`, seção 5.5).
    - **Como conferir:** a contagem de cada efeito por página, a 1440 e a 390 px, no relatório de QA (`20-repeticao-dentro-do-site.md`, seção 3).

---

## 6. Os gestos do Spell UI

O **Spell UI** (https://spell.sh, registro `@spell` do shadcn) é uma coleção de componentes de movimento. No Atlas, ele entra **como o gesto da marca, nunca como enfeite de catálogo** (pedido do usuário, 03.10.2026: "para deixar sites mais únicos, sem IA slop").

### 6.1 · As regras

1. **Um gesto por marca, com motivo.** Ele se escolhe pelo que a marca é e passa no teste do desconhecido:
   - o latão da barbearia pede um brilho de metal;
   - a folha impressa da nutrição, um marca-texto;
   - no Atlas, uma onda de bronze no "24h" — hoje no título, marca de IA da linha de base, a decidir (abaixo); num site novo, a palavra vai no corpo ou na ação.

   O gesto de marca é um só por site (a onda, o brilho, a inclinação ou o marca-texto, conforme o plano) e aparece no máximo uma ou duas vezes por página, no ponto de decisão. Os de utilidade do [P] — copiar e espera — não contam: são resposta à ação, não assinatura. **Os efeitos da identidade (seção 12) também não contam:** são feitos para a marca, a partir da matéria dela; quando partem de uma peça de catálogo, chegam traduzidos para essa matéria (seção 6.4). O limite de um é do gesto de texto do Spell UI e dos seus equivalentes de outras bibliotecas.
2. **Adaptar, nunca colar:**
   - cores pelos tokens da marca (a onda original era um arco-íris);
   - textos em português, a fonte da identidade e cantos arredondados (salvo identidade que peça o contrário);
   - nada que repita uma peça que o site já tem.
3. **A camada do plano manda:**
   - **[E]:** revelação (o marca-texto);
   - **[P]:** utilidade e resposta (copiar, espera);
   - **[C]:** a camada completa (onda, brilho, inclinação).
4. **Desempenho antes do acabamento:**
   - só `transform` e `opacity`, nada de script por quadro;
   - componente de servidor quando não precisa de script;
   - o script inicial se mede.
5. **Com freio:** entrada uma vez, ambiente pausável e parado fora da tela, nada com movimento reduzido, nada ligado à rolagem.
6. **O estado diz a verdade:** o "copiar" só confirma se copiou e diz "Cópia indisponível" quando o navegador recusa (até 03.10, o montador dizia "Copiado" mesmo assim). A espera aparece onde se espera.
7. **As cópias de texto que só desenham** ficam fora da árvore de acessibilidade, dos trechos da busca e da seleção (`aria-hidden="true"`, `data-nosnippet`, `user-select: none`). O contraste de texto com cópia por cima se confere à mão (a régua avisa). **A verificação é a da régua:** sem rolagem lateral em nenhum instante, nem no meio da passagem do gesto, e contraste conferido onde o gesto pinta texto.
8. **A verificação de cada gesto** (método de 03.10.2026, aplicado ao Spell UI). Cada gesto se confere: uma vez; ao recarregar; com movimento reduzido; no toque; com a cópia recusada (onde houver cópia); com a rede lenta; fora da tela; pausado; e sem rolagem lateral em nenhum instante da passagem. No Atlas, a conferência cobriu as sete páginas a 320, 390 e 1440 px e os 16 endereços dos exemplos a 390 e 1440 px.

**Nunca destacar uma palavra do título** (tarja, onda ou itálico): está entre as marcas mais comuns de página gerada (`11-anti-ia.md`). No site do Atlas, a onda no "24h" faz isso e está na linha de base para decisão (a tarja saiu das aberturas entre 14 e 16.10.2026: `20-repeticao-dentro-do-site.md`, seção 4.2); **nos sites de cliente, o gesto vai numa palavra-chave do corpo ou na ação, não no título.**

### 6.2 · O catálogo adaptado

Implementações de referência em `web/components/ui/spell/`, no repositório do Atlas; o README da pasta diz a origem e cada adaptação.

| Gesto | Componente | O que faz | Como foi adaptado | Plano |
|---|---|---|---|---|
| **Marca-texto** | `highlighted-text.tsx` (variante `marcador`) | Uma faixa passa por trás do texto, na metade de baixo, da esquerda para a direita, na cor de `--marcador`; o texto fica na cor dele | Servidor, só CSS (`.mov-tarja`); na entrada, ou quando a palavra entra na tela; raio de 0,12 em; nada com movimento reduzido | [E] |
| **Tarja** | `highlighted-text.tsx` | A tarja sobe por trás da palavra e a pinta (no Atlas, bronze sob navy) | A faixa sobe e uma cópia do texto desce o mesmo tanto, numa janela parada, só por `transform`; sem `motion` nem `mix-blend-mode`; raio de 0,16 em; uma palavra só (duas quebrariam dentro da tarja numa tela estreita) | [E] (com cautela: nunca no título) |
| **Copiar** | `copy-button.tsx` | O ícone de copiar vira o de confirmado, com escala, opacidade e um desfoque leve; rótulo ao lado | Cliente; só confirma se copiou; "Cópia indisponível" quando recusa; desabilitado sem o que copiar; alvo de 44 px; troca seca com movimento reduzido | [P] |
| **Espera** | `bars-spinner.tsx` | Doze barras que se apagam em sequência | Servidor, CSS (`.mov-barras`); parada, em leque, com movimento reduzido; decorativa (`aria-hidden`): o gatilho diz o que espera | [P] |
| **Onda** | `gradient-wave-text.tsx` | Uma faixa de cor da marca atravessa a palavra uma vez, ao fim da entrada | Servidor, só CSS e só `transform`: uma cópia da palavra pintada com o degradê numa janela que corre; `contain: paint`; nada ao recarregar nem com movimento reduzido | [C] |
| **Brilho** | `shimmer-text.tsx` | Um brilho atravessa o texto a cada 3 s | Servidor; uma cópia mais clara numa janela que corre; ambiente (`data-ambiente`): só com script, depois de entrar na tela, pausável | [C] |
| **Inclinação** | `tilt-card.tsx` | O objeto inclina em 3D sob o ponteiro (o lado do ponteiro cede: até 8° no padrão do componente, `limite = 8`; no Atlas, 6° na escada e 7° no celular), com um brilho que o acompanha | Cliente; só com ponteiro fino e sem movimento reduzido; mede o invólucro, que não gira; uma escrita por quadro (`requestAnimationFrame`); sem crescer no hover | [C] |

**Ficaram de fora, de propósito:**
- **Light Rays:** traz o three.js, centenas de KB.
- **Signature:** opentype.js e uma fonte.
- **Tweet e Spotify Card:** dados de terceiros, pedido externo.
- **QR Code e Chart:** sem uso.
- **Os que repetem peças que o site já tem:** Marquee e Text Marquee (faixa em rolagem contínua, também marca de IA); Words Stagger, Blur Reveal e Slide Up Text (o título que se compõe).

### 6.3 · Como trazer um componente novo

1. `npx shadcn add @spell/<nome> --dry-run` (ou `--diff`) para ver o que viria.
2. `npx shadcn add @spell/<nome>`: o CLI grava em `components/`.
3. Mover para `components/ui/spell/`.
4. Adaptar:
   - **`cn`:** sem `cn` no código que vai ao navegador. Desde setembro de 2026, os itens do shadcn importam o `cn` do pacote `cn`; trocar.
   - **Texto e cor:** textos em português, cores pelos tokens.
   - **Movimento:** só `transform` e `opacity`, `.ja-aberto` e `data-ambiente`, nada com movimento reduzido.
   - **Forma e tipo:** componente de servidor se não precisar de script, cantos da identidade.
5. Registrar no README da pasta: origem, onde está, o que mudou.
6. Medir o script inicial com a régua.

**Nunca reinstalar por cima de um componente adaptado,** nem rodar `shadcn apply` ou `shadcn init --preset`: os dois reinstalam todos os componentes e reescrevem as variáveis de cor.

### 6.4 · Além do Spell UI: o catálogo de componentes

> **DECIDIDO em 13.10.2026,** pedido do usuário: "enriqueça a pasta produção adicionando o resultado da sua pesquisa, para que meus sites sejam mais ricos e diversos, pela quantidade de componentes que você poderá utilizar dentro do desenvolvimento".

**Regra.** As peças de outras bibliotecas vêm do catálogo do kit (`../componentes/`): os registros do shadcn, as coleções, os pacotes, as técnicas nativas e os demos. Ele traz, de cada peça, a licença conferida para o site vendido ao cliente, o plano, o comando e os cuidados. Elas entram assim:
1. **Depois do mundo da marca.** O `identidade.md` decide o que a página faz; o catálogo só dá a mecânica (`../componentes/README.md`, seção 2).
2. **Traduzidas para a matéria da marca.** A peça traduzida conta como efeito da identidade (seção 12) ou como resposta do vocabulário de interação (seção 13), e fica fora do limite de um gesto. A peça usada como veio, com a cor da marca por cima, é enfeite de catálogo, e não entra.
3. **O gesto de texto continua um só por marca.** A onda, o brilho, a tarja, o marca-texto e o texto que se revela contam no limite da seção 6.1, regra 1, venham da biblioteca que vierem.
4. **Pelos passos da seção 6.3** e pelas regras de licença, de origem e de encaixe do catálogo (`../componentes/README.md`, seções 3 a 5), com o aviso da licença ao lado do código.

**Objetivo.** Até 13.10.2026, os seis gestos do Spell UI eram a única matéria-prima pronta do kit. Cada site refazia do zero a galeria, a gaveta, o odômetro e a transição, ou escolhia de memória, sem a licença conferida. Com dezenas de peças por função, dois sites do mesmo nicho deixam de precisar da mesma solução (`19-o-padrao-atlas.md`, seção 7).

**Como conferir.**
- O `decisoes.md` registra cada peça de terceiros, com a origem, o commit e a licença.
- O `LICENCA-<origem>.txt` está ao lado do código.
- A avaliação anti-IA não acha a peça como veio do catálogo (M1, M2, M7).

---

## 7. O 3D

**Permitido só no Completo, e só se cumprir as cinco condições:**

1. **Medido.** Motor próprio, ou biblioteca escolhida pela regra de tecnologia (`13-tecnologia-e-estrutura.md`, seção 9). Desde 08.10.2026, à noite, não há teto de peso nos sites de marca: o que se exige é a carga com o navegador ocioso (condição 2) e a página de pé sem o 3D (condição 3). O da barbearia tem ~16 KB, contra ~178 KB do three.js [FU] e ~29 a 33 KB do OGL [FU]. Em setembro, um showroom em WebGL pesava 639 KB de script: doze vezes um demo inteiro.
2. **Sem travar a página.** Carga com o navegador ocioso; compilação dos shaders em paralelo (`KHR_parallel_shader_compile`); abaixo da barreira do travamento no aparelho médio (`15-desempenho.md`, seção 2.1).
3. **A página existe sem o 3D.** Reserva sem WebGL e sem script (o selo em traço `.bb-reserva` da barbearia), também durante a carga e na perda de contexto.
4. **Com movimento reduzido,** o objeto fica parado.
5. **O objeto é do ofício** e passa no teste do desconhecido.

**Lições da barbearia** (03.10.2026; implementação em `web/components/ilhas/demos/palco-3d/`, no repositório do Atlas):
- **Giros inesperados ao rolar.**
  - **Causa:** a virada era guardada por par de seções, e a face trocava por um limiar da mistura.
  - **Correção:** uma sequência contínua de faces, com a face saindo do giro total e só trocando de perfil.
  - **Resultado:** 8 meias-voltas viraram 4 e as trocas visíveis, 0.
- **Borrado.**
  - **Causa:** o desenho partia de 64% da resolução nativa na mesa e de 31% no celular, e o ajuste nunca subia.
  - **Correção:** resolução até 2× a do CSS, com o ajuste medido contra 60 quadros por segundo, e células de 1.024 px num canal só.
  - **Resultado:** 101% e 69% do nativo.

**Onde nunca:**
- **Oficina:** o público usa celular médio. Um diagrama vetorial com regiões navegáveis custa de 10 a 15 KB, funciona sem script e é mais do ofício, porque a oficina vende intervenção em partes do carro.
- **Psicologia e advocacia:** a sobriedade é a identidade.

O detalhe está em `14-funcionalidades/08-peca-assinatura.md`.

---

## 8. As transições entre páginas

- **O mecanismo** (desde 28.10.2026): a entrada por CSS, no `template.tsx` de cada site. A página nova sobe e acende a partir do commit, a que sai some de uma vez, e o cabeçalho fica parado no layout (`13-tecnologia-e-estrutura.md`, seção 3.7, regra 4). Até então, era o `<ViewTransition>` do React, com o cabeçalho ancorado: a captura dele reprova os 60 quadros no celular (`15-desempenho.md`, seções 2.4 e 5.15). A base traz a entrada por CSS desde 02.11.2026.
  - **A entrada da receita do guia do Next.js 16.4** [V]: esmaecida, com deslocamento de 400 ms em 60 px, mas sem o atraso de 210 ms, que esperava a saída; 0 s com movimento reduzido. A saída de 150 ms da receita sai junto com a View Transition.
  - **Todo navegador** recebe a entrada, que é CSS; antes, sem suporte a View Transitions, a troca era imediata.
  - **O Atlas não segue a receita** (seção 2): ele usa 700 ms de entrada, na curva da casa. Até 27.10.2026, com 150 ms de saída e a entrada a partir dos 160 ms; a troca autorizada pelo usuário nessa data ("Trocar a transição") tirou a saída e a espera, e entrou no site com o redesenho de 02.11.2026 (`99-rastreabilidade.md`, seção 10). Num site novo, vale a receita.
- **Nunca um `view-transition-name` fixo num ancestral do vidro:** ele vira raiz de fundo e apaga o desfoque.
- **Animação dentro de diálogo modal** (o simulador do Atlas): Web Animations API no próprio diálogo, nunca a View Transitions API, que fotografa a página sem a camada de topo, e o diálogo some durante a transição.
- **A rolagem suave das âncoras** (`scroll-behavior: smooth`) exige `data-scroll-behavior="smooth"` no `<html>` (Next 16): sem o atributo, a página nova rolava animada até o topo.
- **A transição de página do navegador não se interrompe** (nota C na tabela de Perry) [V]: mantê-la curta.

---

## 9. Os sinais de movimento genérico (para a avaliação anti-IA)

- Esmaecer e subir em toda seção; hover em todo cartão.
- Carrossel que avança sozinho: o visitante o pula como anúncio (NN/g) [V].
- Texto partido em letras animadas: corrompe o nome acessível se feito errado, e a régua compara o `h1` lido com o desenhado.
- Brilho em todo botão, ponto pulsando, cursor piscando sem campo de texto.
- Quique.
- Movimento de interface acima de 500 ms.
- Faixa que rola sem fim.
- Gesto que caberia em qualquer site.
- O mesmo efeito em série: em toda seção, todo cartão, todo título ou toda ação (`20-repeticao-dentro-do-site.md`).

---

## 10. As lições que custaram caro

| O que aconteceu | A regra que ficou |
|---|---|
| A onda movia o degradê por script a cada quadro: +0,26 s de LCP (2,07 → 2,33 s), 716 ms de linha principal no módulo da onda, com CPU 20× | Nada de script escrevendo estilo a cada quadro; só `transform` |
| O minificador (Lightning CSS) transformou um atalho `animation` sem nome em `animation: none`, e o brilho ficou com 0 s | Em cada regra, escrever o atalho `animation` completo, **com o nome** |
| O título que se compõe e a tarja põem cópias decorativas dentro do `h1` | Cópias com `aria-hidden`; a régua confere se o `h1` lido é o desenhado |
| As capturas de página inteira reiniciavam a animação de entrada (redimensionam a janela), e o título "sumia" na foto | Antes de acusar defeito, conferir no navegador; não é defeito do site |
| O mouse físico interferia nos testes de hover no navegador com janela (a inclinação parecia invertida) | Testes de ponteiro em contexto próprio, sem janela, ou com o hover fixado pelo DevTools |
| A transição de página pela View Transitions API dentro do diálogo sumia com ele | Animação de diálogo pela Web Animations API |
| O botão principal desabilitado recebia a faixa de luz do hover | `disabled:after:hidden`; o desabilitado recebe o ponteiro, para o cursor de "não permitido" |
| O botão magnético do Atlas tremia: a posição do ponteiro era medida na caixa já deslocada pelo ímã, e o alvo mudava enquanto o botão andava | Elemento que se move com o ponteiro mede a posição sem o próprio deslocamento (descontar `getComputedStyle(el).translate`) ou num invólucro que não se move, como a inclinação (seção 6.2) |

---

## 11. O premium no toque (o passe do celular)

> **DECIDIDO em 08.10.2026,** pedido do usuário: "em todo projeto, a experiência premium do computador seja transmitida tão bem quanto nos celulares, mesmo de forma mais leve". Vale em todo plano, dentro da camada dele (seção 4), no passe do celular (`00-principios.md`, seção 5).

**Regra.** Todo momento premium da mesa chega ao celular **mais leve no gesto, nunca mais pobre**: a mesma ideia, com um gatilho que o dedo alcança. Menos camadas e menos custo só quando o aparelho médio travaria (`15-desempenho.md`, seção 2.1): o tamanho, sozinho, não é motivo (decisão de Gabriel Ribeiro Ota Yida, 08.10.2026). O que só existe com o ponteiro (o cursor, o hover) ganha um equivalente; nada some sem substituto.

| Na mesa | No celular | O que fica mais leve |
|---|---|---|
| A entrada orquestrada da capa | A mesma entrada, com os mesmos elementos-chave, em até 600 ms (seção 2) | Menos elementos animados; o escalonamento mais curto |
| Luz, halo ou brilho sob o cursor | A luz responde ao toque, no ponto tocado, por até 400 ms; ou fica parada na posição de repouso, desenhada no lugar certo | Nada segue o dedo nem a rolagem (seção 5, item 7) |
| A inclinação sob o ponteiro | A peça entra com a inclinação de repouso; no toque, a compressão (0,97) e a volta, em 120 ms | Sem giroscópio: pede permissão no iPhone e mexe sozinho com o passo de quem anda |
| O detalhe revelado no hover | Visível de saída, ou atrás de um toque explícito (um botão, um `<details>`) | Nunca escondido sem caminho: a régua avisa a paridade (bloco 7) |
| A cena que se desenha ao rolar, a assinatura decidida [C] | A mesma cena, em menos camadas e com o curso mais curto | Nenhuma outra peça ligada à rolagem (seção 5, item 7) |
| O 3D em WebGL [C] | O mesmo objeto, carregado depois da primeira tela, com a resolução ajustada para manter 60 quadros por segundo, parado fora da tela. Em aparelho que não sustenta, a reserva desenhada (seção 7) | Menos polígonos e luzes; sombra só pintada na textura, nunca calculada a cada quadro |
| O ambiente contínuo | O mesmo ambiente, pausado fora da tela, com a pausa ao alcance do polegar | Menos partículas e camadas |
| A tipografia de cartaz | A escala do celular mantém o contraste entre o título e o corpo do `identidade.md`, sem partir palavra | O título cabe em até quatro linhas a 360 px |
| A grade de peças paralelas | A galeria de deslizar, com o trilho do avanço (`07-composicao.md`, seção 8) | — |
| A transição entre páginas | A mesma, em até 300 ms | — |
| O vídeo de capa | O mesmo vídeo, na versão do celular, ou o pôster na economia de dados (`08-imagem-e-fotografia.md`, seção 9) | O enquadramento do celular |

**Como fazer.**
1. **No começo do passe do celular,** preencha a tabela "O premium no celular" do `identidade.md`: cada momento da mesa e a versão de toque dele. Ela é aprovada junto com as capturas a 390 px.
2. **O toque responde em 120 ms** (a cor do `:active`, seção 5, item 10). A resposta maior, o painel ou a peça, vem em até 300 ms (seção 2).
3. **O alcance do polegar:** a ação principal fica até 60% da primeira tela (`07-composicao.md`, seção 6), e a pausa do ambiente, na metade de baixo da tela ou no cabeçalho.
4. **Medir no aparelho real,** antes de publicar (`../qualidade/08-desempenho.md`, seção 8): o momento roda liso num Android intermediário e no Safari do iPhone?

**Objetivo.** O hover e o cursor são da mesa. Quem traduz só o leiaute deixa o celular sem os momentos que fazem o site ser premium, e é no celular que o comércio local é visto. A versão de toque mantém a marca; a leveza mantém o aparelho modesto.

**Como conferir.**
- **A avaliação anti-IA no celular:** as capturas a 390 px com o movimento normal (`node ferramentas/fotografar.mjs --movimento`).
- **A régua:** a paridade (bloco 7) e a barreira do travamento no aparelho médio (passagem 2b).
- **O aparelho real.**

---

## 12. Os efeitos da identidade (o acabamento que responde)

> **DECIDIDO em 08.10.2026, à noite,** pedido do usuário, depois de comparar o site de exemplo de odontologia com o Atlas e a barbearia: "senti falta de efeitos e derivados". Vale em todo site de marca, em todo plano, na medida da camada (seção 4).

**Regra.** Todo site tem os seus efeitos da identidade: os efeitos que **saem da matéria da marca** e respondem à mão. Eles não se tiram de um catálogo como vieram: derivam-se em cinco passos, e só a mecânica pode vir do catálogo do kit, traduzida (seção 6.4). Tudo se escreve no `identidade.md` ("O acabamento"):
1. **A matéria:** do que a marca é feita (`nichos/<nicho>.md`, seção 6.1): o latão e o couro da barbearia, a cerâmica e o esmalte da odontologia, o papel cor de palha da nutrição, o papel de projeto e o laranja de sinalização do depósito, o bronze e o titânio do Atlas.
2. **A luz nessa matéria:** como ela reflete. O metal tem o reflexo que corre e a faixa de luz; a cerâmica e o esmalte, o brilho úmido e o halo do refletor; o papel, o grão e a tinta; o vidro, a refração; o concreto, a sombra dura.
3. **A resposta à mão:** o que a luz e a matéria fazem sob o cursor, na mesa, e no ponto tocado, no celular (seção 11): a luz que acompanha, o relevo que inclina, o reflexo que corre, a tinta que marca.
4. **A entrada:** como a matéria aparece na capa, como um momento composto: o objeto que gira até a pose, a luz que acende, a tinta que assenta.
5. **Onde mora:** na capa, nas ações, nas transições, no rodapé. Um sistema, não efeitos espalhados (M2): todos saem da mesma matéria e da mesma luz. Cada efeito mora num lugar, onde é o momento, e nunca em série (seção 5, item 13).

**As referências, para estudar** (o código do exemplo em `../referencias/sites-de-exemplo/`):

| Site | A matéria | Os efeitos da identidade |
|---|---|---|
| **O Atlas** | O bronze e o navy, o titânio do aparelho | O orbe de bronze sob o cursor; a esfera e o globo que giram; o halo da esfera; o grão e o reflexo da chamada final; o titânio do celular; o brilho e a faixa de luz das ações; as sombras longas; o vidro líquido do cabeçalho |
| **A barbearia** [C] | O latão, o couro, a navalha, a faixa do poste | As fichas de latão em relevo, em 3D, que giram com a rolagem (o palco); o selo; a faixa do poste; o título de cartaz em serifa com itálico; o rodapé com o nome em escala de cartaz e o selo |
| **O depósito** [P] | O papel de projeto, a tinta grafite, o laranja de sinalização | A textura dos materiais (ruído gerado), as malhas de projeto, o cupom de borda serrilhada, os cantos retos e o botão chanfrado, o estado ao vivo do corte da entrega |
| **A nutrição** [E] | O papel cor de palha, a tinta | O grão do papel (ruído gerado, quase invisível); o título de cartaz da folha impressa; o marca-texto; o halo da cor do papel |

**As referências ensinam o nível, nunca a forma** (`19-o-padrao-atlas.md`, seção 7): o rodapé com o nome em escala de cartaz, que a barbearia e o depósito já têm, repetido nos sites de 09.10.2026, virou cromo de modelo. O código das técnicas está em `../referencias/atlas/` e `../referencias/sites-de-exemplo/` (`19-o-padrao-atlas.md`, seção 8.3), e a ferramenta de unicidade mede a cópia (`npm run unicidade`).

**A medida por plano** (seção 4): no Essencial, a matéria, a luz em repouso e na resposta ao ponteiro e ao toque, e o brilho do material nas ações; no Profissional, mais a matéria que inclina e o reflexo que corre por toda a página; no Completo, mais o ambiente, a cena e o objeto em 3D.

**O freio continua** (seção 5): só `transform` e `opacity`; parado fora da tela; com movimento reduzido, a matéria e a luz ficam, paradas, na pose final; a página inteira funciona sem script. A luz sob o cursor só com o ponteiro fino (`@media (hover: hover) and (pointer: fine)`); no toque, a resposta no ponto tocado (seção 11).

**Objetivo.** O que faz o Atlas e a barbearia parecerem premiados não é a ausência de marca de IA: é a matéria, a luz e a resposta à mão. Um site correto, acessível e leve, sem nada disso, sai com cara de modelo pronto. Foi o que aconteceu com o site de exemplo de odontologia de 08.10.2026: o kit freava o efeito de catálogo e não pedia o efeito da marca.

**Como conferir.**
- **O `identidade.md`, "O acabamento":** os cinco passos preenchidos e as sete camadas do piso (`00-principios.md`, seção 9).
- **O teste da vitrine,** na porta de cada passe (`00-principios.md`, seção 9).
- **As capturas com o movimento normal** (`node ferramentas/fotografar.mjs --movimento`) e o ponteiro passado sobre a capa e as ações.

---

## 13. O vocabulário de interação: a página que responde à mão

> **DECIDIDO em 09.10.2026,** pedido do usuário: "sinto que você pode adicionar mais animações ou coisas parecidas dentro dos sites completos, mais partes que possuem hovers animados, como o que acontece dentro do site da barbearia e outros dentro do Awwwards". O hover animado não vai contra os acordos anti-IA: a marca é a resposta genérica e igual em tudo, não a resposta da marca (seção 13.3).

### 13.1 · Cada papel tem a sua resposta

**Regra.** Todo elemento interativo responde à mão, com uma resposta que sai da matéria da marca (seção 12) e que muda conforme o **papel** dele. Dois papéis diferentes nunca têm a mesma resposta. A tabela fica no `identidade.md` ("O vocabulário de interação"):

| Papel | O que a barbearia e o Atlas fazem | Respostas possíveis, na matéria da marca |
|---|---|---|
| **A ação principal** | O latão com as letras que rolam e o reflexo que cruza em `skewX(−18°)`; o bronze que clareia, com a faixa de luz que cruza em 900 ms só na entrada | As letras que rolam; o reflexo ou a faixa de luz que cruza uma vez; a luz que acende por dentro; a tinta que enche da borda. **O botão não anda nem cresce** (seção 5, item 9): a resposta é luz, cor, reflexo e texto |
| **O vínculo de texto** | O sublinhado que acende; a seta que avança 3 px | O sublinhado que se desenha da esquerda para a direita (`scaleX`, origem à esquerda) e se recolhe para a direita; a seta que avança; o marca-texto que passa |
| **O item de lista ou de índice** (capítulos, cardápio, tratamentos, serviços) | A linha do capítulo que acende por `scaleX` e a seta que anda 10 px; o ponto de latão sob o capítulo atual | A linha que acende; o número do item que muda de cor; a imagem do item que aparece junto do ponteiro [C]; o preço que se revela por máscara |
| **A peça ou o cartão** | A inclinação com o brilho que acompanha (o titânio do celular); o orbe sob o cursor e a aresta de luz de 1 px que acende | A inclinação e o relevo; a luz da marca que segue o ponteiro dentro da peça; a aresta que acende; a imagem que aproxima 3% dentro da moldura |
| **A imagem** | — | A aproximação lenta (de 2 a 4%, de 600 a 900 ms) dentro da moldura; o rótulo que acompanha o ponteiro ("Ver o prato") [C], sem esconder o cursor do sistema |
| **A navegação** | O traço de bronze sob o item; o globo do logotipo que gira no hover | O filete que corre até o item; o item atual marcado pela matéria (o ponto de latão, o filete de giz) |
| **A assinatura** | A ficha de latão que segue o ponteiro [C]; a esfera cujo eixo inclina com o ponteiro | O objeto que segue o ponteiro com atraso e amortecimento, sem quique |

**Como fazer.**
- **Os tempos** são os tokens da seção 2: o toque em 120 ms; o hover de 150 a 300 ms; a saída mais curta que a entrada. A curva é o ease-out da seção 3, e a mola, quando houver, não tem quique (M3).
- **Só `transform` e `opacity`,** e o hover só com o ponteiro fino (seção 5, item 10).
- **No toque,** a resposta acontece no `:active` e no ponto tocado (seção 11): a cor, a luz e a compressão de 0,97. O que só existe com o ponteiro (a imagem junto do ponteiro, o rótulo, a luz que segue) tem o equivalente: a imagem já visível no item, a luz em repouso.
- **Com movimento reduzido,** fica a troca de cor e de luz, instantânea; nada se desloca.
- **O foco do teclado** recebe a mesma resposta do hover, sem a animação de deslocamento (o teclado não se anima: seção 2), e mais o anel de foco.
- **A resposta segue o papel, e o efeito expressivo, o momento** (14.10.2026). A mesma ação responde do mesmo jeito onde aparece. O efeito expressivo (a faixa de luz, as letras que rolam, a inclinação, a luz que segue) fica na instância que é o momento, como a ação de decisão ou a peça da cena, e as outras respondem com o sistema. A grade em que todo cartão inclina igual é série (M1); três botões iguais com três respostas diferentes são sorteio (M2) (`20-repeticao-dentro-do-site.md`, seção 2.1).

### 13.2 · A densidade, por plano

**Regra.** O vocabulário de interação é do toque Atlas, de todo plano (seção 4): a ação, o vínculo, o item de lista, a peça e a navegação respondem em todos os sites. O que muda por plano é o que existe além disso:

| | [E] | [P] | [C] |
|---|---|---|---|
| As respostas da ação, do vínculo, do item, da peça e da navegação | ✓ | ✓ | ✓ |
| A resposta à ação útil (o copiar que confirma, a espera visível) | — | ✓ | ✓ |
| **As interações de conteúdo:** a imagem do item junto do ponteiro; o rótulo do ponteiro sobre a imagem; a assinatura que segue o ponteiro; os números que contam uma vez ao entrar; a transição de página com a assinatura (a ficha que vira, a cortina na cor da marca); o menu de tela cheia que abre como cena | — | — | ✓ |

**No Completo, toda cena tem pelo menos uma coisa que responde à mão além das ações:** a lista que acende, a imagem que aproxima, a peça que inclina, a assinatura que segue. Uma cena em que só o botão responde está abaixo da barbearia, em que a ficha, o capítulo, o preço e a barra respondem. O que responde muda de uma cena para outra: a mesma resposta em toda cena é série (`20-repeticao-dentro-do-site.md`, seção 2.1).

### 13.3 · Por que isso não é marca de IA

As marcas de movimento (`11-anti-ia.md`, seção 5.5) acusam a resposta **genérica e igual**:
- **M1, "hover em todo cartão":** a mesma subida com sombra em todo cartão de uma grade de cartões iguais;
- **M7, "brilho que passa em todo botão":** o mesmo brilho em todas as ações, de todos os tamanhos;
- **M2, os efeitos espalhados:** cada efeito de uma origem;
- **M4:** o movimento que não responde a nada;
- **M3:** o quique.

O vocabulário desta seção é o contrário disso:
- cada resposta sai da matéria da marca;
- cada papel tem a sua resposta, com hierarquia;
- tudo responde à mão;
- nada se move sozinho sem motivo.

Passa nas cinco perguntas de `11-anti-ia.md`, seção 6. O que continua marca: a mesma resposta copiada, na forma, de outro site do Atlas (a pergunta 5; o mesmo efeito, traduzido para a matéria de outro site, é permitido desde 14.10.2026), e o mesmo efeito em série dentro do site, como a mesma subida de cartão em toda parte (`20-repeticao-dentro-do-site.md`).

**Objetivo.** Nos premiados e na barbearia, quase tudo o que se toca responde, e cada coisa responde de um jeito, o que faz o visitante explorar a página. Nos sites de exemplo de 09.10.2026, só os botões respondiam. O kit permitia mais, mas não pedia: agora o vocabulário e a densidade estão escritos.

**Como conferir.**
- **A tabela do `identidade.md`,** "O vocabulário de interação", com cada papel e a sua resposta na mesa, no toque e com movimento reduzido.
- **As capturas do hover** de cada papel, no teste da vitrine (`19-o-padrao-atlas.md`, seção 8.6).
- **No Completo:** o crítico de fora conta, cena por cena, o que responde à mão (`19-o-padrao-atlas.md`, seção 8.5).

---

## 14. As passivas: o movimento sem ação de quem visita

> **DECIDIDO** para o site do Atlas em 27.10.2026, pelo aprovador, Matheus Castro Oliveira de Luna Garcia ("quer movimento passivo"; depois da primeira construção, "ainda não vi animações passivas suficientes" e "elas precisam ser visíveis"), e levado a todo site novo em 02.11.2026. Vale em todo plano: o plano não as restringe (`19-o-padrao-atlas.md`, seção 9), e cada um as faz com o que tem. Os números são a proposta do contrato de 28.10.2026, com a cobertura corrigida pela crítica de 01.11.2026 [I].

**A regra.**
1. **Duas ou mais por página, em objetos e mecanismos diferentes, sem série.** Um mecanismo é a propriedade, a trajetória e o ritmo; ele aparece uma vez no site (`20-repeticao-dentro-do-site.md`). Cada passiva nasce do sentido do objeto (a agulha que assenta, a água que respira, o ponteiro que anda): é o que a separa da marca M4, o movimento que não responde a nada.
2. **A cobertura medida, e não só a contagem:** pelo menos **60% das telas** com movimento visível depois de assentar; **nunca mais de duas telas seguidas paradas**; e peça pequena, de 28 px, **não conta** como visível. Se a cobertura não fecha, o caminho é uma peça grande que ocupe a tela no lugar de várias pequenas (`19-o-padrao-atlas.md`, seção 4.2). As telas da próxima página e do rodapé não entram na conta: são peças comuns (item 7), e medir com elas leva a pôr passiva onde a regra veda.
3. **Só `transform` e `opacity`** (e `translate`, `rotate` e `scale`). O alvo é HTML ou um `<svg>` inteiro, nunca um elemento de dentro do `<svg>`: no Chrome, o `transform` de um filho de SVG repinta o desenho a cada quadro na linha principal. A exceção é declarada na peça (`data-passiva-svg`) e medida.
4. **Paradas** fora da tela, na pausa e com movimento reduzido. Cada uma tem um repouso que se lê sozinho: é o que o movimento reduzido mostra.
5. **Visíveis:** no pico do ciclo, um canto do objeto se desloca **6 px ou mais**, ou a opacidade muda **0,3 ou mais**. Entre dois movimentos do mesmo objeto, **no máximo 10 s**. Luz muito lenta conta na régua e quase não se vê: compare também dois quadros seguidos, e não só o acumulado.
6. **Cada uma na régua dos quadros,** com as outras correndo (`../qualidade/02-regua.md`, seção 12). **A que reprova sem conserto roda uma vez naquele perfil** (`animation-iteration-count: 1`), e a medida fica no registro.
7. **As peças comuns ficam quietas:** o cabeçalho, o menu, a próxima página e o rodapé não têm passiva. Uma faixa de luz neles se repete em toda página: é efeito em série (`20-repeticao-dentro-do-site.md`).

**O acabamento.** O vaivém em curva senoidal (`cubic-bezier(0.37, 0, 0.63, 1)`), nunca linear; o linear só na volta contínua e no fluxo. Perspectiva de 800 a 1.200 px no que gira em 3D. Nada pisca: a opacidade nunca vai a zero em menos de 600 ms.

**O objeto com trajetória não volta pelo mesmo caminho** (03.11.2026, no site do Atlas). O vaivém (`animation-direction: alternate`) com a mesma velocidade nos dois sentidos parece mecânico. A agulha, a varredura e o traço assentam e se apagam; o vaivém senoidal fica com o que respira (a luz, o halo). O código: `app/paginas/duvidas.css` (`du-busca`, `.vd-momento-1`).
- **Assenta amortecido,** como a agulha de uma bússola: cada balanço menor que o anterior (no Atlas, −38°, +16°, −7°, +3° e 0°), com a curva por trecho, e não uma curva só no ciclo. O primeiro trecho desacelera (`cubic-bezier(0.33, 0, 0.2, 1)`); os outros vão na senoidal.
- **Some por opacidade antes de recomeçar,** parado no repouso: o ciclo seguinte nasce do apagado, e a volta ao começo não salta. No Atlas, a agulha acende até 8% do ciclo de 7 s, assenta em 76% e se apaga até o fim.
- **A deriva que vai e volta** (a folha que flutua) soma dois vaivéns de durações primas entre si, e o gesto demora a se repetir (no Atlas, 13 s e 9 s: o par só volta ao começo depois de 234 s; `app/paginas/o-trabalho.css`, P23).
- **A borda do `conic-gradient` leva rampa dos dois lados.** A parada dura (`#cor 0 24deg, transparent 24deg`) não é suavizada e serrilha. A rampa de ~1,5° vai no começo e no fim da cunha, até a mesma cor com opacidade 0: `rgb(<cor> / 0) 0deg, <cor> 1.5deg 24.5deg, rgb(<cor> / 0) 26deg`, com o `from` recuado 1,5° para a cunha não sair do lugar. Com rampa só no fim, o lado do 0° segue serrilhado.

**O mecanismo** (a ilha de pausa de `../gestos/components/ilhas/controle-do-movimento.tsx` e o fim de `../gestos/app/gestos.css`):
- a passiva é o elemento com `data-passiva="<pagina>-<objeto>"`, dentro de um `[data-ambiente]`; o que anima leva `.mov-passiva`; o laço sob o ponteiro e o brilho do `ShimmerText` levam `.mov-constante`: não contam como passiva e param pelas mesmas regras;
- o `[data-ambiente]` vem no HTML do servidor: o que nasce depois da troca de caminho não é observado e nunca recebe `data-visivel`;
- **só começa o que está à vista de fato** (03.11.2026, no site do Atlas: `components/ilhas/controle-do-movimento.tsx`, `aVista`): metade do `[data-ambiente]` na tela, ou um quarto da altura da tela se ele for maior. O observador usa `threshold: [0, 0.5]`. O que entrou e ainda não está à vista fica pendente e se confere de novo na próxima parada da rolagem (a mesma espera de "O que custou", abaixo). A passiva que nascia numa fresta do pé da tela, no fim de um arremesso, corria onde ninguém olha, e na faixa que a régua dos quadros não vê no celular (`../qualidade/08-desempenho.md`, seção 11, item 8). A ilha de `../gestos/` ainda não faz essa conta (PENDENTE, `99-rastreabilidade.md`, seção 11):

  ```ts
  const aVista = (elemento: Element) => {
    const r = elemento.getBoundingClientRect();
    return Math.min(r.bottom, innerHeight) - Math.max(r.top, 0) >= Math.min(r.height / 2, innerHeight / 4) - 1;
  };
  ```
- a animação só se declara sob `.js [data-visivel] .<classe>`, com as listas de seletores por extenso (`::before` não entra em `:is()`):

```css
.ambiente-pausado :is(.mov-passiva, .mov-constante),
.ambiente-pausado .mov-passiva::before,
.ambiente-pausado .mov-passiva::after,
[data-fora] :is(.mov-passiva, .mov-constante),
[data-fora] .mov-passiva::before,
[data-fora] .mov-passiva::after {
  animation-play-state: paused !important;
}
@media (prefers-reduced-motion: reduce) {
  :is(.mov-passiva, .mov-constante),
  .mov-passiva::before,
  .mov-passiva::after {
    animation: none !important;
  }
}
```

**O que custou, medido no primeiro site com elas** (01.11.2026, o detalhe em `15-desempenho.md`, seção 5.18):
- **A troca de `data-visivel` em pleno arremesso** derrubou a rolagem: o que entra na tela passou a esperar a página parar 200 ms para começar, e o que sai para na hora. O preço é que, em rolagem contínua, ela só começa quando a página para.
- **A animação no compositor pode travar a parada entre dois arremessos,** com a linha principal parada e a tela em dia. Nem toda trava teve causa isolada: mede-se cada peça com a peça desligada, em A/B.
- **A amplitude não salva a peça pequena:** um ponteiro de 2 × 12 px num mostrador de 28 px passou no piso e mudou 0,01% da tela.
- **Duas passivas que somam na mesma página** merecem um gatilho próprio: a luz que passa uma vez por três retratos, a partir de um gatilho só, rodou com o terceiro fora da tela.

**Objetivo.** O site se mantém vivo sem pedir nada de quem visita, e sem que a pausa minta (Q15). A contagem sozinha enganou: com duas ou mais por página em todas, a maioria das telas seguia parada (os números em `99-rastreabilidade.md`, seção 10).

**Como conferir.**
- `node ferramentas/regua/conferir-passivas.mjs --base=<endereço> --pagina=<cada página>`: os oito casos, a 1440 e a 390 px (as propriedades, as três paradas, a contagem, a amplitude, o SVG, o que roda sem dono e a cobertura). Grava `.regua/passivas.json`.
- `node producao/ferramentas/conferir-pausa.mjs <base> <páginas>`: com a pausa e com movimento reduzido, 0 pixel muda.
- A régua dos quadros.
- **O que nenhuma das três vê:** se cada passiva tem mecanismo próprio (regra 1), se o objeto se move ao menos a cada 10 s (regra 5) e se o movimento diz alguma coisa. Isso é do crítico de fora, e das tiras de quadros em tempo real.

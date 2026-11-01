# 07 · Composição

> **Para que serve.** Organizar a página: grade, espaço, hierarquia, primeira tela, ordem das seções, leitura, disposição do celular. A composição decide se o visitante acha o que procura em segundos.
>
> **Quando ler.** Depois da identidade (`04-direcao-de-arte.md`) e da escala (`05-tipografia.md`), antes de montar as seções. De novo, na revisão.
>
> **Depende de.** `03-planos.md` (o número de páginas e o que cada uma precisa ter), `nichos/<nicho>.md` (a estrutura de páginas do ramo), `10-texto-e-conteudo.md` (o texto que ocupa a composição), `11-anti-ia.md` (os leiautes que denunciam um site gerado).
>
> **Atualizado em:** 08.10.2026.

---

## 1. Estrutura convencional, identidade na camada da marca

**Regra.** A **navegação** segue a convenção que o visitante espera: menu no alto, ação à vista, contato no rodapé. A convenção diz **onde** as coisas ficam, não **como** elas são: a composição das cenas e a forma de cada componente saem do mundo da marca (`19-o-padrao-atlas.md`, seções 3 e 4; revisto em 09.10.2026). Até então, a regra mandava a diferença para uma "camada da marca" de tipo, cor e um momento, e os sites de 09.10.2026 saíram com o esqueleto da base pintado por cima.

**Objetivo.** A primeira impressão se forma em 17 a 50 ms e favorece o simples e o familiar (Tuch et al., 2012, https://doi.org/10.1016/j.ijhcs.2012.06.003; resumo do Google: https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/) [V]. Quebrar a convenção de navegação piora essa impressão; quebrar a convenção visual, com motivo, distingue.

**Como conferir.** Na avaliação anti-IA (`11-anti-ia.md`), o menu, o rodapé e a ação no alto **não contam como marca**: são convenção.

---

## 2. A grade

**Regra.** A grade **sai do tipo** (Müller-Brockmann, 1981) e muda nas faixas de largura da tela, não nos aparelhos:

| Faixa | Colunas | Referência |
|---|---|---|
| Compacta, abaixo de 600 dp (celular em pé: 99,96% dos celulares) | 4 | Android, classes de janela (https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes) [V] |
| Média, de 600 a 839 dp | 8 | idem |
| Expandida, de 840 dp em diante | 12 | idem |

**Os pontos do Tailwind**, que o código usa, são próximos: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536. Sem prefixo, a regra vale para o celular e para cima (https://tailwindcss.com/docs/responsive-design) [V].

**Objetivo.** Uma grade estável deixa variar a escala e a posição das peças sem que a página pareça desarrumada (Andy Clarke, *Art Direction for the Web*, https://www.smashingmagazine.com/2019/04/art-direction-release) [V].

**Como fazer.**
- **Coluna de leitura limitada.** No Atlas, `--container-pagina: 70rem` (1.120 px) e o envelope `mx-auto w-full max-w-pagina px-6 md:px-10`.
- **`minmax(0, 1fr)`, nunca `1fr`, nas colunas de grade.** O `1fr` deixa o conteúdo esticar a coluna; causou transbordo duas vezes, em nichos diferentes, em setembro de 2026.
- **`grid-cols-1` explícito no celular.** Uma grade sem colunas declaradas no celular cria uma coluna `auto` que cresce até a largura mínima do conteúdo. No talão do depósito de exemplo, isso empurrava a página 3 px para o lado em 320 px. Corrigido em 07.10.2026 com `grid grid-cols-1 lg:grid-cols-12`.
- **`white-space: nowrap` só em valor curto** (um preço, um horário, um código). Frase nunca: foi a armadilha mais reincidente de setembro, três vezes em três nichos. O `minmax(0, 1fr)` não salva o que está proibido de quebrar.
- **Palavra longa precisa de ponto de quebra.** E-mail, endereço de site e código longo não quebram sozinhos: no tablet, o e-mail do rodapé do Atlas saía da tela (03.10.2026). A quebra vai depois do "@" (`<wbr>`), ou o vínculo leva `overflow-wrap: anywhere`. **Como conferir:** régua, bloco 1, em todas as larguras.

---

## 3. O espaço

**Regra.** Todo espaço é **múltiplo de 4 px**, pelos utilitários do Tailwind, **sem colchetes**. Meio degrau (`2.5` = 10 px) só em valores pequenos. Diretrizes de Design Premium, regra 2; decisão do usuário de 03.10.2026, ratificada em 08.10.2026.

**Objetivo.** Espaço numa escala só dá ritmo e alinhamento sem medir à mão; o valor solto (22 px, 38 px) desalinha.

**Como fazer.**
- **No Tailwind 4, a escala é contínua:** `p-18` (72 px) e `pt-38` (152 px) existem, sem colchete.
- **Ajustes tipográficos em `em`**, posições em `%` dentro de figuras e `env()` da área segura são permitidos.
- **Recuo dos cartões:** `p-8 md:p-10`. Um filho nunca tem mais recuo que o pai.
- **O passe das diretrizes no Atlas (03.10.2026).** Mudou: três famílias e 62 tamanhos viraram uma família e sete degraus; a margem lateral foi de 22 para 24 px; a pílula do cabeçalho, de 56 para 52 px; as caixas empilhadas ficaram a 16 px uma da outra; o texto do menu passou de ~15 para 14 px. Conferido pela régua nas sete páginas, a 390 e a 1440 px: uma família, nenhum tamanho fora da escala, nenhuma sombra pesada, nenhum espaço fora da grade, nenhuma rolagem lateral; o script inicial ficou igual (±0,2 KB), o CSS ficou 0,8 KB menor e a fonte baixada foi de 52,5 para 22,9 KB. O contraste do menu não foi remedido pixel a pixel, porque o vidro e as cores não mudaram.
- **Ritmo vertical.** As medidas verticais em múltiplos da entrelinha do corpo, quando possível (Rutter, https://24ways.org/2006/compose-to-a-vertical-rhythm/) [V].
- **Respiro entre seções.** O do Atlas: 96 px no celular e 144 px na mesa.
- **As medidas do Atlas** (caso de referência; especificação do site, seção 3, no repositório do Atlas): coluna de 1.120 px com margem lateral de 24 px (40 px a partir de 768 px; até 03.10, 22 px, fora da escala de 4 px); seção com 96 px de respiro vertical (144 px a partir de 768 px; em 02.10 eram 112 e 160, e antes, 96 e 128); 64 px entre a abertura da seção e o conteúdo (80 px a partir de 768 px); cabeçalho de 72 px, com a pílula de 52 px (até 03.10, 56 px) e o logotipo com 31 px de altura visível (34 px a partir de 768 px); ação principal com 48 px de altura e texto de 16 px.
- **Duas seções seguidas no mesmo tom não somam respiros.** A segunda começa sem o de cima, para que o intervalo entre dois conteúdos seja um respiro só. No Atlas, uma regra global:
  ```css
  section[data-tom="claro"] + section[data-tom="claro"] { padding-top: 0; }
  ```
  Em Para quem havia ~320 px entre duas seções antes dela.

**Espaçamento com ritmo, não monótono.**
- **Agrupar com espaço apertado** o que é do mesmo grupo e **separar com folga** os grupos.
- **Mais espaço acima do título que abaixo:** o título se prende ao que apresenta (Impeccable, `heading-rhythm`; piso de ofício) [FU].
- **O mesmo espaço em toda parte, sem ritmo, é marca de IA** (Impeccable, `monotonous-spacing`) [FU].

**Como conferir.**
- **RATIFICADO:** a regra do ESLint em `../qualidade/03-estatica.md`, seção 3, acusa espaçamento entre colchetes (`p-[18px]`), primeiro como aviso. Há ajustes legítimos: as posições em % das figuras, os `env()` da área segura, os ajustes em `em`.
- **Enquanto ela não é adotada,** a busca lista os candidatos para a revisão:
  ```bash
  grep -rnoE "(^|[ \"'`:])-?(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y)-\[[^]]+\]" app components
  ```
  No repositório do Atlas, em 08.10.2026, ela achou doze. Quase todos são legítimos: `env()` da área segura, ajustes em `em`, `svh` e `calc()` de leiaute. Os restantes, em px, estão nas miniaturas de tela.

---

## 4. A hierarquia

**Regra.** Em cada tela:
- **um ponto focal**;
- **no máximo dois elementos grandes**;
- **no máximo três tamanhos de tipo**.

(NN/g, hierarquia visual: https://www.nngroup.com/articles/visual-hierarchy-ux-definition/ [V].)

**Objetivo.** O olho precisa saber onde começar. Muitos elementos grandes competem e nenhum ganha.

**Como fazer.**
- **O ponto focal da primeira tela** é o que o negócio é, ou o momento-assinatura. Nunca os dois brigando.
- **Contraste de escala entre seções** (leiaute editorial): uma seção com um número enorme e pouco texto, a seguinte com texto em coluna. Sempre na mesma grade.
- **Simetria nas peças paralelas** (pedido do usuário de 02.10.2026, "simetria maior"; aplicado no site do Atlas em 02 e 03.10; ratificado em 08.10.2026): peças do mesmo nível, lado a lado, têm a mesma largura e a mesma altura, e o dado de cada uma fica na mesma linha (as portas do início, os aparelhos da vitrine, as colunas do rodapé, o cabeçalho). **Objetivo:** tamanhos diferentes em peças iguais se leem como erro, ou como uma hierarquia que não existe. **Não confundir com centralizar:** a capa inteira centralizada é marca de IA (`11-anti-ia.md`, L1); a simetria é entre peças do mesmo nível.

**Como conferir: o teste do desfoque.** Desfoque a captura (ou aperte os olhos): o que continua legível é o que manda. Se mandam três coisas, não manda nenhuma.

---

## 5. Como se lê

**Regra.** Desenhar para a leitura em **"bolo de camadas"**: o olho pula de título em título e só entra no texto do que interessa.

**Objetivo.** Na web, quase ninguém lê de cima a baixo. Diante de um paredão de texto, o olho faz o "F": lê o começo das primeiras linhas e desce pela margem (NN/g, https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/) [V].

**Como fazer.**
- **Títulos que dizem o conteúdo**, com a **palavra-chave na frente** ("Corte e barba: R$ 70", não "Conheça nossos serviços").
- **Negrito nas palavras-chave** do texto, com parcimônia.
- **Alinhado à esquerda.**
- **Centralizar só blocos de até três linhas.** A capa inteira centralizada está entre as marcas de página gerada (`11-anti-ia.md`, L1).
- **Nunca justificar** (`05-tipografia.md`, seção 8).
- **Medida de 45 a 75 caracteres** (`05-tipografia.md`).
- **Parágrafos curtos.** Uma ideia por parágrafo e cada fato uma vez (`10-texto-e-conteudo.md`).

---

## 6. A primeira tela

**Regra.** A primeira tela, no celular (360 e 390 px) e na mesa, diz:
1. **o que o negócio faz**, numa frase (o *tagline*);
2. **onde fica**, quando o negócio é de bairro;
3. **de uma a quatro tarefas centrais**, com a **ação** (WhatsApp ou telefone) à vista;
4. **o contato**, sem tela de abertura.

Diretrizes G2, G4, G12 e G85 da NN/g (https://www.nngroup.com/articles/113-design-guidelines-homepage-usability/) [V].

**Onde fica a ação:**

| Onde | Limite | Origem |
|---|---|---|
| Celular | Até **60% da altura** da primeira tela | Medição das referências, setembro de 2026 |
| Mesa | Até **45% da altura** da primeira tela | Idem. A primeira ação do restaurante de exemplo de setembro estava a **620 px**, contra **16 a 46 px** nas referências |

**Objetivo.** O que está acima da dobra recebe **57%** do tempo de olhar; as duas primeiras telas, **74%** (NN/g, estudo na mesa, https://www.nngroup.com/articles/scrolling-and-attention/) [V].

**Como fazer.**
- **Nos sites de marca, a ação principal** é o WhatsApp com mensagem pronta ou o telefone (`14-funcionalidades/01-base-de-todo-site.md`).
- **Conversão e confiança no negócio local.** A NN/g não estudou sites de negócio local; o que segue estende as pesquisas dela sobre página de contato e página inicial [NV].
  - **Contato:** nome, endereço, telefone e horário no início e no contato; o horário ao lado do telefone; o endereço com vínculo para o mapa; o prazo de resposta publicado e cumprido (https://www.nngroup.com/articles/contact-us-pages/) [V] (`14-funcionalidades/01-base-de-todo-site.md`, seções 2 a 4 e 8).
  - **Sinais de confiança** (https://credibility.stanford.edu/guidelines/index.html; https://www.nngroup.com/articles/trustworthy-design/) [V]: endereço e CNPJ (o Decreto 7.962/2013, art. 2º, exige os dois onde se oferece contrato ao consumidor: `17-conformidade-e-normas.md`, seção 3.1) [V]; gente de verdade e as credenciais dela; preço onde o conselho permite; promoção contida e nenhum erro; avaliações do Google, de fora do site, em que se confia mais do que no depoimento do próprio negócio (`14-funcionalidades/06-presenca.md`).
- **No celular, se o cabeçalho tem espaço,** a ação fica nele, além da capa. Lição da barbearia de exemplo: o botão "Agendar horário" some abaixo de 640 px (`hidden sm:inline-flex`), e a primeira tela do celular fica sem ação nenhuma. A régua acusa como aviso, e a correção está à espera da decisão do usuário.
- **Nada de tela de abertura, contagem ou carregamento** antes do conteúdo: "a tela de abertura precisa morrer" (G85).

**Como conferir.** A régua mede onde termina a primeira ação, como fração da altura da tela, no celular e na mesa (bloco 6, aviso).

---

## 7. A ordem da página e a altura

**Regra.** A ordem das seções responde, nesta sequência, ao que o visitante quer saber: **o quê → onde → quando → quanto → contato**. Celular com **no máximo 16 telas** de altura.

**Objetivo.** Responder na ordem das perguntas evita que o visitante procure. Página longa demais esconde o contato.

**Como fazer.**
- **O valor antes do preço.** Com o preço primeiro, a decisão gira em torno de quanto o produto vale pelo dinheiro; com o produto primeiro, em torno de quanto ele é desejado (Karmarkar, Shiv e Knutson, *Journal of Marketing Research*, 2015, https://doi.org/10.1509/jmr.13.0488) [FU]. Na ordem do início do Atlas: capa → destaques → os passos do trabalho → o orçamento → a condição de fundação → as portas → a chamada final.
- **Os outros fundamentos da ordem** (o início do Atlas, 03.10.2026; `web/CLAUDE.md`, no repositório do Atlas) [FU]:
  - **Posição serial** (Murdock, *Journal of Experimental Psychology*, 1962): o primeiro e o último itens de uma sequência são os mais lembrados. A capa leva só o essencial, e a chamada final repete a ação.
  - **Pé na porta** (Freedman e Fraser, *Journal of Personality and Social Psychology*, 1966): quem aceita um pedido pequeno aceita mais facilmente o grande. Um passo pequeno do visitante (ver os passos, montar o orçamento) vem antes do pedido de contato.
  - **Escassez verdadeira junto do preço** (Worchel, Lee e Adewole, *Journal of Personality and Social Psychology*, 1975): o que é escasso parece valer mais. No Atlas, a Condição de Fundação (três vagas reais) vem logo depois do orçamento. **Só escassez verdadeira:** contador regressivo e urgência artificial são vedados (`00-principios.md`, princípio 1).
  - **A ordem do argumento da ata** (IV.1): padrão de execução, eficiência, preço declarado.
- **Cada fato uma vez.** Repetir o mesmo fato em três seções (a barbearia de setembro dizia "trinta anos" três vezes) alonga a página sem dizer nada.
- **A estrutura de páginas de cada nicho** está em `nichos/<nicho>.md`; o número de páginas, em `03-planos.md`.
- **A dobra de altura** (ESTEIRA v2.1, bloco 6, no repositório do Atlas, sobre as referências medidas em setembro de 2026; RATIFICADO): a primeira seção ocupa no máximo 1,5 tela, e uma amostra de valores (um preço, ou a duração onde o preço é vedado) aparece acima da dobra; um título como "Corte e barba: R$ 70" já é a amostra. A régua mede a ação e as 16 telas (bloco 6), não a primeira seção nem a amostra.

**Como conferir.** A régua mede a altura em telas no celular (bloco 6, aviso acima de 16).

---

## 8. O celular tem disposição própria

**Regra.** Peça que não cabe no celular ganha **disposição própria**; **nunca só encolhida**.

**Objetivo.** Encolher deixa a peça ilegível ou faz a página rolar para o lado. A disposição própria se desenha no passe do celular, depois da porta da mesa, com foco total, e leva junto a versão de toque de cada momento premium (`00-principios.md`, seção 5; `09-movimento.md`, seção 11). No site do Atlas, vale a ordem do `CLAUDE.md` dele (celular primeiro).

**Como fazer** (soluções que já funcionaram no Atlas e nos sites de exemplo):

| Peça | No celular |
|---|---|
| Lista de peças paralelas (portas, públicos, planos) | Galeria de deslizar, com trilho do avanço; a grade do computador vem com o prefixo do ponto (`md:grid`) |
| Régua do prazo | Régua com legenda (os nomes colidiam) |
| Conta do orçamento | Em coluna |
| Tabela | Em fichas |
| Preço | Com o "R$" em cima do número: o degrau estreito partia "R$ 1.500" em duas linhas |
| Carta de preços com pontilhado | O preço desce para a linha de baixo, à direita (nutrição de exemplo, 07.10.2026: em 320 px, "Acompanhamento" e o preço empurravam a página 50 px para o lado) |
| Código de barras do talão | Menor no celular (`w-28 sm:w-36`) |
| Menu | Tela cheia, com as páginas e as ações |
| Botão de ação dentro do menu (o WhatsApp) | Tamanho padrão do botão: com `text-corpo` (17 px), o botão do WhatsApp do menu estourava a largura a 320 px (03.10.2026) |
| Atalho flutuante (WhatsApp) | Recolhe ao rolar para baixo e volta ao rolar para cima; só depois da primeira tela, para não cobrir o texto |

**Galeria de deslizar.** Elementos além da borda dentro de um contêiner que rola **não** são transbordo. Os cartões não ficam colados na borda do contêiner de um lado e com recuo do outro (Impeccable, `edge-flush-cards`) [FU].

**Como conferir.** A régua mede onze larguras de toque (320, 360, 375, 390, 414, 430, 480, 600, 768, 820 e 1024 px) e três de mesa (1280, 1440 e 1920). Falha com rolagem lateral, elemento que sai da tela sem contêiner e alvo de toque abaixo de 44 px.

---

## 9. Paridade entre mesa e celular

**Regra.** **O que existe na mesa existe no celular**: o mesmo fato, o mesmo vínculo, a mesma credencial.

**Objetivo.** O celular é de onde vem a maior parte do tráfego. Em setembro de 2026, a credencial profissional sumia do cabeçalho abaixo de 480 px em onze dos doze demos. Nos nichos regulados, essa linha carrega o CRM, CRO, CRP, OAB, CRECI ou CRN, e o conselho exige que ela esteja visível.

**Como fazer.**
- Credencial, horário e contato em todas as larguras.
- **Efeito que depende só de ponteiro** (hover, inclinação, luz do cursor) **não carrega informação:** não há ponteiro em tela de toque.

**Como conferir.** A régua compara os títulos e as ações do conteúdo na mesa e no celular (bloco 7, aviso).

---

## 10. O que denuncia uma composição gerada

Detalhes em `11-anti-ia.md`; aqui, os de composição:

| Marca | Fonte |
|---|---|
| Capa centralizada com título, parágrafo e dois botões, numa sans genérica | Krebs, 2026, https://www.adriankrebs.ch/blog/design-slop/ [FU] |
| Número grande com legenda pequena, estatísticas de apoio e acento em degradê, como capa ou faixa | skill `frontend-design` da Anthropic; piso de ofício do Impeccable [V] |
| Conteúdo picado em cartões iguais (ícone, título, texto), com o mesmo raio e a mesma sombra | Anthropic [V]; Impeccable, `icon-tile-stack` [FU] |
| Rótulo pequeno em caixa-alta acima de todo título; numeração 01/02/03 em conteúdo que não é sequência | Anthropic [V]; Impeccable, `kicker-above-heading`, `numbered-section-labels` [FU] |
| Uma coluna que passa muito da dobra enquanto a vizinha cabe numa tela | Impeccable, `first-viewport-column-overflow` [FU] |
| Texto colado na borda da tela, sem recuo (menos de 16 px; 12 px em telas de até 480 px) | Impeccable, `body-text-viewport-edge` [FU] |
| Texto pintado por baixo de outra camada | Impeccable, `text-occlusion` [FU] |
| A mesma frase três vezes no mesmo cartão | Impeccable, `repeated-container-text` [FU] |
| Contêiner que recorta (`overflow: hidden`) o balão ou o menu que precisa sair dele | Impeccable, `clipped-overflow-container` [FU] |

**Numeração só quando o conteúdo é sequência.** "01 · Visita, 02 · Rascunho" no trabalho do Atlas é sequência e vale. "01 / 06 — Para quem" nas páginas, não (`11-anti-ia.md`, linha de base).

---

## 11. Lista de conferência

1. Estrutura e navegação convencionais; a diferença está na camada da marca.
2. Grade com colunas em `minmax(0, 1fr)`; `grid-cols-1` explícito no celular; `nowrap` só em valor curto.
3. Espaço em múltiplos de 4 px, sem colchetes; respiro entre seções padronizado; seções do mesmo tom sem respiro dobrado.
4. Mais espaço acima do título que abaixo; grupos apertados, separações folgadas.
5. Um ponto focal por tela; até dois elementos grandes; até três tamanhos; teste do desfoque.
6. Títulos com a palavra-chave na frente; alinhado à esquerda; centralizado só até três linhas; nada justificado.
7. Primeira tela: o que é, onde fica, a ação até 60% (celular) e 45% (mesa), o contato.
8. Ordem: o quê → onde → quando → quanto → contato; até 16 telas no celular.
9. Disposição própria no celular para tudo o que não cabe; nada encolhido até ficar ilegível.
10. Paridade: credencial, contato e fatos iguais na mesa e no celular.
11. Nenhuma das marcas da seção 10 sem motivo escrito.

---

## Fontes citadas

- Tuch et al., 2012, primeira impressão: https://doi.org/10.1016/j.ijhcs.2012.06.003
- NN/g: hierarquia visual, padrão em F, rolagem e atenção, 113 diretrizes da página inicial — https://www.nngroup.com/articles/visual-hierarchy-ux-definition/ · https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/ · https://www.nngroup.com/articles/scrolling-and-attention/ · https://www.nngroup.com/articles/113-design-guidelines-homepage-usability/
- Android, classes de janela: https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes
- Tailwind, pontos de quebra: https://tailwindcss.com/docs/responsive-design
- Rutter, ritmo vertical: https://24ways.org/2006/compose-to-a-vertical-rhythm/
- Andy Clarke, direção de arte para a web: https://www.smashingmagazine.com/2019/04/art-direction-release
- Karmarkar, Shiv e Knutson, 2015, o preço primeiro: https://doi.org/10.1509/jmr.13.0488
- Impeccable: https://github.com/pbakaus/impeccable

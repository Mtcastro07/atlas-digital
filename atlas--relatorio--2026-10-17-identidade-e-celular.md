# Relatório · a identidade mais profunda do Atlas e o celular (16 e 17.10.2026)

Pedido de Matheus Castro Oliveira de Luna Garcia, que aprova os sites, em 16.10.2026:

> "Quero que você adicione mais detalhes visuais dentro do site do Atlas, de forma que o deixe mais único; sinto que está muito simples e sólido. Quero uma identidade mais profunda, não querendo dizer em componentes, mas no design do próprio site. Depois de fazer essas atualizações, quero que você atualize também o site no celular, construindo-o de forma que fique o melhor possível, pois sinto algumas faltas, como problemas na sombra do WhatsApp, no botão dele, carrosséis fora do centro, e derivados. Mas busque deixar um design mais profundo e detalhado, mesmo que seja contra alguma ata sobre o site. Ao final, novamente, passe o relatório, faça commit, push dentro da main."

Este é o relatório desse lote. O anterior, do SEO e do GEO, segue em `atlas--relatorio--2026-10-16-busca-e-ias.md`. Os sites de demonstração não mudaram, e o SEO e o GEO de 16.10 continuam intactos.

**Como foi feito:**
1. **Os diagnósticos:** dois, sem editar nada, um da mesa e um do celular.
2. **A direção de arte:** duas propostas e um juiz que escolheu uma e enxertou o melhor da outra.
3. **A construção:** quatro passes:
   - o sistema e o início;
   - as seis páginas internas;
   - o celular;
   - os ajustes e o corpo do início, refeito.
4. **Dois fechamentos com o Impeccable a 100%:** cada um com as avaliações A e B isoladas, o mapa de convergência com o kit anti-IA e a correção (`producao/qualidade/15-revisao-do-impeccable.md`).
5. **A conferência final e as correções do coordenador** (seção 7).

O registro detalhado, cena a cena e com todas as medidas, está em `registros/atlas/despoluir.md`, nas seções "Identidade mais profunda", "Passe 4" e "Segundo fechamento com o Impeccable". As capturas de antes e depois ficaram no rascunho da sessão.

---

## 1. Por que o site lia "simples e sólido"

O diagnóstico da mesa mediu o que o senhor sentiu:
- **Os fundos eram chapados.**
  - **Nas cenas do Atlas:** mediana de **63% dos pixels numa só cor**.
  - **Nos sites de nicho do próprio Atlas:** mediana de **21%**.
  - **O que o sistema já tinha e quase não usava:** a luz, o grão e o navy profundo. Só o Fim os aplicava.
- **A luz não vinha de lugar nenhum.** Nenhuma cena tinha luz de um lado nem sombra coerente com ela.
- **O mundo da marca aparecia em arame:**
  - a esfera, o globo e a trena eram traços de 1 a 2 px;
  - o bronze nunca virava metal;
  - **a vitrine da agência saía mais pobre que os produtos que ela vende.**
- **A tipografia parava de crescer cedo:** 80/56 px, iguais a 1440 e a 1920 px.
- **As emendas entre as cenas eram cortes retos:** nenhuma peça atravessava de uma cena para a seguinte.
- **O despoluir de 14 a 16.10 tirou a série de efeitos, e com razão.** O que entrou no lugar, porém, foi o filete de 1 px sobre o fundo liso, que é a marca P2 do kit, a página chapada.

## 2. A direção: o Atlas é um atlas

**A tese:** um livro de mapas gravados em metal, aberto em Niterói.

**A matéria:**
- **o navy** é a água da carta, com rampa e grão;
- **a névoa** é o papel, com fibra;
- **a pedra** é o segundo tom claro, novo;
- **o bronze** é o metal do instrumento, nunca o texto.

**A luz:** um dia em Niterói, na ordem das folhas. Cada página tem a sua hora e **um só pico de luz**:
- o início vai da madrugada ao amanhecer;
- /para-quem tem a manhã cedo, /planos a manhã e /orcamento o meio-dia;
- /o-trabalho tem a tarde, /o-atlas o fim da tarde e /duvidas a hora azul.

A convenção é a da carta: a manhã vem da direita (o oceano), o fim da tarde da esquerda (a baía), e toda sombra cai do lado oposto.

**O desenho:** tudo o que se desenha é dado, e nada é figura inventada:
- a coordenada;
- a costa do OpenStreetMap;
- a graduação em minutos de arco;
- a geometria da projeção;
- o logotipo.

**A disciplina:**
- cada objeto, borda, fio ou metal fica num lugar só;
- a regra da série continua valendo.

A outra proposta (a matéria e a luz da baía ao pôr do sol) foi recusada como base: a capa dela dependia de figura desenhada (os morros e o sol), vedada pelo kit desde 12.09. Dela vieram a física e a disciplina:
- o pico único de luz;
- a pedra;
- a elevação do cartão escuro;
- a frente e o verso dos arames;
- a pílula de metal;
- os aros do atalho do WhatsApp sobre o navy;
- a fila centrada das galerias.

## 3. O que mudou no sistema

| Camada | O que é agora |
|---|---|
| **Cor** | O tom `pedra` (`#e9e2d9`), que alterna com a névoa sem ir ao navy. O cartão escuro mais claro (`#1a395b`), que se destaca do fundo. O tom `branco` saiu como campo de cena. O vínculo nos tons claros passou a `#7a4e1c` (seção 7) |
| **Matéria** (`.vd-materia`) | Grão no navy, fibra de papel na névoa (fibras curtas, grão fino e nuvens de polpa, no lugar da fibra deitada, que lia como metal escovado) e grão grosso na pedra. É o tom, e não um efeito: aparece onde o tom aparece |
| **Luz** (`.vd-cena`, `.vd-papel`, `data-hora` em cada página) | Um pico por página, com direção e em `oklch`. A rampa de repouso na água. As sombras saem do lado oposto à luz da página |
| **Metal** (`.vd-metal`) | A pílula de ação em bronze fundido, estática |
| **Frente e verso** | A esfera, o globo e o anel têm a metade da frente e a de trás (o arame ganha espessura de espaço) |
| **Tipografia** | Exibição até 96 px e título até 72 px (antes 80/56). Coluna fluida até 1.344 px a 1.920 |
| **Fólio** | "0N / 06" e o nome da página: no canto de cima na mesa e abaixo do lide no celular, na tinta apagada |

## 4. Página por página

| Página | A peça e o momento |
|---|---|
| **Início** | **Capa:** a luz da madrugada; a esfera armilar de bronze, com frente e verso e o anel graduado de 5 em 5°, que pousa no papel da cena seguinte com sombra de contato. **Destaques:** o aparelho da odontologia com chão e luz, e os dois fatos ao lado. **Passos:** a **derrota**, o rumo das quatro etapas como numa carta náutica, com as estações e as durações como cotas de desenho técnico (24 h; 7 a 15 dias úteis), no lugar das quatro caixas. **Montador:** o título em duas linhas (antes cinco), o painel que sobe sobre a água e o filete duplo sob os totais. **Fundação:** o **carimbo**, o bloco de campos do canto de uma prancha, no lugar do cartão centrado. **Portas:** a **folha dobrada**, as seis casas como uma carta dobrada em sanfona, cada painel aceso ou sombreado pela dobra. **Fim:** o **horizonte**, com a luz fria subindo e o sol ao meio, sob a ação principal; o reflexo do título a cada 8 s fica |
| **/para-quem** | A **carta náutica de Niterói**, do OpenStreetMap: a costa, três linhas de profundidade, a terra mais clara que a água, os três bairros dos sites de exemplo com o ponto aceso pelo nome da lista e o crédito "© colaboradores do OpenStreetMap". Os dados ficam no código (5,6 KB): o site não faz pedido externo. Os **nichos atendidos** voltam em linha parada sob os públicos (seção 7) |
| **/planos** | A **escada de pedra** ao sol da manhã, com a face de cima acesa e, a partir de 1.024 px, as sombras dos degraus no papel. "Recomendado" virou uma cartela de metal na borda do cartão. O extrato da fundação virou lançamento, na letra da linha |
| **/orcamento** | A luz do meio-dia e a chapa afundada dos totais, uma superfície só (antes, três caixas aninhadas) |
| **/o-trabalho** | A **trena dos dias úteis** sobre a quadrícula, com sombra curta, e as notas à margem presas ao nome de cada etapa por um fio |
| **/o-atlas** | A **moldura graduada** em minutos de arco, com as coordenadas de Niterói, e o **globo gravado**, com frente e verso, hachura no lado da noite e o ponto de Niterói. A partir de 768 px, o globo atravessa para o papel, onde se abre a grade de uma projeção cônica. Em Quem faz, na pedra, o A do logotipo refratado no vidro de "Atlas sustentava o mundo" |
| **/duvidas** | A **rosa das perguntas**, em quatro quadrantes: a agulha aponta o quadrante da palavra sob o ponteiro, e o toque abre a resposta. Na mesa, a abertura se dissolve no papel |
| **404** | A matéria do resto do site, e "Erro 404" só para o leitor de tela |

## 5. O celular

Medido antes e depois a 320, 360, 390 e 768 px, com toque emulado:

| | Antes | Depois |
|---|---|---|
| **Sombra do WhatsApp cortada pela borda** | 31 de 31 amostras | **0 de 31** |
| **Folga do WhatsApp** (direita e base) | 16 e 16 px, sem área segura | **24 e 24 px**; 46 px com a área segura; aparelho deitado, 59 e 33 |
| **Sombra do WhatsApp** | A mesma preta no papel e na água ("lama" no navy) | O atalho lê o fundo atrás dele: sombra curta tingida de navy no papel; dois aros finos e um fio de luz na água, sem sombra |
| **WhatsApp ao rolar para baixo** | Sumia com o cabeçalho: nenhuma ação de contato à vista | **À vista nos dois sentidos**; some só sobre a capa, os montadores, a fundação e o Fim, onde a cena já tem o vínculo do WhatsApp |
| **Cartão do carrossel contra o centro da tela** | −27 a +27 px | **0 px** em toda parada, do primeiro ao último cartão |
| **Vizinho visível** | Lasca de 4 px de um lado e 52 a 59 px do outro | **32 px dos dois lados** (44 px nas portas, que se tocam) |
| **Galeria dos planos** | Abria no Essencial | Abre no **recomendado, centrado**. A 768 px, dois cartões por vez |
| **Trilho** | Andava com a rolagem | Um segmento por cartão, de 3 px |
| **Menu** | O logotipo saltava ao abrir; a 320 × 640, a lista rolava | O logotipo fica no mesmo lugar, e as sete linhas cabem. Abaixo de 360 px, a pausa vai para o menu, com o rótulo dela |
| **Cabeçalho** | Lia "escuro" sobre o claro num gesto curto para cima | Lê o fundo real, na posição de repouso |
| **Fólio** | Solto no pé da abertura, à direita | Abaixo do lide, à esquerda |
| **Alvos de toque abaixo de 44 px** | — | 0 nas sete páginas |
| **Letra a 200%** (390 px) | Rolagem lateral em quatro páginas; 13 recortes no início, 4 em /planos e 3 em /o-atlas | Nenhuma rolagem lateral; nenhum texto cortado, medido nó a nó |

Mais:
- as cenas compostas para o celular: a esfera em sangria, a derrota com a lista numerada e a folha dobrada em tira;
- a área segura dos lados no aparelho deitado;
- o recuo da fundação abaixo de 360 px;
- o aparelho dos destaques de 172 a 240 px.

## 6. O fechamento com o Impeccable (duas rodadas)

**As notas:**
- **Primeiro fechamento, depois dos três passes:**
  - Nielsen 26/36;
  - auditoria 16/20, sem P0 nem P1.
- **Segundo fechamento, depois do passe 4:**
  - Nielsen 27/36;
  - auditoria 16/20, sem P0;
  - os dois P1, ambos da letra a 200%, foram corrigidos.
- **O detector, nas sete páginas:**
  - 75 achados a 1.440 px e 79 a 390;
  - **nenhum real**: todos são falsos positivos ou identidade aprovada;
  - no código, 0.

**O que se descobriu.** De novo, quase tudo o que foi real veio da avaliação A (a crítica de design isolada) e da conferência, e não do detector.

A pergunta central foi feita duas vezes à avaliação A:
- **No primeiro fechamento:** "em parte profundo, em parte ainda simples e sólido", com as aberturas próprias e o corpo do início no molde (13 números grandes em quatro cenas, a faixa corrida, as caixas). **Por isso houve o passe 4**, que refez o corpo do início.
- **No segundo:** as aberturas e a primeira metade do início são "profundas e próprias; nenhum outro produto usaria essas peças sem mudar nada". Ainda leem como molde os corpos de /orcamento (o formulário em cartão), /duvidas (a sanfona) e /para-quem (o seletor da vitrine). Os de /planos e /o-atlas foram corrigidos no segundo fechamento.

**O mapa de convergência com o kit anti-IA, resumido:**

| Coluna | O que entrou |
|---|---|
| **Converge** (o Impeccable e o kit) | O número grande em série (L2); a faixa corrida (K4); o rótulo acima do título (T2); o mesmo texto das etapas em duas páginas (documento 20); as caixas aninhadas dos totais (L4); a folha das portas como seis cartões iguais (L3); o vidro dentro do bloco navy (L4); a letra a 200% cortada (Q16). Tudo corrigido, menos o trio de preços e o 01 a 04 de /o-atlas, que estão com o senhor |
| **Só o Impeccable** | A carta cortada numa reta e com a terra escura; a passagem de /duvidas como faixa cinza; o Fim em cinza-lama; a derrota no celular, com o valor longe da unidade; os vazios sem função; os dois WhatsApp um sobre o outro; o jargão "camada de movimento". Tudo corrigido, e seis marcas novas foram para o kit (seção 8) |
| **Só o kit** | A caixa-alta nos rótulos (T3); o plano acima do nome no simulador (T2); o ponto médio como separador (K1): corrigidos. Os aforismos (X1) seguem com o senhor |
| **Contradiz** | As portas como índice de miniaturas das figuras, sugestão do Impeccable que repetiria as figuras das outras páginas (documento 20): não adotada. O halo da esfera, a onda do "24h", o reflexo do Fim, a graduação da trena e as sombras navy sobre o papel: identidade aprovada, contra as regras genéricas do detector |

## 7. A conferência final e as correções do coordenador

A régua e o texto do robô, rodados no build de produção, acharam quatro coisas que os passes não tinham visto:

1. **A lista dos nichos tinha sumido do site.** A faixa corrida saiu, corretamente, pela marca K4 do kit (o letreiro). Com ela, porém, saíram os únicos lugares onde estavam os nichos atendidos: barbearia, imobiliária, material de construção, medicina, nutrição, odontologia, oficina mecânica, pet shop, pilates e academia, psicologia e restaurante. Isso é texto que a busca e as IAs leem ("site para psicólogo em Niterói"). **Voltou em linha parada** sob os três públicos de /para-quem e no `llms.txt`. É o mesmo conteúdo de antes, sem afirmação nova (`conteudo/site.ts`, `paraQuem.nichos`).
2. **A régua media o bronze do atalho do WhatsApp como fundo do texto.** Ela já pulava o texto coberto por outra camada, mas olhava só o centro de cada linha. Agora que o atalho fica à vista ao rolar para baixo, ele cobria a ponta de linhas a 390 px, e a régua acusava 2,39 a 2,80:1. A conferência da cobertura passou a olhar as duas pontas e o centro (`ferramentas/regua/contraste.mjs`, e a mesma mudança na régua do kit).
3. **O bronze dos vínculos nos tons claros perdeu margem com a fibra nova do papel.** Medido nos pixels, `#8a5a24` dava de 4,2 a 4,9:1 no pior trecho. Os tons claros passaram ao bronze que a pedra já usava, `#7a4e1c`: 6,5:1 chapado na névoa. Era uma linha só em `app/globals.css`.
4. **O fólio de /planos, em bronze sobre o pico da luz da manhã,** dava 4,17:1 a 1.440 px. Ele passou para a tinta apagada, como o fólio de um livro. O padrão Atlas também pede o bronze só no que se toca (`19-o-padrao-atlas.md`, seção 5.1).

**A verificação:**

| Verificação | Resultado |
|---|---|
| `tsc` | 0 erro |
| Build de produção (`npm run build`, webpack) | Sem erro |
| **Régua, 50 páginas** (as sete do Atlas e as 43 dos sites de demonstração), no build de produção | **APROVA: 0 falha nas 50 páginas** (101 avisos). A barreira do travamento (390 × 844, CPU 4×): nas sete páginas do Atlas, maior tarefa de até 123 ms, bloqueio de até 73 ms e LCP de até 1,87 s; nas 50, de até 125 ms, 124 ms e 3,5 s. Em todas, 0 quadro lento e CLS de até 0,005. No fechamento de 16.10, eram 270 ms, 299 ms e 3,9 s |
| Testes dos sites de demonstração | 44 de 44 (odontologia 15, restaurante 10, pet shop 13, barbearia 6) |
| Texto que os robôs leem | 0 palavra colada nas sete páginas do Atlas; títulos íntegros; JSON-LD válido (WebSite e LocalBusiness no início, Organization em /o-atlas, FAQPage em /duvidas); o aviso de ficção junto dos nomes fictícios. As 43 palavras coladas da /demos/odontologia são antigas (a página tem `noindex` e fica fechada aos robôs de IA) |
| Pausa das animações (`conferir-pausa.mjs`) | Nenhuma animação infinita continua depois do botão, nas sete páginas do Atlas e nos seis sites de demonstração, a 1.440 e a 390 px |
| Sites de demonstração | Barbearia e nutrição sem nenhuma diferença de estilo calculado, a 1.440 e a 390 px, em cada passe |
| Rolagem lateral | Nenhuma, de 320 a 1.920 px, nas sete páginas |
| Contraste medido nos pixels | Nada abaixo de 4,5:1 no texto corrido nem de 3:1 no título grande |

## 8. O kit de produção

O kit (`producao/`) fica fora do controle de versão neste repositório. **Estas mudanças precisam ser levadas ao repositório do Atlas, com o registro em `documentacao/atlas--decisoes.md`:**
- **`esteira/11-anti-ia.md`, seis marcas novas, todas achadas só pela avaliação A:**
  - C14, a luz complementar em alfa baixo (o bronze sobre o navy vira cinza-lama);
  - C15, a emenda que vira névoa;
  - I8, a figura cortada pela caixa;
  - L10, o vazio sem função;
  - Q18, o valor longe da unidade;
  - Q19, o atalho flutuante sobre a mesma ação da cena.
- **`qualidade/15-revisao-do-impeccable.md`, seção 7, a calibração dos dois fechamentos:**
  - a letra a 200% se mede pelos retângulos de cada nó de texto, e não pela largura do documento, porque o `overflow-x: clip` de uma seção corta o texto sem alargar a página;
  - os falsos positivos novos do detector.
- **`qualidade/regua/contraste.mjs` e `qualidade/02-regua.md`:** a cobertura em três pontos de cada linha, na linha 18 da tabela de calibração.
- **`base/ferramentas/gerar-costa.mjs`, novo, registrado no README das ferramentas:** a carta náutica de um trecho de costa em vetor, do OpenStreetMap, para quando a cena pedir a costa. A cópia do site está em `ferramentas/gerar-costa.mjs`.

## 9. As atas revogadas pelo pedido de 16.10

Todas foram registradas, com o motivo, em `registros/atlas/despoluir.md`:
- **A capa** com "fundo liso, do tom" e a regra 3 das diretrizes de 03.10 ("nenhum degradê decorativo novo"): entraram a matéria e uma luz por página.
- **O teto de 80/56 px e a coluna de 1.120 px.**
- **O tom `branco` como campo de cena;** a linha entre filetes ficou em dois lugares, o extrato e a sanfona.
- **O "0X / 06" acima dos títulos,** que passou a fólio no canto.
- **As caixas dos passos que se empilhavam ao rolar** (pedido de 03.10): no lugar, a derrota.
- **O cartão centrado da fundação:** no lugar, o carimbo.
- **As seis portas como cartões:** no lugar, a folha dobrada.
- **O amanhecer como névoa no Fim:** no lugar, o horizonte.
- **A sombra do atalho**, "34 px a 55% de preto" (03.10), e o atalho que sumia ao rolar para baixo.
- **O globo atrás do vidro de "Atlas sustentava o mundo":** no lugar, o A do logotipo refratado.
- **O selo "Recomendado" no canto:** no lugar, a cartela na borda.
- **A faixa corrida dos nichos:** os nichos voltaram em linha parada.

**O que não se revogou:**
- a regra da série;
- a suspensão da figura desenhada;
- nenhum globo como marcador;
- os três bairros;
- o reflexo do título final;
- a onda do "24h";
- os tokens do movimento e a pausa;
- o SEO e o GEO;
- nenhuma afirmação nova no texto. Só houve reordenação: o título do montador passou a "Componha o orçamento.", com "O valor é apresentado na hora." abrindo o lide, e o lide de /planos diz "os efeitos de movimento", no lugar de "a camada de movimento".

## 10. O que fica com o senhor

1. **Os corpos de /orcamento, /duvidas e /para-quem,** que a avaliação A ainda lê como molde: o formulário em cartão, a sanfona e o seletor da vitrine. Refazê-los é um passe novo, como o passe 4 do início. Basta pedir.
2. **O trio de preços com o recomendado em navy,** em /planos. Recomendação: manter até o senhor ver; se mudar, os três como fichas de pedra.
3. **O crédito "© colaboradores do OpenStreetMap"** na carta de /para-quem: a licença ODbL o exige.
4. **Os itens que já estavam com o senhor:**
   - a condição de fundação em quatro páginas;
   - o 01 a 04 de /o-atlas;
   - o lide da capa ("briefing" é jargão para quem nunca contratou um site);
   - os aforismos em dois tempos;
   - o atalho só com o ícone quando a letra está a 200% (hoje ele ocupa 70% da largura nesse caso).
5. **O que estava aberto antes deste lote e continua aberto:**
   - a escolha do percentil da régua no texto misturado;
   - a confirmação da UFF;
   - o nome público de Gabriel;
   - os subdomínios;
   - o kit levado ao repositório do Atlas;
   - o que depende do dono: o Search Console, o Bing Webmaster, o Perfil da Empresa no Google e o IndexNow depois de publicar.

## 11. O que não foi verificado

- Safari, iOS e aparelho real: as áreas seguras foram simuladas no Chrome. A barra de baixo do Safari aberta, o modo de tela inicial e o `:active` no toque precisam de um aparelho.
- O leitor de tela.
- A letra a 200% no tablet e na mesa: a medida e a correção foram a 390 px.
- Navegadores sem degradê `in oklch` (Firefox anterior ao 127) veem as cenas escuras como navy chapado.
- O "teste do desconhecido" da carta, da escada de pedra, da folha de /o-atlas e da rosa: o juízo foi da avaliação A, não de uma pessoa de fora.

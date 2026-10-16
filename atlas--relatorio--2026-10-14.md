# Relatório · o celular dos sites, o pet shop, o Impeccable a repetição dentro do site e o fechamento com o Impeccable (13 a 16.10.2026)

Pedidos de Matheus Castro Oliveira de Luna Garcia, que aprova os sites de demonstração:

1. "Utilize um novo nicho e crie um novo site da categoria inicial, utilizando de todos os conteúdos dentro da produção" (13.10): o **pet shop**, plano Essencial.
2. "Foque unicamente em trabalhar na versão mobile dos sites restantes, como o odontologia, restaurante e pet-shop, e principalmente trabalhe no próprio site mobile do Atlas, como resolver animações etc. Depois de uma revisão do site no desktop, caso seja viável, busque utilizar as bibliotecas de componentes para enriquecer o site" (14.10).
3. "Retire todas as barrinhas laterais dos sites, que ficam na direita, para todas as versões no mobile, tanto do site principal quanto dos sites de nicho" (14.10).
4. "Verifique se o Impeccable está instalado e dentro das diretrizes anti-IA; caso não esteja, instale e comece a utilizar imediatamente, tanto para o site principal quanto para os sites de nicho" (14.10).
5. Este relatório na raiz, o commit e o push na branch (14.10).
6. "No site do pet shop, coloque na direita a barrinha no mobile, quando se aperta nas 3 linhas verticais" (14.10).
7. "Você está repetindo efeitos entre os sites de forma muito explícita, tente diversificar", com a retificação: "não tem problema em você usar os efeitos dentro dos sites, mas busque enriquecer também o site de nutrição, barbearia e material de construção; o que vejo é que você os está usando de forma repetitiva dentro dos sites, parecendo que você está spamando os mesmos componentes". E: "registre esse estudo dentro do arquivo de produção" (14.10).
8. Ao final, o commit, o push e o merge com a main (14.10).
9. O Impeccable no fechamento de cada site, cruzado com o kit anti-IA; o processo registrado no kit, com as mudanças feitas e o relatório no chat (16.10; seção 13).

Os registros de cada site (identidade, decisões, lapidação, capturas, relatórios de QA) ficam em `registros/demos/<site>/`, fora do git, como manda o `.gitignore`. Este relatório resume o que eles registram.

---

## 1. O site do Atlas no celular

Varredura das sete páginas a 390 × 844, com toque, quadro a quadro, e filmes com a CPU 4×. O que estava errado e o que mudou:

| Defeito | Correção | Arquivo |
|---|---|---|
| Na pilha das quatro etapas, o cartão coberto ficava translúcido e o texto do cartão de baixo vazava por ele | O cartão coberto escurece sob um véu opaco (`--apaga`), e não pela própria opacidade | `components/ilhas/pilha-de-passos.tsx`, `components/secoes/passos.tsx` |
| O cabeçalho recolhido deixava a sombra da pílula no topo da tela | Recolhido, sobe a própria altura e mais 2 rem | `components/ilhas/cabecalho-retratil.tsx` |
| O menu abria ~610 ms depois do toque na primeira vez (o `next/dynamic` suspendia, e o React segura a revelação do Suspense) | O painel carregado monta direto: abre em ~40 ms; as linhas entram em 560 ms (eram 1,1 s) e o painel desce em 300 ms (eram 450) | `components/ilhas/menu-celular.tsx`, `components/ilhas/painel-menu.tsx` |
| A luz de bronze dos blocos só existia com o mouse | No toque, a aresta e o orbe acendem no ponto tocado por 400 ms, e a faixa de luz atravessa a ação principal ao soltar o dedo (`09-movimento.md`, seção 11) | `components/ilhas/luz-do-cursor.tsx`, `app/vidro.css` |
| A esfera da capa ficava inteira atrás do texto, e só a bacia de baixo aparecia; a 768 px, o fundo dela era cortado em linha reta | No celular, a esfera passa da largura e emoldura o título em cima e embaixo, como na mesa; o tamanho fica limitado pela caixa da máscara (`container-type`), sem corte de 320 a 1920 px | `app/movimento.css` |
| A ação da capa terminava a 66% da primeira tela (o teto é 60%) | O bloco sobe ao centro óptico: 59% a 390 × 844 | `components/secoes/capa.tsx` |
| Nas aberturas das internas, o lide partia de opacidade 0, 320 ms depois (pendência da auditoria de 07.10) | O rótulo e o lide só se acendem a partir de 1024 px (`.mov-surge-mesa`) | `components/paginas/abertura-de-pagina.tsx`, `app/movimento.css` |
| Em Para quem, os nichos se soltavam dos bairros e a linha começava com o separador | Um bairro por linha, com o nicho na mesma linha de base | `components/paginas/figuras.tsx` |
| O foco que subia com Shift+Tab ficava sob o cabeçalho | `scroll-padding-top` na página | `app/globals.css` |
| O orbe de bronze lia cinza-ardósia sobre o navy (achado da revisão da mesa) | Um cobre fundo, `rgb(190 112 20 / 0.3)`: lê como luz quente; o lide sobre ele fica em 4,55:1 (antes, 4,63:1) | `app/globals.css` |

Conferido: nenhum transbordo, CLS 0 e nenhum erro nas sete páginas; a rolagem da inicial com a CPU 4×, mediana de 17 ms por quadro e só 2 quadros acima de 34 ms (o pior, 50 ms); a mesa (≥ 1024 px) igual, salvo o orbe e o véu da pilha, que valem nos dois.

## 2. A revisão da mesa do Atlas e o catálogo de componentes

Um agente novo, sem o histórico, revisou as sete páginas a 1280, 1440 e 1920 px e fez a triagem do catálogo (`producao/componentes/`).

**A conclusão sobre o catálogo:** nenhum pacote vale a instalação no Atlas. As peças que fariam sentido duplicam o que o site já tem (o vidro com refração, a inclinação, o orbe, o grão, a contagem) ou ainda não cumprem a regra dos 7 dias (Base UI 1.9 e model-viewer 4.4, de 09.10). Valem três técnicas, sem dependência, que **dependem da sua decisão** porque mudam cenas aprovadas:

1. O grão e a luz quente com direção em todos os campos navy (hoje, só na chamada final).
2. O traço de bronze que se desenha na abertura de cada página interna (hoje, todas entram do mesmo jeito).
3. A régua do prazo de O trabalho acompanhando a rolagem (`animation-timeline`, sem script).

**Os defeitos da mesa, a decidir** (não executados, porque mudam o desenho aprovado):
- cenas que voltaram à interface de modelo genérico: o montador do orçamento (cartão branco, rótulos em caixa-alta, cartão dentro de cartão), os três cartões de Para quem, o trio de preços, os passos em círculos de O trabalho e o acordeão de Dúvidas;
- a escala do texto não cresce nas telas largas (a 1920 px, a capa fica pequena), e o respiro é igual em toda seção.

## 3. O pet shop (plano Essencial)

**Banho e Tosa São Francisco**, painel C ("O cartão do balcão"), aprovado em 13.10. Construído do zero: fundação, três páginas mais as legais, integração, três rodadas de lapidação com um crítico de fora novo em cada uma, e a porta da mesa.

- **A mesa, no build de produção:** a régua com 0 falha e 0 aviso nas cinco páginas; a maior tarefa de 116 ms; a cor da inicial em 42% escuro, 31% claro, 7 viradas e 99,6% com cor (as quatro metas cumpridas, o claro a 0,8 ponto do piso); 12 de 12 testes.
- **O veredito do crítico de fora,** nas três rodadas: abaixo da nutrição e do restaurante no acabamento; na última, ainda lia um repertório que leva ao neobrutalismo. As correções da rodada 3 não passaram por um quarto crítico.
- **O passe do celular:** a tira numa linha, o menu num cartão de índice (`<dialog>`, que abre também sem script), a capa definitiva, a tabela de valores em fichas, sem nenhum texto passando da caixa de 320 a 820 px; a primeira ação a 18% da tela no início e a 6% nas internas; a mesa igual pixel a pixel a 1280 e 1440 px; o CLS da tira a 1024 px de 0,018 para no máximo 0,008. Detalhes em `registros/demos/pet-shop/lapidacao.md`.
- **A ligação com o Atlas:** o pet shop entra no simulador do plano Essencial, ao lado da nutrição.

## 4. A odontologia e o restaurante no celular

**Odontologia (Completo):** a placa da arcada em 3D agora fica atrás do título na primeira tela, como pede o roteiro (estava no pé da tela); a pasta numa linha, com o índice de tela cheia; o percurso pela boca em pilha; a linha do tempo de cada tratamento em coluna; os alvos de 44 px; a ação a 50% da primeira tela. Na revisão, corrigi dois defeitos que o passe deixou: o CEP ainda partido (o `text-wrap: balance` desfazia o "sem quebra") e o registro "CRO-RJ" partido no índice. A mesa igual nas 14 páginas; 15 de 15 testes.

**Restaurante (Profissional):** a porta numa linha e o menu numa lousa de tela cheia; a ação da capa de 85% para 59% da tela; a panela a giz de volta no celular; a inicial de 8.170 para 6.412 px; no pedido, o nome do prato inteiro e a tira da comanda presa embaixo, com o total. Na revisão, corrigi a placa do horário, que cobria o crédito do OpenStreetMap (obrigatório pela ODbL). A mesa igual, pixel a pixel; 9 de 9 testes.

## 5. As barras de rolagem

Abaixo de 1024 px, nenhuma barra à vista no Atlas e nos seis sites de nicho, numa regra só no fim de `app/globals.css` (`scrollbar-width: none` e `::-webkit-scrollbar`). Medido com as barras do Chrome visíveis: 0 px a 390 px nos oito endereços conferidos e dentro do quadro de 390 px do simulador; a 1440 px a barra continua (15 px), como pedido.

## 6. O Impeccable

**O que havia:** nada instalado. O kit o tinha como "segunda opinião automática, ratificada e não adotada" (`11-anti-ia.md`, seção 4) e guardava só o detector para depois (`claude/ferramental.md`).

**O que ficou:**
- o detector `impeccable@4.1.0` em devDependencies, com a versão travada, licença Apache-2.0, e o binário `@impeccable/cli-darwin-arm64@0.1.5`, de 08.09.2026. A versão mais nova, a 4.5.2, de 09.10.2026, fere a regra dos 7 dias;
- a habilidade no projeto, em `.claude/skills/impeccable/`, e os agentes em `.claude/agents/`, instalados **sem os ganchos** que rodariam a cada edição (era essa a objeção do kit). A instalação baixou o motor 0.1.14, de 5 dias; troquei pelo 0.1.5 travado. O binário fica fora do git (ver o `.gitignore`);
- o comando `npm run anti-ia -- <arquivos ou endereços>`; para o celular, `--viewport 390x844`.

**O primeiro uso, a 390 px, em todos os sites:**
- **Contraste:** o detector acusou centenas de casos, quase todos estimados sobre degradê ou transparência. Conferidos sobre o fundo desenhado (o texto escondido e a cor medida contra o fundo), 218 casos no Atlas e em cinco sites de nicho: nenhum falha. Os únicos abaixo do mínimo são o botão desativado do formulário vazio do depósito (o WCAG dispensa controle inativo) e o latão da barbearia, pintado por degradê (falso positivo da própria conferência).
- **Pet shop:** 52 textos passando da caixa a 390 px, que o passe do celular zerou.
- **Fica, por identidade aprovada** (a habilidade manda que "o brief vence"): o orbe de bronze, a onda do "24h", o filete de 2 px dos degraus, a `--ease-mola` (exceção registrada no `09-movimento.md`, linha 80), a uva e o violeta do pet shop, a comanda sobre a tábua do restaurante, os rótulos curtos em caixa-alta do depósito.
- **Falsos positivos:** os menus fechados lidos como "imagem enterrada"; os números da arcada sob o título da odontologia (o desenho pedido); a navegação da barbearia, que só aparece na mesa.

## 7. O menu do pet shop na direita

No celular, o toque nas três linhas abre agora uma barra que entra pela direita, e não mais o cartão centrado. O cartão do índice fica preso à direita, com largura de `min(21,5 rem, 100% − 3 rem)`, sombra de pilha à esquerda e véu uva a 62% sobre a página (`app/demos/petshop/petshop.css`, bloco `.bt-menu`; a entrada por `translateX(100%)` em `components/ilhas/demos/petshop/tira.tsx`). Continua um `<dialog>`, que abre também sem script. Conferido a 320, 390 e 768 px e sem script; registrado em `registros/demos/pet-shop/decisoes.md`.

## 8. A repetição dentro do site: o despoluir e o enriquecimento

**A leitura do pedido.** Repetir um efeito entre sites é permitido. O defeito é a **série dentro do site**: o mesmo efeito em toda seção, cartão ou título. A regra adotada tem duas camadas. Na primeira, a do efeito, cada efeito fica num lugar, cada cena tem o seu momento e o efeito segue o papel, nunca a instância. Na segunda, a da composição, ficam o molde de seção, o recipiente padrão, o mesmo objeto repetido e o mesmo bloco em duas páginas. A segunda camada apareceu no meio do trabalho, quando os críticos mostraram que, com a série de movimento já fora, a repetição que restava era de composição.

**O método**, para os sete sites:
1. o inventário e a contagem de cada efeito, por página, a 1440 e a 390 px;
2. o plano;
3. a crítica do plano por um cético;
4. a aplicação;
5. um crítico de fora novo, sem o histórico;
6. a correção do que ele apontou.

Na nutrição, na barbearia e no depósito, houve também o enriquecimento. Foram 36 agentes, de 14 a 16.10.

**O que mudou, por site** (as contagens são de antes e depois, medidas na página renderizada):

| Site | O que era série e caiu | O que ganhou |
|---|---|---|
| **Atlas** | O orbe, de 17 para 4. A tarja, de 6 para 1 (o "UFF"). O cartão que subia, de 12 para 0. O ímã, de 5 para 0. Os numerais visíveis, de 77 para 38. As cenas claras dentro de um cartão, de 9 em 13 para 4 em 13. As respostas das três "Montar orçamento", de 3 para 1. Os globos da marca usados como marcador, de 28 para 0. A chamada final, de 2 páginas para 1. | Cada abertura interna ganhou um momento próprio: os bairros, a escada, a trena e a chegada. Em `/orcamento`, a abertura agora é o próprio montador. Os públicos, os módulos, os sócios e as dúvidas passaram a uma lista tipográfica entre filetes, no lugar dos cartões. |
| **Odontologia** | Abaixo da capa, só o termo entra. Só as placas de nome inclinam, e só o 30 conta. O traço ondulado, em série na lista de tratamentos, foi de 6 para 0. | O trilho do avanço sob os cartões, que anda com a rolagem. A placa ao lado acende a região do item. As perguntas das Guias viraram campos numerados da ficha. A compressão ao toque. Foram corrigidas a placa fantasma no celular e a sobreposição dos dois mapas na carga. |
| **Restaurante** | O brilho do esmalte, de 18 para 7. A peça que inclina, de 13 para 3. A cascata, de 5 para 1. A peça que desce, de 10 para 2. As placas esmaltadas do Onde, de 2 para 1. | A luz no ponto tocado das lousas, do cavalete e do azulejo. O título da capa em duas linhas em todas as larguras. Foram corrigidos o cabeçalho, que cortava a navegação a 1024 px e acima de 1536 px, e a régua vazia na primeira tela da cozinha. |
| **Pet shop** | Cada efeito ficou uma vez por página: o rolo, o cartão que vira, a batida, a régua só nas três tabelas e o verniz numa linha por vez. | A prova impressa sob o rolo. O verso do cartão, que deita sobre os acréscimos. O mapa de Onde, que chega perto depois da carga. |
| **Nutrição** | O recibo deixou de inclinar, e a luz da janela ficou só na folha do plano. Os filetes de 2 px caíram de 6/5/5 para 5/4/4 (início / valores / consultório). | **Enriquecida:** o encarte de sálvia de ponta a ponta. O recibo virou o talão inteiro (o canhoto, o picote e o papel esverdeado), que se escreve na carga. A folha do plano ficou maior. A legenda do consultório acende o mesmo marca-texto no item e no mapa. O cabeçalho baixou de 415 para 198 px na mesa. Corrigiu-se o espaço entre as palavras da Fraunces ("A pé" não se lê mais "Apé"). |
| **Barbearia** | A numeração da tabela foi de 4 para 0. As telas do celular com a mesma moldura da ficha 3D, de 4 para 1. As aberturas da mesa com o mesmo esquema, de 3 para 2. Os painéis de vidro no celular, de 2 para 1. | **Enriquecida:** a ficha 3D ganhou um lugar próprio em cada cena (a moeda de alpaca grande na navalha, a placa centrada em A casa, a placa da rua na quina em Onde). Os números de A casa se aprofundam, as ausências recuam, o mapa inclina e a rua acende. No celular, o espelho da Equipe ficou grande, com a meia-luz de quem atende quando a casa abre. 19 peças passaram a responder ao toque. O grão virou salpico. Foram corrigidos o título antigo, que passava nítido sob a barra na troca de página, e a placa cortada pelo rodapé. |
| **Depósito** | A revelação em série, de 26 peças para 4. O índice de 01 a 05 na inicial, de 3 vezes para 1. As setas da inicial, de 7 para 2. As páginas internas com a mesma abertura, de 4 para 1. O código numerado ficou só onde é a própria coisa: a ficha, as etiquetas, o catálogo e as abas. | **Enriquecido:** a planta do balcão (cada página é um cômodo do depósito em planta baixa). A fachada com as portas que sobem, em A casa. A prancha da parede, com as fiadas. O caminhão da casa no fim do método. O numerador do talão no Orçamento, com as rodas que giram até o número. O ilhós de metal nas etiquetas. O refletivo, que acende uma vez na ação principal. A sobreposição dos marcos da Entrega foi corrigida: abaixo de 1280 px, eles viram a tabela do dia, e nenhum rótulo do mapa é cortado de 320 a 1440 px. |

**O veredito dos críticos de fora**, nos sete sites: o movimento não lê mais como componente repetido, e cada página tem um momento só, diferente das outras. O que eles ainda apontam é composição ou objeto, e quase tudo é decisão sua (seção 12). São estes casos:
- a arcada em 4 cenas da odontologia;
- a lousa em três cenas do restaurante;
- os versaletes da nutrição, que são a voz do jornal;
- as portas do Atlas em seis cartões, que são o índice do site.

Num ponto, os corretores discordaram do crítico, com o motivo registrado em cada `decisoes.md`: um momento por cena, e não por página, seria de novo a série.

**Onde está o detalhe:**
- em cada `registros/demos/<site>/decisoes.md` e `lapidacao.md`;
- o registro da passada, em `registros/demos/{nutricao,barbearia,deposito}/despoluir.md`;
- o do Atlas, em `registros/atlas/despoluir.md`, que precisa ir ao `documentacao/atlas--decisoes.md` do repositório principal.

## 9. O estudo no kit de produção

Registrado em `producao/esteira/20-repeticao-dentro-do-site.md` (decidido em 14.10.2026). O documento traz:
- a leitura adotada e a regra nas duas camadas;
- a conferência, que é a contagem de cada efeito e de cada molde por página, a 1440 e a 390 px, com o script `contar-efeitos.mjs`;
- o estudo inteiro: o método, as tabelas de antes e depois dos sete sites, os vereditos e as lições.

**Os documentos que passaram a apontar para ele:**
- na esteira: o `09-movimento.md` (o item 13, "Nada em série"), o `11-anti-ia.md` (a M1 reforçada com a sua frase; a M2 com "o sorteio", três botões iguais com três respostas diferentes) e o `19-o-padrao-atlas.md`;
- também na esteira: o `04-direcao-de-arte.md`, o `00-principios.md` e o `03-planos.md`, de onde saíram os trechos que induziam a série ("levada a toda a página", "a revelação ao entrar na tela");
- os roteiros: o `01-processo.md`, o `01-roteiro-da-sessao.md` e o comando `construir`;
- a porta da qualidade: o `11-design-e-anti-ia.md`, o `14-ciclo-de-qa.md` (a contagem bloqueia o rascunho) e o modelo do relatório de QA;
- o modelo `identidade.md`;
- os dois README.

Na base do kit, saiu o `data-revela` em série das páginas de exemplo.

**Atenção:** `producao/` não é versionado nesta cópia (`.gitignore`). A mesma mudança precisa ser levada ao repositório principal (`/Volumes/Matheus/Projetos/atlas-digital`, que não estava montado).

## 10. A verificação final

Feita em 16.10, depois do despoluir, sobre um build de produção novo (`npm run build`, sem erro), servido na porta 3300. Os números de 14.10 aparecem entre parênteses.

- **A régua nas 50 páginas** (as sete do Atlas e as 43 dos seis sites de nicho, em 774 s): **49 sem falha.** As 7 falhas são as mesmas de 14.10 e estão todas na inicial da odontologia. São as palavras do título, que se misturam por diferença sobre a placa (`mix-blend-mode`). A régua mede a cor declarada; com a cor desenhada, a frase fica entre 3,9 e 10,4:1, e o mínimo é 3:1. A decisão está com você desde 13.10 (seção 12).
- **A barreira do travamento** (390 × 844, CPU 4×), no pior caso das 50 páginas. Todos os valores ficam dentro do teto:

  | Medida | Pior caso agora | 14.10 | Teto |
  |---|---|---|---|
  | Maior tarefa na carga | 364 ms, no início do restaurante | 126 ms | 1 s |
  | Bloqueio somado | 453 ms | 200 ms | 3 s |
  | Quadros lentos ao rolar | 0,4% | 0,5% | 10% |
  | LCP | 3,7 s, em Serviços do pet shop | 4,3 s | 10 s |
  | CLS | 0,005 | — | — |

- **Os 75 avisos (eram 125).** Nenhum deles reprova. São 34 de composição e 30 de contraste a conferir à mão (texto sobre degradê ou desenho). Os outros 11 são estes:
  - 5 de tipografia (linhas de 84 a 95 caracteres em notas e páginas legais, e um `tabular-nums` sem efeito na barbearia);
  - 3 de paridade (o botão de pausa, só na mesa, na nutrição e no depósito; e as placas numeradas da barbearia);
  - 2 de registro (a mediana de 16 e de 17 palavras por período em O Atlas e em Dúvidas);
  - 1 de semântica (um salto de nível nos títulos em Onde, na odontologia).

  Os 24 avisos de teclado do depósito sumiram.
- **A régua depois do fechamento com o Impeccable** (seção 13; outro build de produção, 728 s):
  - continuam 49 de 50 páginas sem falha, e as 7 falhas são as mesmas;
  - na barreira, todos os valores seguem dentro do teto: maior tarefa de 244 ms, bloqueio somado de 194 ms, 0% de quadros lentos e LCP de 3,9 s;
  - os avisos foram de 75 para 90. A diferença é de composição:
    - abaixo de 420 px, a ação "Pedir avaliação" na pasta da odontologia quebra em duas linhas, em 12 páginas, de propósito, para não cobrir o nome da clínica;
    - dois nomes da ficha da odontologia quebram a 768 e a 1024 px;
    - no cardápio do restaurante, a primeira ação do celular termina em 62% da tela, quando o teto é 60%.

    Nenhum desses avisos reprova.
- **A conferência da pausa** (`producao/ferramentas/conferir-pausa.mjs`): nos sete sites, nas duas larguras, nenhuma animação infinita continua depois da pausa. Antes, falhavam o pet shop e o depósito.
- **Testes:** odontologia, 15 de 15; restaurante, 10 de 10; pet shop, 13 de 13; barbearia, 6 de 6. São seis testes novos no fechamento (o agendador, o retorno, as encomendas, a pelagem, o leva e traz) e o do dia da abertura.
- **Tipos:** `tsc` sem erro.
- **Unicidade:** o maior par fica em 9% do CSS (odontologia e restaurante); o aviso começa em 15%.
- **Dependências de produção:** 0 vulnerabilidade.
- **Uma conferência visual minha**, no build de produção:
  - a Entrega do depósito a 390 e a 1280 px (os marcos viram a tabela do dia abaixo de 1280 px, sem sobreposição);
  - a primeira tela do depósito, da nutrição e da barbearia a 390 px;
  - a Equipe da barbearia, com o espelho grande.

  Nenhuma rolagem lateral e nenhum erro de script.

## 11. O que não foi conferido

- Nenhum aparelho real (Android intermediário, Safari do iPhone) nem leitor de tela: os filmes são do Chrome com a CPU 4× e o toque emulado.
- Depois da última correção de cada site, nenhum crítico de fora novo voltou a olhar; os vereditos da seção 8 são de antes dela. O teste da vitrine a 390 px não foi feito.
- As prévias do simulador (`public/simulador/*-celular.webp`) não foram refeitas depois dos passes do celular e do despoluir.
- O Impeccable não foi rodado de novo depois do despoluir. O aviso de curva com quique, nas páginas do Atlas, vem da `--ease-mola` global, que fica porque o botão magnético da barbearia a usa.
- A cópia de referência do Atlas no kit (`producao/referencias/atlas/`) ainda tem o código de 08.10.

## 12. O que depende de você

**Vereditos:**
- a mesa do pet shop (o veredito da vitrine), da odontologia e do restaurante;
- o celular dos três: as capturas a 390 px e a tabela "O premium no celular" de cada `identidade.md`, marcadas "aguardando a aprovação"; o percurso em pilha e o índice da odontologia pedem o julgamento num aparelho;
- o teste do desconhecido do cartão e do carimbo do pet shop, que ficou com você.

**O despoluir (seção 8):** o resultado nos sete sites. Em especial, o enriquecimento da nutrição, da barbearia e do depósito, que mudou cenas aprovadas: o talão da nutrição, a ficha 3D em lugar próprio na barbearia, a planta do balcão e a fachada do depósito.

**Decisões de direção:**
- **Atlas:**
  - as três técnicas da seção 2;
  - das cenas de modelo genérico, o despoluir já trocou os cartões de Para quem, os passos em círculos, o acordeão e a abertura do Orçamento (seção 8), e falta confirmar;
  - as portas do início, que continuam como seis cartões com o dado em número grande;
  - a escala do texto nas telas largas e o respiro igual em toda seção.
- **Odontologia:**
  - a régua contra o título por diferença: corrigir a régua, que é do kit, ou tirar o título de cima da placa, contra o roteiro;
  - a arcada, em 4 das 7 cenas da inicial e na abertura de 8 internas, que o crítico lê como série de objeto;
  - a capa no grafite ou no papel;
  - cortar a fila dos cartões de retorno;
  - a placa em sangria;
  - o bairro na porta;
  - a abertura própria de cada interna.
- **Restaurante:**
  - a cozinha com a lousa grande ou direto na galeria (a lousa aparece em três cenas, e a primeira tela da cozinha é quase igual à capa);
  - o par do guardanapo com a plaquinha, entre o início e o Onde;
  - a abertura de cada interna e os momentos acima de 600 ms;
  - uma ação no alto do cardápio e das encomendas no celular.
- **Pet shop:**
  - a segunda voz tipográfica (a Overpass nos rótulos curtos);
  - o carimbo claro em `#ce9dff`;
  - o título de Onde;
  - as faixas de papel vazio que a medição de cor obriga (aparecem também no celular);
  - o meio do início, que está quieto (a recomendação é manter);
  - a página que não existe.
- **Nutrição:** a folha do plano em sangria; e um momento por página ou por cena na capa (a recomendação é manter um por página).
- **Barbearia:** a ficha que saiu de Serviços, Equipe e Retorno, contra o pedido de 01.10.
- **Depósito:** tirar a cota "No mesmo endereço desde 1998" da capa e o "· corte às 15h" do rodapé (1998 aparece quatro vezes no início, e 15h, cinco).

**Do fechamento com o Impeccable (seção 13 e cada `decisoes.md`):**
- **Atlas:**
  - o início sem nenhum site à vista (a proposta é pôr um demonstrativo na segunda dobra);
  - o "0X / 06" acima dos títulos;
  - a foto do sócio fora do padrão das outras;
  - o reflexo do título final a cada 8 s;
  - o fim do percurso, que volta ao início.
- **Barbearia:**
  - o vidro do Agendar e do Retorno (a recomendação é tirar);
  - o palco a 60 quadros por segundo atrás do couro e da bancada.
- **Depósito:**
  - a saída do F-01 de A casa, a confirmar;
  - os textos novos, marcados "a aprovar".
- **Odontologia:**
  - a faixa vermelha da chamada, presa à meta de cor;
  - o percurso em 4 passos.
- **Restaurante:**
  - o preço das marmitas;
  - a comanda guardada no aparelho, que pede mudar antes o aviso de privacidade.
- **Pet shop:**
  - a fita deitada do celular e o leva e traz em colunas, que são composições novas;
  - os títulos de exibição a 200%.
- **Os `identidade.md`** da odontologia, do restaurante e do pet shop precisam receber o que o fechamento mudou.

**O que não foi feito pelos agentes:** os `identidade.md` da odontologia, do restaurante e do pet shop não foram atualizados com o que o despoluir mudou. Cada `decisoes.md` lista o que falta, na seção "Pendente".

**Para o kit** (no repositório principal, não nesta cópia):
- levar o `producao/` desta cópia, com o documento 20 e as emendas da seção 9;
- registrar o Impeccable como adotado no `11-anti-ia.md` e no `ferramental.md`;
- registrar a pendência do lide das aberturas como resolvida no `15-desempenho.md`;
- levar o registro do Atlas (`registros/atlas/despoluir.md`) ao `documentacao/atlas--decisoes.md`.

## 13. O fechamento com o Impeccable (16.10.2026)

**Os pedidos.** "Ao final de cada produção dos sites, quando você fechar, tanto o Atlas quanto os sites de nicho, aplique o Impeccable, deixe-o fazer uma revisão, use todas as suas habilidades, e veja o que converge e o que não converge com as políticas anti-IA criadas dentro do documento de produção". E: "Adicione ao documento de produção que, ao final da criação de cada site, seja feito este processo [...] e, ao final, fazer as devidas mudanças e trazer o relatório, no chat".

**O registro no kit:**
- `producao/qualidade/15-revisao-do-impeccable.md`, que é a última porta de todo site. Ele traz:
  - o que roda de cada comando;
  - o mapa em quatro colunas (converge, só o Impeccable, só o kit, contradiz);
  - as mudanças;
  - o relatório no chat;
  - a calibração.
- Ele está ligado ao `14-ciclo-de-qa.md` (seção 3, item 10), ao `01-processo.md` (etapa 7), ao `11-anti-ia.md` (seção 4), ao `ferramental.md`, ao comando `construir` e ao README da qualidade.

**Como rodou:**
- Nos sete sites, o `critique` teve as avaliações A (o design) e B (o detector e o navegador) em subagentes isolados. A avaliação A não leu o detector nem o kit, para a comparação ser independente.
- Veio depois o `audit`, nas cinco dimensões.
- Na sequência, o mapa de convergência e um corretor por site.
- Por fim, o detector de novo, a conferência da pausa, a régua, os testes e o build.
- Ficaram fora o `init`, o `document` e o `extract`, que escrevem o PRODUCT.md e o DESIGN.md e concorrem com o `identidade.md`, e o `live`, que pede alguém escolhendo na tela.

**As notas e o detector:**

| Site | Nielsen (A) | Auditoria (B) | Detector nas páginas, antes → depois (1440 / 390) |
|---|---|---|---|
| Atlas | 26/36 | 15/20 | 46 → 36 / 40 → 34 |
| Odontologia | 26/36 | 15/20 | 103 → 77 / 110 → 70 |
| Restaurante | 30/40 | 14/20 | 165 → 140 / 151 → 127 |
| Pet shop | 24/32 | 15/20 | 46 → 43 / 45 → 40 |
| Nutrição | 26/36 | 17/20 | 52 → 26 / 56 → 30 |
| Barbearia | 27/40 | 15/20 | 74 → 59 / 65 → 55 |
| Depósito | 28/40 | 15/20 | 61 → 58 / 52 → 45 |
| **Total** | | | **1.066 → 840** |

No código (`.tsx`), o detector achou 0 em seis sites e 1 no Atlas, o degrau de /planos, que foi corrigido. O que resta nas páginas é, quase todo, falso positivo conferido sobre os pixels ou identidade aprovada (o latão, a uva, a lousa, o refletor).

**O que converge** (o Impeccable e o kit apontam a mesma coisa):
- **T2, o rótulo acima do título:** em todos os sites; os casos aprovados ficam com você.
- **L4 e C10, a caixa dentro de caixa e o vidro:** na barbearia, o vidro do Agendar ficou, por ser do mundo aprovado.
- **L2 e L5, o número grande e a numeração sem sequência:** o "Fig. 1" da nutrição saiu, e a faixa 30/3/4/0 da barbearia perdeu os números repetidos.
- **Kit 20, o mesmo dado em série:** o R$ 250 da nutrição, as "três cadeiras", o 1998 de A casa e o endereço do Orçamento do depósito.
- **C11, o filete lateral:** a odontologia e o degrau do Atlas.
- **D1, D2 e D3:**
  - a barra de rolagem e o cursor de texto;
  - os erros e os bloqueios sem palavras;
  - a 404 da nutrição.
- **D4, os ícones em glifo:** o "−" e o "+" do restaurante.
- **Q1 e Q2:** o foco e o contraste sobre o globo; as linhas longas.
- **A régua (a ação na tela):**
  - os preços de Valores;
  - a capa da nutrição a 390;
  - o total do /orcamento no celular;
  - a comanda do restaurante;
  - a ação da odontologia no celular.

**O que só o Impeccable viu.** O kit ganhou estas marcas, na seção 5 do `11-anti-ia.md`:
- **Q15, a pausa que não pausa:** no pet shop e no depósito, o atalho `animation` vencia a regra da pausa, e o `aria-pressed` dizia "pausado" com a luz e a ficha andando. Daí a ferramenta nova, `producao/ferramentas/conferir-pausa.mjs`.
- **Q16, o texto a 200% que some sob o `overflow-x: clip`:** no Atlas, no pet shop e no restaurante.
- **Q17, a ferramenta sem a regra do domínio:**
  - na barbearia, o Rui na terça e a data futura;
  - no depósito, a medida "abc" sem frase;
  - no restaurante, 3 pessoas num pedido de no mínimo 10.
- **T12, a entrelinha de exibição que corta os acentos:** no depósito, "BALCÃO" batia em "CONTA", e "ORÇAMENTO" em "POR".

Viu também:
- o anel de foco que vazava para o papel (no restaurante, a 1,07:1);
- a comanda mais alta que a tela;
- o corte a 320 px na odontologia;
- o 3D da barbearia a 60 quadros por segundo em repouso, que agora é 0;
- o porte de 10 kg em duas faixas e a pelagem sem como ser identificada, no pet shop;
- o jargão da agência nos planos do Atlas.

**O que só o kit vê.** O Impeccable não faz:
- a contagem da série de efeitos por página (o documento 20);
- o teste da vitrine;
- a página chapada (P);
- a régua da primeira tela;
- a unicidade entre sites.

**O que contradiz.** Vale o `identidade.md`:
- **O `gradient-text`:** o latão da barbearia e a onda do "24h" são aprovados.
- **O display acima de 6 rem e "um momento autoral por página":** contra o cartaz aprovado e a camada do Completo.
- **O `cream-palette` (C1):** a palha da nutrição é aprovada.
- **O `bounce-easing`:** a mola do ímã da barbearia está registrada. A regra global foi para o `barbearia.css`, e o falso positivo saiu de todas as outras páginas.

**As mudanças:** foram 7 corretores, com cerca de 80 mudanças. O detalhe e a classe de cada uma estão em cada `registros/<site>/decisoes.md`, na seção "Fechamento com o Impeccable, 16.10.2026".

As compartilhadas, feitas por mim:
- o ímã e a `--ease-mola` passaram para o `barbearia.css`, na mesma camada;
- o `body` das demos ficou transparente, para o detector medir o fundo real.

**Não foi feito:**
- **As fontes do Atlas pré-carregadas nas demos** (~52 KB). Corrigir pede passar as variáveis de fonte da raiz para o layout do Atlas, e isso toca o vínculo de pular, a 404 e o globo. É uma mudança estrutural para depois.
- **Os transbordos a 200% que restam:** em /planos, em /o-atlas e nos títulos de exibição do pet shop (que mexem na escala aprovada).
- **O vidro do Agendar.**
- **A comanda guardada no aparelho:** o aviso de privacidade promete que nada é gravado.

**A atualização da habilidade:** existe a v4.6.0. Ela só entra pela regra dos 7 dias e com o seu pedido.

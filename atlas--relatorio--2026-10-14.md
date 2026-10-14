# Relatório · o celular dos sites, o pet shop e o Impeccable (13 e 14.10.2026)

Pedidos de Matheus Castro Oliveira de Luna Garcia, que aprova os sites de demonstração:

1. "Utilize um novo nicho e crie um novo site da categoria inicial, utilizando de todos os conteúdos dentro da produção" (13.10): o **pet shop**, plano Essencial.
2. "Foque unicamente em trabalhar na versão mobile dos sites restantes, como o odontologia, restaurante e pet-shop, e principalmente trabalhe no próprio site mobile do Atlas, como resolver animações etc. Depois de uma revisão do site no desktop, caso seja viável, busque utilizar as bibliotecas de componentes para enriquecer o site" (14.10).
3. "Retire todas as barrinhas laterais dos sites, que ficam na direita, para todas as versões no mobile, tanto do site principal quanto dos sites de nicho" (14.10).
4. "Verifique se o Impeccable está instalado e dentro das diretrizes anti-IA; caso não esteja, instale e comece a utilizar imediatamente, tanto para o site principal quanto para os sites de nicho" (14.10).
5. Este relatório na raiz, o commit e o push na branch (14.10).

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

## 7. A verificação final

Build de produção (`npm run build`) sem erro, servido na porta 3300.

- **A régua nas 50 páginas** (as sete do Atlas e as 43 dos seis sites de nicho, em 717 s): **49 sem falha.** As 7 falhas são todas da inicial da odontologia: as palavras do título que se misturam por diferença sobre a placa (`mix-blend-mode`). A régua mede a cor declarada; medida com a cor desenhada, essa frase fica entre 3,9 e 10,4:1 contra o mínimo de 3:1. É a pendência da seção 9, que já estava com você desde 13.10.
- **A barreira do travamento** (390 × 844, CPU 4×), no pior caso das 50 páginas: maior tarefa de 126 ms (o teto é 1 s), bloqueio somado de 200 ms (o teto é 3 s), 0,5% de quadros lentos ao rolar (o teto é 10%) e LCP de 4,3 s (o teto da primeira tela é 10 s), em Valores da nutrição.
- **Os 125 avisos:** 52 de composição (sobretudo "nenhuma ação até 60% da primeira tela" nas internas e rótulos de controle em duas linhas a 768 px), 36 de contraste a conferir à mão (texto sobre degradê ou desenho), 24 de teclado (o foco encoberto sob o cabeçalho ao subir com Shift+Tab, todos no depósito, que não entrou neste passe), 9 de tipografia, 2 de paridade, 1 de semântica e 1 de registro. Nenhum reprova.

- **Testes:** odontologia 15 de 15, restaurante 9 de 9, pet shop 12 de 12.
- **Tipos:** `tsc` sem erro.
- **Unicidade:** o maior par fica em 9% do CSS (odontologia e restaurante) e 7% dos componentes; o aviso é a partir de 15%.
- **Dependências de produção:** 0 vulnerabilidade. As 6 altas de desenvolvimento vêm do `shadcn` (anteriores; nada novo do Impeccable).

## 8. O que não foi conferido

- Nenhum aparelho real (Android intermediário, Safari do iPhone) nem leitor de tela: os filmes são do Chrome com a CPU 4×.
- Nenhum crítico de fora olhou os passes do celular; o teste da vitrine a 390 px não foi feito.
- As prévias do simulador (`public/simulador/*-celular.webp`) não foram refeitas depois dos passes do celular.

## 9. O que depende de você

**Vereditos:**
- a mesa do pet shop (o veredito da vitrine), da odontologia e do restaurante;
- o celular dos três: as capturas a 390 px e a tabela "O premium no celular" de cada `identidade.md`, marcadas "aguardando a aprovação"; o percurso em pilha e o índice da odontologia pedem o julgamento num aparelho;
- o teste do desconhecido do cartão e do carimbo do pet shop, que ficou com você.

**Decisões de direção:**
- **Atlas:** as três técnicas da seção 2 e as cenas de modelo genérico da mesa.
- **Odontologia:** a régua contra o título por diferença (corrigir a régua, que é do kit, ou tirar o título de cima da placa, contra o roteiro); a capa no grafite ou no papel; cortar a fila dos cartões de retorno; a placa em sangria; o bairro na porta; a abertura própria de cada interna.
- **Restaurante:** a cozinha com a lousa grande ou direto na galeria; a abertura de cada interna; uma ação no alto do cardápio e das encomendas no celular.
- **Pet shop:** a segunda voz tipográfica (a Overpass nos rótulos curtos); o carimbo claro em `#ce9dff`; o título de Onde; as faixas de papel vazio que a medição de cor obriga (aparecem também no celular); a página que não existe.

**Para o kit** (no repositório de origem, não nesta cópia): registrar o Impeccable como adotado no `11-anti-ia.md` e no `ferramental.md`, e a pendência do lide das aberturas como resolvida no `15-desempenho.md`.

# 12 · Inspiração e referências

> **Para que serve.** Onde buscar os melhores sites, como estudá-los com o mesmo instrumento, o que aproveitar e o que nunca copiar. Traz as referências levantadas por nicho e o que os prêmios ensinam.
>
> **Quando ler.** Na direção de arte (`04-direcao-de-arte.md`, depois das referências do mundo físico), ao calibrar o acabamento de uma peça e na revisão trimestral das listas.
>
> **Depende de.** `04-direcao-de-arte.md` (a direção vem do assunto, não daqui), `11-anti-ia.md` (copiar um premiado também é escolher por omissão), `nichos/<nicho>.md` (as normas que a referência estrangeira não segue).
>
> **Estado.** RATIFICADO em 08.10.2026. Os dados vêm de duas fontes:
> - as onze análises de nicho de setembro de 2026, com 46 sites medidos (`nichos/analises/`, no repositório do Atlas);
> - o estudo do Awwwards de 07.10.2026: 24 sites do dia amostrados, seis premiados medidos.
>
> **Atualizado em:** 08.10.2026.

---

## 1. Para que servem as referências

**Regra.** As referências premiadas **calibram o ofício** — o nível de acabamento, de escala, de fotografia, de movimento —, **nunca a direção**. A direção sai do assunto do cliente: o briefing visual e as referências do mundo físico dele (`04-direcao-de-arte.md`, passos 1 a 3).

**Objetivo.**
- **Copiar fixa.** Quem vê um exemplo antes de projetar tende a reproduzir as características dele, inclusive as ruins: é a "fixação de projeto" (Jansson e Smith, *Design Studies*, 1991, https://doi.org/10.1016/0142-694X(91)90003-F) [FU]. No mercado, o mesmo efeito tem nome: o "efeito moodboard" — a fartura de referências "levou a um pensamento mais estreito" (Alex Murrell, "The Age of Average", https://www.alexmurrell.co.uk/articles/the-age-of-average) [FU].
- **O painel de referências só no começo.** Warren o chama de "vago demais" para decidir (https://alistapart.com/article/style-tiles-and-how-they-work/) [V]; a decisão passa pelos painéis de estilo.
- **O premiado de hoje é o padrão de amanhã.** A Instrument Serif, usada pela Aventura (site do dia em 19.03.2026), aparece um mês depois entre os pares comuns de páginas geradas (Krebs, 20.04.2026; `11-anti-ia.md`, seção 1.4).

**Como conferir.** No `identidade.md`, as referências do mundo físico vêm antes das de site; cada referência de site traz o que se aproveita dela, numa frase.

---

## 2. Onde buscar

| Fonte | Para quê | Como ler | Endereço |
|---|---|---|---|
| **Awwwards** (site do dia, do mês, menção honrosa, prêmio de desenvolvimento) | O teto do acabamento visual e de movimento | Filtrar por categoria e ler as notas por critério, não só a média: o premiado costuma perder em usabilidade e acessibilidade (seção 3) | https://www.awwwards.com |
| **CSS Design Awards** (site do dia, menção especial) | Segunda opinião, com júri e critérios diferentes (interface, experiência, inovação) | O site do dia exige média do júri acima de 8,0; de 6,0 a 7,99 é menção especial [FU] | https://www.cssdesignawards.com |
| **Mobbin** | Fluxos reais de produtos: formulário, estado vazio, confirmação, agendamento | Estudar o fluxo, não a pele [FU] | https://mobbin.com |
| **Galerias de curadoria** (Godly, Siteinspire, Land-book, httpster) | Ver muito, depressa | Só para calibrar o ofício, nunca como fonte da direção: o "efeito moodboard" (seção 1) [FU] | — |
| **O mundo físico do cliente** | A direção: material, letreiro, embalagem, uniforme, o próprio lugar | Fotografado no briefing (`02-briefing.md`) | — |
| **Os concorrentes locais** | O que vencer, não o que copiar; o teste de unicidade (`11-anti-ia.md`, passo 4) | Três, do briefing | — |
| **Os pares brasileiros medidos** | O que não fazer | Seção 5.2 | — |
| **O catálogo de componentes do kit** (desde 13.10.2026) | Como uma peça se resolve em código, com a licença conferida para site vendido | Depois do mundo da marca: o catálogo dá a mecânica, nunca a direção (`../componentes/README.md`, seção 2) | `../componentes/catalogo.md` |
| **Modelos prontos** (Webflow, Framer, temas) | Nunca como fonte de texto | O modelo de dentista do Webflow medido em agosto trazia três das seis vedações medidas da CFO no texto, a mais grave no `h1` ("Excellent dental services") | — |

**A pergunta que vale mais.** O Awwwards responde "quais sites são bonitos"; o Mobbin responde "como se resolve uma marcação de horário". Para o Atlas, a segunda pergunta vale mais (ESTEIRA v2.1, VII, no repositório do Atlas).

**Para o site do Atlas,** as agências premiadas de 2026 servem de calibração do próprio ofício:
- **Lama Lama:** site do dia em 20.07.2026 e, depois, site do mês; creme e quase-preto; introdução feita do ícone do logotipo; o lema "all in one deck, no sales pitch";
- **twks** (Genebra): site do dia em 07.10.2026; preto e branco, guiado pela tipografia; carregamento curto de marca, 404 em bitmap e formulários;
- **LxL Creative:** site do dia em 17.09.2026; Webflow, GSAP e Barba.js; nota de acessibilidade de 7,6;
- **The First The Last** e **Bürocratik**, os modelos de negócio mais próximos do Atlas. A primeira ganhou prêmios por uma clínica odontológica, um restaurante, uma imobiliária e um serviço de pets, vários marcados como Webflow, e diz ter mais de 30 especialistas internos (https://webflow.com/@thefirstthelast). A segunda, por uma academia, um fabricante de móveis e casas de madeira [FU: páginas dos sites no Awwwards, lidas em 07.10.2026].

---

## 3. O que o Awwwards mede, e o que isso ensina

### 3.1 · As regras

| Item | Regra | Fonte |
|---|---|---|
| Critérios e pesos | Design 40%, usabilidade 30%, criatividade 20%, conteúdo 10% | https://www.awwwards.com/about-evaluation/ [V] |
| Júri | No mínimo 18 jurados; as três notas mais distantes da média são descartadas | Idem [V] |
| Votação | Dura 5 dias; só valem os votos de usuários PRO que passaram pela validação do Awwwards, contra a criação de usuários falsos | Idem [V] |
| Aprovação | A equipe confere à mão os requisitos mínimos antes de enviar o site ao júri; o site pode levar até uma semana para ser publicado, com fila nos fins de semana e em época de muitas inscrições | Idem [V] |
| Menção honrosa | Nota do júri de 6,5 ou mais. A nota do júri só aparece para o autor se o site ganhar o site do dia | Idem [V] |
| Site do dia | As maiores notas do júri; com nota alta e pelo menos 10 usuários PRO, pode sair antes dos 5 dias de votação | Idem [V] |
| Prêmio de desenvolvimento | Nota do júri de desenvolvimento acima de 7 | Idem [V] |
| Categorias do desenvolvimento | Um júri de desenvolvedores reavalia cada site do dia em seis categorias: Semantics/SEO, Animations/Transitions, Accessibility, WPO (desempenho), Responsive Design e Markup/Meta-data. Cada uma tem conferência na pasta irmã (`../qualidade/02-regua.md`, `../qualidade/06-acessibilidade.md`, `../qualidade/08-desempenho.md`) | Página de cada site do dia, lida em 07.10.2026 [FU] |
| Site do mês | Os oito de maior nota no mês voltam ao júri; o voto dos usuários pesa na decisão | Idem [V] |
| Site do ano | Concorrem todos os sites do mês e alguns outros; o vencedor sai no fevereiro seguinte | Idem [V] |
| Inscrição | De US$ 65 a 75 por site, conforme a fonte; conferir no ato | Utsubo, 05.03.2026, https://www.utsubo.com/blog/award-winning-website-design-guide; resumos de terceiros [FU] |
| Selo Mobile Excellence | Criado com o Google em 2017: um painel de especialistas dava o selo com 75/100, sem depender do site do dia. Parece inativo: nenhuma das 24 páginas amostradas mostra nota de celular; o celular passou a pesar em usabilidade e em Responsive Design (inferência) | https://awwwards.com/google-and-awwwards-present-the-mobile-excellence-award.html [FU]; a inatividade, [NV] |

### 3.2 · O que a amostra mostrou (07.10.2026)

**Amostra:** 24 sites do dia.

**Resultados** [V, medido]:
- **Notas:** de 7,22 a 8,18, média 7,54.
- **Usabilidade:** foi o critério de júri mais baixo em **18 dos 24**.
- **Acessibilidade:** média de 6,96 entre as notas de desenvolvimento, a mais baixa delas em **18 dos 24**.
- **Animação:** média de 7,96, a mais alta em **16 dos 24**.
- **Desempenho (WPO):** média de 7,59.
- **A amostra:** 20 sites do dia de 2025 e 2026, mais Kōzōwood, Fitonist e Don't Board Me (2024) e Blind Barber 10-Year (2020).
- **Sites do mês de 2026 na amostra** (Lama Lama, Floema, Son Daven, ERA Residence, Why Zero, Renaissance Edition): de 7,51 a 7,92. **Site do ano de 2025:** Lando Norris, 8,18.
- **Notas de desenvolvimento:** de 7,10 a 8,11. A Units (site do dia, julho de 2026) teve 6,99 e ficou sem o prêmio de desenvolvimento.
- **Menções honrosas:** a nota do júri não é publicada; os votos visíveis da comunidade vão de ~7,1 a 8,2. Entre a menção e o site do dia costumam ser poucos décimos.
- **Técnicas:** GSAP em 11 dos 24; WebGL em 9.

**A lição.**
- **O premiado ganha no desenho e no movimento e perde onde o cliente do Atlas mais precisa:** usar e ler. Ser excelente em usabilidade e acessibilidade, sem abrir mão do acabamento, é a vantagem mais barata do Atlas: a régua já a mede (`../qualidade/02-regua.md`).
- **O defeito aparece também entre os indicados.** A revisão de acessibilidade dos indicados ao Best of 2020 do Awwwards (Cargo) achou foco ausente, falhas de contraste, armadilhas de teclado e texto alternativo ausente (https://www.cargocreative.co.uk/?p=3996) [FU].
- **A acessibilidade é obrigação legal no Brasil** (Lei 13.146/2015, art. 63), não critério de prêmio.
- **Desempenho e criatividade se trocam.** O WebGL pesado ganha criatividade e perde acessibilidade e desempenho: a Santioni tem 9,4 em animações, 6,6 em acessibilidade e 7,0 em WPO. O site contido lidera as notas técnicas: a Aventura tem 8,11 no desenvolvimento, com 8,6 em WPO [FU: páginas dos sites no Awwwards, lidas em 07.10.2026].
- **Os limiares "bons" do Google**, no 75º percentil das visitas: LCP até 2,5 s, INP até 200 ms e CLS até 0,1 (https://web.dev/articles/vitals) [V]. O teste de celular padrão do Lighthouse simula um aparelho intermediário: CPU 4× mais lenta, latência de 150 ms e 1,6 Mbps de download (https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md) [V].

### 3.3 · O que o júri pune

Segundo Hon Tran, jurado do Awwwards (https://www.hontran.dev/blog/how-to-win-an-awwwards-site-of-the-day) [FU]:

| O júri pune | Em números | O que a esteira já diz |
|---|---|---|
| Tela de carregamento longa | "Uma revelação de marca de dois segundos é ofício"; uma barra de progresso de seis segundos é "uma penalidade de usabilidade fantasiada" | Nada de tela de abertura (`07-composicao.md`, seção 6) |
| WebGL que trava | A meta é 60 quadros por segundo, num computador e num celular intermediário; a 20 quadros "lê como quebrado" | O 3D com reserva e medido (`09-movimento.md`) |
| Celular quebrado | "Uma obra-prima no computador com o leiaute do celular desmontado fica na menção honrosa" | O passe do celular, com foco total, depois da mesa (`00-principios.md`, seção 5); régua em 14 larguras e no celular deitado |
| Acessibilidade descuidada | Foco invisível, nenhum caminho de movimento reduzido, contraste baixo, cursor próprio que esconde o ponteiro | `16-acessibilidade.md`; régua, bloco 4 |
| Mudança durante a votação | "Nunca publique mudanças no meio da votação" | Seção 8 |

**O que o mesmo jurado aconselha, para o movimento e o WebGL** [FU]:
- um só relógio de animação para o site inteiro, em vez de três laços de `requestAnimationFrame` concorrentes;
- animar só `transform` e `opacity`;
- limitar a densidade de pixel a 2, para não desenhar a 3× num celular sem ganho visível;
- um caminho de movimento reduzido: a animação decorativa fica atrás da preferência do usuário;
- LCP abaixo de 2,5 s, mesmo com o movimento.

Quatro já são regras desta esteira (`transform` e `opacity` e movimento reduzido, `09-movimento.md`, seção 5; resolução do 3D até 2× a do CSS, seção 7; LCP, `15-desempenho.md`); o relógio único entra como orientação para o 3D (RATIFICADO).

### 3.4 · O que os vencedores destacam

Os elementos-assinatura que as páginas dos premiados de 2025 e 2026 apontam (estudo de 07.10.2026) [FU]:

| Elemento | Exemplos | O que a esteira já diz |
|---|---|---|
| Carregamento ou introdução curtos e de marca | twks; Lama Lama, com a introdução feita do ícone do logotipo; Renaissance Edition; Crav | Uma revelação de dois segundos é ofício; tela de abertura longa, não (seção 3.3; `07-composicao.md`, seção 6) |
| Transição entre páginas | Realevate; LxL Creative, com Barba.js | A transição do React, com o cabeçalho parado (`09-movimento.md`, seção 8) |
| Página 404 própria | Don't Board Me; Q Psychology; a fumaça de escapamento em WebGL da Forge Automotive | A 404 da marca (`14-funcionalidades/01-base-de-todo-site.md`) |
| Capa que reage ao mouse | CRISP; SŌM | Só com ponteiro fino e sem movimento reduzido (`09-movimento.md`, seção 5) |
| Tipografia responsiva animada | Phive | — |
| Som | Santioni, Why Zero, Kōzōwood | Só com ação do visitante e controle para parar (WCAG 1.4.2; seção 5.1) |
| Tipografia como categoria | O Awwwards dá "Typography Honors" | A postura tipográfica (`05-tipografia.md`, seção 6.3) |
| Paleta contida, de uma ou duas cores | Phive, com uma; Aventura, com `#EAE8E8` e `#14151D` | Um acento, em até 10% da tela (`06-cor-forma-e-superficie.md`, seção 3) |

**3.5 · O que separa os vencedores dos modelos premium**

**Regra.** Ao estudar um premiado, procuram-se estes sete traços, que um modelo pronto, mesmo rápido, não tem [FU: páginas dos sites no Awwwards e no CSS Design Awards, lidas em 07.10.2026; Utsubo, 05.03.2026].

| Traço | Exemplos | O que a esteira já diz |
|---|---|---|
| **Um ponto de vista claro** | Kümmerlein, "um site de escritório sem os clichês de sempre"; LAVA Dental (CSSDA, 2026), "a odontologia como experiência de estúdio"; a voz de cachorro do Don't Board Me; o recorte cultural do Ballena | O briefing visual e o único elemento memorável (`04-direcao-de-arte.md`, passo 1) |
| **Uma interação-assinatura tirada do negócio** | A 404 em WebGL com a fumaça de escapamento da Forge Automotive; o "gut zoomer" da Vibrant Wellness; a grade de aulas da Phive; a introdução da Lama Lama, feita do ícone do logotipo | A peça-assinatura (`14-funcionalidades/08-peca-assinatura.md`) |
| **Fotografia e vídeo próprios** | Tengile, ERA Residence, CRISP e Twofold trazem a marcação de fotografia e vídeo no Awwwards | `08-imagem-e-fotografia.md` |
| **Sistema tipográfico rígido e uma ou duas cores** | Phive, com uma; Aventura, com duas | `05-tipografia.md`; um acento em até 10% da tela (`06-cor-forma-e-superficie.md`, seção 3) |
| **Detalhes acabados** | O Awwwards pontua carregamentos, rodapés, menus, formulários e páginas 404 como "elementos" nomeados | Os estados e o piso de ofício (`11-anti-ia.md`, seção 5.8) |
| **Texto real** | Texto provisório sinaliza falta de estratégia de conteúdo | Conteúdo real desde o rascunho (`11-anti-ia.md`, seção 8) |
| **Modelo rápido não é distintivo** | O Awwwards Market vende modelos de terapia de US$ 49 a 79, um deles anunciando 95 no Lighthouse | A nota alta é o piso, não a identidade (`11-anti-ia.md`, princípio 8) |

**Objetivo.** Mostrar onde está a diferença que um modelo pronto não entrega: o ponto de vista, a peça do ofício e a fotografia do cliente.

---

## 4. Os premiados medidos (07.10.2026)

**Instrumento.** Navegador real, 1440 × 900. O mesmo das análises de setembro, para que os números se comparem.

| Site | Prêmio · nota | Fontes | Imagens | Vídeos | Rolagem com inércia (Lenis) |
|---|---|---|---|---|---|
| **Blind Barber 10-Year** (barbearia) | Site do dia, 2020 · 7,56 | Monument Grotesk | **251** | **26** | Não |
| **Aventura** (odontologia) | Site do dia, 19.03.2026 · 7,41 (desenvolvimento 8,11) | Instrument Serif + Inter Tight | 40 | 1 | Sim |
| **Halo** | 7,41 | Nuckle | 23 | 1 | Sim |
| **MORE** (nutrição e saúde) | Site do dia, 2025 · 7,39 | Founders Grotesk Condensed | 175 | 3 | Sim, com GSAP e Webflow |
| **Haven** (construção) | Menção honrosa, 2026 | Suisse | 14 | 2 | Sim |
| **Ario** (advocacia) | Menção honrosa, 2026 | ario-sans | 26 | 1 | Não |

**O que a página de cada prêmio destaca** (lido em 07.10.2026) [FU]:
- **Blind Barber 10-Year** (estúdio MOUTHWASH; site do dia em 15.10.2020): paleta de três cores (`#000`, `#9C9C9C`, `#fff`), animação de carregamento, uma página.
- **Aventura Dental Arts** (The First The Last): "scroll interaction", a animação do herói, o carrossel de serviços.
- **Halo Dental** (REF Digital; site do dia em 10.09.2024): a interação de mouse.
- **MORE Nutrition** (FUTURE THREE e Somefolk; site do dia em 03.11.2025): a animação de introdução, "blob animation & momentum based hover".
- **Menções honrosas:** Haven Constructions (Dobre Agency, 10.06.2026), Kindred Pet Care (Areal.design, 26.04.2024), Ario (25.05.2026) e Tweed Barbers (08.05.2013).

**As lições:**
1. **Fotografia real em quantidade:** de 14 a 251 imagens e de 1 a 26 vídeos; os sites do Atlas tinham zero (`08-imagem-e-fotografia.md`).
2. **Uma ou duas famílias,** quase sempre comerciais ou próprias (`05-tipografia.md`).
3. **A rolagem com inércia é comum entre os premiados e vedada no Atlas.** A ata v3.0 (V) a descartou "em definitivo". Os ramos de bairro também não a usam: zero de cinco barbearias e zero de seis escritórios de advocacia em setembro (seção 5.3).
4. **O prêmio não respeita o orçamento.** Transferido nos primeiros 5 s, a 1440 × 900: Aventura 5,3 MB e 18.429 px de altura; Halo 1,4 MB, com 553 KB de script, e 5.669 px; Haven 831 KB, com 547 KB de script, e 12.451 px; Ario 32,5 MB e 18.392 px; MORE, 14.281 px; Blind Barber, 145.866 px [V, medido]. Nenhum cabia no orçamento antigo do Atlas, de 180 KB de script e 1,5 MB na carga. Desde 08.10.2026, os sites de marca têm 600 KB de script e 5 MB na carga, e Halo e Haven cabem inteiros (`15-desempenho.md`, seção 2.1); Aventura e Ario seguem acima do peso. O premiado calibra o acabamento, e agora também o peso possível; o que não se copia é o que trava o celular ou não funciona sem script.

---

**Atualização de 09.10.2026.** Nove premiados de negócio físico de 2026 (hotelaria, restaurantes, uma barbearia e uma clínica odontológica), lidos pelo CSS publicado, com a cor, a interface e a composição de cada um: `19-o-padrao-atlas.md`, seção 4.1. As regras de cor e de interface que saíram deles estão nas seções 5.1 e 6.1.

## 5. As referências por nicho

### 5.1 · O quadro

**Levantamento** de 07.10.2026 nas páginas do Awwwards e do CSS Design Awards, mais as análises de setembro.

**Antes de citar um prêmio a um cliente,** confira-o na página do prêmio.

| Nicho | Premiados para estudar | Medidas de setembro (`nichos/analises/`) | O que olhar neles | Cuidado de norma |
|---|---|---|---|---|
| **Barbearia** | CRISP (menção, 2026); Rendezvous (menção); Blind Barber 10-Year (site do dia, 2020); Fort Worth (CSSDA) | 5 referências; **5 de 5 mostram a equipe em retratos**, de 15 a 54 fotos; 0 de 5 com Lenis | O retrato de cada profissional, o letreiro, a cadeira, o preço à vista | — |
| **Nutrição** | Institute of Health (menção, 2026); Vibrant Wellness (site do dia, 2026); Klearmind (menção, 2025); MORE (site do dia, 2025) | 3 referências, **nenhuma de consultório individual** | A tipografia de leitura, a calma, o espaço | CFN 599/2018: nada de imagem do corpo, resultado nem depoimento. Referência estrangeira traz linguagem de emagrecimento |
| **Construção** | Marvell Tile & Stone (site do dia, 2026, em Next.js); Floema (site do mês, maio de 2026); Composites.archi (site do dia, 2025); Kōzōwood (site do dia, 2024, com som); Haven (menção, 2026) | 6 referências; 5 de 6 com Lenis (segmento de alto padrão); Kononenko com título de 14 px | A matéria (pedra, madeira, aço) em foto grande; a escala tipográfica | CDC. Som só com ação do visitante, com controle para parar (WCAG 1.4.2) |
| **Restaurante** | Son Daven (site do mês, junho de 2026); Burrito Madre (menção, 2026); Ballena (menção, 2026); Crav (site do dia, 2026) | 6 referências; **5 de 6 com vídeo na capa**; a primeira ação entre 16 e 46 px do topo (o demo do Atlas: 620 px); 3 de 6 com Lenis | O prato filmado; o cardápio legível; a ação no alto | Ver `nichos/restaurante.md` |
| **Odontologia** | Aventura (site do dia, 19.03.2026); LAVA (CSSDA, site do dia, 2026); L'Avenir (2015) | 1 referência, um modelo do Webflow, **incompleta**; três das seis vedações medidas no texto do modelo | A sobriedade clínica, a foto do dentista e da clínica | **[DIV]** CFO-196/2019 e Código de Ética: até o parecer, sem antes e depois; preço vedado (art. 44) |
| **Psicologia** | Twofold (menção, 2026); Q Psychology (menção, 2025) | 1 referência, estrangeira; registro profissional ausente | A sala vazia, o texto que acolhe sem prometer | CFP 010/2005; o CRP à vista (CFP 003/2007, art. 53) |
| **Imobiliária** | ERA Residence (site do mês, agosto de 2026; Webflow e GSAP, com paralaxe); Realevate (site do dia, 27.09.2026); Sobha Privy. A categoria teve ao menos 7 sites do dia em 2026 (https://www.awwwards.com/websites/real-estate/) [FU] | 11 referências; 8 de 11 com Lenis; Arete Immobiliare com título de 256 px em 0,37 MB | A ficha de cada imóvel; a planta; a luz do dia; a escala do título | CRECI junto do nome, com no mínimo 25% do tamanho dele (COFECI 1.065/2007, arts. 2º e 5º) |
| **Academia** | Phive (site do dia, 2025, com acessibilidade 6,2); Essor; Core Atelier | 6 referências; 2 de 6 com Lenis; BucklerFit com 57,2 MB, 397 imagens e 10,6 s | O espaço e os professores; a grade de aulas | CONFEF 307/2015; sem aluno identificável (LGPD) |
| **Pet shop** | Don't Board Me (site do dia e do ano, 2024); Kindred (menção, 2024); ROOOF (menção, 2025) | 5 referências e 1 imagem | Os animais de verdade, com o consentimento do dono; o tom | CFMV 1.649/2025, se houver veterinário |
| **Oficina** | Forge Automotive (indicado, 2026); BALLSYSTEM (CSSDA, 8,21); Sperotto (CSSDA, 7,85); Spades (CSSDA, menção); Classics Garage (menção); Artificial Garage | 3 referências, uma delas modelo comercial | A oficina real: o painel de ferramentas, a ordem de serviço; nada de foto de banco ("fotografia de banco com modelo de macacão destrói a confiança", pesquisa de setembro) | CDC, arts. 26, 39 e 40 |
| **Advocacia** | Kümmerlein (menção, 2025); IMK Avocats (menção, 2026); Ario (menção, 2026). **Nenhum escritório de advocacia é site do dia desde 2014** | 6 referências; 0 de 6 com Lenis; Zachmann com título de 150 px, 0,67 MB e **zero imagens** | A tipografia como única alavanca: índice de código, versaletes, notas | Provimento 205/2021: sem foto do escritório, sem honorário, sem depoimento |
| **Medicina** | Nenhum estudado | **Não feita:** falta consultório ou clínica brasileira | — | CFM 2.336/2023 |

### 5.2 · Os pares brasileiros: o que não fazer

| Site (nicho) | Defeito medido em setembro |
|---|---|
| Falcones (barbearia) | 205 pedidos; o `h1` é o título de uma seção |
| BucklerFit (academia) | 57,2 MB, 397 imagens, 10,6 s de carga |
| Materials Market (construção) | 197 pedidos; o `h1` é o aviso de cookies |

**Objetivo.** Os três pares brasileiros medidos estavam entre os piores dos 46. É a oportunidade do Atlas, não o seu teto.

### 5.3 · O que as 46 referências ensinaram

| Achado | Números | Regra que ficou |
|---|---|---|
| **Conteúdo em português não significa norma brasileira** | 4 casos em 4 nichos: emagrecimento (nutrição), registro ausente (psicologia), superlativo e garantia (odontologia), honorário e comparação (advocacia) | Antes de importar linguagem ou recurso, registrar sob que norma a referência opera |
| **Defeito de acessibilidade invisível na tela** | 7 de 46, um em cada sete. **`h1` errado:** o aviso de cookies, o título de uma seção, "Home". **Letras duplicadas ou palavras emendadas** pela animação. **`lang="en"`** em página de outro idioma | A régua compara o `h1` lido com o desenhado e confere o `lang` (bloco 3) |
| **A rolagem com inércia segue o segmento, não o ramo** | Imobiliária 8 de 11, construção 5 de 6, restaurante 3 de 6, academia 2 de 6, barbearia 0 de 5, advocacia 0 de 6 | Vedada no Atlas (ata v3.0, V) |
| **Ambição tipográfica não custa peso** | Arete: título de 256 px em 0,37 MB. Zachmann: 150 px, 0,67 MB, zero imagens. Demos do Atlas: de 58 a 84 px | A postura de exibição ou de contenção (`05-tipografia.md`, seção 6.3) |
| **A distância é fotográfica** | Zero imagens nos demos; de 8 a 397 nas referências | Material do cliente, exigido no briefing (`08-imagem-e-fotografia.md`) |
| **A primeira ação** | Nas referências de restaurante, de 16 a 46 px do topo; no demo, 620 px | A ação até 45% da altura na mesa e 60% no celular (`07-composicao.md`, seção 6) |

---

## 6. Como estudar uma referência

**Regra.** Toda referência se estuda com o **mesmo instrumento**, e o estudo fica registrado.

**Objetivo.** Impressão não se compara; medida, sim. Foi o instrumento comum que permitiu ver, em onze nichos, a mesma distância fotográfica.

**Como fazer.**
1. **Abrir no navegador real**, a 1440 × 900 e a 390 × 844, com o agente de usuário do aparelho.
2. **Medir:**
   - pedidos, peso transferido, tempo de carga;
   - altura em telas;
   - número de imagens e de vídeos;
   - posição da primeira ação;
   - corpo do `h1`;
   - bibliotecas (GSAP, Lenis, Swiper, jQuery, Spline, three.js, WebGL);
   - as fontes (famílias e licença).

   Os scripts da medição de setembro se perderam com o ambiente, em 11.09.2026. Até haver ferramenta própria, mede-se pelo DevTools (aba Rede, cache desligado, recarga completa) e pelo Lighthouse, anotando os mesmos campos.
3. **Conferir o invisível:**
   - o `h1` lido;
   - o `lang`;
   - os nomes acessíveis;
   - o que a animação faz ao texto.
4. **Registrar a norma:** de que país é a referência, e o que nela seria infração aqui (seção 5.3).
5. **Separar forma de conteúdo:**
   - **forma** (escala, ritmo, composição, direção de foto, a coreografia de um momento) se aproveita;
   - **texto, promessa, depoimento e preço** nunca.
6. **Escrever numa frase** o que a referência faz bem e por que funcionaria — ou não — no ramo e no bairro do cliente.
7. **Guardar** a data, o endereço e as medidas no `identidade.md` do cliente, ou na análise do nicho no repositório do Atlas. As capturas ficam fora do repositório: são obra de terceiros.

**Como conferir.** Cada referência citada num `identidade.md` tem a frase do passo 6 e a norma do passo 4.

---

## 7. O que aproveitar e o que nunca copiar

| Aproveitar (a ideia) | Nunca copiar |
|---|---|
| A escala: um título de exibição, um número grande com função | O texto, a promessa, o depoimento, o preço |
| O ritmo: alternância de densidade entre seções | As imagens, os vídeos, as ilustrações: são obra protegida (Lei 9.610/1998) |
| A direção de foto: luz, ângulo, recorte | O código e os arquivos de fonte sem licença |
| A coreografia de **um** momento | A assinatura de outra marca (o objeto, o gesto que só ela tem) |
| A forma de um fluxo (agendar, orçar, confirmar) | O que a ata ou a norma vedam: rolagem com inércia, tela de abertura longa, cursor que esconde o ponteiro, antes e depois sem parecer, honorário |

**Objetivo.** A ideia não tem dono; a expressão dela, sim. E o cliente do Atlas precisa de um site que seja dele, não de uma versão de outro.

---

## 8. Inscrever um site num prêmio (RATIFICADO)

Nada disto está decidido: o Atlas ainda não inscreveu nenhum site.

| Regra | Objetivo | Fonte |
|---|---|---|
| **[cli]** Só com autorização escrita do cliente | O site e a marca são dele | — |
| Esperar de 2 a 4 semanas depois da publicação, para corrigir os defeitos de borda e medir o desempenho real | O júri abre em qualquer aparelho | Utsubo [FU] |
| Começar pelo CSS Design Awards, mais acessível e mais rápido; um prêmio por vez | Uma vitória ajuda a seguinte | Utsubo [FU] |
| Inscrever no começo da semana e não publicar nada durante a votação | São cerca de cinco dias de voto | Hon Tran [FU] |
| A conformidade e a acessibilidade não se negociam pela nota | O prêmio não é o objetivo; o objetivo é o cliente receber mais contatos | `00-principios.md` |

**Custos de referência** (conferir no ato) [FU]:
- **Awwwards:** de US$ 65 a 75;
- **CSS Design Awards:** cerca de US$ 49.

**As lacunas entre o Atlas e o nível dos premiados** (levantamento de 07.10.2026; cada uma com o que o kit já traz e o que falta decidir ou contratar):
- **Fotografia:** fotógrafo por diária (piso de R$ 654 a R$ 1.343) ou, como alternativa levantada, um kit de luz com protocolo por nicho, e um estabelecimento real que autorize o uso das fotos: o piloto da nutrição (`08-imagem-e-fotografia.md`, seções 6 e 7).
- **Tipografia própria por marca:** licença por cliente (`05-tipografia.md`); no Atlas, a Archivo Black e a Archivo (licença OFL), as do site de 28/08, desde 05.10 (mantidas pelo usuário em 08.10.2026).
- **Ilustração e 3D:** ilustrador ou artista 3D, orçado e repassado ao cliente (`14-funcionalidades/08-peca-assinatura.md`, seção 5).
- **Direção de arte no fluxo:** o passe de identidade antes do código (`04-direcao-de-arte.md`; `01-processo.md`, etapa 4).
- **Decisões de norma por plano, ratificadas em 08.10.2026:** o 3D, o movimento ligado à rolagem e a rolagem com inércia, esta vedada pela ata v3.0, V (`09-movimento.md`, seções 5 e 7).
- **Aparelhos de teste:** um Android de entrada e um iPhone reais (`../qualidade/08-desempenho.md`, seção 8; `../qualidade/06-acessibilidade.md`, seção 5).
- **Portões técnicos:** lint, testes, axe e Lighthouse na integração contínua, como dependências de desenvolvimento, sujeitas à regra de tecnologia nova (`../qualidade/13-integracao-continua.md`, seção 9; `13-tecnologia-e-estrutura.md`, seção 9).
- **Inscrição em prêmios:** o CSS Design Awards primeiro (acima).

---

## 9. Manter a lista viva

**Regra.** A cada trimestre, junto com a lista de marcas de IA (`11-anti-ia.md`, seção 9):
1. **Rever os premiados** dos doze nichos no Awwwards e no CSS Design Awards.
2. **Medir os novos** com o instrumento da seção 6.
3. **Atualizar o quadro** da seção 5.1, com a data.
4. **Retirar o que envelheceu:** o site que saiu do ar, o efeito que virou padrão.
5. **Preencher as lacunas**, nesta ordem:
   - medicina, que não foi analisada;
   - odontologia, incompleta;
   - psicologia, com um par só, estrangeiro;
   - nutrição, sem consultório individual.

**Objetivo.** As referências envelhecem como as marcas de IA: o que distingue hoje vira padrão quando todos copiam.

**Como conferir.** A data de "Atualizado em" tem menos de três meses, e cada nicho tem pelo menos três referências medidas.

---

## 10. Lista de conferência

1. As referências do mundo físico vêm antes das de site, no `identidade.md`.
2. Cada referência de site traz a frase do que se aproveita e a norma sob a qual opera.
3. Nenhum texto, imagem, código ou assinatura de outra marca foi copiado.
4. Nenhuma prática vedada pela ata ou pelo conselho entrou por imitação (rolagem com inércia, tela de abertura, antes e depois, honorário).
5. As medidas foram tomadas com o mesmo instrumento, com data.
6. Os pontos em que os premiados falham — usabilidade, acessibilidade, celular — estão acima do nível deles no site do cliente.

---

## Fontes citadas

- Awwwards, critérios de avaliação: https://www.awwwards.com/about-evaluation/
- CSS Design Awards: https://www.cssdesignawards.com
- Hon Tran, como ganhar um site do dia: https://www.hontran.dev/blog/how-to-win-an-awwwards-site-of-the-day
- Utsubo, o que o júri procura (05.03.2026): https://www.utsubo.com/blog/award-winning-website-design-guide
- Jansson e Smith, *Design fixation*, 1991: https://doi.org/10.1016/0142-694X(91)90003-F
- Warren, *Style Tiles*: https://alistapart.com/article/style-tiles-and-how-they-work/
- Mobbin: https://mobbin.com
- No repositório do Atlas: as onze análises de nicho e o índice delas (`nichos/analises/`); o estudo do Awwwards de 07.10.2026

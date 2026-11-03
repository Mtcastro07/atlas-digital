# 11 · Anti-IA: como julgar e como não gerar a "cara de IA"

> **Para que serve.** O método para dizer se um site do Atlas — o próprio, um de exemplo ou um de cliente — tem "cara de IA", e a disciplina para não produzi-la. "Cara de IA" são marcas visuais e verbais que aparecem em qualquer página gerada, qualquer que seja o assunto, e que fazem o visitante desconfiar de que ninguém escolheu nada.
>
> **Quando usar.**
> - **Antes do código:** a avaliação do **plano** de design (etapa 4 de `01-processo.md`).
> - **Antes do rascunho de 24 horas e antes de publicar:** a avaliação do **resultado** (etapas 7 e 11).
> - A cada redesenho, e quando alguém pedir "avalie com o método anti-IA".
>
> **Depende de.** `04-direcao-de-arte.md` (o briefing visual e o plano de design, que esta avaliação julga), `05` a `10` (as regras de cada eixo, que citam as marcas daqui), `../qualidade/11-design-e-anti-ia.md` (quando a avaliação é porta e quem decide).
>
> **Estado.** O método é **RATIFICADO** em 08.10.2026, como método de trabalho desde 07.10.2026 (pedido do usuário: "registre isso, pois futuramente vou querer que você reutilize esse método avaliativo"; registro de decisões do Atlas, 07.10). As correções que ele aponta no site do Atlas e nos três sites de exemplo (seção 7) **não foram aplicadas**: ficam para decisão dos sócios; entre 14 e 16.10.2026, o passe da repetição aplicou parte delas (seção 7). Esta versão, de 08.10.2026, refaz o registro de 07.10 (`documentacao/atlas--avaliacao-anti-ia.md`, no repositório do Atlas) com as regras do detector Impeccable lidas no arquivo de origem e os estudos conferidos de novo.
>
> **Atualizado em:** 16.10.2026: as marcas M1 e M2 com a série dentro do site, pedido do usuário de 14.10.2026 (`20-repeticao-dentro-do-site.md`); a seção 7 com o que o passe de 14 a 16.10.2026 corrigiu. 17.10.2026: C14, C15, I8, L10, Q18 e Q19, dos dois fechamentos do Atlas. 18.10.2026: X9, Q20 e Q21, do fechamento do Atlas Digital, e os casos novos da I8 e da Q18 (`../qualidade/15-revisao-do-impeccable.md`, seção 7; `registros/atlas/decisoes.md`).

---

## 1. Por que isto importa

### 1.1 · Os sites ficaram parecidos, e a IA acelera

- **A semelhança é medida, e começou antes da IA.** Os sites ficaram mais parecidos desde ~2007, sobretudo no leiaute, por bibliotecas e padrões compartilhados (Goree et al., CHI 2021, https://doi.org/10.1145/3411764.3445156) [V].
  - O estudo (Goree, Doosti, Crandall e Su) comparou por visão computacional capturas de 2003 a 2019 e entrevistou 11 designers: a distância média de leiaute entre os sites caiu mais de 30%. As causas citadas são o código e as bibliotecas compartilhados, os esquemas de cor padronizados e o suporte ao celular [V]. A cobertura de imprensa fala em ~10.000 sites e 200.000 imagens, e em sites com Bootstrap, Font Awesome ou jQuery UI mais parecidos entre si (https://thenextweb.com/news/researchers-analyzed-10000-websites-and-yes-they-all-look-the-same) [FU]. **Para o Atlas:** a biblioteca de componentes é um dos motores medidos da semelhança; por isso o shadcn entra só adaptado (`04-direcao-de-arte.md`, seção 4.2; marca L8).
- **Os modelos de linguagem convergem para o mais frequente.** A Anthropic chama isso de "convergência distributiva": sem direção, a saída "quase sempre se conforma a fontes Inter, degradês roxos sobre fundo branco e animação mínima" (12.11.2025, https://claude.com/blog/improving-frontend-design-through-skills) [V].
  - As respostas criativas de modelos diferentes se parecem mais entre si do que as de pessoas diferentes (Wenger e Kenett, 2025, https://arxiv.org/abs/2501.19361) [V]; trocar de modelo, portanto, não devolve a variedade.
  - A IA aumenta a criatividade de cada um e reduz a diversidade do conjunto (Doshi e Hauser, *Science Advances*, 2024, https://doi.org/10.1126/sciadv.adn5290) [V]; o mesmo efeito de homogeneização aparece na geração de ideias (Anderson, Shah e Kreminski, C&C 2024, https://doi.org/10.1145/3635636.3656204) [V]: num estudo com 36 participantes, usuários do ChatGPT produziram ideias semanticamente menos distintas entre si do que usuários de outra ferramenta de apoio à criatividade.
- **Nas ferramentas de interface, o efeito foi medido.**
  - Em 120 interfaces de cinco ferramentas geradoras, mais de 25% das justificativas de design apresentadas ao usuário **não estavam no que foi gerado** (34% nos requisitos funcionais), e as interfaces convergiam na aparência e na organização (*Design Theater*, aceito no AIES, https://arxiv.org/abs/2607.22928) [V].
  - O "vibe coding" de sites tende a estreitar a diversidade, e a geração sem esforço agrava o efeito; a mitigação proposta é a **fricção produtiva**, etapas que obrigam a desafiar o resultado padrão (Shin et al., 2026, https://arxiv.org/abs/2603.13036) [V].
    - **O peso dessa evidência:** é uma análise de risco — 63 fontes e o percurso por seis ferramentas —, sem estudo com usuários [FU]. As mitigações que ela propõe são as que este método já usa: painéis e perguntas antes de gerar (o briefing visual e os painéis de estilo, `04-direcao-de-arte.md`, passos 1 e 5) e o resultado ancorado nos tokens da marca, para que a convenção genérica apareça como desvio (`04-direcao-de-arte.md`, seção 4.1).
  - O próprio shadcn criou o `shadcn create` porque "todos os apps começaram a parecer iguais" (https://ui.shadcn.com/docs/changelog/2025-12-shadcn-create) [V].
  - As ferramentas de prototipação com IA partem do shadcn e do Tailwind e produzem telas "planas e intercambiáveis"; referências anexadas, painéis e especificações longas e específicas melhoram o resultado (NN/g, Wang e Brown, out. 2025, https://www.nngroup.com/articles/ai-prototyping/) [FU]. É uma segunda fonte, independente, da marca L8 (componente de biblioteca sem adaptação).
- **Na web aberta.** De 1.590 páginas do Show HN, pontuadas por 16 verificações determinísticas de CSS e de DOM (um navegador sem janela, o Playwright, lê o DOM e os estilos calculados; o autor não usa capturas nem deixa um modelo de linguagem julgar), **22% (347) acumulavam quatro marcas ou mais**, 32% (508) tinham duas ou três e 46% (735), zero ou uma (Krebs, 20.04.2026, https://www.adriankrebs.ch/blog/design-slop/) [FU]. Ressalvas: o autor estima de 5 a 10% de falso positivo, conferidos à mão; a análise e a redação foram assistidas por IA; o artigo cita ~1.400 páginas na introdução e 1.590 nos resultados, e lista 18 padrões onde diz 16; e o Show HN é de projetos de tecnologia, não de comércio local.

### 1.2 · O que custa é a suspeita

| Estudo | Achado | Evidência |
|---|---|---|
| CHI 2026, *extended abstracts* (Thorshaug, Schjelderup e Papachristos; n = 43; seis sites) | Sem aviso, os participantes preferiram os sites com imagem de IA. **Revelado o uso, a confiança migrou para os sites com fotografia**, com punição maior em governo e saúde (https://doi.org/10.1145/3772363.3798849) | [V] |
| NN/g, 21.08.2026 (n = 77) | Imagem de IA sem aviso foi tão bem quanto foto de banco; **quem suspeitou de IA avaliou o site pior** (https://www.nngroup.com/articles/ai-generated-images/) | [V] |
| Raptive, 2025 (3.000 adultos dos EUA) | Conteúdo tido como de IA: confiança −48%, autenticidade −57%, conexão emocional −60%, consideração de compra −14% (https://raptive.com/blog/the-ai-stink-is-real-and-its-costing-brands/) | [FU] pesquisa de empresa interessada |
| NIQ, dez. 2024 (mais de 2.000 espectadores, ~150 com EEG) | Anúncios gerados vistos como "irritantes, chatos e confusos", com ativação de memória mais fraca, mesmo nos anúncios percebidos como de alta qualidade (https://nielseniq.com/global/en/news-center/2024/niq-research-uncovers-hidden-consumer-attitudes-toward-ai-generated-ads/) | [FU] pesquisa de fornecedor |
| NIM, 2025 | O rótulo "feito por IA" no mesmo anúncio baixou credibilidade, apelo emocional, memória e intenção de clicar (https://www.nim.org/en/publications/detail/transparency-alone-does-not-create-trust) | [FU] |
| Washington State University (Cicek et al., 2024; mais de 1.000 adultos) | A palavra "inteligência artificial" na descrição de um produto baixou a intenção de compra, mais ainda em compras de risco, como eletrônicos caros, equipamento médico e serviços financeiros (*Journal of Hospitality Marketing & Management*; cobertura: https://www.heise.de/en/news/Study-AI-in-the-product-description-arouses-mistrust-among-customers-9824720.html) | [FU] |

**Leitura para o Atlas.** O dano não vem da ferramenta usada, vem da **percepção**: a cara de IA convida a suspeita, e a suspeita custa confiança. Nos nichos regulados do Atlas (nutrição, odontologia, psicologia, medicina, advocacia), a confiança é o produto. Por isso a avaliação é obrigatória nos três planos (`00-principios.md`).

**A contraevidência**, para não exagerar a leitura:
- Sem aviso, a imagem de IA no alto da página não reduziu a confiança; só quem suspeitou de IA avaliou pior (NN/g, 21.08.2026, n = 77, na tabela acima) [V].
- O anúncio de Natal da Coca-Cola feito com IA recebeu a nota máxima da System1, 5,9 estrelas, apesar da reação negativa na internet (https://system1group.com/ad-of-the-week/ai-or-no-ai-coke-gets-the-christmas-love) [FU].
- Revelar o uso de IA aumentou a confiança, mas só ~25% das pessoas notaram o aviso (Yahoo e Publicis, 2024, https://www.yahooinc.com/press/yahoo-publicis-media-survey-reveals-ai-ad-disclosure-increases-consumer-trust) [FU].

O que as leituras têm em comum: o custo está na **suspeita**, não na ferramenta. A regra do Atlas não muda: fotografia real do negócio e nenhuma escolha por omissão.

### 1.3 · Não é para ser estranho

- **A primeira impressão é rápida e conservadora.** Forma-se em ~50 ms (Lindgaard et al., 2006, https://doi.org/10.1080/01449290500330448) [V]. Entre 17 e 50 ms, favorece o simples e o típico do gênero (Tuch et al., 2012, https://doi.org/10.1016/j.ijhcs.2012.06.003) [V]. A complexidade visual e o colorido percebidos predizem essa impressão (Reinecke et al., CHI 2013, https://doi.org/10.1145/2470654.2481281) [V].
  - Na pesquisa de Reinecke et al., 548 pessoas avaliaram 450 sites: o colorido e a complexidade, com os dados demográficos, explicaram cerca de metade do apelo [V].
  - **Beleza e uso, nos dois sentidos.** Interface atraente é julgada mais fácil de usar (Kurosu e Kashimura, 1995, https://doi.org/10.1145/223355.223680; Tractinsky, 2000, https://doi.org/10.1016/S0953-5438(00)00031-X) [V]; mas a usabilidade também molda a beleza percebida (Tuch et al., *Computers in Human Behavior*, 2012, https://doi.org/10.1016/j.chb.2012.03.024) [V]. O acabamento não salva uma experiência quebrada.
  - **O visual pesa na credibilidade.** No estudo de credibilidade de Stanford (2.684 participantes), 46,1% dos comentários sobre credibilidade falavam da aparência do site; é fração de comentários, não de pessoas (https://advocacy.consumerreports.org/research/how-do-people-evaluate-a-web-sites-credibility) [FU].
  - **O expressivo ajuda, com limite.** Na pesquisa do Material 3 Expressive (Google, 2025; 46 estudos, mais de 18.000 participantes; pesquisa de fornecedor), os elementos-chave foram achados até 4× mais rápido, e até 87% dos participantes de 18 a 24 anos preferiram o desenho expressivo. A mesma fonte diz que quebrar padrões básicos de interação prejudicou o uso e que "uma minoria forte" preferiu o calmo (https://design.google/library/expressive-material-design-google-research) [FU].
- **A regra que sai daí:** estrutura e navegação convencionais; **a diferença vai para a camada da marca** — tipo, cor, forma, fotografia, texto e um momento-assinatura (`04-direcao-de-arte.md`, seção 1).
- **Ativo distintivo vale por fama × unicidade** (Romaniuk, Instituto Ehrenberg-Bass, *Building Distinctive Brand Assets*, 2018) [FU]. O ponto de partida é que os compradores veem as marcas concorrentes como pouco diferenciadas (Romaniuk, Sharp e Ehrenberg, 2007) [FU]. O instituto pontua cada ativo por fama e por unicidade: o ativo famoso que o concorrente também usa cai no quadrante "evitar". O visual padrão de IA tem unicidade próxima de zero [NV: inferência, pelo próprio critério]. O que todo concorrente também usa — a tarja no título, o número grande com legenda — não distingue ninguém; o globo do logotipo, a esfera da capa e as fichas de latão da barbearia distinguem.

### 1.4 · As listas envelhecem

O que a Anthropic recomendava contra o genérico em novembro de 2025 virou marca de IA em 2026:

| Versão da skill `frontend-design` | Recomendava ou vedava |
|---|---|
| Novembro de 2025 | **Vedava** Inter, Roboto, Arial, fontes do sistema, degradê roxo sobre branco, Space Grotesk. **Recomendava** "malhas de degradê, texturas de ruído, … sombras dramáticas, … cursores próprios e grão", entradas escalonadas e "estados de hover que surpreendam" |
| Junho de 2026 | "A capa é uma tese." O número grande com legenda e degradê é "a resposta de modelo". Os três agrupamentos visuais (seção 5.2). "Animação extra contribui para a sensação de que o design foi gerado por IA" |
| Setembro de 2026 (vigente) | Acrescenta o kit de cartões de SaaS e o "cromo de modelo" (seção 5.4); as três marcas tipográficas "mais comuns de página gerada"; esmaecer e subir em toda seção "lê como gerado por IA"; o processo planejar → revisar contra um pedido parecido → construir → criticar com capturas |

Fontes: o histórico da skill (https://github.com/anthropics/claude-code/commits/main/plugins/frontend-design/skills/frontend-design/SKILL.md) [V], lido nas três versões.

**Consequências:**
- A Fraunces (na regra `overused-font`) e a Instrument Serif (entre os pares comuns de Krebs) mostram o ciclo: a fuga do padrão de ontem vira o padrão de hoje.
- Vários efeitos de identidade do Atlas vêm desse repertório: o grão e a luz que segue o cursor estavam entre as recomendações de 2025; o halo e o brilho colorido estão entre as marcas de 2026 (seção 7).

Por isso esta esteira trata a avaliação como **processo** (seção 4), e a lista de marcas (seção 5) como **calibração datada**, revista a cada trimestre (seção 9).

### 1.5 · Os limites da evidência

- **Nenhum estudo testou a reação de visitantes comuns a leiautes "com cara de IA".** A evidência de confiança da seção 1.2 é sobre imagem, conteúdo e anúncio; aplicá-la ao leiaute é extrapolação [NV]. Por isso a avaliação julga escolha e não pune ferramenta (princípio 1).
- **Pesquisa de empresa, sem relatório completo:** Raptive, NIQ, Getty e Google (o Material 3 Expressive) [FU].
- **Datas que divergem:** o artigo de Goree et al. data a aproximação dos sites de ~2007; a imprensa, de 2010 a 2016 [DIV].
- **Não encontrados** na pesquisa de 07.10.2026 (não procurar de novo sem pista nova): um ensaio chamado "The Great Sameness"; um texto da Smashing Magazine de 2024 a 2026 sobre o tema; um ensaio de Brad Frost de 2025.
- **Não lidos diretamente:** *Filterworld* (Chayka, 2024), o original de Boris Müller (2018) e "You never stop cultivating taste" (Figma, junho de 2026, lido só em resumo). Citá-los exige lê-los antes.

---

## 2. Os princípios

| # | Princípio | Objetivo |
|---|---|---|
| 1 | **Marca não é proibição.** Cada achado é **assinatura** (escolhida, com motivo escrito), **marca de IA** (está ali porque é o padrão) ou **neutro** (convenção de uso ou exigência de norma). Só a segunda se corrige. **O briefing manda:** se ele pede um dos visuais da lista, segue-se o briefing ("as palavras do próprio briefing sempre vencem", skill da Anthropic) | Evitar que a lista vire um catálogo de proibições que produz o seu próprio genérico |
| 2 | **Uma ideia ousada, em toda a página.** O mundo da marca, com os efeitos que saem da mesma matéria e da mesma luz; um ponto focal por cena. Antes de entregar, tirar o acessório que não sai da matéria (o conselho de Chanel, na skill da Anthropic). Revisto em 09.10.2026: "um elemento memorável; o resto, quieto" deixava a página chapada (`19-o-padrao-atlas.md`) | Vários efeitos espalhados, de origens diferentes, leem como gerados; um sistema orquestrado, não |
| 3 | **O assunto é a fonte.** Material, vocabulário e objetos do ofício do cliente. O teste: *caberia em qualquer site?* Se sim, não é do ofício | O que sai do assunto não se repete em outro cliente |
| 4 | **Estrutura carrega informação.** Numeração, rótulo, filete e moldura só entram se dizem algo verdadeiro do conteúdo (uma sequência real, uma categoria real) | A estrutura decorativa é o andaime visível do modelo |
| 5 | **Texto é design.** A frase que soa a slogan de modelo pesa tanto quanto um degradê | O texto pode deixar a página tão "de modelo" quanto o desenho (skill da Anthropic) |
| 6 | **Avalia-se a tela, não a intenção.** Julga-se o que foi construído, por capturas, nunca pelo plano, pelo comentário do código ou pela justificativa de quem fez | Mais de 25% das justificativas das ferramentas geradoras não estão no que elas geram (*Design Theater*) |
| 7 | **Fricção produtiva.** Os passos deste método são de propósito: obrigam a desafiar o padrão antes de construir | A geração sem esforço agrava a homogeneização (Shin et al., 2026) |
| 8 | **O piso de ofício não é a direção.** Passar em todas as conferências mecânicas não dá identidade. "Na dúvida entre o refinado e o comprometido, comprometa-se" (piso de ofício do Impeccable, https://github.com/pbakaus/impeccable) | A régua mede o mínimo; a identidade é outra conversa |

---

## 3. As duas avaliações

| | **Avaliação do plano** | **Avaliação do resultado** |
|---|---|---|
| **Quando** | Etapa 4 (direção de arte), antes de qualquer componente | Etapa 7 (antes do rascunho de 24 horas) e etapa 11 (antes de publicar: a lista de publicação, `../qualidade/14-ciclo-de-qa.md`, seção 5); a cada redesenho |
| **O que se julga** | O `identidade.md`: briefing visual, paleta, tipos, leiaute em ASCII, forma, movimento, imagem, princípios | O site construído, por capturas |
| **Passos** (seção 4) | 0, 2 (sobre o plano), **3**, 5 | 0 a 8 |
| **Porta** | **Nenhuma escolha por omissão sem motivo escrito** (passo 3) | **Nenhuma marca de IA de peso alto** (passo 6) |
| **Quem faz** | O Claude Code | O Claude Code |
| **Quem decide** | Matheus Castro Oliveira de Luna Garcia (desenvolvimento; CTO a ratificar) | Idem; no site do Atlas, os três sócios |
| **Onde fica** | `identidade.md`, seção "Testes" | `decisoes.md` e o relatório de QA (`../qualidade/11-design-e-anti-ia.md`) |

**Objetivo de haver duas.** Corrigir um plano custa uma frase; corrigir dez componentes custa um dia. A avaliação do plano pega o padrão antes que ele se espalhe; a do resultado pega o que o plano não previu e o que se perdeu entre o plano e a tela.

**Varia por plano** (o plano nunca decide a qualidade: `00-principios.md`):

| | [E] | [P] | [C] |
|---|---|---|---|
| Avaliação do plano | ✓ (sobre o sistema do nicho ajustado) | ✓ | ✓ |
| Avaliação do resultado | ✓ | ✓ | ✓ |
| Teste de unicidade (passo 4) | Contra os outros clientes do Atlas no mesmo nicho | + três concorrentes locais | Idem, com capturas lado a lado |
| Teste do desconhecido (passo 5) | Nas peças desenhadas, se houver | ✓ | ✓, obrigatório na peça-assinatura |

**[ex] Nos sites de exemplo**, a avaliação é a mesma, com uma regra a mais: o exemplo mostra o que o cliente recebe. Nada de efeito que nenhum plano entrega.

---

## 4. O procedimento, passo a passo

### Passo 0 · O briefing visual

**Regra.** Antes de avaliar, ter escritas as cinco linhas (`04-direcao-de-arte.md`, passo 1):
1. o assunto;
2. o público;
3. a tarefa principal da página;
4. três adjetivos da marca;
5. **o único elemento memorável**.

**Objetivo.** Sem isso não há como separar assinatura de padrão: tudo parece escolha ou tudo parece acaso.

**Como conferir.** As cinco linhas estão no `identidade.md`, com data.

### Passo 1 · As capturas

**Regra.** Cada página a **390 × 844** e a **1440 × 900**, primeira tela e página inteira, com o **movimento normal** (é o que o visitante vê). Mais os estados:
- o menu aberto;
- o hover e o foco da ação principal;
- um formulário com erro;
- um estado vazio e um carregando, onde houver.

**Objetivo.** Avaliar a tela (princípio 6). Na avaliação de 07.10.2026 foram 24 endereços (as 23 páginas e a 404) nas duas larguras.

**Como fazer.** Com o Playwright, num contexto próprio, contra o build de produção (`npm run build && npm start`), nunca contra o modo de desenvolvimento. Num site feito do kit, `node ferramentas/fotografar.mjs --movimento`: com o movimento normal, rolando a página antes da foto, para as revelações entrarem; sem a rolagem, a foto da página inteira as pegava escondidas (teste de 08.10.2026). As capturas da aprovação da identidade seguem com o movimento reduzido (o padrão da ferramenta).

**Atenção.**
- A captura de página inteira redimensiona a janela e pode **reiniciar a animação de entrada**: um título que "some" na foto se confere no navegador antes de virar achado (aconteceu em 07.10.2026).
- As capturas ficam na pasta temporária da sessão, fora do repositório.

### Passo 2 · A varredura das marcas

**Regra.** Percorrer o catálogo da seção 5, **categoria por categoria**, anotando cada achado com o **lugar exato**: página, seção, arquivo e, se der, a linha.

**Objetivo.** Achado sem lugar não se corrige; achado com lugar vira tarefa.

**Como fazer.**
- **Na avaliação do plano,** a varredura é sobre o texto do `identidade.md`: "acento terracota sobre creme" já é o agrupamento 1, antes de qualquer pixel.
- **Na do resultado,** sobre as capturas e o código.
- **A série se conta** (desde 14.10.2026): cada efeito e cada molde, por página, a 1440 e a 390 px, com o número no registro. O mesmo efeito em mais de um bloco da página, ou em todas as páginas, é M1 até prova em contrário (`20-repeticao-dentro-do-site.md`, seção 3).
- **Segunda opinião automática (ADOTADA em 14.10.2026, pedido do usuário).** O detector do Impeccable (regras em `crates/live/assets/antipatterns.json` do repositório dele, https://github.com/pbakaus/impeccable) acusa 59 padrões na versão lida em 08.10.2026: 31 de "slop" e 28 de qualidade. Desde 14.10.2026 roda travado (`impeccable@4.1.0`), com a habilidade no projeto e sem ganchos. **Desde 16.10.2026, cada site fecha com o Impeccable a 100%:** o detector, o `critique` e o `audit`. O resultado é comparado com este catálogo, coluna a coluna (converge, só o Impeccable, só o kit, contradiz), e o que o Impeccable acha de real e o kit não tinha entra na seção 5, com a fonte (`../qualidade/15-revisao-do-impeccable.md`).

**Como conferir.** Cada categoria da seção 5 aparece no registro, mesmo que com "nenhum achado".

### Passo 3 · O teste do pedido parecido (a porta do plano)

**Regra.** Imaginar — ou, melhor, **gerar de fato, numa sessão limpa** — a página padrão para um pedido parecido com o do cliente. A sessão limpa é um subagente novo do Claude Code, com só o pedido parecido, ou uma sessão nova aberta pelo usuário. Quem não pode abrir nenhuma das duas (um subagente não abre outro) faz o teste imaginado e o registra como tal: ele vale como revisão, não como a porta do Profissional e do Completo, que fica para quem pode. Por exemplo:
- "site de barbearia de bairro em Niterói, escuro e elegante";
- "site de nutricionista, claro e acolhedor".

Comparar com o plano, eixo por eixo. **Tudo o que coincidir é revisto ou justificado por escrito**, dizendo o que mudou e por quê.

**Objetivo.** O padrão é o que sai quando ninguém escolhe; se o plano coincide com ele, ninguém escolheu. É o passo central da skill da Anthropic: revisar o plano contra um pedido parecido antes de escrever código, e só construir depois de confirmar a unicidade relativa.

**Como fazer** (registro no `identidade.md`):

| Eixo | Padrão do pedido parecido | O plano | Coincide? | Decisão |
|---|---|---|---|---|
| Paleta | Quase-preto, acento dourado | Verde-garrafa, latão, granilite | Parcial (latão) | Fica: latão é o material da cadeira do próprio salão (referência física nº 3) |
| Tipografia | Serifa itálica no título, Inter no texto | Letreiro de pintor no título, grotesca no texto | Não | — |
| Capa | Título centralizado, dois botões | Peça-assinatura no alto, título à esquerda, uma ação | Não | — |
| Estrutura | Rótulo acima de todo título, 01/02/03 | Sem rótulos; numeração só nos passos do agendamento, que são uma sequência | Não | — |
| Movimento | Esmaecer e subir em toda seção | Um gesto: a ficha que vira | Não | — |
| Texto | "Mais que um corte. Uma experiência." | "Corte na tesoura, 40 minutos, R$ 45." | Não | — |

**Como conferir.** A tabela existe, cada coincidência tem decisão, e **nenhuma escolha por omissão ficou sem motivo escrito**: é a porta da etapa 4 (`01-processo.md`).

**Atenção.** Gerar o padrão no mesmo contexto em que o plano foi feito contamina o teste: o modelo tende a se repetir. Sessão limpa, sem o `identidade.md`.

### Passo 4 · O teste de unicidade

**Regra.** Sem o logotipo, a capa a 390 e a 1440 px, lado a lado com:
- **[todos]** os outros clientes do Atlas no mesmo nicho;
- **[P][C]** três concorrentes locais, do briefing (`02-briefing.md`);
- três referências premiadas do nicho (`12-inspiracao-e-referencias.md`), para calibrar o ofício.

**Perguntas:**
- alguém reconhece a marca sem o logotipo?
- quais elementos são **ativos distintivos** (famosos **e** só nossos) e quais são genéricos?
- o par de fontes, a paleta ou a forma repetem as de outro cliente do mesmo nicho?

**Objetivo.** Fama × unicidade (seção 1.3). E dois clientes vizinhos com o mesmo site provariam que o Atlas vende modelo.

**Como conferir.** A regra de `04-direcao-de-arte.md`, seção 6: o segundo cliente de um nicho muda pelo menos dois de três — o par tipográfico, a família de cor e a forma. A automação proposta (semelhança perceptual das capturas e distância das paletas) está em `../qualidade/11-design-e-anti-ia.md`.

### Passo 5 · O teste do desconhecido

**Regra.** Para cada peça visual (a peça-assinatura, os ícones, o gesto, a textura), a pergunta não é "está bem desenhado?", é **"o que alguém que não sabe diria que isto é?"**.

**Objetivo.** Quem desenhou sabe o que desenhou e não enxerga o erro de leitura. Em setembro de 2026, um manômetro desenhado para a oficina foi retirado com uma palavra: *relógio*. Doze graduações em volta de um ponteiro se leem como relógio antes de qualquer outra coisa.

**Como conferir.** Mostrar a peça, fora de contexto, a alguém que não participou, e anotar a primeira palavra. Se a palavra não for a pretendida, a peça volta.

### Passo 6 · O veredito e o registro

**Regra.** Uma tabela por site, com a contagem por categoria e a recomendação:

| Achado | Onde | Item (seção 5) | Classe | Peso | Recomendação |
|---|---|---|---|---|---|
| Uma palavra do título destacada pela tarja | Aberturas · `components/paginas/abertura-de-pagina.tsx` | T1 | marca de IA | alto (título) | Destaque pela escala ou pelo peso da frase inteira, ou nenhum |

**Os pesos:**

| Peso | Quando | O que exige |
|---|---|---|
| **Alto** | No **ponto de decisão** — o título da capa ou de abertura, a ação principal, a primeira tela — **ou** repetido em todas as páginas | Corrigir antes do rascunho e antes de publicar: **é a porta** |
| **Médio** | Ocupa uma seção inteira, ou se repete em várias seções | Corrigir ou justificar por escrito no `decisoes.md` |
| **Baixo** | Detalhe isolado, fora do ponto de decisão (o rodapé, um vínculo) | Registrar; corrigir quando passar por ali |

**[RATIFICADO] Nos nichos de saúde** (nutrição, odontologia, psicologia, medicina), marca da categoria Imagem (I) pesa sempre alto. *Objetivo:* saúde foi, com governo, onde o estudo da CHI 2026 viu a punição maior à imagem de IA revelada.

**[DECIDIDO em 08.10.2026] O exemplo fictício sem foto possível** (o [ex] de um nicho de saúde, pelo teste de produção do zero, em que a I6 reprovava a própria porta):
- **A I6 se registra e não fecha a porta do exemplo.** Ela entra no relatório de QA como pendência do exemplo, com o peso, e o `decisoes.md` diz por quê: não há consultório de verdade para fotografar, e banco ou IA ficam vedados (`08-imagem-e-fotografia.md`).
- **O exemplo não finge foto:** nenhum retângulo cinza com "foto aqui", nenhuma silhueta. O peso vai para a **imagem construída**, que é do ofício e é verdadeira: o objeto do ofício em 3D ou em CSS 3D, com a matéria da marca; o estudo de material; a tipografia de cartaz; a luz (`00-principios.md`, seção 9, camada 4). O diagrama (`08-imagem-e-fotografia.md`, seção 2.3) é a função, nunca a única imagem da capa: o exemplo de odontologia de 08.10.2026 apostou nele e caiu na P4.
- **A página que só existe com foto** ("O consultório") sai do exemplo, ou se funde noutra, e o roteiro registra a fusão.
- **Num cliente, nada disso vale:** a foto real é do briefing (`02-briefing.md`), e a I6 fecha a porta como qualquer marca de peso alto.

**Defeito de qualidade não é peso:** a régua o reprova (`../qualidade/02-regua.md`). As marcas da categoria Q (seção 5.9) que a régua mede são falha dela, não da avaliação.

**Objetivo.** Uma marca no ponto de decisão é vista por todos e nos primeiros segundos, quando a impressão se forma; no rodapé, por poucos.

**Como conferir.** A tabela está no relatório de QA, e a decisão de cada achado de peso alto ou médio está no `decisoes.md`, com quem decidiu e quando.

### Passo 7 · Reavaliar depois de corrigir

**Regra.** Novas capturas, nova varredura, nos lugares corrigidos e em volta.

**Objetivo.** A correção de uma marca costuma revelar a próxima: tirada a tarja do título, a capa centralizada aparece.

### Passo 8 · Anotar o que se tentou

**Regra.** Registrar no `decisoes.md` do cliente, e na lista de identidades por nicho do Atlas (`04-direcao-de-arte.md`, seção 6):
- o que se tentou;
- o que foi recusado e por quê.

**Objetivo.** "Criadores humanos têm memória e tentam fazer algo novo a cada vez" (skill da Anthropic). O modelo não tem: a anotação é a memória que impede o próximo cliente de receber a mesma ideia.

---

## 5. O catálogo das marcas

Cada item traz como reconhecê-lo, a fonte e a evidência. **[V]** quando duas fontes independentes o apontam; **[FU]** quando uma só. Os nomes entre crases são as regras do detector Impeccable (`antipatterns.json`, lido em 08.10.2026).

Fontes da lista:
- skill `frontend-design` da Anthropic, versão de setembro de 2026;
- o detector Impeccable e o "piso de ofício" dele (`reference/craft-floor.md`);
- Krebs, 2026;
- a avaliação de 07.10.2026.

### 5.1 · Tipografia (T)

| # | Marca | Como reconhecer | Fonte | Ev. |
|---|---|---|---|---|
| T1 | **Uma palavra ou expressão do título destacada** (itálico, negrito, outra cor, tarja, onda) | Dentro do `h1`/`h2`, um trecho com estilo diferente do resto | Anthropic: está entre as marcas tipográficas que são "as mais comuns de página gerada"; Krebs: "palavra de destaque em serifa itálica num título em Inter" | [V] |
| T2 | **Rótulo pequeno acima do título** (kicker, *eyebrow*), em caixa-alta espaçada, ou como "pílula" acima do título da capa | Um bloco curto, de corpo pequeno, logo acima de um título | Anthropic; `kicker-above-heading` ("vedado de vez, repetido ou não"); `hero-eyebrow-chip`; Krebs ("selo acima do h1") | [V] |
| T3 | **Caixa-alta nos rótulos** | Rótulos em `uppercase` com espaçamento aberto | Anthropic; Krebs | [V] |
| T4 | **Família padrão escolhida por omissão** | Inter, Roboto, Arial, fonte do sistema; Geist, Plus Jakarta Sans, Space Grotesk, Fraunces; pares com Instrument Serif | Anthropic (nov. 2025); `overused-font`; Krebs | [V] |
| T5 | **Serifa itálica de grande corpo como título da capa** | Fraunces, Recoleta, Playfair, Newsreader itálica no `h1` | `italic-serif-display` ("o registro editorial pode querer isso: julgar pelo contexto") | [FU] |
| T6 | **Hierarquia achatada** | Degraus vizinhos a menos de 1,25× um do outro | `flat-type-hierarchy` | [FU] |
| T7 | **Título "no meio"** | Na capa, razão entre o título e o corpo abaixo de 4 na mesa; entre 4 e 5, só na exibição serena declarada (`05-tipografia.md`, seção 6.3) | Medição de 46 sites, setembro de 2026 | [FU] |
| T8 | **Frase inteira em corpo de exibição** | Título longo que ocupa a primeira tela; uma ou duas palavras nesse corpo, tudo bem | `oversized-h1` | [FU] |
| T9 | **Espaçamento negativo extremo** | `letter-spacing` abaixo de −0,04 em | `extreme-negative-tracking`; piso de ofício | [FU] |
| T10 | **Monoespaçada como fantasia** | Rótulos de dado em monoespaçada sem que o conteúdo seja código, dado ou medida | Anthropic ("monoespaçada para rótulos pequenos de dados"); piso de ofício | [V] |
| T11 | **Fonte do sistema como voz de exibição** de um mundo próprio | Impact, Arial Black, a sans da plataforma no título de uma marca | Piso de ofício ("a fonte instalada mais próxima é uma falha, não uma reserva") | [FU] |
| T12 | **A entrelinha de exibição que corta os acentos** (desde 16.10.2026) | Caixa-alta condensada com entrelinha abaixo de ~1,0: o til, a cedilha, o agudo e a vírgula de uma linha batem na outra ("BALCÃO" sobre "CONTA" e "ORÇAMENTO" sobre "POR", no depósito). É a marca do modelo pensado em inglês, que não tem diacríticos. Confere-se Ã, Ç, Á e a vírgula a 320, 390 e 1440 px | Avaliação A do `critique` do Impeccable, 16.10.2026 (o detector não a pega) | [FU] |

### 5.2 · Cor e superfície (C)

| # | Marca | Como reconhecer | Fonte | Ev. |
|---|---|---|---|---|
| C1 | **Agrupamento 1:** fundo creme (~#F4F1EA), serifa de alto contraste e acento terracota ou argila (~#D97757) | O trio junto, num pedido que não o pediu | Anthropic (jun. e set. 2026); `cream-palette` | [V] |
| C2 | **Agrupamento 2:** quase-preto com um único acento ácido (verde-limão, vermelhão) | Fundo escuro, um acento saturado | Anthropic | [FU] |
| C3 | **Agrupamento 3:** o "jornal" — filetes finos, raio zero, colunas densas | Página de folha de jornal sem que o assunto seja editorial | Anthropic | [FU] |
| C4 | **Degradê roxo-violeta; ciano sobre escuro** | Um degradê nessas cores basta; neon chapado no escuro conta com um segundo matiz desses | `ai-color-palette` ("as marcas mais reconhecíveis"); Anthropic (nov. 2025); Krebs ("roxo como padrão"); Adam Wathan sobre o `bg-indigo-500` (https://x.com/adamwathan/status/1953510802159219096) [FU] | [V] |
| C5 | **Texto em degradê** | `background-clip: text` em título ou número | `gradient-text`; piso de ofício | [V] |
| C6 | **Brilho e halo coloridos** | Sombra colorida de deslocamento zero; sombra colorida borrada em fundo escuro (`dark-glow`); mancha radial saturada no centro, sumindo nas bordas (`radial-halo`); "holofote" na cor do acento atrás da capa (`radial-spotlight-glow`) | Impeccable; piso de ofício ("halo colorido de deslocamento zero é decoração"); Krebs ("brilhos coloridos grandes") | [V] |
| C7 | **Quase-preto tingido** no lugar do preto | `#0B0B0B`, `#111` e vizinhos | Anthropic | [FU] |
| C8 | **Escuro permanente com texto cinza** e baixo contraste do corpo | Tema escuro sem motivo de cena; corpo em cinza médio | Krebs | [FU] |
| C9 | **Listras e grade como fundo** | Degradê repetido em listras como superfície (`repeating-stripes-gradient`); grade de linhas finas em célula fixa (`codex-grid-background`) | Impeccable; Anthropic ("lavagens de degradê como decoração") | [FU] |
| C10 | **Vidro e desfoque decorativos** | `backdrop-filter` em tudo, sem função | Piso de ofício; Krebs ("glassmorphism") | [V] |
| C11 | **Borda colorida grossa num lado** de cartão, item, aviso | `border-left` (ou `top`) colorida acima de 1 px; borda de acento em cartão arredondado (`border-accent-on-rounded`) | `side-tab` ("a marca mais reconhecível de interface gerada"); piso de ofício; Krebs | [V] |
| C12 | **Filete fino e sombra larga em toda a fileira**; a mesma sombra cinza suave sob cada cartão | Todos os cartões de uma fileira com borda de 1 px e sombra difusa; `rgba(0,0,0,.1)` em todos | `gpt-thin-border-wide-shadow`; Anthropic (kit de SaaS) | [V] |
| C13 | **Claro ou escuro pela categoria**, não pela cena de uso | "Barbearia é escura", "saúde é clara", sem a cena escrita | Piso de ofício ("escolha pela cena: quem, onde, sob que luz") | [FU] |
| C14 | **A luz complementar em alfa baixo** (desde 17.10.2026; o Fim do Atlas) | O acento quente (bronze, laranja) em opacidade baixa sobre o fundo frio (o navy) não acende: mistura-se em cinza-lama. A luz numa cena escura é o próprio fundo mais claro, no mesmo matiz | Avaliação A do `critique` do Impeccable, 16.10.2026; a medida dos esboços da direção do Atlas (o detector não a pega) | [FU] |
| C15 | **A emenda que vira névoa** (desde 17.10.2026; /duvidas do Atlas) | O degradê do escuro ao claro, entre duas cenas, que se lê como uma faixa cinza de 150 a 250 px, e não como passagem. Pior no celular, onde a faixa ocupa um quarto da tela | Avaliação A do `critique` do Impeccable, 16.10.2026 | [FU] |

**Exceções que a própria fonte admite:**
- **C9:** a grade cabe em superfície real de medida, mapa ou planta;
- **C2, C3:** são legítimos quando o briefing os pede (princípio 1).

### 5.3 · Leiaute e estrutura (L)

| # | Marca | Como reconhecer | Fonte | Ev. |
|---|---|---|---|---|
| L1 | **Capa centralizada:** título, parágrafo e dois botões, numa sans genérica | Tudo no eixo central, na primeira tela | Krebs ("capa centralizada numa sans genérica"); avaliação de 07.10 | [FU] |
| L2 | **O modelo do número grande:** número grande, legenda pequena, estatísticas de apoio, acento em degradê; faixas de estatística | Fileira de 3 ou 4 números com legenda | Anthropic ("o tratamento padrão"); piso de ofício ("modelo da métrica na capa"); Krebs ("fileiras de estatística") | [V] |
| L3 | **O kit de cartões de SaaS** | Conteúdo picado em cartões iguais, um raio para tudo, a mesma sombra; quadradinho com ícone acima de cada título (`icon-tile-stack`: "todo gerador produz exatamente esta forma") | Anthropic; Impeccable; Krebs ("cartões iguais com ícone no alto") | [V] |
| L4 | **Cartão dentro de cartão** | Contêiner com borda ou fundo dentro de outro igual | `nested-cards`; piso de ofício | [V] |
| L5 | **Numeração 01 / 02 / 03 em conteúdo que não é sequência** | Números ao lado de títulos de seção, na navegação, em itens sem ordem | Anthropic; `numbered-section-labels`; piso de ofício | [V] |
| L6 | **Espaçamento monótono** | O mesmo espaço em toda parte, sem agrupar nem separar | `monotonous-spacing` | [FU] |
| L7 | **Modal sem necessidade** | Diálogo para tarefa que não pede interrupção nem foco protegido | Piso de ofício | [FU] |
| L8 | **Componente de biblioteca sem adaptação** | O shadcn/ui com os estilos de fábrica | Krebs; o motivo do `shadcn create` | [V] |
| L9 | **Enfeite no lugar de conteúdo** | Minigráfico, anel de progresso ou retângulo arredondado vazio ocupando o lugar do que deveria estar ali | Piso de ofício | [FU] |
| L10 | **O vazio sem função** (desde 17.10.2026; o Atlas) | Uma faixa ou meia coluna vazia que não separa cenas nem agrupa nada: o mar de 180 a 290 px entre a última ação e o rodapé; os 45% da coluna vazios sob um título na margem, com o bloco encostado no canto. Não é o respiro do sistema (o mesmo intervalo entre conteúdos), que se mede igual em todo o site | Avaliação A do `critique` do Impeccable, segundo fechamento do Atlas, 17.10.2026 (o detector não a pega) | [FU] |

### 5.4 · Cromo de modelo (K): aparece qualquer que seja o assunto

| # | Marca | Como reconhecer | Fonte | Ev. |
|---|---|---|---|---|
| K1 | **Metadados ligados por ponto médio** | "A · B · C" | Anthropic | [FU] |
| K2 | **Rótulo "PALAVRA — fragmento"** | Caixa-alta, travessão espaçado, complemento | Anthropic | [FU] |
| K3 | **Seta acrescentada a todo vínculo e botão** | "→" ou "›" no fim de todo vínculo | Anthropic | [FU] |
| K4 | **Faixa que rola sem fim**; faixa de logotipos "confiam em nós" | Letreiro contínuo (`marquee`) | Impeccable ("exige uma atenção que não conquistou e esconde metade do conteúdo"); avaliação de 07.10 | [FU] |
| K5 | **Emoji ou glifo como ícone** | Emoji na navegação, no cartão, no botão | Krebs; piso de ofício ("ícones são desenhados, num traço e num peso") | [V] |
| K6 | **Ponto pulsando e cursor piscando de enfeite** | Bolinha que pulsa sem dado vivo (`pulsing-dot`); cursor piscando sem campo de texto (`blinking-cursor`) | Impeccable | [FU] |
| K7 | **Enfeite de ferramenta de desenho** (desde 03.11.2026) | Mira, marca de corte, alça de seleção, guia tracejada e régua como ornamento da página. Não é a marca quando é o próprio ofício (a gráfica, o escritório de arquitetura) e sai do mundo da marca (`19-o-padrao-atlas.md`) | taste-skill, `references/tells.md`, seção 4 (Leonxlnx, commit `12af471`, lida em 03.11.2026) | [FU] |
| K8 | **Metadados de agência** (desde 03.11.2026) | Hora local, coordenadas, clima, carimbo de versão, "©2026 — Role" espalhados pela tela. Não é a marca o dado vivo que serve a quem visita: o horário de cada dia e o "aberto agora" (`14-funcionalidades/01-base-de-todo-site.md`) | Idem; soma-se à K1 | [FU] |

**Exceção (K6):** o pulso cabe num indicador ligado a dado vivo de verdade (o "aberto agora" calculado pelo relógio, como o estado da loja do depósito).

### 5.5 · Movimento (M)

| # | Marca | Como reconhecer | Fonte | Ev. |
|---|---|---|---|---|
| M1 | **Esmaecer e subir em toda seção; hover em todo cartão; o mesmo efeito em série** | A mesma entrada em cada bloco; a mesma subida com sombra em todo cartão de uma grade igual; o mesmo efeito em toda seção, todo cartão, todo título ou toda ação (a mesma luz em todo bloco, a mesma tarja em todo título, o mesmo brilho em todo botão). Conta-se por página (`20-repeticao-dentro-do-site.md`, seção 3). Não é M1 o vocabulário de interação da marca, com uma resposta por papel (`09-movimento.md`, seção 13), nem o mesmo efeito em sites diferentes | Anthropic ("o padrão genérico, lê como gerado por IA"); piso de ofício ("entradas idênticas"); o usuário, 14.10.2026: "parecendo que você está spamando os mesmos componentes" | [V] |
| M2 | **Efeitos espalhados** em vez de um momento orquestrado | Vários gestos diferentes na mesma página, de origens diferentes; o sorteio, em que a mesma ação ou o mesmo papel responde de um jeito em cada instância (no início do Atlas, achado pela segunda crítica de fora, de 16.10.2026, as três "Montar orçamento" com três respostas: `20-repeticao-dentro-do-site.md`, seção 5). Os momentos de cada cena, saídos da mesma matéria e da mesma luz, não são M2 (`09-movimento.md`, seção 12) | Anthropic; piso de ofício ("um momento autoral"); a segunda crítica de fora do Atlas, 16.10.2026 | [V] |
| M3 | **Quique e elástico** | Curvas com `bounce`, `elastic`, mola com oscilação | `bounce-easing` | [FU] |
| M4 | **Movimento que não responde a nada** | Animação que não segue uma ação nem chama a atenção para algo. A passiva ligada ao sentido do objeto, com pausa e parada fora da tela, não é a M4 (`09-movimento.md`, seção 14); a peça de brilho solta, sim | Anthropic (jun. 2026: "animação extra contribui para a sensação de que o design foi gerado") | [FU] |
| M5 | **Texto partido em letras animadas** | Título que se compõe letra a letra | `09-movimento.md`, seção 9; régua (o `h1` lido contra o desenhado) | [FU] |
| M6 | **Conteúdo invisível em repouso** | Texto que fica em opacidade 0 se a entrada falha (`content-hidden-at-rest`) | Impeccable; piso de ofício (a entrada parte de um estado **já visível**, com desaceleração exponencial) | [FU] |
| M7 | **Brilho que passa em todo botão; carrossel que avança sozinho** | O mesmo brilho em todas as ações, de todos os tamanhos; carrossel automático. A faixa de luz só na ação principal, saída da matéria da marca, não é M7 (`09-movimento.md`, seção 13.3) | Avaliação de 07.10; NN/g, https://www.nngroup.com/articles/auto-forwarding/ | [V] |
| M8 | **Rolagem com inércia; sequestro da rolagem** | Lenis, rolagem amortecida, seção que prende a rolagem | Vedada pela ata v3.0, V ("descartada em definitivo"); NN/g sobre *scrolljacking* | [V] |

### 5.6 · Texto (X)

| # | Marca | Como reconhecer | Fonte | Ev. |
|---|---|---|---|---|
| X1 | **Aforismo em dois tempos** em três seções ou mais | "Não é um recurso. É uma plataforma."; "X. Sem Y." Uma vez, tudo bem: o padrão é que denuncia | `aphoristic-cadence` | [FU] |
| X2 | **Palavras-moldura** | Eleve, transforme, potencialize, de ponta, nível empresarial, próxima geração, solução completa | `marketing-buzzword`; Anthropic | [V] |
| X3 | **Travessão em excesso** | 8 ou mais travessões, perto de um a cada 500 caracteres do corpo | `em-dash-overuse` (só aviso: gente usa travessão) | [FU] |
| X4 | **"Teatro"** | "não é teatro", "sem teatro" | `theater-slop-phrase` | [FU] |
| X5 | **Botão que não diz o que faz** | "Saiba mais", "Enviar", "Clique aqui" | Anthropic ("uma ação diz exatamente o que acontece") | [FU] |
| X6 | **Falha que pede desculpa, vazio que lamenta** | "Ops! Algo deu errado :(", "Nada aqui." | Anthropic ("erros não pedem desculpa e nunca são vagos") | [FU] |
| X7 | **A mesma frase três vezes no mesmo cartão** | Rótulo repetido em cada espaço do modelo | `repeated-container-text` | [FU] |
| X8 | **Promessa sem prova** | Superlativo, número sem fonte, depoimento inventado | `10-texto-e-conteudo.md`; ata v3.0, IV.1 | [V] |
| X9 | **A prova em jargão de ofício** (desde 18.10.2026; o Atlas) | Uma medida técnica mostrada a quem compra: KB, ms, "folhas de estilo", "sem script", "equirretangular". Quem lê entende a intenção e não lê a figura. Confere-se pelo teste do desconhecido (passo 5): a peça chamada de "coisa de programador" é a marca | Avaliação A do `critique` do Impeccable, 18.10.2026 (Nielsen 2, nota 2/4; a persona Jordan); o teste do desconhecido de 18.10.2026 (3 de 3: "coisa de programador", "relatório de engenheiro"). As duas fontes são do mesmo fechamento, e o teste pode ter sido feito por agentes | [FU] |

### 5.7 · Imagem (I)

| # | Marca | Como reconhecer | Fonte | Ev. |
|---|---|---|---|---|
| I1 | **Banco de imagens, ilustração genérica, 3D de "bolhas"** | Foto que serviria a qualquer negócio | NN/g (fotos genéricas são ignoradas); avaliação de 07.10 | [V] |
| I2 | **Imagem gerada por IA** | — | **Vedada** desde 12.09.2026 (`08-imagem-e-fotografia.md`) | — |
| I3 | **Ilustração montada com formas primitivas** | SVG grande feito de círculos e retângulos. Não é I3 o diagrama do ofício que sai de dado ou de referência escrita, como o mapa do bairro, do OpenStreetMap, e o odontograma, pela numeração FDI (`08-imagem-e-fotografia.md`, seção 2.3) | `shape-assembled-illustration` | [FU] |
| I4 | **Recorte geométrico ou "orgânico" feito por código** | `clip-path` com muitos vértices ou curvas imitando rasgo, mancha, silhueta (`organic-clip-path`); máscara geométrica no lugar do contorno de uma foto | Impeccable; piso de ofício | [FU] |
| I5 | **Imagem enterrada** | Foto sob véu quase opaco, ou em opacidade quase zero (`buried-raster`) | Impeccable | [FU] |
| I6 | **Ausência total de imagem** num ramo em que gente e lugar são a prova | Barbearia, restaurante, academia, saúde sem nenhuma foto real | Avaliação de 07.10; `08-imagem-e-fotografia.md` | [FU] |
| I7 | **Imagem quebrada** | `<img>` sem `src` ou com marcador | `broken-image` | [FU] |
| I8 | **A figura cortada pela caixa** (desde 17.10.2026; a carta de /para-quem do Atlas) | O desenho de dado (a carta, o mapa, a planta) chega à borda do contêiner e termina numa reta, que se lê como retângulo; e a terra mais escura que a água, que inverte a convenção da carta. A borda se dissolve ou a caixa folga o desenho | Avaliação A do `critique` do Impeccable, 16.10.2026; de novo na de 18.10.2026, na esfera de /o-atlas a 390 px, cortada por duas retas, onde o corte foi escolha do código (o raio pela altura da grade) | [FU] |

### 5.8 · Detalhes: o piso de ofício (D)

Aqui a marca é a **ausência**. "Os padrões do navegador fazem a página parecer montada" (piso de ofício do Impeccable) [FU].

| # | O que falta | Como conferir | Onde se faz |
|---|---|---|---|
| D1 | **Seleção de texto, cursor de texto, barras de rolagem, anel de foco, deslocamento do sublinhado e algarismos tabulares** na paleta | `::selection`, `caret-color`, `scrollbar-color`, `:focus-visible`, `text-underline-offset`, `tabular-nums` declarados | `06-cor-forma-e-superficie.md`, seção 11 |
| D2 | **Os estados:** hover, foco por teclado, ativo, desabilitado, carregando, erro, vazio | Cada controle nos estados, nas capturas | `16-acessibilidade.md`; `10-texto-e-conteudo.md`, seção 8 |
| D3 | **Página 404 e de erro próprias**, ícones, imagem de compartilhamento | As rotas e os metadados existem | `14-funcionalidades/01-base-de-todo-site.md` |
| D4 | **Ícones desenhados**, de uma biblioteca real ou SVG autoral, num traço e num peso | Nenhum emoji, nenhum glifo Unicode como ícone | — |

### 5.9 · Qualidade (Q): defeitos que a página gerada costuma ter

Não são "estilo de IA": são defeitos, e as páginas geradas os têm com frequência. A régua mede vários (`../qualidade/02-regua.md`); os outros entram na revisão.

| # | Defeito | Limite | Onde se mede |
|---|---|---|---|
| Q1 | Contraste baixo (`low-contrast`) | 4,5:1; 3:1 no texto grande | Régua, bloco 4 |
| Q2 | Linha longa (`line-length`) | Acima de ~80 caracteres; o alvo é 65 a 75 | Revisão (`05-tipografia.md`, seção 8) |
| Q3 | Recuo apertado (`cramped-padding`) | Menos de 8 px entre o texto e a borda do contêiner; o ideal é de 12 a 16 | Revisão |
| Q4 | Texto colado na borda da tela (`body-text-viewport-edge`) | Menos de 16 px; 12 px em telas de até 480 px | Revisão (`07-composicao.md`) |
| Q5 | Entrelinha apertada (`tight-leading`) | Abaixo de 1,3 em texto de várias linhas | Revisão |
| Q6 | Salto de nível nos títulos (`skipped-heading`) | h1 → h3 | Régua, bloco 3 (aviso) |
| Q7 | Título mais perto do bloco de cima que do próprio conteúdo (`heading-rhythm`) | Espaço acima ≤ espaço abaixo | Revisão |
| Q8 | Texto justificado (`justified-text`) | Coluna estreita sem hifenização | Revisão |
| Q9 | Texto miúdo (`tiny-text`, `undersized-ui-text`) | Corpo abaixo de 12 px (14 recomendado, 16 ideal); texto de interface abaixo de 11 px (10 só em letra miúda legal, não interativa) | Revisão |
| Q10 | Caixa-alta em passagem longa (`all-caps-body`) | 80 caracteres ou mais | Revisão |
| Q11 | Espaçamento aberto no corpo (`wide-tracking`) | Acima de 0,05 em | Revisão |
| Q12 | Transbordo (`text-overflow`, `clipped-overflow-container`, `edge-flush-cards`, `first-viewport-column-overflow`, `text-occlusion`) | Texto cortado, coberto ou além da tela; balão recortado pelo contêiner; cartão colado num lado da galeria | Régua, bloco 1 (o que sai da tela); revisão (o resto) |
| Q13 | Cinza sobre cor (`gray-on-color`) | Texto cinza sobre fundo colorido | Revisão (`06-cor-forma-e-superficie.md`, seção 4) |
| Q14 | Erro de script (`script-error`) | Exceção não tratada na carga | Régua, bloco 5 |
| Q15 | **A pausa que não pausa** (desde 16.10.2026; achada pelo `audit` do Impeccable no pet shop e no depósito) | Depois do botão de pausa (`aria-pressed="true"`), nenhuma animação infinita pode seguir rodando. A causa foi a mesma nos dois sites: o atalho `animation` numa regra de especificidade maior repõe o `animation-play-state: running` e vence a regra da pausa. A WCAG 2.2.2 (nível A) falha em silêncio, porque o atributo diz "pausado" | `../ferramentas/conferir-pausa.mjs`, que lê o `document.getAnimations()` e, desde 17.10.2026, a diferença de pixels (o canvas e o relógio); nunca pelo atributo |
| Q16 | **O texto a 200% que some** (desde 16.10.2026; Atlas, pet shop e restaurante) | Com a letra padrão do navegador a 200%, nada cortado, coberto nem fora da tela. O `overflow-x: clip` do `body` esconde o excesso, e a régua não o vê | Revisão (`16-acessibilidade.md`; WCAG 1.4.4) |
| Q17 | **A ferramenta sem a regra do domínio** (desde 16.10.2026; barbearia, depósito e restaurante) | A ferramenta aceita o impossível e o manda ao WhatsApp: o profissional no dia em que não atende, a data futura no "último corte", 3 pessoas num pedido de no mínimo 10, a medida "abc" sem frase. O erro e o bloqueio precisam de palavras junto do campo (`aria-describedby`), não só de cor | Revisão; `../qualidade/12-ataque-a-falhas.md` (as entradas malformadas) |
| Q18 | **O valor longe da unidade** (desde 17.10.2026; a derrota do Atlas no celular) | O número numa peça e a unidade noutra: o desenho diz "7 a 15" e a lista, "dias úteis, em geral", sem o número; as estações do desenho sem o número que a lista dá. Quem lê liga uma à outra de memória. O valor e a unidade andam juntos em cada lugar em que o dado é lido. Vale também para o nome do trecho longe do trecho: a composição da conta de /orcamento, com os blocos sem nome em lugar nenhum, foi lida como "não sei" por 3 de 3 (18.10.2026) | Revisão, no celular, onde as peças se separam (avaliação A do `critique` do Impeccable, 17.10.2026); o teste do desconhecido, com a peça recortada sem a legenda (18.10.2026) |
| Q19 | **O atalho flutuante sobre a mesma ação da cena** (desde 17.10.2026; o Atlas) | O botão fixo do WhatsApp (ou de qualquer contato) por cima do vínculo da própria cena para o mesmo destino: duas ações iguais na mesma tela, uma cobrindo a outra. O atalho some onde a cena já tem a ação à vista (`data-sem-atalho`) | Revisão, rolando a 390 e a 320 px (avaliação A do `critique` do Impeccable, 17.10.2026) |
| Q20 | **O estado que some em cores forçadas** (desde 18.10.2026; o Atlas) | Um controle de alternância (rádio, switch, tecla pressionada) marca o estado só no fundo, num degradê, num `box-shadow` ou na cor do texto. Em cores forçadas (`forced-colors: active`), a opção ligada e a desligada ficam iguais (WCAG 1.4.1 e 1.4.11). As regras do modo estão em `16-acessibilidade.md`, seção 3.13 | Revisão: o recorte com e sem cores forçadas, e a diferença de pixels entre a opção marcada e a outra. Fontes: o `audit` do Impeccable de 16.10.2026 (o rádio de `box-shadow` da odontologia, até então só na calibração do `../qualidade/15-revisao-do-impeccable.md`, seção 7) e o de 18.10.2026 (as teclas de camada de /para-quem, o seletor da vitrine e os de /planos, no Atlas); a avaliação A do `critique`, 18.10.2026 (as teclas Esfera e Grade de /o-atlas) |
| Q21 | **O controle de figura sem o contrato** (desde 18.10.2026; o Atlas) | Um deslizante (`role="slider"`) sem Home e End, em que a tecla rola a página; ou uma leitura que o gesto (o toque, o arraste) muda na tela sem mudar o `aria-valuetext`, e o leitor de tela e a tela passam a dizer coisas diferentes | Revisão: Home e End com o foco no controle (a rolagem fica, o valor muda); o `aria-valuetext` depois do toque e do arraste, igual à leitura visível. Fonte: o `audit` do Impeccable, 18.10.2026 (o globo do início e a projeção de /o-atlas) |

### 5.10 · A página chapada (P): a marca da ausência de acabamento

> **DECIDIDO em 08.10.2026, à noite,** pedido do usuário, depois de ver o site de exemplo de odontologia: "não está nem um pouco perto de um site premium, como o Atlas ou o da barbearia... senti falta de efeitos e derivados".

Aqui também a marca é a **ausência**, e é a outra cara do modelo pronto: o site correto, acessível e leve, sem nada da marca. O agente que só foge das marcas das seções 5.1 a 5.8 chega nela, porque cada efeito que não faz não pode errar. **Pesa alto na capa e nas aberturas de página, como as outras.**

| # | Marca | Como reconhecer | A camada que falta (`00-principios.md`, seção 9) |
|---|---|---|---|
| P1 | **A capa sem momento** | O título da capa com razão abaixo de 4 contra o corpo, na mesa, sem imagem forte ao lado (a régua avisa) | 1 · o momento de exibição |
| P2 | **O fundo chapado** | O fundo liso, com borda fina, em todas as seções e páginas; nenhuma textura, grão, relevo ou reflexo da matéria da marca | 2 · a matéria |
| P3 | **A página sem luz** | Nenhuma luz da marca, nenhuma sombra longa, nenhum plano sobre outro: tudo no mesmo plano | 3 · a luz e a profundidade |
| P4 | **A página-documento** | Texto, listas e vínculos sublinhados, como um formulário; a única imagem é um diagrama de traço | 4 · a imagem forte |
| P5 | **Nada responde à mão** | Sob o ponteiro e no toque, só a troca de cor; nenhum efeito da identidade | 5 · os efeitos da identidade |
| P6 | **A camada do plano pela metade** | O Completo sem cena, sem assinatura animada nem 3D; o Profissional sem a matéria que responde; o Essencial sem a luz da marca | 6 · o movimento da camada |
| P7 | **Mais pobre que a vitrine** | Lado a lado com o Atlas e com o exemplo do mesmo plano, o site parece de outra faixa de preço | O teste da vitrine |

**Objetivo.** O catálogo das seções 5.1 a 5.8 só diz o que não fazer, e foi o que o kit pediu até 08.10.2026. O site de exemplo de odontologia daquela noite passou nas portas, com poucas marcas de IA, e ficou abaixo do Atlas e da barbearia em todas as sete camadas. A régua e a varredura mediam o erro, e ninguém media a riqueza.

**Como conferir.** A varredura do passo 2 cobre esta categoria, e o veredito do passo 6 traz o teste da vitrine: as capturas da capa e de uma página interna, lado a lado com o Atlas e com o exemplo do mesmo plano (`../referencias/sites-de-exemplo/`), a 1440 px e depois a 390 px.

---

## 6. O que não conta como marca

- **As convenções de uso** que o visitante espera: menu no alto, ação no canto, rodapé com contato, WhatsApp à vista. Quebrar convenção de navegação piora a primeira impressão (seção 1.3).
- **O que o briefing escolheu e justificou por escrito,** inclusive um dos visuais da lista.
- **O que a norma exige:**
  - o selo de ficção e o `noindex` dos sites de exemplo;
  - o registro do conselho no cabeçalho e no rodapé;
  - o CRECI junto do nome, com no mínimo 25% do tamanho dele;
  - o aviso de privacidade.
- **O que a acessibilidade exige:**
  - o anel de foco;
  - o vínculo "pular para o conteúdo";
  - o botão de pausa do que se move sozinho.
- **Numeração em sequência real:** as etapas do trabalho ("01 · Visita, 02 · Rascunho…"), os passos de um agendamento, os horários.
- **Caixa-alta em botão e navegação,** para a regra de passagem longa (Q10). A caixa-alta como sistema de rótulos continua sendo T3.
- **O recurso do padrão Atlas, com motivo** (DECIDIDO em 09.10.2026, pedido do usuário: "nossos clientes querem sites tão trabalhados como o Atlas, independente do plano"). O site do Atlas e o exemplo da barbearia são a referência de acabamento do dono, e a linha de base da seção 7 registrou neles marcas que os sócios nunca corrigiram: a luz e o halo (C6), o vidro (C10), a faixa que rola (K4), os números em escala (L2), o fundo escuro (C7, C8), a serifa itálica de cartaz (T5). **O mesmo recurso é marca na versão genérica e é acabamento na versão da marca.** Ele deixa de contar como marca quando passa nas cinco perguntas, escritas no `identidade.md` ("O acabamento"):
  1. **Sai da matéria da marca?** O halo é o do refletor da clínica, o brilho é o do latão, a faixa é a do poste da barbearia; e não a cor do acento espalhada por gosto.
  2. **Tem função na cena?** Ele guia a leitura, responde à mão, prova um fato ou separa as cenas.
  3. **Está executado no nível do Atlas?** A luz tem direção e queda; o tempo e a curva saem dos tokens (`09-movimento.md`, seções 2 e 3); há estados, pausa e movimento reduzido.
  4. **É um sistema, e não um carimbo?** Ele aparece com hierarquia, e não igual em todo elemento (M1, M2, M7). A contagem por página responde (`20-repeticao-dentro-do-site.md`, seção 3).
  5. **É deste site?** Ele não foi copiado de outro site do Atlas: o rodapé com o nome em escala de cartaz, que a barbearia e o depósito já tinham, repetido no restaurante e na odontologia de 09.10.2026, virou cromo de modelo. A cópia é a da forma: o mesmo efeito, traduzido para a matéria deste site, é permitido entre sites (pedido do usuário de 14.10.2026; `20-repeticao-dentro-do-site.md`, seção 1).

  Se falha numa delas, conta como marca, com o peso do passo 6 (seção 4). A pergunta 5 vale também para o próprio padrão Atlas: a referência ensina o nível, nunca a forma (`19-o-padrao-atlas.md`).

---

## 7. A linha de base de 07.10.2026 e as decisões pendentes

**Primeira aplicação do método:** 07.10.2026, nos 24 endereços (as 23 páginas e a 404), a 390 e a 1440 px. As capturas ficaram na pasta temporária da sessão, não versionadas.

**Acréscimos de 08.10.2026:** conferidos no código, sem capturas novas, marcados "(08.10)".

**Nada foi corrigido.** Os caminhos são do repositório do Atlas.

### 7.1 · O site do Atlas (sete páginas)

| # | Achado | Onde | Item | Classe | Peso |
|---|---|---|---|---|---|
| 1 | Palavra do título destacada pela tarja de bronze, em todas as aberturas | `components/paginas/abertura-de-pagina.tsx` (Spell UI, `ui/spell/highlighted-text.tsx`) | T1 | marca de IA | alto |
| 2 | Onda de cor só no "24h" do título da capa | `components/secoes/capa.tsx` (`ui/spell/gradient-wave-text.tsx`) | T1 | marca de IA: o slogan justifica destacar o fato, não o gesto na palavra | alto |
| 3 | "01 / 06 — Para quem" acima de cada título; páginas numeradas sem serem sequência | `abertura-de-pagina.tsx` (o `padStart(2, "0")`) | T2, L5 | marca de IA | médio |
| 4 | Capa centralizada: título, parágrafo, dois botões | `capa.tsx` | L1 | marca de IA (a esfera é assinatura) | médio |
| 5 | Faixa de números grandes com legenda (10 · 0 · 1 · 2) e a da Condição de Fundação (50% · 12 meses · 3) | `secoes/destaques.tsx`, `secoes/fundacao.tsx` | L2 | marca de IA | médio |
| 6 | As portas: grade de cartões iguais, cada um com número grande e unidade ("3 públicos", "2 toques", "4 etapas") | `paginas/portas.tsx`; `conteudo/site.ts` (`porta`) | L2, L3 | marca de IA | médio |
| 7 | Faixa de nichos rolando sem fim, feita com cuidado: para sob o ponteiro, pausa fora da tela e pelo botão, fica parada com movimento reduzido | `secoes/faixa.tsx` | K4 | marca de IA (o formato) | baixo |
| 8 | Ponto médio entre metadados; "›" no fim dos vínculos | Todo o site | K1, K3 | cromo de modelo | baixo |
| 9 | Entrada com subida e esmaecimento em vários blocos | Aberturas, seções | M1 | marca de IA | médio |
| 10 | Aforismos em dois tempos em três seções: "O preço está publicado. Sem proposta, sem reunião."; "A distância não está na lista. Está na tela."; "Quatro etapas. Nenhuma delas opcional." | `conteudo/site.ts` | X1 | texto | médio |
| 11 | Família padrão (San Francisco e Inter) sem tratamento que carregue a personalidade; título de 40 a 80 px sobre corpo de 17 px (razão de 2,35 a 4,7) | `app/globals.css` | T4, T7 | A família é decisão do usuário; **o tratamento** é que falta | médio |
| 12 (08.10) | Orbe de bronze sob o cursor e halo da esfera; brilho bronze nas ações | `app/vidro.css` (`.vd-orbe` e os brilhos), `components/ilhas/luz-do-cursor.tsx` | C6 | Identidade devolvida em 03.10 ("coloque de volta"); os detectores acusam | médio |
| 13 (08.10) | Detalhes do navegador. **Presentes:** seleção, foco, sublinhado com deslocamento, algarismos tabulares, 404, erro, `theme-color`. **Ausentes:** `caret-color`, `scrollbar-color` e `scrollbar-gutter`, `color-scheme`, `font-synthesis-weight` | `app/globals.css`, `app/layout.tsx` | D1 | piso de ofício | baixo |
| 14 (08.10) | **A auditar, sem veredito:** as superfícies creme, o grão da chamada final e os botões em pílula. A leitura do `CLAUDE.md` do Atlas contra as listas (pesquisa de 07.10.2026) os apontou como candidatos, ao lado de itens que já constam acima (a família Inter, o orbe e o halo, a faixa de nichos, os cartões iguais com um raio e sombra suave, a numeração 01/02, o ponto médio, a seta, o esmaecer por seção). O globo e a esfera, ao contrário, são os ativos próprios que a pesquisa favorece (seções 1.3 e 7.1) | `app/globals.css` (os tons), `app/vidro.css` (`.vd-grao`), `components/ui/button.tsx` | C1 (a conferir); seção 1.4 (o grão); T2 só trata da pílula acima do título | a auditar | — |

**O que o passe de 14 a 16.10.2026 mudou** (`20-repeticao-dentro-do-site.md`, seção 4.2):
- **o achado 1:** a tarja saiu das aberturas, a de /o-atlas por último, sem a decisão dos sócios (seção 7.3, item 1); é reversível;
- **o 3:** saiu a numeração do menu do celular, das portas e do "A seguir"; fica o "0N / 06" da abertura;
- **o 5:** os destaques e a fundação do início viraram frase, e o "50% · 12 meses · 3" em número grande ficou só em /planos;
- **o 6:** as portas ficaram como seis cartões com o dado em número grande, sem a numeração;
- **o 9:** a entrada igual das aberturas caiu de 30 elementos para 0;
- **o 12:** o orbe caiu de 17 para 4, e a faixa de luz ficou só nas ações de decisão.

O achado 2, a onda no "24h", continua, com a decisão dos sócios.

**Assinaturas** (ficam):
- a esfera de bronze da capa;
- o globo do logotipo, que gira;
- o vidro líquido (C10, mas material da marca, decidido em 01.10).

### 7.2 · Os sites de exemplo

| Site | Assinatura | Marcas de IA |
|---|---|---|
| **Nutrição** [E] | A folha impressa: capitular, numeração romana, nota de rodapé da norma | **C1:** fundo palha (`#f4efe4`), serifa de alto contraste (Fraunces) e acento terracota. **C3:** filetes de jornal. **T1:** marca-texto numa palavra. **T5:** Fraunces itálica no título ("outra pessoa.") |
| **Depósito** [P] | A ficha técnica: talão, código de barras, estado da loja ao vivo | **T10:** rótulos monoespaçados em caixa-alta ("01 NOME" no talão). **C9:** faixa zebrada; papel milimetrado, legítimo só onde há medida (a calculadora). **L5:** "01 MATERIAIS" na navegação. **L3:** grade de cinco cartões iguais |
| **Barbearia** [C] | As fichas de latão em WebGL, o gesto mais forte do projeto | **C7:** fundo quase-preto tingido (`#0b0908`), com um acento só, o latão. **T1, T5:** itálico em "esquina.". **T4:** Instrument Serif, na lista de pares comuns de Krebs [FU]. **L5:** "01 SERVIÇOS" na navegação. **T2:** rótulo espaçado acima do título. **I6:** nenhuma fotografia, embora as cinco barbearias de referência mostrem a equipe. **(08.10) X1:** o mote "esquina" em quatro títulos, a conferir: assinatura verbal ou cadência? |

**Entre 14 e 16.10.2026** (`20-repeticao-dentro-do-site.md`, seção 4.2): o marca-texto da nutrição saiu dos títulos para o corpo; a grade de cinco cartões do depósito virou a planta do balcão, e o índice de 01 a 05 ficou só nas abas; a numeração de 01 a 06 da barbearia está com os sócios.

**Fora do catálogo, mas na mesma avaliação.** A barbearia não tem ação na primeira tela do celular: o "Agendar horário" da barra é `hidden sm:inline-flex`, e some abaixo de 640 px (`components/ilhas/demos/barra-da-barbearia.tsx`). A régua acusa como aviso (bloco 6).

### 7.3 · O que os sócios precisam decidir

Recomendações desta esteira: **PROPOSTA**. A decisão é dos sócios, registrada no `documentacao/atlas--decisoes.md`, no repositório do Atlas.

| # | Decisão | Recomendação | Por quê |
|---|---|---|---|
| 1 | A tarja nas aberturas e a onda no "24h" | Tirar do título; se o gesto ficar, numa palavra-chave do lide ou na ação | Peso alto: é o ponto de decisão de todas as páginas (T1) |
| 2 | A numeração "01 / 06" | Tirar; o rótulo vira migalha de navegação ou some | As páginas não são sequência (L5, T2) |
| 3 | Os aforismos | Reescrever como afirmações simples, com o fato | Três seções é o limiar da regra (X1) |
| 4 | Os números grandes (destaques, Condição de Fundação, portas) | Manter os fatos; mudar a forma: frase, tabela, ou um número só por tela | L2 |
| 5 | A postura tipográfica | Ou o título sobe para exibição (≥ 85 px na mesa), ou o meio é registrado como escolha | T7; `05-tipografia.md`, seção 6.3 |
| 6 | Os efeitos de identidade acusados (orbe, halo, brilho) | Superada em 09.10.2026: os efeitos ficam, como sistema do bronze, e são a referência do padrão Atlas (seção 6; `19-o-padrao-atlas.md`) | O usuário os devolveu em 03.10.2026 ("coloque de volta") |
| 7 | Os sites de exemplo | Corrigir T1, L5 e T2 nos três; fotografia na barbearia, quando houver sessão; a ação no celular da barbearia | O exemplo mostra o que o cliente recebe |
| 8 | Os detalhes do navegador (D1) | Acrescentar, sem mudar a tela | Custo de minutos |

---

## 8. A disciplina para não gerar

Como o método vira hábito de produção, não só conferência no fim:

1. **Começar pelo assunto** (`04-direcao-de-arte.md`): as cinco referências do mundo físico vêm antes de qualquer referência de site.
2. **Plano antes do código:** a paleta, os tipos, o leiaute em ASCII e os princípios no `identidade.md`. A skill da Anthropic trabalha em dois passes pela mesma razão.
3. **O teste do pedido parecido** (passo 3) **antes** de construir, numa sessão limpa.
4. **Um gesto do Spell UI só:** o gesto de catálogo adaptado (`09-movimento.md`, seção 6), um por site, no ponto de decisão; os efeitos da identidade, que saem da matéria da marca, não contam nele. "Se caberia em qualquer site, é *slop*" (regra do Spell UI, `CLAUDE.md` do Atlas).
5. **Conteúdo real desde o rascunho:** texto do briefing e fotos reais. Texto e imagem de preenchimento escondem o genérico até a última hora (`08` e `10`).
6. **Componente é base, nunca acabamento:** o shadcn entra com os tokens e a folha de estilo do cliente (`04-direcao-de-arte.md`, seção 4.2).
7. **Construir até o piso de ofício sem anunciar:** celular, foco visível, movimento reduzido, contraste, os detalhes do navegador (D1).
8. **Criticar com capturas enquanto constrói,** não só no fim: "uma imagem vale mil tokens" (skill da Anthropic).
9. **Antes de entregar, tirar um acessório** (Chanel).
10. **Desconfiar da própria justificativa:** conferir na tela que o motivo escrito está mesmo lá (*Design Theater*).
11. **Anotar o que se tentou** (passo 8), para o próximo cliente não receber a mesma ideia.

---

## 9. Como manter esta lista

**Regra.** Revisão a cada trimestre, e sempre que uma fonte da lista publicar versão nova.

**Objetivo.** As listas envelhecem (seção 1.4): o que distingue hoje vira padrão quando todos os geradores aprendem.

**Como fazer.**
1. **Reler as fontes:**
   - o histórico da skill `frontend-design`;
   - as regras do Impeccable (`crates/live/assets/antipatterns.json` e `reference/craft-floor.md`);
   - o estudo de Krebs (e o que vier depois dele);
   - os artigos da NN/g sobre interfaces e imagens geradas;
   - o changelog do shadcn;
   - os sites do dia do Awwwards nos nichos do Atlas (`12-inspiracao-e-referencias.md`).
2. **Acrescentar** cada marca nova com a fonte, a data e o critério de reconhecimento.
3. **Retirar** a marca que deixou de ser padrão, com a data e o motivo.
4. **Rodar de novo a linha de base** do site do Atlas e dos três sites de exemplo; comparar com a seção 7.
5. **Registrar a revisão** no registro de decisões do Atlas.

**Como conferir.** A data de "Atualizado em" deste documento tem menos de três meses.

---

## 10. Lista de conferência

**Avaliação do plano** (antes do código):
1. O briefing visual tem as cinco linhas, com o elemento memorável.
2. A varredura do plano cobre as dez categorias da seção 5, a página chapada (5.10) inclusive.
3. O teste do pedido parecido foi feito numa sessão limpa, com a tabela de coincidências; cada uma está revista ou justificada.
4. Nenhuma escolha por omissão sem motivo escrito.

**Avaliação do resultado** (antes do rascunho e antes de publicar):
1. Capturas de todas as páginas a 390 e a 1440 px, com os estados.
2. Varredura das dez categorias, com o lugar de cada achado, e a contagem de cada efeito e de cada molde por página (`20-repeticao-dentro-do-site.md`, seção 3).
3. **O teste da vitrine:** a capa e uma página interna lado a lado com o Atlas e com o exemplo do mesmo plano, a 1440 e a 390 px (P7).
4. Teste de unicidade: [E] contra os clientes do mesmo nicho; [P][C] também contra três concorrentes locais.
5. Teste do desconhecido em cada peça desenhada.
6. Tabela de veredito com classe e peso; **nenhuma marca de IA de peso alto**, a página chapada inclusive; as de peso médio corrigidas ou justificadas no `decisoes.md`.
7. Os detalhes do navegador (D1) e os estados (D2) presentes.
8. Reavaliação depois das correções.
9. O que se tentou e o que se recusou, anotado.

---

## Fontes citadas

**Estudos:**
- Goree et al., CHI 2021, homogeneização do design web: https://doi.org/10.1145/3411764.3445156
- Lindgaard et al., 2006, 50 ms: https://doi.org/10.1080/01449290500330448
- Tuch et al., 2012, complexidade e prototipicidade: https://doi.org/10.1016/j.ijhcs.2012.06.003
- Reinecke et al., CHI 2013, complexidade e colorido: https://doi.org/10.1145/2470654.2481281
- Doshi e Hauser, 2024: https://doi.org/10.1126/sciadv.adn5290
- Anderson, Shah e Kreminski, C&C 2024: https://doi.org/10.1145/3635636.3656204
- Wenger e Kenett, 2025: https://arxiv.org/abs/2501.19361
- *Design Theater*, AIES: https://arxiv.org/abs/2607.22928
- Shin et al., 2026, homogeneização no *vibe coding*: https://arxiv.org/abs/2603.13036
- Thorshaug, Schjelderup e Papachristos, CHI 2026 EA: https://doi.org/10.1145/3772363.3798849
- NN/g, imagens geradas por IA (21.08.2026): https://www.nngroup.com/articles/ai-generated-images/
- Raptive, 2025: https://raptive.com/blog/the-ai-stink-is-real-and-its-costing-brands/
- NIQ, 2024: https://nielseniq.com/global/en/news-center/2024/niq-research-uncovers-hidden-consumer-attitudes-toward-ai-generated-ads/
- NIM, 2025: https://www.nim.org/en/publications/detail/transparency-alone-does-not-create-trust
- Cicek et al., 2024 (cobertura): https://www.heise.de/en/news/Study-AI-in-the-product-description-arouses-mistrust-among-customers-9824720.html
- Krebs, 2026: https://www.adriankrebs.ch/blog/design-slop/
- Romaniuk, *Building Distinctive Brand Assets* (Oxford University Press, 2018)

**Listas e ferramentas:**
- Anthropic, convergência distributiva (12.11.2025): https://claude.com/blog/improving-frontend-design-through-skills
- Anthropic, histórico da skill `frontend-design`: https://github.com/anthropics/claude-code/commits/main/plugins/frontend-design/skills/frontend-design/SKILL.md
- Impeccable, detector e piso de ofício: https://github.com/pbakaus/impeccable
- shadcn create: https://ui.shadcn.com/docs/changelog/2025-12-shadcn-create
- NN/g, carrossel automático: https://www.nngroup.com/articles/auto-forwarding/ · *scrolljacking*: https://www.nngroup.com/articles/scrolljacking-101/

# 99 · Rastreabilidade

> **Para que serve.**
> - Mostrar de onde vem o que esta esteira e a pasta de qualidade sabem, e onde cada estudo, medição, lição e decisão de 30.08 a 08.10.2026 entrou.
> - Dizer como ficaram as contradições entre as fontes.
> - Listar o que ficou fora do kit de propósito e o que segue pendente no repositório do Atlas.
> - Registrar como a entrega foi verificada.
>
> **Quando ler.** Antes de mudar uma regra (de onde ela veio e o que ela já corrigiu); ao revisar a esteira (o que já se aprendeu não se perde); ao auditar a entrega.
>
> **A matriz item a item** (os 673 itens do inventário, cada um com o estado e o lugar) fica no repositório do Atlas: `documentacao/atlas--rastreabilidade-esteira--2026-10-08.md`. Num repositório de cliente, este documento serve de mapa; a matriz não é necessária.
>
> **Estado.** Registro de 08.10.2026, fechado com a verificação da seção 6. Acréscimo de 16.10.2026, a busca e as IAs em todo site: seção 8.

---

## 1. As fontes

| Fonte | Período | O que trouxe | Onde se lê (no repositório do Atlas) |
|---|---|---|---|
| As onze análises de nicho e o índice da pesquisa | Agosto e setembro de 2026 | 46 sites de referência medidos; as convenções e os defeitos de cada ramo | `nichos/analises/` |
| A ESTEIRA v2.1 | 12 e 30.09.2026 | As lições dos doze demos estáticos (porta genérica, tokens que parecem um só, revisão de sentido, teste do desconhecido) | `documentacao/atlas--esteira-norma-producao.md` (registro) |
| A ata v3.0 e os contextos de 30.09 | 30.09 a 08.10.2026 | Sociedade, preço, planos, pilha, argumento comercial, travas | `juridico/atlas--ata-de-decisoes--2026-09-30.md`; `contextos/` |
| O site do Atlas e os três sites de exemplo em Next.js | 30.09 a 08.10.2026 | As implementações de referência e o registro de cada defeito e correção | `web/`; `web/CLAUDE.md` |
| A sessão de desenvolvimento de 03 a 08.10.2026 | 03 a 08.10.2026 | As diretrizes de design, o 3D, o Spell UI, a revisão de código, a régua, a análise do Awwwards, o método anti-IA, os planos, os nichos, a Agenda, o `shadcn create`, a esteira de QA, o padrão de design | Os documentos de 07 e 08.10 em `documentacao/` (registro) |
| O texto primário das leis e das normas dos conselhos | 07 e 08.10.2026 | O que a lei e cada conselho exigem e vedam, lido na fonte | `17-conformidade-e-normas.md`; `nichos/<nicho>.md`, seção 3 |
| O formulário de briefing v1.0 e o contexto comercial | Agosto e setembro de 2026 | Os campos do briefing, o argumento, a Condição de Fundação, as regras sem vigência | `comercial/atlas--formulario-briefing.html`; `contextos/atlas--contexto-04-comercial.md` |

**Os cinco documentos de 07 e 08.10.2026 em `documentacao/`**, hoje só registro, e onde cada um foi consolidado:
- `documentacao/atlas--avaliacao-anti-ia.md`: o método, as marcas e os pesos em `11-anti-ia.md`; a avaliação como porta e a linha de base em `../qualidade/11-design-e-anti-ia.md`.
- `documentacao/atlas--planos.md`: a escada, os eixos, os módulos e o esforço em `03-planos.md`; o plano de cada nicho em `nichos/README.md`; a Agenda, o formulário e o relatório de acessos em `14-funcionalidades/`.
- `documentacao/atlas--tecnologia.md`: a pilha, a regra de tecnologia nova e a base de produção em `13-tecnologia-e-estrutura.md` (seções 1, 9 e 8); a tipografia por site em `05-tipografia.md`; a hospedagem em `18-publicacao-e-manutencao.md`.
- `documentacao/atlas--garantia-de-qualidade.md`: a pasta `../qualidade/` (a metodologia em `01`, a régua em `02`, as camadas em `03` a `11`, a integração contínua em `13` e o ciclo em `14`).
- `documentacao/atlas--padrao-de-design.md`: composição, tipografia, cor, imagem e movimento em `05` a `09`; detalhe e conversão em `14-funcionalidades/01-base-de-todo-site.md` e `10-texto-e-conteudo.md`; a direção de arte por nicho em `nichos/`; a lista de revisão de 22 itens em `../qualidade/11-design-e-anti-ia.md`, seção 5.

---

## 2. Onde cada estudo entrou

| Estudo | O essencial | Onde está |
|---|---|---|
| **Análise "nível Awwwards"** (07.10) | Pesos do júri (design 40, usabilidade 30, criatividade 20, conteúdo 10); menção honrosa a partir de 6,5; prêmio de desenvolvimento acima de 7; sites do dia de 7,39 a 7,56; a acessibilidade, a nota técnica mais baixa em 18 de 24; os premiados não cabem no orçamento do Atlas | `12-inspiracao-e-referencias.md`, seções 3 e 4; `00-principios.md`, princípio 6 |
| **O método anti-IA** (07.10) | Briefing visual, capturas a 390 e 1440 px, varredura por categoria, teste do prompt parecido, de unicidade e do desconhecido, tabela de achados por peso; as 59 regras do Impeccable; a linha de base | `11-anti-ia.md`; `../qualidade/11-design-e-anti-ia.md` |
| **A evidência sobre "cara de IA"** | Goree et al. (CHI 2021), Shin et al. (2026), CHI 2026, NN/g, Raptive; a contraevidência e os limites | `11-anti-ia.md`, seção 1; `00-principios.md`, princípios 1 e 7 |
| **O padrão de design** (08.10) | Composição, tipografia, cor, imagem, tokens de movimento, microinterações, conversão, direção de arte por nicho; a lista de revisão de 22 itens | `05` a `10`; `nichos/`; `../qualidade/11-design-e-anti-ia.md`, seção 5 |
| **As Diretrizes de Design Premium** (03.10) | As quatro regras, como se aplicam a site de cliente, e a lição da auditoria (os efeitos de identidade não são violação) | `modelos/claude-do-projeto.md`; `05`, `06` (seção 9), `07`, `16`; `../qualidade/11-design-e-anti-ia.md`, seção 10 |
| **O Spell UI** (03.10) | O gesto da marca, nunca enfeite; o catálogo adaptado; o que os originais traziam; como trazer um componente novo | `09-movimento.md`, seção 6; `13-tecnologia-e-estrutura.md`, seção 3.6 |
| **O 3D da barbearia** (01 a 03.10) | As cinco condições; os giros e o borrado, com causa e correção; pausado é parado | `09-movimento.md`, seção 7; `14-funcionalidades/08-peca-assinatura.md` |
| **A régua do Next.js** (07 e 08.10) | Os dez blocos, os limites, os onze ajustes de calibração, os resultados; o código | `../qualidade/02-regua.md`; `../qualidade/regua/` |
| **A esteira de testes** (07.10) | Camadas por risco, testes estáticos, de unidade, de ponta a ponta, visuais, de desempenho e de segurança; integração contínua com o ramo `producao`; ordem de adoção | `../qualidade/01`, `03` a `10`, `13`, `14` |
| **Os planos** (07.10) | A escada pela tarefa do site; os eixos; o esforço; o rascunho de cada plano; a ata IV.2.1 | `03-planos.md`; ata v3.0, IV.2.1 |
| **Os nichos** (setembro e 07–08.10) | A ordem recuperada de 29.08; o plano de cada nicho; as normas na fonte primária; a estrutura, as funcionalidades, a direção de arte e os campos do briefing de cada ramo | `nichos/README.md`; `nichos/<nicho>.md`; `17-conformidade-e-normas.md`, seção 7 |
| **A Agenda, o formulário e o relatório de acessos** (07.10) | A arquitetura no próprio servidor; as alternativas; a Hostinger por dentro | `14-funcionalidades/02`, `04` e `05`; `18-publicacao-e-manutencao.md` |
| **O `shadcn create` e a base de produção** (07.10) | A estrutura muda, não só a cor; o registro; a proposta de monorepo | `13-tecnologia-e-estrutura.md`, seção 8; `04-direcao-de-arte.md`, seção 4.2 |
| **A tecnologia** (07.10) | A pilha com versões; a regra de tecnologia nova; as dependências | `13-tecnologia-e-estrutura.md`, seções 1, 9 e 10 |
| **O desempenho** (30.09 a 08.10) | Os orçamentos (os bytes reprovam, o tempo avisa); o protocolo do Lighthouse; o estado medido | `15-desempenho.md`; `../qualidade/08-desempenho.md` |
| **A acessibilidade** | WCAG 2.2 AA; o roteiro do leitor de tela; o símbolo da LBI, art. 63, § 1º | `16-acessibilidade.md`; `../qualidade/06-acessibilidade.md`; `17`, seção 3.3 |
| **A conformidade** (30.08, 07.10 e 08.10) | O pacote; os papéis da LGPD; as leis lidas no texto primário; a porta de publicação; os modelos | `17-conformidade-e-normas.md`; `modelos/aviso-de-privacidade.md`, `modelos/declaracao-de-acessibilidade.md`, `modelos/autorizacao-de-imagem.md` |
| **A publicação na Hostinger** (03 e 07.10) | Web app Node ou estático; domínio; manutenção; atualização em ondas | `18-publicacao-e-manutencao.md` |
| **A revisão de código e de segurança** (03.10) | Simples antes de esperto; cabeçalhos; dependências; a âncora malformada | `13-tecnologia-e-estrutura.md`, seção 3; `../qualidade/09` e `12` |
| **Os defeitos e as lições** (30.09 a 08.10) | Cada defeito vira regra, com a origem | `../qualidade/12-ataque-a-falhas.md`, seção 4, e a regra no capítulo de cada assunto |
| **O briefing e o contexto comercial** | Os campos e o porquê; o argumento; a Condição de Fundação; as cinco travas; as regras sem vigência | `02-briefing.md`; `modelos/briefing.md`; `01-processo.md`; `03-planos.md`, seções 7 e 8 |
| **As lições da ESTEIRA v2.1** | A revisão de sentido; onde se produz; a porta genérica; os tokens que parecem um só | `01-processo.md`, etapas 1 e 7; `../qualidade/01-metodologia.md`, seção 3; `06-cor-forma-e-superficie.md`, seção 1 |
| **A busca e as respostas de IA** (16.10) | Os robôs de IA, cada um com a função e o que obedece; o `robots.txt` por tipo de site (o cliente libera tudo; o exemplo fecha os 11 de IA e deixa os buscadores lerem o `noindex`); o mapa com o canônico e a data verdadeira; o grafo `WebSite` + negócio; nenhuma marcação "para IA" (Google, 10.07.2026; Ahrefs, 05.2026); o texto que o robô lê; o `llms.txt` como aposta (o Google não o usa; sem correlação, SE Ranking, 15.10.2026); o IndexNow; o que depende do dono. **Em todo plano** (pedido do usuário de 16.10.2026) | `21-busca-e-ias.md`; `03-planos.md`, seções 1 (regra 5), 2 e 9; `14-funcionalidades/01-base-de-todo-site.md`, seções 10 a 13 e 19; `10-texto-e-conteudo.md`, seções 9 e 10; `13-tecnologia-e-estrutura.md`, seções 2, 5, 6, 9.3 e 11; `18-publicacao-e-manutencao.md`, seções 3.2, 5, 5.1, 7.2, 11 e 12; `../qualidade/14-ciclo-de-qa.md`, seções 5, 6 e 10; `../base/` (seção 8 abaixo) |
| **Os componentes de terceiros** (12 e 13.10) | Cinco frentes até a saturação, com cerca de 1.500 itens e a licença lida no arquivo de cada um. Trouxeram:<br>- os vereditos para site vendido;<br>- a fronteira entre o site do cliente e o kit;<br>- as armadilhas de origem (o shader do Shadertoy e do XorDev, o código do React Bits em repositório MIT, as imagens embutidas);<br>- o encaixe no kit;<br>- as plataformas revistas no texto da licença (Spline, Unicorn Studio, Rive, LottieFiles, Motion+, Theatre.js, `shaders`);<br>- o aviso da licença do Spell UI, que faltava em `../gestos/` | `../componentes/` (o catálogo e o inventário); `09-movimento.md`, seções 6.1, 6.4 e 12; `13-tecnologia-e-estrutura.md`, seções 1, 3.6 e 9.4; `19-o-padrao-atlas.md`, seção 8.3; `12-inspiracao-e-referencias.md`, seção 2; `../qualidade/09-seguranca-e-privacidade.md`, seção 7 |

---

## 3. As contradições entre as fontes, e como ficaram

O inventário de 08.10.2026 achou 45 contradições entre os documentos de origem, e a segunda rodada de leitura achou mais dez (46 a 55). Todas foram tratadas:
- **48 resolvidas:** um valor só no kit, com o motivo.
- **3 registradas como divergência:** ficam com a fonte e a decisão pendente.
- **4 fora do kit.**

| # | A contradição | Como ficou |
|---|---|---|
| 1 | Quantas portas da régua estavam mal calibradas | Quatro portas acusavam o que não era defeito; ao todo, onze ajustes de calibração (`../qualidade/02-regua.md`, seção 6) |
| 2 | O teto de fontes do Atlas (50, 60, 100–200 KB) | 90 KB no Atlas (60 KB até a volta das fontes de 28/08, mantidas em 08.10) e 200 KB nos sites de marca, com o motivo (`15-desempenho.md`, seção 2.1) |
| 3 | O teto de script (60 × 180 KB) | 180 KB, pelo piso de ~131 KB do Next 16 com React 19; nos sites de marca, 600 KB desde 08.10.2026, à noite (e sem teto algum, mais tarde na mesma noite: `00-principios.md`, seção 9), com 300 KB de fontes e 5 MB na carga (pedido do usuário: o design premium sem limite de peso) |
| 4 | A faixa do alvo de toque | 44 px de 320 a 1024 px na régua; a geometria nas catorze larguras |
| 5 | Quantos web apps cabem no plano da Hostinger | **Registrada:** "5" é de terceiros; A CONFIRMAR no painel |
| 6 | A ordem dos nichos, "perdida" ou "recuperada" | Recuperada da lista de 29.08, conferida com dados |
| 7 | O que a CFO-196/2019 veda | Ela permite o antes e depois com termo, só ao dentista que fez o tratamento; a nota do CFO de 16.01.2026 a lê como proibindo a divulgação por pessoa jurídica (resolvido em 08.10.2026: fora); o preço é vedado pelo Código de Ética, art. 44 |
| 8 | Onde estava a arquitetura da Agenda | Fora: o ponteiro da ata foi corrigido |
| 9 | De onde sai o relatório de acessos | O painel da Hostinger, em leituras semanais; a contagem própria não foi adotada na ratificação (`14-funcionalidades/04-relatorio-de-acessos.md`, seção 7) |
| 10 | O `<ViewTransition>` pede atualização? | Não: já está em uso na pilha 16.3.8 / 19.2.8 |
| 11 | "Todos os premiados usam fonte própria ou licenciada" | Corrigido: a Aventura usa fontes abertas (`nichos/README.md`) |
| 12 | O custo do Base UI (17 × 36 KB) | Escopos diferentes: o `Button` sozinho e os três controles |
| 13 | Defeitos invisíveis nas referências (5/39 × 7/46) | Sete de 46, o número do índice da pesquisa |
| 14 | O atraso do LCP pela primeira onda (0,25 × 0,26 s) | 0,26 s (de 2,07 para 2,33 s de mediana) |
| 15 | O "716 ms" para duas grandezas | Distinguidas: a linha principal do módulo da onda e a mediana do TBT do início são medidas diferentes |
| 16 | Sete números para o script do início | Vale a medida da régua, com o método explicado (`15-desempenho.md`, seção 3) |
| 17 | O peso do Inter (22 / 22,4 / 22,9 KB) | A unidade explica: 22,4 KB em base 1.024; 22,9 KB em base 1.000 |
| 18 | Quantos arquivos `"use client"` | A contagem de 07.10 |
| 19 | 23 ou 24 páginas | 23 páginas; 24 endereços com a 404 |
| 20 | O TBT de 03.10 | Cada medida com a data e o método |
| 21 | O limiar do texto grande em negrito (18,5 × 18,66 px) | 18,66 px (14 pt) |
| 22 | A inclinação do Tilt Card | O padrão do componente e os usos do Atlas, separados; num site novo, até 8° |
| 23 | As durações da troca de página e das entradas | **Registrada:** o Atlas passa dos tokens propostos; a decidir (`09-movimento.md`, seção 2) |
| 24 | O Spell UI no título × o método anti-IA | Nunca no título num site de cliente; no Atlas, na linha de base para decisão |
| 25 | Cantos arredondados × "kit de SaaS" | Raio por hierarquia, nunca um raio só |
| 26 | A regra 60-30-10 | Conferência de área nos sites de marca; no Atlas, vale a ata |
| 27 | O hexadecimal do Navy Sombra | Fora: é do manual da marca |
| 28 | Onde está o código (organização × conta pessoal) | A conta pessoal `gabriel-yida`; não há organização |
| 29 | A régua como gancho | A régua roda à mão e na integração contínua; os ganchos são RATIFICADO |
| 30 | O formulário de briefing existe? | Existe (v1.0); a versão nova está em `02-briefing.md` |
| 31 | Quem tira as fotos | Por plano, como RATIFICADO; o adiamento do protocolo vale até a ratificação (`08-imagem-e-fotografia.md`) |
| 32 | A Página adicional no montador | Fora: é do site do Atlas (pendência, seção 5) |
| 33 | A linha de privacidade dos exemplos | O selo em uso cobre o pedido de 30.08 |
| 34 | O que a mensalidade compreende | A lista da ata (IV.2.1, item 5) |
| 35 | O Profissional é estático? | Não: o formulário exige servidor |
| 36 | SQLite | Não serve: a publicação sobrescreve as pastas do app |
| 37 | A rolagem com inércia | Vedada pela ata |
| 38 | Quantos scripts ad hoc portar | Fora: plano do repositório do Atlas |
| 39 | A ESTEIRA fora de uso, mas citada | Substituída pela v3; citada só como origem |
| 40 | A regra 1 das diretrizes × duas famílias nos sites de marca | Uma família no Atlas; até duas, com papéis distintos, nos sites de marca |
| 41 | "Servidor local" × "servidor próprio" | O servidor contratado pelo Atlas (`14-funcionalidades/05-agenda.md`) |
| 42 | O rascunho de 24 horas do Completo | **Registrada:** a "versão inicial" é RATIFICADO; vale a definição da ata (IV.4) |
| 43 | A Presença "para todos" | Todos, menos a psicologia e a advocacia |
| 44 | As exceções à regra da rolagem | Listadas (`09-movimento.md`, seção 5) |
| 45 | O peso das fontes de 28.08 | Duas medidas: 52,5 KB, a soma dos arquivos; 54 KB, o transferido no Lighthouse |
| 46 | O mínimo de fotos (seis no total × três por categoria do nicho) | Três por categoria, o mais exigente; a divergência anotada em `03-planos.md`, seção 2 |
| 47 | A duração do briefing (20 a 30 min × 30, 45 e 60 min) | Por plano: 30, 45 e 60 min (`02-briefing.md`, seção 1) |
| 48 | A funcionalidade do Profissional nos planos de 07.10 (o filtro de imóveis, o simulador da academia) | A correspondência por nicho do contexto de nichos (`03-planos.md`, seção 4.1) |
| 49 | A peça-assinatura e a ata | A ata (IV.2.1) não a lista: é RATIFICADO (`14-funcionalidades/08-peca-assinatura.md`) |
| 50 | A data da suspensão da figura desenhada (12.09 × 30.09) | 12.09.2026, a do registro de decisões (`08-imagem-e-fotografia.md`, seção 2.3) |
| 51 | Os serviços do briefing e a orientação das fotos (4 a 8 itens, na horizontal × três a seis, nas duas) | Três a seis serviços; as duas orientações (RATIFICADO; `02-briefing.md`) |
| 52 | O método do estudo de Krebs (modelo de linguagem × verificações determinísticas) | Verificações determinísticas de CSS e de DOM, sem capturas nem modelo como juiz, conferidas no artigo (`11-anti-ia.md`, seção 1.1) |
| 53 | A esfera da capa como exceção à regra da rolagem | Não é: é exceção ao "movimento só por ação" (`09-movimento.md`, seção 5) |
| 54 | O esqueleto da imagem ("nunca na `<img>`" × o CSS do Atlas, que o põe na `<img>`) | O kit segue o código (`08-imagem-e-fotografia.md`, seção 8) |
| 55 | O que o art. 26 do CDC dá (garantia × prazo para reclamar) | Prazo legal para reclamar; a garantia contratual exige termo escrito (art. 50) (`17-conformidade-e-normas.md`, seção 3.2) |

---

## 4. O que fica fora desta esteira, de propósito

| O quê | Por quê | Onde está |
|---|---|---|
| A história do site do Atlas (o que mudou em cada dia) | Não ensina regra a outro site; as lições que ensinam estão no kit | `web/CLAUDE.md`; `documentacao/atlas--decisoes.md` |
| As perguntas pessoais de 04 e 06.10 (compra de computador, planos do Claude) | Não dizem respeito à produção | — |
| Os conselhos comerciais de 04.10 (faixas de mercado, reajuste, expansão em fases) | Conselho, não decisão nem regra de produção | `contextos/atlas--contexto-04-comercial.md`, seção 10 (conselhos de 04.10, não decididos) |
| O manual da marca do Atlas (paleta, hexadecimais) | É do Atlas, e o kit é para sites de cliente | `marca/` |

---

## 5. O que segue pendente no repositório do Atlas

**A0. O que a ratificação de 08.10.2026 resolveu** (pedido do usuário: "Faça a ratificação completa da esteira de produção"; ata v3.0, VI, itens 14 a 17, e a pilha, do item 11). Passou a valer:
- **a esteira v3 e a qualidade** (VI, item 17), com os prazos por plano e as páginas legais fora do limite de páginas;
- **as Diretrizes de Design Premium** (VI, item 14; V.1);
- **o que cada plano entrega e os esclarecimentos de IV.2.1** (VI, item 15), e a arquitetura da Agenda, a do módulo (`../modulos/agenda/`);
- **o plano por nicho e a ordem dos doze**, sem a troca entre oficina e pet shop, **a tipografia por site e a regra de mudança da pilha** (VI, item 16);
- **o aviso de incidente em até 24 horas** no contrato de operador (VI, item 17);
- **o `noindex` sem `Disallow`** nos sites de exemplo, contra o `robots.txt` que bloqueia tudo (`14-funcionalidades/01-base-de-todo-site.md`, seção 13). Revisto em 16.10.2026: os buscadores continuam livres para ler o `noindex`, e só os 11 robôs de IA de treino ou sem `noindex` documentado levam `Disallow: /` (seção 8);
- **o teste de unicidade contra concorrentes** no Profissional e no Completo (`04-direcao-de-arte.md`, passo 9);
- **a regra de uso do Spell UI**: o gesto da marca, nunca enfeite de catálogo (`09-movimento.md`, seção 6);
- **o 3D e a peça-assinatura no Completo de cliente**, nas cinco condições (`09-movimento.md`, seção 7; `14-funcionalidades/08-peca-assinatura.md`). A vedação de 12.09 ao 3D deixa de valer na produção;
- **as regras do modelo de `CLAUDE.md` do projeto**: o relatório final detalhado, os dois Matheus, a leitura só dos documentos da sociedade;
- **as posições da esteira que esperavam Gabriel Ribeiro Ota Yida**: "nenhuma figura" nos doze, com os substitutos de custo zero, e a peça-assinatura do Completo; a postura tipográfica por nicho; o protocolo de fotografia.

O que segue abaixo ficou **fora** da ratificação, por ser da sociedade, do comércio, do próprio site do Atlas ou de terceiros.

**A. Decisões dos sócios, do advogado e do contador**

| Pendência | Onde a esteira trata |
|---|---|
| A forma do símbolo de acessibilidade, com o advogado (a regra do símbolo e da declaração, que nenhum site do Atlas tem ainda, está ratificada) | `17-conformidade-e-normas.md`, seção 3.3 |
| A lista do advogado: aviso de privacidade, contrato de operador, Marco Civil (art. 15), Decreto 7.962/2013, os pontos dos conselhos, a autoria das fotos, a autorização de imagem | `17-conformidade-e-normas.md`, seção 10; `modelos/autorizacao-de-imagem.md` |
| A titularidade do domínio e dos arquivos no fim do contrato (contador) | `17`, seção 8 |
| A regra de desconto só na criação: decidida em 05.08 (ata, bloco 07), listada como de vigência indefinida no contexto comercial (§8) | `03-planos.md`, seção 8 |
| Implantar a integração contínua (o plano e a ordem de adoção estão ratificados; nada implantado) e, quando o volume pedir, a base em monorepo (direção ratificada); decidir a cota de web apps antes do quinto cliente com servidor | `../qualidade/13-integracao-continua.md`, seção 9; `13-tecnologia-e-estrutura.md`, seção 8 |
| Renovar a Hostinger: lembrar em 20.12.2026; vence em 05.01.2027 | ata v3.0, III.3 |
| Pendências da sociedade que travam a publicação: a consulta ao contador (desde agosto), a LTDA e o CNPJ; capital e governança; o titular da presença digital dos clientes; os valores da Condição de Fundação em reais `[A CONFIRMAR]`; os números de mercado `[SEM FONTE]`; o modo de publicação (PENDENTE; o web app Node é o recomendado) | ata v3.0, VI; `01-processo.md` (ordem de trabalho); `17-conformidade-e-normas.md`, seção 10; `18-publicacao-e-manutencao.md` |
| A refação dos doze demos estáticos "depois do primeiro cliente" e o congelamento do núcleo durante ela (decisões de 12.09): revogar, se a refação vier antes | `nichos/README.md`, seção 4 |
| O título de CTO de Matheus Castro Oliveira de Luna Garcia (03.10): a ata (I.1) define a função, não o título | — (sociedade) |
| Ratificar o registro de decisões do Atlas inteiro: nenhuma decisão dele passou por reunião dos sócios | — (sociedade) |
| Cronometrar o rascunho de 24 horas no piloto (a nutrição): o prazo nunca foi medido num cliente real | `01-processo.md`, seção 3 |
| Quem fotografa os clientes: o fotógrafo por diária (de R$ 654 a R$ 1.343, levantamento de 07.10) ou o protocolo do celular com um kit de luz; e o estabelecimento real que autorize as fotos do piloto da nutrição | `08-imagem-e-fotografia.md`; `03-planos.md`, seção 2 |
| O monitoramento dos web apps de cliente: nenhum documento define como saber que um app caiu ou ficou lento, embora a mensalidade da Agenda inclua o "monitoramento" | `18-publicacao-e-manutencao.md`; `14-funcionalidades/05-agenda.md`, seção 13 |

**B, C e C2.** Os defeitos, as melhorias e as pendências de desempenho do site do Atlas e dos sites de exemplo dele saíram do kit em 03.11.2026, a pedido do usuário ("Isso é sobre o Atlas, pode retirar da pasta produção"): estão em `atlas--pendencias-do-site.md`, na raiz do repositório do site do Atlas, com as linhas da tabela A que eram do site.

**D. A confirmar**
- **Na Hostinger:** se o plano Business virou o "Unlimited" (150 bancos MySQL de 3 GB, 3 GB de RAM: levantamento de 07.10 [FU]); a cota de web apps (fontes de terceiros dizem 5, contando o do Atlas); as tarefas agendadas para app Node; se o Analytics aparece para web apps Node; a versão do banco (`SELECT VERSION()`); se um domínio estacionado serve um app Node; o tempo de guarda dos registros; o cabeçalho do IP do visitante; o encaminhamento do host para a checagem de origem das Server Actions; os limites de e-mail (em "View limits"); o modo de forçar o HTTPS; o tempo até o app dormir e a partida a frio; o backup.
- **A publicação estática** nunca foi executada.
- **Com a Meta:** a tabela de preços em reais e a regra de cobrança em vigor desde 01.10.2026, se o cliente quiser o WhatsApp pela API oficial (`14-funcionalidades/05-agenda.md`, seções 11 e 15).
- **Medições nunca feitas:** o INP; o Lighthouse da barbearia ainda dá de 87 a 89 de desempenho.
- **Conferências nunca feitas:** nenhum teste em aparelho real, nem num Android de entrada nem no Safari do iPhone (até 08.10.2026 só o Chromium foi exercitado; `../qualidade/14-ciclo-de-qa.md`, seção 4); o teclado e o leitor de tela não foram exercitados de ponta a ponta (`../qualidade/06-acessibilidade.md`, seções 4, 5 e 7).
- **O Node 22.17.1 da máquina** está abaixo do que o Lighthouse 13 declara (22.19).
- **Fontes que pedem o texto integral** antes do primeiro cliente do nicho:
  - a CFN 856/2026;
  - a CFMV 1.649/2025;
  - a CFP 003/2007;
  - a CONFEF 307/2015;
  - a Lei estadual 6.590/2013 (a tabela nutricional no cardápio);
  - a NBR 17225:2025.
  - a CFN 680/2021, que o demo de setembro citou sem conferir (só citar depois de lida; `nichos/nutricao.md`, seção 7);
  - a CFP 09/2024 (atendimento mediado por tecnologia) e o RQE da medicina [FU] (`nichos/psicologia.md`, seção 10; `nichos/medicina.md`);
  - a Lei 7.405/1985 (Símbolo Internacional de Acesso), que o Planalto não abriu em 08.10.2026 (`17-conformidade-e-normas.md`, seção 3.3).

Onde no kit: `18-publicacao-e-manutencao.md`; `14-funcionalidades/05-agenda.md`; `15-desempenho.md`; `nichos/<nicho>.md`, seção 10.

**E. Pesquisa que falta:** a análise da medicina (nunca feita); a da odontologia (incompleta; o demo nunca foi medido); referências brasileiras de mesmo porte para nutrição, psicologia, medicina e imobiliária de bairro; a auditoria dos concorrentes de Niterói. Onde no kit: `nichos/README.md`, seção 5.

---

## 6. Como a entrega foi verificada (08.10.2026)

1. **Leis e normas no texto primário.**
   - **No Planalto e no Diário Oficial:** o Decreto 7.962/2013; o Marco Civil (art. 15); a LBI (art. 63); a LGPD (arts. 5º, 7º, 8º, 11, 14, 39, 41, 42, 46, 48); o CDC (arts. 26, 30, 31, 37, 39, 40); o Código Civil (art. 20); as Resoluções CD/ANPD 2/2022 e 15/2024.
   - **Nos sites dos conselhos ou em cópia oficial:** as normas dos conselhos. A leitura do texto da COFECI 1.065/2007 corrigiu a regra do CRECI em onze documentos: o CRECI vai junto do nome, com no mínimo 25% do tamanho dele, e não a 25% "da maior expressão".
2. **O verificador de referências** (um script que confere cada "arquivo, seção N" das duas pastas): zero referências quebradas, salvo as intencionais (arquivos que o repositório do cliente cria).
3. **O inventário:** 673 itens de estudo, medição, lição e decisão, extraídos da sessão e dos documentos, em 19 grupos.
4. **A triagem automática:** 515 itens com pelo menos 80% das âncoras (números, normas, nomes) achadas no kit.
5. **Primeira rodada de leitura** (203 itens: os 158 incertos e uma amostra de 45 dos confirmados): 115 presentes, 68 parciais, 5 divergentes, 5 ausentes, 10 fora do escopo. As 78 correções foram aplicadas.
6. **Consistência entre documentos:**
   - 26 divergências de fato;
   - as 45 contradições;
   - o teste do repositório vazio (um pet shop no Essencial), com 5 lacunas bloqueantes e 14 instruções ambíguas;
   - 15 regras sem objetivo;
   - 13 variações de terminologia.

   As 80 correções foram aplicadas. Entre as lacunas fechadas:
   - o código da régua, agora em `../qualidade/regua/`;
   - como medir o site estático;
   - os campos do briefing de cada nicho;
   - o modelo de autorização de imagem.
7. **Revisão de código:** 172 blocos e 29 problemas (2 de gravidade alta: o código de cancelamento da Agenda gravado pelo contador de acessos; o servidor standalone que não responde no contêiner da integração contínua). Todos corrigidos, com os nomes uniformizados (`lib/ancoras.ts`, `retry`, as variáveis das fontes).
8. **Segunda rodada de leitura** (os 470 itens restantes, que a triagem tinha confirmado): 313 presentes, 134 parciais, 12 divergentes, 4 ausentes e 7 fora do escopo. As amostras da primeira rodada já tinham mostrado que de 15% a 24% dos "confirmados" estavam só parciais, por isso todos foram lidos. As 150 correções foram aplicadas.
   - **Entre as divergentes:**
     - o método do estudo de Krebs (verificações determinísticas, não um modelo de linguagem; conferido no artigo);
     - a esfera da capa, que não é exceção à regra da rolagem;
     - o prazo do art. 26 do CDC, que não é garantia;
     - a data da suspensão das figuras;
     - o site no ar, que é o de 28.08.
   - **No total,** os 673 itens foram lidos: 428 já estavam no kit, 228 foram completados ou corrigidos em 08.10.2026 e 17 ficam fora do kit, com o lugar do registro. A matriz item a item está em `documentacao/atlas--rastreabilidade-esteira--2026-10-08.md`, no repositório do Atlas.
9. **O site do Atlas:**
   - o build de produção sem erro;
   - a régua inteira, que reprovou às 7h31 por um defeito que só aparece de manhã (o marcador do depósito, corrigido);
   - a rodada final, registrada na matriz.

10. **A produção (`../`, 08.10.2026, depois da verificação acima).** A base de código executou a esteira e achou o que a leitura não acharia:
    - **na régua**, a calibração n.º 12, o `HEAD` de conferência do Next no export estático relatado como abortado (`../qualidade/02-regua.md`, seção 6);
    - **na medição do site estático**, o `python3 -m http.server`, que não comprime e recusa conexões em paralelo, trocado por `npm run estatico`;
    - **na contradição de pastas**, `producao/qualidade/relatorios/` contra `producao/qualidade/registros/`, unificada em `registros/`;
    - **no modelo de `CLAUDE.md`**, a pilha do Atlas e o servidor do Python, trocados pelos da base;
    - **nas fontes**, a de texto em `optional`, como manda `05-tipografia.md`, seção 4.2;
    - **na área segura do celular com recorte**, que faltava com `viewportFit: "cover"` (`13-tecnologia-e-estrutura.md`, seção 6, regra 4), e o `apple-icon.png` de 180 px (regra 6), agora na base;
    - **no Turbopack**, que recusa ICO com PNG em RGB;
    - **no rodapé do profissional pessoa física**, sem CNPJ: o nome completo e o registro.

    A verificação está em `../README.md`, seção 4: a base aprovada pela régua, e o `novo-site` de ponta a ponta, no exemplo e num cliente.

**O que não se verificou, e por quê:**
- **No painel da Hostinger:** nada foi exercitado; está marcado A CONFIRMAR.
- **O parecer do advogado:** a lista está na seção 10 de `17`.
- **A Agenda:** construída por inteiro em `../modulos/agenda/`, com o `mysql2` e o `nodemailer` aprovados pelo usuário em 08.10.2026, e conferida contra banco real no mesmo dia (MariaDB 10.11.19 e MySQL 8.0.46; `../modulos/README.md`, seção 8). Nunca rodou num cliente, nem com o SMTP e o Google reais.
- **O INP:** nunca foi medido.

---

## 7. Como manter este documento

- **Estudo novo:** entra no lugar certo do kit, e uma linha nova vai na seção 2.
- **Contradição nova entre fontes:** entra na seção 3 com a decisão, ou como divergência registrada.
- **Pendência resolvida:** sai da seção 5 e vai para o registro de decisões do Atlas, com a data.
- **A matriz item a item:** é um registro datado; a próxima verificação completa gera outra, com a data dela.

---

## 8. Registro de 16.10.2026: aparecer nas buscas e nas IAs em todo site

**O pedido do usuário** (16.10.2026): "adicione a capacidade de aparecer nas pesquisas e nas IAs em todos os sites, independentemente do plano, dentro da documentação da produção."

**A decisão** (DECIDIDO em 16.10.2026, pelo pedido): aparecer nas buscas e nas respostas de IA é da base de todo site, em todo plano (Essencial, Profissional e Completo). Não é diferencial de plano: o Completo acrescenta páginas de busca, não a capacidade (`03-planos.md`, seção 1, regra 5). O documento próprio é `21-busca-e-ias.md`.

**As fontes.** Três documentos da sessão de 16.10.2026: a pesquisa (cada afirmação com a fonte e a data, nas marcas [Oficial], [Estudo], [Mercado] e [Inferência], que no kit viraram [V], [FU] e [NV]), a auditoria do site do Atlas e o plano de implementação (seções 0 a 13; a seção 11 é a do kit). Estão no rascunho da sessão, fora de qualquer repositório; o essencial, com as fontes, está em `21-busca-e-ias.md`. **Guardá-los** em `documentacao/` do repositório do Atlas, como os outros estudos, é o que falta para a rastreabilidade completa.

**As decisões, com o motivo:**

| Decisão | Por quê | Onde |
|---|---|---|
| [cli] O `robots.txt` libera tudo, inclusive os robôs de IA de busca e de treino | O cliente quer ser achado e citado; bloquear o treino não tira o site da busca do Google, mas o `Google-Extended` tira o site do embasamento nos apps Gemini e no Vertex AI, o que se diz ao cliente antes de registrar o pedido dele | `21-busca-e-ias.md`, seção 2 |
| [ex] Os 11 robôs de IA com `Disallow: /`; os buscadores livres; o `X-Robots-Tag` por cabeçalho | O robô bloqueado não lê o `noindex`, e o endereço ainda pode aparecer (Google, block-indexing); os 11 treinam ou não documentam o `noindex`; o cabeçalho cobre as imagens | `14-funcionalidades/01-base-de-todo-site.md`, seção 12 |
| O mapa do site pelo canônico, com a data verdadeira, sem `priority` nem `changefreq` | A base listava `/servicos`, que redireciona; a data falsa é sinal ruim (Google, 05.10.2026) | `21-busca-e-ias.md`, seção 3 |
| O grafo `WebSite` + negócio, com `@id`; nada "para IA" | O `WebSite` dá o nome do site na busca; não há marcação especial para IA (Google, 10.07.2026) e os estudos não acham ganho | `14-funcionalidades/01-base-de-todo-site.md`, seção 11 |
| O texto que o robô lê: `{" "}` entre linhas e rótulos; a cópia decorativa só pelo CSS; a ferramenta `texto-do-robo` | Os robôs de IA leem o HTML sem montar a página (Vercel, 12.2024); a base entregava o endereço colado | `14-funcionalidades/01-base-de-todo-site.md`, seção 19 |
| O título que diz o que se vende e onde; a definição no início | O título é o que a busca e a IA mostram; o Bing pede o essencial no topo (02.2026) | `10-texto-e-conteudo.md`, seção 10 |
| O `llms.txt` como aposta, gerado do conteúdo, sem `X-Robots-Tag` próprio; no exemplo, só o nome e o selo; sem `llms-full.txt` | Custo baixo; o Google não o usa e não há correlação medida; o `llms-full` nem está na proposta | `21-busca-e-ias.md`, seção 7 |
| O IndexNow só do que mudou, nunca no exemplo, com o ensaio antes | "Submit only when content has changed"; o Bing alimenta o Copilot | `21-busca-e-ias.md`, seção 8 |
| A conta do Search Console é do cliente, com o Atlas como usuário | O princípio do Perfil da Empresa (`14-funcionalidades/06-presenca.md`, seção 1) [NV: a confirmar pelo aprovador] | `21-busca-e-ias.md`, seção 9 |

**O que mudou, arquivo por arquivo** (todos em `producao/`):
- **A esteira:** `21-busca-e-ias.md` (novo); `README.md` (o mapa, a ordem de leitura, a manutenção); `03-planos.md` (seção 1, regra 5; seção 2, eixo Busca; seção 9, o aceite); `14-funcionalidades/01-base-de-todo-site.md` (seções 10, 11, 12 e 13; a 19, nova); `14-funcionalidades/README.md` (o catálogo, marcado [todos]); `13-tecnologia-e-estrutura.md` (seções 2, 5, 6, 9.3 e 11); `18-publicacao-e-manutencao.md` (seções 3.2 e 5, itens 9 e 16 a 20; a 5.1, nova; 7.2, 11 e 12); `10-texto-e-conteudo.md` (seções 9, 10 e 13); este documento.
- **A qualidade:** `14-ciclo-de-qa.md` (seção 5, a linha "aparece nas buscas e nas IAs"; seção 6; seção 10, o aceite); `10-conteudo-normas-e-texto.md` (seção 7); `05-ponta-a-ponta.md` (a fumaça pede o `/llms.txt`); `modelos/checklist-de-publicacao.md` (as partes A, B e C).
- **O kit em volta:** `../README.md` ("Atualizado em"); `../01-roteiro-da-sessao.md` (etapa 11); `../claude/commands/publicar.md` e `manutencao.md`.
- **A base** (`../base/`): `app/robots.ts` (o grupo dos 11 no exemplo); `app/sitemap.ts` (o canônico com a barra, lido do `next.config.ts`); `app/llms.txt/route.ts` e `lib/llms.ts` (novos); `lib/dados-estruturados.ts` (o grafo, com import relativo) e `app/page.tsx`; `components/endereco.tsx`, `components/cabecalho.tsx`, `app/page.tsx` e `app/servicos/page.tsx` (os `{" "}`); `next.config.ts` e `ferramentas/htaccess.modelo` (o `AddDefaultCharset`; o `noindex` do `llms.txt`, posto e depois tirado, seção 8.1); `ferramentas/gerar-htaccess.mjs` (o `noindex` no exemplo); `ferramentas/conferir-pronto.mjs` (a rota `force-static` não pede servidor); `ferramentas/texto-do-robo.mjs` e `ferramentas/avisar-indexnow.mjs` (novos); `testes/lib.test.ts` (dois testes); os `README.md` da base, de `ferramentas/`, de `lib/` e de `testes/`.

**Como foi conferido** (16.10.2026, sem compilar a base, por instrução da sessão):
- `npm test` na base: 11 testes, 11 aprovados (eram 9);
- `npx tsc --noEmit -p tsconfig.json` na base: sem erro;
- as saídas do `robots`, do mapa do site, do `llms.txt` e do JSON-LD, rodadas no Node sobre os arquivos da base, no exemplo de fábrica e numa cópia de cliente: no exemplo, o grupo dos 11 e o mapa vazio; no cliente, só o `*`, o mapa com a barra no estático e sem ela no modo servidor, e o grafo com o `publisher` ligado ao `@id` do negócio;
- o `avisar-indexnow` contra um servidor local de ensaio, sem nada sair para a rede: sem chave, recusa; `--chave-nova` grava e não repete; o `--ensaio` monta o pedido; o endereço fora do mapa, o envio contra outro endereço e o site de exemplo são recusados;
- o `conferir-pronto`: sem a exceção da rota `force-static`, acusava o `llms.txt` como rota de servidor; com ela, não;
- o `texto-do-robo` contra o servidor de desenvolvimento do site do Atlas: achou o rótulo da abertura de cada página colado ao título ("01 / 06" com "Para quem") e 43 junções coladas na demo de odontologia. É defeito do site, não do kit: vai à frente do site.

**O que ficou pendente:**
1. **Levar o kit ao repositório principal.** Esta cópia (`producao/` da pasta de implantação) está fora do git (`.gitignore`); a fonte do kit é o repositório do Atlas. As mudanças desta seção vão para lá e para o registro de decisões (`documentacao/atlas--decisoes.md`).
2. **Compilar a base antes de levar o kit ao repositório principal** **Resolvido em 03.11.2026** (seção 14): o build, o export e o `llms.txt`, o `sitemap.xml` e o `robots.txt` conferidos no exemplo e no modo cliente. Antes: (item 1). Em `producao/base`: `npm run build`, `npm run estatico`, `node ferramentas/texto-do-robo.mjs http://localhost:3100` e `curl -s` do `/llms.txt`, do `/sitemap.xml` e do `/robots.txt`, e a régua contra o `out/`. O `llms.txt` no export, o `import` do `next.config.ts` pelo mapa e pela rota e os `{" "}` no HTML não foram vistos num build: o build do coordenador é o da raiz, cujo `tsconfig.json` exclui `producao/`, e não cobre a base.
3. **Os gestos do kit** **Resolvido em 03.11.2026** (seção 14): a cópia sai do HTML e vem do CSS (`::before` com `data-texto`). Antes: (`../gestos/components/ui/spell/`) ainda levam a cópia decorativa no HTML (`14-funcionalidades/01-base-de-todo-site.md`, seção 19, item 2).
4. **Conferir na Hostinger,** no primeiro site estático publicado, o `AddDefaultCharset` do `.htaccess` [NV].
5. **Medir** os pedidos ao `/llms.txt` nos registros de acesso da Hostinger, no site do Atlas (`13-tecnologia-e-estrutura.md`, seção 9.3).
6. **O aprovador** (Matheus Castro Oliveira de Luna Garcia) confirma: **Resolvido em 03.11.2026** (seção 14): tudo no nome do cliente, e as duas regras de texto confirmadas. Antes: a conta do Search Console no nome do cliente, com o Atlas como usuário; a regra do título interno e a da definição no início, que mudam o texto dos sites (em vigor até lá: `10-texto-e-conteudo.md`, seção 10).

### 8.1 · As correções da crítica de fora (16.10.2026)

Um crítico de fora da frente revisou o que está acima e achou sete defeitos. Corrigidos no mesmo dia:

| Defeito | A correção | Onde |
|---|---|---|
| O `llms.txt` do exemplo listava o endereço, o telefone e o horário fictícios e as cinco páginas, todas `noindex`, contra a regra "nunca o que é `noindex` ou fictício" do próprio kit; e dizia "abre com o selo" quando o selo vinha depois do resumo | No exemplo, o `textoDoLlms` devolve só o H1 e o selo, como resumo, assim como o mapa do site sai vazio; o teste cobre os dois tipos de site | `../base/lib/llms.ts`, `../base/testes/lib.test.ts`; `21-busca-e-ias.md`, seções 2, 7, 10 e 11; `14-funcionalidades/01-base-de-todo-site.md`, seção 13; `14-funcionalidades/README.md`; `18-publicacao-e-manutencao.md`, seção 5, item 18; `../qualidade/14-ciclo-de-qa.md`, seção 5 |
| O kit punha `X-Robots-Tag: noindex` no `/llms.txt` e o cobrava na porta, contra a decisão do coordenador no site do Atlas (`app/llms.txt/route.ts`: "o arquivo fica legível e indexável como as páginas"); o `noindex` era só inferência, e quem o obedece são os robôs de busca das IAs a que o arquivo se dirige | Tirado da base e da porta: nenhum `x-robots-tag` no `/llms.txt` do cliente publicado; no exemplo, vale o `noindex, nofollow` de toda resposta | `../base/next.config.ts`, `../base/ferramentas/htaccess.modelo`, `../base/app/llms.txt/route.ts`; `21-busca-e-ias.md`, seções 7 e 11; `18-publicacao-e-manutencao.md`, seções 3.2 e 5, item 17; `13-tecnologia-e-estrutura.md`, seção 5 |
| A seção 2 do `21` dizia, com [V], que bloquear o treino não tiraria o site das respostas; o `Google-Extended` controla também o embasamento nos apps Gemini e no Vertex AI | Reescrita: não tira da busca do Google, mas tira dessas respostas, e o produtor diz isso ao cliente antes de registrar o pedido | `21-busca-e-ias.md`, seção 2; a tabela acima |
| Os títulos de fábrica de `/servicos` ("Serviços e valores", igual ao rótulo) e de `/onde` ("Onde fica") contrariavam a regra nova; o kit não dizia como conciliar o título com o `h1`, nem se a regra já valia | "Valores do banho e da tosa no Fonseca" e "Endereço e horário no Fonseca, Niterói"; o `titulo` serve ao `<title>` e ao `h1`; a regra em vigor desde 16.10.2026, revisável pelo aprovador | `../base/conteudo/site.ts`; `10-texto-e-conteudo.md`, seção 10 |
| O `avisar-indexnow` aparecia como pronto, sem envio real | Marcado [NV: o envio nunca foi executado; o primeiro será o do site do Atlas] | `21-busca-e-ias.md`, seção 8; `18-publicacao-e-manutencao.md`, seção 5, item 19 |
| Duas marcas incoerentes: "[V, consolidado; não reconferido]" e "serve ao agente" sem base | "[NV: consolidado; não reconferido em 16.10.2026]"; "pode servir [NV]" | `21-busca-e-ias.md`, seções 3 e 7 |
| A base nunca foi compilada com as mudanças | **Não corrigido:** a sessão proíbe o `npm run build`. Fica como condição para levar o kit ao repositório principal (pendência 2, acima) | — |

**Conferido** (16.10.2026): `npm test` na base, 11 de 11; `npx tsc --noEmit -p tsconfig.json` na base e na raiz, sem erro; a saída do `textoDoLlms` no exemplo de fábrica (o H1 e o selo, mais nada) e numa cópia de cliente (o contato, as páginas pelo canônico, as legais em "Optional", nenhum "fictício"); o `curl -sI` do `/llms.txt` do site do Atlas, sem `x-robots-tag`; nenhuma menção restante ao `noindex` do `llms.txt` no kit.

---

## 9. Registro de 28.10.2026: os 60 quadros por segundo em todo site

**O pedido do usuário.** Em 22.10.2026: o site a 60 quadros por segundo na rolagem e em toda navegação, "sem matar muito a capacidade dos celulares", no site do Atlas e nos sites da esteira. Em 27.10.2026: "verifique a adicao do 60fps em todo o site tanto no computador quanto no mobile, e tambem quero qe voce ja adicione no site que sempre que for mudar de uma pagina, ela comeca no topo". Perguntado, autorizou para o site do Atlas a troca da transição de página ("Trocar a transição").

**A decisão** (DECIDIDO em 28.10.2026, pelo pedido): o ritmo de 60 quadros por segundo na rolagem, no menu, na navegação e na figura, no celular 4× e na mesa, é porta de entrega de todo site, de todo plano, lida pela régua dos quadros em duas sessões separadas (`15-desempenho.md`, seção 2.4). O celular 6× avisa.

**As fontes.** No repositório do Atlas, `registros/atlas/design-v2/`: `60fps-diagnostico.md` (a régua e o diagnóstico de 22.10.2026, com as demos), `60fps-navegacao/RELATO.md` (a causa e a correção, 27.10.2026, com a verificação) e `60fps-navegacao/RELATO-2.md` (a implementação, as três rodadas completas e a verificação de 28.10.2026), com os rastros, os ensaios e os patches. A régua é `ferramentas/regua/quadros.mjs`.

**O que se mediu, em uma linha por causa** (o detalhe, nas seções 5.7, 5.8 e 5.15 a 5.17 de `15-desempenho.md`):

| Causa | Onde reprova | A correção | Onde no kit |
|---|---|---|---|
| A View Transition do React na troca de página: a captura recalcula a página inteira e segura a tela | Navegação, celular 4× (5 batidas no Atlas; 4 a 5 em cinco demos) | A entrada por CSS, só na ida; o cabeçalho fora da caixa; nada fixo dentro dela | `15-desempenho.md`, 5.15; `13-tecnologia-e-estrutura.md`, 3.7, regra 4; `09-movimento.md`, 8 |
| O mapa do vidro reassado a cada troca de página | Navegação, mesa (53 ms numa tarefa) | O resultado guardado pela chave; o cálculo aos poucos no ocioso | `15-desempenho.md`, 5.16 |
| As seções não poupadas: o commit calcula a página inteira | Navegação, celular 4×, em `/planos` | `content-visibility` com as quatro condições | `15-desempenho.md`, 5.10 e 5.17; `13-tecnologia-e-estrutura.md`, 3.1, regra 4 |
| O movimento por script: atributo trocado a cada movimento do ponteiro; laço que desenha a cada quadro | Figura e rolagem (na versão descontinuada de 22.10) | A regra que já existia: nada de escrever estilo a cada quadro; o laço pausado | `15-desempenho.md`, 5.7 e 5.8 |
| A restauração da rolagem do navegador | O voltar fora do lugar com as seções poupadas (327 a 570 px) | A página que abre no topo | `13-tecnologia-e-estrutura.md`, 3.7, regra 9 |

**O que mudou, arquivo por arquivo** (todos em `producao/`):
- **A esteira:** `15-desempenho.md` ("Estado"; seção 1; a 2.4, nova; 5.7, 5.8 e 5.10; as 5.15 a 5.17, novas; seções 6 e 7); `13-tecnologia-e-estrutura.md` (a pilha e o que degrada, na seção 1; 3.1, regra 4; 3.7, a regra 4 reescrita e a 9, nova); `09-movimento.md` (seção 8); `00-principios.md` (seção 5, os orçamentos); `03-planos.md` (seção 9, o aceite); `modelos/claude-do-projeto.md` (o `content-visibility`); este registro.
- **A qualidade:** `02-regua.md` ("Estado"; a calibração n.º 21; seção 9; a 12, nova); `08-desempenho.md` ("Estado"; seção 1; seção 9; a 11, nova); `01-metodologia.md` (seção 3); `05-ponta-a-ponta.md` (a navegação no topo); `14-ciclo-de-qa.md` (seções 3 e 10); `modelos/checklist-de-publicacao.md`; `modelos/relatorio-de-qa.md` (seção 5); `README.md`; `regua/quadros.mjs` (novo, cópia da régua do repositório do Atlas) e `regua/README.md`.
- **O kit em volta:** `../README.md` ("Atualizado em"); `../01-roteiro-da-sessao.md` (etapa 7, item 1); `../claude/commands/verificar.md` (item 1); `../ferramentas/portar-regua.mjs` (copia `quadros.mjs`).

**Como foi conferido** (28.10.2026, sem compilar nada e sem abrir o navegador, por instrução da sessão): `node producao/qualidade/regua/quadros.mjs --autoteste` ("a conta dos quadros confere"); a cópia igual, byte a byte, à do repositório do Atlas; `node --check` no `portar-regua.mjs`; cada número dos documentos conferido contra os três relatos.

**O que ficou pendente:**
1. **A base.** Resolvido em 02.11.2026 (seção 10).
2. **O porte da régua dos quadros** num site feito pela base: o gatilho do menu foi conferido em 02.11.2026 (seção 10); o da figura, A CONFIRMAR no primeiro site (`../qualidade/02-regua.md`, seção 12).
3. **Saiu do kit em 03.11.2026** (é do site do Atlas): `atlas--pendencias-do-site.md`, no repositório do site.
4. **O aparelho real e o Safari:** nenhuma medida da régua dos quadros num celular de verdade.
5. **Saiu do kit em 03.11.2026** (é do site do Atlas): `atlas--pendencias-do-site.md`, no repositório do site.
6. **Levar o kit ao repositório principal** e registrar a decisão em `documentacao/atlas--decisoes.md`, como na seção 8, pendência 1.

---

## 10. Registro de 02.11.2026: o que o redesenho do site do Atlas ensinou

**O pedido.** Do aprovador, Matheus Castro Oliveira de Luna Garcia, antes de um commit: "antes de commitar, atualize a pasta de producao com mudancas que valem para novos projetos". Nada do cliente nem do Atlas entrou como regra; os números do site ficam aqui, nos registros e, como o caso que ensinou a técnica, em `15-desempenho.md`, seção 5.18.

**As fontes.** No repositório do Atlas, `registros/atlas/design-v2/` (pasta fora do git): `R10/R10-sintese.md` (2.1), `R10/B-referencias.md` (seção 6, as regras A1 a A15), `R10/C-codigo.md`, `R10/construcao/CONTRATO.md` (seção 4), `R10/construcao/INTEGRACAO.md`, `R10/construcao/CRITICA.md`, `R10/construcao/CONFERENCIA-DECISOES.md`, `R10/construcao/REVISAO-CODIGO.md` e `60fps-navegacao/RELATO-2.md`.

| O que entrou | De onde | Onde no kit |
|---|---|---|
| O nível Apple, condensado (A1 a A15; A6, A10 e A12 ajustados às regras do kit) | `B-referencias.md`, 6; `CRITICA.md`, 1 | `19-o-padrao-atlas.md`, 4.2 e 11 |
| O código como tema, no recipiente único e na mono do sistema | `R10-sintese.md`, 2.7; `C-codigo.md`, 0 a 6; `CONTRATO.md`, D2 | `19-o-padrao-atlas.md`, 4.3; `05-tipografia.md`, 2; `modelos/identidade.md` |
| O colofão gerado de relatório medido | `CONTRATO.md`, S14; `REVISAO-CODIGO.md`, 4 | `19-o-padrao-atlas.md`, 4.3, item 7 |
| As passivas e o mecanismo | `CONTRATO.md`, 4.1 e 4.3 | `09-movimento.md`, 14; `11-anti-ia.md`, M4; `../gestos/app/gestos.css` |
| A cobertura (60% das telas; até duas seguidas paradas; a peça de 28 px não conta) | `CRITICA.md`, M1 e 10; `CONFERENCIA-DECISOES.md`, 1 e 2 | `09-movimento.md`, 14; `conferir-passivas.mjs`, casos (g) e (h) |
| A construção por contrato, com as etapas separadas | `CONTRATO.md`; `INTEGRACAO.md`, 2 e 8 | `19-o-padrao-atlas.md`, 8.8; `01-processo.md`, etapa 6; `../01-roteiro-da-sessao.md`, etapa 6 |
| A data por página, vinda do git, e o que acontece sem `.git` | `CONTRATO.md`, S13; `REVISAO-CODIGO.md`, B3 e 4 | `21-busca-e-ias.md`, 3 |
| `reais()` com espaço fixo | `CONTRATO.md`, S11; `REVISAO-CODIGO.md`, B4 | `10-texto-e-conteudo.md`, 7; o teste de `../base/testes/lib.test.ts` |
| O portal para o que fica preso à tela | `RELATO-2.md`, 11.2 | `15-desempenho.md`, 5.15; `13-tecnologia-e-estrutura.md`, 3.7; `../04-construcao.md`, 4 |
| O componente comum que muda atinge as demos | `REVISAO-CODIGO.md`, A1 e A2 | `../qualidade/07-regressao-visual.md`, 1 |
| A navegação pesa pelo commit, e o que aliviou; as travas de compositor | `INTEGRACAO.md`, 4 e 8.1 | `15-desempenho.md`, 5.18 |
| O agente que devolve saída estruturada não espera em segundo plano | A construção desta sessão, pelo pedido de 02.11.2026 (sem relato escrito) | `../01-roteiro-da-sessao.md`, seção 6 |
| Os falsos positivos do detector; `npm run anti-ia` sem alvo | `CRITICA.md`, 6 e 9; `INTEGRACAO.md`, 6 | `../qualidade/15-revisao-do-impeccable.md`, 7 |

**As medidas do site de origem, que motivaram as regras** (01.11.2026): 20 de 56 telas com passiva a 1440 px e 17 de 63 a 390 px, depois 32 de 121 (26%) noutra varredura; Nielsen 22/32 e auditoria 13/20; 48 de 74 rotas de demo mudadas por peça comum; na navegação no celular 4×, 1 de 7 páginas aprova, e nenhuma passa de 4 batidas depois dos cortes.

**As ferramentas.**
- `../qualidade/regua/conferir-passivas.mjs`: vem da conferência escrita na construção do redesenho, que não ficou em `ferramentas/regua/` do site (a única cópia é esta), com as páginas do Atlas retiradas (a lista agora é obrigatória) e a cobertura acrescentada, medida na peça que anima. O `portar-regua` a leva a cada site.
- `../ferramentas/conferir-pausa.mjs`: o botão pelo nome, e não o primeiro `aria-pressed`, com `--autoteste`.
- `../qualidade/regua/quadros.mjs`: o comentário que citava a `TransicaoDePagina` e o gatilho do menu da base em `botaoDoMenu`. **Difere nessas duas linhas da cópia do repositório do Atlas.**

**A base** (`../base/`): saíram `components/transicao-de-pagina.tsx`, o `CabecalhoFixo` e as regras `::view-transition` de `app/globals.css`. Entraram `components/ilhas/entrada-da-pagina.tsx` e `components/ilhas/ao-topo.tsx`, portados do site do Atlas sem nada dele. Saíram também do git os dez PNG `10-00` a `10-09` da raiz da base, iguais entre si e sem nenhuma citação, e o `AGENTS.md` vazio, que o `novo-site` passou a criar (`13-tecnologia-e-estrutura.md`, seção 2).

**Como foi conferido** (02.11.2026; Apple M2, Chrome instalado), numa cópia da base compilada, sem editar a cópia:
- `tsc` sem erro; `npm test`, 11 de 11; `npm run build` e o `postbuild` sem erro;
- no navegador, a 1440 e a 390 px: de uma página rolada, cada chegada lida quadro a quadro, a ida, o voltar, o avançar e a ida seguinte em y 0, e a recarga em y 0; a entrada só na ida; `/#indice` no destino, sem a entrada; nenhum erro no console; nenhuma View Transition iniciada; 0 `view-transition` na folha. O mesmo roteiro contra o site do Atlas deu o mesmo resultado nas chegadas e na entrada;
- a régua dos quadros, navegação, mediana de 3: na mesa, `/` e `/servicos`; no celular 4×, as duas pelo menu, com o seletor ajustado numa cópia da régua: 100% em dia, pior de 1 batida. Uma sessão só, com outro Chrome aberto na máquina e carga de 2,4 a 3,3: a porta pede duas;
- `conferir-passivas.mjs --autoteste`, treze casos; `conferir-pausa.mjs --autoteste`, cinco casos; `quadros.mjs --autoteste`; `node --check` no `portar-regua.mjs`;
- depois da conferência independente do diff, numa cópia gerada pelo `novo-site`, com o `AGENTS.md` vazio, a ilha, o `ShimmerText` e duas passivas: `tsc` e o build sem erro; `conferir-passivas` e `conferir-pausa` aprovam, e duas peças de 10 px em seções de 5.000 px reprovam (0 de 13 telas); a ilha só liga o que entra depois de a rolagem parar 200 ms; o menu da base se mede sem ajuste, em `/servicos`, no celular 4×, numa sessão.

**O que ficou pendente:**
1. **O roteiro de medida do nível Apple** **Resolvido em 03.11.2026** (seção 14): o nível Apple saiu do kit; o dos sites de cliente é o dos premiados (`19-o-padrao-atlas.md`, seção 4.2). Antes: (`medirTela`, em `R10/scripts/medir-referencias.mjs`) não está no kit. As faixas da seção 4.2 de `19-o-padrao-atlas.md` se conferem à mão ou pelo crítico.
2. **Saiu do kit em 03.11.2026** (é do site do Atlas): `atlas--pendencias-do-site.md`, no repositório do site.
3. **A base antes da troca** não foi medida: "todo site novo reprova" vem das demos, e não de uma medida na base. O ganho sobre a versão anterior fica sem número.
4. **A entrada e o rodapé:** **Resolvido em 03.11.2026** (seção 14): não se sobrepõem: o rodapé fica 96 px abaixo, e a entrada desloca 60 px; a regra está em `../base/app/globals.css`. Antes: o rodapé da base fica no layout, fora da caixa. Em página curta, a página nova passa sobre ele nos 400 ms da entrada [I]; não se viu nem se mediu.
5. **Registrar a mudança em `documentacao/atlas--decisoes.md`,** no repositório principal (a pasta não existe nesta cópia), e **as demos e as referências** continuam com o `<ViewTransition>`.
6. **As passivas em todo plano.** **Resolvido em 03.11.2026** (seção 14): em todo plano, só onde o objeto as pede, sem cota. Antes: O kit segue `19-o-padrao-atlas.md`, seção 9, e tirou o ambiente dos "fora do plano" de `03-planos.md`, seções 3.8 e 4.8, que vinham de antes da decisão de 09.10.2026. Levar as passivas ao Essencial e ao Profissional muda o que esses planos entregam: pede a confirmação do aprovador.
7. **`conferir-passivas` não mede** **Resolvido em 03.11.2026** (seção 14): o limite de 10 s fica como está, conferido pelo crítico de fora. Antes: o mecanismo diferente nem o limite de 10 s (`09-movimento.md`, seção 14): ficam com o crítico de fora.

## 11. Registro de 03.11.2026: os ajustes depois do R10

**A origem.** Os ajustes de 02 e 03.11.2026 no site do Atlas (commit `2029e99`), levados ao kit antes do commit e do push da rodada. Entrou o que vale para novos projetos; nada do gosto do Atlas entrou como regra.

**As fontes.** O código do site do Atlas no commit `2029e99` e a mensagem dele: `components/ilhas/cabecalho-retratil.tsx`, `app/vidro.css`, `components/ilhas/controle-do-movimento.tsx`, `app/paginas/duvidas.css`, `o-trabalho.css`, `para-quem.css`, `orcamento.css` e `planos.css`, `components/secoes/rodape.tsx` e `conteudo/` (`duvidas.ts`, `contato.ts`, `paginas/inicio.ts`, `paginas/planos.ts`, `paginas/para-quem.ts`). O ponto cego do pé da tela e a injeção de CSS vêm dos roteiros de medida da sessão, fora do repositório; dos ~84 px, o comentário de `aVista` é o registro.

| O que entrou | De onde | Onde no kit |
|---|---|---|
| O vidro sai enquanto a página rola: o atributo no `<header>`, o `scrollend` com 400 ms, a tinta densa sem transição | `cabecalho-retratil.tsx`; `vidro.css`, "rolando" e "vidro"; a mensagem do commit (−60% e −77% de GPU) | `15-desempenho.md`, 5.19 e 7; `06-cor-forma-e-superficie.md`, 10 |
| Nada preso com animação ligada à rolagem; o que fica preso sem animação | `para-quem.css`, "a leitura"; `orcamento.css`, `.orc-conta`; `planos.css`, `.vd-tabela-chave` | `09-movimento.md`, 5, item 7 |
| O objeto com trajetória assenta e se apaga; dois vaivéns de períodos primos; a rampa do `conic-gradient` dos dois lados | `duvidas.css`, `du-busca` e `.vd-momento-1`; `o-trabalho.css`, P23 | `09-movimento.md`, 14, "O acabamento" |
| A passiva só começa à vista | `controle-do-movimento.tsx`, `aVista` | `09-movimento.md`, 14, "O mecanismo" |
| O pé da tela, ponto cego da régua dos quadros; a injeção de CSS antes da carga | O comentário de `aVista`; os roteiros da sessão | `../qualidade/08-desempenho.md`, 11, itens 6 e 8; `../qualidade/02-regua.md`, 12 |
| O texto para o cliente, sem bastidores; o termo pelo que faz; a palavra do que se mede; o "você" no Atlas | `conteudo/` | `10-texto-e-conteudo.md`, 1, 4 e 13 |
| O código como tema, retirado do site do Atlas | A mensagem do commit; `rodape.tsx` | `19-o-padrao-atlas.md`, 4.3 |

**O que não entrou.** O fundo frio, os cartões brancos, a agenda de `/orcamento` e o azul de `/o-atlas`: são do Atlas. A medida de "34 para 58 quadros por segundo numa GPU fraca" não está no código nem no commit; o kit cita a do código (de 25–27% para 69–80% das batidas em dia).

**O que ficou pendente:**
1. **A ilha de `../gestos/`** **Resolvido em 03.11.2026** (seção 14): a ilha faz a conta do `aVista`, com `threshold: [0, 0.5]`. Antes: não tem a conta de `aVista` nem o limiar de 0,5 (`09-movimento.md`, seção 14): a cópia se atualiza no próximo porte, com a medida.
2. **A base** não tem vidro nem o limitante da rolagem: o site que puser vidro sob a página o acrescenta (`15-desempenho.md`, seção 5.19).
3. **O ponto cego do pé da tela** foi visto só no perfil de celular da régua (390 × 844, densidade 3). A régua não o desconta: a leitura é a do item 8 de `../qualidade/08-desempenho.md`, seção 11.
4. **Registrar a rodada em `documentacao/atlas--decisoes.md`,** no repositório principal (a pasta não existe nesta cópia).

## 12. Registro de 03.11.2026: o MCP do Figma obrigatório

**A origem.** Pedido do usuário de 03.11.2026: "adicione o mcp do figma como obrigatorio". Até então, o Figma era opcional, pelo conector da conta, para o cliente que trouxesse desenho (`../claude/ferramental.md`, seção 4).

| O que entrou | Onde no kit |
|---|---|
| O MCP remoto do Figma no conjunto de todo projeto, com o comando | `../claude/ferramental.md`, seção 2 |
| A conferência do ambiente o acusa como bloqueio | `../ferramentas/conferir-ambiente.mjs` |
| O aviso no comando de entrada: o bloqueio e a autenticação | `../claude/novo-site.md`, "Antes de tudo" |

**A fonte.** O comando e o endereço vêm da documentação do Figma (https://developers.figma.com/docs/figma-mcp-server/remote-server-installation), consultada em 03.11.2026 só por busca; a página não foi aberta.

**O que ficou pendente:**
1. **Em que etapa o Figma entra:** resolvido em 03.11.2026 (seção 14): no design inicial da etapa 4, "para que você entenda como está o design", e nas portas da etapa 6.
2. **Registrar em `documentacao/atlas--decisoes.md`,** no repositório principal, e levar a mudança ao repositório do Atlas: **Resolvido em 03.11.2026** (seção 14): o kit em `/Users/Matheus/atlas-digital/producao/` e as decisões em `documentacao/atlas--decisoes.md` de `/Volumes/Matheus/Projetos/atlas-digital/`, sem commit. esta cópia do kit está num projeto, e a regra da pasta manda corrigir o kit lá.

## 13. Registro de 03.11.2026: as habilidades, o formulário 2.0 e o prompt-modelo

**A origem.** Pedido do usuário de 03.11.2026: "baixe as habilidades recomendadas e adicione isso ao kit, nesse projeto você tem essa permissão", a comparação do kit com o formulário de briefing que estava na raiz (`atlas-formulario-briefing.html`, v1.0) e "um prompt-modelo que foque em engenharia e design e o kit de produção". A permissão vale para esta cópia do kit; a regra da pasta ("Não edite esta pasta por cliente") cede a ela, e a mudança deve chegar ao repositório do Atlas.

| O que entrou | De onde | Onde no kit |
|---|---|---|
| Quatro habilidades de Emil Kowalski (animation-performance, break-ui, review-animations, prototype), cópia fiel com a nota de precedência do kit e a licença | `emilkowalski/skill`, commit `f1090be` (02.11.2026), MIT, lido inteiro em 03.11.2026 | `claude/skills/`; `claude/ferramental.md`, seção 2.1; o `novo-site` as copia para `.claude/skills/` |
| As outras doze de Kowalski e a taste-skill, fora, com o motivo | Os dois repositórios, lidos em 03.11.2026 (`Leonxlnx/taste-skill`, commit `12af471`) | `claude/ferramental.md`, seção 5 |
| O formulário de briefing 2.0, impresso, com a numeração e os campos ● do modelo | O v1.0 da raiz, comparado com `02-briefing.md` e `modelos/briefing.md` | `esteira/modelos/formulario-de-briefing.html`; `02-briefing.md`, "A folha impressa" |
| No modelo e na conferência: a transcrição sem dedução, a duração por plano, o WhatsApp salvo, o rascunho que não é o site publicado, o aviso da coleta, a autorização do tutor, a Presença sem titular | As lacunas achadas na comparação | `esteira/modelos/briefing.md`; `02-briefing.md`, seções 2 e 3 |
| O prompt-modelo de abertura e o estudo que o fundamenta | As fontes da Anthropic de 03.11.2026 (`claude/estudo-de-prompts.md`, seção 1) | `claude/prompt-modelo.md`; `claude/estudo-de-prompts.md` |

**O que o v1.0 tinha de errado contra o kit:** pedia depoimento (retirado em 08.10.2026), e-mail profissional e o módulo "Conteúdo" (de vigência indefinida), "mínimo de seis fotos" (hoje, três por categoria do nicho) e 20 a 30 minutos (hoje, por plano); oferecia a Presença sem titular; e afirmava, sem fonte, que "prova social é o que mais converte". **Faltava:** a razão social e o CNPJ, o modelo de negócio, o que o negócio não faz, o prazo de resposta, o prédio, o registro do conselho e o responsável técnico, a direção de arte (os opostos e as cinco referências), a autorização de imagem escrita, a hora do material completo, os campos de plano, de módulo e de nicho, e a autorização do estudo de caso.

**O que ficou pendente:**
1. **O formulário v1.0 na raiz deste projeto** foi apagado a pedido do usuário (03.11.2026), e o `novo-site` volta a reconhecer o projeto vazio (`ferramentas/novo-site.mjs`, `DO_COMECO`). A cópia do repositório do Atlas (`comercial/atlas--formulario-briefing.html`) segue lá até a troca pelo 2.0.
2. **A taste-skill como leitura** **Resolvido em 03.11.2026** (seção 14): os arquivos não se copiam; K7 e K8 entraram em `11-anti-ia.md`. Antes: (`references/tells.md`, `critique.md`): não foi copiada ao kit; fica a indicação em `claude/ferramental.md`, seção 5.
3. **Levar ao repositório do Atlas** e registrar em `documentacao/atlas--decisoes.md`, com as seções 12 e 13 deste arquivo. **Resolvido em 03.11.2026** (seção 14): o kit em `/Users/Matheus/atlas-digital/producao/` e as decisões em `documentacao/atlas--decisoes.md` de `/Volumes/Matheus/Projetos/atlas-digital/`, sem commit.

## 14. Registro de 03.11.2026, à noite: as pendências decididas pelo usuário

**A origem.** As respostas do usuário à lista de pendências de 03.11.2026 (A1 a A4, B1 a B6, C1 a C5), com a regra: o que é só do site do Atlas sai do kit.

| Pendência | A decisão | O que mudou |
|---|---|---|
| A1, o Figma | "principalmente no design inicial dentro dos projetos, para que você entenda como está o design"; obrigatório em todo tipo de design | `../01-roteiro-da-sessao.md`, etapa 4, passo 6, e as portas da mesa e do celular da etapa 6; `../claude/commands/direcao-de-arte.md`; `modelos/identidade.md` ("Arquivo do Figma"); `../claude/prompt-modelo.md` |
| A2, o repositório principal | "Faça isso, ao repositório principal" | O kit levado a `/Users/Matheus/atlas-digital/producao/`, onde ele é mantido no git; o registro em `documentacao/atlas--decisoes.md` de `/Volumes/Matheus/Projetos/atlas-digital/`, a única cópia com essa pasta. Nenhum commit |
| A3, o formulário | "Troque para o novo formulário" | `comercial/atlas--formulario-briefing.html` do repositório principal trocado pelo 2.0 |
| A4, a taste-skill | Usar só se não houver conflito futuro | Os arquivos não se copiam; K7 e K8 em `11-anti-ia.md` |
| B1, a base compilada | "Caso sejam preferíveis para uma melhor produção" | Build e export sem erro, numa cópia do exemplo; no exemplo, o `sitemap.xml` vazio e o `llms.txt` com o nome e o selo, como manda a base; no modo cliente, 5 páginas no mapa e o `llms.txt` inteiro |
| B2, a cópia decorativa | "Retire, pois estamos focados no CSS, no caso Tailwind CSS" | `../gestos/components/ui/spell/`: a onda, a tarja e o brilho levam a cópia por `before:content-[attr(data-texto)]`; no texto que o robô lê, cada palavra uma vez (conferido no build) |
| B3, o `aVista` | — (não pedia login) | `../gestos/components/ilhas/controle-do-movimento.tsx` |
| B4, o nível | "seria nível os sites como o Awwwards, o Apple seria apenas para o site principal do Atlas" | `19-o-padrao-atlas.md`, seção 4.2, reescrita; o texto do nível Apple segue no histórico do git de `/Users/Matheus/atlas-digital` (commit `77c31f0` e anteriores) |
| B5, a entrada e o rodapé | "Analise e veja se é necessária" | Não é: 96 px de margem contra 60 px de deslocamento; a regra, no comentário de `../base/app/globals.css` |
| B6, os 10 s | "Mantenha o limite para 10s" | `09-movimento.md`, seção 14, item 5, sem mudança |
| C1, as passivas | "analise se isso é bom no geral ou é IA Slop, caso seja, retire" | A passiva do objeto fica; a cota sai (`09-movimento.md`, seção 14; `../qualidade/regua/conferir-passivas.mjs`: a cobertura vira aviso, e o autoteste confere os treze casos) |
| C2, a busca | "Sim, tudo no nome do cliente" | `21-busca-e-ias.md`, seção 9, item 2; `10-texto-e-conteudo.md`, seção 10 |
| C3 a C5, o site do Atlas | "pode retirar da pasta produção" | As pendências do site saíram desta seção 5 e das seções 9 e 10, para `atlas--pendencias-do-site.md`, na raiz de `/Users/Matheus/atlas-digital` |

**Um defeito achado na conferência.** O site recém-criado pelo `novo-site` reprovava 2 dos 11 testes de unidade, também com o kit anterior a esta rodada (conferido no `HEAD` de `/Users/Matheus/atlas-digital`): `testes/lib.test.ts` esperava o domínio e o nome de fábrica (`exemplo.com.br`), e o `novo-site` grava os da ordem. Os testes passaram a ler `conteudo/negocio.ts`; a base e o site novo aprovam 11 de 11.

**O que não saiu, e por quê.** As pendências da sociedade (o contador, o CNPJ, o advogado, a Presença, a Hostinger) seguem na seção 5: travam a publicação de todo site de cliente. Também ficam no kit as citações do site do Atlas como origem de uma regra ("medido no site do Atlas") e `../referencias/atlas/`, o código de estudo: são a prova das regras, e não pendências.


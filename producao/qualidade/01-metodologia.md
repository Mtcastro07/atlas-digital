# 01 · Metodologia

> **Para que serve.** A estratégia de testes do Atlas: o que testar primeiro, em que camada, como transformar uma verificação em porta sem criar alarme falso, como explorar, como saber que algo está errado, como classificar um defeito e o que fazer com ele do achado ao registro.
>
> **Quando ler.** Antes de escrever o primeiro teste de um projeto, e sempre que uma verificação começar a acusar coisas que ninguém consegue reproduzir.
>
> **Depende de.** `00-entender-o-projeto.md` (o mapa e a matriz de risco).

---

## 1. Testar por risco

**Regra.** A ordem e a profundidade dos testes saem da matriz de risco (`00-entender-o-projeto.md`, seção 8): primeiro os itens de nota 9, depois os de 6, depois o resto.

**Objetivo.** Gastar o tempo de teste onde a falha custa mais. Um site do Atlas tem riscos muito desiguais: um contraste de 4,49:1 num número decorativo e um preço num site de odontologia são ambos "defeitos", mas só o segundo pode render processo ético para o cliente.

**Como fazer.**
1. Monte a matriz.
2. Para cada item de nota 6 ou 9, escreva o teste na camada mais barata que o pega (seção 2).
3. Os de nota 3 ou 4 ficam com a régua e com a exploração.

**Como conferir.** O relatório de QA (`modelos/relatorio-de-qa.md`) lista os itens de nota 6 e 9, cada um com o teste e o resultado.

---

## 2. As camadas: do mais barato e determinístico ao mais caro

**Regra.** Cada defeito é pego na camada mais barata capaz de pegá-lo, e a ordem de execução é sempre esta:

| Ordem | Camada | Tempo | Determinismo | Pega | Documento |
|---|---|---|---|---|---|
| 1 | **Estática** (tipos, lint, CSS compilado) | Segundos | Total | Erro de tipo, vínculo interno errado, regra da casa violada, propriedade proibida no CSS | `03` |
| 2 | **Unidade** | Segundos | Total | Conta, data, codificação, invariante de preço | `04` |
| 3 | **Ponta a ponta** (com a régua) | Minutos | Alto, com relógio, fuso e movimento fixos | Fluxo quebrado, erro de console, política violada, geometria, degradação | `02`, `05` |
| 4 | **Acessibilidade** | Minutos (automática) e ~1 h (manual) | Alto (automática) | WCAG 2.2 AA automatizável, teclado, leitor de tela | `06` |
| 5 | **Regressão visual** | Minutos | Médio: depende do contêiner fixo | Mudança de tela não pedida | `07` |
| 6 | **Desempenho** | Minutos a dezenas | Bytes: alto. Tempo: baixo (varia de rodada para rodada) | Peso, LCP, TBT, CLS | `08` |

**Objetivo.**
- **Velocidade:** o defeito pego em segundos não chega a custar minutos. Um erro de tipo pego pelo `tsc` não precisa de navegador.
- **Ordem de falha:** se a camada barata falha, a cara nem roda. É o princípio de falhar cedo.

**Como fazer.** Na integração contínua, os trabalhos seguem a ordem (`13-integracao-continua.md`). No trabalho local, o Claude Code roda a estática a cada edição e a régua antes de dizer "pronto" (`14-ciclo-de-qa.md`).

**Como conferir.** Nenhum defeito que a estática pegaria aparece pela primeira vez num teste de ponta a ponta. Se aparecer, falta uma regra de lint (registre-a).

---

## 3. Porta dura só com sinal determinístico

**Regra.** Uma verificação só **bloqueia** (vira porta) se o sinal dela for determinístico: a mesma entrada dá sempre o mesmo resultado.
- **Tempo** (LCP, TBT, INP) não é determinístico. Acompanha-se como tendência, ou compara-se de forma intercalada: a base e a mudança medidas alternadamente, na mesma máquina e na mesma sessão.
- **O que bloqueia no tempo:** nos sites de marca, a barreira do travamento no aparelho médio, alta o bastante para não reprovar por sorte (`../esteira/15-desempenho.md`, seção 2.1; decisão de Gabriel Ribeiro Ota Yida, 08.10.2026); no site do Atlas, a regressão relativa acima do ruído medido.
- **A exceção, desde 28.10.2026: o ritmo dos quadros,** em todo site (`../esteira/15-desempenho.md`, seção 2.4). O usuário pediu os 60 quadros por segundo como característica de todo site, e a porta de 3 batidas fica a uma batida do ruído entre sessões. Por isso ela se lê em duas sessões separadas, contra o controle, com a causa provada por retirada (`08-desempenho.md`, seção 11).

**Objetivo.** Uma porta que falha por acaso é uma porta que se aprende a ignorar. Martin Fowler sobre testes não determinísticos: "Non-deterministic tests have two problems, firstly they are useless, secondly they are a virulent infection that can completely ruin your entire test suite" (https://martinfowler.com/articles/nonDeterminism.html) [V]. O projeto já mediu essa variação:
- **TBT da capa com CPU 20×:** de 357 a 1.089 ms em 7 execuções da mesma versão (mediana 716 ms; especificação do site, seção 7). Um teto absoluto de 300 ms reprovaria ou aprovaria conforme a sorte da rodada.
- **CLS de 0,1:** apareceu em uma execução de sete, nas duas versões comparadas, por causa ainda a investigar.

**Como fazer.**
- **Bytes** (script, fontes, peso), contagem de pedidos externos, presença de marcações, contraste medido sob movimento reduzido: **porta dura**.
- **Tempo:**
  - mediana de 5 a 7 execuções com CPU 20×, sempre em número ímpar (3 no perfil padrão), com mínimo e máximo (`../esteira/15-desempenho.md`, seção 4.3);
  - base e mudança intercaladas, alternando quem vai primeiro;
  - na mesma máquina, com o navegador do Playwright fechado.

  A piora é real quando o mínimo da versão nova fica acima da mediana da base, ou a mediana piora além do intervalo da base (`08-desempenho.md`, seção 4).
- **Tudo fixo nas portas:** o contêiner, o relógio, o fuso, o idioma, o movimento reduzido, as máscaras e nenhuma rede externa (seção 11).
- **Antes de tornar porta qualquer verificação nova:** dez rodadas na `main` sem mudança e nenhum alarme. Antes disso, ela é aviso.
- **Nova tentativa só para capturar o rastro.** Teste que passa só na segunda tentativa reprova (`05-ponta-a-ponta.md`, seção 2) e vai para a quarentena por **no máximo uma semana**. De noite, rodar cada teste três vezes (`--repeat-each=3`) revela a instabilidade sem travar a publicação (`13-integracao-continua.md`).
- **O que já existe** (achados de lint e de acessibilidade na primeira adoção) recebe uma impressão digital, e só o novo falha.
- **Cada porta tem dono e comando de correção.** Alarme falso rebaixa a porta a aviso até ela ser corrigida. Ninguém roda de novo "até passar".
- **A porta é genérica:** colhe tudo o que muda no bloco que reage — transformação **e** máscara, cor, opacidade —, nas larguras de celular **e** de mesa. "Porta que conhece o nome do que testa só encontra o que já se esperava": nos demos de setembro, ela falhou duas vezes, colhendo só `transform` quando a reação era por máscara, e medindo só o celular quando o defeito estava na mesa (ESTEIRA v2.1, bloco 8 e Anexo A, no repositório do Atlas).

**Como conferir.** Cada porta tem anotado: o sinal, o ruído medido, o número de rodadas sem alarme falso, o dono e o comando de correção.

---

## 4. Falha e aviso

**Regra.** Toda verificação é **falha** (defeito: impede a passagem) ou **aviso** (medida para olhar: quem revisa decide e registra). O que é heurística — composição, paridade, registro verbal, "conferir à mão" — começa e fica como aviso.

**Objetivo.** "Uma porta que acusa o que não é defeito ensina a ignorar portas" (lição registrada na construção dos doze demos, em setembro de 2026, e de novo na calibração da régua, em 07.10.2026). Aviso também é informação. A diferença é que aviso não trava o trabalho; exige uma decisão escrita.

**Exemplos do projeto:**

| Verificação | Classe | Por quê |
|---|---|---|
| Rolagem lateral em qualquer largura | Falha | Sinal binário e sem exceção legítima |
| Contraste abaixo de 4,5:1 medido nos pixels do texto | Falha | Medido, com as exceções conhecidas tratadas (seção 5 de `02-regua.md`) |
| "Nenhuma ação até 60% da primeira tela do celular" | Aviso | As aberturas das páginas internas do Atlas são informativas: a ação está no menu, por decisão de desenho |
| "Mediana de 16 palavras por período" em O Atlas | Aviso | O registro é julgamento; a régua só aponta |
| Texto com cópia decorativa por cima (os gestos do Spell UI) | Aviso ("conferir à mão") | A medição automática não sabe qual das duas camadas o olho vê |

**Como conferir.** Todo aviso de um relatório de QA tem uma decisão ao lado: aceito (com motivo), corrigido ou levado aos sócios.

---

## 5. Antes de acusar defeito, verificar o instrumento

**Regra.** Quando uma verificação acusa algo surpreendente, a primeira hipótese é que o **instrumento** errou. Reproduza a situação à mão, num navegador de verdade, e por um segundo instrumento, antes de mexer no site.

**Objetivo.** Medição mal feita mente com confiança. Corrigir o site por causa de um instrumento quebrado introduz defeito onde não havia, e ensina a desconfiar das medições boas.

**Os casos do projeto** (detalhes em `02-regua.md` e `12-ataque-a-falhas.md`):

| O instrumento acusou | O que era de verdade |
|---|---|
| 207 componentes invisíveis no celular (setembro de 2026) | A sonda rolava 600 px a cada 120 ms, mais rápido que qualquer polegar: as entradas não tinham tempo de acontecer |
| Vínculos do cabeçalho com contraste de 1,21:1 (07.10) | O Tailwind 4 calcula as cores em `oklab`, e a régua lia os números como RGB |
| Nenhum texto medido na barbearia, 0 de 74 (07.10) | O canvas do WebGL, fixo e atrás de tudo, era tratado como algo que cobria o texto |
| Título com 2,63:1 nas aberturas (07.10) | A caixa da linha, com entrelinha 1, invadia a linha vizinha (e a tarja dela) |
| O h1 de Planos sumido nas capturas de página inteira (07.10) | A captura de página inteira redimensiona a janela, e a animação de entrada reinicia; no navegador, depois de rolar, o título estava lá |
| O TBT dobrou (01 e 03.10) | O navegador do Playwright estava aberto na mesma página durante a medição |
| A inclinação dos celulares respondia ao contrário (03.10) | O mouse físico, sobre a janela do navegador com tela, mexia no teste |
| O CSS de comparação tinha o dobro do tamanho (03.10) | A base foi compilada dentro do repositório, e o Tailwind leu o `node_modules` |
| O script inicial com 191 KB, e "180 a 195 KB por página" na análise inicial (03.10) | A conta incluiu o polyfill `nomodule`, que o Chrome não baixa: eram 152,5 KB. O Lighthouse mostra o transferido (158,9 a 160,6 KB), outra medida (`../esteira/15-desempenho.md`, seção 3.2) |

**Como fazer.**
1. **Reproduza** com o mínimo: uma página, uma largura, um navegador.
2. **Leia o valor bruto**, não o veredito: a cor como o `getComputedStyle` devolve, o tamanho do arquivo, o tempo de cada execução.
3. **Meça por outro caminho:** o DevTools, uma captura e um conta-gotas, o Lighthouse e a régua.
4. Se o instrumento errou, **corrija o instrumento primeiro** e registre a correção (README da régua, seção de calibração).

**Como conferir.** Todo relatório de defeito tem o campo "reproduzido à mão: sim/não" (`modelos/relatorio-de-defeito.md`).

**O mesmo vale para o que o próprio testador afirma.** Depois de uma análise longa, os principais apontamentos se conferem direto nos arquivos antes de irem para o relatório. Na revisão do primeiro relatório do Atlas (07.10.2026), quatro afirmações caíram ou mudaram:
1. a ordem comercial dos nichos não estava perdida: estava na lista de 29.08, e foi recuperada e conferida com dados (`../esteira/nichos/README.md`, seção 4);
2. o `cn` do `sheet.tsx` não era defeito: é exceção deliberada, documentada no próprio arquivo (`../esteira/13-tecnologia-e-estrutura.md`, seção 3.4);
3. o antes e depois odontológico não é simplesmente vedado: a CFO-196/2019 o permite com termo de consentimento, e o Código de Ética de 2012 o vedava [DIV] (`../esteira/nichos/odontologia.md`);
4. as verificações mal calibradas da régua eram quatro, e não três (`02-regua.md`, seção 6).

**Objetivo.** O erro de quem relata custa tanto quanto o do instrumento: uma pendência falsa leva alguém a "consertar" o que estava certo.

---

## 6. Exploração com cartas

**Regra.** Além dos testes roteirizados, cada projeto recebe sessões de **exploração** com tempo marcado, guiadas por uma carta: um objetivo escrito antes de começar.

**Objetivo.** Os testes roteirizados acham o que alguém previu. A exploração acha o que ninguém previu. Estes dois apareceram na revisão de 03.10.2026, nas interações conferidas à mão, e foram corrigidos em 07.10. Nenhuma verificação automática da época os procurava:
- o "Agora" do depósito, que aparecia no sábado sobre a linha dos dias úteis;
- o globo que não girava nas páginas abertas pela navegação interna.

A carta impede que a exploração vire passeio.

**Como fazer.**
- **A carta**, numa frase (formato de Elisabeth Hendrickson, *Explore It!*, 2013 [FU]): *"Explorar <alvo> com <recursos> para descobrir <informação>"*. Exemplo: "Explorar a página de valores da nutrição com as larguras de 320 a 414 px e as palavras mais longas do conteúdo para descobrir o que transborda."
- **A sessão:** de 45 a 90 minutos, sem interrupção. É o gerenciamento por sessão de James e Jonathan Bach, 2000 [FU]. Anote durante: o que tentou, o que viu, as perguntas, os defeitos.
- **O fechamento:** cinco minutos para separar defeitos (vão para o relatório de defeito), perguntas (vão para quem decide) e novas cartas.
- **De onde vêm as cartas:**
  - os itens de nota 6 e 9 da matriz de risco;
  - as categorias de `12-ataque-a-falhas.md`;
  - as funcionalidades novas;
  - o que mudou desde a última versão.

O modelo está em `modelos/carta-de-exploracao.md`.

**Como conferir.** Cada sessão gera uma folha preenchida, mesmo sem defeito achado ("nenhum defeito" também é informação).

---

## 7. Oráculos: como saber que algo está errado

**Regra.** Toda verificação tem um **oráculo**, a fonte que diz qual seria o resultado certo. Sem oráculo, não há defeito, há opinião.

**Objetivo.** No Atlas, quase nada é "certo" em abstrato. O certo é o que a norma, a ata, o briefing, a identidade ou o padrão de design dizem. Nomear o oráculo resolve a discussão e diz quem decide.

**Os oráculos do projeto, em ordem de autoridade:**

| Oráculo | Exemplo de uso | Quem decide em caso de dúvida |
|---|---|---|
| **A norma do conselho** e a lei (LGPD, CDC, LBI) | Odontologia não pode mostrar preço (Código de Ética, art. 44) | Advogado |
| **A ata e os documentos da sociedade** | O site não declara CNPJ nem promete nota fiscal enquanto não existirem (ata v3.0, III.2) | Os três sócios |
| **O briefing** | O horário publicado é o que o cliente informou | O cliente, pelo sócio de vendas |
| **A identidade registrada** | O bronze é o acento; o depósito tem cantos retos por identidade | Quem fez a direção de arte |
| **A esteira** (plano, padrão de design, movimento, desempenho) | Gesto de um degrau acima é defeito de escopo | O sócio de desenvolvimento |
| **A régua e as portas** | Rolagem lateral em 320 px | A própria porta (falha) ou quem revisa (aviso) |
| **A consistência interna** | O mesmo fato com o mesmo número em todas as páginas; o comportamento igual ao da versão anterior | Quem revisa |
| **A expectativa do visitante** (convenção) | Menu no alto, ação visível, o logotipo leva ao início | Quem revisa, com o padrão de design |
| **Os comparáveis** (os premiados do nicho) | A capa de um site premiado de odontologia não tem "eyebrow" sobre o título | Quem faz a direção de arte |

A tabela adapta a heurística de consistência HICCUPPS de Michael Bolton (história, imagem, comparáveis, afirmações, expectativa do usuário, produto, propósito, leis; DevelopSense, 2005) [FU].

**Como conferir.** O campo "oráculo" de todo relatório de defeito está preenchido.

---

## 8. Severidade e prioridade

**Regra.** Todo defeito recebe **severidade** (o tamanho do dano) e **prioridade** (quando corrigir). Elas são independentes: um defeito leve pode ser urgente às vésperas da publicação, e um grave pode esperar se a página ainda não existe para ninguém.

**Severidade:**

| Nível | Definição | Exemplos do projeto |
|---|---|---|
| **S1 · Bloqueante** | Viola norma ou lei, derruba a página, vaza dado, impede o contato, prende o teclado, ou afirma o que não é com risco legal | A âncora `/#%E0` que trocava a página inteira pela tela de erro (03.10); preço num site de odontologia; formulário que coleta sem aviso de privacidade; armadilha de foco |
| **S2 · Grave** | Exclui um grupo de pessoas ou quebra um fluxo principal | Contraste do texto corrido abaixo de 4,5:1; rolagem lateral em 320 px (a carta de valores da nutrição, 07.10); a ação some no celular; sites de exemplo sem marcação de compartilhamento num negócio que vende pelo WhatsApp; `public/` 404 no standalone |
| **S3 · Moderado** | Piora a experiência, com saída | Alvo de toque de 43 px; o "Agora" do depósito no sábado; o globo que não gira depois da navegação interna; o CLS ao rolar |
| **S4 · Leve** | Cosmético, sem efeito no uso | Uma palavra sozinha na última linha de um título; espaço fora da grade de 4 px |

**Prioridade:**

| Nível | Quando corrigir |
|---|---|
| **P1** | Antes da próxima entrega: o rascunho, a rodada ou a publicação. Todo S1 é P1 |
| **P2** | Na rodada seguinte, ou na manutenção do mês |
| **P3** | Quando houver janela; registrado para não se perder |

**Objetivo.** Quem corrige precisa saber o que vem primeiro, e o cliente precisa saber o que foi deixado para depois e por quê.

**Como conferir.** Nenhum S1 aberto na lista de publicação (`14-ciclo-de-qa.md`, seção 5).

---

## 9. O ciclo de um defeito

**Regra.** Todo defeito percorre seis passos, e nenhum é pulado.

1. **Achar** pela régua, por um teste, pela exploração ou pelo cliente.
2. **Reproduzir:**
   - o caminho mínimo, a largura, o navegador, o build (produção, nunca o `next dev`), o horário (para lógica de tempo);
   - **reproduzido à mão: sim ou não** (seção 5).
3. **Isolar a causa.** Hipótese, teste da hipótese, causa confirmada. A causa é o **porquê**, não o onde. Exemplo, o globo: "o efeito procurava os elementos só na carga, com dependências vazias", e não "o globo de O Atlas não gira".
4. **Corrigir na causa,** não no sintoma. E conferir o efeito colateral. Na correção do globo, a primeira versão fazia o globo do cabeçalho girar a cada troca de página; a lembrança do que já estava na tela passou para fora do efeito.
5. **Provar:**
   - o teste ou a régua que acusava passa a passar;
   - um teste de regressão fica, para que o defeito não volte;
   - as páginas vizinhas continuam passando (rodada inteira da régua, não só a página corrigida).
6. **Registrar a regra:** o que aprender para que a classe inteira de defeitos não volte.
   - Entra no documento certo da esteira ou desta pasta.
   - No caso histórico, entra em `12-ataque-a-falhas.md`.
   - No site, entra no comentário do código: o "até 07/10, …" que explica por que o código é como é.

**Objetivo.** Corrigir sem provar deixa o defeito voltar; corrigir sem registrar deixa a classe de defeito voltar noutro site. O registro é o que transforma um defeito num ganho da esteira.

**Como conferir.** O relatório de defeito (`modelos/relatorio-de-defeito.md`) tem os seis campos preenchidos antes de fechar.

---

## 10. O que a automação não pega

**Regra.** Nenhum conjunto de testes automáticos dispensa a leitura humana destes cinco pontos.

| Ponto | Por que a máquina não basta | Como se cobre |
|---|---|---|
| **Acessibilidade real** | Testes automáticos acham cerca de 57% dos problemas de acessibilidade, em volume (Deque, https://www.deque.com/blog/automated-testing-study-identifies-57-percent-of-digital-accessibility-issues) [FU] | Roteiro de teclado e de leitor de tela (`06`, seção 4) |
| **Direção de arte e "cara de IA"** | Uma marca de IA é escolha, não erro; a mesma tarja numa palavra pode ser assinatura num site e marca de IA noutro | Avaliação anti-IA, com decisão registrada (`11`) |
| **O teste do desconhecido** | "O que alguém que não sabe diria que isto é?" Um manômetro passou na inspeção e foi lido como "relógio" | Mostrar a alguém de fora do projeto (`11`, seção 5) |
| **A verdade das afirmações** | A máquina acha o termo; não sabe se "desde 1996" é verdade | Tabela de afirmações e fontes (`00`, seção 7) |
| **O tom e o registro** | A mediana de palavras é um indício; o aforismo em dois tempos ("Não é um site. É uma vitrine.") e o contraste fabricado repetido de seção em seção exigem leitura | Leitura do texto inteiro antes do rascunho (`10`, seção 5) |
| **A primeira impressão do público** | A máquina não sabe o que alguém de fora entende ao ver a primeira tela | Teste de cinco segundos com alguém do público do cliente: mostra-se a primeira tela por cinco segundos e pergunta-se o que o negócio faz, onde fica e qual é a ação [FU]; complementa o teste do desconhecido (`11`, seção 4) |

**Objetivo.** Não confundir "a régua passou" com "o site está bom". A régua prova o piso; o resto é julgamento, e julgamento precisa de dono e de registro.

**Como conferir.** O relatório de QA traz, além dos resultados automáticos, a assinatura de quem fez cada leitura humana.

---

## 11. Regras de ambiente

| Regra | Objetivo |
|---|---|
| **Testar sempre o build de produção** (`npm run build && npm start`, ou o `server.js` standalone), nunca o `next dev` | O `next dev` tem outro script, outro CSS, o indicador de desenvolvimento e o recarregamento ao vivo; mede-se outra coisa |
| **Comparar sempre na mesma máquina e na mesma sessão** | Medições de dias e máquinas diferentes não se comparam (a de 01.10 recompilou a versão de 30.09 para comparar de forma justa) |
| **Fixar relógio, fuso e idioma** (`America/Sao_Paulo`, `pt-BR`) | A lógica de horário, o "Aberto agora" e a Agenda dependem disso |
| **Movimento reduzido nas capturas e no contraste** | Tira o acaso do quadro da animação |
| **Mascarar o que se move por conta própria** (canvas, iframe) | O WebGL desenhado em software varia de execução para execução |
| **Fechar o navegador do Playwright antes de medir tempo** | Aberto, inflava o TBT de ~240 para mais de 600 ms com CPU 20× |
| **No sandbox do Claude Code, rodar o Chrome com o sandbox desligado** | O Chrome não abre dentro do sandbox (memória do projeto do Atlas) |
| **Base de comparação compilada fora do repositório** | Dentro de uma pasta ignorada do repositório, o Tailwind leu o `node_modules` e gerou uma folha duas vezes maior |
| **No Claude Code, o navegador de teste é o do Playwright MCP, num contexto próprio** (`browser_run_code_unsafe` com `page.context().browser().newContext({ viewport, deviceScaleFactor })`) | A página principal do MCP é dividida com os subagentes; num contexto próprio, um teste não mexe no outro. O WebGL funciona nesse Chrome |
| **Scripts longos numa pasta do repositório ignorada pelo git** (no Atlas, `.playwright-mcp/`) | O que vale guardar vira teste (`05-ponta-a-ponta.md`); o resto não suja o histórico |
| **Rolagem por script com `behavior: "instant"`** | Com a rolagem suave no `<html>`, o `scrollBy` comum anima, e a medida sai no meio do caminho |
| **Captura que espera imagem preguiçosa: corrida com 3 s** | Sem o limite, a captura trava na imagem que nunca entra na tela |
| **Teste de ponteiro (hover, inclinação) em navegador sem tela, ou com as mãos fora do mouse** | No Chrome com janela (o do Playwright MCP), o mouse físico de quem está na máquina dispara eventos fracionários e `pointerleave` fora de hora: em 03.10, o teste da inclinação deu resultado invertido. Repita a rodada e desconfie do resultado invertido; nas capturas de hover, fixe o `:hover` pelo DevTools |
| **Padrão de arquivo entre aspas** (`grep -r --include='*.css'`) | Sem aspas, o shell (zsh, fish) tenta expandir o padrão e falha, ou passa outra coisa ao comando: a busca volta vazia e parece prova de ausência |
| **Padrão de busca que começa por "-" vai com `-e`** (`grep -e '-my-2.5'`) | Sem o `-e`, o `grep` lê o padrão como opção |
| **O seletor do que recebe o clique** (no Atlas, `#duvida-2 summary`, e não o `<details>`) | O clique no elemento errado não abre nada, e o teste acusa defeito que não existe |
| **Data pelo relógio da máquina** (`date +%d.%m.%Y`), nunca de memória | Em 03.10, um registro saiu datado de "04/10" quando ainda era 03/10 |

---

## 12. Manter os documentos vivos

**Regra.** Quando a pilha, o método ou o escopo mudam, procuram-se, nos documentos que descrevem o estado anterior, as afirmações que deixaram de ser verdadeiras, e corrigem-se no mesmo dia. A passagem fica no registro de decisões, com a razão. (Para os documentos desta esteira, a regra equivalente é a da verificação recursiva em `../esteira/README.md`, seção 5.)

**Objetivo.** Documento desatualizado engana mais que documento ausente: o próximo leitor, pessoa ou agente, confia nele. Foi o que aconteceu no Atlas depois da migração para o Next.js.

**Os casos do projeto (07.10.2026):**

| Documento | O que estava desatualizado |
|---|---|
| `README.md` da raiz e do `web/` | Falavam em exportação estática, quando o caminho recomendado é o web app Node.js em modo servidor |
| Especificação do site | Dizia "duas folhas" de estilo e não trazia a régua |
| Contexto dos nichos | Apontava o repositório errado e a estrutura de três versões por nicho |
| Registro de decisões | Atualizado na mesma passagem |
| Conformidade | Ganhou a seção 10 (formulário, relatório de acessos e Agenda) |

**Como fazer.**
1. Liste as afirmações que a mudança torna falsas (por exemplo, "exportação estática", "HTML de arquivo único", "três versões por nicho").
2. Procure cada uma nos documentos, com o padrão entre aspas (seção 11), e corrija ou marque como histórico.
3. Registre a passagem no `decisoes.md`.

**Como conferir.** Nenhum documento vigente descreve o estado anterior sem dizer que é histórico.

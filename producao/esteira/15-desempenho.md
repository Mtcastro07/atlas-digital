# 15 · Desempenho

> **Para que serve.** Fixar quanto um site do Atlas pode pesar e demorar no aparelho de quem o visita, como se mede sem se enganar, que técnicas cumprem os limites (cada uma com o caso real que a ensinou) e o que ainda está acima da meta.
>
> **Quando ler.** Antes de construir. Antes de acrescentar uma biblioteca, uma fonte, uma imagem grande, um movimento contínuo ou 3D. Sempre que a régua acusar o bloco 5.
>
> **Depende de.** `00-principios.md` (seção 5), `13-tecnologia-e-estrutura.md` (a pilha e as convenções de código), `05-tipografia.md`, `08-imagem-e-fotografia.md`, `09-movimento.md`. A verificação: `../qualidade/02-regua.md` e `../qualidade/08-desempenho.md`.
>
> **Estado.**
> - Os tetos de bytes e de CLS são DECIDIDO: estão na régua do repositório do Atlas desde 07.10.2026. Nos sites de marca, os de bytes subiram em 08.10.2026, à noite (pedido do usuário em 08.10.2026: "deixe claro que os sites devem haver o design premium, independente do plano, onde você pode aumentar o peso de cada aplicação, tanto no pc quanto no mobile, para que ele consiga manter e não se limitar à criação de designs como o Awwwards").
> - As metas de LCP e TBT são as da especificação do site do Atlas (seção 7), de 30.09.2026. O TBT com CPU 20× **não é cumprido hoje** (seção 6).
> - A meta de INP e a da troca de página são RATIFICADO (vêm do padrão de design de 07.10.2026); nenhuma das duas foi medida.
> - O ritmo de 60 quadros por segundo (seção 2.4) é porta de entrega de todo site desde 28.10.2026, por pedido do usuário (22 e 27.10.2026). As técnicas das seções 5.15 a 5.17 foram medidas no site do Atlas em 27 e 28.10.2026, e a 5.18 em 01 e 02.11.2026. A entrada por CSS e a página no topo estão na base desde 02.11.2026 (seção 2.4); o site do Atlas ainda não cumpre a porta na navegação (seção 6).
>
> **Atualizado em:** 03.11.2026: o vidro sai enquanto a página rola (seção 5.19) e a passiva começa com metade à vista (seção 5.8). Antes, 02.11.2026.

---

## 1. Por que importa

**Regra.**
- **Nos sites de marca** (cliente e exemplo, de qualquer plano), **não há teto de peso** (DECIDIDO em 08.10.2026, à noite, pedido do usuário: "retire limites de tamanho, e preze por um site muito bem trabalhado e referência"; de antes, na mesma data, 600 KB de script, 300 KB de fontes e 5 MB na carga). Todo site sai no nível de acabamento dos premiados (Awwwards, CSS Design Awards), no computador e no celular, com o piso do acabamento (`00-principios.md`, seção 9). A régua mede e relata o peso de toda página; nada reprova por bytes.
- **O celular recebe o mesmo design:** o passe do celular, depois do da mesa, traduz cada momento premium para o toque (`09-movimento.md`, seção 11). "Mais leve" ali é o gesto, não os bytes.
- **O que barra o design é a experiência, não o peso:**
  - **o deslocamento da página (CLS):** reprova;
  - **o funcionamento sem script e com movimento reduzido:** reprova (`00-principios.md`, seção 4);
  - **o ritmo dos quadros:** reprova quando a página não desenha a 60 quadros por segundo na rolagem, no menu, na navegação e na figura, no celular médio e na mesa (seção 2.4);
  - **o travamento:** reprova só além da barreira, quando a página trava até num aparelho médio (seção 2.1). Abaixo dela, o tempo (LCP, TBT, INP) e o peso só se medem e se relatam, sem meta nem porta de regressão (decisão de Gabriel Ribeiro Ota Yida (CEO), transmitida pelo usuário em 08.10.2026, à noite: "o tamanho do site não importa, e sim só seu design. Apenas em casos extremos, onde ele ultrapassa uma barreira muito grande e fica travado até mesmo para dispositivos médios").
- **O peso compra o que se vê, e o que é da marca:** o motor da peça, o vídeo da capa, a fonte da marca, o movimento. Nunca o efeito de catálogo, que a avaliação anti-IA continua reprovando (`11-anti-ia.md`; `00-principios.md`, seção 9). O peso que não aparece na tela (uma biblioteca inteira para um efeito, uma imagem sem recorte) continua defeito: entra pela regra de tecnologia (`13-tecnologia-e-estrutura.md`, seção 9).
- **No site do Atlas,** vale a ordem do `CLAUDE.md` do repositório do Atlas: celular primeiro, desempenho em aparelho modesto e acabamento premium, nesta ordem (DECIDIDO).

**Objetivo.** O Atlas vende padrão de execução, e o cliente compara o site dele com o que vê de melhor, não com o concorrente da rua. O teto de 180 KB de script não cabia nenhum dos premiados estudados (`12-inspiracao-e-referencias.md`, seção 4, lição 4) e cortava o design antes de ele existir. O cliente do comércio local continua sendo encontrado num Android intermediário, no 4G, na rua: por isso o celular recebe o mesmo design, e a experiência nele (o que aparece, o que responde, o que pula) é o que se mede e se protege.

**Como conferir:** os orçamentos da seção 2, medidos como manda a seção 4.

---

## 2. Os orçamentos

Valem para **todo plano e todo site** ([todos]), **no computador e no celular**: o plano decide quantas páginas e quanto movimento, nunca a qualidade nem o acabamento do design (`00-principios.md`, seção 9). A régua mede a carga a 1440 px, onde as imagens responsivas são as maiores; o script e as fontes são os mesmos no celular.

### 2.1 · Bytes e estabilidade (a régua mede; falha reprova)

| Medida | Teto | Como a régua conta | Objetivo do teto |
|---|---|---|---|
| **Script inicial** | **Sem teto** nos sites de marca **[cli][ex]** (medido e relatado); **180 KB** no site do Atlas | O corpo comprimido dos `<script>` do HTML, sem o polyfill `nomodule` (o Chrome não o baixa) | O piso do Next 16 com React 19 é ~131 KB. Nos sites de marca, cabem a biblioteca de movimento, o motor da peça-assinatura e as ilhas do ofício: os premiados Halo e Haven carregam ~550 KB de script (`12-inspiracao-e-referencias.md`, seção 4). Até 08.10.2026, o teto era 180 KB também neles |
| **Fontes** | **Sem teto** nos sites de marca **[cli][ex]** (medido e relatado); **90 KB** no site do Atlas | Tudo o que chega como fonte na carga | Nos sites de marca, cabem as duas famílias da identidade em vários pesos, ou uma variável com eixos; os três sites de exemplo medem de 90,5 a 141,1 KB (o teto era 200 KB até 08.10.2026). No Atlas, cabem as três famílias do site de 28/08 (~52 KB; decisão de 05/10, mantida pelo usuário em 08/10) e, em "Para quem", as fontes de título dos dois nichos da vitrine (~31 KB). Com San Francisco e Inter (~23 KB), o teto era 60 KB |
| **Total na carga** | **Sem teto** nos sites de marca **[cli][ex]** (medido e relatado); **1,5 MB** no site do Atlas | Tudo o que chega até 2 s depois do `load`, sem rolar: a janela pega o que a página puxa sozinha logo depois de carregar (fontes trocadas, imagens e módulos disparados cedo), sem contar o que só a rolagem ou o toque pedem | Nos sites de marca, cabem a fotografia em quantidade e o vídeo curto da capa, como nos premiados (de 14 a 251 imagens; `12-inspiracao-e-referencias.md`, seção 4). O teto ainda pega o acidente: a foto crua, o vídeo sem compressão. Era 1,5 MB até 08.10.2026 |
| **CLS na carga** | **0,05** | Os deslocamentos de leiaute até o fim da carga | Metade do limite "bom" do Google, que é 0,1 [V: https://web.dev/articles/vitals]. O conteúdo que pula faz o visitante tocar no lugar errado |
| **A barreira do travamento** (falha, desde 08.10.2026, à noite) | No aparelho médio (CPU 4×, "4G lento"): **nenhuma tarefa da página acima de 1 s**, na carga ou ao rolar; **no máximo 3 s de bloqueio somado** na carga; **no máximo 10% dos quadros da rolagem acima de 100 ms**; **a primeira tela em até 10 s** | A régua, na passagem 2b: a página a 390 × 844, a CPU 4× (o "Mid-tier mobile" do DevTools) e a rede do perfil de celular do Lighthouse; as tarefas longas até 3 s depois do `load` e numa rolagem da página inteira em 4 s, quadro a quadro | **A única porta de desempenho dos sites de marca** (decisão de Gabriel Ribeiro Ota Yida (CEO), transmitida pelo usuário em 08.10.2026, à noite: "o tamanho do site não importa, e sim só seu design. Apenas em casos extremos, onde ele ultrapassa uma barreira muito grande e fica travado até mesmo para dispositivos médios"). Os limites: 1 s e 10 s são os de Nielsen (o pensamento se interrompe; a atenção se perde: https://www.nngroup.com/articles/response-times-3-important-limits/) [FU]; o bloqueio é cinco vezes o "ruim" do Lighthouse (600 ms). Calibrada na mesma noite: o pior site do Atlas ficou em 190 ms de tarefa, 140 ms de bloqueio, nenhum quadro lento e 2,6 s; uma página de teste que trava 1 s reprovou |
| **CLS ao rolar** | 0,05 | Os deslocamentos durante a rolagem | Só **aviso**: imagem preguiçosa sem dimensão é o caso típico, mas a régua não distingue o defeito do movimento decidido |
| **Pedido a outro domínio** | **0** | Toda requisição fora da origem | Privacidade e uma conexão a menos (`13-tecnologia-e-estrutura.md`, seção 3.8) |
| **Erro de console, de página ou da política de conteúdo** | **0** | Os eventos do navegador | O erro que ninguém vê ainda custa CPU e esconde um defeito |

**A unidade.** A régua conta o KB como 1.024 bytes, e o Lighthouse também. Alguns README do repositório do Atlas usam 1.000: o Inter de 22.936 bytes aparece como 22,4 KB na régua e como 22,9 KB no `web/app/fontes/README.md` do repositório do Atlas. Compare sempre na mesma unidade.

**O orçamento antigo da ESTEIRA v2.1 (bloco 5), só para registro.** Página inteira de 1,5 MB (três vezes mais leve que a referência mais leve com ambição visual); JavaScript de 60 KB (os doze demos estáticos pesavam de 51 a 61 KB, em quatro pedidos); tipografia de 200 KB; mídia de 1,2 MB; pedidos externos, zero. A regra de leitura era: "o teto é licença para gastar, não meta a atingir". O teto de 60 KB de JavaScript é incompatível com a pilha atual (o piso do Next 16 com React 19 é ~131 KB) e foi substituído por 180 KB. O teto de mídia não tem medida própria na régua: a mídia cabe no total de 1,5 MB (`08-imagem-e-fotografia.md`, seção 8).

### 2.2 · Tempo (o Lighthouse mede; nos sites de marca, só diagnóstico)

| Medida | Meta | Como medir | Estado |
|---|---|---|---|
| **LCP** (o maior elemento da primeira tela aparecer) | **2,5 s** | Lighthouse com CPU 20× e estrangulamento real (seção 4.3) | Cumprida: 2,11 s de mediana no início, em 03.10 |
| **TBT** (o bloqueio da página na carga) | **300 ms** | Idem | **Não cumprida:** 716 ms de mediana no início, em 03.10 (seção 6). Coincidência de número: os 716 ms de linha principal do módulo da onda do Spell UI (seções 4.5 e 5.7) são outra grandeza, medida no rastro, antes da correção |
| **INP** (a resposta a um toque ou clique) | **200 ms** | Seção 4.6 | **Nunca medido.** O limite é o "bom" do Google [V: https://web.dev/articles/vitals] |
| **Troca de página** | **400 ms** | À mão, gravando a tela | RATIFICADO (do padrão de design). A transição do Atlas leva mais: a página que entra começa aos 160 ms e dura 700 ms. A decidir em `09-movimento.md` |
| **Notas do Lighthouse**, perfil de celular padrão | Desempenho ≥ 90; Acessibilidade, Boas práticas e SEO = 100 | Lighthouse, 3 execuções | Cumpridas em 01.10, salvo o desempenho da barbearia de exemplo (87 a 89, pela compilação do 3D no desenho em software do Lighthouse). **[ex]** O SEO dá 66 nos sites de exemplo por causa do `noindex` obrigatório; não é defeito |

**Nos sites de marca, desde 08.10.2026, à noite, o tempo não é porta** (decisão de Gabriel Ribeiro Ota Yida (CEO), transmitida pelo usuário em 08.10.2026, à noite: "o tamanho do site não importa, e sim só seu design. Apenas em casos extremos, onde ele ultrapassa uma barreira muito grande e fica travado até mesmo para dispositivos médios"). As metas desta tabela e a regressão relativa (seção 4.4) ficam para o site do Atlas e para o diagnóstico: quando a barreira do travamento (seção 2.1) reprova, o Lighthouse e o rastro de desempenho dizem onde está a causa. A porta é a barreira, porque ela é alta o bastante para não reprovar por sorte: o TBT do mesmo código variou de 357 a 1.089 ms em sete execuções, e a barreira de bloqueio é de 3 s com a CPU 4×.

**No site do Atlas,** como até então: a meta absoluta **avisa**, e a **regressão relativa** bloqueia (seção 4.4).

### 2.3 · Limites de fora que também valem

| Limite | Valor | Fonte |
|---|---|---|
| Imagem do cartão de compartilhamento (`og:image`) | Menos de 600 KB; 300 px ou mais de largura; proporção de no máximo 4:1 | Documentação do WhatsApp (Meta) [V] |
| `<head>` do HTML | Dentro dos primeiros 300 KB | Idem: depois disso, o WhatsApp não lê as marcações e o cartão sai cru |

### 2.4 · O ritmo dos quadros: 60 por segundo (a régua dos quadros mede; falha reprova)

**Regra** (desde 28.10.2026). Pedido do usuário em 22.10.2026: o site a 60 quadros por segundo na rolagem e em toda navegação, "sem matar muito a capacidade dos celulares", no site do Atlas e nos sites da esteira. De novo em 27.10.2026: "verifique a adicao do 60fps em todo o site tanto no computador quanto no mobile". Todo site, de todo plano **[todos]**, desenha a 60 quadros por segundo em quatro gestos, no celular e na mesa:
- **a rolagem,** do topo ao rodapé e de volta;
- **o menu,** ao abrir e ao fechar;
- **a navegação:** a ida por cada vínculo do cabeçalho ou do menu, e o voltar;
- **a figura:** o arraste da peça (o 3D, o mapa, o canvas da capa), onde houver.

| Perfil | Critério, na mediana de 3 vezes | Classe |
|---|---|---|
| Celular com a CPU 4× (390 × 844, toque: o aparelho médio) e mesa (1440 × 900) | ≥ 95% dos quadros em dia; o p95 do intervalo em 1 batida (16,7 ms); o pior intervalo até 3 batidas (50 ms) | **Falha**, lida em duas sessões separadas |
| Celular com a CPU 6× (o aparelho de entrada) | ≥ 90%; 2 batidas; até 6 batidas (100 ms) | Aviso |

- **Como se mede:** a régua dos quadros (`../qualidade/02-regua.md`, seção 12). **Como se lê:** a mediana de 3, duas sessões separadas, o controle e o A/B intercalado (`../qualidade/08-desempenho.md`, seção 11).
- **Junto da barreira do travamento (seção 2.1), não no lugar dela.** A barreira barra o extremo, na carga e no aparelho médio; esta régua mede o quadro a quadro dos gestos.
- **O "sem matar o celular":** a régua relata a ocupação da linha principal durante o gesto, sem reprovar. É a folga que o site deixa ao aparelho.

**Objetivo.** O movimento é parte do premium (`09-movimento.md`), e o premium que engasga no celular parece quebrado. Os 50 ms são o limiar da tarefa longa: três batidas perdidas seguidas são um tropeço que se vê. O cliente do comércio local abre o site num Android intermediário; por isso a porta é a CPU 4×, e o aparelho de entrada (6×) avisa.

**O estado medido** (27 e 28.10.2026; Apple M2, Chrome 156):
- **No site do Atlas de hoje** (e527840), a rolagem, o menu e a figura aprovam. A navegação reprova em 13 ou 14 das 14 portas nas três sessões de controle, com 4 ou 5 batidas na mediana (no 6×, até 7). As causas: a View Transition do React, no celular (seção 5.15); o vidro, na mesa (seção 5.16).
- **Com as correções das seções 5.15 a 5.17 e a página no topo** (`13-tecnologia-e-estrutura.md`, seção 3.7, regra 9), medidas numa cópia do site:
  - a rolagem, o menu e a figura aprovam em todas as páginas, sem aviso no 6×;
  - a navegação melhora: no celular 4×, 43 de 63 vezes em 3 batidas ou menos (hoje, 0 de 63); no 6×, nenhuma vez em 7 batidas ou mais (hoje, 30 de 63);
  - mas a navegação fica no limiar: só 5 das 14 portas aprovam nas quatro sessões; as outras ficam entre 3 e 4 batidas. Na mesa, em A/B intercalado, o ganho quase some.
  - O que resta: o commit da página nova, com o estilo e o leiaute que o roteador do Next força para decidir a rolagem, e o voltar, que o React renderiza de forma síncrona (22 a 24 ms com a CPU 4×).
  - **A cópia de 28.10.2026 não entrou no site:** a verificação de 28.10.2026 não a aprovou, pela navegação instável e por um defeito visível (seção 5.15, "Nada com `position: fixed` dentro da caixa"). A entrada por CSS só chegou ao site com o redesenho de 02.11.2026 (`99-rastreabilidade.md`, seção 10). **O site do Atlas ainda não cumpre esta regra na navegação** (PENDENTE).
- **Nas demos** (22.10.2026, antes da reversão do site; a navegação precisa ser medida de novo): a rolagem e as figuras aprovam em todos os perfis, inclusive com o 3D da barbearia e a arcada da odontologia. A navegação reprova no celular 4× nas cinco demos em que se mediu (no depósito, a régua não achou o vínculo), com 4 a 5 batidas (67 a 84 ms), pelo mesmo `<ViewTransition>`; o menu da odontologia também reprova.
- **A base** traz a entrada por CSS e a página no topo desde 02.11.2026. Medida na cópia compilada, em `/` e `/servicos`, com a mediana de 3: a navegação aprova na mesa e no celular 4×, com 100% em dia e o pior de 1 batida, numa sessão só (a porta pede duas) e numa máquina em uso (no celular, pelo gatilho do menu da base, `../qualidade/02-regua.md`, seção 12). É a página mais leve possível: não prova o site pronto, que se mede de novo.

**Varia por:** nada. O plano decide quanto movimento, nunca o ritmo.

---

## 3. O estado medido

### 3.1 · Bytes, na régua (rodada final de 08.10.2026)

Nas 23 páginas do repositório do Atlas: 0 falhas, 31 avisos, 265 s.

| Medida, carga inicial | Início | Outras páginas do Atlas | Sites de exemplo |
|---|---|---|---|
| Script (os `<script>` do HTML) | 155,3 KB | 143,9 a 154,2 KB | 136,5 a 143,2 KB |
| Fontes | 22,4 KB | 22,4 KB (52,9 em "Para quem", com as fontes da vitrine) | 90,5 (barbearia) · 130,2 (depósito) · 141,1 KB (nutrição) |
| Total na carga | 271,6 KB | 265 a 301 KB | 308 a 384 KB |
| CLS na carga | 0 | 0 | 0 a 0,002 |

O +1,0 KB de script em toda página, de 07.10, é o das telas de erro em português (`app/error.tsx`).
**A composição do script** (auditoria técnica de 07.10.2026; corpo dos `<script>` comprimido com gzip -9, sem o polyfill): a 404, que é o piso do framework, tem 130,7 KB; o início, 153,7; Orçamento, 152,6; Planos, 150,0; Para quem, 143,0; as outras páginas do Atlas, 142,3; os exemplos, de 135 a 137. O código próprio de cada página é só ~12 a 23 KB acima do piso, e o pedaço compartilhado das ilhas do layout (11,7 KB) vai em **toda** página: **ilha no layout custa no site inteiro.** Estes números são de outro dia e de outro método que os da régua acima; não se comparam um a um.

### 3.2 · Tempo, no Lighthouse

**Início, 03.10.2026** (Lighthouse 13.5, perfil de celular; perfil padrão com 3 execuções; CPU 20× com 7, mediana com mínimo e máximo). A "base" é o mesmo site sem o script dos componentes do Spell UI, compilada na mesma sessão:

| Medida | Base | Com o Spell UI |
|---|---|---|
| Script inicial transferido | 158,9 KB | 160,6 KB |
| Peso total | 230,3 KB | 232,2 KB |
| Nota · LCP, perfil padrão (simulado) | 96 · 2,71 s | 96 · 2,79 s |
| Nota, CPU 20× | 76 (70 a 82) | 81 (70 a 87) |
| LCP, CPU 20× | 2,22 s (2,07 a 2,58) | 2,11 s (1,77 a 2,67) |
| TBT, CPU 20× | 998 ms (601 a 1.628) | 716 ms (357 a 1.089) |

**Script inicial nas outras páginas** (corpo comprimido dos `<script>`, sem o polyfill `nomodule`; base compilada na mesma sessão): o início foi de 152,5 para 154,1 KB (+1,7); Orçamento, +1,7; Para quem, +0,8; Planos, +0,5; as outras páginas do Atlas, +0,1. Nos sites de exemplo, o depósito (talão e calculadora), +1,6; o agendador da barbearia, +1,7; a nutrição e a capa da barbearia, 0. **O que pesa:** o botão de copiar, com os dois ícones (lucide), e as barras de espera no gatilho do menu; a onda, a tarja, o brilho e as barras da escada são CSS. LCP e TBT com CPU 20× não tiveram diferença acima do ruído em 7 execuções.

**Fase do celular, 01.10.2026** (perfil padrão, 3 execuções):

| Página | Desempenho · Acessibilidade · Boas práticas · SEO | FCP · LCP (simulado) · TBT |
|---|---|---|
| Início | 91 · 100 · 100 · 100 | 0,91 · 3,46 s · 48 ms |
| Para quem · Planos | 94 · 100 · 100 · 100 | 0,9 a 1,2 · 3,1 s · 33 a 50 ms |
| Orçamento · O trabalho · O Atlas · Dúvidas | 94 a 96 · 100 · 100 · 100 | 0,9 · 2,7 a 2,9 s · 94 a 112 ms |
| Nutrição · Depósito **[ex]** | 90 · 100 · 100 · 66 | 1,1 a 1,5 · 3,5 a 3,6 s · 50 a 92 ms |
| Barbearia **[ex]** | 87 a 89 · 100 · 100 · 66 | 1,1 · 3,2 s · 229 a 287 ms |

Na mesma fase, com CPU 20×, o TBT foi de 1.729 ms no início, 1.577 ms em Planos e 1.340 ms em "Para quem" (medianas de 3), com LCP real de 2,1 a 2,5 s.

**Perfil de computador, 01.10.2026** (`--preset=desktop`): as sete páginas do Atlas com 100 nas quatro notas; nutrição e depósito com 100 · 100 · 100 · 66; barbearia com 97 · 100 · 100 · 66 (TBT de 130 ms, da compilação do palco 3D).

**O histórico do TBT com CPU 20×** (fonte: `documentacao/atlas--arquitetura-web.md`, seção 7, no repositório do Atlas [V]). Cada medida é do seu dia, da sua máquina e do seu método, e por isso as linhas não formam uma série única:

| Data | TBT com CPU 20× | Nota do perfil padrão | O que mudou |
|---|---|---|---|
| 30.09.2026 | 243 a 248 ms (1 ms no perfil padrão) | 97 | O site antes da volta das fontes, da esfera e do globo do site de 28.08 |
| 01.10.2026 | 293 a 294 ms (2 ms no perfil padrão); a versão de 30.09, recompilada na mesma sessão, deu 230 a 237 ms | 94 | As três famílias de fonte, a esfera e o globo do site de 28.08: +60 ms |
| 01.10.2026, fusão das branches | 2.527 a 2.688 ms, contra 1.069 a 1.213 ms sem a fusão (outra máquina, mais lenta) | 95 (92 sem a fusão) | DOM maior, estilos e ilhas novas |
| 01.10.2026, fase do celular | 1.729 ms (início), 1.577 (Planos) e 1.340 (Para quem) | 87 a 96 | A disposição de celular |
| 03.10.2026 | 716 ms de mediana (357 a 1.089); 998 ms (601 a 1.628) na base sem o Spell UI | 96 | O Spell UI e os efeitos de identidade |

A meta de 300 ms foi cumprida em 30.09 e em 01.10, antes da fusão das branches, e não foi mais desde então.

**Medidas que não se comparam entre si:**
- **Métodos diferentes.** A régua e o Lighthouse contam o script e o peso de formas diferentes: o início tinha 160,6 KB no Lighthouse em 03.10 e 155,3 KB na régua em 08.10, e entre as duas datas o script também diminuiu (−1,3 KB na revisão de 03.10).
- **Máquinas diferentes.** A medição da fusão de 01.10 foi feita noutra máquina, mais lenta com CPU 20×: o TBT dela (2.527 a 2.688 ms) não se compara com os outros.

---

## 4. Como medir sem se enganar

### 4.1 · A regra zero: o build de produção

**Regra:** toda medição é feita contra o site compilado, nunca contra o `next dev`.

**Objetivo:** o `next dev` tem outro script, outro CSS e o indicador de desenvolvimento. O número que ele dá não descreve o site publicado.

**Como fazer:**
```bash
npm run build && npm start      # produção local em http://localhost:3000
```
No modo standalone, a medição mais fiel é contra o `server.js`, o mesmo que a Hostinger roda (`13-tecnologia-e-estrutura.md`, seção 5.1).

### 4.2 · Bytes: a régua

```bash
npm run regua                                   # as páginas do sitemap.xml e as ligadas a elas
npm run regua -- --pagina=/ --pagina=/servicos  # só estas
```

- **O que ela mede:** o bloco 5 (`../qualidade/02-regua.md`) — o script dos `<script>` do HTML, as fontes, o total até 2 s depois do `load`, o CLS na carga e ao rolar, os pedidos externos, os erros e a gravação no aparelho.
- **Onde fica o resultado:** o relatório em `.regua/relatorio.json`, fora do git.
- **O que ela não mede:** LCP, TBT e INP. Esses são do Lighthouse.

### 4.3 · Tempo: o protocolo do Lighthouse

**Regra:** LCP e TBT se medem no Lighthouse 13, perfil de celular, com o protocolo abaixo. Uma medição fora do protocolo não entra em decisão.

| Passo | Como | Objetivo |
|---|---|---|
| 1. Versão | Lighthouse 13.5. Ele declara `"node": ">=22.19"`; com a 22.17.1 (a máquina do Atlas em 08.10), o npm só avisa | O mesmo instrumento em toda medição |
| 2. Navegadores | **Feche** os outros navegadores controlados (o do Playwright, o do MCP) | Com o do Playwright aberto na mesma página, o TBT subiu de ~240 para mais de 600 ms |
| 3. Perfil padrão | `--form-factor=mobile` (simulado: CPU 4× mais lenta, latência de 150 ms e 1,6 Mbps de download); 3 execuções | As notas e a comparação com o mercado |
| 4. CPU 20× | `--throttling-method=devtools --throttling.cpuSlowdownMultiplier=20`; **5 a 7 execuções**, sempre em número ímpar | O estrangulamento real emula um Android de entrada na máquina do Atlas (Apple M5). É a medida que decide LCP e TBT |
| 5. Leitura | Mediana, com o mínimo e o máximo | Uma execução sozinha não diz nada: o TBT variou de 357 a 1.089 ms no mesmo código |
| 6. Comparação | Base e mudança **intercaladas**, alternando quem vai primeiro, na mesma máquina e na mesma sessão | A máquina esquenta e o sistema muda; medir a base de manhã e a mudança à tarde mede o dia |
| 7. A base | Compilada **fora** do repositório | Numa cópia dentro de uma pasta ignorada pelo git (`.playwright-mcp/`), o Tailwind leu o `node_modules` e gerou uma folha duas vezes maior (48,6 contra 25,5 KB comprimidos), o que distorcia os tempos |
| 8. A máquina | Anote a máquina com cada medição; só compare medições da mesma máquina | O mesmo 20× emula outro aparelho noutra máquina (o caso da fusão, seção 3.2). O relatório grava o índice da máquina em `environment.benchmarkIndex` [FU]. O painel Performance do Chrome também tem perfis calibrados de "celular de entrada" e "intermediário" [FU] |
| 9. No Claude Code | Com o sandbox desligado | O Chrome não abre dentro do sandbox |

**Os comandos:**
```bash
# Perfil padrão: as notas
npx lighthouse@13 http://localhost:3000/ --form-factor=mobile

# CPU 20×, estrangulamento real: LCP e TBT
npx lighthouse@13 http://localhost:3000/ --form-factor=mobile --only-categories=performance \
  --throttling-method=devtools --throttling.cpuSlowdownMultiplier=20

# Perfil de computador
npx lighthouse@13 http://localhost:3000/ --preset=desktop
```

**Para repetir e tirar a mediana** (RATIFICADO, ferramenta; não existe no repositório do Atlas):
```js
// ferramentas/lighthouse.mjs — N execuções do Lighthouse com CPU 20× e as medianas.
// Uso: node ferramentas/lighthouse.mjs http://localhost:3000/ 7
// Os relatórios ficam em .lighthouse/ (ponha a pasta no .gitignore).
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";

const [url = "http://localhost:3000/", vezes = "7"] = process.argv.slice(2);
mkdirSync(".lighthouse", { recursive: true });

const medidas = { "largest-contentful-paint": [], "total-blocking-time": [], "cumulative-layout-shift": [] };

for (let i = 1; i <= Number(vezes); i++) {
  const saida = `.lighthouse/execucao-${i}.json`;
  execFileSync(
    "npx",
    [
      "--yes", "lighthouse@13", url, "--quiet",
      "--form-factor=mobile", "--only-categories=performance",
      "--throttling-method=devtools", "--throttling.cpuSlowdownMultiplier=20",
      "--output=json", `--output-path=${saida}`,
    ],
    { stdio: "inherit" },
  );
  const { audits } = JSON.parse(readFileSync(saida, "utf8"));
  for (const id of Object.keys(medidas)) medidas[id].push(audits[id].numericValue);
}

// Número ímpar de execuções: a mediana é o valor do meio.
for (const [id, valores] of Object.entries(medidas)) {
  valores.sort((a, b) => a - b);
  const casas = id === "cumulative-layout-shift" ? 3 : 0;
  const mediana = valores[Math.floor(valores.length / 2)];
  console.log(`${id}: mediana ${mediana.toFixed(casas)} (mín. ${valores[0].toFixed(casas)}, máx. ${valores.at(-1).toFixed(casas)})`);
}
```
O LCP e o TBT saem em milissegundos e o CLS sem unidade, que é como o Lighthouse grava o `numericValue`.

**O LCP simulado mente para cima.** No perfil padrão, o LCP do Atlas fica acima de 2,5 s (2,61 a 3,46 s), e o real fica abaixo (1,96 a 2,5 s).
- **Por quê:** a simulação de rede do Lighthouse (Lantern) põe as fontes pré-carregadas no caminho do lide da capa. No rastro real, o primeiro byte chegava em ~5 ms, e o atraso de desenho era de ~60 ms.
- **Regra:** decide o LCP medido com CPU 20× e estrangulamento real; o simulado é aviso.

### 4.4 · Regressão relativa

**Regra (RATIFICADO):** uma mudança é **regressão** de tempo quando, no protocolo da seção 4.3, a mediana dela fica fora do intervalo (mínimo a máximo) da base, ou quando o mínimo dela fica acima da mediana da base. Regressão não entra sem causa achada e decisão registrada.

**Objetivo:** pegar o custo real sem reprovar pelo ruído.

**Caso real:** em 03.10, a primeira onda de cor do Spell UI atrasou o LCP da capa. Com CPU 20×, a mediana foi de 2,07 para 2,33 s em 7 execuções, e o **mínimo** da versão com a onda ficou acima da **mediana** da base. A causa foi achada (seção 5.7), e a onda foi refeita no mesmo dia.

**Varia por:** bytes não precisam deste cuidado. Qualquer KB a mais aparece na régua igual em toda execução.

### 4.5 · Diagnóstico: onde está o custo

| Pergunta | Ferramenta | Caso real |
|---|---|---|
| Qual módulo ocupa a linha principal? | Rastro do painel Performance do Chrome com CPU 20× | A onda de cor: 716 ms no módulo dela, mais ~800 ms de estilo e pintura no documento |
| Quanto trabalho a página faz ao todo? | A soma das tarefas da linha principal em 12 s, pelo DevTools Protocol, com CPU 20× | A fusão de 01.10: ~4.300 contra ~5.100 ms, por um DOM maior (HTML de 28 para 38 KB), estilos e ilhas novas |
| O movimento recalcula estilo demais? | A contagem dos eventos *Recalculate Style* no rastro | A faixa e o reflexo correndo desde a carga: 119 recálculos; só na tela, 42 |
| A fonte refaz o leiaute? | TBT com `display: swap` e com `display: optional`, no protocolo | O Inter em `swap`: 334 ms; em `optional`: 293 ms |
| O que a ilha leva no HTML? | O tamanho do HTML de cada página, antes e depois | O estado da loja do depósito: ~11 KB por página (seção 5.2) |

### 4.6 · INP: como medir (RATIFICADO)

O INP nunca foi medido em nenhum site do Atlas.
- **Sem dado de campo:** um site de pouco tráfego não aparece no relatório público de experiência do Chrome (CrUX), que exige um limiar de tráfego [FU]. O INP só existe com visitantes reais; no laboratório, o Lighthouse de navegação não o mede, e o substituto é o TBT [FU]. E o Atlas não usa analítica de terceiros nem grava nada no aparelho (`00-principios.md`).
- **No laboratório (RATIFICADO)** [FU]: no painel Performance do Chrome, com a CPU estrangulada (o perfil calibrado de "celular de entrada", ou 20×), faça as interações principais e leia o INP nas métricas ao vivo:
  - abrir o menu;
  - escolher no montador;
  - trocar de plano no simulador;
  - usar a calculadora;
  - escolher um horário.

  O modo de intervalo (*timespan*) do Lighthouse também mede o INP de um roteiro de interações.
- **Em campo, sem terceiros:** só nos sites no web app Node, contando no próprio servidor (`14-funcionalidades/04-relatorio-de-acessos.md`). Isso passa pela regra de tecnologia nova (`13-tecnologia-e-estrutura.md`, seção 9).

### 4.7 · No endereço publicado

**Regra:** depois de cada publicação, repetir o Lighthouse contra o endereço real e medir o tempo do primeiro byte (`18-publicacao-e-manutencao.md`, seção 5).

**Objetivo:** o servidor, a compressão, o CDN e a partida a frio do web app Node não existem na máquina local.

**Cuidado conhecido:** pedido com `curl --compressed` recebe da CDN da Hostinger uma página de verificação de navegador, e não o site. Meça com `curl` **sem** `--compressed`.

```bash
# Tempo até o primeiro byte, em segundos (sem --compressed).
curl -s -o /dev/null -w "primeiro byte: %{time_starttransfer} s · total: %{time_total} s\n" https://exemplo.com.br/
```

---

## 5. As técnicas

Cada técnica nasceu de uma medição. Valem em todo site; a coluna "Varia por" diz quando o plano muda alguma coisa.

### 5.1 · O HTML chega pronto do servidor

- **Regra:** Server Components por padrão, páginas pré-renderizadas na compilação e `"use client"` só nas ilhas (`13-tecnologia-e-estrutura.md`, seção 3.1).
- **Objetivo:** o LCP depende do HTML e da imagem, não do script. A página existe e se lê antes de o React hidratar.
- **Como conferir:**
  - a régua, bloco 2 (a página sem script);
  - no rastro, o primeiro byte e o atraso de desenho do elemento do LCP. No Atlas, ~5 ms e ~60 ms.
- **Regra:** o texto que pode ser o elemento do LCP (o título e o lide da primeira tela, no celular e na mesa) **não parte de opacidade 0 com atraso.** Ele entra já legível (deslocamento curto, ou nenhuma entrada no celular), e a coreografia fica para o que vem depois.
- **Objetivo:** o LCP conta quando o elemento aparece; o lide que começa invisível empurra o LCP para o fim da entrada [NV: conferir no rastro de cada caso].
- **Caso do Atlas** (auditoria técnica de 07.10.2026, PENDENTE): nas aberturas das páginas internas, o lide entra com `mov-surge` (opacidade 0, 320 ms de atraso, 700 ms de entrada) em todas as larguras (`components/paginas/abertura-de-pagina.tsx`), o que provavelmente atrasa o LCP no celular.
- **Como conferir:** no Lighthouse, qual é o elemento do LCP e a fase de atraso de desenho, com e sem a entrada.

### 5.2 · Ilha pequena, que recebe só o que usa

- **Regra:** a ilha recebe só os campos que usa (`Pick<...>`), nunca o objeto inteiro do site. Tela de demonstração vira **imagem**, não HTML.
- **Objetivo:** tudo o que uma ilha recebe vai serializado no HTML de **cada** página, e cada nó a hidratar custa CPU.
- **Casos reais:**
  - **03.10:** o estado da loja do depósito recebia o objeto do site inteiro (~11 KB por página), e o agendador da barbearia, ~6 KB. Corrigidos, o HTML das 23 páginas ficou 73,5 KB menor e o script, 1,3 KB.
  - **Os celulares da vitrine** mostram a tela do site como uma imagem só: "bem mais leve para hidratar do que a tela em HTML".
- **Como conferir:** o tamanho do HTML de cada página, antes e depois; a régua, bloco 5.

### 5.3 · Carga sob demanda, no primeiro sinal de intenção

- **Regra:** o que não aparece na primeira tela e depende de um gesto carrega quando o gesto começa (ponteiro, toque, foco), não com o navegador ocioso. Use `next/dynamic` com `ssr: false`.
- **Objetivo:** a carga ociosa executa o módulo inteiro para quem nunca o usa.
- **Caso real:** pré-carregar o painel do menu com o navegador ocioso custava 160 ms com CPU 20×.
- **Exceção:** a carga ociosa (`lib/ocioso.ts`) serve ao que é certo de ser usado e caro de preparar, como as faces do 3D (seção 5.11).

### 5.4 · Elemento nativo antes de biblioteca de primitivos

- **Regra:** botão, alternador e grupo de alternadores são elementos nativos (`<button>` com `aria-pressed`), não componentes do Base UI.
- **Objetivo:** o `Button` do Base UI custava 17 KB de script inicial; com `Toggle` e `ToggleGroup`, ~36 KB. Isso é três quartos da folga do teto (seção 2.1), sem ganho para o visitante.
- **Varia por:** o Base UI fica onde resolve o que o nativo não resolve bem: o painel lateral (`Sheet`), que carrega sob demanda. A auditoria técnica de 07.10.2026 propôs (P2) o `<dialog>` nativo também no menu: sairiam o `@base-ui/react` e o `cn` do código do navegador. Num site novo, comece pelo `<dialog>` (`16-acessibilidade.md`, seção 3.5) e só traga o `Sheet` se medir ganho.

### 5.5 · A menor versão da biblioteca, e o resto fora dela

- **Regra:** do Motion, só `motion/mini` e `motion/react-mini`.
  - **Contagem de números:** `lib/contar.ts`, que escreve o texto do elemento direto.
  - **Classes no navegador:** sem `cn`. Use string montada à mão.
- **Objetivo:**
  - a versão híbrida do Motion, que anima números, custaria 23 KB a mais só para a contagem;
  - o motor de fusão de classes custava ~9 ms de CPU na carga, 180 ms com CPU 20×.
- **Como conferir:** a régua (script inicial), antes e depois de cada import novo.

### 5.6 · Fontes: poucas, recortadas, da casa

- **Regra:**
  1. Hospedadas junto ao site (`next/font/local`), nunca de servidor externo.
  2. Até duas famílias.
  3. Recortadas ao subconjunto latino, aos pesos e aos recursos tipográficos usados (o procedimento em `05-tipografia.md`).
  4. Pré-carga só das fontes **desta** página.
  5. `display: swap` por padrão; `optional` quando a troca tardia refaz o leiaute e pesa no TBT.
- **Objetivo:** fonte é o maior custo de bytes de um site de marca e pode deslocar o leiaute.
- **Por que hospedar junto:** nenhum dado do visitante sai do domínio; o carregamento acelera, porque some a resolução de nome e a negociação com dois domínios estranhos; e o site passa a funcionar sem rede externa. **Custo:** de 4 a 6 arquivos por nicho, de 100 a 200 KB, que se mede e não se presume [FU: pacote de conformidade de 30.08.2026, seção 5, no repositório do Atlas].
- **Casos reais:**
  - **Recorte:** o site de 28.08 baixava 93,2 KB do Google Fonts. As mesmas três famílias, recortadas, ficaram em 52,5 KB; uma família só, em 22,9 KB. O Inter sozinho foi de 36,1 para 22,9 KB (em KB de 1.000 bytes, como no `web/app/fontes/README.md` (repositório do Atlas) do Atlas; na conta da régua, de 1.024, o Inter dá 22,4 KB: seção 2.1).
  - **`display: optional`:** o Inter em `swap` custava ~50 ms a mais de TBT com CPU 20× (334 contra 293 ms). Em `optional`, ele é usado quando chega a tempo da primeira pintura (o caso comum, pré-carregado). Se atrasar, o texto fica na fonte do aparelho até a próxima visita.
  - **Pré-carga seletiva piorou:** pré-carregar só a Archivo Black, em vez das três, levou o FCP simulado de 0,90 para 1,36 s e o LCP com CPU 20× de 2,13 para 2,86 s. As três seguiram pré-carregadas. **Meça antes de mudar a pré-carga.**
  - **Fonte de outro site:** a pré-busca do `<Link>` e a fusão de CSS do empacotador traziam as fontes da nutrição para "Para quem". Resolvido com `<a>` comum para os sites de exemplo e uma declaração própria da fonte da tela (`13-tecnologia-e-estrutura.md`, seção 3.7).
- **Custo aceito:** nos aparelhos da Apple, o Inter é baixado e não é usado (a pré-carga não sabe o aparelho): 22,4 KB.
- **Como conferir:** a régua (fontes por página); o protocolo da seção 4.3 quando mudar `display` ou pré-carga.

### 5.7 · Nenhum script escreve estilo a cada quadro

- **Regra:** movimento é CSS ou Web Animations API, em `transform` e `opacity`. Nada de `requestAnimationFrame` que escreva estilo ou variável de CSS a cada quadro, salvo o ajuste medido de uma peça interativa (a inclinação: uma escrita por quadro, só com ponteiro fino).
- **Objetivo:** escrever estilo por quadro obriga o navegador a recalcular estilo e pintar a cada quadro, na mesma linha principal que desenha a página.
- **Caso real (03.10):** a primeira adaptação da onda de cor movia o degradê por uma variável de CSS a cada quadro, por ~2,7 s, durante a carga. Com CPU 20×, foram:
  - 716 ms de linha principal no módulo dela;
  - ~800 ms a mais de estilo e pintura no documento;
  - o LCP da capa de 2,07 para 2,33 s.

  Refeita só com `transform` (uma cópia da palavra numa janela que passa), virou componente de servidor e a diferença sumiu. O Shimmer Text original tinha o mesmo defeito: movia o fundo.
- **Caso da régua dos quadros** (22.10.2026, numa versão do Atlas descontinuada no mesmo dia, 8cb50ad: o número não vale para o site de hoje; o mecanismo vale): a lente de `/para-quem` trocava um atributo `data-*` nos rótulos e nos nós a cada movimento do ponteiro. Cada troca recalculava o estilo: ~10 ms por quadro com a CPU 4×, e só 67% dos quadros em dia no celular 6×. Trocar atributo ou classe a cada quadro é escrever estilo a cada quadro.
- **Como fazer, quando uma variável de CSS precisa animar:** registrá-la com `@property` e `inherits: false`. Sem isso, ela força repintura [V: Motion, lista de desempenho de animações].
- **Como conferir:** o rastro com CPU 20× durante a entrada; nenhuma tarefa periódica de script durante a animação.

### 5.8 · Movimento contínuo só onde se vê

- **Regra:** o que se move sozinho leva `data-ambiente`, para fora da tela e pausa pelo controle do cabeçalho. Se nasce abaixo da dobra, só começa ao entrar na tela e, desde 03.11.2026, com metade à vista (`09-movimento.md`, seção 14, "O mecanismo").
- **Objetivo:** o movimento que ninguém vê ainda custa CPU, e no celular custa bateria.
- **Casos reais:**
  - **Fora da tela:** com a faixa e o reflexo só na tela, os recálculos de estilo caíram de 119 para 42.
  - **Camada única:** as letras que rolam passaram a uma camada (a cópia em `text-shadow`): −160 ms.
  - **Menos DOM:** os separadores da faixa saíram do DOM.
  - **Pausa barata:** a pausa deixou de usar seletor universal.
  - **SVG redesenhado:** os meridianos da esfera da capa animam `transform` em elementos SVG, que o navegador redesenha a cada quadro (não vão para a GPU como em HTML), numa volta de 16 s. Por isso: quatro meridianos no celular (a metade), pausa fora de vista e nenhuma camada extra, porque oito camadas de 640 px custariam dezenas de MB de memória de vídeo. A esfera em si não pesou no TBT: sem a animação, o número foi o mesmo.
  - **O laço que desenha a cada quadro** (22.10.2026, na mesma versão descontinuada; confirmado por retirada): o mostrador do prazo desenhava um `Path2D` por casa de 3 px a cada quadro da troca de algarismo, a cada segundo, e a Terra rodava a 30 quadros por segundo. Com a pausa do próprio site, na rolagem do início no celular 4×, os quadros parciais caíram de 19–71 para 5–8 por vez, o em dia subiu de 96,1% para 99,3% e o pior caiu de 12 para 2 batidas. Na tela, o laço disputa a linha principal com a rolagem: meça a rolagem com e sem a pausa.
- **Varia por:** **[E]** e **[P]** não têm ambiente contínuo; **[C]** tem a camada completa, com as mesmas regras (`03-planos.md`).

### 5.9 · Imagens preparadas, com dimensão e prioridade certas

- **Regra:**
  1. **Preparo antes de publicar:** toda imagem é preparada na hora de entrar em `public/`, em WebP (AVIF quando ganhar no tamanho), na largura em que aparece. Os retratos saem em 480 × 480, qualidade 82 (`ferramentas/preparar-fotos.mjs`, em `13-tecnologia-e-estrutura.md`, seção 4).
  2. **Dimensão declarada:** `<img>` com `width` e `height` sempre.
  3. **Prioridade:** a maior imagem da primeira tela carrega **com prioridade** (`fetchPriority="high"`, sem `loading="lazy"`).
  4. **O resto:** `loading="lazy"`, `decoding="async"` e o esqueleto enquanto não chega.
  5. **JPEG:** só no cartão de compartilhamento (1200 × 630, de 53 a 92 KB no Atlas), onde a compatibilidade com os aplicativos de mensagem pesa mais.
  6. **Mesmo código nos dois modos:** `<img>` comum com arquivos já preparados. O export estático perde a otimização de imagem do Next sem um carregador próprio (documentação do Next, guia de export estático) [V].
- **Objetivo:**
  - imagem é o maior peso possível de uma página;
  - imagem sem dimensão desloca o leiaute;
  - imagem da primeira tela preguiçosa atrasa o LCP.
- **Caso real:** no celular, o aparelho de trás da capa mostrava mais área acima da dobra e podia virar o elemento do LCP. Preguiçoso, ele só começava a baixar 1,9 s depois, com CPU 20× (LCP de 2,88 s). Com prioridade, as duas telas da capa ficaram dentro da meta.
- **Como conferir:** a régua (total na carga; CLS); no Lighthouse, o elemento do LCP e se ele foi descoberto cedo.

### 5.10 · Leiaute estável

- **Regra:** nada muda de tamanho depois de desenhado sem espaço reservado:
  - as imagens, com dimensão;
  - as fontes, sem troca tardia que refaça o leiaute (seção 5.6);
  - as ilhas, com a altura do estado final já no HTML;
  - o gatilho que espera, sem mudar de tamanho (a espera aparece dentro dele).
- **Objetivo:** CLS na carga até 0,05.
- **Proibido por padrão:** `content-visibility: auto` nas seções. A altura estimada tirava as âncoras do lugar (`#duvidas` caía 1.693 px fora) e trocava um CLS por um defeito de navegação. **A exceção** (desde 28.10.2026) é a da seção 5.17: só quando a régua dos quadros a pede, com as âncoras que desenham antes de medir e a página que abre no topo.
- **Caso real:** a esfera da capa nascia centrada num bloco de texto ainda curto (numa carga em partes, a primeira pintura chegava antes do fim do HTML) e descia 150 px quando o bloco crescia, e o anteparo subia: CLS de até 0,1 com CPU lenta. A correção de 01.10: a esfera vem **depois do texto no HTML**, e o topo do anteparo é fixo, em `rem`; o CLS ficou em 0 [V: `documentacao/atlas--arquitetura-web.md`, seção 3]. Resta um CLS de 0,1 intermitente com CPU 20× (seção 6).

### 5.11 · 3D: motor próprio, carga por partes, resolução ajustada

**Varia por:** só **[C]**, e só nas condições de `13-tecnologia-e-estrutura.md`, seção 9.2.

- **Regra:**
  1. Motor próprio ou leve, medido (o da barbearia de exemplo tem ~16 KB), carregado depois da página.
  2. Compilação paralela dos *shaders* (`KHR_parallel_shader_compile`).
  3. As faces preparadas uma ficha por vez, com o navegador ocioso, as da página aberta primeiro.
  4. Textura num canal só (luminância) quando a peça é monocromática.
  5. Resolução da tela até 2× a do CSS, ajustada contra 60 quadros por segundo: cai 15% se a tela perde quadros, volta a subir com folga e espera 3 s a página assentar.
- **Objetivo:** o 3D não pode travar a página que o carrega, nem sair borrado.
- **Casos reais:**
  - **Bloqueio:** o TBT da barbearia (perfil de computador, desenho em software) começou em 280 ms e caiu para 130 ms com os itens 2 e 3.
  - **Nitidez:** a versão anterior partia de 64% da resolução nativa no computador e de 31% no celular, e o ajuste nunca subia numa tela de 60 Hz. Com o item 5, o canvas foi a 101% e a 69%. As células das faces passaram de 512 a 1.024 px a partir de 1.024 px de largura, nos mesmos 12,6 MB de memória de vídeo (um canal só).
- **Custo conhecido:** até ~2,4× mais pixels na placa de vídeo do computador, e o Lighthouse não foi remedido depois disso (seção 6).

### 5.12 · Nada de terceiros

- **Regra:** nenhum script, fonte, imagem, mapa, vídeo ou quadro de outro domínio:
  - o mapa é desenho vetorial do próprio site;
  - o vídeo, quando o plano o prevê, é hospedado junto;
  - o WhatsApp é um vínculo (navegação), não um componente.
- **Objetivo:** cada terceiro custa DNS, conexão, script que o site não controla e dado do visitante enviado para fora.
- **Como conferir:** a régua, bloco 5: o pedido externo e a violação da política de conteúdo reprovam.

### 5.13 · Cache: o que tem hash é para sempre; o resto, não

- **Regra:**
  - Os arquivos de `/_next/static/` têm hash no nome. O Next os serve com `Cache-Control: public, max-age=31536000, immutable`, sem como mudar (documentação do Next, guia de hospedagem própria) [V].
  - Os de `public/` não têm hash e saem com `public, max-age=0` (documentação do Next, pasta `public`) [V].
  - Cache longo num arquivo de `public/` só quando ele nunca muda. Se mudar, o arquivo ganha **nome novo**.
- **Objetivo:** a visita de volta não baixa de novo o que não mudou, e uma mudança aparece para todos.
- **Caso real (03.10):** com `/marca.svg` em cache de uma semana, o "A" de O Atlas sumia para quem já tinha a cópia guardada. O código passou a apontar um fragmento que a cópia antiga não tinha (`13-tecnologia-e-estrutura.md`, seção 5.3).
- **Varia por:** no site estático, quem põe esses cabeçalhos é o `.htaccess` (`18-publicacao-e-manutencao.md`, seção 3.2).

### 5.14 · A hidratação, o custo que resta

- **O que se sabe:** o grosso do TBT com CPU 20× é a hidratação do React. Um só bloco de script soma ~1,9 s com CPU 20× e ~90 ms sem estrangulamento.
- **O que não funcionou:** `<Suspense>` por seção, para hidratar por partes, deu o erro 418 do React (texto do DOM alterado antes da hidratação), e o bloco foi redesenhado (`13-tecnologia-e-estrutura.md`, seção 3.1).
- **Candidatos (RATIFICADO, nada medido):**
  - achar a causa do erro 418 e voltar às fronteiras de `<Suspense>`;
  - carregar a navegação interna e a luz do cursor só no primeiro sinal de interação;
  - adiar também o vidro líquido (a refração), que só serve a ponteiro fino, até o navegador ocioso ou o primeiro ponteiro;
  - as outras melhorias P1 da auditoria técnica de 07.10.2026: o texto do LCP sem esmaecer (seção 5.1), o layout raiz próprio dos sites de exemplo (seção 6), o recorte do Newsreader da nutrição (`05-tipografia.md`, seção 9), a imagem de compartilhamento gerada no build (`opengraph-image.tsx`) e a esfera da capa num `<canvas>` que reaproveite o motor WebGL. As duas últimas são do site do Atlas e ficam no rastreamento (`99-rastreabilidade.md`);
  - diminuir o DOM da página inicial. A fusão de 01.10 levou o HTML de 28 para 38 KB e a soma das tarefas de ~4.300 para ~5.100 ms.
- **Regra até lá:** nenhuma ilha nova no topo da página sem medir o TBT no protocolo.

### 5.15 · A troca de página sem a View Transition do React

- **Regra:** a troca de página é a **entrada por CSS**: a página nova sobe e acende a partir do commit, e a que sai some de uma vez. **Não** o `<ViewTransition>` do React na troca de página. O código está em `13-tecnologia-e-estrutura.md`, seção 3.7, regra 4; as durações, em `09-movimento.md`, seção 8.
- **Objetivo:** a navegação a 60 quadros no celular (seção 2.4).
- **Caso real** (27.10.2026, o site do Atlas, `/` no celular 4×; o rastro com as categorias `blink`, `cc`, `viz` e `gpu`). O toque no vínculo abre uma cadeia de tarefas seguidas, com a tela pausada pela View Transition entre elas:
  1. a captura da página velha: 27,2 ms, com um recálculo de estilo de 18,6 ms em 672 elementos (a página inteira, com os pseudoelementos);
  2. o `update` da transição (`ViewTransition::ProcessCurrentState`): o commit da página nova e uma leitura forçada de leiaute, 43,5 ms;
  3. a captura da página nova: 9,8 ms.

  Somam 83 ms: 5 batidas. Sem a transição, o mesmo commit fica sozinho (30 a 40 ms), e os quadros antes e depois dele saem. Só a ida tem transição; o voltar já era instantâneo. Nas demos, o mesmo mecanismo reprova a navegação no celular (seção 2.4).
- **O que não resolveu** (cada ensaio medido em `/`, `/planos` e `/duvidas`, na mediana de 3):
  - a transição mantida e mais barata (a raiz fora da captura, só opacidade, a saída em 120 ms e a entrada em 400 ms): de 5 para 4 batidas. O custo é a captura e a pausa da tela, que não dependem da animação;
  - as seções poupadas, com a transição intacta (seção 5.17): a captura caiu de 672 para 390 elementos, e o celular ficou em 4 batidas;
  - tudo o que não muda nada visível, junto (o vidro e as seções): a mesa aprovou; o celular 4× ficou em 4 batidas em `/` e `/planos`.
- **A correção medida:** a entrada por CSS, com as seções poupadas (seção 5.17) e o vidro guardado (seção 5.16), aprovou nas seis medidas do ensaio (as três páginas, no celular 4× e na mesa). Nas sete páginas e em quatro sessões, o resultado é o da seção 2.4: muito melhor que hoje, e no limiar da porta.
- **Os cuidados,** cada um achado no Atlas:
  - **O cabeçalho fica fora da caixa animada,** no layout, e sem `<ViewTransition>` em volta dele. Com ele, o React abre uma View Transition só para a barra, e a captura volta.
  - **A entrada só na ida.** Na carga, no voltar, no avançar e na chegada com âncora, nada: a ilha de âncoras mede o destino no primeiro quadro, e o deslocamento o tiraria do lugar. O voltar se guarda pelo caminho a que leva, e não por um sim ou não: um voltar dentro da mesma página não remonta o template, e a ida seguinte perdia a entrada.
  - **Sem `setState` no `useLayoutEffect` da entrada.** Tirar a classe com um novo render adiantava os efeitos da página inteira para dentro do commit: `/planos` no celular 4× foi a [4, 4, 4], e a mesa reprovou em seis páginas. A classe sai direto no elemento.
  - **Nada com `position: fixed` dentro da caixa.** O `transform` da entrada faz da caixa o bloco de referência do `fixed`. Abaixo de 1024 px, a faixa fixa do montador de `/orcamento` ficou fora da tela durante os 700 ms da entrada e apareceu de uma vez no fim (a verificação de 28.10.2026, com os quadros da tela gravados). O que fica preso à tela mora fora da caixa: no layout, ou num portal para o `<body>` (`createPortal`, depois da hidratação, para o HTML servido não mudar). **O portal foi testado na faixa** (28.10.2026): ela sobe com a página porque o site acrescentou à regra da entrada um seletor que a alcança, por um atributo próprio (a base não o traz: quem usa o portal o acrescenta), e sai da página junto com ela. Ao usá-lo, confira a ordem do Tab, que passa a seguir o `<body>`.
  - **Sem preenchimento na animação** (`forwards` ou `both`). Acabada a entrada, a caixa fica sem `transform`; com o preenchimento, o defeito do `fixed` ficaria para sempre.
  - **O que a captura escondia aparece.** A View Transition cobria a tela por centenas de milissegundos; sem ela, o primeiro quadro da página nova se vê. No Atlas, a barra leu o fundo no painel do menu que ainda saía e ficou escura sobre a página clara (corrigido: a leitura ignora a peça que sai, `[data-ending-style]` do Base UI); e a ação flutuante, vinda de uma página rolada, aparece no topo da nova e some em ~150 ms. Confira a troca pelo menu, no celular, quadro a quadro.
- **O que muda para quem visita:** a página que sai deixa de se apagar (150 ms); a nova chega igual, sem esperar a saída; o segundo clique durante a troca passa a valer (a View Transition o engolia); e o navegador sem View Transitions ganha a entrada. No Atlas, a troca foi autorizada pelo usuário em 27.10.2026 ("Trocar a transição").
- **Como conferir:** a régua dos quadros, navegação, no celular 4× e na mesa, contra o build com a transição anterior, em A/B intercalado (`../qualidade/08-desempenho.md`, seção 11); e a gravação da tela na chegada a toda página com algo fixo no conteúdo.

### 5.16 · O que a ilha do layout já calculou, ela guarda; o que pesa, ela faz aos poucos

- **Regra:** a ilha do layout que se refaz a cada troca de caminho (`13-tecnologia-e-estrutura.md`, seção 3.1, regra 6) guarda o resultado caro pela chave do que o determina, e só o refaz quando a chave muda. O cálculo de mais de alguns milissegundos (um mapa por pixel, uma textura, uma medida de texto) vira um gerador, consumido em `requestIdleCallback` enquanto sobrar mais de 1 ms.
- **Objetivo:** a troca de página é o momento mais carregado da linha principal. O que se refaz ali sem ter mudado cai nos quadros da entrada.
- **Caso real** (27.10.2026, o site do Atlas, na mesa). A refração do vidro líquido soltava os filtros a cada troca de página e reassava o mapa de deslocamento:
  - o da barra (1.072 × 52 px): de 7,5 a 16,9 ms só no laço por pixel;
  - em "O Atlas", também o do cartão (728 × 228 px): de 23,9 a 28,0 ms;
  - juntos, uma tarefa de 53,2 ms, 4 batidas.

  Com os mapas guardados pela chave (o tamanho, o raio, a janela e a configuração; a lista se esvazia ao redimensionar a janela), a mesa aprovou em `/`, `/planos` e `/duvidas`, no limite: o cartão ainda se assava na primeira chegada, numa tarefa de 38 a 46 ms. Assado aos poucos, uma linha por passo, aprovou. O mapa é o mesmo, e a refração aparece quando ele fica pronto, como antes.
- **Varia por:** a refração só existe no Chromium, que tem `requestIdleCallback`. Noutro trabalho aos poucos, use o `quandoOcioso` da seção 3.1 de `13-tecnologia-e-estrutura.md`, que tem a reserva de `setTimeout` [NV: o fatiamento sem o prazo do ocioso não foi medido].
- **Como conferir:** o rastro da troca de página, na mesa e no celular: nenhuma tarefa da ilha acima de ~10 ms.

### 5.17 · As seções poupadas (`content-visibility`), só com as quatro condições

- **Regra:** quando a régua dos quadros reprova a navegação pelo commit da página inteira (o estilo e o leiaute de todos os elementos), as seções depois da primeira e o rodapé se poupam: `content-visibility: auto`, com `contain-intrinsic-size: auto <altura típica>`. Só com as quatro condições abaixo, e com a medida que prove o ganho. Fora disso, vale a proibição da seção 5.10.
- **Objetivo:** a seção poupada só recebe estilo, leiaute e pintura perto da tela, e o commit da página nova deixa de calcular a página inteira.
- **Caso real** (27.10.2026, o site do Atlas). A captura de `/` caiu de 672 para 390 elementos, e o commit de `/planos` (778 elementos) deixou de calcular as seções abaixo da dobra. Com a entrada por CSS e o vidro guardado, mas sem as seções poupadas, `/planos` reprovava no celular 4× ([4, 4, 4]; o commit de 34 a 44 ms); com elas, aprovou no ensaio, e nas sessões seguintes ficou no limiar (seção 2.4).
- **As quatro condições,** cada uma de um defeito achado no Atlas:
  1. **As âncoras desenham antes de medir.** A ilha de âncoras põe uma classe no `<html>` que troca a contenção por `visible`, mede, rola, e a tira dois quadros depois; a altura de verdade fica lembrada (o `auto`). Sem isso, o destino caía fora: de `/orcamento` a `/planos#fundacao`, a 390 px, ele ficava a 876 px do topo, abaixo da tela de 844. Era o defeito que levou à proibição da seção 5.10.
  2. **A página abre no topo** (`13-tecnologia-e-estrutura.md`, seção 3.7, regra 9). A página que volta pelo histórico é montada de novo, e as seções acima do ponto onde a pessoa estava ainda valem a altura reservada. Com a restauração do navegador, o voltar ao início, de y ≈ 4.000 para baixo, devolvia a pessoa de 327 a 570 px fora do lugar. Com a página no topo, o voltar abre em y 0, e o defeito deixa de existir (112 chegadas conferidas em 28.10.2026).
  3. **Ficam fora da contenção:**
     - a seção com algo que sobe sobre a de cima (no Atlas, o montador do início, `[data-sobe]`): a contenção recorta o que passa da caixa;
     - a seção com `position: fixed` dentro;
     - a seção que anima ao voltar à tela. Contida, a vitrine de `/para-quem` (um demonstrativo que acende em 600 ms e dois aparelhos inclinados em 3D) travava a rolagem do celular de 130 a 800 ms, sempre no mesmo ponto do gesto; fora da contenção, nenhuma trava ali. O mecanismo não está provado: meça 10 vezes a rolagem de cada página com seção contida (`../qualidade/08-desempenho.md`, seção 11, item 5).
  4. **Os custos aceitos, medidos:**
     - antes de se desenhar, a página é mais alta: na mesa do Atlas, de +631 a +1.808 px na carga, e o polegar da barra de rolagem começa menor (no início, 10,5% da altura, contra 13,3%). Depois de percorrida, a altura é a de verdade;
     - diferenças de sub-pixel na tela parada (o contorno das letras e das fotos deslocado menos de 1 px): até 3,53% dos pixels de uma tela;
     - a seção pesada deixada de fora entra inteira no commit da página dela: no celular 4×, a ida a `/para-quem` passou de 19,9 ms para 35,8 a 43,0 ms.
- **Como fazer** (ajuste os seletores às seções do site):

  ```css
  /* As seções depois da primeira e o rodapé: estilo, leiaute e pintura só perto da tela. Fora, o que sobe sobre
     a seção de cima ([data-sobe]); acrescente as seções que animam ao voltar à tela e as que têm algo fixo. */
  main > section ~ section:not(:has([data-sobe])),
  main ~ footer {
    content-visibility: var(--poupar-secoes, auto);
    contain-intrinsic-size: auto 1000px; /* a altura típica de uma seção; depois de desenhada, vale a de verdade */
  }
  html.ancorando {
    --poupar-secoes: visible;
  }
  ```

  ```ts
  // Na ilha de âncoras, antes de medir o destino (lib/ancoras.ts; 13-tecnologia-e-estrutura.md, seção 3.7):
  const raiz = document.documentElement;
  raiz.classList.add("ancorando");
  requestAnimationFrame(() => requestAnimationFrame(() => raiz.classList.remove("ancorando")));
  ```
- **Como conferir:**
  - a régua dos quadros, navegação e rolagem, com e sem a contenção, em A/B intercalado;
  - as âncoras de todas as páginas, pela carga e por vínculo vindo de outra página, a 390 e a 1440 px, contra o build sem a contenção;
  - o voltar, de uma página rolada até o fim;
  - a tela parada (`../qualidade/07-regressao-visual.md`).

### 5.18 · A navegação pesa pelo commit: o que aliviou

- **Regra:** depois de tirada a captura (seção 5.15), o que resta da troca de página é o commit da página nova, com o estilo e o leiaute que o roteador força. Corta-se o que entra nele, com a régua dos quadros em A/B intercalado, de cinco vezes por célula. O limiar se aceita por decisão escrita, nunca em silêncio.
- **Objetivo:** nas passivas e nos efeitos a culpa parece óbvia, e não é. Sem nenhuma passiva, a navegação medida ficou igual; o peso era o commit: até 442 objetos e 49 ms na ida à página mais pesada, no celular 4×.
- **O que aliviou** (01 e 02.11.2026, no site do Atlas, com a tarefa da pior ida em 46 ms; as duas juntas levaram as células de 5 batidas a 4):
  - **a contenção só durante a entrada.** A seção pesada que não pode ficar sob `content-visibility` para sempre (contida, ela travava a rolagem ao voltar à tela; seção 5.17) fica contida só durante a entrada: `.pagina-entra:not(.pagina-entrou) #secao-pesada`, com a classe `pagina-entrou` posta 1,2 s depois, no próprio elemento, sem `setState` (46 para 36 ms);
  - **as `@font-face` no CSS comum.** A fonte que uma só página usa, declarada só nela, traz uma folha nova na troca de página: `next/font` com `preload: false`, importada do layout, põe a declaração na folha comum sem baixar a fonte antes de ela aparecer (46 para 42 ms).
- **O que enganou:** num primeiro ensaio, conter três seções de uma vez mudou pouco ([5,4] contra [5,5]). A medida por destino (em qual ida está o pior intervalo) é que achou a seção certa.
- **O limiar:** mesmo assim, 6 de 7 páginas de site denso ficaram em 4 batidas, uma além da porta, no celular 4×. A decisão de aceitar isso ou cortar peso é do aprovador.
- **As travas de compositor:** na rolagem, as piores travas (de 18 a 45 batidas) não eram trabalho. No rastro, a linha principal fica parada, e cada quadro vem `STATE_DROPPED`, com `has_compositor_animation: true`, na parada entre dois arremessos, e a tela segue em dia (`piorDaTela` de 1 ou 2 batidas). Três cortes as reduziram, cada um medido com a peça desligada: o gesto de uma vez que disparava ao entrar na tela, no rodapé, saiu; `visibility` e `box-shadow` saíram das transições de faixas fixas (rodam na linha principal); o laço em retratos virou uma passada só no celular. Não se provou quem dispara todas: uma trava intermitente, de causa não isolada, e uma luz em laço que reprova na mesa ficaram registradas, e não escondidas.
- **Como conferir:** a seção 11 de `../qualidade/08-desempenho.md`, e a medida por troca: em qual destino está o pior intervalo.

### 5.19 · Enquanto a página rola, o vidro sai

- **Regra:** a página não fixa a taxa de quadros: ela tira o custo da GPU durante a rolagem. O vidro sob o qual a página passa (a barra do cabeçalho, uma faixa fixa) deixa o `backdrop-filter` enquanto a página rola e fica numa tinta densa do mesmo tom, a ~0,94 de opacidade, sem transição. Parada a página, o vidro volta pela transição de sempre.
- **Objetivo:** o desfoque é uma passada a mais da GPU a cada quadro. A régua dos quadros não o vê, porque só freia a linha principal (`../qualidade/02-regua.md`, seção 12, "O que ela não vê"); a GPU do celular paga.
- **Como fazer** (no site do Atlas: `components/ilhas/cabecalho-retratil.tsx` e `app/vidro.css`, procure "rolando"):
  1. **O atributo no próprio `<header>`, e não no `<html>`.** No `<html>`, cada começo e cada fim de rolagem recalculavam o estilo de 400 a 900 elementos, de 3 a 8 ms na mesa; no `<header>`, de 33 a 57, ~1 ms.
  2. **O fim pelo `scrollend`, 400 ms depois.** A roda do mouse dá um `scrollend` a cada entalhe; sem a espera, o vidro piscava entre um entalhe e outro. Só um prazo sem eventos de rolagem não basta: com a GPU sobrecarregada, os quadros e os eventos se espaçam além da espera, e o vidro voltava no meio do gesto. Sem `scrollend` (o Safari antigo), a parada é o silêncio de 200 ms.
  3. **Nenhuma transição durante a rolagem,** na barra e no que há dentro dela. A troca de tom com transição repintava a barra na linha principal a cada emenda de seção, e o texto passava por um tom intermediário ilegível.
  4. **A tinta de cada tom é a cor que o vidro dá sobre o fundo liso daquele tom,** para a troca não se notar.

  ```css
  /* Um background-color por tom do cabeçalho; .barra é a superfície de vidro. */
  header[data-rolando] .barra {
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    background-color: rgb(10 29 50 / 0.94);
  }
  header[data-rolando] :is(.barra, .barra *) {
    transition: none !important;
  }
  ```

  ```ts
  // Na ilha do cabeçalho (cabecalho: o <header>). Remova os dois ouvintes ao desmontar.
  const comFim = "onscrollend" in window;
  let parada = 0;
  const parar = () => cabecalho.removeAttribute("data-rolando");
  window.addEventListener("scroll", () => {
    window.clearTimeout(parada);
    if (!cabecalho.hasAttribute("data-rolando")) cabecalho.setAttribute("data-rolando", "");
    if (!comFim) parada = window.setTimeout(parar, 200);
  }, { passive: true });
  window.addEventListener("scrollend", () => {
    window.clearTimeout(parada);
    parada = window.setTimeout(parar, 400);
  });
  ```
- **O vidro que não se vê sai de vez.** Sobre fundo liso que anda junto com o controle, o desfoque não muda a tela e custa a mesma passada. No Atlas, os segmentos de vidro no fluxo diferiam de `blur(20px) saturate(170%)` em até 3 níveis de 255, e o desfoque saiu deles em 03.11.2026 (`app/vidro.css`, "vidro").
- **Caso real** (02 e 03.11.2026, o site do Atlas): numa GPU fraca, na mesa, de 25–27% para 69–80% das batidas em dia (`app/vidro.css`); no rastro, o tempo de GPU na rolagem caiu 60% a 1440 px e 77% a 390 px (commit `2029e99`).
- **Como conferir:** a rolagem com a categoria `gpu` no rastro, com e sem o atributo, em A/B intercalado; a captura do cabeçalho parado sobre cada tom, para a tinta casar com o vidro; e o aparelho real (`../qualidade/08-desempenho.md`, seção 8).

---

## 6. Os custos conhecidos

O que está acima da meta, ou nunca foi medido, no repositório do Atlas em 08.10.2026. Num site novo, os mesmos riscos existem: meça-os desde o primeiro rascunho.

| Custo | Medida | Causa | O que fazer | Estado |
|---|---|---|---|---|
| **TBT com CPU 20× acima de 300 ms** | 716 ms de mediana no início (357 a 1.089), em 03.10; 1.340 a 1.729 ms nas páginas da fase do celular, em 01.10 | A hidratação do React (seção 5.14) | Os candidatos da seção 5.14 | PENDENTE |
| **LCP simulado acima de 2,5 s** no perfil padrão | 2,71 a 3,46 s | A simulação de rede põe as fontes pré-carregadas no caminho; o real fica em 2,11 s | Decidir pelo LCP real; acompanhar | Aceito |
| **CLS de 0,1 intermitente** com CPU 20× | 1 execução em 7, com e sem o Spell UI | Desconhecida. Candidatas: a troca de fonte e a esfera da capa numa carga em partes | Investigar com o rastro da execução que desloca | A investigar |
| **INP** | Nunca medido | — | O procedimento da seção 4.6 | A CONFIRMAR |
| **Partida a frio do web app Node** | Nunca medida | A Hostinger roda os apps Node "sob demanda": o processo para sem tráfego [FU] | Medir o primeiro byte depois de uma pausa longa (`18-publicacao-e-manutencao.md`, seção 5) | A CONFIRMAR |
| **3D da barbearia depois da nitidez** | Até ~2,4× mais pixels na placa de vídeo; Lighthouse não remedido | Resolução da tela até 2× | Remedir no protocolo e num celular real | PENDENTE |
| **Transição de página acima de 400 ms** | 160 ms de espera e 700 ms de entrada | A coreografia de 01.10 | Decidir em `09-movimento.md` | A decidir |
| **Inter nos aparelhos da Apple** | 22,4 KB baixados sem uso | A pré-carga não sabe o aparelho | Nenhuma | Aceito |
| **Textos da página no pedaço do menu** | Pequeno, não medido; o pedaço sob demanda inteiro tem 34,5 KB comprimidos (auditoria técnica de 07.10.2026) | O painel do menu importa um campo de `conteudo/site.ts` | Importar só de `conteudo/contato.ts` (`13-tecnologia-e-estrutura.md`, seção 3.2) | PENDENTE |
| **Folha global em todas as páginas** | 139 KB crus, 24,6 KB comprimidos, nas 23 páginas, inclusive nas 16 dos sites de exemplo (auditoria técnica de 07.10.2026) | Os sites de exemplo moram sob o layout raiz do Atlas e herdam a folha e a fonte dele | Um layout raiz próprio para cada site que divide o app (`05-tipografia.md`, seção 4.1) | PENDENTE |
| **HTML com a carga do React** | 117 KB crus no início, dos quais ~70 KB (59%) são a carga RSC embutida (auditoria técnica de 07.10.2026) | O Next embute os dados da página para a hidratação | Menos ilhas e props menores (seção 5.2); medir o HTML antes e depois | Acompanhar |
| **A navegação do Atlas no limiar dos 60 quadros** | Com as correções das seções 5.15 a 5.17, só 5 das 14 portas de navegação aprovam em quatro sessões; as outras, 3 a 4 batidas. Sem elas (o site de hoje), 4 ou 5 batidas | Na ida, o commit da página nova e o estilo e o leiaute forçados pelo roteador do Next; no voltar, o render síncrono do React | Decidir com o aprovador. Candidatos, não medidos: menos elementos por página; `scroll={false}` nos vínculos (o leiaute forçado só mudaria de lugar) | PENDENTE |
| **O site novo além da base** | A base aprova a navegação (seção 2.4), mas cada página real acrescenta peso ao commit | O commit da página nova (seção 5.18) | Medir a navegação a cada página; os cortes da seção 5.18 | Acompanhar |
| **Leitura de tons do cabeçalho ao rolar** | 13 chamadas de `elementsFromPoint` e cadeias de `getComputedStyle` até a cada 80 ms durante a rolagem (auditoria técnica de 07.10.2026); ~12 ms por leitura com a CPU 4×, o maior script da rolagem do início, sem derrubar quadros (régua dos quadros, 22.10.2026) | O cabeçalho infere os tons que as seções já declaram em `data-tom` | Trocar por um `IntersectionObserver` sobre os `[data-tom]` (`06-cor-forma-e-superficie.md`, seção 10) | PENDENTE |

---

## 7. Conferência rápida

Antes do rascunho e antes da publicação (o ciclo completo está em `../qualidade/14-ciclo-de-qa.md`):

- [ ] `npm run build && npm start`; nada medido no `next dev`.
- [ ] Régua sem falha no bloco 5: nos sites de marca, o peso relatado, sem teto (no Atlas, 180 KB, 90 KB e 1,5 MB); CLS ≤ 0,05, zero pedido externo, zero erro.
- [ ] A barreira do travamento sem falha (régua, passagem 2b). No site do Atlas, também o Lighthouse no protocolo (seção 4.3): LCP com CPU 20× ≤ 2,5 s; TBT anotado, com a comparação à base quando houver mudança de script.
- [ ] A régua dos quadros sem falha (seção 2.4): a rolagem, o menu, a navegação e a figura, no celular 4× e na mesa, em duas sessões separadas; os avisos do 6× lidos e registrados.
- [ ] Notas do perfil padrão: Desempenho ≥ 90; Acessibilidade, Boas práticas e SEO = 100 (SEO 66 só em **[ex]**). Abaixo de 90, a causa fica registrada.
- [ ] A maior imagem da primeira tela com prioridade; as outras preguiçosas, com dimensão.
- [ ] Nenhuma fonte de outro site pré-carregada; nenhuma fonte de servidor externo.
- [ ] Nenhum script escrevendo estilo a cada quadro; o ambiente pausa fora da tela.
- [ ] O vidro sob o qual a página passa deixa o desfoque enquanto ela rola (seção 5.19).
- [ ] **[C]** 3D: carga por partes, reserva sem WebGL, resolução ajustada, TBT medido no perfil de computador e no de celular.
- [ ] Depois de publicar: Lighthouse e primeiro byte no endereço real (`18-publicacao-e-manutencao.md`).
- [ ] As medidas registradas no `README.md` ou no `decisoes.md` do cliente, com data, máquina e commit.

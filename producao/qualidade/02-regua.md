# 02 · A régua

> **Para que serve.** A régua é a verificação automática que toda página de um site do Atlas passa antes de publicar. São dez blocos, medidos no Chrome contra o build de produção. Este documento diz o que ela mede, com que limite, por quê; como rodá-la e ler o resultado; como foi calibrada; e **como levá-la para um repositório novo**.
>
> **Estado.** DECIDIDO: em uso desde 07.10.2026, por escolha do usuário entre três leituras de "na parte da régua, atualize o gerador para o estado atual de decisão de desenvolvimento". O código fica em `web/ferramentas/regua/`, no repositório do Atlas, com README próprio. Substitui, para os sites em Next.js, o `demos/producao/verificar.py`, que media os doze demos estáticos de arquivo único e cobria só seis dos dez blocos. **A régua dos quadros** (`quadros.mjs`, seção 12), o ritmo de 60 quadros por segundo, roda à parte desde 22.10.2026 e é porta de entrega de todo site desde 28.10.2026 (`../esteira/15-desempenho.md`, seção 2.4).

---

## 1. O que é, em uma página

| Pergunta | Resposta |
|---|---|
| **O que mede?** | O que o navegador **desenha**: geometria, degradação, semântica, contraste nos pixels, teclado, orçamento da carga, composição, paridade, conformidade e registro verbal |
| **Contra o quê?** | O site **compilado**: `npm run build && npm start`, ou o `server.js` standalone. **Nunca** o `next dev`, que tem outro script, outro CSS e o indicador de desenvolvimento |
| **Em que navegador?** | O Chrome instalado na máquina, pelo Playwright (`channel: "chrome"`), sem janela |
| **Quanto demora?** | ~5 min nas 23 páginas do repositório do Atlas (265 s na rodada final de 08.10.2026); a rápida, sem contraste e sem teclado, ~3× menos |
| **O que devolve?** | Um resumo no terminal; o relatório inteiro em `.regua/relatorio.json` (fora do git); **código de saída 1 se houver falha** |
| **Falha ou aviso?** | Falha é defeito: reprova a página. Aviso é medida para olhar: quem revisa decide e registra (`01-metodologia.md`, seção 4) |

**Objetivo.** Provar o piso de qualidade de toda página, do mesmo jeito, toda vez. A régua existe porque "instrução em arquivo é pedido; verificação é garantia". Antes dela, o projeto conferia à mão, e o que não se conferia não se via:
- os sites de exemplo sem marcação de compartilhamento;
- a rolagem lateral em 320 px;
- o laranja do depósito sobre o quadriculado.

---

## 2. Como rodar

```bash
# Dentro da pasta do site (no repositório do Atlas, web/).
npm run build && npm start               # num terminal: o site compilado, porta 3000
npm run regua                            # noutro: todas as páginas

npm run regua -- --pagina=/planos --pagina=/demos/barbearia   # só estas (repita a opção)
npm run regua -- --rapida                # sem contraste e sem teclado (os blocos lentos)
npm run regua -- --base=http://localhost:3100                  # outro endereço
npm run regua -- --paralelo=2            # quantas páginas ao mesmo tempo (padrão: 3)
```

| Opção | Efeito | Quando usar |
|---|---|---|
| `--base=URL` | Mede outro endereço; o padrão é `BASE` do ambiente, ou `http://localhost:3000` | Servidor noutra porta; conferência no endereço publicado |
| `--pagina=/x` | Só as páginas dadas | A cada mudança, nas páginas tocadas |
| `--rapida` | Pula o contraste (bloco 4) e o teclado | Iteração rápida; **nunca** na porta de rascunho ou de publicação |
| `--paralelo=N` | N páginas ao mesmo tempo | Menos em máquina fraca; o contraste e o teclado ficam mais estáveis com 1 ou 2 |

**No sandbox do Claude Code, o Chrome não abre.** A régua roda com o sandbox desligado, e a memória do projeto registra isso. **Objetivo:** ninguém perde meia hora achando que a régua quebrou.

---

## 3. Como ela descobre as páginas

1. **Lê o `sitemap.xml`** e fica com o caminho de cada `<loc>` (o mapa traz o domínio de produção).
2. **Segue os vínculos internos** (`href="/…"`) do HTML de cada página encontrada, até não haver página nova. **Objetivo:** os sites de exemplo ficam fora do mapa, por serem `noindex`; só o mapa esqueceria 16 páginas.
3. **Ignora** arquivos com extensão, `/_next` e `/ferramentas`, a rota de desenvolvimento que desenha as telas da vitrine.

**Varia por.** Num repositório de cliente com outra rota só de desenvolvimento, acrescente-a à lista de ignorados (seção 9).

---

## 4. As cinco passagens por página

Cada página é aberta cinco vezes, cada uma num contexto limpo do navegador. A passagem do aparelho médio entrou em 08.10.2026, com o passe do celular (`../esteira/00-principios.md`, seção 5), e mede a barreira do travamento desde a mesma noite.

| Passagem | Janela | Preferências | Blocos | Por que assim |
|---|---|---|---|---|
| **1 · Carga** | 1440 × 900 | Movimento normal, sem cache | Orçamento (5), semântica (3), conformidade (9), registro (10), inventário da mesa (7) | A carga se mede como o visitante a recebe: movimento normal, primeira visita |
| **2 · Toque** | 390 × 844, celular com toque | Movimento reduzido | Composição no celular (6), degradação com movimento reduzido (2), paridade (7), contraste a 390 (4), geometria em onze larguras de 320 a 1024 e no celular deitado, 844 × 390 (1); o que fica preso à tela deitada (6) | O celular é a prioridade; o movimento reduzido tira o acaso da animação |
| **2b · O aparelho médio** | 390 × 844, celular com toque | "4G lento" e CPU 4× (o "Mid-tier mobile" do DevTools), movimento normal | **A barreira do travamento** (5): as tarefas longas na carga e numa rolagem da página inteira, os quadros da rolagem, o LCP; os bytes, só medidos | Só se age quando a página trava até num aparelho médio (Gabriel Ribeiro Ota Yida, 08.10.2026: "o tamanho do site não importa, e sim só seu design") |
| **3 · Mesa** | 1440 × 900 | Movimento reduzido | Composição na mesa (6), geometria em 1280, 1440 e 1920 (1), contraste a 1440 (4), teclado (4) | Teclado e foco se testam com ponteiro fino; o movimento reduzido estabiliza as fotos |
| **4 · Sem script** | 390 × 844 | JavaScript desligado | Degradação sem script (2) | O HTML do servidor precisa bastar |

**Antes de qualquer script da página**, a régua instala dois vigias: um ouvinte de `securitypolicyviolation` (violação da política de conteúdo) e um `PerformanceObserver` de `layout-shift` (o CLS, sem os deslocamentos causados pelo próprio visitante).

---

## 5. Os dez blocos

### Bloco 1 · Geometria (`sondas.mjs`, `geometria`)

| Verificação | Classe | Detalhe |
|---|---|---|
| Rolagem lateral | Falha | `scrollWidth − clientWidth > 0`, em 14 larguras: 320, 360, 375, 390, 414, 430, 480, 600, 768, 820, 1024 (toque) e 1280, 1440, 1920 (mesa) |
| Elemento que sai da tela | Falha | Borda além da janela, exceto: posição fixa; invisível (não desenhado ou opacidade < 0,05); dentro de algo que rola ou recorta (`overflow-x` diferente de `visible`, `contain: paint/strict/content`, `clip-path`) |
| Alvo de toque menor que 44 px | Falha | Só nas larguras de toque (até 1024). Mede a **altura** (< 43,5 px). Exceção: o vínculo no meio do texto corrido (WCAG 2.5.8), detectado quando o bloco em volta tem mais texto que o próprio vínculo |
| No celular deitado (844 × 390): rolagem lateral, elemento que sai da tela, alvo menor que 44 px | Aviso | A mesma geometria das larguras de pé, numa tela baixa. Aviso desde 08.10.2026, até as dez rodadas da seção 10 |
| Rótulo de controle em mais de uma linha | Aviso | Controle fora do texto corrido (`display` diferente de `inline`), com rótulo de até 40 caracteres e sem quebra própria, desenhado em mais de uma linha, em qualquer das 14 larguras. As linhas se contam pelos retângulos de cada pedaço de texto (`Range.getClientRects`), sem o texto só para leitor de tela. Um aviso por elemento, com a primeira largura em que partiu. Achado do teste de 08.10.2026: a ação do cabeçalho, numa fonte mais larga, partia em duas linhas, e só a captura mostrava |

**Objetivo.** O celular é a prioridade, e o celular estreito (320 px) é onde o conteúdo quebra: palavras longas, preços grandes, códigos de barras. A galeria de deslizar e a faixa não contam: estão contidas de propósito.

**Limite conhecido.** A régua mede só a altura do alvo; a largura fica com o axe e a revisão (`06-acessibilidade.md`).

### Bloco 2 · Degradação (`ocultos`)

| Verificação | Passagem | Classe |
|---|---|---|
| Texto invisível (opacidade efetiva < 0,05) dentro do `main` | 2 (movimento reduzido) e 4 (sem script) | Falha |
| Animação sem fim rodando | 2 (movimento reduzido) | Falha |
| h1 que não aparece | 4 (sem script) | Falha |
| Nenhum vínculo interno visível | 4 (sem script) | Falha |

**Objetivo.** Server Components por padrão: a página existe sem script, e nada some nem se move sem fim com movimento reduzido (WCAG 2.2.2 e 2.3.3).

**Como evita alarme falso.** A régua **espera as entradas terminarem**: as animações finitas, até 5 s, antes de julgar. Sem isso, um texto ainda no atraso da entrada de CSS parecia "invisível sem script" (calibração, seção 6).

### Bloco 3 · Semântica (`semantica`)

| Verificação | Classe |
|---|---|
| A página responde 200 | Falha |
| Exatamente um h1 | Falha |
| O h1 lido (sem as cópias decorativas `aria-hidden`, com espaço entre blocos) igual ao desenhado | Falha |
| `lang` em português | Falha |
| `<title>`, `meta description`, `og:title`, `og:description`, `og:image` presentes | Falha |
| `og:image` abre (responde 200) | Falha |
| Título ou descrição iguais aos de outra página do **mesmo site** (agrupados pelos dois primeiros segmentos do caminho) | Falha |
| Imagem sem `alt` | Falha |
| `id` repetido | Falha |
| Âncora `#…` sem destino | Falha |
| Controle sem nome acessível | Falha |
| Campo sem rótulo | Falha |
| Salto de nível nos títulos (h2 → h4) | Aviso |

**Objetivo.**
- **As marcações de compartilhamento:** o vendedor manda o endereço pelo WhatsApp, e sem elas o cartão chega cru.
- **O título que se compõe e a tarja:** põem cópias decorativas dentro do h1; o leitor de tela precisa ouvir exatamente o que a tela mostra.
- **A imagem de compartilhamento** pode se repetir dentro de um site: é decisão do projeto.

### Bloco 4 · Contraste (`contraste.mjs`) e teclado (`teclado.mjs`)

**Contraste, medido no que se vê.** Nas passagens 2 e 3, tela por tela (paradas a cada 60% da altura da janela):

1. **Lista os textos inteiros na tela** e não medidos ainda, com estas condições:
   - **Nada os cobre:** no centro de cada linha, o elemento por cima, pelo `elementFromPoint`, é o próprio texto ou um filho dele. O que não recebe o ponteiro (grão, halos) fica no fundo fotografado, como o olho vê.
   - **Cor convertida pelo `canvas`:** o Tailwind 4 calcula as cores em `oklab`, e ler os números do `getComputedStyle` como RGB dava resultados absurdos.
2. **Fotografa a tela com texto,** injeta um estilo que torna transparente a cor de todo texto (e desliga as transições) e **fotografa de novo**, só o fundo.
3. **Mede onde o texto está desenhado:** nos pixels que mudam mais de 60 (soma dos três canais) entre as duas fotos. Se forem menos de 6, usa todos os pixels da caixa.
4. Em cada pixel, compõe a cor do texto (com a opacidade dele e a dos ancestrais) sobre o fundo e calcula a razão de contraste do WCAG.
5. Vale o **pior trecho** (o 5º percentil), contra **4,5:1** no texto comum e **3:1** no grande (≥ 24 px, ou ≥ 18,66 px em negrito), com tolerância de 0,05.

**O texto misturado ao fundo mede a cor desenhada** (desde 16.10.2026, decisão do aprovador, Matheus Castro Oliveira de Luna Garcia: "Corrigir a régua"). Quando o texto, ou um ancestral até a `section`, tem `mix-blend-mode` diferente de `normal`, a cor declarada não é a que chega à tela: o branco por diferença sobre a cerâmica clara desenha quase preto. Nesse texto, os passos 4 e 5 mudam:

1. **A razão é pixel a pixel**, entre a foto com o texto (a cor desenhada) e a foto sem ele (o fundo, com `color` e `-webkit-text-fill-color` transparentes e sem sombra). A cor declarada não entra na conta.
2. **Só no miolo das letras.** A decisão do aprovador diz: "a metade dos pixels que mais mudam entre as duas capturas". **O código roda outra conta, uma proposta de Claude Code (16.10.2026) que aguarda a aprovação de Matheus Castro Oliveira de Luna Garcia:** a metade dos pixels que a letra mais cobre. A cobertura vem de mais duas fotos, só nas telas com texto misturado: a letra sem mistura, toda em preto e toda em branco. A diferença das duas é a cobertura de cada pixel, qualquer que seja o fundo.
   - **Por que a proposta:** onde a mistura apaga a letra, nada muda entre a foto com e a sem o texto, e a parte apagada sairia da conta.
   - **A prova, na autoconferência:** uma palavra branca por diferença, metade sobre o branco e metade sobre o cinza `#808080`. Pela mudança, ela aprova com 21:1, embora a metade dela não se veja. Pela cobertura, ela reprova com 1,01:1.
   - **Se a proposta for recusada,** o miolo volta a ser o da decisão (`contrasteDesenhado`, em `contraste.mjs`, diz como).
3. **Vale o 10º percentil do miolo**, contra o mesmo mínimo do tamanho (4,5:1 ou 3:1). O mínimo absoluto não serve: ele acusaria os pixels soltos da emenda da textura e da junção das letras.
   - **A folga é de cerca de 10% da letra, o dobro da do texto comum** (o 5º percentil, cerca de 5%). Pela cobertura, um trecho apagado ocupa no miolo a mesma fração que ocupa na letra. Na autoconferência, "Odontologia" a 48 px com 10% da largura sobre o cinza perde o "a" final por inteiro e **aprova com 21:1**; com 12%, reprova.
   - **O 5º percentil daria a folga do texto comum, mas reprova a inicial da odontologia a 390 px:** o "a" do título mede 2,60:1 no 5º percentil, 4,87:1 no 10º e 6,01:1 no 25º (a borda da placa passa sobre o traço de cima da letra; 6,4% do miolo fica abaixo de 3:1).
   - **A escolha entre o 5º e o 10º aguarda Matheus Castro Oliveira de Luna Garcia** (16.10.2026). Até lá, o 10º, o que o pedido da decisão sugeria.
4. **Sem medida, conferência à mão, nunca aprovação.** O aviso diz a largura e o elemento em três casos:
   - o texto misturado que nunca aparece inteiro e descoberto numa tela (fora dela, coberto ou sem linha com tamanho);
   - o que fica com menos de 12 pixels cobertos;
   - o texto misturado numa caixa de 1 px ou menos que transborda à vista (`overflow: visible`): a caixa não se mede, mas a letra se desenha.
   - **Fica fora da conta, sem aviso,** a caixa de 1 px ou menos recortada, como todo texto não desenhado (o só para leitor de tela). A caixa se mede na tela e sem a transformação (`offsetWidth`): dentro de um ancestral girado, a caixa de 1 px mede 1,05 na tela (o carimbo do depósito, `.dp-carimbo`, com `rotate: -3deg`).
   - **A mistura se lê a cada tela**, e não uma vez só: ela pode ligar depois da primeira tela (a revelação ao rolar, o `html[data-palco]` que o motor da odontologia põe mais tarde).
5. **O relatório traz cada medida** em `medidas.contrasteCelular.desenhados` e `medidas.contrasteMesa.desenhados`: o elemento, a razão e o mínimo.

**O texto das figuras** (desde 17.10.2026, "o Atlas Digital"; `DIRECAO-DIGITAL.md`, seção 5). O caminho de cima pula o texto decorativo (em `svg`, em `canvas` ou `aria-hidden`), e é ali que mora a metade digital: as leituras vivas, os rótulos das cartas, a chapa da carga. Ele se mede à parte, pelo método do juiz J3 da direção:
1. **O que entra:** o `<text>` de todo SVG (com os `tspan`), o texto próprio de todo bloco `aria-hidden` e o número em meio-tom (o `canvas` do valor da leitura, `.vd-leitura canvas.valor`). O `fillText` de outro canvas não está no DOM: conferência à mão.
2. **A cobertura:** o rótulo de figura costuma não receber o ponteiro (`pointer-events: none`), e o `elementFromPoint` o daria por coberto sempre. Cobre o que fica preso à tela (`fixed` e `sticky`), com os 32 px da sombra do atalho (calibração n.º 19). O indicador do `next dev` fica fora das fotos (n.º 20).
3. **A conta do texto:** a cor declarada (com a opacidade dos ancestrais e o `fill-opacity`) sobre o fundo fotografado sem o preenchimento da letra, nos pixels que mudam, no 5º percentil, contra 4,5:1 ou 3:1. No SVG, o corpo é o desenhado, na escala da `viewBox`.
   - **O contorno e a sombra ficam no fundo.** O "halo de carta" (o contorno na cor do fundo, `paint-order: stroke`) é o fundo da letra. O J3 apagava também o contorno, e então media a letra contra o desenho que o halo esconde: na autoconferência, a letra branca com halo preto sobre o branco dava 1:1.
4. **A conta do meio-tom, pela média da cobertura** (como o lê quem tem baixa visão; direção, 2.1). Entram os pixels em que os pontos se desenham (os que mudam entre a foto com o canvas e a sem ele), fechados em 1 px: o vão entre os pontos entra, e a borda de fora não cresce. Vale a luz média deles, em luz linear, com o canvas e sem ele. O mínimo é o do texto grande, porque o meio-tom só existe de 24 px de maiúscula para cima.
5. **A autoconferência** ganhou oito casos e soma 23 verificações: o preto e o cinza em SVG, o halo de carta, o bloco `aria-hidden` em HTML, a escala da `viewBox`, a letra na cor do fundo, e o meio-tom na tela (6,70:1, a conta da direção para a cobertura de 0,48) e no papel (1,78:1).
6. **O relatório traz cada medida** em `medidas.contrasteCelular.figuras` e `medidas.contrasteMesa.figuras` (`medidas`, `abaixo`, `semMedida`).

| Situação | Classe |
|---|---|
| Abaixo do mínimo | Falha |
| Texto misturado ao fundo (`mix-blend-mode`) abaixo do mínimo, na cor desenhada | Falha, com a mistura escrita na mensagem |
| Texto misturado ao fundo sem medida nos pixels (nunca inteiro e descoberto, sem miolo, ou na caixa de 1 px que transborda à vista) | Aviso: conferir à mão, a 390 e a 1440 px |
| Texto com cópia decorativa por cima (os gestos do Spell UI: a tarja, a onda, o brilho), pintado por degradê (`background-clip: text`) ou com desenho no próprio fundo (o risco das ausências da barbearia) | Aviso: conferir à mão |
| Texto que nunca aparece inteiro e sem cobertura em nenhuma tela | Contado como "sem medida" no relatório |
| Texto de figura (em SVG, em bloco `aria-hidden` ou o meio-tom) abaixo do mínimo | Aviso, até a calibração (seção 10); a primeira rodada é de 17.10.2026 |
| Meio-tom sem pontos desenhados na tela em que se mediu | Listado nas medidas das figuras: conferir à mão |

**Objetivo.** "Contraste medido no que o navegador desenha, não calculado do hexadecimal", inclusive sobre degradê, imagem, vidro e WebGL. É obrigação legal (Lei 13.146/2015, art. 63; WCAG 2.2 AA, 1.4.3).

**Teclado.** Na passagem 3, até 60 paradas de Tab. O teto segura o tempo da rodada, porque cada parada são duas fotos; a página com mais paradas fica com o resto sem conferir, e o relatório registra quantas houve (`teclado`, seção 8):
- **Foco sem marca visível: falha.** Para cada elemento focado, a régua fotografa um recorte com 8 px de margem com foco e sem foco (tira o foco, fotografa, devolve). Fotos iguais, pixel a pixel, acusam o defeito. Vale qualquer marca: contorno, sombra, cor, sublinhado, a do pai.
- **Armadilha de foco: falha.** Seis paradas seguidas em elementos já visitados: o foco parado ou andando em círculo. O campo de data recebe um Tab por parte (dia, mês, ano) sem trocar de elemento; por isso o limite é de seis, com folga.
- **Foco encoberto: aviso** (WCAG 2.4.11). Em cada parada, a régua alinha o elemento ao topo da janela, como o navegador faz no Shift+Tab, e pergunta ao `elementFromPoint` quem está por cima. O cabeçalho fixo por cima acusa a falta de `scroll-padding-top` no `html`. Achado do teste de 08.10.2026: a base não o tinha, e o roteiro de teclado de `06-acessibilidade.md`, seção 4, o reprovava.

### Bloco 5 · Orçamento (`regua.mjs`)

| Medida (carga inicial, KB transferidos, comprimidos) | Atlas | Sites de marca (cliente e exemplo) | Classe |
|---|---|---|---|
| Script: os `<script>` do HTML, sem o polyfill `nomodule` (o Chrome não o baixa) | 180 | sem teto | Falha no Atlas; nos sites de marca, só medida |
| Fontes chegadas até 2 s depois do `load` | 90 | sem teto | Idem |
| Total chegado até 2 s depois do `load`, sem rolar | 1.500 | sem teto | Idem |
| CLS na carga | 0,05 | 0,05 | Falha |
| CLS ao rolar a página inteira | 0,05 | 0,05 | Aviso |
| **A barreira do travamento** (passagem 2b, no aparelho médio): a maior tarefa da página, na carga ou ao rolar | 1 s | 1 s | Falha |
| A barreira: o bloqueio somado na carga (a soma do que passa de 50 ms em cada tarefa longa, até 3 s depois do `load`) | 3 s | 3 s | Falha |
| A barreira: os quadros acima de 100 ms numa rolagem da página inteira em 4 s | 10% | 10% | Falha |
| A barreira: a primeira tela (LCP) | 10 s | 10 s | Falha |
| Pedido a outro domínio | 0 | 0 | Falha |
| Resposta com erro (≥ 400) ou pedido que falhou | — | — | Falha (`net::ERR_ABORTED` é aviso: pré-carga abortada) |
| Erro de página ou de console | — | — | Falha |
| Violação da política de conteúdo | — | — | Falha |
| Cookie, `localStorage` ou `sessionStorage` | 0 | 0 | Falha |

**Por que estes tetos.**
- **Script:** o piso do Next 16 com React 19 é ~131 KB; o início do Atlas mede 155,3 KB.
- **Fontes no Atlas, 90 KB:** as três famílias do site de 28/08 (~52 KB: Archivo Black, Archivo e Inter; decisão de 05/10, mantida pelo usuário em 08/10) e, em Para quem, as fontes de título dos dois nichos da vitrine (~31 KB). Com San Francisco e Inter (~23 KB), o teto era 60 KB (calibração n.º 13).
- **Os sites de marca, sem teto** (08.10.2026, mais tarde, pedido do usuário: "retire limites de tamanho"; antes, 600 KB de script, 300 KB de fontes e 5 MB na carga, e até então 180, 200 e 1.500): `ORCAMENTOS.marca` ficou vazio, e o peso se relata em `medidas.carga`. Na calibração da mesma noite, o exemplo de odontologia carregava 411 KB, mais que a barbearia (341 KB): o peso não era o que o afastava do premium (`../esteira/00-principios.md`, seção 9). O que reprova continua sendo a experiência: o CLS, o erro, o pedido externo.
- **Privacidade:** nenhum pedido externo nem gravação no aparelho é promessa do Atlas (conformidade).

**O site é "Atlas" ou "marca"** pelo caminho: tudo sob `/demos/` é marca. Num repositório de cliente, o site inteiro é marca (seção 9).

### Bloco 6 · Composição (`composicao`)

| Verificação | Classe |
|---|---|
| No celular (390 × 844), nenhuma ação termina até 60% da altura da primeira tela | Aviso |
| Mais de 16 telas de altura no celular | Aviso |
| Na mesa, nenhuma ação na primeira tela | Aviso |
| **A capa sem momento de exibição:** nos sites de marca, na capa (`/`, ou `/demos/<site>` no Atlas), o h1 com menos de 4 vezes o corpo, na mesa | Aviso, desde 08.10.2026, à noite (`../esteira/05-tipografia.md`, seção 6.3; P1 de `../esteira/11-anti-ia.md`). Calibrado na mesma noite: a odontologia, com 2,33, avisa; a barbearia (8,48), a nutrição (8,03), o depósito (7,02) e a base (6,13), não |
| A razão entre o corpo do h1 e o corpo mais frequente dos parágrafos | Só medida, no relatório. O "mais frequente" pesa pelo texto: numa capa de muitas notas curtas, a razão sai maior que a do corpo do site (2,33 contra 1,94, no teste de 08.10.2026). Leia junto com o corpo do `identidade.md` |
| No celular deitado, o que fica preso à tela (cabeçalho, atalho, barra) cobre mais de 35% da altura, medido no meio da página | Aviso. A sonda `presos` soma o que fica preso no alto e embaixo, sem os fundos da página inteira nem o que não recebe o ponteiro. A base de fábrica dá 17% |
| Linha de texto corrido acima de 80 caracteres, na mesa (1440 px) | Aviso. Conta letra a letra o que o navegador desenha, em até 40 parágrafos e itens de lista com mais de 100 caracteres, fora a última linha de cada um. O `ch` não é caractere (`../esteira/05-tipografia.md`, seção 8) |
| A fonte usada com `tabular-nums` num texto com algarismos (o preço, o horário, o telefone), sem o recurso `tnum` | Aviso. "1111" e "0000" em `tabular-nums`, a 40 px, na família, no peso e no estilo do elemento, com larguras diferentes. A família que não leva número com `tabular-nums` fica de fora: na primeira versão, a régua acusava a fonte de título da base, que não leva número. Uma vez por rodada, depois de recarregar a página: a fonte `optional` vem então do cache, e a medida não fica na fonte do sistema |

**O que conta como ação:** vínculo ou botão desenhado, visível, habilitado, fora de `nav` e `footer`, que não seja o logotipo nem um controle do próprio site (menu, índice, fechar, pausar ou retomar animações).

**Objetivo.** A ação na primeira tela converte: o que está acima da dobra recebe 57% do tempo de olhar (NN/g) [V]. É aviso porque há páginas informativas em que a ação está no menu por decisão de desenho.

### Bloco 7 · Paridade (`inventario`)

Compara os títulos (h1 a h3), os vínculos e os botões do `main` na mesa (passagem 1) com os do celular (passagem 2). **O que existe na mesa e não existe no celular: aviso** (até cinco exemplos).

**Objetivo.** O celular não perde nada da mesa. O defeito histórico: o registro profissional sumia do cabeçalho abaixo de 480 px em onze dos doze demos estáticos.

### Bloco 8 · Interação

**Não está na régua.** Cada funcionalidade pede um teste próprio, de ponta a ponta: o montador, a calculadora, o agendador, o simulador, o menu, copiar. Fica para `05-ponta-a-ponta.md`.

### Bloco 9 · Conformidade (`conformidade`)

| Verificação | Classe |
|---|---|
| Site de exemplo (caminho sob `/demos/`) sem `noindex` | Falha |
| Site de exemplo sem o selo de ficção (o texto "fictício", "fictícia" ou "ficção") | Falha |
| Formulário que envia dados (`action` ou `method="post"`) sem vínculo para o aviso de privacidade | Falha |
| Menção a "CNPJ" ou "nota fiscal" | Aviso (ata v3.0, III.2: nada pode declarar CNPJ nem prometer nota fiscal enquanto não existirem) |

**Por que a menção é aviso:** a busca por palavra acusa também quem declara a ausência ("nenhum CNPJ é declarado aqui").

**No site de cliente, o bloco se inverte:** o rodapé **sem** a razão social e o CNPJ é que reprova (seção 9).

### Bloco 10 · Registro verbal (`registro`)

Os períodos vêm do texto acessível de `p`, `li`, `dd`, `blockquote`, `figcaption` e `td` do `main`, terminados em pontuação de fim de frase, com 3 palavras ou mais.

| Verificação | Classe |
|---|---|
| Mediana acima de 14 palavras por período | Aviso |
| Período acima de 28 palavras | Aviso (até quatro exemplos) |
| Vocabulário vedado: barato, imbatível, menor preço, preço baixo, o/a/os/as melhor(es), número 1, líder | Aviso |

**Objetivo.** Registro impessoal, frases curtas; a ata (IV.1) veda o posicionamento por preço baixo; nada de superlativo sem prova. É aviso porque o registro é julgamento (`10-conteudo-normas-e-texto.md`).

---

## 6. A calibração de 07 e 08.10.2026

Uma verificação só vale depois de provar que não acusa o que não é defeito. A primeira rodada acusou **119 falhas em 19 de 23 páginas** (252 s). Parte delas era defeito real, corrigido no site (seção 7); a outra parte era a própria régua errando. Foram **onze ajustes** em 07.10 e um décimo segundo em 08.10, no primeiro site estático (a base de `producao/base/`). O README da régua cita os quatro mais visíveis; a lista completa é esta:

| # | O que a régua acusou | Causa | Correção | Classe do erro |
|---|---|---|---|---|
| 1 | Vínculos do cabeçalho com 1,21:1 | O Tailwind 4 calcula as cores em `oklab`; a régua lia os números como RGB | Toda cor passa por um `canvas` 2D, que devolve RGBA (`paraRgba`) | Medição errada |
| 2 | Nenhum texto medido na barbearia (0 de 74) | O canvas do WebGL, fixo e atrás do conteúdo, contava como algo que cobre o texto | A cobertura passou a ser o `elementFromPoint` no centro de cada linha | Medição errada |
| 3 | Linhas do título com 2,63:1 nas aberturas | Com entrelinha 1, a caixa da linha invade a linha vizinha (e a tarja dela) | Mede-se só onde o texto está desenhado (os pixels que mudam com e sem texto) | Medição errada |
| 4 | "Invisível sem script" no lide da barbearia | A entrada de CSS ainda estava no atraso quando a régua olhou | Esperar as animações finitas terminarem, até 5 s | Medição errada |
| 5 | O h1 lido "Trinta anosna mesma esquina." | O texto acessível juntava as linhas em bloco sem espaço | Espaço ao entrar e ao sair de cada elemento que não é `inline` (como o Chrome monta o nome) | Medição errada |
| 6 | O risco das ausências da barbearia com 1,94:1 | O risco é uma linha de 2 px desenhada no fundo do próprio texto | Texto com `background-image` próprio vai para a conferência à mão | Exceção legítima |
| 7 | A janela do brilho do Spell UI "sai da tela" em 320 px | Ela fica fora da tela de propósito, recortada por `contain: paint` | `contain` e `clip-path` contam como recorte | Exceção legítima |
| 8 | O botão de pausa contado como ação na primeira tela | Com movimento reduzido, ele fica desabilitado, invisível e `aria-hidden` | Ação exclui o desabilitado, o decorativo e o de opacidade < 0,05 | Exceção legítima |
| 9 | A chamada de nota "¹" da nutrição com 4 × 18 px | É um vínculo no meio do texto (WCAG 2.5.8 o excetua) | A exceção olha o bloco em volta, não só o pai imediato | Exceção legítima |
| 10 | Armadilha de foco num campo de data | O campo de data recebe um Tab por parte | Limite de 6 repetições seguidas | Exceção legítima |
| 11 | Fontes de Para quem com 52,9 KB, acima de 50 KB | O teto de 50 KB foi escrito para uma família só; a vitrine traz as fontes de título dos nichos | Teto de 60 KB no Atlas, com o motivo escrito | Teto mal posto |
| 12 | Cinco `ERR_ABORTED` por página no site estático, um por vínculo interno (08.10.2026, na base de `producao/base/`) | No export estático, o Next 16 manda um `HEAD` a cada vínculo antes da pré-busca, para conferir redirecionamento (`next/dist/client/components/segment-cache/cache.js`). Na página, o `fetch` resolve com 200; o Playwright relata o mesmo pedido como `requestfailed`, `net::ERR_ABORTED` (conferido com um `HEAD` disparado à mão) | O `HEAD` com `ERR_ABORTED` deixa de contar como pedido falho; um `HEAD` com 404 ou recusado continua acusado | Medição errada |
| 13 | Fontes de Para quem com 81,8 KB, acima de 60 KB (08.10.2026, no site do Atlas) | O teto de 60 KB foi escrito para San Francisco e Inter (~23 KB); o site voltou às três famílias do site de 28/08 (~52 KB), por decisão de 05/10 mantida pelo usuário em 08/10, e a vitrine segue com as fontes de título dos nichos (~31 KB) | Teto de 90 KB no Atlas, com o motivo escrito; os sites de marca seguem com 200 KB | Teto mal posto depois de uma decisão de design |
| 14 | Linha de 94 caracteres num item de lista em grade (08.10.2026, na primeira rodada das sondas novas, no site do Atlas) | As colunas lado a lado dividem o mesmo topo e somavam numa linha só | A sonda dos caracteres por linha pula os elementos em grade e em flex | Medição errada |
| 15 | Foco "encoberto" por um svg decorativo (idem) | O `elementFromPoint` devolvia o desenho solto por cima, que não está preso à tela | A sonda procura na pilha (`elementsFromPoint`) só o que está preso à tela (`fixed` ou `sticky`) acima do elemento | Medição errada |
| 16 | A fonte de título da base acusada sem algarismos tabulares (08.10.2026, na base de `producao/base/`) | A sonda media a família do título, que não leva número | Mede só a família usada com `tabular-nums` num texto com algarismos | Exceção legítima |
| 17 | As palavras do título da odontologia que atravessam a placa por diferença (`span.od-palavra`), com 1,15 a 1,27:1 na última rodada, cinco a 390 px e duas a 1440 px (na mesa desde 13.10.2026; no celular desde 14.10.2026) | A régua compunha a cor **declarada** (o branco) sobre o fundo. Por diferença, a tela desenha outra cor: sobre a cerâmica clara, quase preto. O erro valia para os dois lados: na autoconferência, o branco por diferença sobre o cinza `#808080` aprovava com 3,95:1, e a tela desenha 1,01:1 | O texto misturado mede a cor desenhada, pixel a pixel, no miolo das letras, pelo 10º percentil (bloco 4). Decisão do aprovador, 16.10.2026, "Corrigir a régua". Na mesma data, no servidor da porta 3400: as seis palavras de 4,87 a 10,36:1 a 390 px e de 6,83 a 10,65:1 a 1440 px; o lugar, que se mistura só na mesa, 10,84:1. No build da porta 3300, a página aprova, com os mesmos valores a 0,09 ou menos. Nenhum aviso de texto misturado sem medida. O miolo pela cobertura e a escolha entre o 5º e o 10º percentil aguardam o aprovador (bloco 4, itens 2 e 3). A autoconferência, `ferramentas/regua/autoconferencia.mjs` contra `autoconferencia.html` (na mesma pasta, aqui e no kit; da raiz, `node ferramentas/regua/autoconferencia.mjs`): uma página com fundos conhecidos (branco, `#808080`, `#555`, metade e metade, a folga de 10% e de 12% da largura, a caixa de 1 px à vista e a recortada, o só para leitor de tela num ancestral girado e misturado, a mistura ligada depois da primeira tela, fora da tela), 15 verificações | Medição errada |
| 18 | Linhas de texto com 2,39 a 2,80:1 em /planos e /para-quem, a 390 px (17.10.2026, no site do Atlas) | O atalho do WhatsApp passou a ficar à vista ao rolar para baixo e cobria só a ponta da linha; a cobertura olhava o centro, e o bronze do atalho entrava como fundo | A cobertura olha três pontos de cada linha: as duas pontas (4% e 96%) e o centro | Medição errada |
| 19 | Uma nota da vitrine de /para-quem (3,81:1) e um vínculo do rodapé de /o-trabalho (4,33:1), a 390 px (17.10.2026, "o Atlas Digital", com as páginas mais altas) | A sombra do atalho do WhatsApp passa 20 a 30 px da caixa dele e não recebe o ponteiro: o `elementFromPoint` não a via, e ela entrava como fundo na ponta da linha. Na tela, as duas linhas têm o contraste do tom (5,85 e 5,9:1 chapados) | O texto a menos de 32 px da caixa do atalho (`.vd-atalho`) fica para outra tela, como o coberto. As duas linhas foram medidas noutra posição da rolagem; a contagem dos não medidos não mudou. **Desde 18.10.2026,** o atalho deu lugar à barra do polegar (`.vd-polegar`, o prazo e o WhatsApp do celular), com sombra menor (`0 2px 8px -2px`: 6 px dos lados, 8 embaixo; `app/digital.css`). A margem passou a 8 px, na sonda do contraste e na dos rótulos das figuras (`ferramentas/regua/contraste.mjs`, a constante `flutuantes` e a margem dos `presos`) | Medição errada |
| 20 | O número de uma nota de /para-quem (`span[data-numero]`, `aria-hidden`) com 1,03:1 a 390 px, na primeira rodada do texto das figuras (17.10.2026, à noite, no dev da porta 3400); numa rodada anterior, 3,47:1 | O indicador do `next dev` (o `nextjs-portal`, preso ao canto de baixo dentro da sombra do elemento, que a cobertura não vê) passava por cima do número: nada mudava entre as fotos, e a medida caía na caixa inteira. Na tela, o número tem a tinta do papel | As fotos das figuras escondem o `nextjs-portal`. A régua roda contra o build, onde ele não existe; mas as peças em construção se medem no dev. **A primeira rodada,** com movimento reduzido e `?agora=2026-10-17T17:50-03:00`, nas sete páginas do Atlas, a 1440 e a 390 px: no build da porta 3300 (o primeiro estudo de 17.10), 185 textos de figura medidos e um abaixo, real: o rótulo "Niterói 22°53′ S 43°07′ O" da Terra em pontos, a 390 px, com 1,74:1, porque o anel de bronze passa sob a primeira palavra (a peça sai com a direção de 17.10). No dev da porta 3400, na mesma noite e depois da correção, 164 medidos e cinco abaixo, todos reais: os rótulos de coordenada e de escala da carta de Niterói, em /para-quem a 390 px (de 3,22 a 4,22:1), sobre as ruas de bronze e sem o halo de carta (a peça estava em construção). O meio-tom da capa, já no ar, mediu 10,63:1 a 1440 px e 10,95:1 a 390 px, pela média. **Segue aviso** até as dez rodadas da seção 10 | Medição errada |
| 21 | O pior quadro da rolagem do início do Atlas com 217 ms no celular 4× (22.10.2026, na primeira rodada da régua dos quadros, seção 12); 67 ms na rodada seguinte | O Playwright injetava o próprio script na página dentro do rastro, no primeiro `page.evaluate` e nos localizadores: 115,8 ms de `EvaluateScript` com a CPU 4×, e uma sonda dele a cada quadro | A régua dos quadros injeta o script antes de ligar o rastro, lê o ponto de cada elemento na página e toca ou clica pelo `Input` do protocolo do Chrome, sem localizador durante o gesto. A navegação da primeira rodada ficou com o ruído da sonda (15 a 100 ms em 20 s) | Evento do instrumento, não da página |

**A primeira rodada das quatro sondas novas** (08.10.2026, à noite; seção 5, blocos 1, 4 e 6), nas 23 páginas do Atlas e nas 5 da base. Depois das correções 14 a 16, os avisos que sobram são defeitos:
- o cabeçalho preso à tela do Atlas, da barbearia e do depósito sobre o foco, no Shift+Tab: falta `scroll-padding-top`;
- o e-mail do rodapé do Atlas partido a 768 px, e rótulos de botão partidos nos exemplos, a 320 e a 1024 px;
- duas linhas acima de 80 caracteres: 86 numa nota do Atlas e 111 na nota de rodapé da nutrição.

A base não deu nenhum. As quatro seguem como aviso até dez rodadas sem alarme falso (seção 10).

**A primeira rodada da carga no celular e do celular deitado** (08.10.2026, à noite), nas mesmas páginas:
- **na base:** o LCP no celular de 1,5 a 2,1 s, os bytes do celular um pouco abaixo dos da mesa e 17% da tela deitada coberta pelo cabeçalho, sem aviso;
- **no Atlas:** nove de 23 páginas com o LCP no celular acima de 2,5 s (até 3,9 s), um dado real do site mais pesado, e nenhum aviso de tela deitada nem de celular mais pesado que a mesa.

A régua inteira nas 23 páginas passou de 278 para 356 s.

**A barreira do travamento** (08.10.2026, mais tarde; decisão de Gabriel Ribeiro Ota Yida, transmitida pelo usuário: "o tamanho do site não importa, e sim só seu design. Apenas em casos extremos, onde ele ultrapassa uma barreira muito grande e fica travado até mesmo para dispositivos médios"). Os avisos de LCP acima de 2,5 s e de celular mais pesado que a mesa saíram; a passagem 2b passou a medir o travamento:
- **Os limites:** 1 s e 10 s são os de Nielsen (o pensamento se interrompe; a atenção se perde) [FU]. Os 3 s de bloqueio somado são cinco vezes o "ruim" do Lighthouse (600 ms). Os 10% de quadros acima de 100 ms marcam a rolagem que engasga do começo ao fim, e não um tropeço.
- **A calibração, no aparelho médio:**
  - **o pior dos sites do Atlas e dos exemplos** (o início do Atlas, Planos, a barbearia com o 3D, a odontologia, a nutrição, o depósito): 190 ms de tarefa, 140 ms de bloqueio, nenhum quadro lento e o LCP até 2,6 s, todos muito abaixo;
  - **uma página de teste com trabalho de CPU de verdade** (~1 s na carga e ~160 ms por quadro ao rolar, com a CPU 4×): reprovou pela tarefa e pelos 40% de quadros lentos;
  - **a mesma página, leve:** passou.
- **A armadilha da calibração:** o laço que espera pelo relógio (`performance.now()`) não sofre a CPU 4×; só o trabalho de CPU de verdade sofre. Para testar a barreira, ocupe a CPU com conta, e não com espera.

**Objetivo desta tabela.** É a prova de que as falhas que sobraram são defeitos. É também o catálogo dos erros de medição que qualquer verificação nova pode repetir: cor em espaço de cor moderno, camada fixa atrás, caixa de linha, tempo de entrada, nome acessível, desenho no fundo, recorte, controle desabilitado, texto corrido, campo composto, teto sem motivo, evento do instrumento que não é o da página.

---

## 7. Os resultados

**Os defeitos reais que a régua achou em 07.10.2026** (todos corrigidos e verificados):

| Defeito | Página | Correção |
|---|---|---|
| Sem `og:title`, `og:description` e `og:image` | As 16 páginas dos sites de exemplo | Cartão de 1200 × 630 com a primeira tela de cada site; uma função de metadados no lugar de três cópias |
| Rolagem lateral de 50 px em 320 e de 10 px em 360 | Carta de valores da nutrição | O preço desce para a linha de baixo quando não cabe |
| Rolagem lateral de 35 px (depois 3 px) em 320 | Talão do depósito | Código de barras de 112 px no celular; grade de uma coluna (`minmax(0, 1fr)`) até o computador |
| Alvos de 43 px | Os três bairros de Para quem | Recuo de 10 px compensado pela margem: 44 px sem mudar a linha |
| Contraste de 4,41:1 | Os códigos 01 a 05 do depósito, sobre o quadriculado | O laranja de texto de `#a8431a` para `#9a3c16` |

**A rodada final, 08.10.2026: 0 falhas nas 23 páginas, 31 avisos, 265 s.**

| Medida, carga inicial | Início | Outras páginas do Atlas | Sites de exemplo |
|---|---|---|---|
| Script | 155,3 KB | 143,9–154,2 KB | 136,5–143,2 KB |
| Fontes | 22,4 KB | 22,4 KB (52,9 em Para quem) | 90,5 (barbearia) · 130,2 (depósito) · 141,1 KB (nutrição) |
| Total | 271,6 KB | 265–301 KB | 308–384 KB |
| CLS | 0 | 0 | 0 a 0,002 |

**Os avisos que ficaram, e a decisão sobre cada um:**
- **Ação além de 60% da primeira tela no celular** nas aberturas das páginas internas do Atlas: aceito, porque são informativas e a ação está no menu.
- **A barbearia sem ação no celular:** o botão de agendar some abaixo de 640 px. É decisão dos sócios, porque muda o desenho.
- **Gestos do Spell UI** a conferir à mão.
- **Mediana de 16 palavras** por período em O Atlas: a decidir.
- **Itens da mesa que faltam no celular**, como o índice de capítulos da barbearia.

---

## 8. O relatório

**No terminal:**
- uma linha por página (`✓` ou `✗`, falhas e avisos);
- as seções "Falhas" e "Avisos", por página;
- a linha final, `APROVA` ou `REPROVA`, com o total de falhas e de páginas, os avisos e os segundos.

**Em `.regua/relatorio.json`:** o endereço, a data e, por página, `falhas`, `avisos` e `medidas`:

| Medida | Conteúdo |
|---|---|
| `carga` | Script, fontes, total, CLS |
| `semantica` | Título, descrição, h1 |
| `registro` | Períodos, mediana |
| `celular` | Primeira ação (fração da tela), nome da ação, telas, razão do título |
| `mesa` | Primeira ação, razão do título |
| `contrasteCelular` e `contrasteMesa` | Medidos, sem medida, manuais (só no celular); `desenhados`, o texto misturado ao fundo, com a razão na cor desenhada e o mínimo (desde 16.10.2026) |
| `teclado` | Paradas |

**Objetivo.** O terminal para decidir; o JSON para comparar rodadas e anexar ao relatório de QA.

---

## 9. Levar a régua para um repositório novo

**Regra.** Todo site de cliente roda a mesma régua, copiada do repositório do Atlas e ajustada em quatro pontos.

**Objetivo.** O mesmo piso em todo site, calibrado uma vez. Reescrever a régua por cliente repetiria os onze erros de calibração.

**O caminho automático (desde 08.10.2026).** `node producao/ferramentas/portar-regua.mjs <pasta do site>` faz os passos 1 e 4, e o `novo-site` a chama:
- a cópia;
- os ajustes do tipo de site, da conformidade e do aviso de CNPJ, com os dados lidos de `conteudo/negocio.ts`.

No site de cliente, ela acrescenta duas verificações ao bloco 9:
- **o `noindex` é falha:** tiraria o site da busca;
- **o rodapé obrigatório:** a razão social e o CNPJ ou, no profissional pessoa física, o nome completo (`nomeCompleto`) e o registro.

Se a régua mudar e um trecho do porte deixar de existir, ela para e diz qual. Os passos abaixo continuam valendo para portar à mão e para conferir o que ela fez. **Sirva o site estático com `npm run estatico`** (`producao/base/ferramentas/servir.mjs`), nunca com o `python3 -m http.server`: a régua leria o script sem compressão e conexões recusadas como defeito do site.

**Como fazer.**
1. **Copie** a pasta `regua/` desta pasta de qualidade (`regua.mjs`, `sondas.mjs`, `contraste.mjs`, `teclado.mjs`, `png.mjs`, `quadros.mjs` e o `README.md` de porte) para `ferramentas/regua/` do repositório novo. É a cópia da régua do repositório do Atlas (`web/ferramentas/regua/`) em 08.10.2026: o repositório novo não depende do acesso ao do Atlas. Se a régua do Atlas tiver mudado depois dessa data, prefira a de lá e atualize esta cópia (`regua/README.md`).
2. **Instale o Playwright** como dependência de desenvolvimento, sem baixar navegador (a régua usa o Chrome instalado):

   ```bash
   PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install -D playwright@1.64.0
   ```

3. **Acrescente o script** ao `package.json` (`"regua": "node ferramentas/regua/regua.mjs"`) e a pasta do relatório ao `.gitignore` (`/.regua/`).
4. **Ajuste o que é do Atlas.** Em `regua.mjs`:
   - **O tipo de site:** a linha `const site = caminho.startsWith("/demos/") ? "marca" : "atlas"` vira `const site = "marca"`; o site do cliente é todo de marca.
   - **O orçamento:** nos sites de marca, `ORCAMENTOS.marca` fica vazio (sem teto); o peso se lê em `medidas.carga` e em `medidas.cargaCelular` (passagem 2b), sem porta; a porta é a barreira do travamento. O 3D do Completo pesa no script inicial só se não for carregado com o navegador ocioso.
   - **A conformidade de exemplo:** o selo de ficção e o `noindex` valem só para [ex]. Num site de cliente, troque a condição `site === "marca"` dessa verificação por uma constante `SITE_DE_EXEMPLO = false`.
   - **O bloco 9 se inverte no site de cliente.**
     - **No Atlas,** que não tem CNPJ, a régua só **avisa** de qualquer menção a "CNPJ" ou "nota fiscal" (ata v3.0, III.2: nada pode declarar CNPJ nem prometer nota fiscal enquanto não existirem).
     - **No site de cliente,** o certo é o contrário: o rodapé **sem** a razão social e o CNPJ do cliente (ou, no profissional pessoa física, o nome e o registro do conselho) é que se acusa, e como **falha** (Decreto 7.962/2013, art. 2º; `../esteira/17-conformidade-e-normas.md`, seção 9). O aviso de menção a CNPJ sai: no site do cliente, o CNPJ é obrigação, não risco.
     - **Como fazer:** o texto exigido vem do briefing, numa constante, e a régua confere que o rodapé de toda página o contém:

       ```js
       // regua.mjs, no bloco 9, no repositório do cliente. Os textos saem do briefing (razão social e
       // CNPJ; ou nome e registro do conselho, no profissional pessoa física).
       const RODAPE_OBRIGATORIO = ["<razão social>", "<CNPJ, como escrito no rodapé>"];
       const rodape = await pagina.evaluate(() => document.querySelector("footer")?.innerText ?? "");
       for (const texto of RODAPE_OBRIGATORIO) {
         if (!rodape.includes(texto)) falha("conformidade", `rodapé sem "${texto}" (Decreto 7.962/2013, art. 2º)`);
       }
       ```

       E na sonda `conformidade`, de `sondas.mjs`, a lista de menções a CNPJ e nota fiscal deixa de gerar aviso nesse repositório.
   - **As rotas ignoradas:** acrescente as rotas só de desenvolvimento do projeto à lista de `descobrirPaginas` (`/_next` e `/ferramentas` já estão).

   Em `sondas.mjs`, nas ações (`acoes`):
   - **Os rótulos dos controles do site** (menu, índice, pausa) estão em português do Atlas. Acrescente os do cliente se forem outros, ou a composição acusará o botão de menu como ação.

   Em `quadros.mjs`: o gatilho do menu e a figura do site (seção 12, "No repositório novo").
5. **Navegador.** Na máquina do desenvolvedor, `chromium.launch({ channel: "chrome" })` usa o Chrome instalado. Na integração contínua, dentro do contêiner do Playwright, tire o `channel` (usa o Chromium do contêiner) ou instale o Chrome (`13-integracao-continua.md`).
6. **Calibre:** rode a régua três vezes no site pronto e leia **todo** aviso e toda falha. O que for erro da régua é corrigido na régua, e a correção entra na tabela da seção 6 deste documento e, resumida, no README da régua ("Falha e aviso").

**Como conferir.** No repositório novo, `npm run build && npm start` e `npm run regua` terminam com `APROVA` e nenhum falso positivo conhecido.

---

## 10. Acrescentar uma verificação sem criar alarme falso

**Regra.** Toda verificação nova nasce como **aviso**, roda dez vezes sem mudança no site e só vira falha se não acusar nada que não seja defeito.

**Como fazer.**
1. **Escreva a sonda** em `sondas.mjs`, como as outras: uma função que roda dentro da página, usa os ajudantes de `AJUDANTES` e devolve dados, não vereditos. Ela é montada no avaliador (`avaliar`), porque a política de conteúdo do site veda `eval`, e a página sem script não roda scripts de início.
2. **Decida a classe** em `regua.mjs`, chamando `aviso(bloco, texto)`.
3. **Rode** nas 23 páginas do repositório do Atlas (os três sites de exemplo são o banco de calibração: identidades sem parentesco, um por plano) e em dez rodadas sem mudança.
4. **Leia cada ocorrência.** Se alguma não for defeito, corrija a sonda (as onze lições da seção 6 são o primeiro lugar a olhar).
5. **Promova a falha** só com zero alarme falso, e registre no README da régua: o bloco, o limite, o porquê.

**Objetivo.** A régua é confiável porque cada porta provou que não mente. Uma verificação apressada desfaz essa confiança para todas.

---

## 11. O que a régua não faz

| Não faz | Onde fica |
|---|---|
| Julgar gosto, direção de arte, "cara de IA" | `11-design-e-anti-ia.md` |
| Testar as funcionalidades (montador, calculadora, Agenda) | `05-ponta-a-ponta.md` |
| Medir LCP, TBT e INP em aparelho modesto | `08-desempenho.md` (Lighthouse) |
| Comparar telas com a versão anterior | `07-regressao-visual.md` |
| Ouvir a página num leitor de tela | `06-acessibilidade.md` |
| Saber se uma afirmação é verdade | `00-entender-o-projeto.md`, seção 7; `10-conteudo-normas-e-texto.md` |
| Medir a largura do alvo de toque | axe e revisão (`06`) |
| Verificar o endereço canônico, o JSON-LD e o mapa do site | `10-conteudo-normas-e-texto.md` |

**As antecessoras, a portar como verificação** (03.10.2026, no repositório do Atlas, fora do git): a régua de diretrizes (`.playwright-mcp/regua-diretrizes.js`: uma família, nenhum tamanho fora da escala, nenhuma sombra pesada, nenhum espaço fora da grade, nenhuma rolagem lateral nem erro) e a régua de cantos (`../esteira/06-cor-forma-e-superficie.md`, seção 6); ao todo, ~1.000 linhas em 12 scripts presos à porta 3100, três deles de captura repetidos. Da de diretrizes, só a rolagem lateral (bloco 1) e o erro (bloco 5) estão nesta régua; a família, a escala, a sombra e a grade são candidatas a verificação nova, pela seção 10 (nascem aviso).

---

## 12. A régua dos quadros (`quadros.mjs`)

**O que é.** A régua do ritmo: conta, quadro a quadro, se a página desenha a 60 quadros por segundo em quatro gestos. Roda à parte da régua dos dez blocos, no mesmo Chrome e contra o mesmo build. Nasceu em 22.10.2026, no repositório do Atlas (`ferramentas/regua/quadros.mjs`), com o pedido do usuário de 60 quadros por segundo na rolagem e em toda navegação; a cópia do kit é `regua/quadros.mjs`, de 28.10.2026. A regra que ela guarda, com o estado medido, está em `../esteira/15-desempenho.md`, seção 2.4; como ler o resultado sem se enganar, em `08-desempenho.md`, seção 11.

**Como mede.** Pelo rastro do Chrome (`Tracing`, nas categorias do painel Performance). A cada batida do vsync, o compositor da página registra um de três estados:
- **inteiro:** desenhou o quadro todo;
- **parcial:** desenhou em parte (a rolagem andou, mas o que depende da linha principal ficou para trás);
- **perdido:** não desenhou.

A batida sem nada a mudar é ociosa e não conta. É o modelo da faixa "Frames" do DevTools e da métrica de fluidez do Chrome (https://web.dev/articles/smoothness) [FU].
- **Por que não um laço de `requestAnimationFrame`:** ele pede um quadro da linha principal a cada batida, o que muda o que se mede, e não vê a rolagem feita no compositor.
- **Por que não o `long-animation-frame`:** ele só registra quadros acima de 50 ms.

**Como rodar.**

```bash
# Com o build servido (npm run build && npm start). O relatório vai para .regua/quadros.json da pasta corrente.
node ferramentas/regua/quadros.mjs --base=http://localhost:3000 --pagina=/ --pagina=/servicos
# Uma célula só, para conferir uma correção:
node ferramentas/regua/quadros.mjs --base=http://localhost:3000 --pagina=/servicos --perfil=celular4 --gesto=navegacao
# Só a conta dos quadros, numa sequência sintética, sem navegador:
node ferramentas/regua/quadros.mjs --autoteste
```

| Opção | Efeito |
|---|---|
| `--pagina=/x` (repita) | As páginas. **Sem ela, mede as 13 do repositório do Atlas:** num site de cliente, passe sempre as do site |
| `--perfil=celular4\|celular6\|mesa` (repita) | Os perfis; sem ela, os três |
| `--gesto=rolagem\|menu\|navegacao\|figura` (repita) | Os gestos; sem ela, os quatro |
| `--vezes=3` | Quantas vezes cada medida roda; vale a mediana |
| `--autoteste` | Confere a conta dos quadros e sai |

**Os perfis e o critério.** A 60 Hz, com o vsync medido (16,7 ms). O intervalo se conta em batidas, sem tolerância de relógio.

| Perfil | Janela | CPU | Classe | Em dia | p95 | Pior |
|---|---|---|---|---|---|---|
| `celular4` | 390 × 844, toque, densidade 3 | 4× (o aparelho médio do kit) | **Falha** | ≥ 95% | 1 batida (16,7 ms) | ≤ 3 batidas (50 ms) |
| `celular6` | 390 × 844, toque, densidade 3 | 6× (o aparelho de entrada) | Aviso | ≥ 90% | 2 batidas | ≤ 6 batidas (100 ms) |
| `mesa` | 1440 × 900, densidade 1 | Sem estrangulamento | **Falha** | ≥ 95% | 1 batida | ≤ 3 batidas |

- **Em dia:** a parcela das batidas com algo a mudar em que o quadro saiu inteiro.
- **p95:** o 95º percentil do intervalo entre quadros inteiros.
- **Pior:** o maior intervalo entre quadros inteiros.
- **A ocupação da linha principal** durante o gesto se relata, sem reprovar: é a folga que sobra ao aparelho.
- **Por que estes números:**
  - 16,7 ms é o quadro a 60 Hz;
  - 50 ms é o limiar da tarefa longa e do `long-animation-frame` (https://web.dev/articles/long-animation-frames) [FU]: três batidas perdidas seguidas são um tropeço visível;
  - os 95% são proposta do diagnóstico de 22.10.2026, sem fonte: deixam passar um quadro perdido a cada 20, o ruído que a própria máquina produziu nas páginas leves (99 a 100% em dia nas demos) [NV];
  - os 100 ms do aviso são a barreira do travamento (bloco 5).

**Os gestos.** Cada um parte da página recém-carregada, com 2,5 s para os `import()`; a CPU se estrangula depois da carga, e o rastro cobre só o gesto.

| Gesto | Celular | Mesa |
|---|---|---|
| `rolagem` | Arremessos de 600 px a 2.400 px/s, com fling, do topo ao rodapé e de volta | A roda, em tiras de 1.200 px a 2.000 px/s |
| `menu` | Abrir e fechar o gatilho do menu do cabeçalho (`[aria-haspopup="dialog"][aria-expanded]`, nos 140 px do topo) | Idem, onde houver |
| `navegacao` | Cada vínculo interno do menu, até 7, e o voltar | Cada vínculo do cabeçalho (ou da primeira `<nav>`), até 7, e o voltar |
| `figura` | O arraste da peça pelo dedo | O arraste pelo mouse; no canvas, também o ponteiro solto |

O gesto que a página não tem não aparece no resultado: a régua não acusa a falta.

**O tempo.** As sete páginas do Atlas, nos três perfis e nos quatro gestos, com a mediana de 3: ~47 min num Apple M2 de 8 núcleos (28.10.2026). Com as seis demos, ~75 min.

**O resultado.**
- **No terminal:** uma linha por página, perfil e gesto, com o em dia, o p95, o pior [as três vezes] e a ocupação; ✓ aprova, ✗ reprova, ! aviso.
- **Em `.regua/quadros.json`:** a mediana, cada vez medida, a carga da máquina no início, no fim e antes de cada vez, e o que pesou na vez mediana: o tempo próprio por evento da linha principal, as funções do script (`arquivo:linha:coluna` do chunk), as imagens pintadas, a rasterização e a GPU, e as cinco tarefas mais longas.
- **O código de saída:** 1 se alguma porta reprovar.

**O diagnóstico.** `medir(navegador, url, perfil, gesto, extras)` é exportada:
- `extras.categorias`: mais categorias no rastro (`disabled-by-default-v8.cpu_profiler`; `blink`, `cc`, `viz` e `gpu`, que dão os nomes de `ViewTransition::ProcessCurrentState`);
- `extras.aoCarregar(p)`: um passo depois da carga, para retirar um efeito suspeito;
- `extras.eventos`: recebe o rastro cru, que se grava em `.json` e abre no painel Performance.

**O que ela não vê.** O estrangulamento do DevTools freia só a linha principal: a rasterização, a GPU e o compositor rodam na velocidade da máquina. O que pesa na GPU de um celular (`backdrop-filter`, máscara, `mix-blend-mode`, filtros SVG, camadas do tamanho da página) aparece aqui menor do que é, e o Safari não se mede. Isso fica com o aparelho real (`08-desempenho.md`, seção 8).

**No Claude Code,** como a régua dos blocos: com o sandbox desligado.

**No repositório novo.** O `portar-regua.mjs` copia `quadros.mjs` com o resto (seção 9). Três ajustes, à mão:
1. **As páginas,** sempre por `--pagina`.
2. **O gatilho do menu.** A régua procura `[aria-haspopup="dialog"][aria-expanded]` (`botaoDoMenu`). O gatilho da base é `a[href="#indice"]`, sem esses atributos: sem o ajuste do seletor, o menu não se mede, e a navegação do celular não passa pelo menu (o cabeçalho da base esconde a lista de páginas abaixo de 1024 px: `hidden lg:block`). O painel aberto, o `<dialog>` nativo da base, a régua já reconhece (`dialog[open]`).
3. **A figura.** O seletor da peça do site (o canvas da peça-assinatura, o mapa, a galeria de arrastar) entra na lista de `prepararFigura`, ao lado dos do Atlas (`.vd-terra-controle`, `.vd-carta-regiao`, `a[data-simulador]`, `canvas.bb-palco, canvas.od-palco`).

Os ajustes 2 e 3 não foram conferidos num site feito pela base: A CONFIRMAR no primeiro site, com o registro no README da régua.

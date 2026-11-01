# 12 · Ataque a falhas

> **Para que serve.** Caçar defeito de propósito, antes do visitante. O documento traz:
> - as **categorias de ataque**, cada uma com o que tentar, por que quebra e onde automatizar;
> - as **cartas prontas** para a exploração;
> - o **histórico de defeitos** do projeto, de 30.09 a 08.10.2026: cada um com a causa, a correção, a regra que deixou e o que o pega hoje;
> - a lista do que continua **aberto**.
>
> **Estado.** O histórico é registro: os fatos estão nos registros do repositório do Atlas (`web/CLAUDE.md`, a especificação do site, os comentários do código). As categorias e as cartas são RATIFICADO como método.
>
> **Depende de.** `01-metodologia.md` (a exploração com cartas, seção 6; o ciclo de um defeito, seção 9).

---

## 1. Como usar

**Regra.** Antes do rascunho e antes da publicação, cada categoria de **nota 6 ou 9** na matriz de risco do projeto recebe uma sessão de exploração (`01-metodologia.md`, seção 6), com uma carta tirada da seção 3. Todo defeito achado entra no histórico (seção 4) com a causa e a regra que deixou.

**Objetivo.** Quase todo defeito do histórico abaixo pertence a uma classe que se repete: entrada que ninguém previu, largura extrema, sábado, código que não chegou, cache velho. Atacar a classe acha o próximo antes que ele chegue ao visitante.

**Como conferir.** O relatório de QA lista as sessões feitas (carta, duração, achados) e as categorias de nota alta sem sessão, com o motivo.

---

## 2. As categorias de ataque

### 2.1 · Endereços e âncoras malformados

| Tentar | Por que quebra | Já aconteceu |
|---|---|---|
| `/#%E0`, `/#%`, `/#%E0%A4%A`, `/#`, âncora inexistente | `decodeURIComponent` lança com sequência malformada; dentro de um efeito, derruba a página | **03.10:** `/#%E0` trocava a página inteira pela tela de erro |
| Caminho com maiúscula, barra no fim, acento, muito longo (`/PLANOS`, `/planos/`, `/serviços`) | Rota que não casa; 404 sem `noindex`; redirecionamento em laço | — |
| Parâmetros estranhos (`?a=<script>`, `?utm_source=…`) | Página que lê o parâmetro e o escreve na tela | — |
| A âncora vinda de outra página (`/duvidas#duvida-2` a partir do início) | A rolagem até a âncora antes de o conteúdo existir; o cabeçalho fixo cobrindo o destino | — |

**Onde automatizar:** unidade (a decodificação, `04`, seção 3) e ponta a ponta (a lista de endereços, `05`, seção 5.3).

### 2.2 · Entradas de formulário e de calculadora

| Tentar | Por que quebra | Já aconteceu |
|---|---|---|
| Vírgula e ponto: `2,5`, `2.5`, `1.000,5`, `1,000.5` | Leitura de número no formato errado | **Até 03.10:** na calculadora do depósito, o texto que não era número virava 0 |
| Vazio, zero, negativo, gigante (`99999999`) | Divisão por zero, quantidade absurda, leiaute estourado | **Até 03.10:** a calculadora enviava a lista zerada, sem as medidas; o talão vazio era enviado só com a saudação |
| Acento, emoji, `&`, `#`, `%`, quebra de linha no nome | A mensagem do WhatsApp cortada no primeiro caractere não codificado; cabeçalho de e-mail injetado | — |
| Texto de 5.000 caracteres | Limite inexistente no servidor; caixa do leiaute estourada | — |
| `<script>`, `"><img onerror=…>`, `' OR 1=1 --` | Texto do visitante escrito sem escapar, na tela ou no e-mail; consulta montada por concatenação | — |
| Enviar com script desligado | Formulário que só funciona com script | — |

**Onde automatizar:** unidade (a leitura do número, a codificação, o escape) e ponta a ponta (o envio forçado por `request.post`, `09`, seção 5).

### 2.3 · Larguras, aparelhos e conteúdo extremo

| Tentar | Por que quebra | Já aconteceu |
|---|---|---|
| 320 px, com a palavra mais longa e o maior preço do conteúdo | A palavra não quebra; o preço empurra a linha | **07.10:** a carta de valores da nutrição rolava 50 px para o lado em 320 ("Acompanhamento" e o preço); o talão do depósito, 35 px, depois 3 |
| A fronteira de cada ponto de quebra (1023 e 1024 px, onde o menu troca) | Dois desenhos ao mesmo tempo, ou nenhum | **03.10:** o e-mail do rodapé saía da tela no tablet (agora quebra depois do "@") |
| Celular deitado; tablet; 1920 px | Primeira tela sem a ação; linhas longas demais | — |
| Nome do estabelecimento longo, endereço longo, lista com 30 itens | O cabeçalho quebra; o cartão perde a forma | **01.10:** na barbearia, o vínculo da marca ficava sem nome quando o nome não cabia (acessibilidade 96 no celular) |
| Alvo de toque perto de 44 px | Alvo pequeno demais para o polegar | **07.10:** os bairros de Para quem com 43 px |
| A página do orçamento com todos os itens | A página cresce além da tela | **07.10:** a página de orçamento do depósito crescia além da tela (a grade ganhou uma coluna só, até o computador) |
| `white-space: nowrap` em frase, e não só em valor curto | A linha não quebra e empurra a página para o lado | **Setembro:** a armadilha mais reincidente dos demos, em três nichos (`../esteira/07-composicao.md`, seção 2) |
| Texto três vezes maior que o do conteúdo de teste; número muito grande | O leiaute estoura, corta ou empurra a ação para fora da primeira tela | — |

**Onde automatizar:** a régua (bloco 1, catorze larguras). O conteúdo extremo se põe à mão no conteúdo de teste, numa exploração.

### 2.4 · Tempo e fuso

| Tentar | Por que quebra | Já aconteceu |
|---|---|---|
| Sábado, domingo, feriado | A regra do dia útil esquecida | **Até 07.10:** o "Agora" do depósito aparecia no sábado, sobre a linha dos dias úteis, e até as 18h, depois de a loja fechar às 13h |
| Um minuto antes de fechar; o minuto de fechar; meia-noite | Comparação com `<=` no lugar de `<` | — |
| A virada do mês e do ano; 29 de fevereiro (2028) | A conta de "daqui a N dias" | — |
| O visitante noutro fuso (`timezoneId: "Europe/Lisbon"`) | O site mostra a hora do aparelho, não a de Niterói | — (o depósito converte para `America/Sao_Paulo`: o modelo) |
| A volta do horário de verão (suspenso desde 2019) | Horário que existe duas vezes, ou nenhuma | — |

**Onde automatizar:** unidade, com datas explícitas (`04`, seção 4.3), e ponta a ponta com relógio fixo (`05`, seção 5.5).

### 2.5 · Rede ruim e código que não chega

| Tentar | Por que quebra | Já aconteceu |
|---|---|---|
| Rede lenta (3G) e tocar antes de o código chegar | O clique sem resposta enquanto o código baixa | **Até 03.10:** o menu e o simulador ficavam sem resposta enquanto o código baixava (agora o cartão espera à vista, com `aria-busy`) |
| O código sob demanda que falha (`page.route("**/_next/static/chunks/**", r => r.abort())` no pedaço do painel) | A promessa rejeitada sem saída | — (o menu cai no índice do rodapé; o simulador abre o site numa aba nova: o modelo) |
| Fonte que chega tarde | O texto pula quando a fonte troca (CLS) e refaz o leiaute | **01.10:** o Inter custava ~50 ms de TBT a mais com CPU 20×; passou a `display: optional` |
| Imagem que não carrega | O espaço some, ou o texto alternativo quebra o leiaute | — |

**Onde automatizar:** ponta a ponta com `page.route` (abortar o pedaço, atrasar a fonte).

### 2.6 · Navegação, histórico e estado

| Tentar | Por que quebra | Já aconteceu |
|---|---|---|
| Abrir uma página pela navegação interna, e não pela carga | Efeito que só roda na carga | **Até 07.10:** os globos das páginas abertas pela navegação interna não giravam ao aparecer |
| Voltar e avançar com um diálogo aberto; recarregar com âncora | Diálogo órfão; foco perdido; rolagem no lugar errado | **03.10:** a rolagem suave das âncoras valia também na troca de página (faltava `data-scroll-behavior="smooth"` no `<html>`, aviso do Next 16) |
| Abrir o menu e girar o aparelho, ou alargar a janela até a mesa | O painel do celular aberto no desenho da mesa | — |
| Clicar durante a transição entre páginas | Duas páginas montadas; estado da anterior | — |
| Abrir o endereço numa aba nova, sem a sessão anterior | Estado que só existe depois de uma visita anterior (a entrada que roda uma vez, a classe `.ja-aberto`) | — |
| Conteúdo trocado antes da hidratação | Erro de hidratação 418 | O `<Suspense>` por seção, com texto do DOM alterado antes da hidratação, causava o erro 418 e âncoras fora do lugar: saiu |

**Onde automatizar:** ponta a ponta (navegação interna e depois a asserção, `05`, seção 5.3).

### 2.7 · As preferências do visitante

| Tentar | Por que quebra | Já aconteceu |
|---|---|---|
| Script desligado | Conteúdo que só aparece com script | — (a régua vigia desde 07.10, bloco 2) |
| Movimento reduzido | Texto que fica invisível porque a entrada nunca roda; animação sem fim | — (a régua vigia desde 07.10, bloco 2) |
| Cores forçadas (contraste alto) | Cópias decorativas pintadas pelo fundo saem sem cor; o botão perde o contorno | A regra única de `app/movimento.css` esconde as cópias do Spell UI |
| Zoom de 200% no texto; espaçamento de texto | Texto cortado em caixa de altura fixa | — |
| Só o teclado | Ação só no hover; foco que some sob o cabeçalho | — |
| Só o leitor de tela | Nome, papel e estado que a tela mostra e o leitor não diz | — (`06`, seção 5) |
| Toque sem hover; ponteiro fino sem toque | Ação que só aparece no hover; hover que gruda depois do toque | — (`../esteira/09-movimento.md`, seção 5, item 10) |
| Transparência reduzida (`prefers-reduced-transparency`) | O vidro e as sobreposições perdem o fundo, e o texto perde contraste | — (`../esteira/06-cor-forma-e-superficie.md`, seção 10) |

**Onde automatizar:** a régua (sem script, movimento reduzido), o axe e a emulação de cores forçadas (`06`, seção 6).

### 2.8 · Cache e publicação

| Tentar | Por que quebra | Já aconteceu |
|---|---|---|
| Visitar a versão anterior e depois a nova, sem limpar o cache | Arquivo de `public/` antigo, guardado, com a referência nova faltando | **03.10:** o "A" de O Atlas sumiu para quem tinha o `marca.svg` em cache (uma semana) |
| Rodar o servidor standalone, o que a Hostinger roda | O standalone não leva o `public/` nem o `.next/static` | **03.10:** o logotipo, as prévias e a imagem de compartilhamento davam 404 (o `postbuild` agora copia; um servidor que já estava rodando precisa ser reiniciado) |
| Publicar sem uma variável de ambiente | O formulário nunca envia; o redirecionamento do domínio não liga | — |
| O endereço temporário da Hostinger depois da virada do domínio | O site acessível em dois endereços | — (`SITE_NO_DOMINIO=1` no `next.config.ts`: o modelo) |
| O endereço temporário da Hostinger **antes** da virada do domínio | O temporário redireciona para o domínio, onde ainda está o site antigo, e o site novo não pode ser conferido | **03.10:** impedia conferir o site novo (o redirecionamento só vale com `SITE_NO_DOMINIO=1`, ligado na virada) |

**Onde automatizar:** a fumaça no endereço publicado (`05`, seção 7) e o teste contra o `server.js` standalone (`05`, seção 2).

### 2.9 · Concorrência e repetição

| Tentar | Por que quebra | Já aconteceu |
|---|---|---|
| Duplo clique em "Enviar" | Dois e-mails, duas marcações | — |
| Duas abas, o mesmo horário da Agenda | A marcação dupla, se a defesa estiver só na tela | — (a chave única no banco é a defesa, `09`, seção 5) |
| Clique repetido no mesmo cartão enquanto o código baixa | Duas aberturas do diálogo | — (o simulador ignora o segundo clique: o modelo) |

**Onde automatizar:** ponta a ponta com dois contextos (`05`, seção 5.6).

### 2.10 · O aparelho modesto

| Tentar | Por que quebra | Já aconteceu |
|---|---|---|
| CPU 20× | Script que mexe no estilo a cada quadro | **03.10:** a onda do Spell UI, por script: 716 ms de linha principal no módulo dela (rastro; não é o TBT, que por coincidência teve a mesma mediana depois da correção) e o LCP de 2,07 para 2,33 s |
| WebGL desenhado em software | A compilação dos shaders trava a linha principal | **01.10:** a barbearia com 280 ms de TBT; caiu para 130 com a compilação paralela |
| Tela de densidade 2 e 3 | O 3D borrado | **03.10:** as fichas da barbearia desenhadas de 31% a 64% da resolução nativa (agora 69% a 101%) |
| Rolar rápido no 3D | Estado guardado por par de seções, que troca de uma vez | **03.10:** as fichas da barbearia davam giros inesperados ao rolar (a face agora troca só de perfil, numa posição contínua) |
| Safari do iPhone (motor WebKit) | O que só o Safari faz, inclusive a área segura do recorte | — (até 08.10.2026 só o Chromium foi exercitado; `14-ciclo-de-qa.md`, seção 4) |

**Onde automatizar:** a comparação intercalada (`08`, seção 4). O resto é aparelho real (`08`, seção 8).

### 2.11 · O próprio instrumento

| Tentar | Por que quebra | Já aconteceu |
|---|---|---|
| Duvidar do resultado surpreendente | O instrumento mede outra coisa | A sonda que rolava 600 px a cada 120 ms acusou 207 componentes invisíveis (setembro); as cores `oklab` lidas como RGB (07.10); o canvas fixo tomado por cobertura (07.10); o Playwright aberto inflando o TBT (01.10); o mouse físico invertendo o teste da inclinação (03.10); a base compilada dentro do repositório com o CSS dobrado (03.10); a captura de página inteira reiniciando a animação do título (07.10) |

**Onde automatizar:** a calibração de toda verificação nova (`02-regua.md`, seção 10).

---

## 3. Cartas prontas

Cada carta segue o formato *"Explorar <alvo> com <recursos> para descobrir <informação>"* (`01-metodologia.md`, seção 6). As sessões duram de 45 a 90 minutos, e a folha está em `modelos/carta-de-exploracao.md`.

| Categoria | Carta |
|---|---|
| 2.1 | Explorar os endereços do site com âncoras e caminhos malformados para descobrir o que derruba a página ou responde sem `noindex` |
| 2.2 | Explorar a funcionalidade do ofício com números em todos os formatos brasileiros e estrangeiros para descobrir a conta que erra ou a mensagem que sai cortada |
| 2.3 | Explorar as páginas de preço com 320 px e o conteúdo mais longo do briefing para descobrir o que transborda ou corta |
| 2.4 | Explorar toda lógica de horário com o relógio fixado em sábado, domingo, véspera de feriado e nos minutos de fronteira para descobrir o estado errado |
| 2.5 | Explorar as ilhas sob demanda com a rede lenta e o pedaço de código bloqueado para descobrir o clique sem resposta |
| 2.6 | Explorar a navegação interna, o voltar e o recarregar para descobrir o efeito que só roda na carga |
| 2.7 | Explorar o site só com o teclado e com cores forçadas para descobrir a ação inalcançável e o foco que some |
| 2.8 | Explorar o endereço publicado com o cache da versão anterior para descobrir o arquivo velho que quebra a página nova |
| 2.9 | Explorar o formulário e a Agenda com duplo clique e duas abas para descobrir o envio repetido |
| 2.10 | Explorar o Completo num Android de entrada para descobrir a trava, o calor e o 3D borrado |

---

## 4. O histórico de defeitos

Em ordem de data. Os de setembro são dos doze demos estáticos, de arquivo único, que antecederam o Next.js: ficam pela lição, não pela tecnologia.

| Data | Defeito | Causa | Correção | Regra que ficou | O que pega hoje |
|---|---|---|---|---|---|
| set. | 207 componentes "invisíveis" no celular | A sonda rolava 600 px a cada 120 ms, mais rápido que qualquer polegar | A sonda | Antes de acusar defeito, verificar o instrumento | `01`, seção 5 |
| set. | Um manômetro lido como "relógio" | Doze graduações em volta de um ponteiro central leem-se como relógio | A peça saiu | O teste do desconhecido | `11`, seção 4 |
| set. | Duas portas de interação aprovaram reações quebradas | Uma colhia só `transform`, e a reação era por máscara; outra media só o celular, e o defeito estava na mesa | As portas passaram a colher tudo no bloco reativo, nas duas larguras | Porta que conhece o nome do que testa só encontra o que já se esperava | `01`, seção 3; o teste de cada funcionalidade (`05`) |
| set. | Texto: a enumeração numa oração só estourava o teto de 28 palavras (três vezes, sempre no aviso de degradação sem script); o hedge "costuma" reprovou em dois nichos; a busca por palavra acusava quem declara a ausência ("não publicamos antes e depois") | A régua verbal contava o termo, sem o sentido | Enumeração quebrada em orações curtas; hedge cortado; vocabulário em aviso | Uma ideia por período; "economia não é secura" (o modo de falha oposto, o texto seco, é pior); a busca por palavra é aviso, e não falha (`../esteira/10-texto-e-conteudo.md`, seções 2 a 4) | Régua, bloco 10 (aviso); leitura (`10`, seção 5) |
| set. | O acento ilegível no claro, a peça do celular fora de medida e o título em quatro linhas | Um token servindo a dois papéis; a largura e o tamanho máximo deduzidos de outro contexto | Tokens próprios (`--acento-cl` e `--acento-hover`; `--palco-cel`; `--h1-max` por nicho) | Token que serve a dois papéis vira dois tokens | Leitura dos tokens; régua, blocos 4 e 6 |
| set. | Paralaxe inerte nos demos, sem erro visível | O seletor composto `.js.ponteiro` escrito como descendente (`.js .ponteiro`): o espaço a mais mudava o que o seletor alcançava | O seletor corrigido | Seletor composto e seletor descendente são coisas diferentes (`../esteira/13-tecnologia-e-estrutura.md`, seção 3.3, item 9) | Leitura do CSS; captura com o ponteiro em movimento |
| 01.10 | TBT dobrado na medição | O navegador do Playwright aberto na mesma página | Fechá-lo antes de medir | O método do Lighthouse | `08`, seção 3 |
| 01.10 | TBT ~50 ms maior com CPU 20× | A troca tardia do Inter refazia o leiaute da página inteira | `display: optional` no Inter | Fonte que chega tarde não troca o texto já desenhado | Lighthouse (`08`) |
| 01.10 | LCP de 2,88 s com CPU 20× | A tela de trás da capa, preguiçosa, podia virar o elemento do LCP | As duas telas com prioridade | A maior imagem da primeira tela com prioridade | Lighthouse; item 10 da lista de 22 |
| 01.10 | Fontes dos nichos baixadas em "Para quem" | A pré-busca do `<Link>` e a fusão de CSS do empacotador | Vínculo comum para os sites de exemplo; declaração própria da fonte da tela | Fonte de site de exemplo nunca é importada pelo Atlas | Régua, bloco 5 (fontes); lint (`03`, seção 2) |
| 01.10 | CLS da esfera da capa | A primeira pintura chegava antes do fim do HTML | Corrigido (descrito na especificação do site, seção 3) | — | Régua, bloco 5 (CLS) |
| 01.10 | TBT da barbearia de 280 ms | Compilação dos shaders na linha principal | `KHR_parallel_shader_compile`; o atlas desenhado uma ficha por vez | O 3D compila sem travar | Lighthouse (`08`, seção 9) |
| 01.10 | Vínculo da marca da barbearia sem nome no celular | O nome sumia quando não cabia | O nome fica para o leitor de tela | Nome acessível não depende do espaço | Régua, bloco 3 |
| 01.10 | Repetições de texto na verificação de unicidade do site do Atlas | Aberturas que repetiam o título ou o lide da seção de baixo; a formação dos sócios dita seis vezes; o índice das dúvidas, que repetia a lista; a régua do trabalho, que repetia os números das etapas; a porta "24 h", que repetia a capa; na nutrição, "48 h" ao lado de "dois dias úteis" para o mesmo prazo | Cada fato dito uma vez por página; o prazo com uma só redação | Cada fato aparece uma vez; o mesmo fato tem a mesma redação em todo o site (`../esteira/10-texto-e-conteudo.md`, seção 2) | Leitura; coerência entre páginas (`10`, seção 6) |
| 01.10 | A ficha 3D até 58 px sobre o texto | A posição do palco não considerava a caixa do texto | Corrigido | A peça-assinatura não cobre texto | Captura nas larguras da régua; exploração (`2.3`) |
| 01.10 | O atalho flutuante do WhatsApp cobria o texto, observava só os alvos da primeira página e entrava sem passagem | O botão ficava sempre à vista sobre o texto, e a lista de alvos que o escondia era a da primeira página | O atalho aparece só depois da primeira tela, recolhe ao rolar para baixo, volta ao rolar para cima e entra com passagem | A ação flutuante responde à direção da rolagem, nunca à posição, e observa as ações de toda página, e não só as da primeira (`../esteira/14-funcionalidades/01-base-de-todo-site.md`, seção 1) | Exploração (`2.6`); ponta a ponta com navegação interna (`05`, seção 5.3) |
| 01.10 | O globo e o halo da capa cortados em linha reta | Um anteparo retangular atrás do texto | Máscara radial e degradê contido, transparente nas bordas; o raio em porcentagem pura | Máscara funcional não deixa aresta; no Chromium, o raio do gradiente radial não mistura % e px em `calc()` | Capturas nas quatro larguras; régua, bloco 4 |
| 01.10 | O botão redondo do pé das páginas pulava 6 px sem transição; a compressão ao toque de todos os botões estalava; o botão magnético tremia | `translate`, `scale` e `rotate` ficaram fora da lista de uma transição própria (no Tailwind 4 não são `transform`); o ímã media o ponteiro na caixa já deslocada por ele | As propriedades entraram na lista da transição; a posição passou a ser medida sem o deslocamento do próprio botão | Botão não anda nem muda de tamanho no hover; elemento que se move com o ponteiro mede a posição sem o próprio deslocamento (`../esteira/09-movimento.md`, seções 5 e 10; `../esteira/13-tecnologia-e-estrutura.md`, seção 3.3) | Ponta a ponta do ponteiro; exploração (`2.6`) |
| 03.10 | `/#%E0` derrubava a página inteira | `decodeURIComponent` sem `try`, dentro de um efeito | `ancoraDoEndereco` com `try`/`catch` (e o mesmo na chegada do montador) | Nada de `decodeURIComponent` solto: a decodificação segura num lugar só (no site novo, `lib/ancoras.ts`: `decodificarAncora(hash)` e `ancoraDoEndereco()`) | Lint (`03`); unidade (`04`); ponta a ponta (`05`) |
| 03.10 | O vínculo "Montar orçamento" da 404 virava `//orcamento`, que o navegador lê como outro domínio | O vínculo concatenava "/" a um caminho que já começava com "/" | Caminho absoluto do próprio site, sem concatenar | Vínculo interno é um caminho absoluto do site, nunca a soma de "/" com um caminho (`../esteira/14-funcionalidades/01-base-de-todo-site.md`, seção 14) | Ponta a ponta da página inexistente (`05`, seção 5.3) |
| 03.10 | O logotipo, as prévias e a imagem de compartilhamento com 404 | O standalone não leva o `public/` nem o `.next/static` | O `postbuild` (`ferramentas/preparar-standalone.mjs`) | Testar o servidor que vai ao ar | Ponta a ponta contra o `server.js`; fumaça |
| 03.10 | O endereço temporário da hospedagem redirecionava para o domínio, onde ainda estava o site antigo, e impedia conferir o site novo antes da virada | O redirecionamento do temporário valia sempre | O redirecionamento só vale com `SITE_NO_DOMINIO=1`, ligado na virada do domínio (`next.config.ts`) | O site novo se confere no endereço temporário antes de o domínio apontar para ele; o temporário só converge depois da virada (`../esteira/18-publicacao-e-manutencao.md`, seção 2.2, passos 5 e 10) | A conferência pós-publicação (`../esteira/18-publicacao-e-manutencao.md`, seção 5, itens 4 e 5); a fumaça (`05`, seção 7) |
| 03.10 | O "A" de O Atlas sumiu | A referência nova `#letra` não existia no `marca.svg` guardado em cache por uma semana | O traçado voltou ao componente | Arquivo de cache longo não ganha referência nova; mudou, muda o nome | A visita com o cache antigo (`2.8`) |
| 03.10 | 716 ms de linha principal no módulo da onda (rastro, não TBT); LCP de 2,07 para 2,33 s | A onda do Spell UI movia o degradê por script, a cada quadro | Refeita só com `transform`, como componente de servidor | Nada de script que mexa no estilo a cada quadro | Comparação intercalada (`08`, seção 4) |
| 03.10 | O brilho do Spell UI rodava em 0 s | O Lightning CSS reduziu a abreviação `animation` sem nome a `animation: none` | A abreviação inteira, com o nome, em cada regra | Toda abreviação `animation` leva o nome | Verificação do CSS compilado (`03`, seção 5) |
| 03.10 | A base de comparação com o CSS dobrado (48,6 contra 25,5 KB) | Compilada dentro do repositório, o Tailwind leu o `node_modules` | A base compilada fora do repositório | Base de comparação fora do repositório | `08`, seção 3 |
| 03.10 | O teste da inclinação respondia ao contrário | O mouse físico sobre a janela do navegador com tela | Navegador sem tela, ou mãos fora do mouse | O ambiente do teste é parte do teste | `01`, seção 11 |
| 03.10 | As fichas 3D giravam sem motivo ao rolar | A virada guardada por par de seções; o par trocava de uma vez | Uma posição contínua na sequência de faces; a face troca só de perfil | Estado contínuo, nunca por limiar; reproduzir gravando o que o shader recebe a cada quadro antes de mexer | Exploração (`2.10`); aparelho real |
| 03.10 | As fichas 3D borradas | Desenho de 31% a 64% da resolução nativa; células de 512 px ampliadas | Resolução da tela até 2×; células de 1.024 px | Medir em telas de densidade 2 e 3 | Aparelho real (`08`, seção 8) |
| 03.10 | Números das caixas do início com 4,49:1 | Cor do texto no limite | Cor ajustada (acessibilidade 100) | O contraste se mede, não se calcula do hexadecimal | Régua, bloco 4 |
| 03.10 | "Copiado" com a cópia recusada | A confirmação não dependia do resultado | A confirmação só se a cópia deu certo; "Cópia indisponível" no lugar | O estado diz o que aconteceu, não o que se esperava | Ponta a ponta (`05`, seção 5.1) |
| 03.10 | Menu e simulador sem resposta enquanto o código baixava | O clique esperava o código, sem estado | O cartão espera à vista (`aria-busy`); a falha cai no comportamento sem script | Toda espera tem estado visível e saída | Ponta a ponta com rede lenta (`2.5`) |
| 03.10 | O esqueleto de imagem (`vd-esqueleto`), posto direto na `<img>`, pulsava a imagem já carregada [NV: reconstituído da regra de 03.10] | A classe animava a opacidade, e sem limite de repetições | A classe passou a pulsar só a cor de fundo, devagar, seis vezes, e a parar | O esqueleto pulsa a cor do fundo, e não a opacidade, e para depois de poucas repetições (`../esteira/08-imagem-e-fotografia.md`, seção 8, item 6) | Captura da imagem carregada; leitura do CSS |
| 03.10 | ~11 KB (depósito) e ~6 KB (barbearia) a mais no HTML de cada página | Duas ilhas recebiam o objeto inteiro do site | Só os campos usados, por props (−73,5 KB nas 23 páginas) | A ilha recebe só o que usa | Lint (`03`, seção 2) |
| 03.10 | O e-mail do rodapé saía da tela no tablet | Palavra longa sem ponto de quebra | Quebra depois do "@" | Palavra longa (e-mail, endereço) tem ponto de quebra (`../esteira/07-composicao.md`, seção 2) | Régua, bloco 1 |
| 03.10 | O botão de WhatsApp do menu estourava a largura a 320 px | O botão levava `text-corpo` (17 px) e não cabia | O tamanho padrão do botão | Botão de ação num menu estreito usa o tamanho padrão; confere-se a 320 px (`../esteira/07-composicao.md`, seção 8) | Régua, bloco 1 |
| 03.10 | A rolagem suave valia na troca de página | Faltava `data-scroll-behavior="smooth"` no `<html>` (aviso do Next 16) | O atributo | Ler os avisos do Next | Leitura do console; a página vigiada (`05`, seção 3) pode registrar também os avisos (`console.warn`), como aviso |
| 03.10 | 6 vulnerabilidades altas no `npm audit` | Vinham do CLI do `shadcn`, nas dependências de produção | O CLI passou às de desenvolvimento | A auditoria olha a árvore de produção | `npm audit --omit=dev` (`03`, seção 6) |
| 03.10 | A barra da barbearia rolava com a página | Uma regra de CSS fora de camada vencia o utilitário | Presa no topo | CSS de marca mora numa camada (`@layer`) | Captura rolada; exploração (`2.6`) |
| 03.10 | O lide perdia o tamanho | O `cn` (tailwind-merge) tomava `text-destaque` por cor e o descartava ao lado de `text-muted-foreground` | `createCn` com a escala do site, validado com testes | O `cn` conhece a escala do site | Unidade (`04`, seção 2) |
| 03.10 | Promessas do texto do site sem fonte nos documentos | Textos escritos antes da decisão: pagamento em duas parcelas; mensalidade a partir do mês seguinte à publicação; avaliação gratuita do site atual do cliente; "relatório mensal de acessos" sem dizer como; "estudantes da UFF" (a confirmar com os três sócios); a "régua de dez blocos" | As duas parcelas entraram na ata em 07.10 (IV.2.1, item 5), e o relatório ganhou a fonte dos dados (o painel da Hostinger); a "régua de dez blocos" só passou a ter fonte com a régua do Next.js (07.10; nove blocos medem, e o bloco 8 remete aos testes de ponta a ponta); a mensalidade a partir do mês seguinte segue sem fonte, e a avaliação gratuita e a formação dos sócios seguem a confirmar | O texto do site só afirma o que os documentos sustentam (`../esteira/10-texto-e-conteudo.md`, seção 11) | Tabela de afirmações e fontes (`00`, seção 7); leitura (`10`, seção 2) |
| 03.10 | Os sites de exemplo pré-carregavam as fontes do Atlas (7, 7 e 6 fontes; três do Atlas) | Moravam sob o layout raiz do Atlas | As fontes do Atlas saíram com a família única; a folha global segue herdada (PENDENTE) | Cada site, o seu layout raiz | Régua, bloco 5 (fontes); a lista de pré-cargas no HTML |
| 07.10 | Os 16 endereços dos sites de exemplo sem `og:` | Os metadados de exemplo não tinham as marcações | O cartão de 1200 × 630 de cada site; uma função só | Marcações de compartilhamento em toda página | Régua, bloco 3 |
| 07.10 | A 404 com o canônico da capa | O canônico herdado | O canônico por página | A 404 não tem canônico | Ponta a ponta (`05`, seção 5.3) |
| 07.10 | Rolagem lateral em 320 px (nutrição, 50 px; depósito, 35 e depois 3 px) | Palavra e preço sem espaço; código de barras largo; grade de duas colunas | O preço desce de linha; código de barras de 112 px; grade de uma coluna | 320 px é largura de verdade | Régua, bloco 1 |
| 07.10 | Alvos de 43 px em Para quem | Altura da linha do vínculo | `-my-2.5 py-2.5`: 44 px sem mudar a linha | 44 px de altura em todo alvo | Régua, bloco 1 |
| 07.10 | Contraste de 4,41:1 nos códigos do depósito | O laranja sobre o quadriculado | `#a8431a` → `#9a3c16` | O contraste se mede sobre o fundo real | Régua, bloco 4 |
| 07.10 | A página de erro global sem `lang` e em inglês | A página padrão do Next | `app/global-error.tsx` e `app/error.tsx`, em português (+1,0 KB de script) | Toda página, inclusive a de erro, em português | Ponta a ponta (`05`, seção 5.4) |
| 07.10 | Os globos não giravam nas páginas abertas pela navegação interna (achado em 03.10) | O efeito procurava os globos só na carga | A procura a cada troca de caminho, com a lembrança fora do efeito | Efeito que depende da página depende do caminho | Ponta a ponta (`05`, seção 5.3) |
| 07.10 | O "Agora" do depósito no sábado (achado em 03.10, que era um sábado) | A regra do dia útil esquecida | Some no sábado e no domingo | Datas de fronteira em todo teste de tempo | Unidade e ponta a ponta com relógio fixo |
| 07.10 | O h1 de Planos "sumido" | Não era defeito: a captura de página inteira reiniciava a animação de entrada | — | Conferir no navegador antes de acusar | `01`, seção 5 |
| 07.10 | A régua acusava o que não era defeito (11 casos) | Medição errada (5), exceção legítima (5), teto mal posto (1) | A régua calibrada | Verificação nova nasce aviso | `02`, seção 6 |

---

## 5. O que continua aberto

| Item | Classe | Desde | Onde está |
|---|---|---|---|
| CLS de 0,1 em uma execução de sete, com CPU 20× | A investigar | 03.10 | `08`, seção 5 |
| TBT com CPU 20× (716 ms de mediana), quase todo hidratação | Pendente: estratégia de hidratação | 01.10 | Especificação do site, seção 7 |
| Mediana de 16 palavras por período em O Atlas | Aviso, a decidir | 08.10 | `10`, seção 5 |
| O botão de agendar da barbearia some abaixo de 640 px | Aviso, a decidir pelos sócios | 08.10 | `02`, seção 7 |
| Os botões de 36 px da barra do simulador | S3, a corrigir | 08.10 | `06`, seção 7 |
| O total do montador aperta abaixo de 375 px (problema anterior ao passe das diretrizes de 03.10, que ficou) | A corrigir | 03.10 | Registro de 03.10 (`web/CLAUDE.md`); `../esteira/07-composicao.md`, seção 8 |
| A medida inválida da calculadora sinalizada só pela cor | S3, a corrigir | 08.10 | `06`, seção 7 |
| Os totais do montador sem anúncio | S4, a melhorar | 08.10 | `06`, seção 7 |
| Foco possivelmente encoberto pelo cabeçalho fixo | Hipótese a conferir | 08.10 | `06`, seção 7 |
| Três campos dos sites de exemplo com `outline-none`, o foco só por anel ou borda | S3, conferir com cores forçadas | 08.10 | `06`, seção 7 |
| Nenhum percurso com leitor de tela registrado; símbolo e declaração de acessibilidade ausentes | A fazer | 08.10 | `06`, seção 7; `../esteira/16-acessibilidade.md`, seção 5 |
| As fotos JPEG originais dos sócios em `public/socios/`, servidas sem uso | A limpar | 03.10 | Registro de 03.10 (`web/CLAUDE.md`) |
| As marcas de IA da linha de base | A decidir pelos sócios | 07.10 | `11`, seção 6; `../esteira/99-rastreabilidade.md` |
| O 3D pausado continua redesenhando cada quadro, com a placa de vídeo em alto desempenho | A corrigir | 03.10 | `../esteira/14-funcionalidades/08-peca-assinatura.md`, seção 3.6 |
| O estado da loja diz "Corte das 15h encerrado" antes de a loja abrir | A corrigir | 03.10 | `../esteira/14-funcionalidades/07-funcionalidades-do-oficio.md`, seção 2.2; `04`, seção 4.3 |
| `viewportFit: "cover"` sem os recuos laterais (iPhone com recorte, na horizontal) | A corrigir | 03.10 | `../esteira/13-tecnologia-e-estrutura.md`, seção 6 |
| `.ja-aberto` dura o documento: depois de recarregar, a navegação interna perde as entradas | A corrigir | 03.10 | `../esteira/09-movimento.md`, seção 5 |
| Dois mecanismos de pausa (`data-pausa` na esfera; `data-fora` e `ambiente-pausado` no resto) | A unificar | 03.10 | `../esteira/09-movimento.md`, seção 5 |
| O vidro líquido refaz a refração a cada troca de página, e ela pisca | A conferir | 03.10 | `../esteira/06-cor-forma-e-superficie.md`, seção 10 |
| O marcador de "hoje" do agendador da barbearia sumia por um erro de contagem | A conferir se foi corrigido | 03.10 | `../esteira/14-funcionalidades/07-funcionalidades-do-oficio.md`, seção 3.2 |
| As sombras da etiqueta e do cupom do depósito somem no recorte chanfrado | A decidir com os cantos do depósito | 03.10 | `../esteira/06-cor-forma-e-superficie.md`, seções 6 e 7 |
| O painel do menu importa um campo de `conteudo/site.ts` (ilha não importa o módulo grande de textos): o pedaço sob demanda tem 34,5 KB comprimidos e leva frases da página ("Primeiro rascunho navegável…", "bairro a bairro") | A corrigir | 07.10 | `../esteira/13-tecnologia-e-estrutura.md`, seção 3.2 |

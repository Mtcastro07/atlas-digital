# 11 · Design e anti-IA

> **Para que serve.** A qualidade que nenhuma máquina mede sozinha, transformada em porta:
> - quando a avaliação anti-IA roda, quem decide e como se registra o veredito;
> - a lista de revisão de 22 itens, com o instrumento que confere cada um;
> - os testes de unicidade e do desconhecido, como verificação;
> - a linha de base de 07.10.2026: o que a primeira aplicação achou no site do Atlas e nos três sites de exemplo.
>
> O **método** (as marcas por categoria, os pesos, as fontes que a lista revê a cada trimestre) está em `../esteira/11-anti-ia.md`. O **padrão** do que buscar (composição, tipografia, cor, imagem, movimento), em `../esteira/04-direcao-de-arte.md` a `../esteira/09-movimento.md`.
>
> **Estado.** O método é DECIDIDO como prática de trabalho desde 07.10.2026, a pedido do usuário: "registre isso, pois futuramente vou querer que você reutilize esse método avaliativo". A avaliação como porta formal, com o critério da seção 3, é RATIFICADO. A linha de base está registrada, e **nada foi corrigido**: as correções aguardam os sócios e estão listadas em `../esteira/99-rastreabilidade.md`.

---

## 1. Por que é porta

**Regra.** Nenhum rascunho vai ao cliente e nenhum site é publicado sem a avaliação anti-IA e a lista de 22 itens, com o veredito registrado.

**Objetivo.**
- **O que custa é a suspeita.**
  - Conteúdo tido como gerado por IA perde confiança, qualquer que seja a autoria real (Raptive, 2025, pesquisa de empresa interessada) [FU].
  - Revelada a imagem de IA, a confiança migra para os sites com foto real, com mais força em saúde (CHI 2026, n = 43, https://doi.org/10.1145/3772363.3798849) [V].
  - Nos nichos regulados do Atlas (nutrição, odontologia, psicologia, medicina, advocacia), a confiança é o produto.
- **A semelhança é medida e anterior à IA.**
  - Os sites ficaram mais parecidos desde ~2007, sobretudo no leiaute (Goree et al., CHI 2021, https://doi.org/10.1145/3411764.3445156) [V].
  - Os modelos de linguagem agravam, porque produzem a resposta mais típica: a "convergência distributiva" (Anthropic, https://claude.com/blog/improving-frontend-design-through-skills) [V].
- **A régua não vê isto.** A régua prova o piso: contraste, alvo, peso. Uma página pode passar em tudo e ainda parecer que ninguém escolheu nada (`01-metodologia.md`, seção 10).

**O que não é objetivo.** Ser estranho. A primeira impressão (17 a 50 ms) favorece o simples e o familiar (Tuch et al., 2012, https://doi.org/10.1016/j.ijhcs.2012.06.003) [FU]. A estrutura e a navegação seguem a convenção. A diferença vai para a camada da marca: tipo, cor, fotografia, texto e um momento-assinatura.

---

## 2. Quando, e quem

| Momento | O quê | Quem faz | Quem assina |
|---|---|---|---|
| Fim de cada passe de design | A varredura das marcas, a contagem da série (seção 3, passo 2b) e os 22 itens, como autoconferência | O Claude Code | — |
| **Cada rodada de lapidação** (09.10.2026) | O crítico de fora: um agente novo, sem o histórico da construção, compara as capturas com a vitrine e lista as distâncias (`../esteira/19-o-padrao-atlas.md`, seção 8.5) | Um subagente do Claude Code | Quem constrói responde a cada distância |
| **Porta do rascunho de 24 horas** | A avaliação completa (seção 3) | O Claude Code | O sócio de desenvolvimento (Matheus Castro Oliveira de Luna Garcia) |
| **Porta de publicação** | A reavaliação, com o texto e as fotos finais, e o teste do desconhecido com alguém de fora | O Claude Code e um sócio | O sócio de desenvolvimento |
| Redesenho, ou o pedido "avalie com o método anti-IA" | A avaliação completa | O Claude Code | Quem pediu |
| A cada trimestre | A revisão da lista de marcas, nas fontes de `../esteira/11-anti-ia.md` | O sócio de desenvolvimento | — |

**Objetivo.** A marca de IA é **escolha**, não erro: a mesma tarja numa palavra pode ser assinatura num site e marca de IA noutro. Escolha precisa de dono. Quem constrói não é a melhor pessoa para ver o genérico no que construiu. Por isso o veredito é revisto por outra pessoa, e o teste do desconhecido usa alguém de fora do projeto.

---

## 3. A avaliação como verificação

Os passos do método (`../esteira/11-anti-ia.md`), com o que cada um produz para o relatório:

| Passo | O que se faz | O que fica registrado |
|---|---|---|
| **0 · O briefing visual** | Cinco linhas: o assunto, o público, a tarefa principal da página, três adjetivos da marca e **o único elemento memorável** declarado | As cinco linhas. **Sem elas não há avaliação**: não se separa assinatura de padrão |
| **1 · As capturas** | Cada página a 390 × 844 e a 1440 × 900, primeira tela e página inteira, **com movimento normal** (o que o visitante vê). Os estados: menu aberto, hover da ação principal, formulário com erro | As capturas, datadas. A captura de página inteira pode reiniciar a animação de entrada: título que "some" nela se confere no navegador antes de virar achado (aconteceu em 07.10) |
| **2 · A varredura** | As marcas, categoria por categoria: tipografia, cor e superfície, leiaute, cromo de modelo, movimento, texto, imagem, detalhes e **a página chapada** (P, desde 08.10.2026, à noite) | Cada achado com o lugar exato: página, seção, arquivo |
| **2b · A contagem da série** (desde 14.10.2026) | Por página, a 1440 e a 390 px: cada efeito (quantos elementos o correm na carga, ao rolar, sob o ponteiro e no toque), cada molde de seção e de cena e os blocos repetidos entre páginas (`../esteira/20-repeticao-dentro-do-site.md`, seção 3). Pedido do usuário de 14.10.2026: "parecendo que você está spamando os mesmos componentes" | A tabela da contagem, com o antes e o depois de cada correção. O mesmo efeito ou molde em mais de um bloco da página, ou em todas as páginas, é M1 até prova em contrário: fica no lugar dele, ou o registro diz por que é sistema |
| **3 · O prompt parecido** | Imaginar, ou gerar de fato, a página padrão para um briefing parecido ("site de barbearia de bairro") | O que coincide com ela, revisto ou justificado por escrito |
| **4 · A unicidade** | Sem logotipo, a capa lado a lado com os outros clientes do Atlas no mesmo nicho, com três referências do nicho e, no [P] e no [C], com três concorrentes locais do briefing (`../esteira/04-direcao-de-arte.md`, passo 9): alguém reconhece a marca? | Os ativos distintivos (famosos **e** só desta marca) e os genéricos; o resultado do portão de unicidade (seção 9) |
| **4b · A vitrine** | A capa e uma página interna lado a lado com o site do Atlas e com o exemplo do mesmo plano (nutrição, depósito, barbearia), a 1440 e a 390 px: está na mesma faixa de acabamento? (`../esteira/00-principios.md`, seção 9) | O par de capturas e o veredito de quem julgou. Mais pobre que a referência é marca P7, de peso alto |
| **5 · O desconhecido** | Para cada peça visual: "o que alguém que não sabe diria que isto é?" | A resposta, de quem respondeu. Nasceu na produção dos doze demos, em setembro de 2026, quando um manômetro foi lido como "relógio" |
| **6 · O veredito** | A tabela de achados (seção 7), com a contagem por categoria e a recomendação | A tabela, assinada |
| **7 · A reavaliação** | Depois de corrigir, capturas novas | A correção de uma marca costuma revelar a próxima |

**O protocolo de captura da primeira aplicação (07.10.2026).** Mesa: 1440 × 900 a 1×, com as barras de rolagem ocultas. Celular: 390 × 844 a 2×, com toque emulado e sem hover. Em cada página: esperar as fontes e mais 2,5 s; capturar a primeira tela antes de rolar; rolar devagar até o fim e voltar ao topo antes da página inteira. Formato: JPEG, com qualidade 70 na página inteira e 82 na primeira tela. A rodada gerou 177 arquivos (25 MB) das 24 rotas nas duas larguras, mais 74 quadros de rolagem da barbearia, sem erro, sem pedido falho e sem rolagem lateral. **Como ler as capturas:** na página inteira, as entradas aparecem no estado final e as animações em laço, no primeiro quadro; o canvas fixo da barbearia só aparece na primeira tela; o estado ao vivo segue o relógio (o depósito dizia "Fechado agora · abre amanhã, 7h" às 20:45 de uma quarta); a pilha de passos escreve estilo em linha enquanto está na tela; o aviso de CSS pré-carregado e não usado no início (as fontes de Para quem) é provável pré-busca, e não defeito.

**A classe de cada achado:**
- **Assinatura:** escolhida pelo briefing, com motivo escrito.
- **Marca de IA:** está ali porque é o padrão. **Só esta se corrige.**
- **Neutra:** convenção de uso, como o menu no alto.

**O peso:**
- **Alto:** no **ponto de decisão**, que é o título da capa ou a ação principal.
- **Médio:** numa seção.
- **Baixo:** no rodapé, num detalhe repetido.

**O critério da porta.** A porta da etapa de verificação é "régua sem falha e anti-IA sem marca de peso alto" (`../esteira/01-processo.md`, etapa 7). Em detalhe:

| Situação | A porta |
|---|---|
| Marca de IA de peso **alto** | **Reprova** o rascunho e a publicação. Só fica se for reclassificada como assinatura, com o motivo escrito: o briefing, a identidade ou um pedido do usuário |
| Marca de IA de peso médio | Não impede o rascunho. Na publicação, cada uma tem decisão registrada: corrigir, ou manter com o motivo |
| Marca de IA de peso baixo | Listada; corrige-se quando houver janela |
| Nenhum ativo distintivo no teste de unicidade | Reprova (RATIFICADO): o site não tem identidade |
| Peça visual que carrega informação lida como outra coisa no teste do desconhecido | Reprova (RATIFICADO). Se a peça é decoração, registra-se a decisão |

**Objetivo do critério.** Transformar o julgamento em decisão registrada. O que se aceita fica com dono e motivo; o que não se decide não passa.

---

## 4. O teste do desconhecido, na prática

**Regra.** Antes da publicação, uma pessoa **de fora do projeto** olha o site no celular e responde, sem ajuda:
1. Depois de 5 segundos na primeira tela: "O que é este lugar? De que ramo? Onde fica?"
2. Depois de 30 segundos: "O que se pode fazer aqui?"
3. Para cada peça visual que carrega informação (o gráfico, o diagrama, o objeto 3D, o ícone sem texto): "O que é isto?"

**Quem.** Alguém que nunca viu o projeto: um familiar ou um conhecido, de preferência do público do cliente. Nunca um sócio que acompanhou o desenho.

**Como conferir.** As respostas vão para o relatório de QA com a data. Resposta errada em peça que carrega informação é achado de peso alto.

---

## 5. A lista de revisão de 22 itens

A lista do padrão de design do Atlas, de 08.10.2026, que antes estava em `documentacao/atlas--padrao-de-design.md`, seção 9, no repositório do Atlas. Cada item tem o instrumento que o confere.

| # | Item | Quem confere |
|---|---|---|
| 1 | Um ponto focal por tela; até dois elementos grandes; até três tamanhos de tipo no conteúdo da tela, fora o cabeçalho, o rodapé e os rótulos (a escala de sete degraus é o repertório do site, não de uma tela) | Avaliação anti-IA |
| 2 | A 360 e a 390 px, a primeira tela diz o que é o negócio e onde; a ação até 60% da altura (45% na mesa) | Régua, bloco 6 (aviso; no celular, 60%; na mesa, só "nenhuma ação na primeira tela", sem os 45%) e leitura |
| 3 | Linhas de 45 a 75 caracteres (nunca acima de 80); nada justificado; centralizado só até três linhas; espaço só na escala de 4 px | A régua avisa a linha acima de 80 caracteres, contada letra a letra (o `ch` não é caractere: `../esteira/05-tipografia.md`, seção 8); a busca nas classes, para o espaço entre colchetes (`grep -rnE '\b(p|m|gap|space-[xy])[xytrbl]?-\[' app components`; a base não tem lint); e leitura |
| 4 | Razão título/corpo de 5 ou mais, ou de 2 ou menos; o máximo de cada faixa de tamanho até 2,5 vezes o mínimo | A régua mede a razão (relatório, sem julgamento); a avaliação anti-IA julga |
| 5 | Até duas famílias; a capa em exibição (razão ≥ 4, a régua avisa); nenhum deslocamento quando a fonte chega | Régua, blocos 5 (fontes, CLS) e 6 (a razão da capa) |
| 6 | Corpo de 16 px ou mais, entrelinha de 1,5 a 1,6; algarismos tabulares nos preços, nos horários e nas sessões | Leitura dos tokens e da tela; a régua avisa a fonte sem `tnum`, que faz o `tabular-nums` não mudar nada |
| 7 | `balance` nos títulos; nenhuma palavra sozinha na última linha a 360, 768 e 1280 px | Leitura nas capturas; a regressão visual mantém o que foi aprovado |
| 8 | Contraste medido: texto ≥ 4,5:1; texto grande, interface e foco ≥ 3:1 | Régua, bloco 4 |
| 9 | Um acento, em até 10% da tela | Avaliação anti-IA |
| 10 | Fotos reais (nem banco, nem IA), uma luz por conjunto, autorizações guardadas; AVIF ou WebP com as dimensões declaradas; a maior imagem da primeira tela com prioridade | Avaliação anti-IA (as fotos); leitura do código (formato, dimensões, prioridade); a pasta de autorizações (`../esteira/17-conformidade-e-normas.md`) |
| 11 | Movimento de interface até 300 ms; entradas até 600 ms, uma vez; saídas ~25% mais curtas | Avaliação anti-IA; leitura dos tokens de duração |
| 12 | Ação de teclado em 0 ms; nenhuma animação em ação frequente | Leitura; teste de ponta a ponta do teclado |
| 13 | O que se move, só por `transform` e `opacity`; a troca de cor no hover e no foco (cor, fundo, borda, filtro) pode transitar; nunca `transition: all`; hover e toque interrompíveis; arrastar com mola | Verificação do CSS compilado (`03`, seção 5); avaliação anti-IA |
| 14 | Com movimento reduzido: nada desloca, nenhum parallax, dissolução até 150 ms, nada some | Régua, bloco 2 (nada some, nada sem fim); leitura (o deslocamento) |
| 15 | O que se move sozinho por mais de 5 s tem pausa e para fora da tela; nada sequestra a rolagem; nada ligado à rolagem além da assinatura de marca decidida | Régua, bloco 2 (o que se move com movimento reduzido); leitura; `conferir-passivas` (as passivas e a cobertura) |
| 16 | INP até 200 ms num Android intermediário; troca de página até 400 ms | Medição da interação (`08`, seção 6); aparelho real (`08`, seção 8) |
| 17 | Todo controle com hover, foco (≥ 2 px, ≥ 3:1), ativo, desabilitado e carregando; alvo de toque de 44 px; o rótulo numa linha só | Régua (foco visível, alvo, rótulo partido); leitura dos estados; axe nos estados abertos. No site estático sem formulário, o "desabilitado" e o "carregando" não se aplicam: registre assim |
| 18 | Espera: nada abaixo de 1 s; esqueleto de 2 a 10 s; barra acima | Teste de ponta a ponta com a rede estrangulada; leitura. Sem nada que espere (o site estático sem envio), não se aplica: registre assim |
| 19 | Formulário: até cinco campos, rotulados; obrigatórios e opcionais marcados; validação ao sair do campo; a confirmação diz o prazo de resposta | Teste de ponta a ponta do formulário; leitura |
| 20 | Marcações de compartilhamento em toda página (imagem com menos de 600 KB); ícones; `theme-color`; página 404 | Régua, bloco 3 (as marcações e a imagem que abre; o peso da imagem, não); teste da 404 (`05`) |
| 21 | O WhatsApp na primeira tela, e o telefone ao lado dele (também na primeira tela quando o negócio atende por telefone: `../esteira/14-funcionalidades/01-base-de-todo-site.md`, seção 2); nome, endereço, telefone, horário, CNPJ e registro do conselho no início e no contato; dados estruturados válidos | Leitura; coerência e dados estruturados (`10`, seções 6 e 7) |
| 22 | As normas do conselho do nicho conferidas, com zero termo vedado | `10`, seção 3 |

**A divisão original**, registrada no padrão de design: a régua mede os itens 2, 5, 8, 15, 17 e 20; a avaliação anti-IA julga os itens 1, 4, 9, 10, 11 e 13; o resto é revisão de quem produz. A coluna acima acrescenta os instrumentos propostos nesta pasta.

**Duas lacunas que a régua pode fechar** (RATIFICADO, como aviso, `02-regua.md`, seção 10):
- os 45% da primeira tela na mesa, item 2;
- o peso da imagem de compartilhamento, abaixo de 600 KB, item 20.

---

## 6. A linha de base de 07.10.2026

A primeira aplicação do método: 24 endereços (as 23 páginas e a 404), a 390 e a 1440 px. As capturas ficaram na pasta temporária da sessão, sem versão. **Nada foi corrigido.** Esta tabela é a referência para a próxima avaliação: o que mudou, o que foi decidido, o que continua.

**O site do Atlas (sete páginas)**

| Achado | Onde (no repositório do Atlas) | Classe | Peso |
|---|---|---|---|
| Palavra do título destacada pela tarja de bronze, em todas as aberturas | `components/paginas/abertura-de-pagina.tsx` (Spell UI, `highlighted-text.tsx`) | Marca de IA | Alto |
| Onda de cor só no "24h" do título da capa | `components/secoes/capa.tsx` (`gradient-wave-text.tsx`) | Marca de IA (o slogan justifica o destaque; o gesto, não) | Alto |
| Rótulo "01 / 06 — Para quem" acima de cada título; páginas numeradas sem serem sequência | Aberturas e pé das páginas | Marca de IA | Médio |
| Capa centralizada: título, parágrafo, dois botões | `components/secoes/capa.tsx` | Marca de IA (a esfera é assinatura) | Médio |
| Faixa de números grandes com legenda (10 · 0 · 1 · 2) e a da Condição de Fundação (50% · 12 meses · 3) | Início, Planos | Marca de IA | Médio |
| Grade 3×2 de cartões iguais (as seis portas) | Início | Marca de IA | Médio |
| Faixa de nichos rolando sem fim | Início | Marca de IA | Baixo |
| Ponto médio entre metadados; "›" no fim dos vínculos | Todo o site | Cromo de modelo | Baixo |
| Entrada com subida e esmaecimento em vários blocos | Aberturas, seções | Marca de IA | Médio |
| Aforismos em dois tempos nos títulos de seção | Conteúdo (`conteudo/site.ts`) | Texto | Médio |
| Família padrão (San Francisco e Inter) sem tratamento que carregue a personalidade; título de 80 px sobre corpo de 17 px | `app/globals.css` | Escolha do usuário; o **tratamento** é que falta | Médio |
| Esfera de bronze, globo do logotipo, vidro líquido | Capa, cabeçalho, O Atlas | **Assinatura** | — |

**Os sites de exemplo**

| Site | Assinatura | Marcas de IA |
|---|---|---|
| Nutrição (Essencial) | A folha impressa: capitular, numeração romana, nota de rodapé da norma | O agrupamento creme + serifa de alto contraste + acento terracota; filetes de jornal; marca-texto numa palavra |
| Depósito (Profissional) | A ficha técnica: talão, código de barras, estado da loja ao vivo | Rótulos monoespaçados em caixa-alta; faixa zebrada e papel milimetrado (clichês de obra); "01 MATERIAIS" na navegação; grade de cinco cartões iguais |
| Barbearia (Completo) | As fichas de latão em WebGL, o gesto mais forte do projeto | Escuro com um acento só (latão); itálico numa palavra do título; "01 SERVIÇOS" na navegação; rótulo espaçado acima do título; nenhuma fotografia num ramo em que a equipe é a prova |

**A leitura da linha de base.** As marcas de peso alto do Atlas são os **gestos do Spell UI** adotados em 03.10, a pedido do usuário (a tarja e a onda). A regra de uso de 03.10 já dizia: "o componente entra como o gesto da marca, nunca como enfeite de catálogo — se caberia em qualquer site, é slop". A avaliação de 07.10 aplica essa regra e conclui que a tarja em todas as aberturas caberia em qualquer site. **A decisão é dos sócios**: manter como assinatura, com motivo escrito, ou trocar.

---

## 7. O registro do veredito

Uma tabela por site, no relatório de QA (`modelos/relatorio-de-qa.md`):

| Achado | Onde | Categoria | Classe | Peso | Decisão | Quem decidiu | Data |
|---|---|---|---|---|---|---|---|
| Uma palavra do título destacada | Aberturas · `components/paginas/abertura-de-pagina.tsx` | Tipografia | Marca de IA | Alto | A decidir pelos sócios | — | 07.10.2026 |
| As fichas de metal em relevo, em WebGL | Barbearia | Movimento | Assinatura | — | Mantida: a peça-assinatura do Completo, pedida pelo usuário | Usuário | 01.10.2026 |

**Regras do registro:**
- A decisão "manter" sempre traz o motivo, que é o briefing, a identidade ou um pedido do usuário.
- O que o briefing escolheu e justificou **não conta como marca**, mesmo que esteja na lista.
- O que a norma exige também não conta: o selo de ficção, o registro profissional, o aviso de privacidade.
- As convenções que o visitante espera ficam: menu no alto, ação no canto, rodapé com contato, WhatsApp à vista.

---

## 8. O que esta porta não faz

- **Não substitui a direção de arte.** Ela julga o resultado; quem desenha segue `../esteira/04-direcao-de-arte.md` desde o começo. Avaliar no fim não conserta um site sem identidade.
- **Não é gosto pessoal.** Todo achado aponta a marca da lista ou o teste que falhou: o prompt parecido, a unicidade, o desconhecido. "Não gostei" não é achado.
- **Não é para sempre.** A lista de marcas envelhece. O que a própria Anthropic recomendava contra o genérico em 2025 (serifa marcante, grão, cursor próprio, sombras dramáticas) virou marca de IA em 2026. A lista se revê a cada trimestre (`../esteira/11-anti-ia.md`).

---

## 9. O portão de unicidade entre clientes (automação)

**Regra.** Dois clientes do mesmo nicho dividem no máximo um dos três: o par tipográfico, a paleta ou a forma. O segundo cliente do nicho muda pelo menos dois (`../esteira/04-direcao-de-arte.md`, passo 9 e seção 6; decisão do usuário de 08.10.2026). O teste de unicidade da seção 3 confere isso a olho. Esta seção propõe a conferência automática, como **aviso**, que leva ao olho o par mais parecido.

**Objetivo.** Na vitrine do Atlas e na rua, dois vizinhos com o mesmo site seriam a prova de que o Atlas vende modelo. Com poucos clientes, o olho basta. Com dezenas, ninguém lembra de todas as capas.

**Como fazer** (RATIFICADO, sem dependência nova):
0. **A impressão digital do código** (automatizada desde 09.10.2026: `npm run unicidade`, `../base/ferramentas/unicidade.mjs`). Mede quanto do CSS e dos componentes do site é igual ao de cada site de `../referencias/` e de outros projetos (`--contra=`), sem o que é de fábrica e com o prefixo das classes normalizado. Aviso a partir de 15%, falha a partir de 30%. Calibração: até 11% entre os três exemplos sem parentesco e deles contra os dois sites de 09.10.2026; 31% do CSS e 19% dos componentes no restaurante, clonado da odontologia. Pega o que as capas não mostram: a mesma barra, o mesmo filete, a mesma escala, a mesma biblioteca.
1. **O catálogo.** A cada publicação, a capa do cliente a 390 × 844 e a 1440 × 900, sem logotipo (o logotipo escondido por uma folha de estilo na captura), e um arquivo de tokens. Ficam guardados no repositório do Atlas, ao lado do registro de identidades por nicho, que a esteira propõe criar com o primeiro cliente (`documentacao/atlas--identidades-por-nicho.md`).

   ```json
   { "cliente": "barbearia-exemplo", "nicho": "barbearia", "fontes": ["<título>", "<texto>"],
     "acento": "oklch(0.72 0.11 75)", "fundo": "oklch(0.18 0.01 60)", "raio": "4px" }
   ```

2. **A semelhança das capas**, por um hash perceptual (dHash de 64 bits), com o leitor de PNG da régua:

   ```js
   // ferramentas/unicidade.mjs — node ferramentas/unicidade.mjs <capa-nova.png> <pasta-do-catálogo>
   import { readdirSync, readFileSync } from "node:fs";
   import path from "node:path";
   import { lerPng } from "./regua/png.mjs";

   // A imagem reduzida a 9 × 8 tons de cinza; cada bit diz se a célula é mais clara que a vizinha da direita.
   function dhash(arquivo) {
     const { largura, altura, canais, px } = lerPng(readFileSync(arquivo));
     const soma = new Float64Array(72);
     const conta = new Uint32Array(72);
     for (let y = 0; y < altura; y++) {
       const cy = Math.min(7, Math.floor((y * 8) / altura));
       for (let x = 0; x < largura; x++) {
         const cx = Math.min(8, Math.floor((x * 9) / largura));
         const i = (y * largura + x) * canais;
         soma[cy * 9 + cx] += 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
         conta[cy * 9 + cx]++;
       }
     }
     let bits = 0n;
     for (let y = 0; y < 8; y++)
       for (let x = 0; x < 8; x++) {
         const a = soma[y * 9 + x] / conta[y * 9 + x];
         const b = soma[y * 9 + x + 1] / conta[y * 9 + x + 1];
         bits = (bits << 1n) | (a > b ? 1n : 0n);
       }
     return bits;
   }
   const distancia = (a, b) => [...(a ^ b).toString(2)].filter((d) => d === "1").length;

   const [nova, catalogo] = process.argv.slice(2);
   const h = dhash(nova);
   for (const arquivo of readdirSync(catalogo).filter((n) => n.endsWith(".png"))) {
     const d = distancia(h, dhash(path.join(catalogo, arquivo)));
     console.log(`${String(d).padStart(2)} de 64 bits · ${arquivo}${d <= 10 ? "  ← parecida: comparar lado a lado" : ""}`);
   }
   ```

3. **A diferença dos tokens**, entre clientes do mesmo nicho:
   - o par de fontes igual ou não;
   - o raio igual ou não;
   - a distância de cor do acento e do fundo em OKLab (ΔE_OK, a distância euclidiana em L, a, b, com a = C·cos h e b = C·sin h).

   **Aviso** quando dois dos três (par, paleta, forma) coincidem.

**A calibração.** Os três sites de exemplo do Atlas, que já são sem parentesco, dão a distância "normal" entre marcas diferentes. O limite do aviso (os 10 bits acima e a distância de cor que conta como "a mesma paleta") sai dessa medida, e não deste documento [NV]. Rode, leia, ajuste, e só então use (`02-regua.md`, seção 10).

**Como conferir.** O resultado entra no relatório de QA do rascunho. Todo par apontado como parecido foi comparado lado a lado, sem logotipo, com a decisão escrita.

---

## 10. A auditoria contra um conjunto de regras

**Regra.** Quando se pede para aplicar um conjunto de regras (as Diretrizes de Design Premium, uma lista de revisão, uma norma) a interfaces que já existem:
1. **Inventariar antes de mudar,** regra por regra, em todas as páginas, a 390 e a 1440 px, com o lugar e a contagem: famílias de fonte, tamanhos fora da escala, sombras pesadas, espaços fora da grade de 4 px, controles sem estado.
2. **Separar o que é identidade.** Todo achado que pode ser escolha de marca (uma fonte, uma cor, um efeito) vai ao usuário como pergunta, com a recomendação, **antes** de mudar.
3. **Aplicar** o que foi decidido.
4. **Medir o antes e o depois** com o mesmo instrumento (a régua e as capturas) e registrar a tabela no relatório de QA.

**Objetivo.** A regra ataca o genérico; o inventário mostra o tamanho do problema, e a pergunta protege o que é da marca. O caso do Atlas, em 03.10.2026 (`web/CLAUDE.md`, no repositório do Atlas): nas sete páginas, as famílias passaram de 3 para 1; os tamanhos, de 62 para os 7 degraus; as sombras pesadas (de 42 a 90% de opacidade), de 5 grupos para 0; os espaços fora da grade, para 0; a fonte baixada, de 52,5 para 22,9 KB, com o script inicial igual. Três escolhas de identidade foram perguntadas antes: a fonte (San Francisco e Inter), a cor (navy e creme, não o slate) e o alcance nos sites de exemplo (só espaço e estados).

**A lição.** O mesmo passe retirou os efeitos de identidade (o orbe sob o cursor, a cena, o grão, o halo, o titânio do celular, o brilho das ações) sem perguntar, e o usuário mandou devolvê-los no mesmo dia ("coloque de volta"). Efeito de identidade não é violação: entra na pergunta do passo 2.

**Como conferir.** O relatório de QA traz a tabela de antes e depois por regra e as perguntas feitas, com a resposta e a data.

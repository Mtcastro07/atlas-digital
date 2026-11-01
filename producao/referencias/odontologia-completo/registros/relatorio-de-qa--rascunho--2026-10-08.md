# Relatório de QA · Odontologia Boa Viagem · rascunho (etapa 7) · 08.10.2026

| Campo | Valor |
|---|---|
| Site, plano e módulos | Site de **exemplo** (fictício) de uma clínica odontológica em Niterói [ex]; plano **Completo**; módulos: nenhum. 14 páginas: capa, Tratamentos, os seis tratamentos, Avaliação, Equipe, Guias, Onde, Privacidade e Acessibilidade; mais a 404 |
| Porta | Rascunho de 24 horas, etapa 7 (`producao/qualidade/14-ciclo-de-qa.md`, seção 3). **Não publicado** (a etapa 8 só acontece com pedido explícito) |
| Ambiente e commit | Build de produção estático (`npm run build`, `out/`, 120 arquivos, 3,7 MB), servido por `npm run estatico` na porta 3100. Sem repositório git neste projeto de teste: nenhum commit |
| Quem verificou | O Claude Code (agente de teste, sem subagentes). A conferência do sócio de desenvolvimento, Matheus Castro Oliveira de Luna Garcia, está **pendente**; a aprovação da identidade foi simulada (`decisoes.md`) |
| **Veredito** | **Aprova com decisões pendentes.** A régua passa sem falha em 14 páginas, os 42 testes de unidade, os 19 fluxos de ponta a ponta e os 10 roteiros de teclado passam, e `npm run pronto` aprova. A porta anti-IA do kit **não fecha por regra**: a marca I6 (nenhuma fotografia, em saúde) pesa alto e é estrutural do exemplo; os sócios decidem (seção 11). Leitor de tela real, teste do desconhecido, dentista e advogado são de pessoa e ficaram de fora (seção 10) |

**Limite deste teste, a registrar:** o agente que verificou recebeu, anexado automaticamente ao contexto, o `CLAUDE.md` do repositório de origem do Atlas. Uma sessão realmente nova não teria esse conhecimento. O trabalho seguiu a pasta `producao/`, mas o resultado pode estar um pouco mais favorável do que o de uma sessão limpa.

## 1 · Régua
- **Rodada final, 08.10.2026:** `npm run regua -- --base=http://localhost:3100`, 14 páginas, **0 falha, 2 avisos, 137 s**. (A rodada completa foi repetida ao menos quatro vezes na etapa 7, depois de cada conjunto de correções, e todas terminaram com 0 falha e os mesmos 2 avisos.)
- **Primeira rodada com a identidade nova:** 219 falhas, todas de alvo de toque de 20 px em vínculos dentro de títulos e listas (`a.vinculo`); corrigidas na classe do vínculo (`min-height` de 44 px). Registrado como lacuna do kit.

| Medida, carga inicial | Resultado nas 14 páginas | Teto |
|---|---|---|
| Script | 116,9 a 120,9 KB | 180 KB |
| Fontes | 59,4 KB (dois arquivos `.woff2`, 29,9 e 29,5 KB) | 200 KB |
| Total | 226,9 a 257,0 KB | 1.500 KB |
| CLS | 0 a 0,018 (a pior é a capa: a hidratação troca o horário escrito, de três linhas, pelo estado ao vivo, mais curto; lido no código de `components/ilhas/estado-da-clinica.tsx`; aceito, abaixo do teto) | 0,05 |
| Razão título/corpo | 1,94 na mesa; 1,76 no celular (outras páginas: 1,41 a 2) | 2 (contenção) |
| Ação na primeira tela do celular | 18% a 53% da altura (capa: 53%) | 60% |

**Os avisos e a decisão de cada um:**

| Aviso | Onde | Decisão |
|---|---|---|
| No celular, nenhuma ação até 60% da primeira tela | `/acessibilidade` e `/privacidade` | Aceito: são páginas legais de texto corrido, a ação está no menu e no rodapé, e a base de fábrica dá o mesmo aviso |

## 2 · Riscos de nota 6 e 9
O mapa do projeto e a matriz completa estão em `registros/mapa-do-projeto.md` (o kit pede `producao/qualidade/mapa-do-projeto.md`, mas `producao/` não se edita por cliente). Resumo dos itens de nota 6:

| Item | Nota | Teste | Resultado |
|---|---|---|---|
| Vínculo do WhatsApp com a mensagem pronta (cabeçalho, capa, mensagem montada, cada tratamento) | 6 | Unidade (mensagem e codificação) e ponta a ponta (o `href` de cada página) | Passa |
| Registro do conselho e responsável técnica em toda página, também no celular | 6 | Régua (paridade) e leitura a 390 px | Passa |
| Ação na primeira tela do celular | 6 | Régua, composição | Passa (18% a 53%), com o aviso das duas páginas legais |
| Contraste e foco | 6 | `npm run paleta` (12 de 12 pares); régua; roteiro de teclado | Passa |
| **Pedido de avaliação** (funcionalidade 1) | 6 | Unidade e ponta a ponta (fluxo, cópia recusada e autorizada, âncora, teclado, sem script) | Passa |
| **Plano de sessões e mapa dos dentes** (funcionalidade 2) | 6 | Unidade (geometria e dados) e ponta a ponta (filtro, sem script, teclado, ida ao pedido com a região) | Passa |
| **Estado ao vivo** (aberto agora, feriado, urgência do dia) | 6 | Unidade com datas fixas e ponta a ponta com o relógio fixo (seis instantes, inclusive almoço, sábado, feriado e a virada de dia em UTC) | Passa |
| Normas do nicho no texto | 6 | `verificar-termos.mjs` e leitura frase a frase | Passa (seção 7) |
| **Peça-assinatura** (o mapa dos dentes, em SVG) | 6 | Peso, reserva sem script, **teste do desconhecido** | Peso (14,4 KB) e reserva passam; o teste do desconhecido está **pendente (pessoa)** |
| O desenho do mapa dos dentes é anatomicamente correto | 6 | Revisão de um dentista | **Pendente (pessoa)** |

## 3 · Testes
- **Unidade:** `npm test`, **42 de 42** (9 da base e 33 do ofício: horário e fechamentos, estado da clínica no fuso de Niterói, mensagem do pedido, geometria e numeração dos dentes, regiões, telefone com espaço sem quebra).
- **Ponta a ponta:** `node testes/e2e/fluxos.mjs`, **19 fluxos, 0 falha**, com a biblioteca `playwright` e o `node:assert` (o `@playwright/test` não é dependência aprovada: `decisoes.md`). Cobrem o pedido de avaliação, a cópia com a área de transferência recusada e autorizada, o mapa dos dentes (toque, teclado, âncora), o plano de sessões, o site sem script, o estado ao vivo com o relógio fixo, o menu do celular, a inclinação do mapa (só com ponteiro fino), o telefone na primeira tela a 320 px, a 404 e "nada gravado no aparelho".
- **Teclado:** `node testes/e2e/teclado.mjs`, **10 casos, 0 problema** (cinco páginas, mesa e celular): Tab e Shift+Tab sem armadilha, foco visível e não encoberto pelo cabeçalho fixo, ordem lógica.
- **Largura:** 15 larguras (320 a 1536 px) em 7 páginas: nenhuma rolagem lateral, cabeçalho em uma linha, ação do cabeçalho sem quebra.
- **axe e regressão visual:** não há (o axe não é dependência aprovada; esta é a primeira versão, sem linha de base). As verificações automáticas de acessibilidade são as da régua (bloco 4) e as do `ariaSnapshot` (seção 4).

## 4 · Conferência manual
- **Teclado:** feita por script (seção 3).
- **Leitor de tela:** **não feito com um leitor real.** Como substituto, li a árvore de acessibilidade (`ariaSnapshot`) de sete páginas: `lang="pt-BR"`, um `h1` por página sem salto de nível, marcos (`header`, `nav` com nome, `main`, `footer`), nenhum campo sem rótulo, nenhum controle sem nome, nenhum vínculo vago ("saiba mais"), `aria-live="polite"` na mensagem montada e na confirmação da cópia, o texto "abre em nova aba" nos vínculos externos. O roteiro curto em VoiceOver, TalkBack ou NVDA continua pendente.
- **Aparelhos:** só o Chrome de mesa, nas 15 larguras acima e com o emulador de toque. Sem aparelho real, sem Safari, sem Firefox.
- **Zoom a 200% e 400%, cores forçadas:** não feitos.
- **Leitura do texto em voz alta, inteiro, no celular:** não feita (é de pessoa). Fiz a leitura silenciosa frase a frase de todas as páginas (revisão de sentido, seção 7).
- **Exploração:** capturas a 390 e a 1440 px com o movimento normal, primeira tela e página inteira (rolando antes, para a revelação não deixar a seção em branco), das páginas principais.

## 5 · Desempenho
- **Bytes:** dentro dos tetos (seção 1). HTML da capa: 98,8 KB bruto, 15,2 KB comprimido, dos quais 14,4 KB são o mapa dos dentes, em SVG dentro da página; a página Onde leva o mapa do bairro do OpenStreetMap (12,7 KB de SVG) e pesa 73,2 KB bruto, 19,6 KB comprimido.
- **Lighthouse (LCP, TBT) e INP:** **não rodados.** O kit os pede antes da publicação, não do rascunho (`14-ciclo-de-qa.md`, seção 10); o protocolo de sete execuções com mediana não foi executado nesta sessão.
- **CLS:** 0 a 0,018 na régua (dentro do teto).

## 6 · Segurança e privacidade
- `npm audit --omit=dev`: **0 vulnerabilidade**. Produção: `next` 16.3.8, `react` 19.2.8, `react-dom` 19.2.8. Nenhuma dependência acrescentada.
- **Cabeçalhos** (`curl -sI`, no servidor de medição, que aplica os do `.htaccess` gerado): política de conteúdo (`default-src 'self'`, sem origem externa), HSTS, COOP `same-origin`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. **Conferidos só localmente**, não no endereço publicado.
- **Coleta:** nenhuma. A mensagem do pedido sai pelo WhatsApp do aparelho; nenhum cookie, `localStorage` ou `sessionStorage` (régua, bloco 5, e o fluxo "nada gravado").
- **Fora da busca:** `<meta name="robots" content="noindex, nofollow">` em toda página, e o selo de ficção no rodapé. O `X-Robots-Tag` só entra no `.htaccess` com `RASCUNHO=1` (conferido: o gerador o acrescenta); o `.htaccess` do build normal não o tem (lacuna registrada no diário).

## 7 · Conteúdo e normas
- **Normas** (fontes primárias lidas: Código de Ética Odontológica, CFO-118/2012, arts. 43 a 46; CFO-196/2019; CFO-271/2025; nota do CFO de 16.01.2026; LGPD): preço, convênio, antes e depois, paciente, "popular" e forma de pagamento **fora do site**; o registro do conselho e a responsável técnica em toda página; título de especialista só com a relação dos especialistas. Detalhe e fontes em `decisoes.md`.
- **`verificar-termos.mjs`:** 17 páginas lidas, **0 falha, 28 avisos**; os 28 são ausências declaradas ("Nenhum valor neste site", "não divulga valores") e títulos de especialista, todos lidos.
- **Tabela de afirmações:** `registros/mapa-do-projeto.md`; todo número tem a origem no briefing (fictício) ou na fonte citada. Duas ressalvas: os feriados de 2026 saem do calendário oficial, a conferir antes de uso real; as larguras e profundidades das coroas do mapa dos dentes são médias de livro-texto, de memória, **não conferidas**.
- **Revisão de sentido** (`producao/esteira/01-processo.md`, etapa 7):
  - **Erro de domínio:** "Há vagas na rua" (afirmação inverificável sobre a rua real) foi retirada do briefing, do conteúdo e do roteiro; "Restauração" e "Coroa" repetiam "perdeu parte da estrutura" e ganharam frases que as distinguem. A numeração FDI e a orientação das arcadas foram conferidas contra a convenção (18 a 11 e 21 a 28 em cima, 48 a 41 e 31 a 38 embaixo, a direita do paciente à esquerda de quem olha).
  - **Erro estético:** a ação do cabeçalho em duas linhas depois da troca de fonte, e o registro "CRO-" e "RJ 00000" partido no hífen, achados nas capturas (a régua passou com ambos); corrigidos.
  - **Ferramenta magra:** o plano de sessões não levava a região escolhida ao pedido de avaliação; agora leva, com a âncora (`/avaliacao/#regiao-<id>`), e há teste.
- **Sem fonte no briefing e sem dado inventado:** nenhum preço, convênio, depoimento, número de pacientes ou fotografia.
- **Pendentes de pessoa:** revisão de um dentista (anatomia, sequência e duração das sessões, larguras do desenho), advogado (convênios; antes e depois; art. 1º, § 1º, da CFO-196).

## 8 · Design e anti-IA
Capturas a 390 e a 1440 px com o movimento normal; varredura do catálogo de `producao/esteira/11-anti-ia.md`, seção 5, **categoria por categoria**, com o script `material/varredura.mjs` (o que se mede) e leitura das capturas (o resto). O briefing visual de cinco linhas, o teste do pedido parecido (imaginado, não gerado numa sessão limpa) e o de unicidade estão em `identidade.md`.

**Achados:**

| Achado | Onde | Item | Classe | Peso | Decisão |
|---|---|---|---|---|---|
| Nenhuma fotografia em um nicho de saúde, onde a equipe e o consultório são a prova | O site inteiro | I6 | Marca de IA (Imagem) | **Alto** (saúde: sempre alto) | O briefing fictício declara zero fotografia, e o pedido proíbe a de banco e a de IA: **aceita no exemplo, por decisão simulada**. Num cliente real, a fotografia do consultório e da equipe (autorização escrita) a resolve. **A decidir pelos sócios**; o kit não diz como tratar um exemplo de saúde sem foto |
| Mapa dos dentes montado com formas simples (SVG gerado por `lib/oficio/dentes.ts`) | Capa, Tratamentos, Avaliação, cada tratamento (`components/mapa-dos-dentes.tsx`) | I3 | Assinatura funcional (a confirmar); se o teste do desconhecido falhar, marca de IA de peso alto, por estar na primeira tela | — (a confirmar) | Mantido: é o controle da região e o odontograma é a convenção do ofício. **Pendente de pessoa** (teste do desconhecido) e de dentista |
| Esmaecer e subir ao entrar na tela, com a seção invisível em repouso | Capa, "O que não se faz aqui" (`data-revela`) | M1, M6 | Marca de IA (Movimento) | Médio | Reduzida a uma seção, uma vez, 500 ms; visível sem script, com movimento reduzido e na impressão (`@media print`) |
| Linhas de 76 a 89 caracteres | Quase todo parágrafo da mesa | Q2 | Defeito de qualidade | Médio (repetido) | Corrigido: larguras de 60/56/52/68 `ch` para 50/46/44/56; máximo de 75 (medido letra a letra), 50 no celular |
| Desfoque do fundo do cabeçalho sem função (95% opaco) | `components/cabecalho.tsx` | C10 | Marca de IA (Cor e superfície) | Baixo | Corrigido: retirado |
| Pontos médios entre metadados | Capa e rodapé (herdado da base) | K1 | Cromo de modelo | Baixo | Corrigido: retirados |
| Três botões de mesmo rótulo, com mensagens diferentes, na página de pedido | `app/avaliacao/page.tsx` | X5, X7 | Texto | Baixo | Corrigido: o da mensagem montada diz "Abrir o WhatsApp com esta mensagem", e o do fim da página saiu |
| Números do mapa com 9,7 px a 390 px | `app/globals.css` (`.dente-numero`) | Q9 | Defeito de qualidade | Baixo | Corrigido: 13 unidades do desenho, medidas no navegador: 11,4 a 11,7 px a 390 px (antes, 9,7); 10,3 a 10,6 px a 360 px e 8,7 a 9 px a 320 px, ainda abaixo de 11 px. São rótulos decorativos: a região se escolhe pelos controles de texto |
| O mesmo espaço entre as seções da capa | `app/page.tsx` | L6 | Marca de IA (Leiaute) | Baixo | Mantido: calma por escolha de identidade; o ritmo muda dentro das seções |
| "Nenhum X. Motivo." em quatro itens de uma seção | Capa, "O que não se faz aqui" | X1 | Marca de IA (Texto) | Baixo | Mantido: a forma é o conteúdo (as ausências são exigência de norma, declarada) |
| Degraus de 13, 15, 18 e 21 px a menos de 1,25 vez um do outro | A escala da base | T6 | Marca de IA (Tipografia) | Baixo | Mantido: escala de sete degraus do kit; a hierarquia se faz pelo peso e pelo corpo de 28 e 35 px |
| Fundo quente e acento vermelho, sem serifa e sem terracota | O site inteiro | C1 (um de três) | — | — | Não é o agrupamento; vigiar (`identidade.md`, seção 5) |

**Contagem por categoria** (cada categoria percorrida): Tipografia (T): 1 baixo, os demais sem achado; Cor e superfície (C): 1 baixo tratado, 1 a vigiar; Leiaute (L): 1 baixo; Cromo (K): 1 baixo tratado; Movimento (M): 1 médio tratado; Texto (X): 2 baixos (1 tratado); Imagem (I): **1 alto (I6)** e 1 a confirmar (I3); Detalhes (D): sem achado (`::selection`, `caret-color`, `scrollbar-color`, `:focus-visible`, `text-underline-offset`, `tabular-nums` com `tnum` real, 404 e erro próprios, ícones desenhados); Qualidade (Q): 2 tratados (Q2, Q9), os demais sem achado (régua: Q1, Q6, Q12, Q14).

**A lista de 22 itens** (`producao/qualidade/11-design-e-anti-ia.md`, seção 5):

| # | Resultado | Evidência |
|---|---|---|
| 1 | **Parcial** | Um ponto focal, dois elementos grandes (título e mapa). Mas 5 a 6 tamanhos de tipo na primeira tela (13, 15, 18, 21, 28 e 35 px), contra "até três": a escala de sete degraus do kit não permite, e o kit não diz se o cabeçalho conta |
| 2 | Atendido | Régua: ação a 53% no celular na capa; as duas páginas legais com aviso (aceito) |
| 3 | Atendido | Linhas de 45 a 75 caracteres (máximo 75 na mesa, 50 no celular, contados letra a letra); nada justificado; nada centralizado (só as telas de erro, de até três linhas); nenhum espaço entre colchetes |
| 4 | Atendido | Razão 1,94 (contenção, escrita no `identidade.md`) |
| 5 | Atendido | Duas famílias, 59,4 KB, CLS de 0 a 0,018 |
| 6 | Atendido | Corpo de 17 e 18 px, entrelinha de 1,6; algarismos tabulares com efeito medido ("1111" e "0000" com 96 px cada, a 40 px) |
| 7 | Atendido, com um resíduo | `balance` ou `pretty` em todos os títulos; palavra sozinha na última linha: um caso a 768 px ("manutenções", palavra longa numa coluna estreita) |
| 8 | Atendido | Régua, bloco 4; `npm run paleta`: 12 de 12 pares (tinta 14,03:1; aço 6,92:1; ação 14,50:1; acento 6,92:1) |
| 9 | Atendido | Um acento (o lápis vermelho: traço dos vínculos, região marcada, urgência, foco), bem abaixo de 10% da tela |
| 10 | **Não atendido** | Nenhuma fotografia (I6); decisão pedida |
| 11 | Atendido | Interface em 150 a 200 ms; entrada de 500 ms, uma vez; nenhuma saída animada |
| 12 | Atendido | Nenhuma animação em ação de teclado; o menu do celular é um `<dialog>` sem animação própria |
| 13 | **Parcial** | Nenhum `transition: all`; hover e toque interrompíveis. Mas os botões transitam `filter` e `background-color` (herança da base), e não só `transform` e `opacity` |
| 14 | Atendido | Régua, bloco 2; a inclinação e a revelação não ligam com movimento reduzido |
| 15 | Atendido | Nada se move sozinho; nada sequestra a rolagem; a revelação é por interseção, não pela posição |
| 16 | **Não medido** | INP e troca de página: aparelho real e protocolo de publicação |
| 17 | Atendido; "desabilitado" e "carregando" não se aplicam | Hover, foco (2 px) e ativo declarados; alvos de 44 px (régua, 0 falha); nenhum controle fica desabilitado nem espera dado |
| 18 | Não se aplica | Site estático, sem espera |
| 19 | Atendido, em parte | Quatro campos, todos rotulados, os opcionais marcados "(opcional)", nada a validar; o prazo de resposta está na capa e no rodapé, não numa confirmação (o pedido termina no WhatsApp) |
| 20 | Atendido | Régua, bloco 3; cartão de 80,4 KB; ícones, `theme-color` e 404 |
| 21 | Atendido, depois de corrigir | Telefone ao lado do WhatsApp na primeira tela da capa (era só no rodapé); registro do conselho no cabeçalho e no rodapé; CNPJ e dados estruturados não se aplicam ao exemplo |
| 22 | Atendido | `verificar-termos`: 0 falha; leitura frase a frase |

**Unicidade:** contra a versão estática de setembro (vinho sobre branco quente, Instrument Serif), muda o par de fontes e a família de cor (dois de três); contra os clientes do nicho, nenhum existe; contra os três concorrentes locais, **não se aplica a um exemplo**. **Teste do desconhecido:** pendente de pessoa, no mapa dos dentes e no ícone "BV".

## 9 · Defeitos
Achados nas etapas 6 e 7 e corrigidos, salvo o último, aberto (S4).

| Defeito | Severidade | Estado | Registro |
|---|---|---|---|
| Foco encoberto pelo cabeçalho fixo no Shift+Tab (WCAG 2.4.11), herdado da base | S2 | Corrigido (`scroll-padding-top`) | Diário, L23 |
| 219 vínculos com alvo de toque de 20 px | S2 | Corrigido | Diário, L26 |
| Algarismos tabulares sem efeito (a Albert Sans não tem `tnum`) | S2 | Corrigido (par Red Hat) | `decisoes.md`; diário, L31 |
| Navegação estourando entre 768 e 1100 px (herdado da base) | S3 | Corrigido (menu a partir de `lg`) | Diário, L30 |
| Ação do cabeçalho em duas linhas depois da troca de fonte | S3 | Corrigido (`whitespace-nowrap`) | Diário, L39 |
| Registro "CRO-RJ 00000" partido no hífen | S3 | Corrigido | Diário, L39 |
| Cartão de compartilhamento com o estado ao vivo congelado | S3 | Corrigido (`--sem-script`) | Diário, L32 |
| Linhas de até 89 caracteres (`ch` não é caractere) | S3 | Corrigido | Diário, L33 |
| Revelação deixando a seção em branco na impressão | S3 | Corrigido | Diário, L37 |
| Três botões de mesmo rótulo e mensagens diferentes | S3 | Corrigido | Diário, L38 |
| Telefone só no rodapé, e partido entre o DDD e o número | S3 | Corrigido | Diário, L34 |
| "Há vagas na rua" (afirmação inverificável) | S3 | Corrigido (retirada) | Diário, L42 |
| Mapa dos dentes sem largura máxima: a 768 px ocupava a coluna inteira (números de 24 px, desenho enorme) | S3 | Corrigido (`max-w-md`) | `components/mapa-dos-dentes.tsx` |
| Números do mapa dos dentes com 9,7 px a 390 px | S3 | Corrigido (13 unidades: 11,4 px) | `decisoes.md` |
| Números do mapa dos dentes com 8,7 a 10,6 px a 320 e 360 px | S4 | **Aberto**: rótulos decorativos, a região se escolhe pelos controles; a 11 px ou mais só de 390 px em diante | Seção 8 |
| Plano de sessões sem caminho para o pedido, com a região | S3 | Corrigido | Seção 7 |

## 10 · O que ficou de fora
- **De pessoa:** leitor de tela real (VoiceOver, TalkBack, NVDA); teste do desconhecido (mapa dos dentes e ícone "BV"); leitura em voz alta, inteira, no celular; revisão de um dentista; parecer de advogado sobre convênios e antes e depois; aprovação da identidade por um sócio (simulada); conferência do relatório pelo sócio de desenvolvimento.
- **Aparelhos e navegadores:** aparelho real, Safari, Firefox; zoom a 200% e 400%; cores forçadas.
- **Medições:** Lighthouse no protocolo (LCP, TBT), INP, troca de página; axe; regressão visual (sem linha de base).
- **Etapa 8 em diante:** o rascunho no endereço temporário, com `X-Robots-Tag`; os cabeçalhos no endereço publicado; a publicação. Nada foi publicado nem commitado.
- **Verificação de fatos:** os feriados de 2026; as larguras e profundidades das coroas; o formato real do número de inscrição de uma clínica (pessoa jurídica) no CRO, que no site é fictício ("CRO-RJ 00000").
- **Fotografia:** nenhuma (I6).

## 11 · Decisões pedidas
| Decisão | A quem | Prazo |
|---|---|---|
| I6: aceitar, num exemplo de saúde, a ausência de fotografia (com o motivo declarado), ou fotografar o consultório de uma clínica parceira; e dizer no kit como tratar [ex] sem foto | Os três sócios | Antes de o exemplo ir à vitrine |
| O mapa dos dentes: fazer o teste do desconhecido e a revisão do dentista; só então confirmar a assinatura (I3) | Matheus Castro Oliveira de Luna Garcia, que arranja as pessoas | Antes de o exemplo ir à vitrine |
| Movimento sem ambiente contínuo, o que diverge do quadro das camadas do [C] (`09-movimento.md`, seção 4) | Matheus Castro Oliveira de Luna Garcia | Antes da publicação |
| Autorizar o `@playwright/test`, ou fixar os scripts em Node como a forma do kit | Matheus Castro Oliveira de Luna Garcia | Na próxima revisão da esteira |
| Fazer exemplos agora, apesar da decisão de 12.09.2026 (só depois do primeiro cliente): o pedido do usuário foi explícito, e o kit pergunta sem recomendar | Os três sócios | Antes de novos exemplos |
| Convênios e antes e depois: parecer jurídico (Matheus Azevedo Abreu) | Matheus Azevedo Abreu | Antes de qualquer uso real |
| As lacunas do kit achadas neste teste (`registros/diario-do-teste.md`, L01 a L44) | Matheus Castro Oliveira de Luna Garcia | Na próxima revisão da esteira |

**Assinatura:** pendente: Matheus Castro Oliveira de Luna Garcia.

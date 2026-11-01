# 15 · A revisão do Impeccable no fechamento de cada site

> **DECIDIDO em 16.10.2026**, a pedido do usuário, Matheus Castro Oliveira de Luna Garcia, em duas falas do mesmo dia:
> 1. "Ao final de cada produção dos sites, quando você fechar, tanto o Atlas quanto os sites de nicho, aplique o Impeccable, deixe-o fazer uma revisão, use todas as suas habilidades, e veja o que converge e o que não converge com as políticas anti-IA criadas dentro do documento de produção."
> 2. "Adicione ao documento de produção que, ao final da criação de cada site, seja feito este processo: o Impeccable a 100%, com todas as suas funcionalidades, dentro do site; depois, comparar com o kit anti-IA; e, ao final, fazer as devidas mudanças e trazer o relatório, no chat, sobre o que foi feito e descoberto."
>
> **Onde entra.** É a última porta da produção de um site: depois das portas da mesa e do celular, antes do commit que vai ao rascunho ou à publicação (`14-ciclo-de-qa.md`, seção 3, item 10). Vale para o site do Atlas e para todo site de nicho, inclusive os de exemplo.
>
> **Leia com:**
> - `../esteira/11-anti-ia.md`: o catálogo das marcas, que é o "kit anti-IA";
> - `../esteira/19-o-padrao-atlas.md` e `../esteira/20-repeticao-dentro-do-site.md`;
> - `11-design-e-anti-ia.md`, a avaliação como porta.

---

## 1. A ferramenta

O Impeccable foi adotado em 14.10.2026 (`../esteira/11-anti-ia.md`, seção 4; `../claude/ferramental.md`). Há duas partes:
- **O detector:** o pacote `impeccable@4.1.0`, travado em devDependencies, com o binário `@impeccable/cli-darwin-arm64@0.1.5`. Roda com `.claude/skills/impeccable/scripts/impeccable detect --json`, sobre os arquivos (`.tsx`, `.html`) e sobre os endereços, com `--viewport 1440x900` e `--viewport 390x844`.
- **A habilidade:** fica em `.claude/skills/impeccable/` (o texto da 4.5.2), sem os ganchos automáticos. Os comandos dela estão descritos em `reference/*.md`.

Atualizar a habilidade ou o detector passa pela regra dos 7 dias e pela regra de tecnologia (`../esteira/13-tecnologia-e-estrutura.md`, seção 9).

## 2. "A 100%": o que roda de cada funcionalidade

**Regra.** No fechamento, roda tudo o que revisa e tudo o que corrige. O que cria a direção de um site novo, ou depende de alguém escolher na tela, fica fora do passe automático, com o motivo:

| Comando | No fechamento | Como |
|---|---|---|
| `detect` (o detector) | **Sempre** | No código do site e em cada página, a 1440 × 900 e a 390 × 844. O JSON bruto vai para os registros |
| `critique` | **Sempre** | As avaliações A (o design) e B (o detector e o navegador) **isoladas, em dois subagentes**, como manda o `reference/critique.md`. A avaliação A não lê o detector nem o kit anti-IA, para que a comparação da seção 3 seja independente |
| `audit` | **Sempre** | As cinco dimensões (acessibilidade, desempenho, tema, responsividade e integridade), de 0 a 4. Pode correr junto com a avaliação B |
| `polish` | **Sempre, na correção** | O passe final, sobre o que o mapa da seção 3 manda corrigir |
| `harden`, `adapt`, `optimize`, `clarify`, `typeset`, `layout` | **Na correção, quando a crítica ou a auditoria aponta para eles** | Cada achado traz o "comando sugerido". Ele é usado com o piso de ofício (`reference/craft-floor.md`) e com o `identidade.md` acima dele |
| `quieter`, `distill` | **Na correção, quando apontados** | Conversam com o documento 20 (a série dentro do site) |
| `animate`, `bolder`, `colorize`, `delight`, `overdrive` | **Só quando apontados e quando a identidade permite** | Mudam o mundo aprovado, então a mudança grande vai antes ao aprovador. "The brief wins" (a habilidade) |
| `live`, `generate` | **Oferecidos ao aprovador, não rodados sozinhos** | São o modo de variantes: alguém escolhe no navegador |
| `init` (`teach`), `document`, `extract` | **Fora** | Escrevem o PRODUCT.md, o DESIGN.md e um sistema de design paralelo, que concorrem com o `identidade.md` e com o roteiro do kit. Só entram com o pedido expresso do aprovador |
| `shape` | **Fora** | É a descoberta de um trabalho novo, não a revisão de um site pronto |
| `hooks` | **Desligado** | Decisão de 14.10.2026: os ganchos rodariam a cada edição |
| `doctor`, `pin`, `update` | **Manutenção** | Não fazem parte da revisão. O `update` segue a regra dos 7 dias |

**Objetivo.** O pedido é "o Impeccable a 100%". A tabela diz o que isso significa em cada comando, para que nenhum fechamento rode só o detector e chame o resultado de revisão.

## 3. A comparação com o kit anti-IA: o mapa de convergência

**Regra.** Cada achado do Impeccable (das avaliações A e B e da auditoria) é posto ao lado do kit e classificado numa de quatro colunas:

| Coluna | O que é | O que se faz |
|---|---|---|
| **Converge** | O Impeccable e o kit apontam a mesma coisa. Por exemplo: `side-tab` e a C11; a série de entradas e a M1; o contraste e a Q1 | Corrige-se, salvo se o `identidade.md` aprovou e o recurso passa nas cinco perguntas da seção 6 do `11-anti-ia.md` |
| **Só o Impeccable** | O kit não cobre | Se é defeito real, corrige-se e **o kit ganha a marca** no catálogo da seção 5 do `11-anti-ia.md`, com a fonte. Se é falso positivo, registra-se o motivo (o contraste estimado sobre degradê é o caso mais comum: confere-se sobre os pixels) |
| **Só o kit** | O kit aponta, e o Impeccable não vê | A régua, a contagem da série, o teste da vitrine e a página chapada (P) costumam cair aqui. Corrige-se pelo kit, e registra-se a lacuna da ferramenta |
| **Contradiz** | Um aponta como defeito o que o outro exige ou aprovou. Por exemplo: o `bounce-easing` contra a mola registrada no `09-movimento.md`; o creme com serifa contra uma identidade aprovada | Vence o `identidade.md` aprovado. Se o kit estiver errado, a regra muda no kit, com data e motivo. Se ninguém decidiu, vai ao aprovador |

**Objetivo.** A cada fechamento, o kit fica mais completo, e a ferramenta fica calibrada para os sites do Atlas. O mapa diz onde as duas réguas concordam (o que é certeza), onde uma enxerga mais que a outra (o que se aprende) e onde brigam (o que se decide).

## 4. As mudanças

**Regra.** Corrige-se, no mesmo fechamento:
- tudo o que **converge** e é real;
- o que **só o Impeccable** aponta e é real, sem mexer no mundo aprovado;
- o que **só o kit** aponta e bloqueia a porta (`14-ciclo-de-qa.md`, seção 3).

O que contradiz a identidade, ou muda uma cena aprovada, **não se corrige sozinho**: vai ao aprovador, com a recomendação.

**Como conferir:**
- o detector de novo, nas mesmas páginas e larguras, com a contagem antes e depois;
- `node producao/ferramentas/conferir-pausa.mjs <base> <páginas>`: a pausa precisa pausar de verdade (Q15 do `11-anti-ia.md`);
- a régua nas páginas tocadas;
- os testes, o `tsc` e o build de produção;
- cada decisão em `registros/<site>/decisoes.md`.

## 5. O relatório no chat

**Regra.** O fechamento termina com o relatório **no chat**, além do registro. Ele traz:
1. por site, as notas: as heurísticas de Nielsen (sobre 40, ou renormalizadas) e a auditoria (sobre 20);
2. a contagem do detector antes e depois, por largura;
3. o mapa de convergência resumido: o que converge, o que só o Impeccable viu, o que só o kit viu e o que contradiz;
4. **o que foi feito**: as mudanças, com os arquivos;
5. **o que foi descoberto**: as marcas novas que o kit ganhou e os falsos positivos calibrados;
6. o que ficou com o aprovador, com a recomendação;
7. o que não foi conferido: aparelho real, leitor de tela e sobreposição visível do detector.

**Objetivo.** O pedido é ver o que foi feito e descoberto sem abrir os registros.

## 6. Como fazer, passo a passo

1. Build de produção, servido localmente.
2. Para cada site, em paralelo, dois subagentes isolados: A (a crítica de design) e B (o detector, a evidência do navegador e a auditoria). Nenhum dos dois edita arquivos.
3. A síntese por site (o relatório da crítica) e o mapa de convergência contra o kit.
4. A correção, com os comandos da seção 2, por site, sem tocar no que é de outro site.
5. A conferência da seção 4.
6. O registro:
   - os achados em `registros/<site>/decisoes.md`;
   - as marcas novas no `../esteira/11-anti-ia.md`;
   - a calibração na seção 7 deste documento.
7. O relatório no chat (seção 5).

## 7. A calibração registrada

Cada fechamento acrescenta aqui o que aprendeu sobre a ferramenta: os falsos positivos que se repetem e as regras que contradizem o kit, com a decisão tomada.

- **14.10.2026.** O contraste estimado sobre degradê ou transparência ("analytic-gradient") erra muito. Dos 218 casos conferidos sobre os pixels, nenhum falhou. Confere-se sempre sobre o fundo desenhado.
- **14.10.2026.** O `bounce-easing` acusa a `--ease-mola` global, que fica pelo botão magnético da barbearia (`../esteira/09-movimento.md`). Por isso, é uma contradição registrada, não um defeito.
- **16.10.2026, o primeiro fechamento completo.** O relatório completo está na raiz do repositório de implantação (`atlas--relatorio--2026-10-14.md`, seção 13).
  - **O processo:** 14 avaliações isoladas (A e B nos sete sites) e 7 corretores.
  - **As notas:**
    - Nielsen, de 24/32 a 30/40, todos na faixa "Bom" menos a barbearia, "Aceitável";
    - a auditoria, de 14 a 17 sobre 20.
  - **O detector nas páginas** (40 páginas, a 1440 e a 390 px): de 1.066 achados para 840.
  - **O que o detector errou:** quase tudo o que ele acusou era falso positivo ou identidade aprovada. O que foi real veio, sobretudo, da avaliação A e da auditoria, que o detector não faz.

  **Os falsos positivos que se repetem (conferir antes de corrigir):**
  - **`low-contrast`** sobre degradê, grão, `background-clip: text`, filtro SVG, `sr-only`, `<details>` fechado e o navy do `body` do Atlas por baixo das demos. Foram mais de 1.500 medições sobre os pixels nos sete sites, e nenhum texto ativo ficou abaixo do mínimo.
    - Desde 16.10, o `body` das demos é transparente (`app/globals.css`), e o detector passa a medir contra o fundo real.
    - Por isso surgiu o `cream-palette` na nutrição: é a C1 do kit, e a palha é a identidade aprovada.
  - **`bounce-easing`:** vinha da regra `[data-magnetico]` e da `--ease-mola`, globais, em toda página. Desde 16.10 ficam no `barbearia.css`, e o detector só as acusa na capa da barbearia, onde o ímã existe (exceção registrada no `09-movimento.md`).
  - **`marquee`:** lê `infinite` no texto do CSS, mesmo quando a animação computada tem 3 iterações.
  - **`wide-tracking`:** acusa o versalete (`all-small-caps`).
  - **`cramped-padding`:** acusa a linha de preencher dos formulários e as pílulas com `min-h`.
  - **`line-length`:** estima a largura do caractere em 0,5 em; a monoespaçada tem 0,6.
  - **`side-tab`:** acusa as paredes de 3 px de uma planta baixa e o filete de baixo de um cabeçalho.
  - **`body-text-viewport-edge`:** acusa os itens de galeria de rolagem lateral, fora da janela.
  - **`buried-raster`:** acusa o menu `<dialog>` fechado e o grão em opacidade 0.
  - **`heading-rhythm`:** mede até irmãos que não são os vizinhos visuais.
  - **`tiny-text`:** lê o corpo do texto SVG em unidades do desenho (7,5), quando na tela ele sai com 14 px.
  - **`flat-type-hierarchy`:** lê o `font-size` do h1 quando o tamanho mora nos `span` filhos.

  **O que só a auditoria e a avaliação A acharam** (o detector não vê; as marcas novas estão no `11-anti-ia.md`):
  - a pausa que não pausa (Q15), no pet shop e no depósito;
  - o texto a 200% que some (Q16);
  - a ferramenta sem a regra do domínio (Q17);
  - os acentos que colidem na exibição (T12);
  - o anel de foco da cena que vaza para o papel (restaurante, 1,07:1);
  - a peça presa mais alta que a tela (a comanda);
  - o corte a 320 px por grade sem `minmax(0, 1fr)` sob `overflow-x: clip`;
  - o rádio feito só de `box-shadow`, que some em cores forçadas;
  - o gatilho de menu em `<a>` que a barra de espaço não abre;
  - o 3D desenhando a 60 quadros por segundo em repouso e na pausa.

  **A ferramenta nova:** `../ferramentas/conferir-pausa.mjs`.

  **O binário:** é o 0.1.5 travado (o SHA-256 é igual ao do `node_modules`). O arquivo `VERSION` da habilidade diz 0.1.14, e a CLI se anuncia como 4.0.0: os números não batem, e o que vale é o SHA.
- **17.10.2026, o fechamento da identidade mais profunda do Atlas.** A letra a 200% se mede pelos retângulos de cada nó de texto, e não só pela largura do documento: o `overflow-x: clip` de uma seção corta o texto sem alargar a página (a rosa de /duvidas e os degraus de /planos passaram na medida da largura). As marcas novas que só a avaliação A achou estão no `11-anti-ia.md`: C14 (a luz complementar em alfa baixo), C15 (a emenda que vira névoa) e I8 (a figura cortada pela caixa).
- **17.10.2026, o segundo fechamento do Atlas (o passe 4).** O detector repetiu os vereditos (74 → 75 achados a 1.440 e 79 → 79 a 390, sem achado real); tudo o que se corrigiu veio da avaliação A, da auditoria e da conferência. Os falsos positivos novos, a conferir antes de corrigir:
  - **`low-contrast` "1,0:1 via solid-background"** em frases sobre o papel com fibra: nos pixels, 11,8 a 12,0:1;
  - **`side-tab`** no ponto central de 3 × 3 px de um anel desenhado em CSS (`::after`);
  - **`clipped-overflow-container`** na janela de uma peça animada: aparece ou não conforme o quadro em que o detector lê a página (a trena de /o-trabalho, de uma rodada para outra);
  - **o alvo pequeno da auditoria** num vínculo cujo `::after` cobre a figura inteira: mede-se o alvo pelo pseudoelemento, e não pela caixa do `<a>`.

  **A letra a 200% e o `order`:** num item com `order-first`, a ordem de pintura também muda (a ordem modificada do documento); com a letra grande, as peças se cruzam, e a de fundo cobre a da frente. As marcas novas que só a avaliação A achou estão no `11-anti-ia.md`: L10 (o vazio sem função), Q18 (o valor longe da unidade) e Q19 (o atalho flutuante sobre a mesma ação da cena).
- **18.10.2026, o fechamento do Atlas Digital** (a direção "A gravura que vira dado"). O registro completo, com o mapa de convergência inteiro, está em `registros/atlas/decisoes.md`, seção "Fechamento com o Impeccable, 18.10.2026".
  - **O processo:**
    - contra o build de produção (porta 3300), em paralelo: as avaliações A e B, isoladas; as sete conferências do kit (a régua, a pausa, o texto do robô, o SEO e o GEO, o peso, o custo e o topo); o teste do desconhecido (três leitores, nove peças recortadas sem a legenda); e a regravação da reprise da chapa da carga;
    - a síntese, com o mapa de convergência e uma medida nova, a da metade (`ferramentas/regua/medir-metade.mjs`);
    - quatro corretores, um por grupo de arquivos, no servidor de desenvolvimento (porta 3400). Nenhum rodou o build.
  - **As notas:**
    - Nielsen (avaliação A): 25/36 (69%), "Aceitável, no limite do Bom". A heurística 9 ficou sem nota, porque o site não tem campo de entrada nem estado de erro. As notas mais baixas foram a 2 (o jargão, nota 2) e a 6 (a legenda longe da marca, nota 2). A avaliação A de 17.10 deu 28/40, com as dez heurísticas.
    - A auditoria (avaliação B): 16/20, "Bom". Acessibilidade 3, desempenho 3, tema 3, responsividade 4 e integridade 3. Nenhum P0 nem P1.
  - **O detector** (a avaliação B):
    - no código, de 4 achados (17.10) para 2: os dois `gradient-text` de `app/movimento.css`, que são identidade decidida (o reflexo do Fim e a onda do "24h");
    - nas páginas, de 75 para 68 a 1.440 e de 79 para 73 a 390, contra o segundo fechamento de 17.10;
    - os reais: 8 a 1.440 (6 `image-hover-transform` e 2 `line-length`) e 6 a 390 (os `image-hover-transform`). Os `image-hover-transform` caem pela contradição registrada abaixo. Só os 2 `line-length` ficaram como defeito;
    - a variação entre rodadas: o início a 1.440 deu 15 achados numa leitura e 14 na outra;
    - depois da correção, o detector não rodou de novo nas sete páginas. Rodou sobre `app/digital.css` e `app/vidro.css` (nenhum achado) e em /orcamento, /para-quem e /duvidas, nas duas larguras, na porta 3400 (os mesmos achados da porta 3300, nenhum novo). A contagem final fica para o build seguinte.

  **A contradição com o kit, decidida:**
  - **`image-hover-transform`**, regra nova nesta rodada (6 a 1.440 e 6 a 390; `components/secoes/planos.tsx:77` e `components/secoes/escada.tsx:160`). A avaliação B a pôs em "só o Impeccable", com o `quieter`. O `../esteira/09-movimento.md`, seção 13.1, porém, dá à imagem "a aproximação lenta (de 2 a 4%, de 600 a 900 ms) dentro da moldura" (DECIDIDO em 09.10.2026). Vence o kit. O Atlas usa 1,5% e 2%, em 500 ms, um pouco abaixo da faixa; não é defeito.

  **Os falsos positivos novos (conferir antes de corrigir):**
  - **`tight-leading` em texto oculto:** 1,25× e 1,00× em `span.sr-only` de 1 × 1 px (a barra do polegar e a conta).
  - **`text-overflow` em texto oculto:** o `ol.sr-only` das etapas, de 1 px de largura (`components/secoes/passos.tsx:40`). O detector mede o `scrollWidth` do item escondido.
  - **O detector lê nós ocultos.** `ai-color-palette`, `gpt-thin-border-wide-shadow`, `dark-glow` e `radial-halo` acusam elementos de 0 × 0, `lg:hidden` e `aria-hidden`: as prévias ocultas das demos em /planos (o `#e0662b` é o do depósito) e o `.vd-segmento` escondido na mesa. Confere-se a caixa do nó antes de corrigir.
  - **`dark-glow` na sombra navy:** acusa a sombra na tinta navy da barra do cabeçalho e do aparelho, e não um brilho colorido. A C6 não se aplica.
  - **A sobreposição (`detect.js`) só roda com `bypassCSP`,** por causa da CSP `script-src 'self'` do site.

  **Os falsos positivos e as identidades que se repetem:**
  - **`low-contrast`** (22 a 1.440 e 27 a 390): 38 textos medidos nos pixels, com o pior p10 em 5,60:1;
  - **`radial-halo`:** a luz da hora das telas (a direção, 2.3);
  - **`heading-rhythm` e `body-text-viewport-edge`:** já calibrados (16.10);
  - **`side-tab`:** o filete duplo de fecho da conta;
  - **`clipped-overflow-container`:** a tela da capa, que corta a esfera de propósito;
  - **`repeating-stripes`:** as hachuras que medem (o fim de semana e os trechos dos sócios), na exceção da C9;
  - **`tight-leading` de 1,10×:** a exibição de 53 px;
  - **o alvo de 183 × 17 px** coberto pelo `::after` (calibrado em 17.10).

  **O que as ferramentas do kit não viram, ou mediram errado:**
  - **`line-length` foi real** (de 88 a 104 caracteres nas legendas). A régua não o viu, porque o `caracteresPorLinha` só mede `main p`, `li` e `dd` (`ferramentas/regua/sondas.mjs:279-283`). A sonda precisa medir `figcaption` e o `span` de legenda.
  - **A régua acusou 135 caracteres em `#legenda-da-terra`.** As linhas visíveis têm de 64 a 69. É provável que a sonda some a linha visível com a cópia escondida; é inferência das conferências, que não leram o código da sonda. Ela deve pular o `.sr-only`.
  - **A letra a 200% pelo atalho do `html`** alarga o início a 390 (para 430 px) e /para-quem (para 454 px). Pela preferência real do Chrome (CDP `setFontSizes`, 32 px), nada transborda nas sete páginas. A causa: as consultas de mídia em em e rem contam a letra inicial. A Q16 se mede pela preferência real; o atalho fica só como triagem.
  - **A `conferir-pausa` reprova o início e /duvidas com movimento reduzido.** O que muda é a troca de minuto (`aCadaMinuto`, `lib/ambiente.ts`), que o código faz de propósito desde o fechamento de 17.10. Com o botão de pausa, 0 px. A contradição entre a ferramenta e o código fica com o aprovador, Matheus Castro Oliveira de Luna Garcia.

  **O que só a auditoria e a avaliação A acharam** (o detector não vê; as marcas novas estão no `11-anti-ia.md`):
  - **o estado que some em cores forçadas (Q20):** as teclas de camada de /para-quem, o seletor da vitrine e os de /planos (a auditoria) e as teclas Esfera e Grade de /o-atlas (a avaliação A);
  - **o controle de figura sem o contrato (Q21):** o globo do início sem Home e End, e a projeção de /o-atlas, cujo toque muda a leitura na tela sem mudar o `aria-valuetext` (a auditoria);
  - **o nome acessível do e-mail partido** pelo `span` em `inline-block` (a auditoria; defeito pontual, não vira marca);
  - **os vínculos de nova aba sem aviso** (a auditoria, critério AAA);
  - **na avaliação A:** a esfera de /o-atlas cortada a 390 (a I8, de novo); a leitura de /para-quem sem o halo de carta; a tinta do cabeçalho claro fora da tabela da direção; os módulos de /orcamento escolhidos sem saber o preço, a 390; o texto ambíguo do valor cheio riscado; e o jargão de ofício (X9).

  **O que só o teste do desconhecido achou:** a composição da conta, lida como "não sei" por 3 de 3 (um caso novo da Q18), e o anel das horas da Terra, que nenhum leu. Limite do teste: os três viram as mesmas capturas, e não se sabe se foram pessoas de fora ou agentes. Se foram agentes, vale como ensaio, e o teste com pessoa real (`11-design-e-anti-ia.md`, seção 4) continua pendente.

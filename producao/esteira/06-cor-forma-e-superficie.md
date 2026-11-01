# 06 · Cor, forma e superfície

> **Para que serve.** Construir a paleta, medir o contraste, decidir os cantos, as sombras, as bordas, as texturas, os degradês e o vidro, e acertar as partes da página que o navegador desenha sozinho.
>
> **Quando ler.** Ao registrar a identidade (`04-direcao-de-arte.md`), antes de escrever os tokens, e na revisão.
>
> **Depende de.** `04-direcao-de-arte.md`, `nichos/<nicho>.md` (o clima de cor do ramo), `11-anti-ia.md` (as cores e as superfícies que denunciam um site gerado), `16-acessibilidade.md` (o contraste como obrigação legal).
>
> **Atualizado em:** 08.10.2026.

---

## 1. Tokens com nome de função

**Regra.** Toda cor do site é um **token com nome de função** (o vocabulário do shadcn). **Nenhum hexadecimal em componente.** A cor fica no valor do token, numa folha só.

**Objetivo.**
- **Trocar a identidade sem caçar cores** pelo código.
- **Mudar a superfície** (claro, escuro) mudando só o tom.
- **Deixar o contraste anotado** onde a cor é definida.

**Como fazer.**

| Token | Função |
|---|---|
| `--background` · `--foreground` | Fundo e texto da superfície |
| `--card` · `--card-foreground` | Cartão sobre o fundo |
| `--popover` · `--popover-foreground` | Painéis por cima (menu, balão) |
| `--primary` · `--primary-foreground` · `--primary-hover` | A ação (o botão principal) e o texto sobre ela |
| `--secondary` · `--secondary-foreground` | A ação secundária |
| `--muted` · `--muted-foreground` | Superfície apagada; texto secundário |
| `--accent` | Vínculo e destaque de texto |
| `--border` | Divisória (translúcida) |
| `--input` | Contorno de controle (precisa de 3:1) |
| `--ring` | O anel de foco |
| `--radius` | O raio base |

Tokens próprios da marca são permitidos com nome de função, nunca de cor: `--deep` (o fundo mais profundo), `--marca` (a cor do logotipo); nunca `--azul` nem `--laranja` (convenção de `demos/PADRAO.md`, seção 2, no repositório do Atlas).

**Tons por superfície.** Cada superfície declara um tom por atributo (`data-tom="escuro" | "claro" | "branco"`), e o tom redefine os tokens. Um bloco de outro tom dentro de uma seção recebe uma classe que redefine os tokens: `.dp-cal`, a etiqueta clara dentro do grafite no depósito de exemplo.

**O modelo** (o tom escuro do Atlas, `web/app/globals.css`, com os contrastes anotados ao lado):

```css
:root,
[data-tom="escuro"] {
  --background: #0f2a47;
  --foreground: #f3efec; /* 12,73:1 */
  --card: #132f50;
  --primary: #c08a4a; /* ação: 4,84:1 */
  --primary-hover: #d9a76b; /* navy sobre ele: 6,7:1 */
  --primary-foreground: #08203b;
  --muted-foreground: #9fb2c6; /* 6,70:1 */
  --accent: #d9a76b; /* vínculo: 6,72:1 */
  --border: rgb(243 239 236 / 0.13); /* divisória */
  --input: rgb(243 239 236 / 0.45); /* contorno de controle: 3,6:1 */
  --ring: #d9a76b;
  --radius: 1.125rem;
}
```

Nos sites de marca, o `[data-demo="<site>"]` (ou a raiz do site do cliente) redefine os mesmos tokens com a paleta da marca (`web/app/demos/deposito/deposito.css`, no repositório do Atlas).

**Como conferir.**
- **Busca no código:** `grep -rnE "#[0-9a-fA-F]{3,8}\b" components/` não acha cor em componente. Exceções conhecidas: o `themeColor` do `viewport`, que o Next exige em hexadecimal, e as folhas de identidade.
- **Na folha:** todo token de texto tem o contraste anotado ao lado.

**Tokens que parecem um só e são dois** (lições dos demos estáticos de setembro; ESTEIRA v2.1, Anexo A, no repositório do Atlas):
- **O acento do texto sobre fundo claro e o acento do toque** são tokens distintos: um escurece para dar contraste; o outro clareia na resposta ao toque. Fundidos, um dos dois papéis perde.
- **A largura da peça-assinatura no celular** tem token próprio: ela não se deduz da largura na mesa.
- **O tamanho máximo do título** é da marca (ou do sistema do nicho): tipografia larga em corpo alto dá quatro linhas de título onde se esperavam duas (`05-tipografia.md`, seção 6).

---

## 2. A paleta em OKLCH

**Regra.** A paleta se constrói em **OKLCH**: matiz fixo, luminosidade em degraus, croma no limite do que a tela mostra. De quatro a seis cores nomeadas, cada uma com papel.

**Objetivo.** No OKLCH, a luminosidade é perceptual: mudar o matiz não muda a claridade aparente, o que torna os degraus previsíveis e o contraste mais fácil de garantir (Sitnik e Turner, Evil Martians, https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) [V]. É o espaço em que o próprio Tailwind 4 publica a sua paleta: o slate-900, por exemplo, é `oklch(20.8% 0.042 265.755)` (https://tailwindcss.com/docs/colors) [V].

**Como fazer.**
1. **O matiz da marca.** Escolha do clima do nicho (`nichos/<nicho>.md`) e dos adjetivos do briefing visual.
2. **Os degraus de luminosidade** para fundo, superfície, texto secundário, texto e ação.
3. **O croma de cada degrau**, até onde a tela mostra (cuidado com o recorte de gama: cor fora do sRGB vira outra coisa).
4. **A sintaxe de cor relativa** (`oklch(from var(--primary) calc(l - 0.1) c h)`) gera as variações de hover sem uma cor nova.
5. **As 4 a 6 cores com nome e papel** no `identidade.md`.

**Atenção à aproximação do HCT do Material:** uma diferença de tom de 50 dá ~4,5:1 e de 40 dá ~3:1, mas 50 contra o branco dá 4,48 e **reprova** (O'Leary, https://material.io/blog/science-of-color-design) [FU]. Toda cor de texto se mede (seção 4).

---

## 3. O acento

**Regra.** **Um acento**, em **até 10% da tela**, reservado à **ação e ao foco**.

**Objetivo.** O acento é o sinal de "aqui se age". Espalhado por tudo, deixa de sinalizar.

**Como fazer.**
- **O 60-30-10 é regra de decoração, não pesquisa.** Use-o só como conferência de área.
- **No site do Atlas,** a paleta v3.1 é "Atlas Navy dominante, na proporção 60/30/10" (ata v3.0, V), com o bronze no papel do acento.
- **A cor da ação, ou um tom dela, marca também o anel de foco** (`--ring`) e a seleção de texto (seção 11).

**Como conferir.** Na captura da primeira tela, a área com a cor do acento não passa de ~10%.

---

## 4. O contraste, medido

**Regra.** Contraste **medido no que o navegador desenha**, não calculado do hexadecimal: inclusive sobre degradê, imagem, vidro, vídeo e WebGL.

| O quê | Mínimo | Critério |
|---|---|---|
| Texto comum | **4,5:1** | WCAG 2.2, 1.4.3 (AA) |
| Texto grande (≥ 24 px, ou ≥ 18,66 px, isto é, 14 pt, em negrito) | **3:1** | WCAG 2.2, 1.4.3 (AA) |
| Componente de interface (contorno de campo, ícone de ação) | **3:1** | WCAG 2.2, 1.4.11 (AA) |
| Mudança de aparência do foco | **3:1**, em área de pelo menos 2 px de perímetro | WCAG 2.2, 2.4.13 (AAA; o Atlas adota) |

**Sem arredondar: 4,499 reprova** (https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) [V]. Logotipos são isentos.

**Objetivo.** Acessibilidade é obrigação legal (Lei 13.146/2015, art. 63) e é o critério em que até os premiados do Awwwards mais falham: a acessibilidade foi a nota técnica mais baixa em 18 de 24 sites do dia amostrados (`12-inspiracao-e-referencias.md`). É a vantagem mais barata do Atlas.

**Como fazer.**
1. Anote o contraste de cada token de texto contra o fundo do próprio tom (seção 1).
2. Rode a régua (`../qualidade/02-regua.md`, bloco 4). Ela fotografa cada tela com e sem texto e mede só os pixels em que o texto está desenhado.
3. Onde o texto passa sobre degradê, imagem ou textura, vale o pior trecho, não a média.

**As lições medidas.**
- **Textura atrás de texto pequeno.** No depósito de exemplo, o laranja de texto `#a8431a` dava 4,93:1 contra a cal lisa e caía a **4,41:1** sobre as linhas do papel quadriculado. Virou `#9a3c16`: 5,7:1 na cal e 5,0:1 no pior ponto do quadriculado, conferido pela régua em 07.10.2026 (`web/app/demos/deposito/deposito.css`, no repositório do Atlas).
- **As cores do Tailwind 4 vêm em `oklab()`** no `getComputedStyle`. Uma ferramenta que lê os números como RGB mede contraste errado: a régua acusava 1,21:1 no menu do Atlas, que tem mais de 5:1. A conversão certa passa pelo `canvas` (`../qualidade/02-regua.md`).
- **Os gestos com cópia decorativa por cima** (a tarja, a onda, o brilho do Spell UI) e o texto pintado por degradê se conferem à mão: a régua os lista em aviso.

**Texto secundário sobre superfície colorida.** Tinja o texto do próprio matiz do fundo, ou use o quase-branco. **Nunca cinza:** cinza sobre cor parece lavado (Impeccable, `gray-on-color`; piso de ofício) [FU].

**APCA, só como conselho.** O método candidato ao WCAG 3 é usado como segunda opinião, nunca como critério de aprovação: Lc ≥ 75 no corpo (90 é o preferido), Lc ≥ 60 no texto de conteúdo, Lc ≥ 45 nos títulos, Lc ≥ 30 em placeholder e desabilitado, Lc ≥ 15 em elemento não textual (https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell) [V].

---

## 5. Claro e escuro

**Regra.** A superfície escura é **tingida**, não `#000`. O site declara `color-scheme` e `theme-color`. Claro ou escuro se escolhem pela **cena de uso** — quem lê, onde, sob que luz —, não pela categoria do negócio.

**Objetivo.**
- **O cinza escuro deixa as sombras visíveis,** e com elas a profundidade, que o preto apaga; e suaviza o contraste do texto claro, o que cansa menos (Material 2, tema escuro, base `#121212`, https://m2.material.io/design/color/dark-theme) [V].
- **Escolher pela cena** (o piso de ofício do Impeccable) [FU]. Dois exemplos:
  - **Barbearia:** noite, luz quente e baixa → escuro;
  - **Nutrição:** consultório claro, papel impresso → claro.
- **O quase-preto tingido usado por omissão (#0B0B0B, #111) é marca de IA:** aparece qualquer que seja o assunto (skill `frontend-design` da Anthropic).

**Como fazer.**
- **`theme-color`:** no `viewport` do Next (`export const viewport = { themeColor: "#0f2a47" }`).
- **`color-scheme`:** `light` ou `dark` no `html`, conforme o tom dominante, para que os controles nativos (barra de rolagem, campo de data) sigam a superfície.

---

## 6. A forma: os cantos

**Regra.** **Cantos arredondados** por preferência do usuário (03.10.2026: "priorizar arredondamentos na interface") — RATIFICADO:
- pílula nos botões;
- raio nos cartões, nas faixas e nas marcações.

O raio segue a **hierarquia**, não um valor só para tudo.

**Objetivo.**
- **A preferência do usuário** dá a cara da casa.
- **Raio por hierarquia** porque o mesmo raio em todo elemento é o "kit de cartões de SaaS", marca de IA (skill `frontend-design`).

**Como fazer.**

| Token (Atlas) | Valor | Uso |
|---|---|---|
| `--radius-sm` | 0,5 × base | Marcações, etiquetas pequenas |
| `--radius-md` | 0,75 × base | Campos |
| `--radius-lg` | base (1,125 rem no Atlas) | Cartões |
| `--radius-xl` | 1,55 × base | Painéis grandes |
| `rounded-full` | — | Botões (pílula), avatares |

- **Raio dentro de raio:** o raio de dentro é menor que o de fora, na medida do recuo entre os dois. Senão, a curva de dentro "vaza" (prática comum de desenho) [NV].
- **Borda grossa de acento num cartão arredondado** briga com o raio: marca de IA (Impeccable, `border-accent-on-rounded`) [FU].

**Exceção pela identidade.** Nos sites de marca, a forma é a da identidade. O depósito de exemplo tem cantos retos e botão chanfrado, por ser uma ficha técnica de obra — **a decidir** pelo usuário (registrado em 03.10.2026). Exceção desse tipo se escreve no `identidade.md`, com o motivo.

**Como conferir: a régua de cantos.** Em 390 e 1440 px, liste as caixas visíveis (com fundo ou borda) de raio 0, fora as faixas de largura total. Usada no Atlas em 03.10.2026: a única caixa de canto vivo era a tarja do Spell UI, que ganhou raio de 0,16 em.

---

## 7. Sombras

**Regra.** Sombra tem **deslocamento e desfoque**, vem de **uma luz só** e é **tingida do matiz do fundo**. **Sombra nova, só curta.** As sombras longas da identidade do Atlas (escada, planos, passos, montador, simulador) são exceção decidida (03.10.2026: "coloque de volta").

**Objetivo.** A sombra diz onde a peça está em relação ao fundo; sombra genérica e pesada envelhece a página (Josh Comeau, https://www.joshwcomeau.com/css/designing-shadows) [V].

**Como fazer.**
- **Camadas:** uma sombra curta e firme mais uma longa e suave, na cor do fundo escurecida, nunca preto puro:
  ```css
  box-shadow: 0 1px 2px rgb(15 42 71 / 0.08), 0 12px 32px -14px rgb(15 42 71 / 0.25);
  ```
- **Sem halo colorido de deslocamento zero** (o brilho colorido em volta, num fundo escuro): marca de IA (Impeccable, `dark-glow`) [FU]. A linha de base do Atlas registra o brilho bronze das ações (`11-anti-ia.md`).
- **Sem filete fino e sombra larga em todo cartão de uma fileira:** marca de IA (Impeccable, `gpt-thin-border-wide-shadow`) [FU]. Um painel flutuante pode; a fileira inteira, não.
- **Sombra dura sem desfoque** (`4px 4px 0`) só num mundo realmente neobrutalista, escolhido no briefing (piso de ofício do Impeccable) [FU].
- **Recorte chanfrado corta a sombra:** no depósito, as sombras da etiqueta e do cupom ficam invisíveis por causa do recorte (registrado em 03.10.2026). Peça recortada não depende de sombra.

---

## 8. Bordas

**Regra.** Bordas **translúcidas**, na cor do texto com pouca opacidade. A divisória (`--border`) é sutil; o contorno de controle (`--input`) tem pelo menos 3:1.

**Objetivo.** A borda translúcida se ajusta ao tom de baixo e não cria uma cor nova a manter.

**Como fazer.**
- **Escuro:** `--border: rgb(243 239 236 / 0.13)`.
- **Claro:** `--border: rgb(98 72 45 / 0.15)`, no tom quente da marca.

**Marcas de IA a evitar:**
- **Borda colorida grossa num lado** de cartão, item de lista, aviso ou chamada: a marca mais reconhecível de interface gerada (Impeccable, `side-tab`; piso de ofício) [FU];
- **cartão dentro de cartão:** sempre errado (Impeccable, `nested-cards`) [FU].

---

## 9. Texturas e degradês

**Regra.** Degradê e textura só por **função** ou por **identidade decidida**:
- **funcionais:** a máscara que garante o contraste do texto sobre a imagem, o brilho do vidro, o padrão próprio de um nicho;
- **de identidade:** os efeitos do Atlas devolvidos em 03.10.2026 — o orbe de bronze sob o cursor, a cena, o grão e o reflexo da chamada final, o halo da esfera, o titânio do celular, o brilho e a faixa de luz das ações.

Fora disso, **nenhum degradê decorativo novo**.
**Máscara e degradê funcionais não deixam aresta.** Um anteparo retangular atrás do texto da capa do Atlas recortava o globo e o halo em linha reta (01.10.2026). A correção: máscara radial nos traços, num invólucro proporcional ao bloco de texto, e o degradê contido, transparente nas quatro bordas; o contraste também subiu (título ≥ 10,9:1, lide ≥ 6,45:1, vínculo ≥ 5,96:1, contra 9,3, 6,44 e 5,8 com o anteparo retangular; só a máscara, sem o degradê contido, deixava o halo quente atrás do lide e dava 5,1:1, que passa no AA e fica abaixo do que havia). O contraste se mede no pior quadro de 10 instantes da rotação da esfera, em 390, 768, 1024 e 1440 px, com o texto oculto e o fundo real. **Cuidado do Chromium:** o raio de um gradiente radial não aceita `calc()` que mistura porcentagem e pixel; use porcentagem pura num invólucro proporcional (especificação do site do Atlas, seções 3 e 7). **Como conferir:** capturas em 390, 768, 1024 e 1440 px, procurando aresta reta no halo; o contraste medido sobre o fundo real (régua, bloco 4).

**A regra 3 das Diretrizes de Design Premium e como ela se aplica.** O texto do usuário (`CLAUDE.md` do repositório do Atlas): "**Contraste Moderno:** Utilize fundos limpos (slate-900 para dark mode, slate-50 para light mode) com bordas sutis (border-slate-200/10). Evite gradientes "bregas" ou sombras pesadas dos anos 2010." A aplicação, decidida pelo usuário em 03.10.2026 (RATIFICADO):
- **O slate não entra.** No site do Atlas ficam o navy e o creme do manual v3.1; nos sites de cliente e de exemplo, a paleta, os degradês, as texturas e as sombras são os da identidade da marca (seções 2 e 7).
- **Valem em todo site:** fundo liso; borda translúcida (seção 8); nenhum degradê decorativo fora da identidade decidida (esta seção); sombra nova, só curta (seção 7).
- **Objetivo:** a regra combate o enfeite genérico, não a cor da marca. Trocar a paleta da marca pelo slate apagaria a identidade que a esteira exige (`04-direcao-de-arte.md`).

**Objetivo.** Degradê e textura sem papel são o enfeite mais comum de página gerada.

**Os clichês, com a fonte:**

| Clichê | Fonte |
|---|---|
| Texto em degradê | Impeccable, `gradient-text`; piso de ofício [FU] |
| Degradê roxo-violeta; ciano sobre escuro | Impeccable, `ai-color-palette` [FU]; o próprio criador do Tailwind se desculpou, em 07.08.2025, pelo `bg-indigo-500` em todo botão do Tailwind UI, o que fez toda interface gerada por IA também sair em índigo ("I'd like to formally apologize for making every button in Tailwind UI bg-indigo-500 five years ago, leading to every AI generated UI on earth also being indigo"; Adam Wathan, https://x.com/adamwathan/status/1953510802159219096) [FU] |
| Halo radial colorido atrás do conteúdo, num fundo escuro | Impeccable, `radial-halo` [FU] |
| "Holofote" radial na cor do acento atrás da capa | Impeccable, `radial-spotlight-glow` [FU] |
| Listras em degradê repetido como superfície | Impeccable, `repeating-stripes-gradient` [FU] |
| Grade de linhas finas como fundo decorativo | Impeccable, `codex-grid-background` [FU] |
| Recorte orgânico em `clip-path` com muitos vértices | Impeccable, `organic-clip-path` [FU] |
| Imagem enterrada sob véu quase opaco | Impeccable, `buried-raster` [FU] |

**Linha de base, 07.10.2026** (marcas a decidir, `11-anti-ia.md`):
- **Atlas:** o orbe sob o cursor e o halo da esfera são halos radiais. São identidade decidida em 03.10.2026, mas o detector os acusa.
- **Depósito:** a faixa zebrada é listra repetida; o papel milimetrado é grade de linhas.

Ficam até a decisão dos sócios; em site novo, não se repetem sem motivo escrito.

**O grão.** Grão de ruído por imagem `data:` em SVG é barato e passa na política de conteúdo (`img-src 'self' data:`). Use-o só onde é identidade (a chamada final do Atlas), nunca em tudo.

---

## 10. Vidro

**Regra.** Vidro (desfoque do que passa por trás) só em **superfícies pequenas** — os controles, o cabeçalho, o menu — e com **reserva opaca**.

**Objetivo.** O desfoque custa placa de vídeo, e vidro e desfoque decorativos estão na lista do que recusar do piso de ofício do Impeccable e entre as marcas contadas por Krebs ("glassmorphism") (`11-anti-ia.md`, C10) [V]. No Atlas, o vidro é material da marca, decidido em 01.10.2026.

**Como fazer** (o vidro do Atlas, `web/app/vidro.css`, no repositório do Atlas):

```css
.vd-vidro {
  background: var(--vidro); /* tinta translúcida do tom */
  -webkit-backdrop-filter: blur(20px) saturate(170%);
  backdrop-filter: blur(20px) saturate(170%);
  border: 1px solid var(--vidro-borda);
  box-shadow: inset 0 1px 0 var(--vidro-brilho), 0 12px 32px -14px var(--sombra);
}
/* Sem suporte, ou com menos transparência pedida: superfície opaca do mesmo tom. */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .vd-vidro { background: var(--card); }
}
@media (prefers-reduced-transparency: reduce) {
  .vd-vidro { -webkit-backdrop-filter: none !important; backdrop-filter: none !important; background: var(--card); }
}
```

- **A refração do vidro líquido** (`backdrop-filter: url()`) só funciona no Chromium. Nos outros, fica o vidro fosco, e a refração só liga com ponteiro fino.
- **Contraste sobre vidro se mede em muitas posições.** O menu do Atlas foi medido em 87 posições da página, todas acima de 5,1:1 (01.10.2026). Toda mudança no vidro remede.
- **Cabeçalho que muda de tom com o que passa por trás.** O do Atlas lê o fundo em 13 pontos a cada ~80 ms durante a rolagem, e a auditoria de 07.10.2026 recomendou trocar por um `IntersectionObserver` sobre os `data-tom` (`15-desempenho.md`).
- **Nunca** um `view-transition-name` fixo num ancestral do vidro: ele vira raiz de fundo e apaga o desfoque (lição do Atlas).

---

## 11. As superfícies do navegador

**Regra.** As partes que o navegador desenha sozinho recebem a paleta: seleção de texto, cursor de texto, barra de rolagem, anel de foco, sublinhado, toque.

**Objetivo.** "Os padrões do navegador fazem a página parecer montada" (piso de ofício do Impeccable) [FU]: acertá-los custa minutos e mostra que a página foi construída. No site do Atlas, em 08.10.2026, faltavam o cursor de texto, a barra de rolagem e o `color-scheme` (`11-anti-ia.md`, seção 7).

| Superfície | Como | Conferir |
|---|---|---|
| Seleção de texto | `::selection { background: var(--primary); color: var(--primary-foreground); }` | Contraste ≥ 4,5:1 |
| Cursor de texto | `caret-color: var(--primary)` nos campos | Visível sobre o fundo |
| Barra de rolagem | `scrollbar-color: <polegar> <trilho>`; `scrollbar-gutter: stable` onde a barra aparece e some (Chrome 121/94, Firefox 64/97, Safari 26.2/18.2 [V]) | Sem pulo de leiaute ao abrir um painel |
| Anel de foco | `:focus-visible { outline: 2px solid var(--ring); outline-offset: 3px; }` | Mudança ≥ 3:1, em todo controle (régua, bloco 4) |
| Sublinhado | `text-underline-offset: 0.28em` e espessura própria | Não corta os descendentes (g, p, ç) |
| Toque no Android | `-webkit-tap-highlight-color: transparent` **e** uma resposta própria de toque (`:active` em cor) | Toda peça tocável responde ao toque |
| Cores forçadas (Windows) | `@media (forced-colors: active)`, revisando o que some (ícones em `currentColor`, bordas) | Nada essencial desaparece |
| Menos transparência | `@media (prefers-reduced-transparency: reduce)` → vidro opaco | Seção 10 |

**Estados e esperas de um controle** (padrão de design de 08.10.2026):
- **Como se especifica uma microinteração:** gatilho → regras → resposta → repetições e modos (Saffer, 2013) [FU]; a NN/g a descreve como pares de gatilho e resposta (https://www.nngroup.com/articles/microinteractions/) [V].
- **Estados:** hover só com ponteiro fino; foco com 2 px ou mais e mudança de 3:1 ou mais (o alvo AAA do WCAG 2.4.13) [V]; e também ativo, desabilitado, erro e vazio, cada um visível.
- **Carregando:** mantém o rótulo, aparece depois de 150 a 300 ms e fica pelo menos 300 a 500 ms, para não piscar (https://vercel.com/design/guidelines) [FU].
- **Esperas:** nada abaixo de 1 s; esqueleto de 2 a 10 s; barra de progresso acima disso (https://www.nngroup.com/articles/skeleton-screens/) [V].
- **No Atlas,** a espera visível de um painel sob demanda (o menu do celular, o simulador) fica no gatilho (`aria-busy` com as barras de espera, `09-movimento.md`, seção 6.2), e não num esqueleto do painel, que piscaria ao ser trocado pelo diálogo real.

---

## 12. Lista de conferência

1. Nenhuma cor em componente; todo token com nome de função; cada tom redefine os tokens.
2. Paleta de 4 a 6 cores nomeadas, em OKLCH, registrada no `identidade.md`.
3. Um acento, em até 10% da tela, para ação e foco.
4. Contraste medido pela régua em todas as páginas e larguras; os gestos com cópia decorativa conferidos à mão.
5. Texto secundário sobre cor tingido do matiz, nunca cinza.
6. Escuro tingido; `color-scheme` e `theme-color` declarados; claro ou escuro escolhido pela cena de uso.
7. Raio por hierarquia; pílula nos botões; nenhuma caixa visível de raio 0 sem motivo de identidade escrito.
8. Sombras com deslocamento, desfoque e tinta do fundo; nenhum halo colorido; sombra nova só curta.
9. Bordas translúcidas; nenhuma borda grossa de acento num lado; nenhum cartão dentro de cartão.
10. Nenhum degradê ou textura decorativa nova fora da identidade decidida; nenhum dos clichês da seção 9.
11. Vidro só em superfície pequena, com reserva opaca e contraste remedido.
12. Seleção, cursor, barra de rolagem, foco, sublinhado e toque na paleta.

---

## Fontes citadas

- WCAG 2.2: contraste mínimo, contraste não textual e aparência do foco — https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html · https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html
- APCA: https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell
- OKLCH (Evil Martians): https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
- Tailwind, cores: https://tailwindcss.com/docs/colors
- Material, a ciência da cor: https://material.io/blog/science-of-color-design · tema escuro: https://m2.material.io/design/color/dark-theme
- Josh Comeau, sombras: https://www.joshwcomeau.com/css/designing-shadows
- Impeccable (marcas e piso de ofício): https://github.com/pbakaus/impeccable
- Adam Wathan sobre o `bg-indigo-500`: https://x.com/adamwathan/status/1953510802159219096
- MDN e browser-compat-data (`scrollbar-color`, `scrollbar-gutter`, `backdrop-filter`)

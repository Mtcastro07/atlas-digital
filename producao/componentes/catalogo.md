# Catálogo de componentes de terceiros

> **O que é.** As peças de outras bibliotecas que um site do Atlas pode usar, escolhidas na pesquisa de 12 e 13.10.2026 pelo valor para o acabamento premium e pela licença, conferida para o site **vendido ao cliente, que fica com o repositório**. As regras de uso, de licença, de origem e de encaixe estão no `README.md` desta pasta. **Leia-o antes da primeira peça.**
>
> **Em números:** 452 entradas, em 17 funções; 61 em destaque.
>
> **Os vereditos:**
> - LIBERADO: 398;
> - LIBERADO com exclusões: 24;
> - LIBERADO só com a licença declarada: 5;
> - CONDICIONAL, só no repositório do cliente: 25.
>
> **313 entradas puxam dependência nova,** que pede autorização. O resto usa só a pilha aprovada, CSS ou nada. O que ficou de fora do catálogo, mesmo liberado, está no inventário (`inventario/`), com a licença de cada item.
>
> **Atualizado em:** 13.10.2026. A licença de cada entrada é a de 12 e 13.10.2026: ela se relê no repositório no dia em que a peça entra (`README.md`, seção 3.2).

## Como ler uma entrada

- **O plano:** o menor em que a peça cabe pela regra do kit (`../esteira/09-movimento.md`, seção 4).
  - **[todos]:** os três planos.
  - **[P][C]:** a partir do Profissional.
  - **[C]:** só o Completo.

  Dentro das peças, a marca [P] ou [C] diz a peça de plano maior que o da biblioteca.
- **O veredito:** o que a licença permite (`README.md`, seção 3.1).
  - **LIBERADO** pode ir ao kit, adaptado e verificado.
  - **LIBERADO (com exclusões)** pede para deixar de fora as peças nomeadas nos cuidados.
  - **LIBERADO (decl.)** tem a licença só declarada no npm ou no README: serve ao site e fica fora do kit.
  - **CONDICIONAL** entra só no repositório do cliente, nunca no kit.
- **Trazer:** o comando ou o caminho.
  - Para os registros do shadcn, o comando vem com `--dry-run`: depois de ver o que viria, roda-se sem ele.
  - **Dependência nova** é pacote fora da pilha: pede autorização (`../esteira/13-tecnologia-e-estrutura.md`, seções 9 e 10).
- **O aviso:** a linha de copyright que vai, com o texto da licença, no `LICENCA-<origem>.txt` ao lado do código (`README.md`, seção 3.2).
- **O inventário:** o arquivo da pesquisa em que a entrada está, com a licença citada e o endereço do arquivo de licença.

## Índice

| # | Função | Entradas | Em destaque |
|---|---|---|---|
| 1 | Matéria, luz e superfície | 61 | Libraries.dev (Jakub Antalík), liquid-glass (Shu Ding), metal-fx, Leonardo (Adobe), Ambient CSS, Metal UI, MetalliCSS, Scraps UI, Grão em SVG (feTurbulence) |
| 2 | Objetos com gesto | 13 | Tactile UI (versão gratuita), Xevrion UI Lab, Split-flap (Cody Shanley), uselayouts, Paperlab, Dental Scope |
| 3 | Texto e tipografia | 22 | Trickle UI kit, Tegaki, Calligraph, Pretext |
| 4 | Números | 10 | @kitlangton/rolling-number |
| 5 | Ações, vínculos, itens e ponteiro | 20 | Fluid Functionalism, interior |
| 6 | Peças e cartões | 8 | Opensource UI, react-parallax-tilt |
| 7 | Imagem e galeria | 50 | photoswipe, Yet Another React Lightbox, React Photo Album, react-compare-slider, StPageFlip (page-flip), Cambio |
| 8 | Carrosséis e trilhos | 21 | CrafterUI |
| 9 | Navegação, abas, menu e transição de página | 15 | Transition Kit (shadcn-labs), View Transitions demos (Bramus), View Transitions |
| 10 | Gaveta, diálogo, aviso, formulário e espera | 29 | tw-shimmer, Base UI 1.9 |
| 11 | Fundo vivo e campo de cor | 18 | shaderscn, hazeglow, shaders, @mesh-gradient/core, Paper Shaders |
| 12 | 3D, cena e vídeo interativo | 51 | model-viewer, ThreeUI Community (Meng To), @photo-sphere-viewer/core, 3dsvg, AVAL |
| 13 | Ícones e ilustração | 22 | morphicons, dotLottie (runtime), Hairline |
| 14 | Blocos e seções | 22 | Tailark, Shadcn Space |
| 15 | Coleções amplas | 50 | Parable, BeUI, Motion Primitives, uselayouts, Dice UI, Cult UI |
| 16 | Motores e utilitários de movimento | 22 | anime.js, Motion |
| 17 | Fontes de efeitos para estudar e refazer | 18 | Codrops: demos MIT, Codrops: demos de autores convidados (2019–2026) |

---

## 1. Matéria, luz e superfície

A camada de matéria, luz e profundidade do piso do acabamento, em todo plano (`../esteira/00-principios.md`, seção 9; `../esteira/09-movimento.md`, seção 12). O metal, o vidro, o papel e o grão saem daqui como técnica; a matéria é a da marca.

### Ambient CSS ★

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (nenhuma (@ambientcss/css; @ambientcss/components em React))

- **Peças:**
  - `knob`: botão giratório sob uma luz única
  - `fader`: controle deslizante com sombra e realce físicos
  - `switch`: alternador com relevo
  - `press`: botão que afunda sob a luz
  - `rack`: painel de aparelho
- **Por quê:** Luz física só com CSS: uma fonte de luz governa sombra, realce e degradê de cada superfície, sem WebGL.
- **Cuidados:** A estética de aparelho pede o nicho certo; o botão que afunda é resposta ao toque, nunca hover que anda.
- **Trazer:** `npm install @ambientcss/css`
- **Origem:** [repositório](https://github.com/kikkupico/ambientcss) · [site](https://ambientcss.vercel.app) · último commit em 13.09.2026 · aviso: «© 2026 Ramakrishnan Veeraragavan» · inventário: `inventario/conferencia-e-lacunas.md`

### Grão em SVG (feTurbulence) ★

[todos] · — · LIBERADO · técnica nativa · dependência nova: não

- **Peças:**
  - `feTurbulence`: ruído em SVG sobre o campo de cor, com filter: contrast() e mix-blend-mode
- **Por quê:** A camada de matéria mais barata, que ainda tira o banding dos degradês longos.
- **Cuidados:** Opacidade de 3 a 8%, só nos campos de cor da marca; mix-blend-mode difere entre WebKit e Blink: testar no Safari. O fffuel (nnnoise, gggrain) gera o SVG para uso comercial, sem redistribuir as imagens.
- **Trazer:** sem instalação: CSS ou API do navegador
- **Origem:** [site](https://css-tricks.com/grainy-gradients/) · inventário: estudo de 12.10.2026

### Leonardo (Adobe) ★

[todos] · Apache-2.0 · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `Leonardo`: paleta gerada por contraste-alvo
- **Por quê:** Ferramenta: gera as rampas da marca a partir do contraste que cada uso exige.
- **Cuidados:** Usar a ferramenta e copiar só os tokens; conferir com APCA.
- **Trazer:** estudar e refazer: https://leonardocolor.io
- **Origem:** [repositório](https://github.com/adobe/leonardo) · [site](https://leonardocolor.io) · último commit em 08.07.2026 · inventário: `inventario/blocos-e-primitivos.md`

### liquid-glass (Shu Ding) ★

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (nenhuma (SVG + CSS))

- **Peças:**
  - `liquid-glass`: vidro líquido com refração por feDisplacementMap
- **Por quê:** Refração de vidro de verdade sem WebGL nem pacote, para a barra e as etiquetas.
- **Cuidados:** O Safari diverge na refração por feDisplacementMap: testar e dar reserva.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/shuding/liquid-glass) · último commit em 25.03.2026 · aviso: «Copyright (c) 2025 Shu Ding» · inventário: `inventario/colecoes-e-demos.md`

### Metal UI ★

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (Base UI)

- **Peças:**
  - `DotDisplay`: mostrador de pontos
  - `botões, chips e diálogos`: «soft hardware»
  - `calendário`: com a mesma matéria
- **Por quê:** Hardware macio com movimento reduzido exemplar (MR 111).
- **Cuidados:** Jovem; BrushCursor fica de fora (cursor de truque); fontes OFL no THIRD_PARTY_NOTICES.
- **Trazer:** `npm install @unlocalhosted/metalui`
- **Origem:** [repositório](https://github.com/vijayksingh/metalui) · [site](https://metalui.dev) · último commit em 12.10.2026 · aviso: «© 2026 Vijay Singh» · inventário: `inventario/conferencia-e-lacunas.md`

### MetalliCSS ★

[todos] · MIT · LIBERADO · CSS · dependência nova: não

- **Peças:**
  - `metallicss`: acabamento metálico adaptativo: prata, ouro, bronze
- **Por quê:** Titânio e bronze em CSS, sem shader, em todo plano.
- **Cuidados:** MR 2.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/mikaei/metallicss) · [site](https://www.metallicss.com) · último commit em 24.07.2026 · aviso: «© 2024 Mikael Åsbjørnsson-Stensland» · inventário: `inventario/conferencia-e-lacunas.md`

### Scraps UI ★

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (peer React)

- **Peças:**
  - botão, cartão, abas, menu e diálogo de papel rasgado
- **Por quê:** Matéria de papel recortado.
- **Cuidados:** MR 3.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/og2701/scraps) · [site](https://scraps.ogme01.com) · último commit em 20.08.2026 · aviso: «© 2026 ogme01» · inventário: `inventario/conferencia-e-lacunas.md`

### Libraries.dev (Jakub Antalík) ★

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (three, @react-three/fiber, @paper-design/shaders)

- **Peças:**
  - `metal-fx`: MetalBadge, MetalText e MetalFx: metal líquido para selo e texto
  - `img-fx`: efeitos de imagem
  - `liquid-gooey`: forma líquida
- **Por quê:** Metal líquido de verdade para o selo e o texto da marca, a matéria mais nobre do catálogo.
- **Cuidados:** O metal-fx embute o shader liquidMetal do Paper Shaders (Apache-2.0): manter o NOTICE. WebGL só no Completo, com reserva estática; o border-beam do pacote é catálogo. A nota não dá a versão npm: fixá-la ao instalar.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/Jakubantalik/Libraries.dev) · [site](https://libraries.dev) · último commit em 09.10.2026 · aviso: «Copyright (c) 2026 Jakub Antalik» · inventário: `inventario/registros-shadcn.md`

### metal-fx ★

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (metal-fx)

- **Peças:**
  - `metal-fx`: metal líquido em anéis, botões, texto e selos (WebGL)
- **Por quê:** A matéria do latão e do metal da barbearia, pronta em React.
- **Cuidados:** Trata movimento reduzido; o botão não cresce no hover, a resposta é luz.
- **Trazer:** `npm install metal-fx@2.0.11`
- **Origem:** [repositório](https://github.com/Jakubantalik/metal-fx) · último commit em 22.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### @cornerkit/core

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@cornerkit/core)

- **Peças:**
  - `cornerkit`: cantos contínuos estilo iOS
- **Por quê:** Squircle com movimento reduzido tratado.
- **Cuidados:** Pacote grande (369 KB desc.); medir.
- **Trazer:** `npm install @cornerkit/core@1.3.1`
- **Origem:** [repositório](https://github.com/bejarcode/cornerkit) · último commit em 19.07.2026 · inventário: `inventario/pacotes-de-efeito.md`

### @liquidglassjs/core

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@liquidglassjs/core)

- **Peças:**
  - `liquid-glass-js`: vidro SVG sobre o DOM com reserva em WebGL
- **Por quê:** Vidro com movimento reduzido e reserva.
- **Cuidados:** Pacote grande; WebGL só no Completo.
- **Trazer:** `npm install @liquidglassjs/core@0.6.0`
- **Origem:** [repositório](https://github.com/Amir-Abushanab/liquid-glass-js) · último commit em 28.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### @lisse/react

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@lisse/react)

- **Peças:**
  - `lisse`: cantos contínuos em React
- **Por quê:** Outra ponte de canto contínuo, ativa.
- **Cuidados:** 'use client' embutido; medir.
- **Trazer:** `npm install @lisse/react@0.7.2`
- **Origem:** [repositório](https://github.com/JaceThings/Lisse) · último commit em 21.08.2026 · inventário: `inventario/pacotes-de-efeito.md`

### @squircle-js/react

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@squircle-js/react)

- **Peças:**
  - `squircle-js`: squircle em React
- **Por quê:** Cantos contínuos ativos em React.
- **Cuidados:** Usar corner-shape: squircle em @supports onde houver.
- **Trazer:** `npm install @squircle-js/react@1.3.0`
- **Origem:** [repositório](https://github.com/bring-shrubbery/squircle-js) · último commit em 03.02.2026 · inventário: `inventario/pacotes-de-efeito.md`

### @squircle/tailwindcss

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@squircle/tailwindcss)

- **Peças:**
  - `squircle/tailwindcss`: squircle como plugin do Tailwind
- **Por quê:** Canto contínuo direto nas classes.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npm install @squircle/tailwindcss@1.0.6`
- **Origem:** [site](https://www.npmjs.com/package/@squircle/tailwindcss) · último commit em 02.05.2025 · inventário: `inventario/pacotes-de-efeito.md`

### as-dithered-image

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `as-dithered-image`: elemento HTML que pontilha a imagem (meio-tom) nítido em qualquer tela
- **Por quê:** Matéria de impressão em meio-tom, estática, em todo plano.
- **Cuidados:** Sem commit desde 02/2024: elemento simples e sem dependência, conferir no navegador atual.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/andrewstephens75/as-dithered-image) · último commit em 24.02.2024 · aviso: «© 2022 andrewstephens75» · inventário: `inventario/conferencia-e-lacunas.md`

### Baby UI

[todos] · Apache-2.0 · LIBERADO · registro shadcn · dependência nova: não

- **Peças:**
  - `iridescent-fold`: dobra iridescente
  - `liquid-chrome`: cromo líquido
  - `grain-gradient`: degradê granulado
  - `mask-text`: texto com máscara
  - `mirror-text`: texto espelhado
  - `morphing-modal`: modal que se transforma
  - `image-trail`: rastro de imagens [C]
- **Por quê:** Cromo, iridescência e grão sem dependência.
- **Cuidados:** magnet-lines e text-repel vetados; dot-matrix-glow, glitch-text e particle-text são catálogo; rolagem só no Completo.
- **Trazer:** `npx shadcn@4.21.0 add https://baby-ui.nexonauts.com/r/liquid-chrome.json --dry-run`
- **Origem:** [repositório](https://github.com/kanakkholwal/baby-ui) · [site](https://baby-ui.nexonauts.com) · último commit em 13.10.2026 · inventário: `inventario/registros-shadcn.md`

### bucharitesh

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, @paper-design/shaders, Radix)

- **Peças:**
  - `metallic-button`: botão metálico
  - `text-highlight`: destaque de texto
  - `split-text-effect`: texto dividido
- **Por quê:** Botão de metal para a ação principal.
- **Cuidados:** Movimento reduzido em 1 de 18; parado há cerca de 7 meses.
- **Trazer:** `npx shadcn@4.21.0 add https://bucharitesh.in/r/metallic-button.json --dry-run`
- **Origem:** [repositório](https://github.com/bucharitesh/bucharitesh.in) · [site](https://bucharitesh.in) · último commit em 24.02.2026 · aviso: «Copyright (c) 2025 Ritesh Bucha» · inventário: `inventario/registros-shadcn.md`

### Chamaac UI

[todos] · MIT · LIBERADO (com exclusões) · registro shadcn · dependência nova: **sim** (motion, three, @react-three/fiber)

- **Peças:**
  - `liquid-chrome`: cromo líquido [C]
  - `premium-button`: botão premium
  - `text-loop`: texto em laço
- **Por quê:** Cromo líquido para a superfície da marca.
- **Cuidados:** Excluídos: bokeh-grid (paleta do XorDev) e water-caustic, grid-bloom, deform-tunnel e liquid-morph (Shadertoy sem crédito). Só 1 de 151 arquivos trata movimento reduzido.
- **Trazer:** `npx shadcn@4.21.0 add @chamaac/liquid-chrome --dry-run`
- **Origem:** [repositório](https://github.com/amarnathdhumal/chamaacui) · [site](https://chamaac.com) · último commit em 30.06.2026 · aviso: «Copyright (c) 2026 Amarnath» · inventário: `inventario/registros-shadcn.md`

### css-doodle

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (css-doodle)

- **Peças:**
  - `css-doodle`: padrões gerativos em CSS (grades, mosaicos)
  - `css-doodle`: padrões e texturas gerativas em CSS (web component)
- **Por quê:** Matéria gerativa da marca, como o azulejo e o mosaico, desenhada em CSS.
- **Cuidados:** Deixar a animação pausável; o pacote referencia Google Fonts e CDN, que não podem ser pedidos externos.
- **Trazer:** `npm install css-doodle@0.57.1`
- **Origem:** [repositório](https://github.com/css-doodle/css-doodle) · [site](https://css-doodle.com) · último commit em 10.10.2026 · aviso: «Copyright (c) 2017-present Yuan Chuan» · inventário: `inventario/colecoes-e-demos.md`; `inventario/pacotes-de-efeito.md`

### cuicui

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (motion, Radix)

- **Peças:**
  - `animated-noise`: ruído animado
  - `card-mouse-highlighting`: luz do ponteiro no cartão
  - `bottom-blur-out`: desfoque inferior
  - `animated-counter`: contador [C]
- **Por quê:** Grão e luz no cartão priorizando CSS sobre script.
- **Cuidados:** Movimento reduzido em só 1 de 43 arquivos; border-trail é beam.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/damien-schneider/cuicui) · [site](https://cuicui.day) · último commit em 11.10.2026 · aviso: «Copyright (c) 2024 Damien Schneider» · inventário: `inventario/registros-shadcn.md`

### Cult UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, three, @react-three/fiber, @paper-design/shaders, Radix, Base UI, cobe)

- **Peças:**
  - `texture-card`: cartão com textura
  - `texture-button`: botão com textura
  - `texture-overlay`: camada de textura
  - `metal-button`: botão de metal
  - `direction-aware-tabs`: abas que seguem a direção
  - `rolling-number`: número que rola
  - `shader-lens-blur`: lente com desfoque [C]
  - `three-d-carousel`: carrossel 3D [P]
- **Por quê:** Texturas e metal prontos para a superfície da marca.
- **Cuidados:** WebGL (Paper Shaders e three) só no Completo.
- **Trazer:** `npx shadcn@4.21.0 add @cult-ui/texture-card --dry-run`
- **Origem:** [repositório](https://github.com/nolly-studio/cult-ui) · [site](https://www.cult-ui.com) · último commit em 12.10.2026 · aviso: «Copyright (c) 2023 Jordan-Gilliam» · inventário: `inventario/registros-shadcn.md`

### d2

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, GSAP, three, @react-three/fiber, Radix, cobe)

- **Peças:**
  - `button-matt`: botão fosco
  - `metallic-shimmer`: brilho metálico
- **Por quê:** Superfície fosca e metálica para a ação.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npx shadcn@4.21.0 add @d2/button-matt --dry-run`
- **Origem:** [repositório](https://github.com/rajaaltus/d2studio-ui) · [site](https://ui.d2studio.dev) · último commit em 17.09.2026 · aviso: «Copyright (c) 2026 D2 Studio» · inventário: `inventario/registros-shadcn.md`

### dither-plugin

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (dither-plugin)

- **Peças:**
  - `dither-plugin`: pontilhado em Tailwind
- **Por quê:** Textura de papel e impressão sem imagem.
- **Cuidados:** Não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install dither-plugin@1.1.1`
- **Origem:** [repositório](https://github.com/flornkm/dither-plugin) · último commit em 20.09.2025 · inventário: `inventario/pacotes-de-efeito.md`

### easing gradients

[todos] · MIT · LIBERADO · CSS · dependência nova: não

- **Peças:**
  - `easing gradients`: degradês com curva, sem banding
- **Por quê:** Véus sobre foto sem faixas, que garantem contraste com luz natural.
- **Cuidados:** O plugin PostCSS está parado desde 2018: usar o CSS gerado, sem instalar o plugin.
- **Trazer:** `gerar o degradê em https://larsenwork.com/easing-gradients e colar o CSS`
- **Origem:** [repositório](https://github.com/larsenwork/postcss-easing-gradients) · [site](https://larsenwork.com/easing-gradients) · último commit em 03.09.2018 · inventário: `inventario/colecoes-e-demos.md`

### einui

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, Radix)

- **Peças:**
  - `glass-card`: cartão de vidro
  - `glass-button`: botão de vidro
  - `glass-dialog`: diálogo de vidro
  - `glass-input`: campo de vidro
  - `glass-slider`: controle deslizante de vidro
- **Por quê:** Vidro em todos os controles.
- **Cuidados:** Conferir contraste do texto sobre vidro.
- **Trazer:** `npx shadcn@4.21.0 add @einui/glass-card --dry-run`
- **Origem:** [repositório](https://github.com/ehsanghaffar/einui) · [site](https://ui.eindev.ir) · último commit em 11.10.2026 · aviso: «Copyright (c) 2025 Ehsan Ghaffar» · inventário: `inventario/registros-shadcn.md`

### Ephemera

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (Radix)

- **Peças:**
  - `button`: botão com matéria de papel
  - `card`: cartão de papel
  - `tabs`: abas de papel
  - `toast`: aviso de papel
- **Por quê:** Sistema de papelaria: a matéria do papel na interface inteira.
- **Cuidados:** Traz fontes no registro: conferir a licença de cada uma.
- **Trazer:** `npx shadcn@4.21.0 add https://ephemera.kerrshift.com/r/card.json --dry-run`
- **Origem:** [repositório](https://github.com/kerrshift/ephemera) · [site](https://ephemera.kerrshift.com) · último commit em 13.10.2026 · aviso: «Copyright (c) 2026 KerrShift» · inventário: `inventario/registros-shadcn.md`

### figma-squircle

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (figma-squircle)

- **Peças:**
  - `figma-squircle`: caminho de canto contínuo com o cálculo do Figma
- **Por quê:** O canto contínuo da Apple, ponte até o corner-shape nativo.
- **Cuidados:** Só a forma, sem borda nem sombra; parado desde 2024, estável.
- **Trazer:** `npm install figma-squircle@1.1.0`
- **Origem:** [repositório](https://github.com/phamfoo/figma-squircle) · último commit em 19.09.2024 · inventário: `inventario/pacotes-de-efeito.md`

### Glass Refraction

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (peer React)

- **Peças:**
  - `Glass`: vidro líquido com refração SVG
  - `GlassCard`: cartão de vidro
  - `GlassPill`: pílula de vidro
  - `GlassFilters`: filtros de refração e dispersão cromática
- **Por quê:** Vidro com realce especular e dispersão na borda, sem WebGL.
- **Cuidados:** A refração só funciona no Chromium; os outros caem no fosco. MR 0.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/z1code/glass-refraction) · último commit em 10.02.2026 · aviso: «© 2025 Moeez Shabbir» · inventário: `inventario/conferencia-e-lacunas.md`

### glasscn (kostyniuk)

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, @paper-design/shaders, Base UI)

- **Peças:**
  - `glass-button`: botão de vidro
  - `glass-select`: seleção de vidro
  - `glass-dropdown-menu`: menu de vidro
  - `glass-checkbox`: caixa de vidro
  - `highlight-text`: texto destacado
- **Por quê:** Controles de formulário em vidro.
- **Cuidados:** WebGL só no Completo.
- **Trazer:** `npx shadcn@4.21.0 add @glasscn/glass-select --dry-run`
- **Origem:** [repositório](https://github.com/kostyniuk/glasscn-components) · [site](https://glasscn-components.vercel.app) · último commit em 18.09.2026 · aviso: «Copyright (c) 2026 Alex Kostyniuk» · inventário: `inventario/registros-shadcn.md`

### glasscn (Tim Mikeladze)

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (Radix)

- **Peças:**
  - `glass`: superfície de vidro
  - `glass-group`: grupo de vidro
  - `navigation-bar`: barra de navegação de vidro
  - `dock`: doca
  - `scroll-edge`: borda de rolagem
  - `toaster`: avisos
- **Por quê:** Vidro com movimento reduzido em 53 arquivos.
- **Cuidados:** 70 fontes no registro sem licença lida.
- **Trazer:** `npx shadcn@4.21.0 add https://glasscn.app/r/glass.json --dry-run`
- **Origem:** [repositório](https://github.com/TimMikeladze/glasscn) · [site](https://glasscn.app) · último commit em 12.10.2026 · aviso: «Copyright (c) 2026 Tim Mikeladze» · inventário: `inventario/registros-shadcn.md`

### GlassKit

[todos] · MIT · LIBERADO · CSS · dependência nova: não (nenhuma (CSS puro))

- **Peças:**
  - `GlassKit`: de 24 a 34 componentes de vidro no estilo iOS 26 e visionOS
- **Por quê:** Vidro em CSS puro para barra, etiqueta e painel, sem script.
- **Cuidados:** Conferir o contraste do texto sobre o vidro e dar ao backdrop-filter uma reserva sólida.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/JUNGHERZ/GlassKit) · [site](https://jungherz-de.github.io/glasskit) · último commit em 08.10.2026 · aviso: «Copyright (c) 2026 Jungherz GmbH» · inventário: `inventario/colecoes-e-demos.md`

### hyalite

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (nenhuma (SVG + backdrop-filter))

- **Peças:**
  - `hyalite`: vidro com mapa de lente por SDF
- **Por quê:** Alternativa de vidro líquido em SVG e CSS, com lente calculada por SDF.
- **Cuidados:** Recente (232 estrelas): testar no Safari e dar reserva ao backdrop-filter.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/VII-Cae/hyalite--liquid-glass) · último commit em 11.09.2026 · inventário: `inventario/colecoes-e-demos.md`

### liqui

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (Base UI, @liqui-design/glass)

- **Peças:**
  - `glass dial`: dial de vidro
  - diálogo e gaveta de vidro
  - botões de vidro
- **Por quê:** Vidro líquido distribuído pela CLI do shadcn, sobre Base UI.
- **Cuidados:** Refração plena só no Chromium; MR 3.
- **Trazer:** ``
- **Origem:** [repositório](https://github.com/leefanv/liqui-design) · [site](https://liqui.design) · último commit em 03.10.2026 · aviso: «© 2026 Fan Li» · inventário: `inventario/conferencia-e-lacunas.md`

### liquid-glass-react

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (liquid-glass-react)

- **Peças:**
  - `liquid-glass-react`: vidro líquido estilo Apple em React
- **Por quê:** Vidro líquido pronto em React.
- **Cuidados:** O Atlas já tem receita própria; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install liquid-glass-react@1.1.1`
- **Origem:** [site](https://www.npmjs.com/package/liquid-glass-react) · último commit em 11.06.2025 · inventário: `inventario/pacotes-de-efeito.md`

### liquid-glass-web-react

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (liquid-glass-web-react)

- **Peças:**
  - `liquid-glass-web-react`: refração estilo Apple nos três navegadores
- **Por quê:** Vidro líquido leve (5 KB gz) que roda em todos.
- **Cuidados:** Não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install liquid-glass-web-react@0.1.1`
- **Origem:** [repositório](https://github.com/PallavAg/liquid-glass-web-react) · último commit em 10.06.2026 · inventário: `inventario/pacotes-de-efeito.md`

### OKLCH Picker (Evil Martians)

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `oklch-picker`: seletor de cor em OKLCH
- **Por quê:** Ferramenta: escolhe a cor da marca em OKLCH, a escala das rampas do kit.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** estudar e refazer: https://oklch.com
- **Origem:** [repositório](https://github.com/evilmartians/oklch-picker) · [site](https://oklch.com) · último commit em 05.10.2026 · inventário: `inventario/blocos-e-primitivos.md`

### Opaline

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, Radix)

- **Peças:**
  - `liquid-glass`: vidro líquido
  - `glass-dock`: doca de vidro
  - `glass-text`: texto de vidro
  - `glass-segmented`: seletor segmentado de vidro
- **Por quê:** Vidro com refração real.
- **Cuidados:** O texto sobre o vidro precisa de reserva sólida para contraste.
- **Trazer:** `npx shadcn@4.21.0 add @opaline/liquid-glass --dry-run`
- **Origem:** [repositório](https://github.com/deepraj21/opaline) · [site](https://opaline.buildlab.in) · último commit em 04.10.2026 · aviso: «Copyright (c) 2026 Deepraj Bera» · inventário: `inventario/registros-shadcn.md`

### Open Glass UI

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (nenhuma em execução)

- **Peças:**
  - `open-glass-ui`: 40 componentes acessíveis de vidro
  - `recipes`: matérias em CSS
  - `renderers`: vidro em WebGL [C]
- **Por quê:** Vidro líquido acessível, com caminho de WebGL só no Completo.
- **Cuidados:** Jovem (12★); «physics-inspired».
- **Trazer:** `npm install @open-glass-ui/react`
- **Origem:** [repositório](https://github.com/moekoelueker/open-glass-ui) · [site](https://moelueker.com/liquid-glass) · último commit em 29.09.2026 · aviso: «© 2026 Moe Luker» · inventário: `inventario/conferencia-e-lacunas.md`

### Papercraft UI

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (cva, clsx, tailwind-merge)

- **Peças:**
  - clipe
  - post-it
  - fita washi
  - orelha de página
  - sombra de carimbo
  - pautado e grão
- **Por quê:** Papelaria tátil para identidade artesanal.
- **Cuidados:** O button.tsx anda no hover: trocar por cor. MR 0.
- **Trazer:** `npm install papercraft-ui`
- **Origem:** [repositório](https://github.com/sagar-droid/papercraft-ui) · [site](https://www.npmjs.com/package/papercraft-ui) · último commit em 02.10.2026 · aviso: «© 2026 sagar» · inventário: `inventario/conferencia-e-lacunas.md`

### plasma-ui

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (nenhuma (React))

- **Peças:**
  - `plasma-ui`: componentes de vidro líquido em React
- **Por quê:** Vidro líquido em componentes React prontos para adaptar.
- **Cuidados:** Movimento reduzido em só 6 de 27 arquivos: completar.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/CruxGarden/plasma-ui) · último commit em 07.10.2026 · aviso: «Copyright (c) 2026 Crux Garden» · inventário: `inventario/colecoes-e-demos.md`

### Quidlass

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (nenhuma (React))

- **Peças:**
  - `Quidlass`: componentes de vidro em React
- **Por quê:** Componentes de vidro em React sem dependência extra.
- **Cuidados:** Sem tratamento de movimento reduzido (0 arquivos): acrescentá-lo.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/programmerlapar/quidlass) · último commit em 12.10.2026 · aviso: «Copyright (c) 2024 Quidlass» · inventário: `inventario/colecoes-e-demos.md`

### Radix Colors

[todos] · MIT · LIBERADO · pacote npm · dependência nova: não

- **Peças:**
  - `escalas de 12 degraus`: rampas com contraste garantido por papel
- **Por quê:** Ferramenta: modelo de rampa em 12 degraus, de fundo a texto, para os tokens.
- **Cuidados:** Copiar só os valores para os tokens; instalar o pacote é dependência nova.
- **Trazer:** `npm install @radix-ui/colors`
- **Origem:** [repositório](https://github.com/radix-ui/colors) · [site](https://radix-ui.com/colors) · último commit em 17.12.2025 · aviso: «Copyright (c) 2021-2022 Modulz; (c) 2022-Present WorkOS» · inventário: `inventario/blocos-e-primitivos.md`

### react-liquid-glass-svg

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-liquid-glass-svg)

- **Peças:**
  - `react-liquid-glass-svg`: vidro só com filtros SVG e desfoque
- **Por quê:** Vidro em 1,5 KB, sem WebGL.
- **Cuidados:** Desfoque grande é caro; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install react-liquid-glass-svg@1.0.5`
- **Origem:** [repositório](https://github.com/yurkagon/react-liquid-glass-svg) · último commit em 19.06.2026 · inventário: `inventario/pacotes-de-efeito.md`

### shadcn-theme-editor (Sebas-DV)

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `shadcn-theme-editor`: edita tokens OKLCH ao vivo e grava no globals.css
- **Por quê:** Ferramenta de desenvolvimento: afina os tokens dentro do próprio site.
- **Cuidados:** Não vai ao site do cliente.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/Sebas-DV/shadcn-theme-editor) · último commit em 08.09.2026 · inventário: `inventario/blocos-e-primitivos.md`

### smooth-corners

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (nenhuma (Houdini Paint API))

- **Peças:**
  - `smooth-corners`: cantos contínuos em superelipse (squircle)
- **Por quê:** Cantos contínuos de superelipse, o acabamento de objeto industrial.
- **Cuidados:** Só no Chromium: manter o border-radius como reserva.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/wopian/smooth-corners) · último commit em 30.09.2026 · inventário: `inventario/colecoes-e-demos.md`

### Starseam

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (Radix)

- **Peças:**
  - `plate`: placa sobre laca com rebites
  - `plate-button`: botão de placa
  - `plate-dialog`: diálogo de placa
  - `plate-tabs`: abas de placa
- **Por quê:** Placas de laca e rebites: matéria de oficina e de marca.
- **Cuidados:** Movimento reduzido citado em um arquivo só.
- **Trazer:** `npx shadcn@4.21.0 add @starseam/plate --dry-run`
- **Origem:** [repositório](https://github.com/astroicers/starseam) · [site](https://starseam.astroicers.link) · último commit em 19.08.2026 · aviso: «Copyright (c) 2026 Chen Chi-Hsiu (astroicers)» · inventário: `inventario/registros-shadcn.md`

### svg-shaders

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `svgshader`: ruído, grão, iluminação com filtros SVG
- **Por quê:** Grão e luz sem WebGL.
- **Cuidados:** Sem commit desde 11/2024; medir em área grande.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/shuding/svg-shaders) · [site](https://svg-shaders.vercel.app) · último commit em 04.11.2024 · aviso: «© 2024 Shu Ding» · inventário: `inventario/conferencia-e-lacunas.md`

### tailwind-rounded-out

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (Tailwind 4)

- **Peças:**
  - `rounded-out`: canto para fora, como aba de pasta
- **Por quê:** Detalhe de forma nos cantos arredondados.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npm install tailwind-rounded-out`
- **Origem:** [repositório](https://github.com/simeydotme/tailwind-rounded-out) · [site](https://simeydotme.github.io/tailwind-rounded-out/) · último commit em 26.08.2025 · aviso: «© 2025 Simon Goellner» · inventário: `inventario/conferencia-e-lacunas.md`

### tw-glass

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (tw-glass)

- **Peças:**
  - `tw-glass`: vidro com refração por mapa SVG, em Tailwind 4
- **Por quê:** Vidro que casa com a pilha, sem script.
- **Cuidados:** Versão 0.0.5; o Atlas tem receita própria; filtro SVG pesa no celular.
- **Trazer:** `npm install tw-glass@0.0.5`
- **Origem:** [repositório](https://github.com/assistant-ui/assistant-ui) · último commit em 24.04.2026 · inventário: `inventario/pacotes-de-efeito.md`

### tweakcn

[todos] · Apache-2.0 · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `tweakcn`: editor visual de tokens em OKLCH
- **Por quê:** Ferramenta: ajusta os tokens do shadcn à marca, vendo o resultado.
- **Cuidados:** O kit veda shadcn apply e init --preset: copiar só os tokens.
- **Trazer:** estudar e refazer: https://tweakcn.com
- **Origem:** [repositório](https://github.com/jnsahaj/tweakcn) · [site](https://tweakcn.com) · último commit em 03.09.2026 · inventário: `inventario/blocos-e-primitivos.md`

### washiveil

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (Radix)

- **Peças:**
  - `glass-card`: cartão de papel washi
  - `glass-nav`: navegação translúcida
  - `glass-toc`: sumário translúcido
  - `glass-dialog`: diálogo translúcido
- **Por quê:** Papel washi e véus translúcidos: matéria própria.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npx shadcn@4.21.0 add @washiveil/glass-card --dry-run`
- **Origem:** [repositório](https://github.com/tochny/washiveil) · [site](https://washiveil.alexchih.com) · último commit em 13.08.2026 · aviso: «Copyright (c) 2026 Alex Chih» · inventário: `inventario/registros-shadcn.md`

### Zepa

[todos] · MIT + Commons Clause · **CONDICIONAL**, só no repositório do cliente · cópia do repositório · dependência nova: **sim** (motion, GSAP, three, @react-three/fiber, Radix, Lenis)

- **Peças:**
  - `paper-card`: cartão de papel
  - `paper-sheets`: folhas de papel
  - `zepa-folder`: pasta
  - `text-rotate`: palavra que gira
- **Por quê:** Papel e pasta como matéria.
- **Cuidados:** Lenis em 11 arquivos (vetado); beam-zepa e text-scramble fora; só no repositório do cliente.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/zepa-ui/zepa.design) · [site](https://zepa.design) · último commit em 12.10.2026 · aviso: «Copyright (c) 2026 Shaik Sameer (Zepa UI)» · inventário: `inventario/registros-shadcn.md`

### @samasante/liquid-glass

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@samasante/liquid-glass)

- **Peças:**
  - `liquid-glass`: lente de vidro que refrata o DOM vivo (WebGL)
- **Por quê:** Refração real sobre a página.
- **Cuidados:** WebGL só no Completo; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install @samasante/liquid-glass@0.1.1`
- **Origem:** [repositório](https://github.com/samasante/liquid-glass) · último commit em 23.06.2026 · inventário: `inventario/pacotes-de-efeito.md`

### glsl-film-grain

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (glsl-film-grain)

- **Peças:**
  - `glsl-film-grain`: grão de filme em GLSL
- **Por quê:** O grão dentro do shader, com licença clara.
- **Cuidados:** Trecho estável de 2016; fora do shader, o grão em SVG (feTurbulence) é a primeira escolha.
- **Trazer:** `npm install glsl-film-grain@1.0.4`
- **Origem:** [repositório](https://github.com/mattdesl/glsl-film-grain) · último commit em 11.03.2016 · inventário: `inventario/pacotes-de-efeito.md`

### lamina

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (three, @react-three/fiber)

- **Peças:**
  - `lamina`: material em camadas: degradê, ruído, Fresnel e matcap
- **Por quê:** Matéria do objeto 3D sem escrever shader.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npm install lamina`
- **Origem:** [repositório](https://github.com/pmndrs/lamina) · [site](https://www.npmjs.com/package/lamina) · último commit em 22.06.2025 · aviso: «© 2022 Poimandres» · inventário: `inventario/conferencia-e-lacunas.md`

### Liquefy UI

[C] · MIT · LIBERADO · registro shadcn · dependência nova: não

- **Peças:**
  - `liquid-button`: botão líquido
  - `liquid-accordion`: acordeão líquido
  - `glass-card`: cartão de vidro
  - `glass-dock`: doca de vidro
- **Por quê:** Vidro com refração real nas bordas.
- **Cuidados:** Refração em WebGL: só no Completo, com reserva.
- **Trazer:** `npx shadcn@4.21.0 add @liquefy-ui/glass-card --dry-run`
- **Origem:** [repositório](https://github.com/liquefy-ui/liquefy-ui) · [site](https://liquefy-ui.com) · último commit em 06.10.2026 · aviso: «Copyright (c) 2026 liquefy-ui contributors» · inventário: `inventario/registros-shadcn.md`

### Liquid Glass Studio

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: não (nenhuma (WebGL2/WebGPU))

- **Peças:**
  - `liquid-glass-studio`: recriação do vidro da Apple em WebGL2/WebGPU [C]
- **Por quê:** Vidro com refração física em shader, para a peça de vitrine do Completo.
- **Cuidados:** As fotos de demonstração (Unsplash, Pexels) saem; os SDF e o smin vêm do Inigo Quilez, em MIT, com o aviso mantido.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/iyinchao/liquid-glass-studio) · último commit em 10.09.2026 · aviso: «Copyright (c) 2024 Charles Yin» · inventário: `inventario/colecoes-e-demos.md`

### liquidGL

[C] · MIT · LIBERADO (com exclusões) · cópia do repositório · dependência nova: não (nenhuma (WebGL/WebGPU))

- **Peças:**
  - `liquidGL`: vidro com refração real sobre elementos da página [C]
- **Por quê:** Refração real de vidro aplicada a elementos, para o momento de exibição do Completo.
- **Cuidados:** O MIT vale só para scripts/ e package/: o conteúdo de assets/ (áudio, fontes) não se copia.
- **Trazer:** copiar scripts/ e package/ de https://github.com/naughtyduk/liquidGL
- **Origem:** [repositório](https://github.com/naughtyduk/liquidGL) · [site](https://liquidgl.naughtyduk.com) · último commit em 01.10.2026 · inventário: `inventario/colecoes-e-demos.md`

### Materiais R3F de ektogamat

[C] · MIT; CC0-1.0 (R3F-Ultimate-Lens-Flare) · LIBERADO · cópia do repositório · dependência nova: **sim** (three, @react-three/fiber)

- **Peças:**
  - `threejs-holographic-material`: material holográfico [C]
  - `fake-glow-material-r3f`: brilho falso em R3F [C]
  - `R3F-Ultimate-Lens-Flare`: reflexo de lente [C]
- **Por quê:** Materiais de luz para joia e objeto da vitrine no Completo.
- **Cuidados:** threejs-graces (CC BY-NC-ND 4.0) e webgi-jewelry (motor WebGi comercial) ficam fora; na conta há repositórios NOASSERTION e sem licença, então conferir o LICENSE de cada um.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/ektogamat) · inventário: `inventario/colecoes-e-demos.md`

### TSL Textures

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (three (WebGPU))

- **Peças:**
  - mármore
  - madeira
  - couro
  - metal
- **Por quê:** Matéria procedural do objeto 3D.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/boytchev/tsl-textures) · [site](https://boytchev.github.io/tsl-textures/) · último commit em 09.09.2026 · aviso: «© 2024 Pavel Boytchev» · inventário: `inventario/conferencia-e-lacunas.md`

### webgl-apple-liquid-glass

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim**

- **Peças:**
  - `liquid glass WebGL2`: refração de Snell, dispersão, Fresnel
- **Por quê:** Vidro líquido fiel.
- **Cuidados:** Repinta a página: medir; ícones Lucide ISC.
- **Trazer:** `npm install apple-liquid-glass-webgl`
- **Origem:** [repositório](https://github.com/Oliverrr2424/webgl-apple-liquid-glass) · [site](https://www.npmjs.com/package/apple-liquid-glass-webgl) · último commit em 29.09.2026 · aviso: «© 2026 Oliver Nemo» · inventário: `inventario/conferencia-e-lacunas.md`

---

## 2. Objetos com gesto

Peças que são uma coisa do mundo e respondem à mão: a tradução mais direta do mundo da marca (`../esteira/19-o-padrao-atlas.md`, seção 3). Escolhe-se a que existe no ofício do cliente (o placar do restaurante, a ficha da oficina), nunca pela graça da peça.

### Tactile UI (versão gratuita) ★

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não

- **Peças:**
  - `client-plates`: placas de cliente gravadas em metal
  - `faq-drawer`: perguntas frequentes em fichário
  - `odometer`: odômetro de tambor que carrega os dígitos
  - `compass`: bússola com amortecimento
  - `pull-cord`: lâmpada de cordão
  - `machined-footer`: rodapé usinado
- **Por quê:** Objetos com matéria física de verdade (alumínio escovado, anodizado, rebites) que traduzem o mundo da marca em peça que responde à mão.
- **Cuidados:** Só seis peças gratuitas; o resto exige o Founder Pass, pago. Conferir movimento reduzido peça a peça.
- **Trazer:** `npx shadcn@4.21.0 add https://tactileui.dev/r/free/odometer.json --dry-run`
- **Origem:** [repositório](https://github.com/cipriantitire/tactile-ui-free) · [site](https://tactileui.dev) · último commit em 12.10.2026 · aviso: «Copyright (c) 2026 Ciprian Titire» · inventário: `inventario/registros-shadcn.md`

### uselayouts ★

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, Radix, Base UI, Lenis, number-flow)

- **Peças:**
  - `3d-book`: livro em 3D [P]
  - `card-folder`: pasta de cartões
  - `polaroid-stack`: pilha de polaroides
  - `paper-shred-button`: botão que tritura papel
  - `curve-drawer`: gaveta curva
  - `expandable-gallery`: galeria expansível [P]
  - `wheel-carousel`: carrossel em roda [P]
  - `rolling-card-stack`: pilha que rola
- **Por quê:** Objetos de papel e livro com gesto, bons para portfólio e cardápio.
- **Cuidados:** Lenis em dois arquivos (vetado); scroll-stack-deck e perspective-text-scroll só no Completo; holographic-referral-card é catálogo.
- **Trazer:** `npx shadcn@4.21.0 add @uselayouts/3d-book --dry-run`
- **Origem:** [repositório](https://github.com/iurvish/uselayouts) · [site](https://uselayouts.com) · último commit em 02.10.2026 · aviso: «Copyright (c) 2025 Urvish Mali» · inventário: `inventario/registros-shadcn.md`

### Xevrion UI Lab ★

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion)

- **Peças:**
  - `odometer`: odômetro
  - `folded-map`: mapa dobrado
  - `sundial-picker`: seletor de relógio de sol
  - `rotary-dial`: disco de telefone
  - `ink-well`: tinteiro
  - `zipper-reveal`: revelação por zíper
  - `footer-signature`: assinatura no rodapé
  - `image-hotspots`: pontos clicáveis na imagem
- **Por quê:** Objetos do mundo com gesto, só sobre o Motion, com movimento reduzido citado em 217 arquivos.
- **Cuidados:** magnetic-button e magnet-lines vetados; confetti-button e particle-text são catálogo. Quatro arquivos ligados à rolagem: só no Completo.
- **Trazer:** `npx shadcn@4.21.0 add @xevrion/folded-map --dry-run`
- **Origem:** [repositório](https://github.com/xevrion/ui-lab) · [site](https://lab.xevrion.dev) · último commit em 01.10.2026 · aviso: «Copyright (c) 2026 Yash Bavadiya» · inventário: `inventario/registros-shadcn.md`

### Split-flap (Cody Shanley) ★

[P][C] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `split-flap display`: placar Solari em CSS 3D
- **Por quê:** Placar Solari em CSS 3D, sem canvas nem dependência: hotel, restaurante, agenda.
- **Cuidados:** Pouca atividade desde 22/04/2026; conferir movimento reduzido.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/codemanshan/splitflap) · [site](https://codyshanley.com/playground/split-flap) · último commit em 22.04.2026 · aviso: «Copyright (c) 2026 Cody Shanley» · inventário: `inventario/registros-shadcn.md`

### Dental Scope ★

[C] · MIT · LIBERADO (com exclusões) · cópia do repositório · dependência nova: **sim** (three)

- **Peças:**
  - `dental-scope`: arcada 3D com seleção dente a dente
- **Por quê:** O mapa dos dentes da odontologia.
- **Cuidados:** Só o código: modelos CC BY-SA excluídos; usar modelos próprios.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/Yoosseph/dental-scope) · [site](https://dental-scope.com/) · último commit em 10.10.2026 · aviso: «© 2026 Yoseph and Dental Scope contributors» · inventário: `inventario/conferencia-e-lacunas.md`

### Paperlab ★

[C] · Apache-2.0 · LIBERADO · cópia do repositório · dependência nova: **sim** (@react-three/fiber, drei, three-custom-shader-material, zod, GSAP)

- **Peças:**
  - `paperlab`: papel 3D que descasca, desenrola, dobra e pendura
- **Por quê:** Papel físico com gesto.
- **Cuidados:** Manter o NOTICE no código; MR 20.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/NourMtir0722/Paperlab) · [site](https://paperlab.nawwara.studio/) · último commit em 22.09.2026 · aviso: «Paperlab Copyright 2026 Noor Mtir» · inventário: `inventario/conferencia-e-lacunas.md`

### 8starlabs-ui

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (Base UI)

- **Peças:**
  - `flip-clock`: relógio de placas [P]
  - `timeline`: linha do tempo
- **Por quê:** Relógio de placas para horário de funcionamento.
- **Cuidados:** marquee e heatmap fora.
- **Trazer:** `npx shadcn@4.21.0 add @8starlabs-ui/flip-clock --dry-run`
- **Origem:** [repositório](https://github.com/8starlabs/ui) · [site](https://ui.8starlabs.com) · último commit em 05.09.2026 · aviso: «Copyright (c) 2025 Tham Kei Lok.» · inventário: `inventario/registros-shadcn.md`

### analog-ui

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (Base UI, motion, lucide-react, tailwind-merge)

- **Peças:**
  - `Dial`: botão de estúdio iluminado [P]
  - `NeedleGauge`: mostrador de ponteiro [P]
  - `LCDDisplay`: visor de cristal líquido
  - `RotarySwitch`: chave rotativa
  - `PushButton`: botão de pressão com luz
  - `WheelNumber`: número em roda [P]
- **Por quê:** Controles de estúdio com iluminação própria, para o simulador ou o montador de orçamento.
- **Cuidados:** Biblioteca jovem (11★); MR só em 1 arquivo: conferir movimento reduzido peça a peça.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/techsquidtv/analog-ui) · [site](https://analogui.com/) · último commit em 17.05.2026 · aviso: «© 2026 TechSquidTV» · inventário: `inventario/conferencia-e-lacunas.md`

### boxbox

[todos] · MIT + Commons Clause · **CONDICIONAL**, só no repositório do cliente · registro shadcn · dependência nova: **sim** (motion, three, @react-three/fiber, Radix)

- **Peças:**
  - `start-lights`: semáforo de largada
  - `lap-counter`: contador de voltas
  - `rolling-number`: número que rola
  - `track-map`: mapa de pista
  - `driver-name-plate`: placa de piloto
- **Por quê:** Estética de corrida, útil à oficina.
- **Cuidados:** Só no repositório do cliente; nicho estreito; WebGL só no Completo.
- **Trazer:** `npx shadcn@4.21.0 add https://react-boxbox.vercel.app/r/start-lights.json --dry-run`
- **Origem:** [repositório](https://github.com/toyamarodrigo/react-boxbox) · [site](https://react-boxbox.vercel.app) · último commit em 03.10.2026 · aviso: «Copyright (c) 2026 Rodrigo Toyama» · inventário: `inventario/registros-shadcn.md`

### toggles

[todos] · MIT · LIBERADO (decl.), fora do kit · registro shadcn · dependência nova: **sim** (motion, three, @react-three/fiber)

- **Peças:**
  - `lightbulb`: lâmpada
  - `light-switch`: interruptor de luz
- **Por quê:** Interruptor e lâmpada como objetos com gesto.
- **Cuidados:** Sem arquivo LICENSE: MIT só no README e no package.json. Confirmar com o autor antes do kit.
- **Trazer:** `npx shadcn@4.21.0 add @toggles/light-switch --dry-run`
- **Origem:** [repositório](https://github.com/alfiejones/theme-toggles) · [site](https://toggles.dev) · último commit em 24.09.2026 · inventário: `inventario/registros-shadcn.md`

### uicapsule

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, GSAP, three, @react-three/fiber, number-flow)

- **Peças:**
  - `paper-roll`: rolo de papel
  - `diffusion-reveal`: revelação por difusão
  - `context-menu-peek`: menu que espia
  - `vibe-dial`: disco
  - `liquid-orb`: orbe líquido [C]
- **Por quê:** Papel e disco com gesto.
- **Cuidados:** particle-orb é catálogo; WebGL só no Completo.
- **Trazer:** `npx shadcn@4.21.0 add @uicapsule/paper-roll --dry-run`
- **Origem:** [repositório](https://github.com/kyh/uicapsule) · [site](https://uicapsule.com) · último commit em 12.10.2026 · aviso: «Copyright (c) 2023 Kaiyu Hsu» · inventário: `inventario/registros-shadcn.md`

### @pqina/flip

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@pqina/flip)

- **Peças:**
  - `flip`: placas que viram, para contador e relógio (placar Solari)
- **Por quê:** O placar Solari como objeto em CSS 3D, com gesto de verdade.
- **Cuidados:** Pesado (16 KB gz); escreve leiaute; não trata movimento reduzido (desligar com motion-reduce); publicação de 11/2024, madura.
- **Trazer:** `npm install @pqina/flip@1.8.4`
- **Origem:** [repositório](https://github.com/pqina/flip) · último commit em 26.11.2024 · inventário: `inventario/pacotes-de-efeito.md`

### flipclock

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (flipclock)

- **Peças:**
  - `flipclock`: relógio de placas que viram
- **Por quê:** Relógio de placas como objeto retrô para evento ou horário.
- **Cuidados:** Estética retrô, só com propósito; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install flipclock@1.0.1`
- **Origem:** [repositório](https://github.com/objectivehtml/flipclock) · último commit em 24.08.2025 · inventário: `inventario/pacotes-de-efeito.md`

---

## 3. Texto e tipografia

A tipografia de exibição e o texto que responde. O texto partido em letras animadas é marca de IA (M5), e o gesto de texto é um só por marca, fora do título (`../esteira/09-movimento.md`, seções 6.1 e 6.4).

### Calligraph ★

[todos] · MIT · LIBERADO · pacote npm · dependência nova: não (motion)

- **Peças:**
  - `calligraph`: transição de texto e de dígitos
  - `calligraph`: troca de palavra com transição fluida de letras, sobre o Motion
- **Por quê:** Troca de palavra e de número sóbria.
- **Cuidados:** Nenhum arquivo trata movimento reduzido: envolver em MotionConfig. A nota não dá a versão npm. Sem sinal de movimento reduzido: envolver em MotionConfig; conta no limite de um gesto de texto por marca.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/raphaelsalaja/calligraph) · [site](https://calligraph.raphaelsalaja.com) · último commit em 09.07.2026 · aviso: «Copyright (c) 2026 Raphael Salaja» · inventário: `inventario/registros-shadcn.md`; `inventario/pacotes-de-efeito.md`

### Pretext ★

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim**

- **Peças:**
  - `pretext`: mede e quebra texto sem o DOM: contorno de formas, diagramação editorial
- **Por quê:** Texto que contorna o objeto do negócio.
- **Cuidados:** Exige Intl.Segmenter; sem font-feature-settings.
- **Trazer:** `npm install @chenglou/pretext`
- **Origem:** [repositório](https://github.com/chenglou/pretext) · [site](https://www.npmjs.com/package/@chenglou/pretext) · último commit em 13.10.2026 · aviso: «© 2026 Pretext contributors» · inventário: `inventario/conferencia-e-lacunas.md`

### Tegaki ★

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (three, @react-three/fiber)

- **Peças:**
  - `tegaki`: animação de escrita à mão para qualquer fonte
- **Por quê:** Escrita à mão animada que serve à assinatura da marca.
- **Cuidados:** WebGL e rolagem só no Completo. A nota não dá a versão npm: fixá-la ao instalar.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/gkurt/tegaki) · [site](https://tegaki.ink) · último commit em 11.10.2026 · aviso: «Copyright (c) 2026 Gokhan Kurt» · inventário: `inventario/registros-shadcn.md`

### Trickle UI kit ★

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `animações de texto só em CSS`: zero runtime, seguras no SSR
- **Por quê:** Texto que se anima sem script, como pede o kit para funcionar sem JavaScript.
- **Cuidados:** Demos em CC0. Evitar letra a letra como efeito principal.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/akaieuan/trickle-UI-kit) · [site](https://tricklekit.dev) · último commit em 26.07.2026 · aviso: «Copyright (c) 2026 trickle contributors» · inventário: `inventario/registros-shadcn.md`

### @scritto/core

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@scritto/core)

- **Peças:**
  - `@scritto/core`: letras que rolam, como web component
- **Por quê:** Letras que rolam como resposta da ação principal, gesto já usado pelo Atlas.
- **Cuidados:** Versão 0.1.0, nova; trata movimento reduzido; conferir escrita de leiaute (sinal left/top).
- **Trazer:** `npm install @scritto/core@0.1.0`
- **Origem:** [repositório](https://github.com/JaceThings/Scritto) · último commit em 30.08.2026 · inventário: `inventario/pacotes-de-efeito.md`

### auto-text-size

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (auto-text-size)

- **Peças:**
  - `auto-text-size`: título que preenche a largura, em React
- **Por quê:** Versão React do título de cartaz que ocupa a medida.
- **Cuidados:** Parado desde 04/2024; envolver em componente cliente; medir uma vez por redimensionamento.
- **Trazer:** `npm install auto-text-size@0.2.3`
- **Origem:** [repositório](https://github.com/sanalabs/auto-text-size) · último commit em 12.04.2024 · inventário: `inventario/pacotes-de-efeito.md`

### Capsize

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (nenhuma (@capsizecss/core, @capsizecss/metrics))

- **Peças:**
  - `capsize`: recorta a caixa do texto pela altura das maiúsculas e pela linha de base
- **Por quê:** Títulos, números e ícones alinhados ao pixel, na grade de 4 px.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npm install @capsizecss/core`
- **Origem:** [repositório](https://github.com/seek-oss/capsize) · [site](https://seek-oss.github.io/capsize/) · último commit em 15.09.2026 · aviso: «© 2021 SEEK» · inventário: `inventario/conferencia-e-lacunas.md`

### chanhdai (ncdai)

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion, Base UI)

- **Peças:**
  - `text-flip`: troca de palavra
  - `testimonial-spotlight`: depoimento em destaque
  - `spinning-circular-text`: texto circular que gira
  - `fluid-gradient-text`: texto em degradê fluido
  - `logos-flip`: logotipos que viram
  - `apple-carousel`: carrossel [P]
- **Por quê:** Troca de palavra e texto circular sobre a pilha aprovada.
- **Cuidados:** testimonials-marquee é faixa sem fim; cinco arquivos ligados à rolagem só no Completo.
- **Trazer:** `npx shadcn@4.21.0 add @ncdai/text-flip --dry-run`
- **Origem:** [repositório](https://github.com/ncdai/chanhdai.com) · [site](https://chanhdai.com/components) · último commit em 27.09.2026 · aviso: «Copyright (c) 2026 Chánh Đại» · inventário: `inventario/registros-shadcn.md`

### Fancy Components

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (motion)

- **Peças:**
  - `efeitos de texto e física`: peças não conferidas pelo estudo
- **Por quê:** Efeitos de texto e física para estudar e reescrever.
- **Cuidados:** Sete meses sem commit; peças não conferidas; 2 arquivos com movimento reduzido.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/danielpetho/fancy) · [site](https://fancycomponents.dev) · último commit em 14.03.2026 · inventário: estudo de 12.10.2026

### fitty

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (fitty)

- **Peças:**
  - `fitty`: título que se ajusta à largura da caixa, como cartaz
- **Por quê:** Diagramação de cartaz: o título de exibição preenche a medida exata.
- **Cuidados:** Ajusta font-size (leiaute) uma vez por redimensionamento, não é animação; parado desde 2023, estável; rodar em componente cliente.
- **Trazer:** `npm install fitty@2.4.2`
- **Origem:** [repositório](https://github.com/rikschennink/fitty) · último commit em 17.11.2023 · inventário: `inventario/pacotes-de-efeito.md`

### ForgeUI

[todos] · licença própria · **CONDICIONAL**, só no repositório do cliente · registro shadcn · dependência nova: **sim** (motion, Radix)

- **Peças:**
  - `text-morph`: texto que se transforma
  - `text-reveal`: revelação de texto
  - `animated-tabs`: abas animadas
- **Por quê:** Texto que se transforma para o site do cliente.
- **Cuidados:** Permite trabalho para cliente, proíbe reempacotar: nunca no kit. Zero movimento reduzido.
- **Trazer:** `npx shadcn@4.21.0 add @forgeui/text-morph --dry-run`
- **Origem:** [repositório](https://github.com/AmanShakya0018/forgeui) · [site](https://forgeui.in) · último commit em 20.07.2026 · inventário: `inventario/registros-shadcn.md`

### Justif

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `justif`: justificação ao modo do TeX, com hifenização e microtipografia
- **Por quê:** Texto corrido editorial de livro.
- **Cuidados:** Conferir a hifenização em português.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/lyallcooper/justif) · [site](https://justif.lyall.co) · último commit em 30.09.2026 · aviso: «© 2026 Lyall Cooper» · inventário: `inventario/conferencia-e-lacunas.md`

### mewo

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, GSAP, Base UI)

- **Peças:**
  - `tile-reveal`: revelação em ladrilhos
  - `split-text`: texto dividido
  - `spotlight-card`: cartão com luz
  - `scroll-portal`: portal ligado à rolagem [C]
- **Por quê:** Revelação em ladrilho, boa para azulejo.
- **Cuidados:** marquee e text-shimmer fora; rolagem só no Completo.
- **Trazer:** `npx shadcn@4.21.0 add @mewo/tile-reveal --dry-run`
- **Origem:** [repositório](https://github.com/xmustafa5/mewo-ui) · [site](https://mewo-ui.vercel.app) · último commit em 01.10.2026 · aviso: «Copyright (c) 2026 xmustafa5» · inventário: `inventario/registros-shadcn.md`

### neat-annotations

[todos] · MIT · LIBERADO · CSS · dependência nova: não

- **Peças:**
  - `círculo, sublinhado e seta`: anotações à mão sobre o texto
- **Por quê:** O vínculo que se desenha, em CSS.
- **Cuidados:** Conta no limite de um gesto de texto por marca.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/syabro/neat-annotations) · [site](https://neat-annotations.syabro.com/) · último commit em 17.09.2026 · aviso: «© 2026 Maxim Syabro» · inventário: `inventario/conferencia-e-lacunas.md`

### rough-notation

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (rough-notation)

- **Peças:**
  - `rough-notation`: anotações desenhadas à mão: sublinhado, círculo e marca-texto
  - `react-rough-notation`: envoltório React, com 'use client' embutido
- **Por quê:** Dá o traço à mão ao vínculo e ao destaque, para marcas de papel, escola ou papelaria.
- **Cuidados:** Estética rabiscada, não serve ao luxo; parado desde 2020, estável; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install rough-notation@0.5.1`
- **Origem:** [repositório](https://github.com/pshihn/rough-notation) · último commit em 30.10.2020 · inventário: `inventario/pacotes-de-efeito.md`

### ScrollX UI

[todos] · MIT + Commons Clause · **CONDICIONAL**, só no repositório do cliente · registro shadcn · dependência nova: **sim** (motion, three, @react-three/fiber, ogl, Radix, cobe)

- **Peças:**
  - `lustretext`: texto com lustro
  - `layered-text`: texto em camadas
  - `text-spotlight`: luz no texto
  - `flipstack`: pilha que vira [P]
- **Por quê:** Texto com lustro e camadas.
- **Cuidados:** Só no repositório do cliente; 6 de 156 tratam movimento reduzido; followcursor, electric-text e aurora-dots fora.
- **Trazer:** `npx shadcn@4.21.0 add @scrollxui/lustretext --dry-run`
- **Origem:** [repositório](https://github.com/Adityakishore0/ScrollX-UI) · [site](https://www.scrollxui.dev) · último commit em 09.06.2026 · aviso: «Copyright (c) 2025 Ahdeetai» · inventário: `inventario/registros-shadcn.md`

### Sora UI

[todos] · MIT + Commons Clause · **CONDICIONAL**, só no repositório do cliente · registro shadcn · dependência nova: **sim** (motion, GSAP, three, @react-three/fiber, @paper-design/shaders, Radix, Base UI, Lenis)

- **Peças:**
  - `draw-underline-link`: sublinhado que se desenha
  - `fog-text-reveal`: texto que sai da névoa
  - `text-reveal-mask`: revelação por máscara
  - `dual-wipe-reveal`: revelação dupla
  - `rolling-text`: texto que rola
  - `scroll-chapters`: capítulos ligados à rolagem [C]
- **Por quê:** O sublinhado que se desenha e texto com névoa.
- **Cuidados:** Commons Clause: só no repositório do cliente. Lenis em dois arquivos; particle-hover-button fora.
- **Trazer:** `npx shadcn@4.21.0 add @soralabs/draw-underline-link --dry-run`
- **Origem:** [repositório](https://github.com/SoraLabsOSS/ui) · [site](https://ui.soralabs.studio) · último commit em 12.10.2026 · aviso: «Copyright (c) 2026 Alexsandr Senaviev» · inventário: `inventario/registros-shadcn.md`

### Spell UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, three, @react-three/fiber, Radix, Base UI)

- **Peças:**
  - `blur-reveal`: revelação por desfoque
  - `highlighted-text`: tarja no texto
  - `shimmer-text`: brilho do texto
  - `tilt-card`: inclinação
  - `words-stagger`: palavras em cascata
  - `slide-up-text`: texto que sobe
  - `flow-button`: botão com onda de cor
- **Por quê:** Já adaptado no kit: texto e gesto como assinatura da marca.
- **Cuidados:** Já em producao/gestos/: partir de lá. text-marquee é faixa sem fim.
- **Trazer:** `npx shadcn@4.21.0 add @spell/blur-reveal --dry-run`
- **Origem:** [repositório](https://github.com/xxtomm/spell-ui) · [site](https://spell.sh) · último commit em 10.10.2026 · aviso: «Copyright (c) 2025 Spell UI» · inventário: `inventario/registros-shadcn.md`

### splitting

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (splitting)

- **Peças:**
  - `splitting`: divide em spans com variáveis CSS (--char-index) para animar só com CSS
- **Por quê:** Permite a revelação por linha ou palavra só com CSS, sem motor.
- **Cuidados:** Texto partido corrompe o nome acessível se mal feito; letra a letra como efeito principal é sinal genérico; parado desde 2024.
- **Trazer:** `npm install splitting@1.1.0`
- **Origem:** [repositório](https://github.com/shshaw/splitting) · último commit em 31.05.2024 · inventário: `inventario/pacotes-de-efeito.md`

### Traço que se desenha (stroke-dashoffset)

[todos] · — · LIBERADO · técnica nativa · dependência nova: não

- **Peças:**
  - `stroke-dasharray/stroke-dashoffset`: o mapa ou o logotipo da marca traçado
- **Por quê:** Assinatura em SVG que desenha a matéria da marca.
- **Cuidados:** Traço completo como padrão e sob movimento reduzido.
- **Trazer:** sem instalação: CSS ou API do navegador
- **Origem:** inventário: estudo de 12.10.2026

### Tufte CSS

[todos] · MIT · LIBERADO · CSS · dependência nova: não

- **Peças:**
  - notas laterais e figuras na margem
- **Por quê:** Diagramação editorial.
- **Cuidados:** Conferir a licença da ET Book.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/edwardtufte/tufte-css) · [site](https://edwardtufte.github.io/tufte-css/) · último commit em 25.06.2026 · aviso: «© 2014 Dave Liepmann» · inventário: `inventario/conferencia-e-lacunas.md`

### Título equilibrado (text-wrap: balance)

[todos] · — · LIBERADO · técnica nativa · dependência nova: não

- **Peças:**
  - `text-wrap: balance`: quebra de linha equilibrada no título
- **Por quê:** Diagramação do título sem dependência; substitui o react-wrap-balancer.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** sem instalação: CSS ou API do navegador
- **Origem:** inventário: estudo de 12.10.2026

---

## 4. Números

O número como peça: o que muda quando o visitante mexe num controle [P] e o que conta ao entrar [C] (`../esteira/09-movimento.md`, seção 13.2). Contador que escreve texto a cada quadro fica fora (seção 5, item 2).

### @kitlangton/rolling-number ★

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@kitlangton/rolling-number)

- **Peças:**
  - `rolling-number`: números que rolam, interrompíveis e com locale
  - contagem ao entrar na tela [C]
- **Por quê:** Número que muda com a mão do visitante, alternativa leve ao NumberFlow.
- **Cuidados:** Trata movimento reduzido; conferir escrita de leiaute e filtro nos sinais do código.
- **Trazer:** `npm install @kitlangton/rolling-number@0.4.1`
- **Origem:** [repositório](https://github.com/kitlangton/rolling-number) · último commit em 06.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### animated-blur-number

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `animated-blur-number`: número que anima dígito a dígito, com mola e desfoque só no dígito que muda
- **Por quê:** Número que se transforma com elegância.
- **Cuidados:** Sem movimento reduzido declarado.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/serafimcloud/animated-blur-number) · [site](https://github.com/serafimcloud/animated-blur-number) · último commit em 02.06.2026 · aviso: «Copyright (c) 2026 serafim (@serafimcloud)» · inventário: `inventario/registros-shadcn.md`

### slot-text

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (peer React)

- **Peças:**
  - `slot-text`: rótulo que rola como caça-níqueis [P quando reage a controle]
- **Por quê:** Rótulo tátil que rola.
- **Cuidados:** MR à mão.
- **Trazer:** `npm install slot-text`
- **Origem:** [repositório](https://github.com/danielwh2/slot-text) · [site](https://www.npmjs.com/package/slot-text) · último commit em 10.08.2026 · aviso: «© 2026 Daniel Belyi» · inventário: `inventario/conferencia-e-lacunas.md`

### @leenguyen/react-flip-clock-countdown

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@leenguyen/react-flip-clock-countdown)

- **Peças:**
  - `react-flip-clock-countdown`: contagem regressiva em placas 3D que viram
- **Por quê:** Placar de placas que viram para a contagem de um evento.
- **Cuidados:** Contagem regressiva de oferta é recurso de varejo, usar com parcimônia; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install @leenguyen/react-flip-clock-countdown@1.7.2`
- **Origem:** [repositório](https://github.com/sLeeNguyen/react-flip-clock-countdown) · último commit em 20.09.2025 · inventário: `inventario/pacotes-de-efeito.md`

### digitloom

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (digitloom)

- **Peças:**
  - `digitloom`: números que rolam, com canvas compartilhado
- **Por quê:** Alternativa nova de dígitos que rolam com movimento reduzido tratado.
- **Cuidados:** Pouco uso (238/semana); 'use client' embutido.
- **Trazer:** `npm install digitloom@1.0.10`
- **Origem:** [repositório](https://github.com/jeffersonlicet/digitloom) · último commit em 07.10.2026 · inventário: `inventario/pacotes-de-efeito.md`

### kinetic

[P][C] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion, Base UI)

- **Peças:**
  - `scrub-number-field`: número que muda ao arrastar
- **Por quê:** Número que responde ao controle, bom para simulador.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npx shadcn@4.21.0 add @kinetic/scrub-number-field --dry-run`
- **Origem:** [repositório](https://github.com/jay15git/kinetic) · [site](https://kinetic.itsjay.in) · último commit em 30.07.2026 · aviso: «Copyright (c) 2026 Jayant Acharya» · inventário: `inventario/registros-shadcn.md`

### NumberFlow

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@number-flow/react)

- **Peças:**
  - `@number-flow/react`: número que se transforma dígito a dígito (6,1 KB)
- **Por quê:** Preço, prazo e contador que mudam com a ação do usuário.
- **Cuidados:** Versão abaixo de 1.0: travar. Movimento reduzido não conferido; o kit já tem lib/contar.ts para os números que contam.
- **Trazer:** `npm install @number-flow/react@0.6.2`
- **Origem:** último commit em 18.07.2026 · inventário: estudo de 12.10.2026

### react-animated-counter

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-animated-counter)

- **Peças:**
  - `react-animated-counter`: contador que sobe e desce, estilo Robinhood
- **Por quê:** Estado ao vivo em número, com dígitos que trocam por transform.
- **Cuidados:** npm ISC e repositório MIT; trata movimento reduzido; envolver em componente cliente.
- **Trazer:** `npm install react-animated-counter@1.10.0`
- **Origem:** [repositório](https://github.com/TuckerMassad/react-animated-counter) · último commit em 12.10.2026 · inventário: `inventario/pacotes-de-efeito.md`

### Smart Ticker

[P][C] · MIT · LIBERADO · cópia do repositório · dependência nova: não (nenhuma (tirar @stackblitz/sdk))

- **Peças:**
  - `smart-ticker`: só os caracteres que mudam rolam
- **Por quê:** Número que muda com precisão.
- **Cuidados:** Retirar o @stackblitz/sdk; MR 1.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/tombcato/smart-ticker) · [site](https://tombcato.github.io/smart-ticker/) · último commit em 21.03.2026 · aviso: «© 2024 tombcato» · inventário: `inventario/conferencia-e-lacunas.md`

### Bounty

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim**

- **Peças:**
  - `bounty`: hodômetro em SVG com desfoque de movimento
- **Por quê:** O número que conta, com desfoque de movimento de tambor real.
- **Cuidados:** Sem commit desde 03/2023; movimento reduzido à mão.
- **Trazer:** `npm install bounty`
- **Origem:** [repositório](https://github.com/coderitual/bounty) · [site](https://coderitual.github.io/bounty/examples/) · último commit em 24.03.2023 · aviso: «© 2017 coderitual» · inventário: `inventario/conferencia-e-lacunas.md`

---

## 5. Ações, vínculos, itens e ponteiro

O vocabulário de interação (`../esteira/09-movimento.md`, seção 13): a resposta da ação, do vínculo, do item e do ponteiro, cada papel com a sua, saída da matéria da marca. O botão não anda nem cresce; a imagem e o rótulo junto do ponteiro são do Completo.

### Fluid Functionalism ★

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, Radix, Base UI)

- **Peças:**
  - `accordion`: acordeão com mola
  - `dialog`: diálogo com mola
  - `mobile-drawer`: gaveta do celular
  - `tabs-subtle`: abas com hover por proximidade
  - `switch`: interruptor com mola
  - `queued-stack`: pilha em fila
  - `carousel-dots`: pontos de carrossel
- **Por quê:** Primitivos com molas, hover por proximidade e peso de fonte que muda: a microinteração vira linguagem do site inteiro.
- **Cuidados:** Um arquivo com animação ligada à rolagem: só no Completo.
- **Trazer:** `npx shadcn@4.21.0 add @fluid/tabs-subtle --dry-run`
- **Origem:** [repositório](https://github.com/mickadesign/fluid-functionalism) · [site](https://www.fluidfunctionalism.com) · último commit em 12.10.2026 · aviso: «Copyright (c) 2026 Micka Touillaud» · inventário: `inventario/registros-shadcn.md`

### interior ★

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion)

- **Peças:**
  - `hold-to-confirm`: botão de segurar para confirmar
  - `icon-morph`: ícone que se transforma
  - `floating-label`: rótulo que flutua no campo
  - `inline-validation`: validação no próprio campo
  - `blur-up-image`: imagem que sai do desfoque
  - `copy-button`: botão de copiar [P]
  - `loading-button`: botão com espera [P]
  - `lightbox`: lightbox [P]
- **Por quê:** Microinterações de estado discretas, para que tudo o que se toca responda, com movimento reduzido em todos os arquivos.
- **Cuidados:** like-burst é catálogo e fica fora.
- **Trazer:** `npx shadcn@4.21.0 add @interior/hold-to-confirm --dry-run`
- **Origem:** [repositório](https://github.com/ddoemonn/interior) · [site](https://www.interior.dev) · último commit em 10.09.2026 · aviso: «Copyright (c) 2026 ozzy» · inventário: `inventario/colecoes-e-demos.md`

### @rescui/use-glow-hover

[todos] · Apache-2.0 · LIBERADO · pacote npm · dependência nova: **sim** (@rescui/use-glow-hover)

- **Peças:**
  - `use-glow-hover`: brilho que segue o ponteiro (JetBrains RescUI)
- **Por quê:** A luz da marca sob o cursor, o gesto que o Atlas já faz.
- **Cuidados:** Hover só com ponteiro fino; não trata movimento reduzido (desligar com motion-reduce); sem repositório público.
- **Trazer:** `npm install @rescui/use-glow-hover@0.12.0`
- **Origem:** [site](https://www.npmjs.com/package/@rescui/use-glow-hover) · último commit em 24.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### @web-kits/audio

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (nenhuma (Web Audio))

- **Peças:**
  - `audio`: síntese declarativa de sons de interface
- **Por quê:** Som de interface sintetizado.
- **Cuidados:** Só por ação, com opção de silenciar.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/raphaelsalaja/audio) · [site](https://audio.raphaelsalaja.com) · último commit em 05.09.2026 · aviso: «© 2026 Raphael Salaja» · inventário: `inventario/conferencia-e-lacunas.md`

### amicro

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, @paper-design/shaders)

- **Peças:**
  - `hover`: microtransições de hover
  - `toggles`: microtransições de interruptor
  - `text`: microtransições de texto
- **Por quê:** Microtransições para o vocabulário de interação.
- **Cuidados:** Movimento reduzido em 28 de 262 arquivos; a seção cursor substitui o ponteiro; nomes da nota são seções, conferir o item.
- **Trazer:** `npx shadcn@4.21.0 add @amicro/hover --dry-run`
- **Origem:** [repositório](https://github.com/Subhan-code/Amicro--Micro-transitions-) · [site](https://amicro.vercel.app) · último commit em 11.10.2026 · aviso: «Copyright (c) 2026 SYED  SUBHAN UDDIN» · inventário: `inventario/registros-shadcn.md`

### Atrament

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim**

- **Peças:**
  - `atrament`: desenho e escrita à mão no canvas, com traço suavizado e modos de pincel
- **Por quê:** Assinatura ou rabisco do visitante com traço bom, em canvas 2D.
- **Cuidados:** Uso pontual; o package.json remete ao LICENSE.md.
- **Trazer:** `npm install atrament`
- **Origem:** [repositório](https://github.com/jakubfiala/atrament) · [site](https://www.npmjs.com/package/atrament) · último commit em 25.11.2025 · aviso: «© 2024 Jakub Fiala» · inventário: `inventario/conferencia-e-lacunas.md`

### CSSFX

[todos] · MIT · LIBERADO · CSS · dependência nova: não

- **Peças:**
  - `Underline`: sublinhado que se desenha
  - `Overline`: linha superior animada
  - `Highlight`: marca-texto animado
  - `Strikethrough`: risco animado
  - `Shine`: brilho
- **Por quê:** Sublinhados que se desenham, para o vínculo responder com a matéria da marca.
- **Cuidados:** Parado desde 2021: copiar o CSS, manter o aviso MIT e acrescentar o movimento reduzido.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/jolaleye/cssfx) · [site](https://cssfx.netlify.app) · último commit em 15.08.2021 · aviso: «Copyright (c) 2019 Jonathan Olaleye» · inventário: `inventario/colecoes-e-demos.md`

### drawably

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (nenhuma (peer React))

- **Peças:**
  - `drawably`: botão, caixa, rádio, alternador, sublinhado e círculo desenhados à mão, com traço que «ferve»
- **Por quê:** Controles em traço à mão para identidade artesanal.
- **Cuidados:** O botão sobe no hover: trocar por cor. Sem repositório público.
- **Trazer:** `npm install drawably@0.4.2`
- **Origem:** [site](https://www.npmjs.com/package/drawably) · último commit em 10.09.2026 · aviso: «© 2026 Daniel Belyi» · inventário: `inventario/conferencia-e-lacunas.md`

### ericts

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion, Base UI)

- **Peças:**
  - `status-button`: botão com estado [P]
  - `icon-swap`: troca de ícone
  - `copy-button`: copiar [P]
  - `expandable-toggle-button`: botão que se expande
- **Por quê:** Botões que respondem à ação com movimento reduzido em 87 arquivos.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npx shadcn@4.21.0 add @ericts/status-button --dry-run`
- **Origem:** [repositório](https://github.com/EricTsai83/ericts-ui) · [site](https://ui.ericts.com) · último commit em 10.10.2026 · aviso: «Copyright (c) 2026 ericts/ui contributors» · inventário: `inventario/registros-shadcn.md`

### liquid-gooey

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (liquid-gooey)

- **Peças:**
  - `liquid-gooey`: fusão em gosma, mudança de forma gelatinosa e dissolução
- **Por quê:** Microinteração líquida em SVG para marcas cuja matéria é fluida.
- **Cuidados:** Trata movimento reduzido; filtro SVG pesa no celular; só como matéria da marca.
- **Trazer:** `npm install liquid-gooey@0.2.2`
- **Origem:** [repositório](https://github.com/Jakubantalik/Libraries.dev) · último commit em 22.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### matos-ui

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion, Base UI)

- **Peças:**
  - `physics-counter`: contador com física [P]
  - `stepper-input`: campo de passos [P]
  - `bouncy-toggle`: interruptor com mola
  - `confirm-button`: botão de confirmação
  - `progress-ring`: anel de progresso
- **Por quê:** Controles com física e resposta à ação.
- **Cuidados:** magnetic-card só com hover em cor ou luz; impact-priority-matrix é catálogo.
- **Trazer:** `npx shadcn@4.21.0 add https://matos-ui.com/r/physics-counter.json --dry-run`
- **Origem:** [repositório](https://github.com/silasmatos/matos-ui) · [site](https://matos-ui.com) · último commit em 10.09.2026 · aviso: «Copyright (c) 2026 Matos UI» · inventário: `inventario/registros-shadcn.md`

### MicroKit

[todos] · MIT · LIBERADO (com exclusões) · registro shadcn · dependência nova: **sim** (motion, ogl)

- **Peças:**
  - `scrub-number-field`: número ao arrastar [P]
  - `blur-glide-menu`: menu que desliza com desfoque
  - `expanding-icon-tabs`: abas de ícone que se expandem
  - `next-dot-fill-button`: botão que se preenche
- **Por quê:** Microinterações de controle e navegação.
- **Cuidados:** Excluído: grainient.tsx (React Bits). cursor-follow-share-button vetado; neon-invert-button é catálogo.
- **Trazer:** `npx shadcn@4.21.0 add @microkit/scrub-number-field --dry-run`
- **Origem:** [repositório](https://github.com/henriquegpb/microkit) · [site](https://microkit.co) · último commit em 28.09.2026 · aviso: «Copyright (c) 2026 Henrique Barone» · inventário: `inventario/registros-shadcn.md`

### moumenlab

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion)

- **Peças:**
  - `hover-expand-icon-strip`: faixa de ícones que se expande
  - `search-expand-nav`: busca que se expande
  - `ticket-number-ticker`: número de senha [P]
  - `morphing-checkout`: finalização que se transforma
- **Por quê:** Navegação e ações que se transformam.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npx shadcn@4.21.0 add @moumenlab/hover-expand-icon-strip --dry-run`
- **Origem:** [repositório](https://github.com/moumen-soliman/lab) · [site](https://lab.moumen.dev) · último commit em 06.08.2026 · aviso: «Copyright (c) 2026 Moumen Soliman» · inventário: `inventario/registros-shadcn.md`

### perfect-freehand

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim**

- **Peças:**
  - `perfect-freehand`: traço com espessura pela pressão
- **Por quê:** Assinatura e anotação com traço vivo.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npm install perfect-freehand`
- **Origem:** [repositório](https://github.com/steveruizok/perfect-freehand) · [site](https://perfectfreehand.com) · último commit em 01.02.2026 · aviso: «© 2021 Stephen Ruiz Ltd» · inventário: `inventario/conferencia-e-lacunas.md`

### react-hover-video-player

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-hover-video-player)

- **Peças:**
  - `react-hover-video-player`: vídeo que toca ao passar o ponteiro
- **Por quê:** Resposta da imagem com vídeo curto do ofício (corte, prato, obra).
- **Cuidados:** No toque, precisa de equivalente; parado desde 2024; vídeo hospedado junto.
- **Trazer:** `npm install react-hover-video-player@10.0.2`
- **Origem:** [repositório](https://github.com/Gyanreyer/react-hover-video-player) · último commit em 25.07.2024 · inventário: `inventario/pacotes-de-efeito.md`

### tanishk-interface-lab

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não

- **Peças:**
  - `lens-reveal`: revelação por lente
  - `progressive-action`: ação progressiva
  - `contextual-dock`: doca contextual
  - `evidence-carousel`: carrossel de provas [P]
- **Por quê:** Lente e ação progressiva sem dependência.
- **Cuidados:** inverted-cursor substitui o ponteiro: fora.
- **Trazer:** `npx shadcn@4.21.0 add https://tanishk-interface-lab.vercel.app/r/lens-reveal.json --dry-run`
- **Origem:** [repositório](https://github.com/tanishkfr/tanishk-interface-lab) · [site](https://tanishk-interface-lab.vercel.app) · último commit em 29.09.2026 · aviso: «Copyright (c) 2026 Tanishk Salagame» · inventário: `inventario/registros-shadcn.md`

### tiks

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `tiks`: sons de clique e sucesso sintetizados
- **Por quê:** Resposta sonora sem arquivo.
- **Cuidados:** Só por ação e com opção de silenciar.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/rexa-developer/tiks) · [site](https://rexa-developer.github.io/tiks/) · último commit em 06.09.2026 · aviso: «© 2026 Rexa» · inventário: `inventario/conferencia-e-lacunas.md`

### trovecn

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion, Base UI)

- **Peças:**
  - `list-detail-morph`: item que vira detalhe
  - `menu`: menu
  - `notification-stack`: pilha de avisos
- **Por quê:** Item de lista que se transforma em detalhe.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/PPRAMANIK62/trovecn) · [site](https://trovecn.dev) · último commit em 28.08.2026 · aviso: «Copyright (c) 2026 Purbayan Pramanik» · inventário: `inventario/registros-shadcn.md`

### uiarc

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion)

- **Peças:**
  - `floating-button-group`: grupo flutuante de botões
  - `expanding-button-group`: grupo que se expande
  - `split-button`: botão dividido
  - `action-button`: botão de ação
  - `copy-button`: copiar [P]
- **Por quê:** Atalho flutuante e ações com movimento reduzido em 254 arquivos.
- **Cuidados:** Camada Pro paga.
- **Trazer:** `npx shadcn@4.21.0 add @uiarc/floating-button-group --dry-run`
- **Origem:** [repositório](https://github.com/kuratlielia/arc-library) · [site](https://uiarc.dev) · último commit em 12.10.2026 · aviso: «Copyright (c) 2026 Elia Kuratli» · inventário: `inventario/registros-shadcn.md`

### stateful-button

[P][C] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, Radix)

- **Peças:**
  - `stateful-button`: botão com estados de envio
- **Por quê:** Resposta à ação no envio do formulário.
- **Cuidados:** Parado há cerca de 9 meses.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/nanyx95/Stateful-Button-React) · [site](https://github.com/nanyx95/Stateful-Button-React) · último commit em 04.01.2026 · aviso: «Copyright (c) 2025 Fabio Somaglia» · inventário: `inventario/registros-shadcn.md`

---

## 6. Peças e cartões

A peça que inclina, a luz que segue dentro dela, a aresta que acende, como o titânio do celular e o orbe do Atlas (`../esteira/19-o-padrao-atlas.md`, seção 8.3). A mesma subida em todo cartão de uma grade igual é M1.

### Opensource UI ★

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `cafe-menu-board-card`: cartão de quadro de cardápio
  - `magazine-cover-card`: capa de revista
  - `drop-cap-editorial-card`: cartão editorial com capitular
  - `editorial-quote-card`: citação editorial
  - `denim-product-editorial-card`: produto em brim
  - `fine-grain-pattern`: padrão de grão fino
  - `paper-fold-background`: fundo de papel dobrado
- **Por quê:** Peças editoriais e de cardápio com matéria, feitas para o comércio local.
- **Cuidados:** 200+ componentes declarados MIT; conferir cada peça.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/bidyut10/opensourceui) · [site](https://opensourceui.in) · último commit em 08.10.2026 · aviso: «Copyright (c) 2026 Bidyut Kundu» · inventário: `inventario/registros-shadcn.md`

### react-parallax-tilt ★

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-parallax-tilt)

- **Peças:**
  - `react-parallax-tilt`: inclinação com brilho e giroscópio
- **Por quê:** A inclinação e o relevo sob o ponteiro, a mais madura em React.
- **Cuidados:** Sem movimento reduzido nem corte no toque: desligar com motion-reduce e pointer: coarse; conferir escrita de leiaute do brilho.
- **Trazer:** `npm install react-parallax-tilt@1.7.346`
- **Origem:** [repositório](https://github.com/mkosir/react-parallax-tilt) · último commit em 04.10.2026 · inventário: `inventario/pacotes-de-efeito.md`

### @codaworks/react-glow

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@codaworks/react-glow)

- **Peças:**
  - `react-glow`: luz que acompanha o ponteiro sobre cartões
- **Por quê:** A luz que segue dentro da peça, em 1,2 KB.
- **Cuidados:** Parado desde 01/2024; não trata movimento reduzido (desligar com motion-reduce); hover só com ponteiro fino.
- **Trazer:** `npm install @codaworks/react-glow@1.0.6`
- **Origem:** [repositório](https://github.com/codaworks/react-glow) · último commit em 17.01.2024 · inventário: `inventario/pacotes-de-efeito.md`

### atropos

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (atropos)

- **Peças:**
  - `atropos`: paralaxe 3D por camadas sob o ponteiro, com sombra e brilho
- **Por quê:** Profundidade em camadas dentro da peça, do autor do Swiper.
- **Cuidados:** Parado desde 2023; não trata movimento reduzido (desligar com motion-reduce) e pointer: coarse.
- **Trazer:** `npm install atropos@2.0.2`
- **Origem:** [repositório](https://github.com/nolimits4web/atropos) · último commit em 04.07.2023 · inventário: `inventario/pacotes-de-efeito.md`

### hover-tilt

[todos] · MPL-2.0 · LIBERADO · pacote npm · dependência nova: **sim** (hover-tilt)

- **Peças:**
  - `hover-tilt`: inclinação com brilho, como web component
- **Por quê:** Inclinação com reflexo para peças de matéria brilhante.
- **Cuidados:** npm MPL-2.0 e repositório MIT: tratar como MPL (arquivo modificado continua aberto); não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install hover-tilt@1.0.0`
- **Origem:** [repositório](https://github.com/simeydotme/hover-tilt) · último commit em 29.11.2025 · inventário: `inventario/pacotes-de-efeito.md`

### Kinesis.js

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `inclinação`: peça que inclina sob o ponteiro
  - `paralaxe`: camadas sob o ponteiro
  - `arrasto`: peça que se arrasta com mola
- **Por quê:** Inclinação e relevo sob o ponteiro, por propriedades CSS com mola.
- **Cuidados:** Magnetismo em botão vetado; efeitos de rolagem só no Completo; MR 3.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/amineyarman/kinesis.js) · [site](https://kinesisjs.com) · último commit em 06.10.2026 · aviso: «© 2024–present Amine Bouyarmane» · inventário: `inventario/conferencia-e-lacunas.md`

### react-parallax-mousemove

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-parallax-mousemove)

- **Peças:**
  - `react-parallax-mousemove`: camadas que derivam com mola sob o ponteiro
- **Por quê:** Profundidade leve sem dependências, com movimento reduzido tratado.
- **Cuidados:** Mola sem quique; hover só com ponteiro fino.
- **Trazer:** `npm install react-parallax-mousemove@2.0.1`
- **Origem:** [repositório](https://github.com/adamcwade/react-parallax-mousemove) · último commit em 19.07.2026 · inventário: `inventario/pacotes-de-efeito.md`

### vanilla-tilt

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (vanilla-tilt)

- **Peças:**
  - `vanilla-tilt`: inclinação com brilho e giroscópio em JS puro
- **Por quê:** Inclinação madura só por transform, fora do React.
- **Cuidados:** Parado desde 2023, maduro; não trata movimento reduzido (desligar com motion-reduce) e pointer: coarse.
- **Trazer:** `npm install vanilla-tilt@1.8.1`
- **Origem:** [repositório](https://github.com/micku7zu/vanilla-tilt.js) · último commit em 15.08.2023 · inventário: `inventario/pacotes-de-efeito.md`

---

## 7. Imagem e galeria

A galeria [P] e o que a fotografia do negócio pede: a ampliação, a comparação, o álbum, o livro, o panorama (`../esteira/14-funcionalidades/03-galeria.md`). A imagem junto do ponteiro e a distorção em WebGL são do Completo; o antes e depois não se publica na odontologia nem na medicina (`../esteira/08-imagem-e-fotografia.md`).

### Cambio ★

[P][C] · MIT · LIBERADO · cópia do repositório · dependência nova: não (Base UI, motion)

- **Peças:**
  - `cambio`: a miniatura que se abre em diálogo ou tela cheia e volta ao lugar
- **Por quê:** Lightbox com animação compartilhada, na pilha aprovada, de autor de referência.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/raphaelsalaja/cambio) · [site](https://cambio.raphaelsalaja.com) · último commit em 09.07.2026 · aviso: «© 2025 Raphael Salaja» · inventário: `inventario/conferencia-e-lacunas.md`

### photoswipe ★

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (photoswipe, react-photoswipe-gallery)

- **Peças:**
  - `photoswipe`: lightbox de referência com gestos e zoom
  - `react-photoswipe-gallery`: envoltório React (4.1.2)
  - `PhotoSwipe`: lightbox com gesto de arrastar e pinçar
- **Por quê:** A galeria de referência, que desliga as animações sozinha sob movimento reduzido.
- **Cuidados:** Escreve leiaute no zoom; publicação de 05/2024, madura; o envoltório React é pacote à parte.
- **Trazer:** `npm install photoswipe@5.4.4 react-photoswipe-gallery@4.1.2`
- **Origem:** [repositório](https://github.com/dimsemenov/Photoswipe) · último commit em 24.05.2024 · inventário: `inventario/pacotes-de-efeito.md`; `inventario/blocos-e-primitivos.md`

### React Photo Album ★

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim**

- **Peças:**
  - `rows`: álbum em linhas
  - `columns`: álbum em colunas
  - `masonry`: mosaico, com srcset
  - `react-photo-album`: álbum justificado, em colunas ou masonry
- **Por quê:** O álbum que monta a galeria com as proporções reais das fotos, par natural do lightbox.
- **Cuidados:** Adaptar à marca e medir. Não anima; casar com um lightbox.
- **Trazer:** `npm install react-photo-album@3.6.1`
- **Origem:** [repositório](https://github.com/igordanchenko/react-photo-album) · [site](https://react-photo-album.com) · último commit em 12.10.2026 · aviso: «Copyright (c) 2021 Igor Danchenko» · inventário: `inventario/pacotes-de-efeito.md`; `inventario/blocos-e-primitivos.md`

### react-compare-slider ★

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-compare-slider)

- **Peças:**
  - `react-compare-slider`: antes e depois acessível pelo teclado, com ARIA
- **Por quê:** Comparação acessível e leve, com movimento reduzido.
- **Cuidados:** Fora da odontologia e da medicina, onde o kit não publica antes e depois.
- **Trazer:** `npm install react-compare-slider@4.0.0`
- **Origem:** [repositório](https://github.com/nerdyman/react-compare-slider) · último commit em 20.03.2026 · inventário: `inventario/pacotes-de-efeito.md`

### StPageFlip (page-flip) ★

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (page-flip)

- **Peças:**
  - `page-flip`: livro ou revista com páginas que viram, de HTML ou imagens
- **Por quê:** Cardápio ou catálogo como livro que se folheia: objeto do mundo com gesto.
- **Cuidados:** Parado desde 2021, maduro; escreve leiaute; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install page-flip@2.0.7`
- **Origem:** [repositório](https://github.com/Nodlik/StPageFlip) · último commit em 18.04.2021 · inventário: `inventario/pacotes-de-efeito.md`

### Yet Another React Lightbox ★

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim**

- **Peças:**
  - `Zoom`: ampliação
  - `Thumbnails`: miniaturas
  - `Captions`: legendas
  - `Video`: vídeo
  - `Fullscreen`: tela cheia
  - `Slideshow`: sequência
  - `yet-another-react-lightbox`: lightbox completo e acessível, com plugins
- **Por quê:** O melhor lightbox livre, para a galeria de fotos reais do Profissional.
- **Cuidados:** Só 1 arquivo trata o movimento reduzido: desligar as transições com ele; peso não medido.
- **Trazer:** `npm install yet-another-react-lightbox@3.32.2`
- **Origem:** [repositório](https://github.com/igordanchenko/yet-another-react-lightbox) · [site](https://yet-another-react-lightbox.com) · último commit em 12.10.2026 · aviso: «Copyright (c) 2022 Igor Danchenko» · inventário: `inventario/pacotes-de-efeito.md`; `inventario/blocos-e-primitivos.md`

### a1ui

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (Base UI)

- **Peças:**
  - `compare-curtain`: comparação em cortina [P]
  - `peel-stack`: pilha que descasca
  - `orbit-dial`: disco orbital
  - `toast-queue`: fila de avisos
- **Por quê:** Comparação e pilha que descasca sobre a pilha aprovada.
- **Cuidados:** Fonte Commit Mono com outra licença; ascii-* fora do luxo; particle-menu é catálogo.
- **Trazer:** `npx shadcn@4.21.0 add https://ui.arjayby1.xyz/r/compare-curtain.json --dry-run`
- **Origem:** [repositório](https://github.com/arjayby/a1ui) · [site](https://ui.arjayby1.xyz) · último commit em 30.09.2026 · aviso: «Copyright (c) 2026 Arjay Bayona» · inventário: `inventario/registros-shadcn.md`

### AI Canvas

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, three, @react-three/fiber, Radix, matter-js)

- **Peças:**
  - `peel-corner-reveal`: canto que descasca
  - `flip-calendar`: calendário que vira
  - `polaroid-stack`: pilha de polaroides
  - `tilted-coverflow`: coverflow inclinado [P]
  - `cube-carousel`: carrossel em cubo [P]
  - `text-blur-reveal`: revelação de texto
  - `noise-bg`: fundo com ruído
  - `scroll-wipe-gallery`: galeria ligada à rolagem [C]
- **Por quê:** Papel que descasca, calendário e polaroide: objetos de imagem com gesto.
- **Cuidados:** Open core; a página de créditos cita CC BY 3.0: conferir o recurso. magnetic-dots, sticker-wall, emoji-burst, glitch-button e neon-clock fora.
- **Trazer:** `npx shadcn@4.21.0 add @aicanvas/peel-corner-reveal --dry-run`
- **Origem:** [repositório](https://github.com/uiNerd16/aicanvas) · [site](https://aicanvas.me) · último commit em 11.10.2026 · aviso: «Copyright (c) 2026 AI Canvas» · inventário: `inventario/registros-shadcn.md`

### artbloom UI

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (motion, Radix)

- **Peças:**
  - `sheet-fold`: folha que dobra
  - `shutter-compare`: comparação em obturador [P]
  - `split-shutter`: obturador dividido
  - `curtain-sequence`: sequência de cortina
  - `wetting-reveal`: revelação que molha
  - `morphogen-wordmark`: logotipo que se forma
- **Por quê:** Revelações de papel, cortina e obturador com movimento reduzido alto.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/Iitian001/ui-artbloom) · [site](https://ui.artbloom.tech) · último commit em 23.09.2026 · aviso: «Copyright (c) 2026 Shreyash Mishra» · inventário: `inventario/registros-shadcn.md`

### Bjork UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, GSAP, three, @react-three/fiber, ogl, Radix)

- **Peças:**
  - `torn-edge-reveal`: revelação de papel rasgado
  - `ink-bleed-text`: texto que sangra tinta
  - `product-reveal-card`: cartão que revela o produto
  - `hover-image-gallery`: galeria no hover
  - `portfolio-gallery`: galeria de portfólio [P]
  - `ruler-carousel`: carrossel de régua [P]
  - `velocity-ink`: tinta pela velocidade [C]
  - `shader-aurora-veil`: véu de aurora [C]
- **Por quê:** Papel rasgado e tinta: matéria de imagem e texto.
- **Cuidados:** magnetic-letters e decode-text são truque; WebGL só no Completo.
- **Trazer:** `npx shadcn@4.21.0 add @bjork-ui/torn-edge-reveal --dry-run`
- **Origem:** [repositório](https://github.com/isaiahbjork/ui) · [site](https://ui.isaiahbjork.com) · último commit em 11.10.2026 · aviso: «Copyright (c) 2026 Isaiah Bjork» · inventário: `inventario/registros-shadcn.md`

### CSSgram

[todos] · MIT · LIBERADO · CSS · dependência nova: não

- **Peças:**
  - `filtros`: tratamentos de foto por filtro e mistura
- **Por quê:** Unifica as fotos reais do negócio num mesmo tratamento de luz e cor.
- **Cuidados:** Parado desde 2016, mas é CSS estável: ajustar os filtros à paleta da marca.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/una/CSSgram) · [site](https://una.im/CSSgram) · último commit em 11.11.2016 · aviso: «Copyright (c) 2015 Una Kravets» · inventário: `inventario/colecoes-e-demos.md`

### react-lite-youtube-embed

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (peer React)

- **Peças:**
  - `lite-youtube`: fachada leve, player só no clique
- **Por quê:** Vídeo sem peso nem rastreio até o clique.
- **Cuidados:** Depois do clique o YouTube é pedido externo: avisar.
- **Trazer:** `npm install react-lite-youtube-embed`
- **Origem:** [repositório](https://github.com/ibrahimcesar/react-lite-youtube-embed) · [site](https://ibrahimcesar.github.io/react-lite-youtube-embed/) · último commit em 12.10.2026 · aviso: «© 2021 Ibrahim Cesar» · inventário: `inventario/conferencia-e-lacunas.md`

### ReactFrame

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, GSAP, three, @react-three/fiber, Radix)

- **Peças:**
  - `tearable-reveal`: revelação que rasga
  - `word-reveal`: revelação de palavras
  - `image-deck-3d`: baralho de imagens 3D [P]
  - `cylinder-gallery`: galeria cilíndrica [P]
  - `gallery-flow`: galeria em fluxo [P]
  - `cinematic-stacked-gallery`: galeria empilhada [P]
  - `tilted-carousel`: carrossel inclinado [P]
  - `compare-slider`: comparação [P]
- **Por quê:** Galerias com profundidade e papel que rasga.
- **Cuidados:** Premium pago à parte; 14 arquivos com rolagem só no Completo; emoji-rating-scale é catálogo.
- **Trazer:** `npx shadcn@4.21.0 add @reactframe/tearable-reveal --dry-run`
- **Origem:** [repositório](https://github.com/AhmetLoca/reactframe-public) · [site](https://reactframe.com) · último commit em 27.09.2026 · aviso: «Copyright (c) 2026 ReactFrame» · inventário: `inventario/registros-shadcn.md`

### rivelle-ui

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, Radix)

- **Peças:**
  - `direction-reveal`: revelação pela direção
  - `compare-slider`: comparação [P]
  - `draggable-stack`: pilha arrastável [P]
  - `cursor-lens`: lente no ponteiro [C]
- **Por quê:** Comparação e pilha arrastável.
- **Cuidados:** magnetic-button vetado.
- **Trazer:** `npx shadcn@4.21.0 add w3cproject/rivelle-ui/compare-slider --dry-run`
- **Origem:** [repositório](https://github.com/w3cproject/rivelle-ui) · [site](https://github.com/w3cproject/rivelle-ui) · último commit em 18.07.2026 · aviso: «Copyright (c) 2026 Rivelle contributors» · inventário: `inventario/registros-shadcn.md`

### spectrumui

[todos] · Apache-2.0 · LIBERADO · registro shadcn · dependência nova: **sim** (motion, three, @react-three/fiber, Radix)

- **Peças:**
  - `disclose-image`: imagem que se revela
  - `animated-testimonials`: depoimentos animados
- **Por quê:** Revelação de imagem e prova social.
- **Cuidados:** package.json diz MIT, vale o Apache-2.0; holographic e dark-matrix fora.
- **Trazer:** `npx shadcn@4.21.0 add @spectrumui/disclose-image --dry-run`
- **Origem:** [repositório](https://github.com/arihantcodes/spectrum-ui) · [site](https://ui.spectrumhq.in) · último commit em 21.09.2026 · inventário: `inventario/registros-shadcn.md`

### thumbhash

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (thumbhash)

- **Peças:**
  - `thumbhash`: marcador borrado com proporção e alfa, gerado no servidor
- **Por quê:** Esqueleto de imagem melhor que o blurhash.
- **Cuidados:** Gerar no build ou no servidor; parado desde 2023, estável.
- **Trazer:** `npm install thumbhash@0.1.1`
- **Origem:** [repositório](https://github.com/evanw/thumbhash) · último commit em 22.03.2023 · inventário: `inventario/pacotes-de-efeito.md`

### UI Layouts

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, three, @react-three/fiber, Radix, Base UI, Lenis, cobe, number-flow)

- **Peças:**
  - `image-hover-accordion`: acordeão de imagens
  - `creative-imagemasking`: máscara de imagem
  - `img-ripple-effect`: ondulação na imagem
  - `noise-effect`: ruído
  - `progressive-carousel`: carrossel progressivo [P]
- **Por quê:** Imagem com máscara e acordeão.
- **Cuidados:** Só 3 de 109 arquivos tratam movimento reduzido; Lenis em quatro; sparkles* são catálogo.
- **Trazer:** `npx shadcn@4.21.0 add @ui-layouts/image-hover-accordion --dry-run`
- **Origem:** [repositório](https://github.com/ui-layouts/uilayouts) · [site](https://www.ui-layouts.com) · último commit em 23.08.2026 · aviso: «Copyright (c) 2024 UI LAYOUT» · inventário: `inventario/registros-shadcn.md`

### unlazy

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@unlazy/core)

- **Peças:**
  - `unlazy`: carga preguiçosa com BlurHash e ThumbHash
- **Por quê:** A foto entra sem salto.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npm install @unlazy/core`
- **Origem:** [repositório](https://github.com/johannschopplich/unlazy) · [site](https://unlazy.byjohann.dev) · último commit em 07.08.2026 · aviso: «© 2023–present Johann Schopplich» · inventário: `inventario/conferencia-e-lacunas.md`

### Unlumen UI

[todos] · MIT · **CONDICIONAL**, só no repositório do cliente · registro shadcn · dependência nova: **sim** (motion, GSAP, three, @react-three/fiber, ogl, Radix, Base UI)

- **Peças:**
  - `hover-image-list`: lista com imagem no hover
  - `orbital-image-wheel`: roda de imagens
  - `dia-text-reveal`: revelação de texto
  - `progressive-blur`: desfoque progressivo
  - `tilt-card`: inclinação
  - `cursor-image-trail`: rastro de imagens [C]
- **Por quê:** Lista e imagem com gesto.
- **Cuidados:** LICENSE MIT, mas a página de licença do site proíbe extrair componentes para reuso: só no site do cliente. 54 itens Pro; magnetic e matrix fora.
- **Trazer:** `npx shadcn@4.21.0 add @unlumen-ui/hover-image-list --dry-run`
- **Origem:** [repositório](https://github.com/leovvx/unlumen-ui-docs) · [site](https://ui.unlumen.com) · último commit em 01.08.2026 · aviso: «Copyright (c) 2026 Léo Wicki» · inventário: `inventario/registros-shadcn.md`

### video-ambient-glow

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (video-ambient-glow)

- **Peças:**
  - `video-ambient-glow`: halo de cor ambiente em volta do vídeo
- **Por quê:** Luz do vídeo vazando no fundo, matéria de luz.
- **Cuidados:** Filtro de desfoque é caro; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install video-ambient-glow@1.2.6`
- **Origem:** [repositório](https://github.com/mike-at-redspace/video-ambient-glow) · último commit em 07.11.2025 · inventário: `inventario/pacotes-de-efeito.md`

### Zyeon UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não

- **Peças:**
  - `lightbox-gallery`: galeria com lightbox [P]
  - `photo-stack`: pilha de fotos
  - `image-zoom`: zoom de imagem [P]
  - `tilt-card`: inclinação
  - `noise-texture`: textura de ruído
  - `spotlight`: luz sob o cursor
  - `redacted-text`: texto tarjado
- **Por quê:** Galeria e fotos com gesto, sem dependência.
- **Cuidados:** O repositório só tem README e LICENSE; o código vem do site. 70 itens Pro; meteors, retro-grid, particles e magnetic-* fora.
- **Trazer:** `npx shadcn@4.21.0 add https://ui.zyeon.ai/r/lightbox-gallery.json --dry-run`
- **Origem:** [repositório](https://github.com/Zyeon-AI/zyeon-ui-components) · [site](https://ui.zyeon.ai) · último commit em 01.08.2026 · aviso: «Copyright (c) 2026 Zyeon AI» · inventário: `inventario/registros-shadcn.md`

### @midzer/tobii

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@midzer/tobii)

- **Peças:**
  - `tobii`: lightbox acessível
- **Por quê:** Lightbox acessível e com movimento reduzido, em JS puro.
- **Cuidados:** Pouco uso (447/semana); conferir escrita de leiaute.
- **Trazer:** `npm install @midzer/tobii@3.2.0`
- **Origem:** [repositório](https://github.com/midzer/tobii) · último commit em 02.04.2026 · inventário: `inventario/pacotes-de-efeito.md`

### @panzoom/panzoom

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@panzoom/panzoom)

- **Peças:**
  - `panzoom`: arrastar e aproximar
- **Por quê:** Pan e zoom em JS puro, só por transform.
- **Cuidados:** Não trata movimento reduzido (desligar com motion-reduce); LICENSE em MIT-License.txt.
- **Trazer:** `npm install @panzoom/panzoom@4.6.2`
- **Origem:** [repositório](https://github.com/timmywil/panzoom) · último commit em 02.04.2026 · inventário: `inventario/pacotes-de-efeito.md`

### baguettebox.js

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (baguettebox.js)

- **Peças:**
  - `baguetteBox`: lightbox leve com gestos
- **Por quê:** Lightbox mínimo com toque.
- **Cuidados:** Não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install baguettebox.js@1.13.0`
- **Origem:** [repositório](https://github.com/feimosi/baguetteBox.js) · último commit em 09.11.2025 · inventário: `inventario/pacotes-de-efeito.md`

### bigger-picture

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (bigger-picture)

- **Peças:**
  - `bigger-picture`: lightbox de foto, vídeo e HTML com zoom e gestos
- **Por quê:** Lightbox com vídeo, sem dependência em tempo de execução.
- **Cuidados:** Feito em Svelte, mas roda em JS puro; trata movimento reduzido.
- **Trazer:** `npm install bigger-picture@1.1.20`
- **Origem:** [repositório](https://github.com/henrygd/bigger-picture) · último commit em 25.02.2026 · inventário: `inventario/pacotes-de-efeito.md`

### glightbox

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (glightbox)

- **Peças:**
  - `glightbox`: lightbox com vídeo e conteúdo, sem dependências
- **Por quê:** Lightbox em JS puro que aceita vídeo.
- **Cuidados:** Referência a CDN no pacote: conferir pedido externo; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install glightbox@3.3.1`
- **Origem:** [repositório](https://github.com/biati-digital/glightbox) · último commit em 21.01.2025 · inventário: `inventario/pacotes-de-efeito.md`

### img-comparison-slider

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (img-comparison-slider)

- **Peças:**
  - `img-comparison-slider`: antes e depois como web component
  - `@img-comparison-slider/react`: envoltório React (8.0.2)
  - `img-comparison-slider`: antes e depois que responde ao arraste [P]
- **Por quê:** Comparação em web component, acessível pelo teclado.
- **Cuidados:** Mesma vedação de nicho; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install img-comparison-slider@8.0.7`
- **Origem:** [repositório](https://github.com/sneas/img-comparison-slider) · último commit em 29.01.2026 · inventário: `inventario/colecoes-e-demos.md`; `inventario/pacotes-de-efeito.md`

### medium-zoom

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (medium-zoom)

- **Peças:**
  - `medium-zoom`: zoom de imagem por transform (FLIP)
- **Por quê:** Zoom de imagem leve em JS puro, só por transform.
- **Cuidados:** Parado desde 2023, estável; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install medium-zoom@1.1.0`
- **Origem:** [repositório](https://github.com/francoischalifour/medium-zoom) · último commit em 16.11.2023 · inventário: `inventario/pacotes-de-efeito.md`

### moco

[P][C] · MIT · LIBERADO · registro shadcn · dependência nova: não

- **Peças:**
  - `compare`: comparação de imagens
  - `zoom`: zoom de imagem
  - `stepper`: etapas
  - `scrolly`: narrativa ligada à rolagem [C]
- **Por quê:** Comparação e zoom sem dependência.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npx shadcn@4.21.0 add https://mocoui.site/r/compare.json --dry-run`
- **Origem:** [repositório](https://github.com/shreya0204/moco) · [site](https://mocoui.site) · último commit em 19.08.2026 · aviso: «Copyright (c) 2026 Shreya Agarwal» · inventário: `inventario/registros-shadcn.md`

### opalframe

[P][C] · MIT · LIBERADO · registro shadcn · dependência nova: não

- **Peças:**
  - `comparison-lens`: comparação com lente
  - `expandable-dock`: doca expansível
  - `focus-stack`: pilha em foco
- **Por quê:** Comparação com lente sem dependência.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npx shadcn@4.21.0 add https://aduneer.github.io/opalframe/r/comparison-lens.json --dry-run`
- **Origem:** [repositório](https://github.com/Aduneer/opalframe) · [site](https://aduneer.github.io/opalframe/) · último commit em 07.10.2026 · aviso: «Copyright (c) 2026 Opalframe contributors» · inventário: `inventario/registros-shadcn.md`

### pinch-zoom-js

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim**

- **Peças:**
  - `pinch-zoom`: zoom e arrasto por pinça
- **Por quê:** Zoom da foto no celular.
- **Cuidados:** Sem commit desde 01/2024: madura e estável.
- **Trazer:** `npm install pinch-zoom-js`
- **Origem:** [repositório](https://github.com/manuelstofer/pinchzoom) · [site](https://www.npmjs.com/package/pinch-zoom-js) · último commit em 24.01.2024 · aviso: «© 2013-now Manuel Stofer» · inventário: `inventario/conferencia-e-lacunas.md`

### react-360-product-viewer

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-360-product-viewer)

- **Peças:**
  - `react-360-product-viewer`: giro 360° de produto por arrasto
- **Por quê:** Produto que gira na mão do visitante, por sequência de fotos.
- **Cuidados:** Não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install react-360-product-viewer@0.3.0`
- **Origem:** [repositório](https://github.com/Todilo/react-360-product-viewer) · último commit em 27.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### react-bnb-gallery

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-bnb-gallery)

- **Peças:**
  - `react-bnb-gallery`: galeria e lightbox no estilo Airbnb
- **Por quê:** Galeria de ambiente para imobiliária e hospedagem.
- **Cuidados:** Estética alheia a desfazer; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install react-bnb-gallery@2.2.1`
- **Origem:** [repositório](https://github.com/pedropalau/react-bnb-gallery) · último commit em 06.03.2026 · inventário: `inventario/pacotes-de-efeito.md`

### react-image-gallery

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-image-gallery)

- **Peças:**
  - `react-image-gallery`: galeria com miniaturas e tela cheia
  - `ImageGallery`: galeria com miniaturas
- **Por quê:** Galeria de produto com miniaturas, pronta.
- **Cuidados:** Aparência genérica a desfazer; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install react-image-gallery@2.1.2`
- **Origem:** [repositório](https://github.com/xiaolin/react-image-gallery) · último commit em 26.02.2026 · inventário: `inventario/pacotes-de-efeito.md`; `inventario/blocos-e-primitivos.md`

### react-inner-image-zoom

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-inner-image-zoom)

- **Peças:**
  - `react-inner-image-zoom`: zoom dentro do próprio quadro
  - `inner-image-zoom`: versão em JS puro (1.1.0)
- **Por quê:** Zoom de detalhe do produto sem sair da moldura.
- **Cuidados:** Não trata movimento reduzido (desligar com motion-reduce); anima filtro e leiaute.
- **Trazer:** `npm install react-inner-image-zoom@4.0.2`
- **Origem:** [repositório](https://github.com/laurenashpole/inner-image-zoom) · último commit em 11.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### react-layout-masonry

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-layout-masonry)

- **Peças:**
  - `react-layout-masonry`: masonry responsivo
- **Por quê:** Grade masonry ativa, com peer do React 19.
- **Cuidados:** Não anima; adaptar à marca e medir.
- **Trazer:** `npm install react-layout-masonry@2.1.0`
- **Origem:** [repositório](https://github.com/sibiraj-s/react-layout-masonry) · último commit em 02.10.2026 · inventário: `inventario/pacotes-de-efeito.md`

### react-medium-image-zoom

[P][C] · BSD-3-Clause · LIBERADO · pacote npm · dependência nova: **sim** (react-medium-image-zoom)

- **Peças:**
  - `react-medium-image-zoom`: zoom à maneira do Medium, acessível
  - `Zoom`: ampliação da imagem no lugar, ao toque
- **Por quê:** A imagem que cresce no lugar, acessível e com movimento reduzido.
- **Cuidados:** Conferir escrita de leiaute; adaptar à marca.
- **Trazer:** `npm install react-medium-image-zoom@5.4.9`
- **Origem:** [repositório](https://github.com/rpearce/react-medium-image-zoom) · último commit em 12.08.2026 · inventário: `inventario/pacotes-de-efeito.md`; `inventario/blocos-e-primitivos.md`

### react-pdf-flipbook-viewer

[P][C] · MIT · LIBERADO · cópia do repositório · dependência nova: não (motion)

- **Peças:**
  - `folheador de PDF`: com zoom e tela cheia, para cardápio, catálogo e portfólio
- **Por quê:** Cardápio e catálogo que se folheiam como livro.
- **Cuidados:** Conferir a licença das dependências de virada de página; parado há cerca de 11 meses.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/mohitkumawat310/react-pdf-flipbook-viewer) · [site](https://github.com/mohitkumawat310/react-pdf-flipbook-viewer) · último commit em 16.11.2025 · aviso: «Copyright (c) 2024 Mohit Kumawat» · inventário: `inventario/registros-shadcn.md`

### react-plock

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (peer React)

- **Peças:**
  - `react-plock`: grade masonry de 1 kB
- **Por quê:** Álbum em masonry leve.
- **Cuidados:** O package.json diz ISC; vale o MIT.
- **Trazer:** `npm install react-plock`
- **Origem:** [repositório](https://github.com/askides/react-plock) · [site](https://react-plock-with-nextjs.vercel.app) · último commit em 02.01.2026 · aviso: «© 2023 Renato Pozzi» · inventário: `inventario/conferencia-e-lacunas.md`

### react-responsive-masonry

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-responsive-masonry)

- **Peças:**
  - `react-responsive-masonry`: masonry responsivo
- **Por quê:** Masonry simples e mantido.
- **Cuidados:** Não anima; adaptar à marca e medir.
- **Trazer:** `npm install react-responsive-masonry@2.9.0`
- **Origem:** [repositório](https://github.com/cedricdelpoux/react-responsive-masonry) · último commit em 18.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### react-zoom-pan-pinch

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-zoom-pan-pinch)

- **Peças:**
  - `react-zoom-pan-pinch`: arrastar, pinçar e aproximar
  - `TransformWrapper`: zoom e arrasto com pinça
- **Por quê:** Explorar planta, cardápio em imagem ou mapa com os dedos.
- **Cuidados:** Escreve leiaute; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install react-zoom-pan-pinch@4.2.0`
- **Origem:** [repositório](https://github.com/BetterTyped/react-zoom-pan-pinch) · último commit em 03.09.2026 · inventário: `inventario/pacotes-de-efeito.md`; `inventario/blocos-e-primitivos.md`

### thiings-grid

[P][C] · MIT · LIBERADO · cópia do repositório · dependência nova: não (React)

- **Peças:**
  - `thiings-grid`: grade infinita arrastável
- **Por quê:** Galeria de exploração por arrasto.
- **Cuidados:** Garantir teclado; MR 0.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/charlieclark/thiings-grid) · último commit em 25.03.2026 · aviso: «© 2025 Charlie Clark» · inventário: `inventario/conferencia-e-lacunas.md`

### yet-another-react-lightbox-lite

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (yet-another-react-lightbox-lite)

- **Peças:**
  - `yet-another-react-lightbox-lite`: versão leve do anterior
- **Por quê:** O mesmo lightbox em versão mínima, com movimento reduzido.
- **Cuidados:** Envolver em componente cliente.
- **Trazer:** `npm install yet-another-react-lightbox-lite@2.1.2`
- **Origem:** [repositório](https://github.com/igordanchenko/yet-another-react-lightbox-lite) · último commit em 30.07.2026 · inventário: `inventario/pacotes-de-efeito.md`

### @mediamonks/fast-image-sequence

[C] · MIT · LIBERADO (decl.), fora do kit · pacote npm · dependência nova: **sim** (@mediamonks/fast-image-sequence)

- **Peças:**
  - `fast-image-sequence`: sequência de imagens rápida (giro de produto, cena ligada à rolagem)
- **Por quê:** A cena de produto quadro a quadro, ao estilo das páginas de produto premiadas.
- **Cuidados:** Licença só declarada no npm; ligado à rolagem só no Completo, por ouvinte com a cena na tela; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install @mediamonks/fast-image-sequence@2.2.0`
- **Origem:** [repositório](https://github.com/mediamonks/fast-image-sequence) · último commit em 03.06.2026 · inventário: `inventario/pacotes-de-efeito.md`

### Atelier UI

[C] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, three, @react-three/fiber, Radix, Lenis)

- **Peças:**
  - `liquid-media`: mídia líquida
  - `lens-media`: mídia com lente
  - `webgl-image`: imagem em WebGL
  - `image-bloom`: imagem que floresce
  - `sphere-gallery`: galeria em esfera
  - `spiral-gallery`: galeria em espiral
  - `webgl-text`: texto em WebGL
  - `image-trail`: rastro de imagens
- **Por quê:** Imagem tratada como matéria viva em WebGL, para o Completo.
- **Cuidados:** Lenis e smooth-scroll em quatro arquivos (vetados); nenhum arquivo trata movimento reduzido; 15 itens Pro. fluid-distortion deriva do WebGL Fluid (MIT, manter crédito).
- **Trazer:** `npx shadcn@4.21.0 add @atelier/liquid-media --dry-run`
- **Origem:** [repositório](https://github.com/whatisjery/atelier-ui) · [site](https://www.atelier-ui.com) · último commit em 01.10.2026 · aviso: «Copyright (c) 2024-2025 whatisjery» · inventário: `inventario/registros-shadcn.md`

### codrops-depth-gallery

[C] · MIT · LIBERADO · demo para refazer · dependência nova: **sim** (three, tweakpane)

- **Peças:**
  - `DepthGallery`: galeria em profundidade em que cada imagem molda o fundo GLSL, com paralaxe e reação à velocidade
- **Por quê:** Galeria em que a foto do negócio muda a luz da cena.
- **Cuidados:** WebGL só no Completo; MR 0; conferir a licença das imagens do demo.
- **Trazer:** estudar e refazer: https://tympanus.net/Tutorials/DepthGallery/
- **Origem:** [repositório](https://github.com/houmahani/codrops-depth-gallery) · [site](https://tympanus.net/Tutorials/DepthGallery/) · último commit em 09.03.2026 · aviso: «© 2009–2025 Codrops» · inventário: `inventario/conferencia-e-lacunas.md`

### gl-transitions

[C] · MIT; BSD-2-Clause e BSD-3-Clause em duas transições · LIBERADO · pacote npm · dependência nova: não (nenhuma (GLSL; pede um contexto WebGL))

- **Peças:**
  - `displacement`: transição por deslocamento [C]
  - `crosswarp`: dobra cruzada [C]
  - `dreamy`: transição onírica [C]
  - `morph`: transformação entre imagens [C]
  - `ripple`: ondulação [C]
  - `LinearBlur`: desfoque linear [C]
  - `DefocusBlur`: desfoque de foco [C]
  - `windowslice`: fatias de janela [C]
  - `gl-transitions`: 125 transições de imagem em GLSL (dissolver, livro, mosaico)
- **Por quê:** Transições entre as fotos reais da marca, com matéria e luz.
- **Cuidados:** Manter o aviso de cada transição; não trata movimento reduzido. Cada transição declara a licença (123 MIT, 1 BSD-3, 1 BSD-2); usar com o OGL; WebGL só no Completo.
- **Trazer:** `npm install gl-transitions@1.74.0`
- **Origem:** [repositório](https://github.com/gl-transitions/gl-transitions) · [site](https://gl-transitions.com) · último commit em 10.10.2026 · inventário: `inventario/colecoes-e-demos.md`; `inventario/pacotes-de-efeito.md`

### glimm

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (glimm)

- **Peças:**
  - `glimm`: transições de varredura em WebGL para imagens (núcleo, React e Next)
- **Por quê:** Transição de imagem em shader com movimento reduzido tratado.
- **Cuidados:** Repositório sem LICENSE (pacote MIT); reserva sem WebGL.
- **Trazer:** `npm install glimm@0.3.1`
- **Origem:** [repositório](https://github.com/nomanjack/glimm) · último commit em 13.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### gpuslider

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: não (nenhuma (peer React))

- **Peças:**
  - `Fold`: transição que dobra
  - `Loom`: trama
  - `Tape`: fita
  - `Reel`: rolo
  - `Depth`: profundidade
  - `Lightbox`: ampliação
- **Por quê:** Galeria em shader com transições de matéria (dobra, fita, trama).
- **Cuidados:** WebGPU/WebGL só no Completo; exemplos com Unsplash a tirar.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/niklasp/gpuslider) · [site](https://gpuslider.com) · último commit em 13.10.2026 · aviso: «© 2026 Niklas Jurij Plessing» · inventário: `inventario/conferencia-e-lacunas.md`

### img-fx

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (img-fx, three)

- **Peças:**
  - `img-fx`: revelação de imagem em WebGL para cartões
- **Por quê:** Revelação de imagem com matéria, em WebGL.
- **Cuidados:** Traz three; não trata movimento reduzido (desligar com motion-reduce); reserva sem WebGL.
- **Trazer:** `npm install img-fx@0.5.1`
- **Origem:** [repositório](https://github.com/Jakubantalik/img-fx) · último commit em 04.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

---

## 8. Carrosséis e trilhos

A galeria de deslizar [P]: o trilho que o polegar leva. O carrossel que avança sozinho é M7 (`../esteira/11-anti-ia.md`, seção 5.5).

### CrafterUI ★

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, number-flow)

- **Peças:**
  - `glass-lens-carousel`: carrossel com lente de vidro [P]
  - `molten-ring-carousel`: anel de metal fundido [P]
  - `dither-helix-carousel`: hélice pontilhada [P]
  - `corridor-carousel`: corredor 3D [P]
  - `spine-accordion`: acordeão de lombadas
  - `mercury-dial`: disco de mercúrio
  - `super-hover-list`: lista que acende no hover
  - `handwritten-response`: resposta escrita à mão
- **Por quê:** Carrosséis com matéria (vidro, metal fundido) e objetos de gesto que fogem do carrossel genérico.
- **Cuidados:** Três arquivos ligados à rolagem: só no Completo.
- **Trazer:** `npx shadcn@4.21.0 add @crafterui/glass-lens-carousel --dry-run`
- **Origem:** [repositório](https://github.com/SriSomanaath/crafterui) · [site](https://crafterui.com) · último commit em 20.08.2026 · aviso: «Copyright (c) 2026 CrafterUI» · inventário: `inventario/registros-shadcn.md`

### lina

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (Base UI (ou Radix))

- **Peças:**
  - `lina`: ScrollArea com toque nativo e máscaras adaptativas nas bordas
- **Por quê:** Trilho horizontal com acabamento de toque.
- **Cuidados:** MR 0; exemplos com Unsplash.
- **Trazer:** ``
- **Origem:** [repositório](https://github.com/SameerJS6/lina) · [site](https://lina.sameer.sh) · último commit em 01.09.2025 · aviso: «© 2025 Sameer Singh» · inventário: `inventario/conferencia-e-lacunas.md`

### tw-fade

[todos] · MIT · LIBERADO · CSS · dependência nova: **sim** (Tailwind 4)

- **Peças:**
  - `tw-fade`: esmaecimento nas bordas roláveis
- **Por quê:** Indica que há mais conteúdo.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/petekp/tw-fade) · [site](https://pete.design/tw-fade) · último commit em 13.09.2026 · aviso: «© 2026 Pete Petrash» · inventário: `inventario/conferencia-e-lacunas.md`

### @daformat/react-headless-carousel

[P][C] · 0BSD · LIBERADO · pacote npm · dependência nova: **sim** (@daformat/react-headless-carousel)

- **Peças:**
  - `react-headless-carousel`: carrossel sem estilo, com arrasto
- **Por quê:** Base sem estilo para vestir na matéria da marca.
- **Cuidados:** Trata movimento reduzido; escreve leiaute.
- **Trazer:** `npm install @daformat/react-headless-carousel@1.2.3`
- **Origem:** [repositório](https://github.com/daformat/react-headless-carousel) · último commit em 25.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### Appica UI

[P][C] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (@base-ui/react, embla, motion)

- **Peças:**
  - `carrosséis`: com os plugins accessibility, fade, auto-height e wheel-gestures do Embla
- **Por quê:** Carrosséis acessíveis e com esmaecimento, já sobre o Base UI.
- **Cuidados:** Oito arquivos de rolagem: só no Completo; 62 tratam o movimento reduzido.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/appica-dev/appica-ui) · [site](https://appica.dev/ui) · último commit em 12.10.2026 · aviso: «Copyright (c) 2026 Appica UI» · inventário: `inventario/blocos-e-primitivos.md`

### Blossom Carousel

[P][C] · Apache-2.0 · LIBERADO · pacote npm · dependência nova: **sim** (nenhuma (@blossom-carousel/core, /react, /web))

- **Peças:**
  - `blossom-carousel`: carrossel nativo com scroll-snap, arrasto por ponteiro, pontos e setas
- **Por quê:** Galeria de deslizar sobre a rolagem do navegador, leve e acessível.
- **Cuidados:** Conferir o arrasto com movimento reduzido; os package.json dizem MIT, vale o LICENSE Apache-2.0.
- **Trazer:** `npm install @blossom-carousel/react`
- **Origem:** [repositório](https://github.com/jespervos/blossom-carousel) · último commit em 10.10.2026 · inventário: `inventario/conferencia-e-lacunas.md`

### carouselcn

[P][C] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, Radix, embla)

- **Peças:**
  - `variações de carrossel sobre o Embla`: o mesmo do shadcn
- **Por quê:** Carrosséis sobre o Embla para dar trilho à galeria.
- **Cuidados:** Nenhum arquivo trata movimento reduzido: envolver em MotionConfig. A nota não traz nomes de item.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/mnove/carouselcn) · [site](https://github.com/mnove/carouselcn) · último commit em 11.10.2026 · aviso: «Copyright (c) 2026 Marcello Novelli» · inventário: `inventario/registros-shadcn.md`

### Cover Flow Showcase

[P][C] · MIT · LIBERADO · cópia do repositório · dependência nova: não (React)

- **Peças:**
  - `cover-flow-showcase`: Cover Flow com palco de vidro líquido, reflexos e encaixe suave
- **Por quê:** Vitrine de trabalhos em profundidade, com reflexo.
- **Cuidados:** Navega pela roda do mouse: garantir teclado; MR 0; aviso sem titular nomeado.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/opc8838-hub/cover-flow-showcase) · [site](https://opc8838-hub.github.io/cover-flow-showcase/) · último commit em 12.07.2026 · aviso: «© 2026» · inventário: `inventario/conferencia-e-lacunas.md`

### egjs Flicking

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@egjs/*, @cfcs/*)

- **Peças:**
  - `Parallax`: profundidade dentro do carrossel
  - `Fade`: esmaecimento
  - `AutoPlay`: avanço sozinho
  - `react-flicking`: carrossel com física (Naver)
- **Por quê:** Carrossel com profundidade interna, sem depender da rolagem da página.
- **Cuidados:** Manter o NOTICE; o Embla é mais leve; AutoPlay pede pausa (WCAG 2.2.2). Pesado (41 KB gz); não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install @egjs/react-flicking@4.17.1`
- **Origem:** [repositório](https://github.com/naver/egjs-flicking) · [site](https://naver.github.io/egjs-flicking) · último commit em 30.09.2026 · aviso: «Copyright (c) 2015-present NAVER Corp.» · inventário: `inventario/pacotes-de-efeito.md`; `inventario/blocos-e-primitivos.md`

### Embla Carousel

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim**

- **Peças:**
  - `embla-carousel-react`: carrossel, base do Carousel do shadcn
- **Por quê:** O trilho de deslizar leve sobre o qual se constrói a galeria com matéria.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npm install embla-carousel-react@8.6.0`
- **Origem:** [repositório](https://github.com/davidjerleke/embla-carousel) · [site](https://embla-carousel.com) · inventário: `inventario/blocos-e-primitivos.md`

### Embla Carousel

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (embla-carousel-react)

- **Peças:**
  - `embla-carousel-react`: carrossel leve (7,1 KB), base do carrossel do shadcn
- **Por quê:** Galeria de deslizar que mantém o conteúdo como lista no HTML do servidor.
- **Cuidados:** Sem publicação há 18 meses, mas estável; sem ARIA por padrão; movimento reduzido por conta do site; nunca automático (M7). Tentar scroll-snap antes.
- **Trazer:** `npm install embla-carousel-react@8.6.0`
- **Origem:** último commit em 04.04.2025 · inventário: estudo de 12.10.2026

### glider-js

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (glider-js)

- **Peças:**
  - `glider-js`: carrossel leve com rolagem nativa
- **Por quê:** Trilho leve sobre rolagem nativa.
- **Cuidados:** Referência a CDN no código; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install glider-js@1.7.10`
- **Origem:** [repositório](https://github.com/NickPiscitelli/Glider.js) · último commit em 06.05.2026 · inventário: `inventario/pacotes-de-efeito.md`

### Lightswind UI

[P][C] · MIT · LIBERADO (com exclusões) · cópia do repositório · dependência nova: **sim** (motion, GSAP, three, @react-three/fiber, ogl)

- **Peças:**
  - `3d-image-ring`: anel de imagens 3D
  - `3d-image-carousel`: carrossel 3D
  - `3d-hover-gallery`: galeria 3D no hover
  - `chain-carousel`: carrossel em corrente
  - `glass-coin-carousel`: carrossel de moedas de vidro
  - `glass-folder`: pasta de vidro
- **Por quê:** Carrosséis 3D com vidro e moeda.
- **Cuidados:** Excluídos: plasma-globe e os fundos wave, smokey, shader, satin-flow, reflect, nebula-flow e quantum-field (Shadertoy). Movimento reduzido em 4 de 227.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/codewithMUHILAN/Lightswind-UI-Library) · [site](https://lightswind.com) · último commit em 24.07.2026 · aviso: «Copyright (c) 2025 Muhilan (codewithMUHILAN) — Lightswind UI» · inventário: `inventario/registros-shadcn.md`

### nuka-carousel

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (nuka-carousel)

- **Peças:**
  - `nuka-carousel`: carrossel acessível (Formidable)
- **Por quê:** Carrossel acessível com movimento reduzido.
- **Cuidados:** Última versão em 01/2025, madura.
- **Trazer:** `npm install nuka-carousel@8.2.0`
- **Origem:** [repositório](https://github.com/FormidableLabs/nuka-carousel) · último commit em 27.01.2025 · inventário: `inventario/pacotes-de-efeito.md`

### pure-react-carousel

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (pure-react-carousel)

- **Peças:**
  - `pure-react-carousel`: carrossel acessível e sem estilo
- **Por quê:** Trilho acessível para vestir à marca.
- **Cuidados:** Não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install pure-react-carousel@1.35.0`
- **Origem:** [repositório](https://github.com/express-labs/pure-react-carousel) · último commit em 24.12.2025 · inventário: `inventario/pacotes-de-efeito.md`

### react-simply-carousel

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-simply-carousel)

- **Peças:**
  - `react-simply-carousel`: carrossel controlado com SSR
- **Por quê:** Carrossel controlado que renderiza no servidor.
- **Cuidados:** Não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install react-simply-carousel@10.0.5`
- **Origem:** [repositório](https://github.com/vadymshymko/react-simply-carousel) · último commit em 01.08.2026 · inventário: `inventario/pacotes-de-efeito.md`

### ScrollBooster

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim**

- **Peças:**
  - `scrollbooster`: arrasto com inércia e retorno elástico
- **Por quê:** O gesto de arrastar galeria e mapa.
- **Cuidados:** Só no contêiner, nunca na página (Lenis vetado).
- **Trazer:** `npm install scrollbooster`
- **Origem:** [repositório](https://github.com/ilyashubin/scrollbooster) · [site](https://ilyashubin.github.io/scrollbooster/) · último commit em 09.10.2026 · aviso: «© 2018 Ilya Shubin» · inventário: `inventario/conferencia-e-lacunas.md`

### smooothy

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (smooothy)

- **Peças:**
  - `smooothy`: slider minúsculo e fluido
- **Por quê:** Arrasto fluido de nível premiado, só dentro do trilho.
- **Cuidados:** Inércia só no slider, nunca na página; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install smooothy@0.0.35`
- **Origem:** [repositório](https://github.com/vallafederico/smooothy) · último commit em 04.02.2026 · inventário: `inventario/pacotes-de-efeito.md`

### swiffy-slider

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (swiffy-slider)

- **Peças:**
  - `swiffy-slider`: slider sobre scroll-snap nativo, quase só CSS
- **Por quê:** Trilho nativo e leve, com movimento reduzido.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npm install swiffy-slider@2.1.2`
- **Origem:** [repositório](https://github.com/dynamicweb/swiffy-slider) · último commit em 14.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### swiper

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (swiper)

- **Peças:**
  - `swiper`: carrossel completo (fade, creative)
- **Por quê:** O carrossel mais completo, quando o Embla não basta.
- **Cuidados:** Sem movimento reduzido; efeitos 3D (cube, coverflow) são de catálogo; estética própria a desfazer.
- **Trazer:** `npm install swiper@14.3.0`
- **Origem:** [repositório](https://github.com/nolimits4web/Swiper) · último commit em 28.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### Viscose Carousel

[C] · MIT · LIBERADO (com exclusões) · demo para refazer · dependência nova: **sim** (three, GSAP, lil-gui)

- **Peças:**
  - `viscose`: cartões que se fundem e viram fios
- **Por quê:** Roda de trabalhos com matéria viscosa.
- **Cuidados:** Excluída a fonte PP Neue Montreal; tirar lil-gui.
- **Trazer:** estudar e refazer: https://viscose-carousel.vercel.app
- **Origem:** [repositório](https://github.com/yousuf-developer/viscose-carousel) · [site](https://viscose-carousel.vercel.app) · último commit em 12.10.2026 · aviso: «© 2026 Yousuf Soomro» · inventário: `inventario/conferencia-e-lacunas.md`

---

## 9. Navegação, abas, menu e transição de página

A navegação, as abas, o menu e a troca de página (`../esteira/09-movimento.md`, seção 8; `../esteira/13-tecnologia-e-estrutura.md`, seção 3.7). O menu de tela cheia como cena e a transição com a assinatura são do Completo.

### Transition Kit (shadcn-labs) ★

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, Radix)

- **Peças:**
  - `page/flip`: página que vira
  - `page/curtain`: cortina entre páginas
  - `page/fold`: página que dobra
  - `page/book-flip`: virada de livro
  - `page/blur`: troca por desfoque
  - `theme/circle-reveal`: troca de tema em círculo
  - `ui/number-flip`: número que vira
  - `ui/product-gallery`: galeria de produto [P]
- **Por quê:** Transição entre páginas sobre View Transitions, que degrada sozinha e dá à navegação um gesto da marca.
- **Cuidados:** page/glitch e os heart/star-reveal são truque de catálogo. Registro fora do índice oficial: copiar do repositório.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/shadcn-labs/transition-kit) · [site](https://transition-kit.space) · último commit em 12.10.2026 · aviso: «Copyright (c) 2026 Shadcn Labs» · inventário: `inventario/registros-shadcn.md`

### View Transitions ★

[todos] · — · LIBERADO · técnica nativa · dependência nova: não

- **Peças:**
  - `view-transition-name`: objeto da marca que muda de forma entre páginas
  - `@view-transition { navigation: auto; }`: transição entre documentos
- **Por quê:** Transição de página sem dependência, que degrada para a troca instantânea.
- **Cuidados:** Mesma página: Chrome 111+, Safari 18.0+, Firefox 144+ (Baseline desde 16/10/2025); entre documentos: Chrome 126+, Safari 18.2+, sem Firefox. O <ViewTransition> do Next é experimental e saiu da base em 02.11.2026: a captura reprova os 60 quadros no celular (`esteira/15-desempenho.md`, seção 5.15); toda transição desta linha passa pela régua dos quadros.
- **Trazer:** sem instalação: CSS ou API do navegador
- **Origem:** [site](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using) · inventário: estudo de 12.10.2026

### View Transitions demos (Bramus) ★

[todos] · Apache-2.0 · LIBERADO · técnica nativa · dependência nova: não

- **Peças:**
  - `view-transitions-demos`: transição entre documentos e morph de elemento entre páginas
- **Por quê:** Transição de página nativa e sem custo, que pode levar a assinatura da marca.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** estudar e refazer: https://github.com/bramus/view-transitions-demos
- **Origem:** [repositório](https://github.com/bramus/view-transitions-demos) · [site](https://view-transitions.chrome.dev) · último commit em 17.08.2026 · inventário: `inventario/colecoes-e-demos.md`

### Animate UI

[todos] · MIT + Commons Clause · **CONDICIONAL**, só no repositório do cliente · registro shadcn · dependência nova: **sim** (motion, ogl, Radix, Base UI)

- **Peças:**
  - `components-animate-tabs`: abas animadas
  - `components-animate-tooltip`: dica animada
- **Por quê:** Abas e dicas com mola.
- **Cuidados:** Só no repositório do cliente; parado desde 31/12/2025; package.json PROPRIETARY; movimento reduzido em 3 de 387.
- **Trazer:** `npx shadcn@4.21.0 add @animate-ui/components-animate-tabs --dry-run`
- **Origem:** [repositório](https://github.com/imskyleen/animate-ui) · [site](https://animate-ui.com) · último commit em 31.12.2025 · aviso: «Copyright (c) 2025 Elliot Sutton» · inventário: `inventario/registros-shadcn.md`

### bloom-menu

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (bloom-menu)

- **Peças:**
  - `bloom-menu`: menu que se transforma com fluidez
- **Por quê:** Menu que nasce do gatilho, com movimento reduzido.
- **Cuidados:** Versão 0.1.0; envolver em componente cliente.
- **Trazer:** `npm install bloom-menu@0.1.0`
- **Origem:** [repositório](https://github.com/joshpuckett/bloom) · último commit em 08.01.2026 · inventário: `inventario/pacotes-de-efeito.md`

### DevClub UI

[todos] · MIT · LIBERADO (com exclusões) · cópia do repositório · dependência nova: **sim** (motion, GSAP, three, @react-three/fiber, ogl, Radix)

- **Peças:**
  - `curtain-navbar`: menu em cortina [C]
  - `confirm-morph`: confirmação que se transforma
  - `animated-counter`: contador [C]
- **Por quê:** Menu que abre como cortina.
- **Cuidados:** Excluído: dither.tsx (Grainient do React Bits). matrix-clock e sparkle-button fora.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/devclub-nstru/component_library) · [site](https://ui.devclubxnst.online) · último commit em 12.10.2026 · aviso: «Copyright (c) 2026 DevClub (devclubnst / dev-club-components)» · inventário: `inventario/registros-shadcn.md`

### Great UI

[todos] · licença própria · **CONDICIONAL**, só no repositório do cliente · cópia do repositório · dependência nova: não (motion)

- **Peças:**
  - `CurtainPageTransition`: transição de página em cortina
  - `VenetianBlindsPageTransition`: transição em persiana
  - `CascadePageTransition`: transição em cascata
  - `ColorWipePageTransition`: transição por varredura de cor
  - `CrossBlurPageTransition`: transição por desfoque cruzado
  - `FrostedGlassReveal`: revelação em vidro fosco
  - `ImageHoverReveal`: revelação de imagem no hover
  - `PageTransitionShader`: transição de página em shader [C]
- **Por quê:** Boa fonte de transição de página, o momento que pode levar a assinatura da marca.
- **Cuidados:** Serve ao repositório do cliente, nunca ao kit; o AceternityButton sugere peça derivada e fica fora. Movimento reduzido baixo (6 arquivos): conferir peça a peça.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/Saurabh-2607/GreatUI) · último commit em 06.10.2026 · inventário: `inventario/colecoes-e-demos.md`

### next-transition-router

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (next-transition-router)

- **Peças:**
  - `next-transition-router`: transição de página no App Router, com saída e entrada
- **Por quê:** Transição entre páginas com saída coreografada, sobre o Motion.
- **Cuidados:** Transição com a assinatura é do Completo [C]; tratar movimento reduzido.
- **Trazer:** `npm install next-transition-router@0.2.11`
- **Origem:** [site](https://www.npmjs.com/package/next-transition-router) · último commit em 02.06.2025 · inventário: `inventario/pacotes-de-efeito.md`

### SSGOI

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@ssgoi/react)

- **Peças:**
  - `@ssgoi/react/nextjs`: transição de página sobre a Web Animations API
- **Por quê:** Transição de página sobre a Web Animations API, se a entrada por CSS da base não bastar.
- **Cuidados:** Projeto jovem, sem versões no GitHub; versão de 07/10/2026 (esperar os 7 dias do kit). Peso e movimento reduzido não documentados; concorre com a entrada por CSS da base, e passa pela régua dos quadros antes de ficar.
- **Trazer:** `npm install @ssgoi/react@7.4.1`
- **Origem:** [repositório](https://github.com/meursyphus/ssgoi) · [site](https://ssgoi.dev) · último commit em 07.10.2026 · inventário: estudo de 12.10.2026

### systaliko-ui

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, Radix, Base UI, React Aria)

- **Peças:**
  - `full-screen-navigation-menu`: menu de tela cheia [C]
  - `animated-menu`: menu animado
  - `card-curtain-reveal`: cortina no cartão
  - `card-flip`: cartão que vira [P]
  - `timeline`: linha do tempo
- **Por quê:** Menu de tela cheia como cena.
- **Cuidados:** 13 arquivos ligados à rolagem só no Completo; movimento reduzido em 7 de 53.
- **Trazer:** `npx shadcn@4.21.0 add @systaliko-ui/full-screen-navigation-menu --dry-run`
- **Origem:** [repositório](https://github.com/YoucefBnm/systaliko-ui) · [site](https://systaliko-ui.vercel.app) · último commit em 31.08.2026 · aviso: «Copyright (c) 2025 Youcef Benmessabih» · inventário: `inventario/registros-shadcn.md`

### Transitions.dev

[todos] · licença própria · **CONDICIONAL**, só no repositório do cliente · cópia do repositório · dependência nova: não (motion)

- **Peças:**
  - `transições de interface`: em CSS e React, com skills para agentes
- **Por quê:** Transições de interface do autor do metal-fx.
- **Cuidados:** Permite projetos comerciais; o kit, como gerador, exige plano pago e o comentário em cada transição.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/Jakubantalik/transitions.dev) · [site](https://transitions.dev) · último commit em 12.10.2026 · inventário: `inventario/registros-shadcn.md`

### tween-ui

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (GSAP)

- **Peças:**
  - `sliding-tabs`: abas com fundo que desliza
  - `faq-accordion`: perguntas frequentes
  - `avatar-reveal`: revelação de retrato
  - `flip-card`: cartão que vira [P]
  - `number-counter`: contador [C]
- **Por quê:** Abas e acordeão com gesto em GSAP.
- **Cuidados:** 27 arquivos ligados à rolagem só no Completo; magnetic-button vetado.
- **Trazer:** `npx shadcn@4.21.0 add @tween-ui/sliding-tabs --dry-run`
- **Origem:** [repositório](https://github.com/StaticMania/tween-ui) · [site](https://tween-ui.vercel.app) · último commit em 12.10.2026 · aviso: «Copyright (c) 2026 StaticMania» · inventário: `inventario/registros-shadcn.md`

### View Transitions Toolkit

[todos] · Apache-2.0 · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - detecção e tipos automáticos de transição
- **Por quê:** Transição entre páginas nativa.
- **Cuidados:** MR 1; não é produto oficial.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/GoogleChromeLabs/view-transitions-toolkit) · [site](https://chrome.dev/view-transitions-toolkit) · último commit em 02.04.2026 · inventário: `inventario/conferencia-e-lacunas.md`

### @bprogress/next

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@bprogress/next)

- **Peças:**
  - `bprogress`: barra de progresso da navegação para o Next
- **Por quê:** Alternativa à barra de navegação.
- **Cuidados:** Não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install @bprogress/next@3.2.12`
- **Origem:** [repositório](https://github.com/imskyleen/bprogress) · último commit em 14.04.2025 · inventário: `inventario/pacotes-de-efeito.md`

### nextjs-toploader

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (nextjs-toploader)

- **Peças:**
  - `nextjs-toploader`: barra de progresso da navegação no topo
- **Por quê:** Espera visível entre páginas.
- **Cuidados:** Não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install nextjs-toploader@3.9.17`
- **Origem:** [repositório](https://github.com/TheSGJ/nextjs-toploader) · último commit em 09.09.2025 · inventário: `inventario/pacotes-de-efeito.md`

---

## 10. Gaveta, diálogo, aviso, formulário e espera

O que abre por cima e o que responde à espera: a gaveta, o diálogo, o aviso, o campo de código, o esqueleto. O Base UI, da pilha, cobre a maior parte sem dependência nova.

### Base UI 1.9 ★

[todos] · MIT · LIBERADO · pacote npm · dependência nova: não (nenhuma (já na base))

- **Peças:**
  - `drawer`: gaveta com arrasto
  - `toast`: aviso empilhado [P]
  - `otp-field`: campo de código
  - `combobox`: busca com lista
  - `preview-card`: prévia ao passar
  - `navigation-menu`: menu com painel
  - `number-field`: campo numérico
  - `meter`: medidor
- **Por quê:** Gaveta, aviso, código e prévia sem dependência nova, no lugar do Vaul, do Sonner e do input-otp.
- **Cuidados:** Já está na base: conferir se a versão é a 1.9.0, que exporta drawer, toast, otp-field e preview-card; sem estilo, o acabamento vem da marca.
- **Trazer:** `npm install @base-ui/react@1.9.0`
- **Origem:** [repositório](https://github.com/mui/base-ui) · [site](https://base-ui.com) · último commit em 12.10.2026 · aviso: «Copyright (c) 2019 Material-UI SAS» · inventário: `inventario/blocos-e-primitivos.md`

### tw-shimmer ★

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (tw-shimmer)

- **Peças:**
  - `tw-shimmer`: brilho de esqueleto em Tailwind 4
- **Por quê:** O esqueleto que a regra 4 pede, em CSS e com movimento reduzido.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npm install tw-shimmer@0.4.13`
- **Origem:** [repositório](https://github.com/assistant-ui/assistant-ui) · último commit em 11.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### Blode UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (@base-ui/react, embla, motion)

- **Peças:**
  - `Responsive Dialog`: diálogo na mesa e gaveta no celular
  - `Share Sheet`: folha de compartilhar
  - `Scroll Area`: área de rolagem
  - `Carousel`: carrossel [P]
- **Por quê:** O padrão diálogo na mesa e gaveta no celular, sobre o Base UI, sem o Vaul.
- **Cuidados:** Embla é dependência nova; 39 arquivos tratam o movimento reduzido.
- **Trazer:** `npx shadcn@4.21.0 add @blode/responsive-dialog --dry-run`
- **Origem:** [repositório](https://github.com/mblode/ui) · [site](https://blode.co/ui) · último commit em 11.10.2026 · aviso: «Copyright (c) blode.co» · inventário: `inventario/blocos-e-primitivos.md`

### Boneyard

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (boneyard-js (depende do playwright))

- **Peças:**
  - `boneyard-js`: esqueleto de carregamento gerado do layout real, por captura
- **Por quê:** Esqueleto fiel à página real, a regra 4.
- **Cuidados:** Gerar no desenvolvimento e versionar o resultado: o Playwright não vai à produção do cliente. Exemplos com Unsplash.
- **Trazer:** `npm install boneyard-js`
- **Origem:** [repositório](https://github.com/0xGF/boneyard) · [site](https://boneyard.vercel.app/) · último commit em 31.08.2026 · aviso: «© 2025 0xGF» · inventário: `inventario/conferencia-e-lacunas.md`

### coss ui (pastas MIT)

[todos] · MIT · LIBERADO (com exclusões) · registro shadcn · dependência nova: não (@base-ui/react)

- **Peças:**
  - `primitivos`: 50+ controles sobre Base UI, úteis em formulário
- **Por quê:** Controles acessíveis sobre Base UI, coerentes com o base-nova do kit.
- **Cuidados:** Só apps/origin/ e apps/ui/ são MIT; o resto do repositório é AGPL-3.0. Base UI além do Sheet pede medição.
- **Trazer:** `npx shadcn@4.21.0 add @coss/<item> --dry-run`
- **Origem:** [repositório](https://github.com/cosscom/ui) · [site](https://coss.com/ui) · último commit em 12.10.2026 · inventário: estudo de 12.10.2026

### creatorem/ui

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion)

- **Peças:**
  - `Motion Dialog`: diálogo que imita o comportamento nativo
  - `QRCode`: código QR
  - `Tour`: tour guiado
  - `Stepper`: etapas
- **Por quê:** Diálogo com comportamento nativo e QR, o que falta no shadcn.
- **Cuidados:** Nenhum arquivo trata movimento reduzido: envolver em MotionConfig.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/creatorem/ui) · [site](https://github.com/creatorem/ui) · último commit em 23.07.2026 · aviso: «Copyright (c) 2025 Creatorem» · inventário: `inventario/registros-shadcn.md`

### goey-toast

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (motion, sonner)

- **Peças:**
  - `goey-toast`: aviso que se funde e se transforma, sobre o Sonner
  - `goey-toast`: aviso que se deforma como gosma, sobre Sonner
- **Por quê:** Aviso com gesto líquido.
- **Cuidados:** Só 4 arquivos com movimento reduzido; a nota não dá a versão npm.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/anl331/goey-toast) · [site](https://goey-toast.vercel.app) · último commit em 05.09.2026 · aviso: «Copyright (c) 2026» · inventário: `inventario/registros-shadcn.md`; `inventario/pacotes-de-efeito.md`

### gooseui

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, Radix)

- **Peças:**
  - `morphing-dialog`: diálogo que se transforma
  - `custom-toast`: aviso personalizado
- **Por quê:** Diálogo e aviso com gesto.
- **Cuidados:** border-beam fora; parado há cerca de 6 meses.
- **Trazer:** `npx shadcn@4.21.0 add @gooseui/morphing-dialog --dry-run`
- **Origem:** [repositório](https://github.com/goosen-x/gooseui) · [site](https://gooseui.pro) · último commit em 26.03.2026 · aviso: «Copyright (c) 2024 GooseUI» · inventário: `inventario/registros-shadcn.md`

### Interior

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion)

- **Peças:**
  - `inline-validation`: validação no campo
  - `skeleton-swap`: esqueleto que troca
  - `icon-morph`: ícone que se transforma
  - `ripple`: ondulação no toque
  - `password-strength`: força da senha
- **Por quê:** Microinterações de formulário com movimento reduzido em todos os arquivos.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npx shadcn@4.21.0 add @interior/inline-validation --dry-run`
- **Origem:** [repositório](https://github.com/ddoemonn/interior) · [site](https://www.interior.dev) · último commit em 10.09.2026 · aviso: «Copyright (c) 2026 ozzy» · inventário: `inventario/registros-shadcn.md`

### ios-haptics

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (ios-haptics)

- **Peças:**
  - `ios-haptics`: vibração tátil no Safari do iOS
- **Por quê:** Tato no iPhone pelo truque do switch nativo.
- **Cuidados:** Só em ação do visitante.
- **Trazer:** `npm install ios-haptics@3.2.0`
- **Origem:** [repositório](https://github.com/tijnjh/ios-haptics) · último commit em 22.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### Jelly UI

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (nenhuma (web components))

- **Peças:**
  - `jelly-ui`: campos de formulário nativos macios e táteis, com teclado
- **Por quê:** Formulário tátil com bom movimento reduzido (MR 41).
- **Cuidados:** Web components no React pedem cuidado com a renderização no servidor.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/jelly-org/ui) · [site](https://jelly-ui.com) · último commit em 30.09.2026 · aviso: «© 2026 bmson» · inventário: `inventario/conferencia-e-lacunas.md`

### loadercn

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (Base UI)

- **Peças:**
  - `grid-wave`: espera em onda
  - `grid-ripple`: espera em ondulação
  - `grid-flip`: espera que vira
  - `orbit-atom`: espera orbital
- **Por quê:** Estados de espera com movimento reduzido em 90 arquivos.
- **Cuidados:** orbit-particle-globe é catálogo.
- **Trazer:** `npx shadcn@4.21.0 add @loadercn/grid-wave --dry-run`
- **Origem:** [repositório](https://github.com/mnove/loadercn) · [site](https://loadercn.vercel.app) · último commit em 10.10.2026 · aviso: «Copyright (c) 2026 Marcello Novelli» · inventário: `inventario/registros-shadcn.md`

### phantom-ui

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@aejkatappaja/phantom-ui)

- **Peças:**
  - `phantom-ui`: esqueleto que mede o DOM real
  - `phantom-ui`: esqueleto que lê a estrutura da página
- **Por quê:** Esqueleto fiel à página, que atende à regra 4 sem desenhar cada estado à mão.
- **Cuidados:** Adaptar à marca e medir. Web component novo; medir.
- **Trazer:** `npm install @aejkatappaja/phantom-ui@1.6.1`
- **Origem:** [repositório](https://github.com/Aejkatappaja/phantom-ui) · último commit em 01.08.2026 · inventário: `inventario/colecoes-e-demos.md`; `inventario/pacotes-de-efeito.md`

### pure-web-bottom-sheet

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim**

- **Peças:**
  - `pure-web-bottom-sheet/react`: folha inferior sobre scroll snap do CSS, com pontos de parada
- **Por quê:** A folha inferior mais leve, com o gesto nativo da rolagem, para menu e detalhe no celular.
- **Cuidados:** A animação ligada à rolagem é a de dentro da folha, não a da página; conferir o movimento reduzido; peso não medido.
- **Trazer:** `npm install pure-web-bottom-sheet@1.1.1`
- **Origem:** [repositório](https://github.com/viliket/pure-web-bottom-sheet) · último commit em 09.10.2026 · aviso: «Copyright (c) 2025 Vili Ketonen» · inventário: `inventario/blocos-e-primitivos.md`

### Rare UI

[todos] · MIT + Commons Clause · **CONDICIONAL**, só no repositório do cliente · cópia do repositório · dependência nova: **sim** (motion, Radix)

- **Peças:**
  - `family-drawer`: gaveta que se transforma
  - `grid-reveal`: revelação em grade
  - `animated-counter`: contador [C]
- **Por quê:** Gaveta no estilo Family, bem resolvida.
- **Cuidados:** Só no repositório do cliente; matrix-orb é catálogo.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/swamimalode07/rare-ui) · [site](https://rareui.in) · último commit em 13.10.2026 · aviso: «Copyright (c) 2026 Swami Malode» · inventário: `inventario/registros-shadcn.md`

### React Aria Components

[todos] · Apache-2.0 · LIBERADO · pacote npm · dependência nova: **sim** (react-aria, react-stately, @internationalized/date)

- **Peças:**
  - `@internationalized/date`: datas e calendários internacionalizados
  - `starters/tailwind`: componentes estilizados em Tailwind
  - `base aria do shadcn`: a terceira base oficial
- **Por quê:** Acrescenta o que o Base UI não exporta: datas e calendários internacionalizados, com a acessibilidade mais rigorosa.
- **Cuidados:** Manter o LICENSE e o NOTICE; usar só onde o Base UI não alcança, para não dobrar primitivos.
- **Trazer:** `npm install react-aria-components@1.22.1`
- **Origem:** [repositório](https://github.com/adobe/react-spectrum) · [site](https://react-spectrum.adobe.com) · último commit em 12.10.2026 · inventário: `inventario/blocos-e-primitivos.md`

### React Wheel Picker (chanhdai)

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (motion, Radix)

- **Peças:**
  - `react-wheel-picker`: seletor em roda estilo iOS com inércia e laço infinito
  - `WheelPicker`: roda de seleção ao estilo iOS
- **Por quê:** Seletor de horário e data com gesto nativo, bom para a Agenda.
- **Cuidados:** Nenhum arquivo trata movimento reduzido: envolver em MotionConfig. A inércia é só dentro do seletor; conferir importações ao copiar e o movimento reduzido.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/ncdai/react-wheel-picker) · [site](https://react-wheel-picker.chanhdai.com) · último commit em 01.09.2026 · aviso: «Copyright (c) 2025 ncdai» · inventário: `inventario/registros-shadcn.md`; `inventario/blocos-e-primitivos.md`

### react-content-loader

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-content-loader)

- **Peças:**
  - `react-content-loader`: esqueleto em SVG
- **Por quê:** Esqueleto com a forma exata do conteúdo.
- **Cuidados:** Não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install react-content-loader@7.1.2`
- **Origem:** [repositório](https://github.com/danilowoz/react-content-loader) · último commit em 22.01.2026 · inventário: `inventario/pacotes-de-efeito.md`

### react-day-picker

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (date-fns, @date-fns/tz)

- **Peças:**
  - `DayPicker`: calendário, base do Calendar do shadcn
- **Por quê:** O calendário da Agenda, módulo vendido em qualquer plano.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npm install react-day-picker@10.0.2`
- **Origem:** [repositório](https://github.com/gpbl/react-day-picker) · [site](https://daypicker.dev) · último commit em 30.09.2026 · aviso: «Copyright (c) 2014-2026 Giampaolo Bellavite» · inventário: `inventario/blocos-e-primitivos.md`

### react-loading-skeleton

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-loading-skeleton)

- **Peças:**
  - `react-loading-skeleton`: esqueleto que se adapta ao conteúdo
- **Por quê:** Esqueleto maduro com movimento reduzido.
- **Cuidados:** Parado desde 09/2024, maduro.
- **Trazer:** `npm install react-loading-skeleton@3.5.0`
- **Origem:** [repositório](https://github.com/dvtng/react-loading-skeleton) · último commit em 21.09.2024 · inventário: `inventario/pacotes-de-efeito.md`

### react-modal-sheet

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (motion, react-use-measure)

- **Peças:**
  - `Sheet`: folha inferior com pontos de parada
- **Por quê:** Folha inferior com arrasto sobre o motion da pilha.
- **Cuidados:** Só 1 arquivo trata o movimento reduzido: garantir que nada desliza com ele.
- **Trazer:** `npm install react-modal-sheet@5.6.0`
- **Origem:** [repositório](https://github.com/Temzasse/react-modal-sheet) · último commit em 27.03.2026 · aviso: «Copyright (c) 2020 Teemu Taskula» · inventário: `inventario/blocos-e-primitivos.md`

### Schedule-X

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@schedule-x/*)

- **Peças:**
  - `calendário`: dia, semana, mês, tema shadcn
- **Por quê:** Interface do módulo de Agenda.
- **Cuidados:** Os extras pagos ficam fora.
- **Trazer:** `npm install @schedule-x/react`
- **Origem:** [repositório](https://github.com/schedule-x/schedule-x) · [site](https://schedule-x.dev) · último commit em 06.10.2026 · aviso: «© 2023 Tom Österlund» · inventário: `inventario/conferencia-e-lacunas.md`

### sureui

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (Base UI)

- **Peças:**
  - `confirm-button`: botão de confirmação
  - `confirm-switch`: interruptor com confirmação
  - `confirm-dialog`: diálogo de confirmação
  - `confirm-popover`: confirmação em balão
- **Por quê:** Confirmação bem resolvida sobre Base UI.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npx shadcn@4.21.0 add @sureui/confirm-dialog --dry-run`
- **Origem:** [repositório](https://github.com/aidankmcalister/sureui) · [site](https://sureui.com) · último commit em 05.10.2026 · aviso: «Copyright (c) 2026 Aidan McAlister» · inventário: `inventario/registros-shadcn.md`

### Toldo

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (Radix Dialog, framer-motion)

- **Peças:**
  - `toldo`: diálogo elevado com empilhamento
- **Por quê:** Diálogo que se transforma.
- **Cuidados:** Conferir MR.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/raphaelsalaja/toldo) · [site](https://toldo.vercel.app) · último commit em 24.01.2026 · aviso: «© 2024 Raphael Salaja» · inventário: `inventario/conferencia-e-lacunas.md`

### web-haptics

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (web-haptics)

- **Peças:**
  - `web-haptics`: vibração tátil na web móvel (Android e iOS)
- **Por quê:** A resposta tátil que completa o premium no toque.
- **Cuidados:** Versão 0.0.6; só em ação do visitante.
- **Trazer:** `npm install web-haptics@0.0.6`
- **Origem:** [repositório](https://github.com/lochie/web-haptics) · último commit em 02.03.2026 · inventário: `inventario/pacotes-de-efeito.md`

### Loading

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (nenhuma (peer React))

- **Peças:**
  - `orbit`: órbita
  - `eclipse`: eclipse
  - `radar`: varredura
  - `morph`: forma que se transforma
- **Por quê:** A espera curta bem desenhada.
- **Cuidados:** Preferir esqueleto (regra 4); carregador decorativo é genérico.
- **Trazer:** `npm install loading-dev`
- **Origem:** [repositório](https://github.com/jakubkrehel/loading) · [site](https://loading.dev/) · último commit em 12.10.2026 · aviso: «© 2026 Jakub Krehel» · inventário: `inventario/conferencia-e-lacunas.md`

### react-hot-toast

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-hot-toast)

- **Peças:**
  - `react-hot-toast`: avisos leves
- **Por quê:** Aviso leve com movimento reduzido.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npm install react-hot-toast@2.6.1`
- **Origem:** [repositório](https://github.com/timolins/react-hot-toast) · último commit em 16.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### sileo

[P][C] · MIT · LIBERADO (decl.), fora do kit · pacote npm · dependência nova: **sim** (sileo)

- **Peças:**
  - `sileo`: avisos com física e morph em SVG, sobre o Motion
- **Por quê:** Aviso com física e matéria, sobre o motor do kit.
- **Cuidados:** Licença só declarada no npm; trata movimento reduzido.
- **Trazer:** `npm install sileo@0.1.5`
- **Origem:** [repositório](https://github.com/hiaaryan/sileo) · último commit em 22.02.2026 · inventário: `inventario/pacotes-de-efeito.md`

### sonner

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (sonner)

- **Peças:**
  - `sonner`: avisos (toast) do shadcn
- **Por quê:** O aviso de referência, já usado pelo shadcn, com movimento reduzido.
- **Cuidados:** Escreve leiaute; adaptar à marca.
- **Trazer:** `npm install sonner@2.0.8`
- **Origem:** [repositório](https://github.com/emilkowalski/sonner) · último commit em 09.08.2026 · inventário: `inventario/pacotes-de-efeito.md`

---

## 11. Fundo vivo e campo de cor

O campo de cor da marca, vivo (`../esteira/19-o-padrao-atlas.md`, seção 5). O degradê em CSS é de todo plano; o shader e a malha em WebGL, só do Completo, com a reserva estática, a pausa e a barreira do travamento.

### @mesh-gradient/core ★

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@mesh-gradient/core)

- **Peças:**
  - `mesh-gradient`: malha de cor ao estilo do SwiftUI
- **Por quê:** O campo de cor vivo do padrão Atlas, leve e com movimento reduzido.
- **Cuidados:** WebGL só no Completo; nos outros planos, o campo em CSS.
- **Trazer:** `npm install @mesh-gradient/core@2.0.2`
- **Origem:** [repositório](https://github.com/mikhailmogilnikov/mesh-gradient) · último commit em 05.05.2026 · inventário: `inventario/pacotes-de-efeito.md`

### hazeglow ★

[C] · MIT · LIBERADO · registro shadcn · dependência nova: não

- **Peças:**
  - `gradient-hero`: capa com degradê granulado WebGL2
  - `gradient-cta`: chamada com degradê granulado
  - `gradient-card`: cartão com degradê granulado
  - `hazeglow`: degradês com grão e malha de cor (WebGL2)
- **Por quê:** Grão e luz em WebGL2 sem dependência: matéria de luxo para o campo de cor.
- **Cuidados:** WebGL só no Completo, com imagem estática de reserva; movimento reduzido citado em um arquivo só.
- **Trazer:** `npx shadcn@4.21.0 add @hazeglow/gradient-hero --dry-run`
- **Origem:** [repositório](https://github.com/hazeglow/hazeglow) · [site](https://hazeglow.dev) · último commit em 09.10.2026 · aviso: «Copyright (c) 2026 Jakub Šalmík» · inventário: `inventario/registros-shadcn.md`; `inventario/pacotes-de-efeito.md`

### Paper Shaders ★

[C] · Apache-2.0 · LIBERADO · pacote npm · dependência nova: **sim** (@paper-design/shaders-react)

- **Peças:**
  - `MeshGradient`: malha de cor viva
  - `DotOrbit`: campo de pontos em órbita
  - `grain`: grão de matéria
- **Por quê:** Campo de cor vivo e grão em WebGL, sem dependência, na paleta da marca.
- **Cuidados:** Pré-1.0: travar a versão. Manter LICENSE e NOTICE; só no Completo, nas cinco condições do WebGL, com imagem de reserva e parado sob movimento reduzido; evitar degradê genérico (C4).
- **Trazer:** `npm install @paper-design/shaders-react@0.0.81`
- **Origem:** [repositório](https://github.com/paper-design/shaders) · último commit em 17.09.2026 · inventário: estudo de 12.10.2026

### shaders ★

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (shaders)

- **Peças:**
  - `shaders`: mais de 200 efeitos em WebGPU com reserva em WebGL: degradês, ruído, vidro, metal, luz, distorção
- **Por quê:** Campo de cor vivo e matéria em shader, com editor visual gratuito.
- **Cuidados:** Presets e seções Pro são pagos; o componente de texto chama o Google Fonts (vetado); não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install shaders@4.0.4`
- **Origem:** [repositório](https://github.com/shader-effects-inc/shaders) · último commit em 09.10.2026 · inventário: `inventario/pacotes-de-efeito.md`

### shaderscn ★

[C] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (@paper-design/shaders, Base UI)

- **Peças:**
  - `god-rays-hero`: capa com raios de luz
  - `dithering-hero`: capa pontilhada
  - `halftone-hero`: capa em meio-tom
  - `fluted-glass-app-download`: vidro canelado
  - `color-panels-newsletter`: painéis de cor
- **Por quê:** Seções sobre o Paper Shaders: o campo de cor vivo do Completo já pronto.
- **Cuidados:** WebGL só no Completo, com reserva estática. Seções servem de andaime, não de página pronta.
- **Trazer:** `npx shadcn@4.21.0 add @shaderscn/halftone-hero --dry-run`
- **Origem:** [repositório](https://github.com/mnove/shaderscn) · [site](https://www.shaderscn.com) · último commit em 12.10.2026 · aviso: «Copyright (c) 2026 Marcello Novelli» · inventário: `inventario/registros-shadcn.md`

### Aura

[todos] · MIT · LIBERADO · CSS · dependência nova: não (nenhuma (o gerador usa Next, html-to-image, @iconify/react))

- **Peças:**
  - `GrainOverlay`: grão sobre o degradê
  - `degradês ambientes`: camadas com modos de mistura do CSS
- **Por quê:** Campo de cor com luz ambiente e grão, exportado como CSS puro.
- **Cuidados:** É gerador: só o CSS vai ao site. Degradê só como luz da identidade (regra 3).
- **Trazer:** copiar o CSS exportado de https://auragradients.vercel.app
- **Origem:** [repositório](https://github.com/CristianOlivera1/aura) · [site](https://auragradients.vercel.app) · último commit em 16.08.2026 · aviso: «© 2026 CristianOlivera1» · inventário: `inventario/conferencia-e-lacunas.md`

### color-thief

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (nenhuma no navegador)

- **Peças:**
  - `color-thief`: extrai a cor dominante e a paleta de uma imagem
- **Por quê:** Tira o tom de cada foto para a luz ou o fundo da cena.
- **Cuidados:** Preferir rodar no build e gravar o resultado.
- **Trazer:** `npm install colorthief`
- **Origem:** [repositório](https://github.com/lokesh/color-thief) · [site](https://lokeshdhakar.com/projects/color-thief/) · último commit em 02.08.2026 · aviso: «© 2015 Lokesh Dhakar» · inventário: `inventario/conferencia-e-lacunas.md`

### Componentry

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, GSAP, three, @react-three/fiber, @paper-design/shaders, Base UI, Lenis)

- **Peças:**
  - `dithered-logo`: logotipo pontilhado [C]
  - `dither-prism-hero`: capa em prisma pontilhado [C]
  - `flipping-word-swap`: troca de palavra que vira
  - `case-study-flip-stack`: pilha de estudos de caso
- **Por quê:** Logotipo pontilhado como assinatura da capa.
- **Cuidados:** LICENSE MIT, mas package.json diz PROPRIETARY: confirmar antes do kit. Lenis em três arquivos; matrix-rain e particle-typography são catálogo.
- **Trazer:** `npx shadcn@4.21.0 add @componentry/dithered-logo --dry-run`
- **Origem:** [repositório](https://github.com/harshjdhv/componentry) · [site](https://componentry.fun) · último commit em 13.10.2026 · aviso: «Copyright (c) 2026 Harsh Jadhav» · inventário: `inventario/registros-shadcn.md`

### Pattern Craft

[todos] · MIT · LIBERADO · CSS · dependência nova: não

- **Peças:**
  - `padrões CSS`: tramas e degradês de fundo
- **Por quê:** Base para texturas de tecido e azulejo.
- **Cuidados:** Só se sair da matéria da marca.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/megh-bari/pattern-craft) · [site](https://patterncraft.store) · último commit em 02.09.2026 · aviso: «© 2025 Megh Bari» · inventário: `inventario/conferencia-e-lacunas.md`

### glsl-noise

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (glsl-noise)

- **Peças:**
  - `glsl-noise`: ruídos simplex e clássico para shader
- **Por quê:** Ruído com licença clara, no lugar de trecho do Shadertoy.
- **Cuidados:** Parado desde 2013, estável; usar com glslify.
- **Trazer:** `npm install glsl-noise@0.0.0`
- **Origem:** [repositório](https://github.com/hughsk/glsl-noise) · último commit em 27.09.2013 · inventário: `inventario/pacotes-de-efeito.md`

### Kam UI

[C] · MIT · LIBERADO (com exclusões) · cópia do repositório · dependência nova: **sim** (ogl)

- **Peças:**
  - `Radiant Veil`: véu radiante
  - `Chromatic Leaks`: vazamentos cromáticos
  - `Halo Ring`: anel de halo
  - `Crown Glow`: brilho de coroa
  - `Mesh Gradient`: malha de degradê
  - `Atmospheric Sky`: céu atmosférico
- **Por quê:** Luz e halo em WebGL para o campo de cor.
- **Cuidados:** Excluído: Milky Way (panorama ESA/Gaia em CC BY-SA). Black Hole é BSD-3 (manter o aviso). Parado há cerca de 6 meses.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/Ouranos27/kam-ui) · [site](https://ui.philippekam.dev) · último commit em 16.04.2026 · aviso: «Copyright (c) 2025 Philippe Kam» · inventário: `inventario/registros-shadcn.md`

### kawarp

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (nenhuma (@kawarp/core))

- **Peças:**
  - `kawarp`: fundo fluido em WebGL feito de uma imagem, à Apple Music
- **Por quê:** O fundo vivo nasce da foto do próprio negócio.
- **Cuidados:** Pausar à mão (MR 0); WebGL com reserva.
- **Trazer:** `npm install @kawarp/react`
- **Origem:** [repositório](https://github.com/better-lyrics/kawarp) · [site](https://kawarp.betterlyrics.org) · último commit em 29.09.2026 · aviso: «© 2026 Better Lyrics» · inventário: `inventario/conferencia-e-lacunas.md`

### Lazy UI

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (motion, GSAP, three, R3F, Radix)

- **Peças:**
  - `fluted-glass`: vidro canelado
  - `liquid-chrome`: cromo líquido
  - `horizon-glow`: brilho de horizonte
  - `chroma-flow`: fluxo de cor
- **Por quê:** Fundos de matéria (vidro canelado, cromo) prontos para traduzir.
- **Cuidados:** Origem não declarada peça a peça; 4 botões que andam; peças só CSS cabem em todo plano.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/zivhdinfo/lazy-ui) · [site](http://2lazyui.com/) · último commit em 31.08.2026 · aviso: «© 2026 Zivhd» · inventário: `inventario/conferencia-e-lacunas.md`

### Pixel (Devsethi3)

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (motion, @paper-design/shaders, Radix, Base UI)

- **Peças:**
  - `mesh-gradient`: malha de degradê
  - `ocean-wave`: onda
  - `grid-morph`: grade que se transforma
  - `hero-shader`: capa com shader
- **Por quê:** Fundos vivos sobre o Paper Shaders.
- **Cuidados:** WebGL só no Completo; movimento reduzido em 2 de 18.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/Devsethi3/Pixel) · [site](https://github.com/Devsethi3/Pixel) · último commit em 31.05.2026 · aviso: «Copyright (c) 2026 Dev Sethi» · inventário: `inventario/registros-shadcn.md`

### shader-doodle

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: não (nenhuma (WebGL))

- **Peças:**
  - `shader-doodle`: elemento para escrever e rodar shader [C]
- **Por quê:** Hospeda o shader próprio da marca (grão, campo de cor) num elemento simples.
- **Cuidados:** O shader escrito leva a própria licença: só trechos livres (Inigo Quilez, hg_sdf, webgl-noise), nunca do Shadertoy.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/halvves/shader-doodle) · último commit em 15.09.2026 · inventário: `inventario/colecoes-e-demos.md`

### ShaderPad

[C] · MIT · LIBERADO (com exclusões) · cópia do repositório · dependência nova: não

- **Peças:**
  - `shaderpad`: shaders de fragmento enxutos, com React
- **Por quê:** Base para o shader próprio da marca.
- **Cuidados:** Excluídos os exemplos portados do Shadertoy.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/miseryco/shaderpad) · [site](https://misery.co/shaderpad/) · último commit em 11.08.2026 · aviso: «© 2024–2026 Riley Shaw» · inventário: `inventario/conferencia-e-lacunas.md`

### tldraw shader-starter-kit

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: não (nenhuma (WebGL))

- **Peças:**
  - `shader-starter-kit`: simulação de fluido, degradê e sombras dinâmicas [C]
- **Por quê:** Campo de cor vivo e fluido para a cena do Completo.
- **Cuidados:** Feito para a tela do tldraw: reaproveitar só o shader.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/tldraw/shader-starter-kit) · último commit em 02.10.2026 · aviso: «Copyright (c) 2024 tldraw Inc.» · inventário: `inventario/colecoes-e-demos.md`

### upstream-fx

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `fundo de raios`: WebGL com raios que sobem e desviam do cursor
- **Por quê:** Fundo vivo de luz que responde à mão.
- **Cuidados:** WebGL só no Completo.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/AmunM9/upstream-fx) · [site](https://upstream-fx.vercel.app) · último commit em 07.10.2026 · aviso: «Copyright (c) 2026 Manuel Torres» · inventário: `inventario/registros-shadcn.md`

---

## 12. 3D, cena e vídeo interativo

O objeto e a cena: CSS 3D a partir do Profissional; WebGL só no Completo, nas cinco condições (`../esteira/09-movimento.md`, seção 7). O three.js e o que vem sobre ele são dependência nova (`../esteira/13-tecnologia-e-estrutura.md`, seção 9.4).

### AVAL ★

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@pixel-point/aval-react)

- **Peças:**
  - `aval-react`: vídeo interativo com estados nomeados, gatilhos, transições reversíveis e transparência
- **Por quê:** Põe o objeto do negócio em movimento pré-renderizado com estados, sem o custo de uma cena 3D.
- **Cuidados:** O README exige caminho próprio para navegador sem suporte e para erro fatal; medir o peso do vídeo na barreira do travamento.
- **Trazer:** `npm install @pixel-point/aval-react`
- **Origem:** [repositório](https://github.com/pixel-point/aval) · [site](https://pixelpoint.io/aval) · último commit em 25.09.2026 · aviso: «© 2026 AVAL contributors» · inventário: `inventario/conferencia-e-lacunas.md`

### 3dsvg ★

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (three, @react-three/fiber)

- **Peças:**
  - `3dsvg`: transforma um SVG (logotipo, selo, ícone) em objeto 3D extrudado e interativo, com material e luz, exportado como componente React
- **Por quê:** Dá o 3D «estilo moeda» do Atlas: a ficha extrudada com relevo, feita do próprio logotipo do cliente.
- **Cuidados:** WebGL só no Completo, com reserva estática; sem movimento reduzido (fazer à mão).
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/renatoworks/3dsvg) · [site](https://3dsvg.design) · último commit em 30.05.2026 · aviso: «© 2026 Renato Costa» · inventário: `inventario/conferencia-e-lacunas.md`

### @photo-sphere-viewer/core ★

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@photo-sphere-viewer/core, three)

- **Peças:**
  - `photo-sphere-viewer`: panorama 360° com visita virtual, giroscópio e marcadores
  - `react-photo-sphere-viewer`: envoltório React (6.2.3)
- **Por quê:** Visita virtual de imóvel ou salão.
- **Cuidados:** Traz three (201 KB gz); não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install @photo-sphere-viewer/core@5.15.1`
- **Origem:** [repositório](https://github.com/mistic100/Photo-Sphere-Viewer) · último commit em 02.08.2026 · inventário: `inventario/pacotes-de-efeito.md`

### model-viewer ★

[C] · Apache-2.0 · LIBERADO · pacote npm · dependência nova: **sim** (@google/model-viewer (three embutido))

- **Peças:**
  - `model-viewer`: peça 3D com AR, luz e órbita [C]
  - `model-viewer`: modelo 3D com luz, sombra, órbita e AR
- **Por quê:** O objeto da vitrine em 3D, com luz e órbita, para o Completo.
- **Cuidados:** O modelo precisa de licença própria; os decodificadores Draco e KTX2 vêm de CDN por padrão e têm de ser hospedados junto. Decodificadores Draco e KTX2 vêm do CDN do Google: hospedar junto; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install @google/model-viewer@4.4.0`
- **Origem:** [repositório](https://github.com/google/model-viewer) · [site](https://modelviewer.dev) · último commit em 09.10.2026 · inventário: `inventario/colecoes-e-demos.md`; `inventario/pacotes-de-efeito.md`

### ThreeUI Community (Meng To) ★

[C] · MIT · LIBERADO (com exclusões) · cópia do repositório · dependência nova: **sim** (three, gsap, ogl)

- **Peças:**
  - `liquid-metal-button`: botão de metal líquido [C]
  - `woven-cloth`: tecido trançado [C]
  - `condensation`: vidro com condensação [C]
  - `skeuomorphic-toggle`: chave com matéria [C]
  - `bookshelf`: estante [C]
  - `lumen-cta`: chamada com luz [C]
  - `text-path-studies`: texto em caminho [C]
  - `gallery`: galeria [C]
- **Por quê:** Matéria de verdade em WebGL (metal, tecido, condensação) para a vitrine do Completo.
- **Cuidados:** Hospedar junto o que vem de CDN e de threeui.com; as miniaturas e vídeos do catálogo, o Pro e o Beta ficam fora, e os repositórios kage, complete-shelf e sylva não têm licença.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/MengTo/threeui) · [site](https://threeui.com) · último commit em 01.09.2026 · aviso: «Copyright (c) 2026 Meng To» · inventário: `inventario/colecoes-e-demos.md`

### heerich

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `heerich`: cenas 3D de voxels renderizadas em SVG, com câmera oblíqua ou em perspectiva
- **Por quê:** Objeto em volume sem WebGL, inspirado em escultura de papelão.
- **Cuidados:** Girar o objeto vira peça [P]; MR à mão.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/meodai/heerich) · [site](https://meodai.github.io/heerich/) · último commit em 22.06.2026 · aviso: «© 2025 meodai» · inventário: `inventario/conferencia-e-lacunas.md`

### Isometric

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (Radix)

- **Peças:**
  - `skyline`: horizonte isométrico
  - `stack`: pilha isométrica
  - `block-icon`: ícone em bloco
  - `iso-card`: cartão isométrico
  - `iso-tabs`: abas isométricas
  - `iso-switch`: interruptor isométrico
- **Por quê:** Desenhos isométricos que respondem ao ponteiro.
- **Cuidados:** Conferir se o objeto usa CSS 3D (então Profissional).
- **Trazer:** `npx shadcn@4.21.0 add @isometric/skyline --dry-run`
- **Origem:** [repositório](https://github.com/Abhishek-Mallick/Isometric) · [site](https://isometric.buildlab.in) · último commit em 05.10.2026 · aviso: «Copyright (c) 2026 Abhishek Mallick» · inventário: `inventario/registros-shadcn.md`

### Krbn

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `krbn`: cena 3D em SVG com traço de lápis e linhas ocultas em fantasma
- **Por quê:** O 3D desenhado à mão, sem WebGL.
- **Cuidados:** MR 0.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/vpalos/Krbn) · último commit em 25.07.2026 · aviso: «© 2026 Krbn contributors» · inventário: `inventario/conferencia-e-lacunas.md`

### lite-youtube-embed

[todos] · Apache-2.0 · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `lite-youtube-embed`: vídeo do YouTube leve, carregado sob ação
- **Por quê:** Vídeo do negócio sem pedido ao YouTube antes do clique, a bem da privacidade.
- **Cuidados:** Antes da ação nada vai ao YouTube; a capa do vídeo tem de ser hospedada junto.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/paulirish/lite-youtube-embed) · último commit em 10.11.2025 · inventário: `inventario/colecoes-e-demos.md`

### Media Chrome

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (media-chrome)

- **Peças:**
  - `media-chrome`: controles de vídeo estilizáveis
- **Por quê:** O vídeo da capa com controles na matéria da marca.
- **Cuidados:** Fixar a versão no npm (a nota não a registra) e seguir as regras de vídeo e de economia de dados no celular.
- **Trazer:** ``
- **Origem:** [repositório](https://github.com/muxinc/media-chrome) · [site](https://media-chrome.org) · último commit em 12.10.2026 · aviso: «Copyright (c) 2020 Mux, Inc.» · inventário: `inventario/colecoes-e-demos.md`

### three-edge-projection

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (three, three-mesh-bvh)

- **Peças:**
  - `edge projection`: silhueta, planta e corte em traço [C ao vivo]
- **Por quê:** O traço técnico do objeto, servido como SVG.
- **Cuidados:** Gerar fora do site para valer em todo plano.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/gkjohnson/three-edge-projection) · [site](https://gkjohnson.github.io/three-edge-projection/edgeProjection.html) · último commit em 30.09.2026 · aviso: «© 2023 Garrett Johnson» · inventário: `inventario/conferencia-e-lacunas.md`

### wensity

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não

- **Peças:**
  - `scrubbable-video-reveal`: vídeo que se percorre com o gesto
  - `morphing-shape-background`: fundo de forma que se transforma
- **Por quê:** Vídeo com estados conduzido pela mão.
- **Cuidados:** text-glitch e infinite-marquee fora.
- **Trazer:** `npx shadcn@4.21.0 add @wensity/scrubbable-video-reveal --dry-run`
- **Origem:** [repositório](https://github.com/wensity/registry) · [site](https://ui.wensity.com/components) · último commit em 07.10.2026 · aviso: «Copyright (c) 2026 Wensity» · inventário: `inventario/registros-shadcn.md`

### zdog

[P][C] · MIT · LIBERADO (decl.), fora do kit · pacote npm · dependência nova: **sim** (zdog)

- **Peças:**
  - `zdog`: pseudo-3D plano e arredondado em canvas e SVG
- **Por quê:** Objeto 3D ilustrado sem WebGL, em 7 KB.
- **Cuidados:** MIT só no README, sem arquivo LICENSE; parado desde 2022; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install zdog@1.1.3`
- **Origem:** [repositório](https://github.com/metafizzy/zdog) · último commit em 22.01.2022 · inventário: `inventario/pacotes-de-efeito.md`

### @react-three/drei

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@react-three/drei, three, @react-three/fiber)

- **Peças:**
  - `drei`: ambiente, texto e materiais distorcidos para o R3F
- **Por quê:** Luz de ambiente e materiais prontos para o objeto do ofício.
- **Cuidados:** Presets de Environment baixam HDRI de CDN: hospedar junto; Sparkles é enfeite.
- **Trazer:** `npm install @react-three/drei@10.7.9`
- **Origem:** [repositório](https://github.com/pmndrs/drei) · último commit em 25.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### @sparkjsdev/spark

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@sparkjsdev/spark, three)

- **Peças:**
  - `spark`: Gaussian splats em three (ambiente real escaneado)
- **Por quê:** O ambiente real do negócio escaneado, navegável.
- **Cuidados:** 888 KB gz e arquivos de splat pesados: medir na barreira do travamento.
- **Trazer:** `npm install @sparkjsdev/spark@2.3.1`
- **Origem:** [repositório](https://github.com/sparkjsdev/spark) · último commit em 01.10.2026 · inventário: `inventario/pacotes-de-efeito.md`

### Canvas UI (React Bits)

[C] · MIT + Commons Clause · **CONDICIONAL**, só no repositório do cliente · registro shadcn · dependência nova: **sim** (motion, three, @react-three/fiber, Base UI)

- **Peças:**
  - `ink-object`: objeto de tinta
  - `liquid`: líquido
- **Por quê:** Objeto de tinta em WebGL.
- **Cuidados:** Só no repositório do cliente; duck.glb (SCEA) não se usa; particle-* fora.
- **Trazer:** `npx shadcn@4.21.0 add @canvas-ui/ink-object --dry-run`
- **Origem:** [repositório](https://github.com/DavidHDev/canvas-ui) · [site](https://canvasui.dev) · último commit em 03.10.2026 · aviso: «Copyright (c) 2026 David Haz» · inventário: `inventario/registros-shadcn.md`

### Clearwater

[C] · MIT · LIBERADO · demo para refazer · dependência nova: não (nenhuma (WebGL2))

- **Peças:**
  - `clearwater`: água rasa fotorrealista com cáusticas e refração
- **Por quê:** Matéria de água viva para nichos de água (piscina, náutica).
- **Cuidados:** Arquivo único grande: portar; movimento reduzido não medido.
- **Trazer:** estudar e refazer: https://aureliengmz.github.io/clearwater/
- **Origem:** [repositório](https://github.com/aureliengmz/clearwater) · [site](https://aureliengmz.github.io/clearwater/) · último commit em 23.09.2026 · aviso: «© 2026 Lumaris» · inventário: `inventario/conferencia-e-lacunas.md`

### cobe

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (cobe)

- **Peças:**
  - `cobe`: globo de pontos em WebGL, 5,8 KB
- **Por quê:** Globo leve, só quando o mapa é do ofício.
- **Cuidados:** Globo é motivo visto em toda parte; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install cobe@2.0.1`
- **Origem:** [repositório](https://github.com/shuding/cobe) · último commit em 19.03.2026 · inventário: `inventario/pacotes-de-efeito.md`

### gaussian-splat-lite

[C] · Apache-2.0 · LIBERADO (com exclusões) · cópia do repositório · dependência nova: **sim** (three)

- **Peças:**
  - `gaussian-splat-lite`: renderizador de splat em WebGPU e WebGL2, com PLY, SPZ e LOD em streaming
- **Por quê:** Cena capturada com carga progressiva, melhor para o aparelho médio.
- **Cuidados:** Excluído o modelo de exemplo (CC BY 4.0); manter o NOTICE. Barreira do travamento.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/williamliu-1997/gaussian-splat-lite) · [site](https://gaussian-splat-lite.vercel.app/) · último commit em 10.10.2026 · inventário: `inventario/conferencia-e-lacunas.md`

### GaussianSplats3D

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (three)

- **Peças:**
  - `gaussian-splats-3d`: visualizador de Gaussian Splatting do ambiente real capturado
- **Por quê:** O salão ou o imóvel real em 3D navegável.
- **Cuidados:** Pesado: medir na barreira do travamento, com reserva estática.
- **Trazer:** `npm install @mkkellogg/gaussian-splats-3d`
- **Origem:** [repositório](https://github.com/mkkellogg/GaussianSplats3D) · [site](https://www.npmjs.com/package/@mkkellogg/gaussian-splats-3d) · último commit em 19.10.2025 · aviso: «© 2023 Mark Kellogg» · inventário: `inventario/conferencia-e-lacunas.md`

### glyph (Poimandres)

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (three, @react-three/fiber, TypeGPU)

- **Peças:**
  - `glyph`: fontes em MSDF, shaping Unicode e diagramação de parágrafo na cena
- **Por quê:** Tipografia de verdade dentro da cena 3D.
- **Cuidados:** Jovem; o autor avisa demora nas respostas. MR 0.
- **Trazer:** `npm install @pmndrs/glyph`
- **Origem:** [repositório](https://github.com/pmndrs/glyph) · último commit em 10.10.2026 · aviso: «© 2026 Poimandres» · inventário: `inventario/conferencia-e-lacunas.md`

### gpu-curtains

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (gpu-curtains)

- **Peças:**
  - `gpu-curtains`: planos WebGPU a partir do DOM (sucessor do curtains.js)
- **Por quê:** Imagem do DOM com shader, técnica de site premiado.
- **Cuidados:** WebGPU; sinais do código não lidos; reserva obrigatória.
- **Trazer:** `npm install gpu-curtains@0.16.3`
- **Origem:** [repositório](https://github.com/martinlaxenaire/gpu-curtains) · último commit em 24.03.2026 · inventário: `inventario/pacotes-de-efeito.md`

### map3d

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (three, @react-three/fiber)

- **Peças:**
  - `map3d`: maquete 3D da cidade com prédios e ruas em R3F
- **Por quê:** O bairro do cliente como maquete.
- **Cuidados:** Gerar no desenvolvimento e hospedar os dados junto.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/cartesiancs/map3d) · último commit em 13.05.2026 · aviso: «© 2025 cartesiancs» · inventário: `inventario/conferencia-e-lacunas.md`

### MapLibre GL JS

[C] · BSD-3-Clause · LIBERADO · pacote npm · dependência nova: **sim** (@maplibre/*, @mapbox/*)

- **Peças:**
  - `maplibre-gl`: mapa vetorial com estilo próprio, terreno 3D e marcadores
- **Por quê:** O mapa do bairro desenhado na identidade.
- **Cuidados:** Os tiles vêm de um provedor: pedido externo e termos à parte; reserva estática.
- **Trazer:** `npm install maplibre-gl`
- **Origem:** [repositório](https://github.com/maplibre/maplibre-gl-js) · [site](https://maplibre.org/maplibre-gl-js/docs/) · último commit em 13.10.2026 · aviso: «© 2023 MapLibre contributors» · inventário: `inventario/conferencia-e-lacunas.md`

### Market (Poimandres)

[C] · MIT (site); CC0 nos ativos · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - modelos 3D CC0
  - materiais CC0
  - `HDRIs CC0`: luz de ambiente
- **Por quê:** Ativos 3D livres de crédito.
- **Cuidados:** Conferir a nota de cada arquivo.
- **Trazer:** copiar o ativo CC0 de https://market.pmnd.rs
- **Origem:** [repositório](https://github.com/pmndrs/market) · [site](https://market.pmnd.rs) · último commit em 12.09.2026 · aviso: «© 2021 pmndrs, contributors» · inventário: `inventario/conferencia-e-lacunas.md`

### marzipano

[C] · Apache-2.0 · LIBERADO · pacote npm · dependência nova: **sim** (marzipano)

- **Peças:**
  - `marzipano`: visita virtual 360° (Google)
- **Por quê:** Visita virtual madura do Google.
- **Cuidados:** Parado desde 2021; WebGL; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install marzipano@0.10.2`
- **Origem:** [repositório](https://github.com/google/marzipano) · último commit em 18.03.2021 · inventário: `inventario/pacotes-de-efeito.md`

### OGL

[C] · Unlicense · LIBERADO · pacote npm · dependência nova: **sim** (ogl)

- **Peças:**
  - `ogl`: WebGL mínimo para um shader próprio (33,4 KB)
- **Por quê:** Reserva do kit quando o WebGL próprio não basta.
- **Cuidados:** Última publicação em 27/01/2025, biblioteca estável. Só no Completo, nas cinco condições do WebGL.
- **Trazer:** `npm install ogl@1.0.11`
- **Origem:** último commit em 27.01.2025 · inventário: estudo de 12.10.2026

### pannellum

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (pannellum)

- **Peças:**
  - `pannellum`: panorama 360° e visita virtual leve
- **Por quê:** Panorama mais leve que o Photo Sphere Viewer.
- **Cuidados:** WebGL; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install pannellum@2.5.7`
- **Origem:** [repositório](https://github.com/mpetroff/pannellum) · último commit em 19.02.2026 · inventário: `inventario/pacotes-de-efeito.md`

### pixi.js

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (pixi.js)

- **Peças:**
  - `pixi.js`: renderizador 2D em WebGL e WebGPU
- **Por quê:** Cena 2D rica com filtros na GPU.
- **Cuidados:** 258 KB gz; referência a CDN; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install pixi.js@8.22.0`
- **Origem:** [repositório](https://github.com/pixijs/pixijs) · último commit em 01.10.2026 · inventário: `inventario/pacotes-de-efeito.md`

### PlayCanvas Web Components

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (playcanvas)

- **Peças:**
  - `web-components`: cena 3D declarativa em HTML [C]
- **Por quê:** Cena 3D declarativa para o objeto ou o ambiente do Completo.
- **Cuidados:** O motor pesa cerca de 622 KB gz e não trata movimento reduzido: medir na barreira do travamento.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/playcanvas/web-components) · último commit em 13.10.2026 · inventário: `inventario/colecoes-e-demos.md`

### pmndrs/examples

[C] · MIT · LIBERADO (com exclusões) · demo para refazer · dependência nova: **sim** (three, @react-three/fiber, @react-three/drei, postprocessing)

- **Peças:**
  - `examples`: 199 exemplos de R3F: vidro, luz, sombras assadas e profundidade de campo [C]
- **Por quê:** Receitas de vidro, luz e sombra em R3F para a cena do Completo.
- **Cuidados:** Modelos e texturas têm licença própria (Sketchfab, CC-BY, um «noncommercial» e um «shadertoy»): trocá-los e conferir exemplo a exemplo.
- **Trazer:** estudar e refazer: https://github.com/pmndrs/examples
- **Origem:** [repositório](https://github.com/pmndrs/examples) · [site](https://r3f.docs.pmnd.rs) · último commit em 12.10.2026 · aviso: «Copyright (c) 2024 Poimandres» · inventário: `inventario/colecoes-e-demos.md`

### postprocessing

[C] · Zlib e MIT · LIBERADO · pacote npm · dependência nova: **sim** (postprocessing, @react-three/postprocessing, three)

- **Peças:**
  - `postprocessing`: bloom, ruído e profundidade de campo para three
  - `@react-three/postprocessing`: envoltório R3F (3.2.0)
- **Por quê:** Luz e grão de câmera sobre a cena.
- **Cuidados:** 110 KB gz; medir na barreira do travamento.
- **Trazer:** `npm install postprocessing@6.39.5 @react-three/postprocessing@3.2.0`
- **Origem:** [repositório](https://github.com/pmndrs/postprocessing) · último commit em 09.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### powershot-threejs

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (three)

- **Peças:**
  - `powershot`: grão, vazamento de luz e vinheta de câmera
- **Por quê:** Matéria de filme na cena 3D.
- **Cuidados:** MR 0.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/cl0nazepamm/powershot-threejs) · [site](https://cl0nazepamm.github.io/powershot-threejs/) · último commit em 24.09.2026 · aviso: «© 2026 cl0nazepamm» · inventário: `inventario/conferencia-e-lacunas.md`

### React Three Fiber + drei

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (three, @react-three/fiber, @react-three/drei)

- **Peças:**
  - `@react-three/fiber`: cena 3D em React
  - `@react-three/drei`: auxiliares do R3F, por módulo
- **Por quê:** Para a cena 3D de verdade do objeto do ofício.
- **Cuidados:** three.js está fora da pilha do kit: só com autorização, no Completo, por next/dynamic sem SSR, com imagem de reserva e frameloop="demand". A versão do three não está nas notas: fixar a compatível.
- **Trazer:** `npm install @react-three/fiber@9.8.1 @react-three/drei@10.7.9 three`
- **Origem:** último commit em 25.09.2026 · inventário: estudo de 12.10.2026

### react-three-a11y

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (three, @react-three/fiber)

- **Peças:**
  - `a11y`: foco, leitor de tela e preferências na cena
- **Por quê:** Acessibilidade de qualquer cena WebGL.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npm install @react-three/a11y`
- **Origem:** [repositório](https://github.com/pmndrs/react-three-a11y) · [site](https://docs.pmnd.rs/a11y/introduction) · último commit em 20.08.2026 · aviso: «2021 Gianmarco Simone; 2021 AlaricBaraou (conflito no LICENSE: manter os dois)» · inventário: `inventario/conferencia-e-lacunas.md`

### react-three-gpu-pathtracer

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (three-gpu-pathtracer, R3F)

- **Peças:**
  - `pathtracer`: render fotorrealista do produto
- **Por quê:** Produto em vitrine com luz física.
- **Cuidados:** Pesadíssimo enquanto converge: usar parado, com reserva.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/pmndrs/react-three-gpu-pathtracer) · último commit em 07.07.2025 · aviso: «© 2024 Poimandres» · inventário: `inventario/conferencia-e-lacunas.md`

### react-three-map

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (R3F, MapLibre)

- **Peças:**
  - `react-three-map`: objeto 3D sobre o mapa
- **Por quê:** A loja em 3D no mapa do bairro.
- **Cuidados:** Tiles externos: termos do provedor.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/RodrigoHamuy/react-three-map) · último commit em 18.07.2026 · aviso: «© 2023 react-three-map authors» · inventário: `inventario/conferencia-e-lacunas.md`

### react-three-rapier

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@dimforge/rapier3d-compat, three-stdlib)

- **Peças:**
  - `rapier`: física: corpos, colisões, juntas
- **Por quê:** Fichas que caem e se chocam.
- **Cuidados:** WASM pesa; MR 0.
- **Trazer:** `npm install @react-three/rapier`
- **Origem:** [repositório](https://github.com/pmndrs/react-three-rapier) · [site](https://react-three-rapier.pmnd.rs) · último commit em 03.11.2025 · aviso: «© 2022 Poimandres» · inventário: `inventario/conferencia-e-lacunas.md`

### Rive (runtime)

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@rive-app/react-canvas)

- **Peças:**
  - `@rive-app/react-canvas`: animação com máquina de estados e interação
- **Por quê:** Objeto animado com estados que respondem à mão.
- **Cuidados:** WASM hospedado junto; só com caso; os termos do editor não foram lidos.
- **Trazer:** `npm install @rive-app/react-canvas@4.36.0`
- **Origem:** [repositório](https://github.com/rive-app/rive-wasm) · último commit em 30.09.2026 · inventário: estudo de 12.10.2026

### shadcn 3D viewer

[C] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (three, @react-three/fiber, Base UI)

- **Peças:**
  - `visualizador de modelo 3D`: câmeras, captura e tela cheia
- **Por quê:** Produto físico em 3D no Completo.
- **Cuidados:** WebGL só no Completo, com reserva estática; o nome exato do item não está na nota: conferir no índice.
- **Trazer:** `npx shadcn@4.21.0 add @3d-viewer/3d-viewer --dry-run`
- **Origem:** [repositório](https://github.com/michidk/shadcn-3d-viewer) · [site](https://shadcn-3d-viewer.vercel.app) · último commit em 04.10.2026 · aviso: «Copyright (c) 2026 shadcn-3d-viewer contributors» · inventário: `inventario/registros-shadcn.md`

### three

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (three)

- **Peças:**
  - `three`: motor 3D de referência
- **Por quê:** A base dos objetos e cenas em WebGL do Completo.
- **Cuidados:** Loaders opcionais (draco, rhino3dm) apontam para CDN: hospedar junto; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install three@0.186.1`
- **Origem:** [repositório](https://github.com/mrdoob/three.js) · último commit em 24.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### three-custom-shader-material

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (three-custom-shader-material, three)

- **Peças:**
  - `three-custom-shader-material`: estende materiais do three com shader próprio
- **Por quê:** Matéria própria (cerâmica, metal) sobre materiais do three.
- **Cuidados:** Não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install three-custom-shader-material@6.4.0`
- **Origem:** [site](https://www.npmjs.com/package/three-custom-shader-material) · último commit em 12.10.2025 · inventário: `inventario/pacotes-de-efeito.md`

### three-geospatial (Takram)

[C] · MIT · LIBERADO (com exclusões) · pacote npm · dependência nova: **sim** (three, R3F, postprocessing)

- **Peças:**
  - `three-atmosphere`: céu e sol pela hora
  - `three-clouds`: nuvens volumétricas
- **Por quê:** A luz real do lugar pela hora do dia.
- **Cuidados:** Excluídos os trechos que citam Shadertoy; pesado.
- **Trazer:** `npm install @takram/three-atmosphere`
- **Origem:** [repositório](https://github.com/takram-design-engineering/three-geospatial) · último commit em 27.05.2026 · aviso: «© 2024 Shota Matsuda» · inventário: `inventario/conferencia-e-lacunas.md`

### three-nebula

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (three)

- **Peças:**
  - `three-nebula`: partículas descritas em JSON
- **Por quê:** Partícula da matéria do negócio.
- **Cuidados:** Só no Completo, com motivo de marca, nunca enfeite.
- **Trazer:** `npm install three-nebula`
- **Origem:** [repositório](https://github.com/creativelifeform/three-nebula) · [site](https://www.npmjs.com/package/three-nebula) · último commit em 30.09.2026 · aviso: «© 2018 a-jie & rohan-deshpande» · inventário: `inventario/conferencia-e-lacunas.md`

### three-projected-material

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (three)

- **Peças:**
  - `projected-material`: imagem projetada sobre volumes
- **Por quê:** A foto que se desfaz em volumes.
- **Cuidados:** Sem commit desde 03/2023, sem substituto.
- **Trazer:** `npm install three-projected-material`
- **Origem:** [repositório](https://github.com/marcofugaro/three-projected-material) · [site](https://www.npmjs.com/package/three-projected-material) · último commit em 15.03.2023 · aviso: «© 2022 Marco Fugaro» · inventário: `inventario/conferencia-e-lacunas.md`

### three-text

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (harfbuzzjs, three)

- **Peças:**
  - `three-text`: texto 3D com HarfBuzz e Knuth-Plass
- **Por quê:** Tipografia fiel em 3D.
- **Cuidados:** Manter o LICENSE_THIRD_PARTY.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/countertype/three-text) · [site](https://countertype.com/tools/three-text/demo) · último commit em 03.07.2026 · aviso: «© 2025–2026 Jeremy Tribby, Countertype LLC» · inventário: `inventario/conferencia-e-lacunas.md`

### three.quarks

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (three)

- **Peças:**
  - `three.quarks`: partículas e efeitos
- **Por quê:** Partícula da matéria do negócio.
- **Cuidados:** Só no Completo, com motivo de marca, nunca enfeite.
- **Trazer:** `npm install three.quarks`
- **Origem:** [repositório](https://github.com/Alchemist0823/three.quarks) · [site](https://quarks.art/) · último commit em 20.05.2026 · aviso: «© 2019 Forrest Sun» · inventário: `inventario/conferencia-e-lacunas.md`

### threecn

[C] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, three, @react-three/fiber, Base UI)

- **Peças:**
  - `floating-card-3d`: cartão flutuante 3D
  - `text-3d`: texto 3D
  - `wave-terrain`: terreno em onda
  - `aurora-ribbons`: fitas de aurora
  - `pendulum-wave`: onda de pêndulos
- **Por quê:** Cenas R3F prontas para o Completo.
- **Cuidados:** Zero movimento reduzido; strange-attractor e particle-field fora.
- **Trazer:** `npx shadcn@4.21.0 add @threecn/floating-card-3d --dry-run`
- **Origem:** [repositório](https://github.com/ln-dev7/threecn) · [site](https://threecn.dev) · último commit em 20.07.2026 · aviso: «Copyright (c) 2026 Leonel Ngoya» · inventário: `inventario/registros-shadcn.md`

### troika-three-text

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (bidi-js, troika-three-utils, webgl-sdf-generator)

- **Peças:**
  - `troika-three-text`: texto SDF nítido na cena
- **Por quê:** Texto da marca nítido no 3D.
- **Cuidados:** MR 0.
- **Trazer:** `npm install troika-three-text`
- **Origem:** [repositório](https://github.com/protectwise/troika) · [site](https://www.npmjs.com/package/troika-three-text) · último commit em 24.07.2026 · aviso: «© 2019 ProtectWise; © 2021 Jason Johnston» · inventário: `inventario/conferencia-e-lacunas.md`

### twgl.js

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (twgl.js)

- **Peças:**
  - `twgl`: ajudante mínimo de WebGL
- **Por quê:** Shader próprio sem motor pesado.
- **Cuidados:** Não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install twgl.js@7.0.0`
- **Origem:** [repositório](https://github.com/greggman/twgl.js) · último commit em 16.07.2025 · inventário: `inventario/pacotes-de-efeito.md`

### uikit (Poimandres)

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (yoga-layout, zod, @preact/signals-core)

- **Peças:**
  - `uikit`: painéis e botões dentro da cena
- **Por quê:** Interface integrada à cena 3D.
- **Cuidados:** MR 0.
- **Trazer:** `npm install @react-three/uikit`
- **Origem:** [repositório](https://github.com/pmndrs/uikit) · [site](https://pmndrs.github.io/uikit/docs/) · último commit em 12.10.2026 · aviso: «© 2024 Bela Bohlender; © 2023 Coconut Capital» · inventário: `inventario/conferencia-e-lacunas.md`

---

## 13. Ícones e ilustração

O ícone desenhado num traço e num peso (`../esteira/11-anti-ia.md`, K5): um conjunto por site, no traço da identidade. Ilustração genérica de banco é marca de IA; o glifo de marca de terceiro, só o oficial.

### dotLottie (runtime) ★

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@lottiefiles/dotlottie-react)

- **Peças:**
  - `dotlottie-react`: player dotLottie em React (ThorVG em WASM)
  - `dotlottie-web`: núcleo em canvas e WASM (0.81.0)
  - `dotlottie-wc`: web component (0.10.0)
- **Por quê:** Ilustração animada leve, formato preferido do Lottie.
- **Cuidados:** O WASM vem do jsDelivr ou unpkg: hospedar e apontar setWasmUrl; arquivos do LottieFiles conferidos um a um (Lottie Simple License; Premium pagos); não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install @lottiefiles/dotlottie-react@0.20.0`
- **Origem:** [repositório](https://github.com/LottieFiles/dotlottie-web) · último commit em 06.10.2026 · inventário: `inventario/pacotes-de-efeito.md`

### Hairline ★

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim**

- **Peças:**
  - `hairline`: figuras isométricas de traço fino que respondem ao ponteiro
- **Por quê:** Ilustração de marca reativa ao ponteiro, na camada do detalhe.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npm install @lucasmarkes/hairline`
- **Origem:** [repositório](https://github.com/lucasmarkes/hairline) · [site](https://hairline.lucasmarkes.com) · último commit em 08.10.2026 · aviso: «© 2026 Lucas Marques» · inventário: `inventario/conferencia-e-lacunas.md`

### morphicons ★

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (morphicons)

- **Peças:**
  - `morphicons`: ícones de traço que se transformam com mola
- **Por quê:** Ícone que troca de estado com gesto, com movimento reduzido.
- **Cuidados:** Substitui o lucide-react onde há troca de estado; adaptar o traço à marca.
- **Trazer:** `npm install morphicons@1.7.1`
- **Origem:** [repositório](https://github.com/guillermolg00/morphicons) · último commit em 28.08.2026 · inventário: `inventario/pacotes-de-efeito.md`

### animateicons

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, Radix)

- **Peças:**
  - `ícones animados`: hu-badge-check, hu-arrow-down-to-line e outros
  - `animateicons`: ícones SVG animados no hover, sobre o Motion
- **Por quê:** Ícones animados com movimento reduzido em 1.181 arquivos.
- **Cuidados:** Adaptar à marca e medir. Pacote de 5,9 MB: importar só o usado; trata movimento reduzido.
- **Trazer:** `npx shadcn@4.21.0 add @animateicons/hu-badge-check --dry-run`
- **Origem:** [repositório](https://github.com/Avijit07x/animateicons) · [site](https://animateicons.in) · último commit em 11.10.2026 · aviso: «Copyright (c) 2025 Avijit Dey» · inventário: `inventario/registros-shadcn.md`; `inventario/pacotes-de-efeito.md`

### Heroicons

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@heroicons/react)

- **Peças:**
  - `@heroicons/react`: contorno, sólido, mini e micro
- **Por quê:** Conjunto pequeno e nítido.
- **Cuidados:** Visual do Tailwind, muito visto. Fixar a versão.
- **Trazer:** `npm install @heroicons/react`
- **Origem:** [repositório](https://github.com/tailwindlabs/heroicons) · aviso: «Copyright (c) Tailwind Labs, Inc.» · inventário: estudo de 12.10.2026

### heroicons-animated

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, Radix, Base UI)

- **Peças:**
  - `ícones Heroicons animados`: check-badge, arrow-path, chat-bubble-bottom-center-text e outros
- **Por quê:** Heroicons que respondem ao toque.
- **Cuidados:** Nenhum arquivo trata movimento reduzido: envolver em MotionConfig.
- **Trazer:** `npx shadcn@4.21.0 add @heroicons-animated/check-badge --dry-run`
- **Origem:** [repositório](https://github.com/Aniket-508/heroicons-animated) · [site](https://www.heroicons-animated.com) · último commit em 14.09.2026 · aviso: «Copyright (c) 2026 Aniket Pawar» · inventário: `inventario/registros-shadcn.md`

### Hugeicons (grátis)

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (hugeicons-react)

- **Peças:**
  - `hugeicons-react`: 5.100+ ícones em traço arredondado
- **Por quê:** Traço arredondado, alternativa ao Lucide.
- **Cuidados:** Só o pacote grátis, local; o Pro tem outro contrato e cotas de CDN. Fixar a versão.
- **Trazer:** `npm install hugeicons-react`
- **Origem:** [repositório](https://github.com/hugeicons/hugeicons-react) · [site](https://hugeicons.com) · inventário: estudo de 12.10.2026

### Iconoir

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (iconoir-react)

- **Peças:**
  - `iconoir-react`: contorno de 1,5 px, geométrico
- **Por quê:** Traço mais fino e editorial.
- **Cuidados:** Fixar a versão ao instalar.
- **Trazer:** `npm install iconoir-react`
- **Origem:** [repositório](https://github.com/iconoir-icons/iconoir) · [site](https://iconoir.com) · aviso: «Copyright (c) 2021 Luca Burgio» · inventário: estudo de 12.10.2026

### itshover

[todos] · Apache-2.0 · LIBERADO · registro shadcn · dependência nova: **sim** (motion, Radix)

- **Peças:**
  - `263 ícones animados`: accessibility-icon, airplane-icon, alarm-clock-plus-icon e outros
- **Por quê:** Ícone que responde ao hover no vocabulário de interação.
- **Cuidados:** package.json diz MIT, vale o Apache-2.0; sem movimento reduzido.
- **Trazer:** `npx shadcn@4.21.0 add https://www.itshover.com/r/airplane-icon.json --dry-run`
- **Origem:** [repositório](https://github.com/itshover/itshover) · [site](https://www.itshover.com) · último commit em 26.09.2026 · inventário: `inventario/registros-shadcn.md`

### itshover

[todos] · Apache-2.0 · LIBERADO · cópia do repositório · dependência nova: não (motion)

- **Peças:**
  - `ícones animados`: 186+ ícones com resposta no hover
- **Por quê:** Ícone que responde à mão, sem pacote novo.
- **Cuidados:** O LICENSE do repositório é Apache-2.0, não MIT como dizia o espelho: manter LICENSE e NOTICE.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/Aryan-205/itshover) · [site](https://itshover.com) · inventário: estudo de 12.10.2026

### Lottie (lottie-web e lottie-react)

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (lottie-react, lottie-web)

- **Peças:**
  - `lottie-react`: Lottie em React com hooks, sobre o lottie-web 5.13.0
  - `@evanhahn/lottie-web-light`: só o lottie_light, menor
  - `lottie-colorify`: recolore o JSON com as cores da marca
- **Por quê:** Lottie sem WASM, que não inicia o autoplay sob movimento reduzido.
- **Cuidados:** Arquivos do LottieFiles conferidos um a um; ligar à rolagem só no Completo.
- **Trazer:** `npm install lottie-react@3.1.2`
- **Origem:** [repositório](https://github.com/Gamote/lottie-react) · último commit em 07.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### Lucide

[todos] · ISC · LIBERADO · pacote npm · dependência nova: não (lucide-react)

- **Peças:**
  - `lucide-react`: contorno de 2 px, poda por ícone
- **Por quê:** Ícone neutro da pilha aprovada.
- **Cuidados:** É o visual shadcn mais reconhecível: usar pouco. Os derivados do Feather são MIT; versão do kit: 1.49.
- **Trazer:** `npm install lucide-react`
- **Origem:** [site](https://lucide.dev) · inventário: estudo de 12.10.2026

### lucide-animated (pqoqubbw/icons)

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion, Base UI)

- **Peças:**
  - `468 ícones Lucide animados`: audio-lines, badge-alert, cursor-click e outros
  - `ícones animados`: Lucide com resposta no hover
- **Por quê:** Os ícones da pilha (lucide-react) com resposta ao toque.
- **Cuidados:** Nenhum arquivo trata movimento reduzido. Herda o visual Lucide; hover só com ponteiro fino; tutoriais e demos fora da redistribuição.
- **Trazer:** `npx shadcn@4.21.0 add @lucide-animated/cursor-click --dry-run`
- **Origem:** [repositório](https://github.com/pqoqubbw/icons) · [site](https://lucide-animated.com) · último commit em 07.10.2026 · aviso: «Copyright (c) 2024-2026 pqoqubbw» · inventário: `inventario/registros-shadcn.md`; estudo de 12.10.2026

### Meteocons

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `meteocons`: ícones de clima animados, desenhados à mão
- **Por quê:** Clima para nichos ao ar livre.
- **Cuidados:** Parar a animação com movimento reduzido.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/basmilius/meteocons) · [site](https://meteocons.com) · último commit em 12.04.2026 · aviso: «© 2020-present Bas Milius» · inventário: `inventario/conferencia-e-lacunas.md`

### Phosphor

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@phosphor-icons/react)

- **Peças:**
  - `@phosphor-icons/react`: seis pesos, inclusive thin, light e duotone; /ssr para servidor
- **Por quê:** Traço fino e elegante: a melhor relação entre caráter e custo.
- **Cuidados:** Versão não nas notas: fixar ao instalar.
- **Trazer:** `npm install @phosphor-icons/react`
- **Origem:** [repositório](https://github.com/phosphor-icons/core) · [site](https://phosphoricons.com) · aviso: «Copyright (c) 2023 Phosphor Icons» · inventário: estudo de 12.10.2026

### react-archer

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (React)

- **Peças:**
  - `react-archer`: setas SVG entre elementos
- **Por quê:** Diagrama do ofício («como funciona»).
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npm install react-archer`
- **Origem:** [repositório](https://github.com/pierpo/react-archer) · [site](https://pierpo.github.io/react-archer/) · último commit em 05.06.2026 · aviso: «© 2018 Pierre Poupin» · inventário: `inventario/conferencia-e-lacunas.md`

### react-rough-fiber

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (roughjs)

- **Peças:**
  - `react-rough-fiber`: qualquer SVG com traço à mão
- **Por quê:** Ícones da marca em versão rabiscada.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** `npm install react-rough-fiber`
- **Origem:** [repositório](https://github.com/Bowen7/react-rough-fiber) · [site](https://react-rough-fiber.amind.app) · último commit em 28.04.2025 · aviso: «© 2023 Bowen» · inventário: `inventario/conferencia-e-lacunas.md`

### react-useanimations

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-useanimations)

- **Peças:**
  - `react-useanimations`: ícones animados em Lottie
- **Por quê:** Ícones animados prontos, com movimento reduzido.
- **Cuidados:** Pacote grande; ícones genéricos: adaptar.
- **Trazer:** `npm install react-useanimations@3.1.1`
- **Origem:** [repositório](https://github.com/useAnimations/react-useanimations) · último commit em 11.10.2026 · inventário: `inventario/pacotes-de-efeito.md`

### Remix Icon

[todos] · licença própria · **CONDICIONAL**, só no repositório do cliente · pacote npm · dependência nova: **sim** (@remixicon/react)

- **Peças:**
  - `@remixicon/react`: linha e preenchido
- **Por quê:** Acervo amplo com uso comercial e de cliente permitido.
- **Cuidados:** Remix Icon License v1.0 (jan/2026), não mais Apache: proibido usar ícone como logotipo ou identificador da marca e vender os ícones; só no repositório do cliente.
- **Trazer:** `npm install @remixicon/react`
- **Origem:** [repositório](https://github.com/Remix-Design/RemixIcon) · inventário: estudo de 12.10.2026

### Rive (runtime)

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@rive-app/react-canvas, @rive-app/canvas)

- **Peças:**
  - `react-canvas`: Rive em React
  - `canvas`: runtime em canvas e WASM (2.44.2)
  - `react-canvas-lite`: versão leve, sem texto e áudio
  - `react-webgl2`: efeitos e malhas em WebGL2 [C]
- **Por quê:** Ilustração interativa com máquina de estados, que responde à mão.
- **Cuidados:** WASM do unpkg por padrão: hospedar; arquivos da comunidade são CC BY (crédito) e ficam fora; o plano gratuito exporta com tela de abertura; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install @rive-app/react-canvas@4.36.0`
- **Origem:** [repositório](https://github.com/rive-app/rive-react) · último commit em 30.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### simple-icons

[todos] · CC0-1.0 · LIBERADO · pacote npm · dependência nova: **sim**

- **Peças:**
  - `simple-icons`: ícones de marcas (pagamento, entrega, redes)
  - `glifos de marca`: como o do WhatsApp, já usado no kit
- **Por quê:** Meios de pagamento e entrega sem desenho próprio.
- **Cuidados:** O CC0 cobre o desenho, não a marca. Cada glifo só representa a própria marca.
- **Trazer:** `npm install simple-icons`
- **Origem:** [repositório](https://github.com/simple-icons/simple-icons) · [site](https://simpleicons.org) · último commit em 13.10.2026 · inventário: `inventario/conferencia-e-lacunas.md`; estudo de 12.10.2026

### Tabler Icons

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@tabler/icons-react)

- **Peças:**
  - `@tabler/icons-react`: 5.900 ícones de contorno e preenchidos
- **Por quê:** Acervo grande para o ícone que falta.
- **Cuidados:** Visual de painel: usar no traço da marca. Fixar a versão.
- **Trazer:** `npm install @tabler/icons-react`
- **Origem:** [repositório](https://github.com/tabler/tabler-icons) · [site](https://tabler.io/icons) · aviso: «Copyright (c) 2020-2026 Paweł Kuna» · inventário: estudo de 12.10.2026

---

## 14. Blocos e seções

Seções prontas: andaime, nunca desenho (`../esteira/19-o-padrao-atlas.md`, seção 8.1). Servem para começar a estrutura; a composição sai do roteiro de cenas, e toda imagem embutida sai.

### Shadcn Space ★

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion, @base-ui/react, radix-ui, embla, three (2 arquivos))

- **Peças:**
  - `services-01`: serviços
  - `services-02`: serviços
  - `gallery-01`: galeria [P]
  - `about-us-01`: sobre a casa
  - `team-01`: equipe
  - `testimonial-01`: depoimentos
  - `contact-01`: contato
  - `statistics-01`: números
- **Por quê:** Seções que um comércio de bairro usa (serviços, galeria, equipe, contato), em Base UI e com licença que cita o trabalho para cliente.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (images.shadcnspace.com e unsplash). Há letreiro em 38 arquivos e só 20 tratam o movimento reduzido; radix-ui, embla e three são dependência nova.
- **Trazer:** `npx shadcn@4.21.0 add @shadcn-space/gallery-01 --dry-run`
- **Origem:** [repositório](https://github.com/shadcnspace/shadcnspace) · [site](https://shadcnspace.com) · último commit em 02.10.2026 · aviso: «Copyright (c) 2026 Shadcn Space» · inventário: `inventario/blocos-e-primitivos.md`

### Tailark ★

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion)

- **Peças:**
  - `mist`: tema de blocos
  - `veil`: tema de blocos
  - `dusk`: tema de blocos, com páginas dusk/pages/landing
  - `hero-section`: capas
  - `contact`: seção de contato
  - `team`: equipe
  - `testimonials`: depoimentos
  - `faqs`: perguntas frequentes
- **Por quê:** Blocos já na base Base UI, em três temas, que dão o esqueleto de uma página de negócio para ser traduzido à marca.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (unsplash e avatares do GitHub). Oito cabeçalhos com useScroll (veil/hero-section/two e four, dusk/landing/one e five) reagem à rolagem: só pela direção, nunca pela posição; nenhum arquivo trata o movimento reduzido; o Tailark Pro é pago.
- **Trazer:** `npx shadcn@4.21.0 add @tailark/mist-hero-section-1 --dry-run`
- **Origem:** [repositório](https://github.com/tailark/blocks) · [site](https://tailark.com) · último commit em 29.07.2026 · aviso: «Copyright (c) 2025 Irung» · inventário: `inventario/blocos-e-primitivos.md`

### Beste UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (radix-ui, hugeicons)

- **Peças:**
  - `blocos`: 2.236 seções de página, com 478 arquivos que tratam o movimento reduzido
- **Por quê:** O maior acervo de seções livres, com o melhor tratamento do movimento reduzido.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (unsplash, oud.pics e pravatar). A página /license traz licença restritiva (atribuição, sem redistribuição): manter a atribuição no código, não levar ao kit e confirmar com o autor; 15 arquivos de rolagem e 16 de letreiro.
- **Trazer:** `npx shadcn@4.21.0 add @beste-ui/hero7 --dry-run`
- **Origem:** [repositório](https://github.com/beste-co/beste-ui) · [site](https://ui.beste.co) · último commit em 06.10.2026 · aviso: «Copyright (c) 2026 Beste» · inventário: `inventario/blocos-e-primitivos.md`

### Commerce UI

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (radix-ui, motion)

- **Peças:**
  - `cartões de produto`: vitrine
  - `avaliações`: notas de cliente
- **Por quê:** Peças de vitrine para o comércio que mostra produto.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (pexels e giphy). Radix é dependência nova.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/stackzero-labs/ui) · [site](https://ui.stackzero.co) · último commit em 27.08.2025 · aviso: «Copyright (c) 2025 Stackzero Labs» · inventário: `inventario/blocos-e-primitivos.md`

### Creative Tim UI (blocos shadcn)

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (radix-ui)

- **Peças:**
  - `hero`: capas
  - `testimonials`: depoimentos
  - `navbars`: barras
  - `footers`: rodapés
  - `blocos de e-commerce`: vitrine de produto
- **Por quê:** Blocos de marketing e de vitrine de produto, úteis a loja de bairro.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (unsplash, material-tailwind e pravatar). Só 1 arquivo trata o movimento reduzido; os blocos PRO são pagos.
- **Trazer:** `npx shadcn@4.21.0 add @creative-tim/testimonials-01 --dry-run`
- **Origem:** [repositório](https://github.com/creativetimofficial/ui) · [site](https://www.creative-tim.com/ui) · último commit em 14.03.2026 · aviso: «Copyright (c) 2025 Creative Tim» · inventário: `inventario/blocos-e-primitivos.md`

### Easy UI

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (radix-ui, motion)

- **Peças:**
  - `modelos de site`: mais de 50 páginas inteiras
- **Por quê:** Páginas inteiras para estudar a ordem das seções.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (r2.dev, svgrepo, wikimedia e dev.to). Conferir o movimento reduzido peça a peça.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/DarkInventor/easy-ui) · [site](https://easyui.pro) · último commit em 08.02.2026 · aviso: «Copyright (c) 2024 Easy UI» · inventário: `inventario/blocos-e-primitivos.md`

### HyperUI

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `sections`: seções de conteúdo
  - `feature-grids`: grades de recursos
  - `team-sections`: equipe
  - `testimonials`: depoimentos
  - `faqs`: perguntas
  - `footers`: rodapés
  - `product-cards`: cartões de produto
  - `storefront`: modelo de loja
- **Por quê:** HTML e Tailwind puros, sem dependência, como esqueleto rápido de seção.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (unsplash). Cara de Tailwind padrão e nenhum movimento: tudo o que dá acabamento vem da marca.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/markmead/hyperui) · [site](https://hyperui.dev) · último commit em 10.10.2026 · aviso: «Copyright (c) Mark Mead» · inventário: `inventario/blocos-e-primitivos.md`

### Launch UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (radix-ui, lucide-react, next-themes)

- **Peças:**
  - `Navbar`: barra
  - `Items`: lista de itens
  - `FAQ`: perguntas
  - `Stats`: números
  - `Footer`: rodapé
  - `Bento Grid`: grade de cartões
  - `Tabs`: abas
  - `Testimonials`: depoimentos
- **Por quê:** Seções com movimento só em CSS, leves, para servir de esqueleto.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (as do demo). O brilho do Hero, o feixe do CTA e o letreiro do Social Proof são clichê de SaaS e saem; Radix é dependência nova; a versão Pro é paga.
- **Trazer:** `npx shadcn@4.21.0 add @launchui/faq --dry-run`
- **Origem:** [repositório](https://github.com/launch-ui/launch-ui) · [site](https://launchuicomponents.com) · último commit em 04.09.2026 · aviso: «Copyright (c) 2024 Mikolaj Dobrucki» · inventário: `inventario/blocos-e-primitivos.md`

### Magic UI Portfolio

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (motion, radix-ui)

- **Peças:**
  - `hero`: capa
  - `work`: trajetória
  - `projects`: trabalhos
  - `contact`: contato
- **Por quê:** Modelo de página pessoal que serve de esqueleto aos profissionais do Essencial.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (r2.dev e unsplash). Só o Portfolio é livre: o Startup e os demais modelos são pagos.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/magicuidesign/portfolio) · [site](https://magicui.design/docs/templates) · último commit em 13.01.2026 · aviso: «Copyright (c) 2024 Dillion Verma» · inventário: `inventario/blocos-e-primitivos.md`

### Meraki UI

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `heroes`: capas
  - `cards`: cartões
  - `pricing`: preços
  - `footers`: rodapés
- **Por quê:** HTML e Tailwind com suporte a escrita da direita para a esquerda, sem dependência.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (unsplash). Genérico e sem movimento; alguns usam Alpine, que sai.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/merakiui/merakiui) · [site](https://merakiui.com) · último commit em 11.07.2025 · aviso: «Copyright (c) 2021 Khatab Wedaa» · inventário: `inventario/blocos-e-primitivos.md`

### MVPBlocks

[todos] · BSD-3-Clause · LIBERADO · cópia do repositório · dependência nova: **sim** (framer-motion, gsap, radix-ui)

- **Peças:**
  - `blocos de landing animados`: seções com entrada em movimento
- **Por quê:** Seções com entrada animada, para estudar a orquestração antes de refazer em motion.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (Freepik, com atribuição, postimg, pravatar e picsum). 11 arquivos de rolagem e só 3 tratam o movimento reduzido; trocar framer-motion e gsap por motion.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/subhadeeproy3902/mvpblocks) · [site](https://blocks.mvp-subha.me) · último commit em 09.10.2026 · aviso: «Copyright (c) 2025, Subhadeep Roy» · inventário: `inventario/blocos-e-primitivos.md`

### Page UI

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (radix-ui)

- **Peças:**
  - `CTA`: chamada
  - `pricing`: preços
  - `testimonials`: depoimentos
  - `bento`: grade
  - `FAQ`: perguntas
  - `@page-ui/wizard`: CLI dos modelos
- **Por quê:** Componentes de página de entrada prontos para recompor no roteiro de cenas.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (picsum e producthunt). Letreiro em 15 arquivos e só 1 trata o movimento reduzido.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/pageai-pro/page-ui) · [site](https://pageui.shipixen.com) · último commit em 06.07.2026 · aviso: «Copyright (c) 2024 Shipixen» · inventário: `inventario/blocos-e-primitivos.md`

### PrebuiltUI

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não

- **Peças:**
  - `componentes`: mais de 340, em HTML e React
  - `modelos`: páginas inteiras
- **Por quê:** Muito material de seção em HTML e React, sem dependência.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (assets.prebuiltui.com e unsplash). Divergência: a Free License do site veda redistribuir como kit; não levar ao kit; letreiro em 4 arquivos.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/prebuiltui/prebuiltui) · [site](https://prebuiltui.com) · último commit em 06.10.2026 · aviso: «Copyright (c) 2025 PrebuiltUI» · inventário: `inventario/blocos-e-primitivos.md`

### Rivelle UI

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (radix-ui)

- **Peças:**
  - `componentes, blocos e modelos`: acervo shadcn com 23 arquivos que tratam o movimento reduzido
- **Por quê:** Blocos e modelos para recompor, com o movimento reduzido tratado.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (as do demo). Radix é dependência nova.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/w3cproject/rivelle-ui) · último commit em 18.07.2026 · aviso: «Copyright (c) 2026 Rivelle contributors» · inventário: `inventario/blocos-e-primitivos.md`

### Ruixen UI

[todos] · MIT · LIBERADO (com exclusões) · cópia do repositório · dependência nova: **sim** (motion, @gsap/react, three, radix-ui)

- **Peças:**
  - `seções de landing`: mais de 240 seções e componentes
- **Por quê:** Acervo grande de seções animadas para estudar e recompor.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (Pinterest, de terceiros). 44 arquivos de rolagem (só no Completo, por animation-timeline) e 17 de letreiro; o Pro é pago e fica fora.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/ruixenui/ruixen.com) · [site](https://ruixen.com) · último commit em 12.09.2026 · aviso: «Copyright (c) 2025 Ruixen UI» · inventário: `inventario/blocos-e-primitivos.md`

### Shadcn UI Blocks (akash3444)

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (@base-ui/react, motion, framer-motion, embla)

- **Peças:**
  - `hero-01`: capa
  - `team-01`: equipe
  - `contact-01`: contato
  - `testimonials-01`: depoimentos
  - `footer-01`: rodapé
  - `navbar-01`: barra
- **Por quê:** 1.190 arquivos de blocos sobre o Base UI, base do kit.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (uifaces/mockmind, pexels, pixabay e fffuel). Letreiro em 71 arquivos: fora; framer-motion e embla são dependência nova.
- **Trazer:** `npx shadcn@4.21.0 add @shadcnui-blocks/team-01 --dry-run`
- **Origem:** [repositório](https://github.com/akash3444/shadcn-ui-blocks) · [site](https://shadcnui-blocks.com) · último commit em 18.09.2026 · aviso: «Copyright 2025 Shadcn UI Blocks» · inventário: `inventario/blocos-e-primitivos.md`

### shadcn/studio

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não

- **Peças:**
  - `blocos`: seções de página prontas, como andaime
- **Por quê:** Andaime de seções para reescrever no mundo da marca.
- **Cuidados:** Risco de esqueleto genérico; 0 arquivos com movimento reduzido. O GitHub mostra NOASSERTION, mas o texto lido é MIT.
- **Trazer:** `npx shadcn@4.21.0 add @shadcn-studio/<item> --dry-run`
- **Origem:** [repositório](https://github.com/shadcnstudio/shadcn-studio) · [site](https://shadcnstudio.com) · último commit em 20.08.2026 · inventário: estudo de 12.10.2026

### shadcnblocks (blocos gratuitos)

[todos] · MIT + Commons Clause · **CONDICIONAL**, só no repositório do cliente · registro shadcn · dependência nova: não

- **Peças:**
  - `55 blocos livres`: seções de página com base base-vega (Base UI)
  - `11 temas livres`: conjuntos de tokens
- **Por quê:** Blocos de seção já documentados sobre o Base UI, como andaime de página.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (as do demo). Commons Clause: serve ao repositório do cliente, nunca ao kit; só os 55 blocos livres (mais de 1.350 e o Mainline são pagos).
- **Trazer:** `npx shadcn@4.21.0 add @shadcnblocks/<bloco-livre> --dry-run`
- **Origem:** [repositório](https://github.com/shadcnblocks/shadcn-ui-blocks) · [site](https://www.shadcnblocks.com) · último commit em 09.10.2025 · inventário: `inventario/blocos-e-primitivos.md`

### TWBlocks

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (radix-ui, embla, framer-motion)

- **Peças:**
  - `cases`: casos
  - `features`: recursos
  - `stats`: números
  - `contact`: contato
  - `pricing1`: preços
  - `FAQ`: perguntas
- **Por quê:** Esqueletos genéricos de seção, rápidos de recompor.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (as do demo). Genérico: tudo o que dá acabamento vem da marca; trocar framer-motion por motion.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/tommyjepsen/twblocks) · [site](https://twblocks.com) · último commit em 15.12.2025 · aviso: «Copyright (c) 2024 Tommy Jepsen» · inventário: `inventario/blocos-e-primitivos.md`

### Velora UI (Colorlib)

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, embla-carousel-react, radix-ui)

- **Peças:**
  - `Giant wordmark`: rodapé com a marca em tamanho de exibição
  - `Floating pill`: barra em pílula
  - `Mega menu`: menu amplo
  - `Numbered steps`: passos numerados
  - `Comparison table`: tabela de comparação
  - `Split CTA`: chamada dividida
  - `Alternating screenshot rows`: linhas alternadas de imagem e texto
  - `sticky-scroll`: seção presa à rolagem [C]
- **Por quê:** A melhor cobertura de movimento reduzido entre os blocos (191 arquivos), com rodapé e navegação de peso editorial.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (as do demo). Os 18 de rolagem (container-scroll, hero-parallax, macbook-scroll, tracing-beam e outros) só no Completo por animation-timeline, e têm os nomes da Aceternity: conferir a origem; Aurora, Vortex e o letreiro ficam fora.
- **Trazer:** `npx shadcn@4.21.0 add @velora/footer-wordmark --dry-run`
- **Origem:** [repositório](https://github.com/ColorlibHQ/velora-ui) · [site](https://velora.colorlib.com) · último commit em 30.09.2026 · aviso: «Copyright (c) 2026 Aigars Silkalns» · inventário: `inventario/blocos-e-primitivos.md`

### blocks.so

[P][C] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (@base-ui/react, framer-motion, cmdk, sonner, react-day-picker, tw-animate-css)

- **Peças:**
  - `form-layout`: disposições de formulário
  - `dialogs`: diálogos
- **Por quê:** Formulários e diálogos bem resolvidos sobre o Base UI, para o formulário do Profissional.
- **Cuidados:** O bloco é andaime: refazer no mundo da marca, e as imagens embutidas saem (pravatar). O resto é de aplicação e fica fora; trocar sonner pelo toast do Base UI e conferir no --dry-run o que a peça puxa.
- **Trazer:** `npx shadcn@4.21.0 add @blocks-so/form-layout-01 --dry-run`
- **Origem:** [repositório](https://github.com/ephraimduncan/blocks) · [site](https://blocks.so) · último commit em 07.10.2026 · aviso: «Copyright (c) 2025 Ephraim Duncan» · inventário: `inventario/blocos-e-primitivos.md`

### Vivid Layer

[C] · licença própria · **CONDICIONAL**, só no repositório do cliente · registro shadcn · dependência nova: **sim** (motion, @paper-design/shaders)

- **Peças:**
  - `product-card`: cartão de produto com shader
  - `gallery`: galeria com shader
  - `testimonials`: depoimentos com shader
- **Por quê:** Seções com Paper Shaders como andaime.
- **Cuidados:** O repositório do cliente tem de ser privado e nada vai ao kit. Movimento reduzido em um arquivo; gem-smoke-fire-preset fora.
- **Trazer:** `npx shadcn@4.21.0 add https://www.vivid-layer.com/r/product-card.json --dry-run`
- **Origem:** [repositório](https://github.com/lawsonhan/vivid-layer) · [site](https://www.vivid-layer.com) · último commit em 08.09.2026 · inventário: `inventario/registros-shadcn.md`

---

## 15. Coleções amplas

Bibliotecas com peças de muitos papéis. As peças que valem estão em cada entrada; qualquer outra da mesma coleção se confere pelo mesmo critério antes de entrar (`README.md`, seções 3 a 5).

### BeUI ★

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, @paper-design/shaders, Lenis)

- **Peças:**
  - `morphing-lightbox`: lightbox que se transforma [P]
  - `button-metallic`: botão metálico
  - `tilt-card`: cartão que inclina
  - `hold-action-button`: ação de segurar
  - `cylinder-carousel`: carrossel cilíndrico [P]
  - `chromatic-text-reveal`: revelação cromática de texto
  - `project-folder`: pasta de projeto
  - `animated-number`: número animado
  - `button-metallic`: botão de metal
  - `shared-layout-bg`: fundo que desliza entre itens
- **Por quê:** Peças de matéria e gesto com movimento reduzido em 177 de 213 arquivos.
- **Cuidados:** Pro pago; button-magnetic vetado; Lenis em um arquivo; WebGL e rolagem só no Completo; not-found-glitch é catálogo.
- **Trazer:** `npx shadcn@4.21.0 add @beui/morphing-lightbox --dry-run`
- **Origem:** [repositório](https://github.com/starc007/ui-components) · [site](https://beui.dev) · último commit em 12.10.2026 · aviso: «Copyright (c) 2026 Saurabh Chauhan» · inventário: `inventario/registros-shadcn.md`; `inventario/colecoes-e-demos.md`

### Cult UI ★

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion (duas peças com three/ogl))

- **Peças:**
  - `texture-card`: cartão com textura de matéria
  - `texture-button`: botão com superfície texturizada
  - `metal-button`: botão de metal
  - `direction-aware-tabs`: abas que respondem à direção
  - `family-drawer`: gaveta em camadas
  - `rolling-number`: número que rola [P]
  - `hover-video-player`: vídeo que toca no hover [P]
  - `hero-liquid-metal`: metal líquido em WebGL [C]
- **Por quê:** Superfícies de textura e metal que traduzem a matéria da marca em peça.
- **Cuidados:** distorted-glass, hero-liquid-metal e three-d-carousel usam WebGL: só no Completo. Conferir movimento reduzido (46 arquivos).
- **Trazer:** `npx shadcn@4.21.0 add @cult-ui/texture-card --dry-run`
- **Origem:** [repositório](https://github.com/nolly-studio/cult-ui) · [site](https://cult-ui.com) · último commit em 01.10.2026 · inventário: estudo de 12.10.2026

### Dice UI ★

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (bases Radix e Base UI)

- **Peças:**
  - `compare-slider`: comparação de duas imagens
  - `masonry`: mosaico de alturas livres [P]
  - `media-player`: reprodutor de vídeo e áudio
  - `responsive-dialog`: diálogo na mesa e gaveta no celular
  - `rating`: avaliação
  - `timeline`: linha do tempo
  - `scroll-spy`: índice que acompanha a seção
  - `angle-slider`: controle circular
- **Por quê:** Peças de papel claro, comparação, mosaico, diálogo responsivo, já na base Base UI.
- **Cuidados:** Escolher a base Base UI; letreiro em 28 arquivos e só 24 tratam o movimento reduzido; scroll-spy só marca a seção, sem animar pela rolagem.
- **Trazer:** `npx shadcn@4.21.0 add @diceui/compare-slider --dry-run`
- **Origem:** [repositório](https://github.com/sadmann7/diceui) · [site](https://diceui.com) · último commit em 12.10.2026 · aviso: «Copyright (c) 2024 Sadman Sakib» · inventário: `inventario/blocos-e-primitivos.md`

### Motion Primitives ★

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, Radix)

- **Peças:**
  - `morphing-dialog`: diálogo que se transforma
  - `text-morph`: texto que se transforma
  - `sliding-number`: número deslizante [P]
  - `tilt`: inclinação
  - `spotlight`: luz sob o cursor
  - `image-comparison`: comparação de imagens [P]
  - `transition-panel`: painel de transição
  - `progressive-blur`: desfoque progressivo
  - `text-morph`: palavra que se transforma em outra
  - `sliding-number`: número que desliza dígito a dígito [P]
- **Por quê:** Primitivos de movimento maduros para diálogo, texto e luz.
- **Cuidados:** Nenhum arquivo trata movimento reduzido: envolver em MotionConfig reducedMotion="user". magnetic só em peça; infinite-slider é faixa sem fim. Envolver com <MotionConfig reducedMotion="user"> e conferir peça a peça: 0 arquivos tratam movimento reduzido. magnetic só em peça, nunca em botão; cursor e dock são genéricos.
- **Trazer:** `npx shadcn@4.21.0 add @motion-primitives/morphing-dialog --dry-run`
- **Origem:** [repositório](https://github.com/ibelick/motion-primitives) · [site](https://www.motion-primitives.com) · último commit em 28.09.2026 · aviso: «Copyright (c) 2024 ibelick» · inventário: `inventario/registros-shadcn.md`; estudo de 12.10.2026

### Parable ★

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion, Base UI)

- **Peças:**
  - `liquid-metal-button`: botão de metal líquido
  - `split-flap`: placar Solari [P]
  - `combination-dial`: disco de cofre
  - `texture-button`: botão com textura
  - `image-reveal`: revelação de imagem
  - `compare-slider`: comparação de imagens [P]
  - `peek-carousel`: carrossel que espia o próximo [P]
  - `cursor-image-trail`: rastro de imagens no ponteiro [C]
- **Por quê:** Objetos e matérias com gesto (metal líquido, placar, disco) em 88 componentes sobre a pilha aprovada.
- **Cuidados:** magnetic-dock e magnet-lines vetados em botão; matrix-rain é catálogo. Duas animações ligadas à rolagem: só no Completo.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/bswxyz/parable) · [site](https://parable-three.vercel.app) · último commit em 22.08.2026 · aviso: «Copyright (c) 2026 Biswas Khatiwada» · inventário: `inventario/registros-shadcn.md`

### uselayouts ★

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion)

- **Peças:**
  - `stacked-outline-text`: texto em contorno empilhado
  - `fluid-expanding-grid`: grade que se expande sob o ponteiro
  - `magnified-bento`: grade que amplia o item tocado
  - `polaroid-stack`: pilha de fotos em polaroide [P]
  - `3d-book`: livro em 3D que se abre [P]
  - `coverflow-drag`: galeria em coverflow de arrastar [P]
  - `wheel-carousel`: carrossel em roda [P]
  - `perspective-text-scroll`: texto em perspectiva ligado à rolagem [C]
- **Por quê:** Objetos com gesto e matéria de papel (livro, polaroide) e galerias que respondem à mão.
- **Cuidados:** Remover o Lenis (1.3); as peças ligadas à rolagem (perspective-text-scroll, scroll-split-cards) só no Completo, por animation-timeline em @supports.
- **Trazer:** `npx shadcn@4.21.0 add @uselayouts/3d-book --dry-run`
- **Origem:** [repositório](https://github.com/iurvish/uselayouts) · [site](https://uselayouts.com) · último commit em 02.10.2026 · aviso: «Copyright (c) 2025 Urvish Mali» · inventário: `inventario/colecoes-e-demos.md`

### 000h (Cojeev UI)

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, three, @react-three/fiber, Radix, Lenis)

- **Peças:**
  - `grain-dissolve`: dissolução granulada
  - `image-masking`: máscara de imagem
  - `living-link`: vínculo vivo
  - `motion-drawer`: gaveta animada
  - `accordion-gallery`: galeria em acordeão
  - `glass-sculpture`: escultura de vidro [C]
  - `ink-sculpture`: escultura de tinta [C]
  - `image-trail`: rastro de imagens [C]
- **Por quê:** Matéria (grão, vidro, tinta) e vínculos que respondem, num acervo grande.
- **Cuidados:** Lenis em um arquivo; ghost-, swarm- e target-cursor são truque; particle-sculpture e particle-text são catálogo.
- **Trazer:** `npx shadcn@4.21.0 add @000h-cojeev/grain-dissolve --dry-run`
- **Origem:** [repositório](https://github.com/luv-jeri/cojeev-ui) · [site](https://000h.cojeev.com) · último commit em 11.10.2026 · aviso: «Copyright (c) 2026 Sanjay Kumar» · inventário: `inventario/registros-shadcn.md`

### Aceternity UI (camada gratuita)

[todos] · licença própria · **CONDICIONAL**, só no repositório do cliente · registro shadcn · dependência nova: não (motion)

- **Peças:**
  - `focus-cards`: cartões em que o foco apaga os vizinhos
  - `direction-aware-hover`: legenda que entra pelo lado do ponteiro
  - `layout-text-flip`: troca de palavra no título
  - `pointer-highlight`: destaque desenhado sobre o texto
  - `glare-card`: cartão com reflexo de luz
  - `lens`: lupa sobre a imagem [P]
  - `compare`: comparação de imagens [P]
  - `apple-cards-carousel`: carrossel de cartões que se expandem [P]
- **Por quê:** Peças de gesto e de imagem bem resolvidas, que respondem à mão sem depender de pacote fora da pilha.
- **Cuidados:** Serve ao repositório do cliente, nunca ao kit; guardar cópia datada da licença, dos Termos e do FAQ e conferir os componentes de terceiros peça a peça. Ficam fora meteors, sparkles, vortex, lamp, aurora, background-beams, shooting-stars, tracing-beam e macbook-scroll; canvas-reveal-effect e 3d-globe puxam three.
- **Trazer:** `npx shadcn@4.21.0 add @aceternity/focus-cards --dry-run`
- **Origem:** [site](https://ui.aceternity.com) · inventário: `inventario/conferencia-e-lacunas.md`

### Animata

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (motion)

- **Peças:**
  - `accordion`: acordeões animados
  - `card`: cartões
  - `carousel`: carrosséis [P]
  - `image`: efeitos de imagem
  - `skeleton`: esqueletos de espera
  - `tabs`: abas
  - `text`: efeitos de texto
- **Por quê:** Catálogo amplo, por categoria, para achar a técnica de uma peça.
- **Cuidados:** Selecionar com rigor: muita peça de catálogo. Conferir movimento reduzido (30 arquivos).
- **Trazer:** copiar animata/<categoria>/ de https://github.com/codse/animata
- **Origem:** [repositório](https://github.com/codse/animata) · [site](https://animata.design) · último commit em 14.09.2026 · inventário: estudo de 12.10.2026

### Animate UI

[todos] · MIT + Commons Clause · **CONDICIONAL**, só no repositório do cliente · registro shadcn · dependência nova: **sim** (motion; Radix)

- **Peças:**
  - `primitivos animados`: abas, diálogos e acordeões com movimento
- **Por quê:** Anima primitivos reais, perto do vocabulário de interação.
- **Cuidados:** Só no repositório do cliente, nunca no kit. Base Radix (o kit usa Base UI); cerca de 9 meses sem commit; 2 arquivos com movimento reduzido.
- **Trazer:** `npx shadcn@4.21.0 add @animate-ui/<item> --dry-run`
- **Origem:** [repositório](https://github.com/imskyleen/animate-ui) · [site](https://animate-ui.com) · último commit em 31.12.2025 · inventário: estudo de 12.10.2026

### Ark UI e Zag.js

[todos] · MIT · LIBERADO (com exclusões) · pacote npm · dependência nova: **sim** (@zag-js/*)

- **Peças:**
  - `tour`: visita guiada
  - `timer`: cronômetro
  - `steps`: passos
  - `toc`: índice da página
  - `floating-panel`: painel flutuante
  - `carousel`: carrossel [P]
- **Por quê:** Primitivos que o Base UI não tem: passos, índice, cronômetro e painel flutuante.
- **Cuidados:** Os exemplos Ark Plus são pagos e ficam fora; sem estilo e fora da pilha: usar só a peça que falta ao Base UI.
- **Trazer:** `npm install @ark-ui/react@5.39.3`
- **Origem:** [repositório](https://github.com/chakra-ui/ark) · [site](https://ark-ui.com) · último commit em 10.10.2026 · aviso: «Copyright (c) 2024 Chakra Systems Inc.; (c) 2021 Chakra UI» · inventário: `inventario/blocos-e-primitivos.md`

### Cinematic Site Components

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (nenhuma (HTML de arquivo único))

- **Peças:**
  - `curtain-reveal`: revelação em cortina
  - `coverflow`: vitrine em profundidade [P]
  - `image-trail`: imagens que seguem o ponteiro [C]
  - `text-mask`: texto como máscara da imagem
  - `svg-draw`: traço que se desenha
  - `zoom-parallax`: zoom ligado à rolagem [C]
  - `odometer`: odômetro
  - `spotlight-border`: aresta de luz
- **Por quê:** 31 módulos cinematográficos para portar, cada um com um papel claro.
- **Cuidados:** Portar para React. Rolagem ligada em 14 (só Completo); MR 0. Fora: magnetic-grid, particle-button, glitch-effect, typewriter, kinetic-marquee; tirar o Unsplash.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/robonuggets/cinematic-site-components) · último commit em 31.03.2026 · aviso: «© 2026 Jay from RoboLabs» · inventário: `inventario/conferencia-e-lacunas.md`

### Cubby UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (@base-ui/react, embla, motion)

- **Peças:**
  - `Text Morph`: troca de palavra que se transforma
  - `Circular Slider`: controle circular [P]
  - `Tree`: árvore
- **Por quê:** Troca de palavra e controle circular sobre o Base UI, com o movimento reduzido tratado em 89 arquivos.
- **Cuidados:** Oito arquivos de rolagem: só no Completo; embla é dependência nova.
- **Trazer:** `npx shadcn@4.21.0 add @cubby-ui/text-morph --dry-run`
- **Origem:** [repositório](https://github.com/joncoronel/cubby-ui) · [site](https://cubby-ui.dev) · último commit em 10.10.2026 · aviso: «Copyright (c) 2026 joncoronel» · inventário: `inventario/blocos-e-primitivos.md`

### cuicui

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (motion)

- **Peças:**
  - `font-effects`: efeitos tipográficos
  - `text-animation`: animações de texto
  - `transition-wrappers`: invólucros de transição
  - `other/creative-effects`: efeitos criativos
  - `marketing-ui/carousels`: carrosséis [P]
- **Por quê:** Catálogo amplo de efeitos de texto e transição em Motion, para escolher peça a peça.
- **Cuidados:** Catálogo desigual e quase sem movimento reduzido (1 arquivo): acrescentá-lo em cada peça; os cursores ficam fora.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/damien-schneider/cuicui) · [site](https://cuicui.day) · último commit em 11.10.2026 · aviso: «Copyright (c) 2024 Damien Schneider» · inventário: `inventario/colecoes-e-demos.md`

### Eldora UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion; cobe)

- **Peças:**
  - `animated-badge`: etiqueta animada
  - `cobe-globe`: globo em WebGL [C]
- **Por quê:** Fonte pontual de etiqueta e globo; o resto do catálogo serve pouco ao comércio local.
- **Cuidados:** Quase só mockups de aparelho (safari-browser, macbook-pro, iphone-17-pro), que ficam fora; 0 arquivos com movimento reduzido.
- **Trazer:** `npx shadcn@4.21.0 add @eldoraui/animated-badge --dry-run`
- **Origem:** [repositório](https://github.com/karthikmudunuri/eldoraui) · [site](https://eldoraui.site) · último commit em 26.09.2026 · inventário: estudo de 12.10.2026

### Fancy Components

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, Radix, Lenis, matter-js)

- **Peças:**
  - `media-between-text`: mídia entre palavras
  - `element-along-svg-path`: elemento ao longo de caminho
  - `box-carousel`: carrossel em caixa [P]
  - `image-trail`: rastro de imagens [C]
  - `parallax-floating`: imagens flutuantes [C]
- **Por quê:** Texto e imagem compostos com gesto editorial.
- **Cuidados:** Parado desde 14/03/2026; Lenis em dois exemplos; movimento reduzido em só 3 de 74 arquivos; marquee-along-svg-path é faixa sem fim.
- **Trazer:** `npx shadcn@4.21.0 add https://www.fancycomponents.dev/r/media-between-text.json --dry-run`
- **Origem:** [repositório](https://github.com/danielpetho/fancy) · [site](https://www.fancycomponents.dev) · último commit em 14.03.2026 · aviso: «Copyright (c) 2024 Daniel Petho» · inventário: `inventario/registros-shadcn.md`

### Glin UI

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (Radix, Tailwind, motion; @glinui/motion com GSAP)

- **Peças:**
  - `liquid-button`: botão de vidro líquido
  - `magic-card`: luz que segue dentro do cartão
  - `shine-border`: aresta de luz
  - `Glass Dock`: barra de vidro
- **Por quê:** Primitivos de vidro fosco com a procedência registrada peça a peça.
- **Cuidados:** Vetados magnetic-cta e 4 botões que andam; a magnificação do dock cresce no hover (trocar por luz); animated-beam é enfeite.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/GLINCKER/glinui) · [site](https://www.glinui.com) · último commit em 08.10.2026 · aviso: «© 2026 Glincker LLC» · inventário: `inventario/conferencia-e-lacunas.md`

### HextaUI

[todos] · MIT · LIBERADO (com exclusões) · registro shadcn · dependência nova: não (@base-ui/react)

- **Peças:**
  - `componentes`: 65 sobre o Base UI
  - `hooks`: 9 utilitários
- **Por quê:** Coleção sobre o Base UI, base do kit, com 81 arquivos que tratam o movimento reduzido.
- **Cuidados:** Os Pro blocks são pagos e ficam fora.
- **Trazer:** `npx shadcn@4.21.0 add @hextaui/drawer --dry-run`
- **Origem:** [repositório](https://github.com/preetsuthar17/hextaui) · [site](https://hextaui.com) · último commit em 11.10.2026 · aviso: «Copyright (c) 2026 Preet Suthar» · inventário: `inventario/blocos-e-primitivos.md`

### Honest UI

[todos] · MIT · LIBERADO (com exclusões) · registro shadcn · dependência nova: **sim** (motion, three, @react-three/fiber, ogl, Base UI)

- **Peças:**
  - `chromatic-image`: imagem cromática
  - `chromatic-text-reveal`: revelação cromática
  - `action-swap-blur`: troca de ação por desfoque
  - `bouncy-accordion`: acordeão com mola
  - `tilt-card`: inclinação
  - `number-ticker`: número que corre [C]
- **Por quê:** Luz cromática e ação que troca com desfoque.
- **Cuidados:** Excluídos: light-rays.tsx e grainient.tsx (React Bits, Commons Clause) e blinds.tsx. magnetic vetado.
- **Trazer:** `npx shadcn@4.21.0 add @honestui/chromatic-image --dry-run`
- **Origem:** [repositório](https://github.com/honestui/honestui) · [site](https://www.honestui.com) · último commit em 12.10.2026 · aviso: «Copyright (c) 2026 Connor Love» · inventário: `inventario/registros-shadcn.md`

### Hover.dev (peças gratuitas)

[todos] · licença própria · **CONDICIONAL**, só no repositório do cliente · cópia do repositório · dependência nova: não (motion)

- **Peças:**
  - `cards`: cartões animados
  - `links`: vínculos com resposta ao hover
  - `text`: efeitos de texto
  - `heros`: capas
  - `carousels`: carrosséis [P]
  - `three-d`: peças em 3D [P]
- **Por quê:** Vocabulário de interação em Motion, por papel, para a ação, o vínculo e a peça.
- **Cuidados:** Só as peças marcadas free (o resto é Hover Pro, US$ 49); serve ao repositório do cliente, nunca ao kit, porque a licença proíbe a redistribuição como produto avulso.
- **Trazer:** copiar de https://www.hover.dev (só as peças marcadas free)
- **Origem:** [site](https://www.hover.dev) · inventário: `inventario/colecoes-e-demos.md`

### Hyperiux Vault

[todos] · licença própria · **CONDICIONAL**, só no repositório do cliente · cópia do repositório · dependência nova: **sim** (gsap (three e lenis em algumas peças))

- **Peças:**
  - `metallic-button`: botão de metal
  - `chromatic-text`: texto com aberração cromática
  - `variable-text-proximity`: texto variável que responde à proximidade do ponteiro
  - `rectangular-text-reveal`: revelação de texto por retângulos
  - `circular-split-roll`: rolagem circular dividida
  - `chess-grid-transition`: transição em grade de xadrez
  - `infinite-perspective-slider`: trilho em perspectiva [P]
  - `phantom-image-trail`: rastro de imagens junto do ponteiro [C]
- **Por quê:** Matéria metálica e tipografia que responde à mão, com o melhor movimento reduzido do lote.
- **Cuidados:** Serve ao repositório do cliente, nunca ao kit (a licença proíbe boilerplate e starter kit), e só os 59 efeitos gratuitos. GSAP é dependência nova; remover o Lenis e deixar as peças ligadas à rolagem só no Completo.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/Hyperiux-Immersion-Labs/hyperiux-components) · último commit em 07.10.2026 · inventário: `inventario/colecoes-e-demos.md`

### Indie UI

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (motion)

- **Peças:**
  - `catálogo`: peças não extraídas pelo estudo
- **Por quê:** Coleção secundária, MIT, sobre o Motion.
- **Cuidados:** Peças não conferidas; só 1 arquivo trata movimento reduzido.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/alibey-10/indie-ui) · [site](https://ui.indie-starter.dev) · último commit em 07.01.2026 · inventário: estudo de 12.10.2026

### Intent UI

[todos] · MIT · LIBERADO (com exclusões) · registro shadcn · dependência nova: **sim** (react-aria-components, embla, motion)

- **Peças:**
  - `componentes React Aria e Tailwind`: estilizados no padrão shadcn
  - `temas`: conjuntos de tokens
- **Por quê:** A acessibilidade do React Aria já estilizada em Tailwind.
- **Cuidados:** A parte livre dos blocos não foi delimitada: usar só componentes; 11 arquivos de rolagem.
- **Trazer:** `npx shadcn@4.21.0 add @intentui/date-picker --dry-run`
- **Origem:** [repositório](https://github.com/irsyadadl/intentui) · [site](https://intentui.com) · último commit em 13.10.2026 · aviso: «Copyright (c) 2024 Irsyad A. Panjaitan» · inventário: `inventario/blocos-e-primitivos.md`

### jolyui

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, @paper-design/shaders, Radix, matter-js)

- **Peças:**
  - `expanded-map`: mapa que se expande
  - `image-comparison`: comparação [P]
  - `animated-toast`: aviso animado
  - `animated-tooltip`: dica animada
- **Por quê:** Mapa que se expande, útil ao endereço do comércio.
- **Cuidados:** Ícones do Solar em CC BY 4.0 (crédito obrigatório); rainbow-button, glitch-text e animated-beam fora; movimento reduzido em 5 de 46.
- **Trazer:** `npx shadcn@4.21.0 add @jolyui/expanded-map --dry-run`
- **Origem:** [repositório](https://github.com/Johuniq/jolyui) · [site](https://www.jolyui.dev) · último commit em 07.10.2026 · aviso: «Copyright (c) 2025 Johuniq» · inventário: `inventario/registros-shadcn.md`

### Kibo UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não

- **Peças:**
  - `catálogo`: componentes de função, não de efeito
- **Por quê:** Componentes de função bem resolvidos para o que o site faz.
- **Cuidados:** Peças não listadas pelo estudo; movimento reduzido não contado.
- **Trazer:** `npx shadcn@4.21.0 add @kibo-ui/<item> --dry-run`
- **Origem:** [repositório](https://github.com/shadcnblocks/kibo) · [site](https://www.kibo-ui.com) · último commit em 04.05.2026 · inventário: estudo de 12.10.2026

### Kinetiq

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (motion, three, @react-three/fiber)

- **Peças:**
  - `accordion-pleat`: acordeão plissado
  - `book-spines`: lombadas de livro
  - `bookend-type`: tipo entre suportes
  - `chrome-ink`: tinta cromada
  - `color-fold`: dobra de cor
  - `combo-dials`: discos de combinação
  - `block-fold`: bloco que dobra
  - `burning-glass`: vidro em brasa
- **Por quê:** 400 peças sobre cinco molas calibradas, com movimento reduzido amplo.
- **Cuidados:** Muitos itens de painel; confetti-pop e disco-floor são catálogo; WebGL e rolagem só no Completo.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/Dragoon0x/kinetiq) · [site](https://www.kinetiqui.com) · último commit em 12.10.2026 · aviso: «Copyright (c) 2026 Dragoon (0xDragoon)» · inventário: `inventario/registros-shadcn.md`

### Kokonut UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion)

- **Peças:**
  - `smooth-drawer`: gaveta suave
  - `smooth-tab`: abas com transição suave
  - `spotlight-cards`: cartões com luz sob o ponteiro
  - `card-flip`: cartão que vira [P]
  - `card-stack`: pilha de cartões
  - `sliced-text`: texto fatiado no hover
  - `mouse-effect-card`: cartão com luz do ponteiro
  - `carousel-cards`: cartões em carrossel [P]
- **Por quê:** Gavetas e abas bem resolvidas para a interface no mundo da marca.
- **Cuidados:** attract-button faz o botão andar: vetado; background-paths e liquid-glass-card tendem ao genérico. Ícones do Solar em CC BY 4.0 (crédito obrigatório) no site; attract-button vetado; glitch-text, matrix-text e particle-button fora.
- **Trazer:** `npx shadcn@4.21.0 add @kokonutui/smooth-drawer --dry-run`
- **Origem:** [repositório](https://github.com/kokonut-labs/kokonutui) · [site](https://kokonutui.com) · último commit em 12.10.2026 · inventário: `inventario/registros-shadcn.md`; estudo de 12.10.2026

### Lightswind UI

[todos] · MIT · LIBERADO (com exclusões) · cópia do repositório · dependência nova: não (motion (gsap, three/ogl e lenis em algumas peças))

- **Peças:**
  - `glass-folder`: pasta de vidro
  - `3d-perspective-card`: cartão em perspectiva sob o ponteiro
  - `reflect-background`: fundo com reflexo
  - `looping-words`: troca de palavra em laço
  - `rolling-text-3d`: texto que rola em 3D
  - `3d-image-ring`: anel de imagens em 3D [P]
  - `lens`: lupa sobre a imagem [P]
  - `image-trail-effect`: rastro de imagens junto do ponteiro [C]
- **Por quê:** Vidro, reflexo e objetos em perspectiva que dão luz e profundidade à peça.
- **Cuidados:** A peça plasma-globe adapta shader no estilo Shadertoy e fica fora, como os fundos de catálogo (cosmic, nebula, hell-background). Trocar as imagens do Unsplash e do Pexels, remover o Lenis e acrescentar o movimento reduzido (2 arquivos).
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/codewithMUHILAN/Lightswind-UI-Library) · [site](https://lightswind.com) · último commit em 24.07.2026 · aviso: «Copyright (c) 2025 Muhilan» · inventário: `inventario/colecoes-e-demos.md`

### Magic UI

[todos] · MIT · LIBERADO (com exclusões) · registro shadcn · dependência nova: **sim** (motion, Radix, cobe)

- **Peças:**
  - `number-ticker`: número que corre [C]
  - `blur-fade`: entrada por desfoque
  - `magic-card`: cartão com luz
  - `lens`: lente de zoom
  - `highlighter`: marca-texto
  - `progressive-blur`: desfoque progressivo
  - `hero-video-dialog`: vídeo da capa em diálogo
  - `noise-texture`: textura de ruído
  - `number-ticker`: número que conta até o valor [C]
  - `highlighter`: marca-texto desenhado sobre a palavra
- **Por quê:** Peças maduras de luz, lente e entrada.
- **Cuidados:** Pro pago; meteors, sparkles-text, retro-grid, confetti, border-beam e particles são catálogo. O Magic UI Pro é pago e fica fora; meteors, sparkles-text, retro-grid, confetti, marquee, border-beam e shine-border são slop. Só 5 de 329 arquivos tratam movimento reduzido.
- **Trazer:** `npx shadcn@4.21.0 add @magicui/number-ticker --dry-run`
- **Origem:** [repositório](https://github.com/magicuidesign/magicui) · [site](https://magicui.design) · último commit em 11.10.2026 · aviso: «Copyright (c) Magic UI» · inventário: `inventario/registros-shadcn.md`; estudo de 12.10.2026

### MicroKit

[todos] · MIT · LIBERADO (com exclusões) · registro shadcn · dependência nova: não (nenhuma (CSS ou Tailwind; lucide-react em 23 peças))

- **Peças:**
  - `sliding-underline-tabs`: abas com sublinhado que desliza
  - `gradient-underline-button`: botão com sublinhado em degradê
  - `outline-wipe-button`: botão com contorno que se preenche
  - `staggered-letter-text-swap`: troca de texto escalonada
  - `view-more-text-swap`: troca do rótulo «ver mais»
  - `spotlight-indicator`: indicador com luz
  - `focus-input`: campo com foco desenhado
  - `scrub-number-field`: campo numérico de arrastar [P]
- **Por quê:** Microinterações em CSS puro para a ação, o vínculo e o campo, com bom movimento reduzido.
- **Cuidados:** O Grainient é cópia do React Bits (CONDICIONAL) e fica fora; o FAQ admite peças adaptadas de exemplos públicos e de exportações do Webflow, então conferir a origem de cada uma. magnetic-fill-button e cursor-follow-share-button ferem o botão que não anda.
- **Trazer:** `npx shadcn@4.21.0 add @microkit/sliding-underline-tabs --dry-run`
- **Origem:** [repositório](https://github.com/henriquegpb/microkit) · [site](https://microkit.co) · último commit em 28.09.2026 · aviso: «Copyright (c) 2026 Henrique Barone» · inventário: `inventario/colecoes-e-demos.md`

### Motion Lexicon

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, GSAP, three, @react-three/fiber)

- **Peças:**
  - `image-lightbox`: lightbox [P]
  - `coverflow-gallery`: galeria em coverflow [P]
  - `chromatic-image`: imagem cromática
  - `split-text-reveal`: revelação de texto
  - `text-morph`: texto que se transforma
  - `metric-ticker`: número que corre
  - `page-transition-stack`: transição de página
  - `primitive-3d-tilt-flip`: inclinação e giro 3D [P]
- **Por quê:** Vocabulário de movimento com caminhos de movimento reduzido em 264 arquivos.
- **Cuidados:** Textos e dados em CC BY 4.0 (NOTICE); magnetic-action vetado em botão; WebGL e rolagem só no Completo.
- **Trazer:** `npx shadcn@4.21.0 add @motion-lexicon/image-lightbox --dry-run`
- **Origem:** [repositório](https://github.com/Ryan-yang125/motion-lexicon) · [site](https://motion-lexicon.pages.dev) · último commit em 19.08.2026 · aviso: «Copyright (c) 2026 Motion Lexicon contributors» · inventário: `inventario/registros-shadcn.md`

### Olyx UI

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: **sim** (@base-ui/react, react-aria-components)

- **Peças:**
  - `sistema de cor HCT`: rampas tonais
  - `gerador de tema`: tokens próprios
- **Por quê:** Ferramenta de cor: gera rampas tonais HCT para o campo de cor da marca.
- **Cuidados:** CSS nativo, fora do Tailwind: aproveitar o método de cor, não os componentes.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/ramo4040/olyx-ui) · [site](https://olyxui.com) · último commit em 04.07.2026 · aviso: «Copyright (c) 2026 Yassir Rouane» · inventário: `inventario/blocos-e-primitivos.md`

### React Bits

[todos] · MIT + Commons Clause · **CONDICIONAL**, só no repositório do cliente · registro shadcn · dependência nova: **sim** (motion, GSAP, three, @react-three/fiber, ogl, Lenis, matter-js)

- **Peças:**
  - `GlareHover`: reflexo no hover
  - `GradualBlur`: desfoque gradual
  - `SpotlightCard`: cartão com luz
  - `AccordionGallery`: galeria em acordeão
  - `Counter`: contador [C]
  - `ImageTrail`: rastro de imagens [C]
  - `LiquidChrome`: cromo líquido [C]
  - `Silk`: seda [C]
  - `ImageTrail`: imagem que segue o ponteiro [C]
  - `GlareHover`: reflexo de luz no hover
- **Por quê:** Acervo amplo de luz e imagem para o repositório do cliente.
- **Cuidados:** Commons Clause: só no repositório do cliente, nunca no kit. LightRays e PixelBlast fora (Shadertoy); Lenis em um arquivo; Magnet e HoloCard fora. Só no repositório do cliente, nunca no kit. Magnet, TargetCursor e BlobCursor ficam fora; WebGL e GSAP só no Completo, medidos na barreira do travamento.
- **Trazer:** `npx shadcn@4.21.0 add @react-bits/GlareHover --dry-run`
- **Origem:** [repositório](https://github.com/DavidHDev/react-bits) · [site](https://reactbits.dev) · último commit em 12.10.2026 · aviso: «Copyright (c) 2026 David Haz» · inventário: `inventario/registros-shadcn.md`; estudo de 12.10.2026

### Ruixen UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, GSAP, three, @react-three/fiber, ogl, Radix, React Aria, Lenis, cobe)

- **Peças:**
  - `accordion-editorial`: acordeão editorial
  - `accordion-indexed`: acordeão indexado
  - `image-card-fan`: leque de cartões
  - `perspective-text`: texto em perspectiva
  - `variable-text`: texto variável
  - `animated-number-flip`: número que vira
  - `coverflow-carousel`: coverflow [P]
  - `receding-text-plane`: plano de texto que recua [C]
- **Por quê:** Acordeões editoriais e texto em perspectiva.
- **Cuidados:** Pro pago; Lenis em um arquivo; scroll-burn-text, particle-text-dots e confetti-button fora; o índice está em /registry.json, não em /r/.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/ruixenui/ruixen.com) · [site](https://ruixen.com) · último commit em 12.09.2026 · aviso: «Copyright (c) 2025 Ruixen UI» · inventário: `inventario/registros-shadcn.md`

### ScrollX UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion (three em 3 arquivos))

- **Peças:**
  - `card-tilt`: cartão que inclina sob o ponteiro
  - `lustretext`: texto com brilho de lustro
  - `layered-text`: texto em camadas
  - `text-spotlight`: luz que percorre o texto
  - `expandable-cards`: cartões que se expandem
  - `flipstack`: pilha de cartões que vira [P]
  - `cursorimagetrail`: rastro de imagens junto do ponteiro [C]
- **Por quê:** Inclinação, lustro e camadas de texto que dão luz e relevo à peça.
- **Cuidados:** Movimento reduzido baixo (6 arquivos); meteor-orbit, venom-beam e bolt-strike são catálogo e ficam fora.
- **Trazer:** `npx shadcn@4.21.0 add @scrollxui/card-tilt --dry-run`
- **Origem:** [repositório](https://github.com/Adityakishore0/ScrollX-UI) · [site](https://scrollxui.dev) · último commit em 09.06.2026 · aviso: «Copyright (c) 2025 Ahdeetai» · inventário: `inventario/colecoes-e-demos.md`

### Smooth UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, GSAP, Radix)

- **Peças:**
  - `book`: livro
  - `hover-image-list`: lista com imagem no hover
  - `aperture-blur-transition`: transição de diafragma
  - `focus-blur-resolve`: foco que resolve
  - `mask-reveal-up`: revelação por máscara
  - `liquid-metal`: metal líquido
  - `coverflow-carousel`: coverflow [P]
  - `cursor-image-trail`: rastro de imagens [C]
  - `catálogo`: lista de peças não extraída pelo estudo; escolher pelo site
- **Por quê:** A melhor cobertura de movimento reduzido (513 arquivos) com peças de luz e livro.
- **Cuidados:** magnetic-button vetado; dez arquivos ligados à rolagem só no Completo; emoji-reaction e holographic-foil são catálogo.
- **Trazer:** `npx shadcn@4.21.0 add @smoothui/book --dry-run`
- **Origem:** [repositório](https://github.com/educlopez/smoothui) · [site](https://smoothui.dev) · último commit em 24.09.2026 · aviso: «Copyright (c) 2024 Eduardo Calvo» · inventário: `inventario/registros-shadcn.md`; estudo de 12.10.2026

### Space UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, GSAP, three, @react-three/fiber, @paper-design/shaders, Base UI, number-flow)

- **Peças:**
  - `components-spaceui-detachable-accordion`: acordeão destacável
  - `components-spaceui-gooey-text-reveal`: texto que se revela líquido
  - `components-spaceui-liquid-metal-border`: borda de metal líquido [C]
  - `components-shader-silk-gradient`: degradê de seda [C]
  - `components-shader-liquid-mask-crossfade`: troca líquida de imagem [C]
  - `block-lens-carousel`: carrossel com lente [P]
  - `block-prism-carousel`: carrossel em prisma [P]
- **Por quê:** Metal líquido, seda e lente num acervo de 1.149 itens.
- **Cuidados:** WebGL só no Completo; rainbow-glow e capability-matrix são catálogo.
- **Trazer:** `npx shadcn@4.21.0 add @spaceui/components-spaceui-detachable-accordion --dry-run`
- **Origem:** [repositório](https://github.com/usespaceui/ui) · [site](https://www.spaceui.one) · último commit em 11.10.2026 · aviso: «Copyright (c) 2026 Space UI» · inventário: `inventario/registros-shadcn.md`

### Spell UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion)

- **Peças:**
  - `highlighted-text`: marca-texto e tarja
  - `perspective-book`: livro em perspectiva [P]
  - `tilt-card`: inclinação [C]
  - `shimmer-text`: brilho do texto [C]
  - `copy-button`: copiar [P]
- **Por quê:** Já adaptado no kit, em producao/gestos/: um gesto de marca por site.
- **Cuidados:** Já adaptado no kit. Light Rays (three.js), Signature (opentype.js), marquee, words-stagger e blur-reveal ficaram de fora de propósito.
- **Trazer:** `npx shadcn@4.21.0 add @spell/tilt-card --dry-run`
- **Origem:** [repositório](https://github.com/xxtomm/spell-ui) · [site](https://spell.sh) · último commit em 10.10.2026 · inventário: estudo de 12.10.2026

### SyntaxUI

[todos] · MIT · LIBERADO (com exclusões) · cópia do repositório · dependência nova: não (motion)

- **Peças:**
  - `catálogo`: peças não extraídas pelo estudo
- **Por quê:** Coleção secundária gratuita, MIT.
- **Cuidados:** O SyntaxUI Pro é pago e fica fora; 0 arquivos com movimento reduzido.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/SyntaxUI/syntaxui) · [site](https://syntaxui.com) · último commit em 18.05.2026 · inventário: estudo de 12.10.2026

### TailGrids (componentes)

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (react-aria-components, @base-ui/react, embla, framer-motion)

- **Peças:**
  - `time-picker`: seletor de horário
  - `date-picker`: seletor de data
  - `range-calendar`: calendário de intervalo
  - `otp-input`: código
  - `drawer`: gaveta
  - `sheet`: folha
  - `carousel`: carrossel [P]
  - `navigation-menu`: menu
- **Por quê:** Seletores de data e horário prontos, úteis à Agenda.
- **Cuidados:** Nenhum bloco de marketing é livre (os 500+ são pagos); retratos do randomuser saem; trocar framer-motion por motion.
- **Trazer:** `npx shadcn@4.21.0 add @tailgrids/time-picker --dry-run`
- **Origem:** [repositório](https://github.com/tailgrids/tailgrids) · [site](https://tailgrids.com) · último commit em 04.08.2026 · aviso: «Copyright (c) 2025 Tailgrids» · inventário: `inventario/blocos-e-primitivos.md`

### UI Beats

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (motion)

- **Peças:**
  - `fade-in-unblur`: entrada que tira o desfoque
  - `expandable-card`: cartão que se expande
  - `animated-list`: lista animada
  - `card-stack`: pilha de cartões [P]
  - `comparison-slider`: comparação de imagens [P]
- **Por quê:** Entradas e cartões discretos em Motion, com bom movimento reduzido (54 arquivos).
- **Cuidados:** aurora, border-beam e dock são catálogo e ficam fora.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/nikhils4/ui-beats) · último commit em 16.08.2026 · aviso: «Copyright (c) UI Beats» · inventário: `inventario/colecoes-e-demos.md`

### UI Layouts

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: não (motion (gsap e three/R3F em algumas peças))

- **Peças:**
  - `image-reveal`: revelação de imagem
  - `clip-path`: revelação por máscara
  - `noise-effect`: grão sobre a superfície
  - `spotlight-cards`: cartões com luz que segue o ponteiro
  - `liquid-glass`: vidro líquido
  - `motion-number`: número animado [P]
  - `mousetrail`: rastro de imagens junto do ponteiro [C]
  - `timeline-animation`: linha do tempo animada [C]
- **Por quê:** Revelações, grão, luz e vidro que traduzem a matéria da marca.
- **Cuidados:** Trocar as imagens do Unsplash apontadas por URL e remover o Lenis; o movimento reduzido é fraco (2 arquivos), e peça com gsap ou three é dependência nova.
- **Trazer:** `npx shadcn@4.21.0 add @ui-layouts/image-reveal --dry-run`
- **Origem:** [repositório](https://github.com/naymurdev/uilayout) · [site](https://ui-layouts.com) · último commit em 23.08.2026 · aviso: «MIT License Copyright (c) 2024 UI LAYOUT» · inventário: `inventario/colecoes-e-demos.md`

### Untitled UI React (repositório aberto)

[todos] · MIT · LIBERADO (com exclusões) · cópia do repositório · dependência nova: **sim** (react-aria-components, react-aria, motion, embla-carousel-react, @untitledui/icons)

- **Peças:**
  - `components/base`: botões, campos, select, slider, toggle, tags
  - `carousel`: carrossel [P]
  - `slideout-menus`: menus laterais
  - `modals`: diálogos
  - `date-picker`: seletor de data
  - `file-upload`: envio de arquivo
  - `background-patterns`: padrões de fundo
- **Por quê:** Estados completos do React Aria em botões e campos, com padrões de fundo.
- **Cuidados:** Só o repositório é MIT: o marketing e o Untitled UI PRO ficam fora, porque a licença PRO proíbe expor a fonte; estética de SaaS e só 1 arquivo trata o movimento reduzido.
- **Trazer:** copiar components/base/ e components/application/ de untitleduico/react
- **Origem:** [repositório](https://github.com/untitleduico/react) · [site](https://untitledui.com/react) · último commit em 09.10.2026 · aviso: «Copyright (c) 2025 Untitled UI» · inventário: `inventario/blocos-e-primitivos.md`

### usva

[todos] · MIT + Commons Clause · **CONDICIONAL**, só no repositório do cliente · registro shadcn · dependência nova: **sim** (motion, ogl, Base UI)

- **Peças:**
  - `knob`: botão giratório
  - `hint-popover`: dica em balão
  - `feature-carousel`: carrossel [P]
  - `reveal`: revelação
  - `temas`: 3 temas sobre um só conjunto de tokens
- **Por quê:** Botão giratório e tema atmosférico.
- **Cuidados:** Só no repositório do cliente; rolagem e WebGL só no Completo. Commons Clause: serve ao repositório do cliente, nunca ao kit.
- **Trazer:** `npx shadcn@4.21.0 add @usva/knob --dry-run`
- **Origem:** [repositório](https://github.com/matt-pasek/usva) · [site](https://usva.build) · último commit em 03.08.2026 · aviso: «Copyright (c) 2026 Mateusz Pasek» · inventário: `inventario/registros-shadcn.md`; `inventario/blocos-e-primitivos.md`

### Velora UI (Colorlib)

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, Radix)

- **Peças:**
  - `direction-aware-hover`: hover que segue a direção
  - `lens`: lente de zoom
  - `noise-background`: fundo com ruído
  - `compare-slider`: comparação [P]
  - `apple-cards-carousel`: carrossel de cartões [P]
  - `number-ticker`: número que corre [C]
- **Por quê:** Peças de hover e lente com boa cobertura de movimento reduzido.
- **Cuidados:** Muitos nomes repetem o Aceternity e o Magic UI: conferir a origem de cada peça. magnetic-button vetado.
- **Trazer:** `npx shadcn@4.21.0 add @velora/direction-aware-hover --dry-run`
- **Origem:** [repositório](https://github.com/ColorlibHQ/velora-ui) · [site](https://velora.colorlib.com) · último commit em 30.09.2026 · aviso: «Copyright (c) 2026 Aigars Silkalns» · inventário: `inventario/registros-shadcn.md`

### VengeanceUI

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (motion (gsap e three/ogl em algumas peças))

- **Peças:**
  - `liquid-text`: texto líquido
  - `team-reveal-grid`: grade da equipe que se revela
  - `interactive-book`: livro interativo [P]
  - `books-showcase`: estante de livros [P]
  - `perspective-carousel`: carrossel em perspectiva [P]
  - `liquid-metal`: metal líquido [C]
  - `ripple-displacement-slider`: trilho com ondulação por deslocamento [C]
  - `image-trail`: rastro de imagens junto do ponteiro [C]
- **Por quê:** Objetos de papel (livro, estante) e metal líquido que traduzem a matéria da marca.
- **Cuidados:** Movimento reduzido baixo (7 arquivos); aurora-hero, cyber-glitch-text e creepy-button são catálogo. Peça com gsap, three ou ogl é dependência nova.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/Ashutoshx7/VengeanceUI) · último commit em 12.10.2026 · aviso: «Copyright (c) 2025-2026 Ashutoshx7» · inventário: `inventario/colecoes-e-demos.md`

### Vengence UI

[todos] · MIT · LIBERADO · registro shadcn · dependência nova: **sim** (motion, GSAP, three, @react-three/fiber, @paper-design/shaders, Radix, Lenis)

- **Peças:**
  - `interactive-book`: livro interativo [P]
  - `image-reveal-list`: lista que revela imagem
  - `line-hover-link`: vínculo com linha
  - `morphing-disclosure`: revelação que se transforma
  - `liquid-text`: texto líquido
  - `liquid-metal`: metal líquido [C]
  - `perspective-carousel`: carrossel em perspectiva [P]
  - `image-scatter`: imagens que se espalham
- **Por quê:** Livro, vínculo com linha e metal líquido.
- **Cuidados:** Lenis em dois arquivos; movimento reduzido em 13 de 71; cyber-glitch-text, ascii-glitch-ripple e awwwards-nav são catálogo.
- **Trazer:** `npx shadcn@4.21.0 add https://www.vengenceui.com/r/interactive-book.json --dry-run`
- **Origem:** [repositório](https://github.com/Ashutoshx7/VengenceUI) · [site](https://www.vengenceui.com) · último commit em 12.10.2026 · aviso: «Copyright (c) 2025-2026 Ashutoshx7» · inventário: `inventario/registros-shadcn.md`

### Viberdy

[todos] · MIT + Commons Clause · **CONDICIONAL**, só no repositório do cliente · registro shadcn · dependência nova: não (motion)

- **Peças:**
  - `grain-overlay`: camada de grão
  - `odometer-counter`: odômetro [C]
  - `line-mask-reveal`: revelação por linha
  - `stacked-type-hero`: capa tipográfica empilhada
  - `masonry-image-hover-grid`: grade de imagens
  - `card-carousel-3d`: carrossel 3D [P]
- **Por quê:** Grão e odômetro para o site do cliente.
- **Cuidados:** A cláusula permite site para cliente; 239 de 404 itens pagos; magnetic-button, liquid-blob-cursor e glitch-text-hover fora.
- **Trazer:** `npx shadcn@4.21.0 add @viberdy/grain-overlay --dry-run`
- **Origem:** [repositório](https://github.com/viberdy-dev/ui) · [site](https://viberdy.dev) · último commit em 05.10.2026 · aviso: «Copyright (c) 2026 viberdy.dev» · inventário: `inventario/registros-shadcn.md`

### Vysmo

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@vysmo/*)

- **Peças:**
  - `flipbook`: livro que se folheia [P]
  - transições WebGL [C]
  - curvas
- **Por quê:** Livro que se folheia e transições.
- **Cuidados:** Jovem (9★).
- **Trazer:** `npm install @vysmo/react`
- **Origem:** [repositório](https://github.com/vysmodev/vysmo) · [site](https://vysmo.com) · último commit em 20.05.2026 · aviso: «© 2026 Maesto LLC» · inventário: `inventario/conferencia-e-lacunas.md`

### Web Awesome (versão gratuita)

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (Lit)

- **Peças:**
  - `skeleton`: esqueleto de carga
  - `rating`: avaliação
  - `qr-code`: código QR
  - `drawer`: gaveta
  - `comparison`: antes e depois [P]
  - `zoomable-frame`: moldura com zoom [P]
  - `carousel`: carrossel [P]
  - `progress-ring`: anel de progresso [P]
- **Por quê:** Funcionalidades bem resolvidas como custom elements, que funcionam no React 19.
- **Cuidados:** Só os componentes do pacote livre (o Pro é pago); mapear os tokens da marca e fixar a versão (3.14.0 em 01/10/2026).
- **Trazer:** ``
- **Origem:** [repositório](https://github.com/shoelace-style/webawesome) · [site](https://webawesome.com) · último commit em 01.10.2026 · aviso: «Copyright (c) 2023 Fonticons, Inc.» · inventário: `inventario/colecoes-e-demos.md`

---

## 16. Motores e utilitários de movimento

Os motores e os utilitários. O Motion é da pilha; os outros são dependência nova. O CSS de animação de terceiros entra como CSS próprio, com o prefixo do site e o movimento reduzido.

### anime.js ★

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (animejs)

- **Peças:**
  - `text/split`: divisão de texto (o equivalente gratuito do splitText)
  - `svg/morphto`: morph de SVG
  - `svg/drawable`: traço que se desenha
  - `layout`: transição de leiaute
  - `draggable`: arrasto com física
  - `timeline`: coreografia
- **Por quê:** Segundo motor ao lado do Motion, com o que o Motion+ cobra.
- **Cuidados:** O movimento reduzido fica por conta de quem usa; animar só transform e opacity; text/scramble é sinal genérico.
- **Trazer:** `npm install animejs@4.5.0`
- **Origem:** [repositório](https://github.com/juliangarnier/anime) · último commit em 22.06.2026 · inventário: `inventario/pacotes-de-efeito.md`

### Motion ★

[todos] · MIT · LIBERADO · pacote npm · dependência nova: não (motion)

- **Peças:**
  - `motion/react-mini`: useAnimate leve, o uso do kit
- **Por quê:** O motor da pilha, de que quase toda coleção depende.
- **Cuidados:** O kit fixa o Motion 13.4 e só o react-mini; a 14.1.0 é versão maior. MotionConfig reducedMotion="user" na raiz; o Motion+ é pago e fica fora.
- **Trazer:** `npm install motion@14.1.0`
- **Origem:** [repositório](https://github.com/motiondivision/motion) · [site](https://motion.dev) · último commit em 09.10.2026 · inventário: estudo de 12.10.2026

### @formkit/auto-animate

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@formkit/auto-animate)

- **Peças:**
  - `auto-animate`: transição automática quando a lista muda
- **Por quê:** Filtro de cardápio ou galeria que se reorganiza com passagem.
- **Cuidados:** Trata movimento reduzido; só transform e opacity.
- **Trazer:** `npm install @formkit/auto-animate@0.10.0`
- **Origem:** [repositório](https://github.com/formkit/auto-animate) · último commit em 10.07.2026 · inventário: `inventario/pacotes-de-efeito.md`

### @svgdotjs/svg.js

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@svgdotjs/svg.js)

- **Peças:**
  - `svg.js`: manipulação e animação de SVG
- **Por quê:** Assinatura em SVG construída por código.
- **Cuidados:** Não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install @svgdotjs/svg.js@3.2.8`
- **Origem:** [repositório](https://github.com/svgdotjs/svg.js) · último commit em 04.08.2026 · inventário: `inventario/pacotes-de-efeito.md`

### @use-gesture/react

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@use-gesture/react)

- **Peças:**
  - `use-gesture`: arrastar, pinçar e rolar
- **Por quê:** O primitivo do gesto para peças que respondem à mão.
- **Cuidados:** Parado desde 2024, maduro; não anima sozinho.
- **Trazer:** `npm install @use-gesture/react@10.3.1`
- **Origem:** [repositório](https://github.com/pmndrs/use-gesture) · último commit em 21.03.2024 · inventário: `inventario/pacotes-de-efeito.md`

### @wix/motion

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@wix/motion)

- **Peças:**
  - `@wix/motion`: motor de efeitos (entrada, ponteiro, laço)
- **Por quê:** Motor de efeitos com movimento reduzido tratado.
- **Cuidados:** Sem LICENSE no pacote (repositório MIT); a rolagem só no Completo; presets tendem ao catálogo.
- **Trazer:** `npm install @wix/motion@2.1.15`
- **Origem:** [repositório](https://github.com/wix/interact) · último commit em 21.09.2026 · inventário: `inventario/pacotes-de-efeito.md`

### Animate.css 4.1.1 (npm)

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (animate.css)

- **Peças:**
  - `fadeIn`: entrada por opacidade
  - `fadeInUp`: entrada que sobe
  - `zoomIn`: entrada por escala
  - `backIn*`: entradas com recuo
- **Por quê:** Base pronta de entradas e saídas em CSS, que já reduz as durações sob movimento reduzido.
- **Cuidados:** A versão fica fixa em 4.1.1, sem ^, e nunca se copia do main do GitHub, que está sob a Hippocratic 2.1 desde 13/09/2021; manter o aviso MIT. Só as entradas e saídas discretas: as «attention seekers» (bounce, tada, wobble) são catálogo.
- **Trazer:** `npm install animate.css@4.1.1`
- **Origem:** [repositório](https://github.com/animate-css/animate.css) · [site](https://animate.style) · último commit em 07.09.2020 · aviso: «Copyright (c) 2020 Daniel Eden» · inventário: `inventario/conferencia-e-lacunas.md`

### Animista

[todos] · BSD-2-Clause · LIBERADO · CSS · dependência nova: não

- **Peças:**
  - `entradas`: animações de entrada
  - `saídas`: animações de saída
  - `texto`: animações de texto
- **Por quê:** Gerador de keyframes em CSS para a entrada orquestrada, sem script.
- **Cuidados:** Manter o aviso BSD no CSS gerado; bounce, wobble e outros efeitos datados ficam fora.
- **Trazer:** copiar o CSS gerado em https://animista.net
- **Origem:** [site](https://animista.net) · aviso: «Copyright 2017 Ana Travas» · inventário: `inventario/colecoes-e-demos.md`

### AnimXYZ

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@animxyz/core (CSS; @animxyz/react@0.6.9 como invólucro))

- **Peças:**
  - `xyz`: entradas e saídas compostas por variável (xyz="fade small stagger")
- **Por quê:** Entradas orquestradas e componíveis em CSS, leves e sem script.
- **Cuidados:** Definir a curva e a duração da marca.
- **Trazer:** `npm install @animxyz/core@0.6.7`
- **Origem:** [repositório](https://github.com/ingram-projects/animxyz) · [site](https://animxyz.com) · último commit em 27.09.2026 · aviso: «Copyright (c) 2019-present Ingram Projects» · inventário: `inventario/colecoes-e-demos.md`

### flubber

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (flubber)

- **Peças:**
  - `flubber`: metamorfose suave entre formas SVG de pontos diferentes
- **Por quê:** Morph de forma para assinatura em SVG.
- **Cuidados:** Parado desde 2018, estável; 17,7 KB gz; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install flubber@0.4.2`
- **Origem:** [repositório](https://github.com/veltman/flubber) · último commit em 01.03.2018 · inventário: `inventario/pacotes-de-efeito.md`

### GSAP (com SplitText e MorphSVG)

[todos] · licença própria · **CONDICIONAL**, só no repositório do cliente · pacote npm · dependência nova: **sim** (gsap)

- **Peças:**
  - `gsap`: motor de animação, com SplitText, ScrollTrigger e MorphSVG
- **Por quê:** Resolve o morfismo de SVG e a divisão de texto quando o Motion não basta.
- **Cuidados:** Licença da Webflow: gratuita em site de cliente, vedada em ferramenta concorrente; só no repositório do cliente, com a licença registrada. ScrollSmoother vetado (inércia); ligado à rolagem só no Completo; usar gsap.matchMedia para movimento reduzido.
- **Trazer:** `npm install gsap@3.15.0`
- **Origem:** [site](https://gsap.com) · último commit em 13.04.2026 · inventário: estudo de 12.10.2026

### Open Props

[todos] · MIT · LIBERADO · CSS · dependência nova: **sim**

- **Peças:**
  - `easings`: curvas, inclusive elásticas
  - `animations`: animações prontas
  - `noise`: ruído em CSS
  - `tokens`: curvas, animações, sombras e tipografia em CSS
- **Por quê:** Curvas e durações prontas em CSS.
- **Cuidados:** Tokens de cor nomeiam a cor, contra a regra: usar só curvas, durações e animações.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/argyleink/open-props) · [site](https://open-props.style) · último commit em 11.10.2026 · aviso: «© 2021 Adam Argyle» · inventário: `inventario/conferencia-e-lacunas.md`; estudo de 12.10.2026

### react-transition-state

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-transition-state)

- **Peças:**
  - `react-transition-state`: estado de entrada e saída em hook
- **Por quê:** Entrada e saída por CSS sem motor.
- **Cuidados:** Não anima sozinho; não trata movimento reduzido (desligar com motion-reduce).
- **Trazer:** `npm install react-transition-state@2.4.0`
- **Origem:** [repositório](https://github.com/szhsin/react-transition-state) · último commit em 14.05.2026 · inventário: `inventario/pacotes-de-efeito.md`

### TailMotion

[todos] · MIT · LIBERADO · CSS · dependência nova: **sim** (Tailwind)

- **Peças:**
  - `entradas e ênfases`: utilitários com propósito
  - `scroll.css`: rolagem ligada [C]
- **Por quê:** Movimento em Tailwind com MR (29).
- **Cuidados:** Módulo de rolagem só no Completo.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/moumen-soliman/tailmotion) · [site](https://tailmotion.moumen.dev/) · último commit em 02.09.2026 · aviso: «© 2026 tailmotion» · inventário: `inventario/conferencia-e-lacunas.md`

### tailwindcss-motion

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (tailwindcss-motion)

- **Peças:**
  - `tailwindcss-motion`: animações em classes, com variantes de movimento reduzido
- **Por quê:** Entrada orquestrada só em CSS, servindo a Server Components.
- **Cuidados:** Esmaecer e subir em toda seção é sinal genérico.
- **Trazer:** `npm install tailwindcss-motion@1.1.1`
- **Origem:** [repositório](https://github.com/romboHQ/tailwindcss-motion) · último commit em 10.06.2025 · inventário: `inventario/pacotes-de-efeito.md`

### tailwindcss-spring

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (tailwindcss-spring)

- **Peças:**
  - `tailwindcss-spring`: molas em CSS via linear()
- **Por quê:** Mola sem script, nos tokens de curva.
- **Cuidados:** Parado desde 08/2024, estável; mola sem quique.
- **Trazer:** `npm install tailwindcss-spring@1.0.1`
- **Origem:** [repositório](https://github.com/KevinGrajeda/tailwindcss-spring) · último commit em 15.08.2024 · inventário: `inventario/pacotes-de-efeito.md`

### Theatre.js (núcleo)

[todos] · Apache-2.0 · LIBERADO · pacote npm · dependência nova: **sim** (@theatre/core)

- **Peças:**
  - `@theatre/core`: toca as animações coreografadas
  - `@theatre/r3f`: ligação com o R3F [C]
- **Por quê:** Coreografia fina de cena, desenhada num editor e tocada pelo núcleo.
- **Cuidados:** O @theatre/studio é AGPL: só no desenvolvimento, nunca no pacote final; o campo repository do npm aponta para o repositório antigo, AGPL; repositório público parado desde 08/2024.
- **Trazer:** `npm install @theatre/core@0.7.2`
- **Origem:** [repositório](https://github.com/theatre-js/theatre) · último commit em 19.05.2024 · inventário: `inventario/pacotes-de-efeito.md`

### transition.css

[todos] · Apache-2.0 · LIBERADO · CSS · dependência nova: não

- **Peças:**
  - `circle`: revelação em círculo por clip-path
  - `diamond`: revelação em losango
  - `curtain`: revelação em cortina
  - `wipe`: revelação por varredura
- **Por quê:** Revelação por máscara em CSS, para a revelação que é o momento de uma cena, nunca a mesma em todas (`../esteira/20-repeticao-dentro-do-site.md`).
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/argyleink/transition.css) · [site](https://transition.style) · último commit em 16.06.2025 · inventário: `inventario/colecoes-e-demos.md`

### tw-animate-css

[todos] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (tw-animate-css)

- **Peças:**
  - `tw-animate-css`: utilitários de animação do Tailwind 4
- **Por quê:** As entradas e saídas do shadcn, só em CSS.
- **Cuidados:** Já vem com o shadcn init; movimento reduzido pelas variantes do Tailwind.
- **Trazer:** `npm install tw-animate-css@1.4.0`
- **Origem:** [repositório](https://github.com/Wombosvideo/tw-animate-css) · último commit em 24.09.2025 · inventário: `inventario/pacotes-de-efeito.md`

### AutoAnimate

[P][C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (@formkit/auto-animate)

- **Peças:**
  - `@formkit/auto-animate`: anima entrada, saída e troca de itens de lista (3,2 KB)
- **Por quê:** Lista que muda com o filtro, como o cardápio, sem salto.
- **Cuidados:** Versão abaixo de 1.0: travar. Movimento reduzido por conta do site.
- **Trazer:** `npm install @formkit/auto-animate@0.10.0`
- **Origem:** último commit em 10.07.2026 · inventário: estudo de 12.10.2026

### Animação ligada à rolagem (animation-timeline)

[C] · — · LIBERADO · técnica nativa · dependência nova: não

- **Peças:**
  - `animation-timeline: view()`: cena ligada à rolagem dentro de @supports
- **Por quê:** A cena do Completo sem script e sem prender a rolagem.
- **Cuidados:** Sempre dentro de @supports (animation-timeline: scroll()), com o estado final estático; não Baseline: Safari 26 sim, Firefox em conflito. Nunca em texto essencial.
- **Trazer:** sem instalação: CSS ou API do navegador
- **Origem:** [site](https://scroll-driven-animations.style/) · inventário: estudo de 12.10.2026

### react-scrollama

[C] · MIT · LIBERADO · pacote npm · dependência nova: **sim** (react-intersection-observer)

- **Peças:**
  - `react-scrollama`: passos de scrollytelling
- **Por quê:** Capítulos da história do negócio.
- **Cuidados:** Cena ligada à rolagem: só no Completo; MR 0.
- **Trazer:** `npm install react-scrollama@2.4.2`
- **Origem:** [repositório](https://github.com/squirrelsquirrel88/react-scrollama) · [site](https://www.npmjs.com/package/react-scrollama) · último commit em 26.06.2025 · aviso: «© 2020» · inventário: `inventario/conferencia-e-lacunas.md`

---

## 17. Fontes de efeitos para estudar e refazer

Efeitos de alto padrão para estudar a mecânica e refazer para a marca (`../esteira/19-o-padrao-atlas.md`, seção 8.3). A licença do demo não cobre a biblioteca, a fonte e a imagem que ele usa: cada uma tem a sua.

### Codrops: demos MIT ★

[todos] · MIT · LIBERADO · demo para refazer · dependência nova: **sim** (gsap (quase todos); three ou ogl nos de WebGL; SplitType e Splitting)

- **Peças:**
  - `KineticTypePageTransition`: transição de página com tipografia cinética
  - `LineTextHoverAnimations`: animações de hover em linhas de texto
  - `HoverGrid`: grade que responde ao hover
  - `ImageExpansionTypography`: imagem que se expande com a tipografia
  - `RepeatingImageTransition`: transição que repete a imagem
  - `SlideshowAnimations`: animações de apresentação [P]
  - `3DStackMotion`: pilha em 3D com movimento [P]
  - `interlude`: transições de página em Astro com three.js [C]
- **Por quê:** A melhor fonte de efeitos premium de texto, imagem e transição para refazer na marca.
- **Cuidados:** Trocar as fontes (Typekit da Codrops) e as imagens (Midjourney, Unsplash, Vecteezy, Freepik), remover o Lenis, manter o aviso MIT e deixar os ligados à rolagem no Completo. Demos de autores convidados e do Creative Hub valem pela licença de cada repositório.
- **Trazer:** estudar e refazer: https://tympanus.net/codrops
- **Origem:** [repositório](https://github.com/codrops) · [site](https://tympanus.net/codrops) · último commit em 12.10.2026 · aviso: «Copyright (c) 2026 Codrops» · inventário: `inventario/colecoes-e-demos.md`

### Codrops: demos de autores convidados (2019–2026) ★

[C] · MIT · LIBERADO · demo para refazer · dependência nova: não (three, R3F, OGL, GSAP, TSL ou WebGPU, conforme o demo)

- **Peças:**
  - `Makio64/threejs-cinematic-world-zoom`: zoom cinematográfico sobre o mapa
  - `edoardolunardi/infinite-canvas`: tela infinita que se arrasta
  - `item-develop/paper-crumple-demo`: papel que amassa
  - `MisterPrada/vortex-glass-sphere`: esfera de vidro
  - `bnpne/page-transitions-with-webgpu-vanilla-js`: transições de página em WebGPU
  - `guilanier/codrops-sdf-lensblur`: desfoque de lente por SDF
  - `maximilianberndt/riso-print`: impressão risográfica
  - `drcmda/the-substance`: rolagem com refração e shader
- **Por quê:** Cerca de 60 demos MIT de um efeito só, de tutoriais recentes, para refazer na matéria da marca.
- **Cuidados:** Licença lida em cada repositório; os 23 sem LICENSE ficam de fora. Conferir imagens e fontes de cada demo; rolagem ligada e WebGL só no Completo.
- **Trazer:** estudar e refazer: https://tympanus.net/codrops/category/tutorials/
- **Origem:** [site](https://tympanus.net/codrops/) · último commit em 26.09.2026 · aviso: «MIT em cada repositório de autor; ex.: «Copyright (c) 2009 - 2020 [Codrops]»» · inventário: `inventario/conferencia-e-lacunas.md`

### CodePen (pens públicos)

[todos] · MIT · LIBERADO · demo para refazer · dependência nova: não (conforme o pen)

- **Peças:**
  - `Hyperplexed`: autor de referência (9 lugares no Top 100 de 2022)
  - `Temani Afif`: formas, padrões e carregadores em CSS de um elemento
  - `Jhey Tompkins`: autor de referência
  - `Aaron Iker`: autor de referência
  - `Jon Kantner`: autor de referência
  - `Ana Tudor`: autora de referência
  - `Cassie Evans`: autora de referência
  - `Chris Gannon`: autor de referência
- **Por quê:** Fonte ampla de técnica em CSS e SVG para refazer na matéria da marca.
- **Cuidados:** Manter o aviso MIT do pen; pens privados ficam fora. A licença cobre só o código do autor: biblioteca (o GSAP), shader portado do Shadertoy, fontes e imagens mantêm a licença de origem.
- **Trazer:** estudar e refazer: https://codepen.io
- **Origem:** [site](https://codepen.io) · aviso: «Copyright (c) YEAR - YOUR NAME - URL TO ORIGINAL» · inventário: `inventario/colecoes-e-demos.md`

### CodePen (pens públicos)

[todos] · MIT · LIBERADO · demo para refazer · dependência nova: não

- **Peças:**
  - `pens públicos`: efeitos para refazer
- **Por quê:** Fonte de técnica para os efeitos da identidade.
- **Cuidados:** Manter o aviso "ANO - NOME - URL DO ORIGINAL"; hospedar junto o que o pen busca em CDN.
- **Trazer:** estudar e refazer: https://codepen.io
- **Origem:** [site](https://blog.codepen.io/documentation/licensing/) · inventário: estudo de 12.10.2026

### Codrops

[todos] · MIT · LIBERADO (decl.), fora do kit · demo para refazer · dependência nova: não

- **Peças:**
  - `demos`: WebGL, CSS e GSAP, como distorção de imagem e transições
- **Por quê:** A melhor fonte de técnica para os efeitos de identidade.
- **Cuidados:** Página de licença deu 403: conferir o LICENSE de cada demo. WebGL e GSAP só no Completo.
- **Trazer:** estudar e refazer: https://tympanus.net/codrops
- **Origem:** [site](https://tympanus.net/codrops) · inventário: estudo de 12.10.2026

### Codrops: demos da cláusula antiga

[todos] · licença própria · **CONDICIONAL**, só no repositório do cliente · demo para refazer · dependência nova: **sim** (jQuery, TweenMax (GSAP antigo), mo.js)

- **Peças:**
  - `MorphingPageTransition`: transição de página por transformação
  - `PageTransitions`: transições de página
  - `SidebarTransitions`: transições de menu lateral
  - `ImageTiltEffect`: inclinação da imagem sob o ponteiro
  - `DistortedButtonEffects`: botões com distorção
  - `RainEffect`: chuva sobre o vidro [C]
- **Por quê:** Técnicas clássicas de transição e inclinação, integráveis ao site vendido ao cliente.
- **Cuidados:** Integrar e adaptar, nunca entregar o demo «as-is», com o repositório do cliente privado; não vai ao kit. Imagens, fontes do Typekit e modelos do demo ficam fora, e o botão distorcido não pode andar nem crescer.
- **Trazer:** estudar e refazer: https://github.com/codrops
- **Origem:** [repositório](https://github.com/codrops) · [site](https://tympanus.net/codrops) · inventário: `inventario/conferencia-e-lacunas.md`

### CSS and Web UI Demos (Chrome)

[todos] · Apache-2.0 · LIBERADO · demo para refazer · dependência nova: não (nenhuma (Astro e Open Props em alguns demos))

- **Peças:**
  - `carrosséis só em CSS`: galeria e configurador com ::scroll-marker [P]
  - `anchor positioning`: ferramenta e exemplos
  - `HTML no canvas`: com referência de vidro líquido
  - transição visual do navegador
- **Por quê:** Referência dos recursos nativos novos, sem dependência.
- **Cuidados:** Conferir o suporte de cada recurso nos navegadores; rolagem ligada em 2 arquivos.
- **Trazer:** estudar e refazer: https://chrome.dev/
- **Origem:** [repositório](https://github.com/GoogleChromeLabs/css-web-ui-demos) · [site](https://chrome.dev/) · último commit em 30.09.2026 · inventário: `inventario/conferencia-e-lacunas.md`

### CSS-Tricks (trechos e demos)

[todos] · licença própria · **CONDICIONAL**, só no repositório do cliente · demo para refazer · dependência nova: não

- **Peças:**
  - `artigos`: trechos e demos de técnica em CSS
- **Por quê:** Técnicas de CSS documentadas, com liberdade expressa de uso sem crédito.
- **Cuidados:** Licença sem SPDX: guardar cópia datada da página de licença; não vai ao kit.
- **Trazer:** estudar e refazer: https://css-tricks.com
- **Origem:** [site](https://css-tricks.com) · inventário: `inventario/colecoes-e-demos.md`

### Demos do GSAP

[todos] · MIT + Standard 'No Charge' GSAP License · **CONDICIONAL**, só no repositório do cliente · demo para refazer · dependência nova: **sim** (gsap e plugins (SplitText, MorphSVG, Flip, ScrollTrigger, Observer))

- **Peças:**
  - `Cursor-driven perspective tilt`: inclinação em perspectiva pelo ponteiro
  - `Text Masking`: texto como máscara
  - `Rolling text`: texto que rola
  - `Draw a path`: caminho que se desenha
  - `Smooth Morph`: transformação suave de SVG
  - `FLIP gallery modal`: galeria que abre em diálogo [P]
  - `Cursor-Tracking Image Preview`: prévia de imagem junto do ponteiro [C]
  - `Image Mask On Scroll`: máscara de imagem na rolagem [C]
- **Por quê:** Receitas de texto, SVG e galeria de alto padrão, para refazer no Motion ou com o GSAP autorizado.
- **Cuidados:** O código dos pens é MIT, mas a biblioteca segue a licença padrão «no charge», que permite o site pago pelo cliente: é dependência nova. Magnetic Button, Cursor Follower, Smooth Scrolling e Directional Marquee ficam fora.
- **Trazer:** estudar e refazer: https://gsap.com/demos
- **Origem:** [site](https://gsap.com/demos) · inventário: `inventario/colecoes-e-demos.md`

### GUI Challenges

[todos] · Apache-2.0 · LIBERADO · demo para refazer · dependência nova: não (nenhuma ou pouco JS)

- **Peças:**
  - `split buttons`: botões divididos
  - `tabs`: abas
  - `toast`: aviso
  - `theme switch`: troca de tema
  - `loading bar`: barra de carga
  - `stories`: histórias
  - `3D game menu`: menu em 3D [P]
- **Por quê:** Componentes de função acessíveis e com movimento reduzido, para refazer na marca.
- **Cuidados:** Último commit em 02/2025: conferir o suporte atual de cada API e o movimento reduzido peça a peça.
- **Trazer:** estudar e refazer: https://github.com/argyleink/gui-challenges
- **Origem:** [repositório](https://github.com/argyleink/gui-challenges) · [site](https://gui-challenges.web.app) · último commit em 19.02.2025 · inventário: `inventario/colecoes-e-demos.md`

### MDN (trechos de código)

[todos] · CC0-1.0 (MIT antes de 20/08/2010) · LIBERADO · técnica nativa · dependência nova: não

- **Peças:**
  - `View Transitions`: exemplos de transição de página
  - `Web Animations`: exemplos da API de animação
  - `scroll-driven`: animações ligadas à rolagem [C]
- **Por quê:** Referência segura das técnicas nativas de transição e animação.
- **Cuidados:** Adaptar à marca e medir.
- **Trazer:** estudar e refazer: https://github.com/mdn/dom-examples
- **Origem:** [repositório](https://github.com/mdn/dom-examples) · [site](https://developer.mozilla.org) · último commit em 12.10.2026 · inventário: `inventario/colecoes-e-demos.md`

### Motion: exemplos do repositório

[todos] · MIT · LIBERADO · cópia do repositório · dependência nova: não (motion)

- **Peças:**
  - `Drag-to-reorder`: arrastar para reordenar
  - `SVG-path`: caminho SVG animado
  - `Layout-Projection-*`: projeção de layout
  - `AnimatePresence-*`: entrada e saída de elementos
  - `Shared-layout-lightbox`: lightbox com layout compartilhado [P]
- **Por quê:** 155 exemplos MIT na própria pilha, base segura para as peças em Motion.
- **Cuidados:** São exemplos de API, não de acabamento: dar a matéria e a luz da marca.
- **Trazer:** copiar dev/react/src/examples de https://github.com/motiondivision/motion
- **Origem:** [repositório](https://github.com/motiondivision/motion) · último commit em 09.10.2026 · aviso: «Copyright (c) 2024 Motion B.V.» · inventário: `inventario/colecoes-e-demos.md`

### Exemplos gratuitos do Motion

[P][C] · MIT · LIBERADO · demo para refazer · dependência nova: não (motion)

- **Peças:**
  - `carousel coverflow`: carrossel em perspectiva
  - `lightbox`: imagem ampliada
  - `shared layout animation`: layout compartilhado
  - `path drawing`: traço que se desenha
- **Por quê:** Técnica no próprio motor da pilha.
- **Cuidados:** Só os exemplos visíveis sem o Motion+, que é pago; ticker é faixa sem fim (K4).
- **Trazer:** estudar e refazer: https://examples.motion.dev
- **Origem:** [site](https://examples.motion.dev) · inventário: estudo de 12.10.2026

### hg_sdf (Mercury)

[C] · MIT OR CC-BY-NC-4.0 · LIBERADO · cópia do repositório · dependência nova: não (nenhuma (GLSL))

- **Peças:**
  - `hg_sdf.glsl`: primitivas e operações de SDF [C]
- **Por quê:** Biblioteca madura de formas em SDF para objetos em shader.
- **Cuidados:** Escolher o MIT da licença dupla e manter o aviso no arquivo.
- **Trazer:** copiar hg_sdf.glsl de https://mercury.sexy/hg_sdf
- **Origem:** [site](https://mercury.sexy/hg_sdf) · inventário: `inventario/colecoes-e-demos.md`

### Inigo Quilez (trechos)

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: não (nenhuma (GLSL))

- **Peças:**
  - `SDF 2D e 3D`: funções de distância para formas [C]
  - `smin`: união suave entre formas [C]
  - `paletas`: paletas de cor procedurais [C]
  - `remapeamentos`: funções de remapeamento [C]
- **Por quê:** A matemática da forma e da cor para o shader próprio da marca.
- **Cuidados:** Só os trechos técnicos: a arte matemática e os shaders do autor no Shadertoy ficam fora. Manter o aviso MIT junto do trecho.
- **Trazer:** copiar o trecho do artigo em https://iquilezles.org/articles/
- **Origem:** [site](https://iquilezles.org) · inventário: `inventario/colecoes-e-demos.md`

### scroll-driven-animations.style

[C] · Apache-2.0 · LIBERADO · demo para refazer · dependência nova: não

- **Peças:**
  - `demos`: barra de leitura, cartões empilhados, colunas reversas, sapato 3D
  - `polyfill flackr/scroll-timeline`: reserva para navegador sem suporte
- **Por quê:** Repertório da cena ligada à rolagem, por técnica nativa.
- **Cuidados:** Só no Completo; dentro de @supports.
- **Trazer:** estudar e refazer: https://scroll-driven-animations.style/
- **Origem:** [site](https://scroll-driven-animations.style/) · inventário: estudo de 12.10.2026

### webgl-noise (Ashima/Gustavson)

[C] · MIT · LIBERADO · cópia do repositório · dependência nova: não (nenhuma (GLSL))

- **Peças:**
  - `simplex`: ruído simplex [C]
  - `classic`: ruído clássico [C]
- **Por quê:** Base do grão e da matéria em shader.
- **Cuidados:** Manter o aviso MIT no arquivo.
- **Trazer:** copiar do repositório
- **Origem:** [repositório](https://github.com/stegu/webgl-noise) · último commit em 27.04.2025 · aviso: «Copyright (C) 2011 by Ashima Arts… 2011-2016 by Stefan Gustavson» · inventário: `inventario/colecoes-e-demos.md`

### webgl-scroll-sync

[C] · MIT · LIBERADO · demo para refazer · dependência nova: **sim** (three)

- **Peças:**
  - `técnica Lusion`: WebGL e rolagem sem deriva
- **Por quê:** Cena WebGL presa à rolagem.
- **Cuidados:** Trocar o hash 4djSRW por um próprio; só Completo.
- **Trazer:** estudar e refazer: https://github.com/lusionltd/webgl-scroll-sync
- **Origem:** [repositório](https://github.com/lusionltd/webgl-scroll-sync) · último commit em 04.04.2025 · aviso: «© 2025 Lusion Ltd» · inventário: `inventario/conferencia-e-lacunas.md`

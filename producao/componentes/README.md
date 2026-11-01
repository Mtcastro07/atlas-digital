# componentes/ · o catálogo de componentes de terceiros

> **O que é.** As peças de outras bibliotecas que um site do Atlas pode usar, com a licença conferida para o site **vendido ao cliente, que fica com o repositório**. Inclui:
> - os registros do shadcn (como o Spell UI);
> - as coleções para copiar e colar;
> - os pacotes do npm de efeito e interação;
> - os blocos, os primitivos e os ícones;
> - as técnicas nativas do navegador;
> - as fontes de demos para estudar e refazer.
>
> Serve para que cada site tenha mais matéria-prima, saia mais rico e mais diferente dos outros, sem cair no enfeite de catálogo.
>
> **Origem.** Pedido do usuário em 13.10.2026: "enriqueça a pasta produção adicionando o resultado da sua pesquisa, para que meus sites sejam mais ricos e diversos, pela quantidade de componentes que você poderá utilizar dentro do desenvolvimento". A pesquisa é de 12 e 13.10.2026, também a pedido do usuário: "faça uma busca profunda e recursiva [...] que sejam permitidos a serem utilizados em sites que serão vendidos, para os próprios clientes". Ela correu em cinco frentes até a saturação, isto é, até uma rodada inteira de buscas não trazer nenhum nome novo. Foram cerca de 1.500 itens, cada licença lida no arquivo do repositório ou do pacote.
>
> **Estado.** É um catálogo de consulta. Nenhuma peça foi copiada para o kit, aberta no navegador ou medida na barreira do travamento. Cada peça se confere, se adapta, se mede e se registra no site em que entra (seção 2).
>
> **Atualizado em:** 13.10.2026.

---

## 1. O que esta pasta resolve

Até 13.10.2026, o kit trazia seis gestos do Spell UI (`../gestos/`) e as referências do Atlas para estudo (`../referencias/`). Com isso, cada site:
- refazia do zero o que outra biblioteca já resolve bem: a galeria, a gaveta, o odômetro, a transição de página;
- ou escolhia peças de memória, sem a licença conferida.

A pesquisa mostrou que o risco não é a falta de licença livre. Mais de 1.100 dos itens são MIT, Apache ou equivalentes. **O risco está em três lugares:**
- **na origem:** shader não comercial e código de outra biblioteca escondidos em repositório MIT (seção 4);
- **nas licenças que servem ao site, mas não ao kit** (seção 3.3);
- **no encaixe:** o movimento reduzido que ninguém trata, a rolagem com inércia embutida, a cara de catálogo (seção 5).

**As peças são matéria-prima, não o desenho.**
- **O catálogo responde "como fazer".** "O que fazer" sai do mundo da marca (`../esteira/19-o-padrao-atlas.md`, seção 3), dos efeitos da identidade e do vocabulário de interação (`../esteira/09-movimento.md`, seções 12 e 13).
- **A peça traduzida para a matéria da marca conta como efeito da identidade.** Exemplo: o odômetro que gira em latão gravado, com o tempo e a curva dos tokens.
- **A peça usada como veio, com a cor da marca por cima, é enfeite de catálogo** e não entra (`../esteira/09-movimento.md`, seção 6.4).

## 2. Como usar

**Onde entra no processo:**
- **Na etapa 4 (direção de arte), depois do mundo da marca, nunca antes.** O `identidade.md` se escreve primeiro, com o mundo da marca, o acabamento, o vocabulário de interação e o roteiro de cenas. Só então, para cada tradução que pede uma mecânica, procura-se a peça no catálogo.
  - **Objetivo:** o desenho tirado de um catálogo é o efeito moodboard (`../esteira/12-inspiracao-e-referencias.md`, seção 1), e é assim que os sites passam a se parecer.
- **Na etapa 6 (construção),** a peça entra pelos passos 1 a 7 abaixo.

**Os passos:**
1. **Procurar pela função,** em `catalogo.md`: a categoria (matéria, objeto, galeria, transição…), a marca de plano e os destaques. Para um nome que não está no catálogo, procure no inventário: `grep -ri "<nome>" producao/componentes/inventario/`. Se o nome também não está lá, ele nunca foi conferido: a licença se lê do zero, pelas seções 3 e 4.
2. **Preferir, nesta ordem:**
   1. o que a pilha já faz (`../esteira/13-tecnologia-e-estrutura.md`, seção 1);
   2. a técnica nativa ou só CSS;
   3. a peça copiada que usa só a pilha (React, Tailwind, Motion, Base UI);
   4. o pacote do npm.

   Pacote fora da pilha é **dependência nova**: pede autorização do usuário e passa pela regra de `../esteira/13-tecnologia-e-estrutura.md`, seções 9 e 10. O catálogo diz, em cada entrada, se a peça puxa dependência nova.
3. **Conferir antes de trazer:**
   - a licença no repositório, naquele momento, no commit que se vai copiar (seção 3.2);
   - a origem (seção 4);
   - o encaixe (seção 5).

   Se a licença mudou, o catálogo está errado: corrija-o no repositório do Atlas (seção 8).
4. **Trazer:**
   - **Registro do shadcn:** `npx shadcn@4.21.0 add <peça> --dry-run`, e depois o mesmo comando sem o `--dry-run`.
     - **Registro do índice oficial** (`@namespace/peça`): a CLI o acha sozinha e o acrescenta ao `components.json`. O primeiro componente do site pede o `components.json` de `../gestos/components.json`.
     - **Fora do índice:** pelo endereço (`https://…/r/<peça>.json`) ou pelo GitHub (`dono/repo/peça`).
   - **Cópia:** só os arquivos da peça, de um commit fixo.
   - **Pacote:** `npm install <pacote>@<versão exata>`, depois da autorização.

   **Nunca:**
   - `shadcn apply` nem `shadcn init --preset`;
   - reinstalar por cima de uma peça adaptada (`../esteira/13-tecnologia-e-estrutura.md`, seção 3.5).
5. **Adaptar.** É a mesma lista dos gestos do Spell UI (`../esteira/13-tecnologia-e-estrutura.md`, seção 3.6), mais o que a pesquisa achou nos catálogos:
   - **Texto e cor:** textos em português, vindos de `conteudo/`; cores pelos tokens da marca, sem hexadecimal; as classes no prefixo do site.
   - **Movimento:**
     - só `transform` e `opacity`, sem script que escreve estilo a cada quadro;
     - componente de servidor quando não precisa de script;
     - entrada uma vez (`.ja-aberto`), ambiente com `data-ambiente`;
     - com movimento reduzido, nada se desloca (`MotionConfig reducedMotion="user"`, na peça que usa o Motion);
     - hover só com ponteiro fino;
     - o botão não anda nem cresce: a resposta dele é cor e luz.
   - **O que sai:**
     - o Lenis;
     - as imagens de demonstração;
     - todo pedido externo: CDN, WASM, decodificador e fonte se hospedam junto;
     - o `cn` do código que vai ao navegador.
6. **Registrar:**
   - **no `decisoes.md`:** a peça, a origem com o commit ou a versão, a licença e o que mudou na adaptação;
   - **ao lado do código copiado:** o arquivo `LICENCA-<origem>.txt` com o texto da licença e a linha de copyright, e, no alto de cada arquivo copiado, um comentário de origem (seção 3.2). É o mesmo jeito das fontes, que levam a licença ao lado (`app/fontes/`);
   - **o pacote do npm:** fica no `package.json`, com a licença dentro dele.
7. **Medir:**
   - a régua, com o script inicial antes e depois (`../qualidade/02-regua.md`, bloco 5);
   - a barreira do travamento, quando a peça é de WebGL, de cena ou pesada (`../esteira/15-desempenho.md`, seção 2);
   - a verificação de cada gesto: uma vez; ao recarregar; com movimento reduzido; no toque; fora da tela; pausado (`../esteira/09-movimento.md`, seção 6.1, regra 8);
   - `npm run unicidade` (seção 5).

## 3. A licença

### 3.1 · O que cada veredito permite

| Veredito no catálogo | O que é | No site do cliente | No kit (`producao/`) |
|---|---|---|---|
| **LIBERADO** | MIT, Apache-2.0, BSD, ISC, 0BSD, Unlicense, CC0, Zlib ou MPL-2.0, lida no arquivo de licença | Sim, com o aviso (seção 3.2) | Sim, adaptada e verificada, com o aviso |
| **LIBERADO (com exclusões)** | O repositório é permissivo, mas as peças ou os arquivos nomeados na entrada têm outra licença | Sim, sem as peças excluídas | Sim, sem as peças excluídas |
| **LIBERADO (decl.)** | A licença permissiva só aparece no npm ou no README, sem arquivo | Sim, com o texto da declaração guardado no registro. Prefira uma alternativa com arquivo | Não |
| **CONDICIONAL** | Uma de duas: MIT com a Commons Clause, que proíbe vender o próprio componente; ou licença própria que permite o site de cliente e proíbe redistribuir como biblioteca. Exemplos: a parte gratuita da Aceternity, o Hover.dev, os demos antigos da Codrops, o GSAP | Sim, integrada ao site, nunca como biblioteca reutilizável | **Nunca** (seção 3.3) |
| **Fora** | GPL, AGPL, LGPL, uso não comercial (NC), sem derivados (ND), Hippocratic, "uso pessoal", pago, sem licença, crédito obrigatório no site ou origem duvidosa | Não | Não |

**O crédito obrigatório fica fora** por política do Atlas: o site não leva crédito de terceiros na página. Isso vale para CC BY, ícones "free with attribution" e marca d'água de plano gratuito. A exceção são os créditos que a norma exige, como o do OpenStreetMap no mapa (`../esteira/14-funcionalidades/01-base-de-todo-site.md`, seção 3).

### 3.2 · Reconferir no ato, e o aviso ao lado do código

**Regra:** a licença do catálogo é a de 12 e 13.10.2026. **Ela se relê no repositório no dia em que a peça entra,** no commit copiado, e o commit fica registrado.
- **Objetivo:** licenças mudam, e as notas registram casos.
  - O React Bits passou de MIT a MIT modificada em 08.02.2025 e a MIT com Commons Clause em 02.07.2025.
  - O dot-matrix passou de MIT a licença proprietária.
  - O Remix Icon trocou de licença em janeiro de 2026.
  - A cópia feita antes da troca segue a licença antiga, mas só se o commit estiver registrado.

**Regra:** **toda cópia leva o aviso.**
- **O que cada licença pede:**
  - **MIT, BSD e ISC:** "the above copyright notice and this permission notice shall be included in all copies or substantial portions".
  - **Apache-2.0:** pede, além disso, o arquivo `NOTICE`, quando existe, e o aviso de que o arquivo foi modificado.
  - **MPL-2.0:** o arquivo modificado continua MPL.
- **Como fazer:**
  - **O arquivo da licença,** ao lado do código copiado: `LICENCA-<origem>.txt`, com o texto da licença e a linha de copyright, como vieram. Exemplo: `components/ui/spell/LICENCA-spell-ui.txt` (`../gestos/`).
  - **No alto de cada arquivo copiado,** uma linha de origem: `// Origem: <biblioteca> (<licença>, <copyright>), <endereço>@<commit>; adaptado em <data>. Licença em LICENCA-<origem>.txt.` Os gestos do kit já trazem a origem no alto.
  - **O `NOTICE` do Apache,** quando existe, vai junto do arquivo da licença.
- **Como conferir:**
  - todo arquivo de terceiros tem a linha de origem;
  - toda origem tem o arquivo da licença na pasta;
  - o `decisoes.md` registra a peça.

  A revisão de código da etapa 7 confere os três (`../qualidade/09-seguranca-e-privacidade.md`).

### 3.3 · O kit e o repositório do cliente

**Regra:** só peça **LIBERADA**, adaptada e verificada, entra no kit (`../gestos/`). As peças **CONDICIONAIS** entram só no repositório de um cliente, integradas ao site, e nunca:
- no kit;
- num registro de peças do Atlas, como o registro privado da base de produção (`../esteira/13-tecnologia-e-estrutura.md`, seção 8.3);
- em outro repositório como biblioteca.

- **Objetivo:** o kit é copiado inteiro para cada projeto e funciona como gerador de sites.
  - **A Commons Clause** proíbe vender "the Software", isto é, o próprio componente.
  - **As licenças próprias** (Aceternity, Hover.dev, CodyHouse, Hyperiux, Great UI) e **a cláusula antiga da Codrops** proíbem redistribuir como biblioteca ou entregar "as-is".

  O site integrado é o uso que elas permitem; o kit que espalha a peça é o que elas proíbem.
- **Varia por licença:**
  - **o Vivid Layer** exige o repositório do cliente privado;
  - **o XiodUI** (PolyForm Perimeter) proíbe o produto concorrente;
  - **o GSAP** proíbe o uso em construtor visual que concorra com o Webflow.

  Antes de usar, leia a cláusula na entrada do catálogo e no inventário.

## 4. A origem: o que parece livre e não é

**Regra:** a licença do repositório só vale para o que o autor escreveu. **Na dúvida sobre a origem, a peça não entra.**

1. **O shader de uso não comercial dentro de repositório MIT.**
   - **O Shadertoy:** a licença padrão é CC BY-NC-SA 3.0, salvo licença no alto do código. Herdam essa licença:
     - o `plasma-globe` do Lightswind;
     - os fundos Novatrix e Velustro do UVCanvas;
     - os ports com a convenção do Shadertoy (`mainImage`, `iChannel0`, `iResolution`) sem autor declarado, no Chamaac e no Lightswind.
   - **O XorDev:** 19 dos 33 orbes do Orbkit são "Non-commercial use only".
   - **The Book of Shaders e LYGIA:** não comerciais.

   Antes de copiar um shader, leia o cabeçalho e ache o autor.
2. **O código de outra biblioteca copiado num repositório MIT.**
   - **O React Bits:** o código dele aparece no Honest UI (`light-rays`, `blinds`), no MicroKit e no xcn (o Grainient), no DevClub UI (o `dither`) e no Empire UI (parte do `Threads`). Esses arquivos seguem a licença do React Bits, com Commons Clause desde 2025: são CONDICIONAIS, e não LIBERADOS.
   - **Coleções que recriam peças de terceiros:** o MotionVault, o ObsidianUI, o Animating Buttons e o Skiper UI, cujo autor admite "recreations of the best out there".
3. **O repositório MIT com restrição no site.**
   - **Com o LICENSE em MIT:**
     - **Unlumen UI:** o site proíbe extrair componente para reuso;
     - **Beste UI e PrebuiltUI:** o site traz uma licença própria restritiva;
     - **Flowbite:** o código é MIT, mas os trechos para copiar moram na documentação, que é CC BY 3.0.
   - **Com o LICENSE em outra licença:**
     - **SatoriUI:** o site diz MIT, e o repositório não tem LICENSE;
     - **Groot Studio e Componentry:** o `package.json` é `PROPRIETARY`.

   Vale a leitura mais restritiva.
4. **A imagem, a fonte e o modelo embutidos.**
   - **As imagens dos blocos e dos demos:** vêm do Pinterest, do Freepik, do Flaticon, do Dribbble, do Unsplash, do Midjourney, de retratos fictícios. Saem todas: entra a fotografia do negócio (`../esteira/08-imagem-e-fotografia.md`).
   - **As fontes dos demos da Codrops:** são do Typekit da própria Codrops.
   - **Os modelos 3D:**
     - o `duck.glb`, da Khronos, sob a "SCEA Shared Source License";
     - os modelos do Dental Scope, do BodyParts3D e do Z-Anatomy, em CC BY-SA;
     - o panorama da ESA no Kam UI, em CC BY-SA 3.0 IGO.
   - **Os ícones do Solar,** em Kokonut UI e JolyUI: CC BY 4.0, com crédito.
   - **As fontes que alguns registros distribuem:** confira a licença de cada uma, pela regra de `../esteira/05-tipografia.md`, seção 3.
5. **Os agregadores.**
   - **21st.dev:** cada peça tem a licença declarada pelo autor, e muitas dizem "unknown".
   - **shadcn.io:** 6.409 dos 7.999 itens são Pro.
   - **catalogs.dev:** 2.910 itens de terceiros.

   Neles, ache o repositório de origem da peça e leia a licença lá.
6. **O degradê "da Stripe".** Os pacotes `whatamesh`, `stripe-gradient`, `mesh-gradient.js` e `anim-gradient` copiam o script do site da Stripe sem licença do titular. Para malha de cor, use o `@mesh-gradient/core` ou o `shaders` (catálogo, "Fundo vivo").

## 5. O encaixe no kit

A licença liberada é condição, não motivo. A peça também passa por estes pontos:

| O que conferir | Regra | Onde |
|---|---|---|
| **O plano** | Cada entrada traz o menor plano em que cabe ([todos], [P] ou [C]). Exemplos: WebGL, cena ligada à rolagem e interações de conteúdo, só no Completo; objeto em CSS 3D e galeria, a partir do Profissional | `../esteira/09-movimento.md`, seção 4; `../esteira/19-o-padrao-atlas.md`, seção 9 |
| **Os freios** | Só `transform` e `opacity`; movimento reduzido; pausa do que se move sozinho; parado fora da tela; nada ligado à rolagem fora do Completo; sem Lenis; o botão não anda | `../esteira/09-movimento.md`, seção 5 |
| **O gesto e o catálogo** | A peça entra traduzida para a matéria da marca. O gesto de texto de catálogo (onda, brilho, tarja, marca-texto, de qualquer biblioteca) continua um só por marca, fora do título | `../esteira/09-movimento.md`, seções 6.1 e 6.4 |
| **A cara de IA** | Ficam fora: a faixa que corre sem fim (K4); o ponto que pulsa de enfeite (K6); a mesma subida em todo cartão (M1); efeitos de origens diferentes na mesma página (M2); o quique (M3); o texto letra a letra (M5); o brilho em todo botão e o carrossel automático (M7). Uma peça boa também vira marca quando se aplica em série dentro do site: cada uma fica onde é o momento; entre sites, repeti-la, traduzida, é permitido | `../esteira/11-anti-ia.md`, seções 5.4 e 5.5; `../esteira/20-repeticao-dentro-do-site.md` |
| **A dependência** | O pacote fora da pilha pede autorização, com o problema declarado, a medição, a degradação, a privacidade, a licença e o registro | `../esteira/13-tecnologia-e-estrutura.md`, seções 9 e 10 |
| **A privacidade** | Nenhum pedido externo. O WASM do dotLottie e do Rive, os decodificadores do model-viewer, as fontes e as imagens se hospedam junto | `../esteira/13-tecnologia-e-estrutura.md`, seção 3.8 |
| **A unicidade** | A mesma peça, adaptada do mesmo jeito em dois sites, aumenta a impressão digital do código. Num site novo, escolha outra peça ou traduza para outro mundo; `npm run unicidade` avisa a partir de 15% e reprova a partir de 30% | `../esteira/19-o-padrao-atlas.md`, seção 7 |
| **O desempenho** | Peça de WebGL, de cena ou pesada passa pela barreira do travamento | `../esteira/15-desempenho.md`, seção 2 |

**A variedade é o motivo do catálogo.** Com dezenas de peças por função, dois sites do mesmo nicho não precisam do mesmo odômetro, da mesma galeria nem da mesma transição. O `decisoes.md` de cada site diz o que ele usou, e o próximo site do mesmo nicho escolhe outra coisa.

## 6. O que não entra, e por quê

Os casos que um desenvolvedor pensaria em usar e não pode. A lista completa está no inventário, nas seções VETADO de cada arquivo.

- **21st.dev** — agregador: licença por peça, muitas «unknown»; redistribuição proibida; buscar a origem de cada peça
- **23rd** — VETADO: sem LICENSE
- **30-seconds-of-css** — CC BY 4.0 (crédito obrigatório)
- **3D-art-gallery-threejs** — sem LICENSE (VETADO)
- **`@14islands/r3f-scroll-rig`, Lenis, Locomotive Scroll** — rolagem com inércia, vedada pela ata v3.0 (regra do kit)
- **`@aarsteinmedia/dotlottie-player` e `@aarsteinmedia/lottie-web`** — GPL-2.0+ (VETADO)
- **`@theatre/studio`** — AGPL-3.0; só no desenvolvimento, nunca no pacote final (VETADO)
- **`@webrotate360/imagerotator`** — EULA proprietária (VETADO)
- **`border-beam`, digitação (`typed.js`, `typewriter-effect`) e cursores próprios (`mouse-follower`, que ainda exige GSAP)** — slop
- **`motion-number`, `@liquid-dom/core`, `@erosnicolau/animated-text`** — sem licença (VETADO)
- **`vanta-react`, `youtube-background`** — pedido externo por desenho (regra do kit)
- **Aceternity UI (Pro e grátis)** — Pro pago; os grátis sem LICENSE nem repositório (pago, origem duvidosa)
- **Aceternity UI** — licença em conflito (Pro × Termos de uso pessoal); tratar como VETADO até confirmação escrita
- **animate.css do main do GitHub** — Hippocratic 2.1 desde 13/09/2021; só a 4.1.1 do npm serve (VETADO)
- **Animate.css** — Hippocratic License (VETADO)
- **Arquivos da comunidade do Rive** — CC BY (crédito obrigatório); o plano gratuito exporta com tela de abertura
- **attract-button, Magnet, TargetCursor, BlobCursor** — botão que anda e cursor substituto (slop)
- **awwwardedui** — VETADO: sem LICENSE (fundos de shader)
- **background-snippets (ibelick)** — VETADO: sem LICENSE
- **Barba, swup, Taxi, Highway** — feitos para várias páginas; conflitam com o roteamento do Next
- **Beste UI e PrebuiltUI** — entram, mas a licença do site diverge do MIT do repositório: nunca levar ao kit
- **BG.IBELICK e os sites de Temani Afif** — sem licença; de Temani Afif, só os pens públicos do CodePen, que são MIT (origem duvidosa)
- **Blobity** — GPL-3.0 ou comercial; e cursor que substitui o do sistema (VETADO, slop)
- **Blocos gratuitos do Flowbite** — sem licença declarada, e os trechos da documentação são CC BY 3.0 (crédito obrigatório); o código MIT do Flowbite é outra coisa, sem valor premium
- **border-beam (FradSer), meteors, sparkles, confetti, particles, marquee** — slop: enfeite de catálogo
- **Build UI (recipes)** — «All rights reserved» (VETADO)
- **Bundui (blocos)** — o repositório só traz efeitos de catálogo; os blocos premium são pagos
- **BuouUI** — o produto final não pode ser monetizado (VETADO)
- **Canvas UI duck.glb** — VETADO: SCEA Shared Source License
- **Chamaac bokeh-grid, water-caustic, grid-bloom, deform-tunnel, liquid-morph** — origem duvidosa: paleta do XorDev e convenção Shadertoy sem crédito
- **ChatDeck** — sem LICENSE e lê imagens do demo pago do Startup Template da Magic UI
- **Clones de sites premiados (JS Mastery, MAGGIx1404, Fullstack-Empire, Ali-Sanati)** — sem LICENSE, e copiam o desenho de um site real (VETADO)
- **Codrops FilterableProductGrid e PhotographyWebsiteConcept** — GPL-3.0, pelo Flickity (VETADO)
- **Codrops: 23 demos de autores sem LICENSE** — ex.: ScanningEffectWithDepthMap, interactive-droplets, curve-gallery (origem duvidosa)
- **comehope/front-end-daily-challenges** — CC BY-NC 4.0 (VETADO)
- **Confete e partículas (`canvas-confetti`, `tsparticles`, `react-confetti`)** — slop
- **conic.css**, **Mimic.css**, **Asset-Loading-Effects**, **Origami**, **UI-Animation**, **penflow** — sem LICENSE (VETADO)
- **coss ui fora de apps/origin/ e apps/ui/** — AGPL-3.0 (VETADO)
- **countUp.js, `react-countup`, `odometer`** — escrevem o texto a cada quadro, contra o freio do kit
- **craftui** — VETADO: sem LICENSE
- **Credenza e DropDrawer** — apoiados no Vaul sem manutenção; o `responsive-dialog` do Dice UI e do Blode UI faz o mesmo sobre o Base UI
- **Cruip (modelos)** — GPL, com "don't republish, redistribute, or resell" (VETADO); os tutoriais, sem LICENSE, vedam obra derivada vendida
- **Cursify** — cursores sem LICENSE; cursor de truque (VETADO, slop)
- **CursorX e Cuberto mouse-follower** — cursor que substitui o do sistema (slop)
- **Cópias do React Bits em outros repositórios (LightRays, Grainient, Dither, Threads, GradientBlinds em Honest UI, MicroKit, radiumcoders, DevClub UI, Empire UI)** — seguem a licença do React Bits, MIT + Commons Clause (VETADO no catálogo)
- **Degradês "da Stripe" (`whatamesh`, `stripe-gradient`, `mesh-gradient.js`, `anim-gradient`)** — derivados do script da Stripe, sem licença do titular (origem duvidosa)
- **Dioramas** — ativos CC BY com crédito exigido; Lenis em 21 arquivos (crédito obrigatório)
- **dithering-shader** — LICENSE MIT, mas o padrão vem do Shadertoy, CC BY-NC-SA (VETADO)
- **ditherjs** — CC BY-SA 4.0 declarado (crédito obrigatório)
- **Duoop UI** — repositório removido, só o npm (origem duvidosa)
- **ektogamat/threejs-graces e webgi-jewelry** — CC BY-NC-ND 4.0 e motor WebGi comercial (VETADO, pago)
- **Exemplos gratuitos de examples.motion.dev** — sem LICENSE público; usar os 155 exemplos MIT do repositório `motion` (origem duvidosa)
- **Faixas sem fim (`react-fast-marquee` e as outras)** — sinal genérico (slop)
- **Fancybox (`@fancyapps/ui`)** — licença própria paga (VETADO, pago)
- **Fancybox** — licença própria paga (VETADO)
- **Flickity e Isotope (Metafizzy)** — GPL-3.0 ou licença comercial (VETADO)
- **Flx (ui.flexnative)** — AGPL-3.0 (VETADO)
- **FlyonUI** — embute peças do Preline e herda a Fair Use dele
- **glass.samasante.com** — sem pacote nem licença visível (origem duvidosa)
- **Glint UI** — VETADO: sem LICENSE (354 componentes)
- **Grainient, Threads e Dither copiados (Honest UI, MicroKit, xcn, DevClub UI, Empire UI)** — código do React Bits: vale a Commons Clause, nunca no kit
- **GSAP ScrollSmoother** — rolagem com inércia (VETADO)
- **Headless UI, Ariakit e Radix Primitives** — redundantes com o Base UI (o Ariakit tem o site proprietário e exemplos Plus pagos; o Headless UI, manutenção incerta depois da compra pela Shopify)
- **Hero Patterns** — CC BY 4.0 (crédito obrigatório)
- **Hover.css** — MIT só para uso pessoal e código aberto; o comercial é pago (pago)
- **hydra-synth** — AGPL (VETADO)
- **iconly.pro** — licença comercial só no plano vitalício (pago)
- **Imagens embutidas dos blocos** — Pinterest, Freepik, Flaticon, Dribbble, Themefisher, randomuser, pravatar: saem todas; entra a fotografia do negócio
- **JOYCO** — VETADO: sem LICENSE
- **Kairo UI** — origem duvidosa: declara adaptar desenhos alheios; sem repositório
- **Kam UI Milky Way** — crédito obrigatório: panorama ESA/Gaia em CC BY-SA 3.0 IGO
- **Kevin Levron: threejs-toys e threejs-components** — sem LICENSE; o segundo é minificado, com ISC só no package.json e um fundo «shadertoy» (VETADO, origem duvidosa)
- **keyframeui, morphiq, nexus-labs, planes, uniquel, buouui** — VETADO: sem licença publicada ou pago
- **Kinetics (Colorion)** — o MIT só aparece no site; o repositório não tem LICENSE (origem duvidosa)
- **Lenis e Locomotive Scroll** — rolagem com inércia, vetada pelo kit (slop)
- **lightGallery (`lightgallery`, `lightgallery.js`)** — GPL-3.0 ou licença comercial (VETADO)
- **lightGallery** — GPL-3.0 ou comercial (VETADO)
- **Lightswind plasma-globe e fundos wave, smokey, satin-flow, reflect, nebula-flow, quantum-field** — origem duvidosa: Shadertoy
- **Liquid Glass Component Library** — «personal sandbox», sem manutenção
- **Lordicon (ícones gratuitos)** — o player é MIT, os ícones exigem crédito ao autor (crédito obrigatório)
- **LYGIA** — Prosperity 3.0.0, não comercial, mais o Patron License (VETADO, pago)
- **Made With GSAP** — assinatura paga (VETADO, pago)
- **Magic UI Pro, SyntaxUI Pro, Hover.dev Pro** — camadas pagas (pago)
- **Marquee, text-marquee, ticker** — faixa sem fim, K4 (slop)
- **mason-gallery** — sem LICENSE (VETADO)
- **MengTo kage, complete-shelf e sylva** — sem LICENSE (VETADO)
- **Meteors, sparkles, confetti, tsParticles** — meteoros, faíscas, confete e partículas (slop)
- **Mockups de aparelho do Eldora** — caberiam em qualquer site (slop)
- **morph-particles** — sem LICENSE (VETADO)
- **Motion+ (`motion-plus`, `motion-plus-dom`, `motion-plus-react`)** — código MIT no npm, mas vendido como exclusivo de membros (VETADO, pago; decisão dos sócios)
- **Motion+ (motion-plus, motion-plus-dom, motion-plus-react)** — exclusivo de membros; sem compra do Team, não se usa (pago)
- **Motion+** — pago (licença vitalícia ou por assento) (pago)
- **MotionVault** — recria peças do Aceternity e do Magic UI (origem duvidosa)
- **mpw-itsjwill (motion-primitives-website)** — origem duvidosa: imita o nome do Motion Primitives, sem LICENSE
- **My Room in 3D** — Bruno Simon, sem LICENSE (VETADO)
- **Neat (`@firecms/neat`)** — Commons Clause e marca d'água no gratuito (crédito obrigatório)
- **Needle Engine** — EULA própria; comercial só no Pro (VETADO, pago)
- **Nur UI**, **Sync UI**, **btns**, **Animating Buttons** — origem de cada peça não declarada (origem duvidosa)
- **ObsidianUI** — pasta `block/` é do Aceternity; resto sem origem declarada (origem duvidosa)
- **Odyssey UI** — VETADO: sem LICENSE e package.json PROPRIETARY; parece derivar do Animate UI
- **Olivier Larose (tutoriais)** — 62 de 64 repositórios sem LICENSE (VETADO)
- **Once UI Magic Portfolio e Magic Docs** — CC BY-NC (VETADO), apesar de aparecer na galeria da Vercel; o núcleo MIT não é Tailwind
- **OpenProcessing e GLSL Sandbox** — BY-NC-SA ou GPL por sketch; «public domain» só por fonte secundária (VETADO, origem duvidosa)
- **Orbkit shdr-01 a 10, 15, 18, 19, 20, 22, 25, 26, 28, 31** — VETADO: shaders do XorDev, só uso não comercial
- **Osmo Supply** — só com assinatura ativa (pago)
- **p5.js** — LGPL-2.1 (VETADO)
- **Pace UI (GSAP)** — o repositório paceui/gsap é MIT, mas o registro do site não tem LICENSE e o site diz «All rights reserved»; nenhum movimento reduzido (origem duvidosa)
- **PaceUI GSAP** — VETADO: sem LICENSE; o site diz «All rights reserved»
- **Pagedone** — modificar depende de aprovação do autor (VETADO)
- **Pangram Pangram** — fontes de teste só para uso pessoal (pago)
- **plasma-globe (Lightswind)** — adapta shader «Shadertoy-style» (VETADO)
- **pokemon-cards-css** — cartas holográficas, GPL-3.0 (VETADO)
- **Popmotion, Keen Slider, Splide React, Vanta, curtains.js** — sem manutenção (VETADO)
- **Preline UI** — fora: a Fair Use exige atribuição com link na redistribuição (a entrega do repositório conta), é rescindível, não cita o site de cliente e o JS é vanilla, fora da pilha
- **Prism UI** — VETADO: AGPL-3.0
- **r3f-animated-book-slider** — livro 3D, sem LICENSE (VETADO)
- **React Bits LightRays e PixelBlast** — origem duvidosa: convenção Shadertoy sem crédito
- **react-sounds** — sons da CDN do autor sem licença (origem duvidosa)
- **roiui** — VETADO: sem LICENSE
- **SatoriUI** — origem duvidosa: o site diz MIT, o repositório não tem LICENSE e diz «All rights reserved»
- **ScrollReveal** — GPL-3.0 ou comercial (VETADO)
- **shadcn-pricing-page e ewgenius/ui** — sem licença: todos os direitos reservados
- **shadcn.io Pro, PaceUI, shadcndesign, SaaS Blocks Kit, a11y-starter-kit, Tailark Pro, Mainline** — pagos
- **shadcn.io** — origem duvidosa: 6.409 de 7.999 itens Pro, gratuitos sem origem declarada
- **shadcnblocks (blocos grátis)** — Commons Clause e um ano parado (VETADO)
- **shadcncraft** — proprietário: proíbe que o usuário final baixe ou reuse a fonte (só os itens marcados MIT escapam)
- **shader-web-background** — GPL-3.0 (VETADO)
- **ShaderDrop** — origem duvidosa: shaders sem autor declarado
- **shadergradient** — degradê genérico (C4) que puxa three.js inteiro (slop)
- **Shaders do Shadertoy (via `react-shaders`, `shadertoy-react`, `glslCanvas`)** — o shader copiado herda CC BY-NC-SA (VETADO)
- **Shaders do Shadertoy** — CC BY-NC-SA 3.0 por padrão, salvo licença no topo do código (VETADO)
- **Silk (sheets)** — proprietário, com licença comercial (VETADO)
- **Skecher UI** — VETADO: README cita licença que não existe
- **Skiper UI** — VETADO: Termos de uso pessoal, «All intellectual property rights are reserved»; pago
- **SOFT LAB** — README «not for commercial use», shader do Shadertoy e React Bits dentro (VETADO)
- **Solar Icons** — CC BY 4.0 (crédito obrigatório)
- **Sonner, input-otp e cmdk** — livres, mas dependência nova redundante: o `toast`, o `otp-field` e o `combobox` do Base UI dispensam
- **Spline (`@splinetool/runtime`, `react-spline`, `r3f-spline`)** — runtime sem licença, marca d'água no plano gratuito e cena buscada no servidor do Spline (VETADO)
- **Streamline grátis** — crédito com link e limite de 100 ícones (crédito obrigatório)
- **sunlit** — luz do sol pela janela em CSS, sem LICENSE (VETADO)
- **Tailwind Plus (ex-Tailwind UI)** — pago e fechado a clientes novos desde 09/09/2026; não há parte gratuita
- **The Book of Shaders** — veda o uso em qualquer produto, site ou projeto (VETADO)
- **theme-toggle-effect** — sem LICENSE (VETADO)
- **three-good-godrays** — adapta código sem licença do N8python (origem duvidosa)
- **three-slug** — o autor do Slug pede crédito em software distribuído (dúvida)
- **THREE.js PathTracing Renderer** — CC0, mas 9 arquivos do Shadertoy, um CC BY-NC-SA (origem duvidosa)
- **tints.dev** — CC BY-NC (VETADO); a paleta gerada é só dado
- **titanic (Icons8)** — ícones animados sem LICENSE (VETADO)
- **trianglify, `react-marquee-text`, `webticker`, `nanogallery2`, `@ramka/react`, `lightbox.js-react`, `story-show-gallery`** — GPL (VETADO)
- **TSLFX** — `dot-noise.ts` do Xor, não comercial (origem duvidosa)
- **Typed.js 3.0** — GPL-3.0 no npm (VETADO)
- **TypeIt** — GPL-3.0; uso comercial pago (VETADO)
- **ui.lukacho** — só a frase «open source» no site, sem LICENSE nem repositório (origem duvidosa)
- **uiable** — traz o Lenis (rolagem com inércia, vetada) e three
- **unDraw** — proíbe uso em IA; ilustração genérica (slop)
- **Unicorn Studio (`unicornstudio-react`)** — SDK proprietário; gratuito só não comercial, comercial no plano Legend (VETADO, pago)
- **Untitled UI PRO** — pago, e a licença só vale se a fonte não for exposta; o cliente recebe o repositório
- **UVCanvas (Novatrix, Velustro)** — VETADO: ports do Shadertoy (CC BY-NC-SA) e sem LICENSE
- **vaso, ybouane/liquidglass, themesberg/glass-ui e css.glass** — sem LICENSE (VETADO)
- **Vaul** — sem manutenção ("This repo is unmaintained"; último npm em 2024-12); o `drawer` do Base UI 1.9 substitui
- **VeloBits UI** — VETADO: licença proprietária, «All rights reserved»
- **Velora UI** — os nomes espelham o Aceternity e o Magic UI; o MIT não limpa o direito de origem (origem duvidosa)
- **Velora UI, peças de rolagem** — `hero-parallax`, `macbook-scroll`, `tracing-beam`, `container-scroll` com os nomes da Aceternity (proprietária): origem a conferir
- **vercel-labs/react-view-transitions-demo** — sem LICENSE, `"private": true` (VETADO)
- **visualization-collection** — origem dos casos não declarada, hash do Shadertoy (origem duvidosa)
- **Wensity UI** — o Pro exige manter a fonte privada; os itens MIT não têm repositório
- **withanimation.app** — SwiftUI, não serve à web; pago (pago)
- **Ícones do Solar (Kokonut UI, JolyUI)** — crédito obrigatório: CC BY 4.0

## 7. O mapa da pasta

| Arquivo | O que é |
|---|---|
| `catalogo.md` | O catálogo por função: as peças escolhidas, com o plano, a licença, o comando de instalação, as peças de destaque, o porquê e os cuidados |
| `inventario/` | A pesquisa inteira, como veio, com as citações: cada item com a licença lida, o veredito e a fonte. É onde se procura um nome que o catálogo não traz |

**O inventário** (registro de 12 e 13.10.2026; "frente N", nos textos, remete a estes arquivos):

| Arquivo | Frente | O que tem |
|---|---|---|
| `inventario/registros-shadcn.md` | Frente 1 | Os registros que a CLI do shadcn instala: o índice oficial inteiro e o que se achou fora dele, em 301 registros, mais 15 bibliotecas vizinhas do npm |
| `inventario/colecoes-e-demos.md` | Frente 2 | As coleções para copiar e colar, o CSS puro, os web components e as fontes de demos (Codrops, CodePen, GSAP, Motion), com os trechos de shader e o vidro líquido |
| `inventario/pacotes-de-efeito.md` | Frente 3 | Os 567 pacotes do npm de texto, número, faixa, inclinação, cursor, imagem, carrossel, shader, grão, SVG, Lottie e Rive, 3D, animação, transição e retorno; as plataformas (Spline, Unicorn Studio, LottieFiles, Rive, Theatre.js, Motion+) |
| `inventario/blocos-e-primitivos.md` | Frente 4 | Os blocos e as seções, os kits de interface, os temas e os primitivos (Base UI, React Aria, Ark, Headless UI), com a fronteira entre o livre e o pago |
| `inventario/conferencia-e-lacunas.md` | Frente 5 | As sete divergências entre as frentes, resolvidas no texto primário (Aceternity, Skiper, Animate.css, LottieFiles, Motion+, Codrops, o código do React Bits), e os 254 nomes que só a conferência achou |

**Para procurar:** `grep -ril "<nome>" producao/componentes/` acha o arquivo. Dentro dele, a linha da tabela traz a licença com a citação e o endereço do arquivo de licença.

## 8. Como manter

- **Revisão a cada trimestre,** com as listas que envelhecem (`../esteira/README.md`, seção 5):
  - as licenças das entradas em destaque;
  - as peças sem commit há mais de 18 meses;
  - os registros novos do índice oficial do shadcn (https://ui.shadcn.com/r/registries.json).
- **Entrada nova:** os mesmos campos das outras (o plano, a distribuição, o comando, a dependência, a licença com o copyright, as peças, o porquê, os cuidados, o último commit), com a licença lida no arquivo.
- **Licença que mudou:** a entrada muda no mesmo ato, com a data; se a peça já está em algum site, vale a licença do commit registrado no `decisoes.md` dele.
- **Peça adaptada e verificada num site que serviria a outros:** só se for LIBERADA ela pode ir a `../gestos/`, com o arquivo da licença, a origem no alto e a verificação dos gestos. Cada mudança vai ao registro de decisões do Atlas (`documentacao/atlas--decisoes.md`, no repositório do Atlas).

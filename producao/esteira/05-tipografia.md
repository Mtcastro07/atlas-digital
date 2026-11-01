# 05 · Tipografia

> **Para que serve.** Decidir, licenciar, hospedar, recortar, escalonar e conferir as fontes de um site do Atlas. A tipografia carrega a personalidade da página: é a escolha visual que mais aparece e a que menos custa em peso.
>
> **Quando ler.** Antes de registrar a identidade (`04-direcao-de-arte.md`) e antes de escrever o primeiro componente. De novo, na revisão (seção 11).
>
> **Depende de.** `04-direcao-de-arte.md` (o briefing visual e os adjetivos), `nichos/<nicho>.md` (a direção de arte do ramo), `11-anti-ia.md` (as fontes e os tratamentos que denunciam um site gerado), `15-desempenho.md` (o orçamento).
>
> **Atualizado em:** 08.10.2026.

---

## 1. O que a tipografia decide, e por quê

**Regra.** A tipografia é tratada como **parte ativa do desenho**, não como veículo neutro do texto. O título, o número grande e o rótulo são decisões de identidade.

**Objetivo.**
- **É o maior efeito ao menor custo.** Um título de 256 px é uma linha de CSS: o Arete Immobiliare faz isso com a página inteira em 0,37 MB, o segundo site mais leve de 46 medidos em setembro de 2026 (`nichos/analises/atlas--indice-pesquisa.md`, no repositório do Atlas) [V].
- **O padrão aparece primeiro na tipografia.** Destacar uma palavra do título, rótulos em caixa-alta e rótulos desnecessários acima do conteúdo são, para a skill de design da Anthropic, "as marcas mais comuns de página gerada"; a família escolhida por omissão vem junto (`11-anti-ia.md`, seção 5.1).

**Como conferir.** Na avaliação anti-IA, a pergunta "a tipografia carrega a personalidade?" tem resposta escrita no `identidade.md`.

---

## 2. A escolha da família

### 2.1 · Site do Atlas — DECIDIDO (pedido de Gabriel Ribeiro Ota Yida em 05.10.2026; mantido pelo usuário em 08.10.2026)

**Regra.** As fontes do site de 28/08, em todo aparelho, cada uma com um papel fixo:
- **Archivo Black:** os títulos `h1` e `h2`, os números, os preços e os monogramas;
- **Archivo:** o lide (300) e os subtítulos `h3`, os nomes de plano e de módulo e as perguntas (500);
- **Inter:** o texto, a interface, os rótulos e o menu.

Hospedadas junto ao site (`web/app/fontes/`, no repositório do Atlas). A pilha do texto é `--font-sans: var(--font-texto, system-ui), sans-serif`: a reserva serve à tela de erro global, que não herda a variável do layout.

**Objetivo.** A cara da marca, a do manual de identidade visual v3.1 e do site publicado em 28/08, em todo aparelho.

**Como fazer.**
- **O Archivo Black só tem o peso 400.** Escreva `font-normal`; `font-synthesis-weight: none` impede o navegador de inventar o negrito (seção 4.6).
- **Archivo e Archivo Black em `display: swap`**, porque dão a cara do site e aparecem sempre. **Inter em `display: optional`** (seção 4.2).
- **Espaçamento entre letras** (seção 7): `tracking-titulo` (−0,032 em) no Archivo Black; `tracking-sub` (−0,015 em) no lide e nas perguntas; −0,018 em no `h3`; −0,011 em no corpo.

**Divergência registrada.** A ata v3.0, V, fixa San Francisco e Inter, e o texto da regra 1 das Diretrizes de Design Premium pede uma fonte só. Do manual v3.1, o site diverge nos detalhes que seguem o site de 28/08: os números e os subtítulos `h3`.

**A história**, para quem revisar o site não trocar as fontes sem nova decisão do usuário:
- **01.10:** as fontes de 28/08, por decisão de Gabriel Ribeiro Ota Yida.
- **03.10:** San Francisco e Inter, pela regra 1 das diretrizes. O usuário escolheu entre "Só Inter", "Manter Archivo Black nos títulos" e "San Francisco na Apple, Inter no resto".
- **05.10:** de novo as fontes de 28/08 (Gabriel Ribeiro Ota Yida: "quero que todas as fontes do site novo sejam iguais aos do site antigo").
- **07.10:** numa cópia do ramo sem o commit de 05.10, o usuário reafirmou San Francisco e Inter.
- **08.10:** na fusão das duas cópias, San Francisco e Inter prevaleceram por um momento. O usuário manteve as de 05.10: "Mantenha as fontes decididas pelo gabriel".

### 2.2 · Sites de marca (cliente e exemplo) — RATIFICADO (decisão do usuário em 07.10.2026)

**Regra.** **A fonte se adapta ao nicho e ao estilo de cada site.** Sai do briefing visual (os três adjetivos, o elemento memorável) e da direção de arte do ramo (`nichos/<nicho>.md`), nunca do hábito.

**Objetivo.** Doze sites com o mesmo corpo de texto se parecem na vitrine, onde são vistos lado a lado. A fonte é o primeiro sinal de que alguém escolheu.

**Como fazer.**
1. **No máximo duas famílias, cada uma com um papel fixo:** a de exibição (títulos, números grandes) e a de texto (corpo, interface). "A maioria dos documentos tolera uma segunda fonte. Poucos toleram uma terceira" (Butterick, https://practicaltypography.com/mixing-fonts.html) [V].
2. **Uma família só também vale**, desde que os pesos e o tamanho óptico separem os papéis.
3. **A família só muda entre blocos** (de um parágrafo a outro, de um título ao texto), nunca no meio da frase (Butterick) [V].
4. **Monoespaçada só para código, dado ou medida.** Nunca como fantasia de "técnico" (piso de ofício do Impeccable, https://github.com/pbakaus/impeccable) [FU].
   - **Uma terceira família, de dados, não entra:** a decisão do usuário de 07.10.2026 é "no máximo duas famílias" (`CLAUDE.md` do repositório do Atlas). O depósito de exemplo (Oswald nos títulos, Barlow no texto, IBM Plex Mono nos códigos e nas medidas) é divergência registrada, a decidir pelos sócios; até lá, dado e medida usam uma das duas famílias, com algarismos tabulares (RATIFICADO).
   - **Rótulo de formulário em monoespaçada** ("01 NOME", no talão do depósito) já é fantasia: marca de IA registrada na linha de base (`11-anti-ia.md`).
5. **Uma fonte de sistema não serve como voz de exibição** de um mundo próprio (Impact, Arial Black, a sans da plataforma). "A fonte instalada mais próxima é uma falha, não uma reserva" (piso de ofício do Impeccable) [FU]. A exceção é o Atlas, por decisão registrada (2.1).
6. **Registrar no `identidade.md`:**
   - família e versão;
   - de onde veio (endereço);
   - licença;
   - papel (exibição, texto, dados);
   - pesos e estilos usados;
   - data.

**Varia por.** Nicho: tabela 2.4 e `nichos/<nicho>.md`. Plano:
- **[E]** pode partir da tipografia do sistema do nicho, ajustada à marca;
- **[P] [C]** têm tipografia escolhida para a marca, com a avaliação anti-IA conferindo a escolha.

### 2.3 · Escolhas por omissão: marcas de IA

**Regra.** Uma família que aparece em qualquer site gerado, escolhida **sem motivo escrito**, é marca de IA. A lista vale para o eixo livre; se o briefing escolher uma delas com motivo, ela vale.

| Escolha por omissão | Por que denuncia | Fonte |
|---|---|---|
| Inter, Roboto, Arial e as fontes de sistema, como voz da página | A convergência dos modelos para o mais frequente; "fontes Inter, degradês roxos sobre branco, animação mínima" | Anthropic, https://claude.com/blog/improving-frontend-design-through-skills [V] |
| Geist, Plus Jakarta Sans, Space Grotesk, Fraunces | "Usadas em tantos sites que não parecem mais distintas"; cada onda de geração cria um novo favorito | Impeccable, regra `overused-font` [FU] |
| Serifa itálica de grande corpo como título principal (Fraunces, Recoleta, Playfair, Newsreader itálico) | "Lê como bom gosto isolado, mas virou o padrão" | Impeccable, `italic-serif-display` [FU] |
| Fundo creme (~#F4F1EA) com serifa de alto contraste e acento terracota | Um dos três visuais em que o design gerado se agrupa em 2026 | skill `frontend-design` da Anthropic, versão de junho de 2026 [V] |
| Pares com Space Grotesk, Instrument Serif ou Geist; Inter em toda a página, sobretudo na capa centralizada | Os pares que mais aparecem nas páginas geradas de uma amostra de 1.590 páginas | Krebs, 2026, https://www.adriankrebs.ch/blog/design-slop/ [FU] |

**Objetivo.** A fonte de um site do Atlas precisa sair do assunto. O Inter aparece em só ~1,4–1,5% das páginas da web (Web Almanac 2025, https://almanac.httparchive.org/en/2025/fonts) [V]. A Roboto aparece em ~10 a 10,7% das páginas, a segunda família mais declarada; 39,4% dos sites no computador e 41,3% no celular usam ao menos uma fonte variável [V]. A sensação de "Inter em tudo" vem do segmento de tecnologia e de IA — a amostra de Krebs é do Show HN —, exatamente onde o Atlas não quer parecer.

**Como conferir.** A avaliação anti-IA (`11-anti-ia.md`, seção 5.1) pergunta: "esta família estaria na página padrão de um pedido parecido?". Se sim, ela é revista ou o motivo é escrito.

**Linha de base, 07.10.2026.**
- **Nutrição de exemplo:** Fraunces em itálico no título ("outra pessoa."), sobre papel creme. Duas marcas.
- **Barbearia de exemplo:** Instrument Serif em itálico em "esquina." (uma palavra destacada no título); a própria Instrument Serif está entre os pares comuns de Krebs. Marca.

As duas ficam registradas para a decisão dos sócios (`11-anti-ia.md`, seção 7).

### 2.4 · O ponto de partida por nicho (RATIFICADO)

Direção do padrão de design de 08.10.2026; a escolha final é do briefing visual de cada cliente.

| Nicho | Clima tipográfico | Postura proposta (seção 6.3) |
|---|---|---|
| Academia | Grotesca condensada | Exibição |
| Advocacia | Serifa com versaletes; a forma de um código (Art., §) | Exibição — a tipografia é a única alavanca quando foto e preço são vedados (Zachmann: título de 150 px, zero imagens) |
| Barbearia | Letreiro de pintor, de vitrine | Exibição |
| Construção | Estêncil ou condensada | Exibição |
| Imobiliária | Sem serifa técnica | Exibição |
| Medicina | Sem serifa humanista | Exibição serena |
| Nutrição | Serifa macia | Exibição serena |
| Odontologia | Sem serifa limpa, ou serifa de desenho fino no título | Exibição serena |
| Oficina | Condensada, com monoespaçada só nas medidas | Exibição |
| Pet shop | Sem serifa arredondada | Exibição |
| Psicologia | Serifa literária | Exibição serena |
| Restaurante | O cardápio impresso (pontilhado entre prato e preço) | Exibição |

Fonte das posturas: a proposta de setembro de 2026 (ESTEIRA v2.1, bloco 6, no repositório do Atlas), "pendente de aprovação" de Gabriel Ribeiro Ota Yida desde então. A advocacia fica em exibição pelo exemplo do Zachmann, o único caminho de distinção quando preço e prova social são vedados. Ratificado em 08.10.2026.

### 2.5 · O que os três sites de exemplo usam (para estudo, não para cópia; o código em `../referencias/sites-de-exemplo/components/demos/<site>/fontes.ts`)

| Site | Exibição | Texto | Dados | Observação |
|---|---|---|---|---|
| Nutrição Icaraí [E] | Fraunces no eixo óptico de cartaz (144), redonda e itálica, peso 400 | Newsreader no eixo óptico de leitura (14), 400–600, e itálico | — | A única serifada dos três: faz a "folha impressa". Fraunces está na lista de excesso (2.3), e o título de cartaz contraria a postura de contenção proposta para o nicho (2.4) |
| Depósito Engenhoca [P] | Oswald variável, 300–700 | Barlow 400, 500, 600 | IBM Plex Mono 500, sem pré-carga | A letra de saco de cimento e placa de obra; a grotesca das placas de estrada |
| Barbearia Santa Rosa [C] | Instrument Serif, redonda e itálica | Jost variável, 300–600 | — | A serifa de cartaz de cinema; a geométrica dos letreiros. A moeda 3D é desenhada com a Instrument Serif |

---

## 3. Licença

**Regra.** Nenhuma fonte entra sem licença conferida e guardada no repositório.

**Objetivo.** O site é do cliente e pode ser auditado. Fonte sem licença é passivo jurídico para ele e para o Atlas.

**Como fazer.**
1. **Fontes de licença aberta (SIL Open Font License, OFL)** (https://openfontlicense.org/ofl-faq/) [V]:
   - **hospedar no próprio site é permitido** (FAQ 2.1);
   - **recortar ou converter o formato cria uma versão modificada** (FAQ 2.2 e 2.6). Se a fonte declara um **Nome de Fonte Reservado**, a versão recortada **precisa de outro nome**. Confira a primeira linha do arquivo de licença, que diz "with Reserved Font Name …" quando há;
   - **guarde o arquivo de licença ao lado da fonte** (`OFL-<familia>.txt`) e mantenha o aviso de direito autoral nos metadados (FAQ 1.9 e 2.4).
2. **Fontes comerciais.** Antes de comprar, leia na licença de web:
   - o número de domínios;
   - o limite de visitas por mês, se houver;
   - se o arquivo pode ser recortado;
   - se pode ficar num repositório privado.

   Guarde a nota fiscal ou o recibo e a licença em `app/fontes/LICENCAS.md`. Referências de preço, a conferir na compra:
   - **Plau**, fundição do Rio: a partir de US$ 19 por estilo; famílias de US$ 89 a 149 (https://www.myfonts.com/collections/plau-font-niramekko; https://fontspring.com/sku/NMKO1122294) [FU];
   - **Pangram Pangram:** licença de web a partir de ~US$ 30 por família, segundo guia de terceiros (https://licenseorg.com/guide/fonts/pangram-pangram) [FU];
   - **Fontshare** (Indian Type Foundry): gratuita, inclusive para uso comercial (https://www.indiantypefoundry.com/news/introducing-fontshare) [FU].
3. **Google Fonts: nunca pelo endereço do Google** (`fonts.googleapis.com`). Baixe os arquivos e hospede-os junto ao site. O pedido ao Google transmite o IP do visitante para fora do país e quebra a política de nenhum pedido externo (`17-conformidade-e-normas.md`).
4. **San Francisco: nunca embutida nem hospedada.** Só pelo `system-ui` (2.1).

**Como conferir.** Para cada fonte em `app/fontes/`, existe a licença ao lado e uma linha no `identidade.md`. A régua acusa qualquer pedido externo (`../qualidade/02-regua.md`, bloco 5).

---

## 4. Hospedagem e carga

### 4.1 · Pelo `next/font/local`

**Regra.** Toda fonte é carregada pelo `next/font/local`, **no layout do próprio site**, nunca por `@font-face` escrito à mão nem por endereço externo.

**Objetivo.**
- O `next/font` hospeda o arquivo, gera a declaração e cria uma fonte de reserva com as métricas ajustadas, o que reduz o deslocamento de leiaute (CLS) na troca (https://nextjs.org/docs/app/api-reference/components/font) [V].
- **Carregar no layout do site** garante que a página de um site não pré-carregue a fonte de outro.
  - **E cada site tem o seu layout raiz.** Os sites de exemplo do Atlas moram sob o layout raiz do Atlas e herdavam dele as fontes pré-carregadas (em 03.10.2026: 7, 7 e 6 fontes pré-carregadas por site, três delas do Atlas, a Archivo e a Archivo Black) e a regra de `h1`/`h2`, anulada só pelo `demos.css`. Hoje ainda herdam a fonte e a folha global (`15-desempenho.md`, seção 6). Num app com mais de um site, cada um ganha um layout raiz próprio, em grupos de rotas (documentação do Next, *route groups*) [NV: conferir na versão instalada; a troca entre layouts raiz recarrega a página].

**Como fazer** (o modelo, a partir dos três sites de exemplo):

```ts
// app/fontes.ts — as fontes deste site, importadas pelo layout e pela global-error.
import localFont from "next/font/local";

/** Títulos e números grandes. */
export const titulo = localFont({
  src: [
    { path: "./fontes/exibicao-400.woff2", weight: "400", style: "normal" },
    { path: "./fontes/exibicao-400-italico.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-titulo",
  display: "swap", // a identidade precisa aparecer: troca quando chega (ver 4.2)
  // Reservas sem nome terminado em número (ver 4.3).
  fallback: ["Georgia", "serif"],
});

/** Corpo e interface. */
export const texto = localFont({
  src: "./fontes/corpo-variavel.woff2",
  weight: "400 700", // só a faixa que existe no arquivo
  variable: "--font-texto",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

/** Dados e medidas, só se o identidade.md justificar. Nome próprio: --font-mono é do tema do Tailwind. */
export const dados = localFont({
  src: "./fontes/mono-500.woff2",
  weight: "500",
  variable: "--font-dados",
  display: "swap",
  preload: false, // não aparece na primeira tela
  fallback: ["ui-monospace", "Menlo", "monospace"],
});
```

No layout do site (e na `global-error.tsx`, que troca o documento inteiro e não herda o `<html>` do layout), aplique as variáveis no `<html>` (`` className={`${texto.variable} ${titulo.variable}`} ``, mais `dados.variable` se houver a terceira; `13-tecnologia-e-estrutura.md`, seção 7) e mapeie-as no tema do Tailwind:

```css
/* app/globals.css — as famílias. Os nomes são os das variáveis do next/font (app/fontes.ts):
   --font-texto e --font-titulo. A reserva dentro do var() vale onde a variável não existe
   (sem ela, um var() indefinido invalida a declaração inteira e o texto cai na fonte padrão do navegador). */
@theme inline {
  --font-sans: var(--font-texto, ui-sans-serif), system-ui, sans-serif;
  --font-display: var(--font-titulo, ui-serif), Georgia, serif;
  --font-mono: var(--font-dados, ui-monospace), Menlo, monospace;
}
```

**Os nomes são um só no kit inteiro:** `--font-texto` para o texto e `--font-titulo` para o título, os mesmos do layout (`13-tecnologia-e-estrutura.md`, seção 7), da direção de arte (`04-direcao-de-arte.md`) e do repositório do Atlas (`--font-texto`). Antes de 08.10.2026, havia três grafias (`--font-corpo` e `--font-exibicao` aqui; `--fonte-texto` e `--fonte-titulo` no 04): um `var()` que aponta para variável inexistente, sem reserva, torna a declaração inválida no valor computado, e o `font-family` volta ao valor herdado, até o inicial (CSS Custom Properties, "invalid at computed-value time"). Combinados, o layout de um documento e a folha de outro deixavam o site inteiro na fonte padrão do navegador. A terceira família leva `--font-dados`, e não `--font-mono`, que já é uma variável do tema padrão do Tailwind 4.

### 4.2 · `display`: `swap` ou `optional`

| Valor | Quando | Por quê |
|---|---|---|
| `swap` | A fonte que **carrega a identidade**: o título, o número grande | O visitante precisa ver a fonte da marca. Com a reserva de métricas ajustadas (`adjustFontFallback`, padrão no `localFont`), a troca desloca pouco |
| `optional` | A fonte de **texto** cuja reserva é próxima (a do sistema) | Se a fonte não chega a tempo da primeira pintura, o texto fica na reserva até a próxima visita, sem troca tardia |

**A lição do Atlas.** Com o Inter em `swap`, a troca tardia refazia o leiaute da página inteira e custava ~50 ms a mais de TBT com CPU 20× (334 ms contra 293 ms; `documentacao/atlas--arquitetura-web.md`, seção 7, no repositório do Atlas) [V]. Em `optional`, a troca some.

O Atlas declara `adjustFontFallback: false` porque a reserva é a própria fonte do sistema e não há troca depois da primeira pintura.

### 4.3 · A pilha de reserva

**Regra.** A lista `fallback` só tem nomes que **não terminam em número**.

**Objetivo.** O `next/font` escreve as reservas sem aspas. Um nome que termina em número (como "Bodoni 72") invalida a declaração inteira: na barbearia de exemplo, o título caía na fonte de texto (Jost) até o defeito ser achado (`web/components/demos/barbearia/fontes.ts`, no repositório do Atlas) [V, medido].

**Como fazer.** Use nomes de família sem número (Didot, Georgia, Futura, Arial) e termine pela genérica (`serif`, `sans-serif`, `monospace`).

**Como conferir.** No navegador, `getComputedStyle(h1).fontFamily` mostra a pilha inteira; com a fonte bloqueada (DevTools → Network → bloquear `.woff2`), o título cai na reserva certa, não na de texto.

### 4.4 · Pré-carga

**Regra.** Só se pré-carrega a fonte usada na **primeira tela**. As que aparecem abaixo da dobra levam `preload: false`.

**Objetivo.** A pré-carga disputa banda com o HTML e com a imagem principal. Pré-carregar o que não está na primeira tela atrasa o LCP.

**Exemplos.**
- **Plex Mono do depósito:** sem pré-carga, porque não aparece na primeira linha da capa.
- **Fontes de título dos nichos, na vitrine de Para quem:** sem pré-carga. Ainda assim baixam na carga, porque o texto delas está no documento: com elas, as fontes de Para quem somam 52,9 KB, contra 22,4 KB nas outras páginas (régua, 08.10.2026).

### 4.5 · Uma página nunca importa a fonte de outro site

**Regra.** Um componente do site A nunca importa o módulo de fontes do site B.

**Objetivo.** O empacotador junta as fontes dos dois num pacote só, e a página A passa a pré-carregar as fontes do site inteiro de B (medido em 01.10.2026 no Atlas: a página Para quem pré-carregava as fontes da nutrição). Se precisar da mesma família, declare-a de novo no módulo do site A, com outro nome (`fonteDeCartazDaNutricao`, em `web/components/nichos/fontes.ts`, no repositório do Atlas).

### 4.6 · Peso sintetizado

**Regra.** `font-synthesis-weight: none` na folha global.

**Objetivo.** Sem isso, o navegador inventa o negrito de um peso que não existe no arquivo, e o resultado é borrado e diferente entre navegadores.

**Atenção:** o README das fontes do Atlas (`web/app/fontes/README.md`) diz que a regra está na folha global, mas `web/app/globals.css` não a declara (conferido em 08.10.2026). A CONFIRMAR e corrigir lá.

---

## 5. Recorte e pesos

**Regra.** Toda fonte hospedada é **recortada**: o subconjunto latino, os pesos usados e os recursos tipográficos usados.

**Objetivo.** Peso. O Inter do Atlas foi de 36,1 KB para 22,9 KB (em KB de 1.000 bytes; 22,4 KB na conta da régua, `15-desempenho.md`, seção 2.1).

**Como fazer** (a receita do Atlas, `web/app/fontes/README.md`, no repositório do Atlas):

```bash
python3 -m pip install fonttools brotli

# 1. Nos variáveis, recortar o eixo de peso aos pesos usados.
python3 -c '
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
fonte = instancer.instantiateVariableFont(TTFont("origem.woff2"), {"wght": (400, 700)})
fonte.flavor = "woff2"
fonte.save("pesos.woff2")
'

# 2. Ficar só com o subconjunto latino e os recursos usados.
LATIM="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
pyftsubset pesos.woff2 --unicodes="$LATIM" \
  --layout-features="kern,tnum,locl,ccmp,liga,rvrn" \
  --flavor=woff2 --no-hinting --desubroutinize --name-IDs='1,2,3,4,6' \
  --drop-tables+=STAT --output-file=final.woff2
```

**Os recursos mantidos:** `kern` (pares de espaçamento), `tnum` (algarismos de largura fixa), `liga`, `locl`, `ccmp` e `rvrn`. Saem as frações automáticas, os alternativos contextuais e o posicionamento de acentos combinados: os acentos do português são caracteres prontos.

**Regras do recorte:**
- **Só existem os pesos que ficaram no arquivo.** O Inter do Atlas tem só 400 a 700: nada de `font-light` (300) nem `font-black` (900). Um peso fora da faixa faz o navegador usar o mais próximo, ou inventar um se a síntese estiver ligada.
- **Confira os caracteres da página** antes de recortar. O intervalo latino cobre `½`, `—`, `·` e `×`, conferidos em 01.10.2026. Confira também `ç`, `ã`, `õ`, `é`, `ê`, `â`, `ô`, `à`, `ú`, o `º` dos endereços e o `ª`.
- **Licença:** o recorte é uma versão modificada (seção 3); com Nome de Fonte Reservado, renomear.

**Tamanho óptico.** Em fonte variável com eixo `opsz`, deixe `font-optical-sizing: auto` (o padrão; funciona em todos os motores [V]). O Inter 4 tem o eixo (https://github.com/rsms/inter/releases) [FU]. Num arquivo estático, escolha a instância óptica do papel: a nutrição de exemplo usa a Fraunces no eixo 144 (cartaz) para o título e a Newsreader no eixo 14 (leitura) para o texto.

---

## 6. A escala

### 6.1 · Escala modular a partir do corpo

**Regra.** O tamanho do corpo é a base; os outros degraus saem de uma razão escolhida. Os números são ponto de partida, não lei (Tim Brown, https://alistapart.com/article/more-meaningful-typography/) [V].

**Objetivo.** Hierarquia legível e consistente. Página com 62 tamanhos (o Atlas até 03.10.2026) não tem hierarquia.

**Exemplo: os sete degraus do Atlas** (`web/app/globals.css`):

| Degrau | Tamanho | Entrelinha | Uso |
|---|---|---|---|
| `text-rotulo` | 12 px | 1,35 | rótulos, legendas, sobrescritos |
| `text-nota` | 14 px | 1,5 | interface, notas, metadados |
| `text-corpo` | 17 px | 1,6 | texto corrido |
| `text-destaque` | 18 → 21 px (`clamp(1.125rem, 1rem + 0.5vw, 1.3125rem)`) | 1,45 | lide e subtítulos |
| `text-numero` | 24 → 36 px | 1,1 | números e preços |
| `text-titulo` | 32 → 56 px | 1,05 | títulos de seção |
| `text-display` | 40 → 80 px | 1,0 | a capa e as aberturas |

**Pesos, medida e teto.** Títulos e números em 600; o lide e o `h3` em 400 ou 600; o corpo em 400; a interface e as notas em 400 a 600; os rótulos em 600 (o Inter hospedado só tem 400 a 700: seção 5). O lide tem no máximo 48 caracteres por linha (seção 8). Os três degraus maiores são fluidos e chegam ao teto perto de 1.150 px de largura de janela.

**Como fazer no Tailwind 4.** Cada degrau é um token `--text-<nome>` com `--text-<nome>--line-height` no `@theme`. **Nenhum tamanho fora da escala** nas páginas do site: nada de `text-[19px]` em componente.

**Exceção.** Os sites de marca têm a escala da sua identidade. Os sites de exemplo usam tamanhos em colchete (`text-[clamp(60px,8.6vw,140px)]`) porque cada um tem a sua escala, mas a escala precisa existir, escrita no `identidade.md`. Em 03.10.2026, a nutrição de exemplo tinha 41 tamanhos de fonte distintos em 70 ocorrências (auditoria das diretrizes nos exemplos): escala que não está escrita não existe.

### 6.2 · A armadilha do `tailwind-merge`

**Regra.** Se o projeto usa `cn` (clsx com tailwind-merge), o `cn` precisa **conhecer a escala**.

**Objetivo.** Sem configuração, o tailwind-merge toma um token como `text-destaque` por uma **cor** e o descarta ao lado de `text-muted-foreground`. O título perde o tamanho sem aviso (achado no Atlas em 03.10.2026).

**Como fazer.** Com o pacote `cn` (o que os itens do shadcn importam desde setembro de 2026): `createCn` de `cn/config`, estendendo o tema `text` com os nomes da escala. É o que `web/lib/utils.ts` do Atlas faz (código em `13-tecnologia-e-estrutura.md`, seção 3.4, item 2). Com o tailwind-merge direto, o equivalente é `extendTailwindMerge({ extend: { classGroups: { "font-size": [{ text: ["rotulo", "nota", "corpo", "destaque", "numero", "titulo", "display"] }] } } })`.

**Atenção:**
- **Código que vai ao navegador** (as ilhas e `ui/`) não usa `cn`: o motor custava ~9 ms de CPU na carga, 180 ms com CPU 20× (`13-tecnologia-e-estrutura.md`).
- **Componentes trazidos do shadcn:** importam o `cn` do pacote `cn`, que não conhece a escala. Ao adaptar, troque o import ou não passe tamanhos por ele.

### 6.3 · A postura: exibição ou contenção

**Regra** (revista em 08.10.2026, à noite; até então, a contenção, com razão de 2 ou menos, valia na capa). O site **se compromete** com uma postura tipográfica, e o `identidade.md` a declara. **Toda capa tem um momento de exibição** (`00-principios.md`, seção 9, camada 1):

| Postura | Razão entre o título (`h1`) da capa e o corpo, medida na mesa | O tom |
|---|---|---|
| **Exibição plena** | **5 ou mais** | O cartaz: peso, condensação, caixa ou itálico de cartaz |
| **Exibição serena** | **4 ou mais** | Os nichos de saúde e de escuta: peso leve, entrelinha aberta, poucas palavras, muito ar em volta |
| Abaixo de 4 na capa | — | **Não se usa:** é o título que não se comprometeu; a régua avisa |

**A contenção** (2 ou menos) fica para as páginas de leitura (os guias, os textos legais, os artigos), onde o texto é o assunto.

**Objetivo.** Na medição de setembro de 2026, os sites de referência que funcionavam se comprometiam com um extremo [V, medido]:
- **Arete:** título de 256 px;
- **Zachmann:** 150 px, com zero imagens;
- **Kononenko:** título de 14 px, que também funciona.

Os doze demos do Atlas ficavam entre 58 e 84 px, no meio. O que une os extremos é o compromisso, não o tamanho.

**Por que a contenção saiu da capa** (08.10.2026, à noite). O site de exemplo de odontologia seguiu a contenção ao pé da letra: o degrau de exibição dele ia de 30 a 35 px (razão 2,06), contra 40 a 80 px no Atlas e ~140 px na barbearia, e abaixo de toda referência medida do ramo (o Klaas, de odontologia, 78 px; o DR ROMEU, de psicologia, 68 px; os próprios demos de setembro, de 58 a 84 px). O título pequeno, com o fundo liso e o diagrama de traço, tirou o site da faixa premium (pedido do usuário: "não está nem um pouco perto de um site premium"). O exemplo de 14 px do Kononenko funciona com a imagem dominando a tela, o que um site de saúde sem foto não tem.

**Como conferir.** A régua mede e informa a razão no relatório (`razaoDoTitulo`), sem julgar. Quem julga é a avaliação anti-IA e esta seção.

**A situação do site do Atlas.** O título vai de 40 a 80 px sobre um corpo de 17 px: razão de 2,35 no celular e de 4,7 na mesa, no meio. Decisão dos sócios pendente (`documentacao/atlas--padrao-de-design.md`, seção 0, no repositório do Atlas).

**Nuances.**
- **Exibição pede título curto.** Uma frase inteira em corpo de exibição domina a tela e não deixa espaço para o resto (Impeccable, `oversized-h1`) [FU]. Exibição bem feita é uma ou duas palavras, um número, um nome.
- **Escala achatada também denuncia.** Degraus vizinhos a menos de 1,25× um do outro deixam a hierarquia plana (Impeccable, `flat-type-hierarchy`) [FU].

### 6.4 · Faixas fluidas e o zoom

**Regra.** Em todo `clamp()`, o máximo é **no máximo 2,5 vezes o mínimo**.

**Objetivo.** Garantir o redimensionamento de texto do WCAG 1.4.4 com zoom de até 500% (OddBird, https://www.oddbird.net/2025/08/26/type-visual/) [FU]. As faixas do Atlas cumprem: o `text-display` vai de 40 a 80 px, 2×.

**Como conferir.** Para cada token fluido, divida o máximo pelo mínimo. Na mão, um zoom de 200% no navegador não deixa nenhum texto cortado.

---

## 7. Espaçamento entre letras e entrelinha

**Regra.** O espaçamento entre letras (`letter-spacing`) acompanha o tamanho: fecha no título e fica perto de zero no corpo.

**Objetivo.** Cada fonte tem um espaçamento ótico que muda com o corpo. O padrão do navegador (zero) fica largo demais no título e certo no corpo.

**Os números.**
- **Inter.** A fórmula do autor é `−0,0223 + 0,185 · e^(−0,1745 · px)` em (https://d.rsms.me/inter-website/v3/dynmetrics/) [V]. Aplicada, dá ~0 a 12 px, −0,011 em a 16 px, −0,020 em a 24 px e −0,022 em de 32 px em diante.
- **San Francisco.** Pela tabela da Apple, em milésimos de em: +6 a 11 pt, 0 a 12, −26 a 17, −23 a 20, −12 a 22, **+14 a 28**, +12 a 34, +8 a 48, +4 a 64 e 0 a 80 (https://developer.apple.com/design/human-interface-guidelines/typography) [V]. **No título, a SF abre; o Inter fecha.**
- **Consequência para a pilha SF + Inter:** um só `letter-spacing` é meio-termo. O Atlas, quando usou essa pilha (de 03 a 05.10.2026), tinha −0,011 em no corpo, −0,025 em nos títulos `h1` e `h2` e −0,015 em no `h3`. Teste no Safari do iPhone e no Chrome do Android, separados. Se o WebKit aplica sozinho o espaçamento da SF pelo `system-ui` é [NV].

**Limites.**
- **Piso de −0,04 em no título.** Mais fechado, as letras perdem a forma (Impeccable, `extreme-negative-tracking`; piso de ofício) [FU].
- **Rótulo curto em caixa-alta abre** (`tracking-wider`); **texto corrido nunca passa de +0,05 em** (Impeccable, `wide-tracking`) [FU].
- **Caixa-alta só em rótulo curto**, nunca em passagem longa: as palavras se reconhecem pela forma (Impeccable, `all-caps-body`) [FU].

**Entrelinha.**

| Texto | Entrelinha | Fonte |
|---|---|---|
| Corpo | 1,5 a 1,6 | WCAG 1.4.8 (AAA): ≥ 1,5 (https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) [V] |
| Títulos | 1,0 a 1,1 | Prática do Atlas e do padrão de design |
| Texto de várias linhas | Nunca abaixo de 1,3 | Impeccable, `tight-leading` [FU] |

**Espaço entre parágrafos:** pelo menos 1,5 vez a entrelinha (WCAG 1.4.8) [V].

---

## 8. Algarismos, quebra e detalhes

| Regra | Objetivo | Como fazer | Fonte |
|---|---|---|---|
| Algarismos tabulares em preço, hora, contador e tabela | Os números se alinham na vertical e não "pulam" quando mudam | `font-variant-numeric: tabular-nums` (`tabular-nums` no Tailwind); o recorte mantém o recurso `tnum`. **A fonte precisa ter o recurso:** sem `tnum`, o `tabular-nums` não muda nada (a Albert Sans do Google Fonts, no teste de 08.10.2026). A régua o mede no navegador e avisa | Butterick, https://practicaltypography.com/alternate-figures.html [V] |
| Algarismos de estilo antigo só no meio de minúsculas | Ao lado de maiúsculas, eles parecem soltos | `oldstyle-nums` só no texto corrido, se a fonte tiver | Butterick [V] |
| Equilíbrio nas linhas dos títulos | Sem palavra sozinha na última linha do título | `text-wrap: balance` em `h1`–`h3` (o Chromium equilibra até seis linhas; Chrome 114, Firefox 121, Safari 17.5) | https://developer.chrome.com/docs/css-ui/css-text-wrap-balance [V] |
| Parágrafo sem última linha curta | Bloco de texto com acabamento | `text-wrap: pretty` nos parágrafos (Chrome e Safari 26; o Firefox ignora sem quebrar nada) | https://webkit.org/blog/16547/better-typography-with-text-wrap-pretty/ [V] |
| Pontuação pendurada | Aspa ou travessão de abertura fora da margem | `hanging-punctuation: first` (só o Safari aplica; nos outros, nada muda) | MDN, BCD [V] |
| Campo de formulário com 16 px ou mais | Abaixo disso, o iPhone amplia a página ao tocar no campo | `text-base` nos `input`, `select` e `textarea` | Vercel, https://vercel.com/design/guidelines [V] |
| Aspas curvas, reticências e espaço inseparável | Acabamento tipográfico; a unidade não quebra longe do número | Aspas “ ” e ‘ ’, nunca as retas; reticências como um caractere (…), não três pontos; espaço inseparável entre o número e a unidade, escrito `\u00a0` no `conteudo/`: `"R$\u00a01.500"`, `"24\u00a0h"` | Vercel [V] |
| Medida da linha de 45 a 75 caracteres, 66 o ideal | Linha longa perde o olho na volta | `max-w-[62ch]` no corpo; `max-w-[48ch]` no lide; nunca acima de 80. **O `ch` não é caractere:** é a largura do zero, e o texto corrido cabe mais, conforme a fonte (62ch deram até 89 caracteres com a Red Hat Text, no teste de 08.10.2026). Comece pelos valores da base e ajuste pela régua, que conta letra a letra e avisa acima de 80 | Bringhurst, http://webtypography.net/2.1.2 [V]; WCAG 1.4.8 [V] |
| Corpo de 16 px ou mais; nada de interface abaixo de 11–12 px | Legibilidade | O corpo do Atlas tem 17 px | Impeccable, `tiny-text`, `undersized-ui-text` [FU] |
| Texto nunca justificado | Sem hifenização, a justificação abre rios de branco | `text-left` | WCAG 1.4.8 [V]; Impeccable, `justified-text` [FU] |

---

## 9. Orçamento de fontes

**Regra.** Na carga inicial, **até 90 KB de fontes no site do Atlas**; **nos sites de marca, sem teto** desde 08.10.2026, à noite (eram 300 KB; antes, 200). A régua mede e relata (`../qualidade/02-regua.md`, bloco 5); no Atlas, reprova acima do teto.

**Objetivo.** A fonte disputa banda com a primeira tela.
- **Sem teto nos sites de marca** (pedido do usuário: "retire limites de tamanho"): as duas famílias da identidade nos pesos que o desenho pede, ou uma variável com eixos. O que se exige é a experiência: a fonte de reserva ajustada, sem deslocamento quando a fonte chega (CLS), e só os pesos usados (`15-desempenho.md`, seção 1).
- **90 KB no Atlas:** as três famílias do site de 28/08 (~52 KB) mais as fontes de título da vitrine (~31 KB). Até 08.10.2026, com San Francisco e Inter (~23 KB), o teto era 60 KB (`../qualidade/02-regua.md`, calibração n.º 13).

**Medido em 08.10.2026:**

| Página | Fontes na carga |
|---|---|
| Atlas, quase todas | 22,4 KB |
| Atlas, Para quem (com a vitrine) | 52,9 KB |
| Barbearia de exemplo | 90,5 KB |
| Depósito de exemplo | 130,2 KB |
| Nutrição de exemplo | 141,1 KB (o `newsreader-texto.woff2`, sozinho, tem 56,8 KB) |

**Como ficar dentro.**
1. Recortar (seção 5).
2. Recortar o eixo de peso ao que se usa.
3. Tirar o itálico que não aparece.
4. Evitar a terceira família.
5. Pré-carregar só a fonte da primeira tela.

---

## 10. Divergência conhecida

O manual de identidade visual v3.1 da marca Atlas pede Archivo Black e Archivo, e o site do Atlas as usa desde 05.10.2026 (mantidas pelo usuário em 08.10); a ata v3.0, V, ainda fixa San Francisco e Inter. Do manual, o site diverge nos detalhes que seguem o site de 28/08 (os números e os subtítulos). O `archivo-600.woff2` segue em `web/app/fontes/` sem uso, até a remoção ser aprovada. Isso vale só para o Atlas: nos sites de marca, a fonte é a da marca do cliente.

---

## 11. Lista de conferência

1. As famílias estão no `identidade.md`, com papel, origem, versão, licença e data.
2. No máximo duas famílias, cada uma com um papel (a terceira do depósito de exemplo é divergência registrada: seção 2.2).
3. Nenhuma fonte da lista de excesso (2.3) sem motivo escrito; nenhuma fonte de sistema como voz de exibição (salvo o Atlas).
4. Toda fonte vem do próprio domínio, pelo `next/font/local`, no layout do próprio site; nenhuma página importa a fonte de outro site.
5. A pilha de reserva não tem nome terminado em número; com a fonte bloqueada, o título cai na reserva certa.
6. `display: swap` na fonte de identidade; `optional` na de texto com reserva próxima; pré-carga só na primeira tela.
7. Arquivos recortados (latino, pesos, recursos); nenhum peso usado fora do arquivo; `font-synthesis-weight: none`.
8. A escala está escrita; nenhum tamanho fora dela; o `cn`, se houver, conhece a escala.
9. A postura está declarada (razão ≥ 5 ou ≤ 2) ou o motivo do meio está escrito; o título de exibição é curto.
10. Toda faixa `clamp` tem máximo ≤ 2,5× o mínimo.
11. Espaçamento entre letras por tamanho; piso de −0,04 em; texto corrido nunca acima de +0,05 em; caixa-alta só em rótulo curto.
12. Entrelinha de 1,5 a 1,6 no corpo e de 1,0 a 1,1 no título; nunca abaixo de 1,3 em texto de várias linhas.
13. Algarismos tabulares nos preços e horários; `balance` nos títulos; `pretty` nos parágrafos.
14. Campos com 16 px ou mais; medida de 45 a 75 caracteres; nada justificado.
15. Fontes na carga dentro do orçamento (régua, bloco 5).
16. Testado no Safari do iPhone e no Chrome do Android: espaçamento e quebra conferidos nos dois.

---

## Fontes citadas

- Butterick, *Practical Typography* — combinar fontes e algarismos: https://practicaltypography.com/mixing-fonts.html · https://practicaltypography.com/alternate-figures.html
- Bringhurst, medida da linha (via Rutter): http://webtypography.net/2.1.2
- Tim Brown, escala modular: https://alistapart.com/article/more-meaningful-typography/
- Inter, métricas dinâmicas: https://d.rsms.me/inter-website/v3/dynmetrics/ · https://rsms.me/inter/
- Apple, tipografia: https://developer.apple.com/design/human-interface-guidelines/typography · licença das fontes: https://developer.apple.com/fonts/
- Next.js, `next/font`: https://nextjs.org/docs/app/api-reference/components/font
- OFL, perguntas frequentes: https://openfontlicense.org/ofl-faq/
- WCAG 2.2, 1.4.4 e 1.4.8: https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html
- OddBird, tipografia fluida e zoom: https://www.oddbird.net/2025/08/26/type-visual/
- Chrome, `text-wrap: balance`: https://developer.chrome.com/docs/css-ui/css-text-wrap-balance · WebKit, `pretty`: https://webkit.org/blog/16547/better-typography-with-text-wrap-pretty/
- Vercel, diretrizes de interface: https://vercel.com/design/guidelines
- Anthropic, convergência distributiva: https://claude.com/blog/improving-frontend-design-through-skills
- Impeccable (detector de marcas de IA e piso de ofício): https://github.com/pbakaus/impeccable
- Web Almanac 2025, fontes: https://almanac.httparchive.org/en/2025/fonts

# A peça-assinatura [C]

> **Para que serve.** Especifica a peça-assinatura do Completo: o objeto que só aquela marca tem, tirado do ofício, que faz o site ser lembrado. Cobre as quatro formas (o 3D em WebGL próprio, o mapa do bairro desenhado, a ilustração encomendada e o som), as condições de cada uma, a implementação de referência do 3D e quando não fazer.
>
> **Quando ler.** Na direção de arte de um site [C] (`../04-direcao-de-arte.md`), antes de escolher a peça, e de novo antes de construí-la.
>
> **Depende de.** `README.md`, `../04-direcao-de-arte.md` (o teste do desconhecido, o teste de unicidade), `../09-movimento.md` (seção 7: o 3D e as cinco condições), `../13-tecnologia-e-estrutura.md` (seção 9.2), `../15-desempenho.md`, `../16-acessibilidade.md`, `01-base-de-todo-site.md` (seções 3 e 15: o mapa e a pausa).
>
> **Implementação de referência.** No repositório do Atlas:
> - **O palco 3D da Barbearia Santa Rosa:** `web/components/ilhas/demos/palco-3d.tsx` (a ilha), `palco-3d/motor.ts` (o motor) e `palco-3d/cena.ts` (o desenho), com a reserva em `web/app/demos/barbearia/barbearia.css` (`.bb-reserva`). A cópia para estudo, num projeto que só tem o kit: `../../referencias/sites-de-exemplo/`, com os mesmos caminhos.
> - **Os mapas desenhados:** `MapaDeSantaRosa`, `MapaDaEntrega` e `MapaGravado`, nos `pecas.tsx` de cada site de exemplo.
>
> **Estado.**
> - **RATIFICADO:** o 3D em WebGL no site de exemplo da barbearia (pedido do usuário em 01.10.2026; o registro de decisões o marcava "ratificar" e "diverge da ESTEIRA, VII"; ratificado em 08.10.2026).
> - **RATIFICADO:** a peça-assinatura como item do Completo de cliente (a ata v3.0, IV.2.1, não a lista; o item 6, ratificado em 08.10.2026, deixa a direção de arte por plano com a esteira) e o 3D só no Completo e só nas cinco condições (`documentacao/atlas--tecnologia.md`, seção 3.2, de 07.10.2026, no repositório do Atlas).
> - **RATIFICADO:** o resto.
>
> **Atualizado em:** 08.10.2026.

---

## 1. O que é

**Regra.** No Completo, a identidade ganha **uma** peça que só esta marca tem:
- tirada do ofício do cliente;
- que passa no **teste do desconhecido** (`../04-direcao-de-arte.md`, passo 8): mostrada fora de contexto a quem não participou, a primeira palavra é a certa.

Ela fica onde a marca se apresenta (a capa, a página "A casa") e repete, discreta, em um ou dois pontos. Nunca em toda seção.

**As quatro formas, da mais leve à mais pesada:**

| Forma | Quando | Peso típico |
|---|---|---|
| **Mapa do bairro desenhado** | O lugar é parte do que se vende (o bairro, o raio de entrega, a rua conhecida) | SVG de 10 a 30 KB (RATIFICADO) |
| **Ilustração encomendada** | O ofício tem um objeto que se desenha melhor do que se fotografa | SVG ou imagem, conforme o desenho |
| **Som** | Raro: o ofício tem um som reconhecível, e o cliente o quer | O arquivo, carregado só no pedido |
| **Objeto 3D em WebGL próprio** | O objeto do ofício tem volume, material e luz que a foto não dá (as fichas de latão da barbearia) | ~16 KB de motor, carregado com o navegador ocioso |

**Objetivo.** O Completo custa R$ 2.400 porque faz o site ser **lembrado** (`../03-planos.md`, seção 5). A peça-assinatura é o que o visitante descreve depois a outra pessoa: "o site da barbearia com as fichas de latão que viram como moeda". Uma peça que caberia em qualquer site não é assinatura: é enfeite, e enfeite é marca de site genérico (`../11-anti-ia.md`).

**No rascunho de 24 horas**, a peça entra na **versão de reserva**, estática: a mesma que aparece sem WebGL ou sem script (`../03-planos.md`, seção 5.7). A versão final chega até a publicação.

---

## 2. Como escolher

Cinco perguntas, nesta ordem:
1. **Qual é o objeto do ofício?** O que o cliente toca, usa ou entrega todo dia: a ficha, a navalha, o mapa da entrega, o molde. Nunca um símbolo genérico de "qualidade" ou de "tecnologia".
2. **Passa no teste do desconhecido?**
   - **O manômetro de setembro:** desenhado para a oficina, foi lido como *relógio*, porque doze graduações em volta de um ponteiro central se leem como relógio antes de qualquer outra coisa.
   - **As dez figuras recusadas:** em setembro, dez figuras desenhadas foram recusadas — panela, mesa de tosa, tesoura, elevador, manômetro, entre outras. Só o globo do Atlas passou, porque foi **medido** do cartão impresso (94,9% de sobreposição), não inventado (`../04-direcao-de-arte.md`).
3. **Cabe no orçamento?** As cinco condições do 3D (seção 3); os orçamentos de `../15-desempenho.md` para as outras formas.
4. **Cabe na norma e no tom do nicho?** Veja a seção 7.
5. **Quem mantém?** O mapa muda quando a rua muda; as fichas, quando os serviços mudam. A peça se desenha a partir do conteúdo tipado: as faces das fichas vêm de `fichas`, no conteúdo da barbearia de exemplo. Assim, a manutenção mensal a mantém sem redesenho.

---

## 3. O objeto 3D em WebGL próprio

### 3.1 · As cinco condições

**Regra.** O 3D entra **só no Completo** e **só se** cumprir as cinco (`../09-movimento.md`, seção 7):

| # | Condição | Como a referência cumpre |
|---|---|---|
| 1 | **Leve e medido** | Motor próprio de ~16 KB, contra ~178 KB do three.js e ~29 a 33 KB do OGL [FU]. Em 12.09, um showroom em WebGL pesava 639 KB de script, doze vezes um demo inteiro [V, medido] |
| 2 | **Sem travar a página** | O motor só é baixado depois da primeira pintura, com o navegador ocioso; os shaders compilam em paralelo (`KHR_parallel_shader_compile`); as faces se desenham uma por vez, no ocioso |
| 3 | **A página existe sem o 3D** | Sem WebGL, sem script, durante a carga e na perda de contexto, aparece a reserva (o selo em traço, `.bb-reserva`) |
| 4 | **Com movimento reduzido, o objeto fica parado** | Sem giro nem ponteiro; só redesenha quando a rolagem muda a cena; as viradas são imediatas |
| 5 | **O objeto é do ofício** e passa no teste do desconhecido | Fichas de latão, alpaca, cobre e bronze, com o nome do serviço em relevo: as fichas de uma barbearia antiga |

**Por que um motor próprio, e não o three.js.** Até 01.10, o 3D era vedado por medição: 639 KB de script, e sem script a página não existia. A barbearia de exemplo tratou as duas razões (`../13-tecnologia-e-estrutura.md`, seção 9.2). Uma biblioteca nova continua sujeita à regra de tecnologia: só com pedido explícito.

### 3.2 · A ilha: carregar sem atrasar a página

```tsx
// components/ilhas/palco-3d.tsx (da referência da barbearia)
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import type { Ficha, Palco } from "@/components/ilhas/palco-3d/motor";

/**
 * Um canvas fixo atrás de todas as páginas, no layout: a ficha em cena atravessa as trocas de página.
 * O motor só é baixado depois da primeira pintura, com o navegador ocioso: o título e o texto não esperam o 3D.
 * Sem WebGL, ou se o desenho falha, a raiz recebe data-sem-3d e a reserva aparece; sem script, também.
 * Decorativo: nada aqui é conteúdo.
 */
export function Palco3D({ fichas }: { fichas: readonly Ficha[] }) {
  const tela = useRef<HTMLCanvasElement>(null);
  const palco = useRef<Palco | null>(null);
  const caminho = usePathname();

  useEffect(() => {
    let vivo = true;
    const canvas = tela.current;
    if (!canvas) return;
    const iniciar = async () => {
      const { iniciarPalco } = await import("@/components/ilhas/palco-3d/motor");
      if (!vivo) return;
      palco.current = iniciarPalco(canvas, {
        reduzir: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        fichas,
        familia: getComputedStyle(canvas).fontFamily, // as faces com a fonte de exibição do site
      });
      if (!palco.current) document.documentElement.setAttribute("data-sem-3d", "");
    };
    // Safari não tem requestIdleCallback: cai num atraso fixo.
    const ocioso = window.requestIdleCallback?.(() => void iniciar(), { timeout: 1500 });
    const reserva = ocioso === undefined ? window.setTimeout(() => void iniciar(), 400) : 0;
    return () => {
      vivo = false;
      if (ocioso !== undefined) window.cancelIdleCallback(ocioso);
      window.clearTimeout(reserva);
      palco.current?.destruir();
      palco.current = null;
    };
    // As fichas são texto fixo do site; o palco nasce uma vez por visita.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    palco.current?.trocarPagina(); // na troca de página, a ficha em cena vira na da página nova
  }, [caminho]);

  return <canvas ref={tela} aria-hidden="true" className="palco" />;
}
```

[NV: o módulo `palco-3d/motor` não está neste documento; a ilha compila (revisão de código de 08.10.2026) salvo esse `import`, e os tipos `Ficha` e `Palco` e a assinatura de `iniciarPalco` não foram conferidos contra a referência do Atlas.]

### 3.3 · O motor: o que ele faz e por quê

O motor da referência tem ~30 KB de fonte e ~16 KB entregues. O desenho é um único *fragment shader* (GLSL ES 1.00, que roda em WebGL 1 e 2) que traça as fichas por *raymarching* de funções de distância (SDF), em até 80 passos por pixel, sem malha nem biblioteca [V: código da referência]. Ele não se copia inteiro aqui: é específico das fichas. Um 3D novo segue o mesmo desenho:

| Decisão | Como | Por quê |
|---|---|---|
| Compilar sem travar | `KHR_parallel_shader_compile`: o primeiro quadro só começa quando a placa de vídeo termina | A compilação síncrona dos shaders trava a página por centenas de ms no celular |
| As faces num atlas | Desenhadas num canvas 2D, com a fonte de exibição do site (espera `document.fonts.load`), em branco sobre preto (o branco é relevo) | O texto em relevo é o texto do site; muda com o conteúdo, sem modelar nada |
| Uma face por vez, no ocioso | As da página aberta primeiro | Em 01.10, o atlas inteiro de uma vez era uma tarefa de 359 ms |
| Célula de 1.024 px num canal só | 1.024 px a partir de 1024 px de tela, se `MAX_TEXTURE_SIZE` ≥ 4.096; 512 px abaixo. Textura `LUMINANCE` (um canal) | O atlas de 1.024 px em um canal ocupa os mesmos 12,6 MB que o de 512 px em RGBA, até 03.10 |
| A ficha de lado fora do texto | A partir de 1024 px, a ficha ocupa uma faixa medida em pixels: a borda de dentro fica de 64 a 95 px além do meio da tela (o texto mais largo das seções com ficha chega a 71 px) e a de fora para a 40 px do fim da tela. A ficha só encolhe se não couber na faixa, com 8% de folga para a perspectiva do giro. Abaixo de 1024 px, fica centrada, com ~31% da largura (a placa, ~40%), e o texto de cada cena fica embaixo, como legenda | Em 01.10, com o centro e o tamanho fixos, a placa cobria até 58 px do texto |
| Resolução que se ajusta | Até 2× a do CSS. A cada 45 quadros: média acima de 1,25 vez a meta (16,7 ms, 60 quadros por segundo), a resolução cai 15%, até a metade; abaixo de 1,08 vez por quatro janelas seguidas, sobe 10%; depois de uma queda, a contagem das janelas folgadas recomeça em −8 (doze janelas seguidas antes de subir de novo). Nada muda nos primeiros 3 s | Nítido onde a placa aguenta; fluido onde não aguenta; sem ficar pulsando entre dois degraus |
| Para quando não é visto | Sem quadro com a aba escondida (`document.hidden`); o tempo para na pausa (`html.ambiente-pausado`, `01-base-de-todo-site.md`, seção 15) | Bateria e WCAG 2.2.2 |
| Perda de contexto | No `webglcontextlost`, para e marca `data-sem-3d`: a reserva aparece | A placa de vídeo pode ser tomada por outra aba; a página não pode ficar com um buraco |
| Nada gravado | — | Privacidade (`README.md`, regra 5) |

**A ligação com a rolagem é a exceção do Completo.**
- **A regra geral:** nada ligado à posição da rolagem, salvo o indicador de progresso e as assinaturas decididas (`../09-movimento.md`, seção 5, item 7).
- **A exceção:** no Completo de referência, a ficha gira com a rolagem e vira de uma seção para a outra, e as cenas em CSS 3D e SVG se desenham ao rolar. Decisão do usuário em 01.10.2026: "o site do plano Completo se desenha ao rolar" (registro de decisões).
- **As regras da exceção:**
  - a rolagem é a nativa, sem inércia;
  - uma escrita por quadro, só nas cenas perto da tela;
  - sem script ou com movimento reduzido, cada cena fica no estado parado escrito no HTML (`style="--p: …"`), completo e legível.

  Implementação de referência: `web/components/ilhas/demos/cena-de-rolagem.tsx`.

### 3.4 · A reserva

```css
/* A reserva: visível sem script, sem 3D e enquanto o palco carrega. Quando o primeiro quadro chega
   (o canvas ganha data-pronto), ela se apaga enquanto o objeto acende no mesmo lugar. */
.reserva { visibility: hidden; opacity: 0; }
html:not(.js) .reserva,
[data-sem-3d] .reserva,
.palco:not([data-pronto]) ~ main .reserva { visibility: visible; opacity: 1; }
@media (prefers-reduced-motion: no-preference) {
  .reserva { transition: opacity 900ms var(--ease-marca), visibility 0s linear 900ms; }
  html:not(.js) .reserva,
  [data-sem-3d] .reserva,
  .palco:not([data-pronto]) ~ main .reserva { transition: opacity 900ms var(--ease-marca), visibility 0s; }
}
```

O `--ease-marca` é o token da curva de entrada da marca, num lugar só (`../09-movimento.md`, seção 3: um token por curva, com o nome do uso). As durações deste documento — 900 ms na troca da reserva pelo objeto e 1,2 s no traço das ruas — passam do teto de 600 ms das entradas (`../09-movimento.md`, seção 2): reduzir a 600 ms, ou registrar a exceção no `decisoes.md`, com o motivo.

**A reserva é desenho de verdade, não um vazio:** na barbearia, o selo da casa em traço, no lugar da ficha. Até 03.10, ela sumia com `display: none`, sem passagem.

### 3.5 · As lições de 03.10

**Giros inesperados ao rolar.**
- **O defeito:** a virada era guardada por par de seções. Quando o centro da tela passava de uma seção, o par trocava de uma vez, e a virada suavizada do par anterior valia no novo: a ficha seguinte aparecia de relance, e a moeda dava meia-volta para trás. A face trocava por um limiar da mistura, a até 45° do perfil.
- **A correção:** uma sequência contínua de faces. A rolagem dá uma posição nessa sequência, e a face só troca de perfil (±90°), já contados os balanços.
- **O resultado:** de 8 meias-voltas para 4; trocas de face visíveis, 0.
- **Também saíram:** a inclinação por seção, que saltava 14° a cada divisa, e a meia-volta para trás no fim de toda troca de página (a troca de página passou de 2 meias-voltas para 1).
- **Salto da rolagem:** uma âncora ou a tecla End (mais de 1,5 posição na sequência de faces) vira direto na face de destino, sem passar pelas do meio.
- **No celular,** a ficha fica com a sua seção enquanto ela está na tela (com folga de 20% da altura para cada lado) e renasce com a passagem da opacidade na seguinte. Antes, subindo, ela sumia ainda na tela; descendo, aparecia de uma vez; sem seção por perto, sumia no meio da tela.
- **Como se mediu:** rolando a 800 px/s no computador, contando as meias-voltas (8 para 4, uma por divisa) e as trocas de face visíveis (4 para 0), com as faces na ordem. Nas sete páginas, no celular (descendo e subindo) e no computador, nenhuma troca de face, salto ou sumiço na tela [V: `web/CLAUDE.md`, 03.10.2026].

**Borrado.**
- **O defeito:** o desenho partia de 64% da resolução nativa na mesa e de 31% no celular. Numa tela de 60 Hz, o ajuste só podia baixar.
- **A correção:** resolução até 2× a do CSS, o ajuste medido contra 60 quadros por segundo e subindo quando sobra tempo, e células de 1.024 px num canal só.
- **O resultado:** 101% e 69% da resolução nativa.

**Regra que ficou:** o 3D se confere **em movimento**, com a rolagem e a troca de página, e na **nitidez** medida contra a resolução nativa. Uma captura parada não pega nenhum dos dois defeitos.
**Outras lições do palco 3D:**
- **A peça não cobre o texto.** Em 01.10, a ficha chegou a ficar até 58 px sobre o texto. A posição se confere em todas as larguras, com a caixa do texto e a do canvas lado a lado.
- **A barra fixa fica fixa.** Em 03.10, a barra da barbearia rolava com a página por uma regra de CSS fora de camada (`@layer`), que no Tailwind 4 vence os utilitários; corrigida, presa no topo (o mesmo mecanismo de `../13-tecnologia-e-estrutura.md`, seção 3.3, item 2).
- **Pausado é parado.** A pausa para o laço de desenho, não só o tempo (seção 3.6).

### 3.6 · Como conferir o 3D

| Verificação | Como |
|---|---|
| Peso | Régua, bloco 5: o script inicial relatado, sem teto nos sites de marca (desde 08.10.2026, à noite); o motor carregado com o navegador ocioso (`../09-movimento.md`, seção 7, condição 2) |
| Travamento | A barreira do travamento no aparelho médio (régua, passagem 2b: nenhuma tarefa acima de 1 s, bloqueio somado até 3 s, até 10% de quadros lentos ao rolar); o rastro de desempenho com CPU 4× só quando ela reprova, para achar a causa (`../../qualidade/08-desempenho.md`) |
| Fluidez | O rastro durante a rolagem: quadros perto de 16,7 ms |
| Sem WebGL | Chrome com `--disable-webgl`: a reserva no lugar, sem erro no console |
| Sem script | Régua, bloco 2: a reserva e as cenas no estado parado |
| Movimento reduzido | Régua, bloco 2: nada se move sozinho; a ficha só muda com a rolagem |
| Perda de contexto | `gl.getExtension("WEBGL_lose_context").loseContext()` no console: a reserva aparece |
| Pausa | O botão de pausa para o tempo **e o laço de desenho**: pausado, nenhum quadro novo (no painel Performance, o canvas para de desenhar). No Atlas, até 08.10.2026, a pausa parava o tempo e o motor seguia redesenhando cada quadro, com a placa de vídeo em alto desempenho (`powerPreference: "high-performance"`; achado de 03.10): PENDENTE lá |
| Regressão visual | O canvas mascarado nas capturas (`../../qualidade/07-regressao-visual.md`); o 3D se confere à parte, em movimento |
| Teste do desconhecido | Com alguém de fora, antes da publicação |
| Defeito do 3D: reproduzir antes de mexer | Gravar o que o shader recebe a cada quadro: um `addInitScript` que embrulha `getUniformLocation`, `uniform1f` e `drawArrays` e registra os valores durante a rolagem. Os dois defeitos de 03.10 (os giros e o borrado) só se explicaram assim |

---

## 4. O mapa do bairro desenhado

**Regra.** O bairro em vetor (SVG), desenhado para a marca:
- só as ruas que importam;
- o ponto do estabelecimento, com o símbolo da marca como alfinete;
- uma referência que todo morador conhece.

**O traço segue a identidade de cada marca:**
- o **papel de projeto**, com o raio da entrega, no depósito;
- a **gravura**, com a baía em hachura, na nutrição;
- o **mapa que se levanta da mesa**, em CSS 3D, na barbearia.

**As regras.**
- **A fonte dos dados:** o OpenStreetMap, com o crédito "© colaboradores do OpenStreetMap" na legenda (ODbL) [FU]. Nunca o decalque de um mapa do Google (`01-base-de-todo-site.md`, seção 3).
- **Movimento:** o traço das ruas pode se desenhar **uma vez**, na entrada (`stroke-dasharray` e `stroke-dashoffset`, CSS puro). Com movimento reduzido, já está desenhado.
- **Acessibilidade:** com nomes de rua, `role="img"` e um `aria-label` que diz o lugar em palavras. Sem eles, decorativo, com o endereço em texto ao lado.
- **Termina em ação:** "Ver no mapa" (o vínculo de navegação) e o WhatsApp.

```css
/* As ruas se desenham uma vez, ao entrar na tela (a classe vem do observador de revelação). */
@media (prefers-reduced-motion: no-preference) {
  .js .mapa-rua { stroke-dasharray: 1; stroke-dashoffset: 1; }
  .js .mapa-revelado .mapa-rua { stroke-dashoffset: 0; transition: stroke-dashoffset 1.2s var(--ease-marca); }
}
/* Cada <path class="mapa-rua"> leva pathLength="1": o traço vai de 0 a 1, qualquer que seja o comprimento real. */
```

**Objetivo.** Nenhum dos 46 sites de referência medidos em setembro tinha mapa desenhado. É assinatura de custo baixo, feita do lugar do cliente, que nenhum concorrente pode copiar sem copiar o bairro.

---

## 5. A ilustração encomendada

**Regra.** Ilustração é ofício: **encomendada a um ilustrador**, com contrato e briefing escritos. Nunca improvisada pelo agente, nunca gerada por IA. O diagrama do ofício (o mapa do bairro, o odontograma, a planta) não é ilustração: segue a seção 4 e `../08-imagem-e-fotografia.md`, seção 2.3.

**Objetivo.** O teste do desconhecido derruba o desenho de quem não é do ofício (as dez figuras de setembro). E a imagem gerada faz o site mentir sobre quem o fez e sobre o que a marca é (`../11-anti-ia.md`).

**Como fazer.**
1. **O briefing ao ilustrador:**
   - o objeto do ofício;
   - as cinco linhas do briefing visual (`../04-direcao-de-arte.md`);
   - a paleta e a tipografia já registradas no `identidade.md`;
   - os tamanhos de uso: a capa, o selo pequeno, o ícone;
   - o formato: SVG com poucos nós, ou PNG e WebP em duas larguras.
2. **O contrato:**
   - a **cessão dos direitos patrimoniais** ao cliente, por escrito, para os usos listados (Lei 9.610/1998, arts. 49 e 50) [FU; o modelo com o advogado];
   - o crédito do ilustrador, se ele pedir;
   - o prazo e as rodadas.
3. **O custo** é repassado ao cliente e orçado **antes** (`../03-planos.md`, seção 7). O preço do Completo não inclui ilustrador.
4. **O teste do desconhecido** antes de aprovar.

---

## 6. O som

**Regra.** Raro, e só com três garantias:
- **Só com o consentimento da pessoa:** um botão "Ligar o som", desligado por padrão. Nunca toca sozinho.
- **Pausa sempre à mão.**
- **O arquivo só carrega** quando a pessoa liga.

O som não leva informação: o site diz tudo sem ele.

**Objetivo.** Som que toca sozinho é o jeito mais rápido de a pessoa fechar o site, no ônibus ou no consultório. A WCAG 1.4.2 exige controle de áudio que toca por mais de 3 s [V]. O botão deixa o som como presente para quem quer, nunca imposto.

**Quando cabe.** Quando o ofício tem um som reconhecível e o cliente o quer: a navalha no couro, numa barbearia. Nenhum site do Atlas tem som hoje; a primeira vez se valida com o usuário.

---

## 7. Quando não fazer, e o que fazer no lugar

| Nicho | Peça | Por quê | No lugar |
|---|---|---|---|
| **Oficina** | **3D só no Completo**, como em todo nicho (o nicho é Profissional) | Até 08.10.2026, à noite, "sem 3D" pelo celular médio do público; desde então, o peso não é motivo, e só a barreira do travamento barra (`../15-desempenho.md`, seção 2.1) | O diagrama do carro como objeto de vitrine, com a matéria da oficina (o aço, a graxa, a luz da bancada): regiões navegáveis, funciona sem script, e vira 3D no Completo |
| **Psicologia, advocacia** | Sem som; sem 3D chamativo | A sobriedade é o tom e a norma; não é a ausência de acabamento | A tipografia de cartaz como peça, com a matéria (o papel, a tinta, o couro da encadernação) e a luz da marca; no Completo, o objeto do ofício em CSS 3D, no tom sereno |
| **Medicina** | **Serena:** sem dramatizar sintoma nem cura; 3D só com o objeto do ofício e a leitura de risco do cliente | A CFM 2.336/2023 veda o sensacionalismo no conteúdo; o acabamento, não (`../03-planos.md`, seção 5.6, revisto em 08.10.2026, à noite) | O objeto do ofício em CSS 3D ou WebGL, no tom sereno; a ilustração técnica encomendada; o mapa do bairro |
| **Odontologia** | Sem o corpo e sem o "sorriso perfeito" | Promessa de resultado (`../nichos/odontologia.md`) | O mapa dos dentes como objeto de vitrine: as arcadas em cerâmica e esmalte, em relevo, em CSS 3D ou WebGL, com o traço como reserva (`../nichos/odontologia.md`, seção 6.7); o instrumento do ofício, em ilustração encomendada (seção 5) |
| **Imobiliária** | O mapa do bairro com a carteira | O lugar é o produto | O mapa com os imóveis (`07-funcionalidades-do-oficio.md`, seção 8) |

---

## 8. Como conferir, em resumo

- [ ] A peça é do ofício e passou no teste do desconhecido, com o registro de quem viu e da primeira palavra.
- [ ] É uma só, e aparece onde a marca se apresenta, não em toda seção.
- [ ] **3D:** as cinco condições, cada uma com a medição da seção 3.6.
- [ ] **Mapa:** o crédito da fonte de dados; desenhado uma vez; já desenhado com movimento reduzido; o endereço em texto ao lado.
- [ ] **Ilustração:** o contrato com a cessão de direitos, guardado pelo cliente.
- [ ] **Som:** desligado por padrão, com pausa, carregado só no pedido.
- [ ] O rascunho de 24 horas com a reserva; a versão final até a publicação.
- [ ] O teste de unicidade contra três concorrentes locais (`../04-direcao-de-arte.md`, passo 9).

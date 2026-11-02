# 16 · Acessibilidade

> **Para que serve.** As regras de acessibilidade de todo site do Atlas. Cobre a obrigação legal e o padrão adotado (WCAG 2.2, nível AA), como cumprir cada critério no código, como conferir, e os casos reais e as pendências do repositório do Atlas.
>
> **Quando ler.** Antes do primeiro componente. Ao criar qualquer controle, formulário, diálogo, galeria, mídia ou movimento. Antes da porta de publicação.
>
> **Depende de.** `00-principios.md` (seção 6), `06-cor-forma-e-superficie.md` (o contraste dos tokens), `09-movimento.md` (movimento reduzido e pausa), `10-texto-e-conteudo.md` (rótulos e textos alternativos), `13-tecnologia-e-estrutura.md` e `17-conformidade-e-normas.md` (seção 3.3: a lei, o símbolo e a declaração). A verificação: `../qualidade/02-regua.md` e `../qualidade/06-acessibilidade.md`.
>
> **Estado.**
> - WCAG 2.2 AA em todo site é DECIDIDO: é obrigação legal (seção 1).
> - O alvo de toque de 44 px e o foco de 2 px com mudança de 3:1 são regras do Atlas acima do AA, em vigor na régua e no padrão de design.
> - O símbolo e a declaração de acessibilidade são RATIFICADO em 08.10.2026 (`17-conformidade-e-normas.md`, seção 3.3).
>
> **Atualizado em:** 08.10.2026.

---

## 1. A obrigação

**A lei** (Lei 13.146/2015, a Lei Brasileira de Inclusão, art. 63) [V]:
- **Caput:** "É obrigatória a acessibilidade nos sítios da internet mantidos por empresas com sede ou representação comercial no País [...] conforme as melhores práticas e diretrizes de acessibilidade adotadas internacionalmente."
- **§ 1º:** "Os sítios devem conter símbolo de acessibilidade em destaque."
  - **RATIFICADO:** o símbolo no rodapé de toda página, com vínculo para a **declaração de acessibilidade** (modelo em `modelos/declaracao-de-acessibilidade.md`).
  - **A forma do símbolo é A CONFIRMAR com advogado:** a lei não a especifica (`17-conformidade-e-normas.md`, seções 3.3 e 10).
  - **Limite de páginas:** as páginas legais (o aviso de privacidade e a declaração) não contam no limite do plano (RATIFICADO; ata v3.0, IV.2.1, item 6, ratificado em 08.10.2026).

**O padrão internacional** que a lei chama é o **WCAG 2.2**, do W3C. O Atlas adota o nível **AA** em todo site, com as regras acima dele da seção 2.

**A norma brasileira.** A ABNT publicou em 11.03.2025 a **NBR 17225**, "Acessibilidade em conteúdo e aplicações web" [FU: notícias e a apresentação do Ceweb.br, que coordenou o texto]:
- foi feita pelo comitê ABNT/CB-040 e se baseia no WCAG 2.2;
- prevê duas conformidades: a regular, com todos os requisitos, e a plena, com os requisitos e as recomendações;
- quem cumpre todos os requisitos alcança os níveis A e AA do WCAG 2.2;
- destaca uma lista de itens críticos, entre eles o captcha e o reconhecimento facial.

**O texto da norma não foi lido:** é vendido pela ABNT. Até a leitura (A CONFIRMAR), vale o WCAG 2.2 AA, que é a base da norma.

**Em observação:** o Projeto de Lei 981/2022, no Senado, muda os arts. 63 e 64. Ele estende a obrigação aos aplicativos e cria sanções graduais, da advertência à retirada do ar. Estava em tramitação em 17.03.2026 [FU].

**Objetivo.**
- **A lei é do cliente:** ela obriga a empresa que mantém o site. Quem constrói é o Atlas, e por isso o site sai acessível de fábrica e a declaração diz o que foi verificado.
- **É também vantagem técnica:** entre 24 sites do dia do Awwwards amostrados em 07.10.2026, a acessibilidade foi a nota técnica mais baixa em 18, com média de 6,96 [FU: pesquisa do Atlas]. O site premium costuma falhar justamente aqui.

---

## 2. O padrão, e onde o Atlas vai além

| Tema | O que o WCAG 2.2 AA pede | O que o Atlas exige | Por quê |
|---|---|---|---|
| **Alvo de toque** | 24 × 24 px, com exceções, entre elas o vínculo no meio do texto (2.5.8) | **44 × 44 px de 320 a 1024 px** de largura (o 2.5.5, nível AAA); o vínculo no meio do texto continua dispensado | O dedo na rua, no ônibus, com uma mão. As diretrizes da Apple pedem 44 pt [FU] |
| **Foco** | Visível (2.4.7) e não encoberto por inteiro (2.4.11) | **Contorno de 2 px ou mais, com mudança de 3:1 ou mais** (o alvo do 2.4.13, nível AAA) | Foco discreto é foco perdido; na mesa, o teclado é como muita gente navega |
| **Movimento** | Pausa para o que se move sozinho por mais de 5 s (2.2.2); nada pisca mais de 3 vezes por segundo (2.3.1) | **Movimento reduzido respeitado em todo movimento** (o 2.3.3, nível AAA); nada ligado à rolagem além da assinatura decidida | Enjoo vestibular; a regra da casa: nenhuma animação acompanha a rolagem |
| **Contraste** | 4,5:1 no texto e 3:1 no texto grande (1.4.3); 3:1 nos componentes (1.4.11) | O mesmo, **medido nos pixels desenhados**, sem arredondar | Texto sobre degradê, vidro, foto e 3D não se calcula pelo hexadecimal |
| **Sem script** | Não pede | **A página inteira existe sem JavaScript** | Aparelho velho, rede ruim, bloqueador, falha de carga |

O WCAG 2.2 tirou o critério 4.1.1 ("Parsing"). Não se persegue mais erro de HTML por causa dele; o HTML válido continua sendo verificação de qualidade (`../qualidade/`).

---

## 3. As regras, tema a tema

Cada regra cita o critério do WCAG 2.2 entre parênteses. As regras valem para **[todos]** os planos e para **[ex]** (o site de exemplo é vitrine: precisa ser exemplar).

### 3.1 · Idioma, título e estrutura

1. **Regra:** `<html lang="pt-BR">` (3.1.1); trecho em outra língua com o próprio `lang` (3.1.2), como uma citação em inglês.
   - **Objetivo:** o leitor de tela escolhe a voz e a pronúncia pelo `lang`; sem ele, lê o português com regras do inglês.
   - **Como conferir:** régua, bloco 3.
2. **Regra:** um `<title>` próprio e distinto em cada página (2.4.2).
   - **Objetivo:** é a primeira coisa que o leitor de tela anuncia. Na navegação interna, o Next anuncia a página nova lendo o `document.title` (ou o `h1`, se não houver título), e só se ele **mudou** (código do anunciador de rotas do Next 16.3.8) [V]. Duas páginas com o mesmo título fazem a troca passar em silêncio.
   - **Como conferir:** régua, bloco 3 (título repetido reprova).
3. **Regra:** um só `h1` por página, que diz o que a página é; os níveis seguem sem saltar (1.3.1, 2.4.6).
   - **Objetivo:** quem usa leitor de tela navega pelos títulos, como quem enxerga passa os olhos.
   - **Como fazer:**
     - o `h1` **lido** é igual ao **desenhado**;
     - as cópias decorativas dos gestos (a tarja, o brilho, o título que se compõe) levam `aria-hidden="true"`, `data-nosnippet` e `user-select: none`.
     - as linhas do título feitas de `span` em bloco levam um espaço de texto entre si: sem ele, o texto sem estilo (`textContent`, o trecho da busca) cola o fim de uma linha ao começo da seguinte. O nome acessível do Chrome separa os blocos, e a régua monta o `h1` lido com espaço entre blocos (`../qualidade/02-regua.md`, bloco 3) [FU: revisão de arquitetura de 03.10.2026, nos títulos de `abertura-de-pagina.tsx` e `tipografia.tsx`, no repositório do Atlas].
   - **Como conferir:** régua, bloco 3 (mais ou menos de um `h1`, ou `h1` lido diferente do desenhado, reprova; salto de nível avisa).
4. **Regra:** regiões nativas:
   - `<header>`;
   - `<nav aria-label="...">`, com `aria-current="page"` no item da página aberta;
   - um `<main id="conteudo" tabIndex={-1}>`;
   - `<footer>`.

   O primeiro elemento focável é o vínculo "Ir para o conteúdo" (2.4.1).
   - **Objetivo:** pular o cabeçalho em toda página; o `tabIndex={-1}` faz o foco ir de fato para o `<main>`.
   - **Como fazer:** o código do vínculo está em `13-tecnologia-e-estrutura.md`, seção 7. O destino de âncora que recebe o foco sem ser controle não ganha contorno:
   ```css
   /* O destino de âncora (o <main>, uma seção) recebe o foco sem ser um controle: sem contorno.
      Só nesses dois: um controle com tabindex="-1" (o item de uma lista com foco itinerante) mantém o anel. */
   :is(main, section)[tabindex="-1"]:focus {
     outline: none;
   }
   ```
   O seletor nomeia os elementos: `[tabindex="-1"]:focus` sozinho valeria para todo elemento com `tabindex="-1"`, e um item de lista com foco itinerante, ou um controle focado por script, perderia o anel de foco (2.4.7; Diretrizes, regra 4).
5. **Regra:** elemento pelo papel:
   - lista é `<ul>` ou `<ol>`;
   - tabela de preço é `<table>` com `<th scope>`;
   - pergunta frequente é `<details>` com `<summary>`;
   - **vínculo navega, botão age.** Nunca `<div onClick>`.
   - **Objetivo:** o elemento nativo traz papel, estado e teclado de graça (1.3.1, 4.1.2).
6. **Regra:** a navegação é a mesma, na mesma ordem, em toda página (3.2.3); a mesma função tem o mesmo nome em todo lugar (3.2.4); o contato fica no mesmo lugar relativo em toda página (3.2.6, "ajuda consistente").
   - **Como fazer:**
     - a ação do WhatsApp fica no cabeçalho ou no atalho flutuante;
     - o contato completo, no rodapé.
7. **Regra:** há mais de um caminho até cada página (2.4.5): o menu e o índice do rodapé, que também é a navegação sem script.

```tsx
// O esqueleto de toda página.
export default function Pagina() {
  return (
    <>
      <Cabecalho /> {/* <header> com <nav aria-label="Principal"> e aria-current na página aberta */}
      <main id="conteudo" tabIndex={-1}>
        <h1>Corte e barba na esquina da Rua Santa Rosa</h1>
        {/* seções, cada uma com <h2> */}
      </main>
      <Rodape /> {/* <footer>: contato, índice das páginas, aviso de privacidade, símbolo e declaração de acessibilidade */}
    </>
  );
}
```

### 3.2 · Nome acessível, texto alternativo e rótulo

1. **Regra:** todo controle tem nome acessível (4.1.2). O botão só de ícone leva `aria-label`. Quando há texto visível, o nome **começa por ele** (2.5.3).
   - **Objetivo:** quem usa comando de voz diz o que vê ("tocar em Enviar no WhatsApp"); se o nome for outro, o comando falha.
   - **Caso real (01.10):** na barbearia de exemplo, o vínculo da marca ficava sem nome quando o nome não cabia na largura, e a acessibilidade do Lighthouse caía para 96. A solução: o nome fica só para leitor de tela (`sr-only`), em vez de sumir.
   - **Como conferir:** régua, bloco 3 (controle sem nome e campo sem rótulo reprovam).
   - **`aria-label` só onde o papel aceita nome:** controle, região, imagem, diálogo. Num `<p>`, `<span>` ou `<div>` sem papel, a ARIA 1.2 proíbe o nome, e o leitor de tela o ignora; o texto vai visível ou em `sr-only` [NV: conferir em https://www.w3.org/TR/wai-aria-1.2/]. No Atlas, `components/paginas/figuras.tsx` tem um `aria-label` num `<p>` (auditoria técnica de 07.10.2026): PENDENTE.
2. **Regra:** imagem informativa tem `alt` que diz o que importa nela; imagem decorativa tem `alt=""`; SVG decorativo tem `aria-hidden="true"` (1.1.1).
   - **Como fazer:**
     - **O logotipo:** `alt` com o nome do negócio.
     - **A foto de pessoa:** quem é e o que faz ("A nutricionista atende uma paciente no consultório"). Nunca "foto de" nem "imagem de": o leitor já diz que é imagem.
     - **A tela de um site** (a vitrine): o que a tela mostra.
     - O texto alternativo segue `10-texto-e-conteudo.md`.
   - **Como conferir:** régua, bloco 3 (imagem sem `alt` reprova); o texto em si, à mão.
3. **Regra:** o vínculo diz para onde leva (2.4.4); o botão diz o que acontece. Nunca "Saiba mais" nem "Clique aqui".
   - **Exemplos:** "Ver os valores", "Enviar pelo WhatsApp", "Copiar a lista".
4. **Regra:** `<iframe>` tem `title` (4.1.2): o simulador do Atlas embute os sites de exemplo.
5. **Regra:** o `<canvas>` do 3D é decorativo (`aria-hidden="true"`). Tudo o que ele mostra existe no HTML como texto.
   - **Objetivo:** a peça-assinatura não pode ser a única portadora de uma informação.

### 3.3 · Contraste

1. **Regra:**
   - **Texto:** 4,5:1 ou mais.
   - **Texto grande:** 3:1 ou mais. Grande é 24 px ou mais, ou 18,66 px ou mais em negrito, que são os 18 pt e os 14 pt do WCAG (1.4.3) [V: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html].
   - **Sem arredondar:** 4,499:1 reprova no par de tokens (item 4 abaixo). A régua mede pixels, com o ruído da suavização, e aceita até 0,05 abaixo do mínimo (`../qualidade/02-regua.md`, bloco 4): entre 4,45:1 e 4,5:1 ela passa, e o par se confere pelo cálculo dos tokens.
   - **Objetivo:** baixa visão, tela barata, sol na tela.
2. **Regra:** componente de interface e gráfico que carrega informação, 3:1 contra o que está ao lado (1.4.11):
   - a borda do campo;
   - o ícone que significa algo;
   - o indicador de foco;
   - a marca do item escolhido num controle segmentado.
3. **Regra:** o contraste se **mede nos pixels desenhados**, não se calcula do hexadecimal, sempre que o fundo não é liso: degradê, foto, vidro, a esfera, o 3D. **Sob uma passiva de luz, vale o pico:** pare as animações em quatro fases e meça em cada uma; a régua vê uma fase só. O conserto preferido é clarear o texto apagado sob a luz, porque baixar a luz até passar a torna invisível (site do Atlas, 02.11.2026).
   - **Como conferir:** a régua, bloco 4. Ela fotografa cada tela com e sem o texto e mede nos pixels do texto; vale o pior trecho (5º percentil).
   - **Avisos para conferir à mão:**
     - o texto com cópia decorativa por cima;
     - o texto pintado por degradê;
     - o texto com desenho no próprio fundo.
4. **Regra:** o contraste de cada par de tokens fica anotado no comentário do token (`06-cor-forma-e-superficie.md`). A cor de seleção (`::selection`) também tem 4,5:1.
5. **Regra:** controle desabilitado está fora da exigência de contraste do 1.4.3 [V], mas continua legível e reconhecível como desabilitado: a aparência muda, o cursor muda e o motivo fica perto ("Preencha as duas medidas").
6. **Conselho, não regra:** o APCA, método candidato do WCAG 3, aconselha Lc 75 ou mais no corpo e 45 ou mais no título [V: https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell]. Usa-se para desempatar escolhas, nunca para aprovar o que o WCAG reprova.

**Casos reais:**

| Caso | Antes | Depois |
|---|---|---|
| O laranja de texto do depósito sobre o quadriculado (07.10) | `#a8431a`, 4,41:1 | `#9a3c16`, acima de 4,5:1 |
| Os números das caixas do início do Atlas (03.10) | 4,49:1 | Acima de 4,5:1; acessibilidade 100 |
| O vínculo da capa sobre a esfera (01.10), pior quadro de 10 instantes da rotação, em 390, 768, 1024 e 1440 px | 4,3:1 com o anteparo do site de 28.08 | 5,96:1, com uma máscara radial e o degradê contido (título ≥ 10,9:1; lide ≥ 6,45:1) |
| O menu sobre a barra de vidro, a cada 150 px de rolagem (87 posições) | — | ≥ 5,83:1 no vidro fosco e ≥ 5,11:1 com refração |

### 3.4 · Foco

1. **Regra:** o foco é um **contorno** (`outline`), nunca só uma sombra: 2 px ou mais, com afastamento, na cor de anel da marca.

   ```css
   /* app/globals.css, dentro de @layer base — o foco de todo controle. */
   :focus-visible {
     outline: 2px solid var(--ring);
     outline-offset: 3px;
   }
   ```
   - **Objetivo:**
     - foco visível (2.4.7);
     - forte, no alvo do 2.4.13: 2 px e mudança de 3:1;
     - visível com **cores forçadas**, o modo de alto contraste do Windows. Nesse modo, a sombra é apagada e o contorno fica (seção 3.13). O `ring` do Tailwind é sombra.
   - **Como conferir:** régua, bloco 4. Ela compara a foto de cada elemento com e sem foco: elemento que recebe o foco sem mudar de aparência reprova. São até 60 paradas de Tab por página.
2. **Regra:** no Tailwind 4, para trocar o contorno nativo por outro desenho de foco, use `outline-hidden`, **nunca** `outline-none`.
   - `outline-hidden` deixa um contorno transparente de 2 px, que reaparece com cores forçadas.
   - `outline-none` apaga o contorno de vez (`outline-style: none`) [V: https://tailwindcss.com/docs/outline-style].
   - **Pendência do Atlas:** três campos dos sites de exemplo usam `outline-none` e marcam o foco só por `ring` ou pela cor da borda (seção 5). Com cores forçadas, o foco deles pode sumir [NV: não testado].
3. **Regra:** o elemento focado não fica escondido sob o cabeçalho fixo (2.4.11).
   - **Como fazer:** `html { scroll-padding-top: <altura do cabeçalho + respiro> }` (`13-tecnologia-e-estrutura.md`, seção 3.3, item 10).
   - **Como conferir:** percorra a página com Tab **e com Shift+Tab**, para cima, que é quando o cabeçalho retrátil reaparece. Nenhum elemento focado pode ficar inteiro sob ele. No Atlas, não conferido: A CONFIRMAR.
4. **Regra:** a ordem do foco segue a ordem visual (2.4.3).
   - **Como fazer:**
     - a ordem do DOM é a ordem de leitura;
     - nunca `tabindex` positivo;
     - nunca reordenar com `order` ou com a grade o que o teclado percorre.

### 3.5 · Teclado

1. **Regra:** tudo o que se faz com o ponteiro se faz com o teclado (2.1.1), e nada prende o foco (2.1.2).
   - **Como fazer:**
     - elementos nativos sempre que existirem;
     - componente próprio, no padrão do APG (o guia de padrões ARIA do W3C) [V: https://www.w3.org/WAI/ARIA/apg/patterns/].
   - **Como conferir:** régua, bloco 4 (armadilha de foco reprova).
   - **Não é armadilha:** o campo de data recebe um Tab por parte (dia, mês, ano). A régua foi calibrada para isso em 07.10.
2. **Regra:** diálogo e menu de tela cheia:
   - o foco entra nele;
   - o fundo fica inerte;
   - Esc fecha;
   - o foco volta ao gatilho;
   - o título do diálogo é o nome dele.
   - **Como fazer:**
     - o `<dialog>` nativo aberto com `showModal()` já prende o foco, deixa o fundo inerte e fecha com Esc. Devolva o foco ao gatilho de forma explícita, no evento `close`, sem depender do navegador;
     - o menu do celular do Atlas usa o `Sheet` do shadcn, sobre o Base UI, que faz o mesmo;
     - animação dentro do diálogo, pela Web Animations API (`13-tecnologia-e-estrutura.md`, seção 3.7, item 6).
   ```tsx
   // Abrir e fechar um <dialog> nativo, devolvendo o foco a quem o abriu.
   function abrir(dialogo: HTMLDialogElement, gatilho: HTMLElement) {
     dialogo.addEventListener("close", () => gatilho.focus(), { once: true });
     dialogo.showModal();
   }
   ```
3. **Regra:** escolha única entre poucas opções (os planos, os aparelhos do simulador, os serviços) é um grupo de **rádios nativos** com aparência de controle segmentado. **RATIFICADO** para sites novos.
   - **Objetivo:** o rádio nativo dá de graça o padrão de teclado esperado:
     - o Tab entra no grupo pelo item marcado;
     - as setas trocam a escolha.

     Ele também dá a semântica de grupo (`<fieldset>` e `<legend>`) e funciona sem script e dentro de formulário.
   - **No Atlas:** o controle segmentado é um grupo de botões com `aria-pressed`, alcançável por Tab, sem as setas (seção 5). Não é falha do AA, mas foge do padrão que o usuário de leitor de tela espera de uma escolha única.
   ```tsx
   // Controle segmentado com rádios nativos: setas, Tab e envio sem script de graça.
   // A bolinha do rádio some (sr-only); o rótulo inteiro é o alvo de 44 px.
   <fieldset className="flex gap-1 rounded-full border border-border p-1">
     <legend className="sr-only">Plano</legend>
     {planos.map((plano) => (
       <label key={plano.id} className="relative">
         <input type="radio" name="plano" value={plano.id} defaultChecked={plano.id === inicial} className="peer sr-only" />
         <span className="flex min-h-11 items-center rounded-full px-5 text-nota transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring">
           {plano.nome}
         </span>
       </label>
     ))}
   </fieldset>
   ```
   O rádio escondido recebe o foco; por isso o contorno é desenhado no rótulo visível (`peer-focus-visible:`).
4. **Regra:** galeria de deslizar tem alternativa sem arrastar (2.5.7): as setas, nas pontas. A área que rola de lado e não tem controle focável dentro recebe `tabIndex={0}`, `role="region"` e `aria-label`, para o teclado poder rolá-la.
5. **Regra:** ação de teclado responde em 0 ms: nada de animação na resposta a uma tecla (`09-movimento.md`). Nenhum atalho de uma tecla só (2.1.4).

### 3.6 · Alvo de toque

1. **Regra:** todo alvo interativo tem 44 × 44 px ou mais, de 320 a 1024 px de largura. O vínculo no meio do texto corrido é dispensado (a exceção do 2.5.8).
   - **Como fazer:**
     - `min-h-11` e `min-w-11` (44 px = 11 × 4);
     - no vínculo de uma lista em linha (os bairros de "Para quem", no Atlas), `-my-2.5 py-2.5`: a caixa cresce para 44 px, e a margem negativa devolve a altura da linha (corrigido assim em 07.10.2026);
     - no botão de ícone, o **próprio botão** tem 44 px, e o ícone fica pequeno no centro. Não aumente a área de toque por pseudoelemento: a régua mede a caixa do elemento e reprovaria o botão de 20 px.
   ```tsx
   // Ícone de 20 px num botão de 44 px: o desenho continua pequeno, o alvo não.
   <button type="button" aria-label="Fechar" className="grid size-11 place-items-center rounded-full">
     <IconeFechar className="size-5" aria-hidden="true" />
   </button>
   ```
   - **Como conferir:** régua, bloco 1, em onze larguras de 320 a 1024 px. A régua mede só a altura (falha abaixo de 43,5 px: `../qualidade/02-regua.md`, bloco 1); a largura se confere à mão, nos botões de ícone e nas marcações.
     - **Ela mede só a altura** da caixa do elemento (reprova abaixo de 43,5 px): a largura se confere à mão.
     - **Ela só vê o estado inicial da página:** o que só aparece com um diálogo, um menu ou um painel aberto se confere à mão ou no teste de ponta a ponta.
   - **Casos reais:**
     - os vínculos dos bairros de "Para quem" tinham 43 px (corrigido em 07.10);
     - os botões de voltar e avançar do simulador do Atlas têm 36 px (`size-9`) e ficam fora do alcance da régua, porque só aparecem com o simulador aberto (seção 5).

### 3.7 · Movimento, piscada e pausa

1. **Regra:** com `prefers-reduced-motion: reduce`:
   - nada se desloca, escala ou gira;
   - a entrada vira dissolução de até 150 ms, ou chega pronta;
   - nada contínuo roda;
   - **nada some.**

   O ajuste vale para as transições de interação e para a troca de página:
   ```css
   /* Movimento reduzido: deslocamento, escala, giro e altura passam a ser instantâneos em toda
      transição de interação; ficam cor, opacidade e sombra. !important porque precisa vencer
      os utilitários do Tailwind, qualquer que seja a especificidade. */
   @media (prefers-reduced-motion: reduce) {
     *,
     ::before,
     ::after {
       transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, opacity,
         box-shadow, visibility !important;
     }
   }

   /* A troca de página fica imediata. */
   @media (prefers-reduced-motion: reduce) {
     .pagina-entra {
       animation: none;
     }
   }
   ```
   - **Objetivo:** enjoo vestibular e distração. O 2.3.3 trata o parallax como não essencial [V: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html].
   - **Como conferir:** régua, bloco 2. Com movimento reduzido, texto invisível ou animação sem fim rodando reprovam. A régua espera as entradas terminarem, até 5 s.
2. **Regra:** o que se move sozinho por mais de 5 s tem **pausa** (2.2.2): o botão do cabeçalho pausa tudo o que leva `data-ambiente`. Além disso, para fora da tela.
3. **Regra:**
   - nada pisca mais de 3 vezes por segundo (2.3.1);
   - nenhum carrossel avança sozinho;
   - nenhuma animação acompanha a posição da rolagem, salvo a assinatura de marca decidida (`CLAUDE.md` do repositório do Atlas; `09-movimento.md`).
4. **Regra:** vídeo:
   - não toca com som sozinho (1.4.2);
   - o vídeo de ambiente é mudo, tem pausa e não toca com movimento reduzido;
   - vídeo com fala tem legenda (1.2.2).
   - **Varia por:** **[C]** o vídeo curto do restaurante (`03-planos.md`).

### 3.8 · Texto, zoom e reflow

1. **Regra:**
   - corpo de 16 px ou mais (o Atlas usa 17);
   - campo de formulário com 16 px ou mais, senão o iPhone amplia a página ao focar;
   - **nunca** bloquear o zoom (`maximum-scale=1` e `user-scalable=no` são proibidos; o `viewport` padrão do Next não os põe) (1.4.4).
2. **Regra:** a 320 px de largura, nada rola para o lado e nada se perde (1.4.10).
   - **Por que 320 px:** é a largura de uma tela de 1280 px com zoom de 400%.
   - **Como conferir:** régua, bloco 1 (rolagem lateral e elemento que sai da tela reprovam). Os casos de 07.10 foram a carta de valores da nutrição e o talão do depósito, que rolavam de lado em 320 px.
3. **Regra:** o texto aguenta o espaçamento aumentado sem cortar nem sobrepor (1.4.12):
   - entrelinha de 1,5;
   - espaço entre parágrafos de 2 vezes o corpo;
   - espaço entre letras de 0,12 em;
   - espaço entre palavras de 0,16 em.
   - **Como fazer:**
     - nenhuma altura fixa em caixa de texto;
     - `nowrap` só em valor curto (`13-tecnologia-e-estrutura.md`, seção 3.3, item 6).
   - **Como conferir:** cole no console do navegador e percorra as páginas:
   ```js
   // Teste do WCAG 1.4.12: aplica o espaçamento máximo pedido a todo texto da página.
   const folha = document.createElement("style");
   folha.textContent = `* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
     p { margin-bottom: 2em !important; }`;
   document.head.append(folha);
   ```
4. **Regra:** tamanho fluido sempre com uma parte em `rem`, como `clamp(2.5rem, 1.5rem + 3vw, 5rem)`, nunca só em `vw`. E o maior valor de cada faixa até 2,5 vezes o menor.
   - **Objetivo:** o texto só em `vw` não cresce com o zoom de texto. Faixa larga demais estoura o 200% do 1.4.4 [FU: OddBird, https://www.oddbird.net/2025/08/26/type-visual/].
5. **Regra:** nada trava a orientação da tela (1.3.4).
6. **Regra:** conteúdo que aparece no hover ou no foco pode ser fechado com Esc, pode receber o ponteiro sem sumir e fica até ser dispensado (1.4.13).

**Regra:** `<br>` escondido por `display: none` cola as palavras em volta dele ("uma vezR$ 190"). Sempre há um espaço antes do `<br>`; em JSX, `{" "}`. A captura não denuncia em toda largura: confira o `innerText` em cada lado do ponto de quebra (site do Atlas, 02.11.2026).

### 3.9 · A cor nunca é a única pista

1. **Regra:** estado, erro, obrigatoriedade e escolha se mostram por mais que cor (1.4.1): texto, ícone, espessura de borda, sublinhado.
2. **Regra:** vínculo no meio do texto é **sublinhado**.
3. **Caso pendente:** na calculadora do depósito, a medida inválida é marcada só pela cor (o fio e o número na cor de ação) e por `aria-invalid`. A correção: uma frase curta ("Digite um número maior que zero") ligada ao campo por `aria-describedby` (seção 5).

### 3.10 · Formulários **[P][C]** e o módulo Agenda

1. **Regra:** todo campo tem **rótulo visível**, ligado por `for`/`id` (3.3.2). O texto de exemplo dentro do campo (`placeholder`) não é rótulo.
2. **Regra:** `type`, `autocomplete` e `inputmode` certos (1.3.5):
   - nome: `autocomplete="name"`;
   - telefone: `type="tel"` e `autocomplete="tel"`;
   - e-mail: `type="email"` e `autocomplete="email"`;
   - medida: `inputmode="decimal"`.
   - **Objetivo:** o celular preenche sozinho e abre o teclado certo; quem tem dificuldade motora ou cognitiva digita menos.
3. **Regra:** obrigatório e opcional marcados **em texto** ("(obrigatório)", "(opcional)"), além do atributo `required`.
4. **Regra:** o erro:
   - é identificado em texto, junto do campo (3.3.1);
   - diz como corrigir (3.3.3);
   - se liga ao campo por `aria-describedby`, com `aria-invalid="true"`;
   - é validado ao **sair** do campo, nunca a cada tecla.

   No envio com erro, o foco vai para o primeiro campo errado.
5. **Regra:** a confirmação e o "Enviando…" são mensagens de estado (4.1.3).
   - **Como fazer:** `role="status"`, numa região que já existe no HTML (seção 3.11).
   - **O que a confirmação diz:** o prazo de resposta (`10-texto-e-conteudo.md`).
6. **Regra:** nenhum teste cognitivo para provar que é gente (3.3.8): sem captcha de imagem ou de quebra-cabeça. A proteção é a de `14-funcionalidades/02-formulario.md`:
   - campo-armadilha;
   - carimbo de tempo assinado;
   - limite por IP;
   - opcionalmente, a prova de trabalho invisível do ALTCHA.

   O captcha também está entre os itens críticos da NBR 17225 [FU].
7. **Regra:** o que a pessoa já informou não se pede de novo no mesmo fluxo (3.3.7). Na Agenda, o nome digitado na escolha do horário segue para a confirmação.
8. **Regra:** se a Agenda segura um horário por tempo limitado, avisa antes de soltar e deixa prorrogar (2.2.1).
9. **Regra (painel do dono da Agenda):**
   - o acesso aceita colar e aceita o gerenciador de senhas (`autocomplete="username"` e `autocomplete="current-password"`);
   - nenhum teste cognitivo (3.3.8).

**O campo de referência** (componente de servidor; funciona no envio sem script, com o erro vindo da validação do servidor). Ele recebe o valor enviado (`valor`), que volta no campo depois do erro: sem script, a página redesenhada o apagaria; com script, o React reinicia os campos não controlados depois da ação, e só o `defaultValue` os devolve (`14-funcionalidades/02-formulario.md`, seção 8, a linha "Valores": "Voltam preenchidos depois de um erro, com e sem script"). O `hover` e o `disabled` têm estado visível (Diretrizes, regra 4):
```tsx
// components/ui/campo.tsx — rótulo visível, dica e erro ligados ao campo.
// O foco vem da regra global :focus-visible (seção 3.4).
type CampoProps = {
  id: string;
  rotulo: string;
  tipo?: "text" | "tel" | "email";
  autoComplete: string; // "name", "tel", "email"…
  inputMode?: "text" | "tel" | "email" | "numeric" | "decimal";
  obrigatorio?: boolean;
  dica?: string;
  erro?: string;   // a mensagem da validação: o problema e a saída
  valor?: string;  // o que a pessoa enviou: volta no campo depois do erro, com e sem script
  maximo?: number; // maxLength
};

export function Campo({ id, rotulo, tipo = "text", autoComplete, inputMode, obrigatorio = false, dica, erro, valor, maximo }: CampoProps) {
  const descricao = [dica && `${id}-dica`, erro && `${id}-erro`].filter(Boolean).join(" ") || undefined;
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-nota font-medium">
        {rotulo} <span className="font-normal text-muted-foreground">{obrigatorio ? "(obrigatório)" : "(opcional)"}</span>
      </label>
      {dica && (
        <p id={`${id}-dica`} className="text-nota text-muted-foreground">
          {dica}
        </p>
      )}
      <input
        id={id}
        name={id}
        type={tipo}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={obrigatorio}
        defaultValue={valor}
        maxLength={maximo}
        aria-invalid={erro ? true : undefined}
        aria-describedby={descricao}
        className="min-h-11 rounded-xl border border-input bg-background px-4 text-corpo transition-colors hover:border-foreground/40 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive"
      />
      {erro && (
        <p id={`${id}-erro`} className="text-nota text-destructive">
          {erro}
        </p>
      )}
    </div>
  );
}
```
O `--destructive` da marca precisa de 4,5:1 sobre o fundo, como todo texto. O erro nunca é só a borda vermelha: a frase está sempre lá.

### 3.11 · O que muda na tela

1. **Regra:** resultado que muda (um total, uma lista, a confirmação de cópia) fica numa região `aria-live="polite"` que **já existe no HTML** antes de mudar. Ela não pode ser inserida junto com o conteúdo.
   - **Objetivo:** o leitor de tela só anuncia mudança numa região que ele já conhecia.
   - **Exemplos no Atlas:**
     - o montador envolve a mensagem numa região viva desde o início;
     - o botão de copiar anuncia "Copiado" ou "Cópia indisponível" num `<span aria-live="polite">`.
2. **Regra:** número que conta (a contagem de `lib/contar.ts`) fica `aria-hidden`. O valor **final** vai, uma vez, num texto só para leitor de tela, dentro da região viva.
   - **Objetivo:** anunciar cada quadro da contagem seria ruído; não anunciar nada deixa o total mudo.
   - **Pendência do Atlas:** o total do montador não é anunciado (seção 5).
   ```tsx
   <p className="text-numero tabular-nums">
     {/* Escrito pelo script de contagem (lib/contar.ts), quadro a quadro: fora da árvore de acessibilidade.
         Não pode ser um nó que o React também atualiza (13-tecnologia-e-estrutura.md, seção 3.9). */}
     <span ref={numero} aria-hidden="true" />
     {/* O valor final, anunciado uma vez a cada mudança. */}
     <span className="sr-only" aria-live="polite">{`Total da criação: ${reais(total)}`}</span>
   </p>
   ```
3. **Regra:** o que carrega:
   - marca a região com `aria-busy="true"` enquanto espera;
   - tem um nome em texto ("Carregando o menu"), mesmo que o desenho seja só a espera animada;
   - o gatilho que espera não muda de tamanho.
4. **Regra:** a troca de página pela navegação interna é anunciada pelo Next, pelo título (seção 3.1, item 2). A âncora interna leva o foco ao destino (`13-tecnologia-e-estrutura.md`, seção 3.7).

### 3.12 · Mapa, ícone e peça-assinatura

1. **Regra:** o mapa desenhado em vetor é complemento.
   - **O endereço:** sempre em texto ao lado, com vínculo para abrir no aplicativo de mapas (navegação, não pedido externo).
   - **O desenho:** decorativo (`aria-hidden="true"`), ou com um `aria-label` que resume o que mostra (no molde "Mapa: [o negócio] fica na esquina de [rua] com [rua], [a referência do bairro]").
2. **Regra:** o ícone que significa algo tem nome (`role="img"` com `aria-label`, ou texto ao lado); o decorativo, `aria-hidden="true"`. O ícone acompanha a cor do texto (`currentColor`): com cores forçadas, ele segue a cor do sistema.
3. **Regra [C]:** a peça-assinatura (3D, ilustração, som):
   - nunca é a única portadora de informação;
   - para com movimento reduzido;
   - tem reserva sem WebGL e sem script;
   - o som nunca toca sozinho.

### 3.13 · Cores forçadas e transparência reduzida

**O que muda com `forced-colors: active`** (o modo de alto contraste do Windows): as cores do texto, do fundo e das bordas viram as cores do sistema. A sombra é apagada, e o degradê de fundo também [FU: MDN, `forced-colors`].

1. **Regra:**
   - o foco é contorno (seção 3.4);
   - todo botão tem borda, transparente se o desenho não a quiser (com cores forçadas, ela aparece e o botão continua sendo um botão);
   - o ícone usa `currentColor`.
2. **Regra:** texto pintado por degradê (as cópias dos gestos do Spell UI) **some** com cores forçadas, e o texto de baixo fica. Sem isso, ele sairia sem cor.
   ```css
   /* Com cores forçadas, as cópias pintadas pelo fundo sairiam sem cor: somem, e fica o texto de baixo. */
   @media (forced-colors: active) {
     .mov-onda-janela,
     .mov-cintila-janela {
       display: none;
     }
   }
   ```
3. **Regra:** com `prefers-reduced-transparency: reduce`, o vidro vira superfície lisa do mesmo tom (o Atlas tem essa saída em `app/vidro.css`).
4. **RATIFICADO:** com `prefers-contrast: more`, as bordas translúcidas viram opacas. Nenhum site do Atlas trata essa preferência ainda.
5. **Como conferir:** no Chrome, DevTools → *Rendering* → emular `forced-colors: active`, `prefers-reduced-transparency` e `prefers-contrast`. Percorra a página com Tab nesse modo.
   - **No Atlas:** há uma única regra de cores forçadas (a do item 2), e o modo nunca foi percorrido: A CONFIRMAR (seção 5).

### 3.14 · Sem script

**Regra:** a página inteira existe e funciona sem JavaScript. Saídas do Atlas:

| Peça | Sem script |
|---|---|
| Menu | Leva ao índice do rodapé |
| Vitrine | Troca por botões de rádio |
| Dúvidas | Abrem em `<details>` |
| Montador | Oferece o WhatsApp direto |
| Formulário | Envia por POST comum |
| 3D | O selo em traço |

- **Objetivo:** aparelho velho, rede que derruba o script, bloqueador e leitor de tela antigo chegam ao mesmo conteúdo.
- **Como conferir:** régua, bloco 2. Sem script: o `h1` aparece, nenhum texto fica invisível e há vínculo para as outras páginas.

---

## 4. Como conferir

| Camada | O que pega | Como | Quando |
|---|---|---|---|
| **A régua** (existe) | Bloco 1: alvos de 44 px, rolagem lateral. Bloco 2: sem script e movimento reduzido. Bloco 3: `lang`, `h1`, títulos, `alt`, nomes, rótulos, ids e âncoras. Bloco 4: contraste nos pixels, foco que muda de aparência, armadilha | `npm run regua` (`../qualidade/02-regua.md`) | Toda mudança de interface |
| **axe nos testes de ponta a ponta** (RATIFICADO) | O WCAG 2.2 AA automatizável, em cada estado (menu aberto, diálogo, erro de formulário) | `@axe-core/playwright` (`../qualidade/06-acessibilidade.md`) | Integração contínua |
| **Teclado, à mão** | Ordem, foco encoberto, diálogos, setas nos grupos, galerias | Tab e Shift+Tab na página inteira, com cada diálogo e menu aberto | Rascunho e publicação |
| **Leitor de tela, à mão** | Nomes, anúncios, ordem de leitura, o que a máquina não ouve | O roteiro abaixo | Rascunho e publicação |
| **Zoom e espaçamento** | Reflow, texto cortado | Zoom de 200% e de 400% na mesa; o teste do 1.4.12 (seção 3.8) | Publicação |
| **Preferências** | Movimento reduzido, cores forçadas, transparência | DevTools → *Rendering* | Publicação |

**A máquina não basta.** A automação acha cerca de 57% dos problemas de acessibilidade [FU: Deque]. A nota 100 do Lighthouse é necessária e não é prova: o resto é teclado, leitor de tela e olho. O nome acessível que a régua calcula é uma aproximação: ela toma o `aria-label`, o `aria-labelledby`, o texto do conteúdo (sem o que é `aria-hidden`, com o `alt` das imagens e um espaço entre blocos), o rótulo e o `title`, e não o algoritmo inteiro do navegador. Quem diz o que se ouve é o leitor de tela.

**O roteiro curto do leitor de tela** (de 5 a 10 minutos por tipo de página; o completo está em `../qualidade/06-acessibilidade.md`):
1. **VoiceOver no Mac** (Cmd+F5), no Safari.
   - **Títulos:** abra o rotor (VO+U) e passe aos títulos. Há um `h1`, e a hierarquia conta a página.
   - **Regiões:** no rotor, banner, navegação, principal e informações de conteúdo.
   - **Vínculos:** no rotor, cada um faz sentido sozinho.
2. **Tab por tudo.** Cada controle diz nome, papel e estado ("Profissional, botão de alternância, selecionado").
3. **O menu e cada diálogo:** o foco entra, Esc fecha, o foco volta.
4. **A funcionalidade principal** (o montador, o formulário, a calculadora, a Agenda): o resultado é anunciado; o erro é lido junto do campo.
5. **VoiceOver no iPhone, ou TalkBack no Android.** Deslize pela primeira tela: o negócio, o que faz, onde, e a ação.
6. **Registro:** o resultado vai no relatório de QA e na declaração de acessibilidade, com a data.

---

## 5. Pendências do repositório do Atlas (08.10.2026)

Corrigir no Atlas e **não repetir** num site novo.

| Pendência | Critério | Onde, no repositório do Atlas | Correção proposta |
|---|---|---|---|
| Símbolo e declaração de acessibilidade ausentes | LBI, art. 63, § 1º | Todos os sites | `17-conformidade-e-normas.md`, seção 3.3; `modelos/declaracao-de-acessibilidade.md` |
| Total do montador não anunciado | 4.1.3 | `components/ilhas/montador.tsx`, `lib/contar.ts` | O valor final num texto só para leitor de tela, na região viva (seção 3.11) |
| Botões de voltar e avançar do simulador com 36 px | Regra do Atlas (44 px); o AA (24 px) passa | `components/ilhas/painel-do-simulador.tsx` (`size-9`) | `size-11`; e conferir os estados abertos, que a régua não vê |
| Controle segmentado sem setas | Padrão do APG; não é falha do AA | `components/ui/toggle-group.tsx` | Rádios nativos (seção 3.5) |
| Medida inválida da calculadora marcada só pela cor | 1.4.1, 3.3.1 | `components/ilhas/demos/calculadora.tsx` | Frase de erro ligada por `aria-describedby` |
| Três campos com `outline-none` e foco só por `ring` ou borda | 2.4.7 com cores forçadas [NV] | `calculadora.tsx`, `agenda-da-barbearia.tsx` e `pedido-por-mensagem.tsx`, em `components/ilhas/demos/` | Tirar o `outline-none` (fica o contorno global) ou trocar por `outline-hidden` |
| Uma só regra de cores forçadas; o modo nunca percorrido | 1.4.11, 2.4.7 | `app/movimento.css` | Percorrer no modo emulado; bordas nos controles |
| Recuo do cabeçalho só para âncoras (`[id] { scroll-margin-top }`) | 2.4.11 [NV] | `app/globals.css` | `scroll-padding-top` no `html` e o teste com Shift+Tab (seção 3.4) |
| Nenhum percurso com leitor de tela registrado | — | — | O roteiro da seção 4, com o resultado no relatório |
| `aria-label` num `<p>` | 4.1.2 [NV] | `components/paginas/figuras.tsx` | O texto visível ou em `sr-only` (seção 3.2) |
| Os nomes das etapas da régua de O trabalho somem no celular | 1.3.1; paridade (`07-composicao.md`, seção 9) | A régua das etapas, em O trabalho | Os nomes visíveis também no celular, em lista se preciso |
| Vínculos que abrem outra aba sem aviso | 3.2.5 (AAA), técnica G201: recomendado | Os vínculos do WhatsApp e os externos | ", abre em nova aba" no fim do nome acessível (`14-funcionalidades/01-base-de-todo-site.md`, seção 1) |

---

## 6. Varia por plano

| Plano | O que muda |
|---|---|
| **[todos]** | O padrão inteiro: WCAG 2.2 AA e as regras da seção 2. O plano nunca decide a acessibilidade |
| **[E]** | Sem formulário e sem movimento contínuo: as seções 3.10 e 3.7 (item 2) quase não se aplicam |
| **[P]** | Formulário e galeria: as seções 3.10 e 3.5 (item 4) |
| **[C]** | Ambiente contínuo com pausa, peça-assinatura com reserva, vídeo com legenda: as seções 3.7 e 3.12 |
| **Agenda** (módulo) | O painel do dono e o tempo de reserva: a seção 3.10, itens 7 a 9 |
| **[ex]** | O mesmo padrão: o site de exemplo é a prova do que se vende |

---

## 7. Conferência rápida

- [ ] `lang="pt-BR"`; título distinto por página; um `h1`; níveis sem salto; regiões nativas; "Ir para o conteúdo".
- [ ] Todo controle com nome (o texto visível no começo do nome); toda imagem com `alt` certo; `iframe` com `title`; `canvas` decorativo.
- [ ] Contraste medido na régua; pares anotados nos tokens; nada de 4,49:1.
- [ ] Foco por contorno de 2 px; nenhum `outline-none` sem substituto; nada encoberto pelo cabeçalho.
- [ ] Tudo pelo teclado; diálogos que prendem e devolvem o foco; escolha única com setas.
- [ ] Alvos de 44 px de 320 a 1024 px, **também nos estados abertos**.
- [ ] Movimento reduzido: nada se desloca, nada some; pausa para o ambiente; nada ligado à rolagem.
- [ ] 320 px sem rolagem lateral; espaçamento do 1.4.12 sem corte; zoom livre.
- [ ] A cor nunca sozinha; vínculo no texto sublinhado.
- [ ] **[P][C]** Formulário com rótulo visível, `autocomplete`, erro em texto ligado ao campo, confirmação anunciada, sem captcha.
- [ ] Regiões vivas que existem desde o HTML; contagem `aria-hidden` com o valor final anunciado.
- [ ] Cores forçadas e transparência reduzida percorridas no modo emulado.
- [ ] Sem script: a página inteira.
- [ ] Roteiro do leitor de tela feito e registrado; símbolo e declaração de acessibilidade publicados (RATIFICADO).

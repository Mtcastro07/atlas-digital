# 06 · Acessibilidade

> **Para que serve.** Como **provar** que um site do Atlas cumpre a WCAG 2.2 AA: o que a régua já mede, o que o axe acrescenta, o roteiro de teclado, o roteiro de leitor de tela, o zoom, o espaçamento de texto, as cores forçadas, e as lacunas conhecidas do site do Atlas. *O que* cumprir, e como construir para cumprir, está em `../esteira/16-acessibilidade.md`. Aqui está como conferir.
>
> **Estado.** A régua mede parte disto desde 07.10.2026 (DECIDIDO). O axe e os roteiros são RATIFICADO.

---

## 1. Por que é obrigação, e não capricho

**Regra.** Todo site do Atlas cumpre a WCAG 2.2 nível AA, conferida antes de cada entrega.

**Objetivo.**
- **É lei.** A Lei Brasileira de Inclusão (Lei 13.146/2015, art. 63) obriga a acessibilidade nos sites mantidos por empresas com sede ou representação comercial no país (https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm) [V]. A norma técnica brasileira ABNT NBR 17225:2025 detalha os requisitos [FU].
- **É o público do comércio de bairro:** pessoas idosas, de vista cansada, com o celular de tela pequena e o brilho baixo na rua.
- **A automação não basta.** Os testes automáticos acham cerca de 57% dos problemas, em volume (Deque, https://www.deque.com/blog/automated-testing-study-identifies-57-percent-of-digital-accessibility-issues) [FU]. O resto é teclado, leitor de tela e julgamento.

---

## 2. As camadas da conferência

| Camada | O que cobre | Quando | Estado |
|---|---|---|---|
| **Lint** (`jsx-a11y`) | `alt` faltando, papel inválido, rótulo ausente, no código | A cada edição | RATIFICADO (`03-estatica.md`) |
| **Régua** | Contraste nos pixels, foco visível, armadilha de foco, alvo de 44 px de altura, nome acessível, rótulos, h1, `lang`, texto invisível com movimento reduzido e sem script, animação sem fim | A cada mudança; porta de rascunho e de publicação | DECIDIDO (`02-regua.md`) |
| **axe**, nas páginas e nos **estados abertos** | As regras automatizáveis da WCAG 2.2 A e AA, inclusive o tamanho mínimo do alvo (2.5.8, 24 px) e as relações ARIA; os 44 px da casa, pela medida própria | Com os testes de ponta a ponta | RATIFICADO (seção 3) |
| **Roteiro de teclado** | Ordem, foco, acesso a toda função, foco encoberto | Porta de rascunho | RATIFICADO (seção 4) |
| **Roteiro de leitor de tela** | O que se ouve: títulos, regiões, estados, anúncios | Porta de publicação | RATIFICADO (seção 5) |
| **Zoom, espaçamento e cores forçadas** | Refluxo, texto aumentado, CSS do usuário, alto contraste do sistema | Porta de publicação | RATIFICADO (seção 6) |

---

## 3. O axe

**Regra.** O axe roda em toda página **e em todo estado aberto** (menu, diálogo do simulador, mensagem preparada, dúvida aberta, erro de formulário), nas regras da WCAG 2.2 A e AA. Violação é falha; o que ele marca como "incompleto" vai para a conferência à mão.

**Objetivo.** A régua mede as páginas fechadas. Os estados abertos só existem depois de um clique, e é neles que mora o diálogo sem título, o botão sem nome e o alvo pequeno. Os botões de 36 px da barra do simulador estão lá, e a régua não os viu (`05-ponta-a-ponta.md`, seção 1). **O axe também não os acusa:** a regra `target-size` do axe-core 4.13 é a do critério 2.5.8 (AA), com mínimo de 24 px (`minSize: 24`, etiquetas `wcag22aa` e `wcag258`), e um botão de 36 px passa. Os 44 px da casa (2.5.5, AAA) se conferem por uma medida própria, `alvosPequenos`, em cada estado aberto.

**Como fazer** (`@axe-core/playwright` 4.13.0 [V], como dependência de desenvolvimento, aprovada em 08.10.2026; MPL-2.0, da Deque, só nos testes: não vai ao site):

```ts
// tests/e2e/alvos.ts — a medida própria dos 44 px, que o axe não cobra.
import type { Page } from "@playwright/test";

/** Controles abaixo de 44 × 44 px num escopo (o axe só cobra 24 px: WCAG 2.5.8, regra target-size).
 *  Vínculo dentro de parágrafo (texto corrido) fica de fora, como na exceção do critério; o de uma lista
 *  de navegação, não: ele não está numa frase. */
export async function alvosPequenos(page: Page, escopo = "body") {
  return page
    .locator(escopo)
    .locator('button, [role="button"], select, input:not([type="hidden"], [type="radio"], [type="checkbox"]), a[href]:not(p a)')
    .evaluateAll((controles) =>
      controles.flatMap((c) => {
        const r = c.getBoundingClientRect();
        if (!r.width || !r.height || (r.width >= 44 && r.height >= 44)) return [];
        const nome = (c.getAttribute("aria-label") ?? c.textContent ?? "").trim().slice(0, 30);
        return [`${c.tagName.toLowerCase()} "${nome}": ${Math.round(r.width)}×${Math.round(r.height)}`];
      }),
    );
}
```

```ts
// tests/e2e/acessibilidade.spec.ts
import AxeBuilder from "@axe-core/playwright";
import { alvosPequenos } from "./alvos";
import { expect, test } from "./vigia";

const REGRAS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function auditar(page: import("@playwright/test").Page, escopo?: string) {
  let axe = new AxeBuilder({ page }).withTags(REGRAS);
  if (escopo) axe = axe.include(escopo);
  const resultado = await axe.analyze();
  // "incomplete": o axe não decidiu (texto sobre degradê, imagem, WebGL). Vai para a conferência à mão.
  test.info().annotations.push({ type: "axe-incompleto", description: resultado.incomplete.map((r) => r.id).join(", ") });
  return resultado.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`);
}

for (const caminho of ["/", "/planos", "/orcamento", "/demos/barbearia"]) {
  test(`axe: ${caminho}`, async ({ page, problemas }) => {
    await page.goto(caminho);
    expect(await auditar(page)).toEqual([]);
  });
}

test("axe: o simulador aberto", async ({ page, problemas }) => {
  await page.goto("/planos");
  await page.locator("a[data-simulador]").first().click(); // o vínculo do site de exemplo abre o simulador
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(await auditar(page, '[role="dialog"]')).toEqual([]);
  expect(await alvosPequenos(page, '[role="dialog"]')).toEqual([]); // hoje acusaria os três botões de 36 px
});
```

*A lista de caminhos sai do mapa do projeto (`00-entender-o-projeto.md`); acima, só o começo. No repositório do Atlas, o simulador fica em Planos, e cada vínculo `a[data-simulador]` abre o diálogo com um site de exemplo (sem script, abre o site numa aba nova).*

**O contraste do axe e o da régua.** O axe calcula o contraste das cores declaradas e marca como "incompleto" o texto sobre degradê, imagem ou WebGL. A régua mede os pixels desenhados. **A régua é o oráculo do contraste.** Se o axe acusar um contraste que a régua aprovou, investigue os dois antes de mexer no site: primeiro o instrumento (`01-metodologia.md`, seção 5).

**Como conferir.** Zero violações em todas as páginas e estados abertos; nenhum alvo abaixo de 44 px nos estados abertos (`alvosPequenos`); os "incompletos" estão listados no relatório de QA com a decisão de quem conferiu.

---

## 4. O roteiro de teclado

**Regra.** Em cada página nova e em cada funcionalidade, uma pessoa percorre o roteiro abaixo, **na mesa**, com o Chrome e o Safari.

| # | Passo | O certo |
|---|---|---|
| 1 | Da barra de endereço, Tab uma vez | A primeira parada é "Ir para o conteúdo", **visível** quando focada; Enter leva o foco ao `main` |
| 2 | Tab até o fim da página | A ordem segue a leitura; nada invisível recebe foco (menu fechado, diálogo fechado, cópias decorativas) |
| 3 | Em cada parada | O foco é visível (contorno de 2 px, ou o equivalente da identidade) e **não fica encoberto** pelo cabeçalho fixo nem pelo atalho flutuante (WCAG 2.4.11) |
| 4 | Shift+Tab até o começo | O caminho de volta é o mesmo. O cabeçalho retrátil, ao reaparecer, não cobre o elemento focado |
| 5 | Cada controle | Enter e espaço ativam; os botões de alternância anunciam o estado (`aria-pressed`); as galerias andam pelas setas e pelos botões, sem exigir arrastar (WCAG 2.5.7) |
| 6 | Cada diálogo | Abre com Enter; o foco entra; o Tab não sai; Esc fecha; o foco volta a quem abriu |
| 7 | Cada formulário | O erro é dito em texto, junto do campo; o foco vai ao primeiro erro; nada depende só da cor (WCAG 1.4.1) |
| 8 | A página inteira | Nenhuma armadilha; nenhuma ação só com o mouse (hover que revela conteúdo também abre com o foco) |

**Objetivo.** A régua prova que o foco **aparece** e não fica preso. Não prova que a ordem faz sentido, que o foco não some sob o cabeçalho nem que a galeria anda pelo teclado.

**Como conferir.** O relatório de QA traz o roteiro marcado, página por página, com o navegador e a data.

---

## 5. O roteiro de leitor de tela

**Regra.** Há dois roteiros:
- **O roteiro curto,** em todo site, antes do rascunho e antes da publicação. É o de `../esteira/16-acessibilidade.md`, seção 4: o VoiceOver no Mac, com o Safari, de 5 a 10 minutos por tipo de página. Cobre:
  - os títulos, as regiões e os vínculos, pelo rotor;
  - o Tab por todos os controles;
  - o menu e cada diálogo;
  - a funcionalidade principal.

  São os itens 1 a 4 e 6 a 8 da tabela abaixo.
- **O roteiro completo,** os dez itens da tabela, antes da publicação do [C] e de todo site com formulário ou Agenda, em **dois leitores no celular**:
  - **o TalkBack, no Chrome do Android:** o aparelho mais comum entre os clientes do comércio local [FU];
  - **o VoiceOver, no Safari do iPhone.**

  Na mesa, o NVDA com o Chrome, se houver uma máquina Windows à mão.

| # | O que ouvir | O certo |
|---|---|---|
| 1 | Ao abrir a página | O título da página; a língua certa (a voz lê em português, pelo `lang`) |
| 2 | A lista de títulos (rotor, ou a navegação por títulos) | Um h1; os h2 contam a página sozinhos, sem saltos; o h1 é lido **uma vez**, sem as cópias decorativas da tarja e da onda |
| 3 | As regiões | Cabeçalho, navegação com nome, principal, rodapé |
| 4 | A lista de vínculos | Cada vínculo diz para onde leva; nenhum "Saiba mais" solto; o do WhatsApp diz que é o WhatsApp |
| 5 | As imagens | A foto que informa tem descrição útil; a decorativa é pulada; o 3D e o canvas são pulados, e o conteúdo deles existe em texto ao lado |
| 6 | Os controles | Nome, papel e estado: "Profissional, botão de alternância, selecionado" |
| 7 | O que muda sem recarregar | A mensagem preparada é anunciada; "Copiado" é anunciado; o resultado da calculadora é anunciado (`aria-live="polite"`) |
| 8 | O diálogo | Anunciado como diálogo, com o título |
| 9 | O formulário | Cada campo com rótulo; o obrigatório dito; o erro lido junto do campo |
| 10 | Preços e números | "R$ 1.500" lido como valor; tabelas de preço lidas linha a linha, com os cabeçalhos |

**Objetivo.** A máquina sabe que existe um nome acessível; não sabe se ele faz sentido. "Trinta anosna mesma esquina", o h1 que a régua pegou em 07.10, só soa errado quando se ouve.

**Como conferir.** O relatório de QA registra o leitor, a versão do sistema, o navegador e o que se ouviu de errado.

---

## 6. Zoom, espaçamento de texto, cores forçadas e movimento

| Verificação | WCAG | Como fazer | O certo |
|---|---|---|---|
| **Refluxo** | 1.4.10 | 400% de zoom numa janela de 1280 px equivale a 320 px de largura: a régua já mede a geometria em 320 | Sem rolagem lateral, sem conteúdo cortado |
| **Texto aumentado** | 1.4.4 | Aumente o tamanho base da fonte do navegador para 200% (no Chrome, nas configurações de aparência; num teste, `document.documentElement.style.fontSize = "200%"` antes de medir a geometria) | Nada se sobrepõe nem é cortado; os tamanhos em `rem` crescem juntos |
| **Espaçamento de texto** | 1.4.12 | Injete a folha abaixo e percorra a página | Nada some, nada se sobrepõe, nenhum botão corta o rótulo |
| **Cores forçadas** | 1.4.11, 1.4.3 | Contraste alto do Windows, ou `forcedColors: "active"` no Playwright | Foco visível; ícones visíveis (SVG em `currentColor`); os botões continuam com contorno; as cópias decorativas pintadas pelo fundo somem |
| **Movimento reduzido** | 2.3.3, 2.2.2 | A régua, passagem 2 | Nada desloca, nada pisca, nenhuma animação sem fim |
| **Orientação** | 1.3.4 | Gire o celular | O site funciona deitado e em pé |

**A folha do espaçamento de texto** (os valores do critério 1.4.12):

```css
/* Cole no DevTools, ou injete com page.addStyleTag({ content }) antes de percorrer a página. */
* {
  line-height: 1.5 !important;
  letter-spacing: 0.12em !important;
  word-spacing: 0.16em !important;
}
p { margin-bottom: 2em !important; }
```

**Contraste sobre fundo que se move.** Onde o texto passa sobre algo animado (a esfera da capa do Atlas, um vídeo, o 3D), mede-se no **pior quadro**. Em 03.10, o contraste sobre a esfera foi medido em 10 quadros da rotação e valeu o pior. A régua mede com movimento reduzido, em que o fundo para. O pior quadro com movimento fica para a conferência à mão.

---

## 7. As lacunas conhecidas do site do Atlas

Achadas pela pesquisa de testes de 07.10.2026 e conferidas no código em 08.10.2026 (no repositório do Atlas). Nenhuma reprova na régua. **A lista viva**, com a correção proposta para cada uma, está em `../esteira/16-acessibilidade.md`, seção 5. Abaixo, a classe de cada uma no ciclo de defeito (`01-metodologia.md`, seção 8). Ficam como modelo do que procurar em todo site.

| Lacuna | Onde | Critério | Classe |
|---|---|---|---|
| Os botões voltar, avançar e início da barra do simulador têm 36 px (`size-9`) e só aparecem com o simulador aberto, fora do alcance da régua | `components/ilhas/painel-do-simulador.tsx` | Regra da casa, 44 px; o mínimo da WCAG 2.5.8 é 24 px, então o axe não acusa | S3: a corrigir |
| A medida inválida da calculadora do depósito é sinalizada só pela cor do número e do fio (há `aria-invalid` para o leitor de tela, e o cupom mostra "—"), sem texto que diga o problema | `components/ilhas/demos/calculadora.tsx` | 1.4.1, 3.3.1 | S3: a corrigir |
| Três campos com `outline-none`, e o foco só por anel ou borda | A calculadora, o agendador da barbearia e o talão do depósito (`components/ilhas/demos/`) | 2.4.7 com cores forçadas [NV] | S3: conferir no modo emulado |
| Os totais do montador mudam sem anúncio; só a mensagem preparada fica numa região viva | `components/ilhas/montador.tsx` | 4.1.3 | S4: a melhorar |
| Os grupos de escolha (plano, aparelho) são botões de alternância, sem as setas do teclado | `components/ui/toggle-group.tsx`, montador, simulador | Padrão do APG para escolha única; não é exigência do AA | S4: a melhorar |
| Uma regra só de cores forçadas, que esconde as cópias decorativas do Spell UI; o modo nunca foi percorrido | `app/movimento.css` | 1.4.11, 2.4.7 | Conferir no modo emulado |
| Há `scroll-margin-top` nas âncoras (`[id]`), mas nenhum `scroll-padding-top` no `html` para o cabeçalho fixo | `app/globals.css` | 2.4.11 | Hipótese a conferir: no Shift+Tab, o foco pode parar sob o cabeçalho [NV] |
| Símbolo e declaração de acessibilidade ausentes | Todos os sites | LBI, art. 63, § 1º | RATIFICADO (`../esteira/17-conformidade-e-normas.md`, seção 3.3) |
| Nenhum percurso com leitor de tela registrado | — | — | A fazer: o roteiro da seção 5 |

**Objetivo.** Lacuna conhecida e não registrada vira lacuna esquecida. Cada linha entra no relatório de defeito quando for tratada.

---

## 8. O que a régua pode ganhar

RATIFICADO: verificações novas, cada uma como **aviso** até provar que não acusa o que não é defeito (`02-regua.md`, seção 10):
- **Foco encoberto.** No passo de teclado, o elemento no centro do foco (`elementFromPoint`) é o focado ou um filho dele, e não o cabeçalho ou o atalho flutuante (WCAG 2.4.11).
- **Texto a 200%.** A geometria medida de novo com `font-size: 200%` na raiz.
- **Estados abertos.** Uma lista, por site, de cliques que abrem os estados (menu, diálogo), com os blocos 1, 3 e 4 medidos depois de cada um.

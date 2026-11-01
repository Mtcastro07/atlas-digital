# 04 · Testes de unidade

> **Para que serve.** Provar em segundos que as contas, as datas, a codificação e as regras de preço estão certas, sem navegador. São as partes do site que erram em silêncio: a tela mostra um número, e ninguém confere se é o número certo.
>
> **Estado.** Em uso desde 08.10.2026: a base e os módulos do kit trazem 135 testes de unidade no `node:test` do Node, sem dependência (9 da base, 39 do formulário e 87 da Agenda). Até 07.10.2026, nenhum teste de unidade existia, e este documento propunha o Vitest 5 (seção 1).

---

## 1. Por que `node:test`, e quando o Vitest

**Regra.** Os testes de unidade usam o `node:test` do Node, com a remoção de tipos nativa, sem dependência. É o que a base e os módulos do kit fazem.

**Objetivo.** Nenhuma dependência para o que o Node já faz. O preço é uma convenção de código, que a base e os módulos seguem:
- **o arquivo testado importa valores só por caminho relativo e com a extensão** (`../lib/moeda.ts`). O apelido `@/` fica para `import type`, que a remoção de tipos apaga: o `node:test` recusa os apelidos do `tsconfig` e os imports sem extensão (https://nodejs.org/api/typescript.html) [V];
- **o arquivo testado não importa `server-only`,** nem o que o importa. Fora do Next, esse pacote lança ao ser importado. A lógica pura recebe a entrega, o banco e o relógio por parâmetro, como no `processar.ts` dos módulos, fora do `"use server"`;
- **o `tsconfig.json` tem `allowImportingTsExtensions`,** com `noEmit`, como na base.

**Como fazer.** No `package.json` (o da base já traz):

```json
{ "scripts": { "test": "node --experimental-strip-types --no-warnings=ExperimentalWarning --test testes/*.test.ts" } }
```

Um arquivo por assunto em `testes/`:

```ts
// testes/moeda.test.ts
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { reais } from "../lib/moeda.ts";

describe("reais", () => {
  it("usa o ponto de milhar e nenhuma casa decimal", () => assert.equal(reais(1500), "R$ 1.500"));
});
```

A lógica de horário recebe o fuso pelo nome (`America/Sao_Paulo`) e o **agora** por argumento: o teste não depende do fuso nem do relógio da máquina (seção 4.6).

**Quando o Vitest.** Um site pode precisar testar o que o `node:test` não alcança sem carregador: um arquivo que só funciona com o apelido `@/` em valores, ou um componente montado com DOM. Nesse caso, o Vitest entra como dependência necessária, pela aprovação do usuário de 08.10.2026, na versão mais nova com mais de 7 dias (`../esteira/13-tecnologia-e-estrutura.md`, seção 10), com a linha no `decisoes.md` do site. A configuração resolve o apelido e o `server-only`:

```ts
// vitest.config.ts — testes de lógica pura, em Node, com o apelido @/ do tsconfig.
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
      // O código de servidor marca a si mesmo com import "server-only"; fora do Next, o pacote
      // lança ao ser importado. No teste, ele vira um módulo vazio (um arquivo com "export {}").
      "server-only": fileURLToPath(new URL("./testes/vazio.ts", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", ".next/**", "producao/**", "testes/e2e/**"],
  },
});
```

Os testes do kit migram trocando só a importação: `import { describe, it } from "vitest"`, com o `node:assert` mantido.

**Como conferir.** `npm test` roda em segundos e sai com 0.

---

## 2. O que testar

**Regra.** Testa-se em unidade **toda lógica pura**: entra um valor, sai um valor, sem tela, rede nem relógio implícito. Não se testa em unidade o que só existe no navegador (`05-ponta-a-ponta.md`).

**A lista** (do repositório do Atlas e dos sites de cliente):

| O quê | Onde mora (repositório do Atlas) | O que pode dar errado | Plano |
|---|---|---|---|
| `reais()` | `lib/moeda.ts` | Separador errado (`1,500`), casa decimal sobrando | [todos] |
| `linkWhatsApp()` e as mensagens prontas (no site de cliente, `vinculoDoWhatsapp()`, da esteira: seção 4.1) | `lib/whatsapp.ts`, `conteudo/demos/comum.ts` | Acento, `&`, `#`, quebra de linha sem codificar: a mensagem chega cortada | [todos] |
| `mensagemDeOrcamento()` | `lib/whatsapp.ts` | "Módulo" no plural errado; valores trocados | Atlas |
| A soma do montador (`somar`) | `components/ilhas/montador.tsx` | Mensalidade de um módulo sem recorrência somada; plano errado | Atlas |
| As invariantes de preço | `conteudo/planos.ts` | Desconto aplicado na mensalidade (a ata de 05.08.2026 fixou: desconto vai na criação, nunca na mensalidade); a Condição de Fundação diferente de metade da criação (ata v3.0, IV.3) | Atlas |
| O número de páginas por plano | `conteudo/planos.ts` | Texto do plano em desacordo com a ata (3, 6, sem limite) | Atlas |
| `paginas` × `sitemap()` | `conteudo/site.ts`, `app/sitemap.ts` | Página nova fora do mapa do site | [todos] |
| O `cn` do servidor com a escala | `lib/utils.ts` | `text-destaque` tomado por cor e descartado ao lado de `text-muted-foreground`: o texto perde o tamanho sem aviso (defeito de 03.10) | [todos] |
| A decodificação da âncora | `components/ilhas/ancoras.tsx` (no site novo, `lib/ancoras.ts`: `decodificarAncora` e `ancoraDoEndereco`, seção 3) | `/#%E0` lança exceção e derruba a página (defeito de 03.10) | [todos] |
| O estado da loja e o corte da entrega | `components/ilhas/demos/estado-da-loja.tsx` | Sábado, domingo, meia-noite, a véspera do feriado; o "Agora" sobre a linha errada (defeito de 07.10) | [P] [C] |
| A calculadora de materiais | `components/ilhas/demos/calculadora.tsx` | Vírgula decimal mal lida ("2,5"); arredondamento de sacos; perda esquecida | Construção |
| A janela de retorno | `components/ilhas/demos/agenda-da-barbearia.tsx` | Mês com 28 dias; virada de ano | Barbearia |
| A Agenda: `instanteEmNiteroi`, `horariosLivres`, o convite `.ics`, `conferirSenha` | `lib/agenda/` (`../esteira/14-funcionalidades/05-agenda.md`, seção 16) | Horário que não cabe antes do fechamento; horário no passado ou além da antecedência máxima; bloco ocupado oferecido; a hora de Niterói errada; o convite com a dobra ou o escape errados | Módulo |
| O formulário: `validar`, `lerTelefone`, `lerCarimbo`, a mensagem do e-mail | `lib/formulario/` (`../esteira/14-funcionalidades/02-formulario.md`, seção 9) | Carimbo adulterado aceito; 2.999 ms tomado por válido; o assunto do e-mail com quebra de linha | [P] [C] |

**Objetivo.** Cada linha é uma afirmação que a tela faz ao visitante: um preço, um horário, uma quantidade. Errar é defeito de verdade do conteúdo (`00-entender-o-projeto.md`, seção 8), e nenhum teste visual o pega.

---

## 3. Extrair a lógica pura de uma ilha

**Regra.** Lógica que mora dentro de uma ilha (um componente React) é extraída para uma função pura em `lib/` ou num arquivo `logica.ts` ao lado da ilha, sem React, sem `window` e sem `Date` implícito. A ilha importa a função; o teste também.

**Objetivo.** Testar sem montar o componente. Uma função que lê `new Date()` ou `window.location` por dentro não se testa com valores fixos; uma que recebe a data e o texto como argumento, sim.

**Como fazer** (exemplo: a decodificação da âncora, que hoje lê `window.location.hash` por dentro):

```ts
// lib/ancoras.ts — a decodificação segura, pura. A ilha chama ancoraDoEndereco(), do mesmo arquivo, que é
// decodificarAncora(window.location.hash) (../esteira/14-funcionalidades/01-base-de-todo-site.md, seção 16).
/** "#duvida-2" → "duvida-2"; "#%C3%A1" → "á"; entrada malformada ("#%E0") → "" em vez de lançar. */
export function decodificarAncora(hash: string): string {
  try {
    return decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return "";
  }
}
```

```ts
// testes/ancoras.test.ts
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { decodificarAncora } from "../lib/ancoras.ts";

describe("decodificarAncora", () => {
  it("devolve o id da âncora", () => assert.equal(decodificarAncora("#duvida-2"), "duvida-2"));
  it("decodifica acento", () => assert.equal(decodificarAncora("#%C3%A1"), "á"));
  it("não lança com entrada malformada (o defeito de 03/10)", () => {
    assert.equal(decodificarAncora("#%E0"), "");
    assert.equal(decodificarAncora("#%E0%A4%A"), "");
    assert.equal(decodificarAncora("#%"), "");
  });
});
```

**Como conferir.** Depois da extração, a ilha não tem mais lógica de conta nem de data por dentro, só a chamada.

---

## 4. Exemplos

### 4.1 · Moeda e WhatsApp

```ts
// testes/moeda.test.ts
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { reais } from "../lib/moeda.ts";

describe("reais", () => {
  it("usa o ponto de milhar e nenhuma casa decimal", () => {
    assert.equal(reais(1500), "R$ 1.500");
    assert.equal(reais(190), "R$ 190");
  });
});
```

```ts
// testes/whatsapp.test.ts — a função da esteira (../esteira/14-funcionalidades/01-base-de-todo-site.md, seção 1).
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { vinculoDoWhatsapp } from "../lib/whatsapp.ts";

describe("vinculoDoWhatsapp", () => {
  it("tira a máscara do número", () => assert.equal(vinculoDoWhatsapp("+55 (21) 90000-0000"), "https://wa.me/5521900000000"));
  it("recusa o número curto", () => assert.throws(() => vinculoDoWhatsapp("(21) 9000-000"), /fora do formato/));
  it("codifica acento, vírgula, cifrão, & e quebra de linha", () =>
    assert.equal(
      vinculoDoWhatsapp("5521900000000", "Olá, R$ 1.500 & café\nLista"),
      "https://wa.me/5521900000000?text=Ol%C3%A1%2C%20R%24%201.500%20%26%20caf%C3%A9%0ALista",
    ));
  it("sem mensagem, sem ?text=", () => assert.ok(!vinculoDoWhatsapp("5521900000000").includes("?text=")));
});
```

*É o teste que a esteira pede para `vinculoDoWhatsapp` — e o que a base traz, em `testes/lib.test.ts` (número com máscara, número curto, acento, quebra de linha e `&`). No repositório do Atlas, a função é outra, `linkWhatsApp` (`web/lib/whatsapp.ts`, que lê o número de uma constante e não o confere), e o teste de lá cobre também a `mensagemDeOrcamento` do montador; copiado para um site de cliente, ele não compilaria.*

### 4.2 · As invariantes de preço

```ts
// testes/planos.test.ts — o oráculo é a ata v3.0 (IV.2: a tabela; IV.3: a Condição de Fundação).
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { modulos, planos } from "../conteudo/planos.ts";

describe("tabela da ata v3.0, IV.2", () => {
  it("criação e mensalidade de cada plano", () => {
    assert.deepEqual(planos.map((p) => [p.id, p.criacao, p.mensal]), [
      ["essencial", 900, 190],
      ["profissional", 1500, 250],
      ["completo", 2400, 400],
    ]);
  });
  it("a página adicional não tem recorrência", () => {
    const pagina = modulos.find((m) => m.porPagina);
    assert.equal(pagina?.criacao, 250);
    assert.equal(pagina?.mensal, undefined);
  });
});

// Se o código calcular a Condição de Fundação, a função é testada assim
// (ata v3.0, IV.3: metade da criação e mensalidade congelada por doze meses; ata de 05.08.2026:
// desconto nunca na mensalidade):
function comFundacao(p: { criacao: number; mensal: number }) {
  return { criacao: p.criacao / 2, mensal: p.mensal };
}
describe("Condição de Fundação", () => {
  it("50% na criação, mensalidade intacta", () => {
    for (const p of planos) assert.deepEqual(comFundacao(p), { criacao: p.criacao / 2, mensal: p.mensal });
  });
});
```

### 4.3 · O estado da loja, com datas fixas

A lógica do depósito, extraída para uma função pura que recebe o **dia da semana e os minutos de parede em Niterói** (o fuso é resolvido fora dela, uma vez):

```ts
// components/ilhas/demos/estado-da-loja.logica.ts
export type Expediente = ([number, number] | null)[]; // índice 0 = domingo
const DIAS = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];

export function estadoDaLoja(dia: number, minutos: number, expediente: Expediente, horaDoCorte: number) {
  const hoje = expediente[dia];
  const aberta = Boolean(hoje && minutos >= hoje[0] * 60 && minutos < hoje[1] * 60);
  let proximo: string | null = null;
  if (!aberta) {
    for (let d = 0; d < 7; d++) {
      const indice = (dia + d) % 7;
      const faixa = expediente[indice];
      if (!faixa || (d === 0 && minutos >= faixa[0] * 60)) continue;
      proximo = `${d === 0 ? "hoje" : d === 1 ? "amanhã" : DIAS[indice]}, ${faixa[0]}h`;
      break;
    }
  }
  // Antes de abrir, o corte de hoje ainda vem: exigir a abertura era o defeito de 03.10.
  const corteHoje = Boolean(hoje && dia >= 1 && dia <= 5 && minutos < horaDoCorte * 60);
  return { aberta, proximo, corteHoje };
}
```

```ts
// testes/estado-da-loja.test.ts — o expediente do depósito de exemplo: seg. a sex., 7h às 18h; sáb., 8h às 13h.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { estadoDaLoja, type Expediente } from "../components/ilhas/demos/estado-da-loja.logica.ts";

const EXPEDIENTE: Expediente = [null, [7, 18], [7, 18], [7, 18], [7, 18], [7, 18], [8, 13]];
const h = (hora: number, minuto = 0) => hora * 60 + minuto;

describe("estadoDaLoja", () => {
  it("quarta às 10h: aberta, com corte do dia", () =>
    assert.deepEqual(estadoDaLoja(3, h(10), EXPEDIENTE, 15), { aberta: true, proximo: null, corteHoje: true }));
  it("quarta às 20h45: fechada, abre amanhã às 7h", () =>
    assert.equal(estadoDaLoja(3, h(20, 45), EXPEDIENTE, 15).proximo, "amanhã, 7h"));
  it("sábado às 14h: fechada, sem corte, abre segunda", () =>
    assert.deepEqual(estadoDaLoja(6, h(14), EXPEDIENTE, 15), { aberta: false, proximo: "seg., 7h", corteHoje: false }));
  it("domingo: fechada o dia todo", () => assert.equal(estadoDaLoja(0, h(11), EXPEDIENTE, 15).aberta, false));
  it("terça às 6h, antes de abrir: fechada, mas o corte de hoje ainda vem", () =>
    assert.deepEqual(estadoDaLoja(2, h(6), EXPEDIENTE, 15), { aberta: false, proximo: "hoje, 7h", corteHoje: true }));
  it("um minuto antes de fechar: aberta; no minuto de fechar: fechada", () => {
    assert.equal(estadoDaLoja(2, h(17, 59), EXPEDIENTE, 15).aberta, true);
    assert.equal(estadoDaLoja(2, h(18), EXPEDIENTE, 15).aberta, false);
  });
});
```

**Objetivo do exemplo.** O defeito de 07.10, o "Agora" sobre a linha dos dias úteis no sábado, nasceu de uma regra de dia da semana esquecida. Datas fixas e explícitas, inclusive sábado, domingo e os minutos de fronteira, são a única forma de testar tempo. **Nunca** `new Date()` dentro do teste.

### 4.4 · A soma do montador

```ts
// testes/montador.test.ts — extraída de components/ilhas/montador.tsx para lib/montador.ts (mesma lógica de somar).
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { somar } from "../lib/montador.ts";

describe("somar", () => {
  it("Profissional com Agenda: 1.900 de criação, 330 por mês", () => {
    const r = somar("profissional", ["agenda"]);
    assert.deepEqual([r.criacao, r.mensal], [1900, 330]);
  });
  it("Completo com Agenda e Presença", () => {
    const r = somar("completo", ["agenda", "presenca"]);
    assert.deepEqual([r.criacao, r.mensal], [2400 + 400 + 300, 400 + 80 + 100]);
  });
  it("a página adicional nunca entra na soma (cobrada por pedido)", () => {
    assert.equal(somar("essencial", ["pagina-adicional"]).criacao, 900);
  });
});
```

### 4.5 · O carimbo de tempo do formulário

O carimbo vai num campo oculto, assinado pelo servidor no momento do pedido, e é conferido no envio. Ele separa o robô da pessoa sem cookie e sem serviço de terceiro (`09-seguranca-e-privacidade.md`, seção 5). A função é a de `../esteira/14-funcionalidades/02-formulario.md`, seção 5.2: `lerCarimbo(carimbo, agora)` devolve `"valido"`, `"forjado"`, `"rapido"` (menos de 3 s, ou idade negativa) ou `"vencido"` (mais de 24 h). O segredo vem de `SEGREDO_DO_FORMULARIO`.

```ts
// testes/carimbo.test.ts — os casos da seção 9 do módulo do formulário (que traz os seus, em testes/formulario.test.ts).
import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
import { emitirCarimbo, lerCarimbo } from "../lib/formulario/carimbo.ts";

const T0 = 1_760_000_000_000; // um instante fixo, com 13 algarismos
before(() => {
  process.env.SEGREDO_DO_FORMULARIO = "segredo-de-teste"; // lido a cada assinatura
});

describe("lerCarimbo", () => {
  it("válido depois de 3 s", () => assert.equal(lerCarimbo(emitirCarimbo(T0), T0 + 5_000), "valido"));
  it("2.999 ms ainda é rápido; 3.000 ms já vale", () => {
    assert.equal(lerCarimbo(emitirCarimbo(T0), T0 + 2_999), "rapido");
    assert.equal(lerCarimbo(emitirCarimbo(T0), T0 + 3_000), "valido");
  });
  it("idade negativa (relógio adiantado) conta como rápido", () => assert.equal(lerCarimbo(emitirCarimbo(T0), T0 - 1_000), "rapido"));
  it("24 h e 1 ms: vencido", () => assert.equal(lerCarimbo(emitirCarimbo(T0), T0 + 24 * 3_600_000 + 1), "vencido"));
  it("assinatura trocada: forjado", () => {
    const [, assinatura] = emitirCarimbo(T0).split(".");
    assert.equal(lerCarimbo(`${T0 - 60_000}.${assinatura}`, T0 + 5_000), "forjado");
  });
  it("carimbo sem ponto, ou vazio: forjado", () => {
    assert.equal(lerCarimbo(String(T0), T0 + 5_000), "forjado");
    assert.equal(lerCarimbo("", T0), "forjado");
  });
});
```

**Por que "rápido" não é descarte.** Uma pessoa com o preenchimento automático do navegador pode enviar em menos de 3 s. O formulário pede para conferir e aceita a segunda tentativa; descartar em silêncio perderia uma pessoa de verdade (o módulo, seção 3.2). O teste de ponta a ponta confere esse caminho (`05-ponta-a-ponta.md`, seção 4).

### 4.6 · A Agenda (o que testar)

As funções são as de `../esteira/14-funcionalidades/05-agenda.md`, seções 3, 4 e 16. Elas recebem o **agora** como argumento, e nunca o leem por dentro. Casos obrigatórios:

| Função | Casos |
|---|---|
| `instanteEmNiteroi` (a hora de parede de Niterói ↔ o instante UTC, pelo nome do fuso) | Um dia comum (−03:00); a virada do ano; uma data com o deslocamento simulado de horário de verão, suspenso desde 2019 mas que pode voltar |
| `horariosLivres` | O serviço que termina exatamente no fechamento entra; o que passa um minuto, não; o intervalo depois do serviço pode passar do fechamento; a antecedência mínima; a antecedência máxima (o horário depois de 30 dias não entra; o que cai exatamente no limite, sim); a data fora do formato ou inexistente ("2026-13-45", "2026-02-30") dá lista vazia; duas faixas no dia; uma folga no meio; o bloco de 15 min ocupado, e o horário que **atravessa** um bloco ocupado |
| O convite `.ics` | As linhas com CRLF; a dobra em 75 octetos, com acento; o escape de vírgula e de ponto e vírgula; o `Z` nos horários; o `ORGANIZER`, com o nome sem aspas nem quebra |
| `conferirSenha` e `conferirEntrada` | A senha certa; a errada; o `scrypt` com o custo lido do registro (`scrypt$N$r$p$sal$hash`); o registro truncado, de outro tipo ou com custo ilegível dá falso, sem lançar; o e-mail inexistente (`conferirEntrada(senha, undefined)`) dá falso e passa pelo `scrypt`, no mesmo tempo |

**Objetivo.** Horário oferecido errado é visitante perdido, ou dois clientes na mesma cadeira: nota 9 na matriz de risco. A defesa final contra a marcação dupla é a chave única do banco (`09-seguranca-e-privacidade.md`, seção 5), provada pela corrida de ponta a ponta (`05-ponta-a-ponta.md`, seção 5.6).

## 5. O que não testar em unidade

| Não testar aqui | Por quê | Onde testar |
|---|---|---|
| Server Components assíncronos | Nem o `node:test` nem o Vitest os renderizam (https://nextjs.org/docs/app/guides/testing/vitest) [V] | `05-ponta-a-ponta.md` |
| Desenho, posição, contraste, movimento | Dependem do navegador | A régua (`02`) e a regressão visual (`07`) |
| A ilha montada com estado | Custo alto e pouco ganho num site deste tamanho | Os fluxos de ponta a ponta |
| Textos do conteúdo, um por um | Teste que repete o texto quebra a cada revisão de redação | O léxico e a leitura (`10`) |

**Regra de manutenção.** Teste de unidade que quebra a cada mudança de texto ou de desenho está no lugar errado. Mova-o para a camada certa ou apague-o.

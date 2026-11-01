# 03 · Verificação estática

> **Para que serve.** Pegar em segundos, sem navegador, o que nunca deveria chegar a ele:
> - erro de tipo e vínculo interno errado;
> - violação das regras da casa;
> - formatação inconsistente;
> - CSS proibido;
> - HTML inválido;
> - dependência vulnerável.
>
> **Estado.** O `tsc` já roda dentro do `next build`; o resto é RATIFICADO, ainda não implantado (`13-integracao-continua.md`, seção 9). Versões e datas de outubro de 2026 [V salvo indicação].

---

## 1. Tipos: `next typegen` e `tsc --noEmit`

**Regra.** Todo envio passa por `next typegen && tsc --noEmit`, com `strict` ligado e `typedRoutes: true` no `next.config.ts`.

**Objetivo.**
- **Erro de tipo** é o defeito mais barato de achar e um dos mais caros de deixar passar.
- **Os tipos das rotas** (`typedRoutes`) transformam um `<Link href="/plano">` escrito errado num erro de compilação (https://nextjs.org/docs/app/api-reference/config/typescript) [V]. É uma verificação de vínculo interno de graça.
- **O `next typegen`** gera os tipos das rotas sem compilar o site inteiro.

**Como fazer.**

```bash
npx next typegen && npx tsc --noEmit
```

```ts
// next.config.ts — um trecho; o resto do arquivo segue como está.
const nextConfig: NextConfig = {
  typedRoutes: true, // href de <Link> conferido pelo TypeScript
  // ...
};
```

**Como conferir.** O comando sai com código 0. O `tsconfig.json` tem `"strict": true`; o repositório do Atlas não tem `any` nem `@ts-ignore` (auditoria de 07.10.2026).

**Varia por.** Ligar `typedRoutes` num projeto existente pode acusar `href` montados por texto (`"/demos/" + id`). Tipifique o id ou use `as Route` no ponto exato, com comentário.

---

## 2. ESLint 10, com as regras da casa

**Regra.** O lint usa o **ESLint 10**, a configuração do Next (núcleo dos sinais vitais e TypeScript), as regras de acessibilidade do `jsx-a11y`, as do `react-hooks` 7 e as **regras da casa** escritas como regras de lint.

**Objetivo.** As regras do Atlas — nada gravado no aparelho, `cn` fora do navegador, `"use client"` só nas ilhas — hoje estão escritas em `CLAUDE.md`, e "instrução em arquivo é pedido; verificação é garantia". O projeto já viu regra da casa desobedecida sem que nada acusasse. O lint transforma a regra em garantia na hora da edição.

**O que mudou e precisa de cuidado** (pesquisa de 08.10.2026):
- **O ESLint 9 saiu de suporte em 06.08.2026** (https://eslint.org/version-support/) [V]. Use o 10, com o `eslint-config-next` do mesmo número do Next instalado (16.3.8). O suporte ao ESLint 10 está documentado para a 16.4 (https://nextjs.org/docs/app/api-reference/config/eslint) [V]: confirme-o na 16.3 antes de instalar.
- **O Next 16 tirou o `next lint`:** roda-se o `eslint` direto (https://nextjs.org/blog/next-16) [V].
- **O `eslint-config-next` liga só 6 regras do `jsx-a11y`, e como aviso.** Espalhe as regras do `jsxA11y.flatConfigs.recommended` por cima.
- **O `jsx-a11y` 6.10.2 ainda declara suporte só ao ESLint 9:** precisa de um `overrides` no `package.json` [V].
- **O `react-hooks` 7, no `recommended`,** inclui regras do React Compiler, como `set-state-in-effect` (https://react.dev/reference/eslint-plugin-react-hooks) [V]. Espere achados nos 32 arquivos de cliente (as ilhas e o `ui/`; no Atlas, 27 em `ilhas/` e 5 em `ui/`, contagem de 08.10.2026) na primeira rodada e trie antes de bloquear. As ilhas de referência da esteira que chamam `setState` dentro do efeito (`EstadoDaLoja`, `ControleDoMovimento`, o efeito do formulário) também devem ser acusadas [NV: o `react-hooks` 7 não foi rodado contra elas].

**Como fazer.** Um `eslint.config.mjs` de exemplo, completo e comentado:

```js
// eslint.config.mjs — o lint do site. Cada bloco diz a regra da casa que protege.
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  // Acessibilidade: o eslint-config-next liga só 6 regras do jsx-a11y, e como aviso.
  // Só as regras (o plugin já vem registrado pela configuração do Next).
  { rules: { ...jsxA11y.flatConfigs.recommended.rules } },

  // Nada gravado no aparelho (producao/esteira/17-conformidade-e-normas.md, seção 6): sem cookie,
  // localStorage ou sessionStorage. Exceção única: a sessão do painel da Agenda, no servidor
  // (cookie HttpOnly posto pela resposta, nunca pelo script do navegador).
  {
    rules: {
      "no-restricted-globals": [
        "error",
        { name: "localStorage", message: "Nada gravado no aparelho (conformidade)." },
        { name: "sessionStorage", message: "Nada gravado no aparelho (conformidade)." },
      ],
      "no-restricted-properties": [
        "error",
        { object: "window", property: "localStorage", message: "Nada gravado no aparelho." },
        { object: "window", property: "sessionStorage", message: "Nada gravado no aparelho." },
        { object: "document", property: "cookie", message: "Nenhum cookie no site público." },
      ],
      "no-restricted-syntax": [
        "error",
        {
          // decodeURIComponent lança em entrada malformada; dentro de um efeito, derruba a página
          // (o defeito de 03/10: /#%E0). A decodificação segura mora num lugar só.
          selector: "CallExpression[callee.name='decodeURIComponent']",
          message: "Use decodificarAncora (lib/ancoras.ts): decodeURIComponent solto lança em %E0.",
        },
      ],
    },
  },

  // "use client" só nas ilhas e nos componentes de interface, mais os arquivos de erro,
  // que o Next exige como componentes de cliente.
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["components/ilhas/**", "components/ui/**", "app/**/error.tsx", "app/global-error.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Program > ExpressionStatement[directive='use client']",
          message: "Server Component por padrão: estado e script só em components/ilhas/ ou components/ui/.",
        },
        {
          selector: "CallExpression[callee.name='decodeURIComponent']",
          message: "Use decodificarAncora (lib/ancoras.ts).",
        },
      ],
    },
  },

  // Código que vai ao navegador (ilhas e interface): sem cn (o motor de fusão de classes
  // custava ~9 ms de CPU na carga, 180 ms com CPU 20×) e sem o conteúdo inteiro do site
  // (a ilha recebe só o que usa, por props: até 03/10, o objeto inteiro ia serializado no HTML de cada
  // página, ~11 KB no depósito e ~6 KB na barbearia).
  {
    files: ["components/ilhas/**/*.{ts,tsx}", "components/ui/**/*.{ts,tsx}"],
    // Exceção documentada: o painel do menu (sob demanda) usa o cn padrão do shadcn.
    ignores: ["components/ui/sheet.tsx"],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "cn", message: "Sem cn no navegador: concatene as classes." },
            { name: "@/lib/utils", importNames: ["cn"], message: "Sem cn no navegador." },
          ],
          // O objeto inteiro de um site de exemplo, só como tipo (allowTypeImports).
          patterns: [
            {
              group: ["@/conteudo/demos/*"],
              importNames: ["depositoSite", "barbeariaSite", "nutricaoSite"],
              allowTypeImports: true,
              message: "A ilha recebe só os campos que usa, por props.",
            },
          ],
        },
      ],
    },
  },

  // As páginas do Atlas nunca importam a fonte de um site de exemplo (o empacotador junta
  // as duas, e a página do Atlas passa a pré-carregá-la).
  {
    files: ["app/(atlas)/**/*.{ts,tsx}", "components/secoes/**/*.{ts,tsx}", "components/paginas/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        { patterns: [{ group: ["@/components/demos/*/fontes"], message: "Fonte de site de exemplo fora do Atlas." }] },
      ],
    },
  },

  // O lugar onde a decodificação segura mora pode chamar decodeURIComponent (dentro de try).
  {
    files: ["lib/ancoras.ts"],
    rules: { "no-restricted-syntax": "off" },
  },

  // Testes de ponta a ponta: pedir a fixture `problemas` liga a vigia (05-ponta-a-ponta.md, seção 3),
  // sem usá-la no corpo. Sem isto, o no-unused-vars do typescript-eslint reprova cada teste vigiado.
  {
    files: ["tests/**/*.ts"],
    rules: { "@typescript-eslint/no-unused-vars": ["error", { args: "none" }] },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "ferramentas/**", ".regua/**"]),
]);
```

No `package.json`: o `jsx-a11y` 6.10.2 declara suporte só ao ESLint 9, e o `overrides` força a resolução.

```json
{
  "overrides": {
    "eslint-plugin-jsx-a11y": { "eslint": "$eslint" }
  }
}
```

*Cada caminho e cada nome acima é o do repositório do Atlas. No repositório novo, ajuste-os à estrutura de `../esteira/13-tecnologia-e-estrutura.md`. A sintaxe das opções (`importNames` dentro de `patterns`, `allowTypeImports`) é a do `@typescript-eslint/no-restricted-imports`. Confira na versão instalada antes de bloquear [NV].*

**Uma armadilha de configuração.** O `no-restricted-syntax` não se soma entre blocos: o último bloco que casa com o arquivo vence. Por isso o seletor de `decodeURIComponent` aparece de novo no bloco do `"use client"`.

**O estado do repositório do Atlas (08.10.2026).** A âncora é decodificada em três lugares: dois dentro de `try` — `components/ilhas/ancoras.tsx` (`ancoraDoEndereco`) e `components/ilhas/montador.tsx` (a chegada em `/orcamento#orcamento-<plano>`) — e um **solto**, no clique de vínculo interno (`components/ilhas/ancoras.tsx`, linha 151: um `href` malformado lança no ouvinte de clique, um erro de console que a régua acusa). A regra acusaria os três. A correção é a função única `decodificarAncora`, em `lib/ancoras.ts`, testada em unidade (`04-unidade.md`, seção 3). É a regra pedindo a mudança certa, não alarme falso. A leitura de `location.hash` sem decodificar, como a do agendador da barbearia, que só compara com uma expressão regular, não lança e fica livre. A pesquisa de 07.10 listava também `location.hash` entre as propriedades vedadas; ficou fora do lint porque a leitura sem decodificar não lança, e a regra de não ler o destino por ela (`../esteira/13-tecnologia-e-estrutura.md`, seção 3.7) se confere na revisão.

**Duas regras que se evitam:**
- **Regra ingênua de cor em hexadecimal.** Dispara nos `themeColor` do `viewport`, que são legítimos (o Next pede cor literal ali). A regra "nenhum hexadecimal em componente" se confere na revisão e na lista de tokens.
- **Regras com acerto baixo em CSS-in-JS.** Classes do Tailwind se conferem pelo plugin próprio (seção 3).

**Como conferir.** `npx eslint . --max-warnings=0` sai com 0 [NV: o conjunto — ESLint 10, o `eslint-config-next` do número do Next instalado (16.3.8; o suporte ao ESLint 10 está documentado para a 16.4), `typescript-eslint` e o `overrides` do `jsx-a11y` — não foi instalado nem rodado na revisão de código de 08.10.2026]. Na primeira adoção, rode, conte os achados por regra e trie antes de ligar como porta: os achados que já existem recebem uma impressão digital, e só os novos falham (`01-metodologia.md`, seção 3).

---

## 3. Classes do Tailwind: o plugin `better-tailwindcss`

**Regra.** Classes proibidas pelas regras da casa são acusadas pelo `eslint-plugin-better-tailwindcss` (regra `no-restricted-classes`, por expressão regular):
- espaçamento com colchetes (`p-[18px]`), quando a grade de 4 px é a regra;
- `translate-*`, `scale-*` e `rotate-*` em `hover:` de botão: o botão não anda nem muda de tamanho no hover, pedido do usuário em 01.10.

**Objetivo.** A grade de 4 px e o botão parado no hover são decisões do usuário (Diretrizes de Design Premium, regra 2; 01.10.2026). A pesquisa de 08.10 contou 6 classes de espaçamento entre colchetes no repositório do Atlas: algumas são ajustes legítimos (posições em % de figuras, `env()`), por isso a regra começa como aviso.

**Como fazer** (a forma das opções conforme a documentação do plugin, a confirmar na versão instalada [NV]):

```js
// Trecho do eslint.config.mjs.
import betterTailwind from "eslint-plugin-better-tailwindcss";

export default defineConfig([
  // ...
  {
    plugins: { "better-tailwindcss": betterTailwind },
    settings: { "better-tailwindcss": { entryPoint: "app/globals.css" } }, // Tailwind 4: o CSS de entrada
    rules: {
      "better-tailwindcss/no-restricted-classes": [
        "warn",
        {
          restrict: [
            { pattern: "^-?(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y)-\\[.+\\]$", message: "Espaço na escala de 4 px, sem colchetes." },
            { pattern: "^hover:(-?translate|scale|rotate)-", message: "Botão não anda nem muda de tamanho no hover." },
          ],
        },
      ],
    },
  },
]);
```

**Como conferir.** Os achados existentes estão triados (exceção registrada no código ou corrigidos) antes de a regra virar falha.

---

## 4. Formatação: Prettier com o plugin do Tailwind

**Regra.** Prettier com o `prettier-plugin-tailwindcss`. No Tailwind 4, o plugin precisa da opção `tailwindStylesheet`, que aponta para o CSS de entrada (https://github.com/tailwindlabs/prettier-plugin-tailwindcss) [V].

**Objetivo.** Diferenças de formatação poluem a revisão e escondem a mudança de verdade. A ordem canônica das classes torna visível a classe repetida ou em conflito.

**Como fazer.** O `.prettierrc`:

```json
{
  "printWidth": 140,
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "./app/globals.css"
}
```

- **A primeira formatação do repositório inteiro** vai num **commit único**, sem outra mudança. O hash desse commit entra em `.git-blame-ignore-revs`, para que o `git blame` continue mostrando quem escreveu cada linha.
- **`printWidth`:** escolha a largura que o código já usa. O repositório do Atlas tem 79 linhas com mais de 200 caracteres (auditoria de 07.10). A formatação vai quebrá-las, o que é desejável, mas só no commit único.

**Como conferir.** `npx prettier --check .` sai com 0.

---

## 5. O CSS compilado

**Regra.** Depois do `next build`, um script lê o CSS gerado (`.next/static/**/*.css`) e reprova quatro padrões:

| Padrão proibido | Por quê |
|---|---|
| `@keyframes` que anima propriedade fora de `transform`, `opacity`, `translate`, `scale`, `rotate` (com lista de exceções nomeadas) | "Só `transform` e `opacity`": o resto repinta ou refaz o leiaute a cada quadro (web.dev) [V] |
| `transition` com `all`, ou com propriedade de leiaute (`width`, `height`, `top`, `left`, `margin`, `padding`) | `transition: all` anima o que ninguém escolheu; leiaute animado trava |
| `animation-timeline` fora de `@supports` | Navegador sem suporte descarta só a linha do tempo e roda a animação inteira na carga: o efeito vira piscada |
| `:hover` cru fora de `@media (hover: hover)` | No toque, o hover "gruda" depois do toque. Os `hover:` do Tailwind 4 já saem protegidos (https://tailwindcss.com/docs/upgrade-guide) [V]; o risco é o CSS escrito à mão nas folhas `vd-`, `mov-`, `dm-` |

**E um quinto, de memória do projeto:** a abreviação `animation` **sem nome**. O minificador do Tailwind 4 (Lightning CSS) reduz uma abreviação sem nome de animação a `animation: none`. Em 03.10, o brilho do Spell UI ficou com duração de 0 s por isso. Regra: toda regra com `animation` traz a abreviação inteira, com o nome. O script procura `animation:none` no CSS compilado onde o fonte tinha outra coisa.

**Exceções nomeadas (repositório do Atlas)**, cada uma com motivo:

| Exceção | Motivo |
|---|---|
| `filter` (desfoque) no ícone de copiar | 2 px num ícone de 16 px, por uma fração de segundo |
| `clip-path` no pontilhado da carta de valores da nutrição e nos traços que se desenham | Desenho de entrada, uma vez |
| `stroke-dashoffset` nos traços em SVG | O traço que se desenha uma vez não compete com o conteúdo; é CSS puro e respeita movimento reduzido |

**Como fazer.** Um script pequeno, sem dependência:

```js
// ferramentas/verificar-css.mjs — reprova o CSS compilado que viola as regras de movimento.
import { globSync, readFileSync } from "node:fs"; // globSync: nativo desde o Node 22

const PERMITIDAS = new Set(["transform", "opacity", "translate", "scale", "rotate", "offset", "visibility"]);
const EXCECOES = new Set(["filter", "clip-path", "stroke-dashoffset"]); // cada uma com motivo no documento
const problemas = [];

for (const arquivo of globSync(".next/static/**/*.css")) {
  const css = readFileSync(arquivo, "utf8");

  // 1. Propriedades animadas em @keyframes.
  for (const [, nome, corpo] of css.matchAll(/@keyframes\s+([\w-]+)\s*{((?:[^{}]*{[^{}]*})*)}/g)) {
    for (const [, prop] of corpo.matchAll(/([a-z-]+)\s*:/g)) {
      if (!PERMITIDAS.has(prop) && !EXCECOES.has(prop) && !prop.startsWith("--")) {
        problemas.push(`${arquivo}: @keyframes ${nome} anima "${prop}"`);
      }
    }
  }
  // 2. Transições de tudo ou de leiaute.
  for (const [decl] of css.matchAll(/transition(-property)?:[^;}]*/g)) {
    if (/\ball\b|\b(width|height|top|left|right|bottom|margin|padding)\b/.test(decl)) problemas.push(`${arquivo}: ${decl}`);
  }
  // 3. animation-timeline fora de @supports. Percorre as chaves: a condição "@supports (animation-timeline: …)"
  //    não conta, e uma declaração conta como "dentro" se algum bloco que a envolve testa a linha do tempo.
  let fora = 0;
  const pilha = []; // um item por chave aberta: true se é um @supports que testa animation-timeline
  for (const m of css.matchAll(/@supports([^{]*)\{|\{|\}|animation-timeline\s*:/g)) {
    if (m[0].startsWith("@supports")) pilha.push(/animation-timeline/.test(m[1]));
    else if (m[0] === "{") pilha.push(false);
    else if (m[0] === "}") pilha.pop();
    else if (!pilha.includes(true)) fora++;
  }
  if (fora) problemas.push(`${arquivo}: animation-timeline fora de @supports (${fora})`);
  // 4. A abreviação zerada pelo minificador.
  if (/animation:none/.test(css)) problemas.push(`${arquivo}: animation:none (abreviação sem nome?) — confira o fonte`);
}

if (problemas.length) {
  console.error(problemas.join("\n"));
  process.exitCode = 1;
}
```

*A regra 3 percorre as chaves, e não conta pela expressão: a contagem antiga somava ao total a própria condição `@supports (animation-timeline: …)` e cortava o bloco no primeiro `}}`, e CSS correto (um `@media` dentro do `@supports`) reprovava. As outras expressões regulares são aproximações do CSS minificado. A primeira rodada tem de ser lida inteira, e o que for falso positivo vira exceção nomeada ou ajuste da expressão. A verificação de `:hover` cru exige percorrer as regras dentro e fora de `@media`; se for necessária, use um analisador de CSS em vez de expressão regular.*

**Como conferir.** O script sai com 0 no build atual, e cada exceção da lista tem motivo escrito.

---

## 6. Dependências: `npm audit`

**Regra.** `npm audit --omit=dev --audit-level=high` em todo build. Vulnerabilidade alta ou crítica na árvore de produção bloqueia.

**Objetivo.** A árvore de produção é o código de terceiro que chega ao visitante e ao servidor. A de desenvolvimento não vai ao ar: as 6 vulnerabilidades altas de `braces`, que vinham do CLI do `shadcn`, deixaram de importar quando ele passou às dependências de desenvolvimento (03.10.2026).

**Como fazer.**

```bash
npm audit --omit=dev --audit-level=high     # bloqueia
npm audit                                    # informa (desenvolvimento incluído), sem bloquear
```

**Como conferir.** Saída "found 0 vulnerabilities" na árvore de produção. O resto da política de dependências (espera de 7 dias, Dependabot, ações fixadas) está em `09-seguranca-e-privacidade.md`, seção 7.

---

## 7. O HTML pré-renderizado: `html-validate`

**Regra.** Depois do build, o HTML das páginas estáticas (`.next/server/app/**/*.html`) passa pelo `html-validate` (RATIFICADO; dependência de desenvolvimento, entra com a etapa). O que é erro de HTML bloqueia. O que é estilo do HTML que o React gera fica desligado, com motivo.

**Objetivo.** O navegador conserta o HTML inválido em silêncio, cada um do seu jeito, e o leitor de tela lê o resultado do conserto:
- um `<a>` dentro de outro `<a>`;
- um `<div>` dentro de um `<p>`;
- um `id` repetido;
- um atributo ARIA com valor inválido.

A régua pega parte disso no DOM final (bloco 3). A validação pega no HTML que saiu do servidor, que é o que a página sem script mostra.

**Como fazer.** O `.htmlvalidate.json` (a forma da configuração; confira os nomes das regras na versão instalada [NV]):

```json
{
  "extends": ["html-validate:recommended", "html-validate:document"],
  "rules": {
    "no-inline-style": "off",
    "void-style": "off",
    "require-sri": "off",
    "no-trailing-whitespace": "off"
  }
}
```

```bash
npx html-validate ".next/server/app/**/*.html"
```

- **`no-inline-style` desligada:** o React escreve atributos `style`.
- **`void-style` desligada:** o React fecha os elementos vazios (`<br/>`).
- **`require-sri` desligada:** o site não usa integridade de sub-recurso; tudo vem do próprio domínio.

**Como conferir.** A primeira rodada é lida inteira, e cada regra desligada tem o motivo escrito ao lado (`01-metodologia.md`, seção 3). A página renderizada a cada pedido não tem HTML no build: valida-se a resposta do servidor (`curl`), no teste de ponta a ponta.

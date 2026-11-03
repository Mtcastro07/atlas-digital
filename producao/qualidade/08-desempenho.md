# 08 · Desempenho

> **Para que serve.** Como medir o desempenho de um site do Atlas sem se enganar: o que é porta e o que é tendência, o método do Lighthouse que o projeto validou, como comparar duas versões, como medir a interação, o que conferir no endereço publicado e como investigar uma piora. Os **orçamentos** e as **técnicas** que os cumprem estão em `../esteira/15-desempenho.md`. Aqui está a medição.
>
> **Estado.** Bytes e CLS na régua: DECIDIDO. O método do Lighthouse: DECIDIDO, em uso desde 30.09.2026 (especificação do site, seção 7, no repositório do Atlas). O script de comparação intercalada e a medição da interação: RATIFICADO. O ritmo de 60 quadros por segundo como porta de todo site, e a leitura da seção 11: desde 28.10.2026 (pedido do usuário; `../esteira/15-desempenho.md`, seção 2.4).

---

## 1. O que se mede, e onde

| Medida | Instrumento | Porta ou tendência | Por quê |
|---|---|---|---|
| Script inicial, fontes, peso total | Régua (bloco 5) | **Porta só no site do Atlas**; nos sites de marca, medida (desde 08.10.2026, à noite) | Bytes não variam entre execuções; nos sites de marca, "o tamanho do site não importa, e sim só seu design" (Gabriel Ribeiro Ota Yida) |
| **A barreira do travamento** no aparelho médio (CPU 4×, 4G lento) | Régua (passagem 2b) | **Porta** nos sites de marca | Só o extremo: uma tarefa acima de 1 s, mais de 3 s de bloqueio somado, mais de 10% de quadros lentos ao rolar ou a primeira tela acima de 10 s. Alta o bastante para não reprovar por sorte (`../esteira/15-desempenho.md`, seção 2.1) |
| **O ritmo dos quadros** (60 por segundo) na rolagem, no menu, na navegação e na figura | Régua dos quadros (`02-regua.md`, seção 12) | **Porta** em todo site, no celular 4× e na mesa; aviso no celular 6× | Pedido do usuário (22 e 27.10.2026). A porta de 3 batidas fica a uma batida do ruído entre sessões: lê-se pela seção 11, em duas sessões |
| CLS na carga | Régua (bloco 5) | **Porta** (≤ 0,05) | Medido com movimento normal e sem cache; 0 a 0,002 nas 23 páginas do Atlas |
| CLS ao rolar | Régua | Aviso | Depende do ritmo da rolagem |
| Pedido externo, erro de console | Régua | **Porta** | Binário |
| LCP, TBT, nota de desempenho | Lighthouse, no método da seção 3 | Nos sites de marca, **diagnóstico** quando a barreira reprova; no Atlas, **tendência**, e comparação intercalada quando a mudança pode pesar | Tempo varia: o TBT da mesma versão foi de 357 a 1.089 ms em 7 execuções |
| INP (a resposta ao toque) | Medição de laboratório da interação (seção 6) | Tendência | O Lighthouse de navegação não mede interação |
| Tempo do primeiro byte, compressão, cache | `curl` no endereço publicado (seção 7) | Conferência na publicação | O servidor de produção não é a máquina local |
| Dados de campo (visitantes reais) | Nenhum | — | O relatório público do Chrome (CrUX) exige um tráfego que um site de bairro não tem [FU]. Coletar no próprio site seria coleta de dados, contra a regra de nada gravar e nada enviar sem necessidade |

**Objetivo.** Porta só com sinal determinístico, ou com uma barreira tão alta que o ruído não a alcança (`01-metodologia.md`, seção 3). Nos sites de marca, bloqueiam a barreira do travamento e o ritmo dos quadros; no Atlas, também os bytes, e o tempo de carga só pela comparação relativa, acima do ruído medido. O ritmo dos quadros é a exceção à porta só com sinal determinístico: o usuário o pediu como característica de todo site, e a leitura da seção 11 tira o ruído.

**O tamanho do script se mede; não se lê no build.** O Next 16 tirou a coluna de tamanho do `next build` (https://nextjs.org/blog/next-16) [V]. A régua mede o que o navegador baixa: o corpo comprimido dos `<script>` do HTML, sem o polyfill `nomodule`.

---

## 2. Os números de referência

Para dar escala ao que é normal num site do Atlas. Rodada final da régua de 08.10.2026, e Lighthouse 13.5 de 03.10.2026, perfil móvel:

| Medida | Início do Atlas | Outras páginas do Atlas | Sites de exemplo |
|---|---|---|---|
| Script inicial | 155,3 KB | 143,9–154,2 KB | 136,5–143,2 KB |
| Fontes | 22,4 KB | 22,4 KB (52,9 em Para quem) | 90,5–141,1 KB |
| Total na carga | 271,6 KB | 265–301 KB | 308–384 KB |
| CLS na carga | 0 | 0 | 0 a 0,002 |
| TBT, CPU 20× (mediana de 7) | 716 ms (357–1.089) | — | — |
| LCP medido, CPU 20× (mediana de 7) | 2,11 s (1,77–2,67) | — | — |
| LCP simulado, perfil padrão | 2,79 s | — | — |

**O piso do Next 16 com React 19 é ~131 KB de script.** O TBT com CPU 20× é, em boa parte, a hidratação do React: um custo fixo de uma página deste tamanho. Baixá-lo exige mudar a estratégia de hidratação, o que está PENDENTE na especificação. O `<Suspense>` por seção foi tentado e saiu: com o texto do DOM alterado antes da hidratação, causava o erro de hidratação 418 e âncoras fora do lugar (especificação do site, seção 4).

---

## 3. O método do Lighthouse

**Regra.** Toda medição de tempo segue este método, sem exceção:

| Passo | Como | Por quê |
|---|---|---|
| 1 | **Build de produção** (`npm run build && npm start`) | O `next dev` mede outra coisa |
| 2 | **Fechar o navegador do Playwright** (e qualquer aba aberta na mesma página) | Aberto, inflava o TBT de ~240 para mais de 600 ms com CPU 20× (01.10.2026) |
| 3 | **Perfil móvel**, em duas configurações: a padrão (rede e CPU simuladas) e **CPU 20× com estrangulamento real** (`--throttling-method=devtools`) | Os 20× emulam um Android de entrada numa máquina rápida (Apple M5). O estrangulamento real mede o que acontece; o simulado (Lantern) estima |
| 4 | **3 execuções** no perfil padrão; **5 a 7**, sempre em número ímpar, com CPU 20× (`../esteira/15-desempenho.md`, seção 4.3) | Mediana, com mínimo e máximo. Com CPU 20× o ruído é grande |
| 5 | **Mesma máquina, mesma sessão** para tudo que se compara | Em 01.10, a versão de 30.09 foi recompilada e medida de novo para a comparação ser justa |
| 6 | **A base de comparação compilada fora do repositório** | Dentro de uma pasta ignorada pelo git, o Tailwind leu o `node_modules` e gerou uma folha duas vezes maior (48,6 contra 25,5 KB comprimidos), o que distorcia os tempos (03.10.2026) |
| 7 | **Intercalar** base e versão nova, alternando quem vai primeiro | A máquina esquenta e a rede local varia; intercalar distribui o acaso igualmente |
| 8 | **Anotar a máquina** em cada medição, e só comparar medições da mesma máquina | O mesmo 20× emula outro aparelho noutra máquina: a medição da fusão de 01.10, noutra máquina, não se compara às outras. O relatório do Lighthouse grava o índice da máquina (`environment.benchmarkIndex`) [FU]. **Noutra máquina, como a da integração contínua, calibre o multiplicador:** 20 × (índice da máquina nova ÷ índice da máquina de referência), para que "20× no M5" emule o mesmo aparelho; só então a meta absoluta, que avisa, quer dizer o mesmo [FU: pesquisa de QA de 07.10.2026; NV: a fórmula, no guia de estrangulamento do Lighthouse] |

```bash
# O Lighthouse 13 declara Node ≥ 22.19; com a 22.17.1 (a máquina do desenvolvimento em 08.10.2026), o npm só avisa. Atualize o Node.
npx lighthouse@13 http://localhost:3000/ --form-factor=mobile --only-categories=performance \
  --output=json --output-path=./lh-padrao.json --quiet
npx lighthouse@13 http://localhost:3000/ --form-factor=mobile --only-categories=performance \
  --throttling-method=devtools --throttling.cpuSlowdownMultiplier=20 \
  --output=json --output-path=./lh-cpu20.json --quiet
```

**O LCP simulado e o medido.** No perfil padrão, o Lighthouse **simula** a rede (Lantern) e põe as fontes pré-carregadas no caminho do elemento do LCP. Na capa do Atlas, o simulado ficou acima de 2,5 s (2,61 a 3,46 s, conforme a fase) enquanto o medido com estrangulamento real ficava entre 1,96 e 2,5 s. Registra-se os dois. **Decide-se pelo medido**, e o simulado serve de tendência. *Objetivo:* não "otimizar" contra um artefato da simulação. Pré-carregar só a fonte de título, para agradar o simulado, piorou o real (LCP com CPU 20× de 2,13 para 2,86 s, em 01.10).

---

## 4. A comparação intercalada

**Regra.** Quando uma mudança pode pesar (biblioteca nova, ilha nova, efeito novo, fonte nova), mede-se a base e a mudança **intercaladas**, 7 vezes cada com CPU 20×. A piora é **real** quando o **mínimo** da versão nova fica acima da **mediana** da base, ou quando a mediana piora além do intervalo da base.

**Objetivo.** O caso que ensinou a regra, em 03.10.2026: a primeira adaptação da onda de cor do Spell UI movia o degradê por script a cada quadro.
- **Custo medido com CPU 20×:** 716 ms de linha principal no módulo dela.
- **O LCP da capa:** de 2,07 para 2,33 s em mediana. O **mínimo** da versão com a onda ficava acima da mediana da base: piora real, não acaso.
- **A correção:** refeita só com `transform`, virou componente de servidor, e a diferença sumiu.

A comparação também protege do contrário. Depois da troca, o TBT da mediana caiu (998 → 716 ms), mas os intervalos se sobrepunham (601–1.628 contra 357–1.089): não se afirma melhora.

**Como fazer** (RATIFICADO: um script, sem dependência além do Lighthouse por `npx`):

```js
// ferramentas/comparar-desempenho.mjs — node ferramentas/comparar-desempenho.mjs <base> <nova> [caminho] [execuções]
// Ex.: node ferramentas/comparar-desempenho.mjs http://localhost:3101 http://localhost:3100 / 7
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const [base, nova, caminho = "/", n = "7"] = process.argv.slice(2);
const pasta = mkdtempSync(path.join(tmpdir(), "lh-"));
const medidas = { base: [], nova: [] };

function medir(rotulo, url, i) {
  const saida = path.join(pasta, `${rotulo}-${i}.json`);
  execFileSync("npx", ["lighthouse@13", url, "--form-factor=mobile", "--only-categories=performance",
    "--throttling-method=devtools", "--throttling.cpuSlowdownMultiplier=20",
    "--output=json", `--output-path=${saida}`, "--quiet", "--chrome-flags=--headless=new"], { stdio: "ignore" });
  const { audits } = JSON.parse(readFileSync(saida, "utf8"));
  medidas[rotulo].push({
    lcp: audits["largest-contentful-paint"].numericValue,
    tbt: audits["total-blocking-time"].numericValue,
    cls: audits["cumulative-layout-shift"].numericValue,
  });
}

for (let i = 0; i < Number(n); i++) {
  // Intercaladas, alternando quem vai primeiro.
  const ordem = i % 2 ? [["base", base], ["nova", nova]] : [["nova", nova], ["base", base]];
  for (const [rotulo, origem] of ordem) medir(rotulo, origem + caminho, i);
}

const resumo = (valores) => {
  const v = [...valores].sort((a, b) => a - b);
  return { mediana: v[Math.floor(v.length / 2)], minimo: v[0], maximo: v.at(-1) };
};
for (const metrica of ["lcp", "tbt", "cls"]) {
  const b = resumo(medidas.base.map((m) => m[metrica]));
  const v = resumo(medidas.nova.map((m) => m[metrica]));
  const real = v.minimo > b.mediana;
  console.log(`${metrica}: base ${JSON.stringify(b)} · nova ${JSON.stringify(v)}${real ? "  ← PIORA REAL" : ""}`);
}
```

*Os nomes das auditorias (`largest-contentful-paint`, `total-blocking-time`, `cumulative-layout-shift`) são os do relatório JSON do Lighthouse. Confira na versão usada antes de confiar no script [NV].*

**Como conferir.** A nota da mudança (no `decisoes.md` do cliente, ou no registro do Atlas) traz a tabela base × nova, com mediana, mínimo e máximo, a máquina e a data.

---

## 5. O CLS intermitente

**Registro.** Um CLS de 0,1 apareceu **em uma execução de sete**, com CPU 20×, nas duas versões comparadas em 03.10.2026. É anterior às mudanças daquele dia e está **a investigar**. Candidatos: a troca de fonte e a esfera da capa numa carga em partes.

**Regra.** Deslocamento intermitente não se ignora por ser raro: o visitante com o aparelho lento é justamente quem o vê. Para investigar:
1. Rode 20 vezes com CPU 20× e guarde os rastros (`--save-assets` no Lighthouse, ou o painel Performance).
2. Na execução com deslocamento, a auditoria `layout-shifts` aponta os elementos que se moveram.
3. Reproduza a condição: rede lenta e fonte que chega tarde (`display: optional` no Inter já evita uma troca).

---

## 6. A interação (INP), em laboratório

**Regra.** Toda ilha que responde a toque (menu, montador, calculadora, simulador, Agenda) tem a resposta medida com CPU 20×. Meta: o quadro seguinte ao toque em até 200 ms, o limite "bom" do INP (https://web.dev/articles/inp) [V].

**Objetivo.** O Lighthouse de navegação mede a carga, não o toque. Um montador que leva 400 ms para mudar o total num Android de entrada parece quebrado, mesmo com nota 100.

**Como fazer, à mão:** no painel Performance do Chrome, com a CPU estrangulada (o perfil calibrado de "celular de entrada", ou 20×), faça as interações principais e leia o INP nas métricas ao vivo (`../esteira/15-desempenho.md`, seção 4.6). O INP nunca foi medido em nenhum site do Atlas.

**Como fazer, automatizado** (RATIFICADO): Playwright, com o estrangulamento de CPU pelo protocolo do Chrome e a API de tempo de eventos do navegador:

```js
// Trecho de um teste: a duração do evento mais lento depois de um toque, com CPU 20×.
const cdp = await page.context().newCDPSession(page);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 20 });
await page.goto("/orcamento");
await page.evaluate(() => {
  window.__eventos = [];
  new PerformanceObserver((lista) => window.__eventos.push(...lista.getEntries().map((e) => e.duration)))
    .observe({ type: "event", durationThreshold: 16, buffered: true });
});
await page.getByRole("button", { name: "Completo" }).click();
await page.waitForTimeout(500); // aqui, medir exige deixar o observador receber o evento
const pior = await page.evaluate(() => Math.max(0, ...window.__eventos));
expect(pior).toBeLessThanOrEqual(200);
```

*É medição, não porta: o resultado entra como tendência no relatório de QA até dez rodadas mostrarem o ruído (`01-metodologia.md`, seção 3). O `waitForTimeout` aqui é a exceção registrada à regra de `05-ponta-a-ponta.md`, seção 6: espera-se o observador, não a tela.*

---

## 7. No endereço publicado

**Regra.** Na publicação, confere-se o que só o servidor de produção decide:

```bash
URL=https://<domínio>
# Primeiro byte e tempo total (repita 5 vezes; vale a mediana). Sem --compressed (abaixo).
curl -s -o /dev/null -w "ttfb %{time_starttransfer}s · total %{time_total}s · http %{http_version}\n" "$URL/"
# Cache longo nos arquivos com hash do Next.
curl -s -o /dev/null -D - "$URL$(curl -s "$URL/" | grep -o '/_next/static/[^"]*\.js' | head -1)" | grep -i "cache-control"
```

**Um cuidado conhecido.** O pedido com `curl --compressed` recebe da CDN da Hostinger uma página de verificação de navegador, e não o site (`../esteira/15-desempenho.md`, seção 4.7). Por isso o `curl` vai sem `--compressed`, e a compressão se confere **num navegador**: na coluna "Content-Encoding" do painel Rede do DevTools, ou na fumaça do Playwright (`resposta.headers()["content-encoding"]`, `05-ponta-a-ponta.md`, seção 7). Antes de ler qualquer cabeçalho de um pedido feito fora do navegador, confira que a resposta é o site: o `<title>` esperado e o `lang` em português.

| Medida | O certo |
|---|---|
| Primeiro byte (TTFB) | Mediana abaixo de 0,8 s, o limite "bom" do web.dev (https://web.dev/articles/ttfb) [V] |
| Compressão | `content-encoding: br` ou `gzip` no HTML, no CSS e no script |
| Cache dos arquivos com hash | `cache-control: public, max-age=31536000, immutable` em `/_next/static/` |
| Arquivos de `public/` | Prazo de cache conhecido (no repositório do Atlas, uma semana, em `next.config.ts`). Mudou o conteúdo, muda o nome. Em 03.10, uma referência nova dentro do `marca.svg` não existia na cópia guardada, e o "A" de O Atlas sumiu para quem já tinha visitado |
| Protocolo | HTTP/2 ou HTTP/3 |

**Objetivo.** A Hostinger, e não o Next, decide parte disso. Um site rápido na máquina local e lento no servidor não é rápido.

---

## 8. O aparelho real

**Regra** (em todo plano desde 08.10.2026, porque o premium chega ao celular em todo site: `../esteira/00-principios.md`, seção 5; antes, só no Profissional e no Completo). Antes da publicação, o site é aberto em **dois aparelhos reais**, cada um ligado ao navegador da mesa:
- **um Android intermediário**, no Chrome, pela depuração remota (`chrome://inspect`);
- **um iPhone**, no Safari, pelo Safari do Mac (menu Desenvolver, o aparelho).

**Conferem-se, com o aparelho em pé e deitado:**
- **a primeira tela no 4G** (o Wi-Fi desligado): o que aparece primeiro, e em quanto tempo;
- **a rolagem:** lisa, sem salto;
- **cada momento premium na versão de toque** (`../esteira/09-movimento.md`, seção 11): roda liso? O 3D compila sem travar e sem esquentar o aparelho?
- **o toque:** a resposta em cor, imediata; nenhum alvo difícil;
- **o formulário:** o teclado certo, o "enviar" no teclado, o campo à vista acima do teclado virtual;
- **o vídeo:** toca sem som e sem tela cheia; com a economia de dados ligada, fica o pôster;
- **a interação (INP):** a medição da seção 6, no Android.

**Objetivo.** A CPU 20× aproxima a CPU, não a GPU, a memória nem a tela, e o WebKit do Playwright não é o Safari do iPhone. O palco 3D da barbearia foi medido no SwiftShader, o desenho em software, que é o pior caso. O aparelho real é o caso de verdade, e até 08.10.2026 nenhum site do Atlas tinha passado por ele. *Quais aparelhos:* um Android intermediário e um iPhone dos sócios, ou emprestados [NV].

**Como conferir.** A lista acima, marcada no relatório de QA da publicação, com o modelo de cada aparelho e a data.

---

## 9. Investigar uma piora

| Sintoma | Causa já vista no projeto | Onde olhar |
|---|---|---|
| TBT alto, sempre | Hidratação do React (custo fixo); ilha que carrega o que não usa (até 03.10, duas ilhas recebiam o objeto inteiro do site, serializado no HTML de cada página: ~11 KB no depósito e ~6 KB na barbearia) | Painel Performance, "Bottom-up" por arquivo; o tamanho das props serializadas no HTML |
| TBT sobe com um efeito novo | Script que mexe no estilo a cada quadro (a onda do Spell UI, 03.10) | Rastro: tarefas recorrentes de "Recalculate Style" |
| LCP sobe | Imagem da primeira tela preguiçosa (LCP de 2,88 s com CPU 20×, em 01.10); fonte pré-carregada no caminho; a compilação do 3D | Auditoria "Largest Contentful Paint element" |
| Fontes acima do teto | Fonte de um site de exemplo vazando para outra página pela pré-busca de `<Link>` e pela fusão de CSS do empacotador | Régua, bloco 5; a rede da página, filtrada por fonte |
| CSS dobrado | O Tailwind lendo pastas que não devia (`node_modules` numa base compilada dentro do repositório) | O tamanho do CSS compilado contra o da versão anterior |
| Desenho travado no 3D | Compilação dos shaders na linha principal | `KHR_parallel_shader_compile`; o atlas desenhado uma ficha por vez, com o navegador ocioso (a barbearia: TBT de 280 para 130 ms, em 01.10) |
| Quadros perdidos logo depois do toque num vínculo, sobretudo no celular (régua dos quadros, navegação) | A View Transition do React na troca de página: a captura recalcula o estilo da página inteira e segura a tela (no Atlas, 27 + 43 + 10 ms seguidos, 5 batidas, 27.10.2026) | Rastro com `blink`, `cc`, `viz` e `gpu`: `ViewTransition::ProcessCurrentState` e `UpdateLayoutTree` em todos os elementos; `../esteira/15-desempenho.md`, seção 5.15 |
| Uma tarefa longa a cada troca de página, só na mesa | Ilha do layout que refaz trabalho caro a cada caminho (o mapa da refração do vidro reassado: 53 ms numa tarefa) | Rastro: `FireAnimationFrame` com a função da ilha; seção 5.16 de `../esteira/15-desempenho.md` |
| O commit da página nova pesado, com estilo e leiaute da página inteira (o voltar, ou a ida depois de corrigida a transição) | Seções não poupadas; ou uma seção pesada deixada fora da contenção | Rastro: `UpdateLayoutTree` e `Layout` com o número de elementos e de objetos; seção 5.17 de `../esteira/15-desempenho.md` |
| Trava longa na rolagem (10 batidas ou mais) quase sem trabalho na linha principal | No mesmo ponto do gesto: do site (no Atlas, a seção contida que acende ao voltar à tela, 28.10.2026). Em ponto ao acaso, e também no controle: da máquina | Seção 11, item 5 |
| Quadros parciais na rolagem com algo que se move por script | Laço que desenha a cada quadro; atributo trocado a cada movimento do ponteiro | Retirada pela pausa do próprio site; `../esteira/15-desempenho.md`, seções 5.7 e 5.8 |

---

## 10. Por que não o Lighthouse CI, agora

**Decisão** (ratificada em 08.10.2026). Não adotar o Lighthouse CI.

**Objetivo e motivos** [FU, pesquisa de 07.10.2026]:
- **Versão defasada:** o `@lhci/cli` 0.15.1 fixa o Lighthouse 12.6.1. O projeto mede com o 13.5.
- **Orçamento de bytes:** a auditoria `resource-summary`, em que se apoiavam os orçamentos de bytes, saiu do Lighthouse. Os bytes já são porta na régua.
- **Ruído:** o executor gratuito do GitHub tem 2 núcleos e 8 GB. Tempo medido ali não se compara ao da máquina local, e varia de execução para execução.

O que fica: a régua na integração contínua (bytes e CLS), e o Lighthouse na máquina local pelo método da seção 3, quando a mudança pode pesar.
**A medida dos bytes sem navegador** (RATIFICADO da mesma pesquisa): o script de cada rota é a soma dos `<script src>` comprimidos que a página pré-renderizada referencia, lida do build; as fontes, o CSS e o peso, por `request.sizes()` do Playwright. O protótipo reproduziu 153,7 KB contra os 154,1 KB documentados, em ~1 s. Serve de porta rápida antes da régua, nunca no lugar dela.

O protótipo (`ferramentas/orcamento-js.mjs`, da pesquisa de QA de 07 e 08.10.2026) roda com `node orcamento-js.mjs <pasta-da-aplicação>` depois do `npm run build`. Lê o HTML pré-renderizado de cada rota, soma os `<script src>` (sem o `nomodule`, que o Chrome não baixa) em gzip e em brotli, e imprime também a quantidade de `h1`, o `lang`, as marcações `og:` e o `noindex`:

    // Protótipo: JS inicial por rota, a partir do HTML pré-renderizado (sem navegador, determinístico).
    import { readFileSync, readdirSync, statSync } from "node:fs";
    import { join, relative } from "node:path";
    import { gzipSync, brotliCompressSync, constants } from "node:zlib";
    const web = process.argv[2];
    const appDir = join(web, ".next/server/app");
    const htmls = [];
    (function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") && htmls.push(p); } })(appDir);
    const rows = [];
    for (const h of htmls) {
      const html = readFileSync(h, "utf8");
      const srcs = [...html.matchAll(/<script[^>]*\bsrc="([^"]+)"[^>]*>/g)].filter((m) => !/\bnomodule\b/i.test(m[0])).map((m) => m[1]);
      const inline = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("");
      let gz = 0, br = 0;
      for (const s of new Set(srcs)) {
        const buf = readFileSync(join(web, ".next", s.replace(/^\/_next\//, "")));
        gz += gzipSync(buf, { level: 9 }).length;
        br += brotliCompressSync(buf, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length;
      }
      const inGz = gzipSync(Buffer.from(inline), { level: 9 }).length;
      const h1 = (html.match(/<h1[\s>]/g) || []).length;
      const lang = (html.match(/<html[^>]*\blang="([^"]+)"/) || [])[1];
      const og = ["og:title", "og:description", "og:image"].filter((p) => html.includes(`property="${p}"`)).length;
      const noindex = /<meta[^>]+name="robots"[^>]+noindex/.test(html);
      rows.push({ rota: "/" + relative(appDir, h).replace(/(index)?\.html$/, ""), arquivos: new Set(srcs).size, gzKB: +(gz / 1024).toFixed(1), brKB: +(br / 1024).toFixed(1), inlineGzKB: +(inGz / 1024).toFixed(1), h1, lang, og, noindex });
    }
    console.table(rows.sort((a, b) => a.rota.localeCompare(b.rota)));

---

## 11. A régua dos quadros sem se enganar

**Regra.** O resultado da régua dos quadros (`02-regua.md`, seção 12) se lê assim:
1. **O build de produção, sem outro Chrome.** Feche os navegadores controlados (o do Playwright, o do MCP) e espere outro trabalho que use o Chrome na máquina terminar, como no Lighthouse (seção 3, passo 2). O relatório grava a carga da máquina no início, no fim e antes de cada vez: anote-a com o resultado. Na rodada mais instável do Atlas (28.10.2026), um processo do sistema usava 45% de um núcleo.
2. **A mediana de 3 vezes**, o padrão da régua. Uma vez sozinha não decide: o mesmo build, gravado duas vezes seguidas, deu 3 e 4 batidas em `/planos` no celular 4×.
3. **Duas sessões separadas.** A célula no limiar oscila uma batida entre sessões, com o mesmo build: `/planos` na mesa deu [4, 3, 4] às 21h48 de 27.10 e [3, 3, 3] às 0h54 de 28.10. **A célula aprova quando aprova em duas sessões separadas.** A que aprova numa e reprova noutra está no limiar e se registra assim, com as vezes medidas; não se arredonda para aprovada.
4. **A correção se compara ao controle.** O build anterior se mede na mesma sessão. Para afirmar ganho, em A/B intercalado: as vezes alternadas, com a ordem trocada a cada rodada. *Objetivo:* nas rodadas em sequência do Atlas, o controle vinha sempre depois, com a máquina mais quente, e a vantagem da mesa parecia maior. No A/B, `/planos` na mesa empatou: [3, 4, 4] hoje contra [4, 4, 3] com a correção (28.10.2026). No celular 4×, o ganho se manteve: [5, 5, 5] contra [3, 4, 4].
5. **A trava quase sem trabalho.** Um intervalo de 10 batidas ou mais, com pouco na linha principal (no Atlas, 767 ms de quadros perdidos com 7,4 ms de linha principal, 4,9 ms de GPU e 1,0 ms de rasterização), pode ser da máquina ou do site. Repita a célula 10 vezes, anotando em que ponto do gesto cai cada intervalo. Trava sempre no mesmo ponto é do site: no Atlas, a seção contida da vitrine de `/para-quem` travou 5 de 10 vezes num ensaio intercalado, todas de 8,9 a 9,8 s do gesto; fora da contenção, nenhuma nesse ponto (`../esteira/15-desempenho.md`, seção 5.17). Trava em ponto ao acaso, que aparece também no controle, é da máquina, e se registra.
6. **A causa se prova por retirada.** O relatório traz o que pesou na vez mediana. Para o quadro a quadro de cada intervalo, grave o rastro (`medir`, com `extras.eventos`) e leia as tarefas dentro do intervalo. Depois, retire o suspeito (`extras.aoCarregar`, ou um build sem ele) e meça de novo, três vezes. Ler o código aponta o suspeito; só a retirada o confirma. **A retirada por CSS entra antes da carga,** por um `addInitScript` que acrescenta o `<style>`: injetado depois da carga (`addStyleTag`), o CSS gera sozinho ~80 quadros parciais e suja a medida (03.11.2026). O `extras.aoCarregar` roda depois da carga: serve à retirada por script; a por CSS vai num roteiro próprio ou num build sem a peça (PENDENTE, `../esteira/99-rastreabilidade.md`, seção 11).
7. **O que a régua não alcança vai ao aparelho real.** A GPU, a rasterização e o compositor rodam na velocidade da máquina, e o Safari não se mede. A troca de página, a refração, as máscaras e os filtros se conferem num Android intermediário e num iPhone (seção 8). Até 28.10.2026, nenhum site do Atlas passou a régua dos quadros num aparelho real.
8. **O pé da tela no celular é um ponto cego.** A 390 × 844, com densidade 3, o Chrome sem janela não apresenta o que muda só nos ~84 px de baixo da tela: o rastro traz `Swap skipped.` (categoria `viz`), e cada quadro assim conta como parcial. A "travada" que só aparece quando um arremesso para com uma animação nessa faixa não é do site. **O critério:** meça com a página parada na posição suspeita e compare com a cópia de controle (a versão publicada, servida noutra porta), que tem o mesmo defeito. No Chrome com janela, a mesma posição dá todos os quadros inteiros. O site evita o caso com as passivas que só começam à vista (`../esteira/09-movimento.md`, seção 14, "O mecanismo"; 03.11.2026, no site do Atlas, `components/ilhas/controle-do-movimento.tsx`).

**Objetivo.** A porta de 3 batidas (50 ms) fica perto do que um site com movimento faz numa troca de página. No Atlas, depois da correção, 9 das 14 portas de navegação ficaram entre 3 e 4 batidas de uma sessão para outra, em quatro sessões. Uma porta lida numa sessão só aprovaria ou reprovaria pela sorte da rodada (`01-metodologia.md`, seção 3). Lida em duas sessões, contra o controle e com a causa provada por retirada, ela separa o defeito do ruído.

**Como conferir.** O relatório de QA traz, por célula, o em dia, o p95 e o pior [as vezes] de cada sessão, a data, a hora, a carga da máquina e o Chrome; e, para cada correção, o controle da mesma sessão.

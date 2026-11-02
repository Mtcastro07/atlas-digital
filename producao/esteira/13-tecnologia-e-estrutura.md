# 13 · Tecnologia e estrutura

> **Para que serve.** Dizer com que se constrói um site do Atlas, como o repositório se organiza, que convenções de código valem (cada uma com o defeito que a fez nascer), como os cabeçalhos, os metadados e o layout raiz se montam, qual é a base de produção proposta e como uma tecnologia entra ou sai.
>
> **Quando ler.** Antes de criar o repositório do cliente e sempre que uma decisão técnica aparecer ("posso pôr esta biblioteca?", "por que esta ilha não pode importar o conteúdo?").
>
> **Depende de.** `00-principios.md` (privacidade, degradação, desempenho), `03-planos.md` (o que cada plano leva), `15-desempenho.md` (os orçamentos), `17-conformidade-e-normas.md` (o que a política de conteúdo protege).
>
> **Estado.** A pilha é RATIFICADO em 08.10.2026 (ata v3.0, V; VI, item 11). As convenções de código são DECIDIDO no repositório do Atlas (`web/CLAUDE.md`), nascidas de defeitos medidos entre 30.09 e 08.10.2026. A base de produção em monorepo (seção 8) é RATIFICADO como direção, para quando for construída; hoje, a produção usa o kit (`../README.md`).
>
> **Atualizado em:** 16.10.2026: a busca e as respostas de IA em todo site (seções 2, 5, 6, 9.3 e 11; `21-busca-e-ias.md`). Antes, 08.10.2026.

---

## 1. A pilha

Versões instaladas em 08.10.2026 no repositório do Atlas (`web/package.json`; o `package-lock.json` fixa as exatas). Num repositório novo, comece pelas mesmas versões e só suba depois de medir (seção 10).

| Camada | Tecnologia | Versão | Papel | Por que esta |
|---|---|---|---|---|
| Aplicação | **Next.js**, App Router, compilação com Turbopack | 16.3.8 | Páginas pré-renderizadas na compilação; Server Components por padrão; metadados, mapa do site e cabeçalhos no próprio projeto | Decisão da ata v3.0 (V). O HTML chega completo do servidor: a página existe sem script, que é o princípio de degradação (`00-principios.md`) |
| Interface | **React** | 19.2.8 | Componentes | Vem com o Next. O `<ViewTransition>` dele saiu da troca de página em 28.10.2026: reprova os 60 quadros no celular (seção 3.7, regra 4) |
| Linguagem | **TypeScript**, estrito | 5.9 | O build não passa com erro de tipo | Pega no build o que seria defeito em produção: um campo de conteúdo que falta, um caminho errado |
| Estilo | **Tailwind CSS** | 4.3 | Utilitários no componente; tokens de função; a escala de espaço de 4 px; a escala tipográfica do site | Nenhuma folha cresce sem dono; o CSS sai só com o que se usa |
| Componentes | **shadcn/ui**, estilo `base-nova`, sobre **Base UI** | Base UI 1.8 | A base dos controles (o painel lateral, `Sheet`); o resto reescrito sobre elementos nativos | O shadcn entrega código, não pacote: o projeto é dono do componente. O `Button` do Base UI custava 17 KB de script inicial sem ganho; `Button`, `Toggle` e `ToggleGroup` juntos, ~36 KB — os três foram reescritos sobre `<button>` nativo |
| Movimento | **Motion**: `motion/react-mini` (o `useAnimate`) e, do pacote principal, só o `stagger`; CSS e Web Animations API | 13.4 | Coreografias curtas (`useAnimate`, `stagger`) sobre a Web Animations API | A versão "mini" é a menor; a contagem de números fica fora dele (`lib/contar.ts`), porque a versão híbrida custaria 23 KB. O `stagger` não existe nas entradas mini (o `motion/mini` exporta só `animate` e `animateSequence`, conferido em 08.10.2026): vem de `"motion"`, e o `"sideEffects": false` do pacote deixa no script só a função usada (`components/ilhas/escada-demo.tsx`, no repositório do Atlas) |
| Variantes e classes | **class-variance-authority** (`cva`) e **cn** | 0.7.1 · 0.4.0 | As variantes do botão (`buttonVariants`); a fusão de classes, só no servidor (seção 3.4) | O que o shadcn usa; o `cn` aceita a escala tipográfica do site |
| CLI do shadcn | **shadcn**, dependência de desenvolvimento | 4.21 | Trazer e conferir componentes (`add --dry-run`, `add --diff`); dele vem o `@import "shadcn/tailwind.css"` | Fora da árvore de produção desde 03.10 (seção 10) |
| Gestos de marca | **Spell UI**, pelo registro `@spell` do shadcn, copiado e adaptado | — | Um gesto por marca (seção 3.6; `09-movimento.md`) | Componentes de movimento já resolvidos, que se adaptam à marca em vez de inventar do zero |
| Peças de terceiros | **O catálogo do kit** (`../componentes/`): registros do shadcn, coleções, pacotes, técnicas nativas e demos, com a licença conferida para site vendido | — | A mecânica de objetos, galerias, transições, fundos e 3D, traduzida para a marca (`09-movimento.md`, seção 6.4) | Não refazer do zero o que já está resolvido, sem arriscar a licença. A peça que usa só a pilha entra sem pedido; o pacote fora dela segue a seção 9 |
| Ícones | **lucide-react** em três ícones, e SVG próprio | 1.49 | No Atlas, o de copiar e o de confirmado (o botão de copiar) e o de fechar (o painel do menu); o resto é SVG do projeto | O glifo do WhatsApp é o oficial (Simple Icons, CC0); ícone desenhado à mão para cada marca quando a identidade pede |
| 3D | **WebGL próprio**, sem biblioteca | ~16 KB | Só no Completo, nas condições da seção 9.2 | O three.js pesa ~178 KB comprimido [FU]; o motor da barbearia de exemplo faz o necessário com ~16 KB |
| Fontes | Arquivos `.woff2` hospedados junto ao site (`next/font/local`) | — | `05-tipografia.md` | Fonte de servidor externo manda o endereço IP do visitante para fora do país e custa uma conexão a mais |
| Verificação | **Playwright** (dependência de desenvolvimento), no Chrome instalado na máquina | 1.64 | A régua (`ferramentas/regua/`; `../qualidade/02-regua.md`) | Mede o que o navegador desenha, não o que o código promete |
| Ambiente | **Node.js** 22 (LTS) | 22.x; **22.19 ou mais** para o Lighthouse 13 | Compilação, régua, ferramentas | A Hostinger aceita de 18 a 24. O Lighthouse 13.5 declara `"node": ">=22.19"`; a máquina do Atlas tinha o Node 22.17.1 em 08.10, e o npm só avisa (`EBADENGINE`). Atualize antes de medir |
| Hospedagem | **Hostinger Business**: web app Node.js ou site estático, conforme o plano | — | `18-publicacao-e-manutencao.md` | O plano já contratado pelo Atlas (expira em 05.01.2027) |

**O que a pilha garante, e por quê** (origem: documento de tecnologia de 07.10.2026, no repositório do Atlas):
- **Funciona sem script.** O conteúdo é HTML do servidor; o script só acrescenta (`00-principios.md`).
- **Fluido no aparelho modesto.** ~131 KB de script é o piso do Next 16 com React 19; nos sites de marca, sem teto (desde 08.10.2026, à noite), e 180 KB no site do Atlas (`15-desempenho.md`, seção 2.1). O que se exige é a experiência: sem travar, sem deslocar, de pé sem script.
- **Privacidade por construção.** Nenhum pedido externo, nenhum rastreador e nada gravado no aparelho (seção 3.8).
- **Um repositório, uma linguagem.** TypeScript do conteúdo à interface, o que permite ao Claude Code produzir e verificar com o mesmo ferramental.

**O que fica de fora, de propósito:**

| Fora | Por quê |
|---|---|
| Google Fonts, CDN de fonte, qualquer pedido a outro domínio | Privacidade (IP do visitante) e desempenho (conexão a mais); a política de conteúdo do site bloqueia |
| Analítica de terceiros (Google Analytics e afins), cookie de rastreio | O site não grava nada no aparelho; o relatório de acessos usa os dados da Hostinger (`14-funcionalidades/`) |
| Rolagem com inércia (Lenis e afins) | **Vedada** pela ata v3.0 (V: "descartada em definitivo"). A pesquisa de setembro mostrou que ela segue o segmento: 8 de 11 sites de imobiliária e arquitetura de alto padrão e 5 de 6 de construção a usam; 0 de 5 barbearias e 0 de 6 escritórios de advocacia, que são serviço de bairro como os clientes do Atlas |
| three.js, Spline, Unicorn Studio | Peso; o 3D do Completo é próprio (seção 9.2) |
| `tw-animate-css` | Saiu do Atlas em 03.10 sem uso; as animações ficam em CSS próprio, com prefixo |
| Base UI além do `Sheet` | Custo de script sem ganho (acima) |
| CMS | Nenhum por padrão (seção 8.3, item 6) |
| Captcha de terceiros (hCaptcha, Turnstile) | Pedido externo; a proteção do formulário é feita no próprio servidor (`14-funcionalidades/`) |

**O piso de navegadores** (especificação do site do Atlas, seção 8): **Safari 16.4+, Chrome 111+ e Firefox 128+**, o mínimo do Next 16 e do Tailwind 4. Ficam de fora o iPhone 7 e os anteriores (iOS 15); o Android com o Chrome atualizado atende.
- **Objetivo:** saber em que navegador testar e o que pode faltar sem quebrar a página.
- **Regra:** recurso acima do piso entra com a reserva escrita nesta tabela.
- **Como conferir:** o recurso desligado no DevTools, ou um navegador do piso.

| Recurso | Sem suporte |
|---|---|
| `backdrop-filter` (vidro) | Superfície opaca do mesmo tom (`06-cor-forma-e-superficie.md`, seção 10) |
| `backdrop-filter: url()` (refração do vidro líquido) | Só no Chromium; os demais ficam com o vidro fosco |
| `prefers-reduced-transparency` | Vidro normal |
| `interpolate-size` e `::details-content` (a altura das dúvidas) | A dúvida abre sem animar |
| `text-wrap: balance` e `pretty` | Quebra comum |
| `:has()`, `color-mix()`, unidade `lh`, CSS 3D, `cqw`, `svh` | Cobertos pelo piso |
| `subgrid` | Falha no Chrome 111 a 116: os textos que dependem dele se desalinham (no Atlas, as etapas do trabalho) |
| View Transitions (troca de tema, diálogo; a troca de página é por CSS desde 28.10.2026) | Troca imediata, como numa navegação comum (Firefox até a 143; Safari antes do 18) |
| WebGL | A reserva da peça-assinatura (`14-funcionalidades/08-peca-assinatura.md`, seção 3.4) |
| `animation-timeline` | O trilho não aparece; a galeria desliza igual (`09-movimento.md`, seção 5) |

---

## 2. A estrutura do repositório do cliente

Um projeto por cliente enquanto a base de produção em monorepo (seção 8) não existir. O projeto nasce vazio, com o kit (`producao/`) dentro, e o `producao/ferramentas/novo-site.mjs` monta o site ao lado dele (`../02-ordem-de-producao.md`, seção 2). A estrutura do site repete a do `web/` do Atlas, que já foi medida e corrigida.

```
<cliente>/
├── CLAUDE.md              instruções do projeto para o Claude Code (modelo em producao/esteira/modelos/claude-do-projeto.md)
├── briefing.md            o briefing preenchido; a fonte do conteúdo (producao/esteira/02-briefing.md)
├── identidade.md          a direção de arte registrada: adjetivos, referências, tokens, fontes e licenças, gesto, proibições
├── decisoes.md            cada decisão com data e razão
├── README.md              o estado do projeto e os comandos
├── ordem.json             a ordem de produção, normalizada (../02-ordem-de-producao.md)
├── registros/             os relatórios de QA do site (producao/qualidade/modelos/)
├── .claude/commands/      os comandos do Claude Code, copiados de producao/claude/commands/
├── producao/              o kit, como veio: esta esteira, a qualidade, a base, as ferramentas, os módulos,
│                          os gestos, os comandos e o exemplo. Não se edita por cliente; uma versão nova
│                          do kit entra trocando a pasta inteira
├── app/
│   ├── layout.tsx         o layout raiz (seção 7)
│   ├── page.tsx           o início; uma pasta por página, conforme o plano
│   ├── template.tsx       a transição entre páginas
│   ├── not-found.tsx      a página 404 da marca
│   ├── error.tsx          o erro de página, em português
│   ├── global-error.tsx   o erro do layout raiz, com lang
│   ├── robots.ts · sitemap.ts · icon.svg · apple-icon.png
│   ├── llms.txt/route.ts  o /llms.txt, gerado do conteúdo (21-busca-e-ias.md, seção 7)
│   ├── globals.css        tokens, escala, base
│   ├── <prefixo>.css      as classes globais da marca, todas com o prefixo do site
│   ├── fontes.ts          as fontes da marca (next/font): --font-texto e --font-titulo (05-tipografia.md, seção 4.1)
│   └── fontes/            os .woff2 e as licenças (OFL-*.txt)
├── components/
│   ├── secoes/            uma seção por arquivo (Server Components)
│   ├── ilhas/             tudo o que tem estado ("use client"), uma ilha por arquivo
│   ├── ui/                os controles do shadcn ajustados; ui/spell/: o gesto adaptado
│   └── <peças da marca>   logotipo, figuras, a peça-assinatura
├── conteudo/              os textos, preços, horários e listas, tipados (seção 3.2)
├── lib/                   funções puras: moeda, whatsapp, metadados, dados estruturados, llms, âncoras, ocioso, utils
├── public/                imagens preparadas (WebP/AVIF), marca.svg, o cartão de compartilhamento
└── ferramentas/           regua/ (a régua), preparar-standalone.mjs, preparar-fotos.mjs, capturas, texto-do-robo.mjs, avisar-indexnow.mjs
```

| Pasta ou arquivo | Regra | Objetivo |
|---|---|---|
| `README.md` em **cada pasta** | Diz o que cada arquivo da pasta faz | Quem chega (pessoa ou agente) entende sem abrir tudo. Convenção do `web/` do Atlas |
| `CLAUDE.md` na raiz | Cliente, nicho, plano, módulos, comandos, o que não alterar, as convenções desta seção | É o primeiro arquivo que o Claude Code lê; sem ele, cada sessão recomeça do zero |
| `AGENTS.md` na raiz | Gerado e regravado pelo `next dev`: o bloco entre `<!-- BEGIN:nextjs-agent-rules -->` e `<!-- END:nextjs-agent-rules -->` manda ler a documentação que vem com o Next (`node_modules/next/dist/docs/`) antes de escrever código. **Não editar o bloco.** Criar o `AGENTS.md` (pode ser vazio) **antes** do primeiro `npm run dev`, começar o `CLAUDE.md` com a linha `@AGENTS.md` e versionar os dois | O Next 16.3, quando roda dentro de um agente, procura o bloco: sem `AGENTS.md` e com o `CLAUDE.md` do modelo já na raiz, ele **insere o bloco dentro do `CLAUDE.md`**; sem nenhum dos dois, cria os dois (lido em `node_modules/next/dist/server/lib/generate-agent-files.js` e `app-info-log.js`, Next 16.3.8, 08.10.2026) [V]. Apagar o bloco só o recria |
| `identidade.md` | Escrito **antes** de qualquer componente | A identidade é decidida, não descoberta no meio do código (`04-direcao-de-arte.md`) |
| `decisoes.md` | Uma linha por decisão: data, decisão, razão, o que revoga | "Regra sem motivo escrito é revogada por conveniência em seis meses." O histórico fica aqui, não nos comentários do código (seção 3.10) |
| `conteudo/` | Todo texto visível vem daqui | Mudar um texto não mexe em JSX; o mesmo dado alimenta a página e os dados estruturados |
| `ferramentas/regua/` | Portada do kit (`producao/ferramentas/portar-regua.mjs`), sem mudança de limite sem decisão | A régua é a mesma para todo site; cada site com uma régua diferente não prova nada |
| `producao/` | Fica como veio. O que muda por cliente vai para a raiz (o código, os documentos do projeto, `registros/`) | O kit se atualiza trocando a pasta inteira; com o cliente dentro dela, a troca apagaria o projeto. O CSS do site a ignora (`@source not "../producao"` em `app/globals.css`) e o TypeScript também (`exclude` do `tsconfig.json`) |

**As receitas de mudança** (da especificação do site do Atlas, seção 6, generalizadas):
- **Texto ou preço:** só em `conteudo/`. O preço propaga sozinho para a página, o montador, os destaques e os dados estruturados (seção 3.2). Preço novo leva o mês de referência.
- **Seção nova:** um arquivo em `components/secoes/`, montado com as peças de seção do site (no Atlas, `Secao`, `Envelope` e `Abertura`); o id entra no tipo dos ids (no Atlas, `IdDaSecao`); o tom alterna com o das vizinhas (`data-tom`). A base de produção, de três páginas pequenas, mantém as seções no arquivo da página até a página crescer (`../04-construcao.md`, seção 3).
- **Página nova:** uma entrada na lista de páginas de `conteudo/` (o menu, o mapa do site e a "próxima página" seguem a lista); a rota com `metadadosDaPagina` (seção 6) e a abertura com figura própria. No site de cliente, só dentro do limite do plano (`03-planos.md`; a Página adicional). Depois: a régua, o contraste do menu sobre o vidro (quando houver vidro) e o Lighthouse.
- **Ilha nova:** em `components/ilhas/`, sem `cn`, com o conteúdo por props ou `children`, com o movimento reduzido respeitado e medida no script inicial (seção 3.1; `15-desempenho.md`).
- **Cor nova:** um token de função, definido em todos os tons, com o contraste anotado (`06-cor-forma-e-superficie.md`, seção 1).

---

## 3. As convenções de código

Cada convenção abaixo nasceu de um defeito medido. Num repositório novo, valem desde a primeira linha.

### 3.1 · Servidor e cliente

1. **Regra:** todo componente é Server Component; `"use client"` só em `components/ilhas/` e `components/ui/`.
   - **Objetivo:** o HTML chega completo e o script só acrescenta. A página funciona sem JavaScript: o menu leva ao índice do rodapé, a vitrine troca por botões de rádio, as dúvidas abrem em `<details>`, o montador oferece o WhatsApp direto.
   - **Como fazer:** se uma seção precisa de estado, a parte com estado vira ilha, e o conteúdo desenhado no servidor entra nela como `children`. Exemplo do Atlas: `secoes/escada.tsx` (servidor) → `Simulador` (ilha) → `EscadaDemo` (ilha), com o site de cada plano desenhado no servidor.
   - **Como conferir:** a régua, bloco 2 (sem script: h1 visível, nenhum texto invisível, vínculos para as outras páginas).
2. **Regra:** o que não aparece na primeira tela carrega sob demanda, e começa a baixar no **primeiro sinal de intenção** (ponteiro, toque, foco), não com o navegador ocioso.
   - **Objetivo:** pré-carregar o painel do menu com o navegador ocioso executava o módulo inteiro (160 ms com CPU 20×) para quem nunca abre o menu.
   - **Como fazer:** `next/dynamic` com `ssr: false`; o gatilho dispara o `import()` no `pointerenter`, `touchstart` ou `focus`, e monta no clique. Enquanto baixa, o gatilho mostra a espera (as barras do Spell UI), sem mudar de tamanho.
3. **Regra:** carga ociosa (`lib/ocioso.ts`) só para o que é **certo** de ser usado e pesado de preparar (as fichas do 3D da barbearia, uma por vez).
   - **Objetivo:** o que roda no ocioso roda para todo visitante, mesmo o que nunca vai usar; no celular de entrada, o ocioso chega tarde e disputa a CPU com o primeiro toque. Só o que é certo e caro de preparar justifica a espera; o resto aguarda o sinal de intenção (regra 2).
   ```ts
   // lib/ocioso.ts — executa `tarefa` com o navegador ocioso; o Safari não tem
   // requestIdleCallback e cai num atraso fixo.
   export function quandoOcioso(tarefa: () => void) {
     if ("requestIdleCallback" in window) {
       const id = window.requestIdleCallback(tarefa, { timeout: 4000 });
       return () => window.cancelIdleCallback(id);
     }
     const id = setTimeout(tarefa, 2500);
     return () => clearTimeout(id);
   }
   ```
4. **Regra:** **nunca** `<Suspense>` por seção; `content-visibility` nas seções, só pela exceção medida de `15-desempenho.md`, seção 5.17 (desde 28.10.2026).
   - **Objetivo:**
     - `<Suspense>` por seção, com texto do DOM alterado antes da hidratação, deu o erro 418 do React, e o bloco foi redesenhado.
     - `content-visibility: auto` tirava as âncoras do lugar: `#duvidas` caía 1.693 px fora. A exceção da seção 5.17 o resolve com a ilha de âncoras, que desenha as seções antes de medir.
   - **O custo conhecido:** sem fronteiras de `<Suspense>`, o React hidrata a página inteira de uma vez. O TBT com CPU 20× fica acima da meta (`15-desempenho.md`, seções 5.14 e 6). A saída é achar a causa do erro 418 e voltar a hidratar por partes: PENDENTE.
5. **Regra:** nenhum texto do DOM muda antes da hidratação.
   - **Objetivo:** o erro 418 do React é a hidratação que acha no DOM um texto diferente do HTML vindo do servidor; o React então descarta o HTML daquela árvore e a desenha de novo no navegador, o que perde o ganho do servidor e pode fazer a tela piscar. Texto que muda antes da hidratação é a causa.
   - **Como fazer:** o que depende do navegador (a hora de Niterói, o estado da loja) começa com o texto do servidor (`status.semScript`) e só troca depois de montar (`useEffect`). O script do `<head>` só acrescenta **classes** ao `<html>`, por isso o `suppressHydrationWarning` (seção 7).
6. **Regra:** os atributos `data-*` que o CSS e o script dividem (`data-tom`, `data-ambiente`, `data-fora`, `data-visivel`, `data-pronto`) são **constantes tipadas num arquivo só** (`lib/contratos.ts`), cada uma com um comentário que aponta a folha que a lê.
   - **Objetivo:** no Atlas, 36 seletores `[data-*]` sem tipo ligavam o CSS e o TypeScript; um nome trocado num lado não quebra a compilação, e o efeito some em silêncio. As ilhas do layout procuravam esses elementos com `document.querySelectorAll` só na carga, e a página nova da navegação interna não era vista: o defeito do globo, corrigido em 07.10 (`../qualidade/12-ataque-a-falhas.md`, seção 4).
   - **Como fazer:** `export const TOM = "data-tom" as const;`, e o seletor montado da constante. A ilha que procura elementos refaz a procura a cada troca de caminho (`usePathname` na dependência do efeito, como em `14-funcionalidades/01-base-de-todo-site.md`, seção 15) ou recebe o elemento por `ref`.
   - **Estado:** RATIFICADO, da auditoria técnica de 07.10.2026 (P2), não aplicada no Atlas.
7. **Regra:** cada preocupação transversal mora num lugar só, e as ilhas a importam:
   - as preferências do visitante (movimento reduzido, tipo de ponteiro) num gancho **reativo**, que ouve o `change` do `matchMedia`;
   - a decodificação da âncora em `lib/ancoras.ts` (`14-funcionalidades/01-base-de-todo-site.md`, seção 16);
   - o agendamento ocioso em `lib/ocioso.ts` (item 3), nunca reescrito dentro de um componente;
   - os metadados em `lib/metadados.ts` (seção 6);
   - um só primitivo de diálogo: o `<dialog>` nativo (`16-acessibilidade.md`, seção 3.5).
   - **Objetivo:** a auditoria técnica de 07.10.2026 achou no Atlas a checagem de movimento reduzido repetida 18 vezes, lida uma vez e sem reagir à mudança; a decodificação segura em dois lugares e um `decodeURIComponent` cru; o agendamento ocioso reimplementado em dois arquivos do 3D apesar de `lib/ocioso.ts`; a função de metadados dos exemplos três vezes (unificada em 07.10); e dois primitivos de diálogo (o `Sheet` do Base UI e o `<dialog>`). Cópia que diverge é defeito à espera.
   - **Como fazer** (RATIFICADO; no Atlas, o `usePreferencias()` está proposto e não feito):
     ```ts
     // lib/preferencias.ts — as preferências do visitante, reativas. Só nas ilhas.
     import { useSyncExternalStore } from "react";

     const assinaturas = new Map<string, (aviso: () => void) => () => void>();
     function assinar(consulta: string) {
       let assinatura = assinaturas.get(consulta);
       if (!assinatura) {
         assinatura = (aviso) => {
           const lista = window.matchMedia(consulta);
           lista.addEventListener("change", aviso);
           return () => lista.removeEventListener("change", aviso);
         };
         assinaturas.set(consulta, assinatura);
       }
       return assinatura;
     }

     /** Verdadeiro se a consulta casa; no servidor e na hidratação, `noServidor`. */
     export function usePreferencia(consulta: string, noServidor = false) {
       return useSyncExternalStore(assinar(consulta), () => window.matchMedia(consulta).matches, () => noServidor);
     }
     // const reduzir = usePreferencia("(prefers-reduced-motion: reduce)", true);
     // const toque = usePreferencia("(pointer: coarse)");
     ```

### 3.2 · Conteúdo tipado

1. **Regra:** todo texto visível vive em `conteudo/*.ts`, como dado; no componente, só rótulos curtos de controle.
   - **Objetivo:** mudar um texto não mexe em JSX, e o mesmo dado alimenta a página, o montador e os dados estruturados.
   - **Exemplo:** o preço do Atlas vem de `conteudo/planos.ts` para a página Planos, o montador, os destaques da capa e o JSON-LD.
   - **Como fazer:** objetos `as const`, com tipos derivados deles. Exemplo: `type IdDaPagina = (typeof site.paginas)[number]["id"]`; um id que não existe não compila.
2. **Regra:** uma ilha recebe só os campos que usa, nunca o objeto inteiro do site.
   - **Objetivo:** tudo o que uma ilha recebe vai serializado no HTML de cada página. O estado da loja do depósito recebia o objeto do site inteiro (~11 KB por página), e o agendador da barbearia ~6 KB. Corrigidos em 03.10: o HTML das 23 páginas ficou 73,5 KB menor.
   - **Como fazer:** `Pick<Site, "status" | "expediente" | "horaDoCorte">` na assinatura da ilha.
3. **Regra:** ilha importa `conteudo/contato.ts` (pequeno), nunca o módulo grande de textos da página.
   - **Objetivo:** importar o módulo grande arrasta os textos para o script do navegador. O painel do menu do Atlas ainda importava um campo de `conteudo/site.ts`, e o pedaço sob demanda (34,5 KB comprimidos) levava frases da página ("Primeiro rascunho navegável…", "bairro a bairro"): pendente no Atlas, a evitar no novo.
4. **Regra:** dados estruturados (JSON-LD) saem do mesmo conteúdo que a página mostra e ficam **na página**, nunca num layout que outros sites herdam.
   - **Objetivo:** preço, contato e perguntas não divergem do texto visível. Os sites de exemplo não podem herdar os dados do Atlas.
   - **Como fazer:** a função `jsonLd()` escapa o `<`:
   ```ts
   /** JSON seguro para <script type="application/ld+json"> (guia de JSON-LD do Next). */
   export function jsonLd(dados: object) {
     return { __html: JSON.stringify(dados).replace(/</g, "\\u003c") };
   }
   ```

### 3.3 · Estilo

1. **Regra:** utilitários do Tailwind no componente. Classe global só nas folhas com prefixo:
   - no Atlas: `vd-` e `mov-`;
   - nos sites de exemplo: `dm-`, mais o prefixo do site (`nt-` na nutrição, `dp-` no depósito, `bb-` na barbearia);
   - no cliente, um prefixo curto da marca.
   - **Objetivo:** toda classe global tem dono; nada vaza entre sites que dividem um repositório.
2. **Regra:** tokens com **nome de função**, no vocabulário do shadcn (`--background`, `--foreground`, `--card`, `--primary`, `--accent`, `--muted-foreground`, `--border`, `--ring`), trocados por `data-tom` em cada bloco.
   - **Objetivo:** o mesmo componente serve em todo tom, e uma troca de paleta mexe num lugar só. O nome nunca é a cor (`--navy` é proibido).
   - **Como fazer:** `[data-tom]` mora **dentro** de `@layer base`; fora da camada, ele vencia os utilitários `bg-*`. O contraste de cada par vai anotado no comentário do token.
3. **Regra:** nenhuma cor em hexadecimal em componente.
   - **Objetivo:** uma cor fora dos tokens é uma cor sem contraste conferido.
   - **Exceção:** a `global-error.tsx`, que substitui o layout raiz. Mesmo ela importa o `globals.css` e usa os tokens.
4. **Regra:** espaço só na escala de 4 px do Tailwind, sem colchetes. No Tailwind 4, `p-18` e `pt-38` também são da escala; meio degrau (`py-2.5`) só em valores pequenos.
   - **Objetivo:** ritmo consistente (`07-composicao.md`). Exceções: os ajustes tipográficos em `em`, as posições em porcentagem das figuras, os `env()` da área segura.
5. **Regra:** grade com `minmax(0, 1fr)`, nunca `1fr`; em grade de uma coluna no celular, `grid-cols-1`, que já é `minmax(0, 1fr)`.
   - **Objetivo:** `1fr` deixa a coluna crescer até a largura mínima do conteúdo.
   - **Caso real:** em 07.10, a página de orçamento do depósito rolava 3 px para o lado em 320 px por uma grade sem coluna declarada. Corrigida com `grid-cols-1`.
6. **Regra:** `white-space: nowrap` só em valor curto (um preço, um número), nunca em frase.
   - **Objetivo:** a armadilha mais reincidente dos demos de setembro (três ocorrências, em três nichos): `minmax(0,1fr)` não salva o que está proibido de quebrar.
7. **Regra:** botão não anda nem muda de tamanho no hover; o hover é cor, sombra e brilho.
   - **Objetivo:** pedido do usuário em 01.10 ("onde eles mudam, mesmo que mínimo"); o botão que pula parece defeito.
   - **Como fazer:** no Tailwind 4, `translate-*`, `scale-*` e `rotate-*` escrevem as propriedades `translate`, `scale` e `rotate`, não `transform`. Numa transição de lista própria (`transition-[...]`), elas precisam estar na lista, senão a mudança estala sem passagem. Foi o que fazia o botão do pé das páginas pular 6 px e a compressão dos botões ao toque (97%) estalar, até 01.10. `transition-transform` já inclui as três.
8. **Regra:** o atalho `animation` sempre com o **nome** da animação, em cada regra que o declara.
   - **Objetivo:** o minificador do CSS (Lightning CSS) reduz um `animation` sem nome a `animation: none`.
   - **Caso real:** em 03.10, o brilho do selo "Recomendado" ficou com duração zero por isso.
9. **Regra:** composto contra descendente (`.js.ponteiro` não é `.js .ponteiro`).
   - **Objetivo:** o espaço a mais produziu uma paralaxe inerte, sem erro visível, nos demos de setembro.
10. **Regra:** a rolagem reserva a altura do cabeçalho fixo e um respiro.
    - **Objetivo:** o destino de uma âncora, e o elemento que recebe o foco pelo teclado, não param debaixo do cabeçalho (WCAG 2.4.11; `16-acessibilidade.md`, seção 3.4).
    - **Como fazer:** num site novo, `html { scroll-padding-top: 5rem }` (RATIFICADO), ajustado à altura do cabeçalho da marca. A mesma regra vale para as âncoras e, nos navegadores que a respeitam ao focar, para o foco [NV].
    - **No Atlas:** `[id] { scroll-margin-top: 5rem }` (cabeçalho de 72 px), que só vale para as âncoras. **Nunca os dois juntos:** a margem do destino e o recuo da página se somam.

### 3.4 · O `cn`, o `cva` e a fusão de classes

1. **Regra:** **sem `cn`** em código que vai ao navegador (`ilhas/`, `ui/`); no servidor, o `cn` é livre.
   - **Objetivo:** o `cn` (clsx com tailwind-merge) custava ~9 ms de CPU na carga, 180 ms com CPU 20×.
   - **Como fazer:** na ilha, a classe é uma string montada à mão (`` `base ${condicao ? "a" : "b"}` ``); a variante que mudaria a base vem pronta do servidor.
2. **Regra:** o `cn` do servidor conhece a escala tipográfica do site (`lib/utils.ts`).
   ```ts
   import { createCn } from "cn/config";

   // Sem a escala, o cn toma `text-destaque` por cor de texto e o descarta ao
   // lado de `text-muted-foreground`: o lide fica sem tamanho (03.10).
   export const cn = createCn({
     extend: { theme: { text: ["rotulo", "nota", "corpo", "destaque", "numero", "titulo", "display"] } },
   });
   ```
   - **Varia por:** os nomes dos degraus são os da escala de cada site (`05-tipografia.md`).
3. **Regra:** o `buttonVariants` (`cva`) **não** resolve conflito de classes. Para sobrepor uma variante, `cn(buttonVariants(...), "...")` no servidor. Vínculo com cara de botão é `<a className={buttonVariants()}>`.
   - **Objetivo:** a classe sobreposta perde ou ganha conforme a ordem no CSS gerado, não conforme a ordem no atributo.
4. **Regra:** item novo do shadcn, depois de setembro de 2026, importa `cn` do pacote `cn`, na configuração padrão, e não de `@/lib/utils`. Ao adaptar, troque o import, ou tire o `cn` se o arquivo vai ao navegador.
   - **Objetivo:** com a configuração padrão, a escala do site é ignorada (o mesmo descarte do item 2).
   - **A exceção conhecida no Atlas:** `components/ui/sheet.tsx` usa o `cn` do pacote, de propósito e documentado no próprio arquivo. Ele está no painel do menu, que só carrega sob demanda, e nenhum tamanho de texto passa por ele.

### 3.5 · Os componentes do shadcn

1. **Regra:** `button.tsx`, `toggle.tsx` e `toggle-group.tsx` são elementos nativos reescritos. **Nunca reinstale** por cima.
   - **Objetivo:** a reinstalação traz o Base UI de volta (17 a 36 KB) e apaga as adaptações: alvo de toque de 44 px, transições de cor, compressão ao toque.
2. **Regra:** **nunca rode `shadcn apply` nem `shadcn init --preset`** num projeto existente.
   - **Objetivo:** os dois reinstalam **todos** os componentes e reescrevem as variáveis de cor e as fontes. O `apply` não documenta mesclar o que foi editado: ele sobrescreve. O `apply --only theme,font` também reescreve o tema.
3. **Regra:** antes de `shadcn add`, sempre `--dry-run` ou `--diff`. O comando `diff` está obsoleto; use `add --diff`.
   - **Objetivo:** ver o que entra antes de entrar.
4. **Regra:** o `components.json` declara o estilo (`base-nova`), a cor de base, as variáveis de CSS, a biblioteca de ícones e os registros. No Atlas: `"registries": { "@spell": "https://spell.sh/r/{name}.json" }`.
   - **Objetivo:** o estilo decide a estrutura e as classes que o CLI escreve em cada componente que entra, não só a cor. Declarado igual ao do Atlas, o `add --dry-run` e o `add --diff` comparam contra a mesma base, e o registro `@spell` se resolve sem endereço escrito à mão.
5. **Regra:** item novo do shadcn só entra adaptado:
   - alvo de toque de 44 px;
   - textos em português, vindos de `conteudo/`;
   - estados de hover, foco, desabilitado e espera;
   - medido no script inicial (`15-desempenho.md`).

   Se o script inicial crescer, o item carrega sob demanda.

### 3.6 · O Spell UI (os gestos)

O catálogo e as regras de uso estão em `09-movimento.md`; aqui fica a parte de código.

| Componente adaptado | Original | Como ficou | Custo |
|---|---|---|---|
| `gradient-wave-text.tsx` (a onda) | Gradient Wave Text | Componente de servidor. Uma cópia da palavra, pintada uma vez com o degradê da marca, numa janela de bordas apagadas que corre por cima; a peça recorta o que passa dela (`contain: paint`). Só `transform` | 0 de script |
| `highlighted-text.tsx` (a tarja e o marca-texto) | Highlighted Text | Componente de servidor. A tarja sobe por trás da palavra e uma cópia em outra cor desce o mesmo tanto. A variante `marcador` passa a faixa por trás do texto, sem cópia | 0 de script |
| `shimmer-text.tsx` (o brilho) | Shimmer Text | Componente de servidor. Uma cópia mais clara numa janela que corre; ambiente (`data-ambiente`), pausável | 0 de script |
| `tilt-card.tsx` (a inclinação) | Tilt Card | Ilha. Mede o invólucro que não gira; uma escrita por quadro (rAF); só com ponteiro fino e sem movimento reduzido; sem crescer no hover | Pequeno; medir |
| `copy-button.tsx` (copiar) | Copy Button | Ilha. Só confirma se copiou; se o navegador recusa, diz "Cópia indisponível" | +1,6 a +1,7 KB, com os dois ícones |
| `bars-spinner.tsx` (a espera) | Bars Spinner | Componente de servidor. Doze barras, só opacidade; paradas em leque com movimento reduzido; só aparecem durante a espera | 0 de script |

**O que os originais do registro traziam** (lidos em 03.10.2026; é o que se desfaz ao adaptar qualquer componente de catálogo):
- **Gradient Wave Text:** animava a variável `--gi` por `requestAnimationFrame`, com um arco-íris de demonstração (`#8d6869`, `#5a8ea6`, `#b9c96e`, `#c7c571`, `#cb706f`, `#7e5e5f`).
- **Tilt Card:** mudava estado do React a cada movimento do ponteiro, crescia a 1,05 e acendia um holofote branco.
- **Shimmer Text:** animava `backgroundPositionX` sem fim, pelo Motion.
- **Copy Button:** rótulos em inglês e alvo de 36 px.
- **Bars Spinner:** estilo por `styled-jsx`.
- **Highlighted Text:** a tarja subia por mola, com `mix-blend-difference`.

**Regra que fica:** antes de usar um componente de registro, procurar estes sintomas — estado do React a cada movimento do ponteiro, animação sem fim por script, cor fixa de demonstração, texto em inglês, alvo abaixo de 44 px, biblioteca de estilo própria, `mix-blend-mode` — e desfazê-los na adaptação.

**Ficaram de fora, de propósito:**
- **Light Rays:** traz o three.js, centenas de KB.
- **Signature:** opentype.js e uma fonte.
- **Tweet e Spotify Card:** dados de terceiros, o que é pedido externo.
- **QR Code e Chart:** sem uso.
- **Marquee, Text Marquee, Words Stagger, Blur Reveal e Slide Up Text:** repetem peças que o site já tem, e o letreiro que corre é marca de IA (`11-anti-ia.md`).

**Como trazer e adaptar um componente:**
1. `npx shadcn add @spell/<nome> --dry-run` para ver o que viria; depois, o mesmo comando sem `--dry-run`: o CLI grava em `components/`, e o arquivo vai para `components/ui/spell/` (`09-movimento.md`, seção 6.3).
2. **Adaptar:**
   - sem `cn`;
   - textos em português;
   - cores pelos tokens da marca (a onda original era um arco-íris);
   - só `transform` e `opacity` (exceção aceita: o desfoque de 2 px do ícone de copiar, num ícone de 16 px);
   - cantos arredondados (salvo identidade que peça o contrário);
   - componente de servidor sempre que não precisa de script;
   - entrada uma vez (recarregar não repete: `.ja-aberto`);
   - ambiente com `data-ambiente`;
   - nada com movimento reduzido;
   - as cópias decorativas com `aria-hidden`, `data-nosnippet` e `user-select: none`.
3. **Nunca script que escreva estilo a cada quadro.** Caso real de 03.10: a primeira adaptação da onda movia o degradê por uma variável de CSS a cada quadro, por ~2,7 s, durante a carga. Com CPU 20×, foram 716 ms de linha principal no módulo dela, ~800 ms a mais no documento, e o LCP da capa passou de 2,07 para 2,33 s (mediana de 7). Refeita só com `transform`, virou componente de servidor e a diferença sumiu. O Shimmer Text original tinha o mesmo defeito: movia o fundo.
4. **Medir** o script inicial antes e depois (`15-desempenho.md`, seção 4).
5. **Nunca reinstalar** por cima de um adaptado.

**Peças de outras bibliotecas** (desde 13.10.2026): o mesmo método, a partir do catálogo do kit (`../componentes/README.md`, seção 2). Ele acrescenta três passos:
- a licença relida no repositório no dia, no commit copiado;
- a origem conferida: shader do Shadertoy, código de outra biblioteca, imagem embutida;
- o aviso da licença ao lado do código (`LICENCA-<origem>.txt`), com a linha de origem no alto de cada arquivo.

Os sintomas da lista acima aparecem em quase todo catálogo. Os mais comuns, medidos na pesquisa:
- a falta do movimento reduzido;
- o Lenis embutido;
- a peça ligada à rolagem;
- a imagem de demonstração de terceiros.

### 3.7 · Navegação, âncoras e transição entre páginas

1. **Regra:** vínculo interno `#parte` passa por uma ilha de âncoras que rola até o destino e **tira o `#` do endereço**. Quem precisa saber o destino ouve o evento `EVENTO_ANCORA`, nunca lê `location.hash`.
   ```ts
   // lib/ancoras.ts
   /** Emitido na janela a cada ida a uma âncora; `detail.id` é o destino, sem "#". */
   export const EVENTO_ANCORA = "atlas:ancora";
   export type DetalheDaAncora = { id: string };
   ```
   - **Objetivo:** o endereço fica limpo para compartilhar. O montador sabe qual plano marcar (`#orcamento-<id>`) mesmo depois de o endereço perder a âncora.
2. **Regra:** a âncora da chegada se lê **decodificada com segurança**, pela função de `lib/ancoras.ts`.
   ```ts
   // components/ilhas/ancoras.tsx (trecho). Um decodeURIComponent solto num efeito derrubava a página inteira
   // com o vínculo /#%E0, trocando-a pela tela de erro do Next (achado em 03.10).
   import { ancoraDoEndereco } from "@/lib/ancoras"; // a decodificação segura mora num lugar só

   /** Tira a âncora do endereço sem criar entrada no histórico (preserva o estado do Next). */
   function limparEndereco() {
     if (window.location.hash) {
       window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
     }
   }
   ```
   Num repositório novo, um só lugar decodifica a âncora: `lib/ancoras.ts`, o mesmo arquivo do `EVENTO_ANCORA` (item 1), com `decodificarAncora(hash)` e `ancoraDoEndereco()` (`14-funcionalidades/01-base-de-todo-site.md`, seção 16). A regra de lint que proíbe o `decodeURIComponent` solto isenta só esse arquivo (`../qualidade/03-estatica.md`, seção 2): uma cópia local da função, na ilha, reprovaria nela. O Atlas chegou a ter duas cópias desta função e um `decodeURIComponent` solto.
3. **Regra:** `data-scroll-behavior="smooth"` no `<html>` quando o CSS liga `scroll-behavior: smooth`.
   - **Objetivo:** no Next 16, sem o atributo, a página nova da navegação rolava animada até o topo (corrigido em 03.10). Com ele, o Next suspende a rolagem suave na troca de página.
4. **Regra** (desde 28.10.2026): a troca de página é a **entrada por CSS**, no `template.tsx`: a página nova sobe e acende a partir do commit, e a que sai some de uma vez. O cabeçalho fica no layout, fora da caixa animada. **Não** o `<ViewTransition>` do React na troca de página.
   - **Objetivo:** 60 quadros na navegação (`15-desempenho.md`, seção 2.4). A captura da View Transition recalcula o estilo da página inteira e segura a tela: 4 a 5 batidas no celular 4×, no site do Atlas e nas demos (`15-desempenho.md`, seção 5.15).
   ```tsx
   "use client";
   // components/ilhas/entrada-da-pagina.tsx — a caixa da página nova, com a entrada só na ida.
   import { usePathname } from "next/navigation";
   import { useLayoutEffect, useRef, useState } from "react";

   // A carga não entra; o voltar e o avançar também não. O voltar guarda o caminho a que leva: um voltar dentro da
   // mesma página (de /servicos#precos a /servicos) não remonta o template. As duas se atualizam no commit.
   let carregou = false;
   let voltouPara: string | null = null;
   if (typeof window !== "undefined") window.addEventListener("popstate", () => (voltouPara = location.pathname));

   export function EntradaDaPagina({ children }: { children: React.ReactNode }) {
     const caixa = useRef<HTMLDivElement>(null);
     const caminho = usePathname();
     const [entra] = useState(() => typeof window !== "undefined" && carregou && voltouPara !== caminho);
     useLayoutEffect(() => {
       carregou = true;
       voltouPara = null;
       // Chegando numa âncora, sem a entrada: o deslocamento tiraria o destino do lugar. A classe sai direto no
       // elemento; um setState aqui adiantava os efeitos da página inteira para dentro do commit (medido: pior).
       if (window.location.hash) caixa.current?.classList.remove("pagina-entra");
     }, []);
     return (
       <div ref={caixa} className={entra ? "pagina-entra" : undefined}>
         {children}
       </div>
     );
   }

   // app/template.tsx — o template remonta a cada navegação (o layout, não).
   import { EntradaDaPagina } from "@/components/ilhas/entrada-da-pagina";

   export default function Modelo({ children }: { children: React.ReactNode }) {
     return <EntradaDaPagina>{children}</EntradaDaPagina>;
   }
   ```
   ```css
   /* app/globals.css — a entrada (as keyframes vt-pagina-entra da base), sem o atraso que esperava a saída e sem
      preenchimento (forwards ou both): acabada a entrada, a caixa fica sem transform. */
   .pagina-entra {
     animation: 400ms cubic-bezier(0.05, 0.7, 0.1, 1) vt-pagina-entra;
   }
   @media (prefers-reduced-motion: reduce) {
     .pagina-entra {
       animation: none;
     }
   }
   ```
   As durações e as curvas estão em `09-movimento.md`, seção 8. Com movimento reduzido, a troca é imediata.
   - **Os cuidados** (`15-desempenho.md`, seção 5.15): nada com `position: fixed` dentro da caixa (o `transform` da entrada faz dela a referência do `fixed`, e a peça fixa some durante a entrada): o que fica preso à tela mora no layout ou num portal para o `<body>`; o cabeçalho fora da caixa e sem `<ViewTransition>`; a troca pelo menu conferida quadro a quadro no celular.
   - **A base traz este código desde 02.11.2026** (`producao/base/app/template.tsx`, `components/ilhas/entrada-da-pagina.tsx`, `components/ilhas/ao-topo.tsx`, `app/globals.css`), compilado e medido: a navegação aprova na mesa e no celular 4× na base do exemplo, numa sessão (a porta pede duas; `15-desempenho.md`, seção 2.4). O `<ViewTransition>` sai também de qualquer site copiado das referências (`../referencias/`), que ainda o trazem.
5. **Regra:** **nunca** um `view-transition-name` fixo num ancestral de vidro (`backdrop-filter`).
   - **Objetivo:** o elemento nomeado vira raiz de fundo, e o desfoque deixa de ver a página.
6. **Regra:** animação dentro de diálogo modal (`<dialog>` com `showModal`) é feita pela **Web Animations API** no próprio diálogo, nunca pela View Transitions API.
   - **Objetivo:** a View Transitions API fotografa a página sem a camada de topo, e o diálogo some durante a transição (medido em 02.10, na troca de aparelho do simulador).
7. **Regra:**
   - vínculo para **outro site** (um site de exemplo, outro cliente) é `<a>` comum, não `<Link>`;
   - vínculo para o início, sem pré-busca.
   - **Objetivo:** a pré-busca do `<Link>` trazia as fontes e as imagens do outro site para a página atual. A fusão de CSS do empacotador fez "Para quem" pré-carregar as fontes da nutrição até isso ser corrigido.
8. **Regra:** peça de um site nunca importa a fonte de outro.
   - **Objetivo:** o empacotador junta as duas, e a página passa a pré-carregar a fonte alheia.
9. **Regra** (desde 28.10.2026): toda página abre no topo, na ida, no voltar, no avançar e na recarga. A exceção é o endereço com âncora, que vai à âncora (a ilha de âncoras, regras 1 e 2).
   - **Objetivo:**
     - É o pedido do usuário para o site do Atlas: em 17.10.2026, "sempre que o usuário entre em uma página, ele é levado para o topo dela, tanto no celular quanto no computador"; em 27.10.2026, "sempre que for mudar de uma página, ela começa no topo". Em todo site, a navegação já pedia "a rolagem começa no topo" (`../qualidade/05-ponta-a-ponta.md`, seção 4).
     - O Next não garante: no Atlas, a página nova abria no y de onde se veio (de 1.200 px, em 1.200), e a recarga voltava ao lugar.
     - Com as seções poupadas, a restauração do navegador devolve a pessoa fora do lugar (`15-desempenho.md`, seção 5.17).
   ```tsx
   "use client";
   // components/ilhas/ao-topo.tsx — no layout (não no template), ao lado das outras ilhas. Não desenha nada.
   import { usePathname } from "next/navigation";
   import { useLayoutEffect } from "react";

   export function AoTopo() {
     const caminho = usePathname();
     useLayoutEffect(() => {
       // Antes da pintura. A restauração do navegador fica manual; o "instant" vence o scroll-behavior: smooth do html.
       history.scrollRestoration = "manual";
       if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
     }, [caminho]);
     return null;
   }
   ```
   - **O cabeçalho que se recolhe ao rolar** volta à vista quando a página nova abre no topo. Sem isso, ele ficava recolhido no topo da página nova, onde nenhum gesto para cima o traz de volta.
   - **Como conferir:** cada chegada lida quadro a quadro (`requestAnimationFrame`), de uma página rolada até o meio: pelo cabeçalho, pelo menu, pelo conteúdo e pelo rodapé, e também no voltar, no avançar e na recarga. O primeiro quadro e o maior y até 1,5 s depois ficam em 0; com âncora, o destino fica à vista. No Atlas, 112 chegadas em y 0, a 390 e a 1440 px (28.10.2026).

### 3.8 · Privacidade no código

1. **Regra:** nada gravado no aparelho: nenhum cookie, `localStorage`, `sessionStorage` nem IndexedDB no site público.
   - **Objetivo:** sem cookie não há banner, e o pacote de conformidade fica simples (`17-conformidade-e-normas.md`).
   - **A única exceção prevista:** o cookie de sessão `HttpOnly; Secure; SameSite=Lax` do painel do dono, na área restrita da Agenda (`14-funcionalidades/`).
   - **Como conferir:** a régua, bloco 5.
2. **Regra:** nenhum pedido a outro domínio.
   - **Objetivo:** privacidade, desempenho e política de conteúdo (seção 5). O WhatsApp é **navegação** (um vínculo `wa.me`), não pedido.
   - **Como conferir:** a régua, bloco 5; o evento `securitypolicyviolation`.
3. **Regra:** recurso externo novo (fonte, script, imagem, conexão, quadro) exige mudar a política de conteúdo **e** registrar a razão. Caso contrário, o navegador o bloqueia **em silêncio**.

### 3.9 · Movimento no código

As regras de desenho estão em `09-movimento.md`; aqui ficam as de implementação.

1. **Regra:** só `transform` e `opacity` em movimento contínuo ou de entrada.
   - **Exceções medidas:** o desfoque leve do ícone de copiar; `clip-path` quando suave.
   - **Variável de CSS animada:** registrar com `@property` e `inherits: false`; sem isso, ela força repintura [V: Motion, lista de desempenho de 2025].
2. **Regra:** o script do `<head>` marca `.js`, e só com `.js` o movimento contínuo roda.
   - **Objetivo:** sem script, a esfera fica parada e a capa entra uma vez.
   - **`.ja-aberto`:** marcado quando a navegação é recarga ou volta pelo histórico; a entrada da capa não repete.
3. **Regra:** movimento contínuo leva `data-ambiente`. Uma ilha de controle o pausa pelo botão do cabeçalho (WCAG 2.2.2) e o para fora da tela (`data-fora`). Se ele nasce abaixo da dobra, só começa ao entrar na tela (`data-visivel`).
   - **Objetivo:** correr desde a carga quase triplicava os recálculos de estilo (119 contra 42 no Atlas).
4. **Regra:** `prefers-reduced-motion` em todo movimento: entrada, ambiente, transição, contagem, giro. No CSS, uma regra com `!important` reduz as transições de interação a cor, opacidade e sombra.
   - **Objetivo:** as transições de interação estão espalhadas nos utilitários de cada componente, com especificidade variada. Só o `!important`, num lugar só, garante que a preferência do visitante vença todas, inclusive as de um componente que ainda vai entrar.
5. **Regra:** números que contam não usam o Motion. Use `lib/contar.ts`, que escreve o texto do elemento diretamente.
   - **Objetivo:** a versão híbrida do Motion custaria 23 KB.
   - **Cuidado:** o elemento que conta não pode ser um nó que o React também desenha. No montador do Atlas, a escrita direta num `<span>` gerido pelo React foi apontada na auditoria (pendente).

### 3.10 · Nomes, idioma e comentários

1. **Regra:** código, nomes e comentários em português; identificadores de biblioteca no original.
   - **Objetivo:** os termos do negócio (plano, nicho, talão, montador, ficha) vêm do briefing e do conteúdo em português. Com o mesmo nome no código, quem lê o briefing acha a peça sem tradução de ida e volta, e o comentário serve aos sócios.
2. **Regra:** o comentário diz **por que o código é assim hoje**, com o caso que o motivou. O histórico ("saiu em 03.10, voltou no mesmo dia") vai para `decisoes.md` e para a mensagem do commit.
   - **Objetivo:** o comentário com histórico envelhece e atrapalha a leitura. Em 08.10, uma busca por datas em comentários ("até 03/10", "desde 01/10") achou 135 linhas em 71 arquivos do `web/` do Atlas.
3. **Regra:** arquivo curto, uma responsabilidade.
   - **Objetivo:** os maiores arquivos do Atlas (`vidro.css` com 852 linhas, `painel-do-simulador.tsx` com 599) concentram o que é difícil de mudar.
4. **Regra:** os commits levam o correio de não-resposta do GitHub (`<id>+<usuário>@users.noreply.github.com`), configurado **só no repositório** (`git config user.email`, sem `--global`).
   - **Objetivo:** identifica o autor sem expor o correio pessoal num repositório compartilhado, e sem mexer nos projetos pessoais de quem trabalha (registro de decisões do Atlas, 12.09.2026).
5. **Regra:** nenhuma ferramenta que intercepte o tráfego do agente (OmniRoute, Headroom e afins).
   - **Objetivo:** elas interceptam todo o tráfego, com código e dados de cliente; o OmniRoute reencaminha a provedores não identificados, o que é transferência internacional de dados sem base legal (registro de decisões do Atlas, 12.09.2026: vedados).
6. **Regra:** uma cópia só de cada regra, e o `CLAUDE.md` guarda regras, não histórico.
   - **Objetivo:** documento e comentário que crescem por acréscimo viram registro de decisões e escondem as regras. A auditoria técnica de 07.10.2026 achou no `web/` do Atlas cerca de 164 KB de Markdown, o bloco das Diretrizes de Design Premium copiado ao pé da letra em 16 arquivos e um `web/CLAUDE.md` de 50 KB, em boa parte registro de decisões [FU]. Contou também ~190 comentários com histórico datado em 74 arquivos ("pedido do usuário" 44 vezes), por outro critério que o da busca por datas do item 2.
   - **Como fazer:** a regra mora num arquivo só, e os outros apontam para ele; o `CLAUDE.md` do cliente traz cliente, nicho, plano, módulos, comandos, o que não alterar e as convenções (`modelos/claude-do-projeto.md`); o histórico vai para `decisoes.md` e para a mensagem do commit.
   - **O mesmo vale para o tamanho do código:** o Atlas tem 79 linhas com mais de 200 caracteres (a maior, de 1.182, em `ui/sheet.tsx`), classes de 300 a 500 caracteres e arquivos longos: `vidro.css` (852 linhas), `movimento.css` (678), `motor.ts` (662), `painel-do-simulador.tsx` (599), `conteudo/site.ts` (535) e `montador.tsx` (367). Arquivo curto, uma responsabilidade (item 3).

---

## 4. Os scripts e as ferramentas

**`package.json`** (os scripts do Atlas, salvo o `postbuild`: o do Atlas só roda `preparar-standalone.mjs`; o `gerar-htaccess.mjs` do site estático é RATIFICADO, `18-publicacao-e-manutencao.md`, seção 3.2; num cliente, os mesmos):

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "postbuild": "node ferramentas/preparar-standalone.mjs && node ferramentas/gerar-htaccess.mjs",
    "start": "next start",
    "regua": "node ferramentas/regua/regua.mjs"
  }
}
```

| Script | O que faz | Regra |
|---|---|---|
| `dev` | Desenvolvimento, `http://localhost:3000` | **Nunca** se mede com ele: outro script, outro CSS, o indicador de desenvolvimento |
| `build` | Compilação de produção; roda o TypeScript | Falhou o tipo, falhou o build |
| `postbuild` | Roda sozinho depois do `build`. Se a saída é `standalone`, copia `public/` e `.next/static` para dentro dela (seção 5.1); se é o export estático, grava o `.htaccess` em `out/` (`18-publicacao-e-manutencao.md`, seção 3.2) | Cada um dos dois scripts não faz nada no outro modo |
| `start` | Produção local; a base de toda medição | `npm run build && npm start` antes da régua e do Lighthouse. **No site estático** (`output: "export"`), o `next start` não serve: sirva a pasta `out/` com `npm run estatico` (`producao/base/ferramentas/servir.mjs`: comprime e aplica os cabeçalhos do `.htaccess` gerado) e rode a régua com `--base=http://localhost:3100`. O `python3 -m http.server` não serve para medir: não comprime (a régua lia 457 KB de script) e recusa conexões em paralelo (`ERR_CONNECTION_RESET`), medido em 08.10.2026; os cabeçalhos, que vão no `.htaccess`, só se conferem no endereço publicado (`18-publicacao-e-manutencao.md`, seção 5) |
| `regua` | A régua: dez blocos, cinco passagens por página, ~6 min nas 23 páginas do Atlas | Opções: `--base=URL`, `--pagina=/x` (repete), `--rapida` (sem contraste e teclado), `--paralelo=3`. Relatório em `.regua/relatorio.json`, fora do git. O Chrome não abre no sandbox do Claude Code: rode com o sandbox desligado |

**As ferramentas** (`ferramentas/`). No Atlas, as de captura e a de fotos abrem o Chrome instalado e falam com ele pelo DevTools Protocol, sem dependência; a régua usa o Playwright; a `preparar-standalone.mjs` só copia arquivos.

**Num site de cliente, as ferramentas vêm prontas na base** (`producao/base/ferramentas/`, desde 08.10.2026). Todas usam o Playwright da régua, sem dependência nova:
- `servir.mjs`, `gerar-htaccess.mjs` e `preparar-standalone.mjs`;
- `baixar-fonte.mjs`, `preparar-fotos.mjs` (várias larguras, sem metadados), `gerar-icones.mjs` (`apple-icon.png` e `favicon.ico`) e `capturar-compartilhamento.mjs`;
- `fotografar.mjs`, `conferir-paleta.mjs` e `conferir-pronto.mjs`.

A tabela abaixo é a do Atlas; a do cliente está em `producao/base/ferramentas/README.md`.

| Ferramenta | O que faz | Quando |
|---|---|---|
| `regua/` | A verificação de qualidade (`../qualidade/02-regua.md`) | Antes de dizer que uma mudança de interface está pronta |
| `preparar-standalone.mjs` | A cópia do `postbuild` | Sozinha |
| `preparar-fotos.mjs` | Corta a foto em quadrado (puxado para o alto, onde costuma estar o rosto), reduz a 480 × 480 e grava WebP de qualidade 82, respeitando a rotação gravada na foto. Uso: `node ferramentas/preparar-fotos.mjs <foto> <nome> [topo]` | A cada foto de pessoa. **Nunca** a foto crua do celular, de vários MB, em `public/`: tudo o que está em `public/` pode ser pedido pelo endereço. O Atlas ainda guarda em `public/socios/` três JPEG originais (88 a 134 KB) sem uso: não repetir |
| `capturar-simulador.mjs` | Fotografa a primeira tela de cada site em vários tamanhos. Com `APARELHO=compartilhar`, grava o cartão de compartilhamento de 1200 × 630 em JPEG (o `og:image`), de 53 a 92 KB em 07.10 | Sempre que a primeira tela mudar |
| `capturar-compartilhamento.mjs` | Desenha em HTML e fotografa o cartão de compartilhamento da marca (`public/compartilhar.png`) | Quando a marca ou o slogan mudarem. No Atlas, ainda usa a Archivo Black: a tipografia do site mudou em 03.10, e o cartão está desatualizado |
| `capturar-telas.mjs` | Fotografa as telas desenhadas em HTML para a vitrine e mede os marcadores | Só no site do Atlas (vitrine dos nichos) |

---

## 5. O `next.config.ts` de referência

Cópia comentada do Atlas, generalizada. **Cada diretiva tem um motivo; não remova sem registrar.**

```ts
import path from "node:path";

import type { NextConfig } from "next";

// O domínio do cliente, sem "www".
const dominio = "exemplo.com.br";
const desenvolvimento = process.env.NODE_ENV === "development";
// O domínio já aponta para este app? Ligue SITE_NO_DOMINIO=1 nas variáveis do
// web app, na virada (e reimplante): só então o endereço temporário da
// hospedagem converge para o domínio. Antes, ele serve para conferir o site novo:
// redirecionado, levaria ao site antigo, ainda no domínio (defeito de 03.10).
const noDominio = process.env.SITE_NO_DOMINIO === "1";

// Política de conteúdo: tudo vem do próprio site.
// - 'unsafe-inline' em script e estilo é inevitável sem páginas dinâmicas: o Next
//   embute os dados da página em <script> e o React escreve atributos style.
//   Nenhum script de fora carrega e nada é enviado para fora.
// - img-src com data: — o CSS usa imagens em data: (o grão, as máscaras).
// - No next dev, o recarregamento precisa de eval e do websocket.
// - frame-ancestors no lugar de X-Frame-Options: SAMEORIGIN compara o host e
//   recusava o enquadramento dos sites de exemplo nos subdomínios (defeito do
//   .htaccess de 29.08).
const politica = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${desenvolvimento ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self'${desenvolvimento ? " ws:" : ""}`,
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  `frame-ancestors 'self' https://${dominio} https://*.${dominio}`,
].join("; ");

const seguranca = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Content-Security-Policy", value: politica },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
  // Só vale sob HTTPS (o navegador ignora em http). Sem includeSubDomains:
  // nem todo subdomínio está garantido em HTTPS.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  // Janela aberta de outro site não alcança esta, e vice-versa.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Não anunciar a tecnologia no cabeçalho X-Powered-By.
  poweredByHeader: false,
  // Só se houver outro package-lock.json acima desta pasta (o Atlas tinha um na
  // raiz do repositório): diz ao Turbopack onde fica a aplicação.
  turbopack: { root: path.join(__dirname) },
  async headers() {
    return [
      { source: "/:caminho*", headers: seguranca },
      // Arquivo de public/ sem hash no nome: uma semana, com revalidação em
      // segundo plano. Cuidado: quem já tem a cópia guardada não vê a mudança
      // por uma semana (seção 5.3).
      {
        source: "/marca.svg",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    return [
      // www converge para o domínio raiz.
      {
        source: "/:caminho*",
        has: [{ type: "host", value: `www.${dominio}` }],
        destination: `https://${dominio}/:caminho*`,
        permanent: true,
      },
      // O endereço temporário da hospedagem converge só depois da virada.
      ...(noDominio
        ? [
            {
              source: "/:caminho*",
              has: [{ type: "host" as const, value: "(?<temporario>.+)\\.hostingersite\\.com" }],
              destination: `https://${dominio}/:caminho*`,
              permanent: true,
            },
          ]
        : []),
    ];
  },
};

export default nextConfig;
```

| Diretiva | Por quê |
|---|---|
| `default-src 'self'` | Nada de fora carrega; um recurso externo novo é bloqueado e aparece no evento `securitypolicyviolation`, que a régua acusa |
| `script-src 'self' 'unsafe-inline'` | Sem página dinâmica, não há como pôr *nonce*. A opção experimental `sri` do Next pode tirar o `'unsafe-inline'`: a experimentar (`../qualidade/`) |
| `img-src 'self' data:` | Texturas e máscaras do CSS em `data:` |
| `frame-src 'self'` | O simulador do Atlas embute os sites de exemplo, do mesmo domínio |
| `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` | Fecham a injeção de plugin, a troca da base dos endereços e o envio de formulário para fora. Uma Agenda ou um formulário que envie a outro domínio exige mudar `form-action` **e** registrar |
| `frame-ancestors` no domínio e nos subdomínios | Ninguém de fora embute o site (clickjacking), mas os subdomínios do próprio domínio podem |
| HSTS sem `includeSubDomains` | Força HTTPS no domínio; um subdomínio sem certificado não pode ser prometido |
| COOP `same-origin` | Isola a janela das abertas por outros sites; os vínculos externos já abrem com `noopener` |
| `Permissions-Policy` | O site não usa localização, microfone nem câmera; declara isso |
| `poweredByHeader: false` | Não dá pista de versão a quem procura falha conhecida |
| Nenhum `X-Robots-Tag` no `/llms.txt` | O arquivo fica legível e indexável como as páginas, como no site do Atlas (decisão do coordenador, 16.10.2026); quem obedece ao `noindex` são justamente os robôs de busca das IAs a que ele se dirige (`21-busca-e-ias.md`, seção 7) |

**O `X-Robots-Tag` do site de exemplo [ex] e do rascunho.** O `noindex` por cabeçalho alcança o que a meta da página não alcança: as imagens, o cartão de compartilhamento, os arquivos (Google, block-indexing) [V]. No estático, o `gerar-htaccess` da base o grava em toda resposta quando `exemplo: true` ou `RASCUNHO=1`; no web app, `SITE_HOMOLOGACAO=1` (`18-publicacao-e-manutencao.md`, seção 2.2). O site de exemplo sai sempre no estático (o `novo-site` não o põe em servidor). Nunca por `Disallow` no `robots.txt` para os buscadores: o robô bloqueado não leria o `noindex` (`14-funcionalidades/01-base-de-todo-site.md`, seção 12).

### 5.1 · `output: "standalone"` e o `postbuild`

**Regra:** no web app Node.js da Hostinger, a compilação sai em `standalone`. A Hostinger aplica isso sozinha antes de compilar; o export estático "não tem efeito" lá (documentação da Hostinger, consultada em 03.10) [V].

**O defeito que isto corrige:** o servidor standalone não leva sozinho `public/` nem `.next/static`. Em 03.10, testado localmente em modo standalone, o logotipo, as prévias, as telas e a imagem de compartilhamento davam 404.

```js
// ferramentas/preparar-standalone.mjs — roda sozinho depois do `next build` (o
// "postbuild"). Se a compilação saiu em standalone, copia para dentro dele o que
// o servidor standalone não leva: public/ e .next/static. Sem standalone, nada.
import { cpSync, existsSync } from "node:fs";

if (existsSync(".next/standalone")) {
  cpSync("public", ".next/standalone/public", { recursive: true });
  cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
  console.log("standalone: public/ e .next/static copiados para .next/standalone");
}
```

**Como conferir:** compilar em standalone localmente, subir o `server.js` e pedir o logotipo, o cartão de compartilhamento e uma imagem de `public/`. Os três precisam responder 200. Depois de copiar arquivos novos de `public/`, reinicie o servidor: ele não vê o que chegou depois de subir.

### 5.2 · `output: "export"` (sites estáticos)

**Regra:** site sem servidor (sem formulário nem Agenda; em geral, o Essencial) sai em export estático e é servido pela hospedagem comum (`18-publicacao-e-manutencao.md`).

**O que se perde** (documentação do Next, guia de export estático) [V]:
- cabeçalhos;
- redirecionamentos e reescritas;
- o `proxy`;
- regeneração incremental;
- Server Actions e cookies;
- a otimização de imagem padrão.

Nenhum faz falta num site sem cookie, com contato pelo WhatsApp e imagens já preparadas na compilação. A configuração do export leva `images: { unoptimized: true }`: sem ela, um `<Image>` do `next/image` para o build (`18-publicacao-e-manutencao.md`, seção 3.1).

**Para onde vão os cabeçalhos e os redirecionamentos:** para um `.htaccess` **gerado** junto com o export e **conferido** depois de publicar (modelo em `18-publicacao-e-manutencao.md`, seção 3.2).

**As lições do `.htaccess` do Atlas:**

| Lição | O que aconteceu |
|---|---|
| A regra de endereço canônico não pode engolir subdomínios | O `.htaccess` de 29.08 mandava qualquer host diferente do domínio raiz para a raiz: engoliria todo subdomínio que o herdasse. Só `www` e o endereço temporário convergem, e a passagem para HTTPS preserva o host |
| `X-Frame-Options: SAMEORIGIN` não serve | Ele compara o host e recusava o enquadramento dos demos nos subdomínios. No lugar, `Content-Security-Policy: frame-ancestors` com o domínio e os subdomínios |
| O arquivo pode não estar em vigor | Em 08.09 e 30.09, o `.htaccess` da raiz do Atlas não estava em vigor, com três sintomas: nenhum cabeçalho enviado, `www` sem redirecionar, 404 padrão da hospedagem em vez da página da marca. A causa não foi determinada. O Gerenciador de Arquivos da Hostinger esconde arquivos iniciados por ponto (ative "mostrar arquivos ocultos"), o que já causou dois diagnósticos falsos |
| A medição pode mentir | Pedido com `--compressed` recebe da CDN da Hostinger uma página de verificação de navegador, não o site. Confira os cabeçalhos com `curl -sI`, sem `--compressed` |

O pacote `rascunhos/site-2026-08-29/` (no repositório do Atlas) tem o `.htaccess` com os dois defeitos: **nunca republicar**.

### 5.3 · Arquivo em cache e referência nova

**Regra:** arquivo de `public/` sem hash no nome e com cache longo **não ganha referência nova** enquanto o cache valer.

**O defeito:** em 03.10, o "A" da nota sobre o nome, em O Atlas, sumia para quem já tinha o `/marca.svg` guardado (cache de uma semana): o código passou a apontar `#letra` dentro do SVG, e a cópia guardada não tinha esse fragmento. O traçado voltou para o componente.

**Como fazer:** desenho que muda vai no componente, ou num arquivo com nome novo.

---

## 6. Metadados, mapa do site e ícones

1. **Regra:** `metadataBase` no layout raiz; **cada página declara** título, descrição, canônico e cartão de compartilhamento.
   - **Objetivo:** o vendedor manda o endereço pelo WhatsApp, e sem as marcações `og:` o cartão chega cru. Até 07.10, os sites de exemplo do Atlas não as tinham.
   - **O canônico por página:** a 404 herdava do layout o canônico da capa, dizendo à busca que era a capa (corrigido em 07.10).
   - **Na 404:** o Next já põe `noindex` sozinho; não duplique (em 07.10, a 404 chegou a sair com dois).
   - **A função:** `metadadosDaPagina`, em `lib/metadados.ts`, é a de `14-funcionalidades/01-base-de-todo-site.md`, seção 10: o título ganha "· Nome do negócio" (salvo no início), e o `og:title` é o título curto, sem a marca. Não há outra versão. Por isso os títulos de `conteudo/site.ts` vêm sem a marca, com `tituloCurto` e `descricaoCurta` ao lado (`10-texto-e-conteudo.md`, seção 7).

2. **Regra:** o cartão de compartilhamento é a primeira tela do próprio site, em 1200 × 630, JPEG.
   - **Limites do WhatsApp** (documentação da Meta) [V]: imagem com menos de 600 KB, 300 px ou mais de largura, no máximo 4:1; o `<head>` dentro dos primeiros 300 KB do HTML; título sem o nome da marca repetido; descrição de ~80 caracteres.
   - **Como fazer:** no Atlas, `APARELHO=compartilhar node ferramentas/capturar-simulador.mjs`; num site de cliente, `node ferramentas/capturar-compartilhamento.mjs`, da base de produção (`../base/ferramentas/`).
   - **Varia por:** site de exemplo **[ex]**: título "… · demonstração" e descrição terminada em "Estabelecimento fictício.".
3. **Regra:** título e descrição **distintos** por página.
   - **Objetivo:** dois resultados iguais na busca e dois cartões iguais na conversa não dizem qual página é qual.
   - **Como conferir:** a régua, bloco 3.
4. **Regra:** `viewport` com `themeColor` (a cor do fundo da marca) e `viewportFit: "cover"` (a área segura dos celulares com recorte); `color-scheme` coerente com o tom.
   - **Objetivo:** a barra do navegador do celular toma a cor da marca, e não o cinza do sistema; o `cover` deixa o fundo ocupar a área do recorte da tela, com o que é interativo dentro da área segura; o `color-scheme` faz o navegador pintar os controles nativos (rolagem, campos) no tom da superfície.
   - **Com `viewportFit: "cover"`, a página ocupa a área do recorte:** o conteúdo junto das bordas precisa dos recuos `env(safe-area-inset-left)` e `env(safe-area-inset-right)`, e o que é fixo, também os de cima e de baixo. No envelope da página: `padding-left: max(1.5rem, env(safe-area-inset-left))` e o mesmo à direita. Sem eles, no iPhone com recorte, na horizontal, o texto passa por baixo do recorte. O Atlas só tem os recuos de cima e de baixo (o painel do menu e a ação flutuante): achado de 03.10.2026, PENDENTE lá.
5. **Regra:** `app/sitemap.ts` lista as páginas indexáveis, pelo endereço canônico e com a data da última mudança de conteúdo escrita à mão, sem `priority` nem `changefreq`; `app/robots.ts` libera tudo no site de cliente, inclusive os robôs de IA, e aponta o mapa. A regra e o código estão em `14-funcionalidades/01-base-de-todo-site.md`, seção 12, e na base (`../base/app/`); o porquê de cada robô, em `21-busca-e-ias.md`, seções 1 a 3.
   - **Objetivo:** a data automática da compilação diria que tudo mudou a cada publicação; o endereço que redireciona, no mapa, não é o canônico.
   - **Varia por [ex]:** site de exemplo fica **fora** do mapa, com `robots: { index: false, follow: false }` no layout, o `X-Robots-Tag` por cabeçalho (seção 5) e os 11 robôs de IA com `Disallow: /`.

6. **Regra:** os ícones, como convenção de arquivo do App Router: `app/icon.svg` (com variação para o modo escuro dentro do SVG, se a marca pedir) e `app/apple-icon.png` (180 px).
   - **Objetivo:** a aba do navegador, a tela inicial do iPhone e o resultado da busca mostram a marca, não um ícone genérico.
   - **O conjunto completo**, segundo a pesquisa de design de 07.10: `.ico` de 32 px, SVG com modo escuro, o da Apple de 180 px e os mascaráveis de 192 e 512 px [V]. O Atlas tem só o SVG e o da Apple. Completar o conjunto num site de cliente é RATIFICADO.
7. **Regra:** dados estruturados na página inicial, gerados do conteúdo (seção 3.2): um `@graph` com o `WebSite` (o nome do site que a busca mostra) e o negócio no subtipo de `LocalBusiness`, ligados pelo `@id` (`14-funcionalidades/01-base-de-todo-site.md`, seção 11; desde 16.10.2026).
   - **Objetivo:** o negócio de bairro é achado na busca local. Os dados estruturados dizem ao buscador, sem ambiguidade, o nome, o endereço, o telefone e o horário, os mesmos do texto e do perfil do Google (`14-funcionalidades/01-base-de-todo-site.md`, seção 6). Nunca no site de exemplo: seria dado falso de negócio fictício. Não há marcação especial para as IAs (`21-busca-e-ias.md`, seção 5).
   - **Obrigatórios:** nome e endereço.
   - **Recomendados:** telefone com +55, coordenadas e horário (Google, guia de negócio local) [V].
   - **Nunca:** marcar depoimento do próprio negócio como avaliação.

---

## 7. O layout raiz

```tsx
// app/layout.tsx — referência, generalizada do Atlas.
import type { Metadata, Viewport } from "next";

import { texto, titulo } from "./fontes"; // as fontes da marca (05-tipografia.md): --font-texto e --font-titulo
import "./globals.css";

// Roda no <head>, antes da primeira pintura, e não grava nada no aparelho:
// - .js: há script; só então o movimento contínuo roda;
// - .ja-aberto: recarga ou volta pelo histórico; a entrada da capa não repete.
const primeiraAbertura = `(function(){var h=document.documentElement;h.classList.add("js");try{var n=performance.getEntriesByType("navigation")[0];if(n&&(n.type==="reload"||n.type==="back_forward"))h.classList.add("ja-aberto")}catch(e){}})()`;

export const metadata: Metadata = {
  metadataBase: new URL("https://exemplo.com.br"),
  // Sem canônico aqui: cada página declara o seu (seção 6).
};

export const viewport: Viewport = { themeColor: "#______", viewportFit: "cover" };

export default function LayoutRaiz({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: o script do <head> acrescenta classes ao <html> antes da hidratação.
    // data-scroll-behavior: a rolagem suave vale para as âncoras, não para a troca de página.
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${texto.variable} ${titulo.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: primeiraAbertura }} />
      </head>
      <body>
        <a
          href="#conteudo"
          className="fixed top-3 left-3 z-[70] -translate-y-24 rounded-full bg-primary px-5 py-2.5 text-primary-foreground no-underline transition-transform duration-300 focus:translate-y-0"
        >
          Ir para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
```

O `themeColor` é um dos poucos hexadecimais permitidos fora do CSS: o `viewport` do Next não lê variável de CSS.

**As fontes moram em `app/fontes.ts`** (`05-tipografia.md`, seção 4.1), que o layout e a `global-error.tsx` importam. As variáveis do `next/font` têm um nome só em todo o kit: `--font-texto` para o texto e `--font-titulo` para o título (e `--font-dados`, se houver a terceira). O `globals.css` as lê com reserva dentro do `var()`: um `var()` que aponta para variável inexistente invalida a declaração inteira, e o site sairia na fonte padrão do navegador.

| Peça | Regra | Objetivo |
|---|---|---|
| `lang="pt-BR"` | Sempre | O leitor de tela lê em português; a régua (bloco 3) acusa outro valor |
| O vínculo "Ir para o conteúdo" | Primeiro elemento focável; o `<main>` de cada página com `id="conteudo"` e `tabIndex={-1}` (no Atlas, só a 404 e as telas de erro levam o `tabIndex`) | Quem navega pelo teclado pula o cabeçalho, e o foco vai de fato para o conteúdo (`16-acessibilidade.md`, seção 3.1) |
| `display` da fonte (em `app/fontes.ts`) | `swap` por padrão; `optional` quando a troca tardia refaz o leiaute e pesa | No Atlas, o Inter em `swap` custava ~50 ms a mais de TBT com CPU 20× (334 contra 293 ms). Com `optional`, a reserva não precisa imitar as medidas (`adjustFontFallback: false`) |
| `app/error.tsx` | Em português, na composição da 404, com "Tentar de novo" (`retry`, que pede de novo ao servidor; o `reset` só redesenharia) e "Voltar ao início"; **só classes**: sem `cn`, sem `buttonVariants`, sem nada de `conteudo/` | Faz parte do script de toda página: +1,0 KB com classes, +2,0 KB com o `cva`. Antes dela, um defeito mostrava a tela padrão do Next, em inglês |
| `app/global-error.tsx` | Define o próprio `<html lang="pt-BR">` e `<body data-tom="...">`, importa `globals.css` e as fontes de `app/fontes.ts` (a classe das variáveis vai no `<html>` dele), usa os tokens e chama o `retry` | O erro do layout raiz troca o documento inteiro; a página padrão do Next saía sem `lang` e em inglês |
| `app/not-found.tsx` | A 404 da marca: o caminho de volta, sem culpar quem chegou | Achado de 03.10: o vínculo da 404 levava "/" na frente de um caminho que já começava com "/" e virava `//orcamento`, outro domínio |

---

## 8. A base de produção (RATIFICADO)

A pergunta do usuário em 07.10.2026: "como posso fazer com que eu tenha base para produção ao cliente em Next.js?". A etapa "template de construção" da ordem de trabalho (ata de 05.08, bloco 09) segue aberta. **Nada foi montado; esta seção é a recomendação.**

**O diagnóstico de 07.10.2026** [FU: relatório de produto e auditoria técnica daquele dia]: a base de produção para cliente não existia.
- Os três sites de exemplo são peças únicas dentro do app do Atlas, sem estrutura compartilhada de propósito: cada um tem a sua identidade.
- O núcleo comum só existia no gerador em Python dos doze demos estáticos (`demos/producao/`, no repositório do Atlas); em Next.js não havia equivalente.
- Sem CMS: toda edição exige desenvolvedor, compilação e publicação.
- Sem modelo de hospedagem para clientes: os documentos supunham "50 sites", e o plano comporta poucos web apps Node (`18-publicacao-e-manutencao.md`, seção 1).
- Sem fluxo de homologação para o link de 24 horas, sem repositório nem integração contínua por cliente, sem monitoramento e sem procedimento de backup. A homologação e as cópias de segurança têm proposta em `18-publicacao-e-manutencao.md` (seções 6 e 9), e a integração contínua em `../qualidade/13-integracao-continua.md`; o monitoramento do app Node segue sem procedimento (pendência no `99-rastreabilidade.md`).

### 8.1 · O que aprender com o `shadcn create`

O `shadcn create` (12.12.2025) nasceu do mesmo problema do Atlas: "somewhere along the way, all apps started looking the same" [V].

**Como funciona** (código-fonte do shadcn, versão de 17.09.2026) [V]:
- **Preset.** O construtor (ui.shadcn.com/create) gera um código curto com o estilo, a cor de base, o tema, a cor dos gráficos, os ícones, a fonte de texto e a de título, o raio e a cor e o acento do menu. São três bases de primitivos (Base UI, a padrão desde julho de 2026; Radix; React Aria) e oito estilos: Vega, Nova, Maia, Lyra, Mira, e, em 2026, Luma, Sera e Rhea. Dos três de 2026: o Luma é arredondado ("macOS Tahoe, minus the glass"); o Sera é editorial, com controles sublinhados; o Rhea é um Luma compacto. O construtor tem pré-visualização e sorteio (Shuffle). A frase do lançamento que resume o resto: "Your config doesn't just change colors, it rewrites the component code… Fonts, spacing, structure, even the libraries you use" [V: relatório do `shadcn create`, 07.10.2026, no repositório do Atlas].
- **O estilo muda a estrutura, não só a cor.** Cada componente-fonte usa **marcadores** (`cn-button`, `cn-button-size-sm`). Cada estilo é uma folha que liga o marcador a utilitários: a do Nova tem 1.748 linhas, com forma, densidade, tipo e espaço de cada peça. Na compilação do registro, os marcadores viram Tailwind puro, e quem instala recebe o código já no estilo. A troca é do `build-registry.mts` (`createStyleMap` e `transformStyle`, com o ts-morph, dentro de `cva`, `className`, `cn()` e `mergeProps`), e o resultado sai em `public/r/styles/<base>-<estilo>/<item>.json`; o `style` do `components.json` vale `<base>-<estilo>` (o do Atlas, `base-nova`). Na instalação, o CLI só aplica transformadores locais: ícones, menu, `cn-font-heading`, RTL, variáveis, apelidos, RSC e prefixo. **`createStyleMap` e `transformStyle` são exportados sem documentação: trate-os como API interna**, que muda sem aviso. A base do Atlas não depende deles: a folha estrutural de cada cliente é CSS em `@layer components` (item 1 abaixo) [V: relatório do `shadcn create`, 07.10.2026].
- **Registro.** O tipo `registry:base` carrega um design system inteiro (componentes, dependências, variáveis, fontes, configuração); o `registry:font` só aceita fontes do Google. Um registro pode morar num repositório do GitHub, inclusive privado (desde agosto de 2026), consumido por `shadcn add dono/repo/item#<ref>`. A referência por commit (SHA) é "the most reproducible option". O que conta para montar o registro da Atlas: os tipos `registry:style`, `theme`, `ui`, `block`, `lib`, `hook`, `page`, `file` e `item`; o `registry:base` leva `config` (estilo, ícones, menu, cor de base, apelidos, registros), e `extends: "none"` parte do zero; cada item declara `cssVars`, `css` (com `@layer`, `@utility`, `@keyframes`), `envVars` e `registryDependencies` (nome, `@ns/item`, `dono/repo/item#ref`, endereço ou arquivo); os registros com nome aceitam cabeçalhos com `${TOKEN}`; **se dois itens escrevem no mesmo arquivo, vence o último**; `include` e `shadcn registry validate` existem desde maio de 2026. No GitHub, o registro dispensa compilação e servidor; o privado se lê com `gh auth login` ou com um `GH_TOKEN` só de leitura; ele distribui também `AGENTS.md`, `.claude/commands/*` e fluxos de trabalho; só `github.com`, até 5 MiB por arquivo [V: relatório do `shadcn create`, 07.10.2026].
- **Atualização.** O `components.json` não guarda a versão instalada. A orientação oficial é pedir a um agente: "check for updates from @shadcn and merge with my local changes".
- **O CLI.** O `init` (ou `create`) aceita `-t` (next, vite, start, react-router, laravel, astro), `-b` (base, radix, aria), `-p <preset>` e `--monorepo`: um Turborepo com `apps/web` e `packages/ui`, o ponto de partida natural da seção 8.3. Ele também parte de um item, por nome, endereço ou arquivo. O `apply --preset` troca o preset e reinstala os componentes (vedado num projeto existente, seção 3.5); o `eject` copia `shadcn/tailwind.css` e tira a dependência (seção 10); a atualização se confere com `add --dry-run`, `--diff` e `--view`. A migração para o Base UI é uma skill ("Because you own the code"): um commit por componente, num ramo próprio, com relatório em `.migration/` [V: relatório do `shadcn create`, 07.10.2026].
- **MCP.** `pnpm dlx shadcn@latest mcp init --client claude` dá ao Claude Code ferramentas para listar, buscar, ver itens e montar o comando de `add`. São sete: os registros do projeto, listar, buscar, ver itens, exemplos, o comando de `add` e `get_audit_checklist` (a lista de conferência depois de instalar). A skill oficial do shadcn entra com `npx skills add shadcn/ui`. Na base da seção 8.3, os dois apontam para o registro da Atlas [V: relatório do `shadcn create`, 07.10.2026].

**O que o Atlas aprende:**
1. **Variar a estrutura, não só os tokens:**
   - uma peça sem identidade, com marcadores (`at-cartao`, `at-acao`);
   - uma folha de estilo de cada cliente, em `@layer components`, com forma, densidade e tipo;
   - os tokens de função.

   Duas marcas com a mesma peça e folhas diferentes não se parecem. É o que os três sites de exemplo já fazem à mão.
2. **O preset do nicho é ponto de partida, nunca resultado.** Grava-se o preset de cada cliente, e o par tipográfico, a forma e a paleta não se repetem dentro do mesmo nicho (`04-direcao-de-arte.md`).
3. **Um portão de unicidade** comparando a capa de cada cliente com a dos outros, por semelhança perceptual e pelos tokens. Proposta em `../qualidade/`.
4. **Distribuir por cópia, não por pacote:** o projeto é dono do código.

### 8.2 · As opções avaliadas

| Opção | A favor | Contra | Esforço |
|---|---|---|---|
| Repositório-modelo por cliente | Isolamento; entregar o código é trivial | Os derivados não recebem atualização: cada uma vira um pedido de mescla com conflitos. `create-next-app --example` só lê repositório público | 1–2 dias, e cresce com cada cliente |
| **Monorepo (pnpm e Turborepo)** | Mudança de uma vez só; `turbo run build --affected` compila só o que mudou; um contexto só para o agente; `turbo prune` extrai um cliente | Um pacote comum atinge todos: a identidade não pode subir para ele | 3–5 dias |
| **Registro shadcn privado no GitHub** | Peças por cópia, com versão por commit, sem servidor; o MCP do shadcn as enxerga | Cada cliente atualiza à mão | 2–4 dias para 8 a 12 peças |
| **Gerador** (`turbo gen cliente`, com Plop) | Todo começo igual e certo | Sozinho, não atualiza nada | 1–2 dias |
| Sem CMS | Nenhuma infraestrutura; o texto é conferido e a régua roda sempre | O cliente depende do Atlas para mudar o site | — |
| Pages CMS (sobre o Git) | O cliente edita o próprio repositório (JSON, YAML), e quem não tem conta no GitHub entra por convite de e-mail: a pessoa do balcão | Serviço de terceiro; o convite na conta gratuita, A CONFIRMAR | 1–2 dias por cliente |
| Keystatic (sobre o Git) | Interface própria, conteúdo no repositório | Série 0.5, sem sinal claro de manutenção em 2026 | 2–5 dias |
| TinaCMS (sobre o Git) | Edição visual | Grátis até 2 usuários; auto-hospedado, exige banco e Auth.js | 2–5 dias |
| Decap e Sveltia (sobre o Git) | Sem banco | Exigem conta no GitHub ou um intermediário de OAuth | 2–5 dias |
| CMS completo (Payload 3) | Conteúdo dinâmico de verdade | Servidor e banco (Postgres, SQLite ou MongoDB); sem adaptador oficial para o MySQL da Hostinger | 1–2 semanas |

### 8.3 · A recomendação

1. **Um monorepo de código, separado do repositório da sociedade** (que tem `juridico/` e `comercial/`):
   ```
   atlas-estudio/
   ├── apps/atlas/                 o site do Atlas, com os sites de exemplo como canários
   ├── apps/clientes/<cliente>/    um app por cliente: conteudo/ + identidade/ + as páginas
   ├── packages/base/              só o que não tem identidade: primitivos acessíveis sobre
   │                               elementos nativos, JSON-LD de negócio local, o vínculo do
   │                               WhatsApp, o esquema do conteudo/, a fábrica do next.config
   │                               com a política de conteúdo, as âncoras, o ocioso
   ├── packages/regua/             a régua
   ├── packages/config/            tsconfig, lint, formatação
   ├── registry.json               as peças dos planos, no formato de registro shadcn
   └── turbo/generators/           o gerador: nicho + plano → app novo
   ```
   As versões ficam num catálogo do pnpm. É o modelo da ata de 05.08: "template já construído + arquivo de texto simples por cliente".
2. **Cada cliente é a base mais o `conteudo/` e a `identidade/`:**
   - tokens;
   - fontes e licenças;
   - a folha de estilo estrutural;
   - o gesto da marca;
   - um `CLAUDE.md` da marca, com o que é proibido.

   Nada da identidade sobe para `packages/`.
3. **As peças dos planos num registro shadcn privado**, consumidas por cópia (`shadcn add dono/repo/peça#<commit>`). Um arquivo de trava próprio guarda o commit de origem de cada peça, para a mescla de três vias que o CLI não faz. RATIFICADO: `pecas.lock.json`, na raiz de cada app. O `registry.json` da raiz junta as peças por `include`.
4. **O gerador** (`turbo gen cliente`) recebe o nicho e o plano. Ele:
   - cria o app;
   - instala as peças da camada do plano (`03-planos.md`);
   - copia o esqueleto do `identidade.md` e do `conteudo/`;
   - preenche o `CLAUDE.md`.

   Depois dele, **são obrigatórios** o passe de identidade (`04-direcao-de-arte.md`), a avaliação anti-IA (`11-anti-ia.md`) e o portão de unicidade entre clientes (`../qualidade/11-design-e-anti-ia.md`, seção 9).
5. **A publicação depende do plano:** estática onde não há servidor, web app Node.js onde há (`18-publicacao-e-manutencao.md`). No estático, a integração contínua compila só o que mudou, roda a régua e envia o `out/` para o ramo do cliente num repositório só de artefatos, que a Hostinger publica. Reverter é reverter o commit.
6. **CMS: nenhum por padrão.** O pedido do cliente na manutenção vira uma mudança feita pelo Claude Code, que passa pela régua e é publicada. Um CMS sobre o Git entra só a pedido e para campos estreitos (horário, preço, fotos).
7. **Atualizar muitos sites com segurança**, em três classes (`18-publicacao-e-manutencao.md`, seção 8):
   - segurança e infraestrutura, em ondas;
   - melhoria de peça, opcional por cliente;
   - identidade, nunca compartilhada.
8. **Quem julga o resultado é a régua**, nunca a justificativa que o agente dá. Cinco ferramentas de interface gerativa convergem na aparência, e mais de 25% das justificativas de design que elas apresentam não chegam ao código ("Design Theater", AIES 2026, https://arxiv.org/abs/2607.22928) [FU].
9. **Os agentes na base** (RATIFICADO): um `CLAUDE.md` na raiz do monorepo, com as regras comuns, e o da marca em cada cliente (item 2); a skill e o MCP do shadcn apontando para o registro da Atlas (seção 8.1); os comandos `/novo-cliente`, `/atualizar-peca` e `/regua`, distribuídos como `registry:item` pelo mesmo registro [V: relatório do `shadcn create`, 07.10.2026].

**Fases** (estimativa):
- **Depois da publicação do site do Atlas:** montar o monorepo, a base, a régua e o gerador, e ensaiar a publicação estática com um site de exemplo (~2 semanas de uma pessoa).
- **Piloto:** o primeiro cliente sai do gerador, sem CMS.
- **A partir de três clientes:** a peça que aparece em três clientes entra no registro.

**A CONFIRMAR antes de decidir:**
- **No hPanel:** a cota de web apps Node.js do plano Business (fontes de terceiros dizem 5; a documentação oficial só diz "a set number"); se um domínio estacionado serve um app Node.
- **No shadcn:** se o `init` aceita um `registry:base` por endereço do GitHub (a documentação cobre nome, URL e arquivo).
- **No Pages CMS:** se o convite por e-mail, para quem não tem conta no GitHub, vale na conta gratuita.
- **No Keystatic:** se há manutenção ativa em 2026 (série 0.5).
- **No `.htaccess` gerado:** se a hospedagem comum aplica os cabeçalhos, inclusive o HSTS (a conferência da publicação, `18-publicacao-e-manutencao.md`, seção 5).

---

## 9. Tecnologia nova, e a que sai

### 9.1 · A regra

A pilha muda quando a medição justifica, sem reescrever esta esteira. Uma tecnologia — biblioteca, framework, serviço, formato — entra ou sai quando:

1. **Há um problema declarado** que a pilha atual não resolve bem. "É moderna" e "todo mundo usa" não são problemas.
2. **A medição sustenta:** antes e depois, contra a régua inteira e o Lighthouse, no build de produção (`15-desempenho.md`).
3. **A degradação continua:** a página existe sem script e com movimento reduzido.
4. **A privacidade continua:** nenhum pedido externo nem gravação no aparelho. Se a tecnologia exigir, a política de conteúdo e o pacote de conformidade são revistos na mesma mudança, por escrito.
5. **A licença permite uso comercial,** e quem mantém a tecnologia está ativo.
6. **Fica registrado** em `decisoes.md` e no registro de decisões do Atlas, com a razão. Mudança na pilha de todos os sites passa pelos sócios (ata v3.0, V).

**Num site de cliente,** a tecnologia nova entra primeiro num site de exemplo, onde se mede sem risco.

### 9.2 · O 3D, como exemplo da regra aplicada

**Até 01.10, vedado por medição:** o script de um showroom em WebGL pesava 639 KB (doze vezes um demo inteiro), e sem script a página não existia.

**A barbearia de exemplo tratou as duas razões.** Desde então, o 3D entra **só no Completo** e **só se** cumprir as cinco condições:

1. **Motor próprio ou leve, medido.** O da barbearia tem ~16 KB; o three.js, ~178 KB; o OGL, ~29–33 KB [FU].
2. **Carrega sem travar a página:**
   - carga com o navegador ocioso;
   - compilação paralela dos *shaders* (`KHR_parallel_shader_compile`);
   - o atlas das faces desenhado uma ficha por vez, as da página aberta primeiro.

   Com isso, o TBT da barbearia caiu de 280 para 130 ms no perfil de computador.
3. **A página inteira existe sem WebGL e sem script:** na barbearia, o selo em traço (`.bb-reserva`), também durante a carga e na perda do contexto.
4. **Com movimento reduzido, o objeto fica parado.**
5. **O objeto é do ofício do cliente** e passa no teste do desconhecido ("o que alguém que não sabe diria que isto é?").

**Lições do 3D da barbearia** (03.10):
- **Estado único de rolagem.** A virada guardada por par de seções fazia a ficha seguinte aparecer de relance e a moeda dar meia-volta para trás em toda divisa. A página virou uma sequência contínua de faces, e a face só troca de perfil.
- **Resolução da tela, ajustada à taxa real.** A resolução da tela vai até 2× a do CSS, e o ajuste se mede contra 60 quadros por segundo: ele cai 15% se a tela perde quadros e volta a subir com folga. A versão anterior partia de 64% da resolução nativa no computador e de 31% no celular, e as fichas saíam borradas.
- **Células de 1.024 px** a partir de 1.024 px de largura.

O detalhe está em `14-funcionalidades/08-peca-assinatura.md`.

### 9.3 · Em observação, sem decisão

| Tecnologia | O problema que resolveria | O que falta |
|---|---|---|
| Banco de dados (o MySQL do plano Hostinger) | A Agenda e o formulário com histórico | Decidir a arquitetura da Agenda (`14-funcionalidades/`) |
| CMS (Pages CMS, Keystatic, Payload) | O cliente editar o próprio conteúdo sem desenvolvedor | Medir o custo na manutenção mensal e no peso (seção 8.2) |
| Transição entre documentos do navegador (`@view-transition`) | A troca de página sem script | Firefox sem suporte (Chrome 126+, Safari 18.2+) [V]; a do React saiu da base em 02.11.2026 (seção 3.7, regra 4) |
| GSAP, gratuito desde 2025 (inclusive SplitText e ScrollTrigger) | Coreografias que o CSS e o Motion não fazem bem | Um caso concreto; hoje, nenhum. A licença é proprietária e gratuita, e veda o uso em ferramentas que concorram com o construtor visual do Webflow, dono do GSAP [FU]: ler antes de adotar |
| A opção experimental `sri` do Next | Tirar o `'unsafe-inline'` do script na política de conteúdo | Experimentar e medir (`../qualidade/`) |
| WebGPU | 3D mais leve | Suporte amplo no celular; nenhum caso que o WebGL próprio não resolva |
| Rolagem com inércia (Lenis) | — | **Vedada** pela ata v3.0 (V) |
| `llms.txt` (na base desde 16.10.2026, como aposta de custo baixo) | Dar aos leitores de IA o resumo do site | O Google não o usa ("Google Search itself doesn't use them", nota de 15.06.2026) [V]; sem correlação com citações (SE Ranking, 15.10.2026) [FU]; o Lighthouse experimental (Agentic Browsing, 05.05.2026) só confere a presença. Falta medir, nos registros de acesso da Hostinger, quantos pedidos o `/llms.txt` do site do Atlas recebe, antes de afirmar qualquer efeito a um cliente (`21-busca-e-ias.md`, seção 7) |

### 9.4 · Recursos de movimento e 3D: custo e licença

Levantados no estudo do Awwwards de 07.10.2026 e revistos em 13.10.2026, no texto das licenças, pela pesquisa do catálogo de componentes (`../componentes/inventario/pacotes-de-efeito.md`, "Plataformas e licenças que pedem leitura"; `../componentes/inventario/conferencia-e-lacunas.md`, seção 1). Conferir no ato, antes de qualquer pedido de dependência:

| Recurso | Custo e licença | Situação no Atlas |
|---|---|---|
| GSAP | "100% free", inclusive SplitText, MorphSVG e ScrollSmoother. A licença é "Proprietary Free": veda construtores visuais concorrentes e permite o site pago uma vez pelo cliente ("If your client pays you a one-time fee to create the site/product, that's perfectly fine", conferido em 13.10.2026) [V]. O SplitText foi refeito 50% menor e legível por leitor de tela | Em observação (seção 9.3). No catálogo, é CONDICIONAL: entra no repositório do cliente, nunca no kit (`../componentes/README.md`, seção 3.3) |
| Lenis | Alguns KB | Vedada (ata v3.0, V) |
| three.js | ~178 KB comprimido | Fora (seção 1). As peças do catálogo sobre three (R3F, drei, model-viewer) são dependência nova e seguem esta seção 9 e as cinco condições do 3D (`09-movimento.md`, seção 7) |
| OGL | ~29 a 33 KB | Alternativa leve, se o motor próprio não bastar (`09-movimento.md`, seção 7) |
| Motion+ | US$ 399, uma vez. Os pacotes `motion-plus*` estão no npm sob MIT, mas o fabricante os vende como exclusivos de membros [V] | Sem caso. Fora sem a compra |
| Rive | O runtime (`@rive-app/*`) é MIT. No plano gratuito, a exportação toca a tela de abertura do Rive; Cadet US$ 9 e Voyager US$ 32 por usuário/mês. Os arquivos da comunidade são CC BY, com crédito obrigatório [V]. Arquivos de 10 a 15× menores que o JSON do Lottie sem compressão, pelos testes do próprio Rive | Sem caso. Os arquivos da comunidade ficam fora (o crédito) |
| Lottie e dotLottie | Os runtimes (`lottie-web`, `@lottiefiles/dotlottie-*`) são MIT, com o WASM hospedado junto. Os arquivos gratuitos do LottieFiles saem pela Lottie Simple License: uso comercial sem crédito, conferido arquivo a arquivo [V] | Sem caso |
| Spline | O runtime (`@splinetool/runtime`) não tem licença. O plano Free exporta com marca d'água; Hobby US$ 12–15/mês (sem marca d'água); Pro US$ 25–30 (exporta código). A cena vem do servidor deles, num pedido externo [V] | Fora (seção 1) |
| Unicorn Studio | O gratuito é só para uso não comercial; o uso comercial, só no plano Legend: US$ 20/mês ou US$ 168/ano. O SDK é proprietário [V] | Fora (seção 1) |
| Theatre.js | O núcleo (`@theatre/core`) é Apache-2.0. O estúdio é AGPL-3.0 e nunca vai ao pacote final. O repositório público está parado desde 08.2024 [V] | Sem caso |
| `shaders` (shaders.com) | MIT, com mais de 200 efeitos em WebGPU e reserva em WebGL; o editor é gratuito. Os presets "Pro" são pagos [V] | No catálogo, "Fundo vivo" [C] |
| Blender | Grátis | Modelagem da peça-assinatura (`14-funcionalidades/08-peca-assinatura.md`) |
| Poly Haven | Recursos CC0, livres para uso comercial | Texturas e ambientes da peça-assinatura |
| WebGPU | Ligado por padrão no Chrome para Android 121+ (Android 12+, GPUs Qualcomm e ARM) e no Safari 26 | Em observação (seção 9.3) |

---

## 10. Dependências

1. **Regra:** dependência nova no repositório só com **pedido explícito** do usuário, e com a razão em `decisoes.md`.
   - **Objetivo:** cada pacote é peso, superfície de ataque e manutenção.
   - **Exemplo:** o Playwright entrou no Atlas em 07.10 com a autorização do usuário, só como dependência de desenvolvimento, para a régua.
2. **Regra:** a árvore de produção sem vulnerabilidade conhecida (`npm audit --omit=dev`). Ferramenta de desenvolvimento fica em `devDependencies`.
   - **Exemplo:** o CLI do shadcn foi para `devDependencies` em 03.10. As 6 vulnerabilidades altas do `npm audit` do Atlas eram dele (`braces` ≤ 3.0.3, sem versão corrigida); a de produção ficou limpa. O CLI só serve o `@import "shadcn/tailwind.css"`, resolvido na compilação. Copiar esse CSS para o projeto (`shadcn eject`) e tirar o CLI é a opção mais limpa.
3. **Regra:** versão nova de pacote espera **7 dias** antes de entrar.
   - **Objetivo:** é a janela em que pacote comprometido costuma ser retirado.
   - **Como fazer:** o Dependabot com `cooldown` (`../qualidade/13-integracao-continua.md`); no npm 11.10 ou mais, `min-release-age=7` [FU]. A máquina do Atlas tem o npm 10.9.2 (08.10), que não tem a opção: até atualizar, vale só o Dependabot.
4. **Regra:** as ações de terceiros da integração contínua são fixadas pelo **commit** (SHA), não pela versão.
   - **Objetivo:** o comprometimento do `tj-actions/changed-files`, em março de 2025, entrou por uma versão móvel.
5. **Regra:** Next e React em versão **maior** só à mão, com a régua inteira e as telas comparadas. Versão menor e correção, pelo fluxo de atualização em ondas (`18-publicacao-e-manutencao.md`).
   - **Objetivo:** a versão maior muda o comportamento (o Next 16 tirou o `next lint` e a coluna de tamanho do build; a hidratação e as transições mudam), e só a régua inteira, com as telas comparadas, mostra o que mudou. A onda automática serve à correção, que não deveria mudar nada.
6. **Regra:** a versão do Node declarada no projeto (`"engines"` no `package.json` e um `.nvmrc`) e a mesma na Hostinger.
   - **Objetivo:** o Atlas não declara; o `@types/node` estava na 20 com o alvo em 22.
7. **Regra:** nenhum pacote "estranho" na árvore (`npm ls` sem *extraneous*) e nenhum `package.json` solto acima da aplicação.
   - **Objetivo:** o `package.json` e o `package-lock.json` da raiz do repositório do Atlas confundem o Turbopack sobre onde fica a aplicação, e obrigaram o `turbopack.root`.
   - **No Atlas, em 08.10.2026:** o `npm ls` acusa `@emnapi/runtime` e `@img/sharp-wasm32` como *extraneous*; o `package.json` e o lockfile da raiz entraram por engano no commit `7cf1e85` (auditoria técnica de 07.10.2026). PENDENTE lá.
8. **Regra:** pacote abaixo da versão 1.0 (no Atlas, o `cn`, 0.4.0) entra com a versão travada no lockfile e é relido a cada atualização.
   - **Objetivo:** abaixo de 1.0, a versão semântica não promete estabilidade: qualquer versão pode mudar a interface (semver, item 4).

---

## 11. Conferência rápida, num repositório novo

- [ ] `CLAUDE.md`, `briefing.md`, `identidade.md` e `decisoes.md` na raiz; `README.md` em cada pasta.
- [ ] Versões da seção 1; Node declarado; `npm audit --omit=dev` limpo.
- [ ] `next.config.ts` da seção 5, com o domínio do cliente; `poweredByHeader: false`.
- [ ] Standalone: `postbuild` presente; ou export: o `.htaccess` gerado (`18-publicacao-e-manutencao.md`).
- [ ] `layout.tsx` com `lang`, o script do `<head>`, `data-scroll-behavior`, o vínculo "Ir para o conteúdo".
- [ ] `error.tsx`, `global-error.tsx` e `not-found.tsx` em português.
- [ ] Metadados por página, canônico por página, cartão 1200 × 630, `sitemap.ts`, `robots.ts`, ícones, JSON-LD do site e do negócio, `llms.txt`; `node ferramentas/texto-do-robo.mjs` sem palavra colada (`21-busca-e-ias.md`, seção 11).
- [ ] Nenhum `"use client"` fora de `ilhas/` e `ui/`; nenhum `cn` no navegador; nenhum hexadecimal em componente; ilhas recebendo só o que usam.
- [ ] Nada gravado no aparelho; nenhum pedido externo (régua, bloco 5).
- [ ] `npm run build && npm start && npm run regua` aprovado (no estático, a pasta `out/` servida como na seção 4, e a régua com `--base`).

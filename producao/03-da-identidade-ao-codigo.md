# 03 · Da identidade ao código

> **Para que serve.** A esteira diz **o que** decidir na direção de arte (`producao/esteira/04` a `09`, `11`). Este documento diz **onde cada decisão entra no código** da base: tokens, escala, fontes, forma, ícone, gesto e movimento. Traz as ferramentas que conferem antes de construir. Com ele, a identidade aprovada vira código numa hora, sem reabrir decisão.
>
> **Quando ler.** Na etapa 4, depois de o `identidade.md` estar escrito, e antes de qualquer componente novo.
>
> **Atualizado em:** 08.10.2026.

---

## 1. A ordem

1. **O `identidade.md`, inteiro, antes do código:** briefing visual, adjetivos com consequência, cinco referências, plano de design, gesto, o teste do prompt parecido (`producao/esteira/04-direcao-de-arte.md`; `producao/esteira/11-anti-ia.md`, passo 3).
2. **Os tokens** em `app/identidade.css` e `npm run paleta` (seção 2).
3. **A escala** (seção 3).
4. **As fontes** (seção 4).
5. **A forma** (seção 5).
6. **O ícone** e os derivados (seção 6).
7. **O gesto e a camada de movimento do plano** (seção 7).
8. **A conferência visual:**
   - `npm run build`, e `npm run estatico` noutro terminal;
   - as capturas da página inicial a 1440 px (`ferramentas/fotografar.mjs`, seção 8; a ferramenta grava também as de 390 px, que só se julgam no passe do celular da construção: `producao/esteira/00-principios.md`, seção 5);
   - a aprovação.

Nenhum componente novo antes da aprovação. Quem aprova é Matheus Castro Oliveira de Luna Garcia ou outro sócio de desenvolvimento, nunca Gabriel Ribeiro Ota Yida sozinho (`producao/esteira/01-processo.md`, seção 1). A base de fábrica serve de bancada para os tokens: a identidade nova se vê nas páginas de exemplo antes de o conteúdo mudar. Ela não é o modelo da composição nem da interface, que saem do roteiro de cenas e do mundo da marca (`producao/esteira/19-o-padrao-atlas.md`, seções 3, 4 e 8.1).

## 2. Os tokens: `app/identidade.css`

**A estrutura** (a de fábrica é o exemplo resolvido):

| Bloco | O que tem | Regra |
|---|---|---|
| `@theme` | A escala (`--text-rotulo` a `--text-display`, cada um com `--line-height`), os raios (`--radius-cartao`, `--radius-marcacao`) e a largura da página (`--container-pagina`) | Os nomes não mudam: as páginas usam `text-display`, `rounded-cartao`, `max-w-pagina`. Mudam os valores |
| `:root` | As cores por função: `--background`, `--foreground`, `--card`, `--muted`, `--muted-foreground`, `--primary`, `--primary-foreground`, `--accent`, `--marcador`, `--border`, `--ring` | Nome de função, nunca de cor (`producao/esteira/06-cor-forma-e-superficie.md`, seção 1). Em OKLCH (seção 2 de lá). O contraste de cada par anotado ao lado |

**Do plano de design ao token.** O `identidade.md` nomeia de 4 a 6 cores pela função. A tradução:

| No `identidade.md` | Token | Onde aparece |
|---|---|---|
| O fundo | `--background` | A página; o `themeColor` do `app/layout.tsx` (em hexadecimal, convertido) |
| A tinta | `--foreground` | Todo texto principal |
| A superfície | `--card` e `--muted` | Cartões e tabela; rodapé e células |
| O texto secundário | `--muted-foreground` | Notas, pesos, durações |
| A cor da ação | `--primary` e `--primary-foreground` | O botão do WhatsApp; o ícone |
| O acento | `--accent` | Vínculos, a página atual no menu |
| A cor do gesto | `--marcador` | O marca-texto (Essencial) |
| A borda | `--border` (translúcida) | Divisões e contornos |
| O foco | `--ring` | O anel de foco, 3:1 no mínimo |

**Conferir antes de construir:** `npm run paleta` (`ferramentas/conferir-paleta.mjs`).
- **O que mede:** os 12 pares que a base usa, no canvas do Chrome, como a régua.
- **Os mínimos:** 4,5:1 para texto; 3:1 para o anel de foco.
- **Reprovou:** ajuste a luminosidade (o `L` do OKLCH), nunca o matiz que veio da referência.
- **Grave o valor medido** no comentário do token. Na base de fábrica, por exemplo, a tinta dá 14,6:1 sobre o fundo e o texto da ação, 7,6:1.

**Proibido:**
- hexadecimal em componente;
- token sem função;
- cor nova para "dar vida";
- degradê decorativo;
- sombra pesada (`producao/esteira/06-cor-forma-e-superficie.md`, seções 7 a 9).

A identidade pode pedir textura, degradê ou sombra própria. Nesse caso, a exceção vai para o `identidade.md` com o motivo, e o token novo entra com nome de função.

**Tom escuro.** A base é clara (`color-scheme: light`). Uma identidade escura troca os valores do `:root` e o `color-scheme` (em `app/globals.css`), e confere de novo pela paleta. A esteira não pede os dois tons por site (`producao/esteira/06-cor-forma-e-superficie.md`, seção 5).

## 3. A escala

**Sete degraus**, de nomes fixos: `text-rotulo`, `text-nota`, `text-corpo`, `text-destaque`, `text-numero`, `text-titulo` e `text-display`. Os tamanhos vêm de `producao/esteira/05-tipografia.md`, seção 6.

- **A postura** (seção 6.3 de lá):
  - **Exibição:** título grande, o display acima de 5 vezes o corpo na mesa. A base de fábrica dá 6,1, medido pela régua (`razaoDoTitulo`).
  - **Contenção:** marcas sóbrias, como advocacia e psicologia; o display mais perto de 3 vezes o corpo. Escolha pelo adjetivo do `identidade.md`.
- **As faixas fluidas** (`clamp`): a ponta menor vale a 320 px, e a maior, a ~1440 px. Confira o título mais longo do site a 320 px, sem quebrar palavra.
- **A entrelinha** é a de cada degrau (`--text-<degrau>--line-height`). Título com entrelinha 1 pede `text-wrap: balance`, que já está na base.

## 4. As fontes

1. **A escolha** é da identidade (`producao/esteira/05-tipografia.md`, seção 2.2):
   - no máximo duas famílias;
   - nenhuma por omissão (seção 2.3: Inter, Poppins e afins só se o briefing as escolher);
   - o ponto de partida do nicho (seção 2.4) é ponto de partida, não escolha.
2. **A licença** (seção 3 de lá):
   - **Google Fonts** (OFL, Apache, UFL): `baixar-fonte` traz a licença junto.
   - **Comercial:** a licença de web comprada em nome do cliente, registrada no `decisoes.md`. O arquivo vem do fornecedor em `.woff2`, com o recorte latino; se não vier recortado, recortar pede ferramenta nova, pela regra de tecnologia (`producao/esteira/13-tecnologia-e-estrutura.md`, seção 9).
3. **Baixar**, com o sandbox desligado:

   ```bash
   node ferramentas/baixar-fonte.mjs "Fredoka:wght@400..700" titulo
   node ferramentas/baixar-fonte.mjs "Nunito:wght@400..700" texto
   ```

   - Peça a faixa variável que cobre os pesos usados: a base desliga o peso sintetizado (`font-synthesis-weight: none`).
   - Itálico só se a identidade usa (`ital,wght@0,400..700;1,400..700`).
4. **`app/fontes.ts`:**
   - **O título:** `display: "swap"`. É a fonte que carrega a identidade.
   - **O texto:** `display: "optional"`. Sem troca tardia que refaça o leiaute.
   - **A reserva:** `fallback` só com nomes que não terminam em número, e a genérica no fim.
   - **Identidade de uma família só:** apague o `titulo` de `fontes.ts` e do `layout.tsx`. Os títulos usam a de texto (`--font-display` cai em `--font-texto`).
5. **O peso:** sem teto nos sites de marca desde 08.10.2026, à noite (`producao/esteira/15-desempenho.md`, seção 2.1): só os pesos que o desenho usa, com a reserva ajustada. A régua relata no bloco 5; a de fábrica pesa 67,2 KB.
6. **As licenças antigas:** apague as `OFL-*.txt` das famílias que saíram. O `npm run pronto` acusa fonte sem licença ao lado.

## 5. A forma

- **Cantos arredondados** por preferência do usuário (03.10.2026):
  - **Pílula na ação:** `rounded-full`.
  - **Cartões:** `--radius-cartao`.
  - **Marcação e células:** `--radius-marcacao`.

  Hierarquia, não um raio só para tudo (o "kit de cartões": `producao/esteira/11-anti-ia.md`).
- **Canto vivo por identidade:** só escrito no `identidade.md`, com a referência que o pede, e registrado no `decisoes.md` (`producao/esteira/06-cor-forma-e-superficie.md`, seção 6).
- **Espaço** na grade de 4 px, pelos utilitários do Tailwind, sem colchetes. O recuo lateral de página é o `envelope` (`app/globals.css`): 24 px, e 40 px a partir de 768 px, nunca menor que a área segura do celular com recorte. **Toda seção nova usa `envelope`,** e não `px-6`.

## 6. O ícone

1. **Desenhe o `app/icon.svg`:**
   - a partir do logotipo: o símbolo, se o logotipo tem um, redesenhado em `<path>` limpo, sem traçar à mão o que não está no arquivo; sem símbolo, a inicial do nome numa forma da identidade, como o "B" da base. Essa escolha vai para o `decisoes.md`;
   - simples a 16 px;
   - em `<path>`, porque o SVG da aba não carrega fonte;
   - com a variante escura em `@media (prefers-color-scheme: dark)`, dentro do próprio SVG;
   - com as cores em hexadecimal: a conversão dos tokens sai no navegador (`npm run paleta` mostra os pares; para o hexadecimal, o mesmo canvas).
2. **Gere os derivados:** `node ferramentas/gerar-icones.mjs` grava o `app/apple-icon.png` (180 px, quadrado cheio sobre o `--primary`) e o `app/favicon.ico` (32 px), em RGBA. O Turbopack recusa ICO com PNG em RGB.
3. **Confira o resultado:** o `npm run pronto` acusa o ícone de fábrica.

## 7. O gesto e a camada de movimento

A camada é a do plano (`producao/esteira/09-movimento.md`, seção 4). O gesto de um plano acima nunca desce.

| Plano | O que a base já tem | O que se acrescenta |
|---|---|---|
| **[E]** | A revelação, uma vez, só onde ela é o momento da cena, nunca em toda seção (`data-revela`; `producao/esteira/20-repeticao-dentro-do-site.md`), a troca de página (a entrada por CSS, `components/ilhas/entrada-da-pagina.tsx`), a página que abre no topo (`components/ilhas/ao-topo.tsx`) e o marca-texto (`.marca-texto`, numa palavra-chave do lide, nunca no título) | A cor do marca-texto (`--marcador`). Se a identidade pedir a tarja, `producao/gestos/` (`highlighted-text`) |
| **[P]** | O mesmo | A galeria de deslizar com o trilho; o vidro no cabeçalho; a aba atual; o estado ao vivo ("aberto agora"); os gestos de utilidade, copiar e espera, prontos em `producao/gestos/` (`producao/esteira/09-movimento.md`, seções 4 e 6.2) |
| **[C]** | O mesmo | A peça-assinatura (`producao/esteira/14-funcionalidades/08-peca-assinatura.md`); a onda, o brilho e a inclinação, prontos em `producao/gestos/`; o 3D nas cinco condições (`producao/esteira/09-movimento.md`, seção 7) |

**Em todo plano:** o ambiente da assinatura e as passivas, pausáveis e parados fora da tela, com a ilha de pausa de `producao/gestos/` (`producao/esteira/09-movimento.md`, seções 4 e 14).

**Os gestos do Spell UI já adaptados** (os seis do Atlas e a ilha de pausa) estão em `producao/gestos/`, com o CSS e a receita de instalação (`producao/gestos/README.md`): copiar, importar o `gestos.css`, usar. Um gesto **novo** do Spell UI segue `producao/esteira/09-movimento.md`, seção 6.3:
- `--dry-run` antes;
- mover para `components/ui/spell/`;
- sem `cn`, com os tokens e só `transform` e `opacity`;
- medir o script inicial.

**As peças de outras bibliotecas** (objetos com gesto, galeria, transição, fundo vivo, 3D, ícones) vêm do catálogo do kit (`producao/componentes/catalogo.md`), depois de escrito o mundo da marca. Para cada uma:
- a mecânica vem do catálogo, e a forma, do `identidade.md`;
- a licença se relê no dia;
- o aviso da licença vai ao lado do código;
- a peça se registra no `decisoes.md`.

Os passos estão em `producao/componentes/README.md`, seção 2, e a regra, em `producao/esteira/09-movimento.md`, seção 6.4.

O primeiro componente do shadcn num site pede o `components.json`: copie o de `producao/gestos/components.json` e rode o CLI na versão do Atlas, sem instalá-lo (`npx shadcn@4.21.0 add <nome> --dry-run`). shadcn/ui, Base UI e Motion são da pilha aprovada (ata v3.0, V): entram quando o plano pede, registrados no `decisoes.md`. **Nunca** rode `shadcn init --preset` nem `shadcn apply`: os dois reescrevem as cores e os componentes.

**Os tokens de duração** (`producao/esteira/09-movimento.md`, seção 2):
- toque: 120 ms;
- menu e diálogo: 300 ms;
- troca de página: 400 ms;
- entrada: até 600 ms, uma vez;
- com movimento reduzido, nada se desloca.

A base já segue a entrada da troca de página (400 ms, em 60 px, sem a saída nem o atraso da receita antiga; `producao/esteira/09-movimento.md`, seção 8) e a revelação em 500 ms.

## 8. A conferência visual

Com `npm run estatico` no ar, as capturas que a aprovação pede:

```bash
node ferramentas/fotografar.mjs
```

O comando grava as páginas inteiras a 390 e a 1440 px, com movimento reduzido, em `material/capturas/`, fora do git, e acrescenta uma 404.

**Olhe** antes de mostrar (`producao/esteira/11-anti-ia.md`, os sinais):
- **O título:** grande, sem destaque de palavra.
- **A primeira tela:** diz o que é e chama.
- **O kit de cartões:** nenhuma grade de cartões iguais.
- **A forma:** nenhum raio único para tudo.
- **O espaço:** nenhum vazio sem motivo na mesa. A base de fábrica tinha a metade direita vazia no início, e o resumo de preço por porte a ocupou.

## 9. O caso resolvido: o banho e tosa de fábrica

O `identidade.md` completo está em `producao/exemplo/identidade.md`. A tradução:

| Decisão | No código |
|---|---|
| Branco quente, tinta escura e o acento da cor das toalhas da casa | `--background: oklch(0.985 0.008 80)`, `--foreground: oklch(0.27 0.03 320)`, `--primary: oklch(0.46 0.15 352)` |
| Arredondado e amigável, sem infantilizar (nada de patinha, ossinho ou bolhas) | Fredoka nos títulos (OFL, 29 KB) e Nunito no texto (OFL, 38,2 KB); `--radius-cartao: 1.5rem`; ícone "B" de traço redondo |
| O gesto do Essencial numa palavra do corpo: "por porte" | `.marca-texto` no lide, na cor `--marcador`, 11,0:1 sob a tinta |
| A informação que decide, na primeira tela | O resumo do banho por porte ao lado do título; a tabela inteira em Serviços, com o porte na coluna |

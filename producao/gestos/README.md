# gestos/

Os gestos do Spell UI na adaptação do Atlas (`web/components/ui/spell/`), trazidos para o kit em 08.10.2026, para que um site de cliente não dependa do repositório do Atlas. Com eles vêm:
- a ilha de pausa do ambiente;
- o CSS;
- o `components.json`, para trazer outros componentes do shadcn.

A regra de uso está em `producao/esteira/09-movimento.md`, seção 6: o gesto entra como o gesto da marca, nunca como enfeite de catálogo; um por marca, com motivo, no ponto de decisão e nunca no título.

| Arquivo | Gesto | Plano | Servidor ou ilha |
|---|---|---|---|
| `components/ui/spell/highlighted-text.tsx` | O marca-texto (`marcador`) e a tarja | [E] | Servidor, só CSS |
| `components/ui/spell/copy-button.tsx` | Copiar, que só confirma se copiou; ícones em SVG próprio, sem o `lucide-react` | [P] | Ilha |
| `components/ui/spell/bars-spinner.tsx` | A espera (doze barras) | [P] | Servidor, só CSS |
| `components/ui/spell/gradient-wave-text.tsx` | A onda de cor, uma vez | [C] | Servidor, só CSS |
| `components/ui/spell/shimmer-text.tsx` | O brilho, ambiente contínuo (a cada 3 s) | [C] | Servidor, só CSS; precisa da ilha de pausa |
| `components/ui/spell/tilt-card.tsx` | A inclinação sob o ponteiro | [C] | Ilha |
| `components/ilhas/controle-do-movimento.tsx` | O botão de pausa do ambiente e o observador que liga o ambiente só na tela | [C] | Ilha |
| `app/gestos.css` | O desenho de todos, com as curvas da esteira e a pausa | — | — |
| `components/ui/spell/LICENCA-spell-ui.txt` | A licença MIT do Spell UI ("Copyright (c) 2025 Spell UI"), que vai junto de toda cópia (desde 13.10.2026; `../componentes/README.md`, seção 3) | — | — |
| `components.json` | A configuração do shadcn do Atlas (estilo `base-nova`, registro `@spell`) | — | — |

**A base já tem o marca-texto mais simples** (`.marca-texto`, em `app/globals.css` do site; no kit, `../base/app/globals.css`), que basta no Essencial. O `highlighted-text` serve quando a identidade pede a tarja, ou o marca-texto que passa ao entrar na tela.

## Como instalar num site

1. **Copie** só os do plano:
   - `components/ui/spell/<gesto>.tsx` para `components/ui/spell/` do site;
   - sempre, o `components/ui/spell/LICENCA-spell-ui.txt` junto: a licença MIT pede o aviso em toda cópia;
   - no Completo com o brilho, também `components/ilhas/controle-do-movimento.tsx`.
2. **Copie** `app/gestos.css` para `app/` e importe-o em `app/globals.css`, depois da identidade: `@import "./gestos.css";`. Apague do arquivo os blocos dos gestos que o site não usa.
3. **O ambiente** [C]:
   - ponha o `<ControleDoMovimento />` no cabeçalho, ao lado do menu;
   - toda peça de ambiente nova entra na lista de pausa, no fim do `gestos.css`.
4. **As cores** vêm dos tokens da identidade:
   - a tarja: `--primary` e `--primary-foreground`;
   - o marca-texto: `--marcador`;
   - a onda: `--primary`, `--accent` e `--muted-foreground`.

   Nenhum hexadecimal.
5. **Confira:**
   - `npm run build`;
   - a régua da página. Onde há cópia sobre o texto, ela avisa "conferir à mão", e é para conferir;
   - o script inicial, antes e depois (bloco 5);
   - a passagem do gesto: uma vez; ao recarregar; com movimento reduzido; no toque; fora da tela; pausado (`producao/esteira/09-movimento.md`, seção 6.1, regra 8).

**Verificado em 08.10.2026:**
- os sete componentes e o CSS compilam com a base (TypeScript estrito);
- numa página com os seis gestos e a pausa, a régua não acusou geometria, política de conteúdo nem contraste. Avisou o esperado: a pausa ausente no celular com movimento reduzido; as cópias decorativas a conferir à mão.

## Outros componentes do shadcn

**Peças de outros registros e bibliotecas** (Tactile UI, Motion Primitives, Cult UI e as demais, com a licença conferida): o catálogo de `../componentes/` e as regras dele. Esta pasta guarda só o que já foi adaptado e verificado; uma peça do catálogo só entra aqui se for LIBERADA (nunca CONDICIONAL) e depois de adaptada e medida (`../componentes/README.md`, seção 3.3).

shadcn/ui, Base UI e Motion são da pilha aprovada (ata v3.0, V; `producao/esteira/13-tecnologia-e-estrutura.md`, seção 1). Entram quando o plano pede, sem autorização nova, pela receita de `producao/esteira/09-movimento.md`, seção 6.3:
1. **Copie** `components.json` para a raiz do site.
2. **Rode o CLI** na versão do Atlas, sem instalá-lo: `npx shadcn@4.21.0 add <nome> --dry-run`, e depois sem o `--dry-run`. O CLI pede o `lib/utils.ts` (`cn`) para os componentes dele; o `cn` fica só no servidor (`producao/esteira/13-tecnologia-e-estrutura.md`, seção 3.4).
3. **Toda dependência que o componente puxar** (Base UI, `class-variance-authority`, `lucide-react`) entra no `package.json` e se registra no `decisoes.md`.
4. **Nunca** rode `shadcn init --preset` nem `shadcn apply`: os dois reescrevem as cores e os componentes.

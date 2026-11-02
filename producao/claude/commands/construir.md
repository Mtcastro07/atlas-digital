---
description: Etapa 6 — constrói as páginas do plano com a base, a identidade, as funcionalidades e o movimento do plano
---

Etapa 6 (`producao/04-construcao.md`; `producao/01-roteiro-da-sessao.md`, etapa 6).

1. As páginas:
   - as do `conteudo/ROTEIRO.md`, com a estrutura de `producao/esteira/nichos/<nicho>.md`, seção 4;
   - adapte as de fábrica (`app/page.tsx`, `app/servicos/`, `app/onde/`);
   - crie as novas pela receita "página nova" de `producao/04-construcao.md`;
   - apague a marca `[EXEMPLO]` das páginas reescritas.
2. As funcionalidades do plano (`producao/esteira/14-funcionalidades/`).
   - **Com formulário ou Agenda:**
     - a receita de `producao/modulos/README.md`;
     - as dependências dos módulos (`nodemailer` 10.0.13 e `mysql2` 3.24.5) entram no passo 1 da instalação, sem novo pedido: foram aprovadas pelo usuário em 08.10.2026 (`producao/modulos/README.md`, seção 3);
     - até o contrato de operador, que depende do CNPJ do Atlas, a coleta fica desligada (`producao/00-do-pedido-ao-site.md`, seção 4).
   - **Os gestos do plano:** `producao/gestos/` (copiar e espera [P]; onda, brilho e inclinação [C]; a pausa, em todo plano, com as passivas), com o `LICENCA-spell-ui.txt` junto.
   - **As peças de terceiros** escolhidas na identidade vêm de `producao/componentes/`, pelos passos da seção 2 do README:
     - a licença relida no dia, no commit copiado;
     - a origem conferida;
     - a adaptação ao mundo da marca e aos freios;
     - o `LICENCA-<origem>.txt` ao lado do código e a linha de origem no alto de cada arquivo;
     - o registro no `decisoes.md`.

     Pacote do npm fora da pilha pede autorização antes de instalar (`producao/esteira/13-tecnologia-e-estrutura.md`, seções 9 e 10).
   - **A funcionalidade do ofício e a peça-assinatura:** a especificação em `producao/esteira/14-funcionalidades/` e, para estudo, o código dos três sites de exemplo (`producao/referencias/README.md`, seção 2: o 3D, a cena de rolagem, o estado da loja, a calculadora, o talão).
3. As fotos:
   - `node ferramentas/preparar-fotos.mjs` (nunca a foto crua);
   - o `alt` em `conteudo/`.

   Falta foto: os substitutos de `producao/esteira/08-imagem-e-fotografia.md`, nunca banco de imagens nem IA.
4. O logotipo e o mapa do bairro: `producao/04-construcao.md`, seção 5 (`node ferramentas/gerar-mapa.mjs`).
5. O movimento e o acabamento: a camada do plano **inteira** (`producao/esteira/09-movimento.md`, seção 4) e os efeitos da identidade da tabela "O acabamento" do `identidade.md` (seção 12). O gesto do Spell UI vai uma vez, fora do título; com movimento reduzido, nada se desloca, e a matéria e a luz ficam na pose final. As passivas, em todo plano: duas ou mais por página, com a cobertura medida (`node ferramentas/regua/conferir-passivas.mjs`; `producao/esteira/09-movimento.md`, seção 14). A composição segue o nível Apple (`producao/esteira/19-o-padrao-atlas.md`, seção 4.2); dividida entre agentes, a construção segue a seção 8.8 de lá.
6. A cada página: `npm run build` sem erro, e conferir com o site servido em segundo plano (`node ferramentas/fotografar.mjs`).

**Tudo isso em dois passes, nesta ordem, cada um com foco total, nunca os dois juntos** (`producao/esteira/00-principios.md`, seção 5; o roteiro, etapa 6):
1. **O passe da mesa** (1440 px): os itens 1 a 6 acabados no computador, cena por cena, pelo roteiro de cenas do `identidade.md`; a página inicial da base é andaime, e nada da composição dela fica (`producao/esteira/19-o-padrao-atlas.md`, seção 8). O celular não se julga: o que é da mesa vai com o prefixo `lg:`. **Depois, as rodadas de lapidação** (no mínimo três; seção 8.4): capturas com o movimento normal, a vitrine ao lado, um agente novo como crítico de fora (seção 8.5), as dez maiores distâncias corrigidas, o registro em `registros/lapidacao.md`. Pare para a aprovação das capturas a 1440 px, com o teste da vitrine (`producao/esteira/00-principios.md`, seção 9), a régua sem falha na mesa e a avaliação anti-IA na mesa, com a contagem de cada efeito e de cada molde por página: nada em série (`producao/esteira/20-repeticao-dentro-do-site.md`, seção 3).
2. **O passe do celular** (390 px), só depois: a tabela "O premium no celular" do `identidade.md` (`producao/esteira/09-movimento.md`, seção 11) e as mesmas páginas, inteiras, no celular e no celular deitado, com a assinatura na primeira tela; e as rodadas de lapidação no celular, com o crítico de fora. Pare para a aprovação das capturas a 390 px, com o teste da vitrine no celular, a régua inteira e a avaliação anti-IA no celular, com a contagem da série a 390 px.

3. **O fechamento, com o Impeccable a 100%** (desde 16.10.2026, pedido do usuário), depois das duas aprovações e antes do commit:
   - o detector, a 1440 e a 390 px;
   - o `critique`, com as avaliações A e B isoladas em subagentes;
   - o `audit`;
   - o mapa do que converge, do que só um dos lados vê e do que se contradiz com o kit anti-IA;
   - as mudanças devidas;
   - o relatório **no chat** do que foi feito e descoberto.

   O passo a passo está em `producao/qualidade/15-revisao-do-impeccable.md`.

Registre no "Estado" do `CLAUDE.md` o passe em curso e cada porta aberta.

**Porta:** `npm run build` sem erro de tipo; as páginas do plano completas, com texto e fotos reais; as portas da mesa e do celular, nesta ordem.

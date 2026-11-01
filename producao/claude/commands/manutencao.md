---
description: Etapa 13 — uma mudança de manutenção (texto, preço, horário, foto), com a régua antes de ir ao ar
argument-hint: "<a mudança pedida>"
---

Etapa 13 (`producao/esteira/18-publicacao-e-manutencao.md`, manutenção). A mudança: $ARGUMENTS

1. **Classifique a mudança:**
   - **incluída na mensalidade:** texto, preço e horário (`producao/esteira/03-planos.md`, seção 2; `producao/esteira/18-publicacao-e-manutencao.md`, manutenção);
   - **fora dela:** foto nova, página, funcionalidade, módulo. Orça-se antes, e o valor de cada um é decisão dos sócios.
2. **Faça a mudança** em `conteudo/` (texto, preço, horário). A foto orçada e aprovada vai para `public/fotos/`, preparada por `ferramentas/preparar-fotos.mjs`:
   - preço novo leva o mês de referência;
   - horário muda no expediente;
   - os fechamentos vão em `fechamentos`;
   - mudou o conteúdo, `ultimaAlteracao` (`conteudo/negocio.ts`) passa à data do dia (`producao/esteira/21-busca-e-ias.md`, seção 3).
3. **Confira antes de publicar:** `npm test`, `npm run build`, `npm run pronto`, a régua. Toda mudança passa pela régua antes de ir ao ar.
4. **Registre** em `decisoes.md` e no "Estado".
5. **Publique** só com pedido explícito (`/publicar site`). Depois de no ar, o aviso ao IndexNow só das páginas que mudaram: `node ferramentas/avisar-indexnow.mjs --ensaio <páginas>` e, conferido, sem `--ensaio` (`producao/esteira/21-busca-e-ias.md`, seção 8).

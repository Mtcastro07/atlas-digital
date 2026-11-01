---
description: Etapa 5 — o roteiro de conteúdo e os textos em conteudo/, cada fato com origem no briefing
---

Etapa 5 (`producao/esteira/10-texto-e-conteudo.md`; `producao/01-roteiro-da-sessao.md`, etapa 5).

1. Preencha `conteudo/ROTEIRO.md`: as páginas do plano, com o limite de páginas do `CLAUDE.md`; o objetivo de cada uma; e cada fato com a sua origem no `briefing.md`.
2. Reescreva `conteudo/negocio.ts`, `conteudo/contato.ts`, `conteudo/site.ts` e `conteudo/legal.ts` a partir do roteiro:
   - **Registro:** impessoal, específico, sem superlativo sem prova.
   - **Vocabulário:** as palavras do dono onde servirem.
   - **Vedações:** as da etapa 3, aplicadas.
   - **Preço:** numa fonte só.
   - **Metadados:** por página (título "Página · Marca"; no início, "Marca · o que faz, onde").
   - **Marca de fábrica:** apague a marca `[EXEMPLO]` de cada arquivo que reescrever.
3. No `conteudo/legal.ts`:
   - os blocos do aviso de privacidade que valem para o site, com os de formulário e Agenda se houver módulo (`producao/modulos/README.md`);
   - a declaração de acessibilidade só com o que foi medido.
4. Rode `npm run pronto` e mostre ao usuário as falhas que ainda dependem do briefing.

**Porta:** nenhum fato sem origem no briefing; nenhum depoimento, número ou selo inventado.

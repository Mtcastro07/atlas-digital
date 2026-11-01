---
description: Etapa 3 — verificação normativa do nicho, na fonte primária, antes de qualquer texto
---

Etapa 3 do processo (`producao/esteira/01-processo.md`; `producao/01-roteiro-da-sessao.md`, etapa 3).

1. Leia `producao/esteira/nichos/<nicho>.md` (o nicho está no `CLAUDE.md` do projeto, na linha "Nicho"): a seção de normas e a de "No briefing, bloqueante neste nicho". Leia também `producao/esteira/17-conformidade-e-normas.md`.
2. Confira **cada** vedação e **cada** obrigação na fonte primária: o texto da resolução, do código de ética ou da lei, no site do conselho ou do Planalto. Nunca confie em resumo de terceiros. Registre o endereço e a data da consulta.
   - **O PDF da norma:** o Read do Claude Code abre sozinho o PDF de até dez páginas; acima disso, pede as páginas, e a paginação exige o `poppler` na máquina (`brew install poppler`; `producao/claude/ferramental.md`, seção 2).
   - **Site com o certificado quebrado:** em 08.10.2026, o sistema de atos do CFO (sistemas.cfo.org.br) falhou na cadeia do certificado (o `curl` deu o erro 60). Abra-o pelo navegador e guarde o arquivo baixado em `material/normas/`, com a data. Nunca desligue a conferência do certificado para enviar dado.
   - **O Planalto demora às vezes:** tente de novo antes de trocar de fonte, e nunca troque por imprensa setorial.
3. Preencha a tabela "Normas do conselho aplicadas" do `decisoes.md`:
   - a norma e o artigo;
   - o que o site precisa ter;
   - o que não pode ter;
   - a leitura (cautelosa, ou confirmada pelo advogado);
   - quem conferiu;
   - o endereço da fonte e a data da leitura.
4. Leitura que a fonte não resolve:
   - **Se o arquivo do nicho já traz a leitura cautelosa,** aplique-a e registre, sem parar. Exemplo: o valor sóbrio, só na página de valores, da nutrição e da psicologia.
   - **Se o nicho não resolve:** vale a leitura cautelosa, e a dúvida vai para Matheus Azevedo Abreu (parte legal).
   - **Se for central e sem leitura escrita** (preço, imagem de paciente, antes e depois): **pare** e pergunte.
   - **Saúde com a Agenda:** registre os dados mínimos e a base legal (`producao/esteira/14-funcionalidades/05-agenda.md`, seção 12). Na psicologia, a caixa de consentimento. Confirme com Matheus Azevedo Abreu antes da etapa 6.
5. Confira se o `briefing.md` tem os campos que a norma exige: o registro, o responsável técnico, o RQE. Campo ● vazio: pare e liste o que pedir.
6. **A lista de termos:** os cinco nichos regulados (odontologia, advocacia, medicina, psicologia, nutrição) já têm a sua em `ferramentas/verificar-termos.mjs`. Nos outros, ou se a leitura de hoje mudou algo, acrescente ou corrija ali a lista, pela norma lida. O `npm run termos` roda depois do build, na etapa 7.

**Porta:** nenhuma linha de texto do site antes desta lista.

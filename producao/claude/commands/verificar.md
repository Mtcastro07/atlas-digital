---
description: Etapa 7 — a porta do rascunho (os nove itens da qualidade), o pronto, os testes e o relatório de QA
---

Etapa 7 (`producao/qualidade/14-ciclo-de-qa.md`, seção 3; `producao/01-roteiro-da-sessao.md`, etapa 7). O sandbox fica desligado para o Chrome.

1. **Compile e sirva em segundo plano** (o servidor não retorna):
   - **Estático:** `npm run build`, depois `npm run estatico` em segundo plano.
   - **Servidor:** `npm run build`, depois `PORT=3100 npm run servidor` em segundo plano. O `server.js` não relê o build: pare e suba de novo a cada build. Para parar só o seu: `kill $(lsof -nP -tiTCP:3100 -sTCP:LISTEN)`, conferido antes.
2. **O cartão de compartilhamento.** Se a primeira tela mudou: `node ferramentas/capturar-compartilhamento.mjs` e compile de novo.
3. **Na primeira verificação do site:** o mapa do projeto e a matriz de risco (`producao/qualidade/00-entender-o-projeto.md`, seções 8 e 9).
4. **Os nove itens da porta** (a tabela do roteiro, etapa 7):
   1. a régua inteira, sem falha, cada aviso com decisão (`npm run regua -- --base=http://localhost:3100`), o celular deitado e a barreira do travamento no aparelho médio incluídos; e a régua dos quadros sem falha, em duas sessões separadas (`node ferramentas/regua/quadros.mjs --base=http://localhost:3100 --pagina=/ --pagina=<cada página>`; `producao/qualidade/02-regua.md`, seção 12, e `08-desempenho.md`, seção 11); e as passivas, com a cobertura medida (`node ferramentas/regua/conferir-passivas.mjs --base=http://localhost:3100 --pagina=<cada página>`) e nada mudando na pausa (`node producao/ferramentas/conferir-pausa.mjs http://localhost:3100 <cada página>`; `producao/esteira/09-movimento.md`, seção 14);
   2. a avaliação anti-IA, sem marca de peso alto, na mesa e no celular, com as duas portas da construção abertas (`node ferramentas/fotografar.mjs --movimento`; `producao/esteira/11-anti-ia.md`; `producao/esteira/00-principios.md`, seção 5); o teste da vitrine com o veredito, depois do crítico de fora; o teste da troca de pele (`--sem-pele`); a cor medida (`node ferramentas/medir-cor.mjs`); e `npm run unicidade` sem falha (`producao/esteira/19-o-padrao-atlas.md`, seções 3, 5, 7 e 8);
   3. a lista de 22 itens (`producao/qualidade/11-design-e-anti-ia.md`, seção 5);
   4. as normas do nicho no texto, frase a frase;
   5. a tabela de afirmações: todo número com fonte;
   6. a leitura em voz alta, que é de pessoa: fica "pendente", com o nome;
   7. [P][C] a funcionalidade do ofício de ponta a ponta, com e sem script;
   8. o roteiro de teclado e o roteiro curto do leitor de tela (`producao/qualidade/06-acessibilidade.md`, seções 4 e 5);
   9. o `noindex` do rascunho (etapa 8).
5. **E também:**
   - `npm test`;
   - `npm run pronto` (no exemplo, `npm run pronto -- --exemplo`);
   - `npm run termos`: zero falha, e cada aviso lido (`producao/qualidade/10-conteudo-normas-e-texto.md`, seção 3);
   - `npm audit --omit=dev`;
   - **as peças de terceiros:** cada uma com o `LICENCA-<origem>.txt` ao lado, a linha de origem no alto de cada arquivo e o registro no `decisoes.md`; nenhuma CONDICIONAL fora do repositório do cliente (`producao/qualidade/09-seguranca-e-privacidade.md`, seção 7; `producao/componentes/README.md`, seção 3);
   - a revisão de sentido: erro de domínio, erro estético, ferramenta magra, o teste do desconhecido.
6. **O relatório:** `registros/relatorio-de-qa--rascunho--<aaaa-mm-dd>.md` (modelo: `producao/qualidade/modelos/relatorio-de-qa.md`; gabarito: `producao/exemplo/`), com as medidas e as pendências de pessoa.

**Porta:** os itens que bloqueiam, verdes. Sem isso, o rascunho não sai.

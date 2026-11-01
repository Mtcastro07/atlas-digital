# O exemplo resolvido

O site de exemplo que a base de produção (`../base/`) contém, documentado como se tivesse passado pelo processo inteiro: um banho e tosa fictício no Fonseca, Niterói, plano Essencial, sem módulo. Serve de gabarito: cada documento mostra um modelo da esteira preenchido, e o código da base mostra o resultado.

| Arquivo | O que é | O modelo de origem |
|---|---|---|
| `ordem.json` | A ordem de produção | `../02-ordem-de-producao.md` |
| `briefing.md` | O briefing, **fictício** | `producao/esteira/modelos/briefing.md` |
| `identidade.md` | A direção de arte: briefing visual, adjetivos, referências, paleta com contraste medido, tipos, leiaute em ASCII, forma, movimento, testes | `producao/esteira/modelos/identidade.md` |
| `decisoes.md` | As normas aplicadas e o registro de decisões | `producao/esteira/modelos/decisoes.md` |
| `ROTEIRO.md` | O roteiro de conteúdo, cada fato com a fonte | `producao/esteira/modelos/conteudo.md` |
| `relatorio-de-qa--rascunho--2026-10-08.md` | O relatório de QA da porta do rascunho, com as medidas reais | `producao/qualidade/modelos/relatorio-de-qa.md` |

**Como reproduzir** (verificado em 08.10.2026):
1. Monte o site:
   - **num projeto vazio** com a pasta `producao/`: `node producao/ferramentas/novo-site.mjs producao/exemplo/ordem.json --briefing=producao/exemplo/briefing.md`, que monta o site ali mesmo;
   - **no repositório do Atlas:** o mesmo comando com `--destino=<pasta>`, com o sandbox desligado (a pasta fica fora da sessão).

   O domínio sai `pet-shop.agenciaatlasdigital.com`, o da vitrine.
2. Copie `identidade.md` e `decisoes.md` para a raiz do site, e `ROTEIRO.md` para `conteudo/ROTEIRO.md`.
3. Apague a primeira linha (a marca `[EXEMPLO]`) dos nove arquivos de fábrica: aqui, o conteúdo já é o do exemplo.
4. `npm ci`, `npm test`, `npm run build`, `npm run estatico`, `npm run regua -- --base=http://localhost:3100` e `npm run pronto -- --exemplo`.

O resultado: régua APROVA, com 0 falha e 2 avisos esperados; `pronto` APROVA.

**Para que não serve.** Este exemplo não é ponto de partida de identidade para outro pet shop: cada cliente tem a sua direção de arte (`producao/esteira/04-direcao-de-arte.md`). O mesmo nicho com a mesma cara é a marca de template que a avaliação anti-IA reprova.

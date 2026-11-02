# Qualidade · como provar que um site do Atlas está certo

> **O que é.** O manual de garantia de qualidade dos sites do Atlas — o próprio, os de exemplo e os de cliente. Cobre:
> - como **entender** um projeto antes de testá-lo;
> - a **metodologia** de testes;
> - a **régua** que já existe;
> - as camadas de teste planejadas: estática, unidade, ponta a ponta, acessibilidade, regressão visual, desempenho, segurança e conteúdo;
> - como a **qualidade de design** e a **avaliação anti-IA** viram portas;
> - como **atacar falhas de propósito**;
> - a **integração contínua**;
> - **quando rodar o quê**.
>
> Foi escrito para ser copiado junto com `../esteira/` para um repositório novo e lido pelo Claude Code: cada prática diz **o que fazer, como fazer, como conferir e por quê**.
>
> **Na produção (desde 08.10.2026).** A pasta `../` aplica esta qualidade em todo site novo:
> - a régua chega portada ao repositório do cliente (`../ferramentas/portar-regua.mjs`);
> - o site estático se mede com `npm run estatico`;
> - os testes de unidade rodam no `node:test` (`04-unidade.md`, seção 1);
> - o `npm run pronto` confere o que a régua não vê: o dado de exemplo esquecido, os campos ● do briefing, o CNPJ, as fotos com metadados.
>
> **Origem.** Escrito em 08.10.2026, a pedido do usuário ("crie uma outra pasta, focada em quality assurance, introduzindo metodologia de testes, como que se deve entender o projeto e atacar possíveis falhas e afins"). Substitui `documentacao/atlas--garantia-de-qualidade.md` (07.10.2026, no repositório do Atlas). Reúne:
> - a pesquisa de QA de 07 e 08.10.2026: ferramentas, versões, custos, armadilhas;
> - a construção e a calibração da régua do Next.js (07 e 08.10);
> - a revisão de qualidade de 03.10, com as 52 capturas comparadas pixel a pixel;
> - as medições de desempenho de 30.09 a 08.10;
> - todos os defeitos que o projeto já teve, cada um com a causa e a regra que deixou (`12-ataque-a-falhas.md`).
>
> **Estado.** A régua (`02-regua.md`) **existe e está em uso** desde 07.10.2026. Todo o resto — lint, testes de unidade e de ponta a ponta, acessibilidade automatizada, regressão visual, Lighthouse em CI, integração contínua, ganchos — foi estudado e documentado e é **RATIFICADO como plano** em 08.10.2026, com a ordem de adoção de `13-integracao-continua.md`, seção 9. **Não está implantado:** o usuário pediu, em 07.10, "apenas busque entender, sem colocar nada na prática, ainda", e a ratificação aprovou o plano, sem pedir a implantação. As exceções: os testes de unidade, que existem no `node:test` (`04-unidade.md`), e os dos módulos.

---

## 1. Como esta pasta se liga à esteira

| A esteira (`../esteira/`) diz | A qualidade (esta pasta) diz |
|---|---|
| Como fazer o site: plano, nicho, design, funcionalidade, tecnologia | Como provar que ele foi feito certo |
| Os orçamentos de peso (`../esteira/15-desempenho.md`) | Como medir sem se enganar (`08-desempenho.md`) |
| As regras de acessibilidade (`../esteira/16-acessibilidade.md`) | Como verificá-las, com máquina e com leitor de tela (`06-acessibilidade.md`) |
| O método anti-IA (`../esteira/11-anti-ia.md`) | Quando ele é porta e quem decide (`11-design-e-anti-ia.md`) |
| As normas dos conselhos (`../esteira/nichos/`, `../esteira/17-conformidade-e-normas.md`) | O léxico de termos vedados e a leitura humana (`10-conteudo-normas-e-texto.md`) |
| O processo e as portas (`../esteira/01-processo.md`) | O que precisa estar verde em cada porta (`14-ciclo-de-qa.md`) |

**Regra de convivência.** Quando um documento da esteira e um desta pasta parecerem divergir num **número** (um teto, um prazo), vale o da esteira e corrige-se este. Quando divergirem num **método de medir**, vale o desta pasta e corrige-se a esteira. **Objetivo:** cada assunto tem um dono; a divergência é tratada como defeito de documentação, não como escolha.

---

## 2. Ordem de leitura

1. `00-entender-o-projeto.md`: antes de testar, saber o que o site é, para quem, com que plano e nicho, e o que pode dar errado.
2. `01-metodologia.md`: a estratégia, a severidade, o ciclo de defeito e o que a automação não pega.
3. `02-regua.md`: a verificação que já existe e roda hoje.
4. As camadas: `03-estatica.md`, `04-unidade.md`, `05-ponta-a-ponta.md`, `06-acessibilidade.md`, `07-regressao-visual.md`, `08-desempenho.md`, `09-seguranca-e-privacidade.md`, `10-conteudo-normas-e-texto.md`.
5. `11-design-e-anti-ia.md`: a qualidade que nenhuma máquina mede sozinha.
6. `12-ataque-a-falhas.md`: como caçar defeito de propósito, com o histórico de defeitos do projeto.
7. `13-integracao-continua.md`: como tudo vira porta antes do ar.
8. `14-ciclo-de-qa.md`: quando rodar o quê, do rascunho ao fim do contrato.
9. `15-revisao-do-impeccable.md`: a última porta de cada site. O Impeccable roda a 100%, o resultado é comparado com o kit anti-IA, as mudanças são feitas e o relatório vai ao chat (16.10.2026).
10. `modelos/`: os formulários para registrar defeito, exploração, risco, publicação e relatório.

**Por situação:**

| Situação | Leia primeiro |
|---|---|
| Projeto novo, antes do rascunho de 24 horas | `00`, `02`, `11`, `14` (seção 3) |
| Antes da publicação | `14` (seção 5), `modelos/checklist-de-publicacao.md` |
| Um defeito apareceu | `01` (seção 9, o ciclo de um defeito; seção 5, antes de acusar, verificar o instrumento), `12` (o histórico: talvez já tenha acontecido), `modelos/relatorio-de-defeito.md` |
| Adotar a esteira de testes | `13` (seção 9, a ordem de adoção), depois a camada da vez |
| Manutenção mensal | `14` (seção 7) |
| Atualização de segurança em vários sites | `14` (seção 8), `09` |

---

## 3. As camadas, num quadro

| Camada | O que pega | Ferramenta | Custo de rodar | Hoje | Bloqueia? |
|---|---|---|---|---|---|
| **Entendimento** | Testar a coisa errada | Leitura, mapa do projeto, matriz de risco (`00`) | Horas, uma vez por projeto | Prática manual | — |
| **Régua** | Geometria, degradação, semântica, contraste, teclado, orçamento, composição, paridade, conformidade, registro verbal (`02`) | Playwright no Chrome instalado | ~5 min em 23 páginas; ~1,5 min na rápida | **Em uso** desde 07.10.2026 | Falha, sim (código de saída 1); aviso, não |
| **Estática** | Tipos, vínculo interno errado, regras da casa, CSS proibido (`03`) | `tsc`, ESLint 10, Prettier, script sobre o CSS compilado | Segundos | Só o `tsc` no build | Sim |
| **Unidade** | Conta errada, lógica de horário, preço, codificação (`04`) | `node:test` | Segundos | Nada | Sim |
| **Ponta a ponta** | Fluxo quebrado, erro de console, política de conteúdo violada, pedido externo, gravação no aparelho (`05`) | Playwright Test contra o `server.js` standalone | 8–10 min | Scripts soltos em `.playwright-mcp/` (fora do git) | Sim |
| **Acessibilidade** | WCAG 2.2 AA automatizável, teclado, leitor de tela (`06`) | `@axe-core/playwright`, testes de teclado, roteiro manual | Minutos; o manual, ~1 h por site | A régua mede contraste e teclado; axe e leitor de tela, não | Sim (o automatizável) |
| **Regressão visual** | Mudança de tela que ninguém pediu (`07`) | `toHaveScreenshot` no contêiner fixo | ~3 min | Método manual de 03.10 (52 capturas) | Sim, depois de calibrada |
| **Desempenho** | O travamento, o ritmo dos quadros, o peso e o tempo (`08`) | A régua (a barreira do travamento e os bytes), a régua dos quadros e o Lighthouse 13 (diagnóstico) | Junto da régua; a dos quadros, ~30 a 50 min por sessão; o Lighthouse, ~10 min | Lighthouse manual | Nos sites de marca, a barreira do travamento e o ritmo dos quadros (desde 28.10.2026); no Atlas, também os bytes e a regressão relativa |
| **Segurança e privacidade** | Dependência vulnerável, cabeçalho faltando, entrada malformada, abuso de formulário (`09`) | `npm audit`, teste de cabeçalhos, testes de entrada | Segundos a minutos | `npm audit` manual | Sim |
| **Conteúdo, normas e texto** | h1, metadados, `noindex`, termos vedados pelo conselho, registro verbal (`10`) | Script sobre o HTML pré-renderizado, léxico, leitura humana | Segundos; a leitura, ~30 min | A régua cobre parte; o léxico, não | A lista legal, sim; o registro, aviso |
| **Design e anti-IA** | Cara de gerado, identidade fraca, falta de unicidade (`11`) | Avaliação anti-IA, lista de 22 itens, teste de unicidade | ~1–2 h por site | Método registrado; a linha de base de 07.10 | Sim, por decisão humana registrada |

---

## 4. Papéis

| Quem | O que roda | Por quê |
|---|---|---|
| **O Claude Code**, ao construir | A régua nas páginas tocadas (`--pagina`, `--rapida`) a cada mudança de interface; a régua inteira antes de dizer "pronto"; a avaliação anti-IA no fim de cada passe de design | Quem constrói prova o que construiu; o usuário não pode ser o primeiro a ver o defeito |
| **Matheus Castro Oliveira de Luna Garcia** (desenvolvimento, CTO a ratificar) | Revê a avaliação anti-IA e o relatório da régua; decide falha × aviso; faz o roteiro do leitor de tela antes da publicação | A decisão de design e a leitura humana são de pessoa |
| **Matheus Azevedo Abreu** (parte legal) | Confere a porta de conformidade: aviso de privacidade, registro do conselho, contrato de operador | É a parte legal da sociedade (ata v3.0, I.1) |
| **Gabriel Ribeiro Ota Yida** (vendas e briefing) | Confere se o briefing foi atendido: os campos, o tom, o que o cliente pediu | Foi ele quem ouviu o cliente |
| **O cliente** | O aceite do rascunho e da versão publicada | O site é dele |

*Fonte das funções: ata v3.0, I.1 e I.3. Todos os sócios podem atuar no desenvolvimento.*

---

## 5. Convenções

As mesmas de `../esteira/README.md`, seção 3:
- **Planos:** [E], [P], [C], [todos], e [ex] e [cli] para site de exemplo e de cliente.
- **Evidência:** [V], [FU], [NV], [DIV].
- **Estado:** RATIFICADO, DECIDIDO, DECIDIDO · A RATIFICAR, PROPOSTA, A CONFIRMAR (`../esteira/README.md`, seção 3).
- **Forma de cada prática:** Regra · Objetivo · Como fazer · Como conferir · Varia por.

**Específicas desta pasta:**
- **Falha × aviso.** Falha é defeito: impede a passagem. Aviso é medida para olhar: quem revisa decide e registra a decisão. Uma verificação só vira falha depois de provar que não acusa o que não é defeito (`01-metodologia.md`, seção 4).
- **Caminhos do repositório do Atlas.** Onde se diz "no repositório do Atlas" (`web/ferramentas/regua/`, `.playwright-mcp/`), o arquivo não existe no repositório novo. O código necessário está copiado no próprio documento, ou o documento diz como copiá-lo.
- **Versões e preços** valem para outubro de 2026 e trazem a marca de evidência. Conferir antes de adotar: ferramenta e preço mudam (`13-integracao-continua.md`).

---

## 6. Mapa da pasta

| Arquivo | Do que trata |
|---|---|
| `00-entender-o-projeto.md` | O que ler, o que mapear e a matriz de risco, antes de testar |
| `01-metodologia.md` | Estratégia por risco, camadas, porta determinística, exploração, oráculos, severidade, ciclo de defeito |
| `02-regua.md` | A régua: blocos, limites, calibração, resultados, como portar para um repositório novo; a régua dos quadros (seção 12) e a conferência das passivas |
| `03-estatica.md` | Tipos, ESLint 10 com as regras da casa, Prettier, verificação do CSS compilado |
| `04-unidade.md` | O `node:test`: o que testar e como, com exemplos; quando o Vitest |
| `05-ponta-a-ponta.md` | Playwright Test: configuração, fixture de vigia, fluxos nomeados |
| `06-acessibilidade.md` | axe, teclado, leitor de tela, zoom, espaçamento de texto, cores forçadas |
| `07-regressao-visual.md` | Capturas comparadas: máscaras, contêiner fixo, tolerância, revisão |
| `08-desempenho.md` | A barreira do travamento e o ritmo dos quadros como portas; a régua dos quadros sem se enganar (seção 11); Lighthouse sem se enganar; no Atlas, bytes e regressão relativa |
| `09-seguranca-e-privacidade.md` | Dependências, cabeçalhos, entradas malformadas, formulário, painel, cron |
| `10-conteudo-normas-e-texto.md` | Metadados, `noindex`, léxico de termos vedados, registro verbal |
| `11-design-e-anti-ia.md` | A avaliação anti-IA como porta; os 22 itens; o teste de unicidade |
| `12-ataque-a-falhas.md` | Caçar falhas por categoria; o histórico de defeitos do projeto |
| `13-integracao-continua.md` | GitHub Actions, ramo `producao`, ganchos locais e do Claude Code, dependências, ordem de adoção |
| `14-ciclo-de-qa.md` | Quando rodar o quê; o aceite por plano; quem assina |
| `15-revisao-do-impeccable.md` | O fechamento de cada site: o Impeccable a 100%, o mapa de convergência com o kit anti-IA, as mudanças e o relatório no chat |
| `modelos/` | Relatório de defeito, carta de exploração, matriz de risco, checklist de publicação, relatório de QA |

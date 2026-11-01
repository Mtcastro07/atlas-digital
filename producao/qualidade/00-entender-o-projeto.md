# 00 · Entender o projeto antes de testar

> **Para que serve.** Testar o que importa, não o que é fácil. Antes da primeira verificação, quem testa precisa saber o que o site é, para quem, em que plano e nicho, o que ele faz com dados, o que a norma do conselho exige e o que pode dar errado. Este documento diz o que ler, o que mapear e como montar a matriz de risco.
>
> **Quando ler.** No começo de todo projeto — de cliente ou de exemplo — e de novo quando o escopo muda (um módulo novo, uma página a mais, uma funcionalidade sob medida).
>
> **Depende de.** `../esteira/01-processo.md` (as etapas), `../esteira/03-planos.md` (o plano), `../esteira/nichos/<nicho>.md` (o nicho).

---

## 1. O princípio

**Regra.** Ninguém testa um projeto que não entendeu. O entendimento é registrado num mapa do projeto (seção 9) antes do primeiro teste.

**Objetivo.** Os testes do Atlas são escolhidos por risco (`01-metodologia.md`). Sem saber o que o site faz e o que a norma exige, testa-se o que dá para testar, não o que pode doer: o contraste do rodapé recebe atenção e o CRECI a 25% passa sem conferência. O histórico do projeto mostra que os defeitos mais caros vieram de onde ninguém olhava:
- a âncora malformada que derrubava a página inteira;
- os arquivos de `public/` que davam 404 só no modo em que a Hostinger roda o site;
- os sites de exemplo sem marcação de compartilhamento, num negócio que vende pelo WhatsApp.

**Como conferir.** O mapa do projeto existe, está datado e responde às perguntas da seção 9.

---

## 2. O que ler, e o que tirar de cada documento

| Documento (no repositório do cliente) | O que tirar dele para os testes | Por quê |
|---|---|---|
| `CLAUDE.md` | Cliente, nicho, plano, módulos; as regras locais; o que não alterar | O plano diz o que **deve** existir e o que **não pode** existir (uma galeria no Essencial é defeito de escopo) |
| `briefing.md` | Os campos obrigatórios (razão social, CNPJ quando houver, endereço, telefone, horário, registro profissional, serviços, o que o negócio não faz, **prazo de resposta**); o material visual; a postura tipográfica; se coleta dados | Cada campo do briefing é um oráculo: o site precisa mostrar o que o briefing diz, do jeito que o briefing diz |
| `identidade.md` | A paleta com os contrastes anotados, as fontes e as licenças, a forma (cantos), o gesto da marca, o que é proibido | A régua mede contraste; a identidade diz qual contraste se esperava e onde fica o gesto, que é a exceção legítima aos avisos |
| `decisoes.md` do cliente | O que foi pedido e aceito fora do padrão | Uma decisão registrada transforma uma "falha" em escolha; sem o registro, o teste acusa e alguém "conserta" o que o cliente pediu |
| `../esteira/03-planos.md`, seção do plano | Páginas, funcionalidades, movimento e gestos permitidos | O gesto de um degrau acima é defeito de escopo: apaga a diferença entre os planos |
| `../esteira/nichos/<nicho>.md` | O conselho, o que é vedado (preço, antes e depois, depoimento, resultado), o que é obrigatório mostrar (CRM, CRN, CRP, CRO, OAB, CRECI, responsável técnico), a estrutura de páginas, as funcionalidades do ofício | Defeito normativo é o mais caro: atinge o registro profissional do cliente |
| `../esteira/17-conformidade-e-normas.md` | Coleta de dados, cookies, imagem, crédito, a porta de publicação | Define o que precisa estar verde antes do ar |

**Como fazer.** Leia na ordem da tabela. Para cada linha, anote no mapa do projeto (seção 9) o que serve de oráculo: o que o site precisa mostrar, o que ele não pode mostrar, o que ele faz.

**Varia por.**
- **Site de exemplo [ex]:** não há briefing de cliente real. O oráculo é o documento do nicho e o plano de referência dele.
- **Obrigatórios do exemplo:** o selo de ficção e o `noindex`.

**O caso do repositório do Atlas, como foi lido em 07.10.2026** (o mapa de pastas que a primeira leitura montou):

| Pasta | O que é | Como se usa |
|---|---|---|
| `juridico/` | A ata v3.0, vigente e a ratificar; erra no MEI, baixado em 31.07.2026 | Só leitura |
| `contextos/` (00 a 04) | Produto, nichos, sociedade e comercial; vigentes de 30.09.2026 | O contexto de cada conversa |
| `documentacao/` | A ESTEIRA v2.1 (hoje superada pela esteira v3), a especificação do `web/`, a conformidade e o registro de decisões | A especificação e as decisões |
| `nichos/analises/` | As onze análises de nicho, com 46 sites medidos, reconstituídas depois da perda de 11.09.2026 | As medições de referência |
| `demos/` e `nichos/*.zip` | O gerador em Python e os doze demos estáticos; nenhum foi publicado | Registro; a pilha própria |
| `web/` | O site do Atlas (sete páginas) e os três sites de exemplo (16 endereços); ainda não publicado | O código de referência |
| `historico/` e `rascunhos/` | Versões antigas e pacotes descartados | Só registro: não usar como vigente |

---

## 3. Mapear as rotas

**Regra.** Todo endereço que o site serve entra numa tabela de rotas: o caminho, o tipo, o h1 esperado, as ilhas da página e se está no mapa do site.

**Objetivo.** A régua e os testes só cobrem o que alguém listou. Os sites de exemplo ficam **fora** do `sitemap.xml` (são `noindex`): uma lista feita só pelo mapa do site esquece 16 das 23 páginas do repositório do Atlas. As páginas de sistema — a 404, a de erro, a de erro global — não têm vínculo nenhum e só aparecem quando algo dá errado. É justamente quando precisam funcionar.

**Como fazer.**
1. **O mapa do site:** `curl -s http://localhost:3000/sitemap.xml`. Cada `<loc>` traz o domínio de produção: use só o caminho.
2. **Os vínculos internos, a partir de cada página:** é o que a régua faz (`02-regua.md`, seção 3). Comando de conferência:

   ```bash
   # Lista os caminhos internos citados no HTML do início (rode para cada página nova encontrada).
   curl -s http://localhost:3000/ | grep -o 'href="/[^"#?]*' | sort -u
   ```

3. **As páginas de sistema:** `/rota-que-nao-existe` deve responder **404**, com a página própria em português. Para os arquivos de erro, confira se `app/error.tsx` e `app/global-error.tsx` existem.
4. **Os arquivos públicos:** `robots.txt`, `sitemap.xml`, os ícones, a imagem de compartilhamento de cada página e as imagens de `public/`. Cada um deve responder 200 no modo em que o site vai rodar (`05-ponta-a-ponta.md`, seção 2: o standalone).

**Como conferir.** O número de páginas da tabela bate com o que a régua descobre sozinha (a linha "Régua · … · N página(s)" do relatório).

**Tabela de rotas** (exemplo, do repositório do Atlas em 08.10.2026):

| Caminho | Tipo | No mapa? | h1 esperado | Ilhas na página |
|---|---|---|---|---|
| `/` | Início | Sim | "Sua empresa online em 24h" | Cabeçalho retrátil, pausa do movimento, menu, montador, pilha de passos |
| `/planos` | Interna | Sim | "Três degraus." | Simulador (painel sob demanda), inclinação das prévias, cabeçalho retrátil |
| `/demos/barbearia` | Exemplo [C] | Não (`noindex`) | "Trinta anos na mesma esquina." | Barra da barbearia, palco 3D, cenas de rolagem, pausa |
| `/rota-que-nao-existe` | Sistema | Não | "Esta página não existe." | — |

---

## 4. Mapear as ilhas (o que tem estado e script)

**Regra.** Toda ilha (`"use client"`) entra numa tabela: o que ela guarda de estado, o que escuta, o que escreve (DOM, estilo, área de transferência), se carrega na entrada ou sob demanda, e o que acontece sem script.

**Objetivo.** No Atlas, o servidor desenha o HTML e só as ilhas têm script. Quase todo defeito de interação, de desempenho e de degradação nasce numa ilha:
- **Script que mexia no estilo a cada quadro:** a primeira versão da onda do Spell UI custou 0,26 s de LCP (de 2,07 para 2,33 s de mediana).
- **Efeito que procurava elementos só na carga:** o globo não girava depois da navegação interna.
- **Ilha que recebia o objeto inteiro do site:** ~11 KB serializados por página no depósito, até 03.10.

Sabendo onde estão as ilhas, sabe-se onde atacar.

**Como fazer.**

```bash
# Todas as ilhas (no repositório do Atlas, todas ficam em components/ilhas/ e components/ui/,
# mais app/error.tsx e app/global-error.tsx, que o Next exige como componentes de cliente).
grep -rl '"use client"' app components | sort
```

Para cada ilha, anote:

| Pergunta | Por que importa |
|---|---|
| Carrega na entrada ou sob demanda (`import()` no primeiro sinal de intenção)? | Entrada pesa no script inicial e no TBT; sob demanda pesa no primeiro toque |
| Escreve estilo a cada quadro (rAF, `style.setProperty`)? | Repinta; com CPU 20×, vira tarefa longa. Regra: só `transform` e `opacity`, uma escrita por quadro |
| Lê a posição da rolagem ou faz `elementsFromPoint` ao rolar? | Custa no toque; o cabeçalho retrátil faz 13 consultas a cada ~80 ms ao rolar (candidato a `IntersectionObserver`) |
| Procura elementos no documento (`querySelectorAll`) só na carga? | Depois da navegação interna, a página nova não é vista (o defeito do globo) |
| O que acontece sem script? | O conteúdo e a navegação precisam existir sem ela (régua, bloco 2) |
| Respeita movimento reduzido? E de forma reativa, ou lê `matchMedia` uma vez? | Ler uma vez ignora a mudança da preferência com a página aberta |
| Grava algo no aparelho? | Proibido: nenhum cookie nem armazenamento, salvo a sessão do painel da Agenda na área restrita |

**Como conferir.** Toda ilha da lista do `grep` tem uma linha na tabela; nenhuma linha fica com "não sei".

---

## 5. Mapear os fluxos de dado

**Regra.** Todo dado que entra, sai ou é guardado tem um fluxo desenhado: de onde vem, por onde passa, onde fica, por quanto tempo, quem vê.

**Objetivo.** A LGPD e a promessa de privacidade do Atlas ("nenhum cookie, nenhum rastreador, nada gravado no aparelho") são verificáveis só se o fluxo for conhecido. No Essencial típico, não há fluxo nenhum: o contato é um vínculo `wa.me`, e a mensagem é montada no próprio aparelho. Com formulário ou Agenda, o site passa a coletar dados, e o pacote de conformidade inteiro passa a valer (`../esteira/17-conformidade-e-normas.md`).

**Fluxos possíveis** (conforme plano e módulos):

| Fluxo | Onde aparece | O que testar | Documento |
|---|---|---|---|
| Mensagem do WhatsApp (`wa.me/…?text=`) | Todos os planos | A mensagem chega certa, codificada, sem dado que o visitante não digitou; o número está no formato internacional só com algarismos | `05` (fluxos), `04` (codificação) |
| Área de transferência (copiar) | Montador, talão, bilhete | Copia o texto certo; quando o navegador recusa, diz "Cópia indisponível", sem fingir que copiou | `05` |
| Formulário [P] [C] | Contato, orçamento | Validação no servidor, campos mínimos, campo-armadilha, carimbo de tempo, limite por IP, aviso de privacidade vinculado, entrega por e-mail | `09`, `10` |
| Agenda (módulo) | Barbearia, nutrição, psicologia, academia, pet shop, medicina, odontologia | Horários livres certos, nenhum horário dobrado, fuso, confirmação por e-mail, lembrete sem envio em dobro, cancelamento só por envio de formulário, painel com sessão | `04`, `05`, `09` |
| Relatório de acessos [P] [C] | Mensal | Vem do painel da Hostinger, sem cookie no site; o que ele mede está dito no relatório | `10` |

**Como conferir.** Para cada fluxo, há pelo menos um teste nomeado (`05`) e uma linha na matriz de risco (seção 8).

---

## 6. Mapear dependências e cabeçalhos

**Regra.** Antes de testar, liste as dependências de produção e os cabeçalhos HTTP que o site deve mandar.

**Objetivo.**
- **Dependência de produção** é código de terceiro no aparelho do visitante: entra no orçamento de script e na superfície de ataque. Em 03.10, as 6 vulnerabilidades altas do `npm audit` vinham do CLI do `shadcn`, que estava nas dependências de produção sem precisar. Movido para as de desenvolvimento, a árvore de produção ficou limpa.
- **Os cabeçalhos** (política de conteúdo, HSTS, COOP) são a promessa de "nenhum recurso externo" e "nenhum embutimento por terceiros". Num site estático, eles saem de um `.htaccess` gerado. O `.htaccess` do pacote de 29.08 tinha dois defeitos e nunca deve ser republicado (`CLAUDE.md` do Atlas).

**Como fazer.**

```bash
npm ls --omit=dev --depth=0          # o que vai para produção
npm audit --omit=dev                 # vulnerabilidades da árvore de produção
curl -sI http://localhost:3000/ | grep -iE 'content-security|strict-transport|cross-origin-opener|x-content-type|referrer-policy|permissions-policy'
curl -sI http://localhost:3000/rota-que-nao-existe | head -1     # deve ser 404
```

**Como conferir.** A lista de produção não tem ferramenta de desenvolvimento (CLI, Playwright, lint). Os seis cabeçalhos aparecem em toda rota e na 404 (`09-seguranca-e-privacidade.md`, seção 3).

---

## 7. Mapear o conteúdo e as afirmações

**Regra.** Toda afirmação verificável do site — número, prazo, preço, registro, "desde 1996", "três cadeiras" — tem a fonte apontada: o briefing, a ata, o contexto comercial.

**Objetivo.** O site do Atlas só afirma o que os documentos da sociedade sustentam, e o site de cliente só afirma o que o briefing traz. Uma afirmação sem fonte é defeito de verdade, mesmo que a tela esteja perfeita. Exemplos do projeto:
- Em 02.10 saíram do site "sem fidelidade", a promessa sobre domínio e arquivos e "quem faz o briefing é quem constrói o site": nenhuma tinha sustentação nos documentos.
- A versão de setembro da barbearia dizia "A duas quadras da praia", e Santa Rosa não fica na orla (`../esteira/nichos/README.md`, seção 3.8).

**Como fazer.** Uma tabela, no mapa do projeto: afirmação, página, fonte, conferido em.

**Varia por.**
- **[ex]:** a fonte é o documento do nicho. O estabelecimento é fictício, mas o que se afirma sobre a norma ou sobre o bairro precisa ser verdade.
- **[cli]:** a fonte é o briefing.

---

## 8. A matriz de risco

**Regra.** Cada funcionalidade e cada exigência do projeto recebe uma nota de risco: **probabilidade** de falhar (1 a 3) × **impacto** se falhar (1 a 3). O plano de testes começa pelos riscos de nota 6 e 9.

**Objetivo.** O tempo de teste é finito. Os testes por risco garantem que o que pode causar mais dano é testado primeiro e com mais profundidade. É o contrário de testar por ordem de página, que gasta o tempo onde é fácil.

**As seis dimensões de impacto** (marque as que valem; o impacto da linha é o da pior):

| Dimensão | Impacto 3 (grave) quando… | Exemplo do projeto |
|---|---|---|
| **Legal e normativa** | Pode render processo ético no conselho do cliente, infração da LGPD ou do CDC | Preço num site de odontologia (Código de Ética, art. 44); CRECI menor que 25% do tamanho do nome da imobiliária, ou longe dele (COFECI 1.065/2007, arts. 2º e 5º); formulário sem aviso de privacidade |
| **Conversão** | O visitante não consegue chamar, pedir ou marcar | Vínculo do WhatsApp com o número errado; a ação some no celular (a barbearia sem botão de agendar abaixo de 640 px) |
| **Acessibilidade** | Alguém fica de fora (e a LBI, art. 63, obriga) | Contraste abaixo de 4,5:1; foco invisível; armadilha de teclado |
| **Desempenho** | O site trava ou demora num Android de entrada | TBT de 716 ms com CPU 20×; script por quadro |
| **Privacidade** | Dado sai do aparelho sem necessidade ou fica guardado sem prazo | Pedido a servidor de terceiro; cookie; armazenamento local |
| **Verdade do conteúdo** | O site afirma o que não é | Estado "Aberto agora" errado no sábado; afirmação sem fonte |

**Probabilidade:**
- **3:** a funcionalidade é nova, tem estado ou lógica de tempo, ou já falhou neste ou noutro projeto (`12-ataque-a-falhas.md`).
- **2:** já existe noutro site e mudou.
- **1:** é estática e já foi verificada noutro site.

**Matriz-base por plano** (ponto de partida; ajuste ao projeto):

| Item | Plano | Prob. | Impacto (dimensão) | Nota | Primeiro teste |
|---|---|---|---|---|---|
| Vínculo do WhatsApp com mensagem pronta | [todos] | 2 | 3 (conversão) | 6 | Unidade (codificação) + ponta a ponta (o `href`) |
| Registro do conselho visível também no celular | [todos], nichos regulados | 2 | 3 (legal) | 6 | Régua, paridade + leitura humana |
| Ação na primeira tela do celular | [todos] | 2 | 3 (conversão) | 6 | Régua, composição |
| Contraste e foco | [todos] | 2 | 3 (acessibilidade) | 6 | Régua, contraste e teclado + axe |
| Funciona sem script e com movimento reduzido | [todos] | 2 | 2 (acessibilidade) | 4 | Régua, degradação |
| Nenhum pedido externo, cookie ou armazenamento | [todos] | 1 | 3 (privacidade) | 3 | Régua, orçamento + fixture de vigia |
| Marcações de compartilhamento | [todos] | 2 | 2 (conversão) | 4 | Régua, semântica |
| Galeria (fotos reais, `alt`, deslizar) | [P] [C] | 2 | 2 (conversão, acessibilidade) | 4 | Ponta a ponta + régua |
| Formulário (validação, abuso, aviso de privacidade) | [P] [C] | 3 | 3 (legal, privacidade) | 9 | Unidade (carimbo) + ponta a ponta + segurança |
| Funcionalidade sob medida (calculadora, montador, grade…) | [P] [C] | 3 | 2 (conversão, verdade) | 6 | Unidade (a conta) + ponta a ponta (o fluxo) |
| Estado ao vivo (aberto agora, corte da entrega) | [P] [C] | 3 | 2 (verdade) | 6 | Unidade com datas fixas (inclusive sábado e domingo) |
| Agenda (horário dobrado, fuso, lembrete, cancelamento) | Módulo | 3 | 3 (conversão, legal) | 9 | Unidade + ponta a ponta + concorrência |
| Peça-assinatura 3D | [C] | 3 | 2 (desempenho, acessibilidade) | 6 | Lighthouse com CPU 20× + reserva sem WebGL |
| Normas do nicho no texto | [todos], nichos regulados | 2 | 3 (legal) | 6 | Léxico + leitura humana (`10`) |

**Como conferir.** A matriz está no mapa do projeto, com data. Os itens de nota 6 e 9 têm teste nomeado, e o relatório de QA (`modelos/relatorio-de-qa.md`) diz o resultado de cada um.

O modelo para preencher está em `modelos/matriz-de-risco.md`.

---

## 9. Registrar o entendimento: o mapa do projeto

**Regra.** O entendimento vira um arquivo `registros/mapa-do-projeto.md`, na raiz do repositório do cliente, atualizado a cada mudança de escopo. Nunca dentro de `producao/`, que não se edita por cliente (`../README.md`, "A regra da pasta").

**Objetivo.** Quem chega depois — outro sócio, outra sessão do Claude Code, a manutenção daqui a seis meses — não precisa refazer o entendimento. O mapa é o oráculo dos testes: o que ele não diz, ninguém sabe se está certo.

**Modelo:**

```markdown
# Mapa do projeto · <cliente> · atualizado em <data>

## Identificação
- Nicho: <nicho> · Plano: <E|P|C> · Módulos: <Agenda, Presença, páginas adicionais>
- Publicação: <estático na hospedagem comum | web app Node.js> · Endereço: <domínio>
- Conselho: <nome e norma> · O que o site precisa mostrar: <registro, responsável técnico> · O que é vedado: <…>

## Rotas
| Caminho | Tipo | No mapa? | h1 esperado | Ilhas |

## Ilhas
| Arquivo | Estado | Escreve | Entrada ou sob demanda | Sem script | Movimento reduzido |

## Fluxos de dado
| Fluxo | Origem → destino | Guardado onde, por quanto tempo | Quem vê | Teste |

## Dependências de produção e cabeçalhos
- Produção: <lista do npm ls --omit=dev>
- Cabeçalhos esperados: CSP, HSTS, COOP, nosniff, Referrer-Policy, Permissions-Policy

## Afirmações e fontes
| Afirmação | Página | Fonte | Conferido em |

## Matriz de risco
| Item | Prob. | Impacto (dimensão) | Nota | Teste | Resultado |

## Decisões de teste
- O que não se testa, e por quê (ex.: o WebGL no WebKit, fora do piso de compatibilidade).
```

**Como conferir.** O mapa tem data recente (até a última mudança de escopo) e nenhuma seção vazia.

---

## 10. A primeira leitura de um projeto grande (o caso do Atlas, 07.10.2026)

**Regra.** Para entender de uma vez um repositório grande, abrem-se frentes de leitura em paralelo, cada uma com a sua pergunta; nada se altera no repositório durante a leitura; e os principais apontamentos de cada frente se conferem direto nos arquivos antes de relatar (`01-metodologia.md`, seção 5).

**Objetivo.** A leitura em frentes cobre o que uma pessoa só não cobre num dia, e a conferência impede que o erro de uma frente vire fato do relatório.

**Como foi feito no Atlas:**
1. **Cinco frentes em paralelo:** os documentos de produto e de marca; os nichos; a auditoria técnica do código; o padrão do Awwwards e as referências de cada nicho; as capturas de todas as páginas (177 capturas das 24 páginas, as 23 e a 404).
2. **Três levantamentos a mais:** uma pesquisa sobre "cara de IA" e unicidade (`../esteira/11-anti-ia.md`); a navegação direta no Awwwards; e a medição de seis premiados nos nichos (`../esteira/12-inspiracao-e-referencias.md`, seção 4).
3. **A conferência:** cada apontamento relevante foi aberto no arquivo de origem antes de entrar no relatório; a revisão posterior do relatório ainda corrigiu quatro afirmações (`01-metodologia.md`, seção 5).

**Como conferir.** O relatório diz de onde veio cada afirmação (arquivo e linha) e que nada foi alterado no repositório.

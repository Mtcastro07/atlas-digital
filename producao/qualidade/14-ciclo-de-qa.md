# 14 · O ciclo de QA

> **Para que serve.** Quando rodar o quê, do primeiro commit ao fim do contrato:
> - o que precisa estar verde em cada porta do processo (`../esteira/01-processo.md`);
> - o aceite por plano e por módulo;
> - quem assina.
>
> As camadas estão em `02` a `13`; este documento é o calendário delas.
>
> **Estado.** A régua em cada mudança e antes do rascunho: DECIDIDO (desde 07.10.2026). O resto do calendário segue o processo da esteira (RATIFICADO) e usa as camadas do plano, que entram conforme a ordem de adoção (`13-integracao-continua.md`, seção 9). Até lá, o que não está automatizado se faz à mão, com a mesma lista.

---

## 1. O quadro

| Momento | Etapa do processo | O que roda | Quem | Porta |
|---|---|---|---|---|
| Cada edição | 6 · Construção | Formatação e lint do arquivo (gancho) | Claude Code | O gancho devolve o erro |
| Cada mudança de interface | 6 · Construção | A régua nas páginas tocadas | Claude Code | Nenhuma falha nova |
| Antes de dizer "pronto" | 6 · Construção | Tipos, lint, unidade (gancho de fim); a régua inteira | Claude Code | Tudo verde |
| **Antes do rascunho** | 7 · Verificação | Seção 3 | Claude Code; Matheus Castro Oliveira de Luna Garcia confere | Régua sem falha e anti-IA sem marca de peso alto |
| Cada rodada de ajuste | 9 · Rodadas | A régua nas páginas tocadas; os testes da funcionalidade tocada | Claude Code | Régua sem falha; o cliente aprova por escrito |
| **Antes da publicação** | 10 · Conformidade e 11 · Publicação | Seções 4 e 5 | Os três sócios, cada um na sua parte | A lista de publicação inteira (`modelos/checklist-de-publicacao.md`) |
| Até 15 min depois da publicação | 11 · Publicação | Seção 6 | Sócio de desenvolvimento | A conferência pós-publicação sem falha |
| Todo mês | 13 · Manutenção | Seção 7 | Sócio de desenvolvimento; Matheus Azevedo Abreu no suporte | Toda mudança passa pela régua antes de ir ao ar |
| Atualização em vários sites, ou falha crítica na pilha | 13 · Manutenção | Seção 8 | Sócio de desenvolvimento | Cada onda verde antes da próxima |
| Fim do contrato | — | Seção 9 | Matheus Azevedo Abreu e o sócio de desenvolvimento | A eliminação conferida |

---

## 2. A cada mudança

**Regra.** O Claude Code prova o que construiu antes de mostrar.

**Como fazer.**
1. **A cada edição:** o gancho formata e confere o arquivo (`13`, seção 7). Até o gancho existir, e só com o ESLint já instalado, rode `npx eslint <arquivo>` à mão nas ilhas (sem ele, o `npx` baixaria um pacote: dependência nova).
2. **A cada mudança de interface:** `npm run regua -- --pagina=<as páginas tocadas> --rapida`, contra o build de produção. No sandbox do Claude Code, com o sandbox desligado para o Chrome.
3. **Antes de dizer "pronto":** a régua inteira, sem `--rapida`, e os tipos (o `npm run build`). O lint e os testes de unidade da lógica tocada passam **quando adotados** (`13-integracao-continua.md`, seção 9; cada ferramenta entra com pedido explícito); antes disso, não são porta.
4. **Ao fim de cada passe de design:** a varredura anti-IA, como autoconferência (`11`, seção 2), com a contagem de cada efeito e de cada molde por página: a 1440 px na porta da mesa e a 390 px no passe do celular (`../esteira/20-repeticao-dentro-do-site.md`, seção 3).
5. **No relatório ao usuário:** o resultado, com os números da régua. Se algo ficou vermelho, diga isso com a saída. Nunca "pronto" com falha escondida.
6. **Depois de uma mudança grande** (revisão de código, atualização de dependência, passe de design): a varredura de erros de passe completo, no modelo de 03.10.2026. Todas as páginas a 320, 390, 768, 1024 e 1440 px, em desenvolvimento e na compilação de produção, sem erro de console, falha de rede, rolagem lateral, `id` duplicado ou âncora quebrada; no Atlas, as sete páginas nas cinco larguras e os 16 endereços dos exemplos a 320, 390 e 1440 px. Com as interações conferidas, à mão ou por teste: escolher plano e módulos, as âncoras, o mapa das dúvidas, o simulador, o menu do celular e o cabeçalho de 1024 a 1280 px. O resultado entra no relatório de QA.

**Nas rodadas de ajuste (etapa 9).** Cada pedido do cliente é uma mudança como as outras. A régua roda a cada rodada, e o pedido vai para o `decisoes.md`. O que excede o escopo é orçado antes.

**Objetivo.** O usuário, o sócio e o cliente nunca são os primeiros a ver o defeito.

---

## 3. Antes do rascunho de 24 horas

**Regra.** O rascunho só vai ao cliente com tudo abaixo verde. Isso entra na janela de H+16 a H+20 das 24 horas (`../esteira/01-processo.md`, seção 3).

| # | Verificação | Onde | Bloqueia |
|---|---|---|---|
| 1 | A régua inteira, **sem falha**, nas páginas do plano; cada aviso com decisão. **A régua dos quadros** (desde 28.10.2026): 60 quadros por segundo na rolagem, no menu, na navegação e na figura, no celular 4× e na mesa, em duas sessões separadas | `02`; a dos quadros, `02`, seção 12, e `08`, seção 11 | Sim |
| 2 | A avaliação anti-IA completa: capturas a 390 e a 1440 px; **nenhuma marca de peso alto**, a página chapada inclusive; **o teste da vitrine com o veredito** (nunca "pendente"), depois do crítico de fora; **a unicidade** (`npm run unicidade`) sem falha; **a contagem da série**, por página, a 1440 e a 390 px, sem efeito nem molde em série sem decisão escrita | `11`, seções 3 e 9; `../esteira/19-o-padrao-atlas.md`, seções 7 e 8; `../esteira/20-repeticao-dentro-do-site.md`, seção 3 | Sim |
| 3 | A lista de 22 itens | `11`, seção 5 | Sim, nos itens que a régua mede; nos outros, decisão registrada |
| 4 | As normas do nicho no texto, frase a frase | `10`, seção 3 | Sim |
| 5 | A tabela de afirmações completa: todo número com fonte | `00`, seção 7; `10`, seção 2 | Sim |
| 6 | A leitura do texto em voz alta, inteiro, no celular | `10`, seção 5 | Decisão registrada |
| 7 | **[P] [C]** A funcionalidade do ofício, de ponta a ponta, com e sem script, na versão inicial | `05` | Sim |
| 8 | O roteiro de teclado e o roteiro curto do leitor de tela | `06`, seções 4 e 5 | Sim, para defeito S1 e S2 (armadilha, controle sem nome, foco invisível) |
| 9 | O rascunho no endereço temporário do próprio site, com `X-Robots-Tag: noindex, nofollow` | `../esteira/18-publicacao-e-manutencao.md`, seção 6.2 | Sim |
| 10 | **A revisão do Impeccable a 100%** (desde 16.10.2026): o detector, o `critique` com A e B isolados e o `audit`; o mapa de convergência contra o kit anti-IA; as mudanças devidas; e o relatório no chat. É a última porta, antes do commit, em todo fechamento de site, do Atlas e de nicho | `15-revisao-do-impeccable.md` | Sim: nada que converge e é real fica aberto sem decisão escrita |

**O que o rascunho não precisa ter.** O resto da conferência manual (seção 4: aparelhos reais, roteiro completo do leitor de tela, zoom, cores forçadas, teste do desconhecido) e a porta de conformidade (seção 5) vêm antes da **publicação**. O rascunho é navegável, não publicado (ata v3.0, IV.4).

**Como conferir.** O relatório de QA do rascunho (`modelos/relatorio-de-qa.md`), assinado pelo sócio de desenvolvimento.

---

## 4. A conferência manual

**Regra.** Antes da publicação, uma pessoa confere à mão o que a máquina não alcança:

| # | Conferência | Como | Plano |
|---|---|---|---|
| 1 | **Aparelhos reais:** um iPhone com o Safari e um Android intermediário com o Chrome (um de entrada, se houver, é ainda mais exigente) | Abrir cada página no 4G; tocar em cada ação; rolar; girar o aparelho; cada momento premium na versão de toque (`08`, seção 8) | [todos] |
| 2 | **Roteiro de teclado** | `06`, seção 4, na mesa, no Chrome e no Safari | [todos] |
| 3 | **Leitor de tela, roteiro curto** (refeito na versão final) | `06`, seção 5: o VoiceOver no Mac, de 5 a 10 minutos por tipo de página | [todos] |
| 4 | Leitor de tela, roteiro completo | `06`, seção 5: os dez itens, no TalkBack e no VoiceOver do celular | [C], e todo site com formulário ou Agenda |
| 5 | Zoom, espaçamento de texto e cores forçadas | `06`, seção 6 | [todos] |
| 6 | **O teste do desconhecido** | `11`, seção 4 | [todos] |
| 7 | O 3D e a peça-assinatura no aparelho real: compila sem travar? Esquenta? A reserva sem WebGL aparece? | `08`, seção 8; reserva: o WebGL desligado no navegador | [C] |
| 8 | Uma sessão de exploração por categoria de risco alto | `12`, seção 3; `modelos/carta-de-exploracao.md` | [todos] |

**Objetivo.** O WebKit do Playwright não é o Safari do iPhone; a CPU 20× não é a GPU do Android de entrada; o axe não ouve. A automação acha cerca de 57% dos problemas de acessibilidade (`06`, seção 1). Esta conferência cobre o resto.

**Como conferir.** Cada linha marcada no relatório de QA com o aparelho, o sistema, o navegador, a data e quem fez.

---

## 5. A lista de publicação

**Regra.** Nenhum site vai ao ar sem a lista de publicação inteira marcada (`modelos/checklist-de-publicacao.md`). Ela reúne:
- **a porta de publicação** (a conformidade) de `../esteira/17-conformidade-e-normas.md`, seção 9 (etapa 10, Matheus Azevedo Abreu);
- **as verificações técnicas** desta pasta (etapa 11, o sócio de desenvolvimento), com **o aparelho real**: um Android intermediário e um iPhone, em todo plano (`08-desempenho.md`, seção 8);
- **aparece nas buscas e nas IAs,** em todo plano (DECIDIDO em 16.10.2026; `../esteira/21-busca-e-ias.md`, seção 11): o `robots.txt` (`curl -s <endereço>/robots.txt`: no cliente, só o `*` liberado; no exemplo, mais os 11 robôs de IA com `Disallow: /`), o mapa do site (`curl -s <endereço>/sitemap.xml`: os canônicos, a data verdadeira), o `llms.txt` (`curl -s <endereço>/llms.txt`: o nome no H1; no cliente, as páginas pelo canônico, nenhuma `noindex`, e nenhum `x-robots-tag` no ar; no exemplo, só o nome e o selo), o JSON-LD válido e o texto do robô sem palavra colada (`node ferramentas/texto-do-robo.mjs <endereço>`, que sai com 0); antes do rascunho contra o build local, e de novo no domínio;
- **nenhum defeito S1 aberto** (`01-metodologia.md`, seção 8);
- **os S2 abertos com decisão escrita** dos sócios.

**Objetivo.** Publicar é afirmar ao cliente e ao visitante que o site está certo. A lista impede que um item fique para depois sem que ninguém decida.

**Como conferir.** A lista assinada, guardada no repositório do cliente, junto do relatório de QA.

---

## 6. Depois da publicação

**Regra.** Toda publicação, a primeira e cada atualização, termina com a conferência **no endereço publicado** de `../esteira/18-publicacao-e-manutencao.md`, seção 5: vinte itens, dos cabeçalhos ao aviso ao IndexNow e ao Search Console (desde 16.10.2026, os itens 16 a 20 são a busca e as IAs; na primeira publicação, também a seção 5.1 de lá). Esta pasta acrescenta a automação e o registro:

| # | Conferência | Onde |
|---|---|---|
| 1 | A fumaça automatizada: as páginas respondem; HTTPS; cabeçalhos; `robots.txt` e mapa; imagem de compartilhamento | `05`, seção 7 |
| 2 | Os cabeçalhos, pelo script, em `/`, na 404 e no `robots.txt` | `09`, seção 3 |
| 3 | A régua contra o endereço publicado (`--base=https://…`) | `02` |
| 4 | O cartão do WhatsApp, numa conversa de teste | `10`, seção 7 |
| 5 | **Com coleta:** um envio do formulário, uma marcação e um cancelamento na Agenda, com o e-mail chegando | `../esteira/17-conformidade-e-normas.md`, seção 9 |
| 6 | O primeiro byte, o cache e o Lighthouse no protocolo, contra o domínio | `08`, seções 3 e 7 |

**Um cuidado.** O `curl --compressed` recebe da CDN da Hostinger uma página de verificação, e não o site. Use o `curl` sem essa opção, e confira a compressão no navegador (`08`, seção 7).

**Se algo falhar:** o item que falha volta a publicação. A volta é pelo git (`../esteira/18-publicacao-e-manutencao.md`, seção 6.3):
- **Defeito sem urgência:** `git revert` na `main`, e a reversão passa pelas portas.
- **Site quebrado agora:** `producao` apontado para o último commit bom, **a pedido explícito**.

A correção segue o ciclo de um defeito (`01`, seção 9).

**Como conferir.** O registro da publicação, no relatório de QA da publicação: data, commit, o resultado de cada item e quem conferiu.

---

## 7. A manutenção mensal

**Regra.** Uma vez por mês, em cada site de cliente:

| # | O quê | Onde |
|---|---|---|
| 1 | A régua inteira, contra o endereço publicado; os avisos novos com decisão | `02` |
| 2 | `npm audit --omit=dev`; as atualizações acumuladas, aplicadas em homologação, com a régua e os testes | `09`, seção 7 |
| 3 | O conteúdo: preços com o mês de referência, horários, fotos; o que o cliente pediu | `10` |
| 4 | A norma do nicho: mudou alguma coisa? (a nutrição tem norma nova a partir de 23.01.2027) | `../esteira/nichos/<nicho>.md` |
| 5 | Os vínculos externos | `10`, seção 7 |
| 6 | O certificado e a renovação; o domínio | `09`, seção 3 |
| 7 | A cópia de segurança existe; **a cada trimestre**, restaurada uma vez num teste | `09`, seção 9 |
| 8 | **Com coleta:** a tarefa de eliminação rodou; o banco e a caixa não guardam nada vencido | `09`, seção 8 |
| 9 | **[P] [C]:** o relatório mensal de acessos | `../esteira/14-funcionalidades/04-relatorio-de-acessos.md` |
| 10 | **[C]:** a revisão trimestral de conteúdo | `../esteira/03-planos.md` |

**Objetivo.** O site muda sem que ninguém mexa nele: a dependência envelhece, a norma muda, o preço vence, o vínculo externo some. A manutenção é o que mantém verdadeiro o que o site afirma.

---

## 8. A atualização em ondas

**Regra.** As mudanças que atingem muitos sites (Next, React, a política de conteúdo, a versão do Node) vão ao ar **em ondas**, como manda `../esteira/18-publicacao-e-manutencao.md`, seção 8:

| Onda | Quais sites | Por quê |
|---|---|---|
| 1 · Os canários | Os três sites de exemplo, no repositório do Atlas | Um defeito numa atualização comum aparece primeiro onde não custa nada |
| 2 | Um ou dois clientes | A confirmação em site real, com pouco alcance |
| 3 | O resto | Só depois de as ondas anteriores estarem verdes |

**A urgência.** Uma falha crítica numa dependência de produção pula a espera de 7 dias e a janela mensal. Exemplo: a falha de nota 10 nos componentes de servidor do React, de dezembro de 2025, CVE-2025-55182.
- **Os sites com servidor** (web app Node) recebem a correção primeiro, no mesmo dia: ainda em ondas, com as etapas encurtadas.
- **Os estáticos** não rodam o servidor do React. Uma falha só de servidor não os alcança [FU], e eles seguem a onda normal.

**O que roda em cada site, antes de avançar a onda:**
1. A atualização e o build.
2. Os testes.
3. A régua.
4. A comparação de telas (`07`).
5. A publicação e a conferência da seção 6.
6. **Com coleta:** o envio de teste e a corrida da Agenda.

**Objetivo.** Atualizar tudo de uma vez arrisca quebrar todos os clientes ao mesmo tempo; esperar arrisca a falha explorada. As ondas equilibram os dois riscos.

---

## 9. O fim do contrato

**Regra.** No fim do contrato, antes de desligar o site:
1. **A eliminação dos dados** do formulário e da Agenda, no banco, nas caixas de e-mail e nas cópias de segurança, conforme o contrato de operador (`../esteira/17-conformidade-e-normas.md`, seção 5.6).
2. **Conferir a eliminação:** contar os registros (zero) e buscar o nome de um contato de teste.
3. **O domínio e os arquivos:** conforme a decisão dos sócios. A titularidade do domínio e a entrega dos arquivos no encerramento estão **em consulta ao contador** e não se prometem (`../esteira/17-conformidade-e-normas.md`, seção 10).
4. **O registro:** o que foi apagado, quando e por quem.

---

## 10. O aceite por plano e por módulo

O quadro de `../esteira/03-planos.md`, seção 9, com o lugar de cada verificação nesta pasta:

| Item | [E] | [P] | [C] | Onde |
|---|---|---|---|---|
| Régua sem falha nas páginas do plano | ✓ | ✓ | ✓ | `02` |
| Avaliação anti-IA sem marca de peso alto | ✓ | ✓ | ✓, com o teste de unicidade | `11`, seção 3 |
| Lista de revisão de 22 itens | ✓ | ✓ | ✓ | `11`, seção 5 |
| Normas do nicho conferidas no texto final | ✓ | ✓ | ✓ | `10`, seção 3 |
| Ação na primeira tela do celular | ✓ | ✓ | ✓ | Régua, bloco 6 (aviso que, no aceite, precisa estar resolvido ou decidido) |
| A régua dos quadros sem falha, em duas sessões (desde 28.10.2026) | ✓ | ✓ | ✓ | `02`, seção 12; `08`, seção 11 |
| Funcionalidade sob medida de ponta a ponta, com e sem script | — | ✓ (uma) | ✓ (duas) | `05`, seção 4 |
| Formulário: envio, falha e aviso de privacidade | — | ✓ | ✓ | `05`, seção 4; `09`, seção 5 |
| Agenda: marcar, corrida de dois pedidos, cancelar, lembrete, fuso | Se contratada | Se contratada | Se contratada | `05`, seção 5.6; `09`, seção 5; `04`, seção 4.6 |
| Peça-assinatura com reserva sem WebGL e parada com movimento reduzido | — | — | ✓ | Seção 4, item 7; régua, bloco 2 |
| Lighthouse no protocolo, LCP e TBT | ✓ | ✓ | ✓ | `08`, seção 3 (ver a nota abaixo) |
| Leitor de tela (roteiro curto) | ✓ | ✓ | ✓ | Seção 4, item 3 |
| Porta de publicação da conformidade | ✓ | ✓ | ✓ | Seção 5 |
| Aparece nas buscas e nas IAs (desde 16.10.2026) | ✓ | ✓ | ✓ | Seção 5; `../esteira/21-busca-e-ias.md`, seção 11 |

**O desempenho no aceite** (revisto em 08.10.2026, à noite; decisão de Gabriel Ribeiro Ota Yida: "o tamanho do site não importa, e sim só seu design"). Nos sites de marca, a porta é a barreira do travamento no aparelho médio (régua, passagem 2b; `../esteira/15-desempenho.md`, seção 2.1): o peso, o LCP e o TBT se relatam, sem meta. Desde 28.10.2026, em todo site, também o ritmo de 60 quadros por segundo (a régua dos quadros; `../esteira/15-desempenho.md`, seção 2.4). O Lighthouse entra como diagnóstico quando a barreira reprova. No site do Atlas, como até então:
- a medição segue o protocolo (`08`, seção 3), com mediana, mínimo e máximo;
- o que estiver fora da meta de `../esteira/15-desempenho.md` tem a causa identificada e a decisão registrada;
- nenhuma regressão relativa sobre a versão anterior fica sem explicação.

**O módulo Presença** (o perfil no Google e as avaliações). O nome, o endereço, o telefone e o horário do site são os mesmos do perfil. O vínculo para o perfil abre. Nenhuma avaliação é copiada para o site sem autorização e sem a norma do nicho permitir (`10`; `../esteira/14-funcionalidades/06-presenca.md`).

---

## 11. Quem assina

| Assinatura | Quem | O que atesta |
|---|---|---|
| O relatório de QA do rascunho | Matheus Castro Oliveira de Luna Garcia | A régua, a avaliação anti-IA, os 22 itens, a leitura |
| A conformidade | Matheus Azevedo Abreu | A porta de `../esteira/17-conformidade-e-normas.md`, seção 9 |
| O briefing atendido | Gabriel Ribeiro Ota Yida | O que o cliente pediu está no site, no tom combinado |
| A publicação | Matheus Castro Oliveira de Luna Garcia | A lista de publicação e a conferência pós-publicação |
| O aceite | O cliente, por escrito (mensagem basta) | O rascunho, cada rodada e a versão publicada |

*Fonte das funções: ata v3.0, I.1 e I.3, e `../esteira/01-processo.md`, seção 1. Todos os sócios podem atuar no desenvolvimento. Quem constrói não assina sozinho a avaliação do que construiu: o Claude Code faz, e o sócio confere.*

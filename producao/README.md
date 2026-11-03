# Produção · o kit do Atlas Digital

> **O que é.** Tudo o que é preciso para produzir um site do Atlas, do pedido ao site publicado, numa pasta só. **Ponha esta pasta num projeto vazio e comece.** Ela leva:
> - **a esteira** (`esteira/`): o que fazer e por quê. São o processo, os planos, a direção de arte, a tipografia, a cor, a composição, a imagem, o movimento, o texto, a anti-IA, a inspiração, a tecnologia, as funcionalidades, o desempenho, a acessibilidade, a conformidade, a publicação e os doze nichos, com os estudos de 30.08 a 08.10.2026;
> - **a qualidade** (`qualidade/`): como provar, com a régua, os testes, a avaliação anti-IA e o ciclo de QA;
> - **o caminho executável:** o protocolo de entrada, o roteiro da sessão, a ordem de produção, a ponte da identidade ao código e as receitas de construção (`00` a `04`);
> - **o código:** a base, compilada e aprovada pela régua (`base/`), os módulos de formulário e Agenda (`modulos/`) e os gestos (`gestos/`);
> - **o catálogo de componentes de terceiros** (`componentes/`): as peças de outras bibliotecas com a licença conferida para site vendido, organizadas por função, e o inventário da pesquisa;
> - **as ferramentas** (`ferramentas/`), **os comandos do Claude Code** (`claude/`) e **um exemplo resolvido** (`exemplo/`).
>
> A esteira diz **o que** fazer e por quê; a qualidade, **como provar**; o resto da pasta, **como fazer, com o quê e em que ordem**.
>
> **Estado.** Ratificado em 08.10.2026, a pedido do usuário ("Faça a ratificação completa da esteira de produção"): a esteira, a qualidade e o kit (`esteira/README.md`, seção 3, e `esteira/99-rastreabilidade.md`, seção 5).
>
> **Atualizado em:** 03.11.2026, à noite: o MCP do Figma obrigatório, as quatro habilidades de Emil Kowalski (`claude/skills/`), o formulário de briefing 2.0 (`esteira/modelos/formulario-de-briefing.html`) e o prompt-modelo de abertura (`claude/prompt-modelo.md`); o registro em `esteira/99-rastreabilidade.md`, seções 12 e 13. Antes, no mesmo dia: os ajustes depois do redesenho do site do Atlas: o vidro que sai enquanto a página rola (`esteira/15-desempenho.md`, seção 5.19), nada preso com animação ligada à rolagem, o acabamento das passivas e o começo só à vista (`esteira/09-movimento.md`, seções 5 e 14), o ponto cego do pé da tela na régua dos quadros (`qualidade/08-desempenho.md`, seção 11, item 8), o texto para o cliente (`esteira/10-texto-e-conteudo.md`, seção 1) e o código como tema retirado do site do Atlas (`esteira/19-o-padrao-atlas.md`, seção 4.3); o registro em `esteira/99-rastreabilidade.md`, seção 11. Antes, 02.11.2026: o que o redesenho do site do Atlas ensinou (pedido do aprovador, "mudancas que valem para novos projetos"): o nível Apple e o código como tema (`esteira/19-o-padrao-atlas.md`, seções 4.2 e 4.3), as passivas com a cobertura medida (`esteira/09-movimento.md`, seção 14; `qualidade/regua/conferir-passivas.mjs`), a construção por contrato (`esteira/19-o-padrao-atlas.md`, seção 8.8), o que aliviou a navegação (`esteira/15-desempenho.md`, seção 5.18), a calibração do detector (`qualidade/15-revisao-do-impeccable.md`, seção 7) e a base sem o `<ViewTransition>` e com a página no topo; o registro em `esteira/99-rastreabilidade.md`, seção 10. Antes, 28.10.2026: os 60 quadros por segundo em todo site, porta de entrega desde então (pedido do usuário de 22 e 27.10.2026): a régua dos quadros (`qualidade/02-regua.md`, seção 12; `qualidade/regua/quadros.mjs`), a regra e as causas medidas no site do Atlas (`esteira/15-desempenho.md`, seções 2.4 e 5.15 a 5.17), a página que abre no topo (`esteira/13-tecnologia-e-estrutura.md`, seção 3.7, regra 9) e o registro em `esteira/99-rastreabilidade.md`, seção 9. Antes, 16.10.2026: aparecer nas buscas e nas IAs em todo site, de qualquer plano, pedido do usuário do mesmo dia (`esteira/21-busca-e-ias.md`; a base, a porta de publicação da qualidade e o registro em `esteira/99-rastreabilidade.md`, seção 8). No mesmo dia, a repetição dentro do site, a regra e o estudo de 14 a 16.10.2026 (`esteira/20-repeticao-dentro-do-site.md`, pedido do usuário de 14.10.2026). Antes, 13.10.2026: o catálogo de componentes (`componentes/`).

---

## Comece aqui

**Para quem vai produzir:**
1. Crie uma pasta vazia para o site (por exemplo, `~/Projetos/barbearia-santa-rosa/`) e copie esta pasta `producao/` inteira para dentro dela.
2. Abra o Claude Code nessa pasta e diga o pedido, com o que tiver. Por exemplo: "Leia producao/README.md e produza o site da Barbearia Santa Rosa, no plano Completo; o briefing está em ~/Downloads/briefing.md."
3. **Antes de tudo, o Claude Code confere a máquina** (`node producao/ferramentas/conferir-ambiente.mjs`). Numa mensagem só, ele diz:
   - o que falta instalar, com o comando pronto: rode-o ali mesmo, com `!` na frente (por exemplo, `! brew install poppler`), para a saída ficar na conversa;
   - as permissões que vai pedir: rodar fora do sandbox o que usa a rede ou o Chrome; e, na sessão seguinte, aprovar os plugins e o MCP do projeto;
   - as perguntas do pedido, cada uma com a recomendação dele.

   **O que a máquina precisa:** o Node 22, o Google Chrome e o Claude Code. O resto (o `typescript-language-server`, o `poppler`, os plugins) melhora o trabalho, mas não o impede (`claude/ferramental.md`).
4. Depois, ele monta o site ao lado desta pasta e segue o roteiro, etapa por etapa. Ele nunca instala programa na máquina por conta própria, e commit, push e publicação, só com o seu pedido.

**Para o Claude Code, num projeto em que a raiz só tem esta pasta** (e talvez `ordem.json`, `briefing.md` e `material/`):
1. Leia `claude/novo-site.md` e siga-o, com o pedido do usuário no lugar de `$ARGUMENTS`. Ele manda:
   - antes de tudo, `node producao/ferramentas/conferir-ambiente.mjs`, e o que faltar, o usuário instala ("Antes de tudo");
   - ler `00-do-pedido-ao-site.md` e `02-ordem-de-producao.md`;
   - escrever o `briefing.md` e a `ordem.json` na raiz;
   - rodar `node producao/ferramentas/novo-site.mjs ordem.json --briefing=briefing.md`, que monta o site ali mesmo.
2. Depois, o roteiro (`01-roteiro-da-sessao.md`), pelo `/proxima-etapa`. Na sessão em que o site nasceu, os comandos ainda não aparecem com `/`: leia `.claude/commands/proxima-etapa.md` e siga.

**Num projeto que já tem o site** (há `CLAUDE.md` e `package.json` na raiz, ao lado desta pasta): o `CLAUDE.md` e o "Estado" dele dizem onde parou. Siga com `/proxima-etapa`.

**No repositório do Atlas**, onde o kit é mantido: `/novo-site <o pedido>`. O site nasce numa pasta nova ao lado do repositório, com uma cópia desta pasta dentro, e a ordem fica em `ordens/`, o registro de todo site criado.

**A regra da pasta.** Ela fica como veio: é a biblioteca do projeto. Nada do cliente entra aqui: o código e os documentos do site ficam na raiz, e os relatórios de QA, em `registros/`. Por isso, uma versão nova do kit entra trocando a pasta inteira, e um defeito achado no kit se corrige no repositório do Atlas e volta aos projetos assim. O site ignora a pasta na compilação: o `tsconfig.json` a exclui, e o CSS também (`@source not "../producao"`).

## 1. A análise: a esteira e a qualidade bastavam?

**A pergunta** (pedido do usuário, 08.10.2026): bastam a QA e a esteira de produção para que, no futuro, o Claude Code crie um site completo a partir do que o usuário disser, com o plano e o resto?

**A resposta: não bastavam.** Elas definem as regras e a prova, e as definem bem, depois da verificação de 673 itens (`producao/esteira/99-rastreabilidade.md`). Mas faltavam seis coisas para sair de um pedido e chegar a um site:

| # | O que faltava | Por que impedia | O que esta pasta põe no lugar |
|---|---|---|---|
| 1 | **A entrada.** A esteira começa no briefing pronto (etapa 2). Não diz como transformar "faz um site pra barbearia do Fulano" em nicho, plano, módulos, perguntas e paradas | Cada sessão improvisaria a triagem: perguntas demais, ou de menos, e o site começado sem o que bloqueia | `00-do-pedido-ao-site.md` (o protocolo), `02-ordem-de-producao.md` (o formato) e `claude/novo-site.md` (o comando) |
| 2 | **O código executável.** O código estava espalhado em 172 trechos dentro dos documentos, que precisaram de 29 correções na verificação; partes só existiam no `web/` do Atlas, que um repositório novo não tem | Montar um site a partir de trechos repete os erros que a verificação achou e leva horas antes da primeira página | `base/`: o projeto Next.js completo, compilado e aprovado pela régua (5 páginas, 0 falha) |
| 3 | **As ferramentas.** A esteira descrevia, e não entregava:<br>- o servidor estático que mede certo;<br>- o `.htaccess` gerado;<br>- as fontes com licença;<br>- as fotos sem metadados;<br>- os ícones;<br>- o mapa do bairro;<br>- o cartão de compartilhamento;<br>- a conferência do conteúdo;<br>- o porte da régua.<br><br>Os gestos do Spell UI só existiam no repositório do Atlas | Cada site reescreveria os scripts, ou mediria errado: o servidor do Python dava 457 KB de script e conexões recusadas | `base/ferramentas/` (13 ferramentas, com a régua portada), `ferramentas/` (o `novo-site` e o porte da régua) e `gestos/` |
| 4 | **O processo executável.** A esteira descreve as etapas; não diz, em cada uma, que comando rodar, que arquivo tocar, quando parar e o que relatar | O processo dependeria da memória de quem conduz | `01-roteiro-da-sessao.md` e os dez comandos de `claude/commands/` |
| 5 | **A ponte da identidade ao código.** A direção de arte (`producao/esteira/04` a `09`) decide; faltava dizer onde cada decisão entra (tokens, escala, fontes, forma, ícone, gesto) e como conferir antes de construir | A identidade aprovada viraria código por tentativa | `03-da-identidade-ao-codigo.md` e o `conferir-paleta` |
| 6 | **Um exemplo resolvido.** Nenhum documento mostrava os modelos preenchidos de ponta a ponta, com as medidas reais | Sem gabarito, cada modelo se preenche de um jeito | `exemplo/`: a ordem, o briefing (fictício), a identidade, as decisões, o roteiro de conteúdo e o relatório de QA, e o código na `base/` |

**O que se reaproveitou, sem reescrever:**
- a régua inteira (portada, não copiada à mão);
- os modelos da esteira (o `novo-site` os preenche);
- o código de referência da esteira (`14-funcionalidades/01`, `13`, `18`), corrigido e testado;
- as ferramentas do `web/` (`preparar-standalone`; as de foto e captura, generalizadas).

**O que a produção corrigiu ou acrescentou na esteira e na qualidade** (seção 6).

## 2. O mapa

| Arquivo ou pasta | O que é | Quando |
|---|---|---|
| `esteira/` | A norma: o que fazer e por quê, regra por regra, com o objetivo e a fonte; os doze nichos; os modelos dos documentos do projeto (`esteira/README.md`); desde 16.10.2026, a regra de que nada se aplica em série dentro do site, com o estudo (`esteira/20-repeticao-dentro-do-site.md`) | Antes da primeira linha de código, e sempre que uma regra estiver em dúvida |
| `qualidade/` | Como provar: a régua (`qualidade/regua/`), os testes, a avaliação anti-IA, o ataque a falhas e o ciclo de QA (`qualidade/README.md`) | Em cada porta |
| `00-do-pedido-ao-site.md` | O protocolo de entrada: cliente ou exemplo, o nicho (os doze e o novo), o plano e os módulos, o que perguntar, o que bloqueia, o que não se aceita | A cada pedido, antes da primeira pergunta |
| `01-roteiro-da-sessao.md` | As etapas 2 a 13 em comandos, arquivos, portas e paradas; o relógio das 24 horas; o relatório; o que fazer quando algo dá errado | Do começo ao fim de cada site |
| `02-ordem-de-producao.md` | O formato da ordem (`ordem.json`), campo por campo, e o que o `novo-site` faz com cada um | Ao escrever a ordem |
| `03-da-identidade-ao-codigo.md` | Onde cada decisão da direção de arte entra no código, com a conferência | Etapa 4 |
| `04-construcao.md` | Os componentes da base, as receitas (página, seção, ilha, foto, modo servidor) e o que cada plano acrescenta | Etapa 6 |
| `base/` | O projeto de todo site, com o exemplo do pet shop no Essencial (`base/README.md`) | Copiada pelo `novo-site` |
| `modulos/` | O formulário e a Agenda, em código testado, com o `nodemailer` e o `mysql2` aprovados (`modulos/README.md`) | [P], [C] e o módulo Agenda |
| `gestos/` | Os gestos do Spell UI adaptados (marca-texto e tarja, copiar, espera, onda, brilho, inclinação), a ilha de pausa do ambiente, o CSS, o `components.json` e a licença do Spell UI (`gestos/README.md`) | [P] e [C]; a tarja, no [E] que a pedir |
| `componentes/` | O catálogo de componentes de terceiros: as peças de outras bibliotecas com a licença conferida para o site vendido, por função (matéria, objetos, texto, galeria, transição, fundo vivo, 3D, ícones, blocos, demos), com o plano, o comando e os cuidados; as regras de licença, origem e encaixe; o inventário da pesquisa de 12 e 13.10.2026 (`componentes/README.md`) | Etapa 4, depois do mundo da marca; etapa 6, para trazer cada peça |
| `ferramentas/` | `novo-site.mjs` (monta o site no projeto em que a pasta está, ou numa pasta nova, a partir do Atlas) e `portar-regua.mjs` | Ao criar um site; quando a régua mudar |
| `claude/` | `novo-site.md` (no projeto vazio, lido e seguido; no Atlas, o comando), os dez comandos de etapa de cada site, as habilidades da produção (`skills/`), o prompt-modelo de abertura (`prompt-modelo.md`, com o estudo em `estudo-de-prompts.md`) e o `ferramental.md`: os plugins e o servidor MCP da produção, com os comandos de instalação, e o que fica de fora | Sempre; o ferramental, uma vez por máquina e por projeto |
| `exemplo/` | O exemplo resolvido, com o relatório de QA | De gabarito |
| `referencias/` | Os três sites de exemplo do Atlas, um por plano, e um Completo de saúde feito pelo próprio kit (`referencias/odontologia-completo/`, referência de função, não de acabamento), em código, para estudo: a peça-assinatura em 3D, a cena de rolagem, o estado da loja, a calculadora, o talão (`referencias/README.md`) | Na direção de arte e na construção, para ver como uma regra vira tela |
| `atlas--relatorio--2026-10-08.md` | O relatório da entrega de 08.10.2026, registro do Atlas; num projeto de cliente, pode ser ignorado | — |

## 3. Como se usa

O caminho está em "Comece aqui", no alto. Em resumo: a pasta vai para um projeto vazio; o protocolo de entrada transforma o pedido em `briefing.md` e `ordem.json`; o `novo-site` monta o site ao lado da pasta; o roteiro leva do rascunho à publicação, com os comandos de etapa. **Um site que já existe:** abra o Claude Code na raiz dele, e o `CLAUDE.md` e o "Estado" dizem onde parou.

## 4. O estado, verificado em 08.10.2026

| Peça | Estado | A prova |
|---|---|---|
| `base/` (Essencial) | **Pronta** | Build sem erro; 9 testes de unidade; régua APROVA nas 5 páginas, com 0 falha e 2 avisos esperados; script de 116,1 KB; fontes de 67,2 KB; CLS 0; paleta com 12 de 12 pares acima do mínimo |
| `base/` no modo servidor | **Pronta** | O standalone compilado e servido pelo `server.js`, com os cabeçalhos do `next.config.ts`; régua APROVA com o CNPJ preenchido |
| `novo-site` e `portar-regua` | **Prontos** | De ponta a ponta, depois da revisão:<br>- o exemplo (régua e `pronto` aprovam);<br>- um cliente no Profissional;<br>- a psicologia com a Agenda e domínio com acento.<br><br>A ordem com erro, o cliente sem briefing e os casos de borda não criam nada<br><br>**No projeto vazio** (só esta pasta na raiz), três vezes: o site nasce ao lado do kit e a régua APROVA 5 de 5; o exemplo reproduzido de ponta a ponta, com 9 testes, o build, a régua (5 de 5) e o `pronto --exemplo` aprovados. E uma quarta vez, à noite, com o `.mcp.json` do ferramental já na raiz: o site nasce no lugar |
| `gestos/` | **Prontos** | Compilam com a base; régua sem falha numa página com os seis gestos e a pausa |
| `componentes/` (13.10.2026) | **Catálogo de consulta** | A pesquisa:<br>- cerca de 1.500 itens, com a licença lida no arquivo de cada repositório ou pacote em 12 e 13.10.2026;<br>- cinco frentes até a saturação.<br><br>Conferido à mão no dia 13:<br>- a licença de 24 repositórios em destaque;<br>- o texto de 8 páginas de licença (Codrops, CodePen, Aceternity, Hover.dev, Skiper, GSAP, `shaders`, Animate.css).<br><br>**Nenhuma peça foi copiada para o kit, aberta no navegador nem medida na barreira do travamento:** cada uma se mede no site em que entra |
| O mapa do bairro (`gerar-mapa`) | **Pronto** | O mapa do Fonseca no exemplo: 107 traçados, 7,3 KB, com o crédito do OpenStreetMap; régua sem falha |
| `conferir-pronto` | **Pronto** | Aprova o exemplo resolvido. Reprova, num cliente, as 9 sobras de fábrica e os campos ● em branco |
| Formulário e Agenda (`modulos/`) | **Prontos.** O `nodemailer` e o `mysql2` foram aprovados em 08.10.2026, e o banco rodou de verdade (MariaDB 10.11.19 e MySQL 8.0.46). Falta a prova no ar: o SMTP real, o Google, o proxy e as tarefas da Hostinger | Conferido por mim, numa cópia limpa com os passos de instalação:<br>- 135 testes de unidade (39 do formulário, 87 da Agenda, com a caixa de consentimento da psicologia, e 9 da base);<br>- a verificação de tipos limpa, com as dependências reais;<br>- o build em servidor;<br>- a `/agendar` com o banco parado.<br><br>Medido por agentes:<br>- a fumaça por HTTP e no navegador;<br>- a régua sem falha nas 7 páginas;<br>- 34 de 35 mutações derrubadas;<br>- 116 verificações contra cada banco, com três defeitos achados e corrigidos (`modulos/README.md`, seção 8) |
| Galeria, funcionalidades do ofício, relatório de acessos, peça-assinatura, 3D | **Especificação** (`producao/esteira/14-funcionalidades/`), sem código no kit | Constrói-se pela receita de ilha (`04-construcao.md`, seção 4) |
| O processo inteiro, do zero, por um agente sem o repositório do Atlas | **Executado uma vez** (08.10.2026: odontologia, no Completo, até a etapa 7) | A régua APROVA 14 de 14; o `pronto` aprova; 42 testes, 19 fluxos e 10 casos de teclado. As 44 lacunas que ele achou foram corrigidas no kit (`atlas--relatorio--2026-10-08.md`, seção 7.7), e o site ficou como referência (`referencias/odontologia-completo/`) |
| O processo inteiro num cliente real | **Nunca executado** | O piloto mede (`producao/esteira/01-processo.md`, seção 3) |

## 5. O que ainda depende de decisão ou de terceiro

Desde a ratificação de 08.10.2026, as regras de produção estão decididas, e as dependências necessárias (`nodemailer`, `mysql2`) estão aprovadas. Fica:

| O quê | Por quê | Onde |
|---|---|---|
| A forma do símbolo de acessibilidade e o texto do aviso de privacidade | Leitura de leigo, A CONFIRMAR com advogado | `base/components/simbolos.tsx`; `base/conteudo/legal.ts`; `esteira/17-conformidade-e-normas.md`, seção 10 |
| O consentimento na marcação da saúde e a prova dele | A leitura cautelosa está aplicada (a caixa da psicologia); A CONFIRMAR com advogado | `esteira/17-conformidade-e-normas.md`, seção 10, item 10 |
| O primeiro site de cliente estático no ar | O `.htaccess` gerado nunca foi publicado; o que é [NV] se confere no primeiro | `esteira/18-publicacao-e-manutencao.md`, seção 3 |
| O limite mensal de alterações por plano | Não há proposta: não se promete nem se conta até a decisão dos sócios | `esteira/18-publicacao-e-manutencao.md`, seção 7 |
| A implantação da integração contínua | Ratificada como plano, com a ordem de adoção; nada implantado | `qualidade/13-integracao-continua.md`, seção 9 |
| A Presença | O módulo existe, mas a função não tem titular desde 30.09.2026 (ata v3.0, VI, item 10) | `esteira/14-funcionalidades/06-presenca.md` |
| O que ficou fora da ratificação | O que é da sociedade, do comércio ou do próprio site do Atlas | `esteira/99-rastreabilidade.md`, seção 5 |

## 6. A revisão do kit (08.10.2026)

Um agente novo, sem histórico, simulou três pedidos só com os documentos:
- um exemplo de nutrição;
- a psicóloga no Essencial com a Agenda;
- o depósito no Profissional.

O veredito dele: **nenhum chegava ao site publicado sem improviso**. Ele achou 34 pontos, todos tratados. Os principais:
- **os módulos sem README**;
- **os gestos do Spell UI** só no repositório do Atlas: agora em `gestos/`;
- **o mapa do bairro** sem método executável: agora `gerar-mapa`;
- **o exemplo** sem briefing fictício nem caminho até a vitrine;
- **a rota da sessão** depois do `novo-site`;
- **a porta do rascunho** mais fraca que a da qualidade: agora os nove itens;
- **o leitor do briefing**, que perdia 4 campos ●;
- **o carimbo de fábrica** só num modo;
- **a contradição entre a psicologia e a Agenda** no consentimento: resolvida pela leitura cautelosa e levada ao advogado;
- **a coleta sem o CNPJ do Atlas**, avisada já na entrada;
- **o `noindex` do rascunho** no modo servidor.

Refeito o teste de ponta a ponta, apareceu um defeito novo: o site gerado não compilava, porque o TypeScript lia os módulos guardados em `producao/`. O `tsconfig` da base passou a excluir a pasta do kit (hoje, só `producao/`, que leva a esteira e a qualidade dentro; e o CSS também a exclui, desde 08.10.2026). A lista completa, com a correção de cada ponto, está no relatório (`atlas--relatorio--2026-10-08.md`).

## 7. O que a produção mudou fora desta pasta

No repositório do Atlas, onde o kit é mantido:

| Onde | O quê | Por quê |
|---|---|---|
| `web/ferramentas/regua/regua.mjs` (idêntico a `qualidade/regua/regua.mjs`) | A calibração n.º 12 (o `HEAD` do Next no export estático, relatado como abortado) e a n.º 13 (o teto de fontes do site do Atlas, de 60 para 90 KB, com as fontes do site de 28/08) | A regra é corrigir a régua e registrar (`qualidade/02-regua.md`, seções 6 e 9) |
| `.claude/commands/novo-site.md` | A cópia de `claude/novo-site.md` | O comando de entrada no Atlas |
| `ordens/`, na raiz do repositório do Atlas | As ordens de cada site criado, fora do kit | Dados de clientes: a pasta do kit vai inteira para cada projeto, e as ordens não podem ir junto |
| `CLAUDE.md`, `AGENTS.md`, `README.md`, `documentacao/atlas--decisoes.md`, a ata v3.0 | O kit em `producao/`, com a esteira e a qualidade dentro; a ratificação; as dependências aprovadas | A fonte vigente diz onde a norma mora |
| Os documentos do `web/` | Os caminhos da esteira e da qualidade, agora em `producao/` | A pasta mudou de lugar em 08.10.2026 |

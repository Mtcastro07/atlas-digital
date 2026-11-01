# Esteira de produção do Atlas Digital · v3

> **O que é.** O manual completo para fazer um site do Atlas — de cliente ou de exemplo — do briefing à manutenção. Mora dentro do kit de produção (`producao/`), que se **copia inteiro para um projeto vazio**, e é lido pelo Claude Code antes da primeira linha de código: cada documento diz o que fazer, como fazer, como conferir e **por quê**. Nada aqui depende de conversa anterior.
>
> **Origem.** Reformulada do zero em 08.10.2026, a pedido do usuário ("reformule do zero a esteira de produção... crie uma pasta com documentos md que sirvam exatamente para que, em um novo repositório, você leia cada um dos requisitos e do processo, para que você crie o novo site"). Substitui a ESTEIRA v2.1 (`documentacao/atlas--esteira-norma-producao.md`, no repositório do Atlas), que fica só como registro. Reúne tudo o que se aprendeu de 30.08 a 08.10.2026:
> - as onze análises de nicho, com 46 sites de referência medidos;
> - a construção do site do Atlas e dos três sites de exemplo em Next.js;
> - a régua do Next.js e a calibração dela;
> - a pesquisa sobre o Awwwards e os sites premiados de cada nicho;
> - os estudos sobre sites com "cara de IA";
> - o padrão de design;
> - as normas dos conselhos conferidas no texto primário;
> - a arquitetura da Agenda, do formulário e do relatório de acessos;
> - o `shadcn create` e a base de produção.
>
> **Estado.** RATIFICADA em 08.10.2026, a pedido do usuário ("Faça a ratificação completa da esteira de produção"), com a qualidade e o resto do kit (ata v3.0, VI, itens 14 a 17). Fica fora da ratificação o que é da sociedade, do comércio ou do próprio site do Atlas, e o que depende de terceiro (A CONFIRMAR): cada item diz o seu estado e a fonte.
>
> **A qualidade tem pasta própria:** `producao/qualidade/` — como entender um projeto, testá-lo e atacar as falhas. As duas pastas se leem juntas.
>
> **O kit em volta (desde 08.10.2026):** esta pasta mora em `producao/`, com a qualidade (`../qualidade/`) e o caminho executável do pedido ao site (`../README.md`):
> - o protocolo de entrada;
> - o roteiro da sessão;
> - a base de código compilada e aprovada pela régua;
> - as ferramentas;
> - os módulos;
> - os gestos;
> - o catálogo de componentes de terceiros, com a licença conferida para site vendido (desde 13.10.2026);
> - os comandos do Claude Code;
> - um exemplo resolvido.
>
> A esteira diz o que e por quê; a qualidade, como provar; o resto do kit, como fazer e com o quê.
>
> **Por que a ESTEIRA v2.1 fica só como registro.** Ela descrevia o HTML estático de arquivo único, três versões por nicho e o 3D em WebGL vedado, o contrário do que se produz hoje: Next.js, um site de exemplo por nicho no plano de referência dele e o 3D permitido no Completo, sob cinco condições (`09-movimento.md`, seção 7). A ata v2.1, paralela à v3.0 (`juridico/atlas--ata-de-decisoes-v2-1-conversa-origem--2026-09-30.md`, no repositório do Atlas), dizia o mesmo ("HTML estático em arquivo único" e "três versões por nicho, uma por plano") e leva, desde 08.10.2026, a nota de documento superado e a marca "Superado" nessas linhas, com remissão à ata v3.0 e a esta esteira. Cada lição da v2.1 que continua válida entrou aqui, com a fonte (`99-rastreabilidade.md`, seção 2).

---

## 1. Como usar num projeto novo

**O caminho normal (desde 08.10.2026):** a pasta `producao/` inteira vai para um projeto vazio, e o Claude Code começa por `producao/README.md`. Ela leva esta esteira, a qualidade, a base, as ferramentas, os módulos, os gestos, os comandos e o exemplo. O `node producao/ferramentas/novo-site.mjs ordem.json` monta o site ali mesmo, ao lado da pasta:
- a base de código, na raiz;
- a régua portada (`ferramentas/regua/`);
- os documentos do projeto, preenchidos dos modelos (`CLAUDE.md`, `briefing.md`, `identidade.md`, `decisoes.md`, `conteudo/ROTEIRO.md`);
- os comandos do Claude Code (`.claude/commands/`);
- a pasta dos relatórios de QA (`registros/`).

**A pasta `producao/` fica como veio:** é a biblioteca do projeto. Uma versão nova do kit entra trocando a pasta inteira, e nada do cliente mora dentro dela.

Os passos abaixo são o que o `novo-site` faz e o que se faz à mão sem ele (`../00-do-pedido-ao-site.md`; `../02-ordem-de-producao.md`).

1. **Copie a pasta `producao/`** para a raiz do projeto vazio.
2. **Copie a base** (o conteúdo de `producao/base/`) para a raiz e porte a régua: `node producao/ferramentas/portar-regua.mjs .`.
3. **Copie** `producao/esteira/modelos/claude-do-projeto.md` para a raiz e preencha o cabeçalho (cliente, nicho, plano, módulos). A base já traz o `AGENTS.md` vazio, que tem de existir antes do primeiro `npm run dev`: o modelo o importa, e sem ele o Next grava o próprio bloco dentro do `CLAUDE.md` (`01-processo.md`, etapa 2).
4. **Preencha** `producao/esteira/modelos/briefing.md` com o que o sócio do briefing trouxe e salve-o como `briefing.md` na raiz. **Briefing incompleto interrompe** (`02-briefing.md`).
5. **Leia, nesta ordem:**
   1. `00-principios.md`: o que nunca se negocia.
   2. `01-processo.md`: as etapas, as portas e os prazos.
   3. `03-planos.md`: as seções 1 e 2 (a escada, onde roda, a fotografia, os prazos), a do plano contratado e as seções 6, 7 e 9 (o que nenhum plano faz, o pedido misto, o aceite).
   4. `nichos/<nicho>.md`: as normas, a estrutura, as funcionalidades e a direção de arte do ramo.
   5. `19-o-padrao-atlas.md`: o nível que todo site alcança, o mundo da marca, as cenas, a cor, a interface, a unicidade e o método de construção; e `20-repeticao-dentro-do-site.md`: nenhum efeito nem molde em série dentro do site, e a contagem que o prova. Depois, `04-direcao-de-arte.md`, `05-tipografia.md`, `06-cor-forma-e-superficie.md`, `07-composicao.md`, `08-imagem-e-fotografia.md`, `09-movimento.md`, `10-texto-e-conteudo.md`: como desenhar.
   6. `11-anti-ia.md` e `12-inspiracao-e-referencias.md`: como fugir do genérico e onde buscar o melhor.
   7. `13-tecnologia-e-estrutura.md` e `14-funcionalidades/`: como construir. Depois, para trazer as peças de terceiros, o catálogo do kit (`../componentes/README.md`).
   8. `15-desempenho.md`, `16-acessibilidade.md`, `17-conformidade-e-normas.md`: os limites.
   9. `18-publicacao-e-manutencao.md`: como entregar e manter; e `21-busca-e-ias.md`: como todo site, em todo plano, aparece nas buscas e nas respostas de IA (o que a base já faz, o que se confere na publicação e o que depende do dono).
   10. `producao/qualidade/README.md` e o que ele indicar: como provar que está certo.
6. **Registre a identidade** em `identidade.md` (modelo em `producao/esteira/modelos/identidade.md`) **antes** de escrever componentes.
7. **Construa, verifique e entregue** seguindo `01-processo.md`.

**Ordem de leitura por situação:**

| Situação | Leia primeiro |
|---|---|
| Cliente novo | Tudo, na ordem acima |
| Site de exemplo de um nicho | `00`, `03` (o plano do nicho), `nichos/<nicho>.md`, `17` (selo de ficção e `noindex`), depois o resto |
| Manutenção mensal | `18-publicacao-e-manutencao.md`, `producao/qualidade/14-ciclo-de-qa.md`, o `identidade.md` e o `decisoes.md` do cliente; `21-busca-e-ias.md`, seção 8 (o aviso ao IndexNow das páginas que mudaram) |
| Pedido de mudança fora do escopo | `03-planos.md` (seção 7: pedido misto e mudança de plano) |
| Atualização de segurança em vários sites | `18-publicacao-e-manutencao.md` (seção de atualização em ondas) |

---

## 2. Mapa da pasta

| Arquivo | Do que trata |
|---|---|
| `00-principios.md` | Os princípios inegociáveis e o porquê de cada um |
| `01-processo.md` | As etapas, quem faz cada uma, as portas de passagem, os prazos e o que interrompe |
| `02-briefing.md` | O briefing: campos obrigatórios, por nicho, material visual, protocolo de fotos |
| `03-planos.md` | A hierarquia: Essencial, Profissional e Completo, eixo por eixo; os módulos; pedido misto; esforço |
| `04-direcao-de-arte.md` | A identidade própria: processo, tokens, unicidade entre clientes, peça-assinatura |
| `05-tipografia.md` | Fontes: escolha por nicho, licença, hospedagem, escala, espaçamento, carga |
| `06-cor-forma-e-superficie.md` | Paleta em OKLCH, contraste medido, cantos, sombras, texturas, degradês |
| `07-composicao.md` | Grade, hierarquia, primeira tela, leitura, medida da linha, ritmo |
| `08-imagem-e-fotografia.md` | Direção da foto, protocolo do celular, pedido ao fotógrafo, formatos, vídeo |
| `09-movimento.md` | Para que serve, tokens de duração e curva, camadas por plano, gestos, 3D, transições |
| `10-texto-e-conteudo.md` | Registro verbal, conteúdo tipado, metadados, microtexto, o que cada conselho veda no texto |
| `11-anti-ia.md` | O método para julgar se um site tem cara de gerado, e a disciplina para não gerar |
| `12-inspiracao-e-referencias.md` | Como buscar e estudar os melhores, sem copiar, e as referências por nicho |
| `13-tecnologia-e-estrutura.md` | A pilha, a estrutura do repositório, as convenções de código, os scripts, a regra de tecnologia nova |
| `14-funcionalidades/` | Cada funcionalidade: plano, nicho, objetivo e implementação |
| `15-desempenho.md` | Os orçamentos, como medir e as técnicas que os cumprem |
| `16-acessibilidade.md` | WCAG 2.2 AA como obrigação legal, e como cumprir |
| `17-conformidade-e-normas.md` | LGPD, cookies, imagem, conselhos, crédito, a porta de publicação |
| `18-publicacao-e-manutencao.md` | Hospedagem, domínio, publicação, manutenção mensal, atualização em ondas |
| `19-o-padrao-atlas.md` | O padrão Atlas (09.10.2026): o diagnóstico medido de seis sites, o mundo da marca, a página em cenas, as três estratégias de cor, a interface, a unicidade entre os sites, o que o plano restringe e o método (o andaime, o roteiro de cenas, as referências de código, a lapidação, o crítico de fora, a vitrine) |
| `20-repeticao-dentro-do-site.md` | A repetição dentro do site (14.10.2026): nenhum componente nem efeito em série, e depois nenhum molde de seção ou de cena; o mesmo efeito entre sites, liberado; a contagem por página na porta da mesa e no passe do celular; o estudo de 14 a 16.10.2026 nos sete sites, com as contagens, os vereditos dos críticos de fora e as lições |
| `21-busca-e-ias.md` | A busca e as respostas de IA em todo site, de qualquer plano (16.10.2026): o que cada robô faz e como tratá-lo, o `robots.txt` por tipo de site, o mapa do site com a data verdadeira, o título que diz o que se vende e onde, o JSON-LD do conteúdo visível, o texto que o robô lê, o `llms.txt` com a evidência honesta, o IndexNow depois de cada publicação, o que depende do dono e a linha da porta de publicação |
| `nichos/` | Um documento por nicho (doze) e o quadro comum |
| `modelos/` | Os modelos para o repositório novo: `CLAUDE.md`, briefing, identidade, decisões, roteiro de conteúdo, aviso de privacidade, declaração de acessibilidade, autorização de imagem |
| `99-rastreabilidade.md` | Onde cada estudo, medição e lição de 30.08 a 08.10.2026 entrou nesta esteira e na pasta de qualidade; a lista de conferência da entrega |

---

## 3. Convenções destes documentos

**Marcas de plano** (onde uma regra só vale para alguns):

| Marca | Significado |
|---|---|
| **[E]** | Essencial |
| **[P]** | Profissional |
| **[C]** | Completo |
| **[todos]** | Vale para os três (o padrão, quando não há marca) |
| **[ex]** | Só nos sites de exemplo (fictícios, com selo de ficção e `noindex`) |
| **[cli]** | Só nos sites de cliente |

**Marcas de evidência** (onde a regra se apoia em fonte externa):

| Marca | Significado |
|---|---|
| **[V]** | Verificado: fonte primária no próprio escopo, ou duas fontes independentes |
| **[FU]** | Fonte única ou secundária |
| **[NV]** | Não verificado: hipótese de trabalho |
| **[DIV]** | As fontes divergem: a regra adota a leitura mais cautelosa até o parecer indicado |

**Estado de uma regra:**

| Estado | Significado |
|---|---|
| **RATIFICADO** | Regra desta esteira, da qualidade ou da produção ratificada em 08.10.2026, a pedido do usuário. Até então, era PROPOSTA ou DECIDIDO · A RATIFICAR |
| **DECIDIDO** | Definido e registrado em ata ou no registro de decisões |
| **DECIDIDO · A RATIFICAR** | Definido, aguardando a reunião dos três sócios. Desde 08.10.2026, só fora da produção: a sociedade, o comércio, o site do Atlas |
| **PROPOSTA** | Recomendação ainda não decidida. Desde 08.10.2026, só fora da produção: as correções do site do Atlas e dos exemplos (`11-anti-ia.md`, seção 7.3) |
| **A CONFIRMAR** | Depende de um dado externo (o painel da Hostinger, um advogado, um preço) |

**Ratificação.** Em 08.10.2026, a pedido do usuário ("Faça a ratificação completa da esteira de produção"), a esteira, a qualidade e a produção foram ratificadas por inteiro: toda PROPOSTA e todo DECIDIDO · A RATIFICAR que é regra de produzir sites passou a RATIFICADO (ata v3.0, VI, itens 14 a 17, e a pilha, do item 11). O que ficou fora está em `99-rastreabilidade.md`, seção 5. No registro de decisões do Atlas, fora disso, DECIDIDO continua a significar decidido pelo sócio-diretor e registrado, sem a reunião dos três sócios.

**Forma de cada regra.** Sempre que couber:
- **Regra:** o que fazer.
- **Objetivo:** por que existe; uma regra sem motivo escrito é revogada por conveniência em seis meses.
- **Como fazer:** o passo concreto, com código quando ajuda.
- **Como conferir:** a medição, o teste ou a pergunta que prova que foi feito.
- **Varia por:** o plano ou o nicho que mudam a regra.

**Idioma e registro.** Português, impessoal e direto; termos técnicos em inglês só quando são nomes (de API, de propriedade CSS, de biblioteca).

**Números.** Valores com vírgula decimal (4,5:1; 1,5 MB); datas em dia.mês.ano.

**Referências entre documentos.** Caminhos relativos a esta pasta (`03-planos.md`, `nichos/barbearia.md`), à pasta irmã (`../qualidade/02-regua.md`) ou ao kit em volta (`../base/`). Caminhos a partir da raiz do projeto começam por `producao/` quando são do kit (`producao/qualidade/02-regua.md`) e não têm prefixo quando são do site (`conteudo/negocio.ts`, `briefing.md`). Quando um documento cita o **repositório do Atlas** (onde ficam as implementações de referência: o site do Atlas e os três sites de exemplo em `web/`), diz "no repositório do Atlas": esses caminhos não existem no repositório novo, e o código necessário está copiado no próprio documento — e, desde 08.10.2026, o que não cabia nos documentos está no kit em volta desta pasta (`../`, isto é, `producao/`). Lá estão:
- a régua portada (`../ferramentas/portar-regua.mjs`, de `../qualidade/regua/`);
- a base de código com as ferramentas de foto, de captura, de ícone, de mapa e de conferência (`../base/`);
- os gestos do Spell UI adaptados e o `components.json` (`../gestos/`);
- o catálogo de componentes de terceiros, com a licença conferida para site vendido, e o inventário da pesquisa (`../componentes/`);
- os módulos (`../modulos/`);
- os três sites de exemplo do Atlas em código, para estudo (`../referencias/sites-de-exemplo/`, gerado do `web/`): quando um documento cita `web/app/demos/`, `web/components/demos/`, `web/components/ilhas/demos/` ou `web/conteudo/demos/`, o mesmo caminho existe lá.

**Um projeto novo não precisa do acesso ao repositório do Atlas.** Só os controles do shadcn reescritos sobre elementos nativos (`13-tecnologia-e-estrutura.md`, seção 3.5), que nenhum plano exige, ainda vêm de lá.

---

## 4. Glossário

| Termo | Significado |
|---|---|
| **Plano** | Essencial, Profissional ou Completo: o que o cliente contratou (`03-planos.md`) |
| **Módulo** | Acréscimo vendido à parte: Agenda, Presença, Página adicional |
| **Nicho** | O ramo do cliente: um dos doze de `nichos/` |
| **Plano de referência do nicho** | O plano em que o site de exemplo do nicho é feito e que o vendedor recomenda primeiro |
| **Briefing** | O levantamento feito no estabelecimento pelo sócio de vendas, com os campos de `02-briefing.md` |
| **Briefing visual** | As cinco linhas de direção de arte (assunto, público, tarefa, três adjetivos, o elemento memorável) |
| **Identidade** | O conjunto de escolhas visuais e verbais próprio do cliente, registrado em `identidade.md` |
| **Gesto** | O movimento que assina a marca: o gesto do Spell UI da camada do plano (um gesto de marca, no ponto de decisão; `09-movimento.md`, seção 6) e, quando o nicho o define, o gesto do ofício (`nichos/<nicho>.md`, seção 6). Copiar e espera, do Profissional, são de utilidade, não de marca |
| **Peça-assinatura** | No Completo, o objeto que só esta marca tem: 3D, mapa do bairro, ilustração (`14-funcionalidades/08-peca-assinatura.md`) |
| **Funcionalidade sob medida** (ou **do ofício**) | A ferramenta do ramo que o plano inclui: nenhuma no Essencial, uma no Profissional, duas no Completo (ata v3.0, IV.2.1). Os dois nomes são sinônimos (`14-funcionalidades/07-funcionalidades-do-oficio.md`) |
| **Rascunho de 24 horas** | O primeiro site navegável, por endereço, em até 24 horas após o briefing completo (ata v3.0, IV.4) |
| **Endereço temporário** | O endereço `*.hostingersite.com` do próprio site, onde ficam o rascunho e as rodadas, com `noindex` (`18-publicacao-e-manutencao.md`, seção 6.2). A "homologação permanente" é outra coisa: um segundo web app, opcional |
| **Rodada** | Uma volta de ajustes pedidos pelo cliente; são duas, incluídas |
| **Régua** | A verificação automática dos dez blocos, no navegador, contra o build de produção (`../qualidade/02-regua.md`) |
| **Bloco** | Na régua, um dos dez grupos de verificação (`../qualidade/02-regua.md`, seção 5); no briefing, um dos onze grupos de campos (`02-briefing.md`, seção 2). Cite "régua, bloco N" ou "briefing, bloco N" |
| **Avaliação anti-IA** | O método para julgar se o site tem cara de gerado (`11-anti-ia.md`) |
| **Porta** | Uma verificação que impede a passagem para a etapa seguinte |
| **Ilha** | Componente de cliente (`"use client"`), o único lugar com estado e script |
| **Sistema do nicho** | A paleta, a tipografia e a forma estudadas para o ramo; ponto de partida do Essencial |
| **Tom** | O conjunto de tokens de cor de uma superfície (`data-tom`) |
| **Mesa** | A tela larga: 1280, 1440 e 1920 px na régua; "computador" no Lighthouse (`--preset=desktop`). São a mesma coisa |
| **Fuso de Niterói** | `America/Sao_Paulo`, também chamado "relógio de Niterói" e "fuso de São Paulo": toda conta de hora usa ele, nunca o fuso do aparelho (`14-funcionalidades/01-base-de-todo-site.md`, seção 5) |

---

## 5. Como manter esta esteira

- **Defeito novo** que reaparece em mais de um site vira regra aqui, com o objetivo e a data. Toda regra nasce de um defeito ou de uma medição.
- **Regra que dispara em não-defeito** volta para "aviso" até ser corrigida. Porta que acusa o que não é defeito ensina a ignorar portas.
- **Listas que envelhecem:** as marcas de IA, as referências premiadas e as versões de biblioteca. Revisão a cada trimestre (`11-anti-ia.md`, `12-inspiracao-e-referencias.md`, `13-tecnologia-e-estrutura.md`).
- **Mudança de tecnologia** só pela regra de `13-tecnologia-e-estrutura.md`, seção 9.
- **Mudança de regra ou de número:** a verificação é recursiva. Depois de mudar um valor, uma data ou uma regra, procure o mesmo fato nos outros documentos, por mais de um termo (o número, o nome da norma, a palavra-chave), e corrija todos no mesmo ato; rode o verificador de referências (`99-rastreabilidade.md`, seção 6) e registre a mudança no registro de decisões e, quando for decisão dos sócios, na ata (V e VI). **Objetivo:** a verificação de 08.10.2026 achou 45 contradições entre os documentos de origem e 26 divergências de fato (`99-rastreabilidade.md`, seções 3 e 6); uma regra dita de dois jeitos custa mais do que a própria regra. Pedido do usuário em 08.10.2026: ser recursivo, conferindo sempre se o estado atual da documentação está correto ou pode melhorar, e atualizar os documentos das atas.
- **Cada mudança** fica no registro de decisões do Atlas (`documentacao/atlas--decisoes.md`, no repositório do Atlas), com a razão.

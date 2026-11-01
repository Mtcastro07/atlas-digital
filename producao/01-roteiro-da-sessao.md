# 01 · O roteiro da sessão

> **Para que serve.** O processo da esteira (`producao/esteira/01-processo.md`), etapa por etapa, traduzido no que o Claude Code faz numa sessão: os comandos, os arquivos, a porta de cada etapa e quando parar. Começa no site montado pelo `novo-site` e termina no site publicado.
>
> **Quando ler.** A cada site, do começo ao fim, e sempre que uma etapa recomeçar. Os comandos do Claude Code (`claude/commands/`) seguem este roteiro.
>
> **Atualizado em:** 08.10.2026.

---

## 1. Antes de começar

| Precisa estar pronto | Como conferir |
|---|---|
| A máquina pronta: o Node 22, o npm e o Chrome | `node producao/ferramentas/conferir-ambiente.mjs` sem item que bloqueie; o que faltar, o usuário instala, pelo comando que ela imprime |
| O site montado pelo `novo-site` (`00-do-pedido-ao-site.md`, seção 7) | `CLAUDE.md`, `ordem.json`, `registros/` e `ferramentas/regua/` existem na raiz, ao lado de `producao/`; o "Estado" tem a linha da criação |
| As dependências instaladas | `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci`, com o sandbox desligado (rede) |
| A base compilando antes de qualquer mudança | `npm test` (9 testes) e `npm run build` sem erro |
| O Chrome instalado na máquina | A régua, as capturas e as fotos usam `channel: "chrome"` |
| O `briefing.md` com todos os campos ●: o recebido, no cliente; o fictício, no exemplo | O `novo-site` confere antes de criar (`--briefing`); o `npm run pronto` confere de novo |
| A sessão aberta **na raiz do projeto do site** | O Claude Code lê o `CLAUDE.md` do site e os comandos de `.claude/commands/` (`/proxima-etapa`), que aparecem com `/` a partir da sessão seguinte à criação; na mesma sessão, leia o arquivo do comando e siga. O repositório do Atlas só cria sites numa pasta nova |

**O ambiente:**
- **Sandbox desligado** (`dangerouslyDisableSandbox`) para tudo o que abre o Chrome ou usa a rede: `npm ci`, a régua, as capturas, as fotos, o `baixar-fonte`.
- **Porta 3100** para o servidor de medição. Se estiver ocupada, `lsof -nP -iTCP:3100 -sTCP:LISTEN` mostra por quê; nunca encerre um processo que você não iniciou sem perguntar.
- **Os servidores não retornam:**
  - `npm run estatico`, `npm run servidor` e `npm run dev` rodam **em segundo plano** (`run_in_background`), e a régua, noutro comando;
  - para parar o que esta sessão iniciou: `kill $(lsof -nP -tiTCP:3100 -sTCP:LISTEN)`, conferindo antes que o processo é o seu.
- **O que relê o build novo:**
  - o `servir.mjs` (estático) relê os arquivos que mudaram;
  - o `server.js` do standalone (`npm run servidor`) **não relê**: depois de cada `npm run build`, pare e suba de novo, ou a régua mede a versão velha.
- **Mede-se no build de produção**, nunca no `npm run dev`.

## 2. As etapas

O "Estado" do `CLAUDE.md` diz em que etapa o site está. Cada etapa só começa com a porta da anterior aberta.

### Etapa 2 · Abertura do repositório (o `novo-site` já fez)

- **Feito pelo `novo-site`:**
  - a base;
  - a régua portada;
  - `producao/esteira/`, `producao/qualidade/` e `producao/`;
  - os documentos do cliente;
  - os comandos;
  - o domínio, o contato, o plano e o modo de saída preenchidos;
  - a marca `[EXEMPLO]` no conteúdo de fábrica.
- **Falta:**
  1. `npm ci`;
  2. `npm test`;
  3. `npm run build`;
  4. `npm run estatico` (ou `PORT=3100 npm run servidor`, no modo servidor), em segundo plano;
  5. `npm run regua -- --base=http://localhost:3100`. **No exemplo,** ela aprova a base de fábrica. **No cliente,** reprova a conformidade em toda página enquanto o rodapé não tiver a razão social e o CNPJ (ou o nome completo e o registro). É o esperado, até a etapa 5.
  6. **O versionamento, só com pedido explícito** (`producao/esteira/18-publicacao-e-manutencao.md`, seção 2.1):
     - o repositório privado no GitHub, na conta do Atlas;
     - `git init -b main`;
     - o remoto;
     - mais tarde, o ramo `producao`, que a Hostinger publica.

     Sem pedido, o site fica sem git, e o "Estado" registra a pendência.
- **Porta:** o build passa, e a régua roda.

### Etapa 3 · Verificação normativa — `/normas`

- **Entra:** `producao/esteira/nichos/<nicho>.md` (normas e campos bloqueantes) e `producao/esteira/17-conformidade-e-normas.md`.
- **Faz:**
  1. Confere cada vedação e obrigação na **fonte primária**, com o endereço e a data.
  2. Preenche "Normas do conselho aplicadas" no `decisoes.md`.
  3. Nicho novo: escreve `producao/esteira/nichos/<nome>.md` pela estrutura de `producao/esteira/nichos/README.md`, seção 2, com [NV] em toda leitura própria.
- **Porta:** a lista existe, e nenhuma linha de texto foi escrita antes dela.
- **Pare e pergunte:**
  - **Dúvida central sem leitura escrita:** preço, imagem de paciente, antes e depois. Se o arquivo do nicho **já traz a leitura cautelosa** (o preço sóbrio da nutrição e da psicologia, por exemplo), aplique-a e registre, sem parar; pare só quando o nicho não resolve.
  - **Briefing incompleto:** o registro ou o responsável técnico ausentes.
  - **Saúde com a Agenda** (psicologia; e medicina, odontologia ou nutrição, se o nicho pedir): os dados mínimos e a caixa de consentimento (`producao/esteira/14-funcionalidades/05-agenda.md`, seção 12) se confirmam com Matheus Azevedo Abreu antes da construção.

### Etapa 4 · Direção de arte — `/direcao-de-arte`

- **Entra:**
  - o `briefing.md`: adjetivos, referências, fotos, logotipo;
  - a direção de arte do nicho;
  - `producao/esteira/04` a `09` e `11`;
  - `03-da-identidade-ao-codigo.md`.
- **Faz:**
  1. **O `identidade.md` completo**, pelo modelo: briefing visual, adjetivos com consequência, cinco referências, plano de design, o gesto do plano, **o acabamento**, **o roteiro de cenas da página inicial** (cada cena com a composição em esboço, o valor do fundo, o evento tipográfico, a imagem e o efeito: `producao/esteira/19-o-padrao-atlas.md`, seção 4) e, no Completo, a peça-assinatura. A página inicial da base é andaime: nada da composição dela fica (`19-o-padrao-atlas.md`, seção 8.1).
  2. **O teste do prompt parecido** (`producao/esteira/11-anti-ia.md`, passo 3), com as coincidências revistas.
  3. **A tradução em código** (`03-da-identidade-ao-codigo.md`):
     - os tokens em `app/identidade.css`, com o contraste anotado;
     - as fontes por `baixar-fonte`, em `app/fontes.ts`;
     - o `app/icon.svg`.
  4. **[P][C]** Os **painéis de estilo**, dois ou três, cada um com tipo, cor, textura e um botão, sem página (`producao/esteira/04-direcao-de-arte.md`), e o **teste de unicidade** contra os clientes do mesmo nicho e três concorrentes locais (`identidade.md`, seções 5 e 7).
  5. **As capturas a 1440 px** da página inicial com a identidade nova (`node ferramentas/fotografar.mjs`), para aprovar. As de 390 px são do passe do celular, na etapa 6 (`producao/esteira/00-principios.md`, seção 5).
- **Porta:** o `identidade.md` aprovado, com data e nome de quem aprovou. Quem decide é Matheus Castro Oliveira de Luna Garcia ou outro sócio de desenvolvimento; nunca Gabriel Ribeiro Ota Yida sozinho (`producao/esteira/01-processo.md`, seção 1). Também a avaliação anti-IA do plano, sem escolha por omissão sem motivo.
- **Pare e pergunte:** sempre, para a aprovação. Nenhum componente novo antes dela.

### Etapa 5 · Conteúdo — `/conteudo`

- **Entra:** o `briefing.md`, a lista de normas (etapa 3) e `producao/esteira/10-texto-e-conteudo.md`.
- **Faz:**
  1. **O `conteudo/ROTEIRO.md`:** as páginas do plano, dentro do limite, e cada fato com a sua origem no briefing.
  2. **Os textos reescritos** em `conteudo/*.ts`:
     - `negocio.ts`: razão social, CNPJ, endereço, coordenadas, registro, expediente, fechamentos, prazo de resposta, tipo do schema.org, faixa de preço;
     - `site.ts`: as páginas, os textos, a ação e a mensagem;
     - `legal.ts`: os blocos do aviso de privacidade que valem, e os do módulo, se houver.

     Apague a marca `[EXEMPLO]` de cada arquivo reescrito.
  3. **Os metadados por página:** "Página · Marca"; no início, "Marca · o que faz, onde".
  4. **`npm run pronto`:** as falhas que restarem são as do briefing ou da construção.
- **Porta:** cada fato tem origem; nenhum superlativo sem prova; as vedações aplicadas.

### Etapa 6 · Construção — `/construir`

- **Entra:** `04-construcao.md`, a estrutura de páginas do nicho e as funcionalidades do plano (`producao/esteira/14-funcionalidades/`).
- **Faz, em dois passes, nesta ordem, cada um com foco total, nunca os dois juntos** (`producao/esteira/00-principios.md`, seção 5). O "Estado" do `CLAUDE.md` registra o passe em curso.

  **Passe 1 · a mesa** (1440 px):
  1. **As páginas** do roteiro:
     - adaptar as de fábrica;
     - criar as novas pela receita;
     - apagar a marca `[EXEMPLO]` de cada página reescrita.
  2. **As funcionalidades do plano:** a do ofício, no Profissional e no Completo; a peça-assinatura e a segunda funcionalidade, no Completo.
  3. **Os módulos** (`modulos/README.md`): as dependências deles já estão aprovadas (o `nodemailer` e o `mysql2`, desde 08.10.2026).
  4. **As fotos:** por `preparar-fotos`, com o `alt` em `conteudo/`; sem foto, os substitutos (`producao/esteira/08-imagem-e-fotografia.md`).
  5. **O movimento da camada do plano** (`producao/esteira/09-movimento.md`), acabado na mesa.
  6. **A cada página:** `npm run build` e a conferência a 1440 px. O celular não se julga neste passe: o que é da mesa vai com o prefixo `lg:`, e o valor sem prefixo fica para o passe 2.
  7. **As rodadas de lapidação** (`producao/esteira/19-o-padrao-atlas.md`, seção 8.4): no mínimo três. Em cada uma, as capturas a 1440 px com o movimento normal, a vitrine ao lado, **o crítico de fora** (um agente novo, sem o histórico da construção, com as capturas e a seção 8.5) e as dez maiores distâncias corrigidas. O registro de cada rodada vai a `registros/lapidacao.md`.
  8. **A porta da mesa:** as capturas a 1440 px aprovadas (`node ferramentas/fotografar.mjs --movimento`), o teste da vitrine (lado a lado com o Atlas e o exemplo do mesmo plano: `producao/esteira/00-principios.md`, seção 9), a régua sem falha nas larguras de mesa e a avaliação anti-IA na mesa, a página chapada inclusive, com a contagem de cada efeito e de cada molde por página, sem nada em série (`producao/esteira/20-repeticao-dentro-do-site.md`, seção 3).

  **Passe 2 · o celular** (390 px), só depois da porta da mesa:
  1. **A tabela "O premium no celular"** do `identidade.md`: cada momento da mesa e a versão de toque dele (`producao/esteira/09-movimento.md`, seção 11).
  2. **As mesmas páginas, inteiras, no celular:** a disposição própria de cada peça (`producao/esteira/07-composicao.md`, seção 8), a versão de toque de cada momento, o vídeo e as fotos na versão do celular, o formulário com o teclado certo.
  3. **A cada página:** `npm run build` e a conferência a 390 px e no celular deitado (844 × 390). A mesa só se mexe para corrigir defeito; mexeu, reabre a porta dela.
  4. **As rodadas de lapidação no celular,** como na mesa, a 390 px: a assinatura na primeira tela, a versão de toque de cada momento, o crítico de fora.
  5. **A porta do celular:** as capturas a 390 px aprovadas, o teste da vitrine no celular, a régua inteira (as larguras de toque, o celular deitado e a barreira do travamento no aparelho médio, na passagem 2b) e a avaliação anti-IA no celular, com a contagem da série a 390 px.
- **Porta:** o build sem erro; as páginas do plano completas, com texto e fotos reais; as portas da mesa e do celular, nesta ordem.

### Etapa 7 · Verificação — `/verificar`

- **Antes:**
  - **Compilar e servir**, em segundo plano. No modo servidor, reinicie o `server.js` depois do build.
  - **Se a primeira tela mudou:** `capturar-compartilhamento`, e compilar de novo.
  - **Na primeira verificação do site:** o mapa do projeto e a matriz de risco (`producao/qualidade/00-entender-o-projeto.md`, seções 8 e 9).
- **A porta do rascunho:** os nove itens de `producao/qualidade/14-ciclo-de-qa.md`, seção 3. O que depende de pessoa fica "pendente", com o nome, no relatório.

  | # | Item | Como |
  |---|---|---|
  | 1 | A régua inteira, sem falha; cada aviso com decisão. A régua dos quadros sem falha, em duas sessões | `npm run regua -- --base=http://localhost:3100`; `node ferramentas/regua/quadros.mjs --base=http://localhost:3100 --pagina=<cada página>` |
  | 2 | A avaliação anti-IA, sem marca de peso alto | `node ferramentas/fotografar.mjs`; `producao/esteira/11-anti-ia.md`; `producao/qualidade/11-design-e-anti-ia.md`, seção 3 |
  | 3 | A lista de 22 itens | `producao/qualidade/11-design-e-anti-ia.md`, seção 5 |
  | 4 | As normas do nicho no texto, frase a frase | `producao/qualidade/10-conteudo-normas-e-texto.md`, seção 3 |
  | 5 | A tabela de afirmações: todo número com fonte | `producao/qualidade/00-entender-o-projeto.md`, seção 7; o `conteudo/ROTEIRO.md` |
  | 6 | A leitura do texto em voz alta, inteiro, no celular | Pessoa: decisão registrada |
  | 7 | [P][C] A funcionalidade do ofício, de ponta a ponta, com e sem script | `producao/qualidade/05-ponta-a-ponta.md` |
  | 8 | O roteiro de teclado e o roteiro curto do leitor de tela | `producao/qualidade/06-acessibilidade.md`, seções 4 e 5 |
  | 9 | O rascunho no endereço temporário, com `X-Robots-Tag: noindex, nofollow` | Etapa 8 |

- **E também:**
  - `npm test`;
  - `npm run pronto` (no exemplo, com `-- --exemplo`);
  - `npm audit --omit=dev`, sem vulnerabilidade alta na árvore de produção (`producao/esteira/18-publicacao-e-manutencao.md`, seção 2);
  - a revisão de sentido (`producao/esteira/01-processo.md`, etapa 7): erro de domínio, erro estético, ferramenta magra.
- **O Lighthouse** no protocolo de `producao/qualidade/08-desempenho.md` entra antes da **publicação** (`producao/esteira/03-planos.md`, seção 9).
- **O relatório de QA:** `registros/relatorio-de-qa--rascunho--<aaaa-mm-dd>.md` (modelo: `producao/qualidade/modelos/relatorio-de-qa.md`; gabarito: `producao/exemplo/`).
- **Porta:** os itens que bloqueiam, verdes. Sem isso, o rascunho não sai.

### Etapa 8 · Rascunho de 24 horas — `/publicar rascunho`

- **Só com pedido explícito.**
- **Faz:**
  1. **Estático:** `RASCUNHO=1 npm run build`, que grava o `X-Robots-Tag` no `.htaccess`, e envio pela seção 3.3 de `producao/esteira/18-publicacao-e-manutencao.md`.
  2. **Servidor:** o web app (seção 2 de lá), com `SITE_HOMOLOGACAO=1` nas variáveis. A base manda o `X-Robots-Tag` com ela ligada (`next.config.ts`); na virada do domínio, desliga-se.
  3. **A conferência no endereço temporário.**
  4. **O vínculo** para Gabriel Ribeiro Ota Yida enviar.
- **Porta:** é um rascunho navegável, não o site publicado.

### Etapa 9 · Rodadas — `/rodada <pedido>`

- Duas rodadas incluídas.
- Cada pedido:
  - vai para o `decisoes.md`;
  - o que excede o plano é orçado antes (Página adicional, funcionalidade, módulo);
  - o que fere a norma é recusado com o artigo.
- A régua roda a cada rodada.
- **Porta:** o cliente aprova por escrito (mensagem basta), e a régua passa.

### Etapa 10 · Conformidade — `/conformidade`

- A porta de `producao/esteira/17-conformidade-e-normas.md`, seção 9, item por item, com a prova.
- Quem confere: Matheus Azevedo Abreu.
- **Porta:** todos os itens marcados; o que depender do advogado fica pendente, com data.

### Etapa 11 · Publicação — `/publicar site`

- **Só com pedido explícito.**
- **Antes:**
  - a reavaliação anti-IA com o texto e as fotos finais;
  - `npm run pronto` sem falha.
- **Publicar:** pelo modo do `CLAUDE.md`.
- **Conferir no ar** (`producao/esteira/18-publicacao-e-manutencao.md`, seção 5):
  - os cabeçalhos e a compressão (`curl -sI`);
  - o `www` e o HTTP;
  - a 404;
  - o cartão do WhatsApp;
  - a régua contra o endereço real;
  - a busca e as IAs, em todo plano: o `robots.txt`, o mapa do site, o `llms.txt` e o `texto-do-robo`; no cliente, o IndexNow e a lista do dono (seções 5, itens 16 a 20, e 5.1 de lá; `producao/esteira/21-busca-e-ias.md`).
- **Porta:** a conferência sem falha. A segunda parcela é cobrada aqui.

### Etapa 12 · Entrega (comercial)

Gabriel Ribeiro Ota Yida e Matheus Azevedo Abreu. O Claude Code só prepara o resumo do que foi entregue, se pedido. Na Condição de Fundação, o estudo de caso começa aqui, com número verificável.

### Etapa 13 · Manutenção — `/manutencao <mudança>`

- **A mudança:** em `conteudo/` ou em `public/`.
- **Antes de ir ao ar:** `npm test`, `npm run build`, `npm run pronto` e a régua.
- **O registro:** no `decisoes.md` e no "Estado".
- **A publicação:** só com pedido.

## 3. O relógio das 24 horas

O tempo de referência (`producao/esteira/01-processo.md`, seção 3), contado do `briefingCompletoEm`. **Nunca foi cronometrado num cliente real:** mede-se no piloto, e esta tabela se corrige.

| Hora | Etapa | Saída |
|---|---|---|
| H0 a H+1 | 2 | O repositório compilando, com a régua rodando |
| H+1 a H+3 | 3 e 4 (proposta) | As normas e o `identidade.md` proposto |
| H+3 a H+4 | 4 (aprovação) | A identidade aprovada |
| H+4 a H+6 | 5 e fotos | O `conteudo/` e as fotos preparadas |
| H+6 a H+16 | 6 | O site do plano compilando |
| H+16 a H+20 | 7 | A régua e o `pronto` sem falha; anti-IA; o relatório |
| H+20 a H+22 | 8 | O rascunho no endereço temporário |
| H+22 a H+24 | 8 (envio) | O vínculo com o cliente |

## 4. Os comandos e as ferramentas

| Comando | Quando | Sandbox |
|---|---|---|
| `npm ci` | Uma vez, depois do `novo-site`; com `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` | Desligado (rede) |
| `npm run dev` | Para ver uma mudança; **nunca para medir** | — |
| `npm run build` | Antes de toda medição; roda o TypeScript; o `postbuild` grava o `.htaccess` (estático) ou prepara o standalone (servidor) | — |
| `npm run estatico` | Serve `out/` na 3100, comprimido e com os cabeçalhos do `.htaccess`. Em segundo plano: não retorna | Desligado, para o Chrome acessar a porta |
| `SAIDA=servidor npm run build && PORT=3100 npm run servidor` | O modo servidor (formulário, Agenda): o `server.js` do standalone, como a Hostinger o roda. Em segundo plano; reinicie a cada build. O `SAIDA` só é preciso quando o padrão do `next.config.ts` é o estático | — |
| `npm run regua -- --base=http://localhost:3100` | A régua (`producao/qualidade/02-regua.md`): ~45 s em 5 páginas | Desligado |
| `npm test` | Os testes de unidade (base e módulos) | — |
| `npm run pronto` | A conferência de conteúdo antes do rascunho e da publicação | — |
| `node ferramentas/baixar-fonte.mjs "<Família:wght@400..700>" titulo\|texto` | Na direção de arte | Desligado (rede) |
| `node ferramentas/preparar-fotos.mjs <foto> <nome> [--proporcao=3:2] [--larguras=...] [--topo=0.5]` | A cada foto | Desligado (Chrome) |
| `node ferramentas/capturar-compartilhamento.mjs` | Sempre que a primeira tela mudar; depois, compilar de novo | Desligado (Chrome) |
| `npm run paleta` | O contraste dos pares de cor da identidade, antes de construir | Desligado (Chrome) |
| `node ferramentas/gerar-icones.mjs` | O `apple-icon.png` e o `favicon.ico`, do `icon.svg` | Desligado (Chrome) |
| `node ferramentas/gerar-mapa.mjs [--lat --lon --raio]` | O mapa do bairro do OpenStreetMap (`--sem-mapa` grava o componente vazio) | Desligado (rede) |
| `node ferramentas/fotografar.mjs` | As páginas a 390 e a 1440 px, em `material/capturas/` | Desligado (Chrome) |
| `node producao/ferramentas/portar-regua.mjs .` | Quando a régua do Atlas mudar: porta de novo, sem editar à mão | — |

## 5. O relatório de cada etapa

Ao fim de cada etapa, a resposta ao usuário traz, nesta ordem:
1. **O que foi feito:** os arquivos e as seções, com o caminho.
2. **As medidas:** a régua (falhas e avisos), o `pronto`, os testes, o script e as fontes em KB, com o antes e o depois quando houver.
3. **O que ficou pendente,** e de quem depende: do briefing, do advogado, da aprovação, de uma dependência.
4. **A porta:** aberta ou fechada, e por quê.
5. **A etapa seguinte** e o comando dela.

E duas linhas gravadas:
- uma no "Estado" do `CLAUDE.md`: data, etapa, resultado;
- as decisões não óbvias no `decisoes.md`.

## 6. Quando algo dá errado

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| A régua acusa `script 457 KB` e `ERR_CONNECTION_RESET` | O site servido pelo `python3 -m http.server`, que não comprime e recusa conexões em paralelo | Sirva com `npm run estatico` (`ferramentas/servir.mjs`) |
| A régua mede uma versão antiga | O servidor antigo continua na porta, ou o build não rodou | `npm run build` antes; o `servir.mjs` relê os arquivos que mudaram. Confira com `curl` o HTML servido |
| `ERR_ABORTED` em `HEAD` de cada vínculo | O `HEAD` de conferência do Next no export estático; o Playwright o relata como abortado | Já não conta, desde a calibração 12 (`producao/qualidade/02-regua.md`, seção 6). Se aparecer, a régua do site é anterior: porte de novo |
| Rolagem lateral a 320 px com um botão "saindo da tela" | Duas classes de `display` na mesma variante (`hidden` e `inline-flex`) | O display num invólucro (`components/README.md`) |
| O marca-texto vira um traço vertical | A marcação quebrou de linha | `.marca-texto` é `inline-block` e `nowrap`: marque no máximo duas ou três palavras |
| `TS5097: import path can only end with '.ts'` | Falta `allowImportingTsExtensions` no `tsconfig.json` | Já vem na base; não tire |
| O build falha com "WhatsApp fora do formato" | O número em `conteudo/contato.ts` | Só algarismos, com o 55 e o DDD |
| O `gerar-htaccess` falha com o domínio | O domínio em `conteudo/contato.ts` com `www` ou `https://` | Só o domínio |
| O Chrome não abre (régua, fotos, capturas) | O sandbox do Claude Code | Rode com o sandbox desligado |
| O `npm run pronto` acusa `[EXEMPLO]` | Arquivo de fábrica não reescrito | Reescreva pelo briefing e apague a marca. Nunca apague a marca sem reescrever |
| A fonte baixada não tem o peso que o título usa | A faixa pedida ao `baixar-fonte` | Peça a faixa variável que cobre os pesos usados; o CSS usa `font-synthesis-weight: none`, e o navegador não inventa negrito |

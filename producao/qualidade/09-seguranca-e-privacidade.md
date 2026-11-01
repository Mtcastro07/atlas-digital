# 09 · Segurança e privacidade

> **Para que serve.** Como conferir que um site do Atlas é seguro e cumpre a promessa de privacidade: nada gravado no aparelho, nada enviado para fora, cabeçalhos certos, formulário e Agenda protegidos sem terceiros, segredos fora do código, dependências sob controle, e o que fazer num incidente. O **que** a lei exige está em `../esteira/17-conformidade-e-normas.md`; **como construir** o formulário e a Agenda, em `../esteira/14-funcionalidades/02-formulario.md` e `../esteira/14-funcionalidades/05-agenda.md`. Aqui está a verificação.
>
> **Estado.** Nada gravado e nenhum pedido externo, na régua: DECIDIDO. Os cabeçalhos estão em vigor no repositório do Atlas desde 03.10.2026, no `next.config.ts`. A árvore de produção não tinha vulnerabilidade conhecida em 03.10. O resto é RATIFICADO.

---

## 1. O que pode dar errado

Um site de bairro não é alvo de ataque dirigido. É alvo do **automático**: robôs que enchem formulários, varreduras que procuram painéis e segredos expostos, pacotes comprometidos na cadeia de dependências. E é alvo do **próprio descuido**: o rastreador acrescentado "só para ver os acessos", a variável secreta com prefixo público, o cabeçalho que a hospedagem não manda.

| Risco | Exemplo | Dano | Onde se confere |
|---|---|---|---|
| Promessa de privacidade quebrada | Um script de análise, uma fonte do Google, um vídeo incorporado | Argumento de venda falso; banner obrigatório; dado do visitante fora do país | Régua, bloco 5 (seção 2) |
| Cabeçalho ausente no servidor | A Hostinger não repassa a política de conteúdo | Página embutível por terceiro; script injetado sem barreira | Seção 3 |
| Formulário ou Agenda abusados | Robô enchendo a caixa do cliente; marcação falsa em massa | O cliente para de ler os avisos; a agenda fica inútil | Seção 5 |
| Dado pessoal vazado | Banco exposto; registro de erro com telefone; painel sem senha forte | Incidente comunicável à ANPD; dano ao cliente e ao titular | Seções 5, 6 e 9 |
| Segredo no código | Senha do SMTP no repositório; `NEXT_PUBLIC_` numa chave | Conta de e-mail usada para spam; banco aberto | Seção 6 |
| Dependência comprometida | Um pacote do npm ou uma ação do GitHub alterada | Código de terceiro rodando no servidor ou no navegador do visitante | Seção 7 |
| Falha crítica na pilha | A falha crítica dos componentes de servidor do React (CVE-2025-55182, dezembro de 2025, https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components) [V] | Execução de código no servidor | Seção 7 (atualização de emergência) |

---

## 2. Nada gravado, nada enviado

**Regra.** O site público não grava nada no aparelho (nenhum cookie, `localStorage` ou `sessionStorage`) e não faz nenhum pedido a outro domínio.

**Objetivo.** "Zero cookie e zero rastreador" é argumento de venda do Atlas e dispensa o banner de cookies. Só vale se for **medido**, toda vez (`../esteira/17-conformidade-e-normas.md`, seção 6).

**Como conferir.**

| Verificação | Instrumento | Quando |
|---|---|---|
| Cookie e armazenamento depois da carga e da rolagem até o fim | Régua, bloco 5 | Toda rodada |
| Cookie e armazenamento **depois de usar** cada funcionalidade | A página vigiada dos testes de ponta a ponta: acrescente ao fim de cada fluxo `expect(await context.cookies()).toEqual([])` e a contagem do armazenamento | Com os testes de fluxo |
| Pedido a outro domínio | Régua (falha) e a página vigiada (intercepta e reprova) | Toda rodada |
| Violação da política de conteúdo | Régua: vigia `securitypolicyviolation` instalado antes de qualquer script | Toda rodada |
| `localStorage`, `sessionStorage`, `document.cookie` no código | Lint (`03-estatica.md`, seção 2) | A cada edição |

**A exceção única.** O cookie de sessão do painel da Agenda: `HttpOnly; Secure; SameSite=Lax; Path=/painel`, com validade de horas, **só na área restrita** (`../esteira/17-conformidade-e-normas.md`, seção 5.5). O teste:
1. Entra no painel.
2. Volta ao site público.
3. Confere que o cookie não vai nos pedidos das páginas públicas, graças ao `Path=/painel`, e que nenhum outro foi criado.

**Limite conhecido da régua.** Ela confere o aparelho depois da carga e da rolagem, sem clicar em nada. Um gravador acionado só por um clique passaria. É por isso que a verificação depois de cada fluxo existe.

---

## 3. Os cabeçalhos

**Regra.** Toda resposta do site leva os cabeçalhos de segurança abaixo, conferidos **no endereço publicado** a cada publicação.

Os do repositório do Atlas (`next.config.ts`, desde 03.10.2026), o modelo para todo site:

| Cabeçalho | Valor | Para quê |
|---|---|---|
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self' https://<domínio> https://*.<domínio>` | Nada de fora carrega; o site só pode ser embutido pelo próprio domínio |
| `Strict-Transport-Security` | `max-age=31536000` (sem `includeSubDomains`: nem todo subdomínio está garantido em HTTPS) | O navegador nunca mais tenta o HTTP |
| `X-Content-Type-Options` | `nosniff` | O navegador não adivinha o tipo do arquivo |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | O endereço completo não vaza para outros sites |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` | Nenhuma página pede esses acessos |
| `Cross-Origin-Opener-Policy` | `same-origin` | A janela aberta por outro site não alcança esta |
| (sem `X-Powered-By`) | `poweredByHeader: false` | Não anunciar a pilha |

**Por que `'unsafe-inline'`.** As páginas são estáticas. O Next embute os dados da página em `<script>` e o React escreve atributos `style`. A política com `nonce` exigiria renderizar toda página a cada pedido, e o site perderia o HTML pronto e rápido. O caminho a investigar é a política por **hash**, com a opção experimental de integridade de sub-recursos do Next (`experimental.sri`), compatível com página estática [FU]. Fica RATIFICADO, a medir antes de adotar. Mesmo com `'unsafe-inline'`, nenhum script de fora carrega e nada é enviado para fora.

**Como experimentar** (num ramo, nunca direto na `main`):
1. Ligue a opção no `next.config.ts`, conforme a documentação da versão instalada [NV].
2. Compile e confira no HTML gerado os atributos `integrity` nos `<script>`.
3. Monte a política sem `'unsafe-inline'` no `script-src`, com o que a documentação do Next indicar para os scripts embutidos.
4. Rode a régua inteira, em que cada violação da política é falha, e os testes de ponta a ponta. Nenhuma página pode quebrar, inclusive as de erro e os sites de exemplo.
5. Meça o script inicial antes e depois (régua, bloco 5).
6. Registre o resultado em `decisoes.md`, com a decisão dos sócios.

**Como conferir** (um script, sem dependência; roda contra o build local e contra o endereço publicado):

```js
// ferramentas/verificar-cabecalhos.mjs — node ferramentas/verificar-cabecalhos.mjs https://<domínio>
const base = process.argv[2] ?? "http://localhost:3000";
const ESPERADOS = {
  "content-security-policy": /default-src 'self'.*object-src 'none'.*frame-ancestors/,
  "x-content-type-options": /^nosniff$/,
  "referrer-policy": /^strict-origin-when-cross-origin$/,
  "permissions-policy": /camera=\(\)/,
  "cross-origin-opener-policy": /^same-origin$/,
  ...(base.startsWith("https:") ? { "strict-transport-security": /max-age=\d{7,}/ } : {}), // só vale sob HTTPS
};
let falhas = 0;
for (const caminho of ["/", "/nao-existe", "/robots.txt"]) {
  const resposta = await fetch(base + caminho, { redirect: "manual" });
  // A CDN da Hostinger pode responder a pedido fora do navegador com uma página de verificação
  // (../esteira/15-desempenho.md, seção 4.7): os cabeçalhos seriam os dela, não os do site.
  const corpo = await resposta.text();
  if (caminho === "/" && !/<html[^>]*lang="pt/.test(corpo)) {
    console.error("/: a resposta não parece o site (verificação da CDN?); confira no navegador");
    falhas++;
  }
  for (const [nome, padrao] of Object.entries(ESPERADOS)) {
    const valor = resposta.headers.get(nome);
    if (!valor || !padrao.test(valor)) {
      console.error(`${caminho}: ${nome} = ${valor ?? "(ausente)"}`);
      falhas++;
    }
  }
  if (resposta.headers.get("x-powered-by")) {
    console.error(`${caminho}: x-powered-by presente`);
    falhas++;
  }
}
process.exitCode = falhas ? 1 : 0;
```

**Também no endereço publicado** (a lista inteira da conferência depois de publicar está em `../esteira/18-publicacao-e-manutencao.md`, seção 5):

| Verificação | Comando | O certo |
|---|---|---|
| HTTP leva ao HTTPS | `curl -sI http://<domínio>/` | Redirecionamento permanente (`301` ou `308`) com `location: https://…`. Quem faz é a hospedagem: confira que a opção de forçar o HTTPS está ligada no painel |
| `www` converge | `curl -sI https://www.<domínio>/` | `308` para o domínio raiz no web app Node (`next.config.ts`); `301` no estático (`.htaccess`) |
| O endereço temporário da Hostinger | `curl -sI https://<temporário>.hostingersite.com/` | Depois da virada do domínio, redireciona para o domínio (`SITE_NO_DOMINIO=1`) |
| Certificado | `curl -vI https://<domínio>/ 2>&1 \| grep -i "expire"` | Válido, com renovação automática |
| Avaliação externa dos cabeçalhos | O Mozilla Observatory (https://developer.mozilla.org/en-US/observatory), semanal, no domínio publicado | Sem queda de nota entre uma semana e outra; a queda é investigada como mudança de configuração do servidor |

**Objetivo.** O cabeçalho é configurado no Next, mas quem responde é o servidor da Hostinger. Só a conferência no endereço publicado prova que ele chegou ao navegador. A régua **não lê cabeçalhos**: ela vigia as violações da política, não a presença dela.

---

## 4. Página inexistente, erro e área restrita

| Verificação | O certo | Por quê |
|---|---|---|
| A 404 | Status 404, `noindex`, sem canônico de outra página | Até 07.10.2026, a 404 do Atlas herdava o canônico da capa |
| A tela de erro | Em português, sem a pilha de chamadas nem a mensagem do erro | Em produção, o Next mostra só um código (`digest`); a tela não pode imprimir `error.message` |
| O painel da Agenda | `noindex`, fora do mapa do site, `Cache-Control: no-store`, só com sessão | Dado pessoal não fica em cache nem aparece em busca |
| Arquivos que não deveriam estar públicos | `curl -sI https://<domínio>/.env`, `/.git/HEAD`, `/package.json`, `/.next/` → 404 | O modo standalone copia `public/` e `.next/static`; nada além disso pode ser servido |
| Rota só de desenvolvimento (no Atlas, `/ferramentas`, que desenha as telas da vitrine) | 404 em produção: `generateStaticParams` vazio e `notFound()` quando `NODE_ENV` é `production` | Ferramenta interna exposta é superfície de ataque e página indexável; conferido na revisão de segurança de 03.10.2026 |

---

## 5. O formulário e a Agenda

**Regra.** Toda coleta é protegida **sem terceiros**: nunca reCAPTCHA nem Turnstile, que são pedidos externos e tratam dados do visitante fora do país (`../esteira/17-conformidade-e-normas.md`, seção 5.4). As defesas, e o teste de cada uma:

| Defesa | Como funciona | Teste |
|---|---|---|
| **Campo-armadilha** | Um campo invisível para pessoas; preenchido, o envio é descartado em silêncio, com a mesma confirmação | Ponta a ponta: preencher a armadilha → confirmação exibida, nenhum e-mail chegado (`05`, seção 4) |
| **Carimbo de tempo assinado** | HMAC do momento da geração da página; envio em menos de 3 s ou vencido é recusado | Unidade (`04`, seção 4.5) |
| **Limite por IP** | Contagem por endereço **transformado** (hash com sal), numa janela de tempo; o IP cru não é gravado. Sem o cabeçalho do IP (ou só com o loopback, que o Next põe no lugar dele), não limita e avisa no registro: um balde comum a todos bloquearia o formulário inteiro | Ponta a ponta: envios seguidos além do limite, com o mesmo `x-forwarded-for` → recusa com a saída escrita |
| **Origem conferida** | As ações de servidor do Next comparam o `Origin` com o `Host` e recusam o envio de outro site; **não** se abre `serverActions.allowedOrigins` além do próprio domínio | Leitura do `next.config.ts`. Numa rota de API própria, um teste com `Origin: https://exemplo.invalid` → recusa |
| **Validação no servidor** | Tamanho, formato e lista fechada de valores conferidos no servidor; o navegador só ajuda | Ponta a ponta: envio forçado com campo fora do formato (por `request.post`) → recusa |
| **Nada do visitante nos cabeçalhos do e-mail** | Assunto fixo; o `Reply-To` só com e-mail validado; o corpo escapado | Unidade: um nome com quebra de linha e `Bcc:` não vira cabeçalho |
| **ALTCHA** (prova de trabalho, sem terceiro) | Opcional, se o robô vencer as defesas acima | Seria dependência nova: só com pedido explícito |

**Na Agenda, além disso:**

| Defesa | Teste |
|---|---|
| Chave única no banco (profissional + início do horário) contra a marcação dupla | A corrida de dois visitantes (`05`, seção 5.6); no banco, um teste de integração com duas gravações simultâneas → uma recusada por chave duplicada (1062) ou por impasse (1213), e as duas recusas dão "acabou de ser ocupado", nunca erro 500 (`../esteira/14-funcionalidades/05-agenda.md`, seção 5) |
| Horários gravados em UTC e exibidos em `America/Sao_Paulo` | Unidade (`04`, seção 4.6) |
| A antecedência mínima e a máxima (30 dias) valem também na ação de reservar, e a data do endereço é conferida: sem o teto, o expediente semanal se repete e qualquer data futura passaria | Unidade (`04`, seção 4.6); ponta a ponta: envio forçado de uma data além de 30 dias e de "2026-13-45" → recusa (`05`, seção 5.6) |
| Código de cancelamento guardado só como **hash**, com validade, conferido em tempo constante | Unidade: código certo, errado, vencido; o banco não tem o código em claro |
| Cancelamento **só por envio** (`POST`), com página de confirmação | Ponta a ponta: `GET` no endereço do código não cancela. A prévia do aplicativo de mensagens abre o vínculo sozinha |
| A tarefa do lembrete exige um segredo (cabeçalho), conferido em tempo constante | `curl` sem o segredo → 401, e nada enviado |
| Painel: senha guardada com `scrypt` (do próprio `node:crypto`, sem dependência), com o custo no registro; tentativas limitadas; mensagem e tempo de resposta iguais para e-mail inexistente e senha errada (`conferirEntrada`); sessão de horas, sessão nova a cada entrada; na saída, o cookie apagado com o mesmo `Path` e o `Secure` | Unidade: `conferirSenha` e `conferirEntrada` (`04`, seção 4.6). Ponta a ponta: senha errada repetida → espera; o cookie com os atributos da seção 2; depois da saída, nenhum cookie em `/painel` |

---

## 6. Segredos

**Regra.** Nenhum segredo no repositório nem no navegador. Os segredos (senha do SMTP, conexão do banco, chave do carimbo, segredo da tarefa) ficam nas **variáveis de ambiente** do web app na Hostinger e num `.env.local` fora do git.

**Objetivo.** O repositório é compartilhado entre os sócios e pode, um dia, ser compartilhado com mais gente. Um segredo no histórico do git continua lá mesmo depois de apagado do arquivo.

**Como conferir.**

| Verificação | Como |
|---|---|
| `.env*` fora do git | `git check-ignore .env.local` responde (o `.gitignore` do Next já traz `.env*`); `git ls-files \| grep -i "\.env"` lista no máximo um `.env.exemplo` sem valores, liberado com `!.env.exemplo` |
| Nenhum segredo com prefixo público | `grep -rn "NEXT_PUBLIC_" --include=*.ts --include=*.tsx .`: só valores que podem ir ao navegador. Tudo que leva `NEXT_PUBLIC_` vai para o script do visitante |
| Nenhum segredo no histórico | No pré-commit, uma busca por padrões no que está sendo commitado: `-----BEGIN`; os nomes da esteira atribuídos em início de linha (`SMTP_SENHA=`, `BANCO_SENHA=`, `SEGREDO_…=`, `GOOGLE_CONTA_CHAVE=`, além de `SMTP_PASS` e `DATABASE_URL`); `mysql://` com senha; chaves conhecidas. Um `.env` no commit também barra; só o `.env.exemplo`, sem valores, passa (`13-integracao-continua.md`, seção 6) |
| Nenhum segredo no script entregue | `grep -rE "SMTP|mysql://|SEGREDO" .next/static/` vazio depois do build |

A varredura de segredos do próprio GitHub é paga em repositório privado [FU]. A busca por padrões no pré-commit cobre o essencial sem custo (`13-integracao-continua.md`, seção 6).

---

## 7. As dependências

**Regra.** A árvore de produção não tem vulnerabilidade alta nem crítica conhecida, e nenhuma atualização entra no dia em que sai, salvo as de segurança.

| Prática | Como | Por quê |
|---|---|---|
| Auditoria a cada build | `npm audit --omit=dev --audit-level=high` (`03-estatica.md`, seção 6) | A árvore de produção é o que roda no servidor e no navegador |
| Instalação reprodutível | `npm ci` (o `package-lock.json` manda), nunca `npm install` na integração contínua | A versão testada é a versão publicada |
| Espera de 7 dias para versão nova | Dependabot com `cooldown` de 7 dias e atualizações agrupadas | Pacote comprometido costuma ser descoberto e retirado em dias. O `min-release-age` do npm faria o mesmo, mas exige npm ≥ 11.10, e o Node 22 traz o npm 10 [FU] |
| Ações do GitHub fixadas pelo hash do commit | `uses: actions/checkout@<sha de 40 caracteres> # v4` | Em março de 2025, a ação `tj-actions/changed-files` foi alterada e expôs segredos de milhares de repositórios (CVE-2025-30066) [FU]. Uma etiqueta (`@v4`) pode ser movida; um hash, não |
| Dependência nova só com pedido explícito | Regra da casa (`CLAUDE.md`) | Cada pacote é código de terceiro e superfície de ataque |
| Código copiado de terceiros, com a licença e o aviso | Na revisão de código da etapa 7, para cada peça de outra biblioteca:<br>- o arquivo `LICENCA-<origem>.txt` ao lado;<br>- a linha de origem no alto de cada arquivo copiado;<br>- o registro no `decisoes.md`, com o commit e a licença relida no dia;<br>- nenhuma peça CONDICIONAL fora do repositório do cliente.<br><br>As regras estão em `../componentes/README.md`, seções 3 e 4 | O site é vendido, e o cliente recebe o repositório. A MIT, a BSD, a ISC e a Apache pedem o aviso em toda cópia, e a licença muda com o tempo (o React Bits mudou duas vezes em 2025) |
| Next e React em versão maior, à mão | Fora do agrupamento automático; com a bateria inteira e a régua | Versão maior muda comportamento: precisa de leitura das notas de versão |
| Um robô de atualização só | Os pedidos de atualização da própria Hostinger desligados, se ela os oferecer no repositório; fica o Dependabot | Dois robôs abrem pedidos concorrentes, sem a espera de 7 dias |
| Atualização de emergência | Falha crítica na pilha (como a CVE-2025-55182, do React, em dezembro de 2025): sem espera, em todos os sites, em ondas (`../esteira/18-publicacao-e-manutencao.md`), com a régua e a fumaça em cada um | O risco da falha supera o da versão nova |

```yaml
# .github/dependabot.yml — RATIFICADO, não configurado.
version: 2
updates:
  - package-ecosystem: npm
    directory: /            # a pasta do package.json (no repositório do Atlas: /web)
    schedule: { interval: weekly }
    cooldown: { default-days: 7 }
    groups:
      producao: { dependency-type: production }
      desenvolvimento: { dependency-type: development }
  - package-ecosystem: github-actions
    directory: /
    schedule: { interval: monthly }
    cooldown: { default-days: 7 }
```

*A chave `cooldown` do Dependabot é recente. Confira a sintaxe na documentação do GitHub antes de ativar [NV]. As atualizações de segurança do Dependabot seguem o fluxo próprio delas [NV].*

**A análise de código do GitHub (CodeQL)** custa US$ 30 por pessoa que faz commit, por mês, em repositório privado [FU]. Não se justifica agora: o lint com as regras da casa e a leitura do código cobrem o que um site deste tamanho expõe.

---

## 8. A eliminação dos dados

**Regra.** A tarefa que apaga os dados vencidos (contatos e marcações além do prazo de guarda publicado no aviso de privacidade) é **testada antes da publicação**, no banco e na caixa de e-mail que recebe os avisos (`../esteira/17-conformidade-e-normas.md`, seções 5.3 e 9).

**Como fazer.**
1. No banco de teste, grave três registros: um vencido há um dia, um que vence amanhã, um recente.
2. Rode a tarefa com o relógio do teste fixado.
3. Confira: o vencido sumiu; os outros dois ficaram.
4. Confira a regra equivalente na caixa de e-mail: o filtro ou a tarefa que apaga os avisos vencidos.

**Objetivo.** Prazo de guarda publicado e não cumprido é afirmação falsa no aviso de privacidade. E dado guardado sem necessidade é o que vaza num incidente.

---

## 9. A hospedagem e os acessos

| Verificação | O certo |
|---|---|
| Painel da Hostinger | Verificação em duas etapas ligada; acesso só de quem precisa, com conta própria |
| Banco | Um usuário por site, com acesso só ao banco dele; sem acesso remoto aberto |
| SSH, se usado | Por chave, nunca por senha |
| Cópias de segurança | Existem e **foram restauradas uma vez**, num teste: cópia nunca restaurada não é cópia |
| Variáveis de ambiente | Conferidas depois de cada reimplantação. Uma variável faltando (o segredo do carimbo, o SMTP) aparece como formulário que nunca envia |

---

## 10. O incidente

**Regra.** Se houver suspeita de vazamento de dado pessoal ou de alteração do site:
1. **Conter:** tirar o formulário ou a Agenda do ar; trocar as senhas e os segredos.
2. **Registrar:** o que, quando e quantas pessoas.
3. **Avisar o cliente**, que é o controlador, em até 24 horas (RATIFICADO, para o contrato de operador).

O cliente comunica a ANPD e os titulares em três dias úteis (Resolução CD/ANPD 15/2024), com prazo em dobro para o agente de pequeno porte, salvo risco à integridade física ou moral (`../esteira/17-conformidade-e-normas.md`, seção 3.4).

**Objetivo.** O prazo é curto, e quem tem o dever legal de comunicar é o cliente. O Atlas precisa avisar a tempo de ele cumprir.

**Como conferir.** O roteiro existe por escrito, com os contatos, **antes** do primeiro site com coleta ir ao ar.

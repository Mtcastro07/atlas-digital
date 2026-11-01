# Módulos: o formulário e a Agenda

> **Para que serve.** Entrega, como código que roda e tem teste, os dois módulos de funcionalidade que pedem servidor: o **formulário de contato** do Profissional e do Completo (`producao/esteira/14-funcionalidades/02-formulario.md`) e o módulo **Agenda**, vendido à parte (`05-agenda.md`). Escritos a partir das duas especificações, para serem copiados para o site feito da `../base/`.
>
> **Quando ler.** Ao montar um site com formulário ou com Agenda (etapa 6 do roteiro, `../01-roteiro-da-sessao.md`).
>
> **Estado (08.10.2026).** **Completo e testado.** O `nodemailer` 10.0.13 e o `mysql2` 3.24.5 foram aprovados pelo usuário em 08.10.2026 (seção 3). No mesmo dia, o banco rodou de verdade, no MariaDB 10.11.19 e no MySQL 8.0.46, num site do Completo com os dois módulos: 116 verificações por banco, todas aprovadas, e três defeitos achados e corrigidos (seção 8). Falta a prova no ar: o SMTP real, o Google, o proxy e as tarefas da Hostinger.

---

## 1. O que cada módulo é, e em que plano entra

| Módulo | Entra em | Nunca entra em | O que faz | Exige |
|---|---|---|---|---|
| **Formulário** (`formulario/`) | **[P] e [C]**, incluso no plano (`../esteira/03-planos.md`, seção 4.4) | **[E]** (subir para o Profissional, ou orçar antes de fazer); **[ex]** (o exemplo não coleta nada); a advocacia (`../esteira/14-funcionalidades/02-formulario.md`, seção 2) | A página `/contato`: cinco campos, envio que funciona sem script, proteção sem terceiros (campo-armadilha, carimbo de tempo assinado, limite por IP em hash), entrega por e-mail | Servidor (Server Action); `SEGREDO_DO_FORMULARIO`; para entregar e limitar de verdade, `nodemailer` e `mysql2` |
| **Agenda** (`agenda/`) | **[E], [P] e [C]**, como módulo: +R$ 400 e +R$ 80 por mês (ata v3.0, IV.2) | **O rascunho de 24 horas** (exige banco, e-mail e o teste da corrida: `../esteira/14-funcionalidades/README.md`, seção 6); **[ex]**; a advocacia | Os horários livres calculados no servidor, a reserva sem conflito, a confirmação e o aviso ao dono por e-mail com convite `.ics`, o lembrete da véspera, o cancelamento pelo vínculo, o painel do dono | Servidor; MySQL do plano; SMTP; tarefas agendadas do hPanel; `nodemailer` e `mysql2` |

Os dois módulos são **só para site de cliente** (`exemplo: false` em `conteudo/negocio.ts`): o selo de ficção diz que nada é coletado, e o aviso de privacidade de fábrica diz o mesmo. A Agenda reaproveita a proteção do formulário (o carimbo, o limite por IP e as regras do e-mail e do telefone): numa Agenda sem formulário, copie também os arquivos da seção 5.2.

---

## 2. O que roda sem dependência, e o que não

| Peça | Sem `nodemailer` e `mysql2` | Como é |
|---|---|---|
| Regras dos campos, carimbo de tempo assinado (HMAC-SHA256), campo-armadilha, limite por IP em hash | **Roda e tem teste** | Só `node:crypto`. O limite guarda a contagem num `ArmazemDoLimite`: na memória (rascunho e teste) ou no MySQL |
| A decisão da ação de enviar e a de reservar | **Roda e tem teste** | `processar.ts`, fora do `"use server"`, com a entrega, o armazém e o banco entrando por parâmetro |
| Horários livres, fuso de Niterói, blocos e a disputa pelo mesmo horário, convite `.ics`, senha em `scrypt`, sessão, lembrete, cancelamento, painel | **Roda e tem teste** | O banco entra pela porta `Repositorio`; no teste e no desenvolvimento, `lib/agenda/memoria.ts` faz o que o MySQL faz no que a lógica depende (a chave única recusa o horário levado) |
| As páginas, as ações e a ilha | **Rodam** (compilam no `next build`, servem em `next start`) | Falam com a **ligação** `destino.ts` |
| O e-mail pelo SMTP, o MySQL, o pool | **Rodam com as dependências da seção 3** | `email.ts`, `banco.ts`, `limite-mysql.ts`, `repositorio-mysql.ts` |

**A ligação (`destino.ts`).** É o único arquivo que escolhe com que o módulo conversa. Cada módulo traz dois:
- `destino.ts` (já no lugar): a ligação **do rascunho e do desenvolvimento**, sem dependência. No formulário, o limite fica na memória e a entrega **não entrega**: a pessoa vê "A mensagem não foi enviada", com a saída pelo WhatsApp (estado verdadeiro; um "enviado" falso seria o defeito mais caro da funcionalidade). Na Agenda, as reservas ficam na memória do processo e o correio só registra o assunto; **em produção ela se recusa a funcionar**, salvo `AGENDA_EM_MEMORIA=1`.
- `destino.producao.ts`: a ligação de produção, com o SMTP e o MySQL. Na publicação, copia-se por cima do `destino.ts` (seção 6, passo 10).

Com `SMTP_TESTE=1`, as duas ligações gravam o e-mail em `.teste/emails.jsonl`, uma linha de JSON no formato do `jsonTransport` do nodemailer (`from`, `to`, `replyTo`, `subject`, `text` e, na Agenda, `icalEvent` com o `.ics`); com `SMTP_TESTE=falha`, simulam o SMTP fora do ar. Por isso o teste de ponta a ponta de `../qualidade/05-ponta-a-ponta.md` roda nas duas.

---

## 3. As dependências (aprovadas pelo usuário em 08.10.2026)

**A decisão.** O usuário aprovou as dependências necessárias da esteira de produção em 08.10.2026 ("está permitido aplicar as dependências necessárias na esteira de produção"). Para os módulos, são duas, nas versões fixadas abaixo. Elas entram no passo 1 da instalação (seção 6), sem novo pedido; registre a linha no `decisoes.md` do site.

| Dependência | Versão | Para quê | Onde entra | Licença e observação |
|---|---|---|---|---|
| `nodemailer` | **10.0.13** | Enviar pelo SMTP da Hostinger | Só no servidor: `lib/formulario/email.ts`, `lib/agenda/email.ts` | MIT-0. **Traz os próprios tipos** desde a versão 10: o `@types/nodemailer` não entra. Exige Node ≥ 20 (a base usa o 22) |
| `mysql2` | **3.24.5** | Falar com o MySQL do plano: o limite por IP e, na Agenda, tudo | Só no servidor: `lib/banco.ts`, `limite-mysql.ts`, `repositorio-mysql.ts` | MIT |

```bash
npm install --save-exact nodemailer@10.0.13 mysql2@3.24.5
npm audit --omit=dev        # limpo antes de publicar
```

**Por que estas versões.** São as mais novas com mais de 7 dias de publicadas em 08.10.2026, pela regra de `../esteira/13-tecnologia-e-estrutura.md`, seção 10, itens 2 e 3: o `nodemailer` 10.0.13 (30.09.2026) e o `mysql2` 3.24.5 (29.09.2026). A troca de versão segue a atualização em ondas (`../esteira/18-publicacao-e-manutencao.md`), com o build, os 134 testes e a régua antes de ir ao ar.

**Nenhuma entra no script do navegador.** O Drizzle e o Prisma, que a especificação citava para o esquema, **não** são usados: o código usa SQL direto. Qualquer dependência além destas segue pedindo autorização (`../esteira/13-tecnologia-e-estrutura.md`, seção 9).

---

## 4. As variáveis de ambiente

Os valores ficam no painel da Hostinger e num `.env.local` fora do git; nunca no repositório, nunca com `NEXT_PUBLIC_`. Cada módulo traz o seu `.env.exemplo`, só com os nomes.

| Variável | Módulo | Conteúdo |
|---|---|---|
| `SEGREDO_DO_FORMULARIO` | os dois | 32 bytes aleatórios, `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`. **Obrigatória já no rascunho**: sem ela, `/contato` e os horários de `/agendar` dão a página de erro (a falha é alta, de propósito) |
| `SMTP_USUARIO`, `SMTP_SENHA` | os dois | A caixa do domínio que envia |
| `CONTATO_DESTINO` | os dois | A caixa do cliente: recebe o formulário e, na Agenda, o aviso de cada reserva |
| `BANCO_USUARIO`, `BANCO_SENHA`, `BANCO_NOME` | os dois | O MySQL do plano |
| `SEGREDO_DO_CRON` | Agenda | O segredo das tarefas agendadas |
| `GOOGLE_CONTA_EMAIL`, `GOOGLE_CONTA_CHAVE`, `GOOGLE_AGENDA_ID` | Agenda, opcional | O evento direto na agenda do Google do dono. Sem as três, só o `.ics` do e-mail |
| `SMTP_TESTE` | os dois, só nos testes | `1`: o e-mail vira linha de `.teste/emails.jsonl`; `falha`: simula o SMTP fora do ar. Nunca no web app publicado |
| `AGENDA_DEV_DONO_EMAIL`, `AGENDA_DEV_DONO_REGISTRO`, `AGENDA_EM_MEMORIA` | Agenda, só no desenvolvimento | O dono do painel na ligação em memória; a licença de rodá-la em produção, só para medir |

---

## 5. Os arquivos

Os caminhos são relativos à raiz do site: `formulario/lib/formulario/validar.ts` vai para `lib/formulario/validar.ts`. **Dep.** diz o que o arquivo exige: **—** nada; **nm** `nodemailer`; **my** `mysql2`.

### 5.1 · Formulário (`formulario/`)

| Arquivo | O que faz | Dep. |
|---|---|---|
| `lib/formulario/validar.ts` | As regras dos campos, a mesma na ilha e no servidor: nome de 2 a 80, telefone com DDD (com ou sem 55), e-mail até 254, serviço da lista, mensagem até 2.000; `emailValido` e `lerTelefone` | — |
| `lib/formulario/entrada.ts` | O texto de um campo (sem espaço nas pontas, sem quebra de linha fora da mensagem, arquivo no lugar de texto vira vazio) e o IP atrás do proxy (o último do `x-forwarded-for`) | — |
| `lib/formulario/carimbo.ts` | `emitirCarimbo` e `lerCarimbo`: o instante da página, assinado com HMAC-SHA256; "rápido" abaixo de 3 s, "vencido" acima de 24 h, "forjado" se a assinatura não bate | — |
| `lib/formulario/limite.ts` | O limite de 5 envios por hora por IP: o HMAC do IP com o sal do dia, a janela, o `ArmazemDoLimite` e o armazém na memória | — |
| `lib/formulario/mensagem.ts` | O e-mail composto: só texto, assunto com o nome do serviço da lista, Reply-To só com e-mail válido, nada do visitante num cabeçalho com quebra de linha | — |
| `lib/formulario/processar.ts` | A decisão da ação, na ordem da especificação: armadilha e carimbo, rápido e vencido, validação, limite, entrega. Devolve o que a ação faz: confirmar (303) ou voltar com o estado | — |
| `lib/formulario/destino.ts` | A ligação do rascunho (seção 2) | — |
| `app/contato/page.tsx` | A página (dinâmica: `await connection()`), com o formulário e os outros canais | — |
| `app/contato/acoes.ts` | A Server Action `enviarContato` | — |
| `app/contato/enviado/page.tsx` | A confirmação: o prazo de resposta, sem dado pessoal, `noindex` | — |
| `components/ilhas/formulario-de-contato.tsx` | A ilha: validação ao sair do campo, "Enviando…" com `aria-disabled`, foco no primeiro erro, aviso no ponto da coleta, saída pelo WhatsApp | — |
| `conteudo/formulario.ts` | A lista de serviços, o prazo de guarda, os textos e o título e a descrição da página de confirmação. **Do cliente** | — |
| `conteudo/legal-formulario.ts` | O bloco [FORMULÁRIO] do aviso de privacidade | — |
| `esquema/formulario.sql`, `esquema/README.md` | `sal_do_dia` e `limite_de_envio` (a Agenda usa as mesmas); o README da pasta, que descreve os dois esquemas | — |
| `lib/formulario/email.ts` | A entrega pelo SMTP da Hostinger; o modo `SMTP_TESTE` | **nm** |
| `lib/banco.ts` | O pool do MySQL (`127.0.0.1`, datas em UTC). Idêntico no formulário e na Agenda | **my** |
| `lib/formulario/limite-mysql.ts` | O `ArmazemDoLimite` no MySQL: o sal do dia, a contagem por janela, a limpeza | **my** |
| `lib/formulario/destino.producao.ts` | A ligação de produção (seção 2) | **nm** e **my** |
| `testes/formulario.test.ts` | 39 testes (seção 8) | — |
| `.env.exemplo` | Os nomes das variáveis | — |

### 5.2 · Agenda (`agenda/`)

| Arquivo | O que faz | Dep. |
|---|---|---|
| `lib/agenda/tipos.ts` | Os tipos e a porta do banco, o `Repositorio` | — |
| `lib/agenda/fuso.ts` | A hora de parede de Niterói ↔ o instante UTC, **pelo nome do fuso** (`America/Sao_Paulo`), com duas passadas; a data de Niterói de um instante; validação de data | — |
| `lib/agenda/livres.ts` | `horariosLivres`: o expediente menos as folgas e os blocos ocupados, a duração, o intervalo, a antecedência mínima e a máxima | — |
| `lib/agenda/consulta.ts` | Os horários de um serviço num dia: a união dos profissionais que o fazem, cada horário com o primeiro livre | — |
| `lib/agenda/blocos.ts` | Os blocos de 15 minutos que a reserva ocupa; que erro do banco quer dizer "acabou de ser ocupado" (1062, 1213, 1205) | — |
| `lib/agenda/reserva.ts` | A reserva: confere o horário na lista de agora, escolhe o profissional, gera o código de cancelamento (só o hash vai ao banco) | — |
| `lib/agenda/validar.ts` | Os campos do pedido de reserva: o e-mail obrigatório, o telefone opcional, o instante ISO exato | — |
| `lib/agenda/processar.ts` | A decisão da ação de reservar: armadilha, carimbo, validação, limite, reserva, e-mails e evento do Google | — |
| `lib/agenda/convite.ts` | O `.ics` (RFC 5545): CRLF, dobra em 75 octetos, escape, `Z`, `ORGANIZER` | — |
| `lib/agenda/mensagens.ts` | Os e-mails: confirmação, aviso ao dono, lembrete e os dois cancelamentos | — |
| `lib/agenda/cancelamento.ts` | O cancelamento pela pessoa: a situação do vínculo (abrir não cancela), o prazo, o cancelamento | — |
| `lib/agenda/lembrete.ts` | A regra do lembrete (2 a 24 horas antes, reserva feita 24 horas ou mais antes) e a do prazo de cancelamento | — |
| `lib/agenda/tarefas.ts` | O que as tarefas agendadas chamam: os lembretes, a manutenção diária e a conferência do segredo | — |
| `lib/agenda/codigo.ts` | O código de cancelamento (128 bits), o da sessão (256) e o hash | — |
| `lib/agenda/texto.ts` | "sexta-feira, 9 de outubro, às 14h30" | — |
| `lib/agenda/google.ts` | RATIFICADO, opcional: o evento na agenda do Google do dono por conta de serviço (JWT RS256), sem biblioteca | — |
| `lib/agenda/memoria.ts` | O `Repositorio` na memória, com a semente de uma barbearia fictícia | — |
| `lib/agenda/contexto.ts` | Os dados do negócio para os e-mails, de `conteudo/negocio.ts` e do ambiente | — |
| `lib/agenda/destino.ts` | A ligação de desenvolvimento (seção 2) | — |
| `lib/painel/senha.ts` | `guardarSenha`, `conferirSenha` e `conferirEntrada` em `scrypt` (N = 2^17, r = 8, p = 1), com o custo no registro | — |
| `lib/painel/sessao.ts` | O cookie `__Secure-sessao` (`HttpOnly; Secure; SameSite=Lax; Path=/painel`, 12 horas), a sessão no banco só em hash | — |
| `lib/painel/entrar.ts` | A entrada: 5 tentativas a cada 15 minutos, por e-mail e por IP em hash; a mesma recusa e o mesmo tempo para e-mail inexistente | — |
| `lib/painel/operacoes.ts` | As reservas dos próximos 14 dias, cancelar com motivo, bloquear horário ou dia, buscar e apagar os dados de uma pessoa | — |
| `app/agendar/page.tsx`, `app/agendar/acoes.ts` | A marcação: o `<Form>` GET (serviço, profissional, dia), os horários livres e a Server Action `reservarHorario` | — |
| `app/agendar/confirmado/page.tsx` | A confirmação; se o e-mail não saiu, mostra o dia e a hora na tela | — |
| `app/cancelar/[codigo]/page.tsx`, `acoes.ts` | O vínculo do e-mail: abrir só mostra; o envio cancela | — |
| `app/painel/page.tsx`, `acoes.ts`, `sair.ts` | O painel do dono | — |
| `app/api/lembretes/route.ts`, `app/api/manutencao/route.ts` | As duas tarefas agendadas, protegidas por segredo | — |
| `components/ilhas/formulario-de-reserva.tsx` | O segundo formulário: o horário e os dados da pessoa | — |
| `conteudo/agenda.ts`, `conteudo/painel.ts` | Os parâmetros da casa, os textos e o título e a descrição das páginas fora da busca (confirmação, cancelamento, painel). **Do cliente** | — |
| `conteudo/legal-agenda.ts` | O bloco [AGENDA] do aviso de privacidade e o parágrafo do cookie do painel | — |
| `esquema/agenda.sql` | As nove tabelas da seção 3 da especificação | — |
| `ferramentas/criar-dono.mjs` | Gera o `INSERT` do dono do painel, com a senha em `scrypt` (pedida sem eco, 15 caracteres no mínimo) | — |
| `lib/agenda/repositorio-mysql.ts` | O `Repositorio` no MySQL, com SQL direto | **my** |
| `lib/agenda/email.ts` | O correio pelo SMTP, com o `.ics` (`icalEvent`); o modo `SMTP_TESTE` | **nm** |
| `lib/agenda/destino.producao.ts` | A ligação de produção | **nm** e **my** |
| `testes/agenda.test.ts` | 87 testes (seção 8), com os dois da caixa de consentimento da psicologia | — |
| `.env.exemplo` | Os nomes das variáveis | — |

**Os arquivos do formulário que a Agenda usa.** Numa Agenda sem o formulário, copie também de `formulario/`: `lib/formulario/entrada.ts`, `validar.ts`, `carimbo.ts` e `limite.ts`, mais, para a produção, `lib/formulario/limite-mysql.ts`, `lib/banco.ts`, `esquema/formulario.sql` e `esquema/README.md`.

---

## 6. Como instalar num site feito da `../base/`

O `novo-site` ainda não copia estes arquivos (ele só põe o modo de saída pelo plano e aponta para este README): a instalação é à mão, por estes passos. Eles valem para o formulário e para a Agenda; o que é de um só diz qual. Os passos 1 a 4 só compilam juntos (a página nova pede a entrada em `conteudo/site.ts`): faça-os em sequência e confira com `npm run build` ao fim do 4.

**1. Copiar os arquivos.** Na raiz do site (`$M` é esta pasta; o `.env.exemplo` não se copia por cima, soma-se):

```bash
M=producao/modulos         # o kit, na raiz do projeto
rsync -a --exclude .env.exemplo "$M/formulario/" ./ && cat "$M/formulario/.env.exemplo" >> .env.exemplo
rsync -a --exclude .env.exemplo "$M/agenda/" ./     && cat "$M/agenda/.env.exemplo" >> .env.exemplo    # só com a Agenda
npm install --save-exact nodemailer@10.0.13 mysql2@3.24.5      # as dependências da seção 3
```

Sem o formulário, a Agenda leva os arquivos da seção 5.2 (último parágrafo): `mkdir -p lib/formulario esquema` e `cp` de cada um.

**2. Registrar as páginas em `conteudo/site.ts`** (o menu, o mapa do site e os metadados seguem a lista). Em `Pagina["id"]`, acrescente `| "contato"` e `| "agendar"`; em `paginas`, antes de `privacidade`:

```ts
{ id: "contato", caminho: "/contato", rotulo: "Contato", titulo: "Contato", tituloCurto: "Fale com a casa",
  descricao: "O formulário, o WhatsApp, o telefone e o horário, com o prazo de resposta.", descricaoCurta: "Formulário, WhatsApp e telefone." },
{ id: "agendar", caminho: "/agendar", rotulo: "Agendar", titulo: "Agendar um horário",
  tituloCurto: "Agendar um horário", descricao: "Escolha o serviço e o dia e reserve o horário no próprio site; a confirmação chega por e-mail, com o convite de calendário.", descricaoCurta: "Reserve o horário no site." },
```

Reescreva títulos e descrições com a voz do cliente. As páginas `/agendar/confirmado`, `/cancelar/...` e `/painel` ficam **fora** da lista: são funcionais, sem menu e sem mapa do site (o `novo-site` não conta as páginas do módulo no limite do plano).

**3. `next.config.ts`.** Se o `novo-site` já pôs o padrão em servidor, pule o primeiro item.
- `process.env.SAIDA ?? "estatico"` vira `process.env.SAIDA ?? "servidor"`. O `npm run pronto` acusa a combinação errada.
- No ramo `servidor`, junto de `poweredByHeader: false`: `experimental: { serverActions: { bodySizeLimit: "64kb" } },`. Texto puro cabe com folga, e o resto é recusado antes de ler. Vale para **todas** as ações do site.
- Só com a Agenda, em `headers()`, depois do item `/:caminho*`: `{ source: "/painel/:caminho*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }, { key: "Cache-Control", value: "no-store" }] },`. O `noindex` vai por cabeçalho, sem `Disallow` no `robots`: o robô bloqueado não leria o `noindex`.
- Se o envio falhar só no ar, com erro de origem, atrás do proxy da Hostinger: o host público entra em `serverActions.allowedOrigins` (`producao/esteira/14-funcionalidades/02-formulario.md`, seção 4).

**4. `.gitignore`:** acrescente `/.teste/` (o e-mail de teste cai em `.teste/emails.jsonl`).

**5. Variáveis de ambiente** (seção 4): em `.env.local` e, na publicação, nas variáveis do web app. Mudou uma variável: reimplante.

**6. O conteúdo.** O de fábrica é o do banho e tosa de exemplo da base.
- `conteudo/formulario.ts`: os serviços (`id` estável, `nome` para a tela e o assunto), o prazo de guarda e os textos. **Saúde** (nutrição, psicologia, odontologia, medicina): `notaDeSaude: "Não descreva sintomas aqui; isso fica para a consulta."`, e nenhum campo de motivo ou de sintoma. O campo a mais do nicho (bairro, modelo do carro, turma) entra à mão em `Campos`, `validar`, `mensagem.ts` e na ilha.
- `conteudo/agenda.ts`: a antecedência mínima e a máxima, o prazo de cancelamento, a guarda; os textos. O catálogo (profissionais, serviços, expediente) mora no banco (passo 9).
- `conteudo/legal.ts`: veja o passo 7.
- Em `conteudo/site.ts`, a descrição da página `privacidade` diz "nenhum formulário": troque-a pelo que o site passou a coletar.

**7. O aviso de privacidade (`conteudo/legal.ts`).** Importe os blocos prontos e acrescente-os; leitura de leigo, **A CONFIRMAR com advogado** antes do primeiro cliente (`../esteira/modelos/aviso-de-privacidade.md`).

```ts
import { blocoDaAgenda, paragrafoDoPainel } from "./legal-agenda";        // com a Agenda
import { blocoDoFormulario } from "./legal-formulario";                   // com o formulário
```

- Em `avisoDePrivacidade.blocos`, depois do bloco "Contato por WhatsApp e telefone": `blocoDoFormulario` e/ou `blocoDaAgenda`.
- Com a Agenda, acrescente `paragrafoDoPainel` aos parágrafos do bloco "O que este site guarda no seu aparelho": a área restrita é a única exceção ao "nenhum cookie", e dispensa banner por ser estritamente necessária.
- No bloco "Com quem os dados são compartilhados", a Hostinger passa a prestar "hospedagem, banco de dados e e-mail". Atualize a `data` do aviso.
- Cada formulário leva, junto do botão, a frase curta com o prazo de guarda e o vínculo para o aviso; as ilhas já a trazem.

**8. Os READMEs das pastas** (a convenção da base: um por pasta de topo). A pasta nova `esquema/` já traz o seu. Nos que existem, acrescente as linhas:

| README | Linhas a acrescentar |
|---|---|
| `app/README.md` | `contato/`, `agendar/`, `cancelar/`, `painel/`, `api/`: as rotas do módulo |
| `components/README.md` | `components/ilhas/formulario-de-contato.tsx`, `components/ilhas/formulario-de-reserva.tsx` |
| `conteudo/README.md` | `formulario.ts`, `agenda.ts`, `painel.ts`, `legal-formulario.ts`, `legal-agenda.ts` |
| `lib/README.md` | `formulario/`, `agenda/`, `painel/`, `banco.ts` (a tabela da seção 5) |
| `testes/README.md` | `formulario.test.ts`, `agenda.test.ts` |
| `ferramentas/README.md` | `criar-dono.mjs` (Agenda) |

**9. O banco** (a versão se confere com `SELECT VERSION()`: o `DEFAULT (UTC_TIMESTAMP())` pede MySQL 8.0.13 ou MariaDB 10.2.1). Rode `esquema/formulario.sql` e, com a Agenda, `esquema/agenda.sql`. O catálogo entra pela manutenção mensal (o exemplo está no fim do `agenda.sql`). O dono do painel:

```bash
node --experimental-strip-types --no-warnings=ExperimentalWarning ferramentas/criar-dono.mjs dono@dominio.com.br
```

imprime o `INSERT INTO dono` para o phpMyAdmin. A senha tem 15 caracteres ou mais (OWASP, sem segundo fator).

**10. Ligar o envio e o banco** (na publicação). No rascunho e no desenvolvimento, fica o `destino.ts` de fábrica. Para publicar:

```bash
cp lib/formulario/destino.producao.ts lib/formulario/destino.ts
cp lib/agenda/destino.producao.ts lib/agenda/destino.ts       # só com a Agenda
```

Registre a troca em `decisoes.md`. **Sem este passo, o formulário publicado não envia e a Agenda recusa funcionar.**

**11. As tarefas agendadas** (só com a Agenda; o hPanel as roda em UTC; **A CONFIRMAR** que aparecem para web apps Node, `../esteira/14-funcionalidades/05-agenda.md`, seção 15):

```bash
# a cada 15 minutos (*/15 * * * *): o lembrete da véspera
curl -fsS -X POST -H "Authorization: Bearer <SEGREDO_DO_CRON>" https://<domínio>/api/lembretes > /dev/null
# uma vez por dia, 3h UTC (meia-noite em Niterói): o limite e o sal antigos, as sessões vencidas, as reservas além da guarda
curl -fsS -X POST -H "Authorization: Bearer <SEGREDO_DO_CRON>" https://<domínio>/api/manutencao > /dev/null
```

Num site só com o formulário, a limpeza do limite é o SQL do fim de `esquema/formulario.sql`, por tarefa agendada (A CONFIRMAR que a tarefa alcança o MySQL).

**12. Verificar.** `npm test`; `npm run build`; `npm run pronto`; a régua nas páginas novas (formulário sem vínculo para o aviso de privacidade reprova; a seção 8 diz o que ela já achou aqui); depois os testes de ponta a ponta de `../qualidade/05-ponta-a-ponta.md` (seção 8 deste arquivo diz o que já foi provado). Depois, a **porta de publicação** de `../esteira/17-conformidade-e-normas.md`: o aviso com o formulário ou a Agenda, o prazo de guarda publicado, o contrato de operador assinado, um envio real feito no ar e, na Agenda, a marcação e o cancelamento testados no ar.

---

## 7. As decisões deste módulo

**A psicologia** (acrescentado depois da revisão do kit, 08.10.2026; `producao/esteira/14-funcionalidades/05-agenda.md`, seção 1, "Varia por"; `producao/esteira/nichos/psicologia.md`, seção 5.4):
- **O consentimento:** preencha `consentimento` em `conteudo/agenda.ts` com o texto da caixa. A marcação passa a exigir a caixa, desmarcada e destacada (LGPD, art. 11, I); a ação recusa o pedido sem ela. O aviso de privacidade (`conteudo/legal-agenda.ts`) troca a base legal sozinho.
- **A modalidade de atendimento** (presencial ou on-line) é o **serviço** do catálogo: cadastre "Sessão presencial" e "Sessão on-line". Nunca a modalidade clínica nem o motivo.
- **Ainda A CONFIRMAR com advogado:** a prova do consentimento (LGPD, art. 8º, § 2º), que pediria gravar a data e a versão do texto na reserva; e os outros nichos de saúde (`producao/esteira/17-conformidade-e-normas.md`, seção 10, item 10).

O que a especificação deixou aberto, decidido no mínimo. Cada item é reversível, e o mais importante vem primeiro.

| # | Decisão | Por quê |
|---|---|---|
| 1 | **As portas e a ligação** (`Repositorio`, `Correio`, `ArmazemDoLimite`, `Entrega`; `destino.ts` e `destino.producao.ts`). Nenhum arquivo sem dependência importa um que a tenha | Sem isso, nada que usa o banco ou o e-mail compilaria sem as dependências, e o rascunho do Profissional ("os campos, a validação e os estados; o envio de verdade entra até a publicação") não existiria. Dá também o teste da corrida e do cancelamento sem MySQL |
| 2 | **Sem `import "server-only"` nos arquivos que o teste importa** (`carimbo`, `limite`, `entrada`, `processar`, `senha`, `google` e os da lógica). Ele fica nos de ligação (`destino*`, `email`, `banco`, `limite-mysql`, `repositorio-mysql`, `contexto`) | O `node:test` não resolve esse pacote (o alias do Vitest, de `../qualidade/04-unidade.md`, seção 1, não existe). No lugar, um teste de fronteira confere que nenhuma ilha importa código de servidor |
| 3 | **`processar.ts`**: a decisão da ação fica fora do `"use server"` | Testar a armadilha, o carimbo, o limite e a corrida sem Playwright (`../qualidade/04-unidade.md`, seção 3) |
| 4 | **`conteudo/formulario.ts`** guarda os serviços e os textos | A especificação importava `servicos` e `negocio.mensagem` de `conteudo/negocio.ts`, que a base não tem |
| 5 | Se o armazém do limite falhar, a pessoa lê "A mensagem não foi enviada" (com o WhatsApp), e a falha vai ao registro | A especificação deixava a falha estourar numa página de erro, perdendo o que a pessoa escreveu |
| 6 | O registro do servidor leva só a mensagem do erro, nunca dado pessoal | A falha silenciosa não deixaria ninguém saber que o formulário não entrega |
| 7 | A chave do limite é o HMAC de `escopo:valor`, e a janela é a hora cheia (formulário) ou o quarto de hora (entrada no painel, 5 por janela fixa de 15 minutos) | A mesma tabela serve a três contagens sem misturá-las |
| 8 | O telefone da reserva é guardado só com os algarismos, sem o 55 | A busca por telefone do painel compara o que está guardado |
| 9 | Os avisos ao dono vão para `CONTATO_DESTINO`; o Reply-To das mensagens à pessoa é o dono, e o das mensagens ao dono é a pessoa | A especificação não nomeia o destinatário do aviso |
| 10 | O **lembrete não leva o vínculo de cancelamento**: o código só existe no e-mail de confirmação (o banco guarda o hash) | O lembrete aponta para o e-mail de confirmação e o WhatsApp |
| 11 | A confirmação sem e-mail recebe `?email=falhou&inicio=<ISO>`; o cancelamento volta à própria página (`?feito=1`) | O horário não é dado pessoal; a página não repete nome nem contato |
| 12 | Depois de "acabou de ser ocupado", a ação chama `refresh()` e a lista volta recalculada | A especificação pede "a lista recalculada" |
| 13 | Um pedido **sem preferência** que perde a corrida pelo primeiro profissional lê "ocupado" e escolhe de novo (não tenta o segundo) | Uma tentativa só: a lista recalculada já oferece o outro |
| 14 | O horário que nunca esteve na lista (pedido à mão) recebe a mesma resposta do horário levado | A resposta não ensina o que a regra deixa passar |
| 15 | O painel é uma rota só (`/painel`); cada ação volta com o desfecho no endereço (`?ok=`, `?erro=`), sem estado no navegador; o bloqueio tem lista e remoção | Funciona sem script, e um bloqueio por engano não se desfaz só por SQL |
| 16 | A ação do painel sem sessão não executa nada e leva à tela de entrada | "Recusada" sem inventar um 401 numa Server Action |
| 17 | `criar-dono.mjs`, com senha de 15 caracteres ou mais | A especificação não diz como nasce o primeiro dono; o número é o da OWASP para conta sem segundo fator |
| 18 | A ligação de desenvolvimento da Agenda tem uma semente fictícia (barbearia, dois profissionais) e se recusa a rodar em produção | Reserva só na memória some quando o web app dorme |
| 19 | As mensagens de erro dos formulários, os textos das páginas e o corpo dos e-mails foram escritos aqui, em registro impessoal | Revisar com a voz do cliente |
| 20 | O bloco [FORMULÁRIO] do aviso diz que os dados ficam "na caixa de e-mail" e que o site "não guarda cópia", e acrescenta o hash do IP, que se apaga no dia seguinte | O modelo diz "no servidor do site", a seção 7 do formulário diz "só no e-mail do cliente": vale a seção 7. O hash do IP é tratamento que o aviso deve dizer |
| 21 | `apagarEvento` do Google, que a especificação manda fazer no cancelamento e não escreve | Sem ele o evento ficaria na agenda do dono |
| 22 | **As páginas fora da busca** (a confirmação do formulário, a da reserva, o cancelamento e o painel) levam os metadados completos de `metadadosDaPagina` (título, descrição e cartão), com `noindex` e **sem** o `canonical` | A especificação cita só o `robots`; a régua reprova a página sem `meta description` e sem `og:*` (`../esteira/14-funcionalidades/01-base-de-todo-site.md`, seção 10). O `canonical` de uma página que não se indexa, e de outra que leva o código no endereço, seria afirmação falsa |
| 23 | **O rádio e a caixa de marcação**: o campo nativo cobre a linha inteira, transparente (é ele o alvo, de 44 px), e um desenho por cima mostra o estado e o foco (`peer-checked`, `peer-focus-visible`) | O controle nativo tem 20 px, e a régua reprova alvo de toque abaixo de 44 px (`../esteira/16-acessibilidade.md`, seção 3.6). Mantém o teclado, as setas e o envio sem script. Nas pílulas de horário o anel é sombra interna (`ring-inset`), não borda: a borda tirava 2 px do campo |
| 24 | **O banco fora do ar na `/agendar`**: o catálogo e os horários do dia são lidos com `.catch`, e a página abre com o aviso `foraDoAr` e o WhatsApp | Sem isso, a página caía na tela de erro, que não tem saída para a conversa, também no envio sem script, que volta para ela (achado do teste com banco real, 08.10.2026; conferido com o banco parado) |

---

## 8. O que foi verificado, e o que não

**Verificado em 08.10.2026**, numa cópia da `../base/` com os dois módulos por cima:

| O quê | Resultado |
|---|---|
| `npm test` (o `node:test`, sem Vitest) | **135 testes**, todos passando: 39 do formulário, 87 da Agenda e 9 da base (recontados em 08.10.2026, depois do teste com banco real). Os testes da especificação (seção 9 do formulário; seção 16 da Agenda) e, além deles, a ação inteira, a corrida, o cancelamento, o lembrete, o painel e a manutenção contra o `Repositorio` da memória |
| Teste de mutação à mão | 35 alterações de regra nos arquivos puros (os limites de 3 s e de 24 h, a antecedência, a dobra e o escape do `.ics`, o prazo do lembrete, o limite de tentativas, os atributos do cookie, a chave única...): 34 derrubaram pelo menos um teste. A que sobreviveu é equivalente: o `guardada !== undefined` da entrada, que a senha aleatória da conta fictícia já garante |
| `npx tsc --noEmit` estrito, com todos os arquivos e as dependências instaladas (o `nodemailer` 10.0.13, que traz os próprios tipos, e o `mysql2` 3.24.5) | Sem erro. Antes da aprovação, contra os tipos do `@types/nodemailer` 7.0.11 e uma declaração mínima do `mysql2`, **achou um erro da especificação** (seção 9, item 1) |
| `next build` no modo servidor | Sem erro; `/contato`, `/agendar`, `/agendar/confirmado`, `/cancelar/[codigo]`, `/painel` e as duas rotas da API saem dinâmicas |
| Fumaça HTTP contra o `server.js` do build, **sem script**, com `SMTP_TESTE` (um roteiro desta entrega, não versionado) | O POST multipart como o navegador sem script o manda: 303 e a confirmação; os erros em texto com os valores de volta; armadilha e carimbo forjado fingem sucesso; o sexto envio mostra o limite; a **corrida** de dois pedidos (uma reserva só); o horário fora da lista, o profissional que não faz o serviço e o envio de outra origem recusados; o vínculo de cancelamento que abre sem cancelar, cancela no envio e devolve o horário; o painel (limite de tentativas, cookie com `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/painel` e 12 horas, ação sem sessão recusada, saída que apaga o cookie com o mesmo `Path`, bloqueio, cancelamento com motivo, eliminação dos dados); as tarefas com e sem o segredo (401); o SMTP fora do ar |
| **Navegador com JavaScript** (Chromium, pelo Playwright MCP, contra o mesmo build) | O que a especificação marcava [NV] funcionou: a ilha hidrata; o envio com erro não sai e o foco vai para o primeiro campo marcado (no grupo de rádios, para o primeiro rádio), com o erro ligado por `aria-describedby`; o erro some quando o campo fica certo; o **duplo clique** manda um pedido só (um e-mail, uma reserva); depois da ação, os valores voltam preenchidos (a redefinição do formulário não os apaga); o `<Form>` GET navega no cliente; as setas trocam o horário; o horário levado por outro pedido volta com "acabou de ser ocupado" e a lista **recalculada** pelo `refresh()`; o cancelamento, a entrada, o bloqueio e a saída do painel; o cookie só vai a `/painel` (nunca a `/agendar` nem a `/contato`) |
| **A régua** (`../ferramentas/portar-regua.mjs` e o `regua.mjs` portado, **completa**: onze larguras de toque, três de mesa, contraste e teclado) contra o build no modo servidor, em sete páginas: `/contato`, `/contato/enviado`, `/agendar` (com e sem a busca), `/agendar/confirmado`, `/painel` e `/cancelar/<código>` | **0 falhas** nas sete. Os únicos avisos: `net::ERR_ABORTED` em `?_rsc=` (a pré-busca dos vínculos do `<Link>`, que o Next faz no modo servidor e a passagem aborta ao terminar). **Achou quatro defeitos**, já corrigidos: o rádio e a caixa nativos de 20 px (alvo abaixo de 44 px) em quatro lugares (decisão 23); as quatro páginas fora da busca sem `meta description` nem `og:*` (decisão 22; seção 9); o lide da `/agendar` com 20 palavras por período (o teto é 14); e a `/agendar` sem nenhuma ação na primeira tela do celular (o WhatsApp entrou sob o lide) |
| O `npm run pronto` | A combinação "ação de servidor com o padrão estático" é acusada; com o passo 3, passa. Nenhum marcador de pendência nos arquivos do módulo |
| A instalação só da Agenda (a seção 5.2 e os oito arquivos do formulário) | Compila e passa nos testes |
| **Banco real** (um agente, num site do Completo com os dois módulos e a ligação de produção do passo 10; o MariaDB 10.11.19 e o MySQL 8.0.46 no Docker; o build no modo servidor, em três fusos) | **116 verificações por banco, todas aprovadas**, com o código final:<br>- os esquemas, também com `sql_require_primary_key` ligada;<br>- o formulário por HTTP e no Chrome: o limite, a armadilha, o carimbo, a origem, o SMTP fora do ar;<br>- a Agenda: a lista na hora de Niterói, a reserva gravada em UTC, a **corrida** de 2, 12 e 24 pedidos (uma reserva só, nenhum bloco órfão), o cancelamento;<br>- o painel: o cookie, o limite de tentativas, os bloqueios, a eliminação dos dados;<br>- as tarefas: o lembrete uma vez só, mesmo com 8 chamadas simultâneas, e a manutenção;<br>- 200 reservas simultâneas no `repositorio-mysql.ts`, sem sobreposição;<br>- o **impasse (1213)** e o tempo de trava esgotado (1205) devolvidos como "ocupado";<br>- o banco parado e religado sem reiniciar o app.<br><br>**Achou três defeitos**, corrigidos (seção 9): o loopback contado como visitante, a soma do limite em duas instruções e a `ocupacao` sem chave primária. E a `/agendar` caía na tela de erro com o banco parado (decisão 24) |

Os testes de fuso e de horário de verão dependem do ICU completo do Node (o de fábrica) e da base de fusos com o horário de verão de 2018–2019.

**Não verificado:**
- **Outros bancos.** Só rodaram o MariaDB 10.11.19 e o MySQL 8.0.46. Faltam o MySQL 5.7, o 8.4 e o 9, o MariaDB anterior a 10.2.1 e a conexão com TLS.
- **A memória do app.** O servidor ocupa 87 MiB parado, e seis entradas simultâneas no painel o levaram a 602 MiB, pelo `scrypt` (`05-agenda.md`, seção 15).
- **O SMTP.** O envio de verdade nunca rodou. Com o nodemailer 10.0.13, foram conferidos o `jsonTransport` e a mensagem MIME, pelo `streamTransport`: o texto, o `text/calendar` com `method=PUBLISH` e o anexo `.ics`. A entrega, não.
- **O Google.** A assinatura do JWT e a forma das chamadas têm teste (com um `fetch` falso); o Google nunca respondeu.
- **Outros navegadores e aparelhos.** O Chromium de computador foi o único; o Safari, o Firefox e o celular não.
- **O axe e o leitor de tela** nas páginas novas; o Lighthouse; os testes de ponta a ponta do Playwright da qualidade (a suíte versionada). A régua passou (seção 8), mas ela mede o que o navegador desenha, não o que o leitor de tela anuncia.
- **As tarefas do hPanel** e o `X-Forwarded-For` real da Hostinger (seção 15 da Agenda e seção 5.3 do formulário). A correção do loopback cobre o app sem proxy; um proxy que fale com o app por endereço privado sem mandar o cabeçalho ainda poria todos no mesmo balde.

---

## 9. O que a especificação tinha de errado, e como ficou

| Onde | O que estava errado | Como ficou |
|---|---|---|
| `02-formulario.md`, seção 6 (`email.ts`) | **Não compila** com os tipos do nodemailer (`@types/nodemailer` 7.0.11): o `createTransport(condição ? { jsonTransport } : { host… })` não casa com nenhuma sobrecarga (TS2769), e o `info.message` só existe no retorno do transporte JSON, não no do SMTP (TS2551) | Dois transportes: o do SMTP e, só no modo de teste, o JSON (`email.ts` do formulário e da Agenda) |
| `02-formulario.md`, seções 3.2, 3.4 e 6 | Importa `servicos` e `negocio.mensagem` de `conteudo/negocio.ts`; a base não tem nenhum dos dois (a lista de serviços está em `conteudo/site.ts`, sem `id`; a mensagem do WhatsApp é `acao.mensagem`) | `conteudo/formulario.ts` |
| `02-formulario.md`, seção 6 | A linha "Prazo de resposta publicado no site: …" ganha um ponto final, mas o `prazoDeResposta` da base já termina em ponto: o e-mail sairia com dois | `mensagem.ts` normaliza para um ponto só |
| `02-formulario.md`, seção 6 | O `appendFile(".teste/emails.jsonl")` supõe a pasta feita pelo teste: sem ela, o modo de teste vira "falhou" | `mkdir` recursivo antes |
| `05-agenda.md`, seção 6 (`convite.ts`) | Lê o relógio por dentro (`new Date()` no `DTSTAMP`), contra `../qualidade/04-unidade.md`, seção 4.6 ("recebem o agora como argumento") | Parâmetro `agora`, com o relógio como padrão |
| `05-agenda.md`, seção 6 (`escapar`) | O `\r` sozinho não é escapado (só `\r?\n`) | `\r\n`, `\r` e `\n` viram `\n` escrito |
| `05-agenda.md`, seção 7 | A rota chama `enviarLembrete(id)` de `lib/agenda/email.ts`, que a especificação não define | `mensagemDeLembrete` e o `Correio`; a rota usa a porta |
| `02-formulario.md`, seção 3.4; `05-agenda.md`, seções 8 e 9 | A confirmação, o cancelamento e o painel são descritos só com `robots: { index: false }` (e o `referrer`); feitas assim, **reprovam na régua**: sem `meta description` e sem `og:title`, `og:description` e `og:image` | `metadadosDaPagina` com `noindex` e sem `canonical` (decisão 22) |
| `../qualidade/04-unidade.md`, seção 1 | O teste de `carimbo.ts` e de `senha.ts` supõe o alias do Vitest para o `server-only`; o `node:test` não o tem | Decisão 2 |
| `../esteira/modelos/aviso-de-privacidade.md`, bloco [FORMULÁRIO] | "ficam guardados no servidor do site" contradiz `02-formulario.md`, seção 7 ("só no e-mail do cliente") | Decisão 20 |
| `05-agenda.md`, seção 16 | Pede "o deslocamento simulado de horário de verão" | Não precisa simular: a base de fusos do Node tem o horário de verão de 2018–2019; os testes usam as datas reais |
| `02-formulario.md`, seção 5.3 (`ipDoVisitante`) | O ramo "sem cabeçalho" nunca acontecia: o Next 16 põe o endereço do soquete no `x-forwarded-for` quando ele falta, e sem proxy todo visitante caía no balde do loopback (achado do teste com banco real) | O loopback conta como sem IP; um teste de unidade novo |
| `02-formulario.md`, seção 5.3 (`contarEnvio`) | A soma e a leitura em duas instruções, cada uma numa conexão do pool: doze envios simultâneos do mesmo IP entregavam de 0 a 4 mensagens, e não 5 (idem) | Uma instrução só, com `LAST_INSERT_ID(expr)` |
| `05-agenda.md`, seção 3 (`ocupacao`) | Sem chave primária: o MySQL com `sql_require_primary_key` ligada recusa a tabela (erro 3750) (idem) | A chave única virou primária, com a mesma recusa da duplicata (1062) |

---

## 10. O que ficou de fora

- **A galeria, o relatório de acessos, as funcionalidades do ofício, a peça-assinatura e a Presença** (`../esteira/14-funcionalidades/`, 03, 04, 06, 07 e 08): fora do pedido.
- **A suíte de ponta a ponta com Playwright** da qualidade (`../qualidade/05-ponta-a-ponta.md`): não foi escrita nem versionada. Os fluxos que a fumaça HTTP e o navegador provaram são os que ela deve cobrir; na Agenda, ela pede também um MySQL de teste.
- **WhatsApp automático pela API da Meta, SMS, pagamento, o ALTCHA** (`05-agenda.md`, seção 11; `02-formulario.md`, seção 5): opcionais da especificação, cada um uma dependência ou um serviço.
- **O Easy!Appointments** (plano B da Agenda, `05-agenda.md`, seção 14): outro caminho, sem relação com este código.
- **A migração com Drizzle**: o SQL é direto; o esquema é o mesmo nos dois.

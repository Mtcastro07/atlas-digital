# O módulo Agenda

> **Para que serve.** Especifica a Agenda: a marcação e a confirmação **no próprio site, com servidor próprio**. Cobre os horários livres, a reserva sem conflito entre dois pedidos, o convite de calendário, o lembrete, o painel do dono, o cancelamento, a privacidade, o esforço e os testes.
>
> **Quando ler.** Antes de vender a Agenda a um cliente (o esforço da primeira é de 40 a 80 horas) e antes de construí-la.
>
> **Depende de.** `README.md`, `02-formulario.md` (a proteção, o e-mail, o banco), `../13-tecnologia-e-estrutura.md` (seção 9: a regra de tecnologia nova), `../17-conformidade-e-normas.md`, `../18-publicacao-e-manutencao.md` (o web app Node, a cota, a atualização em ondas), `../../qualidade/09-seguranca-e-privacidade.md`.
>
> **Estado.**
> - **RATIFICADO:** a Agenda como módulo, +R$ 400 de criação e +R$ 80 por mês, em qualquer plano (ata v3.0, IV.2), e "no próprio site, com servidor próprio" (ata v3.0, IV.2.1; decisão do usuário em 07.10.2026).
> - **RATIFICADO** em 08.10.2026: a arquitetura abaixo, pesquisada em 07 e 08.10.2026 (no repositório do Atlas, `documentacao/atlas--tecnologia.md`, seção 5.4). Construída em 08.10.2026 (`../../modulos/agenda/`, abaixo) e conferida contra banco real no mesmo dia (MariaDB 10.11.19 e MySQL 8.0.46: a corrida, o impasse, o cancelamento, o painel, as tarefas e o banco fora do ar; `../../modulos/README.md`, seção 8). O SMTP e o Google reais, ainda não.
> - **[ex]:** a barbearia de exemplo demonstra a marcação como **pedido de horário pelo WhatsApp**, sem servidor (`07-funcionalidades-do-oficio.md`).
>
> **A implementação executável (desde 08.10.2026):** `../../modulos/agenda/`. Ela traz:
> - 87 testes de unidade;
> - a verificação de tipos e o build em servidor;
> - os testes de fumaça e a régua sem falha;
> - a caixa de consentimento da psicologia (seção 1, "Varia por").
>
> O banco e o e-mail usam o `mysql2` e o `nodemailer`, aprovados pelo usuário em 08.10.2026. O módulo corrige os erros do código deste documento, listados em `../../modulos/README.md`, seção 9. Entre eles:
> - o `convite.ts` lia o relógio por dentro;
> - o `.ics` não escapava o `\r` solto;
> - o `enviarLembrete` era usado sem existir;
> - a confirmação, o cancelamento e o painel não tinham descrição nem cartão.
>
> **Na dúvida entre o trecho daqui e o módulo, vale o módulo.** A regra, o objetivo e a conferência continuam aqui.
>
> **Atualizado em:** 08.10.2026.

---

## 1. O que a Agenda faz, e o que não faz

**Regra.** A Agenda faz sete coisas:
1. **Mostra os horários livres**, calculados no servidor a cada consulta: o expediente, as folgas, a duração do serviço, a antecedência.
2. **Reserva sem conflito:** dois pedidos para o mesmo horário nunca viram duas reservas.
3. **Confirma por e-mail**, com o convite de calendário (`.ics`) e o vínculo de cancelamento.
4. **Avisa o dono**, por e-mail com o mesmo convite e, se ele quiser, com o evento direto na agenda do Google dele.
5. **Lembra** a pessoa por e-mail, na véspera.
6. **Dá ao dono um painel:** as próximas reservas, o cancelamento, o bloqueio de horário.
7. **Deixa a pessoa cancelar** pelo vínculo do e-mail.

**Não faz:**
- **pagamento**;
- **SMS:** consumiria quase os R$ 80 do mês;
- **WhatsApp automático:** só como opcional pago, pela API oficial (seção 11);
- **prontuário ou dado de saúde**;
- **mais de uma unidade:** cada uma é uma Agenda.

**Objetivo.** Tirar do dono a troca de mensagens para marcar ("tem horário sexta?", "e de tarde?") sem tirar dele o controle: o expediente é dele, e o painel mostra tudo.

**Para quem.** Quem atende por horário: barbearia, nutrição, psicologia, academia (aula experimental), pet shop, odontologia, medicina; a imobiliária, para visitas (`../03-planos.md`, seção 8).

**Varia por.** Na **psicologia**, o mínimo de dados, na leitura cautelosa do nicho (`../nichos/psicologia.md`, seções 3 e 5.4; RATIFICADO em 08.10.2026, A CONFIRMAR com advogado):
- **os dados:** nome, o e-mail (o canal da confirmação, do lembrete e do cancelamento), o telefone opcional, a modalidade de **atendimento** (presencial ou on-line) e o horário;
- **o que nunca se pede:** o motivo, a modalidade **clínica** ou a abordagem;
- **o serviço:** "sessão";
- **a base legal:** o consentimento específico e destacado, porque procurar uma psicóloga já revela dado de saúde (LGPD, arts. 5º, II, e 11, I). É uma caixa desmarcada, com o texto do que se trata, no lugar do art. 7º, V, da seção 12. Até 08.10, esta seção dizia "nome e um contato" e a seção 12, "sem caixa de consentimento", contra o arquivo do nicho, que pedia o consentimento.

---

## 2. Onde roda

| Peça | Escolha | Por quê |
|---|---|---|
| Servidor | O web app Node.js da Hostinger, do próprio site do cliente | "Servidor próprio" é o contratado pelo Atlas, sem serviço de terceiro |
| Banco | O MySQL do plano, **um por cliente**; o app conecta em `127.0.0.1`, não em `localhost` [FU: pesquisa de 07.10.2026] | Apagar tudo no fim do contrato fica simples; o backup diário da Hostinger cobre o banco |
| Não | SQLite | As pastas do app (`hbuilds/`, `public_html`) são sobrescritas a cada publicação, e só a versão no ar fica: o arquivo do banco iria junto. O `better-sqlite3` ainda é módulo nativo; o `node:sqlite`, do próprio Node, só seria candidato com o arquivo fora dessas pastas [FU] |
| Não | Postgres, Redis, MongoDB | Só existem em VPS |
| Não | O agendador do MySQL (`event_scheduler`) | Vem desligado no plano: a limpeza e o lembrete vão pelas tarefas agendadas do hPanel (seção 7) [FU] |
| Alternativa ao Drizzle | Prisma 7 | Serve: sem o motor em Rust, com o `@prisma/adapter-mariadb`. É dependência nova, como o Drizzle [FU] |
| Acesso ao banco | `mysql2`, com o Drizzle para o esquema e as migrações | JavaScript puro, cabe no build standalone |
| E-mail | O SMTP da Hostinger, pelo `nodemailer` (`02-formulario.md`, seção 6) | — |
| Tarefas agendadas | As do hPanel (cron), chamando um endereço protegido do site | O web app dorme sem tráfego: nada pode depender de um relógio dentro dele |

**Dependências:** `mysql2` e `nodemailer`, **aprovadas pelo usuário em 08.10.2026**, nas versões de `../../modulos/README.md`, seção 3. O Drizzle (`drizzle-orm` e `drizzle-kit`), que esta especificação considerou, **não** entra: o módulo usa o `mysql2` com SQL direto, e o esquema é o mesmo.

**A cota de web apps.**
- **Quantos cabem:** o plano Business comporta poucos web apps Node. Fontes de terceiros dizem 5; a documentação oficial não dá o número (A CONFIRMAR no hPanel). O site do Atlas ocupa um.
- **Antes do quinto cliente com servidor,** escolher entre duas saídas:
  - subir para o Cloud Startup (10 web apps);
  - montar um **único web app de serviços**, que recebe os formulários e as Agendas de vários clientes, com os sites deles estáticos.

---

## 3. O modelo de dados

**Regras do modelo:**
- **Tudo em UTC** no banco. O expediente é a exceção: ele é hora de parede de Niterói ("09:00"), porque é assim que o dono pensa.
- **O dia é dividido em blocos de 15 minutos.** Cada reserva ocupa os blocos do serviço e do intervalo depois dele, numa tabela com **chave única** (profissional, bloco).
- **O expediente começa e termina em múltiplo de 15 minutos** (9h, 9h15, 9h30). Assim, todos os blocos de um profissional ficam na mesma grade, e a chave única pega qualquer sobreposição. O fuso de Niterói é de horas inteiras: a grade de parede e a de UTC coincidem.
- **O código de cancelamento é guardado só em hash.** Ele vai no e-mail, e quem lê o banco não consegue cancelar.

```sql
CREATE TABLE profissional (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(80) NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE servico (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(80) NOT NULL,
  duracao_min SMALLINT UNSIGNED NOT NULL,        -- múltiplo de 15
  intervalo_min SMALLINT UNSIGNED NOT NULL DEFAULT 0, -- limpeza, preparo
  ativo BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE profissional_servico (
  profissional_id INT UNSIGNED NOT NULL,
  servico_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (profissional_id, servico_id)
);
CREATE TABLE expediente (                         -- hora de parede de Niterói
  profissional_id INT UNSIGNED NOT NULL,
  dia_semana TINYINT UNSIGNED NOT NULL,           -- 0 = domingo
  abre TIME NOT NULL,                             -- múltiplo de 15 min
  fecha TIME NOT NULL,
  PRIMARY KEY (profissional_id, dia_semana, abre)
);
CREATE TABLE folga (                              -- férias, consulta externa, feriado
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  profissional_id INT UNSIGNED NULL,              -- NULL = a casa inteira
  inicio DATETIME NOT NULL,                       -- UTC
  fim DATETIME NOT NULL,
  motivo VARCHAR(80) NOT NULL
);
CREATE TABLE reserva (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  profissional_id INT UNSIGNED NOT NULL,
  servico_id INT UNSIGNED NOT NULL,
  inicio DATETIME NOT NULL,                       -- UTC
  fim DATETIME NOT NULL,                          -- inclui o intervalo
  nome VARCHAR(80) NOT NULL,
  email VARCHAR(254) NOT NULL,
  telefone VARCHAR(20) NULL,
  situacao ENUM('confirmada', 'cancelada') NOT NULL DEFAULT 'confirmada',
  token_hash BINARY(32) NOT NULL,                 -- SHA-256 do código de cancelamento
  evento_google VARCHAR(1024) NULL,               -- para apagar o evento no cancelamento
  lembrete_enviado_em DATETIME NULL,
  criada_em DATETIME NOT NULL DEFAULT (UTC_TIMESTAMP()),
  cancelada_em DATETIME NULL,
  UNIQUE KEY (token_hash),
  KEY (inicio)
);
CREATE TABLE ocupacao (                           -- um bloco de 15 min ocupado
  profissional_id INT UNSIGNED NOT NULL,
  inicio_bloco DATETIME NOT NULL,                 -- UTC
  reserva_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (profissional_id, inicio_bloco),    -- a chave única da marcação dupla; como primária, também onde o MySQL exige uma (sql_require_primary_key)
  KEY (reserva_id)                                -- o cancelamento apaga pelos blocos da reserva, sem varrer a tabela
);
CREATE TABLE dono (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(254) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL                     -- scrypt, com o custo e o sal (seção 9)
);
CREATE TABLE sessao (
  hash BINARY(32) PRIMARY KEY,                    -- SHA-256 do código do cookie
  dono_id INT UNSIGNED NOT NULL,
  expira_em DATETIME NOT NULL
);
```

**O padrão por expressão** (`DEFAULT (UTC_TIMESTAMP())`, com os parênteses) exige MySQL 8.0.13 ou MariaDB 10.2.1 em diante [FU]. A versão do banco da Hostinger se confere com `SELECT VERSION()` (A CONFIRMAR); sem suporte, a data vai do código. Executado em 08.10.2026 no MariaDB 10.11.19 e MySQL 8.0.46, também com `sql_require_primary_key` ligada, a opção de alguns bancos gerenciados que recusa tabela sem chave primária: foi ela que trocou a chave única da `ocupacao` por primária.

**Os parâmetros da casa** (em `conteudo/agenda.ts`, mudados pela manutenção):

| Parâmetro | Exemplo | Para quê |
|---|---|---|
| Antecedência mínima | 2 horas | Ninguém marca para daqui a 10 minutos |
| Antecedência máxima | 30 dias | O expediente de daqui a três meses ainda não existe |
| Cancelamento pela pessoa até | 3 horas antes | Depois disso, só pelo WhatsApp da casa |
| Guarda das reservas | 12 meses depois do atendimento | O aviso de privacidade publica (seção 12) |

---

## 4. Os horários livres

**Regra.** Os horários livres saem do servidor, a cada consulta:
- do expediente do profissional no dia da semana;
- menos as folgas;
- menos os blocos ocupados;
- menos o que fica antes da antecedência mínima e o que passa da máxima (as duas de `conteudo/agenda.ts`, seção 3, passadas pela página e pela ação).

Um horário só aparece se o serviço **e** o intervalo depois dele couberem sem tocar outra reserva. A data chega pelo endereço: fora do formato `aaaa-mm-dd` ou inexistente ("2026-13-45"), a lista sai vazia. **Nunca** se confia na lista que o navegador manda de volta: a reserva confere de novo (seção 5), e a antecedência máxima vale também ali — sem ela, uma reserva enviada à mão para qualquer data futura passaria, porque o expediente semanal se repete.

**Objetivo.** Uma regra num lugar só, no servidor. O dono muda o expediente e a lista muda na consulta seguinte, sem cache para esquecer.

**O fuso: hora de parede e instante.**
- **O expediente** é hora de parede de Niterói; a reserva é um instante UTC.
- **A conversão** usa o fuso **pelo nome** (`America/Sao_Paulo`), nunca −03:00 fixo: o horário de verão está suspenso desde 2019, e a volta é avaliada pelo governo [FU] (`01-base-de-todo-site.md`, seção 5).
- **Sem biblioteca de datas:** o `Intl` do Node faz a conta.

```ts
// lib/agenda/fuso.ts — hora de parede de Niterói ↔ instante UTC, pelo nome do fuso.
const relogio = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Sao_Paulo",
  year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
});

/** Quantos minutos Niterói está à frente do UTC num instante (hoje, −180). */
function deslocamento(instante: number) {
  const p = Object.fromEntries(relogio.formatToParts(new Date(instante)).map((x) => [x.type, x.value]));
  const comoUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute);
  return Math.round((comoUtc - Math.floor(instante / 60_000) * 60_000) / 60_000);
}

/** O instante UTC de uma data e hora de parede em Niterói ("2026-10-09", "14:30" → 17:30Z). */
export function instanteEmNiteroi(data: string, hora: string) {
  const [a, m, d] = data.split("-").map(Number);
  const [h, min] = hora.split(":").map(Number);
  const comoUtc = Date.UTC(a, m - 1, d, h, min);
  // Duas passadas: a segunda corrige a data que cai do outro lado de uma mudança de horário.
  let instante = comoUtc - deslocamento(comoUtc) * 60_000;
  instante = comoUtc - deslocamento(instante) * 60_000;
  return new Date(instante);
}
```

```ts
// lib/agenda/livres.ts — os horários livres de um profissional num dia. Puro: recebe tudo, inclusive o "agora".
import { instanteEmNiteroi } from "./fuso";

const BLOCO = 15 * 60_000;
type Intervalo = { inicio: Date; fim: Date };

/** A data vem do endereço: só "aaaa-mm-dd" de um dia que existe ("2026-13-45" viraria 14.02.2027 no Date.UTC). */
function dataValida(data: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) return false;
  const [a, m, d] = data.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, d)).toISOString().slice(0, 10) === data;
}

export function horariosLivres(p: {
  data: string;                          // o dia, em Niterói: "2026-10-09"
  faixas: { abre: string; fecha: string }[]; // o expediente desse dia da semana
  duracaoMin: number;
  intervaloMin: number;
  ocupados: Intervalo[];                 // reservas (com o intervalo) e folgas do dia
  agora: Date;
  antecedenciaMinimaMin: number;
  antecedenciaMaximaMin: number;         // 30 dias = 43_200 (conteudo/agenda.ts)
}) {
  if (!dataValida(p.data)) return [];
  const livres: Date[] = [];
  const limite = p.agora.getTime() + p.antecedenciaMinimaMin * 60_000;
  const teto = p.agora.getTime() + p.antecedenciaMaximaMin * 60_000;
  for (const f of p.faixas) {
    const abre = instanteEmNiteroi(p.data, f.abre).getTime();
    const fecha = instanteEmNiteroi(p.data, f.fecha).getTime();
    for (let inicio = abre; inicio + p.duracaoMin * 60_000 <= fecha; inicio += BLOCO) {
      const fim = inicio + (p.duracaoMin + p.intervaloMin) * 60_000; // o intervalo pode passar do fechamento
      const choca = p.ocupados.some((o) => inicio < o.fim.getTime() && o.inicio.getTime() < fim);
      if (inicio >= limite && inicio <= teto && !choca) livres.push(new Date(inicio));
    }
  }
  return livres;
}
```

**Sem preferência de profissional.** A lista é a união dos horários livres de quem faz o serviço. Na reserva, o servidor escolhe o primeiro profissional livre naquele horário.

**A página de marcação funciona sem script.**
1. Um `<Form action="/agendar">` do `next/form` (GET: serviço, profissional, dia) pede a página com os parâmetros no endereço. Com script, a troca é navegação no cliente, sem recarregar; sem script, é um GET comum. A política de conteúdo (`form-action 'self'`) aceita os dois.
2. A página, dinâmica, lista os horários livres como opções.
3. Os dados da pessoa e o "Reservar" vão num segundo formulário, para a Server Action.

**Com o banco fora do ar,** a página abre com o aviso `foraDoAr` e o WhatsApp, nunca com a tela de erro, que não tem saída para a conversa. Vale para o catálogo e para os horários do dia; o envio sem script, que volta para esta página, cai no mesmo aviso. Achado do teste com banco real (08.10.2026), conferido com o banco parado.

O `<Form>` é componente do próprio Next, sem dependência (documentação local do Next 16.3, `02-components/form.md`) [V].

---

## 5. A reserva sem conflito

**Regra.** A reserva e os blocos que ela ocupa são gravados **na mesma transação**. Se outro pedido levou um bloco um instante antes, a chave única recusa (erro 1062, `ER_DUP_ENTRY`); a transação volta, e a pessoa lê: "Este horário acabou de ser ocupado. Escolha outro." A mesma resposta vale para o impasse (1213, `ER_LOCK_DEADLOCK`) e para a espera esgotada (1205): quando um pedido que segura um bloco desfaz a transação, dois pedidos que esperavam a mesma chave podem entrar em impasse, e o InnoDB devolve 1213, não 1062 (manual do MySQL 8.0, "Locks Set by Different SQL Statements in InnoDB") [NV: SQL lido, não executado; provocar o impasse num banco de teste].

**Objetivo.** Dois clientes clicam no mesmo horário ao mesmo tempo. Sem a chave única, os dois recebem confirmação, e o dono descobre na hora do atendimento. A chave única é o banco garantindo o que o código não consegue garantir sozinho.

```ts
// lib/agenda/reservar.ts
import "server-only";
import { createHash, randomBytes } from "node:crypto";

import { banco } from "@/lib/banco";

const BLOCO_MIN = 15;

export async function reservar(r: {
  profissionalId: number; servicoId: number; inicio: Date; ocupaMin: number; // duração + intervalo
  nome: string; email: string; telefone: string | null;
}) {
  const codigo = randomBytes(16).toString("base64url"); // 128 bits: vai no e-mail, nunca no banco
  const conexao = await banco.getConnection();
  try {
    await conexao.beginTransaction();
    const [inserida] = await conexao.query(
      "INSERT INTO reserva (profissional_id, servico_id, inicio, fim, nome, email, telefone, token_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [r.profissionalId, r.servicoId, r.inicio, new Date(r.inicio.getTime() + r.ocupaMin * 60_000), r.nome, r.email, r.telefone,
        createHash("sha256").update(codigo).digest()],
    );
    const reservaId = (inserida as { insertId: number }).insertId;
    const blocos = Array.from({ length: Math.ceil(r.ocupaMin / BLOCO_MIN) }, (_, i) => [
      r.profissionalId, new Date(r.inicio.getTime() + i * BLOCO_MIN * 60_000), reservaId,
    ]);
    await conexao.query("INSERT INTO ocupacao (profissional_id, inicio_bloco, reserva_id) VALUES ?", [blocos]);
    await conexao.commit();
    return { ok: true as const, reservaId, codigo };
  } catch (erro) {
    await conexao.rollback();
    // 1062: outro pedido levou o bloco. 1213 (impasse) e 1205 (espera esgotada): a disputa pelos mesmos blocos
    // não terminou a favor deste pedido. Nos três casos, a pessoa escolhe de novo, na lista recalculada.
    const errno = (erro as { errno?: number }).errno;
    if (errno === 1062 || errno === 1213 || errno === 1205) return { ok: false as const, motivo: "ocupado" as const };
    throw erro;
  } finally {
    conexao.release();
  }
}
```

**A ação que chama `reservar`** faz, antes, o mesmo que o formulário (`02-formulario.md`):
- o campo-armadilha;
- o carimbo de tempo;
- a validação, com o e-mail obrigatório: é o canal da confirmação, do lembrete e do cancelamento;
- o limite por IP.

Ela também confere que o horário pedido está na lista de `horariosLivres` calculada **agora**, com a antecedência mínima e a máxima de `conteudo/agenda.ts`. Depois da reserva, redireciona para `/agendar/confirmado` (303 sem script), que diz "Reserva feita. O convite e o vínculo de cancelamento foram para o seu e-mail." e não repete dado pessoal.

**Alternativa no MariaDB 10.5.3 ou mais novo:** períodos de aplicação com `WITHOUT OVERLAPS`, que recusam a sobreposição direto na tabela de reservas [FU]. Não existe no MySQL. Os blocos funcionam nos dois.

---

## 6. A confirmação e o convite de calendário

**Regra.** Ao reservar, dois e-mails saem pelo SMTP:
- **Para a pessoa:** o serviço, o profissional, o dia e a hora por extenso ("sexta-feira, 9 de outubro, às 14h30"), o endereço com o vínculo do mapa, o vínculo de cancelamento e o convite `.ics` ("adicionar à agenda").
- **Para o dono:** o mesmo, com o contato da pessoa.

**Se o e-mail falhar,** a reserva continua feita. A página de confirmação diz que o e-mail não saiu e mostra o dia e a hora na tela, com o WhatsApp da casa. Nunca uma reserva que a pessoa não sabe que fez.

**O convite** segue a RFC 5545: linhas com CRLF, dobradas em 75 octetos, horários em UTC (o `Z` no fim), `UID` estável e texto escapado. Com `METHOD:PUBLISH`, é uma mensagem iTIP, e a RFC 5546 (seção 3.2.1) pede `ORGANIZER` no evento: a casa, com o e-mail que envia. Clientes tolerantes aceitam o convite sem ele; outros podem recusá-lo.

```ts
// lib/agenda/convite.ts — o convite de calendário, sem biblioteca.
const instante = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); // 20261009T173000Z
const escapar = (t: string) => t.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

/** Dobra a linha em 75 octetos; a continuação começa com um espaço (RFC 5545, 3.1). */
function dobrar(linha: string) {
  if (Buffer.byteLength(linha) <= 75) return linha;
  const partes: string[] = [];
  let atual = "";
  for (const letra of linha) {
    if (Buffer.byteLength(atual + letra) > (partes.length ? 74 : 75)) {
      partes.push(atual);
      atual = "";
    }
    atual += letra;
  }
  return [...partes, atual].join("\r\n ");
}

export function convite(c: {
  uid: string; inicio: Date; fim: Date; titulo: string; local: string; descricao: string;
  organizador: { nome: string; email: string }; // a casa: o METHOD:PUBLISH exige ORGANIZER (RFC 5546, 3.2.1)
}) {
  const nome = c.organizador.nome.replace(/["\r\n]/g, ""); // valor entre aspas não aceita aspas nem quebra
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Atlas Digital//Agenda//PT-BR", "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${c.uid}`, // reserva-<id>@<domínio do cliente>
    `DTSTAMP:${instante(new Date())}`,
    `DTSTART:${instante(c.inicio)}`,
    `DTEND:${instante(c.fim)}`,
    `ORGANIZER;CN="${nome}":mailto:${c.organizador.email}`,
    `SUMMARY:${escapar(c.titulo)}`,
    `LOCATION:${escapar(c.local)}`,
    `DESCRIPTION:${escapar(c.descricao)}`, // inclui o vínculo de cancelamento
    "END:VEVENT", "END:VCALENDAR",
  ].map(dobrar).join("\r\n") + "\r\n";
}
// No nodemailer: icalEvent: { method: "PUBLISH", filename: "reserva.ics", content: convite(...) },
// com organizador: { nome: negocio.nome, email: process.env.SMTP_USUARIO! }
```

**O `DTEND` do convite** é o fim do **serviço**, sem o intervalo de limpeza: o intervalo é da casa, não da pessoa.

### 6.1 · O evento na agenda do Google do dono (opcional)

**Na primeira versão,** basta o `.ics` do e-mail do dono: um toque, e o evento está na agenda dele.

**Se ele vive na agenda do Google,** o evento pode entrar sozinho, por uma **conta de serviço**, sem OAuth:
1. O dono compartilha a agenda com o e-mail da conta, com a permissão de alterar eventos.
2. O servidor assina um JWT RS256 com a chave da conta (`node:crypto`), troca-o por um token e cria o evento.
3. O `id` do evento fica na reserva, para apagá-lo no cancelamento.

Sem a biblioteca `googleapis` (pesada): são duas chamadas `fetch` [NV: conferir o fluxo de conta de serviço na documentação do Google antes de construir].
**Por que conta de serviço, e não o OAuth do dono:** com o app em modo de teste, o token de usuário expira em 7 dias; sair do modo de teste exige a verificação do Google para o escopo da agenda [FU: pesquisa de 07.10.2026]. A conta de serviço não depende de nenhum dos dois.

```ts
// lib/agenda/google.ts — RATIFICADO
import "server-only";
import { createSign } from "node:crypto";

const base64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");

async function tokenDaConta() {
  const agora = Math.floor(Date.now() / 1000);
  const cabeca = base64({ alg: "RS256", typ: "JWT" });
  const corpo = base64({
    iss: process.env.GOOGLE_CONTA_EMAIL,
    scope: "https://www.googleapis.com/auth/calendar.events",
    aud: "https://oauth2.googleapis.com/token",
    iat: agora,
    exp: agora + 3600,
  });
  const assinatura = createSign("RSA-SHA256").update(`${cabeca}.${corpo}`).sign(process.env.GOOGLE_CONTA_CHAVE!.replace(/\\n/g, "\n"), "base64url");
  const resposta = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${cabeca}.${corpo}.${assinatura}` }),
  });
  if (!resposta.ok) throw new Error(`token do Google: ${resposta.status}`);
  return ((await resposta.json()) as { access_token: string }).access_token;
}

export async function criarEvento(e: { inicio: Date; fim: Date; titulo: string; descricao: string }) {
  const agenda = encodeURIComponent(process.env.GOOGLE_AGENDA_ID!);
  const resposta = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${agenda}/events`, {
    method: "POST",
    headers: { Authorization: `Bearer ${await tokenDaConta()}`, "Content-Type": "application/json" },
    body: JSON.stringify({ summary: e.titulo, description: e.descricao, start: { dateTime: e.inicio.toISOString() }, end: { dateTime: e.fim.toISOString() } }),
  });
  if (!resposta.ok) throw new Error(`evento no Google: ${resposta.status}`);
  return ((await resposta.json()) as { id: string }).id;
}
```

**A conta de serviço não convida a pessoa.** Ela grava na agenda do dono, e a pessoa recebe o `.ics` pelo e-mail. Uma falha do Google não desfaz a reserva: o dono tem o e-mail com o convite.

---

## 7. O lembrete

**Regra.** Uma tarefa agendada do hPanel chama, a cada 15 minutos, um endereço protegido do site. Ele faz três coisas:
- manda o lembrete a quem tem horário nas próximas 24 horas e ainda não foi lembrado, desde que falte mais de 2 horas e que a reserva tenha sido feita mais de 24 horas antes do horário (quem marca na véspera acabou de receber a confirmação; um lembrete minutos depois dela não é "na véspera");
- marca o envio **antes** de enviar, só se ninguém marcou;
- desmarca, se o envio falhar.

Duas chamadas ao mesmo tempo nunca mandam o lembrete em dobro.

**Objetivo.** O web app dorme sem tráfego: um relógio dentro dele não acordaria. A chamada da tarefa agendada acorda o app e faz o trabalho. Lembrete reduz a falta, e falta é o custo que o dono sente.

```bash
# Tarefa agendada do hPanel, a cada 15 minutos (*/15 * * * *). O segredo fica só aqui e nas variáveis do app.
curl -fsS -X POST -H "Authorization: Bearer <SEGREDO_DO_CRON>" https://<domínio>/api/lembretes > /dev/null
```

```ts
// app/api/lembretes/route.ts
import { createHash, timingSafeEqual } from "node:crypto";

import { enviarLembrete } from "@/lib/agenda/email";
import { banco } from "@/lib/banco";

/** Compara pelo hash: os dois lados com o mesmo tamanho, e a comparação não revela o comprimento do segredo. */
function autorizado(cabecalho: string | null) {
  const esperado = createHash("sha256").update(`Bearer ${process.env.SEGREDO_DO_CRON}`).digest();
  return timingSafeEqual(esperado, createHash("sha256").update(cabecalho ?? "").digest());
}

export async function POST(request: Request) {
  if (!process.env.SEGREDO_DO_CRON || !autorizado(request.headers.get("authorization"))) return new Response(null, { status: 401 });
  const [linhas] = await banco.query(
    // A última condição: marcada na véspera, a confirmação acabou de sair; sem lembrete.
    `SELECT id FROM reserva
      WHERE situacao = 'confirmada' AND lembrete_enviado_em IS NULL
        AND inicio BETWEEN UTC_TIMESTAMP() + INTERVAL 2 HOUR AND UTC_TIMESTAMP() + INTERVAL 24 HOUR
        AND criada_em <= inicio - INTERVAL 24 HOUR`,
  );
  let enviados = 0;
  for (const { id } of linhas as { id: number }[]) {
    const [marcou] = await banco.query("UPDATE reserva SET lembrete_enviado_em = UTC_TIMESTAMP() WHERE id = ? AND lembrete_enviado_em IS NULL", [id]);
    if ((marcou as { affectedRows: number }).affectedRows !== 1) continue; // outra chamada já marcou
    try {
      await enviarLembrete(id);
      enviados++;
    } catch {
      await banco.query("UPDATE reserva SET lembrete_enviado_em = NULL WHERE id = ?", [id]); // tenta de novo daqui a 15 min
    }
  }
  return Response.json({ enviados });
}
```

**A mesma tarefa, uma vez por dia,** chama `/api/manutencao`, que:
- apaga o limite de envios e o sal do dia anterior (`02-formulario.md`, seção 5.3);
- apaga as sessões vencidas do painel;
- apaga as reservas que passaram do prazo de guarda (seção 12).

**O fuso das tarefas.** O hPanel as roda em UTC (`../18-publicacao-e-manutencao.md`, seção 2.1). Para a de 15 minutos, não importa; a diária vai às 3h UTC, que é meia-noite em Niterói. **A CONFIRMAR no hPanel:** se as tarefas agendadas aparecem para web apps Node.
**A tarefa no hPanel** é do tipo "Custom" (qualquer comando) e também se cria pela API da conta [FU]. **A reserva, se o hPanel não oferecer tarefas ao web app Node:** um fluxo agendado do GitHub Actions chamando o mesmo endereço, com o segredo nas variáveis do repositório. Só como reserva: o intervalo mínimo é de 5 minutos, e sob carga a execução atrasa ou é descartada (documentação do GitHub) [FU: pesquisa de 07.10.2026].

---

## 8. O cancelamento pela pessoa

**Regra.**
- **O vínculo do e-mail** (`/cancelar/<código>`) **abre uma página** com a reserva e o botão "Cancelar a reserva". O cancelamento acontece no **envio** do formulário (POST, Server Action), nunca na abertura do vínculo.
- **O código** tem 128 bits aleatórios, é guardado só em hash e vale até a antecedência de cancelamento (seção 3). Depois dela, a página explica e mostra o WhatsApp da casa.
- **Cancelar faz quatro coisas:** apaga os blocos da reserva (o horário volta à lista), marca a reserva como cancelada, avisa o dono por e-mail e apaga o evento do Google, se houver.
- **A página** leva `robots: { index: false }` e `referrer: "no-referrer"` nos metadados: o código no endereço não vaza para lugar nenhum.

**Objetivo.**
- **Por que POST:** filtros de e-mail e prévias de mensagem **abrem os vínculos sozinhos**, para conferir se são seguros. Um cancelamento por GET cancelaria reservas que ninguém quis cancelar.
- **Por que o hash:** o código guardado só em hash impede que um vazamento do banco vire um botão de cancelar as reservas de todos.

**Como conferir.**
- Abrir o vínculo **não** cancela.
- Enviar o formulário cancela, e o horário volta à lista.
- Um código inventado mostra "Reserva não encontrada" sem dizer se o código existiu.
- Um código usado duas vezes mostra "Esta reserva já foi cancelada".

---

## 9. O painel do dono

**Regra.**
- **Onde:** `/painel`, com e-mail e senha.
- **Primeira versão** (RATIFICADO):
  - as reservas dos próximos 14 dias, por dia e profissional;
  - cancelar uma reserva, com o motivo, que vai por e-mail à pessoa;
  - bloquear um horário ou um dia (folga);
  - procurar e apagar os dados de uma pessoa (pedido do titular).
- **O expediente** muda pela manutenção mensal, não pelo painel.

**A senha** é guardada com o `scrypt` do próprio Node, sem dependência, nos parâmetros da OWASP (N = 2^17, r = 8, p = 1, 128 MiB por conferência) [FU: OWASP, Password Storage Cheat Sheet]. A tabela da OWASP dá um equivalente com menos memória (N = 2^15, r = 8, p = 3; 32 MiB), se o web app tiver pouca. O argon2id seria a primeira escolha da OWASP, mas pede dependência com código nativo.

```ts
// lib/painel/senha.ts
import "server-only";
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

type Custo = { N: number; r: number; p: number };
const CUSTO: Custo = { N: 2 ** 17, r: 8, p: 1 }; // OWASP; com pouca memória: { N: 2 ** 15, r: 8, p: 3 }
const TAMANHO = 64;

function derivar(senha: string, sal: Buffer, c: Custo) {
  return new Promise<Buffer>((ok, falha) =>
    scrypt(senha.normalize("NFC"), sal, TAMANHO, { ...c, maxmem: 256 * 1024 * 1024 }, (erro, chave) => (erro ? falha(erro) : ok(chave))),
  );
}

/** "scrypt$N$r$p$sal$hash": o custo vai junto, e trocar o custo não invalida as senhas já guardadas. */
export async function guardarSenha(senha: string) {
  const sal = randomBytes(16);
  const hash = await derivar(senha, sal, CUSTO);
  return ["scrypt", CUSTO.N, CUSTO.r, CUSTO.p, sal.toString("base64url"), hash.toString("base64url")].join("$");
}

/** Falso para senha errada e para registro malformado; nunca lança por tamanho diferente nem por custo inválido. */
export async function conferirSenha(senha: string, guardada: string) {
  const [tipo, N, r, p, sal, hash] = guardada.split("$");
  const esperado = Buffer.from(hash ?? "", "base64url");
  if (tipo !== "scrypt" || !sal || esperado.length !== TAMANHO) return false;
  // Custo ilegível no registro (N que não é potência de 2, memória acima do teto): o scrypt lança; aqui, falso.
  const obtido = await derivar(senha, Buffer.from(sal, "base64url"), { N: Number(N), r: Number(r), p: Number(p) }).catch(() => null);
  return obtido !== null && timingSafeEqual(obtido, esperado);
}

/** Na entrada: com e-mail inexistente, confere contra uma senha fictícia, e a resposta leva o mesmo tempo. */
let ficticia: Promise<string> | undefined;
export async function conferirEntrada(senha: string, guardada: string | undefined) {
  ficticia ??= guardarSenha(randomBytes(16).toString("base64url"));
  const certa = await conferirSenha(senha, guardada ?? (await ficticia));
  return guardada !== undefined && certa;
}
```

**A conferência, em três pontos:**
- **O custo vai no registro** (`scrypt$N$r$p$sal$hash`): adotar o equivalente de 32 MiB depois não invalida as senhas já guardadas.
- **Registro malformado ou truncado** devolve falso, e não erro 500: o `timingSafeEqual` lança quando os tamanhos diferem (documentação do Node), e por isso o tamanho se confere antes.
- **A ação de entrar chama `conferirEntrada(senha, dono?.senha)`** e responde igual nos dois casos. Com e-mail inexistente não haveria `scrypt` a calcular, e a resposta voltaria centenas de milissegundos antes: o tempo diria quais e-mails existem (OWASP, Authentication Cheat Sheet, "Authentication Responses").

**A sessão:**
- **O cookie:** um código aleatório de 256 bits, chamado `__Secure-sessao`, com `HttpOnly; Secure; SameSite=Lax; Path=/painel` e validade de 12 horas.
- **No banco,** só o hash do código.
- **Na saída,** a sessão é apagada nos dois lados: a linha do banco e o cookie. O cookie sai com o mesmo `Path` e o `Secure` com que nasceu. O `cookies().delete(nome)` usa o `path` padrão "/" ("The only option with a default value is `path`", `04-functions/cookies.md`), e o navegador manteria o de `/painel`; e um `Set-Cookie` de nome `__Secure-` sem `Secure` é recusado.

```ts
// Na ação de entrar, depois de conferirEntrada(senha, dono?.senha) dar certo:
const codigo = randomBytes(32).toString("base64url");
await banco.query("INSERT INTO sessao (hash, dono_id, expira_em) VALUES (?, ?, UTC_TIMESTAMP() + INTERVAL 12 HOUR)", [createHash("sha256").update(codigo).digest(), dono.id]);
(await cookies()).set("__Secure-sessao", codigo, { httpOnly: true, secure: true, sameSite: "lax", path: "/painel", maxAge: 12 * 3600 });
```

```ts
// app/painel/sair.ts — a ação de sair.
"use server";
import { createHash } from "node:crypto";
import { cookies } from "next/headers";

import { banco } from "@/lib/banco";

export async function sair() {
  // A sessão sai do banco, e o cookie sai com o mesmo Path e o Secure com que foi criado.
  // Sem o path, o navegador mantém o de /painel; sem o secure, recusa a escrita num __Secure-.
  const loja = await cookies();
  const codigo = loja.get("__Secure-sessao")?.value;
  if (codigo) await banco.query("DELETE FROM sessao WHERE hash = ?", [createHash("sha256").update(codigo).digest()]);
  loja.delete({ name: "__Secure-sessao", path: "/painel", secure: true, httpOnly: true, sameSite: "lax" });
}
```

**É o único cookie do site, e só existe na área restrita.**
- O `Path=/painel` impede que ele seja enviado ao site público.
- É estritamente necessário: entra no aviso de privacidade e dispensa banner (`../17-conformidade-e-normas.md`).
- O site público continua sem cookie; a régua confere (bloco 5).

**Toda ação do painel confere a sessão de novo.** A documentação do Next lembra que desenhar a página só para quem entrou não é barreira: a ação pode ser chamada sem passar pela tela (`02-guides/server-actions.md`, "Authenticate and authorize") [V].

**Também:**
- **Limite de tentativas de entrada:** 5 a cada 15 minutos, por e-mail e por IP em hash, com a tabela do formulário.
- **Mensagem de erro igual** para e-mail inexistente e senha errada, e no mesmo tempo (`conferirEntrada`, acima).
- **Fora da busca:** `noindex` em todo o painel, por cabeçalho (`X-Robots-Tag`), sem `Disallow: /painel` no `robots`: o robô bloqueado não leria o `noindex` (`../18-publicacao-e-manutencao.md`, seção 2.2). A senha já impede a leitura do conteúdo.
- **Auth.js** seria excesso para um a três usuários.

---

## 10. O que os sites de exemplo fazem [ex]

O site de exemplo **não tem servidor**: a Agenda aparece como o **pedido de horário** que compõe uma mensagem para o WhatsApp da casa (o agendador da barbearia, `07-funcionalidades-do-oficio.md`). O texto diz que "o horário é confirmado por resposta", e o selo de ficção diz que nada é coletado. O vendedor mostra a Agenda de verdade por captura ou num ambiente de demonstração com dados fictícios, nunca num site de exemplo público.

---

## 11. Os canais de aviso

| Canal | Situação | Por quê |
|---|---|---|
| **E-mail** | Incluído | Pelo SMTP da Hostinger; a caixa grátis envia 100 por dia, e a paga, 1.000, por ~US$ 1,59 por mês (A CONFIRMAR) |
| **WhatsApp pela API oficial da Meta** | Opcional, com o custo repassado | Tabela em reais desde 01.07.2026: mensagem de utilidade R$ 0,035 e de marketing R$ 0,3217 [FU]. Custo direto pequeno: 300 marcações com 2 mensagens, ~R$ 21 por mês. O peso está na operação: conta empresarial da Meta no nome do cliente, modelos aprovados, webhook, token e limite de 250 contatos a cada 24 horas para conta nova. Segundo a imprensa e parceiros, desde 01.10.2026 também se pagam a utilidade dentro da janela de 24 horas e o atendimento acima de 1.000 mensagens por mês por número; a página da Meta consultada ainda diz que é grátis: A CONFIRMAR |
| **SMS** | Não | Consome quase os R$ 80 do mês: a Twilio cobra US$ 0,0599 por mensagem; os pacotes nacionais saíam a R$ 0,09–0,12 (dado antigo); 600 SMS por mês custam R$ 55–70 [FU: pesquisa de 07.10.2026] |
| **Vínculo `wa.me`** | Não é aviso | Não é automático: é a pessoa quem envia. É o que o agendador da barbearia de exemplo faz |

---

## 12. A privacidade e a guarda

| Item | Regra |
|---|---|
| Dados | Nome, e-mail, telefone (opcional), serviço, profissional, horário. **Na saúde, nenhum dado de saúde**: sem motivo da consulta, sem sintoma, sem convênio com número de carteirinha |
| Base legal | Passos preliminares de contrato, a pedido do titular (LGPD, art. 7º, V). Sem caixa de consentimento. **Exceção, a psicologia:** consentimento específico e destacado (art. 11, I), com a caixa desmarcada (seção 1, "Varia por"). Nos outros nichos de saúde (medicina, odontologia, nutrição), se a marcação já revela dado de saúde é pergunta ao advogado (`../17-conformidade-e-normas.md`, seção 10); até o parecer, vale o art. 7º, V, e nenhum dado de saúde |
| Papéis | O cliente, controlador; o Atlas, operador; a Hostinger (e o Google e a Meta, se usados), suboperadores. O contrato de operador depende do CNPJ do Atlas |
| Guarda | O cliente define e o aviso publica (RATIFICADO: 12 meses depois do atendimento). A tarefa diária apaga o que venceu, no banco; o backup da Hostinger sai no próprio ciclo dele (A CONFIRMAR o prazo) |
| Pedido do titular | O dono procura pelo e-mail ou telefone no painel e apaga. O Atlas ajuda, como operador |
| Segurança | Senha em scrypt; códigos só em hash; o banco só em `127.0.0.1`; atualização de segurança em ondas (`../18-publicacao-e-manutencao.md`); LGPD, art. 46 |
| Porta de publicação | O aviso de privacidade com a Agenda e o cookie da área restrita; o prazo de guarda publicado; o contrato de operador assinado; **a marcação e o cancelamento testados no ar** (no repositório do Atlas, `documentacao/atlas--conformidade.md`, seção 10) |

---

## 13. O esforço e o custo

**O esforço:** de 40 a 80 horas na primeira versão, reaproveitada como módulo nos clientes seguintes (estimativa). Os R$ 400 de criação não pagam a primeira Agenda; pagam as seguintes.

**O que os R$ 80 por mês pagam:**
- **A atualização de segurança do Next e do React.** Uma falha de nota 10 nos componentes de servidor do React exigiu atualização imediata em dezembro de 2025 (CVE-2025-55182; https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components) [V]. Um site com servidor tem superfície de ataque, e alguém precisa fechar.
- **O monitoramento** e a conferência do backup.
- **O ajuste** de expediente e de folgas.
- **Os pedidos** dos titulares dos dados.

A infraestrutura (MySQL, tarefas agendadas, backup) já está paga no plano. A caixa de e-mail custa ~R$ 9 por mês depois do primeiro ano (A CONFIRMAR). Com o WhatsApp opcional, mais R$ 20 a 30 por mês, repassados ao cliente (seção 11).

**O rascunho de 24 horas nunca tem Agenda** (`README.md`, seção 6). Ela exige banco, e-mail e o teste da corrida, e entra até a publicação.

---

## 14. As alternativas avaliadas

| Alternativa | Decisão | Por quê |
|---|---|---|
| **Easy!Appointments 1.6.0** (maio de 2026; PHP 8.2+ e MySQL; GPL-3.0; https://github.com/alextselegidis/easyappointments) | **Plano B para o primeiro cliente**, se a Agenda própria não estiver pronta | Roda na hospedagem PHP comum, num subdomínio, sem ocupar web app; tem serviços, profissionais, expediente, e-mails, Google Agenda, CalDAV, webhooks e ALTCHA. Contras: o visual é outro; num quadro (`iframe`) dentro do site, exigiria abrir o `frame-src` da política de conteúdo; tem cookie de sessão; as atualizações de segurança dele entram na manutenção; não tem lembrete [FU] |
| Cal.com | Não | Fechou o código em 15.04.2026. A edição aberta (Cal.diy, MIT) não tem Workflows, Teams, Routing Forms, Insights nem a API v1, exige PostgreSQL e passa do limite de 15 min da etapa de compilação da Hostinger [FU] |
| LibreBooking, Rallly | Não | Reserva de salas (as versões anteriores à 7.0.0 têm falha crítica) e enquete de datas: não servem a uma barbearia [FU] |
| Um computador no estabelecimento como servidor | Não | As operadoras põem muitos clientes atrás do mesmo IP (CGNAT), o que bloqueia o acesso de fora sem IP fixo pago. Queda de luz ou de internet derruba a Agenda. O backup e a segurança física (LGPD, art. 46) ficariam com o cliente |
| Agenda de terceiro embutida (widget) | Não | Pedido externo, cookie de terceiro, dado fora do controle do cliente; quebra a política de conteúdo |

---

## 15. A conferir antes da primeira Agenda

No hPanel do plano:
- [ ] As tarefas agendadas aparecem para web apps Node (e rodam em UTC, como diz `../18-publicacao-e-manutencao.md`).
- [ ] A versão do banco (`SELECT VERSION()`): MySQL ou MariaDB, e qual.
- [ ] Os limites reais da caixa de e-mail (por hora e por dia).
- [ ] A memória do web app, para o `scrypt`. Medido em 08.10.2026: o servidor ocupa 87 MiB parado, e seis entradas simultâneas no painel o levaram a 602 MiB. Com menos de 1 GiB para o app, adote o equivalente de 32 MiB (seção 9).
- [ ] Quantos web apps o plano comporta.
- [ ] O cabeçalho que traz o IP do visitante atrás do proxy (`02-formulario.md`, seção 5.3).

Fora do hPanel:
- [ ] A regra da Meta em vigor desde 01.10.2026, se o cliente quiser WhatsApp.
- [ ] O fluxo de conta de serviço do Google, se o dono quiser o evento direto.

---

## 16. Os testes

| Camada | O que prova |
|---|---|
| Unidade | `instanteEmNiteroi` (um dia comum; a virada do ano; uma data com o deslocamento simulado de horário de verão); `horariosLivres` (o serviço que termina exatamente no fechamento entra; o que passa um minuto não; o intervalo que passa do fechamento entra; a antecedência mínima; a antecedência máxima: o horário depois de 30 dias não entra; a data fora do formato ou inexistente, "2026-13-45", dá lista vazia; duas faixas no dia; uma folga no meio); `convite` (CRLF, dobra em 75 octetos com acento, escape de vírgula e ponto e vírgula, `Z` nos horários, o `ORGANIZER` com o nome sem aspas); `conferirSenha` (a certa; a errada; o registro truncado ou com custo ilegível dá falso, sem lançar; o custo lido do registro); `conferirEntrada` (o e-mail inexistente dá falso e passa pelo `scrypt`) |
| Ponta a ponta: marcação | Escolher serviço, profissional, dia e hora; reservar; a página de confirmação; o e-mail em `.teste/emails.jsonl` com o `.ics` |
| Ponta a ponta: **a corrida** | Dois contextos do navegador pedem o mesmo horário ao mesmo tempo (`Promise.all`): exatamente uma reserva, e a outra pessoa lê "acabou de ser ocupado" |
| Ponta a ponta: sem script | A marcação inteira com `javaScriptEnabled: false` |
| Ponta a ponta: cancelamento | Abrir o vínculo não cancela; o envio cancela; o horário volta à lista; o código inventado e o código usado |
| Ponta a ponta: lembrete | Uma reserva para daqui a 20 horas, gravada com `criada_em` de mais de 24 horas antes; a chamada com o segredo envia um lembrete; a segunda chamada não envia de novo; a reserva feita há 10 minutos para amanhã não recebe lembrete; sem o segredo, 401 |
| Ponta a ponta: fuso | O navegador em `timezoneId: "Asia/Tokyo"`: os horários continuam os de Niterói |
| Ponta a ponta: painel | Senha errada; o limite de tentativas; o cookie com `HttpOnly`, `Secure`, `SameSite=Lax` e `Path=/painel`; a ação do painel chamada sem sessão é recusada; a saída apaga o cookie de `/painel` no navegador e a sessão no banco |
| Régua | Nenhum cookie nem gravação no aparelho nas páginas públicas, inclusive em `/agendar` e `/cancelar` |
| Segurança (`../../qualidade/09-seguranca-e-privacidade.md`) | Horário fora da lista enviado à mão; profissional que não faz o serviço; reserva no passado; data além de 30 dias (a antecedência máxima); data inexistente no endereço ("2026-13-45"); 50 reservas seguidas do mesmo IP |

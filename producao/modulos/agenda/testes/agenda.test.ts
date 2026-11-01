// testes/agenda.test.ts — os testes de unidade da Agenda, só das partes sem dependência (producao/esteira/14-funcionalidades/05-agenda.md, seção 16;
// producao/qualidade/04-unidade.md, seção 4.6): o fuso de Niterói, os horários livres, a reserva sem conflito (o cálculo dos blocos
// e a corrida contra a chave única, na memória), o convite .ics, a senha em scrypt, a sessão, o lembrete, o cancelamento
// e o painel. O banco e o SMTP não entram: a lógica fala com o Repositorio e o Correio, e aqui são os da memória.
// Rodam no node:test (`npm test`). Todo instante é explícito, com o fuso: nunca o relógio da máquina.
import assert from "node:assert/strict";
import { createVerify, generateKeyPairSync } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { config } from "../conteudo/agenda.ts";
import { BLOCO_MIN, blocosDaReserva, ehDisputaPerdida } from "../lib/agenda/blocos.ts";
import { cancelarPelaPessoa, situacaoDoCancelamento } from "../lib/agenda/cancelamento.ts";
import { ehCodigoDeCancelamento, hashDoCodigo, novoCodigo } from "../lib/agenda/codigo.ts";
import { horariosDoServico } from "../lib/agenda/consulta.ts";
import { convite, dobrar } from "../lib/agenda/convite.ts";
import { dataEmNiteroi, dataValida, diaDaSemana, horaEmNiteroi, instanteEmNiteroi, somarDias } from "../lib/agenda/fuso.ts";
import { assinarAfirmacao, calendarioDoGoogle } from "../lib/agenda/google.ts";
import { dentroDoPrazoDeCancelamento, elegivelParaLembrete } from "../lib/agenda/lembrete.ts";
import { horariosLivres } from "../lib/agenda/livres.ts";
import { repositorioEmMemoria, SEMENTE_DE_EXEMPLO } from "../lib/agenda/memoria.ts";
import { avisoDeCancelamentoAoDono, avisoDeCancelamentoAPessoa, mensagemDeLembrete, mensagensDaReserva } from "../lib/agenda/mensagens.ts";
import { processarReserva } from "../lib/agenda/processar.ts";
import type { DependenciasDaReserva } from "../lib/agenda/processar.ts";
import { reservarHorario } from "../lib/agenda/reserva.ts";
import type { PedidoDeReserva } from "../lib/agenda/reserva.ts";
import { autorizadoPeloSegredo, enviarLembretes, limiteDaGuarda, manter } from "../lib/agenda/tarefas.ts";
import { diaEmCurto, diaPorExtenso, horaDeParede, quandoPorExtenso } from "../lib/agenda/texto.ts";
import type { CalendarioDoDono, ContextoDoNegocio, Mensagem } from "../lib/agenda/tipos.ts";
import { lerInstante, validarReserva } from "../lib/agenda/validar.ts";
import { emitirCarimbo, lerCarimbo } from "../lib/formulario/carimbo.ts";
import { armazemEmMemoria, contarEnvio, LIMITE_POR_HORA } from "../lib/formulario/limite.ts";
import type { ArmazemDoLimite } from "../lib/formulario/limite.ts";
import { entrar } from "../lib/painel/entrar.ts";
import { agruparPorDia, apagarDadosDaPessoa, cancelarPeloDono, ERROS_DO_BLOQUEIO, lerBloqueio, lerBusca, reservasDosProximosDias } from "../lib/painel/operacoes.ts";
import { conferirEntrada, conferirSenha, CUSTO, guardarSenha } from "../lib/painel/senha.ts";
import { abrirSessao, ATRIBUTOS_DO_COOKIE, donoDaSessao, fecharSessao, NOME_DO_COOKIE } from "../lib/painel/sessao.ts";

process.env.SEGREDO_DO_FORMULARIO = "segredo-de-teste"; // o carimbo do formulário, que a reserva reaproveita

const N = instanteEmNiteroi;
const Z = (d: Date) => d.toISOString();
const horas = (lista: readonly Date[]) => lista.map(horaEmNiteroi);
const BAIXO = { N: 2 ** 10, r: 8, p: 1 }; // o scrypt barato dos testes; o do custo real roda em dois testes só

const SEXTA = "2026-10-09";
const AGORA = new Date("2026-10-07T12:00:00Z"); // quarta-feira, 9h em Niterói

// ---------- o fuso de Niterói (seção 4) ----------

test("fuso: um dia comum, UTC−3", () => {
  assert.equal(Z(N(SEXTA, "14:30")), "2026-10-09T17:30:00.000Z");
  assert.equal(Z(N(SEXTA, "09:00")), "2026-10-09T12:00:00.000Z");
  assert.equal(dataEmNiteroi(new Date("2026-10-09T17:30:00Z")), SEXTA);
  assert.equal(horaEmNiteroi(new Date("2026-10-09T17:30:00Z")), "14:30");
});

test("fuso: a virada do ano e a virada de dia (a data em UTC é outra)", () => {
  assert.equal(Z(N("2026-12-31", "22:00")), "2027-01-01T01:00:00.000Z");
  assert.equal(Z(N("2026-12-31", "23:45")), "2027-01-01T02:45:00.000Z");
  assert.equal(Z(N("2027-01-01", "00:00")), "2027-01-01T03:00:00.000Z");
  assert.equal(Z(N(SEXTA, "21:00")), "2026-10-10T00:00:00.000Z");
  // O instante já é sábado em UTC e ainda é sexta em Niterói: a data do expediente é a de Niterói.
  assert.equal(dataEmNiteroi(new Date("2026-10-10T01:30:00Z")), SEXTA);
  assert.equal(horaEmNiteroi(new Date("2026-10-10T01:30:00Z")), "22:30");
  assert.equal(horaEmNiteroi(new Date("2026-10-10T03:00:00Z")), "00:00"); // meia-noite, e não "24:00"
});

test("fuso: pelo nome do fuso, o horário de verão (que o governo avalia trazer de volta) muda o deslocamento sozinho", () => {
  // Antes de 2019 havia horário de verão, e a base de fusos do Node o conhece: UTC−2 de novembro a fevereiro.
  assert.equal(Z(N("2018-12-15", "12:00")), "2018-12-15T14:00:00.000Z"); // em vigor: UTC−2
  assert.equal(Z(N("2018-11-03", "12:00")), "2018-11-03T15:00:00.000Z"); // véspera do início: UTC−3
  assert.equal(Z(N("2018-11-05", "12:00")), "2018-11-05T14:00:00.000Z"); // depois do início: UTC−2
  assert.equal(Z(N("2019-02-16", "12:00")), "2019-02-16T14:00:00.000Z"); // ainda UTC−2
  assert.equal(Z(N("2019-02-18", "12:00")), "2019-02-18T15:00:00.000Z"); // depois do fim: UTC−3
});

test("fuso: ida e volta, dia a dia, em 2018 e 2019 (com o horário de verão) e em 2026", () => {
  for (const [ini, dias] of [["2018-01-01", 730], ["2026-01-01", 365]] as const) {
    for (let i = 0; i < dias; i++) {
      const data = somarDias(ini, i);
      for (const hora of ["01:00", "09:00", "12:30", "23:45"]) {
        const instante = N(data, hora);
        assert.equal(dataEmNiteroi(instante), data, `${data} ${hora}`);
        assert.equal(horaEmNiteroi(instante), hora, `${data} ${hora}`);
      }
    }
  }
});

test("data: só aaaa-mm-dd de um dia que existe; dia da semana; somar dias", () => {
  for (const ruim of ["2026-13-45", "2026-02-30", "2026-02-29", "09/10/2026", "2026-1-9", "", "2026-10-09T10:00"]) assert.equal(dataValida(ruim), false, ruim);
  for (const boa of [SEXTA, "2028-02-29", "2026-12-31"]) assert.equal(dataValida(boa), true, boa);
  assert.equal(diaDaSemana(SEXTA), 5); // sexta
  assert.equal(diaDaSemana("2026-10-11"), 0); // domingo
  assert.equal(somarDias("2026-12-31", 1), "2027-01-01");
  assert.equal(somarDias("2026-03-01", -1), "2026-02-28");
  assert.equal(somarDias("2026-03-01", 0), "2026-03-01");
});

// ---------- os horários livres (seção 4) ----------

const BASE = {
  data: SEXTA,
  faixas: [
    { abre: "09:00", fecha: "12:00" },
    { abre: "13:00", fecha: "19:00" },
  ],
  duracaoMin: 30,
  intervaloMin: 0,
  ocupados: [] as { inicio: Date; fim: Date }[],
  agora: AGORA,
  antecedenciaMinimaMin: 120,
  antecedenciaMaximaMin: 43_200,
};

test("livres: duas faixas no dia (o almoço fica fora), de 15 em 15 minutos", () => {
  const h = horas(horariosLivres(BASE));
  assert.equal(h.length, 34); // 11 de manhã e 23 à tarde
  assert.deepEqual(h.slice(0, 3), ["09:00", "09:15", "09:30"]);
  assert.ok(h.includes("11:30")); // termina às 12h, no fechamento da faixa
  for (const almoco of ["11:45", "12:00", "12:30", "12:45"]) assert.equal(h.includes(almoco), false, almoco);
  assert.equal(h[11], "13:00");
  assert.equal(h.at(-1), "18:30");
});

test("livres: o serviço que termina exatamente no fechamento entra; o que passa um minuto, não", () => {
  const umaHora = [{ abre: "09:00", fecha: "10:00" }];
  assert.deepEqual(horas(horariosLivres({ ...BASE, faixas: umaHora })), ["09:00", "09:15", "09:30"]);
  assert.deepEqual(horas(horariosLivres({ ...BASE, faixas: umaHora, duracaoMin: 31 })), ["09:00", "09:15"]); // 09:30 passaria 1 minuto
});

test("livres: o intervalo depois do serviço pode passar do fechamento", () => {
  const umaHora = [{ abre: "09:00", fecha: "10:00" }];
  assert.deepEqual(horas(horariosLivres({ ...BASE, faixas: umaHora, intervaloMin: 15 })), ["09:00", "09:15", "09:30"]); // 09:30 + 15 de limpeza passa das 10h
});

test("livres: a duração do serviço decide onde ainda cabe", () => {
  const h = horas(horariosLivres({ ...BASE, faixas: [{ abre: "09:00", fecha: "12:00" }], duracaoMin: 90 }));
  assert.equal(h.at(-1), "10:30"); // 10:30 + 90 = 12:00
  assert.equal(h.length, 7);
});

test("livres: a antecedência mínima (o horário exatamente no limite entra)", () => {
  const agora = new Date("2026-10-09T11:00:00Z"); // 8h em Niterói
  const h = horas(horariosLivres({ ...BASE, agora, faixas: [{ abre: "09:00", fecha: "12:00" }] }));
  assert.equal(h[0], "10:00"); // 8h + 2h
  assert.equal(h.includes("09:45"), false);
  assert.deepEqual(horas(horariosLivres({ ...BASE, agora: new Date("2026-10-09T11:00:01Z"), faixas: [{ abre: "09:00", fecha: "12:00" }] }))[0], "10:15"); // um segundo depois, o horário cai
});

test("livres: a antecedência máxima de 30 dias (o horário depois dela não entra; o exatamente no limite, sim)", () => {
  const agora = new Date("2026-10-01T12:00:00Z"); // quinta, 9h em Niterói; 30 dias depois: sábado 31, 9h
  const manha = [{ abre: "09:00", fecha: "12:00" }];
  assert.deepEqual(horas(horariosLivres({ ...BASE, agora, data: "2026-10-31", faixas: manha })), ["09:00"]);
  assert.deepEqual(horariosLivres({ ...BASE, agora, data: "2026-11-01", faixas: manha }), []);
  assert.deepEqual(horariosLivres({ ...BASE, agora, data: "2027-03-05", faixas: manha }), []); // o expediente semanal se repete: sem o teto, passaria
});

test("livres: a data fora do formato ou inexistente dá lista vazia", () => {
  for (const data of ["2026-13-45", "2026-02-30", "09/10/2026", "2026-10-9", "", "amanhã"]) assert.deepEqual(horariosLivres({ ...BASE, data }), [], data);
});

test("livres: uma folga no meio tira o que a toca", () => {
  const folga = { inicio: N(SEXTA, "10:00"), fim: N(SEXTA, "11:00") };
  const h = horas(horariosLivres({ ...BASE, ocupados: [folga] }));
  assert.ok(h.includes("09:30")); // termina às 10h, quando a folga começa
  assert.equal(h.includes("09:45"), false); // invade a folga
  for (const dentro of ["10:00", "10:15", "10:30", "10:45"]) assert.equal(h.includes(dentro), false, dentro);
  assert.ok(h.includes("11:00"));
});

test("livres: a reserva com intervalo ocupa o intervalo; o horário que atravessa um bloco ocupado cai", () => {
  const reserva = [{ inicio: N(SEXTA, "14:00"), fim: N(SEXTA, "14:45") }]; // 30 de serviço e 15 de limpeza
  const meia = horas(horariosLivres({ ...BASE, ocupados: reserva }));
  assert.ok(meia.includes("13:30")); // termina às 14h
  assert.equal(meia.includes("13:45"), false);
  assert.equal(meia.includes("14:30"), false);
  assert.ok(meia.includes("14:45"));
  const hora = horas(horariosLivres({ ...BASE, duracaoMin: 60, ocupados: [{ inicio: N(SEXTA, "14:00"), fim: N(SEXTA, "14:15") }] })); // só o bloco das 14h está ocupado
  assert.equal(hora.includes("13:15"), false); // 13:15 a 14:15 atravessa o bloco
  assert.ok(hora.includes("13:00")); // 13h a 14h termina antes do bloco
  assert.ok(hora.includes("14:15"));
});

test("livres: o feriado (a folga da casa no dia inteiro) não deixa horário", () => {
  assert.deepEqual(horariosLivres({ ...BASE, ocupados: [{ inicio: N(SEXTA, "00:00"), fim: N("2026-10-10", "00:00") }] }), []);
});

test("livres: o expediente que passa da meia-noite UTC continua na data de Niterói", () => {
  const noite = horariosLivres({ ...BASE, faixas: [{ abre: "20:00", fecha: "23:00" }] });
  assert.deepEqual(horas(noite), ["20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30"]);
  assert.equal(Z(noite[0]), "2026-10-09T23:00:00.000Z");
  assert.equal(Z(noite.at(-1)!), "2026-10-10T01:30:00.000Z"); // já é sábado em UTC
  for (const instante of noite) assert.equal(dataEmNiteroi(instante), SEXTA);
  // Um bloco ocupado depois da meia-noite UTC barra o horário certo.
  const ocupado = [{ inicio: new Date("2026-10-10T00:00:00Z"), fim: new Date("2026-10-10T00:15:00Z") }]; // 21h em Niterói
  assert.equal(horas(horariosLivres({ ...BASE, faixas: [{ abre: "20:00", fecha: "23:00" }], ocupados: ocupado })).includes("21:00"), false);
});

test("livres: sem faixa (dia fechado), nada", () => {
  assert.deepEqual(horariosLivres({ ...BASE, faixas: [] }), []);
});

// ---------- os blocos e a disputa pelo horário (seção 5) ----------

test("blocos: o serviço e o intervalo ocupam blocos de 15 minutos", () => {
  const inicio = N(SEXTA, "14:00");
  assert.deepEqual(blocosDaReserva(inicio, 30).map(horaEmNiteroi), ["14:00", "14:15"]);
  assert.deepEqual(blocosDaReserva(inicio, 75).map(horaEmNiteroi), ["14:00", "14:15", "14:30", "14:45", "15:00"]);
  assert.deepEqual(blocosDaReserva(inicio, 40).map(horaEmNiteroi), ["14:00", "14:15", "14:30"]); // 40 min não é múltiplo: o bloco inteiro
  assert.deepEqual(blocosDaReserva(inicio, BLOCO_MIN).map(horaEmNiteroi), ["14:00"]);
  assert.throws(() => blocosDaReserva(inicio, 0), RangeError);
  assert.throws(() => blocosDaReserva(inicio, -15), RangeError);
});

test("disputa: 1062, 1213 e 1205 querem dizer 'acabou de ser ocupado'; o resto é erro de verdade", () => {
  for (const errno of [1062, 1213, 1205]) assert.equal(ehDisputaPerdida({ errno, code: "X" }), true, String(errno));
  for (const outro of [{ errno: 1064 }, { errno: "1062" }, { code: "ER_DUP_ENTRY" }, new Error("1062"), null, undefined, "1062", 1062]) assert.equal(ehDisputaPerdida(outro), false);
});

// ---------- o catálogo da memória e a consulta ----------

test("consulta: a união dos profissionais que fazem o serviço, cada horário com o primeiro livre", async () => {
  const repo = repositorioEmMemoria();
  const lista = await horariosDoServico(repo, { servicoId: 1, profissionalId: null, data: SEXTA, agora: AGORA, config });
  assert.equal(lista.length, 34); // a união não duplica o horário
  assert.equal(horaEmNiteroi(lista[0].inicio), "09:00");
  assert.ok(lista.every((o) => o.profissionalId === 1)); // os dois livres: fica o primeiro
  assert.deepEqual(lista.map((o) => o.inicio.getTime()), [...lista.map((o) => o.inicio.getTime())].sort((a, b) => a - b));
});

test("consulta: com um profissional ocupado, o horário passa ao outro; o serviço que só um faz, não", async () => {
  const repo = repositorioEmMemoria();
  await reservarHorario(repo, pedido(1, 1, SEXTA, "10:00"), AGORA, config); // Rafael, 10h às 10h30
  const lista = await horariosDoServico(repo, { servicoId: 1, profissionalId: null, data: SEXTA, agora: AGORA, config });
  const de = (hora: string) => lista.find((o) => horaEmNiteroi(o.inicio) === hora)?.profissionalId;
  assert.equal(de("09:30"), 1); // termina às 10h
  assert.equal(de("10:00"), 2);
  assert.equal(de("10:15"), 2);
  assert.equal(de("10:30"), 1);

  // O corte e barba (60 min e 15 de limpeza) é só do Rafael, e o bloco das 10h o tira de 8h45 a 10h15.
  const so = await horariosDoServico(repo, { servicoId: 2, profissionalId: null, data: SEXTA, agora: AGORA, config });
  assert.equal(horaEmNiteroi(so[0].inicio), "10:30");
  assert.ok(so.every((o) => o.profissionalId === 1));
});

test("consulta: profissional que não faz o serviço, serviço inexistente, dia fechado, data ruim", async () => {
  const repo = repositorioEmMemoria();
  const consulta = (p: { servicoId: number; profissionalId: number | null; data: string }) => horariosDoServico(repo, { ...p, agora: AGORA, config });
  assert.deepEqual(await consulta({ servicoId: 2, profissionalId: 2, data: SEXTA }), []); // o Bruno não faz corte e barba
  assert.deepEqual(await consulta({ servicoId: 99, profissionalId: null, data: SEXTA }), []);
  assert.deepEqual(await consulta({ servicoId: 1, profissionalId: 99, data: SEXTA }), []);
  assert.deepEqual(await consulta({ servicoId: 1, profissionalId: null, data: "2026-10-11" }), []); // domingo
  assert.deepEqual(await consulta({ servicoId: 1, profissionalId: null, data: "2026-13-45" }), []);
  assert.deepEqual(horas((await consulta({ servicoId: 1, profissionalId: 2, data: "2026-10-10" })).map((o) => o.inicio)).slice(-1), ["13:30"]); // sábado até as 14h
});

test("consulta: hoje só dali a 2 horas; daqui a 30 dias só até o limite; depois, nada", async () => {
  const repo = repositorioEmMemoria();
  const hoje = await horariosDoServico(repo, { servicoId: 1, profissionalId: 1, data: "2026-10-07", agora: AGORA, config });
  assert.equal(horaEmNiteroi(hoje[0].inicio), "11:00"); // 9h + 2h de antecedência
  const trinta = await horariosDoServico(repo, { servicoId: 1, profissionalId: 1, data: "2026-11-06", agora: AGORA, config }); // sexta, 30 dias depois
  assert.deepEqual(horas(trinta.map((o) => o.inicio)), ["09:00"]);
  assert.deepEqual(await horariosDoServico(repo, { servicoId: 1, profissionalId: 1, data: "2026-11-13", agora: AGORA, config }), []);
});

test("consulta: a folga da casa e a do profissional tiram os horários", async () => {
  const repo = repositorioEmMemoria();
  const consulta = (p: number | null) => horariosDoServico(repo, { servicoId: 1, profissionalId: p, data: SEXTA, agora: AGORA, config });
  await repo.criarFolga({ profissionalId: 1, inicio: N(SEXTA, "09:00"), fim: N(SEXTA, "12:00"), motivo: "Consulta externa" });
  assert.deepEqual(await consulta(1), (await consulta(1)).filter((o) => horaEmNiteroi(o.inicio) >= "13:00")); // o Rafael só à tarde
  assert.equal(horaEmNiteroi((await consulta(null))[0].inicio), "09:00"); // sem preferência: o Bruno cobre a manhã
  await repo.criarFolga({ profissionalId: null, inicio: N(SEXTA, "00:00"), fim: N("2026-10-10", "00:00"), motivo: "Feriado" });
  assert.deepEqual(await consulta(null), []);
});

// ---------- a reserva sem conflito (seção 5) ----------

function pedido(servicoId: number, profissionalId: number | null, data: string, hora: string, extra: Partial<PedidoDeReserva> = {}): PedidoDeReserva {
  return { servicoId, profissionalId, inicio: N(data, hora), nome: "Maria Souza", email: "maria@exemplo.com.br", telefone: "21900000000", ...extra };
}

test("reserva: grava a reserva e os blocos; o código sai uma vez e só o hash fica", async () => {
  const repo = repositorioEmMemoria();
  const r = await reservarHorario(repo, pedido(2, 1, SEXTA, "10:00"), AGORA, config); // corte e barba: 60 + 15 de limpeza
  assert.equal(r.tipo, "reservada");
  if (r.tipo !== "reservada") return;
  assert.equal(r.reserva.id, 1);
  assert.equal(r.reserva.profissionalNome, "Rafael");
  assert.equal(Z(r.reserva.fim), "2026-10-09T14:15:00.000Z"); // 13h UTC + 75 min
  assert.equal(repo.blocosOcupados(), 5);
  assert.match(r.codigo, /^[A-Za-z0-9_-]{22}$/); // 128 bits
  const achada = await repo.reservaPorCodigo(hashDoCodigo(r.codigo));
  assert.equal(achada?.id, 1);
  assert.equal(JSON.stringify(achada).includes(r.codigo), false); // o código em claro não está em lugar nenhum da reserva
  assert.equal(await repo.reservaPorCodigo(hashDoCodigo("outro-codigo-qualquer")), null);
});

test("reserva: o mesmo horário duas vezes — a segunda lê 'ocupado' e nada muda", async () => {
  const repo = repositorioEmMemoria();
  assert.equal((await reservarHorario(repo, pedido(1, 1, SEXTA, "10:00"), AGORA, config)).tipo, "reservada");
  assert.equal(repo.blocosOcupados(), 2);
  assert.equal((await reservarHorario(repo, pedido(1, 1, SEXTA, "10:00", { nome: "Outra Pessoa", email: "outra@exemplo.com.br" }), AGORA, config)).tipo, "ocupado");
  assert.equal((await reservarHorario(repo, pedido(1, 1, SEXTA, "10:15"), AGORA, config)).tipo, "ocupado"); // toca o segundo bloco
  assert.equal(repo.blocosOcupados(), 2);
  assert.equal((await reservarHorario(repo, pedido(1, 1, SEXTA, "10:30"), AGORA, config)).tipo, "reservada"); // o seguinte está livre
});

test("reserva: a corrida — dois pedidos ao mesmo tempo para o mesmo horário, uma reserva só", async () => {
  const horarios = ["09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "13:00", "14:15", "15:30", "16:45", "18:00", "18:15", "18:30"];
  for (const hora of horarios) {
    const repo = repositorioEmMemoria();
    const desfechos = await Promise.all([
      reservarHorario(repo, pedido(1, 1, SEXTA, hora), AGORA, config),
      reservarHorario(repo, pedido(1, 1, SEXTA, hora, { email: "segunda@exemplo.com.br" }), AGORA, config),
    ]);
    assert.deepEqual(desfechos.map((d) => d.tipo).sort(), ["ocupado", "reservada"], hora);
    assert.equal(repo.blocosOcupados(), 2);
  }
});

test("reserva: sem preferência, o primeiro profissional livre; ocupado o Rafael, o Bruno", async () => {
  const repo = repositorioEmMemoria();
  const primeira = await reservarHorario(repo, pedido(1, null, SEXTA, "10:00"), AGORA, config);
  const segunda = await reservarHorario(repo, pedido(1, null, SEXTA, "10:00", { email: "segunda@exemplo.com.br" }), AGORA, config);
  const terceira = await reservarHorario(repo, pedido(1, null, SEXTA, "10:00", { email: "terceira@exemplo.com.br" }), AGORA, config);
  assert.equal(primeira.tipo === "reservada" && primeira.reserva.profissionalNome, "Rafael");
  assert.equal(segunda.tipo === "reservada" && segunda.reserva.profissionalNome, "Bruno");
  assert.equal(terceira.tipo, "ocupado"); // os dois levados
});

test("reserva: cancelar libera os blocos, e o horário volta à lista", async () => {
  const repo = repositorioEmMemoria();
  const r = await reservarHorario(repo, pedido(1, 1, SEXTA, "10:00"), AGORA, config);
  assert.equal(r.tipo, "reservada");
  if (r.tipo !== "reservada") return;
  assert.equal(await repo.cancelar(r.reserva.id, AGORA), true);
  assert.equal(await repo.cancelar(r.reserva.id, AGORA), false); // a segunda vez não acha o que cancelar
  assert.equal(repo.blocosOcupados(), 0);
  assert.equal((await reservarHorario(repo, pedido(1, 1, SEXTA, "10:00", { email: "nova@exemplo.com.br" }), AGORA, config)).tipo, "reservada");
});

test("reserva: o pedido feito à mão, fora da lista, é recusado e nada entra", async () => {
  const repo = repositorioEmMemoria();
  const recusados: PedidoDeReserva[] = [
    pedido(1, 1, SEXTA, "07:00"), // antes do expediente
    pedido(1, 1, SEXTA, "12:30"), // no almoço
    pedido(1, 1, SEXTA, "18:45"), // passaria do fechamento
    pedido(1, 1, SEXTA, "10:07"), // fora da grade de 15 minutos
    pedido(1, 1, "2026-10-11", "10:00"), // domingo
    pedido(1, 1, "2026-10-06", "10:00"), // no passado
    pedido(1, 1, "2026-10-07", "10:00"), // hoje, antes da antecedência mínima (9h + 2h = 11h)
    pedido(1, 1, "2026-11-13", "10:00"), // depois de 30 dias
    pedido(1, 1, "2027-03-05", "10:00"), // o expediente semanal se repete: sem o teto, passaria
    pedido(2, 2, SEXTA, "10:00"), // o Bruno não faz corte e barba
    pedido(1, 99, SEXTA, "10:00"), // profissional inexistente
    pedido(99, 1, SEXTA, "10:00"), // serviço inexistente
  ];
  for (const p of recusados) assert.equal((await reservarHorario(repo, p, AGORA, config)).tipo, "ocupado", `${Z(p.inicio)} serviço ${p.servicoId} profissional ${p.profissionalId}`);
  assert.equal(repo.blocosOcupados(), 0);
});

test("reserva: no limite da antecedência mínima e da máxima, o horário ainda vale", async () => {
  const repo = repositorioEmMemoria();
  assert.equal((await reservarHorario(repo, pedido(1, 1, "2026-10-07", "11:00"), AGORA, config)).tipo, "reservada"); // 9h + 2h
  assert.equal((await reservarHorario(repo, pedido(1, 1, "2026-11-06", "09:00"), AGORA, config)).tipo, "reservada"); // 30 dias
  assert.equal((await reservarHorario(repo, pedido(1, 1, "2026-11-06", "09:15"), AGORA, config)).tipo, "ocupado");
});

test("reserva: a que atravessa a meia-noite UTC ocupa os blocos certos", async () => {
  const repo = repositorioEmMemoria({
    ...SEMENTE_DE_EXEMPLO,
    expediente: { 1: { 5: [{ abre: "20:00", fecha: "23:30" }] }, 2: {} },
  });
  const r = await reservarHorario(repo, pedido(1, 1, SEXTA, "22:30"), AGORA, config); // 22h30 a 23h, 01h30Z a 02h00Z de sábado
  assert.equal(r.tipo, "reservada");
  assert.equal((await reservarHorario(repo, pedido(1, 1, SEXTA, "22:45"), AGORA, config)).tipo, "ocupado");
  assert.equal((await reservarHorario(repo, pedido(1, 1, SEXTA, "22:00"), AGORA, config)).tipo, "reservada"); // termina às 22h30
});

// ---------- o convite .ics (seção 6) ----------

const EVENTO = {
  uid: "reserva-7@exemplo.com.br",
  inicio: new Date("2026-10-09T17:30:00Z"),
  fim: new Date("2026-10-09T18:00:00Z"),
  titulo: "Corte, barba; ok",
  local: "Rua A, 1; Niterói",
  descricao: "Cancelar: https://exemplo.com.br/x\nlinha 2",
  organizador: { nome: 'Barbearia "Santa" Rosa', email: "site@exemplo.com.br" },
};
const CARIMBO_DO_CONVITE = new Date("2026-10-08T15:00:00Z");

test("convite: CRLF em toda linha, UTC com Z, UID estável e o ORGANIZER sem aspas no nome", () => {
  const ics = convite(EVENTO, CARIMBO_DO_CONVITE);
  assert.ok(ics.startsWith("BEGIN:VCALENDAR\r\n"));
  assert.ok(ics.endsWith("END:VCALENDAR\r\n"));
  assert.equal(ics.replace(/\r\n/g, "").includes("\n"), false); // nenhuma quebra solta
  assert.equal(ics.replace(/\r\n/g, "").includes("\r"), false);
  const linhas = ics.split("\r\n");
  for (const esperada of [
    "VERSION:2.0",
    "PRODID:-//Atlas Digital//Agenda//PT-BR",
    "METHOD:PUBLISH",
    "UID:reserva-7@exemplo.com.br",
    "DTSTAMP:20261008T150000Z",
    "DTSTART:20261009T173000Z",
    "DTEND:20261009T180000Z",
    'ORGANIZER;CN="Barbearia Santa Rosa":mailto:site@exemplo.com.br',
  ]) {
    assert.ok(linhas.includes(esperada), esperada);
  }
  const outro = convite({ ...EVENTO, organizador: { nome: "Casa\r\nBCC: x@y.z", email: "site@exemplo.com.br" } }, CARIMBO_DO_CONVITE);
  assert.ok(outro.includes('ORGANIZER;CN="CasaBCC: x@y.z":mailto:'));
  assert.equal(outro.split("\r\n").some((l) => l.startsWith("BCC:")), false);
});

test("convite: o escape de barra, vírgula, ponto e vírgula e quebra de linha", () => {
  const linhas = convite(EVENTO, CARIMBO_DO_CONVITE).split("\r\n");
  assert.ok(linhas.includes("SUMMARY:Corte\\, barba\\; ok"));
  assert.ok(linhas.includes("LOCATION:Rua A\\, 1\\; Niterói"));
  assert.ok(linhas.includes("DESCRIPTION:Cancelar: https://exemplo.com.br/x\\nlinha 2"));
  const barra = convite({ ...EVENTO, titulo: "a\\b\rc\r\nd" }, CARIMBO_DO_CONVITE).split("\r\n");
  assert.ok(barra.includes("SUMMARY:a\\\\b\\nc\\nd")); // \ → \\ ; \r e \r\n → \n escrito
});

test("convite: a dobra em 75 octetos, com acento, sem partir um caractere ao meio", () => {
  assert.equal(dobrar("a".repeat(75)), "a".repeat(75)); // 75 octetos cabem numa linha
  assert.equal(dobrar("a".repeat(76)), `${"a".repeat(75)}\r\n a`);
  assert.equal(dobrar("a".repeat(150)), `${"a".repeat(75)}\r\n ${"a".repeat(74)}\r\n a`); // a continuação leva 74 e o espaço
  assert.equal(dobrar(`${"a".repeat(74)}ã`), `${"a".repeat(74)}\r\n ã`); // o "ã" (2 octetos) não cabe nos 75: passa inteiro
  const descricao = "Atenção: ação de cancelamento até às 11h, não se esqueça de levar o documento; obrigado. ".repeat(6);
  const ics = convite({ ...EVENTO, descricao }, CARIMBO_DO_CONVITE);
  for (const fisica of ics.split("\r\n")) {
    assert.ok(Buffer.byteLength(fisica) <= 75, `${Buffer.byteLength(fisica)} octetos: ${fisica}`);
    assert.equal(Buffer.from(fisica).toString("utf8"), fisica);
    assert.equal(fisica.includes("�"), false);
  }
  const desdobrado = ics.replace(/\r\n /g, "");
  assert.ok(desdobrado.split("\r\n").includes(`DESCRIPTION:${descricao.replace(/;/g, "\\;").replace(/,/g, "\\,")}`));
});

// ---------- a senha em scrypt (seção 9) ----------

test("senha: a certa passa, a errada não, e o custo vem do registro", async () => {
  const registro = await guardarSenha("uma frase longa e secreta", BAIXO);
  assert.match(registro, /^scrypt\$1024\$8\$1\$[A-Za-z0-9_-]+\$[A-Za-z0-9_-]+$/);
  assert.equal(await conferirSenha("uma frase longa e secreta", registro), true); // o padrão é 2^17: quem manda é o registro
  assert.equal(await conferirSenha("uma frase longa e secretA", registro), false);
  assert.equal(await conferirSenha("", registro), false);
  assert.notEqual(registro, await guardarSenha("uma frase longa e secreta", BAIXO)); // o sal muda a cada guarda
});

test("senha: a normalização Unicode — o acento composto e o decomposto são a mesma senha", async () => {
  const registro = await guardarSenha("café com leite 123", BAIXO);
  assert.equal(await conferirSenha("café com leite 123", registro), true);
});

test("senha: registro truncado, de outro tipo ou com custo ilegível dá falso, sem lançar", async () => {
  const registro = await guardarSenha("uma frase longa e secreta", BAIXO);
  const falsos = [
    "",
    "scrypt",
    registro.slice(0, -10), // hash truncado
    registro.replace("scrypt", "argon2"),
    registro.replace("$1024$", "$1000$"), // N que não é potência de 2: o scrypt lança
    registro.replace("$1024$", "$1048576$"), // 1 GiB de memória, acima do teto de 256 MiB
    registro.replace("$1024$8$1$", "$x$y$z$"),
    registro.replace("$1024$8$1$", "$$$$"),
    registro.split("$").slice(0, 4).join("$") + "$$" + registro.split("$")[5], // sem sal
  ];
  for (const ruim of falsos) assert.equal(await conferirSenha("uma frase longa e secreta", ruim), false, ruim);
});

test("senha: o custo de fábrica é o da OWASP (N = 2^17, r = 8, p = 1) e funciona nesta máquina", async () => {
  assert.deepEqual(CUSTO, { N: 131072, r: 8, p: 1 });
  const registro = await guardarSenha("a senha do custo de verdade");
  assert.match(registro, /^scrypt\$131072\$8\$1\$/);
  assert.equal(await conferirSenha("a senha do custo de verdade", registro), true);
  assert.equal(await conferirSenha("outra", registro), false);
});

test("senha: na entrada, e-mail inexistente também passa pelo scrypt, e dá falso", async () => {
  const registro = await guardarSenha("uma frase longa e secreta", BAIXO);
  assert.equal(await conferirEntrada("uma frase longa e secreta", registro), true);
  assert.equal(await conferirEntrada("errada", registro), false);
  const inicio = process.hrtime.bigint();
  assert.equal(await conferirEntrada("uma frase longa e secreta", undefined), false);
  const ms = Number(process.hrtime.bigint() - inicio) / 1e6;
  assert.ok(ms > 20, `o e-mail inexistente voltou em ${ms.toFixed(1)} ms: sem scrypt`); // 128 MiB de scrypt levam centenas de ms
  const inicio2 = process.hrtime.bigint();
  assert.equal(await conferirEntrada("qualquer", undefined), false);
  assert.ok(Number(process.hrtime.bigint() - inicio2) / 1e6 > 20);
});

// ---------- a sessão e a entrada no painel (seção 9) ----------

const DONO = "dono@exemplo.com.br";
async function repositorioComDono(emails: readonly string[] = [DONO]) {
  const senha = await guardarSenha("uma frase longa e secreta", BAIXO);
  return repositorioEmMemoria({ ...SEMENTE_DE_EXEMPLO, donos: emails.map((email, i) => ({ id: i + 1, email, senha })) });
}

test("sessão: 256 bits no cookie, só o hash no banco, 12 horas, e a saída a apaga", async () => {
  const repo = await repositorioComDono();
  const codigo = await abrirSessao(repo, 1, AGORA);
  assert.match(codigo, /^[A-Za-z0-9_-]{43}$/); // 32 bytes
  assert.equal(await donoDaSessao(repo, codigo, AGORA), 1);
  assert.equal(await donoDaSessao(repo, codigo, new Date(AGORA.getTime() + 12 * 3_600_000 - 1)), 1);
  assert.equal(await donoDaSessao(repo, codigo, new Date(AGORA.getTime() + 12 * 3_600_000)), null); // venceu
  assert.equal(await donoDaSessao(repo, "um-codigo-inventado", AGORA), null);
  assert.equal(await donoDaSessao(repo, undefined, AGORA), null);
  assert.equal(await donoDaSessao(repo, "", AGORA), null);
  await fecharSessao(repo, codigo);
  assert.equal(await donoDaSessao(repo, codigo, AGORA), null);
  await fecharSessao(repo, undefined); // sair sem cookie não lança
});

test("sessão: o único cookie do site — nome com __Secure-, HttpOnly, Secure, SameSite=Lax e Path=/painel", () => {
  assert.equal(NOME_DO_COOKIE, "__Secure-sessao");
  assert.deepEqual(ATRIBUTOS_DO_COOKIE, { httpOnly: true, secure: true, sameSite: "lax", path: "/painel" });
});

test("entrar: a senha certa abre uma sessão nova a cada entrada; o e-mail vale sem caixa e sem espaço", async () => {
  const repo = await repositorioComDono();
  const armazem = armazemEmMemoria();
  const a = await entrar({ repo, armazem, email: "  DONO@Exemplo.com.br ", senha: "uma frase longa e secreta", ip: "198.51.100.1", agora: AGORA });
  const b = await entrar({ repo, armazem, email: DONO, senha: "uma frase longa e secreta", ip: "198.51.100.1", agora: AGORA });
  assert.equal(a.tipo, "ok");
  assert.equal(b.tipo, "ok");
  if (a.tipo !== "ok" || b.tipo !== "ok") return;
  assert.notEqual(a.codigo, b.codigo);
  assert.equal(await donoDaSessao(repo, a.codigo, AGORA), 1);
  assert.equal(await donoDaSessao(repo, b.codigo, AGORA), 1);
  assert.equal(repo.sessoesAbertas(), 2);
});

test("entrar: senha errada, e-mail inexistente e senha enorme recebem a mesma recusa", async () => {
  const repo = await repositorioComDono();
  const armazem = armazemEmMemoria();
  const tenta = (email: string, senha: string) => entrar({ repo, armazem, email, senha, ip: null, agora: AGORA });
  assert.deepEqual(await tenta(DONO, "errada"), { tipo: "recusada" });
  assert.deepEqual(await tenta("ninguem@exemplo.com.br", "uma frase longa e secreta"), { tipo: "recusada" });
  assert.deepEqual(await tenta(DONO, "x".repeat(300)), { tipo: "recusada" });
  assert.deepEqual(await tenta("", ""), { tipo: "recusada" });
  assert.equal(repo.sessoesAbertas(), 0);
});

test("entrar: 5 tentativas a cada 15 minutos por e-mail; a sexta é barrada mesmo com a senha certa", async () => {
  const repo = await repositorioComDono();
  const armazem = armazemEmMemoria();
  const tenta = (senha: string, ip: string | null, agora = AGORA) => entrar({ repo, armazem, email: DONO, senha, ip, agora });
  for (let i = 1; i <= 5; i++) assert.deepEqual(await tenta("errada", `203.0.113.${i}`), { tipo: "recusada" }, `tentativa ${i}`); // IPs diferentes: conta por e-mail
  assert.deepEqual(await tenta("uma frase longa e secreta", "203.0.113.9"), { tipo: "limite" });
  assert.deepEqual(await tenta("uma frase longa e secreta", null), { tipo: "limite" });
  assert.equal(repo.sessoesAbertas(), 0);
  // 15 minutos depois, a janela é outra.
  const depois = new Date(Date.UTC(2026, 9, 7, 12, 15, 0));
  assert.equal((await tenta("uma frase longa e secreta", "203.0.113.9", depois)).tipo, "ok");
});

test("entrar: 5 tentativas a cada 15 minutos por IP, mesmo trocando o e-mail", async () => {
  const emails = ["a@exemplo.com.br", "b@exemplo.com.br", "c@exemplo.com.br", "d@exemplo.com.br", "e@exemplo.com.br", "f@exemplo.com.br"];
  const repo = await repositorioComDono(emails);
  const armazem = armazemEmMemoria();
  for (const [i, email] of emails.entries()) {
    const r = await entrar({ repo, armazem, email, senha: "errada", ip: "198.51.100.50", agora: AGORA });
    assert.deepEqual(r, { tipo: i < 5 ? "recusada" : "limite" }, email);
  }
  // Outro IP, outro e-mail: segue livre.
  assert.deepEqual(await entrar({ repo, armazem, email: "a@exemplo.com.br", senha: "errada", ip: "198.51.100.51", agora: AGORA }), { tipo: "recusada" });
});

// ---------- o lembrete e o prazo de cancelamento (seções 7 e 8) ----------

const REGRA = { situacao: "confirmada" as const, lembreteEnviadoEm: null as Date | null };
const HORA_MS = 3_600_000;

test("lembrete: entre 2 e 24 horas antes, de reserva feita 24 horas ou mais antes, ainda não lembrada", () => {
  const agora = new Date("2026-10-08T15:00:00Z");
  const feita = new Date("2026-10-05T12:00:00Z");
  const em = (horasAdiante: number, criadaEm = feita, extra: Partial<Parameters<typeof elegivelParaLembrete>[0]> = {}) =>
    elegivelParaLembrete({ ...REGRA, inicio: new Date(agora.getTime() + horasAdiante * HORA_MS), criadaEm, ...extra }, agora);
  assert.equal(em(22), true);
  assert.equal(em(2), true); // exatamente 2 horas: entra
  assert.equal(em(2 - 1 / 3600), false); // 1 s a menos
  assert.equal(em(24), true); // exatamente 24 horas: entra
  assert.equal(em(24 + 1 / 3600), false);
  assert.equal(em(40), false);
  assert.equal(em(1), false);
  assert.equal(em(-3), false); // já passou
  // Feita há 10 minutos para amanhã: a confirmação acabou de sair, e um lembrete agora não é "na véspera".
  assert.equal(em(20, new Date(agora.getTime() - 10 * 60_000)), false);
  assert.equal(em(23, new Date(agora.getTime() - 1 * HORA_MS)), true); // feita 24 h antes do horário: entra (criada ≤ início − 24 h)
  assert.equal(em(23, new Date(agora.getTime() - 1 * HORA_MS + 1)), false); // um milissegundo depois, não
  assert.equal(em(22, feita, { lembreteEnviadoEm: agora }), false); // já lembrada
  assert.equal(em(22, feita, { situacao: "cancelada" }), false);
});

test("cancelamento: até 3 horas antes (inclusive); depois, só pelo WhatsApp da casa", () => {
  const inicio = N(SEXTA, "10:00");
  const antes = (min: number) => new Date(inicio.getTime() - min * 60_000);
  assert.equal(dentroDoPrazoDeCancelamento(inicio, antes(181), 180), true);
  assert.equal(dentroDoPrazoDeCancelamento(inicio, antes(180), 180), true);
  assert.equal(dentroDoPrazoDeCancelamento(inicio, antes(179), 180), false);
  assert.equal(dentroDoPrazoDeCancelamento(inicio, new Date(inicio.getTime() + 60_000), 180), false); // já passou
});

test("parâmetros da casa: 2 horas, 30 dias, 3 horas, 12 meses, sem caixa de consentimento (o exemplo da seção 3)", () => {
  assert.deepEqual(config, { antecedenciaMinimaMin: 120, antecedenciaMaximaMin: 43_200, cancelamentoAteMin: 180, guardaMeses: 12, consentimento: null });
  assert.equal(config.antecedenciaMaximaMin, 30 * 24 * 60);
});

// ---------- os códigos ----------

test("códigos: 128 bits no cancelamento, 256 na sessão, e o hash de 32 bytes", () => {
  assert.match(novoCodigo(), /^[A-Za-z0-9_-]{22}$/);
  assert.match(novoCodigo(32), /^[A-Za-z0-9_-]{43}$/);
  assert.notEqual(novoCodigo(), novoCodigo());
  assert.equal(hashDoCodigo("abc").length, 32);
  assert.deepEqual(hashDoCodigo("abc"), hashDoCodigo("abc"));
  assert.notDeepEqual(hashDoCodigo("abc"), hashDoCodigo("abd"));
  assert.equal(ehCodigoDeCancelamento(novoCodigo()), true);
  for (const ruim of ["", "curto", "x".repeat(21), "x".repeat(23), `${"x".repeat(21)}!`, `${"x".repeat(21)}/`]) assert.equal(ehCodigoDeCancelamento(ruim), false, ruim);
});

// ---------- o texto ----------

test("texto: o dia e a hora por extenso, em Niterói, no estilo do site", () => {
  assert.equal(quandoPorExtenso(N(SEXTA, "14:30")), "sexta-feira, 9 de outubro, às 14h30");
  assert.equal(quandoPorExtenso(N(SEXTA, "09:00")), "sexta-feira, 9 de outubro, às 9h");
  assert.equal(quandoPorExtenso(new Date("2026-10-10T01:30:00Z")), "sexta-feira, 9 de outubro, às 22h30"); // em UTC já é sábado
  assert.equal(diaPorExtenso(N("2026-12-31", "22:00")), "quinta-feira, 31 de dezembro");
  assert.equal(horaDeParede(N(SEXTA, "18:30")), "18h30");
  assert.equal(diaEmCurto(N(SEXTA, "10:00")), "sex., 09/10");
});

// ---------- os campos da reserva (seções 4 e 5) ----------

const CAMPOS = { nome: "Maria Souza", email: "maria@exemplo.com.br", telefone: "(21) 90000-0000", servico: "1", profissional: "qualquer", inicio: "2026-10-09T13:00:00.000Z" };

test("campos: o instante do horário é o ISO exato; o nome, o e-mail obrigatório e o telefone opcional", () => {
  assert.deepEqual(validarReserva(CAMPOS), {});
  assert.deepEqual(validarReserva({ ...CAMPOS, telefone: "", profissional: "2" }), {});
  assert.equal(validarReserva({ ...CAMPOS, nome: "A" }).nome, "Escreva o nome.");
  assert.equal(validarReserva({ ...CAMPOS, nome: "a".repeat(81) }).nome, "O nome passa de 80 caracteres.");
  assert.match(validarReserva({ ...CAMPOS, email: "" }).email ?? "", /Informe o e-mail/);
  assert.match(validarReserva({ ...CAMPOS, email: "maria@" }).email ?? "", /nome@exemplo/);
  assert.match(validarReserva({ ...CAMPOS, telefone: "9000" }).telefone ?? "", /DDD/);
  assert.equal(validarReserva({ ...CAMPOS, servico: "" }).servico, "Escolha o serviço.");
  assert.equal(validarReserva({ ...CAMPOS, servico: "1; DROP TABLE" }).servico, "Escolha o serviço.");
  assert.equal(validarReserva({ ...CAMPOS, profissional: "x" }).profissional, "Escolha o profissional.");
  assert.equal(validarReserva({ ...CAMPOS, inicio: "" }).inicio, "Escolha o horário.");
  for (const ruim of ["2026-10-09T13:00:00Z", "2026-10-09 13:00", "2026-13-45T13:00:00.000Z", "2026-02-30T13:00:00.000Z", "2026-10-09T13:00:30.000Z", "amanhã"]) {
    assert.equal(lerInstante(ruim), null, ruim);
  }
  assert.equal(Z(lerInstante("2026-10-09T13:00:00.000Z")!), "2026-10-09T13:00:00.000Z");
});

// ---------- os e-mails (seções 6 a 8) ----------

const CTX: ContextoDoNegocio = {
  nome: "Barbearia Santa Rosa",
  url: "https://exemplo.com.br",
  dominio: "exemplo.com.br",
  endereco: "Alameda São Boaventura, 000, Fonseca, Niterói – RJ",
  vinculoDoMapa: "https://www.google.com/maps/search/?api=1&query=Alameda",
  vinculoDoWhatsapp: "https://wa.me/5521900000000",
  organizador: { nome: "Barbearia Santa Rosa", email: "site@exemplo.com.br" },
  dono: "dono@exemplo.com.br",
};

async function reservaFeita(repo = repositorioEmMemoria(), extra: Partial<PedidoDeReserva> = {}, servicoId = 2) {
  const r = await reservarHorario(repo, pedido(servicoId, 1, SEXTA, "10:00", extra), AGORA, config);
  if (r.tipo !== "reservada") throw new Error("a reserva do teste devia caber");
  return { repo, reserva: r.reserva, codigo: r.codigo };
}

test("e-mails: a confirmação leva o serviço, o profissional, o dia por extenso, o endereço, o vínculo de cancelamento e o convite", async () => {
  const { reserva, codigo } = await reservaFeita();
  const { pessoa, dono } = mensagensDaReserva(reserva, codigo, CTX, config, AGORA);
  assert.equal(pessoa.para, "maria@exemplo.com.br");
  assert.equal(pessoa.responderPara, "dono@exemplo.com.br");
  assert.equal(pessoa.assunto, "Reserva confirmada: Corte e barba, sexta-feira, 9 de outubro, às 10h");
  for (const trecho of [
    "Serviço: Corte e barba",
    "Profissional: Rafael",
    "Quando: sexta-feira, 9 de outubro, às 10h",
    "Onde: Alameda São Boaventura, 000, Fonseca, Niterói – RJ",
    "Mapa: https://www.google.com/maps/search/?api=1&query=Alameda",
    `https://exemplo.com.br/cancelar/${codigo}`,
    "até 3h antes",
    "WhatsApp da casa: https://wa.me/5521900000000",
  ]) {
    assert.ok(pessoa.texto.includes(trecho), trecho);
  }
  assert.equal(pessoa.convite?.nome, "reserva.ics");
  const ics = pessoa.convite!.conteudo;
  assert.ok(ics.includes("DTSTART:20261009T130000Z")); // 10h em Niterói
  assert.ok(ics.includes("DTEND:20261009T140000Z")); // o fim do SERVIÇO (60 min), e não o da limpeza (14h15)
  assert.ok(ics.includes("UID:reserva-1@exemplo.com.br"));
  assert.ok(ics.includes("DTSTAMP:20261007T120000Z"));
  assert.ok(ics.replace(/\r\n /g, "").includes(`https://exemplo.com.br/cancelar/${codigo}`));
  assert.equal(dono.convite?.conteudo.includes("DTEND:20261009T140000Z"), true);
});

test("e-mails: o aviso ao dono leva o contato da pessoa e o painel — e nunca o vínculo de cancelamento", async () => {
  const { reserva, codigo } = await reservaFeita(undefined, { nome: "Maria\r\nBcc: roubo@exemplo.com.br" });
  const { dono } = mensagensDaReserva(reserva, codigo, CTX, config, AGORA);
  assert.equal(dono.para, "dono@exemplo.com.br");
  assert.equal(dono.responderPara, "maria@exemplo.com.br");
  assert.match(dono.assunto, /^Nova reserva: Corte e barba, sexta-feira, 9 de outubro, às 10h$/);
  assert.ok(dono.texto.includes("Nome: Maria Bcc: roubo@exemplo.com.br")); // a quebra virou espaço
  assert.ok(dono.texto.includes("E-mail: maria@exemplo.com.br"));
  assert.ok(dono.texto.includes("Telefone: (21) 90000-0000"));
  assert.ok(dono.texto.includes("https://exemplo.com.br/painel"));
  assert.equal(dono.texto.includes("/cancelar/"), false);
  assert.equal(dono.texto.includes(codigo), false);
  assert.equal(dono.assunto.includes("Maria"), false); // o assunto não leva o que a pessoa digitou
  assert.equal(dono.texto.split("\n").some((l) => l.startsWith("Bcc:")), false);
});

test("e-mails: o lembrete e os dois cancelamentos", async () => {
  const { reserva } = await reservaFeita();
  const lembrete = mensagemDeLembrete(reserva, CTX);
  assert.equal(lembrete.assunto, "Lembrete: Corte e barba, sexta-feira, 9 de outubro, às 10h");
  assert.equal(lembrete.para, "maria@exemplo.com.br");
  assert.equal(lembrete.texto.includes("/cancelar/"), false); // o código só existe no e-mail de confirmação
  assert.ok(lembrete.texto.includes("https://wa.me/5521900000000"));
  const aoDono = avisoDeCancelamentoAoDono(reserva, CTX);
  assert.equal(aoDono.para, "dono@exemplo.com.br");
  assert.match(aoDono.assunto, /^Reserva cancelada pela pessoa: /);
  const aPessoa = avisoDeCancelamentoAPessoa(reserva, "Imprevisto\r\nBcc: roubo@exemplo.com.br", CTX);
  assert.equal(aPessoa.para, "maria@exemplo.com.br");
  assert.ok(aPessoa.texto.includes("Motivo: Imprevisto Bcc: roubo@exemplo.com.br"));
  assert.equal(aPessoa.assunto.includes("Imprevisto"), false);
  assert.ok(aPessoa.texto.includes("https://exemplo.com.br/agendar"));
});

// ---------- o cancelamento pela pessoa (seção 8) ----------

function cancelamentoDe(repo: ReturnType<typeof repositorioEmMemoria>, extra: { google?: CalendarioDoDono; agora?: Date } = {}) {
  const enviadas: Mensagem[] = [];
  const avisos: string[] = [];
  return {
    enviadas,
    avisos,
    deps: {
      repo,
      correio: async (m: Mensagem) => void enviadas.push(m),
      ctx: CTX,
      config,
      avisar: (t: string) => void avisos.push(t),
      agora: extra.agora ?? AGORA,
      google: extra.google,
    },
  };
}

test("cancelamento: abrir o vínculo não cancela; enviar cancela, libera o horário e avisa o dono", async () => {
  const { repo, reserva, codigo } = await reservaFeita();
  const c = cancelamentoDe(repo);
  const aberta = await situacaoDoCancelamento(repo, codigo, AGORA, config);
  assert.equal(aberta.tipo, "pode-cancelar"); // só mostra
  assert.equal((await repo.reservaPorId(reserva.id))?.situacao, "confirmada");
  assert.equal(repo.blocosOcupados(), 5);
  assert.equal(c.enviadas.length, 0);

  const feito = await cancelarPelaPessoa(c.deps, codigo);
  assert.equal(feito.tipo, "cancelada");
  assert.equal((await repo.reservaPorId(reserva.id))?.situacao, "cancelada");
  assert.equal(repo.blocosOcupados(), 0);
  assert.equal(c.enviadas.length, 1);
  assert.equal(c.enviadas[0].para, "dono@exemplo.com.br");
  const lista = await horariosDoServico(repo, { servicoId: 1, profissionalId: 1, data: SEXTA, agora: AGORA, config });
  assert.ok(horas(lista.map((o) => o.inicio)).includes("10:00")); // o horário voltou à lista
});

test("cancelamento: o código inventado, o malformado e o usado duas vezes", async () => {
  const { repo, codigo } = await reservaFeita();
  const c = cancelamentoDe(repo);
  assert.deepEqual(await situacaoDoCancelamento(repo, novoCodigo(), AGORA, config), { tipo: "nao-encontrada" }); // bem formado, inexistente
  for (const lixo of ["", "abc", "x".repeat(22) + "!", "../../etc/passwd"]) assert.deepEqual(await situacaoDoCancelamento(repo, lixo, AGORA, config), { tipo: "nao-encontrada" }, lixo);
  assert.equal((await cancelarPelaPessoa(c.deps, codigo)).tipo, "cancelada");
  assert.equal((await cancelarPelaPessoa(c.deps, codigo)).tipo, "ja-cancelada"); // a segunda
  assert.equal((await situacaoDoCancelamento(repo, codigo, AGORA, config)).tipo, "ja-cancelada");
  assert.equal(c.enviadas.length, 1); // o dono é avisado uma vez só
});

test("cancelamento: depois do prazo de 3 horas, a página explica e nada é cancelado", async () => {
  const { repo, reserva, codigo } = await reservaFeita();
  const cedo = new Date(reserva.inicio.getTime() - 180 * 60_000); // 3 horas antes: ainda pode
  const tarde = new Date(reserva.inicio.getTime() - 179 * 60_000);
  assert.equal((await situacaoDoCancelamento(repo, codigo, cedo, config)).tipo, "pode-cancelar");
  assert.equal((await situacaoDoCancelamento(repo, codigo, tarde, config)).tipo, "fora-do-prazo");
  const c = cancelamentoDe(repo, { agora: tarde });
  assert.equal((await cancelarPelaPessoa(c.deps, codigo)).tipo, "fora-do-prazo");
  assert.equal((await repo.reservaPorId(reserva.id))?.situacao, "confirmada");
  assert.equal(c.enviadas.length, 0);
});

test("cancelamento: apaga o evento do Google, se há; a falha do Google e a do e-mail só vão ao registro", async () => {
  const { repo, reserva, codigo } = await reservaFeita();
  await repo.guardarEventoGoogle(reserva.id, "evt-123");
  const apagados: string[] = [];
  const c = cancelamentoDe(repo, { google: { criarEvento: async () => "x", apagarEvento: async (id) => void apagados.push(id) } });
  assert.equal((await cancelarPelaPessoa(c.deps, codigo)).tipo, "cancelada");
  assert.deepEqual(apagados, ["evt-123"]);

  const outra = await reservaFeita(undefined, {}, 1);
  await outra.repo.guardarEventoGoogle(outra.reserva.id, "evt-9");
  const falho = cancelamentoDe(outra.repo, { google: { criarEvento: async () => "x", apagarEvento: async () => { throw new Error("Google fora do ar"); } } });
  falho.deps.correio = async () => { throw new Error("SMTP fora do ar"); };
  assert.equal((await cancelarPelaPessoa(falho.deps, outra.codigo)).tipo, "cancelada"); // o cancelamento vale
  assert.equal(falho.avisos.length, 2);
  assert.match(falho.avisos.join("\n"), /Google fora do ar/);
  assert.match(falho.avisos.join("\n"), /SMTP fora do ar/);
});

// ---------- as tarefas agendadas (seção 7) ----------

function correioDeTeste() {
  const enviadas: Mensagem[] = [];
  return { enviadas, correio: async (m: Mensagem) => void enviadas.push(m) };
}

async function reservaParaLembrar(repo: ReturnType<typeof repositorioEmMemoria>, hora: string, criadaEm: Date, extra: { email?: string; data?: string } = {}) {
  const r = await repo.reservar({
    profissionalId: 1,
    servicoId: 1,
    inicio: N(extra.data ?? SEXTA, hora),
    ocupaMin: 30,
    nome: "Maria Souza",
    email: extra.email ?? "maria@exemplo.com.br",
    telefone: null,
    tokenHash: hashDoCodigo(`${hora}${extra.email ?? ""}`),
    criadaEm,
  });
  if (!r.ok) throw new Error("a reserva do teste devia caber");
  return r.reservaId;
}

test("lembrete: sai uma vez só; a reserva feita na véspera não recebe; a cancelada não recebe", async () => {
  const repo = repositorioEmMemoria();
  const agora = new Date("2026-10-08T15:00:00Z"); // quinta, 12h em Niterói; a sexta das 10h é daqui a 22 horas
  await reservaParaLembrar(repo, "10:00", new Date("2026-10-05T12:00:00Z")); // feita há dias: recebe
  await reservaParaLembrar(repo, "10:30", new Date(agora.getTime() - 10 * 60_000), { email: "recente@exemplo.com.br" }); // feita há 10 minutos: não
  const cancelada = await reservaParaLembrar(repo, "11:00", new Date("2026-10-05T12:00:00Z"), { email: "cancelada@exemplo.com.br" });
  await repo.cancelar(cancelada, agora);
  const c = correioDeTeste();
  assert.deepEqual(await enviarLembretes({ repo, correio: c.correio, ctx: CTX, agora }), { enviados: 1 });
  assert.equal(c.enviadas.length, 1);
  assert.equal(c.enviadas[0].para, "maria@exemplo.com.br");
  assert.deepEqual(await enviarLembretes({ repo, correio: c.correio, ctx: CTX, agora }), { enviados: 0 }); // a segunda chamada não manda de novo
  assert.equal(c.enviadas.length, 1);
});

test("lembrete: duas chamadas ao mesmo tempo nunca mandam em dobro", async () => {
  const repo = repositorioEmMemoria();
  const agora = new Date("2026-10-08T15:00:00Z");
  for (const [hora, email] of [["10:00", "a@exemplo.com.br"], ["10:30", "b@exemplo.com.br"], ["11:00", "c@exemplo.com.br"]]) {
    await reservaParaLembrar(repo, hora, new Date("2026-10-05T12:00:00Z"), { email });
  }
  const c = correioDeTeste();
  const [x, y] = await Promise.all([enviarLembretes({ repo, correio: c.correio, ctx: CTX, agora }), enviarLembretes({ repo, correio: c.correio, ctx: CTX, agora })]);
  assert.equal(x.enviados + y.enviados, 3);
  assert.deepEqual(c.enviadas.map((m) => m.para).sort(), ["a@exemplo.com.br", "b@exemplo.com.br", "c@exemplo.com.br"]);
});

test("lembrete: se o e-mail falha, o envio é desmarcado e a chamada seguinte tenta de novo", async () => {
  const repo = repositorioEmMemoria();
  const agora = new Date("2026-10-08T15:00:00Z");
  await reservaParaLembrar(repo, "10:00", new Date("2026-10-05T12:00:00Z"));
  const avisos: string[] = [];
  const fora = await enviarLembretes({ repo, correio: async () => { throw new Error("SMTP fora do ar"); }, ctx: CTX, agora, avisar: (t) => void avisos.push(t) });
  assert.deepEqual(fora, { enviados: 0 });
  assert.match(avisos[0], /SMTP fora do ar/);
  const c = correioDeTeste();
  assert.deepEqual(await enviarLembretes({ repo, correio: c.correio, ctx: CTX, agora: new Date(agora.getTime() + 15 * 60_000) }), { enviados: 1 });
});

test("manutenção: apaga o limite e o sal antigos, as sessões vencidas e as reservas além da guarda", async () => {
  const repo = repositorioEmMemoria();
  const agora = new Date("2026-10-09T03:00:00Z");
  const velha = await reservaParaLembrar(repo, "10:00", new Date("2025-09-01T12:00:00Z"), { data: "2025-09-12", email: "velha@exemplo.com.br" }); // 13 meses
  await reservaParaLembrar(repo, "10:00", new Date("2026-10-01T12:00:00Z"), { email: "recente@exemplo.com.br" });
  await reservaParaLembrar(repo, "10:30", new Date("2025-10-01T12:00:00Z"), { data: "2025-10-10", email: "quase@exemplo.com.br" }); // 12 meses menos um dia
  assert.ok(velha > 0);
  const sessaoVelha = await abrirSessao(repo, 1, new Date("2026-10-08T00:00:00Z")); // venceu às 12h de 08.10
  await abrirSessao(repo, 1, agora);
  const limpezas: Date[] = [];
  const armazem: ArmazemDoLimite = { salDoDia: async () => Buffer.alloc(32), somar: async () => 1, limpar: async (a) => void limpezas.push(a) };
  const feito = await manter({ repo, armazem, config, agora });
  assert.deepEqual(feito, { sessoesApagadas: 1, reservasApagadas: 1 });
  assert.deepEqual(limpezas, [agora]); // o limite e o sal antigos saem na mesma tarefa
  assert.equal(await repo.reservaPorId(velha), null);
  assert.equal(await donoDaSessao(repo, sessaoVelha, agora), null);
  assert.equal(repo.blocosOcupados(), 4); // as duas que ficaram, 2 blocos cada
  assert.equal(Z(limiteDaGuarda(agora, 12)), "2025-10-09T03:00:00.000Z");
});

test("tarefas: o segredo vem no Authorization e se confere em tempo constante", () => {
  const segredo = "s3gredo-de-teste-do-cron";
  assert.equal(autorizadoPeloSegredo(`Bearer ${segredo}`, segredo), true);
  for (const cabecalho of [null, "", segredo, `bearer ${segredo}`, `Bearer ${segredo} `, `Bearer ${segredo}x`, "Bearer ", "Bearer x", "Basic abc"]) {
    assert.equal(autorizadoPeloSegredo(cabecalho, segredo), false, String(cabecalho));
  }
  assert.equal(autorizadoPeloSegredo("Bearer ", ""), false); // sem segredo no ambiente, ninguém passa
  assert.equal(autorizadoPeloSegredo("Bearer undefined", undefined), false);
  assert.equal(autorizadoPeloSegredo(null, undefined), false);
});

// ---------- a decisão da ação de reservar (seção 5), sem servidor ----------

const T_PAGINA = AGORA.getTime() - 10_000; // a página foi pedida 10 s antes: o carimbo já tem idade

function formulario(campos: Partial<Record<string, string>> = {}, carimbo = emitirCarimbo(T_PAGINA)) {
  const dados = new FormData();
  const todos: Record<string, string> = { servico: "1", profissional: "qualquer", inicio: Z(N(SEXTA, "10:00")), nome: "Maria Souza", email: "maria@exemplo.com.br", telefone: "(21) 90000-0000", carimbo, nao_preencher: "", ...campos };
  for (const [nome, valor] of Object.entries(todos)) dados.append(nome, valor);
  return dados;
}

function ambiente(extra: Partial<DependenciasDaReserva> = {}) {
  const repo = repositorioEmMemoria();
  const armazem = armazemEmMemoria();
  const enviadas: Mensagem[] = [];
  const avisos: string[] = [];
  const eventos: { titulo: string; descricao: string }[] = [];
  const deps = (agora = AGORA): DependenciasDaReserva => ({
    repo,
    correio: async (m) => void enviadas.push(m),
    ctx: CTX,
    config,
    protecao: { lerCarimbo, emitirCarimbo, contarEnvio: (ip, a) => contarEnvio(ip, armazem, a), limitePorHora: LIMITE_POR_HORA },
    google: { criarEvento: async (e) => (eventos.push(e), `evt-${eventos.length}`), apagarEvento: async () => {} },
    avisar: (t) => void avisos.push(t),
    agora,
    ...extra,
  });
  return { repo, armazem, enviadas, avisos, eventos, deps };
}

test("ação: a reserva certa avisa a pessoa e o dono, com o convite, e põe o evento na agenda do dono", async () => {
  const a = ambiente();
  const r = await processarReserva(formulario(), "198.51.100.1", a.deps());
  assert.equal(r.tipo, "reservada");
  if (r.tipo !== "reservada") return;
  assert.equal(r.emailEnviado, true);
  assert.equal(Z(r.inicio), "2026-10-09T13:00:00.000Z");
  assert.deepEqual(a.enviadas.map((m) => m.para), ["maria@exemplo.com.br", "dono@exemplo.com.br"]);
  assert.ok(a.enviadas.every((m) => m.convite?.conteudo.startsWith("BEGIN:VCALENDAR")));
  const reserva = await a.repo.reservaPorId(1);
  assert.equal(reserva?.telefone, "21900000000"); // só os algarismos, sem máscara nem o 55
  assert.equal(reserva?.eventoGoogle, "evt-1");
  assert.equal(a.eventos[0].titulo, "Corte · Maria Souza");
  // O código do e-mail é o que o banco conhece pelo hash.
  const codigo = a.enviadas[0].texto.match(/\/cancelar\/([A-Za-z0-9_-]{22})/)?.[1];
  assert.ok(codigo);
  assert.equal((await situacaoDoCancelamento(a.repo, codigo!, AGORA, config)).tipo, "pode-cancelar");
});

test("ação: o e-mail que falha não desfaz a reserva — a confirmação mostra o horário na tela", async () => {
  const a = ambiente({ correio: async () => { throw new Error("SMTP fora do ar"); } });
  const r = await processarReserva(formulario(), "198.51.100.1", a.deps());
  assert.deepEqual(r.tipo === "reservada" && r.emailEnviado, false);
  assert.equal((await a.repo.reservaPorId(1))?.situacao, "confirmada");
  assert.equal(a.avisos.length, 2); // o da pessoa e o do dono
  assert.match(a.avisos[0], /SMTP fora do ar/);
});

test("ação: a falha do Google não desfaz a reserva", async () => {
  const a = ambiente({ google: { criarEvento: async () => { throw new Error("Google fora do ar"); }, apagarEvento: async () => {} } });
  const r = await processarReserva(formulario(), "198.51.100.1", a.deps());
  assert.deepEqual(r.tipo === "reservada" && r.emailEnviado, true);
  assert.equal((await a.repo.reservaPorId(1))?.eventoGoogle, null);
  assert.match(a.avisos.join("\n"), /Google fora do ar/);
});

test("ação: campo-armadilha ou carimbo forjado finge sucesso e não reserva", async () => {
  const a = ambiente();
  assert.deepEqual(await processarReserva(formulario({ nao_preencher: "http://spam.exemplo" }), "198.51.100.1", a.deps()), { tipo: "descartado" });
  assert.deepEqual(await processarReserva(formulario({}, "lixo"), "198.51.100.1", a.deps()), { tipo: "descartado" });
  const semCarimbo = formulario();
  semCarimbo.delete("carimbo");
  assert.deepEqual(await processarReserva(semCarimbo, "198.51.100.1", a.deps()), { tipo: "descartado" });
  assert.equal(await a.repo.reservaPorId(1), null);
  assert.equal(a.enviadas.length, 0);
});

test("ação: rápido demais e carimbo vencido pedem para conferir; a segunda tentativa passa", async () => {
  const a = ambiente();
  const carimbo = emitirCarimbo(AGORA.getTime() - 1_000);
  const rapido = await processarReserva(formulario({}, carimbo), "198.51.100.1", a.deps());
  assert.equal(rapido.tipo === "estado" && rapido.estado.situacao, "corrigir");
  assert.equal(rapido.tipo === "estado" && rapido.estado.carimbo, carimbo);
  assert.equal(await a.repo.reservaPorId(1), null);
  const depois = new Date(AGORA.getTime() + 5_000);
  assert.equal((await processarReserva(formulario({}, carimbo), "198.51.100.1", a.deps(depois))).tipo, "reservada");

  const b = ambiente();
  const velho = emitirCarimbo(AGORA.getTime() - 25 * HORA_MS);
  const vencido = await processarReserva(formulario({}, velho), "198.51.100.1", b.deps());
  assert.equal(vencido.tipo === "estado" && vencido.estado.situacao, "corrigir");
  assert.match((vencido.tipo === "estado" && vencido.estado.aviso) || "", /mais de um dia/);
  assert.equal(vencido.tipo === "estado" && lerCarimbo(vencido.estado.carimbo, AGORA.getTime() + 5_000), "valido");
});

test("ação: campo inválido devolve os erros em texto e os valores, sem reservar", async () => {
  const a = ambiente();
  const r = await processarReserva(formulario({ nome: "", email: "", inicio: "" }), "198.51.100.1", a.deps());
  assert.equal(r.tipo, "estado");
  if (r.tipo !== "estado") return;
  assert.equal(r.estado.situacao, "corrigir");
  assert.deepEqual(Object.keys(r.estado.erros ?? {}).sort(), ["email", "inicio", "nome"]);
  assert.equal(r.estado.valores?.telefone, "(21) 90000-0000");
  assert.equal(await a.repo.reservaPorId(1), null);
});

test("ação: o horário levado por outro pedido volta como 'ocupado', com os valores", async () => {
  const a = ambiente();
  assert.equal((await processarReserva(formulario({ profissional: "1" }), "198.51.100.1", a.deps())).tipo, "reservada");
  const r = await processarReserva(formulario({ profissional: "1", email: "outra@exemplo.com.br" }), "198.51.100.2", a.deps());
  assert.equal(r.tipo === "estado" && r.estado.situacao, "ocupado");
  assert.equal(r.tipo === "estado" && r.estado.aviso, "Este horário acabou de ser ocupado. Escolha outro.");
  assert.equal(r.tipo === "estado" && r.estado.valores?.email, "outra@exemplo.com.br");
  assert.equal(a.enviadas.length, 2); // só os da primeira reserva
});

test("ação: a corrida — dois pedidos ao mesmo tempo, uma reserva só e um 'acabou de ser ocupado'", async () => {
  const a = ambiente();
  const [x, y] = await Promise.all([
    processarReserva(formulario({ profissional: "1" }), "198.51.100.1", a.deps()),
    processarReserva(formulario({ profissional: "1", email: "outra@exemplo.com.br" }), "198.51.100.2", a.deps()),
  ]);
  const situacoes = [x, y].map((r) => (r.tipo === "estado" ? r.estado.situacao : r.tipo)).sort();
  assert.deepEqual(situacoes, ["ocupado", "reservada"]);
});

test("ação: o sexto pedido da hora, do mesmo IP, mostra o limite", async () => {
  const a = ambiente();
  const horariosDistintos = ["09:00", "09:30", "10:00", "10:30", "11:00", "13:00"];
  const resultados = [];
  for (const hora of horariosDistintos) resultados.push(await processarReserva(formulario({ profissional: "1", inicio: Z(N(SEXTA, hora)) }), "198.51.100.1", a.deps()));
  assert.deepEqual(resultados.slice(0, 5).map((r) => r.tipo), Array(5).fill("reservada"));
  const sexto = resultados[5];
  assert.equal(sexto.tipo === "estado" && sexto.estado.situacao, "limite");
  assert.equal(await a.repo.reservaPorId(6), null);
  assert.equal((await processarReserva(formulario({ profissional: "1", inicio: Z(N(SEXTA, "13:00")) }), "198.51.100.2", a.deps())).tipo, "reservada"); // outro IP
});

test("ação: o repositório que falha devolve 'falhou' e os avisos vão ao registro", async () => {
  const a = ambiente();
  const quebrado = { ...a.repo, servicos: async () => { throw new Error("banco fora do ar"); } };
  const r = await processarReserva(formulario(), "198.51.100.1", { ...a.deps(), repo: quebrado });
  assert.equal(r.tipo === "estado" && r.estado.situacao, "falhou");
  assert.match(a.avisos.join("\n"), /banco fora do ar/);
});

test("ação: ataque — horário fora da lista, serviço e profissional adulterados, data inexistente, campo como texto", async () => {
  const a = ambiente();
  const cai = async (campos: Partial<Record<string, string>>) => {
    const r = await processarReserva(formulario(campos), "198.51.100.1", a.deps());
    return r.tipo === "estado" ? r.estado.situacao : r.tipo;
  };
  assert.equal(await cai({ inicio: Z(N(SEXTA, "03:00")) }), "ocupado"); // fora do expediente
  assert.equal(await cai({ inicio: Z(N("2026-10-06", "10:00")) }), "ocupado"); // no passado
  assert.equal(await cai({ inicio: Z(N("2026-11-20", "10:00")) }), "ocupado"); // além de 30 dias
  assert.equal(await cai({ servico: "2", profissional: "2" }), "ocupado"); // o Bruno não faz corte e barba
  assert.equal(await cai({ servico: "99" }), "ocupado");
  assert.equal(await cai({ inicio: "2026-13-45T10:00:00.000Z" }), "corrigir");
  assert.equal(await cai({ servico: "1 OR 1=1" }), "corrigir");
  assert.equal(await cai({ profissional: "../" }), "corrigir");
  assert.equal(await a.repo.reservaPorId(1), null);
});

// ---------- o painel do dono (seção 9) ----------

test("painel: as reservas dos próximos dias, agrupadas pelo dia de Niterói", async () => {
  const repo = repositorioEmMemoria();
  const feita = (inicio: Date, email: string, profissionalId = 1) =>
    repo.reservar({ profissionalId, servicoId: 1, inicio, ocupaMin: 30, nome: "Maria", email, telefone: null, tokenHash: hashDoCodigo(email + inicio.getTime()), criadaEm: AGORA });
  await feita(N(SEXTA, "10:00"), "a@exemplo.com.br");
  await feita(N(SEXTA, "09:00"), "b@exemplo.com.br", 2);
  await feita(new Date("2026-10-10T02:30:00Z"), "noite@exemplo.com.br"); // 23h30 de sexta em Niterói, já sábado em UTC
  await feita(N("2026-10-10", "10:00"), "sabado@exemplo.com.br");
  await feita(N("2026-10-21", "10:00"), "longe@exemplo.com.br"); // depois dos 14 dias
  await feita(N("2026-10-07", "08:00"), "hoje-cedo@exemplo.com.br"); // hoje, antes de agora: ainda aparece (o dia inteiro)
  const dias = await reservasDosProximosDias(repo, AGORA);
  assert.deepEqual(dias.map((d) => d.data), ["2026-10-07", SEXTA, "2026-10-10"]);
  assert.deepEqual(dias[1].reservas.map((r) => `${horaEmNiteroi(r.inicio)} ${r.profissionalNome}`), ["09:00 Bruno", "10:00 Rafael", "23:30 Rafael"]);
  assert.deepEqual(dias[2].reservas.map((r) => r.email), ["sabado@exemplo.com.br"]);
  assert.deepEqual(agruparPorDia([]), []);
});

test("painel: cancelar com motivo avisa a pessoa, libera o horário e tira o evento do Google", async () => {
  const { repo, reserva } = await reservaFeita();
  await repo.guardarEventoGoogle(reserva.id, "evt-5");
  const apagados: string[] = [];
  const c = cancelamentoDe(repo, { google: { criarEvento: async () => "x", apagarEvento: async (id) => void apagados.push(id) } });
  const desfecho = await cancelarPeloDono(c.deps, reserva.id, "  Barbeiro doente\r\nBcc: x@y.z  ");
  assert.equal(desfecho.tipo, "cancelada");
  assert.equal(desfecho.tipo === "cancelada" && desfecho.emailEnviado, true);
  assert.equal(c.enviadas[0].para, "maria@exemplo.com.br");
  assert.ok(c.enviadas[0].texto.includes("Motivo: Barbeiro doente Bcc: x@y.z"));
  assert.equal(repo.blocosOcupados(), 0);
  assert.deepEqual(apagados, ["evt-5"]);
  assert.equal((await cancelarPeloDono(c.deps, reserva.id, "de novo")).tipo, "ja-cancelada");
  assert.equal((await cancelarPeloDono(c.deps, 999, "sem reserva")).tipo, "nao-encontrada");
  assert.equal(c.enviadas.length, 1);
});

test("painel: o cancelamento exige motivo; o e-mail que não sai não desfaz o cancelamento", async () => {
  const { repo, reserva } = await reservaFeita();
  const c = cancelamentoDe(repo);
  for (const motivo of ["", " ", "x", "y".repeat(201)]) assert.equal((await cancelarPeloDono(c.deps, reserva.id, motivo)).tipo, "motivo-invalido", motivo);
  assert.equal((await repo.reservaPorId(reserva.id))?.situacao, "confirmada");
  c.deps.correio = async () => { throw new Error("SMTP fora do ar"); };
  const desfecho = await cancelarPeloDono(c.deps, reserva.id, "Imprevisto");
  assert.equal(desfecho.tipo === "cancelada" && desfecho.emailEnviado, false);
  assert.equal((await repo.reservaPorId(reserva.id))?.situacao, "cancelada");
});

test("painel: bloquear o dia inteiro, vários dias ou um horário", () => {
  const casa = { profissional: "casa", dia: SEXTA, diaFim: "", de: "", ate: "", motivo: "Feriado" };
  const dia = lerBloqueio(casa);
  assert.ok("folga" in dia);
  if ("folga" in dia) {
    assert.equal(dia.folga.profissionalId, null);
    assert.equal(Z(dia.folga.inicio), "2026-10-09T03:00:00.000Z"); // 00h de Niterói
    assert.equal(Z(dia.folga.fim), "2026-10-10T03:00:00.000Z");
  }
  const ferias = lerBloqueio({ ...casa, profissional: "1", diaFim: "2026-10-12", motivo: "Férias" });
  assert.ok("folga" in ferias);
  if ("folga" in ferias) {
    assert.equal(ferias.folga.profissionalId, 1);
    assert.equal(Z(ferias.folga.fim), "2026-10-13T03:00:00.000Z"); // até o fim do dia 12
  }
  const horario = lerBloqueio({ ...casa, profissional: "2", de: "14:00", ate: "16:30", motivo: "Dentista" });
  assert.ok("folga" in horario);
  if ("folga" in horario) {
    assert.equal(Z(horario.folga.inicio), "2026-10-09T17:00:00.000Z");
    assert.equal(Z(horario.folga.fim), "2026-10-09T19:30:00.000Z");
  }
});

test("painel: o bloqueio com campo errado diz qual", () => {
  const bom = { profissional: "casa", dia: SEXTA, diaFim: "", de: "", ate: "", motivo: "Feriado" };
  const erros = (c: Partial<typeof bom>) => {
    const r = lerBloqueio({ ...bom, ...c });
    return "erros" in r ? Object.keys(r.erros) : [];
  };
  assert.deepEqual(erros({ dia: "2026-13-45" }), ["dia"]);
  assert.deepEqual(erros({ dia: "" }), ["dia"]);
  assert.deepEqual(erros({ diaFim: "2026-10-08" }), ["diaFim"]); // antes do primeiro
  assert.deepEqual(erros({ diaFim: "2026-02-30" }), ["diaFim"]);
  assert.deepEqual(erros({ de: "14:00" }), ["de"]); // só um dos horários
  assert.deepEqual(erros({ de: "25:00", ate: "26:00" }), ["de"]);
  assert.deepEqual(erros({ de: "16:00", ate: "14:00" }), ["ate"]); // o fim antes do início
  assert.deepEqual(erros({ de: "14:00", ate: "14:00" }), ["ate"]);
  assert.deepEqual(erros({ motivo: " " }), ["motivo"]);
  assert.deepEqual(erros({ motivo: "m".repeat(81) }), ["motivo"]);
  assert.deepEqual(erros({ profissional: "x" }), ["profissional"]);
  assert.deepEqual(erros({ profissional: "", dia: "", motivo: "" }).sort(), ["dia", "motivo", "profissional"]);
  for (const mensagem of Object.values(ERROS_DO_BLOQUEIO)) assert.ok(mensagem.length > 10);
});

test("painel: a folga criada tira os horários da lista, e removida, devolve", async () => {
  const repo = repositorioEmMemoria();
  const lido = lerBloqueio({ profissional: "casa", dia: SEXTA, diaFim: "", de: "", ate: "", motivo: "Feriado" });
  if (!("folga" in lido)) throw new Error("devia ler");
  const id = await repo.criarFolga(lido.folga);
  const consulta = () => horariosDoServico(repo, { servicoId: 1, profissionalId: null, data: SEXTA, agora: AGORA, config });
  assert.deepEqual(await consulta(), []);
  assert.deepEqual((await repo.folgasAPartirDe(AGORA)).map((f) => f.motivo), ["Feriado"]);
  assert.equal(await repo.removerFolga(id), true);
  assert.equal(await repo.removerFolga(id), false);
  assert.equal((await consulta()).length, 34);
});

test("painel: a busca por e-mail ou telefone, e a eliminação dos dados da pessoa", async () => {
  assert.deepEqual(lerBusca("  Maria@Exemplo.com.br "), { email: "maria@exemplo.com.br" });
  assert.deepEqual(lerBusca("(21) 90000-0000"), { telefone: "21900000000" });
  assert.deepEqual(lerBusca("+55 21 90000-0000"), { telefone: "21900000000" });
  for (const ruim of ["", "maria", "maria@", "1234", "a@b"]) assert.equal(lerBusca(ruim), null, ruim);

  const repo = repositorioEmMemoria();
  const a = await reservaFeita(repo, {}, 1); // Maria, 10h
  const b = await reservarHorario(repo, pedido(1, 1, SEXTA, "11:00", { email: "joao@exemplo.com.br", telefone: "21911112222", nome: "João" }), AGORA, config);
  const c = await reservarHorario(repo, pedido(1, 1, SEXTA, "14:00"), AGORA, config); // Maria de novo, outra reserva
  assert.equal(b.tipo, "reservada");
  assert.equal(c.tipo, "reservada");
  await repo.guardarEventoGoogle(a.reserva.id, "evt-1");
  await repo.cancelar(a.reserva.id, AGORA); // a cancelada também é dado pessoal
  assert.equal((await repo.buscarPessoa({ email: "maria@exemplo.com.br" })).length, 2);
  assert.equal((await repo.buscarPessoa({ telefone: "21900000000" })).length, 2);
  const apagados: string[] = [];
  const google: CalendarioDoDono = { criarEvento: async () => "x", apagarEvento: async (id) => void apagados.push(id) };
  const feito = await apagarDadosDaPessoa({ repo, google, avisar: () => {} }, { email: "maria@exemplo.com.br" });
  assert.deepEqual(feito, { apagadas: 2 });
  assert.deepEqual(apagados, ["evt-1"]);
  assert.equal((await repo.buscarPessoa({ email: "maria@exemplo.com.br" })).length, 0);
  assert.equal((await repo.buscarPessoa({ email: "joao@exemplo.com.br" })).length, 1); // a outra pessoa fica
  assert.equal(repo.blocosOcupados(), 2); // os blocos da Maria saíram
  assert.deepEqual(await apagarDadosDaPessoa({ repo }, { telefone: "21900000000" }), { apagadas: 0 });
});

// ---------- a agenda do Google do dono (seção 6.1, PROPOSTA) ----------

test("google: a afirmação JWT RS256 da conta de serviço, assinada e verificável", () => {
  const { publicKey, privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048, publicKeyEncoding: { type: "spki", format: "pem" }, privateKeyEncoding: { type: "pkcs8", format: "pem" } });
  const chave = privateKey.replace(/\n/g, "\\n"); // como a variável de ambiente a guarda
  const agora = new Date("2026-10-09T12:00:00Z");
  const jwt = assinarAfirmacao({ email: "conta@projeto.iam.gserviceaccount.com", chave }, agora);
  const [cabeca, corpo, assinatura] = jwt.split(".");
  assert.deepEqual(JSON.parse(Buffer.from(cabeca, "base64url").toString()), { alg: "RS256", typ: "JWT" });
  const dados = JSON.parse(Buffer.from(corpo, "base64url").toString());
  assert.deepEqual(dados, {
    iss: "conta@projeto.iam.gserviceaccount.com",
    scope: "https://www.googleapis.com/auth/calendar.events",
    aud: "https://oauth2.googleapis.com/token",
    iat: Math.floor(agora.getTime() / 1000),
    exp: Math.floor(agora.getTime() / 1000) + 3600,
  });
  assert.equal(createVerify("RSA-SHA256").update(`${cabeca}.${corpo}`).verify(publicKey, assinatura, "base64url"), true);
  assert.equal(createVerify("RSA-SHA256").update(`${cabeca}.${corpo}x`).verify(publicKey, assinatura, "base64url"), false);
});

test("google: sem as três variáveis não há calendário; com elas, as chamadas saem como a documentação pede", async () => {
  assert.equal(calendarioDoGoogle({}), undefined);
  assert.equal(calendarioDoGoogle({ GOOGLE_CONTA_EMAIL: "c@p.iam.gserviceaccount.com", GOOGLE_CONTA_CHAVE: "k" }), undefined);
  const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048, privateKeyEncoding: { type: "pkcs8", format: "pem" }, publicKeyEncoding: { type: "spki", format: "pem" } });
  const calendario = calendarioDoGoogle({ GOOGLE_CONTA_EMAIL: "c@p.iam.gserviceaccount.com", GOOGLE_CONTA_CHAVE: privateKey.replace(/\n/g, "\\n"), GOOGLE_AGENDA_ID: "dono@gmail.com" });
  assert.ok(calendario);

  const original = globalThis.fetch;
  const chamadas: { url: string; metodo: string; autorizacao: string | null; corpo: string }[] = [];
  let respostaDoEvento = () => Response.json({ id: "evt-9" });
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const endereco = String(url);
    chamadas.push({ url: endereco, metodo: init?.method ?? "GET", autorizacao: new Headers(init?.headers).get("authorization"), corpo: String(init?.body ?? "") });
    return endereco.includes("oauth2") ? Response.json({ access_token: "tok-1" }) : respostaDoEvento();
  }) as typeof fetch;
  try {
    const id = await calendario!.criarEvento({ inicio: new Date("2026-10-09T13:00:00Z"), fim: new Date("2026-10-09T13:30:00Z"), titulo: "Corte · Maria", descricao: "Nome: Maria" });
    assert.equal(id, "evt-9");
    assert.match(chamadas[0].url, /^https:\/\/oauth2\.googleapis\.com\/token$/);
    assert.match(chamadas[0].corpo, /grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=/);
    assert.equal(chamadas[1].url, "https://www.googleapis.com/calendar/v3/calendars/dono%40gmail.com/events");
    assert.equal(chamadas[1].metodo, "POST");
    assert.equal(chamadas[1].autorizacao, "Bearer tok-1");
    assert.deepEqual(JSON.parse(chamadas[1].corpo), {
      summary: "Corte · Maria",
      description: "Nome: Maria",
      start: { dateTime: "2026-10-09T13:00:00.000Z" },
      end: { dateTime: "2026-10-09T13:30:00.000Z" },
    });

    respostaDoEvento = () => new Response(null, { status: 204 });
    await calendario!.apagarEvento("evt/9");
    assert.equal(chamadas.at(-1)?.url, "https://www.googleapis.com/calendar/v3/calendars/dono%40gmail.com/events/evt%2F9");
    assert.equal(chamadas.at(-1)?.metodo, "DELETE");
    respostaDoEvento = () => new Response(null, { status: 410 }); // já apagado pelo dono: vale
    await calendario!.apagarEvento("evt-9");
    respostaDoEvento = () => new Response(null, { status: 500 });
    await assert.rejects(() => calendario!.apagarEvento("evt-9"), /500/);
    await assert.rejects(() => calendario!.criarEvento({ inicio: new Date(), fim: new Date(), titulo: "x", descricao: "y" }), /evento no Google: 500/);
  } finally {
    globalThis.fetch = original;
  }
});

// ---------- a fronteira entre servidor e navegador ----------

/** Todos os .ts e .tsx de uma pasta, descendo nas subpastas (sem node_modules nem .next). */
function arquivos(pasta: string): string[] {
  return readdirSync(pasta).flatMap((nome) => {
    if (nome === "node_modules" || nome.startsWith(".")) return [];
    const caminho = join(pasta, nome);
    return statSync(caminho).isDirectory() ? arquivos(caminho) : /\.tsx?$/.test(nome) ? [caminho] : [];
  });
}

test("fronteira: do código da Agenda, o navegador só importa, como valor, a validação", () => {
  const raiz = fileURLToPath(new URL("..", import.meta.url));
  const importacao = /^\s*import\s+(type\s+)?(?:[^"';]*?\sfrom\s*)?["']([^"']+)["']/gm;
  const daAgenda = /(?:^|\/)lib\/(?:agenda|painel|formulario)\/([\w.-]+?)(?:\.ts)?$|(?:^|\/)lib\/banco(?:\.ts)?$/;
  const clientes = ["components", "app"].flatMap((p) => arquivos(join(raiz, p))).filter((f) => /^["']use client["']/.test(readFileSync(f, "utf8").trimStart()));
  assert.ok(clientes.length > 0, "nenhuma ilha encontrada: o teste procura no lugar errado");
  for (const arquivo of clientes) {
    for (const [, soTipo, de] of readFileSync(arquivo, "utf8").matchAll(importacao)) {
      if (soTipo) continue; // import type some na compilação
      assert.equal(de.startsWith("node:") || de === "server-only", false, `${arquivo} importa ${de}`);
      const achou = daAgenda.exec(de);
      if (achou) assert.equal(achou[1], "validar", `${arquivo} importa ${de}: código de servidor no navegador`);
    }
  }
});

// ---------- o consentimento da psicologia (05-agenda.md, seção 1, "Varia por"; nichos/psicologia.md, seção 5.4) ----------

test("consentimento: a caixa só é exigida onde a casa a configura", () => {
  const campos = { nome: "Ana da Silva", email: "ana@exemplo.com.br", telefone: "", servico: "1", profissional: "qualquer", inicio: "2026-10-09T17:30:00.000Z" };
  assert.equal(validarReserva(campos).consentimento, undefined); // sem a caixa: nenhum erro (art. 7º, V)
  assert.match(validarReserva(campos, true).consentimento ?? "", /Marque a caixa/);
  assert.equal(validarReserva({ ...campos, consentimento: "sim" }, true).consentimento, undefined);
  assert.match(validarReserva({ ...campos, consentimento: "on" }, true).consentimento ?? "", /Marque a caixa/); // só "sim" vale
});

test("consentimento: com a caixa configurada, a ação recusa o pedido sem ela e aceita com ela", async () => {
  const comCaixa = { ...config, consentimento: "Concordo que a casa use meus dados para marcar a sessão." };
  const a = ambiente({ config: comCaixa });
  const sem = await processarReserva(formulario(), "198.51.100.1", a.deps());
  assert.equal(sem.tipo, "estado");
  if (sem.tipo === "estado") {
    assert.equal(sem.estado.situacao, "corrigir");
    assert.match(sem.estado.erros?.consentimento ?? "", /Marque a caixa/);
  }
  assert.equal(a.enviadas.length, 0); // nada reservado, nada enviado
  const com = await processarReserva(formulario({ consentimento: "sim" }), "198.51.100.1", a.deps());
  assert.equal(com.tipo, "reservada");
});

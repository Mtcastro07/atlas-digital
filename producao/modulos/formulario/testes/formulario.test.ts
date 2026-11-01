// testes/formulario.test.ts — os testes de unidade do formulário, só das partes sem dependência: as regras dos campos,
// a proteção (carimbo, limite por IP em hash, armadilha), a composição do e-mail e a decisão da ação, sem servidor,
// sem banco e sem SMTP (producao/esteira/14-funcionalidades/02-formulario.md, seção 9; producao/qualidade/04-unidade.md, seções 4.5 e 3).
// Rodam no node:test (`npm test`). Todo instante é explícito: nunca o relógio da máquina.
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { servicos, textos } from "../conteudo/formulario.ts";
import { emitirCarimbo, lerCarimbo } from "../lib/formulario/carimbo.ts";
import { campo, ipDoVisitante } from "../lib/formulario/entrada.ts";
import { armazemEmMemoria, chaveEmHash, contarEnvio, contarNaJanela, diaEmUtc, inicioDaJanela, LIMITE_POR_HORA } from "../lib/formulario/limite.ts";
import type { ArmazemDoLimite } from "../lib/formulario/limite.ts";
import { montarEmail } from "../lib/formulario/mensagem.ts";
import { processarEnvio } from "../lib/formulario/processar.ts";
import type { Campos } from "../lib/formulario/validar.ts";
import { emailValido, lerTelefone, validar } from "../lib/formulario/validar.ts";

process.env.SEGREDO_DO_FORMULARIO = "segredo-de-teste"; // lido a cada assinatura

const IDS = servicos.map((s) => s.id);
const T0 = 1_760_000_000_000; // um instante fixo, com 13 algarismos (2025-10-09T08:53:20Z)
const AGORA = new Date(T0 + 10_000);
const OK: Campos = { nome: "Maria Souza", telefone: "(21) 90000-0000", email: "maria@exemplo.com.br", servico: IDS[0], mensagem: "Quero marcar." };

// ---------- as regras dos campos (seção 3.1) ----------

test("nome: 1 caractere não passa; 2 e 80 passam; 81 não passa", () => {
  assert.equal(validar({ ...OK, nome: "A" }, IDS).nome, "Escreva o nome.");
  assert.equal(validar({ ...OK, nome: "" }, IDS).nome, "Escreva o nome.");
  assert.equal(validar({ ...OK, nome: "Al" }, IDS).nome, undefined);
  assert.equal(validar({ ...OK, nome: "a".repeat(80) }, IDS).nome, undefined);
  assert.equal(validar({ ...OK, nome: "a".repeat(81) }, IDS).nome, "O nome passa de 80 caracteres.");
});

test("contato: telefone ou e-mail, um dos dois; nenhum dos dois é erro", () => {
  assert.deepEqual(validar({ ...OK, telefone: "", email: "" }, IDS), { telefone: "Informe um telefone ou um e-mail para a resposta." });
  assert.deepEqual(validar({ ...OK, telefone: "", email: "maria@exemplo.com.br" }, IDS), {});
  assert.deepEqual(validar({ ...OK, telefone: "21 90000-0000", email: "" }, IDS), {});
});

test("telefone: com e sem o 55, com máscara; curto ou com letras não passa", () => {
  assert.equal(lerTelefone("(21) 90000-0000"), "21900000000");
  assert.equal(lerTelefone("+55 (21) 90000-0000"), "21900000000");
  assert.equal(lerTelefone("5521900000000"), "21900000000");
  assert.equal(lerTelefone("2133334444"), "2133334444"); // fixo, 10 algarismos
  assert.equal(lerTelefone("55 21 3333-4444"), "2133334444");
  assert.equal(lerTelefone("(55) 99999-9999"), "55999999999"); // o DDD 55 (Santa Maria) não é confundido com o país
  assert.equal(lerTelefone("9000-0000"), null); // sem DDD
  assert.equal(lerTelefone("(21) 9000-000"), null);
  assert.equal(lerTelefone("55219000000000000"), null); // longo demais
  assert.equal(lerTelefone("telefone"), null);
  assert.equal(validar({ ...OK, telefone: "9000-0000" }, IDS).telefone, "Telefone com DDD, como (21) 90000-0000.");
});

test("e-mail: nome@dominio.tld, até 254 caracteres", () => {
  for (const bom of ["a@b.co", "maria.souza+site@exemplo.com.br"]) assert.equal(emailValido(bom), true, bom);
  for (const ruim of ["", "a@b", "a b@c.de", "@b.co", "a@@b.co", "a@b.", "maria"]) assert.equal(emailValido(ruim), false, ruim);
  const limite = `${"a".repeat(254 - "@b.co".length)}@b.co`; // 254 caracteres
  assert.equal(limite.length, 254);
  assert.equal(emailValido(limite), true);
  assert.equal(emailValido(`a${limite}`), false); // 255
  assert.equal(validar({ ...OK, email: "maria@" }, IDS).email, "E-mail no formato nome@exemplo.com.br.");
});

test("serviço: só valores da lista do site", () => {
  assert.equal(validar({ ...OK, servico: "" }, IDS).servico, "Escolha o serviço.");
  assert.equal(validar({ ...OK, servico: "inventado" }, IDS).servico, "Escolha o serviço.");
  assert.equal(validar({ ...OK, servico: IDS[1] }, IDS).servico, undefined);
});

test("mensagem: até 2.000 caracteres; vazia vale", () => {
  assert.equal(validar({ ...OK, mensagem: "" }, IDS).mensagem, undefined);
  assert.equal(validar({ ...OK, mensagem: "a".repeat(2000) }, IDS).mensagem, undefined);
  assert.equal(validar({ ...OK, mensagem: "a".repeat(2001) }, IDS).mensagem, "A mensagem passa de 2.000 caracteres.");
});

test("campos certos: nenhum erro; vários errados: um erro por campo", () => {
  assert.deepEqual(validar(OK, IDS), {});
  const erros = validar({ nome: "", telefone: "1", email: "x", servico: "", mensagem: "a".repeat(2001) }, IDS);
  assert.deepEqual(Object.keys(erros).sort(), ["email", "mensagem", "nome", "servico", "telefone"]);
});

test("a lista de serviços do conteúdo: ids únicos e nomes de uma linha", () => {
  assert.equal(new Set(IDS).size, IDS.length);
  for (const s of servicos) assert.match(s.id, /^[a-z0-9]+(-[a-z0-9]+)*$/);
  for (const s of servicos) assert.doesNotMatch(s.nome, /[\r\n]/);
  assert.match(textos.aviso, /12 meses/);
});

// ---------- o carimbo de tempo assinado (seção 5.2; producao/qualidade/04-unidade.md, seção 4.5) ----------

test("carimbo: válido depois de 3 s", () => {
  assert.equal(lerCarimbo(emitirCarimbo(T0), T0 + 5_000), "valido");
});

test("carimbo: 2.999 ms ainda é rápido; 3.000 ms já vale", () => {
  assert.equal(lerCarimbo(emitirCarimbo(T0), T0 + 2_999), "rapido");
  assert.equal(lerCarimbo(emitirCarimbo(T0), T0 + 3_000), "valido");
});

test("carimbo: idade negativa (relógio adiantado) conta como rápido", () => {
  assert.equal(lerCarimbo(emitirCarimbo(T0), T0 - 1_000), "rapido");
});

test("carimbo: 24 h ainda vale; 24 h e 1 ms está vencido", () => {
  assert.equal(lerCarimbo(emitirCarimbo(T0), T0 + 24 * 3_600_000), "valido");
  assert.equal(lerCarimbo(emitirCarimbo(T0), T0 + 24 * 3_600_000 + 1), "vencido");
});

test("carimbo: assinatura trocada, sem ponto, vazio ou de outro segredo é forjado", () => {
  const [, assinatura] = emitirCarimbo(T0).split(".");
  assert.equal(lerCarimbo(`${T0 - 60_000}.${assinatura}`, T0 + 5_000), "forjado"); // o instante recuado, a assinatura de outro
  const outroFim = assinatura.endsWith("A") ? "B" : "A";
  assert.equal(lerCarimbo(`${T0}.${assinatura.slice(0, -1)}${outroFim}`, T0 + 5_000), "forjado"); // um caractere trocado
  assert.equal(lerCarimbo(String(T0), T0 + 5_000), "forjado");
  assert.equal(lerCarimbo("", T0), "forjado");
  assert.equal(lerCarimbo(`abc.${assinatura}`, T0), "forjado");
  assert.equal(lerCarimbo(`${T0}.`, T0 + 5_000), "forjado");
  const deOutroSegredo = (() => {
    process.env.SEGREDO_DO_FORMULARIO = "outro-segredo";
    try {
      return emitirCarimbo(T0);
    } finally {
      process.env.SEGREDO_DO_FORMULARIO = "segredo-de-teste";
    }
  })();
  assert.equal(lerCarimbo(deOutroSegredo, T0 + 5_000), "forjado");
});

test("carimbo: sem o segredo no ambiente, falha alto (nunca assina com segredo vazio)", () => {
  delete process.env.SEGREDO_DO_FORMULARIO;
  try {
    assert.throws(() => emitirCarimbo(T0), /SEGREDO_DO_FORMULARIO ausente/);
    assert.throws(() => lerCarimbo(`${T0}.x`, T0), /SEGREDO_DO_FORMULARIO ausente/);
  } finally {
    process.env.SEGREDO_DO_FORMULARIO = "segredo-de-teste";
  }
});

// ---------- o limite por IP, em hash (seção 5.3) ----------

/** Um armazém que guarda o que recebeu, para provar que o IP nunca chega a ele. */
function armazemEspiao() {
  const real = armazemEmMemoria();
  const chamadas: unknown[][] = [];
  const armazem: ArmazemDoLimite = {
    async salDoDia(dia) {
      chamadas.push(["salDoDia", dia]);
      return real.salDoDia(dia);
    },
    async somar(chave, janela) {
      chamadas.push(["somar", chave, janela.toISOString()]);
      return real.somar(chave, janela);
    },
    limpar: (agora) => real.limpar(agora),
  };
  return { armazem, chamadas };
}

test("limite: o IP vira um hash de 64 caracteres, e o armazém nunca o recebe", async () => {
  const { armazem, chamadas } = armazemEspiao();
  const ip = "203.0.113.77";
  await contarEnvio(ip, armazem, new Date(T0));
  const gravado = JSON.stringify(chamadas);
  assert.equal(gravado.includes(ip), false);
  const chave = chamadas.find((c) => c[0] === "somar")![1] as string;
  assert.match(chave, /^[0-9a-f]{64}$/);
});

test("limite: o mesmo IP no mesmo dia dá a mesma chave; outro IP, outra; outro dia, outro sal e outra chave", async () => {
  const armazem = armazemEmMemoria();
  const sal = await armazem.salDoDia("2025-10-09");
  assert.equal(chaveEmHash("1.1.1.1", sal), chaveEmHash("1.1.1.1", sal));
  assert.notEqual(chaveEmHash("1.1.1.1", sal), chaveEmHash("1.1.1.2", sal));
  assert.equal(await armazem.salDoDia("2025-10-09"), sal); // o mesmo sal o dia inteiro
  const salDeAmanha = await armazem.salDoDia("2025-10-10");
  assert.notDeepEqual(salDeAmanha, sal);
  assert.notEqual(chaveEmHash("1.1.1.1", salDeAmanha), chaveEmHash("1.1.1.1", sal));
});

test("limite: o sexto envio da hora passa de 5; outra hora recomeça; outro IP conta à parte", async () => {
  const armazem = armazemEmMemoria();
  const ip = "198.51.100.5";
  const hora = new Date("2025-10-09T12:10:00Z");
  const contagens: number[] = [];
  for (let i = 0; i < 6; i++) contagens.push(await contarEnvio(ip, armazem, new Date(hora.getTime() + i * 60_000)));
  assert.deepEqual(contagens, [1, 2, 3, 4, 5, 6]);
  assert.equal(LIMITE_POR_HORA, 5);
  assert.equal(contagens[5] > LIMITE_POR_HORA, true);
  assert.equal(contagens[4] > LIMITE_POR_HORA, false);
  assert.equal(await contarEnvio(ip, armazem, new Date("2025-10-09T13:00:00Z")), 1); // a hora seguinte
  assert.equal(await contarEnvio("198.51.100.6", armazem, hora), 1);
});

test("limite: a janela é a hora cheia em UTC; com 15 minutos, o quarto de hora", () => {
  assert.equal(inicioDaJanela(new Date("2025-10-09T12:59:59.999Z")).toISOString(), "2025-10-09T12:00:00.000Z");
  assert.equal(inicioDaJanela(new Date("2025-10-09T13:00:00.000Z")).toISOString(), "2025-10-09T13:00:00.000Z");
  assert.equal(inicioDaJanela(new Date("2025-10-09T12:44:59Z"), 15).toISOString(), "2025-10-09T12:30:00.000Z");
  assert.equal(diaEmUtc(new Date("2025-10-09T23:59:59Z")), "2025-10-09");
  assert.equal(diaEmUtc(new Date("2025-10-10T00:00:00Z")), "2025-10-10");
});

test("limite: os escopos contam à parte, e a janela de 15 minutos fecha no quarto de hora", async () => {
  const armazem = armazemEmMemoria();
  const ip = "192.0.2.9";
  const t = new Date("2025-10-09T12:20:00Z");
  assert.equal(await contarNaJanela("entrar", ip, 15, armazem, t), 1);
  assert.equal(await contarNaJanela("entrar", ip, 15, armazem, new Date(t.getTime() + 9 * 60_000)), 2); // 12:29, a mesma janela
  assert.equal(await contarNaJanela("entrar", ip, 15, armazem, new Date(t.getTime() + 10 * 60_000)), 1); // 12:30, a seguinte
  assert.equal(await contarEnvio(ip, armazem, t), 1); // o escopo "envio" não herda as tentativas de entrada
});

test("limite: a limpeza apaga o sal dos dias anteriores e as contagens de mais de um dia", async () => {
  const armazem = armazemEmMemoria();
  const ontem = await armazem.salDoDia("2025-10-08");
  const hoje = await armazem.salDoDia("2025-10-09");
  await armazem.somar("antiga", new Date("2025-10-07T10:00:00Z"));
  await armazem.somar("recente", new Date("2025-10-09T02:00:00Z"));
  await armazem.limpar(new Date("2025-10-09T03:00:00Z"));
  assert.notDeepEqual(await armazem.salDoDia("2025-10-08"), ontem); // foi apagado e sorteado de novo
  assert.deepEqual(await armazem.salDoDia("2025-10-09"), hoje); // o de hoje fica
  assert.equal(await armazem.somar("antiga", new Date("2025-10-07T10:00:00Z")), 1); // a contagem antiga recomeça
  assert.equal(await armazem.somar("recente", new Date("2025-10-09T02:00:00Z")), 2); // a recente continua
});

// ---------- a mensagem do e-mail (seção 6) ----------

const CONTEXTO = { servicos, prazoDeResposta: "Resposta em até 1 hora, no horário de funcionamento." };

test("e-mail: o assunto leva o nome do serviço da lista; o texto traz os campos e o prazo, com um ponto só", () => {
  const e = montarEmail({ ...OK, servico: "tosa-maquina" }, CONTEXTO);
  assert.equal(e.assunto, "Contato pelo site: Tosa na máquina");
  assert.equal(
    e.texto,
    [
      "Nome: Maria Souza",
      "Telefone: (21) 90000-0000",
      "E-mail: maria@exemplo.com.br",
      "Serviço: Tosa na máquina",
      "",
      "Quero marcar.",
      "",
      "Prazo de resposta publicado no site: Resposta em até 1 hora, no horário de funcionamento.",
    ].join("\n"),
  );
  assert.equal(e.responderPara, "maria@exemplo.com.br");
});

test("e-mail: sem mensagem, sem telefone, sem e-mail", () => {
  const e = montarEmail({ ...OK, telefone: "", email: "", mensagem: "" }, CONTEXTO);
  assert.match(e.texto, /\(sem mensagem\)/);
  assert.doesNotMatch(e.texto, /Telefone:|E-mail:/);
  assert.equal(e.responderPara, undefined);
});

test("e-mail: nome com quebra de linha e Bcc: não vira cabeçalho nem linha nova", () => {
  const e = montarEmail({ ...OK, nome: "Maria\r\nBcc: roubo@exemplo.com.br", email: "maria@exemplo.com.br" }, CONTEXTO);
  assert.doesNotMatch(e.assunto, /[\r\n]/);
  assert.equal(e.assunto.includes("Bcc"), false); // o assunto não usa o texto digitado
  assert.equal(e.texto.split("\n").some((linha) => linha.startsWith("Bcc:")), false);
  assert.equal(e.texto.split("\n")[0], "Nome: Maria Bcc: roubo@exemplo.com.br");
  assert.doesNotMatch(e.responderPara ?? "", /[\r\n\s]/);
});

test("e-mail: o Reply-To só leva e-mail válido; o serviço fora da lista não compõe", () => {
  assert.equal(montarEmail({ ...OK, email: "isto não é e-mail" }, CONTEXTO).responderPara, undefined);
  assert.throws(() => montarEmail({ ...OK, servico: "x\r\nBcc: a@b.co" }, CONTEXTO), /serviço fora da lista/);
});

// ---------- o que chega do navegador (seções 3.2 e 5.3) ----------

test("campo: só texto, sem espaço nas pontas; a quebra de linha só na mensagem", () => {
  const dados = new FormData();
  dados.append("nome", "  Maria\r\nSouza  ");
  dados.append("mensagem", "  linha 1\r\nlinha 2\rlinha 3  ");
  dados.append("anexo", new File(["conteúdo"], "a.txt"));
  assert.equal(campo(dados, "nome"), "Maria Souza");
  assert.equal(campo(dados, "mensagem", true), "linha 1\nlinha 2\nlinha 3");
  assert.equal(campo(dados, "anexo"), ""); // arquivo no lugar de texto
  assert.equal(campo(dados, "ausente"), "");
});

// ---------- o IP atrás do proxy (seção 5.3) ----------

test("IP: o último do x-forwarded-for, nunca o primeiro; sem ele, o x-real-ip; sem os dois, nulo", () => {
  assert.equal(ipDoVisitante(new Headers({ "x-forwarded-for": "6.6.6.6, 203.0.113.1, 10.0.0.2" })), "10.0.0.2");
  assert.equal(ipDoVisitante(new Headers({ "x-forwarded-for": "203.0.113.1" })), "203.0.113.1");
  assert.equal(ipDoVisitante(new Headers({ "x-real-ip": "203.0.113.9" })), "203.0.113.9");
  assert.equal(ipDoVisitante(new Headers({ "x-forwarded-for": " , " })), null);
  assert.equal(ipDoVisitante(new Headers()), null);
});

test("IP: o loopback que o próprio Next põe no x-forwarded-for (proxy sem o cabeçalho) conta como sem IP; o de uma rede privada, não", () => {
  for (const ip of ["127.0.0.1", "::1", "::ffff:127.0.0.1", "6.6.6.6, 127.0.0.1"]) assert.equal(ipDoVisitante(new Headers({ "x-forwarded-for": ip })), null, ip);
  assert.equal(ipDoVisitante(new Headers({ "x-real-ip": "127.0.0.1" })), null);
  assert.equal(ipDoVisitante(new Headers({ "x-forwarded-for": "127.0.0.1, 203.0.113.1" })), "203.0.113.1");
  assert.equal(ipDoVisitante(new Headers({ "x-forwarded-for": "teste-1-0-0-1" })), "teste-1-0-0-1"); // o IP de teste da qualidade (05-ponta-a-ponta.md)
});

// ---------- a decisão da ação (seção 3.2; proteção da seção 9), sem servidor ----------

type Ambiente = ReturnType<typeof ambiente>;

/** Uma entrega e um armazém novos por teste; a entrega guarda o que recebeu, e o registro guarda os avisos. */
function ambiente(opcoes: { entrega?: (c: Campos) => Promise<void>; armazem?: ArmazemDoLimite } = {}) {
  const entregues: Campos[] = [];
  const avisos: string[] = [];
  const armazem = opcoes.armazem ?? armazemEmMemoria();
  return {
    entregues,
    avisos,
    deps: (agora: Date = AGORA) => ({
      servicos: IDS,
      entrega: opcoes.entrega ?? (async (c: Campos) => void entregues.push(c)),
      armazem,
      avisar: (t: string) => void avisos.push(t),
      agora,
    }),
  };
}

/** O formulário como o navegador o manda: os campos do site, a armadilha vazia e o carimbo emitido em T0. */
function formulario(campos: Partial<Record<string, string | File>> = {}, carimbo = emitirCarimbo(T0)) {
  const dados = new FormData();
  const todos: Record<string, string | File> = { ...OK, carimbo, nao_preencher: "", ...campos };
  for (const [nome, valor] of Object.entries(todos)) dados.append(nome, valor);
  return dados;
}

const enviar = (a: Ambiente, dados: FormData, ip: string | null = "198.51.100.1", agora?: Date) => processarEnvio(dados, ip, a.deps(agora));

test("ação: o envio certo é entregue uma vez, com os campos limpos", async () => {
  const a = ambiente();
  const r = await enviar(a, formulario({ nome: "  Maria Souza  ", mensagem: "  Quero marcar.\r\nObrigada  " }));
  assert.deepEqual(r, { tipo: "enviado" });
  assert.deepEqual(a.entregues, [{ ...OK, mensagem: "Quero marcar.\nObrigada" }]);
});

test("ação: campo-armadilha preenchido finge sucesso e não entrega", async () => {
  const a = ambiente();
  assert.deepEqual(await enviar(a, formulario({ nao_preencher: "http://spam.exemplo" })), { tipo: "descartado" });
  assert.equal(a.entregues.length, 0);
});

test("ação: carimbo forjado, adulterado ou ausente finge sucesso e não entrega", async () => {
  const a = ambiente();
  const [, assinatura] = emitirCarimbo(T0).split(".");
  for (const carimbo of [`${T0 - 1_000_000}.${assinatura}`, "lixo", ""]) {
    assert.deepEqual(await enviar(a, formulario({}, carimbo)), { tipo: "descartado" }, carimbo);
  }
  const semCarimbo = formulario();
  semCarimbo.delete("carimbo");
  assert.deepEqual(await enviar(a, semCarimbo), { tipo: "descartado" });
  assert.equal(a.entregues.length, 0);
});

test("ação: em menos de 3 s pede para conferir, com o mesmo carimbo; a segunda tentativa passa", async () => {
  const a = ambiente();
  const carimbo = emitirCarimbo(T0);
  const rapido = await enviar(a, formulario({}, carimbo), "198.51.100.1", new Date(T0 + 2_000));
  assert.deepEqual(rapido, {
    tipo: "estado",
    estado: { situacao: "corrigir", carimbo, valores: OK, aviso: "Confira os dados e envie de novo." },
  });
  assert.equal(a.entregues.length, 0); // não entrega, e também não descarta em silêncio: a pessoa é avisada
  const segunda = await enviar(a, formulario({}, carimbo), "198.51.100.1", new Date(T0 + 6_000));
  assert.deepEqual(segunda, { tipo: "enviado" });
  assert.equal(a.entregues.length, 1);
});

test("ação: carimbo de mais de 24 h pede para conferir, com carimbo novo e válido", async () => {
  const a = ambiente();
  const depois = new Date(T0 + 24 * 3_600_000 + 1);
  const r = await enviar(a, formulario(), "198.51.100.1", depois);
  assert.equal(r.tipo, "estado");
  if (r.tipo !== "estado") return;
  assert.equal(r.estado.situacao, "corrigir");
  assert.match(r.estado.aviso ?? "", /mais de um dia/);
  assert.deepEqual(r.estado.valores, OK);
  assert.equal(lerCarimbo(r.estado.carimbo, depois.getTime() + 5_000), "valido");
  assert.equal(a.entregues.length, 0);
});

test("ação: campo inválido devolve os erros em texto e os valores, sem entregar", async () => {
  const a = ambiente();
  const r = await enviar(a, formulario({ nome: "", email: "x", telefone: "" }));
  assert.equal(r.tipo, "estado");
  if (r.tipo !== "estado") return;
  assert.equal(r.estado.situacao, "corrigir");
  assert.deepEqual(Object.keys(r.estado.erros ?? {}).sort(), ["email", "nome"]);
  assert.equal(r.estado.valores?.email, "x");
  assert.equal(a.entregues.length, 0);
});

test("ação: o sexto envio da hora, do mesmo IP, mostra o limite; outro IP passa; envio inválido não conta", async () => {
  const a = ambiente();
  for (let i = 0; i < 20; i++) await enviar(a, formulario({ nome: "" }), "198.51.100.1"); // inválidos: não gastam o limite
  const resultados = [];
  for (let i = 0; i < 6; i++) resultados.push(await enviar(a, formulario(), "198.51.100.1"));
  assert.deepEqual(resultados.slice(0, 5), Array(5).fill({ tipo: "enviado" }));
  const sexto = resultados[5];
  assert.equal(sexto.tipo === "estado" && sexto.estado.situacao, "limite");
  assert.equal(a.entregues.length, 5);
  assert.deepEqual(await enviar(a, formulario(), "198.51.100.2"), { tipo: "enviado" });
  const depois = await enviar(a, formulario(), "198.51.100.1", new Date(AGORA.getTime() + 3_600_000)); // a hora seguinte
  assert.deepEqual(depois, { tipo: "enviado" });
});

test("ação: sem IP, não limita, entrega e deixa o aviso no registro", async () => {
  const a = ambiente();
  for (let i = 0; i < 7; i++) assert.deepEqual(await enviar(a, formulario(), null), { tipo: "enviado" });
  assert.equal(a.entregues.length, 7);
  assert.equal(a.avisos.length, 7);
  assert.match(a.avisos[0], /x-forwarded-for/);
});

test("ação: a entrega que falha devolve 'falhou' com os valores, e o erro vai ao registro", async () => {
  const a = ambiente({ entrega: async () => { throw new Error("SMTP simulado fora do ar"); } });
  const r = await enviar(a, formulario());
  assert.equal(r.tipo === "estado" && r.estado.situacao, "falhou");
  assert.deepEqual(r.tipo === "estado" && r.estado.valores, OK);
  assert.match(a.avisos.join("\n"), /SMTP simulado fora do ar/);
});

test("ação: o armazém do limite que falha (o banco fora do ar) devolve 'falhou', sem entregar e sem perder o que foi escrito", async () => {
  const quebrado: ArmazemDoLimite = { salDoDia: async () => { throw new Error("banco fora do ar"); }, somar: async () => 1, limpar: async () => {} };
  const a = ambiente({ armazem: quebrado });
  const r = await enviar(a, formulario());
  assert.equal(r.tipo === "estado" && r.estado.situacao, "falhou");
  assert.deepEqual(r.tipo === "estado" && r.estado.valores, OK);
  assert.equal(a.entregues.length, 0);
});

test("ataque: campo como arquivo, campo repetido, quebra de linha e Bcc no nome, 10.000 caracteres", async () => {
  const a = ambiente();

  const comArquivo = await enviar(a, formulario({ nome: new File(["Maria"], "nome.txt") }));
  assert.equal(comArquivo.tipo === "estado" && comArquivo.estado.erros?.nome, "Escreva o nome."); // arquivo não é texto

  const repetido = formulario();
  repetido.append("nome", "Intruso"); // o primeiro vale
  assert.deepEqual(await enviar(a, repetido), { tipo: "enviado" });
  assert.equal(a.entregues.at(-1)?.nome, "Maria Souza");

  assert.deepEqual(await enviar(a, formulario({ nome: "Maria\r\nBcc: roubo@exemplo.com.br" })), { tipo: "enviado" });
  assert.equal(a.entregues.at(-1)?.nome, "Maria Bcc: roubo@exemplo.com.br"); // a quebra virou espaço
  assert.doesNotMatch(a.entregues.at(-1)?.email ?? "", /[\r\n]/);

  const longa = await enviar(a, formulario({ mensagem: "a".repeat(10_000) }));
  assert.equal(longa.tipo === "estado" && longa.estado.erros?.mensagem, "A mensagem passa de 2.000 caracteres.");
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

test("fronteira: nenhum arquivo de navegador importa, como valor, código de servidor do formulário", () => {
  const raiz = fileURLToPath(new URL("..", import.meta.url));
  const servidor = /(?:^|\/)lib\/(?:formulario\/(?:carimbo|entrada|limite|limite-mysql|processar|destino|destino\.producao|email|mensagem)|banco)(?:\.ts)?$/;
  const importacao = /^\s*import\s+(type\s+)?(?:[^"';]*?\sfrom\s*)?["']([^"']+)["']/gm;
  const clientes = ["components", "app"].flatMap((p) => arquivos(join(raiz, p))).filter((f) => /^["']use client["']/.test(readFileSync(f, "utf8").trimStart()));
  assert.ok(clientes.length > 0, "nenhuma ilha encontrada: o teste procura no lugar errado");
  for (const arquivo of clientes) {
    for (const [, soTipo, de] of readFileSync(arquivo, "utf8").matchAll(importacao)) {
      if (soTipo) continue; // import type some na compilação
      assert.equal(servidor.test(de) || de.startsWith("node:") || de === "server-only", false, `${arquivo} importa ${de}`);
    }
  }
});

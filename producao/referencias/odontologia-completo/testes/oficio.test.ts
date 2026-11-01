// testes/oficio.test.ts — os testes de unidade das funcionalidades do ofício (a clínica odontológica): a mensagem do pedido
// de avaliação, o relógio de Niterói, o estado ao vivo da clínica e a geometria do mapa dos dentes
// (producao/qualidade/04-unidade.md, seções 2 e 4.3). Datas fixas e explícitas: nunca `new Date()` sem argumento.
// Os arquivos testados importam valores só por caminho relativo e com a extensão.
import assert from "node:assert/strict";
import { describe, it, test } from "node:test";
import { agoraEmNiteroi } from "../lib/agora.ts";
import { AREAS, FAIXAS, ALTURA, LARGURA, contornoDoDente, dentes, faixaDaRegiao } from "../lib/oficio/dentes.ts";
import { estadoDaClinica } from "../lib/oficio/estado-da-clinica.ts";
import { mensagemDaAvaliacao, mensagemDoTratamento } from "../lib/oficio/pedido-de-avaliacao.ts";
import { expediente, fechamentos, urgencia } from "../conteudo/negocio.ts";
import { equipe } from "../conteudo/clinica.ts";
import { regioes, tratamentos } from "../conteudo/tratamentos.ts";

describe("pedido de avaliação: a mensagem", () => {
  it("sem escolha nenhuma, só o pedido", () => assert.equal(mensagemDaAvaliacao({}), "Olá. Gostaria de marcar uma avaliação."));
  it("com atendimento e região", () =>
    assert.equal(
      mensagemDaAvaliacao({ atendimento: "limpeza", regiao: "dentes do fundo, arcada inferior" }),
      "Olá. Gostaria de marcar uma avaliação. Atendimento: limpeza. Região: dentes do fundo, arcada inferior.",
    ));
  it("com tudo: a última visita e o período em minúsculas", () =>
    assert.equal(
      mensagemDaAvaliacao({ atendimento: "urgência", regiao: "dentes da frente, arcada superior", ultimaVisita: "Há mais de 1 ano", periodo: "Manhã" }),
      "Olá. Gostaria de marcar uma avaliação. Atendimento: urgência. Região: dentes da frente, arcada superior. Última visita ao dentista: há mais de 1 ano. Período: manhã.",
    ));
  it("o tratamento vai direto da página dele", () => assert.equal(mensagemDoTratamento("coroa"), "Olá. Gostaria de marcar uma avaliação. Atendimento: coroa."));
  it("nunca leva sintoma nem dado pessoal: só os campos da lista", () => {
    const m = mensagemDaAvaliacao({ atendimento: "avaliação de rotina" });
    assert.doesNotMatch(m, /dor|sangr|nome|telefone|cpf/i);
  });
});

describe("relógio de Niterói", () => {
  it("um instante em UTC que já é sábado em UTC e ainda é sexta em São Paulo", () =>
    assert.deepEqual(agoraEmNiteroi(new Date("2026-10-10T02:30:00Z")), { data: "2026-10-09", dia: 5, minutos: 23 * 60 + 30 }));
  it("meio-dia de segunda", () => assert.deepEqual(agoraEmNiteroi(new Date("2026-10-12T15:00:00Z")), { data: "2026-10-12", dia: 1, minutos: 12 * 60 }));
});

describe("estado da clínica (expediente do briefing: seg. a qui. 8h–12h e 13h30–18h; sex. até 17h; sáb. 8h–12h)", () => {
  const h = (hora: number, minuto = 0) => hora * 60 + minuto;
  const estado = (data: string, dia: 0 | 1 | 2 | 3 | 4 | 5 | 6, minutos: number) => estadoDaClinica({ data, dia, minutos }, expediente, fechamentos, urgencia);

  it("terça às 10h: aberto, fecha às 12h e reabre às 13h30; a urgência de hoje ainda vale", () => {
    const e = estado("2026-10-13", 2, h(10));
    assert.equal(e.aberto, true);
    assert.equal(e.linha, "Aberto agora, fecha às 12h e reabre às 13h30");
    assert.equal(e.urgencia, "Urgência de hoje: avise até as 16h.");
  });
  it("terça às 12h (a fronteira): fechado para o almoço, abre às 13h30", () => assert.equal(estado("2026-10-13", 2, h(12)).linha, "Fechado agora, abre às 13h30"));
  it("terça às 11h59: ainda aberto", () => assert.equal(estado("2026-10-13", 2, h(11, 59)).aberto, true));
  it("terça às 15h: aberto até as 18h, sem reabertura; a urgência de hoje vale até as 16h", () => {
    const e = estado("2026-10-13", 2, h(15));
    assert.equal(e.linha, "Aberto agora, fecha às 18h");
    assert.equal(e.urgencia, "Urgência de hoje: avise até as 16h.");
  });
  it("terça às 16h: a urgência deixa de ser de hoje", () => assert.match(estado("2026-10-13", 2, h(16)).urgencia, /^Urgência: encaixe de segunda a sexta/));
  it("sexta às 17h: fechado (a sexta fecha mais cedo), abre sábado", () => assert.equal(estado("2026-10-16", 5, h(17)).linha, "Fechado agora, abre amanhã, 8h"));
  it("sábado às 12h: fechado, abre segunda", () => assert.equal(estado("2026-10-17", 6, h(12)).linha, "Fechado agora, abre segunda, 8h"));
  it("sábado às 10h: aberto até as 12h; a urgência não é de hoje (só de segunda a sexta)", () => {
    const e = estado("2026-10-17", 6, h(10));
    assert.equal(e.linha, "Aberto agora, fecha às 12h");
    assert.match(e.urgencia, /^Urgência: encaixe de segunda a sexta/);
  });
  it("domingo: fechado o dia todo, abre amanhã", () => assert.equal(estado("2026-10-18", 0, h(11)).linha, "Fechado agora, abre amanhã, 8h"));
  it("segunda às 6h59, antes de abrir: fechado, abre hoje às 8h; a urgência de hoje ainda vale", () => {
    const e = estado("2026-10-19", 1, h(6, 59));
    assert.equal(e.linha, "Fechado agora, abre às 8h");
    assert.equal(e.urgencia, "Urgência de hoje: avise até as 16h.");
  });
  it("feriado em dia útil (segunda, 12.10.2026): fechado, sem 'aberto agora', abre amanhã; sem urgência de hoje", () => {
    const e = estado("2026-10-12", 1, h(10));
    assert.equal(e.aberto, false);
    assert.equal(e.linha, "Fechado agora, abre amanhã, 8h");
    assert.match(e.urgencia, /^Urgência: encaixe de segunda a sexta/);
  });
  it("a véspera de um feriado: a abertura de amanhã não vale (sexta 09.10 fechou; sábado abre)", () =>
    assert.equal(estado("2026-10-09", 5, h(20)).linha, "Fechado agora, abre amanhã, 8h"));
  it("o último dia útil antes de um feriado seguido de domingo (sexta 20.11 é feriado: quinta às 19h abre segunda)", () => {
    // quinta 19.11 às 19h: sexta 20.11 é feriado nacional, sábado 21.11 abre.
    assert.equal(estado("2026-11-19", 4, h(19)).linha, "Fechado agora, abre sábado, 8h");
  });
});

describe("mapa dos dentes: a geometria", () => {
  it("32 dentes, notação FDI de 11 a 18, 21 a 28, 31 a 38 e 41 a 48, sem repetir", () => {
    assert.equal(dentes.length, 32);
    const fdi = new Set(dentes.map((d) => d.fdi));
    assert.equal(fdi.size, 32);
    for (const q of [1, 2, 3, 4]) for (let i = 1; i <= 8; i++) assert.ok(fdi.has(q * 10 + i), `falta o dente ${q * 10 + i}`);
  });
  it("cada região tem os dentes certos: 6 da frente e 10 do fundo, por arcada", () => {
    const contar = (r: string) => dentes.filter((d) => d.regiao === r).length;
    assert.deepEqual(
      regioes.map((r) => contar(r.id)),
      [6, 10, 6, 10],
    );
  });
  it("a frente vai do canino ao canino: 13 a 23 em cima; 33 a 43 embaixo", () => {
    const fdi = (r: string) => dentes.filter((d) => d.regiao === r).map((d) => d.fdi).sort((a, b) => a - b);
    assert.deepEqual(fdi("frente-superior"), [11, 12, 13, 21, 22, 23]);
    assert.deepEqual(fdi("frente-inferior"), [31, 32, 33, 41, 42, 43]);
  });
  it("tudo cabe no desenho, números inclusive", () => {
    for (const d of dentes) {
      for (const [x, y] of [[d.x, d.y], [d.numero.x, d.numero.y]]) {
        assert.ok(x >= 6 && x <= LARGURA - 6, `x fora do desenho no dente ${d.fdi}: ${x}`);
        assert.ok(y >= 6 && y <= ALTURA - 6, `y fora do desenho no dente ${d.fdi}: ${y}`);
      }
      assert.ok(d.largura > 8 && d.profundidade > 8, `dente ${d.fdi} pequeno demais para tocar`);
    }
  });
  it("o desenho é simétrico: o dente 11 e o 21 se espelham", () => {
    const a = dentes.find((d) => d.fdi === 11)!;
    const b = dentes.find((d) => d.fdi === 21)!;
    assert.ok(Math.abs(a.x + b.x - LARGURA) < 0.3 && Math.abs(a.y - b.y) < 0.3);
  });
  it("as faixas e as áreas de toque existem para as quatro regiões, e a margem alarga a faixa", () => {
    for (const r of regioes) {
      assert.match(FAIXAS[r.id], /^M[\d.\s-]+L/);
      assert.ok(AREAS[r.id].length > 100);
      assert.ok(FAIXAS[r.id].length >= AREAS[r.id].length - 20);
    }
    assert.notEqual(faixaDaRegiao("fundo-superior", 3), faixaDaRegiao("fundo-superior"));
  });
  it("o fundo tem dois trechos (um por lado); a frente, um", () => {
    assert.equal(FAIXAS["fundo-inferior"].split("M").length - 1, 2);
    assert.equal(FAIXAS["frente-superior"].split("M").length - 1, 1);
  });
  it("o canino é um escudo (ponta para fora) e o incisivo, um retângulo de cantos arredondados", () => {
    const canino = dentes.find((d) => d.tipo === "canino")!;
    const incisivo = dentes.find((d) => d.tipo === "incisivo")!;
    assert.match(contornoDoDente(canino), /C/);
    assert.match(contornoDoDente(incisivo), /Q/);
  });
});

describe("conteúdo: a coerência dos dados", () => {
  test("todo tratamento aponta para regiões e para um dentista que existem", () => {
    const ids = new Set(regioes.map((r) => r.id));
    for (const t of tratamentos) {
      assert.ok(t.regioes.length > 0 && t.regioes.every((r) => ids.has(r)), `regiões do ${t.id}`);
      const dentista = equipe.find((d) => d.id === t.quem);
      assert.ok(dentista, `dentista do ${t.id}`);
      assert.ok(dentista.atende.includes(t.id), `${dentista.nome} atende ${t.id}, e a ficha diz o mesmo`);
    }
  });
  test("a ficha de cada dentista só lista tratamentos que ele faz, e todo tratamento tem quem o faça", () => {
    for (const d of equipe) for (const id of d.atende) assert.equal(tratamentos.find((t) => t.id === id)?.quem, d.id);
    for (const t of tratamentos) assert.ok(equipe.some((d) => d.atende.includes(t.id)));
  });
  test("o título de especialista só vem com o registro: Endodontia e Ortodontia, e nenhum outro", () => {
    assert.deepEqual(
      equipe.filter((d) => d.titulo.startsWith("Especialista")).map((d) => d.titulo),
      ["Especialista em Endodontia", "Especialista em Ortodontia"],
    );
  });
  test("nenhum valor, cifrão, parcelamento, gratuidade ou forma de pagamento no conteúdo (Código de Ética, art. 44, I)", () => {
    const texto = JSON.stringify([tratamentos, equipe]);
    assert.doesNotMatch(texto, /R\$|\bparcel|\bgr[aá]tis\b|\bgratuit|\bpix\b|\bboleto\b|cart[aã]o de/i);
  });
  test("o expediente do briefing: duas faixas de segunda a quinta, a sexta mais curta, o sábado de manhã, o domingo fechado", () => {
    assert.equal(expediente[1].length, 2);
    assert.equal(expediente[5][1].fecha, "17:00");
    assert.deepEqual(expediente[6], [{ abre: "08:00", fecha: "12:00" }]);
    assert.deepEqual(expediente[0], []);
  });
});

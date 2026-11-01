// testes/lib.test.ts — os testes de unidade das funções puras de lib/ (producao/qualidade/04-unidade.md).
// Rodam no node:test, com a remoção de tipos do Node, sem dependência: `npm test`. Por isso, os
// módulos testados importam valores só por caminho relativo (o apelido @/ só em `import type`).
import assert from "node:assert/strict";
import { test } from "node:test";
import { negocio } from "../conteudo/negocio.ts";
import { decodificarAncora } from "../lib/ancoras.ts";
import { cnpjValido } from "../lib/cnpj.ts";
import { dadosDaCapa } from "../lib/dados-estruturados.ts";
import { faixasEmTexto, hora, horarioResumido } from "../lib/horario.ts";
import { textoDoLlms } from "../lib/llms.ts";
import { duracao, reais } from "../lib/moeda.ts";
import { telefoneVisivel, vinculoDoWhatsapp } from "../lib/whatsapp.ts";

test("WhatsApp: número com máscara vira só algarismos", () => {
  assert.equal(vinculoDoWhatsapp("+55 (21) 90000-0000"), "https://wa.me/5521900000000");
});

test("WhatsApp: número curto ou sem o 55 para o build", () => {
  assert.throws(() => vinculoDoWhatsapp("21900000000"));
  assert.throws(() => vinculoDoWhatsapp("55219000"));
});

test("WhatsApp: a mensagem vai codificada (acento, quebra de linha, &)", () => {
  const v = vinculoDoWhatsapp("5521900000000", "Olá & até já\nObrigado");
  assert.equal(v, "https://wa.me/5521900000000?text=Ol%C3%A1%20%26%20at%C3%A9%20j%C3%A1%0AObrigado");
});

test("telefone visível: celular e fixo", () => {
  assert.equal(telefoneVisivel("5521900000000"), "(21)\u00a090000-0000");
  assert.equal(telefoneVisivel("552133334444"), "(21)\u00a03333-4444");
});

test("âncora: decodificada, e a malformada não derruba a página", () => {
  assert.equal(decodificarAncora("#duvida-2"), "duvida-2");
  assert.equal(decodificarAncora("#%C3%A1"), "á");
  assert.equal(decodificarAncora("#%E0"), "");
});

test("horário: 7h e não 07h; 18h30; almoço; fechado", () => {
  assert.equal(hora("07:00"), "7h");
  assert.equal(hora("18:30"), "18h30");
  assert.equal(faixasEmTexto([{ abre: "08:00", fecha: "12:00" }, { abre: "14:00", fecha: "18:00" }]), "8h às 12h e 14h às 18h");
  assert.equal(faixasEmTexto([]), "Fechado");
});

test("horário resumido: dias seguidos iguais se juntam", () => {
  const util = [{ abre: "08:00", fecha: "18:00" }];
  const r = horarioResumido({ 0: [], 1: util, 2: util, 3: util, 4: util, 5: util, 6: [{ abre: "08:00", fecha: "14:00" }] });
  assert.equal(r, "Segunda a sexta, 8h às 18h; Sábado, 8h às 14h; Domingo: fechado");
});

test("moeda: R$ sem centavos quando inteiro; duração", () => {
  assert.equal(reais(50).replace(/\s/g, " "), "R$ 50");
  assert.equal(reais(49.9).replace(/\s/g, " "), "R$ 49,90");
  assert.equal(duracao(90), "1h30");
  assert.equal(duracao(60), "1h");
  assert.equal(duracao(45), "45 min");
});

test("CNPJ: numérico e alfanumérico (desde 31.07.2026)", () => {
  assert.equal(cnpjValido("11.222.333/0001-81"), true);
  assert.equal(cnpjValido("11.222.333/0001-80"), false);
  assert.equal(cnpjValido("00.000.000/E08G-12"), true); // o primeiro alfanumérico emitido
  assert.equal(cnpjValido("00.000.000/e08g-12"), true);
  assert.equal(cnpjValido("00.000.000/E08G-13"), false);
  assert.equal(cnpjValido("11.111.111/1111-11"), false);
  assert.equal(cnpjValido(""), false);
});

test("llms.txt: no exemplo, só o nome e o selo; no cliente, o contato e as páginas pelo canônico, as legais em Optional", () => {
  // A base de fábrica é o exemplo: nada do que é noindex ou fictício (o contato, as páginas).
  assert.match(textoDoLlms("/"), /^# Banho e Tosa Fonseca\n\n> Estabelecimento fictício, criado pela Atlas Digital[^\n]*\n$/);
  negocio.exemplo = false;
  try {
    const estatico = textoDoLlms("/");
    assert.match(estatico, /^# Banho e Tosa Fonseca\n\n> Banho, tosa/);
    assert.doesNotMatch(estatico, /fictício/);
    assert.match(estatico, /- Endereço: Alameda São Boaventura/);
    assert.match(estatico, /\(https:\/\/exemplo\.com\.br\/servicos\/\)/);
    assert.match(textoDoLlms(""), /\(https:\/\/exemplo\.com\.br\/servicos\)/);
    assert.match(estatico, /## Optional\n\n- \[Aviso de privacidade\]/);
  } finally {
    negocio.exemplo = true;
  }
});

test("JSON-LD da capa: WebSite e o negócio num grafo, ligados pelo @id", () => {
  const [site, negocio] = dadosDaCapa["@graph"];
  assert.equal(site["@type"], "WebSite");
  assert.equal(site.publisher?.["@id"], negocio["@id"]);
  assert.equal(negocio["@id"], "https://exemplo.com.br/#negocio");
});

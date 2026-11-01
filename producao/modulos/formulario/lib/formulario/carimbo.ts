// lib/formulario/carimbo.ts — o carimbo de tempo assinado: o instante em que a página foi pedida e a assinatura dele
// (HMAC-SHA256 com o segredo do servidor). Sem cookie e sem banco: a assinatura prova que o carimbo veio do servidor
// (producao/esteira/14-funcionalidades/02-formulario.md, seção 5.2). Só node:crypto.
//
// Sem `import "server-only"`: o teste de unidade importa este arquivo no Node, que não resolve esse pacote. Quem o
// importa é só código de servidor (a página, a ação); o teste de fronteira (testes/formulario.test.ts) confere que
// nenhuma ilha o importa.
import { createHmac, timingSafeEqual } from "node:crypto";

export const MINIMO_MS = 3_000; // ninguém lê e preenche o formulário em menos de 3 s (PROPOSTA)
export const MAXIMO_MS = 24 * 60 * 60 * 1000;

function assinar(emitido: string) {
  const segredo = process.env.SEGREDO_DO_FORMULARIO;
  if (!segredo) throw new Error("SEGREDO_DO_FORMULARIO ausente");
  return createHmac("sha256", segredo).update(emitido).digest("base64url");
}

/** O carimbo que a página põe no formulário: o instante da emissão e a assinatura dele. */
export function emitirCarimbo(agora = Date.now()) {
  const emitido = String(agora);
  return `${emitido}.${assinar(emitido)}`;
}

export function lerCarimbo(carimbo: string, agora = Date.now()): "valido" | "forjado" | "rapido" | "vencido" {
  const [emitido = "", assinatura = ""] = carimbo.split(".");
  if (!/^\d{13}$/.test(emitido)) return "forjado";
  const esperada = Buffer.from(assinar(emitido));
  const recebida = Buffer.from(assinatura);
  // O timingSafeEqual exige o mesmo comprimento; comparar em tempo constante não revela quantos caracteres batem.
  if (recebida.length !== esperada.length || !timingSafeEqual(recebida, esperada)) return "forjado";
  const idade = agora - Number(emitido);
  if (idade < MINIMO_MS) return "rapido"; // inclui o relógio adiantado (idade negativa)
  if (idade > MAXIMO_MS) return "vencido";
  return "valido";
}

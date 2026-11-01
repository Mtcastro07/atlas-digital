// lib/agenda/codigo.ts — os códigos que vão no e-mail ou no cookie e só se guardam em hash: o de cancelamento (128 bits)
// e o da sessão do painel (256 bits). Quem lê o banco não consegue cancelar uma reserva nem entrar no painel
// (producao/esteira/14-funcionalidades/05-agenda.md, seções 3, 8 e 9). Só node:crypto.
import { createHash, randomBytes } from "node:crypto";

/** Um código aleatório em base64url: 16 bytes dão 22 caracteres (cancelamento); 32 bytes, 43 (sessão). */
export function novoCodigo(bytes = 16) {
  return randomBytes(bytes).toString("base64url");
}

/** SHA-256 do código: os 32 bytes que o banco guarda (BINARY(32)). */
export function hashDoCodigo(codigo: string) {
  return createHash("sha256").update(codigo).digest();
}

/** O formato do código de cancelamento: o que não bate nem chega ao banco. */
export const ehCodigoDeCancelamento = (texto: string) => /^[A-Za-z0-9_-]{22}$/.test(texto);

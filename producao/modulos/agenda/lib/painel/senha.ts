// lib/painel/senha.ts — a senha do dono, guardada com o scrypt do próprio Node, sem dependência (producao/esteira/14-funcionalidades/05-agenda.md,
// seção 9). Os parâmetros são os da OWASP (Password Storage Cheat Sheet): N = 2^17, r = 8, p = 1, 128 MiB por conferência.
// O argon2id seria a primeira escolha da OWASP, mas pede dependência com código nativo. Só node:crypto.
// Sem `import "server-only"` (o teste de unidade importa este arquivo no Node); só a ação de entrar o usa.
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

export type Custo = { N: number; r: number; p: number };
/** OWASP; com pouca memória no web app: { N: 2 ** 15, r: 8, p: 3 }, 32 MiB (a tabela da OWASP dá o equivalente). */
export const CUSTO: Custo = { N: 2 ** 17, r: 8, p: 1 };
const TAMANHO = 64;

function derivar(senha: string, sal: Buffer, c: Custo) {
  return new Promise<Buffer>((ok, falha) =>
    scrypt(senha.normalize("NFC"), sal, TAMANHO, { ...c, maxmem: 256 * 1024 * 1024 }, (erro, chave) => (erro ? falha(erro) : ok(chave))),
  );
}

/** "scrypt$N$r$p$sal$hash": o custo vai junto, e trocar o custo não invalida as senhas já guardadas. */
export async function guardarSenha(senha: string, custo: Custo = CUSTO) {
  const sal = randomBytes(16);
  const hash = await derivar(senha, sal, custo);
  return ["scrypt", custo.N, custo.r, custo.p, sal.toString("base64url"), hash.toString("base64url")].join("$");
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

/**
 * Na entrada: com e-mail inexistente, confere contra uma senha fictícia, e a resposta leva o mesmo tempo. Sem isso,
 * não haveria scrypt a calcular, a resposta voltaria centenas de milissegundos antes, e o tempo diria quais e-mails
 * existem (OWASP, Authentication Cheat Sheet, "Authentication Responses").
 */
let ficticia: Promise<string> | undefined;
export async function conferirEntrada(senha: string, guardada: string | undefined) {
  ficticia ??= guardarSenha(randomBytes(16).toString("base64url"));
  const certa = await conferirSenha(senha, guardada ?? (await ficticia));
  return guardada !== undefined && certa;
}

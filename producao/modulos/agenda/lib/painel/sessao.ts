// lib/painel/sessao.ts — a sessão do painel do dono: um código aleatório de 256 bits no cookie, só o hash no banco
// (producao/esteira/14-funcionalidades/05-agenda.md, seção 9). É o único cookie do site, e só existe na área restrita:
// o Path=/painel o impede de ir ao site público. Sem dependência; só node:crypto, por codigo.ts.
import { hashDoCodigo, novoCodigo } from "../agenda/codigo.ts";
import type { Repositorio } from "../agenda/tipos.ts";

export const NOME_DO_COOKIE = "__Secure-sessao";
export const DURACAO_DA_SESSAO_S = 12 * 3600;

/**
 * Os atributos do cookie. Os mesmos na criação e na saída: o cookie apagado com outro Path o navegador mantém, e um
 * `Set-Cookie` de nome __Secure- sem Secure ele recusa.
 */
export const ATRIBUTOS_DO_COOKIE = { httpOnly: true, secure: true, sameSite: "lax", path: "/painel" } as const;

/** A sessão nova a cada entrada: devolve o código que vai para o cookie. */
export async function abrirSessao(repo: Repositorio, donoId: number, agora: Date) {
  const codigo = novoCodigo(32);
  await repo.criarSessao(hashDoCodigo(codigo), donoId, new Date(agora.getTime() + DURACAO_DA_SESSAO_S * 1000));
  return codigo;
}

/** O dono da sessão, ou nulo: sem cookie, com código inventado ou vencido. */
export async function donoDaSessao(repo: Repositorio, codigo: string | undefined, agora: Date) {
  if (!codigo) return null;
  return repo.donoDaSessao(hashDoCodigo(codigo), agora);
}

/** Na saída, a sessão sai do banco (o cookie sai na ação, com os mesmos atributos). */
export async function fecharSessao(repo: Repositorio, codigo: string | undefined) {
  if (codigo) await repo.apagarSessao(hashDoCodigo(codigo));
}

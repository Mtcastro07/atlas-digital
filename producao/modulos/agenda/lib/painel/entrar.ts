// lib/painel/entrar.ts — a entrada no painel do dono (producao/esteira/14-funcionalidades/05-agenda.md, seção 9; producao/qualidade/09-seguranca-e-privacidade.md,
// seção 5): limite de 5 tentativas a cada 15 minutos, por e-mail e por IP, os dois em hash, na tabela do formulário;
// a mesma resposta e o mesmo tempo para e-mail inexistente e senha errada (conferirEntrada); sessão nova a cada entrada.
// Sem dependência; o limite é o de lib/formulario/limite.ts.
import type { Repositorio } from "../agenda/tipos.ts";
import { contarNaJanela } from "../formulario/limite.ts";
import type { ArmazemDoLimite } from "../formulario/limite.ts";
import { conferirEntrada } from "./senha.ts";
import { abrirSessao } from "./sessao.ts";

export const TENTATIVAS_POR_JANELA = 5;
export const JANELA_DE_TENTATIVAS_MIN = 15;
/** Senha maior que isto nem vai ao scrypt: ninguém tem uma, e o servidor não calcula o que um robô mandar. */
const SENHA_MAIOR = 256;

export type ResultadoDaEntrada = { tipo: "ok"; codigo: string } | { tipo: "recusada" } | { tipo: "limite" };

export async function entrar(d: { repo: Repositorio; armazem: ArmazemDoLimite; email: string; senha: string; ip: string | null; agora?: Date }): Promise<ResultadoDaEntrada> {
  const agora = d.agora ?? new Date();
  const email = d.email.trim().toLowerCase();

  // Conta antes de conferir: a tentativa gasta o limite, acerte ou erre. Sem IP, o limite por e-mail ainda vale.
  const porEmail = await contarNaJanela("entrar-email", email, JANELA_DE_TENTATIVAS_MIN, d.armazem, agora);
  const porIp = d.ip ? await contarNaJanela("entrar-ip", d.ip, JANELA_DE_TENTATIVAS_MIN, d.armazem, agora) : 0;
  if (porEmail > TENTATIVAS_POR_JANELA || porIp > TENTATIVAS_POR_JANELA) return { tipo: "limite" };

  // E-mail inexistente e senha errada: a mesma resposta, e o scrypt roda nos dois casos.
  const dono = email ? await d.repo.donoPorEmail(email) : null;
  const senhaPossivel = d.senha.length <= SENHA_MAIOR;
  const certa = await conferirEntrada(senhaPossivel ? d.senha : "", dono?.senha);
  if (!dono || !certa || !senhaPossivel) return { tipo: "recusada" };
  return { tipo: "ok", codigo: await abrirSessao(d.repo, dono.id, agora) };
}

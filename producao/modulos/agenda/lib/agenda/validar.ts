// lib/agenda/validar.ts — as regras dos campos do pedido de reserva (producao/esteira/14-funcionalidades/05-agenda.md, seções 4 e 5).
// Puro e sem dependência: a ilha valida ao sair do campo e a ação valida de novo no servidor. O e-mail é obrigatório (é o
// canal da confirmação, do lembrete e do cancelamento); o telefone, opcional. O e-mail e o telefone seguem as regras do
// formulário (lib/formulario/validar.ts): a Agenda precisa deste arquivo do formulário.
import { emailValido, lerTelefone } from "../formulario/validar.ts";

export type CamposDaReserva = {
  nome: string;
  email: string;
  telefone: string;
  servico: string;
  profissional: string;
  inicio: string;
  /** "sim" quando a caixa de consentimento foi marcada (só existe onde a casa a configura: ConfigDaAgenda.consentimento). */
  consentimento?: string;
};
export type ErrosDaReserva = Partial<Record<keyof CamposDaReserva, string>>;

/** O instante do horário escolhido, como o valor dos rádios o traz: "2026-10-09T17:30:00.000Z". */
const INSTANTE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:00\.000Z$/;

export function lerInstante(texto: string) {
  if (!INSTANTE.test(texto)) return null;
  const instante = new Date(texto);
  return Number.isNaN(instante.getTime()) || instante.toISOString() !== texto ? null : instante;
}

/** As regras; com `exigirConsentimento` (a caixa da psicologia), a caixa marcada também é obrigatória. */
export function validarReserva(c: CamposDaReserva, exigirConsentimento = false): ErrosDaReserva {
  const erros: ErrosDaReserva = {};
  if (c.nome.length < 2) erros.nome = "Escreva o nome.";
  else if (c.nome.length > 80) erros.nome = "O nome passa de 80 caracteres.";
  if (!c.email) erros.email = "Informe o e-mail: a confirmação e o vínculo de cancelamento vão por ele.";
  else if (!emailValido(c.email)) erros.email = "E-mail no formato nome@exemplo.com.br.";
  if (c.telefone && !lerTelefone(c.telefone)) erros.telefone = "Telefone com DDD, como (21) 90000-0000.";
  if (!/^\d{1,9}$/.test(c.servico)) erros.servico = "Escolha o serviço.";
  if (c.profissional !== "qualquer" && !/^\d{1,9}$/.test(c.profissional)) erros.profissional = "Escolha o profissional.";
  if (!lerInstante(c.inicio)) erros.inicio = "Escolha o horário.";
  if (exigirConsentimento && c.consentimento !== "sim") erros.consentimento = "Marque a caixa para concordar com o uso dos dados.";
  return erros;
}

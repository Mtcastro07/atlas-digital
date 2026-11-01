// lib/formulario/mensagem.ts — o e-mail que o formulário entrega, composto sem dependência: assunto, texto e Reply-To
// (producao/esteira/14-funcionalidades/02-formulario.md, seção 6). O envio em si é de email.ts (com o nodemailer); a composição fica aqui para o teste de unidade provar o que a seção 6 promete: só texto, o assunto com o
// nome do serviço da lista do site (nunca o texto digitado) e nada do visitante num cabeçalho com quebra de linha.
import { emailValido } from "./validar.ts";
import type { Campos } from "./validar.ts";

export type EmailPronto = { assunto: string; texto: string; responderPara?: string };
export type Contexto = {
  servicos: readonly { id: string; nome: string }[];
  /** O prazo publicado no site (conteudo/negocio.ts): uma frase, com ou sem ponto final. */
  prazoDeResposta: string;
};

/** Texto de uma linha só: a quebra vira espaço. Cabeçalho de e-mail com quebra de linha seria injeção. */
const umaLinha = (texto: string) => texto.replace(/[\r\n]+/g, " ");

export function montarEmail(c: Campos, contexto: Contexto): EmailPronto {
  const servico = contexto.servicos.find((s) => s.id === c.servico);
  if (!servico) throw new Error(`serviço fora da lista: ${JSON.stringify(c.servico)}`);
  const nomeDoServico = umaLinha(servico.nome);

  const linhas = [`Nome: ${umaLinha(c.nome)}`];
  if (c.telefone) linhas.push(`Telefone: ${umaLinha(c.telefone)}`);
  if (c.email) linhas.push(`E-mail: ${umaLinha(c.email)}`);
  linhas.push(
    `Serviço: ${nomeDoServico}`,
    "",
    c.mensagem || "(sem mensagem)",
    "",
    `Prazo de resposta publicado no site: ${umaLinha(contexto.prazoDeResposta).replace(/\.+$/, "")}.`,
  );

  return {
    assunto: `Contato pelo site: ${nomeDoServico}`,
    texto: linhas.join("\n"),
    // O Reply-To só leva o e-mail que passou na validação: responder ao e-mail responde à pessoa.
    responderPara: c.email && emailValido(c.email) ? c.email : undefined,
  };
}

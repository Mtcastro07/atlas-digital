// lib/oficio/pedido-de-avaliacao.ts — a mensagem do pedido de avaliação (producao/esteira/nichos/odontologia.md,
// seção 5.1; producao/esteira/14-funcionalidades/07-funcionalidades-do-oficio.md, seção 4.1). Função pura: o que a
// pessoa escolheu vira uma frase para o WhatsApp. Nada é registrado, e a lista é de atendimentos, nunca de sintomas.
// O registro da mensagem é o da casa: curto, cortês, impessoal ("Olá. Gostaria de marcar uma avaliação.").
export type Pedido = { atendimento?: string; regiao?: string; ultimaVisita?: string; periodo?: string };

export function mensagemDaAvaliacao(p: Pedido) {
  const partes = ["Olá. Gostaria de marcar uma avaliação."];
  if (p.atendimento) partes.push(`Atendimento: ${p.atendimento}.`);
  if (p.regiao) partes.push(`Região: ${p.regiao}.`);
  if (p.ultimaVisita) partes.push(`Última visita ao dentista: ${p.ultimaVisita.toLowerCase()}.`);
  if (p.periodo) partes.push(`Período: ${p.periodo.toLowerCase()}.`);
  return partes.join(" ");
}

/** A mensagem de um tratamento, direto da página dele: "Olá. Gostaria de marcar uma avaliação. Atendimento: coroa." */
export const mensagemDoTratamento = (atendimento: string) => mensagemDaAvaliacao({ atendimento });

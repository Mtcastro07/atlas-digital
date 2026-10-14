// lib/demos/odontologia/mensagem.ts — a mensagem do pedido de avaliação da Odontologia Boa Viagem
// (producao/esteira/nichos/odontologia.md, seção 5.1): o que a pessoa escolheu vira uma frase para o WhatsApp. Nada é
// registrado, e a lista é de atendimentos, nunca de sintomas. O registro da mensagem é o da casa: curto, cortês e
// impessoal. Função pura, sem import (roda direto no node:test).

export type Pedido = { atendimento?: string; regiao?: string; ultimaVisita?: string; periodo?: string };

/**
 * "<abertura> Atendimento: coroa. Região: …. Última visita: …. Período: …." A abertura vem do conteúdo
 * (odontologiaSite.acao.mensagem): a mesma frase da ação principal, numa fonte só.
 */
export function mensagemDaAvaliacao(abertura: string, p: Pedido) {
  const partes = [abertura];
  if (p.atendimento) partes.push(`Atendimento: ${p.atendimento}.`);
  if (p.regiao) partes.push(`Região: ${p.regiao}.`);
  if (p.ultimaVisita) partes.push(`Última visita ao dentista: ${p.ultimaVisita.toLowerCase()}.`);
  if (p.periodo) partes.push(`Período: ${p.periodo.toLowerCase()}.`);
  return partes.join(" ");
}

/** A mensagem de um tratamento, direto da página dele. */
export const mensagemDoTratamento = (abertura: string, atendimento: string) => mensagemDaAvaliacao(abertura, { atendimento });

/** O vínculo do WhatsApp com a mensagem pronta, para um número no formato 55DDDNNNNNNNN (falha no build se não for). */
export function vinculoDoWhatsapp(numero: string, mensagem?: string) {
  if (!/^55\d{10,11}$/.test(numero)) throw new Error(`WhatsApp fora do formato 55DDDNNNNNNNN: "${numero}"`);
  return mensagem ? `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}` : `https://wa.me/${numero}`;
}

/** A âncora do endereço, decodificada sem derrubar a página ("#%E0" malformada vale como nenhuma). */
export function decodificarAncora(hash: string) {
  try {
    return decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return "";
  }
}

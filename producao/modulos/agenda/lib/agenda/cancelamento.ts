// lib/agenda/cancelamento.ts — o cancelamento pela pessoa, pelo vínculo do e-mail (producao/esteira/14-funcionalidades/05-agenda.md, seção 8).
// Abrir o vínculo só mostra a reserva (filtros de e-mail e prévias de mensagem abrem os vínculos sozinhos); o
// cancelamento acontece no ENVIO do formulário. O código tem 128 bits e vale até a antecedência de cancelamento da
// casa; depois dela, a página explica e mostra o WhatsApp. Cancelar faz quatro coisas: apaga os blocos da reserva (o
// horário volta à lista), marca a reserva como cancelada, avisa o dono por e-mail e apaga o evento do Google, se houver.
// Sem dependência; só node:crypto, por codigo.ts.
import { ehCodigoDeCancelamento, hashDoCodigo } from "./codigo.ts";
import { dentroDoPrazoDeCancelamento } from "./lembrete.ts";
import { avisoDeCancelamentoAoDono } from "./mensagens.ts";
import type { CalendarioDoDono, ConfigDaAgenda, ContextoDoNegocio, Correio, Repositorio, Reserva } from "./tipos.ts";

export type SituacaoDoCancelamento =
  /** O código inventado: não diz se ele existiu. */
  | { tipo: "nao-encontrada" }
  | { tipo: "ja-cancelada"; reserva: Reserva }
  | { tipo: "fora-do-prazo"; reserva: Reserva }
  | { tipo: "pode-cancelar"; reserva: Reserva };

export async function situacaoDoCancelamento(repo: Repositorio, codigo: string, agora: Date, config: ConfigDaAgenda): Promise<SituacaoDoCancelamento> {
  if (!ehCodigoDeCancelamento(codigo)) return { tipo: "nao-encontrada" }; // o que não tem o formato nem chega ao banco
  const reserva = await repo.reservaPorCodigo(hashDoCodigo(codigo));
  if (!reserva) return { tipo: "nao-encontrada" };
  if (reserva.situacao === "cancelada") return { tipo: "ja-cancelada", reserva };
  if (!dentroDoPrazoDeCancelamento(reserva.inicio, agora, config.cancelamentoAteMin)) return { tipo: "fora-do-prazo", reserva };
  return { tipo: "pode-cancelar", reserva };
}

export type DependenciasDoCancelamento = {
  repo: Repositorio;
  correio: Correio;
  ctx: ContextoDoNegocio;
  config: ConfigDaAgenda;
  google?: CalendarioDoDono;
  avisar?: (texto: string) => void;
  agora?: Date;
};

const textoDoErro = (erro: unknown) => (erro instanceof Error ? erro.message : String(erro));

/** Apaga o evento do Google de uma reserva, se há; a falha só vai ao registro. */
export async function apagarEventoDoGoogle(google: CalendarioDoDono | undefined, reserva: Reserva, avisar: (texto: string) => void) {
  if (!google || !reserva.eventoGoogle) return;
  try {
    await google.apagarEvento(reserva.eventoGoogle);
  } catch (erro) {
    avisar(`agenda: o evento no Google da reserva ${reserva.id} não foi apagado: ${textoDoErro(erro)}`);
  }
}

/** Cancela pelo código: confere tudo de novo (a página pode ter ficado aberta). Devolve "cancelada" ou o motivo de não ter cancelado. */
export async function cancelarPelaPessoa(d: DependenciasDoCancelamento, codigo: string): Promise<SituacaoDoCancelamento | { tipo: "cancelada"; reserva: Reserva }> {
  const agora = d.agora ?? new Date();
  const avisar = d.avisar ?? ((texto: string) => console.warn(texto));
  const situacao = await situacaoDoCancelamento(d.repo, codigo, agora, d.config);
  if (situacao.tipo !== "pode-cancelar") return situacao;
  const { reserva } = situacao;
  // Duas pessoas com o mesmo vínculo, ou um duplo clique: só um cancelamento passa; o outro lê "já cancelada".
  if (!(await d.repo.cancelar(reserva.id, agora))) return { tipo: "ja-cancelada", reserva };
  try {
    await d.correio(avisoDeCancelamentoAoDono(reserva, d.ctx));
  } catch (erro) {
    avisar(`agenda: o aviso ao dono do cancelamento da reserva ${reserva.id} não saiu: ${textoDoErro(erro)}`);
  }
  await apagarEventoDoGoogle(d.google, reserva, avisar);
  return { tipo: "cancelada", reserva };
}

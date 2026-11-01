// lib/agenda/tarefas.ts — o lembrete da véspera e a manutenção diária, o que as tarefas agendadas do hPanel chamam
// (producao/esteira/14-funcionalidades/05-agenda.md, seção 7). O web app dorme sem tráfego: nada pode depender de um relógio dentro dele; a chamada
// da tarefa o acorda e faz o trabalho. Duas chamadas ao mesmo tempo nunca mandam o lembrete em dobro: o envio é marcado
// ANTES de enviar, só se ninguém marcou, e desmarcado se falhar. Sem dependência.
import { createHash, timingSafeEqual } from "node:crypto";
import type { ArmazemDoLimite } from "../formulario/limite.ts";
import { mensagemDeLembrete } from "./mensagens.ts";
import type { ConfigDaAgenda, ContextoDoNegocio, Correio, Repositorio } from "./tipos.ts";

const textoDoErro = (erro: unknown) => (erro instanceof Error ? erro.message : String(erro));

/**
 * A tarefa agendada se identifica com "Authorization: Bearer <SEGREDO_DO_CRON>". Compara pelo hash: os dois lados com o
 * mesmo tamanho, e a comparação não revela o comprimento do segredo. Sem segredo no ambiente, ninguém passa.
 */
export function autorizadoPeloSegredo(cabecalho: string | null, segredo: string | undefined) {
  if (!segredo) return false;
  const esperado = createHash("sha256").update(`Bearer ${segredo}`).digest();
  return timingSafeEqual(esperado, createHash("sha256").update(cabecalho ?? "").digest());
}

export async function enviarLembretes(d: { repo: Repositorio; correio: Correio; ctx: ContextoDoNegocio; avisar?: (texto: string) => void; agora?: Date }) {
  const agora = d.agora ?? new Date();
  const avisar = d.avisar ?? ((texto: string) => console.warn(texto));
  let enviados = 0;
  for (const reserva of await d.repo.paraLembrar(agora)) {
    if (!(await d.repo.marcarLembrete(reserva.id, agora))) continue; // outra chamada já marcou
    try {
      await d.correio(mensagemDeLembrete(reserva, d.ctx));
      enviados++;
    } catch (erro) {
      await d.repo.desmarcarLembrete(reserva.id); // tenta de novo daqui a 15 min
      avisar(`agenda: o lembrete da reserva ${reserva.id} não saiu: ${textoDoErro(erro)}`);
    }
  }
  return { enviados };
}

/** O instante antes do qual o atendimento já passou do prazo de guarda: `meses` meses antes de agora. */
export function limiteDaGuarda(agora: Date, meses: number) {
  const limite = new Date(agora);
  limite.setUTCMonth(limite.getUTCMonth() - meses);
  return limite;
}

/**
 * A tarefa diária (às 3h UTC, meia-noite em Niterói): apaga o limite de envios e o sal do dia anterior, as sessões vencidas
 * do painel e as reservas que passaram do prazo de guarda.
 */
export async function manter(d: { repo: Repositorio; armazem: ArmazemDoLimite; config: Pick<ConfigDaAgenda, "guardaMeses">; agora?: Date }) {
  const agora = d.agora ?? new Date();
  await d.armazem.limpar(agora);
  const sessoes = await d.repo.apagarSessoesVencidas(agora);
  const reservas = await d.repo.apagarReservasVencidas(limiteDaGuarda(agora, d.config.guardaMeses));
  return { sessoesApagadas: sessoes, reservasApagadas: reservas };
}

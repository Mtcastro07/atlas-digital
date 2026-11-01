// lib/agenda/google.ts — PROPOSTA, opcional: o evento direto na agenda do Google do dono, por uma conta de serviço, sem OAuth
// e sem a biblioteca googleapis (producao/esteira/14-funcionalidades/05-agenda.md, seção 6.1). O dono compartilha a agenda com o e-mail da conta, com a
// permissão de alterar eventos; o servidor assina um JWT RS256 com a chave da conta, troca-o por um token e cria o
// evento. Só node:crypto e fetch. A conta de serviço não convida a pessoa: ela recebe o .ics pelo e-mail. Uma falha do
// Google não desfaz a reserva (lib/agenda/processar.ts). O id do evento fica na reserva, para apagá-lo no cancelamento.
// O fluxo da conta de serviço NÃO foi exercitado contra o Google: conferir antes de ligar (seção 15). A assinatura do
// JWT tem teste de unidade; as duas chamadas ao Google, não.
// Sem `import "server-only"` (o teste de unidade importa este arquivo no Node); só a ação de reservar e a de cancelar o usam.
import { createSign } from "node:crypto";
import type { CalendarioDoDono, EventoDeCalendario } from "./tipos.ts";

const base64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");

export type ContaDeServico = { email: string; chave: string; agenda: string };

/** A afirmação JWT RS256 que a conta assina para pedir o token (válida por uma hora). A chave vem do ambiente com "\n" escrito. */
export function assinarAfirmacao(conta: Pick<ContaDeServico, "email" | "chave">, agora: Date) {
  const emitida = Math.floor(agora.getTime() / 1000);
  const cabeca = base64({ alg: "RS256", typ: "JWT" });
  const corpo = base64({
    iss: conta.email,
    scope: "https://www.googleapis.com/auth/calendar.events",
    aud: "https://oauth2.googleapis.com/token",
    iat: emitida,
    exp: emitida + 3600,
  });
  const assinatura = createSign("RSA-SHA256").update(`${cabeca}.${corpo}`).sign(conta.chave.replace(/\\n/g, "\n"), "base64url");
  return `${cabeca}.${corpo}.${assinatura}`;
}

async function tokenDaConta(conta: ContaDeServico) {
  const resposta = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: assinarAfirmacao(conta, new Date()) }),
  });
  if (!resposta.ok) throw new Error(`token do Google: ${resposta.status}`);
  return ((await resposta.json()) as { access_token: string }).access_token;
}

/** O calendário do Google do dono, ou nada: sem as três variáveis (GOOGLE_CONTA_EMAIL, GOOGLE_CONTA_CHAVE, GOOGLE_AGENDA_ID), a Agenda segue só com o .ics do e-mail. */
export function calendarioDoGoogle(env: Record<string, string | undefined> = process.env): CalendarioDoDono | undefined {
  const conta = { email: env.GOOGLE_CONTA_EMAIL, chave: env.GOOGLE_CONTA_CHAVE, agenda: env.GOOGLE_AGENDA_ID };
  if (!conta.email || !conta.chave || !conta.agenda) return undefined;
  const c = conta as ContaDeServico;
  const base = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(c.agenda)}/events`;
  return {
    async criarEvento(e: EventoDeCalendario) {
      const resposta = await fetch(base, {
        method: "POST",
        headers: { Authorization: `Bearer ${await tokenDaConta(c)}`, "Content-Type": "application/json" },
        body: JSON.stringify({ summary: e.titulo, description: e.descricao, start: { dateTime: e.inicio.toISOString() }, end: { dateTime: e.fim.toISOString() } }),
      });
      if (!resposta.ok) throw new Error(`evento no Google: ${resposta.status}`);
      return ((await resposta.json()) as { id: string }).id;
    },
    async apagarEvento(eventoId: string) {
      const resposta = await fetch(`${base}/${encodeURIComponent(eventoId)}`, { method: "DELETE", headers: { Authorization: `Bearer ${await tokenDaConta(c)}` } });
      // 404 e 410: o evento já não existe (o dono o apagou). Para o cancelamento, é o resultado que se queria.
      if (!resposta.ok && resposta.status !== 404 && resposta.status !== 410) throw new Error(`apagar o evento no Google: ${resposta.status}`);
    },
  };
}

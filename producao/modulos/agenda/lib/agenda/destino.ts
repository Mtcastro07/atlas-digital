// lib/agenda/destino.ts — para onde vão o banco, o e-mail e a contagem do limite. ESTA É A LIGAÇÃO DE DESENVOLVIMENTO, sem
// dependência: as reservas na memória do processo e um correio que só registra o assunto. Serve para escrever e testar as
// telas sem MySQL nem SMTP; a Agenda nunca vai ao ar assim (a Agenda não entra no rascunho de 24 horas: exige banco, e-mail
// e o teste da corrida; producao/esteira/14-funcionalidades/README.md, seção 6). Na publicação, copie
// lib/agenda/destino.producao.ts por cima deste arquivo (producao/modulos/README.md, passo "ligar o banco e o e-mail").
//
// Em produção esta ligação recusa funcionar: reserva guardada só na memória some quando o web app dorme, e o e-mail que
// não sai diria à pessoa o contrário do que aconteceu. Só com AGENDA_EM_MEMORIA=1, para medir a Agenda sem banco.
// O dono do painel, no desenvolvimento: AGENDA_DEV_DONO_EMAIL e AGENDA_DEV_DONO_REGISTRO (o registro que o
// ferramentas/criar-dono.mjs imprime). Com SMTP_TESTE, o correio daqui faz o que o de produção faz nos testes de ponta a
// ponta: "1" grava a mensagem em .teste/emails.jsonl, uma linha de JSON no formato do jsonTransport do nodemailer (from,
// to, replyTo, subject, text e icalEvent com o .ics); "falha" simula o SMTP fora do ar. Assim a marcação, o cancelamento
// e o lembrete se provam sem nodemailer nem MySQL, e o teste que lê o arquivo serve às duas ligações.
import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import { negocio } from "@/conteudo/negocio";
import { armazemEmMemoria } from "../formulario/limite";
import { calendarioDoGoogle } from "./google";
import { repositorioEmMemoria, SEMENTE_DE_EXEMPLO } from "./memoria";
import type { Correio, Mensagem, Repositorio } from "./tipos";

const guardado = globalThis as unknown as { __agendaEmMemoria?: Repositorio };

/** Uma vez só por processo (sobrevive ao recarregamento do `next dev`). */
export function repositorio(): Repositorio {
  if (process.env.NODE_ENV === "production" && process.env.AGENDA_EM_MEMORIA !== "1") {
    throw new Error("A Agenda está com a ligação de desenvolvimento (lib/agenda/destino.ts). Na publicação, copie lib/agenda/destino.producao.ts por cima.");
  }
  const email = process.env.AGENDA_DEV_DONO_EMAIL;
  const senha = process.env.AGENDA_DEV_DONO_REGISTRO;
  return (guardado.__agendaEmMemoria ??= repositorioEmMemoria({ ...SEMENTE_DE_EXEMPLO, donos: email && senha ? [{ id: 1, email, senha }] : [] }));
}

/** O limite por IP na memória: o mesmo que o formulário usa em desenvolvimento. */
export const armazem = armazemEmMemoria();

/** Os últimos e-mails que a Agenda "enviou", para olhar no desenvolvimento. */
export const caixaDeSaida: Mensagem[] = [];

/** A mensagem no formato que o jsonTransport do nodemailer grava: o que o teste de ponta a ponta lê é o mesmo nas duas ligações. */
function comoJsonDoNodemailer(m: Mensagem) {
  return {
    from: { address: process.env.SMTP_USUARIO ?? "", name: negocio.nome },
    to: [{ address: m.para, name: "" }],
    replyTo: m.responderPara ? [{ address: m.responderPara, name: "" }] : undefined,
    subject: m.assunto,
    text: m.texto,
    icalEvent: m.convite ? { content: m.convite.conteudo, method: "PUBLISH", filename: m.convite.nome } : undefined,
  };
}

export const correio: Correio = async (mensagem) => {
  if (process.env.SMTP_TESTE === "falha") throw new Error("SMTP simulado fora do ar");
  caixaDeSaida.push(mensagem);
  if (caixaDeSaida.length > 50) caixaDeSaida.shift();
  if (process.env.SMTP_TESTE) {
    await mkdir(".teste", { recursive: true }); // fora do git (.gitignore)
    await appendFile(".teste/emails.jsonl", `${JSON.stringify(comoJsonDoNodemailer(mensagem))}\n`);
  }
  console.info(`agenda (desenvolvimento): e-mail "${mensagem.assunto}" guardado na memória, não enviado`);
};

/** A agenda do Google do dono, se as variáveis estão no ambiente. */
export const calendario = calendarioDoGoogle();

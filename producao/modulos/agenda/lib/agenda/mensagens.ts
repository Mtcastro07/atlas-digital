// lib/agenda/mensagens.ts — os e-mails da Agenda, compostos sem dependência: a confirmação à pessoa e o aviso ao dono (com
// o convite de calendário), o lembrete, e os dois cancelamentos (producao/esteira/14-funcionalidades/05-agenda.md, seções 6 a 8). O envio
// é de lib/agenda/email.ts (com o nodemailer). Só texto, sem HTML. Nada digitado pela pessoa vai
// para o assunto: ele leva o serviço e o horário, que são do site.
import { duracao } from "../moeda.ts";
import { telefoneVisivel } from "../whatsapp.ts";
import { convite } from "./convite.ts";
import { quandoPorExtenso } from "./texto.ts";
import type { ConfigDaAgenda, ContextoDoNegocio, EventoDeCalendario, Mensagem, Reserva } from "./tipos.ts";

/** Texto de uma linha só: a quebra vira espaço (o nome da pessoa não abre linha nem cabeçalho). */
const umaLinha = (texto: string) => texto.replace(/[\r\n]+/g, " ");

const fimDoServico = (r: Reserva) => new Date(r.inicio.getTime() + r.duracaoMin * 60_000);

function linhasDaReserva(r: Reserva) {
  return [`Serviço: ${r.servicoNome}`, `Profissional: ${r.profissionalNome}`, `Quando: ${quandoPorExtenso(r.inicio)}`];
}

/** O .ics do e-mail: o fim é o do serviço, sem o intervalo de limpeza (o intervalo é da casa, não da pessoa). */
function conviteDaReserva(r: Reserva, ctx: ContextoDoNegocio, titulo: string, descricao: string, agora: Date) {
  return {
    nome: "reserva.ics",
    conteudo: convite(
      { uid: `reserva-${r.id}@${ctx.dominio}`, inicio: r.inicio, fim: fimDoServico(r), titulo, local: ctx.endereco, descricao, organizador: ctx.organizador },
      agora,
    ),
  };
}

/** O evento da reserva na agenda do dono: o mesmo título e a mesma descrição do convite que ele recebe por e-mail. */
export function eventoDoDono(r: Reserva): EventoDeCalendario {
  return { inicio: r.inicio, fim: fimDoServico(r), titulo: `${r.servicoNome} · ${umaLinha(r.nome)}`, descricao: contatoDaPessoa(r).join("\n") };
}

function contatoDaPessoa(r: Reserva) {
  return [`Nome: ${umaLinha(r.nome)}`, `E-mail: ${r.email}`, ...(r.telefone ? [`Telefone: ${telefoneVisivel(`55${r.telefone}`)}`] : [])];
}

/** A confirmação para a pessoa e o aviso para o dono, com o mesmo convite; só a pessoa recebe o vínculo de cancelamento. */
export function mensagensDaReserva(r: Reserva, codigo: string, ctx: ContextoDoNegocio, config: Pick<ConfigDaAgenda, "cancelamentoAteMin">, agora: Date) {
  const vinculoDeCancelamento = `${ctx.url}/cancelar/${codigo}`;
  const prazo = duracao(config.cancelamentoAteMin);
  const quando = quandoPorExtenso(r.inicio);

  const pessoa: Mensagem = {
    para: r.email,
    responderPara: ctx.dono, // responder à confirmação fala com a casa, não com a caixa que só envia
    assunto: `Reserva confirmada: ${r.servicoNome}, ${quando}`,
    texto: [
      `Reserva confirmada em ${ctx.nome}.`,
      "",
      ...linhasDaReserva(r),
      `Onde: ${ctx.endereco}`,
      `Mapa: ${ctx.vinculoDoMapa}`,
      "",
      `Para cancelar, até ${prazo} antes do horário: ${vinculoDeCancelamento}`,
      `Depois desse prazo, só pelo WhatsApp da casa: ${ctx.vinculoDoWhatsapp}`,
      "",
      "O convite em anexo (reserva.ics) põe o horário na agenda do aparelho.",
    ].join("\n"),
    convite: conviteDaReserva(r, ctx, `${r.servicoNome} · ${ctx.nome}`, `Cancelar até ${prazo} antes: ${vinculoDeCancelamento}`, agora),
  };

  const contato = contatoDaPessoa(r);
  const evento = eventoDoDono(r);
  const dono: Mensagem = {
    para: ctx.dono,
    responderPara: r.email,
    assunto: `Nova reserva: ${r.servicoNome}, ${quando}`,
    texto: ["Nova reserva pelo site.", "", ...linhasDaReserva(r), "", ...contato, "", `Cancelar uma reserva ou bloquear horários: ${ctx.url}/painel`, "", "O convite em anexo (reserva.ics) põe o horário na agenda."].join("\n"),
    convite: conviteDaReserva(r, ctx, evento.titulo, evento.descricao, agora),
  };

  return { pessoa, dono };
}

/** O lembrete da véspera. O código de cancelamento só existe no e-mail de confirmação (o banco guarda o hash): o lembrete manda para ele. */
export function mensagemDeLembrete(r: Reserva, ctx: ContextoDoNegocio): Mensagem {
  return {
    para: r.email,
    responderPara: ctx.dono,
    assunto: `Lembrete: ${r.servicoNome}, ${quandoPorExtenso(r.inicio)}`,
    texto: [
      `Lembrete da reserva em ${ctx.nome}.`,
      "",
      ...linhasDaReserva(r),
      `Onde: ${ctx.endereco}`,
      `Mapa: ${ctx.vinculoDoMapa}`,
      "",
      `Para cancelar, use o vínculo do e-mail de confirmação ou o WhatsApp da casa: ${ctx.vinculoDoWhatsapp}`,
    ].join("\n"),
  };
}

/** O aviso ao dono de que a pessoa cancelou. */
export function avisoDeCancelamentoAoDono(r: Reserva, ctx: ContextoDoNegocio): Mensagem {
  return {
    para: ctx.dono,
    responderPara: r.email,
    assunto: `Reserva cancelada pela pessoa: ${r.servicoNome}, ${quandoPorExtenso(r.inicio)}`,
    texto: ["Reserva cancelada pelo vínculo do e-mail. O horário voltou à lista.", "", ...linhasDaReserva(r), "", ...contatoDaPessoa(r)].join("\n"),
  };
}

/** O aviso à pessoa de que o dono cancelou, com o motivo. */
export function avisoDeCancelamentoAPessoa(r: Reserva, motivo: string, ctx: ContextoDoNegocio): Mensagem {
  return {
    para: r.email,
    responderPara: ctx.dono,
    assunto: `Reserva cancelada: ${r.servicoNome}, ${quandoPorExtenso(r.inicio)}`,
    texto: [
      `A reserva em ${ctx.nome} foi cancelada pela casa.`,
      "",
      ...linhasDaReserva(r),
      `Motivo: ${umaLinha(motivo)}`,
      "",
      `Para marcar outro horário: ${ctx.url}/agendar, ou o WhatsApp da casa: ${ctx.vinculoDoWhatsapp}`,
    ].join("\n"),
  };
}

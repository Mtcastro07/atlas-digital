// lib/agenda/processar.ts — a decisão da ação de reservar, fora do arquivo "use server" para o teste de unidade a
// exercitar sem servidor, sem banco e sem SMTP (producao/esteira/14-funcionalidades/05-agenda.md, seção 5; 02-formulario.md, seções 3.2 e 5).
// Faz, antes de reservar, o mesmo que o formulário: o campo-armadilha, o carimbo de tempo, a validação com o e-mail
// obrigatório e o limite por IP. Depois de reservar, avisa: o e-mail com o convite à pessoa e ao dono e, se o dono quiser,
// o evento na agenda do Google dele. Se o e-mail falhar, a reserva continua feita, e a confirmação mostra o dia e a hora
// na tela (nunca uma reserva que a pessoa não sabe que fez). A proteção entra por parâmetro: o carimbo e o limite são os
// de lib/formulario/. Sem dependência.
import { campo } from "../formulario/entrada.ts";
import { lerTelefone } from "../formulario/validar.ts";
import { mensagensDaReserva, eventoDoDono } from "./mensagens.ts";
import { reservarHorario } from "./reserva.ts";
import type { PedidoDeReserva } from "./reserva.ts";
import type { CalendarioDoDono, ConfigDaAgenda, ContextoDoNegocio, Correio, Repositorio } from "./tipos.ts";
import { lerInstante, validarReserva } from "./validar.ts";
import type { CamposDaReserva, ErrosDaReserva } from "./validar.ts";

export type EstadoDaReserva = {
  situacao: "inicial" | "corrigir" | "ocupado" | "limite" | "falhou";
  carimbo: string;
  /** O que a pessoa escreveu, devolvido para os campos voltarem preenchidos (com e sem script). */
  valores?: CamposDaReserva;
  erros?: ErrosDaReserva;
  aviso?: string;
};

/** O desfecho: "descartado" (robô) leva à confirmação sem dizer nada; "reservada" leva à confirmação com o que mostrar; "estado" volta à ilha. */
export type ResultadoDaAcao =
  | { tipo: "descartado" }
  | { tipo: "estado"; estado: EstadoDaReserva }
  | { tipo: "reservada"; inicio: Date; emailEnviado: boolean };

/** O carimbo e o limite do formulário (lib/formulario/carimbo.ts e limite.ts), ligados na ação. */
export type Protecao = {
  lerCarimbo(carimbo: string, agora: number): "valido" | "forjado" | "rapido" | "vencido";
  emitirCarimbo(agora: number): string;
  /** Soma um à contagem do IP na hora e devolve quantos já houve. */
  contarEnvio(ip: string, agora: Date): Promise<number>;
  limitePorHora: number;
};

export type DependenciasDaReserva = {
  repo: Repositorio;
  correio: Correio;
  ctx: ContextoDoNegocio;
  config: ConfigDaAgenda;
  protecao: Protecao;
  /** A agenda do Google do dono, se ele quiser o evento direto. */
  google?: CalendarioDoDono;
  avisar?: (texto: string) => void;
  agora?: Date;
};

const textoDoErro = (erro: unknown) => (erro instanceof Error ? erro.message : String(erro));

export async function processarReserva(dados: FormData, ip: string | null, d: DependenciasDaReserva): Promise<ResultadoDaAcao> {
  const agora = d.agora ?? new Date();
  const avisar = d.avisar ?? ((texto: string) => console.warn(texto));
  const devolver = (estado: EstadoDaReserva): ResultadoDaAcao => ({ tipo: "estado", estado });

  // 1. Campo-armadilha preenchido ou carimbo forjado: robô. Finge que deu certo e descarta.
  const carimbo = campo(dados, "carimbo");
  const leitura = d.protecao.lerCarimbo(carimbo, agora.getTime());
  if (campo(dados, "nao_preencher") !== "" || leitura === "forjado") return { tipo: "descartado" };

  const valores: CamposDaReserva = {
    nome: campo(dados, "nome"),
    email: campo(dados, "email"),
    telefone: campo(dados, "telefone"),
    servico: campo(dados, "servico"),
    profissional: campo(dados, "profissional") || "qualquer",
    inicio: campo(dados, "inicio"),
    consentimento: campo(dados, "consentimento"),
  };

  // 2. Rápido demais, ou a página aberta há mais de um dia: pede para conferir. Nunca descarta em silêncio o que pode ser de uma pessoa.
  if (leitura === "rapido") return devolver({ situacao: "corrigir", carimbo, valores, aviso: "Confira os dados e envie de novo." });
  if (leitura === "vencido") {
    return devolver({
      situacao: "corrigir",
      carimbo: d.protecao.emitirCarimbo(agora.getTime()),
      valores,
      aviso: "A página ficou aberta por mais de um dia. Confira os dados e envie de novo.",
    });
  }

  // 3. As regras da ilha, de novo.
  const erros = validarReserva(valores, Boolean(d.config.consentimento));
  if (Object.keys(erros).length > 0) return devolver({ situacao: "corrigir", carimbo, valores, erros });

  // 4. O limite por IP. Sem IP, não limita e avisa no registro.
  try {
    if (!ip) avisar("agenda: pedido sem x-forwarded-for; limite por IP não aplicado");
    else if ((await d.protecao.contarEnvio(ip, agora)) > d.protecao.limitePorHora) return devolver({ situacao: "limite", carimbo, valores });
  } catch (erro) {
    avisar(`agenda: o limite por IP falhou: ${textoDoErro(erro)}`);
    return devolver({ situacao: "falhou", carimbo, valores });
  }

  // 5. A reserva. O horário que já não está livre (levado um instante antes, ou nunca oferecido) volta como "ocupado".
  const pedido: PedidoDeReserva = {
    servicoId: Number(valores.servico),
    profissionalId: valores.profissional === "qualquer" ? null : Number(valores.profissional),
    inicio: lerInstante(valores.inicio)!, // a validação acima já garantiu
    nome: valores.nome,
    email: valores.email,
    telefone: valores.telefone ? lerTelefone(valores.telefone) : null,
  };
  let desfecho;
  try {
    desfecho = await reservarHorario(d.repo, pedido, agora, d.config);
  } catch (erro) {
    avisar(`agenda: a reserva falhou: ${textoDoErro(erro)}`);
    return devolver({ situacao: "falhou", carimbo, valores });
  }
  if (desfecho.tipo === "ocupado") {
    return devolver({ situacao: "ocupado", carimbo, valores, aviso: "Este horário acabou de ser ocupado. Escolha outro." });
  }

  // 6. Os avisos. Nada daqui desfaz a reserva.
  const { reserva, codigo } = desfecho;
  const { pessoa, dono } = mensagensDaReserva(reserva, codigo, d.ctx, d.config, agora);
  let emailEnviado = true;
  try {
    await d.correio(pessoa);
  } catch (erro) {
    emailEnviado = false;
    avisar(`agenda: o e-mail da reserva ${reserva.id} não saiu: ${textoDoErro(erro)}`);
  }
  try {
    await d.correio(dono);
  } catch (erro) {
    avisar(`agenda: o aviso ao dono da reserva ${reserva.id} não saiu: ${textoDoErro(erro)}`);
  }
  if (d.google) {
    try {
      await d.repo.guardarEventoGoogle(reserva.id, await d.google.criarEvento(eventoDoDono(reserva)));
    } catch (erro) {
      avisar(`agenda: o evento no Google da reserva ${reserva.id} não foi criado: ${textoDoErro(erro)}`);
    }
  }
  return { tipo: "reservada", inicio: reserva.inicio, emailEnviado };
}

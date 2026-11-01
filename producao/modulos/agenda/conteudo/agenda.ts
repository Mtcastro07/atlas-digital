// conteudo/agenda.ts — os parâmetros da casa e os textos públicos da Agenda (producao/esteira/14-funcionalidades/05-agenda.md, seções 3, 4, 6 e 8).
// Do cliente: os parâmetros mudam pela manutenção; os textos saem do briefing. O catálogo (profissionais, serviços e
// expediente) mora no banco (esquema/agenda.sql), não aqui. Os textos do painel do dono estão em conteudo/painel.ts.
import type { ConfigDaAgenda } from "../lib/agenda/tipos";

/** Os parâmetros da casa. */
export const config: ConfigDaAgenda = {
  /** 2 horas: ninguém marca para daqui a 10 minutos. */
  antecedenciaMinimaMin: 120,
  /** 30 dias: o expediente de daqui a três meses ainda não existe. */
  antecedenciaMaximaMin: 43_200,
  /** 3 horas antes; depois disso, só pelo WhatsApp da casa. */
  cancelamentoAteMin: 180,
  /** Das reservas, depois do atendimento: o aviso de privacidade publica o mesmo prazo. */
  guardaMeses: 12,
  /**
   * Só na psicologia (e onde o advogado mandar): o texto da caixa de consentimento, obrigatória e desmarcada. Por exemplo:
   * "Concordo que a casa use meu nome e meus contatos para marcar, lembrar e, se eu pedir, cancelar a sessão."
   */
  consentimento: null,
};

/** A página de marcação (app/agendar/page.tsx). O título é o da página, em conteudo/site.ts. */
export const paginaDeAgendar = {
  lide: "Escolha o serviço e o dia. Os horários livres aparecem em seguida. A confirmação chega por e-mail, com o convite de calendário.",
  escolha: "Serviço e dia",
  servico: "Serviço",
  profissional: "Profissional",
  semPreferencia: "Sem preferência",
  dia: "Dia",
  verHorarios: "Ver horários",
  horarios: "Horário",
  seusDados: "Seus dados",
  nenhumHorario: "Nenhum horário livre neste dia. Escolha outro dia, ou chame no WhatsApp.",
  diaInvalido: "Escolha um dia dos próximos dias, no calendário.",
  profissionalNaoFaz: "Este profissional não faz este serviço. Escolha outro, ou deixe sem preferência.",
  semServicos: "A marcação pelo site ainda não tem serviços cadastrados. Chame no WhatsApp.",
  foraDoAr: "A marcação pelo site não abriu agora. Chame no WhatsApp, ou tente de novo em alguns minutos.",
};

/** O formulário de reserva (components/ilhas/formulario-de-reserva.tsx). */
export type TextosDaReserva = {
  campos: { nome: string; email: string; telefone: string; horario: string };
  marcas: { obrigatorio: string; opcional: string };
  aviso: string;
  vinculoDoAviso: string;
  botao: string;
  enviando: string;
  resumoDeErros: string;
  ocupado: string;
  limite: { antes: string; vinculo: string; depois: string };
  falhou: { antes: string; vinculo: string; depois: string };
  saudacaoDoWhatsapp: string;
};

export const textosDaReserva: TextosDaReserva = {
  campos: { nome: "Nome", email: "E-mail", telefone: "Telefone", horario: "Horário" },
  marcas: { obrigatorio: "(obrigatório)", opcional: "(opcional)" },
  aviso: `Usamos estes dados só para confirmar, lembrar e cancelar a reserva, se você pedir. Eles ficam guardados por ${config.guardaMeses} meses depois do atendimento.`,
  vinculoDoAviso: "Aviso de privacidade",
  botao: "Reservar",
  enviando: "Reservando…",
  resumoDeErros: "Confira os campos marcados.",
  ocupado: "Este horário acabou de ser ocupado. Escolha outro.",
  limite: { antes: "Muitos pedidos deste endereço na última hora. Tente mais tarde, ou", vinculo: "chame no WhatsApp", depois: "." },
  falhou: { antes: "A reserva não foi feita. Tente de novo, ou", vinculo: "chame no WhatsApp", depois: "." },
  saudacaoDoWhatsapp: "Olá. Tentei reservar um horário pelo site.",
};

/** A confirmação (app/agendar/confirmado/page.tsx): não repete dado pessoal. */
export const confirmacao = {
  titulo: "Reserva feita.",
  comEmail: "O convite e o vínculo de cancelamento foram para o seu e-mail.",
  semEmail: "O e-mail de confirmação não saiu. Anote o dia e a hora:",
  semEmailComplemento: "Para cancelar ou mudar o horário, chame a casa pelo WhatsApp.",
  voltar: "Voltar ao início",
  /** Título, descrição e cartão da página, que fica fora da busca (noindex) e fora do menu. */
  metadados: {
    titulo: "Reserva feita",
    tituloCurto: "Reserva feita",
    descricao: "A reserva está feita. O convite e o vínculo de cancelamento vão por e-mail.",
    descricaoCurta: "A reserva está feita.",
  },
};

/** A página de cancelamento (app/cancelar/[codigo]/page.tsx). */
export const cancelamento = {
  rotulos: { servico: "Serviço", profissional: "Profissional", quando: "Quando" },
  naoEncontrada: { titulo: "Reserva não encontrada.", texto: "Confira o vínculo do e-mail, ou chame a casa pelo WhatsApp." },
  jaCancelada: { titulo: "Esta reserva já foi cancelada.", texto: "O horário já voltou à lista." },
  cancelada: { titulo: "Reserva cancelada.", texto: "O horário voltou à lista e a casa foi avisada." },
  foraDoPrazo: {
    titulo: "O prazo para cancelar pelo site passou.",
    texto: (prazo: string) => `O vínculo cancela até ${prazo} antes do horário. Depois disso, só pela casa: chame no WhatsApp.`,
  },
  pode: { titulo: "Cancelar esta reserva?", texto: "Ao cancelar, o horário volta à lista e a casa é avisada.", botao: "Cancelar a reserva" },
  agendarDeNovo: "Marcar outro horário",
  /** Título, descrição e cartão da página, que fica fora da busca (noindex), fora do menu e sem o código no endereço. */
  metadados: {
    titulo: "Cancelar a reserva",
    tituloCurto: "Cancelar a reserva",
    descricao: "Cancele a reserva pelo vínculo do e-mail. O horário volta à lista e a casa é avisada.",
    descricaoCurta: "Cancele a reserva pelo vínculo do e-mail.",
  },
};

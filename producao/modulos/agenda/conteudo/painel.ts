// conteudo/painel.ts — os textos do painel do dono (producao/esteira/14-funcionalidades/05-agenda.md, seção 9): a entrada, as reservas dos próximos 14 dias,
// o cancelamento com motivo, o bloqueio de horário ou de dia e a busca dos dados de uma pessoa. Área restrita, fora da
// busca; a única que usa cookie (o de sessão, estritamente necessário).

export const painel = {
  titulo: "Painel da Agenda",
  /** Título, descrição e cartão da página, que fica fora da busca (noindex) e fora do menu. */
  metadados: {
    titulo: "Painel da Agenda",
    tituloCurto: "Painel da Agenda",
    descricao: "Área restrita: as reservas dos próximos dias, o cancelamento, o bloqueio de horários e os dados de uma pessoa.",
    descricaoCurta: "Área restrita da Agenda.",
  },
  entrar: {
    titulo: "Entrar no painel",
    email: "E-mail",
    senha: "Senha",
    botao: "Entrar",
    recusada: "E-mail ou senha incorretos.",
    limite: "Muitas tentativas. Espere 15 minutos e tente de novo.",
  },
  sair: "Sair",
  mensagens: {
    cancelada: "Reserva cancelada. A pessoa foi avisada por e-mail.",
    canceladaSemEmail: "Reserva cancelada, mas o e-mail à pessoa não saiu. Avise pelo WhatsApp.",
    jaCancelada: "Essa reserva já estava cancelada, ou não existe mais.",
    motivoInvalido: "Escreva o motivo do cancelamento, de 2 a 200 caracteres.",
    bloqueada: "Horário bloqueado.",
    bloqueioRemovido: "Bloqueio removido.",
    nadaParaApagar: "Nenhuma reserva dessa pessoa.",
    buscaInvalida: "Digite um e-mail ou um telefone com DDD.",
  } as Record<string, string>,
  apagados: (n: number) => (n === 1 ? "1 reserva apagada, com os dados da pessoa." : `${n} reservas apagadas, com os dados da pessoa.`),
  reservas: {
    titulo: "Próximos 14 dias",
    nenhuma: "Nenhuma reserva nos próximos 14 dias.",
    motivo: "Motivo do cancelamento",
    cancelar: "Cancelar a reserva",
  },
  bloqueio: {
    titulo: "Bloquear horário ou dia",
    profissional: "Quem",
    casa: "A casa inteira",
    dia: "Dia",
    diaFim: "Último dia (se passar de um dia)",
    de: "Das",
    ate: "Às",
    dicaDoHorario: "Deixe os dois horários vazios para bloquear o dia inteiro.",
    motivo: "Motivo",
    botao: "Bloquear",
    lista: "Bloqueios a partir de hoje",
    nenhum: "Nenhum bloqueio.",
    remover: "Remover o bloqueio",
  },
  pessoa: {
    titulo: "Dados de uma pessoa",
    lide: "Pedido do titular (LGPD, art. 18): procure pelo e-mail ou pelo telefone e apague.",
    busca: "E-mail ou telefone",
    procurar: "Procurar",
    achadas: (n: number) => (n === 1 ? "1 reserva encontrada:" : `${n} reservas encontradas:`),
    confirmo: "Confirmo a eliminação destas reservas, com os dados da pessoa.",
    apagar: "Apagar os dados desta pessoa",
  },
};

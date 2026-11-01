// lib/agenda/tipos.ts — os tipos da Agenda e a porta do banco, o Repositorio (producao/esteira/14-funcionalidades/05-agenda.md,
// seções 3 a 9). Só tipos: nada deste arquivo existe em tempo de execução. A lógica (horários livres, reserva,
// cancelamento, lembrete) fala com o banco por esta porta; o MySQL do plano a cumpre em lib/agenda/repositorio-mysql.ts
// (com o mysql2) e a memória, em lib/agenda/memoria.ts (testes e desenvolvimento).

/** Um trecho do expediente, em hora de parede de Niterói: "09:00" a "12:00". */
export type Faixa = { abre: string; fecha: string };
export type Intervalo = { inicio: Date; fim: Date };

export type Servico = { id: number; nome: string; duracaoMin: number; intervaloMin: number };
export type Profissional = { id: number; nome: string; servicosIds: readonly number[] };

export type Situacao = "confirmada" | "cancelada";

export type Reserva = {
  id: number;
  profissionalId: number;
  profissionalNome: string;
  servicoId: number;
  servicoNome: string;
  duracaoMin: number;
  intervaloMin: number;
  inicio: Date;
  /** O fim da ocupação, com o intervalo depois do serviço. O fim do serviço é inicio + duracaoMin. */
  fim: Date;
  nome: string;
  email: string;
  /** Só os algarismos, sem o 55 (lerTelefone). */
  telefone: string | null;
  situacao: Situacao;
  criadaEm: Date;
  canceladaEm: Date | null;
  lembreteEnviadoEm: Date | null;
  eventoGoogle: string | null;
};

export type NovaReserva = {
  profissionalId: number;
  servicoId: number;
  inicio: Date;
  /** Duração do serviço mais o intervalo depois dele, em minutos. */
  ocupaMin: number;
  nome: string;
  email: string;
  telefone: string | null;
  /** SHA-256 do código de cancelamento: o código em si só vai no e-mail. */
  tokenHash: Buffer;
  criadaEm: Date;
};

export type ResultadoDaReserva = { ok: true; reservaId: number } | { ok: false; motivo: "ocupado" };

/** Férias, consulta externa, feriado. Sem profissional, vale para a casa inteira. */
export type Folga = { id: number; profissionalId: number | null; inicio: Date; fim: Date; motivo: string };
export type NovaFolga = Omit<Folga, "id">;

export type Dono = { id: number; email: string; senha: string };

/** Os parâmetros da casa (conteudo/agenda.ts, mudados pela manutenção). */
export type ConfigDaAgenda = {
  antecedenciaMinimaMin: number;
  antecedenciaMaximaMin: number;
  /** A pessoa cancela até tantos minutos antes; depois disso, só pelo WhatsApp da casa. */
  cancelamentoAteMin: number;
  /** Meses de guarda das reservas, contados do fim do atendimento. */
  guardaMeses: number;
  /**
   * O consentimento específico e destacado (LGPD, art. 11, I): o texto da caixa, que passa a ser obrigatória. Na
   * psicologia, procurar o atendimento já revela dado de saúde (producao/esteira/nichos/psicologia.md, seção 5.4;
   * producao/esteira/14-funcionalidades/05-agenda.md, seção 1, "Varia por"). Ausente ou null nos outros nichos: a base é o
   * art. 7º, V, sem caixa. A CONFIRMAR com advogado.
   */
  consentimento?: string | null;
};

export interface Repositorio {
  // O catálogo
  servicos(): Promise<Servico[]>;
  profissionais(): Promise<Profissional[]>;
  faixasDoDia(profissionalId: number, diaSemana: number): Promise<Faixa[]>;
  /** Os blocos de 15 minutos ocupados por reservas confirmadas e as folgas (do profissional e da casa) que tocam [de, ate). */
  ocupados(profissionalId: number, de: Date, ate: Date): Promise<Intervalo[]>;

  // A reserva
  /** A reserva e os blocos que ela ocupa, numa transação só: a chave única recusa o bloco já levado ("ocupado"). */
  reservar(r: NovaReserva): Promise<ResultadoDaReserva>;
  reservaPorCodigo(tokenHash: Buffer): Promise<Reserva | null>;
  reservaPorId(id: number): Promise<Reserva | null>;
  /** Marca como cancelada e libera os blocos. Falso se já estava cancelada, ou se não existe. */
  cancelar(reservaId: number, agora: Date): Promise<boolean>;
  guardarEventoGoogle(reservaId: number, eventoId: string): Promise<void>;

  // O lembrete (a tarefa agendada)
  paraLembrar(agora: Date): Promise<Reserva[]>;
  /** Marca o envio antes de enviar, só se ninguém marcou: falso se outra chamada marcou primeiro. */
  marcarLembrete(reservaId: number, agora: Date): Promise<boolean>;
  desmarcarLembrete(reservaId: number): Promise<void>;

  // A manutenção diária
  /** Apaga as reservas cujo atendimento terminou antes do instante, com os blocos; devolve quantas. */
  apagarReservasVencidas(antesDe: Date): Promise<number>;
  apagarSessoesVencidas(agora: Date): Promise<number>;

  // O painel do dono
  donoPorEmail(email: string): Promise<Dono | null>;
  criarSessao(tokenHash: Buffer, donoId: number, expiraEm: Date): Promise<void>;
  donoDaSessao(tokenHash: Buffer, agora: Date): Promise<number | null>;
  apagarSessao(tokenHash: Buffer): Promise<void>;
  /** As reservas confirmadas que começam em [de, ate), por início. */
  reservasEntre(de: Date, ate: Date): Promise<Reserva[]>;
  folgasAPartirDe(de: Date): Promise<Folga[]>;
  criarFolga(folga: NovaFolga): Promise<number>;
  removerFolga(id: number): Promise<boolean>;
  /** As reservas de uma pessoa, de qualquer situação, pelo e-mail ou pelo telefone (só algarismos). */
  buscarPessoa(busca: { email?: string; telefone?: string }): Promise<Reserva[]>;
  /** Apaga as reservas e os blocos; devolve as que apagou (para tirar os eventos do Google). */
  apagarReservas(ids: readonly number[]): Promise<Reserva[]>;
}

/** Uma mensagem de e-mail pronta, em texto, com o convite de calendário quando há. */
export type Mensagem = {
  para: string;
  assunto: string;
  texto: string;
  responderPara?: string;
  convite?: { nome: string; conteudo: string };
};

/** Entrega a mensagem. Lança se não conseguir. */
export type Correio = (mensagem: Mensagem) => Promise<void>;

/** Os dados do negócio de que as mensagens precisam: de conteudo/negocio.ts e do ambiente, montados em lib/agenda/contexto.ts. */
export type ContextoDoNegocio = {
  nome: string;
  /** "https://dominio", sem barra final. */
  url: string;
  /** O domínio, sem "www": o UID do convite é reserva-<id>@<domínio>. */
  dominio: string;
  /** O endereço em uma linha. */
  endereco: string;
  vinculoDoMapa: string;
  vinculoDoWhatsapp: string;
  /** A casa como organizadora do convite: o e-mail que envia (SMTP_USUARIO). */
  organizador: { nome: string; email: string };
  /** A caixa do dono, que recebe os avisos (CONTATO_DESTINO). */
  dono: string;
};

/** Um evento na agenda do Google do dono (lib/agenda/google.ts): opcional, e a falha dele não desfaz a reserva. */
export type EventoDeCalendario = { inicio: Date; fim: Date; titulo: string; descricao: string };
export type CalendarioDoDono = {
  criarEvento(evento: EventoDeCalendario): Promise<string>;
  apagarEvento(eventoId: string): Promise<void>;
};

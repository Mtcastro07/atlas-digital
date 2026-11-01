// lib/agenda/reserva.ts — a reserva sem conflito (producao/esteira/14-funcionalidades/05-agenda.md, seções 4 e 5). Confere que o horário pedido
// está na lista calculada AGORA, com a antecedência mínima e a máxima, e que o profissional faz o serviço; sem profissional
// escolhido, fica com o primeiro livre. Grava a reserva e os blocos que ela ocupa pela porta do banco (Repositorio.reservar),
// onde a chave única (profissional, bloco) recusa o horário que outro pedido levou um instante antes. O código de
// cancelamento nasce aqui, vai no e-mail e só o hash chega ao banco. Sem dependência; só node:crypto, por codigo.ts.
import { hashDoCodigo, novoCodigo } from "./codigo.ts";
import { horariosDoServico } from "./consulta.ts";
import { dataEmNiteroi } from "./fuso.ts";
import type { ConfigDaAgenda, Repositorio, Reserva } from "./tipos.ts";

export type PedidoDeReserva = {
  servicoId: number;
  /** Nulo: sem preferência; o servidor escolhe o primeiro profissional livre naquele horário. */
  profissionalId: number | null;
  inicio: Date;
  nome: string;
  email: string;
  /** Só os algarismos, sem o 55 (lerTelefone), ou nulo. */
  telefone: string | null;
};

export type DesfechoDaReserva = { tipo: "reservada"; reserva: Reserva; codigo: string } | { tipo: "ocupado" };

/** "ocupado" vale para o horário que acabou de ser levado e também para o que nunca esteve na lista (pedido feito à mão): a resposta não ensina o que a regra deixa passar. */
export async function reservarHorario(repo: Repositorio, pedido: PedidoDeReserva, agora: Date, config: ConfigDaAgenda): Promise<DesfechoDaReserva> {
  const opcoes = await horariosDoServico(repo, {
    servicoId: pedido.servicoId,
    profissionalId: pedido.profissionalId,
    data: dataEmNiteroi(pedido.inicio),
    agora,
    config,
  });
  const opcao = opcoes.find((o) => o.inicio.getTime() === pedido.inicio.getTime());
  if (!opcao) return { tipo: "ocupado" };

  const servico = (await repo.servicos()).find((s) => s.id === pedido.servicoId);
  const profissional = (await repo.profissionais()).find((p) => p.id === opcao.profissionalId);
  if (!servico || !profissional) return { tipo: "ocupado" };

  const ocupaMin = servico.duracaoMin + servico.intervaloMin;
  const codigo = novoCodigo(); // 128 bits: vai no e-mail, nunca no banco
  const feita = await repo.reservar({
    profissionalId: profissional.id,
    servicoId: servico.id,
    inicio: pedido.inicio,
    ocupaMin,
    nome: pedido.nome,
    email: pedido.email,
    telefone: pedido.telefone,
    tokenHash: hashDoCodigo(codigo),
    criadaEm: agora,
  });
  if (!feita.ok) return { tipo: "ocupado" };

  const reserva: Reserva = {
    id: feita.reservaId,
    profissionalId: profissional.id,
    profissionalNome: profissional.nome,
    servicoId: servico.id,
    servicoNome: servico.nome,
    duracaoMin: servico.duracaoMin,
    intervaloMin: servico.intervaloMin,
    inicio: pedido.inicio,
    fim: new Date(pedido.inicio.getTime() + ocupaMin * 60_000),
    nome: pedido.nome,
    email: pedido.email,
    telefone: pedido.telefone,
    situacao: "confirmada",
    criadaEm: agora,
    canceladaEm: null,
    lembreteEnviadoEm: null,
    eventoGoogle: null,
  };
  return { tipo: "reservada", reserva, codigo };
}

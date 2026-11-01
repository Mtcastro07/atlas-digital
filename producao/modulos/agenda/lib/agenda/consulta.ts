// lib/agenda/consulta.ts — os horários livres de um serviço num dia, calculados a cada consulta, no servidor
// (producao/esteira/14-funcionalidades/05-agenda.md, seção 4): o expediente do profissional naquele dia da semana, menos as folgas,
// menos os blocos ocupados, menos o que fica antes da antecedência mínima e o que passa da máxima. Sem profissional
// escolhido, a lista é a união dos horários livres de quem faz o serviço, e cada horário fica com o primeiro que o tem
// livre. Nunca se confia na lista que o navegador devolve: a reserva consulta de novo (reserva.ts).
import { dataValida, diaDaSemana, instanteEmNiteroi, somarDias } from "./fuso.ts";
import { horariosLivres } from "./livres.ts";
import type { ConfigDaAgenda, Repositorio } from "./tipos.ts";

export type Opcao = { inicio: Date; profissionalId: number };

export async function horariosDoServico(
  repo: Repositorio,
  p: {
    servicoId: number;
    /** Nulo: sem preferência. */
    profissionalId: number | null;
    /** O dia em Niterói, "2026-10-09". */
    data: string;
    agora: Date;
    config: ConfigDaAgenda;
  },
): Promise<Opcao[]> {
  if (!dataValida(p.data)) return [];
  const servico = (await repo.servicos()).find((s) => s.id === p.servicoId);
  if (!servico) return [];
  // O profissional que não faz o serviço não entra: o pedido feito à mão com ele dá lista vazia.
  const quem = (await repo.profissionais())
    .filter((x) => x.servicosIds.includes(servico.id) && (p.profissionalId === null || x.id === p.profissionalId))
    .sort((a, b) => a.id - b.id);
  const dia = diaDaSemana(p.data);
  // A janela das consultas ao banco: o dia de Niterói e um dia de cada lado (a reserva que atravessa a meia-noite).
  const de = instanteEmNiteroi(somarDias(p.data, -1), "00:00");
  const ate = instanteEmNiteroi(somarDias(p.data, 2), "00:00");

  const porInstante = new Map<number, Opcao>();
  for (const profissional of quem) {
    const faixas = await repo.faixasDoDia(profissional.id, dia);
    if (faixas.length === 0) continue;
    const ocupados = await repo.ocupados(profissional.id, de, ate);
    const livres = horariosLivres({
      data: p.data,
      faixas,
      duracaoMin: servico.duracaoMin,
      intervaloMin: servico.intervaloMin,
      ocupados,
      agora: p.agora,
      antecedenciaMinimaMin: p.config.antecedenciaMinimaMin,
      antecedenciaMaximaMin: p.config.antecedenciaMaximaMin,
    });
    for (const inicio of livres) if (!porInstante.has(inicio.getTime())) porInstante.set(inicio.getTime(), { inicio, profissionalId: profissional.id });
  }
  return [...porInstante.values()].sort((a, b) => a.inicio.getTime() - b.inicio.getTime());
}

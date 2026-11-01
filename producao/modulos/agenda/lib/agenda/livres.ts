// lib/agenda/livres.ts — os horários livres de um profissional num dia (producao/esteira/14-funcionalidades/05-agenda.md, seção 4).
// Puro: recebe tudo, inclusive o "agora". Um horário só aparece se o serviço e o intervalo depois dele couberem sem
// tocar outra reserva; o serviço tem de terminar até o fechamento, mas o intervalo pode passar dele.
import { dataValida, instanteEmNiteroi } from "./fuso.ts";
import type { Faixa, Intervalo } from "./tipos.ts";

export const BLOCO_MS = 15 * 60_000;

export function horariosLivres(p: {
  data: string; // o dia, em Niterói: "2026-10-09"
  faixas: readonly Faixa[]; // o expediente desse dia da semana
  duracaoMin: number;
  intervaloMin: number;
  ocupados: readonly Intervalo[]; // reservas (com o intervalo) e folgas do dia
  agora: Date;
  antecedenciaMinimaMin: number;
  antecedenciaMaximaMin: number; // 30 dias = 43_200 (conteudo/agenda.ts)
}) {
  if (!dataValida(p.data)) return [];
  const livres: Date[] = [];
  const limite = p.agora.getTime() + p.antecedenciaMinimaMin * 60_000;
  const teto = p.agora.getTime() + p.antecedenciaMaximaMin * 60_000;
  for (const f of p.faixas) {
    const abre = instanteEmNiteroi(p.data, f.abre).getTime();
    const fecha = instanteEmNiteroi(p.data, f.fecha).getTime();
    for (let inicio = abre; inicio + p.duracaoMin * 60_000 <= fecha; inicio += BLOCO_MS) {
      const fim = inicio + (p.duracaoMin + p.intervaloMin) * 60_000; // o intervalo pode passar do fechamento
      const choca = p.ocupados.some((o) => inicio < o.fim.getTime() && o.inicio.getTime() < fim);
      if (inicio >= limite && inicio <= teto && !choca) livres.push(new Date(inicio));
    }
  }
  return livres;
}

// app/agendar/acoes.ts — a Server Action da reserva (producao/esteira/14-funcionalidades/05-agenda.md, seção 5). Só liga ao Next o que
// lib/agenda/processar.ts decide: os dados do formulário, o IP, o carimbo e o limite do formulário, e a confirmação (303).
"use server";

import { refresh } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { config } from "@/conteudo/agenda";
import { contextoDoNegocio } from "@/lib/agenda/contexto";
import { armazem, calendario, correio, repositorio } from "@/lib/agenda/destino";
import { processarReserva } from "@/lib/agenda/processar";
import type { EstadoDaReserva } from "@/lib/agenda/processar";
import { emitirCarimbo, lerCarimbo } from "@/lib/formulario/carimbo";
import { ipDoVisitante } from "@/lib/formulario/entrada";
import { contarEnvio, LIMITE_POR_HORA } from "@/lib/formulario/limite";

export async function reservarHorario(_anterior: EstadoDaReserva, dados: FormData): Promise<EstadoDaReserva> {
  const resultado = await processarReserva(dados, ipDoVisitante(await headers()), {
    repo: repositorio(),
    correio,
    ctx: contextoDoNegocio(),
    config,
    google: calendario,
    protecao: { lerCarimbo, emitirCarimbo, contarEnvio: (ip, agora) => contarEnvio(ip, armazem, agora), limitePorHora: LIMITE_POR_HORA },
  });

  if (resultado.tipo === "estado") {
    // O horário levado por outro pedido: a página volta recalculada, sem o horário que acabou.
    if (resultado.estado.situacao === "ocupado") refresh();
    return resultado.estado;
  }
  // "descartado" (robô) e "reservada": a mesma confirmação. O redirect funciona lançando; por isso fica fora de qualquer try.
  if (resultado.tipo === "descartado") redirect("/agendar/confirmado");
  // Se o e-mail não saiu, a confirmação mostra o dia e a hora na tela (o horário não é dado pessoal).
  redirect(resultado.emailEnviado ? "/agendar/confirmado" : `/agendar/confirmado?email=falhou&inicio=${encodeURIComponent(resultado.inicio.toISOString())}`);
}

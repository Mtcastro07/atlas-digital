// app/contato/acoes.ts — a Server Action do formulário de contato (producao/esteira/14-funcionalidades/02-formulario.md, seção 3.2).
// Só liga ao Next o que lib/formulario/processar.ts decide: os dados do formulário, o IP e a confirmação (303).
"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { servicos } from "@/conteudo/formulario";
import { armazem, entrega } from "@/lib/formulario/destino";
import { ipDoVisitante } from "@/lib/formulario/entrada";
import { processarEnvio } from "@/lib/formulario/processar";
import type { EstadoDoEnvio } from "@/lib/formulario/processar";

export async function enviarContato(_anterior: EstadoDoEnvio, dados: FormData): Promise<EstadoDoEnvio> {
  const resultado = await processarEnvio(dados, ipDoVisitante(await headers()), { servicos: servicos.map((s) => s.id), entrega, armazem });
  if (resultado.tipo === "estado") return resultado.estado;
  // "enviado" ou "descartado" (robô): a mesma confirmação. O redirect funciona lançando; por isso fica fora de qualquer try.
  redirect("/contato/enviado");
}

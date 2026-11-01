// app/cancelar/[codigo]/acoes.ts — a Server Action do cancelamento pela pessoa (producao/esteira/14-funcionalidades/05-agenda.md, seção 8). O vínculo do
// e-mail abre a página e não cancela; o cancelamento acontece aqui, no ENVIO do formulário (POST). Filtros de e-mail e
// prévias de mensagem abrem vínculos sozinhos, e um cancelamento por GET cancelaria reservas que ninguém quis cancelar.
"use server";

import { redirect } from "next/navigation";
import { config } from "@/conteudo/agenda";
import { cancelarPelaPessoa } from "@/lib/agenda/cancelamento";
import { contextoDoNegocio } from "@/lib/agenda/contexto";
import { calendario, correio, repositorio } from "@/lib/agenda/destino";
import { ehCodigoDeCancelamento } from "@/lib/agenda/codigo";
import { campo } from "@/lib/formulario/entrada";

export async function cancelarReserva(dados: FormData) {
  const codigo = campo(dados, "codigo");
  if (!ehCodigoDeCancelamento(codigo)) redirect("/cancelar/invalido"); // o que não tem o formato nem chega ao banco
  const resultado = await cancelarPelaPessoa({ repo: repositorio(), correio, ctx: contextoDoNegocio(), config, google: calendario }, codigo);
  // Volta à página do vínculo: ela diz o que aconteceu. "feito" só marca o cancelamento que acabou de ser feito.
  redirect(`/cancelar/${encodeURIComponent(codigo)}${resultado.tipo === "cancelada" ? "?feito=1" : ""}`);
}

// app/api/lembretes/route.ts — o endereço que a tarefa agendada do hPanel chama a cada 15 minutos (*/15 * * * *) para mandar
// o lembrete da véspera (producao/esteira/14-funcionalidades/05-agenda.md, seção 7). O web app dorme sem tráfego: nada pode depender de um relógio dentro
// dele, e a chamada da tarefa o acorda. Protegido por segredo, conferido em tempo constante; sem o segredo, 401 e nada
// enviado. A tarefa (o segredo fica só aqui e nas variáveis do app):
//   curl -fsS -X POST -H "Authorization: Bearer <SEGREDO_DO_CRON>" https://<domínio>/api/lembretes > /dev/null
import { contextoDoNegocio } from "@/lib/agenda/contexto";
import { correio, repositorio } from "@/lib/agenda/destino";
import { autorizadoPeloSegredo, enviarLembretes } from "@/lib/agenda/tarefas";

export async function POST(request: Request) {
  if (!autorizadoPeloSegredo(request.headers.get("authorization"), process.env.SEGREDO_DO_CRON)) return new Response(null, { status: 401 });
  return Response.json(await enviarLembretes({ repo: repositorio(), correio, ctx: contextoDoNegocio() }));
}

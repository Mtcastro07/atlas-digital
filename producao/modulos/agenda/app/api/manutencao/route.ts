// app/api/manutencao/route.ts — a tarefa diária do hPanel (às 3h UTC, meia-noite em Niterói): apaga o limite de envios e o
// sal do dia anterior, as sessões vencidas do painel e as reservas que passaram do prazo de guarda (producao/esteira/14-funcionalidades/05-agenda.md,
// seções 7 e 12). O mesmo segredo do lembrete:
//   curl -fsS -X POST -H "Authorization: Bearer <SEGREDO_DO_CRON>" https://<domínio>/api/manutencao > /dev/null
import { config } from "@/conteudo/agenda";
import { armazem, repositorio } from "@/lib/agenda/destino";
import { autorizadoPeloSegredo, manter } from "@/lib/agenda/tarefas";

export async function POST(request: Request) {
  if (!autorizadoPeloSegredo(request.headers.get("authorization"), process.env.SEGREDO_DO_CRON)) return new Response(null, { status: 401 });
  return Response.json(await manter({ repo: repositorio(), armazem, config }));
}

// app/painel/sair.ts — a ação de sair do painel (producao/esteira/14-funcionalidades/05-agenda.md, seção 9). A sessão é apagada nos dois lados: a linha do
// banco e o cookie. O cookie sai com o mesmo Path e o Secure com que nasceu: o `cookies().delete(nome)` usa o path
// padrão "/", e o navegador manteria o cookie de /painel; e um Set-Cookie de nome __Secure- sem Secure é recusado.
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { repositorio } from "@/lib/agenda/destino";
import { ATRIBUTOS_DO_COOKIE, NOME_DO_COOKIE, fecharSessao } from "@/lib/painel/sessao";

export async function sair() {
  const loja = await cookies();
  await fecharSessao(repositorio(), loja.get(NOME_DO_COOKIE)?.value);
  loja.delete({ name: NOME_DO_COOKIE, ...ATRIBUTOS_DO_COOKIE });
  redirect("/painel");
}

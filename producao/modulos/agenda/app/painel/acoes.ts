// app/painel/acoes.ts — as Server Actions do painel do dono (producao/esteira/14-funcionalidades/05-agenda.md, seção 9). Cada ação, menos a de entrar,
// CONFERE A SESSÃO DE NOVO: desenhar a página só para quem entrou não é barreira, porque a ação pode ser chamada sem
// passar pela tela (guia de Server Actions do Next, "Authenticate and authorize"). Sem sessão, nada é executado e a
// pessoa cai na tela de entrada. Todas voltam ao painel com o desfecho no endereço, sem script e sem estado no cliente.
"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { config } from "@/conteudo/agenda";
import { contextoDoNegocio } from "@/lib/agenda/contexto";
import { armazem, calendario, correio, repositorio } from "@/lib/agenda/destino";
import { ipDoVisitante, campo } from "@/lib/formulario/entrada";
import { entrar } from "@/lib/painel/entrar";
import { apagarDadosDaPessoa, cancelarPeloDono, lerBloqueio, lerBusca } from "@/lib/painel/operacoes";
import { ATRIBUTOS_DO_COOKIE, DURACAO_DA_SESSAO_S, NOME_DO_COOKIE, donoDaSessao } from "@/lib/painel/sessao";

/** A sessão do cookie, ou a volta à tela de entrada: o que vem depois só roda para o dono. */
async function exigirSessao() {
  const dono = await donoDaSessao(repositorio(), (await cookies()).get(NOME_DO_COOKIE)?.value, new Date());
  if (dono === null) redirect("/painel");
}

/** Volta ao painel com o desfecho no endereço. O redirect funciona lançando: nada depois dele roda. */
function voltar(consulta = ""): never {
  redirect(`/painel${consulta}`);
}

export async function entrarNoPainel(dados: FormData) {
  const senha = dados.get("senha"); // a senha não se apara: espaço nas pontas pode fazer parte dela
  const resultado = await entrar({
    repo: repositorio(),
    armazem,
    email: campo(dados, "email"),
    senha: typeof senha === "string" ? senha : "",
    ip: ipDoVisitante(await headers()),
  });
  if (resultado.tipo !== "ok") voltar(`?erro=${resultado.tipo}`); // "recusada" e "limite"; a mesma resposta para e-mail inexistente e senha errada
  else {
    (await cookies()).set(NOME_DO_COOKIE, resultado.codigo, { ...ATRIBUTOS_DO_COOKIE, maxAge: DURACAO_DA_SESSAO_S });
    voltar();
  }
}

export async function cancelarNoPainel(dados: FormData) {
  await exigirSessao();
  const id = Number(campo(dados, "reserva"));
  const resultado = await cancelarPeloDono(
    { repo: repositorio(), correio, ctx: contextoDoNegocio(), google: calendario },
    Number.isInteger(id) ? id : 0,
    campo(dados, "motivo"),
  );
  if (resultado.tipo === "cancelada") voltar(resultado.emailEnviado ? "?ok=cancelada" : "?ok=canceladaSemEmail");
  voltar(`?ok=${resultado.tipo === "motivo-invalido" ? "motivoInvalido" : "jaCancelada"}`);
}

export async function bloquearHorario(dados: FormData) {
  await exigirSessao();
  const lido = lerBloqueio({
    profissional: campo(dados, "profissional"),
    dia: campo(dados, "dia"),
    diaFim: campo(dados, "dia_fim"),
    de: campo(dados, "de"),
    ate: campo(dados, "ate"),
    motivo: campo(dados, "motivo"),
  });
  if ("erros" in lido) voltar(`?erroDoBloqueio=${Object.keys(lido.erros)[0]}`);
  else {
    const repo = repositorio();
    const { folga } = lido;
    // O profissional tem de existir: o id vem do formulário.
    if (folga.profissionalId !== null && !(await repo.profissionais()).some((p) => p.id === folga.profissionalId)) voltar("?erroDoBloqueio=profissional");
    await repo.criarFolga(folga);
    voltar("?ok=bloqueada");
  }
}

export async function removerBloqueio(dados: FormData) {
  await exigirSessao();
  const id = Number(campo(dados, "folga"));
  if (Number.isInteger(id)) await repositorio().removerFolga(id);
  voltar("?ok=bloqueioRemovido");
}

export async function apagarPessoa(dados: FormData) {
  await exigirSessao();
  const busca = lerBusca(campo(dados, "busca"));
  if (!busca || dados.get("confirmo") !== "sim") voltar("?ok=buscaInvalida");
  else {
    const { apagadas } = await apagarDadosDaPessoa({ repo: repositorio(), google: calendario }, busca);
    voltar(apagadas === 0 ? "?ok=nadaParaApagar" : `?ok=apagados&n=${apagadas}`);
  }
}

// app/painel/page.tsx — o painel do dono (producao/esteira/14-funcionalidades/05-agenda.md, seção 9): com e-mail e senha; depois, as reservas dos próximos
// 14 dias por dia e profissional, o cancelamento com motivo (que vai por e-mail à pessoa), o bloqueio de um horário ou de
// um dia, e a busca e a eliminação dos dados de uma pessoa. Funciona sem script: cada ação volta ao painel com o desfecho
// no endereço. Fora da busca (metadados e, no next.config.ts, o X-Robots-Tag), e nunca em cache. A página só desenha: cada
// ação confere a sessão de novo (acoes.ts).
import { cookies } from "next/headers";
import { connection } from "next/server";
import { painel as t } from "@/conteudo/painel";
import { paginaDe } from "@/conteudo/site";
import { repositorio } from "@/lib/agenda/destino";
import { dataEmNiteroi, instanteEmNiteroi } from "@/lib/agenda/fuso";
import { diaPorExtenso, horaDeParede, quandoPorExtenso } from "@/lib/agenda/texto";
import { ERROS_DO_BLOQUEIO, lerBusca, reservasDosProximosDias } from "@/lib/painel/operacoes";
import { NOME_DO_COOKIE, donoDaSessao } from "@/lib/painel/sessao";
import { metadadosDaPagina } from "@/lib/metadados";
import { telefoneVisivel } from "@/lib/whatsapp";
import { apagarPessoa, bloquearHorario, cancelarNoPainel, entrarNoPainel, removerBloqueio } from "./acoes";
import { sair } from "./sair";

// Fora da busca (aqui e, no next.config.ts, pelo cabeçalho X-Robots-Tag), mas com título, descrição e cartão próprios.
export const metadata = {
  ...metadadosDaPagina({ ...paginaDe("agendar"), caminho: "/painel", ...t.metadados }),
  alternates: undefined,
  robots: { index: false, follow: false },
};

type Busca = Record<string, string | string[] | undefined>;
const um = (valor: string | string[] | undefined) => (Array.isArray(valor) ? valor[0] : valor) ?? "";

const CAMPO = "mt-2 min-h-12 w-full rounded-marcacao border border-border bg-card px-4 text-corpo hover:border-foreground/40";
/** O quadrado da caixa de confirmação: o traço aparece com a caixa marcada, e o anel de foco, com o foco do teclado. */
const CAIXA =
  "relative size-5 shrink-0 rounded-marcacao border-2 border-foreground/60 bg-card after:absolute after:top-0.5 after:left-1.5 after:h-2.5 after:w-1.5 after:rotate-45 after:border-r-2 after:border-b-2 after:border-primary-foreground after:opacity-0 peer-checked:border-primary peer-checked:bg-primary peer-checked:after:opacity-100 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ring";
const BOTAO = "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-[filter] duration-200 hover:brightness-110";
const BOTAO_DISCRETO = "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full border border-border bg-card px-5 font-semibold transition-colors duration-200 hover:bg-muted";

export default async function Painel({ searchParams }: { searchParams: Promise<Busca> }) {
  await connection(); // a sessão e as reservas são do momento do pedido
  const busca = await searchParams;
  const repo = repositorio();
  const agora = new Date();
  const dono = await donoDaSessao(repo, (await cookies()).get(NOME_DO_COOKIE)?.value, agora);
  if (dono === null) return <Entrada erro={um(busca.erro)} />;

  const hoje = dataEmNiteroi(agora);
  const [dias, profissionais, folgas] = await Promise.all([reservasDosProximosDias(repo, agora), repo.profissionais(), repo.folgasAPartirDe(instanteEmNiteroi(hoje, "00:00"))]);
  const nomeDe = (id: number | null) => (id === null ? t.bloqueio.casa : (profissionais.find((p) => p.id === id)?.nome ?? `#${id}`));

  // A busca por pessoa: o que se achou, para o dono ver antes de apagar.
  const termo = um(busca.busca);
  const alvo = termo ? lerBusca(termo) : null;
  const achadas = alvo ? await repo.buscarPessoa(alvo) : [];

  // O desfecho da última ação, pelo código que ela deixou no endereço (só os códigos conhecidos viram texto).
  const ok = um(busca.ok);
  const mensagem = ok === "apagados" ? t.apagados(Number(um(busca.n)) || 0) : Object.hasOwn(t.mensagens, ok) ? t.mensagens[ok] : "";
  const campoComErro = um(busca.erroDoBloqueio);
  const erroDoBloqueio = Object.hasOwn(ERROS_DO_BLOQUEIO, campoComErro) ? ERROS_DO_BLOQUEIO[campoComErro as keyof typeof ERROS_DO_BLOQUEIO] : "";

  return (
    <main id="conteudo" tabIndex={-1} className="envelope mx-auto max-w-pagina pt-14 pb-10 outline-none md:pt-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-titulo font-semibold">{t.titulo}</h1>
        <form action={sair}>
          <button type="submit" className={BOTAO_DISCRETO}>
            {t.sair}
          </button>
        </form>
      </div>
      {(mensagem || erroDoBloqueio) && (
        <p role="status" className="mt-6 max-w-[60ch] border-l-4 border-accent pl-4 font-semibold">
          {mensagem || erroDoBloqueio}
        </p>
      )}

      <section aria-labelledby="reservas" className="mt-12">
        <h2 id="reservas" className="text-numero font-semibold">
          {t.reservas.titulo}
        </h2>
        {dias.length === 0 ? (
          <p className="mt-4 text-muted-foreground">{t.reservas.nenhuma}</p>
        ) : (
          <div className="mt-6 grid gap-8">
            {dias.map((dia) => (
              <div key={dia.data}>
                <h3 className="text-destaque font-semibold first-letter:uppercase">{diaPorExtenso(dia.reservas[0].inicio)}</h3>
                <ul className="mt-3 grid gap-3">
                  {dia.reservas.map((r) => (
                    <li key={r.id} className="grid gap-3 rounded-cartao border border-border bg-card p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-start">
                      <div>
                        <p className="font-semibold tabular">
                          {horaDeParede(r.inicio)} · {r.servicoNome} · {r.profissionalNome}
                        </p>
                        <p>{r.nome}</p>
                        <p className="text-nota text-muted-foreground">
                          {r.email}
                          {r.telefone ? ` · ${telefoneVisivel(`55${r.telefone}`)}` : ""}
                        </p>
                      </div>
                      <form action={cancelarNoPainel} className="grid gap-2">
                        <input type="hidden" name="reserva" value={r.id} />
                        <label htmlFor={`motivo-${r.id}`} className="text-nota font-semibold">
                          {t.reservas.motivo}
                        </label>
                        <input id={`motivo-${r.id}`} name="motivo" type="text" required minLength={2} maxLength={200} className="min-h-11 rounded-marcacao border border-border bg-background px-3 text-corpo" />
                        <button type="submit" className={`${BOTAO_DISCRETO} justify-self-start`}>
                          {t.reservas.cancelar}
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="bloqueio" className="mt-16">
        <h2 id="bloqueio" className="text-numero font-semibold">
          {t.bloqueio.titulo}
        </h2>
        <form action={bloquearHorario} className="mt-6 grid max-w-xl gap-6">
          <div>
            <label htmlFor="b-profissional" className="block font-semibold">
              {t.bloqueio.profissional}
            </label>
            <select id="b-profissional" name="profissional" defaultValue="casa" className={CAMPO}>
              <option value="casa">{t.bloqueio.casa}</option>
              {profissionais.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="b-dia" className="block font-semibold">
                {t.bloqueio.dia}
              </label>
              <input id="b-dia" name="dia" type="date" required min={hoje} className={CAMPO} />
            </div>
            <div>
              <label htmlFor="b-dia-fim" className="block font-semibold">
                {t.bloqueio.diaFim}
              </label>
              <input id="b-dia-fim" name="dia_fim" type="date" min={hoje} className={CAMPO} />
            </div>
            <div>
              <label htmlFor="b-de" className="block font-semibold">
                {t.bloqueio.de}
              </label>
              <input id="b-de" name="de" type="time" step={900} className={CAMPO} />
            </div>
            <div>
              <label htmlFor="b-ate" className="block font-semibold">
                {t.bloqueio.ate}
              </label>
              <input id="b-ate" name="ate" type="time" step={900} className={CAMPO} />
            </div>
          </div>
          <p className="-mt-3 text-nota text-muted-foreground">{t.bloqueio.dicaDoHorario}</p>
          <div>
            <label htmlFor="b-motivo" className="block font-semibold">
              {t.bloqueio.motivo}
            </label>
            <input id="b-motivo" name="motivo" type="text" required minLength={2} maxLength={80} className={CAMPO} />
          </div>
          <button type="submit" className={`${BOTAO} justify-self-start`}>
            {t.bloqueio.botao}
          </button>
        </form>

        <h3 className="mt-10 text-destaque font-semibold">{t.bloqueio.lista}</h3>
        {folgas.length === 0 ? (
          <p className="mt-3 text-muted-foreground">{t.bloqueio.nenhum}</p>
        ) : (
          <ul className="mt-3 grid gap-3">
            {folgas.map((f) => (
              <li key={f.id} className="flex flex-wrap items-center justify-between gap-3 rounded-cartao border border-border bg-card p-5">
                <p>
                  <span className="font-semibold">{nomeDe(f.profissionalId)}</span> · <span className="tabular">{quandoPorExtenso(f.inicio)}</span> até <span className="tabular">{quandoPorExtenso(f.fim)}</span> · {f.motivo}
                </p>
                <form action={removerBloqueio}>
                  <input type="hidden" name="folga" value={f.id} />
                  <button type="submit" className={BOTAO_DISCRETO}>
                    {t.bloqueio.remover}
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="pessoa" className="mt-16">
        <h2 id="pessoa" className="text-numero font-semibold">
          {t.pessoa.titulo}
        </h2>
        <p className="mt-3 max-w-[60ch] text-muted-foreground">{t.pessoa.lide}</p>
        <form action="/painel" method="get" className="mt-6 grid max-w-xl gap-3">
          <label htmlFor="busca" className="block font-semibold">
            {t.pessoa.busca}
          </label>
          <input id="busca" name="busca" type="text" required defaultValue={termo} className={CAMPO} />
          <button type="submit" className={`${BOTAO_DISCRETO} justify-self-start`}>
            {t.pessoa.procurar}
          </button>
        </form>
        {termo && !alvo && <p className="mt-4 font-semibold">{t.mensagens.buscaInvalida}</p>}
        {alvo && (
          <div className="mt-6">
            <p className="font-semibold">{t.pessoa.achadas(achadas.length)}</p>
            {achadas.length > 0 && (
              <>
                <ul className="mt-3 grid gap-2">
                  {achadas.map((r) => (
                    <li key={r.id} className="rounded-marcacao border border-border bg-card px-4 py-3 text-nota">
                      <span className="tabular">{quandoPorExtenso(r.inicio)}</span> · {r.servicoNome} · {r.profissionalNome} · {r.nome} · {r.situacao}
                    </li>
                  ))}
                </ul>
                <form action={apagarPessoa} className="mt-6 grid max-w-xl gap-4">
                  <input type="hidden" name="busca" value={termo} />
                  <label className="relative flex min-h-11 cursor-pointer items-center gap-3">
                    {/* A caixa nativa cobre a linha inteira (alvo de 44 px) e some; o quadrado é o desenho. */}
                    <input type="checkbox" name="confirmo" value="sim" required className="peer absolute inset-0 size-full cursor-pointer opacity-0" />
                    <span aria-hidden="true" className={CAIXA} />
                    {t.pessoa.confirmo}
                  </label>
                  <button type="submit" className={`${BOTAO} justify-self-start`}>
                    {t.pessoa.apagar}
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

function Entrada({ erro }: { erro: string }) {
  const mensagem = erro === "limite" ? t.entrar.limite : erro === "recusada" ? t.entrar.recusada : "";
  return (
    <main id="conteudo" tabIndex={-1} className="envelope mx-auto max-w-pagina pt-14 pb-10 outline-none md:pt-20">
      <h1 className="text-titulo font-semibold">{t.entrar.titulo}</h1>
      <form action={entrarNoPainel} className="mt-8 grid max-w-md gap-6">
        {mensagem && (
          <p role="alert" className="rounded-marcacao border-l-4 border-accent bg-muted px-4 py-3 font-semibold">
            {mensagem}
          </p>
        )}
        <div>
          <label htmlFor="email" className="block font-semibold">
            {t.entrar.email}
          </label>
          <input id="email" name="email" type="email" autoComplete="username" required spellCheck={false} autoCapitalize="none" className={CAMPO} />
        </div>
        <div>
          <label htmlFor="senha" className="block font-semibold">
            {t.entrar.senha}
          </label>
          <input id="senha" name="senha" type="password" autoComplete="current-password" required className={CAMPO} />
        </div>
        <button type="submit" className={`${BOTAO} justify-self-start`}>
          {t.entrar.botao}
        </button>
      </form>
    </main>
  );
}

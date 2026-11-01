// app/agendar/page.tsx — a marcação: escolher o serviço e o dia, ver os horários livres e reservar (producao/esteira/14-funcionalidades/05-agenda.md,
// seções 4 e 5). Funciona sem script: um <Form> do next/form (GET) pede a página com o serviço, o profissional e o dia no
// endereço; a página, dinâmica, calcula os horários livres no servidor a cada pedido e os lista como opções; os dados da
// pessoa e o "Reservar" vão num segundo formulário, para a Server Action (components/ilhas/formulario-de-reserva.tsx).
import Form from "next/form";
import { connection } from "next/server";
import { AcaoWhatsApp } from "@/components/acao-whatsapp";
import { FormularioDeReserva } from "@/components/ilhas/formulario-de-reserva";
import { config, paginaDeAgendar as t, textosDaReserva } from "@/conteudo/agenda";
import { negocio } from "@/conteudo/negocio";
import { paginaDe } from "@/conteudo/site";
import { horariosDoServico } from "@/lib/agenda/consulta";
import { repositorio } from "@/lib/agenda/destino";
import { dataEmNiteroi, dataValida, instanteEmNiteroi } from "@/lib/agenda/fuso";
import { diaPorExtenso, horaDeParede } from "@/lib/agenda/texto";
import { emitirCarimbo } from "@/lib/formulario/carimbo";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina(paginaDe("agendar"));

const um = (valor: string | string[] | undefined) => (Array.isArray(valor) ? valor[0] : valor) ?? "";

const CONTROLE = "mt-2 min-h-12 w-full rounded-marcacao border border-border bg-card px-4 text-corpo hover:border-foreground/40";
/** O círculo do rádio: o ponto aparece com o rádio marcado, e o anel de foco, com o foco do teclado. */
const RADIO =
  "relative size-5 shrink-0 rounded-full border-2 border-foreground/60 bg-card after:absolute after:inset-1 after:rounded-full after:bg-primary after:opacity-0 peer-checked:border-primary peer-checked:after:opacity-100 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ring";

export default async function Agendar({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await connection(); // os horários livres e o carimbo são do momento do pedido: esta página não sai pronta da compilação
  const busca = await searchParams;
  const agora = new Date();
  const repo = repositorio();
  // Banco fora do ar: a página abre com o aviso e o WhatsApp, nunca com a tela de erro, que não tem saída (05-agenda.md, seção 4).
  const foraDoAr = (erro: unknown) => {
    console.error("agenda: o banco não respondeu:", erro instanceof Error ? erro.message : erro);
    return null;
  };
  const catalogo = await Promise.all([repo.servicos(), repo.profissionais()]).catch(foraDoAr);
  const [servicos, profissionais] = catalogo ?? [[], []];

  // O que veio no endereço: nunca se confia nele; o que não bate vira "nada escolhido".
  const servico = servicos.find((s) => String(s.id) === um(busca.servico));
  const escolhido = um(busca.profissional) || "qualquer";
  const profissional = escolhido === "qualquer" ? undefined : profissionais.find((p) => String(p.id) === escolhido);
  const profissionalValido = escolhido === "qualquer" || Boolean(profissional);
  const dia = um(busca.dia);
  const hoje = dataEmNiteroi(agora);
  const ultimo = dataEmNiteroi(new Date(agora.getTime() + config.antecedenciaMaximaMin * 60_000));

  let opcoes: Awaited<ReturnType<typeof horariosDoServico>> | null = null;
  let aviso = "";
  if (servico && dia) {
    if (!dataValida(dia)) aviso = t.diaInvalido;
    else if (!profissionalValido || (profissional && !profissional.servicosIds.includes(servico.id))) aviso = t.profissionalNaoFaz;
    else {
      opcoes = await horariosDoServico(repo, { servicoId: servico.id, profissionalId: profissional?.id ?? null, data: dia, agora, config }).catch(foraDoAr);
      if (!opcoes) aviso = t.foraDoAr;
    }
  }

  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      <section className="envelope mx-auto max-w-pagina pt-14 pb-10 md:pt-20">
        <h1 className="max-w-[16ch] text-display font-semibold">{paginaDe("agendar").titulo}</h1>
        <p className="mt-6 max-w-[52ch] text-destaque text-muted-foreground">{t.lide}</p>
        <div className="mt-8">
          <AcaoWhatsApp discreta />
        </div>
      </section>

      <section aria-labelledby="escolha" className="envelope mx-auto max-w-pagina pb-10">
        <h2 id="escolha" className="text-titulo font-semibold">
          {t.escolha}
        </h2>
        {servicos.length === 0 ? (
          <div className="mt-6 grid justify-items-start gap-4">
            <p className="text-muted-foreground">{catalogo ? t.semServicos : t.foraDoAr}</p>
            <AcaoWhatsApp />
          </div>
        ) : (
          <Form action="/agendar" className="mt-6 grid max-w-xl content-start gap-8">
            <fieldset>
              <legend className="font-semibold">{t.servico}</legend>
              <div className="mt-2 grid gap-1">
                {servicos.map((s) => (
                  <label key={s.id} htmlFor={`servico-${s.id}`} className="relative flex min-h-11 cursor-pointer items-center gap-3 rounded-marcacao px-1 hover:bg-muted">
                    {/* O rádio nativo cobre a linha inteira (alvo de 44 px) e some; o círculo é o desenho. */}
                    <input
                      id={`servico-${s.id}`}
                      type="radio"
                      name="servico"
                      value={s.id}
                      required
                      defaultChecked={servico?.id === s.id || servicos.length === 1}
                      className="peer absolute inset-0 size-full cursor-pointer opacity-0"
                    />
                    <span aria-hidden="true" className={RADIO} />
                    {s.nome}
                  </label>
                ))}
              </div>
            </fieldset>

            {profissionais.length > 1 && (
              <div>
                <label htmlFor="profissional" className="block font-semibold">
                  {t.profissional}
                </label>
                <select id="profissional" name="profissional" defaultValue={profissionalValido ? escolhido : "qualquer"} className={CONTROLE}>
                  <option value="qualquer">{t.semPreferencia}</option>
                  {profissionais.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="dia" className="block font-semibold">
                {t.dia}
              </label>
              <input id="dia" name="dia" type="date" required min={hoje} max={ultimo} defaultValue={dataValida(dia) ? dia : undefined} className={`${CONTROLE} max-w-xs`} />
            </div>

            <button
              type="submit"
              className="inline-flex min-h-12 min-w-52 cursor-pointer items-center justify-center justify-self-start rounded-full border border-border bg-card px-7 font-semibold transition-colors duration-200 hover:bg-muted"
            >
              {t.verHorarios}
            </button>
          </Form>
        )}
        {aviso && (
          <p role="status" className="mt-6 max-w-[52ch] border-l-4 border-accent pl-4 font-semibold">
            {aviso}
          </p>
        )}
      </section>

      {servico && opcoes && (
        <section aria-labelledby="horarios" className="envelope mx-auto max-w-pagina pb-14">
          <h2 id="horarios" className="text-titulo font-semibold">
            {t.horarios}
          </h2>
          <p className="mt-4 text-destaque text-muted-foreground">
            {servico.nome}, {diaPorExtenso(instanteEmNiteroi(dia, "12:00"))}
          </p>
          {opcoes.length === 0 ? (
            <div className="mt-6 grid justify-items-start gap-4">
              <p className="max-w-[52ch]">{t.nenhumHorario}</p>
              <AcaoWhatsApp discreta />
            </div>
          ) : (
            <div className="mt-8 max-w-xl">
              <h3 className="sr-only">{t.seusDados}</h3>
              <FormularioDeReserva
                carimbo={emitirCarimbo()}
                servicoId={servico.id}
                profissional={escolhido}
                horarios={opcoes.map((o) => ({ valor: o.inicio.toISOString(), rotulo: horaDeParede(o.inicio) }))}
                textos={textosDaReserva}
                whatsapp={negocio.whatsapp}
                consentimento={config.consentimento ?? null}
              />
            </div>
          )}
        </section>
      )}
    </main>
  );
}

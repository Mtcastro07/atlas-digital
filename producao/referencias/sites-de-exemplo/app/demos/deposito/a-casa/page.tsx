import { Moldura } from "@/components/demos/deposito/moldura";
import { Abertura, atraso, BotaoWhatsApp, envelope, metadadosDe } from "@/components/demos/deposito/pecas";
import { depositoSite as site } from "@/conteudo/demos/deposito";

export const metadata = metadadosDe("a-casa");

/**
 * 05 · A casa. Os quatro fatos em números de placa, cada um com o seu
 * código; as perguntas frequentes, numeradas (P-01 a P-04), que abrem uma
 * de cada vez; e a placa do endereço com o horário.
 */
export default function PaginaDaCasa() {
  const { casa, fatos, duvidas, horario } = site;
  return (
    <Moldura pagina="a-casa">
      <Abertura pagina="a-casa" titulo={casa.titulo} lide={casa.lide} />

      <section aria-label="A casa em números" className={`${envelope} py-20`}>
        {/* A primeira coluna de cada linha começa na borda e a última termina nela (até 03/10, sobravam 24 px à direita da última). */}
        <dl className="grid border-t-2 border-foreground md:grid-cols-2 lg:grid-cols-4">
          {fatos.map((f, i) => (
            <div
              key={f.codigo}
              data-revelar
              style={atraso(i * 90)}
              className="border-b border-foreground/20 py-9 md:px-6 md:even:border-l lg:not-first:border-l lg:first:pl-0 lg:last:pr-0 md:max-lg:odd:pl-0 md:max-lg:even:pr-0"
            >
              <dt className="dp-codigo text-accent">{f.codigo}</dt>
              <dd className="dp-exibicao mt-5 text-[clamp(76px,8.4vw,132px)] leading-[0.8] font-bold tabular-nums">{f.valor}</dd>
              <dd className="mt-5 max-w-[22ch] text-[16px] leading-snug text-muted-foreground">{f.rotulo}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="perguntas" className={`${envelope} grid gap-12 pb-24 lg:grid-cols-12`}>
        <h2 id="perguntas" className="dp-exibicao text-[clamp(36px,4.2vw,64px)] leading-[0.92] lg:col-span-4">
          {duvidas.titulo}
        </h2>
        <div className="border-t-2 border-foreground lg:col-span-8">
          {duvidas.itens.map((d, i) => (
            <details key={d.pergunta} name="perguntas-do-deposito" className="group border-b border-foreground/25">
              {/* Sob o ponteiro, a pergunta na cor de ação e o "+" com o fio inteiro (até 03/10, sem hover). O giro do "+" escreve a propriedade rotate (Tailwind 4), que entra na lista da transição (até 03/10, estalava). A resposta recua o código e o intervalo: 48 + 16 = 64 px (até 03/10, 48 + 20 = 68, fora da escala). */}
              <summary className="group/pergunta flex min-h-16 cursor-pointer list-none items-center gap-4 py-5 transition-colors duration-300 hover:text-accent [&::-webkit-details-marker]:hidden">
                <span className="dp-codigo w-12 flex-none text-accent">P-{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-[19px] font-semibold">{d.pergunta}</span>
                <span
                  aria-hidden="true"
                  className="dp-exibicao grid size-11 flex-none place-items-center border border-foreground/40 text-[22px] text-foreground transition-[rotate,background-color,border-color] duration-300 group-open:rotate-45 group-open:bg-primary group-hover/pergunta:border-foreground"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[64ch] pb-7 pl-16 text-[17px] leading-relaxed text-muted-foreground">{d.resposta}</p>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="endereco" className="dp-grafite">
        <div className={`${envelope} grid gap-10 py-20 lg:grid-cols-12 lg:items-end`}>
          <div className="lg:col-span-6">
            <p className="dp-codigo text-accent">Endereço</p>
            <h2 id="endereco" className="dp-exibicao mt-5 text-[clamp(36px,4.2vw,64px)] leading-[0.92]">
              {site.endereco}
            </h2>
            <p className="mt-4 text-[18px] text-muted-foreground">
              {site.bairro} · {horario.nota}
            </p>
          </div>
          <dl className="lg:col-span-4 lg:col-start-8">
            {horario.dias.map((h) => (
              <div key={h.dia} className="flex items-baseline justify-between gap-6 border-t border-border py-3.5">
                <dt className="text-[15px] text-muted-foreground">{h.dia}</dt>
                <dd className="dp-exibicao text-[22px] tracking-[0.03em]">{h.hora}</dd>
              </div>
            ))}
          </dl>
          <div className="lg:col-span-12">
            <BotaoWhatsApp grande />
          </div>
        </div>
      </section>
    </Moldura>
  );
}

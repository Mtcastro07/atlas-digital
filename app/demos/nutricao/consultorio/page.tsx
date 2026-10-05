import { Moldura } from "@/components/demos/nutricao/moldura";
import { AcaoWhatsApp, atraso, Continua, entreSecoes, envelope, Folio, MapaGravado, metadadosDe, Titulo } from "@/components/demos/nutricao/pecas";
import { nutricaoSite as site } from "@/conteudo/demos/nutricao";

export const metadata = metadadosDe("consultorio");

/**
 * III · O consultório. O mapa gravado como figura numerada, com legenda;
 * ao lado, o endereço e como chegar. Embaixo, a semana inteira numa linha
 * — sete colunas, o dia sobre o horário —, como a grade de uma agenda.
 */
export default function PaginaDoConsultorio() {
  const { consultorio } = site;
  return (
    <Moldura pagina="consultorio">
      <section aria-labelledby="titulo" className={envelope}>
        <Folio pagina="consultorio" rotulo="Endereço, horário e mapa" />
        <Titulo
          id="titulo"
          como="h1"
          linhas={consultorio.titulo}
          className="dm-entra mt-12 text-[clamp(60px,8.6vw,140px)] leading-[0.88] tracking-[-0.036em]"
        />
      </section>

      <section aria-label="Endereço e mapa" className={`${envelope} mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:items-start`}>
        <figure className="lg:col-span-8" data-revelar>
          <div className="overflow-hidden border-2 border-foreground">
            <MapaGravado />
          </div>
          <figcaption className="mt-4 text-[16.5px] text-muted-foreground italic">
            <span className="nt-versal mr-2 not-italic">Fig. 1</span>
            {consultorio.legendaDoMapa}.
          </figcaption>
        </figure>
        <div className="lg:col-span-4" data-revelar style={atraso(120)}>
          <p className="nt-versal border-b border-foreground pb-3 text-[16px]">Endereço</p>
          <address className="nt-exibicao mt-5 text-[clamp(28px,2.4vw,34px)] leading-[1.15] not-italic">
            {site.endereco}
            <br />
            <span className="italic">{site.bairro}</span>
          </address>
          <p className="mt-5 text-[17.5px] leading-[1.6] text-muted-foreground">{consultorio.referencia}</p>
          <p className="nt-versal mt-12 border-b border-foreground pb-3 text-[16px]">Como chegar</p>
          <dl>
            {consultorio.chegada.map((c) => (
              <div key={c.modo} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-border py-4 text-[17px]">
                <dt className="nt-versal text-muted-foreground">{c.modo}</dt>
                <dd>{c.texto}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <AcaoWhatsApp grande />
          </div>
        </div>
      </section>

      {/* A semana numa linha. */}
      <section aria-labelledby="horario" className={`${envelope} ${entreSecoes}`}>
        <h2 id="horario" className="nt-exibicao text-[clamp(40px,4.6vw,72px)] leading-none tracking-[-0.03em]">
          Horário de <span className="italic">atendimento</span>
        </h2>
        <dl className="mt-12 grid border-y-2 border-foreground sm:grid-cols-2 lg:grid-cols-7">
          {consultorio.horarios.map((h, i) => {
            const fechado = h.hora === "Fechado";
            // A primeira coluna de cada linha começa na borda, alinhada ao título (até 03/10, recuada 20 px no celular e no tablet).
            return (
              <div
                key={h.dia}
                data-revelar
                style={atraso(i * 60)}
                className="border-border px-5 py-7 max-sm:px-0 max-lg:border-b sm:max-lg:odd:pl-0 lg:not-last:border-r lg:first:pl-0"
              >
                <dt className="nt-versal text-[16px] text-muted-foreground">{h.dia}</dt>
                <dd className={`nt-exibicao mt-3 text-[clamp(24px,2vw,28px)] leading-tight ${fechado ? "text-muted-foreground italic" : ""}`}>{h.hora}</dd>
              </div>
            );
          })}
        </dl>
      </section>

      <Continua pagina="consultorio" />
    </Moldura>
  );
}

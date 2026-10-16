import { IconeWhatsApp } from "@/components/icones";
import { Moldura } from "@/components/demos/nutricao/moldura";
import { Continua, entreSecoes, envelope, MapaGravado, metadadosDe, SimboloDoModo, Titulo, vinculoWhatsApp } from "@/components/demos/nutricao/pecas";
import { nutricaoSite as site } from "@/conteudo/demos/nutricao";

export const metadata = metadadosDe("consultorio");

/** Os dias seguidos com o mesmo horário, juntos ("Segunda a quinta", "Sábado e domingo"): o horário no celular. */
function diasJuntos(horarios: readonly { dia: string; hora: string }[]) {
  const grupos: { dias: string[]; hora: string }[] = [];
  for (const h of horarios) {
    const ultimo = grupos.at(-1);
    if (ultimo?.hora === h.hora) ultimo.dias.push(h.dia);
    else grupos.push({ dias: [h.dia], hora: h.hora });
  }
  return grupos.map(({ dias, hora }) => {
    const [primeiro, fim] = [dias[0], dias.at(-1)!.toLowerCase()];
    return { rotulo: dias.length === 1 ? primeiro : `${primeiro} ${dias.length === 2 ? "e" : "a"} ${fim}`, hora };
  });
}

/**
 * III · O consultório. A abertura é o mapa gravado (crítico de fora, 14.10.2026; até então, a página abria com o
 * mesmo molde inerte de Valores, e o mapa ficava abaixo da dobra): na mesa, o título na cartela, o canto do mapa, como
 * num mapa impresso; no celular, em cima dele, e o mapa recortado em volta do consultório. O momento da página: o
 * caminho a pé desde o Campo de São Bento se marca, traço a traço, e o consultório se carimba na ponta dele. Embaixo,
 * o endereço e a legenda do mapa (como chegar, com o símbolo de cada modo, o mesmo que está no mapa, que responde sob o
 * ponteiro e no toque); a semana numa linha de sete colunas, como a grade de uma agenda, e, no celular, os dias com o
 * mesmo horário juntos.
 */
export default function PaginaDoConsultorio() {
  const { consultorio } = site;
  return (
    <Moldura pagina="consultorio" rotulo="Endereço, horário e mapa">
      <section aria-labelledby="titulo" className={`${envelope} nt-local`}>
        <div className="relative mt-8 lg:mt-12">
          <div className="nt-cartela">
            <Titulo id="titulo" como="h1" linhas={consultorio.titulo} className="relative text-[clamp(60px,8.6vw,140px)] leading-[0.88] tracking-[-0.036em] lg:text-[clamp(56px,6.2vw,96px)]" />
          </div>
          <figure className="mt-10 lg:mt-0">
            <div className="nt-mapa-moldura">
              <MapaGravado />
            </div>
            {/* Sem o "Fig. 1": é a única figura do site (fechamento com o Impeccable, 16.10.2026; a marca L5, a numeração que não é sequência). */}
            <figcaption className="mt-4 text-[16.5px] text-muted-foreground italic">{consultorio.legendaDoMapa}.</figcaption>
          </figure>
        </div>

        <div className="mt-10 grid gap-12 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {/* O endereço sem rótulo: ele se diz sozinho. "sala 000" não se parte (até 14.10.2026, o "000" ficava sozinho na linha). */}
            <address className="nt-exibicao text-[clamp(30px,2.6vw,38px)] leading-[1.12] text-balance not-italic">
              {site.endereco.replace("sala ", "sala\u00a0")}
              <br />
              <span className="italic">{site.bairro}</span>
            </address>
            {/* O endereço tocável, como no pet shop (fechamento com o Impeccable, 16.10.2026): o caminho até a porta é função de base do site. */}
            <a href={consultorio.mapa.vinculo} target="_blank" rel="noopener noreferrer" className="nt-vinculo mt-2 inline-flex min-h-11 items-center text-[18px]">
              {consultorio.mapa.rotulo}
            </a>
            <p className="mt-3 max-w-[40ch] text-[17.5px] leading-[1.6] text-muted-foreground">{consultorio.referencia}</p>
            {/* A ação aqui é um vínculo, não a pílula (crítico de fora, 14.10.2026: as colunas de Valores e do Consultório terminavam iguais, com a pílula). */}
            <a href={vinculoWhatsApp} target="_blank" rel="noopener noreferrer" className="nt-vinculo mt-8 inline-flex min-h-11 items-center gap-2.5 text-[18px] text-accent">
              <IconeWhatsApp className="size-[18px]" />
              {site.acao}
            </a>
          </div>
          {/* Como chegar, como a legenda do mapa: o símbolo de cada modo é o mesmo do mapa, e acende lá e no próprio item sob o ponteiro e no toque (nutricao.css, .nt-legenda). Sem rótulo em versalete sobre filete nem linhas pautadas. Abaixo de 1024 px, depois do endereço: o endereço vem logo abaixo da legenda da figura (fechamento com o Impeccable, 16.10.2026; desde o crítico de fora de 16.10, a legenda vinha antes dele, para ficar perto do realce no mapa, e o endereço caía a 1.193 px a 390; o item continua respondendo no próprio símbolo). */}
          <div className="self-start lg:col-span-6 lg:col-start-7 lg:pt-1">
            <h2 className="sr-only">Como chegar</h2>
            <dl className="nt-legenda grid gap-7">
              {consultorio.chegada.map((c) => (
                <div key={c.modo} data-modo={c.simbolo}>
                  <dt className="nt-exibicao flex items-center gap-4 text-[24px] leading-tight tracking-[-0.01em]">
                    <SimboloDoModo modo={c.simbolo} />
                    {c.modo}
                  </dt>
                  <dd className="mt-1 pl-15 text-[17.5px] leading-[1.55]">{c.texto}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* A semana numa linha. Título de seção em pé (a voz em itálico fica no título da página). */}
      <section aria-labelledby="horario" className={`${envelope} ${entreSecoes}`}>
        <h2 id="horario" className="nt-exibicao text-[clamp(40px,4.6vw,72px)] leading-none tracking-[-0.03em]">
          Horário de atendimento
        </h2>
        <dl className="mt-12 grid border-y-2 border-foreground max-sm:hidden sm:grid-cols-2 lg:grid-cols-7">
          {consultorio.horarios.map((h) => {
            const fechado = h.hora === "Fechado";
            // A primeira coluna de cada linha começa na borda, alinhada ao título (até 03/10, recuada 20 px no tablet).
            return (
              <div key={h.dia} className="border-border px-5 py-7 max-lg:border-b sm:max-lg:odd:pl-0 lg:not-last:border-r lg:first:pl-0">
                <dt className="nt-versal text-[16px] text-muted-foreground">{h.dia}</dt>
                <dd className={`nt-exibicao mt-3 text-[clamp(24px,2vw,28px)] leading-tight ${fechado ? "text-muted-foreground italic" : ""}`}>{h.hora}</dd>
              </div>
            );
          })}
        </dl>
        {/* No celular, os dias com o mesmo horário juntos: três linhas (até 14.10.2026, sete, ~870 px, com "9h às 18h" quatro vezes seguidas). Sem o filete grosso embaixo: o do "Volta ao início" vem logo depois. */}
        <dl className="mt-10 border-t-2 border-foreground sm:hidden">
          {diasJuntos(consultorio.horarios).map((g) => (
            <div key={g.rotulo} className="flex items-baseline justify-between gap-4 border-b border-border py-5 last:border-b-0">
              <dt className="text-[18px]">{g.rotulo}</dt>
              <dd className={`nt-exibicao text-[26px] leading-tight ${g.hora === "Fechado" ? "text-muted-foreground italic" : ""}`}>{g.hora}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Continua pagina="consultorio" />
    </Moldura>
  );
}

import { atraso, cena, envelope, Extrusao, metadadosDe, textoEmbaixo, TituloQueSeCompoe } from "@/components/demos/barbearia/pecas";
import { barbeariaSite as site } from "@/conteudo/demos/barbearia";

export const metadata = metadadosDe("a-casa");

/**
 * 02 · A casa. A placa de bronze de 1996 em cena; depois, a linha do
 * tempo, com a moeda da casa do outro lado e o fio de latão que desce ao
 * rolar; e os números, que ganham volume ao passar (CSS 3D).
 */
export default function PaginaDaCasa() {
  const { casa } = site;
  return (
    <div className="bb-pagina">
      <section aria-labelledby="titulo" {...cena("1996", "direita")} className={`flex min-h-[110vh] items-center pt-32 pb-16 ${textoEmbaixo}`}>
        <div className={`${envelope} w-full`}>
          <div className="lg:max-w-[56%]">
            <p className="mov-entra bb-rotulo text-accent">02 · A casa</p>
            <TituloQueSeCompoe id="titulo" linhas={casa.titulo} className="mt-8 text-[clamp(56px,7.2vw,120px)] leading-[0.9]" />
            <p className="mov-entra mt-8 max-w-[46ch] text-[18px] leading-relaxed text-muted-foreground" style={atraso(800)}>
              {casa.texto}
            </p>
          </div>
        </div>
      </section>

      {/* A linha do tempo, com o fio de latão que desce. */}
      <section aria-labelledby="linha" {...cena("selo", "esquerda", { soComputador: true })} className="py-32">
        <div className={`${envelope} grid lg:grid-cols-12`}>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 id="linha" className="bb-rotulo text-accent">
              De 1996 a hoje
            </h2>
            {/* O fio de 1 px centrado nos pontos de 12 px: os dois com o meio a 6 px da borda (até 03/10, ponto de 11 px e fio a 5 px, fora da escala). */}
            <ol data-cena style={{ "--p": 1 } as React.CSSProperties} className="relative mt-12 pl-10">
              <span aria-hidden="true" className="bb-linha-fio absolute top-2 bottom-2 left-1.5 w-px -translate-x-1/2 bg-gradient-to-b from-primary via-primary to-transparent" />
              {casa.linha.map((marco, i) => (
                <li key={marco.ano} data-revelar style={atraso(i * 140)} className="relative pb-20 last:pb-0">
                  <span aria-hidden="true" className="absolute top-5 -left-10 size-3 rounded-full border border-primary bg-background" />
                  <p className="bb-exibicao bb-latao text-[clamp(64px,6vw,104px)] leading-[0.9]">{marco.ano}</p>
                  <h3 className="bb-exibicao mt-3 text-[34px] leading-tight italic">{marco.titulo}</h3>
                  <p className="mt-3 max-w-[40ch] text-[17px] leading-relaxed text-muted-foreground">{marco.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Os números, em volume. */}
      <section aria-label="A casa em números" className="bg-deep">
        <div className={`${envelope} py-28`}>
          <dl data-cena style={{ "--p": 1 } as React.CSSProperties} className="grid grid-cols-2 border-t border-border lg:grid-cols-4">
            {casa.numeros.map((n, i) => (
              <div
                key={n.rotulo}
                data-revelar
                style={atraso(i * 90)}
                className="border-border pt-10 pb-2 max-lg:nth-[n+3]:mt-10 max-lg:odd:border-r max-lg:odd:pr-5 max-lg:even:pl-5 lg:not-last:border-r lg:px-8 lg:first:pl-0"
              >
                <dt className="bb-exibicao text-[clamp(72px,7.6vw,128px)] leading-[0.85] tabular-nums">
                  <Extrusao texto={n.valor} />
                </dt>
                <dd className="mt-5 max-w-[24ch] text-[14.5px] leading-snug text-muted-foreground">{n.rotulo}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}

import { atraso, BotaoDeLatao, cena, envelope, MapaDeSantaRosa, metadadosDe, paginaDe, textoEmbaixo, TituloQueSeCompoe } from "@/components/demos/barbearia/pecas";
import { barbeariaSite as site } from "@/conteudo/demos/barbearia";

export const metadata = metadadosDe("onde");

/**
 * 06 · Onde. A placa da rua à esquerda; à direita, o endereço e o
 * horário. Embaixo, o mapa do bairro, que se levanta da mesa e desenha
 * as ruas ao rolar, com o monograma caindo no lugar (CSS 3D).
 */
export default function PaginaDoEndereco() {
  const { local } = site;
  return (
    <div className="bb-pagina">
      <section aria-labelledby="titulo" {...cena("onde", "esquerda")} className={`flex min-h-[105vh] items-center pt-32 pb-16 ${textoEmbaixo}`}>
        <div className={`${envelope} grid w-full lg:grid-cols-12`}>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="mov-entra bb-rotulo text-accent">06 · Onde</p>
            <TituloQueSeCompoe id="titulo" linhas={local.titulo} className="mt-8 text-[clamp(64px,8vw,136px)] leading-[0.88]" />
            <address className="mov-entra mt-10 text-[20px] leading-relaxed not-italic" style={atraso(700)}>
              {site.endereco}
              <br />
              <span className="text-muted-foreground">{site.bairro}</span>
            </address>
            <dl className="mov-entra mt-8 border-t border-border" style={atraso(820)}>
              {local.horarios.map((h) => (
                <div key={h.dia} className="flex justify-between gap-6 border-b border-border py-4 text-[16px]">
                  <dt>{h.dia}</dt>
                  <dd className="text-muted-foreground tabular-nums">{h.hora}</dd>
                </div>
              ))}
            </dl>
            <p className="mov-entra mt-6 max-w-[44ch] text-[15px] leading-relaxed text-muted-foreground" style={atraso(900)}>
              {local.referencia}
            </p>
            <div className="mov-entra mt-10" style={atraso(1000)}>
              <BotaoDeLatao href={paginaDe("agendar").caminho}>
                {site.acao}
              </BotaoDeLatao>
            </div>
          </div>
        </div>
      </section>
      <section aria-label="Mapa de Santa Rosa" className="bg-deep">
        <div className={`${envelope} py-24`}>
          {/* A cena mede a caixa, que não gira; o mapa, dentro, herda o --p. Medido no
              próprio mapa, o giro empurrava a caixa projetada para o pé da janela, e o
              mapa só começava a se levantar quando já devia estar de pé. */}
          <div data-cena style={{ "--p": 1 } as React.CSSProperties} className="overflow-hidden rounded-[32px] border border-border" data-revelar>
            <div className="bb-mapa-3d">
              <MapaDeSantaRosa />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

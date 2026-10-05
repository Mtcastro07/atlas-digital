import { Moldura } from "@/components/demos/deposito/moldura";
import { Abertura, atraso, BotaoWhatsApp, envelope, MapaDaEntrega, metadadosDe } from "@/components/demos/deposito/pecas";
import { MarcadorDoAgora } from "@/components/ilhas/demos/estado-da-loja";
import { depositoSite as site } from "@/conteudo/demos/deposito";

export const metadata = metadadosDe("entrega");

/**
 * 03 · Entrega. O mapa do bairro em papel de projeto, com o raio do mesmo
 * dia; a linha do dia do caminhão, das 7h às 18h, com o corte das 15h e o
 * marcador de "agora" pelo relógio de Niterói (ilha MarcadorDoAgora); e a
 * tabela do frete, antes do aceite.
 */
export default function PaginaDaEntrega() {
  const { entrega, expediente } = site;
  // O dia do caminhão é o de semana: o expediente de segunda (1).
  const [abre, fecha] = expediente[1]!;
  const posicao = (hora: number) => ((hora - abre) / (fecha - abre)) * 100;
  const corte = posicao(site.horaDoCorte);
  return (
    <Moldura pagina="entrega">
      <Abertura pagina="entrega" titulo={entrega.titulo} lide={entrega.texto} />

      <section aria-label={entrega.raio} className="border-b-2 border-foreground">
        <div className="h-[460px] md:h-[600px]">
          <MapaDaEntrega legenda={entrega.raio} />
        </div>
      </section>

      <section aria-labelledby="dia" className={`${envelope} py-20`}>
        <h2 id="dia" className="dp-exibicao text-[clamp(32px,3.6vw,54px)] leading-none">
          {entrega.dia.titulo}
        </h2>
        <div className="relative mt-16 pb-4" data-revelar>
          {/* A barra do expediente; em laranja, a janela do mesmo dia (até o corte). */}
          <div className="relative h-4 bg-foreground/10">
            <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${corte}%` }} />
            <div className="vd-zebrada absolute inset-y-0 right-0 opacity-30" style={{ width: `${100 - corte}%` }} />
          </div>
          <ol className="relative mt-4 h-28">
            {entrega.dia.marcos.map((marco, i) => {
              // O primeiro marco alinha pela esquerda e o último pela direita, dentro da barra; os do meio, pelo centro.
              let alinhamento = "-translate-x-1/2 text-center";
              if (i === 0) alinhamento = "translate-x-0 text-left";
              else if (i === entrega.dia.marcos.length - 1) alinhamento = "-translate-x-full text-right";
              return (
                <li key={marco.hora} className={`absolute top-0 ${alinhamento}`} style={{ left: `${posicao(marco.hora)}%` }}>
                  <span className="dp-exibicao block text-[30px] leading-none font-bold">{marco.hora}h</span>
                  <span className="dp-codigo mt-2 block max-w-[14ch] text-[10.5px] text-muted-foreground">{marco.rotulo}</span>
                </li>
              );
            })}
          </ol>
          <div className="absolute inset-x-0 top-0 h-4">
            <MarcadorDoAgora abre={abre} fecha={fecha} rotulo={entrega.dia.agora} />
          </div>
        </div>
      </section>

      <section aria-labelledby="frete" className={`${envelope} grid gap-12 pb-24 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <h2 id="frete" className="dp-exibicao text-[clamp(32px,3.6vw,54px)] leading-none">
            {entrega.tabela.titulo}
          </h2>
          <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-muted-foreground">{entrega.frete}</p>
          <div className="mt-8">
            <BotaoWhatsApp />
          </div>
        </div>
        <table className="dp-tabela w-full border-2 border-foreground lg:col-span-7" data-revelar style={atraso(120)}>
          <tbody>
            {entrega.tabela.linhas.map(([caso, valor]) => (
              <tr key={caso} className="border-t border-foreground/15 first:border-t-0">
                <th scope="row" className="px-5 py-5 text-left text-[17px] font-medium">
                  {caso}
                </th>
                <td className="dp-exibicao px-5 py-5 text-right text-[20px] tracking-[0.04em]">{valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Moldura>
  );
}

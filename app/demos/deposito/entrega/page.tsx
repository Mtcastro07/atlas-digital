import { Moldura } from "@/components/demos/deposito/moldura";
import { BotaoWhatsApp, envelope, Linhas, MapaDaEntrega, metadadosDe, ondeABarraSoTemOIcone, RotuloDaPagina } from "@/components/demos/deposito/pecas";
import { MarcadorDoAgora } from "@/components/ilhas/demos/estado-da-loja";
import { depositoSite as site } from "@/conteudo/demos/deposito";

export const metadata = metadadosDe("entrega");

/**
 * 03 · Entrega. O mapa do bairro em papel de projeto, com o raio do mesmo
 * dia; a linha do dia do caminhão, das 7h às 18h, com o corte das 15h e o
 * marcador de "agora" pelo relógio de Niterói (ilha MarcadorDoAgora); e a
 * tabela do frete, antes do aceite. O momento da página (14.10.2026): o
 * raio do mesmo dia abre no mapa, uma vez (MapaDaEntrega, .dp-raio). A
 * linha do dia e a tabela ficam quietas (até ali, subiam ao entrar, como
 * toda seção do site): a linha já tem o marcador de agora, ao vivo.
 * Abaixo de 1280 px, os marcos do dia viram uma tabela, uma hora por linha
 * (15.10.2026: os rótulos se sobrepunham de 320 a ~1030 px).
 *
 * 16.10.2026 (crítico de fora: quatro páginas abriam com a mesma abertura,
 * e no celular as primeiras telas eram iguais): a Entrega abre pelo mapa.
 * Na mesa, a prancha: o carimbo à esquerda (o rótulo, o título e o lide,
 * no papel quadriculado) e o mapa à direita, em sangria até a borda; abaixo
 * de 1024 px, o mapa vem primeiro, na primeira tela, e o carimbo embaixo.
 * Nos marcos, o filete que sobrava acima das 7h na mesa larga saiu, e o
 * primeiro e o último rótulo ficam numa linha ("O / BALCÃO / FECHA" quebrava
 * em três: o marco das 18h, encostado na borda, tinha largura zero para
 * crescer). O botão do frete só aparece onde a barra não tem o botão inteiro.
 */
export default function PaginaDaEntrega() {
  const { entrega, expediente } = site;
  // O dia do caminhão é o de semana: o expediente de segunda (1).
  const [abre, fecha] = expediente[1]!;
  const posicao = (hora: number) => ((hora - abre) / (fecha - abre)) * 100;
  const corte = posicao(site.horaDoCorte);
  return (
    <Moldura pagina="entrega">
      <section aria-labelledby="titulo" className="grid border-b-2 border-foreground lg:grid-cols-12">
        <div className="dp-quadriculado flex flex-col justify-end border-foreground px-5 pt-10 pb-12 max-lg:border-t-2 md:px-10 lg:col-span-5 lg:pt-20 lg:pr-12 lg:pb-16 lg:pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))]">
          <RotuloDaPagina pagina="entrega" />
          <h1 id="titulo" className="dp-exibicao dp-titulo mt-8 text-[clamp(52px,5vw,84px)]">
            <Linhas linhas={entrega.titulo} />
          </h1>
          <p className="mt-8 max-w-[42ch] text-[18px] leading-relaxed text-muted-foreground">{entrega.texto}</p>
        </div>
        {/* O mapa: abaixo de 1024 px, primeiro na tela (a ordem só muda na tela: ele é decorativo); na mesa, à direita, com a parede da prancha. */}
        <div className="h-[340px] max-lg:order-first sm:h-[440px] lg:col-span-7 lg:h-auto lg:min-h-[620px] lg:border-l-2 lg:border-foreground">
          <MapaDaEntrega legenda={entrega.raio} bairros={entrega.vizinhos.nomes} />
        </div>
      </section>

      <section aria-labelledby="dia" className={`${envelope} py-20`}>
        <h2 id="dia" className="dp-exibicao dp-titulo text-[clamp(32px,3.6vw,54px)]">
          {entrega.dia.titulo}
        </h2>
        <div className="relative mt-16 pb-4">
          {/* A barra do expediente; em laranja, a janela do mesmo dia (até o corte). Embaixo, a marca de cada hora, em toda largura. */}
          <div className="relative h-4 bg-foreground/10">
            <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${corte}%` }} />
            <div className="vd-zebrada absolute inset-y-0 right-0 opacity-30" style={{ width: `${100 - corte}%` }} />
            {entrega.dia.marcos.map((marco) => (
              <span key={marco.hora} aria-hidden="true" className="absolute top-full h-2.5 w-px -translate-x-1/2 bg-foreground/60" style={{ left: `${posicao(marco.hora)}%` }} />
            ))}
          </div>
          {/* Os marcos (15.10.2026, crítico de fora): pela posição da hora, só a partir de 1280 px. Abaixo, as 15h e as 16h ficam a 1/11 da barra uma da outra (86 px a 1024, 32 px a 390), e os rótulos se sobrepunham ("15H16H18H" a 390; defeito anterior a 14.10). Ali, os marcos viram a tabela do dia, uma hora por linha. */}
          <ol className="relative mt-8 xl:mt-4 xl:h-28">
            {entrega.dia.marcos.map((marco, i) => {
              // Na mesa larga, o primeiro marco alinha pela esquerda e o último pela direita, dentro da barra; os do meio, pelo centro.
              // O primeiro e o último, nas pontas, com a largura do próprio texto, numa linha (w-max): o das 18h, em left: 100%, não tinha largura para crescer e quebrava palavra por palavra.
              const ponta = i === 0 || i === entrega.dia.marcos.length - 1;
              let alinhamento = "xl:-translate-x-1/2 xl:text-center";
              if (i === 0) alinhamento = "xl:w-max xl:text-left";
              else if (ponta) alinhamento = "xl:w-max xl:-translate-x-full xl:text-right";
              return (
                <li
                  key={marco.hora}
                  className={`flex items-baseline gap-5 border-b border-dashed border-foreground/30 py-3 max-xl:first:border-t xl:absolute xl:top-0 xl:block xl:border-0 xl:py-0 ${alinhamento}`}
                  style={{ left: `${posicao(marco.hora)}%` }}
                >
                  <span className="dp-exibicao block w-16 flex-none text-[30px] leading-none font-bold xl:w-auto">{marco.hora}h</span>
                  <span className={`dp-codigo block text-[11.5px] text-muted-foreground xl:mt-2 xl:text-[11px] ${ponta ? "" : "xl:max-w-[14ch]"}`}>{marco.rotulo}</span>
                </li>
              );
            })}
          </ol>
          <div className="dp-agora absolute inset-x-0 top-0 h-4">
            <MarcadorDoAgora abre={abre} fecha={fecha} rotulo={entrega.dia.agora} />
          </div>
        </div>
      </section>

      <section aria-labelledby="frete" className={`${envelope} grid gap-12 pb-24 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <h2 id="frete" className="dp-exibicao dp-titulo text-[clamp(32px,3.6vw,54px)]">
            {entrega.tabela.titulo}
          </h2>
          <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-muted-foreground">{entrega.frete}</p>
          {/* Os bairros vizinhos em texto, junto do frete (16.10.2026, Impeccable): até ali, só no mapa decorativo, fora da árvore de acessibilidade, a 8 px no celular. */}
          <p className="mt-4 max-w-[44ch] text-[17px] leading-relaxed">
            {entrega.vizinhos.rotulo}: {new Intl.ListFormat("pt-BR").format(entrega.vizinhos.nomes)}.
          </p>
          <div className={`mt-8 ${ondeABarraSoTemOIcone}`}>
            <BotaoWhatsApp />
          </div>
        </div>
        <table className="dp-tabela w-full border-2 border-foreground lg:col-span-7">
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

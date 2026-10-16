import { Agata, daCasa, endereco, Ligue, metadadosDaCasa } from "@/components/demos/restaurante/casa";
import { MapaDoBairro } from "@/components/demos/restaurante/mapa-do-bairro";
import { bairros, entrega, expediente, horarioEOnde, ondePagina, restauranteSite as casa } from "@/conteudo/demos/restaurante";
import { diaADia } from "@/lib/demos/relogio";
import { real } from "@/lib/demos/restaurante/pedido";

export const metadata = metadadosDaCasa("onde");

/**
 * Onde fica e o horário: a esquina, a parede caiada sobre a calçada de pedra portuguesa, e nela a placa de rua
 * esmaltada, que é o título da página (o título em cima, o nome da rua e o bairro). Embaixo, o guardanapo dobrado ao
 * meio que se abre quando chega à tela (o momento desta página; ele nasce abaixo da dobra) e mostra o bairro a caneta
 * (o OpenStreetMap, sem mapa embutido e sem pedido externo); o horário dia a dia, no papel da página, como os bairros
 * (a placa esmaltada é uma só por página, a da rua: a segunda, a do horário, lia como série; o crítico de fora,
 * 16.10.2026); os bairros de entrega com o frete e o tempo; a retirada e o contato.
 */
export default function Onde() {
  const [rua, bairro, cep] = endereco.linhas();
  return (
    <>
      <section aria-labelledby="titulo" className="rs-esquina">
        <div className="rs-largura rs-esquina-miolo">
          <h1 id="titulo" className="rs-placa-de-rua">
            <span className="rs-placa-rotulo">{daCasa("onde").titulo}</span>
            {/* O número preso à rua (o espaço sem quebra), e não a linha inteira: com a letra a 200%, a linha que não
                quebrava media 445 px (o Impeccable, 16.10.2026). */}
            <strong>{rua.replace(/ (?=\S+$)/, " ")}</strong>
            <span>
              {bairro}, {cep}
            </span>
          </h1>
          <p className="rs-texto-lide rs-esquina-lide">{ondePagina.lide}</p>
          <a href={endereco.noMapa()} target="_blank" rel="noopener noreferrer" className="rs-pontilhado">
            {horarioEOnde.verNoMapa}
            <span className="sr-only">{casa.novaAba}</span>
          </a>
        </div>
      </section>
      <div className="rs-largura rs-onde-grade">
        <div className="rs-guardanapo-que-abre" data-cena="guardanapo">
          <div className="rs-guardanapo" data-toque>
            <div className="rs-guardanapo-miolo">
              <MapaDoBairro credito={horarioEOnde.credito} />
            </div>
            <span aria-hidden="true" className="rs-guardanapo-dobra" />
          </div>
        </div>
        <section aria-labelledby="horario" className="rs-horario">
          <h2 id="horario" className="rs-folha-grupo-titulo">
            {ondePagina.horarioDiaADia}
          </h2>
          <dl>
            {diaADia(expediente).map((d) => (
              <div key={d.dia}>
                <dt>{d.dia}</dt>
                <dd>{d.texto}</dd>
              </div>
            ))}
          </dl>
          <p className="rs-horario-nota">{ondePagina.feriados}</p>
        </section>
      </div>
      <div className="rs-largura grid gap-12 pb-20 md:grid-cols-2 md:gap-16">
        <section aria-labelledby="bairros">
          <h2 id="bairros" className="rs-folha-grupo-titulo">
            {ondePagina.bairros}
          </h2>
          <ul className="rs-tabela-de-fretes">
            {bairros.map((b) => (
              <li key={b.id}>
                <span>
                  {b.nome} <small>{b.tempo}</small>
                </span>
                <span aria-hidden="true" className="rs-prato-pontos" />
                <span className="font-bold">{real(b.frete)}</span>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="retirada">
          <h2 id="retirada" className="rs-folha-grupo-titulo">
            {ondePagina.retirada}
          </h2>
          <p className="mt-4">{entrega.retirada}</p>
          <p className="mt-4">
            <Ligue />
          </p>
          <p className="text-[0.9375rem] text-muted-foreground">{casa.prazoDeResposta}</p>
          <Agata rotulo={casa.acao.whatsapp} className="mt-6 rs-agata-principal" />
        </section>
      </div>
    </>
  );
}

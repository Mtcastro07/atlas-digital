import { Agata, daCasa, endereco, Ligue, metadadosDaCasa } from "@/components/demos/restaurante/casa";
import { MapaDoBairro } from "@/components/demos/restaurante/mapa-do-bairro";
import { bairros, entrega, expediente, horarioEOnde, ondePagina, restauranteSite as casa } from "@/conteudo/demos/restaurante";
import { diaADia } from "@/lib/demos/relogio";
import { real } from "@/lib/demos/restaurante/pedido";

export const metadata = metadadosDaCasa("onde");

/**
 * Onde fica e o horário: a esquina, a parede caiada sobre a calçada de pedra portuguesa, e nela a placa de rua
 * esmaltada, que é o título da página (o título em cima, o nome da rua e o bairro). Embaixo, o guardanapo dobrado ao
 * meio que se abre ao entrar na página (o momento desta página) e mostra o bairro a caneta (o OpenStreetMap, sem mapa
 * embutido e sem pedido externo); a plaquinha esmaltada com o horário dia a dia; os bairros de entrega com o frete e
 * o tempo; a retirada e o contato.
 */
export default function Onde() {
  const [rua, bairro, cep] = endereco.linhas();
  return (
    <>
      <section aria-labelledby="titulo" className="rs-esquina">
        <div className="rs-largura rs-esquina-miolo">
          <h1 id="titulo" className="rs-placa-de-rua">
            <span className="rs-placa-rotulo">{daCasa("onde").titulo}</span>
            <strong className="whitespace-nowrap">{rua}</strong>
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
        <div className="rs-guardanapo-que-abre">
          <div className="rs-guardanapo">
            <div className="rs-guardanapo-miolo">
              <MapaDoBairro credito={horarioEOnde.credito} />
            </div>
            <span aria-hidden="true" className="rs-guardanapo-dobra" />
          </div>
        </div>
        <div className="rs-esmaltada">
          <h2 className="rs-esmaltada-titulo">{ondePagina.horarioDiaADia}</h2>
          <dl>
            {diaADia(expediente).map((d) => (
              <div key={d.dia}>
                <dt>{d.dia}</dt>
                <dd>{d.texto}</dd>
              </div>
            ))}
          </dl>
          <p className="rs-esmaltada-nota">{ondePagina.feriados}</p>
        </div>
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
          <Agata rotulo={casa.acao.whatsapp} className="mt-6" />
        </section>
      </div>
    </>
  );
}

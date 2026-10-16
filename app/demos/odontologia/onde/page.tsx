import { MapaDoBairro } from "@/components/demos/odontologia/mapa-do-bairro";
import { AcaoWhatsApp, enderecoEmLinhas, metadadosDe, paginaDe, Telefone, vinculoDoMapa } from "@/components/demos/odontologia/pecas";
import { PlacaDoHorario } from "@/components/demos/odontologia/placa";
import { odontologiaSite as site, ondePagina, quandoEOnde } from "@/conteudo/demos/odontologia";

export const metadata = metadadosDe("onde");

/**
 * Onde fica e quando abre (producao/esteira/nichos/odontologia.md, seção 4.1). O momento desta página: o bairro
 * desenhado a lápis, grande, das ruas reais (OpenStreetMap, sem mapa embutido e sem pedido externo), e a clínica
 * circulada pelo lápis vermelho ao abrir. O endereço em texto, com copiar e ver no mapa; a placa do horário dia a dia,
 * com o estado ao vivo; o acesso do prédio; o contato com o prazo de resposta. Convênios: nenhum (o briefing não os
 * tem).
 */
export default function Onde() {
  const pagina = paginaDe("onde");
  const [rua, bairro, cep] = enderecoEmLinhas();
  return (
    <>
      <section aria-labelledby="titulo" className="od-cena od-onde">
        <div className="od-largura od-onde-grade">
          <div className="od-onde-texto">
            <h1 id="titulo" className="od-titulo-grande">
              {pagina.titulo}
            </h1>
            <p className="od-lide">{ondePagina.lide}</p>
            <address className="od-onde-endereco">
              {/* Sem o nowrap: a rua quebra depois da vírgula (a 360 px, saía o último algarismo; na mesa, estourava a coluna). */}
              <span>{rua}</span>
              <span>{bairro}</span>
              <span>{cep}</span>
            </address>
            <p className="od-porta-acoes">
              <a href={vinculoDoMapa()} target="_blank" rel="noopener noreferrer" className="od-lapis">
                {quandoEOnde.verNoMapa}
                <span className="sr-only">{site.novaAba}</span>
              </a>
            </p>
          </div>
          <figure className="od-bairro od-bairro-grande">
            <MapaDoBairro credito={quandoEOnde.credito} />
            <svg aria-hidden="true" viewBox="0 0 100 100" className="od-bairro-volta">
              <path d="M43 44l13 14M56 43 44 58" />
            </svg>
          </figure>
        </div>
      </section>
      <section aria-labelledby="horario" className="od-largura od-onde-horario">
        <div>
          <h2 id="horario" className="sr-only">
            {ondePagina.horario}
          </h2>
          <PlacaDoHorario className="od-onde-placa" />
        </div>
        <div>
          <h2 className="od-escolha-legenda">{ondePagina.acesso}</h2>
          <ul className="od-onde-acesso">
            {ondePagina.acessoItens.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2 className="od-escolha-legenda">{ondePagina.contato}</h2>
          <p>
            <Telefone />
          </p>
          <p className="od-onde-prazo">{site.prazoDeResposta}</p>
          <AcaoWhatsApp className="od-clinica-acao" />
        </div>
      </section>
    </>
  );
}

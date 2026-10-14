import { Agata, daCasa, metadadosDaCasa } from "@/components/demos/restaurante/casa";
import { PedidoDeEvento } from "@/components/ilhas/demos/restaurante/pedido-de-evento";
import { whatsappFicticio } from "@/conteudo/demos/comum";
import { encomendasPagina as textos, nomeDoDia, pratosDoDia, restauranteSite as casa } from "@/conteudo/demos/restaurante";
import type { Dia } from "@/lib/demos/relogio";

export const metadata = metadadosDaCasa("encomendas");

/** As marmitas são de segunda a sexta (encomendasPagina.marmitas). */
const DE_SEGUNDA_A_SEXTA: readonly Dia[] = [1, 2, 3, 4, 5];

/**
 * Encomendas e eventos: o caderninho de encomendas do balcão, de espiral em cima, aberto no papel do balcão. A capa
 * verde, virada para cima da espiral, traz a etiqueta com o título da página escrito a caneta; ela assenta ao abrir a
 * página (o momento desta página). Na folha, à esquerda, as marmitas da semana, com o prato de cada dia; à direita, o
 * almoço para grupos, com a data, as pessoas e o lugar compondo a mensagem (nada é gravado). Sem script, a mensagem
 * curta.
 */
export default function Encomendas() {
  const { marmitas, eventos } = textos;
  return (
    <section aria-labelledby="titulo" className="rs-abertura rs-encomendas">
      <div className="rs-largura">
        <div className="rs-caderno">
          <header className="rs-caderno-capa">
            <div className="rs-etiqueta">
              <h1 id="titulo" className="rs-etiqueta-titulo">
                {daCasa("encomendas").titulo}
              </h1>
              <p className="rs-etiqueta-lide">{textos.lide}</p>
            </div>
          </header>
          <span aria-hidden="true" className="rs-espiral" />
          <div className="rs-caderno-folha">
            <section aria-labelledby="marmitas" className="rs-caderno-pagina">
              <h2 id="marmitas">{marmitas.titulo}</h2>
              <ul className="rs-marmitas" aria-label={marmitas.lousa}>
                {DE_SEGUNDA_A_SEXTA.map((d) => (
                  <li key={d}>
                    <span>{nomeDoDia[d]}</span>
                    <span>{pratosDoDia[d]!.curto}</span>
                  </li>
                ))}
              </ul>
              <p>{marmitas.texto}</p>
              <Agata rotulo={marmitas.pedir} mensagem={marmitas.mensagem} className="mt-6" />
            </section>
            <section aria-labelledby="eventos" className="rs-caderno-pagina">
              <h2 id="eventos">{eventos.titulo}</h2>
              <p>{eventos.texto}</p>
              <div className="rs-com-script mt-6">
                <PedidoDeEvento
                  numero={whatsappFicticio}
                  textos={{
                    data: eventos.data,
                    pessoas: eventos.pessoas,
                    onde: eventos.onde,
                    opcoes: eventos.opcoes,
                    pedir: eventos.pedir,
                    copiar: eventos.copiar,
                    novaAba: casa.novaAba,
                    mensagem: eventos.mensagem,
                    aCombinar: eventos.aCombinar,
                  }}
                />
              </div>
              <div className="rs-sem-script mt-6">
                <Agata rotulo={eventos.pedir} mensagem={eventos.mensagem.replace("{data}", eventos.aCombinar).replace("{pessoas}", eventos.aCombinar).replace(" {onde}.", "")} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

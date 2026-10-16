import { ReguaDeLeitura, Vinculo } from "@/components/demos/petshop/pecas";
import { pelagens, portes, type PelagemId, type Servico } from "@/conteudo/demos/petshop";
import { duracao, real } from "@/lib/demos/petshop/valores";

/**
 * "Curta e dupla (com subpelo)": a linha que vale para duas pelagens, com a segunda em caixa baixa, como na frase. O
 * parêntese não se parte ("subpelo)" sozinho na última linha da célula; lapidação, rodada 3).
 */
const nomeDasPelagens = (ids: readonly PelagemId[]) =>
  ids
    .map((id, i) => (i ? pelagens[id].toLowerCase() : pelagens[id]))
    .join(" e ")
    .replace(/\([^)]*\)/g, (p) => p.replaceAll(" ", "\u00a0"));

/**
 * Uma tabela do verso do cartão: um serviço, com o que ele compreende embaixo do nome (ao lado do preço: CDC, art. 31;
 * o "com o banho" da tosa não vai ao lado do nome: o que ela compreende já começa por "O banho e o corte"),
 * o porte nas colunas e a pelagem nas linhas, o valor e a duração em cada célula (identidade, seção 4.13). Estática: nada calcula, nada seleciona (a tabela interativa é do Profissional);
 * cada linha responde com a régua de leitura. O nome do serviço é a legenda da tabela, com o título dentro (a navegação
 * por títulos chega a ela). Pensada para virar fichas no celular sem repetir títulos: cada linha é uma ficha (a
 * pelagem, o <th scope="row">), e cada célula leva o porte e o peso em data-rotulo, para o CSS escrever o rótulo sem
 * tirar a tabela da árvore de acessibilidade (nas fichas da letra a 200%: servicos.css). A vírgula entre o valor e a duração é só para o leitor de tela. Os papéis (role)
 * repetem os da tabela de propósito: no celular, as linhas viram grade (servicos.css), e o Safari e o Chrome tiram a
 * semântica de tabela do que perde o display de tabela; com os papéis escritos, ela fica.
 */
export function TabelaDeValores({ servico }: { servico: Servico }) {
  const titulo = `servico-${servico.id}`;
  return (
    <ReguaDeLeitura className="bt-verso-tabela bt-verso-precos">
      <table role="table" aria-labelledby={titulo}>
        <caption>
          <h3 id={titulo} className="bt-verso-servico">
            {servico.nome}
          </h3>
          <span className="bt-verso-compreende">{servico.compreende}</span>
        </caption>
        <thead role="rowgroup">
          <tr role="row">
            <th scope="col" role="columnheader" className="bt-verso-pelagem-titulo">
              Pelagem
            </th>
            {portes.map((p) => (
              <th key={p.id} scope="col" role="columnheader">
                <span className="bt-verso-col-porte">{p.nome}</span> <span className="bt-verso-col-faixa">{p.faixa}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {servico.linhas.map((linha) => (
            <tr key={linha.pelagens.join()} role="row" data-bt-linha="" data-nota={"nota" in linha ? "" : undefined}>
              <th scope="row" role="rowheader">{nomeDasPelagens(linha.pelagens)}</th>
              {"precos" in linha ? (
                portes.map((p) => (
                  <td key={p.id} role="cell" data-rotulo={`${p.nome}, ${p.faixa}`}>
                    <span className="bt-verso-valor">{real(linha.precos[p.id].centavos)}</span>
                    <span className="sr-only">, </span>
                    <span className="bt-verso-tempo">{duracao(linha.precos[p.id].minutos)}</span>
                  </td>
                ))
              ) : (
                <td role="cell" colSpan={portes.length}>
                  {linha.nota}
                  {linha.vinculo && (
                    <>
                      {" "}
                      <Vinculo href={linha.vinculo.caminho}>{linha.vinculo.rotulo}</Vinculo>.
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </ReguaDeLeitura>
  );
}

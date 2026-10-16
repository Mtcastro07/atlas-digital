import { Carimbo, Telefone, metadadosDe, paginaDe } from "@/components/demos/petshop/pecas";
import { ReguaDePeso } from "@/components/demos/petshop/servicos/regua-de-peso";
import { TabelaDeValores } from "@/components/demos/petshop/servicos/tabela-de-valores";
import { HighlightedText } from "@/components/ui/spell/highlighted-text";
import {
  acrescimos,
  condicaoDoNo,
  levaETraz,
  pagamento,
  pelagens,
  pesagem,
  petshopSite as site,
  reconhecerPelagem,
  servicos,
  valoresDe,
  type PelagemId,
} from "@/conteudo/demos/petshop";
import { real } from "@/lib/demos/petshop/valores";

import "../servicos.css";

// Serviços e valores, "O verso do cartão" (identidade, seção 4.13; lapidada nas rodadas 1 a 3): a frente do cartão é a
// capa; o verso é a tabela. Abre com a régua de peso, a fita da balança impressa em chapado, de pé ao lado do título, de
// 0 a 45 kg (o momento da página: os cortes de 10 e 25 kg assentam, uma vez). Depois, na ordem da identidade: o verso do
// cartão, deitado no balcão de tinta (lapidação, rodada 3: sete faixas listradas, cada uma com um título e uma tabela,
// liam como documento, e o verso não existia na tela), com "Valores de outubro de 2026", o banho de ponta a ponta e as
// duas tosas lado a lado (cada serviço com o que compreende, como pede o CDC, art. 31); os acréscimos e o pelo com nó (com
// o marca-texto do plano, uma vez no site, em "antes de começar"); o leva e traz no chapado; e, no fim, a forma de
// pagamento com o carimbo. Só as linhas das três tabelas de preço respondem com a régua de leitura (a leitura cruzada da
// pelagem com o porte; 14.10.2026): os acréscimos e o leva e traz se leem linha a linha, como frases, e ficam quietos.
// Cada célula leva o nome da coluna em data-rotulo, para as tabelas virarem fichas no celular sem repetir títulos. O desenho é de servicos.css; os fatos, de
// conteudo/demos/petshop.ts.

export const metadata = metadadosDe("servicos");

/** Os rótulos da página: títulos de seção e cabeçalhos de coluna, não fatos (o contrato da fundação, seção 1). */
const rotulos = {
  acrescimos: "Acréscimos",
  acrescimo: "Acréscimo",
  oQueE: "Compreende",
  valor: "Valor",
  duracao: "Duração",
  no: "Pelo com nó",
  pagamento: "Pagamento",
};

/** "Charitas e Cachoeiras"; "Icaraí, Santa Rosa e Vital Brazil". */
const emLista = new Intl.ListFormat("pt-BR", { type: "conjunction" });
// O leva e traz por dia (o Impeccable, fechamento de 16.10.2026: seis linhas, a janela repetida em cinco): os bairros do
// mesmo dia juntos, na ordem do conteúdo, com o valor do grupo (o mesmo em todos: o teste confere).
const levaPorDia = [
  ...levaETraz.bairros.reduce((grupos, b) => grupos.set(b.dias, [...(grupos.get(b.dias) ?? []), b]), new Map<string, (typeof levaETraz.bairros)[number][]>()),
];

/**
 * O valor escrito como a casa escreve ("+ R$ 30,00 no pequeno", "+ 15 min"), sem quebrar a linha entre o sinal, o
 * símbolo, o número e a unidade (o real() e o duracao() já saem assim; estes textos vêm prontos do conteúdo).
 */
const semQuebra = (texto: string) => texto.replace(/(\+|R\$) /g, "$1\u00a0").replace(/(\d) (min|minutos)\b/g, "$1\u00a0$2");

export default function Servicos() {
  return (
    <>
      {/* A abertura: a cartolina de ponta a ponta; o título no corpo dos números e, embaixo dele, como se pesa e como se
          reconhece a pelagem (as duas entradas da tabela: o porte pelo peso, a pelagem pelo que se vê); ao lado, a régua
          de peso de pé, que sangra em cima e embaixo (no celular, embaixo de tudo, sangrando até o balcão). */}
      <section aria-labelledby="titulo" className="bt-cena bt-cartolina bt-abaixo-da-tira bt-verso-abertura">
        <div className="bt-largura bt-verso-abertura-grade">
          <div className="bt-verso-abertura-texto">
            <h1 id="titulo" className="bt-verso-titulo">
              {paginaDe("servicos").titulo}
            </h1>
            <p id="pesagem" className="bt-destaque bt-verso-pesagem">
              {pesagem}
            </p>
          </div>
          <section aria-labelledby="pelagem" className="bt-verso-pelagens">
            <h2 id="pelagem" className="bt-verso-pelagens-titulo">
              {reconhecerPelagem.titulo}
            </h2>
            <dl>
              {(Object.keys(pelagens) as PelagemId[]).map((id) => (
                <div key={id}>
                  <dt>{pelagens[id]}</dt>
                  <dd>{reconhecerPelagem.itens[id]}</dd>
                </div>
              ))}
            </dl>
            <p className="bt-verso-pelagens-duvida">{reconhecerPelagem.duvida}</p>
          </section>
          <ReguaDePeso legenda="pesagem" />
        </div>
      </section>

      {/* O verso do cartão, deitado no balcão: a data no canto de cima; o banho de ponta a ponta; as duas tosas lado a
          lado. */}
      <section aria-labelledby="valores" className="bt-cena bt-tinta bt-verso-mesa">
        <div className="bt-cartao bt-verso-cartao">
          <div className="bt-largura bt-verso-folha">
            <h2 id="valores" className="bt-verso-data">
              {valoresDe}
            </h2>
            <TabelaDeValores servico={servicos[0]} />
            <div className="bt-verso-tosas">
              {servicos.slice(1).map((s) => (
                <TabelaDeValores key={s.id} servico={s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Os acréscimos e o pelo com nó, na cartolina. */}
      <section aria-labelledby="acrescimos" className="bt-cena bt-cartolina bt-verso-banda bt-verso-extras">
        <div className="bt-largura">
          <div>
            <h2 id="acrescimos" className="bt-verso-servico">
              {rotulos.acrescimos}
            </h2>
            <div className="bt-verso-tabela bt-verso-acrescimos">
              <table role="table" aria-labelledby="acrescimos">
                <thead role="rowgroup">
                  <tr role="row">
                    <th scope="col" role="columnheader">{rotulos.acrescimo}</th>
                    <th scope="col" role="columnheader">{rotulos.oQueE}</th>
                    <th scope="col" role="columnheader">{rotulos.valor}</th>
                    <th scope="col" role="columnheader">{rotulos.duracao}</th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  {acrescimos.map((a) => (
                    <tr key={a.id} role="row">
                      <th scope="row" role="rowheader">{a.nome}</th>
                      <td role="cell" data-rotulo={rotulos.oQueE}>{a.compreende}</td>
                      <td role="cell" data-rotulo={rotulos.valor}>{semQuebra(a.valor)}</td>
                      <td role="cell" data-rotulo={rotulos.duracao}>{semQuebra(a.duracao)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <section aria-labelledby="no" className="bt-verso-nota-no">
            <h3 id="no" className="bt-subtitulo">
              {rotulos.no}
            </h3>
            <p className="bt-verso-no">
              {condicaoDoNo.chegada} <HighlightedText marcador>{condicaoDoNo.marcado}</HighlightedText>: {semQuebra(condicaoDoNo.valor)}{" "}
              {condicaoDoNo.pele}
            </p>
          </section>
        </div>
      </section>

      {/* O leva e traz no chapado, como o quadro de itinerário: o título, a condição e a janela (uma vez) em cima; embaixo,
          os dias de ponta a ponta, cada um com os bairros e o valor (o Impeccable, fechamento de 16.10.2026: a tabela de
          seis linhas, com o título à esquerda, era o molde do "Pelo com nó", logo acima). */}
      <section aria-labelledby="leva-e-traz" className="bt-cena bt-tinta bt-verso-leva">
        <div className="bt-largura">
          <h2 id="leva-e-traz" className="bt-titulo">
            {levaETraz.titulo}
          </h2>
          <p className="bt-destaque bt-verso-leva-condicao">
            {levaETraz.condicao} <strong>{levaETraz.janela}</strong>
          </p>
          <dl className="bt-verso-leva-dias">
            {levaPorDia.map(([dias, bairros]) => (
              <div key={dias} className="bt-verso-leva-dia">
                <dt>{dias}</dt>
                <dd className="bt-verso-leva-bairros">{emLista.format(bairros.map((b) => b.nome))}</dd>
                <dd className="bt-verso-leva-valor">{real(bairros[0].centavos)}</dd>
                {bairros.some((b) => b.id === "sao-francisco") && <dd className="bt-verso-leva-sabado">{levaETraz.sabado}</dd>}
              </div>
            ))}
          </dl>
          <p className="bt-verso-fora">{levaETraz.fora}</p>
        </div>
      </section>

      {/* O pagamento e a ação: a cartolina, com o carimbo violeta (o fecho desta página não é o da tinta, como no Início
          e em Onde). */}
      <section aria-labelledby="pagamento" className="bt-cena bt-cartolina bt-verso-fim">
        <div className="bt-largura bt-verso-pagamento">
          <div>
            <h2 id="pagamento" className="bt-titulo">
              {rotulos.pagamento}
            </h2>
            <ul className="bt-verso-formas">
              {pagamento.formas.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="bt-verso-quando">{pagamento.quando}</p>
          </div>
          <div className="bt-verso-acao">
            <Carimbo />
            <p>
              {site.prazoDeResposta}
              <br />
              {site.telefone.rotulo} <Telefone />.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

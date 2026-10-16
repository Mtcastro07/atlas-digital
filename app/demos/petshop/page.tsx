import { Fragment } from "react";

import { CartaoDeEntrega } from "@/components/demos/petshop/cartao-de-entrega";
import { Mapa } from "@/components/demos/petshop/mapa";
import { Carimbo, Endereco, Impresso, LuzDaPorta, Telefone, Vinculo, horarioEmLinha, metadadosDe, paginaDe } from "@/components/demos/petshop/pecas";
import { Pausa } from "@/components/ilhas/demos/petshop/pausa";
import {
  atendimento,
  ausencias,
  banhoPeloCurto,
  condicaoDoNo,
  expediente,
  feriados,
  levaETraz,
  mapa,
  mensagemPronta,
  pelagens,
  portes,
  petshopSite as site,
  rodape,
  servicos,
  tira,
  tratamento,
  valoresDe,
} from "@/conteudo/demos/petshop";
import { duracao, noRelogio, real } from "@/lib/demos/petshop/valores";
import { diasJuntos, faixasDoDia } from "@/lib/demos/relogio";

import "./inicio.css";

export const metadata = metadadosDe("inicio");

/** "Charitas e Cachoeiras"; "Icaraí, Santa Rosa e Vital Brazil". */
const emLista = new Intl.ListFormat("pt-BR", { type: "conjunction" });

// O horário impresso: os dias abertos, agrupados, e os dias de porta fechada numa linha só ("Segunda e domingo").
const fechado = faixasDoDia([]);
const grupos = diasJuntos(expediente);
const diasAbertos = grupos.filter((g) => g.texto !== fechado);
const diasFechados = emLista.format(grupos.filter((g) => g.texto === fechado).map((g, i) => (i ? g.dias.toLowerCase() : g.dias)));

// A linha do atendimento: cada trecho começa onde o anterior acaba; as colunas da grade são os minutos da tabela. Os
// rótulos se alternam embaixo e em cima da faixa (o último, a entrega, embaixo, junto do cartão de entrega), como no
// roteiro (identidade, seção 4.12, cena 3): cada um pode correr até onde começa o próximo do mesmo lado (`ate`, em
// minutos), porque o do meio está do outro lado.
const etapas = atendimento.etapas.map((e, i, todas) => ({ ...e, inicio: todas.slice(0, i).reduce((soma, x) => soma + x.minutos, 0) }));
const total = etapas.reduce((soma, e) => soma + e.minutos, 0);
const lado = (i: number) => (i % 2 ? "cima" : "baixo");
// O rótulo da entrega se alinha pelo fim da linha e ocupa os últimos 25 minutos dela (inicio.css): o rótulo de baixo que
// vem antes dele para ali (a 1024 px, os dois se encostavam).
const ULTIMO_ROTULO = 25;
const ate = (i: number) => {
  const proximo = etapas.findIndex((x, j) => j > i && lado(j) === lado(i));
  const fim = proximo < 0 ? total : proximo === etapas.length - 1 ? Math.min(etapas[proximo].inicio, total - ULTIMO_ROTULO) : etapas[proximo].inicio;
  return fim - etapas[i].inicio;
};
const trechos = etapas.map((e) => `minmax(0, ${e.minutos}fr)`).join(" ");

// Cachoeiras não tem rótulo no mapinho (o centro não saiu no Nominatim: identidade, "Pendências"): o dia dela vai em texto, e
// "o dia de cada um está no mapa" deixaria um bairro do leva e traz de fora (porta da mesa, 14.10.2026).
const semRotulo = levaETraz.bairros.find((b) => b.id === "cachoeiras")!;
// No celular, o mapinho leva só o nome dos bairros (o dia, na placa, encostava no rótulo do vizinho a 390 px), e os dias
// vão no texto, agrupados como na tabela: "São Francisco, terça a sábado; Charitas e Cachoeiras, terça e quinta; …".
const porDia = levaETraz.bairros.reduce((grupos, b) => grupos.set(b.dias, [...(grupos.get(b.dias) ?? []), b.nome]), new Map<string, string[]>());
// O grupo da própria casa (São Francisco) por último: logo depois de "divisa com São Francisco.", ele repetiria o nome.
const diasEmTexto = [...porDia]
  .sort(([, a], [, b]) => Number(a.includes(site.endereco.bairro)) - Number(b.includes(site.endereco.bairro)))
  .map(([dias, nomes]) => `${emLista.format(nomes)}, ${dias.toLowerCase()}`)
  .join("; ");

/**
 * A lista de preços da cena 2: o porte, o peso e o tempo, e o preço vazado. `prova`: a cópia impressa na folha que o rolo
 * cobre, sem a peça (o verniz e a medida da linha são só da lista de verdade).
 */
const listaDePrecos = (prova = false) => (
  <dl className="bt-preco-lista">
    {portes.map((porte) => {
      const preco = banhoPeloCurto[porte.id];
      const [inteiro, centavos] = real(preco.centavos).replace(/^R\$\s/, "").split(",");
      return (
        <div key={porte.id} data-bt-peca={prova ? undefined : ""} data-bt-linha={prova ? undefined : ""} className="bt-preco-linha">
          <dt>
            <span className="bt-subtitulo bt-preco-porte">{porte.nome}</span>{" "}
            <span className="bt-preco-faixa">
              {porte.faixa}, {duracao(preco.minutos)} de banho
            </span>
          </dt>
          {/* O valor inteiro para o leitor de tela; as peças da etiqueta, só desenho (liam "R$ 60 ,00"). */}
          <dd className="bt-numero bt-preco-valor">
            <span className="sr-only">{real(preco.centavos)}</span>
            <span aria-hidden="true">
              <span className="bt-preco-moeda">R$ </span>
              <Impresso>{inteiro}</Impresso>
              <span className="bt-preco-centavos">,{centavos}</span>
            </span>
          </dd>
        </div>
      );
    })}
  </dl>
);

/**
 * O Início do Banho e Tosa São Francisco: o cartão do balcão em seis cenas (identidade, seção 4.12, aprovada em
 * 13.10.2026; lapidada nas rodadas 1 a 3). O cartão da capa é o único deitado no balcão; as cenas claras são a cartolina
 * de ponta a ponta, com as peças deitadas nela (o cartão de entrega, o verso do cartão); as escuras são a tinta. O valor
 * vira a cada cena, e cada cena tem a sua composição e a sua peça:
 * 1, a frente do cartão (o nome, a ação, a amostra do preço, a luz da porta; a pilha, a sombra e a luz no balcão); 2, o
 * preço no chapado (a lista tipográfica do porte, alinhada pelo tnum, revelada pelo rolo de tinta); 3, do pente à entrega
 * (a linha do atendimento em trechos chapados, nos minutos da tabela, que termina no cartão de entrega, que vira ao
 * chegar); 4, fora da
 * tabela (as quatro ausências, só tipografia); 5, quando e onde (o verso do cartão inteiro: o mapinho, o horário
 * impresso, o endereço e o leva e traz); 6, a mensagem pronta (impressa com as lacunas, com o carimbo claro ao lado).
 * Cada fato sai de conteudo/demos/petshop.ts.
 */
export default function Inicio() {
  const amostra = banhoPeloCurto.pequeno;
  const tabela = paginaDe("servicos").caminho;
  return (
    <>
      {/* 1 · A frente do cartão: o cartão sangra em cima e à esquerda; à direita e embaixo, a quina de faca, a espessura
          da pilha e o balcão (a tinta), com a sombra longa e a luz da porta caindo nos dois. O carimbo vem antes do nome
          no DOM (é o primeiro no canto de cima e na ordem do foco); o que a casa faz vem logo depois do nome. */}
      <section data-bt-capa="" aria-labelledby="capa-titulo" className="bt-cena bt-tinta bt-capa">
        <LuzDaPorta noBalcao />
        <div className="bt-pilha bt-perspectiva bt-capa-pilha">
          <div data-bt-peca="inclina" className="bt-cartao bt-capa-cartao">
            <LuzDaPorta />
            <div className="bt-capa-grade">
              <Carimbo daCapa className="bt-capa-carimbo" />
              <h1 id="capa-titulo" className="bt-display bt-capa-titulo">
                <Impresso>
                  <span className="bt-capa-linha">Banho e tosa</span> <span className="bt-capa-linha">São Francisco</span>
                </Impresso>
              </h1>
              <p className="bt-destaque bt-capa-lide">{site.depoisDoNome}</p>
              <p className="bt-destaque bt-capa-amostra">
                {servicos[0].nome}, porte {portes[0].nome.toLowerCase()}, pelagem {pelagens.curta.toLowerCase()}:{" "}
                <strong className="whitespace-nowrap">
                  {real(amostra.centavos)}, {duracao(amostra.minutos)}
                </strong>
                . <Vinculo href={tabela}>A tabela inteira</Vinculo>
              </p>
              <div className="bt-capa-pe">
                <div>
                  <Endereco />
                  <p>{horarioEmLinha()}.</p>
                </div>
                {/* O prazo de resposta fica na cena 6, junto da ação (lapidação, rodada 2: aparecia duas vezes). */}
                <p className="bt-capa-contato">
                  <strong>
                    {rodape.telefone} <Telefone />
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* No celular, a pausa da luz fica no balcão, embaixo do cartão (inicio.css); na mesa, na tira. */}
        <Pausa rotulo={tira.pausa} className="bt-capa-pausa" />
      </section>

      {/* 2 · O preço no chapado: a lista tipográfica (identidade, seção 4.12), o porte à esquerda e o preço à direita,
          numa coluna pelo tnum; o rolo de tinta passa sobre a prova impressa na cartolina e deixa os preços vazados, uma
          vez. Sob a mão,
          só o número da linha pega a luz (cada linha é uma peça); a lista não leva a régua de leitura (14.10.2026). */}
      <section aria-labelledby="preco-titulo" className="bt-cena bt-tinta bt-preco">
        <div className="bt-largura">
          <div className="bt-preco-cabeca">
            <h2 id="preco-titulo" className="bt-titulo bt-preco-titulo">
              Quanto custa o banho
            </h2>
            <p className="bt-destaque">
              Pelagem {pelagens.curta.toLowerCase()}, por porte. {valoresDe}.
            </p>
          </div>
          <div data-bt-revela="" className="bt-preco-peca">
            <div className="bt-preco-regua">
              {listaDePrecos()}
              {/* A folha que o rolo cobre: a prova da mesma lista, uva na cartolina, que a tinta vira (inicio.css). */}
              <div aria-hidden="true" inert data-nosnippet="" className="bt-preco-rolo">
                <div className="bt-cartolina bt-preco-prova">{listaDePrecos(true)}</div>
              </div>
            </div>
          </div>
          <p className="bt-preco-nota">
            <Vinculo href={tabela}>As outras pelagens, a tosa e os acréscimos, em {paginaDe("servicos").rotulo}</Vinculo>
          </p>
          {/* No celular, a ação ao alcance do polegar logo depois do preço (inicio.css; na mesa, a tira já a tem à vista). */}
          <Carimbo miudo className="bt-preco-acao" />
        </div>
      </section>

      {/* 3 · Do pente à entrega: a cartolina de ponta a ponta. O título numa linha, o trato e o exemplo embaixo dele; a
          linha do atendimento de ponta a ponta, em trechos chapados do tamanho dos minutos de cada etapa (a soma é a
          tabela), com a hora em que cada etapa começa e os minutos vazados no trecho, e o nome e o que se faz alternados
          em cima e embaixo, como no roteiro; ela termina no cartão de entrega, que pende do último trecho e passa da borda
          da cena, deitado sobre a tinta da cena 4. */}
      <section aria-labelledby="atendimento-titulo" className="bt-cena bt-cartolina bt-atendimento">
        <div className="bt-largura bt-atendimento-grade">
          <h2 id="atendimento-titulo" className="bt-titulo bt-atendimento-titulo">
            Do pente à entrega
          </h2>
          <p className="bt-atendimento-trato">
            {tratamento.semSedacao} {tratamento.umaPessoaCurta}
          </p>
          {/* "1 h 30" não se parte (a 768 px, o "h 30" descia sozinho para a linha de baixo). */}
          <p className="bt-atendimento-exemplo">{atendimento.exemplo.replace(/(\d) h (\d)/g, "$1\u00a0h\u00a0$2")}</p>
          {/* --i e --fila: abaixo de 640 px, a fita deita numa linha só e os rótulos vêm embaixo, um por fila (inicio.css). */}
          <ol className="bt-linha" style={{ "--bt-trechos": trechos, "--bt-etapas": etapas.length } as React.CSSProperties}>
            {etapas.map((e, i) => (
              <li
                key={e.nome}
                data-lado={lado(i)}
                data-curto={e.minutos < 10 ? "" : undefined}
                className="bt-linha-etapa"
                style={{ "--ate": ate(i), "--min": e.minutos, "--i": i + 1, "--fila": i + 2 } as React.CSSProperties}
              >
                <div className="bt-linha-rotulo">
                  {/* A hora e os minutos do trecho, à vista no rótulo quando o trecho é estreito demais para eles (o
                      leitor de tela já os lê no trecho). */}
                  <p aria-hidden="true" className="bt-linha-quando">
                    {noRelogio(e.inicio)} · {e.minutos} min
                  </p>
                  <h3 className="bt-linha-nome">{e.nome}</h3>
                  <p className="bt-linha-oque">{e.oQue}</p>
                </div>
                <div className="bt-linha-trecho">
                  <p className="bt-linha-hora">{noRelogio(e.inicio)}</p>
                  <p className="bt-linha-minutos">
                    <span className="sr-only">, </span>
                    {e.minutos}
                    <span className="bt-linha-min"> min</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
          {/* O gesto da cena, uma vez: ao chegar, o cartão de entrega vira, das costas (a marca da casa) para a frente. */}
          <div data-bt-revela="" className="bt-atendimento-entrega">
            <CartaoDeEntrega />
          </div>
        </div>
      </section>

      {/* 4 · Fora da tabela: o descanso, só tipografia. O título no corpo dos números, em duas linhas, na coluna dele; as
          quatro ausências empilhadas na outra, cada uma com a razão, sem fio e sem régua. Nada se revela aqui. */}
      <section id="fora-da-tabela" aria-labelledby="fora-titulo" className="bt-cena bt-tinta bt-fora">
        <div className="bt-largura bt-fora-grade">
          <h2 id="fora-titulo" className="bt-fora-titulo">
            {ausencias.titulo}
          </h2>
          <dl className="bt-fora-lista">
            {ausencias.itens.map((a) => (
              <div key={a.item} className="bt-fora-item">
                <dt>{a.item}</dt>
                <dd>{a.razao}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 5 · Quando e onde: o verso do cartão, inteiro, deitado na cartolina e sobre a borda da cena 4 (lapidação, rodada
          3: o título à esquerda e o mapa à direita eram a abertura de Onde da odontologia). Como no verso de um cartão de
          gráfica: o mapinho dos bairros do leva e traz, com o dia de cada um, na margem do papel, e a linha do leva e traz
          embaixo dele; ao lado, o título, o horário impresso (o bloco chapado de tinta, a 24 px, parado e sem régua) e o
          endereço. O verso inclina sob a mão. No DOM, o título e o texto vêm antes do mapa (no celular, a ordem da
          leitura; na mesa, a grade põe o mapa à esquerda: inicio.css). */}
      <section aria-labelledby="quando-titulo" className="bt-cena bt-cartolina bt-quando">
        <div className="bt-largura">
          <div className="bt-perspectiva bt-quando-mesa">
            <div data-bt-peca="inclina" className="bt-quando-verso">
              <div className="bt-quando-texto">
                <h2 id="quando-titulo" className="bt-titulo bt-quando-titulo">
                  Quando e onde
                </h2>
                <div className="bt-tinta bt-horario">
                  <dl>
                    {diasAbertos.map((g) => (
                      <div key={g.dias} className="bt-horario-linha">
                        <dt>{g.dias}</dt>
                        <dd>{g.texto}</dd>
                      </div>
                    ))}
                    <div className="bt-horario-linha bt-horario-fechado">
                      <dt>{diasFechados}</dt>
                      <dd>{fechado}</dd>
                    </div>
                  </dl>
                  <p className="bt-horario-feriados">{feriados}</p>
                </div>
                <Endereco rotuloDoMapa={mapa.abrir} className="bt-quando-endereco" />
              </div>
              <div className="bt-quando-mapa-coluna">
                <Mapa className="bt-quando-mapa" />
                <p className="bt-quando-leva bt-quando-leva-mapa">
                  {levaETraz.titulo}: {levaETraz.condicao.charAt(0).toLowerCase() + levaETraz.condicao.slice(1)} O dia está
                  no mapa; o de {semRotulo.nome}, {semRotulo.dias.toLowerCase()};{" "}
                  <Vinculo href={`${tabela}#leva-e-traz`}>o valor e a janela, em {paginaDe("servicos").rotulo}</Vinculo>.
                </p>
                {/* No celular, os dias vão no texto, e o mapinho leva só o nome dos bairros (inicio.css). */}
                <p className="bt-quando-leva bt-quando-leva-dias">
                  {levaETraz.titulo}: {levaETraz.condicao.charAt(0).toLowerCase() + levaETraz.condicao.slice(1)} {diasEmTexto};{" "}
                  <Vinculo href={`${tabela}#leva-e-traz`}>o valor e a janela, em {paginaDe("servicos").rotulo}</Vinculo>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 · A mensagem pronta: o título numa linha, de ponta a ponta; embaixo, o pedido impresso como a casa imprime os
          seus papéis, citado por inteiro, com as lacunas em fio para preencher, na coluna larga; na estreita, a condição
          do nó (antes da ação) e o carimbo claro, que bate uma vez, com o prazo de resposta embaixo. */}
      <section aria-labelledby="mensagem-titulo" className="bt-cena bt-tinta bt-mensagem">
        <div className="bt-largura bt-mensagem-grade">
          <h2 id="mensagem-titulo" className="bt-titulo bt-mensagem-titulo">
            A mensagem pronta
          </h2>
          <p className="bt-mensagem-texto">
            “
            {mensagemPronta.split("___").map((trecho, i) =>
              i === 0 ? (
                <Fragment key={i}>{trecho}</Fragment>
              ) : (
                // A lacuna e o sinal que a fecha ficam na mesma linha (o ponto nunca abre a linha seguinte).
                <Fragment key={i}>
                  <span className="whitespace-nowrap">
                    <span className="bt-lacuna">
                      <span className="sr-only">em branco</span>
                    </span>
                    {trecho.charAt(0)}
                  </span>
                  {trecho.slice(1)}
                </Fragment>
              ),
            )}
            ”
          </p>
          <div className="bt-mensagem-assina">
            <p className="bt-mensagem-no">
              {condicaoDoNo.chegada} {condicaoDoNo.marcado}.
            </p>
            <div data-bt-revela="" className="bt-mensagem-batida">
              <Carimbo claro />
            </div>
            <p className="bt-nota bt-mensagem-prazo">{site.prazoDeResposta}</p>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";

import { Envelope, Secao } from "@/components/estrutura";
import { IconeVisto } from "@/components/icones";
import { Lide } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { EtiquetaRecomendado } from "@/components/ui/etiqueta-recomendado";
import { extras, notaDeFundacao, tabela, type ValorDaLinha } from "@/conteudo/paginas/planos";
import { modulos, planos, type Plano } from "@/conteudo/planos";
import { acaoOrcamento, planosSecao } from "@/conteudo/site";
import { reais } from "@/lib/moeda";
import { cn } from "@/lib/utils";

/**
 * O que cada plano inclui (R10, 28/10; até então, três cartões lado a lado, com a prévia do site de cada plano).
 * - Na mesa (1024 px ou mais), a tabela de ofício, uma <table> de 17 linhas: a chave dos nomes presa no alto, "Criação"
 *   e "Por mês" em cima, três grupos e o "—" para a ausência. A coluna do Profissional é a placa navy (D7): o
 *   raio de 28 px e a sombra longa da manhã, da chave à última linha. A grade é a mesma da escada da abertura
 *   (quatro colunas, 24 px entre elas): cada degrau pousa na coluna do seu plano.
 * - No celular e no tablet, a galeria de deslizar (D19): um quadro por plano, centrado e encaixado, que abre no
 *   Profissional; o quadro dele é a placa navy.
 * As duas marcações saem do mesmo dado (conteudo/paginas/planos.ts e conteudo/planos.ts); a que não vale na largura
 * fica com display: none (app/paginas/planos.css). Depois, a nota 1 (a condição de fundação, D3, com id="fundacao") e
 * os extras, um razão com duas colunas de algarismos. As prévias dos sites saíram da tabela: os sites de exemplo vivem
 * na seção seguinte, em tamanho legível (paginas/planos.md, 3.2).
 * O "Recomendado" (D15): a etiqueta do sistema na borda de cima da placa e dentro do "Escolher" do Profissional, a
 * 16 px. Só esse "Escolher" leva a faixa de luz (.vd-brilho).
 */
/** A sombra longa do recomendado, na tinta do papel e do lado da hora (a placa é navy, mas a sombra cai na névoa). */
const SOMBRA_DO_RECOMENDADO = [
  "inset 0 0 0 1px var(--aresta)",
  "calc(var(--sombra-dx, 0) * 6px) 4px 8px rgb(15 42 71 / 0.1)",
  "calc(var(--sombra-dx, 0) * 28px) 28px 56px -18px rgb(15 42 71 / 0.3)",
].join(", ");

const metade = (p: Plano) => `2 × ${reais(p.criacao / 2)}`;
const nomeDoEscolher = (p: Plano) => `${planosSecao.acaoPlano} o ${p.nome}${p.destaque ? `, ${tabela.recomendado}` : ""}`;

/** O valor de uma linha: o visto, a ausência ou o texto, com o nome para o leitor de tela. */
function Valor({ valor }: { valor: ValorDaLinha }) {
  if (valor === true)
    return (
      <span role="img" aria-label={tabela.incluido} className="vd-visto">
        <IconeVisto />
      </span>
    );
  if (valor === false)
    return (
      <span role="img" aria-label={tabela.naoIncluido} className="vd-ausente">
        —
      </span>
    );
  return <>{valor}</>;
}

/** A chamada da nota 1, junto do rótulo "Criação" (e não das metades: ali, o desconto se leria como R$ 450 no total). */
function Chamada() {
  return (
    <a href="#fundacao" className="vd-chamada" aria-label={tabela.chamada}>
      1
    </a>
  );
}

export function Planos() {
  const linhas = tabela.grupos.flatMap((g) => g.linhas);
  const contagem = 3 + linhas.length;
  if (contagem !== 17) throw new Error(`A tabela dos planos tem ${contagem} linhas, e o contrato pede 17`);

  return (
    <Secao id="planos" tom="claro" className="pt-20 md:pt-24 lg:pt-9">
      <Envelope>
        {/* O título e o lide: no celular, sobre a galeria; na mesa, dentro da <caption> da tabela (abaixo). */}
        <div className="lg:hidden">
          <h2 className="text-numero">{tabela.titulo}</h2>
          <Lide className="mt-4">{tabela.lide}</Lide>
        </div>

        <div className="relative">
        {/* ---------- no celular e no tablet: a galeria, um quadro por plano ---------- */}
        <div className="vd-galeria-quadro vd-galeria-lg vd-planos-galeria mt-12 md:mt-16 lg:mt-0" style={{ "--galeria-polegar": 1 / planos.length } as React.CSSProperties}>
          <div aria-hidden="true" className="vd-galeria-trilho mt-0 mb-4" />
          <div className="vd-galeria">
            {planos.map((plano) => (
              <article
                key={plano.id}
                // O destino de cada degrau da escada da abertura. Na mesa, o quadro fica invisível sobre a tabela, e o
                // degrau leva a ela (planos.css, .vd-planos-galeria).
                id={`plano-${plano.id}`}
                data-inicial={plano.destaque || undefined}
                data-tom={plano.destaque ? "escuro" : undefined}
                aria-labelledby={`nome-do-plano-${plano.id}`}
                {...(plano.destaque && { "data-ambiente": "", "data-passiva": "planos-quadro" })}
                className={cn("vd-quadro-plano relative flex flex-col rounded-xl", plano.destaque ? "vd-materia" : "bg-card shadow-[var(--sombra-curta)]")}
                style={plano.destaque ? { boxShadow: SOMBRA_DO_RECOMENDADO } : undefined}
              >
                {plano.destaque && (
                  <span aria-hidden="true" className="vd-quadro-corrente">
                    <span className="vd-corrente mov-passiva" />
                  </span>
                )}
                {plano.destaque && <EtiquetaRecomendado className="vd-cartela" />}
                <h3 id={`nome-do-plano-${plano.id}`} className="font-sub text-destaque font-medium tracking-sub">
                  {plano.nome}
                </h3>
                <p className="mt-1 font-sub text-destaque font-light tracking-sub text-muted-foreground">{tabela.tarefa.valores[plano.id]}</p>
                <dl className="vd-quadro-precos">
                  <div>
                    <dt>
                      {tabela.criacao.rotulo}
                      <Chamada />
                    </dt>
                    <dd className="vd-quadro-valor">
                      <span className="vd-quadro-criacao">{reais(plano.criacao)}</span>
                      <span className="vd-quadro-metades">{metade(plano)}</span>
                    </dd>
                    <dd className="vd-quadro-explicacao">{tabela.criacao.explicacao}</dd>
                  </div>
                  <div>
                    <dt>{tabela.porMes.rotulo}</dt>
                    <dd className="vd-quadro-valor">{reais(plano.mensal)}</dd>
                    <dd className="vd-quadro-explicacao">{tabela.porMes.explicacao}</dd>
                  </div>
                </dl>
                {tabela.grupos.map((grupo) => (
                  <div key={grupo.titulo} className="vd-quadro-grupo">
                    <h4 className="font-sub text-base font-medium tracking-sub">{grupo.titulo}</h4>
                    <dl>
                      {grupo.linhas.map((linha) => (
                        <div key={linha.rotulo} data-ausente={linha.valores[plano.id] === false || undefined}>
                          <dt>{linha.rotulo}</dt>
                          <dd>
                            <Valor valor={linha.valores[plano.id]} />
                          </dd>
                          {linha.explicacao && <dd className="vd-quadro-explicacao">{linha.explicacao}</dd>}
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
                <Link
                  href={`${acaoOrcamento.destino}#orcamento-${plano.id}`}
                  aria-label={nomeDoEscolher(plano)}
                  className={buttonVariants({
                    variant: plano.destaque ? "default" : "secondary",
                    className: cn("mt-auto w-full flex-wrap gap-y-1 text-balance [overflow-wrap:anywhere]", plano.destaque && "vd-brilho"),
                  })}
                >
                  {planosSecao.acaoPlano} {plano.nome}
                  {plano.destaque && <EtiquetaRecomendado />}
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* ---------- na mesa: a tabela ---------- */}
        <div className="vd-tabela-moldura">
          {/* O nome da tabela é o título (o lide fica na <caption>, para ler, e fora do nome). */}
          <table className="vd-tabela" role="table" aria-labelledby="titulo-da-tabela">
            <caption>
              <h2 id="titulo-da-tabela" className="text-numero">
                {tabela.titulo}
              </h2>
              <Lide className="mt-4">{tabela.lide}</Lide>
            </caption>
            {/* A corrente da placa (a passiva P33): a luz deriva pela coluna do Profissional, da chave à última linha. Fora da
                árvore de acessibilidade: um corpo de tabela só de desenho, porque a tabela é uma grade e a placa, o pseudo dela. */}
            <tbody aria-hidden="true" className="vd-placa-corrente" data-ambiente data-passiva="planos-placa">
              <tr>
                <td>
                  <span className="vd-corrente mov-passiva" />
                </td>
              </tr>
            </tbody>
            <thead role="rowgroup">
              <tr role="row" className="vd-tabela-chave">
                <th role="columnheader" scope="col">
                  <span className="sr-only">{tabela.item}</span>
                </th>
                {planos.map((plano) => (
                  <th role="columnheader" scope="col" key={plano.id} className={cn(plano.destaque && "vd-na-placa")}>
                    {plano.destaque && <EtiquetaRecomendado className="vd-cartela" />}
                    <span className="vd-tabela-plano">{plano.nome}</span>
                    <Link
                      href={`${acaoOrcamento.destino}#orcamento-${plano.id}`}
                      aria-label={nomeDoEscolher(plano)}
                      className={buttonVariants({
                        variant: plano.destaque ? "default" : "secondary",
                        size: "sm",
                        className: cn("flex-wrap gap-y-1 px-4", plano.destaque && "vd-brilho"),
                      })}
                    >
                      {planosSecao.acaoPlano}
                      {plano.destaque && <EtiquetaRecomendado />}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody role="rowgroup">
              <tr role="row" className="vd-tabela-tarefa">
                <th role="rowheader" scope="row">
                  <span className="vd-tabela-rotulo">{tabela.tarefa.rotulo}</span>
                </th>
                {planos.map((plano) => (
                  <td role="cell" key={plano.id} className={cn(plano.destaque && "vd-na-placa")}>
                    {tabela.tarefa.valores[plano.id]}
                  </td>
                ))}
              </tr>
              <tr role="row" className="vd-tabela-linha">
                <th role="rowheader" scope="row">
                  <span className="vd-tabela-rotulo">
                    {tabela.criacao.rotulo}
                    <Chamada />
                  </span>
                  <span className="vd-tabela-explicacao">{tabela.criacao.explicacao}</span>
                </th>
                {planos.map((plano) => (
                  <td role="cell" key={plano.id} className={cn(plano.destaque && "vd-na-placa")}>
                    <span className="vd-tabela-preco">
                      {reais(plano.criacao)}
                      <span>{metade(plano)}</span>
                    </span>
                  </td>
                ))}
              </tr>
              <tr role="row" className="vd-tabela-linha">
                <th role="rowheader" scope="row">
                  <span className="vd-tabela-rotulo">{tabela.porMes.rotulo}</span>
                  <span className="vd-tabela-explicacao">{tabela.porMes.explicacao}</span>
                </th>
                {planos.map((plano) => (
                  <td role="cell" key={plano.id} className={cn(plano.destaque && "vd-na-placa")}>
                    {reais(plano.mensal)}
                  </td>
                ))}
              </tr>
            </tbody>
            {tabela.grupos.map((grupo) => (
              <tbody role="rowgroup" key={grupo.titulo}>
                <tr role="row" className="vd-tabela-grupo">
                  <th role="rowheader" scope="rowgroup" colSpan={4}>
                    <h3 className="font-sub text-destaque font-medium tracking-sub">{grupo.titulo}</h3>
                  </th>
                </tr>
                {grupo.linhas.map((linha) => (
                  <tr role="row" key={linha.rotulo} className="vd-tabela-linha">
                    <th role="rowheader" scope="row">
                      <span className="vd-tabela-rotulo">{linha.rotulo}</span>
                      {linha.explicacao && <span className="vd-tabela-explicacao">{linha.explicacao}</span>}
                    </th>
                    {planos.map((plano) => (
                      <td role="cell" key={plano.id} className={cn(plano.destaque && "vd-na-placa")}>
                        <Valor valor={linha.valores[plano.id]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
        </div>

        {/* A nota 1 (D3): a condição de fundação, o destino do montador (/planos#fundacao). */}
        <p id="fundacao" className="vd-nota-de-fundacao">
          <span aria-hidden="true" className="vd-nota-marca">
            1
          </span>{" "}
          {notaDeFundacao}
        </p>

        {/* ---------- os extras: o razão, com o preço em duas colunas de algarismos ---------- */}
        <section className="vd-extras" aria-labelledby="titulo-extras">
          <header>
            <h2 id="titulo-extras" className="text-numero">
              {extras.titulo}
            </h2>
          </header>
          <table className="vd-razao" role="table" aria-labelledby="titulo-extras">
            <thead role="rowgroup">
              <tr role="row">
                <th role="columnheader" scope="col">
                  {extras.colunas.extra}
                </th>
                <th role="columnheader" scope="col">
                  {extras.colunas.criacao}
                </th>
                <th role="columnheader" scope="col">
                  {extras.colunas.mensal}
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              {modulos.map((m) => (
                <tr role="row" key={m.id}>
                  <th role="rowheader" scope="row">
                    <span className="vd-razao-nome">{m.nome}</span>
                    <span className="vd-razao-descricao">{m.descricao}</span>
                  </th>
                  <td role="cell">
                    {reais(m.criacao)}
                    <span className="vd-razao-unidade">{m.porPagina ? extras.unidades.porPagina : <span className="vd-so-celular">{extras.unidades.criacao}</span>}</span>
                  </td>
                  <td role="cell">
                    {m.mensal ? (
                      <>
                        {reais(m.mensal)}
                        <span className="vd-razao-unidade vd-so-celular">{extras.unidades.mensal}</span>
                      </>
                    ) : (
                      <>
                        <span role="img" aria-label={extras.unidades.semMensalidade} className="vd-ausente vd-so-mesa">
                          —
                        </span>
                        <span className="vd-razao-unidade vd-so-celular">{extras.unidades.semMensalidade}</span>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Envelope>
    </Secao>
  );
}

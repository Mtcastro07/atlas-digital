import { SombrasDaEscada } from "@/components/ilhas/escada-em-dois-estados";
import { mascaraDaPedra } from "@/components/paginas/pedra-em-pontos";
import { criacaoNaFundacao, fundacaoNoPreco, planos } from "@/conteudo/planos";
import { figuras, planosSecao, simulador } from "@/conteudo/site";
import { reais } from "@/lib/moeda";

/** O degrau mais alto (o Completo): 100% da altura. */
const TOPO = Math.max(...planos.map((p) => p.criacao));
/** O passo da régua de reais: o maior divisor comum dos preços (R$ 300), para todo degrau cheio cair numa isolinha. */
const mdc = (a: number, b: number): number => (b ? mdc(b, a % b) : a);
const PASSO = planos.map((p) => p.criacao).reduce(mdc);
/** As isolinhas, de R$ 0 (o chão) ao topo. */
const ISOLINHAS = Array.from({ length: TOPO / PASSO + 1 }, (_, i) => i * PASSO);

/**
 * A abertura de /planos: a escada em dois estados (desde 17/10, a direção final do Atlas Digital, seção 3, item 12, e a
 * passagem da seção 2.8). Os três degraus em escala exata do preço da criação (conteudo/planos.ts: 900 : 1.500 : 2.400,
 * 37,5, 62,5 e 100% da altura), de pedra com grão e canto vivo. A metade de baixo de cada degrau é o que se paga,
 * chapado ("R$ 450", "+ R$ 190 por mês"); a metade de cima é a mesma pedra aberta em pontos (pedra-em-pontos.ts), com o
 * nome e o valor cheio riscado em cima: a condição de fundação (×0,5) como a fronteira das duas metades, o preço
 * gravado na pedra e a condição provisória em ponto, numa peça só. A régua de reais na margem direita, uma isolinha a
 * cada R$ 300 só onde há degrau; as sombras pelo Sol de agora, em hachura no chão da tela (a ilha
 * ilhas/escada-em-dois-estados.tsx, que também anima a passagem: a escada sobe e a metade de cima se abre enquanto o
 * risco cruza o valor cheio).
 * Esta é também a reserva sem script: o HTML já traz a metade aberta, o risco e a régua, e cada degrau leva ao plano
 * dele na tabela, logo abaixo. A figura inteira é desenho para o leitor de tela, menos os vínculos dos degraus (o nome,
 * o valor cheio e o valor na condição) e a legenda.
 * Até 17/10, os degraus de 46, 70 e 100% (fora de escala), de cantos arredondados, com o corrimão tracejado e a sombra
 * em mancha no papel de baixo (EscadaDePrecos, em components/paginas/figuras.tsx, que agora reexporta esta).
 */
export function EscadaDePrecos() {
  const { campo, faixa } = mascaraDaPedra();
  const desconto = `${Math.round((1 - fundacaoNoPreco.fator) * 100)}%`;
  const { escada } = figuras;
  return (
    <figure
      aria-label={escada.descricao}
      className="vd-escada"
      // --fator: a fronteira das duas metades de cada degrau, a da condição de fundação (o que se paga, embaixo).
      // --r-segundo: a altura do segundo degrau, o teto do vão em que a legenda se assenta no celular (app/digital.css).
      style={{ "--mascara-campo": campo, "--mascara-faixa": faixa, "--fator": fundacaoNoPreco.fator, "--r-segundo": planos[1].criacao / TOPO } as React.CSSProperties}
    >
      <div className="vd-escada-campo">
        {/* A unidade da régua por extenso; na régua estreita do celular (abaixo de 380 px, app/digital.css), só "R$" no
            alto, e as isolinhas sem ele. */}
        <p aria-hidden="true" className="vd-escada-unidade">
          <span className="vd-escada-extenso">{escada.regua}</span>{" "}
          <span className="vd-escada-curto">R$</span>
        </p>
        <ol aria-hidden="true" className="vd-escada-regua">
          {ISOLINHAS.map((valor) => (
            <li
              key={valor}
              data-chao={valor === 0 || undefined}
              // A isolinha começa no primeiro degrau que chega ao valor: fora dele, a régua cruzaria o lide.
              style={{ "--v": valor / TOPO, "--de": Math.max(0, planos.findIndex((p) => p.criacao >= valor)) } as React.CSSProperties}
            >
              {valor > 0 && (
                <span>
                  <span className="vd-escada-extenso">R$ </span>
                  {valor.toLocaleString("pt-BR")}
                </span>
              )}
            </li>
          ))}
        </ol>
        <ul className="vd-escada-degraus">
          {planos.map((plano, k) => (
            <li key={plano.id} style={{ "--k": k, "--r": plano.criacao / TOPO } as React.CSSProperties}>
              <a href={`#plano-${plano.id}`} className="vd-degrau">
                <span className="vd-degrau-rotulo">
                  <span className="vd-degrau-nome">{plano.nome}</span>{" "}
                  <s className="vd-riscado">
                    <span className="sr-only">{planosSecao.fundacao.cheio}: </span>
                    {reais(plano.criacao)}
                  </s>{" "}
                </span>
                <span aria-hidden="true" className="vd-degrau-aberto">
                  <span data-tom="pedra" className="vd-materia vd-degrau-campo" />
                  <span data-tom="pedra" className="vd-materia vd-degrau-faixa" />
                </span>
                <span data-tom="pedra" className="vd-materia vd-degrau-pedra">
                  <span className="vd-preco vd-degrau-preco">
                    <span className="sr-only">{planosSecao.fundacao.metade}: </span>
                    <span className="unidade">R$</span> {criacaoNaFundacao(plano).toLocaleString("pt-BR")}
                  </span>{" "}
                  <span className="vd-degrau-mes">
                    + {reais(plano.mensal)} {simulador.mensal}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <canvas aria-hidden="true" className="vd-escada-chao" />
      </div>
      <figcaption className="vd-legenda-de-carta vd-escada-legenda">
        <strong>{escada.escala}</strong> {escada.altura} A metade em pontos é a condição de fundação: {desconto} de desconto na
        criação, {planosSecao.fundacao.condicao}. <SombrasDaEscada reserva={escada.sombras} lugar={figuras.coordenadas.decimal} />
      </figcaption>
    </figure>
  );
}

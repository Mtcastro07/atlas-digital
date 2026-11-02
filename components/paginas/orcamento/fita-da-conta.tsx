import { montador } from "@/conteudo/paginas/orcamento";
import { planos } from "@/conteudo/planos";
import { reais } from "@/lib/moeda";

/**
 * A fita da conta (R10, acabamento, 02/11; a passiva P19), no alto de /orcamento e ao lado do montador do início: a fita sobe sem parar, na janela de um
 * contador, com os valores de conteudo/planos.ts: a criação e a mensalidade de cada plano. Decorativa: o montador, logo
 * abaixo, diz os mesmos valores em texto. Um fluxo linear, numa camada só, em HTML; a fita tem o dobro da altura do laço.
 */
export function FitaDaConta({ noAlto = false }: { noAlto?: boolean }) {
  const linhas = planos.map((p) => (
    <span key={p.id} className="orc-fita-linha">
      <b>{reais(p.criacao)}</b>
      <span>
        {montador.umaVez}{" "}
        <br />
        {reais(p.mensal)} {montador.porMes}
      </span>
    </span>
  ));
  return (
    <div className={noAlto ? "orc-fita orc-fita-no-alto" : "orc-fita"} data-ambiente data-passiva="conta-fita" aria-hidden="true">
      <div className="orc-fita-corre mov-passiva">
        {linhas}
        {linhas}
      </div>
    </div>
  );
}

import { montador } from "@/conteudo/paginas/orcamento";
import { planos } from "@/conteudo/planos";
import { reais } from "@/lib/moeda";

/**
 * A fita da conta (R10, acabamento, 02/11; a passiva P19), no alto de /orcamento e ao lado do montador do início: os
 * valores de conteudo/planos.ts se sucedem no mesmo lugar, a criação e a mensalidade de cada plano; um chega por baixo
 * enquanto o anterior sobe e se dissolve, sem texto cortado. Decorativa: o montador, logo abaixo, diz os mesmos valores em
 * texto. Em repouso, o primeiro plano.
 */
export function FitaDaConta({ noAlto = false }: { noAlto?: boolean }) {
  const linhas = planos.map((p, i) => (
    <span key={p.id} className="orc-fita-linha mov-passiva" style={{ "--vez": i } as React.CSSProperties}>
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
      {linhas}
    </div>
  );
}

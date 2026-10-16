"use client";

import { useId } from "react";

import { MapaDosDentes } from "@/components/demos/odontologia/mapa-dos-dentes";
import { AREAS, type RegiaoId } from "@/lib/demos/odontologia/dentes";

export type OpcaoDeRegiao = { id: RegiaoId; nome: string };

/**
 * O mapa dos dentes como controle (producao/esteira/nichos/odontologia.md, seções 5.1 e 5.2). Os controles de verdade
 * são rádios num <fieldset> com <legend>: o teclado e o leitor de tela escolhem por eles. A folha do mapa é uma âncora
 * fixa da arcada (o palco do layout): a placa de cerâmica se desenha nela, quase plana, e pinta a região escolhida sem
 * se aproximar (data-fixa), para as áreas de toque do mapa, por cima, continuarem no lugar. Sem o palco (sem script,
 * sem WebGL), o mapa em traço é o desenho, e o lápis circula a região. Serve ao plano de sessões (Tratamentos) e ao
 * pedido de avaliação. Recebe só o que usa.
 */
export function EscolhaDeRegiao({
  regioes,
  valor,
  aoMudar,
  legenda,
  todas,
  ajuda,
  cabeca,
  legendas,
}: {
  regioes: readonly OpcaoDeRegiao[];
  valor: RegiaoId | "";
  aoMudar: (v: RegiaoId | "") => void;
  legenda: string;
  todas: string;
  ajuda?: string;
  /** O cabeçalho da folha (o rótulo da ficha à esquerda, a numeração à direita). */
  cabeca?: React.ReactNode;
  legendas: { superior: string; inferior: string };
}) {
  const grupo = useId();
  return (
    <fieldset className="od-escolha">
      <legend className="od-escolha-legenda">{legenda}</legend>
      {ajuda && <p className="od-escolha-ajuda">{ajuda}</p>}
      <div className="od-folha-do-mapa">
        {cabeca && <div className="od-folha-cabeca">{cabeca}</div>}
        <div data-arcada data-fixa data-inclina="-0.5" data-lado="0.16" data-regiao={valor || undefined} className="od-ancora od-ancora-fixa">
          {/* A chave remonta a faixa a cada escolha: o lápis circula de novo. */}
          <MapaDosDentes key={valor || "nenhuma"} ativas={valor ? [valor] : []} legendas={legendas}>
            {regioes.map((r) => (
              <path key={r.id} d={AREAS[r.id]} className="od-area" onClick={() => aoMudar(valor === r.id ? "" : r.id)} />
            ))}
          </MapaDosDentes>
        </div>
      </div>
      <div className="od-opcoes od-opcoes-regiao">
        <label>
          <input type="radio" name={grupo} value="" checked={valor === ""} onChange={() => aoMudar("")} className="peer sr-only" />
          <span className="od-opcao">{todas}</span>
        </label>
        {regioes.map((r) => (
          <label key={r.id}>
            <input type="radio" name={grupo} value={r.id} checked={valor === r.id} onChange={() => aoMudar(r.id)} className="peer sr-only" />
            <span className="od-opcao">{r.nome}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

"use client";
// components/ilhas/escolha-de-regiao.tsx — o mapa dos dentes como controle (producao/esteira/nichos/odontologia.md, seções 5.1
// e 5.2; producao/esteira/14-funcionalidades/07-funcionalidades-do-oficio.md, seção 4.1). Os controles de verdade são rádios num
// <fieldset> com <legend>; o desenho reflete a escolha e, com ponteiro, também escolhe (cada região é uma área de toque).
// Para o leitor de tela, o desenho é decoração. A inclinação leve do mapa (o gesto da marca) liga só com ponteiro fino.
// Compartilhada pelo plano de sessões (Tratamentos) e pelo pedido de avaliação. Recebe só o que usa.
import { useId } from "react";
import { MapaDosDentes } from "../mapa-dos-dentes";
import { TiltCard } from "../ui/spell/tilt-card";
import { AREAS } from "@/lib/oficio/dentes";
import type { RegiaoId } from "@/conteudo/tratamentos";

export type OpcaoDeRegiao = { id: RegiaoId; nome: string };

const CHIP =
  "inline-flex min-h-11 cursor-pointer items-center rounded-full border border-border bg-card px-4 text-nota font-semibold transition-colors duration-150 hover:bg-muted active:bg-muted peer-checked:border-accent peer-checked:bg-marcador peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ring";

export function EscolhaDeRegiao({
  regioes,
  valor,
  aoMudar,
  legenda,
  todas,
  ajuda,
}: {
  regioes: readonly OpcaoDeRegiao[];
  valor: RegiaoId | "";
  aoMudar: (v: RegiaoId | "") => void;
  legenda: string;
  todas: string;
  ajuda?: string;
}) {
  const grupo = useId();
  return (
    <fieldset className="grid gap-4">
      <legend className="font-semibold">{legenda}</legend>
      {ajuda && <p className="text-nota text-muted-foreground">{ajuda}</p>}
      <TiltCard limite={3} className="max-w-md">
        <div className="rounded-cartao border border-border bg-card p-4">
          <MapaDosDentes ativas={valor ? [valor] : []}>
            {regioes.map((r) => (
              <path key={r.id} d={AREAS[r.id]} className="mapa-area" onClick={() => aoMudar(valor === r.id ? "" : r.id)} />
            ))}
          </MapaDosDentes>
        </div>
      </TiltCard>
      <div className="flex flex-wrap gap-2">
        <label>
          <input type="radio" name={grupo} value="" checked={valor === ""} onChange={() => aoMudar("")} className="peer sr-only" />
          <span className={CHIP}>{todas}</span>
        </label>
        {regioes.map((r) => (
          <label key={r.id}>
            <input type="radio" name={grupo} value={r.id} checked={valor === r.id} onChange={() => aoMudar(r.id)} className="peer sr-only" />
            <span className={CHIP}>{r.nome}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

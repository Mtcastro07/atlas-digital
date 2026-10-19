"use client";

import { useSyncExternalStore } from "react";

import { assinar, vistas } from "@/components/ilhas/caminho-da-visita";

/**
 * O pé de uma porta: traço se a página já foi aberta nesta visita (o que já passou, gravado), ponto se não (o que
 * falta). O servidor e a hidratação desenham o ponto, que é a verdade de toda carga nova; o traço chega depois, sem
 * erro de hidratação. O estado vai ao leitor de tela pelo texto escondido, dentro do vínculo da porta; sem `vista`, só o
 * desenho (a rota da visita sob a galeria do celular, que é aria-hidden e repete os pés das portas).
 */
export function PeDaPorta({ caminho, vista }: { caminho: string; vista?: string }) {
  const aberta = useSyncExternalStore(
    assinar,
    () => vistas.has(caminho),
    () => false,
  );
  return (
    <>
      <span aria-hidden="true" className="vd-pe-da-porta" data-vista={aberta || undefined} />
      {aberta && vista && <span className="sr-only"> {vista}</span>}
    </>
  );
}

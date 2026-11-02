"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

// Só no navegador: a página da carga não entra (a capa tem o próprio momento); a que volta pelo histórico, também não
// (como antes, quando a View Transition só corria na ida). O voltar guarda o caminho a que leva: um voltar dentro da
// mesma página (de /planos#fundacao a /planos) não remonta o template, e um "voltou" sem caminho tirava a entrada da
// ida seguinte (a verificação de 27/10). Os dois se atualizam no commit, não no render, que o React pode refazer.
let carregou = false;
let voltouPara: string | null = null;
if (typeof window !== "undefined") window.addEventListener("popstate", () => (voltouPara = location.pathname));

/**
 * A troca de página do Atlas desde 27/10: a página nova chega de baixo, devagar (.atlas-entra, app/movimento.css), e
 * a que sai some de uma vez. Era a View Transition do React, cuja captura recalculava o estilo da página inteira e
 * segurava a tela por 4 a 5 quadros no celular (registros/atlas/design-v2/60fps-navegacao/RELATO.md).
 */
export function EntradaDaPagina({ children }: { children: React.ReactNode }) {
  const caixa = useRef<HTMLDivElement>(null);
  const caminho = usePathname();
  const [entra] = useState(() => typeof window !== "undefined" && carregou && voltouPara !== caminho);
  // Chegando numa âncora, sem a entrada: a ilha Ancoras mede o destino no primeiro quadro, e o deslocamento o tiraria do
  // lugar. O endereço novo, com a âncora, só está no histórico depois do commit: a classe sai aqui, antes da pintura, e
  // sem um novo render (um setState neste efeito adiantava os efeitos da página inteira para dentro do commit).
  useLayoutEffect(() => {
    carregou = true;
    voltouPara = null;
    if (window.location.hash) caixa.current?.classList.remove("atlas-entra");
    if (!caixa.current?.classList.contains("atlas-entra")) return;
    // Depois da entrada, a vitrine sai da contenção da troca de página (app/globals.css): contida, ela travava a rolagem.
    const entrou = window.setTimeout(() => caixa.current?.classList.add("atlas-entrou"), 1200);
    return () => window.clearTimeout(entrou);
  }, []);
  return (
    <div ref={caixa} className={entra ? "atlas-entra" : undefined}>
      {children}
    </div>
  );
}

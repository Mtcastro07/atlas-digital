"use client";
// components/ilhas/entrada-da-pagina.tsx — a troca de página (producao/esteira/13-tecnologia-e-estrutura.md, seção 3.7,
// regra 4): a página nova sobe e acende (.pagina-entra, app/globals.css), e a que sai some de uma vez. Sem a captura da
// View Transition, que reprova os 60 quadros no celular (producao/esteira/15-desempenho.md, seção 5.15).
// Nada com position: fixed dentro desta caixa: o transform da entrada faz dela a referência do fixo (portal para o <body>).
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

// Só no navegador: a carga não entra; o voltar e o avançar também não. O voltar guarda o caminho a que leva: um voltar
// dentro da mesma página (de /servicos#precos a /servicos) não remonta o template, e um "voltou" sem caminho tirava a
// entrada da ida seguinte. Os dois se atualizam no commit, não no render, que o React pode refazer.
let carregou = false;
let voltouPara: string | null = null;
if (typeof window !== "undefined") window.addEventListener("popstate", () => (voltouPara = location.pathname));

export function EntradaDaPagina({ children }: { children: React.ReactNode }) {
  const caixa = useRef<HTMLDivElement>(null);
  const caminho = usePathname();
  const [entra] = useState(() => typeof window !== "undefined" && carregou && voltouPara !== caminho);
  // Chegando numa âncora, sem a entrada: o deslocamento tiraria o destino do lugar. A classe sai direto no elemento, antes
  // da pintura; um setState aqui adiantava os efeitos da página inteira para dentro do commit (medido: pior).
  useLayoutEffect(() => {
    carregou = true;
    voltouPara = null;
    if (window.location.hash) caixa.current?.classList.remove("pagina-entra");
  }, []);
  return (
    <div ref={caixa} className={entra ? "pagina-entra" : undefined}>
      {children}
    </div>
  );
}

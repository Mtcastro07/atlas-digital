// components/transicao-de-pagina.tsx — a troca de página com o <ViewTransition> do React
// (producao/esteira/09-movimento.md, seção 8). Sem suporte do navegador, a troca é imediata.
import { ViewTransition } from "react";

export function TransicaoDePagina({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="pagina-entra" exit="pagina-sai" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

/** O cabeçalho, parado durante a troca (o nome só existe durante a transição). */
export function CabecalhoFixo({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition name="cabecalho" share="cabecalho-fixo" default="cabecalho-fixo">
      {children}
    </ViewTransition>
  );
}

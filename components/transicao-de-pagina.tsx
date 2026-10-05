import { ViewTransition } from "react";

/**
 * A transição entre as páginas (pedido do usuário, 01/10: "transições
 * suaves entre páginas, como as que a apple.com possui"). O <ViewTransition>
 * do React, que o App Router do Next liga sozinho a cada navegação: a
 * página que sai se apaga subindo um pouco, rápida; a que entra chega de
 * baixo, devagar (as animações em app/movimento.css, .pagina-sai e
 * .pagina-entra). Usada nos template.tsx de cada site, que remontam a cada
 * navegação. O cabeçalho fica ancorado (CabecalhoFixo, abaixo). Sem
 * suporte do navegador à View Transitions API, a troca é imediata, como
 * antes; com movimento reduzido, também.
 */
export function TransicaoDePagina({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="pagina-entra" exit="pagina-sai" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

/**
 * O cabeçalho de cada site, ancorado durante a transição: não se apaga
 * nem se move com a página (o grupo "cabecalho", em app/movimento.css). O
 * nome só existe durante a transição — fora dela, o vidro do cabeçalho
 * continua lendo o que passa por trás.
 */
export function CabecalhoFixo({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition name="cabecalho" share="cabecalho-fixo" default="cabecalho-fixo">
      {children}
    </ViewTransition>
  );
}

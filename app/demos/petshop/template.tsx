import { ViewTransition } from "react";

// O template remonta a cada navegação (o layout, não): é aqui que a página entra e sai. "O cartão desliza no balcão"
// (identidade, seção 4.9): a receita do kit no eixo x, pelas View Transitions nativas (o <ViewTransition> do React,
// que o App Router liga a cada navegação); as animações em petshop.css (.bt-troca-sai, .bt-troca-entra). Sem suporte
// do navegador, a troca é imediata; com movimento reduzido, também.

export default function Modelo({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="bt-troca-entra" exit="bt-troca-sai" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

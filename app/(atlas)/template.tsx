import { ViewTransition } from "react";

// O template remonta a cada navegação (o layout, não): é aqui que a página
// entra e sai. Desde 14/10, o Atlas tem as próprias classes (app/movimento.css,
// .atlas-sai e .atlas-entra), e não as de components/transicao-de-pagina.tsx,
// que os sites de nicho também usam: a página que sai se apaga em 150 ms,
// antes de a nova começar (aos 160 ms). Com a saída de 300 ms, os dois
// títulos ficavam sobrepostos no mesmo lugar por cerca de 150 ms em toda
// navegação interna (o crítico de fora, 14/10). A entrada é a mesma de antes.

export default function Modelo({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="atlas-entra" exit="atlas-sai" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

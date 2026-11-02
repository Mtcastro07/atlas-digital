import { EntradaDaPagina } from "@/components/ilhas/entrada-da-pagina";

// O template remonta a cada navegação (o layout, não): é aqui que a página entra (components/ilhas/entrada-da-pagina.tsx).
// Até 27/10, a View Transition do React, com as classes .atlas-sai e .atlas-entra: a saída em 150 ms, antes de a nova
// começar (o crítico de fora, 14/10, sobre os títulos sobrepostos). Desde então, só a entrada, sem a captura.

export default function Modelo({ children }: { children: React.ReactNode }) {
  return <EntradaDaPagina>{children}</EntradaDaPagina>;
}

// app/template.tsx — remonta a cada navegação (o layout, não): é aqui que a página entra (producao/esteira/09-movimento.md, seção 8).
import { EntradaDaPagina } from "@/components/ilhas/entrada-da-pagina";

export default function Template({ children }: { children: React.ReactNode }) {
  return <EntradaDaPagina>{children}</EntradaDaPagina>;
}

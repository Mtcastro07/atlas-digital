// app/template.tsx — remonta a cada navegação: a troca de página (producao/esteira/09-movimento.md, seção 8).
import { TransicaoDePagina } from "@/components/transicao-de-pagina";

export default function Template({ children }: { children: React.ReactNode }) {
  return <TransicaoDePagina>{children}</TransicaoDePagina>;
}

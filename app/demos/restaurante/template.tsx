import { TransicaoDePagina } from "@/components/transicao-de-pagina";

// O template remonta a cada navegação (o layout, não): é aqui que a página entra e sai, com a troca de página do Atlas
// (components/transicao-de-pagina.tsx), a mesma dos outros sites de demonstração.

export default function Modelo({ children }: { children: React.ReactNode }) {
  return <TransicaoDePagina>{children}</TransicaoDePagina>;
}

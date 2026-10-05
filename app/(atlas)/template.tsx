import { TransicaoDePagina } from "@/components/transicao-de-pagina";

// O template remonta a cada navegação (o layout, não): é aqui que a página
// entra e sai, com a transição suave (components/transicao-de-pagina.tsx).

export default function Modelo({ children }: { children: React.ReactNode }) {
  return <TransicaoDePagina>{children}</TransicaoDePagina>;
}

import type { Metadata } from "next";

import "./demos.css";

// Os três sites do simulador de planos (no palco da escada, components/secoes/escada.tsx):
// estabelecimentos fictícios, um por plano. Nunca indexados (selo de ficção
// e noindex são obrigatórios em todo demonstrativo; contextos/
// atlas--contexto-02-nichos.md, seção 2). Herdam do layout raiz só o
// esqueleto (html, as fontes de texto, o script do <head> que marca .js e o
// vínculo "Ir para o conteúdo"); o resto é de cada um.

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LayoutDosDemonstrativos({ children }: { children: React.ReactNode }) {
  return children;
}

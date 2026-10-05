import type { Viewport } from "next";

import { corpoDaNutricao, exibicaoDaNutricao } from "@/components/demos/nutricao/fontes";
import { RecolherAoRolar } from "@/components/ilhas/demos/recolher-ao-rolar";
import { Revelacao } from "@/components/ilhas/demos/revelacao";

import "./nutricao.css";

// A Nutrição Icaraí, site do plano Essencial: três páginas (o limite do
// plano), com navegação no cliente entre elas. O layout dá a raiz do site
// (o tom, as fontes) e a revelação, que refaz a varredura a cada página;
// o cabeçalho e o colofão vêm de cada página (components/demos/nutricao/
// moldura.tsx), que sabe qual item do índice marcar.

export const viewport: Viewport = { themeColor: "#f4efe4" };

export default function LayoutDaNutricao({ children }: { children: React.ReactNode }) {
  return (
    <div data-demo="nutricao" className={`min-h-dvh ${exibicaoDaNutricao.variable} ${corpoDaNutricao.variable}`}>
      {children}
      <Revelacao />
      <RecolherAoRolar />
    </div>
  );
}

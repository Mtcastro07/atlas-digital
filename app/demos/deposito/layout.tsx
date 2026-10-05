import type { Viewport } from "next";

import { corpoDoDeposito, exibicaoDoDeposito, monoDoDeposito } from "@/components/demos/deposito/fontes";
import { NavegacaoViva } from "@/components/ilhas/demos/navegacao-viva";
import { Revelacao } from "@/components/ilhas/demos/revelacao";

import "./deposito.css";

// O Depósito Engenhoca, site do plano Profissional: seis páginas (o limite
// do plano), com navegação no cliente entre elas. O layout dá a raiz do
// site (o tom, as fontes), o vidro do cabeçalho ao rolar e a revelação,
// que refazem a leitura a cada página; o cabeçalho e o rodapé vêm de cada
// página (components/demos/deposito/moldura.tsx), que sabe qual aba marcar.

export const viewport: Viewport = { themeColor: "#1b2128" };

export default function LayoutDoDeposito({ children }: { children: React.ReactNode }) {
  return (
    <div data-demo="deposito" className={`min-h-dvh ${exibicaoDoDeposito.variable} ${corpoDoDeposito.variable} ${monoDoDeposito.variable}`}>
      {children}
      <NavegacaoViva />
      <Revelacao />
    </div>
  );
}

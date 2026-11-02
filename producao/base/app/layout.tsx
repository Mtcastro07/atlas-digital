// app/layout.tsx — o layout raiz (producao/esteira/13-tecnologia-e-estrutura.md, seção 7): o idioma, as fontes,
// o script curto do <head>, o vínculo "Ir para o conteúdo", o cabeçalho e o rodapé, fora da caixa da entrada (app/template.tsx).
import type { Metadata, Viewport } from "next";
import { Cabecalho } from "@/components/cabecalho";
import { AoTopo } from "@/components/ilhas/ao-topo";
import { Revelacao } from "@/components/ilhas/revelacao";
import { Rodape } from "@/components/rodape";
import { negocio } from "@/conteudo/negocio";
import { texto, titulo } from "./fontes";
import "./globals.css";

// Roda no <head>, antes da primeira pintura, e não grava nada no aparelho:
// - .js: há script; só então a revelação esconde o que ainda vai entrar;
// - .ja-aberto: recarga ou volta pelo histórico; a entrada não se repete.
const primeiraAbertura = `(function(){var h=document.documentElement;h.classList.add("js");try{var n=performance.getEntriesByType("navigation")[0];if(n&&(n.type==="reload"||n.type==="back_forward"))h.classList.add("ja-aberto")}catch(e){}})()`;

export const metadata: Metadata = {
  metadataBase: new URL(negocio.url),
  // Sem canônico aqui: cada página declara o seu (producao/esteira/14/01, seção 10).
  // Site de exemplo [ex]: fora da busca (producao/esteira/14/01, seção 13).
  ...(negocio.exemplo ? { robots: { index: false, follow: false } } : {}),
};

// O themeColor é um dos poucos hexadecimais fora do CSS: o viewport do Next não lê variável de CSS.
// É o --background de app/identidade.css convertido para sRGB (oklch(0.985 0.008 80) = #fdfaf4).
export const viewport: Viewport = { themeColor: "#fdfaf4", viewportFit: "cover" };

export default function LayoutRaiz({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: o script do <head> acrescenta classes ao <html> antes da hidratação.
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${texto.variable} ${titulo.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: primeiraAbertura }} />
      </head>
      <body>
        <a
          href="#conteudo"
          className="fixed top-3 left-3 z-[70] -translate-y-24 rounded-full bg-primary px-5 py-2.5 text-primary-foreground no-underline transition-transform duration-300 focus:translate-y-0"
        >
          Ir para o conteúdo
        </a>
        <Cabecalho />
        {children}
        <Rodape />
        <Revelacao />
        <AoTopo />
      </body>
    </html>
  );
}

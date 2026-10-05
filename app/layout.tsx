import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { GiroDoGlobo } from "@/components/ilhas/giro-do-globo";
import { contato, metadados } from "@/conteudo/site";

import "./globals.css";

// As fontes do site de 28/08 (o publicado em agenciaatlasdigital.com), em
// todo aparelho — pedido de Gabriel Ribeiro Ota Yida em 05/10, que revoga
// San Francisco e Inter de 03/10: Archivo Black nos títulos e números,
// Archivo (300 a 500) no lide e nos subtítulos, Inter (400 a 700) no texto.
// Hospedadas junto ao site, só o subconjunto latino, os pesos e os recursos
// usados: 52,5 KB no total, contra 93 KB do Google Fonts no site antigo
// (app/fontes/README.md). O next/font exige valores literais em cada
// chamada: daí a repetição.
const titulo = localFont({
  src: "./fontes/archivo-black.woff2",
  weight: "400",
  variable: "--font-titulo",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

const subtitulo = localFont({
  src: "./fontes/archivo-variavel.woff2",
  weight: "300 500",
  variable: "--font-subtitulo",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

// O Inter entra como "optional": pré-carregado, aparece já na primeira
// pintura quando chega a tempo (o caso comum) e, se atrasar, a página fica
// na fonte do aparelho — San Francisco, Segoe ou Roboto, quase idênticas no
// texto corrido e com todos os pesos — até a próxima visita. Com "swap", a
// troca tardia refazia o layout da página inteira: ~50 ms a mais de TBT com
// CPU 20× (especificação, seção 7). Sem troca, a reserva não precisa imitar
// as medidas do Inter: daí adjustFontFallback: false (a reserva ajustada do
// Next é Arial, de um peso só). Títulos e lide, que dão a cara do site,
// ficam em "swap": aparecem sempre.
const texto = localFont({
  src: "./fontes/inter-variavel.woff2",
  weight: "400 700",
  variable: "--font-texto",
  display: "optional",
  adjustFontFallback: false,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

// Roda no <head>, antes da primeira pintura, e não grava nada no aparelho
// (a página não usa cookie nem armazenamento local; documentacao/
// atlas--conformidade.md):
// - .js: há script, logo há o botão de pausa; só então o movimento
//   contínuo roda (sem script, a esfera fica parada e a capa entra uma vez);
// - .ja-aberto: recarregar ou voltar pelo histórico não repete a entrada
//   da capa. Ver app/movimento.css.
const primeiraAbertura = `(function(){var h=document.documentElement;h.classList.add("js");try{var n=performance.getEntriesByType("navigation")[0];if(n&&(n.type==="reload"||n.type==="back_forward"))h.classList.add("ja-aberto")}catch(e){}})()`;

export const metadata: Metadata = {
  metadataBase: new URL(contato.url),
  title: metadados.titulo,
  description: metadados.descricao,
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0f2a47",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: o script do <head> e o controle de movimento
    // acrescentam classes à <html> antes e depois da hidratação.
    // data-scroll-behavior: a rolagem suave (globals.css) vale para as âncoras;
    // na troca de página, o Next a suspende e a página nova abre no topo. Sem
    // o atributo (Next 16), a página nova rolava animada até o topo (03/10).
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${titulo.variable} ${subtitulo.variable} ${texto.variable}`}
      suppressHydrationWarning
    >
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
        {children}
        <GiroDoGlobo />
      </body>
    </html>
  );
}

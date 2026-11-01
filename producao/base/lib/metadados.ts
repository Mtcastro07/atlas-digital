// lib/metadados.ts — os metadados de uma página (Next 16, API Metadata), distintos em cada página
// (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 10). É a única versão desta função.
import type { Metadata } from "next";
import { negocio } from "@/conteudo/negocio";
import type { Pagina } from "@/conteudo/site";

const cartao = { url: "/compartilhar.jpg", width: 1200, height: 630, alt: `${negocio.nome}: a primeira tela do site.` };

export function metadadosDaPagina(p: Pagina): Metadata {
  // Site de exemplo [ex]: o título termina em "· demonstração"; a descrição, em "Estabelecimento fictício."
  const sufixo = negocio.exemplo ? " · demonstração" : "";
  const ficcao = negocio.exemplo ? " Estabelecimento fictício." : "";
  return {
    title: (p.caminho === "/" ? p.titulo : `${p.titulo} · ${negocio.nome}`) + sufixo,
    description: p.descricao + ficcao,
    alternates: { canonical: p.caminho },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: negocio.nome,
      url: p.caminho,
      title: p.tituloCurto, // sem a marca: o WhatsApp mostra o site_name à parte
      description: p.descricaoCurta + ficcao,
      images: [cartao],
    },
    twitter: { card: "summary_large_image", title: p.tituloCurto, description: p.descricaoCurta + ficcao, images: [cartao.url] },
  };
}

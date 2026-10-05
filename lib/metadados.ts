import type { Metadata } from "next";

import { paginaDe, type IdDaPagina } from "@/conteudo/site";

// Os metadados de cada página do site (título, descrição, endereço
// canônico e compartilhamento). A imagem de compartilhamento é a mesma
// em todas: o cartão da marca (public/compartilhar.png, gerado por
// ferramentas/capturar-compartilhamento.mjs). Os sites de demonstração
// (app/demos/) têm os seus metadados e não herdam estes: ficam fora do
// layout das páginas do Atlas.

const imagemDeCompartilhamento = {
  url: "/compartilhar.png",
  width: 1200,
  height: 630,
  alt: "Atlas Digital — sua empresa online em 24h. Sites para o comércio local de Niterói.",
};

export function metadadosDaPagina(id: IdDaPagina): Metadata {
  const pagina = paginaDe(id);
  return {
    title: pagina.titulo,
    description: pagina.descricao,
    alternates: { canonical: pagina.caminho },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: "Atlas Digital",
      url: pagina.caminho,
      title: pagina.titulo,
      description: pagina.descricao,
      images: [imagemDeCompartilhamento],
    },
    twitter: {
      card: "summary_large_image",
      title: pagina.titulo,
      description: pagina.descricao,
      images: [imagemDeCompartilhamento.url],
    },
  };
}

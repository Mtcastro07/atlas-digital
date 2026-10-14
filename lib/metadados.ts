import type { Metadata } from "next";

import { paginaDe, type IdDaPagina } from "@/conteudo/site";

// Os metadados de cada página do site (título, descrição, endereço
// canônico e compartilhamento). A imagem de compartilhamento é a mesma
// em todas: o cartão da marca (public/compartilhar.png, gerado por
// ferramentas/capturar-compartilhamento.mjs). Os sites de exemplo
// (app/demos/) usam metadadosDoExemplo, abaixo: o cartão deles é a primeira
// tela do próprio site.

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

type Exemplo = {
  /** O nome do estabelecimento fictício (o nome do site no cartão). */
  nome: string;
  titulo: string;
  descricao: string;
  caminho: string;
  /** O nicho do site de exemplo (o id de simulador.sites): dá o cartão, public/simulador/<nicho>-compartilhar.jpg. */
  nicho: string;
};

/**
 * Os metadados de uma página de site de exemplo. O noindex vem do layout de
 * app/demos. O cartão de compartilhamento é a primeira tela do site, em
 * 1200 × 630 (ferramentas/capturar-simulador.mjs): o vendedor manda o
 * endereço pelo WhatsApp, e sem as marcações og: ele chegava cru (régua,
 * bloco 3; até 07/10, os sites de exemplo não as tinham).
 */
export function metadadosDoExemplo({ nome, titulo, descricao, caminho, nicho }: Exemplo): Metadata {
  const imagem = { url: `/simulador/${nicho}-compartilhar.jpg`, width: 1200, height: 630, alt: `${nome}: a primeira tela do site de exemplo.` };
  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: caminho },
    openGraph: { type: "website", locale: "pt_BR", siteName: nome, url: caminho, title: titulo, description: descricao, images: [imagem] },
    twitter: { card: "summary_large_image", title: titulo, description: descricao, images: [imagem.url] },
  };
}

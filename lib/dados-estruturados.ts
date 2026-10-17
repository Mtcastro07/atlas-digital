import { duvidas } from "@/conteudo/duvidas";
import { faixaDePreco } from "@/conteudo/planos";
import { contato, metadados, quemFaz, rodape } from "@/conteudo/site";
import { reais } from "@/lib/moeda";

// Dados estruturados (schema.org) gerados do mesmo conteúdo que a página
// exibe: preço, contato e perguntas não divergem do texto visível.

// O @id liga os blocos das páginas ao mesmo negócio.
const idDoNegocio = `${contato.url}/#negocio`;

/** A capa: o site (o nome que a busca exibe; Google, site-names) e o negócio, num grafo. */
export const capaDoAtlas = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${contato.url}/#site`, name: "Atlas Digital", url: `${contato.url}/`, inLanguage: "pt-BR", publisher: { "@id": idDoNegocio } },
    {
      "@type": "LocalBusiness",
      "@id": idDoNegocio,
      name: "Atlas Digital",
      // O texto visível do rodapé, em todas as páginas (até 16/10, uma frase que o site não mostrava).
      description: rodape.descricao,
      url: contato.url,
      logo: `${contato.url}/apple-icon.png`, // 180 × 180, acima do mínimo de 112 px (Google, Organization)
      image: `${contato.url}/compartilhar.png`,
      telephone: `+${contato.whatsapp}`,
      email: contato.email,
      areaServed: { "@type": "City", name: contato.cidade },
      address: { "@type": "PostalAddress", addressLocality: contato.cidade, addressRegion: contato.estado, addressCountry: "BR" },
      priceRange: `${reais(faixaDePreco.minimo)} – ${reais(faixaDePreco.maximo)}`,
      slogan: metadados.slogan,
    },
  ],
};

/** O Atlas: os sócios, na página que mostra o nome e a função de cada um (Google, sd-policies). */
export const sociosDoAtlas = {
  "@context": "https://schema.org",
  "@type": "Organization", // tipo-pai de LocalBusiness: o mesmo @id, sem exigir endereço nesta página
  "@id": idDoNegocio,
  name: "Atlas Digital",
  url: contato.url,
  founder: quemFaz.socios.map((s) => ({ "@type": "Person", name: s.nome, jobTitle: s.funcao })),
};

export const perguntasFrequentes = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: duvidas.map((d) => ({
    "@type": "Question",
    name: d.pergunta,
    acceptedAnswer: { "@type": "Answer", text: d.resposta },
  })),
};

/** JSON seguro para <script type="application/ld+json"> (guia de JSON-LD do Next). */
export function jsonLd(dados: object) {
  return { __html: JSON.stringify(dados).replace(/</g, "\\u003c") };
}

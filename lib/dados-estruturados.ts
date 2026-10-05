import { duvidas } from "@/conteudo/duvidas";
import { faixaDePreco } from "@/conteudo/planos";
import { contato, metadados } from "@/conteudo/site";
import { reais } from "@/lib/moeda";

// Dados estruturados (schema.org) gerados do mesmo conteúdo que a página
// exibe: preço, contato e perguntas não divergem do texto visível.

export const negocioLocal = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Atlas Digital",
  description: "Agência de presença digital para o comércio local de Niterói.",
  telephone: `+${contato.whatsapp}`,
  email: contato.email,
  url: contato.url,
  areaServed: { "@type": "City", name: contato.cidade },
  address: {
    "@type": "PostalAddress",
    addressLocality: contato.cidade,
    addressRegion: contato.estado,
    addressCountry: "BR",
  },
  priceRange: `${reais(faixaDePreco.minimo)} – ${reais(faixaDePreco.maximo)}`,
  slogan: metadados.slogan,
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

// lib/dados-estruturados.ts — o negócio local (schema.org LocalBusiness), do mesmo conteúdo da página
// (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 11). Nunca no site de exemplo [ex].
import { expediente, negocio } from "@/conteudo/negocio";

const NOMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const negocioLocal = {
  "@context": "https://schema.org",
  "@type": negocio.tipoSchema,
  "@id": `${negocio.url}/#negocio`,
  name: negocio.nome,
  url: negocio.url,
  telephone: `+${negocio.telefone}`,
  image: `${negocio.url}/compartilhar.jpg`,
  address: {
    "@type": "PostalAddress",
    // Logradouro, número e complemento, como no rodapé: a busca cruza os dois.
    streetAddress: [negocio.endereco.logradouro, negocio.endereco.numero, negocio.endereco.complemento].filter(Boolean).join(", "),
    addressLocality: negocio.endereco.cidade,
    addressRegion: negocio.endereco.uf,
    postalCode: negocio.endereco.cep,
    addressCountry: "BR",
  },
  ...(negocio.geo ? { geo: { "@type": "GeoCoordinates", latitude: negocio.geo.latitude, longitude: negocio.geo.longitude } } : {}),
  openingHoursSpecification: Object.entries(expediente).flatMap(([dia, faixas]) =>
    faixas.map((f) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: NOMES[Number(dia)], opens: f.abre, closes: f.fecha })),
  ),
  ...(negocio.faixaDePreco ? { priceRange: negocio.faixaDePreco } : {}),
};

/** JSON seguro dentro de <script>: o "<" escapado impede fechar a tag por dentro do texto. */
export function jsonLd(dados: object) {
  return { __html: JSON.stringify(dados).replace(/</g, "\\u003c") };
}

// lib/dados-estruturados.ts — os dados estruturados da página inicial, do mesmo conteúdo da página
// (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 11; producao/esteira/21-busca-e-ias.md, seção 5):
// o site (WebSite: o nome que a busca mostra) e o negócio local (schema.org LocalBusiness), num grafo ligado pelo @id.
// Nunca no site de exemplo [ex]. Imports de valor por caminho relativo: os testes rodam no node:test.
import { expediente, negocio } from "../conteudo/negocio.ts";

const NOMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// O @id liga o site ao negócio, e outras páginas que falem do negócio, ao mesmo nó.
const idDoNegocio = `${negocio.url}/#negocio`;

export const dadosDaCapa = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${negocio.url}/#site`, name: negocio.nome, url: `${negocio.url}/`, inLanguage: "pt-BR", publisher: { "@id": idDoNegocio } },
    {
      "@type": negocio.tipoSchema,
      "@id": idDoNegocio,
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
    },
  ],
};

/** JSON seguro dentro de <script>: o "<" escapado impede fechar a tag por dentro do texto. */
export function jsonLd(dados: object) {
  return { __html: JSON.stringify(dados).replace(/</g, "\\u003c") };
}

import type { MetadataRoute } from "next";

import { contato } from "@/conteudo/site";

// Os robôs de IA de treino, e os de busca que não documentam respeito ao noindex, ficam fora dos sites fictícios.
// Googlebot, bingbot, OAI-SearchBot, Applebot e Amzn-SearchBot seguem no grupo "*": precisam ler a página para
// ver o noindex (Google, block-indexing). Robô com grupo próprio ignora o "*" (RFC 9309): um Disallow novo no "*"
// tem de ser repetido aqui. Nome novo na lista só com documentação oficial do robô.
const foraDosFicticios = [
  "GPTBot", "ClaudeBot", "Claude-SearchBot", "CCBot", "Google-Extended", "Applebot-Extended",
  "meta-externalagent", "meta-webindexer", "Amazonbot", "PerplexityBot", "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: foraDosFicticios, disallow: "/demos/" },
    ],
    sitemap: `${contato.url}/sitemap.xml`,
  };
}

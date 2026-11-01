// app/robots.ts — o robots.txt (producao/esteira/21-busca-e-ias.md, seção 2; producao/esteira/14/01, seção 12).
// - Site de cliente: tudo liberado, inclusive os robôs de IA: o cliente quer ser achado e citado.
// - Site de exemplo [ex]: o "*" continua liberado, para os buscadores lerem o noindex do layout e do cabeçalho (o robô
//   bloqueado não o leria); os robôs de IA de treino, e os de busca que não documentam respeito ao noindex, ficam
//   fora do site inteiro. Robô com grupo próprio ignora o "*" (RFC 9309): regra nova no "*" se repete no grupo.
//   Nome novo na lista só com a documentação oficial do robô.
import type { MetadataRoute } from "next";
import { negocio } from "@/conteudo/negocio";

export const dynamic = "force-static";

const foraDoExemplo = [
  "GPTBot", "ClaudeBot", "Claude-SearchBot", "CCBot", "Google-Extended", "Applebot-Extended",
  "meta-externalagent", "meta-webindexer", "Amazonbot", "PerplexityBot", "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...(negocio.exemplo ? [{ userAgent: foraDoExemplo, disallow: "/" }] : [])],
    sitemap: `${negocio.url}/sitemap.xml`,
  };
}

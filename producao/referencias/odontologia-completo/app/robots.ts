// app/robots.ts — no site de cliente, tudo liberado e o mapa do site apontado; no de exemplo, o noindex
// vai no layout (producao/esteira/14/01, seções 12 e 13), sem Disallow: o robô bloqueado não leria o noindex.
import type { MetadataRoute } from "next";
import { negocio } from "@/conteudo/negocio";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${negocio.url}/sitemap.xml` };
}

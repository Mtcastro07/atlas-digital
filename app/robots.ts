import type { MetadataRoute } from "next";

import { contato } from "@/conteudo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${contato.url}/sitemap.xml`,
  };
}

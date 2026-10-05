import type { MetadataRoute } from "next";

import { contato, paginas } from "@/conteudo/site";

// As páginas do site do Atlas (os sites de demonstração ficam fora: são
// noindex). Atualize `ultimaAlteracao` a cada publicação com mudança de conteúdo.
const ultimaAlteracao = "2026-10-01";

export default function sitemap(): MetadataRoute.Sitemap {
  return paginas.map((pagina) => ({
    url: `${contato.url}${pagina.caminho}`,
    lastModified: ultimaAlteracao,
    changeFrequency: "monthly",
    priority: pagina.caminho === "/" ? 1 : 0.8,
  }));
}

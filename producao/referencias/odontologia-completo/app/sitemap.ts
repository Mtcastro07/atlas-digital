// app/sitemap.ts — as páginas do site, com a data da última mudança de conteúdo (não a do build).
// No site de exemplo, vazio: ele fica fora da busca (producao/esteira/14/01, seção 12).
import type { MetadataRoute } from "next";
import { negocio, ultimaAlteracao } from "@/conteudo/negocio";
import { paginas } from "@/conteudo/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (negocio.exemplo) return [];
  return paginas.map((p) => ({ url: `${negocio.url}${p.caminho === "/" ? "" : p.caminho}`, lastModified: ultimaAlteracao }));
}

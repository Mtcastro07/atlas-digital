// app/sitemap.ts — as páginas do site, com a data da última mudança de conteúdo (não a do build), sem priority
// nem changefreq (producao/esteira/21-busca-e-ias.md, seção 3). No site de exemplo, vazio: ele fica fora da busca.
import type { MetadataRoute } from "next";
import nextConfig from "@/next.config";
import { negocio, ultimaAlteracao } from "@/conteudo/negocio";
import { paginas } from "@/conteudo/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (negocio.exemplo) return [];
  // shortcut: uma data para todas as páginas; quando uma mudança tocar só uma, levar a data para cada entrada de paginas.
  // No estático (trailingSlash), o canônico termina em "/": o mapa lista o canônico, e não o endereço que redireciona.
  const barra = nextConfig.trailingSlash ? "/" : "";
  return paginas.map((p) => ({ url: `${negocio.url}${p.caminho === "/" ? "/" : p.caminho + barra}`, lastModified: ultimaAlteracao }));
}

import type { MetadataRoute } from "next";

import { contato, paginas } from "@/conteudo/site";

// As páginas do site do Atlas (os sites de demonstração ficam fora: são
// noindex). Atualize `ultimaAlteracao` só a cada publicação com mudança de
// conteúdo: o Google só aceita datas "consistently and verifiably accurate".
// Sem changeFrequency e priority, que o Google ignora (build-sitemap).
// shortcut: uma data para as sete páginas; quando uma mudança tocar só uma página, passar a data para cada entrada de paginas
const ultimaAlteracao = "2026-10-16";

export default function sitemap(): MetadataRoute.Sitemap {
  return paginas.map((pagina) => ({
    url: `${contato.url}${pagina.caminho}`,
    lastModified: ultimaAlteracao,
  }));
}

import type { MetadataRoute } from "next";

import { contato, paginas } from "@/conteudo/site";
import { ultimaAlteracao } from "@/lib/datas-das-paginas";

// As páginas do site do Atlas (os sites de demonstração ficam fora: são noindex). Uma data por página, a do último
// commit que tocou os arquivos dela, lida do git no build (R10, 28/10; lib/datas-das-paginas.ts): o Google só aceita
// datas "consistently and verifiably accurate". Sem o histórico, a página sai sem data. Até 28/10, uma data escrita à
// mão para as sete. Sem changeFrequency e priority, que o Google ignora (build-sitemap).
export default function sitemap(): MetadataRoute.Sitemap {
  return paginas.map((pagina) => {
    const data = ultimaAlteracao(pagina.caminho);
    return { url: `${contato.url}${pagina.caminho}`, ...(data && { lastModified: data }) };
  });
}

import { modulos, planos, precoDoModulo } from "@/conteudo/planos";
import { contato, metadados, paginas, paraQuem, quemFaz, simulador, trabalho } from "@/conteudo/site";
import { reais } from "@/lib/moeda";

// O llms.txt (llmstxt.org): o resumo do site em Markdown para leitores de IA, do mesmo conteúdo das páginas.
// Aposta de custo baixo: o Google não o usa e não há correlação medida com citações. Nunca lista /demos/.
// Sem X-Robots-Tag (16/10, decisão do coordenador): o arquivo fica legível e indexável como as páginas.
export const dynamic = "force-static";

export function GET() {
  const texto = [
    "# Atlas Digital",
    "",
    `> ${metadados.descricao}`,
    "",
    `- Contato: WhatsApp ${contato.telefone}, ${contato.email}; ${contato.cidade}, ${contato.estado}.`,
    ...planos.map((p) => `- Plano ${p.nome}: ${reais(p.criacao)} de criação, e ${reais(p.mensal)} por mês. ${p.itens.join("; ")}.`),
    ...modulos.map((m) => {
      const preco = precoDoModulo(m);
      return `- Módulo ${m.nome}: ${m.descricao} ${preco.criacao}, ${preco.mensal}.`;
    }),
    ...trabalho.passos.map((p) => `- ${p.titulo}: ${p.marca.valor} ${p.marca.rotulo}. ${p.texto}`),
    `- Públicos: ${paraQuem.publicos.map((p) => p.titulo).join(", ")}.`,
    `- ${paraQuem.nichos.rotulo}: ${new Intl.ListFormat("pt-BR").format(paraQuem.nichos.lista)}.`,
    `- Sócios: ${quemFaz.socios.map((s) => `${s.nome} (${s.funcao})`).join("; ")}.`,
    `- Sites de exemplo: ${simulador.aviso}`,
    "",
    "## Páginas",
    "",
    ...paginas.map((p) => `- [${p.menu}](${contato.url}${p.caminho}): ${p.descricao}`),
    "",
  ].join("\n");
  return new Response(texto, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

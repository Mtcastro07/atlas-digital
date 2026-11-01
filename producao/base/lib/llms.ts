// lib/llms.ts — o texto do /llms.txt (https://llmstxt.org): o resumo do site em Markdown, para leitores de IA, gerado do
// mesmo conteúdo das páginas (producao/esteira/21-busca-e-ias.md, seção 7). É um índice: o nome, o que o negócio faz,
// o contato e as páginas com a descrição de cada uma; o detalhe (serviços, preços) fica nas páginas, que o leitor abre.
// Aposta de custo baixo: o Google não o usa, e não há correlação medida com citações. No exemplo, só o nome e o selo de
// ficção: nada do que é noindex ou fictício (o contato, as páginas), como o mapa do site, que sai vazio.
import { expediente, negocio } from "../conteudo/negocio.ts";
import { paginas, rodape } from "../conteudo/site.ts";
import { enderecoEmLinha, horarioResumido } from "./horario.ts";
import { telefoneVisivel } from "./whatsapp.ts";

/** `barra`: "/" no estático (trailingSlash), para os endereços serem os canônicos; "" no modo servidor. */
export function textoDoLlms(barra: "/" | "") {
  const endereco = (caminho: string) => `${negocio.url}${caminho === "/" ? "/" : caminho + barra}`;
  const item = (p: (typeof paginas)[number]) => `- [${p.rotulo}](${endereco(p.caminho)}): ${p.descricao}`;
  if (negocio.exemplo) return [`# ${negocio.nome}`, "", `> ${rodape.selo}`, ""].join("\n");
  const inicio = paginas.find((p) => p.caminho === "/");
  const contato =
    negocio.telefone === negocio.whatsapp
      ? [`- Telefone e WhatsApp: ${telefoneVisivel(negocio.telefone)}`]
      : [`- Telefone: ${telefoneVisivel(negocio.telefone)}`, `- WhatsApp: ${telefoneVisivel(negocio.whatsapp)}`];
  return [
    `# ${negocio.nome}`,
    "",
    `> ${inicio?.descricao ?? negocio.oQueFaz}`,
    "",
    `- Endereço: ${enderecoEmLinha(negocio.endereco)}`,
    ...contato,
    `- Horário: ${horarioResumido(expediente)}`,
    `- ${negocio.prazoDeResposta}`,
    ...(negocio.registro ? [`- Registro: ${negocio.registro}`] : []),
    "",
    "## Páginas",
    "",
    ...paginas.filter((p) => !p.legal).map(item),
    "",
    // "Optional", na proposta do llms.txt: o que o leitor pode pular quando tem pouco espaço.
    "## Optional",
    "",
    ...paginas.filter((p) => p.legal).map(item),
    "",
  ].join("\n");
}

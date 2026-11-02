import { execFileSync } from "node:child_process";

// A data de cada página no sitemap.xml, tirada do git no build (R10, fase 0, S13): a do último commit que tocou um
// dos arquivos dela. O Google só aceita datas "consistently and verifiably accurate" (app/sitemap.ts): sem git, ou com
// o histórico raso (num clone raso, o git log daria a todas a data do último commit), a página sai sem data, e o build
// avisa. Data nenhuma é melhor que data errada. Só o servidor a chama (o sitemap.xml e a linha <lastmod> de
// /o-trabalho). Conferido por ferramentas/conferir-sistema.mjs.

// shortcut: o conteudo/site.ts e os CSS comuns entram na lista das sete, e uma mudança neles muda a data de todas (o
// que nunca deixa de marcar uma mudança de verdade); trocar quando o texto de cada página sair do site.ts.
const COMUNS = ["conteudo/site.ts", "app/globals.css", "app/vidro.css", "app/movimento.css", "app/comuns.css", "components/paginas/abertura-de-pagina.tsx", "components/paginas/proxima-pagina.tsx", "conteudo/paginas/comuns.ts"];

/** Os arquivos de cada página: o page.tsx, a pasta components/paginas/<pagina>/, as seções e ilhas dela, o CSS e o texto. */
const ARQUIVOS: Record<string, string[]> = {
  "/": [
    "app/(atlas)/page.tsx",
    "components/paginas/inicio",
    "components/paginas/portas.tsx",
    "components/secoes/capa.tsx",
    "components/secoes/destaques.tsx",
    "components/secoes/passos.tsx",
    "components/secoes/orcamento.tsx",
    "components/secoes/fim.tsx",
    "components/marca/esfera.tsx",
    "components/ilhas/esfera-viva.tsx",
    "components/ilhas/conferencia.tsx",
    "components/ilhas/montador.tsx",
    "conteudo/planos.ts",
    "app/paginas/inicio.css",
    "conteudo/paginas/inicio.ts",
  ],
  "/para-quem": [
    "app/(atlas)/para-quem",
    "components/paginas/para-quem",
    "components/secoes/para-quem.tsx",
    "components/secoes/vitrine.tsx",
    "app/paginas/para-quem.css",
    "conteudo/paginas/para-quem.ts",
  ],
  "/planos": [
    "app/(atlas)/planos",
    "components/paginas/planos",
    "components/secoes/planos.tsx",
    "components/secoes/escada.tsx",
    "components/ilhas/escada-demo.tsx",
    "components/ilhas/simulador.tsx",
    "components/ilhas/painel-do-simulador.tsx",
    "conteudo/planos.ts",
    "app/paginas/planos.css",
    "conteudo/paginas/planos.ts",
  ],
  "/orcamento": [
    "app/(atlas)/orcamento",
    "components/paginas/orcamento",
    "components/secoes/orcamento.tsx",
    "components/ilhas/montador.tsx",
    "conteudo/planos.ts",
    "app/paginas/orcamento.css",
    "conteudo/paginas/orcamento.ts",
  ],
  "/o-trabalho": [
    "app/(atlas)/o-trabalho",
    "components/paginas/o-trabalho",
    "components/secoes/trabalho.tsx",
    "app/paginas/o-trabalho.css",
    "conteudo/paginas/o-trabalho.ts",
  ],
  "/o-atlas": [
    "app/(atlas)/o-atlas",
    "components/paginas/o-atlas",
    "components/secoes/historia.tsx",
    "components/secoes/quem-faz.tsx",
    "components/marca/globo.tsx",
    "components/ilhas/peca-do-logotipo.tsx",
    "app/paginas/o-atlas.css",
    "conteudo/paginas/o-atlas.ts",
  ],
  "/duvidas": [
    "app/(atlas)/duvidas",
    "components/paginas/duvidas",
    "components/secoes/duvidas.tsx",
    "conteudo/duvidas.ts",
    "conteudo/planos.ts",
    "app/paginas/duvidas.css",
    "conteudo/paginas/duvidas.ts",
  ],
};

const git = (...args: string[]) => execFileSync("git", args, { cwd: process.cwd(), encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

let historico: boolean | undefined;
/** O git existe e o histórico é inteiro? Pergunta uma vez por build e avisa uma vez. */
function temHistorico() {
  if (historico === undefined) {
    try {
      historico = git("rev-parse", "--is-shallow-repository") === "false";
      if (!historico) console.warn("datas-das-paginas: clone raso; o sitemap.xml sai sem datas.");
    } catch {
      historico = false;
      console.warn("datas-das-paginas: sem git no build; o sitemap.xml sai sem datas.");
    }
  }
  return historico;
}

const lidas = new Map<string, string | undefined>();

/** ultimaAlteracao("/o-trabalho") → "2026-10-22" (AAAA-MM-DD), ou undefined sem histórico ou sem commit nos arquivos. */
export function ultimaAlteracao(caminho: string): string | undefined {
  const arquivos = ARQUIVOS[caminho];
  if (!arquivos) throw new Error(`ultimaAlteracao: a página ${caminho} não está na tabela de lib/datas-das-paginas.ts`);
  if (!lidas.has(caminho)) lidas.set(caminho, temHistorico() ? git("log", "-1", "--format=%cs", "--", ...arquivos, ...COMUNS) || undefined : undefined);
  return lidas.get(caminho);
}

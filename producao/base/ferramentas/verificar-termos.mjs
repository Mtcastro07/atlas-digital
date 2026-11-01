// ferramentas/verificar-termos.mjs — o texto das páginas compiladas contra a lista de termos do nicho
// (producao/qualidade/10-conteudo-normas-e-texto.md, seção 3). Lê o HTML do export estático (out/) ou, no modo
// servidor, o das páginas pré-renderizadas (.next/server/app/). A página dinâmica, sem HTML no build, se confere no
// navegador.
//
// FALHA é o inequívoco: o cifrão com valor onde o conselho veda preço, o parcelamento, a gratuidade, "popular".
// AVISO é o que a busca acusa também em quem declara a ausência ("a norma do conselho veda o preço"): lê-se a frase.
// As listas saem do arquivo do nicho (producao/esteira/nichos/<nicho>.md, seções 3 e 7). O nicho sem lista própria
// usa só a geral; a etapa 3 (/normas) acrescenta a dele aqui, com a norma e a data da leitura no decisoes.md.
// Achado do teste de 08.10.2026: a forma da seção 3 punha "preço" em falha (reprovaria toda ausência declarada) e só
// lia .next/server/app (o site estático grava em out/).
//
// Uso (na raiz, depois do npm run build): npm run termos [-- <nicho>]   (sem o nicho, o do CLAUDE.md)
import { existsSync, globSync, readFileSync } from "node:fs";

const GERAL = {
  falha: [],
  aviso: [/\bo melhor\b|\bos melhores\b/i, /\bgarantid[oa]\b|\bgarantia\b/i, /\bo mais barato\b|\bmenor pre[çc]o\b/i, /\bimbat[ií]vel\b/i],
};
// O cifrão com valor, o parcelamento e a gratuidade: a mesma falha nos conselhos que vedam o preço na publicidade.
const PRECO = [/R\$\s?\d/, /\bparcel/i, /\bgr[aá]tis\b|\bgratuit/i, /\bpromo[çc]/i, /\ba partir de\b/i];
const TERMOS = {
  // Código de Ética Odontológica, arts. 43 e 44 [V, 08.10.2026]. Convênio não é termo: o art. 43, § 1º, IV, o permite.
  odontologia: {
    falha: [...PRECO, /\b(pix|boleto|cart[aã]o de cr[eé]dito|cart[aã]o de d[eé]bito)\b/i, /\bpopular\b/i, /\bsem dor\b/i, /\bsorriso perfeito\b/i],
    aviso: [/\bpre[çc]o\b/i, /\bvalor(es)?\b/i, /antes e depois/i, /\bresultado/i, /\bespecialista\b/i, /diagn[oó]stic/i, /\bo mais moderno\b/i],
  },
  // Código de Ética e Disciplina da OAB e Provimento 205/2021 (o arquivo do nicho, seção 7).
  advocacia: {
    falha: [/R\$\s?\d/, /honor[aá]rio/i, /\bgr[aá]tis\b|\bgratuit/i, /\bdesconto\b/i],
    aviso: [/causa ganha/i, /\bresultado/i, /\bespecialista\b/i, /\bdepoimento\b/i, /\bprazo\b/i],
  },
  // CFM 2.336/2023 (o arquivo do nicho, seção 7).
  medicina: {
    falha: [/R\$\s?\d/],
    aviso: [/\bresultado/i, /\bespecialista\b/i, /\bvalor(es)?\b/i, /\bcura\b/i],
  },
  // CFP 003/2007 (o arquivo do nicho, seção 7).
  psicologia: {
    falha: [/\bcura\b/i, /\bdesconto\b/i, /\bgr[aá]tis\b|\bgratuit/i, /pre[çc]o acess[ií]vel/i, /valor social/i],
    aviso: [/\bresultado/i, /\bem \d+ sess(ão|ões)/i, /\bdepoimento\b/i, /diagn[oó]stic/i],
  },
  // CFN 599/2018, arts. 56 e 57 (o arquivo do nicho, seção 7).
  nutricao: {
    falha: [...PRECO, /perca \d+\s?kg/i, /\bdetox\b/i, /dieta milagrosa/i],
    aviso: [/\bemagre[çc]/i, /\bresultado/i, /\bem \d+ dias\b/i, /\bsegredo\b/i, /\bdepoimento\b/i, /\bdesconto\b/i],
  },
};

const doClaude = () => readFileSync("CLAUDE.md", "utf8").match(/^\|\s*Nicho\s*\|\s*([a-z-]+)/m)?.[1];
const nicho = process.argv[2] ?? (existsSync("CLAUDE.md") ? doClaude() : undefined);
if (!nicho) {
  console.error("Diga o nicho: npm run termos -- <nicho> (um dos doze de producao/esteira/nichos/).");
  process.exit(2);
}
const proprio = TERMOS[nicho];
const lista = { falha: [...GERAL.falha, ...(proprio?.falha ?? [])], aviso: [...GERAL.aviso, ...(proprio?.aviso ?? [])] };
if (!proprio) console.log(`Sem lista própria para "${nicho}": só a geral. A etapa 3 (/normas) acrescenta a do nicho neste arquivo.\n`);

// O export estático também deixa cópias em .next/server/app: com out/, só ele (senão, cada página contaria duas vezes).
const arquivos = existsSync("out") ? globSync("out/**/*.html") : existsSync(".next/server/app") ? globSync(".next/server/app/**/*.html") : [];
if (!arquivos.length) {
  console.error("Nenhuma página compilada: rode npm run build antes.");
  process.exit(2);
}
let falhas = 0;
let avisos = 0;
for (const arquivo of arquivos) {
  const texto = readFileSync(arquivo, "utf8")
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;| /g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
  for (const [classe, padroes] of Object.entries(lista)) {
    for (const padrao of padroes) {
      for (const m of texto.matchAll(new RegExp(padrao.source, padrao.flags.includes("g") ? padrao.flags : `${padrao.flags}g`))) {
        console.log(`${classe.toUpperCase().padEnd(5)} ${arquivo}: …${texto.slice(Math.max(0, m.index - 45), m.index + 55)}…`);
        if (classe === "falha") falhas++;
        else avisos++;
      }
    }
  }
}
console.log(`\n${nicho}: ${arquivos.length} página(s) lida(s) · ${falhas} falha(s) · ${avisos} aviso(s)`);
process.exitCode = falhas ? 1 : 0;

// ferramentas/texto-do-robo.mjs — o texto que um robô sem navegador recebe (producao/esteira/14-funcionalidades/01-base-de-todo-site.md,
// seção 19; producao/esteira/21-busca-e-ias.md, seção 6). A maioria dos robôs de IA não executa script nem monta a
// página (Vercel, 17.12.2024): lê o HTML. Por página, mostra:
// - os títulos (h1 a h3) como saem do HTML, sem o espaço que o CSS dá ("Trêsdegraus." é o defeito);
// - as palavras coladas: letra ou algarismo, marcação inline sem espaço, letra ou algarismo ("Três</span><span
//   class="block">degraus"). Na tela, o "block" separa; no HTML, não. A correção é o {" "} entre as duas;
// - quantas vezes a página diz "fictício" (nome fictício em página real anda com o aviso);
// - o JSON-LD de cada bloco, que precisa ser JSON válido (o Teste de Pesquisa Aprimorada do Google fica à mão);
// - o noindex, quando há.
// Uso: node ferramentas/texto-do-robo.mjs [endereço] [--texto]
//   endereço: padrão http://localhost:3100 (o npm run estatico); no ar, https://<domínio>, sem --compressed na CDN
//   --texto: imprime também o texto de cada página, para ler (número colado em número, como "R$ 501h", só a leitura acha)
// Sai com código 1 se houver palavra colada ou JSON-LD inválido. Sem dependência.
const argumentos = process.argv.slice(2);
const BASE = (argumentos.find((a) => !a.startsWith("--")) ?? "http://localhost:3100").replace(/\/$/, "");
const TEXTO = argumentos.includes("--texto");

const pedir = (caminho) => fetch(BASE + caminho).then((r) => (r.ok ? r.text() : "")).catch(() => "");
const entidades = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decodificar = (t) =>
  t.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (m, e) =>
    e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : (entidades[e] ?? m),
  );
// O que nenhum robô lê como texto: o <head>, os scripts, os estilos e os desenhos.
const corpo = (html) => (html.match(/<body[\s\S]*<\/body>/i)?.[0] ?? html).replace(/<(script|style|svg|template)\b[\s\S]*?<\/\1>/gi, "");
// As marcas que quebram o texto também para quem não monta a página; as outras (span, a, strong...) não quebram.
const BLOCO = /<\/?(address|article|aside|blockquote|br|dd|details|dialog|div|dl|dt|figcaption|figure|footer|form|h[1-6]|header|hr|li|main|nav|ol|p|section|summary|table|td|th|tr|ul)\b[^>]*>/gi;
const semMarcas = (html) => decodificar(html.replace(/<[^>]+>/g, ""));
const texto = (html) => decodificar(html.replace(BLOCO, "\n").replace(/<[^>]+>/g, "")).replace(/[ \t]+/g, " ").replace(/\s*\n\s*/g, "\n").trim();
const INLINE = "a|abbr|b|bdi|bdo|cite|code|data|dfn|em|i|kbd|label|mark|q|s|samp|small|span|strong|time|u|var";
const COLADA = new RegExp(`[\\p{L}\\p{N}](?:<\\/?(?:${INLINE})\\b[^>]*>)+[\\p{L}\\p{N}]`, "gu");

// As páginas: as do mapa do site e as que o início liga (o site de exemplo tem o mapa vazio).
const mapa = await pedir("/sitemap.xml");
const caminhos = new Set(["/", ...[...mapa.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => new URL(loc).pathname)]);
for (const [, href] of (await pedir("/")).matchAll(/href="(\/[^"#?]*)"/g)) if (!/^\/_next\/|\.\w+$/.test(href)) caminhos.add(href);

let falhas = 0;
for (const caminho of caminhos) {
  const html = await pedir(caminho);
  if (!html) {
    console.log(`== ${caminho}: sem resposta 200`);
    continue;
  }
  const b = corpo(html);
  console.log(`== ${caminho}`);
  for (const [, nivel, dentro] of b.matchAll(/<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi)) console.log(`   h${nivel}: ${semMarcas(dentro).trim()}`);
  // O trecho em volta da junta, para achar o lugar: sem a marca cortada ao meio, e com o bloco como espaço.
  const trecho = (s) => semMarcas(s.replace(/^[^<]*>/, "").replace(/<[^>]*$/, "").replace(BLOCO, " "));
  const coladas = [...b.matchAll(COLADA)].map((m) => {
    const antes = trecho(b.slice(Math.max(0, m.index - 160), m.index + 1)).slice(-18);
    const depois = trecho(b.slice(m.index + m[0].length - 1, m.index + m[0].length + 160)).slice(0, 18);
    return `"${antes}|${depois}"`;
  });
  if (coladas.length) (falhas++, console.log(`   COLADAS (${coladas.length}): ${coladas.join(" · ")}`));
  const t = texto(b);
  const ficticio = (t.match(/fictíci/gi) ?? []).length;
  if (ficticio) console.log(`   "fictício": ${ficticio}`);
  const robots = html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/)?.[1];
  if (robots) console.log(`   robots: ${robots}`);
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const dados = JSON.parse(json);
      console.log(`   JSON-LD: ${[dados, ...(dados["@graph"] ?? [])].map((n) => n["@type"]).filter(Boolean).join(", ")}`);
    } catch (e) {
      falhas++;
      console.log(`   JSON-LD INVÁLIDO: ${e.message}`);
    }
  }
  if (TEXTO) console.log(t.replace(/^/gm, "   | "));
}
console.log(`\n${caminhos.size} página(s) · ${falhas ? `${falhas} problema(s)` : "nenhuma palavra colada, JSON-LD válido"}`);
process.exitCode = falhas ? 1 : 0;

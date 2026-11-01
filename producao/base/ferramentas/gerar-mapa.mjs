// ferramentas/gerar-mapa.mjs — o mapa do bairro em vetor, a partir do OpenStreetMap
// (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 3): as ruas em volta do ponto, a água, as praças
// e o ponto do estabelecimento, num componente de servidor (components/mapa-do-bairro.tsx) que pinta com os
// tokens da identidade. O site publicado não faz pedido externo: os dados vêm uma vez, aqui, na produção.
// Os dados são ODbL: o crédito "© colaboradores do OpenStreetMap" vai na legenda (o componente já o traz).
// Nenhuma dependência: o fetch do Node.
//
// Uso (na raiz do site; a rede precisa estar liberada):
//   node ferramentas/gerar-mapa.mjs [--lat=-22.88 --lon=-43.10] [--raio=350]
// O ponto: --lat e --lon; sem eles, o `geo` de conteudo/negocio.ts; sem geo, o endereço de negocio.ts procurado
// no Nominatim (OpenStreetMap), e as coordenadas achadas são impressas para gravar em `geo`. Confira o ponto
// no mapa antes de publicar: o número da casa nem sempre está no OpenStreetMap, e o achado pode ser o meio
// da rua.
// --raio: metros do centro à borda (padrão 350: umas quatro quadras para cada lado).
// --sem-mapa: grava o componente vazio (o site sem mapa: a página Onde fica com o endereço e "Ver no mapa").
// Saída: components/mapa-do-bairro.tsx.
import { readFileSync, writeFileSync } from "node:fs";

// O componente vazio: o site sem mapa (o `npm run pronto` avisa num site de cliente).
const VAZIO = `// components/mapa-do-bairro.tsx — SEM MAPA: não desenha nada. ferramentas/gerar-mapa.mjs o substitui pelo mapa
// do bairro, desenhado do OpenStreetMap (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 3).
// Sem o mapa, a página Onde fica com o endereço e "Ver no mapa".

export function MapaDoBairro(propriedades: { className?: string }) {
  void propriedades;
  return null;
}
`;
if (process.argv.includes("--sem-mapa")) {
  writeFileSync("components/mapa-do-bairro.tsx", VAZIO);
  console.log("components/mapa-do-bairro.tsx: sem mapa (componente vazio).");
  process.exit(0);
}

const argumentos = process.argv.slice(2);
const opcao = (nome) => argumentos.find((a) => a.startsWith(`--${nome}=`))?.slice(nome.length + 3);
const RAIO = Number(opcao("raio") ?? 350);
const AGENTE = "atlas-digital-producao/1.0 (gerar-mapa; uso unico na producao de um site)";

const negocio = readFileSync("conteudo/negocio.ts", "utf8");
const campo = (nome) => negocio.match(new RegExp(`^\\s*${nome}:\\s*"([^"]*)"`, "m"))?.[1] ?? "";

// 1. O ponto.
let lat = Number(opcao("lat"));
let lon = Number(opcao("lon"));
if (!lat || !lon) {
  const geo = negocio.match(/^\s*geo:\s*\{\s*latitude:\s*(-?[\d.]+),\s*longitude:\s*(-?[\d.]+)/m);
  if (geo) [lat, lon] = [Number(geo[1]), Number(geo[2])];
}
if (!lat || !lon) {
  const consulta = [`${campo("logradouro")} ${campo("numero")}`.trim(), campo("bairro"), campo("cidade"), campo("uf")].filter(Boolean).join(", ");
  const resposta = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=br&q=${encodeURIComponent(consulta)}`, {
    headers: { "User-Agent": AGENTE },
  }).then((r) => r.json());
  if (!resposta?.[0]) throw new Error(`Endereço não achado no Nominatim ("${consulta}"): passe --lat e --lon, lidos no mapa.`);
  [lat, lon] = [Number(resposta[0].lat), Number(resposta[0].lon)];
  console.log(`Ponto achado para "${consulta}": ${lat.toFixed(5)}, ${lon.toFixed(5)}.`);
  console.log(`Confira no mapa e grave em conteudo/negocio.ts: geo: { latitude: ${lat.toFixed(5)}, longitude: ${lon.toFixed(5)} },`);
}

// 2. Os dados, da Overpass API.
const consultaOverpass = `[out:json][timeout:30];
(
  way["highway"~"^(motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street|pedestrian|service|footway|path|steps)$"](around:${RAIO * 1.5},${lat},${lon});
  way["natural"~"^(coastline|water)$"](around:${RAIO * 2},${lat},${lon});
  way["leisure"~"^(park|garden|pitch)$"](around:${RAIO * 1.5},${lat},${lon});
);
out geom;`;
// As instâncias públicas da Overpass, em ordem: a principal costuma responder 504 quando está cheia.
const INSTANCIAS = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter", "https://overpass.private.coffee/api/interpreter"];
let dados = null;
for (const instancia of INSTANCIAS) {
  try {
    const r = await fetch(instancia, {
      method: "POST",
      headers: { "User-Agent": AGENTE, "Content-Type": "application/x-www-form-urlencoded" },
      body: `data=${encodeURIComponent(consultaOverpass)}`,
    });
    if (r.ok) {
      dados = await r.json();
      break;
    }
    console.warn(`${instancia} respondeu ${r.status}; tentando a próxima.`);
  } catch (erro) {
    console.warn(`${instancia} falhou (${erro.message}); tentando a próxima.`);
  }
}
if (!dados) throw new Error("Nenhuma instância da Overpass respondeu: tente de novo em alguns minutos.");

// 3. A projeção local (metros do centro) para a caixa de 1000 × 1000, e a simplificação (Douglas–Peucker).
const LADO = 1000;
const cosLat = Math.cos((lat * Math.PI) / 180);
const projetar = ({ lat: la, lon: lo }) => [((lo - lon) * 111320 * cosLat + RAIO) * (LADO / (2 * RAIO)), ((lat - la) * 110574 + RAIO) * (LADO / (2 * RAIO))];
function simplificar(pontos, tolerancia) {
  if (pontos.length < 3) return pontos;
  const [a, b] = [pontos[0], pontos.at(-1)];
  // Anel fechado (praça, lagoa: o último ponto é o primeiro): a corda de a até b tem comprimento zero, e todo ponto
  // ficaria a distância zero dela; o anel inteiro virava um ponto (o "M x yL x yZ" dos mapas até 08.10.2026). Parte-se
  // o anel no ponto mais longe do primeiro e simplifica-se cada metade, que já é um trecho aberto.
  if (a[0] === b[0] && a[1] === b[1]) {
    let longe = 1;
    for (let i = 2; i < pontos.length - 1; i++) {
      if (Math.hypot(pontos[i][0] - a[0], pontos[i][1] - a[1]) > Math.hypot(pontos[longe][0] - a[0], pontos[longe][1] - a[1])) longe = i;
    }
    return [...simplificar(pontos.slice(0, longe + 1), tolerancia).slice(0, -1), ...simplificar(pontos.slice(longe), tolerancia)];
  }
  let maior = 0;
  let indice = 0;
  for (let i = 1; i < pontos.length - 1; i++) {
    const [x, y] = pontos[i];
    const d = Math.abs((b[1] - a[1]) * x - (b[0] - a[0]) * y + b[0] * a[1] - b[1] * a[0]) / Math.hypot(b[1] - a[1], b[0] - a[0] || 1e-9);
    if (d > maior) [maior, indice] = [d, i];
  }
  if (maior <= tolerancia) return [a, b];
  return [...simplificar(pontos.slice(0, indice + 1), tolerancia).slice(0, -1), ...simplificar(pontos.slice(indice), tolerancia)];
}
const caminho = (pontos, fechado) => {
  const p = simplificar(pontos, 1.2).map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`);
  return p.length > 1 ? `M${p.join("L")}${fechado ? "Z" : ""}` : "";
};
const dentro = (pontos) => pontos.some(([x, y]) => x > -100 && x < LADO + 100 && y > -100 && y < LADO + 100);

const CLASSES = {
  principais: /^(motorway|trunk|primary|secondary)$/,
  locais: /^(tertiary|unclassified|residential|living_street)$/,
  servico: /^(pedestrian|service)$/,
  pedestres: /^(footway|path|steps)$/,
};
const grupos = { principais: [], locais: [], servico: [], pedestres: [], agua: [], verdes: [] };
for (const via of dados.elements ?? []) {
  if (!via.geometry) continue;
  const pontos = via.geometry.map(projetar);
  if (!dentro(pontos)) continue;
  const t = via.tags ?? {};
  if (t.highway) {
    const classe = Object.entries(CLASSES).find(([, re]) => re.test(t.highway))?.[0];
    if (classe) grupos[classe].push(caminho(pontos, false));
  } else if (t.natural) {
    grupos.agua.push(caminho(pontos, t.natural === "water"));
  } else if (t.leisure) {
    grupos.verdes.push(caminho(pontos, true));
  }
}
const d = (lista) => lista.filter(Boolean).join("");
const total = Object.values(grupos).reduce((s, g) => s + g.length, 0);
if (total < 5) throw new Error(`Só ${total} traçado(s) em volta do ponto: confira as coordenadas (${lat}, ${lon}).`);

// 4. O componente: pinta com os tokens (o traço segue a identidade; mude as cores e as espessuras aqui).
const hoje = new Date().toISOString().slice(0, 10);
const tsx = `// components/mapa-do-bairro.tsx — GERADO por ferramentas/gerar-mapa.mjs em ${hoje}, do OpenStreetMap (ODbL: o crédito
// vai na legenda). Centro ${lat.toFixed(5)}, ${lon.toFixed(5)}; raio de ${RAIO} m. Não edite os traçados à mão: gere de novo.
// As cores e as espessuras são da identidade (os tokens); ajuste-as aqui, se a direção de arte pedir.
// Sem os nomes das ruas, o mapa é decorativo (aria-hidden): o endereço em texto está ao lado
// (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 3).

export function MapaDoBairro({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <svg viewBox="0 0 ${LADO} ${LADO}" aria-hidden="true" className="block aspect-square w-full max-w-xl rounded-cartao border border-border bg-card">
        <defs>
          <clipPath id="mapa-do-bairro-recorte">
            <rect width="${LADO}" height="${LADO}" />
          </clipPath>
        </defs>
        <g clipPath="url(#mapa-do-bairro-recorte)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="${d(grupos.verdes)}" fill="var(--muted)" stroke="none" />
          <path d="${d(grupos.agua)}" stroke="var(--accent)" strokeOpacity={0.35} strokeWidth={8} />
          <path d="${d(grupos.pedestres)}" stroke="var(--muted-foreground)" strokeOpacity={0.35} strokeWidth={2} strokeDasharray="6 8" />
          <path d="${d(grupos.servico)}" stroke="var(--muted-foreground)" strokeOpacity={0.4} strokeWidth={4} />
          <path d="${d(grupos.locais)}" stroke="var(--muted-foreground)" strokeOpacity={0.55} strokeWidth={7} />
          <path d="${d(grupos.principais)}" stroke="var(--foreground)" strokeOpacity={0.7} strokeWidth={12} />
        </g>
        <circle cx="${LADO / 2}" cy="${LADO / 2}" r="26" fill="var(--primary)" />
        <circle cx="${LADO / 2}" cy="${LADO / 2}" r="9" fill="var(--primary-foreground)" />
      </svg>
      <figcaption className="mt-2 text-rotulo text-muted-foreground">Dados do mapa: © colaboradores do OpenStreetMap.</figcaption>
    </figure>
  );
}
`;
writeFileSync("components/mapa-do-bairro.tsx", tsx);
console.log(`components/mapa-do-bairro.tsx: ${total} traçados, ${(Buffer.byteLength(tsx) / 1024).toFixed(1)} KB. Confira o ponto e o recorte na página Onde.`);

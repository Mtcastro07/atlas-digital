// ferramentas/gerar-costa.mjs — a carta náutica de um trecho de costa, em vetor, a partir do OpenStreetMap: a terra
// (o polígono montado das linhas de costa, natural=coastline) e pontos nomeados (nós place=*), num módulo de dados
// que um componente de servidor pinta com os tokens. Variante de gerar-mapa.mjs (do kit, producao/base/ferramentas/) só com a costa, sem ruas: é carta
// náutica, e não a folha de ruas de um bairro. Feita para a abertura de /para-quem do site do Atlas (16.10.2026,
// "Identidade mais profunda": a carta de Niterói com os bairros dos três sites de exemplo).
// Os dados são ODbL: o crédito "© colaboradores do OpenStreetMap" vai junto da carta (o componente o traz).
// O site publicado não faz pedido externo: os dados vêm uma vez, aqui, na produção. Nenhuma dependência: o fetch do
// Node.
//
// Uso (na raiz do site; a rede precisa estar liberada):
//   node ferramentas/gerar-costa.mjs [--saida=components/paginas/costa-de-niteroi.ts]
//     [--lugares=Icaraí,Santa Rosa,Engenhoca] [--folga=600] [--proporcao=0.8] [--oeste] [--sul=0]
// A caixa: os pontos dos lugares, com --folga metros em volta (e mais --sul metros embaixo), alargada até a
// --proporcao (largura / altura); com --oeste, a largura que falta vai toda para o oeste (em Niterói, para dentro da
// baía). A carta de /para-quem (17.10.2026): --oeste --proporcao=0.93 --sul=900, que traz a praia de Icaraí, a Boa
// Viagem e o Gragoatá para dentro da caixa, acima da borda que se dissolve (com --sul=0, a praia caía nela).
// O polígono da terra: as linhas de costa deixam a terra à esquerda; os trechos que cruzam a caixa (mais 700 m de
// margem, para o traço das linhas d'água não marcar a borda) fecham-se pela borda, no sentido anti-horário; as
// ilhas inteiras na caixa entram como anéis. Simplificação de Douglas–Peucker a 8 m; coordenadas em metros, inteiras.
import { writeFileSync } from "node:fs";

const argumentos = process.argv.slice(2);
const opcao = (nome) => argumentos.find((a) => a.startsWith(`--${nome}=`))?.slice(nome.length + 3);
const SAIDA = opcao("saida") ?? "components/paginas/costa-de-niteroi.ts";
const LUGARES = (opcao("lugares") ?? "Icaraí,Santa Rosa,Engenhoca").split(",").map((n) => n.trim());
const FOLGA = Number(opcao("folga") ?? 600);
const PROPORCAO = Number(opcao("proporcao") ?? 0.8);
const OESTE = argumentos.includes("--oeste");
const SUL = Number(opcao("sul") ?? 0);
const MARGEM = 700;
const TOLERANCIA = 8;
const AGENTE = "atlas-digital-producao/1.0 (gerar-costa; uso unico na producao de um site)";
const INSTANCIAS = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter", "https://overpass.private.coffee/api/interpreter"];

async function overpass(consulta) {
  for (const instancia of INSTANCIAS) {
    try {
      const r = await fetch(instancia, {
        method: "POST",
        headers: { "User-Agent": AGENTE, "Content-Type": "application/x-www-form-urlencoded" },
        body: `data=${encodeURIComponent(consulta)}`,
      });
      if (r.ok) return await r.json();
      console.warn(`${instancia} respondeu ${r.status}; tentando a próxima.`);
    } catch (erro) {
      console.warn(`${instancia} falhou (${erro.message}); tentando a próxima.`);
    }
  }
  throw new Error("Nenhuma instância da Overpass respondeu: tente de novo em alguns minutos.");
}

// 1. Os lugares: os nós place=* com o nome, em Niterói (a caixa larga da cidade).
const nomes = LUGARES.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
const lugares = (await overpass(`[out:json][timeout:25];node[place~"^(suburb|neighbourhood|quarter)$"][name~"^(${nomes})$"](-23.0,-43.2,-22.8,-42.9);out;`)).elements;
const pontos = LUGARES.map((nome) => {
  const no = lugares.find((e) => e.tags?.name === nome);
  if (!no) throw new Error(`Lugar "${nome}" não achado no OpenStreetMap.`);
  return { nome, lat: no.lat, lon: no.lon, id: no.id };
});

// 2. A caixa (graus) e a projeção local (metros, y para o norte, a origem no canto sudoeste da caixa).
const lat0 = pontos.reduce((s, p) => s + p.lat, 0) / pontos.length;
const KX = 111320 * Math.cos((lat0 * Math.PI) / 180);
const KY = 110574;
let [S, N] = [Math.min(...pontos.map((p) => p.lat)) - (FOLGA + SUL) / KY, Math.max(...pontos.map((p) => p.lat)) + FOLGA / KY];
let [W, E] = [Math.min(...pontos.map((p) => p.lon)) - FOLGA / KX, Math.max(...pontos.map((p) => p.lon)) + FOLGA / KX];
const falta = (N - S) * KY * PROPORCAO - (E - W) * KX;
if (falta > 0) {
  if (OESTE) W -= falta / KX;
  else [W, E] = [W - falta / 2 / KX, E + falta / 2 / KX];
}
const LARGURA = Math.round((E - W) * KX);
const ALTURA = Math.round((N - S) * KY);
const projetar = (lat, lon) => [(lon - W) * KX, (lat - S) * KY];

// 3. As linhas de costa na caixa com margem, emendadas pelas pontas.
const m = (MARGEM + 300) / KY;
const costa = await overpass(`[out:json][timeout:30];way["natural"="coastline"](${S - m},${W - m * (KY / KX)},${N + m},${E + m * (KY / KX)});out geom;`);
const chave = (g) => `${g.lat.toFixed(7)},${g.lon.toFixed(7)}`;
let cadeias = costa.elements.filter((e) => e.geometry?.length > 1).map((e) => e.geometry);
for (let emendou = true; emendou; ) {
  emendou = false;
  for (let i = 0; i < cadeias.length && !emendou; i++) {
    for (let j = 0; j < cadeias.length && !emendou; j++) {
      if (i === j || chave(cadeias[i].at(-1)) !== chave(cadeias[j][0])) continue;
      if (chave(cadeias[i][0]) === chave(cadeias[i].at(-1))) continue;
      cadeias[i] = [...cadeias[i], ...cadeias[j].slice(1)];
      cadeias.splice(j, 1);
      emendou = true;
    }
  }
}
cadeias = cadeias.map((c) => c.map((g) => projetar(g.lat, g.lon)));

// 4. O recorte pela caixa com margem: os trechos de dentro, com a entrada e a saída na borda.
const [X0, Y0, X1, Y1] = [-MARGEM, -MARGEM, LARGURA + MARGEM, ALTURA + MARGEM];
const dentro = ([x, y]) => x >= X0 && x <= X1 && y >= Y0 && y <= Y1;
function corte(a, b) {
  // O ponto em que o segmento a→b (a dentro, b fora) sai da caixa: o menor t em que ele toca a borda.
  let melhor = null;
  const testa = (t) => {
    if (!(t >= 0 && t <= 1)) return;
    const p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    if (p[0] < X0 - 1e-6 || p[0] > X1 + 1e-6 || p[1] < Y0 - 1e-6 || p[1] > Y1 + 1e-6) return;
    if (!melhor || t < melhor.t) melhor = { t, p: [Math.min(X1, Math.max(X0, p[0])), Math.min(Y1, Math.max(Y0, p[1]))] };
  };
  if (b[0] !== a[0]) for (const x of [X0, X1]) testa((x - a[0]) / (b[0] - a[0]));
  if (b[1] !== a[1]) for (const y of [Y0, Y1]) testa((y - a[1]) / (b[1] - a[1]));
  return melhor.p;
}
const fechada = (c) => c[0][0] === c.at(-1)[0] && c[0][1] === c.at(-1)[1];
const aneis = [];
const trechos = [];
for (let c of cadeias) {
  if (c.every(dentro)) {
    if (fechada(c)) aneis.push(c);
    else console.warn("Uma linha de costa termina dentro da caixa: os dados vieram incompletos; ela fica de fora.");
    continue;
  }
  if (!c.some(dentro)) continue;
  if (fechada(c)) {
    // O anel que cruza a borda: recomeça num ponto de fora.
    const i = c.findIndex((p) => !dentro(p));
    c = [...c.slice(i, -1), ...c.slice(0, i + 1)];
  }
  let atual = null;
  for (let i = 0; i < c.length; i++) {
    const p = c[i];
    if (dentro(p)) {
      if (!atual) {
        if (i === 0) {
          console.warn("Uma linha de costa começa dentro da caixa: fica de fora.");
          break;
        }
        atual = [corte(p, c[i - 1])];
      }
      atual.push(p);
    } else if (atual) {
      atual.push(corte(c[i - 1], p));
      trechos.push(atual);
      atual = null;
    }
  }
}

// 5. A montagem: cada trecho, da entrada à saída; da saída, pela borda no sentido anti-horário, até a próxima
// entrada. O parâmetro da borda corre de 0 no canto sudoeste: o sul para o leste, o leste para o norte, o norte para
// o oeste, o oeste para o sul.
const [BW, BH] = [X1 - X0, Y1 - Y0];
const PERIMETRO = 2 * (BW + BH);
function parametro([x, y]) {
  const e = 1e-3;
  if (Math.abs(y - Y0) < e) return x - X0;
  if (Math.abs(x - X1) < e) return BW + (y - Y0);
  if (Math.abs(y - Y1) < e) return BW + BH + (X1 - x);
  return 2 * BW + BH + (Y1 - y);
}
const CANTOS = [
  [BW, [X1, Y0]],
  [BW + BH, [X1, Y1]],
  [2 * BW + BH, [X0, Y1]],
  [PERIMETRO, [X0, Y0]],
];
const restantes = trechos.map((t) => ({ t, entrada: parametro(t[0]), saida: parametro(t.at(-1)) }));
while (restantes.length) {
  const primeiro = restantes.shift();
  const anel = [...primeiro.t];
  let atual = primeiro;
  for (let voltas = 0; voltas < 500; voltas++) {
    // A próxima entrada depois da saída, no sentido anti-horário (o próprio primeiro trecho fecha o anel).
    const candidatos = [primeiro, ...restantes].map((r) => ({ r, d: (r.entrada - atual.saida + PERIMETRO) % PERIMETRO }));
    candidatos.sort((a, b) => a.d - b.d);
    const proximo = candidatos[0].r;
    const fim = atual.saida + candidatos[0].d;
    for (const [t, canto] of [...CANTOS, ...CANTOS.map(([t, c]) => [t + PERIMETRO, c])]) if (t > atual.saida && t < fim) anel.push(canto);
    if (proximo === primeiro) break;
    anel.push(...proximo.t);
    restantes.splice(restantes.indexOf(proximo), 1);
    atual = proximo;
  }
  anel.push(anel[0]);
  aneis.push(anel);
}
if (!aneis.length) throw new Error("Nenhuma terra na caixa: confira os lugares.");

// 6. Douglas–Peucker, a y para baixo (SVG) e o caminho.
function simplificar(p, tol) {
  if (p.length < 3) return p;
  const [a, b] = [p[0], p.at(-1)];
  if (a[0] === b[0] && a[1] === b[1]) {
    let longe = 1;
    for (let i = 2; i < p.length - 1; i++) if (Math.hypot(p[i][0] - a[0], p[i][1] - a[1]) > Math.hypot(p[longe][0] - a[0], p[longe][1] - a[1])) longe = i;
    return [...simplificar(p.slice(0, longe + 1), tol).slice(0, -1), ...simplificar(p.slice(longe), tol)];
  }
  let [maior, indice] = [0, 0];
  for (let i = 1; i < p.length - 1; i++) {
    const d = Math.abs((b[1] - a[1]) * p[i][0] - (b[0] - a[0]) * p[i][1] + b[0] * a[1] - b[1] * a[0]) / (Math.hypot(b[1] - a[1], b[0] - a[0]) || 1e-9);
    if (d > maior) [maior, indice] = [d, i];
  }
  if (maior <= tol) return [a, b];
  return [...simplificar(p.slice(0, indice + 1), tol).slice(0, -1), ...simplificar(p.slice(indice), tol)];
}
const TERRA = aneis
  .map((a) => simplificar(a, TOLERANCIA).map(([x, y]) => `${Math.round(x)} ${Math.round(ALTURA - y)}`))
  .filter((a) => a.length > 3)
  .map((a) => `M${a.slice(0, -1).join("L")}Z`)
  .join("");
const LUGARES_NA_CARTA = pontos.map((p) => {
  const [x, y] = projetar(p.lat, p.lon);
  return { nome: p.nome, x: +((x / LARGURA) * 100).toFixed(2), y: +(((ALTURA - y) / ALTURA) * 100).toFixed(2) };
});

// 7. O módulo de dados.
const hoje = new Date().toISOString().slice(0, 10);
const ts = `// ${SAIDA} — GERADO por ferramentas/gerar-costa.mjs em ${hoje}, do OpenStreetMap (ODbL: o crédito
// "© colaboradores do OpenStreetMap" vai junto da carta). Não edite à mão: gere de novo (${argumentos.join(" ") || "sem opções"}).
// A caixa: ${S.toFixed(5)} a ${N.toFixed(5)} de latitude, ${W.toFixed(5)} a ${E.toFixed(5)} de longitude; em metros, ${LARGURA} × ${ALTURA},
// com a origem no canto noroeste (o y para baixo, como no SVG). A terra é o polígono montado das linhas de costa,
// simplificado a ${TOLERANCIA} m; passa ${MARGEM} m da caixa, para o traço das linhas d'água não marcar a borda.
// Os lugares: os nós place=* do OpenStreetMap (${pontos.map((p) => `${p.nome}, nó ${p.id}`).join("; ")}), em % da caixa.

// A caixa também em graus (17/10): a carta eletrônica de /para-quem lê a coordenada sob a lente.
export const CARTA = { largura: ${LARGURA}, altura: ${ALTURA}, norte: ${N.toFixed(5)}, sul: ${S.toFixed(5)}, oeste: ${W.toFixed(5)}, leste: ${E.toFixed(5)} } as const;

export const TERRA = "${TERRA}";

export const LUGARES_NA_CARTA = ${JSON.stringify(LUGARES_NA_CARTA)} as const;
`;
writeFileSync(SAIDA, ts);
console.log(`${SAIDA}: ${aneis.length} anel(is) de terra, ${(Buffer.byteLength(ts) / 1024).toFixed(1)} KB; a caixa, ${LARGURA} × ${ALTURA} m.`);
console.log(LUGARES_NA_CARTA);

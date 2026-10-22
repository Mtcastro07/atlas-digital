/**
 * A leitura da carta de Niterói, em /para-quem (desde 17/10, a direção final do Atlas Digital, seção 3, item 9): a conta
 * pura que o servidor faz uma vez (a leitura do ponto de partida, no HTML) e a carta viva refaz a cada passo da lente
 * (ilhas/desenho-da-carta-de-niteroi.ts). A coordenada, com a precisão que a escala sustenta; terra ou água, pelo
 * polígono da costa; o bairro mais perto e a distância. Sem import: o Node dos testes (registros/atlas/testes/
 * leitura-da-carta.test.ts) não resolve o caminho com "@/", e a caixa e a terra entram por parâmetro.
 * A projeção é a da carta (ferramentas/gerar-costa.mjs e gerar-ruas.mjs): linear na caixa, em metros, com a origem no
 * canto noroeste e o y para baixo. O metro por grau de longitude já leva o cosseno da latitude (o minuto de longitude
 * mede 1,71 km ali, e o de latitude, 1,84 km).
 */

export type Caixa = { readonly largura: number; readonly altura: number; readonly norte: number; readonly sul: number; readonly oeste: number; readonly leste: number };

/** A folga dos dados em volta da caixa, em metros: a terra e as ruas vão 700 m além dela (o SVG das ruas começa em −700). */
export const FOLGA = 700;

/**
 * Até onde a lente anda num eixo, em metros (desde a revisão de 17/10): até a borda dos dados (FOLGA além da caixa)
 * deixar no máximo um quarto da região vazio, sempre até os nós (as teclas levam a lente a eles) e nunca além da caixa.
 * `centro` e `lado`, em px: a lente e a região naquele eixo; `m`, os px por metro. Até então, a lente ia até a caixa, e
 * no canto sudeste dois terços da região ficavam em navy liso.
 */
export function prenderNoEixo(v: number, tamanho: number, centro: number, lado: number, m: number, nos: readonly number[]) {
  const folga = (0.25 * lado) / m;
  const de = Math.max(0, Math.min(-FOLGA + centro / m - folga, ...nos));
  const ate = Math.min(tamanho, Math.max(tamanho + FOLGA - (lado - centro) / m + folga, ...nos));
  return Math.min(Math.max(v, de), Math.max(de, ate));
}

/** Os metros por grau, em x (longitude) e em y (latitude). */
const escala = (c: Caixa) => [c.largura / (c.leste - c.oeste), c.altura / (c.norte - c.sul)] as const;

/** O ponto da carta, em metros, de uma latitude e longitude. */
export function emMetros(c: Caixa, latitude: number, longitude: number): [number, number] {
  const [kx, ky] = escala(c);
  return [(longitude - c.oeste) * kx, (c.norte - latitude) * ky];
}

/** A latitude e a longitude de um ponto da carta, em metros. */
export function emGraus(c: Caixa, x: number, y: number) {
  const [kx, ky] = escala(c);
  return { latitude: c.norte - y / ky, longitude: c.oeste + x / kx };
}

/** Um segundo de arco de latitude, em metros, nesta carta (~30,7 m): a medida da precisão. */
export const segundoDeArco = (c: Caixa) => 1 / 3600 / ((c.norte - c.sul) / c.altura);

const dois = (n: number) => String(n).padStart(2, "0");

/**
 * "22°53′00″ S" (com `segundos`) ou "22°53,0′ S" (minutos com um décimo). Arredonda o total antes de partir em graus e
 * minutos: 22,8833° dá 22°53′00″, e não 22°52′60″.
 */
export function escritaDoGrau(valor: number, positivo: string, negativo: string, segundos: boolean) {
  const lado = valor < 0 ? negativo : positivo;
  const absoluto = Math.abs(valor);
  if (segundos) {
    const total = Math.round(absoluto * 3600);
    return `${Math.floor(total / 3600)}°${dois(Math.floor((total % 3600) / 60))}′${dois(total % 60)}″ ${lado}`;
  }
  const decimos = Math.round(absoluto * 600);
  const minutos = ((decimos % 600) / 10).toFixed(1).replace(".", ",").padStart(4, "0");
  return `${Math.floor(decimos / 600)}°${minutos}′ ${lado}`;
}

/** A coordenada inteira, em latitude e longitude, com a precisão da escala. */
export function escritaDaCoordenada(latitude: number, longitude: number, segundos: boolean) {
  return { latitude: escritaDoGrau(latitude, "N", "S", segundos), longitude: escritaDoGrau(longitude, "L", "O", segundos) };
}

/**
 * Os segundos só quando a escala os sustenta: um segundo de arco com 3 px ou mais na tela (na mesa, ~4,6 px; no
 * celular, ~2,3, e a leitura fica nos minutos com um décimo). Nunca mais casas do que o desenho mostra.
 */
export const comSegundos = (c: Caixa, pxPorMetro: number) => segundoDeArco(c) * pxPorMetro >= 3;

/** Os anéis do polígono da terra ("M x yL x y…Z", em metros), em pares x, y. */
export function aneisDaTerra(terra: string): number[][] {
  return terra
    .split("M")
    .filter(Boolean)
    .map((anel) => (anel.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number));
}

/** O ponto está em terra? Par ou ímpar: o raio para a direita cruza a borda um número ímpar de vezes. */
export function emTerra(aneis: number[][], x: number, y: number) {
  let dentro = false;
  for (const a of aneis) {
    for (let i = 0, j = a.length - 2; i < a.length; j = i, i += 2) {
      const [xi, yi, xj, yj] = [a[i], a[i + 1], a[j], a[j + 1]];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) dentro = !dentro;
    }
  }
  return dentro;
}

/** Os bairros na carta, em % da caixa (LUGARES_NA_CARTA, de costa-de-niteroi.ts). */
export type Lugar = { readonly nome: string; readonly x: number; readonly y: number };

/** O bairro mais perto do ponto, em linha reta até o nó do OpenStreetMap, e a distância em metros. */
export function maisPerto(c: Caixa, lugares: readonly Lugar[], x: number, y: number) {
  return lugares
    .map((l) => ({ nome: l.nome, metros: Math.hypot((l.x / 100) * c.largura - x, (l.y / 100) * c.altura - y) }))
    .reduce((a, b) => (b.metros < a.metros ? b : a));
}

/** "0,8 km", "12,4 km": em km, com um décimo. */
export const quilometros = (metros: number) => (metros / 1000).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** A leitura inteira de um ponto: o que vai ao rótulo, aos dois valores e à frase do leitor de tela. */
export function leituraDoPonto(c: Caixa, aneis: number[][], lugares: readonly Lugar[], x: number, y: number, segundos: boolean) {
  const { latitude, longitude } = emGraus(c, x, y);
  const coordenada = escritaDaCoordenada(latitude, longitude, segundos);
  const terra = emTerra(aneis, x, y);
  const perto = maisPerto(c, lugares, x, y);
  // A menos de 50 m, a lente está no nó: a distância diria "0,0 km".
  const bairro = perto.metros < 50 ? { nome: perto.nome, km: null } : { nome: perto.nome, km: quilometros(perto.metros) };
  const onde = terra ? "em terra" : "na água";
  const frase = `${coordenada.latitude}, ${coordenada.longitude}, ${onde}; ${bairro.km ? `${bairro.nome} a ${bairro.km} km` : `sobre o nó de ${bairro.nome}`}.`;
  return { ...coordenada, terra, bairro, frase };
}

/**
 * As ruas do SVG (public/dados/ruas-niteroi.svg, ferramentas/gerar-ruas.mjs): "M3097 1120l11-74 5-63…M…", o primeiro
 * ponto de cada linha absoluto e os outros relativos, em metros. Devolve cada linha como pares x, y absolutos.
 */
export function linhasDasRuas(d: string): Float32Array[] {
  return d
    .split("M")
    .filter(Boolean)
    .map((trecho) => {
      const n = (trecho.match(/-?\d+/g) ?? []).map(Number);
      const linha = new Float32Array(n.length);
      for (let i = 0; i < n.length; i += 2) {
        linha[i] = i ? linha[i - 2] + n[i] : n[i];
        linha[i + 1] = i ? linha[i - 1] + n[i + 1] : n[i + 1];
      }
      return linha;
    });
}

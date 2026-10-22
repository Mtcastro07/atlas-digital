/**
 * O Sol de agora (17/10, "o Atlas Digital": a luz calculada, a metade digital da luz do site). Desde 17/10, a posição
 * do Sol num lugar e num instante, para os seis lugares que a direção lhe dá: o terminador e a tinta de cada traço da
 * Terra da capa, a legenda da Terra, a carta do prazo (um ponto a cada 20 minutos de Sol), as sombras dos degraus de
 * /planos, a rosa de /duvidas e o amanhecer do Fim. É a fórmula de baixa precisão do Astronomical Almanac (a que o
 * Observatório Naval dos EUA publica como "Approximate Solar Coordinates", ~0,01° entre 1950 e 2050; "a NOAA em forma
 * curta", na direção), e não o algoritmo completo de Meeus da calculadora da NOAA: o desenho não pede mais.
 * Os ângulos entram e saem em graus; a longitude é positiva a leste, a latitude positiva ao norte. O lugar vem de
 * figuras.coordenadas.decimal (conteudo/site.ts), a coordenada única do site: este módulo não guarda nenhuma.
 *
 * O relógio: relogio() é o agora de toda figura viva. Fora da produção, ?agora=2026-10-17T18:20-03:00 na URL fixa o
 * início do relógio (as capturas às três horas: 10:00, 17:50, 22:00), e a partir dali ele anda; na produção, e no
 * servidor, é sempre o relógio do aparelho.
 */

const GRAU = Math.PI / 180;

/** Um lugar em graus decimais, no formato de figuras.coordenadas.decimal. */
export type Lugar = { readonly latitude: number; readonly longitude: number };

/** O resto sempre positivo: o % do JavaScript guarda o sinal do dividendo (as datas antes de 2000). */
const modulo = (a: number, b: number) => ((a % b) + b) % b;

/**
 * O ponto subsolar: onde o Sol está a pino neste instante (a latitude é a declinação do Sol). É o centro do lado do
 * dia: o terminador é o círculo a 90° dele.
 */
export function pontoSubsolar(data: Date): Lugar {
  const n = data.getTime() / 86_400_000 - 10_957.5; // dias desde J2000.0 (12:00 TT de 1/1/2000; TT ≈ UTC aqui)
  const L = 280.46 + 0.9856474 * n; // a longitude média
  const g = (357.528 + 0.9856003 * n) * GRAU; // a anomalia média
  const lambda = (L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * GRAU; // a longitude eclíptica
  const epsilon = (23.439 - 0.0000004 * n) * GRAU; // a obliquidade
  const declinacao = Math.asin(Math.sin(epsilon) * Math.sin(lambda));
  const ascensao = Math.atan2(Math.cos(epsilon) * Math.sin(lambda), Math.cos(lambda)) / GRAU;
  const tempoSideral = 280.46061837 + 360.98564736629 * n; // o tempo sideral de Greenwich, em graus
  return { latitude: declinacao / GRAU, longitude: modulo(ascensao - tempoSideral + 180, 360) - 180 };
}

/**
 * O Sol no céu de um lugar: a altura sobre o horizonte (−90° a 90°, a geométrica, sem a refração) e o azimute (de 0° a
 * 360°, do norte para o leste: 90° é leste, 270° é oeste).
 */
export function solNoCeu(lugar: Lugar, data: Date) {
  const sub = pontoSubsolar(data);
  const fi = lugar.latitude * GRAU;
  const delta = sub.latitude * GRAU;
  const H = (lugar.longitude - sub.longitude) * GRAU; // o ângulo horário: positivo à tarde, com o Sol a oeste
  const altura = Math.asin(Math.sin(fi) * Math.sin(delta) + Math.cos(fi) * Math.cos(delta) * Math.cos(H)) / GRAU;
  const azimute = modulo(Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(fi) - Math.tan(delta) * Math.cos(fi)) / GRAU + 180, 360);
  return { altura, azimute };
}

/** Só a altura do Sol, em graus (a carta do prazo pede 24 dias × 72 casas dela). */
export const alturaDoSol = (lugar: Lugar, data: Date) => solNoCeu(lugar, data).altura;

/** A altura do centro do Sol no nascer e no pôr: o raio do disco (0,267°) e a refração no horizonte (0,567°). */
export const HORIZONTE = -0.833;

/**
 * O próximo instante, a partir de `agora`, em que o Sol cruza o horizonte subindo (o nascer) ou descendo (o pôr), em
 * até dois dias; a cada minuto, com a interpolação linear entre os dois minutos do cruzamento (erro de segundos).
 * null só onde o Sol não nasce ou não se põe (perto dos polos), o que não acontece em Niterói.
 */
function proximoCruzamento(lugar: Lugar, agora: Date, subindo: boolean) {
  const t0 = agora.getTime();
  let antes = alturaDoSol(lugar, agora) - HORIZONTE;
  for (let minuto = 1; minuto <= 2880; minuto++) {
    const t = t0 + minuto * 60_000;
    const depois = alturaDoSol(lugar, new Date(t)) - HORIZONTE;
    if (subindo ? antes < 0 && depois >= 0 : antes >= 0 && depois < 0) return new Date(t - 60_000 + (60_000 * antes) / (antes - depois));
    antes = depois;
  }
  return null;
}

/** O próximo nascer do Sol no lugar, depois de `agora`. */
export const proximoNascer = (lugar: Lugar, agora: Date) => proximoCruzamento(lugar, agora, true);
/** O próximo pôr do Sol no lugar, depois de `agora`. */
export const proximoPor = (lugar: Lugar, agora: Date) => proximoCruzamento(lugar, agora, false);

let desvio: number | undefined;

/**
 * O agora das figuras vivas. Fora da produção, o ?agora= da URL (lido uma vez, na primeira chamada) desloca o relógio
 * para aquele instante, e ele anda dali; no servidor, na produção e sem o parâmetro, é new Date(). O servidor nunca
 * usa a hora de quem lê: as figuras renderizam no servidor uma frase estável e trocam o valor depois de montar.
 */
export function relogio() {
  if (process.env.NODE_ENV !== "production" && typeof location !== "undefined") {
    if (desvio === undefined) {
      const fixo = Date.parse(new URLSearchParams(location.search).get("agora") ?? "");
      desvio = Number.isNaN(fixo) ? 0 : fixo - Date.now();
    }
    return new Date(Date.now() + desvio);
  }
  return new Date();
}

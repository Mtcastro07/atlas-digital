/**
 * A rosa do Sol de /duvidas, a geometria (desde 17/10, a direção final do Atlas Digital, seção 3, item 22, e a seção
 * 2.8): a rosa de oito pontas de 16/10, agora desenhada no primitivo do site, a casa da pauta. Cada casa da rosa é traço
 * gravado (a fileira contígua, em bronze) do lado do Sol de agora, e ponto de tela (a fileira aberta em pontos, na luz
 * da tela) do outro; a fronteira é a reta perpendicular ao azimute do Sol, pelo centro, em pontilhado de Bayer numa
 * faixa de cinco casas. No crepúsculo civil, o lado aceso se abre em pontos pelos mesmos limiares, e à noite a rosa
 * inteira é ponto. Cada ponta tem duas metades, como na rosa de 16/10: a voltada para o Sol, o traço mais grosso e o
 * ponto maior; a outra, o mais fino.
 * Sem import, para os testes do Node (registros/atlas/testes/rosa-do-sol.test.ts): o limiar de Bayer entra por
 * parâmetro (bayer, lib/traco-e-ponto.ts). O servidor desenha a rosa toda em ponto (sem o Sol, que ele não sabe de quem
 * lê); a ilha (components/ilhas/desenho-da-rosa.ts) troca os caminhos a cada minuto.
 * O desenho: um quadrado de −500 a 500, com o norte para cima e o leste à direita; a pauta, fileiras a cada
 * `passo`. Um caminho por camada, uma reta por fileira contígua: o ponto é a mesma reta com o tracejado "0 passo" e a
 * ponta redonda (o tracejado recomeça em cada trecho, e o ponto cai no centro de cada casa).
 * Desde 18/10 (o passe do celular; a direção, seção 4: "redesenhado para 390 px, nunca encolhido"), a pauta é um
 * parâmetro: a rosa da mesa a PASSO, e a de abaixo de 1.024 px a PASSO_NO_CELULAR, para a casa ficar com os ~5,5 px da
 * mesa numa rosa de 450 px (a PASSO, ~3 px: a fileira lia como uma trama cinza).
 */

/** A pauta, em unidades do desenho (a 1.440 px, ~5,8 px). */
export const PASSO = 7;
/** A pauta da rosa de abaixo de 1.024 px (a 390 px, com a rosa de 468 px, ~5,6 px). */
export const PASSO_NO_CELULAR = 12;
/** O raio das pontas cardeais; as colaterais têm 0,6 dele, como em 16/10. */
export const RAIO = 430;
/** O aro, onde corre a marca do Sol. */
export const ARO = 458;
/** O lado da luz da página quando o Sol ainda não foi calculado (o servidor): a hora azul, a oés-noroeste. */
const LUZ_DA_HORA_AZUL = 297;

/** As camadas, na ordem de pintura: o traço fino, o traço grosso, o ponto pequeno e o ponto grande. */
export const CAMADAS = ["traco-sombra", "traco-luz", "ponto-sombra", "ponto-luz"] as const;
export type Camada = (typeof CAMADAS)[number];

/** As metades das pontas: as cardeais primeiro (ficam na frente onde se cruzam com as colaterais). */
const METADES = [0, 90, 180, 270, 45, 135, 225, 315].flatMap((graus) => {
  const cardeal = graus % 90 === 0;
  const [raio, base] = cardeal ? [RAIO, RAIO / 6] : [RAIO * 0.6, RAIO / 8];
  const a = (graus * Math.PI) / 180;
  const d = [Math.sin(a), -Math.cos(a)];
  const lado = [d[1], -d[0]];
  return [1, -1].map((s) => ({
    cardeal,
    ponta: [raio * d[0], raio * d[1]] as const,
    base: [s * base * lado[0], s * base * lado[1]] as const,
    /** Para onde a metade olha: a normal do lado de fora dela. */
    normal: [s * lado[0], s * lado[1]] as const,
  }));
});

const cruz = (ax: number, ay: number, bx: number, by: number) => ax * by - ay * bx;

/** A metade k contém (x, y)? O triângulo é o centro, a ponta e o canto da base (com a borda). */
function contem(k: number, x: number, y: number) {
  const { ponta: [px, py], base: [bx, by] } = METADES[k];
  const a = cruz(px, py, x, y);
  const b = cruz(bx - px, by - py, x - px, y - py);
  const c = cruz(-bx, -by, x - bx, y - by);
  return (a >= 0 && b >= 0 && c >= 0) || (a <= 0 && b <= 0 && c <= 0);
}

/** A distância de (x, y) ao eixo da ponta da metade k. */
const aoEixo = (k: number, x: number, y: number) => Math.abs(cruz(METADES[k].ponta[0], METADES[k].ponta[1], x, y)) / Math.hypot(...METADES[k].ponta);

/**
 * O ponto (x, y) da metade k fica sob outra? A cardeal cobre a colateral; entre duas do mesmo tipo (as cardeais se
 * cruzam perto do centro), fica com a do eixo mais perto, e a divisa cai na bissetriz, sem a trama do cruzamento.
 */
const coberto = (x: number, y: number, k: number) =>
  METADES.some((m, j) => j !== k && m.cardeal && contem(j, x, y) && (!METADES[k].cardeal || aoEixo(j, x, y) < aoEixo(k, x, y)));

type Fileira = { metade: number; r: number; dx: number; dy: number; ox: number; oy: number; fim: number; casas: boolean[] };

/**
 * As fileiras da pauta, uma vez por passo: em cada metade de ponta, paralelas ao eixo dela, como o buril abre a rosa
 * gravada (deitadas, na rosa inteira, liam como as barras de um gráfico), mais o contorno, que fecha a ponta como na
 * rosa impressa: o eixo (uma vez por ponta) e o lado de fora. Cada fileira parte de (ox, oy) na direção (dx, dy), por
 * `fim` unidades; a casa c fica a (c + 0,5) × passo da partida. A casa que cai sob uma ponta da frente (a colateral sob a cardeal, perto
 * do centro) não existe: ela abre o trecho.
 */
const FILEIRAS = new Map<number, Fileira[]>();
const fileirasDa = (passo: number) => {
  const pronto = FILEIRAS.get(passo);
  if (pronto) return pronto;
  const lista = METADES.flatMap(({ ponta: [px, py], base: [bx, by] }, metade) => {
    const raio = Math.hypot(px, py);
    const largura = Math.hypot(bx, by);
    const [dx, dy] = [px / raio, py / raio];
    const [nx, ny] = [bx / largura, by / largura];
    const fileira = (r: number, ox: number, oy: number, ex: number, ey: number, fim: number) => {
      const casas: boolean[] = [];
      for (let c = 0; (c + 0.5) * passo <= fim; c++) {
        const u = (c + 0.5) * passo;
        casas.push(!coberto(ox + u * ex, oy + u * ey, metade));
      }
      return { metade, r, dx: ex, dy: ey, ox, oy, fim, casas };
    };
    const lado = Math.hypot(bx - px, by - py);
    const fileiras = [fileira(-1, px, py, (bx - px) / lado, (by - py) / lado, lado)];
    // O eixo é das duas metades: entra pela primeira (a do lado +).
    if (metade % 2 === 0) fileiras.push(fileira(0, 0, 0, dx, dy, raio));
    for (let r = 1; r * passo < largura; r++) {
      const v = r * passo;
      fileiras.push(fileira(r, v * nx, v * ny, dx, dy, raio * (1 - v / largura)));
    }
    return fileiras;
  });
  FILEIRAS.set(passo, lista);
  return lista;
};

/** Quantas casas tem a rosa (para os testes e a medida); só quando pedida, para o celular não montar a pauta da mesa. */
export const totalDeCasas = (passo = PASSO) => fileirasDa(passo).reduce((n, f) => n + f.casas.filter(Boolean).length, 0);

const num = (x: number) => String(Math.round(x * 10) / 10);

/**
 * Os quatro caminhos da rosa. `sol`: o azimute do Sol (em graus, do norte para o leste) e a noite (de 0, o Sol acima do
 * horizonte, a 1, o fim do crepúsculo civil); sem ele (no servidor), a rosa toda em ponto, com as metades pela luz da
 * hora azul. `bayer`: o limiar de Bayer da casa (lib/traco-e-ponto.ts). `passo`: a pauta (PASSO, a da mesa, ou
 * PASSO_NO_CELULAR); a faixa da fronteira tem duas casas e meia de cada lado da reta, na pauta dela.
 */
export function caminhosDaRosa(sol: { azimute: number; noite: number } | null, bayer: (i: number, j: number) => number, passo = PASSO) {
  const banda = 2.5 * passo;
  const a = ((sol?.azimute ?? LUZ_DA_HORA_AZUL) * Math.PI) / 180;
  const [ux, uy] = [Math.sin(a), -Math.cos(a)];
  const acesa = METADES.map(({ normal: [nx, ny] }) => nx * ux + ny * uy > 0);
  const partes: Record<Camada, string[]> = { "traco-sombra": [], "traco-luz": [], "ponto-sombra": [], "ponto-luz": [] };
  for (const { metade, r, dx, dy, ox, oy, fim, casas } of fileirasDa(passo)) {
    const lado = acesa[metade] ? "luz" : "sombra";
    // O trecho: as casas de c0 a c1, da mesma camada. O traço vai de borda a borda das casas (e, no fim da fileira, até
    // o lado de fora da ponta, que fica liso); o ponto, de centro a centro (o 0,01 desenha o último).
    const fechar = (camada: Camada, c0: number, c1: number) => {
      const traco = camada.startsWith("traco");
      const u0 = traco ? c0 * passo : (c0 + 0.5) * passo;
      const u1 = traco ? (c1 === casas.length - 1 ? fim : (c1 + 1) * passo) : (c1 + 0.5) * passo + 0.01;
      partes[camada].push(`M${num(ox + u0 * dx)} ${num(oy + u0 * dy)}L${num(ox + u1 * dx)} ${num(oy + u1 * dy)}`);
    };
    // A camada de cada casa (null sob a ponta da frente), e um trecho por sequência igual.
    const camadas = casas.map((existe, c): Camada | null => {
      if (!existe) return null;
      const u = (c + 0.5) * passo;
      // A distância à reta do Sol, positiva do lado da sombra; a fração de ponto cresce dentro da faixa.
      const d = -((ox + u * dx) * ux + (oy + u * dy) * uy);
      const valor = sol ? Math.max(sol.noite, Math.min(1, Math.max(0, 0.5 + d / (2 * banda)))) : 1;
      return `${valor >= bayer(c, r) ? "ponto" : "traco"}-${lado}`;
    });
    for (let de = 0, c = 1; c <= camadas.length; c++) {
      if (c < camadas.length && camadas[c] === camadas[de]) continue;
      const camada = camadas[de];
      if (camada) fechar(camada, de, c - 1);
      de = c;
    }
  }
  return Object.fromEntries(CAMADAS.map((c) => [c, partes[c].join("")])) as Record<Camada, string>;
}

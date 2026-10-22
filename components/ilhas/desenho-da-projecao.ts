import { CASAS_LAT, CASAS_LON, casaDe, costaDaMascara, gradeDeUmGrau, volta, type Casa } from "@/components/paginas/grade-da-terra";
import { COLUNAS, LINHAS, emTerra } from "@/lib/mascara-da-terra";
import type { Lugar } from "@/lib/sol";
import { bayer, densidade, novoLote, ponto } from "@/lib/traco-e-ponto";

export { carregarMascara } from "@/lib/mascara-da-terra";
export { familiaDoTitulo, mostrador } from "@/lib/traco-e-ponto";

/**
 * O desenho da projeção que se desenrola, em /o-atlas (desde 17/10, a direção final do Atlas Digital, seções 2.7, 2.8 e
 * 3, item 19), num módulo à parte: chega por import() depois do load, fora do script inicial (ilhas/projecao.tsx). No
 * lugar do globo da marca que girava sem medir nada, com a longitude de 12 px lida da fase da animação CSS
 * (ilhas/longitude-do-globo.tsx, até 17/10).
 * A mesma Terra em dois estados (a tese da direção, 1.1): a esfera, na projeção ortográfica (o globo como o olho o vê),
 * centrada em Niterói, a origem, com a terra em traço gravado de bronze pela luz da página (o fim da tarde, do oeste); e
 * a grade, na equirretangular centrada em 0°, 360 por 180 casas de um grau, com a terra em ponto de tela: a imagem que o
 * computador guarda da Terra. A passagem interpola as duas projeções (o x e o y de cada casa, o raio do recorte de 90° a
 * 180°, o centro e a escala), em 1,2 s, e cada casa se abre do traço ao ponto na ordem de Bayer, em 16 degraus (a casa
 * da pauta, lib/traco-e-ponto.ts). A terra e o mar saem da máscara de 0,5° do Natural Earth 1:110m (a mesma da capa, no
 * mesmo pedido), reduzida a 1° pela maioria das quatro casas de meio grau.
 * A graticula de 30° e as legendas dos eixos medem (a grade é a medida, seção 2.5); a escala gráfica vale no equador.
 * Desde a revisão de 17/10, a grade parada guarda a gravura: a costa de meio grau da máscara (o dado medido) fica em
 * traço de bronze, por cima das casas de um grau em ponto (o que a tela calcula dela), e o mar fica liso. Até então, o
 * mar em ponto apagado e a terra só em ponto: parado, lia "mapa-múndi de pontos" (o globo de pontos, seção 6). Na
 * esfera, as casas além de 60° rareiam com a área que têm (a Antártida, em casas de um grau iguais, desenhava anéis
 * concêntricos, um "radar") e voltam inteiras com a grade.
 * Desde 18/10 (o passe do celular), a janela: com a caixa abaixo de 600 px, a grade inteira dava 0,66 px por grau a 390
 * e a costa não se lia. Ali, a grade fica numa janela de 120° de longitude, do polo ao polo (2,7 px por grau a 390),
 * centrada no meridiano de Niterói; a esfera, do mesmo centro, inteira na largura da caixa, e a passagem a abre até a
 * altura da grade (na revisão de 18/10, a esfera ganhou a altura da grade, e a janela a cortava em duas retas; o
 * fechamento de 18/10 a devolveu à largura da caixa); e a grade corre sob a janela pelo arraste de lado (correr): o
 * meridiano central muda, e a borda da imagem, o meridiano de 180°, passa por ela como passa no cilindro. As latitudes
 * vão por dentro da grade, com o halo de carta. Na mesa, o meridiano central é 0° e nada disso entra.
 */

const GRAU = Math.PI / 180;
/** A tinta do metal pela incidência da luz da página, do rasante ao pleno (a família do bronze, sem tom novo). */
const METAL = ["#8a5a24", "#c08a4a", "#d9a76b", "#f1d3a1"] as const;
/** O alfa pela profundidade: perto do limbo, mais fundo. */
const ALFAS = [0.42, 0.72, 1] as const;
const LUZ = "#fbf1de";
const TINTA = "#f3efec";
const APAGADO = "#aebdcd";
/** O halo de carta dos rótulos: o contorno na cor do fundo da tela (seção 2.1). */
const HALO = "#0b2340";
/**
 * A luz da página (o fim da tarde, data-hora="fim-da-tarde"): do oeste, rasante e um pouco do alto, em coordenadas da
 * vista (x para o leste da tela, y para o alto, z para quem olha). É a luz pintada, simbólica, e não o Sol de agora: o
 * Sol calculado mora nos seis lugares da seção 2.3, e /o-atlas não é um deles.
 */
const LUZ_DA_CENA = (() => {
  const v = [-0.7, 0.36, 0.62];
  const n = Math.hypot(...v);
  return v.map((c) => c / n);
})();
/** O tempo da passagem (a tabela 2.8 da direção). */
export const DURACAO = 1200;
/** Abaixo desta largura da caixa (px), a janela (a do CSS: @container vd-projecao (width < 600px), app/digital.css). */
const JANELA = 600;
/** A longitude que a janela mostra (graus). */
const VAO_DA_JANELA = 120;

/** A geometria na caixa: o disco da esfera e o retângulo da grade (no movimento reduzido, lado a lado). */
type Geometria = { globo: { cx: number; cy: number; r: number }; mapa: { x: number; y: number; w: number; h: number } };

export type Projecao = {
  /** Mede a caixa e redesenha no estado de agora. */
  medir(): void;
  /** Desenha a passagem em `t`, de 0 (a esfera) a 1 (a grade). */
  desenhar(t: number): void;
  /** A casa sob um ponto da caixa (px), na esfera ou na grade paradas; null fora da Terra ou no meio da passagem. */
  apontar(x: number, y: number): Casa | null;
  /** Marca a casa apontada (a mira, no canvas de cima), ou apaga a mira. Com `seguir` (o teclado), a janela vai até a
   *  casa que saiu dela. */
  mirar(casa: Casa | null, seguir?: boolean): void;
  /** A casa é terra? */
  terra(casa: Casa): boolean;
  /** A grade corre agora sob o arraste de lado? (a janela, com a grade parada) */
  corre(): boolean;
  /** Corre a grade `px` para a direita (o meridiano central vai para o oeste); null volta a Niterói. */
  correr(px: number | null): void;
};

type Opcoes = {
  /** O canvas do desenho e o da mira, por cima, que se redesenha sozinho a cada movimento do ponteiro. */
  mapa: HTMLCanvasElement;
  mira: HTMLCanvasElement;
  mascara: Uint8Array;
  /** Niterói: a origem da esfera e o único lugar marcado. */
  lugar: Lugar;
  nome: string;
  /** Os dois estados lado a lado, parados (prefers-reduced-motion). */
  reduzido: boolean;
};

const suave = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const mistura = (a: number, b: number, t: number) => a + (b - a) * t;

export function projecao({ mapa: canvas, mira, mascara, lugar, nome, reduzido }: Opcoes): Projecao {
  const ctx = canvas.getContext("2d")!;
  const cm = mira.getContext("2d")!;
  const texto = getComputedStyle(document.documentElement).getPropertyValue("--font-texto").trim() || "system-ui, sans-serif";
  const terra = gradeDeUmGrau((lat, lon) => emTerra(mascara, lat, lon));

  // As casas de terra: o seno e o cosseno da latitude do centro, a longitude (rad) e o limiar de Bayer.
  const indices: number[] = [];
  for (let k = 0; k < terra.length; k++) if (terra[k]) indices.push(k);
  const n = indices.length;
  const CF = new Float32Array(n);
  const SF = new Float32Array(n);
  const LON = new Float32Array(n);
  const T = new Float32Array(n);
  // A fração das casas que a esfera mostra (1 até 60°, depois (2 · cos φ)²: a área da casa, e mais rara junto do polo,
  // onde as fileiras se fecham em anéis) e o sorteio fixo de cada uma.
  const FRACAO = new Float32Array(n);
  const SORTEIO = new Float32Array(n);
  indices.forEach((k, i) => {
    const linha = Math.floor(k / CASAS_LON);
    const coluna = k % CASAS_LON;
    const lat = (89.5 - linha) * GRAU;
    CF[i] = Math.cos(lat);
    SF[i] = Math.sin(lat);
    LON[i] = (coluna - 179.5) * GRAU;
    T[i] = bayer(linha, coluna);
    FRACAO[i] = Math.min(1, 2 * CF[i]) ** 2;
    const s = Math.sin(k * 12.9898) * 43758.5453;
    SORTEIO[i] = s - Math.floor(s);
  });

  // A costa de meio grau, em unidades da máscara (720 × 360).
  const costa = costaDaMascara(
    (linha, coluna) => emTerra(mascara, 90 - (linha + 0.5) * (180 / LINHAS), -180 + (coluna + 0.5) * (360 / COLUNAS)),
    COLUNAS,
    LINHAS,
  );

  let w = 0;
  let h = 0;
  let dpr = 1;
  /** A letra do leitor (a 200%, 2): os rótulos do desenho crescem com ela. */
  let letra = 1;
  let geo: Geometria = { globo: { cx: 0, cy: 0, r: 0 }, mapa: { x: 0, y: 0, w: 0, h: 0 } };
  /** A janela (a caixa estreita) e o meridiano central da grade (graus; na mesa, sempre 0°). */
  let janela = false;
  let meridiano = 0;
  let atual = 0;
  let imagem: HTMLCanvasElement | null = null;
  let pixelada: HTMLCanvasElement | null = null;
  let tracoDaCosta: Path2D | null = null;

  function medir() {
    const caixa = canvas.parentElement!.getBoundingClientRect();
    w = caixa.width;
    h = caixa.height;
    dpr = densidade();
    for (const c of [canvas, mira]) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    // A margem das legendas da latitude, de cada lado (simétrica: a grade fica no meio; a do CSS, com que o painel e a
    // legenda alinham) e, embaixo, as da longitude e a escala gráfica.
    letra = parseFloat(getComputedStyle(document.documentElement).fontSize) / 16 || 1;
    const bruta = getComputedStyle(canvas.parentElement!).getPropertyValue("--margem-mapa").trim();
    const margem = (parseFloat(bruta) || 2.5) * (bruta.endsWith("rem") ? 16 * letra : 1);
    const eraJanela = janela;
    janela = w < JANELA;
    // A margem de baixo: as longitudes e a escala (na janela, 4,5 rem, para a escala em duas linhas com a letra grande).
    const pe = (janela ? 72 : 60) * letra;
    if (janela !== eraJanela) meridiano = janela ? lugar.longitude : 0;
    if (janela) {
      // A janela: 120° de longitude na largura, do polo ao polo, centrada na caixa (o meridiano central no meio dela);
      // a esfera inteira, da largura da caixa, no meio dela, e a passagem a abre até a altura da grade (na passagem, o
      // centro sobe à grade, como na mesa). Desde o fechamento de 18/10: da altura da grade, ela passava da caixa e
      // saía cortada por duas retas. Com movimento reduzido, a esfera num quadrado em cima e a grade embaixo. A altura
      // é a do CSS; se a janela for mais baixa, o grau encolhe, e a esfera com ele.
      const topo = reduzido ? w + 16 : 0;
      const k = Math.min(w / VAO_DA_JANELA, (h - topo - pe) / 180);
      const mh = 180 * k;
      geo = {
        globo: reduzido ? { cx: w / 2, cy: w / 2, r: w / 2 - 4 } : { cx: w / 2, cy: h / 2, r: Math.min(w, mh) / 2 - 4 },
        mapa: { x: w / 2 - 180 * k, y: topo, w: 360 * k, h: mh },
      };
    } else if (reduzido && w >= 700) {
      // Lado a lado: a esfera à esquerda, a grade à direita.
      const r = (h - 8) / 2;
      const x = 2 * r + 24 + margem;
      const mw = w - x - 8;
      geo = { globo: { cx: r + 4, cy: h / 2, r }, mapa: { x, y: Math.max(0, (h - pe - mw / 2) / 2), w: mw, h: mw / 2 } };
    } else if (reduzido) {
      // Empilhados: a esfera em cima, a grade embaixo.
      const mw = w - 2 * margem;
      const r = Math.min(w * 0.42, (h - mw / 2 - pe - 24) / 2);
      geo = { globo: { cx: w / 2, cy: r + 4, r }, mapa: { x: margem, y: 2 * r + 24, w: mw, h: mw / 2 } };
    } else {
      // Desde 18/10, a caixa mais baixa que a grade (o celular deitado: a altura vai até a da janela do navegador) estreita
      // a grade, no meio; na mesa, a altura nunca é menor, e a grade fica como estava.
      const larga = w - 2 * margem;
      const mw = 2 * (h - pe) < larga - 1 ? 2 * (h - pe) : larga;
      const mh = mw / 2;
      geo = { globo: { cx: w / 2, cy: h / 2, r: Math.min((h - 8) / 2, w * 0.46) }, mapa: { x: (w - mw) / 2, y: Math.max(0, (h - pe - mh) / 2), w: mw, h: mh } };
    }
    // A costa na grade desta medida, um caminho só; e a grade em pixels, refeita se for preciso.
    const { mapa } = geo;
    tracoDaCosta = new Path2D();
    for (let i = 0; i < costa.length; i += 4) {
      tracoDaCosta.moveTo(mapa.x + (costa[i] / COLUNAS) * mapa.w, mapa.y + (costa[i + 1] / LINHAS) * mapa.h);
      tracoDaCosta.lineTo(mapa.x + (costa[i + 2] / COLUNAS) * mapa.w, mapa.y + (costa[i + 3] / LINHAS) * mapa.h);
    }
    pixelada = null;
    desenhar(atual);
  }

  /** O ponto (lat, lon em rad) na passagem `te`: x e y na caixa, e o vetor girado (para a luz, o limbo e o recorte). */
  function quadroDa(te: number) {
    const { globo, mapa } = geo;
    const l0 = mistura(lugar.longitude, meridiano, te) * GRAU;
    const f0 = mistura(lugar.latitude, 0, te) * GRAU;
    const c0 = Math.cos(f0);
    const s0 = Math.sin(f0);
    const R = globo.r;
    const S = mapa.w / (2 * Math.PI);
    const cx = mistura(globo.cx, mapa.x + mapa.w / 2, te);
    const cy = mistura(globo.cy, mapa.y + mapa.h / 2, te);
    // O recorte: a distância ao centro, de 90° (a esfera, só a face da frente) a 180° (a grade, a Terra inteira).
    const recorte = te >= 1 ? -2 : Math.cos((Math.PI / 2) * (1 + te));
    const a = (1 - te) * R;
    const b = te * S;
    /** Projeta; devolve false se a casa está fora do recorte. `saida` recebe x, y, x1 (para quem olha), y1 e z1. */
    const projetar = (cf: number, sf: number, lon: number, saida: Float64Array) => {
      const dl = lon - l0;
      const x = cf * Math.cos(dl);
      const y = cf * Math.sin(dl);
      const x1 = x * c0 + sf * s0;
      if (x1 < recorte) return false;
      const z1 = -x * s0 + sf * c0;
      let X = a * y;
      let Y = a * z1;
      if (b) {
        X += b * Math.atan2(y, x1);
        Y += b * Math.asin(Math.max(-1, Math.min(1, z1)));
      }
      saida[0] = cx + X;
      saida[1] = cy - Y;
      saida[2] = x1;
      saida[3] = y;
      saida[4] = z1;
      return true;
    };
    return { projetar, l0, c0, s0, a, b, cx, cy, R, S };
  }

  /** Na grade parada: o x de uma longitude (graus), pelo meridiano central; na mesa, o de sempre. */
  const xDaLon = (lon: number) => geo.mapa.x + geo.mapa.w / 2 + (volta(lon - meridiano) * geo.mapa.w) / 360;
  /** Os deslocamentos do que a grade guarda desenhado a partir de 180° O (a costa, a imagem em pixels): na janela, o
   *  meridiano central e as duas voltas vizinhas, para a emenda de 180° passar pela janela; na mesa, nenhum. */
  const desvios = () => {
    if (!janela) return [0];
    const d = (volta(-meridiano) * geo.mapa.w) / 360;
    return [d - geo.mapa.w, d, d + geo.mapa.w];
  };

  function camada(tl: number) {
    const te = suave(tl);
    // Os 16 degraus da passagem do traço ao ponto (a abertura de lib/traco-e-ponto.ts, aqui de ida e de volta).
    const degrau = Math.round(tl * 16) / 16;
    const { globo, mapa } = geo;
    const q = quadroDa(te);
    // O limbo da esfera se apaga no primeiro terço da passagem; a borda da grade são os meridianos de 180° e os polos,
    // que a própria projeção desenrola (o polo, ponto na esfera, vira a linha de cima e a de baixo da grade).
    const limbo = Math.max(0, 1 - te * 3);

    // O corpo da esfera, aceso do oeste.
    if (limbo > 0) {
      const gx = globo.cx - globo.r * 0.42;
      const gy = globo.cy - globo.r * 0.3;
      const corpo = ctx.createRadialGradient(gx, gy, 0, gx, gy, globo.r * 1.7);
      corpo.addColorStop(0, "#1d4670");
      corpo.addColorStop(0.5, "#0f2a47");
      corpo.addColorStop(1, "#08203b");
      ctx.globalAlpha = limbo;
      ctx.fillStyle = corpo;
      ctx.beginPath();
      ctx.arc(globo.cx, globo.cy, globo.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    // A grade parada com casas menores que 2,6 pixels do aparelho (os dois estados lado a lado, a densidade 1): a
    // própria imagem de 360 × 180, um pixel por casa, ampliada sem suavizar, e acesa na retícula do aparelho, um pixel
    // em cada quatro (ponto a ponto, daria moiré; até a revisão de 17/10, a imagem a 60%, uma mancha cinza).
    const celula = mapa.w / CASAS_LON;
    const emPixels = te >= 1 && celula * dpr < 2.6;
    if (emPixels) {
      if (!imagem) {
        imagem = document.createElement("canvas");
        imagem.width = CASAS_LON;
        imagem.height = CASAS_LAT;
        const ci = imagem.getContext("2d")!;
        const dados = ci.createImageData(CASAS_LON, CASAS_LAT);
        for (let k = 0; k < terra.length; k++) if (terra[k]) dados.data.set([251, 241, 222, 255], k * 4);
        ci.putImageData(dados, 0, 0);
      }
      if (!pixelada) {
        pixelada = document.createElement("canvas");
        pixelada.width = Math.round(mapa.w * dpr);
        pixelada.height = Math.round(mapa.h * dpr);
        const cp = pixelada.getContext("2d")!;
        cp.imageSmoothingEnabled = false;
        cp.drawImage(imagem, 0, 0, pixelada.width, pixelada.height);
        const trama = document.createElement("canvas");
        trama.width = trama.height = 2;
        const cr = trama.getContext("2d")!;
        cr.fillStyle = LUZ;
        cr.fillRect(0, 0, 1, 1);
        cp.globalCompositeOperation = "source-in";
        cp.fillStyle = cp.createPattern(trama, "repeat")!;
        cp.fillRect(0, 0, pixelada.width, pixelada.height);
      }
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      for (const d of desvios()) ctx.drawImage(pixelada, Math.round((mapa.x + d) * dpr), Math.round(mapa.y * dpr));
      ctx.restore();
    }

    // A graticula de 30°, que se desenrola com a Terra.
    const saida = new Float64Array(5);
    const anterior = new Float64Array(5);
    /** Uma linha da graticula, amostrada em `passos`: só os trechos visíveis, sem atravessar a emenda da grade. */
    const segmento = (caminho: Path2D, f: (s: number) => [number, number], passos: number) => {
      let tinha = false;
      for (let k = 0; k <= passos; k++) {
        const [lat, lon] = f(k / passos);
        const visivel = q.projetar(Math.cos(lat), Math.sin(lat), lon, saida);
        if (visivel && tinha && Math.abs(saida[0] - anterior[0]) < mapa.w / 3) {
          caminho.moveTo(anterior[0], anterior[1]);
          caminho.lineTo(saida[0], saida[1]);
        }
        tinha = visivel;
        anterior.set(saida);
      }
    };
    const linhas = new Path2D();
    for (let lon = -150; lon < 180; lon += 30) segmento(linhas, (k) => [(-90 + 180 * k) * GRAU, lon * GRAU], 90);
    for (let lat = -60; lat <= 60; lat += 30) segmento(linhas, (k) => [lat * GRAU, (-180 + 360 * k) * GRAU], 180);
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = `rgb(217 167 107 / ${mistura(0.24, 0.34, te)})`;
    ctx.stroke(linhas);
    // A borda da grade: os dois lados do meridiano de 180° e os polos, no metal, quando a passagem já os mostra.
    if (te > 0) {
      const borda = new Path2D();
      const lado = 179.999 * GRAU;
      segmento(borda, (k) => [(-90 + 180 * k) * GRAU, -lado], 90);
      segmento(borda, (k) => [(-90 + 180 * k) * GRAU, lado], 90);
      segmento(borda, (k) => [89.999 * GRAU, -lado + 2 * lado * k], 180);
      segmento(borda, (k) => [-89.999 * GRAU, -lado + 2 * lado * k], 180);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgb(192 138 74 / ${Math.min(0.6, te * 0.9)})`;
      ctx.stroke(borda);
    }

    // A terra: o traço pela luz e pela profundidade; o ponto, aceso.
    const tracos = METAL.map(() => ALFAS.map(() => new Path2D()));
    const lote = novoLote();
    // O ponto em três alfas: as casas que acabam de passar o recorte (as de trás, que a passagem traz) chegam apagadas.
    const pontos = ALFAS.map((alfa) => lote.caminho(LUZ, mistura(2, Math.min(2.6, celula * 0.66), te), alfa));
    const recorte = te >= 1 ? -2 : Math.cos((Math.PI / 2) * (1 + te));
    const meia = 0.5 * GRAU;
    const [lx, ly, lz] = LUZ_DA_CENA;
    // As casas raras dos polos voltam só no fim da passagem: no meio dela, o polo ainda é quase um ponto, e as fileiras
    // cheias em volta dele desenhavam o alvo de anéis.
    const cheias = te ** 4;
    // Na janela parada, a casa de longitude fora dela não se projeta (desde a revisão de 18/10: o arraste refaz o
    // quadro, e dois terços das casas caíam fora da caixa depois das contas). Ali, x = centro + S · Δλ.
    const vao = janela && te >= 1 ? (w / 2 + 3) / q.S : Infinity;
    for (let i = 0; i < (emPixels ? 0 : n); i++) {
      if (SORTEIO[i] > FRACAO[i] + (1 - FRACAO[i]) * cheias) continue;
      if (vao < Infinity) {
        const dl = LON[i] - q.l0;
        if (Math.abs(dl - 2 * Math.PI * Math.round(dl / (2 * Math.PI))) > vao) continue;
      }
      if (!q.projetar(CF[i], SF[i], LON[i], saida)) continue;
      const [x, y, x1, yy, z1] = saida;
      // Fora da caixa (a grade além da janela), nada a desenhar.
      if (x < -3 || x > w + 3) continue;
      // A dobra: perto do recorte, as casas de trás se amontoam; chegam apagadas e só depois de passar dele.
      const chegada = te > 0 ? x1 - recorte : 1;
      if (chegada < 0.08) continue;
      const perto = chegada < 0.3 ? 0 : chegada < 0.5 ? 1 : 2;
      // A casa se abre do traço (0) ao ponto (1) na ordem de Bayer, nos 16 degraus.
      const aberto = Math.max(0, Math.min(1, (degrau * 1.35 - T[i]) * 3.5));
      if (aberto >= 0.98) {
        ponto(pontos[perto], x, y);
        continue;
      }
      // A meia casa, ao longo do paralelo: a derivada da projeção pela longitude (o traço segue a fileira, em qualquer
      // estado da passagem).
      const dl = LON[i] - q.l0;
      const xv = CF[i] * Math.cos(dl);
      const dx1 = -yy * q.c0;
      const dz1 = yy * q.s0;
      let dX = q.a * xv;
      let dY = q.a * dz1;
      if (q.b) {
        dX += (q.b * (x1 * xv - yy * dx1)) / Math.max(1e-6, x1 * x1 + yy * yy);
        dY += (q.b * dz1) / Math.sqrt(Math.max(1e-6, 1 - z1 * z1));
      }
      const m = (1 - aberto) * meia;
      const luz = yy * lx + z1 * ly + x1 * lz;
      const cor = luz > 0.78 ? 3 : luz > 0.5 ? 2 : luz > 0.18 ? 1 : 0;
      const fundo = Math.min(perto, x1 > 0.62 ? 2 : x1 > 0.3 ? 1 : 0);
      const caminho = tracos[cor][fundo];
      caminho.moveTo(x - dX * m, y + dY * m);
      caminho.lineTo(x + dX * m + 0.01, y - dY * m);
    }
    ctx.lineCap = "butt";
    tracos.forEach((porAlfa, cor) =>
      porAlfa.forEach((caminho, fundo) => {
        ctx.globalAlpha = ALFAS[fundo];
        ctx.strokeStyle = METAL[cor];
        // O traço engrossa com a luz, como o buril que corta mais fundo.
        ctx.lineWidth = 1.05 + cor * 0.25;
        ctx.stroke(caminho);
      }),
    );
    ctx.globalAlpha = 1;
    lote.pintar(ctx);

    // A costa de meio grau, em traço, quando a grade assenta (antes disso, o desenho dela ainda não é o da grade), e só
    // com o meio grau de 0,75 px ou mais: menor, o traço cobre a terra inteira (o celular deitado; a janela do celular de
    // pé tem de 1 a 1,4 px).
    if (te > 0.995 && tracoDaCosta && celula >= 1.5) {
      ctx.globalAlpha = Math.min(1, (te - 0.995) / 0.005);
      ctx.lineWidth = 1;
      ctx.lineCap = "square";
      ctx.strokeStyle = METAL[2];
      for (const d of desvios()) {
        ctx.translate(d, 0);
        ctx.stroke(tracoDaCosta);
        ctx.translate(-d, 0);
      }
      ctx.globalAlpha = 1;
    }

    // O limbo de metal da esfera.
    if (limbo > 0) {
      ctx.globalAlpha = limbo;
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = "#c08a4a";
      ctx.beginPath();
      ctx.arc(globo.cx, globo.cy, globo.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    if (te >= 1) eixos();
    niteroi(q, te);
  }

  /** As legendas da grade parada: as latitudes à esquerda, as longitudes embaixo, e a escala gráfica no equador. */
  function eixos() {
    const { mapa } = geo;
    const grau = (valor: number, pos: string, neg: string) => (valor === 0 ? "0°" : `${Math.abs(valor)}° ${valor > 0 ? pos : neg}`);
    // Estreita (o celular deitado, a letra grande), a letra a 12 px, as latitudes de 60 em 60° (de 30 em 30, a 320 px,
    // ficavam a 14 px uma da outra) e as longitudes de 120 em 120°. Na janela, a letra a 12 px, as latitudes de 30 em
    // 30° por dentro da grade, junto da borda da esquerda, com o halo de carta (a margem delas era largura tirada da
    // grade), e as longitudes de 30 em 30° que cabem inteiras na janela.
    const estreita = !janela && mapa.w < 600;
    const esquerda = janela ? 0 : mapa.x;
    // Na janela, o anel e o nome de Niterói (niteroi(), abaixo) podem chegar à borda da esquerda: a latitude que cairia
    // sobre eles não se escreve.
    const marca = janela ? nomeJunto(xDaLon(lugar.longitude), mapa.y + ((90 - lugar.latitude) / 180) * mapa.h) : null;
    ctx.save();
    ctx.font = `500 ${(estreita || janela ? 12 : 13) * letra}px ${texto}`;
    ctx.fillStyle = APAGADO;
    ctx.textBaseline = "middle";
    ctx.textAlign = janela ? "left" : "right";
    for (const lat of estreita ? [60, 0, -60] : [60, 30, 0, -30, -60]) {
      const y = mapa.y + ((90 - lat) / 180) * mapa.h;
      const m = marca?.caixa;
      if (m && m[0] < 6 * letra + ctx.measureText(grau(lat, "N", "S")).width + 4 && Math.abs(y - (m[1] + m[3]) / 2) < (m[3] - m[1]) / 2 + 8 * letra) continue;
      if (janela) {
        ctx.save();
        ctx.lineJoin = "round";
        ctx.lineWidth = 4;
        ctx.strokeStyle = HALO;
        ctx.strokeText(grau(lat, "N", "S"), 6 * letra, y);
        ctx.restore();
        ctx.fillText(grau(lat, "N", "S"), 6 * letra, y);
      } else ctx.fillText(grau(lat, "N", "S"), mapa.x - (estreita ? 6 : 10) * letra, y);
    }
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    const base = mapa.y + mapa.h + 20 * letra;
    const longitudes = janela ? Array.from({ length: 12 }, (_, i) => -180 + 30 * i) : estreita ? [-120, 0, 120] : [-120, -60, 0, 60, 120];
    // Na janela, as que caberiam cortadas na borda, ou em cima da vizinha (a letra a 200%), não se escrevem.
    let ate = -Infinity;
    for (const lon of longitudes) {
      const x = xDaLon(lon);
      const rotulo = lon === -180 ? "180°" : grau(lon, "L", "O");
      const meia = ctx.measureText(rotulo).width / 2;
      if (janela && (x - meia < 0 || x + meia > w || x - meia < ate + 8 * letra)) continue;
      ctx.fillText(rotulo, x, base);
      ate = x + meia;
    }
    // A escala gráfica: 20° no equador (2 × 10°, em segmentos alternados, como a moldura), 2.226 km. Na janela, o texto
    // que não cabe ao lado da barra quebra ao lado dela, em duas linhas (a letra a 200%; até a revisão de 18/10, descia
    // para baixo da barra e ainda passava da caixa a 360 e a 320 px).
    const dez = (10 / 360) * mapa.w;
    const y = base + 18 * letra;
    ctx.strokeStyle = "#c08a4a";
    ctx.lineWidth = 1;
    ctx.strokeRect(esquerda + 0.5, y - 3.5, 2 * dez, 5);
    ctx.fillStyle = "#c08a4a";
    ctx.fillRect(esquerda, y - 3.5, dez, 5);
    ctx.fillStyle = APAGADO;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const escala = "2.226 km no equador";
    const ao = esquerda + 2 * dez + 10;
    if (!janela || ao + ctx.measureText(escala).width <= w) ctx.fillText(escala, ao, y - 1);
    else {
      ctx.fillText("2.226 km", ao, y - 1);
      ctx.fillText("no equador", ao, y - 1 + 16 * letra);
    }
    ctx.restore();
  }

  /**
   * Onde vai o nome de Niterói junto do anel em (x, y): à direita e abaixo dele, pela linha de chamada (lado 1), como
   * sempre na mesa. Na janela (desde a revisão de 18/10), se não couber, à esquerda (lado −1) e, se nem assim (a letra a
   * 200%), embaixo do anel (lado 0); e nada com o anel fora da janela: o nome sozinho, no mar, dizia um lugar falso.
   * `caixa` é o retângulo do anel e do nome juntos, para as latitudes não caírem sobre eles.
   */
  function nomeJunto(x: number, y: number) {
    ctx.font = `600 ${14 * letra}px ${texto}`;
    const largura = ctx.measureText(nome).width;
    const recuo = 26 + 8 * letra;
    const meia = 7 * letra + 2;
    let lado: 1 | -1 | 0 = 1;
    let tx = x + recuo;
    let ty = y + 22;
    if (janela) {
      if (x < 0 || x > w) return null;
      if (tx + largura > w - 4) {
        lado = x - recuo - largura >= 4 ? -1 : 0;
        tx = lado ? x - recuo - largura : Math.max(4, Math.min(w - 4 - largura, x - largura / 2));
        if (!lado) ty = y + 20 + meia;
      }
    }
    const caixa = [Math.min(x - 8, tx), Math.min(y - 8, ty - meia), Math.max(x + 8, tx + largura), Math.max(y + 24, ty + meia)];
    return { lado, tx, ty, caixa };
  }

  /** Niterói: o anel, o ponto e o nome, com o halo de carta; na grade, o anel em volta da casa. */
  function niteroi(q: ReturnType<typeof quadroDa>, te: number) {
    const saida = new Float64Array(5);
    const lat = lugar.latitude * GRAU;
    if (!q.projetar(Math.cos(lat), Math.sin(lat), lugar.longitude * GRAU, saida)) return;
    const [x, y] = saida;
    const junto = nomeJunto(x, y);
    if (!junto) return;
    const { lado, tx, ty } = junto;
    ctx.save();
    ctx.strokeStyle = "#f1d3a1";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = te >= 1 ? LUZ : "#f1d3a1";
    ctx.beginPath();
    ctx.arc(x, y, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    if (lado) {
      ctx.moveTo(x + 5 * lado, y + 5);
      ctx.lineTo(x + 22 * lado, y + 22);
      ctx.lineTo(x + (22 + 8 * letra) * lado, y + 22);
    } else {
      ctx.moveTo(x, y + 7);
      ctx.lineTo(x, y + 18);
    }
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.font = `600 ${14 * letra}px ${texto}`;
    ctx.textBaseline = "middle";
    ctx.lineJoin = "round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = HALO;
    ctx.strokeText(nome, tx, ty);
    ctx.fillStyle = TINTA;
    ctx.fillText(nome, tx, ty);
    ctx.restore();
  }

  function desenhar(t: number) {
    atual = t;
    if (!w) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    if (reduzido) {
      camada(0);
      camada(1);
    } else camada(t);
  }

  /** A casa sob (x, y): na grade, pela conta direta; na esfera, pela ortográfica inversa. */
  function apontar(x: number, y: number): Casa | null {
    const { globo, mapa } = geo;
    // Com movimento reduzido, a grade ao lado da esfera (a mesa) ou embaixo dela (desde 18/10: até então, a caixa
    // empilhada lia tudo como grade, e a esfera não dava casa).
    const lado = !janela && w >= 700;
    const naGrade = reduzido ? (lado ? x >= mapa.x - 4 : y >= mapa.y - 4) : atual === 1;
    const naEsfera = reduzido ? !naGrade : atual === 0;
    if (naGrade) {
      // A longitude pelo meridiano central (na mesa, 0°: a conta de sempre, (x − mapa.x) / mapa.w × 360 − 180).
      const lon = meridiano + ((x - mapa.x - mapa.w / 2) / mapa.w) * CASAS_LON;
      const v = (y - mapa.y) / mapa.h;
      if (v < 0 || v >= 1 || (janela ? x < 0 || x >= w : lon < -180 || lon >= 180)) return null;
      return { linha: Math.floor(v * CASAS_LAT), coluna: (((Math.floor(lon + 180) % CASAS_LON) + CASAS_LON) % CASAS_LON) };
    }
    if (naEsfera) {
      const X = (x - globo.cx) / globo.r;
      const Y = -(y - globo.cy) / globo.r;
      const d = X * X + Y * Y;
      if (d > 1) return null;
      const x1 = Math.sqrt(1 - d);
      const f0 = lugar.latitude * GRAU;
      const xx = x1 * Math.cos(f0) - Y * Math.sin(f0);
      const zz = x1 * Math.sin(f0) + Y * Math.cos(f0);
      return casaDe(Math.asin(zz) / GRAU, Math.atan2(X, xx) / GRAU + lugar.longitude);
    }
    return null;
  }

  /** A mira: na grade, a casa no quadro e a linha e a coluna dela; na esfera, o paralelo e o meridiano do centro dela. */
  function mirar(casa: Casa | null, seguir = false) {
    cm.setTransform(dpr, 0, 0, dpr, 0, 0);
    cm.clearRect(0, 0, w, h);
    if (!casa) return;
    const { mapa } = geo;
    const lat = (89.5 - casa.linha) * GRAU;
    const lon = (casa.coluna - 179.5) * GRAU;
    const fios = new Path2D();
    let centro: [number, number] | null = null;
    if (reduzido || atual === 1) {
      const c = mapa.w / CASAS_LON;
      // Na janela, a casa que o teclado levou para fora dela traz a grade consigo: o meridiano central vai até ela.
      if (janela && seguir && Math.abs(volta(casa.coluna - 179.5 - meridiano)) > ((w / 2 - 12) * CASAS_LON) / mapa.w) {
        meridiano = casa.coluna - 179.5;
        desenhar(atual);
      }
      const x = xDaLon(casa.coluna - 179.5);
      const y = mapa.y + (casa.linha + 0.5) * c;
      fios.moveTo(Math.max(0, mapa.x), y);
      fios.lineTo(Math.min(w, mapa.x + mapa.w), y);
      fios.moveTo(x, mapa.y);
      fios.lineTo(x, mapa.y + mapa.h);
      cm.lineWidth = 1;
      cm.strokeStyle = "rgb(251 241 222 / 0.32)";
      cm.stroke(fios);
      cm.lineWidth = 1.5;
      cm.strokeStyle = TINTA;
      cm.strokeRect(x - c / 2 - 3, y - c / 2 - 3, c + 6, c + 6);
    }
    if (reduzido || atual === 0) {
      const q = quadroDa(0);
      const saida = new Float64Array(5);
      const curva = new Path2D();
      const tracar = (f: (s: number) => [number, number]) => {
        let tinha = false;
        for (let s = 0; s <= 120; s++) {
          const [a, b] = f(s / 120);
          const visivel = q.projetar(Math.cos(a), Math.sin(a), b, saida);
          if (visivel) {
            if (tinha) curva.lineTo(saida[0], saida[1]);
            else curva.moveTo(saida[0], saida[1]);
          }
          tinha = visivel;
        }
      };
      tracar((s) => [lat, -Math.PI + 2 * Math.PI * s]);
      tracar((s) => [-Math.PI / 2 + Math.PI * s, lon]);
      cm.lineWidth = 1;
      cm.strokeStyle = "rgb(251 241 222 / 0.32)";
      cm.stroke(curva);
      if (q.projetar(Math.cos(lat), Math.sin(lat), lon, saida)) centro = [saida[0], saida[1]];
      if (centro) {
        cm.lineWidth = 1.5;
        cm.strokeStyle = TINTA;
        cm.beginPath();
        cm.arc(centro[0], centro[1], 5, 0, Math.PI * 2);
        cm.stroke();
      }
    }
  }

  return {
    medir,
    desenhar,
    apontar,
    mirar,
    terra: ({ linha, coluna }) => terra[linha * CASAS_LON + coluna] === 1,
    corre: () => janela && (reduzido || atual === 1),
    correr(px) {
      if (!janela) return;
      meridiano = px === null ? lugar.longitude : volta(meridiano - (px * CASAS_LON) / geo.mapa.w);
      desenhar(atual);
    },
  };
}

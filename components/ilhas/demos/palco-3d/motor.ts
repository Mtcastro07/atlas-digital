import { FRAGMENTO, VERTICE } from "./cena";

// O motor do palco 3D da Barbearia Santa Rosa: liga o desenho em WebGL
// (./cena.ts) à página. Baixado só depois da primeira pintura (ilha
// ../palco-3d.tsx), roda num canvas fixo atrás do conteúdo e:
// - compila o desenho sem travar a página (KHR_parallel_shader_compile:
//   o quadro só começa quando a placa de vídeo termina);
// - desenha o atlas das faces das fichas (conteudo/demos/barbearia.ts,
//   `fichas`) num canvas 2D, com a fonte de exibição do site, em branco
//   sobre preto (o branco é relevo) — uma ficha por vez, com o navegador
//   ocioso, as da página aberta primeiro (medido em 01/10: o atlas
//   inteiro de uma vez era uma tarefa de 359 ms);
// - lê, a cada quadro, as seções da página que pedem uma ficha
//   ([data-objeto="<id da ficha>"], com data-lado="esquerda|centro|
//   direita"): elas formam a sequência de faces da página (seções seguidas
//   com a mesma ficha são uma face só, que muda de lado sem virar), e a
//   rolagem dá uma posição contínua nessa sequência — a ficha da seção no
//   centro da janela fica em cena, e, entre duas seções, uma vira na outra,
//   como uma moeda. A face só troca de perfil (±90°), já contados os
//   balanços. Até 03/10, a virada era guardada por par de seções: quando o
//   centro passava de uma seção, o par trocava de uma vez e a virada
//   suavizada do par anterior valia no novo (a ficha seguinte aparecia de
//   relance e a moeda dava meia-volta para trás, também no fim da troca de
//   página); e a face trocava por um limiar da virada, não pelo giro
//   desenhado, a até 45° do perfil;
// - na troca de página, a ficha em cena vira na da página nova (0,9 s); num
//   salto da rolagem (âncora, tecla End), vira direto na face de destino,
//   sem passar pelas do meio;
// - quando a mesma seção troca de ficha no lugar e traz data-virada (desde
//   14/10: a lista de capítulos do início, sob o ponteiro, e a abertura do
//   Agendar, com o serviço escolhido), a virada dura esse tanto (300 ms).
//   Para saber a causa, guarda do quadro anterior a ficha de cada seção: na
//   troca de página, as seções são outras, e a virada continua de 0,9 s. Se
//   a ficha muda de novo no meio da virada, ainda na primeira metade, a
//   moeda segue girando para a nova; na segunda, assenta e vira de novo;
// - na mesa, apaga a ficha quando uma seção com data-palco-vazio sobe a um
//   quarto da tela, até ela deixar o meio (desde a correção de 14/10: o
//   painel das ferramentas, no Agendar e no Retorno, onde a ficha da
//   abertura ficava presa atrás do vidro, cortada pela borda do painel; e,
//   desde 16/10, o rodapé, que cortava a placa das cadeiras no fim do
//   início). No celular, a ficha já anda com a sua seção e sai de cena
//   rolando; desde 16/10, no lugar que a seção dá a ela ([data-lugar]);
// - segue o ponteiro (a ficha olha para ele) e a rolagem (a ficha gira); no
//   toque (desde 14/10), olha para o ponto tocado e, 400 ms depois, volta ao
//   centro: o arrastar do dedo não conta (até então, o olhar ficava preso
//   ao último ponto em que o dedo se moveu antes de rolar);
// - desenha na resolução da tela (até 2× a do CSS) e só a baixa se a tela
//   perde quadros, subindo de volta quando sobra tempo (ver o ajuste, em
//   desenhar). Até 03/10, partia de 64% da resolução nativa no computador
//   e de 31% no celular, e numa tela de 60 Hz a resolução só podia cair:
//   as fichas saíam borradas;
// - para o tempo na pausa do botão (html.ambiente-pausado) e com movimento
//   reduzido — aí só redesenha quando a rolagem muda a cena, sem giro nem
//   ponteiro, e as viradas são imediatas; desde 16/10, sem ficha à vista e
//   na pausa (com a cena já parada), o laço também para, e o quadro só vem de
//   um evento (ver o repouso, em desenhar);
// - não grava nada no aparelho.

export type Ficha = {
  id: string;
  forma: "redonda" | "oitavada" | "placa";
  metal: "latao" | "alpaca" | "cobre" | "bronze";
  anel?: string;
  centro?: string;
  acima?: string;
  detalhe?: string;
  linhas?: readonly string[];
};

const FORMAS = { redonda: 0, oitavada: 1, placa: 2 } as const;
const METAIS = { latao: 0, alpaca: 1, cobre: 2, bronze: 3 } as const;
const LADOS: Record<string, number> = { esquerda: -1, centro: 0, direita: 1 };
/** O atlas: quatro colunas por três linhas de células. */
const COLUNAS = 4;
const LINHAS = 3;
/** A face é desenhada numa grade de 512 unidades, qualquer que seja o tamanho da célula. */
const UNIDADE = 512;
/** Largura a partir da qual a ficha fica de lado, numa faixa medida em pixels (faixa, abaixo). */
const LARGA = 1024;

type Secao = { el: HTMLElement; ficha: number; lado: number; topo: number; meio: number; soComputador: boolean; vazia: boolean; lugar: DOMRect | null };
/** A virada da troca de página e do salto da rolagem, em segundos. */
const VIRADA = 0.9;
type Opcoes = { reduzir: boolean; fichas: readonly Ficha[]; familia: string };
export type Palco = { trocarPagina: () => void; destruir: () => void };

const suave = (atual: number, alvo: number, dt: number, rapidez: number) => atual + (alvo - atual) * (1 - Math.exp(-dt * rapidez));
const passo = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
/** A face numa posição da sequência: a do arredondamento (a troca acontece de perfil). */
const faceEm = (faces: readonly number[], posicao: number) => faces[Math.min(faces.length - 1, Math.max(0, Math.round(posicao)))] ?? 0;
/** A posição de uma face na sequência, a mais perto de uma posição dada; -1 se ela não está na sequência. */
const posicaoDe = (faces: readonly number[], face: number, perto: number) =>
  faces.reduce((melhor, f, k) => (f === face && (melhor < 0 || Math.abs(k - perto) < Math.abs(melhor - perto)) ? k : melhor), -1);
const iguais = (a: readonly number[], b: readonly number[]) => a.length === b.length && a.every((x, k) => x === b[k]);

/** Manda compilar e ligar o desenho, sem perguntar o resultado (perguntar trava até a placa terminar). */
function iniciarCompilacao(gl: WebGLRenderingContext) {
  const sombreador = (tipo: number, fonte: string) => {
    const s = gl.createShader(tipo)!;
    gl.shaderSource(s, fonte);
    gl.compileShader(s);
    return s;
  };
  const v = sombreador(gl.VERTEX_SHADER, VERTICE);
  const f = sombreador(gl.FRAGMENT_SHADER, FRAGMENTO);
  const programa = gl.createProgram();
  if (!programa) return null;
  gl.attachShader(programa, v);
  gl.attachShader(programa, f);
  gl.linkProgram(programa);
  return { programa, v, f };
}

/** O texto em volta de uma ficha, letra a letra, no raio dado (a partir do topo, no sentido horário). */
function textoEmVolta(c: CanvasRenderingContext2D, texto: string, raio: number) {
  const letras = Array.from(texto.toUpperCase());
  letras.forEach((letra, i) => {
    c.save();
    c.rotate((i / letras.length) * Math.PI * 2);
    c.fillText(letra, 0, -raio);
    c.restore();
  });
}

/** Um polígono regular de oito lados, com os lados retos no alto, embaixo e dos lados (como o da cena). */
function oitavado(c: CanvasRenderingContext2D, apotema: number) {
  const raio = apotema / Math.cos(Math.PI / 8);
  c.beginPath();
  for (let k = 0; k < 8; k++) {
    const a = Math.PI / 8 + (k * Math.PI) / 4;
    if (k) c.lineTo(Math.cos(a) * raio, Math.sin(a) * raio);
    else c.moveTo(Math.cos(a) * raio, Math.sin(a) * raio);
  }
  c.closePath();
}

function retanguloArredondado(c: CanvasRenderingContext2D, meiaLargura: number, meiaAltura: number, raio: number) {
  c.beginPath();
  c.roundRect(-meiaLargura, -meiaAltura, meiaLargura * 2, meiaAltura * 2, raio);
}

/** A face de uma ficha, na sua célula do atlas, em branco sobre preto (o branco é relevo). */
function desenharFace(c: CanvasRenderingContext2D, ficha: Ficha, familia: string) {
  c.save();
  c.strokeStyle = "#fff";
  c.fillStyle = "#fff";
  c.textAlign = "center";
  c.textBaseline = "middle";
  if (ficha.forma === "placa") {
    // A placa: 1 unidade da cena = 222 px (a face mede 2,16 × 1,4).
    c.lineWidth = 6;
    retanguloArredondado(c, 226, 138, 22);
    c.stroke();
    c.lineWidth = 2;
    retanguloArredondado(c, 212, 124, 14);
    c.stroke();
    const [primeira = "", segunda = "", terceira = ""] = ficha.linhas ?? [];
    c.font = `500 27px ${familia}`;
    c.fillText(primeira.toUpperCase(), 0, -76);
    c.font = `${segunda.length > 8 ? 60 : 108}px ${familia}`;
    c.fillText(segunda, 0, 6);
    c.font = `500 24px ${familia}`;
    c.fillText(terceira.toUpperCase(), 0, 90);
    c.restore();
    return;
  }
  // As redondas e as oitavadas: 1 unidade da cena = 256 px.
  const oito = ficha.forma === "oitavada";
  c.lineWidth = 7;
  if (oito) oitavado(c, 222);
  else {
    c.beginPath();
    c.arc(0, 0, 238, 0, Math.PI * 2);
  }
  c.stroke();
  c.lineWidth = 2;
  if (oito) oitavado(c, 208);
  else {
    c.beginPath();
    c.arc(0, 0, 224, 0, Math.PI * 2);
  }
  c.stroke();
  for (const [raio, largura] of [
    [150, 5],
    [140, 2],
  ]) {
    c.lineWidth = largura;
    c.beginPath();
    c.arc(0, 0, raio, 0, Math.PI * 2);
    c.stroke();
  }
  if (ficha.anel) {
    c.font = `500 27px ${familia}`;
    textoEmVolta(c, ficha.anel, oito ? 176 : 184);
  }
  const centro = ficha.centro ?? "";
  const longo = centro.length > 3;
  c.font = `${longo ? 62 : 150}px ${familia}`;
  c.fillText(centro, 0, longo ? 2 : 10);
  if (ficha.acima) {
    c.font = `500 26px ${familia}`;
    c.fillText(ficha.acima, 0, -88);
  }
  if (ficha.detalhe) {
    c.font = `500 22px ${familia}`;
    c.fillText(ficha.detalhe.toUpperCase(), 0, longo ? 52 : 98);
  }
  if (!ficha.acima && !ficha.detalhe) {
    for (const x of [-118, 118]) {
      c.beginPath();
      c.arc(x, 0, 6, 0, Math.PI * 2);
      c.fill();
    }
  }
  c.restore();
}

/**
 * Uma face, com o desfoque leve que dá rampa ao relevo (a luz desliza nas
 * bordas), num canvas do tamanho da célula. O desfoque fica em 1,4 px da
 * célula em qualquer tamanho: na de 1.024 px, o chanfro tem a mesma
 * inclinação e metade da largura na tela — o relevo sai mais nítido.
 */
function desenharCelula(ficha: Ficha, familia: string, celula: number) {
  const nitida = document.createElement("canvas");
  nitida.width = nitida.height = celula;
  const c = nitida.getContext("2d")!;
  c.fillStyle = "#000";
  c.fillRect(0, 0, celula, celula);
  c.translate(celula / 2, celula / 2);
  c.scale(celula / UNIDADE, celula / UNIDADE);
  desenharFace(c, ficha, familia);
  const macia = document.createElement("canvas");
  macia.width = macia.height = celula;
  const m = macia.getContext("2d")!;
  m.filter = "blur(1.4px)";
  m.drawImage(nitida, 0, 0);
  return macia;
}

/** Espera o navegador ficar ocioso (com teto), para cada ficha ser uma tarefa curta. */
const ocioso = () =>
  new Promise<void>((resolver) => {
    if (typeof requestIdleCallback === "function") requestIdleCallback(() => resolver(), { timeout: 400 });
    else setTimeout(resolver, 16);
  });

export function iniciarPalco(canvas: HTMLCanvasElement, opcoes: Opcoes): Palco | null {
  const atributos: WebGLContextAttributes = {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    powerPreference: "high-performance",
  };
  const gl = (canvas.getContext("webgl2", atributos) ?? canvas.getContext("webgl", atributos)) as WebGLRenderingContext | null;
  if (!gl) return null;
  // A compilação corre na placa de vídeo; com a extensão, a página não espera por ela.
  const paralela = gl.getExtension("KHR_parallel_shader_compile") as { COMPLETION_STATUS_KHR: number } | null;
  const compilacao = iniciarCompilacao(gl);
  if (!compilacao) return null;

  // A célula do atlas: 1.024 px no computador (a ficha passa de 1.000 px de
  // tela, e a de 512 px saía ampliada mais de duas vezes) e, desde 16/10, no
  // celular de densidade 1,5 ou mais (a moeda da navalha, cortada pela borda,
  // passa de 1.000 px do aparelho; com a de 512 px, saía ampliada duas vezes,
  // borrada); 512 px só na tela de densidade 1 abaixo de 1.024 px. Num canal só
  // (luminância): o atlas de 1.024 px ocupa os mesmos 12,6 MB que o de 512 px em RGBA, até 03/10.
  const grande = window.innerWidth >= LARGA || window.devicePixelRatio >= 1.5;
  const celula = grande && (gl.getParameter(gl.MAX_TEXTURE_SIZE) as number) >= 1024 * COLUNAS ? 1024 : 512;

  const nomes = ["uRes", "uTempo", "uPonteiro", "uForma", "uMetal", "uCelula", "uVirada", "uDesloc", "uAltura", "uTamanho", "uTamanhoPlaca", "uVisivel", "uFaces", "uTexel", "uPequena"] as const;
  type Uniformes = Record<(typeof nomes)[number], WebGLUniformLocation | null>;
  let uni: Uniformes | null = null;

  /** O desenho ficou pronto: confere a ligação e prepara o triângulo e os uniformes. Falhou: sem 3D. */
  const prepararPrograma = () => {
    const { programa: p, v, f } = compilacao;
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      console.warn("palco 3d:", gl.getShaderInfoLog(v) || gl.getShaderInfoLog(f) || gl.getProgramInfoLog(p));
      return false;
    }
    gl.useProgram(p);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(p, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    uni = Object.fromEntries(nomes.map((n) => [n, gl.getUniformLocation(p, n)])) as Uniformes;
    gl.uniform1i(uni.uFaces, 0);
    gl.uniform1f(uni.uTexel, 1 / celula);
    return true;
  };

  // As faces: o atlas inteiro, preto (sem relevo), até cada ficha ser desenhada.
  const textura = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, textura);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, celula * COLUNAS, celula * LINHAS, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  // ---------- estado ----------
  let vivo = true;
  const raiz = document.documentElement;
  const indice = new Map(opcoes.fichas.map((f, i) => [f.id, i]));
  // A resolução do desenho: a da tela, até 2× a do CSS (a 3×, o custo mais
  // que dobra para uma diferença que o olho mal vê), vezes a escala do ajuste.
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let escala = 1;
  let tempo = 2;
  let ultimo = performance.now();
  let quadros = 0;
  // O ajuste da resolução (em desenhar): a soma dos intervalos da janela de
  // 45 quadros, as janelas seguidas com folga e a hora em que o desenho ficou pronto.
  let somaDosQuadros = 0;
  let folga = 0;
  let prontoEm = 0;
  const ponteiro = { x: 0, y: 0, alvoX: 0, alvoY: 0 };
  // virada: a posição na sequência de faces da página (0 = a primeira de
  // frente; 0,5 = de perfil, entre a primeira e a segunda).
  const cena = { virada: 0, desloc: 0, altura: 0, visivel: 0 };
  /** A sequência de faces da página (índices das fichas), refeita da geometria a cada quadro. */
  let faces: number[] = [];
  let transicao: { de: number; para: number; t: number; dur: number } | null = null;
  /** A ficha de cada seção no quadro anterior: a troca no lugar (data-virada) se distingue da troca de página. */
  const fichaAnterior = new WeakMap<HTMLElement, number>();
  /** A ficha desenhada no último quadro, de onde parte a virada de uma troca de página. */
  let mostrada = -1;
  /** No celular, o centro da ficha no quadro anterior, em pixels (para perceber o salto de uma seção à outra). */
  let poseAnterior: { x: number; y: number } | null = null;
  /** No celular, o tamanho que a seção dá à ficha ([data-lugar]); sem ele, o da faixa. */
  let tamanhoDaSecao: { moeda: number; placa: number } | null = null;
  /** No celular, a seção que tem a ficha agora (ela só passa à outra quando esta sai da tela). */
  let secaoNoCelular: HTMLElement | null = null;
  let sujo = true;
  let quadro = 0;
  let ultimaAssinatura = "";
  /** O laço parou no quadro anterior (repouso): o primeiro quadro depois dele conta um intervalo só, e não a espera. */
  let emRepouso = false;

  const medir = () => {
    const largura = Math.max(1, Math.round(window.innerWidth * dpr * escala));
    const altura = Math.max(1, Math.round(window.innerHeight * dpr * escala));
    if (canvas.width !== largura || canvas.height !== altura) {
      canvas.width = largura;
      canvas.height = altura;
      gl.viewport(0, 0, largura, altura);
      sujo = true;
    }
  };

  /**
   * As seções e as caixas delas, lidas num passe só no começo do quadro (desde 16/10, o Impeccable: o lugar da ficha
   * no celular era relido a cada pose(), várias vezes por quadro). O motor não escreve no DOM durante o quadro, e o
   * pedido de quadro da rolagem vem antes do da cena de rolagem (captura, abaixo): a leitura acha o leiaute limpo.
   */
  const secoes = (): Secao[] =>
    [...document.querySelectorAll<HTMLElement>("[data-objeto], [data-palco-vazio]")].map((el) => {
      const caixa = el.getBoundingClientRect();
      return {
        el,
        ficha: indice.get(el.dataset.objeto ?? "") ?? 0,
        lado: LADOS[el.dataset.lado ?? "centro"] ?? 0,
        topo: caixa.top,
        meio: caixa.top + caixa.height / 2,
        // Seção de conteúdo longo (lista, linha do tempo): no celular, sem ficha.
        soComputador: el.hasAttribute("data-so-computador"),
        vazia: !el.hasAttribute("data-objeto"),
        lugar: el.querySelector("[data-lugar]")?.getBoundingClientRect() ?? null,
      };
    });

  /**
   * O alvo da cena pela geometria da página: a sequência de faces e a
   * posição nela — contínua, porque a virada entre duas seções termina
   * exatamente onde a seguinte começa —, o lado da tela e, no celular, a
   * altura (lá a posição é inteira: a ficha não vira, troca fora da tela).
   */
  const alvoDaRolagem = () => {
    const W = window.innerWidth;
    const estreita = W < LARGA;
    const todas = secoes();
    // A troca no lugar: a mesma seção, com outra ficha que no quadro anterior, e com data-virada (em ms).
    let duracao = VIRADA;
    let noLugar = false;
    for (const s of todas) {
      if (s.vazia) continue;
      const antes = fichaAnterior.get(s.el);
      if (antes !== undefined && antes !== s.ficha && s.el.dataset.virada) {
        duracao = Number(s.el.dataset.virada) / 1000 || VIRADA;
        noLugar = true;
      }
      fichaAnterior.set(s.el, s.ficha);
    }
    const lista = todas.filter((s) => !s.vazia && !(estreita && s.soComputador));
    if (!lista.length) return null;
    const faces: number[] = [];
    const posicoes = lista.map((s) => {
      if (faces[faces.length - 1] !== s.ficha) faces.push(s.ficha);
      return faces.length - 1;
    });
    const H = window.innerHeight;
    const centro = H / 2;
    if (estreita) {
      // No celular, a ficha acompanha a sua seção, como uma imagem no fluxo:
      // o centro dela fica a 27% da altura da tela abaixo do topo da seção,
      // no espaço que a seção reserva em cima do texto (max-lg:pt-[50svh]).
      // Assim nunca passa por trás do próprio texto. Uma por vez: a ficha
      // fica com a sua seção enquanto ela está na tela, e só então passa à
      // mais perto do alto da tela — sai de cena rolando, nunca some no meio
      // dela (até 03/10, a troca era no meio do caminho entre as duas: subindo,
      // a ficha de baixo sumia ainda na tela). Sem nenhuma por perto, ela
      // some onde está, com a face e a altura da mais perto (até 03/10, sumia
      // no meio da tela, com a primeira face da página).
      // Desde 16/10 (o crítico de fora: no celular, quatro telas com a mesma
      // moldura, a ficha centrada no alto e o título embaixo), a seção pode
      // dar à ficha o seu lugar: uma caixa [data-lugar] dentro dela, onde a
      // ficha fica centrada, com o diâmetro da menor medida da caixa (a
      // placa, inscrita nela). A navalha fica embaixo do texto, grande e
      // cortada pela borda; a placa de A casa, entre o título e o texto; a do
      // Onde, na quina da tela.
      const pose = (s: Secao) => {
        const caixa = s.lugar;
        if (!caixa) return { x: W / 2, y: s.topo + 0.27 * H, raio: 0.14 * H, caixa: null };
        return { x: caixa.left + caixa.width / 2, y: caixa.top + caixa.height / 2, raio: Math.min(caixa.width, caixa.height) / 2, caixa };
      };
      // Na tela: a ficha inteira fora antes da troca, com a folga de antes (o raio era ~14% da altura, e a folga, 20%).
      const naTela = (s: Secao) => {
        const { y, raio } = pose(s);
        return y + raio > -0.06 * H && y - raio < 1.06 * H;
      };
      const perto = lista.filter((s) => {
        const { y, raio } = pose(s);
        return y + raio > -0.11 * H && y - raio < 1.11 * H;
      });
      const atual = lista.find((x) => x.el === secaoNoCelular);
      const candidatas = perto.length ? perto : lista;
      const s =
        atual && naTela(atual) ? atual : candidatas.reduce((m, x) => (Math.abs(pose(x).y - 0.3 * H) < Math.abs(pose(m).y - 0.3 * H) ? x : m));
      secaoNoCelular = s.el;
      const { x, y, caixa } = pose(s);
      // O tamanho da caixa, nas unidades do desenho (faixa, abaixo): a moeda pelo raio; a placa (2,16 × 1,4) inscrita.
      const px = H / 2 / 2.144;
      const tamanho = caixa && {
        moeda: Math.min(caixa.width, caixa.height) / 2 / (0.98 * 1.32 * px),
        placa: Math.min(caixa.width / 2 / 1.08, caixa.height / 2 / 0.7) / (1.32 * px),
      };
      return { faces, virada: posicoes[lista.indexOf(s)], lado: 0, xPx: x, tamanho, presente: perto.length > 0, alturaPx: y, imediata: true, duracao, noLugar };
    }
    // Uma seção sem ficha (data-palco-vazio) que já subiu a um quarto da tela e ainda cobre o meio: a ficha se apaga
    // onde está, antes de o painel passar por cima dela.
    const presente = !todas.some((s) => s.vazia && s.topo <= 0.75 * H && 2 * s.meio - s.topo >= centro);
    let i = -1;
    lista.forEach((s, j) => {
      if (s.meio <= centro) i = j;
    });
    const so = (j: number) => ({ faces, virada: posicoes[j], lado: lista[j].lado, xPx: null, tamanho: null, presente, alturaPx: null, imediata: false, duracao, noLugar });
    if (i < 0) return so(0);
    if (i === lista.length - 1) return so(i);
    const a = lista[i];
    const b = lista[i + 1];
    const t = (centro - a.meio) / Math.max(1, b.meio - a.meio);
    // A mesma ficha nas duas seções: não vira, só muda de lado.
    const virada = a.ficha === b.ficha ? 0 : passo(0.32, 0.68, t);
    return {
      faces,
      virada: posicoes[i] + (opcoes.reduzir ? Math.round(virada) : virada),
      lado: a.lado + (b.lado - a.lado) * passo(0.2, 0.8, t),
      xPx: null,
      tamanho: null,
      presente,
      alturaPx: null,
      imediata: false,
      duracao,
      noLugar,
    };
  };

  // A partir de 1024 px, a ficha de lado ocupa uma faixa medida em pixels:
  // a borda de dentro passa da coluna de texto (o texto mais largo das seções
  // com ficha chega a 71 px além do meio da tela; a borda fica a 95 px, 64 px
  // em 1024) e a de fora para a 40 px do fim da tela. A ficha encolhe só se
  // não couber na faixa — a placa, mais larga, à parte —, com 8% de folga
  // para a perspectiva do giro. Medido em 01/10: com o centro fixo a 46% da
  // meia largura e o tamanho fixo, a placa cobria até 58 px do texto.
  // Abaixo de 1024 px (celular e tablet), a ficha fica centrada e encolhe
  // para ~31% da largura (a placa, para ~40%); a altura dela acompanha a
  // seção (alvoDaRolagem): o texto de cada cena fica embaixo, como foto e
  // legenda (as seções descem o texto com max-lg:items-end). Antes, a ficha
  // tinha o diâmetro maior que a tela e ficava atrás do texto.
  const faixa = () => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const px = H / 2 / 2.144; // pixels por unidade do mundo
    if (W < LARGA) {
      const limite = 0.16 * H; // o raio não passa de 16% da altura
      return {
        centro: 0,
        moeda: Math.min(1, Math.min(0.31 * W, limite) / (0.98 * 1.32 * px)),
        placa: Math.min(1, Math.min(0.4 * W, limite * 1.25) / (1.08 * 1.32 * px)),
      };
    }
    const dentro = W / 2 + Math.min(95, 64 + (W - LARGA) * 0.12);
    const fora = W - 40;
    const meia = (fora - dentro) / 2 / 1.08;
    return {
      centro: ((dentro + fora) / 2 - W / 2) / px,
      moeda: Math.min(1, meia / (0.98 * 1.32 * px)),
      placa: Math.min(1, meia / (1.08 * 1.32 * px)),
    };
  };
  const ficha = (i: number) => opcoes.fichas[i] ?? opcoes.fichas[0];

  let compilado = false;
  const desenhar = (agora: number) => {
    quadro = 0;
    if (!vivo) return;
    if (!compilado) {
      // Enquanto a placa compila, o quadro espera (sem perguntar, quando a extensão existe).
      if (paralela && !gl.getProgramParameter(compilacao.programa, paralela.COMPLETION_STATUS_KHR)) {
        pedir();
        return;
      }
      if (!prepararPrograma()) {
        vivo = false;
        raiz.setAttribute("data-sem-3d", "");
        return;
      }
      compilado = true;
      prontoEm = agora;
      ultimo = agora;
    }
    const dt = emRepouso ? 1 / 60 : Math.min(0.1, (agora - ultimo) / 1000);
    emRepouso = false;
    ultimo = agora;
    const pausado = raiz.classList.contains("ambiente-pausado");
    const parado = opcoes.reduzir || pausado;
    if (!parado) tempo += dt;

    const alvo = alvoDaRolagem();
    let meta = 0;
    if (alvo) {
      if (!faces.length) {
        // O primeiro quadro: a ficha já nasce na posição da rolagem (a página pode abrir no meio).
        cena.virada = alvo.virada;
      } else if (!iguais(alvo.faces, faces)) {
        // Outra página (ou outra disposição, ao cruzar 1024 px), ou a mesma
        // seção com outra ficha (a prévia dos capítulos, o serviço escolhido):
        // a ficha em cena vira na da posição nova. Percebido aqui, no quadro, e
        // não no efeito da troca de rota: a página nova já está desenhada.
        const destino = faceEm(alvo.faces, alvo.virada);
        if (transicao && alvo.noLugar && !opcoes.reduzir) {
          // Já virando: na primeira metade, a moeda segue para a ficha nova; na
          // segunda, assenta, e o fim da virada encadeia a seguinte (abaixo).
          if (passo(0, 1, transicao.t) < 0.5) transicao.para = destino;
          transicao.dur = alvo.duracao;
        } else {
          transicao = mostrada >= 0 && destino !== mostrada && !opcoes.reduzir ? { de: mostrada, para: destino, t: 0, dur: alvo.duracao } : null;
          if (!transicao) cena.virada = alvo.virada;
        }
      }
      faces = alvo.faces;
      if (transicao) {
        transicao.t = Math.min(1, transicao.t + dt / transicao.dur);
        if (transicao.t >= 1) {
          // Fim da virada: se a face que ficou em cena é a da posição, a
          // sequência segue dela; se não (a rolagem a levou para longe, ou a
          // seção trocou de ficha de novo), vira de novo, no mesmo tempo.
          const destino = faceEm(faces, alvo.virada);
          if (transicao.para === destino) {
            cena.virada = posicaoDe(faces, destino, alvo.virada);
            transicao = null;
          } else transicao = { de: transicao.para, para: destino, t: 0, dur: transicao.dur };
        }
      } else if (alvo.imediata || opcoes.reduzir) {
        cena.virada = alvo.virada;
      } else if (Math.abs(alvo.virada - cena.virada) > 1.5) {
        // Um salto da rolagem (âncora, tecla End): uma virada só, direto na
        // face de destino, sem desfiar as do meio.
        const destino = faceEm(faces, alvo.virada);
        if (destino !== mostrada) transicao = { de: mostrada, para: destino, t: 0, dur: VIRADA };
        else cena.virada = posicaoDe(faces, destino, alvo.virada);
      } else {
        cena.virada = suave(cena.virada, alvo.virada, dt, 10);
      }
      // No celular, o centro vem do lugar da seção (xPx), sem suavizar, como a altura; na mesa, do lado, suavizado.
      const desloc = alvo.xPx == null ? alvo.lado * faixa().centro : ((alvo.xPx - window.innerWidth / 2) / window.innerHeight) * 2 * 2.144;
      cena.desloc = opcoes.reduzir || alvo.imediata ? desloc : suave(cena.desloc, desloc, dt, 4);
      tamanhoDaSecao = alvo.tamanho;
      // No celular, a altura vem da seção, sem suavizar: a ficha anda junto com o texto.
      cena.altura = alvo.alturaPx == null ? 0 : (0.5 - alvo.alturaPx / window.innerHeight) * 2 * 2.144;
      // Quando passa à seção seguinte, a ficha salta de lugar (sai por cima,
      // a nova está na metade de baixo): nasce de novo, com a passagem da
      // opacidade, em vez de aparecer de uma vez (corrigido em 03/10).
      const pose = alvo.alturaPx == null || alvo.xPx == null ? null : { x: alvo.xPx, y: alvo.alturaPx };
      if (pose && poseAnterior && (Math.abs(pose.y - poseAnterior.y) > 0.25 * window.innerHeight || Math.abs(pose.x - poseAnterior.x) > 0.25 * window.innerWidth) && !opcoes.reduzir)
        cena.visivel = 0;
      poseAnterior = pose;
      meta = alvo.presente ? 1 : 0;
      // Some em ~250 ms (rapidez 8; até a correção de 14/10, 4): no Agendar, a ficha passava ~400 ms atrás do vidro do painel.
      cena.visivel = opcoes.reduzir ? meta : suave(cena.visivel, meta, dt, alvo.presente ? 2.5 : 8);
    } else {
      // A página não tem ficha (Serviços, Equipe, Retorno): a ficha sai junto com a página antiga, em ~200 ms (correção
      // de 14/10: com rapidez 4, a moeda da capa ficava 600 ms sobre os espelhos da Equipe, como um fantasma).
      cena.visivel = opcoes.reduzir ? 0 : suave(cena.visivel, 0, dt, 12);
    }
    // Apagada de vez: o quadro seguinte já é o do repouso (abaixo).
    if (meta === 0 && cena.visivel < 0.005) cena.visivel = 0;

    if (!opcoes.reduzir) {
      ponteiro.x = suave(ponteiro.x, ponteiro.alvoX, dt, 3);
      ponteiro.y = suave(ponteiro.y, ponteiro.alvoY, dt, 3);
    }
    // O giro em torno do eixo vertical, em meias-voltas: a posição na
    // sequência (ou a virada da troca de página) mais os balanços — o olhar
    // do ponteiro, o giro da rolagem e o do tempo (parado na pausa). A face
    // em cena é a do arredondamento, e o ângulo desenhado fica entre -90° e
    // 90°: a face só troca de perfil. (Até 03/10, o progresso de cada seção
    // inclinava a ficha até 14°, e a inclinação saltava de uma seção à outra.)
    const balanco = (ponteiro.x * 0.32 + (opcoes.reduzir ? 0 : Math.sin(window.scrollY * 0.0011) * 0.35) + Math.sin(tempo * 0.45) * 0.22) / Math.PI;
    const sequencia = transicao ? [transicao.de, transicao.para] : faces;
    const posicao = (transicao ? passo(0, 1, transicao.t) : cena.virada) + balanco;
    const n = Math.min(Math.max(0, sequencia.length - 1), Math.max(0, Math.round(posicao)));
    const face = sequencia[n] ?? 0;
    const angulo = (posicao - n) * Math.PI;
    mostrada = face;

    // Com movimento reduzido, só se redesenha quando a cena muda. Desde 16/10 (o Impeccable: 61 quadros por segundo em
    // repouso, mesmo sem ficha à vista e com a pausa), o mesmo caminho vale sem ficha à vista (apagada, sem virada) e
    // com a pausa (html.ambiente-pausado), assim que a cena para de mudar: o quadro só vem de um evento (rolagem,
    // tamanho, troca de página, a ficha trocada no lugar, a pausa que sai) e o laço volta quando a ficha reaparece.
    const vazio = !transicao && meta === 0 && cena.visivel === 0;
    const assinatura = vazio
      ? `vazio,${canvas.width},${canvas.height}`
      : [face, angulo.toFixed(3), cena.desloc.toFixed(3), cena.altura.toFixed(3), cena.visivel.toFixed(2), canvas.width, canvas.height].join();
    const mudou = assinatura !== ultimaAssinatura;
    const repouso = opcoes.reduzir || vazio || (pausado && !mudou && !transicao);
    const precisa = !repouso || sujo || mudou;
    if (precisa && uni) {
      ultimaAssinatura = assinatura;
      sujo = false;
      const emCena = ficha(face);
      gl.uniform2f(uni.uRes, canvas.width, canvas.height);
      gl.uniform1f(uni.uTempo, tempo);
      gl.uniform2f(uni.uPonteiro, ponteiro.x, ponteiro.y);
      gl.uniform1f(uni.uForma, FORMAS[emCena.forma]);
      gl.uniform1f(uni.uMetal, METAIS[emCena.metal]);
      gl.uniform1f(uni.uCelula, face);
      gl.uniform1f(uni.uVirada, angulo);
      gl.uniform1f(uni.uDesloc, cena.desloc);
      gl.uniform1f(uni.uAltura, cena.altura);
      const { moeda, placa } = tamanhoDaSecao ?? faixa();
      gl.uniform1f(uni.uTamanho, moeda);
      gl.uniform1f(uni.uTamanhoPlaca, placa);
      gl.uniform1f(uni.uVisivel, cena.visivel);
      gl.uniform1f(uni.uPequena, window.innerWidth < LARGA ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!canvas.hasAttribute("data-pronto")) canvas.setAttribute("data-pronto", "");
      // O ajuste da resolução. O intervalo entre quadros mede também o
      // desenho na placa de vídeo; a meta são 60 quadros por segundo (16,7
      // ms: numa tela de 120 Hz, 60 quadros bastam, e a nitidez vale mais
      // que o dobro deles). A cada 45 quadros: se a média passa de 1,25 vez
      // a meta, a tela está perdendo quadros e a resolução cai 15%, até a
      // metade; se fica abaixo de 1,08 vez por quatro janelas seguidas, sobe
      // 10%, até a cheia. Depois de uma queda, a subida espera mais (~9 s),
      // para a resolução não ficar pulsando entre dois degraus. Nos primeiros
      // 3 s, nada muda: a página ainda está assentando e as faces, sendo
      // desenhadas. Até 03/10, o custo era o intervalo bruto contra 22 e 13
      // ms — numa tela de 60 Hz, nunca abaixo de 13 ms —, e a resolução só
      // podia cair.
      somaDosQuadros += dt * 1000;
      if (++quadros % 45 === 0 && !opcoes.reduzir) {
        const media = somaDosQuadros / 45;
        somaDosQuadros = 0;
        if (agora - prontoEm > 3000) {
          const antes = escala;
          const META = 1000 / 60;
          if (media > META * 1.25 && escala > 0.5) {
            escala = Math.max(0.5, escala * 0.85);
            folga = -8;
          } else if (media < META * 1.08 && escala < 1 && ++folga >= 4) {
            escala = Math.min(1, escala * 1.1);
            folga = 0;
          }
          if (escala !== antes) medir();
        }
      }
    }
    // Em repouso, o próximo quadro só vem de um evento.
    if (!repouso || transicao) pedir();
    else emRepouso = true;
  };

  function pedir() {
    if (!quadro && vivo && !document.hidden) quadro = requestAnimationFrame(desenhar);
  }

  // As faces, uma por vez, com o navegador ocioso: primeiro as da página aberta.
  (async () => {
    try {
      await document.fonts.load(`150px ${opcoes.familia}`);
    } catch {
      // Sem a fonte, as fichas saem com a serifa do aparelho.
    }
    const daPagina = new Set(secoes().map((s) => s.ficha));
    const ordem = opcoes.fichas
      .slice(0, COLUNAS * LINHAS)
      .map((_, i) => i)
      .sort((a, b) => Number(daPagina.has(b)) - Number(daPagina.has(a)));
    for (const i of ordem) {
      await ocioso();
      if (!vivo) return;
      const desenho = desenharCelula(opcoes.fichas[i], opcoes.familia, celula);
      gl.bindTexture(gl.TEXTURE_2D, textura);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, (i % COLUNAS) * celula, Math.floor(i / COLUNAS) * celula, gl.LUMINANCE, gl.UNSIGNED_BYTE, desenho);
      sujo = true;
      pedir();
    }
  })();

  const olharPara = (e: PointerEvent) => {
    ponteiro.alvoX = (e.clientX / window.innerWidth) * 2 - 1;
    ponteiro.alvoY = -((e.clientY / window.innerHeight) * 2 - 1);
  };
  // O arrastar do dedo não conta: o olhar ficaria preso onde o dedo se moveu antes de rolar. Com a ficha à vista e o
  // laço parado (a pausa), o ponteiro acorda o desenho: a pausa não bloqueia o olhar, que é resposta.
  const aoMover = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    olharPara(e);
    if (cena.visivel > 0) pedir();
  };
  // No toque, a ficha olha para o ponto tocado e, 400 ms depois, volta ao centro. O toque que vira rolagem dispara
  // pointercancel, e não pointerup: não conta. A pausa do ambiente não bloqueia o olhar, que é resposta.
  let voltaDoOlhar = 0;
  const aoTocar = (e: PointerEvent) => {
    if (e.pointerType !== "touch") return;
    olharPara(e);
    window.clearTimeout(voltaDoOlhar);
    voltaDoOlhar = window.setTimeout(() => {
      ponteiro.alvoX = 0;
      ponteiro.alvoY = 0;
    }, 400);
    pedir();
  };
  const aoRedimensionar = () => {
    medir();
    pedir();
  };
  const aoMudarVisibilidade = () => {
    ultimo = performance.now();
    pedir();
  };
  const aoPerder = (e: Event) => {
    e.preventDefault();
    vivo = false;
    raiz.setAttribute("data-sem-3d", "");
  };

  if (!opcoes.reduzir) {
    window.addEventListener("pointermove", aoMover, { passive: true });
    window.addEventListener("pointerup", aoTocar, { passive: true });
  }
  window.addEventListener("resize", aoRedimensionar, { passive: true });
  // Na captura (desde 16/10): o pedido de quadro do palco vem antes do da cena de rolagem (ilha CenaDeRolagem, que
  // escreve o --p das cenas), e o palco lê as caixas antes dessa escrita, sem forçar o leiaute de novo.
  window.addEventListener("scroll", pedir, { passive: true, capture: true });
  // A seção que troca de ficha no lugar acorda o desenho (em repouso, ele não roda sozinho); a pausa que sai, também.
  const trocaNoLugar = new MutationObserver(pedir);
  trocaNoLugar.observe(document.body, { attributes: true, attributeFilter: ["data-objeto"], subtree: true });
  trocaNoLugar.observe(raiz, { attributes: true, attributeFilter: ["class"] });
  document.addEventListener("visibilitychange", aoMudarVisibilidade);
  canvas.addEventListener("webglcontextlost", aoPerder);
  medir();
  pedir();

  return {
    trocarPagina() {
      // A ficha em cena vira na da página nova: o quadro percebe a sequência
      // nova de faces (desenhar). Aqui, só acorda o desenho — com movimento
      // reduzido, ele não roda sozinho.
      sujo = true;
      pedir();
    },
    destruir() {
      vivo = false;
      cancelAnimationFrame(quadro);
      window.removeEventListener("pointermove", aoMover);
      window.removeEventListener("pointerup", aoTocar);
      window.clearTimeout(voltaDoOlhar);
      window.removeEventListener("resize", aoRedimensionar);
      window.removeEventListener("scroll", pedir, { capture: true });
      trocaNoLugar.disconnect();
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
      canvas.removeEventListener("webglcontextlost", aoPerder);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}

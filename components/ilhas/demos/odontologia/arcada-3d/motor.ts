import { ALTURA, FAIXAS, LARGURA, contornoDoDente, dentes, sulcosDoDente, type RegiaoId } from "@/lib/demos/odontologia/dentes";

import { FRAGMENTO, VERTICE } from "./cena";

// O motor da ficha em cerâmica da Odontologia Boa Viagem: liga o desenho em WebGL (./cena.ts) à página. Baixado só
// depois da primeira pintura (a ilha ../arcada-3d.tsx), roda num canvas dentro da caixa da folha (a reserva, o mapa em
// traço) e:
// - desenha as camadas da textura num canvas 2D (os dentes e os sulcos, a numeração FDI e as legendas, as quatro
//   regiões), da mesma geometria do mapa (lib/demos/odontologia/dentes.ts), e manda os desfoques e o empacotamento a um
//   worker (./texturas.worker.ts): a linha principal fica livre (a barreira do travamento);
// - compila o desenho sem travar a página (KHR_parallel_shader_compile);
// - acende o refletor na entrada (600 ms, só na primeira abertura: recarregar não repete, .ja-aberto), que depois
//   segue o cursor (só com ponteiro fino) e inclina a placa de leve sob ele (o gesto do mapa, nichos/odontologia.md,
//   seção 6.6); o mesmo cursor leva o halo do refletor à página ([data-refletor], variáveis de CSS);
// - na cena da capa, lê os passos do percurso ([data-passo="<região>"]): o passo no meio da tela aproxima e inclina a
//   placa para a região dele e a pinta a lápis; no celular, onde os passos se empilham sob a placa presa, o de cima da
//   pilha; nas outras, a região vem da escolha (data-regiao na caixa);
// - o ambiente contínuo do Completo: com a página parada (quase um segundo sem rolar) e sem o cursor na luz, o refletor
//   passeia devagar sobre a placa, numa órbita, e o brilho úmido corre pelos dentes; a placa respira de leve. Pausa
//   pelo botão do cabeçalho (html.ambiente-pausado, observado aqui), para ao rolar e fora da tela, e não existe com
//   movimento reduzido;
// - só escuta a rolagem e o ponteiro com a placa na tela (IntersectionObserver), e só desenha quando algo muda (ou o
//   ambiente corre), até a cena assentar;
// - desenha até 2× a resolução do CSS e a baixa se a tela perde quadros;
// - com movimento reduzido: a placa parada na pose de repouso, o refletor já aceso e parado; só a pintura da região
//   muda, de um passo ao outro;
// - sem WebGL, ou se o desenho falha, marca a raiz com data-sem-ceramica, e a reserva fica;
// - não grava nada no aparelho.

export type Palco = { destruir: () => void; reancorar: () => void };
type Opcoes = {
  cena: "capa" | "folha";
  reduzir: boolean;
  familia: string;
  textos: { legendas: { superior: string; inferior: string }; cabeca: readonly [string, string] };
  /**
   * O palco ancorado (09.10.2026): o canvas fica preso à tela inteira, e a placa vai à caixa das âncoras da página
   * (este seletor, [data-arcada]), misturadas pela distância ao meio da tela e suavizadas no tempo; a pose de cada
   * âncora (data-inclina, data-lado, data-zoom) e a região (data-regiao) entram na da placa. Sem âncora perto, a placa
   * se apaga. Na troca de página, as âncoras são relidas (`reancorar`), e a placa viaja até as da página nova.
   */
  ancoras?: string;
  /** O que fica preso no alto da tela (o cabeçalho): a placa nunca entra embaixo dele. */
  teto?: string;
};
type Caixa = { left: number; top: number; width: number; height: number };

const ORDEM: readonly RegiaoId[] = ["frente-superior", "fundo-superior", "frente-inferior", "fundo-inferior"];
/**
 * O lado da textura da altura, sempre: a cúpula é um desfoque largo, de baixa frequência, e o meio-float não gera
 * mipmap (em 2048, minificada, cintilaria no brilho úmido). As texturas da cor (a matéria, a gravação, as regiões)
 * dobram para 2048 onde a placa passa de 800 px de tela (a mesa em tela de alta densidade): é o que dá nitidez à
 * borda dos dentes, aos sulcos, aos números gravados e ao traço do lápis (09.10.2026, pedido do usuário: "mais nítido").
 */
const TEX = 1024;
/** O mapa ocupa 86% do lado da placa; a placa tem 2,4 unidades. */
const FRACAO = 0.86;
const paraPlaca = (x: number, y: number) => [(x / LARGURA - 0.5) * 2.4 * FRACAO, -(y / ALTURA - 0.5) * 2.4 * FRACAO] as const;
/** A entrada do refletor: o token de entrada (09-movimento.md, seção 2). */
const ENTRADA = 600;
/**
 * A chegada da placa sobre a reserva (o mapa em traço, que sai em 160 ms pelo CSS): a placa acende de 100 a 400 ms do
 * primeiro quadro. Os dois desenhos não coincidem, e a passagem cruzada de 600 ms mostrava dois jogos de números e duas
 * legendas (o crítico de fora, 15.10.2026).
 */
const ESTREIA = [100, 400] as const;

/** Onde a placa olha em cada região: o centro dos dentes dela, a aproximação e a inclinação para trás. */
const FOCOS = Object.fromEntries(
  ORDEM.map((r) => {
    const ds = dentes.filter((d) => d.regiao === r);
    const [x, y] = paraPlaca(ds.reduce((s, d) => s + d.x, 0) / ds.length, ds.reduce((s, d) => s + d.y, 0) / ds.length);
    const frente = r.startsWith("frente");
    // O giro de lado: o fundo de cada arcada vira a placa para o lado dele (o direito no fundo de cima, o esquerdo no
    // de baixo); a frente fica de frente, e a de baixo se inclina para a luz.
    const lado = frente ? 0 : r.endsWith("superior") ? 0.42 : -0.42;
    const inclina = r === "frente-inferior" ? 0.12 : frente ? 0.32 : 0.42;
    return [r, { x, y, zoom: frente ? 1.32 : 1.12, inclina, lado }];
  }),
) as Record<RegiaoId, { x: number; y: number; zoom: number; inclina: number; lado: number }>;
const REPOUSO = { inclina: 0.58, lado: -0.16, luzX: -0.55, luzY: 0.75 };

/**
 * Até onde a placa vai na tela, acima e abaixo do meio da caixa, em alturas da caixa (positivo para cima): os oito cantos
 * da peça (com o relevo dos dentes), do espaço da placa ao do mundo (o inverso de local(), em ./cena.ts), projetados
 * pela câmera do desenho (em z = 7, o raio com 0,4 de abertura por unidade da caixa). A placa inclinada e aproximada
 * passa da caixa: é por isto que se sabe quanto.
 */
const alcanceDaPlaca = (giroX: number, giroY: number, zoom: number, focoX: number, focoY: number) => {
  let topo = -Infinity;
  let base = Infinity;
  for (const x of [-1.2, 1.2])
    for (const y of [-1.2, 1.2])
      for (const z of [-0.075, 0.16]) {
        const [vx, vy] = [x - focoX, y - focoY];
        const z1 = -Math.sin(giroY) * vx + Math.cos(giroY) * z;
        const y2 = Math.cos(giroX) * vy + Math.sin(giroX) * z1;
        const z2 = -Math.sin(giroX) * vy + Math.cos(giroX) * z1;
        const q = (zoom * y2) / (0.4 * (7 - zoom * z2));
        topo = Math.max(topo, q);
        base = Math.min(base, q);
      }
  return { topo, base };
};

const passo = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const suave = (atual: number, alvo: number, dt: number, rapidez: number) => atual + (alvo - atual) * (1 - Math.exp(-dt * rapidez));

// ---------- as camadas da textura (o desenho; o peso vai ao worker) ----------

const ocioso = () =>
  new Promise<void>((resolver) => {
    if (typeof requestIdleCallback === "function") requestIdleCallback(() => resolver(), { timeout: 300 });
    else setTimeout(resolver, 16);
  });

/** Uma camada em tons de cinza, no espaço do mapa, com `lado` pixels; devolve o RGBA (o worker lê o vermelho). */
function camada(lado: number, desenhar: (c: CanvasRenderingContext2D) => void) {
  const tela = document.createElement("canvas");
  tela.width = tela.height = lado;
  const c = tela.getContext("2d", { willReadFrequently: true })!;
  c.fillStyle = "#000";
  c.fillRect(0, 0, lado, lado);
  const escala = (FRACAO * lado) / LARGURA;
  const margem = ((1 - FRACAO) / 2) * lado;
  c.setTransform(escala, 0, 0, escala, margem, margem);
  desenhar(c);
  return new Uint8Array(c.getImageData(0, 0, lado, lado).data.buffer);
}

type Texturas = { relevo: Uint8Array; regioes: Uint8Array; altura8: Uint8Array; altura16: Uint16Array };

async function desenharTexturas(familia: string, textos: Opcoes["textos"], lado: number): Promise<Texturas> {
  const dente = (c: CanvasRenderingContext2D, d: (typeof dentes)[number], fazer: () => void) => {
    c.save();
    c.translate(d.x, d.y);
    c.rotate((d.giro * Math.PI) / 180);
    fazer();
    c.restore();
  };
  await ocioso();
  const mascara = camada(lado, (c) => {
    c.fillStyle = "#fff";
    c.strokeStyle = "#000";
    c.lineCap = "round";
    for (const d of dentes) {
      dente(c, d, () => {
        c.fill(new Path2D(contornoDoDente(d)));
        const s = sulcosDoDente(d);
        if (s) {
          c.lineWidth = 1.5;
          c.stroke(new Path2D(s));
        }
      });
    }
  });
  try {
    await Promise.all([document.fonts.load(`600 12px ${familia}`), document.fonts.load(`700 12px ${familia}`)]);
  } catch {
    // Sem a fonte, a gravação sai na do aparelho.
  }
  await ocioso();
  // Em 2048, o desfoque da gravação é a metade, e o traço afinaria: os números sobem para o peso 700.
  const peso = lado > TEX ? 700 : 600;
  const gravura = camada(lado, (c) => {
    c.fillStyle = "#fff";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.font = `${peso} 11.5px ${familia}`;
    for (const d of dentes) c.fillText(String(d.fdi), d.numero.x, d.numero.y);
    c.font = `500 10.5px ${familia}`;
    c.fillText(textos.legendas.superior, LARGURA / 2, ALTURA * 0.37);
    c.fillText(textos.legendas.inferior, LARGURA / 2, ALTURA * 0.65);
    // O cabeçalho da ficha, gravado na borda de cima da placa.
    c.font = `600 10.5px ${familia}`;
    c.textAlign = "left";
    c.fillText(textos.cabeca[0], -8, -15);
    c.textAlign = "right";
    c.fillText(textos.cabeca[1], LARGURA + 8, -15);
  });
  const regioes: Uint8Array[] = [];
  for (const r of ORDEM) {
    await ocioso();
    regioes.push(
      camada(lado, (c) => {
        const caminho = new Path2D(FAIXAS[r]);
        c.fillStyle = "#808080";
        c.fill(caminho);
        c.strokeStyle = "#fff";
        c.lineWidth = 3;
        c.lineJoin = "round";
        c.stroke(caminho);
      }),
    );
  }
  const trabalhador = new Worker(new URL("./texturas.worker.ts", import.meta.url));
  try {
    return await new Promise<Texturas>((resolver, rejeitar) => {
      trabalhador.onmessage = (e: MessageEvent<Texturas>) => resolver(e.data);
      trabalhador.onerror = (e) => rejeitar(e);
      trabalhador.postMessage({ lado, ladoDaAltura: TEX, mascara, gravura, regioes }, [mascara.buffer, gravura.buffer, ...regioes.map((x) => x.buffer)]);
    });
  } finally {
    trabalhador.terminate();
  }
}

// ---------- o motor ----------

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

export function iniciarPalco(canvas: HTMLCanvasElement, opcoes: Opcoes): Palco | null {
  const atributos: WebGLContextAttributes = { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: "high-performance" };
  const gl = (canvas.getContext("webgl2", atributos) ?? canvas.getContext("webgl", atributos)) as WebGLRenderingContext | null;
  if (!gl) return null;
  const paralela = gl.getExtension("KHR_parallel_shader_compile") as { COMPLETION_STATUS_KHR: number } | null;
  const compilacao = iniciarCompilacao(gl);
  if (!compilacao) return null;
  const raiz = document.documentElement;
  const caixa = canvas.parentElement!;
  const ancorado = Boolean(opcoes.ancoras);
  let ancoras: HTMLElement[] = [];
  /** A âncora de maior peso: a região e a pose vêm dela. */
  let principal: HTMLElement | null = null;
  /**
   * O peso de cada âncora, alisado no tempo; a caixa é a média das caixas de agora (lidas a cada quadro): a placa
   * acompanha a rolagem sem atraso, também nas âncoras presas, e só a troca de uma âncora pela outra é suavizada.
   */
  const pesosDasAncoras = new Map<HTMLElement, number>();
  let pesosProntos = false;
  /** A viagem da troca de página: a placa sai da última caixa desenhada e vai à da página nova. */
  let viagem: { de: Caixa; desde: number } | null = null;
  const VIAGEM = 760;
  let ultimaCaixa: Caixa | null = null;
  const caixaAtual: Caixa = { left: 0, top: 0, width: 0, height: 0 };
  /** A faixa da tela ocupada pelas cenas das âncoras acesas: a placa que sai não passa por cima da cena vizinha. */
  const faixaDasCenas = { topo: -Infinity, base: Infinity };
  let visibilidade = ancorado ? 0 : 1;
  const caixaRect = (): Caixa => (ancorado ? caixaAtual : caixa.getBoundingClientRect());
  const dados = () => (ancorado ? (principal?.dataset ?? {}) : caixa.dataset) as DOMStringMap;
  /** A área útil da tela: abaixo do teto (o cabeçalho), com folga nas bordas. */
  const areaUtil = () => {
    const folga = Math.max(12, window.innerWidth * 0.012);
    const teto = opcoes.teto ? (document.querySelector(opcoes.teto)?.getBoundingClientRect().bottom ?? 0) : 0;
    return { top: teto + folga, left: folga, right: window.innerWidth - folga, bottom: window.innerHeight - folga };
  };
  /**
   * O peso de uma âncora: quanto dela está à vista na área útil (de 20 a 65%, em curva). A âncora que sai da tela
   * apaga a placa aos poucos, em vez de levá-la para fora; duas âncoras à vista dividem a placa, que fica entre elas.
   * A âncora fixa (o mapa da escolha, com as áreas de toque por cima) acende inteira assim que aparece: meio à vista,
   * ela não pode ficar desbotada nem sair do lugar. A sozinha na tela (a placa que sai para uma cena sem placa, como a
   * da chamada para o pé, sem outra âncora com que dividir a placa) fica inteira ou sai: inteira com 60% da âncora à
   * vista; abaixo disso, apaga no tempo (a suavização dos pesos, ~300 ms), e não na rolagem. A meia-transparência que
   * ficava parada sobre o vermelho, com o pé à vista, lia como fantasma (o crítico de fora, 14.10.2026). No celular,
   * toda âncora é sozinha (a placa não viaja entre elas): a meia placa parada sob a pasta era o mesmo fantasma (o
   * crítico de fora, 15.10.2026).
   */
  const pesoAlvo = (r: DOMRect, area: ReturnType<typeof areaUtil>, fixa: boolean, sozinha = false) => {
    if (!r.width || !r.height) return 0;
    const vista = Math.max(0, Math.min(r.bottom, area.bottom) - Math.max(r.top, area.top));
    const parte = vista / Math.max(1, Math.min(r.height, area.bottom - area.top));
    if (fixa) return passo(0, 0.08, parte);
    return sozinha ? (parte >= 0.6 ? 1 : 0) : passo(0.2, 0.65, parte);
  };
  /**
   * A caixa inteira na área útil: menor, se não cabe; levada para dentro, se passa da borda. Abaixo de 1024 px (o passe
   * do celular), só de lado: lá, a âncora fica na coluna do texto, e a placa levada para dentro da tela descia sobre o
   * texto de baixo ao rolar (o "Todas as regiões da boca" dos tratamentos, o lugar e a ação da capa); a placa rola com a
   * âncora e se apaga ao sair (o peso, abaixo), sob a pasta. Na mesa, a âncora sozinha que sai por cima também rola:
   * presa, a placa parava sob a pasta, e a legenda de baixo a atravessava (o crítico de fora, 15.10.2026).
   */
  const presaNaArea = (c: Caixa, area: ReturnType<typeof areaUtil>, vertical = window.innerWidth >= 1024): Caixa => {
    const k = Math.min(1, vertical ? (area.bottom - area.top) / c.height : 1, (area.right - area.left) / c.width);
    const width = c.width * k;
    const height = c.height * k;
    const cx = c.left + c.width / 2;
    const cy = c.top + c.height / 2;
    const left = Math.min(Math.max(cx - width / 2, area.left), area.right - width);
    const top = vertical ? Math.min(Math.max(cy - height / 2, area.top), area.bottom - height) : cy - height / 2;
    return { left, top, width, height };
  };
  const refletor = (ancorado ? document.querySelector<HTMLElement>("[data-refletor]") : caixa.closest<HTMLElement>("[data-refletor]")) ?? null;
  const gl2 = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext ? gl : null;

  const nomes = ["uRes", "uCaixa", "uGiro", "uFoco", "uZoom", "uRegiao", "uLuz", "uAcesa", "uVisivel", "uSombra", "uRelevo", "uRegioes", "uAltura"];
  let uni: Record<string, WebGLUniformLocation | null> | null = null;
  const texturas = [gl.createTexture(), gl.createTexture(), gl.createTexture()];
  let comTextura = false;
  const dprInicial = Math.min(window.devicePixelRatio || 1, 2);
  const ladoDaCor = window.matchMedia("(min-width: 1024px)").matches && canvas.getBoundingClientRect().width * dprInicial > 800 ? 2 * TEX : TEX;
  // A filtragem anisotrópica: a placa inclinada não borra a textura na direção da inclinação.
  const anisotropia = gl.getExtension("EXT_texture_filter_anisotropic") as { TEXTURE_MAX_ANISOTROPY_EXT: number; MAX_TEXTURE_MAX_ANISOTROPY_EXT: number } | null;

  const prepararPrograma = () => {
    const { programa: p, v, f } = compilacao;
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      console.warn("ficha em cerâmica:", gl.getShaderInfoLog(v) || gl.getShaderInfoLog(f) || gl.getProgramInfoLog(p));
      return false;
    }
    gl.useProgram(p);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(p, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    uni = Object.fromEntries(nomes.map((n) => [n, gl.getUniformLocation(p, n)]));
    gl.uniform1i(uni.uRelevo, 0);
    gl.uniform1i(uni.uRegioes, 1);
    gl.uniform1i(uni.uAltura, 2);
    return true;
  };

  let vivo = true;
  let naTela = false;
  let compilado = false;
  let quadro = 0;
  let ultimo = performance.now();
  let acesaDesde = 0;
  let escala = 1;
  let quadros = 0;
  let somaDosQuadros = 0;
  let folga = 0;
  /** A escala nova: aplicada no começo do quadro seguinte, antes de desenhar. */
  let remedir = false;
  // A entrada só na primeira abertura; recarregar ou voltar pelo histórico chega aceso.
  const semEntrada = opcoes.reduzir || raiz.classList.contains("ja-aberto");
  const fino = window.matchMedia("(pointer: fine)").matches && !opcoes.reduzir;
  /** O ponteiro grosso (o toque: o celular, o tablet), com ou sem movimento reduzido; o mesmo critério do CSS. */
  const grosso = window.matchMedia("(pointer: coarse)").matches;
  /** O canvas que rola com a página (data-rola): quanto ele foi levado, em px. */
  let deslocamento = 0;
  const ponteiro = { x: REPOUSO.luzX, y: REPOUSO.luzY, alvoX: REPOUSO.luzX, alvoY: REPOUSO.luzY, ativo: false };
  const cena = { focoX: 0, focoY: 0, zoom: 1, inclina: REPOUSO.inclina, lado: REPOUSO.lado, regiao: [0, 0, 0, 0] };
  let primeiro = true;
  /** O giro do último quadro desenhado: dele sai até onde a placa vai na tela (alcanceDaPlaca). */
  const giro = { x: REPOUSO.inclina, y: REPOUSO.lado };
  /** Quanto da placa a faixa das cenas comporta, de 0 a 1 (a placa sai antes da tesoura). */
  let cabe = 1;
  /** O topo em que os passos do percurso ficam presos, empilhados (o celular); null onde eles correm soltos. */
  let pilha: number | null = null;
  /** No toque, o halo espera a caixa da placa existir para acender sobre ela. */
  let acenderPendente = false;
  /** O elemento preso (sticky) que leva cada âncora, e o topo em que ele para; null se nenhum. */
  const presas = new Map<HTMLElement, { el: HTMLElement; topo: number } | null>();
  const lerPilha = () => {
    const el = document.querySelector<HTMLElement>("[data-passo]");
    const estilo = el ? getComputedStyle(el) : null;
    pilha = estilo?.position === "sticky" ? parseFloat(estilo.top) : null;
    presas.clear();
  };
  /** A âncora parada agora, dentro de um elemento preso que chegou ao topo dele (a faixa da placa do percurso). */
  const parada = (a: HTMLElement) => {
    if (!presas.has(a)) {
      let el: HTMLElement | null = a;
      while (el && el !== caixa && getComputedStyle(el).position !== "sticky") el = el.parentElement;
      presas.set(a, el && el !== caixa ? { el, topo: parseFloat(getComputedStyle(el).top) } : null);
    }
    const p = presas.get(a);
    return p ? Math.abs(p.el.getBoundingClientRect().top - p.topo) < 1 : false;
  };
  /** O relógio do ambiente: só anda com a página parada, sem pausa e sem movimento reduzido. */
  let tempoAmbiente = 0;
  let ultimaRolagem = 0;

  const medir = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2) * escala;
    const r = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width * dpr));
    const h = Math.max(1, Math.round(r.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  };

  /**
   * O peso de cada região: pela escolha (data-regiao na caixa: uma ou mais, separadas por espaço; com mais de uma, a
   * placa pinta todas e não se aproxima de nenhuma) ou pelos passos do percurso no meio da tela.
   */
  const pesos = () => {
    const escolhidas = (dados().regiao ?? "").split(" ").filter((r): r is RegiaoId => ORDEM.includes(r as RegiaoId));
    if (escolhidas.length) return ORDEM.map((r) => (escolhidas.includes(r) ? 1 / (escolhidas.length > 1 ? escolhidas.length * 10 : 1) : 0));
    if (opcoes.cena !== "capa") return [0, 0, 0, 0];
    const H = window.innerHeight;
    const linha = window.innerWidth >= 1024 ? 0.5 * H : 0.72 * H;
    const els = ORDEM.map((r) => document.querySelector<HTMLElement>(`[data-passo="${r}"]`));
    // No celular, os passos se empilham, presos sob a faixa da placa (odontologia.css, o passe do celular): o de agora
    // é o último que chegou à faixa, até o seguinte o cobrir; quando a pilha inteira sobe, a região se apaga.
    const presos = pilha;
    const p =
      presos === null
        ? els.map((el) => {
            if (!el) return 0;
            const b = el.getBoundingClientRect();
            return 1 - passo(0.22 * H, 0.48 * H, Math.abs((b.top + b.bottom) / 2 - linha));
          })
        : (() => {
            const topos = els.map((el) => (el ? el.getBoundingClientRect().top - presos : Infinity));
            const chegou = topos.map((d) => 1 - passo(0.12 * H, 0.42 * H, d));
            return chegou.map((c, i) => c * (1 - (chegou[i + 1] ?? 0)) * (1 - passo(0, 0.3 * H, -topos[i])));
          })();
    // Com movimento reduzido, uma região por vez: a do passo mais perto do meio, se ele está perto.
    if (opcoes.reduzir) {
      const maior = Math.max(...p);
      return p.map((x) => (x === maior && x > 0.5 ? 1 : 0));
    }
    const soma = p.reduce((a, b) => a + b, 0);
    return soma > 1 ? p.map((x) => x / soma) : p;
  };

  const desenhar = (agora: number) => {
    quadro = 0;
    if (!vivo || !naTela) return;
    if (!compilado) {
      if (!comTextura) return;
      if (paralela && !gl.getProgramParameter(compilacao.programa, paralela.COMPLETION_STATUS_KHR)) {
        pedir();
        return;
      }
      if (!prepararPrograma()) {
        vivo = false;
        raiz.setAttribute("data-sem-ceramica", "");
        return;
      }
      compilado = true;
      acesaDesde = agora;
      ultimo = agora;
      acenderNaFicha();
    }
    const dt = Math.min(0.1, (agora - ultimo) / 1000);
    ultimo = agora;
    let mexe = false;

    // O palco ancorado: os pesos das âncoras andam para os de agora; a caixa é a média das caixas de agora; na troca de
    // página, a placa viaja da última caixa até a nova; a visibilidade é a soma dos pesos.
    if (ancorado) {
      let soma = 0;
      let maior = 0;
      let segundo = 0;
      let caixaDoPrincipal: Caixa | null = null;
      const acc = { left: 0, top: 0, width: 0, height: 0 };
      const area = areaUtil();
      faixaDasCenas.topo = Infinity;
      faixaDasCenas.base = -Infinity;
      const brutas = ancoras.map((a) => a.getBoundingClientRect());
      // A âncora sozinha na área útil fica inteira ou sai (pesoAlvo); no celular, toda âncora.
      const naMesa = window.innerWidth >= 1024;
      const sozinha = !naMesa || brutas.filter((r) => r.bottom > area.top && r.top < area.bottom).length === 1;
      let subindo = false;
      for (const [i, a] of ancoras.entries()) {
        const bruta = brutas[i];
        const fixa = a.dataset.fixa !== undefined;
        // Na mesa, a sozinha que começa a passar sob a pasta, sem outra âncora logo abaixo para onde viajar (a da página de
        // cada tratamento, a da ficha, a da chamada), sai rolando com a cena (presaNaArea), em vez de ficar presa. A da
        // capa espera a do percurso, e a presa do percurso fica abaixo do teto até se soltar.
        const seguinte = brutas[i + 1];
        const sai = naMesa && sozinha && !fixa && bruta.top < area.top && (!seguinte || seguinte.top > area.bottom + window.innerHeight);
        const alvo = sai ? 0 : pesoAlvo(bruta, area, fixa, sozinha);
        // A fixa fica onde está (a tesoura corta o que passa da tela); as outras, inteiras na área útil.
        const r = fixa ? bruta : presaNaArea(bruta, area, naMesa && !sai);
        const antes = pesosDasAncoras.get(a) ?? 0;
        const w = !pesosProntos || opcoes.reduzir ? alvo : suave(antes, alvo, dt, 7);
        if (Math.abs(w - alvo) > 1e-3) mexe = true;
        pesosDasAncoras.set(a, w);
        if (w <= 0.001) continue;
        const daCena = (a.closest("section") ?? a).getBoundingClientRect();
        faixaDasCenas.topo = Math.min(faixaDasCenas.topo, daCena.top);
        faixaDasCenas.base = Math.max(faixaDasCenas.base, daCena.bottom);
        soma += w;
        acc.left += r.left * w;
        acc.top += r.top * w;
        acc.width += r.width * w;
        acc.height += r.height * w;
        if (w > maior) {
          segundo = maior;
          maior = w;
          principal = a;
          caixaDoPrincipal = r;
          subindo = sai;
        } else if (w > segundo) segundo = w;
      }
      pesosProntos = true;
      // No celular, as âncoras ficam na coluna do texto: a placa não viaja de uma à outra pelo meio (passaria sobre o
      // texto entre elas); apaga-se numa e acende na outra, e some no instante da troca (o passe do celular).
      const naColuna = window.innerWidth < 1024;
      if (soma > 0) {
        for (const k of ["left", "top", "width", "height"] as const) caixaAtual[k] = naColuna && caixaDoPrincipal ? caixaDoPrincipal[k] : acc[k] / soma;
        if (viagem) {
          const k = Math.min(1, (agora - viagem.desde) / VIAGEM);
          const e = 1 - (1 - k) ** 3;
          for (const c of ["left", "top", "width", "height"] as const) caixaAtual[c] = viagem.de[c] + (caixaAtual[c] - viagem.de[c]) * e;
          if (k >= 1) viagem = null;
          else mexe = true;
        }
        const alcance = alcanceDaPlaca(giro.x, giro.y, cena.zoom, cena.focoX, cena.focoY);
        // Na mesa, a placa nunca entra embaixo da pasta (09.10.2026): a caixa presa na área útil não basta, porque a placa
        // girada e aproximada passa dela (no quarto passo do percurso, o canto de cima subia sob a pasta); a caixa desce o
        // quanto a placa passaria do teto. No celular, a placa rola com a âncora e passa sob a pasta ao sair; a âncora fixa
        // (com as áreas de toque do mapa por cima) não sai do lugar.
        const sobra = area.top - (caixaAtual.top + caixaAtual.height * (0.5 - alcance.topo));
        if (!naColuna && !subindo && sobra > 0 && principal?.dataset.fixa === undefined) caixaAtual.top += sobra;
        ultimaCaixa = { ...caixaAtual };
        // A placa que passaria da faixa das cenas acesas (a tesoura a cortaria a seco) se apaga antes do corte: no fim
        // da inicial, ela ficava fantasma e cortada reto na borda de baixo da chamada (o crítico de fora, 14.10.2026). Só
        // na mesa, onde a caixa fica presa na área útil; no celular, a placa rola dentro da cena dela.
        const corte = Math.max(
          caixaAtual.top + caixaAtual.height * (0.5 - alcance.base) - faixaDasCenas.base,
          faixaDasCenas.topo - (caixaAtual.top + caixaAtual.height * (0.5 - alcance.topo)),
        );
        cabe = naColuna ? 1 : 1 - passo(-48, 0, corte);
        if (acenderPendente) {
          acenderPendente = false;
          acenderNaFicha();
        }
      }
      visibilidade = (naColuna ? Math.max(0, Math.min(1, maior) - segundo) : Math.min(1, soma)) * cabe;
    }

    // O alvo: a região (a pintura) e, sem movimento reduzido, o foco, a aproximação e a inclinação dela.
    const w = pesos();
    const soma = Math.min(1, w.reduce((a, b) => a + b, 0));
    const pose = dados();
    const alvo = { focoX: 0, focoY: 0, zoom: 1 + Number(pose.zoom ?? 0), inclina: REPOUSO.inclina + Number(pose.inclina ?? 0), lado: REPOUSO.lado + Number(pose.lado ?? 0) };
    // A âncora fixa (data-fixa: a escolha da região, com as áreas de toque do mapa por cima) só pinta: não aproxima.
    if (!opcoes.reduzir && pose.fixa === undefined) {
      // No celular, o curso é mais curto: a placa se aproxima menos (a faixa do palco é estreita, e a placa aproximada
      // não pode passar sob a pasta nem sob os passos empilhados; o passe do celular, 14.10.2026).
      const curso = window.innerWidth < 1024 ? 0.3 : ancorado ? 0.5 : 1;
      ORDEM.forEach((r, i) => {
        const f = FOCOS[r];
        alvo.focoX += w[i] * f.x * curso;
        alvo.focoY += w[i] * f.y * curso;
        alvo.zoom += w[i] * (f.zoom - 1) * curso;
        alvo.inclina += w[i] * (f.inclina - REPOUSO.inclina);
        alvo.lado += w[i] * f.lado * (ancorado ? 1 : 0);
      });
    }
    for (const k of ["focoX", "focoY", "zoom", "inclina", "lado"] as const) {
      const novo = primeiro || opcoes.reduzir ? alvo[k] : suave(cena[k], alvo[k], dt, 7);
      if (Math.abs(novo - alvo[k]) > 1e-4) mexe = true;
      cena[k] = novo;
    }
    // A pintura: cada região com peso vai inteira (com várias escolhidas, o peso do foco é que se divide).
    const tinta = w.map((x) => (x > 0 && !(dados().regiao ?? "").includes(" ") ? x : x > 0 ? 1 : 0));
    cena.regiao = cena.regiao.map((v, i) => {
      const novo = primeiro || opcoes.reduzir ? tinta[i] : suave(v, tinta[i], dt, 9);
      if (Math.abs(novo - tinta[i]) > 1e-3) mexe = true;
      return novo;
    });
    primeiro = false;

    // O refletor: acende na entrada (com a curva de saída); com o ponteiro fino, vai aonde o cursor está.
    const t = semEntrada ? 1 : Math.min(1, (agora - acesaDesde) / ENTRADA);
    const acesa = 1 - Math.pow(1 - t, 3);
    const estreia = opcoes.reduzir ? 1 : passo(ESTREIA[0], ESTREIA[1], agora - acesaDesde);
    if (estreia < 1) mexe = true;
    if (t < 1) mexe = true;
    // O ambiente: o refletor passeia numa órbita lenta (umas 19 s por volta) quando ninguém o leva.
    const ambienteVivo = !opcoes.reduzir && !raiz.classList.contains("ambiente-pausado") && agora - ultimaRolagem > 900 && t >= 1;
    if (ambienteVivo) {
      tempoAmbiente += dt;
      mexe = true;
    }
    const alvoX = ponteiro.ativo ? ponteiro.alvoX : REPOUSO.luzX + (opcoes.reduzir ? 0 : 0.95 * Math.sin(tempoAmbiente * 0.33) + 0.55);
    const alvoY = ponteiro.ativo ? ponteiro.alvoY : REPOUSO.luzY + (opcoes.reduzir ? 0 : 0.32 * Math.cos(tempoAmbiente * 0.26) - 0.3);
    const rapidezDaLuz = ponteiro.ativo ? (fino ? 5 : 9) : 2.2;
    ponteiro.x = suave(ponteiro.x, alvoX, dt, rapidezDaLuz);
    ponteiro.y = suave(ponteiro.y, alvoY, dt, rapidezDaLuz);
    if (Math.abs(ponteiro.x - alvoX) + Math.abs(ponteiro.y - alvoY) > 1e-3) mexe = true;
    // A placa respira: menos de 2° de giro, de leve (o relógio do ambiente, parado na pausa).
    const respiraLado = opcoes.reduzir ? 0 : Math.sin(tempoAmbiente * 0.24) * 0.035;
    const respiraInclina = opcoes.reduzir ? 0 : Math.sin(tempoAmbiente * 0.31) * 0.016;

    if (uni) {
      // Desde 18/10, nunca no meio da rolagem: a escala sobe com os quadros leves da rolagem, e a realocação pesava no
      // quadro dela (medido na M2, a CPU 4× e 800 px/s: 2 realocações em cada passada da página, de 686 × 1485 a
      // 780 × 1688).
      if (remedir && agora - ultimaRolagem > 200) {
        remedir = false;
        medir();
      }
      let r = canvas.getBoundingClientRect();
      const b = caixaRect();
      // Desde 18/10, no celular, o canvas rola com a página (data-rola: absoluto, levado para o meio da placa a cada
      // quadro), e só fica preso à tela com a âncora parada num elemento preso (a faixa do percurso). Preso à tela e
      // redesenhado pela linha principal, ele chegava um quadro depois da âncora, que o compositor rola sozinho: a placa
      // escorregava sobre a cena e voltava ao parar (medido na emulação, com a placa de vídeo M2: 13 px a 800 px/s e 40 a
      // 42 px a 2400 px/s, um quadro inteiro de rolagem). Rolando junto, o compositor leva a placa com a cena: de 0 a 1 px
      // nas mesmas medidas, também com o quadro atrasado. O tamanho é o mesmo nos dois modos: nada se realoca na troca.
      if (ancorado && grosso) {
        const rola = window.innerWidth < 1024 && principal !== null && !parada(principal);
        if (rola !== canvas.hasAttribute("data-rola")) {
          canvas.toggleAttribute("data-rola", rola);
          canvas.style.translate = "";
          deslocamento = 0;
          r = canvas.getBoundingClientRect();
        }
        // Centrado na placa (a mesma folga para os dois lados da rolagem), sem passar do fim do consultório: passando, o
        // canvas aumentaria a página que ele segue.
        const d = rola ? Math.round(Math.min(b.top + b.height / 2 - r.height / 2, caixa.getBoundingClientRect().bottom - r.height) - r.top) : 0;
        if (d) {
          deslocamento += d;
          canvas.style.translate = `0 ${deslocamento}px`;
          r = new DOMRect(r.x, r.y + d, r.width, r.height);
        }
      }
      const k = canvas.width / Math.max(1, r.width);
      gl.uniform2f(uni.uRes, canvas.width, canvas.height);
      gl.uniform4f(uni.uCaixa, (b.left - r.left) * k, (r.bottom - (b.top + b.height)) * k, b.width * k, b.height * k);
      const sob = fino && ponteiro.ativo;
      giro.x = cena.inclina + respiraInclina + (sob ? -ponteiro.y * 0.05 : 0);
      giro.y = cena.lado * (ancorado ? 1 : 1 - soma) + respiraLado + (sob ? ponteiro.x * 0.07 : 0);
      gl.uniform2f(uni.uGiro, giro.x, giro.y);
      gl.uniform2f(uni.uFoco, cena.focoX, cena.focoY);
      gl.uniform1f(uni.uZoom, cena.zoom);
      gl.uniform4f(uni.uRegiao, cena.regiao[0], cena.regiao[1], cena.regiao[2], cena.regiao[3]);
      gl.uniform2f(uni.uLuz, ponteiro.x, ponteiro.y);
      gl.uniform1f(uni.uAcesa, acesa);
      gl.uniform1f(uni.uVisivel, visibilidade * estreia);
      gl.uniform1f(uni.uSombra, window.innerWidth >= 1024 ? 1 : 0);
      gl.disable(gl.SCISSOR_TEST);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      // Só o retângulo da placa, com a folga da aproximação e da sombra, dentro das cenas das âncoras acesas: o resto da
      // tela não roda o desenho, e a placa que sai não cobre a cena vizinha nem o pé.
      if (ancorado) {
        const folgaX = b.width * (0.18 + 0.5 * (cena.zoom - 1)) + 0.4 * b.height;
        const folgaY = b.height * (0.18 + 0.62 * (cena.zoom - 1)) + 0.12 * b.height;
        // No canvas que rola (maior que a parte da placa à vista), a placa fora da tela fica de fora, como no preso, menos
        // uma faixa de 15% da altura da tela embaixo: o que a rolagem para baixo revela antes do quadro seguinte (100 px a
        // 6000 px/s). Em cima, o que ela revela fica sob a pasta. Medido na M2, na passada da página: a tesoura mediana com
        // 7% mais pixels que no canvas preso (0,58 contra 0,54 milhão a 800 px/s); com a placa inteira, 9%.
        const rola = canvas.hasAttribute("data-rola");
        const baixo = Math.min(b.top + b.height + folgaY, faixaDasCenas.base, rola ? 1.15 * window.innerHeight : Infinity);
        const alto = Math.max(b.top - folgaY, faixaDasCenas.topo, rola ? 0 : -Infinity);
        const x0 = Math.max(0, Math.floor((b.left - r.left - folgaX) * k));
        const y0 = Math.max(0, Math.floor((r.bottom - baixo) * k));
        const x1 = Math.min(canvas.width, Math.ceil((b.left - r.left + b.width + folgaX) * k));
        const y1 = Math.min(canvas.height, Math.ceil((r.bottom - alto) * k));
        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(x0, y0, Math.max(0, x1 - x0), Math.max(0, y1 - y0));
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!canvas.hasAttribute("data-pronto")) canvas.setAttribute("data-pronto", "");
      // O ajuste da resolução, só com quadros seguidos (a cena em movimento): meta de 60 por segundo.
      if (dt > 0 && dt < 0.05) {
        somaDosQuadros += dt * 1000;
        if (++quadros % 30 === 0 && agora - acesaDesde > 1500) {
          const media = somaDosQuadros / 30;
          const antes = escala;
          // O piso em 75% (antes, 50%): abaixo disso, a ficha perde a nitidez que a justifica.
          if (media > 20.8 && escala > 0.75) {
            escala = Math.max(0.75, escala * 0.88);
            folga = -6;
          } else if (media < 18 && escala < 1 && ++folga >= 4) {
            escala = Math.min(1, escala * 1.1);
            folga = 0;
          }
          somaDosQuadros = 0;
          // Desde 18/10, a nova resolução entra num quadro seguinte, antes do desenho: realocado aqui, depois do desenho,
          // o canvas ficava vazio até o desenho seguinte (a placa piscava).
          if (escala !== antes) remedir = true;
        }
      }
    }
    if (mexe) pedir();
  };

  function pedir() {
    if (!quadro && vivo && naTela && !document.hidden) quadro = requestAnimationFrame(desenhar);
  }

  // A textura: o desenho com o navegador ocioso, o peso no worker; o primeiro quadro espera por ela. A subida para a
  // placa de vídeo vai em etapas, uma textura por vez, cedendo a vez entre elas: num bloco só (duas de 2048 com o
  // mipmap e a altura), era uma tarefa longa na carga (a auditoria do Impeccable, 16.10.2026).
  void (async () => {
    const t = await desenharTexturas(opcoes.familia, opcoes.textos, ladoDaCor);
    if (!vivo) return;
    const ajustar = (mipmap: boolean) => {
      if (mipmap) gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mipmap ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      if (mipmap && anisotropia) {
        const maximo = gl.getParameter(anisotropia.MAX_TEXTURE_MAX_ANISOTROPY_EXT) as number;
        gl.texParameterf(gl.TEXTURE_2D, anisotropia.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(8, maximo));
      }
    };
    for (const [i, dados] of [t.relevo, t.regioes].entries()) {
      await ocioso();
      if (!vivo) return;
      gl.activeTexture(i === 0 ? gl.TEXTURE0 : gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, texturas[i]);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, ladoDaCor, ladoDaCor, 0, gl.RGBA, gl.UNSIGNED_BYTE, dados);
      ajustar(true);
    }
    await ocioso();
    if (!vivo) return;
    // A altura: meio-float no WebGL2 (o brilho úmido mostraria os degraus de 8 bits; o R16F filtra, mas não gera
    // mipmap sem extensão); 8 bits no WebGL 1.
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texturas[2]);
    if (gl2) {
      gl2.texImage2D(gl2.TEXTURE_2D, 0, gl2.R16F, TEX, TEX, 0, gl2.RED, gl2.HALF_FLOAT, t.altura16);
      ajustar(false);
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, TEX, TEX, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, t.altura8);
      ajustar(true);
    }
    comTextura = true;
    pedir();
  })().catch(() => {
    vivo = false;
    raiz.setAttribute("data-sem-ceramica", "");
  });

  /** O halo do refletor na página: o cursor, em pixels da seção, como variáveis de CSS. */
  const levarHalo = (e: PointerEvent) => {
    if (!refletor) return;
    const s = refletor.getBoundingClientRect();
    refletor.style.setProperty("--refletor-x", `${(e.clientX - s.left).toFixed(0)}px`);
    refletor.style.setProperty("--refletor-y", `${(e.clientY - s.top).toFixed(0)}px`);
    if (!refletor.hasAttribute("data-refletor-aceso")) refletor.setAttribute("data-refletor-aceso", "");
  };
  const aoMover = (e: PointerEvent) => {
    const b = caixaRect();
    ponteiro.alvoX = Math.max(-2, Math.min(2, ((e.clientX - (b.left + b.width / 2)) / b.width) * 2));
    ponteiro.alvoY = Math.max(-2, Math.min(2, -((e.clientY - (b.top + b.height / 2)) / b.height) * 2));
    ponteiro.ativo = true;
    levarHalo(e);
    pedir();
  };
  /**
   * A entrada no papel: o halo acende sobre a ficha junto com a luz dela (o refletor que acende sobre o mapa,
   * nichos/odontologia.md, seção 6.6). Fica ali até o cursor o levar; sem cursor (no toque), fica sobre a ficha.
   */
  const acenderNaFicha = () => {
    if (!refletor || ponteiro.ativo) return;
    const s = refletor.getBoundingClientRect();
    const b = caixaRect();
    // No toque, a caixa da placa ainda não lida no primeiro quadro: espera o quadro em que ela existe (antes, o halo
    // nascia no canto de cima da capa, atrás do título).
    if (!fino && !b.width) {
      acenderPendente = true;
      return;
    }
    // No toque, a poça morna fica embaixo da placa (o passe do celular): o título, que atravessa a placa por diferença,
    // não passa sobre o fundo aceso, que o apagava (medido: de 6,5:1 para 2,4:1 no pior trecho).
    const [fx, fy] = fino ? [0.42, 0.3] : [0.6, 0.95];
    refletor.style.setProperty("--refletor-x", `${(b.left + b.width * fx - s.left).toFixed(0)}px`);
    refletor.style.setProperty("--refletor-y", `${(b.top + b.height * fy - s.top).toFixed(0)}px`);
    refletor.setAttribute("data-refletor-aceso", "");
  };
  /**
   * No toque (sem ponteiro fino), a luz responde no ponto tocado, por 400 ms, e volta para cima da ficha
   * (`09-movimento.md`, seção 11; nichos/odontologia.md, seção 6.6): o halo no papel e a luz da cerâmica.
   */
  let toque = 0;
  const aoTocar = (e: PointerEvent) => {
    if (e.pointerType === "mouse" || opcoes.reduzir) return;
    const b = caixaRect();
    ponteiro.alvoX = Math.max(-2, Math.min(2, ((e.clientX - (b.left + b.width / 2)) / b.width) * 2));
    ponteiro.alvoY = Math.max(-2, Math.min(2, -((e.clientY - (b.top + b.height / 2)) / b.height) * 2));
    ponteiro.ativo = true;
    levarHalo(e);
    pedir();
    window.clearTimeout(toque);
    toque = window.setTimeout(() => {
      ponteiro.alvoX = REPOUSO.luzX;
      ponteiro.alvoY = REPOUSO.luzY;
      acenderNaFicha();
      pedir();
      // Depois da volta, solta o ponteiro (a placa sem a inclinação da mão).
      window.setTimeout(() => (ponteiro.ativo = false), 700);
    }, 400);
  };
  const aoSair = () => {
    if (!refletor) return;
    // Sem o cursor, o halo volta para cima da ficha, em vez de apagar.
    ponteiro.ativo = false;
    acenderNaFicha();
  };
  const aoRedimensionar = () => {
    medir();
    lerPilha();
    pedir();
  };
  const aoMudarVisibilidade = () => {
    ultimo = performance.now();
    pedir();
  };
  const aoPerder = (e: Event) => {
    e.preventDefault();
    vivo = false;
    raiz.setAttribute("data-sem-ceramica", "");
  };
  const vigia = new MutationObserver(pedir);
  if (!ancorado) vigia.observe(caixa, { attributes: true, attributeFilter: ["data-regiao"] });
  // A pausa do ambiente (o botão do cabeçalho põe html.ambiente-pausado): ao retomar, o desenho acorda.
  const vigiaDaPausa = new MutationObserver(pedir);
  vigiaDaPausa.observe(raiz, { attributes: true, attributeFilter: ["class"] });
  const aoRolar = () => {
    ultimaRolagem = performance.now();
    pedir();
  };

  // A rolagem e o ponteiro só com a placa na tela (09-movimento.md, seção 5.7); fora dela, nada se desenha.
  const ligar = (sim: boolean) => {
    if (sim) {
      if (fino) window.addEventListener("pointermove", aoMover, { passive: true });
      if (fino) raiz.addEventListener("pointerleave", aoSair);
      if (!fino) refletor?.addEventListener("pointerdown", aoTocar, { passive: true });
      window.addEventListener("scroll", aoRolar, { passive: true });
    } else {
      window.removeEventListener("pointermove", aoMover);
      raiz.removeEventListener("pointerleave", aoSair);
      refletor?.removeEventListener("pointerdown", aoTocar);
      window.removeEventListener("scroll", aoRolar);
    }
  };
  /** Sem placa à vista, o desenho que ficou no canvas (preso à tela, no palco ancorado) se apaga. */
  const limpar = () => {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  };
  const visiveis = new Set<Element>();
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) (e.isIntersecting ? visiveis.add(e.target) : visiveis.delete(e.target));
      const agora = ancorado ? visiveis.size > 0 : entradas[entradas.length - 1].isIntersecting;
      if (agora === naTela) return;
      naTela = agora;
      ligar(naTela);
      if (naTela) {
        ultimo = performance.now();
        // Os pesos pararam onde a placa saiu da tela: a âncora que volta não viaja da de antes (a placa da ficha cruzava o
        // título da chamada ao chegar, da margem direita para a esquerda; o crítico de fora, 14.10.2026).
        pesosProntos = false;
        pedir();
      } else {
        aoSair();
        if (ancorado) {
          visibilidade = 0;
          limpar();
        }
      }
    },
    { rootMargin: "10% 0px" },
  );
  /** O palco ancorado relê as âncoras da página (a cada troca de página) e vigia cada uma. */
  const reancorar = () => {
    lerPilha();
    if (!ancorado) return;
    const novas = [...document.querySelectorAll<HTMLElement>(opcoes.ancoras!)];
    // A página nova: a placa parte da última caixa desenhada (a viagem), e os pesos recomeçam nos de agora.
    if (ultimaCaixa && visibilidade > 0.05 && !opcoes.reduzir && novas.some((a) => !ancoras.includes(a))) viagem = { de: ultimaCaixa, desde: performance.now() };
    ancoras = novas;
    pesosDasAncoras.clear();
    pesosProntos = false;
    observador.disconnect();
    vigia.disconnect();
    visiveis.clear();
    ancoras.forEach((a) => {
      observador.observe(a);
      vigia.observe(a, { attributes: true, attributeFilter: ["data-regiao"] });
    });
    if (!ancoras.length && naTela) {
      naTela = false;
      ligar(false);
      visibilidade = 0;
      limpar();
    }
    pedir();
  };
  if (ancorado) reancorar();
  else {
    lerPilha();
    observador.observe(canvas);
  }
  window.addEventListener("resize", aoRedimensionar, { passive: true });
  document.addEventListener("visibilitychange", aoMudarVisibilidade);
  canvas.addEventListener("webglcontextlost", aoPerder);
  medir();

  return {
    reancorar,
    destruir() {
      vivo = false;
      cancelAnimationFrame(quadro);
      window.clearTimeout(toque);
      observador.disconnect();
      vigia.disconnect();
      vigiaDaPausa.disconnect();
      ligar(false);
      aoSair();
      window.removeEventListener("resize", aoRedimensionar);
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
      canvas.removeEventListener("webglcontextlost", aoPerder);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}

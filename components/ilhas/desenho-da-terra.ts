import { emTerra } from "@/lib/mascara-da-terra";
import { pontoSubsolar, type Lugar } from "@/lib/sol";
import { abertura, bayer, escadaDeQualidade, limiar, novoLote, ponto } from "@/lib/traco-e-ponto";

/**
 * O desenho da Terra em dois estados da capa (desde 17/10, a direção final do Atlas Digital, seções 1.1, 2.7, 2.8 e 3,
 * item 1), num módulo à parte: chega por import() depois do load, fora do script inicial (ilhas/terra-em-dois-estados.tsx).
 * A gramática: o lado do dia em traço gravado de bronze, com a tinta e a espessura pela incidência real do Sol (do
 * rasante ao a pino, a rampa do metal, seção 2.1); o da noite em ponto de tela (--tela-luz); a fronteira é o crepúsculo
 * de agora (do horizonte a −18°), em Bayer: ali o traço se abre em casas cada vez mais curtas, até virar ponto (a casa
 * da pauta, lib/traco-e-ponto.ts). A vista fica parada no meridiano do pôr do sol, abaixo do equador (16° na mesa e,
 * desde 18/10, 23,44° no celular: --vista, no CSS da capa): o dia à esquerda, a noite à direita, e a Terra gira por
 * baixo, um dia a cada dois minutos (720×, declarado na legenda).
 * A graticula de 15° é das horas solares (uma hora por meridiano): presa ao Sol, como o anel das horas, ela fica parada
 * na tela e se desenha uma vez num canvas fora da tela. As casas de terra saem da máscara de 0,5° (Natural Earth 1:110m),
 * a 0,75° na mesa e 1,5° no celular (desde 18/10, o passe do celular; 2° no degrau de baixo da escada). Desde 17/10, pelo teste do desconhecido da capa ("tecnologia", "globo de pontos de
 * telecom", "linhas de varredura"), a reserva da seção 6 da direção: o lado gravado cresce (de 1° a 0,75°, e o traço
 * mais grosso onde o Sol bate mais), e o crepúsculo passa do traço ao ponto pela casa que encurta, e não de uma vez.
 */

const GRAU = Math.PI / 180;
/** Um dia a cada dois minutos: o giro acelerado, declarado na legenda (decisão do aprovador, por omissão, 17/10). */
export const VELOCIDADE = 720;
/** A vista, abaixo do equador: a frente do anel das horas fica acima do centro, e o Brasil, mais à vista. O ângulo vem
 *  do CSS da capa (--vista, em graus, o mesmo que achata o anel de marca/esfera.tsx); esta é a reserva, a da mesa. */
const VISTA = -16;
/** O seno de 18°: o fim do crepúsculo astronômico. A noite vai de 0 (o horizonte) a 1 (−18° ou mais fundo). */
const CREPUSCULO = Math.sin(18 * GRAU);
/** A espera e os degraus da passagem (seção 2.8): 450 ms, e 16 de 80 ms. */
const ESPERA = 450;
const DEGRAU = 80;
/** A segunda linha do rótulo de Niterói atrás da Terra. */
const ATRAS = "do outro lado";

/** A tinta do metal pela incidência do Sol, do rasante ao a pino (a família do bronze, sem tom novo). */
const METAL = ["#8a5a24", "#c08a4a", "#d9a76b", "#f1d3a1"] as const;
/** O alfa pela profundidade (o limbo escurece): perto da borda, mais fundo, a 42%. */
const ALFAS = [0.42, 0.72, 1] as const;
const LUZ = "#fbf1de";
/** A graticula do lado do dia, do rasante ao a pino: a tinta e a espessura (o traço fino do buril, abaixo da terra), no
 *  metal chapado e não em alfa (o bronze em alfa baixo sobre o navy vira cinza: C14). */
const GRATICULA = [
  ["#8a5a24", 0.6],
  ["#8a5a24", 0.8],
  ["#c08a4a", 0.8],
] as const;

const vetor = (lat: number, lon: number) => {
  const a = lat * GRAU;
  const b = lon * GRAU;
  return [Math.cos(a) * Math.cos(b), Math.cos(a) * Math.sin(b), Math.sin(a)] as const;
};

type Celulas = {
  /** O centro, a ponta oeste e a ponta leste de cada casa de terra, em vetores unitários (3 números por casa). */
  P: Float32Array;
  A: Float32Array;
  B: Float32Array;
  /** O limiar de Bayer da casa. */
  T: Float32Array;
  /** 1 se a casa seguinte é a vizinha a leste, na mesma fileira (os traços contíguos se juntam num só). */
  segue: Uint8Array;
  /** A longitude de cada casa, em graus, crescente dentro da fileira. */
  L: Float32Array;
  /** As fileiras (uma latitude cada): a primeira casa, a casa depois da última e o seno e o cosseno da latitude. */
  fileiras: { inicio: number; fim: number; seno: number; cosseno: number }[];
  n: number;
  passo: number;
};

/** As casas de terra de uma pauta de `passo` graus, à mesma distância na esfera (menos casas perto dos polos). */
function gerarCelulas(mascara: Uint8Array, passo: number): Celulas {
  const P: number[] = [];
  const A: number[] = [];
  const B: number[] = [];
  const T: number[] = [];
  const segue: number[] = [];
  const L: number[] = [];
  const fileiras: Celulas["fileiras"] = [];
  let i = 0;
  for (let lat = -89.5 + passo / 2; lat < 89.5; lat += passo, i++) {
    const n = Math.max(1, Math.round((360 * Math.cos(lat * GRAU)) / passo));
    const dl = 360 / n;
    const inicio = T.length;
    let anterior = -2;
    for (let j = 0; j < n; j++) {
      const lon = -180 + (j + 0.5) * dl;
      if (!emTerra(mascara, lat, lon)) continue;
      if (anterior === j - 1) segue[segue.length - 1] = 1;
      const c = Math.cos(lat * GRAU);
      const z = Math.sin(lat * GRAU);
      for (const [V, l] of [[P, lon], [A, lon - dl / 2], [B, lon + dl / 2]] as const) V.push(c * Math.cos(l * GRAU), c * Math.sin(l * GRAU), z);
      T.push(bayer(i, j));
      L.push(lon);
      segue.push(0);
      anterior = j;
    }
    if (T.length > inicio) fileiras.push({ inicio, fim: T.length, seno: Math.sin(lat * GRAU), cosseno: Math.cos(lat * GRAU) });
  }
  const f32 = (lista: number[]) => Float32Array.from(lista);
  return { P: f32(P), A: f32(A), B: f32(B), T: f32(T), L: f32(L), segue: Uint8Array.from(segue), fileiras, n: T.length, passo };
}

/** A vista presa ao Sol de um instante, de `angulo` rad sobre o equador: a frente (f), o leste da tela (e), o alto da
 *  tela (u) e o Sol (s). */
function vista(instante: Date, angulo: number) {
  const sub = pontoSubsolar(instante);
  const lc = (sub.longitude + 90) * GRAU;
  const f = [Math.cos(angulo) * Math.cos(lc), Math.cos(angulo) * Math.sin(lc), Math.sin(angulo)];
  const e = [-Math.sin(lc), Math.cos(lc), 0];
  const u = [-Math.sin(angulo) * Math.cos(lc), -Math.sin(angulo) * Math.sin(lc), Math.cos(angulo)];
  return { f, e, u, s: vetor(sub.latitude, sub.longitude), sub };
}

export type Terra = {
  /** Um quadro do laço (aoVivo): anda o giro e redesenha a 30 por segundo, quando a borda andou meio pixel. */
  quadro(agora: number): void;
  /** Desenha já (o arraste, as setas, a mudança de tamanho, a pausa). */
  desenhar(): void;
  /** A pausa chegou: se a passagem não terminou (ou não começou, com o globo fora da tela), termina e redesenha. */
  pausar(): void;
  /** Soma minutos de Terra (o arraste e as setas) e redesenha. */
  correr(minutos: number): void;
  /** O instante que o globo mostra; com `final`, o do fim da volta até Niterói, se ela está em curso. */
  instante(final?: boolean): Date;
  /** Niterói em (x, y) na caixa (atrás da Terra, o lugar visto através dela), ou null antes do primeiro desenho. */
  ondeEsta(): { x: number; y: number; atras: boolean } | null;
  /** Segura o giro (o foco do teclado, o arraste): o globo fica na hora que mostra, e só a mão a muda. */
  segurar(sim: boolean): void;
  /** Se Niterói está atrás da Terra, gira o globo pelo caminho mais curto até ela ficar na frente, logo depois do pôr
   *  do sol (em ~0,6 s; de uma vez, com a pausa ou o movimento reduzido). */
  trazerNiteroi(): void;
  /** A volta até Niterói está em curso. */
  virando(): boolean;
  /** Abre ou fecha o rótulo de Niterói com a coordenada e a fonte (a prova de vida). */
  rotulo(aberto: boolean): void;
  medir(): void;
};

type Opcoes = {
  /** O canvas da Terra (redesenha a cada quadro) e o da graticula, embaixo dele (só quando ela muda). */
  canvas: HTMLCanvasElement;
  fundo: HTMLCanvasElement;
  mascara: Uint8Array;
  lugar: Lugar;
  /** O nome e as duas linhas do rótulo aberto: a coordenada e a fonte. */
  nome: string;
  detalhe: readonly string[];
  /** O agora do relógio (lib/sol.ts, relogio()). */
  agora: () => Date;
  reduzido: boolean;
};

export function terraEmDoisEstados({ canvas, fundo: graticula, mascara, lugar, nome, detalhe, agora, reduzido }: Opcoes): Terra {
  const ctx = canvas.getContext("2d")!;
  // A escada de qualidade (seção 4, item 8): no celular, o passo da Terra vai de 1,5° a 2° antes da densidade descer.
  // A graticula fica fora dela: desenhada uma vez num canvas fora da tela, não custa nada por quadro.
  const noCelular = window.matchMedia("(width < 64rem)").matches;
  const escada = escadaDeQualidade(8, noCelular ? 50 : 30, noCelular ? 1 : 0);
  // A família do texto, com a reserva (o Inter chega em "optional", e o canvas não espera por ele).
  const texto = getComputedStyle(document.documentElement).getPropertyValue("--font-texto").trim() || "system-ui, sans-serif";
  let celular = false;
  let angulo = VISTA * GRAU;
  // A letra do rótulo segue a do leitor (a letra do navegador a 200% dobra o rótulo, como dobra o texto em HTML).
  let escalaDaLetra = 1;
  let celulas: Celulas | null = null;
  let lado = 0;
  // A parte da caixa que a tela mostra (a caixa passa da borda dela e do pé): o rótulo de Niterói fica dentro.
  let visivel = { de: 0, ate: 0, pe: 0 };
  let dpr = escada.densidade;
  let graticulaPronta = -1;

  const inicio = agora().getTime();
  let giro = 0; // ms de Terra somados pelo giro e pela mão
  let anterior: number | null = null;
  // A passagem começa no primeiro quadro do laço, quando o globo entra na tela (desde 18/10, a revisão do celular: ela
  // contava da criação e, com a Terra abaixo da dobra, corria fora da vista). Antes dela, a Terra inteira em traço.
  let entrada: number | null = reduzido ? -Infinity : null;
  let ultimo = -Infinity;
  let giroDesenhado = NaN;
  let aberto = false;
  // Niterói na frente (o toque e o Enter) e o lugar dela, na frente ou atrás da Terra.
  let onde: { x: number; y: number } | null = null;
  let marca: { x: number; y: number; atras: boolean } | null = null;
  let segurado = false;
  let destino: number | null = null;

  const instante = (final = false) => new Date((reduzido ? agora().getTime() : inicio) + (final && destino !== null ? destino : giro));
  const passagem = (t: number) => {
    // A pausa termina a passagem, antes de o globo entrar na tela ou no meio dela: o estado final, a noite em pontos
    // (até 18/10, a pausa tocada com a Terra abaixo da dobra deixava a noite gravada como dia).
    if ((entrada === null || t < entrada + 16 * DEGRAU) && document.documentElement.classList.contains("ambiente-pausado")) entrada = -Infinity;
    return entrada === null ? 0 : abertura(t, entrada, DEGRAU);
  };

  function medir() {
    const largura = canvas.parentElement!.getBoundingClientRect().width;
    celular = window.matchMedia("(width < 64rem)").matches;
    const doCss = parseFloat(getComputedStyle(canvas.parentElement!).getPropertyValue("--vista"));
    angulo = (Number.isFinite(doCss) ? doCss : VISTA) * GRAU;
    escalaDaLetra = parseFloat(getComputedStyle(document.documentElement).fontSize) / 16 || 1;
    const passo = celular ? (escada.degrau > 0 ? 2 : 1.5) : 0.75;
    if (celulas?.passo !== passo) celulas = gerarCelulas(mascara, passo);
    lado = largura;
    const caixa = canvas.getBoundingClientRect();
    const janela = canvas.closest("[data-tom]")?.getBoundingClientRect();
    visivel = janela
      ? { de: Math.max(0, janela.left - caixa.left), ate: Math.min(lado, janela.right - caixa.left), pe: Math.min(lado, janela.bottom - caixa.top) }
      : { de: 0, ate: lado, pe: lado };
    dpr = escada.densidade;
    canvas.width = graticula.width = Math.round(lado * dpr);
    canvas.height = graticula.height = Math.round(lado * dpr);
    graticulaPronta = -1;
  }

  /** A graticula das horas solares, no canvas de baixo: parada na vista, muda só com a passagem e o tamanho (o
   *  compositor a mostra sem custo a cada quadro da Terra). Desde 18/10 (a revisão da capa), o lado do dia da graticula
   *  é gravado pela incidência, como a terra: mais claro e mais grosso para o meio-dia. Entre as 21 h e a 1 h de
   *  Niterói, o lado do dia que a vista mostra é o Pacífico, sem terra; a gravura da graticula segura ali a metade do
   *  atlas (a convenção do globo gravado: no mar, a rede), e o lado da noite segue em pontos. Zero custo por quadro. */
  function desenharGraticula(v: ReturnType<typeof vista>, g: number) {
    const c = graticula.getContext("2d")!;
    const R = lado / 2.5;
    const meio = lado / 2;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, lado, lado);
    // Do rasante ao a pino, como os baldes da terra (seno do Sol acima de 0,2 e de 0,5).
    const linhas = [new Path2D(), new Path2D(), new Path2D()];
    const pontos = new Path2D();
    const segmento = (a: readonly number[], b: readonly number[], k: number) => {
      const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
      if (m[0] * v.f[0] + m[1] * v.f[1] + m[2] * v.f[2] < 0.04) return;
      const xa = meio + R * (a[0] * v.e[0] + a[1] * v.e[1] + a[2] * v.e[2]);
      const ya = meio - R * (a[0] * v.u[0] + a[1] * v.u[1] + a[2] * v.u[2]);
      const xb = meio + R * (b[0] * v.e[0] + b[1] * v.e[1] + b[2] * v.e[2]);
      const yb = meio - R * (b[0] * v.u[0] + b[1] * v.u[1] + b[2] * v.u[2]);
      const seno = m[0] * v.s[0] + m[1] * v.s[1] + m[2] * v.s[2];
      const noite = Math.max(0, Math.min(1, -seno / CREPUSCULO));
      if (g > 0 && limiar(noite, k, k >> 2, g)) {
        if (k % 2 === 0) ponto(pontos, (xa + xb) / 2, (ya + yb) / 2);
      } else {
        const balde = linhas[seno > 0.5 ? 2 : seno > 0.2 ? 1 : 0];
        balde.moveTo(xa, ya);
        balde.lineTo(xb, yb);
      }
    };
    // Os meridianos das horas: um a cada 15° a partir do Sol (presos a ele, e não à Terra).
    for (let h = 0; h < 24; h++) {
      const lon = v.sub.longitude + (h - 12) * 15;
      for (let k = 0, lat = -75; lat < 75; lat += 1.5, k++) segmento(vetor(lat, lon), vetor(lat + 1.5, lon), k);
    }
    for (let lat = -60; lat <= 75; lat += 15) {
      for (let k = 0, lon = -180; lon < 180; lon += 1.5, k++) segmento(vetor(lat, v.sub.longitude + lon), vetor(lat, v.sub.longitude + lon + 1.5), k);
    }
    c.lineCap = "round";
    GRATICULA.forEach(([tinta, espessura], i) => {
      c.strokeStyle = tinta;
      c.lineWidth = espessura;
      c.stroke(linhas[i]);
    });
    c.strokeStyle = "rgb(251 241 222 / 0.3)";
    c.lineWidth = 1.5;
    c.stroke(pontos);
  }

  function desenhar(t = performance.now()) {
    if (!celulas || !lado) return;
    const comeco = performance.now();
    const v = vista(instante(), angulo);
    const g = passagem(t);
    const R = lado / 2.5;
    const meio = lado / 2;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, lado, lado);
    if (graticulaPronta !== g) {
      desenharGraticula(v, g);
      graticulaPronta = g;
    }

    const [f0, f1, f2] = v.f;
    const [e0, e1, e2] = v.e;
    const [u0, u1, u2] = v.u;
    const [s0, s1, s2] = v.s;
    const fator = celular ? 0.9 : 1;
    // O traço, em pontas retas (as casas encostam: a fileira é uma linha gravada); o ponto, no lote do primitivo, de
    // ponta redonda.
    const tracos = METAL.map(() => ALFAS.map(() => new Path2D()));
    const lote = novoLote();
    const pontos = ALFAS.map((alfa) => lote.caminho(LUZ, celular ? 2 : 2.2, alfa));
    const { P, A, B, T, L, segue } = celulas;
    const escuro = (1 - g) * 1.01;
    const X = (V: Float32Array, o: number) => meio + R * (V[o] * e0 + V[o + 1] * e1 + V[o + 2] * e2);
    const Y = (V: Float32Array, o: number) => meio - R * (V[o] * u0 + V[o + 1] * u1 + V[o + 2] * u2);

    // O traço contíguo, aberto: as casas de dia vizinhas, na mesma tinta, viram um segmento só (até 8 casas, 6°: a
    // corda não se afasta da curva da fileira).
    let corrida = -1;
    let fimDaCorrida = -1;
    let casas = 0;
    let balde: Path2D = tracos[0][0];
    const fechar = () => {
      balde.moveTo(X(A, corrida * 3), Y(A, corrida * 3));
      balde.lineTo(X(B, fimDaCorrida * 3), Y(B, fimDaCorrida * 3));
      corrida = -1;
    };
    // As casas de a até b (uma fileira, ou a parte dela à vista). O laço quente, sem chamada por casa: só as contas.
    const percorrer = (a: number, b: number) => {
      for (let k = a, o = a * 3; k < b; k++, o += 3) {
        const x = P[o];
        const y = P[o + 1];
        const z = P[o + 2];
        const seno = x * s0 + y * s1 + z * s2;
        const noite = seno >= 0 ? 0 : -seno >= CREPUSCULO ? 1 : -seno / CREPUSCULO;
        // A noite em metade das casas (as de limiar de Bayer abaixo de 1/2): elas viram ponto quando a noite passa do
        // limiar delas, esticado ao crepúsculo inteiro (o limiar() do primitivo, com o limiar guardado em T); as outras
        // seguem como casas que encurtam e somem quando a noite passa do limiar. Assim a noite funda tem a metade dos
        // pontos (o espaço de ~1° entre eles, e não um globo de pontos cerrados), e o crepúsculo mistura os dois estados.
        const limiarDaCasa = T[k];
        const metade = limiarDaCasa < 0.5;
        if (g > 0 && noite >= (metade ? 2 * limiarDaCasa : limiarDaCasa) + escuro) {
          if (corrida >= 0) fechar();
          if (metade) {
            const fundo = x * f0 + y * f1 + z * f2;
            if (fundo > 0.03) ponto(pontos[fundo > 0.62 ? 2 : fundo > 0.3 ? 1 : 0], meio + R * (x * e0 + y * e1 + z * e2), meio - R * (x * u0 + y * u1 + z * u2));
          }
          continue;
        }
        const fundo = x * f0 + y * f1 + z * f2;
        if (fundo <= 0.03) {
          if (corrida >= 0) fechar();
          continue;
        }
        const caminho = tracos[seno > 0.55 ? 3 : seno > 0.28 ? 2 : seno > 0.06 ? 1 : 0][fundo > 0.62 ? 2 : fundo > 0.3 ? 1 : 0];
        // A casa que encurta no crepúsculo: n = 0 é o traço inteiro, n = 1 seria o ponto.
        const n = noite * g * 0.72;
        if (n < 0.02) {
          if (corrida >= 0 && balde === caminho && casas < 8 && segue[k - 1]) {
            fimDaCorrida = k;
            casas++;
          } else {
            if (corrida >= 0) fechar();
            corrida = fimDaCorrida = k;
            balde = caminho;
            casas = 1;
          }
          continue;
        }
        if (corrida >= 0) fechar();
        const xp = meio + R * (x * e0 + y * e1 + z * e2);
        const yp = meio - R * (x * u0 + y * u1 + z * u2);
        const m = 1 - n;
        caminho.moveTo(xp + (X(A, o) - xp) * m, yp + (Y(A, o) - yp) * m);
        caminho.lineTo(xp + (X(B, o) - xp) * m + 0.01, yp + (Y(B, o) - yp) * m);
      }
      if (corrida >= 0) fechar();
    };
    // Só a faixa de cada fileira que dá para a frente (P·f > 0,03, com folga): a outra metade nem entra no laço.
    const centro = v.sub.longitude + 90;
    const primeira = (de: number, ate: number, lon: number) => {
      while (de < ate) {
        const meioK = (de + ate) >> 1;
        if (L[meioK] < lon) de = meioK + 1;
        else ate = meioK;
      }
      return de;
    };
    const faixa = (fileira: Celulas["fileiras"][number], de: number, ate: number) =>
      percorrer(primeira(fileira.inicio, fileira.fim, de), primeira(fileira.inicio, fileira.fim, ate));
    for (const fileira of celulas.fileiras) {
      const c = (0.02 - Math.sin(angulo) * fileira.seno) / (Math.cos(angulo) * fileira.cosseno);
      if (c >= 1) continue;
      if (c <= -1) {
        percorrer(fileira.inicio, fileira.fim);
        continue;
      }
      const meia = Math.acos(c) / GRAU;
      const de = ((((centro - meia + 180) % 360) + 360) % 360) - 180;
      const ate = de + 2 * meia;
      if (ate <= 180) faixa(fileira, de, ate);
      else {
        faixa(fileira, de, 180);
        faixa(fileira, -180, ate - 360);
      }
    }
    ctx.lineCap = "butt";
    tracos.forEach((porAlfa, cb) =>
      porAlfa.forEach((caminho, ab) => {
        ctx.globalAlpha = ALFAS[ab];
        ctx.strokeStyle = METAL[cb];
        // O traço engrossa com o Sol, como o buril que corta mais fundo: de 1 px no rasante a 2 px a pino.
        ctx.lineWidth = (1 + cb * 0.33) * fator;
        ctx.stroke(caminho);
      }),
    );
    ctx.globalAlpha = 1;
    lote.pintar(ctx);

    niteroi(v, R, meio);
    if (escada.medir(performance.now() - comeco)) {
      medir();
      desenhar(t);
    }
    giroDesenhado = giro;
  }

  /** Niterói, o único lugar marcado: o anel, o ponto (aceso de noite) e o rótulo, com o halo de carta. Atrás da Terra,
   *  o lugar verdadeiro, visto através dela, num anel tracejado (a convenção do desenho para o que está escondido), e o
   *  rótulo diz "do outro lado". Desde 18/10 (a revisão do celular): das ~23h40 às ~11h40 na carga, e sempre com
   *  movimento reduzido ou com a pausa, Niterói sumia; a vista continua no pôr do sol (seção 2.3), e o instante, o de
   *  agora. */
  function niteroi(v: ReturnType<typeof vista>, R: number, meio: number) {
    const p = vetor(lugar.latitude, lugar.longitude);
    const fundo = p[0] * v.f[0] + p[1] * v.f[1] + p[2] * v.f[2];
    const x = meio + R * (p[0] * v.e[0] + p[1] * v.e[1] + p[2] * v.e[2]);
    const y = meio - R * (p[0] * v.u[0] + p[1] * v.u[1] + p[2] * v.u[2]);
    const atras = fundo <= 0;
    // Na frente, colada ao limbo (até 0,08), Niterói fica sem marca: ela cairia sobre o contorno de metal.
    onde = fundo > 0.08 ? { x, y } : null;
    marca = onde || atras ? { x, y, atras } : null;
    if (!marca) return;
    const noite = -(p[0] * v.s[0] + p[1] * v.s[1] + p[2] * v.s[2]) > 0.0145;
    ctx.save();
    ctx.strokeStyle = "#f1d3a1";
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    if (atras) {
      ctx.lineWidth = 1.2;
      ctx.setLineDash([2.5, 2.5]);
      ctx.stroke();
      ctx.setLineDash([]);
    } else {
      ctx.globalAlpha = Math.min(1, fundo * 2.2);
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.fillStyle = noite ? LUZ : "#f1d3a1";
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    // O rótulo (o nome; aberto, a coordenada e a fonte; atrás, "do outro lado"). Nada abaixo de 12 px: o nome em 14,
    // as linhas de baixo em 13. A letra sempre inteira (o marcador da frente esmaece perto do limbo; o texto, não):
    // fechado, na frente, o rótulo só aparece longe da borda; atrás, o anel tracejado não esmaece, e o rótulo fica.
    ctx.globalAlpha = 1;
    if (!atras && !aberto && fundo < 0.2) {
      ctx.restore();
      return;
    }
    const linhas = atras ? [nome, ATRAS] : aberto ? [nome, ...detalhe] : [nome];
    const e = escalaDaLetra;
    const letra = (i: number) => (i ? `500 ${13 * e}px ${texto}` : `600 ${14 * e}px ${texto}`);
    const largura = Math.max(
      ...linhas.map((linha, i) => {
        ctx.font = letra(i);
        return ctx.measureText(linha).width;
      }),
    );
    // Duas linhas ou mais vão numa placa do navy fundo: sobre os pontos da noite, o halo de carta não bastava. A caixa
    // do rótulo, pela borda esquerda (l) e pela linha de base do nome (b): a placa, ou só a letra.
    const placa = linhas.length > 1;
    const folga = placa ? 8 : 2;
    const acima = 14 * e + (placa ? 4 : 0);
    const abaixo = (linhas.length - 1) * 17 * e + (placa ? 6 * e + 4 : 4 * e);
    // Inteira dentro do disco (fora dele, o rótulo cairia sob o metal do anel, que o SVG da frente pinta por cima) e
    // da parte à vista da tela, dos lados e no pé.
    const cabe = (l: number, b: number) => {
      const [de, ate] = [l - folga, l + largura + folga];
      const longe = Math.max(meio - de, ate - meio);
      return de >= visivel.de + 8 && ate <= visivel.ate - 8 && b + abaixo <= visivel.pe - 8 && [b - acima, b + abaixo].every((cy) => Math.hypot(longe, cy - meio) <= R * 0.97);
    };
    // Embaixo e em cima, centrado no marcador e preso à corda do disco na altura mais funda da caixa.
    const centrado = (b: number) => {
      const fundoDaCaixa = Math.max(Math.abs(b - acima - meio), Math.abs(b + abaixo - meio));
      const meia = Math.sqrt(Math.max(0, (R * 0.97) ** 2 - fundoDaCaixa ** 2));
      const de = Math.max(visivel.de + 8, meio - meia) + folga;
      const ate = Math.min(visivel.ate - 8, meio + meia) - folga - largura;
      return Math.min(Math.max(x - largura / 2, de), ate);
    };
    // À direita, à esquerda, embaixo ou em cima: o primeiro lugar em que caiba (no raio do celular, com Niterói no meio
    // do disco, as linhas abertas não cabem de lado nenhum: até 18/10, o rótulo ia à direita assim mesmo, cortado pelo
    // metal); se nenhum, embaixo.
    const lugares = [
      { lado: "direita", b: y - 21, l: x + 38 },
      { lado: "esquerda", b: y - 21, l: x - 38 - largura },
      { lado: "embaixo", b: y + 14 + acima, l: NaN },
      { lado: "em cima", b: y - 14 - abaixo, l: NaN },
    ].map((o) => (Number.isNaN(o.l) ? { ...o, l: centrado(o.b) } : o));
    const { lado, l, b } = lugares.find((o) => cabe(o.l, o.b)) ?? lugares[2];
    ctx.beginPath();
    if (lado === "direita" || lado === "esquerda") {
      const s = lado === "direita" ? 1 : -1;
      ctx.moveTo(x + 5 * s, y - 5);
      ctx.lineTo(x + 26 * s, y - 26);
      ctx.lineTo(x + 34 * s, y - 26);
    } else {
      const s = lado === "embaixo" ? 1 : -1;
      ctx.moveTo(x, y + 7 * s);
      ctx.lineTo(x, y + 14 * s);
    }
    ctx.strokeStyle = "#f1d3a1";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.textAlign = lado === "esquerda" ? "right" : "left";
    const lx = lado === "esquerda" ? x - 38 : l;
    ctx.lineJoin = "round";
    if (placa) {
      ctx.fillStyle = "rgb(11 35 64 / 0.86)";
      ctx.beginPath();
      ctx.roundRect(l - 8, b - 14 * e - 4, largura + 16, (linhas.length - 1) * 17 * e + 20 * e + 8, 12);
      ctx.fill();
    }
    linhas.forEach((linha, i) => {
      ctx.font = letra(i);
      const base = b + i * 17 * e;
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#0b2340";
      ctx.strokeText(linha, lx, base);
      ctx.fillStyle = i ? "#aebdcd" : "#f3efec";
      ctx.fillText(linha, lx, base);
    });
    ctx.restore();
  }

  return {
    quadro(t) {
      // O primeiro quadro do laço: o globo entrou na tela, e a passagem começa.
      if (entrada === null) entrada = t + ESPERA;
      const dt = anterior === null ? 0 : t - anterior;
      anterior = t;
      // Depois da pausa ou fora da tela, o giro recomeça de onde parou, sem o salto do tempo parado. Na volta até
      // Niterói, o globo corre um terço do que falta a cada quadro, no lugar do giro.
      if (destino !== null) {
        giro += (destino - giro) / 3;
        if (Math.abs(destino - giro) < 30_000) {
          giro = destino;
          destino = null;
        }
      } else if (dt > 0 && dt < 250 && !segurado) giro += dt * VELOCIDADE;
      if (t - ultimo < 30) return;
      const andou = (Math.abs(giro - giroDesenhado) / 86_400_000) * 2 * Math.PI * (lado / 2.5);
      if (andou < 0.5 && passagem(t) === 1 && graticulaPronta === 1) return;
      ultimo = t;
      desenhar(t);
    },
    desenhar: () => desenhar(),
    pausar() {
      if (entrada === null || performance.now() < entrada + 16 * DEGRAU) desenhar();
    },
    correr(minutos) {
      if (destino !== null) giro = destino;
      destino = null;
      giro += minutos * 60_000;
      if (entrada === null || entrada > performance.now()) entrada = -Infinity;
      desenhar();
    },
    instante,
    ondeEsta: () => marca,
    segurar(sim) {
      segurado = sim;
    },
    trazerNiteroi() {
      if (onde) return;
      // A distância de Niterói ao meio da vista, em graus a leste; o globo anda 0,25° por minuto de Terra. O alvo: 15° a
      // leste do meio, logo depois do pôr do sol, pelo caminho mais curto (de 4 a 12 horas, para a frente ou para trás).
      const meio = pontoSubsolar(instante()).longitude + 90;
      const falta = ((((15 - (lugar.longitude - meio)) % 360) + 540) % 360) - 180;
      const alvo = giro + falta * 4 * 60_000;
      if (entrada === null || entrada > performance.now()) entrada = -Infinity;
      if (reduzido || document.documentElement.classList.contains("ambiente-pausado")) {
        giro = alvo;
        desenhar();
      } else destino = alvo;
    },
    virando: () => destino !== null,
    rotulo(a) {
      aberto = a;
      desenhar();
    },
    medir() {
      medir();
      desenhar();
    },
  };
}

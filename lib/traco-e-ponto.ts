/**
 * O primitivo do Atlas Digital (17/10, a direção final: "o mesmo desenho em dois estados"). Desde 17/10, todo desenho
 * vivo do site sai daqui: a casa da pauta, um segmento de comprimento (1 − n) × passo com a ponta redonda, que é traço
 * gravado com n = 0 (encosta no vizinho: o atlas, o que já está gravado) e ponto de tela com n = 1 (o digital, o que a
 * tela calcula agora). A fronteira gradual entre os dois (o crepúsculo, a metade, o mês corrente) se desenha em
 * pontilhado ordenado, pela matriz de Bayer 4 × 4; a passagem anima o limiar em 16 degraus, sem shader.
 * Aqui moram também o lote de Path2D (um stroke por tinta e espessura, e não um por casa), a densidade de pixel até 2
 * com a escada de qualidade, e o número calculado, em Archivo Black chapado com a troca em Bayer: mostrador().
 * O módulo pode ser importado no servidor: document, canvas e window só são tocados dentro das funções.
 */

/** A matriz de Bayer 4 × 4, em limiares (k + 0,5) / 16, linha a linha: 0 8 2 10 / 12 4 14 6 / 3 11 1 9 / 15 7 13 5. */
export const BAYER4: readonly number[] = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((k) => (k + 0.5) / 16);

/** O limiar de Bayer da casa (i, j), de 1/32 a 31/32; a matriz se repete a cada 4 casas. */
export const bayer = (i: number, j: number) => BAYER4[((i & 3) << 2) | (j & 3)];

/**
 * A casa (i, j) acende? Acende quando `valor` (de 0 a 1: a noite, a cobertura, a fração) passa do limiar de Bayer dela.
 * `abertura` é a passagem (0: nenhuma casa acende; 1: o pontilhado inteiro), que desloca o limiar para fora da faixa.
 */
export const limiar = (valor: number, i: number, j: number, abertura = 1) => valor >= bayer(i, j) + (1 - abertura) * 1.01;

/** A passagem em 16 degraus de `passoMs` (80 ms na capa, 70 na escada, 50 na conta): de 0 a 1, a partir de `inicio`. */
export const abertura = (agora: number, inicio: number, passoMs = 80) => Math.min(1, Math.max(0, Math.floor((agora - inicio) / passoMs) / 16));

/**
 * A casa da pauta em (x, y), deitada (ou de pé, com `vertical`): o segmento de (1 − n) × passo. Com a ponta redonda
 * do lote, n = 1 vira um ponto do diâmetro da espessura (o 0,01 faz o navegador desenhar a ponta de um traço nulo).
 */
export function casa(caminho: Path2D, x: number, y: number, passo: number, n: number, vertical = false) {
  const meio = ((1 - n) * passo) / 2;
  if (vertical) {
    caminho.moveTo(x, y - meio);
    caminho.lineTo(x, y + meio + 0.01);
  } else {
    caminho.moveTo(x - meio, y);
    caminho.lineTo(x + meio + 0.01, y);
  }
}

/** O ponto de tela em (x, y): a casa com n = 1. */
export function ponto(caminho: Path2D, x: number, y: number) {
  caminho.moveTo(x, y);
  caminho.lineTo(x + 0.01, y);
}

/**
 * O lote: um Path2D por tinta, espessura e alfa, pintado num stroke só, com a ponta redonda. Peça os caminhos antes do
 * laço (caminho() devolve sempre o mesmo para a mesma combinação) e pinte no fim do quadro; a ordem de pintura é a
 * ordem do primeiro pedido.
 */
export function novoLote() {
  const camadas: { tinta: string; espessura: number; alfa: number; caminho: Path2D }[] = [];
  return {
    caminho(tinta: string, espessura: number, alfa = 1) {
      let camada = camadas.find((c) => c.tinta === tinta && c.espessura === espessura && c.alfa === alfa);
      if (!camada) camadas.push((camada = { tinta, espessura, alfa, caminho: new Path2D() }));
      return camada.caminho;
    },
    pintar(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.lineCap = "round";
      for (const c of camadas) {
        ctx.globalAlpha = c.alfa;
        ctx.strokeStyle = c.tinta;
        ctx.lineWidth = c.espessura;
        ctx.stroke(c.caminho);
      }
      ctx.restore();
    },
  };
}

/** A densidade de pixel do canvas: a do aparelho, até 2 (acima disso, o custo cresce e o olho não vê). */
export const densidade = () => Math.min(2, (typeof window !== "undefined" && window.devicePixelRatio) || 1);

/**
 * A escada de qualidade (como no globo do GitHub): começa na densidade do aparelho (até 2) e desce um degrau (1,5, 1)
 * quando o desenho de um quadro custa, em média, mais que `orcamentoMs` ao longo de `janela` quadros. O padrão, 8 ms,
 * é um quarto do quadro de um laço a 30 por segundo. A peça mede o próprio desenho e redimensiona o canvas quando
 * medir() devolve true. Desde 18/10, `antes`: os degraus que a peça desce na densidade do aparelho, antes de baixá-la (a
 * Terra no celular: o passo de 1,5° a 2°); `degrau` diz em qual ela está.
 */
export function escadaDeQualidade(orcamentoMs = 8, janela = 30, antes = 0) {
  const topo = densidade();
  const degraus = [...Array<number>(antes + 1).fill(topo), ...[1.5, 1].filter((d) => d < topo)];
  let degrau = 0;
  let soma = 0;
  let quadros = 0;
  return {
    get densidade() {
      return degraus[degrau];
    },
    get degrau() {
      return degrau;
    },
    /** O custo de um quadro, em ms. true quando a escada acabou de descer. */
    medir(ms: number) {
      soma += ms;
      if (++quadros < janela) return false;
      const media = soma / quadros;
      soma = quadros = 0;
      if (media <= orcamentoMs || degrau === degraus.length - 1) return false;
      degrau++;
      return true;
    },
  };
}

/** O tempo da troca de um algarismo (o kit: o algarismo em 220 ms) e a casa do pontilhado da troca, em px. */
const TROCA_MS = 220;
const CASA_DA_TROCA = 3;

/** A família do Archivo Black (--font-titulo, que o next/font escreve no layout), com a reserva do sistema. */
export const familiaDoTitulo = () => getComputedStyle(document.documentElement).getPropertyValue("--font-titulo").trim() || '"Archivo Black"';

export type Mostrador = {
  /** Escreve o texto ("\n" quebra a linha). Com `animar` = false, com a pausa ou com movimento reduzido, de uma vez. */
  escrever(texto: string, animar?: boolean): void;
  /** Cancela a troca em curso (ao desmontar a peça). */
  parar(): void;
  /** Do alto do canvas à linha de base da primeira linha, em px de CSS. */
  readonly base: number;
};

/**
 * O mostrador: o número calculado agora, em Archivo Black chapado, num canvas (aria-hidden; o texto vai ao leitor de
 * tela pela peça). Desde 18/10, em todo o site (a capa, o total de /orcamento, a leitura das 72 h de /o-trabalho, a
 * coordenada de /o-atlas e os totais do montador do início): a reserva da seção 2.4 da direção, porque o teste do
 * desconhecido leu o meio-tom em pontos como "painel de LED de rodoviária ou de aeroporto" (os três leitores). Até
 * 18/10, aqui, o meio-tom (fonteDeMeioTom, a amostra da fonte em casas de pauta); o ponto fica nas figuras.
 * Cada algarismo numa caixa fixa, a do mais largo (o Archivo Black não tem `tnum`: o número não dança, como em
 * components/algarismos.tsx); os outros caracteres, na largura deles. O tamanho sai das `amostras` (o texto mais largo
 * que ele vai mostrar) e não muda com a leitura. A troca: só as casas que mudaram, o algarismo velho se dissolvendo no
 * novo pela matriz de Bayer 4 × 4 em casas de 3 px, em 220 ms; nunca um quadro sem algarismo, nunca o odômetro. A cada
 * escrita, o texto inteiro se pinta uma vez; durante a troca, só as caixas que mudaram se refazem a cada quadro, e no
 * fim dela o texto inteiro se pinta de novo, num canvas limpo. O
 * relógio que chama escrever() passa por aoVivo (lib/ambiente.ts); a troca em curso termina em 220 ms, mesmo em pausa.
 * `corpo` em px (36 px de maiúscula pedem 52,3: a maiúscula do Archivo Black tem 0,688 em); `tinta`, a do texto do tom.
 */
export function mostrador(canvas: HTMLCanvasElement, familia: string, corpo: number, amostras: readonly string[], tinta: string): Mostrador {
  const dpr = densidade();
  const ctx = canvas.getContext("2d")!;
  const letra = `${corpo}px ${familia}`;
  ctx.font = letra;
  const avancos = new Map<string, number>();
  const avanco = (c: string) => {
    let a = avancos.get(c);
    if (a === undefined) avancos.set(c, (a = ctx.measureText(c).width));
    return a;
  };
  const caixa = Math.max(...[..."0123456789"].map(avanco));
  const largura = (c: string) => (/\d/.test(c) ? caixa : avanco(c));
  // A linha: do alto do acento ("sáb.") ao pé da vírgula e da barra, com 2 px de folga.
  const topo = Math.ceil(ctx.measureText("Áá").actualBoundingBoxAscent) + 2;
  const alto = topo + Math.ceil(Math.max(ctx.measureText(",/").actualBoundingBoxDescent, corpo * 0.12)) + 2;
  type Casa = { c: string; x: number; y: number; w: number };
  type Faixa = { x: number; y: number; w: number; novo: Casa[]; velho: Casa[] };
  const dispor = (texto: string) => {
    const casas: Casa[] = [];
    texto.split("\n").forEach((linha, l) => {
      let x = 0;
      for (const c of linha) {
        const w = largura(c);
        casas.push({ c, x, y: l * alto + topo, w });
        x += w;
      }
    });
    return casas;
  };
  const W = Math.ceil(Math.max(...amostras.flatMap((t) => t.split("\n").map((l) => [...l].reduce((soma, c) => soma + largura(c), 0)))));
  const H = alto * Math.max(...amostras.map((t) => t.split("\n").length));
  canvas.style.width = `${W}px`;
  canvas.style.height = `${H}px`;
  canvas.width = Math.ceil(W * dpr);
  canvas.height = Math.ceil(H * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.font = letra;
  ctx.fillStyle = tinta;

  let atual: Casa[] = [];
  let faixas: Faixa[] = [];
  let inicio = 0;
  let pedido = 0;

  const pintar = (casas: Casa[]) => {
    for (const { c, x, y, w } of casas) ctx.fillText(c, x + (w - avanco(c)) / 2, y);
  };

  function quadro(agora: number) {
    const p = (agora - inicio) / TROCA_MS;
    // O fim da troca limpa o canvas e pinta o texto inteiro: o clearRect da caixa, em x fracionário, come a borda
    // suavizada da letra vizinha, e só a casa trocada repintada deixava uma costura de 1 px (18/10, /orcamento).
    if (p >= 1) {
      ctx.clearRect(0, 0, W, H);
      pintar(atual);
      return false;
    }
    for (const f of faixas) {
      const y0 = f.y - topo;
      ctx.clearRect(f.x, y0, f.w, alto);
      // As casas do pontilhado que ainda mostram o algarismo velho: as de limiar de Bayer acima do avanço.
      const velho = new Path2D();
      for (let j = 0; j * CASA_DA_TROCA < alto; j++) {
        for (let i = 0; i * CASA_DA_TROCA < f.w; i++) if (bayer(i, j) > p) velho.rect(f.x + i * CASA_DA_TROCA, y0 + j * CASA_DA_TROCA, CASA_DA_TROCA, CASA_DA_TROCA);
      }
      const novo = new Path2D();
      novo.rect(f.x, y0, f.w, alto);
      novo.addPath(velho);
      ctx.save();
      ctx.clip(novo, "evenodd");
      pintar(f.novo);
      ctx.restore();
      ctx.save();
      ctx.clip(velho);
      pintar(f.velho);
      ctx.restore();
    }
    return true;
  }

  return {
    base: topo,
    escrever(texto, animar = true) {
      const casas = dispor(texto);
      if (casas.length === atual.length && casas.every((c, k) => c.c === atual[k].c)) return;
      // A troca em curso termina antes da nova, e as faixas novas se medem contra o que está pintado. Até 18/10, a casa
      // que ainda se dissolvia e não mudava de novo ficava no meio, e o número mentia no arraste e nas setas (a revisão
      // de O trabalho, P1: "11:20" com o "2" meio dissolvido, no lugar de "21:20").
      if (pedido) {
        cancelAnimationFrame(pedido);
        pedido = 0;
        quadro(inicio + TROCA_MS);
      }
      const anterior = atual;
      atual = casas;
      const parado = document.documentElement.classList.contains("ambiente-pausado") || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!animar || parado || !anterior.length) {
        faixas = [];
        ctx.clearRect(0, 0, W, H);
        pintar(atual);
        return;
      }
      // As faixas que mudam: as casas trocadas, se o desenho é o mesmo (as mesmas larguras); a linha inteira, se não.
      const mesmo = anterior.length === atual.length && anterior.every((c, k) => c.w === atual[k].w && c.y === atual[k].y);
      faixas = mesmo
        ? atual.flatMap((c, k) => (c.c === anterior[k].c ? [] : [{ x: c.x, y: c.y, w: c.w, novo: [c], velho: [anterior[k]] }]))
        : [...new Set(atual.map((c) => c.y))].map((y) => ({ x: 0, y, w: W, novo: atual.filter((c) => c.y === y), velho: anterior.filter((c) => c.y === y) }));
      inicio = performance.now();
      const passo = (t: number) => {
        pedido = quadro(t) ? requestAnimationFrame(passo) : 0;
      };
      passo(inicio);
    },
    parar() {
      cancelAnimationFrame(pedido);
    },
  };
}

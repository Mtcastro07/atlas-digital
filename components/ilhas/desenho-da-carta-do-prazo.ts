import { TRECHOS_DA_TRENA, estacoes, type ContaDoPrazo } from "@/components/ilhas/carta-do-prazo";
import { diaDeTrabalho, hojeEmNiteroi, meiaNoiteEmNiteroi } from "@/lib/prazo";
import { alturaDoSol, type Lugar } from "@/lib/sol";
import { bayer, densidade, novoLote } from "@/lib/traco-e-ponto";

export { familiaDoTitulo, mostrador } from "@/lib/traco-e-ponto";

/**
 * O desenho da carta do prazo (desde 17/10, a direção final do Atlas Digital: seções 2.7 e 2.8, e a seção 3, itens 4 e
 * 17). Fica num pedaço à parte, que a ilha (ilhas/carta-do-prazo.tsx) importa só quando a carta chega perto da tela:
 * fora do script inicial da página. Duas escalas da mesma convenção, e não o mesmo bloco:
 * - os dias (o início): um dia de Niterói por coluna, de 0 a 24 h, e embaixo o rumo das etapas;
 * - as horas (O trabalho): a folha das primeiras 72 horas, um dia por faixa, com o marcador do briefing, e embaixo a
 *   trena dos 15 dias úteis, como a barra de escala da carta;
 * - e, em O trabalho, a faixa das etapas, de cima para baixo, cada trecho na unidade que ele mede.
 * A gramática (seção 1.1): o traço é o que já está gravado (o firme, o que já passou, o Sol de hoje que já foi); o ponto
 * de tela é o que a carta calcula (o Sol dos próximos dias, a janela da publicação); a hachura de buril é o dia fora da
 * conta dos dias úteis (sábado, domingo e feriado nacional). O Sol: um ponto a cada 20 minutos, pela altura dele sobre
 * Niterói (lib/sol.ts), em pontilhado ordenado (a matriz de Bayer, lib/traco-e-ponto.ts). Os rótulos ficam de 12 a
 * 13,5 px (nada desenhado abaixo de 12) e, sobre o desenho, com o halo de carta (o contorno na cor do fundo).
 */

const DIA = 86_400_000;
const GRAU = Math.PI / 180;
/** As tintas da tela que não são do texto (seção 2.1): o ponto aceso, o metal do traço e o fundo do halo. */
const TELA_LUZ = "#fbf1de";
const BRONZE = "#d9a76b";
const BRILHO = "#f1d3a1";
const GRAVADO = "#c08a4a";
const HALO = "#0b2340";

/** A luz de uma casa de 20 minutos, de 0 a 1, pela altura do Sol: do crepúsculo civil (−6°) ao Sol a pino. */
const luz = (altura: number) => (altura >= 0 ? 0.14 + 0.86 * Math.sin(altura * GRAU) ** 0.9 : altura > -6 ? 0.14 * (1 + altura / 6) : 0);

const semana = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", weekday: "short" });
const mes = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", month: "short" });
const horaEMinuto = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
/** "sáb", "17" e "1 nov": o cabeçalho de um dia. */
const nomeDoDia = (dia: Date) => semana.format(dia).replace(".", "");
const numeroDoDia = (dia: Date) => (dia.getUTCDate() === 1 ? `1 ${mes.format(dia).replace(".", "")}` : String(dia.getUTCDate()));
/** O nome do feriado em uma linha ou, quando passa de 13 letras, em duas, na última palavra ("Consciência", "Negra"). */
const emLinhas = (nome: string) => (nome.length <= 13 || !nome.includes(" ") ? [nome] : [nome.slice(0, nome.lastIndexOf(" ")), nome.slice(nome.lastIndexOf(" ") + 1)]);
/** "2/11": o dia e o mês, sem zero à esquerda. */
const diaBarraMes = (dia: Date) => `${dia.getUTCDate()}/${dia.getUTCMonth() + 1}`;

/** O canvas na densidade do aparelho (até 2), do tamanho pedido, limpo; as medidas seguem em px da página. */
function preparar(canvas: HTMLCanvasElement, largura: number, altura: number) {
  const dpr = densidade();
  canvas.style.width = `${largura}px`;
  canvas.style.height = `${altura}px`;
  const [w, h] = [Math.round(largura * dpr), Math.round(altura * dpr)];
  if (canvas.width !== w || canvas.height !== h) [canvas.width, canvas.height] = [w, h];
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, largura, altura);
  return ctx;
}

/** A escrita do canvas, na família do texto (o Inter, que o canvas herda da página) e nas tintas do tom. */
function escrita(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const estilo = getComputedStyle(canvas);
  const familia = estilo.fontFamily;
  const tinta = estilo.getPropertyValue("--foreground").trim() || "#f3efec";
  const apagado = estilo.getPropertyValue("--muted-foreground").trim() || "#aebdcd";
  ctx.textBaseline = "alphabetic";
  /** Um rótulo: o peso, o corpo em px (12 a 13,5), a tinta; com `halo`, o contorno de 4 px na cor do fundo por baixo. */
  const texto = (s: string, x: number, y: number, peso: number, corpo: number, cor: string, alinhar: CanvasTextAlign = "left", halo = false) => {
    ctx.font = `${peso} ${corpo}px ${familia}`;
    ctx.textAlign = alinhar;
    if (halo) {
      ctx.lineJoin = "round";
      ctx.lineWidth = 4;
      ctx.strokeStyle = HALO;
      ctx.strokeText(s, x, y);
    }
    ctx.fillStyle = cor;
    ctx.fillText(s, x, y);
  };
  /** A estação: o nome na tinta (13,5 px, 600) e o valor embaixo, no apagado (13 px). */
  const estacao = (x: number, y: number, [nome, valor]: readonly [string, string], alinhar: CanvasTextAlign) => {
    texto(nome, x, y, 600, 13.5, tinta, alinhar);
    texto(valor, x, y + 18, 400, 13, apagado, alinhar);
  };
  /** A largura de uma estação: a da mais longa das duas linhas. */
  const larguraDaEstacao = ([nome, valor]: readonly [string, string]) => {
    ctx.font = `600 13.5px ${familia}`;
    const a = ctx.measureText(nome).width;
    ctx.font = `400 13px ${familia}`;
    return Math.max(a, ctx.measureText(valor).width);
  };
  /** Os rótulos de uma linha que não se tocam: cada um na primeira forma que cabe sem tocar os já postos (a `folga` px)
   *  nem passar das bordas (0 e `fim`); o que não cabe em nenhuma sai. A ordem dos pedidos é a da importância. */
  const semTocar = (fim: number, folga: number) => {
    const postos: [number, number][] = [];
    return (formas: readonly string[], x: number, y: number, peso: number, corpo: number, cor: string, alinhar: CanvasTextAlign) => {
      ctx.font = `${peso} ${corpo}px ${familia}`;
      for (const s of formas) {
        const w = ctx.measureText(s).width;
        const a = alinhar === "left" ? x : alinhar === "right" ? x - w : x - w / 2;
        if (a < 0 || a + w > fim || postos.some(([p, q]) => a < q + folga && a + w > p - folga)) continue;
        postos.push([a, a + w]);
        texto(s, x, y, peso, corpo, cor, alinhar);
        return;
      }
    };
  };
  return { texto, estacao, larguraDaEstacao, semTocar, tinta, apagado };
}

/** O anel da estação: o aro em bronze aceso e o miolo na cor da tela; `k`, a escala (a letra do leitor, na faixa). */
function anel(ctx: CanvasRenderingContext2D, x: number, y: number, k = 1) {
  ctx.lineWidth = 1.6 * k;
  ctx.strokeStyle = BRILHO;
  ctx.beginPath();
  ctx.arc(x, y, 5.5 * k, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = HALO;
  ctx.beginPath();
  ctx.arc(x, y, 4 * k, 0, Math.PI * 2);
  ctx.fill();
}

/** A hachura de buril num retângulo: o dia fora da conta dos dias úteis. */
function hachura(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.beginPath();
  for (let k = -h; k < w; k += 7) {
    ctx.moveTo(x + k, y + h);
    ctx.lineTo(x + k + h, y);
  }
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgb(174 189 205 / 0.24)";
  ctx.stroke();
  ctx.restore();
}

/** As revisões: o traço que se abre em casas (de n = 0, o traço, a quase n = 1, o ponto), de `a` a `b`. */
function seAbre(caminho: Path2D, a: number, b: number, fixo: number, vertical = false) {
  const passo = 7;
  const n = Math.max(1, Math.round((b - a) / passo));
  for (let k = 0; k < n; k++) {
    const c = a + (k + 0.5) * passo;
    const meio = (passo * (1 - k / n) * 0.92) / 2;
    if (vertical) {
      caminho.moveTo(fixo, c - meio);
      caminho.lineTo(fixo, c + meio + 0.01);
    } else {
      caminho.moveTo(c - meio, fixo);
      caminho.lineTo(c + meio + 0.01, fixo);
    }
  }
}

/**
 * A carta dos dias (o início): um dia de Niterói por coluna, de 0 a 24 h (na mesa); no celular (`transposta`, abaixo
 * de 768 px), um dia por linha, e as estações vão para a legenda em HTML, embaixo (ilhas/carta-do-prazo.tsx), que
 * cresce com a letra do leitor. `largura` é a da carta até a borda da tela que sangra (na mesa, os dias continuam
 * além da borda).
 */
export function cartaDosDias(canvas: HTMLCanvasElement, { largura: W, conta, lugar, transposta: celular }: { largura: number; conta: ContaDoPrazo; lugar: Lugar; transposta: boolean }) {
  const { agora, dia, uteis, util } = conta;
  const tAgora = agora.getTime();
  const meiaNoite = meiaNoiteEmNiteroi(agora).getTime();
  const [u7, u15] = [uteis[6], uteis[14]];
  const CASAS = 72;
  // Na mesa, a coluna se ajusta para caberem 24 dias e mais um pedaço, cortado pela borda: os dias continuam. Desde
  // 18/10, sem o piso de 44 px: a 768 e a 1.024, ele deixava 15 e 21 dias, e a publicação saía cortada pela borda.
  const g0 = celular ? 64 : 58;
  const topo = celular ? 34 : 54;
  const coluna = Math.max(24, Math.min(60, (W - g0) / 24.4));
  const linha = 22;
  const DIAS = celular ? u15 + 2 : Math.ceil((W - g0) / coluna);
  const larguraDaGrade = W - g0 - 26;
  const alturaDaGrade = celular ? DIAS * linha : 360;
  const H = topo + alturaDaGrade + (celular ? 12 : 132);
  const ctx = preparar(canvas, W, H);
  const { texto, estacao, larguraDaEstacao, semTocar, tinta, apagado } = escrita(canvas, ctx);
  /** A posição de um instante: o dia `d` e o minuto do dia. */
  const pos = (d: number, minuto: number) =>
    celular ? ([g0 + (minuto / 1440) * larguraDaGrade, topo + d * linha] as const) : ([g0 + d * coluna, topo + (minuto / 1440) * alturaDaGrade] as const);

  // A hachura de buril: sábado, domingo e feriado. Na mesa, o nome do feriado deitado na noite da coluna.
  for (let d = 0; d < DIAS; d++) {
    if (util(d)) continue;
    const [x, y] = pos(d, 0);
    if (celular) hachura(ctx, g0, y + 1, larguraDaGrade, linha - 3);
    else hachura(ctx, x + 1, topo, coluna - 4, alturaDaGrade);
  }

  // O Sol: um ponto a cada 20 minutos, pela altura dele (Bayer); o que já passou de hoje se grava em traço de bronze.
  const lote = novoLote();
  const passado = lote.caminho(GRAVADO, 1.3);
  const futuro = lote.caminho(TELA_LUZ, celular ? 1.7 : 1.9);
  const p = celular ? 4.5 : 5;
  for (let d = 0; d < DIAS; d++) {
    for (let k = 0; k < CASAS; k++) {
      const t = meiaNoite + (d * 1440 + k * 20 + 10) * 60_000;
      const valor = luz(alturaDoSol(lugar, new Date(t)));
      if (!valor) continue;
      const ja = t + 10 * 60_000 <= tAgora;
      const n = celular ? Math.floor((linha - 4) / p) : Math.floor((coluna - 6) / p);
      for (let i = 0; i < n; i++) {
        if (celular ? valor < bayer(k, i + d * 2) : valor < bayer(i, k + d * 2)) continue;
        if (celular) {
          const [x, y] = [g0 + (k + 0.5) * (larguraDaGrade / CASAS), topo + d * linha + 2 + (i + 0.5) * p];
          if (ja) {
            passado.moveTo(x, y - p / 2);
            passado.lineTo(x, y + p / 2);
          } else {
            futuro.moveTo(x, y);
            futuro.lineTo(x + 0.01, y);
          }
        } else {
          const [x, y] = [g0 + d * coluna + 2 + (i + 0.5) * p, topo + (k + 0.5) * (alturaDaGrade / CASAS)];
          if (ja) {
            passado.moveTo(x - p / 2, y);
            passado.lineTo(x + p / 2, y);
          } else {
            futuro.moveTo(x, y);
            futuro.lineTo(x + 0.01, y);
          }
        }
      }
    }
  }
  lote.pintar(ctx);

  // Os eixos: os dias e as horas. Com a coluna estreita (abaixo de 34 px: a 768 e deitado), os nomes se tocavam: em
  // cima, só hoje, as segundas e o mês que começa ("nov"); embaixo, o número do dia.
  const estreita = coluna < 34;
  for (let d = 0; d < DIAS; d++) {
    const data = dia(d);
    const [x, y] = pos(d, 0);
    const [peso, cor] = d === 0 ? [700, tinta] : [500, apagado];
    if (celular) {
      texto(`${nomeDoDia(data)} ${numeroDoDia(data)}`, 0, y + 15, peso, 12, cor);
      // O feriado, na noite do fim da linha, com o halo sobre a hachura, como na mesa (até 18/10, só a hachura: a revisão).
      const nome = util(d) ? undefined : conta.nomeDoFeriado(data);
      if (nome) texto(nome, g0 + larguraDaGrade - 4, y + 15, 500, 12, apagado, "right", true);
    } else {
      const mesNovo = estreita && d > 0 && data.getUTCDate() === 1;
      const cima = mesNovo ? mes.format(data).replace(".", "") : !estreita || d === 0 || data.getUTCDay() === 1 ? nomeDoDia(data) : "";
      texto(cima, x + coluna / 2 - 2, topo - 28, peso, 12, cor, "center");
      texto(estreita ? String(data.getUTCDate()) : numeroDoDia(data), x + coluna / 2 - 2, topo - 12, peso, 12, cor, "center");
      const nome = util(d) ? undefined : conta.nomeDoFeriado(dia(d));
      if (nome) {
        // Deitado, na noite da coluna (das 19 às 24 h, onde não há Sol), com o halo sobre a hachura.
        ctx.save();
        ctx.translate(x + coluna / 2 - 2, topo + (alturaDaGrade * 21.6) / 24);
        ctx.rotate(-Math.PI / 2);
        emLinhas(nome).forEach((l, i, todas) => texto(l, 0, 4 + (i - (todas.length - 1) / 2) * 14, 500, 12, apagado, "center", true));
        ctx.restore();
      }
    }
  }
  const minutoAgora = (tAgora - meiaNoite) / 60_000;
  const [ax, ay] = pos(0, minutoAgora);
  const hora = horaEMinuto.format(agora);
  if (celular) {
    // A hora de agora primeiro; as das horas, só onde não a tocam nem se tocam, medidas (até 18/10, um limiar fixo de
    // 22 px deixava "20:3024 h" a 390 e "17:524 h" a 320 com a letra a 200%: a revisão, P2).
    const por = semTocar(W, 6);
    por([hora], Math.min(W - 20, Math.max(g0 + 16, ax)), topo - 14, 600, 12, tinta, "center");
    for (const h of [0, 24, 12, 6, 18]) por([`${h} h`], pos(0, h * 60)[0], topo - 14, 500, 12, apagado, h === 0 ? "left" : h === 24 ? "right" : "center");
  } else
    for (const h of [0, 6, 12, 18, 24]) {
      const y = pos(0, h * 60)[1];
      if (Math.abs(y - ay) < 14) continue;
      texto(`${h} h`, g0 - 12, y + 4, 500, 12, apagado, "right");
    }

  // O agora: a linha de hoje, em creme, e a mesma hora nos outros dias, em fio.
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgb(243 239 236 / 0.32)";
  ctx.setLineDash([2, 4]);
  ctx.beginPath();
  if (celular) {
    ctx.moveTo(ax, topo + linha);
    ctx.lineTo(ax, topo + alturaDaGrade);
  } else {
    ctx.moveTo(g0 + coluna, ay);
    ctx.lineTo(W, ay);
  }
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.strokeStyle = tinta;
  ctx.lineWidth = 2;
  ctx.beginPath();
  if (celular) {
    ctx.moveTo(ax, topo - 2);
    ctx.lineTo(ax, topo + linha - 2);
  } else {
    ctx.moveTo(g0 - 4, ay);
    ctx.lineTo(g0 + coluna - 2, ay);
  }
  ctx.stroke();
  if (!celular) texto(hora, g0 - 12, ay + 4, 600, 12, tinta, "right");

  // As 24 horas do rascunho: o firme, em traço de bronze, atravessando a meia-noite.
  ctx.lineCap = "round";
  ctx.strokeStyle = BRONZE;
  ctx.lineWidth = 3;
  ctx.beginPath();
  if (celular) {
    const [ya, yb] = [topo + linha - 3, topo + 2 * linha - 3];
    ctx.moveTo(ax, ya);
    ctx.lineTo(g0 + larguraDaGrade, ya);
    ctx.moveTo(g0, yb);
    ctx.lineTo(ax, yb);
  } else {
    const [xa, xb] = [g0 + coluna - 5, g0 + 2 * coluna - 5];
    ctx.moveTo(xa, ay);
    ctx.lineTo(xa, topo + alturaDaGrade);
    ctx.moveTo(xb, topo);
    ctx.lineTo(xb, ay);
  }
  ctx.stroke();
  if (celular) {
    anel(ctx, ax, topo + linha - 3);
    anel(ctx, ax, topo + 2 * linha - 3);
  } else {
    anel(ctx, g0 + coluna - 5, ay);
    anel(ctx, g0 + 2 * coluna - 5, ay);
  }

  // O rumo: o firme em traço, as revisões no traço que se abre, a publicação num ponto aceso por dia útil (o feriado é
  // falta: o dia dele não tem ponto).
  const xd = (d: number) => (celular ? topo + d * linha + linha / 2 - 2 : g0 + d * coluna + coluna / 2 - 2);
  const yR = celular ? W - 9 : topo + alturaDaGrade + 46;
  ctx.strokeStyle = BRONZE;
  ctx.lineWidth = 3;
  ctx.beginPath();
  if (celular) {
    ctx.moveTo(yR, xd(0));
    ctx.lineTo(yR, xd(1));
  } else {
    ctx.moveTo(xd(0), yR);
    ctx.lineTo(xd(1), yR);
  }
  ctx.stroke();
  // As revisões, do 1º dia útil (até 18/10, do dia 1 do calendário, que pode ser domingo: a revisão).
  const revisoes = new Path2D();
  seAbre(revisoes, xd(uteis[0]), xd(u7), yR, celular);
  ctx.lineWidth = 2.4;
  ctx.stroke(revisoes);
  ctx.fillStyle = TELA_LUZ;
  for (let d = u7; d <= u15; d++) {
    if (!util(d)) continue;
    ctx.beginPath();
    ctx.arc(celular ? yR : xd(d), celular ? xd(d) : yR, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  // Os anéis do briefing e do rascunho no rumo, também no celular (desde 18/10): são a marca da legenda embaixo.
  anel(ctx, celular ? yR : xd(0), celular ? xd(0) : yR);
  anel(ctx, celular ? yR : xd(1), celular ? xd(1) : yR);

  // As estações, com o valor junto (Q18), em volta do rumo; no celular, na legenda em HTML. Com a coluna estreita
  // (768 a 1.100 px), as do meio se afastam da vizinha da esquerda, a 16 px; a 1.440, ficam onde estavam.
  if (celular) return;
  const est = estacoes(conta);
  const [x0, x1] = [xd(0) - 6, xd(1) - 6];
  estacao(x0, yR + 30, est[0], "left");
  estacao(x1, yR - 36, est[1], "left");
  estacao(Math.max((xd(uteis[0]) + xd(u7)) / 2 + 30, x0 + larguraDaEstacao(est[0]) + 16 + larguraDaEstacao(est[2]) / 2), yR + 30, est[2], "center");
  estacao(Math.max((xd(u7) + xd(u15)) / 2, x1 + larguraDaEstacao(est[1]) + 16 + larguraDaEstacao(est[3]) / 2), yR - 36, est[3], "center");
}

/** O que a folha das horas devolve à ilha: onde está o marcador, e o instante sob um ponto do desenho. */
export type Folha = {
  /** O centro do anel do briefing, em px do canvas. */
  marcador: readonly [number, number];
  /** O pé das faixas, em px do canvas: abaixo dele, a trena, que é régua, e não controle. */
  fim: number;
  /** O instante (ms) sob o ponto (x, y) do canvas, em casas de 20 minutos; a ilha o prende entre o agora e as 48 h. */
  instante(x: number, y: number): number;
};

/**
 * A folha das 72 horas (O trabalho): hoje, amanhã e depois, um dia por faixa, de 20 em 20 minutos, com a noite real
 * de Niterói (a casa sem Sol fica escura), o marcador da visita e do briefing (arrastado pela ilha) e as 24 horas do
 * rascunho, atravessando a meia-noite; embaixo, a trena dos 15 dias úteis, contada do dia do briefing, com as datas e
 * os feriados. `gravadoAte` é até onde o tempo já gravou o Sol (o agora; na carga, a passagem o leva do começo do dia
 * até ele, em 16 degraus); `rascunho`, quanto das 24 horas já se gravou depois de o briefing mudar de lugar (de 0 a 1;
 * a passagem do arraste). No `celular` (abaixo de 768 px), as faixas mais baixas, as horas de 6 em 6, e os trechos da
 * trena na legenda em HTML, embaixo (ilhas/carta-do-prazo.tsx), que cresce com a letra do leitor.
 */
export function folhaDasHoras(
  canvas: HTMLCanvasElement,
  {
    largura: L,
    agora,
    briefing,
    gravadoAte,
    rascunho = 1,
    conta,
    lugar,
    celular,
  }: { largura: number; agora: number; briefing: number; gravadoAte: number; rascunho?: number; conta: ContaDoPrazo; lugar: Lugar; celular: boolean },
): Folha {
  const inicio = meiaNoiteEmNiteroi(new Date(agora)).getTime();
  const g0 = celular ? 50 : 84;
  const gw = L - g0 - 4;
  const topo = 28;
  const banda = celular ? 52 : 76;
  const vao = 38;
  const yDa = (r: number) => topo + r * (banda + vao);
  const fimDaGrade = yDa(3);
  const yT = fimDaGrade + 26;
  const H = yT + (celular ? 62 : 112);
  const ctx = preparar(canvas, L, H);
  const { texto, estacao, larguraDaEstacao, tinta, apagado } = escrita(canvas, ctx);
  const xDe = (minuto: number) => g0 + (minuto / 1440) * gw;
  // As três faixas são hoje, amanhã e depois (o dia do agora); a trena conta do dia do briefing (`conta`).
  const dias = [0, 1, 2].map((r) => {
    const data = hojeEmNiteroi(new Date(agora));
    data.setUTCDate(data.getUTCDate() + r);
    return data;
  });

  // A hachura: o dia fora da conta (sábado, domingo e feriado), na faixa inteira.
  dias.forEach((data, r) => {
    if (!diaDeTrabalho(data)) hachura(ctx, g0, yDa(r), gw, banda);
  });

  // As horas: um traço por hora em cima de cada faixa, maior a cada três; os números em cima da primeira.
  ctx.strokeStyle = "rgb(174 189 205 / 0.5)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let r = 0; r < 3; r++)
    for (let h = 0; h <= 24; h++) {
      const x = Math.round(xDe(h * 60)) + 0.5;
      ctx.moveTo(x, yDa(r) - (h % 3 ? 3 : 6));
      ctx.lineTo(x, yDa(r) - 1);
    }
  ctx.stroke();
  const xAgora = xDe((agora - inicio) / 60_000);
  for (let h = 0; h <= 24; h += celular ? 6 : 3) {
    const x = xDe(h * 60);
    if (Math.abs(x - xAgora) < 40) continue;
    texto(`${h} h`, x, topo - 12, 500, 12, apagado, h === 0 ? "left" : h === 24 ? "right" : "center");
  }

  // O Sol, de 20 em 20 minutos, pela altura (Bayer): três pontos por casa na mesa; o que o tempo já gravou, em traço.
  const lote = novoLote();
  const passado = lote.caminho(GRAVADO, 1.3);
  const futuro = lote.caminho(TELA_LUZ, celular ? 1.5 : 1.8);
  const largura = gw / 72;
  const nx = Math.max(1, Math.round(largura / 4.2));
  const px = largura / nx;
  const ny = Math.floor((banda - 6) / 4.4);
  const py = (banda - 6) / ny;
  for (let r = 0; r < 3; r++)
    for (let k = 0; k < 72; k++) {
      const t = inicio + r * DIA + (k * 20 + 10) * 60_000;
      const valor = luz(alturaDoSol(lugar, new Date(t)));
      if (!valor) continue;
      const ja = t + 10 * 60_000 <= gravadoAte;
      for (let i = 0; i < nx; i++)
        for (let j = 0; j < ny; j++) {
          if (valor < bayer(k * nx + i, j)) continue;
          const [x, y] = [g0 + (k * nx + i + 0.5) * px, yDa(r) + 3 + (j + 0.5) * py];
          if (ja) {
            passado.moveTo(x - px / 2, y);
            passado.lineTo(x + px / 2, y);
          } else {
            futuro.moveTo(x, y);
            futuro.lineTo(x + 0.01, y);
          }
        }
    }
  lote.pintar(ctx);

  // Os dias, na margem: o dia da semana na tinta (hoje, mais forte), a data e o feriado no apagado.
  dias.forEach((data, r) => {
    const y = yDa(r) + banda / 2;
    const nome = conta.nomeDoFeriado(data);
    const extra = nome && !celular ? emLinhas(nome) : [];
    const y0 = y - 6 - extra.length * 8;
    texto(`${nomeDoDia(data)}.`, 0, y0, r === 0 ? 700 : 600, 13, tinta);
    texto(`${String(data.getUTCDate()).padStart(2, "0")}/${String(data.getUTCMonth() + 1).padStart(2, "0")}`, 0, y0 + 17, 500, 12, apagado);
    extra.forEach((l, i) => texto(l, 0, y0 + 33 + i * 15, 500, 12, apagado));
  });

  // O agora: a linha creme na faixa de hoje, com a hora em cima; a mesma hora, em fio, nas outras duas.
  ctx.strokeStyle = "rgb(243 239 236 / 0.32)";
  ctx.setLineDash([2, 4]);
  ctx.beginPath();
  for (const r of [1, 2]) {
    ctx.moveTo(xAgora, yDa(r));
    ctx.lineTo(xAgora, yDa(r) + banda);
  }
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.strokeStyle = tinta;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(xAgora, yDa(0) - 6);
  ctx.lineTo(xAgora, yDa(0) + banda);
  ctx.stroke();
  texto(horaEMinuto.format(new Date(agora)), Math.min(L - 18, Math.max(g0 + 16, xAgora)), topo - 12, 600, 12, tinta, "center");

  // As 24 horas do rascunho, do marcador ao mesmo minuto do dia seguinte, sob as faixas: o firme, em traço de bronze.
  // A passagem do arraste: com o briefing num lugar novo, as 24 horas chegam em pontos (o que a folha acabou de
  // calcular) e se gravam em traço, do briefing ao fim, até `rascunho` (de 0 a 1).
  const rb = Math.floor((briefing - inicio) / DIA);
  const xb = xDe(((briefing - inicio) % DIA) / 60_000);
  const sob = (r: number) => yDa(r) + banda + 7;
  const segmentos: [number, number, number][] = [[xb, g0 + gw, sob(rb)]];
  if (rb + 1 < 3) segmentos.push([g0, xb, sob(rb + 1)]);
  let resto = rascunho * gw;
  const firme = new Path2D();
  const calculado = new Path2D();
  for (const [a, b, y] of segmentos) {
    const corte = Math.min(b, a + Math.max(0, resto));
    resto -= b - a;
    if (corte > a) {
      firme.moveTo(a, y);
      firme.lineTo(corte, y);
    }
    for (let x = corte + 3.5; x < b; x += 7) {
      calculado.moveTo(x, y);
      calculado.lineTo(x + 0.01, y);
    }
  }
  ctx.lineCap = "round";
  ctx.lineWidth = 3;
  ctx.strokeStyle = BRONZE;
  ctx.stroke(firme);
  ctx.strokeStyle = TELA_LUZ;
  ctx.stroke(calculado);
  anel(ctx, xb, sob(rb));
  if (rb + 1 < 3) anel(ctx, xb, sob(rb + 1));
  // O rótulo do marcador fica do lado que tem lugar, e nunca passa da borda da folha (a 320 px, "Rascunho, 24 horas
  // depois" saía pela esquerda); a 18 px do anel, fora do anel de foco do marcador (que cobria o "V" de "Visita"). A
  // linha de base a 20 px do traço: a 23, o "g", o "p" e a vírgula encostavam nos tiques da faixa de baixo (a revisão).
  const rotuloDoMarcador = (s: string, y: number) => {
    ctx.font = `600 13.5px ${getComputedStyle(canvas).fontFamily}`;
    const w = ctx.measureText(s).width;
    const x = xb > g0 + gw * 0.72 ? Math.max(xb - 18, w) : Math.min(xb + 18, L - w);
    texto(s, x, y, 600, 13.5, tinta, xb > g0 + gw * 0.72 ? "right" : "left");
  };
  rotuloDoMarcador("Visita e briefing", sob(rb) + 20);
  if (rb + 1 < 3) rotuloDoMarcador("Rascunho, 24 horas depois", sob(rb + 1) + 20);

  // A trena dos 15 dias úteis, contada do dia do briefing: a barra de escala da folha. Em cima, os trechos (o anel do
  // briefing no dia 0, as revisões que se abrem, um ponto aceso por dia útil da publicação); embaixo, a data de cada dia
  // útil e, no vão em que caem, os feriados. O rascunho não entra aqui: as 24 horas são corridas, e esta escala é de
  // dias úteis (até 17/10, o traço do rascunho ia do dia 0 ao 1, a segunda, e a leitura dizia domingo: o fechamento B).
  const xU = (k: number) => g0 + (k / 15) * gw;
  const yTrecho = yT + (celular ? 14 : 44);
  const yRegua = yTrecho + 14;
  ctx.strokeStyle = "rgb(243 239 236 / 0.32)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(xU(0), yTrecho);
  ctx.lineTo(xU(1), yTrecho);
  ctx.stroke();
  ctx.strokeStyle = BRONZE;
  const revisoes = new Path2D();
  seAbre(revisoes, xU(1), xU(7), yTrecho);
  ctx.lineWidth = 2.4;
  ctx.stroke(revisoes);
  ctx.fillStyle = TELA_LUZ;
  for (let k = 7; k <= 15; k++) {
    ctx.beginPath();
    ctx.arc(xU(k), yTrecho, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = tinta;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(xU(0), yRegua + 0.5);
  ctx.lineTo(xU(15), yRegua + 0.5);
  for (let k = 0; k <= 15; k++) {
    const x = Math.round(xU(k)) + 0.5;
    ctx.moveTo(x, yRegua);
    ctx.lineTo(x, yRegua + (k % 5 ? 5 : 10));
  }
  ctx.stroke();
  const uteis = [0, ...conta.uteis];
  const datas = uteis.map((d) => conta.dia(d));
  datas.forEach((data, k) => {
    if (celular && k % 5) return;
    const novoMes = k === 0 || data.getUTCMonth() !== datas[k - 1].getUTCMonth();
    // O mês só onde ele começa ou troca, e no fim ("17/10", "3/11", "9/11"): 58 px por dia útil não cabem "30 de out.".
    const rotulo = novoMes || k === 15 || celular ? diaBarraMes(data) : String(data.getUTCDate());
    texto(rotulo, xU(k), yRegua + 26, k === 0 || novoMes ? 600 : 500, 12, k === 0 || novoMes ? tinta : apagado, k === 0 ? "left" : k === 15 ? "right" : "center");
  });
  for (const f of conta.feriados) {
    // O vão entre o dia útil antes do feriado e o seguinte; a marca de falta no meio dele, sobre a régua.
    const k = uteis.findIndex((d) => d > f.d) - 1;
    const x = (xU(k) + xU(k + 1)) / 2;
    ctx.strokeStyle = apagado;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - 3, yRegua - 4);
    ctx.lineTo(x + 3, yRegua + 4);
    ctx.stroke();
    if (!celular) texto(`${diaBarraMes(conta.dia(f.d))}, ${f.nome}`, x, yRegua + 44, 500, 12, apagado, "center");
  }
  anel(ctx, xU(0), yTrecho);
  // Com a folha estreita (768 a 1.024 px), as revisões se afastam do briefing, a 16 px (a 768, "Briefing completo"
  // entrava em "Revisões"); a 1.440, ficam onde estavam.
  if (!celular) {
    const [a, b, c] = TRECHOS_DA_TRENA;
    estacao(xU(0), yT, a, "left");
    estacao(Math.max(xU(4), xU(0) + larguraDaEstacao(a) + 16 + larguraDaEstacao(b) / 2), yT, b, "center");
    estacao(xU(11), yT, c, "center");
  }

  return {
    marcador: [xb, sob(rb)],
    fim: fimDaGrade,
    instante(x, y) {
      const r = Math.min(2, Math.max(0, Math.floor((y - topo + vao / 2) / (banda + vao))));
      const minuto = Math.min(1440, Math.max(0, ((x - g0) / gw) * 1440));
      return inicio + r * DIA + Math.round(minuto / 20) * 20 * 60_000;
    },
  };
}

/** O trecho de uma etapa na faixa: o topo e o alto do item dela (o <li>), em px do canvas. */
export type Trecho = { topo: number; alto: number };

/**
 * A faixa das etapas (O trabalho, desde 17/10; a direção final, seção 3, item 18): as quatro etapas numa faixa só, de
 * cima para baixo, cada trecho ao lado do texto da sua etapa (`trechos`, os itens da lista) e cada um na unidade que
 * ele mede, escrita na margem: a visita, num fio sem escala (antes do briefing completo, o prazo não corre); o
 * rascunho, 24 linhas gravadas, uma por hora, do briefing ao mesmo minuto do dia seguinte, com a meia-noite; as
 * revisões, uma fileira por dia, do 1º ao 7º dia útil, no traço que se abre (uma casa por dia útil, cada uma mais
 * curta, até o ponto); a publicação, uma fileira por dia, do 8º ao 15º dia útil, um ponto aceso por dia útil. O
 * sábado, o domingo e o feriado ficam em hachura, sem marca: a falta. A conta é a do briefing (`conta`), o de agora
 * ou o arrastado na folha de cima. `k` é a letra do leitor (a 200%, 2): a faixa e os rótulos crescem com ela.
 */
export function fitaDasEtapas(
  canvas: HTMLCanvasElement,
  { largura: W, altura: H, trechos, briefing, conta, k }: { largura: number; altura: number; trechos: readonly Trecho[]; briefing: number; conta: ContaDoPrazo; k: number },
) {
  const ctx = preparar(canvas, W, H);
  const { texto, tinta, apagado } = escrita(canvas, ctx);
  // No celular, a coluna é estreita: a data sem o dia da semana, e o feriado só pela hachura (o nome vem na data viva).
  const estreita = W < 150 * k;
  const banda = (estreita ? 28 : 56) * k;
  const x0 = W - banda;
  const centro = x0 + banda / 2;
  const xr = x0 - (estreita ? 8 : 14) * k;
  const rotulo = (s: string, y: number, forte = false) => texto(s, xr, y + 4 * k, forte ? 600 : 500, 12 * k, forte ? tinta : apagado, "right");
  const data = (dia: Date) => (estreita ? diaBarraMes(dia) : `${nomeDoDia(dia)}. ${diaBarraMes(dia)}`);
  const instante = (t: number) => (estreita ? horaEMinuto.format(new Date(t)) : `${data(hojeEmNiteroi(new Date(t)))}, ${horaEMinuto.format(new Date(t))}`);
  const [visita, rascunho, revisoes, publicacao] = trechos;

  // A visita e o briefing: o anel da visita à altura do nome da etapa e o fio, sem escala, até o briefing completo.
  const yVisita = visita.topo + 14 * k;
  const yBriefing = rascunho.topo;
  const yEntrega = rascunho.topo + rascunho.alto;
  ctx.strokeStyle = "rgb(243 239 236 / 0.32)";
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 4]);
  ctx.beginPath();
  ctx.moveTo(centro, yVisita);
  ctx.lineTo(centro, yBriefing);
  ctx.stroke();
  ctx.setLineDash([]);

  // O rascunho: uma linha gravada por hora, as 24, e a meia-noite em fio, com o dia que começa.
  const hora = (yEntrega - yBriefing) / 24;
  ctx.lineCap = "round";
  ctx.strokeStyle = BRONZE;
  ctx.lineWidth = Math.min(2 * k, hora * 0.3);
  ctx.beginPath();
  for (let h = 0; h < 24; h++) {
    const y = yBriefing + (h + 0.5) * hora;
    ctx.moveTo(x0 + 4 * k, y);
    ctx.lineTo(W - 4 * k, y);
  }
  ctx.stroke();
  const meiaNoite = meiaNoiteEmNiteroi(new Date(briefing), 1).getTime();
  const yMeiaNoite = yBriefing + ((meiaNoite - briefing) / 3_600_000) * hora;
  if (yMeiaNoite - yBriefing > 16 * k && yEntrega - yMeiaNoite > 16 * k) {
    ctx.strokeStyle = tinta;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x0 - 6 * k, Math.round(yMeiaNoite) + 0.5);
    ctx.lineTo(W, Math.round(yMeiaNoite) + 0.5);
    ctx.stroke();
    rotulo(estreita ? "0 h" : `${data(hojeEmNiteroi(new Date(meiaNoite)))}, 0 h`, yMeiaNoite);
  }
  anel(ctx, centro, yVisita, k);
  anel(ctx, centro, yBriefing, k);
  anel(ctx, centro, yEntrega, k);
  rotulo(instante(briefing), yBriefing, true);
  rotulo(instante(briefing + DIA), yEntrega, true);

  // As revisões e a publicação: um dia por fileira; o dia fora da conta, em hachura, sem marca.
  const [u1, u7, u15] = [conta.uteis[0], conta.uteis[6], conta.uteis[14]];
  const fileiras = ({ topo, alto }: Trecho, de: number, ate: number, vao: number, marca: (y: number, i: number) => void) => {
    const passo = (alto - vao) / (ate - de + 1);
    let i = 0;
    for (let d = de; d <= ate; d++) {
      const y = topo + vao + (d - de + 0.5) * passo;
      const dia = conta.dia(d);
      if (conta.util(d)) {
        marca(y, i++);
        rotulo(data(dia), y, d === u7 || d === u15);
      } else {
        hachura(ctx, x0, y - passo / 2 + 1, banda, passo - 2);
        rotulo((!estreita && conta.nomeDoFeriado(dia)) || data(dia), y);
      }
    }
  };
  // O vão entre a entrega do rascunho e o 1º dia útil: a escala muda ali, das horas aos dias.
  ctx.strokeStyle = BRONZE;
  ctx.lineWidth = 3 * k;
  fileiras(revisoes, u1, u7, 14 * k, (y, i) => {
    const meio = ((1 - i / 6) * (banda - 12 * k)) / 2;
    ctx.beginPath();
    ctx.moveTo(centro - meio, y);
    ctx.lineTo(centro + meio + 0.01, y);
    ctx.stroke();
  });
  // A tinta do ponto a cada fileira: o rótulo da fileira anterior troca o fillStyle.
  fileiras(publicacao, u7 + 1, u15, 0, (y) => {
    ctx.fillStyle = TELA_LUZ;
    ctx.beginPath();
    ctx.arc(centro, y, 3.5 * k, 0, Math.PI * 2);
    ctx.fill();
  });
}

/**
 * A faixa das etapas deitada (O trabalho, abaixo de 1.024 px, desde 18/10; a direção final, seção 4, item 5): no
 * celular, a coluna da faixa ao lado do texto deixava o texto com ~180 px a 390 com a letra a 200%, duas palavras por
 * linha. Cada etapa ganha a sua tira, na largura inteira, entre o nome e o texto (`tiras`: o topo do vão que o CSS
 * reserva sob cada h2, app/digital.css), na mesma convenção da faixa da mesa e na unidade que ela mede: a visita, o fio
 * sem escala até o briefing; o rascunho, as 24 horas, uma linha por hora, com a meia-noite; as revisões e a
 * publicação, uma casa por dia sobre a régua dos dias, com o traço que se abre e o ponto aceso por dia útil, e a
 * hachura no dia fora da conta. Os rótulos ficam embaixo, sem nunca se tocarem nem passarem da borda: os que não cabem
 * saem, pela ordem de importância (o fim, o começo, o resto). `k` é a letra do leitor: a tira e os rótulos crescem com
 * ela (a 200%, 24 px).
 */
export function tirasDasEtapas(
  canvas: HTMLCanvasElement,
  { largura: W, altura: H, tiras, briefing, conta, k }: { largura: number; altura: number; tiras: readonly number[]; briefing: number; conta: ContaDoPrazo; k: number },
) {
  const ctx = preparar(canvas, W, H);
  const { semTocar, tinta, apagado } = escrita(canvas, ctx);
  const raio = 5.5 * k;
  const [xa, xb] = [raio + 1, W - raio - 1];
  /** As medidas de uma tira: o alto e o pé das marcas, o meio delas e a linha de base dos rótulos. */
  const [visita, rascunho, revisoes, publicacao] = tiras.map((topo) => ({ y0: topo + 4 * k, ym: topo + 14 * k, y1: topo + 24 * k, yr: topo + 41 * k }));
  type Pedido = { formas: string[]; x: number; alinhar: CanvasTextAlign; forte?: boolean };
  /** Os rótulos de uma tira, pela ordem dos pedidos, a 8 px um do outro (semTocar). */
  const rotulos = (y: number, pedidos: Pedido[]) => {
    const por = semTocar(W, 8 * k);
    for (const { formas, x, alinhar, forte } of pedidos) por(formas, x, y, forte ? 600 : 500, 12 * k, forte ? tinta : apagado, alinhar);
  };
  const hora = (t: number) => horaEMinuto.format(new Date(t));
  const cheio = (t: number) => `${nomeDoDia(hojeEmNiteroi(new Date(t)))}. ${diaBarraMes(hojeEmNiteroi(new Date(t)))}, ${hora(t)}`;

  // A visita: o anel dela e o fio sem escala até o anel do briefing, com o instante dele.
  ctx.strokeStyle = "rgb(243 239 236 / 0.32)";
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 4]);
  ctx.beginPath();
  ctx.moveTo(xa + raio + 3 * k, visita.ym);
  ctx.lineTo(xb - raio - 3 * k, visita.ym);
  ctx.stroke();
  ctx.setLineDash([]);
  anel(ctx, xa, visita.ym, k);
  anel(ctx, xb, visita.ym, k);
  rotulos(visita.yr, [{ formas: [cheio(briefing), hora(briefing)], x: W, alinhar: "right", forte: true }]);

  // O rascunho: uma linha gravada por hora, as 24, entre o anel do briefing e o da entrega, e a meia-noite em fio.
  const [r0, r1] = [xa + raio + 4 * k, xb - raio - 4 * k];
  const passo = (r1 - r0) / 24;
  ctx.lineCap = "round";
  ctx.strokeStyle = BRONZE;
  ctx.lineWidth = Math.min(2 * k, passo * 0.3);
  ctx.beginPath();
  for (let h = 0; h < 24; h++) {
    const x = r0 + (h + 0.5) * passo;
    ctx.moveTo(x, rascunho.y0 + 3 * k);
    ctx.lineTo(x, rascunho.y1 - 3 * k);
  }
  ctx.stroke();
  const xm = r0 + ((meiaNoiteEmNiteroi(new Date(briefing), 1).getTime() - briefing) / 3_600_000) * passo;
  const meiaNoite = xm > r0 + passo / 2 && xm < r1 - passo / 2;
  if (meiaNoite) {
    ctx.strokeStyle = tinta;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.round(xm) + 0.5, rascunho.y0);
    ctx.lineTo(Math.round(xm) + 0.5, rascunho.y1);
    ctx.stroke();
  }
  anel(ctx, xa, rascunho.ym, k);
  anel(ctx, xb, rascunho.ym, k);
  rotulos(rascunho.yr, [
    { formas: [cheio(briefing + DIA), hora(briefing + DIA)], x: W, alinhar: "right", forte: true },
    { formas: [hora(briefing)], x: 0, alinhar: "left" },
    ...(meiaNoite ? [{ formas: ["0 h"], x: xm, alinhar: "center" as const }] : []),
  ]);

  // As revisões e a publicação: uma casa por dia, sobre a régua dos dias; o dia fora da conta, em hachura, sem marca.
  const dias = (t: typeof visita, de: number, ate: number, marca: (x: number, i: number) => void) => {
    const casa = W / (ate - de + 1);
    ctx.strokeStyle = apagado;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, Math.round(t.y1) + 0.5);
    ctx.lineTo(W, Math.round(t.y1) + 0.5);
    for (let i = 0; i <= ate - de + 1; i++) {
      const x = Math.min(W - 0.5, Math.round(i * casa) + 0.5);
      ctx.moveTo(x, t.y1);
      ctx.lineTo(x, t.y1 + 4 * k);
    }
    ctx.stroke();
    const pedidos: Pedido[] = [];
    let i = 0;
    for (let d = de; d <= ate; d++) {
      const x = (d - de + 0.5) * casa;
      if (conta.util(d)) marca(x, i++);
      else hachura(ctx, (d - de) * casa + 1, t.y0, casa - 2, t.y1 - t.y0 - 2);
      const data = conta.dia(d);
      // O mês só no começo, onde ele troca e no fim ("28/10", "1/11", "9/11"), como na trena da folha.
      const rotulo = d === de || d === ate || data.getUTCDate() === 1 ? diaBarraMes(data) : String(data.getUTCDate());
      pedidos.push({ formas: [rotulo], x: d === de ? x - casa / 2 + 2 : d === ate ? x + casa / 2 - 2 : x, alinhar: d === de ? "left" : d === ate ? "right" : "center", forte: d === ate });
    }
    // O fim, o começo, a troca de mês (os que têm a barra: "1/1") e o resto (até 18/10, o "1/1" de 18/12 saía: a revisão).
    const meio = pedidos.slice(1, -1);
    rotulos(t.yr, [pedidos[pedidos.length - 1], pedidos[0], ...meio.filter((p) => p.formas[0].includes("/")), ...meio.filter((p) => !p.formas[0].includes("/"))]);
  };
  const [u1, u7, u15] = [conta.uteis[0], conta.uteis[6], conta.uteis[14]];
  dias(revisoes, u1, u7, (x, i) => {
    // O traço que se abre: do traço inteiro (o 1º dia útil) ao ponto (o 7º).
    const meio = ((1 - i / 6) * (revisoes.y1 - revisoes.y0 - 6 * k)) / 2;
    ctx.strokeStyle = BRONZE;
    ctx.lineWidth = 3 * k;
    ctx.beginPath();
    ctx.moveTo(x, revisoes.ym - meio);
    ctx.lineTo(x, revisoes.ym + meio + 0.01);
    ctx.stroke();
  });
  // A publicação, do 7º dia útil ao 15º, como a trena da folha e a data logo abaixo ("De 27/10 a 9/11"); cada etapa tem
  // a sua tira, e o 7º, o dia em que as revisões fecham, cabe nas duas (até 18/10, do 8º: a revisão).
  dias(publicacao, u7, u15, (x) => {
    ctx.fillStyle = TELA_LUZ;
    ctx.beginPath();
    ctx.arc(x, publicacao.ym, 3.5 * k, 0, Math.PI * 2);
    ctx.fill();
  });
}

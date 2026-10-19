import { casasDoMes, contaDosPagamentos as conta, mesDe, MESES, type ContaDosPagamentos } from "@/components/ilhas/conta-dos-pagamentos";
import { diaDeTrabalho, diaUtil, hojeEmNiteroi } from "@/lib/prazo";
import { casa, densidade, limiar, novoLote, ponto } from "@/lib/traco-e-ponto";

export { relogio } from "@/lib/sol";
export { abertura } from "@/lib/traco-e-ponto";

/**
 * O desenho da conta de /orcamento (desde 17/10, a direção final do Atlas Digital: seção 3, item 16, e as seções 2.7
 * e 2.8): a composição da criação e a carta dos pagamentos (até 18/10, também o total que assentava chapado, sobre o
 * meio-tom). Fica num pedaço à parte, que o montador (ilhas/montador.tsx) importa depois de montar: fora do script
 * inicial da página.
 * A gramática (seção 1.1): o traço é o que já está gravado (o preço publicado do plano, e a conta inteira depois de
 * "Preparar mensagem"); o ponto de tela é o que a conta calcula agora (cada módulo escolhido, as datas dos
 * pagamentos). A passagem (a fronteira é o toque em "Preparar mensagem") fecha os pontos em traço pela matriz de Bayer,
 * em 16 degraus de 50 ms: `fechar`, de 0 a 1, é o degrau. Os rótulos ficam de 12 a 13,5 px (nada desenhado abaixo de
 * 12), fora do desenho. Desde 18/10 (a revisão da peça), a carta dos pagamentos tem um instrumento largo só dela, e a
 * gravação fecha só o que a mensagem compromete (a parcela de hoje e os meses certos): a janela da publicação e o mês
 * incerto continuam em ponto, porque são o provável (a gramática, 1.1).
 */

/** As tintas da tela que não são do texto (seção 2.1): o ponto aceso, o metal do traço e o fundo do halo de carta. */
const TELA_LUZ = "#fbf1de";
const METAL = "#d9a76b";
const HALO = "#0b2340";
/** Um ponto, R$ 10 (a direção, seção 3, item 16); e as fileiras da composição: uma coluna de casas, R$ 50. */
export const POR_CASA = 10;
const FILEIRAS = 5;
/** Os rótulos da composição, em px com a letra comum (× k com a do leitor): a entrelinha, o vão entre as camadas, o
 *  vão até as fileiras, o vão mínimo e o folgado entre dois rótulos da mesma camada e o que um fio guarda de um rótulo
 *  que não é o dele. */
const ENTRELINHA = 16;
const ENTRE_CAMADAS = 8;
const ATE_AS_FILEIRAS = 10;
const ENTRE_ROTULOS = 10;
const CONFORTO = 20;
const FOLGA_DO_FIO = 3;
/** O custo de uma disposição (dispor), além das camadas: por linha a mais, pelo vão só mínimo entre dois rótulos e pela
 *  mesma frase quebrada de dois jeitos; o recuo do rótulo, 1 por px. */
const POR_LINHA = 12;
const APERTO = 30;
const MISTO = 100;

/** O canvas na largura pedida e na densidade de pixel até 2, limpo, com o contexto em px de CSS. `altura`: a do CSS,
 *  se não for `alto` em px (a reserva da composição, que fica no lugar). */
function preparar(canvas: HTMLCanvasElement, largura: number, alto: number, altura = `${alto}px`) {
  const dpr = densidade();
  canvas.style.width = `${largura}px`;
  canvas.style.height = altura;
  canvas.width = Math.round(largura * dpr);
  canvas.height = Math.round(alto * dpr);
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, largura, alto);
  return ctx;
}

const letra = (canvas: HTMLCanvasElement, px: number, peso = 500) => `${peso} ${px}px ${getComputedStyle(canvas).fontFamily}`;

/**
 * Uma parte da conta: o plano (publicado, em traço), um módulo escolhido (em ponto aceso) ou um não escolhido (fora); e o
 * rótulo dela: o nome, o valor e o estado ("50% de desconto (fundação)", "escolhido", "não escolhido"), que o desenho
 * quebra em linhas quando falta largura.
 */
export type Parte = { valor: number; estado: "publicado" | "escolhido" | "fora"; rotulo: readonly [string, string, string] };

/** Um rótulo no lugar: as linhas, a camada (0, a mais perto das fileiras), o fio (x), o começo (a) e a largura. */
type Posto = { linhas: string[]; camada: number; x: number; a: number; w: number };
/** Uma disposição dos rótulos: a altura de cada camada, a da faixa (sem o vão até as fileiras) e o custo. */
type Disposicao = { postos: Posto[]; alturas: number[]; altura: number; custo: number };

/** As formas de um rótulo: o estado numa linha, em duas, em três... (em cada número, a quebra cuja linha mais larga é a
 *  mais estreita: "50% de / desconto", e não "50% / de desconto"); só as que estreitam o rótulo. `medir(texto, n)`: a
 *  largura da linha n (a 0, o nome, na letra dele). */
function formas(rotulo: Parte["rotulo"], medir: (texto: string, n: number) => number) {
  const palavras = rotulo[2].split(" ");
  const melhores: { linhas: string[]; w: number; largo: number }[] = [];
  for (let mascara = 0; mascara < 1 << (palavras.length - 1); mascara++) {
    const estado = [palavras[0]];
    palavras.slice(1).forEach((p, i) => ((mascara >> i) & 1 ? estado.push(p) : (estado[estado.length - 1] += ` ${p}`)));
    const linhas = [rotulo[0], rotulo[1], ...estado];
    const largo = Math.max(...estado.map((t) => medir(t, 2)));
    if (!(melhores[estado.length]?.largo <= largo)) melhores[estado.length] = { linhas, w: Math.max(...linhas.map(medir)), largo };
  }
  return melhores.filter((f, n, todas) => todas.slice(0, n).every((g) => !g || g.w > f.w));
}

/** As camadas possíveis de n rótulos: cada um numa de 0 a n - 1, sem camada vazia no meio. */
function camadasDe(n: number) {
  let todas: number[][] = [[]];
  for (let i = 0; i < n; i++) todas = todas.flatMap((c) => Array.from({ length: n }, (_, l) => [...c, l]));
  return todas.filter((c) => c.every((_, l) => l > Math.max(...c) || c.includes(l)));
}

/**
 * As disposições possíveis dos rótulos (desde 18/10, a revisão final): o fio que abre cada parte (o do plano, na borda)
 * sobe até o rótulo dela, que fica sobre o fio, de preferência começando nele, sem sair do canvas. Em cada camada, os
 * rótulos a 10 px um do outro; o rótulo de uma camada mais baixa a 3 px, ao menos, do fio de qualquer rótulo mais alto
 * (nenhum fio passa por trás de outro rótulo). Para cada camada de cada rótulo e cada forma (o estado quebrado em
 * linhas), os começos: da direita para a esquerda, o mais à direita que deixa lugar aos seguintes; da esquerda para a
 * direita, o mais perto do fio; com 20 px entre os rótulos, se couberem, ou com os 10. O custo: as camadas, antes de
 * tudo (a mesma linha de base, quando cabem); depois, a mesma frase quebrada de dois jeitos (na revisão seguinte, "não /
 * escolhido" ao lado de "não escolhido", a 1.440), o vão só mínimo (a 10 px, na mesma linha, "(fundação) escolhido não
 * escolhido" lia como uma frase), 12 por linha a mais e o quanto cada rótulo sai do fio para a esquerda, em px. Até
 * 18/10, de cada rótulo, só a camada mais baixa sem conflito, com o texto inteiro: a borda direita empurrava o da
 * Presença até o da Agenda, e o fio da Agenda passava por trás dele (28 casos, a 150 e 200%). `cruzar`: o último
 * recurso (abaixo de ~104 px de letra comum, onde os três fios ficam a menos de um rótulo um do outro), sem a folga dos
 * fios; só o rótulo que nem na forma mais estreita cabe no canvas encosta na borda esquerda (até a revisão seguinte,
 * qualquer forma, e o custo premiava a mais larga: a 300 px com a letra a 200%, "(fundação)" saía do canvas).
 */
function dispor(partes: readonly Parte[], passo: number, largura: number, k: number, medir: (texto: string, n: number) => number, cruzar = false): Disposicao[] {
  let coluna = 0;
  const xs = partes.map((p) => {
    const x = coluna * passo;
    coluna += Math.ceil(Math.round(p.valor / POR_CASA) / FILEIRAS);
    return x;
  });
  const opcoes = partes.map((p) => formas(p.rotulo, medir));
  const folga = cruzar ? -Infinity : FOLGA_DO_FIO * k;
  // A forma de cada rótulo: todas as combinações.
  let combinacoes: number[][] = [[]];
  for (const o of opcoes) combinacoes = combinacoes.flatMap((c) => o.map((_, f) => [...c, f]));
  const disposicoes: Disposicao[] = [];
  for (const camadas of camadasDe(partes.length))
    for (const escolha of combinacoes) {
      const ws = escolha.map((f, i) => opcoes[i][f].w);
      // Onde cada rótulo pode começar: sobre o fio e dentro do canvas, fora da folga dos fios mais altos.
      const viaveis = xs.map((x, i) => {
        const [lo, hi] = [Math.max(0, x - ws[i]), Math.min(x, largura - ws[i])];
        let livres = lo <= hi ? [[lo, hi]] : cruzar && escolha[i] === opcoes[i].length - 1 ? [[0, 0]] : [];
        xs.forEach((xj, j) => {
          if (camadas[j] <= camadas[i]) return;
          const [f0, f1] = [xj - folga - ws[i], xj + folga];
          livres = livres.flatMap(([a, b]) => (f1 < a || f0 > b ? [[a, b]] : [...(f0 >= a ? [[a, f0]] : []), ...(f1 <= b ? [[f1, b]] : [])]));
        });
        return livres;
      });
      // Os começos, camada a camada, com `vao` entre os rótulos (null, se não cabem): da direita para a esquerda, o mais à
      // direita que deixa lugar aos seguintes; da esquerda para a direita, o mais perto do fio.
      const colocar = (vao: number) => {
        const as: number[] = [];
        for (let l = 0; l <= Math.max(...camadas); l++) {
          const fila = xs.map((_, i) => i).filter((i) => camadas[i] === l);
          const teto: number[] = [];
          for (let t = fila.length - 1; t >= 0; t--) {
            const limite = t === fila.length - 1 ? Infinity : teto[t + 1] - vao - ws[fila[t]];
            teto[t] = Math.max(...viaveis[fila[t]].filter(([a]) => a <= limite).map(([, b]) => Math.min(b, limite)));
            if (teto[t] === -Infinity) return null;
          }
          let piso = -Infinity;
          for (let t = 0; t < fila.length; t++) {
            const i = fila[t];
            const alvo = Math.min(xs[i], largura - ws[i]);
            const perto = viaveis[i].flatMap(([a, b]) => {
              const [de, ate] = [Math.max(a, piso), Math.min(b, teto[t])];
              // A folga de 1e-6: o teto, refeito pela soma das larguras, pode passar o piso no último algarismo.
              return de <= ate + 1e-6 ? [Math.min(Math.max(alvo, de), ate)] : [];
            });
            if (!perto.length) return null;
            as[i] = perto.reduce((m, v) => (Math.abs(v - alvo) < Math.abs(m - alvo) ? v : m));
            piso = as[i] + ws[i] + vao;
          }
        }
        return as;
      };
      const folgado = colocar(CONFORTO * k);
      const as = folgado ?? colocar(ENTRE_ROTULOS * k);
      if (!as) continue;
      const postos = xs.map((x, i) => ({ linhas: opcoes[i][escolha[i]].linhas, camada: camadas[i], x, a: as[i], w: ws[i] }));
      const alturas = Array.from({ length: Math.max(...camadas) + 1 }, (_, l) => Math.max(...postos.filter((p) => p.camada === l).map((p) => p.linhas.length)) * ENTRELINHA * k);
      const altura = alturas.reduce((s, h) => s + h, 0) + (alturas.length - 1) * ENTRE_CAMADAS * k;
      const saida = postos.reduce((s, p) => s + Math.max(0, Math.min(p.x, largura - p.w) - p.a), 0) / k;
      const extras = postos.reduce((s, p) => s + p.linhas.length - 3, 0);
      const misto = postos.some((p, i) => postos.some((q, j) => j > i && partes[i].rotulo[2] === partes[j].rotulo[2] && p.linhas.length !== q.linhas.length));
      disposicoes.push({ postos, alturas, altura, custo: alturas.length * 1e6 + saida + POR_LINHA * extras + (folgado ? 0 : APERTO) + (misto ? MISTO : 0) });
    }
  return disposicoes.length || cruzar ? disposicoes : dispor(partes, passo, largura, k, medir, true);
}

/** A faixa dos rótulos de que todas as escolhas precisam, na última largura e letra (a passagem refaz o desenho 16
 *  vezes na mesma). */
let precisa = { chave: "", altura: 0 };

/**
 * A composição da criação: as partes da conta em fileiras de 5 casas, um ponto por R$ 10, numa escala fixa (a do maior
 * orçamento possível, `maximo`). O plano, na metade da fundação, vem em traço (o preço publicado); cada módulo tem o seu
 * lugar depois dele, em ponto aceso se escolhido (a escolha de agora, até `fechar`) e na pauta apagada se não (o que
 * ele custaria, à vista antes do toque). Um fio separa as partes. Até 18/10, uma régua de reais embaixo, que repetia a
 * de /planos (a grade visível que mede mora num lugar só, 2.5); a escala fica dita na legenda, um ponto, R$ 10.
 * Desde 18/10 (o fechamento: os três desconhecidos, diante da peça, disseram "não sei"), cada parte com o nome, o valor
 * e o estado em cima, no fio que a abre (dispor), de 13 a 13,5 px × a letra e com o halo de carta. A faixa dos rótulos
 * tem a altura de que precisa a escolha que pede mais (`variantes`, todas as escolhas): trocar a escolha não mexe na
 * conta. Desde a revisão final de 18/10, o canvas fica na altura que o CSS reservou (`reserva`, a do montador, que
 * prevê essa faixa pela largura e pela letra): nada pula quando o desenho chega. Os rótulos vão do alto da faixa para
 * baixo (os da camada de cima no alto, todos com o nome na mesma linha de base), e o que sobra fica nos fios: numa
 * camada só, entre ela e as fileiras; em mais de uma, entre as camadas; até então, a faixa se enchia de baixo, e o vão
 * ficava vazio no alto (56 px a 100%).
 */
export function desenharComposicao(
  canvas: HTMLCanvasElement,
  o: { largura: number; partes: readonly Parte[]; variantes: readonly (readonly Parte[])[]; maximo: number; fechar: number; tinta: string; apagado: string; k: number; reserva: string },
) {
  const colunas = Math.ceil(o.maximo / (POR_CASA * FILEIRAS));
  const passo = o.largura / colunas;
  const linha = passo * 0.8;
  const espessura = Math.max(2, passo * 0.27);
  const fontes = [letra(canvas, 13.5 * o.k, 600), letra(canvas, 13 * o.k, 400)];
  const medidor = canvas.getContext("2d")!;
  const medir = (texto: string, n: number) => ((medidor.font = fontes[Math.min(n, 1)]), medidor.measureText(texto).width);
  const melhor = (partes: readonly Parte[], teto = Infinity) =>
    dispor(partes, passo, o.largura, o.k, medir).reduce<Disposicao | null>((m, d) => (d.altura <= teto + 0.01 && (!m || d.custo < m.custo) ? d : m), null);
  const chave = `${o.largura}/${o.k}/${fontes[0]}`;
  if (precisa.chave !== chave)
    precisa = { chave, altura: Math.max(...o.variantes.map((v) => Math.min(...dispor(v, passo, o.largura, o.k, medir).map((d) => d.altura)))) };
  const fileiras = FILEIRAS * linha;
  // A altura reservada, lida no próprio canvas (sem o round() do CSS, a declaração cairia, e o canvas cresceria a cada
  // desenho: a altura em px, como até 18/10).
  const reservado = CSS.supports("height", o.reserva) ? ((canvas.style.height = o.reserva), canvas.getBoundingClientRect().height) : 0;
  // Meio px de folga: a largura que a ilha mede é arredondada, e a do CSS, não.
  const alto = reservado - fileiras - ATE_AS_FILEIRAS * o.k > precisa.altura - 0.5 ? reservado : Math.ceil(precisa.altura + ATE_AS_FILEIRAS * o.k + fileiras);
  if (process.env.NODE_ENV !== "production" && alto !== reservado)
    console.warn(`A conta: a reserva da composição (${reservado} px) não leva o desenho (${alto} px), a ${o.largura} px com a letra × ${o.k}.`);
  const faixa = alto - fileiras;
  const { postos, alturas, altura } = melhor(o.partes, Math.max(precisa.altura, faixa - ATE_AS_FILEIRAS * o.k)) ?? melhor(o.partes)!;
  // Com mais de uma camada, a sobra da faixa vai entre elas, e a de baixo fica junto das fileiras (na revisão seguinte;
  // até então, sob a mais baixa: a 360 com a letra a 200%, os fios dos módulos desciam 132 px vazios).
  const entre = ENTRE_CAMADAS * o.k + (alturas.length > 1 ? Math.max(0, faixa - ATE_AS_FILEIRAS * o.k - altura) / (alturas.length - 1) : 0);
  const topos: number[] = [];
  let acima = 0;
  for (let l = alturas.length - 1; l >= 0; l--) {
    topos[l] = acima;
    acima += alturas[l] + entre;
  }
  const topo = (p: Posto) => topos[p.camada];
  const baseDe = (p: Posto) => topo(p) + p.linhas.length * ENTRELINHA * o.k;

  const ctx = preparar(canvas, o.largura, alto, alto === reservado ? o.reserva : undefined);
  const lote = novoLote();
  const fios = new Path2D();
  const pauta = lote.caminho(o.apagado, Math.max(1.5, espessura * 0.6), 0.5);
  const traco = lote.caminho(METAL, espessura);
  const aceso = lote.caminho(TELA_LUZ, espessura);

  let coluna = 0;
  o.partes.forEach((parte, p) => {
    // O fio da parte, do rótulo dela até o pé das fileiras (o do plano, só até o alto delas, e a meio px da borda: a
    // linha de 1 px no pixel; no dispor, em 0, para os degraus da reserva valerem em qualquer letra).
    const x = postos[p].x || 0.5;
    fios.moveTo(x, baseDe(postos[p]));
    fios.lineTo(x, faixa + (p ? fileiras : 0));
    const casas = Math.round(parte.valor / POR_CASA);
    for (let c = 0; c < casas; c++) {
      const i = coluna + Math.floor(c / FILEIRAS);
      const j = c % FILEIRAS;
      const x = (i + 0.5) * passo;
      const y = faixa + (j + 0.5) * linha;
      if (parte.estado === "fora") ponto(pauta, x, y);
      else if (parte.estado === "publicado" || limiar(o.fechar, i, j)) casa(traco, x, y, passo, 0);
      else ponto(aceso, x, y);
    }
    coluna += Math.ceil(casas / FILEIRAS);
  });
  ctx.save();
  // Os fios param a 2 px da caixa do rótulo deles (e, no último recurso de dispor, passam por trás dos outros).
  const semRotulos = new Path2D();
  semRotulos.rect(0, 0, o.largura, alto);
  for (const p of postos) semRotulos.rect(p.a - 2 * o.k, topo(p) - 2 * o.k, p.w + 4 * o.k, baseDe(p) - topo(p) + 4 * o.k);
  ctx.clip(semRotulos, "evenodd");
  ctx.strokeStyle = o.apagado;
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 1;
  ctx.stroke(fios);
  ctx.restore();
  lote.pintar(ctx);
  // Os rótulos: o nome (600) e o valor na tinta, o estado no apagado; a parte fora, toda no apagado, como os pontos dela.
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.lineJoin = "round";
  ctx.lineWidth = 4;
  ctx.strokeStyle = HALO;
  o.partes.forEach((parte, p) =>
    postos[p].linhas.forEach((texto, n) => {
      const y = topo(postos[p]) + (n + 0.5) * ENTRELINHA * o.k;
      ctx.font = fontes[Math.min(n, 1)];
      ctx.strokeText(texto, postos[p].a, y);
      ctx.fillStyle = parte.estado === "fora" || n >= 2 ? o.apagado : o.tinta;
      ctx.fillText(texto, postos[p].a, y);
    }),
  );
}

/** A conta de tempo dos pagamentos (ilhas/conta-dos-pagamentos.ts), no calendário de lib/prazo.ts. */
export const contaDosPagamentos = (agora: Date) => conta(agora, { hojeEmNiteroi, diaUtil, diaDeTrabalho });

/**
 * A carta dos pagamentos: 13 meses reais a partir de hoje, um mês por fileira e um dia por casa (a mesma convenção da
 * carta do prazo, em escala de meses). A pauta: um ponto apagado por dia útil; o sábado, o domingo e os feriados
 * nacionais em hachura de buril, como na carta do prazo do início (fora da conta dos dias úteis). Acesos: hoje (a parcela do briefing, com o anel do dia 0,
 * como na folha de /o-trabalho) e os dias úteis da janela da publicação (a outra parcela). À direita, a coluna do mês:
 * cinco casas acesas por mês de mensalidade; no mês incerto, a parte acesa é a chance (casasDoMes). Em `fechar`, a
 * parcela de hoje e os meses certos se fecham em traço, na ordem de Bayer; a janela e o mês incerto ficam em ponto.
 * Desde 18/10 (a revisão), num instrumento largo, com o passo pela largura (26 px a 1.440, antes 7,5), a hachura no
 * lugar do branco (só com zoom se distinguia o fim de semana da falta do feriado) e sem os valores desenhados sobre a
 * pauta (o halo deles apagava os dias que cobria, e o valor já está na legenda, no HTML).
 * De pé (`dePe`, desde 18/10, o passe do celular): quando a carta deitada daria menos de 11 px por dia (abaixo de ~520
 * px de tela, o celular em pé), ela se transpõe, como a carta do prazo do início (a direção, seção 4, item 3): um mês
 * por coluna, os dias de cima para baixo e, ao pé de cada mês, depois do dia 31, as cinco casas da mensalidade. Os
 * nomes dos meses em cima, em degraus quando não cabem lado a lado (13 colunas de 19 a 25 px); os dias de 5 em 5 à
 * esquerda. Até então, deitada também a 390 px, com 7,8 px por dia (5,5 a 320): lia como textura.
 */
export function desenharPagamentos(canvas: HTMLCanvasElement, o: { largura: number; conta: ContaDosPagamentos; fechar: number; k: number; apagado: string }) {
  const { hoje, uteis, mensalidade, chance } = o.conta;
  const fimDoAno = new Date(hoje);
  fimDoAno.setUTCFullYear(fimDoAno.getUTCFullYear() + 1);
  const corpo = 12.5 * o.k;
  const ctx0 = canvas.getContext("2d")!;
  ctx0.font = letra(canvas, corpo);
  const medir = (t: string) => ctx0.measureText(t).width;
  const primeiro = mesDe(hoje);
  const rotuloDoMes = (m: number) => (m === primeiro || m % 12 === 0 ? `${MESES[m % 12]}/${String(Math.floor(m / 12)).slice(2)}` : MESES[m % 12]);
  const rotulos = Array.from({ length: 13 }, (_, r) => rotuloDoMes(primeiro + r));
  const margem = Math.ceil(Math.max(...rotulos.map(medir))) + 14 * o.k;
  // Deitada: 31 dias, o vão (1,2 casa) e as 5 casas do mês, com 8 px à direita para a ponta redonda do traço gravado.
  const dePe = (o.largura - margem - 8) / (31 + 1.2 + 5) < 11;

  // A geometria das duas orientações: `passo` corre no sentido do tempo (os dias e as casas do mês), e `largo` é a
  // casa no outro sentido (a fileira deitada, a coluna de pé); pos(r, t) leva o mês r e a distância t, em px, ao canvas.
  let passo: number, vao: number, largo: number, topo: number, alto: number, espessura: number, esquerda: number;
  let cabecalho: { texto: string; linha: number; x: number }[] = [];
  if (!dePe) {
    esquerda = margem;
    passo = (o.largura - margem - 8) / (31 + 1.2 + 5);
    vao = 1.2 * passo;
    largo = Math.max(20 * o.k, passo * 1.15);
    topo = Math.ceil(corpo * 2.2);
    alto = Math.ceil(topo + 13 * largo);
    espessura = Math.max(2, Math.min(7.5, passo * 0.3));
  } else {
    esquerda = Math.ceil(medir("31")) + 10 * o.k;
    largo = (o.largura - esquerda) / 13;
    passo = Math.min(14 * o.k, Math.max(11 * o.k, largo * 0.55));
    // O vão entre o dia 31 e a mensalidade leva o nome dela, numa linha, mais perto das casas dela que do dia 31.
    vao = Math.max(1.2 * passo, corpo * 2.6);
    // Os nomes em n degraus: o menor n em que cada nome, centrado na coluna (sem passar das bordas), fica a 6 px do
    // vizinho do mesmo degrau. Se o ano dos meses depois do primeiro obriga a mais um degrau ("jan/28" no fim, encostado
    // na borda), esses meses vão sem ele; se ainda assim, todos.
    const meio = (t: string, r: number) => Math.min(o.largura - medir(t) / 2, Math.max(medir(t) / 2, esquerda + (r + 0.5) * largo));
    const degraus = (ts: string[]) => {
      for (let n = 1; n < 6; n++) if (ts.every((t, i) => i + n >= ts.length || meio(ts[i + n], i + n) - medir(ts[i + n]) / 2 - (meio(t, i) + medir(t) / 2) >= 6 * o.k)) return n;
      return 6;
    };
    const opcoes = [rotulos, rotulos.map((t, r) => (r ? t.split("/")[0] : t)), rotulos.map((t) => t.split("/")[0])];
    const nomes = opcoes.reduce((melhor, ts) => (degraus(ts) < degraus(melhor) ? ts : melhor));
    const n = degraus(nomes);
    cabecalho = nomes.map((texto, r) => ({ texto, linha: r % n, x: meio(texto, r) }));
    topo = Math.ceil(corpo * (1.3 * n + 0.6));
    espessura = Math.max(2, Math.min(4.5, passo * 0.3));
    alto = Math.ceil(topo + 36 * passo + vao + espessura);
  }
  const pos = (r: number, t: number): [number, number] => (dePe ? [esquerda + (r + 0.5) * largo, topo + t] : [esquerda + t, topo + (r + 0.5) * largo]);
  const tDia = (d: number) => (d - 0.5) * passo;
  const tMes = (c: number) => 31 * passo + vao + (c + 0.5) * passo;

  const ctx = preparar(canvas, o.largura, alto);
  const lote = novoLote();
  const pauta = lote.caminho(o.apagado, Math.max(1.75, espessura * 0.55), 0.7);
  /** As casas fora da conta dos dias úteis (o recorte da hachura), com a medida de cada uma no outro sentido. */
  const folgas = new Path2D();
  const cruzado = dePe ? largo * 0.72 : Math.min(largo * 0.74, passo * 0.92);
  const traco = lote.caminho(METAL, espessura);
  const aceso = lote.caminho(TELA_LUZ, espessura);
  const chave = (d: Date) => d.toISOString().slice(0, 10);
  const naJanela = new Set(uteis.map(chave));
  const gravar = (i: number, j: number, [x, y]: [number, number], n = 0) => (limiar(o.fechar, i, j) ? casa(traco, x, y, passo, n, dePe) : ponto(aceso, x, y));
  let anel: [number, number] | null = null;
  const raio = Math.max(espessura * 1.4, dePe ? Math.min(passo, largo) * 0.42 : passo * 0.36);
  // De pé, o traço gravado de hoje cabe dentro do anel (desde 18/10: com a casa inteira, passava dele em cima e embaixo,
  // e lia "⏀"); deitada, como na mesa, a casa inteira.
  const nDeHoje = dePe ? Math.min(1, Math.max(0, 1 - (2 * raio - 1.5 - espessura) / passo)) : 0;

  ctx.font = letra(canvas, corpo);
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillStyle = o.apagado;
  for (let r = 0; r < 13; r++) {
    const m = primeiro + r;
    const ano = Math.floor(m / 12);
    const mes = m % 12;
    if (!dePe) ctx.fillText(rotulos[r], 0, pos(r, 0)[1]);
    const dias = new Date(Date.UTC(ano, mes + 1, 0)).getUTCDate();
    for (let d = 1; d <= dias; d++) {
      const dia = new Date(Date.UTC(ano, mes, d, 12));
      if (dia < hoje || dia >= fimDoAno) continue;
      const [x, y] = pos(r, tDia(d));
      if (chave(dia) === chave(hoje)) {
        gravar(d, r, [x, y], nDeHoje);
        anel = [x, y];
      } else if (naJanela.has(chave(dia))) ponto(aceso, x, y);
      else if (diaDeTrabalho(dia)) ponto(pauta, x, y);
      else if (dePe) folgas.rect(x - cruzado / 2, y - passo / 2, cruzado, passo);
      else folgas.rect(x - passo / 2, y - cruzado / 2, passo, cruzado);
    }
    // As casas do mês: certas a partir do mês seguinte à janela; no anterior a ele, a chance (casasDoMes), em ponto.
    const acesas = m >= mensalidade ? null : m === mensalidade - 1 ? casasDoMes(chance) : [];
    for (let c = 0; c < 5; c++) {
      const p = pos(r, tMes(c));
      if (!acesas) gravar(c, r + 7, p);
      else if (acesas.includes(c)) ponto(aceso, ...p);
      else ponto(pauta, ...p);
    }
  }
  // A hachura de buril: os fios a 45°, a cada 5 px, recortados nas casas de folga (dois dias seguidos fazem um bloco só).
  // De pé, as casas têm ~17 × 13 px e levavam três fios a 34%: lia como textura fraca, a ~2:1 do navy (a revisão do
  // passe, 18/10); ali, um fio a cada 4 px, a 60%.
  ctx.save();
  ctx.clip(folgas);
  const fios = new Path2D();
  for (let x = -alto; x < o.largura; x += dePe ? 4 : 5) {
    fios.moveTo(x, alto);
    fios.lineTo(x + alto, 0);
  }
  ctx.strokeStyle = o.apagado;
  ctx.globalAlpha = dePe ? 0.6 : 0.34;
  ctx.lineWidth = 1;
  ctx.stroke(fios);
  ctx.restore();
  lote.pintar(ctx);
  // O anel do dia 0, em volta da parcela de hoje.
  if (anel) {
    ctx.beginPath();
    ctx.arc(anel[0], anel[1], raio, 0, Math.PI * 2);
    ctx.strokeStyle = TELA_LUZ;
    ctx.lineWidth = 1.25;
    ctx.stroke();
  }
  if (dePe) {
    // Os meses em cima, cada um centrado na coluna (sem passar das bordas), no degrau dele; os dias de 5 em 5 à
    // esquerda; e o nome da mensalidade no vão, sobre as casas dela.
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "center";
    for (const { texto, linha, x } of cabecalho) ctx.fillText(texto, x, corpo * (1 + 1.3 * linha));
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    for (const d of [1, 5, 10, 15, 20, 25, 31]) ctx.fillText(String(d), esquerda - 7 * o.k, pos(0, tDia(d))[1]);
    ctx.textAlign = "left";
    ctx.fillText("mensalidade", 0, topo + 31 * passo + vao * 0.6);
    return { alto, dePe };
  }
  // O cabeçalho: os dias (de 5 em 5, se couber) sobre a pauta, e a mensalidade sobre a coluna do mês.
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "center";
  // Entre 11 e 12 px por dia, sem o 31, que encostava em "mês" e lia "31 mês".
  for (const d of passo >= 16 ? [1, 5, 10, 15, 20, 25, 31] : passo >= 12 ? [1, 10, 20, 31] : [1, 10, 20]) ctx.fillText(String(d), pos(0, tDia(d))[0], corpo);
  ctx.fillText(ctx.measureText("mensalidade").width <= 5 * passo ? "mensalidade" : "mês", pos(0, tMes(2))[0], corpo);
  return { alto, dePe };
}

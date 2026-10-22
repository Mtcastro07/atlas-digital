import { capa } from "@/conteudo/site";
import { horaCurta } from "@/lib/prazo";
import { relogio } from "@/lib/sol";

/**
 * A chapa da carga (desde 17/10, a direção final do Atlas Digital, seção 2.7; até então, a medição em quatro números
 * num cartão branco, ilhas/medicao-da-visita.tsx, que o fechamento achou "a prova pesando menos que a afirmação"). A
 * chapa de cobre (o atlas) recebe o registro medido da tela (o digital): um traço por arquivo desta visita, do início
 * ao fim, sobre a régua de ms, por grupo (o documento, as fontes, as folhas de estilo, os scripts, as imagens e o que
 * chegou depois da carga, o pesado que o site deixa para depois); os dois instantes em fio (o documento e a carga); e um
 * número só, os pedidos a outros domínios, em Archivo Black chapado. O medido é traço, pela gramática (seção 1.1): nada
 * aqui é ponto, e nada se move. O carimbo diz de quando é a medida, ou que é a reprise.
 * Desenhada na largura de verdade (`largura`, em px de CSS, e `f`, o corpo da letra do leitor sobre 16 px): nunca o
 * desenho da mesa encolhido (o J3 contou os rótulos de 6 px da P2). Sem rótulos dos grupos quando não cabem (o celular: só
 * as chaves, que o carimbo nomeia, e a unidade da régua uma vez, no fim).
 * O mesmo componente desenha a reprise no servidor (components/secoes/destaques.tsx) e a visita, no navegador, depois
 * da carga (ilhas/carga-da-visita.tsx, por import()): por isso sem hooks, e `medir` só toca a Performance API quando é
 * chamada. Tudo vem do próprio navegador, e nada sai dele.
 */

/** Os grupos, na ordem da chapa: a ordem em que a página chega. "outros" só aparece se houver (um pedido sem tipo). */
const GRUPOS = ["documento", "fontes", "folhas de estilo", "scripts", "imagens", "outros", "depois da carga"] as const;
type Grupo = (typeof GRUPOS)[number];

/** Um arquivo: o grupo, o início e o fim (em ms desde o começo da navegação) e o peso comprimido, em KB. */
export type Arquivo = readonly [grupo: Grupo, inicio: number, fim: number, kb: number];

export type Carga = {
  arquivos: readonly Arquivo[];
  /** O fim do documento e o fim do evento load, em ms: os dois fios. */
  documento: number;
  carga: number;
  /** Os pedidos a outros domínios e os cookies gravados. */
  outros: number;
  cookies: number;
  /** A hora da medida ("17h50") e a primeira página da visita (o Next troca de página sem recarregar). */
  quando: string;
  pagina: string;
  reprise?: boolean;
};

function grupoDe(r: PerformanceResourceTiming, carga: number): Grupo {
  const caminho = new URL(r.name, location.href).pathname;
  if (r.startTime > carga) return "depois da carga";
  if (/\.(woff2?|ttf|otf)$/.test(caminho)) return "fontes";
  if (/\.css$/.test(caminho)) return "folhas de estilo";
  if (/\.m?js$/.test(caminho)) return "scripts";
  if (/\.(webp|avif|png|jpe?g|gif|svg|ico)$/.test(caminho)) return "imagens";
  return "outros";
}

/**
 * A carga desta visita, lida da Navigation Timing e da Resource Timing do navegador, e os cookies de `document.cookie`.
 * Chamada depois do load (o fim do evento só existe depois dele). shortcut: uma leitura só, no instante em que a chapa
 * entra na vista; um pedido que chegue depois não entra (um PerformanceObserver a manteria viva, se um dia precisar).
 */
export function medir(): Carga {
  const navegacao = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  const recursos = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
  const carga = navegacao?.loadEventEnd || performance.now();
  const arquivos: Arquivo[] = recursos.map((r) => [grupoDe(r, carga), r.startTime, Math.max(r.startTime, r.responseEnd), r.encodedBodySize / 1024]);
  if (navegacao) arquivos.unshift(["documento", 0, navegacao.responseEnd, navegacao.encodedBodySize / 1024]);
  return {
    arquivos,
    documento: navegacao?.responseEnd ?? 0,
    carga,
    outros: recursos.filter((r) => new URL(r.name, location.href).origin !== location.origin).length,
    cookies: document.cookie.split(";").filter((c) => c.trim()).length,
    quando: horaCurta(relogio()),
    pagina: navegacao ? new URL(navegacao.name).pathname : location.pathname,
  };
}

/** Os grupos com o artigo, para o carimbo do celular, onde a chapa vai só com as chaves (desde 18/10, a revisão). */
const NO_CARIMBO: Record<Grupo, string> = {
  documento: "o documento",
  fontes: "as fontes",
  "folhas de estilo": "as folhas de estilo",
  scripts: "os scripts",
  imagens: "as imagens",
  outros: "os outros pedidos",
  "depois da carga": "o que chegou depois da carga",
};
const lista = new Intl.ListFormat("pt-BR", { type: "conjunction" });

const inteiro = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const decimal = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });
const milesimos = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 3 });
// O valor com a unidade, sem quebra entre os dois (a 360 px, "1.112" ficava no fim da linha do carimbo, e "KB" na outra).
const kb = (n: number) => `${(n < 10 ? decimal : inteiro).format(n)}\u00a0KB`;
const ms = (n: number) => `${inteiro.format(n)}\u00a0ms`;
const plural = (n: number, um: string, varios: string) => `${inteiro.format(n)} ${n === 1 ? um : varios}`;

/** A largura de um rótulo de 13 px (Inter 500, algarismos tabulares), estimada por caractere: o servidor não mede. */
const LETRA = 7.2;
let medidor: CanvasRenderingContext2D | null | undefined;
const medidas = new Map<string, number>();
/**
 * A largura do rótulo: no navegador (a visita), medida no canvas com a letra que a página usa, e 4% de folga para os
 * algarismos tabulares, que o canvas não aplica; no servidor (a reprise), estimada. A estimativa sobrava 24% em "folhas
 * de estilo, 37 KB", e a sobra saía da régua de tempo. Guardada por corpo e texto: o celular prova várias réguas.
 */
function larguraDoRotulo(s: string, f: number) {
  if (typeof document === "undefined") return s.length * LETRA * f;
  medidor ??= document.createElement("canvas").getContext("2d");
  if (!medidor) return s.length * LETRA * f;
  const chave = `${f} ${s}`;
  let w = medidas.get(chave);
  if (w === undefined) {
    medidor.font = `500 ${13 * f}px ${getComputedStyle(document.body).fontFamily}`;
    medidas.set(chave, (w = medidor.measureText(s).width * 1.04));
  }
  return w;
}
/** Os passos da régua de ms (o maior traço da régua, com rótulo): o menor que deixa os rótulos a 72 px um do outro. */
const PASSOS = [10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000, 10000, 20000, 50000];

export function ChapaDaCarga({ carga, largura: L, f = 1 }: { carga: Carga; largura: number; f?: number }) {
  const linhas = [...carga.arquivos].sort((a, b) => GRUPOS.indexOf(a[0]) - GRUPOS.indexOf(b[0]) || a[1] - b[1]);
  const grupos = GRUPOS.filter((g) => linhas.some((l) => l[0] === g)).map((g) => {
    const doGrupo = linhas.filter((l) => l[0] === g);
    return { g, n: doGrupo.length, rotulo: `${g}, ${kb(doGrupo.reduce((s, l) => s + l[3], 0))}` };
  });
  const largoNaMesa = (s: string) => larguraDoRotulo(s, f);
  const linha = 16 * f; // a entrelinha dos rótulos de 13 px

  // A coluna dos rótulos dos grupos, à direita do tempo, só com folga para os dois. No celular, sem eles (a direção,
  // seção 4, item 4): desde 18/10 (o passe do celular, como no esboço a 390 px), só as chaves, num vão de 8 px.
  const colunaDosRotulos = 22 + Math.max(...grupos.map((g) => largoNaMesa(g.rotulo)));
  const comRotulos = L - colunaDosRotulos >= 300 * f;
  // No celular, cada algarismo medido como o "0": o canvas não aplica os tabulares, e o "1", estreito na medida e largo
  // na tela, levava "113 ms" 5 px além da borda com a letra a 200% (18/10). A mesa fica com a medida de antes.
  const largo = comRotulos ? largoNaMesa : (s: string) => largoNaMesa(s.replace(/\d/g, "0"));
  const T = L - (comRotulos ? colunaDosRotulos : 8);

  // A régua: linear, do zero ao último fim, arredondado a meio passo, com os rótulos a 72 px um do outro, no mínimo.
  // Quando algo chega bem depois da carga (o que veio com a rolagem, segundos depois), essa cauda vai a um trecho à
  // direita, noutra escala, depois de uma quebra gravada na régua: numa escala só, a carga se espremeria no começo.
  // No celular (desde 18/10), o "ms" vai uma vez, no último rótulo, como numa régua impressa, e o vão entre os rótulos
  // é o do maior número: com "ms" em cada um e os 72 px, a 320 e a 390 px com a letra a 200%, cabiam só "0 ms" e o fim.
  type Escala = { passo: number; fim: number };
  const escala = (de: number, ate: number, largura: number, minimo: number): Escala => {
    const cabem = Math.max(minimo, Math.floor(largura / (comRotulos ? 72 * f : largo(inteiro.format(ate)) + 14 * f)));
    const passo = PASSOS.find((p) => Math.ceil((ate - de) / p) <= cabem) ?? PASSOS[PASSOS.length - 1];
    return { passo, fim: Math.ceil(ate / (passo / 2)) * (passo / 2) };
  };
  const fimMax = Math.max(carga.carga, ...linhas.map((l) => l[2]));
  const antes = Math.max(carga.carga, ...linhas.filter((l) => l[0] !== "depois da carga").map((l) => l[2]));
  const VAO = 16;
  const TA0 = Math.round((T - VAO) * 0.7);
  const A0 = escala(0, antes * 1.1, TA0, 2);
  const quebra = fimMax > Math.max(antes * 1.6, A0.fim * 1.25);
  const B = quebra ? escala(A0.fim, fimMax, T - VAO - TA0, 1) : undefined;
  // Na quebra, o fim da cauda leva rótulo, encostado à direita: o primeiro trecho cede o que faltar para ele caber ao
  // lado do rótulo da quebra, centrado nela (a 390 px, um tocava o outro, e a cauda ficava sem escala). Nunca abaixo da
  // metade: com a letra a 200% num celular, a carga se espremia em 35 px; aí o rótulo da quebra fica de fora. No
  // celular, o rótulo da quebra encosta nela pela esquerda, e não avança sobre a cauda.
  // O vão entre dois rótulos: no celular, 8 px (16 com a letra a 200%, meia letra), e não os 10 da mesa (a revisão de 18/10).
  const folga = (comRotulos ? 10 : 8) * f;
  const quebraEm = (reserva: number) => (!B ? T : Math.max(Math.round((T - VAO) / 2), Math.min(TA0, Math.floor(T - reserva - folga - 1))));
  const eixo = (A: Escala, TA: number) => (t: number) => (!B || t <= A.fim ? (t / A.fim) * TA : TA + VAO + ((t - A.fim) / (B.fim - A.fim)) * (T - VAO - TA));
  let A = quebra ? A0 : escala(0, fimMax, T, 2);
  let TA = quebraEm(!B ? 0 : largo(ms(B.fim)) + (comRotulos ? largo(ms(A0.fim)) / 2 : 0));
  type Texto = (t: number) => string;
  let numero: Texto = ms; // o rótulo da régua
  let ultimo: Texto = ms; // o do fim, que leva a unidade

  // A régua de ms, gravada: o traço de 9 px a cada passo, de 6 a cada meio e de 3,5 a cada décimo (se couber), em cada
  // trecho; na quebra, a linha se interrompe e leva dois cortes. Os rótulos entram por ordem de valor (o zero, o fim da
  // régua, o fim do primeiro trecho e os do meio), e o que tocaria um já posto fica de fora: no celular, sem o fim, a
  // cauda depois da quebra ficava sem escala. Na quebra, os fins dos dois trechos levam o valor, mesmo no meio passo, e
  // encostados para dentro: sem ele, a cauda começava num valor que a régua não dizia (a revisão de 17/10).
  type Rotulo = { t: number; x: number; ancora: "start" | "middle" | "end"; texto: string; de: number; ate: number };
  const rotulo = (t: number, x: number, texto: string, ancora: Rotulo["ancora"]): Rotulo => {
    const w = largo(texto);
    const de = ancora === "start" ? x : ancora === "end" ? x - w : x - w / 2;
    return { t, x, ancora, texto, de, ate: de + w };
  };
  const gravar = (A: Escala, TA: number, numero: Texto, ultimo: Texto, base: number) => {
    const X = eixo(A, TA);
    let d = "";
    const candidatas: Rotulo[] = [];
    const trecho = (de: number, ate: number, passo: number, x0: number, x1: number) => {
      const decimo = passo / 10;
      const comDecimos = (x1 - x0) / ((ate - de) / decimo) >= 4;
      d += `M${x0.toFixed(1)} ${base}H${x1.toFixed(1)}`;
      for (let k = de ? Math.floor(de / decimo) + 1 : 0; k * decimo <= ate + 1e-6; k++) {
        const alto = k % 10 === 0 ? 9 : k % 5 === 0 ? 6 : comDecimos ? 3.5 : 0;
        if (alto) d += `M${X(k * decimo).toFixed(1)} ${base}v${alto}`;
        if (k % 10 === 0) {
          const t = k * decimo;
          const x = X(t);
          const w = largo(numero(t));
          candidatas.push(rotulo(t, x, numero(t), t === 0 ? "start" : x + w / 2 > L ? "end" : "middle"));
        }
      }
      // No celular, o fim da régua leva o valor também sem a quebra, mesmo no meio passo: a 320 px com a letra a 200%, o
      // passo de 200 acabava em 300 ms, e a régua ficava com o zero e o 200.
      if (B || !comRotulos) {
        if (candidatas.at(-1)?.t === ate) candidatas.pop();
        // O fim da cauda encosta à direita; o da quebra fica centrado no traço dela (no celular, encostado à esquerda).
        candidatas.push(rotulo(ate, x1, numero(ate), x1 === T ? "end" : comRotulos ? "middle" : "end"));
      }
    };
    trecho(0, A.fim, A.passo, 0, TA);
    const fimDoPrimeiro = candidatas.length - 1;
    if (B) {
      trecho(A.fim, B.fim, B.passo, TA + VAO, T);
      d += `M${TA + 3} ${base + 6}l4 -12M${TA + 9} ${base + 6}l4 -12`;
    }
    const fim = candidatas.length - 1;
    candidatas[fim] = rotulo(candidatas[fim].t, candidatas[fim].x, ultimo(candidatas[fim].t), candidatas[fim].ancora);
    const marcas: Rotulo[] = [];
    for (const i of new Set([0, fim, fimDoPrimeiro, ...candidatas.keys()])) {
      const c = candidatas[i];
      if (c.de >= -2 && c.ate <= L + 2 && marcas.every((m) => c.de > m.ate + folga || c.ate < m.de - folga)) marcas.push(c);
    }
    return { d, marcas: marcas.sort((a, b) => a.t - b.t) };
  };

  // No celular (desde 18/10, a revisão), a régua se escolhe entre as que cabem, medidas com a letra de verdade, e não
  // mais pela estimativa do passo: com a letra de 125% a 200%, o passo estimado punha o do meio a um dedo do fim, e a
  // régua ficava com o zero e o fim ("0 / 1.500 ms"). Por ordem: três rótulos ou mais, e na quebra o fim do primeiro
  // trecho entre eles; a unidade no fim, em ms; se não couber, em segundos, quando a régua passa de 1 s ("0 / 0,5 / 1 /
  // 1,5 s", com o "s" sempre); se ainda não couber (a 320 px com a letra a 200%), a régua vai além do dado, até dois
  // meios passos, e o do meio sai de perto do fim; por último, em ms sem a unidade, que os dois instantes logo acima
  // dizem. Dentro disso, a régua inteira (todo passo com o valor, salvo o vizinho do fim) com o menor passo; senão, a
  // de mais rótulos. Nunca numa segunda fila: pendurado abaixo da régua, o rótulo lia como chamada solta (a revisão).
  if (!comRotulos) {
    const ateA = quebra ? antes * 1.1 : fimMax;
    const segundos: Texto = (t) => milesimos.format(t / 1000);
    const modos: [Texto, Texto][] = [[inteiro.format, ms], [segundos, (t) => `${segundos(t)}\u00a0s`], [inteiro.format, inteiro.format]];
    let melhor: { nota: number[]; A: Escala; TA: number; numero: Texto; ultimo: Texto } | undefined;
    modos.forEach(([num, ult], modo) => {
      const ta = quebraEm(B ? largo(ult(B.fim)) : 0);
      for (const passo of PASSOS) {
        const passos = Math.ceil(ateA / passo);
        if (passos > 6) continue;
        // Com até dois meios passos sobrando no fim, se for preciso, e o dado em 60% da régua ou mais.
        for (let sobra = 0; sobra <= 2; sobra++) {
          const a = { passo, fim: (Math.ceil(ateA / (passo / 2)) + sobra) * (passo / 2) };
          if ((B && fimMax <= a.fim * 1.25) || ateA < a.fim * 0.6) break;
          if (modo === 1 && (B?.fim ?? a.fim) < 1000) continue; // em segundos, só a régua de 1 s ou mais
          const { marcas } = gravar(a, ta, num, ult, 0);
          const valida = marcas.length >= 3 && (!B || marcas.some((m) => m.t === a.fim));
          const vizinho = Math.ceil(a.fim / passo) - 1; // o passo logo antes do fim
          const inteira = Array.from({ length: Math.floor(a.fim / passo) + 1 }, (_, k) => k).every((k) => k === vizinho || k * passo === a.fim || marcas.some((m) => m.t === k * passo));
          const nota = valida ? [0, modo === 2 ? 1 : 0, sobra, modo, inteira ? 0 : 1, inteira ? passo : -marcas.length, passo] : [1, -marcas.length, sobra, modo, passo];
          const dif = melhor?.nota.findIndex((n, i) => n !== nota[i]) ?? -1;
          if (!melhor || (dif >= 0 && nota[dif] < melhor.nota[dif])) melhor = { nota, A: a, TA: ta, numero: num, ultimo: ult };
        }
        if (passos === 1) break;
      }
    });
    if (melhor) ({ A, TA, numero, ultimo } = melhor);
  }
  const X = eixo(A, TA);

  // Os dois instantes no alto, em fio: o rótulo à direita do fio, ou à esquerda quando passaria da borda, e nunca fora
  // do desenho (a 390 px, "carga" passava da borda esquerda). Se os dois se tocam, o do documento sobe uma linha, e o da
  // carga, na de baixo, sai de cima do fio do documento (que desce por ela). O rótulo mais largo que o desenho (a 390 px
  // com a letra a 200%, "documento, 87 ms" já passava da chapa) vai em duas linhas, o nome e o valor.
  const instantes = ([["documento", carga.documento], ["carga", carga.carga]] as const).map(([n, t]) => {
    const nome = `${n}, ${ms(t)}`;
    const linhas = largo(nome) > L ? [`${n},`, ms(t)] : [nome];
    const w = Math.max(...linhas.map(largo));
    const x = X(t);
    const de = Math.max(0, Math.min(x + 5 + w > L ? x - 5 - w : x + 5, L - w));
    return { nome, linhas, x, w, de, ate: de + w };
  });
  const [doc, fim] = instantes;
  const tocam = doc.de < fim.ate + 12 && fim.de < doc.ate + 12;
  if (tocam && fim.de < doc.x + 4 && fim.ate > doc.x - 4) {
    fim.de = doc.x + 4 + fim.w <= L ? doc.x + 4 : doc.x - 4 - fim.w >= 0 ? doc.x - 4 - fim.w : fim.de;
    fim.ate = fim.de + fim.w;
  }
  const linhasNoAlto = tocam ? doc.linhas.length + fim.linhas.length : Math.max(doc.linhas.length, fim.linhas.length);
  // Sem lugar ao lado do fio (o celular com a letra a 200%), o rótulo da carga fica sobre ele: o fio começa abaixo.
  const cruza = tocam && fim.de < doc.x + 4 && fim.ate > doc.x - 4;
  const topo = linhasNoAlto * linha + 12;

  // Os traços, um por arquivo; 7 px entre os grupos. O passo encolhe com muitos arquivos (uma visita longa), sem
  // passar de 260 px de altura.
  const passoDaLinha = Math.min(4.6, Math.max(2.4, 260 / linhas.length));
  const espessura = Math.min(2.2, passoDaLinha * 0.48);
  let y = topo;
  let tracos = "";
  const faixas: { y0: number; y1: number }[] = [];
  for (const g of grupos) {
    if (faixas.length) y += 7;
    const y0 = y;
    for (const l of linhas) {
      if (l[0] !== g.g) continue;
      const x1 = X(l[1]);
      tracos += `M${x1.toFixed(1)} ${y.toFixed(1)}H${Math.max(x1 + 2.5, X(l[2])).toFixed(1)}`;
      y += passoDaLinha;
    }
    faixas.push({ y0, y1: y - passoDaLinha });
  }
  const base = y - passoDaLinha + 10;

  // Os rótulos dos grupos, ao meio da chave de cada um, afastados para não se tocarem e sem passar da régua.
  const meio = 0.35 * 13 * f; // da linha de base ao meio da letra
  const ys = faixas.map((fx) => (fx.y0 + fx.y1) / 2 + meio);
  for (let i = 1; i < ys.length; i++) ys[i] = Math.max(ys[i], ys[i - 1] + 15 * f);
  for (let i = ys.length - 1; i >= 0; i--) ys[i] = Math.min(ys[i], i === ys.length - 1 ? base : ys[i + 1] - 15 * f);
  const xChave = T + (comRotulos ? 10 : 4);
  const chaves = faixas.map((fx) => `M${xChave} ${(fx.y0 - 2).toFixed(1)}h4V${(fx.y1 + 2).toFixed(1)}h-4`).join("");

  const { d: regua, marcas } = gravar(A, TA, numero, ultimo, base);
  const altura = base + 9 + linha + 6;

  const total = linhas.reduce((s, l) => s + l[3], 0);
  const textos = capa.carga;
  const inicio = carga.reprise ? textos.reprise : textos.agora;
  const resto = `${carga.reprise ? textos.gravada : `às ${carga.quando}${carga.pagina === "/" ? "" : `, desde a abertura de ${carga.pagina}`}`}: ${plural(linhas.length, "arquivo", "arquivos")} e ${kb(total)}, ${carga.outros ? plural(carga.outros, "de outro domínio", "de outros domínios") : "todos deste domínio"}, e ${carga.cookies ? plural(carga.cookies, "cookie", "cookies") : "nenhum cookie"}. ${comRotulos ? "" : `${textos.chaves} ${lista.format(grupos.map((g) => NO_CARIMBO[g.g]))}. `}${carga.reprise ? textos.regraNaReprise : textos.regra}`;
  return (
    <>
      <div aria-hidden="true" className="vd-carga-desenho">
        <div data-traco="" className="min-w-0">
          <svg
            viewBox={`0 0 ${L} ${altura.toFixed(1)}`}
            className={carga.reprise ? "vd-carga-reprise" : undefined}
            style={{ maxWidth: L }}
          >
            {instantes.map((i, n) => {
              const yRotulo = (tocam && n === 0 ? i.linhas.length : linhasNoAlto) * linha - 4; // a base da última linha
              return (
                <g key={i.nome}>
                  <path className="fio" d={`M${i.x.toFixed(1)} ${(n === 0 && cruza ? linhasNoAlto * linha - 4 : yRotulo) + 6}V${base}`} />
                  <text className="tinta" y={yRotulo - (i.linhas.length - 1) * linha}>
                    {i.linhas.map((s, k) => (
                      <tspan key={s} x={i.de.toFixed(1)} dy={k ? linha : undefined}>
                        {s}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}
            <path className="traco" d={tracos} style={{ strokeWidth: espessura }} />
            <path className="regua" d={regua} />
            {marcas.map((m) => (
              <text key={m.t} x={m.x} y={base + 9 + linha} textAnchor={m.ancora}>
                {m.texto}
              </text>
            ))}
            <path className="chave" d={chaves} />
            {comRotulos &&
              grupos.map((g, i) => (
                <text key={g.g} x={xChave + 12} y={ys[i]}>
                  {g.rotulo}
                </text>
              ))}
          </svg>
        </div>
        {/* O número medido é fato: chapado, em Archivo Black (a gramática; o "0" nunca em pontos). */}
        <p className="vd-carga-zero">
          <span className="block font-display leading-[0.78] tracking-titulo">{inteiro.format(carga.outros)}</span>{" "}
          <span className="block text-nota font-semibold text-foreground">
            {textos.zero} {carga.reprise ? textos.naReprise : textos.nestaVisita}
          </span>
        </p>
      </div>
      {/* Os números desta visita, vivos, em aria-hidden, com a mesma frase em sr-only (a regra da rodada); a reprise, que
          é o HTML do servidor e dos robôs, fica em texto comum. */}
      <figcaption className="vd-legenda-de-carta mt-5">
        <span aria-hidden={carga.reprise ? undefined : true}>
          <strong>{inicio}</strong> {resto}
        </span>
        {!carga.reprise && <span className="sr-only">{`${inicio} ${resto}`}</span>}
      </figcaption>
    </>
  );
}

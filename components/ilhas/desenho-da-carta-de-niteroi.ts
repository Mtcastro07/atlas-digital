import { CARTA, LUGARES_NA_CARTA, TERRA } from "@/components/paginas/costa-de-niteroi";
import { aneisDaTerra, comSegundos, FOLGA, leituraDoPonto, linhasDasRuas, prenderNoEixo } from "@/components/paginas/leitura-da-carta";
import { aoVivo } from "@/lib/ambiente";
import { densidade } from "@/lib/traco-e-ponto";

/**
 * O desenho vivo da carta de Niterói (desde 17/10, a direção final do Atlas Digital, seção 3, item 9, e 2.8: a passagem
 * de /para-quem segue a mão). Chega por import() depois da carga (ilhas/carta-de-niteroi.tsx) e liga a figura que o
 * servidor pintou (components/paginas/carta-de-niteroi.tsx):
 * - as ruas: lê o SVG uma vez (public/dados/ruas-niteroi.svg) e põe o traçado das duas camadas na folha e na lente;
 * - a mão: a lente fica parada no centro, e a carta desliza sob ela (o arraste com o mouse; no toque, o arraste que não
 *   for rolagem, touch-action: pan-y pinch-zoom; o toque leva o ponto tocado à lente; as setas, 100 m, ou 500 com Shift; Início
 *   volta ao ponto de partida; as teclas dos bairros levam a lente ao nó em 360 ms). No DOM, só transform: a folha, as
 *   réguas e as teclas, que acompanham a altura do nó. A carta anda até a borda dos dados deixar no máximo um quarto da
 *   região vazio (e sempre até os três nós); os rótulos das réguas que cairiam nas pontas que se dissolvem saem;
 * - a lente, em canvas: dentro dela, as ruas, a costa e a graticula viram ponto de tela, pelo primitivo (a casa da
 *   pauta aberta: o traço nulo, de ponta redonda, a cada passo); os fios de chamada das teclas;
 * - a passagem é a da mão (2.8: o gatilho é a mão, e o tempo segue a mão): o que cruza a borda da lente muda de
 *   estado. Quando as ruas chegam, a lente já as mostra em ponto. Até a revisão de 17/10, a lente se abria sozinha na
 *   carga, em 16 degraus de 80 ms: o gatilho e o tempo da passagem do início, a mesma revelação em série (M1). O único
 *   laço é a ida ao bairro, por aoVivo (lib/ambiente.ts): com a pausa ou o movimento reduzido, a tecla leva a carta de
 *   uma vez;
 * - a leitura: a coordenada com a precisão da escala, terra ou água, o mais perto dos três bairros e a distância
 *   (components/paginas/leitura-da-carta.ts), no painel (aria-hidden) e, para o leitor de tela, na frase de status,
 *   depois de a mão parar (só a mão: a troca da largura refaz o painel em silêncio).
 * Devolve a função que desliga tudo.
 */

/** O passo da pauta dentro da lente, em px: um ponto a cada 5 px de rua. */
const PASSO = 5;
/** O nó a menos disto da borda esquerda da tecla (px) leva o fio reto, do aro à tecla, e não o fio em cotovelo. */
const PERTO = 50;
/** A espessura do ponto, em px: as ruas maiores, as menores, a costa e a graticula. */
const ESPESSURA = { maiores: 2.4, menores: 1.6, costa: 2, graus: 1.2 };

type Linha = { pontos: Float32Array; x0: number; y0: number; x1: number; y1: number };
const comCaixa = (pontos: Float32Array): Linha => {
  let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity];
  for (let i = 0; i < pontos.length; i += 2) {
    x0 = Math.min(x0, pontos[i]);
    x1 = Math.max(x1, pontos[i]);
    y0 = Math.min(y0, pontos[i + 1]);
    y1 = Math.max(y1, pontos[i + 1]);
  }
  return { pontos, x0, y0, x1, y1 };
};

export function ligarCarta(tela: HTMLCanvasElement) {
  const regiao = tela.closest<HTMLElement>(".vd-carta-regiao")!;
  const figura = regiao.closest<HTMLElement>(".vd-carta")!;
  const folhas = [...regiao.querySelectorAll<HTMLElement>(".vd-carta-folha")];
  const reguaLat = regiao.querySelector<HTMLElement>(".vd-carta-regua-lat > div")!;
  const reguaLon = regiao.querySelector<HTMLElement>(".vd-carta-regua-lon > div")!;
  const mira = regiao.querySelector<HTMLElement>(".vd-carta-mira")!;
  const listaDasTeclas = regiao.querySelector<HTMLElement>(".vd-carta-bairros")!;
  const teclas = [...listaDasTeclas.querySelectorAll<HTMLButtonElement>("button")];
  const camadas = [...figura.querySelectorAll<HTMLButtonElement>("[data-camada]")];
  const campo = (nome: string) => figura.querySelector<HTMLElement>(`[data-leitura="${nome}"]`)!;
  const painel = figura.querySelector<HTMLElement>(".vd-carta-painel .vd-leitura")!;
  const grupoDasCamadas = figura.querySelector<HTMLElement>(".vd-carta-camadas")!;
  const escala = regiao.querySelector<HTMLElement>(".vd-carta-escala span")!;
  const faixaDaLongitude = regiao.querySelector<HTMLElement>(".vd-carta-regua-lon")!;
  const faixaDaLatitude = regiao.querySelector<HTMLElement>(".vd-carta-regua-lat")!;
  const nos = [...regiao.querySelectorAll<HTMLElement>(".vd-carta-no")];
  // Os rótulos das réguas: a posição em metros (a --y ou a --x do servidor) e a metade do comprimento na tela.
  const rotulos = (regua: string, eixo: string) =>
    [...regiao.querySelectorAll<HTMLElement>(`${regua} span`)].map((el) => ({ el, metros: parseFloat(el.style.getPropertyValue(eixo)), meio: 0 }));
  const [rotulosLat, rotulosLon] = [rotulos(".vd-carta-regua-lat", "--y"), rotulos(".vd-carta-regua-lon", "--x")];
  const ctx = tela.getContext("2d")!;
  const raiz = document.documentElement;
  const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
  const naBorda = window.matchMedia("(min-width: 64rem)"); // o lg do Tailwind, que cresce com a letra
  const parado = () => reduzir.matches || raiz.classList.contains("ambiente-pausado");

  const terra = new Path2D(TERRA);
  const aneis = aneisDaTerra(TERRA);
  const lugares = LUGARES_NA_CARTA.map((l) => ({ nome: l.nome, x: (l.x / 100) * CARTA.largura, y: (l.y / 100) * CARTA.altura }));
  const bairroDa = (tecla: HTMLButtonElement) => lugares.find((l) => l.nome === tecla.dataset.bairro)!;
  const partida = [parseFloat(regiao.style.getPropertyValue("--x0")), parseFloat(regiao.style.getPropertyValue("--y0"))] as const;
  let p: [number, number] = [partida[0], partida[1]];
  const ligadas = { gravura: true, pontos: true, graus: true } as Record<string, boolean>;
  let ruas: { maiores: Linha[]; menores: Linha[] } | null = null;

  // As medidas e as tintas, refeitas quando a carta muda de largura (a janela, a letra).
  let [W, H, m, raio, dpr, segundos, cx, cy] = [0, 0, 0, 0, 1, true, 0, 0];
  let cor = { luz: "", bronze: "", costa: "", brilho: "", tinta: "", terra: "", lente: "", graus: "" };
  let bordaDasTeclas: number[] = [];
  // As teclas na borda, à altura do nó, com o fio (app/digital.css: na mesa e no celular; não com a letra grande numa
  // tela estreita, em que ficam numa fila no alto) e o alto da faixa dos fios (na mesa, sob o cabeçalho).
  let [naBordaDaCarta, cima] = [true, 88];
  // A metade da altura da tecla, o topo e o teto delas (o y do centro mais alto e o do mais baixo) e as pontas das
  // réguas que se dissolvem (6 rem; a de latitude, a --ponta dela, mais curta na janela deitada).
  let [meiaTecla, topo, teto, pontas, pontasLat] = [27, 112, 0, 96, 96];
  // As faixas das réguas (à esquerda e embaixo): o nó que entra nelas sai, como os rótulos.
  let [faixaLat, faixaLon] = [44, 44];
  // A caixa da leitura na região (na mesa, sobre a carta): o nó que passa sob ela fica sem fio.
  let sobALeitura = { l: 0, t: 0, r: 0, b: 0 };
  function medir() {
    const estilo = getComputedStyle(regiao);
    W = regiao.clientWidth;
    H = regiao.clientHeight;
    // A escala desenhada (a folha mede a carta e a folga em metros × --m): na janela deitada, desde 18/10, ela sai da
    // altura, e não da largura (app/digital.css).
    m = folhas[0].getBoundingClientRect().width / (CARTA.largura + 2 * FOLGA);
    raio = mira.offsetWidth / 2;
    // O centro da lente: o do anel (o top dele é a --cy da região; o translate de −50% não entra no offsetTop).
    [cx, cy] = [mira.offsetLeft, mira.offsetTop];
    dpr = densidade();
    segundos = comSegundos(CARTA, m);
    tela.width = Math.round(W * dpr);
    tela.height = Math.round(H * dpr);
    const v = (nome: string) => estilo.getPropertyValue(nome).trim();
    cor = { luz: v("--tela-luz"), bronze: v("--primary"), costa: v("--accent"), brilho: v("--bronze-brilho"), tinta: v("--foreground"), terra: v("--carta-terra"), lente: v("--carta-lente"), graus: v("--carta-graus") };
    const r = regiao.getBoundingClientRect();
    bordaDasTeclas = teclas.map((t) => t.getBoundingClientRect().left - r.left);
    naBordaDaCarta = getComputedStyle(listaDasTeclas).display === "block";
    meiaTecla = (teclas[0]?.offsetHeight ?? 54) / 2;
    const rem = parseFloat(getComputedStyle(raiz).fontSize);
    pontas = 6 * rem;
    pontasLat = parseFloat(getComputedStyle(faixaDaLatitude).getPropertyValue("--ponta")) * rem;
    [faixaLat, faixaLon] = [faixaDaLatitude.offsetWidth, faixaDaLongitude.offsetHeight];
    for (const rotulo of [...rotulosLat, ...rotulosLon]) rotulo.meio = rotulo.el.offsetWidth / 2;
    // O topo das teclas: sob o cabeçalho e, se a coluna delas passar sobre as camadas (na mesa, no canto de cima da
    // carta; a 1.024 px, a carta é estreita), sob elas. O teto: 12 px acima dos rótulos da escala, se ela estiver na
    // coluna das teclas (na mesa, embaixo, à direita; fora dela, a escala vai ao canto de cima, à esquerda, e o teto é a
    // régua de longitude) e, do mesmo modo, acima da leitura (no canto de baixo).
    const coluna = Math.min(...bordaDasTeclas) - 12;
    const [camadas, leitura] = [grupoDasCamadas.getBoundingClientRect(), painel.getBoundingClientRect()];
    sobALeitura = naBorda.matches ? { l: leitura.left - r.left, t: leitura.top - r.top, r: leitura.right - r.left, b: leitura.bottom - r.top } : { l: 0, t: 0, r: 0, b: 0 };
    // No celular, a carta fica abaixo do lide, e não sob o cabeçalho: as teclas sobem até 8 px da borda.
    topo = naBorda.matches ? 112 : 8 + meiaTecla;
    cima = naBorda.matches ? 88 : 8;
    if (naBorda.matches && camadas.right - r.left > coluna) topo = Math.max(topo, camadas.bottom - r.top + 12 + meiaTecla);
    const rotuloDaEscala = escala.getBoundingClientRect();
    teto = (rotuloDaEscala.right - r.left > coluna ? rotuloDaEscala.top : faixaDaLongitude.getBoundingClientRect().top) - r.top - 12 - meiaTecla;
    if (naBorda.matches && leitura.right - r.left > coluna) teto = Math.min(teto, leitura.top - r.top - 12 - meiaTecla);
    aplicar(false);
  }

  /** A posição: a folha, as réguas e as teclas acompanham o ponto; depois, o desenho e a leitura (`anunciar`: a frase
   *  do leitor de tela, só quando quem moveu foi a mão). */
  function aplicar(anunciar = true) {
    const [dx, dy] = [(partida[0] - p[0]) * m, (partida[1] - p[1]) * m];
    for (const folha of folhas) folha.style.transform = `translate(${dx}px, ${dy}px)`;
    reguaLat.style.transform = `translateY(${dy}px)`;
    reguaLon.style.transform = `translateX(${dx}px)`;
    // O rótulo só inteiro, fora das pontas que se dissolvem.
    for (const r of rotulosLat) {
      const y = cy + (r.metros - p[1]) * m;
      r.el.toggleAttribute("data-fora", y - r.meio < pontasLat || y + r.meio > H - pontasLat);
    }
    for (const r of rotulosLon) {
      const x = cx + (r.metros - p[0]) * m;
      r.el.toggleAttribute("data-fora", x - r.meio < pontas || x + r.meio > W - pontas);
    }
    for (const no of nos) {
      const b = lugares.find((l) => l.nome === no.dataset.no)!;
      const [nx, ny] = [cx + (b.x - p[0]) * m, cy + (b.y - p[1]) * m];
      no.toggleAttribute("data-fora", nx < faixaLat || ny > H - faixaLon);
    }
    // Na borda (na mesa e, desde 18/10, no celular), cada tecla à altura do nó, entre o topo e o teto, sem encostar na
    // vizinha (de cima para baixo, e depois de baixo para cima). O nó que cai sob a tecla não fica coberto: a tecla sai
    // de cima dele. Até a revisão de 18/10, saía também com o nó até 20 px à esquerda dela, e o fio não chegava à tecla.
    const alvos = teclas.map((tecla, i) => {
      const b = bairroDa(tecla);
      const [nx, ny] = [cx + (b.x - p[0]) * m, cy + (b.y - p[1]) * m];
      const fora = meiaTecla + 16;
      return nx > bordaDasTeclas[i] - 9 ? (ny - fora < topo ? ny + fora : ny - fora) : ny;
    });
    for (let i = 0; i < alvos.length; i++) alvos[i] = Math.max(alvos[i], topo, i ? alvos[i - 1] + 64 : -Infinity);
    for (let i = alvos.length - 1; i >= 0; i--) alvos[i] = Math.min(alvos[i], i < alvos.length - 1 ? alvos[i + 1] - 64 : teto);
    teclas.forEach((tecla, i) => {
      const inicial = cy + (bairroDa(tecla).y - partida[1]) * m;
      const alvo = naBordaDaCarta ? alvos[i] : inicial;
      tecla.parentElement!.style.transform = naBordaDaCarta ? `translateY(${alvo - inicial}px)` : "";
      tecla.dataset.altura = String(alvo);
    });
    desenhar();
    ler(anunciar);
  }

  function desenhar() {
    if (!W) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = "round";

    // Os fios de chamada: do nó à tecla, tracejados; o do bairro escolhido, no bronze aceso. Fora da mesa (desde a
    // revisão de 18/10), de 1,5 px e com o halo de carta (seção 2.1: 4 px na cor do vidro, por baixo): de 1 px, sobre
    // as ruas de bronze, o fio sumia na malha.
    const halo = !naBorda.matches;
    if (naBordaDaCarta)
      teclas.forEach((tecla, i) => {
        const b = bairroDa(tecla);
        const [nx, ny] = [cx + (b.x - p[0]) * m, cy + (b.y - p[1]) * m];
        const [kx, ky] = [bordaDasTeclas[i] - 6, Number(tecla.dataset.altura)];
        // O nó fora da faixa das teclas (sob o cabeçalho, na régua de latitude, ou embaixo, na escala e na régua de
        // longitude): sem fio, que correria sobre os rótulos.
        if (ny < cima || ny > teto + meiaTecla || nx < 44) return;
        // Sob a leitura, também: o fio correria sob o texto dela.
        if (nx > sobALeitura.l && nx < sobALeitura.r + 12 && ny > sobALeitura.t && ny < sobALeitura.b) return;
        const fio = new Path2D();
        if (nx > bordaDasTeclas[i] - 9) {
          // O nó sob a tecla (que saiu de cima dele): o fio sobe (ou desce) dele até a borda da tecla, e não à esquerda
          // dela.
          const borda = ky < ny ? ky + meiaTecla : ky - meiaTecla;
          if (Math.abs(borda - ny) < 12) return;
          fio.moveTo(nx, ny + Math.sign(borda - ny) * 8);
          fio.lineTo(Math.max(nx, bordaDasTeclas[i] + 16), borda);
        } else if (nx > bordaDasTeclas[i] - PERTO) {
          // O nó perto da tecla: o fio reto, do aro à borda dela (o cotovelo voltaria para trás, sob o aro); colado a ela,
          // à mesma altura, sem fio.
          if (bordaDasTeclas[i] - nx < 16 && Math.abs(ky - ny) < 4) return;
          fio.moveTo(nx + 9, ny);
          fio.lineTo(bordaDasTeclas[i] - 3, ky);
        } else {
          fio.moveTo(nx + 10, ny);
          fio.lineTo(kx - 24, ny);
          fio.lineTo(kx, ky);
        }
        if (halo) {
          ctx.setLineDash([]);
          ctx.strokeStyle = cor.lente;
          ctx.lineWidth = 4.5;
          ctx.stroke(fio);
        }
        ctx.strokeStyle = tecla.getAttribute("aria-pressed") === "true" ? cor.brilho : cor.bronze;
        ctx.lineWidth = halo ? 1.5 : 1;
        ctx.setLineDash([2, 4]);
        ctx.stroke(fio);
      });
    ctx.setLineDash([]);
    if (!ligadas.pontos) return;

    // A lente: o vidro mais fundo que a tela, a terra, e as ruas, a costa e a graticula em ponto (em metros).
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, raio, 0, 2 * Math.PI);
    ctx.clip();
    ctx.fillStyle = cor.lente;
    ctx.fillRect(cx - raio, cy - raio, 2 * raio, 2 * raio);
    ctx.setTransform(dpr * m, 0, 0, dpr * m, dpr * (cx - p[0] * m), dpr * (cy - p[1] * m));
    ctx.fillStyle = cor.terra;
    ctx.fill(terra);
    const passo = PASSO / m;
    // A casa da pauta aberta (lib/traco-e-ponto.ts): o traço nulo de ponta redonda, a cada passo, é o ponto.
    ctx.setLineDash([0, passo]);
    const alcance = (raio + 8) / m;
    const perto = (l: Linha) => l.x1 > p[0] - alcance && l.x0 < p[0] + alcance && l.y1 > p[1] - alcance && l.y0 < p[1] + alcance;
    if (ligadas.graus) {
      ctx.strokeStyle = cor.graus;
      ctx.lineWidth = ESPESSURA.graus / m;
      ctx.stroke(new Path2D(figura.querySelector(".vd-carta-folha .graus")!.getAttribute("d")!));
    }
    if (ruas)
      for (const grupo of ["menores", "maiores"] as const) {
        const caminho = new Path2D();
        for (const l of ruas[grupo]) {
          if (!perto(l)) continue;
          caminho.moveTo(l.pontos[0], l.pontos[1]);
          for (let i = 2; i < l.pontos.length; i += 2) caminho.lineTo(l.pontos[i], l.pontos[i + 1]);
        }
        ctx.strokeStyle = cor.luz;
        ctx.lineWidth = ESPESSURA[grupo] / m;
        ctx.stroke(caminho);
      }
    ctx.strokeStyle = cor.luz;
    ctx.lineWidth = ESPESSURA.costa / m;
    ctx.stroke(terra);
    ctx.setLineDash([]);
    // Os nós dos bairros dentro da lente, em px: o ponto de bronze com o aro creme, como na folha.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    for (const b of lugares) {
      const [x, y] = [cx + (b.x - p[0]) * m, cy + (b.y - p[1]) * m];
      if (Math.hypot(x - cx, y - cy) > raio + 8) continue;
      ctx.beginPath();
      ctx.arc(x, y, 5.5, 0, 2 * Math.PI);
      ctx.fillStyle = cor.tinta;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, 2 * Math.PI);
      ctx.fillStyle = cor.bronze;
      ctx.fill();
    }
    ctx.restore();
  }

  // A leitura: no painel, a cada passo; a frase do leitor de tela, quando a mão para.
  let espera = 0;
  function ler(anunciar: boolean) {
    const l = leituraDoPonto(CARTA, aneis, LUGARES_NA_CARTA, p[0], p[1], segundos);
    const trocar = (nome: string, texto: string) => {
      const el = campo(nome);
      if (el.textContent !== texto) el.textContent = texto;
    };
    trocar("onde", l.terra ? painel.dataset.terra! : painel.dataset.agua!);
    trocar("latitude", l.latitude);
    trocar("longitude", l.longitude);
    trocar("bairro", l.bairro.km ? `${l.bairro.nome} a ${l.bairro.km} km` : `${painel.dataset.no} ${l.bairro.nome}`);
    if (!anunciar) return;
    clearTimeout(espera);
    espera = window.setTimeout(() => trocar("frase", `${painel.dataset.rotulo}: ${l.frase}`), 700);
  }

  // A carta anda até a borda dos dados deixar no máximo um quarto da região vazio (leitura-da-carta.ts, prenderNoEixo).
  const prender = () => {
    p = [
      prenderNoEixo(p[0], CARTA.largura, cx, W, m, lugares.map((l) => l.x)),
      prenderNoEixo(p[1], CARTA.altura, cy, H, m, lugares.map((l) => l.y)),
    ];
  };
  const escolher = (tecla?: HTMLButtonElement) => teclas.forEach((t) => t.setAttribute("aria-pressed", String(t === tecla)));

  // Levar a lente a um ponto: 360 ms na curva de entrada; parado (a pausa, o movimento reduzido), de uma vez.
  let pararIda: (() => void) | undefined;
  function irPara(x: number, y: number) {
    pararIda?.();
    pararIda = undefined;
    if (parado()) {
      p = [x, y];
      prender();
      aplicar();
      return;
    }
    const [de, inicio] = [[...p], performance.now()];
    const parar = aoVivo(regiao, (agora) => {
      const t = Math.min(1, (agora - inicio) / 360);
      const e = 1 - (1 - t) ** 3;
      p = [de[0] + (x - de[0]) * e, de[1] + (y - de[1]) * e];
      prender();
      aplicar();
      // Desliga depois do quadro (aoVivo agenda o próximo ao voltar daqui).
      if (t === 1) queueMicrotask(() => pararIda === parar && (pararIda?.(), (pararIda = undefined)));
    });
    pararIda = parar;
  }

  // A mão: o arraste move a carta; o toque sem arraste leva o ponto tocado à lente.
  let arraste: { id: number; x: number; y: number; p: [number, number]; moveu: boolean } | null = null;
  const aoApertar = (e: PointerEvent) => {
    if (e.button !== 0 || (e.target as Element).closest("button")) return;
    arraste = { id: e.pointerId, x: e.clientX, y: e.clientY, p: [...p], moveu: false };
    regiao.setPointerCapture(e.pointerId);
  };
  const aoMover = (e: PointerEvent) => {
    if (!arraste || e.pointerId !== arraste.id) return;
    const [dx, dy] = [e.clientX - arraste.x, e.clientY - arraste.y];
    if (!arraste.moveu && Math.hypot(dx, dy) < 4) return;
    // No toque, o gesto que começa na vertical é a rolagem da página (touch-action: pan-y): a carta não se mexe até o
    // navegador o tomar (o pointercancel). Desde 18/10: até então, os primeiros pixels do gesto ainda moviam a carta.
    if (!arraste.moveu && e.pointerType === "touch" && Math.abs(dy) >= Math.abs(dx)) return;
    if (!arraste.moveu) {
      arraste.moveu = true;
      pararIda?.();
      escolher();
      regiao.dataset.arrastando = "";
    }
    p = [arraste.p[0] - dx / m, arraste.p[1] - dy / m];
    prender();
    aplicar();
  };
  const aoSoltar = (e: PointerEvent) => {
    if (!arraste || e.pointerId !== arraste.id) return;
    if (!arraste.moveu && e.type === "pointerup") {
      const r = regiao.getBoundingClientRect();
      escolher();
      irPara(p[0] + (e.clientX - r.left - cx) / m, p[1] + (e.clientY - r.top - cy) / m);
    }
    arraste = null;
    delete regiao.dataset.arrastando;
  };
  const SETAS: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
  const aoTeclar = (e: KeyboardEvent) => {
    if (e.target !== regiao) return;
    if (e.key === "Home") {
      e.preventDefault();
      escolher();
      irPara(partida[0], partida[1]);
      return;
    }
    const seta = SETAS[e.key];
    if (!seta) return;
    e.preventDefault();
    pararIda?.();
    escolher();
    const passo = e.shiftKey ? 500 : 100;
    p = [p[0] + seta[0] * passo, p[1] + seta[1] * passo];
    prender();
    aplicar();
  };
  const aoClicar = (e: MouseEvent) => {
    const tecla = (e.target as Element).closest<HTMLButtonElement>(".vd-carta-bairros button");
    if (tecla) {
      escolher(tecla);
      const b = bairroDa(tecla);
      irPara(b.x, b.y);
    }
  };
  const aoTrocarCamada = (e: MouseEvent) => {
    const botao = e.currentTarget as HTMLButtonElement;
    const nome = botao.dataset.camada!;
    ligadas[nome] = !ligadas[nome];
    botao.setAttribute("aria-checked", String(ligadas[nome]));
    figura.toggleAttribute(`data-sem-${nome}`, !ligadas[nome]);
    desenhar();
  };
  regiao.addEventListener("pointerdown", aoApertar);
  regiao.addEventListener("pointermove", aoMover);
  regiao.addEventListener("pointerup", aoSoltar);
  regiao.addEventListener("pointercancel", aoSoltar);
  regiao.addEventListener("keydown", aoTeclar);
  regiao.addEventListener("click", aoClicar);
  for (const botao of camadas) botao.addEventListener("click", aoTrocarCamada);

  const observador = new ResizeObserver(() => medir());
  observador.observe(regiao);
  naBorda.addEventListener("change", medir);

  // As ruas: um pedido só, para a folha (o traçado nos dois <path>) e para a lente.
  let ativo = true;
  fetch("/dados/ruas-niteroi.svg")
    .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`ruas: ${r.status}`))))
    .then((svg) => {
      if (!ativo) return;
      const traco = (id: string) => svg.match(new RegExp(`id="${id}"[^>]* d="([^"]+)"`))?.[1] ?? "";
      for (const caminho of regiao.querySelectorAll<SVGPathElement>("path[data-ruas]")) caminho.setAttribute("d", traco(caminho.dataset.ruas!));
      ruas = { maiores: linhasDasRuas(traco("ruas-maiores")).map(comCaixa), menores: linhasDasRuas(traco("ruas-menores")).map(comCaixa) };
      desenhar();
    })
    // Sem as ruas, a lente mostra a terra, a costa e a graticula em ponto (o que medir() já desenhou).
    .catch(() => {});

  return () => {
    ativo = false;
    clearTimeout(espera);
    pararIda?.();
    observador.disconnect();
    naBorda.removeEventListener("change", medir);
    regiao.removeEventListener("pointerdown", aoApertar);
    regiao.removeEventListener("pointermove", aoMover);
    regiao.removeEventListener("pointerup", aoSoltar);
    regiao.removeEventListener("pointercancel", aoSoltar);
    regiao.removeEventListener("keydown", aoTeclar);
    regiao.removeEventListener("click", aoClicar);
    for (const botao of camadas) botao.removeEventListener("click", aoTrocarCamada);
  };
}

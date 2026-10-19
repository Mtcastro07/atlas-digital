import { caminhosDaRosa, type Camada } from "@/components/paginas/geometria-da-rosa";
import { aCadaMinuto, aoVivo } from "@/lib/ambiente";
import { quando } from "@/lib/prazo";
import { HORIZONTE, proximoNascer, relogio, solNoCeu, type Lugar } from "@/lib/sol";
import { abertura, bayer } from "@/lib/traco-e-ponto";

/**
 * A rosa do Sol viva (desde 17/10, a direção final do Atlas Digital, seção 3, item 22, e a seção 2.8): chega por
 * import() depois de montar (ilhas/rosa-do-sol.tsx), fora do script inicial de /duvidas. A cada minuto, com a rosa na
 * tela, sem a pausa e sem movimento reduzido (aoVivo, lib/ambiente.ts), lê o Sol em Niterói (lib/sol.ts) e redesenha:
 * - a metade voltada para o azimute em traço, o resto em ponto (components/paginas/geometria-da-rosa.ts);
 * - a tinta do traço pela altura do Sol, a metade de cima da rampa do metal (seção 2.1): o #f1d3a1 a partir de 48,6°
 *   (o seno 0,75), e o #d9a76b abaixo; a metade da sombra de cada ponta, um degrau abaixo;
 * - a marca no aro: o Sol, de dia; abaixo do horizonte, onde ele vai nascer;
 * - a frase da legenda.
 * A passagem da página (seção 2.8): o servidor manda a rosa toda em ponto, o que a tela ainda não calculou; ao chegar,
 * o lado do Sol se grava em 16 degraus de Bayer de 80 ms (abertura, lib/traco-e-ponto.ts), pelo mesmo limiar do
 * crepúsculo. Até a revisão de 17/10, a troca era de um quadro só, da noite para o dia.
 * Com movimento reduzido ou em pausa, o estado de agora, de uma vez; em pausa, a peça fica na última leitura, e com
 * movimento reduzido ela se refaz a cada minuto, sem passagem.
 * Até a revisão de 17/10, a rampa inteira (#8a5a24 com o Sol a menos de 14,5°): no fim da tarde, o lado aceso saía
 * marrom, mais escuro em média que os pontos em luz de tela, e a rosa dizia o contrário da legenda.
 */

/** A rampa do metal (seção 2.1), sem tom novo. O lado aceso usa os dois de cima; a sombra da ponta, o degrau abaixo. */
const METAL = ["#8a5a24", "#c08a4a", "#d9a76b", "#f1d3a1"] as const;
/** O fim do crepúsculo civil: daí para baixo, a rosa inteira em ponto. */
const CREPUSCULO = -6;
const RUMOS = ["norte", "nordeste", "leste", "sudeste", "sul", "sudoeste", "oeste", "noroeste"] as const;
const GRAU = Math.PI / 180;

/** O rumo de um azimute, em oito: "a nordeste". */
const rumo = (azimute: number) => RUMOS[Math.round(azimute / 45) % 8];

/** A frase do Sol na legenda: a altura e o rumo; abaixo do horizonte, quando e onde ele nasce (a marca no aro). */
export function fraseDoSol(altura: number, azimute: number, nascer: Date | null, agora: Date) {
  if (nascer) return `Em Niterói, o Sol está ${Math.max(1, Math.round(-altura))}° abaixo do horizonte; a marca no aro é onde ele nasce ${quando(nascer, agora)}.`;
  if (altura < 0.5) return `Em Niterói, o Sol está no horizonte, a ${rumo(azimute)}.`;
  return `Em Niterói, o Sol está a ${Math.round(altura)}° acima do horizonte, a ${rumo(azimute)}.`;
}

/**
 * A rosa viva. `rosa` é o .vd-rosa-do-sol (a pauta em data-passo: a da mesa ou a do celular); `dizer` recebe a frase da
 * legenda e se a rosa está toda em ponto pelo Sol (depois do crepúsculo civil). Devolve a função que desliga tudo.
 * Desde a revisão de 18/10, a pausa e o movimento reduzido se leem a cada mudança, e não só ao chegar: ligados antes do
 * fim da passagem (com a rosa ainda fora da tela, ou no meio dos degraus), o estado de agora, de uma vez. Até então, a
 * pausa ligada no cabeçalho antes de rolar até a rosa a deixava toda em ponto com o disco do Sol no aro (a noite e o
 * dia na mesma figura), e a ligada no meio da passagem a congelava em traço partido. Com movimento reduzido, a rosa se
 * redesenha a cada minuto (aCadaMinuto, lib/ambiente.ts); até então, uma vez só.
 */
export function rosaViva(rosa: HTMLElement, lugar: Lugar, dizer: (frase: string, noite: boolean) => void) {
  const passo = Number(rosa.dataset.passo) || undefined;
  const camadas = [...rosa.querySelectorAll<SVGPathElement>("path[data-camada]")];
  const marca = rosa.querySelector<SVGGElement>("[data-marca]");
  const raiz = document.documentElement;
  const reduzir = matchMedia("(prefers-reduced-motion: reduce)");
  const direto = () => reduzir.matches || raiz.classList.contains("ambiente-pausado");
  // A passagem começa no primeiro quadro com a rosa na tela (antes dele, abertura 0: a rosa toda em ponto); −Infinity
  // é a passagem feita, ou dispensada.
  let entrada = direto() ? -Infinity : Infinity;
  const desenhar = (t: number) => {
    const agora = relogio();
    const { altura, azimute } = solNoCeu(lugar, agora);
    const noite = Math.min(1, Math.max(0, (HORIZONTE - altura) / (HORIZONTE - CREPUSCULO)));
    // A passagem é o crepúsculo ao contrário: com abertura 0, a rosa toda em ponto (como o servidor a manda).
    const caminhos = caminhosDaRosa({ azimute, noite: Math.max(noite, 1 - abertura(t, entrada)) }, bayer, passo);
    for (const p of camadas) p.setAttribute("d", caminhos[p.dataset.camada as Camada] ?? "");
    const k = Math.sin(Math.max(0, altura) * GRAU) >= 0.75 ? 3 : 2;
    rosa.style.setProperty("--metal", METAL[k]);
    rosa.style.setProperty("--metal-sombra", METAL[k - 1]);
    const nascer = altura < HORIZONTE ? proximoNascer(lugar, agora) : null;
    marca?.style.setProperty("transform", `rotate(${nascer ? solNoCeu(lugar, nascer).azimute : azimute}deg)`);
    rosa.dataset.sol = nascer ? "nascer" : "dia";
    dizer(fraseDoSol(altura, azimute, nascer, agora), noite >= 1);
  };
  // Os 16 degraus, um desenho por degrau; desliga depois do último (o aoVivo pede o quadro seguinte logo após este).
  let degrau = 0;
  const pararPassagem = aoVivo(rosa, (t) => {
    if (entrada === Infinity) entrada = t;
    const d = Math.round(abertura(t, entrada) * 16);
    if (d !== degrau) desenhar(t);
    degrau = d;
    if (d < 16) return;
    entrada = -Infinity;
    queueMicrotask(pararPassagem);
  });
  // A pausa ou o movimento reduzido antes do fim da passagem: o estado de agora, já.
  const acabar = () => {
    if (entrada === -Infinity || !direto()) return;
    entrada = -Infinity;
    pararPassagem();
    if (rosa.getClientRects().length) desenhar(performance.now());
  };
  const pausa = new MutationObserver(acabar);
  pausa.observe(raiz, { attributes: true, attributeFilter: ["class"] });
  reduzir.addEventListener("change", acabar);
  // A rosa escondida (a da outra largura) não monta a pauta: a passagem a desenha quando ela aparecer. Parada (sem a
  // passagem), desenha já e a cada minuto, para a rosa que aparecer ao girar o aparelho não ficar no estado do servidor.
  const pararRelogio = aCadaMinuto(rosa, () => (direto() || rosa.getClientRects().length > 0) && desenhar(performance.now()));
  return () => {
    pararPassagem();
    pararRelogio();
    pausa.disconnect();
    reduzir.removeEventListener("change", acabar);
  };
}

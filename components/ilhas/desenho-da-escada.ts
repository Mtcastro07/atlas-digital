import { mascaraDaPedra } from "@/components/paginas/pedra-em-pontos";
import { aoVivo } from "@/lib/ambiente";
import { relogio, solNoCeu, type Lugar } from "@/lib/sol";
import { abertura, densidade } from "@/lib/traco-e-ponto";

/**
 * O desenho vivo da escada de /planos (desde 17/10, a direção final do Atlas Digital, seção 3, item 12, e as seções 2.3
 * e 2.8). Fica num pedaço à parte, que a ilha (ilhas/escada-em-dois-estados.tsx) importa depois de montar: fora do
 * script inicial. Duas coisas, sobre o HTML da figura (components/paginas/escada-de-precos.tsx):
 * - a passagem da página: depois que cada degrau sobe (a animação vd-degrau-sobe, em CSS, app/digital.css), a metade de
 *   cima se abre em 16 degraus de 70 ms, pela matriz de Bayer (pedra-em-pontos.ts), e o risco cruza o valor cheio no
 *   mesmo passo. Começa quando a figura está na tela; uma vez por visita (.ja-aberto); com movimento reduzido, não
 *   corre (o HTML já chega aberto);
 * - as sombras pelo Sol de agora em Niterói (lib/sol.ts), em hachura de buril no chão da tela: fios de 1 px a cada 3 px,
 *   paralelos ao raio de luz, no lado escuro da rampa do metal. O lado (leste ou oeste) sai do azimute; o comprimento,
 *   da altura (a altura do degrau sobre a tangente, com teto de três larguras); a profundidade no chão é dobrada (o
 *   chão mostra só o que fica à frente dos degraus). O mesmo Sol acende a face da pedra do lado dele (--sombra-dx).
 *   À noite, nem sombra nem face acesa: o chão fica liso (até 17/10, a faixa do pé ficava hachurada à noite, uma
 *   sombra sem Sol; a revisão). A cada minuto, e só com a figura na tela, sem a pausa e sem movimento reduzido (aoVivo,
 *   lib/ambiente.ts); parada, fica na última leitura.
 * A hachura aqui é sombra, e só sombra: o desconto é ponto (a gramática da seção 1.1), e o dia fora da conta dos dias
 * úteis, na carta do prazo, é outra peça, noutra página.
 */

/** O traço da sombra: o lado escuro da rampa do metal, o rasante (seção 2.1). É desenho, não texto. */
const BURIL = "#8a5a24";
const GRAU = Math.PI / 180;
/** Os 17 estados da metade de cima, de inteira (0, o valor cheio) a aberta (16, a condição de fundação). */
const QUADROS = Array.from({ length: 17 }, (_, n) => mascaraDaPedra(n / 16));
const RUMOS = ["ao norte", "a nordeste", "a leste", "a sudeste", "ao sul", "a sudoeste", "a oeste", "a noroeste"];

/** A frase da legenda, com a altura e o rumo do Sol (o azimute do norte para o leste, em graus). */
export function fraseDasSombras(altura: number, azimute: number) {
  // À noite, a frase não é mais longa que a do dia: a legenda tem o lugar contado, sobre o nome do primeiro degrau.
  if (altura < 0.5) return "Sombras pelo Sol de agora em Niterói: Sol abaixo do horizonte.";
  return `Sombras pelo Sol de agora em Niterói: ${Math.round(altura)}° acima do horizonte, ${RUMOS[Math.round(azimute / 45) % 8]}.`;
}

/** Um degrau no estado n da passagem: as duas máscaras da metade de cima e o risco do valor cheio. */
function pintar(degrau: HTMLElement, n: number) {
  degrau.style.setProperty("--mascara-campo", QUADROS[n].campo);
  degrau.style.setProperty("--mascara-faixa", QUADROS[n].faixa);
  degrau.style.setProperty("--risco", String(n / 16));
}

/** A passagem. Devolve a função que a desliga. */
function passagem(figura: HTMLElement, degraus: HTMLElement[]) {
  const raiz = document.documentElement;
  if (figura.hasAttribute("data-passagem") || raiz.classList.contains("ja-aberto") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  // Numa conexão lenta, a ilha pode chegar depois da reserva de 3 s (vd-escada-reserva, app/digital.css): a metade já
  // se abriu e o valor cheio já está riscado, e a passagem não volta atrás. Até 17/10, a ilha fechava a pedra, tirava o
  // risco e passava de novo: o preço cheio riscava, "desriscava" e riscava (a revisão, com o pedaço atrasado em 5 s).
  const reserva = degraus[0].querySelector(".vd-degrau-campo")?.getAnimations().find((a) => a instanceof CSSAnimation && a.animationName === "vd-escada-reserva");
  if (reserva?.playState === "finished") return () => {};
  // A ilha assume: o degrau inteiro, sem risco, no mesmo quadro em que a regra de antes da ilha deixa de valer.
  degraus.forEach((degrau) => pintar(degrau, 0));
  figura.setAttribute("data-passagem", "");
  const subiu = degraus.map(() => false);
  degraus.forEach((degrau, k) => {
    const pronto = () => (subiu[k] = true);
    const subida = degrau.getAnimations().find((a) => a instanceof CSSAnimation && a.animationName === "vd-degrau-sobe");
    if (subida) subida.finished.then(pronto, pronto);
    else pronto();
  });
  const inicio: (number | null)[] = degraus.map(() => null);
  const feito = degraus.map(() => 0);
  const parar = aoVivo(figura, (agora) => {
    let fim = true;
    degraus.forEach((degrau, k) => {
      // A abertura começa no primeiro quadro com o degrau assentado e a figura na tela.
      if (subiu[k] && inicio[k] === null) inicio[k] = agora;
      const n = inicio[k] === null ? 0 : Math.round(abertura(agora, inicio[k]!, 70) * 16);
      if (n !== feito[k]) pintar(degrau, (feito[k] = n));
      if (n < 16) fim = false;
    });
    // Desliga depois do quadro (o aoVivo pede o seguinte logo após chamar este).
    if (fim) queueMicrotask(parar);
  });
  return parar;
}

/** As sombras no canvas do chão, que se estende de borda a borda da tela. */
function sombras(figura: HTMLElement, canvas: HTMLCanvasElement, degraus: HTMLElement[], lugar: Lugar, dizer: (frase: string) => void) {
  const campo = canvas.parentElement!;
  const tela = figura.closest<HTMLElement>(".vd-tela") ?? campo;
  const [rc, rt] = [campo.getBoundingClientRect(), tela.getBoundingClientRect()];
  const largura = Math.round(rt.width);
  const alto = canvas.clientHeight;
  if (!largura || !alto) return;
  const dpr = densidade();
  // Pelo translate, e não pelo left: mover a caixa contava como salto de leiaute (0,0004 a 768 × 1024, com o chão na
  // primeira tela; 19/10, a revisão), e o canvas ainda vazio não salta para ninguém.
  canvas.style.translate = `${Math.round(rt.left - rc.left)}px 0`;
  canvas.style.width = `${largura}px`;
  const [w, h] = [Math.round(largura * dpr), Math.round(alto * dpr)];
  if (canvas.width !== w || canvas.height !== h) [canvas.width, canvas.height] = [w, h];
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, largura, alto);

  const { altura, azimute } = solNoCeu(lugar, relogio());
  dizer(fraseDasSombras(altura, azimute));
  // A face acesa: -1 acende a da direita (o leste), 1 a da esquerda (o oeste), 0 nenhuma.
  const noite = altura < 0.5;
  figura.style.setProperty("--sombra-dx", noite ? "0" : Math.sin(azimute * GRAU) >= 0 ? "-1" : "1");
  if (noite) return;
  const sombra = new Path2D();
  let raio = [0, 1];
  for (const degrau of degraus) {
    const r = degrau.getBoundingClientRect();
    const [x, l] = [r.left - rt.left, r.width];
    // O pé: a sombra de contato.
    sombra.rect(x, 0, l, 4);
    // O degrau inteiro: as duas metades (a fronteira é a da condição de fundação, fundacaoNoPreco.fator).
    const alturaDoDegrau = [".vd-degrau-aberto", ".vd-degrau-pedra"].reduce((soma, s) => soma + (degrau.querySelector<HTMLElement>(s)?.offsetHeight ?? 0), 0);
    const comprimento = Math.min(alturaDoDegrau / Math.tan(altura * GRAU), 3 * l);
    // Para longe do Sol: a leste da carta é a direita; a profundidade, dobrada para a frente dos degraus.
    const dx = -comprimento * Math.sin(azimute * GRAU);
    const dy = comprimento * Math.max(0.3, Math.abs(Math.cos(azimute * GRAU))) * 0.5;
    sombra.moveTo(x, 0);
    sombra.lineTo(x + l, 0);
    sombra.lineTo(x + l + dx, dy);
    sombra.lineTo(x + dx, dy);
    sombra.closePath();
    raio = [dx, dy];
  }
  // A hachura: fios paralelos ao raio, a cada 3 px, recortados pela sombra (a união dos degraus).
  const diagonal = Math.hypot(largura, alto);
  ctx.save();
  ctx.clip(sombra);
  ctx.rotate(Math.atan2(raio[1], raio[0]));
  ctx.beginPath();
  for (let s = -diagonal; s <= diagonal; s += 3) {
    ctx.moveTo(-diagonal, s + 0.5);
    ctx.lineTo(diagonal, s + 0.5);
  }
  ctx.strokeStyle = BURIL;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

/** A escada viva: a passagem e as sombras. `dizer` recebe a frase da legenda. Devolve a função que desliga tudo. */
export function escadaViva(figura: HTMLElement, lugar: Lugar, dizer: (frase: string) => void) {
  const canvas = figura.querySelector<HTMLCanvasElement>("canvas.vd-escada-chao");
  const degraus = [...figura.querySelectorAll<HTMLElement>(".vd-escada-degraus > li")];
  if (!canvas || !degraus.length) return () => {};
  const desenhar = () => sombras(figura, canvas, degraus, lugar, dizer);
  desenhar();
  const pararSol = aoVivo(figura, desenhar, 60_000);
  // A largura e a altura da escada mudam com a janela (a altura segue a dela): o chão se refaz, no máximo uma vez por quadro.
  let medida = "";
  let pedido = 0;
  const observador = new ResizeObserver(([e]) => {
    const nova = `${Math.round(e.contentRect.width)}×${Math.round(e.contentRect.height)}`;
    if (nova === medida) return;
    medida = nova;
    cancelAnimationFrame(pedido);
    pedido = requestAnimationFrame(desenhar);
  });
  observador.observe(canvas.parentElement!);
  const pararPassagem = passagem(figura, degraus);
  return () => {
    pararSol();
    pararPassagem();
    observador.disconnect();
    cancelAnimationFrame(pedido);
  };
}

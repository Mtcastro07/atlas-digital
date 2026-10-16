"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { EVENTO_ANCORA, type DetalheDaAncora } from "@/lib/ancoras";

/** Folga mínima entre a base do cabeçalho e o início do conteúdo. */
const FOLGA = 32;

/** Duração da rolagem: cresce com a distância, de 0,65 s a 1,4 s. */
const duracaoDe = (distancia: number) => Math.min(1400, 650 + Math.abs(distancia) * 0.11);

/** Entrada e saída suaves (cúbica): a página acelera, cruza e assenta no destino. */
const suavizar = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

let quadroDaRolagem = 0;
let tempoDaChegada = 0;

function pararRolagem() {
  cancelAnimationFrame(quadroDaRolagem);
  quadroDaRolagem = 0;
}

/**
 * Rolagem até `destino`, quadro a quadro, com a curva acima — mais fluida
 * que a rolagem suave do navegador, que é curta e brusca nas distâncias
 * longas. Só responde ao clique: a rolagem da pessoa (roda, toque,
 * teclado) continua nativa e interrompe esta (ver Ancoras). Devolve a
 * duração, em milissegundos (0 quando instantânea).
 */
function rolarAte(destino: number, instantaneo: boolean) {
  pararRolagem();
  const inicio = window.scrollY;
  const distancia = destino - inicio;
  if (instantaneo || Math.abs(distancia) < 2) {
    window.scrollTo({ top: destino, behavior: "instant" });
    return 0;
  }
  const duracao = duracaoDe(distancia);
  const comeco = performance.now();
  const passo = (agora: number) => {
    const t = Math.min(1, (agora - comeco) / duracao);
    window.scrollTo({ top: inicio + distancia * suavizar(t), behavior: "instant" });
    quadroDaRolagem = t < 1 ? requestAnimationFrame(passo) : 0;
  };
  quadroDaRolagem = requestAnimationFrame(passo);
  return duracao;
}

/**
 * A chegada à resposta (desde 14/10): a pergunta acende quando a rolagem a
 * alcança (.vd-duvida[data-chegou], app/movimento.css), e o atributo sai
 * quando a camada termina (1.400 ms). Uma marcada por vez; a mesma,
 * escolhida de novo, recomeça.
 */
function marcarChegada(resposta: HTMLElement, chegada: number) {
  window.clearTimeout(tempoDaChegada);
  document.querySelectorAll("[data-chegou]").forEach((el) => el.removeAttribute("data-chegou"));
  resposta.style.setProperty("--chegada", `${Math.round(chegada)}ms`);
  void resposta.offsetWidth; // recomeça a camada, se a chegada anterior ainda corria
  resposta.setAttribute("data-chegou", "");
  tempoDaChegada = window.setTimeout(() => resposta.removeAttribute("data-chegou"), chegada + 1400);
}

/**
 * A âncora do endereço, decodificada. Malformada (um vínculo para "/#%E0"),
 * vale como nenhuma: o decodeURIComponent lançaria dentro do efeito e
 * derrubaria a página.
 */
function ancoraDoEndereco() {
  try {
    return decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return "";
  }
}

/** Tira a âncora do endereço sem criar entrada no histórico (preserva o estado do Next). */
function limparEndereco() {
  if (window.location.hash) {
    window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
  }
}

/**
 * Para onde rolar para mostrar o destino. O conteúdo é a caixa do destino
 * sem o respiro (padding) da seção. Se cabe no espaço abaixo do cabeçalho,
 * fica centrado nele; se não cabe, o início do conteúdo para logo abaixo
 * do cabeçalho, sempre à mesma distância.
 */
function posicaoDe(alvo: HTMLElement) {
  const caixa = alvo.getBoundingClientRect();
  const estilo = getComputedStyle(alvo);
  const topo = caixa.top + parseFloat(estilo.paddingTop);
  const conteudo = caixa.bottom - parseFloat(estilo.paddingBottom) - topo;
  const cabecalho = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
  const livre = window.innerHeight - cabecalho;
  const acima = conteudo <= livre ? (livre - conteudo) / 2 : FOLGA;
  const maximo = document.documentElement.scrollHeight - window.innerHeight;
  return Math.max(0, Math.min(window.scrollY + topo - cabecalho - acima, maximo));
}

/** Rola até o destino, centrado, e leva o foco com ele, como um vínculo de âncora comum. */
function irPara(id: string, instantaneo = false) {
  const semMovimento = instantaneo || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!id) {
    rolarAte(0, semMovimento);
    return;
  }
  const alvo = document.getElementById(id);
  if (!alvo) return;
  // A resposta de uma dúvida: o <details> abre antes de medir.
  const resposta = alvo.closest("details");
  if (resposta) resposta.open = true;
  // Um destino numa galeria de deslizar (os planos, no celular): a galeria corre até ele; o encaixe o alinha.
  const galeria = alvo.closest<HTMLElement>(".vd-galeria");
  if (galeria && galeria.scrollWidth > galeria.clientWidth) {
    const esquerda = galeria.scrollLeft + alvo.getBoundingClientRect().left - galeria.getBoundingClientRect().left;
    galeria.scrollTo({ left: esquerda, behavior: semMovimento ? "instant" : "smooth" });
  }
  const chegada = rolarAte(posicaoDe(alvo), semMovimento);
  if (resposta) marcarChegada(resposta, chegada);
  if (!alvo.matches("a[href], button, input, select, textarea, [tabindex]")) alvo.setAttribute("tabindex", "-1");
  alvo.focus({ preventScroll: true });
  window.dispatchEvent(new CustomEvent<DetalheDaAncora>(EVENTO_ANCORA, { detail: { id } }));
}

/** Espera o painel (menu do celular) terminar de fechar antes de rolar. */
function depoisDoPainel(tarefa: () => void) {
  const inicio = performance.now();
  const conferir = () => {
    const aberto = document.querySelector("[role='dialog']");
    if (!aberto || performance.now() - inicio > 700) tarefa();
    else requestAnimationFrame(conferir);
  };
  requestAnimationFrame(conferir);
}

/**
 * Navegação interna com endereço limpo: os vínculos para âncoras da
 * página ("#planos") rolam até o destino — centrado na tela quando cabe,
 * numa rolagem própria e fluida — e levam o foco, mas o endereço fica
 * sem "#parte" e sem entradas no histórico. Quem chega por um endereço
 * com âncora (ou a digita com a página aberta) vai até ela, centrada, e o
 * endereço é limpo em seguida. Sem script, os vínculos funcionam como
 * âncoras comuns.
 * Cliques com Ctrl, Cmd, Shift ou botão do meio seguem o navegador.
 * Desde 01/10 o site tem várias páginas: a ilha fica no layout, e a
 * chegada com âncora vale também para a troca de página (um vínculo como
 * /orcamento#orcamento-essencial). Um destino dentro de um <details> (a
 * resposta de uma dúvida) abre o <details>.
 * Na primeira troca de página, tira o .ja-aberto do <html> (desde 15/10):
 * posto na recarga ou na volta pelo histórico (app/layout.tsx), ele vale só
 * para a página da carga. Até então, nunca saía, e uma recarga apagava o
 * momento de todas as páginas seguintes da navegação
 * (producao/esteira/09-movimento.md, seção 5, item 6, aberto desde 03/10).
 */
export function Ancoras() {
  const caminho = usePathname();
  const caminhoDaCarga = useRef(caminho);
  useEffect(() => {
    if (caminho !== caminhoDaCarga.current) document.documentElement.classList.remove("ja-aberto");
  }, [caminho]);
  useEffect(() => {
    // Chegada com âncora: no endereço da página que abre, ou posta nele com
    // a página aberta (digitada, ou um vínculo de fora para esta mesma
    // página). O navegador já pulou até ela; o ajuste fino é instantâneo.
    const aoChegarComAncora = () => {
      const destino = ancoraDoEndereco();
      if (!destino) return;
      limparEndereco();
      requestAnimationFrame(() => irPara(destino, true));
    };
    aoChegarComAncora();
    window.addEventListener("hashchange", aoChegarComAncora);

    // Na fase de bolha e depois do React: um vínculo cujo clique a própria
    // ilha já tratou (o gatilho do menu) chega com defaultPrevented.
    const aoClicar = (evento: MouseEvent) => {
      if (evento.defaultPrevented || evento.button !== 0) return;
      if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return;
      const vinculo = (evento.target as Element | null)?.closest?.("a[href^='#']");
      if (!vinculo) return;
      const id = decodeURIComponent(vinculo.getAttribute("href")!.slice(1));
      if (id && !document.getElementById(id)) return;

      evento.preventDefault();
      limparEndereco();
      if (vinculo.closest("[role='dialog']")) depoisDoPainel(() => irPara(id));
      else irPara(id);
    };

    document.addEventListener("click", aoClicar);
    // A pessoa assume a rolagem: a animação do clique para onde estiver.
    const interromper = ["wheel", "touchstart", "keydown"] as const;
    interromper.forEach((tipo) => window.addEventListener(tipo, pararRolagem, { passive: true }));
    return () => {
      document.removeEventListener("click", aoClicar);
      window.removeEventListener("hashchange", aoChegarComAncora);
      interromper.forEach((tipo) => window.removeEventListener(tipo, pararRolagem));
      pararRolagem();
    };
  }, [caminho]);

  return null;
}

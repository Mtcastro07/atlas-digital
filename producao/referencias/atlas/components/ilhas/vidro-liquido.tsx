"use client";

/*!
 * Refração do vidro líquido — porte para React da diretiva Angular do plugin
 * liquid-glass (stormaref/LiquidGlassSkill, references/refraction.md).
 *
 * The refraction field is a port of the fragment shader in liquid-glass-js
 * (https://github.com/dashersw/liquid-glass-js) — Copyright (c) 2025 Armagan
 * Amcalar, MIT. Permission is hereby granted, free of charge, to any person
 * obtaining a copy of that software to deal in it without restriction,
 * provided this notice travels with it; it is provided "as is", without
 * warranty of any kind. Keep this header on any copy or port.
 */

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { quandoOcioso } from "@/lib/ocioso";

/** Uniformes do shader de liquid-glass-js, com os valores afinados do plugin. */
type Configuracao = {
  edgeIntensity: number;
  rimIntensity: number;
  baseIntensity: number;
  edgeDistance: number;
  rimDistance: number;
  baseDistance: number;
  cornerBoost: number;
  rippleEffect: number;
  blurRadius: number;
  /** Distorção no centro: desligada, para o texto do meio ficar legível. */
  warp: boolean;
};

const PADRAO: Configuracao = {
  edgeIntensity: 0.015,
  rimIntensity: 0.028,
  baseIntensity: 0.05,
  edgeDistance: 0.5,
  rimDistance: 1.7,
  baseDistance: 0.2,
  cornerBoost: 0.06,
  rippleEffect: 0.26,
  blurRadius: 2,
  warp: false,
};

/** O mapa sai com o dobro da resolução: a refração vive numa faixa de 1 a 2 px na borda. */
const SUPERAMOSTRA = 2;
/** Teto da maior aresta do mapa: a refração é de borda, o meio é neutro. */
const ARESTA_MAXIMA = 1400;
/** Desvio-padrão do desfoque por unidade de blurRadius (ajustado no plugin). */
const DESFOQUE_POR_RAIO = 0.35;

type Filtro = { id: string; no: SVGFilterElement; usos: number };
const filtros = new Map<string, Filtro>();
let definicoes: SVGSVGElement | null = null;
let proximoId = 0;

/**
 * Filtro de fundo com SVG só aparece no Chromium. O Safari aceita a
 * declaração e não pinta nada — por isso a checagem é pelo motor, não por
 * @supports.
 */
function suportaRefracao() {
  const marcas = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands;
  if (marcas) return marcas.some((m) => /Chromium|Google Chrome|Microsoft Edge/i.test(m.brand));
  return /Chrome\//.test(navigator.userAgent);
}

function raioEmPx(calculado: string, w: number, h: number) {
  const valor = parseFloat(calculado) || 0;
  return calculado.trim().endsWith("%") ? (valor / 100) * Math.min(w, h) : valor;
}

const byte = (v: number) => Math.max(0, Math.min(255, Math.round(v)));

/**
 * Assa o campo de refração do shader num mapa de deslocamento: R e G
 * guardam o deslocamento em x e y em torno do neutro, na escala do
 * feDisplacementMap. Fórmulas transcritas do container.js de
 * liquid-glass-js, como no plugin.
 */
function mapaDeDeslocamento(w: number, h: number, raio: number, paginaW: number, paginaH: number, c: Configuracao) {
  const ss = Math.max(0.25, Math.min(SUPERAMOSTRA, ARESTA_MAXIMA / Math.max(w, h)));
  const bw = Math.max(1, Math.round(w * ss));
  const bh = Math.max(1, Math.round(h * ss));
  const r = raio * ss;
  const menor = Math.min(w, h);
  const dx = new Float32Array(bw * bh);
  const dy = new Float32Array(bw * bh);
  let maximo = 0;

  for (let py = 0; py < bh; py++) {
    for (let px = 0; px < bw; px++) {
      const cx = (px + 0.5) / bw;
      const cy = (py + 0.5) / bh;

      // Distância (em px CSS) até a borda do retângulo arredondado.
      const tx = Math.abs(px + 0.5 - bw / 2) - (bw / 2 - r);
      const ty = Math.abs(py + 0.5 - bh / 2) - (bh / 2 - r);
      const fora = Math.hypot(Math.max(tx, 0), Math.max(ty, 0));
      const dentro = Math.min(Math.max(tx, ty), 0);
      const dist = Math.max(-(fora + dentro - r), 0) / ss;

      const borda = Math.exp(-dist * c.edgeDistance);
      const aro = Math.exp(-dist * c.rimDistance);
      const base = c.warp ? (1 - Math.exp(-dist * c.baseDistance)) * c.baseIntensity : 0;
      const total = base + borda * c.edgeIntensity + aro * c.rimIntensity;

      let nx = cx - 0.5;
      let ny = cy - 0.5;
      const comprimento = Math.hypot(nx, ny);
      if (comprimento > 0) {
        nx /= comprimento;
        ny /= comprimento;
      }
      const canto = Math.exp(-Math.max(Math.min(cx, 1 - cx), Math.min(cy, 1 - cy)) * menor * 0.3) * c.cornerBoost;
      const ondula = Math.sin((dist / menor) * 25) * c.rippleEffect * aro;

      const fx = (nx * (total + canto) - ny * ondula) * paginaW;
      const fy = (ny * (total + canto) + nx * ondula) * paginaH;
      const i = py * bw + px;
      dx[i] = fx;
      dy[i] = fy;
      maximo = Math.max(maximo, Math.abs(fx), Math.abs(fy));
    }
  }

  const escala = Math.max(maximo * 2, 1e-4);
  // O feDisplacementMap lê o byte b como escala·(b/255 − 0,5); 128 não é zero.
  // Subtrai-se esse viés para o miolo ficar parado.
  const vies = escala * (128 / 255 - 0.5);
  const tela = document.createElement("canvas");
  tela.width = bw;
  tela.height = bh;
  const contexto = tela.getContext("2d")!;
  const imagem = contexto.createImageData(bw, bh);
  for (let i = 0; i < bw * bh; i++) {
    imagem.data[i * 4] = byte(255 * (0.5 + (dx[i] - vies) / escala));
    imagem.data[i * 4 + 1] = byte(255 * (0.5 + (dy[i] - vies) / escala));
    imagem.data[i * 4 + 2] = 128;
    imagem.data[i * 4 + 3] = 255;
  }
  contexto.putImageData(imagem, 0, 0);
  return { url: tela.toDataURL("image/png"), escala };
}

const SVG = "http://www.w3.org/2000/svg";

/** Um elemento SVG com os atributos dados, na ordem. */
function elementoSvg<K extends keyof SVGElementTagNameMap>(tag: K, atributos: Record<string, string> = {}) {
  const elemento = document.createElementNS(SVG, tag);
  for (const [nome, valor] of Object.entries(atributos)) elemento.setAttribute(nome, valor);
  return elemento;
}

function definicoesSvg() {
  if (!definicoes || !definicoes.isConnected) {
    definicoes = elementoSvg("svg", { width: "0", height: "0", "aria-hidden": "true" });
    definicoes.style.position = "fixed";
    definicoes.appendChild(elementoSvg("defs"));
    document.body.appendChild(definicoes);
  }
  return definicoes;
}

/** Elementos do mesmo tamanho e configuração dividem um filtro. */
function obterFiltro(chave: string, w: number, h: number, raio: number, paginaW: number, paginaH: number, c: Configuracao) {
  const existente = filtros.get(chave);
  if (existente?.no.isConnected) {
    existente.usos++;
    return existente;
  }
  const { url, escala } = mapaDeDeslocamento(w, h, raio, paginaW, paginaH, c);
  const id = `vidro-liquido-${proximoId++}`;

  // A região do filtro passa da caixa pelo alcance do deslocamento mais o
  // espalhamento do desfoque; menor que isso, os cantos ficam transparentes.
  const margem = escala / 2 + 3 * c.blurRadius * DESFOQUE_POR_RAIO;
  const mx = (margem / w) * 100;
  const my = (margem / h) * 100;
  const filtro = elementoSvg("filter", {
    id,
    x: `${-mx}%`,
    y: `${-my}%`,
    width: `${100 + 2 * mx}%`,
    height: `${100 + 2 * my}%`,
    "color-interpolation-filters": "sRGB",
  });
  const mapa = elementoSvg("feImage", { href: url, x: "0", y: "0", width: String(w), height: String(h), preserveAspectRatio: "none", result: "mapa" });
  const deslocamento = elementoSvg("feDisplacementMap", {
    in: "SourceGraphic",
    in2: "mapa",
    scale: String(escala),
    xChannelSelector: "R",
    yChannelSelector: "G",
    result: "deslocado",
  });
  const desfoque = elementoSvg("feGaussianBlur", { in: "deslocado", stdDeviation: String(c.blurRadius * DESFOQUE_POR_RAIO) });
  filtro.append(mapa, deslocamento, desfoque);
  definicoesSvg().querySelector("defs")!.appendChild(filtro);
  const novo = { id, no: filtro, usos: 1 };
  filtros.set(chave, novo);
  return novo;
}

function soltarFiltro(chave: string | null) {
  if (!chave) return;
  const filtro = filtros.get(chave);
  if (filtro && --filtro.usos <= 0) {
    filtros.delete(chave);
    filtro.no.remove();
  }
}

/** Liga a refração a um elemento; devolve a função que a desliga. */
function refratar(el: HTMLElement) {
  const config: Configuracao = { ...PADRAO };
  const desfoque = Number(el.dataset.vidroDesfoque);
  if (desfoque > 0) config.blurRadius = desfoque;
  // Borda mais funda, para o vidro ler como líquido (a barra e o cartão de "O Atlas").
  const forca = Number(el.dataset.vidroIntensidade);
  if (forca > 0) {
    config.edgeIntensity *= forca;
    config.rimIntensity *= forca;
    config.cornerBoost *= forca;
  }
  let chaveAtual: string | null = null;
  let quadro = 0;

  const refazer = () => {
    const w = Math.round(el.offsetWidth);
    const h = Math.round(el.offsetHeight);
    if (w < 2 || h < 2) return;
    const raio = Math.min(raioEmPx(getComputedStyle(el).borderTopLeftRadius, w, h), Math.min(w, h) / 2);
    // O shader desloca em frações da página; o equivalente vivo é a janela.
    const paginaW = window.innerWidth;
    const paginaH = window.innerHeight;
    const chave = [w, h, raio, paginaW, paginaH, JSON.stringify(config)].join("|");
    if (chave === chaveAtual) return;
    soltarFiltro(chaveAtual);
    const filtro = obterFiltro(chave, w, h, raio, paginaW, paginaH, config);
    chaveAtual = chave;
    // O que se soma à refração vem de --vidro-filtro, no CSS: a barra muda o
    // escurecimento conforme o que passa por trás dela (app/vidro.css).
    el.style.backdropFilter = `url(#${filtro.id}) var(--vidro-filtro, )`;
  };
  const agendar = () => {
    cancelAnimationFrame(quadro);
    quadro = requestAnimationFrame(refazer);
  };

  const observador = new ResizeObserver(agendar);
  observador.observe(el);
  return () => {
    observador.disconnect();
    cancelAnimationFrame(quadro);
    soltarFiltro(chaveAtual);
    el.style.backdropFilter = "";
  };
}

/**
 * Refração do vidro líquido nos elementos com [data-vidro-liquido]: o fundo
 * se dobra na borda, como num vidro de verdade. Assa um mapa de
 * deslocamento por tamanho de elemento (feImage → feDisplacementMap →
 * feGaussianBlur) e aponta o backdrop-filter do elemento para ele. O fundo
 * é lido ao vivo: rolagem e animação passam pela refração sem custo extra.
 * - data-vidro-desfoque: o blurRadius do shader (padrão 2, vidro claro).
 * - data-vidro-intensidade: multiplica a dobra da borda (padrão 1).
 * - --vidro-filtro (CSS): funções de filtro somadas depois da refração.
 * Só no Chromium, com ponteiro fino (computador) e sem pedido de menos
 * transparência; nos demais — inclusive no celular, onde assar os mapas
 * custaria processador num aparelho modesto —, fica o backdrop-filter do
 * CSS (vidro fosco). Os mapas são assados com o navegador ocioso, depois
 * da carga, e refeitos quando o elemento ou a janela mudam de tamanho —
 * e a cada troca de página (fica no layout). Não desenha nada.
 */
export function VidroLiquido() {
  const caminho = usePathname();
  useEffect(() => {
    if (!suportaRefracao()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-transparency: reduce)").matches) return;

    let desligar: (() => void)[] = [];
    let espera: ReturnType<typeof setTimeout> | undefined;
    const ligar = () => {
      desligar.forEach((f) => f());
      desligar = [...document.querySelectorAll<HTMLElement>("[data-vidro-liquido]")].map(refratar);
    };
    // A janela mudou de tamanho: a refração de todos muda (é proporcional à
    // janela). Espera o arraste terminar para refazer.
    const aoRedimensionar = () => {
      clearTimeout(espera);
      espera = setTimeout(ligar, 180);
    };
    const cancelarOcioso = quandoOcioso(ligar);
    window.addEventListener("resize", aoRedimensionar, { passive: true });

    return () => {
      cancelarOcioso();
      clearTimeout(espera);
      window.removeEventListener("resize", aoRedimensionar);
      desligar.forEach((f) => f());
    };
  }, [caminho]);

  return null;
}

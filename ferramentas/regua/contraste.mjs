// Bloco 4 · contraste, medido no que o navegador desenha, não calculado do
// hexadecimal — inclusive sobre degradê, imagem, vidro e WebGL. Para cada
// tela da página: fotografa a tela, some com a cor de todo texto e fotografa
// só o fundo; nos pixels em que as duas diferem (onde o texto está desenhado),
// compara a cor de cada texto (com a opacidade dele e dos ancestrais) com o
// fundo que fica por trás. Vale o pior trecho (o 5º percentil), contra 4,5:1
// no texto comum e 3:1 no grande (24 px, ou 18,66 px em negrito).
//
// Fica para a conferência à mão, e o relatório diz onde: texto com cópia
// decorativa por cima (os gestos do Spell UI — a tarja, a onda, o brilho),
// texto pintado por degradê (background-clip: text), texto com desenho no
// próprio fundo (o risco das ausências da barbearia) e texto que nunca
// aparece inteiro, sem cobertura, em nenhuma das telas.

import { lerPng } from "./png.mjs";
import { avaliar } from "./sondas.mjs";

const SEM_TEXTO = `*, *::before, *::after { color: transparent !important; -webkit-text-fill-color: transparent !important;
  text-shadow: none !important; text-decoration-color: transparent !important; caret-color: transparent !important;
  transition: none !important; }`;

// Os textos inteiros nesta tela, ainda não medidos, que nada cobre.
function textosNaTela() {
  window.__regua ??= { proximo: 0, medidos: new Set(), manuais: new Set(), todos: new Set() };
  const estado = window.__regua;
  const altura = innerHeight;
  const largura = document.documentElement.clientWidth;
  const saida = [];
  for (const el of document.body.querySelectorAll('*')) {
    if (!textoProprio(el) || decorativo(el) || naoDesenhado(el) || opacidade(el) < 0.05) continue;
    if (el.closest('input, textarea, select, option, [disabled], [aria-disabled="true"]')) continue;
    el.__reguaId ??= ++estado.proximo;
    const id = el.__reguaId;
    estado.todos.add(id);
    if (estado.medidos.has(id) || estado.manuais.has(id)) continue;
    const cs = getComputedStyle(el);
    const preenchimento = cs.webkitTextFillColor || cs.color;
    const comCopia = [...el.querySelectorAll('[aria-hidden="true"]')].some((d) => d.textContent.trim());
    // Desenho no fundo do próprio texto (o risco das ausências, um sublinhado desenhado): a linha
    // passa por baixo das letras e entraria na conta como se fosse o fundo.
    const desenhoNoFundo = cs.backgroundImage !== 'none';
    if (comCopia || desenhoNoFundo || paraRgba(preenchimento)[3] === 0) {
      estado.manuais.add(id);
      saida.push({ id, nome: descrever(el), manual: true });
      continue;
    }
    const rects = [];
    let inteiro = true;
    for (const no of el.childNodes) {
      if (no.nodeType !== 3 || !no.textContent.trim()) continue;
      const faixa = document.createRange();
      faixa.selectNodeContents(no);
      for (const r of faixa.getClientRects()) {
        if (r.width < 1 || r.height < 1) continue;
        if (r.top < 0 || r.bottom > altura || r.left < 0 || r.right > largura) inteiro = false;
        rects.push({ left: r.left, top: r.top, right: r.right, bottom: r.bottom });
      }
    }
    if (!rects.length || !inteiro) continue;
    // Coberto por outra camada (o cabeçalho, o atalho do WhatsApp, a caixa empilhada de cima):
    // no centro de cada linha, o que está por cima precisa ser o próprio texto. O que não
    // recebe o ponteiro (o grão, os halos) não conta: fica no fundo fotografado.
    const coberto = rects.some((r) => {
      const alvo = document.elementFromPoint((r.left + r.right) / 2, (r.top + r.bottom) / 2);
      return !alvo || (alvo !== el && !el.contains(alvo));
    });
    if (coberto) continue;
    const peso = parseInt(cs.fontWeight, 10) || 400;
    const tamanho = parseFloat(cs.fontSize);
    const cor = paraRgba(preenchimento);
    estado.medidos.add(id);
    saida.push({ id, nome: descrever(el), cor, opacidade: opacidade(el), grande: tamanho >= 24 || (tamanho >= 18.66 && peso >= 700), rects });
  }
  return saida;
}

function naoMedidos() {
  const estado = window.__regua;
  return estado ? estado.todos.size - estado.medidos.size - estado.manuais.size : 0;
}

const linear = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const luminancia = (r, g, b) => 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);

// Os pixels em que o texto está de fato desenhado: os que mudam entre a tela com
// texto e a tela sem ele. A caixa da linha inclui o vão das letras e, com
// entrelinha 1, invade a linha vizinha (e a tarja dela); medir a caixa inteira
// acusava o que não é texto.
function pixelsDoTexto(texto, comTexto, semTexto) {
  const dentro = [];
  const todos = [];
  for (const caixa of texto.rects) {
    for (let y = Math.ceil(caixa.top); y < Math.floor(caixa.bottom); y += 1) {
      for (let x = Math.ceil(caixa.left); x < Math.floor(caixa.right); x += 1) {
        if (x >= semTexto.largura || y >= semTexto.altura) continue;
        const i = (y * semTexto.largura + x) * semTexto.canais;
        todos.push(i);
        const diferenca = Math.abs(comTexto.px[i] - semTexto.px[i]) + Math.abs(comTexto.px[i + 1] - semTexto.px[i + 1]) + Math.abs(comTexto.px[i + 2] - semTexto.px[i + 2]);
        if (diferenca > 60) dentro.push(i);
      }
    }
  }
  return dentro.length >= 6 ? dentro : todos;
}

function piorContraste(texto, comTexto, semTexto) {
  const [r, g, b, a = 1] = texto.cor;
  const alfa = a * texto.opacidade;
  const razoes = [];
  for (const i of pixelsDoTexto(texto, comTexto, semTexto)) {
    const fr = semTexto.px[i];
    const fg = semTexto.px[i + 1];
    const fb = semTexto.px[i + 2];
    // A cor do texto como ela chega à tela: a transparência dele sobre o fundo.
    const lt = luminancia(alfa * r + (1 - alfa) * fr, alfa * g + (1 - alfa) * fg, alfa * b + (1 - alfa) * fb);
    const lf = luminancia(fr, fg, fb);
    razoes.push((Math.max(lt, lf) + 0.05) / (Math.min(lt, lf) + 0.05));
  }
  if (!razoes.length) return null;
  razoes.sort((x, y) => x - y);
  return razoes[Math.floor(razoes.length * 0.05)];
}

/** Mede a página inteira, tela por tela. */
export async function medirContraste(pagina) {
  const falhas = [];
  const manuais = [];
  let medidos = 0;
  const alturaTela = pagina.viewportSize().height;
  const alturaPagina = await pagina.evaluate(() => document.documentElement.scrollHeight);
  const paradas = [];
  for (let y = 0; y < alturaPagina - alturaTela; y += Math.round(alturaTela * 0.6)) paradas.push(y);
  paradas.push(Math.max(0, alturaPagina - alturaTela));

  for (const y of paradas) {
    await pagina.evaluate((topo) => window.scrollTo({ top: topo, behavior: 'instant' }), y);
    await pagina.waitForTimeout(350);
    const textos = await avaliar(pagina, textosNaTela);
    const aMedir = textos.filter((t) => !t.manual);
    for (const t of textos) if (t.manual) manuais.push(t.nome);
    if (!aMedir.length) continue;
    const comTexto = lerPng(await pagina.screenshot({ scale: 'css' }));
    await pagina.evaluate((css) => {
      const estilo = document.createElement('style');
      estilo.id = 'regua-sem-texto';
      estilo.textContent = css;
      document.head.append(estilo);
    }, SEM_TEXTO);
    await pagina.waitForTimeout(60);
    const semTexto = lerPng(await pagina.screenshot({ scale: 'css' }));
    await pagina.evaluate(() => document.getElementById('regua-sem-texto')?.remove());
    for (const t of aMedir) {
      const razao = piorContraste(t, comTexto, semTexto);
      if (razao === null) continue;
      medidos += 1;
      const minimo = t.grande ? 3 : 4.5;
      if (razao < minimo - 0.05) falhas.push(`${t.nome}: ${razao.toFixed(2)}:1 (mínimo ${minimo}:1)`);
    }
  }
  await pagina.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  const semMedida = await avaliar(pagina, naoMedidos);
  return { medidos, falhas: [...new Set(falhas)], manuais: [...new Set(manuais)], semMedida };
}

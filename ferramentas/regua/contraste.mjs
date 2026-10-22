// Bloco 4 · contraste, medido no que o navegador desenha, não calculado do
// hexadecimal — inclusive sobre degradê, imagem, vidro e WebGL. Para cada
// tela da página: fotografa a tela, some com a cor de todo texto e fotografa
// só o fundo; nos pixels em que as duas diferem (onde o texto está desenhado),
// compara a cor de cada texto (com a opacidade dele e dos ancestrais) com o
// fundo que fica por trás. Vale o pior trecho (o 5º percentil), contra 4,5:1
// no texto comum e 3:1 no grande (24 px, ou 18,66 px em negrito).
//
// O texto misturado à camada de baixo (mix-blend-mode, nele ou num ancestral
// até a seção) não chega à tela na cor declarada: nele, a razão se mede entre
// os pixels das duas fotos, no miolo das letras (decisão do aprovador,
// 16.10.2026; o miolo pela cobertura aguarda a aprovação: contrasteDesenhado,
// abaixo). Se não houver o que medir, aviso.
//
// Fica para a conferência à mão, e o relatório diz onde: texto com cópia
// decorativa por cima (os gestos do Spell UI — a tarja, a onda, o brilho),
// texto pintado por degradê (background-clip: text), texto com desenho no
// próprio fundo (o risco das ausências da barbearia) e texto que nunca
// aparece inteiro, sem cobertura, em nenhuma das telas.
//
// O texto das figuras (desde 17/10, "o Atlas Digital"): o <text> dos SVG e o texto dos blocos aria-hidden, onde mora a
// metade digital (as leituras vivas, os rótulos das cartas), que o caminho de cima pula (decorativo). Mede-se à parte,
// pelo método do J3 (a direção de 17/10, seção 5): a cor declarada, com a opacidade e o fill-opacity, sobre o fundo
// fotografado sem o preenchimento da letra, no pior trecho (o 5º percentil), contra o mesmo mínimo. O contorno e a
// sombra ficam na foto do fundo: o "halo de carta" (o contorno na cor do fundo, paint-order: stroke) é o fundo da
// letra, e medir sem ele acusaria o desenho que o halo esconde. Volta em `figuras`, que a régua dá como aviso até a
// calibração (02-regua.md, seção 10). O texto desenhado no canvas (fillText) não está no DOM: conferência à mão.
// A exceção é o número em meio-tom (o canvas .valor da leitura, DIRECAO-DIGITAL.md, 2.4): o ponto aceso tem o
// contraste da tinta chapada, e quem tem baixa visão lê a média; ele se mede pela média da cobertura (seção 2.1).

import { lerPng } from "./png.mjs";
import { avaliar } from "./sondas.mjs";

// A letra sem mistura, numa cor só: em preto e em branco, a diferença das duas fotos é a cobertura de cada pixel.
const LETRA = (cor) => `*, *::before, *::after { mix-blend-mode: normal !important; color: ${cor} !important;
  -webkit-text-fill-color: ${cor} !important; text-shadow: none !important; transition: none !important; }`;
const SEM_TEXTO = `*, *::before, *::after { color: transparent !important; -webkit-text-fill-color: transparent !important;
  text-shadow: none !important; text-decoration-color: transparent !important; caret-color: transparent !important;
  transition: none !important; }`;

// Os textos inteiros nesta tela, ainda não medidos, que nada cobre.
function textosNaTela() {
  window.__regua ??= { proximo: 0, medidos: new Set(), manuais: new Set(), todos: new Set(), misturados: new Map() };
  const estado = window.__regua;
  const altura = innerHeight;
  const largura = document.documentElement.clientWidth;
  const saida = [];
  // A barra do polegar (.vd-polegar, o prazo e o WhatsApp do celular) e a sombra dela, 8 px em volta (0 2px 8px -2px:
  // 6 px dos lados, 8 embaixo; app/digital.css): presa ao pé, passa sobre o texto, que fica para outra tela
  // (17.10.2026: a sombra, fora da caixa, não recebe o ponteiro, e o elementFromPoint não a via). Até 18.10.2026, o
  // atalho flutuante (.vd-atalho), com 32 px de sombra, que a barra substituiu.
  const flutuantes = [...document.querySelectorAll('.vd-polegar')].map((f) => f.getBoundingClientRect()).filter((f) => f.width > 0);
  for (const el of document.body.querySelectorAll('*')) {
    if (!textoProprio(el) || decorativo(el) || escondido(el) || opacidade(el) < 0.05) continue;
    if (el.closest('input, textarea, select, option, [disabled], [aria-disabled="true"]')) continue;
    el.__reguaId ??= ++estado.proximo;
    const id = el.__reguaId;
    // A mistura com o fundo, no texto ou num ancestral até a seção: a cor declarada não é a desenhada.
    // Lida a cada tela, e não guardada: a mistura pode ligar depois (a revelação, o html[data-palco]).
    let misturado = '';
    const ate = (el.closest('section') ?? document.body).parentElement;
    for (let a = el; a && a !== ate; a = a.parentElement) {
      const modo = getComputedStyle(a).mixBlendMode;
      if (modo !== 'normal') misturado = modo;
    }
    // A caixa de 1 px ou menos sai da conta, como o só para leitor de tela, também medida sem a transformação
    // (offsetWidth: girada, a caixa de 1 px mede 1,05 na tela); mas o texto misturado que transborda dela
    // à vista (sem recorte) fica no aviso: a medida falhou, e isso não é aprovação (16.10.2026).
    const minimo = naoDesenhado(el) || el.offsetWidth <= 1 || el.offsetHeight <= 1;
    if (misturado && !(minimo && getComputedStyle(el).overflow !== 'visible')) estado.misturados.set(id, descrever(el));
    if (minimo) continue;
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
    // Coberto por outra camada (o cabeçalho, a barra do polegar, a caixa empilhada de cima):
    // no centro de cada linha, o que está por cima precisa ser o próprio texto. O que não
    // recebe o ponteiro (o grão, os halos) não conta: fica no fundo fotografado. Nas duas pontas e no
    // centro de cada linha (17.10.2026): o atalho cobria só a ponta, e o bronze dele entrava como fundo.
    const coberto = rects.some((r) =>
      [0.04, 0.5, 0.96].some((f) => {
        const alvo = document.elementFromPoint(r.left + (r.right - r.left) * f, (r.top + r.bottom) / 2);
        return !alvo || (alvo !== el && !el.contains(alvo));
      }),
    );
    const naSombra = rects.some((r) => flutuantes.some((f) => r.right > f.left - 8 && r.left < f.right + 8 && r.bottom > f.top - 8 && r.top < f.bottom + 8));
    if (coberto || naSombra) continue;
    const peso = parseInt(cs.fontWeight, 10) || 400;
    const tamanho = parseFloat(cs.fontSize);
    const cor = paraRgba(preenchimento);
    estado.medidos.add(id);
    saida.push({ id, nome: descrever(el), cor, opacidade: opacidade(el), grande: tamanho >= 24 || (tamanho >= 18.66 && peso >= 700), rects, misturado });
  }
  return saida;
}

// A letra das figuras sem o preenchimento, com o contorno e a sombra: o halo de carta fica no fundo.
const SEM_FIGURA = `svg text, svg text * { fill: transparent !important; transition: none !important; }
  [aria-hidden="true"], [aria-hidden="true"] * { -webkit-text-fill-color: transparent !important; transition: none !important; }`;
// O número em meio-tom: o canvas do valor da leitura.
const MEIO_TOM = '.vd-leitura canvas.valor, .vd-leitura .valor canvas';
const SEM_MEIO_TOM = `${MEIO_TOM} { visibility: hidden !important; }`;
// O indicador do next dev (no canto de baixo, preso à tela dentro da sombra do nextjs-portal, que a cobertura não vê)
// fica fora das fotos das figuras: a régua roda contra o build, mas as peças em construção se medem no dev.
const SEM_DEV = 'nextjs-portal { display: none !important; }';

// O texto das figuras inteiro nesta tela, ainda não medido: o <text> dos SVG (com os tspan) e o texto próprio dos
// blocos aria-hidden. O do canvas é o conteúdo alternativo, que não se desenha. E o canvas do meio-tom (o seletor).
function textosDaFigura(meioTom) {
  window.__reguaFigura ??= { proximo: 0, medidos: new Set(), todos: new Set() };
  const estado = window.__reguaFigura;
  const altura = innerHeight;
  const largura = document.documentElement.clientWidth;
  // A cobertura: o rótulo da figura costuma não receber o ponteiro (pointer-events: none), e o elementFromPoint do
  // texto comum o daria por coberto sempre. Cobre o que fica preso à tela: o cabeçalho e a barra do polegar (com a sombra, 8 px).
  const presos = [...document.body.querySelectorAll('*')]
    .filter((p) => /^(fixed|sticky)$/.test(getComputedStyle(p).position) && !naoDesenhado(p))
    .map((p) => ({ p, caixa: p.getBoundingClientRect(), margem: p.matches('.vd-polegar') ? 8 : 0 }));
  const coberto = (el, rects) => rects.some((r) => presos.some(({ p, caixa: q, margem: m }) =>
    !p.contains(el) && r.right > q.left - m && r.left < q.right + m && r.bottom > q.top - m && r.top < q.bottom + m));
  const fora = (r) => r.top < 0 || r.bottom > altura || r.left < 0 || r.right > largura;
  const saida = [];
  for (const el of document.body.querySelectorAll('svg text, [aria-hidden="true"], [aria-hidden="true"] *')) {
    const svg = !!el.closest('svg');
    if (svg ? el.tagName.toLowerCase() !== 'text' : el.closest('canvas')) continue;
    const texto = svg ? el.textContent.replace(/\s+/g, ' ').trim() : textoProprio(el);
    if (!texto || naoDesenhado(el) || opacidade(el) < 0.05) continue;
    const cs = getComputedStyle(el);
    const tinta = svg ? cs.fill : cs.webkitTextFillColor || cs.color;
    // A letra pintada por degradê (fill: url(#…), background-clip: text) ou transparente (a cópia que só desenha o
    // brilho, que o caminho de cima já manda à conferência à mão no texto que ela cobre): sem cor declarada a compor.
    if (/^(url|none)/.test(tinta)) continue;
    const cor = paraRgba(tinta);
    const alfa = svg ? parseFloat(cs.fillOpacity) : 1;
    if (cor[3] * alfa === 0) continue;
    el.__reguaFiguraId ??= ++estado.proximo;
    const id = el.__reguaFiguraId;
    estado.todos.add(id);
    if (estado.medidos.has(id)) continue;
    const rects = [];
    const caixas = svg ? [el.getBoundingClientRect()] : [...el.childNodes].filter((no) => no.nodeType === 3 && no.textContent.trim()).flatMap((no) => {
      const faixa = document.createRange();
      faixa.selectNodeContents(no);
      return [...faixa.getClientRects()];
    });
    for (const r of caixas) if (r.width >= 1 && r.height >= 1) rects.push({ left: r.left, top: r.top, right: r.right, bottom: r.bottom });
    if (!rects.length || rects.some(fora) || coberto(el, rects)) continue;
    // O corpo desenhado: no SVG, o font-size na escala da viewBox (a matriz até a tela).
    const m = svg ? el.getScreenCTM() : null;
    const tamanho = parseFloat(cs.fontSize) * (m ? Math.sqrt(Math.abs(m.a * m.d - m.b * m.c)) : 1);
    const peso = parseInt(cs.fontWeight, 10) || 400;
    estado.medidos.add(id);
    saida.push({
      id,
      nome: svg ? `text${el.id ? '#' + el.id : ''} "${texto.slice(0, 32)}"` : descrever(el),
      cor,
      opacidade: opacidade(el) * alfa,
      grande: tamanho >= 24 || (tamanho >= 18.66 && peso >= 700),
      rects,
    });
  }
  for (const el of document.querySelectorAll(meioTom)) {
    if (naoDesenhado(el) || opacidade(el) < 0.05) continue;
    el.__reguaFiguraId ??= ++estado.proximo;
    const id = el.__reguaFiguraId;
    estado.todos.add(id);
    const r = el.getBoundingClientRect();
    const rects = [{ left: r.left, top: r.top, right: r.right, bottom: r.bottom }];
    if (estado.medidos.has(id) || r.width < 1 || r.height < 1 || fora(r) || coberto(el, rects)) continue;
    estado.medidos.add(id);
    // O meio-tom só existe de 24 px de maiúscula para cima (seção 2.4): texto grande, pela altura do canvas.
    saida.push({ id, nome: `${descrever(el)} (meio-tom, pela média)`, meioTom: true, grande: r.height >= 24, rects });
  }
  return saida;
}

// Os que nunca se mediram; dos misturados, os nomes (vão para a conferência à mão).
function naoMedidos() {
  const estado = window.__regua;
  if (!estado) return { quantos: 0, misturados: [] };
  const fora = [...estado.misturados].filter(([id]) => !estado.medidos.has(id) && !estado.manuais.has(id));
  return { quantos: estado.todos.size - estado.medidos.size - estado.manuais.size, misturados: fora.map(([, nome]) => nome) };
}

const linear = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const luminancia = (r, g, b) => 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
const razao = (la, lb) => (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);

// Os pixels das caixas das linhas do texto, como posições na foto.
function pixelsDaCaixa(texto, foto) {
  const lista = [];
  for (const caixa of texto.rects) {
    for (let y = Math.ceil(caixa.top); y < Math.floor(caixa.bottom); y += 1) {
      for (let x = Math.ceil(caixa.left); x < Math.floor(caixa.right); x += 1) {
        if (x < foto.largura && y < foto.altura) lista.push((y * foto.largura + x) * foto.canais);
      }
    }
  }
  return lista;
}

// Os pixels em que o texto está de fato desenhado: os que mudam entre a tela com
// texto e a tela sem ele. A caixa da linha inclui o vão das letras e, com
// entrelinha 1, invade a linha vizinha (e a tarja dela); medir a caixa inteira
// acusava o que não é texto.
function pixelsDoTexto(texto, comTexto, semTexto) {
  const todos = pixelsDaCaixa(texto, semTexto);
  const dentro = todos.filter((i) => Math.abs(comTexto.px[i] - semTexto.px[i]) + Math.abs(comTexto.px[i + 1] - semTexto.px[i + 1]) + Math.abs(comTexto.px[i + 2] - semTexto.px[i + 2]) > 60);
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
    razoes.push(razao(lt, luminancia(fr, fg, fb)));
  }
  if (!razoes.length) return null;
  razoes.sort((x, y) => x - y);
  return razoes[Math.floor(razoes.length * 0.05)];
}

// O meio-tom pela média da cobertura (DIRECAO-DIGITAL.md, 2.1, como o lê quem tem baixa visão): os pixels em que os
// pontos se desenham (os que mudam entre a foto com o canvas e a sem ele), fechados em 1 px (dilata e erode: o vão
// entre os pontos entra, a borda de fora não cresce), e a luz média deles, em luz linear, com o canvas e sem ele.
// Sem pontos (menos de 12 pixels), null.
function contrasteDaMedia(texto, com, sem) {
  const [r] = texto.rects;
  const [x0, y0] = [Math.max(0, Math.ceil(r.left)), Math.max(0, Math.ceil(r.top))];
  const [l, a] = [Math.min(com.largura, Math.floor(r.right)) - x0, Math.min(com.altura, Math.floor(r.bottom)) - y0];
  if (l < 3 || a < 3) return null;
  const pixel = (k) => ((y0 + Math.floor(k / l)) * com.largura + x0 + (k % l)) * com.canais;
  const mudou = Uint8Array.from({ length: l * a }, (_, k) => {
    const i = pixel(k);
    return Math.abs(com.px[i] - sem.px[i]) + Math.abs(com.px[i + 1] - sem.px[i + 1]) + Math.abs(com.px[i + 2] - sem.px[i + 2]) > 24 ? 1 : 0;
  });
  const vizinhos = (m, regra) => m.map((_, k) => {
    const [x, y] = [k % l, Math.floor(k / l)];
    let n = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) n += x + dx >= 0 && x + dx < l && y + dy >= 0 && y + dy < a ? m[(y + dy) * l + x + dx] : 0;
    return regra(n) ? 1 : 0;
  });
  const fechado = vizinhos(vizinhos(mudou, (n) => n > 0), (n) => n === 9);
  let [n, lc, ls] = [0, 0, 0];
  fechado.forEach((dentro, k) => {
    if (!dentro) return;
    const i = pixel(k);
    n += 1;
    lc += luminancia(com.px[i], com.px[i + 1], com.px[i + 2]);
    ls += luminancia(sem.px[i], sem.px[i + 1], sem.px[i + 2]);
  });
  return n < 12 ? null : razao(lc / n, ls / n);
}

// O texto misturado (decisão do aprovador, Matheus Castro Oliveira de Luna Garcia, 16.10.2026): a razão, pixel a
// pixel, entre a foto com o texto (a cor desenhada) e a foto sem ele (o fundo), no miolo das letras.
// O miolo, na decisão, é "a metade dos pixels que mais mudam entre as duas capturas". Este código roda uma PROPOSTA
// de Claude Code (16.10.2026), que AGUARDA a aprovação de Matheus Castro Oliveira de Luna Garcia: a metade dos
// pixels que a letra mais cobre, lida na letra sem mistura, em preto e em branco (a diferença das duas fotos é a
// cobertura, qualquer que seja o fundo). Pela mudança, a parte que a mistura apaga não muda e sai da conta: na
// autoconferência, "Partido" (metade sumida) aprovaria com 21:1. Se a proposta for recusada, o miolo volta a ser a
// metade dos pixels que mais mudam entre comTexto e semTexto.
// Vale o 10º percentil, o da decisão. A folga é de ~10% da letra, o dobro da do texto comum (5%): pela cobertura,
// um trecho apagado ocupa no miolo a mesma fração que ocupa na letra. Na autoconferência, "Odontologia" a 48 px
// com 10% da largura apagada (o "a" final some) aprova com 21:1; com 12%, reprova. O 5º daria a folga do texto
// comum, mas reprova a inicial da odontologia a 390 px ("a", 2,60:1: a borda da placa sobre o traço de cima da
// letra). A escolha entre os dois aguarda Matheus Castro Oliveira de Luna Garcia (16.10.2026).
// Sem miolo (menos de 12 pixels cobertos), null: vira conferência à mão.
function contrasteDesenhado(texto, comTexto, semTexto, letra) {
  const { preta, branca } = letra;
  const cobertos = [];
  for (const i of pixelsDaCaixa(texto, semTexto)) {
    const cobertura = (branca.px[i] + branca.px[i + 1] + branca.px[i + 2] - preta.px[i] - preta.px[i + 1] - preta.px[i + 2]) / 765;
    if (cobertura > 0.1) cobertos.push([cobertura, i]);
  }
  if (cobertos.length < 12) return null;
  cobertos.sort((a, b) => b[0] - a[0]);
  const razoes = cobertos
    .slice(0, Math.ceil(cobertos.length / 2))
    .map(([, i]) => razao(luminancia(comTexto.px[i], comTexto.px[i + 1], comTexto.px[i + 2]), luminancia(semTexto.px[i], semTexto.px[i + 1], semTexto.px[i + 2])))
    .sort((x, y) => x - y);
  return razoes[Math.floor(razoes.length * 0.1)];
}

// A foto da tela com um estilo por cima, tirado logo depois.
async function fotografarCom(pagina, css) {
  await pagina.evaluate((texto) => {
    const estilo = document.createElement('style');
    estilo.id = 'regua-estilo';
    estilo.textContent = texto;
    document.head.append(estilo);
  }, css);
  await pagina.waitForTimeout(60);
  const foto = lerPng(await pagina.screenshot({ scale: 'css' }));
  await pagina.evaluate(() => document.getElementById('regua-estilo')?.remove());
  return foto;
}

/** Mede a página inteira, tela por tela. */
export async function medirContraste(pagina) {
  const falhas = [];
  const manuais = [];
  const desenhados = [];
  const aConferir = [];
  const figuras = [];
  const figurasAbaixo = [];
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
    const daFigura = await avaliar(pagina, textosDaFigura, MEIO_TOM);
    if (daFigura.length) {
      const comFigura = await fotografarCom(pagina, SEM_DEV);
      const semFigura = await fotografarCom(pagina, SEM_DEV + SEM_FIGURA);
      const semMeioTom = daFigura.some((t) => t.meioTom) && (await fotografarCom(pagina, SEM_DEV + SEM_MEIO_TOM));
      for (const t of daFigura) {
        const medida = t.meioTom ? contrasteDaMedia(t, comFigura, semMeioTom) : piorContraste(t, comFigura, semFigura);
        if (medida === null) {
          if (t.meioTom) figuras.push(`${t.nome}: sem pontos desenhados nesta tela (conferir à mão)`);
          continue;
        }
        const minimo = t.grande ? 3 : 4.5;
        const linha = `${t.nome}: ${medida.toFixed(2)}:1 (mínimo ${minimo}:1)`;
        figuras.push(linha);
        if (medida < minimo - 0.05) figurasAbaixo.push(linha);
      }
    }
    if (!aMedir.length) continue;
    const comTexto = lerPng(await pagina.screenshot({ scale: 'css' }));
    const semTexto = await fotografarCom(pagina, SEM_TEXTO);
    const letra = aMedir.some((t) => t.misturado) && { preta: await fotografarCom(pagina, LETRA('#000')), branca: await fotografarCom(pagina, LETRA('#fff')) };
    for (const t of aMedir) {
      const medida = t.misturado ? contrasteDesenhado(t, comTexto, semTexto, letra) : piorContraste(t, comTexto, semTexto);
      if (medida === null) {
        if (t.misturado) aConferir.push(t.nome);
        continue;
      }
      medidos += 1;
      const minimo = t.grande ? 3 : 4.5;
      if (t.misturado) desenhados.push(`${t.nome}: ${medida.toFixed(2)}:1 (mínimo ${minimo}:1)`);
      if (medida < minimo - 0.05) falhas.push(`${t.nome}: ${medida.toFixed(2)}:1 (mínimo ${minimo}:1${t.misturado ? `; a cor desenhada, mix-blend-mode: ${t.misturado}` : ''})`);
    }
  }
  await pagina.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  const resto = await avaliar(pagina, naoMedidos);
  const figurasSemMedida = await avaliar(pagina, () => (window.__reguaFigura ? window.__reguaFigura.todos.size - window.__reguaFigura.medidos.size : 0));
  return {
    figuras: { medidas: [...new Set(figuras)], abaixo: [...new Set(figurasAbaixo)], semMedida: figurasSemMedida },
    medidos,
    falhas: [...new Set(falhas)],
    manuais: [...new Set(manuais)],
    semMedida: resto.quantos,
    desenhados: [...new Set(desenhados)],
    aConferir: [...new Set([...aConferir, ...resto.misturados])],
  };
}

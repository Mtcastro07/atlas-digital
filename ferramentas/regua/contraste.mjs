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
    saida.push({ id, nome: descrever(el), cor, opacidade: opacidade(el), grande: tamanho >= 24 || (tamanho >= 18.66 && peso >= 700), rects, misturado });
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
  return {
    medidos,
    falhas: [...new Set(falhas)],
    manuais: [...new Set(manuais)],
    semMedida: resto.quantos,
    desenhados: [...new Set(desenhados)],
    aConferir: [...new Set([...aConferir, ...resto.misturados])],
  };
}

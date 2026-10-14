// As sondas da régua: funções que rodam dentro da página e devolvem o que
// encontraram. Cada uma recebe os ajudantes abaixo, montados junto do código
// dela (a política de conteúdo do site veda eval, e a página sem script não
// roda scripts de início; montar o código no avaliador funciona nos dois).

const AJUDANTES = String.raw`
  const descrever = (el) => {
    const id = el.id ? '#' + el.id : '';
    const classe = typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : '';
    const texto = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('alt') || '').trim().replace(/\s+/g, ' ').slice(0, 32);
    return el.tagName.toLowerCase() + id + classe + (texto ? ' "' + texto + '"' : '');
  };
  // Fora da tela por regra: escondido, inerte, sem caixa ou só para leitor de tela.
  const naoDesenhado = (el) => {
    for (let a = el; a && a.nodeType === 1; a = a.parentElement) {
      if (a.hidden || a.inert) return true;
      const cs = getComputedStyle(a);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.contentVisibility === 'hidden') return true;
      if (a.tagName === 'DETAILS' && !a.open && a !== el && !el.closest('summary')) return true;
      if (a.tagName === 'DIALOG' && !a.open) return true;
    }
    const r = el.getBoundingClientRect();
    return r.width <= 1 || r.height <= 1;
  };
  const decorativo = (el) => !!el.closest('[aria-hidden="true"], svg, canvas');
  const opacidade = (el) => {
    let o = 1;
    for (let a = el; a && a.nodeType === 1; a = a.parentElement) o *= parseFloat(getComputedStyle(a).opacity);
    return o;
  };
  const textoProprio = (el) => [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').replace(/\s+/g, ' ').trim();
  // O texto que chega ao leitor de tela: sem o que é aria-hidden, com o alt das
  // imagens e um espaço entre blocos (como o Chrome monta o nome acessível).
  const textoAcessivel = (raiz) => {
    let t = '';
    const andar = (n) => {
      if (n.nodeType === 3) { t += n.textContent; return; }
      if (n.nodeType !== 1 || n.getAttribute('aria-hidden') === 'true') return;
      const exibicao = getComputedStyle(n).display;
      if (exibicao === 'none') return;
      if (n.tagName === 'IMG') { t += ' ' + (n.getAttribute('alt') || '') + ' '; return; }
      const bloco = !exibicao.startsWith('inline') || n.tagName === 'BR';
      if (bloco) t += ' ';
      for (const f of n.childNodes) andar(f);
      if (bloco) t += ' ';
    };
    andar(raiz);
    return t.replace(/\s+/g, ' ').trim();
  };
  // Qualquer cor que o navegador calcule (oklab, oklch, color-mix) em RGBA de 0 a 255, pelo canvas.
  const paraRgba = (cor) => {
    const ctx = (window.__reguaTinta ??= document.createElement('canvas').getContext('2d', { willReadFrequently: true }));
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = cor;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return [r, g, b, a / 255];
  };
  const nomeAcessivel = (el) => {
    const rotulado = (el.getAttribute('aria-labelledby') || '').split(/\s+/).filter(Boolean)
      .map((id) => document.getElementById(id)?.textContent || '').join(' ');
    const porRotulo = el.id ? [...document.querySelectorAll('label[for="' + CSS.escape(el.id) + '"]')].map((l) => l.textContent).join(' ') : '';
    return (el.getAttribute('aria-label') || rotulado || textoAcessivel(el) || porRotulo || el.closest('label')?.textContent
      || el.getAttribute('title') || el.getAttribute('placeholder') || el.querySelector('svg title')?.textContent || '').replace(/\s+/g, ' ').trim();
  };
  const interativos = () => [...document.querySelectorAll(
    'a[href], button, summary, input:not([type="hidden"]), select, textarea, [role="button"], [role="link"], [role="tab"], [tabindex]:not([tabindex="-1"])'
  )];
  // Uma ação: vínculo ou botão que leva a algum lugar ou faz algo, fora da navegação
  // entre páginas, do logotipo e dos controles do próprio site (menu, pausa).
  const acoes = () => interativos().filter((el) => {
    if (naoDesenhado(el) || decorativo(el) || el.disabled || opacidade(el) < 0.05 || el.closest('nav, footer')) return false;
    const nome = nomeAcessivel(el).toLowerCase();
    if (/^(menu|índice|indice|fechar|pausar|retomar|abrir o menu)/.test(nome) || /anima[cç]/.test(nome)) return false;
    const href = el.getAttribute('href');
    if (href === '/' || (href && href === location.pathname.split('/').slice(0, 3).join('/'))) return false;
    return true;
  });
`;

/** Roda uma sonda na página, com os ajudantes. */
export function avaliar(pagina, sonda, argumento = null) {
  return pagina.evaluate(`(() => { ${AJUDANTES}; return (${sonda})(${JSON.stringify(argumento)}); })()`);
}

/** Bloco 1 · geometria: rolagem lateral, o que escapa da tela e os alvos de toque. */
export function geometria(comAlvos) {
  const largura = document.documentElement.clientWidth;
  const lateral = Math.max(0, document.documentElement.scrollWidth - largura);
  // Contido: dentro de um contêiner que rola ou recorta (as galerias de deslizar, as
  // faixas, os gestos com contain: paint).
  const contido = (el) => {
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.overflowX !== 'visible' || /paint|strict|content/.test(cs.contain) || cs.clipPath !== 'none') return true;
    }
    return false;
  };
  const escapam = [];
  for (const el of document.body.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0 || (r.right <= largura + 1 && r.left >= -1)) continue;
    const cs = getComputedStyle(el);
    if (cs.position === 'fixed' || naoDesenhado(el) || opacidade(el) < 0.05 || contido(el)) continue;
    escapam.push(descrever(el));
  }
  const pequenos = [];
  if (comAlvos) {
    for (const el of interativos()) {
      if (naoDesenhado(el) || decorativo(el)) continue;
      // Vínculo no meio do texto corrido (a chamada de nota, a palavra-vínculo): a exceção
      // do WCAG 2.5.8 — o bloco em volta tem mais texto que o próprio vínculo.
      if (el.tagName === 'A' && getComputedStyle(el).display === 'inline') {
        let bloco = el.parentElement;
        while (bloco && getComputedStyle(bloco).display.startsWith('inline')) bloco = bloco.parentElement;
        if (bloco && bloco.textContent.trim().length > el.textContent.trim().length + 3) continue;
      }
      const r = el.getBoundingClientRect();
      if (r.height < 43.5) pequenos.push(descrever(el) + ' (' + Math.round(r.width) + '×' + Math.round(r.height) + ')');
    }
  }
  // O rótulo curto de um controle partido em duas linhas (a ação do cabeçalho numa fonte mais larga, achada só
  // na captura no teste de 08.10.2026): fora do texto corrido, até 40 caracteres, desenhado em mais de uma linha.
  const quebrados = [];
  for (const el of interativos()) {
    if (naoDesenhado(el) || decorativo(el) || getComputedStyle(el).display === 'inline') continue;
    const rotulo = (el.innerText || '').trim();
    if (!rotulo || rotulo.length > 40 || rotulo.includes('\n')) continue;
    const topos = [];
    const andar = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let no = andar.nextNode(); no; no = andar.nextNode()) {
      if (!no.textContent.trim() || naoDesenhado(no.parentElement)) continue;
      const faixa = document.createRange();
      faixa.selectNodeContents(no);
      for (const q of faixa.getClientRects()) if (q.width > 1) topos.push([q.top, q.height]);
    }
    topos.sort((x, y) => x[0] - y[0]);
    let linhas = topos.length ? 1 : 0;
    for (let i = 1; i < topos.length; i++) if (topos[i][0] - topos[i - 1][0] > Math.min(topos[i][1], topos[i - 1][1]) / 2) linhas += 1;
    if (linhas > 1) quebrados.push(descrever(el));
  }
  return { lateral, escapam: [...new Set(escapam)].slice(0, 8), pequenos: [...new Set(pequenos)].slice(0, 12), quebrados: [...new Set(quebrados)].slice(0, 8) };
}

/** Bloco 2 · degradação: o texto que ficou invisível (sem script ou com movimento reduzido). */
export function ocultos() {
  const sumidos = [];
  const raiz = document.querySelector('main') || document.body;
  for (const el of raiz.querySelectorAll('*')) {
    if (!textoProprio(el) || decorativo(el) || naoDesenhado(el)) continue;
    if (opacidade(el) < 0.05) sumidos.push(descrever(el));
  }
  const h1 = document.querySelector('h1');
  const vinculosInternos = [...document.querySelectorAll('a[href^="/"]')].filter((a) => !naoDesenhado(a)).length;
  // O que se move sem fim: com movimento reduzido, não pode haver nenhum.
  const infinitas = document.getAnimations()
    .filter((a) => a.playState === 'running' && a.effect?.getTiming().iterations === Infinity)
    .map((a) => (a.animationName || a.id || 'animação') + ' em ' + (a.effect?.target ? descrever(a.effect.target) : '?'));
  return {
    sumidos: [...new Set(sumidos)].slice(0, 8),
    h1Visivel: !!h1 && !naoDesenhado(h1) && opacidade(h1) > 0.9,
    vinculosInternos,
    infinitas: [...new Set(infinitas)].slice(0, 6),
  };
}

/** Bloco 3 · semântica: títulos, idioma, marcações de compartilhamento, nomes, ids e âncoras. */
export function semantica() {
  const meta = (seletor) => document.querySelector(seletor)?.getAttribute('content')?.trim() || '';
  const h1s = [...document.querySelectorAll('h1')];
  let h1Igual = true;
  let h1Texto = '';
  if (h1s.length === 1) {
    // O que o leitor de tela lê precisa ser o que a tela mostra: some com as cópias
    // decorativas (aria-hidden) e compara o texto desenhado com o acessível.
    const h1 = h1s[0];
    const decorativas = [...h1.querySelectorAll('[aria-hidden="true"]')];
    const antes = decorativas.map((d) => d.style.display);
    decorativas.forEach((d) => { d.style.display = 'none'; });
    const desenhado = h1.innerText.replace(/\s+/g, ' ').trim();
    decorativas.forEach((d, i) => { d.style.display = antes[i]; });
    h1Texto = textoAcessivel(h1);
    h1Igual = desenhado.toLowerCase() === h1Texto.toLowerCase();
  }
  const niveis = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].filter((h) => !naoDesenhado(h)).map((h) => +h.tagName[1]);
  const saltos = niveis.filter((n, i) => i > 0 && n > niveis[i - 1] + 1).length;
  const ids = {};
  for (const el of document.querySelectorAll('[id]')) ids[el.id] = (ids[el.id] || 0) + 1;
  const decodificar = (t) => { try { return decodeURIComponent(t); } catch { return t; } };
  const ancorasQuebradas = [...document.querySelectorAll('a[href^="#"]')]
    .map((a) => decodificar(a.getAttribute('href').slice(1)))
    .filter((id) => id && !document.getElementById(id));
  const semNome = interativos().filter((el) => !naoDesenhado(el) && !decorativo(el) && !nomeAcessivel(el)).map(descrever);
  const camposSemRotulo = [...document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), select, textarea')]
    .filter((el) => !naoDesenhado(el) && !nomeAcessivel(el)).map(descrever);
  return {
    h1: h1s.length,
    h1Texto,
    h1Igual,
    idioma: document.documentElement.lang,
    titulo: document.title.trim(),
    descricao: meta('meta[name="description"]'),
    ogTitulo: meta('meta[property="og:title"]'),
    ogDescricao: meta('meta[property="og:description"]'),
    ogImagem: meta('meta[property="og:image"]'),
    robots: meta('meta[name="robots"]'),
    saltos,
    imagensSemAlt: [...document.querySelectorAll('img:not([alt])')].map(descrever).slice(0, 6),
    idsRepetidos: Object.entries(ids).filter(([, n]) => n > 1).map(([id]) => id).slice(0, 6),
    ancorasQuebradas: [...new Set(ancorasQuebradas)].slice(0, 6),
    semNome: [...new Set(semNome)].slice(0, 6),
    camposSemRotulo: [...new Set(camposSemRotulo)].slice(0, 6),
  };
}

/** Bloco 6 · composição: a primeira ação na primeira tela, a altura da página e a postura do título. */
export function composicao() {
  const alturaTela = innerHeight;
  const naPrimeiraTela = acoes()
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.top >= 0 && r.top < alturaTela)
    .sort((a, b) => a.r.bottom - b.r.bottom);
  const primeira = naPrimeiraTela[0];
  const h1 = document.querySelector('h1');
  // O corpo do texto: o tamanho mais frequente dos parágrafos.
  const tamanhos = {};
  for (const p of document.querySelectorAll('main p')) {
    if (naoDesenhado(p) || !textoProprio(p)) continue;
    const t = parseFloat(getComputedStyle(p).fontSize);
    tamanhos[t] = (tamanhos[t] || 0) + textoProprio(p).length;
  }
  const corpo = +Object.entries(tamanhos).sort((a, b) => b[1] - a[1])[0]?.[0] || 16;
  return {
    primeiraAcao: primeira ? primeira.r.bottom / alturaTela : null,
    nomeDaAcao: primeira ? descrever(primeira.el) : null,
    telas: document.documentElement.scrollHeight / alturaTela,
    razaoDoTitulo: h1 ? parseFloat(getComputedStyle(h1).fontSize) / corpo : null,
  };
}

/** Tipografia · os algarismos tabulares: em cada família usada com tabular-nums num texto com algarismos (o preço, o
 *  horário, o telefone), "1111" e "0000" têm a mesma largura. Sem o recurso tnum na fonte, o tabular-nums não faz
 *  nada, e só a medida no navegador mostra (a Albert Sans do Google Fonts, no teste de 08.10.2026: "1111" media a
 *  metade de "0000"). A família que não leva número com tabular-nums fica de fora: não há o que alinhar. */
export function algarismos() {
  const largura = (cs, texto) => {
    const s = document.createElement('span');
    s.textContent = texto;
    s.style.cssText = 'position:absolute;left:-9999px;white-space:nowrap;font-size:40px;font-variant-numeric:tabular-nums';
    s.style.fontFamily = cs.fontFamily;
    s.style.fontWeight = cs.fontWeight;
    s.style.fontStyle = cs.fontStyle;
    document.body.appendChild(s);
    const w = s.getBoundingClientRect().width;
    s.remove();
    return w;
  };
  const familias = new Map(); // a família → o primeiro elemento em que aparece
  for (const el of document.body.querySelectorAll('*')) {
    const texto = textoProprio(el);
    if (!/\d/.test(texto) || naoDesenhado(el)) continue;
    const cs = getComputedStyle(el);
    if (cs.fontVariantNumeric.includes('tabular-nums') && !familias.has(cs.fontFamily)) familias.set(cs.fontFamily, { cs, onde: descrever(el) });
  }
  const sem = [];
  for (const [familia, { cs, onde }] of familias) {
    if (Math.abs(largura(cs, '1111') - largura(cs, '0000')) > 0.5) sem.push(familia.split(',')[0].trim() + ', em ' + onde);
  }
  return sem;
}

/** Tipografia · os caracteres por linha, contados letra a letra no que o navegador desenha. O ch é a largura do
 *  zero, e o texto corrido cabe mais: 62ch deram até 89 caracteres com a Red Hat Text (teste de 08.10.2026). */
export function caracteresPorLinha() {
  let maior = { caracteres: 0, onde: null };
  let vistos = 0;
  for (const e of document.querySelectorAll('main p, main li, main dd')) {
    if (vistos >= 40) break;
    if (naoDesenhado(e) || decorativo(e) || (e.textContent || '').length < 100) continue;
    // Em grade ou flex, as colunas lado a lado dividem o mesmo topo e somariam numa linha só (a primeira calibração
    // acusou 94 caracteres num item de lista em grade, com o nome e a descrição em colunas).
    if (/grid|flex/.test(getComputedStyle(e).display)) continue;
    vistos += 1;
    const linhas = new Map();
    const andar = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
    for (let no = andar.nextNode(); no; no = andar.nextNode()) {
      const t = no.textContent;
      for (let i = 0; i < t.length && i < 2000; i++) {
        const faixa = document.createRange();
        faixa.setStart(no, i);
        faixa.setEnd(no, i + 1);
        const q = faixa.getClientRects()[0];
        if (!q || q.width === 0) continue;
        const k = Math.round(q.top / 4);
        linhas.set(k, (linhas.get(k) || '') + t[i]);
      }
    }
    const cheias = [...linhas.values()].map((s) => s.trim()).slice(0, -1); // a última linha é a que sobra
    for (const l of cheias) if (l.length > maior.caracteres) maior = { caracteres: l.length, onde: descrever(e) };
  }
  return maior;
}

/** Celular deitado · o que fica preso à tela (cabeçalho, atalho, barra): a fração da altura que sobra coberta, no
 *  meio da página. Na tela deitada (844 × 390), um cabeçalho de 80 px e um atalho de 60 px já comem um terço. */
export function presos() {
  const alto = innerHeight;
  let topo = 0;
  let base = 0;
  for (const el of document.body.querySelectorAll('*')) {
    const cs = getComputedStyle(el);
    if (cs.position !== 'fixed' && cs.position !== 'sticky') continue;
    if (naoDesenhado(el) || opacidade(el) < 0.05 || cs.pointerEvents === 'none') continue;
    const r = el.getBoundingClientRect();
    if (r.height >= alto * 0.9 || r.bottom <= 0 || r.top >= alto) continue; // o fundo da página inteira não é barra
    if (r.top <= 1) topo = Math.max(topo, r.bottom);
    else if (r.bottom >= alto - 1) base = Math.max(base, alto - r.top);
  }
  return { fracao: (topo + base) / alto, topo: Math.round(topo), base: Math.round(base) };
}

/** Bloco 7 · paridade: os títulos e as ações do conteúdo, para comparar a mesa com o celular. */
export function inventario() {
  const raiz = document.querySelector('main') || document.body;
  return [...raiz.querySelectorAll('h1, h2, h3, a[href], button')]
    .filter((el) => !naoDesenhado(el) && !decorativo(el))
    .map((el) => nomeAcessivel(el).toLowerCase())
    .filter((t) => t.length > 1);
}

/** Bloco 9 · conformidade: selo de ficção e noindex nos exemplos; formulário com aviso de privacidade. */
export function conformidade() {
  const texto = document.body.innerText;
  const formularios = [...document.querySelectorAll('form')].filter((f) => f.getAttribute('action') || /post/i.test(f.getAttribute('method') || ''));
  const avisoDePrivacidade = [...document.querySelectorAll('a[href]')].some((a) => /privacidade/i.test(a.textContent + a.getAttribute('href')));
  return {
    ficcao: /fict[íi]ci[oa]|fic[çc][ãa]o/i.test(texto),
    mencoes: [...new Set((texto.match(/[^.\n]{0,40}\b(CNPJ|nota fiscal)\b[^.\n]{0,40}/gi) || []).map((t) => t.trim()))].slice(0, 4),
    coletaSemAviso: formularios.length > 0 && !avisoDePrivacidade,
  };
}

/** Bloco 10 · registro verbal: o tamanho dos períodos e o vocabulário vedado. */
export function registro() {
  const raiz = document.querySelector('main') || document.body;
  const partes = [];
  for (const el of raiz.querySelectorAll('p, li, dd, blockquote, figcaption, td')) {
    if (naoDesenhado(el) || decorativo(el) || el.querySelector('p, li')) continue;
    partes.push(textoAcessivel(el));
  }
  const periodos = partes.join('\n')
    .split(/(?<=[.!?…])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => /[.!?…]$/.test(s) && s.split(/\s+/).length >= 3);
  const palavras = periodos.map((s) => s.split(/\s+/).filter((w) => /[\p{L}\d]/u.test(w)).length).sort((a, b) => a - b);
  const mediana = palavras.length ? palavras[Math.floor(palavras.length / 2)] : 0;
  const longos = periodos.filter((s) => s.split(/\s+/).length > 28).map((s) => s.slice(0, 70) + '…').slice(0, 4);
  // Vocabulário vedado pela ata (IV.1: nunca preço baixo) e pelo registro impessoal, sem superlativo sem prova.
  const vedado = /\b(barat[oa]s?|imbat[íi]ve(l|is)|menor pre[çc]o|pre[çc]o baixo|o melhor|a melhor|os melhores|as melhores|n[úu]mero 1|l[íi]der)\b/gi;
  return {
    periodos: periodos.length,
    mediana,
    longos,
    vedados: [...new Set((raiz.innerText.match(vedado) || []).map((t) => t.toLowerCase()))],
  };
}

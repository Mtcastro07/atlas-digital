// Bloco 4 · teclado: a página se percorre inteira com Tab, sem armadilha, e
// todo elemento que recebe o foco muda de aparência ao recebê-lo. Compara a
// fotografia do elemento com foco e sem foco (pixel a pixel): vale qualquer
// forma de indicar o foco — contorno, sombra, cor, sublinhado, o do pai.

import { avaliar } from "./sondas.mjs";

const PARADAS = 60;

function focoAtual() {
  const el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) return null;
  window.__reguaFoco ??= { proximo: 0, mapa: new Map() };
  el.__reguaFocoId ??= ++window.__reguaFoco.proximo;
  window.__reguaFoco.mapa.set(el.__reguaFocoId, el);
  const r = el.getBoundingClientRect();
  return { id: el.__reguaFocoId, nome: descrever(el), x: r.left, y: r.top, largura: r.width, altura: r.height };
}

// O foco encoberto (WCAG 2.4.11): no Shift+Tab, o navegador alinha o elemento focado ao topo da tela, sob o
// cabeçalho fixo, se o html não tiver scroll-padding-top. Simula esse alinhamento e procura, na pilha de elementos
// sobre o ponto (elementsFromPoint), algo preso à tela (fixed ou sticky) acima do elemento. Um desenho solto por cima,
// sem estar preso à tela, não conta: a primeira calibração (08.10.2026) acusava os svg decorativos do Atlas.
function encoberto(id) {
  const el = window.__reguaFoco.mapa.get(id);
  if (!el) return null;
  const preso = (a) => {
    for (; a && a.nodeType === 1; a = a.parentElement) if (/^(fixed|sticky)$/.test(getComputedStyle(a).position)) return a;
    return null;
  };
  if (preso(el)) return null; // o próprio elemento está no cabeçalho, ou em outra peça presa à tela
  el.scrollIntoView({ block: 'start', behavior: 'instant' });
  const r = el.getBoundingClientRect();
  if (r.width < 1 || r.height < 1) return null;
  for (const acima of document.elementsFromPoint(r.left + Math.min(r.width / 2, 12), r.top + Math.min(r.height / 2, 6))) {
    if (acima === el || el.contains(acima) || acima.contains(el)) return null; // chegou ao elemento: nada preso por cima
    const barra = preso(acima);
    if (barra) return descrever(el) + ' (sob ' + descrever(barra) + ')';
  }
  return null;
}

export async function percorrerTeclado(pagina) {
  const falhas = [];
  const encobertos = [];
  const vistos = new Set();
  const { width, height } = pagina.viewportSize();
  let repetidos = 0;
  let paradas = 0;
  await pagina.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  for (let i = 0; i < PARADAS; i++) {
    await pagina.keyboard.press('Tab');
    await pagina.waitForTimeout(120);
    const foco = await avaliar(pagina, focoAtual);
    if (!foco) break; // voltou ao começo do documento
    if (vistos.has(foco.id)) {
      // O campo de data recebe um Tab por parte (dia, mês, ano) sem trocar de elemento.
      repetidos += 1;
      if (repetidos >= 6) {
        falhas.push(`armadilha de foco em ${foco.nome}`);
        break;
      }
      continue;
    }
    repetidos = 0;
    vistos.add(foco.id);
    paradas += 1;
    // Uma margem em volta: o anel de foco costuma ficar por fora da caixa.
    const x = Math.max(0, Math.floor(foco.x - 8));
    const y = Math.max(0, Math.floor(foco.y - 8));
    const clip = { x, y, width: Math.min(width - x, Math.ceil(foco.largura + 16)), height: Math.min(height - y, Math.ceil(foco.altura + 16)) };
    if (clip.width < 2 || clip.height < 2) continue;
    const comFoco = await pagina.screenshot({ clip, scale: 'css' });
    await pagina.evaluate(() => document.activeElement?.blur());
    await pagina.waitForTimeout(120);
    const semFoco = await pagina.screenshot({ clip, scale: 'css' });
    // Devolve o foco ao mesmo elemento, para o próximo Tab seguir dali.
    await pagina.evaluate((id) => window.__reguaFoco.mapa.get(id)?.focus({ preventScroll: true }), foco.id);
    if (comFoco.equals(semFoco)) falhas.push(`foco sem marca visível em ${foco.nome}`);
    const coberto = await avaliar(pagina, encoberto, foco.id);
    if (coberto) encobertos.push(coberto);
  }
  return { paradas, falhas, encobertos: encobertos.slice(0, 6) };
}

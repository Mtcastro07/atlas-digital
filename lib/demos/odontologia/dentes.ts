// lib/demos/odontologia/dentes.ts — a geometria do mapa dos dentes da Odontologia Boa Viagem, a peça-assinatura do site
// de demonstração do plano Completo (registros/demos/odontologia/identidade.md, seção 6): duas arcadas de 16 dentes,
// vistas de cima, na notação FDI (11 a 48), no traço da ficha clínica impressa. É um DIAGRAMA, não uma ilustração:
// cada dente é uma forma esquemática posta numa parábola, com a largura da coroa proporcional à média publicada.
// As larguras e as profundidades (mm) são médias de livro-texto (Wheeler), a conferir com um dentista antes de qualquer
// uso real. Função pura e determinística: o mesmo desenho no servidor e no navegador. Vem da referência do kit
// (producao/referencias/odontologia-completo/lib/oficio/dentes.ts), com o tipo da região trazido para cá: sem import de
// valor, o arquivo roda direto no node:test.

/** As quatro regiões do mapa (producao/esteira/nichos/odontologia.md, seção 5.1). */
export type RegiaoId = "frente-superior" | "fundo-superior" | "frente-inferior" | "fundo-inferior";

export type Arcada = "superior" | "inferior";
export type TipoDeDente = "incisivo" | "canino" | "pre-molar" | "molar";

export type Dente = {
  /** Notação FDI: 11 a 18 (superior direito do paciente), 21 a 28, 31 a 38, 41 a 48. */
  fdi: number;
  arcada: Arcada;
  tipo: TipoDeDente;
  regiao: RegiaoId;
  x: number;
  y: number;
  /** A rotação do desenho, em graus: o eixo da arcada naquele ponto. */
  giro: number;
  /** Largura (ao longo da arcada) e profundidade (para fora da arcada), em unidades do desenho. */
  largura: number;
  profundidade: number;
  /** Onde fica o número, fora da faixa da região. */
  numero: { x: number; y: number };
};

export const LARGURA = 342;
export const ALTURA = 342;

/** mm, do incisivo central ao terceiro molar. */
const LARGURAS_MM: Record<Arcada, readonly number[]> = {
  superior: [8.5, 6.5, 7.5, 7.0, 6.5, 10.0, 9.0, 8.5],
  inferior: [5.0, 5.5, 7.0, 7.0, 7.0, 11.0, 10.5, 10.0],
};
const PROFUNDIDADES_MM: Record<Arcada, readonly number[]> = {
  superior: [7.0, 6.0, 8.0, 9.0, 9.0, 11.0, 11.0, 10.0],
  inferior: [5.5, 6.0, 7.0, 7.5, 8.0, 10.5, 10.0, 9.5],
};
const TIPOS: readonly TipoDeDente[] = ["incisivo", "incisivo", "canino", "pre-molar", "pre-molar", "molar", "molar", "molar"];

// A parábola de cada arcada: y = y0 ± c·x², com o x do fim da arcada em X_FIM e a profundidade PROFUNDIDADE.
const X_FIM = 120;
const PROFUNDIDADE = 108;
const FOLGA_SUPERIOR = 48;
const C = PROFUNDIDADE / (X_FIM * X_FIM);
const Y_SUPERIOR = FOLGA_SUPERIOR;
const Y_INFERIOR = ALTURA - FOLGA_SUPERIOR;
const CENTRO = LARGURA / 2;

/** O comprimento da curva do centro (x = 0) até x. */
const comprimento = (x: number) => {
  const u = 2 * C * x;
  return (u * Math.sqrt(1 + u * u) + Math.asinh(u)) / (4 * C);
};
const MEIO_COMPRIMENTO = comprimento(X_FIM);
/** O x em que a curva tem o comprimento s (busca binária: a função cresce sempre). */
const xDoComprimento = (s: number) => {
  let a = 0;
  let b = X_FIM * 1.2;
  for (let i = 0; i < 40; i++) {
    const m = (a + b) / 2;
    if (comprimento(m) < s) a = m;
    else b = m;
  }
  return (a + b) / 2;
};

const arredondar = (n: number) => Math.round(n * 10) / 10;
const radianos = (graus: number) => (graus * Math.PI) / 180;

/** O ponto, o ângulo da tangente e a normal para fora, na posição com sinal sigma (negativo: lado direito do paciente). */
function ponto(arcada: Arcada, sigma: number) {
  const x = Math.sign(sigma) * xDoComprimento(Math.abs(sigma));
  const y = arcada === "superior" ? Y_SUPERIOR + C * x * x : Y_INFERIOR - C * x * x;
  const inclinacao = arcada === "superior" ? 2 * C * x : -2 * C * x;
  const teta = Math.atan2(inclinacao, 1);
  const normal = arcada === "superior" ? { x: Math.sin(teta), y: -Math.cos(teta) } : { x: -Math.sin(teta), y: Math.cos(teta) };
  return { x: CENTRO + x, y, teta, normal };
}

function dentesDaArcada(arcada: Arcada): Dente[] {
  const larguras = LARGURAS_MM[arcada];
  const escala = MEIO_COMPRIMENTO / larguras.reduce((soma, w) => soma + w, 0); // px por mm
  const dentes: Dente[] = [];
  for (const lado of [-1, 1] as const) {
    let acumulado = 0;
    larguras.forEach((mm, i) => {
      const centro = (acumulado + mm / 2) * escala;
      acumulado += mm;
      const p = ponto(arcada, lado * centro);
      const profundidade = PROFUNDIDADES_MM[arcada][i] * escala;
      const quadrante = arcada === "superior" ? (lado === -1 ? 1 : 2) : lado === -1 ? 4 : 3;
      const afastamento = Math.max(profundidade / 2, 14) + 23; // além da faixa da região
      dentes.push({
        fdi: quadrante * 10 + (i + 1),
        arcada,
        tipo: TIPOS[i],
        regiao: `${i < 3 ? "frente" : "fundo"}-${arcada}` as RegiaoId,
        x: arredondar(p.x),
        y: arredondar(p.y),
        giro: arredondar(((p.teta * 180) / Math.PI) + (arcada === "inferior" ? 180 : 0)),
        largura: arredondar(mm * escala * 0.9), // 10% de folga: um filete entre os dentes
        profundidade: arredondar(profundidade),
        numero: { x: arredondar(p.x + p.normal.x * afastamento), y: arredondar(p.y + p.normal.y * afastamento) },
      });
    });
  }
  // Do lado direito do paciente (à esquerda do desenho) para o esquerdo: 18…11, 21…28 e 48…41, 31…38.
  return dentes.sort((a, b) => a.x - b.x);
}

export const dentes: readonly Dente[] = [...dentesDaArcada("superior"), ...dentesDaArcada("inferior")];

/**
 * A faixa que circula uma região (o lápis na ficha): o contorno de cada trecho contínuo da arcada, afastado da curva
 * para fora e para dentro, com as pontas em meia-volta (o lápis não faz quina). `margem` alarga os extremos (a faixa
 * visível) ou não (a área de toque).
 */
export function faixaDaRegiao(regiao: RegiaoId, margem = 0) {
  const arcada: Arcada = regiao.endsWith("superior") ? "superior" : "inferior";
  const larguras = LARGURAS_MM[arcada];
  const escala = MEIO_COMPRIMENTO / larguras.reduce((soma, w) => soma + w, 0);
  const ate3 = larguras.slice(0, 3).reduce((soma, w) => soma + w, 0) * escala;
  const trechos: [number, number][] = regiao.startsWith("frente")
    ? [[-ate3 - margem, ate3 + margem]]
    : [
        [-MEIO_COMPRIMENTO - margem, -ate3 + margem],
        [ate3 - margem, MEIO_COMPRIMENTO + margem],
      ];
  const fora = 21;
  const dentro = 19;
  const meio = (fora - dentro) / 2;
  const raio = (fora + dentro) / 2;
  return trechos
    .map(([de, ate]) => {
      const passos = Math.max(8, Math.ceil(Math.abs(ate - de) / 2.5));
      const nos = (h: number) =>
        Array.from({ length: passos + 1 }, (_, k) => {
          const p = ponto(arcada, de + ((ate - de) * k) / passos);
          return { x: p.x + p.normal.x * h, y: p.y + p.normal.y * h };
        });
      // A meia-volta numa ponta: `sentido` 1 no fim do trecho (sai pela tangente), -1 no começo.
      const ponta = (sigma: number, sentido: 1 | -1) => {
        const p = ponto(arcada, sigma);
        const tx = Math.cos(p.teta);
        const ty = Math.sin(p.teta);
        const cx = p.x + p.normal.x * meio;
        const cy = p.y + p.normal.y * meio;
        return Array.from({ length: 13 }, (_, k) => {
          const a = (Math.PI * (k + 1)) / 14;
          return {
            x: cx + sentido * (p.normal.x * raio * Math.cos(a) + tx * raio * Math.sin(a)),
            y: cy + sentido * (p.normal.y * raio * Math.cos(a) + ty * raio * Math.sin(a)),
          };
        });
      };
      const contorno = [...nos(fora), ...ponta(ate, 1), ...nos(-dentro).reverse(), ...ponta(de, -1)];
      return `M${contorno.map((q) => `${arredondar(q.x)} ${arredondar(q.y)}`).join("L")}Z`;
    })
    .join("");
}

export const FAIXAS = {
  "frente-superior": faixaDaRegiao("frente-superior", 3),
  "fundo-superior": faixaDaRegiao("fundo-superior", 3),
  "frente-inferior": faixaDaRegiao("frente-inferior", 3),
  "fundo-inferior": faixaDaRegiao("fundo-inferior", 3),
} as const satisfies Record<RegiaoId, string>;

/** A área de toque de cada região: a faixa sem a margem, para as vizinhas não disputarem o toque. */
export const AREAS = {
  "frente-superior": faixaDaRegiao("frente-superior"),
  "fundo-superior": faixaDaRegiao("fundo-superior"),
  "frente-inferior": faixaDaRegiao("frente-inferior"),
  "fundo-inferior": faixaDaRegiao("fundo-inferior"),
} as const satisfies Record<RegiaoId, string>;

/** O contorno de um dente no seu próprio quadro (origem no centro; a face de fora para cima). */
export function contornoDoDente(d: Pick<Dente, "tipo" | "largura" | "profundidade">) {
  const w = d.largura;
  const h = d.profundidade;
  const r = Math.min(w, h) * 0.34;
  if (d.tipo === "canino") {
    // Um escudo com a ponta para fora.
    return `M0 ${-h / 2}C${w * 0.5} ${-h * 0.22} ${w * 0.54} ${h * 0.5} 0 ${h * 0.5}S${-w * 0.5} ${-h * 0.22} 0 ${-h / 2}Z`;
  }
  const x0 = -w / 2;
  const y0 = -h / 2;
  return `M${x0 + r} ${y0}H${-x0 - r}Q${-x0} ${y0} ${-x0} ${y0 + r}V${-y0 - r}Q${-x0} ${-y0} ${-x0 - r} ${-y0}H${x0 + r}Q${x0} ${-y0} ${x0} ${-y0 - r}V${y0 + r}Q${x0} ${y0} ${x0 + r} ${y0}Z`;
}

/** Os sulcos da face de mastigação: um para o pré-molar (ao longo da arcada), dois para o molar (em cruz). */
export function sulcosDoDente(d: Pick<Dente, "tipo" | "largura" | "profundidade">) {
  const w = d.largura;
  const h = d.profundidade;
  if (d.tipo === "pre-molar") return `M${-w * 0.28} 0H${w * 0.28}`;
  if (d.tipo === "molar") return `M${-w * 0.3} 0H${w * 0.3}M0 ${-h * 0.3}V${h * 0.3}`;
  return "";
}

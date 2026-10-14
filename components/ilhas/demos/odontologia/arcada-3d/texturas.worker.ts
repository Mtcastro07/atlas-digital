// O trabalho pesado das texturas da ficha em cerâmica, fora da linha principal (a barreira do travamento,
// producao/esteira/15-desempenho.md): os desfoques e o empacotamento. A página desenha as camadas num canvas 2D (o
// traço, a gravação e as regiões, que pedem a fonte e o Path2D do documento) e manda o RGBA de cada uma, transferido;
// aqui, do canal vermelho, elas viram o relevo (RGBA), as regiões (RGBA) e a altura dos dentes (meio-float, para o
// WebGL2, reduzida ao lado dela).

/** As camadas chegam em RGBA (o canal vermelho é o que conta), com `lado` pixels; a altura sai com `ladoDaAltura`. */
type Pedido = { lado: number; ladoDaAltura: number; mascara: Uint8Array; gravura: Uint8Array; regioes: Uint8Array[] };

/** Desfoque de caixa separável, três passadas (quase gaussiano), num canal de 0 a 1. */
function desfocar(v: Float32Array, lado: number, raio: number) {
  const r = Math.round(raio);
  if (r < 1) return v;
  const tmp = new Float32Array(v.length);
  const largura = 2 * r + 1;
  for (let passada = 0; passada < 3; passada++) {
    // Linhas: de v para tmp.
    for (let y = 0; y < lado; y++) {
      const base = y * lado;
      let soma = 0;
      for (let i = -r; i <= r; i++) soma += v[base + Math.min(lado - 1, Math.max(0, i))];
      for (let x = 0; x < lado; x++) {
        tmp[base + x] = soma / largura;
        soma += v[base + Math.min(lado - 1, x + r + 1)] - v[base + Math.max(0, x - r)];
      }
    }
    // Colunas: de tmp para v.
    for (let x = 0; x < lado; x++) {
      let soma = 0;
      for (let i = -r; i <= r; i++) soma += tmp[Math.min(lado - 1, Math.max(0, i)) * lado + x];
      for (let y = 0; y < lado; y++) {
        v[y * lado + x] = soma / largura;
        soma += tmp[Math.min(lado - 1, y + r + 1) * lado + x] - tmp[Math.max(0, y - r) * lado + x];
      }
    }
  }
  return v;
}

/** O canal vermelho de um RGBA, de 0 a 1. */
function paraFloat(c: Uint8Array) {
  const v = new Float32Array(c.length / 4);
  for (let i = 0; i < v.length; i++) v[i] = c[i * 4] / 255;
  return v;
}

/** Reduz um canal à metade do lado, pela média de cada quadrado de 2 × 2. */
function metade(v: Float32Array, lado: number) {
  const m = lado / 2;
  const saida = new Float32Array(m * m);
  for (let y = 0; y < m; y++)
    for (let x = 0; x < m; x++) {
      const i = 2 * y * lado + 2 * x;
      saida[y * m + x] = (v[i] + v[i + 1] + v[i + lado] + v[i + lado + 1]) / 4;
    }
  return saida;
}

/** Float32 para meio-float (IEEE 754 binário 16), para a textura da altura no WebGL2. */
function meioFloat(v: Float32Array) {
  const saida = new Uint16Array(v.length);
  const f = new Float32Array(1);
  const u = new Uint32Array(f.buffer);
  for (let i = 0; i < v.length; i++) {
    f[0] = v[i];
    const x = u[0];
    const sinal = (x >>> 16) & 0x8000;
    const exp = ((x >>> 23) & 0xff) - 127 + 15;
    const man = (x >>> 13) & 0x3ff;
    saida[i] = exp <= 0 ? sinal : exp >= 31 ? sinal | 0x7c00 : sinal | (exp << 10) | man;
  }
  return saida;
}

self.onmessage = (e: MessageEvent<Pedido>) => {
  const { lado, ladoDaAltura, mascara, gravura, regioes } = e.data;
  const n = lado * lado;
  // Os raios, em pixels de 1024; em 2048, a matéria e a gravação desfocam proporcionalmente menos (a borda mais
  // definida), e a sombra de contato, o mesmo tanto.
  const fator = lado / 1024;
  const dente = paraFloat(mascara);
  const materia = desfocar(Float32Array.from(dente), lado, fator > 1 ? 1.5 * fator : 2);
  const sombra = desfocar(Float32Array.from(dente), lado, 14 * fator);
  const grav = desfocar(paraFloat(gravura), lado, 1);
  let base = dente;
  for (let l = lado; l > ladoDaAltura; l /= 2) base = metade(base, l);
  const cupula = desfocar(base, ladoDaAltura, 6);
  const relevo = new Uint8Array(n * 4);
  for (let i = 0; i < n; i++) {
    relevo[i * 4] = materia[i] * 255;
    relevo[i * 4 + 1] = grav[i] * 255;
    relevo[i * 4 + 2] = sombra[i] * 255;
    relevo[i * 4 + 3] = 255;
  }
  const reg = new Uint8Array(n * 4);
  regioes.forEach((camada, k) => {
    const v = desfocar(paraFloat(camada), lado, 1);
    for (let i = 0; i < n; i++) reg[i * 4 + k] = v[i] * 255;
  });
  const altura8 = Uint8Array.from(cupula, (x) => x * 255);
  const altura16 = meioFloat(cupula);
  (self as unknown as Worker).postMessage({ relevo, regioes: reg, altura8, altura16 }, [relevo.buffer, reg.buffer, altura8.buffer, altura16.buffer]);
};

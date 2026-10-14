// Lê um PNG de 8 bits por canal (RGB ou RGBA, sem entrelaçamento) — o que o
// Chrome grava nas capturas — e devolve os pixels. Só o necessário para a
// régua medir o contraste no que o navegador desenha, sem dependência.

import { inflateSync } from "node:zlib";

export function lerPng(arquivo) {
  let largura = 0;
  let altura = 0;
  let canais = 0;
  const partes = [];
  for (let pos = 8; pos < arquivo.length; ) {
    const tamanho = arquivo.readUInt32BE(pos);
    const tipo = arquivo.toString("ascii", pos + 4, pos + 8);
    const dados = arquivo.subarray(pos + 8, pos + 8 + tamanho);
    if (tipo === "IHDR") {
      largura = dados.readUInt32BE(0);
      altura = dados.readUInt32BE(4);
      const [profundidade, cor, , , entrelacado] = dados.subarray(8, 13);
      if (profundidade !== 8 || (cor !== 2 && cor !== 6) || entrelacado) throw new Error("PNG fora do formato das capturas");
      canais = cor === 6 ? 4 : 3;
    } else if (tipo === "IDAT") partes.push(dados);
    else if (tipo === "IEND") break;
    pos += 12 + tamanho;
  }

  // Desfaz o filtro de cada linha (especificação do PNG, seção 9).
  const cru = inflateSync(Buffer.concat(partes));
  const linha = largura * canais;
  const px = Buffer.alloc(linha * altura);
  for (let y = 0; y < altura; y++) {
    const filtro = cru[y * (linha + 1)];
    const origem = y * (linha + 1) + 1;
    const destino = y * linha;
    for (let x = 0; x < linha; x++) {
      const a = x >= canais ? px[destino + x - canais] : 0;
      const b = y > 0 ? px[destino - linha + x] : 0;
      const c = x >= canais && y > 0 ? px[destino - linha + x - canais] : 0;
      let previsto = 0;
      if (filtro === 1) previsto = a;
      else if (filtro === 2) previsto = b;
      else if (filtro === 3) previsto = (a + b) >> 1;
      else if (filtro === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        previsto = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      px[destino + x] = (cru[origem + x] + previsto) & 0xff;
    }
  }
  return { largura, altura, canais, px };
}

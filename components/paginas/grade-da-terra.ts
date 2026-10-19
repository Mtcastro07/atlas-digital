/**
 * A grade da Terra de /o-atlas (desde 17/10, a direção final do Atlas Digital, seção 3, item 19): 360 por 180 casas de
 * um grau, a imagem que o computador guarda da Terra, e a escrita da casa na leitura. Sem import: o Node dos testes
 * (registros/atlas/testes/grade-da-terra.test.ts) não resolve o "@/", e a leitura da máscara entra por parâmetro
 * (emTerra, de lib/mascara-da-terra.ts). O desenho mora em components/ilhas/desenho-da-projecao.ts.
 */

export const CASAS_LON = 360;
export const CASAS_LAT = 180;

/**
 * A diferença de longitude levada a (−180°, 180°] (desde 18/10: a janela da grade no celular, que corre sob o arraste e
 * passa pela emenda de 180°; ilhas/desenho-da-projecao.ts). Na mesa, com o meridiano central em 0°, a longitude fica
 * como está.
 */
export const volta = (graus: number) => graus - 360 * Math.ceil((graus - 180) / 360);

/** Uma casa: a linha (0 a 179, do norte ao sul, a partir de 90° N) e a coluna (0 a 359, de 180° O para o leste). */
export type Casa = { readonly linha: number; readonly coluna: number };

/** A casa de um ponto (graus; a longitude positiva a leste, em qualquer volta). */
export function casaDe(lat: number, lon: number): Casa {
  const linha = Math.min(CASAS_LAT - 1, Math.max(0, Math.floor(90 - lat)));
  const coluna = ((Math.floor(lon + 180) % CASAS_LON) + CASAS_LON) % CASAS_LON;
  return { linha, coluna };
}

/**
 * Os graus da casa, como a carta os escreve, truncados (a precisão segue a escala: na grade de um grau, graus
 * inteiros, sem minutos): a casa de 22°53′ S fica em "22° S", como 22°53′ truncado ao grau. O hemisfério sempre.
 */
export function grausDaCasa({ linha, coluna }: Casa) {
  const lat = linha >= 90 ? `${linha - 90}° S` : `${89 - linha}° N`;
  const lon = coluna >= 180 ? `${coluna - 180}° L` : `${179 - coluna}° O`;
  return { lat, lon };
}

/**
 * A grade de um grau a partir da máscara de meio grau: a casa é terra quando ao menos duas das quatro casas de meio
 * grau dela o são (a maioria, com o empate para a terra: a costa não some na redução). 1 é terra, 0 é mar.
 */
export function gradeDeUmGrau(emTerra: (lat: number, lon: number) => boolean) {
  const terra = new Uint8Array(CASAS_LAT * CASAS_LON);
  for (let linha = 0; linha < CASAS_LAT; linha++) {
    for (let coluna = 0; coluna < CASAS_LON; coluna++) {
      let n = 0;
      for (const a of [0.25, 0.75]) for (const b of [0.25, 0.75]) n += emTerra(90 - linha - a, -180 + coluna + b) ? 1 : 0;
      terra[linha * CASAS_LON + coluna] = n >= 2 ? 1 : 0;
    }
  }
  return terra;
}

/**
 * A costa de uma máscara de `colunas` × `linhas` casas, a partir de 90° N e 180° O (desde a revisão de 17/10: a costa de
 * meio grau, em traço de bronze, na grade parada de /o-atlas): as arestas entre casa de terra e de mar, emendadas em
 * trechos retos (as seguidas, na mesma linha ou coluna), em unidades de casa, de quatro em quatro números: x0, y0, x1,
 * y1. As bordas da grade (os polos e o meridiano de 180°, onde a última coluna encontra a primeira) não são costa.
 */
export function costaDaMascara(terra: (linha: number, coluna: number) => boolean, colunas: number, linhas: number) {
  const trechos: number[] = [];
  for (let linha = 0; linha < linhas - 1; linha++) {
    let de = -1;
    for (let coluna = 0; coluna <= colunas; coluna++) {
      const borda = coluna < colunas && terra(linha, coluna) !== terra(linha + 1, coluna);
      if (borda && de < 0) de = coluna;
      if (!borda && de >= 0) {
        trechos.push(de, linha + 1, coluna, linha + 1);
        de = -1;
      }
    }
  }
  for (let coluna = 0; coluna < colunas - 1; coluna++) {
    let de = -1;
    for (let linha = 0; linha <= linhas; linha++) {
      const borda = linha < linhas && terra(linha, coluna) !== terra(linha, coluna + 1);
      if (borda && de < 0) de = linha;
      if (!borda && de >= 0) {
        trechos.push(coluna + 1, de, coluna + 1, linha);
        de = -1;
      }
    }
  }
  return trechos;
}

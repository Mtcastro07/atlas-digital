/**
 * A máscara de terra (17/10, "o Atlas Digital": a Terra em dois estados da capa e a projeção de /o-atlas). Desde 17/10,
 * a figura baixa public/dados/terra-05.bin depois da carga (ferramentas/gerar-mascara-da-terra.mjs, do Natural Earth
 * 1:110m, de domínio público): 720 × 360 casas de 0,5°, em bits, 32.400 bytes. Uma vez por página, no cache do módulo:
 * a capa e a projeção dividem o mesmo pedido, e o navegador guarda o arquivo.
 */
export const COLUNAS = 720;
export const LINHAS = 360;
export const PASSO_DA_MASCARA = 0.5;

let pedido: Promise<Uint8Array> | null = null;

/** Baixa e confere a máscara (uma vez; se falhar, o próximo pedido tenta de novo). */
export function carregarMascara(endereco = "/dados/terra-05.bin") {
  pedido ??= fetch(endereco)
    .then((resposta) => {
      if (!resposta.ok) throw new Error(`A máscara de terra não veio: ${resposta.status}`);
      return resposta.arrayBuffer();
    })
    .then((dados) => {
      if (dados.byteLength !== (COLUNAS * LINHAS) / 8) throw new Error(`A máscara de terra tem ${dados.byteLength} bytes, e não ${(COLUNAS * LINHAS) / 8}`);
      return new Uint8Array(dados);
    })
    .catch((erro) => {
      pedido = null;
      throw erro;
    });
  return pedido;
}

/**
 * A casa de (lat, lon) é terra? A latitude de −90 a 90 (positiva ao norte), a longitude em qualquer volta (positiva a
 * leste). A linha 0 é a de 90° a 89,5° N; a coluna 0, a de 180° O.
 */
export function emTerra(mascara: Uint8Array, lat: number, lon: number) {
  if (!(lat >= -90 && lat <= 90)) return false;
  const linha = Math.min(LINHAS - 1, Math.floor((90 - lat) / PASSO_DA_MASCARA));
  const coluna = (((Math.floor((lon + 180) / PASSO_DA_MASCARA)) % COLUNAS) + COLUNAS) % COLUNAS;
  const k = linha * COLUNAS + coluna;
  return ((mascara[k >> 3] >> (k & 7)) & 1) === 1;
}

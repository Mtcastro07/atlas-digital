// Os retratos dos sócios, com o mesmo recorte (R10, 02/11): a cabeça com cerca de 60% da largura, os olhos a 40% da altura.
// Só o recorte: sem filtro, sem correção de luz e sem retoque. Um duotônico chegou a ser feito e saiu, porque clareava a
// pele (o rosto mais escuro, em 33%). A cor das fotos de public/socios/ não muda. Uso, da raiz: node ferramentas/tratar-retratos.mjs.
import sharp from "sharp";

const TAM = 640;
const FOTOS = [
  { nome: "gabriel-ribeiro-ota-yida", x: 90, y: 50, lado: 320 },
  { nome: "matheus-castro-oliveira-de-luna-garcia", x: 0, y: 0, lado: 480 },
  // O selfie: mais fechado, para o rosto pesar mais que o celular e o fundo.
  { nome: "matheus-azevedo-abreu", x: 118, y: 92, lado: 280 },
];

for (const { nome, x, y, lado } of FOTOS) {
  await sharp(`public/socios/${nome}.webp`)
    .extract({ left: x, top: y, width: lado, height: lado })
    .resize(TAM, TAM, { kernel: "lanczos3" })
    .webp({ quality: 82 })
    .toFile(`public/socios/tratados/${nome}.webp`);
}

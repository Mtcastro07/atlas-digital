import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

// O colofão do rodapé (R10, fase 0, S14; D13): as letras do site e a medida da régua de quadros da página aberta, lida
// no build de conteudo/medidas/quadros.json, a saída da régua (ferramentas/regua/quadros.mjs, .regua/quadros.json)
// copiada sem edição. O número é medido ou não entra: sem o arquivo, ou sem a medida da página, só a frase das letras.
// O arquivo se lê com fs, e não por import (a falta dele não pode parar o build), e só no servidor: o rodapé calcula
// as frases e as passa à ilha como dado. Conferido por ferramentas/conferir-sistema.mjs.

const RELATORIO = "conteudo/medidas/quadros.json";

export const LETRAS =
  "Composto em Archivo Black e Archivo, da Omnibus-Type, e em Inter; o código, na letra de largura fixa do próprio aparelho.";

type Medida = { pagina: string; perfil: string; gesto: string; mediana?: { emDia?: number | null } };
type Relatorio = { quando?: string; medidas?: Medida[] };

function relatorio(arquivo: string): Relatorio | null {
  const onde = path.resolve(process.cwd(), arquivo);
  return existsSync(onde) ? (JSON.parse(readFileSync(onde, "utf8")) as Relatorio) : null;
}

const dia = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", year: "numeric" });
const numero = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });

/**
 * colofaoDe("/planos") → "Composto em … Esta página foi medida em 30.10.2026, num celular simulado com o processador
 * quatro vezes mais lento. Ao rolar, 99,4 de cada 100 quadros chegaram a tempo à tela." A medida é a mediana do "em
 * dia" da página no perfil celular4 e no gesto rolagem; o dia, o de `quando`, no fuso de Brasília.
 */
export function colofaoDe(caminho: string, arquivo = RELATORIO): string {
  const r = relatorio(arquivo);
  const emDia = r?.medidas?.find((m) => m.pagina === caminho && m.perfil === "celular4" && m.gesto === "rolagem")?.mediana?.emDia;
  if (typeof emDia !== "number" || !r?.quando) return LETRAS;
  const quando = dia.format(new Date(r.quando)).replaceAll("/", ".");
  return `${LETRAS} Esta página foi medida em ${quando}, num celular simulado com o processador quatro vezes mais lento. Ao rolar, ${numero.format(emDia * 100)} de cada 100 quadros chegaram a tempo à tela.`;
}

// lib/cnpj.ts — o CNPJ conferido pelos dígitos verificadores, no formato numérico e no alfanumérico,
// emitido desde 31.07.2026 (Receita Federal, Instrução Normativa RFB 2.229/2024; perguntas e respostas do
// CNPJ alfanumérico, gov.br). Cada caractere vale o código ASCII menos 48 ("0" = 0, "A" = 17); a conta é o
// módulo 11 de sempre. Caso real conferido: 00.000.000/E08G-12. Usado pelo conferir-pronto e pelos testes.

/** "12.ABC.345/01DE-35" → "12ABC34501DE35"; minúsculas viram maiúsculas. */
export function cnpjSemMascara(cnpj: string) {
  return cnpj.toUpperCase().replace(/[.\/\-\s]/g, "");
}

function digito(valores: number[], pesos: number[]) {
  const resto = valores.reduce((s, v, i) => s + v * pesos[i], 0) % 11;
  return resto < 2 ? 0 : 11 - resto;
}

export function cnpjValido(cnpj: string) {
  const c = cnpjSemMascara(cnpj);
  if (!/^[0-9A-Z]{12}[0-9]{2}$/.test(c) || /^(.)\1{13}$/.test(c)) return false;
  const valores = [...c.slice(0, 12)].map((ch) => ch.charCodeAt(0) - 48);
  const d1 = digito(valores, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = digito([...valores, d1], [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return c.endsWith(`${d1}${d2}`);
}

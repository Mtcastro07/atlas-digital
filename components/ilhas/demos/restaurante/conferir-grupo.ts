/**
 * O que o pedido de almoço para grupo não aceita, campo a campo (encomendasPagina.eventos): de 10 a 40 pessoas; a data
 * a partir de amanhã (a resposta sai em até um dia útil); no salão, só no sábado. Vazio é "a combinar", sem aviso. As
 * datas em "AAAA-MM-DD" (o valor do campo de data); `hoje`, o dia de Niterói (horaDeNiteroi().data). Função pura:
 * testada em registros/demos/restaurante/testes/restaurante.test.ts.
 */
export function conferirGrupo({ data, pessoas, noSalao, hoje }: { data: string; pessoas: string; noSalao: boolean; hoje: string }) {
  const n = Number(pessoas);
  const passada = data !== "" && data <= hoje;
  return {
    pessoas: pessoas.trim() !== "" && !(Number.isInteger(n) && n >= 10 && n <= 40),
    passada,
    // O meio-dia em UTC: o dia da semana da data escolhida, sem o fuso do aparelho.
    sabado: data !== "" && !passada && noSalao && new Date(`${data}T12:00:00Z`).getUTCDay() !== 6,
  };
}

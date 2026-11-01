// lib/agenda/texto.ts — o dia e a hora por extenso, em Niterói, para as telas e os e-mails (producao/esteira/14-funcionalidades/05-agenda.md,
// seção 6: "sexta-feira, 9 de outubro, às 14h30"). A hora segue a escrita do site ("7h", "18h30"; lib/horario.ts).
import { hora } from "../horario.ts";
import { horaEmNiteroi } from "./fuso.ts";

const formatoDoDia = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", weekday: "long", day: "numeric", month: "long" });
const diaCurto = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", weekday: "short", day: "numeric", month: "numeric" });

/** "sexta-feira, 9 de outubro". */
export function diaPorExtenso(instante: Date) {
  return formatoDoDia.format(instante);
}

/** "sexta-feira, 9 de outubro, às 14h30". */
export function quandoPorExtenso(instante: Date) {
  return `${diaPorExtenso(instante)}, às ${hora(horaEmNiteroi(instante))}`;
}

/** "sex., 09/10": o dia, para o painel. */
export function diaEmCurto(instante: Date) {
  return diaCurto.format(instante);
}

/** "14h30": a hora de parede de Niterói. */
export function horaDeParede(instante: Date) {
  return hora(horaEmNiteroi(instante));
}

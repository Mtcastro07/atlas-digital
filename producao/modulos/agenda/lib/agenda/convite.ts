// lib/agenda/convite.ts — o convite de calendário (.ics), sem biblioteca (producao/esteira/14-funcionalidades/05-agenda.md, seção 6).
// Segue a RFC 5545: linhas com CRLF, dobradas em 75 octetos, horários em UTC (o Z no fim), UID estável e texto escapado.
// Com METHOD:PUBLISH é uma mensagem iTIP, e a RFC 5546 (seção 3.2.1) pede o ORGANIZER: a casa, com o e-mail que envia.
// Sem dependência. O "agora" (o DTSTAMP) entra por parâmetro: o teste o fixa.

const instante = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); // 20261009T173000Z
const escapar = (t: string) => t.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r\n|\r|\n/g, "\\n");

/** Dobra a linha em 75 octetos; a continuação começa com um espaço, que conta no limite dela (RFC 5545, 3.1). */
export function dobrar(linha: string) {
  if (Buffer.byteLength(linha) <= 75) return linha;
  const partes: string[] = [];
  let atual = "";
  for (const letra of linha) {
    // for...of anda por caractere, não por octeto: um acento (2 octetos) nunca se parte ao meio.
    if (Buffer.byteLength(atual + letra) > (partes.length ? 74 : 75)) {
      partes.push(atual);
      atual = "";
    }
    atual += letra;
  }
  return [...partes, atual].join("\r\n ");
}

export function convite(
  c: {
    uid: string;
    inicio: Date;
    /** O fim do serviço, sem o intervalo de limpeza: o intervalo é da casa, não da pessoa. */
    fim: Date;
    titulo: string;
    local: string;
    descricao: string;
    organizador: { nome: string; email: string }; // a casa: o METHOD:PUBLISH exige ORGANIZER (RFC 5546, 3.2.1)
  },
  agora = new Date(),
) {
  const nome = c.organizador.nome.replace(/["\r\n]/g, ""); // valor entre aspas não aceita aspas nem quebra
  return (
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Atlas Digital//Agenda//PT-BR",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${c.uid}`, // reserva-<id>@<domínio do cliente>
      `DTSTAMP:${instante(agora)}`,
      `DTSTART:${instante(c.inicio)}`,
      `DTEND:${instante(c.fim)}`,
      `ORGANIZER;CN="${nome}":mailto:${c.organizador.email}`,
      `SUMMARY:${escapar(c.titulo)}`,
      `LOCATION:${escapar(c.local)}`,
      `DESCRIPTION:${escapar(c.descricao)}`, // inclui o vínculo de cancelamento
      "END:VEVENT",
      "END:VCALENDAR",
    ]
      .map(dobrar)
      .join("\r\n") + "\r\n"
  );
}

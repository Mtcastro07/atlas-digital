// lib/formulario/entrada.ts — a leitura do que chega do navegador: o texto de um campo e o IP de quem pediu
// (producao/esteira/14-funcionalidades/02-formulario.md, seções 3.2 e 5.3). Sem dependência. Serve ao formulário e à Agenda,
// que protege a reserva do mesmo jeito.

/** O texto de um campo: só string, sem espaço nas pontas; quebra de linha só na mensagem (nada de quebra num cabeçalho de e-mail). */
export function campo(dados: FormData, nome: string, linhas = false) {
  const valor = dados.get(nome);
  if (typeof valor !== "string") return ""; // o campo enviado como arquivo não é texto
  const limpo = valor.trim();
  return linhas ? limpo.replace(/\r\n?/g, "\n") : limpo.replace(/[\r\n]+/g, " ");
}

/** O endereço de loopback. O Next põe o do soquete no x-forwarded-for quando o proxy não manda o cabeçalho (next/dist/server/base-server.js: `??=`), e contá-lo poria todo visitante no mesmo balde. */
const LOOPBACK = /^(::1|(::ffff:)?127\.[\d.]+)$/i;

/** O IP que o proxy da Hostinger acrescentou: o último do x-forwarded-for. Os anteriores, o cliente pode forjar. */
export function ipDoVisitante(h: Headers) {
  const cadeia = (h.get("x-forwarded-for") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const ip = cadeia.at(-1) ?? h.get("x-real-ip");
  return ip && !LOOPBACK.test(ip) ? ip : null; // sem cabeçalho (ou só o loopback do próprio Next), null: nunca um balde comum a todos
}

// lib/whatsapp.ts — o vínculo do WhatsApp com a mensagem já escrita. Nada passa por servidor
// (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 1).

/** Número brasileiro no formato do wa.me: 55 + DDD (2) + número (8 ou 9 algarismos). */
const FORMATO = /^55\d{10,11}$/;

export function vinculoDoWhatsapp(numero: string, mensagem?: string) {
  const algarismos = numero.replace(/\D/g, "");
  // Falha no build (a página é pré-renderizada), não no aparelho de quem visita.
  if (!FORMATO.test(algarismos)) throw new Error(`WhatsApp fora do formato 55DDDNNNNNNNN: "${numero}"`);
  const base = `https://wa.me/${algarismos}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

/** "5521900000000" → "(21) 90000-0000"; "552133334444" → "(21) 3333-4444". */
export function telefoneVisivel(numero: string) {
  const a = numero.replace(/\D/g, "").replace(/^55/, "");
  const ddd = a.slice(0, 2);
  const resto = a.slice(2);
  const corte = resto.length === 9 ? 5 : 4;
  return `(${ddd})\u00a0${resto.slice(0, corte)}-${resto.slice(corte)}`; // espaço sem quebra depois do DDD
}

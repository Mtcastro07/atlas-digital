// Textos comuns aos três sites do simulador (a escada, na página Planos): o selo de
// ficção e o crédito da agência, obrigatórios em todo demonstrativo
// (contextos/atlas--contexto-02-nichos.md, seção 2), e o número fictício
// de WhatsApp. Nenhum demonstrativo coleta dado: as funcionalidades só
// compõem uma mensagem, que sai do próprio aparelho.

/** Número fictício (00000-0000): o vínculo abre o WhatsApp sem destinatário real. */
export const whatsappFicticio = "5521900000000";
export const whatsappVisivel = "(21) 90000-0000";

/** Vínculo do WhatsApp com a mensagem pronta. */
export const vinculoDoWhatsapp = (texto: string) => `https://wa.me/${whatsappFicticio}?text=${encodeURIComponent(texto)}`;

export const seloDeFiccao =
  "Estabelecimento fictício, criado pela Atlas Digital para demonstração. Nenhum pedido é processado e nenhum dado é coletado nesta página.";

export const creditoDoPlano = (plano: string) => `Site do plano ${plano}, feito pela Atlas Digital.`;

/**
 * Os feriados nacionais que restam de 2026 e os de 2027, em que os sites de exemplo fecham (o estado ao vivo,
 * lib/demos/relogio.ts). A Sexta-feira da Paixão de 2027 (26/03) vem do cômputo da Páscoa (28/03). A conferir
 * no calendário oficial antes de uso real; num cliente, entram também os estaduais e os de Niterói. Mantê-los é tarefa
 * da manutenção: sem eles, o estado ao vivo diria "aberto agora" num feriado.
 */
export const feriadosNacionais: readonly { data: string; motivo: string }[] = [
  { data: "2026-10-12", motivo: "feriado nacional" },
  { data: "2026-11-02", motivo: "feriado nacional" },
  { data: "2026-11-15", motivo: "feriado nacional" },
  { data: "2026-11-20", motivo: "feriado nacional" },
  { data: "2026-12-25", motivo: "feriado nacional" },
  // 2027: os mesmos feriados nacionais, com a Sexta-feira da Paixão (Páscoa em 28/03/2027, pelo cômputo). A conferir no
  // calendário oficial antes de uso real.
  { data: "2027-01-01", motivo: "feriado nacional" },
  { data: "2027-03-26", motivo: "feriado nacional" },
  { data: "2027-04-21", motivo: "feriado nacional" },
  { data: "2027-05-01", motivo: "feriado nacional" },
  { data: "2027-09-07", motivo: "feriado nacional" },
  { data: "2027-10-12", motivo: "feriado nacional" },
  { data: "2027-11-02", motivo: "feriado nacional" },
  { data: "2027-11-15", motivo: "feriado nacional" },
  { data: "2027-11-20", motivo: "feriado nacional" },
  { data: "2027-12-25", motivo: "feriado nacional" },
];

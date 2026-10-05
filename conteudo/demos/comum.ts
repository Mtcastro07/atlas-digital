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

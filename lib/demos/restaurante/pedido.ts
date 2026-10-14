// lib/demos/restaurante/pedido.ts — o montador de pedido da Cozinha do Ingá (producao/esteira/nichos/restaurante.md,
// seção 5.1): os itens escolhidos, o frete do bairro discriminado, o total antes do envio e a mensagem do WhatsApp.
// Preços em centavos (nada de vírgula flutuante no dinheiro). Funções puras, sem import de valor (rodam direto no
// node:test). Nada é registrado: a mensagem sai do aparelho pelo aplicativo.

export type ItemDoPedido = { id: string; nome: string; preco: number };
/** id → quantidade (zero ou ausente: fora do pedido). */
export type Escolha = Readonly<Record<string, number>>;
export type Entrega = { tipo: "retirada" } | { tipo: "entrega"; bairro: string; frete: number };

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
/** 3800 → "R$ 38,00" (com o espaço sem quebra entre o símbolo e o número). */
export const real = (centavos: number) => moeda.format(centavos / 100);

export type Resumo = {
  linhas: readonly { id: string; nome: string; quantidade: number; valor: number }[];
  subtotal: number;
  frete: number;
  total: number;
  /** Na entrega, quanto falta para o pedido mínimo (0 quando já passou, ou na retirada). */
  falta: number;
  vazio: boolean;
  /** Pode enviar: há item e, na entrega, o mínimo foi atingido. */
  enviavel: boolean;
};

export function resumirPedido(itens: readonly ItemDoPedido[], escolha: Escolha, entrega: Entrega, minimo: number): Resumo {
  const linhas = itens
    .filter((i) => (escolha[i.id] ?? 0) > 0)
    .map((i) => ({ id: i.id, nome: i.nome, quantidade: escolha[i.id], valor: escolha[i.id] * i.preco }));
  const subtotal = linhas.reduce((s, l) => s + l.valor, 0);
  const vazio = linhas.length === 0;
  const frete = entrega.tipo === "entrega" && !vazio ? entrega.frete : 0;
  const falta = entrega.tipo === "entrega" && !vazio ? Math.max(0, minimo - subtotal) : 0;
  return { linhas, subtotal, frete, total: subtotal + frete, falta, vazio, enviavel: !vazio && falta === 0 };
}

export type Rotulos = {
  abertura: string;
  subtotal: string;
  entrega: (bairro: string) => string;
  retirada: string;
  total: string;
  pagamento: string;
  observacao: string;
};

/** A mensagem do WhatsApp: os itens com a quantidade e o valor, o subtotal, o frete discriminado, o total e o resto. */
export function mensagemDoPedido(resumo: Resumo, entrega: Entrega, rotulos: Rotulos, extras: { pagamento?: string; observacao?: string } = {}) {
  const linhas = [rotulos.abertura, ...resumo.linhas.map((l) => `${l.quantidade} × ${l.nome}: ${real(l.valor)}`), `${rotulos.subtotal}: ${real(resumo.subtotal)}`];
  linhas.push(entrega.tipo === "entrega" ? `${rotulos.entrega(entrega.bairro)}: ${real(resumo.frete)}` : rotulos.retirada);
  linhas.push(`${rotulos.total}: ${real(resumo.total)}`);
  if (extras.pagamento) linhas.push(`${rotulos.pagamento}: ${extras.pagamento}.`);
  const obs = extras.observacao?.trim();
  if (obs) linhas.push(`${rotulos.observacao}: ${obs}`);
  return linhas.join("\n");
}

/** O vínculo do WhatsApp com a mensagem pronta, para um número no formato 55DDDNNNNNNNN (falha no build se não for). */
export function vinculoDoWhatsapp(numero: string, mensagem?: string) {
  if (!/^55\d{10,11}$/.test(numero)) throw new Error(`WhatsApp fora do formato 55DDDNNNNNNNN: "${numero}"`);
  return mensagem ? `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}` : `https://wa.me/${numero}`;
}

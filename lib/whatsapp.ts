import { contato } from "@/conteudo/contato";
import { reais } from "@/lib/moeda";

/** Endereço wa.me com a mensagem já escrita. Nada passa por servidor. */
export function linkWhatsApp(mensagem?: string) {
  const base = `https://wa.me/${contato.whatsapp}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

type Orcamento = {
  plano: string;
  modulos: string[];
  criacao: number;
  mensal: number;
};

/** A mensagem do montador, na voz de quem a envia, o cliente (desde 03/11; até então, impessoal, como um formulário). */
export function mensagemDeOrcamento({ plano, modulos, criacao, mensal }: Orcamento) {
  const extras = modulos.length ? ` com ${new Intl.ListFormat("pt-BR").format(modulos)}` : "";
  return `Olá! Montei um orçamento no site: plano ${plano}${extras}, ${reais(criacao)} de criação e ${reais(mensal)} por mês. Podemos conversar?`;
}

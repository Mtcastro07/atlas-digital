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
  /** A criação sem a condição de fundação (17/10): o valor cheio, dito junto do valor da condição. */
  cheio?: number;
};

/** Mensagem impessoal gerada pelo montador (contexto de produto, seção 2). */
export function mensagemDeOrcamento({ plano, modulos, criacao, mensal, cheio }: Orcamento) {
  const partes = [`Orçamento composto no site. Plano ${plano}.`];
  if (modulos.length === 1) partes.push(`Módulo: ${modulos[0]}.`);
  if (modulos.length > 1) partes.push(`Módulos: ${modulos.join(" e ")}.`);
  const condicao = cheio && cheio !== criacao ? ` (condição de fundação; valor cheio: ${reais(cheio)})` : "";
  partes.push(`Criação: ${reais(criacao)}${condicao}. Mensalidade: ${reais(mensal)}.`);
  partes.push("Contato solicitado por esta mensagem.");
  return partes.join(" ");
}

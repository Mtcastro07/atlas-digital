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

/** Mensagem impessoal gerada pelo montador (contexto de produto, seção 2). */
export function mensagemDeOrcamento({ plano, modulos, criacao, mensal }: Orcamento) {
  const partes = [`Orçamento composto no site. Plano ${plano}.`];
  if (modulos.length === 1) partes.push(`Módulo: ${modulos[0]}.`);
  if (modulos.length > 1) partes.push(`Módulos: ${modulos.join(" e ")}.`);
  partes.push(`Criação: ${reais(criacao)}. Mensalidade: ${reais(mensal)}.`);
  partes.push("Contato solicitado por esta mensagem.");
  return partes.join(" ");
}

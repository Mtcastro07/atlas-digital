import type { depositoSite } from "@/conteudo/demos/deposito";

type Servico = (typeof depositoSite)["calculadora"]["servicos"][number];

/**
 * A conta do balcão, num lugar só (14.10.2026): a calculadora
 * (components/ilhas/demos/calculadora.tsx) e a amostra do cupom da página
 * inicial (a cena "A conta do balcão") saem desta função. Sacos e unidades
 * sobem para o inteiro; metro cúbico fica com duas casas.
 */
export function listaDoServico(servico: Servico, area: number, perda: number) {
  return servico.itens.map((item) => {
    const bruto = item.porM2 * area * perda;
    return { ...item, quantidade: item.inteiro ? Math.ceil(bruto - 1e-9) : Math.ceil(bruto * 100) / 100 };
  });
}

export const formatar = (valor: number) => valor.toLocaleString("pt-BR", { maximumFractionDigits: 2 });

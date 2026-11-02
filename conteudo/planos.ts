// Preços publicados. Fonte única: seção Planos, montador de orçamento,
// destaques da capa e dados estruturados leem daqui.
// Fonte: ata de decisões, bloco 07 (desconto só na criação, nunca na mensalidade).

import { reais } from "@/lib/moeda";

export type Plano = {
  id: string;
  nome: string;
  criacao: number;
  mensal: number;
  itens: string[];
  destaque?: boolean;
};

export type Modulo = {
  id: string;
  nome: string;
  descricao: string;
  criacao: number;
  /** Ausente quando o módulo não tem recorrência. */
  mensal?: number;
  /** Cobrança por unidade pedida, fora do montador. */
  porPagina?: boolean;
};

export const planos: Plano[] = [
  {
    id: "essencial",
    nome: "Essencial",
    criacao: 900,
    mensal: 190,
    itens: [
      "Até três páginas",
      "Redação dos textos incluída",
      "Botão de WhatsApp e mapa",
      "Otimização para a busca local",
      // Até 16/10, "Movimento: revelação e transições" (o jargão da agência; Impeccable, heurística 2). O mesmo fato.
      "Conteúdo que aparece ao rolar e troca suave de página",
    ],
  },
  {
    id: "profissional",
    nome: "Profissional",
    criacao: 1500,
    mensal: 250,
    destaque: true,
    itens: [
      "Até seis páginas",
      "Galeria e formulário",
      "Uma funcionalidade sob medida",
      "Relatório mensal de acessos",
      // Até 16/10, "Movimento: galeria, vidro e navegação viva". A navegação viva é o menu que marca a página aberta.
      "Galeria de fotos que se passa com o dedo, cabeçalho de vidro e menu que marca a página aberta",
    ],
  },
  {
    id: "completo",
    nome: "Completo",
    criacao: 2400,
    mensal: 400,
    itens: [
      "Páginas sem limite definido",
      "Duas funcionalidades sob medida",
      "Revisões trimestrais de conteúdo",
      "Atendimento prioritário",
      // Até 16/10, "Movimento: camada completa".
      "Todos os efeitos de movimento",
    ],
  },
];

export const modulos: Modulo[] = [
  {
    id: "agenda",
    nome: "Agenda",
    descricao: "Marcação e confirmação automáticas.",
    criacao: 400,
    mensal: 80,
  },
  {
    id: "presenca",
    nome: "Presença",
    descricao: "Perfil no Google e gestão de avaliações.",
    criacao: 300,
    mensal: 100,
  },
  {
    id: "pagina-adicional",
    nome: "Página adicional",
    descricao:
      "Redação, diagramação e publicação de uma página nova, quando houver o pedido.",
    criacao: 250,
    porPagina: true,
  },
];

/**
 * O preço do módulo, em criação e mensalidade (a página adicional é cobrada por página, sem recorrência). Aqui, e
 * não na seção Planos, desde 16/10: o llms.txt (app/llms.txt/route.ts) repete o preço com as mesmas palavras.
 */
export function precoDoModulo(m: Modulo) {
  if (m.porPagina) return { criacao: `${reais(m.criacao)} por página`, mensal: "sem recorrência" };
  return { criacao: reais(m.criacao), mensal: `${reais(m.mensal ?? 0)} por mês` };
}

/** Módulos que entram no montador: os de cobrança recorrente. */
export const modulosDoMontador = modulos.filter((m) => !m.porPagina);

/** O selo do plano com `destaque` (a etiqueta de components/ui/etiqueta-recomendado.tsx). */
export const seloDoRecomendado = "Recomendado";

/**
 * A condição de fundação, numa redação só no site inteiro (decisão do aprovador, 28/10/2026): o h2 das chapas do
 * início, a nota 1 de /planos, a linha da conta do montador e a pergunta "Quanto custa um site?". A outra parte da
 * condição da ata v3.0, IV.3 (a mensalidade parada por doze meses), saiu do site; a ata não mudou, e o site e a ata
 * divergem até os sócios decidirem (registros/atlas/design-v2/R10/construcao/CONTRATO.md, 7).
 * Aqui, ao lado dos preços: o desconto é só na criação, nunca na mensalidade (a ata de decisões, bloco 07, no topo).
 */
export const condicaoDeFundacao = "Nos três primeiros contratos, 50% de desconto na criação.";

export const faixaDePreco = {
  minimo: Math.min(...planos.map((p) => p.criacao)),
  maximo: Math.max(...planos.map((p) => p.criacao)),
};

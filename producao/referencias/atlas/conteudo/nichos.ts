// Os dois demonstrativos da vitrine (página Para quem): o conteúdo de cada
// tela e as notas com as exigências do nicho.
// Estabelecimentos fictícios, produzidos pela agência.
//
// As telas (components/telas/) viram imagem em public/telas/ pela
// ferramenta ferramentas/capturar-telas.mjs, que também mede onde fica
// cada marcador numerado (telas-posicoes.json). Mudou um texto de `tela`?
// Recapture — senão a imagem fica desatualizada.

import posicoes from "@/conteudo/telas-posicoes.json";

export const deposito = {
  id: "deposito",
  /** Na vitrine, acima do nome da casa; na tela, sob a marca (mudou, recapture). */
  nicho: "Material de construção",
  /** Rótulo curto, para o seletor do celular. */
  rotuloCurto: "Construção",
  casa: "Depósito Engenhoca",
  tela: {
    bairro: "Engenhoca, Niterói",
    titulo: "Material para obra, com entrega no bairro.",
    /** A placa do horário: o aviso de aberto e a semana em três colunas (horários do demo). */
    horario: {
      estado: "Aberto agora",
      fecha: "Fecha às 18h",
      dias: [
        { dia: "Seg. a sex.", hora: "7h – 18h", fechado: false },
        { dia: "Sábado", hora: "8h – 13h", fechado: false },
        { dia: "Domingo", hora: "Fechado", fechado: true },
      ],
    },
    /**
     * A calculadora do demo, com os índices do balcão: alvenaria de bloco
     * cerâmico 9 × 19 × 39 (12,5 blocos, 0,35 saco de argamassa e 0,18 saco
     * de cimento por m²) e 10% de perda. 4,80 × 2,70 = 12,96 m²; com a
     * perda, 14,26 m² → 179 blocos, 5 sacos e 3 sacos (sacos e blocos
     * arredondados para cima).
     */
    calculo: {
      titulo: "Calculadora de materiais",
      servicos: ["Alvenaria", "Contrapiso", "Reboco"],
      medidas: [
        { rotulo: "Largura", valor: "4,80", unidade: "m" },
        { rotulo: "Altura", valor: "2,70", unidade: "m" },
      ],
      resultado: { quantidade: "179", item: "Blocos cerâmicos", medida: "9 × 19 × 39 cm, com 10% de perda" },
      itens: [
        { item: "Argamassa de assentamento, 20 kg", quantidade: "5 sacos" },
        { item: "Cimento CP-II, 50 kg", quantidade: "3 sacos" },
      ],
    },
    /** A lista da calculadora vira mensagem pronta (a lista de compra do demo). */
    acao: "Enviar lista pelo WhatsApp",
    entrega: {
      titulo: "Entrega própria",
      texto: "Engenhoca e bairros vizinhos. Pedido até as 15h chega no mesmo dia.",
    },
  },
  /** Texto alternativo da imagem da tela. */
  descricao:
    "Tela do site do Depósito Engenhoca no celular: horário de funcionamento com o aviso de aberto agora, calculadora de materiais com o resultado para uma parede de 4,80 por 2,70 metros, botão para enviar a lista pelo WhatsApp e mapa da área de entrega.",
  /** Notas da vitrine, na ordem em que aparecem na tela (marcadores 1 a 4). */
  notas: [
    "Horário de funcionamento visível na primeira tela.",
    "Cálculo de quantidade antes do pedido.",
    "Pedido direto pelo WhatsApp, com a lista pronta.",
    "Área de entrega informada no próprio site.",
  ],
};

export const nutricao = {
  id: "nutricao",
  nicho: "Nutrição",
  rotuloCurto: "Nutrição",
  casa: "Nutrição Icaraí",
  tela: {
    /** Registro no conselho, no cabeçalho: fictício (00000), como todo o demonstrativo. */
    credencial: "Maria da Silva, CRN4 00000",
    bairro: "Icaraí, Niterói",
    /** Título e lide do demo de nutrição. */
    titulo: "Comer bem. Sem se tornar outra pessoa.",
    subtitulo: "Plano alimentar a partir da rotina de cada pessoa, com substituições para cada refeição.",
    /** Valor declarado, sem lógica promocional (CFN 599/2018; demo de nutrição). */
    consulta: { nome: "Primeira consulta", duracao: "60 minutos", preco: "R$ 250" },
    agenda: {
      titulo: "Horários livres nesta semana",
      dias: [
        { dia: "Seg", data: "5", livres: 2 },
        { dia: "Ter", data: "6", livres: 4 },
        { dia: "Qua", data: "7", livres: 1 },
        { dia: "Qui", data: "8", livres: 0 },
        { dia: "Sex", data: "9", livres: 3 },
      ],
      /** O dia e o horário escolhidos: os dois toques. */
      diaEscolhido: 1,
      horarios: ["9h", "10h30", "14h", "16h30"],
      horarioEscolhido: 2,
    },
    acao: "Agendar terça, 14h",
    /** As etapas do demo, no lugar do depoimento. */
    etapas: {
      titulo: "Como é o acompanhamento",
      itens: [
        { nome: "Consulta", prazo: "história e rotina" },
        { nome: "Plano por escrito", prazo: "em até 2 dias úteis" },
        { nome: "Retorno", prazo: "sugerido em 30 dias" },
      ],
    },
    local: {
      titulo: "Consultório em Icaraí",
      texto: "A duas quadras do Campo de São Bento. Acesso sem degraus.",
      modalidades: ["Presencial", "Por vídeo"],
    },
  },
  descricao:
    "Tela do site da Nutrição Icaraí no celular: valor e duração da primeira consulta, horários livres da semana com a terça escolhida, botão para agendar, etapas do acompanhamento e localização do consultório, com atendimento presencial ou por vídeo.",
  notas: [
    "Horários livres da semana à vista.",
    "Agendamento em dois toques, sem troca de mensagens.",
    "As etapas da consulta ocupam o lugar do depoimento, vedado pelo conselho da profissão.",
    "Endereço e modalidade de atendimento.",
  ],
};

type Marcador = { numero: number; x: number; y: number };

/** Marcadores da tela, em % da largura e da altura, na ordem das notas. */
function marcadoresDe(id: keyof typeof posicoes): Marcador[] {
  return Object.entries(posicoes[id] as Record<string, { x: number; y: number }>)
    .map(([numero, p]) => ({ numero: Number(numero), ...p }))
    .sort((a, b) => a.numero - b.numero);
}

export type Demonstrativo = {
  id: "deposito" | "nutricao";
  nicho: string;
  rotuloCurto: string;
  casa: string;
  imagem: string;
  descricao: string;
  notas: string[];
  marcadores: Marcador[];
};

export const demonstrativos: Demonstrativo[] = [deposito, nutricao].map((d) => ({
  id: d.id as Demonstrativo["id"],
  nicho: d.nicho,
  rotuloCurto: d.rotuloCurto,
  casa: d.casa,
  imagem: `/telas/${d.id}.webp`,
  descricao: d.descricao,
  notas: d.notas,
  marcadores: marcadoresDe(d.id as keyof typeof posicoes),
}));

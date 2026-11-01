// conteudo/negocio.ts — os dados do negócio numa fonte só: o texto das páginas, o rodapé,
// os dados estruturados e os metadados leem daqui (producao/esteira/14-funcionalidades/01-base-de-todo-site.md,
// seções 4 e 6: nome, endereço e telefone iguais em todo lugar).
//
// Site de EXEMPLO, fictício (`exemplo: true`): o selo de ficção, o noindex e o número fictício ficam ligados.
// Todo dado sai do briefing.md (seções 1, 3 e 4): o endereço usa uma rua e um CEP reais da Boa Viagem, conferidos
// no OpenStreetMap em 08.10.2026, com o número fictício; o CRO é fictício e evidente (00000).
// As ferramentas (a régua, o conferir-pronto) leem alguns campos deste arquivo como texto: mantenha
// `exemplo`, `nome`, `razaoSocial`, `cnpj`, `nomeCompleto` e `registro` cada um numa linha, entre aspas duplas.
import { contato } from "./contato.ts"; // com a extensão: o node:test (npm test) não resolve o import sem ela

export type Faixa = { abre: string; fecha: string }; // "08:00", "18:00", hora de parede de Niterói
export type Dia = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = domingo

export const negocio = {
  /** true no site de exemplo (selo de ficção, noindex, número fictício). Num site de cliente, false. */
  exemplo: true,
  nome: "Odontologia Boa Viagem",
  /** O que faz, para o título da página inicial ("Nome · o que faz"). */
  oQueFaz: "clínica odontológica em Niterói",
  /**
   * Razão social e CNPJ, no rodapé (Decreto 7.962/2013, art. 2º). Exemplo: nenhum, o estabelecimento é fictício.
   */
  razaoSocial: "",
  cnpj: "",
  /** Profissional pessoa física, sem CNPJ: o nome completo, que o rodapé mostra com o `registro`. */
  nomeCompleto: "",
  endereco: {
    logradouro: "Rua Presidente Domiciano",
    numero: "000",
    complemento: "",
    bairro: "Boa Viagem",
    cidade: "Niterói",
    uf: "RJ",
    cep: "24210-320",
  },
  /** Coordenadas com 5 casas decimais, para os dados estruturados (vazio no exemplo). */
  geo: null as null | { latitude: number; longitude: number },
  /** Só algarismos, com o 55: de conteudo/contato.ts. */
  telefone: contato.telefone,
  whatsapp: contato.whatsapp,
  email: "",
  /**
   * O registro do conselho (Código de Ética Odontológica, art. 43): a inscrição da clínica no CRO. O número é fictício
   * e evidente. O responsável técnico, também obrigatório, fica em `responsavelTecnico`.
   */
  registro: "CRO-RJ 00000",
  /** O prazo de resposta que o cliente promete (campo obrigatório do briefing). */
  prazoDeResposta: "Resposta em até 30 minutos, no horário de funcionamento.",
  /** O subtipo de LocalBusiness do schema.org. No exemplo não há dado estruturado. */
  tipoSchema: "Dentist",
  url: `https://${contato.dominio}`,
  /** Faixa de preço para os dados estruturados: vazia, porque o conselho veda o preço (Código de Ética, art. 44, I). */
  faixaDePreco: "",
  plano: "Completo",
};

/** O responsável técnico da clínica (Código de Ética Odontológica, art. 43, caput): nome e inscrição, em toda página. */
export const responsavelTecnico = {
  nome: "Dra. Beatriz da Silva",
  profissao: "cirurgiã-dentista",
  registro: "CRO-RJ 00000",
} as const;

/** O expediente por dia da semana. Duas faixas no dia = fecha para o almoço (briefing, seção 3). */
export const expediente: Record<Dia, Faixa[]> = {
  0: [],
  1: [{ abre: "08:00", fecha: "12:00" }, { abre: "13:30", fecha: "18:00" }],
  2: [{ abre: "08:00", fecha: "12:00" }, { abre: "13:30", fecha: "18:00" }],
  3: [{ abre: "08:00", fecha: "12:00" }, { abre: "13:30", fecha: "18:00" }],
  4: [{ abre: "08:00", fecha: "12:00" }, { abre: "13:30", fecha: "18:00" }],
  5: [{ abre: "08:00", fecha: "12:00" }, { abre: "13:30", fecha: "17:00" }],
  6: [{ abre: "08:00", fecha: "12:00" }],
};

/**
 * A urgência: o encaixe no mesmo dia, de segunda a sexta, para quem avisar até as 16h (briefing, seção 12).
 * Os dias são os da semana (1 = segunda); o limite, em hora de parede de Niterói.
 */
export const urgencia = { dias: [1, 2, 3, 4, 5] as readonly Dia[], ate: "16:00" } as const;

/**
 * Dias fechados fora da regra, em AAAA-MM-DD: o briefing diz "Feriados: fechado". São os feriados nacionais que
 * restam em 2026 (12.10, 02.11, 15.11, 20.11 e 25.12), do calendário oficial, a conferir antes de uso real.
 * Mantê-los é tarefa da manutenção mensal: sem eles, o estado ao vivo diria "aberto agora" num feriado.
 */
export const fechamentos: { data: string; motivo: string }[] = [
  { data: "2026-10-12", motivo: "feriado nacional" },
  { data: "2026-11-02", motivo: "feriado nacional" },
  { data: "2026-11-15", motivo: "feriado nacional" },
  { data: "2026-11-20", motivo: "feriado nacional" },
  { data: "2026-12-25", motivo: "feriado nacional" },
];

/** A data da última mudança de conteúdo, para o mapa do site (não a do build). */
export const ultimaAlteracao = "2026-10-08";

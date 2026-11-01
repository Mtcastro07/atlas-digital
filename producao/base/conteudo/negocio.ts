// conteudo/negocio.ts — os dados do negócio numa fonte só: o texto das páginas, o rodapé,
// os dados estruturados e os metadados leem daqui (producao/esteira/14-funcionalidades/01-base-de-todo-site.md,
// seções 4 e 6: nome, endereço e telefone iguais em todo lugar).
//
// O conteúdo de fábrica é de um site de EXEMPLO, fictício (`exemplo: true`): o selo de ficção,
// o noindex e o número fictício ficam ligados. Num site de cliente, tudo sai do briefing.md e
// `exemplo` vira false; o `npm run pronto` recusa publicar com dado de exemplo.
// As ferramentas (a régua, o conferir-pronto) leem alguns campos deste arquivo como texto: mantenha
// `exemplo`, `nome`, `razaoSocial`, `cnpj`, `nomeCompleto` e `registro` cada um numa linha, entre aspas duplas.
import { contato } from "./contato.ts"; // com a extensão: o node:test (npm test) não resolve o import sem ela

export type Faixa = { abre: string; fecha: string }; // "08:00", "18:00", hora de parede de Niterói
export type Dia = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = domingo

export const negocio = {
  /** true no site de exemplo (selo de ficção, noindex, número fictício). Num site de cliente, false. */
  exemplo: true,
  nome: "Banho e Tosa Fonseca",
  /** O que faz, para o título da página inicial ("Nome · o que faz"). */
  oQueFaz: "banho e tosa no Fonseca, Niterói",
  /**
   * Razão social e CNPJ, no rodapé (Decreto 7.962/2013, art. 2º; producao/esteira/17-conformidade-e-normas.md,
   * seção 3.1). Profissional pessoa física: o nome completo e o registro do conselho; o CPF não se publica.
   */
  razaoSocial: "",
  cnpj: "",
  /** Profissional pessoa física, sem CNPJ: o nome completo, que o rodapé mostra com o `registro`. */
  nomeCompleto: "",
  endereco: {
    logradouro: "Alameda São Boaventura",
    numero: "000",
    complemento: "",
    bairro: "Fonseca",
    cidade: "Niterói",
    uf: "RJ",
    cep: "24120-000",
  },
  /** Coordenadas com 5 casas decimais, para os dados estruturados (vazio no exemplo). */
  geo: null as null | { latitude: number; longitude: number },
  /** Só algarismos, com o 55 (producao/esteira/14/01, seções 1 e 2): de conteudo/contato.ts. */
  telefone: contato.telefone,
  whatsapp: contato.whatsapp,
  email: "",
  /** O registro do conselho, quando o nicho tem conselho (producao/esteira/14/01, seção 7). Pet shop sem veterinário: nenhum. */
  registro: "",
  /** O prazo de resposta que o cliente promete (campo obrigatório do briefing). */
  prazoDeResposta: "Resposta em até 1 hora, no horário de funcionamento.",
  /** O subtipo de LocalBusiness do schema.org (producao/esteira/14/01, seção 11). */
  tipoSchema: "PetStore",
  url: `https://${contato.dominio}`,
  /** Faixa de preço para os dados estruturados; vazio onde o conselho veda preço. */
  faixaDePreco: "R$ 50 a R$ 160",
  plano: "Essencial",
};

/** O expediente por dia da semana (producao/esteira/14/01, seção 4). Duas faixas no dia = fecha para o almoço. */
export const expediente: Record<Dia, Faixa[]> = {
  0: [],
  1: [{ abre: "08:00", fecha: "18:00" }],
  2: [{ abre: "08:00", fecha: "18:00" }],
  3: [{ abre: "08:00", fecha: "18:00" }],
  4: [{ abre: "08:00", fecha: "18:00" }],
  5: [{ abre: "08:00", fecha: "18:00" }],
  6: [{ abre: "08:00", fecha: "14:00" }],
};

/** Dias fechados fora da regra (feriados, recessos), em AAAA-MM-DD. */
export const fechamentos: { data: string; motivo: string }[] = [];

/** A data da última mudança de conteúdo, para o mapa do site (não a do build). */
export const ultimaAlteracao = "2026-10-08";

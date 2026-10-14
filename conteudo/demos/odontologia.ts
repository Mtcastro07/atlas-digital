// Odontologia Boa Viagem: o site de odontologia do plano Completo no simulador de planos (desde 08/10, quatro sites por
// plano; components/secoes/escada.tsx). Clínica fictícia de bairro, com três dentistas "da Silva" e registros
// evidentes (CRO-RJ 00000). Cada fato sai do briefing fictício (registros/demos/odontologia/briefing.md, fora do git),
// adotado do da referência do kit (producao/referencias/odontologia-completo/); cada vedação, da norma do conselho
// lida na fonte em 08.10.2026 (registros/demos/odontologia/decisoes.md): nenhum valor, nenhuma forma de pagamento,
// nenhum convênio, nenhum antes e depois, nenhum paciente, nunca "popular" (Código de Ética Odontológica, art. 44,
// I e VII), nenhum diagnóstico pela página (art. 44, V). Os protocolos de tratamento (sessões, intervalos, cuidados)
// são "da casa" fictícia e dependem de revisão de um dentista antes de qualquer uso real. Identidade "Ficha
// clínica" (aprovada em 08/10): papel, grafite e lápis vermelho; Red Hat Display e Red Hat Text; o mapa dos dentes
// como peça-assinatura. Texto impessoal, calmo e preciso: o tempo no lugar do preço.

import type { RegiaoId } from "@/lib/demos/odontologia/dentes";
import type { Urgencia } from "@/lib/demos/odontologia/tempo";
import type { Dia, Expediente, Fechamento } from "@/lib/demos/relogio";

import { feriadosNacionais } from "./comum";

const raiz = "/demos/odontologia";

export type IdDaPagina =
  | "inicio"
  | "tratamentos"
  | IdDoTratamento
  | "avaliacao"
  | "equipe"
  | "guias"
  | "onde"
  | "privacidade"
  | "acessibilidade";

export type PaginaDaClinica = {
  id: IdDaPagina;
  caminho: string;
  /** O nome na barra e no índice do rodapé. */
  rotulo: string;
  /** O título da página (o `h1`, quando a página não escreve outro), sem a marca. */
  titulo: string;
  /** A meta description, até ~125 caracteres; os metadados acrescentam "Estabelecimento fictício.". */
  descricao: string;
  /** Na barra: as cinco páginas de conteúdo. As de tratamento ficam sob Tratamentos; as legais, no rodapé. */
  naBarra?: boolean;
  /** Página filha: a mãe fica marcada na barra. */
  pai?: IdDaPagina;
  legal?: boolean;
};

export type IdDoTratamento = "limpeza" | "restauracao" | "canal" | "clareamento" | "coroa" | "aparelho";
export type IdDoDentista = "beatriz" | "caio" | "helena";

export const odontologiaSite = {
  caminho: raiz,
  nome: "Odontologia Boa Viagem",
  /** O ícone e o selo da placa: o monograma (briefing, seção 7: não há logotipo). */
  monograma: "BV",
  oQueFaz: "Clínica odontológica",
  /** A inscrição da clínica (pessoa jurídica) no CRO-RJ: fictícia e evidente (Código de Ética Odontológica, art. 43). */
  registro: "CRO-RJ 00000",
  /** O responsável técnico, obrigatório na clínica (art. 43, caput): em toda página, também no celular. */
  responsavel: { rotulo: "Responsável técnica", nome: "Dra. Beatriz da Silva", profissao: "cirurgiã-dentista", registro: "CRO-RJ 00000" },
  endereco: {
    logradouro: "Rua Presidente Domiciano",
    numero: "000",
    bairro: "Boa Viagem",
    cidade: "Niterói",
    uf: "RJ",
    cep: "24210-320",
  },
  /** O ponto do mapa do bairro (Rua Presidente Domiciano; conferido no OpenStreetMap em 08/10). */
  ponto: { latitude: -22.9052, longitude: -43.1312 },
  prazoDeResposta: "Resposta em até 30 minutos, no horário de funcionamento.",
  acao: {
    rotulo: "Pedir avaliação pelo WhatsApp",
    curto: "Pedir avaliação",
    mensagem: "Olá. Gostaria de marcar uma avaliação.",
  },
  telefone: { rotulo: "A recepção atende no" },
  /** Para o leitor de tela, em todo vínculo que abre outra aba. */
  novaAba: ", abre em nova aba",
} as const;

/** As legendas do mapa dos dentes (components/demos/odontologia/mapa-dos-dentes.tsx), passadas também às ilhas. */
export const mapa = {
  legendas: { superior: "arcada superior", inferior: "arcada inferior" },
  numeracao: "FDI 11–48",
};

export const paginas: readonly PaginaDaClinica[] = [
  {
    id: "inicio",
    caminho: raiz,
    rotulo: "Início",
    titulo: "Odontologia Boa Viagem",
    descricao: "Clínica odontológica na Boa Viagem, em Niterói. A primeira consulta é só avaliação; cada tratamento sai com as sessões por escrito.",
  },
  {
    id: "tratamentos",
    caminho: `${raiz}/tratamentos`,
    rotulo: "Tratamentos",
    titulo: "Tratamentos e plano de sessões",
    descricao: "Seis tratamentos, com sessões, intervalos e cuidados, abertos pelo mapa dos dentes. Sem valores: a norma do conselho os veda.",
    naBarra: true,
  },
  {
    id: "limpeza",
    caminho: `${raiz}/tratamentos/limpeza`,
    rotulo: "Limpeza",
    titulo: "Limpeza e orientação de higiene",
    descricao: "Limpeza em 1 sessão de 45 minutos: remoção da placa e do tártaro, polimento e orientação de higiene.",
    pai: "tratamentos",
  },
  {
    id: "restauracao",
    caminho: `${raiz}/tratamentos/restauracao`,
    rotulo: "Restauração",
    titulo: "Restauração",
    descricao: "Restauração em 1 sessão de 50 minutos por dente: remoção do tecido comprometido, reconstrução e ajuste da mordida.",
    pai: "tratamentos",
  },
  {
    id: "canal",
    caminho: `${raiz}/tratamentos/canal`,
    rotulo: "Tratamento de canal",
    titulo: "Tratamento de canal",
    descricao: "Tratamento de canal em 2 sessões de 60 minutos, com 7 dias de intervalo, com o Especialista em Endodontia da clínica.",
    pai: "tratamentos",
  },
  {
    id: "clareamento",
    caminho: `${raiz}/tratamentos/clareamento`,
    rotulo: "Clareamento",
    titulo: "Clareamento supervisionado",
    descricao: "Clareamento supervisionado em 3 consultas de 30 minutos, com 14 dias de uso em casa antes da revisão.",
    pai: "tratamentos",
  },
  {
    id: "coroa",
    caminho: `${raiz}/tratamentos/coroa`,
    rotulo: "Coroa",
    titulo: "Coroa",
    descricao: "Coroa em 3 sessões: preparo e moldagem, prova 14 dias depois e cimentação 7 dias depois da prova.",
    pai: "tratamentos",
  },
  {
    id: "aparelho",
    caminho: `${raiz}/tratamentos/aparelho`,
    rotulo: "Aparelho ortodôntico",
    titulo: "Aparelho ortodôntico fixo",
    descricao: "Aparelho ortodôntico fixo: instalação em 1 sessão de 60 minutos e manutenção a cada 30 dias, com a Especialista em Ortodontia.",
    pai: "tratamentos",
  },
  {
    id: "avaliacao",
    caminho: `${raiz}/avaliacao`,
    rotulo: "Avaliação",
    titulo: "Pedir uma avaliação",
    descricao: "O atendimento e, se quiser, a região da boca: a mensagem sai pronta para o WhatsApp, e nada é gravado.",
    naBarra: true,
  },
  {
    id: "equipe",
    caminho: `${raiz}/equipe`,
    rotulo: "Equipe",
    titulo: "A equipe e a clínica",
    descricao: "Três cirurgiões-dentistas inscritos no CRO-RJ, a relação dos especialistas e dos clínicos gerais, e a clínica.",
    naBarra: true,
  },
  {
    id: "guias",
    caminho: `${raiz}/guias`,
    rotulo: "Guias",
    // Não "Antes e depois da consulta": num site de odontologia, a expressão se confunde com a das imagens que a
    // norma veda (Código de Ética Odontológica, art. 44, I e XII); o verificador de termos a acusou.
    titulo: "A consulta, os cuidados e as perguntas",
    descricao: "O que levar à avaliação, os cuidados depois de cada tratamento e as perguntas comuns.",
    naBarra: true,
  },
  {
    id: "onde",
    caminho: `${raiz}/onde`,
    rotulo: "Onde",
    titulo: "Onde fica e quando abre",
    descricao: "Rua Presidente Domiciano, na Boa Viagem, em Niterói: o horário de cada dia, o acesso e o contato.",
    naBarra: true,
  },
  {
    id: "privacidade",
    caminho: `${raiz}/privacidade`,
    rotulo: "Aviso de privacidade",
    titulo: "Aviso de privacidade",
    descricao: "O que este site guarda e o que não guarda: nenhum cookie, nenhum rastreador, nenhum formulário.",
    legal: true,
  },
  {
    id: "acessibilidade",
    caminho: `${raiz}/acessibilidade`,
    rotulo: "Acessibilidade",
    titulo: "Acessibilidade",
    descricao: "O padrão de acessibilidade que o site segue, o que foi verificado e como relatar uma barreira.",
    legal: true,
  },
];

/** O expediente (briefing, seção 3). Duas faixas no dia: a clínica fecha para o almoço. */
export const expediente: Expediente = {
  0: [],
  1: [{ abre: "08:00", fecha: "12:00" }, { abre: "13:30", fecha: "18:00" }],
  2: [{ abre: "08:00", fecha: "12:00" }, { abre: "13:30", fecha: "18:00" }],
  3: [{ abre: "08:00", fecha: "12:00" }, { abre: "13:30", fecha: "18:00" }],
  4: [{ abre: "08:00", fecha: "12:00" }, { abre: "13:30", fecha: "18:00" }],
  5: [{ abre: "08:00", fecha: "12:00" }, { abre: "13:30", fecha: "17:00" }],
  6: [{ abre: "08:00", fecha: "12:00" }],
};

/** A urgência: o encaixe no mesmo dia, de segunda a sexta, para quem avisar até as 16h (briefing, seção 12). */
export const urgencia: Urgencia = { dias: [1, 2, 3, 4, 5] as readonly Dia[], ate: "16:00" };

/**
 * "Feriados: fechado" (briefing, seção 3): os feriados nacionais que restam de 2026 e os de 2027. Mantê-los
 * é tarefa da manutenção: sem eles, o estado ao vivo diria "aberto agora" num feriado. Num cliente, entram também os
 * estaduais e os de Niterói.
 */
export const fechamentos: readonly Fechamento[] = feriadosNacionais;

/** As quatro regiões do mapa (nicho, seção 5.1): o nome é o que o leitor de tela lê em cada controle. */
export const regioes: readonly { id: RegiaoId; nome: string; curto: string; frase: string }[] = [
  { id: "frente-superior", nome: "Dentes da frente, arcada superior", curto: "Frente, em cima", frase: "dentes da frente, arcada superior" },
  { id: "fundo-superior", nome: "Dentes do fundo, arcada superior", curto: "Fundo, em cima", frase: "dentes do fundo, arcada superior" },
  { id: "frente-inferior", nome: "Dentes da frente, arcada inferior", curto: "Frente, embaixo", frase: "dentes da frente, arcada inferior" },
  { id: "fundo-inferior", nome: "Dentes do fundo, arcada inferior", curto: "Fundo, embaixo", frase: "dentes do fundo, arcada inferior" },
];

/** Uma etapa do tratamento: a sessão, a duração, o que se faz e o tempo até a seguinte. */
/**
 * Uma sessão do tratamento. dias: o intervalo até a próxima, em número (o mesmo de `depois`), para a linha do tempo da
 * página do tratamento; ciclo: a sessão que se repete, a cada tantos dias (as manutenções do aparelho).
 */
export type Etapa = { nome: string; minutos: number; faz: string; depois?: string; dias?: number; ciclo?: number };

export type Tratamento = {
  id: IdDoTratamento;
  nome: string;
  /** O que é, numa frase (briefing, seção 12). */
  umaFrase: string;
  /** O título da página do tratamento, com a palavra-chave na frente. */
  titulo: string;
  /** O número grande do cartão de retorno e a palavra que o acompanha. */
  numero: string;
  unidade: string;
  sessoes: string;
  /** O intervalo, em poucas palavras; vazio quando não há. */
  intervalo: string;
  regioes: readonly RegiaoId[];
  etapas: readonly Etapa[];
  cuidados: string;
  quem: IdDoDentista;
  /** O atendimento que a mensagem do WhatsApp cita. */
  atendimento: string;
};

const TODAS: readonly RegiaoId[] = ["frente-superior", "fundo-superior", "frente-inferior", "fundo-inferior"];

export const tratamentos: readonly Tratamento[] = [
  {
    id: "limpeza",
    nome: "Limpeza e orientação de higiene",
    umaFrase: "Remove a placa e o tártaro e orienta a higiene do dia a dia.",
    titulo: "Limpeza e orientação de higiene: 1 sessão de 45 minutos",
    numero: "1",
    unidade: "sessão",
    sessoes: "1 sessão",
    intervalo: "",
    regioes: TODAS,
    etapas: [
      {
        nome: "Sessão única",
        minutos: 45,
        faz: "Remoção da placa e do tártaro, polimento e orientação de escovação e de uso do fio dental. O retorno é combinado na própria sessão.",
      },
    ],
    cuidados: "Sensibilidade por algumas horas é possível; a higiene segue como de costume. Persistindo o desconforto, avisar a clínica.",
    quem: "beatriz",
    atendimento: "limpeza e orientação de higiene",
  },
  {
    id: "restauracao",
    nome: "Restauração",
    umaFrase: "Repõe a parte do dente que se perdeu.",
    titulo: "Restauração: 1 sessão de 50 minutos por dente",
    numero: "1",
    unidade: "sessão por dente",
    sessoes: "1 sessão por dente",
    intervalo: "",
    regioes: TODAS,
    etapas: [
      {
        nome: "Sessão por dente",
        minutos: 50,
        faz: "Anestesia local, quando necessária; remoção do tecido comprometido; reconstrução do dente; ajuste da mordida e polimento. Com mais de um dente, a sessão seguinte é marcada na mesma consulta.",
      },
    ],
    cuidados:
      "Com anestesia, esperar o efeito passar antes de mastigar, para não ferir o lábio nem a bochecha. Sensibilidade leve nos primeiros dias é possível; avisar se persistir ou se a mordida parecer alta.",
    quem: "beatriz",
    atendimento: "restauração",
  },
  {
    id: "canal",
    nome: "Tratamento de canal",
    umaFrase: "Trata o interior do dente quando a polpa está comprometida.",
    titulo: "Tratamento de canal: 2 sessões, com 7 dias de intervalo",
    numero: "2",
    unidade: "sessões",
    sessoes: "2 sessões",
    intervalo: "7 dias",
    regioes: TODAS,
    etapas: [
      { nome: "Sessão 1", minutos: 60, faz: "Abertura do dente, limpeza e modelagem dos canais e medicação provisória.", depois: "7 dias depois", dias: 7 },
      { nome: "Sessão 2", minutos: 60, faz: "Preenchimento dos canais e selamento. A restauração definitiva é marcada ao fim desta sessão." },
    ],
    cuidados:
      "Evitar mastigar do lado tratado até a restauração definitiva. Desconforto leve pode ocorrer; se aumentar, ou se houver inchaço, contatar a clínica no mesmo dia.",
    quem: "caio",
    atendimento: "tratamento de canal",
  },
  {
    id: "clareamento",
    nome: "Clareamento supervisionado",
    umaFrase: "Clareia a cor dos dentes, com acompanhamento do dentista.",
    titulo: "Clareamento supervisionado: 3 consultas de 30 minutos",
    numero: "3",
    unidade: "consultas",
    sessoes: "3 consultas",
    intervalo: "7 dias, e 14 de uso em casa",
    regioes: ["frente-superior", "frente-inferior"],
    etapas: [
      { nome: "Consulta 1", minutos: 30, faz: "Exame do dente e moldagem.", depois: "7 dias depois", dias: 7 },
      { nome: "Consulta 2", minutos: 30, faz: "Entrega da moldeira e orientação de uso em casa.", depois: "14 dias de uso em casa, depois", dias: 14 },
      { nome: "Consulta 3", minutos: 30, faz: "Revisão do clareamento." },
    ],
    cuidados:
      "Durante o uso, evitar café, chá-preto, vinho tinto e outros alimentos e bebidas de cor forte. Sensibilidade pode ocorrer; avisar o dentista, que ajusta o uso.",
    quem: "beatriz",
    atendimento: "clareamento supervisionado",
  },
  {
    id: "coroa",
    nome: "Coroa",
    umaFrase: "Recobre o dente que perdeu muita estrutura e precisa de proteção.",
    titulo: "Coroa: 3 sessões, com 14 e 7 dias de intervalo",
    numero: "3",
    unidade: "sessões",
    sessoes: "3 sessões",
    intervalo: "14 e 7 dias",
    regioes: TODAS,
    etapas: [
      { nome: "Sessão 1", minutos: 60, faz: "Preparo do dente, moldagem e coroa provisória.", depois: "14 dias depois", dias: 14 },
      { nome: "Sessão 2", minutos: 30, faz: "Prova da coroa.", depois: "7 dias depois", dias: 7 },
      { nome: "Sessão 3", minutos: 30, faz: "Cimentação e ajuste da mordida." },
    ],
    cuidados: "Com a coroa provisória, evitar alimentos duros e pegajosos. Depois da cimentação, a higiene inclui o fio dental ao redor do dente.",
    quem: "beatriz",
    atendimento: "coroa",
  },
  {
    id: "aparelho",
    nome: "Aparelho ortodôntico fixo",
    umaFrase: "Alinha os dentes com um aparelho fixo, ajustado todo mês.",
    titulo: "Aparelho ortodôntico fixo: instalação e manutenção a cada 30 dias",
    numero: "30",
    unidade: "dias entre as manutenções",
    sessoes: "1 instalação e manutenções",
    intervalo: "30 dias",
    regioes: TODAS,
    etapas: [
      { nome: "Instalação", minutos: 60, faz: "Instalação do aparelho fixo, em 1 sessão.", depois: "30 dias depois", dias: 30 },
      {
        nome: "Manutenção",
        minutos: 30,
        ciclo: 30,
        faz: "Ajuste do aparelho, a cada 30 dias. Ao final, retirada do aparelho e contenção. O tempo total sai da avaliação e consta do plano por escrito.",
      },
    ],
    cuidados:
      "Higiene com escova interdental e fio próprio para aparelho; evitar alimentos duros e pegajosos; se uma peça soltar, contatar a clínica.",
    quem: "helena",
    atendimento: "aparelho ortodôntico fixo",
  },
];

export const tratamentoDe = (id: IdDoTratamento) => tratamentos.find((t) => t.id === id)!;

export type Dentista = {
  id: IdDoDentista;
  nome: string;
  /** Com o artigo: "a Dra. Beatriz da Silva". Escrito, e não deduzido do prefixo. */
  comArtigo: string;
  profissao: string;
  cro: string;
  /** "Clínica geral" (art. 43, § 1º, VI) ou "Especialista em X", só com o título registrado. */
  titulo: string;
  /** O título no meio da frase: "clínica geral"; o de especialista não muda. */
  tituloNaFrase: string;
  funcao?: string;
  formacao: string;
  atende: readonly IdDoTratamento[];
};

export const equipe: readonly Dentista[] = [
  {
    id: "beatriz",
    nome: "Dra. Beatriz da Silva",
    comArtigo: "a Dra. Beatriz da Silva",
    profissao: "Cirurgiã-dentista",
    cro: "CRO-RJ 00000",
    titulo: "Clínica geral",
    tituloNaFrase: "clínica geral",
    funcao: "Responsável técnica",
    formacao: "Graduação em Odontologia.",
    atende: ["limpeza", "restauracao", "clareamento", "coroa"],
  },
  {
    id: "caio",
    nome: "Dr. Caio da Silva",
    comArtigo: "o Dr. Caio da Silva",
    profissao: "Cirurgião-dentista",
    cro: "CRO-RJ 00000",
    titulo: "Especialista em Endodontia",
    tituloNaFrase: "Especialista em Endodontia",
    formacao: "Graduação em Odontologia e especialização em Endodontia.",
    atende: ["canal"],
  },
  {
    id: "helena",
    nome: "Dra. Helena da Silva",
    comArtigo: "a Dra. Helena da Silva",
    profissao: "Cirurgiã-dentista",
    cro: "CRO-RJ 00000",
    titulo: "Especialista em Ortodontia",
    tituloNaFrase: "Especialista em Ortodontia",
    formacao: "Graduação em Odontologia e especialização em Ortodontia.",
    atende: ["aparelho"],
  },
];

export const dentistaDe = (id: IdDoDentista) => equipe.find((d) => d.id === id)!;

/** O atendimento do pedido de avaliação: uma lista de atendimentos, nunca de sintomas (nicho, seção 5.1). */
export const atendimentos: readonly { id: string; rotulo: string; frase: string }[] = [
  { id: "rotina", rotulo: "Avaliação de rotina", frase: "avaliação de rotina" },
  { id: "urgencia", rotulo: "Urgência (encaixe no mesmo dia)", frase: "urgência" },
  { id: "limpeza", rotulo: "Limpeza", frase: "limpeza" },
  { id: "estetica", rotulo: "Estética dos dentes (clareamento)", frase: "estética dos dentes" },
  { id: "ortodontia", rotulo: "Aparelho ortodôntico", frase: "aparelho ortodôntico" },
  { id: "continuar", rotulo: "Continuar um tratamento iniciado", frase: "continuar um tratamento iniciado" },
  { id: "outro", rotulo: "Outro", frase: "outro" },
];
export const ultimasVisitas: readonly { id: string; rotulo: string }[] = [
  { id: "menos-6-meses", rotulo: "Há menos de 6 meses" },
  { id: "6-meses-1-ano", rotulo: "De 6 meses a 1 ano" },
  { id: "mais-1-ano", rotulo: "Há mais de 1 ano" },
  { id: "nao-lembro", rotulo: "Não lembro" },
];
export const periodos: readonly { id: string; rotulo: string }[] = [
  { id: "manha", rotulo: "Manhã" },
  { id: "tarde", rotulo: "Tarde" },
  { id: "sem-preferencia", rotulo: "Sem preferência" },
];

/** A frase que a norma pede, onde o visitante procura preço (Código de Ética Odontológica, art. 44, I). */
export const avisoDeValores = "Esta página não divulga valores, porque a norma do conselho o veda.";
/** A ressalva de toda sequência de sessões (nicho, seção 5.2). */
export const ressalvaDasSessoes = "Sequência de referência, não orçamento. O número de sessões de cada caso sai do exame clínico e consta do plano entregue por escrito.";

/** A barra (components/ilhas/demos/odontologia/barra-da-clinica.tsx). */
export const barra = {
  navegacao: "Páginas da clínica",
  registroCurto: "Clínica odontológica",
  rt: "Resp. técnica",
  /** No celular (o passe de 14.10.2026), as abas vão para o índice do prontuário, aberto em tela cheia. */
  indice: "Páginas",
  fechar: "Fechar",
};

export const capa = {
  /** O título da capa: o lugar, em corpo de texto, e a frase, em exibição (o h1 é os dois). */
  titulo: { lugar: "Odontologia na Boa Viagem", frase: "Primeiro a avaliação, depois o tratamento." },
  lide: "Na primeira consulta, o dentista examina e conversa. O tratamento começa depois, com o número de sessões combinado por escrito.",
  /** O cabeçalho da folha do mapa, no palco do percurso. */
  folha: { titulo: "A ficha da clínica" },
};

/**
 * "Percorra a boca": a cena da capa ligada à rolagem (decisão do usuário de 08/10: no Completo, as animações de
 * rolagem "como em muitos sites da Apple e do Awwwards"). A ficha fica presa ao lado; o texto desce em quatro passos,
 * um por região, e o lápis circula a região do passo. Os tratamentos de cada região saem dos dados (`tratamentos`).
 */
export const percurso = {
  titulo: "Percorra a boca, região por região",
  lide: "Cada região da boca tem os tratamentos que a alcançam. O número de sessões de cada um está na página dele.",
  /** A nota de cada passo diz só o que a contagem ("6 tratamentos.") não diz. */
  passos: {
    "frente-superior": { titulo: "Os dentes da frente, em cima", nota: "Inclusive o clareamento, que só trata os dentes da frente." },
    "fundo-superior": { titulo: "Os dentes do fundo, em cima", nota: "O clareamento não chega ao fundo." },
    "frente-inferior": { titulo: "Os dentes da frente, embaixo", nota: "Os mesmos da arcada de cima." },
    "fundo-inferior": { titulo: "Os dentes do fundo, embaixo", nota: "Os mesmos do fundo da arcada de cima." },
  },
  contagem: (n: number) => (n === 1 ? "1 tratamento" : `${n} tratamentos`),
  fim: "Abrir o plano de sessões",
  descricaoDoMapa: "O mapa dos dentes: as duas arcadas, vistas de cima, com a numeração de cada dente.",
};

/**
 * A ficha de tratamentos da página inicial (identidade, seção 9, cena 3): uma linha por tratamento, com a região da
 * boca (o nome e os dentes, na numeração FDI, tirados do mapa), as sessões e o intervalo. Sob o ponteiro, a região
 * acende na arcada da margem.
 */
export const ficha = {
  titulo: "Tratamentos",
  lide: "Cada linha é um tratamento e a região da boca que ele alcança, que acende na placa.",
  /** No toque, sem o ponteiro que acende a placa: a região já vem marcada no mapa pequeno de cada linha. */
  lideNoToque: "Cada linha é um tratamento e a região da boca que ele alcança, marcada a lápis no mapa.",
  colunas: { tratamento: "Tratamento", onde: "Onde", sessoes: "Sessões", intervalo: "Intervalo" },
  todas: "A boca inteira",
  semIntervalo: "Sem intervalo",
  ver: "Abrir o plano de sessões",
  rotuloDaMiniatura: "A região do tratamento no mapa dos dentes",
};

export const cartoesDeRetorno = {
  titulo: "O tempo, no lugar do preço",
  lide: "O número de sessões e o intervalo entre elas, antes da consulta. O tempo ocupa o lugar do preço, que a norma do conselho veda.",
  rotuloDaFila: "Cartões de retorno dos seis tratamentos",
  setas: { anterior: "Cartão anterior", proximo: "Próximo cartão" },
  abrir: "Ver o tratamento",
  /** O que vem impresso no alto de cada cartão de retorno (decorativo). */
  impresso: "Cartão de retorno",
  semIntervalo: "Sem intervalo: uma sessão",
};

export const quemAtende = {
  titulo: "Quem atende",
  ver: "A equipe e a clínica",
};

export const ausencias = {
  titulo: "O que não se faz aqui",
  itens: [
    { fato: "Nenhum valor neste site.", motivo: "A norma do conselho veda o preço na publicidade odontológica. Os valores se tratam depois do exame." },
    { fato: "Nenhum procedimento na primeira consulta.", motivo: "A avaliação serve para examinar e planejar; o tratamento vem depois, com o plano por escrito." },
    { fato: "Nenhuma foto de antes e depois, nem de paciente.", motivo: "A norma restringe essas imagens, e a clínica não as publica." },
    { fato: "Nenhuma dúvida clínica respondida por mensagem.", motivo: "O diagnóstico sai do exame; a mensagem serve para marcar." },
  ],
};

export const quandoEOnde = {
  titulo: "Quando e onde",
  placa: "Horário",
  feriados: "Feriados: fechado.",
  /** O estado sem script e antes da hidratação: uma linha, como a do estado ao vivo (sem salto de leiaute). */
  estadoSemScript: "De segunda a sábado, a partir das 8h.",
  /** A urgência sem script (a ilha a troca pela do dia, no relógio de Niterói). */
  urgenciaSemScript: "Com dor: de segunda a sexta, quem avisa até as 16h é atendido no mesmo dia.",
  endereco: "Endereço",
  copiar: "Copiar o endereço",
  verNoMapa: "Traçar a rota até a clínica",
  comoChegar: "A rua, o acesso e a rota",
  credito: "Dados do mapa: © colaboradores do OpenStreetMap.",
};

export const chamada = {
  titulo: "A avaliação dura 40 minutos.",
  texto: "Não executa procedimento: é a conversa, o exame e o plano por escrito, com o número de sessões e o intervalo entre elas.",
};

/** A porta da clínica (cena 6): quem atende, quando e onde, nas placas de cerâmica e no bairro a lápis. */
export const porta = {
  titulo: "Quem atende, quando e onde",
  placas: "As placas da porta",
};

/** Tratamentos: o mapa dos dentes e o plano de sessões, a funcionalidade 2 do Completo (nicho, seção 5.2). */
export const tratamentosPagina = {
  lide: "Escolha uma região da boca para ver os tratamentos que a alcançam, com as sessões e os intervalos. É uma sequência de referência, não um orçamento.",
  mapa: {
    legenda: "Região da boca",
    cabeca: "Odontograma",
    todas: "Todas as regiões",
    ajuda: "O mapa mostra as duas arcadas, vistas de cima, com a numeração dos dentes. Escolha uma região pelo desenho ou pela lista.",
    descricao: "O mapa dos dentes: as duas arcadas, vistas de cima, com a numeração de cada dente.",
  },
  rotuloDaLista: "Tratamentos e sessões por região",
  contagem: "{n} de {total} tratamentos alcançam {regiao}.",
  todasContagem: "Os {total} tratamentos, em todas as regiões.",
  regioesTodas: "Todas as regiões.",
  regioesRotulo: "Regiões:",
  intervalo: "Intervalo:",
  semIntervalo: "Sem intervalo",
  encaminha: "Implante e cirurgia do siso: a clínica encaminha a outro profissional.",
  pedirComRegiao: "Pedir avaliação para esta região",
  escolher: "Escolher o atendimento e a região",
};

/** Uma página de tratamento: os rótulos; o resto vem de `tratamentos`. */
export const tratamentoPagina = {
  todos: "Todos os tratamentos",
  atende: (d: Dentista) => `Atende ${d.comArtigo}, ${d.tituloNaFrase}.`,
  sequencia: "Sessão a sessão",
  /** A linha do tempo: as sessões na régua dos dias (o resumo para o leitor de tela; o desenho é decorativo). */
  linha: {
    dia: (n: number) => `Dia ${n}`,
    dias: (n: number) => `${n} dias`,
    ciclo: (n: number) => `a cada ${n} dias`,
    resumo: (marcos: readonly { nome: string; dia: number }[], ciclo?: number) =>
      `Na régua dos dias: ${marcos.map((m) => `${m.nome.toLowerCase()} no dia ${m.dia}`).join("; ")}${ciclo ? `; depois, a cada ${ciclo} dias` : ""}.`,
  },
  minutos: (m: number) => `${m} min`,
  cuidados: "Cuidados depois",
  regiao: "Onde se aplica",
  emTodas: "Todas as regiões da boca.",
  mapaEmTodas: "Mapa dos dentes: o tratamento se aplica a todas as regiões.",
  mapaComRegioes: (onde: string) => `Mapa dos dentes, com as regiões do tratamento circuladas: ${onde}.`,
  quemAtende: "Quem atende",
  pedir: "Pedir avaliação para este caso",
  outros: "Outros tratamentos",
};

/** Pedir uma avaliação: a funcionalidade 1 do Completo (nicho, seção 5.1). */
export const avaliacaoPagina = {
  lide: "Escolha o atendimento e, se quiser, a região da boca. A mensagem sai pronta para o WhatsApp. Nada é gravado neste site.",
  atendimento: "Atendimento",
  atendimentoNota: "A lista oferece atendimentos, não sintomas. O que a pessoa quiser contar, conta na conversa.",
  regiao: "Região da boca (opcional)",
  todasAsRegioes: "Não informar",
  ultimaVisita: "Última visita ao dentista (opcional)",
  periodo: "Período de preferência (opcional)",
  semResposta: "Não informar",
  mensagem: "A mensagem",
  copiar: "Copiar a mensagem",
  enviar: "Abrir no WhatsApp",
  urgenciaNota: "Com dor, o encaixe é no mesmo dia, de segunda a sexta, para quem avisar até as 16h. A urgência controla a dor; o tratamento é combinado depois, em avaliação.",
  semScript: "Sem script, o botão abre a conversa com a mensagem curta; diga ali o atendimento e o período de preferência.",
  oQueAcontece: "O que acontece na avaliação",
};

/** A equipe e a clínica. */
export const equipePagina = {
  lide: "Três cirurgiões-dentistas inscritos no CRO-RJ. A especialidade só aparece com o título registrado no conselho.",
  formacao: "Formação",
  atende: "Atende",
  /** O clínico geral leva a área de atuação no lugar do "Atende" (art. 43, § 2º). */
  area: "Área de atuação",
  nota: "Pelo Código de Ética Odontológica (art. 43, § 2º): os especialistas, com o título registrado no CRO-RJ, e os clínicos gerais, com a área de atuação.",
  clinica: {
    titulo: "A clínica",
    itens: [
      { rotulo: "Estrutura", texto: "Três consultórios e uma sala de espera." },
      { rotulo: "Biossegurança", texto: "O instrumental é esterilizado em autoclave, em embalagem individual, aberta na frente do paciente." },
      { rotulo: "Acesso", texto: "A entrada é sem degrau, e os consultórios ficam no térreo." },
      { rotulo: "Estacionamento", texto: "A clínica não tem estacionamento próprio." },
    ],
  },
};

/** As guias do Completo: a consulta, os cuidados e as perguntas, sem consulta nem diagnóstico pela página (art. 44, V). */
export const guiasPagina = {
  lide: "O que levar à avaliação, os cuidados depois de cada tratamento e as perguntas mais comuns. Nada aqui substitui o exame.",
  avaliacao: "O que acontece na avaliação",
  passos: [
    "Conversa sobre o que o paciente observa.",
    "Exame clínico.",
    "Radiografia, quando o dentista a indica.",
    "Plano de tratamento por escrito, com o número de sessões e o intervalo entre elas.",
  ],
  duracao: "A avaliação dura 40 minutos e não executa procedimento.",
  levar: { titulo: "O que levar", texto: "O documento de identidade, as radiografias anteriores, se houver, e a lista dos medicamentos em uso." },
  cuidados: "Cuidados depois de cada tratamento",
  perguntas: {
    titulo: "Perguntas comuns",
    itens: [
      {
        pergunta: "A primeira consulta já inclui tratamento?",
        resposta: "Não. A avaliação reúne a conversa, o exame, a radiografia, quando indicada, e o plano por escrito. Nenhum procedimento é executado nesse dia.",
      },
      {
        pergunta: "Quantas sessões um tratamento leva?",
        resposta: "A página de cada tratamento traz a sequência de referência. O número de cada caso sai do exame clínico e consta do plano entregue por escrito.",
      },
      {
        pergunta: "E se houver dor?",
        resposta: "O encaixe é no mesmo dia, de segunda a sexta, para quem avisar até as 16h. A urgência controla a dor; o tratamento é combinado depois, em avaliação.",
      },
      {
        pergunta: "Por que o site não informa valores?",
        resposta: "A norma do conselho veda o preço na publicidade odontológica. Os valores são tratados presencialmente, depois do exame.",
      },
      {
        pergunta: "A clínica responde dúvida clínica por mensagem?",
        resposta: "Não. A mensagem serve para marcar a avaliação. A dúvida clínica se resolve no exame.",
      },
      {
        pergunta: "A clínica faz implante ou cirurgia do siso?",
        resposta: "Não. A clínica encaminha esses casos a outro profissional.",
      },
    ],
  },
};

/** Onde fica e quando abre. */
export const ondePagina = {
  lide: "Na Boa Viagem, em Niterói. A entrada é sem degrau, e os consultórios ficam no térreo.",
  horario: "Horário",
  contato: "Contato",
  acesso: "Acesso",
  acessoItens: ["Entrada sem degrau e consultórios no térreo.", "A clínica não tem estacionamento próprio."],
};

/** O rodapé (components/demos/odontologia/rodape.tsx). */
/** O pé do receituário (components/demos/odontologia/receituario.tsx): o que se imprime no pé do bloco da clínica. */
export const rodape = {
  paginas: "Páginas",
  tratamentos: "Tratamentos",
  contato: "Contato",
  oSite: "O site",
  whatsapp: "WhatsApp",
  horario: "Horário",
  assinatura: "A linha da assinatura da responsável técnica",
};

export type BlocoLegal = { titulo: string; paragrafos?: readonly string[]; itens?: readonly string[] };
export type TextoLegal = { abertura: readonly string[]; blocos: readonly BlocoLegal[]; data: string };

/**
 * O aviso de privacidade do site de demonstração, com os blocos [SEMPRE] do modelo
 * (producao/esteira/modelos/aviso-de-privacidade.md). Leitura de leigo, A CONFIRMAR com advogado antes de qualquer
 * cliente. Sem coleta, não há operador (producao/esteira/17-conformidade-e-normas.md, seção 2): o aviso não põe a
 * Atlas Digital nesse papel.
 */
export const avisoDePrivacidade: TextoLegal = {
  abertura: [
    "A Odontologia Boa Viagem é um estabelecimento fictício, criado pela Atlas Digital para demonstração.",
    "Nenhum dado pessoal de quem visita é coletado por este site.",
  ],
  blocos: [
    {
      titulo: "O que este site guarda no aparelho",
      paragrafos: [
        "Nada. O site não usa cookies nem ferramentas de analítica ou de publicidade, e nenhuma informação é gravada no navegador.",
        "Fontes, imagens e scripts saem do próprio endereço do site, sem contato com servidores de terceiros.",
      ],
    },
    {
      titulo: "Registros de acesso",
      paragrafos: [
        "O serviço de hospedagem registra automaticamente cada acesso: o endereço IP, a data e a hora, a página pedida e o navegador.",
        "Esses registros servem à segurança e ao funcionamento do site (LGPD, art. 7º, IX: legítimo interesse), e a hospedagem os guarda pelo prazo dela.",
      ],
    },
    {
      titulo: "O pedido de avaliação e o WhatsApp",
      paragrafos: [
        "A página de avaliação monta a mensagem no próprio aparelho, a partir das opções escolhidas. A mensagem só sai quando se toca no botão do WhatsApp, e nada é enviado a este site.",
        "A lista oferece atendimentos e regiões da boca, nunca sintomas. A conversa acontece no aplicativo, sob os termos dele.",
      ],
    },
    {
      titulo: "Com quem algum dado é compartilhado",
      paragrafos: ["Com ninguém. A hospedagem do site é da Hostinger International Ltd., que guarda os registros de acesso descritos acima."],
    },
    {
      titulo: "Direitos e contato",
      paragrafos: [
        "A LGPD (art. 18) garante a confirmação de que há tratamento, o acesso, a correção, a eliminação e a informação sobre o compartilhamento.",
        "Num site real, o pedido vai ao canal de privacidade da clínica. Neste, fictício, não há dado a pedir.",
      ],
    },
    {
      titulo: "Segurança e mudanças neste aviso",
      paragrafos: ["O site usa conexão cifrada (HTTPS). Se passar a tratar dados de outra forma, este aviso muda antes, com a nova data."],
    },
  ],
  data: "08.10.2026",
};

/**
 * A declaração de acessibilidade (producao/esteira/modelos/declaracao-de-acessibilidade.md): só o que foi medido, com
 * a data. Os itens verificados correspondem à verificação de 08.10.2026 (registros/demos/odontologia/relatorio-de-qa).
 */
export const declaracaoDeAcessibilidade: TextoLegal = {
  abertura: [
    "Este site quer poder ser usado por qualquer pessoa.",
    "Inclusive por quem usa leitor de tela ou só o teclado.",
    "E por quem amplia o texto ou prefere menos movimento.",
  ],
  blocos: [
    {
      titulo: "O padrão seguido",
      paragrafos: [
        "O site segue as Diretrizes de Acessibilidade para Conteúdo Web (WCAG) 2.2, no nível AA.",
        "É o padrão do Atlas para a Lei Brasileira de Inclusão (Lei 13.146/2015, art. 63).",
      ],
    },
    {
      titulo: "O que foi verificado em 08.10.2026",
      itens: [
        "o contraste do texto com o fundo, medido na tela de 320 a 1920 px;",
        "a navegação pelo teclado, com o foco sempre visível;",
        "o mapa dos dentes e o pedido de avaliação, que se usam só pelo teclado;",
        "os alvos de toque, de pelo menos 44 px;",
        "o site sem JavaScript e com movimento reduzido.",
      ],
    },
    {
      titulo: "Limitações conhecidas",
      itens: [
        "ninguém leu o site com leitor de tela ainda;",
        "o mapa dos dentes é desenho: a região se escolhe pelos botões.",
      ],
    },
    {
      titulo: "Encontrou uma barreira?",
      paragrafos: ["Num site real, a mensagem vai ao WhatsApp da clínica.", "Este site é de demonstração."],
    },
  ],
  data: "08.10.2026",
};

export const legal = {
  data: (d: string) => `Atualizado em ${d}.`,
};

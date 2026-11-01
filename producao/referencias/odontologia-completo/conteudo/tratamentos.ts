// conteudo/tratamentos.ts — os seis tratamentos, as quatro regiões do mapa dos dentes e os atendimentos do pedido de
// avaliação (producao/esteira/nichos/odontologia.md, seções 4 e 5). Tudo sai do briefing.md, seção 12: o número de
// sessões, os intervalos, o que se faz em cada sessão e os cuidados são "da casa" fictícia e dependem de revisão de
// um dentista antes de qualquer uso real (nicho, seção 10). Nenhum preço, nenhuma promessa, nenhum diagnóstico.

export type RegiaoId = "frente-superior" | "fundo-superior" | "frente-inferior" | "fundo-inferior";

/** As quatro regiões (nicho, seção 5.1): o nome é o que o leitor de tela lê em cada controle. */
export const regioes: readonly { id: RegiaoId; nome: string; frase: string }[] = [
  { id: "frente-superior", nome: "Dentes da frente, arcada superior", frase: "dentes da frente, arcada superior" },
  { id: "fundo-superior", nome: "Dentes do fundo, arcada superior", frase: "dentes do fundo, arcada superior" },
  { id: "frente-inferior", nome: "Dentes da frente, arcada inferior", frase: "dentes da frente, arcada inferior" },
  { id: "fundo-inferior", nome: "Dentes do fundo, arcada inferior", frase: "dentes do fundo, arcada inferior" },
];

export type IdDoTratamento = "limpeza" | "restauracao" | "canal" | "clareamento" | "coroa" | "aparelho";
export type IdDoDentista = "beatriz" | "caio" | "helena";

/** Uma etapa: a sessão (ou a consulta), a duração, o que se faz e, se houver, o tempo até a etapa seguinte. */
export type Etapa = { nome: string; minutos: number; faz: string; depois?: string };

export type Tratamento = {
  id: IdDoTratamento;
  /** O nome da casa, como no menu e na tabela. */
  nome: string;
  /** O que é, em uma frase (briefing, seção 12). */
  umaFrase: string;
  /** O título da página, com a palavra-chave na frente. */
  titulo: string;
  /** Quantas sessões, em poucas palavras. */
  sessoes: string;
  /** O intervalo entre elas, em poucas palavras; "—" quando não há. */
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
    sessoes: "1 sessão",
    intervalo: "—",
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
    sessoes: "1 sessão por dente",
    intervalo: "—",
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
    sessoes: "2 sessões",
    intervalo: "7 dias",
    regioes: TODAS,
    etapas: [
      { nome: "Sessão 1", minutos: 60, faz: "Abertura do dente, limpeza e modelagem dos canais e medicação provisória.", depois: "7 dias depois" },
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
    sessoes: "3 consultas",
    intervalo: "7 dias, e 14 de uso em casa",
    regioes: ["frente-superior", "frente-inferior"],
    etapas: [
      { nome: "Consulta 1", minutos: 30, faz: "Exame do dente e moldagem.", depois: "7 dias depois" },
      { nome: "Consulta 2", minutos: 30, faz: "Entrega da moldeira e orientação de uso em casa.", depois: "14 dias de uso em casa, depois" },
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
    sessoes: "3 sessões",
    intervalo: "14 e 7 dias",
    regioes: TODAS,
    etapas: [
      { nome: "Sessão 1", minutos: 60, faz: "Preparo do dente, moldagem e coroa provisória.", depois: "14 dias depois" },
      { nome: "Sessão 2", minutos: 30, faz: "Prova da coroa.", depois: "7 dias depois" },
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
    sessoes: "1 instalação e manutenções",
    intervalo: "30 dias",
    regioes: TODAS,
    etapas: [
      { nome: "Instalação", minutos: 60, faz: "Instalação do aparelho fixo, em 1 sessão.", depois: "30 dias depois" },
      {
        nome: "Manutenção",
        minutos: 30,
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

/** O atendimento do pedido de avaliação: a lista é de atendimentos, nunca de sintomas (nicho, seção 5.1). */
export type Atendimento = { id: string; rotulo: string; frase: string };

export const atendimentos: readonly Atendimento[] = [
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

// Nutrição Icaraí: o site do plano Essencial no simulador de planos (seção
// da escada, components/secoes/escada.tsx). Três páginas, o limite do
// plano. Direção C · Escala, vestida de impresso: a página é uma folha —
// papel, tinta verde, serifas (Fraunces nos títulos, Newsreader no
// texto), sumário com pontilhado, entrevista em P. e R., nota de rodapé e
// colofão. Conteúdo do demo de nutrição (demos/producao/nicho_nutricao.py),
// pela regra mais estrita das duas normas do conselho — CFN 599/2018, em
// vigor, e CFN 856/2026, a partir de 23.01.2027: sem depoimento, sem antes
// e depois, sem promessa de resultado; preço declarado, sem lógica
// promocional; CRN no topo e no rodapé. O plano Essencial não tem
// funcionalidade sob medida: o agendamento é pelo WhatsApp. Estabelecimento
// fictício ("da Silva", CRN 00000, número 000).

export const nutricaoSite = {
  caminho: "/demos/nutricao",
  nome: "Nutrição Icaraí",
  profissional: "Maria da Silva",
  credencial: "Nutricionista, CRN4 00000",
  endereco: "Rua Gavião Peixoto, 000, sala 000",
  bairro: "Icaraí, Niterói",
  linhaDoTopo: "Icaraí, Niterói · presencial ou por vídeo",
  /** As três páginas, na ordem do índice. */
  paginas: [
    {
      id: "inicio",
      caminho: "/demos/nutricao",
      numero: "I",
      rotulo: "A consulta",
      titulo: "A consulta",
      descricao: "Consulta de nutrição em Icaraí, presencial ou por vídeo: plano alimentar a partir da rotina. Site de demonstração do plano Essencial.",
    },
    {
      id: "valores",
      caminho: "/demos/nutricao/valores",
      numero: "II",
      rotulo: "Valores",
      titulo: "Valores e perguntas",
      descricao: "Os valores da primeira consulta, do retorno e do acompanhamento, publicados, e as perguntas mais frequentes.",
    },
    {
      id: "consultorio",
      caminho: "/demos/nutricao/consultorio",
      numero: "III",
      rotulo: "Consultório",
      titulo: "O consultório",
      descricao: "Endereço, horário e mapa do consultório, a duas quadras do Campo de São Bento.",
    },
  ],
  acao: "Agendar pelo WhatsApp",
  mensagem: "Olá. Gostaria de agendar uma consulta.",

  // ---------- I · A consulta ----------
  capa: {
    rotulo: "Nutrição clínica · Icaraí, Niterói",
    titulo: ["Comer bem.", "Sem se tornar", "outra pessoa."],
    lide: "Plano alimentar elaborado a partir da rotina de cada pessoa, com substituições previstas para cada refeição, e não uma lista de proibições.",
    secundaria: "Ver os valores",
    nota: "Presencial em Icaraí ou por vídeo, com a mesma duração.",
  },
  /** O índice das seções da primeira página, na margem da capa. */
  nestaPagina: [
    { id: "sumario", rotulo: "Sumário da consulta" },
    { id: "metodo", rotulo: "Da consulta ao hábito" },
    { id: "nota", rotulo: "Nota sobre este site" },
  ],
  /** O sumário: os números da oferta, com pontilhado até o valor. */
  sumario: {
    titulo: "Sumário da consulta",
    itens: [
      { rotulo: "Primeira consulta: história alimentar, rotina e horários", valor: "60", unidade: "min" },
      { rotulo: "Plano por escrito, em PDF, com as substituições", valor: "2", unidade: "dias úteis" },
      { rotulo: "Retorno sugerido, sem prazo mínimo nem pacote", valor: "30", unidade: "dias" },
      { rotulo: "Listas de proibições: o plano prevê trocas", valor: "0", unidade: "" },
    ],
  },
  metodo: {
    titulo: ["Da primeira consulta", "ao hábito."],
    // A palavra que o marca-texto marca (Spell UI, Highlighted Text, variante marca-texto; desde 03/10).
    destaque: "hábito",
    etapas: [
      {
        nome: "Primeira consulta",
        texto: "História alimentar, rotina, horários de trabalho e o que já foi tentado antes. Nada é prescrito antes de ouvir.",
        nota: "Exames recentes ajudam; não são exigidos.",
      },
      {
        nome: "O plano por escrito",
        texto: "Escrito a partir da rotina relatada na consulta, refeição por refeição, com o que se encontra no mercado do bairro.",
        nota: "Enviado pelo WhatsApp.",
      },
      {
        nome: "Retorno",
        texto: "O plano é ajustado conforme o que a rotina comportou: o que funcionou fica, o que não coube é trocado.",
        nota: "Quarenta minutos.",
      },
      {
        nome: "Continuidade",
        texto: "Decidida a cada consulta, pela pessoa atendida.",
        nota: "Sem fidelidade.",
      },
    ],
  },
  ausencia: {
    titulo: "Nota sobre este site",
    texto: "Este site não exibe depoimento, avaliação, resultado de paciente nem fotografia de antes e depois.",
    norma:
      "O Código de Ética e de Conduta do Nutricionista (Resolução CFN 599/2018) veda esse tipo de divulgação. A partir de 23 de janeiro de 2027, a Resolução CFN 856/2026 estende a vedação a exames, composição corporal e imagens geradas por inteligência artificial. A ausência é deliberada.",
  },
  fecho: {
    titulo: "A primeira consulta é marcada por mensagem.",
    texto: "A resposta informa os horários livres da semana. Nenhum dado é pedido antes disso.",
  },

  // ---------- II · Valores ----------
  consultas: {
    titulo: ["Os valores", "estão publicados."],
    destaque: "publicados",
    itens: [
      {
        nome: "Primeira consulta",
        detalhe: "Avaliação completa, história alimentar e definição do plano.",
        duracao: "60 min",
        preco: "250",
      },
      {
        nome: "Retorno",
        detalhe: "Ajuste do plano conforme a rotina, os horários e o que funcionou.",
        duracao: "40 min",
        preco: "180",
      },
      {
        nome: "Acompanhamento mensal",
        detalhe: "Duas consultas e mensagens durante a semana, em horário comercial.",
        duracao: "por mês",
        preco: "400",
      },
    ],
    nota: "Presencial em Icaraí ou por vídeo, com a mesma duração e o mesmo material. Recibo com CRN para reembolso, quando o plano de saúde o prevê.",
    pagamento: "Pix, cartão de débito ou de crédito, no dia da consulta.",
  },
  duvidas: {
    titulo: "Perguntas frequentes",
    pergunta: "P.",
    resposta: "R.",
    itens: [
      {
        pergunta: "A consulta pode ser por vídeo?",
        resposta:
          "Pode. A primeira consulta e os retornos acontecem presencialmente em Icaraí ou por chamada de vídeo, conforme a preferência de cada pessoa.",
      },
      {
        pergunta: "O plano é entregue por escrito?",
        resposta:
          "Sim. O plano é enviado em PDF pelo WhatsApp em até dois dias úteis após a consulta, com as substituições possíveis para cada refeição.",
      },
      {
        pergunta: "Quanto tempo dura o acompanhamento?",
        resposta: "Não há prazo mínimo. O retorno é sugerido em trinta dias, e a continuidade é decidida a cada consulta.",
      },
      {
        pergunta: "O atendimento é coberto por plano de saúde?",
        resposta:
          "O atendimento é particular. É emitido recibo com CRN para a solicitação de reembolso junto ao plano, quando houver previsão contratual.",
      },
    ],
  },

  // ---------- III · O consultório ----------
  consultorio: {
    titulo: ["Uma sala", "em Icaraí."],
    referencia: "A duas quadras do Campo de São Bento. Elevador e acesso sem degraus.",
    chegada: [
      { modo: "A pé", texto: "Duas quadras a partir do Campo de São Bento." },
      { modo: "De ônibus", texto: "Ponto a uma quadra do prédio." },
      { modo: "De carro", texto: "Estacionamento rotativo na rua." },
    ],
    horarios: [
      { dia: "Segunda", hora: "9h às 18h" },
      { dia: "Terça", hora: "9h às 18h" },
      { dia: "Quarta", hora: "9h às 18h" },
      { dia: "Quinta", hora: "9h às 18h" },
      { dia: "Sexta", hora: "9h às 16h" },
      { dia: "Sábado", hora: "Fechado" },
      { dia: "Domingo", hora: "Fechado" },
    ],
    legendaDoMapa: "O consultório, a duas quadras do Campo de São Bento",
  },

  colofao: "Composto em Fraunces e Newsreader, sobre papel de cor palha.",
};

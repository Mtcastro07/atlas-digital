// Depósito Engenhoca: o site do plano Profissional no simulador de planos
// (seção da escada, components/secoes/escada.tsx). Seis páginas, o limite
// do plano. Direção B · Palco, vestida de ficha técnica de obra: grafite e
// cal, laranja de sinalização, papel quadriculado de projeto, Oswald em
// caixa-alta, Barlow no texto e IBM Plex Mono nos códigos; etiquetas de
// produto com código de barras, cotas de desenho técnico e a calculadora
// que imprime a lista como um cupom. Conteúdo do demo de construção
// (demos/producao/nicho_obra.py), trazido para a Engenhoca. O plano
// Profissional traz galeria, formulário e uma funcionalidade sob medida —
// a calculadora de materiais, com os índices de consumo e a perda do
// balcão. Estabelecimento fictício (número 000, telefone 00000-0000).

type ServicoDaCalculadora = {
  id: string;
  nome: string;
  /** Material, consumo por m² e unidade de venda. */
  itens: { nome: string; porM2: number; unidade: string; inteiro: boolean }[];
};

export const depositoSite = {
  caminho: "/demos/deposito",
  nome: "Depósito Engenhoca",
  descritor: "Material de construção",
  codigo: "EGH",
  endereco: "Rua Doutor March, 000",
  bairro: "Engenhoca, Niterói",
  /** As seis páginas; o início é a marca, as outras cinco ficam nas abas. */
  paginas: [
    {
      id: "inicio",
      caminho: "/demos/deposito",
      codigo: "00",
      rotulo: "Início",
      titulo: "Material para obra, com entrega no bairro",
      descricao: "Depósito de material de construção na Engenhoca, com estoque conferido e caminhão próprio. Site de demonstração do plano Profissional.",
      resumo: "",
    },
    {
      id: "materiais",
      caminho: "/demos/deposito/materiais",
      codigo: "01",
      rotulo: "Materiais",
      titulo: "Materiais",
      descricao: "Do alicerce ao acabamento: as seis famílias de material do balcão e a tabela de referência das unidades de venda.",
      resumo: "Seis famílias, do alicerce ao acabamento, e a tabela das unidades de venda.",
    },
    {
      id: "calculadora",
      caminho: "/demos/deposito/calculadora",
      codigo: "02",
      rotulo: "Calculadora",
      titulo: "Calculadora de materiais",
      descricao: "Medidas e serviço viram a lista de material, com os mesmos índices de consumo e a mesma perda do orçamento do balcão.",
      resumo: "A conta do balcão: medidas e serviço viram a lista do pedido.",
    },
    {
      id: "entrega",
      caminho: "/demos/deposito/entrega",
      codigo: "03",
      rotulo: "Entrega",
      titulo: "Entrega",
      descricao: "O raio da entrega do mesmo dia, o horário de corte e o frete, antes do aceite.",
      resumo: "O raio do mesmo dia, o corte das 15h e o frete, antes do aceite.",
    },
    {
      id: "orcamento",
      caminho: "/demos/deposito/orcamento",
      codigo: "04",
      rotulo: "Orçamento",
      titulo: "Orçamento por mensagem",
      descricao: "O pedido de orçamento sai pronto para o WhatsApp do balcão, sem cadastro.",
      resumo: "O pedido sai pronto para o WhatsApp do balcão, sem cadastro.",
    },
    {
      id: "a-casa",
      caminho: "/demos/deposito/a-casa",
      codigo: "05",
      rotulo: "A casa",
      titulo: "A casa",
      descricao: "Desde 1998 no mesmo endereço: o método, o horário e as perguntas frequentes.",
      resumo: "Desde 1998 no mesmo endereço: método, horário e perguntas.",
    },
  ],
  acao: "Pedir pelo WhatsApp",
  mensagem: "Olá. Gostaria de um orçamento de material.",
  /** A barra do topo: o estado da loja e o corte da entrega, calculados no aparelho (ilha EstadoDaLoja). */
  status: {
    aberto: "Aberto agora",
    fechado: "Fechado agora",
    fecha: "fecha às",
    abre: "abre",
    corte: "Pedido até 15h sai hoje",
    faltam: "faltam",
    encerrado: "Corte das 15h encerrado: sai no próximo dia útil",
    semScript: "Seg. a sex., 7h às 18h · sáb., 8h às 13h",
  },
  /** Horário de funcionamento, em horas cheias, por dia da semana (0 = domingo). */
  expediente: [null, [7, 18], [7, 18], [7, 18], [7, 18], [7, 18], [8, 13]] as ([number, number] | null)[],
  horaDoCorte: 15,

  // ---------- 00 · Início ----------
  capa: {
    rotulo: "Engenhoca, Niterói · desde 1998",
    titulo: ["Material para obra,", "com entrega", "no bairro."],
    lide: "Depósito de bairro, com estoque conferido e caminhão próprio. O que se pede pela manhã chega antes do almoço.",
    acaoPrincipal: "Calcular o material",
    cota: "No mesmo endereço desde 1998",
  },
  ficha: {
    titulo: "Ficha da casa",
    codigo: "EGH-0000",
  },
  fatos: [
    { codigo: "F-01", valor: "1998", rotulo: "no mesmo endereço, na Engenhoca" },
    { codigo: "F-02", valor: "15h", rotulo: "corte para a entrega do mesmo dia" },
    { codigo: "F-03", valor: "0", rotulo: "intermediários: o caminhão é da casa" },
    { codigo: "F-04", valor: "7", rotulo: "dias para trocar material íntegro" },
  ],
  painel: {
    titulo: ["O balcão,", "página por página."],
    lide: "Cada serviço do balcão tem a sua página: o catálogo, a conta, o caminhão e o pedido.",
  },
  fechoDoInicio: {
    titulo: "Orçamento por mensagem. Sem cadastro.",
    acao: "Montar o pedido",
  },

  // ---------- 02 · Calculadora ----------
  calculadora: {
    titulo: ["A conta que", "o balcão faria."],
    lide: "Informe as medidas e o serviço. O resultado usa os mesmos índices de consumo e a mesma perda que o depósito aplica no orçamento.",
    medidas: [
      { id: "largura", rotulo: "Largura", unidade: "m", inicial: 4.8 },
      { id: "altura", rotulo: "Altura ou comprimento", unidade: "m", inicial: 2.7 },
    ],
    servicos: [
      {
        id: "alvenaria",
        nome: "Alvenaria",
        itens: [
          { nome: "Bloco cerâmico 9 × 19 × 39", porM2: 12.5, unidade: "blocos", inteiro: true },
          { nome: "Argamassa de assentamento, 20 kg", porM2: 0.35, unidade: "sacos", inteiro: true },
          { nome: "Cimento CP-II, 50 kg", porM2: 0.18, unidade: "sacos", inteiro: true },
        ],
      },
      {
        id: "contrapiso",
        nome: "Contrapiso",
        itens: [
          { nome: "Cimento CP-II, 50 kg", porM2: 0.32, unidade: "sacos", inteiro: true },
          { nome: "Areia média", porM2: 0.05, unidade: "m³", inteiro: false },
          { nome: "Brita 1", porM2: 0.03, unidade: "m³", inteiro: false },
        ],
      },
      {
        id: "reboco",
        nome: "Reboco",
        itens: [
          { nome: "Argamassa de reboco, 20 kg", porM2: 0.55, unidade: "sacos", inteiro: true },
          { nome: "Cal hidratada, 20 kg", porM2: 0.22, unidade: "sacos", inteiro: true },
          { nome: "Areia fina", porM2: 0.03, unidade: "m³", inteiro: false },
        ],
      },
      {
        id: "piso",
        nome: "Piso",
        itens: [
          { nome: "Argamassa colante AC-II, 20 kg", porM2: 0.28, unidade: "sacos", inteiro: true },
          { nome: "Rejunte, 5 kg", porM2: 0.12, unidade: "sacos", inteiro: true },
          { nome: "Espaçador de 2 mm", porM2: 24, unidade: "unidades", inteiro: true },
        ],
      },
    ] satisfies ServicoDaCalculadora[],
    perdas: [
      { valor: 1.05, rotulo: "5%", detalhe: "obra organizada" },
      { valor: 1.1, rotulo: "10%", detalhe: "padrão do depósito" },
      { valor: 1.15, rotulo: "15%", detalhe: "recorte e canto" },
    ],
    perdaInicial: 1,
    rotulos: {
      painel: "Calculadora de materiais",
      servico: "Serviço",
      perda: "Perda considerada",
      area: "Área",
      comPerda: "com a perda",
      lista: "Lista do pedido",
      itens: "itens",
      cupom: "Cupom de conferência",
      quantidade: "Qtd.",
      material: "Material",
    },
    mensagem: "Olá. Lista de materiais",
    acao: "Enviar lista pelo WhatsApp",
    // O botão de copiar do cupom (Spell UI, Copy Button; desde 03/10): a mesma mensagem, para colar onde quiser.
    copiar: "Copiar lista",
    copiado: "Lista copiada",
    nota: "Estimativa de referência. A quantidade final é conferida no balcão, com o projeto à vista.",
    indices: {
      titulo: "Índices de consumo",
      lide: "Os números que a calculadora usa, por metro quadrado, antes da perda.",
    },
  },

  // ---------- 01 · Materiais ----------
  materiais: {
    titulo: ["Do alicerce", "ao acabamento."],
    lide: "Seis famílias de material no balcão, com estoque conferido. O preço do dia sai no orçamento.",
    itens: [
      { codigo: "EGH-01", textura: "cimento", nome: "Cimento e argamassa", texto: "Sacos de 20 e 50 kg, argamassa colante AC-I a AC-III e rejunte.", unidade: "Saco de 20 ou 50 kg" },
      { codigo: "EGH-02", textura: "bloco", nome: "Tijolo e bloco", texto: "Bloco de concreto e cerâmico, tijolo maciço e laje pré-moldada.", unidade: "Milheiro ou unidade" },
      { codigo: "EGH-03", textura: "areia", nome: "Areia e brita", texto: "Areia média e fina, brita 0 e 1. Por metro cúbico ou no saco.", unidade: "Metro cúbico ou saco" },
      { codigo: "EGH-04", textura: "revestimento", nome: "Revestimento", texto: "Piso, azulejo, porcelanato e rodapé. Amostras no balcão.", unidade: "Metro quadrado ou caixa" },
      { codigo: "EGH-05", textura: "hidraulica", nome: "Hidráulica e elétrica", texto: "Tubos, conexões, caixas, fios, disjuntores e quadros.", unidade: "Barra, rolo ou peça" },
      { codigo: "EGH-06", textura: "ferragem", nome: "Tinta e ferragem", texto: "Tintas, massa, lixas, parafusos, dobradiças e fechaduras.", unidade: "Lata, galão ou peça" },
    ],
    tabela: {
      titulo: "Tabela de referência",
      lide: "A unidade em que cada material sai do balcão e o uso mais comum. O preço do dia vem no orçamento.",
      colunas: ["Cód.", "Material", "Unidade de venda", "Uso"],
      linhas: [
        ["01.1", "Cimento CP-II", "Saco de 50 kg", "Concreto, contrapiso e reboco"],
        ["01.2", "Argamassa colante AC-II", "Saco de 20 kg", "Assentamento de piso e azulejo"],
        ["01.3", "Rejunte", "Saco de 5 kg", "Juntas de revestimento"],
        ["02.1", "Bloco cerâmico 9 × 19 × 39", "Milheiro ou unidade", "Alvenaria de vedação"],
        ["02.2", "Bloco de concreto 14 × 19 × 39", "Unidade", "Muro e alvenaria estrutural"],
        ["03.1", "Areia média", "Metro cúbico ou saco", "Concreto e assentamento"],
        ["03.2", "Brita 1", "Metro cúbico ou saco", "Concreto e contrapiso"],
        ["04.1", "Porcelanato 60 × 60", "Caixa", "Piso interno"],
        ["05.1", "Tubo de PVC 100 mm", "Barra de 6 m", "Esgoto"],
        ["05.2", "Fio de 2,5 mm²", "Rolo de 100 m", "Tomadas"],
        ["06.1", "Tinta acrílica", "Lata de 18 L", "Parede externa e interna"],
      ],
    },
    fecho: "Não está na lista? O balcão responde pelo WhatsApp.",
  },

  // ---------- 03 · Entrega ----------
  entrega: {
    titulo: ["Onde o", "caminhão chega."],
    texto: "Entrega própria na Engenhoca e nos bairros vizinhos. Pedido fechado até as 15h sai no caminhão da tarde.",
    frete: "Frete grátis acima de R$ 300 dentro do bairro. Fora dele, o valor vem no orçamento, antes do aceite.",
    raio: "Raio de entrega no mesmo dia",
    dia: {
      titulo: "O dia do caminhão",
      marcos: [
        { hora: 7, rotulo: "O balcão abre" },
        { hora: 11, rotulo: "Caminhão da manhã" },
        { hora: 15, rotulo: "Corte do mesmo dia" },
        { hora: 16, rotulo: "Caminhão da tarde" },
        { hora: 18, rotulo: "O balcão fecha" },
      ],
      agora: "Agora",
    },
    tabela: {
      titulo: "Frete",
      linhas: [
        ["Na Engenhoca, acima de R$ 300", "Grátis"],
        ["Na Engenhoca, abaixo de R$ 300", "No orçamento"],
        ["Bairros vizinhos", "No orçamento, antes do aceite"],
        ["Retirada no balcão", "Sem pedido mínimo"],
      ],
    },
  },

  // ---------- 04 · Orçamento ----------
  horario: {
    titulo: "Horário",
    dias: [
      { dia: "Segunda a sexta", hora: "7h às 18h" },
      { dia: "Sábado", hora: "8h às 13h" },
      { dia: "Domingo", hora: "Fechado" },
    ],
    nota: "Pátio para carga e descarga. Estacionamento na porta para a retirada.",
  },
  orcamento: {
    titulo: ["Orçamento", "por mensagem."],
    lide: "Preencha o que souber. A mensagem sai pronta para o WhatsApp do balcão, sem cadastro e sem conta a criar.",
    talao: "Pedido de orçamento",
    numero: "Nº 0000",
    campos: {
      nome: "Nome",
      bairro: "Bairro da entrega",
      lista: "O que precisa",
      listaExemplo: "Ex.: 10 sacos de cimento CP-II, 1 m³ de areia média",
      recebimento: "Recebimento",
      opcoes: ["Entrega", "Retirada no balcão"],
    },
    acao: "Enviar pelo WhatsApp",
    copiar: "Copiar pedido",
    copiado: "Pedido copiado",
    mensagem: "Olá. Pedido de orçamento.",
    nota: "Nada é registrado nesta página: a mensagem sai do próprio aparelho.",
  },

  // ---------- 05 · A casa ----------
  casa: {
    titulo: ["Desde 1998", "na Engenhoca."],
    lide: "O mesmo endereço, o mesmo pátio e o caminhão da casa. O que mudou foi o tamanho do estoque.",
  },
  metodo: {
    titulo: ["Do metro quadrado", "ao caminhão."],
    etapas: [
      { nome: "Medida", texto: "A quantidade sai da área, não do palpite: a calculadora faz a conta do balcão, com a mesma perda.", tempo: "Na hora" },
      { nome: "Orçamento", texto: "Lista fechada, preço por item e frete informados antes do aceite. Nada é cobrado depois.", tempo: "Por mensagem" },
      { nome: "Separação", texto: "Material separado e conferido no pátio, item por item, antes de subir no caminhão.", tempo: "No pátio" },
      { nome: "Entrega", texto: "Caminhão próprio, com ajudante para a descarga. Até as 15h, no mesmo dia dentro do bairro.", tempo: "Mesmo dia" },
    ],
  },
  duvidas: {
    titulo: "Perguntas frequentes",
    itens: [
      {
        pergunta: "Entregam no mesmo dia?",
        resposta:
          "Pedidos fechados até as 15h são entregues no mesmo dia na Engenhoca e nos bairros vizinhos, conforme a disponibilidade do caminhão.",
      },
      {
        pergunta: "Qual é o valor do frete?",
        resposta: "A entrega é gratuita acima de R$ 300 dentro do bairro. Fora dele, o valor é informado no orçamento.",
      },
      { pergunta: "Vendem para pessoa física?", resposta: "Sim. Não há pedido mínimo para a retirada no balcão." },
      {
        pergunta: "Trocam o material que sobrou?",
        resposta:
          "Material íntegro, na embalagem original e com nota, é trocado em até sete dias. Cimento e argamassa abertos não são aceitos.",
      },
    ],
  },
};

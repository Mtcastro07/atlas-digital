// Barbearia Santa Rosa: o site do plano Completo no simulador de planos
// (seção da escada, components/secoes/escada.tsx). Páginas sem limite no
// plano: sete, uma por capítulo da casa. Refeita do zero em 01/10, a
// pedido do usuário, com o máximo de 3D: um palco em WebGL atrás de todas
// as páginas (components/ilhas/demos/palco-3d.tsx) desenha as fichas da
// casa — moedas, fichas oitavadas e placas de metal, com o relevo
// tipográfico na face, "do mesmo jeito feito com a moeda" (pedido do
// usuário, depois de ver os objetos modelados) —, que viram como uma
// moeda de uma seção para a outra e na troca de página; a barra de
// navegação fica constante. Noite e latão: Instrument
// Serif nos títulos, Jost (geométrica, de letreiro) no texto. Conteúdo
// da segunda versão do demo de barbearia (contextos/transferencias/
// atlas--nichos-registro-de-transferencia--2026-09-30.md, seção 6):
// serviços com preço e duração, equipe com detalhe verificável, "o que não
// se faz aqui" e as duas funcionalidades sob medida do plano Completo — o
// agendador e a agenda de retorno. Estabelecimento fictício ("da Silva",
// número 000).

/**
 * As fichas do palco 3D: a forma da peça, o metal e o relevo da face —
 * o texto em volta (anel), o centro grande e o detalhe embaixo, ou as
 * linhas de uma placa. Tipografia em relevo, sem figura (ESTEIRA, VI).
 */
export const fichas = [
  { id: "selo", forma: "redonda", metal: "latao", anel: "Barbearia Santa Rosa · Niterói · desde 1996 · ", centro: "SR" },
  { id: "navalha", forma: "redonda", metal: "alpaca", anel: "A Navalha · barba na navalha e toalha quente · ", centro: "35", acima: "R$", detalhe: "30 min" },
  { id: "classico", forma: "oitavada", metal: "latao", anel: "O Clássico · tesoura e máquina · ", centro: "45", acima: "R$", detalhe: "40 min" },
  { id: "conjunto", forma: "redonda", metal: "cobre", anel: "O Conjunto · corte e barba na mesma cadeira · ", centro: "70", acima: "R$", detalhe: "1h10" },
  { id: "acerto", forma: "oitavada", metal: "alpaca", anel: "O Acerto · pezinho e contorno · ", centro: "20", acima: "R$", detalhe: "15 min" },
  { id: "1996", forma: "placa", metal: "bronze", linhas: ["Desde", "1996", "Santa Rosa · Niterói"] },
  { id: "cadeiras", forma: "placa", metal: "latao", linhas: ["Três", "cadeiras", "Navalha · Degradê · Barba"] },
  { id: "almir", forma: "redonda", metal: "latao", anel: "Almir da Silva · navalha · fundou a casa em 1996 · ", centro: "AS" },
  { id: "teo", forma: "redonda", metal: "alpaca", anel: "Téo da Silva · degradê · na casa desde 2019 · ", centro: "TS" },
  { id: "rui", forma: "redonda", metal: "cobre", anel: "Rui da Silva · barba · de quinta a sábado · ", centro: "RS" },
  { id: "retorno", forma: "oitavada", metal: "bronze", anel: "Degradê 12–18 · Social 21–30 · Tesoura 35–45 · Barba 10–15 · ", centro: "Retorno", detalhe: "em dias" },
  { id: "onde", forma: "placa", metal: "alpaca", linhas: ["Rua Mário Viana", "000", "Santa Rosa · Niterói"] },
] as const;

export type ObjetoDaCena = (typeof fichas)[number]["id"];
export type LadoDaCena = "esquerda" | "centro" | "direita";

export const barbeariaSite = {
  caminho: "/demos/barbearia",
  nome: "Barbearia Santa Rosa",
  monograma: "SR",
  selo: "Barbearia Santa Rosa · Niterói · desde 1996 · ",
  endereco: "Rua Mário Viana, 000",
  bairro: "Santa Rosa, Niterói",
  /** As sete páginas; o início é a marca, as outras seis ficam na barra. */
  paginas: [
    {
      id: "inicio",
      caminho: "/demos/barbearia",
      numero: "00",
      rotulo: "Início",
      titulo: "Barbearia Santa Rosa",
      descricao: "Barbearia em Santa Rosa, Niterói, desde 1996: corte, barba e navalha, com o preço e a duração de cada serviço. Site de demonstração do plano Completo.",
      resumo: "",
    },
    {
      id: "servicos",
      caminho: "/demos/barbearia/servicos",
      numero: "01",
      rotulo: "Serviços",
      titulo: "Serviços",
      descricao: "Os quatro serviços da casa, com o preço e a duração de cada um, e o que não se faz aqui.",
      resumo: "Quatro serviços, com o preço e a duração de cada um.",
    },
    {
      id: "a-casa",
      caminho: "/demos/barbearia/a-casa",
      numero: "02",
      rotulo: "A casa",
      titulo: "A casa",
      descricao: "Desde 1996 na mesma esquina de Santa Rosa: de uma cadeira a três, sem mudar de endereço.",
      resumo: "De uma cadeira a três, sem mudar de esquina.",
    },
    {
      id: "equipe",
      caminho: "/demos/barbearia/equipe",
      numero: "03",
      rotulo: "Equipe",
      titulo: "Equipe",
      descricao: "Três cadeiras, três especialidades: navalha, degradê e barba.",
      resumo: "Três cadeiras, três especialidades.",
    },
    {
      id: "agendar",
      caminho: "/demos/barbearia/agendar",
      numero: "04",
      rotulo: "Agendar",
      titulo: "Agendar",
      descricao: "Serviço, profissional, dia e período viram o pedido de horário, pronto para o WhatsApp da casa.",
      resumo: "O pedido de horário sai pronto para o WhatsApp.",
    },
    {
      id: "retorno",
      caminho: "/demos/barbearia/retorno",
      numero: "05",
      rotulo: "Retorno",
      titulo: "Quando voltar",
      descricao: "O corte e a data do último atendimento devolvem a janela sugerida para o próximo.",
      resumo: "A janela sugerida para o próximo corte.",
    },
    {
      id: "onde",
      caminho: "/demos/barbearia/onde",
      numero: "06",
      rotulo: "Onde",
      titulo: "Onde",
      descricao: "O endereço, o horário e o mapa da esquina de sempre, em Santa Rosa.",
      resumo: "A esquina de sempre, o horário e o mapa.",
    },
  ],
  acao: "Agendar horário",
  horarioCurto: ["Terça a sexta, 9h às 20h", "Sábado, 8h às 17h"],

  // ---------- Início ----------
  capa: {
    rotulo: "Santa Rosa, Niterói",
    desde: "Desde 1996",
    titulo: ["Trinta anos", "na mesma", "esquina."],
    // A palavra que a onda de latão atravessa depois de compor o título (Spell UI, Gradient Wave Text; desde 03/10).
    destaque: "esquina.",
    lide: "Três cadeiras em Santa Rosa, em funcionamento desde 1996. Corte, barba e navalha, com o preço e a duração de cada serviço informados antes.",
    secundaria: "Ver os serviços",
    objeto: "selo" as ObjetoDaCena,
  },
  /** As cenas do início: cada uma com o seu objeto e o lado em que ele fica. */
  cenas: [
    {
      id: "navalha",
      objeto: "navalha" as ObjetoDaCena,
      lado: "esquerda" as LadoDaCena,
      rotulo: "A Navalha · R$ 35 · 30 min",
      titulo: ["A navalha,", "sem pressa."],
      texto: "Barba feita na navalha, com toalha quente e óleo. A lâmina é trocada a cada cliente, à vista.",
      vinculo: { rotulo: "Ver os serviços", pagina: "servicos" },
    },
    {
      id: "tesoura",
      objeto: "classico" as ObjetoDaCena,
      lado: "direita" as LadoDaCena,
      rotulo: "O Clássico · R$ 45 · 40 min",
      titulo: ["A tesoura", "antes da máquina."],
      texto: "Corte na tesoura e na máquina, com acabamento na navalha. A conferência no espelho encerra o atendimento.",
      vinculo: { rotulo: "Agendar o Clássico", pagina: "agendar" },
    },
    {
      id: "moeda",
      objeto: "1996" as ObjetoDaCena,
      lado: "esquerda" as LadoDaCena,
      rotulo: "1996 · Santa Rosa",
      titulo: ["Gira na mesma", "esquina."],
      texto: "A casa abriu com uma cadeira e chegou a três sem mudar de endereço. O selo é o mesmo desde a abertura.",
      vinculo: { rotulo: "Conhecer a casa", pagina: "a-casa" },
    },
  ],
  capitulos: {
    titulo: ["Seis capítulos,", "uma esquina."],
    lide: "Cada página do site é um capítulo da casa. O objeto em cena muda junto.",
  },
  faixa: ["O Clássico", "A Navalha", "O Conjunto", "O Acerto"],

  // ---------- Serviços ----------
  servicos: {
    titulo: ["Com o preço e a duração", "de cada serviço."],
    lide: "Quatro serviços, cada um com a sua ficha: o preço no centro, a duração embaixo. Role: a ficha vira com o serviço.",
    itens: [
      { id: "classico", nome: "O Clássico", preco: "45", duracao: "40 min", minutos: 40, objeto: "classico" as ObjetoDaCena, texto: "Corte na tesoura e na máquina, com acabamento na navalha." },
      { id: "navalha", nome: "A Navalha", preco: "35", duracao: "30 min", minutos: 30, objeto: "navalha" as ObjetoDaCena, texto: "Barba feita na navalha, com toalha quente e óleo." },
      { id: "conjunto", nome: "O Conjunto", preco: "70", duracao: "1h10", minutos: 70, objeto: "conjunto" as ObjetoDaCena, texto: "O Clássico e A Navalha, em sequência, na mesma cadeira." },
      { id: "acerto", nome: "O Acerto", preco: "20", duracao: "15 min", minutos: 15, objeto: "acerto" as ObjetoDaCena, texto: "Pezinho e contorno, entre um corte e outro." },
    ],
    agendarEste: "Agendar este serviço",
  },
  ausencias: {
    titulo: "O que não se faz aqui.",
    itens: ["Pacote ou fidelidade.", "Taxa de cancelamento.", "Venda de produto."],
  },

  // ---------- A casa ----------
  casa: {
    titulo: ["Gira na mesma esquina", "desde 1996."],
    texto: "A casa abriu com uma cadeira e chegou a três sem mudar de endereço. Cada profissional tem a sua especialidade, e a conferência no espelho encerra todos os atendimentos.",
    linha: [
      { ano: "1996", titulo: "A primeira cadeira", texto: "Almir da Silva abre a casa na esquina de Santa Rosa, com uma cadeira e a navalha." },
      { ano: "2019", titulo: "O degradê chega", texto: "Téo da Silva, formado em 2014, passa a atender na casa." },
      { ano: "Hoje", titulo: "Três cadeiras", texto: "Navalha, degradê e barba, cada um na sua cadeira, no mesmo endereço." },
    ],
    numeros: [
      { valor: "1996", rotulo: "ano de abertura, no mesmo endereço" },
      { valor: "3", rotulo: "cadeiras, com três especialidades" },
      { valor: "4", rotulo: "serviços, cada um com a duração" },
      { valor: "0", rotulo: "pacotes ou planos de fidelidade" },
    ],
  },

  // ---------- Equipe ----------
  equipe: {
    titulo: ["Três cadeiras,", "três especialidades."],
    lide: "Cada um com a sua ficha, as iniciais no centro e a especialidade em volta. Role: a ficha vira com a pessoa.",
    pessoas: [
      { id: "almir", nome: "Almir da Silva", iniciais: "AS", especialidade: "Navalha", detalhe: "Fundou a casa em 1996.", cadeira: "Cadeira 1", objeto: "almir" as ObjetoDaCena },
      { id: "teo", nome: "Téo da Silva", iniciais: "TS", especialidade: "Degradê", detalhe: "Formado em 2014, na casa desde 2019.", cadeira: "Cadeira 2", objeto: "teo" as ObjetoDaCena },
      { id: "rui", nome: "Rui da Silva", iniciais: "RS", especialidade: "Barba", detalhe: "Atende de quinta a sábado.", cadeira: "Cadeira 3", objeto: "rui" as ObjetoDaCena },
    ],
  },

  // ---------- Agendar (funcionalidade 1) ----------
  agendador: {
    titulo: ["Escolha, e o pedido", "sai pronto."],
    lide: "Serviço, profissional e período viram uma mensagem para o WhatsApp da casa. O horário é confirmado por resposta.",
    rotulos: { servico: "Serviço", profissional: "Profissional", dia: "Dia", periodo: "Período" },
    semPreferencia: "Sem preferência",
    dias: ["Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    periodos: [
      { nome: "Manhã", faixa: "9h às 12h" },
      { nome: "Tarde", faixa: "13h às 17h" },
      { nome: "Noite", faixa: "17h às 20h" },
    ],
    acao: "Enviar pedido pelo WhatsApp",
    // O botão de copiar do bilhete (Spell UI, Copy Button; desde 03/10).
    copiar: "Copiar pedido",
    copiado: "Pedido copiado",
    mensagem: "Olá. Gostaria de agendar",
    resumo: "Pedido",
    com: "com",
    nota: "Nada é registrado nesta página. O sábado à noite não tem atendimento.",
  },

  // ---------- Retorno (funcionalidade 2) ----------
  retorno: {
    titulo: ["Quando", "voltar."],
    lide: "Informe o corte e a data do último atendimento. A agenda devolve a janela sugerida para o próximo.",
    rotulos: { corte: "Corte", ultimo: "Último atendimento" },
    cortes: [
      { id: "degrade", nome: "Degradê", minimo: 12, maximo: 18, servico: "classico" },
      { id: "social", nome: "Social", minimo: 21, maximo: 30, servico: "classico" },
      { id: "tesoura", nome: "Tesoura", minimo: 35, maximo: 45, servico: "classico" },
      { id: "barba", nome: "Barba", minimo: 10, maximo: 15, servico: "navalha" },
    ],
    janela: "Janela sugerida",
    estados: { antes: "A janela abre em", hoje: "A janela está aberta.", passou: "A janela fechou há", dias: "dias", dia: "dia" },
    nota: "A velocidade de crescimento varia de pessoa para pessoa; a confirmação ocorre no atendimento.",
    acao: "Agendar o retorno",
  },

  // ---------- Onde ----------
  local: {
    titulo: ["Na esquina", "de sempre."],
    horarios: [
      { dia: "Terça a sexta", hora: "9h às 20h" },
      { dia: "Sábado", hora: "8h às 17h" },
      { dia: "Domingo e segunda", hora: "Fechado" },
    ],
    referencia: "Atendimento com hora marcada. Sem hora marcada, a vez é a do primeiro intervalo livre.",
  },
};

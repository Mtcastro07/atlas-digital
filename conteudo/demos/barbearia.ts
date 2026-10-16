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

import type { Expediente } from "@/lib/demos/relogio";

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
      descricao: "Barbearia em Santa Rosa, Niterói, desde 1996: corte na tesoura e barba na navalha, com hora marcada. Site de demonstração do plano Completo.",
      resumo: "",
    },
    {
      id: "servicos",
      caminho: "/demos/barbearia/servicos",
      numero: "01",
      rotulo: "Serviços",
      titulo: "Serviços",
      descricao: "Os quatro serviços da casa, com o preço e a duração de cada um, e o que não se faz aqui.",
      // Os resumos da lista de capítulos do início não repetem o título da página (fechamento com o Impeccable, 16/10).
      resumo: "O que a casa faz, e o que não faz.",
    },
    {
      id: "a-casa",
      caminho: "/demos/barbearia/a-casa",
      numero: "02",
      rotulo: "A casa",
      titulo: "A casa",
      descricao: "Desde 1996 na mesma esquina de Santa Rosa: de uma cadeira a três, sem mudar de endereço.",
      resumo: "De uma cadeira a três, no mesmo endereço.",
    },
    {
      id: "equipe",
      caminho: "/demos/barbearia/equipe",
      numero: "03",
      rotulo: "Equipe",
      titulo: "Equipe",
      descricao: "Três cadeiras, três especialidades: navalha, degradê e barba.",
      resumo: "Quem atende em cada cadeira, e em que dias.",
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
      resumo: "O endereço, o horário e o mapa do bairro.",
    },
  ],
  acao: "Agendar horário",
  /** O rótulo do botão da barra abaixo de 640 px, onde "Agendar horário" não cabe (o nome acessível continua `acao`). */
  acaoCurta: "Agendar",
  horarioCurto: ["Terça a sexta, 9h às 20h", "Sábado, 8h às 17h"],
  /** A mensagem do número do rodapé, que abre o WhatsApp (desde 16/10). */
  contato: "Olá. Vim pelo site da barbearia.",
  /**
   * O expediente, dia a dia (0 = domingo), para o estado ao vivo do relógio comum (lib/demos/relogio.ts): o poste
   * do rodapé, o título da cena de couro e o dia de hoje no Onde. O horário escrito (horarioCurto e local.horarios)
   * continua sendo o texto; este é o dado. Os feriados nacionais vêm de conteudo/demos/comum.ts.
   */
  expediente: {
    0: [],
    1: [],
    2: [{ abre: "09:00", fecha: "20:00" }],
    3: [{ abre: "09:00", fecha: "20:00" }],
    4: [{ abre: "09:00", fecha: "20:00" }],
    5: [{ abre: "09:00", fecha: "20:00" }],
    6: [{ abre: "08:00", fecha: "17:00" }],
  } satisfies Expediente,

  // ---------- Início ----------
  capa: {
    rotulo: "Santa Rosa, Niterói",
    desde: "Desde 1996",
    titulo: ["Trinta anos", "na mesma", "esquina."],
    // Sem "Santa Rosa" nem "desde 1996", já no rótulo logo acima e no anel da moeda (correção de 14/10: o mesmo dado três vezes na primeira tela).
    // Sem "Três cadeiras" nem "o preço e a duração de cada serviço" (fechamento com o Impeccable, 16/10): cada dado
    // fica no seu capítulo, a Equipe e os Serviços.
    lide: "Corte na tesoura e barba na navalha, com hora marcada.",
    secundaria: "Ver os serviços",
    objeto: "selo" as ObjetoDaCena,
  },
  /**
   * As duas cenas do início, cada uma com a sua peça (desde a correção de 14/10, depois do crítico de fora): a
   * navalha, com a ficha de alpaca em cena, e a tesoura, desenhada em latão sobre a bancada, sem ficha. Saíram o
   * rótulo de cada cena (o preço e a duração, que a ficha já gravava ao lado: o mesmo dado duas vezes) e a cena de
   * 1996 ("Gira na mesma esquina.", o título de A casa repetido, numa terceira cena seguida com o mesmo molde).
   * Desde 15/10, a navalha termina no texto: o vínculo dela era "Ver os serviços", o mesmo da capa, uma tela acima.
   */
  cenas: {
    navalha: {
      objeto: "navalha" as ObjetoDaCena,
      titulo: ["A navalha,", "sem pressa."],
      texto: "Barba feita na navalha, com toalha quente e óleo. A lâmina é trocada a cada cliente, à vista.",
    },
    tesoura: {
      titulo: ["A tesoura", "antes da máquina."],
      texto: "Corte na tesoura e na máquina, com acabamento na navalha. A conferência no espelho encerra o atendimento.",
      vinculo: { rotulo: "Agendar o Clássico", pagina: "agendar" },
    },
  },
  /**
   * A cena de couro (desde 14/10): o título é o estado ao vivo ("Aberto agora," / "fecha às 20h."); sem script e na
   * primeira pintura, o fato do Onde. O texto de baixo é o horário curto, já escrito acima.
   */
  couro: {
    semScript: ["Terça a sábado,", "com hora marcada."],
    vinculo: "Ver o endereço e o horário",
  },
  capitulos: {
    titulo: ["Seis capítulos,", "uma casa."],
    lide: "Cada página do site é um capítulo da casa: o preço, a história, as cadeiras, o pedido, o retorno e o endereço.",
    /** A ficha que vira em cena sob o ponteiro, linha a linha (e a miniatura de cada linha, abaixo de 1024 px). */
    previas: { servicos: "classico", "a-casa": "1996", equipe: "almir", agendar: "selo", retorno: "retorno", onde: "onde" } as Record<string, ObjetoDaCena>,
  },

  // ---------- Serviços ----------
  servicos: {
    titulo: ["Com o preço e a duração", "de cada serviço."],
    lide: "Do acerto entre um corte e outro ao conjunto de corte e barba, na mesma cadeira.",
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
    titulo: ["De uma cadeira", "a três."],
    texto: "No mesmo endereço desde a abertura. Cada profissional tem a sua especialidade, e a conferência no espelho encerra todos os atendimentos.",
    linhaTitulo: "A linha da casa",
    linha: [
      { ano: "1996", titulo: "A primeira cadeira", texto: "Almir da Silva abre a casa na esquina de Santa Rosa, com uma cadeira e a navalha." },
      { ano: "2019", titulo: "O degradê chega", texto: "Téo da Silva, formado em 2014, passa a atender na casa." },
      // Sem "Três cadeiras" nem "Navalha, degradê e barba, cada um na sua cadeira", que são da Equipe (16/10).
      { ano: "Hoje", titulo: "A barba ganha cadeira", texto: "Rui da Silva assume a barba, e a casa chega à terceira cadeira." },
    ],
    // Os números da casa (desde 16/10, sem "4 serviços" e "0 pacotes", que repetiam os Serviços): o rótulo é o termo
    // (dt) e o número, o valor (dd).
    numeros: [
      { valor: "30", rotulo: "Anos no mesmo endereço" },
      { valor: "3", rotulo: "Cadeiras, uma por especialidade" },
    ],
  },

  // ---------- Equipe ----------
  equipe: {
    titulo: ["Três cadeiras,", "três especialidades."],
    lide: "Navalha, degradê e barba, cada um na sua cadeira. O espelho aceso é o de quem está atendendo agora.",
    agora: "Na cadeira agora",
    // Com a casa fechada (desde 16/10), a plaqueta de quem atende quando ela abrir, com o espelho a meia-luz.
    depois: "Na cadeira quando a casa abrir",
    // Os dias de cada um (0 = domingo), dentro do expediente da casa: o espelho de quem atende agora fica aceso.
    pessoas: [
      { id: "almir", nome: "Almir da Silva", iniciais: "AS", especialidade: "Navalha", detalhe: "Fundou a casa em 1996.", cadeira: "Cadeira 1", dias: [2, 3, 4, 5, 6] },
      { id: "teo", nome: "Téo da Silva", iniciais: "TS", especialidade: "Degradê", detalhe: "Formado em 2014, na casa desde 2019.", cadeira: "Cadeira 2", dias: [2, 3, 4, 5, 6] },
      { id: "rui", nome: "Rui da Silva", iniciais: "RS", especialidade: "Barba", detalhe: "Atende de quinta a sábado.", cadeira: "Cadeira 3", dias: [4, 5, 6] },
    ],
  },

  // ---------- Agendar (funcionalidade 1) ----------
  agendador: {
    titulo: ["Escolha, e o pedido", "sai pronto."],
    lide: "Serviço, profissional e período viram uma mensagem para o WhatsApp da casa. O horário é confirmado por resposta.",
    rotulos: { servico: "Serviço", profissional: "Profissional", dia: "Dia", periodo: "Período" },
    semPreferencia: "Sem preferência",
    dias: ["Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    // A hora de cada período: o pedido padrão é o primeiro horário livre pelo relógio da casa (lib/demos/barbearia/pedido.ts).
    periodos: [
      { nome: "Manhã", faixa: "9h às 12h", inicio: "09:00", fim: "12:00" },
      { nome: "Tarde", faixa: "13h às 17h", inicio: "13:00", fim: "17:00" },
      { nome: "Noite", faixa: "17h às 20h", inicio: "17:00", fim: "20:00" },
    ],
    // As trocas que o agendador anuncia (desde 16/10): "Rui não atende na terça: o pedido fica para quinta."; "No
    // sábado, não há atendimento de noite: o pedido fica para a manhã."; e, sob os dias, "Rui atende de quinta a sábado.".
    avisos: { atende: "atende", naoAtende: "não atende", semAtendimento: "não há atendimento", ficaPara: "o pedido fica para" },
    /** "sexta, dia 16, de manhã": a data que a opção do dia mostra vai também no pedido. */
    diaDoMes: "dia",
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
    // Sem data e com data futura (desde 16/10), a régua some e o bilhete diz o que fazer; depois da janela, também.
    estados: {
      antes: "A janela abre em",
      hoje: "A janela está aberta.",
      passou: "A janela fechou há",
      passouAcao: "Agende o primeiro horário livre.",
      vazio: "Informe a data do último corte.",
      futuro: "A data não pode ser depois de hoje.",
      dias: "dias",
      dia: "dia",
    },
    nota: "A velocidade de crescimento varia de pessoa para pessoa; a confirmação ocorre no atendimento.",
    acao: "Agendar o retorno",
  },

  // ---------- Onde ----------
  local: {
    titulo: ["Na esquina", "de sempre."],
    // Os dias de cada linha (0 = domingo): a linha de hoje ganha o ponto de latão e o estado ao vivo.
    horarios: [
      { dia: "Terça a sexta", hora: "9h às 20h", dias: [2, 3, 4, 5] },
      { dia: "Sábado", hora: "8h às 17h", dias: [6] },
      { dia: "Domingo e segunda", hora: "Fechado", dias: [0, 1] },
    ],
    referencia: "Atendimento com hora marcada. Sem hora marcada, a vez é a do primeiro intervalo livre.",
    // O endereço é fictício (número 000): "Como chegar" abre a busca do bairro no OpenStreetMap (desde 16/10).
    comoChegar: { rotulo: "Como chegar", detalhe: "o bairro no OpenStreetMap, em outra aba" },
  },
};

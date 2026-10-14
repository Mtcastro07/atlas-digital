// Cozinha do Ingá: o site de restaurante do plano Profissional no simulador de planos (desde 09/10, o 2º dos nove sites
// novos; components/secoes/escada.tsx). Restaurante fictício de almoço de bairro; cada fato sai do briefing fictício
// (registros/demos/restaurante/briefing.md, fora do git). O preço publicado vincula (CDC, art. 30): aqui, o selo de
// ficção avisa que nada é oferta. O frete vai discriminado por bairro (Decreto 7.962/2013, art. 2º); os alérgenos, por
// decisão da casa; a cozinha manipula trigo, e nenhum prato é "sem glúten" (producao/esteira/nichos/restaurante.md,
// seções 3 e 7). Identidade "O quadro-negro" (aprovada em 09/10 por Matheus Castro Oliveira de Luna Garcia): o papel do
// cardápio, a lousa verde-escura com o giz e o caixilho de madeira; Libre Caslon Display e Text. Texto impessoal,
// concreto, com o nome dos pratos; nenhum superlativo. Preços em centavos.

import type { Dia, Expediente, Fechamento } from "@/lib/demos/relogio";

import { feriadosNacionais } from "./comum";

const raiz = "/demos/restaurante";

export type IdDaPagina = "inicio" | "cardapio" | "pedido" | "cozinha" | "encomendas" | "onde" | "privacidade" | "acessibilidade";

export type PaginaDaCasa = {
  id: IdDaPagina;
  caminho: string;
  /** O nome na barra e no índice do rodapé. */
  rotulo: string;
  /** O título da página (o `h1`, quando a página não escreve outro), sem a marca. */
  titulo: string;
  /** A meta description, até ~125 caracteres; os metadados acrescentam "Estabelecimento fictício.". */
  descricao: string;
  naBarra?: boolean;
  legal?: boolean;
};

export const restauranteSite = {
  caminho: raiz,
  nome: "Cozinha do Ingá",
  oQueFaz: "Restaurante de almoço",
  endereco: {
    logradouro: "Rua Tiradentes",
    numero: "000",
    bairro: "Ingá",
    cidade: "Niterói",
    uf: "RJ",
    cep: "24220-480",
  },
  /** O ponto do mapa (a Rua Tiradentes, no Ingá; o CEP e o ponto conferidos no OpenStreetMap em 09/10; o número é fictício). */
  ponto: { latitude: -22.9014, longitude: -43.1246 },
  prazoDeResposta: "Resposta em até 15 minutos, no horário de funcionamento.",
  acao: {
    rotulo: "Fazer o pedido",
    curto: "Fazer o pedido",
    whatsapp: "Pedir pelo WhatsApp",
    mensagem: "Olá. Gostaria de fazer um pedido.",
  },
  telefone: { rotulo: "Ou ligue:" },
  novaAba: ", abre em nova aba",
} as const;

export const paginas: readonly PaginaDaCasa[] = [
  {
    id: "inicio",
    caminho: raiz,
    rotulo: "Início",
    titulo: "Cozinha do Ingá",
    descricao: "Almoço de segunda a sábado no Ingá, em Niterói: o prato do dia de hoje, o cardápio com preço e porção, e o pedido com o total.",
  },
  {
    id: "cardapio",
    caminho: `${raiz}/cardapio`,
    rotulo: "Cardápio",
    titulo: "O cardápio",
    descricao: "Pratos, guarnições, sobremesas e bebidas, com a porção, o preço e os alérgenos que a casa declara.",
    naBarra: true,
  },
  {
    id: "pedido",
    caminho: `${raiz}/pedido`,
    rotulo: "Pedido",
    titulo: "Fazer o pedido",
    descricao: "Escolha os pratos e o bairro: o frete entra discriminado e o total aparece antes de enviar pelo WhatsApp.",
    naBarra: true,
  },
  {
    id: "cozinha",
    caminho: `${raiz}/a-cozinha`,
    rotulo: "A cozinha",
    titulo: "A cozinha e o quadro da semana",
    descricao: "O prato do dia de cada dia da semana, como fica no quadro, e o que a cozinha faz e não faz.",
    naBarra: true,
  },
  {
    id: "encomendas",
    caminho: `${raiz}/encomendas`,
    rotulo: "Encomendas",
    titulo: "Encomendas e eventos",
    descricao: "As marmitas da semana e o almoço para grupos, pedidos por mensagem com a data e o número de pessoas.",
    naBarra: true,
  },
  {
    id: "onde",
    caminho: `${raiz}/onde`,
    rotulo: "Onde",
    titulo: "Onde fica e o horário",
    descricao: "Rua Tiradentes, no Ingá: o horário dia a dia, a retirada no balcão e os bairros de entrega.",
    naBarra: true,
  },
  {
    id: "privacidade",
    caminho: `${raiz}/privacidade`,
    rotulo: "Aviso de privacidade",
    titulo: "Aviso de privacidade",
    descricao: "O que este site de demonstração guarda: nada. O pedido é montado no aparelho e sai pelo WhatsApp.",
    legal: true,
  },
  {
    id: "acessibilidade",
    caminho: `${raiz}/acessibilidade`,
    rotulo: "Acessibilidade",
    titulo: "Declaração de acessibilidade",
    descricao: "O padrão seguido, o que foi verificado e as limitações conhecidas deste site de demonstração.",
    legal: true,
  },
];

/** O horário (briefing, seção 3): de segunda a sexta, das 11h às 15h30; no sábado, até as 16h; domingo, fechado. */
export const expediente: Expediente = {
  0: [],
  1: [{ abre: "11:00", fecha: "15:30" }],
  2: [{ abre: "11:00", fecha: "15:30" }],
  3: [{ abre: "11:00", fecha: "15:30" }],
  4: [{ abre: "11:00", fecha: "15:30" }],
  5: [{ abre: "11:00", fecha: "15:30" }],
  6: [{ abre: "11:00", fecha: "16:00" }],
};
export const fechamentos: readonly Fechamento[] = feriadosNacionais;

export type Alergeno = "glúten" | "lactose" | "ovo" | "peixe" | "mostarda";

export type Item = {
  id: string;
  nome: string;
  descricao?: string;
  /** "450 g", "400 ml". */
  porcao: string;
  /** Em centavos. */
  preco: number;
  alergenos: readonly Alergeno[];
};

export type Grupo = { id: string; nome: string; itens: readonly Item[] };

/** O cardápio fixo, por grupo (briefing, seção 2): a descrição curta, a porção, o preço e os alérgenos declarados. */
export const cardapio: readonly Grupo[] = [
  {
    id: "pratos",
    nome: "Pratos",
    itens: [
      { id: "bife", nome: "Bife acebolado", descricao: "Contrafilé grelhado, cebola na chapa, arroz, feijão e batata frita", porcao: "450\u00a0g", preco: 3800, alergenos: [] },
      { id: "frango", nome: "Frango assado", descricao: "Sobrecoxa assada com ervas, arroz, feijão e farofa de cebola", porcao: "450\u00a0g", preco: 3400, alergenos: ["glúten"] },
      { id: "peixe", nome: "Peixe grelhado", descricao: "Filé de pescada, arroz com brócolis e purê de batata", porcao: "420\u00a0g", preco: 4200, alergenos: ["peixe", "lactose"] },
      { id: "omelete", nome: "Omelete da casa", descricao: "Três ovos, queijo minas e tomate, com salada verde", porcao: "380\u00a0g", preco: 2900, alergenos: ["ovo", "lactose"] },
      { id: "escondidinho", nome: "Escondidinho de carne-seca", descricao: "Purê de aipim gratinado com carne-seca desfiada", porcao: "400\u00a0g", preco: 3600, alergenos: ["lactose"] },
      { id: "salada", nome: "Salada completa", descricao: "Folhas, grão-de-bico, ovo cozido, tomate e molho de mostarda", porcao: "350\u00a0g", preco: 2800, alergenos: ["ovo", "mostarda"] },
    ],
  },
  {
    id: "guarnicoes",
    nome: "Guarnições",
    itens: [
      { id: "arroz", nome: "Arroz", descricao: "Branco, soltinho", porcao: "200\u00a0g", preco: 700, alergenos: [] },
      { id: "feijao", nome: "Feijão", descricao: "Carioca, temperado na casa", porcao: "200\u00a0g", preco: 700, alergenos: [] },
      { id: "fritas", nome: "Batata frita", descricao: "Corte palito", porcao: "200\u00a0g", preco: 1200, alergenos: [] },
      { id: "farofa", nome: "Farofa de cebola", descricao: "Mandioca torrada com cebola e manteiga", porcao: "100\u00a0g", preco: 600, alergenos: ["lactose"] },
    ],
  },
  {
    id: "sobremesas",
    nome: "Sobremesas",
    itens: [
      { id: "pudim", nome: "Pudim de leite", descricao: "Fatia", porcao: "120\u00a0g", preco: 1200, alergenos: ["ovo", "lactose"] },
      { id: "abobora", nome: "Doce de abóbora com coco", descricao: "Pote", porcao: "150\u00a0g", preco: 1000, alergenos: [] },
      { id: "frutas", nome: "Salada de frutas", descricao: "Frutas da estação", porcao: "250\u00a0g", preco: 1100, alergenos: [] },
    ],
  },
  {
    id: "bebidas",
    nome: "Bebidas",
    itens: [
      { id: "suco", nome: "Suco do dia", descricao: "Fruta da feira, sem açúcar adicionado", porcao: "400\u00a0ml", preco: 1000, alergenos: [] },
      { id: "refrigerante", nome: "Refrigerante em lata", porcao: "350\u00a0ml", preco: 700, alergenos: [] },
      { id: "agua", nome: "Água mineral", descricao: "Com ou sem gás", porcao: "500\u00a0ml", preco: 500, alergenos: [] },
      { id: "cafe", nome: "Café coado", porcao: "80\u00a0ml", preco: 400, alergenos: [] },
    ],
  },
];

export type PratoDoDia = Item & { curto: string };

/** O prato do dia (briefing, seção 2), de segunda a sábado; muda com a feira e pode mudar. Domingo, fechado. */
export const pratosDoDia: Record<Dia, PratoDoDia | null> = {
  0: null,
  1: { id: "dia-1", nome: "Carne assada com batata e cenoura, arroz e feijão", curto: "Carne assada", porcao: "450\u00a0g", preco: 3600, alergenos: [] },
  2: { id: "dia-2", nome: "Frango ensopado com quiabo e angu", curto: "Frango com quiabo", porcao: "450\u00a0g", preco: 3300, alergenos: ["lactose"] },
  3: { id: "dia-3", nome: "Feijoada com arroz, couve, farofa e laranja", curto: "Feijoada", porcao: "500\u00a0g", preco: 4200, alergenos: ["glúten", "lactose"] },
  4: { id: "dia-4", nome: "Picadinho com arroz, feijão e banana à milanesa", curto: "Picadinho", porcao: "450\u00a0g", preco: 3700, alergenos: ["glúten", "ovo"] },
  5: { id: "dia-5", nome: "Moqueca de peixe com arroz e pirão", curto: "Moqueca de peixe", porcao: "450\u00a0g", preco: 4400, alergenos: ["peixe"] },
  6: { id: "dia-6", nome: "Feijoada com arroz, couve, farofa e laranja", curto: "Feijoada", porcao: "500\u00a0g", preco: 4200, alergenos: ["glúten", "lactose"] },
};

export type Bairro = { id: string; nome: string; frete: number; tempo: string };

/** A entrega própria (briefing, seção 12): o frete e o tempo de cada bairro. */
export const bairros: readonly Bairro[] = [
  { id: "inga", nome: "Ingá", frete: 500, tempo: "25 a 35 min" },
  { id: "boa-viagem", nome: "Boa Viagem", frete: 600, tempo: "30 a 40 min" },
  { id: "sao-domingos", nome: "São Domingos e Gragoatá", frete: 600, tempo: "30 a 40 min" },
  { id: "centro", nome: "Centro", frete: 700, tempo: "30 a 45 min" },
  { id: "icarai", nome: "Icaraí", frete: 700, tempo: "30 a 45 min" },
  { id: "santa-rosa", nome: "Santa Rosa", frete: 900, tempo: "40 a 50 min" },
];

export const entrega = {
  /** O pedido mínimo para entrega, sem o frete, em centavos. */
  minimo: 3000,
  retirada: "Retirada no balcão: sem frete, pronta em 20 minutos.",
  pagamento: ["Pix", "Cartão de débito ou de crédito, na entrega ou no balcão", "Dinheiro, com o troco avisado no pedido"],
};

export const nomeDoDia = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"] as const;

/** "Glúten, lactose" no rodapé do prato; sem alérgeno declarado, a frase da casa. */
export const alergenosEmTexto = (a: readonly Alergeno[]) => (a.length ? `Alérgenos: ${a.join(", ")}.` : "Sem alérgeno declarado.");

/** A lousa da capa e do quadro da semana. */
export const lousa = {
  hoje: (dia: string) => `Hoje, ${dia.toLowerCase()}`,
  domingo: "Domingo: fechado",
  amanha: "Amanhã tem",
};

export const capa = {
  lugar: "Almoço de segunda a sábado, no Ingá",
  titulo: "Feito na panela, no mesmo dia.",
  lide: "O prato do dia sai da feira da manhã e fica escrito no quadro. Cada prato diz a porção e o preço; o total aparece antes de enviar.",
  pedirODia: "Pedir o prato do dia",
  mensagemDoDia: (prato: string) => `Olá. Gostaria de pedir o prato do dia: ${prato}.`,
  montar: "Fazer o pedido completo",
};

export const resumoDoCardapio = {
  titulo: "O cardápio, todo dia",
  lide: "Além do prato do dia, o cardápio fixo, com a porção e o preço. Os alérgenos de cada prato estão no cardápio inteiro.",
  ver: "Ver o cardápio inteiro",
};

export const comoPedir = {
  titulo: "O pedido chega com o total",
  /** O alto da comanda da cena. */
  comanda: "A comanda",
  passos: [
    { titulo: "Escolha os pratos", texto: "Do cardápio e do prato do dia, com a quantidade de cada um." },
    { titulo: "Escolha o bairro ou a retirada", texto: "O frete do bairro entra à parte, discriminado; no balcão, sem frete." },
    { titulo: "Envie pelo WhatsApp", texto: "A mensagem sai pronta, com os itens, o frete e o total, para conferir antes de mandar." },
  ],
  fretes: "O frete por bairro",
  minimo: (v: string) => `Pedido mínimo para entrega: ${v}, sem o frete.`,
  montar: "Fazer o pedido",
};

export const ausencias = {
  titulo: "O que a casa não faz",
  itens: [
    { fato: "Não congela o prato do dia.", motivo: "Ele é feito de manhã e acaba no almoço." },
    { fato: "Não faz prato “sem glúten”.", motivo: "A cozinha manipula trigo: quem tem doença celíaca pergunta antes." },
    { fato: "Não entrega fora da lista de bairros.", motivo: "O tempo de entrega só vale para os bairros com frete publicado." },
    { fato: "Não está no aplicativo de entrega.", motivo: "O pedido vem direto, pelo WhatsApp, com o mesmo preço do balcão." },
  ],
};

export const horarioEOnde = {
  titulo: "Horário e endereço",
  endereco: "Endereço",
  horario: "Horário",
  copiar: "Copiar o endereço",
  verNoMapa: "Ver no mapa",
  comoChegar: "Como chegar e os bairros de entrega",
  estadoSemScript: "Segunda a sexta, das 11h às 15h30; sábado, das 11h às 16h.",
  credito: "Dados do mapa: © colaboradores do OpenStreetMap.",
};

export const chamada = {
  titulo: "O almoço de hoje está no quadro.",
  texto: "Monte o pedido com o total ou mande uma mensagem com o que quer.",
};

export const cardapioPagina = {
  /** O cabeçalho da folha, como no cardápio impresso do balcão. */
  cabecalho: "Almoço de segunda a sábado",
  lide: "A porção e o preço de cada prato, e os alérgenos que a casa declara.",
  pratoDoDia: "O prato do dia",
  trigo: "A cozinha manipula trigo, no salão e nas panelas. Quem tem doença celíaca pergunta antes de pedir.",
  pedir: "Fazer o pedido",
};

export const pedidoPagina = {
  lide: "Escolha os pratos e a entrega. O frete do bairro entra discriminado, e o total aparece antes de enviar; a comanda só sai do aparelho no envio.",
  oPedido: "O pedido",
  vazio: "Nenhum item escolhido.",
  /** Os rótulos dos botões e do contador, com o marcador {nome} (vão à ilha, que os troca). */
  quantidade: "Quantidade de {nome}",
  mais: "Mais um: {nome}",
  menos: "Menos um: {nome}",
  entrega: "Entrega ou retirada",
  retirada: "Retirada no balcão",
  entregaNo: "Entrega no bairro",
  bairro: "Bairro",
  pagamento: "Pagamento",
  observacao: "Observação (opcional)",
  subtotal: "Subtotal",
  frete: "Frete",
  total: "Total",
  semFrete: "sem frete",
  /** Com o marcador {falta}. */
  abaixoDoMinimo: "Faltam {falta} para o pedido mínimo de entrega.",
  enviar: "Enviar pelo WhatsApp",
  copiar: "Copiar o pedido",
  /** A tira da comanda, presa embaixo no celular: quantos itens, o total e o caminho até a comanda. */
  tira: { item: "item", itens: "itens", conferir: "Conferir e enviar" },
  semScript: "Sem JavaScript, o pedido se faz por mensagem: os pratos, a quantidade e o bairro.",
  /** Os rótulos da mensagem do WhatsApp. */
  mensagem: {
    abertura: "Olá. Pedido pelo site:",
    subtotal: "Subtotal",
    /** Com o marcador {bairro}. */
    entrega: "Entrega no bairro {bairro}",
    retirada: "Retirada no balcão",
    total: "Total",
    pagamento: "Pagamento",
    observacao: "Observação",
  },
  hoje: (dia: string) => `Prato do dia de ${dia.toLowerCase()}`,
  fretes: "O frete por bairro",
  pagamentos: "Formas de pagamento",
};

export const cozinhaPagina = {
  lide: "O prato do dia de cada dia da semana, como fica escrito no quadro. A feira da manhã decide, e o quadro pode mudar.",
  setas: { anterior: "Dia anterior", proximo: "Próximo dia" },
  rotuloDaFila: "O prato do dia de segunda a sábado",
};

export const encomendasPagina = {
  lide: "As marmitas da semana e o almoço para grupos. O pedido sai por mensagem, com a data e o número de pessoas; nada é gravado neste site.",
  marmitas: {
    titulo: "As marmitas da semana",
    texto: "O prato do dia de segunda a sexta, encomendado até a sexta anterior: uma marmita de 450 g por dia, entregue no almoço ou retirada no balcão. A casa não congela o prato do dia.",
    pedir: "Encomendar as marmitas",
    /** O rótulo da lousa das marmitas. */
    lousa: "De segunda a sexta",
    mensagem: "Olá. Gostaria de encomendar as marmitas da semana (segunda a sexta).",
  },
  eventos: {
    titulo: "Almoço para grupos",
    texto: "De 10 a 40 pessoas, no salão (no sábado) ou para levar. A resposta sai em até um dia útil, com o cardápio e o valor por pessoa.",
    data: "Data",
    pessoas: "Número de pessoas",
    onde: "No salão ou para levar",
    opcoes: ["No salão (sábado)", "Para levar"],
    pedir: "Enviar o pedido pelo WhatsApp",
    copiar: "Copiar a mensagem",
    /** A mensagem, com os marcadores {data}, {pessoas} e {onde} (a ilha os troca; vazio vira "a combinar"). */
    mensagem: "Olá. Gostaria de um orçamento de almoço para grupo. Data: {data}. Pessoas: {pessoas}. {onde}.",
    aCombinar: "a combinar",
  },
};

export const ondePagina = {
  lide: "Na Rua Tiradentes, no Ingá. A retirada no balcão não tem frete; a entrega vai aos bairros da lista.",
  horarioDiaADia: "O horário dia a dia",
  feriados: "Feriados: fechado.",
  bairros: "Os bairros de entrega",
  retirada: "A retirada",
};

export const barra = { navegacao: "Páginas do restaurante" };

/** A porta de vidro do salão (o cabeçalho): a plaquinha pendurada que vira com o estado ao vivo. */
export const porta = {
  aberto: "Aberto",
  fechado: "Fechado",
  descricao: "Restaurante de almoço no Ingá",
  /** A linha curta do estado, embaixo da plaquinha: o que vem depois de "Aberto agora, ". */
  hoje: "Hoje:",
  /** O gatilho do menu de tela cheia, no celular, e o botão que o fecha. */
  menu: "Menu",
  fechar: "Fechar o menu",
};

/** O quadro da semana, de parede a parede, na capa. */
export const quadroDaSemana = {
  titulo: "A semana no quadro",
  hoje: "hoje",
  ver: "A cozinha e o quadro de cada dia",
};

export const rodape = {
  paginas: "Páginas",
  contato: "Contato",
  whatsapp: "WhatsApp",
  /** O mesmo número atende a mensagem e a ligação. */
  telefone: "WhatsApp e telefone:",
  cardapio: "O cardápio",
};

export type BlocoLegal = { titulo: string; paragrafos?: readonly string[]; itens?: readonly string[] };
export type TextoLegal = { abertura: readonly string[]; blocos: readonly BlocoLegal[]; data: string };

/** O aviso de privacidade do site de demonstração (o mesmo modelo da odontologia): sem coleta, sem operador. */
export const avisoDePrivacidade: TextoLegal = {
  abertura: ["A Cozinha do Ingá é um estabelecimento fictício, criado pela Atlas Digital para demonstração.", "Nenhum dado pessoal de quem visita é coletado por este site."],
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
      titulo: "O pedido, as encomendas e o WhatsApp",
      paragrafos: [
        "O pedido e o pedido de encomenda são montados no próprio aparelho, a partir das opções escolhidas. A mensagem só sai quando se toca no botão do WhatsApp, e nada é enviado a este site.",
        "A conversa acontece no aplicativo, sob os termos dele.",
      ],
    },
    { titulo: "Com quem algum dado é compartilhado", paragrafos: ["Com ninguém. A hospedagem do site é da Hostinger International Ltd., que guarda os registros de acesso descritos acima."] },
    {
      titulo: "Direitos e contato",
      paragrafos: [
        "A LGPD (art. 18) garante a confirmação de que há tratamento, o acesso, a correção, a eliminação e a informação sobre o compartilhamento.",
        "Num site real, o pedido vai ao canal de privacidade do restaurante. Neste, fictício, não há dado a pedir.",
      ],
    },
    { titulo: "Segurança e mudanças neste aviso", paragrafos: ["O site usa conexão cifrada (HTTPS). Se passar a tratar dados de outra forma, este aviso muda antes, com a nova data."] },
  ],
  data: "09.10.2026",
};

/** A declaração de acessibilidade: só o que foi medido, com a data (atualizada a cada verificação). */
export const declaracaoDeAcessibilidade: TextoLegal = {
  abertura: ["Este site quer poder ser usado por qualquer pessoa.", "Inclusive por quem usa leitor de tela ou só o teclado.", "E por quem amplia o texto ou prefere menos movimento."],
  blocos: [
    {
      titulo: "O padrão seguido",
      paragrafos: ["O site segue as Diretrizes de Acessibilidade para Conteúdo Web (WCAG) 2.2, no nível AA.", "É o padrão do Atlas para a Lei Brasileira de Inclusão (Lei 13.146/2015, art. 63)."],
    },
    {
      titulo: "O que foi verificado em 09.10.2026",
      itens: [
        "o contraste do texto com o fundo, medido na tela de 320 a 1920 px;",
        "a navegação pelo teclado, com o foco sempre visível;",
        "o montador de pedido, que se usa só pelo teclado;",
        "os alvos de toque, de pelo menos 44 px;",
        "o site sem JavaScript e com movimento reduzido.",
      ],
    },
    { titulo: "Limitações conhecidas", itens: ["ninguém leu o site com leitor de tela ainda;", "a lousa é desenho: o prato do dia também está em texto."] },
    { titulo: "Encontrou uma barreira?", paragrafos: ["Num site real, a mensagem vai ao WhatsApp do restaurante.", "Este site é de demonstração."] },
  ],
  data: "09.10.2026",
};

export const legal = { data: (d: string) => `Atualizado em ${d}.` };

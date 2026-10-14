// Banho e Tosa São Francisco: o site de banho e tosa do plano Essencial no simulador de planos (desde 13/10, o 3º dos
// nove sites novos; components/secoes/escada.tsx). Banho e tosa de cão, fictício, em São Francisco (Niterói), sem
// veterinário: sem conselho, e o preço pode ser publicado. Cada fato sai do briefing fictício
// (registros/demos/pet-shop/briefing.md, fora do git); nada se acrescenta a ele. O preço publicado vincula (CDC, art. 30):
// aqui, o selo de ficção avisa que nada é oferta, e a tabela traz "Valores de outubro de 2026". O que cada serviço
// compreende, a duração, o leva e traz discriminado à parte e as condições (os bairros, os dias, o pelo com nó) vêm em
// português, como pedem o CDC (arts. 31 e 37) e o Decreto 7.962/2013 (art. 2º). Identidade "O cartão do balcão"
// (aprovada em 13/10 por Matheus Castro Oliveira de Luna Garcia): a cartolina amarela impressa numa tinta só, o carimbo
// violeta onde a mão age; Anybody e Overpass. Texto impessoal, com o peso, o minuto e o valor; sem diminutivo, sem
// superlativo, sem a voz do cachorro. Valores em centavos; durações em minutos.

import type { Expediente, Fechamento } from "@/lib/demos/relogio";

import { feriadosNacionais } from "./comum";

const raiz = "/demos/petshop";

export type IdDaPagina = "inicio" | "servicos" | "onde" | "privacidade" | "acessibilidade";

export type PaginaDoCartao = {
  id: IdDaPagina;
  caminho: string;
  /** O nome na tira de cima e no rodapé. */
  rotulo: string;
  /** O título da página (o `h1`, quando a página não escreve outro), sem a marca. */
  titulo: string;
  /** A meta description, até ~125 caracteres; os metadados acrescentam "Estabelecimento fictício.". */
  descricao: string;
  naBarra?: boolean;
  legal?: boolean;
};

export const petshopSite = {
  caminho: raiz,
  nome: "Banho e Tosa São Francisco",
  oQueFaz: "Banho e tosa de cão, com hora marcada",
  /** O que o negócio faz, nas palavras do dono (briefing, seção 1). */
  palavrasDoDono: "Banho e tosa de cão, com hora marcada. O preço está na tabela antes de o cachorro chegar.",
  /** As mesmas palavras logo abaixo do nome, na capa, sem o "Banho e tosa" que o nome acabou de dizer (lapidação, rodada 3). */
  depoisDoNome: "De cão, com hora marcada. O preço está na tabela antes de o cachorro chegar.",
  endereco: {
    logradouro: "Avenida Quintino Bocaiúva",
    numero: "000",
    bairro: "São Francisco",
    cidade: "Niterói",
    uf: "RJ",
    cep: "24360-022",
  },
  /** O ponto do mapa: a Avenida Quintino Bocaiúva no OpenStreetMap (Nominatim, 13/10/2026, via 330709487); o número é fictício. */
  ponto: { latitude: -22.9178, longitude: -43.0944 },
  prazoDeResposta: "Resposta em até 2 horas, no horário da casa; fora dele, na abertura seguinte.",
  /** A ação principal (uma só): pedir horário pelo WhatsApp, com a mensagem pronta. */
  acao: {
    rotulo: "Pedir horário",
    canal: "pelo WhatsApp",
    /** O carimbo claro da mensagem pronta (as cenas de tinta). */
    abrir: "Abrir o WhatsApp",
    abrirDetalhe: "com esta mensagem",
  },
  telefone: { rotulo: "Ou ligue:" },
  /** Quem atende (briefing, seção 1): os dois dão banho e tosam; o animal fica com um deles do começo ao fim. */
  pessoas: ["Rosa da Silva", "Paulo da Silva"],
  novaAba: ", abre em nova aba",
} as const;

export const paginas: readonly PaginaDoCartao[] = [
  {
    id: "inicio",
    caminho: raiz,
    rotulo: "Início",
    titulo: "Banho e Tosa São Francisco",
    descricao: "Banho e tosa de cão com hora marcada em São Francisco, Niterói: o preço por porte e pelagem e o leva e traz por bairro.",
  },
  {
    id: "servicos",
    caminho: `${raiz}/servicos`,
    rotulo: "Serviços e valores",
    titulo: "Serviços e valores",
    descricao: "O banho e a tosa por porte e pelagem, com o valor e a duração; os acréscimos, o pelo com nó e o leva e traz.",
    naBarra: true,
  },
  {
    id: "onde",
    caminho: `${raiz}/onde`,
    rotulo: "Onde",
    titulo: "Onde fica",
    descricao: "Avenida Quintino Bocaiúva, em São Francisco, Niterói: o horário dia a dia, o telefone, o WhatsApp e o prazo de resposta.",
    naBarra: true,
  },
  {
    id: "privacidade",
    caminho: `${raiz}/privacidade`,
    rotulo: "Aviso de privacidade",
    titulo: "Aviso de privacidade",
    descricao: "O que este site de demonstração guarda: nada. A mensagem de pedido de horário sai do aparelho pelo WhatsApp.",
    legal: true,
  },
  {
    id: "acessibilidade",
    caminho: `${raiz}/acessibilidade`,
    rotulo: "Declaração de acessibilidade",
    titulo: "Declaração de acessibilidade",
    descricao: "O padrão seguido, o que foi verificado e as limitações conhecidas deste site de demonstração.",
    legal: true,
  },
];

/** O horário (briefing, seção 3): de terça a sexta, das 9h às 18h; sábado, das 8h às 13h; domingo e segunda, fechado. */
export const expediente: Expediente = {
  0: [],
  1: [],
  2: [{ abre: "09:00", fecha: "18:00" }],
  3: [{ abre: "09:00", fecha: "18:00" }],
  4: [{ abre: "09:00", fecha: "18:00" }],
  5: [{ abre: "09:00", fecha: "18:00" }],
  6: [{ abre: "08:00", fecha: "13:00" }],
};
/** Feriados: fechado (briefing, seção 3). */
export const fechamentos: readonly Fechamento[] = feriadosNacionais;
export const feriados = "Feriados: fechado.";

/** A referência dos preços: o preço publicado obriga a casa (CDC, art. 30). */
export const valoresDe = "Valores de outubro de 2026";

export type PorteId = "pequeno" | "medio" | "grande";
export type Porte = { id: PorteId; nome: string; faixa: string; /** O limite de cima, em kg (o grande não tem). */ ateKg?: number };

/** As faixas de porte por peso (briefing, seção 12). O peso é medido na balança da recepção, na chegada. */
export const portes: readonly Porte[] = [
  { id: "pequeno", nome: "Pequeno", faixa: "até 10 kg", ateKg: 10 },
  { id: "medio", nome: "Médio", faixa: "de 10 a 25 kg", ateKg: 25 },
  { id: "grande", nome: "Grande", faixa: "acima de 25 kg" },
];
export const pesagem = "O peso é medido na balança da recepção, na chegada. O porte e o valor são confirmados antes de começar.";

export type PelagemId = "curta" | "longa" | "dupla" | "encaracolada";
export const pelagens: Record<PelagemId, string> = {
  curta: "Curta",
  longa: "Longa",
  dupla: "Dupla (com subpelo)",
  encaracolada: "Encaracolada",
};

/** Um preço da tabela: o valor, em centavos, e a duração, em minutos. */
export type Preco = { centavos: number; minutos: number };
/**
 * Uma linha da tabela: o preço por porte, ou a nota de quando não se faz (uma linha pode valer para duas pelagens). A
 * nota pode terminar num vínculo (o trecho que leva à razão, em outra página), escrito depois dela.
 */
export type Linha =
  | { pelagens: readonly PelagemId[]; precos: Record<PorteId, Preco> }
  | { pelagens: readonly PelagemId[]; nota: string; vinculo?: { rotulo: string; caminho: string } };
export type ServicoId = "banho" | "maquina" | "tesoura";
export type Servico = { id: ServicoId; nome: string; detalhe?: string; compreende: string; linhas: readonly Linha[] };

/** O que se vende (briefing, seção 2): o porte nas colunas, a pelagem nas linhas, o valor e a duração em cada célula. */
export const servicos: readonly Servico[] = [
  {
    id: "banho",
    nome: "Banho",
    compreende:
      "Pesagem, pente e desembaraço leve; banho com xampu neutro e água morna, com os ouvidos protegidos; secagem com toalha e secador morno, com escova; corte das unhas; limpeza externa dos ouvidos.",
    linhas: [
      { pelagens: ["curta"], precos: { pequeno: { centavos: 6000, minutos: 60 }, medio: { centavos: 8000, minutos: 90 }, grande: { centavos: 11000, minutos: 120 } } },
      { pelagens: ["longa"], precos: { pequeno: { centavos: 7000, minutos: 75 }, medio: { centavos: 9500, minutos: 105 }, grande: { centavos: 13000, minutos: 135 } } },
      { pelagens: ["dupla"], precos: { pequeno: { centavos: 7500, minutos: 90 }, medio: { centavos: 10500, minutos: 120 }, grande: { centavos: 14500, minutos: 165 } } },
      { pelagens: ["encaracolada"], precos: { pequeno: { centavos: 7500, minutos: 90 }, medio: { centavos: 10000, minutos: 120 }, grande: { centavos: 14000, minutos: 150 } } },
    ],
  },
  {
    id: "maquina",
    nome: "Tosa na máquina",
    detalhe: "com o banho",
    compreende: "O banho e o corte à máquina na altura combinada com o tutor, em milímetros.",
    linhas: [
      { pelagens: ["longa"], precos: { pequeno: { centavos: 11000, minutos: 120 }, medio: { centavos: 14500, minutos: 150 }, grande: { centavos: 19000, minutos: 180 } } },
      { pelagens: ["encaracolada"], precos: { pequeno: { centavos: 11500, minutos: 120 }, medio: { centavos: 15000, minutos: 150 }, grande: { centavos: 19500, minutos: 180 } } },
      { pelagens: ["curta"], nota: "Não se aplica: não há comprimento para tosar." },
      { pelagens: ["dupla"], nota: "Não se faz: ver", vinculo: { rotulo: "o que fica fora da tabela", caminho: `${raiz}#fora-da-tabela` } },
    ],
  },
  {
    id: "tesoura",
    nome: "Tosa na tesoura",
    detalhe: "com o banho",
    compreende: "O banho e o corte à tesoura, com o acabamento do rosto e das patas.",
    linhas: [
      { pelagens: ["longa"], precos: { pequeno: { centavos: 14000, minutos: 150 }, medio: { centavos: 18000, minutos: 180 }, grande: { centavos: 23000, minutos: 210 } } },
      { pelagens: ["encaracolada"], precos: { pequeno: { centavos: 15000, minutos: 150 }, medio: { centavos: 19500, minutos: 180 }, grande: { centavos: 24500, minutos: 210 } } },
      { pelagens: ["curta", "dupla"], nota: "Não se faz." },
    ],
  },
];

/** O banho por porte, com pelo curto (a lista da cena 2 e a amostra da capa: a primeira linha do banho). */
export const banhoPeloCurto = (servicos[0].linhas[0] as Extract<Linha, { precos: unknown }>).precos;

/** Os acréscimos ao banho (briefing, seção 2), como a casa os escreve. */
export const acrescimos: readonly { id: string; nome: string; compreende: string; valor: string; duracao: string }[] = [
  { id: "higienica", nome: "Tosa higiênica", compreende: "Patas, barriga e região íntima.", valor: "+ R$ 20,00, qualquer porte", duracao: "+ 15 min" },
  {
    id: "hidratacao",
    nome: "Hidratação",
    compreende: "Máscara de hidratação no pelo, depois do xampu.",
    valor: "+ R$ 30,00 no pequeno, + R$ 40,00 no médio, + R$ 50,00 no grande",
    duracao: "+ 20 min",
  },
  {
    id: "desembaraco",
    nome: "Desembaraço (pelo com nó)",
    compreende: "Os nós abertos com pente e escova, antes da água.",
    valor: "R$ 20,00 a cada 15 min, até 45 min (R$ 60,00), dito antes de começar",
    duracao: "15 a 45 min",
  },
];

/**
 * A condição do pelo com nó (briefing, seção 12: a frase literal), em partes: `marcado` é o trecho do marca-texto do
 * plano, uma vez no site (Serviços e valores); `inteira` é a frase de uma vez.
 */
const no = {
  chegada: "Pelo com nó passa pelo pente na chegada. Se precisar de desembaraço, o valor é dito",
  marcado: "antes de começar",
  valor: "R$ 20,00 a cada 15 minutos, até 45 minutos.",
  pele: "Com nó junto à pele, a casa propõe a tosa curta, que só se faz com o aceite do tutor.",
};
export const condicaoDoNo = { ...no, inteira: `${no.chegada} ${no.marcado}: ${no.valor} ${no.pele}` };

/** O que o negócio não faz (briefing, seção 2), com a razão de cada um: `item` é o nome curto, na lista "Fora da tabela". */
export const ausencias = {
  titulo: "Fora da tabela",
  itens: [
    { item: "Gato", fato: "Não atende gato.", razao: "A mesa, o secador e a rotina da casa são feitos para cão." },
    {
      item: "Pelo duplo raspado à máquina",
      fato: "Não raspa à máquina o pelo duplo.",
      razao: "O subpelo protege do sol e do calor e pode não voltar igual; nesse pelo, a casa faz o banho e a tosa higiênica.",
    },
    { item: "Tosa de exposição", fato: "Não faz tosa de exposição.", razao: "Ela pede o padrão da raça e mais horas de mesa; a casa faz a tosa do dia a dia." },
    { item: "Preço mudado depois do banho", fato: "Não muda o preço depois do banho.", razao: "O valor é dito antes de começar, com o peso medido na chegada." },
  ],
};

/** Como o animal é tratado (briefing, seção 2). */
export const tratamento = {
  sedacao: "Sem sedação: a sedação é ato veterinário, e a casa não tem veterinário.",
  /** O mesmo fato, sem a razão: a frase do Início, cena 3, com `umaPessoaCurta` (identidade, seção 4.12). */
  semSedacao: "Sem sedação.",
  umaPessoa: "Uma pessoa só cuida do animal do pente à entrega.",
  /** O mesmo fato sem "do pente à entrega", ao lado do título que já o diz (o Início, cena 3; identidade, seção 4.12). */
  umaPessoaCurta: "Uma pessoa só cuida do animal, do começo ao fim.",
  nos: "O tutor vê os nós no balcão, antes da água.",
};

/** Os três diferenciais (briefing, seção 1). */
export const diferenciais = [
  "O animal é pesado na balança da recepção. O porte e o valor são confirmados antes de começar, e o preço não muda depois do banho.",
  "Leva e traz com dia fixo por bairro e janela de uma hora: busca das 9h às 10h e entrega das 16h às 17h, de terça a sexta. No sábado, só em São Francisco: busca das 8h às 9h e entrega das 12h às 13h.",
  "Cada animal fica com uma pessoa só, do pente à entrega, sem sedação. Volta para casa com o cartão de entrega: o peso medido, o porte, a pelagem, o serviço feito, o valor cobrado e a hora em que ficou pronto.",
] as const;

/**
 * O cartão de entrega, que volta com o animal (briefing, seção 1, diferencial 3): `itens`, como a frase diz; `campos`,
 * os mesmos seis como a casa os imprime no cartão (o Início, cena 3, preenche o do exemplo e deixa em branco o que o
 * exemplo não diz: o peso medido e a hora).
 */
export const cartaoDeEntrega = {
  nome: "Cartão de entrega",
  volta: "Volta com o animal.",
  itens: ["o peso medido", "o porte", "a pelagem", "o serviço feito", "o valor cobrado", "a hora em que ficou pronto"],
  campos: { peso: "Peso medido", porte: "Porte", pelagem: "Pelagem", servico: "Serviço feito", valor: "Valor cobrado", hora: "Pronto às" },
};

/**
 * A linha do atendimento: o banho por etapas, no exemplo da página inicial (briefing, seção 2: porte médio, pelo curto,
 * 1 h 30). A soma dos minutos é a duração da tabela (90). O que se faz em cada etapa vem do que o banho compreende.
 */
export const atendimento = {
  exemplo: "Exemplo: porte médio, pelo curto, banho. 1 h 30, como na tabela.",
  etapas: [
    { nome: "Pesagem e pente", minutos: 10, oQue: "Na balança da recepção; o tutor vê os nós no balcão, antes da água." },
    { nome: "Banho", minutos: 25, oQue: "Xampu neutro e água morna, com os ouvidos protegidos." },
    { nome: "Secagem", minutos: 35, oQue: "Toalha e secador morno, com escova." },
    { nome: "Unhas e ouvidos", minutos: 15, oQue: "Corte das unhas e limpeza externa dos ouvidos." },
    { nome: "Conferência e entrega", minutos: 5, oQue: "O cartão de entrega vai com o animal." },
  ],
};

export type BairroId = "sao-francisco" | "charitas" | "cachoeiras" | "icarai" | "santa-rosa" | "vital-brazil";

/** O leva e traz (briefing, seção 12): ida e volta, por animal; só os bairros que fazem divisa com São Francisco. */
export const levaETraz = {
  titulo: "Leva e traz",
  condicao: "Ida e volta, por animal; só os bairros que fazem divisa com São Francisco.",
  fora: "Fora desses bairros, não há leva e traz: a janela de uma hora só se cumpre perto.",
  janela: "Busca das 9h às 10h; entrega das 16h às 17h.",
  bairros: [
    {
      id: "sao-francisco",
      nome: "São Francisco",
      dias: "Terça a sábado",
      janela: "Busca das 9h às 10h e entrega das 16h às 17h; no sábado, busca das 8h às 9h e entrega das 12h às 13h",
      centavos: 1500,
    },
    { id: "charitas", nome: "Charitas", dias: "Terça e quinta", janela: "Busca das 9h às 10h; entrega das 16h às 17h", centavos: 2200 },
    { id: "cachoeiras", nome: "Cachoeiras", dias: "Terça e quinta", janela: "Busca das 9h às 10h; entrega das 16h às 17h", centavos: 2200 },
    { id: "icarai", nome: "Icaraí", dias: "Quarta e sexta", janela: "Busca das 9h às 10h; entrega das 16h às 17h", centavos: 2200 },
    { id: "santa-rosa", nome: "Santa Rosa", dias: "Quarta e sexta", janela: "Busca das 9h às 10h; entrega das 16h às 17h", centavos: 2200 },
    { id: "vital-brazil", nome: "Vital Brazil", dias: "Quarta e sexta", janela: "Busca das 9h às 10h; entrega das 16h às 17h", centavos: 2200 },
  ] satisfies readonly { id: BairroId; nome: string; dias: string; janela: string; centavos: number }[],
};

/** A forma de pagamento (briefing, seção 2). */
export const pagamento = {
  formas: ["Pix", "Cartão de débito", "Cartão de crédito à vista", "Dinheiro"],
  quando: "Pago na entrega do animal, com o leva e traz somado e discriminado.",
};

/**
 * A mensagem pronta do WhatsApp (briefing, seção 5): o pedido de horário, com as lacunas que o tutor preenche. Vai assim
 * mesmo no vínculo: a conversa abre com ela escrita, e as lacunas ficam para completar antes de enviar.
 */
export const mensagemPronta =
  "Pedido de horário, Banho e Tosa São Francisco. Nome do animal: ___. Porte e peso: ___. Pelagem: ___. Serviço: ___. Leva e traz: ___. Ciente de que pelo com nó pode pedir desembaraço, com o valor dito antes de começar.";

/** Os textos da interface comum (a tira, o rodapé, o mapa, a página que não existe). */
export const tira = { navegacao: "Páginas do Banho e Tosa São Francisco", pausa: "Pausar o movimento", menu: "Abrir o menu", fechar: "Fechar o menu" };
export const rodape = { telefone: "WhatsApp e telefone:", legais: "Avisos" };
export const mapa = {
  rotulo: "Mapa de São Francisco, em Niterói, com a casa na Avenida Quintino Bocaiúva e os bairros do leva e traz.",
  /** O mapa de perto, sem os bairros (Onde). */
  rotuloDePerto: "Mapa das ruas em volta da casa, na Avenida Quintino Bocaiúva, em São Francisco, Niterói.",
  credito: "Dados do mapa: © colaboradores do OpenStreetMap.",
  /** O vínculo para o mapa externo, com rótulo próprio (decisões, 13/10: "Ver no mapa" se repete em outros sites). */
  abrir: "Abrir a avenida no OpenStreetMap",
};
export const naoEncontrada = { titulo: "Esta página não está no cartão.", voltar: "Voltar ao início", erro: "Esta página não abriu.", tentar: "Tentar de novo" };

export type BlocoLegal = { titulo: string; paragrafos?: readonly string[]; itens?: readonly string[] };
export type TextoLegal = { abertura: readonly string[]; blocos: readonly BlocoLegal[]; data: string };

/** O aviso de privacidade do site de demonstração (o mesmo modelo dos outros sites de exemplo): sem coleta, sem operador. */
export const avisoDePrivacidade: TextoLegal = {
  abertura: ["O Banho e Tosa São Francisco é um estabelecimento fictício, criado pela Atlas Digital para demonstração.", "Nenhum dado pessoal de quem visita é coletado por este site."],
  blocos: [
    {
      titulo: "O que este site guarda no aparelho",
      paragrafos: [
        "Nada. O site não usa cookies nem ferramentas de analítica ou de publicidade, e nenhuma informação é gravada no navegador.",
        "Fontes, imagens e scripts saem do próprio endereço do site, sem contato com servidores de terceiros. O mapa é um desenho fixo, feito uma vez com dados do OpenStreetMap.",
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
      titulo: "O pedido de horário e o WhatsApp",
      paragrafos: [
        "O carimbo de pedir horário abre o WhatsApp com uma mensagem pronta, escrita no próprio site. Nada é enviado a este site: a mensagem só sai quando é enviada no aplicativo.",
        "A conversa acontece no aplicativo, sob os termos dele.",
      ],
    },
    { titulo: "Com quem algum dado é compartilhado", paragrafos: ["Com ninguém. A hospedagem do site é da Hostinger International Ltd., que guarda os registros de acesso descritos acima."] },
    {
      titulo: "Direitos e contato",
      paragrafos: [
        "A LGPD (art. 18) garante a confirmação de que há tratamento, o acesso, a correção, a eliminação e a informação sobre o compartilhamento.",
        "Num site real, o pedido vai ao canal de privacidade da casa. Neste, fictício, não há dado a pedir.",
      ],
    },
    { titulo: "Segurança e mudanças neste aviso", paragrafos: ["O site usa conexão cifrada (HTTPS). Se passar a tratar dados de outra forma, este aviso muda antes, com a nova data."] },
  ],
  data: "13.10.2026",
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
      titulo: "O que foi verificado em 13.10.2026",
      itens: [
        "o contraste do texto com o fundo;",
        "a navegação pelo teclado, com o foco sempre visível;",
        "as tabelas de valores, lidas como tabela, com o porte e a pelagem nos cabeçalhos;",
        "o botão que pausa o movimento da capa;",
        "o site sem JavaScript e com movimento reduzido.",
      ],
    },
    {
      titulo: "Limitações conhecidas",
      itens: ["ninguém leu o site com leitor de tela ainda;", "o mapa é desenho: o endereço, o horário e os bairros do leva e traz também estão em texto."],
    },
    { titulo: "Encontrou uma barreira?", paragrafos: ["Num site real, a mensagem vai ao WhatsApp da casa.", "Este site é de demonstração."] },
  ],
  data: "13.10.2026",
};

export const legal = { data: (d: string) => `Atualizado em ${d}.` };

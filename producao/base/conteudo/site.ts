// conteudo/site.ts — as páginas e os textos do site, como dados (producao/esteira/10-texto-e-conteudo.md;
// producao/esteira/13-tecnologia-e-estrutura.md, seção 3.2). Mudar um texto não mexe em JSX.
// Conteúdo de fábrica: o site de exemplo de um banho e tosa no Essencial (producao/esteira/nichos/pet-shop.md).

export type Pagina = {
  id: "inicio" | "servicos" | "onde" | "privacidade" | "acessibilidade";
  caminho: string;
  /** O nome no menu. */
  rotulo: string;
  /** O título da página, sem a marca (os metadados a acrescentam). */
  titulo: string;
  /** O og:title, curto e sem a marca (WhatsApp). */
  tituloCurto: string;
  /** A meta description, até ~155 caracteres. */
  descricao: string;
  /** O og:description, ~80 caracteres. */
  descricaoCurta: string;
  /** Página legal: fora do menu e do limite de páginas do plano (producao/esteira/03-planos.md, seção 2). */
  legal?: boolean;
};

export const paginas: readonly Pagina[] = [
  {
    id: "inicio",
    caminho: "/",
    rotulo: "Início",
    titulo: "Banho e Tosa Fonseca · banho e tosa no Fonseca, Niterói",
    tituloCurto: "Banho e tosa no Fonseca",
    descricao: "Banho, tosa na máquina e tosa na tesoura no Fonseca, em Niterói, com o valor e o tempo por porte e pelagem.",
    descricaoCurta: "Valor e tempo por porte e pelagem, no Fonseca.",
  },
  {
    id: "servicos",
    caminho: "/servicos",
    rotulo: "Serviços e valores",
    // O título diz o que a página tem e onde, nunca só o rótulo do menu (producao/esteira/10-texto-e-conteudo.md, seção 10).
    titulo: "Valores do banho e da tosa no Fonseca",
    tituloCurto: "Serviços e valores",
    descricao: "A tabela de banho e tosa por porte e pelagem, com o valor, a duração e o que cada serviço compreende.",
    descricaoCurta: "A tabela por porte e pelagem, com valor e duração.",
  },
  {
    id: "onde",
    caminho: "/onde",
    rotulo: "Onde",
    titulo: "Endereço e horário no Fonseca, Niterói",
    tituloCurto: "Onde fica e quando abre",
    descricao: "O endereço no Fonseca, o horário de cada dia, o WhatsApp e o prazo de resposta.",
    descricaoCurta: "Endereço, horário e contato.",
  },
  {
    id: "privacidade",
    caminho: "/privacidade",
    rotulo: "Aviso de privacidade",
    titulo: "Aviso de privacidade",
    tituloCurto: "Aviso de privacidade",
    descricao: "O que este site guarda e o que não guarda: nenhum cookie, nenhum rastreador, nenhum formulário.",
    descricaoCurta: "Nenhum cookie, nenhum rastreador.",
    legal: true,
  },
  {
    id: "acessibilidade",
    caminho: "/acessibilidade",
    rotulo: "Acessibilidade",
    titulo: "Acessibilidade",
    tituloCurto: "Acessibilidade",
    descricao: "O padrão de acessibilidade que o site segue, como foi verificado e como relatar uma barreira.",
    descricaoCurta: "O padrão seguido e como relatar uma barreira.",
    legal: true,
  },
];

export const paginaDe = (id: Pagina["id"]) => paginas.find((p) => p.id === id)!;
/** As páginas do menu: o conteúdo, sem as legais (que ficam no rodapé). */
export const paginasDoMenu = paginas.filter((p) => !p.legal);

/** A ação principal (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 1). */
export const acao = {
  rotulo: "Agendar pelo WhatsApp",
  mensagem: "Olá. Gostaria de agendar um banho.",
};


export const inicio = {
  titulo: "Banho e tosa no Fonseca, com hora marcada.",
  /** O lide: a parte marcada recebe o marca-texto (o gesto do Essencial; nunca no título). */
  lide: { antes: "O valor e o tempo de cada serviço estão na tabela,", marcado: "por porte", depois: "e pelagem, antes da primeira mensagem." },
  resumo: {
    titulo: "O banho, por porte",
    nota: "Pelagem curta. A longa, a dupla e a encaracolada têm acréscimo, na tabela.",
  },
  cuidado: {
    titulo: "Como o animal é tratado",
    itens: [
      "Um animal por vez na mesa de tosa.",
      "Secagem com secador de baixo ruído, sem estufa.",
      "O tutor é avisado pelo WhatsApp quando o banho termina.",
    ],
  },
  ausencias: {
    titulo: "O que não se faz aqui",
    itens: ["Não se atendem gatos.", "Não se faz tosa em animal sedado.", "Não há leva e traz."],
  },
  horario: { titulo: "Horário" },
  onde: { titulo: "Onde fica" },
};

/** Serviços e valores: o título é o da página (paginas). */
export const servicosPagina = {
  lide: "O valor e o tempo de cada serviço, por porte. Os valores são da pelagem curta; a longa, a dupla e a encaracolada têm acréscimo.",
  /** O nome da tabela, para o leitor de tela. */
  tabela: "Valor e duração por serviço e porte",
  acrescimos: "Acréscimos",
  condicoes: "Condições",
};

/** Onde: o título é o da página (paginas). */
export const ondePagina = {
  horario: "Horário",
  contato: "Contato",
};

/** O rodapé (components/rodape.tsx). */
export const rodape = {
  paginas: "Páginas",
  contato: "Contato",
  site: "O site",
  /** O selo de ficção dos sites de exemplo: obrigatório neles (producao/esteira/17-conformidade-e-normas.md, seção 2). */
  selo: "Estabelecimento fictício, criado pela Atlas Digital para demonstração. Nenhum pedido é processado e nenhum dado é coletado nesta página.",
  /** O crédito: no site de cliente, discreto (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 9). */
  credito: "Site por Atlas Digital",
  creditoDoExemplo: (plano: string) => `Site do plano ${plano}, feito pela Atlas Digital.`,
};

/** A página 404 (app/not-found.tsx). */
export const naoEncontrada = {
  titulo: "Esta página não existe.",
  lide: "O endereço pode ter mudado. O início e o WhatsApp continuam no lugar.",
};

export type Porte = { id: "pequeno" | "medio" | "grande"; nome: string; peso: string };
export const portes: readonly Porte[] = [
  { id: "pequeno", nome: "Pequeno", peso: "até 10 kg" },
  { id: "medio", nome: "Médio", peso: "de 10 a 25 kg" },
  { id: "grande", nome: "Grande", peso: "acima de 25 kg" },
];

/** Valor em reais e duração em minutos, por porte (pelagem curta). */
export type Servico = {
  nome: string;
  compreende: string;
  valores: Record<Porte["id"], { valor: number; minutos: number }>;
};

export const servicos: readonly Servico[] = [
  {
    nome: "Banho",
    compreende: "Banho com xampu neutro, secagem, escovação, limpeza das orelhas e corte das unhas.",
    valores: { pequeno: { valor: 50, minutos: 60 }, medio: { valor: 65, minutos: 75 }, grande: { valor: 85, minutos: 90 } },
  },
  {
    nome: "Tosa na máquina",
    compreende: "O banho completo e a tosa do corpo na máquina, na altura combinada com o tutor.",
    valores: { pequeno: { valor: 70, minutos: 90 }, medio: { valor: 90, minutos: 105 }, grande: { valor: 120, minutos: 120 } },
  },
  {
    nome: "Tosa na tesoura",
    compreende: "O banho completo e a tosa feita na tesoura, para o acabamento da raça ou o pedido do tutor.",
    valores: { pequeno: { valor: 90, minutos: 120 }, medio: { valor: 120, minutos: 135 }, grande: { valor: 160, minutos: 150 } },
  },
];

/** Os acréscimos ao valor e ao tempo da tabela: as pelagens além da curta (producao/esteira/nichos/pet-shop.md, seção 4.1) e a hidratação. */
export const acrescimos: readonly { nome: string; valor: number; minutos: number; onde?: string }[] = [
  { nome: "Pelagem longa ou dupla", valor: 15, minutos: 20, onde: "em qualquer serviço" },
  { nome: "Pelagem encaracolada", valor: 20, minutos: 30, onde: "em qualquer serviço" },
  { nome: "Hidratação dos pelos", valor: 25, minutos: 15 },
];

export const condicoes = [
  "Pelo com nó pode exigir tosa prévia. Ela é informada na chegada, com o valor, antes de começar.",
  "Os valores valem para outubro de 2026.",
];

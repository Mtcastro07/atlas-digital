// conteudo/site.ts — as páginas e os textos do site, como dados (producao/esteira/10-texto-e-conteudo.md;
// producao/esteira/13-tecnologia-e-estrutura.md, seção 3.2). Mudar um texto não mexe em JSX.
// Site de exemplo de uma clínica odontológica no plano Completo (producao/esteira/nichos/odontologia.md): cada fato
// sai do briefing.md e cada vedação, de decisoes.md. Nenhum valor, nenhuma forma de pagamento, nenhum convênio.
// Os tratamentos ficam em conteudo/tratamentos.ts; a equipe, a clínica e as perguntas, em conteudo/clinica.ts.

export type Pagina = {
  id:
    | "inicio"
    | "tratamentos"
    | "limpeza"
    | "restauracao"
    | "canal"
    | "clareamento"
    | "coroa"
    | "aparelho"
    | "avaliacao"
    | "equipe"
    | "guias"
    | "onde"
    | "privacidade"
    | "acessibilidade";
  caminho: string;
  /** O nome no menu. */
  rotulo: string;
  /** O título da página, sem a marca (os metadados a acrescentam). */
  titulo: string;
  /** O og:title, curto e sem a marca (WhatsApp). */
  tituloCurto: string;
  /** A meta description, até ~125 caracteres (o exemplo acrescenta "Estabelecimento fictício."). */
  descricao: string;
  /** O og:description, ~80 caracteres. */
  descricaoCurta: string;
  /** Página legal: fora do menu e do limite de páginas do plano (o Completo não tem limite). */
  legal?: boolean;
  /** Página filha: fora do menu; a mãe fica marcada como página atual. */
  pai?: Pagina["id"];
};

export const paginas: readonly Pagina[] = [
  {
    id: "inicio",
    caminho: "/",
    rotulo: "Início",
    titulo: "Odontologia Boa Viagem · clínica odontológica em Niterói",
    tituloCurto: "Odontologia na Boa Viagem, em Niterói",
    descricao: "Odontologia na Boa Viagem, em Niterói. A primeira consulta é só avaliação; cada tratamento sai com as sessões por escrito.",
    descricaoCurta: "A primeira consulta é só avaliação, com as sessões por escrito.",
  },
  {
    id: "tratamentos",
    caminho: "/tratamentos",
    rotulo: "Tratamentos",
    titulo: "Tratamentos e plano de sessões",
    tituloCurto: "Tratamentos e sessões",
    descricao: "Seis tratamentos, com sessões, intervalos e cuidados depois. Sem valores: a norma do conselho os veda.",
    descricaoCurta: "Sessões, intervalos e cuidados de cada tratamento.",
  },
  {
    id: "limpeza",
    caminho: "/tratamentos/limpeza",
    rotulo: "Limpeza",
    titulo: "Limpeza e orientação de higiene",
    tituloCurto: "Limpeza e orientação de higiene",
    descricao: "Limpeza em 1 sessão de 45 minutos: remoção da placa e do tártaro, polimento e orientação de higiene.",
    descricaoCurta: "1 sessão de 45 minutos.",
    pai: "tratamentos",
  },
  {
    id: "restauracao",
    caminho: "/tratamentos/restauracao",
    rotulo: "Restauração",
    titulo: "Restauração",
    tituloCurto: "Restauração",
    descricao: "Restauração em 1 sessão de 50 minutos por dente: remoção do tecido comprometido, reconstrução e ajuste da mordida.",
    descricaoCurta: "1 sessão de 50 minutos por dente.",
    pai: "tratamentos",
  },
  {
    id: "canal",
    caminho: "/tratamentos/canal",
    rotulo: "Tratamento de canal",
    titulo: "Tratamento de canal",
    tituloCurto: "Tratamento de canal",
    descricao: "Tratamento de canal em 2 sessões de 60 minutos, com 7 dias de intervalo, com o Dr. Caio da Silva, Especialista em Endodontia.",
    descricaoCurta: "2 sessões de 60 minutos, com 7 dias de intervalo.",
    pai: "tratamentos",
  },
  {
    id: "clareamento",
    caminho: "/tratamentos/clareamento",
    rotulo: "Clareamento",
    titulo: "Clareamento supervisionado",
    tituloCurto: "Clareamento supervisionado",
    descricao: "Clareamento supervisionado em 3 consultas de 30 minutos, com 14 dias de uso em casa antes da revisão.",
    descricaoCurta: "3 consultas de 30 minutos, com acompanhamento.",
    pai: "tratamentos",
  },
  {
    id: "coroa",
    caminho: "/tratamentos/coroa",
    rotulo: "Coroa",
    titulo: "Coroa",
    tituloCurto: "Coroa",
    descricao: "Coroa em 3 sessões: preparo e moldagem, prova 14 dias depois e cimentação 7 dias depois da prova.",
    descricaoCurta: "3 sessões, com 14 e 7 dias de intervalo.",
    pai: "tratamentos",
  },
  {
    id: "aparelho",
    caminho: "/tratamentos/aparelho",
    rotulo: "Aparelho ortodôntico",
    titulo: "Aparelho ortodôntico fixo",
    tituloCurto: "Aparelho ortodôntico fixo",
    descricao: "Aparelho ortodôntico fixo: instalação em 1 sessão de 60 minutos e manutenção a cada 30 dias, com a Dra. Helena da Silva.",
    descricaoCurta: "Instalação e manutenção a cada 30 dias.",
    pai: "tratamentos",
  },
  {
    id: "avaliacao",
    caminho: "/avaliacao",
    rotulo: "Avaliação",
    titulo: "Pedir uma avaliação",
    tituloCurto: "Pedir uma avaliação",
    descricao: "Escolha o atendimento e, se quiser, a região da boca. A mensagem sai pronta para o WhatsApp, e nada é gravado.",
    descricaoCurta: "A mensagem sai pronta para o WhatsApp.",
  },
  {
    id: "equipe",
    caminho: "/equipe",
    rotulo: "Equipe",
    titulo: "A equipe e a clínica",
    tituloCurto: "A equipe e a clínica",
    descricao: "Três cirurgiões-dentistas inscritos no CRO-RJ, a relação dos especialistas e a descrição da clínica.",
    descricaoCurta: "Três cirurgiões-dentistas inscritos no CRO-RJ.",
  },
  {
    id: "guias",
    caminho: "/guias",
    rotulo: "Guias",
    titulo: "Antes da avaliação e perguntas comuns",
    tituloCurto: "Antes da avaliação",
    descricao: "O que acontece na avaliação, o que levar e as perguntas mais comuns, sem consulta nem diagnóstico.",
    descricaoCurta: "O que acontece na avaliação e o que levar.",
  },
  {
    id: "onde",
    caminho: "/onde",
    rotulo: "Onde",
    titulo: "Onde fica",
    tituloCurto: "Onde fica e quando abre",
    descricao: "Rua Presidente Domiciano, na Boa Viagem, em Niterói: o horário de cada dia, o WhatsApp e o prazo de resposta.",
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
/** As páginas do menu: o conteúdo, sem as legais (que ficam no rodapé) e sem as filhas (que ficam sob a mãe). */
export const paginasDoMenu = paginas.filter((p) => !p.legal && !p.pai);

/** A ação principal (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 1). */
export const acao = {
  rotulo: "Pedir avaliação pelo WhatsApp",
  mensagem: "Olá. Gostaria de marcar uma avaliação.",
};

/** A frase que a norma pede, onde o visitante procura preço (Código de Ética Odontológica, art. 44, I). */
export const avisoDeValores = "Esta página não divulga valores, porque a norma do conselho o veda.";

export const inicio = {
  /** Nome em primeiro, o fato da casa depois: o `h1` diz o que é, onde e a regra da casa. */
  titulo: "Odontologia na Boa Viagem: primeiro a avaliação, depois o tratamento.",
  lide: "Na primeira consulta, o dentista examina e conversa. O tratamento começa depois, com o número de sessões combinado por escrito.",
  responsavel: "Responsável técnica",
  urgencia: {
    titulo: "Com dor, o encaixe é no mesmo dia.",
    texto: "De segunda a sexta, para quem avisar até as 16h. A urgência controla a dor; o tratamento é combinado depois, em avaliação.",
  },
  tratamentos: {
    titulo: "Seis tratamentos, com as sessões escritas",
    lide: "O número de sessões e o intervalo entre elas, antes da consulta. O tempo ocupa o lugar do preço, que a norma veda.",
    abrir: "Abrir o mapa dos dentes",
    colunas: { tratamento: "Tratamento", sessoes: "Sessões", intervalo: "Intervalo" },
  },
  equipe: {
    titulo: "Quem atende",
    ver: "Conhecer a equipe e a clínica",
  },
  ausencias: {
    titulo: "O que não se faz aqui",
    itens: [
      { fato: "Nenhum valor neste site.", motivo: "A norma do conselho veda o preço na publicidade odontológica." },
      { fato: "Nenhuma foto de antes e depois, nem de paciente.", motivo: "A norma restringe essas imagens, e a clínica não as publica." },
      { fato: "Nenhum procedimento na primeira consulta.", motivo: "A avaliação serve para examinar e planejar." },
      { fato: "Nenhuma dúvida clínica respondida por mensagem.", motivo: "O diagnóstico sai do exame; a mensagem serve para marcar." },
    ],
  },
  horario: { titulo: "Horário" },
  onde: { titulo: "Onde fica" },
};

/** O mapa dos dentes e o plano de sessões (Tratamentos). */
export const tratamentosPagina = {
  lide: "Escolha uma região da boca para ver os tratamentos, as sessões e os intervalos. É uma sequência de referência, não um orçamento. O número de cada caso sai do exame e consta do plano por escrito.",
  mapa: {
    legenda: "Região da boca",
    todas: "Todas as regiões",
    ajuda: "O mapa mostra as duas arcadas, vistas de cima, com a numeração dos dentes. Escolha uma região pelo desenho ou pela lista.",
  },
  tabela: "Tratamentos e sessões por região",
  colunas: { tratamento: "Tratamento", sessoes: "Sessões", intervalo: "Intervalo", regioes: "Regiões" },
  encaminha: "Implante e cirurgia do siso: a clínica encaminha a outro profissional.",
  acaoDoCaso: "Pedir avaliação para esta região",
};

/** Uma página de tratamento: os rótulos de seção; o resto vem de conteudo/tratamentos.ts. */
export const tratamentoPagina = {
  sequencia: "Sessão a sessão",
  cuidados: "Cuidados depois",
  regiao: "Onde se aplica",
  quemAtende: "Quem atende",
  ressalva: "O número de sessões de cada caso sai do exame clínico, e consta do plano entregue por escrito.",
  todos: "Ver todos os tratamentos",
};

/** Pedir uma avaliação: os textos da ilha (components/ilhas/pedido-de-avaliacao.tsx). */
export const avaliacaoPagina = {
  lide: "Escolha o atendimento e, se quiser, a região da boca. A mensagem sai pronta para o WhatsApp. Nada é gravado neste site.",
  atendimento: "Atendimento",
  regiao: "Região da boca (opcional)",
  ultimaVisita: "Última visita ao dentista (opcional)",
  periodo: "Período de preferência (opcional)",
  semResposta: "Não informar",
  mensagem: "A mensagem",
  copiar: "Copiar a mensagem",
  enviar: "Abrir o WhatsApp com esta mensagem",
  urgenciaNota: "Com dor, o encaixe é no mesmo dia, de segunda a sexta, para quem avisar até as 16h.",
  atendimentoNota: "A lista oferece atendimentos, não sintomas. O que a pessoa quiser contar, conta na conversa.",
  semScript: "Sem script, o botão abre a conversa com a mensagem curta. Os atendimentos estão listados abaixo.",
};

/** A equipe e a clínica. */
export const equipePagina = {
  lide: "Três cirurgiões-dentistas inscritos no CRO-RJ.",
  especialistas: {
    titulo: "Relação dos especialistas",
    nota: "Títulos de especialista registrados no CRO-RJ. O clínico geral atende nas áreas listadas na ficha de cada profissional.",
  },
  atende: "Atende",
  formacao: "Formação",
  clinica: "A clínica",
};

/** Antes da avaliação e perguntas comuns. */
export const guiasPagina = {
  lide: "O que acontece na avaliação, o que levar e as perguntas mais comuns. Nada aqui substitui o exame.",
  avaliacao: "O que acontece na avaliação",
  levar: "O que levar",
  perguntas: "Perguntas comuns",
};

/** Onde: o título é o da página (paginas). */
export const ondePagina = {
  horario: "Horário",
  contato: "Contato",
  chegar: "Como chegar",
  feriados: "Feriados: fechado.",
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

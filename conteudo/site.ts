// Textos do site institucional, seção por seção.
// Fonte: index.html de 08/09 (nichos/atlas--site--2026-09-30.zip),
// revisado em 30/09 (sociedade atual; página redesenhada).
// Registro: impessoal, moderadamente formal; a agência nunca é sujeito
// (contextos/atlas--contexto-01-produto.md, seção 2).
// Títulos são listas de linhas: cada entrada vira uma linha no desenho.

import { duvidas } from "@/conteudo/duvidas";
import { faixaDePreco } from "@/conteudo/planos";
import { reais } from "@/lib/moeda";

export { contato, mensagens } from "@/conteudo/contato";

export const metadados = {
  titulo: "Atlas Digital — sites para o comércio local de Niterói",
  descricao:
    "Sites profissionais para pequenos negócios de Niterói. Primeiro rascunho navegável em até 24 horas após o briefing completo. Preço declarado, sem surpresa.",
  slogan: "Sua empresa online em 24h",
};

/** Os ids das seções (o id de cada <Secao>, destino das âncoras dentro de uma página). */
export type IdDaSecao = "inicio" | "quem" | "planos" | "escada" | "vitrine" | "orcamento" | "trabalho" | "atlas" | "fundacao" | "duvidas";

/**
 * As páginas do site, na ordem do menu (desde 01/10, a pedido do usuário,
 * cada assunto tem a sua página: app/(atlas)/<caminho>/page.tsx). `menu` é
 * o rótulo no cabeçalho; `abertura`, o topo de cada página (rótulo,
 * título em linhas, a palavra do título que recebe a tarja de bronze e
 * lide); `porta`, a entrada dela no índice do início
 * (o número grande e o resumo).
 */
export const paginas = [
  {
    id: "inicio",
    caminho: "/",
    menu: "Início",
    titulo: metadados.titulo,
    descricao: metadados.descricao,
  },
  {
    id: "para-quem",
    caminho: "/para-quem",
    menu: "Para quem",
    titulo: "Para quem · Atlas Digital",
    descricao: "Comércio de bairro, serviço com agenda e profissão regulamentada em Niterói: os públicos atendidos e o que cada nicho exige.",
    abertura: {
      rotulo: "Para quem",
      titulo: ["Niterói,", "bairro a bairro."],
      destaque: "Niterói",
      lide: "Atendimento presencial em qualquer bairro da cidade. O briefing ocorre no próprio estabelecimento.",
    },
    porta: { dado: "3", unidade: "públicos", resumo: "Comércio de bairro, serviço com agenda e profissão regulamentada." },
  },
  {
    id: "planos",
    caminho: "/planos",
    menu: "Planos",
    titulo: "Planos e preços · Atlas Digital",
    descricao: "Três planos com preço publicado — Essencial, Profissional e Completo —, o site de cada um e a condição dos três primeiros contratos.",
    abertura: {
      rotulo: "Planos",
      titulo: ["Três", "degraus."],
      destaque: "degraus",
      lide: "Cada degrau define o número de páginas, as funcionalidades sob medida e a camada de movimento. A mensalidade acompanha o degrau.",
    },
    // A porta em número e palavra, como as outras; o preço vai no resumo, declarado (ata v3.0, IV.1: preço por último, nunca alardeado).
    porta: { dado: "3", unidade: "planos", resumo: `De ${reais(faixaDePreco.minimo)} a ${reais(faixaDePreco.maximo)}, com o site de cada plano para abrir e usar.` },
  },
  {
    id: "orcamento",
    caminho: "/orcamento",
    menu: "Orçamento",
    titulo: "Orçamento · Atlas Digital",
    descricao: "Plano e módulos, com o valor exato na hora, em criação e mensalidade. A mensagem segue pronta para o WhatsApp; nada é registrado.",
    abertura: {
      rotulo: "Orçamento",
      titulo: ["Dois toques,", "valor exato."],
      destaque: "exato",
      lide: "O plano e os módulos definem o total, em criação e mensalidade. A mensagem segue pronta para o WhatsApp.",
    },
    porta: { dado: "2", unidade: "toques", resumo: "O valor exato na hora e a mensagem pronta para o WhatsApp." },
  },
  {
    id: "trabalho",
    caminho: "/o-trabalho",
    menu: "O trabalho",
    titulo: "O trabalho · Atlas Digital",
    descricao: "Visita e briefing, rascunho navegável em 24 horas, duas rodadas de revisão e publicação em 7 a 15 dias úteis.",
    abertura: {
      rotulo: "O trabalho",
      titulo: ["Do balcão", "ao endereço próprio."],
      destaque: "próprio",
      lide: "O prazo corre a partir do briefing completo. Nada é publicado sem aprovação.",
    },
    porta: { dado: "4", unidade: "etapas", resumo: "Da visita ao rascunho navegável, da aprovação à publicação." },
  },
  {
    id: "atlas",
    caminho: "/o-atlas",
    menu: "O Atlas",
    titulo: "O Atlas · Atlas Digital",
    descricao: "Formado por três estudantes de Ciência da Computação da Universidade Federal Fluminense, em Niterói: o método acadêmico aplicado a sites para o comércio local.",
    abertura: {
      rotulo: "O Atlas",
      titulo: ["Origem", "na UFF."],
      destaque: "UFF",
      lide: "Formado por três estudantes de Ciência da Computação da Universidade Federal Fluminense, em Niterói. O método acadêmico aplicado ao comércio local.",
    },
    porta: { dado: "UFF", unidade: "", resumo: "Formado por estudantes de Ciência da Computação, em Niterói." },
  },
  {
    id: "duvidas",
    caminho: "/duvidas",
    menu: "Dúvidas",
    titulo: "Perguntas frequentes · Atlas Digital",
    descricao: "Prazo, preço, contrato, conteúdo, verificação de qualidade e privacidade: as perguntas que costumam vir antes do orçamento.",
    abertura: {
      rotulo: "Dúvidas",
      titulo: ["Perguntas", "frequentes."],
      destaque: "frequentes",
      lide: "As respostas que costumam anteceder o orçamento. Outras questões seguem pelo WhatsApp.",
    },
    porta: { dado: String(duvidas.length), unidade: "perguntas", resumo: "Prazo, preço, contrato, verificação e privacidade." },
  },
] as const;

export type IdDaPagina = (typeof paginas)[number]["id"];
export type PaginaInterna = Extract<(typeof paginas)[number], { abertura: unknown }>;

/** As páginas internas (todas menos o início), na ordem do menu. */
export const paginasInternas = paginas.filter((p): p is PaginaInterna => "abertura" in p);

/** Itens do menu: as páginas internas. */
export const navegacao = paginasInternas.map((p) => ({ id: p.id, rotulo: p.menu, caminho: p.caminho }));

export const paginaDe = (id: IdDaPagina) => paginas.find((p) => p.id === id)!;

export const acaoOrcamento = { rotulo: "Montar orçamento", destino: "/orcamento" };

/** O índice do início: cada página interna como uma porta. */
export const portas = {
  rotulo: "O site",
  titulo: ["O essencial,", "em seis páginas."],
  lide: "Uma página por assunto, com o dado principal à frente.",
};

/**
 * O pé de cada página interna (components/paginas/proxima-pagina.tsx): a
 * página seguinte, com o mesmo número que a porta dela tem no início; da
 * última, a volta ao início.
 */
export const proximaPagina = {
  rotulo: "Próxima página",
  aSeguir: "A seguir",
  fim: "Fim do percurso",
  acao: "Continuar",
  inicio: "Voltar ao início",
  /** A porta do início, para o pé da última página. */
  portaDoInicio: { dado: "6", unidade: "páginas", resumo: "As seis páginas numa só vista." },
};

/**
 * As figuras das aberturas: a identidade de cada página interna
 * (components/paginas/figuras.tsx).
 */
export const figuras = {
  /**
   * Para quem: os bairros dos três sites de exemplo — só eles, desde 03/10
   * (pedido do usuário) —, cada um com o nicho e o vínculo para o site, na
   * ordem dos planos (Essencial, Profissional, Completo).
   */
  bairros: {
    rotulo: "Bairros dos sites de exemplo",
    exemplos: [
      { bairro: "Icaraí", nicho: "nutrição", caminho: "/demos/nutricao" },
      { bairro: "Engenhoca", nicho: "construção", caminho: "/demos/deposito" },
      { bairro: "Santa Rosa", nicho: "barbearia", caminho: "/demos/barbearia" },
    ],
    nota: "Os bairros dos três sites de exemplo (estabelecimentos fictícios).",
  },
  /** Orçamento: a conta, em quatro termos. */
  equacao: [
    { termo: "Plano", valor: `${reais(faixaDePreco.minimo)} a ${reais(faixaDePreco.maximo)}` },
    { termo: "Módulos", valor: "opcionais" },
    { termo: "Criação", valor: "em duas parcelas" },
    { termo: "Mensalidade", valor: "valor declarado por plano" },
  ],
  /**
   * O trabalho: a régua do prazo, em escala — dias úteis contados do
   * briefing completo. Os números de cada etapa ficam na seção (marcas);
   * aqui, só a proporção: o rascunho é um traço no começo, e a maior
   * parte do caminho é revisão e aprovação.
   */
  regua: {
    descricao: "Do briefing à publicação, em dias úteis",
    dias: 15,
    trechos: [
      { rotulo: "Rascunho", de: 0, ate: 1, tipo: "cheio" as const },
      { rotulo: "Revisões e aprovação", de: 1, ate: 7, tipo: "tracejado" as const },
      { rotulo: "Publicação, em geral", de: 7, ate: 15, tipo: "janela" as const },
    ],
    escala: [0, 5, 10, 15],
    unidade: "dias úteis",
  },
  /** O Atlas: as coordenadas da cidade sob o globo. */
  coordenadas: { lugar: "Niterói, RJ", latitude: "22°53′ S", longitude: "43°06′ O" },
  /**
   * Dúvidas: as perguntas pelo momento em que costumam aparecer. Cada
   * palavra leva à resposta (o número é o da pergunta na lista).
   */
  momentos: [
    { momento: "Antes de contratar", itens: [{ rotulo: "Instagram", duvida: 4 }, { rotulo: "Celular", duvida: 6 }, { rotulo: "Site existente", duvida: 8 }] },
    { momento: "Na contratação", itens: [{ rotulo: "Pagamento", duvida: 7 }, { rotulo: "Fim do contrato", duvida: 3 }] },
    { momento: "Durante o trabalho", itens: [{ rotulo: "As 24 horas", duvida: 1 }, { rotulo: "Textos", duvida: 5 }, { rotulo: "Verificação", duvida: 9 }] },
    { momento: "Com o site no ar", itens: [{ rotulo: "Mensalidade", duvida: 2 }, { rotulo: "Privacidade", duvida: 10 }] },
  ],
};

export const capa = {
  titulo: metadados.slogan,
  // A palavra do título que recebe a onda de cor na entrada (Spell UI, Gradient Wave Text; desde 03/10).
  destaque: "24h",
  // Uma frase: a definição vinculante do slogan (ata v3.0, IV.4). O prazo de publicação fica nos passos, logo abaixo.
  lide: "Primeiro rascunho navegável em até 24 horas após o briefing completo.",
  // No início, as duas ações levam às seções da própria página: o montador e os passos.
  acaoPrincipal: { rotulo: "Montar orçamento", destino: "#orcamento" },
  acaoSecundaria: { rotulo: "Conhecer o método", destino: "#trabalho" },
  /**
   * Faixa de destaques sob a capa: valor curto e o que ele mede, na ordem
   * do argumento (ata v3.0, IV.1: padrão de execução, eficiência, preço
   * declarado — o preço fica nas portas e nos planos, declarado, nunca
   * alardeado). A régua de dez blocos é a da norma de produção (estágio 7);
   * o zero vale para este site, que prova a si mesmo. As 24 horas e os
   * 7 a 15 dias úteis ficam no lide, logo acima: cada fato aparece uma vez.
   */
  destaques: [
    { valor: "10", rotulo: "blocos de verificação antes de cada entrega" },
    { valor: "0", rotulo: "cookies e rastreadores neste site" },
    { valor: "1", rotulo: "visita presencial ao estabelecimento" },
    { valor: "2", rotulo: "rodadas de revisão incluídas" },
  ],
};

/**
 * Faixa corrida sob os destaques (a do site de 28/08): os nichos atendidos,
 * com o globo da marca como separador (components/secoes/faixa.tsx). Em
 * ordem alfabética e com as palavras principais em maiúscula — artigos e
 * preposições em minúscula (pedido do usuário, 03/10).
 */
export const faixa = {
  nichos: [
    "Barbearia",
    "Imobiliária",
    "Material de Construção",
    "Medicina",
    "Nutrição",
    "Odontologia",
    "Oficina Mecânica",
    "Pet Shop",
    "Pilates e Academia",
    "Psicologia",
    "Restaurante",
  ],
};

export const paraQuem = {
  titulo: ["Reconhecidos no bairro,", "ausentes da internet."],
  /** Rótulo do exemplo pronto de cada público: um dos sites de demonstração (`plano`, em `simulador.sites`). */
  exemplo: "Exemplo pronto",
  // Os três textos com o mesmo fôlego (duas frases, ~100 caracteres): os blocos ficam simétricos.
  publicos: [
    {
      titulo: "Comércio de bairro",
      plano: "profissional",
      texto: "Balcão e vitrine. O site informa o estoque, o horário de funcionamento e o trajeto até a porta.",
    },
    {
      titulo: "Serviço com agenda",
      plano: "completo",
      texto: "Atendimento marcado. O pedido chega com serviço, data e horário definidos, antes da primeira conversa.",
    },
    {
      titulo: "Profissão regulamentada",
      plano: "essencial",
      texto: "Nutrição, direito, odontologia. A norma do conselho de cada profissão é conferida na fonte antes do rascunho.",
    },
  ],
};

export const planosSecao = {
  titulo: ["O preço está publicado.", "Sem proposta, sem reunião."],
  lide: "Todos os planos compreendem domínio, hospedagem, certificado de segurança e manutenção mensal. Criação paga em duas parcelas.",
  seloDestaque: "Recomendado",
  /** Rótulo da prévia do site feito em cada plano (simulador.sites). */
  siteDoPlano: "O site deste plano",
  acaoPlano: "Escolher",
  tituloModulos: "Módulos",
};

export const escada = {
  titulo: ["A distância não está na lista.", "Está na tela."],
  lide: "Um site completo por plano. Selecione um nível para comparar; no simulador, o site funciona por inteiro.",
  niveis: [
    { id: "essencial", nome: "Essencial", nota: "Essencial: os elementos surgem sem hierarquia de tempo." },
    { id: "profissional", nome: "Profissional", nota: "Profissional: entrada em camadas, com ordem de leitura definida." },
    { id: "completo", nome: "Completo", nota: "Completo: o título se compõe palavra a palavra e os blocos assentam em sequência." },
  ],
} as const;

export const vitrine = {
  titulo: ["Cada nicho impõe", "uma exigência própria."],
  texto:
    "Na nutrição, depoimento e resultado são vedados pelo conselho da profissão. Num depósito de material de construção, o cálculo de quantidade e o horário visível são indispensáveis. O projeto parte dessas exigências, não do visual.",
  seletor: "Escolher demonstrativo",
  nota: "Estabelecimentos fictícios, criados para demonstração.",
};

export const orcamento = {
  rotulo: "Orçamento",
  titulo: ["Componha o orçamento.", "O valor é apresentado na hora."],
  lide: "Selecione o plano e os módulos. O total aparece em dois números — criação e mensalidade — e a mensagem segue pronta para o WhatsApp.",
  privacidade:
    "Nada é registrado nesta página: a mensagem parte do próprio aparelho. Página adicional é orçada em separado.",
  semScript: "O montador requer JavaScript. A conversa pode começar direto pelo WhatsApp:",
  /**
   * A tabela completa da página Orçamento (components/ilhas/montador.tsx,
   * `completo`): o que o plano inclui, o que cada módulo faz, a conta item
   * a item, as duas parcelas e o que a mensalidade compreende. Pagamento e
   * mensalidade como nas perguntas 2 e 7 (conteudo/duvidas.ts).
   */
  completo: {
    inclui: "O plano inclui",
    siteDoPlano: "O site deste plano",
    resumo: "Conta",
    pagamento: "Pagamento da criação",
    noBriefing: "No briefing",
    naPublicacao: "Na publicação",
    inicioDaMensalidade: "A mensalidade começa no mês seguinte à publicação.",
    mensalidadeCompreende:
      "A mensalidade compreende hospedagem, domínio, certificado de segurança, cópias de segurança e alterações de texto, preço ou horário.",
    paginaAdicional: "Página adicional",
    fundacao: {
      texto: "Nos três primeiros contratos: 50% de desconto na criação e mensalidade congelada por doze meses.",
      rotulo: "Condição de fundação",
      destino: "/planos#fundacao",
    },
  },
};

/**
 * Os passos do trabalho no início, em caixas que se empilham ao rolar (as
 * do site de 28/08; components/secoes/passos.tsx). Os textos são os da
 * página O trabalho (`trabalho.passos`); aqui, o rótulo e o vínculo para ela.
 */
export const passosDoInicio = {
  rotulo: "O trabalho",
  vinculo: { rotulo: "Ver o trabalho em detalhe", destino: "/o-trabalho" },
};

export const trabalho = {
  titulo: ["Quatro etapas.", "Nenhuma delas opcional."],
  // Cada fato uma vez: o número fica na marca, e o título e o texto não o repetem.
  // Os quatro textos com o mesmo fôlego (~110 caracteres), para as colunas fecharem na mesma altura.
  passos: [
    {
      titulo: "Visita e briefing",
      marca: { valor: "1", rotulo: "visita presencial" },
      texto: "No próprio estabelecimento. O formulário é preenchido com o responsável, que fornece as fotografias do local.",
    },
    {
      titulo: "Rascunho",
      marca: { valor: "24 h", rotulo: "após o briefing completo" },
      texto: "Site navegável, entregue por link, com textos e fotografias reais — sem banco de imagens nem inteligência artificial.",
    },
    {
      titulo: "Revisões",
      marca: { valor: "2", rotulo: "rodadas sem custo" },
      texto: "Ajustes sobre o rascunho. O que exceder o escopo é orçado antes de ser feito, nunca cobrado depois.",
    },
    {
      titulo: "Publicação",
      marca: { valor: "7 a 15", rotulo: "dias úteis, em geral" },
      texto: "Após a régua de verificação e a conferência de privacidade. Domínio, hospedagem e manutenção seguem pela mensalidade.",
    },
  ],
};

// Sociedade vigente desde 30/09/2026 (ata v3.0; CLAUDE.md, "Decisões tomadas").
// O pacote de 08/09 ainda listava quatro sócios, dois deles já fora da sociedade.
// A formação dos sócios (Ciência da Computação, UFF) veio de um pedido do
// usuário na sessão de desenvolvimento de 01/10 e deve ser conferida pelos
// três antes da publicação.
export const quemFaz = {
  titulo: ["Três sócios,", "um responsável por etapa."],
  lide: "Venda e briefing, desenvolvimento, suporte: nenhuma etapa é terceirizada.",
  /**
   * `foto`: o nome do arquivo da foto do sócio em public/socios/, sem a
   * extensão (o painel aceita .webp, .avif, .jpg, .jpeg e .png, nessa
   * ordem). Enquanto o arquivo não existe, o painel mostra as iniciais; em
   * desenvolvimento (npm run dev), a vaga aparece marcada, com o caminho
   * esperado. Foto quadrada, rosto centrado; para converter uma foto de
   * celular (de qualquer tamanho) em WebP de 480 px:
   * node ferramentas/preparar-fotos.mjs <foto> <nome do arquivo>.
   */
  socios: [
    { iniciais: "GY", nome: "Gabriel Yida", funcao: "Direção e vendas", foto: "gabriel-ribeiro-ota-yida" },
    { iniciais: "MA", nome: "Matheus Azevedo Abreu", funcao: "Suporte ao cliente e parte legal", foto: "matheus-azevedo-abreu" },
    { iniciais: "MC", nome: "Matheus Castro Oliveira de Luna Garcia", funcao: "Desenvolvimento dos sites", foto: "matheus-castro-oliveira-de-luna-garcia" },
  ],
  /** A história, em capítulos: da sala de aula ao balcão. */
  historia: {
    rotulo: "Origem",
    titulo: ["Da sala de aula", "ao balcão."],
    // Em terceira pessoa e no presente, sem narrador: o método, o problema, a aplicação e a condição do começo.
    capitulos: [
      {
        numero: "01",
        titulo: "O método",
        texto:
          "Medir antes de afirmar, testar antes de entregar, escrever código que outra pessoa consiga manter: exigências que não dependem do porte de quem contrata.",
      },
      {
        numero: "02",
        titulo: "O problema",
        texto:
          "Comércios com anos de casa e nenhum endereço próprio na internet, dependentes de uma rede social que muda as regras sem aviso.",
      },
      {
        numero: "03",
        titulo: "A aplicação",
        texto:
          "O rigor acadêmico aplicado desde já ao comércio local: preço declarado, prazo por escrito, código verificado antes da entrega.",
      },
      {
        numero: "04",
        titulo: "O começo, declarado",
        texto:
          "Sem histórico de clientes, os três primeiros contratos têm condição própria: o risco de contratar primeiro é reconhecido no preço.",
      },
    ],
  },
  nome: {
    titulo: "Atlas sustentava o mundo.",
    texto:
      "Na mitologia grega, Atlas sustenta o céu sobre os ombros. O nome traduz o propósito: sustentar o que o cliente já construiu, sem substituí-lo. No logotipo, o globo sobre o ombro da letra A reduz essa figura a uma letra.",
  },
};

export const fundacao = {
  rotulo: "Condição de fundação",
  titulo: ["Os três primeiros contratos", "têm condição própria."],
  // A condição da ata (IV.3: metade do valor de criação, mensalidade congelada por doze meses, três
  // contratos) em percentual: "50%" se lê mais depressa que "½" e é a forma habitual de um desconto.
  // Em reais (R$ 450 a R$ 1.200), não: os valores constam como [A CONFIRMAR] no contexto comercial, §2.
  lide: "O risco de contratar uma agência sem histórico é reconhecido no preço. São três contratos, e a condição se encerra com eles. Em troca, cada um vira estudo de caso, com autorização assinada no início.",
  termos: [
    { valor: "50%", rotulo: "de desconto na criação" },
    { valor: "12 meses", rotulo: "de mensalidade congelada" },
    /** selos: o número desenhado ao lado, um globo da marca por contrato. */
    { valor: "3", rotulo: "contratos com esta condição", selos: 3 },
  ],
};

export const fim = {
  titulo: ["Comece pelo orçamento."],
  lide: "Dois toques para o valor exato. A conversa ocorre em seguida, sem compromisso.",
};

export const rodape = {
  descricao: "Sites profissionais para o comércio local de Niterói.",
  selo: "Este site corresponde ao plano Completo. Essencial e Profissional seguem o mesmo padrão, com menos páginas e menos movimento. Nenhum cookie, nenhum rastreador: nada é gravado no aparelho de quem visita.",
  direitos: "© 2026 Atlas Digital",
};

export const falarNoWhatsApp = "Falar no WhatsApp";

// Simulador de planos: os sites de app/demos/, um por plano, no palco da
// escada (components/secoes/escada.tsx), e os rótulos do diálogo.
export const simulador = {
  abrir: "Abrir no simulador",
  novaAba: "Abrir em nova aba",
  fechar: "Fechar o simulador",
  aparelhos: { computador: "Computador", celular: "Celular" },
  planos: "Planos",
  inclui: "O plano inclui",
  experimente: "Experimente",
  escolher: "Escolher o",
  criacao: "de criação",
  mensal: "por mês",
  carregando: "Abrindo o site",
  aviso: "Estabelecimentos fictícios, criados para demonstração.",
  navegacao: {
    voltar: "Voltar uma página",
    avancar: "Avançar uma página",
    inicio: "Início do site",
    paginas: "páginas",
    dica: "navegue pelo menu do próprio site",
  },
  sites: [
    {
      plano: "essencial",
      /** O tom do site (app/nichos.css), para o fundo da prévia e a marca nos cartões. */
      tom: "nutricao",
      caminho: "/demos/nutricao",
      endereco: "agenciaatlasdigital.com/demos/nutricao",
      nome: "Nutrição Icaraí",
      nicho: "Consultório de nutrição",
      paginas: 3,
      resumo: "Três páginas, o limite do plano, compostas como folha impressa: sumário pontilhado, valores publicados, WhatsApp à mão e o mapa do bairro.",
      experimente: "Passe pelas três páginas do índice (I, II e III) e abra o WhatsApp pelo botão.",
    },
    {
      plano: "profissional",
      tom: "deposito",
      caminho: "/demos/deposito",
      endereco: "agenciaatlasdigital.com/demos/deposito",
      nome: "Depósito Engenhoca",
      nicho: "Material de construção",
      paginas: 6,
      resumo: "Seis páginas em ficha técnica de obra. A calculadora de materiais, funcionalidade sob medida, imprime a lista num cupom; o estado da loja aparece ao vivo.",
      experimente: "Abra a aba 02, mude as medidas e envie a lista pronta pelo cupom.",
    },
    {
      plano: "completo",
      tom: "barbearia",
      caminho: "/demos/barbearia",
      endereco: "agenciaatlasdigital.com/demos/barbearia",
      nome: "Barbearia Santa Rosa",
      nicho: "Barbearia",
      paginas: 7,
      resumo: "Sete páginas sobre um palco 3D em WebGL: fichas de metal em relevo viram com a rolagem e na troca de página. Duas funcionalidades sob medida: agendador e agenda de retorno.",
      experimente: "Role o início devagar: a moeda da casa vira nas fichas d’A Navalha e d’O Clássico e na placa de 1996. Depois, calcule a janela de retorno e leve o pedido ao agendador.",
    },
  ],
} as const;

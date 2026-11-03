// Textos do site institucional, seção por seção.
// Fonte: index.html de 08/09 (nichos/atlas--site--2026-09-30.zip),
// revisado em 30/09 (sociedade atual; página redesenhada).
// Registro: impessoal, moderadamente formal; a agência nunca é sujeito
// (contextos/atlas--contexto-01-produto.md, seção 2).
// Títulos são listas de linhas: cada entrada vira uma linha no desenho.

import { duvidas } from "@/conteudo/duvidas";
import { condicaoDeFundacao, faixaDePreco, modulos } from "@/conteudo/planos";
import { reais } from "@/lib/moeda";
import { porExtenso, type Genero } from "@/lib/por-extenso";

export { contato, mensagens } from "@/conteudo/contato";

export const metadados = {
  titulo: "Atlas Digital — sites para o comércio local de Niterói",
  descricao:
    "Sites profissionais para pequenos negócios de Niterói. O primeiro rascunho do site em até 24 horas depois do briefing completo. Preço publicado, sem surpresa.",
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
 * (desde 28/10, R10, a `frase`, o dado dentro da frase, para o índice com
 * desenho e a próxima página). `titulo` diz o que se vende e onde, com
 * "· Atlas Digital" no fim (16/10, SEO e GEO: até então, "Planos e preços ·
 * Atlas Digital" e afins, sem "sites" nem "Niterói"); só fatos que a página
 * já mostra.
 */
/**
 * A porta de uma página (R10, D9 e D18): a frase com o número por extenso ("Três públicos: comércio de bairro, …").
 */
const porta = (n: number, unidade: string, genero: Genero, resumo: string) => ({
  frase: `${porExtenso(n, genero, true)} ${unidade}: ${resumo[0].toLowerCase()}${resumo.slice(1)}`,
});

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
    titulo: "Para quem: sites para negócios de Niterói · Atlas Digital",
    descricao: "Sites para comércio de bairro, serviço com agenda e profissão regulamentada em Niterói, e o que cada ramo precisa ter no site.",
    abertura: {
      rotulo: "Para quem",
      titulo: ["Niterói,", "bairro a bairro."],
      destaque: "Niterói",
      lide: "Atendimento presencial em qualquer bairro da cidade. A conversa do briefing é feita no seu negócio.",
    },
    porta: porta(3, "públicos", "m", "Comércio de bairro, serviço com agenda e profissão regulamentada."),
  },
  {
    id: "planos",
    caminho: "/planos",
    menu: "Planos",
    titulo: "Planos e preços de sites em Niterói · Atlas Digital",
    descricao: "Três planos com preço publicado — Essencial, Profissional e Completo —, o site de cada um e a condição dos três primeiros contratos.",
    abertura: {
      rotulo: "Planos",
      titulo: ["Três", "degraus."],
      destaque: "degraus",
      // "os efeitos de movimento", e não "a camada de movimento", a língua da agência (17/10, Impeccable, heurística 2): o
      // mesmo nome da lista dos planos ("Todos os efeitos de movimento").
      lide: "Quanto mais alto o plano, mais páginas, mais ferramentas e mais movimento. A mensalidade sobe junto.",
    },
    // A porta em número e palavra, como as outras; o preço vai no resumo, declarado (ata v3.0, IV.1: preço por último, nunca alardeado).
    porta: porta(3, "planos", "m", `De ${reais(faixaDePreco.minimo)} a ${reais(faixaDePreco.maximo)}, com o site de cada plano para abrir e usar.`),
  },
  {
    id: "orcamento",
    caminho: "/orcamento",
    menu: "Orçamento",
    titulo: "Orçamento de site com valor na hora · Atlas Digital",
    descricao: "Escolha o plano e os extras e veja na hora o valor exato da criação e da mensalidade. A mensagem vai pronta para o WhatsApp, e nada fica salvo.",
    abertura: {
      rotulo: "Orçamento",
      titulo: ["Dois toques,", "valor exato."],
      destaque: "exato",
      lide: "Escolha o plano e os extras e veja o total na hora. A mensagem vai pronta para o WhatsApp.",
    },
    porta: porta(2, "toques", "m", "O valor exato na hora e a mensagem pronta para o WhatsApp."),
  },
  {
    id: "trabalho",
    caminho: "/o-trabalho",
    menu: "O trabalho",
    titulo: "Como o site é feito, do briefing à publicação · Atlas Digital",
    descricao: "Visita e briefing, rascunho em 24 horas, duas rodadas de revisão e publicação em 7 a 15 dias úteis.",
    abertura: {
      rotulo: "O trabalho",
      titulo: ["Do balcão", "ao endereço próprio."],
      destaque: "próprio",
      lide: "O prazo conta a partir do briefing completo. Nada vai ao ar sem a sua aprovação.",
    },
    porta: porta(4, "etapas", "f", "Da visita ao rascunho, da aprovação à publicação."),
  },
  {
    id: "atlas",
    caminho: "/o-atlas",
    menu: "O Atlas",
    titulo: "O Atlas: três sócios, origem na UFF · Atlas Digital",
    descricao: "Três estudantes de Ciência da Computação da Universidade Federal Fluminense, em Niterói, que fazem sites para o comércio local.",
    abertura: {
      rotulo: "O Atlas",
      titulo: ["Origem", "na UFF."],
      destaque: "UFF",
      // [provisório] (R10, CONTRATO.md, 5.2): a primeira frase, a da formação, passou a "Quem faz", para a formação
      // aparecer uma vez na página; o lide fica com a segunda frase de hoje, literal.
      lide: "O rigor da universidade, a serviço do comércio local.",
    },
    porta: {
      frase: "Três estudantes de Ciência da Computação da UFF, em Niterói.",
    },
  },
  {
    id: "duvidas",
    caminho: "/duvidas",
    menu: "Dúvidas",
    titulo: "Perguntas frequentes sobre sites · Atlas Digital",
    descricao: "Prazo, preço, contrato, textos, qualidade e privacidade: as respostas às dúvidas mais comuns antes do orçamento.",
    abertura: {
      rotulo: "Dúvidas",
      titulo: ["Perguntas", "frequentes."],
      destaque: "frequentes",
      lide: "Respostas curtas, antes do orçamento. Outra dúvida? É só chamar no WhatsApp.",
    },
    porta: porta(duvidas.length, "perguntas", "f", "Prazo, preço, contrato, qualidade e privacidade."),
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
  titulo: ["O essencial está", "em seis páginas."],
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
  /** A ação nomeia o destino (16/10, Impeccable; até então, "Continuar"). */
  acoes: {
    "para-quem": "Ver para quem é",
    planos: "Ver os planos",
    orcamento: "Montar orçamento",
    trabalho: "Ver o trabalho",
    atlas: "Conhecer o Atlas",
    duvidas: "Ler as dúvidas",
  },
  inicio: "Voltar ao início",
  /** A porta do início, para o pé da última página. */
  portaDoInicio: { frase: "As seis páginas numa só vista." },
};

/**
 * As figuras das aberturas: a identidade de cada página interna
 * (components/paginas/<pagina>/figura.tsx).
 */
export const figuras = {
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
    { momento: "Antes de contratar", itens: [{ rotulo: "Instagram", duvida: 4 }, { rotulo: "Celular", duvida: 6 }, { rotulo: "Site existente", duvida: 8 }, { rotulo: "Preço", duvida: 11 }] },
    { momento: "Na contratação", itens: [{ rotulo: "Pagamento", duvida: 7 }, { rotulo: "Fim do contrato", duvida: 3 }, { rotulo: "O que você faz", duvida: 12 }] },
    { momento: "Durante o trabalho", itens: [{ rotulo: "As 24 horas", duvida: 1 }, { rotulo: "Textos", duvida: 5 }, { rotulo: "Qualidade", duvida: 9 }] },
    { momento: "Com o site no ar", itens: [{ rotulo: "Mensalidade", duvida: 2 }, { rotulo: "Privacidade", duvida: 10 }] },
  ],
};

export const capa = {
  titulo: metadados.slogan,
  // A palavra do título que recebe a onda de cor na entrada (Spell UI, Gradient Wave Text; desde 03/10).
  destaque: "24h",
  // Uma frase: a definição vinculante do slogan (ata v3.0, IV.4). O prazo de publicação fica nos passos, logo abaixo.
  lide: "O primeiro rascunho do site, pronto para abrir e testar, em até 24 horas depois do briefing completo.",
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
    // O que os dez blocos verificam, só o que a régua mede (producao/qualidade/02-regua.md, seção 5; 16/10, Impeccable).
    {
      valor: "10",
      rotulo: "testes antes de cada entrega",
      detalhe: "O seu site é testado do celular ao computador: leitura, velocidade, privacidade e texto.",
    },
    { valor: "0", rotulo: "cookies e rastreadores neste site" },
    { valor: "1", rotulo: "visita presencial ao estabelecimento" },
    { valor: "2", rotulo: "rodadas de revisão incluídas" },
  ],
  /**
   * O demonstrativo ao lado dos destaques (16/10, decisão do aprovador: "Pôr o demonstrativo"): um site de
   * nicho no celular, na primeira tela, aberto em nova aba. `site` é o id em `simulador.sites`; a imagem é
   * public/simulador/<site>-inicio-{390,780}.webp. Mudou a capa do site? Refotografe, e reveja a descrição.
   */
  demonstrativo: {
    site: "odontologia",
    descricao:
      "Primeira tela do site da Odontologia Boa Viagem no celular: o título, primeiro a avaliação e depois o tratamento, sobre o mapa dos dentes em 3D; o botão para pedir avaliação pelo WhatsApp e o aviso de aberto agora, até as 18h.",
    aviso: "Estabelecimento fictício, criado para demonstração.",
  },
};

export const paraQuem = {
  titulo: ["Negócios conhecidos no bairro", "e ainda fora da internet."],
  // Os três textos com o mesmo fôlego (duas frases, ~100 caracteres): os blocos ficam simétricos.
  publicos: [
    {
      titulo: "Comércio de bairro",
      plano: "profissional",
      texto: "Loja de balcão. O site mostra o que você tem, o horário e o caminho até a sua porta.",
    },
    {
      titulo: "Serviço com agenda",
      plano: "completo",
      texto: "Atendimento com hora marcada. O pedido já chega com o serviço, o dia e o horário escolhidos.",
    },
    {
      titulo: "Profissão regulamentada",
      plano: "essencial",
      texto: "Nutrição, direito, odontologia. O texto segue as regras do conselho, conferidas antes do rascunho.",
    },
  ],
  /**
   * Os nichos atendidos, em linha parada sob os públicos (desde 17/10). Até então, na faixa corrida do início, que saiu
   * pela marca K4 (o letreiro); os nomes ficam pelo texto que a busca e as IAs leem. Em ordem alfabética e com as
   * palavras principais em maiúscula, artigos e preposições em minúscula (pedido do usuário, 03/10).
   */
  nichos: {
    rotulo: "Nichos atendidos",
    lista: [
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
  },
};

export const planosSecao = {
  acaoPlano: "Escolher",
};

export const escada = {
  titulo: ["A diferença entre os planos", "se vê nos sites."],
  /** Rótulo do seletor dos sites de um plano (os nichos), abaixo do seletor de nível. */
  nichos: "Nicho",
  niveis: [
    { id: "essencial", nome: "Essencial" },
    { id: "profissional", nome: "Profissional" },
    { id: "completo", nome: "Completo" },
  ],
} as const;

export const vitrine = {
  titulo: ["Cada nicho pede", "um site diferente."],
  seletor: "Escolher o exemplo",
  nota: "Estabelecimentos fictícios, criados para demonstração.",
};

const paginaAdicional = modulos.find((m) => m.porPagina);
if (!paginaAdicional) throw new Error("conteudo/site.ts: nenhum extra cobrado por página em conteudo/planos.ts");

export const orcamento = {
  rotulo: "Orçamento",
  // Desde 17/10 (passe 4b), "O valor é apresentado na hora." abre o lide, e não fecha o título: a 68 px, na metade da
  // coluna, o título ocupava cinco linhas. O mesmo texto, reordenado.
  titulo: ["Monte o seu orçamento."],
  lide: "Escolha o plano e os extras e veja na hora quanto custam a criação e a mensalidade. A mensagem vai pronta para o WhatsApp.",
  privacidade:
    `Nada fica salvo: a mensagem só sai quando você envia. Página adicional (${reais(paginaAdicional.criacao)} cada) fica fora desta conta.`,
  semScript: "O orçamento não abriu neste navegador. Você pode começar a conversa direto pelo WhatsApp:",
  /**
   * O que resta aqui da tabela completa da página Orçamento: o aviso e a linha da condição; o resto mora em
   * conteudo/paginas/orcamento.ts desde o R10.
   */
  completo: {
    /** Junto do nome do site do plano, que é de um estabelecimento fictício (16/10, SEO e GEO). */
    aviso: capa.demonstrativo.aviso,
    fundacao: {
      texto: condicaoDeFundacao,
      rotulo: "Condição de fundação",
      destino: "/planos#fundacao",
    },
  },
};

/**
 * Os passos do trabalho no início, na derrota (desde 17/10; até então, em
 * caixas que se empilhavam ao rolar, as do site de 28/08;
 * components/secoes/passos.tsx). Os textos são os da
 * página O trabalho (`trabalho.passos`); aqui, o rótulo e o vínculo para ela.
 */
export const passosDoInicio = {
  rotulo: "O trabalho",
  vinculo: { rotulo: "Ver cada etapa", destino: "/o-trabalho" },
};

// Sociedade vigente desde 30/09/2026 (ata v3.0; CLAUDE.md, "Decisões tomadas").
// O pacote de 08/09 ainda listava quatro sócios, dois deles já fora da sociedade.
// A formação dos sócios (Ciência da Computação, UFF) veio de um pedido do
// usuário na sessão de desenvolvimento de 01/10 e deve ser conferida pelos
// três antes da publicação.
export const quemFaz = {
  titulo: ["Três sócios,", "um responsável por etapa."],
  lide: "Venda, desenvolvimento e suporte. Nenhuma etapa é terceirizada.",
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
    { iniciais: "GY", nome: "Gabriel Ribeiro Ota Yida", funcao: "Direção e vendas", foto: "gabriel-ribeiro-ota-yida" },
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
          "Medir antes de afirmar, testar antes de entregar e deixar o site fácil de outra pessoa cuidar, se um dia for preciso. O cuidado é o mesmo para qualquer tamanho de negócio.",
      },
      {
        numero: "02",
        titulo: "O problema",
        texto:
          "Comércios com anos de casa e sem site próprio, que dependem de uma rede social que muda as regras sem aviso.",
      },
      {
        numero: "03",
        titulo: "Na prática",
        texto: "Preço publicado, prazo por escrito e site testado antes da entrega.",
      },
      {
        numero: "04",
        titulo: "O começo",
        texto: "Como o Atlas ainda não tem clientes, os três primeiros contratos têm condição própria: quem contrata primeiro corre um risco, e o preço reconhece isso.",
      },
    ],
  },
  nome: {
    // No tempo do mito (R10, D17): o texto logo abaixo diz "Atlas sustenta o céu sobre os ombros".
    titulo: "Atlas sustenta o céu.",
    texto:
      "Na mitologia grega, Atlas carrega o céu nos ombros. O nome diz o propósito: sustentar o que você já construiu, sem tomar o seu lugar. No logotipo, o globo fica sobre o ombro da letra A.",
  },
};

/** O sócio que vai à visita (producao/esteira/01-processo.md:77). */
const vendas = quemFaz.socios.find((s) => s.funcao.includes("vendas"));
if (!vendas) throw new Error("conteudo/site.ts: nenhum sócio com a função de vendas em quemFaz.socios");

export const trabalho = {
  // Cada fato uma vez: o número fica na marca, e o título e o texto não o repetem. O texto de cada etapa é o da página
  // O trabalho, o mesmo no llms.txt (R10, integração, 01/11; a prova de R10/paginas/o-trabalho.md, 3.2, com a D4). Até
  // então, o llms.txt dizia que o responsável "fornece as fotografias do local", o que só vale no Essencial
  // (01-processo.md:78).
  passos: [
    {
      titulo: "Visita e briefing",
      marca: { valor: "1", rotulo: "visita presencial" },
      // 01-processo.md:77 (quem vai e "nunca se entrega o formulário ao cliente para responder depois") e :78 (30 min no
      // Essencial, 45 no Profissional, 1 h no Completo).
      texto: `${vendas.nome} vai até o seu negócio para uma conversa de 30 a 60 minutos. O formulário é preenchido ali mesmo, com você, e não fica para depois.`,
    },
    {
      titulo: "Rascunho",
      marca: { valor: "24 h", rotulo: "após o briefing completo" },
      // 01-processo.md:164 (o endereço temporário, com noindex).
      texto: "Você recebe por link o site já navegável, com textos e fotos reais, sem banco de imagens nem inteligência artificial. Ele fica num endereço provisório, fora do Google, até a sua aprovação.",
    },
    {
      titulo: "Revisões",
      marca: { valor: "2", rotulo: "rodadas sem custo" },
      // 01-processo.md:178 ("o que excede o escopo do plano é orçado antes de ser feito, nunca cobrado depois").
      texto: "Você pede os ajustes sobre o rascunho. O que não estiver no plano é orçado antes de ser feito, nunca cobrado depois.",
    },
    {
      titulo: "Publicação",
      marca: { valor: "7 a 15", rotulo: "dias úteis, em geral" },
      // 01-processo.md:203 (a segunda parcela da criação, na publicação).
      texto: "Com tudo conferido, o site vai ao ar. A segunda metade da criação é paga aqui. Domínio, hospedagem e manutenção ficam na mensalidade.",
    },
  ],
};

export const fundacao = {
  rotulo: "Condição de fundação",
  // A condição numa redação só, a de conteudo/planos.ts (R10, 28/10, decisão do aprovador), partida nas duas linhas do
  // título: "Nos três primeiros contratos," e "50% de desconto na criação.". Em percentual: "50%" se lê mais depressa
  // que "½" e é a forma habitual de um desconto. Em reais (R$ 450 a R$ 1.200), não: os valores constam como
  // [A CONFIRMAR] no contexto comercial, §2. A parte da ata (IV.3) sobre a mensalidade saiu do site em 28/10.
  titulo: condicaoDeFundacao.replace(", ", ",\n").split("\n"),
  lide: "Quem contrata uma agência nova corre um risco, e o preço reconhece isso. São só três contratos, e a condição acaba com eles. Em troca, cada um vira estudo de caso, com autorização assinada no início.",
  termos: [
    /** selos: o número desenhado ao lado, um globo da marca por contrato. */
    { valor: "3", rotulo: "contratos com esta condição", selos: 3 },
  ],
};

export const fim = {
  titulo: ["Comece pelo orçamento."],
  lide: "Dois toques para saber o valor. Depois, a conversa, sem compromisso.",
};

export const rodape = {
  /**
   * A definição do Atlas, em aposto (a agência nunca é sujeito), só com fatos que o site já mostra: os preços de
   * conteudo/planos.ts, o prazo do lide da capa e o dos passos, a UFF de O Atlas. É também a `description` do
   * negócio nos dados estruturados (lib/dados-estruturados.ts). 16/10, SEO e GEO; até então, "Sites profissionais
   * para o comércio local de Niterói."
   */
  descricao: `Atlas Digital: sites para pequenos negócios de Niterói (RJ), feitos por três estudantes de Ciência da Computação da UFF. Criação de ${reais(faixaDePreco.minimo)} a ${reais(faixaDePreco.maximo)}; primeiro rascunho em até 24 horas após o briefing completo; publicação em 7 a 15 dias úteis, em geral.`,
  selo: "Este site é do plano Completo. O Essencial e o Profissional têm o mesmo padrão, com menos páginas e menos movimento. Nenhum cookie, nenhum rastreador.",
  direitos: "© 2026 Atlas Digital",
};

export const falarNoWhatsApp = "Falar no WhatsApp";

// Simulador de planos: os sites de app/demos/, um por plano, no palco da
// escada (components/secoes/escada.tsx), e os rótulos do diálogo.
export const simulador = {
  abrir: "Ver o site aqui",
  novaAba: "Abrir em nova aba",
  fechar: "Fechar o simulador",
  aparelhos: { computador: "Computador", celular: "Celular" },
  planos: "Planos",
  nichos: "Nichos do plano",
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
  /**
   * Os sites de demonstração, até quatro por plano, cada um num nicho
   * (desde 08/10, a pedido do usuário: o simulador mostra quatro sites por
   * plano, um nicho em cada). `id` é o nicho e nomeia as prévias
   * (public/simulador/<id>-*.webp, ferramentas/capturar-simulador.mjs);
   * `rotulo` é o nome curto no seletor de nichos. O primeiro de cada plano é
   * o exemplo dele nas outras seções (planos, para quem, orçamento).
   */
  sites: [
    {
      id: "nutricao",
      rotulo: "Nutrição",
      plano: "essencial",
      /** O tom do site (app/nichos.css), para o fundo da prévia e a marca nos cartões. */
      tom: "nutricao",
      caminho: "/demos/nutricao",
      endereco: "agenciaatlasdigital.com/demos/nutricao",
      nome: "Nutrição Icaraí",
      nicho: "Consultório de nutrição",
      paginas: 3,
      resumo: "Três páginas, o limite do plano: os valores à vista, o WhatsApp à mão e o mapa do bairro.",
      experimente: "Passe pelas três páginas do índice (I, II e III) e abra o WhatsApp pelo botão.",
    },
    {
      id: "petshop",
      rotulo: "Pet shop",
      plano: "essencial",
      tom: "petshop",
      caminho: "/demos/petshop",
      endereco: "agenciaatlasdigital.com/demos/petshop",
      nome: "Banho e Tosa São Francisco",
      nicho: "Banho e tosa",
      paginas: 3,
      resumo: "Três páginas: o valor e a duração por porte e pelagem, o leva e traz com dia fixo por bairro e o carimbo que abre o WhatsApp.",
      experimente: "Em Serviços e valores, passe o ponteiro pela tabela do banho; depois, peça o horário pelo carimbo, com a mensagem pronta.",
    },
    {
      id: "deposito",
      rotulo: "Depósito",
      plano: "profissional",
      tom: "deposito",
      caminho: "/demos/deposito",
      endereco: "agenciaatlasdigital.com/demos/deposito",
      nome: "Depósito Engenhoca",
      nicho: "Material de construção",
      paginas: 6,
      resumo: "Seis páginas. A calculadora de materiais monta a lista num cupom, pronta para enviar, e o site mostra se a loja está aberta agora.",
      experimente: "Abra a aba 02, mude as medidas e envie a lista pronta pelo cupom.",
    },
    {
      id: "restaurante",
      rotulo: "Restaurante",
      plano: "profissional",
      tom: "restaurante",
      caminho: "/demos/restaurante",
      endereco: "agenciaatlasdigital.com/demos/restaurante",
      nome: "Cozinha do Ingá",
      nicho: "Restaurante de almoço",
      paginas: 6,
      resumo: "Seis páginas, com o prato do dia na lousa. O pedido soma os pratos e o frete do bairro e envia o total pelo WhatsApp.",
      experimente: "Na aba Pedido, escolha dois pratos e o bairro: o frete entra à parte, e o total aparece antes de enviar.",
    },
    {
      id: "barbearia",
      rotulo: "Barbearia",
      plano: "completo",
      tom: "barbearia",
      caminho: "/demos/barbearia",
      endereco: "agenciaatlasdigital.com/demos/barbearia",
      nome: "Barbearia Santa Rosa",
      nicho: "Barbearia",
      paginas: 7,
      resumo: "Sete páginas em 3D, com fichas de metal que viram ao rolar. Duas ferramentas: o agendamento e a agenda de retorno.",
      experimente: "Role o início devagar: a moeda da casa vira nas fichas d’A Navalha e d’O Clássico e na placa de 1996. Depois, calcule a janela de retorno e leve o pedido ao agendador.",
    },
    {
      id: "odontologia",
      rotulo: "Odontologia",
      plano: "completo",
      tom: "odontologia",
      caminho: "/demos/odontologia",
      endereco: "agenciaatlasdigital.com/demos/odontologia",
      nome: "Odontologia Boa Viagem",
      nicho: "Clínica odontológica",
      paginas: 12,
      resumo: "Doze páginas, sem preços, que o conselho proíbe. No mapa dos dentes, o paciente toca na região e a leva ao pedido de avaliação.",
      experimente: "Na capa, toque numa região do mapa dos dentes: o lápis a circula e os tratamentos dela aparecem. Depois, leve a região ao pedido de avaliação e veja a mensagem montada.",
    },
  ],
} as const;

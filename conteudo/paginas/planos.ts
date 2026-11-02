// O texto novo só desta parte do site (R10, fase 0, 28/10): o que for novo e só dela mora aqui, e não em
// conteudo/site.ts. Na norma culta, no registro impessoal (producao/esteira/10-texto-e-conteudo.md, 1).
// R10, fase 1 (28/10, o agente de planos): a tabela, a nota 1, os extras e os sites de exemplo. As fontes de cada
// linha estão em registros/atlas/design-v2/R10/paginas/planos.md, 3.2 a 3.4; os preços saem de conteudo/planos.ts.

import { condicaoDeFundacao, type Plano } from "@/conteudo/planos";
import { fundacao } from "@/conteudo/site";

/** O valor de uma linha num plano: o visto (true), a ausência (false) ou o valor escrito. */
export type ValorDaLinha = boolean | string;
export type Linha = {
  rotulo: string;
  /** A explicação curta, embaixo do rótulo, quando a linha precisa. */
  explicacao?: string;
  valores: Record<Plano["id"], ValorDaLinha>;
};
type Grupo = { titulo: string; linhas: Linha[] };

const todos = { essencial: true, profissional: true, completo: true };
const doProfissional = { essencial: false, profissional: true, completo: true };
const doCompleto = { essencial: false, profissional: false, completo: true };

/**
 * A tabela dos planos (D7, D19): na mesa, a <table>; no celular, um quadro por plano na galeria. As duas leem daqui.
 * O título e o lide são [provisório] (contrato, 3.3, item 1). A tarefa de cada plano é a de
 * producao/esteira/03-planos.md, 1 (RATIFICADO); "briefing" sem glosa (D4); "o que permite o https" no lugar do
 * ícone de segurança (a síntese, 5.2, item 2).
 */
export const tabela = {
  titulo: "O que cada plano inclui.",
  lide: "O preço está publicado: sem proposta e sem reunião. Cada plano inclui o que o anterior inclui.",
  /** O nome da coluna dos rótulos, só para o leitor de tela. */
  item: "Item",
  tarefa: {
    rotulo: "A tarefa do site",
    valores: {
      essencial: "Para ser encontrado e chamado.",
      profissional: "Para ser escolhido.",
      completo: "Para o site trabalhar pelo negócio.",
    } as Record<Plano["id"], string>,
  },
  criacao: { rotulo: "Criação", explicacao: "paga uma vez, em duas metades: no briefing e com o site no ar" },
  porMes: { rotulo: "Por mês", explicacao: "a partir do mês seguinte à publicação" },
  grupos: <Grupo[]>[
    {
      titulo: "O site",
      linhas: [
        { rotulo: "Páginas", valores: { essencial: "Até 3", profissional: "Até 6", completo: "Sem limite" } },
        { rotulo: "Textos escritos pelo Atlas", valores: todos },
        { rotulo: "Botão de WhatsApp e mapa", valores: todos },
        { rotulo: "Otimização para a busca local", explicacao: "o site preparado para quem procura o bairro no Google", valores: todos },
        { rotulo: "Galeria e formulário", valores: doProfissional },
        {
          rotulo: "Funcionalidade sob medida",
          explicacao: "uma ferramenta do ofício, como a calculadora de materiais do depósito",
          valores: { essencial: false, profissional: "Uma", completo: "Duas" },
        },
      ],
    },
    {
      titulo: "O movimento",
      linhas: [
        { rotulo: "Conteúdo que aparece ao rolar e troca suave de página", valores: todos },
        { rotulo: "Galeria de fotos que se passa com o dedo, cabeçalho de vidro e menu que marca a página aberta", valores: doProfissional },
        { rotulo: "Todos os efeitos de movimento", explicacao: "como os deste site, que é do plano Completo", valores: doCompleto },
      ],
    },
    {
      titulo: "Com o site no ar",
      linhas: [
        {
          rotulo: "Domínio, hospedagem, certificado e cópias de segurança",
          explicacao: "o endereço próprio, o lugar onde o site fica guardado, o que permite o https e a cópia guardada do site",
          valores: todos,
        },
        { rotulo: "Manutenção mensal", explicacao: "alterações de texto, preço ou horário", valores: todos },
        { rotulo: "Relatório mensal de acessos", explicacao: "quantos pedidos o site recebeu no mês", valores: doProfissional },
        { rotulo: "Revisões trimestrais de conteúdo", explicacao: "a cada três meses, a releitura de textos, preços e fotos", valores: doCompleto },
        { rotulo: "Atendimento prioritário", explicacao: "resposta no mesmo dia útil", valores: doCompleto },
      ],
    },
  ],
  incluido: "Incluído",
  naoIncluido: "Não incluído",
  /** O nome acessível do "Escolher" do recomendado leva a palavra (S4). */
  recomendado: "recomendado",
  /** A chamada da nota 1, para o leitor de tela. */
  chamada: "Nota 1",
};

/**
 * A nota 1 da linha "Criação" (D3), com id="fundacao" (o destino de conteudo/site.ts, orcamento.completo.fundacao):
 * a condição na forma única e o fim do lide da fundação, literal (contrato, 3.3).
 */
const emTroca = fundacao.lide.indexOf("Em troca");
if (emTroca < 0) throw new Error("conteudo/paginas/planos.ts: o lide da fundação perdeu a frase \"Em troca, …\"");
export const notaDeFundacao = `${condicaoDeFundacao} ${fundacao.lide.slice(emTroca)}`;

/** Os extras (os Módulos de antes): o título é [provisório] (contrato, 3.3, item 3); o lide, a proposta do estudo. */
export const extras = {
  titulo: "Extras, para qualquer plano.",
  lide: "Somam-se ao plano escolhido. Cada um tem o preço de criação e, quando há, o de cada mês.",
  colunas: { extra: "Extra", criacao: "Uma vez", mensal: "Por mês" },
  unidades: { criacao: "uma vez", mensal: "por mês", porPagina: "por página", semMensalidade: "sem mensalidade" },
};

/**
 * Os sites de exemplo (a escada do simulador): o lide sem ordem ao leitor e com "nicho" (D4); o rótulo dos seletores à
 * vista; as notas de cada plano dizem o que o site faz, e não a animação (R9, 5.3; [provisório]). No pé, a frase para o
 * leigo antes do código (contrato, 3.3, "O código").
 */
export const sitesDeExemplo = {
  lide: "Sites completos, um por nicho, agrupados por plano. Cada site de exemplo funciona por inteiro.",
  rotuloDoPlano: "Plano",
  notas: {
    essencial: "Essencial: três páginas, com quem é, o que faz, onde fica e como chamar.",
    profissional: "Profissional: até seis páginas e uma ferramenta; no depósito, a calculadora de material.",
    completo: "Completo: páginas sem limite e duas ferramentas; na barbearia, o pedido de horário e a janela de retorno.",
  } satisfies Record<Plano["id"], string>,
  /** No celular, o simulador não abre (pedido de 17/10): o botão abre o site em nova aba. */
  abrirOSite: "Abrir o site",
  fraseDoCodigo: "Os sites de exemplo são fictícios e ficam fora do Google: o servidor manda este aviso junto de cada página deles.",
};

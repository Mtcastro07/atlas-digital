// Perguntas frequentes. Em terceira pessoa, nunca na voz do cliente.
// Alimentam a seção Dúvidas, os dados estruturados FAQPage e o llms.txt.
// Desde 28/10 (R10, decisão D18 do aprovador): as respostas 1, 2, 3 e 9 reescritas (as do E6, com o prazo na redação
// única da D10 e "o que permite o https" como a glosa do certificado) e duas perguntas novas, a 11 e a 12. São doze; a porta de
// Dúvidas no início e a próxima página contam daqui (duvidas.length). Os valores da 11 saem de conteudo/planos.ts.

import { condicaoDeFundacao, faixaDePreco, modulos, planos } from "@/conteudo/planos";
import { reais } from "@/lib/moeda";

const mensais = planos.map((p) => p.mensal);
const profissional = planos.find((p) => p.id === "profissional")!;
const agenda = modulos.find((m) => m.id === "agenda")!;

export type Duvida = { pergunta: string; resposta: string };

export const duvidas: Duvida[] = [
  {
    pergunta: "O que significa “em 24h”?",
    resposta:
      "As 24 horas são o prazo do primeiro rascunho, e não do site no ar. O prazo corre a partir do briefing completo. Depois vêm duas rodadas de ajustes e a aprovação. O site vai ao ar em 7 a 15 dias úteis, em geral.",
  },
  {
    pergunta: "O que a mensalidade compreende?",
    resposta:
      "A mensalidade mantém o site no ar e em dia. Ela cobre o endereço próprio (o domínio), o espaço onde o site fica guardado (a hospedagem), o certificado de segurança (o que permite o https), as cópias de segurança e as trocas de texto, preço ou horário. Página nova ou ferramenta nova tem orçamento à parte.",
  },
  {
    pergunta: "O que acontece com o site se o contrato terminar?",
    resposta:
      "As condições do encerramento — de quem fica o endereço do site (a titularidade do domínio), a entrega dos arquivos e o prazo para a retirada do ar — constam do contrato, por escrito, antes do início do trabalho. Nada é decidido no fim.",
  },
  {
    pergunta: "O perfil no Instagram substitui o site?",
    resposta:
      "O perfil depende de uma plataforma que altera regra e alcance sem aviso. O site aparece na busca por bairro, carrega em segundos e não concorre com anúncio de terceiros.",
  },
  {
    pergunta: "Quem redige os textos?",
    resposta:
      "A redação está incluída e parte do briefing, sem depoimento, número ou promessa inventados: o que falta é pedido ao cliente, nunca suposto. O cliente revisa e aprova antes da publicação.",
  },
  {
    pergunta: "O site funciona bem no celular?",
    resposta:
      "O site é construído em dois passes: primeiro a mesa, depois o celular, página por página, com o mesmo cuidado. O celular não é a tela grande encolhida: tem disposição própria e passa pela mesma verificação.",
  },
  {
    pergunta: "Como o pagamento é feito?",
    resposta:
      "O valor de criação é dividido em duas parcelas: metade no briefing, metade na publicação. A mensalidade tem início no mês seguinte à publicação.",
  },
  {
    pergunta: "Vale trocar um site que já existe?",
    resposta:
      "Depende do estado atual. A avaliação é gratuita e leva cerca de um dia útil: o endereço é analisado em velocidade de carregamento, apresentação no celular e posição na busca local. O resultado é apresentado sem compromisso, mesmo quando a conclusão é que não vale trocar.",
  },
  {
    pergunta: "Como a qualidade do site é verificada?",
    resposta:
      // O espaço fixo (U+00A0) entre o número e a unidade: "1920 px", "44 px" e "art. 63" nunca se separam na linha.
      "Antes da entrega, cada site passa por dez blocos de verificação, do celular ao computador: a leitura em cada tela, o contraste, o uso pelo teclado, a velocidade, a privacidade e o texto. No detalhe: catorze larguras de tela, de 320 a 1920\u00a0px, sem rolagem lateral; alvos de toque de no mínimo 44\u00a0px; contraste medido no que o navegador exibe; navegação completa pelo teclado; funcionamento sem JavaScript e com o movimento reduzido. A acessibilidade é exigência da Lei 13.146/2015, art.\u00a063.",
  },
  {
    pergunta: "O site coleta dados de quem o visita?",
    resposta:
      "O site é construído sem cookie e sem rastreador de terceiros, com as fontes servidas do próprio endereço: nada é gravado no aparelho de quem visita, e não há banner de consentimento a aceitar. Quando um módulo trata dados pessoais, como a agenda, o tratamento é descrito na política de privacidade, publicada antes de o site ir ao ar.",
  },
  {
    pergunta: "Quanto custa um site?",
    resposta: `A criação custa de ${reais(faixaDePreco.minimo)} a ${reais(faixaDePreco.maximo)}, conforme o plano, e se paga uma vez, em duas parcelas. A mensalidade vai de ${reais(Math.min(...mensais))} a ${reais(Math.max(...mensais))}. Os extras somam-se ao total. Por exemplo, o plano ${profissional.nome} com a ${agenda.nome} sai por ${reais(profissional.criacao + agenda.criacao)} de criação e ${reais(profissional.mensal + (agenda.mensal ?? 0))} por mês. ${condicaoDeFundacao}`,
  },
  {
    pergunta: "O que o cliente precisa fazer?",
    resposta:
      "Receber a visita para a conversa do briefing e responder às perguntas do formulário. No Essencial, enviar as fotos do local; no Profissional e no Completo, elas são feitas na visita. Depois, abrir o rascunho no celular, pedir os ajustes e aprovar a publicação. A criação se paga metade no briefing e metade na publicação. A redação dos textos está incluída.",
  },
];

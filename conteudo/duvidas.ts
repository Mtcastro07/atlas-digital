// Perguntas frequentes. Desde 03/11 (pedido do usuário: "textos mais direcionados ao cliente com linguagem simples"),
// as respostas falam com o cliente ("você").
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
      "As 24 horas são o prazo do primeiro rascunho, e não do site no ar. Elas contam a partir do briefing completo. Depois vêm duas rodadas de ajustes e a sua aprovação. O site vai ao ar em 7 a 15 dias úteis, em geral.",
  },
  {
    pergunta: "O que a mensalidade cobre?",
    resposta:
      "A mensalidade mantém o site no ar e em dia. Ela cobre o endereço próprio (o domínio), o lugar onde o site fica guardado (a hospedagem), o certificado de segurança, as cópias de segurança e as trocas de texto, preço ou horário. Página nova ou ferramenta nova tem orçamento à parte.",
  },
  {
    pergunta: "O que acontece com o site se o contrato terminar?",
    resposta:
      "Está tudo no contrato, por escrito, antes de começar: de quem fica o endereço do site (o domínio), a entrega dos arquivos e o prazo para tirar o site do ar. Nada é decidido no fim.",
  },
  {
    pergunta: "O perfil no Instagram substitui o site?",
    resposta:
      "O perfil depende de uma plataforma que muda as regras e o alcance sem aviso. O site aparece na busca pelo bairro, abre em segundos e não divide espaço com anúncio de outros.",
  },
  {
    pergunta: "Quem escreve os textos?",
    resposta:
      "O Atlas escreve, a partir do briefing, e isso já está incluído. Nada de depoimento, número ou promessa inventados: o que faltar é perguntado a você. Você revisa e aprova antes da publicação.",
  },
  {
    pergunta: "O site funciona bem no celular?",
    resposta:
      "Sim. Cada página é montada também para a tela do celular, sem ser a tela grande encolhida, e passa pelos mesmos testes.",
  },
  {
    pergunta: "Como é o pagamento?",
    resposta:
      "A criação é paga em duas parcelas: metade no briefing e metade na publicação. A mensalidade começa no mês seguinte à publicação.",
  },
  {
    pergunta: "Vale trocar um site que já existe?",
    resposta:
      "Depende de como ele está. A avaliação é gratuita e leva cerca de um dia útil: o site é analisado em velocidade, aparência no celular e posição na busca local. O resultado vem sem compromisso, mesmo quando a conclusão é que não vale trocar.",
  },
  {
    pergunta: "Como a qualidade do site é conferida?",
    resposta:
      // O espaço fixo (U+00A0) em "art. 63": o número não fica sozinho no começo da linha.
      "Antes da entrega, cada site passa por dez testes, do celular ao computador: a leitura em cada tela, o contraste, o uso pelo teclado, a velocidade, a privacidade e o texto. A acessibilidade é exigida pela Lei Brasileira de Inclusão (Lei 13.146/2015, art.\u00a063).",
  },
  {
    pergunta: "O site coleta dados de quem visita?",
    resposta:
      "O site é feito sem cookie e sem rastreador de terceiros: nada é gravado no aparelho de quem visita, e não há aviso de cookies para aceitar. Quando um extra trata dados pessoais, como a agenda, o tratamento é descrito na política de privacidade, publicada antes de o site ir ao ar.",
  },
  {
    pergunta: "Quanto custa um site?",
    resposta: `A criação custa de ${reais(faixaDePreco.minimo)} a ${reais(faixaDePreco.maximo)}, conforme o plano, e é paga uma vez, em duas parcelas. A mensalidade vai de ${reais(Math.min(...mensais))} a ${reais(Math.max(...mensais))}. Os extras se somam ao total. Por exemplo, o plano ${profissional.nome} com a ${agenda.nome} sai por ${reais(profissional.criacao + agenda.criacao)} de criação e ${reais(profissional.mensal + (agenda.mensal ?? 0))} por mês. ${condicaoDeFundacao}`,
  },
  {
    pergunta: "O que eu preciso fazer?",
    resposta:
      "Você recebe a visita para a conversa do briefing e responde às perguntas do formulário. No Essencial, envia as fotos do local; no Profissional e no Completo, elas são feitas na visita. Depois, abre o rascunho no celular, pede os ajustes e aprova a publicação. A criação é paga metade no briefing e metade na publicação. Os textos já estão incluídos.",
  },
];

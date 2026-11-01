// Perguntas frequentes. Em terceira pessoa, nunca na voz do cliente.
// Alimentam a seção Dúvidas e os dados estruturados FAQPage.

export type Duvida = { pergunta: string; resposta: string };

export const duvidas: Duvida[] = [
  {
    pergunta: "O que significa “em 24h”?",
    resposta:
      "O prazo corresponde ao primeiro rascunho navegável, contado da entrega do briefing completo — não ao site publicado. A publicação ocorre depois das duas revisões e da aprovação, em geral entre sete e quinze dias úteis.",
  },
  {
    pergunta: "O que a mensalidade compreende?",
    resposta:
      "Hospedagem, domínio, certificado de segurança, cópias de segurança e alterações de texto, preço ou horário. Páginas novas e funcionalidades novas são orçadas em separado.",
  },
  {
    pergunta: "O que acontece com o site se o contrato terminar?",
    resposta:
      "As condições do encerramento — a titularidade do domínio, a entrega dos arquivos e o prazo para a retirada do ar — constam do contrato, por escrito, antes do início do trabalho. Nada é decidido no fim.",
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
      "O site é construído primeiro para o celular e depois adaptado à tela grande.",
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
      "Antes da entrega, cada site passa por uma régua de dez blocos: catorze larguras de tela, de 320 a 1920 px, sem rolagem lateral; alvos de toque de no mínimo 44 px; contraste medido no que o navegador exibe; navegação completa pelo teclado; funcionamento sem JavaScript e com o movimento reduzido. A acessibilidade é exigência da Lei 13.146/2015, art. 63.",
  },
  {
    pergunta: "O site coleta dados de quem o visita?",
    resposta:
      "O site é construído sem cookie e sem rastreador de terceiros, com as fontes servidas do próprio endereço: nada é gravado no aparelho de quem visita, e não há banner de consentimento a aceitar. Quando um módulo trata dados pessoais, como a agenda, o tratamento é descrito na política de privacidade, publicada antes de o site ir ao ar.",
  },
];

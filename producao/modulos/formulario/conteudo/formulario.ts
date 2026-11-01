// conteudo/formulario.ts — a lista de serviços e os textos do formulário de contato (producao/esteira/14-funcionalidades/02-formulario.md,
// seções 2, 3 e 8). Do cliente: reescreva a partir do briefing. De fábrica, o banho e tosa de exemplo da base.

export type ServicoDoFormulario = { id: string; nome: string };

/**
 * A lista fechada: o servidor só aceita estes ids ("só valores da lista do site"). O nome aparece na tela e no assunto
 * do e-mail; o texto digitado nunca vai para o assunto.
 */
export const servicos: readonly ServicoDoFormulario[] = [
  { id: "banho", nome: "Banho" },
  { id: "tosa-maquina", nome: "Tosa na máquina" },
  { id: "tosa-tesoura", nome: "Tosa na tesoura" },
];

/** O prazo de guarda dos contatos, em meses: a frase junto do botão e o aviso de privacidade leem daqui. */
export const guardaEmMeses = 12;

export type TextosDoFormulario = {
  campos: { nome: string; telefone: string; email: string; servico: string; mensagem: string };
  marcas: { obrigatorio: string; opcional: string; umDosDois: string };
  /** Nichos de saúde: a nota sob a mensagem ("Não descreva sintomas aqui"). Vazia nos demais. */
  notaDeSaude: string;
  /** A frase no ponto da coleta, com o prazo de guarda (producao/esteira/17-conformidade-e-normas.md, seção 5.2). */
  aviso: string;
  vinculoDoAviso: string;
  botao: string;
  enviando: string;
  resumoDeErros: string;
  limite: { antes: string; vinculo: string; depois: string };
  falhou: { antes: string; vinculo: string; depois: string };
  /** A saudação do WhatsApp quando o formulário não funciona; o que a pessoa escreveu vai depois dela. */
  saudacaoDoWhatsapp: string;
};

export const textos: TextosDoFormulario = {
  campos: { nome: "Nome", telefone: "Telefone", email: "E-mail", servico: "Serviço", mensagem: "Mensagem" },
  marcas: { obrigatorio: "(obrigatório)", opcional: "(opcional)", umDosDois: "(um dos dois)" },
  notaDeSaude: "",
  aviso: `Usamos estes dados só para responder ao seu pedido. Eles ficam guardados por ${guardaEmMeses} meses.`,
  vinculoDoAviso: "Aviso de privacidade",
  botao: "Enviar a mensagem",
  enviando: "Enviando…",
  resumoDeErros: "Confira os campos marcados.",
  limite: { antes: "Muitas mensagens deste endereço na última hora. Tente mais tarde, ou", vinculo: "chame no WhatsApp", depois: "." },
  falhou: { antes: "A mensagem não foi enviada. Tente de novo, ou", vinculo: "chame no WhatsApp", depois: "." },
  saudacaoDoWhatsapp: "Olá. Tentei falar pelo formulário do site.",
};

/** A página de contato (app/contato/page.tsx). O título é o da página, em conteudo/site.ts. */
export const paginaDeContato = {
  lide: "Escreva o pedido. A resposta vem pelo telefone ou e-mail informado.",
  canais: "Outros canais",
  horario: "Horário",
};

/** A confirmação (app/contato/enviado/page.tsx): o prazo de resposta vem de conteudo/negocio.ts. */
export const confirmacao = {
  titulo: "Mensagem recebida.",
  complemento: "A resposta vem pelo telefone ou e-mail informado.",
  voltar: "Voltar ao início",
  /** Título, descrição e cartão da página, que fica fora da busca (noindex) e fora do menu. */
  metadados: {
    titulo: "Mensagem recebida",
    tituloCurto: "Mensagem recebida",
    descricao: "A mensagem chegou. O prazo de resposta e o caminho de volta ao site.",
    descricaoCurta: "A mensagem chegou.",
  },
};

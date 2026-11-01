// conteudo/legal-agenda.ts — os blocos [AGENDA] do aviso de privacidade (producao/esteira/modelos/aviso-de-privacidade.md), montados dos dados do
// site: a marcação de horário e o cookie de sessão do painel do dono. Em conteudo/legal.ts: o `blocoDaAgenda` entra em
// avisoDePrivacidade.blocos, depois do bloco de contato por WhatsApp e telefone, e o `paragrafoDoPainel` se acrescenta
// aos parágrafos do bloco "O que este site guarda no seu aparelho" (producao/modulos/README.md). Leitura de leigo:
// A CONFIRMAR com advogado antes de publicar.
import { config } from "./agenda";
import type { BlocoLegal } from "./legal";
import { negocio } from "./negocio";

export const blocoDaAgenda: BlocoLegal = {
  titulo: "A marcação de horário",
  itens: [
    "O que se pede: nome, e-mail, telefone (opcional), o serviço, o profissional e o horário escolhidos.",
    config.consentimento
      ? "Para que: confirmar, lembrar e, se você pedir, cancelar a marcação. A base legal é o seu consentimento, específico e destacado, dado na caixa do formulário (LGPD, art. 11, I), porque procurar o atendimento já revela um dado de saúde. Você pode retirá-lo a qualquer momento pelo canal de privacidade, e a marcação é cancelada."
      : "Para que: confirmar, lembrar e, se você pedir, cancelar a marcação. A base legal é o seu pedido (LGPD, art. 7º, V); por isso não há caixa de consentimento.",
    "O que se envia: um e-mail de confirmação, com o convite para a sua agenda, e um lembrete 24 horas antes.",
    `Por quanto tempo: até ${config.guardaMeses} meses depois do atendimento; depois, as reservas são apagadas.`,
    "O que nunca se pede: nenhuma informação sobre a sua saúde. O motivo do atendimento se trata na própria consulta, não no site.",
  ],
};

/**
 * O parágrafo do cookie do painel: a única exceção ao "este site não usa cookies", e só existe na área restrita da casa,
 * não para quem visita o site (producao/esteira/17-conformidade-e-normas.md, seção 5.5). Estritamente necessário: dispensa banner.
 */
export const paragrafoDoPainel = `A única exceção é a área restrita de ${negocio.nome}, onde um cookie de sessão, estritamente necessário, mantém a entrada da equipe. Ele não existe para quem visita o site.`;

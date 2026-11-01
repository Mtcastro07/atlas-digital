// conteudo/legal-formulario.ts — o bloco [FORMULÁRIO] do aviso de privacidade (producao/esteira/modelos/aviso-de-privacidade.md),
// montado dos dados do site. Insira-o em avisoDePrivacidade.blocos, em conteudo/legal.ts, depois do bloco de contato por
// WhatsApp e telefone (producao/modulos/README.md). Leitura de leigo: A CONFIRMAR com advogado antes de publicar.
import { guardaEmMeses } from "./formulario";
import type { BlocoLegal } from "./legal";
import { negocio } from "./negocio";

export const blocoDoFormulario: BlocoLegal = {
  titulo: "O formulário de contato",
  itens: [
    "O que se pede: nome, telefone ou e-mail, o serviço e a mensagem (opcional).",
    "Para que: responder ao seu pedido. A base legal é o pedido que você faz antes de contratar (LGPD, art. 7º, V); por isso não há caixa de consentimento.",
    `Onde fica: os dados chegam por e-mail a ${negocio.nome}. O site não guarda cópia deles.`,
    `Por quanto tempo: ${guardaEmMeses} meses a partir do envio. Depois disso, são apagados da caixa de e-mail.`,
    "Contra o envio automático, o site conta os envios por endereço IP já transformado em código (hash com sal do dia), que se apaga no dia seguinte. O endereço IP em si não é guardado.",
  ],
};

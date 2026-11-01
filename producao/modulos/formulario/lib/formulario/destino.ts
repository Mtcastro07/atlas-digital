// lib/formulario/destino.ts — para onde vão a entrega do pedido e a contagem do limite por IP. ESTA É A LIGAÇÃO DO
// RASCUNHO, sem dependência: o limite na memória e uma entrega que não entrega. O formulário aparece com os campos, a
// validação e os estados; o envio de verdade entra até a publicação (producao/esteira/14-funcionalidades/README.md, seção 6).
// Na publicação, esta ligação dá lugar à de produção: copie
// lib/formulario/destino.producao.ts por cima deste arquivo (producao/modulos/README.md, passo "ligar o envio").
// Com SMTP_TESTE, a entrega daqui faz o que a de produção faz nos testes de ponta a ponta: "1" grava o e-mail composto em
// .teste/emails.jsonl, uma linha de JSON no formato do jsonTransport do nodemailer (from, to, replyTo, subject e text), e
// conta como enviado; "falha" simula o SMTP fora do ar. É variável de teste: nunca vai nas variáveis do web app publicado.
import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import { servicos } from "@/conteudo/formulario";
import { negocio } from "@/conteudo/negocio";
import { armazemEmMemoria } from "./limite";
import { montarEmail } from "./mensagem";
import type { Entrega } from "./processar";

/** O limite na memória do processo: serve ao rascunho, nunca à publicação (o web app dorme e acorda zerado). */
export const armazem = armazemEmMemoria();

/**
 * Fora do modo de teste, nada é entregue: a pessoa vê "A mensagem não foi enviada", com a saída pelo WhatsApp. Estado
 * verdadeiro; um "enviado" falso seria o defeito mais caro da funcionalidade (producao/esteira/14-funcionalidades/README.md, regra 8).
 */
export const entrega: Entrega = async (campos) => {
  if (process.env.SMTP_TESTE === "falha") throw new Error("SMTP simulado fora do ar");
  if (process.env.SMTP_TESTE) {
    await mkdir(".teste", { recursive: true }); // fora do git (.gitignore)
    const email = montarEmail(campos, { servicos, prazoDeResposta: negocio.prazoDeResposta });
    const linha = {
      from: { address: process.env.SMTP_USUARIO ?? "", name: `Site ${negocio.nome}` },
      to: [{ address: process.env.CONTATO_DESTINO ?? "", name: "" }],
      replyTo: email.responderPara ? [{ address: email.responderPara, name: "" }] : undefined,
      subject: email.assunto,
      text: email.texto,
    };
    await appendFile(".teste/emails.jsonl", `${JSON.stringify(linha)}\n`);
    return;
  }
  throw new Error("rascunho: a entrega por e-mail entra na publicação (lib/formulario/destino.producao.ts)");
};

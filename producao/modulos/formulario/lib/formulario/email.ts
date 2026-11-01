// lib/formulario/email.ts — Dependência: nodemailer 10.0.13, que traz os próprios tipos (aprovada pelo usuário em 08.10.2026;
// producao/modulos/README.md, seção 3).
// A entrega do formulário pelo SMTP da Hostinger, de uma caixa do domínio do cliente para a caixa que ele indicar
// (producao/esteira/14-funcionalidades/02-formulario.md, seção 6). A composição do texto é de mensagem.ts, sem dependência.
//
// SMTP_TESTE: "1" — nada sai, o e-mail vira JSON e uma linha de .teste/emails.jsonl (o teste de ponta a ponta lê daí);
//             "falha" — simula o SMTP fora do ar. Sem a variável, o envio é de verdade.
import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { servicos } from "@/conteudo/formulario";
import { negocio } from "@/conteudo/negocio";
import { montarEmail } from "./mensagem";
import type { Campos } from "./validar";

const teste = process.env.SMTP_TESTE;

// Dois transportes, e não um só escolhido por condicional: o tipo do createTransport e o do que o sendMail devolve
// dependem do argumento (o da JSON tem `message`; o do SMTP, não), e uma união dos dois não compila.
const transporte = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: { user: process.env.SMTP_USUARIO, pass: process.env.SMTP_SENHA },
});

export async function enviarEmail(c: Campos) {
  if (teste === "falha") throw new Error("SMTP simulado fora do ar");
  const email = montarEmail(c, { servicos, prazoDeResposta: negocio.prazoDeResposta });
  const mensagem: Mail.Options = {
    from: { name: `Site ${negocio.nome}`, address: process.env.SMTP_USUARIO! },
    to: process.env.CONTATO_DESTINO,
    replyTo: email.responderPara,
    subject: email.assunto,
    text: email.texto,
  };
  if (teste) {
    // Nada sai: o e-mail vira JSON e uma linha de .teste/emails.jsonl.
    const info = await nodemailer.createTransport({ jsonTransport: true }).sendMail(mensagem);
    await mkdir(".teste", { recursive: true }); // fora do git (.gitignore)
    await appendFile(".teste/emails.jsonl", `${info.message}\n`);
    return;
  }
  await transporte.sendMail(mensagem);
}

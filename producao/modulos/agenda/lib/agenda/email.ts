// lib/agenda/email.ts — Dependência: nodemailer 10.0.13, que traz os próprios tipos (aprovada pelo usuário em 08.10.2026;
// producao/modulos/README.md, seção 3).
// O correio da Agenda: o SMTP da Hostinger, de uma caixa do domínio do cliente (producao/esteira/14-funcionalidades/05-agenda.md, seção 2;
// 02-formulario.md, seção 6). Só texto, com o convite de calendário (.ics) quando a mensagem o traz. A composição das
// mensagens é de mensagens.ts, sem dependência.
//
// SMTP_TESTE: "1" — nada sai, o e-mail vira JSON e uma linha de .teste/emails.jsonl (o teste de ponta a ponta lê daí,
//             com o .ics); "falha" — simula o SMTP fora do ar. Sem a variável, o envio é de verdade.
import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { negocio } from "@/conteudo/negocio";
import type { Correio } from "./tipos";

const teste = process.env.SMTP_TESTE;

// Dois transportes, e não um só escolhido por condicional: o tipo do createTransport e o do que o sendMail devolve
// dependem do argumento (o da JSON tem `message`; o do SMTP, não), e uma união dos dois não compila.
const transporte = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: { user: process.env.SMTP_USUARIO, pass: process.env.SMTP_SENHA },
});

export const correioPorSmtp: Correio = async (m) => {
  if (teste === "falha") throw new Error("SMTP simulado fora do ar");
  const mensagem: Mail.Options = {
    from: { name: negocio.nome, address: process.env.SMTP_USUARIO! },
    to: m.para,
    replyTo: m.responderPara,
    subject: m.assunto,
    text: m.texto,
    icalEvent: m.convite ? { method: "PUBLISH", filename: m.convite.nome, content: m.convite.conteudo } : undefined,
  };
  if (teste) {
    // Nada sai: o e-mail vira JSON e uma linha de .teste/emails.jsonl.
    const info = await nodemailer.createTransport({ jsonTransport: true }).sendMail(mensagem);
    await mkdir(".teste", { recursive: true }); // fora do git (.gitignore)
    await appendFile(".teste/emails.jsonl", `${info.message}\n`);
    return;
  }
  await transporte.sendMail(mensagem);
};

// lib/formulario/destino.producao.ts — nodemailer e mysql2 (aprovados pelo usuário em 08.10.2026). A ligação de produção do formulário:
// a entrega pelo SMTP e o limite por IP no MySQL do plano (producao/esteira/14-funcionalidades/02-formulario.md, seções 5.3 e 6).
// Na publicação, copie este arquivo por cima de lib/formulario/destino.ts
// (producao/modulos/README.md, passo "ligar o envio"). O resto do módulo não muda.
import "server-only";
import { enviarEmail } from "./email";
import { armazemMysql } from "./limite-mysql";
import type { Entrega } from "./processar";

export const armazem = armazemMysql;
export const entrega: Entrega = enviarEmail;

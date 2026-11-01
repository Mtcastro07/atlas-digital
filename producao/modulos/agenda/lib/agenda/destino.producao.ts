// lib/agenda/destino.producao.ts — nodemailer e mysql2 (aprovados pelo usuário em 08.10.2026). A ligação de produção da Agenda: as reservas no
// MySQL do plano, o e-mail pelo SMTP da Hostinger e o limite por IP na tabela do formulário (producao/esteira/14-funcionalidades/05-agenda.md, seção 2).
// Na publicação, copie este arquivo por cima de lib/agenda/destino.ts
// (producao/modulos/README.md, passo "ligar o banco e o e-mail"). O resto do módulo não muda.
import "server-only";
import { armazemMysql } from "../formulario/limite-mysql";
import { correioPorSmtp } from "./email";
import { calendarioDoGoogle } from "./google";
import { repositorioMysql } from "./repositorio-mysql";
import type { Repositorio } from "./tipos";

export const repositorio = (): Repositorio => repositorioMysql;
export const armazem = armazemMysql;
export const correio = correioPorSmtp;
/** A agenda do Google do dono, se as variáveis estão no ambiente. */
export const calendario = calendarioDoGoogle();

// lib/banco.ts — Dependência: mysql2 3.24.5 (aprovada pelo usuário em 08.10.2026; producao/modulos/README.md, seção 3).
// O pool do MySQL do plano, no mesmo servidor: o app conecta em 127.0.0.1, não em localhost
// (producao/esteira/14-funcionalidades/02-formulario.md, seção 5.3; 05-agenda.md, seção 2). Um só, do formulário, que a Agenda também usa.
import "server-only";
import mysql from "mysql2/promise";

export const banco = mysql.createPool({
  host: "127.0.0.1",
  user: process.env.BANCO_USUARIO,
  password: process.env.BANCO_SENHA,
  database: process.env.BANCO_NOME,
  timezone: "Z", // datas em UTC: sem isto, o mysql2 converte pelo fuso do servidor
  connectionLimit: 5,
});

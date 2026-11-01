// lib/formulario/limite-mysql.ts — mysql2, por lib/banco.ts (aprovado pelo usuário em 08.10.2026).
// O armazém do limite por IP no MySQL do plano: o sal do dia e a contagem por hora, em hash; o IP nunca é gravado
// (producao/esteira/14-funcionalidades/02-formulario.md, seção 5.3). As tabelas: esquema/formulario.sql.
import "server-only";
import { randomBytes } from "node:crypto";
import { banco } from "@/lib/banco";
import { diaEmUtc } from "./limite";
import type { ArmazemDoLimite } from "./limite";

export const armazemMysql: ArmazemDoLimite = {
  async salDoDia(dia) {
    // INSERT IGNORE: o primeiro uso do dia grava o sal; os seguintes (e a corrida entre dois pedidos) leem o mesmo.
    await banco.query("INSERT IGNORE INTO sal_do_dia (dia, sal) VALUES (?, ?)", [dia, randomBytes(32)]);
    const [linhas] = await banco.query("SELECT sal FROM sal_do_dia WHERE dia = ?", [dia]);
    return (linhas as unknown as { sal: Buffer }[])[0].sal;
  },

  async somar(chave, janela) {
    // Soma e lê o valor NA MESMA instrução: o LAST_INSERT_ID(expr) devolve o valor que esta instrução gravou (no insertId do OK).
    // Com um SELECT depois, numa conexão do pool, uma rajada do mesmo IP lia a contagem das outras e barrava os primeiros cinco.
    const [resposta] = await banco.query(
      "INSERT INTO limite_de_envio (chave, hora, envios) VALUES (?, ?, LAST_INSERT_ID(1)) ON DUPLICATE KEY UPDATE envios = LAST_INSERT_ID(envios + 1)",
      [chave, janela],
    );
    return (resposta as unknown as { insertId: number }).insertId;
  },

  async limpar(agora) {
    await banco.query("DELETE FROM limite_de_envio WHERE hora < ?", [new Date(agora.getTime() - 24 * 60 * 60 * 1000)]);
    await banco.query("DELETE FROM sal_do_dia WHERE dia < ?", [diaEmUtc(agora)]);
  },
};

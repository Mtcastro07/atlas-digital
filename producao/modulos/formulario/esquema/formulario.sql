-- esquema/formulario.sql — as tabelas do limite por IP (esteira/14-funcionalidades/02-formulario.md, seção 5.3).
-- Servem também à Agenda (as reservas e as tentativas de entrada no painel contam na mesma tabela).
-- Rode uma vez no MySQL do plano, no banco do cliente (um por cliente).

-- O sal do dia (UTC) e a contagem por janela. Uma tarefa diária apaga o que passou.
CREATE TABLE sal_do_dia (
  dia DATE PRIMARY KEY,
  sal BINARY(32) NOT NULL
);
CREATE TABLE limite_de_envio (
  chave CHAR(64) NOT NULL,          -- HMAC-SHA256 do IP com o sal do dia, em hexadecimal
  hora DATETIME NOT NULL,           -- o início da janela, em UTC (a hora cheia; no painel, o quarto de hora)
  envios SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (chave, hora)
);

-- Tarefa diária (cron do hPanel). Sem a Agenda, nada a chama sozinho; com ela, o endereço /api/manutencao já faz isto:
--   DELETE FROM limite_de_envio WHERE hora < UTC_TIMESTAMP() - INTERVAL 1 DAY;
--   DELETE FROM sal_do_dia WHERE dia < UTC_DATE();

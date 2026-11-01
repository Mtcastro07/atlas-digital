-- esquema/agenda.sql — o modelo de dados da Agenda (esteira/14-funcionalidades/05-agenda.md, seção 3). Rode uma vez no MySQL do plano, no banco do
-- cliente (um por cliente), junto com esquema/formulario.sql (o limite por IP e as tentativas de entrada usam as
-- tabelas dele). Regras do modelo:
--   - Tudo em UTC no banco. O expediente é a exceção: é hora de parede de Niterói ("09:00"), porque é assim que o dono pensa.
--   - O dia é dividido em blocos de 15 minutos. Cada reserva ocupa os blocos do serviço e do intervalo depois dele, na
--     tabela `ocupacao`, com chave primária (profissional, bloco): é o banco garantindo que dois pedidos para o mesmo
--     horário nunca viram duas reservas.
--   - O expediente começa e termina em múltiplo de 15 minutos, para todos os blocos de um profissional ficarem na mesma grade.
--   - O código de cancelamento é guardado só em hash (SHA-256). Ele vai no e-mail; quem lê o banco não consegue cancelar.
-- O padrão por expressão (DEFAULT (UTC_TIMESTAMP())) exige MySQL 8.0.13 ou MariaDB 10.2.1 em diante: confira com
-- SELECT VERSION() no hPanel. Sem suporte, tire o DEFAULT: o app grava `criada_em` de qualquer jeito.
-- Executado em 08.10.2026 no MariaDB 10.11.19 e MySQL 8.0.46 (no MySQL, também com sql_require_primary_key=ON).

CREATE TABLE profissional (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(80) NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE servico (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(80) NOT NULL,
  duracao_min SMALLINT UNSIGNED NOT NULL,        -- múltiplo de 15
  intervalo_min SMALLINT UNSIGNED NOT NULL DEFAULT 0, -- limpeza, preparo
  ativo BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE profissional_servico (
  profissional_id INT UNSIGNED NOT NULL,
  servico_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (profissional_id, servico_id)
);
CREATE TABLE expediente (                         -- hora de parede de Niterói
  profissional_id INT UNSIGNED NOT NULL,
  dia_semana TINYINT UNSIGNED NOT NULL,           -- 0 = domingo
  abre TIME NOT NULL,                             -- múltiplo de 15 min
  fecha TIME NOT NULL,
  PRIMARY KEY (profissional_id, dia_semana, abre)
);
CREATE TABLE folga (                              -- férias, consulta externa, feriado
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  profissional_id INT UNSIGNED NULL,              -- NULL = a casa inteira
  inicio DATETIME NOT NULL,                       -- UTC
  fim DATETIME NOT NULL,
  motivo VARCHAR(80) NOT NULL
);
CREATE TABLE reserva (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  profissional_id INT UNSIGNED NOT NULL,
  servico_id INT UNSIGNED NOT NULL,
  inicio DATETIME NOT NULL,                       -- UTC
  fim DATETIME NOT NULL,                          -- inclui o intervalo
  nome VARCHAR(80) NOT NULL,
  email VARCHAR(254) NOT NULL,
  telefone VARCHAR(20) NULL,                      -- só os algarismos, sem o 55
  situacao ENUM('confirmada', 'cancelada') NOT NULL DEFAULT 'confirmada',
  token_hash BINARY(32) NOT NULL,                 -- SHA-256 do código de cancelamento
  evento_google VARCHAR(1024) NULL,               -- para apagar o evento no cancelamento
  lembrete_enviado_em DATETIME NULL,
  criada_em DATETIME NOT NULL DEFAULT (UTC_TIMESTAMP()),
  cancelada_em DATETIME NULL,
  UNIQUE KEY (token_hash),
  KEY (inicio)
);
CREATE TABLE ocupacao (                           -- um bloco de 15 min ocupado
  profissional_id INT UNSIGNED NOT NULL,
  inicio_bloco DATETIME NOT NULL,                 -- UTC
  reserva_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (profissional_id, inicio_bloco),    -- a chave única da marcação dupla; como chave primária, o MySQL com sql_require_primary_key=ON também cria a tabela
  KEY (reserva_id)                                -- o cancelamento apaga pelos blocos da reserva, sem varrer a tabela
);
CREATE TABLE dono (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(254) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL                     -- scrypt, com o custo e o sal: "scrypt$N$r$p$sal$hash" (ferramentas/criar-dono.mjs)
);
CREATE TABLE sessao (
  hash BINARY(32) PRIMARY KEY,                    -- SHA-256 do código do cookie
  dono_id INT UNSIGNED NOT NULL,
  expira_em DATETIME NOT NULL
);

-- O catálogo (profissionais, serviços, expediente) entra pela manutenção mensal, não pelo painel. Exemplo:
--   INSERT INTO profissional (nome) VALUES ('Rafael');
--   INSERT INTO servico (nome, duracao_min, intervalo_min) VALUES ('Corte', 30, 0);
--   INSERT INTO profissional_servico VALUES (1, 1);
--   INSERT INTO expediente VALUES (1, 1, '09:00', '12:00'), (1, 1, '13:00', '19:00');   -- segunda, com almoço

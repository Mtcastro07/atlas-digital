# esquema/

O esquema do MySQL do plano, um arquivo por módulo. Rode cada um **uma vez**, no banco do cliente (um por cliente, `127.0.0.1`) (o `mysql2` foi aprovado em 08.10.2026: `producao/modulos/README.md`, seção 3). A versão do banco se confere com `SELECT VERSION()`: o `DEFAULT (UTC_TIMESTAMP())` pede MySQL 8.0.13 ou MariaDB 10.2.1. Tudo em UTC.

| Arquivo | O que cria | Quando |
|---|---|---|
| `formulario.sql` | `sal_do_dia` e `limite_de_envio`: o limite de envios por IP, guardado em hash (o IP nunca é gravado) | Com o formulário ou com a Agenda: as reservas e as tentativas de entrada no painel contam nas mesmas tabelas |
| `agenda.sql` | `profissional`, `servico`, `profissional_servico`, `expediente`, `folga`, `reserva`, `ocupacao` (a chave primária que impede a marcação dupla), `dono` e `sessao` | Só com a Agenda |

Os dois foram executados em 08.10.2026 no MariaDB 10.11.19 e MySQL 8.0.46 (também com `sql_require_primary_key` ligada, no MySQL), com o teste de integração descrito em `producao/modulos/README.md`, seção 8. Seguem a especificação (`producao/esteira/14-funcionalidades/`, `02-formulario.md` seção 5.3 e `05-agenda.md` seção 3).

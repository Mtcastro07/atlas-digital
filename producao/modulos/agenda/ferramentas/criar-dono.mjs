// ferramentas/criar-dono.mjs — gera o INSERT do dono do painel da Agenda, com a senha guardada em scrypt (producao/esteira/14-funcionalidades/05-agenda.md,
// seção 9). Não toca no banco: imprime o SQL, que se roda no phpMyAdmin do plano, no banco do cliente. A senha é pedida
// sem eco e não passa pela linha de comando (nada no histórico do terminal). Sem dependência.
//
// Uso (a remoção de tipos do Node, para ler lib/painel/senha.ts):
//   node --experimental-strip-types --no-warnings=ExperimentalWarning ferramentas/criar-dono.mjs <e-mail do dono>
import { argv, exit, stderr, stdin, stdout } from "node:process";
import { emailValido } from "../lib/formulario/validar.ts";
import { guardarSenha } from "../lib/painel/senha.ts";

// OWASP, Authentication Cheat Sheet: 15 caracteres no mínimo quando a conta não tem segundo fator.
const MINIMO = 15;

const email = (argv[2] ?? "").trim().toLowerCase();
if (!emailValido(email)) {
  stderr.write("Uso: node --experimental-strip-types --no-warnings=ExperimentalWarning ferramentas/criar-dono.mjs <e-mail do dono>\n");
  exit(2);
}

/** Uma linha da entrada, sem eco quando é um terminal. Ctrl+C sai. */
function perguntar(texto) {
  stderr.write(texto);
  return new Promise((resolve) => {
    let linha = "";
    if (!stdin.isTTY) {
      stdin.setEncoding("utf8");
      stdin.once("data", (d) => resolve(String(d).split(/\r?\n/)[0]));
      return;
    }
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    const ao = (tecla) => {
      for (const c of tecla) {
        if (c === "\u0003") {
          stderr.write("\n");
          exit(130);
        } else if (c === "\r" || c === "\n") {
          stdin.setRawMode(false);
          stdin.pause();
          stdin.off("data", ao);
          stderr.write("\n");
          resolve(linha);
        } else if (c === "\u007f") {
          linha = linha.slice(0, -1);
        } else {
          linha += c;
        }
      }
    };
    stdin.on("data", ao);
  });
}

const senha = await perguntar(`Senha do painel (${MINIMO} caracteres ou mais, sem eco): `);
if ([...senha].length < MINIMO) {
  stderr.write(`A senha tem de ter ${MINIMO} caracteres ou mais.\n`);
  exit(1);
}
if (stdin.isTTY && (await perguntar("Repita a senha: ")) !== senha) {
  stderr.write("As duas senhas não são iguais.\n");
  exit(1);
}

const registro = await guardarSenha(senha);
stdout.write(`-- Rode no banco do cliente (phpMyAdmin do plano). A senha fica guardada em scrypt, com o custo e o sal no registro.\n`);
stdout.write(`INSERT INTO dono (email, senha) VALUES ('${email.replaceAll("'", "''")}', '${registro}');\n\n`);
stdout.write(`-- Só para o desenvolvimento, com a ligação em memória: no .env.local (o \\$ é o $ escapado, para o Next não o tomar por variável).\n`);
stdout.write(`AGENDA_DEV_DONO_EMAIL=${email}\n`);
stdout.write(`AGENDA_DEV_DONO_REGISTRO=${registro.replaceAll("$", "\\$")}\n`);
exit(0);

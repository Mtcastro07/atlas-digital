// lib/formulario/validar.ts — as regras dos campos do formulário de contato (producao/esteira/14-funcionalidades/02-formulario.md,
// seção 3.1). Puro e sem dependência: a ilha valida ao sair do campo e a ação valida de novo no servidor, com este mesmo
// arquivo. Valores importados por caminho relativo (o teste roda no node:test, que não conhece o apelido @/).
export type Campos = { nome: string; telefone: string; email: string; servico: string; mensagem: string };
export type Erros = Partial<Record<keyof Campos, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** E-mail no formato nome@dominio.tld, até 254 caracteres. */
export function emailValido(texto: string) {
  return texto.length <= 254 && EMAIL.test(texto);
}

/** Os algarismos do telefone, sem o 55: DDD + 8 ou 9 algarismos; null se não for isso. */
export function lerTelefone(texto: string) {
  let algarismos = texto.replace(/\D/g, "");
  if (algarismos.length >= 12 && algarismos.startsWith("55")) algarismos = algarismos.slice(2);
  return /^\d{10,11}$/.test(algarismos) ? algarismos : null;
}

export function validar(c: Campos, servicos: readonly string[]): Erros {
  const erros: Erros = {};
  if (c.nome.length < 2) erros.nome = "Escreva o nome.";
  else if (c.nome.length > 80) erros.nome = "O nome passa de 80 caracteres.";
  if (!c.telefone && !c.email) erros.telefone = "Informe um telefone ou um e-mail para a resposta.";
  if (c.telefone && !lerTelefone(c.telefone)) erros.telefone = "Telefone com DDD, como (21) 90000-0000.";
  if (c.email && !emailValido(c.email)) erros.email = "E-mail no formato nome@exemplo.com.br.";
  if (!servicos.includes(c.servico)) erros.servico = "Escolha o serviço.";
  if (c.mensagem.length > 2000) erros.mensagem = "A mensagem passa de 2.000 caracteres.";
  return erros;
}

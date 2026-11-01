// lib/formulario/processar.ts — a decisão da ação de envio, fora do arquivo "use server" para o teste de unidade a
// exercitar sem servidor, sem banco e sem SMTP (producao/esteira/14-funcionalidades/02-formulario.md, seção 3.2; producao/qualidade/04-unidade.md,
// seção 3). As cinco camadas, na ordem da especificação: armadilha e carimbo, "rápido demais" e "vencido", validação,
// limite por IP e entrega. A entrega e o armazém do limite entram por parâmetro (lib/formulario/destino.ts).
// Sem dependência; só node:crypto, por carimbo.ts e limite.ts.
import { emitirCarimbo, lerCarimbo } from "./carimbo.ts";
import { campo } from "./entrada.ts";
import { contarEnvio, LIMITE_POR_HORA } from "./limite.ts";
import type { ArmazemDoLimite } from "./limite.ts";
import { validar } from "./validar.ts";
import type { Campos, Erros } from "./validar.ts";

export type EstadoDoEnvio = {
  situacao: "inicial" | "corrigir" | "limite" | "falhou";
  carimbo: string;
  /** O que a pessoa escreveu, devolvido para os campos voltarem preenchidos (com e sem script). */
  valores?: Campos;
  erros?: Erros;
  aviso?: string;
};

/** O desfecho: "enviado" e "descartado" levam à confirmação (303); "estado" volta à ilha com o que mostrar. */
export type Resultado = { tipo: "enviado" } | { tipo: "descartado" } | { tipo: "estado"; estado: EstadoDoEnvio };

/** Entrega o pedido ao cliente. Lança se não conseguir: a pessoa vê o aviso com a saída pelo WhatsApp. */
export type Entrega = (campos: Campos) => Promise<void>;

export type Dependencias = {
  /** Os ids da lista de serviços do site (conteudo/formulario.ts). */
  servicos: readonly string[];
  entrega: Entrega;
  armazem: ArmazemDoLimite;
  /** O registro do servidor, o console do web app. */
  avisar?: (texto: string) => void;
  /** O instante do pedido; nos testes, fixo. */
  agora?: Date;
};

const textoDoErro = (erro: unknown) => (erro instanceof Error ? erro.message : String(erro));

export async function processarEnvio(dados: FormData, ip: string | null, d: Dependencias): Promise<Resultado> {
  const agora = d.agora ?? new Date();
  const avisar = d.avisar ?? ((texto: string) => console.warn(texto));
  const devolver = (estado: EstadoDoEnvio): Resultado => ({ tipo: "estado", estado });

  // 1. Campo-armadilha preenchido ou carimbo forjado: robô. Finge que deu certo e descarta.
  const carimbo = campo(dados, "carimbo");
  const leitura = lerCarimbo(carimbo, agora.getTime());
  if (campo(dados, "nao_preencher") !== "" || leitura === "forjado") return { tipo: "descartado" };

  const valores: Campos = {
    nome: campo(dados, "nome"),
    telefone: campo(dados, "telefone"),
    email: campo(dados, "email"),
    servico: campo(dados, "servico"),
    mensagem: campo(dados, "mensagem", true),
  };

  // 2. Rápido demais, ou a página aberta há mais de um dia: pede para conferir. Nunca descarta em silêncio o que pode ser de uma pessoa.
  if (leitura === "rapido") return devolver({ situacao: "corrigir", carimbo, valores, aviso: "Confira os dados e envie de novo." });
  if (leitura === "vencido") {
    return devolver({
      situacao: "corrigir",
      carimbo: emitirCarimbo(agora.getTime()),
      valores,
      aviso: "A página ficou aberta por mais de um dia. Confira os dados e envie de novo.",
    });
  }

  // 3. As regras da ilha, de novo.
  const erros = validar(valores, d.servicos);
  if (Object.keys(erros).length > 0) return devolver({ situacao: "corrigir", carimbo, valores, erros });

  // 4. O limite por IP, contado em hash. Sem IP (o proxy não mandou o cabeçalho), não limita e avisa no registro:
  //    um balde único para "desconhecido" barraria o site inteiro no sexto envio da hora.
  //    Se o armazém falhar (o banco fora do ar), a pessoa fica sabendo e tem a saída pelo WhatsApp: nada de página de erro.
  try {
    if (!ip) avisar("formulário: pedido sem x-forwarded-for; limite por IP não aplicado");
    else if ((await contarEnvio(ip, d.armazem, agora)) > LIMITE_POR_HORA) return devolver({ situacao: "limite", carimbo, valores });
  } catch (erro) {
    avisar(`formulário: o limite por IP falhou: ${textoDoErro(erro)}`);
    return devolver({ situacao: "falhou", carimbo, valores });
  }

  // 5. A entrega. Se falhar, a pessoa fica sabendo, com a saída pelo WhatsApp.
  try {
    await d.entrega(valores);
  } catch (erro) {
    avisar(`formulário: a entrega falhou: ${textoDoErro(erro)}`);
    return devolver({ situacao: "falhou", carimbo, valores });
  }
  return { tipo: "enviado" };
}

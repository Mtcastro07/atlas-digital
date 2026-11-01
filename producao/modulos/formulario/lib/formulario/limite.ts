// lib/formulario/limite.ts — o limite de envios por IP, contado em hash (producao/esteira/14-funcionalidades/02-formulario.md,
// seção 5.3). A lógica fica aqui, sem dependência; onde se guardam o sal do dia e a contagem é do ArmazemDoLimite:
// o MySQL do plano em lib/formulario/limite-mysql.ts (com o mysql2) e, no rascunho e nos
// testes, a memória (armazemEmMemoria). O IP nunca é gravado: só o HMAC-SHA256 dele com um sal aleatório do dia, que se
// apaga no dia seguinte. Só node:crypto. Sem `import "server-only"` (o teste de unidade importa este arquivo no Node).
import { createHmac, randomBytes } from "node:crypto";

/** Até 5 envios por hora por IP (PROPOSTA, seção 5.3). Passou disso, o envio recebe o aviso de limite. */
export const LIMITE_POR_HORA = 5;

export interface ArmazemDoLimite {
  /** O sal do dia (AAAA-MM-DD, em UTC): aleatório, criado no primeiro uso do dia e apagado no seguinte. */
  salDoDia(dia: string): Promise<Buffer>;
  /** Soma um à contagem da chave naquela janela (UTC) e devolve quantos já houve nela, contando este. */
  somar(chave: string, janela: Date): Promise<number>;
  /** Apaga o que passou: as contagens de mais de um dia e os sais dos dias anteriores (a tarefa diária). */
  limpar(agora: Date): Promise<void>;
}

const DIA_EM_MS = 24 * 60 * 60 * 1000;

/** O dia em UTC, como o sal o guarda: "2026-10-09". */
export const diaEmUtc = (agora: Date) => agora.toISOString().slice(0, 10);

/** O HMAC-SHA256 do valor com o sal, em hexadecimal (64 caracteres): a chave que se grava no lugar do IP. */
export function chaveEmHash(valor: string, sal: Uint8Array) {
  return createHmac("sha256", sal).update(valor).digest("hex");
}

/** O início da janela em que se conta: a hora cheia (UTC) ou, com `minutos` menor, o múltiplo dele dentro da hora. */
export function inicioDaJanela(agora: Date, minutos = 60) {
  const janela = minutos * 60_000;
  return new Date(Math.floor(agora.getTime() / janela) * janela);
}

/**
 * Conta um uso na janela e devolve quantos já houve nela. O `escopo` separa as contagens ("envio" do formulário,
 * "entrar" no painel da Agenda): o mesmo IP em dois escopos são duas chaves.
 */
export async function contarNaJanela(escopo: string, valor: string, minutos: number, armazem: ArmazemDoLimite, agora = new Date()) {
  const sal = await armazem.salDoDia(diaEmUtc(agora));
  return armazem.somar(chaveEmHash(`${escopo}:${valor}`, sal), inicioDaJanela(agora, minutos));
}

/** Soma um envio do IP na hora corrente e devolve quantos já houve nela. Passou de LIMITE_POR_HORA, o envio é barrado. */
export function contarEnvio(ip: string, armazem: ArmazemDoLimite, agora = new Date()) {
  return contarNaJanela("envio", ip, 60, armazem, agora);
}

/**
 * O armazém na memória do processo. Serve ao rascunho e aos testes, nunca à publicação: o web app dorme sem tráfego
 * e acorda zerado, e o que mora só na memória some (seção 5.3).
 */
export function armazemEmMemoria(): ArmazemDoLimite {
  const sais = new Map<string, Buffer>();
  const contagens = new Map<string, { janela: number; envios: number }>();
  return {
    async salDoDia(dia) {
      let sal = sais.get(dia);
      if (!sal) {
        sal = randomBytes(32);
        sais.set(dia, sal);
      }
      return sal;
    },
    async somar(chave, janela) {
      const id = `${chave}@${janela.getTime()}`;
      const atual = contagens.get(id) ?? { janela: janela.getTime(), envios: 0 };
      atual.envios += 1;
      contagens.set(id, atual);
      return atual.envios;
    },
    async limpar(agora) {
      const hoje = diaEmUtc(agora);
      for (const dia of sais.keys()) if (dia < hoje) sais.delete(dia);
      for (const [id, c] of contagens) if (c.janela < agora.getTime() - DIA_EM_MS) contagens.delete(id);
    },
  };
}

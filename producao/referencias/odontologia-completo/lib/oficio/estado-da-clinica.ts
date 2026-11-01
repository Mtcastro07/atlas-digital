// lib/oficio/estado-da-clinica.ts — o estado ao vivo da clínica: "aberto agora", quando abre e a urgência do dia
// (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 5; briefing.md, seções 3 e 12). Função pura:
// recebe o instante de Niterói, o expediente, os fechamentos e a regra da urgência, e devolve o texto. O fuso é
// resolvido fora dela (lib/agora.ts). Imports de valor só por caminho relativo, para o node:test.
import type { Agora } from "../agora.ts";
import { hora } from "../horario.ts";
import type { Dia, Faixa } from "../../conteudo/negocio.ts";

const DIAS_ABREVIADOS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"] as const;
const emMinutos = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));
const dataMaisDias = (data: string, dias: number) => {
  const d = new Date(`${data}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + dias);
  return d.toISOString().slice(0, 10);
};

export type Estado = { aberto: boolean; linha: string; urgencia: string };

export function estadoDaClinica(
  agora: Agora,
  expediente: Record<Dia, readonly Faixa[]>,
  fechamentos: readonly { data: string; motivo: string }[],
  urgencia: { dias: readonly Dia[]; ate: string },
): Estado {
  const fechadoEm = (data: string) => fechamentos.find((f) => f.data === data);
  const hoje = fechadoEm(agora.data) ? [] : expediente[agora.dia];
  const aberta = hoje.find((f) => agora.minutos >= emMinutos(f.abre) && agora.minutos < emMinutos(f.fecha));
  const limiteDaUrgencia = emMinutos(urgencia.ate);
  const urgenciaHoje = urgencia.dias.includes(agora.dia) && hoje.length > 0 && agora.minutos < limiteDaUrgencia;
  const textoDaUrgencia = urgenciaHoje
    ? `Urgência de hoje: avise até as ${hora(urgencia.ate)}.`
    : `Urgência: encaixe de segunda a sexta, para quem avisar até as ${hora(urgencia.ate)}.`;

  if (aberta) {
    const depois = hoje.find((f) => emMinutos(f.abre) >= emMinutos(aberta.fecha));
    const linha = depois
      ? `Aberto agora, fecha às ${hora(aberta.fecha)} e reabre às ${hora(depois.abre)}`
      : `Aberto agora, fecha às ${hora(aberta.fecha)}`;
    return { aberto: true, linha, urgencia: textoDaUrgencia };
  }

  // Fechado: a próxima abertura, hoje (se ainda houver faixa) ou nos próximos dias com expediente.
  const maisTarde = hoje.find((f) => emMinutos(f.abre) > agora.minutos);
  if (maisTarde) return { aberto: false, linha: `Fechado agora, abre às ${hora(maisTarde.abre)}`, urgencia: textoDaUrgencia };
  for (let adiante = 1; adiante <= 8; adiante++) {
    const dia = ((agora.dia + adiante) % 7) as Dia;
    const faixas = fechadoEm(dataMaisDias(agora.data, adiante)) ? [] : expediente[dia];
    if (faixas.length === 0) continue;
    const quando = adiante === 1 ? "amanhã" : DIAS_ABREVIADOS[dia];
    return { aberto: false, linha: `Fechado agora, abre ${quando}, ${hora(faixas[0].abre)}`, urgencia: textoDaUrgencia };
  }
  return { aberto: false, linha: "Fechado agora", urgencia: textoDaUrgencia };
}

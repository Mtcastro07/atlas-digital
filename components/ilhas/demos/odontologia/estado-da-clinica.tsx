"use client";

import { useEffect, useState } from "react";

import { urgenciaDoDia, type Urgencia } from "@/lib/demos/odontologia/tempo";
import { estadoDoExpediente, horaDeNiteroi, type Expediente, type Fechamento } from "@/lib/demos/relogio";

/**
 * O estado ao vivo da Odontologia Boa Viagem: "aberto agora" (com a reabertura depois do almoço) e a urgência do dia,
 * no relógio de Niterói, nunca no do aparelho (lib/demos/relogio.ts e lib/demos/odontologia/tempo.ts). Antes da
 * hidratação, e sem script, o servidor escreve uma linha que vale sempre (`semScript`) e a regra da urgência: o mesmo
 * número de linhas, para a troca não empurrar a página. O ponto de lápis diz aberto (cheio) ou fechado (vazado). Sem
 * aria-live: uma mudança a cada meio minuto, anunciada, seria ruído. Recebe só o que usa.
 */
export function EstadoDaClinica({
  expediente,
  fechamentos,
  urgencia,
  semScript,
  urgenciaSemScript,
  className = "",
}: {
  expediente: Expediente;
  fechamentos: readonly Fechamento[];
  urgencia: Urgencia;
  semScript: string;
  urgenciaSemScript: string;
  className?: string;
}) {
  const [agora, setAgora] = useState<{ aberto: boolean; linha: string; urgencia: string } | null>(null);
  useEffect(() => {
    const ver = () => {
      const h = horaDeNiteroi();
      setAgora({ ...estadoDoExpediente(h, expediente, fechamentos), urgencia: urgenciaDoDia(h, expediente, fechamentos, urgencia) });
    };
    ver();
    const relogio = window.setInterval(ver, 30_000);
    return () => window.clearInterval(relogio);
  }, [expediente, fechamentos, urgencia]);
  return (
    <div className={`od-estado ${className}`} data-aberto={agora ? String(agora.aberto) : undefined}>
      <p className="od-estado-linha">{agora ? agora.linha : semScript}</p>
      <p className="od-estado-urgencia">{agora ? agora.urgencia : urgenciaSemScript}</p>
    </div>
  );
}

"use client";
// components/ilhas/estado-da-clinica.tsx — o estado ao vivo da clínica: "aberto agora" e a urgência do dia, no relógio de
// Niterói (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 5). A conta é a função pura de
// lib/oficio/estado-da-clinica.ts. Antes da hidratação, e sem script, o servidor escreve o horário (`semScript`): o servidor
// não sabe a hora de quem lê. Sem aria-live: uma mudança a cada meio minuto, anunciada, seria ruído.
import { useEffect, useState } from "react";
import { agoraEmNiteroi } from "@/lib/agora";
import { estadoDaClinica, type Estado } from "@/lib/oficio/estado-da-clinica";
import type { Dia, Faixa } from "@/conteudo/negocio";

export function EstadoDaClinica({
  expediente,
  fechamentos,
  urgencia,
  semScript,
  urgenciaSemScript,
}: {
  expediente: Record<Dia, readonly Faixa[]>;
  fechamentos: readonly { data: string; motivo: string }[];
  urgencia: { dias: readonly Dia[]; ate: string };
  semScript: string;
  urgenciaSemScript: string;
}) {
  const [estado, setEstado] = useState<Estado | null>(null);
  useEffect(() => {
    const tique = () => setEstado(estadoDaClinica(agoraEmNiteroi(), expediente, fechamentos, urgencia));
    tique();
    const intervalo = window.setInterval(tique, 30_000); // o estado muda no máximo a cada minuto
    return () => window.clearInterval(intervalo);
  }, [expediente, fechamentos, urgencia]);
  return (
    <div className="grid gap-1 text-nota">
      <p className="tabular font-semibold">{estado ? estado.linha : semScript}</p>
      <p className="tabular text-muted-foreground">{estado ? estado.urgencia : urgenciaSemScript}</p>
    </div>
  );
}

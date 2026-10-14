"use client";

import { useEffect, useState } from "react";

import type { depositoSite } from "@/conteudo/demos/deposito";

type Site = typeof depositoSite;

/** O relógio de Niterói, como data local (dia da semana, hora e minuto de parede). */
const horaDeNiteroi = (agora: Date) => new Date(agora.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
const DIAS = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];

/** Liga a cada meio minuto: o estado da loja e o corte mudam com o relógio. */
function useAgora() {
  const [agora, setAgora] = useState<Date | null>(null);
  useEffect(() => {
    const tique = () => setAgora(horaDeNiteroi(new Date()));
    tique();
    const intervalo = window.setInterval(tique, 30_000);
    return () => window.clearInterval(intervalo);
  }, []);
  return agora;
}

/**
 * A barra do topo do Depósito (navegação viva do plano Profissional): se
 * a loja está aberta agora e quando fecha (ou quando abre), e quanto falta
 * para o corte da entrega do mesmo dia — pelo relógio de Niterói, no
 * próprio aparelho. Sem script, e antes da hidratação, fica o horário
 * escrito (o servidor não sabe a hora de quem lê).
 */
export function EstadoDaLoja({ status, expediente, horaDoCorte }: Pick<Site, "status" | "expediente" | "horaDoCorte">) {
  const agora = useAgora();
  if (!agora) return <span>{status.semScript}</span>;

  const dia = agora.getDay();
  const minutos = agora.getHours() * 60 + agora.getMinutes();
  const hoje = expediente[dia];
  const aberta = Boolean(hoje && minutos >= hoje[0] * 60 && minutos < hoje[1] * 60);

  let proximo = "";
  if (!aberta) {
    for (let d = 0; d < 7; d++) {
      const indice = (dia + d) % 7;
      const faixa = expediente[indice];
      if (!faixa) continue;
      if (d === 0 && minutos >= faixa[0] * 60) continue;
      let quando = DIAS[indice];
      if (d === 0) quando = "hoje";
      else if (d === 1) quando = "amanhã";
      proximo = `${status.abre} ${quando}, ${faixa[0]}h`;
      break;
    }
  }

  const corteHoje = hoje && dia >= 1 && dia <= 5 && minutos < horaDoCorte * 60 && minutos >= hoje[0] * 60;
  const falta = horaDoCorte * 60 - minutos;
  const restante = `${Math.floor(falta / 60)}h${String(falta % 60).padStart(2, "0")}`;

  return (
    <>
      <span className="inline-flex items-center gap-2">
        <span aria-hidden="true" className={`dp-luz size-2 rounded-full ${aberta ? "dp-luz-aberta" : "dp-luz-fechada"}`} />
        {aberta ? `${status.aberto} · ${status.fecha} ${hoje![1]}h` : `${status.fechado} · ${proximo}`}
      </span>
      <span className="hidden text-muted-foreground md:inline">
        {corteHoje ? `${status.corte} · ${status.faltam} ${restante}` : status.encerrado}
      </span>
    </>
  );
}

/**
 * O marcador de "agora" na linha do dia do caminhão (página Entrega): a
 * posição da hora de Niterói entre a abertura e o fechamento do balcão.
 * A linha é a de um dia útil (7h às 18h, com o caminhão e o corte): fora do
 * expediente, e no sábado e no domingo, não aparece. Até 07/10, aparecia no
 * sábado sobre a linha de segunda a sexta, e até as 18h, depois de a loja
 * fechar às 13h.
 */
export function MarcadorDoAgora({ abre, fecha, rotulo }: { abre: number; fecha: number; rotulo: string }) {
  const agora = useAgora();
  if (!agora) return null;
  const horas = agora.getHours() + agora.getMinutes() / 60;
  const dia = agora.getDay();
  if (horas < abre || horas > fecha || dia === 0 || dia === 6) return null;
  const posicao = ((horas - abre) / (fecha - abre)) * 100;
  // A linha fica na hora exata; o rótulo desliza em proporção — alinhado à
  // esquerda na abertura, centrado no meio do dia, à direita no fechamento.
  // Centrado sempre (até 08/10), perto das pontas metade dele saía da tela
  // no celular (régua, bloco 1, às 7h31).
  return (
    <span aria-hidden="true" className="absolute -top-3 bottom-0 flex w-px flex-col items-start" style={{ left: `${posicao}%` }}>
      <span className="dp-codigo rounded-sm bg-primary px-1.5 py-0.5 text-[10.5px] whitespace-nowrap text-primary-foreground" style={{ translate: `-${posicao}% 0` }}>
        {rotulo} · {agora.getHours()}h{String(agora.getMinutes()).padStart(2, "0")}
      </span>
      <span className="w-px flex-1 bg-primary" />
    </span>
  );
}

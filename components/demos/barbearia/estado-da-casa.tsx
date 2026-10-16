"use client";

import { useEffect, useState } from "react";

import { feriadosNacionais } from "@/conteudo/demos/comum";
import { diaDaAbertura } from "@/lib/demos/barbearia/pedido";
import { estadoDoExpediente, horaDeNiteroi, type Dia, type Expediente } from "@/lib/demos/relogio";

/**
 * O estado ao vivo da Barbearia Santa Rosa (desde 14/10): aberta ou não, pelo relógio comum dos demonstrativos
 * (lib/demos/relogio.ts, no fuso de Niterói, com os feriados nacionais de conteudo/demos/comum.ts). Só existe depois
 * da hidratação (o servidor não sabe a hora de quem lê) e se reconfere a cada minuto. Cada lugar tem o seu
 * dispositivo, e nenhum é o de outro site (19-o-padrao-atlas, seção 7):
 * - o poste (LinhaDoPoste, no rodapé de todas as páginas): a linha ao lado do horário e o data-casa-aberta na raiz
 *   do site, que liga o giro de todas as listras (barbearia.css): elas giram só com a casa aberta;
 * - o título da cena de couro do início (TituloDoCouro);
 * - o dia de hoje no Onde (HorarioDaCasa): o ponto de latão na linha de hoje e o estado sob a tabela;
 * - os espelhos da Equipe (EspelhosDaEquipe, cadeiras.tsx; desde a correção de 14/10): aceso o de quem atende agora;
 *   com a casa fechada (desde 16/10), a meia-luz o de quem atende quando ela abrir (abre: o dia; diaDaAbertura).
 * Sem script, não há estado: o horário escrito responde, e as listras ficam paradas.
 */
type Estado = { aberto: boolean; linha: string; dia: Dia; abre: Dia | null };

export function useEstadoDaCasa(expediente: Expediente) {
  const [estado, setEstado] = useState<Estado | null>(null);
  useEffect(() => {
    const ler = () => {
      const agora = horaDeNiteroi();
      const { aberto, linha } = estadoDoExpediente(agora, expediente, feriadosNacionais);
      setEstado({ aberto, linha, dia: agora.dia, abre: aberto ? null : diaDaAbertura(agora, expediente, feriadosNacionais) });
    };
    ler();
    const relogio = window.setInterval(ler, 60_000);
    return () => window.clearInterval(relogio);
  }, [expediente]);
  return estado;
}

/** O poste: a linha do estado, em latão claro, e o data-casa-aberta na raiz do site (o giro das listras). */
export function LinhaDoPoste({ expediente }: { expediente: Expediente }) {
  const estado = useEstadoDaCasa(expediente);
  useEffect(() => {
    const raiz = document.querySelector('[data-demo="barbearia"]');
    raiz?.toggleAttribute("data-casa-aberta", !!estado?.aberto);
    return () => raiz?.removeAttribute("data-casa-aberta");
  }, [estado?.aberto]);
  // A linha fica reservada (sem script, vazia): o rodapé não pula quando ela chega.
  return <span className="block min-h-[1.55em] text-accent">{estado?.linha}</span>;
}

/** O título da cena de couro: o estado partido na primeira vírgula ("Aberto agora," / "fecha às 20h."). */
export function TituloDoCouro({ expediente, semScript, id, className }: { expediente: Expediente; semScript: readonly [string, string] | string[]; id: string; className?: string }) {
  const estado = useEstadoDaCasa(expediente);
  const [primeira, segunda] = estado ? partir(estado.linha) : semScript;
  return (
    <h2 id={id} className={className}>
      <span className="block">{primeira}</span>
      <span className="block italic">{segunda}</span>
    </h2>
  );
}

const partir = (linha: string) => {
  const k = linha.indexOf(",");
  return k < 0 ? [linha, ""] : [linha.slice(0, k + 1), `${linha.slice(k + 2)}.`];
};

/**
 * O horário do Onde: a linha do grupo de hoje ganha o ponto de latão (o agora), pendurado à esquerda, e o estado fica
 * na linha logo abaixo da tabela, em latão claro, com o mesmo ponto. A linha é reservada desde o HTML: o estado chega
 * depois da hidratação, e a coluna, centrada na tela, não pula (medido em 14/10: com a linha dentro da linha de hoje,
 * o CLS da carga do Onde era de 0,079 a 1440 px).
 */
export function HorarioDaCasa({ horarios, expediente }: { horarios: readonly { dia: string; hora: string; dias: readonly number[] }[]; expediente: Expediente }) {
  const estado = useEstadoDaCasa(expediente);
  const ponto = <span aria-hidden="true" className="absolute top-[0.62em] -left-3.5 size-[5px] rounded-full bg-primary" />;
  return (
    <>
      <dl className="mt-8 border-t border-border">
        {horarios.map((h) => (
          <div key={h.dia} className="flex justify-between gap-6 border-b border-border py-4 text-[16px]">
            {/* O ponto fica pendurado à esquerda, fora da coluna: os dias continuam alinhados. */}
            <dt className="relative">
              {estado && h.dias.includes(estado.dia) && ponto}
              {h.dia}
            </dt>
            <dd className="text-muted-foreground tabular-nums">{h.hora}</dd>
          </div>
        ))}
      </dl>
      <p className="relative mt-3 min-h-[1.55em] text-[14.5px] text-accent">
        {estado && ponto}
        {estado?.linha}
      </p>
    </>
  );
}

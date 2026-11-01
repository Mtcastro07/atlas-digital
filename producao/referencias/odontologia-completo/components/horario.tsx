// components/horario.tsx — o horário dia a dia, numa lista de definição (producao/esteira/14/01, seção 4).
import { expediente, fechamentos } from "@/conteudo/negocio";
import { ondePagina } from "@/conteudo/site";
import { horarioDiaADia } from "@/lib/horario";

export function Horario({ className = "", comFechamentos = true }: { className?: string; comFechamentos?: boolean }) {
  return (
    <div className={className}>
      <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5">
        {horarioDiaADia(expediente).map((d) => (
          <div key={d.dia} className="contents">
            <dt className="font-semibold">{d.dia}</dt>
            <dd className="tabular">{d.texto}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3">{ondePagina.feriados}</p>
      {comFechamentos && fechamentos.length > 0 && (
        <ul className="mt-4 text-nota text-muted-foreground">
          {fechamentos.map((f) => (
            <li key={f.data} className="tabular">{`${f.data.split("-").reverse().join(".")}: fechado (${f.motivo})`}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

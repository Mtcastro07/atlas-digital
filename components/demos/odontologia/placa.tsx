import { EstadoDaClinica } from "@/components/ilhas/demos/odontologia/estado-da-clinica";
import { expediente, fechamentos, quandoEOnde, urgencia } from "@/conteudo/demos/odontologia";
import { diasJuntos } from "@/lib/demos/relogio";

/**
 * A placa do horário, de cerâmica, presa na parede da porta: o horário gravado (o texto do servidor, do expediente), os
 * feriados e o estado ao vivo embaixo. A luz do refletor atravessa a placa devagar (.od-placa-luz: o ambiente contínuo
 * do Completo, só na tela, pausável pela pasta, nada com movimento reduzido); sob a mão, a placa inclina e a aresta de
 * luz vai aonde o ponteiro está ([data-ceramica], a ilha do consultório).
 */
export function PlacaDoHorario({ className = "", comEstado = true }: { className?: string; comEstado?: boolean }) {
  return (
    <div data-ceramica className={`od-placa od-placa-horario ${className}`}>
      <span aria-hidden="true" data-ambiente className="od-placa-luz" />
      <h3 className="od-placa-rotulo">{quandoEOnde.placa}</h3>
      <dl className="od-placa-dias">
        {diasJuntos(expediente).map((g) => (
          <div key={g.dias}>
            <dt>{g.dias}</dt>
            <dd>{g.texto}</dd>
          </div>
        ))}
      </dl>
      <p className="od-placa-nota">{quandoEOnde.feriados}</p>
      {comEstado && (
        <EstadoDaClinica
          className="od-placa-estado"
          expediente={expediente}
          fechamentos={fechamentos}
          urgencia={urgencia}
          semScript={quandoEOnde.estadoSemScript}
          urgenciaSemScript={quandoEOnde.urgenciaSemScript}
        />
      )}
    </div>
  );
}

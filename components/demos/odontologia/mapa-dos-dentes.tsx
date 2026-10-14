import { ALTURA, FAIXAS, LARGURA, contornoDoDente, dentes, sulcosDoDente, type RegiaoId } from "@/lib/demos/odontologia/dentes";

/**
 * O mapa dos dentes, a peça-assinatura da Odontologia Boa Viagem (identidade, seção 6): duas arcadas de 16 dentes,
 * vistas de cima, na notação FDI, no traço da ficha clínica. Um diagrama gerado de lib/demos/odontologia/dentes.ts,
 * sem biblioteca e sem pedido externo; pinta com os tokens (.od-dente, .od-faixa). Sem estado: serve ao servidor (as
 * páginas de tratamento) e às ilhas (a escolha da região, que põe as áreas de toque em `children`). A região escolhida
 * é a faixa de lápis, que entra uma vez a cada escolha (a chave a remonta). Com `descricao`, o mapa é uma figura com
 * nome; sem, é decoração do controle ao lado.
 */
export function MapaDosDentes({
  ativas = [],
  percurso = false,
  legendas,
  descricao,
  className = "",
  children,
}: {
  ativas?: readonly RegiaoId[];
  /** As quatro faixas, cada uma acesa pela rolagem do passo dela ("Percorra a boca", na capa; odontologia.css). */
  percurso?: boolean;
  /** "arcada superior" e "arcada inferior" (conteudo/demos/odontologia.ts, mapa.legendas). */
  legendas: { superior: string; inferior: string };
  descricao?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${LARGURA} ${ALTURA}`}
      className={`mx-auto block h-auto w-full ${className}`}
      {...(descricao ? { role: "img", "aria-label": descricao } : { "aria-hidden": true })}
    >
      {ativas.map((r) => (
        <path key={r} d={FAIXAS[r]} className="od-faixa od-faixa-entra" />
      ))}
      {percurso &&
        (Object.keys(FAIXAS) as RegiaoId[]).map((r) => <path key={r} d={FAIXAS[r]} data-regiao={r} className="od-faixa od-faixa-passo" />)}
      {dentes.map((d) => (
        <g key={d.fdi} transform={`translate(${d.x} ${d.y}) rotate(${d.giro})`}>
          <path d={contornoDoDente(d)} className="od-dente" />
          {sulcosDoDente(d) && <path d={sulcosDoDente(d)} className="od-sulco" />}
        </g>
      ))}
      {dentes.map((d) => (
        <text key={`n${d.fdi}`} x={d.numero.x} y={d.numero.y} textAnchor="middle" dominantBaseline="central" className="od-numero">
          {d.fdi}
        </text>
      ))}
      <text x={LARGURA / 2} y={ALTURA * 0.37} textAnchor="middle" className="od-legenda-do-mapa">
        {legendas.superior}
      </text>
      <text x={LARGURA / 2} y={ALTURA * 0.65} textAnchor="middle" className="od-legenda-do-mapa">
        {legendas.inferior}
      </text>
      {children}
    </svg>
  );
}

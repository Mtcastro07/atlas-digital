// components/mapa-dos-dentes.tsx — o mapa dos dentes, a peça-assinatura (identidade.md, seção 6): duas arcadas de 16 dentes,
// vistas de cima, na notação FDI, no traço da ficha clínica. Um DIAGRAMA gerado de lib/oficio/dentes.ts, sem biblioteca,
// sem pedido externo; pinta com os tokens (app/globals.css, ".dente-*" e ".mapa-*"). Componente sem estado: serve ao servidor
// (as páginas de tratamento, a capa) e à ilha (components/ilhas/escolha-de-regiao.tsx, que põe as áreas de toque em `children`).
// Sem script, o desenho fica em repouso. A região em destaque é a faixa de lápis; o resto é decoração (aria-hidden) ou, com
// `descricao`, uma figura com nome acessível.
import { ALTURA, FAIXAS, LARGURA, contornoDoDente, dentes, sulcosDoDente } from "@/lib/oficio/dentes";
import type { RegiaoId } from "@/conteudo/tratamentos";

export function MapaDosDentes({
  ativas = [],
  descricao,
  className = "",
  children,
}: {
  /** As regiões circuladas a lápis. */
  ativas?: readonly RegiaoId[];
  /** Com texto, o mapa é uma figura (`role="img"`); sem, é decoração do controle ao lado. */
  descricao?: string;
  className?: string;
  /** Áreas de toque, no mesmo sistema de coordenadas. */
  children?: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${LARGURA} ${ALTURA}`}
      className={`mx-auto block h-auto w-full max-w-md ${className}`}
      {...(descricao ? { role: "img", "aria-label": descricao } : { "aria-hidden": true })}
    >
      {ativas.map((r) => (
        <path key={r} d={FAIXAS[r]} className="mapa-faixa mapa-faixa-entra" />
      ))}
      {dentes.map((d) => (
        <g key={d.fdi} transform={`translate(${d.x} ${d.y}) rotate(${d.giro})`}>
          <path d={contornoDoDente(d)} className="dente-contorno" />
          {sulcosDoDente(d) && <path d={sulcosDoDente(d)} className="dente-sulco" />}
        </g>
      ))}
      {dentes.map((d) => (
        <text key={`n${d.fdi}`} x={d.numero.x} y={d.numero.y} textAnchor="middle" dominantBaseline="central" className="dente-numero">
          {d.fdi}
        </text>
      ))}
      <text x={LARGURA / 2} y={ALTURA * 0.36} textAnchor="middle" className="mapa-legenda">
        arcada superior
      </text>
      <text x={LARGURA / 2} y={ALTURA * 0.64} textAnchor="middle" className="mapa-legenda">
        arcada inferior
      </text>
      {children}
    </svg>
  );
}

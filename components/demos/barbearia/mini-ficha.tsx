import { fichas, type ObjetoDaCena } from "@/conteudo/demos/barbearia";

// A miniatura da ficha (desde 14/10), num módulo sem dependência de servidor: a lista de capítulos do início (pecas.tsx
// a reexporta) e as opções de serviço do agendador (ilha agenda-da-barbearia, no navegador) a usam.

/** Os tons das fichas do palco, achatados para o desenho parado (palco-3d/cena.ts, corDoMetal, depois da luz). */
const TONS = {
  latao: ["#e6c88a", "#a8823f"],
  alpaca: ["#d9d8d0", "#8e8d86"],
  cobre: ["#e09a72", "#9a5235"],
  bronze: ["#c0915e", "#6e4a2a"],
} as const;

/**
 * A miniatura da ficha de um capítulo, em SVG parado de 40 px: a forma
 * (redonda, oitavada ou placa) no metal da ficha, com o centro gravado
 * quando cabe. No celular e no tablet, toma o lugar da seta na lista de
 * capítulos do início: é o equivalente, já visível, da ficha que vira para
 * o capítulo sob o ponteiro na mesa (desde 14/10). No agendador, cada opção
 * de serviço leva a sua, de perfil, e a da opção escolhida vira de frente
 * (barbearia.css, .bb-opcao-ficha): a resposta à escolha fica no ponto do
 * toque, no celular também (correção de 14/10, depois do crítico de fora).
 * Com `gravar={false}` (as opções do agendador), a face vai lisa: o preço
 * já está escrito na opção, logo abaixo (o mesmo dado duas vezes, marca X7).
 */
export function MiniFicha({ objeto, className = "", gravar = true }: { objeto: ObjetoDaCena; className?: string; gravar?: boolean }) {
  const ficha = fichas.find((f) => f.id === objeto) ?? fichas[0];
  const [claro, escuro] = TONS[ficha.metal];
  const centro = "linhas" in ficha ? ficha.linhas[1] : "centro" in ficha ? ficha.centro : "";
  const texto = gravar && centro.length <= 4 ? centro : "";
  const id = `mini-${ficha.id}`;
  const contorno = { fill: `url(#${id})`, stroke: escuro, strokeWidth: 1 };
  return (
    <svg viewBox="-20 -20 40 40" aria-hidden="true" className={`bb-mini ${className}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={claro} />
          <stop offset="1" stopColor={escuro} />
        </linearGradient>
      </defs>
      {ficha.forma === "placa" ? (
        <>
          <rect x="-19" y="-12.5" width="38" height="25" rx="3" {...contorno} />
          <rect x="-16.5" y="-10" width="33" height="20" rx="1.8" fill="none" stroke={escuro} strokeWidth="0.6" opacity="0.7" />
        </>
      ) : ficha.forma === "oitavada" ? (
        <>
          <polygon points={oitavado(18.5)} {...contorno} />
          <circle r="12" fill="none" stroke={escuro} strokeWidth="0.6" opacity="0.7" />
        </>
      ) : (
        <>
          <circle r="18.5" {...contorno} />
          <circle r="12" fill="none" stroke={escuro} strokeWidth="0.6" opacity="0.7" />
        </>
      )}
      {texto && (
        <text textAnchor="middle" y={texto.length > 2 ? 3.6 : 4.4} fontSize={texto.length > 2 ? 10.5 : 13} fill="#2a1d10" style={{ fontFamily: "var(--font-exibicao)" }}>
          {texto}
        </text>
      )}
    </svg>
  );
}

/** Os pontos do oitavado com os lados retos no alto, embaixo e dos lados (como o do palco). */
const oitavado = (apotema: number) => {
  const raio = apotema / Math.cos(Math.PI / 8);
  return Array.from({ length: 8 }, (_, k) => {
    const a = Math.PI / 8 + (k * Math.PI) / 4;
    return `${(Math.cos(a) * raio).toFixed(2)},${(Math.sin(a) * raio).toFixed(2)}`;
  }).join(" ");
};


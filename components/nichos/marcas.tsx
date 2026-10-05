// Marcas dos dois demonstrativos: geométricas e tipográficas, sem figura
// (a ilustração está suspensa; ESTEIRA, VI). As cores vêm do tom do nicho
// (--marca, --marca-tinta, --marca-ponto; app/nichos.css) e a letra da
// nutrição, da fonte do nicho (--font-nicho; components/nichos/fontes.ts).
// Decorativas: o nome da casa está sempre escrito ao lado.

/** Atributos do svg: className, ou x, y, width e height quando a marca entra em outro desenho (o alfinete dos mapas). */
type MarcaProps = React.ComponentProps<"svg">;

/** Depósito Engenhoca: três blocos assentados em amarração, sobre o laranja de sinalização. */
export function MarcaDoDeposito(props: MarcaProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" {...props}>
      <rect width="40" height="40" rx="6" fill="var(--marca)" />
      <g fill="var(--marca-tinta)">
        <rect x="7" y="22" width="12.5" height="8" rx="1.2" />
        <rect x="20.5" y="22" width="12.5" height="8" rx="1.2" />
        <rect x="13.75" y="12.5" width="12.5" height="8" rx="1.2" />
      </g>
    </svg>
  );
}

/** Nutrição Icaraí: a inicial em Fraunces num círculo de verde de horta, com um grão de damasco. */
export function MarcaDaNutricao(props: MarcaProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" {...props}>
      <circle cx="20" cy="20" r="20" fill="var(--marca)" />
      <text
        x="19"
        y="27.6"
        textAnchor="middle"
        fontSize="21"
        fontWeight="600"
        fill="var(--marca-tinta)"
        style={{ fontFamily: "var(--font-nicho), Georgia, serif" }}
      >
        N
      </text>
      <circle cx="29.5" cy="11.5" r="3" fill="var(--marca-ponto)" />
    </svg>
  );
}

export const marcasDosNichos = {
  deposito: MarcaDoDeposito,
  nutricao: MarcaDaNutricao,
};
